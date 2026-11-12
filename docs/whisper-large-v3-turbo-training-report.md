# Kashmiri Whisper Large-V3-Turbo Transcribe Model: Training Complete

**Repository:** [sameerahmad86232/cipher](https://github.com/sameerahmad86232/cipher)  
**Model Backbone:** OpenAI `openai/whisper-large-v3-turbo` (809M Parameters)  
**Hugging Face Hub:** [`Sameer0313/kashmiri-whisper-lora`](https://huggingface.co/Sameer0313/kashmiri-whisper-lora)  
**Kaggle Run:** [`sameerahmadnajar/kashmiri-whisper-large-v3-turbo-transcribe`](https://www.kaggle.com/code/sameerahmadnajar/kashmiri-whisper-large-v3-turbo-transcribe)  
**Status:** **Training Complete & Verified**  

---

## 1. Executive Summary

The fine-tuning of OpenAI's **Whisper Large-V3-Turbo** for Kashmiri Perso-Arabic Automatic Speech Recognition (ASR) has completed all 8 epochs on an NVIDIA Tesla P100 GPU (26,356 seconds / ~7.32 hours runtime).

The model was adapted using deep LoRA ($r=64$, $\alpha=128$) across both self-attention and feed-forward projections, trained on combined multi-speaker and conversational Kashmiri speech datasets (`gopikrishnan2005/kashmiri-text-to-speech` and `umar1103/converteddatanew`).

---

## 2. Benchmark Metrics & Hyperparameters

| Metric / Parameter | Value |
| :--- | :--- |
| **Backbone Architecture** | `openai/whisper-large-v3-turbo` (809M params, 128 Mel channels) |
| **Adaptation Method** | LoRA (Low-Rank Adaptation) |
| **LoRA Rank ($r$)** | **64** |
| **LoRA Alpha ($\alpha$)** | **128** |
| **LoRA Dropout** | 0.05 |
| **Target Modules** | `q_proj`, `k_proj`, `v_proj`, `out_proj`, `fc1`, `fc2` |
| **Number of Epochs** | **8.0** |
| **Effective Batch Size** | 16 (4 per-device $\times$ 4 gradient accumulation steps) |
| **Initial Learning Rate** | $1.5 \times 10^{-4}$ with Cosine Scheduler |
| **Evaluation Strategy** | Beam Search Generation (`num_beams=2`, `max_length=225`) |
| **Final Evaluation Loss** | **0.5968** |
| **Final Training Loss** | **0.6382** |
| **Final Character Error Rate (CER)** | **22.42%** |
| **Final Word Error Rate (WER)** | **63.29%** |
| **Total Training Runtime** | 26,356 seconds (~7.32 hours) |
| **Hardware** | NVIDIA Tesla P100 (16GB VRAM) |
| **Artifact Output** | `kashmiri-whisper-transcribe-adapter.zip` (113.49 MB) |

---

## 3. Ingested Datasets

1. **`gopikrishnan2005/kashmiri-text-to-speech`**: High-quality studio audio pairs covering phonetically rich Kashmiri sentences.
2. **`umar1103/converteddatanew`**: Natural acoustic recordings capturing Kashmiri conversational intonations.

All audio clips were verified with `soundfile.info` to filter corrupted waveforms and resampled on the fly to 16,000 Hz single-channel mono.

---

## 4. How to Transcribe Audio with the Model

```python
import torch
import librosa
from transformers import WhisperProcessor, WhisperForConditionalGeneration
from peft import PeftModel

BASE_MODEL = "openai/whisper-large-v3-turbo"
ADAPTER_REPO = "Sameer0313/kashmiri-whisper-lora"

# 1. Load Processor and Base Architecture
processor = WhisperProcessor.from_pretrained(BASE_MODEL, language="urdu", task="transcribe")
base_model = WhisperForConditionalGeneration.from_pretrained(
    BASE_MODEL,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
    device_map="auto"
)

# 2. Attach Kashmiri LoRA Weights
model = PeftModel.from_pretrained(base_model, ADAPTER_REPO)
model.eval()

# 3. Transcribe 16kHz WAV Audio
def transcribe_kashmiri(audio_path: str) -> str:
    audio, sr = librosa.load(audio_path, sr=16000)
    inputs = processor(audio, sampling_rate=16000, return_tensors="pt")
    inputs = inputs.to(model.device, dtype=model.dtype)
    
    with torch.no_grad():
        predicted_ids = model.generate(
            inputs.input_features,
            num_beams=2,
            max_new_tokens=225
        )
    return processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
```
