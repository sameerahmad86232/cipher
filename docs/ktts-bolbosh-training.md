# KTTS → Bolbosh voice adaptation

This pipeline adapts the public GAASH Lab Bolbosh Matcha-TTS checkpoint to the
single male voice in the KTTS corpus. It deliberately retains Bolbosh's 424
speaker architecture and assigns KTTS to speaker ID 422, allowing the released
male speaker slot to be refined without an incompatible embedding resize.

## Data and licence

- Dataset: `programindz/kashmiri-tts-single-speaker`
- Pinned revision: `6819f8b4a49d6c8070008ba69bf255b6b8296b09`
- Original DOI: `10.17632/5c4dcvxdmb.2`
- Licence: CC BY-NC 3.0
- Permitted release: research and other non-commercial use with attribution

The preparer rejects silence, damaged audio, samples outside 0.8–20 seconds,
and rows without Kashmiri-script text. Splits are deterministic and based on a
hash of the transcript and audio bytes.

## Training target

- Base: `GAASH-Lab/Matcha-TTS-Kashmiri`
- Architecture: Matcha-TTS conditional flow matching + HiFi-GAN
- Sample rate: 22,050 Hz
- Precision: mixed FP16
- GPU target: Kaggle T4/P100
- First run: 30 epochs, batch size 16

Generated checkpoints and audio must remain labelled **experimental**,
**AI-generated**, and **non-commercial** until native-speaker listening review
is complete.
