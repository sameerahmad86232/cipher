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
