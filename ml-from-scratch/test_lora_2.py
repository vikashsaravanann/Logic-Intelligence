from mlx_lm import load
from mlx_lm.tuner.lora import linear_to_lora_layers

model, _ = load("Qwen/Qwen2.5-1.5B-Instruct")
model.freeze()

linear_to_lora_layers(model, 16, {"rank": 16, "alpha": 32, "dropout": 0.05, "scale": 10.0})
print("Default trainable:", sum(v.size for _, v in model.trainable_parameters().items()))

model, _ = load("Qwen/Qwen2.5-1.5B-Instruct")
model.freeze()
linear_to_lora_layers(model, 16, {"rank": 16, "alpha": 32, "dropout": 0.05, "scale": 10.0, "keys": ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]})
print("Custom trainable:", sum(v.size for _, v in model.trainable_parameters().items()))

