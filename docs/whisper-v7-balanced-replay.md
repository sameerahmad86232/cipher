# Whisper v7 balanced replay candidate

v7 is a conservative continuation of the protected-benchmark winner, v4.
It is designed to test whether balanced replay can retain v4 word accuracy while
recovering the small character-level gain observed in v6.

- Sources: Meta Omnilingual `kas_Arab`, GAASH-Lab Bolbosh, OpenSLR-122.
- Per-source cap: 1,000 accepted clips; Meta contributes all available accepted
  clips when fewer than the cap.
- Filtering: pinned revisions, valid Perso-Arabic text, 0.8–30 second duration,
  plausible transcript speech rate, non-silent finite audio, content hashes,
  Unicode normalization, and punctuation spacing normalization.
- Warm start: `Sameer0313/kashmiri-whisper-lora-v4-candidate`.
- Training: one epoch, `2e-6` learning rate, effective batch size 16.
- Augmentation: 35% light acoustic perturbation and 35% SpecAugment.
- Checkpoints: every 40 optimizer steps; best internal CER checkpoint retained.

No checkpoint is promoted without the fixed 150-clip controlled evaluation.
The protected evaluation set is never included in training or checkpoint
selection.
