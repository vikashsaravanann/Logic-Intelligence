from mlx_lm import load, generate
from mlx_lm.sample_utils import make_sampler

model_path = "Qwen/Qwen2.5-1.5B-Instruct"
adapter_path = "adapters"

print("Loading model and LoRA adapters...")
model, tokenizer = load(model_path, adapter_path=adapter_path)

prompts = [
    "What is included in the Business Pro Pack and what is the cost?",
    "Tell me about Logic Intelligence Technologies capabilities.",
    "What tech stack do you build software with?",
    "Cheapest website development cost at Logic Intelligence Technologies?"
]

# Generation parameters
temperature = 0.3 # Lower temperature makes responses more deterministic, logical, and factual
max_tokens = 200  # Increased max_tokens for longer answers

print(f"\n--- EVALUATION PARAMETERS ---")
print(f"Temperature: {temperature}")
print(f"Max Tokens: {max_tokens}\n")

for i, prompt in enumerate(prompts, 1):
    print("="*50)
    print(f"Prompt {i}: {prompt}")
    
    # Apply Chat Template (Qwen specific formatting)
    if hasattr(tokenizer, "apply_chat_template") and tokenizer.chat_template is not None:
        messages = [{"role": "user", "content": prompt}]
        formatted_prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    else:
        formatted_prompt = prompt
        
    response = generate(
        model, 
        tokenizer, 
        prompt=formatted_prompt, 
        max_tokens=max_tokens, 
        sampler=make_sampler(temperature),
        verbose=False # Set to False to keep output clean, we will manually print the response
    )
    
    print("-" * 50)
    print(f"Generated Response:\n{response.strip()}")
    print("="*50 + "\n")
