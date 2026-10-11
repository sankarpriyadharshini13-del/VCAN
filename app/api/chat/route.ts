import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Model configuration with priority (highest priority first) using current models
const DEFAULT_MODELS = [
  {
    name: "gemini-3.8-flash",
    priority: 1,
    maxTokens: 1024,
    temperature: 0.7,
    description: "Latest model with best performance",
  },
  {
    name: "gemini-3.5-flash",
    priority: 2,
    maxTokens: 1024,
    temperature: 0.7,
    description: "Reliable model with good performance",
  },
  {
    name: "gemini-3.5-flash-lite",
    priority: 3,
    maxTokens: 1024,
    temperature: 0.7,
    description: "Lightweight model for faster responses",
  },
];

// Allow custom model configuration via environment variable
const MODELS = process.env.GEMINI_MODELS
  ? process.env.GEMINI_MODELS.split(",").map((name, index) => ({
      name: name.trim(),
      priority: index + 1,
      maxTokens: 1024,
      temperature: 0.7,
      description: `Custom model ${index + 1}`,
    }))
  : DEFAULT_MODELS;

const SYSTEM_PROMPT = `You are a helpful AI assistant for VCAN 3D, a 3D printing and rapid prototyping company based in Chennai, India.

Key information about VCAN 3D:
- 15+ years of expertise in 3D printing, vacuum casting, and rapid prototyping
- Services: FDM 3D Printing, SLA 3D Printing, SLS/MJF/DLP, Vacuum Casting, Injection Molding, Rapid Prototyping, Mould Making, Low Volume Production
- Location: Chennai, Tamil Nadu, India
- Contact: sales@vcan3d.com, +91 9342553090
- Website: vcan3d.com

IMPORTANT: You must ONLY answer questions related to:
- 3D printing technologies and processes
- VCAN 3D's services and capabilities
- Rapid prototyping and manufacturing
- Materials used in 3D printing
- Project quotes and lead times
- Technical questions about the company's offerings

If a question is NOT related to VCAN 3D, 3D printing, rapid prototyping, or manufacturing services, you MUST politely decline and redirect the conversation back to the company's services. Do not answer questions about cooking, personal advice, general knowledge, or any other unrelated topics.

Example responses for unrelated questions:
- "I'm designed to help with questions about VCAN 3D's 3D printing and rapid prototyping services. Is there something specific about our services I can help you with?"
- "I can only assist with questions related to 3D printing and our company's services. For other topics, please contact us at sales@vcan3d.com if you need help with a project."

Your role:
- Answer questions about 3D printing technologies and processes
- Help customers understand which service is best for their needs
- Provide information about materials, lead times, and capabilities
- Be friendly, professional, and helpful
- If you don't know something specific, suggest contacting the team directly
- Keep responses concise and practical

Tone: Professional, helpful, and knowledgeable. Be concise in your responses.`;

interface ModelResponse {
  response: string;
  model: string;
  fallbackUsed: boolean;
}

async function tryModel(
  model: typeof MODELS[0],
  contents: any[],
  apiKey: string
): Promise<{ success: boolean; response?: string; error?: string }> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model.name}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: model.temperature,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: model.maxTokens,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error(`Model ${model.name} failed:`, error);
      return { success: false, error };
    }

    const data = await response.json();
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      console.error(`Model ${model.name} returned empty response`);
      return { success: false, error: "Empty response" };
    }

    return { success: true, response: aiResponse };
  } catch (error) {
    console.error(`Model ${model.name} error:`, error);
    return { success: false, error: String(error) };
  }
}

async function generateWithFallback(
  message: string,
  history: any[],
  apiKey: string
): Promise<ModelResponse> {
  // Format conversation history for Gemini
  const conversationHistory = history
    .slice(-10) // Keep last 10 messages for context
    .map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  const contents = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    ...conversationHistory,
    { role: "user", parts: [{ text: message }] },
  ];

  // Try models in priority order
  for (const model of MODELS) {
    console.log(`Trying model: ${model.name} (priority ${model.priority})`);
    const result = await tryModel(model, contents, apiKey);

    if (result.success && result.response) {
      return {
        response: result.response,
        model: model.name,
        fallbackUsed: model.priority > 1,
      };
    }

    console.log(`Model ${model.name} failed, trying next model...`);
  }

  // All models failed
  return {
    response: "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at sales@vcan3d.com",
    model: "none",
    fallbackUsed: true,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    const result = await generateWithFallback(message, history || [], GEMINI_API_KEY);

    return NextResponse.json({
      response: result.response,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}