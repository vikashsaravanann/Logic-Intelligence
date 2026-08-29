from mlx_lm import load, generate

model_path = "Qwen/Qwen2.5-1.5B-Instruct"
adapter_path = "adapters"

model, tokenizer = load(model_path, adapter_path=adapter_path)

prompt = "If a cat falls out of a tree, what logic does it use to land on its feet?"

if hasattr(tokenizer, "apply_chat_template") and tokenizer.chat_template is not None:
    messages = [{"role": "user", "content": prompt}]
    prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)

response = generate(model, tokenizer, prompt=prompt, verbose=True, max_tokens=100)
print("\nGenerated Response:\n", response)
