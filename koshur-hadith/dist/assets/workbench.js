const STORAGE_KEY = 'koshur-hadith-clause-reviews-v1';
const errorTags = ['Meaning', 'Grammar', 'Vocabulary', 'Spelling', 'Naturalness', 'Honorific', 'Terminology'];
const terms = [
  ['پوٚز','true; real'],['وَحی نازِل سَپدُن','revelation to descend'],['نیک خواب','good dream'],
  ['خَلوَت','seclusion'],['کُنہِ زون','alone'],['روٚٹُن','to catch or hold'],['ترٛاوُن','to release'],
  ['پَیغام ہؠتھ یُن','to come bearing a message'],['خَوف زَدٕ گَژھُن','to become frightened'],
  ['گَرٕ کُن تَشریٖف کَرُن','to return home respectfully'],['وَحی زور سان یِنۍ','revelation to come forcefully']
];
let records = [], current, clauses = [], saved = readSaved();

const $ = selector => document.querySelector(selector);
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function readSaved(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return {}}}
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(saved))}
function splitText(text, language){
  const value=String(text||'').replace(/\s+/g,' ').trim();
  if(!value)return [];
  const pattern=language==='arabic'?/(?<=[.!؟؛])\s+|(?=\sقَالَ\s|\sفَقَالَ\s)/u:/(?<=[.!?؟۔])\s+/u;
  return value.split(pattern).map(x=>x.trim()).filter(Boolean);
}
function group(parts,count){
  if(!count)return [];
  const groups=Array.from({length:count},()=>[]);
  parts.forEach((part,index)=>groups[Math.min(count-1,Math.floor(index*count/Math.max(parts.length,1)))].push(part));
  return groups.map(items=>items.join(' ').trim());
}
function align(record){
  const ar=splitText(record.arabic,'arabic'),en=splitText(record.english,'english'),ks=splitText(record.kashmiri,'kashmiri');
  const count=Math.max(1,Math.min(24,Math.max(ar.length,en.length,ks.length)));
  const [aa,ee,kk]=[group(ar,count),group(en,count),group(ks,count)];
  return Array.from({length:count},(_,i)=>({id:`${record.id}-c${i+1}`,arabic:aa[i]||'',english:ee[i]||'',kashmiri:kk[i]||''}));
}
function numbers(text){return String(text||'').match(/[0-9٠-٩۰-۹]+/g)||[]}
function warnings(clause,value){
  const list=[];
  if(!value.trim())list.push('Kashmiri clause is empty.');
  const sourceNumbers=[...numbers(clause.arabic),...numbers(clause.english)];
  if(sourceNumbers.length&&!numbers(value).length)list.push('A number appears in the source but not in this Kashmiri clause.');
  const sourceNegative=/\b(no|not|never|none|neither)\b/i.test(clause.english)||/(?:^|\s)(?:لا|لم|لن|ما)(?:\s|$)/u.test(clause.arabic);
  const targetNegative=/(?:نہ|نٕہ|چھُنہٕ|مَہ)/u.test(value);
  if(sourceNegative&&!targetNegative)list.push('Source may contain negation; check that Kashmiri preserves it.');
  if(!sourceNegative&&targetNegative)list.push('Kashmiri contains negation not detected in this source segment.');
  if(/Messenger|Prophet/i.test(clause.english)&&!/ﷺ|صلی اللہ علیہ/u.test(value))list.push('Check the Prophet’s honorific in this clause.');
  if(/[A-Za-z]/.test(value))list.push('Latin text occurs inside the Kashmiri draft.');
  return list;
}
function stateFor(clause){
  const recordState=saved[current.id]||(saved[current.id]={});
  return recordState[clause.id]||(recordState[clause.id]={text:clause.kashmiri,tags:[],note:'',reviewed:false});
}
function renderClause(clause,index){
  const state=stateFor(clause),issues=warnings(clause,state.text);
  return `<article class="clause" data-clause="${esc(clause.id)}"><div><p class="clause-meta"><span>Arabic ${index+1}</span><span>Source</span></p><p class="source-clause arabic" lang="ar" dir="rtl">${esc(clause.arabic)}</p></div><div><p class="clause-meta"><span>English reference</span><span>Meaning check</span></p><p class="source-clause english">${esc(clause.english)}</p></div><div class="edit-clause"><p class="clause-meta"><span>Kashmiri draft</span><span>${state.reviewed?'Reviewed':'Not reviewed'}</span></p><textarea lang="ks-Arab" dir="rtl" spellcheck="false">${esc(state.text)}</textarea><div class="review-tags">${errorTags.map(tag=>`<label><input type="checkbox" value="${tag}" ${state.tags.includes(tag)?'checked':''}>${tag}</label>`).join('')}</div><input class="clause-note" value="${esc(state.note)}" placeholder="Explain the correction or uncertainty"><div class="clause-actions"><button class="mark-reviewed ${state.reviewed?'approved':''}" type="button">${state.reviewed?'Reviewed ✓':'Mark clause reviewed'}</button><button class="restore" type="button">Restore draft</button></div>${issues.length?`<ul class="warning-list">${issues.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}</div></article>`;
}
function recordChecks(){
  const states=clauses.map(stateFor),reviewed=states.filter(x=>x.reviewed).length,changed=states.filter((x,i)=>x.text.trim()!==clauses[i].kashmiri.trim()).length;
  $('#review-progress').textContent=`${reviewed} of ${clauses.length} clauses reviewed`;
  $('#record-status').textContent=current.translationStatus==='approved-by-project-owner'?'Existing approved translation':`${changed} corrected clauses · draft remains unapproved`;
  const full=states.map(x=>x.text).join(' '),checks=[
    {ok:states.every(x=>x.text.trim()),text:'All aligned clauses contain Kashmiri text'},
    {ok:!/\b[A-Za-z]{2,}\b/.test(full),text:'No unexplained Latin words in Kashmiri'},
    {ok:!current.english.includes('Allah')||full.includes('اللہ'),text:'Divine name retained'},
    {ok:!/(Messenger|Prophet)/i.test(current.english)||/ﷺ|صلی اللہ علیہ/u.test(full),text:'Prophetic honorific retained'},
    {ok:reviewed===clauses.length,text:'Every clause explicitly reviewed'}
  ];
  $('#global-checks').innerHTML=checks.map(x=>`<div class="check ${x.ok?'ok':''}">${x.ok?'✓':'Review'} · ${esc(x.text)}</div>`).join('');
}
function render(){clauses=align(current);$('#clause-list').innerHTML=clauses.map(renderClause).join('');recordChecks();renderTerms()}
function renderTerms(){
  const text=clauses.map(x=>stateFor(x).text).join(' '),used=terms.filter(([term])=>text.includes(term.split(' ')[0]));
  $('#terminology').innerHTML=(used.length?used:terms.slice(0,6)).map(([term,meaning])=>`<span class="term"><strong lang="ks-Arab" dir="rtl">${esc(term)}</strong><span>${esc(meaning)}</span></span>`).join('');
}
$('#clause-list').addEventListener('input',event=>{
  const article=event.target.closest('.clause');if(!article)return;const clause=clauses.find(x=>x.id===article.dataset.clause),state=stateFor(clause);
  if(event.target.matches('textarea'))state.text=event.target.value;
  if(event.target.matches('.clause-note'))state.note=event.target.value;
  if(event.target.matches('[type=checkbox]'))state.tags=[...article.querySelectorAll('[type=checkbox]:checked')].map(x=>x.value);
  persist();recordChecks();
});
$('#clause-list').addEventListener('click',event=>{
  const article=event.target.closest('.clause');if(!article)return;const clause=clauses.find(x=>x.id===article.dataset.clause),state=stateFor(clause);
  if(event.target.closest('.mark-reviewed'))state.reviewed=!state.reviewed;
  if(event.target.closest('.restore')){state.text=clause.kashmiri;state.tags=[];state.note='';state.reviewed=false;}
  persist();render();
});
$('#hadith-select').addEventListener('change',event=>{current=records.find(x=>x.id===event.target.value);location.hash=current.id;render()});
$('#reset-review').addEventListener('click',()=>{if(!confirm('Remove locally saved corrections for this hadith?'))return;delete saved[current.id];persist();render()});
$('#export-review').addEventListener('click',()=>{
  const payload={schemaVersion:1,hadithId:current.id,hadithNumber:current.hadithNumber,sourceUrl:current.sourceUrl,baseRevision:current.revision,exportedAt:new Date().toISOString(),approvalStatus:'review-export-not-yet-published',clauses:clauses.map(clause=>({id:clause.id,arabic:clause.arabic,english:clause.english,originalKashmiri:clause.kashmiri,...stateFor(clause)}))};
  const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=`${current.id}-kashmiri-review.json`;link.click();URL.revokeObjectURL(url);
});
fetch('/data/hadiths.json').then(r=>r.json()).then(data=>{records=data.records;$('#hadith-select').innerHTML=records.map(row=>`<option value="${row.id}">Hadith ${row.hadithNumber} · ${row.translationStatus==='approved-by-project-owner'?'approved':'draft'}</option>`).join('');current=records.find(x=>x.id===location.hash.slice(1))||records.find(x=>x.translationStatus!=='approved-by-project-owner')||records[0];$('#hadith-select').value=current.id;render()});
