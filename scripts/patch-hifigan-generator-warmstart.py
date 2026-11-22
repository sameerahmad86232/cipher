#!/usr/bin/env python3
"""Allow official HiFi-GAN training to warm-start from a generator-only checkpoint."""

from pathlib import Path
import sys


target = Path(sys.argv[1] if len(sys.argv) > 1 else "/kaggle/working/hifi-gan/train.py")
source = target.read_text(encoding="utf-8")
old = """    steps = 0
    if cp_g is None or cp_do is None:
        state_dict_do = None
        last_epoch = -1
    else:
        state_dict_g = load_checkpoint(cp_g, device)
        state_dict_do = load_checkpoint(cp_do, device)
        generator.load_state_dict(state_dict_g['generator'])
        mpd.load_state_dict(state_dict_do['mpd'])
        msd.load_state_dict(state_dict_do['msd'])
        steps = state_dict_do['steps'] + 1
        last_epoch = state_dict_do['epoch']
"""
new = """    steps = 0
    state_dict_do = None
    last_epoch = -1
    if cp_g is not None:
        state_dict_g = load_checkpoint(cp_g, device)
        generator.load_state_dict(state_dict_g['generator'])
        print(f'Warm-started universal generator: {cp_g}')
    if cp_do is not None:
        state_dict_do = load_checkpoint(cp_do, device)
        mpd.load_state_dict(state_dict_do['mpd'])
        msd.load_state_dict(state_dict_do['msd'])
        steps = state_dict_do['steps'] + 1
        last_epoch = state_dict_do['epoch']
"""
if source.count(old) != 1:
    raise SystemExit(f"Expected official HiFi-GAN checkpoint block not found: {target}")
target.write_text(source.replace(old, new), encoding="utf-8")
print(f"Enabled generator-only warm start: {target}")

# Librosa >=0.10 made mel-filter arguments keyword-only. The upstream
# HiFi-GAN repository still calls the function positionally.
mel_target = target.with_name("meldataset.py")
mel_source = mel_target.read_text(encoding="utf-8")
old_mel = "librosa_mel_fn(sampling_rate, n_fft, num_mels, fmin, fmax)"
new_mel = "librosa_mel_fn(sr=sampling_rate, n_fft=n_fft, n_mels=num_mels, fmin=fmin, fmax=fmax)"
if old_mel not in mel_source:
    raise SystemExit(f"Expected legacy Librosa mel call not found: {mel_target}")
mel_target.write_text(mel_source.replace(old_mel, new_mel), encoding="utf-8")
print(f"Patched keyword-only Librosa mel call: {mel_target}")
