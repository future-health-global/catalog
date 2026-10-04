/* FUTURE HEALTH V36.9 — stable UI/data enhancements only. V36.8 native share core remains intact. */
(()=>{
'use strict';
window.FH_VERSION='36.9';
window.shareAvatarCrop=window.shareAvatarCrop||{scale:1,x:0,y:0};
const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

// Avatar settings: upload once, then adjust crop/zoom without changing the original image.
window.shareVisualFieldsHtml=function(pref){
  shareAvatarData=pref.avatar||''; window.shareAvatarCrop=pref.avatarCrop||{scale:1,x:0,y:0};
  return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}">
  <div class="shareField"><label>Фото отправителя <span class="fhOptional">(необязательно)</span></label>
    <div class="shareAvatarRow"><button type="button" id="shareAvatarPreview" class="shareAvatarPreview fhAvatarButton" onclick="openAvatarEditor()">${shareAvatarData?`<img src="${shareAvatarData}" alt="">`:'Без фото'}</button>
    <div class="fhAvatarControls"><label class="fhUploadBtn">Выбрать фото<input id="shareAvatarInput" type="file" accept="image/*"></label><button type="button" class="secondary" onclick="openAvatarEditor()">Настроить</button><button type="button" class="secondary" onclick="clearShareAvatar()">Удалить</button></div></div>
    <div class="shareHint">Фото можно увеличить, уменьшить и переместить внутри круглой области.</div></div>
  <div class="shareField"><label class="shareToggle"><span><b>QR-код продукта</b><small>Ведёт на страницу выбранного продукта</small></span><input id="shareQR" type="checkbox" ${pref.showQR!==false?'checked':''}></label></div>`;
};
window.clearShareAvatar=function(){shareAvatarData='';window.shareAvatarCrop={scale:1,x:0,y:0};const p=document.getElementById('shareAvatarPreview');if(p)p.innerHTML='Без фото';const f=document.getElementById('shareAvatarInput');if(f)f.value=''};
window.bindAvatar=function(root=document){const inp=root.querySelector('#shareAvatarInput'),prev=root.querySelector('#shareAvatarPreview');if(prev&&shareAvatarData)prev.innerHTML=`<img src="${shareAvatarData}" alt="">`;if(inp&&!inp.dataset.v369){inp.dataset.v369='1';inp.addEventListener('change',()=>{const f=inp.files?.[0];if(!f)return;if(f.size>5*1024*1024){showShareToast('Фото слишком большое','Выберите изображение до 5 МБ');inp.value='';return}const r=new FileReader();r.onload=()=>{shareAvatarData=String(r.result||'');window.shareAvatarCrop={scale:1,x:0,y:0};if(prev)prev.innerHTML=`<img src="${shareAvatarData}" alt="">`;openAvatarEditor()};r.readAsDataURL(f)})}};
window.openAvatarEditor=function(){if(!shareAvatarData){document.getElementById('shareAvatarInput')?.click();return}document.getElementById('fhAvatarEditor')?.remove();const st={...window.shareAvatarCrop};const d=document.createElement('div');d.id='fhAvatarEditor';d.innerHTML=`<div class="fhAvatarEditorCard"><div class="fhAvatarEditorHead"><b>Настройка фото</b><button type="button">×</button></div><div class="fhCropStage"><div class="fhCropCircle"><img src="${shareAvatarData}" alt=""></div></div><label class="fhZoomLabel">Масштаб <input type="range" min="1" max="3" step="0.02" value="${st.scale||1}"></label><div class="fhAvatarEditorActions"><button type="button" data-a="reset">Сбросить</button><button type="button" class="primary" data-a="ok">Готово</button></div></div>`;document.body.appendChild(d);const img=d.querySelector('img'),stage=d.querySelector('.fhCropStage'),range=d.querySelector('input[type=range]');let drag=null;const apply=()=>img.style.transform=`translate3d(${st.x||0}px,${st.y||0}px,0) scale(${st.scale||1})`;apply();range.oninput=()=>{st.scale=+range.value;apply()};stage.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,ox:st.x||0,oy:st.y||0};stage.setPointerCapture?.(e.pointerId)});stage.addEventListener('pointermove',e=>{if(!drag)return;st.x=drag.ox+(e.clientX-drag.x);st.y=drag.oy+(e.clientY-drag.y);apply()});stage.addEventListener('pointerup',()=>drag=null);d.querySelector('.fhAvatarEditorHead button').onclick=()=>d.remove();d.querySelector('[data-a=reset]').onclick=()=>{st.scale=1;st.x=st.y=0;range.value=1;apply()};d.querySelector('[data-a=ok]').onclick=()=>{window.shareAvatarCrop={scale:st.scale,x:st.x||0,y:st.y||0};d.remove()};};

// Persist crop metadata together with existing stable preferences.
const rsc=window.readShareConfig; if(typeof rsc==='function')window.readShareConfig=function(){const c=rsc();if(c)c.avatarCrop={...window.shareAvatarCrop};return c};
const rbc=window.readBatchConfigs; if(typeof rbc==='function')window.readBatchConfigs=function(){return rbc().map(c=>({...c,avatarCrop:{...window.shareAvatarCrop}}))};
const psd=window.persistShareDefaults; if(typeof psd==='function')window.persistShareDefaults=function(cfg){psd(cfg);if(cfg?.saveDefaults){const p=loadSharePrefs();saveSharePrefs({...p,avatarCrop:cfg.avatarCrop||window.shareAvatarCrop})}};
const sbp=window.shareBasePrefs; if(typeof sbp==='function')window.shareBasePrefs=function(){const p=sbp();return {...p,avatarCrop:p.avatarCrop||{scale:1,x:0,y:0}}};

// Settings popup remains a single bottom sheet. No secondary side panels.
const obs=new MutationObserver(()=>{const sh=document.querySelector('#shareConfigShade .shareConfigSheet');if(!sh)return;sh.classList.add('fhV369Sheet');bindAvatar(sh)});obs.observe(document.body,{childList:true,subtree:true});
})();
