import { NextResponse } from "next/server";
import chatbotData from "@/data/chatbot.json";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const lowerPrompt = prompt.toLowerCase().trim();

    // 1. Moderation Check (blocked terms with word boundaries)
    const { blockedTerms, moderationResponse } = chatbotData.moderation;
    for (const term of blockedTerms) {
      const regex = new RegExp(`\\b${term}\\b`, "i");
      if (regex.test(lowerPrompt)) {
        return NextResponse.json({
          text: moderationResponse,
          links: [
            { label: "🤝 Connect with Anbu", url: "/contact" },
            { label: "📁 View Projects", url: "/projects" },
          ],
        });
      }
    }

    // 2. Intent Matching
    let matchedIntent = null;
    for (const intent of chatbotData.intents) {
      for (const pattern of intent.patterns) {
        // Use word boundaries to prevent false positives (e.g., "hi" inside "his")
        // Escape pattern to safely use in regex
        const escapedPattern = pattern.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedPattern}\\b`, "i");
        if (regex.test(lowerPrompt)) {
          matchedIntent = intent;
          break;
        }
      }
      if (matchedIntent) break;
    }

    let responseText = "";

    // 3. Handle Match or Fallback
    if (matchedIntent) {
      responseText = matchedIntent.response;
    } else {
      responseText = chatbotData.fallback.response;
    }

    return NextResponse.json({
      text: responseText,
      links: [
        { label: "🤝 Connect with Anbu", url: "/contact" },
        { label: "📁 View Projects", url: "/projects" },
      ],
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
