/* FUTURE HEALTH V36.2 — isolated preview core. No dependency on legacy preview handlers. */
(() => {
  'use strict';
  const CORE='36.8-native-multishare';
  const css=document.createElement('style');
  css.textContent=`
  #fhCorePreview{position:fixed;inset:0;z-index:999999;background:#0d1720;display:flex;flex-direction:column;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
  #fhCorePreview .fhpHead{height:58px;padding:max(8px,env(safe-area-inset-top)) 12px 8px;display:grid;grid-template-columns:90px 1fr 90px;align-items:end;background:#132432}
  #fhCorePreview .fhpHead b{text-align:center;font-size:16px}.fhpBtn{border:0;background:transparent;color:#fff;font-size:15px;padding:8px;text-align:left}.fhpHead .fhpBtn:last-child{text-align:right}
  #fhCorePreview .fhpStage{flex:1;min-height:0;overflow:hidden;touch-action:none;position:relative;display:flex;align-items:center}
  #fhCorePreview .fhpTrack{height:100%;display:flex;transition:transform .25s ease;will-change:transform}
  #fhCorePreview .fhpSlide{width:100vw;height:100%;flex:0 0 100vw;display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box}
  #fhCorePreview .fhpSlide img{max-width:100%;max-height:100%;object-fit:contain;transform-origin:center;user-select:none;-webkit-user-drag:none}
  #fhCorePreview .fhpFoot{padding:10px 14px calc(12px + env(safe-area-inset-bottom));background:#132432;text-align:center;font-size:14px}
  .fhCoreBusy{position:fixed;inset:0;z-index:1000000;background:rgba(8,25,39,.55);display:flex;align-items:center;justify-content:center;color:#fff;font:600 17px -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
  #fhCorePreview .fhpFoot{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center}
  #fhCorePreview .fhpShare{border:0;border-radius:12px;padding:10px 14px;background:#1680c2;color:#fff;font-weight:800;font-size:14px}
  #fhCorePreview .fhpShare.secondary{background:#29485c}
  #shareConfigShade{display:flex!important;align-items:flex-end!important;justify-content:center!important;overflow:hidden!important;padding:0!important} #shareConfigShade .shareConfigSheet{position:relative!important;inset:auto!important;float:none!important;display:block!important;width:min(100vw,560px)!important;max-width:560px!important;max-height:88dvh!important;overflow-y:auto!important;overflow-x:hidden!important;margin:0!important;padding:14px 16px calc(18px + env(safe-area-inset-bottom))!important;border-radius:24px 24px 0 0!important;background:#fff!important;box-sizing:border-box!important;transform:none!important}
  #shareConfigShade .shareField{position:relative!important;inset:auto!important;float:none!important;display:block!important;width:100%!important;max-width:100%!important;margin:12px 0!important;padding:12px!important;border:1px solid #e5eef4;border-radius:16px;background:#fbfdff;box-sizing:border-box!important}
  #shareConfigShade .shareField>label{font-size:13px!important;margin-bottom:9px!important}
  #shareConfigShade .shareTemplateGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
  #shareConfigShade .shareTemplateBtn{min-width:0!important;width:100%!important}
  #shareConfigShade .shareConfigActions{position:sticky;bottom:0;background:#fff;padding-top:10px;padding-bottom:max(4px,env(safe-area-inset-bottom));z-index:5}
  .fhSeriesModes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .fhSeriesMode{border:1px solid #dce9f3;background:#fff;border-radius:13px;padding:10px;text-align:left;color:#36546a;font-size:11px;line-height:1.25;min-height:66px}
  .fhSeriesMode b{display:block;font-size:12px;color:#244e6d;margin-bottom:4px}.fhSeriesMode.active{border-color:#1673b7;background:#eaf6ff;box-shadow:0 0 0 1px #1673b7 inset}
  .fhSeriesHint{font-size:10px;color:#7c93a6;line-height:1.4;margin-top:8px} .fhFallback{position:absolute;inset:0;z-index:20;background:#f7fbff;color:#173957;display:flex;flex-direction:column}.fhFallbackHead{padding:calc(10px + env(safe-area-inset-top)) 14px 10px;background:#fff;border-bottom:1px solid #dfeaf2;display:flex;align-items:center;justify-content:space-between}.fhFallbackHead b{font-size:17px}.fhFallbackClose{border:0;background:#edf5fa;border-radius:12px;padding:9px 12px;color:#244e6d}.fhFallbackBody{flex:1;overflow:auto;padding:14px}.fhFallbackNote{font-size:13px;line-height:1.45;color:#627b8d;background:#eaf6ff;border-radius:14px;padding:12px;margin-bottom:12px}.fhFallbackItem{background:#fff;border:1px solid #dfeaf2;border-radius:16px;padding:10px;margin-bottom:12px}.fhFallbackItem img{width:100%;height:auto;display:block;border-radius:10px}.fhFallbackActions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}.fhFallbackActions a{display:block;text-align:center;text-decoration:none;border-radius:11px;padding:10px;background:#eaf3f9;color:#24516f;font-weight:700;font-size:13px}.fhFallbackActions a.primary{background:#1678b7;color:#fff}
  `;document.head.appendChild(css);

  function toast(msg){ if(typeof showShareToast==='function') showShareToast('Предпросмотр',msg); else alert(msg); }
  function imgSrc(p){ try{return (typeof cleanImg==='function'&&cleanImg(p))||p.img||''}catch{return p?.img||''} }
  function loadImage(src){return new Promise((resolve,reject)=>{if(!src)return reject(new Error('no image'));const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('image load'));im.src=src})}
  function wrap(ctx,text,maxWidth,maxLines=5){const words=String(text||'').trim().split(/\s+/).filter(Boolean),out=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(line&&ctx.measureText(t).width>maxWidth){out.push(line);line=w;if(out.length>=maxLines)break}else line=t}if(line&&out.length<maxLines)out.push(line);return out}
  function rounded(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.stroke()}}
  function drawLeaf(ctx,cx,cy,rx,ry,rot,color,alpha=.16){ctx.save();ctx.translate(cx,cy);ctx.rotate(rot);ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,-ry);ctx.bezierCurveTo(rx,-ry,rx,ry,0,ry);ctx.bezierCurveTo(-rx,ry,-rx,-ry,0,-ry);ctx.fill();ctx.globalAlpha=alpha*.9;ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-ry*.8);ctx.lineTo(0,ry*.8);ctx.stroke();ctx.restore()}
  function featuresFor(p){
    const nm=String(p?.name||'').toLowerCase(), raw=(p?.detail||[]).map(normalizeShareText).filter(Boolean);
    let pool=raw.filter(t=>t.length>18&&t.length<135&&!/^(отзывы|способ|масса|примечание|шаг|оригинальная)/i.test(t)&&!nm.includes(t.toLowerCase()));
    const out=[]; for(const t0 of pool){let t=t0.replace(/[.!?]+$/,'');if(t.length>76)t=t.slice(0,73).replace(/\s+\S*$/,'')+'…';if(!out.some(v=>v.toLowerCase()===t.toLowerCase()))out.push(t);if(out.length===3)break}
    while(out.length<3)out.push(['Официальная информация из каталога','Удобный формат продукта','Подробнее — по ссылке на продукт'][out.length]); return out;
  }
  const COLOR_SCHEMES={blue:{name:'Синий',bg:['#eaf6ff','#ffffff','#eaf4ff'],accent:'#176ead',soft:'#dceeff'},green:{name:'Зелёный',bg:['#eafff3','#fffdf4','#eaf9f0'],accent:'#197d5c',soft:'#dff5e9'},turquoise:{name:'Бирюзовый',bg:['#e7fffd','#ffffff','#e9f8f7'],accent:'#168b8a',soft:'#d8f5f3'},violet:{name:'Лиловый',bg:['#f3efff','#fff7fb','#eef5ff'],accent:'#7357a8',soft:'#e9e0fa'},warm:{name:'Тёплый',bg:['#fff5e9','#fffdf8','#f5efe6'],accent:'#9a6840',soft:'#f5e4d3'}};
  function isBatch(){return document.querySelectorAll('#shareConfigShade .batchCfgRow[data-id]').length>1}
  function seriesMode(){return document.getElementById('fhSeriesMode')?.value||'same_same'}
  function baseTemplate(){const v=document.getElementById('shareTemplate')?.value||'classic';return v==='auto'?'classic':v}
  function baseColor(){const v=document.getElementById('shareColor')?.value||localStorage.getItem('fh_share_color')||'blue';return (v==='auto'||!COLOR_SCHEMES[v])?'blue':v}
  function selectedTemplate(index){const v=document.getElementById('shareTemplate')?.value||'classic';if(!isBatch())return v==='auto'?['classic','visual','info','minimal'][index%4]:v;const m=seriesMode();if(m==='same_same'||m==='same_diff')return baseTemplate();return ['classic','visual','info','minimal'][index%4]}
  function selectedColor(index){const v=document.getElementById('shareColor')?.value||localStorage.getItem('fh_share_color')||'auto';if(!isBatch()){if(v!=='auto'&&COLOR_SCHEMES[v])return v;return ['blue','green','turquoise','violet','warm'][index%5]}const m=seriesMode();if(m==='same_same'||m==='diff_same')return baseColor();return ['blue','green','turquoise','violet','warm'][index%5]}
  function installColorPicker(){const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet||sheet.querySelector('#shareColor'))return;const actions=sheet.querySelector('.shareConfigActions');if(!actions)return;const saved=localStorage.getItem('fh_share_color')||'auto';const d=document.createElement('div');d.className='shareField fhColorBlock';d.innerHTML=`<label>Цвет оформления</label><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button type="button" class="fhColor" data-c="auto">Авто</button>${Object.entries(COLOR_SCHEMES).map(([k,v])=>`<button type="button" class="fhColor" data-c="${k}" style="--c:${v.accent}"><i></i>${v.name}</button>`).join('')}</div><input type="hidden" id="shareColor" value="${saved}"><div class="shareHint">Цвет применяется внутри выбранного шаблона.</div>`;actions.before(d);if(!document.getElementById('fhColorStyle')){const st=document.createElement('style');st.id='fhColorStyle';st.textContent=`.fhColor{border:1px solid #d9e5ec;background:#fff;border-radius:12px;padding:9px 11px;font:600 13px -apple-system,BlinkMacSystemFont,"Segoe UI",Arial;color:#36546a;display:inline-flex;align-items:center;gap:6px}.fhColor i{width:13px;height:13px;border-radius:50%;background:var(--c,#b9c8d2);box-shadow:0 0 0 2px #fff,0 0 0 3px #d7e3ea}.fhColor.active{outline:2px solid #2878b8;background:#eef7ff}`;document.head.appendChild(st)}function set(c){d.querySelector('#shareColor').value=c;localStorage.setItem('fh_share_color',c);d.querySelectorAll('.fhColor').forEach(b=>b.classList.toggle('active',b.dataset.c===c))}d.querySelectorAll('.fhColor').forEach(b=>b.onclick=()=>set(b.dataset.c));set(saved)}
  function installSeriesMode(){const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet||sheet.querySelector('#fhSeriesMode'))return;const rows=sheet.querySelectorAll('.batchCfgRow[data-id]');if(rows.length<2)return;const anchor=sheet.querySelector('.fhColorBlock')||sheet.querySelector('.shareConfigActions');if(!anchor)return;const saved=sessionStorage.getItem('fh_series_mode')||'same_same';const d=document.createElement('div');d.className='shareField fhSeriesBlock';d.innerHTML=`<label>Стиль серии</label><div class="fhSeriesModes"><button type="button" class="fhSeriesMode" data-m="same_same"><b>Единый стиль</b>Один шаблон · один цвет</button><button type="button" class="fhSeriesMode" data-m="same_diff"><b>Один шаблон</b>Разные цвета</button><button type="button" class="fhSeriesMode" data-m="diff_same"><b>Разные шаблоны</b>Один цвет</button><button type="button" class="fhSeriesMode" data-m="diff_diff"><b>Разные шаблоны</b>Разные цвета</button></div><input type="hidden" id="fhSeriesMode" value="${saved}"><div class="fhSeriesHint">Настройка применяется ко всей выбранной серии.</div>`;anchor.before(d);function set(m){d.querySelector('#fhSeriesMode').value=m;sessionStorage.setItem('fh_series_mode',m);d.querySelectorAll('.fhSeriesMode').forEach(b=>b.classList.toggle('active',b.dataset.m===m))}d.querySelectorAll('.fhSeriesMode').forEach(b=>b.onclick=()=>set(b.dataset.m));set(saved)}
  function enhanceConfig(){installColorPicker();installSeriesMode()}
  new MutationObserver(()=>enhanceConfig()).observe(document.body,{childList:true,subtree:true});setTimeout(enhanceConfig,0);
  function bg(ctx,tpl,colorKey,W,H){const cs=COLOR_SCHEMES[colorKey]||COLOR_SCHEMES.blue,a=cs.bg,accent=cs.accent;const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,a[0]);g.addColorStop(.52,a[1]);g.addColorStop(1,a[2]);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    if(tpl==='classic'){ctx.globalAlpha=.12;ctx.fillStyle=accent;ctx.beginPath();ctx.arc(1040,220,280,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(-70,1500,240,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;drawLeaf(ctx,1010,470,62,160,.55,accent,.10)}
    if(tpl==='visual'){ctx.globalAlpha=.18;ctx.fillStyle=accent;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,0);ctx.lineTo(W,760);ctx.quadraticCurveTo(640,610,0,880);ctx.closePath();ctx.fill();ctx.globalAlpha=1;drawLeaf(ctx,80,520,100,245,-.5,accent,.17);drawLeaf(ctx,1000,1350,90,220,.55,accent,.12)}
    if(tpl==='info'){ctx.globalAlpha=.09;ctx.fillStyle=accent;ctx.fillRect(0,0,430,H);ctx.globalAlpha=1;for(let i=0;i<4;i++){ctx.strokeStyle=accent+'33';ctx.lineWidth=3;ctx.beginPath();ctx.arc(930,180,90+i*38,.3,5.2);ctx.stroke()}}
    if(tpl==='minimal'){ctx.fillStyle='rgba(255,255,255,.58)';ctx.fillRect(70,70,W-140,H-140);ctx.strokeStyle=accent+'44';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(70,260);ctx.lineTo(1010,260);ctx.stroke();ctx.beginPath();ctx.moveTo(70,1660);ctx.lineTo(1010,1660);ctx.stroke();drawLeaf(ctx,930,350,55,130,.65,accent,.07)}
  }
  function drawWrapped(ctx,text,x,y,maxWidth,lineH,maxLines){const lines=wrap(ctx,text,maxWidth,maxLines);for(const line of lines){ctx.fillText(line,x,y);y+=lineH}return y}
  function cfgForIndex(index,id){
    try{
      if(document.querySelectorAll('#shareConfigShade .batchCfgRow[data-id]').length && typeof readBatchConfigs==='function'){
        const all=readBatchConfigs(); const row=all.find(c=>c.id===id)||all[index]||{}; let pref={}; try{pref=typeof loadSharePrefs==='function'?(loadSharePrefs()||{}):{}}catch{} return {...pref,...row,avatar:row.showAvatar===false?'':(row.avatar!==undefined?row.avatar:(pref.showAvatar===false?'':(pref.avatar||''))),showAvatar:row.showAvatar!==undefined?row.showAvatar:(pref.showAvatar!==false),showQR:row.showQR!==undefined?row.showQR:(pref.showQR!==false)};
      }
      if(typeof readShareConfig==='function'){ const row=readShareConfig()||{}; let pref={}; try{pref=typeof loadSharePrefs==='function'?(loadSharePrefs()||{}):{}}catch{} return {...pref,...row,avatar:row.showAvatar===false?'':(row.avatar!==undefined?row.avatar:(pref.showAvatar===false?'':(pref.avatar||''))),showAvatar:row.showAvatar!==undefined?row.showAvatar:(pref.showAvatar!==false),showQR:row.showQR!==undefined?row.showQR:(pref.showQR!==false)}; }
    }catch(e){console.warn('[FH cfg]',e)}
    return {};
  }
  function metaLines(p,cfg){
    let prices=[];try{prices=typeof sharePriceLines==='function'?sharePriceLines(p,cfg):[]}catch{}
    let sender=[];try{sender=typeof senderLines==='function'?senderLines(cfg):[]}catch{}
    let period='';try{period=typeof offerPeriod==='function'?offerPeriod(cfg):''}catch{}
    return {prices,sender,period,promo:String(cfg?.promo||'').trim(),qr:cfg?.showQR!==false,avatar:cfg?.showAvatar===false?'':(cfg?.avatar||''),crop:cfg?.avatarCrop||window.shareAvatarCrop||{scale:1,x:0,y:0}};
  }
  async function drawAvatar(ctx,data,crop,cx,cy,r){if(!data)return false;try{const im=await loadImage(data);ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();const base=Math.max((2*r)/im.width,(2*r)/im.height),sc=base*Math.max(1,Number(crop?.scale)||1),w=im.width*sc,h=im.height*sc;const k=(2*r)/230;ctx.drawImage(im,cx-w/2+(Number(crop?.x)||0)*k,cy-h/2+(Number(crop?.y)||0)*k,w,h);ctx.restore();return true}catch{return false}}
  function qrDraw(ctx,text,x,y,size){try{if(typeof drawQrToCanvas==='function')return drawQrToCanvas(ctx,text,x,y,size);return 0}catch{return 0}}
  async function card(p,index=0,cfg={}){
    // V36.14: 1080x1920 logical layout rendered at 1.5x for a 1620x2880 HD PNG.
    const W=1080,H=1920,S=1.5,c=document.createElement('canvas');c.width=W*S;c.height=H*S;const x=c.getContext('2d');x.scale(S,S);
    const tpl=selectedTemplate(index),colorKey=selectedColor(index);
    const vivid={blue:{a:'#073B78',b:'#00A7D8',hot:'#F2B84B',soft:'#E8F7FF'},green:{a:'#064E3B',b:'#22A06B',hot:'#F5B942',soft:'#EAF9EF'},turquoise:{a:'#005F63',b:'#00B8A9',hot:'#FFB547',soft:'#E5FFFB'},violet:{a:'#4A2478',b:'#A63FD4',hot:'#FFB24A',soft:'#F5EAFE'},warm:{a:'#9B3F18',b:'#F0782B',hot:'#F5C84C',soft:'#FFF0E4'}};
    const V=vivid[colorKey]||vivid.blue,accent=V.a;
    const summary=(()=>{try{return typeof officialShareSummary==='function'?officialShareSummary(p):''}catch{return ''}})(),feats=featuresFor(p),meta=metaLines(p,cfg);
    let im=null;try{const src=imgSrc(p);if(src)im=await loadImage(src)}catch{}
    // vivid premium background
    const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,V.soft);g.addColorStop(.48,'#fff');g.addColorStop(1,V.soft);x.fillStyle=g;x.fillRect(0,0,W,H);
    x.globalAlpha=.10;x.fillStyle=V.b;x.beginPath();x.arc(1030,230,300,0,Math.PI*2);x.fill();x.beginPath();x.arc(-80,1320,260,0,Math.PI*2);x.fill();x.globalAlpha=1;
    drawLeaf(x,65,360,85,210,-.55,V.a,.15);drawLeaf(x,1015,1210,70,180,.55,V.b,.12);
    // decorative dots / lines
    x.fillStyle=V.hot;for(let i=0;i<5;i++){x.globalAlpha=.75-i*.1;x.beginPath();x.arc(915+i*25,118+i*8,7-i*.6,0,Math.PI*2);x.fill()}x.globalAlpha=1;
    const rr=(bx,by,bw,bh,r,fill,stroke)=>{rounded(x,bx,by,bw,bh,r,fill,stroke)};
    const fit=(bx,by,bw,bh,cover=false)=>{if(!im)return;rr(bx,by,bw,bh,30,'#fff',null);x.save();x.beginPath();x.roundRect(bx,by,bw,bh,30);x.clip();const r=cover?Math.max(bw/im.width,bh/im.height):Math.min(bw/im.width,bh/im.height),w=im.width*r,h=im.height*r;x.drawImage(im,bx+(bw-w)/2,by+(bh-h)/2,w,h);x.restore()};
    const text=(t,xx,yy,mw,size,weight,color,lines,lh=1.22)=>{x.fillStyle=color;x.font=`${weight} ${size}px Arial`;return drawWrapped(x,t,xx,yy,mw,Math.round(size*lh),lines)};
    // header
    x.fillStyle=V.a;x.font='800 44px Arial';x.fillText('FUTURE HEALTH',70,84);x.fillStyle=V.b;x.font='700 18px Arial';x.fillText('КАТАЛОГ ПРОДУКЦИИ',72,116);x.strokeStyle=V.hot;x.lineWidth=5;x.beginPath();x.moveTo(72,134);x.lineTo(170,134);x.stroke();
    // Layouts remain genuinely different, but all use large readable type and same fixed bottom info architecture.
    if(tpl==='info'){
      rr(55,170,410,1190,34,'rgba(255,255,255,.78)',null);x.fillStyle=V.a;x.font='800 18px Arial';x.fillText('ПРОДУКТ · КРАТКО',82,215);
      let y=text(p?.name||'Продукт',82,270,350,43,'800','#102F36',7,1.18);y=text(summary,82,y+24,350,29,'500','#355864',9,1.42);
      fit(500,180,525,520,false);x.fillStyle=V.a;x.font='800 23px Arial';x.fillText('КЛЮЧЕВЫЕ ОСОБЕННОСТИ',500,755);
      feats.forEach((f,i)=>{const yy=795+i*155;rr(500,yy,525,128,26,'rgba(255,255,255,.92)',null);rr(520,yy+28,62,62,18,V.a,null);x.fillStyle='#fff';x.font='800 26px Arial';x.textAlign='center';x.fillText(String(i+1),551,yy+70);x.textAlign='left';text(f,604,yy+42,390,27,'700','#244652',3,1.22)});
    } else if(tpl==='visual'){
      fit(55,165,970,650,true);const gr=x.createLinearGradient(0,450,0,815);gr.addColorStop(0,'rgba(0,25,30,0)');gr.addColorStop(1,'rgba(0,25,30,.80)');x.fillStyle=gr;x.fillRect(55,410,970,405);text(p?.name||'Продукт',90,650,900,47,'800','#fff',4,1.16);
      rr(55,845,970,500,34,'rgba(255,255,255,.94)',null);x.fillStyle=V.a;x.font='800 23px Arial';x.fillText('3 КЛЮЧЕВЫХ АКЦЕНТА',90,900);feats.forEach((f,i)=>{const xx=88+i*310;rr(xx,930,285,350,26,i===1?V.soft:'#fff',null);x.fillStyle=i===1?V.b:V.a;x.font='800 38px Arial';x.fillText('0'+(i+1),xx+24,988);text(f,xx+24,1035,237,28,'700','#244652',6,1.25)});
    } else if(tpl==='minimal'){
      x.fillStyle=V.a;x.font='700 19px Arial';x.fillText('01 / PRODUCT',70,215);let y=text(p?.name||'Продукт',70,285,580,52,'800','#102F36',5,1.14);x.strokeStyle=V.hot;x.lineWidth=7;x.beginPath();x.moveTo(70,y+12);x.lineTo(250,y+12);x.stroke();fit(675,215,335,455,false);text(summary,70,850,940,31,'500','#355864',6,1.38);x.fillStyle=V.a;x.font='800 22px Arial';x.fillText('КЛЮЧЕВОЕ',70,1110);feats.forEach((f,i)=>{const yy=1160+i*92;x.fillStyle=i===0?V.hot:V.b;x.beginPath();x.arc(88,yy-10,10,0,Math.PI*2);x.fill();text(f,125,yy,850,29,'700','#244652',2,1.22)});
    } else {
      // premium editorial / botanical default
      fit(70,165,940,590,false);rr(70,715,250,54,27,V.a,null);x.fillStyle='#fff';x.font='800 20px Arial';x.fillText('FUTURE HEALTH',95,750);
      let y=text(p?.name||'Продукт',70,835,940,48,'800','#102F36',4,1.16);y=text(summary,70,y+22,940,31,'500','#355864',5,1.38);
      x.fillStyle=V.a;x.font='800 23px Arial';x.fillText('КЛЮЧЕВЫЕ ОСОБЕННОСТИ',70,y+38);const fy=y+70;feats.forEach((f,i)=>{const xx=70+i*315;rr(xx,fy,295,205,26,'rgba(255,255,255,.94)',null);x.fillStyle=[V.a,V.b,V.hot][i];x.beginPath();x.arc(xx+42,fy+45,24,0,Math.PI*2);x.fill();x.fillStyle=i===2?'#573800':'#fff';x.font='800 22px Arial';x.textAlign='center';x.fillText(String(i+1),xx+42,fy+53);x.textAlign='left';text(f,xx+25,fy+95,245,27,'700','#244652',4,1.22)});
    }
    // V36.15 FIXED BOTTOM INFORMATION BAR — two immutable 50% columns.
    // The heading sits ABOVE the white panel so it never competes with price/activity content.
    const by=1570,bh=300;
    x.fillStyle=V.a;x.font='900 24px Arial';x.fillText('ПРЕДЛОЖЕНИЕ',70,by-18);
    rr(55,by,970,bh,32,'rgba(255,255,255,.98)',null);x.strokeStyle=V.a+'38';x.lineWidth=2;x.stroke();
    x.strokeStyle='rgba(30,70,80,.14)';x.beginPath();x.moveTo(540,by+25);x.lineTo(540,by+bh-25);x.stroke();

    // LEFT 50% — commercial data. Empty fields never move the right side.
    const lx=82,lw=420;let ly=by+54;
    const productObj=p||{};
    let rub='';
    if(cfg.priceMode==='member' && productObj.priceRub) rub=Number(productObj.priceRub).toLocaleString('ru-RU');
    if(cfg.priceMode==='custom' && cfg.customPrice){const n=Number(String(cfg.customPrice).replace(/[^0-9.,]/g,'').replace(',','.'));rub=Number.isFinite(n)&&n>0?n.toLocaleString('ru-RU'):String(cfg.customPrice)}
    if(rub){x.fillStyle=V.a;x.font='800 22px Arial';x.fillText(cfg.priceMode==='member'?'Цена для участников:':'Цена:',lx,ly);ly+=40;
      let pv='';if(cfg.showPV&&productObj.pv)pv=`     ${Number(productObj.pv).toLocaleString('ru-RU')} PV`;
      x.fillStyle='#102F36';x.font='900 31px Arial';x.fillText(`${rub} ₽${pv}`,lx,ly);ly+=44;
    } else if(cfg.showPV&&cfg.priceMode!=='none'&&productObj.pv){x.fillStyle='#102F36';x.font='900 30px Arial';x.fillText(`${Number(productObj.pv).toLocaleString('ru-RU')} PV`,lx,ly);ly+=42}
    if(meta.promo){x.fillStyle='#173D47';x.font='800 23px Arial';ly=drawWrapped(x,meta.promo,lx,ly+4,lw,29,2)}
    if(meta.period){x.fillStyle='#506C76';x.font='700 19px Arial';drawWrapped(x,meta.period,lx,ly+8,lw,25,2)}

    // RIGHT 50% — identity. No hard-coded status: render exactly the status selected by the sender.
    const rx=570,rw=420;let sx=592,sy=by+58;
    const showQr=meta.qr && cfg.priceMode!=='custom';
    if(showQr){let url='';try{url=productDeepLink(p.id)}catch{};x.save();x.globalAlpha=.97;rr(842,96,176,176,18,'rgba(255,255,255,.98)',null);qrDraw(x,url,856,110,148);x.restore()}
    if(meta.avatar){const ok=await drawAvatar(x,meta.avatar,meta.crop,625,by+88,48);if(ok)sx=690}
    const textRight=990, avail=Math.max(120,textRight-sx);
    function oneLine(text,weight,size,minSize,color){if(!text)return;let fs=size;x.fillStyle=color;while(fs>minSize){x.font=`${weight} ${fs}px Arial`;if(x.measureText(text).width<=avail)break;fs-=1}x.fillText(text,sx,sy);sy+=fs+11}
    const status=typeof senderStatusLabel==='function'?senderStatusLabel(cfg.senderStatus):'';
    oneLine(status?status.toUpperCase():'',900,21,15,V.a);
    oneLine(String(cfg.senderName||''),900,27,18,'#102F36');
    oneLine(String(cfg.senderPhone||''),700,21,17,'#294E58');
    (cfg.senderContacts||[]).slice(0,2).forEach(c=>{if(!c?.value)return;const line=`${c.type}: ${String(c.value).trim()}`;x.fillStyle='#294E58';x.font='700 19px Arial';const isAddr=String(c.type).toLowerCase().includes('адрес');if(isAddr)sy=drawWrapped(x,line,sx,sy,avail,25,meta.avatar?3:2);else {let fs=19;while(fs>15){x.font=`700 ${fs}px Arial`;if(x.measureText(line).width<=avail)break;fs--}if(x.measureText(line).width<=avail){x.fillText(line,sx,sy);sy+=fs+9}else sy=drawWrapped(x,line,sx,sy,avail,24,2)}});
    // footer
    x.strokeStyle='rgba(30,70,80,.18)';x.beginPath();x.moveTo(70,1880);x.lineTo(1010,1880);x.stroke();x.fillStyle=V.a;x.font='800 18px Arial';x.fillText('FUTURE HEALTH · SHARE HAPPINESS',70,1910);
    return new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error('canvas blob')),'image/png'));
  }

  function idsFromConfig(){
    const rows=[...document.querySelectorAll('#shareConfigShade .batchCfgRow[data-id]')].map(n=>n.dataset.id).filter(Boolean);if(rows.length)return rows.slice(0,5);
    try{if(typeof shareDraft!=='undefined'&&shareDraft?.id)return [shareDraft.id]}catch{}
    const mini=document.querySelector('#shareConfigShade [data-product-id]');if(mini?.dataset.productId)return [mini.dataset.productId];
    return [];
  }
  function getProduct(id){try{return products.find(p=>p.id===id)}catch{return null}}
  async function runPreview(btn){
    if(btn.dataset.fhBusy==='1')return;btn.dataset.fhBusy='1';const old=btn.textContent;btn.textContent='Создание…';
    const busy=document.createElement('div');busy.className='fhCoreBusy';busy.textContent='Создание предпросмотра…';document.body.appendChild(busy);
    try{
      const ids=idsFromConfig();if(!ids.length)throw new Error('Не удалось определить выбранный продукт');
      const files=[];for(const id of ids){const p=getProduct(id);if(!p)continue;const cfg=cfgForIndex(files.length,id);const b=await card(p,files.length,cfg);files.push({url:URL.createObjectURL(b),blob:b,name:p.name})}
      if(!files.length)throw new Error('Карточка не создана');openPreview(files);
    }catch(e){console.error('[FH preview core]',e);toast(e?.message||'Ошибка создания предпросмотра')}
    finally{busy.remove();btn.dataset.fhBusy='0';btn.textContent=old}
  }
  function makeShareFiles(items){return items.map((it,i)=>new File([it.blob],`FUTURE_HEALTH_${String(i+1).padStart(2,'0')}.png`,{type:'image/png',lastModified:Date.now()}))}
  function shareCapability(files){const secure=window.isSecureContext===true;const hasShare=typeof navigator.share==='function';let canFiles=false;try{canFiles=hasShare&&files.length>0&&(!navigator.canShare||navigator.canShare({files}))}catch{}return {secure,hasShare,canFiles}}
  function openFallback(items,onlyIndex=null){const host=document.getElementById('fhCorePreview');if(!host)return;host.querySelector('.fhFallback')?.remove();const chosen=onlyIndex===null?items:[items[onlyIndex]];let files=[];try{files=makeShareFiles(chosen)}catch{}const cap=shareCapability(files);const f=document.createElement('div');f.className='fhFallback';const why=!cap.secure?'Сейчас каталог открыт по обычному HTTP. iPhone не разрешает веб-странице передавать созданные файлы напрямую в системное меню «Поделиться».':(!cap.canFiles?'Этот браузер не подтвердил передачу выбранных файлов через системное меню.':'Системное меню временно не открылось.');f.innerHTML=`<div class="fhFallbackHead"><b>${chosen.length>1?'Все изображения':'Изображение для отправки'}</b><button class="fhFallbackClose">Закрыть</button></div><div class="fhFallbackBody"><div class="fhFallbackNote"><b>${why}</b><br><br>Для полноценной отправки 1–5 изображений сразу в WeChat / VK / Telegram / MAX каталог нужно открыть по HTTPS. На HTTPS кнопка «Поделиться всеми» передаст все изображения в iOS Share Sheet одной операцией. В текущем тестовом режиме изображения можно открыть или скачать.</div>${chosen.map((it,i)=>`<div class="fhFallbackItem"><img src="${it.url}" alt="FUTURE HEALTH ${i+1}"><div class="fhFallbackActions"><a class="primary" href="${it.url}" target="_blank" rel="noopener">Открыть изображение</a><a href="${it.url}" download="FUTURE_HEALTH_${i+1}.png">Скачать</a></div></div>`).join('')}</div>`;host.appendChild(f);f.querySelector('.fhFallbackClose').onclick=()=>f.remove()}
  async function shareItems(items, onlyIndex=null){const chosen=onlyIndex===null?items:[items[onlyIndex]];let files=[];try{files=makeShareFiles(chosen)}catch(e){console.warn('[FH files]',e)}const cap=shareCapability(files);try{if(cap.canFiles){await navigator.share({title:'FUTURE HEALTH',files});return}}catch(e){if(e?.name==='AbortError')return;console.warn('[FH native share]',e)}openFallback(items,onlyIndex)}
  function openPreview(items){
    document.getElementById('fhCorePreview')?.remove();const cfg=document.getElementById('shareConfigShade');if(cfg)cfg.style.display='none';
    const d=document.createElement('div');d.id='fhCorePreview';d.innerHTML=`<div class="fhpHead"><button class="fhpBtn" id="fhpBack">← Назад</button><b>Предпросмотр</b><button class="fhpBtn" id="fhpClose">Закрыть</button></div><div class="fhpStage"><div class="fhpTrack">${items.map((it,i)=>`<div class="fhpSlide"><img src="${it.url}" alt="Карточка ${i+1}"></div>`).join('')}</div></div><div class="fhpFoot"><span id="fhpCount">1/${items.length}</span><button class="fhpShare secondary" id="fhpShareOne">Поделиться</button>${items.length>1?'<button class="fhpShare" id="fhpShareAll">Поделиться всеми</button>':'<span></span>'}</div>`;document.body.appendChild(d);
    let idx=0,sx=0,sy=0,scale=1,tx=0,ty=0,startDist=0,startScale=1,startTx=0,startTy=0;
    const track=d.querySelector('.fhpTrack'),stage=d.querySelector('.fhpStage');
    const current=()=>d.querySelectorAll('.fhpSlide img')[idx];
    function apply(){track.style.transform=`translate3d(${-idx*100}vw,0,0)`;const im=current();if(im)im.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${scale})`;d.querySelector('#fhpCount').textContent=`${idx+1}/${items.length}`}
    function reset(){scale=1;tx=ty=0;apply()}
    function dist(a,b){return Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)}
    stage.addEventListener('touchstart',e=>{if(e.touches.length===2){startDist=dist(e.touches[0],e.touches[1]);startScale=scale}else if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;startTx=tx;startTy=ty}},{passive:false});
    stage.addEventListener('touchmove',e=>{e.preventDefault();if(e.touches.length===2&&startDist){scale=Math.max(1,Math.min(4,startScale*dist(e.touches[0],e.touches[1])/startDist));apply()}else if(e.touches.length===1&&scale>1){tx=startTx+(e.touches[0].clientX-sx);ty=startTy+(e.touches[0].clientY-sy);apply()}},{passive:false});
    stage.addEventListener('touchend',e=>{if(scale===1&&e.changedTouches.length){const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)){idx=Math.max(0,Math.min(items.length-1,idx+(dx<0?1:-1)));reset()}}},{passive:true});
    d.querySelector('#fhpBack').onclick=()=>{d.remove();if(cfg)cfg.style.display=''};
    d.querySelector('#fhpClose').onclick=()=>{items.forEach(i=>URL.revokeObjectURL(i.url));d.remove();if(cfg){cfg.style.display='';try{if(typeof closeShareConfig==='function')closeShareConfig();else cfg.remove()}catch{cfg.remove()}}};
    d.querySelector('#fhpShareOne').onclick=()=>shareItems(items,idx);
    d.querySelector('#fhpShareAll')?.addEventListener('click',()=>shareItems(items,null));
    apply();
  }
  // Capture phase deliberately bypasses every legacy inline/added preview handler.
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||!document.getElementById('shareConfigShade')?.contains(b))return;
    if((b.textContent||'').trim().includes('Предпросмотр')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();runPreview(b)}
  },true);
  console.info('[FUTURE HEALTH] isolated preview core loaded',CORE,'V36.9 dynamic cards');
})();
