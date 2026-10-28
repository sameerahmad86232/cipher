(() => {
  'use strict';
  const ROOT = '/quran-app/';
  const SOURCE_REV = '5515d1ee652300924065a5f5c16f49b63c2d5a79';
  const SOURCE = 'izan-majeed/kaeshur-quran-data';
  const CDN = 'https://cdn.jsdelivr.net/gh/' + SOURCE + '@' + SOURCE_REV + '/kaeshur_quran/';
  const RAW = 'https://raw.githubusercontent.com/' + SOURCE + '/' + SOURCE_REV + '/kaeshur_quran/';
  const KEY = 'koshur-quran-v1:';
  const translations = [
    {id:300,label:'Kashmiri · Athar Manigami',short:'Athar Manigami',lang:'ks'},
    {id:301,label:'Kashmiri · Mirwaiz Yousuf Shah',short:'Mirwaiz M. Yousuf Shah',lang:'ks'},
    {id:20,label:'English · Saheeh International',short:'Saheeh International',lang:'en'},
    {id:400,label:'Roman Kashmiri · Athar Manigami',short:'Athar Manigami · Roman',lang:'en'},
    {id:401,label:'Roman Kashmiri · Mirwaiz Yousuf Shah',short:'Mirwaiz · Roman',lang:'en'},
    {id:234,label:'Urdu · Fatah M. Jalandhari',short:'Fatah Muhammad Jalandhari',lang:'ks'}
  ];
  const collections = [
    {name:'Sahih al-Bukhari',arabic:'صحيح البخاري',description:'A foundational collection of Prophetic narrations, arranged by topics including faith, knowledge and worship.',url:'https://sunnah.com/bukhari'},
    {name:'Sahih Muslim',arabic:'صحيح مسلم',description:'Explore authenticated narrations and the teaching of the Prophet ﷺ by subject.',url:'https://sunnah.com/muslim'},
    {name:'Riyad as-Salihin',arabic:'رياض الصالحين',description:'An approachable collection on everyday conduct, worship, sincerity and character.',url:'https://sunnah.com/riyadussalihin'},
    {name:'Forty Hadith of an-Nawawi',arabic:'الأربعون النووية',description:'A compact introduction to essential teachings, ethics and the pillars of Islam.',url:'https://sunnah.com/nawawi40'}
  ];
  const duas = [
    {ref:'2:201',title:'Good in this life & the next',description:'Ask Allah for goodness in both worlds.'},
    {ref:'20:114',title:'Increase in knowledge',description:'A beautiful supplication for learning and understanding.'},
    {ref:'21:87',title:'In times of difficulty',description:'The prayer of Prophet Yunus, seeking mercy.'},
    {ref:'3:8',title:'Keep our hearts firm',description:'Ask for steadfastness and mercy after guidance.'},
    {ref:'25:74',title:'For your family',description:'Pray for comfort in family and righteous leadership.'},
    {ref:'28:24',title:'When in need',description:'A humble prayer for the goodness Allah sends.'}
  ];
  const paths = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    layers:'<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>',
    settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-1.9 1.9-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21h-3v-1.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1-1.9-1.9.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H5v-3h1.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1 1.9-1.9.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4h3v1.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1 1.9 1.9-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1H21v3h-1.1a1.6 1.6 0 0 0-1.5 1z"/>',
    bookmark:'<path d="M6 3h12v18l-6-4-6 4V3z"/>',
    scroll:'<path d="M7 3h11a3 3 0 0 1 3 3v15H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"/><path d="M7 3v14a4 4 0 0 0 4 4"/><path d="M11 8h6M11 12h6"/>',
    external:'<path d="M12 5h7v7"/><path d="m19 5-9 9"/><path d="M19 14v5H5V5h5"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    left:'<path d="m15 18-6-6 6-6"/>',
    star:'<path d="m12 2 2.9 6.1L22 9.2l-5 4.9 1.2 7-6.2-3.3-6.2 3.3 1.2-7-5-4.9 7.1-1.1z"/>',
    copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    check:'<path d="m4 12 5 5 11-11"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon:'<path d="M20.9 13.1A9 9 0 0 1 10.9 3.1 9 9 0 1 0 20.9 13.1z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    volume:'<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4"/><path d="M5 17v4h14v-4"/>'
  };
  function icon(name){return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name]||paths.star)+'</svg>';}
  function injectIcons(node){(node||document).querySelectorAll('[data-icon]').forEach(function(el){el.innerHTML=icon(el.dataset.icon);});}
  function escapeHtml(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function store(key,value){try{localStorage.setItem(KEY+key,JSON.stringify(value));}catch(_){}}
  function restore(key,fallback){try{const value=JSON.parse(localStorage.getItem(KEY+key));return value===null?fallback:value;}catch(_){return fallback;}}
  const defaults={translator:300,scale:1,showTranslation:true,dark:false};
  const savedPrefs=restore('preferences',{});
  const state={
    tab:'home',surahs:[],selected:null,activeAyah:null,query:'',
    prefs:Object.assign({},defaults,savedPrefs),
    bookmarks:restore('bookmarks',[]),
    lastRead:restore('lastRead',{surah:1,ayah:1}),
    loading:false,error:null,chapter:null,chapterTranslation:null,duasOpen:{}
  };
  if(!Array.isArray(state.bookmarks)) state.bookmarks=[];
  if(!Number.isFinite(Number(state.prefs.scale))) state.prefs.scale=1;
  const content=document.getElementById('content');
  const chapterCache=new Map();
  let observer=null,requestNumber=0,toastTimer=null;
  function pad(n){return String(n).padStart(3,'0');}
  function findSurah(id){return state.surahs.find(function(s){return Number(s.surah_id)===Number(id);});}
  function refParts(ref){const m=/^(\d{1,3}):(\d{1,3})$/.exec(String(ref));if(!m)return null;const s=Number(m[1]),v=Number(m[2]),meta=findSurah(s);return meta&&v>0&&v<=meta.verses_count?{surah:s,ayah:v}:null;}
  function selectedTranslation(){return translations.find(function(t){return t.id===Number(state.prefs.translator);})||translations[0];}
  function options(){return translations.map(function(t){return '<option value="'+t.id+'"'+(Number(state.prefs.translator)===t.id?' selected':'')+'>'+escapeHtml(t.label)+'</option>';}).join('');}
  function applyPreferences(){document.body.classList.toggle('dark',!!state.prefs.dark);document.documentElement.style.setProperty('--reading-scale',String(Math.max(.8,Math.min(1.5,Number(state.prefs.scale)||1))));}
  function toast(message){const node=document.getElementById('toast');node.textContent=message;node.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){node.classList.remove('show');},2600);}
  function updateBadge(){document.getElementById('bookmarks-count').textContent=String(state.bookmarks.length);}
  function setNav(tab){document.querySelectorAll('[data-nav]').forEach(function(el){const active=el.dataset.nav===tab;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});document.getElementById('current-section').textContent={home:'Home',quran:'Al-Quran',hadith:'Hadith',duas:'Duas',settings:'Settings',bookmarks:'Saved verses'}[tab]||'Home';}
  function closeMenu(){document.getElementById('sidebar').classList.remove('open');document.getElementById('backdrop').hidden=true;document.getElementById('menu-toggle').setAttribute('aria-expanded','false');}
  function navigate(tab,keepReader){if(!['home','quran','hadith','duas','settings','bookmarks'].includes(tab))tab='home';state.tab=tab;if(tab!=='quran'||!keepReader){if(tab==='quran')state.selected=null;}state.error=null;closeMenu();setNav(tab);history.replaceState(null,'',location.pathname+location.search+'#'+tab);render();window.scrollTo({top:0,behavior:'instant'});}
  function heading(title,description,label){return '<div class="page-heading"><span class="section-eyebrow">'+escapeHtml(label||'DISCOVER')+'</span><h1>'+escapeHtml(title)+'</h1><p>'+escapeHtml(description)+'</p></div>';}
  function btnNav(label,tab,cls,ic){return '<button type="button" class="btn '+cls+'" data-nav="'+tab+'">'+(ic?icon(ic):'')+escapeHtml(label)+'</button>';}
  function renderHome(){
    const last=findSurah(state.lastRead.surah)||state.surahs[0];
    const lastTitle=last?escapeHtml(last.name_en)+' · '+Number(state.lastRead.ayah):'Al-Fatihah · 1';
    return '<section class="hero"><div class="hero-content"><span class="hero-pill">✦ &nbsp; YOUR DAILY SPIRITUAL COMPANION</span><h1>Closer to the <em>Qur\'an,</em><br>closer to home.</h1><p class="subtext">Discover the words of Allah with beautiful Arabic text and Kashmiri translations. A peaceful space to read, reflect, and grow.</p><div class="hero-buttons"><button type="button" class="btn btn-primary" data-continue>'+icon('book')+'Start Reading '+icon('arrow')+'</button>'+btnNav('Explore Quran','quran','btn-ghost')+'</div></div><div class="hero-art"><div class="hero-art-circle"><div class="hero-arabic">بِسْمِ اللَّهِ<br>الرَّحْمَٰنِ الرَّحِيمِ<small>IN THE NAME OF ALLAH</small></div></div></div></section>'+
    '<section class="stat-row" aria-label="Quran collection facts"><div class="stat-card"><div class="stat-icon">'+icon('book')+'</div><div class="stat-text"><strong>114</strong><span>Surahs</span></div></div><div class="stat-card"><div class="stat-icon">'+icon('star')+'</div><div class="stat-text"><strong>6,236</strong><span>Ayahs</span></div></div><div class="stat-card"><div class="stat-icon">'+icon('globe')+'</div><div class="stat-text"><strong>2</strong><span>Kashmiri editions</span></div></div></section>'+
    '<div class="section-header"><div><span class="section-eyebrow">WELCOME BACK</span><h2>Pick up where you left off</h2></div></div><section class="reading-strip"><span class="stat-icon">'+icon('bookmark')+'</span><div style="flex:1"><h3>'+lastTitle+'</h3><p>Your reading journey is waiting for you.</p></div><button type="button" class="btn btn-green" data-continue>Continue '+icon('arrow')+'</button></section>'+
    '<div class="section-header"><div><span class="section-eyebrow">EXPLORE THE LIBRARY</span><h2>What would you like to read?</h2><p>Made for moments of learning and reflection.</p></div></div>'+
    '<section class="cards-grid"><button type="button" data-nav="quran" class="feature-card"><div class="feature-icon">'+icon('book')+'</div><div><h3>Read Al-Quran</h3><p>Every surah, with Kashmiri and Arabic side by side.</p></div><span class="feature-arrow">Explore chapters '+icon('arrow')+'</span></button>'+
    '<button type="button" data-nav="hadith" class="feature-card gold"><div class="feature-icon">'+icon('layers')+'</div><div><h3>Hadith collections</h3><p>Find trusted sources of Prophetic teachings.</p></div><span class="feature-arrow">Browse hadith '+icon('arrow')+'</span></button>'+
    '<button type="button" data-nav="duas" class="feature-card blue"><div class="feature-icon">'+icon('heart')+'</div><div><h3>Daily Duas</h3><p>Turn to the Qur\'an for heartfelt supplications.</p></div><span class="feature-arrow">Explore duas '+icon('arrow')+'</span></button></section>'+
    '<div class="section-header"><div><span class="section-eyebrow">A MOMENT TO REFLECT</span><h2>Wisdom for today</h2></div></div><section class="two-column"><article class="panel verse-spotlight"><span class="section-eyebrow">VERSE OF REFLECTION</span><div class="arabic-mini" lang="ar">فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</div><p>Indeed, with hardship comes ease.</p><div class="verse-ref">Surah Ash-Sharh · 94:5</div></article><article class="mini-seerah"><span class="tag">CONTINUE YOUR JOURNEY</span><h3 lang="ks-Arab">اَلرَّحِیقُ الْمَخْتُوم</h3><p>Explore the Seerah of Prophet Muhammad ﷺ in Kashmiri. Your existing chapters are preserved.</p><a class="section-action" href="/seerah/index.html">Read Kashmiri Seerah '+icon('arrow')+'</a></article></section>';
  }
  function renderSurahGrid(){
    const needle=state.query.trim().toLowerCase();
    const visible=state.surahs.filter(function(s){return !needle||[s.name_en,s.name_ar,s.meaning_en,s.surah_id].some(function(t){return String(t).toLowerCase().includes(needle);});});
    if(!visible.length)return '<div class="empty">'+icon('search')+'<strong>No surahs found</strong>Try another surah name or number.</div>';
    return '<div class="surah-grid">'+visible.map(function(s){
      return '<button type="button" class="surah-card" data-open="'+s.surah_id+'"><span class="surah-number"><span>'+s.surah_id+'</span></span><div class="surah-card-main"><h3>'+escapeHtml(s.name_en)+'</h3><p>'+escapeHtml(s.meaning_en)+' · '+s.revelation_place+'</p></div><div class="surah-ar" lang="ar">'+escapeHtml(s.name_ar)+'<small>'+s.verses_count+' verses</small></div></button>';
    }).join('')+'</div>';
  }
  function renderCatalog(){
    return heading('Explore the Holy Quran','Read all 114 chapters with authentic Arabic text and Kashmiri translations.','THE HOLY QURAN')+
    '<section class="search-line"><label class="search-input">'+icon('search')+'<input type="search" id="surah-search" placeholder="Search surah name, number or 2:255…" value="'+escapeHtml(state.query)+'" autocomplete="off" aria-label="Search surahs"></label><span class="filter-pill">114 Surahs · 6,236 Ayahs</span></section><div id="surah-results">'+renderSurahGrid()+'</div>';
  }
  function basePath(surah,translator){
    const file=pad(surah)+'.json';
    return translator===null?'verses/'+file:'translations/'+String(translator)+'/'+file;
  }
  function localPath(surah,translator){
    if(surah!==1)return null;
    return ROOT+'fallback/'+(translator===null?'arabic-001.json':String(translator)+'-001.json');
  }
  async function requestJson(url){
    const ctrl=new AbortController();
    const timeout=setTimeout(function(){ctrl.abort();},13000);
    try{const res=await fetch(url,{signal:ctrl.signal,mode:'cors'});if(!res.ok)throw new Error('HTTP '+res.status);const data=await res.json();if(!Array.isArray(data))throw new Error('Invalid Quran data');return data;}finally{clearTimeout(timeout);}
  }
  function loadPart(surah,translator){
    const key=basePath(surah,translator);
    if(chapterCache.has(key))return chapterCache.get(key);
    const promise=(async function(){
      const local=localPath(surah,translator);
      const urls=local?[local,CDN+key,RAW+key]:[CDN+key,RAW+key];
      let lastError;
      for(const url of urls){try{return await requestJson(url);}catch(error){lastError=error;}}
      throw lastError||new Error('Source unavailable');
    })();
    chapterCache.set(key,promise);
    promise.catch(function(){chapterCache.delete(key);});
    return promise;
  }
  function updateLast(surah,ayah){if(state.lastRead.surah===surah&&state.lastRead.ayah===ayah)return;state.lastRead={surah:surah,ayah:ayah};store('lastRead',state.lastRead);const meta=findSurah(surah),bar=document.getElementById('progress-fill');if(meta&&bar)bar.style.width=(100*ayah/meta.verses_count).toFixed(1)+'%';}
  function isSaved(key){return state.bookmarks.includes(key);}
  function renderReader(){
    const meta=findSurah(state.selected);
    if(!meta)return renderCatalog();
    const current=selectedTranslation();
    const top='<div class="reader-head"><button type="button" class="reader-back" data-back>'+icon('left')+' All Surahs</button><div class="reader-tools"><select class="select-field" id="reader-translation" data-setting="translator" aria-label="Select translation">'+options()+'</select><button type="button" class="icon-button" data-nav="settings" aria-label="Reading settings">'+icon('settings')+'</button></div></div>';
    const banner='<section class="chapter-banner"><div class="ar-title" lang="ar">'+escapeHtml(meta.name_ar)+'</div><h1>'+escapeHtml(meta.name_en)+'</h1><p>'+escapeHtml(meta.meaning_en)+' &nbsp; · &nbsp; '+meta.verses_count+' Ayahs &nbsp; · &nbsp; '+meta.revelation_place+'</p>'+(meta.surah_id!==1&&meta.surah_id!==9?'<div class="bismillah" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>':'')+'</section>';
    if(state.loading)return top+banner+'<div class="content-loading"><span class="spinner"></span><p>Loading Quran text and translation…</p></div>';
    if(state.error)return top+banner+'<div class="empty"><strong>Could not load this chapter</strong>Check your internet connection and try again.<p>'+escapeHtml(state.error)+'</p><button class="btn btn-green" data-retry>Retry loading</button></div>';
    if(!state.chapter||!state.chapterTranslation)return top+banner+'<div class="content-loading"><span class="spinner"></span><p>Preparing verses…</p></div>';
    const translationIndex=new Map(state.chapterTranslation.map(function(v){return [Number(v.verse_id),v.translation];}));
    const last=state.lastRead.surah===meta.surah_id?state.lastRead.ayah:1;
    const verses='<div class="verse-list">'+state.chapter.map(function(v,i){
      const ref=meta.surah_id+':'+(i+1);
      const saved=isSaved(ref);
      const value=translationIndex.get(Number(v.verse_id))||'';
      return '<article class="verse" id="verse-'+(i+1)+'" data-observe-verse="'+(i+1)+'"><div class="verse-top"><button type="button" class="verse-pill" data-mark-read="'+ref+'" title="Mark as last read">'+ref+'</button><div class="verse-actions"><button type="button" data-copy="'+ref+'" class="action-small" aria-label="Copy verse '+ref+'">'+icon('copy')+'</button><button type="button" data-bookmark="'+ref+'" class="action-small'+(saved?' saved':'')+'" aria-label="'+(saved?'Remove bookmark':'Save verse')+' '+ref+'">'+icon('bookmark')+'</button></div></div><p class="verse-arabic" lang="ar">'+escapeHtml(v.verse_content)+'</p>'+(state.prefs.showTranslation?'<p class="verse-translation'+(current.lang==='en'?' english':'')+'" lang="'+(current.lang==='en'?'en':'ks-Arab')+'">'+escapeHtml(value||'Translation not available for this verse.')+'</p>':'')+'<div class="verse-source">'+escapeHtml(current.short)+'</div></article>';
    }).join('')+'</div>';
    const prev=meta.surah_id>1?'<button class="btn btn-outline" data-open="'+(meta.surah_id-1)+'">'+icon('left')+' Previous Surah</button>':'<span></span>';
    const next=meta.surah_id<114?'<button class="btn btn-green" data-open="'+(meta.surah_id+1)+'">Next Surah '+icon('arrow')+'</button>':'<span></span>';
    return top+banner+'<div class="reader-progress"><span>Reading progress</span><div class="progress-track"><div class="progress-fill" id="progress-fill" style="width:'+(100*last/meta.verses_count).toFixed(1)+'%"></div></div><span>'+last+' / '+meta.verses_count+'</span></div><div style="height:19px"></div>'+verses+'<div class="chapter-bottom">'+prev+next+'</div>';
  }
  async function openSurah(id,ayah){
    const meta=findSurah(id);
    if(!meta)return toast('This Surah is not available.');
    requestNumber++;
    const request=requestNumber;
    state.selected=meta.surah_id;state.activeAyah=ayah||null;state.chapter=null;state.chapterTranslation=null;state.loading=true;state.error=null;
    state.tab='quran';setNav('quran');closeMenu();history.replaceState(null,'',location.pathname+location.search+'#quran');render();window.scrollTo(0,0);
    try{
      const data=await Promise.all([loadPart(meta.surah_id,null),loadPart(meta.surah_id,Number(state.prefs.translator))]);
      if(request!==requestNumber||state.selected!==meta.surah_id)return;
      state.chapter=data[0];state.chapterTranslation=data[1];state.loading=false;
      if(data[0].length!==meta.verses_count)throw new Error('Verse count does not match the Surah metadata.');
      render();updateLast(meta.surah_id,ayah||1);
      if(ayah)setTimeout(function(){const el=document.getElementById('verse-'+ayah);if(el){el.classList.add('highlight');el.scrollIntoView({block:'start',behavior:'smooth'});}},100);
      watchVerses();
    }catch(e){if(request!==requestNumber)return;state.loading=false;state.error='The Quran data service could not be reached.';render();}
  }
  function watchVerses(){
    if(observer)observer.disconnect();
    if(!('IntersectionObserver' in window))return;
    observer=new IntersectionObserver(function(entries){
      for(const e of entries){if(e.isIntersecting&&state.tab==='quran'&&state.selected){const ayah=Number(e.target.dataset.observeVerse);if(ayah)updateLast(state.selected,ayah);}}
    },{rootMargin:'-100px 0px -65% 0px',threshold:0});
    content.querySelectorAll('[data-observe-verse]').forEach(function(el){observer.observe(el);});
  }
  function renderHadith(){
    return heading('Hadith & Sunnah','Explore trusted collections of the Prophet’s teachings, organized for meaningful study.','THE PROPHETIC TRADITION')+
      '<div class="source-note">'+icon('check')+' These collection links open their original pages on Sunnah.com. Verified Kashmiri Hadith translations are not bundled with this website yet.</div>'+
      '<section class="collection-grid">'+collections.map(function(h){return '<article class="panel collection-card"><span class="collection-icon">'+icon('layers')+'</span><div><div class="arabic-heading" lang="ar">'+escapeHtml(h.arabic)+'</div><h3>'+escapeHtml(h.name)+'</h3></div><p>'+escapeHtml(h.description)+'</p><a href="'+h.url+'" target="_blank" rel="noopener noreferrer">Open collection '+icon('external')+'</a></article>';}).join('')+'</section>';
  }
  function renderDuas(){
    return heading('Duas from the Quran','Beautiful supplications from Quranic verses. Read the original text and its Kashmiri translation.','REMEMBER ALLAH')+
      '<div class="source-note">'+icon('book')+' Every dua below links to its original Quranic verse. Expand a card to load the actual Arabic and Kashmiri text from the credited Quran dataset.</div>'+
      '<section class="duas-grid">'+duas.map(function(d,i){return '<article class="panel dua-card"><div class="dua-head"><span class="dua-tag">DUA '+String(i+1).padStart(2,'0')+'</span><span class="verse-pill">Quran '+d.ref+'</span></div><h3>'+escapeHtml(d.title)+'</h3><p>'+escapeHtml(d.description)+'</p><div class="dua-content" id="dua-'+i+'" hidden></div><button class="section-action" type="button" data-showdua="'+i+'">'+(state.duasOpen[i]?'Hide verse':'Read dua')+' '+icon(state.duasOpen[i]?'left':'arrow')+'</button></article>';}).join('')+'</section>';
  }
  async function expandDua(index){
    const item=duas[index];if(!item)return;
    const node=document.getElementById('dua-'+index),button=document.querySelector('[data-showdua="'+index+'"]');
    if(!node||!button)return;
    if(state.duasOpen[index]){state.duasOpen[index]=false;node.hidden=true;button.innerHTML='Read dua '+icon('arrow');return;}
    state.duasOpen[index]=true;node.hidden=false;button.innerHTML='Hide verse '+icon('left');
    node.innerHTML='<div class="dua-loader"><span class="spinner"></span> Loading authentic verse…</div>';
    const ref=refParts(item.ref);const t=selectedTranslation();
    try{
      const out=await Promise.all([loadPart(ref.surah,null),loadPart(ref.surah,Number(state.prefs.translator))]);
      if(!state.duasOpen[index]||!node.isConnected)return;
      const arabic=out[0][ref.ayah-1],translated=out[1].find(function(x){return Number(x.verse_id)===Number(arabic.verse_id);});
      if(!arabic||!translated)throw new Error('Missing verse');
      node.innerHTML='<div class="dua-text" lang="ar">'+escapeHtml(arabic.verse_content)+'</div>'+(state.prefs.showTranslation?'<div class="'+(t.lang==='en'?'verse-translation english':'dua-translation')+'" lang="'+(t.lang==='en'?'en':'ks-Arab')+'">'+escapeHtml(translated.translation)+'</div>':'')+'<button type="button" class="section-action" data-ayah="'+item.ref+'">Read in the Quran '+icon('arrow')+'</button>';
    }catch(e){if(node.isConnected)node.innerHTML='<p class="dua-error">Unable to load this verse right now. Check your connection and try again.</p><button class="section-action" data-ayah="'+item.ref+'">Open this Quran verse '+icon('arrow')+'</button>';}
  }
  function renderSettings(){
    return heading('Make it yours','A calm reading experience, tailored to your preferences.','PERSONALIZE YOUR EXPERIENCE')+
    '<section class="settings-stack"><article class="panel settings-panel"><h3>Reading preferences</h3><p class="panel-description">Choose the translation and appearance that feels right for you.</p>'+
    '<div class="setting-row"><div><strong>Translation</strong><small>Pick your preferred Kashmiri, English, Roman Kashmiri, or Urdu edition.</small></div><select class="select-field" data-setting="translator" aria-label="Preferred Quran translation">'+options()+'</select></div>'+
    '<div class="setting-row"><div><strong>Text size</strong><small>Adjust Arabic and translation text size.</small></div><input type="range" min="0.8" max="1.5" step="0.1" value="'+escapeHtml(state.prefs.scale)+'" data-setting="scale" aria-label="Reading font size"></div>'+
    '<div class="setting-row"><div><strong>Show translations</strong><small>Switch to Arabic-only reading when you prefer.</small></div><button type="button" role="switch" aria-label="Show translations" aria-checked="'+Boolean(state.prefs.showTranslation)+'" class="toggle" data-toggle="showTranslation"></button></div>'+
    '<div class="setting-row"><div><strong>Dark mode</strong><small>A softer palette for evening reading.</small></div><button type="button" role="switch" aria-label="Dark mode" aria-checked="'+Boolean(state.prefs.dark)+'" class="toggle" data-toggle="dark"></button></div></article>'+
    '<article class="panel settings-panel"><h3>Your saved reading</h3><p class="panel-description">Bookmarks and settings are saved in this browser only, not on a server.</p><div class="setting-row"><div><strong>Saved ayahs</strong><small>'+state.bookmarks.length+' verses bookmarked on this device.</small></div><button class="btn btn-outline" type="button" data-nav="bookmarks">View saved '+icon('arrow')+'</button></div><div class="setting-row"><div><strong>Reset your reading progress</strong><small>Start from Al-Fatihah next time.</small></div><button class="btn btn-outline" type="button" data-reset-progress>Reset progress</button></div></article>'+
    '<article class="panel settings-panel"><h3>About Koshur Quran</h3><p class="panel-description">An independent Kashmiri reading interface that uses the Quran data repository curated by Izan Majeed. Arabic verses, translation and surah metadata load on demand. Read more about data sources and licensing.</p><a class="section-action" href="https://github.com/izan-majeed/kaeshur-quran-data" target="_blank" rel="noopener noreferrer">Explore source data '+icon('external')+'</a><p class="panel-description" style="margin-top:15px">Quran data repository software: MIT licensed. Translations are attributed to their named translators. For religious study, cross-check interpretations with qualified scholars.</p><a class="section-action" href="/seerah/index.html">Kashmiri Seerah '+icon('arrow')+'</a></article></section>';
  }
  function renderBookmarks(){
    const items=state.bookmarks.slice().sort(function(a,b){const x=refParts(a),y=refParts(b);return x&&y?x.surah-y.surah||x.ayah-y.ayah:0;});
    return heading('Saved verses','Keep meaningful verses close. Your bookmarks stay on this device.','YOUR LIBRARY')+
    (items.length?'<div class="panel">'+items.map(function(key){const ref=refParts(key);if(!ref)return '';const meta=findSurah(ref.surah);return '<div class="bookmark-item"><span class="stat-icon">'+icon('bookmark')+'</span><button class="bookmark-name" type="button" data-ayah="'+key+'" style="text-align:left;border:0;background:none;padding:0">'+escapeHtml(meta.name_en)+' '+key+'<small>Tap to continue reading</small></button><button class="action-small saved" aria-label="Remove bookmark '+key+'" type="button" data-bookmark="'+key+'">'+icon('bookmark')+'</button></div>';}).join('')+'</div><div style="margin-top:18px"><button class="btn btn-outline" data-clear-bookmarks>Clear all bookmarks</button></div>':'<div class="empty">'+icon('bookmark')+'<strong>No saved verses yet</strong>Open a Surah and tap the bookmark icon beside an ayah.<div style="margin-top:15px">'+btnNav('Explore Quran','quran','btn-green')+'</div></div>');
  }
  function render(){
    if(observer){observer.disconnect();observer=null;}
    setNav(state.tab);
    if(state.tab==='home')content.innerHTML=renderHome();
    else if(state.tab==='quran')content.innerHTML=state.selected?renderReader():renderCatalog();
    else if(state.tab==='hadith')content.innerHTML=renderHadith();
    else if(state.tab==='duas'){state.duasOpen={};content.innerHTML=renderDuas();}
    else if(state.tab==='settings')content.innerHTML=renderSettings();
    else if(state.tab==='bookmarks')content.innerHTML=renderBookmarks();
    applyPreferences();updateBadge();
  }
  function clearBookmarkUI(key){
    document.querySelectorAll('[data-bookmark]').forEach(function(b){if(b.dataset.bookmark===key){const saved=isSaved(key);b.classList.toggle('saved',saved);b.setAttribute('aria-label',(saved?'Remove bookmark':'Save verse')+' '+key);}});
  }
  function toggleBookmark(key){
    if(!refParts(key))return;
    if(isSaved(key)){state.bookmarks=state.bookmarks.filter(function(x){return x!==key;});toast('Bookmark removed');}
    else{state.bookmarks.push(key);toast('Verse saved to your library');}
    store('bookmarks',state.bookmarks);updateBadge();clearBookmarkUI(key);
    if(state.tab==='bookmarks')render();
  }
  async function copyVerse(key){
    const ref=refParts(key);if(!ref)return;
    try{
      const chapter=state.selected===ref.surah?state.chapter:await loadPart(ref.surah,null);
      const translation=state.selected===ref.surah?state.chapterTranslation:await loadPart(ref.surah,Number(state.prefs.translator));
      const a=chapter[ref.ayah-1],b=translation.find(function(v){return v.verse_id===a.verse_id;});
      const text=[a.verse_content,b?b.translation:'','Quran '+key+' · '+selectedTranslation().short,'Source: '+SOURCE].filter(Boolean).join('\n\n');
      await navigator.clipboard.writeText(text);
      toast('Verse copied');
    }catch(e){toast('Copy unavailable in this browser');}
  }
  function focusSearch(){navigate('quran');const input=document.getElementById('surah-search');if(input)input.focus();}
  function linkAyah(ref){const val=refParts(ref);if(val)openSurah(val.surah,val.ayah);}
  document.addEventListener('click',function(event){
    const node=event.target.closest('button,a[data-home-link]');if(!node)return;
    if(node.matches('[data-home-link]')){event.preventDefault();navigate('home');return;}
    if(node.dataset.nav){navigate(node.dataset.nav);return;}
    if(node.id==='menu-toggle'){const bar=document.getElementById('sidebar');const opened=!bar.classList.contains('open');bar.classList.toggle('open',opened);document.getElementById('backdrop').hidden=!opened;node.setAttribute('aria-expanded',String(opened));return;}
    if(node.id==='top-search'){focusSearch();return;}
    if(node.id==='top-bookmarks'){navigate('bookmarks');return;}
    if(node.dataset.open){openSurah(Number(node.dataset.open));return;}
    if(node.hasAttribute('data-back')){state.selected=null;navigate('quran');return;}
    if(node.hasAttribute('data-continue')){openSurah(state.lastRead.surah||1,state.lastRead.ayah||1);return;}
    if(node.dataset.ayah){linkAyah(node.dataset.ayah);return;}
    if(node.dataset.bookmark){toggleBookmark(node.dataset.bookmark);return;}
    if(node.dataset.copy){copyVerse(node.dataset.copy);return;}
    if(node.dataset.markRead){const ref=refParts(node.dataset.markRead);if(ref){updateLast(ref.surah,ref.ayah);toast('Reading position saved');}return;}
    if(node.dataset.showdua!==undefined){expandDua(Number(node.dataset.showdua));return;}
    if(node.hasAttribute('data-retry')){openSurah(state.selected,state.activeAyah);return;}
    if(node.dataset.toggle){const key=node.dataset.toggle;state.prefs[key]=!state.prefs[key];store('preferences',state.prefs);applyPreferences();if(key==='dark'){node.setAttribute('aria-checked',String(state.prefs.dark));}else if(key==='showTranslation'){node.setAttribute('aria-checked',String(state.prefs.showTranslation));}toast('Preference saved');return;}
    if(node.hasAttribute('data-reset-progress')){state.lastRead={surah:1,ayah:1};store('lastRead',state.lastRead);toast('Reading progress reset');return;}
    if(node.hasAttribute('data-clear-bookmarks')){if(confirm('Remove all saved verses from this browser?')){state.bookmarks=[];store('bookmarks',[]);toast('Bookmarks cleared');render();}return;}
  });
  document.getElementById('backdrop').addEventListener('click',closeMenu);
  document.addEventListener('input',function(e){
    if(e.target.id==='surah-search'){state.query=e.target.value;const results=document.getElementById('surah-results');if(results)results.innerHTML=renderSurahGrid();}
    if(e.target.dataset.setting==='scale'){state.prefs.scale=Number(e.target.value);applyPreferences();store('preferences',state.prefs);}
  });
  document.addEventListener('change',function(e){
    if(e.target.dataset.setting==='translator'){state.prefs.translator=Number(e.target.value);store('preferences',state.prefs);if(state.tab==='quran'&&state.selected)openSurah(state.selected,state.activeAyah);else if(state.tab==='duas')render();else toast('Translation updated');}
  });
  document.addEventListener('keydown',function(e){
    const focused=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName);
    if(e.key==='Escape'){closeMenu();if(focused)document.activeElement.blur();}
    if(e.key==='/'&&!focused){e.preventDefault();focusSearch();}
    if(e.key==='Enter'&&e.target.id==='surah-search'){
      const query=e.target.value.trim();const ref=refParts(query);
      if(ref){e.preventDefault();linkAyah(query);return;}
      const first=content.querySelector('[data-open]');
      if(first){e.preventDefault();openSurah(Number(first.dataset.open));}
    }
  });
  async function init(){
    injectIcons();
    applyPreferences();updateBadge();
    try{
      const res=await fetch(ROOT+'surahs.json');
      if(!res.ok)throw new Error('Surahs not found');
      const metadata=await res.json();
      if(!Array.isArray(metadata)||metadata.length!==114)throw new Error('Invalid Surah metadata');
      state.surahs=metadata;
      if(!refParts(state.lastRead.surah+':'+state.lastRead.ayah))state.lastRead={surah:1,ayah:1};
      const hash=(location.hash||'').slice(1);
      state.tab=['home','quran','hadith','duas','settings','bookmarks'].includes(hash)?hash:'home';
      render();
    }catch(e){
      content.innerHTML='<div class="empty"><strong>Unable to start Koshur Quran</strong>The Surah list could not be loaded. Please refresh the page.</div>';
    }
  }
  init();
})();
