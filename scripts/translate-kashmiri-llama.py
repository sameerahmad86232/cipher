"""Experimental Kashmiri translation using MISHANM's Llama 3 adapter.

Install: pip install torch transformers peft accelerate
Authenticate with `hf auth login` after obtaining access to the Meta base model.
Usage: python scripts/translate-kashmiri-llama.py --to kashmiri "Hello"
Requires enough memory for the full 8B base model (roughly 16 GB weights).
"""
import argparse

MODEL_ID = "MISHANM/Kashmiri_text_generation_Llama3_8B_instruct"
REVISION = "6f4b6a4c5629894ec802ee3f267dd5999463a9e6"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("text")
    parser.add_argument("--to", choices=["kashmiri", "english"], default="kashmiri")
    parser.add_argument("--max-new-tokens", type=int, default=512)
    args = parser.parse_args()
    if not args.text.strip() or args.max_new_tokens < 1:
        parser.error("Provide nonempty text and a positive token limit")

    import torch
    from peft import AutoPeftModelForCausalLM
    from transformers import AutoTokenizer

    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, revision=REVISION)
    model = AutoPeftModelForCausalLM.from_pretrained(
        MODEL_ID, revision=REVISION, device_map="auto", torch_dtype="auto"
    )
    model.eval()
    target = "Kashmiri in Perso-Arabic script" if args.to == "kashmiri" else "English"
    # Match the custom format documented by the adapter author.
    prompt = (
        "<|system|>You are a Kashmiri language expert and linguist. "
        "Translate faithfully. Return only the translation."
        f"<|user|>Translate the following text into {target}:\n{args.text}"
        "<|assistant|>"
    )
    inputs = tokenizer(prompt, return_tensors="pt")
    inputs = inputs.to(model.get_input_embeddings().weight.device)
    with torch.inference_mode():
        output = model.generate(
            **inputs, max_new_tokens=args.max_new_tokens, do_sample=False,
            pad_token_id=tokenizer.eos_token_id,
        )
    print(tokenizer.decode(output[0, inputs.input_ids.shape[1]:], skip_special_tokens=True))


if __name__ == "__main__":
    main()
