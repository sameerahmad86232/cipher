#!/usr/bin/env bash
set -euo pipefail

# Source: Wikimedia Commons, "Islamic call to prayer from the prophet mosque"
# Author: ejaz215, CC BY 3.0. No modification; exact original Ogg recording.
# https://commons.wikimedia.org/wiki/File:33937_ejaz215_call-to-prayer-from-the-prophet-s-mo.ogg
expected_sha1="4aa432b9e44804e7d72af4429bd743aa5fa9e3a4"
url="https://upload.wikimedia.org/wikipedia/commons/7/7c/33937_ejaz215_call-to-prayer-from-the-prophet-s-mo.ogg"
target="android/app/src/main/res/raw/adhan_madinah.ogg"

cd "$(dirname "$0")/.."
mkdir -p "$(dirname "$target")"

if [ -f "$target" ] && printf '%s  %s\n' "$expected_sha1" "$target" | sha1sum --check --status; then
  echo "Verified offline Madinah adhan: $target"
  exit 0
fi

temp="$(mktemp)"
trap 'rm -f "$temp"' EXIT
curl --fail --location --retry 4 --retry-all-errors --connect-timeout 20 --max-time 150 \
  --user-agent 'KoshurNoor/1.14 (CC-BY-3.0; open-source build)' \
  "$url" --output "$temp"
printf '%s  %s\n' "$expected_sha1" "$temp" | sha1sum --check
mv "$temp" "$target"
echo "Verified CC BY 3.0 Madinah Adhan: $target"
