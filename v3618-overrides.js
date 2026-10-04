/* FUTURE HEALTH V36.18 — share exit/native link share/category quick list */
(()=>{'use strict';
window.FH_VERSION='36.18';

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
  sh.innerHTML=`<div class="productShareSheet" role="dialog" aria-modal="true"><div class="shareGrab"></div><div class="shareTitle"><div><small>FUTURE HEALTH</small><b>Поделиться продуктом</b></div><button type="button" onclick="closeProductShare()" aria-label="Закрыть">×</button></div><div class="shareProductMini">${p.img?`<img src="${p.img}" alt="">`:''}<span>${p.name}</span></div><button class="shareChoice" onclick="openShareConfig('${p.id}',false)"><i>▧</i><span><b>Карточка продукта</b><small>Единые настройки с пакетной публикацией</small></span><em>›</em></button><button class="shareChoice" onclick="shareProductLink('${p.id}')"><i>↗</i><span><b>Ссылка на продукт</b><small>Открыть системное меню «Поделиться»</small></span><em>›</em></button><div class="shareLinkPreview">${productDeepLink(p.id)}</div></div>`;
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
