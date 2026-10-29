from pathlib import Path
import re,json,ctranslate2
from transformers import AutoTokenizer
root=Path(__file__).resolve().parents[1]
s=Path('/tmp/nectar-all.txt').read_text(); a=s.index('\nReligions of the Arabs\n')+1; b=s.index('\nAl-Isra’ and Al-Mi‘raj\n',a); s=s[a:b]
s=re.sub(r'\f?MSA NIU\s*','',s);s=re.sub(r'(?m)^\s*\d+\s*$','',s)
for x,y in [('All?','Allah'),('Qur’?','Qur’an'),("Qur'?",'Qur’an'),('[pbuh]','ﷺ'),('[AWS]','علیہ السلام'),('[R]','رضی اللہ عنہا')]:s=s.replace(x,y)
heads={'Religions of the Arabs':'## باب 3: عربَن ہُنٛدۍ مذہب','Aspects of Pre-Islamic Arabian Society':'## باب 4: اسلامہٕ برونٛہہ عرب معاشرٕچ صورتِ حال','The Lineage and Family of Muhammad ﷺ':'## باب 5: حضرت محمد ﷺ سُنٛد نسب تہٕ خاندان','Muhammad’s Birth and Forty Years prior to Prophethood':'## باب 6: حضرت محمد ﷺ سُنٛد ولادت تہٕ نبوتہٕ برونٛہہ ژتجی وُہُر','In the Shade of the Message and Prophethood':'## باب 7: پیغام تہٕ نبوتہٕ کِس سایہٕ تل','The First Stage : Strife in the Way of the Call':'## باب 8: دعوتُک گوٚڈنُک مرحلہٕ — دعوتہٕ کِس وتھس منٛز جدوجہد','The Second Phase: Open Preaching':'## باب 9: دوٚیم مرحلہٕ — اعلانیہ دعوت','The Third Phase: Calling unto Islam beyond Makkah':'## باب 10: ترٛیِم مرحلہٕ — مکہٕ نِش نیبر اسلامس کُن دعوت'}
for h in heads:s=s.replace(h,'\n\n@@'+h+'\n\n')
raw=[]
for p in s.split('\n\n'):
 t=' '.join(x.strip() for x in p.splitlines() if x.strip())
 if not t:continue
 if t.startswith('@@'):
  z=t[2:]; h=next(k for k in heads if z.startswith(k));raw.append(('heading',heads[h]));t=z[len(h):].strip()
  if not t:continue
 raw.append(('body',t))
items=[]
for typ,text in raw:
 if typ=='heading':items.append((typ,text));continue
 ss=re.split(r'(?<=[.!?])\s+(?=[A-Z“\"‘\[])',text);chunk=[];n=0
 for q in ss:
  w=len(q.split())
  if chunk and n+w>150:items.append(('body',' '.join(chunk)));chunk=[];n=0
  chunk.append(q);n+=w
 if chunk:items.append(('body',' '.join(chunk)))
out=root/'training-data/book-translations/sealed-nectar/chapters-03-10-machine-draft.jsonl';done=[]
if out.exists():done=[json.loads(x) for x in out.read_text().splitlines() if x.strip()]
print('segments',len(items),'resume',len(done),flush=True)
snapshot='/workspace/.hf-cache/hub/models--facebook--nllb-200-distilled-600M/snapshots/f8d333a098d19b4fd9a8b18f94170487ad3f821d'
tok=AutoTokenizer.from_pretrained(snapshot,src_lang='eng_Latn',local_files_only=True)
translator=ctranslate2.Translator('/workspace/.ct2-nllb-600m',device='cpu',compute_type='int8',inter_threads=1,intra_threads=8)
for base in range(len(done),len(items),16):
 batch=items[base:base+16];src=[v for t,v in batch if t=='body'];trans=[]
 if src:
  tokens=[tok.convert_ids_to_tokens(tok.encode(x,truncation=True,max_length=512)) for x in src]
  results=translator.translate_batch(tokens,target_prefix=[['kas_Arab'] for _ in tokens],beam_size=1,max_decoding_length=320,no_repeat_ngram_size=3)
  trans=[tok.decode(tok.convert_tokens_to_ids(r.hypotheses[0]),skip_special_tokens=True) for r in results]
 j=0
 with out.open('a') as f:
  for typ,en in batch:
   ks=en if typ=='heading' else trans[j];j+=typ=='body'
   f.write(json.dumps({'type':typ,'english':en,'kashmiri':ks},ensure_ascii=False)+'\n')
 print(base+len(batch),'/',len(items),flush=True)
