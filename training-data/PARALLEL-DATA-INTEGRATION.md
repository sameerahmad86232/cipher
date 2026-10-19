# English–Kashmiri data integration

The website's existing translator is **not** replaced by this pipeline. Neural
training needs a CUDA runtime and model evaluation before deployment. No model
weights or gated corpora are committed to this repository.

| Resource | Treatment | Access/license check |
| --- | --- | --- |
| BPCC `kas_Arab.tsv` | Optional English→Kashmiri training | Gated; obtain under its repository terms. |
| SMUQamar 30K | Optional training in noncommercial experiments | Gated; CC BY-NC-SA 4.0. |
| SMUQamar 270K | Optional training in noncommercial experiments | Gated; CC BY-NC-SA 4.0. Overlaps 30K; deduplicated. |
| FLORES-200 `kas_Arab-eng_Latn` | Evaluation only | Gated on Hugging Face; CC BY-SA 4.0. |
| FLORES+ | Evaluation only | Gated; CC BY-SA 4.0. |
| Omarrran 1M synthetic | Excluded | Gated; license unspecified in the current dataset metadata. Quality also unverified. |

The source metadata above was checked on 2026-10-19. Recheck it before each
commercial use or publication; open viewing does not itself grant redistribution.

After separately obtaining approved files, run `python scripts/prepare-kashmiri-parallel.py
--bpcc path/to/kas_Arab.tsv --qamar30 path/to/30k --qamar270 path/to/270k
--allow-noncommercial --flores path/to/flores.tsv`. Qamar directories should
contain aligned `English.txt` and `Kashmiri.txt`; the FLORES TSV requires
`sentence_eng_Latn` and `sentence_kas_Arab` columns. You may omit unavailable
sources. Outputs default to ignored `training-data/prepared-parallel/`.

On a CUDA machine, set `PREPARED_PARALLEL_DIR=training-data/prepared-parallel`
when running `python scripts/finetune-nllb-quality-staged.py`. This is a
research workflow, not evidence of a trained or deployed model. Validate
chrF/BLEU and human-rated Kashmiri quality before using any adapter live.
