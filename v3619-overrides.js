/* FUTURE HEALTH V36.19 — date UX / avatar layout / active series visibility */
(function(){
  function dateField(cls,label){return `<div class="fh19DateWrap"><input class="shareInput ${cls} fh19Date" type="text" inputmode="numeric" maxlength="8" placeholder="${label}: дд.мм.гг" autocomplete="off"><button type="button" class="fh19Cal" aria-label="Выбрать дату">▣</button><input class="fh19NativeDate" type="date" tabindex="-1" aria-hidden="true"></div>`}
  window.promoControls=function(){return `<label style="margin-top:10px">Акция</label><select class="shareInput batchPromoPreset" onchange="fh16PromoChanged(this)">${promoOptions()}</select><div class="fh16PromoParams"></div><label style="margin-top:10px">Период акции</label><div class="fh19Period">${dateField('batchStart','От')}${dateField('batchEnd','До')}</div>`};

  function digitsToDisplay(v){const d=String(v||'').replace(/\D/g,'').slice(0,6);return d.length<=2?d:d.length<=4?`${d.slice(0,2)}.${d.slice(2)}`:`${d.slice(0,2)}.${d.slice(2,4)}.${d.slice(4)}`}
  function isoToDisplay(v){if(!/^\d{4}-\d{2}-\d{2}$/.test(v||''))return '';const [y,m,d]=v.split('-');return `${d}.${m}.${y.slice(-2)}`}
  window.fh19DateToISO=function(v){const m=String(v||'').match(/^(\d{2})\.(\d{2})\.(\d{2})$/);if(!m)return '';const y=2000+Number(m[3]),mo=Number(m[2]),d=Number(m[1]),dt=new Date(y,mo-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==mo-1||dt.getDate()!==d)return '';return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`};
  function bindDate(root){root.querySelectorAll('.fh19DateWrap').forEach(w=>{const t=w.querySelector('.fh19Date'),n=w.querySelector('.fh19NativeDate'),b=w.querySelector('.fh19Cal');t.addEventListener('input',()=>{const caret=t.selectionStart;t.value=digitsToDisplay(t.value);});t.addEventListener('blur',()=>{if(t.value&&t.value.length===8&&!fh19DateToISO(t.value)){t.setCustomValidity('Введите существующую дату');t.reportValidity()}else t.setCustomValidity('')});n.addEventListener('change',()=>{t.value=isoToDisplay(n.value);t.setCustomValidity('')});b.addEventListener('click',()=>{try{n.showPicker?n.showPicker():n.click()}catch{n.click()}})})}
  const mo=new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)bindDate(n)})));mo.observe(document.body,{childList:true,subtree:true});bindDate(document);

  // Convert the compact DD.MM.YY UI value back to ISO for the existing rendering pipeline.
  const oldBatch=window.readBatchConfigs;window.readBatchConfigs=function(){return oldBatch().map(c=>({...c,start:fh19DateToISO(c.start)||c.start,end:fh19DateToISO(c.end)||c.end}))};
  const oldSingle=window.readShareConfig;window.readShareConfig=function(){const c=oldSingle();if(!c)return c;return {...c,start:fh19DateToISO(c.start)||c.start,end:fh19DateToISO(c.end)||c.end}};

  // Keep the active series pill visible after selecting any of the 8 series.
  function revealActive(){requestAnimationFrame(()=>requestAnimationFrame(()=>{const row=document.querySelector('.categoryQuick'),a=row?.querySelector('button.active');if(!row||!a)return;const target=a.offsetLeft-(row.clientWidth-a.offsetWidth)/2;row.scrollTo({left:Math.max(0,target),behavior:'auto'})}))}
  const oldShow=window.showCategory;window.showCategory=function(id,push=true){oldShow(id,push);revealActive()};
})();
