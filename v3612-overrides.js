/* FUTURE HEALTH V36.12 — profile/data pipeline + readable mobile cards */
(()=>{'use strict';
window.FH_VERSION='36.12';
const getProfile=()=>{const p=loadSharePrefs()||{};return {senderStatus:p.senderStatus||'none',senderName:p.senderName||'',senderPhone:p.senderPhone||'',senderContacts:Array.isArray(p.senderContacts)?p.senderContacts:[],avatar:p.avatar||'',avatarCrop:p.avatarCrop||{scale:1,x:0,y:0}}};
// Profile is the ONLY place where identity/contact/avatar is edited.
window.saveShareProfileOnly=function(){
 const p=loadSharePrefs()||{}, contacts=typeof readContactRows==='function'?readContactRows():[];
 const next={...p,senderStatus:document.getElementById('shareSenderStatus')?.value||'none',senderName:(document.getElementById('shareSenderName')?.value||'').trim(),senderPhone:normalizeRuPhone((document.getElementById('shareSenderPhone')?.value||'').trim()),senderContacts:contacts,avatar:shareAvatarData||'',avatarCrop:{...window.shareAvatarCrop}};
 saveSharePrefs(next);closeShareConfig();showShareToast('Данные сохранены','Профиль будет автоматически добавляться в публикации');
};
// Publication appearance only: no duplicated personal fields/avatar.
window.shareVisualFieldsHtml=function(pref){return `${shareTemplateHtml(pref.template||'classic')}<input type="hidden" id="shareTemplate" value="${pref.template||'classic'}"><div class="shareField fhPublishQuick"><label class="shareToggle"><span><b>Показывать мои данные</b><small>Использовать сохранённый профиль без повторного ввода</small></span><input id="shareProfileVisible" type="checkbox" checked></label></div><div class="shareField"><label class="shareToggle"><span><b>QR-код продукта</b><small>Ведёт на страницу выбранного продукта</small></span><input id="shareQR" type="checkbox" ${pref.showQR!==false?'checked':''}></label></div>`};
function cleanPublicationSheet(sheet){sheet?.querySelector('.shareSenderBlock')?.remove();sheet?.querySelectorAll('.shareAvatarRow').forEach(e=>e.closest('.shareField')?.remove());}
const obc=window.openBatchConfig;window.openBatchConfig=function(){obc();const s=document.querySelector('#shareConfigShade .shareConfigSheet');cleanPublicationSheet(s)};
const osc=window.openShareConfig;window.openShareConfig=function(id,wt){osc(id,wt);const s=document.querySelector('#shareConfigShade .shareConfigSheet');cleanPublicationSheet(s)};
function mergeProfile(c){const show=document.getElementById('shareProfileVisible')?.checked!==false,p=getProfile();return {...c,...(show?p:{senderStatus:'none',senderName:'',senderPhone:'',senderContacts:[],avatar:'',avatarCrop:{scale:1,x:0,y:0}})};}
// Read every per-product field directly from its own row. No inherited stale config.
window.readBatchConfigs=function(){
 const rows=[...document.querySelectorAll('.batchCfgRow')], tpl=document.getElementById('shareTemplate')?.value||'classic', qr=document.getElementById('shareQR')?.checked!==false;
 return rows.map((r,i)=>mergeProfile({id:r.dataset.id,priceMode:r.querySelector('.batchMode')?.value||'none',customPrice:(r.querySelector('.batchPrice')?.value||'').trim(),showPV:!!r.querySelector('.batchPV')?.checked,promo:typeof promoText==='function'?promoText(r):'',start:r.querySelector('.fhStart')?.value||'',end:r.querySelector('.fhEnd')?.value||'',template:tpl==='auto'?['classic','visual','info','minimal'][i%4]:tpl,showQR:qr,saveDefaults:false}));
};
const oldRS=window.readShareConfig;window.readShareConfig=function(){const c=oldRS();return c?mergeProfile(c):c};
// Persist appearance without ever overwriting profile with empty publication controls.
window.persistShareDefaults=function(cfg){const p=loadSharePrefs()||{};saveSharePrefs({...p,template:cfg.template||p.template||'classic',showQR:cfg.showQR!==false,priceMode:cfg.priceMode||p.priceMode||'none',showPV:!!cfg.showPV})};

async function fhCard(p,cfg){
 const W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const tpl=cfg.template==='auto'?'classic':(cfg.template||'classic'), pal={classic:['#f5fbff','#e7f5ff','#1268ad','#102f4f'],visual:['#f7fbf4','#e5f2dd','#2d7652','#173e32'],info:['#f7fafc','#eaf1f6','#315f7f','#17364e'],minimal:['#f8fbfd','#edf4f8','#0e527e','#173957']}[tpl]||['#f5fbff','#e7f5ff','#1268ad','#102f4f'];
 x.fillStyle=pal[0];x.fillRect(0,0,W,H);let g=x.createLinearGradient(0,0,W,720);g.addColorStop(0,pal[1]);g.addColorStop(1,'#fff');x.fillStyle=g;x.fillRect(0,0,W,720);
 x.fillStyle=pal[2];x.font='700 40px Arial';x.fillText('FUTURE HEALTH',66,78);x.fillStyle='#6f8799';x.font='500 19px Arial';x.fillText('КАТАЛОГ ПРОДУКЦИИ',67,109);
 const src=cleanImg(p)||p.img;const ib=tpl==='info'?{x:560,y:150,w:455,h:470}:{x:100,y:145,w:880,h:545};if(src)try{const im=await loadCanvasImage(src),r=Math.min(ib.w/im.width,ib.h/im.height),w=im.width*r,h=im.height*r;x.drawImage(im,ib.x+(ib.w-w)/2,ib.y+(ib.h-h)/2,w,h)}catch{}
 let y=tpl==='info'?165:735,tx=tpl==='info'?66:70,tw=tpl==='info'?465:940;
 y=canvasTextBlock(x,p.name,tx,y,tw,'700 50px Arial',pal[3],59,tpl==='info'?5:3)+16;
 y=canvasTextBlock(x,officialShareSummary(p),tx,y,tw,'400 38px Arial','#55758c',52,tpl==='info'?8:5)+25;
 x.fillStyle=pal[2];x.font='700 23px Arial';x.fillText('КЛЮЧЕВЫЕ ОСОБЕННОСТИ',tx,y);y+=42;
 for(const f of officialShareFeatures(p)){x.fillStyle=pal[2];x.beginPath();x.arc(tx+9,y-10,7,0,Math.PI*2);x.fill();y=canvasTextBlock(x,f,tx+32,y,tw-32,'600 32px Arial','#294d68',43,2)+10;if(y>1450)break}
 const prices=sharePriceLines(p,cfg),promo=cfg.promo||'',period=offerPeriod(cfg);if(prices.length||promo||period){const lines=prices.length+(promo?1:0)+(period?1:0),h=Math.min(220,62+lines*42);y=Math.min(Math.max(y+10,1180),1450);x.fillStyle='#fff';roundRect(x,70,y,940,h,22);x.strokeStyle='#d8e8f3';x.lineWidth=2;x.stroke();let py=y+44;x.fillStyle=pal[2];for(const s of prices){x.font='700 34px Arial';x.fillText(s,96,py);py+=42}if(promo)py=canvasTextBlock(x,promo,96,py,850,'700 30px Arial',pal[2],38,2);if(period){x.fillStyle='#607d92';x.font='500 24px Arial';x.fillText(period,96,Math.min(py+8,y+h-18))}}
 const sender=senderLines(cfg),has=sender.length||cfg.avatar,qr=cfg.showQR!==false,bY=1680,bH=170;if(has||qr){x.fillStyle='#fff';roundRect(x,70,bY,940,bH,24);x.strokeStyle='#cfe1ed';x.lineWidth=2;x.stroke();let sx=96;if(cfg.avatar){try{const im=await loadCanvasImage(cfg.avatar),r=57,cr=cfg.avatarCrop||{scale:1,x:0,y:0};x.save();x.beginPath();x.arc(148,bY+85,r,0,Math.PI*2);x.clip();const base=Math.max((2*r)/im.width,(2*r)/im.height),sc=base*(cr.scale||1),w=im.width*sc,h=im.height*sc;x.drawImage(im,148-w/2+(cr.x||0)*.45,bY+85-h/2+(cr.y||0)*.45,w,h);x.restore();sx=225}catch(e){}}
 if(sender.length){x.fillStyle='#70889b';x.font='700 17px Arial';x.fillText('КОНТАКТ',sx,bY+30);let sy=bY+61;sender.slice(0,5).forEach((s,i)=>{x.fillStyle=i===0?pal[3]:'#3f627c';x.font=(i===0?'700 25px':'500 20px')+' Arial';x.fillText(s,sx,sy);sy+=26})}
 if(qr){const q=drawQrToCanvas(x,productDeepLink(p.id),844,bY+20,128);if(q){x.fillStyle='#627d92';x.font='500 14px Arial';x.fillText('Подробнее',850,bY+157)}}}
 x.fillStyle=pal[2];x.fillRect(70,1888,940,3);x.font='700 17px Arial';x.fillText('FUTURE HEALTH · SHARE HAPPINESS',70,1874);
 return await new Promise(res=>c.toBlob(res,'image/png',.95));
}
window.makeProductCard=fhCard;
})();
