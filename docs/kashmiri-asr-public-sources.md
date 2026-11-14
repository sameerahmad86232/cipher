# Kashmiri ASR public-source audit

Audit date: 2026-11-12

## Approved training sources

| Source | Material | License | Integration |
| --- | --- | --- | --- |
| [Meta Omnilingual ASR Corpus](https://huggingface.co/datasets/facebook/omnilingual-asr-corpus) | Kashmiri `ks_Arab` speech with transcripts | CC BY 4.0 | Enabled at pinned revision `8648ba8946377697b427ae952076e49fc0e5e44d` |
| [GAASH-Lab Bolbosh](https://huggingface.co/datasets/GAASH-Lab/Bolbosh) | Curated Kashmiri audio/text derived from IndicVoices-R and RASA | CC BY 4.0 on dataset card | Enabled at pinned revision `88aef14aa30bca969b7bda49b056a2483f7fcde8`; hash-deduplicate against IndicVoices |
| [OpenSLR-122 segmented corpus](https://huggingface.co/datasets/programindz/kashmiri-audio-corpus) | 1,955 Kashmiri audio/transcript segments, 16 kHz | GPL-3.0-or-later | Enabled by default at pinned revision `cd0b1408bf2757f7fefc5832a6c12cbc61abc627` |
| [AI4Bharat IndicVoices](https://huggingface.co/datasets/ai4bharat/IndicVoices) | Multi-speaker Kashmiri speech and transcripts | CC BY 4.0 | Supported after accepting the Hugging Face access terms |
| [AI4Bharat IndicVoices-R](https://huggingface.co/datasets/ai4bharat/indicvoices_r) | Read Kashmiri speech and transcripts | CC BY 4.0 | Supported after accepting the Hugging Face access terms |

The preparation script checks script ratio, duration, silence, numeric validity,
duplicate content, Unicode form, and sampling rate. It exports 16 kHz mono PCM
with per-record source, license, revision, and SHA-256 provenance.

## Evaluated but excluded

| Source | Reason excluded |
| --- | --- |
| `humair025/KashmiriSpeech-IndicVoices` | No license declared on the derivative repository. Use the official AI4Bharat source instead. |
| `XKaab/ASR-Kashmiri_4hrs` | Useful metadata and 2,733 validation records, but no license is declared. Do not train on it until the owner clarifies reuse terms. |
| `injilashah/kashmiri_text_and_audio` | No license declared and the repository does not currently expose a documented audio feature. |
| `Faizaniqbal/kashmiri-audio-corpus` | Duplicates the OpenSLR-derived corpus and is access-restricted; the documented public copy is used instead. |

## Reproduction

```bash
python scripts/prepare-public-kashmiri-asr.py --output /kaggle/working/public-kashmiri-asr
```

After accepting both AI4Bharat dataset terms and placing a Hugging Face token in
the runtime secret `HF_TOKEN`:

```bash
python scripts/prepare-public-kashmiri-asr.py \
  --output /kaggle/working/public-kashmiri-asr \
  --include-gated
```

Preparing data does not update the production model. A checkpoint must beat the
fixed reviewed evaluation set before it is eligible for deployment.
