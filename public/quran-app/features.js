/* Koshur Quran immersive features — source-linked data, local-only progress. */
(function () {
'use strict';
const ROOT='/quran-app/';
const key='koshur-extras-2026:';
const source='https://cdn.jsdelivr.net/gh/izan-majeed/kaeshur-quran-data@5515d1ee652300924065a5f5c16f49b63c2d5a79/kaeshur_quran/';
const fallback='https://raw.githubusercontent.com/izan-majeed/kaeshur-quran-data/5515d1ee652300924065a5f5c16f49b63c2d5a79/kaeshur_quran/';
const words=[
 {id:'subhanallah',ar:'سُبْحَانَ اللَّهِ',en:'SubhanAllah',meaning:'Glory be to Allah'},
 {id:'alhamdulillah',ar:'الْحَمْدُ لِلَّهِ',en:'Alhamdulillah',meaning:'All praise belongs to Allah'},
 {id:'allahuakbar',ar:'اللَّهُ أَكْبَرُ',en:'Allahu Akbar',meaning:'Allah is the Greatest'},
 {id:'astaghfirullah',ar:'أَسْتَغْفِرُ اللَّهَ',en:'Astaghfirullah',meaning:'I seek forgiveness from Allah'}
];
const categories=['All duas','Morning & Evening','Prayer & Worship','Sleep & Waking','Protection & Healing','Family & Relationships','Travel & Outdoors','Food & Home','Forgiveness & Guidance','Quranic Duas','Other Occasions'];
const tasks=[
 {id:'quran',label:'Read my daily Quran goal',detail:'Automatically checked when you reach your daily ayah target.'},
 {id:'fast',label:'Complete my fast',detail:'Mark when your fast is completed (optional).'},
 {id:'salah',label:'Keep up with my prayers',detail:'A personal checklist reminder.'},
 {id:'dua',label:'Make time for dua',detail:'Remember to ask Allah sincerely.'},
 {id:'charity',label:'Give or plan an act of kindness',detail:'Even a small good deed matters.'}
];
let api=null,allDuas=[],loading=true,error='',duaQuery='',duaCategory='All duas',duaLimit=16,openDuas=new Set();
let tasbih=read('tasbih',{selected:'subhanallah',target:33,counts:{}});
let ramadan=read('ramadan',{enabled:false,goal:10,days:{}});
let cards={surah:1,translator:300,count:10,index:0,revealed:false,known:{},items:[],loading:false,error:null};
let quranMode='read';
const prayer=window.KoshurPrayer||null;
const cache=new Map();
function read(k,defaultValue){try{return JSON.parse(localStorage.getItem(key+k))??defaultValue;}catch(e){return defaultValue;}}
function save(k,value){try{localStorage.setItem(key+k,JSON.stringify(value));}catch(e){}}
function html(v){return api?api.escapeHtml(v):String(v);}
function icon(name){return api?api.icon(name):'';}
function countId(){return words.find(x=>x.id===tasbih.selected)||words[0];}
function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function dayData(){const id=today();if(!ramadan.days[id])ramadan.days[id]={tasks:{},ayat:[]};return ramadan.days[id];}
function percent(n,d){return Math.min(100,Math.max(0,Math.round(100*n/Math.max(1,d))));}
function updateTop(label,number,total){
 const outer=document.getElementById('utility-progress');const bar=document.getElementById('utility-fill');
 if(!outer||!bar)return;
 const p=percent(number,total);
 document.getElementById('utility-label').textContent=label;
 document.getElementById('utility-value').textContent=p+'%';
 bar.style.width=p+'%';outer.setAttribute('aria-valuenow',String(p));
}
function updateProgress(){
 if(!api)return;
 const tab=api.state.tab;
 if(tab==='quran'&&quranMode==='cards'){updateTop('Flashcards · '+(cards.items.length?cards.index+1:0)+' / '+cards.items.length,cards.items.length?cards.index+1:0,cards.items.length||1);return;}
 if(tab==='quran'&&api.state.selected){const info=api.findSurah(api.state.selected);if(info){const last=api.state.lastRead.surah===info.surah_id?api.state.lastRead.ayah:1;updateTop(info.name_en+' · ayah '+last+' of '+info.verses_count,last,info.verses_count);return;}}
 if(tab==='ramadan'){const d=dayData();updateTop('Daily Quran goal · '+d.ayat.length+' / '+ramadan.goal,d.ayat.length,ramadan.goal);return;}
 if(tab==='tasbih'){const n=Number(tasbih.counts[tasbih.selected]||0);updateTop('Tasbih · '+n+' / '+tasbih.target,n,tasbih.target);return;}
 if(tab==='hisnul'||tab==='duas'){updateTop('Hisnul Muslim · '+(allDuas.filter(x=>x.category==='Hisnul Muslim').length||0)+' prayers',allDuas.filter(x=>x.reviewStatus==='approved-by-project-owner').length,261);return;}
 if(ramadan.enabled){const d=dayData();updateTop('Ramadan Quran goal · '+d.ayat.length+' / '+ramadan.goal,d.ayat.length,ramadan.goal);return;}
 updateTop('Your reading companion',0,1);
}
function classify(d){
 if(d.category!=='Hisnul Muslim')return 'Quranic Duas';
 const t=(String(d.subtitle||'')+' '+String(d.source||'')).toLowerCase();
 if(/morning|evening|sunrise|sunset|dawn|daybreak/.test(t))return 'Morning & Evening';
 if(/sleep|bed|waking|dream|nightmare/.test(t))return 'Sleep & Waking';
 if(/salah|prayer|tash|adhan|wudu|ablution|masjid|mosque|prostrat|ruku|sujood|istikharah|salat|bowing/.test(t))return 'Prayer & Worship';
 if(/food|eat|drink|home|house|toilet|bathroom|dress|clothes|garment|meal|guest|market/.test(t))return 'Food & Home';
 if(/travel|journey|vehicle|mount|road|rain|thunder|wind|storm/.test(t))return 'Travel & Outdoors';
 if(/husband|wife|marri|child|parent|family|relative|bride|groom|newborn/.test(t))return 'Family & Relationships';
 if(/ill|sick|heal|protect|evil|trouble|distress|anxiety|sorrow|fear|pain|enemy|calamit|disease|danger/.test(t))return 'Protection & Healing';
 if(/forgiven|forgiv|repent|guidance|guid|pardon|mercy|sincere|sin|righteous/.test(t))return 'Forgiveness & Guidance';
 return 'Other Occasions';
}
function visibleDuas(section){
 const q=duaQuery.trim().toLocaleLowerCase();
 const base=allDuas.filter(d=>(section==='hisnul'?d.category==='Hisnul Muslim':true)&&
  (duaCategory==='All duas'||classify(d)===duaCategory)&&
  (!q||[d.id,d.title,d.subtitle,d.source,d.arabic,d.kashmiri].some(v=>String(v||'').toLocaleLowerCase().includes(q))));
 return base;
}
function labelFor(d){if(d.category==='Hisnul Muslim')return d.subtitle||'Hisnul Muslim supplication';return d.subtitle||d.title;}
function renderDuaCard(d){
 const expanded=openDuas.has(d.id);
 const owner=d.reviewStatus==='approved-by-project-owner';
 return '<article class="hm-card '+(expanded?'expanded':'')+'"><div class="hm-main">'+
 '<div class="hm-topline"><span class="hm-index">'+(d.category==='Hisnul Muslim'?'HISNUL MUSLIM · '+html(String(d.id).replace('hisnul-','')):html(d.source||'Quranic Dua'))+'</span><span class="hm-review '+(owner?'reviewed':'draft')+'">'+(owner?'Owner-reviewed translation':'Translation draft')+'</span></div>'+
 '<h3>'+html(labelFor(d))+'</h3><div class="hm-native" dir="rtl" lang="ks-Arab">'+html(d.title)+'</div><div class="hm-category-label">'+html(classify(d))+'</div>'+
 '<button type="button" class="hm-expand" data-hm-open="'+html(d.id)+'" aria-expanded="'+expanded+'">'+(expanded?'Hide prayer':'Read this dua')+' '+icon(expanded?'left':'arrow')+'</button></div>'+
 (expanded?'<div class="hm-detail"><p class="hm-arabic" lang="ar" dir="rtl">'+html(d.arabic||'')+'</p><div class="hm-label">KASHMIRI TRANSLATION</div><p class="hm-kashmiri" dir="rtl" lang="ks-Arab">'+html(d.kashmiri||'Translation is not available')+'</p><div class="hm-foot"><small>'+html(d.source||'')+'</small><button type="button" class="hm-copy" data-hm-copy="'+html(d.id)+'">'+icon('copy')+' Copy</button></div>'+(owner?'':'<p class="hm-review-note">This wording is a draft awaiting complete owner review. Please verify before relying on it as a translation.</p>')+'</div>':'')+'</article>';
}
function renderDuas(section){
 const hisnul=allDuas.filter(d=>d.category==='Hisnul Muslim').length;
 const view=visibleDuas(section);
 const total=section==='hisnul'?hisnul:allDuas.length;
 return '<section class="features-page hm-page">'+
 '<div class="feature-titlebar"><div><span class="feature-kicker">كِتَابُ الأَذْكَارِ · YOUR SUPPLICATION LIBRARY</span><h1>'+(section==='hisnul'?'Hisnul Muslim':'Duas for every moment')+'</h1><p>'+(section==='hisnul'?'The Fortress of the Muslim · searchable Arabic and Kashmiri translations from your original project.':'Explore Quranic supplications and the complete Hisnul Muslim collection, organized for real life.')+'</p></div><span class="feature-emblem">۞</span></div>'+
 '<div class="hm-overview"><div><strong>'+total+'</strong><span>supplications</span></div><div><strong>184</strong><span>owner-reviewed entries</span></div><div><strong>'+categories.length+'</strong><span>purpose filters</span></div></div>'+
 '<div class="hm-controls"><label class="hm-search">'+icon('search')+'<input id="hm-search" type="search" autocomplete="off" value="'+html(duaQuery)+'" placeholder="Search morning, travel, Arabic, Kashmiri or number..." aria-label="Search duas"></label><button class="btn btn-outline" data-nav="'+(section==='hisnul'?'duas':'hisnul')+'">'+(section==='hisnul'?'All duas':'Hisnul Muslim')+' '+icon('arrow')+'</button></div>'+
 '<div class="hm-categories" role="group" aria-label="Dua purpose">'+categories.map(c=>'<button type="button" data-hm-category="'+html(c)+'" class="hm-chip'+(duaCategory===c?' active':'')+'" aria-pressed="'+(duaCategory===c)+'">'+html(c)+'</button>').join('')+'</div>'+
 '<p class="hm-results" id="hm-result-count">'+view.length+' matching duas · Showing '+Math.min(view.length,duaLimit)+'</p>'+
 '<div class="hm-list" id="hm-list">'+(loading?'<div class="empty">Loading your original Hisnul Muslim translations…</div>':error?'<div class="empty">'+html(error)+'</div>':view.length?view.slice(0,duaLimit).map(renderDuaCard).join(''):'<div class="empty"><strong>No matching duas</strong>Try a different word or category.</div>')+'</div>'+
 (view.length>duaLimit?'<button type="button" class="hm-more btn btn-outline" data-hm-more>Show more duas ('+(view.length-duaLimit)+' left) '+icon('arrow')+'</button>':'')+
 '<p class="hm-source-note">Translations are taken from your existing Koshur Noor / Hisnul Muslim project. Entries 78–261 were approved for language wording by the project owner; entries 1–77 and additional Quranic duas are clearly marked as drafts. Owner approval is not independent religious verification or rights clearance.</p></section>';
}
function filterDuasInPlace(){
 if(!api||!['duas','hisnul'].includes(api.state.tab))return;
 const box=document.getElementById('hm-list');
 const view=visibleDuas(api.state.tab);
 if(box)box.innerHTML=view.length?view.slice(0,duaLimit).map(renderDuaCard).join(''):'<div class="empty"><strong>No matching duas</strong>Try a different word or category.</div>';
 const num=document.getElementById('hm-result-count');if(num)num.textContent=view.length+' matching duas · Showing '+Math.min(view.length,duaLimit);
 const more=document.querySelector('[data-hm-more]');if(more)more.remove();
 if(view.length>duaLimit&&box)box.insertAdjacentHTML('afterend','<button type="button" class="hm-more btn btn-outline" data-hm-more>Show more duas ('+(view.length-duaLimit)+' left) '+icon('arrow')+'</button>');
 document.querySelectorAll('[data-hm-category]').forEach(b=>{b.classList.toggle('active',b.dataset.hmCategory===duaCategory);b.setAttribute('aria-pressed',String(b.dataset.hmCategory===duaCategory));});
}
function getTasbihCount(){return Math.max(0,Number(tasbih.counts[tasbih.selected])||0);}
function drawTasbih(){
 const w=countId(),n=getTasbihCount(),p=percent(n,tasbih.target);
 return '<section class="features-page tasbih-page"><div class="feature-titlebar"><div><span class="feature-kicker">YOUR DAILY DHIKR</span><h1>A moment of remembrance</h1><p>A peaceful digital tasbih to keep your dhikr intentional. Your counter stays on this device.</p></div><span class="feature-emblem">۞</span></div>'+
 '<section class="tasbih-layout"><div class="tasbih-main"><p class="tasbih-overline">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><div class="tasbih-ring" id="tasbih-ring" style="--ring-progress:'+p+'%"><button type="button" class="tasbih-tap" data-tasbih-tap aria-label="Count one '+html(w.en)+'"><span class="tasbih-tap-mini">TAP TO COUNT</span><strong id="tasbih-count">'+n+'</strong><small>of '+tasbih.target+'</small><span class="tasbih-hand">'+icon('star')+'</span></button></div><div class="tasbih-phrase" lang="ar" dir="rtl">'+html(w.ar)+'</div><div class="tasbih-en">'+html(w.meaning)+'</div><div class="tasbih-controls"><button type="button" class="btn btn-outline" data-tasbih-undo>− Undo</button><button type="button" class="btn btn-outline" data-tasbih-reset>Reset counter</button></div></div>'+
 '<aside class="tasbih-options"><div class="feature-sidebar-label">CHOOSE YOUR DHIKR</div>'+words.map(w=>'<button type="button" class="tasbih-word'+(tasbih.selected===w.id?' active':'')+'" data-tasbih-select="'+w.id+'"><span lang="ar" dir="rtl">'+html(w.ar)+'</span><small>'+html(w.en)+'</small></button>').join('')+'<div class="feature-sidebar-label" style="margin-top:24px">DAILY TARGET</div><div class="tasbih-targets">'+[33,99,100].map(n=>'<button type="button" data-tasbih-target="'+n+'" class="'+(tasbih.target===n?'active':'')+'">'+n+'</button>').join('')+'</div><div class="tasbih-tip">Tip: You can count by tapping the circle or pressing the spacebar when no input is focused.</div></aside></section></section>';
}
function updateTasbihVisual(){
 const n=getTasbihCount(),v=document.getElementById('tasbih-count'),ring=document.getElementById('tasbih-ring');
 if(v)v.textContent=n;if(ring)ring.style.setProperty('--ring-progress',percent(n,tasbih.target)+'%');updateProgress();
}
function renderRamadan(){
 const d=dayData();const done=tasks.filter(t=>t.id==='quran'?d.ayat.length>=ramadan.goal:!!d.tasks[t.id]).length;
 const p=percent(done,tasks.length);
 const mode=ramadan.enabled;
 return '<section class="features-page ramadan-page"><div class="feature-titlebar"><div><span class="feature-kicker">A SEASON OF INTENTION</span><h1>Ramadan Companion <span class="ramadan-star">✦</span></h1><p>Your personal space for Quran goals, worship reminders, and mindful progress. Available throughout the year.</p></div><span class="feature-emblem">☾</span></div>'+
 '<section class="ramadan-banner"><div><div class="ramadan-intro">رَمَضَان كَرِيم</div><h2>Make every day meaningful.</h2><p>Activate the special Ramadan palette and build a consistent daily routine.</p><button type="button" class="btn btn-primary" data-ramadan-mode>'+icon(mode?'check':'moon')+(mode?'Ramadan mode enabled':'Enable Ramadan mode')+'</button></div><div class="ramadan-crescent">☪</div></section>'+
 '<div class="ramadan-stats"><article><span>QURAN TODAY</span><strong>'+d.ayat.length+' <small>/ '+ramadan.goal+' ayahs</small></strong><div class="ramadan-stat-line"><div style="width:'+percent(d.ayat.length,ramadan.goal)+'%"></div></div></article><article><span>DAILY INTENTIONS</span><strong>'+done+' <small>/ '+tasks.length+' complete</small></strong><div class="ramadan-stat-line"><div style="width:'+p+'%"></div></div></article></div>'+
 '<section class="ramadan-tasks"><div class="ramadan-heading"><div><h3>Your daily worship plan</h3><p>Resets for each local calendar day. This is your own checklist, not a fasting or prayer-time tracker.</p></div><label>Quran goal <select id="ramadan-goal" class="select-field" aria-label="Daily Quran ayah goal">'+[5,10,20,30,50].map(n=>'<option value="'+n+'"'+(ramadan.goal===n?' selected':'')+'>'+n+' ayahs</option>').join('')+'</select></label></div>'+
 tasks.map(t=>{const checked=t.id==='quran'?d.ayat.length>=ramadan.goal:!!d.tasks[t.id];return '<button type="button" class="ramadan-task'+(checked?' checked':'')+'" data-ramadan-task="'+t.id+'"'+(t.id==='quran'?' data-nav="quran"':'')+'><span class="ramadan-checkbox">'+(checked?icon('check'):'')+'</span><span><strong>'+html(t.label)+'</strong><small>'+html(t.detail)+'</small></span><span class="ramadan-task-next">'+icon('chevron')+'</span></button>';}).join('')+
 '<div class="ramadan-footer"><button type="button" class="btn btn-green" data-nav="quran">'+icon('book')+' Read Quran</button><button type="button" class="btn btn-outline" data-nav="tasbih">'+icon('star')+' Open Tasbih</button><button type="button" class="btn btn-outline" data-nav="duas">'+icon('heart')+' Browse Duas</button></div></section></section>';
}
function markAyah(surah,ayah){
 if(!ramadan.enabled||!Number.isInteger(Number(ayah)))return;
 const d=dayData(),ref=surah+':'+ayah;
 if(!d.ayat.includes(ref)){d.ayat.push(ref);if(d.ayat.length>300)d.ayat=d.ayat.slice(-300);save('ramadan',ramadan);if(api?.state.tab==='ramadan')api.render();else updateProgress();}
}
async function getJson(url){
 const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),14000);
 try{const res=await fetch(url,{signal:ctrl.signal});if(!res.ok)throw new Error('HTTP '+res.status);const data=await res.json();if(!Array.isArray(data))throw new Error('Invalid chapter data');return data;}finally{clearTimeout(timer);}
}
async function quranData(surah,translator){
 const suffix=String(surah).padStart(3,'0')+'.json';
 const path=translator===null?'verses/'+suffix:'translations/'+translator+'/'+suffix;
 if(!cache.has(path)){
  const p=(async()=>{let last;const urls=(surah===1?[(ROOT+'fallback/'+(translator===null?'arabic-001.json':translator+'-001.json'))]:[]).concat([source+path,fallback+path]);for(const url of urls){try{return await getJson(url);}catch(e){last=e;}}throw last||new Error('Unable to load chapter');})();
  cache.set(path,p);p.catch(()=>cache.delete(path));
 }
 return cache.get(path);
}
async function loadCards(){
 if(!api)return;
 const meta=api.findSurah(cards.surah);if(!meta)return;
 cards.loading=true;cards.error=null;cards.items=[];api.render();
 try{
  const [verses,translated]=await Promise.all([quranData(cards.surah,null),quranData(cards.surah,cards.translator)]);
  const map=new Map(translated.map(x=>[Number(x.verse_id),x.translation]));
  const selected=verses.slice(0,cards.count===0?verses.length:cards.count);
  cards.items=selected.map((v,i)=>({id:cards.surah+':'+(i+1),arabic:v.verse_content,translation:map.get(Number(v.verse_id))||'Translation unavailable'}));
  cards.index=0;cards.revealed=false;cards.known={};cards.loading=false;api.render();
 }catch(e){cards.error='Could not load these cards. Please check your connection.';cards.loading=false;api.render();}
}
function cardFace(){
 const c=cards.items[cards.index];
 if(!c)return '<div class="empty">Choose a Surah and start a session.</div>';
 const backs=cards.revealed;
 return '<button type="button" class="flashcard'+(backs?' is-flipped':'')+'" data-flash-flip aria-label="'+(backs?'Show Arabic':'Reveal Kashmiri translation')+'" aria-pressed="'+backs+'">'+
 '<span class="flashcard-ornament">۞</span><span class="flashcard-overline">'+(backs?'KASHMIRI MEANING':'ORIGINAL QURANIC VERSE')+'</span>'+
 '<span class="flashcard-main" dir="rtl" lang="'+(backs?'ks-Arab':'ar')+'">'+html(backs?c.translation:c.arabic)+'</span>'+
 '<span class="flashcard-bottom"><span>QURAN '+html(c.id)+'</span><span>'+(backs?'TAP TO SEE ARABIC':'TAP TO REVEAL')+' ↻</span></span></button>';
}
function quranBar(){
 return '<div class="quran-study-switch" role="group" aria-label="Quran reading mode"><div><button type="button" class="'+(quranMode==='read'?'active':'')+'" data-quran-view="read" aria-pressed="'+(quranMode==='read')+'">'+icon('book')+' Read Quran</button><button type="button" class="'+(quranMode==='cards'?'active':'')+'" data-quran-view="cards" aria-pressed="'+(quranMode==='cards')+'">'+icon('layers')+' Flashcards</button></div><span>Read · Learn · Reflect</span></div>';
}
function setQuranMode(mode){quranMode=mode==='cards'?'cards':'read';}
function isFlashcards(){return quranMode==='cards';}
function renderFlashcards(){
 const meta=api.findSurah(cards.surah),total=cards.items.length;
 const studied=Object.keys(cards.known).length,known=Object.values(cards.known).filter(Boolean).length;
 return '<section class="features-page flash-page"><div class="feature-titlebar"><div><span class="feature-kicker">LEARN · RECALL · REFLECT</span><h1>Quran Verse Flashcards</h1><p>Memorize and reflect with real Arabic verses and your choice of Kashmiri translations. Flip each card to reveal the meaning.</p></div><span class="feature-emblem">✧</span></div>'+
 '<div class="flash-controls"><label>Surah<select id="flash-surah" class="select-field" aria-label="Choose Surah">'+api.state.surahs.map(s=>'<option value="'+s.surah_id+'"'+(cards.surah===s.surah_id?' selected':'')+'>'+s.surah_id+'. '+html(s.name_en)+'</option>').join('')+'</select></label>'+
 '<label>Translation<select id="flash-translator" class="select-field" aria-label="Flashcard translation"><option value="300"'+(cards.translator===300?' selected':'')+'>Athar Manigami</option><option value="301"'+(cards.translator===301?' selected':'')+'>Mirwaiz Yousuf Shah</option></select></label>'+
 '<label>Deck size<select id="flash-count" class="select-field" aria-label="Deck size">'+[10,20,0].map(n=>'<option value="'+n+'"'+(cards.count===n?' selected':'')+'>'+(n===0?'Entire Surah':n+' cards')+'</option>').join('')+'</select></label>'+
 '<button type="button" class="btn btn-green" data-flash-load>'+icon('layers')+' '+(cards.items.length?'New session':'Start flashcards')+'</button></div>'+
 (cards.loading?'<div class="content-loading"><span class="spinner"></span><p>Preparing your verse flashcards…</p></div>':cards.error?'<div class="empty">'+html(cards.error)+'<button type="button" data-flash-load class="btn btn-green">Retry</button></div>':
 '<div class="flash-study"><div class="flash-progress-label"><span>'+(total?'Card '+(cards.index+1)+' of '+total:'Ready when you are')+'</span><span>'+studied+' reviewed · '+known+' known</span></div>'+
 '<div class="flash-progress-track"><span style="width:'+percent(total?cards.index+1:0,total||1)+'%"></span></div>'+cardFace()+
 (total?'<div class="flash-actions"><button type="button" class="btn btn-outline" data-flash-prev'+(cards.index===0?' disabled':'')+'>'+icon('left')+' Previous</button>'+
 '<button type="button" class="flash-rate missed" data-flash-rate="missed">'+icon('left')+' Review again</button><button type="button" class="flash-rate known" data-flash-rate="known">'+icon('check')+' I know this</button>'+
 '<button type="button" class="btn btn-outline" data-flash-next'+(cards.index>=total-1?' disabled':'')+'>Next '+icon('arrow')+'</button></div>':'')+
 '</div>')+
 '<p class="hm-source-note">These cards show actual Quran verses and real Kashmiri translations from the credited Kaeshur Quran dataset. Your session progress stays local to this browser.</p></section>';
}
function homeAddon(){
 const d=dayData();
 return (prayer?prayer.homeWidget():'')+'<div class="section-header"><div><span class="section-eyebrow">A LITTLE MORE EVERY DAY</span><h2>Your spiritual toolkit</h2><p>Explore little rituals that fit your day.</p></div></div>'+
 '<div class="feature-shortcuts"><button type="button" data-quran-view="cards"><span class="shortcut-symbol">✦</span><strong>Study Quran as Flashcards</strong><small>Inside the Quran reader</small></button>'+
 '<button type="button" data-nav="hisnul"><span class="shortcut-symbol">۞</span><strong>Hisnul Muslim</strong><small>261 duas in Kashmiri</small></button>'+
 '<button type="button" data-nav="tasbih"><span class="shortcut-symbol">◉</span><strong>Digital Tasbih</strong><small>Remember & count dhikr</small></button>'+
 '<button type="button" data-nav="ramadan"><span class="shortcut-symbol">☾</span><strong>Ramadan Companion</strong><small>'+d.ayat.length+' ayahs toward today’s goal</small></button></div>';
}
function settingsAddon(){
 return (prayer?prayer.settingsAddon():'')+'<article class="panel settings-panel"><h3>Ramadan companion</h3><p class="panel-description">Activate a warm gold Ramadan look and optional daily worship tracker. It does not automatically determine Ramadan dates or prayer times.</p>'+
 '<div class="setting-row"><div><strong>Ramadan mode</strong><small>Turn the festive appearance and daily Quran goal on or off.</small></div><button type="button" role="switch" aria-label="Ramadan mode" aria-checked="'+ramadan.enabled+'" class="toggle" data-ramadan-mode></button></div>'+
 '<div class="setting-row"><div><strong>Quick access</strong><small>Open the personal Ramadan checklist and Tasbih counter.</small></div><button type="button" class="btn btn-outline" data-nav="ramadan">Open companion '+icon('arrow')+'</button></div></article>';
}
function render(tab){if(tab==='duas'||tab==='hisnul')return renderDuas(tab);if(tab==='tasbih')return drawTasbih();if(tab==='ramadan')return renderRamadan();if(tab==='flashcards')return renderFlashcards();if(tab==='prayers')return prayer?prayer.render():'<div class="empty">Prayer times unavailable.</div>';return '';}
async function init(){
 try{const r=await fetch(ROOT+'hisnul-duas.json');if(!r.ok)throw new Error('HTTP '+r.status);const d=await r.json();if(!Array.isArray(d)||d.length<261)throw new Error('Invalid Hisnul Muslim data');allDuas=d;loading=false;}catch(e){loading=false;error='The dua library is temporarily unavailable. Please reload to retry.';}
 if(api&&['duas','hisnul'].includes(api.state.tab))api.render();
}
function attach(data){
 api=data;
 if(prayer)prayer.attach(data);
 if(!tasbih||typeof tasbih!=='object')tasbih={selected:'subhanallah',target:33,counts:{}};
 if(!tasbih.counts||typeof tasbih.counts!=='object')tasbih.counts={};
 if(!ramadan||typeof ramadan!=='object')ramadan={enabled:false,goal:10,days:{}};
 if(!ramadan.days||typeof ramadan.days!=='object')ramadan.days={};
 if(![5,10,20,30,50].includes(ramadan.goal))ramadan.goal=10;
 document.body.classList.toggle('ramadan-mode',ramadan.enabled);
 init();updateProgress();
}
document.addEventListener('click',async function(e){
 const b=e.target.closest('button');if(!b||!api)return;
 if((b.dataset.nav==='duas'||b.dataset.nav==='hisnul')&&api.state.tab!==b.dataset.nav){duaQuery='';duaCategory='All duas';duaLimit=16;openDuas.clear();}
 if(b.dataset.quranView){
   if(b.dataset.quranView==='cards'){
     cards.surah=api.state.selected||api.state.lastRead.surah||1;
     cards.translator=[300,301].includes(Number(api.state.prefs.translator))?Number(api.state.prefs.translator):300;
     quranMode='cards';
     if(api.state.tab==='quran')api.render();else api.navigate('quran',true);
   }else{
     quranMode='read';
     if(api.state.tab==='quran')api.render();else api.navigate('quran',true);
   }
   return;
 }
 if(b.id==='mobile-more'){const side=document.getElementById('sidebar'),overlay=document.getElementById('backdrop');side.classList.toggle('open');overlay.hidden=!side.classList.contains('open');document.getElementById('menu-toggle').setAttribute('aria-expanded',String(side.classList.contains('open')));return;}
 if(b.dataset.hmCategory){duaCategory=b.dataset.hmCategory;duaLimit=16;filterDuasInPlace();return;}
 if(b.dataset.hmMore!==undefined){duaLimit+=16;filterDuasInPlace();return;}
 if(b.dataset.hmOpen){const id=b.dataset.hmOpen;openDuas.has(id)?openDuas.delete(id):openDuas.add(id);filterDuasInPlace();return;}
 if(b.dataset.hmCopy){const d=allDuas.find(x=>x.id===b.dataset.hmCopy);if(!d)return;try{await navigator.clipboard.writeText([d.arabic,d.kashmiri,d.source].filter(Boolean).join('\n\n'));api.toast('Dua copied');}catch(err){api.toast('Copy not available');}return;}
 if(b.dataset.tasbihSelect){tasbih.selected=b.dataset.tasbihSelect;save('tasbih',tasbih);api.render();return;}
 if(b.dataset.tasbihTarget){tasbih.target=Number(b.dataset.tasbihTarget);save('tasbih',tasbih);api.render();return;}
 if(b.hasAttribute('data-tasbih-tap')){tasbih.counts[tasbih.selected]=getTasbihCount()+1;save('tasbih',tasbih);updateTasbihVisual();if(navigator.vibrate)navigator.vibrate(12);if(getTasbihCount()===tasbih.target)api.toast('Your dhikr target is complete');return;}
 if(b.hasAttribute('data-tasbih-undo')){tasbih.counts[tasbih.selected]=Math.max(0,getTasbihCount()-1);save('tasbih',tasbih);updateTasbihVisual();return;}
 if(b.hasAttribute('data-tasbih-reset')){if(confirm('Reset this dhikr counter to zero?')){tasbih.counts[tasbih.selected]=0;save('tasbih',tasbih);api.render();}return;}
 if(b.hasAttribute('data-ramadan-mode')){ramadan.enabled=!ramadan.enabled;save('ramadan',ramadan);document.body.classList.toggle('ramadan-mode',ramadan.enabled);api.render();api.toast(ramadan.enabled?'Ramadan companion mode enabled':'Ramadan mode disabled');return;}
 if(b.dataset.ramadanTask){if(b.dataset.ramadanTask==='quran')return;const d=dayData();d.tasks[b.dataset.ramadanTask]=!d.tasks[b.dataset.ramadanTask];save('ramadan',ramadan);api.render();return;}
 if(b.hasAttribute('data-flash-load')){cards.surah=Number(document.getElementById('flash-surah')?.value||cards.surah);cards.translator=Number(document.getElementById('flash-translator')?.value||cards.translator);cards.count=Number(document.getElementById('flash-count')?.value??cards.count);await loadCards();return;}
 if(b.hasAttribute('data-flash-flip')){cards.revealed=!cards.revealed;api.render();return;}
 if(b.hasAttribute('data-flash-prev')){if(cards.index>0){cards.index--;cards.revealed=false;api.render();}return;}
 if(b.hasAttribute('data-flash-next')){if(cards.index<cards.items.length-1){cards.index++;cards.revealed=false;api.render();}return;}
 if(b.dataset.flashRate){const c=cards.items[cards.index];if(c){cards.known[c.id]=b.dataset.flashRate==='known';if(cards.index<cards.items.length-1){cards.index++;cards.revealed=false;}else{cards.revealed=true;api.toast('Deck complete · '+Object.values(cards.known).filter(Boolean).length+' verses known');}api.render();}return;}
});
document.addEventListener('input',e=>{if(e.target.id==='hm-search'){duaQuery=e.target.value;duaLimit=16;filterDuasInPlace();}});
document.addEventListener('change',e=>{if(e.target.id==='ramadan-goal'){ramadan.goal=Number(e.target.value);save('ramadan',ramadan);api.render();}});
document.addEventListener('keydown',e=>{if(!api||api.state.tab!=='tasbih'||e.code!=='Space'||['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement.tagName))return;e.preventDefault();const btn=document.querySelector('[data-tasbih-tap]');if(btn)btn.click();});
window.KoshurExtras={attach,render,renderDuas,homeAddon,settingsAddon,updateProgress,markAyah,quranBar,isFlashcards,setQuranMode};
})();
