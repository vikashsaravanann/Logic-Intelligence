# Corrected train_colab.py — fixes the fp16/bf16 dtype error from before,
# uses final_training_dataset_v3.jsonl (119 entries, verified facts)

# Cell 1 — Install
!pip install -q torch transformers datasets trl peft accelerate

# Cell 2 — Load model
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

model_id = "Qwen/Qwen2.5-1.5B-Instruct"

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True
)

tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True,
    torch_dtype=torch.float16,
)

# Cell 3 — Load and format dataset
from datasets import load_dataset

dataset = load_dataset("json", data_files="final_training_dataset_v3.jsonl", split="train")
print(f"Loaded {len(dataset)} examples")

def format_example(example):
    messages = [
        {"role": "system", "content": "You are the AI assistant for Logic Intelligence Technologies, a full-stack web, app, and software development company founded by Vikash Saravanan."},
        {"role": "user", "content": example["instruction"]},
        {"role": "assistant", "content": example["response"]},
    ]
    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=False)
    return {"text": text}

dataset = dataset.map(format_example)
print(dataset[0]["text"])

# Cell 4 — LoRA config
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

model = prepare_model_for_kbit_training(model)

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# Cell 5 — Trainer setup (fp16=False, bf16=False — this is the critical fix from before)
from trl import SFTConfig, SFTTrainer

training_args = SFTConfig(
    output_dir="./logic-intelligence-lora-v2",
    num_train_epochs=4,          # slightly more epochs since dataset grew to 119 examples
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    logging_steps=5,
    save_strategy="epoch",
    fp16=False,                  # avoids the AMP/BFloat16 NotImplementedError from before
    bf16=False,
    max_length=512,
    dataset_text_field="text",
    report_to="none",
)

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=training_args,
)

# Cell 6 — Train
trainer.train()

# Cell 7 — Save
model.save_pretrained("./logic-intelligence-lora-v2-final")
tokenizer.save_pretrained("./logic-intelligence-lora-v2-final")
print("Saved.")

# Cell 8 — Zip and download
!zip -r logic-intelligence-lora-v2-final.zip logic-intelligence-lora-v2-final

from google.colab import files
files.download("logic-intelligence-lora-v2-final.zip")