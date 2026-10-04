/* FUTURE HEALTH V36.11 — UX cleanup: one profile source, compact publishing settings. */
(()=>{'use strict';
window.FH_VERSION='36.11';
const baseVisual=window.shareVisualFieldsHtml;
// Publishing sheet: only per-publication appearance. Persistent identity/avatar live in “Мои данные”.
window.shareVisualFieldsHtml=function(pref){
  shareAvatarData=pref.avatar||''; window.shareAvatarCrop=pref.avatarCrop||{scale:1,x:0,y:0};
  return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}">
  <div class="shareField fhPublishQuick"><label class="shareToggle"><span><b>Мои данные на карточке</b><small>Имя, статус, телефон и фото из сохранённого профиля</small></span><input id="shareProfileVisible" type="checkbox" checked></label></div>
  <div class="shareField"><label class="shareToggle"><span><b>QR-код продукта</b><small>Ведёт на страницу выбранного продукта</small></span><input id="shareQR" type="checkbox" ${pref.showQR!==false?'checked':''}></label></div>`;
};
// Profile sheet: only persistent identity. No template/color duplication.
window.openShareProfileSettings=function(){
  const pref=shareBasePrefs(); shareAvatarData=pref.avatar||''; window.shareAvatarCrop=pref.avatarCrop||{scale:1,x:0,y:0};
  const d=document.createElement('div');d.id='shareConfigShade';d.className='shareConfigShade';
  d.innerHTML=`<div class="shareConfigSheet fhProfileSheet"><div class="shareConfigHead"><div><small>FUTURE HEALTH</small><b>Мои данные для публикаций</b></div><button onclick="closeShareConfig()">×</button></div>
  <div class="fhProfileIntro">Заполните один раз. Эти данные автоматически используются в новых публикациях.</div>
  ${senderFieldsHtml(pref)}
  <div class="shareField"><label>Фото <span class="fhOptional">(необязательно)</span></label><div class="shareAvatarRow"><button type="button" id="shareAvatarPreview" class="shareAvatarPreview fhAvatarButton" onclick="openAvatarEditor()">${shareAvatarData?`<img src="${shareAvatarData}" alt="">`:'Без фото'}</button><div class="fhAvatarControls"><label class="fhUploadBtn">Выбрать фото<input id="shareAvatarInput" type="file" accept="image/*"></label><button type="button" class="secondary" onclick="openAvatarEditor()">Настроить</button><button type="button" class="secondary" onclick="clearShareAvatar()">Удалить</button></div></div></div>
  <div class="shareConfigActions"><button class="secondary" onclick="closeShareConfig()">Отмена</button><button class="primary" onclick="saveShareProfileOnly()">Сохранить</button></div></div>`;
  document.body.appendChild(d);bindShareInputs(d);bindAvatar(d);const cb=d.querySelector('#shareSaveDefaults');if(cb){cb.checked=true;cb.closest('label').style.display='none'}
};
window.saveShareProfileOnly=function(){const cfg=readSenderFields({});cfg.avatar=shareAvatarData||'';cfg.avatarCrop={...window.shareAvatarCrop};cfg.saveDefaults=true;persistShareDefaults(cfg);closeShareConfig();showShareToast('Данные сохранены','Они будут автоматически использоваться в публикациях')};
// If user hides profile for one publication, strip it only from generated card, never from saved profile.
const rs=window.readShareConfig; if(typeof rs==='function') window.readShareConfig=function(){const c=rs();if(c&&document.getElementById('shareProfileVisible')&&!document.getElementById('shareProfileVisible').checked){c.senderStatus='none';c.senderName='';c.senderPhone='';c.contacts=[];c.avatar=''}return c};
const rb=window.readBatchConfigs; if(typeof rb==='function') window.readBatchConfigs=function(){const a=rb();const hide=document.getElementById('shareProfileVisible')&&!document.getElementById('shareProfileVisible').checked;return hide?a.map(c=>({...c,senderStatus:'none',senderName:'',senderPhone:'',contacts:[],avatar:''})):a};
})();
