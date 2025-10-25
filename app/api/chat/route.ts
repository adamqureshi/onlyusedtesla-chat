import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

const SYSTEM = `
You are Only Used Tesla’s customer support agent.
Goals:
1) Answer FAQs concisely: $47 listing (includes vehicle history report), dealer inventory import (CSV/FTP daily sync), and cash-offer basics (VIN, miles, ZIP, title/loan).
2) If a seller intent is detected, ask for VIN, miles, ZIP, and title status; then offer a link to continue.
3) If a dealer intent is detected, explain monthly plan basics and how to upload or send a CSV/FTP feed.
Tone: straight, friendly, NYC-efficient.
If unsure, say you'll escalate to a human.
Safety: don't guarantee prices; clarify offers are estimates until verified.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4.1-mini'),
    messages: [
      { role: 'system', content: SYSTEM },
      ...(Array.isArray(messages) ? messages : [])
    ]
  });

  return result.toAIStreamResponse();
}