#!/usr/bin/env python3
"""Build reproducible no-GPU grammar/style evidence for Kashmiri hadith translation.

This mines attested forms and reviewed terminology. It does not declare corpus
sentences or OCR output to be correct, and it never upgrades draft hadiths.
"""

from collections import Counter, defaultdict
import json
from pathlib import Path
import re
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
WEB_ROOT = ROOT / "dist" if (ROOT / "dist" / "assets").is_dir() else ROOT
WORD = re.compile(r"[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]+(?:[\u064b-\u065f\u0670\u06d6-\u06ed]+)?")

CONSTRUCTIONS = {
    "honorifics": ["حضرت", "حَضرت", "رسول", "رَسوٗلُ", "نبی", "نَبی", "فرموو", "فَرموو", "تشریٖف"],
    "revelation": ["وحی", "وَحی", "نازل", "نازِل", "فرشتہ", "فِرِشتہ"],
    "reporting": ["روایت", "رِوایت", "وون", "ووٚن", "فرموو", "فَرموو", "بوٗز"],
    "negation": ["نہ", "نہٕ", "نٕہ", "چھُنہٕ", "چُھنہٕ"],
    "postpositions": ["منٛز", "مَنٛز", "پؠٹھ", "سۭتۍ", "نِش", "کُن", "خٲطرٕ", "تام"],
    "auxiliaries": ["چھُ", "چُھ", "چھِ", "چِھ", "چھےٚ", "اوس", "آس", "آسِ"],
    "relative_correlative": ["یُس", "یۄس", "یِم", "یَتھ", "سُہ", "سۄ", "تِم", "تَتھ"],
}


def words(text):
    return [token for token in WORD.findall(str(text).replace("ﷺ", " ")) if any(unicodedata.category(char).startswith("L") for char in token)]


def ngrams(tokens, size):
    return (" ".join(tokens[index:index + size]) for index in range(len(tokens) - size + 1))


def load_corpus():
    records = []
    for split in ("train", "dev", "test"):
        path = ROOT / "training-data" / "coril" / f"{split}.tsv"
        if not path.exists():
            continue
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            fields = line.split("\t")
            if len(fields) >= 2 and len(words(fields[1])) >= 3:
                records.append((fields[1].strip(), f"coril/{split}.tsv:{number}"))
    return records


def top(counter, limit):
    return [{"text": text, "count": count} for text, count in counter.most_common(limit)]


def main():
    corrections = json.loads((ROOT / "training-data" / "user-reviewed-corrections.json").read_text(encoding="utf-8"))
    hadith_path = ROOT / "koshur-hadith" / "dist" / "data" / "hadiths.json"
    hadiths = json.loads(hadith_path.read_text(encoding="utf-8"))["records"] if hadith_path.exists() else []
    corpus = load_corpus()

    unigrams, bigrams, trigrams = Counter(), Counter(), Counter()
    evidence = defaultdict(lambda: {"count": 0, "examples": []})
    for text, source in corpus:
        tokens = words(text)
        unigrams.update(tokens)
        bigrams.update(ngrams(tokens, 2))
        trigrams.update(ngrams(tokens, 3))
        token_set = set(tokens)
        for category, forms in CONSTRUCTIONS.items():
            present = [form for form in forms if form in token_set]
            if not present:
                continue
            evidence[category]["count"] += 1
            if len(evidence[category]["examples"]) < 5:
                evidence[category]["examples"].append({"text": text[:500], "forms": present, "source": source})

    approved_hadiths = [row for row in hadiths if row.get("translationStatus") == "approved-by-project-owner"]
    draft_hadiths = [row for row in hadiths if row.get("translationStatus") != "approved-by-project-owner"]
    profile = {
        "schemaVersion": 1,
        "title": "Kashmiri hadith translation language profile",
        "generatedFrom": {
            "corpusSentences": len(corpus),
            "ownerReviewedCorrections": len(corrections.get("corrections", [])),
            "ownerReviewedTerms": len(corrections.get("lexicon", [])),
            "approvedHadiths": len(approved_hadiths),
            "draftHadithsExcludedFromGold": len(draft_hadiths),
        },
        "policy": [
            "Only project-owner-approved hadith translations and corrections are gold style evidence.",
            "CorIL sentences supply frequency and construction evidence, not automatic proof of correctness.",
            "OCR books are excluded from automatic gold training until aligned and reviewed.",
            "Arabic source wording must be retained beside every religious translation for verification.",
        ],
        "frequencies": {
            "words": top(unigrams, 300),
            "bigrams": top(bigrams, 250),
            "trigrams": top(trigrams, 200),
        },
        "constructionEvidence": dict(evidence),
        "approvedTerminology": corrections.get("lexicon", []),
        "approvedHadithStyleExamples": [{
            "id": row["id"], "hadithNumber": row["hadithNumber"], "english": row["english"],
            "kashmiri": row["kashmiri"], "sourceUrl": row["sourceUrl"], "revision": row.get("revision")
        } for row in approved_hadiths],
        "reviewChecklist": [
            "Preserve narrator attribution and respectful honorifics.",
            "Use فرموو or another approved respectful reporting verb for the Prophet ﷺ where context requires it.",
            "Check tense, person, number and gender agreement in every finite clause.",
            "Check perfective transitive clauses for agent case and object-controlled/default agreement.",
            "Use Kashmiri postposition order rather than copying English preposition order.",
            "Preserve repeated wording when repetition is meaningful in the source.",
            "Do not replace technical Islamic terms merely for stylistic variety.",
            "Mark uncertain wording as draft and require human review before publication as approved.",
        ],
    }

    outputs = [
        ROOT / "training-data" / "hadith-language-profile.json",
        WEB_ROOT / "assets" / "hadith-language-profile.json",
    ]
    for output in outputs:
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(profile, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(profile["generatedFrom"], ensure_ascii=False))


if __name__ == "__main__":
    main()
