import json
import os
import random
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-1.5B-Instruct")

with open("final_training_dataset_v3.jsonl", "r") as f:
    lines = f.readlines()

formatted_data = []
for line in lines:
    if not line.strip():
        continue
    example = json.loads(line)
    messages = [
        {"role": "system", "content": "You are the AI assistant for Logic Intelligence Technologies, a full-stack web, app, and software development company founded by Vikash Saravanan."},
        {"role": "user", "content": example["instruction"]},
        {"role": "assistant", "content": example["response"]},
    ]
    
    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=False)
    formatted_data.append({"text": text})

# Shuffle with a fixed seed for reproducibility
random.seed(42)
random.shuffle(formatted_data)

# Split into train (approx 90%) and valid (approx 10%)
split_idx = int(len(formatted_data) * 0.9)
train_data = formatted_data[:split_idx]
valid_data = formatted_data[split_idx:]

os.makedirs("data", exist_ok=True)

with open("data/train.jsonl", "w") as f:
    for item in train_data:
        f.write(json.dumps(item) + "\n")

with open("data/valid.jsonl", "w") as f:
    for item in valid_data:
        f.write(json.dumps(item) + "\n")

print(f"Prepared {len(train_data)} training examples and {len(valid_data)} validation examples in 'data/' directory.")
