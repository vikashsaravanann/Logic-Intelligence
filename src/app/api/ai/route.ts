import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.text || body.message;
    const maxTokens = body.max_tokens || 250;
    
    // Connect directly to the local Python FastAPI backend
    const backendUrl = process.env.NEXT_PUBLIC_AI_BACKEND_URL || 'http://localhost:8000';
    
    const response = await fetch(`${backendUrl}/generate-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: userMessage,
        max_tokens: maxTokens
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('No response body from backend');
    }

    // We can simply pipe the ReadableStream directly to the client
    // since the FastAPI backend is already emitting SSE events
    // in the exact format the client expects (data: {"token": "..."}\n\n)
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error connecting to Python backend:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI backend', details: error.message },
      { status: 500 }
    );
  }
}
