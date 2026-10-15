#!/usr/bin/env python3
"""Build a conservative Perso-Arabic English–Kashmiri OPUS corpus."""
import hashlib, json, re, urllib.request, zipfile
from collections import defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/"source-data/opus-en-ks"
OUT=ROOT/"training-data/opus-en-ks"
SOURCES={
 "translatewiki":{"version":"v2026-07-01","license":"CC BY 3.0","url":"https://object.pouta.csc.fi/OPUS-translatewiki/v2026-07-01/moses/en-ks.txt.zip"},
 "wikimedia":{"version":"v20260327","license":"CC BY-SA 4.0","url":"https://object.pouta.csc.fi/OPUS-wikimedia/v20260327/moses/en-ks.txt.zip"},
}
KS_MARKS=set("ؠٲۆۄٕۍۭٚ")

def clean(s): return re.sub(r"\s+"," ",s).strip()
def ratio(s,lo,hi):
 letters=[c for c in s if c.isalpha()]
 return sum(lo<=c<=hi for c in letters)/max(1,len(letters))
def acceptable(en,ks):
 if not (2<=len(en.split())<=120 and 2<=len(ks.split())<=120): return False
 if ratio(ks,"\u0600","\u06ff")<.65 or not any(c in KS_MARKS for c in ks): return False
 if not any("a"<=c.lower()<="z" for c in en): return False
 length=len(ks)/max(1,len(en))
 if not .22<=length<=5: return False
 if en.count("{")+en.count("%")+ks.count("{")+ks.count("%")>8: return False
 return True

OUT.mkdir(parents=True,exist_ok=True); RAW.mkdir(parents=True,exist_ok=True)
rows=[]; stats={}
for name,meta in SOURCES.items():
 folder=RAW/name; archive=RAW/f"{name}.zip"
 if not folder.exists():
  if not archive.exists(): urllib.request.urlretrieve(meta["url"],archive)
  with zipfile.ZipFile(archive) as z: z.extractall(folder)
 en_path=next(folder.glob("*.en")); ks_path=next(folder.glob("*.ks"))
 ens=en_path.read_text(encoding="utf-8").splitlines(); kss=ks_path.read_text(encoding="utf-8").splitlines()
 assert len(ens)==len(kss),f"unaligned {name}"
 accepted=0
 for line,(en,ks) in enumerate(zip(ens,kss),1):
  en,ks=clean(en),clean(ks)
  if acceptable(en,ks):
   accepted+=1; rows.append({"english":en,"kashmiri":ks,"source":name,"sourceVersion":meta["version"],"license":meta["license"],"alignmentLine":line,"status":"source-attested-needs-native-review","trainingTier":"silver"})
 stats[name]={"input":len(ens),"acceptedByScriptFilter":accepted,"license":meta["license"],"url":meta["url"]}

# Remove exact duplicates and ambiguous English inputs with multiple targets.
unique={}
for row in rows: unique.setdefault((row["english"].casefold(),row["kashmiri"]),row)
groups=defaultdict(set)
for en,ks in unique: groups[en].add(ks)
rows=[row for (en,ks),row in unique.items() if len(groups[en])==1]
rows.sort(key=lambda r:(r["source"],r["alignmentLine"]))
train=[]; evaluation=[]
for row in rows:
 bucket=int(hashlib.sha256((row["english"]+"\0"+row["kashmiri"]).encode()).hexdigest(),16)%20
 (evaluation if bucket==0 else train).append(row)

def write(path,data): path.write_text("".join(json.dumps(x,ensure_ascii=False)+"\n" for x in data),encoding="utf-8")
write(OUT/"train-silver.jsonl",train); write(OUT/"evaluation-silver.jsonl",evaluation)
manifest={"schemaVersion":1,"languagePair":"eng_Latn-kas_Arab","counts":{"allAccepted":len(rows),"train":len(train),"evaluation":len(evaluation)},"sources":stats,"filterPolicy":["Perso-Arabic ratio >= 65%","contains a Kashmiri-specific character or combining mark","2–120 whitespace tokens per side","length ratio 0.22–5","exact duplicates and conflicting targets removed"],"qualityWarning":"Silver source-attested data, not native-speaker-approved gold. Software UI and Wikimedia alignments can contain unnatural or incorrect language.","redistribution":"Keep attribution and applicable source licenses. Wikimedia-derived rows remain CC BY-SA 4.0.","excluded":["GNOME Kashmiri in Devanagari","Tatoeba Kashmiri in Latin transliteration","raw books/OCR","synthetic translations"]}
(OUT/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps(manifest,ensure_ascii=False))
