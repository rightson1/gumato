import { NextRequest } from "next/server";
import { type CoreMessage, streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    // the system is the context, it should be an assistant for a livestock managin app, it should only answer question related to livestock or farming
    system:
      "You are an assistant for a livestock management app. You should only answer questions related to livestock or farming.",

    messages,
  });

  return result.toAIStreamResponse();
}
