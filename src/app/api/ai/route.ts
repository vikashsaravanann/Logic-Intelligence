import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.text || body.message;
    const maxTokens = body.max_tokens || 1024;
    
    // Connect directly to your Custom Trained AI on Hugging Face
    const backendUrl = 'https://vikashsaravanann-logic.hf.space';
    
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

    // We pipe the stream exactly as it comes from your Hugging Face space
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error connecting to Custom AI backend:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI backend', details: error.message },
      { status: 500 }
    );
  }
}
