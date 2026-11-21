#!/usr/bin/env python3
"""Freeze Bolbosh's pronunciation encoder for conservative KTTS voice adaptation."""

from pathlib import Path
import sys


target = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "/kaggle/working/Bolbosh-main/matcha/models/matcha_tts.py"
)
source = target.read_text(encoding="utf-8")
anchor = "        self.update_data_statistics(data_statistics)\n"
replacement = anchor + """

        # KTTS has only one speaker and about four hours of audio. Preserve the
        # pretrained text encoder and duration model so adaptation changes
        # timbre without unlearning Kashmiri pronunciation or rhythm.
        for parameter in self.encoder.parameters():
            parameter.requires_grad = False
"""
if source.count(anchor) != 1:
    raise SystemExit(f"Expected Matcha initialization anchor not found: {target}")
target.write_text(source.replace(anchor, replacement), encoding="utf-8")
print(f"Frozen pronunciation encoder for conservative adaptation: {target}")
