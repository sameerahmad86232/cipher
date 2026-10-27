# Translation dictionary workspace

The repository keeps the dictionary for future book translation and review. It is not bundled into the Koshur Noor mobile app.

The source collection contains more than 58,000 records. After stable deduplication, `server-data/lexicon.json` currently exposes 49,682 searchable headwords with English glosses and available romanization.

## Search

From the repository root:

```bash
python3 scripts/search-translation-dictionary.py "mercy"
python3 scripts/search-translation-dictionary.py "کِتاب"
python3 scripts/search-translation-dictionary.py "Na:v" --limit 50
python3 scripts/search-translation-dictionary.py "knowledge" --json
```

Search is Unicode-normalized, case-insensitive for English and romanization, and tolerant of Kashmiri vowel marks. Exact results appear before prefix and substring matches.

## Translation policy

Dictionary glosses are lexical evidence. They are not aligned sentences and must not be treated as automatically approved translations or neural-training pairs. For each book passage:

1. retrieve candidate terms from the dictionary;
2. compare them with project-owner corrections and approved phrase memory;
3. translate the complete sentence in context;
4. record the source and uncertainty;
5. require human review before publication or promotion into approved training data.

Owner-reviewed corrections take precedence over dictionary glosses. Religious texts additionally require careful review of register, person, gender, number, tense, and theological meaning.
