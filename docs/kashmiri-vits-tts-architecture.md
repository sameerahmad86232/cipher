# Next-Generation Kashmiri Text-to-Speech (VITS & Piper ONNX)

**Repository:** [sameerahmad86232/cipher](https://github.com/sameerahmad86232/cipher)  
**Architecture:** VITS (Variational Inference with Adversarial Learning) + HiFi-GAN Vocoder  
**Target Output:** Real-time 22,050 Hz Studio-Quality Kashmiri Speech & Browser-ready Piper ONNX  
**Script:** [`scripts/finetune-vits-kashmiri.py`](../scripts/finetune-vits-kashmiri.py)  

---

## 1. Why VITS Outperforms Traditional TTS (Bolbosh)

Traditional two-stage Kashmiri TTS systems (such as early Bolbosh Matcha-TTS implementations) rely on separate acoustic models (predicting Mel spectrograms) and external vocoders (converting spectrograms into waveforms). This two-stage setup introduces:
1. **Compounding alignment errors** on rare Kashmiri central vowels (`ٲ`, `ـٕ`).
2. **Phase distortion and robotic timbre** on consonant palatalizations (`ـؠ`).
3. **Heavy compute overhead**, making offline in-browser synthesis sluggish.

### The VITS Advantage:
* **End-to-End Joint Optimization**: Connects the text encoder directly to the raw waveform generator through a normalizing flow latent space $z$.
* **Monotonic Alignment Search (MAS)**: Unsupervised dynamic programming finds exact phoneme-to-audio temporal alignments without requiring a forced aligner.
* **Adversarial Periodicity Discriminator (MPD)**: Eliminates synthetic artifacts and reproduces natural vocal tract resonance.
* **Direct Export to Piper ONNX**: Synthesizes speech at **40× real-time speed** directly in Node.js or browser WebAssembly!

---

## 2. Kashmiri Phoneme & Orthography Support

The model encodes the complete Perso-Arabic phonetic inventory of Kashmiri:

```python
KASHMIRI_PAD = "_"
KASHMIRI_PUNCTUATION = "؛،۔؟! "
KASHMIRI_CONSONANTS = "ابپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلمنوہھءییے"
KASHMIRI_DIACRITICS = "ًٌٍَُِْٰٖٗ٘ٲٕۄۆؠ"
```

### Specialized Phonemic Rules:
* **Central Unrounded Vowels**:
  * `/ɨ/` represented by Kashmiri Zer (`ـٕ`, e.g. `کٔن` — ear).
  * `/ɨː/` represented by Kashmiri Alif Madd (`ٲ`, e.g. `پٲٹھۍ` — like/manner).
* **Back Vowels**:
  * `/ɔ/` represented by Kashmiri Vao with circle (`ۄ`).
  * `/o/` represented by Kashmiri Vao with inverted v (`ۆ`).
* **Consonant Palatalization**:
  * Consonants followed by Kashmiri Yeh (`ؠ`) are encoded as palatalized affricates/stops (`تھؠ`, `کھؠ`).

---

## 3. Training on Google Colab (Free T4 GPU) & Kaggle

Run the training pipeline directly in Google Colab with 1-click execution:

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/sameerahmad86232/cipher/blob/main/colab-kashmiri-vits-training.ipynb)

Or run on local / Kaggle GPU using:
```bash
python scripts/finetune-vits-kashmiri.py
```

### Key Training Hyperparameters:
* **Sample Rate**: 22,050 Hz (16-bit PCM mono)
* **FFT / Hop / Window**: $1024$ / $256$ / $1024$ (80 Mel channels)
* **Batch Size**: 16
* **Epochs**: 100
* **Learning Rate**: $2.0 \times 10^{-4}$ with Exponential Decay
* **Loss Functions**: Mel-spectrogram Reconstruction L1 + KL Divergence + Adversarial Least-Squares GAN Loss

---

## 4. How to Run Browser Inference (Piper ONNX)

Once training finishes, the pipeline generates `kashmiri_vits.onnx` and `kashmiri_vits.json`.

### Python Inference:
```python
import onnxruntime as ort
import numpy as np
import soundfile as sf
import json

# 1. Load Model & Config
session = ort.InferenceSession("kashmiri-vits-tts-export/kashmiri_vits.onnx")
config = json.load(open("kashmiri-vits-tts-export/kashmiri_vits.json"))
char_to_id = config["phoneme_id_map"]

# 2. Tokenize Input Text
text = "کٲشُر زَبان چھِ اَکھ خوٗبصوٗرَت زَبان۔"
seq = [char_to_id[ch] for ch in text if ch in char_to_id]
text_tensor = np.array([seq], dtype=np.int64)
len_tensor = np.array([len(seq)], dtype=np.int64)

# 3. Generate Audio
outputs = session.run(None, {"text": text_tensor, "text_lengths": len_tensor})
audio_wav = outputs[0][0, 0]

# 4. Save WAV
sf.write("kashmiri_speech.wav", audio_wav, samplerate=22050)
print("Speech synthesized successfully to kashmiri_speech.wav!")
```

### TypeScript / React Frontend Integration:
```typescript
import { Piper } from '@piper-js/web';

export async function speakKashmiri(text: string) {
  const piper = await Piper.create({
    modelUri: '/models/kashmiri_vits.onnx',
    configUri: '/models/kashmiri_vits.json',
  });

  const wavBlob = await piper.synthesize(text);
  const audio = new Audio(URL.createObjectURL(wavBlob));
  audio.play();
}
```
