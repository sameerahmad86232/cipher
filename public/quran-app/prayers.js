/* Koshur Quran prayer-time companion.
 * Prayer times calculated by https://aladhan.com/prayer-times-api .
 * All user preferences, manual overrides and reminders stay in localStorage.
 * No geolocation without a deliberate user click. */
(function(){
'use strict';
const KEY='koshur-prayer-times:v2';
const names=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const methods=[{id:1,label:'University of Islamic Sciences, Karachi'},{id:3,label:'Muslim World League'},{id:2,label:'Islamic Society of North America'},{id:4,label:'Umm Al-Qura, Makkah'},{id:5,label:'Egyptian General Authority'}];
const presets=[['Srinagar','India'],['Jammu','India'],['New Delhi','India'],['Mumbai','India'],['Makkah','Saudi Arabia'],['London','United Kingdom']];
function defaults(){return {city:'Srinagar',country:'India',latitude:null,longitude:null,method:1,school:1,offsets:{},overrides:{},reminders:[],show24h:false};}
function restore(){try{const a=JSON.parse(localStorage.getItem(KEY));return a&&typeof a==='object'?Object.assign(defaults(),a,{offsets:a.offsets&&typeof a.offsets==='object'?a.offsets:{},overrides:a.overrides&&typeof a.overrides==='object'?a.overrides:{},reminders:Array.isArray(a.reminders)?a.reminders.slice(0,25):[]}):defaults();}catch(e){return defaults();}}
let cfg=restore(),api=null,day=null,nextDay=null,loading=false,error='',updatedAt='', request=0;
let timeZone='Asia/Kolkata',todaysDate='',timer=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(cfg));}catch(e){}}
function esc(v){return api?api.escapeHtml(String(v??'')):String(v??'');}
function icon(i){return api?api.icon(i):'';}
function zonedParts(date,zone){try{const a=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date);const x=Object.fromEntries(a.map(p=>[p.type,p.value]));return {y:+x.year,m:+x.month,d:+x.day,h:+x.hour,n:+x.minute,s:+x.second};}catch(e){return zonedParts(date,'UTC');}}
function isoInZone(date=new Date(),zone=timeZone){const x=zonedParts(date,zone);return [x.y,String(x.m).padStart(2,'0'),String(x.d).padStart(2,'0')].join('-');}
function dateParam(iso){const a=iso.split('-');return [a[2],a[1],a[0]].join('-');}
function nextISO(iso){const d=new Date(iso+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+1);return d.toISOString().slice(0,10);}
function hmMinutes(s){const m=/^(\d{1,2}):(\d{2})/.exec(String(s||''));if(!m)return null;const h=+m[1],n=+m[2];return h>=0&&h<=23&&n<60?h*60+n:null;}
function normTime(t){const n=hmMinutes(t);return n===null?'':String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function shifted(s,n){const m=hmMinutes(s);if(m===null)return null;const v=(m+Math.round(n)%1440+1440)%1440;return String(Math.floor(v/60)).padStart(2,'0')+':'+String(v%60).padStart(2,'0');}
function display(t){const n=hmMinutes(t);if(n===null)return '—';if(cfg.show24h)return t;const h=Math.floor(n/60),m=n%60;return (h%12||12)+':'+String(m).padStart(2,'0')+' '+(h>=12?'PM':'AM');}
function valueFor(k,d=day){const custom=normTime(cfg.overrides[k]);if(custom)return custom;const raw=d?.timings?.[k];return raw?shifted(raw,Number(cfg.offsets[k]||0)):null;}
function prayerMode(k){return normTime(cfg.overrides[k])?'manual':cfg.offsets[k]?'adjusted':'calculated';}
async function requestJson(url){const c=new AbortController(),t=setTimeout(()=>c.abort(),13000);try{const r=await fetch(url,{signal:c.signal});if(!r.ok)throw Error('HTTP '+r.status);const j=await r.json();if(j.code!==200||!j.data?.timings)throw Error('Invalid prayer times response');return j.data;}finally{clearTimeout(t);}}
async function loadOne(date){
 const q=new URLSearchParams({date:dateParam(date),method:String(cfg.method),school:String(cfg.school)});
 if(Number.isFinite(cfg.latitude)&&Number.isFinite(cfg.longitude)){q.set('latitude',String(cfg.latitude));q.set('longitude',String(cfg.longitude));}
 else{q.set('city',cfg.city);q.set('country',cfg.country);}
 return requestJson('/api/prayer-times?'+q.toString());
}
function cacheKey(iso){return KEY+':schedule:'+iso+':'+cfg.city+':'+cfg.country+':'+(cfg.latitude??'')+':'+(cfg.longitude??'')+':'+cfg.method+':'+cfg.school;}
function cached(iso){try{const data=JSON.parse(localStorage.getItem(cacheKey(iso)));return data?.timings?data:null;}catch(e){return null;}}
function putCache(iso,data){try{localStorage.setItem(cacheKey(iso),JSON.stringify(data));}catch(e){}}
async function refresh(force=false){
 if(!api)return;
 const job=++request;
 if(force){day=null;nextDay=null;}
 todaysDate=isoInZone(new Date(),timeZone);
 if(!force){const old=cached(todaysDate);if(old){day=old;timeZone=old.meta?.timezone||timeZone;}}
 loading=!day;error='';if(api.state.tab==='prayers')api.render();
 const firstDate=todaysDate;
 try{
  let current=await loadOne(firstDate);
  if(job!==request)return;
  const freshZone=current.meta?.timezone;
  if(freshZone){timeZone=freshZone;const correct=isoInZone(new Date(),timeZone);if(correct!==firstDate){current=await loadOne(correct);if(job!==request)return;}}
  todaysDate=isoInZone(new Date(),timeZone);day=current;putCache(todaysDate,current);updatedAt=new Date().toISOString();error='';loading=false;
  if(api.state.tab==='prayers')api.render();updateMini();
  const tomorrow=nextISO(todaysDate);
  try{nextDay=await loadOne(tomorrow);if(job!==request)return;putCache(tomorrow,nextDay);}catch(e){nextDay=cached(tomorrow);}
  if(api.state.tab==='prayers')updateCountdown();
 }catch(e){
  if(job!==request)return;
  loading=false;error=day?'Live update unavailable — displaying previously saved calculations.':'Prayer times could not be loaded. Check internet or enter manual times.';
  if(api.state.tab==='prayers')api.render();updateMini();
 }
}
function currentNext(){
 const now=zonedParts(new Date(),timeZone),minute=now.h*60+now.n,seconds=now.h*3600+now.n*60+now.s;
 for(const k of prayers){const t=valueFor(k);const m=hmMinutes(t);if(m!==null&&m*60>seconds)return {name:k,time:t,diff:m*60-seconds,tomorrow:false};}
 const first=prayers.map(k=>({name:k,time:valueFor(k,nextDay||day)})).find(x=>hmMinutes(x.time)!==null);
 if(!first)return null;
 return {...first,diff:24*3600-seconds+hmMinutes(first.time)*60,tomorrow:true};
}
function countdown(sec){const s=Math.max(0,sec);const h=Math.floor(s/3600),m=Math.floor((s%3600)/60);return (h?h+'h ':'')+m+'m';}
function progress(){const now=zonedParts(new Date(),timeZone),current=now.h*60+now.n;return {elapsed:prayers.filter(k=>{const n=hmMinutes(valueFor(k));return n!==null&&n<=current;}).length,total:5};}
function updateCountdown(){
 const v=currentNext();const title=document.getElementById('prayer-next-label'),tm=document.getElementById('prayer-next-time'),inN=document.getElementById('prayer-countdown');
 if(!v)return;
 if(title)title.textContent=(v.tomorrow?'Tomorrow · ':'Next Salah · ')+v.name;
 if(tm)tm.textContent=display(v.time);
 if(inN)inN.textContent='In '+countdown(v.diff);
 const x=zonedParts(new Date(),timeZone),iso=[x.y,String(x.m).padStart(2,'0'),String(x.d).padStart(2,'0')].join('-');
 if(iso!==todaysDate&&!loading)refresh();
 if(api?.state.tab==='prayers'&&window.KoshurExtras)window.KoshurExtras.updateProgress();
}
function updateMini(){
 const el=document.getElementById('prayer-home-next');if(!el)return;const n=currentNext();
 el.textContent=n?n.name+' · '+display(n.time):'Times currently unavailable';
}
function row(k){const v=valueFor(k),mode=prayerMode(k),isSunrise=k==='Sunrise',next=currentNext();
 return '<article class="pt-row'+(next?.name===k&&!next.tomorrow?' next':'')+'"><span class="pt-row-icon">'+(isSunrise?'☀':k==='Fajr'?'☾':k==='Maghrib'?'◈':'✧')+'</span><div class="pt-name"><strong>'+k+'</strong><small>'+({Fajr:'Dawn prayer',Sunrise:'Sunrise · not a fard prayer',Dhuhr:'Midday prayer',Asr:'Afternoon prayer',Maghrib:'Sunset prayer',Isha:'Night prayer'})[k]+'</small></div><div class="pt-row-time"><strong>'+display(v)+'</strong><small>'+(!v?'Not available':mode==='manual'?'Manual time':mode==='adjusted'?'Adjusted calculation':'Calculated')+'</small></div></article>';
}
function options(arr,value){return arr.map(x=>'<option value="'+esc(x.id)+'"'+(String(x.id)===String(value)?' selected':'')+'>'+esc(x.label)+'</option>').join('');}
function render(){
 const now=new Date(),date=isoInZone(now,timeZone),next=currentNext();
 const location=(cfg.latitude!==null&&cfg.longitude!==null)?'Your selected coordinates':cfg.city+', '+cfg.country;
 return '<section class="pt-page features-page"><div class="feature-titlebar"><div><span class="feature-kicker">YOUR DAILY SALAH · الصَّلَاةُ</span><h1>Prayer times & settings</h1><p>Beautiful daily Salah schedule, adjustable to your location, school, and local mosque timetable.</p></div><span class="feature-emblem">☾</span></div>'+
 '<section class="pt-hero"><div><span class="pt-kicker">NEXT PRAYER</span><h2 id="prayer-next-label">'+(next?(next.tomorrow?'Tomorrow · ':'Next Salah · ')+next.name:'Prayer schedule')+'</h2><p class="pt-location">'+icon('globe')+' '+esc(location)+' · '+esc(timeZone)+'</p><p class="pt-date">'+esc(new Intl.DateTimeFormat('en-GB',{timeZone,weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(now))+'</p></div><div class="pt-hero-count"><strong id="prayer-next-time">'+(next?display(next.time):'—')+'</strong><span id="prayer-countdown">'+(next?'In '+countdown(next.diff):'Set your location')+'</span></div></section>'+
 '<div class="pt-layout"><div><div class="pt-panel"><div class="pt-heading"><div><h3>Today’s prayer schedule</h3><p>'+(loading?'Calculating prayer timings…':error?esc(error):'Times are estimates, not official mosque announcements.')+'</p></div><button type="button" data-pt-refresh class="pt-refresh">'+icon('sun')+' Refresh</button></div><div class="pt-list">'+names.map(row).join('')+'</div><p class="pt-disclaimer">Source: <a href="https://aladhan.com/prayer-times-api" target="_blank" rel="noopener noreferrer">AlAdhan Prayer Times API</a>. Local masjid or authority may differ. Edited times are personal preferences on this device.</p></div>'+
 '<div class="pt-panel"><div class="pt-heading"><div><h3>Your custom reminders</h3><p>Add personal daily times, such as Quran study or dhikr. Display only—no push alerts.</p></div></div>'+
 '<form id="pt-reminder-form" class="pt-reminder-form"><label>Label<input required maxlength="40" name="label" placeholder="Evening adhkar" aria-label="Reminder label"></label><label>Time<input required type="time" name="time" aria-label="Reminder time"></label><button type="submit" class="btn btn-green">Add</button></form>'+
 '<div class="pt-reminders">'+cfg.reminders.map((r,i)=>'<div class="pt-reminder"><span>✦</span><strong>'+esc(r.label)+'</strong><span>'+display(r.time)+'</span><button type="button" data-pt-delete="'+i+'" aria-label="Delete '+esc(r.label)+'">'+icon('left')+'</button></div>').join('')+(cfg.reminders.length?'':'<p class="pt-empty">No custom reminders yet.</p>')+'</div></div></div>'+
 '<aside class="pt-settings"><div class="pt-panel"><div class="pt-settings-title"><h3>My prayer location</h3><p>Enter a city or choose a preset. Your chosen location is sent to the prayer calculation service when retrieving times.</p></div><div class="pt-presets">'+presets.map(([city,country])=>'<button type="button" data-pt-preset="'+esc(city)+'" class="'+(cfg.city===city&&cfg.country===country&&cfg.latitude===null?'selected':'')+'">'+esc(city)+'</button>').join('')+'</div>'+
 '<form id="pt-city-form"><label>City<input name="city" required maxlength="80" value="'+esc(cfg.city)+'" placeholder="Srinagar"></label><label>Country<input name="country" required maxlength="80" value="'+esc(cfg.country)+'" placeholder="India"></label><label>Calculation method<select name="method">'+options(methods,cfg.method)+'</select></label><label>Asr school<select name="school">'+options([{id:1,label:'Hanafi'},{id:0,label:'Shafi / Standard'}],cfg.school)+'</select></label><button type="submit" class="btn btn-green">Apply & refresh</button><button type="button" class="btn btn-outline" data-pt-geolocate>Use my GPS location</button></form>'+
 '<p class="pt-hint">Using GPS asks for your browser’s permission and sends approximate coordinates to AlAdhan. No location is stored on a website server.</p></div>'+
 '<div class="pt-panel"><div class="pt-settings-title"><h3>Customize each time</h3><p>Adjust calculated times by minutes or set a fixed manual clock time to match your masjid.</p></div>'+
 '<form id="pt-adjust-form">'+names.filter(k=>k!=='Sunrise').map(k=>'<div class="pt-edit-line"><strong>'+k+'</strong><label>± minutes<input type="number" name="offset-'+k+'" min="-120" max="120" step="1" value="'+esc(cfg.offsets[k]??0)+'"></label><label>Manual time<input type="time" name="manual-'+k+'" value="'+esc(normTime(cfg.overrides[k]))+'"></label></div>').join('')+'<button type="submit" class="btn btn-green">Save custom times</button><button type="button" class="btn btn-outline" data-pt-clear>Clear overrides</button></form><p class="pt-hint">Manual times remain fixed every day until cleared. Minute adjustments follow daily calculated times. Sunrise is displayed for reference.</p><label class="pt-clock-format"><input type="checkbox" id="pt-24h"'+(cfg.show24h?' checked':'')+'> Show 24-hour clock</label></div></aside></div></section>';
}
function homeWidget(){
 const next=currentNext();return '<section class="pt-home-card"><div class="pt-home-emblem">☾</div><div><span>PRAYER COMPANION</span><h3>Next Salah <em id="prayer-home-next">'+(next?next.name+' · '+display(next.time):'Location-based schedule')+'</em></h3><p>'+esc(cfg.city+', '+cfg.country)+' · Set your calculation method or your mosque times</p></div><button type="button" class="btn btn-green" data-nav="prayers">Prayer times '+icon('arrow')+'</button></section>';
}
function settingsAddon(){return '<article class="panel settings-panel"><h3>Prayer time preferences</h3><p class="panel-description">Choose your city, Asr school, calculation method and custom adjustments.</p><button type="button" class="btn btn-outline" data-nav="prayers">'+icon('moon')+' Open prayer settings</button></article>';}
function formData(form){return new FormData(form);}
function setLocation(p){cfg.city=p.city;cfg.country=p.country;cfg.latitude=null;cfg.longitude=null;cfg.method=p.method??cfg.method;cfg.school=p.school??cfg.school;save();timeZone=cfg.country==='India'?'Asia/Kolkata':timeZone;day=null;nextDay=null;refresh(true);}
function attach(state){api=state;const cachedDay=cached(isoInZone(new Date(),timeZone));if(cachedDay){day=cachedDay;timeZone=day.meta?.timezone||timeZone;updateMini();}refresh();}
document.addEventListener('submit',function(e){
 if(!api)return;
 if(e.target.id==='pt-city-form'){e.preventDefault();const v=formData(e.target);const city=String(v.get('city')||'').trim(),country=String(v.get('country')||'').trim();if(!city||!country)return;setLocation({city,country,method:Number(v.get('method')),school:Number(v.get('school'))});return;}
 if(e.target.id==='pt-adjust-form'){e.preventDefault();const v=formData(e.target),offsets={},overrides={};for(const k of prayers){const raw=Number(v.get('offset-'+k)||0);offsets[k]=Math.max(-120,Math.min(120,Number.isFinite(raw)?Math.round(raw):0));const time=String(v.get('manual-'+k)||'');if(time&&normTime(time))overrides[k]=normTime(time);}
 cfg.offsets=offsets;cfg.overrides=overrides;save();api.render();api.toast('Prayer times customized');return;}
 if(e.target.id==='pt-reminder-form'){e.preventDefault();const v=formData(e.target);const label=String(v.get('label')||'').trim().slice(0,40),time=normTime(v.get('time'));if(!label||!time)return;if(cfg.reminders.length>=25){api.toast('Limit: 25 custom reminders');return;}cfg.reminders.push({label,time});save();api.render();api.toast('Custom time added');}
});
document.addEventListener('click',function(e){
 const b=e.target.closest('button');if(!b||!api)return;
 if(b.hasAttribute('data-pt-refresh')){refresh(true);return;}
 if(b.dataset.ptPreset){const p=presets.find(x=>x[0]===b.dataset.ptPreset);if(p)setLocation({city:p[0],country:p[1]});return;}
 if(b.hasAttribute('data-pt-clear')){cfg.offsets={};cfg.overrides={};save();api.render();api.toast('Manual time adjustments cleared');return;}
 if(b.dataset.ptDelete!==undefined){const i=Number(b.dataset.ptDelete);if(i>=0&&i<cfg.reminders.length){cfg.reminders.splice(i,1);save();api.render();}return;}
 if(b.hasAttribute('data-pt-geolocate')){
  if(!navigator.geolocation){api.toast('Location is not supported on this device');return;}
  navigator.geolocation.getCurrentPosition(pos=>{cfg.latitude=Number(pos.coords.latitude.toFixed(3));cfg.longitude=Number(pos.coords.longitude.toFixed(3));cfg.city='GPS position';cfg.country='';save();day=null;nextDay=null;refresh(true);},()=>api.toast('Location permission was denied or unavailable'),{enableHighAccuracy:false,timeout:10000,maximumAge:600000});
 }
});
document.addEventListener('change',e=>{if(e.target.id==='pt-24h'){cfg.show24h=e.target.checked;save();api.render();}});
window.KoshurPrayer={attach,render,homeWidget,settingsAddon,updateMini,updateCountdown,refresh,progress};
setInterval(()=>{if(api){updateCountdown();updateMini();}},30000);
})();
