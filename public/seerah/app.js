'use strict';
(() => {
  const $ = (s) => document.querySelector(s);
  const storageKey = 'nectar-reader-v1';
  const readStored = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch { return {}; } };
  const stored = readStored();
  let data, current = 'introduction', bookmarks = new Set(Array.isArray(stored.bookmarks) ? stored.bookmarks.filter(x => typeof x === 'string') : []);
  let language = ['both','ks','en'].includes(stored.language) ? stored.language : 'both';
  let fontSize = Number.isFinite(stored.fontSize) ? Math.min(33,Math.max(21,stored.fontSize)) : 25;
  let readingPosition = Math.min(100,Math.max(0,Number(stored.progress) || 0));
  let lastPassage = typeof stored.lastPassage === 'string' ? stored.lastPassage : null;
  let toastTimer, searchTimer;
  const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fold = s => String(s).normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/\s+/g,' ');
  const save = () => { try { localStorage.setItem(storageKey,JSON.stringify({bookmarks:[...bookmarks],language,fontSize,theme:document.body.classList.contains('night')?'night':'day',progress:readingPosition,lastPassage,section:current})); } catch { /* Reading remains available when browser storage is disabled. */ } };
  const notify = message => { $('#toast').textContent=message; $('#toast').classList.add('visible'); clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2600); };
  const updateTheme = () => { const night=document.body.classList.contains('night');$('#theme-toggle').textContent=night?'☀':'☾';$('#theme-toggle').setAttribute('aria-label',night?'Switch to day theme':'Switch to night theme'); };
  if(stored.theme==='night')document.body.classList.add('night');updateTheme();
  const updateProgress = () => { $('#progress-bar').style.width=`${readingPosition}%`;$('#progress-text').textContent=`${Math.round(readingPosition)}%`; };
  const toggleMenu = open => { $('#sidebar').classList.toggle('open',open);$('#scrim').hidden=!open; $('[data-action="menu"]').setAttribute('aria-expanded',String(open)); };
  const showDialog = selector => { toggleMenu(false);const dialog=$(selector);if(!dialog.open)dialog.showModal(); };
  const sourceLabel = p => `Source page ${p.page}`;
  const download = (filename,text,type) => { const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); };
  const updateLanguage = () => { $('.reading-area').dataset.language=language;document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));document.documentElement.style.setProperty('--reader-size',`${fontSize}px`);$('#font-smaller').disabled=fontSize<=21;$('#font-larger').disabled=fontSize>=33; };
  function renderSection(id, scroll=false, passageId=null) {
    if(!data)return;
    const section=data.sections.find(s=>s.id===id);if(!section)return;
    current=id;const index=data.sections.indexOf(section);const passages=data.passages.filter(p=>p.section===id);
    $('#section-number').textContent=String(index+1).padStart(2,'0');$('#section-label').textContent=section.label.toUpperCase();$('#section-title').textContent=section.title;$('#section-ks').textContent=section.kashmiriTitle;
    $('#section-range').textContent=`SOURCE PAGE${passages[0].page!==passages.at(-1).page?'S':''} ${passages[0].page}${passages[0].page!==passages.at(-1).page?'–'+passages.at(-1).page:''}`;
    $('#section-count').textContent=`${String(index+1).padStart(2,'0')} / 07`;
    $('#previous-section').disabled=index===0;$('#next-section').textContent=index===data.sections.length-1?'Back to the beginning ↗':'Next section →';
    document.querySelectorAll('.section-link').forEach(b=>{const active=b.dataset.section===id;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');});
    $('#passages').innerHTML=passages.map(p=>`<article id="${p.id}" class="passage${[26,40,42].includes(Number(p.id.slice(-2)))?' quotation':''}"><div class="passage-meta"><span>PASSAGE ${p.id.slice(-2)} &nbsp;·&nbsp; ${sourceLabel(p).toUpperCase()}</span><div class="passage-tools"><button type="button" data-copy="${p.id}" aria-label="Copy Kashmiri passage ${p.id.slice(-2)}">⧉</button><button type="button" data-bookmark="${p.id}" aria-label="${bookmarks.has(p.id)?'Unsave':'Save'} passage ${p.id.slice(-2)}" aria-pressed="${bookmarks.has(p.id)}">${bookmarks.has(p.id)?'◆':'◇'}</button></div></div><p class="english" lang="en">${escape(p.english)}</p><p class="kashmiri" lang="ks-Arab" dir="rtl">${escape(p.kashmiri)}</p></article>`).join('');
    updateLanguage();toggleMenu(false);save();
    if(scroll) requestAnimationFrame(()=>{const target=passageId?document.getElementById(passageId):$('#reader');target?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});if(passageId){target?.classList.add('highlighted');setTimeout(()=>target?.classList.remove('highlighted'),2400);}});
  }
  function goToPassage(id) { const p=data?.passages.find(p=>p.id===id);if(!p)return;document.querySelectorAll('dialog[open]').forEach(d=>d.close());renderSection(p.section,true,id); }
  function renderResults(container,rows,empty) {
    const target=$(container);target.replaceChildren();
    if(!rows.length){const p=document.createElement('p');p.className='empty-results';p.textContent=empty;target.append(p);return;}
    rows.forEach(p=>{const button=document.createElement('button');button.className='result-button';const label=document.createElement('small');label.textContent=`${data.sections.find(s=>s.id===p.section).label} · Page ${p.page} · Passage ${p.id.slice(-2)}`;const en=document.createElement('span');en.textContent=p.english.length>190?p.english.slice(0,190)+'…':p.english;const ks=document.createElement('span');ks.className='result-ks';ks.lang='ks-Arab';ks.dir='rtl';ks.textContent=p.kashmiri.length>120?p.kashmiri.slice(0,120)+'…':p.kashmiri;button.append(label,en,ks);button.addEventListener('click',()=>goToPassage(p.id));target.append(button);});
  }
  const search = () => {if(!data)return;const q=fold($('#search-input').value.trim());const results=q?data.passages.filter(p=>fold(p.english+' '+p.kashmiri).includes(q)):[];renderResults('#search-results',results,q?'No matching passages. Try another word.':'Search all 52 passages in this chapter.');};
  const showBookmarks = () => {if(!data)return;renderResults('#bookmark-results',data.passages.filter(p=>bookmarks.has(p.id)),'Your saved passages will appear here. Use the diamond beside a passage to save it.');$('#export-bookmarks').hidden=bookmarks.size===0;showDialog('#bookmarks-dialog');};
  const places=[
    {name:'Yemen',ks:'یمن',detail:'The southern homeland of the Qahtanian Arabs in the chapter. The text traces the dispersal of Kahlan and the settlement of Himyar from here.',section:'migration'},
    {name:'Makkah',ks:'مکہ',detail:'The sacred valley associated with Hagar, Ishmael, Zamzam and the building of the Ka‘bah. Later passages describe Quraysh in Makkah and its surroundings.',section:'abraham'},
    {name:'Syria',ks:'شام',detail:'The northern lands named in the chapter. Jafna and his family are described travelling here and establishing the Ghassan kingdom.',section:'migration'},
    {name:'Oman',ks:'عُمان',detail:'The destination of Imran bin Amr and his people in the account of the Azd migrations.',section:'migration'},
    {name:'Iraq',ks:'عراق',detail:'The chapter connects Abraham’s ancestry to a town near Kufa on the Euphrates, and mentions the settlement of Quda‘a near Iraq.',section:'abraham'}
  ];
  function selectPlace(index){const p=places[index];$('#place-detail').innerHTML=`<p class="place-ks" lang="ks-Arab" dir="rtl">${escape(p.ks)}</p><h3>${escape(p.name)}</h3><p>${escape(p.detail)}</p><button class="text-button" data-read-place="${p.section}">Read this part of the chapter ↗</button>`;document.querySelectorAll('[data-place]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.place)===index);b.setAttribute('aria-pressed',String(Number(b.dataset.place)===index));});}
  document.addEventListener('click',async event=>{
    const close=event.target.closest('[data-close]');if(close){close.closest('dialog').close();return;}
    const action=event.target.closest('[data-action]')?.dataset.action;
    if(action==='search'){showDialog('#search-dialog');setTimeout(()=>$('#search-input').focus(),50);search();}
    if(action==='bookmarks')showBookmarks();
    if(action==='about')showDialog('#about-dialog');
    if(action==='theme'){document.body.classList.toggle('night');updateTheme();save();}
    if(action==='menu')toggleMenu(!$('#sidebar').classList.contains('open'));
    if(action==='map'){selectPlace(0);showDialog('#map-dialog');}
    const lang=event.target.closest('[data-lang]')?.dataset.lang;if(lang){language=lang;updateLanguage();save();}
    const sec=event.target.closest('[data-section]')?.dataset.section;if(sec){renderSection(sec,true);}
    const place=event.target.closest('[data-place]')?.dataset.place;if(place!==undefined)selectPlace(Number(place));
    const readPlace=event.target.closest('[data-read-place]')?.dataset.readPlace;if(readPlace){$('#map-dialog').close();renderSection(readPlace,true);}
    const bookmark=event.target.closest('[data-bookmark]');if(bookmark){const id=bookmark.dataset.bookmark;if(bookmarks.has(id))bookmarks.delete(id);else bookmarks.add(id);bookmark.setAttribute('aria-pressed',String(bookmarks.has(id)));bookmark.setAttribute('aria-label',`${bookmarks.has(id)?'Unsave':'Save'} passage ${id.slice(-2)}`);bookmark.textContent=bookmarks.has(id)?'◆':'◇';$('#saved-count').textContent=bookmarks.size;save();notify(bookmarks.has(id)?'Passage saved in this browser':'Passage removed from saved');}
    const copy=event.target.closest('[data-copy]')?.dataset.copy;if(copy){const p=data.passages.find(p=>p.id===copy);try{await navigator.clipboard.writeText(p.kashmiri);notify('Kashmiri passage copied');}catch{notify('Clipboard unavailable. Select the passage text to copy.');}}
  });
  $('#search-input').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(search,100);});
  $('#scrim').addEventListener('click',()=>toggleMenu(false));
  $('#start-reading').addEventListener('click',()=>renderSection('introduction',true));
  $('#resume-reading').addEventListener('click',()=>{const p=data?.passages.find(p=>p.id===lastPassage);renderSection(p?.section||stored.section||'introduction',true,p?.id);});
  $('#previous-section').addEventListener('click',()=>{const i=data.sections.findIndex(s=>s.id===current);if(i>0)renderSection(data.sections[i-1].id,true);});
  $('#next-section').addEventListener('click',()=>{const i=data.sections.findIndex(s=>s.id===current);renderSection(data.sections[(i+1)%data.sections.length].id,true);});
  $('#font-smaller').addEventListener('click',()=>{fontSize=Math.max(21,fontSize-2);updateLanguage();save();});$('#font-larger').addEventListener('click',()=>{fontSize=Math.min(33,fontSize+2);updateLanguage();save();});
  $('#export-bookmarks').addEventListener('click',()=>download('nectar-saved-passages.json',JSON.stringify({chapter:1,reviewStatus:data.reviewStatus,passages:data.passages.filter(p=>bookmarks.has(p.id))},null,2),'application/json'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false);if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.activeElement.isContentEditable&&!document.querySelector('dialog[open]')){e.preventDefault();showDialog('#search-dialog');$('#search-input').focus();search();}});
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
  let scrollScheduled=false;
  window.addEventListener('scroll',()=>{if(scrollScheduled||!data)return;scrollScheduled=true;requestAnimationFrame(()=>{scrollScheduled=false;const article=[...document.querySelectorAll('.passage')].find(a=>{const r=a.getBoundingClientRect();return r.top<innerHeight*.65&&r.bottom>innerHeight*.2;});if(!article)return;const p=data.passages.find(p=>p.id===article.id);lastPassage=p.id;const index=data.passages.indexOf(p);readingPosition=Math.round(index/(data.passages.length-1)*100);updateProgress();save();});},{passive:true});
  fetch('./chapter-one.json').then(r=>{if(!r.ok)throw new Error('Chapter could not be loaded');return r.json();}).then(j=>{
    data=j;const ids=new Set(data.passages.map(p=>p.id));bookmarks=new Set([...bookmarks].filter(id=>ids.has(id)));$('#saved-count').textContent=bookmarks.size;
    $('#contents').innerHTML=data.sections.map(s=>`<button class="section-link" data-section="${s.id}">${escape(s.label)}</button>`).join('');
    $('#map-places').innerHTML=places.map((p,i)=>`<button data-place="${i}" aria-pressed="${i===0}">${p.name}</button>`).join('');
    $('#read-time').textContent=Math.ceil(data.passages.reduce((n,p)=>n+p.english.split(/\s+/).length,0)/150);
    $('#resume-reading').hidden=!lastPassage||!ids.has(lastPassage);updateProgress();renderSection(data.sections.some(s=>s.id===stored.section)?stored.section:'introduction');
    const target=location.hash.slice(1);if(ids.has(target))goToPassage(target);
  }).catch(error=>{const p=document.createElement('p');p.className='empty-results';p.textContent='The chapter could not load. Check your connection and reload this page.';$('#passages').replaceChildren(p);$('#start-reading').disabled=true;$('#resume-reading').hidden=true;console.error(error);});
})();
