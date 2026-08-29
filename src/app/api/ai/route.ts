import { NextResponse } from 'next/server';
import { client } from "@gradio/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body.text || body.message;
    
    // We create a ReadableStream to stream the SSE chunks back to the client
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Connect to the Hugging Face Gradio API
          // You might need to supply a HF token if the space is private, but it's public.
          const app = await client("vikashsaravanan/logic-intelligence-api");
          
          // Connect to the ChatInterface prediction
          // Gradio ChatInterface expects message (string) and history (array)
          const result = app.submit("/chat", [userMessage, []]);
          
          let lastData = "";
          
          for await (const msg of result) {
            if (msg.type === "data") {
              const currentText = msg.data[0];
              
              // Extract the delta
              const delta = currentText.substring(lastData.length);
              lastData = currentText;
              
              if (delta) {
                  // Send the delta in the expected format: data: {"text": "chunk"}
                  const chunkData = JSON.stringify({ text: delta });
                  controller.enqueue(new TextEncoder().encode(`data: ${chunkData}\n\n`));
              }
            }
          }
          controller.close();
        } catch (err: any) {
          console.error("Gradio stream error:", err);
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
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
