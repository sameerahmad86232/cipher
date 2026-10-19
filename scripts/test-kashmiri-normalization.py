#!/usr/bin/env python3
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

from kashmiri_normalization import normalize_kashmiri

spec = importlib.util.spec_from_file_location("normalize_cli", Path(__file__).with_name("normalize-kashmiri-corpus.py"))
cli = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cli)


@unittest.skipUnless(importlib.util.find_spec("KashmiriNormalizer"), "Install requirements-normalization.txt")
class NormalizationTests(unittest.TestCase):
    def test_vowels_names_and_digits_are_preserved_or_standardized(self):
        for text in ("مےٚ پٔر راتھ کِتاب", "بہٕ چھُس ہمیشہٕ کِتاب پَران", "سۭتۍ منٛز ﷺ FirstCry"):
            self.assertEqual(normalize_kashmiri(text)["normalized"], text)
        self.assertEqual(normalize_kashmiri("١٢٣ ، کِتاب ۔")["normalized"], "123، کِتاب۔")
        self.assertEqual(normalize_kashmiri("۱۲٫۵")["normalized"], "12٫5")
        self.assertEqual(normalize_kashmiri("۱۲")["normalized"], "12")

    def test_typography_cleanup_is_idempotent(self):
        for text in ("ﺏ", "كِتاب", "١٢٣ ، کِتاب ۔", "من\u200cز", "https://example.com/a?x=1&y=2"):
            once = normalize_kashmiri(text)["normalized"]
            self.assertEqual(normalize_kashmiri(once)["normalized"], once)
        self.assertEqual(normalize_kashmiri("ﺏ")["normalized"], "ب")

    def test_transformations_that_remove_marks_are_blocked(self):
        text = "ب\u06ea"
        result = normalize_kashmiri(text)
        self.assertEqual(result["normalized"], text)
        self.assertTrue(result["warnings"])

    def test_jsonl_preserves_originals_other_languages_and_review_status(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            original = {"kashmiri": "كِتاب ، ۱۲", "arabic": "ٱللَّهِ", "english": "book",
                        "humanReview": "approved-by-project-owner"}
            source = root / "input.jsonl"
            output = root / "output.jsonl"
            source.write_text(json.dumps(original, ensure_ascii=False) + "\n", encoding="utf-8")
            before = source.read_bytes()
            report = cli.process(source, output)
            result = json.loads(output.read_text())
            self.assertEqual({field: result[field] for field in original}, original)
            self.assertEqual(result["kashmiriNormalized"], "کِتاب، 12")
            self.assertEqual(source.read_bytes(), before)
            self.assertEqual(report["changed"], 1)
            with self.assertRaises(ValueError):
                cli.process(source, source)
            with self.assertRaises(FileExistsError):
                cli.process(source, output)

    def test_malformed_records_do_not_leave_partial_output(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "input.jsonl"
            output = root / "output.jsonl"
            source.write_text('{"kashmiri":"کِتاب"}\n{"english":"missing field"}\n', encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "Line 2"):
                cli.process(source, output)
            self.assertFalse(output.exists())
            self.assertEqual(sorted(path.name for path in root.iterdir()), ["input.jsonl"])


if __name__ == "__main__":
    unittest.main()
