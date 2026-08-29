import requests
import os

invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"

with open(os.path.expanduser("~/.config/claude-nvidia/.env")) as f:
    key = f.read().strip().split("=")[1]

headers = {
    "Authorization": f"Bearer {key}",
    "Accept": "application/json",
}

payload = {
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "hi"
        }
      ]
    }
  ],
  "model": "moonshotai/kimi-k3",
  "max_tokens": 1024
}

response = requests.post(invoke_url, headers=headers, json=payload)
print("moonshotai response:", response.status_code, response.text)

payload["model"] = "meta/llama-3.1-405b-instruct"
response = requests.post(invoke_url, headers=headers, json=payload)
print("llama response:", response.status_code, response.text)

