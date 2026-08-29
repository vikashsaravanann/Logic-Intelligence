import { useState, useCallback, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const REQUEST_TIMEOUT_MS = 60000;

/**
 * Hook for sending messages to the backend with streaming support.
 * Falls back to non-streaming /generate if streaming fails or isn't available.
 *
 * Usage:
 *   const { sendMessage, isStreaming } = useChatRequest();
 *   await sendMessage(text, {
 *     onToken: (partial) => setLiveText(partial),
 *     onComplete: (fullText) => addMessageToChat(fullText),
 *     onError: (err) => showErrorToast(err),
 *   });
 */
export function useChatRequest() {
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef(null);

  const cancelRequest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const sendMessage = useCallback(async (text, { onToken, onComplete, onError, maxTokens = 300 } = {}) => {
    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    setIsStreaming(true);
    let accumulated = '';

    try {
      const res = await fetch(`${API_BASE_URL}/generate-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, max_tokens: maxTokens }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Server returned ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          let parsed;
          try {
            parsed = JSON.parse(jsonStr);
          } catch {
            continue;
          }

          if (parsed.error) {
            throw new Error(parsed.error);
          }
          if (parsed.token) {
            accumulated += parsed.token;
            onToken?.(accumulated);
          }
          if (parsed.done) {
            clearTimeout(timeoutId);
            setIsStreaming(false);
            onComplete?.(accumulated || 'No response generated.');
            return { status: 'success', text: accumulated };
          }
        }
      }

      // Stream ended without explicit "done" — still treat as complete if we got text
      clearTimeout(timeoutId);
      setIsStreaming(false);
      if (accumulated) {
        onComplete?.(accumulated);
        return { status: 'success', text: accumulated };
      }
      throw new Error('Stream ended unexpectedly with no content.');
    } catch (err) {
      clearTimeout(timeoutId);
      setIsStreaming(false);

      // Fallback: try the non-streaming endpoint once
      if (err.name !== 'AbortError') {
        try {
          const fallbackRes = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, max_tokens: maxTokens }),
          });
          const data = await fallbackRes.json();
          if (data.status === 'success' && data.generated_text) {
            onComplete?.(data.generated_text);
            return { status: 'success', text: data.generated_text };
          }
          throw new Error(data.message || 'Empty response from server.');
        } catch (fallbackErr) {
          const message =
            fallbackErr.name === 'AbortError'
              ? 'Request timed out. Please try again.'
              : 'Logic AI could not complete this response. Please try again.';
          onError?.(message);
          return { status: 'error', message };
        }
      }

      const message = 'Request cancelled.';
      onError?.(message);
      return { status: 'error', message };
    }
  }, []);

  const checkHealth = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) return { status: 'offline' };
      const data = await res.json();
      return { status: 'online', ...data };
    } catch {
      return { status: 'offline' };
    }
  }, []);

  return { sendMessage, cancelRequest, checkHealth, isStreaming };
}
