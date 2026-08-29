import requests, json

url = "https://integrate.api.nvidia.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json"
}
data = {
    "model": "deepseek-ai/deepseek-v4-pro-0813",
    "messages": [{"role":"user","content":"What is 2+2? Use the calculator tool."}],
    "tools": [{
      "type": "function",
      "function": {
        "name": "calculator",
        "description": "adds two numbers",
        "parameters": {
          "type":"object",
          "properties":{"a":{"type":"number"},"b":{"type":"number"}},
          "required":["a","b"]
        }
      }
    }]
}

resp = requests.post(url, headers=headers, json=data)
print("Status:", resp.status_code)
print("Response:", json.dumps(resp.json(), indent=2))
