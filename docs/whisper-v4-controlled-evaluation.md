# Kashmiri Whisper controlled evaluation

Evaluation date: 2026-11-13  
Dataset: `ai4bharat/IndicVoices` Kashmiri validation split  
Licence: CC BY 4.0  
Held-out samples: 150 identical clips per checkpoint

| Checkpoint | WER | CER |
|---|---:|---:|
| v2 stable | 84.55% | 42.54% |
| v3 public candidate | 85.89% | 39.74% |
| **v4 real-speech** | **76.99%** | **37.16%** |

v4 is the production recommendation because it achieved the lowest WER and
CER on the same held-out set. These error rates remain high, so output is still
labelled as automatic and user correction remains part of the product flow.
The voice-chat route uses greedy decoding for latency; Speech Lab retains the
quality-focused beam-search endpoint.
