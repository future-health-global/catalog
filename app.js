const cats=[
{id:'hits',ru:'Хит-продукты',en:'STAR PRODUCTS'},
{id:'health',ru:'Серия для здоровья',en:'HEALTH SERIES'},
{id:'skin',ru:'Серия средств по уходу за кожей',en:'SKIN CARE'},
{id:'cosmetics',ru:'Серия декоративной косметики',en:'COSMETICS'},
{id:'daily',ru:'Серия товаров повседневного спроса',en:'DAILY USE'},
{id:'baby',ru:'Детская серия',en:'SUDOKU BABY'},
{id:'travel',ru:'Дорожная серия',en:'TRAVEL SERIES'},
{id:'other',ru:'Другие товары',en:'OTHER PRODUCTS'}];
const P=(id,cat,name,page,detail=null,img=null,sub='')=>({id,cat,name,page,detail,img,sub});
const products=FULL_PRODUCTS;
let stack=[]; const app=document.getElementById('app');
const favKey='future-health-favorites-v7', recentKey='future-health-recent-v7', searchKey='future-health-search-v7';
const getJSON=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch{return d}};
const setJSON=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function setActive(tab){document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab))}
function closeLayers(){closeSearch();toggleMenu(false)}
function setView(html,state,push=true,tab=''){closeLayers();document.body.classList.remove('reading');if(push&&state)stack.push(state);app.innerHTML=html;requestAnimationFrame(()=>window.scrollTo(0,0));if(tab)setActive(tab)}
function catCount(id){return products.filter(p=>p.cat===id).length}
function catImg(id){return products.find(p=>p.cat===id&&p.img)?.img||''}
function officialFooter(){return `<footer class="officialFooter"><button onclick="showOfficial()"><img src="assets/future-health-mark.png" alt=""><span><b>FUTURE HEALTH</b><small>Официальный каталог для российского рынка · RU 2026.10</small></span><i>›</i></button></footer>`}
function pending(label='Информация будет добавлена после подтверждения компанией'){return `<span class="pending">${label}</span>`}
function officialHtml(){return `<div class="officialPage">
<section class="officialHero"><img src="assets/future-health-logo.png" alt="FUTURE HEALTH"><span class="officialBadge">✓ ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ</span><h1>Официальная информация</h1><p>Сведения о компании, российском направлении и подлинности каталога.</p><div class="versionPill"><b>RU · 2026.10</b><span>Версия для проверки компанией</span></div></section>
<section class="officialCard"><div class="cardTitle"><span>01</span><div><small>ГОЛОВНАЯ КОМПАНИЯ</small><h2>Liaoning Future Biotech Co., Ltd.</h2></div></div><div class="infoRows"><div><b>Наименование на китайском языке</b>${pending('Добавить официальное китайское наименование')}</div><div><b>Юридический адрес в КНР</b>${pending('Добавить юридический адрес')}</div><div><b>Официальный сайт</b>${pending('Добавить официальный домен компании')}</div><div><b>Официальный e-mail</b>${pending('Добавить корпоративный e-mail')}</div></div></section>
<section class="officialBuilding"><img src="assets/brand_p2_0.jpeg" alt="Liaoning Future Biotech"><div><small>FUTURE HEALTH</small><b>Головная компания · Китай</b></div></section>
<section class="officialCard"><div class="cardTitle"><span>02</span><div><small>РОССИЙСКИЙ РЫНОК</small><h2>Официальное представительство</h2></div></div><div class="infoRows"><div><b>Российская компания</b>${pending('Добавить полное юридическое наименование')}</div><div><b>ИНН / ОГРН</b>${pending('Добавить регистрационные данные')}</div><div><b>Юридический адрес</b>${pending('Добавить юридический адрес в России')}</div><div><b>Руководитель российского направления</b>${pending('Добавить ФИО и утверждённую формулировку должности')}</div><div><b>Официальные контакты</b>${pending('Телефон · e-mail · мессенджеры')}</div></div></section>
<section class="officialCard verifyCard"><div class="cardTitle"><span>03</span><div><small>ПРОВЕРКА ПОДЛИННОСТИ</small><h2>Официальный каталог FUTURE HEALTH</h2></div></div><p>После утверждения компанией здесь будет размещена ссылка на страницу официального сайта FUTURE HEALTH, подтверждающую подлинность каталога и полномочия российского направления.</p><button class="verifyDisabled" disabled>✓ Проверить на официальном сайте</button><div class="verifyMeta"><span><b>Каталог</b>FH-RU-2026-10</span><span><b>Статус</b>На согласовании</span><span><b>Дата версии</b>Октябрь 2026</span></div></section>
<section class="officialCard"><div class="cardTitle"><span>04</span><div><small>ДОКУМЕНТЫ</small><h2>Подтверждающие документы</h2></div></div><div class="docList"><div><i>▤</i><span><b>Авторизация российского направления</b><small>Добавить после утверждения / подписания</small></span></div><div><i>▤</i><span><b>Реквизиты российской компании</b><small>Добавить подтверждённые данные</small></span></div><div><i>↗</i><span><b>Официальная страница подтверждения</b><small>Подключить после публикации на сайте компании</small></span></div></div></section>
<div class="officialNote"><b>Для согласования с компанией</b><p>Поля, отмеченные как ожидающие подтверждения, являются местами для официальных данных. Они не публикуются как фактические сведения до утверждения компанией.</p></div>
</div>`}
function showOfficial(push=true){document.body.classList.remove('reading');setView(officialHtml()+officialFooter(),'official',push,'')}
function homeHtml(){return `<section class="homeHero"><div class="heroLogoLine"><img class="heroOfficialMark" src="assets/future-health-mark.png" alt=""><span>FUTURE HEALTH</span></div><div class="heroCatalog">КАТАЛОГ ПРОДУКЦИИ</div><div class="heroSlogan">ДЕЛИМСЯ СЧАСТЬЕМ</div><div class="heroWaves"><i></i><i></i></div></section><div class="wrap"><div id="cats" class="homeHeading"><h1>Категории продукции</h1><button onclick="openSearch()">⌕</button></div><div class="catTiles">${cats.map((c,i)=>`<button onclick="showCategory('${c.id}')"><span class="catPic">${catImg(c.id)?`<img src="${catImg(c.id)}">`:`<b>0${i+1}</b>`}</span><strong>${c.ru}</strong><small>${catCount(c.id)} продуктов</small><i>›</i></button>`).join('')}</div><section id="recent" class="recentBlock">${recentHtml()}</section><section id="about" class="aboutV7"><img src="assets/brand_p2_0.jpeg" alt="Liaoning Future Biotech"><div><small>LIAONING FUTURE BIOTECH CO., LTD.</small><h2>О компании</h2><p>Компания специализируется на разработке, производстве и реализации биологически активных добавок, пищевой продукции, косметики и товаров повседневного спроса.</p><p>У нас работает команда квалифицированных специалистов в области биотехнологий, а также имеется парк современного производственного оборудования.</p><button class="aboutOfficialBtn" onclick="showOfficial()">Официальная информация <i>›</i></button></div></section>${officialFooter()}</div>`}
function recentHtml(){let ids=getJSON(recentKey).slice(0,6),ps=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);if(!ps.length)return '';return `<div class="blockTitle"><h2>Недавно просмотренные</h2></div><div class="recentRow">${ps.map(p=>`<button onclick="showProduct('${p.id}')">${p.img?`<img src="${p.img}">`:''}<span>${p.name}</span></button>`).join('')}</div>`}
function goHome(push=true){document.body.classList.remove('reading');setView(homeHtml(),'home',push,'home')}
function showAll(push=true){document.body.classList.remove('reading');setView(`<div class="pageHead"><div><small>FUTURE HEALTH</small><h1>Каталог</h1><p>Выберите категорию продукции</p></div><button onclick="openSearch()">⌕</button></div><div class="catTiles catalogTiles">${cats.map((c,i)=>`<button onclick="showCategory('${c.id}')"><span class="catPic">${catImg(c.id)?`<img src="${catImg(c.id)}">`:`<b>0${i+1}</b>`}</span><strong>${c.ru}</strong><small>${catCount(c.id)} продуктов</small><i>›</i></button>`).join('')}</div>`,'all',push,'catalog')}
function showCategory(id,push=true){document.body.classList.remove('reading');let c=cats.find(x=>x.id===id),ps=products.filter(p=>p.cat===id);setView(`<div class="categoryHead"><button onclick="showAll()">‹</button><div><h1>${c.ru}</h1><small>${ps.length} продуктов</small></div><button onclick="openSearch('${id}')">⌕</button></div><div class="filterRow"><button class="active">Все</button><button>Капсулы</button><button>Напитки</button><button>Таблетки</button></div>${gridHtml(ps)}`,`cat:${id}`,push,'catalog')}
function gridHtml(ps){let fav=getJSON(favKey);return `<div class="productGrid">${ps.map((p,i)=>`<article><button class="heart ${fav.includes(p.id)?'on':''}" onclick="event.stopPropagation();toggleFav('${p.id}',this)">${fav.includes(p.id)?'♥':'♡'}</button><button class="productMain" onclick="showProduct('${p.id}')"><span class="gridPic">${p.img?`<img src="${p.img}">`:`<b>${String(i+1).padStart(2,'0')}</b>`}</span><strong>${p.name}</strong><i>›</i></button></article>`).join('')}</div>`}
function cleanImg(p){return p.v14img || (p.img?p.img.replace('assets/pages/','assets/product-clean/'):'' )}
function productPageHtml(p,c,idx,total){let fav=getJSON(favKey).includes(p.id),body=p.detail?p.detail.filter(x=>!/^\d{2}(STAR PRODUCTS|HEALTH SERIES|SKIN CARE|COSMETICS|DAILY USE|SUDOKU BABY|TRAVEL SERIES|OTHER PRODUCTS)/i.test(x)).map(x=>`<p>${x}</p>`).join(''):`<div class="empty">Информация будет добавлена из официального каталога.</div>`;let hero=cleanImg(p);let titleClass=p.name.length>72?' longTitle':'';return `<section class="readerPage" data-product="${p.id}"><div class="productTop"><span>${c.ru}</span><b>${idx+1} / ${total}</b></div><div class="seriesProgress"><i style="width:${(idx+1)/total*100}%"></i></div>${hero?`<button class="productHero cleanHero ${p.spread?'spreadHero':''}" onclick="openScan('${hero}')"><img src="${hero}" alt="${p.name.replaceAll('\"','&quot;')}"></button>`:''}<article class="productArticle"><div class="productTitleRow"><h1 class="${titleClass}">${p.name}</h1><button class="heart big ${fav?'on':''}" onclick="toggleFav('${p.id}',this)">${fav?'♥':'♡'}</button></div>${p.sub?`<h3>${p.sub.replace('Оригинальная страница каталога · ','Каталог · ')}</h3>`:''}${body}</article></section>`}
function showProduct(id,push=true){let p=products.find(x=>x.id===id),c=cats.find(x=>x.id===p.cat),ps=products.filter(x=>x.cat===p.cat),idx=ps.findIndex(x=>x.id===id);addRecent(id);closeLayers();if(push)stack.push(`product:${id}`);app.innerHTML=`<div class="readerHeader"><button onclick="showCategory('${p.cat}')">‹</button><span>${c.ru}</span><button onclick="openSearch('${p.cat}')">⌕</button></div><div id="reader" class="reader">${ps.map((x,i)=>productPageHtml(x,c,i,ps.length)).join('')}</div>`;setActive('catalog');document.body.classList.add('reading');const r=document.getElementById('reader');requestAnimationFrame(()=>{r.scrollLeft=idx*r.clientWidth});let timer;r.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(()=>{let i=Math.round(r.scrollLeft/r.clientWidth),cur=ps[i];if(cur){addRecent(cur.id);if(stack.length&&stack[stack.length-1].startsWith('product:'))stack[stack.length-1]=`product:${cur.id}`}},90)},{passive:true})}
function openScan(src){let ov=document.createElement('div');ov.className='scanViewer';ov.innerHTML=`<button class="scanClose">×</button><div class="scanStage"><img src="${src}"></div><small>Разведите пальцы для увеличения · прокручивайте страницу</small>`;document.body.appendChild(ov);ov.querySelector('.scanClose').onclick=()=>ov.remove();ov.onclick=e=>{if(e.target===ov)ov.remove()}}
function addRecent(id){let a=getJSON(recentKey).filter(x=>x!==id);a.unshift(id);setJSON(recentKey,a.slice(0,12))}
function toggleFav(id,el){let a=getJSON(favKey),on=a.includes(id);a=on?a.filter(x=>x!==id):[...a,id];setJSON(favKey,a);if(el){el.classList.toggle('on',!on);el.textContent=!on?'♥':'♡'}if(document.querySelector('.favoritesPage'))showFavorites(false)}
function showFavorites(push=true){document.body.classList.remove('reading');let a=getJSON(favKey),ps=a.map(id=>products.find(p=>p.id===id)).filter(Boolean);setView(`<div class="pageHead"><div><small>FUTURE HEALTH</small><h1>Избранное</h1><p>${ps.length?`${ps.length} сохранённых продуктов`:'Сохраняйте интересные продукты с помощью ♡'}</p></div></div><div class="favoritesPage">${ps.length?gridHtml(ps):`<div class="emptyState"><span>♡</span><h2>Пока ничего нет</h2><p>Добавьте продукты в избранное, чтобы быстро вернуться к ним позже.</p><button onclick="showAll()">Открыть каталог</button></div>`}</div>`,'favorites',push,'favorites')}
function toggleMenu(force){let d=document.getElementById('drawer'),sh=document.getElementById('shade');let open=typeof force==='boolean'?force:!d.classList.contains('open');d.classList.toggle('open',open);sh.classList.toggle('open',open)}
function openSearch(cat=''){toggleMenu(false);document.getElementById('searchPanel').classList.add('open');setActive('search');let inp=document.getElementById('searchInput');inp.dataset.cat=cat;inp.value='';renderSearch('');setTimeout(()=>inp.focus(),120)}
function closeSearch(){document.getElementById('searchPanel')?.classList.remove('open')}
function clearSearch(){let i=document.getElementById('searchInput');i.value='';renderSearch('');i.focus()}
function renderSearch(q){let box=document.getElementById('searchResults'),inp=document.getElementById('searchInput'),cat=inp?.dataset.cat||'',s=q.trim().toLowerCase(),history=getJSON(searchKey);if(s.length<3){box.innerHTML=`<div class="searchHint">Введите не менее 3 символов для поиска</div>${history.length?`<div class="searchSection"><div><h3>Недавние запросы</h3><button onclick="setJSON(searchKey,[]);renderSearch('')">Очистить</button></div><div class="searchTags">${history.map(x=>`<button onclick="useSearch('${x.replaceAll("'","\\'")}')">${x}</button>`).join('')}</div></div>`:''}`;return}let ps=products.filter(p=>(!cat||p.cat===cat)&&p.name.toLowerCase().includes(s));box.innerHTML=`<div class="resultCount">Результаты (${ps.length})</div><div class="searchList">${ps.slice(0,30).map(p=>`<button onclick="saveSearch('${s.replaceAll("'","\\'")}');showProduct('${p.id}')">${p.img?`<img src="${p.img}">`:`<span></span>`}<b>${p.name}<small>${cats.find(c=>c.id===p.cat)?.ru||''}</small></b><i>›</i></button>`).join('')}</div>`}
function saveSearch(s){let a=getJSON(searchKey).filter(x=>x!==s);a.unshift(s);setJSON(searchKey,a.slice(0,8))}
function useSearch(s){let i=document.getElementById('searchInput');i.value=s;renderSearch(s)}
function goBack(){let cur=stack.pop(),prev=stack.pop();if(!prev)return goHome(false);route(prev,false)}
function route(s,push=false){document.body.classList.remove('reading');if(s==='home')goHome(push);else if(s==='all')showAll(push);else if(s==='favorites')showFavorites(push);else if(s==='official')showOfficial(push);else if(s.startsWith('cat:'))showCategory(s.slice(4),push);else if(s.startsWith('product:'))showProduct(s.slice(8),push)}
function scrollTopNow(){let rp=document.querySelector('.readerPage');(rp||window).scrollTo?.({top:0,behavior:'smooth'});if(!rp)window.scrollTo({top:0,behavior:'smooth'})}
document.getElementById('drawerCats').innerHTML=cats.map(c=>`<button onclick="showCategory('${c.id}')"><span>${c.ru}</span><small>${catCount(c.id)}</small><i>›</i></button>`).join('');
window.addEventListener('scroll',()=>{let b=document.getElementById('toTop');if(b)b.classList.toggle('show',window.scrollY>500)});
goHome(false);

/* ===== V17 interaction upgrades ===== */
const SHORT_CATS={hits:'Хиты',health:'БАДы',skin:'Уход',cosmetics:'Косметика',daily:'Ежедневное',baby:'Детская',travel:'Дорожная',other:'Другое'};
const _homeHtmlV15=homeHtml;
homeHtml=function(){let h=_homeHtmlV15();const quick=`<div class="seriesQuick">${cats.map(c=>`<button onclick="showCategory('${c.id}')">${SHORT_CATS[c.id]||c.ru}</button>`).join('')}</div>`;return h.replace('<div class="wrap">',`<div class="wrap">${quick}`)};
const _showAllV15=showAll;
showAll=function(push=true){document.body.classList.remove('reading');setView(`<div class="pageHead"><div><small>FUTURE HEALTH</small><h1>Каталог</h1><p>Выберите серию</p></div></div><div class="seriesQuick catalogQuick">${cats.map(c=>`<button onclick="showCategory('${c.id}')">${SHORT_CATS[c.id]||c.ru}</button>`).join('')}</div><div class="catTiles catalogTiles">${cats.map((c,i)=>`<button onclick="showCategory('${c.id}')"><span class="catPic">${catImg(c.id)?`<img src="${catImg(c.id)}">`:`<b>0${i+1}</b>`}</span><strong>${c.ru}</strong><small>${catCount(c.id)} продуктов</small><i>›</i></button>`).join('')}</div>`,'all',push,'catalog')};
function typeOfProduct(p){const n=p.name.toLowerCase();if(/капсул/.test(n))return 'Капсулы';if(/напит|порош|кофе|чай/.test(n))return 'Напитки';if(/таблет/.test(n))return 'Таблетки';if(/маск/.test(n))return 'Маски';if(/крем|сыворот|эмульс|лосьон/.test(n))return 'Уход';if(/очищ|мыло|шампун|гель/.test(n))return 'Очищение';return 'Другое'}
showCategory=function(id,push=true){document.body.classList.remove('reading');let c=cats.find(x=>x.id===id),ps=products.filter(p=>p.cat===id);setView(`<div class="categoryHead"><button onclick="showAll()">‹</button><div><h1>${c.ru}</h1><small>${ps.length} продуктов</small></div><span></span></div><div class="seriesQuick categoryQuick">${cats.map(x=>`<button class="${x.id===id?'active':''}" onclick="showCategory('${x.id}')">${SHORT_CATS[x.id]||x.ru}</button>`).join('')}</div>${gridHtml(ps)}`,`cat:${id}`,push,'catalog')};
function accText(p,kind){let d=(p.detail||[]).join(' ');if(kind==='adv')return p.sub||'Информация из официального каталога продукции.';if(kind==='comp')return /состав/i.test(d)?d:'Состав будет добавлен после структурирования официальных данных.';if(kind==='use')return /примен|приним|нанос/i.test(d)?d:'Способ применения будет добавлен из утверждённых материалов.';return 'Дополнительные рекомендации будут добавлены после подтверждения компанией.'}
const _productPageHtmlV15=productPageHtml;
productPageHtml=function(p,c,idx,total){let h=_productPageHtmlV15(p,c,idx,total);const acc=`<div class="productAccordions"><div class="accItem"><button onclick="toggleAcc(this)"><span>▣ Ключевые преимущества</span><span class="chev">›</span></button><div class="accBody">${accText(p,'adv')}</div></div><div class="accItem"><button onclick="toggleAcc(this)"><span>▣ Состав</span><span class="chev">›</span></button><div class="accBody">${accText(p,'comp')}</div></div><div class="accItem"><button onclick="toggleAcc(this)"><span>▣ Способ применения</span><span class="chev">›</span></button><div class="accBody">${accText(p,'use')}</div></div><div class="accItem"><button onclick="toggleAcc(this)"><span>▣ Рекомендации</span><span class="chev">›</span></button><div class="accBody">${accText(p,'rec')}</div></div></div>`;return h.replace('</article></section>',`</article>${acc}</section>`)};
function toggleAcc(btn){btn.parentElement.classList.toggle('open')}
function ensureSeriesDrawer(){if(document.getElementById('seriesDrawer'))return;document.body.insertAdjacentHTML('beforeend',`<div id="seriesShade" class="seriesShade" onclick="closeSeriesDrawer()"></div><aside id="seriesDrawer" class="seriesDrawer"><div class="seriesDrawerHead"><b id="seriesDrawerTitle"></b><button onclick="closeSeriesDrawer()">×</button></div><div id="seriesDrawerList" class="seriesDrawerList"></div></aside>`);let d=document.getElementById('seriesDrawer'),sx=0,dx=0;d.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;dx=0},{passive:true});d.addEventListener('touchmove',e=>{dx=e.touches[0].clientX-sx},{passive:true});d.addEventListener('touchend',()=>{if(dx>55)closeSeriesDrawer()})}
function drawerProductName(name){return String(name||'').replace(/^\s*SUDOKU(?:®|\u00ae)?\s*/i,'').trim()}
function openSeriesDrawer(cat,current){ensureSeriesDrawer();let c=cats.find(x=>x.id===cat),ps=products.filter(p=>p.cat===cat);document.getElementById('seriesDrawerTitle').textContent=c.ru;document.getElementById('seriesDrawerList').innerHTML=ps.map((p,i)=>{let im=cleanImg(p);return `<button class="${p.id===current?'active':''}" onclick="closeSeriesDrawer();showProduct('${p.id}')"><span class="seriesDrawerThumb">${im?`<img src="${im}" alt="">`:`<b>${String(i+1).padStart(2,'0')}</b>`}</span><span class="seriesDrawerText"><b>${drawerProductName(p.name)}</b><small>${c.ru}</small></span></button>`}).join('');document.getElementById('seriesDrawer').classList.add('open');document.getElementById('seriesShade').classList.add('open')}
function closeSeriesDrawer(){document.getElementById('seriesDrawer')?.classList.remove('open');document.getElementById('seriesShade')?.classList.remove('open')}
showProduct=function(id,push=true){let p=products.find(x=>x.id===id),c=cats.find(x=>x.id===p.cat),ps=products.filter(x=>x.cat===p.cat),idx=ps.findIndex(x=>x.id===id);addRecent(id);closeLayers();if(push)stack.push(`product:${id}`);app.innerHTML=`<div class="readerHeader"><button onclick="showCategory('${p.cat}')">‹</button><span>${c.ru}</span><button class="seriesMenuBtn" onclick="openSeriesDrawer('${p.cat}','${p.id}')">☰</button></div><div id="reader" class="reader">${ps.map((x,i)=>productPageHtml(x,c,i,ps.length)).join('')}</div>`;setActive('catalog');document.body.classList.add('reading');const r=document.getElementById('reader');requestAnimationFrame(()=>{r.scrollLeft=idx*r.clientWidth});let timer;r.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(()=>{let i=Math.round(r.scrollLeft/r.clientWidth),cur=ps[i];if(cur){addRecent(cur.id);if(stack.length&&stack[stack.length-1].startsWith('product:'))stack[stack.length-1]=`product:${cur.id}`}},80)},{passive:true});r.querySelectorAll('.readerPage').forEach(pg=>pg.addEventListener('scroll',()=>{document.getElementById('toTop')?.classList.toggle('show',pg.scrollTop>450)},{passive:true}))};
scrollTopNow=function(){let pg=document.querySelector('.readerPage');if(pg)pg.scrollTo({top:0,behavior:'smooth'});else app.scrollTo({top:0,behavior:'smooth'})};
openScan=function(src){let ov=document.createElement('div');ov.className='scanViewer';ov.innerHTML=`<button class="scanClose">×</button><div class="scanStage"><img draggable="false" src="${src}"></div><div class="galleryDots">1 / 1</div>`;document.body.appendChild(ov);let im=ov.querySelector('img');im.oncontextmenu=e=>e.preventDefault();im.addEventListener('click',()=>ov.remove());ov.querySelector('.scanClose').onclick=()=>ov.remove()};
document.addEventListener('contextmenu',e=>{if(e.target.closest('.productHero,.gridPic,.scanViewer'))e.preventDefault()});
// left drawer: swipe left to close
(()=>{let d=document.getElementById('drawer'),sx=0,dx=0;if(!d)return;d.insertAdjacentHTML('beforeend','<div class="drawerSwipeHint">← Проведите влево, чтобы закрыть</div>');d.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;dx=0},{passive:true});d.addEventListener('touchmove',e=>{dx=e.touches[0].clientX-sx},{passive:true});d.addEventListener('touchend',()=>{if(dx<-55)toggleMenu(false)})})();
// app shell owns scrolling, not window
app.addEventListener('scroll',()=>{if(!document.body.classList.contains('reading'))document.getElementById('toTop')?.classList.toggle('show',app.scrollTop>500)},{passive:true});

// ===== V21 locked patch: preserve V19 product detail + add simulated price/PV =====
// Deterministic simulated values so the same product keeps the same demo price on every reload.
function demoHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
products.forEach(p=>{
  const h=demoHash(p.id);
  // 1000–5000 RUB, intentionally not rounded to hundreds/thousands; even value keeps non-hit PV integral.
  let price=1000+((h%2001)*2); if(price>5000) price=5000;
  if(price%100===0) price=Math.min(4998,price+26);
  p.priceRub=price;
  p.pv=(p.cat==='hits')?price:price/2;
});
function commerceHtmlV21(p,compact=false){
  const price=`${Number(p.priceRub).toLocaleString('ru-RU')} ₽`;
  const pv=`${Number(p.pv).toLocaleString('ru-RU')} PV`;
  return compact?`<div class="cardCommerce"><span>${price}</span><span>${pv}</span></div>`:`<div class="productCommerce"><span class="pricePill">Цена: ${price}</span><span class="pvPill">${pv}</span></div>`;
}
// Product cards: V19 card stays unchanged except price/PV row.
gridHtml=function(ps){let fav=getJSON(favKey);return `<div class="productGrid">${ps.map((p,i)=>`<article><button class="heart ${fav.includes(p.id)?'on':''}" onclick="event.stopPropagation();toggleFav('${p.id}',this)">${fav.includes(p.id)?'♥':'♡'}</button><button class="productMain" onclick="showProduct('${p.id}')"><span class="gridPic">${p.img?`<img src="${p.img}">`:`<b>${String(i+1).padStart(2,'0')}</b>`}</span><strong>${p.name}</strong>${commerceHtmlV21(p,true)}<i>›</i></button></article>`).join('')}</div>`};
// IMPORTANT: wrap the already-approved V19 detail renderer, which already contains all four accordions.
const _productPageHtmlV21Approved=productPageHtml;
productPageHtml=function(p,c,idx,total){
  let h=_productPageHtmlV21Approved(p,c,idx,total);
  const marker='<div class="productTitleRow">';
  const start=h.indexOf(marker);
  if(start>=0){const end=h.indexOf('</div>',start+marker.length);if(end>=0)h=h.slice(0,end+6)+commerceHtmlV21(p)+h.slice(end+6)}
  return h;
};
// Left drawer always starts at its true top.
const _toggleMenuV21=toggleMenu;
toggleMenu=function(force){const d=document.getElementById('drawer');const was=d?.classList.contains('open');_toggleMenuV21(force);const now=d?.classList.contains('open');if(now&&!was&&d)d.scrollTop=0;};

// ===== V22 locked patch: no image saving in catalog; pinch zoom in full-screen viewer =====
// Prevent Safari's image callout / drag path everywhere in the public catalogue.
document.addEventListener('contextmenu',e=>{if(e.target.closest('img,.productHero,.gridPic,.catPic,.seriesDrawerThumb,.recentRow,.searchList,.scanViewer'))e.preventDefault()},true);
document.addEventListener('dragstart',e=>{if(e.target.closest('img'))e.preventDefault()},true);
document.addEventListener('selectstart',e=>{if(e.target.closest('img,.productHero,.gridPic,.catPic,.seriesDrawerThumb'))e.preventDefault()},true);

openScan=function(src){
  const ov=document.createElement('div');
  ov.className='scanViewer';
  ov.innerHTML=`<button class="scanClose" aria-label="Закрыть">×</button><div class="scanStage"><img draggable="false" src="${src}" alt=""></div><div class="galleryDots">1 / 1</div><div class="zoomHint">Дважды нажмите или разведите двумя пальцами</div>`;
  document.body.appendChild(ov);
  const stage=ov.querySelector('.scanStage'), im=ov.querySelector('img');
  const close=()=>ov.remove();
  ov.querySelector('.scanClose').onclick=close;
  ov.addEventListener('contextmenu',e=>e.preventDefault(),true);
  im.setAttribute('draggable','false');

  let scale=1,tx=0,ty=0,startScale=1,startTx=0,startTy=0,startDist=0,startMid=null;
  let oneStart=null,moved=false,lastTap=0,singleTapTimer=0;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const dist=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  const mid=t=>({x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2});
  function limits(){
    const sw=stage.clientWidth,sh=stage.clientHeight,bw=im.offsetWidth,bh=im.offsetHeight;
    return {x:Math.max(0,(bw*scale-sw)/2),y:Math.max(0,(bh*scale-sh)/2)};
  }
  function apply(){
    scale=clamp(scale,1,4);
    if(scale<=1.001){scale=1;tx=0;ty=0}else{const l=limits();tx=clamp(tx,-l.x,l.x);ty=clamp(ty,-l.y,l.y)}
    im.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${scale})`;
    ov.classList.toggle('zoomed',scale>1.01);
  }
  function toggleDoubleZoom(){scale=scale>1.01?1:2;tx=0;ty=0;apply()}

  im.addEventListener('touchstart',e=>{
    moved=false;
    if(e.touches.length===2){
      e.preventDefault();
      clearTimeout(singleTapTimer);
      startScale=scale;startTx=tx;startTy=ty;startDist=dist(e.touches);startMid=mid(e.touches);oneStart=null;
    }else if(e.touches.length===1){
      oneStart={x:e.touches[0].clientX,y:e.touches[0].clientY,tx,ty,time:Date.now()};
      if(scale>1)e.preventDefault();
    }
  },{passive:false});
  im.addEventListener('touchmove',e=>{
    if(e.touches.length===2 && startMid){
      e.preventDefault();moved=true;
      const m=mid(e.touches),newScale=clamp(startScale*(dist(e.touches)/Math.max(1,startDist)),1,4);
      const r=newScale/startScale,rect=stage.getBoundingClientRect(),cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
      scale=newScale;
      tx=(m.x-cx)-((startMid.x-cx)-startTx)*r;
      ty=(m.y-cy)-((startMid.y-cy)-startTy)*r;
      apply();
    }else if(e.touches.length===1 && scale>1 && oneStart){
      e.preventDefault();
      const x=e.touches[0].clientX,y=e.touches[0].clientY;
      if(Math.hypot(x-oneStart.x,y-oneStart.y)>5)moved=true;
      tx=oneStart.tx+(x-oneStart.x);ty=oneStart.ty+(y-oneStart.y);apply();
    }
  },{passive:false});
  im.addEventListener('touchend',e=>{
    if(e.touches.length){return}
    startMid=null;
    if(moved){oneStart=null;return}
    const now=Date.now();
    if(now-lastTap<320){
      clearTimeout(singleTapTimer);lastTap=0;toggleDoubleZoom();
    }else{
      lastTap=now;
      singleTapTimer=setTimeout(()=>{lastTap=0;close()},330);
    }
    oneStart=null;
  },{passive:true});
  im.addEventListener('dblclick',e=>{e.preventDefault();e.stopPropagation();clearTimeout(singleTapTimer);toggleDoubleZoom()});
};

// ===== V23 locked additive feature: Расчёт (pre-purchase list) =====
// V22 UI/interaction stays intact. Search remains in the top-right icon.
const calcKey='future-health-calculation-v23';
function getCalc(){return getJSON(calcKey,{})||{}}
function setCalc(v){localStorage.setItem(calcKey,JSON.stringify(v));updateCalcBadge()}
function calcCount(){return Object.values(getCalc()).reduce((a,n)=>a+(Number(n)||0),0)}
function updateCalcBadge(){const b=document.getElementById('calcBadge');if(!b)return;const n=calcCount();b.textContent=n>99?'99+':String(n||'');b.classList.toggle('show',n>0)}
function inCalc(id){return Number(getCalc()[id]||0)>0}
function toggleCalc(id,ev){if(ev)ev.stopPropagation();const c=getCalc();if(c[id])delete c[id];else c[id]=1;setCalc(c);document.querySelectorAll(`[data-calc-add="${id}"]`).forEach(b=>{b.classList.toggle('added',!!c[id]);b.setAttribute('aria-label',c[id]?'Удалить из расчёта':'Добавить в расчёт')});if(document.querySelector('.calcPage'))showCalculation(false)}
function changeCalc(id,d){const c=getCalc();const n=Math.max(0,(Number(c[id])||0)+d);if(n)c[id]=n;else delete c[id];setCalc(c);showCalculation(false)}
function removeCalc(id){const c=getCalc();delete c[id];setCalc(c);showCalculation(false)}
function clearCalculation(){if(!calcCount())return;if(confirm('Очистить весь расчёт?')){setCalc({});showCalculation(false)}}
function calcIconButton(p){const on=inCalc(p.id);return `<button class="calcAdd ${on?'added':''}" data-calc-add="${p.id}" onclick="toggleCalc('${p.id}',event)" aria-label="${on?'Удалить из расчёта':'Добавить в расчёт'}"><span class="miniCalculator"><i></i><i></i><i></i><i></i></span><b>${on?'✓':'+'}</b></button>`}
// Add the calculator button beside price/PV, without touching the approved accordions/detail structure.
const _commerceHtmlV23=commerceHtmlV21;
commerceHtmlV21=function(p,compact=false){
  const base=_commerceHtmlV23(p,compact);
  if(compact)return base;
  return base.replace('</div>',`${calcIconButton(p)}</div>`);
};
function calcTotals(){const c=getCalc();let rub=0,pv=0,qty=0,lines=[];for(const [id,n0] of Object.entries(c)){const p=products.find(x=>x.id===id),n=Number(n0)||0;if(!p||!n)continue;qty+=n;rub+=p.priceRub*n;pv+=p.pv*n;lines.push({p,n,rub:p.priceRub*n,pv:p.pv*n})}return{rub,pv,qty,lines}}
function shortCalcName(n){return n.replace(/^SUDOKU(?:®|™)?\s*/i,'').trim()}
function showCalculation(push=true){document.body.classList.remove('reading');const t=calcTotals();const rows=t.lines.map(({p,n,rub,pv})=>`<article class="calcItem"><button class="calcProduct" onclick="showProduct('${p.id}')"><span>${p.img?`<img src="${p.img}" alt="">`:''}</span><div><b>${shortCalcName(p.name)}</b><small>${Number(p.priceRub).toLocaleString('ru-RU')} ₽ · ${Number(p.pv).toLocaleString('ru-RU')} PV / шт.</small></div></button><div class="calcControls"><button onclick="changeCalc('${p.id}',-1)">−</button><strong>${n}</strong><button onclick="changeCalc('${p.id}',1)">+</button><span><b>${Number(rub).toLocaleString('ru-RU')} ₽</b><small>${Number(pv).toLocaleString('ru-RU')} PV</small></span><button class="calcRemove" onclick="removeCalc('${p.id}')">×</button></div></article>`).join('');
  const html=`<div class="calcPage"><div class="calcHead"><div><small>FUTURE HEALTH</small><h1>Расчёт</h1><p>Предварительный список продуктов перед покупкой</p></div>${t.lines.length?`<button onclick="clearCalculation()">Очистить</button>`:''}</div>${rows||`<div class="emptyState calcEmpty"><span class="bigCalculator">▦</span><h2>Список пока пуст</h2><p>Добавляйте продукты кнопкой-калькулятором рядом с ценой.</p><button onclick="showAll()">Открыть каталог</button></div>`}${t.lines.length?`<section class="calcSummary"><div><span>Позиций</span><b>${t.lines.length}</b></div><div><span>Количество</span><b>${t.qty} шт.</b></div><div class="calcGrand"><span>Итого</span><b>${Number(t.rub).toLocaleString('ru-RU')} ₽</b><strong>${Number(t.pv).toLocaleString('ru-RU')} PV</strong></div><p>Предварительный расчёт. Не является заказом или подтверждением покупки.</p><div class="calcActions"><button onclick="shareCalculation()">↗ Поделиться списком</button><button onclick="copyCalculation()">▤ Скопировать</button></div></section>`:''}</div>`;
  setView(html,'calc',push,'calc');updateCalcBadge();
}
function calculationText(){const t=calcTotals();const lines=['FUTURE HEALTH — Предварительный расчёт',''];t.lines.forEach(({p,n,rub,pv})=>lines.push(`${shortCalcName(p.name)} × ${n} — ${Number(rub).toLocaleString('ru-RU')} ₽ / ${Number(pv).toLocaleString('ru-RU')} PV`));lines.push('',`Итого: ${Number(t.rub).toLocaleString('ru-RU')} ₽ / ${Number(t.pv).toLocaleString('ru-RU')} PV`,`Количество: ${t.qty} шт.`,'','Предварительный расчёт. Не является заказом или подтверждением покупки.');return lines.join('\n')}
async function copyCalculation(){const text=calculationText();try{await navigator.clipboard.writeText(text);alert('Список скопирован')}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();alert('Список скопирован')}}
async function shareCalculation(){const text=calculationText();if(navigator.share){try{await navigator.share({title:'FUTURE HEALTH — Расчёт',text});return}catch(e){if(e?.name==='AbortError')return}}await copyCalculation()}
// Route/back support for the new page.
const _routeV23=route;
route=function(s,push=false){if(s==='calc')showCalculation(push);else _routeV23(s,push)};
updateCalcBadge();

/* ===== V24: locked Расчёт UX refinement ===== */
// Product page: quantity is decided at the product itself. 0 removes it from Расчёт.
function productQty(id){return Math.max(0,Number(getCalc()[id]||0))}
function productQtyChange(id,d,ev){if(ev)ev.stopPropagation();const c=getCalc();const n=Math.max(0,(Number(c[id])||0)+d);if(n===0)delete c[id];else c[id]=n;setCalc(c);document.querySelectorAll(`[data-product-qty="${id}"]`).forEach(el=>el.textContent=n);}
function productQtyControl(p){const n=productQty(p.id);return `<div class="productQty" aria-label="Количество для расчёта"><button onclick="productQtyChange('${p.id}',-1,event)" aria-label="Уменьшить">−</button><strong data-product-qty="${p.id}">${n}</strong><button onclick="productQtyChange('${p.id}',1,event)" aria-label="Увеличить">+</button></div>`}
commerceHtmlV21=function(p,compact=false){
  const base=_commerceHtmlV23(p,compact);
  if(compact)return base;
  return base.replace('</div>',`${productQtyControl(p)}</div>`);
};

// Calculation page: zero is a valid retained state; only × removes the row.
function calcTotalsV24(){const c=getCalc();let rub=0,pv=0,qty=0,lines=[];for(const [id,n0] of Object.entries(c)){const p=products.find(x=>x.id===id);if(!p)continue;const n=Math.max(0,Number(n0)||0);qty+=n;rub+=p.priceRub*n;pv+=p.pv*n;lines.push({p,n,rub:p.priceRub*n,pv:p.pv*n})}return{rub,pv,qty,lines}}
function changeCalcList(id,d){const c=getCalc();if(!(id in c))c[id]=0;c[id]=Math.max(0,(Number(c[id])||0)+d);setCalc(c);showCalculation(false)}
calcTotals=calcTotalsV24;
showCalculation=function(push=true){document.body.classList.remove('reading');const t=calcTotals();const rows=t.lines.map(({p,n,rub,pv})=>`<article class="calcItem ${n===0?'zeroQty':''}"><button class="calcProduct" onclick="showProduct('${p.id}')"><span>${p.img?`<img src="${p.img}" alt="">`:''}</span><div><b>${shortCalcName(p.name)}</b><small>${Number(p.priceRub).toLocaleString('ru-RU')} ₽ · ${Number(p.pv).toLocaleString('ru-RU')} PV / шт.</small></div></button><div class="calcControls"><button onclick="changeCalcList('${p.id}',-1)">−</button><strong>${n}</strong><button onclick="changeCalcList('${p.id}',1)">+</button><span><b>${Number(rub).toLocaleString('ru-RU')} ₽</b><small>${Number(pv).toLocaleString('ru-RU')} PV</small></span><button class="calcRemove" onclick="removeCalc('${p.id}')" aria-label="Удалить">×</button></div></article>`).join('');
 const html=`<div class="calcPage"><div class="calcHead"><div><small>FUTURE HEALTH</small><h1>Расчёт</h1><p>Предварительный список продуктов перед покупкой</p></div>${t.lines.length?`<button onclick="clearCalculation()">Очистить</button>`:''}</div>${rows||`<div class="emptyState calcEmpty"><span class="bigCalculator">⌗</span><h2>Список пока пуст</h2><p>Укажите количество прямо на странице продукта.</p><button onclick="showAll()">Открыть каталог</button></div>`}${t.lines.length?`<section class="calcSummary"><div><span>Позиций</span><b>${t.lines.length}</b></div><div><span>Количество</span><b>${t.qty} шт.</b></div><div class="calcGrand"><span>Итого</span><b>${Number(t.rub).toLocaleString('ru-RU')} ₽</b><strong>${Number(t.pv).toLocaleString('ru-RU')} PV</strong></div><p>Предварительный расчёт. Не является заказом или подтверждением покупки.</p><div class="calcActions"><button onclick="shareCalculation()">↗ Поделиться</button><button onclick="copyCalculation()">▤ Скопировать</button></div></section>`:''}</div>`;
 setView(html,'calc',push,'calc');updateCalcBadge();
};
calculationText=function(){const t=calcTotals();const lines=['FUTURE HEALTH — Предварительный расчёт',''];t.lines.forEach(({p,n,rub,pv})=>lines.push(`${shortCalcName(p.name)} × ${n} — ${Number(rub).toLocaleString('ru-RU')} ₽ / ${Number(pv).toLocaleString('ru-RU')} PV`));lines.push('',`Итого: ${Number(t.rub).toLocaleString('ru-RU')} ₽ / ${Number(t.pv).toLocaleString('ru-RU')} PV`,`Количество: ${t.qty} шт.`,'','Предварительный расчёт. Не является заказом или подтверждением покупки.');return lines.join('\n')};
shareCalculation=async function(){const text=calculationText();if(navigator.share){try{await navigator.share({title:'FUTURE HEALTH — Расчёт',text});}catch(e){if(e?.name!=='AbortError')alert('Не удалось открыть системное меню «Поделиться».');}}else alert('Системное меню «Поделиться» недоступно в этом браузере. Используйте «Скопировать».');};

// Favorites: select several liked products and add them to Расчёт in one action.
let favSelection=new Set();
function toggleFavSelection(id,on){on?favSelection.add(id):favSelection.delete(id);updateFavBulkState()}
function selectAllFavs(on){document.querySelectorAll('.favSelect input').forEach(i=>{i.checked=on;toggleFavSelection(i.value,on)});updateFavBulkState()}
function updateFavBulkState(){const add=document.getElementById('favAddSelected'),clear=document.getElementById('favClearSelected');if(add){add.disabled=!favSelection.size;add.textContent=favSelection.size?`Добавить в расчёт (${favSelection.size})`:'Добавить в расчёт'}if(clear){clear.disabled=!favSelection.size;clear.textContent=favSelection.size?`Удалить (${favSelection.size})`:'Удалить'}}
function addSelectedFavs(){if(!favSelection.size)return;const c=getCalc();favSelection.forEach(id=>{if(!(id in c)||Number(c[id])<=0)c[id]=1});setCalc(c);alert('Выбранные продукты добавлены в расчёт');}
function clearSelectedFavs(){if(!favSelection.size)return;let a=getJSON(favKey).filter(id=>!favSelection.has(id));setJSON(favKey,a);favSelection=new Set();showFavorites(false)}
showFavorites=function(push=true){document.body.classList.remove('reading');let a=getJSON(favKey),ps=a.map(id=>products.find(p=>p.id===id)).filter(Boolean);favSelection=new Set();const rows=ps.map(p=>`<article class="favBatchItem"><label class="favSelect"><input type="checkbox" value="${p.id}" onchange="toggleFavSelection('${p.id}',this.checked)"><i></i></label><button onclick="showProduct('${p.id}')"><span>${p.img?`<img src="${p.img}" alt="">`:''}</span><div><b>${shortCalcName(p.name)}</b><small>${Number(p.priceRub).toLocaleString('ru-RU')} ₽ · ${Number(p.pv).toLocaleString('ru-RU')} PV</small></div><em>›</em></button></article>`).join('');setView(`<div class="pageHead"><div><small>FUTURE HEALTH</small><h1>Избранное</h1><p>${ps.length?`${ps.length} сохранённых продуктов`:'Сохраняйте интересные продукты с помощью ♡'}</p></div></div><div class="favoritesPage">${ps.length?`<div class="favBulkBar"><label><input type="checkbox" onchange="selectAllFavs(this.checked)"> Выбрать все</label><div class="favBulkActions"><button id="favAddSelected" disabled onclick="addSelectedFavs()">Добавить в расчёт</button><button id="favClearSelected" class="favClearSelected" disabled onclick="clearSelectedFavs()">Удалить</button></div></div><div class="favBatchList">${rows}</div>`:`<div class="emptyState"><span>♡</span><h2>Пока ничего нет</h2><p>Добавьте продукты в избранное, чтобы быстро вернуться к ним позже.</p><button onclick="showAll()">Открыть каталог</button></div>`}</div>`,'favorites',push,'favorites')};

/* ===== V25 final-candidate: only splash zoom guard, favorites bulk clear, catalog sticky series row ===== */
(()=>{const sp=document.getElementById('splash');if(sp){sp.addEventListener('dblclick',e=>e.preventDefault(),{passive:false});}})();


// ===== V26 locked patch: global page zoom is disabled; only scanViewer owns zoom gestures. =====
document.addEventListener('gesturestart',e=>{if(!e.target.closest('.scanViewer'))e.preventDefault()},{passive:false});
document.addEventListener('gesturechange',e=>{if(!e.target.closest('.scanViewer'))e.preventDefault()},{passive:false});
document.addEventListener('gestureend',e=>{if(!e.target.closest('.scanViewer'))e.preventDefault()},{passive:false});
let v26LastTouchEnd=0;
document.addEventListener('touchend',e=>{
  if(e.target.closest('.scanViewer'))return;
  const now=Date.now();
  if(now-v26LastTouchEnd<=320)e.preventDefault();
  v26LastTouchEnd=now;
},{passive:false});


/* ===== V27 FINAL LOCK: ONLY two approved adjustments =====
   1) Home shortcuts are sticky only inside the product zone and leave before О компании.
   2) Header FUTURE HEALTH brand is display-only; no tap/double-tap navigation. */
const _homeHtmlV27=homeHtml;
homeHtml=function(){
  let h=_homeHtmlV27();
  h=h.replace('<div class="wrap"><div class="seriesQuick">','<div class="wrap"><section class="homeProductZone"><div class="seriesQuick">');
  h=h.replace('<section id="about"','</section><section id="about"');
  return h;
};

/* ===== FINAL RELEASE POLISH (approved after V27 candidate) =====
   Locked scope: initial home consistency, reset positions on content switches,
   instant quantity controls, expanded company page/entry labels, export text. */

// Official card remains the authenticity / Russian-market information entry.
officialFooter=function(){return `<footer class="officialFooter"><button onclick="showOfficial()"><img src="assets/future-health-mark.png" alt=""><span><b>FUTURE HEALTH</b><small>Официальная информация · RU 2026.10</small></span><i>›</i></button></footer>`};

function companyMoreHtml(){return `<div class="companyMorePage">
  <section class="companyMoreHero"><small>FUTURE HEALTH · LIAONING FUTURE BIOTECH CO., LTD.</small><h1>Подробнее о компании</h1><p>Наука, корпоративная культура, этапы развития и запатентованные технологии.</p></section>
  <section class="companyIntroCard"><h2>Компания Future Biotech</h2><p>Компания начала работу в 2010 году в городе Бэньси, провинции Ляонин — «Китайской фармацевтической столице». Площадь предприятия составляет около 240 000 м², совокупный объём инвестиций — около 1 млрд юаней.</p><p>Сегодня компания является одной из крупных производственных баз антиоксидантных ферментных комплексов в Китае. Разработанные технологии и специализированное оборудование защищены национальными патентами.</p></section>
  <section class="companySection"><div class="companySectionTitle"><span>01</span><div><small>КОРПОРАТИВНАЯ КУЛЬТУРА</small><h2>Ценности FUTURE HEALTH</h2></div></div><div class="cultureGrid">
    <article><i>◎</i><b>Миссия</b><strong>Делимся счастьем</strong><p>Делимся качественной продукцией и здоровым образом жизни. Контролируем производственную цепочку от научных разработок и производства до реализации.</p></article>
    <article><i>✧</i><b>Видение</b><strong>Вечно молодые, с трепетом в душе</strong><p>Надежда сохраняет молодость, а встреча со счастьем наполняет душу волнением.</p></article>
    <article><i>◇</i><b>Ценности</b><strong>Стабильное и устойчивое предприятие</strong><p>Совместное обсуждение, создание и получение выгоды; честность, взаимовыгодное партнёрство и уважение к каждому потребителю.</p></article>
  </div></section>
  <section class="companySection scienceSection"><div class="companySectionTitle"><span>02</span><div><small>НАУКА И ТЕХНОЛОГИИ</small><h2>Развитие через научные разработки</h2></div></div><p>Компания строит деятельность на научных открытиях. Современные биотехнологии позволяют выделять при проращивании зерна кукурузы три антиоксидантных фермента:</p><div class="enzymeRow"><span><b>SOD</b><small>Супероксиддисмутаза</small></span><span><b>GSH-Px</b><small>Глутатионпероксидаза</small></span><span><b>CAT</b><small>Каталаза</small></span></div><p>Ферменты действуют комплексно. Технология производства растительных антиоксидантных комплексных ферментов и специализированное оборудование защищены патентами на изобретения и полезные модели.</p></section>
  <section class="companySection"><div class="companySectionTitle"><span>03</span><div><small>ЭТАПЫ РАЗВИТИЯ</small><h2>2010–2015</h2></div></div><div class="companyTimeline">
    <article><b>2010</b><span>Открытие производства в фармацевтической столице г. Бэньси (Ляонин).</span></article>
    <article><b>2012</b><span>Получена лицензия на производство продукции категории БАД.</span></article>
    <article><b>2013</b><span>Команда НИОКР удостоена звания «Рабочий авангард».</span></article>
    <article><b>2015</b><span>Получена лицензия Министерства коммерции КНР на прямые продажи.</span></article>
  </div></section>
  <section class="companySection patentSection"><div class="companySectionTitle"><span>04</span><div><small>ПАТЕНТЫ И ДОСТИЖЕНИЯ</small><h2>Собственные технологии</h2></div></div><img src="assets/company-patents.jpg" alt="Патентные свидетельства Future Biotech"><ul><li>Способ получения многокомпонентного фермента супероксиддисмутазы из кукурузы.</li><li>Автоматизированная установка для промывки, замачивания и проращивания семян.</li><li>Оборудование воздушной сепарации, сортировки и очистки зерна кукурузы.</li><li>Оборудование для послойного измельчения кукурузной пульпы.</li></ul></section>
  <section class="companySection innovationSection"><div class="companySectionTitle"><span>05</span><div><small>ИННОВАЦИОННОЕ РАЗВИТИЕ</small><h2>От исследований к современному рынку</h2></div></div><img src="assets/innovation-wide.jpg" alt="Инновационное развитие"><p>Future Biotech связывает совершенствование потребительских преимуществ с внутренними и внешними ресурсами компании. Анализ данных и потребительских предпочтений используется при планировании производственных цепочек и сервисов.</p><p>В 2021 году компания объединила интернет-экономику совместного потребления с собственными научными разработками, запустив мобильное приложение и мини-программу для WeChat. Электронная торговая платформа объединила БАДы, пищевую продукцию, уход за кожей, декоративную косметику и товары повседневного спроса.</p></section>
  ${officialFooter()}
</div>`}
function showCompanyMore(push=true){document.body.classList.remove('reading');setView(companyMoreHtml(),'company',push,'home')}

// Home keeps the already-approved limited sticky product zone, but the company CTA now opens the full company story.
const _homeHtmlRelease=homeHtml;
homeHtml=function(){let h=_homeHtmlRelease();h=h.replace('onclick="showOfficial()">Официальная информация <i>›</i>','onclick="showCompanyMore()">Узнать больше о компании <i>›</i>');return h};

// Every true content switch starts from the top. This is deliberately not used for closing the image viewer.
const _setViewRelease=setView;
setView=function(html,state,push=true,tab=''){window.scrollTo(0,0);_setViewRelease(html,state,push,tab);requestAnimationFrame(()=>{window.scrollTo(0,0);requestAnimationFrame(()=>window.scrollTo(0,0))})};

// Route support for the expanded company page.
const _routeRelease=route;
route=function(s,push=false){if(s==='company')showCompanyMore(push);else _routeRelease(s,push)};

// Fast quantity interaction: update the visible number first, persist immediately afterwards.
function fastProductQty(id,d,ev){ev?.preventDefault?.();ev?.stopPropagation?.();const el=document.querySelector(`[data-product-qty="${id}"]`);const current=Math.max(0,Number(el?.textContent ?? productQty(id))||0);const n=Math.max(0,current+d);if(el)el.textContent=n;const c=getCalc();if(n===0)delete c[id];else c[id]=n;localStorage.setItem(calcKey,JSON.stringify(c));updateCalcBadge()}
productQtyControl=function(p){const n=productQty(p.id);return `<div class="productQty" aria-label="Количество для расчёта"><button onpointerdown="fastProductQty('${p.id}',-1,event)" aria-label="Уменьшить">−</button><strong data-product-qty="${p.id}">${n}</strong><button onpointerdown="fastProductQty('${p.id}',1,event)" aria-label="Увеличить">+</button></div>`};
commerceHtmlV21=function(p,compact=false){const base=_commerceHtmlV23(p,compact);if(compact)return base;return base.replace('</div>',`${productQtyControl(p)}</div>`)};

// Product-to-product horizontal switches always begin at the top of the newly visible product.
const _showProductRelease=showProduct;
showProduct=function(id,push=true){_showProductRelease(id,push);const r=document.getElementById('reader');if(!r)return;let lastIndex=-1;const resetVisible=()=>{const i=Math.round(r.scrollLeft/Math.max(1,r.clientWidth));if(i!==lastIndex){lastIndex=i;const pages=r.querySelectorAll('.readerPage');pages[i]?.scrollTo(0,0)}};requestAnimationFrame(resetVisible);let t;r.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(resetVisible,70)},{passive:true})};

// Export/share wording approved for the purchase-planning list.
calculationText=function(){const t=calcTotals();const lines=['FUTURE HEALTH — Предварительный расчёт',''];t.lines.forEach(({p,n,rub,pv})=>lines.push(`${shortCalcName(p.name)} × ${n} шт = ${Number(rub).toLocaleString('ru-RU')} ₽ / ${Number(pv).toLocaleString('ru-RU')} PV`));lines.push('',`Итого: ${Number(t.rub).toLocaleString('ru-RU')} ₽ / ${Number(t.pv).toLocaleString('ru-RU')} PV`,`Количество: ${t.qty} шт.`,'','Предварительный расчёт. Не является заказом или подтверждением покупки.');return lines.join('\n')};

// Critical: the original first render happened before the shortcut-enhanced homeHtml override.
// Re-render once now (still behind the splash), so first launch and later Главная are identical.
goHome(false);

/* ===== V28 RC PATCH — approved navigation memory + hero alignment only =====
   Rule: keep only the immediately previous page's reading position.
   Once a third page is entered, the older hidden page is silently reset to top.
   No visible post-render scroll-to-top animation. */
const v28CatScroll = new Map();
let v28CatCurrent = null;
let v28CatPrevious = null;
const _showCategoryV28Base = showCategory;
showCategory = function(id,push=true){
  // Save the category that is actually leaving.
  if(v28CatCurrent && document.body.classList.contains('reading')===false){
    v28CatScroll.set(v28CatCurrent, app.scrollTop || 0);
  }
  const returningToPrevious = id===v28CatPrevious;
  const desiredTop = returningToPrevious ? (v28CatScroll.get(id)||0) : 0;
  // A page older than "previous" is reset while it is not visible.
  if(v28CatPrevious && !returningToPrevious) v28CatScroll.set(v28CatPrevious,0);
  const leaving = v28CatCurrent;
  _showCategoryV28Base(id,push);
  // Set position synchronously on the app scroller; no smooth/RAF jump.
  app.scrollTop = desiredTop;
  v28CatPrevious = leaving;
  v28CatCurrent = id;
};

// Replace the V27 "reset every newly visible product" behavior with one-page memory.
// showProduct's base already builds all sibling product pages in one horizontal reader.
showProduct = function(id,push=true){
  _showProductRelease(id,push);
  const r=document.getElementById('reader');
  if(!r)return;
  const pages=[...r.querySelectorAll('.readerPage')];
  let current=Math.round(r.scrollLeft/Math.max(1,r.clientWidth));
  let previous=null;
  // Initial requested product is top before it is shown.
  pages[current]?.scrollTo(0,0);
  let settle;
  const onSettled=()=>{
    const next=Math.round(r.scrollLeft/Math.max(1,r.clientWidth));
    if(next===current)return;
    const returning=next===previous;
    // When moving on to a third page, reset the older page while hidden.
    if(previous!==null && !returning) pages[previous]?.scrollTo(0,0);
    const leaving=current;
    current=next;
    previous=leaving;
    const cur=products.filter(x=>x.cat===products.find(p=>p.id===id).cat)[current];
    if(cur){addRecent(cur.id);if(stack.length&&stack[stack.length-1].startsWith('product:'))stack[stack.length-1]=`product:${cur.id}`}
  };
  r.addEventListener('scroll',()=>{clearTimeout(settle);settle=setTimeout(onSettled,80)},{passive:true});
  pages.forEach(pg=>pg.addEventListener('scroll',()=>{document.getElementById('toTop')?.classList.toggle('show',pg.scrollTop>450)},{passive:true}));
};

/* ===== V29 FINAL — locked UX rules + company web presentation ===== */
// Final category navigation: keep only the immediately previous category position.
const v29CatPos=new Map(); let v29CatNow=null,v29CatPrev=null;
showCategory=function(id,push=true){
  if(v29CatNow) v29CatPos.set(v29CatNow,app.scrollTop||0);
  const keep=id===v29CatPrev, top=keep?(v29CatPos.get(id)||0):0, leaving=v29CatNow;
  if(v29CatPrev&&!keep)v29CatPos.set(v29CatPrev,0);
  document.body.classList.remove('reading');
  const c=cats.find(x=>x.id===id),ps=products.filter(p=>p.cat===id);
  setView(`<div class="categoryHead"><button onclick="showAll()">‹</button><div><h1>${c.ru}</h1><small>${ps.length} продуктов</small></div><span></span></div><div class="seriesQuick categoryQuick">${cats.map(x=>`<button class="${x.id===id?'active':''}" onclick="showCategory('${x.id}')">${SHORT_CATS[x.id]||x.ru}</button>`).join('')}</div>${gridHtml(ps)}`,`cat:${id}`,push,'catalog');
  app.scrollTop=top; v29CatPrev=leaving; v29CatNow=id;
};

// Final product reader: no delayed visible jump. A→B preserves A; A→B→C silently resets A while hidden.
showProduct=function(id,push=true){
  const p=products.find(x=>x.id===id),c=cats.find(x=>x.id===p.cat),ps=products.filter(x=>x.cat===p.cat),idx=ps.findIndex(x=>x.id===id);
  addRecent(id);closeLayers();if(push)stack.push(`product:${id}`);
  app.innerHTML=`<div class="readerHeader"><button onclick="showCategory('${p.cat}')">‹</button><span>${c.ru}</span><button class="seriesMenuBtn" onclick="openSeriesDrawer('${p.cat}','${p.id}')">☰</button></div><div id="reader" class="reader">${ps.map((x,i)=>productPageHtml(x,c,i,ps.length)).join('')}</div>`;
  setActive('catalog');document.body.classList.add('reading');
  const r=document.getElementById('reader'),pages=[...r.querySelectorAll('.readerPage')];
  r.scrollLeft=idx*r.clientWidth; pages[idx]?.scrollTo(0,0);
  let current=idx,previous=null,timer;
  r.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(()=>{const next=Math.round(r.scrollLeft/Math.max(1,r.clientWidth));if(next===current)return;const returning=next===previous;if(previous!==null&&!returning)pages[previous]?.scrollTo(0,0);const leaving=current;current=next;previous=leaving;const cur=ps[current];if(cur){addRecent(cur.id);if(stack.length&&stack.at(-1)?.startsWith('product:'))stack[stack.length-1]=`product:${cur.id}`}},70)},{passive:true});
  pages.forEach(pg=>pg.addEventListener('scroll',()=>document.getElementById('toTop')?.classList.toggle('show',pg.scrollTop>450),{passive:true}));
};

// Calculation semantics: 0 stays visible for reconsideration; only explicit × deletes.
calcTotals=function(){const c=getCalc();let rub=0,pv=0,qty=0,lines=[];for(const [id,n0] of Object.entries(c)){const p=products.find(x=>x.id===id);if(!p)continue;const n=Math.max(0,Number(n0)||0),lr=p.priceRub*n,lp=p.pv*n;qty+=n;rub+=lr;pv+=lp;lines.push({p,n,rub:lr,pv:lp})}return{rub,pv,qty,lines}};
calculationText=function(){const t=calcTotals(),active=t.lines.filter(x=>x.n>0),lines=['FUTURE HEALTH — Предварительный расчёт',''];active.forEach(({p,n,rub,pv})=>lines.push(`${shortCalcName(p.name)} × ${n} шт = ${Number(rub).toLocaleString('ru-RU')} ₽ / ${Number(pv).toLocaleString('ru-RU')} PV`));lines.push('',`Итого: ${Number(t.rub).toLocaleString('ru-RU')} ₽ / ${Number(t.pv).toLocaleString('ru-RU')} PV`,`Количество: ${t.qty} шт.`,'','Предварительный расчёт. Не является заказом или подтверждением покупки.');return lines.join('\n')};

// Test multi-image gallery. Product subject remains the catalogue image; extra slots prove swipe/zoom infrastructure.
const v29GalleryTest={'hits-1-0':['assets/product-v15/hits-1-0.jpg','assets/p7_0.jpeg','assets/p8_0.jpeg']};
function galleryForProduct(p){return (v29GalleryTest[p.id]||[cleanImg(p)]).filter(Boolean)}
const _productPageHtmlV29=productPageHtml;
productPageHtml=function(p,c,idx,total){let h=_productPageHtmlV29(p,c,idx,total);const hero=cleanImg(p);if(hero)h=h.replace(`onclick="openScan('${hero}')"`,`onclick="openProductGallery('${p.id}')"`);return h};
function openProductGallery(id){const p=products.find(x=>x.id===id);if(!p)return;const imgs=galleryForProduct(p);let ov=document.createElement('div');ov.className='scanViewer galleryV29';ov.innerHTML=`<button class="scanClose" aria-label="Закрыть">×</button><div class="galleryTrack">${imgs.map((s,i)=>`<div class="gallerySlide"><div class="scanStage"><img draggable="false" src="${s}" alt="${p.name.replaceAll('"','&quot;')}"></div></div>`).join('')}</div><div class="galleryDots">1 / ${imgs.length}</div><div class="zoomHint">Свайп — другое фото · двойное касание — ×2</div>`;document.body.appendChild(ov);const track=ov.querySelector('.galleryTrack'),dot=ov.querySelector('.galleryDots');ov.querySelector('.scanClose').onclick=()=>ov.remove();ov.addEventListener('contextmenu',e=>e.preventDefault(),true);let tap=0;
  ov.querySelectorAll('img').forEach(im=>{let scale=1;im.addEventListener('click',()=>{const now=Date.now();if(now-tap<320){scale=scale>1?1:2;im.style.transform=`scale(${scale})`;tap=0}else tap=now});im.addEventListener('touchstart',e=>{if(e.touches.length===2)im.dataset.dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)}, {passive:true});im.addEventListener('touchmove',e=>{if(e.touches.length===2&&im.dataset.dist){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);scale=Math.max(1,Math.min(4,scale*d/Number(im.dataset.dist)));im.dataset.dist=d;im.style.transform=`scale(${scale})`}},{passive:true})});
  track.addEventListener('scroll',()=>{const i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));dot.textContent=`${i+1} / ${imgs.length}`},{passive:true});
}

// Company page: source-backed content, but presented as a mobile corporate site rather than a text document.
companyMoreHtml=function(){return `<div class="companyMorePage v29Company">
<section class="companyMoreHero"><small>FUTURE HEALTH · LIAONING FUTURE BIOTECH CO., LTD.</small><h1>Подробнее о компании</h1><p>Наука, корпоративная культура, развитие и собственные технологии.</p></section>
<section class="companyIntroCard"><span class="companyKicker">О КОМПАНИИ</span><h2>Future Biotech</h2><p>Компания начала работу в 2010 году в городе Бэньси, провинции Ляонин — «Китайской фармацевтической столице». Площадь предприятия составляет около 240 000 м², совокупный объём инвестиций — около 1 млрд юаней.</p><p>В 2012 году компания получила лицензию на производство продукции категории БАД, а в 2015 году — лицензию Министерства коммерции КНР на ведение прямых продаж.</p></section>
<section class="companySection"><div class="companySectionTitle"><span>01</span><div><small>КОРПОРАТИВНАЯ КУЛЬТУРА</small><h2>Ценности FUTURE HEALTH</h2></div></div><div class="cultureGrid"><article><i>◎</i><b>Миссия</b><strong>Делимся счастьем</strong><p>Делимся качественной продукцией и здоровым образом жизни.</p></article><article><i>✧</i><b>Видение</b><strong>Вечно молодые, с трепетом в душе</strong><p>Надежда сохраняет молодость, а встреча со счастьем наполняет душу волнением.</p></article><article><i>◇</i><b>Ценности</b><strong>Стабильное, устойчивое предприятие</strong><p>Совместное обсуждение, совместное создание и совместное получение выгоды.</p></article></div><img class="sourceVisual" src="assets/company-culture-source.jpg" alt="Корпоративная культура"></section>
<section class="companySection scienceSection"><div class="companySectionTitle"><span>02</span><div><small>НАУКА И ТЕХНОЛОГИИ</small><h2>Развитие через научные разработки</h2></div></div><p>Современные биотехнологии позволяют выделять при проращивании зерна кукурузы три антиоксидантных фермента.</p><div class="enzymeRow"><span><b>SOD</b><small>Супероксиддисмутаза</small></span><span><b>GSH-Px</b><small>Глутатионпероксидаза</small></span><span><b>CAT</b><small>Каталаза</small></span></div><img class="sourceVisual" src="assets/company-science-source.jpg" alt="Научные разработки"></section>
<section class="companySection timelineV29"><div class="companySectionTitle"><span>03</span><div><small>ЭТАПЫ РАЗВИТИЯ</small><h2>Путь компании</h2></div></div><div class="companyTimeline"><article><b>2010</b><span>Открытие производства в фармацевтической столице г. Бэньси (Ляонин).</span></article><article><b>2012</b><span>Получена лицензия на производство БАД.</span></article><article><b>2013</b><span>Команда НИОКР удостоена звания «Рабочий авангард».</span></article><article><b>2015</b><span>Получена лицензия Министерства коммерции КНР на прямые продажи.</span></article></div><img class="sourceVisual" src="assets/company-timeline-source.jpg" alt="Этапы развития 2010–2015"></section>
<section class="companySection patentSection"><div class="companySectionTitle"><span>04</span><div><small>ПАТЕНТЫ И ДОСТИЖЕНИЯ</small><h2>Собственные технологии</h2></div></div><div class="patentGallery"><button onclick="openScan('assets/company-patents-source.jpg')"><img src="assets/company-patents-source.jpg" alt="Патентные свидетельства"><span>Патентные свидетельства · открыть</span></button><button onclick="openScan('assets/company-patents.jpg')"><img src="assets/company-patents.jpg" alt="Патенты Future Biotech"><span>Галерея патентов · открыть</span></button></div><ul><li>Способ получения многокомпонентного фермента супероксиддисмутазы из кукурузы.</li><li>Автоматизированная комплексная установка для промывки, замачивания и проращивания семян.</li><li>Частотно-регулируемая установка воздушной сепарации, сортировки и очистки зерна кукурузы.</li><li>Оборудование для послойного измельчения кукурузной пульпы.</li></ul></section>
<section class="companySection innovationSection"><div class="companySectionTitle"><span>05</span><div><small>ИННОВАЦИОННОЕ РАЗВИТИЕ</small><h2>От исследований к современному рынку</h2></div></div><img src="assets/company-innovation-source.jpg" alt="Инновационное развитие"><p>Future Biotech связывает совершенствование потребительских преимуществ с интеграцией внутренних и внешних ресурсов и современными рыночными тенденциями. Анализ данных и потребительских предпочтений используется при планировании производственных цепочек и сервисов.</p><p>В 2021 году компания объединила интернет-экономику совместного потребления с собственными научными разработками, запустив мобильное приложение и мини-программу для WeChat.</p></section>${officialFooter()}</div>`};

/* ===== V30 FINAL polish: gallery pan + active-position semantics ===== */
// Расчёт: zero-quantity rows remain as a reversible draft state, but are not active positions.
showCalculation=function(push=true){
  document.body.classList.remove('reading');
  const t=calcTotals(), activePositions=t.lines.filter(x=>x.n>0).length;
  const rows=t.lines.map(({p,n,rub,pv})=>`<article class="calcItem ${n===0?'zeroQty':''}"><button class="calcProduct" onclick="showProduct('${p.id}')"><span>${p.img?`<img src="${p.img}" alt="">`:''}</span><div><b>${shortCalcName(p.name)}</b><small>${Number(p.priceRub).toLocaleString('ru-RU')} ₽ · ${Number(p.pv).toLocaleString('ru-RU')} PV / шт.</small></div></button><div class="calcControls"><button onclick="changeCalcList('${p.id}',-1)">−</button><strong>${n}</strong><button onclick="changeCalcList('${p.id}',1)">+</button><span><b>${Number(rub).toLocaleString('ru-RU')} ₽</b><small>${Number(pv).toLocaleString('ru-RU')} PV</small></span><button class="calcRemove" onclick="removeCalc('${p.id}')" aria-label="Удалить">×</button></div></article>`).join('');
  const html=`<div class="calcPage"><div class="calcHead"><div><small>FUTURE HEALTH</small><h1>Расчёт</h1><p>Предварительный список продуктов перед покупкой</p></div>${t.lines.length?`<button onclick="clearCalculation()">Очистить</button>`:''}</div>${rows||`<div class="emptyState calcEmpty"><span class="bigCalculator">⌗</span><h2>Список пока пуст</h2><p>Укажите количество прямо на странице продукта.</p><button onclick="showAll()">Открыть каталог</button></div>`}${t.lines.length?`<section class="calcSummary"><div><span>Позиций</span><b>${activePositions}</b></div><div><span>Количество</span><b>${t.qty} шт.</b></div><div class="calcGrand"><span>Итого</span><b>${Number(t.rub).toLocaleString('ru-RU')} ₽</b><strong>${Number(t.pv).toLocaleString('ru-RU')} PV</strong></div><p>Предварительный расчёт. Не является заказом или подтверждением покупки.</p><div class="calcActions"><button onclick="shareCalculation()">↗ Поделиться</button><button onclick="copyCalculation()">▤ Скопировать</button></div></section>`:''}</div>`;
  setView(html,'calc',push,'calc');updateCalcBadge();
};

// Three identical images intentionally used for the corn-germ drink to test real 1/3 → 2/3 → 3/3 swiping.
v29GalleryTest['hits-1-0']=['assets/product-v15/hits-1-0.jpg','assets/product-v15/hits-1-0.jpg','assets/product-v15/hits-1-0.jpg'];

openProductGallery=function(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  const imgs=galleryForProduct(p);
  const ov=document.createElement('div'); ov.className='scanViewer galleryV29 galleryV30';
  ov.innerHTML=`<button class="scanClose" aria-label="Закрыть">×</button><div class="galleryTrack">${imgs.map(s=>`<div class="gallerySlide"><div class="scanStage"><img draggable="false" src="${s}" alt="${p.name.replaceAll('"','&quot;')}"></div></div>`).join('')}</div><div class="galleryDots">1 / ${imgs.length}</div><div class="zoomHint">Свайп — другое фото · ×2 — увеличить · при увеличении перетаскивайте фото</div>`;
  document.body.appendChild(ov);
  const track=ov.querySelector('.galleryTrack'), dot=ov.querySelector('.galleryDots');
  ov.querySelector('.scanClose').onclick=()=>ov.remove(); ov.addEventListener('contextmenu',e=>e.preventDefault(),true);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  ov.querySelectorAll('img').forEach(im=>{
    let scale=1,tx=0,ty=0,startScale=1,startTx=0,startTy=0,startDist=0,startMid=null,startOne=null,lastTap=0,singleTimer=0,moved=false;
    const bounds=()=>{const r=im.getBoundingClientRect(),w=r.width/scale,h=r.height/scale;return {x:Math.max(0,(w*scale-innerWidth)/2),y:Math.max(0,(h*scale-innerHeight)/2)}};
    const apply=()=>{if(scale<=1.001){scale=1;tx=ty=0}const b=bounds();tx=clamp(tx,-b.x,b.x);ty=clamp(ty,-b.y,b.y);im.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${scale})`;track.classList.toggle('imageZoomed',scale>1.001)};
    const distance=t=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
    const midpoint=t=>({x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2});
    im.addEventListener('touchstart',e=>{moved=false;if(e.touches.length===2){e.preventDefault();startScale=scale;startTx=tx;startTy=ty;startDist=distance(e.touches);startMid=midpoint(e.touches);startOne=null}else if(e.touches.length===1&&scale>1){e.preventDefault();startOne={x:e.touches[0].clientX,y:e.touches[0].clientY,tx,ty}}},{passive:false});
    im.addEventListener('touchmove',e=>{if(e.touches.length===2&&startMid){e.preventDefault();moved=true;const m=midpoint(e.touches),ns=clamp(startScale*distance(e.touches)/Math.max(1,startDist),1,4);const ratio=ns/startScale;tx=startTx+(m.x-startMid.x)+(startMid.x-innerWidth/2)*(1-ratio);ty=startTy+(m.y-startMid.y)+(startMid.y-innerHeight/2)*(1-ratio);scale=ns;apply()}else if(e.touches.length===1&&scale>1&&startOne){e.preventDefault();moved=true;tx=startOne.tx+e.touches[0].clientX-startOne.x;ty=startOne.ty+e.touches[0].clientY-startOne.y;apply()}},{passive:false});
    im.addEventListener('touchend',e=>{if(e.touches.length)return;startMid=startOne=null;if(moved)return;const now=Date.now();if(now-lastTap<310){clearTimeout(singleTimer);scale=scale>1.01?1:2;tx=ty=0;apply();lastTap=0}else{lastTap=now;singleTimer=setTimeout(()=>{if(scale===1)ov.remove()},320)}});
    im.addEventListener('dblclick',e=>{e.preventDefault();scale=scale>1.01?1:2;tx=ty=0;apply()});
  });
  track.addEventListener('scroll',()=>{const i=Math.round(track.scrollLeft/Math.max(1,track.clientWidth));dot.textContent=`${i+1} / ${imgs.length}`},{passive:true});
};

/* ===== V31 FINAL gallery gesture fix: 1x swipe / >1x pan, real 1-2-3 navigation ===== */
openProductGallery=function(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  const imgs=galleryForProduct(p);
  const ov=document.createElement('div'); ov.className='scanViewer galleryV29 galleryV30 galleryV31';
  ov.innerHTML=`<button class="scanClose" aria-label="Закрыть">×</button><div class="galleryTrack">${imgs.map((s,i)=>`<div class="gallerySlide" data-i="${i}"><div class="scanStage"><img draggable="false" src="${s}" alt="${p.name.replaceAll('"','&quot;')}"></div></div>`).join('')}</div><div class="galleryDots">1 / ${imgs.length}</div><div class="zoomHint">Свайп — другое фото · ×2 — увеличить · при увеличении перетаскивайте фото</div>`;
  document.body.appendChild(ov);
  const track=ov.querySelector('.galleryTrack'), dot=ov.querySelector('.galleryDots'), slides=[...ov.querySelectorAll('.gallerySlide')];
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  let index=0, gesture=null, lastTap=0, singleTimer=0;
  const states=slides.map(sl=>({im:sl.querySelector('img'),scale:1,tx:0,ty:0}));
  function width(){return Math.max(1,track.clientWidth)}
  function setIndex(n,animate=true){index=clamp(n,0,imgs.length-1);track.style.transition=animate?'transform .22s cubic-bezier(.22,.7,.25,1)':'none';track.style.transform=`translate3d(${-index*width()}px,0,0)`;dot.textContent=`${index+1} / ${imgs.length}`;states.forEach((s,i)=>{if(i!==index){s.scale=1;s.tx=s.ty=0;applyState(s)}})}
  function bounds(s){const r=s.im.getBoundingClientRect(),baseW=r.width/s.scale,baseH=r.height/s.scale;return{x:Math.max(0,(baseW*s.scale-innerWidth)/2),y:Math.max(0,(baseH*s.scale-innerHeight)/2)}}
  function applyState(s){if(s.scale<=1.001){s.scale=1;s.tx=s.ty=0}s.im.style.transform=`translate3d(${s.tx}px,${s.ty}px,0) scale(${s.scale})`;ov.classList.toggle('imageZoomed',states[index].scale>1.001)}
  function dist(t){return Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY)}
  function mid(t){return{x:(t[0].clientX+t[1].clientX)/2,y:(t[0].clientY+t[1].clientY)/2}}
  function activeState(){return states[index]}
  ov.querySelector('.scanClose').onclick=()=>ov.remove(); ov.addEventListener('contextmenu',e=>e.preventDefault(),true);
  track.addEventListener('touchstart',e=>{
    const s=activeState();
    if(e.touches.length===2){e.preventDefault();const m=mid(e.touches);gesture={type:'pinch',d:dist(e.touches),scale:s.scale,tx:s.tx,ty:s.ty,mid:m,moved:false};return}
    if(e.touches.length!==1)return;
    const t=e.touches[0]; gesture={type:s.scale>1.001?'pan':'swipe',x:t.clientX,y:t.clientY,tx:s.tx,ty:s.ty,base:index*width(),moved:false};
  },{passive:false});
  track.addEventListener('touchmove',e=>{
    if(!gesture)return;const s=activeState();
    if(gesture.type==='pinch'&&e.touches.length===2){e.preventDefault();gesture.moved=true;const m=mid(e.touches),ns=clamp(gesture.scale*dist(e.touches)/Math.max(1,gesture.d),1,4),ratio=ns/gesture.scale;s.tx=gesture.tx+(m.x-gesture.mid.x)+(gesture.mid.x-innerWidth/2)*(1-ratio);s.ty=gesture.ty+(m.y-gesture.mid.y)+(gesture.mid.y-innerHeight/2)*(1-ratio);s.scale=ns;const b=bounds(s);s.tx=clamp(s.tx,-b.x,b.x);s.ty=clamp(s.ty,-b.y,b.y);applyState(s);return}
    if(e.touches.length!==1)return;const t=e.touches[0],dx=t.clientX-gesture.x,dy=t.clientY-gesture.y;
    if(Math.abs(dx)>5||Math.abs(dy)>5)gesture.moved=true;
    if(gesture.type==='pan'){e.preventDefault();s.tx=gesture.tx+dx;s.ty=gesture.ty+dy;const b=bounds(s);s.tx=clamp(s.tx,-b.x,b.x);s.ty=clamp(s.ty,-b.y,b.y);applyState(s)}
    else if(gesture.type==='swipe'&&Math.abs(dx)>Math.abs(dy)){e.preventDefault();track.style.transition='none';const edge=(index===0&&dx>0)||(index===imgs.length-1&&dx<0);track.style.transform=`translate3d(${-(gesture.base-dx*(edge?.28:1))}px,0,0)`}
  },{passive:false});
  track.addEventListener('touchend',e=>{
    if(e.touches.length)return; if(!gesture)return; const g=gesture;gesture=null;const s=activeState();
    if(g.type==='swipe'&&g.moved){const dx=(e.changedTouches[0]?.clientX??g.x)-g.x;if(Math.abs(dx)>45)setIndex(index+(dx<0?1:-1),true);else setIndex(index,true);return}
    if(g.type==='pan'||g.type==='pinch'){if(g.moved)return}
    const now=Date.now();if(now-lastTap<310){clearTimeout(singleTimer);s.scale=s.scale>1.01?1:2;s.tx=s.ty=0;applyState(s);lastTap=0}else{lastTap=now;singleTimer=setTimeout(()=>{if(activeState().scale===1)ov.remove()},320)}
  },{passive:false});
  window.addEventListener('resize',()=>setIndex(index,false),{once:true});
  setIndex(0,false);
};
