#!/usr/bin/env python3
"""Build traceable training assets from owner-approved Hadith corrections."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "koshur-hadith/dist/data/hadiths.json"
CORRECTIONS = ROOT / "training-data/user-reviewed-corrections.json"
OUT = ROOT / "training-data/hadith-corrections"


def write_jsonl(path, rows):
    path.write_text("".join(json.dumps(row, ensure_ascii=False) + "\n" for row in rows), encoding="utf-8")


hadiths = json.loads(SOURCE.read_text(encoding="utf-8"))["records"]
review = json.loads(CORRECTIONS.read_text(encoding="utf-8"))
approved = [row for row in hadiths if row.get("translationStatus") == "approved-by-project-owner"]

passages = [{
    "id": f"bukhari-{row['hadithNumber']}-approved",
    "hadithNumber": row["hadithNumber"],
    "english": row["english"].strip(),
    "kashmiri": row["kashmiri"].strip(),
    "direction": "eng_Latn-kas_Arab",
    "weight": 8,
    "status": "approved-by-project-owner",
    "source": "Sahih al-Bukhari Vol. 1, owner-reviewed Kashmiri translation",
} for row in approved]

preferences = [
    ("true; correct; truth", "پوٗز", "پوٚز", "Use the owner-approved long-vowel spelling."),
    ("false; untrue; a lie", "اَپوٗز", "دَروگ", "Prefer the natural reviewed Kashmiri term in these constructions."),
    ("all around; surrounding", "زوٚپٲر", "چَوگِرد", "Prefer native reviewed wording."),
    ("his friends/companions", "تَمہِ سٕندۍ یار", "تَمہِ سُنٛدۍ ساتھی", "Use یار in the reviewed narrative context."),
    ("afraid of him", "تَمس نِش کھوژان", "تَمس نِش ڈران", "Use the reviewed Kashmiri verb."),
    ("double reward", "دۄگنہٕ اَجر", "زٕ گُنا اَجر", "Use the natural compact construction."),
    ("his feet", "تَمہِ سٕندۍ کھور", "تَمہِ سُنٛدۍ پاد", "Use the reviewed Kashmiri noun."),
    ("one who follows guidance", "یُس ہِدایت رَٹِ", "یُس ہِدایت پَتہٕ کَرِ", "Use the reviewed verb phrase."),
    ("I asked you", "مےٚ پرژھٕے ژےٚ", "مےٚ پرژھُتھ", "Preserve Kashmiri person marking and word order."),
    ("sixty", "شیٹھ", "ساٹھ", "Use the owner-approved Kashmiri numeral."),
    ("a Muslim is the one who", "مُسلمان چھُ سُہ", "مُسلمان سُہ چھُ", "Use the reviewed predicate order."),
    ("an emigrant is the one who", "مُہاجِر چھُ سُہ", "مُہاجِر سُہ چھُ", "Use the reviewed predicate order."),
    ("some people asked", "کینژھو لُکو پرژھ", "کینہہ لُکَن پرژھ", "Use the reviewed plural-agent construction."),
    ("a man asked", "اَکہِ شَخصَن پروژھ", "اَکہِ مَہنؠو پرژھ", "Use the reviewed noun and verb spelling."),
    ("to give people food", "لُکَن کھؠن دِیُن", "لُکَن کھؠن دِیِو", "Use the reviewed infinitive form."),
    ("none of you has faith until", "توہہِ منٛز چھُنہٕ کانٛسہِ تۆتام ایمان، یوتام", "توہہِ منٛز کانٛسہِ آسِ نہٕ ایمان، یوتام", "Use the reviewed negative existential and condition structure."),
    ("by that Being", "قَسَم چھِ تَمی ذاتُک", "قَسَم چھُ تَمہِ ذاتُک", "Use the owner-approved agreement and demonstrative form."),
    ("in Whose hand my life is", "یَمی سٕندِس اَتھَس منٛز میون زوٗ چھُ", "یَمہِ اَتھَس منٛز میٲنۍ جان چھِ", "Use the reviewed possessive and idiomatic term for life."),
    ("leader of a group of six", "شیٚن ہٕندِس جَمٲژ ہُنٛد رَہنما", "اَکھ نَقیٖب", "Retain the project-owner explanation of the historical title."),
    ("do not accuse an innocent person", "کٲنسہِ شَخصَس پؠٹھ مَہ لَگٲوِو اِلزام، یُس بے گُناہ آسہِ", "کانٛسہِ بے گُناہَس پؠٹھ تہمت مٲ لٲگِو", "Use the reviewed negative imperative and relative clause."),
    ("if he is punished for it in this world", "میلہِس دُنیاہَس منٛز اَمیُک سزا", "دُنیاہَس منٛز تَمیُک سزا میلہِ", "Use the reviewed recipient-first word order."),
    ("Allah keeps his sin concealed", "اللہ تعالہ تھاوِ تَمسُنٛد گُناہ ژوٗرِ", "اللہ تعالہ تَمیُک گُناہ ژھاوِ", "Use the reviewed concealment construction."),
]
preference_rows = [{
    "id": f"hadith-pref-{index:03d}",
    "english": english,
    "chosen": chosen,
    "rejected": rejected,
    "reason": reason,
    "status": "approved-by-project-owner",
    "trainingUse": "preference-and-post-editing",
} for index, (english, chosen, rejected, reason) in enumerate(preferences, 1)]

patterns = [
    {"id": "question-command", "meaning": "What does he command you?", "pattern": "سُہ کیا چھُ توہہِ حُکم دِوان؟", "rule": "Place کیا after the subject in this reviewed question."},
    {"id": "question-war", "meaning": "Did war ever occur between you and him?", "pattern": "کیا توہہِ تہٕ تَمس دَرمیان سَپدوا زانہہ جَنگ؟", "rule": "Use دَرمیان with the oblique pronoun تَمس."},
    {"id": "family-status", "meaning": "What is the status of his family among you?", "pattern": "تُہۍ منٛز کیا چھِ تَمہِ سٕندِ خاندانٕچ حیثیت؟", "rule": "Use the possessive construction خاندانٕچ حیثیت."},
    {"id": "reported-question", "meaning": "I asked you", "pattern": "مےٚ پرژھٕے ژےٚ", "rule": "Retain first-person past and second-person object marking."},
    {"id": "conditional-report", "meaning": "If what you said is true", "pattern": "اَگر ژےٚ پوٗز ووٚنُتھ", "rule": "Use ووٚنُتھ for the completed second-person report."},
    {"id": "respectful-speech", "meaning": "The Messenger of Allah said", "pattern": "رَسوٗلُ اللہ صَلَّی اللہُ عَلَیہِ وَسَلَّمَن فَرموو", "rule": "Use فَرموو and preserve the complete honorific."},
    {"id": "predicate-identity", "meaning": "A Muslim/emigrant is the one who", "pattern": "مُسلمان چھُ سُہ / مُہاجِر چھُ سُہ", "rule": "Place چھُ before سُہ in this reviewed identifying construction."},
    {"id": "possessive-category", "meaning": "Modesty is a branch of faith", "pattern": "حَیا چھِ ایمانَچ اَکھ شاخ", "rule": "Use the possessive/category form ایمانَچ."},
    {"id": "plural-agent-question", "meaning": "Some people asked", "pattern": "کینژھو لُکو پرژھ", "rule": "Preserve the reviewed plural-agent form."},
    {"id": "singular-agent-question", "meaning": "A man asked", "pattern": "اَکہِ شَخصَن پروژھ", "rule": "Use شَخصَن with the reviewed past verb پروژھ."},
    {"id": "faith-until-condition", "meaning": "None of you has faith until", "pattern": "توہہِ منٛز چھُنہٕ کانٛسہِ تۆتام ایمان، یوتام", "rule": "Use the reviewed negative existential followed by یوتام."},
    {"id": "oath-life-idiom", "meaning": "By Him in Whose hand my life is", "pattern": "قَسَم چھِ تَمی ذاتُک، یَمی سٕندِس اَتھَس منٛز میون زوٗ چھُ", "rule": "Preserve the reviewed Kashmiri oath and life idiom."},
    {"id": "negative-imperative", "meaning": "Do not accuse an innocent person", "pattern": "کٲنسہِ شَخصَس پؠٹھ مَہ لَگٲوِو اِلزام، یُس بے گُناہ آسہِ", "rule": "Use مَہ with the reviewed imperative and relative clause."},
    {"id": "worldly-punishment", "meaning": "He receives its punishment in this world", "pattern": "میلہِس دُنیاہَس منٛز اَمیُک سزا", "rule": "Place the recipient-marked verb before the location and object."},
    {"id": "concealed-sin", "meaning": "Allah keeps his sin concealed", "pattern": "اللہ تعالہ تھاوِ تَمسُنٛد گُناہ ژوٗرِ", "rule": "Use تھاوِ plus ژوٗرِ for concealment."},
]

review_candidates = [
    {"english": "The king was afraid of him.", "kashmiri": "بادشاہ چھُ تَمس نِش کھوژان۔", "status": "pending-human-review"},
    {"english": "I asked you about his family status.", "kashmiri": "مےٚ پرژھٕے ژےٚ تَمہِ سٕندِ خاندانٕچ حیثیت۔", "status": "pending-human-review"},
    {"english": "He spoke the truth.", "kashmiri": "تٔمۍ ووٚن پوٗز۔", "status": "pending-human-review"},
    {"english": "He said something false.", "kashmiri": "تٔمۍ ووٚن اَپوٗز۔", "status": "pending-human-review"},
]

OUT.mkdir(parents=True, exist_ok=True)
write_jsonl(OUT / "approved-passages.jsonl", passages)
write_jsonl(OUT / "preference-pairs.jsonl", preference_rows)
write_jsonl(OUT / "review-candidates.jsonl", review_candidates)
(OUT / "grammar-patterns.json").write_text(json.dumps(patterns, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(OUT / "manifest.json").write_text(json.dumps({
    "schemaVersion": 1,
    "approvedHadiths": len(passages),
    "approvedPassagePairs": len(passages),
    "approvedPreferencePairs": len(preference_rows),
    "approvedGrammarPatterns": len(patterns),
    "pendingReviewCandidates": len(review_candidates),
    "reviewedLexiconEntries": len(review["lexicon"]),
    "trainingPolicy": {
        "approvedPassageWeight": 8,
        "pendingCandidatesUsedForTraining": False,
        "rawDraftsUsedAsGold": False,
        "recommendedUse": "Mix with broad parallel data; never fine-tune solely on seven Hadiths.",
    },
}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"approvedPassages": len(passages), "preferences": len(preference_rows), "patterns": len(patterns), "pending": len(review_candidates)}))
