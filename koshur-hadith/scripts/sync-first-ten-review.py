#!/usr/bin/env python3
"""Synchronize the first twenty-six review translations and public source text."""

from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT.parent / "review-output" / "sahih-bukhari-1-10-kashmiri-review.md"
OUTPUT = ROOT / "dist" / "data" / "hadiths.json"
META = {
    5: ("Revelation", "Said bin Jubair from Ibn Abbas", "سعید بِن جُبیر، حضرت اِبنِ عباس رضی اللہ عنہما نِش"),
    6: ("Revelation", "Ibn Abbas", "حضرت اِبنِ عباس رضی اللہ عنہما"),
    7: ("Revelation", "Ibn Abbas from Abu Sufyan bin Harb", "حضرت اِبنِ عباس رضی اللہ عنہما، ابو سُفیان بِن حرب نِش"),
    8: ("Belief", "Ibn Umar", "حضرت اِبنِ عُمر رضی اللہ عنہما"),
    9: ("Belief", "Abu Huraira", "حضرت ابو ہُریرہ رضی اللہ عنہ"),
    10: ("Belief", "Abdullah bin Amr", "حضرت عبداللہ بِن عَمرو رضی اللہ عنہما"),
    11: ("Belief", "Abu Musa", "حضرت ابو موسیٰ رضی اللہ عنہ"),
    12: ("Belief", "Abdullah bin Amr", "حضرت عبداللہ بِن عَمرو رضی اللہ عنہما"),
    13: ("Belief", "Anas", "حضرت اَنس رضی اللہ عنہ"),
    14: ("Belief", "Abu Huraira", "حضرت ابو ہُریرہ رضی اللہ عنہ"),
    15: ("Belief", "Anas", "حضرت اَنس رضی اللہ عنہ"),
    16: ("Belief", "Anas", "حضرت اَنس رضی اللہ عنہ"),
    17: ("Belief", "Anas", "حضرت اَنس رضی اللہ عنہ"),
    18: ("Belief", "Ubada bin As-Samit", "حضرت عُبادہ بِن صامت رضی اللہ عنہ"),
    19: ("Belief", "Abu Said Al-Khudri", "حضرت ابو سعید خُدری رضی اللہ عنہ"),
    20: ("Belief", "Aisha", "حضرت عائشہ رضی اللہ عنہا"),
    21: ("Belief", "Anas", "حضرت اَنس رضی اللہ عنہ"),
    22: ("Belief", "Abu Said Al-Khudri", "حضرت ابو سعید خُدری رضی اللہ عنہ"),
    23: ("Belief", "Abu Said Al-Khudri", "حضرت ابو سعید خُدری رضی اللہ عنہ"),
    24: ("Belief", "Abdullah bin Umar", "حضرت عبداللہ بِن عُمر رضی اللہ عنہما"),
    25: ("Belief", "Ibn Umar", "حضرت اِبنِ عُمر رضی اللہ عنہما"),
    26: ("Belief", "Abu Huraira", "حضرت ابو ہُریرہ رضی اللہ عنہ"),
}

class HadithParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.targets = {"english_hadith_full": [], "arabic_hadith_full": []}; self.stack = []
    def handle_starttag(self, tag, attrs):
        classes = dict(attrs).get("class", "").split(); active = self.stack[-1] if self.stack else None
        for target in self.targets:
            if target in classes: active = target
        self.stack.append(active)
    def handle_endtag(self, tag):
        if self.stack: self.stack.pop()
    def handle_data(self, data):
        if self.stack and self.stack[-1] in self.targets: self.targets[self.stack[-1]].append(data)

def source_text(number):
    request = Request(f"https://sunnah.com/bukhari:{number}", headers={"User-Agent": "Koshur-Hadith/1.0"})
    parser = HadithParser(); parser.feed(urlopen(request, timeout=30).read().decode("utf-8"))
    clean = lambda value: re.sub(r"\s+", " ", " ".join(value)).strip()
    return clean(parser.targets["english_hadith_full"]), clean(parser.targets["arabic_hadith_full"])

def review_translations():
    text = REVIEW.read_text(encoding="utf-8"); found = {}
    pattern = re.compile(r"^## حدیث (\d+) .*?\n\n.*?\*\*حیثیت:(.*?)\n\n(.*?)(?=\n\n---)", re.M | re.S)
    for number, status, body in pattern.findall(text):
        found[int(number)] = {"text": body.strip(), "approved": "منظور شدہ" in status}
    return found

def main():
    data = json.loads(OUTPUT.read_text(encoding="utf-8")); existing = {row["hadithNumber"]: row for row in data["records"]}; translations = review_translations()
    assert set(range(1, 27)).issubset(translations), "Review file must contain Hadiths 1–26"
    for number in range(5, 27):
        english, arabic = source_text(number); book, narrator, narrator_ks = META[number]; prior = existing.get(number, {}); approved = translations[number]["approved"]
        existing[number] = {"id": f"bukhari-{number}", "collection": "Sahih al-Bukhari", "collectionKashmiri": "صَحیح بُخاری", "hadithNumber": number, "book": book, "narrator": narrator, "narratorKashmiri": narrator_ks, "arabic": arabic, "english": english, "kashmiri": translations[number]["text"], "sourceUrl": f"https://sunnah.com/bukhari:{number}", "translationStatus": "approved-by-project-owner" if approved else "draft-needs-project-owner-review", "translationNote": "Reviewed and approved sentence by sentence by the project owner." if approved else "Kashmiri review draft prepared from the uploaded volume; not yet approved.", "revision": int(prior.get("revision", 0)) + 1}
    data["records"] = [existing[number] for number in range(1, 27)]
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    approved_count = sum(row["translationStatus"] == "approved-by-project-owner" for row in data["records"])
    print(json.dumps({"records": len(data["records"]), "approved": approved_count, "awaitingReview": len(data["records"]) - approved_count}))

if __name__ == "__main__": main()
