# Whisper v5 licensed real-speech continuation

v5 is a candidate-only continuation from
`Sameer0313/kashmiri-whisper-lora-v4-candidate`.

- Sources: OpenSLR-122, official IndicVoices, official IndicVoices-R
- Maximum: 6,000 verified clips per source
- Validation held out inside the training job: 200 clips
- Epochs: 4
- Effective batch size: 16
- Learning rate: `1e-5`
- Synthetic fallback: prohibited
- Candidate repository: `Sameer0313/kashmiri-whisper-lora-v5-candidate`

The production model remains v4 until v5 beats it on the separate fixed
150-clip controlled evaluation and passes native-speaker listening review.
