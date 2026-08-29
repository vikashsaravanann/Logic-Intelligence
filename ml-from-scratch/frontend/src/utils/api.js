const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function checkHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // Fast timeout for health check
    
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) return { online: false, message: 'Server not OK' };
    const data = await res.json();
    return { online: true, data };
  } catch (error) {
    return { online: false, message: error.message };
  }
}

export async function generateResponse(text, signal) {
  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, max_tokens: 300 }),
      signal
    });

    if (!res.ok) {
      if (res.status === 404) throw new Error('API endpoint not found (404)');
      if (res.status === 500) throw new Error('Internal Server Error (500)');
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    
    if (data.status === 'success' && typeof data.generated_text === 'string') {
      return { success: true, text: data.generated_text };
    }
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Unknown backend error');
    }

    throw new Error('Unexpected response format from server');

  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw err; // Re-throw to be handled by the caller
  }
}
