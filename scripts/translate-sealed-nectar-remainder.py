from pathlib import Path
import re,json,ctranslate2,fcntl
from transformers import AutoTokenizer
root=Path(__file__).resolve().parents[1]; source=Path('/tmp/nectar-all.txt').read_text()
start=source.index('\nAl-Isra’ and Al-Mi‘raj\n',source.index('\nReligions of the Arabs\n'))+1;s=source[start:]
headings=['Al-Isra’ and Al-Mi‘raj','The First ‘Aqabah Pledge','The Second ‘Aqabah Pledge','The Vanguard of Migration','In An-Nadwah (Council) House','Migration of the Prophet [pbuh]','Life in Madinah','The First Phase: The Status Quo in Madinah at the Time of Emigration','The Military Activities between Badr and Uhud','The Battle of Uhud','Military Platoons and Missions between the Battle of Uhud and the Battle','Al-Ahzab (the Confederates) Invasion','Invading Banu Quraiza','Military Activities continued','Bani Al-Mustaliq (Muraisi‘) Ghazwah, Sha‘ban 6 Hijri','Delegations and Expeditions following Al-Muraisi‘ Ghazwah','Al-Hudaibiyah Treaty','The Second Stage: A New Phase of Islamic Action','The Prophet’s Plans to spread the Message of Islam beyond Arabia','Post-Hudaibiyah Hostilities','The Conquest of Khaibar','Sporadic Invasions','The Compensatory ‘Umrah','The Battle of Mu’tah','The Conquest of Makkah','Hunain Ghazwah','Missions and Platoons','The Invasion of Tabuk','Abu Bakr [R] performs the Pilgrimage','A Meditation on the Ghazawat','People embrace the Religion of Allâh in Large Crowds','The Delegations','The Success and Impact of the Call','The Farewell Pilgrimage','The Last Expeditions','The Journey to Allâh, the Sublime','The Prophet Household','The Prophet [pbuh], Attributes and Manners']
for h in sorted(headings,key=len,reverse=True):s=s.replace('\n'+h+'\n','\n\n@@H@@'+h+'\n\n',1)
s=re.sub(r'\f?MSA NIU\s*','',s);s=re.sub(r'(?m)^\s*\d+\s*$','',s)
for x,y in [('All?','Allah'),('Allâh','Allah'),('Qur’?','Qur’an'),("Qur'?",'Qur’an'),('[pbuh]','ﷺ'),('[AWS]','علیہ السلام'),('[R]','رضی اللہ عنہ')]:s=s.replace(x,y)
raw=[]
for p in s.split('\n\n'):
 t=' '.join(x.strip() for x in p.splitlines() if x.strip())
 if not t:continue
 raw.append(('heading',t[5:]) if t.startswith('@@H@@') else ('body',t))
items=[]
for typ,text in raw:
 if typ=='heading':items.append((typ,text));continue
 ss=re.split(r'(?<=[.!?])\s+(?=[A-Z“\"‘\[])',text);chunk=[];n=0
 for q in ss:
  w=len(q.split())
  if chunk and n+w>105:items.append(('body',' '.join(chunk)));chunk=[];n=0
  chunk.append(q);n+=w
 if chunk:items.append(('body',' '.join(chunk)))
out=root/'training-data/book-translations/sealed-nectar/chapters-11-end-machine-draft.jsonl'
lock=(out.parent/'.chapters-11-end.lock').open('w');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
found={}
if out.exists():
 for line in out.read_text().splitlines():
  if line.strip():
   row=json.loads(line);found.setdefault((row['type'],row['english']),[]).append(row)
done=[]
for key in items:
 rows=found.get(key,[])
 if not rows:break
 done.append(rows.pop(0))
out.write_text(''.join(json.dumps(x,ensure_ascii=False)+'\n' for x in done))
print('segments',len(items),'headings',sum(t=='heading' for t,_ in items),'words',sum(len(x.split()) for _,x in items),'resume',len(done),flush=True)
snapshot='/workspace/.hf-cache/hub/models--facebook--nllb-200-distilled-600M/snapshots/f8d333a098d19b4fd9a8b18f94170487ad3f821d';tok=AutoTokenizer.from_pretrained(snapshot,src_lang='eng_Latn',local_files_only=True);tr=ctranslate2.Translator('/workspace/.ct2-nllb-600m',compute_type='int8',intra_threads=8)
for base in range(len(done),len(items),32):
 batch=items[base:base+32];src=[v for _,v in batch];tokens=[tok.convert_ids_to_tokens(tok.encode(x,truncation=True,max_length=384)) for x in src]
 rr=tr.translate_batch(tokens,target_prefix=[['kas_Arab']]*len(tokens),beam_size=1,max_decoding_length=160,no_repeat_ngram_size=3)
 ks=[tok.decode(tok.convert_tokens_to_ids(z.hypotheses[0]),skip_special_tokens=True) for z in rr]
 with out.open('a') as f:
  for (typ,en),k in zip(batch,ks):f.write(json.dumps({'type':typ,'english':en,'kashmiri':k},ensure_ascii=False)+'\n')
 print(base+len(batch),'/',len(items),flush=True)
