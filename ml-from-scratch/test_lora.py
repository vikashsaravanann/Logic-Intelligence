from mlx_lm import load
from mlx_lm.tuner.lora import LoRALinear
from mlx_lm.tuner.utils import build_schedule
from mlx_lm.utils import linear_to_lora_layers
import mlx.nn as nn
import yaml

model, _ = load("Qwen/Qwen2.5-1.5B-Instruct")

keys = ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
model.freeze()
linear_to_lora_layers(model, 16, {"rank": 16, "alpha": 32, "dropout": 0.0, "scale": 10.0, "keys": keys})
total_trainable = sum(v.size for _, v in model.trainable_parameters().items())
print("Trainable parameters:", total_trainable)
