window.FH_VERSION='38.0-RC2';
const cats=[
{id:'hits',ru:'Хит-продукты',en:'STAR PRODUCTS'},
{id:'health',ru:'Серия для здоровья',en:'HEALTH SERIES'},
{id:'skin',ru:'Серия средств по уходу за кожей',en:'SKIN CARE'},
{id:'cosmetics',ru:'Серия декоративной косметики',en:'COSMETICS'},
{id:'daily',ru:'Гигиена',en:'HYGIENE'},
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
function closeLayers(){closeSearch();toggleMenu(false);if(typeof closeSeriesDrawer==='function')closeSeriesDrawer();document.getElementById('productShareShade')?.remove();}
function fhForceTop(){try{history.scrollRestoration='manual'}catch{};const reset=()=>{document.documentElement.scrollTop=0;document.body.scrollTop=0;window.scrollTo(0,0);app.scrollTop=0};reset();requestAnimationFrame(()=>{reset();requestAnimationFrame(reset)});setTimeout(reset,80)}
function setView(html,state,push=true,tab=''){closeLayers();document.body.classList.remove('reading');if(push&&state)stack.push(state);app.innerHTML=html;if(tab)setActive(tab);fhForceTop()}
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
const SHORT_CATS={hits:'Хиты',health:'БАДы',skin:'Уход',cosmetics:'Косметика',daily:'Гигиена',baby:'Детская',travel:'Дорожная',other:'Другое'};
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

/* ===== V35.2 — PRODUCT SHARE HUB =====
   Product-specific deep links + configurable share cards.
   Official product text is derived only from the existing catalogue content and is not editable on the front end. */
function productDeepLink(id){
  const u=new URL(location.href); u.search=''; u.hash=''; u.searchParams.set('product',id); return u.toString();
}
function normalizeShareText(s){return String(s||'').replace(/\s+/g,' ').replace(/\s+([,.!?;:])/g,'$1').trim()}
function officialShareSummary(p){
  const skip=/^(?:\d{2}\s*)?(?:STAR PRODUCTS|HEALTH SERIES|SKIN CARE|COSMETICS|DAILY USE|SUDOKU BABY|TRAVEL SERIES|OTHER PRODUCTS)|оригинальная страница|масса нетто|отзывы потребителей|эффект индивидуален|примечание:|шаг \d|способ употребления/i;
  const name=normalizeShareText(p.name).toLowerCase();
  let a=(p.detail||[]).map(normalizeShareText).filter(t=>t&&t.length>24&&!skip.test(t)&&t.toLowerCase()!==name&&!name.includes(t.toLowerCase()));
  // Prefer descriptive prose, not isolated headings.
  a=a.filter(t=>/[.!?]$/.test(t)||t.length>65);
  let out='';
  for(const t of a){const candidate=out?(out+' '+t):t;if(candidate.length>270)break;out=candidate;if(out.length>=170)break}
  if(!out)out='Подробная информация о продукте представлена в официальном каталоге FUTURE HEALTH.';
  if(out.length>280){out=out.slice(0,277).replace(/\s+\S*$/,'')+'…'}
  return out;
}
function shareSettingsDefault(p){return {priceMode:'none',customPrice:'',showPV:false,promo:'',start:'',end:''}}
let shareDraft=null;
function closeProductShare(){document.getElementById('productShareSheet')?.remove()}
function closeShareConfig(){document.getElementById('shareConfigShade')?.remove();shareDraft=null}
function openProductShare(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  closeProductShare();
  const sh=document.createElement('div'); sh.id='productShareSheet'; sh.className='productShareShade';
  sh.innerHTML=`<div class="productShareSheet" role="dialog" aria-modal="true"><div class="shareGrab"></div><div class="shareTitle"><div><small>FUTURE HEALTH</small><b>Поделиться продуктом</b></div><button onclick="closeProductShare()">×</button></div><div class="shareProductMini">${p.img?`<img src="${p.img}" alt="">`:''}<span>${p.name}</span></div><button class="shareChoice" onclick="openShareProfileSettings()"><i>◉</i><span><b>Мои данные для публикаций</b><small>Единые данные: изменения синхронизируются с Центром публикаций</small></span><em>›</em></button><button class="shareChoice" onclick="openShareConfig('${p.id}',false)"><i>▧</i><span><b>Карточка продукта</b><small>Изображение с кратким официальным описанием</small></span><em>›</em></button><button class="shareChoice" onclick="openShareConfig('${p.id}',true)"><i>✦</i><span><b>Изображение + текст</b><small>Для Telegram, MAX, VK, WeChat и других приложений</small></span><em>›</em></button><button class="shareChoice" onclick="shareProductLink('${p.id}')"><i>↗</i><span><b>Ссылка на продукт</b><small>Откроется сразу эта страница продукта</small></span><em>›</em></button><div class="shareLinkPreview">${productDeepLink(p.id)}</div></div>`;
  sh.addEventListener('click',e=>{if(e.target===sh)closeProductShare()}); document.body.appendChild(sh);
}
function showShareToast(title='Ссылка скопирована',message='Ссылка на продукт скопирована в буфер обмена'){
  document.getElementById('shareToast')?.remove();const t=document.createElement('div');t.id='shareToast';t.className='shareToast';t.innerHTML=`<b>${title}</b><small>${message}</small>`;document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add('show'));setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),220)},1500);
}
async function copyTextSafe(text){try{await navigator.clipboard.writeText(text);return true}catch(e){}try{const ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,ta.value.length);const ok=document.execCommand('copy');ta.remove();return !!ok}catch(e){return false}}
async function shareProductLink(id){const p=products.find(x=>x.id===id),url=productDeepLink(id);if(!p)return;const ok=await copyTextSafe(url);if(ok){closeProductShare();showShareToast()}else showShareToast('Не удалось скопировать','Нажмите и удерживайте ссылку ниже, чтобы скопировать её вручную')}
function setSharePriceMode(mode){if(!shareDraft)return;shareDraft.priceMode=mode;document.querySelectorAll('.shareModes button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));document.getElementById('customPriceWrap')?.classList.toggle('hidden',mode!=='custom');document.getElementById('pvToggleWrap')?.classList.toggle('hidden',mode==='none')}
function setPromoPreset(btn,text){if(!shareDraft)return;document.querySelectorAll('.sharePromoPresets button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('sharePromo').value=text;shareDraft.promo=text}
function openShareConfig(id,withText){
  const p=products.find(x=>x.id===id);if(!p)return;closeProductShare();closeShareConfig();shareDraft={id,withText,...shareSettingsDefault(p)};
  const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';
  d.innerHTML=`<div class="shareConfigSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Настройка карточки</b></div><button onclick="closeShareConfig()">×</button></div><div class="shareSummaryPreview"><b>Краткое описание:</b><br>${officialShareSummary(p)}</div><div class="shareField"><label>Цена на карточке</label><div class="shareModes"><button class="active" data-mode="none" onclick="setSharePriceMode('none')">Без цены</button><button data-mode="member" onclick="setSharePriceMode('member')">Для участников</button><button data-mode="custom" onclick="setSharePriceMode('custom')">Своя цена</button></div></div><div id="customPriceWrap" class="shareField hidden"><label>Своя цена, ₽</label><input id="shareCustomPrice" class="shareInput" inputmode="decimal" placeholder="Например, 5 980"></div><div id="pvToggleWrap" class="shareField hidden"><label class="shareToggle"><span>Показывать PV</span><input id="sharePV" type="checkbox"></label></div><div class="shareField"><label>Акция / примечание <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><div class="sharePromoPresets"><button onclick="setPromoPreset(this,'Скидка при покупке нескольких упаковок')">Скидка за количество</button><button onclick="setPromoPreset(this,'2 + 1 в подарок')">2 + 1</button><button onclick="setPromoPreset(this,'Специальное предложение')">Спецпредложение</button><button onclick="setPromoPreset(this,'Цена по акции')">Цена по акции</button></div><input id="sharePromo" class="shareInput" style="margin-top:8px" maxlength="90" placeholder="Или введите свой текст"></div><div class="shareField"><label>Срок действия акции <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><div class="shareInline"><div><input id="shareStart" class="shareInput" type="date"><div class="shareHint">Дата начала</div></div><div><input id="shareEnd" class="shareInput" type="date"><div class="shareHint">Дата окончания</div></div></div><div class="shareHint">Можно указать только дату окончания. Дата окончания не может быть раньше даты начала.</div></div><div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="generateConfiguredShare()">Создать карточку</button></div></div>`;
  d.addEventListener('click',e=>{if(e.target===d)closeShareConfig()});document.body.appendChild(d);
}
function readShareConfig(){
  const p=products.find(x=>x.id===shareDraft?.id);if(!p)return null;const cfg={...shareDraft};cfg.customPrice=(document.getElementById('shareCustomPrice')?.value||'').trim();cfg.showPV=!!document.getElementById('sharePV')?.checked;cfg.promo=(document.getElementById('sharePromo')?.value||'').trim();cfg.start=document.getElementById('shareStart')?.value||'';cfg.end=document.getElementById('shareEnd')?.value||'';return cfg;
}
function formatDateRu(v){if(!v)return '';const [y,m,d]=v.split('-');return `${d}.${m}.${y}`}
function offerPeriod(cfg){if(cfg.start&&cfg.end)return `Предложение действует с ${formatDateRu(cfg.start)} по ${formatDateRu(cfg.end)}`;if(cfg.end)return `Предложение действует до ${formatDateRu(cfg.end)}`;if(cfg.start)return `Предложение действует с ${formatDateRu(cfg.start)}`;return ''}
function sharePriceLines(p,cfg){const a=[];if(cfg.priceMode==='member')a.push(`Цена для участников: ${Number(p.priceRub).toLocaleString('ru-RU')} ₽`);if(cfg.priceMode==='custom'&&cfg.customPrice){const n=cfg.customPrice.replace(/[^0-9.,]/g,'').replace(',','.');const val=Number(n);a.push(`Цена: ${Number.isFinite(val)&&val>0?val.toLocaleString('ru-RU'):cfg.customPrice} ₽`)}if(cfg.priceMode!=='none'&&cfg.showPV)a.push(`${Number(p.pv).toLocaleString('ru-RU')} PV`);return a}
function productShareText(p,cfg){const c=cats.find(x=>x.id===p.cat),lines=[p.name,'',officialShareSummary(p)];const prices=sharePriceLines(p,cfg);if(prices.length)lines.push('',...prices);if(cfg.promo)lines.push('',cfg.promo);const period=offerPeriod(cfg);if(period)lines.push(period);lines.push('',c?.ru||'','',productDeepLink(p.id));return lines.join('\n')}
function wrapCanvasText(ctx,text,maxWidth){const words=String(text||'').split(/\s+/),lines=[];let line='';for(const w of words){const t=line?line+' '+w:w;if(ctx.measureText(t).width>maxWidth&&line){lines.push(line);line=w}else line=t}if(line)lines.push(line);return lines}
async function loadCanvasImage(src){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=src})}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,r):(ctx.rect(x,y,w,h));ctx.fill()}
async function makeProductCard(p,cfg){
  const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#f8fbfe';x.fillRect(0,0,W,H);const g=x.createLinearGradient(0,0,W,470);g.addColorStop(0,'#e9f6ff');g.addColorStop(1,'#fff');x.fillStyle=g;x.fillRect(0,0,W,455);x.fillStyle='#1268ad';x.font='700 42px Arial,sans-serif';x.fillText('FUTURE HEALTH',70,82);x.fillStyle='#6c8aa5';x.font='500 21px Arial,sans-serif';x.fillText('КАТАЛОГ ПРОДУКЦИИ',70,117);
  const src=cleanImg(p)||p.img;if(src){try{const im=await loadCanvasImage(src),box={x:145,y:150,w:790,h:470},r=Math.min(box.w/im.width,box.h/im.height),w=im.width*r,h=im.height*r;x.drawImage(im,box.x+(box.w-w)/2,box.y+(box.h-h)/2,w,h)}catch{}}
  x.fillStyle='#102f4f';x.font='700 38px Arial,sans-serif';const title=wrapCanvasText(x,p.name,940).slice(0,4);let y=675;title.forEach(s=>{x.fillText(s,70,y);y+=48});y+=8;
  x.fillStyle='#56758e';x.font='400 25px Arial,sans-serif';const summary=wrapCanvasText(x,officialShareSummary(p),940).slice(0,5);summary.forEach(s=>{x.fillText(s,70,y);y+=34});y+=14;
  const prices=sharePriceLines(p,cfg);if(prices.length){x.fillStyle='#1268ad';x.font='700 29px Arial,sans-serif';prices.forEach(s=>{x.fillText(s,70,y);y+=38});y+=4}
  if(cfg.promo){x.fillStyle='#eaf6ff';roundRect(x,70,y,Math.min(940,Math.max(420,x.measureText(cfg.promo).width+55)),54,16);x.fillStyle='#0f67a8';x.font='700 24px Arial,sans-serif';x.fillText(cfg.promo,94,y+35);y+=66}
  const period=offerPeriod(cfg);if(period){x.fillStyle='#6a8398';x.font='500 21px Arial,sans-serif';x.fillText(period,70,y);y+=30}
  x.strokeStyle='#d9e9f5';x.lineWidth=2;x.beginPath();x.moveTo(70,1225);x.lineTo(1010,1225);x.stroke();x.fillStyle='#587895';x.font='500 21px Arial,sans-serif';x.fillText('Полная информация — по ссылке на продукт',70,1270);x.fillStyle='#1268ad';x.font='700 20px Arial,sans-serif';x.fillText('FUTURE HEALTH · SHARE HAPPINESS',70,1312);return new Promise(res=>c.toBlob(res,'image/png',.95));
}
async function generateConfiguredShare(){
  const cfg=readShareConfig();if(!cfg)return;const p=products.find(x=>x.id===cfg.id);if(cfg.priceMode==='custom'&&!cfg.customPrice){showShareToast('Укажите цену','Введите свою цену или выберите другой режим');return}if(cfg.start&&cfg.end&&cfg.end<cfg.start){showShareToast('Проверьте даты','Дата окончания не может быть раньше даты начала');return}if(cfg.end&&cfg.end<new Date().toISOString().slice(0,10)){showShareToast('Акция уже завершена','Укажите актуальную дату окончания');return}
  const blob=await makeProductCard(p,cfg);if(!blob){showShareToast('Ошибка','Не удалось создать карточку продукта');return}const safe=p.name.replace(/[^a-zа-яё0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,70)||'future-health-product';const file=new File([blob],`${safe}.png`,{type:'image/png'});const text=cfg.withText?productShareText(p,cfg):'';
  try{if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({title:p.name,text,files:[file]});closeShareConfig();return}}catch(e){if(e?.name==='AbortError')return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);if(cfg.withText)await copyTextSafe(text);closeShareConfig();showShareToast('Карточка готова',cfg.withText?'Изображение сохранено, текст скопирован':'Изображение сохранено');
}
// Add the share control beside the already-approved favorite control.
const _productPageHtmlV35Base=productPageHtml;
productPageHtml=function(p,c,idx,total){let h=_productPageHtmlV35Base(p,c,idx,total);const heart=`<button class="heart big`;const at=h.indexOf(heart);if(at>=0){const end=h.indexOf('</button>',at);if(end>=0)h=h.slice(0,end+9)+`<button class="productShareBtn" onclick="openProductShare('${p.id}')" aria-label="Поделиться продуктом">↗</button>`+h.slice(end+9)}return h};
(function initProductDeepLinks(){const id=new URL(location.href).searchParams.get('product');if(id&&products.some(p=>p.id===id))setTimeout(()=>showProduct(id,false),0)})();

/* ===== V35.3 — SAVED SENDER PROFILE + BATCH SHARE (MAX 5) ===== */
const SHARE_PREFS_KEY='fh_share_prefs_v353';
function loadSharePrefs(){try{return JSON.parse(localStorage.getItem(SHARE_PREFS_KEY)||'{}')||{}}catch{return {}}}
function saveSharePrefs(v){try{localStorage.setItem(SHARE_PREFS_KEY,JSON.stringify(v))}catch{}}
function shareBasePrefs(){return {priceMode:'none',showPV:false,promo:'',start:'',end:'',senderStatus:'none',senderName:'',senderPhone:'',senderOther:'' ,...loadSharePrefs()}}
function senderStatusLabel(v){return ({consultant:'Ваш консультант',distributor:'Дистрибьютор',partner:'Партнёр',leader:'Лидер',none:''})[v]||''}
function senderLines(cfg){const a=[],s=senderStatusLabel(cfg.senderStatus);if(s)a.push(s);if(cfg.senderName)a.push(cfg.senderName);if(cfg.senderPhone)a.push(cfg.senderPhone);if(cfg.senderOther)a.push(...String(cfg.senderOther).split(/\n+/).map(normalizeShareText).filter(Boolean).slice(0,3));return a}
function readSenderFields(cfg){cfg.senderStatus=document.getElementById('shareSenderStatus')?.value||'none';cfg.senderName=(document.getElementById('shareSenderName')?.value||'').trim();cfg.senderPhone=(document.getElementById('shareSenderPhone')?.value||'').trim();cfg.senderOther=(document.getElementById('shareSenderOther')?.value||'').trim();cfg.saveDefaults=!!document.getElementById('shareSaveDefaults')?.checked;return cfg}
function senderFieldsHtml(pref){return `<div class="shareField shareSenderBlock"><label>Контакты отправителя <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><select id="shareSenderStatus" class="shareInput"><option value="none">Не указывать статус</option><option value="consultant" ${pref.senderStatus==='consultant'?'selected':''}>Ваш консультант</option><option value="distributor" ${pref.senderStatus==='distributor'?'selected':''}>Дистрибьютор</option><option value="partner" ${pref.senderStatus==='partner'?'selected':''}>Партнёр</option><option value="leader" ${pref.senderStatus==='leader'?'selected':''}>Лидер</option></select><input id="shareSenderName" class="shareInput" style="margin-top:8px" maxlength="60" placeholder="Имя" value="${escapeHtml(pref.senderName||'')}"><input id="shareSenderPhone" class="shareInput" style="margin-top:8px" maxlength="40" placeholder="Телефон" value="${escapeHtml(pref.senderPhone||'')}"><textarea id="shareSenderOther" class="shareInput shareTextarea" maxlength="180" placeholder="Telegram, MAX, VK, WeChat или другие контакты">${escapeHtml(pref.senderOther||'')}</textarea><label class="shareToggle shareRemember"><span><b>Сохранить как настройки по умолчанию</b><small>Если выключено — изменения только для этой отправки</small></span><input id="shareSaveDefaults" type="checkbox"></label></div>`}
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

// V35.3 share entry: add batch sharing without changing the approved three existing choices.
openProductShare=function(id){
 const p=products.find(x=>x.id===id);if(!p)return;closeProductShare();const sh=document.createElement('div');sh.id='productShareSheet';sh.className='productShareShade';
 sh.innerHTML=`<div class="productShareSheet" role="dialog" aria-modal="true"><div class="shareGrab"></div><div class="shareTitle"><div><small>FUTURE HEALTH</small><b>Поделиться продуктом</b></div><button onclick="closeProductShare()">×</button></div><div class="shareProductMini">${p.img?`<img src="${p.img}" alt="">`:''}<span>${p.name}</span></div><button class="shareChoice" onclick="openShareProfileSettings()"><i>◉</i><span><b>Мои данные для публикаций</b><small>Единые данные: изменения синхронизируются с Центром публикаций</small></span><em>›</em></button><button class="shareChoice" onclick="openShareConfig('${p.id}',false)"><i>▧</i><span><b>Карточка продукта</b><small>Изображение с кратким официальным описанием</small></span><em>›</em></button><button class="shareChoice" onclick="openShareConfig('${p.id}',true)"><i>✦</i><span><b>Изображение + текст</b><small>Для Telegram, MAX, VK, WeChat и других приложений</small></span><em>›</em></button><button class="shareChoice" onclick="openBatchSharePicker('${p.id}')"><i>▦</i><span><b>Несколько продуктов</b><small>Выбрать и отправить до 5 карточек одновременно</small></span><em>›</em></button><button class="shareChoice" onclick="shareProductLink('${p.id}')"><i>↗</i><span><b>Ссылка на продукт</b><small>Откроется сразу эта страница продукта</small></span><em>›</em></button><div class="shareLinkPreview">${productDeepLink(p.id)}</div></div>`;
 sh.addEventListener('click',e=>{if(e.target===sh)closeProductShare()});document.body.appendChild(sh);
}

openShareConfig=function(id,withText){
 const p=products.find(x=>x.id===id);if(!p)return;closeProductShare();closeShareConfig();const pref=shareBasePrefs();shareDraft={id,withText,...pref,customPrice:''};
 const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';
 d.innerHTML=`<div class="shareConfigSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Настройка карточки</b></div><button onclick="closeShareConfig()">×</button></div><div class="shareSummaryPreview"><b>Официальное краткое описание:</b><br>${officialShareSummary(p)}</div><div class="shareField"><label>Цена на карточке</label><div class="shareModes"><button data-mode="none" onclick="setSharePriceMode('none')">Без цены</button><button data-mode="member" onclick="setSharePriceMode('member')">Для участников</button><button data-mode="custom" onclick="setSharePriceMode('custom')">Своя цена</button></div></div><div id="customPriceWrap" class="shareField hidden"><label>Своя цена, ₽</label><input id="shareCustomPrice" class="shareInput" inputmode="decimal" placeholder="Например, 5 980"></div><div id="pvToggleWrap" class="shareField hidden"><label class="shareToggle"><span>Показывать PV</span><input id="sharePV" type="checkbox" ${pref.showPV?'checked':''}></label></div><div class="shareField"><label>Акция / примечание <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><div class="sharePromoPresets"><button onclick="setPromoPreset(this,'Скидка при покупке нескольких упаковок')">Скидка за количество</button><button onclick="setPromoPreset(this,'2 + 1 в подарок')">2 + 1</button><button onclick="setPromoPreset(this,'Специальное предложение')">Спецпредложение</button><button onclick="setPromoPreset(this,'Цена по акции')">Цена по акции</button></div><input id="sharePromo" class="shareInput" style="margin-top:8px" maxlength="90" placeholder="Или введите свой текст" value="${escapeHtml(pref.promo||'')}"></div><div class="shareField"><label>Срок действия акции <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><div class="shareInline"><div><input id="shareStart" class="shareInput" type="date" value="${pref.start||''}"><div class="shareHint">Дата начала</div></div><div><input id="shareEnd" class="shareInput" type="date" value="${pref.end||''}"><div class="shareHint">Дата окончания</div></div></div></div>${senderFieldsHtml(pref)}<div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="generateConfiguredShare()">Создать карточку</button></div></div>`;
 d.addEventListener('click',e=>{if(e.target===d)closeShareConfig()});document.body.appendChild(d);setSharePriceMode(pref.priceMode||'none');
}
readShareConfig=function(){const p=products.find(x=>x.id===shareDraft?.id);if(!p)return null;const cfg={...shareDraft};cfg.customPrice=(document.getElementById('shareCustomPrice')?.value||'').trim();cfg.showPV=!!document.getElementById('sharePV')?.checked;cfg.promo=(document.getElementById('sharePromo')?.value||'').trim();cfg.start=document.getElementById('shareStart')?.value||'';cfg.end=document.getElementById('shareEnd')?.value||'';return readSenderFields(cfg)}
function persistShareDefaults(cfg){if(!cfg.saveDefaults)return;const keep={priceMode:cfg.priceMode,showPV:cfg.showPV,promo:cfg.promo,start:cfg.start,end:cfg.end,senderStatus:cfg.senderStatus,senderName:cfg.senderName,senderPhone:cfg.senderPhone,senderOther:cfg.senderOther};saveSharePrefs(keep)}

productShareText=function(p,cfg){const c=cats.find(x=>x.id===p.cat),lines=[p.name,'',officialShareSummary(p)];const prices=sharePriceLines(p,cfg);if(prices.length)lines.push('',...prices);if(cfg.promo)lines.push('',cfg.promo);const period=offerPeriod(cfg);if(period)lines.push(period);const sender=senderLines(cfg);if(sender.length)lines.push('','Контакт:',...sender);if(cfg.priceMode==='custom'||cfg.promo)lines.push('','Условия предложения устанавливаются продавцом.');lines.push('',c?.ru||'','',productDeepLink(p.id));return lines.join('\n')}

makeProductCard=async function(p,cfg){
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#f8fbfe';x.fillRect(0,0,W,H);const g=x.createLinearGradient(0,0,W,410);g.addColorStop(0,'#e9f6ff');g.addColorStop(1,'#fff');x.fillStyle=g;x.fillRect(0,0,W,410);x.fillStyle='#1268ad';x.font='700 40px Arial,sans-serif';x.fillText('FUTURE HEALTH',70,76);x.fillStyle='#6c8aa5';x.font='500 20px Arial,sans-serif';x.fillText('КАТАЛОГ ПРОДУКЦИИ',70,108);
 const src=cleanImg(p)||p.img;if(src){try{const im=await loadCanvasImage(src),box={x:165,y:130,w:750,h:390},r=Math.min(box.w/im.width,box.h/im.height),w=im.width*r,h=im.height*r;x.drawImage(im,box.x+(box.w-w)/2,box.y+(box.h-h)/2,w,h)}catch{}}
 let y=565;x.fillStyle='#102f4f';x.font='700 35px Arial,sans-serif';wrapCanvasText(x,p.name,940).slice(0,3).forEach(s=>{x.fillText(s,70,y);y+=43});y+=7;x.fillStyle='#56758e';x.font='400 23px Arial,sans-serif';wrapCanvasText(x,officialShareSummary(p),940).slice(0,4).forEach(s=>{x.fillText(s,70,y);y+=31});y+=10;
 const prices=sharePriceLines(p,cfg);if(prices.length){x.fillStyle='#1268ad';x.font='700 27px Arial,sans-serif';prices.forEach(s=>{x.fillText(s,70,y);y+=34});y+=3}
 if(cfg.promo){x.font='700 22px Arial,sans-serif';const ps=wrapCanvasText(x,cfg.promo,820).slice(0,2);const ph=ps.length*28+20;x.fillStyle='#eaf6ff';roundRect(x,70,y,940,ph,15);x.fillStyle='#0f67a8';ps.forEach((s,i)=>x.fillText(s,92,y+31+i*28));y+=ph+9}
 const period=offerPeriod(cfg);if(period){x.fillStyle='#6a8398';x.font='500 19px Arial,sans-serif';x.fillText(period,70,y);y+=27}
 const sender=senderLines(cfg);if(sender.length&&y<1110){x.strokeStyle='#d9e9f5';x.lineWidth=2;x.beginPath();x.moveTo(70,y+4);x.lineTo(1010,y+4);x.stroke();y+=30;x.fillStyle='#365d7e';x.font='700 20px Arial,sans-serif';x.fillText(sender[0],70,y);y+=27;x.font='500 19px Arial,sans-serif';sender.slice(1,5).forEach(s=>{wrapCanvasText(x,s,940).slice(0,1).forEach(q=>{x.fillText(q,70,y);y+=25})})}
 if((cfg.priceMode==='custom'||cfg.promo)&&y<1190){x.fillStyle='#8a9cac';x.font='400 15px Arial,sans-serif';x.fillText('Условия предложения устанавливаются продавцом.',70,1190)}
 x.strokeStyle='#d9e9f5';x.lineWidth=2;x.beginPath();x.moveTo(70,1225);x.lineTo(1010,1225);x.stroke();x.fillStyle='#587895';x.font='500 20px Arial,sans-serif';x.fillText('Полная информация — по ссылке на продукт',70,1266);x.fillStyle='#1268ad';x.font='700 19px Arial,sans-serif';x.fillText('FUTURE HEALTH · SHARE HAPPINESS',70,1308);return new Promise(res=>c.toBlob(res,'image/png',.95));
}

const _generateConfiguredShareV352=generateConfiguredShare;
generateConfiguredShare=async function(){const cfg=readShareConfig();if(!cfg)return;persistShareDefaults(cfg);return _generateConfiguredShareV352()}

let batchSelected=[];
function closeBatchPicker(){document.getElementById('batchShareShade')?.remove()}
function openBatchSharePicker(seedId){closeProductShare();batchSelected=[seedId];const d=document.createElement('div');d.id='batchShareShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchPicker"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Выберите до 5 продуктов</b></div><button onclick="closeBatchPicker()">×</button></div><input id="batchSearch" class="shareInput" placeholder="Поиск продукта" oninput="renderBatchProducts(this.value)"><div class="batchCounter"><b id="batchCount">1</b> / 5</div><div id="batchProducts" class="batchProducts"></div><div class="shareConfigActions"><button class="secondary" onclick="closeBatchPicker()">Отмена</button><button class="primary" onclick="openBatchConfig()">Продолжить</button></div></div>`;d.addEventListener('click',e=>{if(e.target===d)closeBatchPicker()});document.body.appendChild(d);renderBatchProducts('')}
function renderBatchProducts(q){const box=document.getElementById('batchProducts');if(!box)return;const s=normalizeShareText(q).toLowerCase();const arr=products.filter(p=>!s||normalizeShareText(p.name).toLowerCase().includes(s)).slice(0,120);box.innerHTML=arr.map(p=>`<button class="batchProduct ${batchSelected.includes(p.id)?'selected':''}" onclick="toggleBatchProduct('${p.id}')">${p.img?`<img src="${p.img}" alt="">`:''}<span>${p.name}</span><i>${batchSelected.includes(p.id)?'✓':'+'}</i></button>`).join('')}
function toggleBatchProduct(id){if(batchSelected.includes(id))batchSelected=batchSelected.filter(x=>x!==id);else{if(batchSelected.length>=5){showShareToast('Максимум 5 продуктов','Удалите один продукт, чтобы выбрать другой');return}batchSelected.push(id)}document.getElementById('batchCount').textContent=batchSelected.length;renderBatchProducts(document.getElementById('batchSearch')?.value||'')}
function batchRowHtml(p,pref){return `<div class="batchCfgRow" data-id="${p.id}"><div class="batchCfgHead">${p.img?`<img src="${p.img}" alt="">`:''}<b>${p.name}</b></div><div class="batchMiniGrid"><select class="shareInput batchMode" onchange="batchModeChanged(this)"><option value="none" ${pref.priceMode==='none'?'selected':''}>Без цены</option><option value="member" ${pref.priceMode==='member'?'selected':''}>Для участников</option><option value="custom" ${pref.priceMode==='custom'?'selected':''}>Своя цена</option></select><input class="shareInput batchPrice ${pref.priceMode==='custom'?'':'hidden'}" inputmode="decimal" placeholder="Цена, ₽"><label class="batchPv"><input class="batchPV" type="checkbox" ${pref.showPV?'checked':''}> PV</label></div><input class="shareInput batchPromo" maxlength="90" placeholder="Акция / примечание для этой карточки" value="${escapeHtml(pref.promo||'')}"></div>`}
function batchModeChanged(el){el.closest('.batchCfgRow')?.querySelector('.batchPrice')?.classList.toggle('hidden',el.value!=='custom')}
function openBatchConfig(){if(!batchSelected.length)return;closeBatchPicker();const pref=shareBasePrefs(),ps=batchSelected.map(id=>products.find(p=>p.id===id)).filter(Boolean);const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchConfig"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Пакет из ${ps.length} карточек</b></div><button onclick="closeShareConfig()">×</button></div><div class="shareHint batchHint">Цена и акция настраиваются отдельно для каждой карточки. Контакты и срок действия применяются ко всем.</div>${ps.map(p=>batchRowHtml(p,pref)).join('')}<div class="shareField"><label>Общий срок действия <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><div class="shareInline"><input id="shareStart" class="shareInput" type="date" value="${pref.start||''}"><input id="shareEnd" class="shareInput" type="date" value="${pref.end||''}"></div></div>${senderFieldsHtml(pref)}<div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="generateBatchShare()">Создать ${ps.length} карточек</button></div></div>`;d.addEventListener('click',e=>{if(e.target===d)closeShareConfig()});document.body.appendChild(d)}
function readBatchConfigs(){const base=readSenderFields({start:document.getElementById('shareStart')?.value||'',end:document.getElementById('shareEnd')?.value||''});return [...document.querySelectorAll('.batchCfgRow')].map(r=>({id:r.dataset.id,priceMode:r.querySelector('.batchMode').value,customPrice:r.querySelector('.batchPrice').value.trim(),showPV:r.querySelector('.batchPV').checked,promo:r.querySelector('.batchPromo').value.trim(),...base}))}
async function generateBatchShare(){const cfgs=readBatchConfigs();if(!cfgs.length)return;const base=cfgs[0];if(base.start&&base.end&&base.end<base.start){showShareToast('Проверьте даты','Дата окончания не может быть раньше даты начала');return}if(base.end&&base.end<new Date().toISOString().slice(0,10)){showShareToast('Акция уже завершена','Укажите актуальную дату окончания');return}for(const c of cfgs){if(c.priceMode==='custom'&&!c.customPrice){showShareToast('Укажите цену','Для одной из карточек выбрана «Своя цена» без значения');return}}
 if(base.saveDefaults)saveSharePrefs({priceMode:cfgs[0].priceMode,showPV:cfgs[0].showPV,promo:cfgs[0].promo,start:base.start,end:base.end,senderStatus:base.senderStatus,senderName:base.senderName,senderPhone:base.senderPhone,senderOther:base.senderOther});
 const files=[];for(const cfg of cfgs){const p=products.find(x=>x.id===cfg.id),blob=await makeProductCard(p,cfg);if(!blob)continue;const safe=p.name.replace(/[^a-zа-яё0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,55)||'future-health-product';files.push(new File([blob],`${safe}.png`,{type:'image/png'}))}
 try{if(files.length&&navigator.canShare?.({files})&&navigator.share){await navigator.share({title:`FUTURE HEALTH — ${files.length} продуктов`,files});closeShareConfig();return}}catch(e){if(e?.name==='AbortError')return}
 files.forEach((f,i)=>{const a=document.createElement('a');a.href=URL.createObjectURL(f);a.download=f.name;setTimeout(()=>{a.click();URL.revokeObjectURL(a.href)},i*180)});closeShareConfig();showShareToast('Карточки готовы',`Создано: ${files.length}. Браузер сохранил их по отдельности.`)}

/* ===== V35.4 — DIRECT SHARE + MULTI PREVIEW + INPUT NORMALIZATION ===== */
const SHARE_PROMO_MAX=100;
function titleCasePerson(v){return String(v||'').toLocaleLowerCase('ru-RU').replace(/(^|[\s\-'])\p{L}/gu,m=>m.toLocaleUpperCase('ru-RU'))}
function normalizeRuPhone(v){let d=String(v||'').replace(/\D/g,'');if(d.length===10)d='7'+d;if(d.length>11)d=d.slice(0,11);if(d.length===11&&(d[0]==='7'||d[0]==='8'))d='7'+d.slice(1);return d}
function formatRuPhone(v){const d=normalizeRuPhone(v);if(d.length!==11||d[0]!=='7')return String(v||'').trim();return `+7 (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7,9)}-${d.slice(9,11)}`}
function bindShareInputs(root=document){const n=root.querySelector('#shareSenderName');if(n){n.autocapitalize='words';n.addEventListener('blur',()=>n.value=titleCasePerson(n.value))}const ph=root.querySelector('#shareSenderPhone');if(ph){ph.inputMode='tel';ph.maxLength=18;ph.placeholder='7/8XXXXXXXXXX';ph.addEventListener('blur',()=>{const d=normalizeRuPhone(ph.value);if(d.length===11)ph.value=formatRuPhone(d)})}root.querySelectorAll('#sharePromo,.batchPromo').forEach(el=>{el.maxLength=SHARE_PROMO_MAX;let c=el.nextElementSibling;if(!c||!c.classList?.contains('shareCharCount')){c=document.createElement('div');c.className='shareCharCount';el.insertAdjacentElement('afterend',c)}const upd=()=>c.textContent=`${el.value.length} / ${SHARE_PROMO_MAX}`;el.addEventListener('input',upd);upd()})}
const _senderLinesV354=senderLines;
senderLines=function(cfg){const c={...cfg,senderName:titleCasePerson(cfg.senderName),senderPhone:formatRuPhone(cfg.senderPhone)};return _senderLinesV354(c)}
const _readSenderFieldsV354=readSenderFields;
readSenderFields=function(cfg){cfg=_readSenderFieldsV354(cfg);cfg.senderName=titleCasePerson(cfg.senderName);const raw=normalizeRuPhone(cfg.senderPhone);cfg.senderPhone=raw.length===11?formatRuPhone(raw):cfg.senderPhone;return cfg}

async function drawBrandLogo(ctx){try{const im=await loadCanvasImage('assets/future-health-logo.png');const maxW=145,maxH=58,r=Math.min(maxW/im.width,maxH/im.height);ctx.drawImage(im,865,35,im.width*r,im.height*r)}catch(e){}}
const _makeProductCardV354=makeProductCard;
makeProductCard=async function(p,cfg){const blob=await _makeProductCardV354(p,cfg);try{const bm=await createImageBitmap(blob),c=document.createElement('canvas');c.width=1080;c.height=1350;const x=c.getContext('2d');x.drawImage(bm,0,0);await drawBrandLogo(x);return await new Promise(res=>c.toBlob(res,'image/png',.95))}catch(e){return blob}}

function shareFileName(p){return (p.name.replace(/[^a-zа-яё0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,55)||'future-health-product')+'.png'}
let sharePreviewState=null;
function closeSharePreview(){if(sharePreviewState?.urls)sharePreviewState.urls.forEach(URL.revokeObjectURL);sharePreviewState=null;document.getElementById('sharePreviewShade')?.remove()}
function previewGo(i){if(!sharePreviewState)return;const n=sharePreviewState.files.length;sharePreviewState.index=Math.max(0,Math.min(n-1,i));document.querySelector('.sharePreviewTrack')?.style.setProperty('transform',`translate3d(${-sharePreviewState.index*100}vw,0,0)`);const c=document.getElementById('sharePreviewCount');if(c)c.textContent=`${sharePreviewState.index+1}/${n}`;document.querySelectorAll('.sharePreviewDots i').forEach((d,k)=>d.classList.toggle('active',k===sharePreviewState.index))}
function openSharePreview(files,text='',title='FUTURE HEALTH'){closeShareConfig();closeSharePreview();const urls=files.map(f=>URL.createObjectURL(f));sharePreviewState={files,text,title,urls,index:0};const d=document.createElement('div');d.id='sharePreviewShade';d.className='sharePreviewShade';d.innerHTML=`<div class="sharePreviewHead"><button onclick="closeSharePreview()">← Назад</button><b>Предпросмотр</b><button onclick="sharePreviewNow()">Поделиться</button></div><div class="sharePreviewStage"><div class="sharePreviewTrack">${urls.map((u,i)=>`<div class="sharePreviewSlide"><img src="${u}" alt="Карточка ${i+1}"></div>`).join('')}</div></div><div class="sharePreviewFoot"><span id="sharePreviewCount" class="sharePreviewCount">1/${files.length}</span><button class="sharePreviewShare" onclick="sharePreviewNow()">${files.length>1?'Поделиться всеми':'Поделиться'}</button><div class="sharePreviewDots">${files.map((_,i)=>`<i class="${i===0?'active':''}"></i>`).join('')}</div></div>`;document.body.appendChild(d);let sx=0,sy=0;const st=d.querySelector('.sharePreviewStage');st.addEventListener('touchstart',e=>{if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY}},{passive:true});st.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))previewGo(sharePreviewState.index+(dx<0?1:-1))},{passive:true})}
async function sharePreviewNow(){const s=sharePreviewState;if(!s)return;try{if(navigator.canShare?.({files:s.files})&&navigator.share){await navigator.share({title:s.title,text:s.text||undefined,files:s.files});return}}catch(e){if(e?.name==='AbortError')return}showShareToast('Системная отправка недоступна','Откройте страницу в Safari на iPhone и повторите попытку')}

function validateShareCfg(cfg){if(cfg.priceMode==='custom'&&!cfg.customPrice){showShareToast('Укажите цену','Введите свою цену или выберите другой режим');return false}if(cfg.start&&cfg.end&&cfg.end<cfg.start){showShareToast('Проверьте даты','Дата окончания не может быть раньше даты начала');return false}if(cfg.end&&cfg.end<new Date().toISOString().slice(0,10)){showShareToast('Акция уже завершена','Укажите актуальную дату окончания');return false}const d=normalizeRuPhone(cfg.senderPhone);if(cfg.senderPhone&&!(d.length===11&&d[0]==='7')){showShareToast('Проверьте телефон','Введите 11 цифр, начиная с 7 или 8');return false}return true}
async function buildSingleShare(previewOnly=false){const cfg=readShareConfig();if(!cfg||!validateShareCfg(cfg))return;persistShareDefaults(cfg);const p=products.find(x=>x.id===cfg.id),blob=await makeProductCard(p,cfg);if(!blob)return;const file=new File([blob],shareFileName(p),{type:'image/png'}),text=cfg.withText?productShareText(p,cfg):'';if(previewOnly){openSharePreview([file],text,p.name);return}try{if(navigator.canShare?.({files:[file]})&&navigator.share){await navigator.share({title:p.name,text:text||undefined,files:[file]});return}}catch(e){if(e?.name==='AbortError')return}openSharePreview([file],text,p.name)}
generateConfiguredShare=function(){return buildSingleShare(false)}
function previewConfiguredShare(){return buildSingleShare(true)}

const _openShareConfigV354=openShareConfig;
openShareConfig=function(id,withText){_openShareConfigV354(id,withText);const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet)return;const title=sheet.querySelector('.shareConfigHead b');if(title)title.textContent=withText?'Изображение + текст':'Карточка продукта';const actions=sheet.querySelector('.shareConfigActions');if(actions)actions.innerHTML=`<button class="secondary" onclick="previewConfiguredShare()">Предпросмотр</button><button class="primary" onclick="generateConfiguredShare()">Поделиться</button>`;bindShareInputs(sheet)}

const _openBatchConfigV354=openBatchConfig;
openBatchConfig=function(){_openBatchConfigV354();const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet)return;const actions=sheet.querySelector('.shareConfigActions');if(actions)actions.innerHTML=`<button class="secondary" onclick="previewBatchShare()">Предпросмотр</button><button class="primary" onclick="generateBatchShare()">Поделиться всеми</button>`;bindShareInputs(sheet)}
async function buildBatch(previewOnly=false){const cfgs=readBatchConfigs();if(!cfgs.length)return;for(const c of cfgs)if(!validateShareCfg(c))return;const base=cfgs[0];if(base.saveDefaults)saveSharePrefs({priceMode:cfgs[0].priceMode,showPV:cfgs[0].showPV,promo:cfgs[0].promo,start:base.start,end:base.end,senderStatus:base.senderStatus,senderName:base.senderName,senderPhone:base.senderPhone,senderOther:base.senderOther});const files=[];for(const cfg of cfgs){const p=products.find(x=>x.id===cfg.id),blob=await makeProductCard(p,cfg);if(blob)files.push(new File([blob],shareFileName(p),{type:'image/png'}))}if(previewOnly){openSharePreview(files,'',`FUTURE HEALTH — ${files.length} продуктов`);return}try{if(files.length&&navigator.canShare?.({files})&&navigator.share){await navigator.share({title:`FUTURE HEALTH — ${files.length} продуктов`,files});return}}catch(e){if(e?.name==='AbortError')return}openSharePreview(files,'',`FUTURE HEALTH — ${files.length} продуктов`)}
generateBatchShare=function(){return buildBatch(false)}
function previewBatchShare(){return buildBatch(true)}

/* ===== V35.5 — 9:16 CARD + STRUCTURED CONTACTS + ZOOMABLE PREVIEW ===== */
const SHARE_CONTACT_TYPES=['Telegram','MAX','VK','WeChat','Email','Адрес','Адрес офиса'];
const SHARE_CONTACT_LIMITS={'Telegram':40,'MAX':40,'VK':50,'WeChat':40,'Email':64,'Адрес':90,'Адрес офиса':90};
function contactTypeOptions(sel=''){return SHARE_CONTACT_TYPES.map(v=>`<option value="${v}" ${sel===v?'selected':''}>${v}</option>`).join('')}
function parseSavedContacts(pref){
  if(Array.isArray(pref.senderContacts)) return pref.senderContacts.slice(0,2);
  const raw=String(pref.senderOther||'').split(/\n+/).map(s=>s.trim()).filter(Boolean).slice(0,2);
  return raw.map((s,i)=>{const m=s.match(/^(Telegram|MAX|VK|WeChat|Email|Адрес офиса|Адрес)\s*:\s*(.*)$/i);return m?{type:m[1],value:m[2]}:{type:i?'VK':'Telegram',value:s}});
}
function senderFieldsHtml(pref){const cs=parseSavedContacts(pref);while(cs.length<2)cs.push({type:cs.length?'VK':'Telegram',value:''});return `<div class="shareField shareSenderBlock"><label>Контакты отправителя <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><select id="shareSenderStatus" class="shareInput"><option value="none">Не указывать статус</option><option value="consultant" ${pref.senderStatus==='consultant'?'selected':''}>Ваш консультант</option><option value="distributor" ${pref.senderStatus==='distributor'?'selected':''}>Дистрибьютор</option><option value="partner" ${pref.senderStatus==='partner'?'selected':''}>Партнёр</option><option value="leader" ${pref.senderStatus==='leader'?'selected':''}>Лидер</option></select><input id="shareSenderName" class="shareInput" style="margin-top:8px" maxlength="60" placeholder="Имя" value="${escapeHtml(pref.senderName||'')}"><input id="shareSenderPhone" class="shareInput" style="margin-top:8px" maxlength="18" placeholder="7/8XXXXXXXXXX" value="${escapeHtml(pref.senderPhone||'')}"><div class="shareContactRow" style="margin-top:8px"><select id="shareContactType1" class="shareInput">${contactTypeOptions(cs[0].type)}</select><input id="shareContactValue1" class="shareInput" maxlength="${SHARE_CONTACT_LIMITS[cs[0].type]||40}" placeholder="Контакт" value="${escapeHtml(cs[0].value||'')}"></div><div class="shareContactRow" style="margin-top:8px"><select id="shareContactType2" class="shareInput">${contactTypeOptions(cs[1].type)}</select><input id="shareContactValue2" class="shareInput" maxlength="${SHARE_CONTACT_LIMITS[cs[1].type]||40}" placeholder="Контакт" value="${escapeHtml(cs[1].value||'')}"></div><div class="shareHint">Можно указать не более двух дополнительных контактов. Пустые строки на карточке не отображаются.</div><label class="shareToggle shareRemember"><span><b>Сохранить как настройки по умолчанию</b><small>Если выключено — изменения только для этой отправки</small></span><input id="shareSaveDefaults" type="checkbox"></label></div>`}
function readContactRows(){const out=[];for(let i=1;i<=2;i++){const type=document.getElementById('shareContactType'+i)?.value||'Telegram';let value=(document.getElementById('shareContactValue'+i)?.value||'').trim();if(value)out.push({type,value:value.slice(0,SHARE_CONTACT_LIMITS[type]||40)})}return out}
readSenderFields=function(cfg){cfg.senderStatus=document.getElementById('shareSenderStatus')?.value||'none';cfg.senderName=titleCasePerson((document.getElementById('shareSenderName')?.value||'').trim());const ph=(document.getElementById('shareSenderPhone')?.value||'').trim(),d=normalizeRuPhone(ph);cfg.senderPhone=d.length===11?formatRuPhone(d):ph;cfg.senderContacts=readContactRows();cfg.senderOther='';cfg.saveDefaults=!!document.getElementById('shareSaveDefaults')?.checked;return cfg}
senderLines=function(cfg){const a=[],s=senderStatusLabel(cfg.senderStatus);if(s)a.push(s);if(cfg.senderName)a.push(cfg.senderName);if(cfg.senderPhone)a.push(formatRuPhone(cfg.senderPhone));(cfg.senderContacts||[]).slice(0,2).forEach(c=>{if(c?.value)a.push(`${c.type}: ${String(c.value).trim()}`)});return a}
persistShareDefaults=function(cfg){if(!cfg.saveDefaults)return;saveSharePrefs({priceMode:cfg.priceMode,showPV:cfg.showPV,promo:cfg.promo,start:cfg.start,end:cfg.end,senderStatus:cfg.senderStatus,senderName:cfg.senderName,senderPhone:cfg.senderPhone,senderContacts:cfg.senderContacts||[]})}
function bindStructuredContacts(root=document){for(let i=1;i<=2;i++){const s=root.querySelector('#shareContactType'+i),v=root.querySelector('#shareContactValue'+i);if(s&&v){const upd=()=>{v.maxLength=SHARE_CONTACT_LIMITS[s.value]||40;v.placeholder=(s.value==='Email'?'name@example.com':s.value.includes('Адрес')?'Введите адрес':'Введите контакт')};s.addEventListener('change',upd);upd()}}}
const _bindShareInputs355=bindShareInputs;bindShareInputs=function(root=document){_bindShareInputs355(root);bindStructuredContacts(root)}

// 9:16 mobile-first share card (1080×1920).
makeProductCard=async function(p,cfg){
 const W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 x.fillStyle='#f8fbfe';x.fillRect(0,0,W,H);const g=x.createLinearGradient(0,0,W,520);g.addColorStop(0,'#e9f6ff');g.addColorStop(1,'#ffffff');x.fillStyle=g;x.fillRect(0,0,W,520);
 x.fillStyle='#1268ad';x.font='700 42px Arial,sans-serif';x.fillText('FUTURE HEALTH',70,86);x.fillStyle='#6c8aa5';x.font='500 20px Arial,sans-serif';x.fillText('КАТАЛОГ ПРОДУКЦИИ',70,119);
 try{const logo=await loadCanvasImage('assets/future-health-logo.png'),mw=170,mh=70,r=Math.min(mw/logo.width,mh/logo.height);x.drawImage(logo,W-70-logo.width*r,42,logo.width*r,logo.height*r)}catch{}
 const src=cleanImg(p)||p.img;if(src){try{const im=await loadCanvasImage(src),box={x:120,y:155,w:840,h:650},r=Math.min(box.w/im.width,box.h/im.height),w=im.width*r,h=im.height*r;x.drawImage(im,box.x+(box.w-w)/2,box.y+(box.h-h)/2,w,h)}catch{}}
 let y=865;x.fillStyle='#102f4f';x.font='700 42px Arial,sans-serif';wrapCanvasText(x,p.name,940).slice(0,4).forEach(s=>{x.fillText(s,70,y);y+=52});y+=12;
 x.fillStyle='#56758e';x.font='400 27px Arial,sans-serif';wrapCanvasText(x,officialShareSummary(p),940).slice(0,5).forEach(s=>{x.fillText(s,70,y);y+=38});y+=16;
 const prices=sharePriceLines(p,cfg);if(prices.length){x.fillStyle='#1268ad';x.font='700 31px Arial,sans-serif';prices.forEach(s=>{x.fillText(s,70,y);y+=40});y+=8}
 if(cfg.promo){x.font='700 27px Arial,sans-serif';const ps=wrapCanvasText(x,cfg.promo,850).slice(0,3),ph=ps.length*36+30;x.fillStyle='#eaf6ff';roundRect(x,70,y,940,ph,18);x.fillStyle='#0f67a8';ps.forEach((s,i)=>x.fillText(s,94,y+40+i*36));y+=ph+12}
 const period=offerPeriod(cfg);if(period){x.fillStyle='#6a8398';x.font='500 22px Arial,sans-serif';x.fillText(period,72,y+22);y+=46}
 const sender=senderLines(cfg);if(sender.length){const maxY=1770,remaining=Math.max(145,Math.min(300,maxY-y));x.fillStyle='#ffffff';roundRect(x,70,y,940,remaining,20);x.strokeStyle='#dceaf5';x.lineWidth=2;x.stroke();x.fillStyle='#6c8aa5';x.font='700 18px Arial,sans-serif';x.fillText('КОНТАКТ',94,y+34);let sy=y+72;sender.slice(0,5).forEach((s,i)=>{x.fillStyle=i===0?'#173f66':'#496a84';x.font=(i===0?'700 ':'500 ')+(i===0?'26px':'23px')+' Arial,sans-serif';wrapCanvasText(x,s,850).slice(0,2).forEach(line=>{if(sy<y+remaining-18){x.fillText(line,94,sy);sy+=31}})});y+=remaining+12}
 if(cfg.priceMode==='custom'||cfg.promo){x.fillStyle='#8195a7';x.font='400 17px Arial,sans-serif';x.fillText('Условия предложения устанавливаются продавцом.',70,1830)}
 x.fillStyle='#7b91a5';x.font='500 17px Arial,sans-serif';x.fillText('FUTURE HEALTH · мобильный каталог продукции',70,1872);x.fillStyle='#1268ad';x.fillRect(70,1890,940,3);
 return await new Promise(res=>c.toBlob(res,'image/png',.95));
}

// Configuration is always followed by preview; actual sharing happens from preview.
generateConfiguredShare=function(){return buildSingleShare(true)}
generateBatchShare=function(){return buildBatch(true)}
const _openShareConfig355=openShareConfig;openShareConfig=function(id,withText){_openShareConfig355(id,withText);const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet)return;const actions=sheet.querySelector('.shareConfigActions');if(actions)actions.innerHTML=`<button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="previewConfiguredShare()">Предпросмотр</button>`;bindShareInputs(sheet)}
const _openBatchConfig355=openBatchConfig;openBatchConfig=function(){_openBatchConfig355();const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet)return;const actions=sheet.querySelector('.shareConfigActions');if(actions)actions.innerHTML=`<button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="previewBatchShare()">Предпросмотр</button>`;bindShareInputs(sheet)}

function validateContactCfg(cfg){for(const c of (cfg.senderContacts||[])){if(c.type==='Email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value)){showShareToast('Проверьте Email','Введите корректный адрес электронной почты');return false}}return true}
const _validateShareCfg355=validateShareCfg;validateShareCfg=function(cfg){return _validateShareCfg355(cfg)&&validateContactCfg(cfg)}

// Preview: pinch/double-tap zoom + pan. Horizontal product switching works at 1× only.
function previewResetZoom(){if(!sharePreviewState)return;sharePreviewState.scale=1;sharePreviewState.tx=0;sharePreviewState.ty=0;applyPreviewTransform()}
function applyPreviewTransform(){const s=sharePreviewState;if(!s)return;const img=document.querySelector(`.sharePreviewSlide[data-i="${s.index}"] img`);if(img)img.style.transform=`translate3d(${s.tx||0}px,${s.ty||0}px,0) scale(${s.scale||1})`}
const _previewGo355=previewGo;previewGo=function(i){_previewGo355(i);if(sharePreviewState){sharePreviewState.scale=1;sharePreviewState.tx=0;sharePreviewState.ty=0;applyPreviewTransform()}}
openSharePreview=function(files,text='',title='FUTURE HEALTH'){closeShareConfig();closeSharePreview();const urls=files.map(f=>URL.createObjectURL(f));sharePreviewState={files,text,title,urls,index:0,scale:1,tx:0,ty:0};const d=document.createElement('div');d.id='sharePreviewShade';d.className='sharePreviewShade';d.innerHTML=`<div class="sharePreviewHead"><button onclick="closeSharePreview()">← Назад</button><b>Предпросмотр</b><button onclick="sharePreviewNow()">Поделиться</button></div><div class="sharePreviewStage"><div class="sharePreviewTrack">${urls.map((u,i)=>`<div class="sharePreviewSlide" data-i="${i}"><img src="${u}" alt="Карточка ${i+1}" draggable="false"></div>`).join('')}</div></div><div class="sharePreviewFoot"><span id="sharePreviewCount" class="sharePreviewCount">1/${files.length}</span><button class="sharePreviewShare" onclick="sharePreviewNow()">${files.length>1?'Поделиться всеми':'Поделиться'}</button><div class="sharePreviewDots">${files.map((_,i)=>`<i class="${i===0?'active':''}"></i>`).join('')}</div></div>`;document.body.appendChild(d);
 const st=d.querySelector('.sharePreviewStage');let sx=0,sy=0,lastDist=0,startScale=1,lastTap=0,panX=0,panY=0;
 st.addEventListener('touchstart',e=>{if(e.touches.length===2){lastDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);startScale=sharePreviewState.scale;e.preventDefault()}else if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;panX=sharePreviewState.tx||0;panY=sharePreviewState.ty||0}},{passive:false});
 st.addEventListener('touchmove',e=>{const s=sharePreviewState;if(!s)return;if(e.touches.length===2){const dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);s.scale=Math.max(1,Math.min(4,startScale*(dist/lastDist)));if(s.scale===1){s.tx=s.ty=0}applyPreviewTransform();e.preventDefault()}else if(e.touches.length===1&&s.scale>1){s.tx=panX+(e.touches[0].clientX-sx);s.ty=panY+(e.touches[0].clientY-sy);applyPreviewTransform();e.preventDefault()}},{passive:false});
 st.addEventListener('touchend',e=>{const s=sharePreviewState;if(!s)return;if(e.changedTouches.length===1&&s.scale===1){const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy,now=Date.now();if(Math.abs(dx)<12&&Math.abs(dy)<12&&now-lastTap<320){s.scale=2;s.tx=s.ty=0;applyPreviewTransform();lastTap=0;return}if(Math.abs(dx)<12&&Math.abs(dy)<12)lastTap=now;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))previewGo(s.index+(dx<0?1:-1))}else if(s.scale<1.05)previewResetZoom()},{passive:true});
}

// Always give visible feedback if Web Share is unavailable (common on plain HTTP LAN testing).
sharePreviewNow=async function(){const s=sharePreviewState;if(!s)return;try{if(navigator.share){const payload={title:s.title};if(s.text)payload.text=s.text;if(s.files?.length){if(!navigator.canShare||navigator.canShare({files:s.files}))payload.files=s.files}await navigator.share(payload);return}}catch(e){if(e?.name==='AbortError')return;console.warn(e)}showShareToast('Не удалось открыть меню «Поделиться»','Для отправки файлов откройте каталог по HTTPS. В локальном HTTP-тесте iPhone может блокировать системный Share.')}

/* ===== V35.6 — INPUT RULES + OPTIONAL CONTACTS + PREVIEW BACK NAV ===== */
let shareReturnProductId='';
const _shareBasePrefs356=shareBasePrefs;
shareBasePrefs=function(){const p=_shareBasePrefs356();p.promo='';p.start='';p.end='';return p};

// Preserve intentional line breaks (e.g. custom promotion text) while still wrapping long lines.
wrapCanvasText=function(ctx,text,maxWidth){
 const out=[];String(text||'').split(/\r?\n/).forEach(par=>{
   if(!par.trim()){out.push('');return}
   const words=par.trim().split(/\s+/);let line='';
   for(const w of words){const t=line?line+' '+w:w;if(ctx.measureText(t).width>maxWidth&&line){out.push(line);line=w}else line=t}
   if(line)out.push(line);
 });return out;
};

contactTypeOptions=function(sel='none'){
 const types=['none','Telegram','MAX','VK','WeChat','Email','Адрес','Адрес офиса'];
 return types.map(v=>`<option value="${v}" ${sel===v?'selected':''}>${v==='none'?'Не указать':v}</option>`).join('');
};
parseSavedContacts=function(pref){
 if(Array.isArray(pref.senderContacts)) return pref.senderContacts.slice(0,2).map(c=>({type:c?.type||'none',value:c?.value||''}));
 return [];
};
senderFieldsHtml=function(pref){
 const cs=parseSavedContacts(pref);while(cs.length<2)cs.push({type:'none',value:''});
 return `<div class="shareField shareSenderBlock"><label>Контакты отправителя <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><select id="shareSenderStatus" class="shareInput"><option value="none">Не указывать статус</option><option value="consultant" ${pref.senderStatus==='consultant'?'selected':''}>Ваш консультант</option><option value="distributor" ${pref.senderStatus==='distributor'?'selected':''}>Дистрибьютор</option><option value="partner" ${pref.senderStatus==='partner'?'selected':''}>Партнёр</option><option value="leader" ${pref.senderStatus==='leader'?'selected':''}>Лидер</option></select><input id="shareSenderName" class="shareInput" style="margin-top:8px" maxlength="60" placeholder="Имя" value="${escapeHtml(pref.senderName||'')}"><input id="shareSenderPhone" class="shareInput" style="margin-top:8px" inputmode="numeric" pattern="[0-9]*" maxlength="11" placeholder="7XXXXXXXXXX или 8XXXXXXXXXX" value="${escapeHtml(normalizeRuPhone(pref.senderPhone||'').replace(/^7(?=\d{10}$)/, pref.senderPhone&&String(pref.senderPhone).trim().startsWith('8')?'8':'7'))}"><div class="shareContactRow" style="margin-top:8px"><select id="shareContactType1" class="shareInput">${contactTypeOptions(cs[0].type)}</select><input id="shareContactValue1" class="shareInput" maxlength="${SHARE_CONTACT_LIMITS[cs[0].type]||40}" placeholder="Контакт" value="${escapeHtml(cs[0].value||'')}"></div><div class="shareContactRow" style="margin-top:8px"><select id="shareContactType2" class="shareInput">${contactTypeOptions(cs[1].type)}</select><input id="shareContactValue2" class="shareInput" maxlength="${SHARE_CONTACT_LIMITS[cs[1].type]||40}" placeholder="Контакт" value="${escapeHtml(cs[1].value||'')}"></div><div class="shareHint">Дополнительные контакты необязательны. Если выбрано «Не указать», строка на карточке не отображается.</div><label class="shareToggle shareRemember"><span><b>Сохранить как настройки по умолчанию</b><small>Сохраняются только постоянные данные, без текста акции и дат</small></span><input id="shareSaveDefaults" type="checkbox"></label></div>`;
};
readContactRows=function(){const out=[];for(let i=1;i<=2;i++){const type=document.getElementById('shareContactType'+i)?.value||'none';let value=(document.getElementById('shareContactValue'+i)?.value||'').trim();if(type!=='none'&&value)out.push({type,value:value.slice(0,SHARE_CONTACT_LIMITS[type]||40)})}return out};

bindStructuredContacts=function(root=document){for(let i=1;i<=2;i++){const s=root.querySelector('#shareContactType'+i),v=root.querySelector('#shareContactValue'+i);if(s&&v){const upd=()=>{const off=s.value==='none';v.disabled=off;v.style.display=off?'none':'';v.value=off?'':v.value;v.maxLength=SHARE_CONTACT_LIMITS[s.value]||40;v.placeholder=(s.value==='Email'?'name@example.com':s.value.includes('Адрес')?'Введите адрес':'Введите контакт')};s.addEventListener('change',upd);upd()}}};
const _bindShareInputs356=bindShareInputs;
bindShareInputs=function(root=document){
 _bindShareInputs356(root);bindStructuredContacts(root);
 const ph=root.querySelector('#shareSenderPhone');if(ph){ph.inputMode='numeric';ph.maxLength=11;ph.pattern='[0-9]*';ph.value=String(ph.value||'').replace(/\D/g,'').slice(0,11);ph.addEventListener('input',()=>{ph.value=ph.value.replace(/\D/g,'').slice(0,11)});ph.onblur=null}
 root.querySelectorAll('#sharePromo,.batchPromo').forEach(old=>{
   if(old.tagName==='TEXTAREA')return;
   const ta=document.createElement('textarea');ta.id=old.id;ta.className=old.className+' shareTextarea';ta.style.cssText=old.style.cssText;ta.maxLength=SHARE_PROMO_MAX;ta.placeholder=old.placeholder||'Или введите свой текст';ta.value='';ta.rows=3;old.replaceWith(ta);
   let c=ta.nextElementSibling;if(!c||!c.classList?.contains('shareCharCount')){c=document.createElement('div');c.className='shareCharCount';ta.insertAdjacentElement('afterend',c)}
   const upd=()=>c.textContent=`${ta.value.length} / ${SHARE_PROMO_MAX}`;ta.addEventListener('input',upd);upd();
 });
};

// Default settings keep stable personal data only; promotions/dates are always one-off.
persistShareDefaults=function(cfg){if(!cfg.saveDefaults)return;saveSharePrefs({priceMode:cfg.priceMode,showPV:cfg.showPV,senderStatus:cfg.senderStatus,senderName:cfg.senderName,senderPhone:normalizeRuPhone(cfg.senderPhone),senderContacts:cfg.senderContacts||[]})};

const _openProductShare356=openProductShare;
openProductShare=function(id){shareReturnProductId=id;return _openProductShare356(id)};
const _openShareConfig356=openShareConfig;
openShareConfig=function(id,withText){shareReturnProductId=id;_openShareConfig356(id,withText);const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(sheet){const promo=sheet.querySelector('#sharePromo');if(promo)promo.value='';const st=sheet.querySelector('#shareStart');if(st)st.value='';const en=sheet.querySelector('#shareEnd');if(en)en.value='';bindShareInputs(sheet)}};
const _openBatchPicker356=openBatchSharePicker;
openBatchSharePicker=function(seedId){shareReturnProductId=seedId;return _openBatchPicker356(seedId)};

function closeSharePreviewToMenu(){const id=shareReturnProductId;closeSharePreview();if(id)openProductShare(id)}
const _openSharePreview356=openSharePreview;
openSharePreview=function(files,text='',title='FUTURE HEALTH'){
 _openSharePreview356(files,text,title);
 const back=document.querySelector('#sharePreviewShade .sharePreviewHead button');if(back){back.setAttribute('onclick','closeSharePreviewToMenu()')}
};

/* ===== V35.7 — SHARE CENTER, AVATAR, QR, 4 BRAND TEMPLATES + AUTO ===== */
const SHARE_TEMPLATES=[
 {id:'classic',name:'Классический',hint:'Сбалансированный'},
 {id:'visual',name:'Визуальный',hint:'Крупный продукт'},
 {id:'info',name:'Информационный',hint:'Больше фактов'},
 {id:'minimal',name:'Минималистичный',hint:'Чистый деловой'},
 {id:'auto',name:'Авто',hint:'Чередовать шаблоны'}
];
let shareAvatarData='';
const _shareBasePrefs357=shareBasePrefs;
shareBasePrefs=function(){const p=_shareBasePrefs357();return {...p,template:p.template||'classic',showQR:p.showQR!==false,avatar:p.avatar||''}}
function shareTemplateHtml(sel='classic'){return `<div class="shareField"><label>Шаблон оформления</label><div class="shareTemplateGrid">${SHARE_TEMPLATES.map(t=>`<button type="button" class="shareTemplateBtn ${sel===t.id?'active':''}" data-template="${t.id}" onclick="selectShareTemplate('${t.id}')"><div class="shareTemplateThumb"></div><b>${t.name}</b><small>${t.hint}</small></button>`).join('')}</div><div class="shareHint">Логотип, фирменные цвета и типографика FUTURE HEALTH остаются едиными во всех шаблонах.</div></div>`}
function selectShareTemplate(id){document.querySelectorAll('.shareTemplateBtn').forEach(b=>b.classList.toggle('active',b.dataset.template===id));const el=document.getElementById('shareTemplate');if(el)el.value=id}
function shareVisualFieldsHtml(pref){shareAvatarData=pref.avatar||'';return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}"><div class="shareField"><label>Фото отправителя <span style="font-weight:500;color:#8aa0b2">(необязательно)</span></label><div class="shareAvatarRow"><button type="button" id="shareAvatarPreview" class="shareAvatarPreview fhAvatarButton" onclick="openAvatarEditor()">Без фото</button><div><input id="shareAvatarInput" type="file" accept="image/*" class="shareInput"><button type="button" class="secondary" style="margin-top:7px;padding:8px 10px;border-radius:10px;background:#eef5fa" onclick="clearShareAvatar()">Удалить фото</button></div></div></div><div class="shareField"><label class="shareToggle"><span><b>QR-код продукта</b><small>Ведёт на страницу этого продукта</small></span><input id="shareQR" type="checkbox" ${pref.showQR!==false?'checked':''}></label></div>`}
function clearShareAvatar(){shareAvatarData='';const p=document.getElementById('shareAvatarPreview');if(p){p.innerHTML='Без фото'}const f=document.getElementById('shareAvatarInput');if(f)f.value=''}
function bindAvatar(root=document){const inp=root.querySelector('#shareAvatarInput'),prev=root.querySelector('#shareAvatarPreview');if(prev&&shareAvatarData){prev.innerHTML=`<img src="${shareAvatarData}" alt="">`;fhApplyAvatarPreview(root);}if(inp)inp.addEventListener('change',()=>{const f=inp.files?.[0];if(!f)return;if(f.size>4*1024*1024){showShareToast('Фото слишком большое','Выберите изображение до 4 МБ');inp.value='';return}const r=new FileReader();r.onload=()=>{shareAvatarData=String(r.result||'');if(prev)prev.innerHTML=`<img src="${shareAvatarData}" alt="">`};r.readAsDataURL(f)})}
function injectShareVisualSettings(sheet,pref){if(!sheet||sheet.querySelector('#shareTemplate'))return;const sender=sheet.querySelector('.shareSenderBlock');const wrap=document.createElement('div');wrap.innerHTML=shareVisualFieldsHtml(pref);while(wrap.firstChild)sheet.insertBefore(wrap.firstChild,sender||sheet.querySelector('.shareConfigActions'));bindAvatar(sheet)}
const _openShareConfig357=openShareConfig;
openShareConfig=function(id,withText){_openShareConfig357(id,withText);const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');injectShareVisualSettings(sheet,shareBasePrefs())}
const _openBatchConfig357=openBatchConfig;
openBatchConfig=function(){_openBatchConfig357();const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');injectShareVisualSettings(sheet,shareBasePrefs())}
const _readShareConfig357=readShareConfig;
readShareConfig=function(){const c=_readShareConfig357();if(!c)return c;c.template=document.getElementById('shareTemplate')?.value||'classic';c.showQR=!!document.getElementById('shareQR')?.checked;c.avatar=shareAvatarData||'';return c}
const _readBatchConfigs357=readBatchConfigs;
readBatchConfigs=function(){const a=_readBatchConfigs357();const t=document.getElementById('shareTemplate')?.value||'classic',q=!!document.getElementById('shareQR')?.checked,av=shareAvatarData||'';return a.map((c,i)=>({...c,template:t==='auto'?['classic','visual','info','minimal'][i%4]:t,showQR:q,avatar:av}))}
const _persistShareDefaults357=persistShareDefaults;
persistShareDefaults=function(cfg){_persistShareDefaults357(cfg);if(!cfg?.saveDefaults)return;const p=loadSharePrefs();saveSharePrefs({...p,template:cfg.template||'classic',showQR:cfg.showQR!==false,avatar:cfg.avatar||''})}

function openShareCenter(){document.body.classList.remove('reading');document.getElementById('app').innerHTML=`<section class="shareCenterHero"><small style="color:#1268ad;font-weight:800;letter-spacing:.1em">FUTURE HEALTH</small><h1>Центр публикаций</h1><p>Создавайте фирменные карточки продуктов и отправляйте до пяти продуктов за один раз.</p></section><section class="shareCenterActions"><button class="shareCenterCard" onclick="openShareCenterPicker(1)"><i>▧</i><span><b>Поделиться продуктами</b><small>Выберите от 1 до 5 продуктов, настройте оформление и просмотрите карточки перед отправкой.</small></span><em>›</em></button><button class="shareCenterCard" onclick="openShareProfileSettings()"><i>◉</i><span><b>Мои данные для публикаций</b><small>Имя, статус, телефон, дополнительные контакты и фото.</small></span><em>›</em></button></section>`;setActive('share');window.scrollTo(0,0)}
function openShareCenterPicker(){batchSelected=[];const d=document.createElement('div');d.id='batchShareShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchPicker"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Выберите 1–5 продуктов</b></div><button onclick="closeBatchPicker()">×</button></div><input id="batchSearch" class="shareInput" placeholder="Поиск продукта" oninput="renderBatchProducts(this.value)"><div class="batchCounter"><b id="batchCount">0</b> / 5</div><div id="batchProducts" class="batchProducts"></div><div class="shareConfigActions"><button class="secondary" onclick="closeBatchPicker()">Отмена</button><button class="primary" onclick="shareCenterContinue()">Продолжить</button></div></div>`;document.body.appendChild(d);renderBatchProducts('')}
function shareCenterContinue(){if(!batchSelected.length){showShareToast('Выберите продукт','Можно выбрать от 1 до 5 продуктов');return}openBatchConfig()}
function openShareProfileSettings(){const pref=shareBasePrefs();const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Мои данные</b></div><button onclick="closeShareConfig()">×</button></div>${senderFieldsHtml(pref)}${shareVisualFieldsHtml(pref)}<div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="saveShareProfileOnly()">Сохранить</button></div></div>`;document.body.appendChild(d);bindShareInputs(d);bindAvatar(d);const cb=d.querySelector('#shareSaveDefaults');if(cb){cb.checked=true;cb.closest('label').style.display='none'}}
function saveShareProfileOnly(){const cfg=readSenderFields({});cfg.template=document.getElementById('shareTemplate')?.value||'classic';cfg.showQR=!!document.getElementById('shareQR')?.checked;cfg.avatar=shareAvatarData||'';cfg.saveDefaults=true;persistShareDefaults(cfg);closeShareConfig();showShareToast('Настройки сохранены','Они будут использоваться при следующей публикации')}

function officialShareFeatures(p){const skip=/отзывы|примечание|способ|масса|страниц|оригиналь/i;let arr=(p.detail||[]).map(normalizeShareText).filter(t=>t.length>28&&!skip.test(t));const sum=officialShareSummary(p);arr=arr.filter(t=>!sum.includes(t)&&!t.includes(sum));const out=[];for(const t of arr){let q=t.replace(/[.!?]+$/,'');if(q.length>92)q=q.slice(0,89).replace(/\s+\S*$/,'')+'…';if(!out.some(x=>x.toLowerCase()===q.toLowerCase()))out.push(q);if(out.length===3)break}if(out.length<3){['Официальная информация FUTURE HEALTH','Удобный формат продукта','Подробнее — в мобильном каталоге'].forEach(s=>{if(out.length<3)out.push(s)})}return out}
function drawQrToCanvas(ctx,text,x,y,size){try{const qr=new QRCode(0,QRErrorCorrectLevel.M);qr.addData(text);qr.make();const n=qr.getModuleCount(),pad=4,cell=Math.floor(size/(n+pad*2)),real=cell*(n+pad*2);ctx.fillStyle='#fff';ctx.fillRect(x,y,real,real);ctx.fillStyle='#102f4f';for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(qr.isDark(r,c))ctx.fillRect(x+(c+pad)*cell,y+(r+pad)*cell,cell,cell);return real}catch(e){console.warn('QR',e);return 0}}
async function drawAvatarCircle(ctx,data,cx,cy,r){if(!data)return false;try{const im=await loadCanvasImage(data);ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();const sc=Math.max((2*r)/im.width,(2*r)/im.height),w=im.width*sc,h=im.height*sc;ctx.drawImage(im,cx-w/2,cy-h/2,w,h);ctx.restore();return true}catch{return false}}
function canvasTextBlock(ctx,text,x,y,w,font,color,lineH,maxLines){ctx.font=font;ctx.fillStyle=color;let lines=[];for(const para of String(text||'').split(/\n/)){lines.push(...wrapCanvasText(ctx,para,w));}lines=lines.slice(0,maxLines);lines.forEach((s,i)=>ctx.fillText(s,x,y+i*lineH));return y+lines.length*lineH}
async function drawFHLogo(ctx,W){try{const logo=await loadCanvasImage('assets/future-health-logo.png'),mw=175,mh=68,r=Math.min(mw/logo.width,mh/logo.height);ctx.drawImage(logo,W-70-logo.width*r,36,logo.width*r,logo.height*r)}catch{ctx.fillStyle='#1268ad';ctx.font='700 34px Arial';ctx.fillText('FUTURE HEALTH',W-330,75)}}
async function richShareCard(p,cfg){const W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d'),tpl=cfg.template==='auto'?'classic':(cfg.template||'classic');
 const palettes={classic:['#f5fbff','#e7f5ff','#1268ad','#102f4f'],visual:['#f7fbf4','#e5f2dd','#2d7652','#173e32'],info:['#f7fafc','#eaf1f6','#315f7f','#17364e'],minimal:['#f8fbfd','#edf4f8','#0e527e','#173957']};const P=palettes[tpl]||palettes.classic;x.fillStyle=P[0];x.fillRect(0,0,W,H);let g=x.createLinearGradient(0,0,W,700);g.addColorStop(0,P[1]);g.addColorStop(1,'#fff');x.fillStyle=g;x.fillRect(0,0,W,tpl==='visual'?780:650);
 x.fillStyle=P[2];x.font='700 38px Arial';x.fillText('FUTURE HEALTH',66,78);x.fillStyle='#6f8799';x.font='500 18px Arial';x.fillText('КАТАЛОГ ПРОДУКЦИИ',67,108);await drawFHLogo(x,W);
 const src=cleanImg(p)||p.img;const imgBox=tpl==='visual'?{x:70,y:145,w:940,h:650}:tpl==='info'?{x:585,y:170,w:420,h:500}:{x:105,y:145,w:870,h:570};if(src)try{const im=await loadCanvasImage(src),r=Math.min(imgBox.w/im.width,imgBox.h/im.height),w=im.width*r,h=im.height*r;x.drawImage(im,imgBox.x+(imgBox.w-w)/2,imgBox.y+(imgBox.h-h)/2,w,h)}catch{}
 let y=tpl==='visual'?840:tpl==='info'?185:760;const textX=tpl==='info'?70:70,textW=tpl==='info'?480:940;x.fillStyle=P[3];x.font='700 40px Arial';y=canvasTextBlock(x,p.name,textX,y,textW,'700 40px Arial',P[3],49,tpl==='info'?5:3)+12;x.font='400 29px Arial';y=canvasTextBlock(x,officialShareSummary(p),textX,y,textW,'400 29px Arial','#55758c',40,tpl==='info'?8:5)+18;
 const feats=officialShareFeatures(p);x.fillStyle=P[2];x.font='700 20px Arial';x.fillText('КЛЮЧЕВЫЕ ОСОБЕННОСТИ',textX,y);y+=34;for(const f of feats){x.fillStyle=P[2];x.beginPath();x.arc(textX+8,y-7,6,0,Math.PI*2);x.fill();y=canvasTextBlock(x,f,textX+28,y,textW-28,'500 25px Arial','#294d68',34,2)+8}
 if(tpl==='info')y=Math.max(y,735);const prices=sharePriceLines(p,cfg);if(prices.length||cfg.promo){const h=82+prices.length*34+(cfg.promo?68:0)+(offerPeriod(cfg)?30:0);x.fillStyle='#fff';roundRect(x,70,y,940,h,22);x.strokeStyle='#d8e8f3';x.lineWidth=2;x.stroke();let py=y+42;if(prices.length){x.fillStyle=P[2];x.font='700 28px Arial';for(const s of prices){x.fillText(s,96,py);py+=34}}if(cfg.promo){py=canvasTextBlock(x,cfg.promo,96,py+4,850,'700 23px Arial',P[2],30,2)}const per=offerPeriod(cfg);if(per){x.fillStyle='#70889b';x.font='500 18px Arial';x.fillText(per,96,py+20)}y+=h+16}
 const sender=senderLines(cfg),hasSender=sender.length||cfg.avatar;const qrOn=cfg.showQR!==false;const bottomY=1585;if(hasSender||qrOn){x.fillStyle='#fff';roundRect(x,70,bottomY,940,265,24);x.strokeStyle='#d8e8f3';x.lineWidth=2;x.stroke();let sx=96;if(cfg.avatar){const ok=await drawAvatarCircle(x,cfg.avatar,150,bottomY+112,62);if(ok)sx=235}if(sender.length){x.fillStyle='#70889b';x.font='700 16px Arial';x.fillText('КОНТАКТ',sx,bottomY+48);let sy=bottomY+82;sender.slice(0,5).forEach((s,i)=>{x.font=(i===0?'700 24px':'500 20px')+' Arial';x.fillStyle=i===0?P[3]:'#496a84';x.fillText(s,sx,sy);sy+=30})}if(qrOn){const qs=drawQrToCanvas(x,productDeepLink(p.id),810,bottomY+48,155);if(qs){x.fillStyle='#627d92';x.font='500 14px Arial';x.fillText('Подробнее',820,bottomY+222)}}}
 if(cfg.priceMode==='custom'||cfg.promo){x.fillStyle='#8296a6';x.font='400 15px Arial';x.fillText('Условия предложения устанавливаются продавцом.',70,1850)}x.fillStyle=P[2];x.fillRect(70,1888,940,3);return await new Promise(res=>c.toBlob(res,'image/png',.95))}
makeProductCard=richShareCard;

/* ===== V36.15 — SINGLE SOURCE PROFILE + BATCH DATA FIX ===== */
(function(){
  const oldShareBasePrefs=shareBasePrefs;
  shareBasePrefs=function(){const p=oldShareBasePrefs();return {...p,showAvatar:p.showAvatar!==false};};

  // Publication profile owns identity/avatar only. No template/color/QR here.
  openShareProfileSettings=function(){
    const pref=shareBasePrefs(); shareAvatarData=pref.avatar||''; window.shareAvatarCrop={...(pref.avatarCrop||{scale:1,x:0,y:0})};
    const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';
    d.innerHTML=`<div class="shareConfigSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Мои данные для публикаций</b></div><button onclick="closeShareConfig()">×</button></div>
      ${senderFieldsHtml(pref)}
      <div class="shareField"><label class="shareToggle"><span><b>Показывать фото</b><small>Фото отображается только если оно загружено</small></span><input id="shareShowAvatar" type="checkbox" ${pref.showAvatar!==false?'checked':''}></label>
        <div class="shareAvatarRow" style="margin-top:10px"><button type="button" id="shareAvatarPreview" class="shareAvatarPreview fhAvatarButton" onclick="openAvatarEditor()">Без фото</button><div><input id="shareAvatarInput" type="file" accept="image/*" class="shareInput"><button type="button" class="secondary" style="margin-top:7px;padding:8px 10px;border-radius:10px;background:#eef5fa" onclick="clearShareAvatar()">Удалить фото</button></div></div></div>
      <div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="saveShareProfileOnly()">Сохранить</button></div></div>`;
    document.body.appendChild(d);bindShareInputs(d);bindAvatar(d);const cb=d.querySelector('#shareSaveDefaults');if(cb)cb.closest('label').style.display='none';
  };
  saveShareProfileOnly=function(){
    const cfg=readSenderFields({});const raw=String(document.getElementById('shareSenderPhone')?.value||'').replace(/\D/g,'');
    if(raw && !(raw.length===11&&(raw[0]==='7'||raw[0]==='8'))){showShareToast('Проверьте телефон','Нужно ровно 11 цифр, первая — 7 или 8');return}
    const old=loadSharePrefs()||{};saveSharePrefs({...old,senderStatus:cfg.senderStatus,senderName:cfg.senderName,senderPhone:raw,senderContacts:cfg.senderContacts||readContactRows(),avatar:shareAvatarData||'',avatarCrop:{...fhAvatarCropNorm(window.shareAvatarCrop)},showAvatar:!!document.getElementById('shareShowAvatar')?.checked});
    closeShareConfig();showShareToast('Данные сохранены','Они автоматически используются в одиночной и пакетной публикации');
  };

  // Visual controls contain visual choices only — no duplicate profile fields.
  shareVisualFieldsHtml=function(pref){return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}"><div class="shareField"><label class="shareToggle"><span><b>QR-код продукта</b><small>При своей цене QR отключается автоматически</small></span><input id="shareQR" type="checkbox" ${pref.showQR!==false?'checked':''}></label></div>`};

  // Strict phone: digits only, exactly 11, starts with 7/8. Do not format with symbols.
  const oldBind=bindShareInputs;
  bindShareInputs=function(root=document){oldBind(root);const ph=root.querySelector('#shareSenderPhone');if(ph){ph.type='tel';ph.inputMode='numeric';ph.pattern='[78][0-9]{10}';ph.maxLength=11;ph.placeholder='7XXXXXXXXXX или 8XXXXXXXXXX';ph.value=String(ph.value||'').replace(/\D/g,'').slice(0,11);ph.onblur=null;ph.addEventListener('input',()=>{let v=ph.value.replace(/\D/g,'').slice(0,11);if(v && v[0]!=='7'&&v[0]!=='8')v='';ph.value=v})}};

  // Merge saved identity into every single card; publication settings never override it with blanks.
  const oldReadSingle=readShareConfig;
  readShareConfig=function(){const c=oldReadSingle();if(!c)return c;const p=loadSharePrefs()||{};return {...c,senderStatus:p.senderStatus||'none',senderName:p.senderName||'',senderPhone:p.senderPhone||'',senderContacts:p.senderContacts||[],avatar:p.showAvatar===false?'':(p.avatar||''),showAvatar:p.showAvatar!==false,showQR:c.priceMode==='custom'?false:c.showQR};};

  function promoOptions(){return `<option value="">Без акции</option><option value="buy2get1">Купи 2 — получи 1 в подарок</option><option value="buy3get1">Купи 3 — получи 1 в подарок</option><option value="buy4get1">Купи 4 — получи 1 в подарок</option><option value="discount">Скидка на продукт</option><option value="special">Специальное предложение</option><option value="custom">Другое / свой текст</option>`}
  window.fhBatchPromoChanged=function(sel){const r=sel.closest('.batchCfgRow'),inp=r.querySelector('.batchPromoCustom');inp.classList.toggle('hidden',sel.value!=='custom');};
  window.fhBatchPriceChanged=function(sel){const r=sel.closest('.batchCfgRow');r.querySelector('.batchPrice').classList.toggle('hidden',sel.value!=='custom');};
  function batchPromoText(r){const v=r.querySelector('.batchPromoPreset')?.value||'';if(v==='custom')return (r.querySelector('.batchPromoCustom')?.value||'').trim();return ({buy2get1:'Купи 2 — получи 1 в подарок',buy3get1:'Купи 3 — получи 1 в подарок',buy4get1:'Купи 4 — получи 1 в подарок',discount:'Скидка на продукт',special:'Специальное предложение'})[v]||'';}

  // Batch page: only per-product commercial data + shared visual design. Personal data comes from profile.
  openBatchConfig=function(){
    if(!batchSelected.length)return;closeBatchPicker();const pref=shareBasePrefs(),ps=batchSelected.map(id=>products.find(p=>p.id===id)).filter(Boolean);
    const rows=ps.map(p=>`<div class="batchCfgRow shareField" data-id="${p.id}"><div class="batchCfgHead">${p.img?`<img src="${p.img}" alt="">`:''}<b>${p.name}</b></div>
      <label>Цена</label><div class="batchMiniGrid"><select class="shareInput batchMode" onchange="fhBatchPriceChanged(this)"><option value="none">Без цены</option><option value="member">Для участников</option><option value="custom">Своя цена</option></select><input class="shareInput batchPrice hidden" inputmode="decimal" placeholder="Цена, ₽"><label class="batchPv"><input class="batchPV" type="checkbox"> PV</label></div>
      <label style="margin-top:10px">Акция</label><select class="shareInput batchPromoPreset" onchange="fhBatchPromoChanged(this)">${promoOptions()}</select><input class="shareInput batchPromoCustom hidden" style="margin-top:8px" maxlength="100" placeholder="Введите свой текст акции">
      <label style="margin-top:10px">Период акции</label><div class="shareInline"><input class="shareInput batchStart" type="date"><input class="shareInput batchEnd" type="date"></div></div>`).join('');
    const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchConfig"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Пакет из ${ps.length} карточек</b></div><button onclick="closeShareConfig()">×</button></div><div class="shareHint batchHint">Цена, акция и период задаются отдельно для каждого продукта. Личные данные берутся из «Мои данные для публикаций».</div>${rows}${shareVisualFieldsHtml(pref)}<div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="previewBatchShare()">Предпросмотр</button></div></div>`;document.body.appendChild(d);bindShareInputs(d);
  };

  readBatchConfigs=function(){
    const p=loadSharePrefs()||{};const t=document.getElementById('shareTemplate')?.value||'classic';const q=!!document.getElementById('shareQR')?.checked;
    return [...document.querySelectorAll('.batchCfgRow[data-id]')].map((r,i)=>{const priceMode=r.querySelector('.batchMode')?.value||'none';return {id:r.dataset.id,priceMode,customPrice:(r.querySelector('.batchPrice')?.value||'').trim(),showPV:!!r.querySelector('.batchPV')?.checked,promo:batchPromoText(r),start:r.querySelector('.batchStart')?.value||'',end:r.querySelector('.batchEnd')?.value||'',senderStatus:p.senderStatus||'none',senderName:p.senderName||'',senderPhone:p.senderPhone||'',senderContacts:p.senderContacts||[],avatar:p.showAvatar===false?'':(p.avatar||''),showAvatar:p.showAvatar!==false,template:t==='auto'?['classic','visual','info','minimal'][i%4]:t,showQR:priceMode==='custom'?false:q};});
  };

  offerPeriod=function(cfg){if(cfg.start&&cfg.end)return `Действует с ${formatDateRu(cfg.start)} по ${formatDateRu(cfg.end)}`;if(cfg.end)return `Действует до ${formatDateRu(cfg.end)}`;if(cfg.start)return `Действует с ${formatDateRu(cfg.start)}`;return ''};
})();
/* FUTURE HEALTH production module */
(()=>{'use strict';
window.shareAvatarCrop=window.shareAvatarCrop||{scale:1,x:0,y:0};
// iPhone-safe avatar loader: downsample before keeping in memory/localStorage. Never keep the original multi-megabyte DataURL.
async function fhDownsampleAvatar(file){
  if(!file||!file.type.startsWith('image/')) throw new Error('type');
  if(file.size>12*1024*1024) throw new Error('size');
  const url=URL.createObjectURL(file);
  try{
    const im=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
    const max=900, r=Math.min(1,max/Math.max(im.naturalWidth||im.width,im.naturalHeight||im.height));
    const w=Math.max(1,Math.round((im.naturalWidth||im.width)*r)),h=Math.max(1,Math.round((im.naturalHeight||im.height)*r));
    const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{alpha:false});x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);return c.toDataURL('image/jpeg',.82);
  } finally {URL.revokeObjectURL(url)}
}
window.shareVisualFieldsHtml=function(pref){shareAvatarData=pref.avatar||'';window.shareAvatarCrop=pref.avatarCrop||{scale:1,x:0,y:0};return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}"><div class="shareField"><label>Фото отправителя <span class="fhOptional">(необязательно)</span></label><div class="shareAvatarRow"><button type="button" id="shareAvatarPreview" class="shareAvatarPreview fhAvatarButton" onclick="openAvatarEditor()">${shareAvatarData?`<img src="${shareAvatarData}" alt="">`:'Без фото'}</button><div class="fhAvatarControls"><label class="fhUploadBtn">Выбрать фото<input id="shareAvatarInput" type="file" accept="image/*"></label><button type="button" class="secondary" onclick="openAvatarEditor()">Настроить</button><button type="button" class="secondary" onclick="clearShareAvatar()">Удалить</button></div></div><div class="shareHint">После выбора фото оно автоматически оптимизируется для iPhone. Затем можно изменить масштаб и положение.</div></div><div class="shareField"><label class="shareToggle"><span><b>QR-код продукта</b><small>Ведёт на страницу выбранного продукта</small></span><input id="shareQR" type="checkbox" ${pref.showQR!==false?'checked':''}></label></div>`};
window.fhAvatarCropNorm=function(c=window.shareAvatarCrop||{}){return {scale:Math.max(1,Number(c.scale)||1),nx:Number.isFinite(Number(c.nx))?Number(c.nx):(Number(c.x)||0)/230,ny:Number.isFinite(Number(c.ny))?Number(c.ny):(Number(c.y)||0)/230}};
window.fhAvatarCss=function(size,c=window.shareAvatarCrop||{}){const n=fhAvatarCropNorm(c);return `translate3d(${n.nx*size}px,${n.ny*size}px,0) scale(${n.scale})`};
window.fhApplyAvatarPreview=function(root=document){const img=root.querySelector?.('#shareAvatarPreview img')||document.querySelector('#shareAvatarPreview img');if(!img)return;img.style.transformOrigin='center';img.style.transform=fhAvatarCss(70)};
window.clearShareAvatar=function(){shareAvatarData='';window.shareAvatarCrop={scale:1,nx:0,ny:0};const p=document.getElementById('shareAvatarPreview');if(p)p.innerHTML='Без фото';const f=document.getElementById('shareAvatarInput');if(f)f.value=''};
window.bindAvatar=function(root=document){const inp=root.querySelector('#shareAvatarInput'),prev=root.querySelector('#shareAvatarPreview');if(prev&&shareAvatarData){prev.innerHTML=`<img src="${shareAvatarData}" alt="">`;fhApplyAvatarPreview(root);}if(!inp||inp.dataset.v38)return;inp.dataset.v38='1';inp.addEventListener('change',async()=>{const f=inp.files?.[0];if(!f)return;inp.disabled=true;try{showShareToast('Обработка фото','Подготавливаем изображение…');shareAvatarData=await fhDownsampleAvatar(f);window.shareAvatarCrop={scale:1,nx:0,ny:0};if(prev){prev.innerHTML=`<img src="${shareAvatarData}" alt="">`;fhApplyAvatarPreview(root);}setTimeout(()=>openAvatarEditor(),80)}catch(e){showShareToast('Не удалось открыть фото',e?.message==='size'?'Выберите фото до 12 МБ':'Попробуйте другое изображение');inp.value=''}finally{inp.disabled=false}})};
window.openAvatarEditor=function(){if(!shareAvatarData){document.getElementById('shareAvatarInput')?.click();return}document.getElementById('fhAvatarEditor')?.remove();const n=fhAvatarCropNorm(),st={scale:n.scale,nx:n.nx,ny:n.ny};const SIZE=230;const d=document.createElement('div');d.id='fhAvatarEditor';d.innerHTML=`<div class="fhAvatarEditorCard"><div class="fhAvatarEditorHead"><b>Настройка фото</b><button type="button">×</button></div><div class="fhCropStage"><div class="fhCropCircle"><img src="${shareAvatarData}" alt=""></div></div><label class="fhZoomLabel">Масштаб <input type="range" min="1" max="3" step="0.02" value="${st.scale}"></label><div class="fhAvatarEditorActions"><button type="button" data-a="reset">По центру</button><button type="button" class="primary" data-a="ok">Готово</button></div></div>`;document.body.appendChild(d);const img=d.querySelector('img'),stage=d.querySelector('.fhCropStage'),range=d.querySelector('input[type=range]');let drag=null;const apply=()=>img.style.transform=`translate3d(${st.nx*SIZE}px,${st.ny*SIZE}px,0) scale(${st.scale})`;apply();range.oninput=()=>{st.scale=+range.value;apply()};stage.onpointerdown=e=>{drag={x:e.clientX,y:e.clientY,onx:st.nx,ony:st.ny};stage.setPointerCapture?.(e.pointerId)};stage.onpointermove=e=>{if(!drag)return;st.nx=drag.onx+(e.clientX-drag.x)/SIZE;st.ny=drag.ony+(e.clientY-drag.y)/SIZE;apply()};stage.onpointerup=stage.onpointercancel=()=>drag=null;d.querySelector('.fhAvatarEditorHead button').onclick=()=>d.remove();d.querySelector('[data-a=reset]').onclick=()=>{st.scale=1;st.nx=st.ny=0;range.value=1;apply()};d.querySelector('[data-a=ok]').onclick=()=>{window.shareAvatarCrop={scale:st.scale,nx:st.nx,ny:st.ny};fhApplyAvatarPreview(document);d.remove()}};
// Quick promotion presets. Each product keeps its own promotion and dates.
const PROMOS=[['none','Без акции'],['buygift','Купить N — получить M в подарок'],['discount','Скидка'],['gift','Подарок к покупке'],['special','Специальная цена'],['custom','Другое / свой текст']];
function promoOptions(){return PROMOS.map(([v,n])=>`<option value="${v}">${n}</option>`).join('')}
function promoUI(){return `<div class="fhPromoQuick"><select class="shareInput fhPromoType">${promoOptions()}</select><div class="fhPromoParams"></div><div class="fhDates"><input class="shareInput fhStart" type="date" aria-label="Начало"><input class="shareInput fhEnd" type="date" aria-label="Окончание"></div></div>`}
function bindPromoRow(row){const sel=row.querySelector('.fhPromoType'),box=row.querySelector('.fhPromoParams');if(!sel||sel.dataset.bound)return;sel.dataset.bound='1';const render=()=>{const v=sel.value;if(v==='buygift')box.innerHTML='<div class="fhNums"><label>Купить <select class="shareInput fhBuy">'+[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')+'</select></label><label>Подарок <select class="shareInput fhGift">'+[1,2,3].map(n=>`<option>${n}</option>`).join('')+'</select></label></div>';else if(v==='discount')box.innerHTML='<label class="fhOne">Скидка <select class="shareInput fhDiscount">'+[5,10,15,20,25,30,40,50].map(n=>`<option value="${n}">${n}%</option>`).join('')+'</select></label>';else if(v==='custom')box.innerHTML='<textarea class="shareInput shareTextarea fhCustom" maxlength="100" rows="2" placeholder="Введите условия акции"></textarea>';else box.innerHTML=''};sel.onchange=render;render()}
function promoText(row){const v=row.querySelector('.fhPromoType')?.value||'none';if(v==='buygift')return `Купи ${row.querySelector('.fhBuy')?.value||1} — получи ${row.querySelector('.fhGift')?.value||1} в подарок`;if(v==='discount')return `Скидка ${row.querySelector('.fhDiscount')?.value||10}%`;if(v==='gift')return 'Подарок к покупке';if(v==='special')return 'Специальная цена';if(v==='custom')return row.querySelector('.fhCustom')?.value.trim()||'';return ''}
const oldOpenBatch=window.openBatchConfig;window.openBatchConfig=function(){oldOpenBatch();const sheet=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sheet)return;sheet.querySelector('.batchHint')?.replaceChildren(document.createTextNode('Цена, акция и срок действия настраиваются отдельно для каждого продукта. Постоянные контакты применяются ко всем карточкам.'));sheet.querySelectorAll('.batchCfgRow').forEach(r=>{r.querySelector('.batchPromo')?.remove();r.insertAdjacentHTML('beforeend',promoUI());bindPromoRow(r)});const common=[...sheet.querySelectorAll('.shareField')].find(x=>x.textContent.includes('Общий срок действия'));common?.remove();bindAvatar(sheet)};
const oldReadBatch=window.readBatchConfigs;window.readBatchConfigs=function(){const a=oldReadBatch();const rows=[...document.querySelectorAll('.batchCfgRow')];return a.map((c,i)=>({...c,promo:promoText(rows[i]),start:rows[i]?.querySelector('.fhStart')?.value||'',end:rows[i]?.querySelector('.fhEnd')?.value||'',avatarCrop:{...window.shareAvatarCrop}}))};
// Add the same quick promotion selector to single-product settings without forcing typing.
const oldOpenShare=window.openShareConfig;window.openShareConfig=function(id,withText){oldOpenShare(id,withText);const sh=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sh)return;const old=sh.querySelector('#sharePromo');if(old){const host=old.closest('.shareField')||old.parentElement;old.style.display='none';host.insertAdjacentHTML('beforeend',promoUI());const q=host.querySelector('.fhPromoQuick');bindPromoRow(q);const dates=q.querySelector('.fhDates');dates.style.display='none'}bindAvatar(sh)};
const oldReadShare=window.readShareConfig;window.readShareConfig=function(){const c=oldReadShare();const q=document.querySelector('#shareConfigShade .fhPromoQuick');if(c&&q)c.promo=promoText(q);if(c)c.avatarCrop={...window.shareAvatarCrop};return c};
// Keep one observer, but only for styling/binding; no recursive DOM changes.
const obs=new MutationObserver(()=>{const sh=document.querySelector('#shareConfigShade .shareConfigSheet');if(sh&&!sh.dataset.v3610){sh.dataset.v3610='1';sh.classList.add('fhV3610Sheet');bindAvatar(sh)}});obs.observe(document.body,{childList:true,subtree:false});
})();
/* FUTURE HEALTH production module */
(()=>{'use strict';
const COLOR_NAMES={auto:'Авто',blue:'Синий',green:'Зелёный',turquoise:'Бирюзовый',violet:'Лиловый',warm:'Тёплый'};
window.colorHtml=function colorHtml(){const saved=localStorage.getItem('fh_share_color')||'auto';return `<div class="shareField fhColorBlock"><label>Цвет оформления</label><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">${Object.entries(COLOR_NAMES).map(([k,n])=>`<button type="button" class="fhColor ${saved===k?'active':''}" data-c="${k}" onclick="fhSetColor('${k}',this)">${n}</button>`).join('')}</div><input type="hidden" id="shareColor" value="${saved}"></div>`}
window.fhSetColor=(c,b)=>{document.getElementById('shareColor').value=c;localStorage.setItem('fh_share_color',c);b.closest('.fhColorBlock').querySelectorAll('.fhColor').forEach(x=>x.classList.toggle('active',x===b))};
window.seriesHtml=function seriesHtml(n){if(n<2)return '';const saved=sessionStorage.getItem('fh_series_mode')||'same_same';return `<div class="shareField fhSeriesBlock"><label>Стиль серии</label><div class="fhSeriesModes">${[['same_same','Единый стиль','Один шаблон · один цвет'],['same_diff','Один шаблон','Разные цвета'],['diff_same','Разные шаблоны','Один цвет'],['diff_diff','Разные шаблоны','Разные цвета']].map(([v,a,b])=>`<button type="button" class="fhSeriesMode ${saved===v?'active':''}" data-m="${v}" onclick="fhSetSeries('${v}',this)"><b>${a}</b>${b}</button>`).join('')}</div><input type="hidden" id="fhSeriesMode" value="${saved}"></div>`}
window.fhSetSeries=(m,b)=>{document.getElementById('fhSeriesMode').value=m;sessionStorage.setItem('fh_series_mode',m);b.closest('.fhSeriesBlock').querySelectorAll('.fhSeriesMode').forEach(x=>x.classList.toggle('active',x===b))};
window.qrHtml=function qrHtml(pref=true){return `<div class="shareField fhQrBlock"><label class="shareToggle"><span><b>QR-код продукта ведет на страницу выбранного продукта</b><small id="fhQrHint">При выборе «Своя цена» QR отключается автоматически</small></span><input id="shareQR" type="checkbox" ${pref?'checked':''}></label></div>`}
function visualHtml(pref,n,withSeries=true){return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}">${colorHtml()}${withSeries?seriesHtml(n):''}${qrHtml(pref.showQR!==false)}`}
function promoOptions(){return `<option value="none">Без акции</option><option value="buygift">Купить N — получить M в подарок</option><option value="discount">Скидка</option><option value="gift">Подарок к покупке</option><option value="special">Специальная цена</option><option value="custom">Другое / свой текст</option>`}
window.promoControls=function promoControls(){return `<label style="margin-top:10px">Акция</label><select class="shareInput batchPromoPreset" onchange="fh16PromoChanged(this)">${promoOptions()}</select><div class="fh16PromoParams"></div><label style="margin-top:10px">Период акции</label><div class="shareInline"><input class="shareInput batchStart" type="date"><input class="shareInput batchEnd" type="date"></div>`}
window.fh16PromoChanged=sel=>{const box=sel.parentElement.querySelector('.fh16PromoParams'),v=sel.value;if(v==='buygift')box.innerHTML=`<div class="fhNums"><label>Купить <select class="shareInput fhBuy">${[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')}</select></label><label>Подарок <select class="shareInput fhGift">${[1,2,3].map(n=>`<option>${n}</option>`).join('')}</select></label></div>`;else if(v==='discount')box.innerHTML=`<label class="fhOne">Скидка <select class="shareInput fhDiscount">${[5,10,15,20,25,30,40,50].map(n=>`<option>${n}%</option>`).join('')}</select></label>`;else if(v==='custom')box.innerHTML='<textarea class="shareInput shareTextarea fhCustom" maxlength="100" rows="2" placeholder="Введите условия акции"></textarea>';else box.innerHTML=''};
function promoText(r){const v=r.querySelector('.batchPromoPreset')?.value||'none';if(v==='buygift')return `Купи ${r.querySelector('.fhBuy')?.value||1} — получи ${r.querySelector('.fhGift')?.value||1} в подарок`;if(v==='discount')return `Скидка ${r.querySelector('.fhDiscount')?.value||10}%`;if(v==='gift')return 'Подарок к покупке';if(v==='special')return 'Специальная цена';if(v==='custom')return r.querySelector('.fhCustom')?.value.trim()||'';return ''}
window.priceControls=function priceControls(){return `<label>Цена, PV</label><div class="batchMiniGrid"><select class="shareInput batchMode" onchange="fh16PriceChanged(this)"><option value="none">Без цены</option><option value="member">Для участников</option><option value="custom">Своя цена</option></select><input class="shareInput batchPrice hidden" inputmode="decimal" placeholder="Цена, ₽"><label class="batchPv"><input class="batchPV" type="checkbox"> PV</label></div>`}
window.fh16PriceChanged=sel=>{const r=sel.closest('.batchCfgRow')||sel.closest('.fhSingleCommercial');r?.querySelector('.batchPrice')?.classList.toggle('hidden',sel.value!=='custom');fh16SyncQr()};
window.fh16SyncQr=()=>{const q=document.getElementById('shareQR');if(!q)return;const custom=[...document.querySelectorAll('.batchMode')].some(s=>s.value==='custom');q.disabled=custom;if(custom)q.checked=false;const h=document.getElementById('fhQrHint');if(h)h.textContent=custom?'Недоступно: хотя бы для одного продукта выбрана «Своя цена»':'При выборе «Своя цена» QR отключается автоматически'};
window.rowHtml=function rowHtml(p){return `<div class="batchCfgRow shareField" data-id="${p.id}"><div class="batchCfgHead">${p.img?`<img src="${p.img}" alt="">`:''}<b>${p.name}</b></div>${priceControls()}${promoControls()}</div>`}

// Publication center order: profile first, products second.
window.openShareCenter=function(){closeSearch();toggleMenu(false);closeSeriesDrawer();document.body.classList.remove('reading');document.getElementById('app').innerHTML=`<section class="shareCenterHero"><small style="color:#1268ad;font-weight:800;letter-spacing:.1em">FUTURE HEALTH</small><h1>Центр публикаций</h1><p>Создавайте фирменные карточки продуктов и отправляйте до пяти продуктов за один раз.</p></section><section class="shareCenterActions"><button class="shareCenterCard" onclick="openShareProfileSettings()"><i>◉</i><span><b>Мои данные для публикаций</b><small>Имя, статус, телефон, дополнительные контакты и фото.</small></span><em>›</em></button><button class="shareCenterCard" onclick="openShareCenterPicker(1)"><i>▧</i><span><b>Поделиться продуктами</b><small>Выберите от 1 до 5 продуктов, настройте оформление и просмотрите карточки перед отправкой.</small></span><em>›</em></button></section>`;setActive('share');window.scrollTo(0,0)};

// Profile owns contacts + avatar only. Hidden markers prevent automatic color/QR injectors from adding duplicate controls.
const oldProfile=window.openShareProfileSettings;window.openShareProfileSettings=function(){oldProfile();const sh=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sh)return;sh.insertAdjacentHTML('beforeend','<input type="hidden" id="shareColor" value="profile"><input type="hidden" id="shareQR">');sh.querySelectorAll('.fhColorBlock,.fhSeriesBlock,.fhQrBlock').forEach(e=>e.remove())};

// Batch settings: exact order requested, no avatar/contact controls, one promo + one period per product.
window.openBatchConfig=function(){if(!batchSelected.length)return;closeBatchPicker();const pref=shareBasePrefs(),ps=batchSelected.map(id=>products.find(p=>p.id===id)).filter(Boolean);const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchConfig"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Поделиться продуктами</b></div><button onclick="closeShareConfig()">×</button></div>${visualHtml(pref,ps.length,true)}<div class="shareHint batchHint">Цена, акция и период задаются отдельно для каждого продукта. Личные данные берутся из «Мои данные для публикаций».</div>${ps.map(rowHtml).join('')}<div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="previewBatchShare()">Предпросмотр</button></div></div>`;document.body.appendChild(d);bindShareInputs(d);fh16SyncQr()};
window.readBatchConfigs=function(){const p=loadSharePrefs()||{},t=document.getElementById('shareTemplate')?.value||'classic',q=!!document.getElementById('shareQR')?.checked,m=document.getElementById('fhSeriesMode')?.value||'same_same';return [...document.querySelectorAll('.batchCfgRow[data-id]')].map((r,i)=>{const pm=r.querySelector('.batchMode')?.value||'none';return {id:r.dataset.id,priceMode:pm,customPrice:(r.querySelector('.batchPrice')?.value||'').trim(),showPV:!!r.querySelector('.batchPV')?.checked,promo:promoText(r),start:r.querySelector('.batchStart')?.value||'',end:r.querySelector('.batchEnd')?.value||'',senderStatus:p.senderStatus||'none',senderName:p.senderName||'',senderPhone:p.senderPhone||'',senderContacts:p.senderContacts||[],avatar:p.showAvatar===false?'':(p.avatar||''),avatarCrop:p.avatarCrop||window.shareAvatarCrop||{scale:1,x:0,y:0},showAvatar:p.showAvatar!==false,template:(m==='diff_same'||m==='diff_diff')?['classic','visual','info','minimal'][i%4]:(t==='auto'?['classic','visual','info','minimal'][i%4]:t),showQR:pm==='custom'?false:q};})};

// Product share menu: Card + Link only. Remove “Изображение + текст” and “Несколько продуктов”.
window.openProductShare=function(id){const p=products.find(x=>x.id===id);if(!p)return;shareReturnProductId=id;document.getElementById('productShareShade')?.remove();const sh=document.createElement('div');sh.id='productShareShade';sh.className='shareConfigShade';sh.innerHTML=`<div class="productShareSheet" role="dialog" aria-modal="true"><div class="shareGrab"></div><div class="shareTitle"><div><small>FUTURE HEALTH</small><b>Поделиться продуктом</b></div><button onclick="closeProductShare()">×</button></div><div class="shareProductMini">${p.img?`<img src="${p.img}" alt="">`:''}<span>${p.name}</span></div><button class="shareChoice" onclick="openShareProfileSettings()"><i>◉</i><span><b>Мои данные для публикаций</b><small>Единые данные: изменения синхронизируются с Центром публикаций</small></span><em>›</em></button><button class="shareChoice" onclick="openShareConfig('${p.id}',false)"><i>▧</i><span><b>Карточка продукта</b><small>Единые настройки с пакетной публикацией</small></span><em>›</em></button><button class="shareChoice" onclick="shareProductLink('${p.id}')"><i>↗</i><span><b>Ссылка на продукт</b><small>Откроется сразу эта страница продукта</small></span><em>›</em></button><div class="shareLinkPreview">${productDeepLink(p.id)}</div></div>`;document.body.appendChild(sh)};

// Single card settings = batch commercial/visual settings, minus series style.
window.openShareConfig=function(id){const p=products.find(x=>x.id===id);if(!p)return;shareDraft={id,withText:false};closeProductShare();const pref=shareBasePrefs(),d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Карточка продукта</b></div><button onclick="closeShareConfig()">×</button></div>${visualHtml(pref,1,false)}<div class="fhSingleCommercial batchCfgRow shareField" data-id="${p.id}">${priceControls()}${promoControls()}</div><div class="shareHint" style="margin:12px 4px 4px">Контакты отправителя и Фото отправителя настраиваются в разделе «Мои данные для публикаций» на странице пакетной публикации.</div><div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="previewConfiguredShare()">Предпросмотр</button></div></div>`;document.body.appendChild(d);bindShareInputs(d);fh16SyncQr()};
window.readShareConfig=function(){const r=document.querySelector('.fhSingleCommercial'),p=loadSharePrefs()||{},pm=r?.querySelector('.batchMode')?.value||'none';return {id:shareDraft?.id,withText:false,priceMode:pm,customPrice:(r?.querySelector('.batchPrice')?.value||'').trim(),showPV:!!r?.querySelector('.batchPV')?.checked,promo:promoText(r),start:r?.querySelector('.batchStart')?.value||'',end:r?.querySelector('.batchEnd')?.value||'',senderStatus:p.senderStatus||'none',senderName:p.senderName||'',senderPhone:p.senderPhone||'',senderContacts:p.senderContacts||[],avatar:p.showAvatar===false?'':(p.avatar||''),avatarCrop:p.avatarCrop||window.shareAvatarCrop||{scale:1,x:0,y:0},showAvatar:p.showAvatar!==false,template:document.getElementById('shareTemplate')?.value||'classic',showQR:pm==='custom'?false:!!document.getElementById('shareQR')?.checked,saveDefaults:false}};
})();
/* FUTURE HEALTH production module */
(()=>{'use strict';
function searchBox(){return `<div class="fh17SearchWrap"><input id="batchSearch" class="shareInput" placeholder="Поиск продукта" oninput="fh17SearchInput(this)" autocomplete="off"><button id="fh17ClearSearch" type="button" class="fh17ClearSearch" onclick="fh17ClearBatchSearch()" aria-label="Очистить поиск">×</button></div>`}
window.fh17SearchInput=i=>{renderBatchProducts(i.value);document.getElementById('fh17ClearSearch')?.classList.toggle('show',!!i.value)};
window.fh17ClearBatchSearch=()=>{const i=document.getElementById('batchSearch');if(!i)return;i.value='';renderBatchProducts('');document.getElementById('fh17ClearSearch')?.classList.remove('show');i.focus()};

// Both entry points use the same picker with a fast clear-search control.
window.openShareCenterPicker=function(){batchSelected=[];const d=document.createElement('div');d.id='batchShareShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchPicker"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Выберите 1–5 продуктов</b></div><button onclick="closeBatchPicker()">×</button></div>${searchBox()}<div class="batchCounter"><b id="batchCount">0</b> / 5</div><div id="batchProducts" class="batchProducts"></div><div class="shareConfigActions"><button class="secondary" onclick="closeBatchPicker()">Отмена</button><button class="primary" onclick="shareCenterContinue()">Продолжить</button></div></div>`;d.addEventListener('click',e=>{if(e.target===d)closeBatchPicker()});document.body.appendChild(d);renderBatchProducts('')};
window.openBatchSharePicker=function(seedId){closeProductShare();batchSelected=seedId?[seedId]:[];const d=document.createElement('div');d.id='batchShareShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchPicker"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Выберите до 5 продуктов</b></div><button onclick="closeBatchPicker()">×</button></div>${searchBox()}<div class="batchCounter"><b id="batchCount">${batchSelected.length}</b> / 5</div><div id="batchProducts" class="batchProducts"></div><div class="shareConfigActions"><button class="secondary" onclick="closeBatchPicker()">Отмена</button><button class="primary" onclick="openBatchConfig()">Продолжить</button></div></div>`;d.addEventListener('click',e=>{if(e.target===d)closeBatchPicker()});document.body.appendChild(d);renderBatchProducts('')};

function visualBottom(pref,n,withSeries=true){return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}">${colorHtml()}${withSeries?seriesHtml(n):''}`}
function commercialTop(pref){return `${qrHtml(pref.showQR!==false)}`}

// Batch: QR → per-product price/promo/period → template → color → series.
window.openBatchConfig=function(){if(!batchSelected.length)return;closeBatchPicker();const pref=shareBasePrefs(),ps=batchSelected.map(id=>products.find(p=>p.id===id)).filter(Boolean);const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet batchConfig"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Поделиться продуктами</b></div><button onclick="closeShareConfig()">×</button></div>${commercialTop(pref)}${ps.map(rowHtml).join('')}<div class="fh17VisualSection">${visualBottom(pref,ps.length,true)}</div><div class="shareHint batchHint">Цена, акция и период задаются отдельно для каждого продукта. Личные данные берутся из «Мои данные для публикаций».</div><div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="previewBatchShare()">Предпросмотр</button></div></div>`;d.addEventListener('click',e=>{if(e.target===d)closeShareConfig()});document.body.appendChild(d);bindShareInputs(d);fh16SyncQr()};

// Single card mirrors the batch order (without series).
window.openShareConfig=function(id){const p=products.find(x=>x.id===id);if(!p)return;shareDraft={id,withText:false};closeProductShare();const pref=shareBasePrefs(),d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';d.innerHTML=`<div class="shareConfigSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Карточка продукта</b></div><button type="button" onclick="fh17CloseSingleShare()">×</button></div>${commercialTop(pref)}<div class="fhSingleCommercial batchCfgRow shareField" data-id="${p.id}">${priceControls()}${promoControls()}</div><div class="fh17VisualSection">${visualBottom(pref,1,false)}</div><div class="shareHint" style="margin:12px 4px 4px">Контакты отправителя и Фото отправителя настраиваются в разделе «Мои данные для публикаций» на странице пакетной публикации.</div><div class="shareConfigActions"><button type="button" class="secondary" onclick="fh17CloseSingleShare()">Отмена</button><button class="primary" onclick="previewConfiguredShare()">Предпросмотр</button></div></div>`;d.addEventListener('click',e=>{if(e.target===d)fh17CloseSingleShare()});document.body.appendChild(d);bindShareInputs(d);fh16SyncQr()};
window.fh17CloseSingleShare=()=>{document.getElementById('shareConfigShade')?.remove();shareDraft=null;document.body.style.overflow='';document.documentElement.style.overflow=''};
})();
/* FUTURE HEALTH production module */
(()=>{'use strict';
// V36.17 revealed an old ID mismatch: the sheet is #productShareShade, while legacy closeProductShare()
// removes #productShareSheet. Override the closer so X/backdrop/actions always release the UI lock.
window.closeProductShare=function(){
  document.getElementById('productShareShade')?.remove();
  document.getElementById('productShareSheet')?.remove();
  document.body.style.overflow='';
  document.documentElement.style.overflow='';
};

// Rebuild the product share sheet with a reliable close button/backdrop.
window.openProductShare=function(id){
  const p=products.find(x=>x.id===id); if(!p)return;
  shareReturnProductId=id; closeProductShare();
  const sh=document.createElement('div');
  sh.id='productShareShade'; sh.className='shareConfigShade';
  sh.innerHTML=`<div class="productShareSheet" role="dialog" aria-modal="true"><div class="shareGrab"></div><div class="shareTitle"><div><small>FUTURE HEALTH</small><b>Поделиться продуктом</b></div><button type="button" onclick="closeProductShare()" aria-label="Закрыть">×</button></div><div class="shareProductMini">${p.img?`<img src="${p.img}" alt="">`:''}<span>${p.name}</span></div><button class="shareChoice" onclick="openShareProfileSettings()"><i>◉</i><span><b>Мои данные для публикаций</b><small>Единые данные: изменения синхронизируются с Центром публикаций</small></span><em>›</em></button><button class="shareChoice" onclick="openShareConfig('${p.id}',false)"><i>▧</i><span><b>Карточка продукта</b><small>Единые настройки с пакетной публикацией</small></span><em>›</em></button><button class="shareChoice" onclick="shareProductLink('${p.id}')"><i>↗</i><span><b>Ссылка на продукт</b><small>Открыть системное меню «Поделиться»</small></span><em>›</em></button><div class="shareLinkPreview">${productDeepLink(p.id)}</div></div>`;
  sh.addEventListener('click',e=>{if(e.target===sh)closeProductShare()});
  document.body.appendChild(sh);
};

// Native iOS/Android share sheet for the product URL. Clipboard is only a fallback when Web Share is unavailable.
window.shareProductLink=async function(id){
  const p=products.find(x=>x.id===id),url=productDeepLink(id); if(!p)return;
  const data={title:p.name||'FUTURE HEALTH',text:p.name||'FUTURE HEALTH',url};
  if(navigator.share){
    try{ await navigator.share(data); closeProductShare(); return; }
    catch(e){ if(e?.name==='AbortError') return; }
  }
  try{
    const ok=typeof copyTextSafe==='function'?await copyTextSafe(url):false;
    if(ok){closeProductShare(); if(typeof showShareToast==='function')showShareToast('Ссылка скопирована','Системное меню недоступно — ссылка скопирована в буфер обмена');}
  }catch(e){}
};

// Category pages: show the same three-line series-list button used on product pages whenever a series is selected.
const _fh18ShowCategory=window.showCategory;
window.showCategory=function(id,push=true){
  _fh18ShowCategory(id,push);
  const head=document.querySelector('.categoryHead'); if(!head)return;
  const old=head.querySelector('.fh18SeriesMenuBtn'); if(old)old.remove();
  const btn=document.createElement('button');
  btn.type='button'; btn.className='seriesMenuBtn fh18SeriesMenuBtn'; btn.innerHTML='☰';
  btn.setAttribute('aria-label','Список продуктов серии');
  btn.onclick=()=>openSeriesDrawer(id,'');
  const placeholder=head.querySelector(':scope > span:last-child');
  if(placeholder) placeholder.replaceWith(btn); else head.appendChild(btn);
};
})();
/* FUTURE HEALTH production module */
(function(){
  // Self-contained promo options: do not depend on a private function inside an older override.
  function fh20PromoOptions(){return `<option value="none">Без акции</option><option value="buygift">Купить N — получить M в подарок</option><option value="discount">Скидка</option><option value="gift">Подарок к покупке</option><option value="special">Специальная цена</option><option value="custom">Другое / свой текст</option>`}
  function dateField(cls,label){return `<div class="fh19DateWrap"><input class="shareInput ${cls} fh19Date" type="text" inputmode="numeric" maxlength="8" placeholder="${label}: дд.мм.гг" autocomplete="off"><button type="button" class="fh19Cal" aria-label="Выбрать дату"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5"></rect><path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17"></path><path d="M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 17h.01M12 17h.01M16.5 17h.01"></path></svg></button><input class="fh19NativeDate" type="date" aria-label="Выбрать дату"></div>`}
  window.promoControls=function(){return `<label style="margin-top:10px">Акция</label><select class="shareInput batchPromoPreset" onchange="fh16PromoChanged(this)">${fh20PromoOptions()}</select><div class="fh16PromoParams"></div><label style="margin-top:10px">Период акции</label><div class="fh19Period">${dateField('batchStart','От')}${dateField('batchEnd','До')}</div>`};

  function digitsToDisplay(v){const d=String(v||'').replace(/\D/g,'').slice(0,6);return d.length<=2?d:d.length<=4?`${d.slice(0,2)}.${d.slice(2)}`:`${d.slice(0,2)}.${d.slice(2,4)}.${d.slice(4)}`}
  function isoToDisplay(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v||''))return '';const [y,m,d]=v.split('-');return `${d}.${m}.${y.slice(-2)}`}
  window.fh19DateToISO=function(v){const m=String(v||'').match(/^(\d{2})\.(\d{2})\.(\d{2})$/);if(!m)return '';const y=2000+Number(m[3]),mo=Number(m[2]),d=Number(m[1]),dt=new Date(y,mo-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==mo-1||dt.getDate()!==d)return '';return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`};
  function bindDate(root){root.querySelectorAll('.fh19DateWrap').forEach(w=>{const t=w.querySelector('.fh19Date'),n=w.querySelector('.fh19NativeDate'),b=w.querySelector('.fh19Cal');t.addEventListener('input',()=>{const caret=t.selectionStart;t.value=digitsToDisplay(t.value);});t.addEventListener('blur',()=>{if(t.value&&t.value.length===8&&!fh19DateToISO(t.value)){t.setCustomValidity('Введите существующую дату');t.reportValidity()}else t.setCustomValidity('')});n.addEventListener('change',()=>{t.value=isoToDisplay(n.value);t.setCustomValidity('')});b?.addEventListener('click',()=>{try{if(typeof n.showPicker==='function')n.showPicker();else n.click()}catch{n.click()}});})}
  const mo=new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)bindDate(n)})));mo.observe(document.body,{childList:true,subtree:true});bindDate(document);

  // Convert the compact DD.MM.YY UI value back to ISO for the existing rendering pipeline.
  const oldBatch=window.readBatchConfigs;window.readBatchConfigs=function(){return oldBatch().map(c=>({...c,start:fh19DateToISO(c.start)||c.start,end:fh19DateToISO(c.end)||c.end}))};
  const oldSingle=window.readShareConfig;window.readShareConfig=function(){const c=oldSingle();if(!c)return c;return {...c,start:fh19DateToISO(c.start)||c.start,end:fh19DateToISO(c.end)||c.end}};

  // Keep the active series pill visible after selecting any of the 8 series.
  function revealActive(){requestAnimationFrame(()=>requestAnimationFrame(()=>{const row=document.querySelector('.categoryQuick'),a=row?.querySelector('button.active');if(!row||!a)return;const target=a.offsetLeft-(row.clientWidth-a.offsetWidth)/2;row.scrollTo({left:Math.max(0,target),behavior:'auto'})}))}
  const oldShow=window.showCategory;window.showCategory=function(id,push=true){oldShow(id,push);revealActive()};
})();

/* V38 RC2 production stabilization: informational pages always start at top after render. */
(()=>{const _off=window.showOfficial||showOfficial;window.showOfficial=function(push=true){_off(push);fhForceTop()};const _cmp=window.showCompanyMore||showCompanyMore;window.showCompanyMore=function(push=true){_cmp(push);fhForceTop()};})();
