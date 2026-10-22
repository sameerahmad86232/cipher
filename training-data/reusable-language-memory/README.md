# Reusable Kashmiri language memory

This bundle reorganizes existing project-owner-reviewed data for reuse. It does not update ChatGPT's model weights, run neural fine-tuning, establish translation accuracy, or replace existing data. Approval means project-owner approval, not independent linguistic validation.

- `reviewed-pairs.jsonl`: deduplicated English/Kashmiri pairs with source paths and original license metadata. Different targets for the same English key remain visible and are excluded from eligibility pending review.
- `terminology-preferences.jsonl`: chosen/rejected wording and the original context explanations. Rejected alternatives are preferences in context, not necessarily universally incorrect.
- `grammar-patterns.jsonl`: source-linked, context-specific constructions for translation prompts and later data curation.
- `ai-candidates.jsonl`: assistant-generated English paraphrases paired with copied reviewed Kashmiri targets. These new pairings require review and are excluded from training eligibility.
- `token-inventory.jsonl`: surface tokens with frequencies; not verified dictionary headwords or new word meanings.
- `excluded-diagnostics.jsonl`: records withheld because their English input belongs to the existing diagnostic set.
- `manifest.json`: counts and policy.

Commercial eligibility defaults to false because language approval does not settle underlying source rights. Existing CC BY-SA attribution is preserved; unspecified licenses are not silently treated as permissive. The non-commercial Spoken Kashmiri OCR book is not imported here. No large models or new corpora are downloaded.

Rebuild and verify:

```bash
python scripts/build-reusable-language-memory.py
python scripts/test-reusable-language-memory.py
```

For future fine-tuning, resolve rights and conflicting targets first, create separate train/validation partitions by normalized English input, and keep diagnostic questions out of training. Mix reviewed material with suitable broader parallel data rather than repeatedly fitting these examples alone. Evaluate generated translations on unseen sentences with a Kashmiri reviewer; loss alone cannot prove translation quality.
