import urllib.request
import json
import time

def check_health():
    for _ in range(30):
        try:
            req = urllib.request.Request('http://127.0.0.1:8000/health', method='GET')
            res = urllib.request.urlopen(req)
            data = json.loads(res.read())
            if data.get('status') == 'ok':
                return True
        except Exception:
            pass
        time.sleep(2)
    return False

def ask(question):
    req = urllib.request.Request('http://127.0.0.1:8000/generate', method='POST')
    req.add_header('Content-Type', 'application/json')
    data = json.dumps({"text": question, "max_tokens": 150}).encode('utf-8')
    res = urllib.request.urlopen(req, data=data)
    result = json.loads(res.read())
    return result.get('generated_text', '')

questions = [
    "What is included in the Business Pro Pack?",
    "How much does the Digital Launch Pack cost?",
    "What is the Enterprise Pack price?",
    "What is Logic Intelligence Technologies' CIN number?",
    "Who founded Logic Intelligence Technologies?",
    "How do I optimize a React component that re-renders too often?",
    "What is the difference between useEffect and useLayoutEffect?",
    "How do I prevent SQL injection?",
    "What is your refund policy for a cancelled project after month 3?",
    "cost of business pro",
    "business pro price",
    "18999 package details"
]

if check_health():
    print("Server is healthy, starting tests...")
    for i, q in enumerate(questions):
        print(f"Q{i+1}: {q}")
        print(f"A: {ask(q)}\n")
else:
    print("Server did not become healthy in time.")
