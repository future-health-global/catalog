/* FUTURE HEALTH V36.21 — QR scale, real calendar icon, smoother catalogue navigation */
(function(){
  // 1) Replace the temporary square glyph with a real calendar icon everywhere the promo period is rendered.
  const CAL=`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5"></rect><path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17"></path><path d="M7.5 13h.01M12 13h.01M16.5 13h.01M7.5 17h.01M12 17h.01M16.5 17h.01"></path></svg>`;
  function replaceCalendarIcons(root=document){root.querySelectorAll('.fh19Cal').forEach(b=>{if(!b.querySelector('svg'))b.innerHTML=CAL})}
  const calObs=new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)replaceCalendarIcons(n)})));
  calObs.observe(document.body,{childList:true,subtree:true}); replaceCalendarIcons();

  // 2) Smooth page replacement. Keep the old frame until the new DOM is ready, then cross-fade.
  function smoothCall(fn){
    if(document.startViewTransition){ try{return document.startViewTransition(()=>fn()).finished.catch(()=>{});}catch(e){} }
    const a=document.getElementById('app'); if(!a)return fn();
    a.classList.add('fh21Changing');
    requestAnimationFrame(()=>{fn();requestAnimationFrame(()=>a.classList.remove('fh21Changing'))});
  }
  const oldCat=window.showCategory;
  window.showCategory=function(id,push=true){return smoothCall(()=>oldCat(id,push))};
  const oldProduct=window.showProduct;
  window.showProduct=function(id,push=true){return smoothCall(()=>{
    oldProduct(id,push);
    const r=document.getElementById('reader');
    if(r){r.classList.add('fh21ReaderReady');requestAnimationFrame(()=>r.classList.add('show'))}
  })};
})();
