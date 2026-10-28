/* Koshur Quran — Sahih al-Bukhari 1–20 re-review.
   Existing Cipher-approved wording is never rewritten by this review UI.
   The reviewer's correction drafts are stored locally and must be copied
   or shared manually; there is no silent upload. */
(() => {
 'use strict';
 const ROOT='/quran-app/bukhari-1-20.json', KEY='koshur-bukhari-feedback-v1';
 let records=[],loaded=false,loading=false,error='',search='',filter='all',expanded=new Set([1]);
 let notes={};
 try { const z=JSON.parse(localStorage.getItem(KEY)||'{}');if(z&&typeof z==='object'&&z.notes&&typeof z.notes==='object')notes=z.notes; }catch(_){}
 const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function persist(){try{localStorage.setItem(KEY,JSON.stringify({notes}))}catch(_){ }}
 function visible(){return records.filter(h=>(filter==='all'||String(h.bookNumber)===filter)&&(!search||[h.number,h.title,h.narrator,h.kashmiri,h.book].some(x=>String(x).toLocaleLowerCase().includes(search.toLocaleLowerCase()))));}
 function toolbar(){return '<div class="bh-review-intro"><div class="bh-review-ornament" aria-hidden="true">۞</div><span class="section-eyebrow">SAHIH AL-BUKHARI · KASHMIRI COLLECTION</span><h2>Faithfully preserved. Open to your review.</h2><p>Explore the first 20 Kashmiri translations already approved in Cipher. Please check the wording again and tell us what you would change. Corrections remain on this device until you copy and share them.</p><div class="bh-highlights"><span>20 numbered narrations</span><span>2 books</span><span>Prior owner-reviewed wording</span></div></div>'+
 '<div class="bh-toolbar"><label class="bh-search"><span aria-hidden="true">⌕</span><input id="bh-search" type="search" value="'+e(search)+'" placeholder="Search by number, topic or Kashmiri words" aria-label="Search hadith translations"></label><div class="bh-filters" role="group" aria-label="Filter hadith book"><button data-bh-filter="all" class="'+(filter==='all'?'active':'')+'" aria-pressed="'+(filter==='all')+'">All 20</button><button data-bh-filter="1" class="'+(filter==='1'?'active':'')+'" aria-pressed="'+(filter==='1')+'">Revelation</button><button data-bh-filter="2" class="'+(filter==='2'?'active':'')+'" aria-pressed="'+(filter==='2')+'">Faith</button></div></div>';
 }
 function card(h){
  const open=expanded.has(h.number),n=h.number, note=notes[n]||'';
  return '<article class="bh-card" id="bukhari-'+n+'"><div class="bh-card-heading"><span class="bh-number">'+String(n).padStart(2,'0')+'</span><div class="bh-card-title"><span class="bh-book">'+e(h.book)+' · Hadith '+n+'</span><h3>'+e(h.title)+'</h3><p>Narrated by '+e(h.narrator)+'</p></div><span class="bh-status">'+(note.trim()?'Correction drafted':'Previously reviewed')+'</span></div>'+
  '<button type="button" class="bh-expand" data-bh-expand="'+n+'" aria-expanded="'+open+'" aria-controls="bh-content-'+n+'">'+(open?'Hide translation':'Read Kashmiri translation')+' <span aria-hidden="true">'+(open?'−':'+')+'</span></button>'+
  '<div class="bh-detail" id="bh-content-'+n+'" '+(open?'':'hidden')+'><div class="bh-script-label"><span>KASHMIRI · کٲشُر</span><span>Hadith '+n+'</span></div><div class="bh-kashmiri" lang="ks-Arab" dir="rtl">'+e(h.kashmiri).replace(/\n/g,'<span class="bh-break"></span>')+'</div>'+
  '<div class="bh-source"><span>Existing Cipher translation · review again</span><a href="'+e(h.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Original hadith reference ↗</a></div>'+
  '<section class="bh-correction"><h4>Suggest a correction</h4><p>Write the exact phrase and how it should read. This is only a local draft until you share it.</p><label for="bh-note-'+n+'">Your Kashmiri correction or note</label><textarea id="bh-note-'+n+'" rows="3" data-bh-note="'+n+'" placeholder="Wrong wording → Your corrected Kashmiri translation">'+e(note)+'</textarea><div class="bh-correction-actions"><button type="button" class="btn btn-outline" data-bh-copy="'+n+'">Copy this correction</button><span id="bh-save-status-'+n+'">'+(note?'Saved on this device':'Not submitted')+'</span></div></section></div></article>';
 }
 function list(){
   const root=document.getElementById('hadith-library');if(!root)return;
   if(error){root.innerHTML='<div class="bh-error">Could not load the Kashmiri hadith collection. <button type="button" data-bh-retry>Retry</button></div>';return;}
   if(!loaded){root.innerHTML='<div class="bh-loading">Loading the reviewed Kashmiri translations…</div>';return;}
   root.innerHTML=toolbar()+'<div class="bh-count">'+visible().length+' of 20 narrations</div><div id="bh-cards" class="bh-grid">'+(visible().map(card).join('')||'<p class="bh-empty">No hadith match this search.</p>')+'</div>'+
      '<div class="bh-review-footer"><h3>Your review notes</h3><p>Notes are saved only in this browser. Copy them to share corrections in ChatGPT. They are not automatically sent to the website or GitHub.</p><div class="bh-review-footer-actions"><button type="button" class="btn btn-green" data-bh-export>Copy all corrections ('+Object.values(notes).filter(x=>x.trim()).length+')</button><button type="button" class="btn btn-outline" data-bh-clear>Clear all my notes</button></div><textarea id="bh-export-text" class="bh-fallback" hidden aria-label="Select and copy your corrections"></textarea><div id="bh-save-toast" class="bh-toast" role="status" hidden></div></div>';
 }
 async function load(){
   if(loaded){list();return;}
   if(loading)return;loading=true;error='';list();
   try{const r=await fetch(ROOT,{cache:'default'});if(!r.ok)throw Error('Hadith data unavailable');const d=await r.json();if(!Array.isArray(d.records)||d.records.length!==20||d.records.some((h,i)=>h.number!==i+1||!h.kashmiri))throw Error('Incorrect hadith set');records=d.records;loaded=true;}catch(ex){error=String(ex.message||ex);}finally{loading=false;list();}
 }
 function mount(){if(document.getElementById('hadith-library')){if(!loaded)load();else list();}}
 function exportText(hadithNum){
   const rs=(hadithNum?records.filter(h=>h.number===hadithNum):records).filter(h=>String(notes[h.number]||'').trim());
   return 'Sahih al-Bukhari Kashmiri review corrections\n'+rs.map(h=>'Hadith '+h.number+' · '+h.title+'\n'+notes[h.number].trim()+'\nSource: '+h.sourceUrl).join('\n\n');
 }
 function notify(message){const el=document.getElementById('bh-save-toast');if(el){el.textContent=message;el.hidden=false;setTimeout(()=>{if(el)el.hidden=true;},2500);}}
 async function copy(text){try{await navigator.clipboard.writeText(text);notify('Copied — paste into ChatGPT for review.');}catch(_){const box=document.getElementById('bh-export-text');if(box){box.hidden=false;box.value=text;box.focus();box.select();}else alert('Clipboard unavailable. Please copy your notes manually.');}}
 document.addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;
   if(b.hasAttribute('data-bh-filter')){filter=b.dataset.bhFilter;list();return;}
   if(b.hasAttribute('data-bh-expand')){const n=Number(b.dataset.bhExpand);if(expanded.has(n))expanded.delete(n);else expanded.add(n);list();return;}
   if(b.hasAttribute('data-bh-copy')){const n=Number(b.dataset.bhCopy);if(!String(notes[n]||'').trim()){notify('Write a correction first.');return;}copy(exportText(n));return;}
   if(b.hasAttribute('data-bh-export')){if(!Object.values(notes).some(x=>String(x).trim())){notify('No corrections written yet.');return;}copy(exportText());return;}
   if(b.hasAttribute('data-bh-clear')){if(confirm('Clear all locally saved Hadith review notes on this device?')){notes={};persist();list();}return;}
   if(b.hasAttribute('data-bh-retry'))load();
 });
 document.addEventListener('input',ev=>{
  if(ev.target.id==='bh-search'){search=ev.target.value;const cards=document.getElementById('bh-cards');if(cards)cards.innerHTML=visible().map(card).join('')||'<p class="bh-empty">No hadith match this search.</p>';const count=document.querySelector('.bh-count');if(count)count.textContent=visible().length+' of 20 narrations';}
  if(ev.target.hasAttribute('data-bh-note')){const n=Number(ev.target.dataset.bhNote);notes[n]=ev.target.value;persist();const status=document.getElementById('bh-save-status-'+n);if(status)status.textContent='Saved on this device';}
 });
 window.KoshurHadithReview={mount};
})();
