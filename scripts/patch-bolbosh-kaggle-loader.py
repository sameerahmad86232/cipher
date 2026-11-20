#!/usr/bin/env python3
"""Patch Bolbosh's legacy dataset retry loop for current Kaggle torchaudio.

KTTS audio is already validated and restricted to 0.8–20 seconds by
prepare-ktts-matcha.py.  Bolbosh's legacy ``__getitem__`` calls the removed
``torchaudio.info`` API and then catches every exception in an infinite loop,
which makes Lightning appear to hang before its first batch.
"""

from pathlib import Path
import sys


target = Path(sys.argv[1] if len(sys.argv) > 1 else "/kaggle/working/Bolbosh-main/matcha/data/text_mel_datamodule.py")
source = target.read_text(encoding="utf-8")
start = source.index("    def __getitem__(self, index):")
end = source.index("    def __len__(self):", start)
replacement = """    def __getitem__(self, index):
        # KTTS clips were validated and bounded before the filelists were made.
        # Load directly so a real decoding/text error is raised instead of being
        # hidden by the legacy infinite random-retry loop.
        return self.get_datapoint(self.filepaths_and_text[index])

"""
target.write_text(source[:start] + replacement + source[end:], encoding="utf-8")
print(f"Patched current-Kaggle dataset loader: {target}")

# Matplotlib 3.10 removed FigureCanvasAgg.tostring_rgb(). Bolbosh calls it
# after every validation pass to create TensorBoard spectrogram previews.
utils_path = target.parent.parent / "utils" / "utils.py"
utils_source = utils_path.read_text(encoding="utf-8")
old_figure_helper = """def save_figure_to_numpy(fig):
    data = np.fromstring(fig.canvas.tostring_rgb(), dtype=np.uint8, sep="")
    data = data.reshape(fig.canvas.get_width_height()[::-1] + (3,))
    return data
"""
new_figure_helper = """def save_figure_to_numpy(fig):
    # Matplotlib >=3.10 exposes an RGBA memory view instead of tostring_rgb.
    return np.asarray(fig.canvas.buffer_rgba(), dtype=np.uint8)[:, :, :3].copy()
"""
if old_figure_helper not in utils_source:
    raise SystemExit(f"Expected legacy Matplotlib helper not found: {utils_path}")
utils_path.write_text(utils_source.replace(old_figure_helper, new_figure_helper), encoding="utf-8")
print(f"Patched current-Matplotlib figure logger: {utils_path}")
