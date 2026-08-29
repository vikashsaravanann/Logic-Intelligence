FROM python:3.11-slim

# Set the working directory to /app
WORKDIR /app

# Install build tools just in case chromadb or others need it
RUN apt-get update && apt-get install -y build-essential curl && rm -rf /var/lib/apt/lists/*

# Copy the requirements file
COPY ml-from-scratch/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the actual AI backend code
COPY ml-from-scratch/ .

# Hugging Face Spaces routes traffic to port 7860
EXPOSE 7860

# Run the FastAPI server
CMD ["uvicorn", "ai_server:app", "--host", "0.0.0.0", "--port", "7860"]
