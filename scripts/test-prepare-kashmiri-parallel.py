#!/usr/bin/env python3
import argparse
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

MODULE = Path(__file__).with_name("prepare-kashmiri-parallel.py")
spec = importlib.util.spec_from_file_location("parallel_prepare", MODULE)
prepare_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(prepare_module)


class ParallelPreparationTests(unittest.TestCase):
    @unittest.skipUnless(importlib.util.find_spec("KashmiriNormalizer"), "Install requirements-normalization.txt")
    def test_normalization_keeps_gold_and_eval_targets_and_prioritizes_gold_duplicates(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            bpcc = root / "bpcc.tsv"
            bpcc.write_text("src\ttgt\tsrc_lang\ttgt_lang\n"
                            "I read books.\tبہٕ چھُس کِتاب پَران\teng_Latn\tkas_Arab\n"
                            "We read books.\tاَسۍ چھِ كِتاب پَران\teng_Latn\tkas_Arab\n", encoding="utf-8")
            gold_text = " بہٕ  چھُس كِتاب پَران "
            approved = root / "gold.jsonl"
            approved.write_text(json.dumps({"english": "I read books.", "kashmiri": gold_text}) + "\n", encoding="utf-8")
            flores = root / "flores.tsv"
            eval_text = "تِم چھِ كِتاب پَران"
            flores.write_text("sentence_eng_Latn\tsentence_kas_Arab\nThey read books.\t" + eval_text + "\n", encoding="utf-8")
            args = argparse.Namespace(bpcc=bpcc, qamar30=None, qamar270=None, flores=flores,
                                      flores_plus=None, approved=approved, output=root / "out",
                                      allow_noncommercial=False, normalize_kashmiri=True)
            report = prepare_module.prepare(args)
            rows = [json.loads(line) for name in ("train.jsonl", "validation.jsonl")
                    for line in (args.output / name).read_text().splitlines()]
            self.assertEqual(len(rows), 2)
            gold = next(row for row in rows if row["english"] == "I read books.")
            self.assertEqual(gold["tier"], "gold")
            self.assertEqual(gold["kashmiri"], gold_text)
            self.assertNotEqual(gold["kashmiriNormalized"], gold_text)
            silver = next(row for row in rows if row["english"] == "We read books.")
            self.assertIn("كِتاب", silver["kashmiriOriginal"])
            self.assertIn("کِتاب", silver["kashmiri"])
            evaluation = json.loads((args.output / "flores-evaluation.jsonl").read_text())
            self.assertEqual(evaluation["kashmiri"], eval_text)
            self.assertTrue(report["normalization"]["goldTargetsPreserved"])

    def test_eval_never_enters_training_and_noncommercial_requires_opt_in(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            qamar = root / "qamar"
            qamar.mkdir()
            (qamar / "English.txt").write_text("I read books.\nWe go home.\n", encoding="utf-8")
            (qamar / "Kashmiri.txt").write_text("بہٕ چھُس کِتاب پَران\nاَسۍ چھِ گَرٕ گَژھان\n", encoding="utf-8")
            flores = root / "flores.tsv"
            flores.write_text("sentence_eng_Latn\tsentence_kas_Arab\nI read books.\tبہٕ چھُس کِتاب پَران\n", encoding="utf-8")
            approved = root / "approved.jsonl"
            approved.write_text("", encoding="utf-8")
            args = argparse.Namespace(bpcc=None, qamar30=qamar, qamar270=None, flores=flores,
                                      flores_plus=None, approved=approved, output=root / "out",
                                      allow_noncommercial=False)
            with self.assertRaisesRegex(ValueError, "CC BY-NC-SA"):
                prepare_module.prepare(args)
            args.allow_noncommercial = True
            report = prepare_module.prepare(args)
            self.assertEqual(report["floresEvaluation"], 1)
            self.assertEqual(report["train"] + report["validation"], 1)
            rows = [json.loads(line) for file in ("train.jsonl", "validation.jsonl")
                    for line in (args.output / file).read_text(encoding="utf-8").splitlines()]
            self.assertEqual(rows[0]["english"], "We go home.")


if __name__ == "__main__":
    unittest.main()
