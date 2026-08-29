import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

base_model_name = "Qwen/Qwen2.5-1.5B-Instruct"
adapter_path = "./models/logic-intelligence-lora-final"

# Use MPS (Apple Silicon GPU) if available, otherwise CPU
device = "mps" if torch.backends.mps.is_available() else "cpu"
print(f"Using device: {device}")

print("Loading base model...")
tokenizer = AutoTokenizer.from_pretrained(base_model_name)
base_model = AutoModelForCausalLM.from_pretrained(
    base_model_name,
    torch_dtype=torch.float16,   # faster than float32, MPS handles this fine for inference
    low_cpu_mem_usage=True,
)
base_model.to(device)

print("Applying LoRA adapter...")
model = PeftModel.from_pretrained(base_model, adapter_path)

print("Merging adapter into base model for faster inference...")
model = model.merge_and_unload()
model.to(device)
model.eval()

def ask(question):
    messages = [
        {"role": "system", "content": "You are the AI assistant for Logic Intelligence Technologies, a full-stack web, app, and software development company founded by Vikash Saravanan."},
        {"role": "user", "content": question}
    ]
    inputs = tokenizer.apply_chat_template(
        messages,
        return_tensors="pt",
        add_generation_prompt=True,
        return_dict=True
    ).to(device)

    outputs = model.generate(
        **inputs,
        max_new_tokens=100,
        temperature=0.7,
        do_sample=True
    )
    response = tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:], skip_special_tokens=True)
    print(f"\nQ: {question}")
    print(f"A: {response}\n")

# Test with company + technical questions
ask("What services does Logic Intelligence Technologies offer?")
ask("What is included in the Business Pro Pack?")
ask("How do I optimize a React component that re-renders too often?")