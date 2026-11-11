#!/usr/bin/env python3
"""Pushes committed local changes to GitHub main branch via Git Database REST API."""

import os
import json
import base64
import subprocess
import urllib.request
from pathlib import Path

TOKEN = os.getenv("GITHUB_PAT", "")
REPO = "sameerahmad86232/cipher"
HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Python-GitPusher"
}

def gh_api(method, endpoint, data=None):
    url = f"https://api.github.com/repos/{REPO}/{endpoint}"
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=HEADERS, method=method)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def push_diff_to_remote(commit_message: str):
    root = Path(__file__).resolve().parents[1]
    ref_info = gh_api("GET", "git/ref/heads/main")
    parent_sha = ref_info["object"]["sha"]
    parent_commit = gh_api("GET", f"git/commits/{parent_sha}")
    base_tree_sha = parent_commit["tree"]["sha"]

    # Get list of changed files compared to parent_sha
    try:
        diff_files = subprocess.check_output(
            ["git", "diff", "--name-only", parent_sha, "HEAD"],
            cwd=str(root)
        ).decode().splitlines()
    except Exception:
        diff_files = ["scripts/finetune-nllb-master.py", "kaggle-nllb-master-training.ipynb"]

    tree_entries = []
    for rel_path in diff_files:
        fpath = root / rel_path
        if not fpath.exists():
            continue
        content_bytes = fpath.read_bytes()
        b64_content = base64.b64encode(content_bytes).decode("ascii")
        blob_res = gh_api("POST", "git/blobs", {
            "content": b64_content,
            "encoding": "base64"
        })
        tree_entries.append({
            "path": rel_path,
            "mode": "100644",
            "type": "blob",
            "sha": blob_res["sha"]
        })

    if not tree_entries:
        print("[!] No files to update.")
        return

    # Create new tree
    new_tree = gh_api("POST", "git/trees", {
        "base_tree": base_tree_sha,
        "tree": tree_entries
    })

    # Create commit
    new_commit = gh_api("POST", "git/commits", {
        "message": commit_message,
        "tree": new_tree["sha"],
        "parents": [parent_sha],
        "author": {
            "name": "sameerahmad86232",
            "email": "79310091+sameerahmad86232@users.noreply.github.com"
        }
    })

    # Update ref
    gh_api("PATCH", "git/refs/heads/main", {
        "sha": new_commit["sha"]
    })

    print(f"[+] Successfully pushed commit {new_commit['sha']} to origin/main!")

if __name__ == "__main__":
    push_diff_to_remote("fix(nllb): set gradient_checkpointing_kwargs use_reentrant=False for PEFT")
