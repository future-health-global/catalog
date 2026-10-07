"""Browser regressions for information navigation and generated share PNGs.
Run against the catalog's Python HTTP server on port 8000:
    python3 tests/catalog_regression.py
Requires Python Playwright and /usr/bin/chromium (provided by the cloud runtime).
Set CATALOG_TEST_ARTIFACTS to retain generated PNGs outside the checkout.
"""
import base64
import json
import os
import unittest
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:8000'
INSTRUMENT = r"""
window.paint=[];
for (const method of ['fillText','roundRect','moveTo','lineTo']) {
  const original=CanvasRenderingContext2D.prototype[method];
  CanvasRenderingContext2D.prototype[method]=function(...args){
    if (this.canvas.width===1620 && this.canvas.height===2880) {
      const m=method==='fillText'?this.measureText(String(args[0])):null;
      window.paint.push({method,args,font:this.font,color:this.fillStyle,
        ascent:m?.actualBoundingBoxAscent,descent:m?.actualBoundingBoxDescent,width:m?.width});
    }
    return original.apply(this,args);
  };
}
"""

class CatalogRegression(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw=sync_playwright().start()
        cls.browser=cls.pw.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()

    def setUp(self):
        self.page=self.browser.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
        self.errors=[]
        self.page.on('pageerror',lambda e:self.errors.append(str(e)))
        self.page.add_init_script(INSTRUMENT)
        self.page.goto(BASE,wait_until='networkidle')
        self.page.evaluate('finishSplash()')
        self.page.wait_for_function("!document.getElementById('splash')")

    def tearDown(self):
        self.page.close()
        self.assertEqual(self.errors,[])

    def test_information_pages_preserve_app_and_reader(self):
        for source in ['home','category','product']:
            for destination in ['company','official']:
                with self.subTest(source=source,destination=destination):
                    for _ in range(3):
                        self.page.evaluate("""source=>{
                          if(source==='home')goHome();
                          else if(source==='category')showCategory('daily');
                          else showProduct(products[0].id);
                        }""",source)
                        self.page.evaluate("async()=>{await Promise.all([...app.querySelectorAll('img')].map(img=>img.decode()));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))}")
                        self.page.evaluate("""()=>{
                          const scroller=activePageScroller();scroller.scrollTop=scroller.scrollHeight;
                          window.oldAppNode=app.firstElementChild;window.oldScroll=scroller.scrollTop;
                          window.oldScroller=scroller;window.oldStack=stack.slice();
                        }""")
                        self.assertGreater(self.page.evaluate('oldScroll'),0)
                        first=self.page.evaluate("""destination=>{
                          destination==='company'?showCompanyMore():showOfficial();
                          const viewport=document.querySelector('.infoPageViewport');
                          const heading=viewport.querySelector('h1');
                          return {top:viewport.scrollTop,heading:heading.getBoundingClientRect().top,
                            viewportTop:viewport.getBoundingClientRect().top,
                            mounted:oldAppNode===app.firstElementChild,inert:app.inert};
                        }""",destination)
                        self.assertEqual(first['top'],0)
                        self.assertTrue(first['mounted'] and first['inert'])
                        self.assertGreaterEqual(first['heading'],first['viewportTop'])
                        self.assertLess(first['heading'],first['viewportTop']+300)
                        self.page.wait_for_timeout(150)
                        self.assertEqual(self.page.locator('.infoPageViewport').evaluate('(e)=>e.scrollTop'),0)
                        self.assertTrue(self.page.locator('.infoPageViewport h1').is_visible())
                        self.page.evaluate('activePageScroller().scrollTop=activePageScroller().scrollHeight')
                        self.assertGreaterEqual(self.page.locator('.infoPageNavigation button').bounding_box()['y'],first['viewportTop'])
                        self.assertLess(self.page.locator('.infoPageNavigation button').bounding_box()['y'],first['viewportTop']+80)
                        self.page.locator('.infoPageNavigation button').click()
                        self.assertEqual(self.page.locator('.infoPageViewport').count(),0)
                        self.assertTrue(self.page.evaluate('oldAppNode===app.firstElementChild'))
                        self.assertEqual(self.page.evaluate('oldScroller.scrollTop'),self.page.evaluate('oldScroll'))
                        self.assertTrue(self.page.evaluate('JSON.stringify(stack)===JSON.stringify(oldStack)&&!app.inert'))

    def test_nested_information_navigation_and_main_navigation(self):
        self.page.evaluate('goHome();showCompanyMore();activePageScroller().scrollTop=500;window.companyTop=activePageScroller().scrollTop;window.companyNode=activePageScroller()')
        self.page.evaluate('showOfficial()')
        self.assertEqual(self.page.locator('.infoPageViewport[data-page="official"]').evaluate('(e)=>e.scrollTop'),0)
        self.page.locator('.infoPageViewport[data-page="official"] .infoPageNavigation button').click()
        self.assertTrue(self.page.evaluate('activePageScroller()===companyNode'))
        self.assertEqual(self.page.evaluate('activePageScroller().scrollTop'),self.page.evaluate('companyTop'))
        self.page.locator('.bottom [data-tab="catalog"]').click()
        self.assertEqual(self.page.locator('.infoPageViewport').count(),0)
        self.assertTrue(self.page.evaluate('!app.inert&&stack.at(-1)==="all"'))
        self.page.evaluate('goBack()')
        self.assertEqual(self.page.locator('.homeHero').count(),1)
        self.page.evaluate('showOfficial()')
        self.page.locator('.bottom [data-tab="share"]').click()
        self.assertEqual(self.page.locator('.infoPageViewport').count(),0)
        self.assertEqual(self.page.locator('.shareCenterHero').count(),1)
        self.assertTrue(self.page.evaluate('!app.inert'))
        self.page.locator('.menuBtn').click()
        self.page.locator('#drawer button',has_text='О компании').click()
        self.assertEqual(self.page.locator('.infoPageViewport[data-page="company"]').count(),1)

    def generate(self,cfg,name):
        self.page.evaluate("""cfg=>{
          document.getElementById('fhCorePreview')?.remove();closeShareConfig();
          openShareConfig(products[0].id);document.getElementById('shareTemplate').value=cfg.template||'classic';window.paint=[];
          window.readBatchConfigs=()=>[{id:products[0].id,showQR:true,showAvatar:false,...cfg}];
        }""",cfg)
        self.page.locator('#shareConfigShade .shareConfigActions button',has_text='Предпросмотр').click()
        self.page.locator('#fhCorePreview img').first.wait_for(timeout=15000)
        result=self.page.evaluate("""async()=>{
          const img=document.querySelector('#fhCorePreview img');await img.decode();
          const blob=await (await fetch(img.src)).blob();
          const data=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.readAsDataURL(blob)});
          return {width:img.naturalWidth,height:img.naturalHeight,type:blob.type,data,paint:window.paint};
        }""")
        self.assertEqual((result['width'],result['height'],result['type']),(1620,2880,'image/png'))
        if os.environ.get('CATALOG_TEST_ARTIFACTS'):
            path=Path(os.environ['CATALOG_TEST_ARTIFACTS']);path.mkdir(parents=True,exist_ok=True)
            (path/(name+'.png')).write_bytes(base64.b64decode(result['data'].split(',')[1]))
        return result['paint']

    def check_layout(self,paint,cfg):
        text=[e for e in paint if e['method']=='fillText' and e['args'][2]>=1570 and e['args'][2]<1880]
        self.assertTrue(text or cfg.get('avatar'))
        for entry in text:
            with self.subTest(text=entry['args'][0]):
                self.assertGreaterEqual(entry['args'][2]-entry['ascent'],1594-.1)
                self.assertLessEqual(entry['args'][2]+entry['descent'],1846+.1)
                self.assertLessEqual(entry['args'][1]+entry['width'],995)
        banners=[e for e in paint if e['method']=='roundRect' and 1570<e['args'][1]<1870]
        promo=[e for e in banners if e['args'][0] in (82,100)]
        self.assertEqual(len(promo),int(bool(cfg.get('promo'))))
        if promo:
            x,y,w,h,*_=promo[0]['args']
            white=[e for e in text if e['color']=='#ffffff']
            self.assertTrue(white)
            self.assertEqual(' '.join(e['args'][0] for e in white),cfg['promo'])
            for entry in white:
                self.assertGreaterEqual(entry['args'][2]-entry['ascent'],y)
                self.assertLessEqual(entry['args'][2]+entry['descent'],y+h)
                self.assertLessEqual(entry['args'][1]+entry['width'],x+w)
            prior=[e for e in text if e['args'][1]==x and e['args'][2]<y]
            if prior:
                bottom=max(e['args'][2]+e['descent'] for e in prior)
                self.assertLessEqual(y-bottom,28.1)
            else:
                self.assertEqual(y,1594)
            dates=[e for e in text if e['color']=='#506c76']
            if dates:
                top=min(e['args'][2]-e['ascent'] for e in dates)
                self.assertGreaterEqual(top,y+h)
                self.assertLessEqual(top-(y+h),15)
        # The accepted QR container and size stay exactly the same.
        qr=[e for e in paint if e['method']=='roundRect' and e['args'][:4]==[852,104,160,160]]
        self.assertEqual(len(qr),int(cfg.get('priceMode')!='custom'))
        return text

    def test_generated_png_combinations(self):
        cases={
          'price_pv_promo_end_contact':dict(priceMode='member',showPV=True,promo='Купи 3 — получи 1 в подарок',end='2026-10-31',senderName='Анна Иванова',senderPhone='79991234567'),
          'two_line_promo_dates_contact':dict(priceMode='member',showPV=True,promo='Купи три продукта и получи один дополнительный продукт в подарок',start='2026-10-01',end='2026-10-31',senderName='Анна Иванова'),
          'price_only':dict(priceMode='member',showPV=False),
          'visual':dict(priceMode='member',showPV=True,promo='Купи 3 — получи 1 в подарок',end='2026-10-31',senderName='Анна',template='visual'),
          'info':dict(priceMode='member',showPV=True,promo='Купи 3 — получи 1 в подарок',end='2026-10-31',senderName='Анна',template='info'),
          'minimal':dict(priceMode='member',showPV=True,promo='Купи 3 — получи 1 в подарок',end='2026-10-31',senderName='Анна',template='minimal'),
          'price_dates':dict(priceMode='member',showPV=True,end='2026-10-31'),
          'promo_only':dict(priceMode='none',promo='2 + 1 В ПОДАРОК'),
          'promo_dates':dict(priceMode='none',promo='Купи 3 — получи 1 в подарок',end='2026-10-31'),
          'pv_only':dict(priceMode='none',showPV=True),
          'custom_price':dict(priceMode='custom',customPrice='999999999',showPV=True,promo='Подарок к покупке',end='2026-10-31'),
          'contact_only':dict(priceMode='none',senderName='Анна Иванова',senderPhone='79991234567'),
          'avatar_only':dict(priceMode='none',avatar='assets/future-health-mark.png',showAvatar=True),
          'dense_avatar':dict(priceMode='member',showPV=True,promo='Купи 3 — получи 1 в подарок',end='2026-10-31',senderName='Анна Иванова',senderPhone='79991234567',senderContacts=[{'type':'Адрес','value':'Москва, улица Академика Королёва, дом 12'}],avatar='assets/future-health-mark.png',showAvatar=True),
          'dense_contact':dict(priceMode='member',showPV=True,promo='Купи 3 — получи 1 в подарок',end='2026-10-31',senderStatus='consultant',senderName='Анна Иванова',senderPhone='79991234567',senderContacts=[{'type':'Адрес','value':'Москва, улица Академика Королёва, дом 12'},{'type':'Telegram','value':'@futurehealth'}]),
        }
        for name,cfg in cases.items():
            with self.subTest(name=name):
                text=self.check_layout(self.generate(cfg,name),cfg)
                if name=='contact_only':
                    self.assertGreaterEqual(min(e['args'][1] for e in text),105)
                    self.assertFalse(any(e['method']=='moveTo' and e['args'][1]==1595 for e in self.page.evaluate('paint')))

    def test_real_share_form_pipeline(self):
        self.page.evaluate("saveSharePrefs({senderName:'Анна Иванова',senderPhone:'79991234567'});openShareConfig(products[0].id);window.paint=[]")
        self.page.locator('.batchMode').select_option('member')
        self.page.locator('.batchPV').check()
        self.page.locator('.batchPromoPreset').select_option('buygift')
        self.page.locator('.fhBuy').select_option('3')
        self.page.locator('.fhGift').select_option('1')
        self.page.locator('.batchEnd').fill('31.10.26')
        self.page.locator('#shareConfigShade .shareConfigActions button',has_text='Предпросмотр').click()
        self.page.locator('#fhCorePreview img').first.wait_for(timeout=15000)
        self.page.locator('#fhCorePreview img').evaluate('(img)=>img.decode()')
        self.check_layout(self.page.evaluate('paint'),dict(priceMode='member',promo='Купи 3 — получи 1 в подарок'))
        text=' '.join(e['args'][0] for e in self.page.evaluate('paint') if e['method']=='fillText')
        self.assertIn('31.10.2026',text)
        self.assertIn('Анна Иванова',text)

    def test_overlong_text_reports_error_without_clipping(self):
        self.page.evaluate("""()=>{
          openShareConfig(products[0].id);window.notices=[];window.showShareToast=(...args)=>notices.push(args);
          window.readBatchConfigs=()=>[{id:products[0].id,priceMode:'member',showPV:true,showAvatar:false,promo:'Очень длинные условия акции '.repeat(100),senderName:'Анна'}];
        }""")
        self.page.locator('#shareConfigShade .shareConfigActions button',has_text='Предпросмотр').click()
        self.page.wait_for_function('notices.length>0')
        self.assertEqual(self.page.locator('#fhCorePreview').count(),0)
        self.assertIn('Сократите',self.page.evaluate('notices[0].join(" ")'))

    def test_empty_publication_is_blocked(self):
        self.page.evaluate("""()=>{
          openShareConfig(products[0].id);window.notices=[];window.showShareToast=(...args)=>notices.push(args);
          window.readBatchConfigs=()=>[{id:products[0].id,priceMode:'none',showPV:false,showAvatar:false}];
        }""")
        self.page.locator('#shareConfigShade .shareConfigActions button',has_text='Предпросмотр').click()
        self.page.wait_for_function('notices.length>0')
        self.assertEqual(self.page.locator('#fhCorePreview').count(),0)
        self.assertIn('Добавьте данные',self.page.evaluate('notices[0].join(" ")'))

if __name__=='__main__':
    unittest.main(verbosity=2)
