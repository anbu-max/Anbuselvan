import { NextResponse } from "next/server";
import chatbotData from "@/data/chatbot.json";

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
// Reset after 72 hours
const RATE_LIMIT_RESET_MS = 1000 * 60 * 60 * 72;

export async function POST(req: Request) {
  try {
    const { prompt, isFinalWish } = await req.json();

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

    // 2. IP Rate Limiting Setup
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    let userRate = { count: 0, resetTime: Date.now() + RATE_LIMIT_RESET_MS };

    if (ip !== "unknown") {
      const now = Date.now();
      userRate = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_RESET_MS };
      
      if (now > userRate.resetTime) {
        userRate.count = 0;
        userRate.resetTime = now + RATE_LIMIT_RESET_MS;
      }
      
      if (userRate.count >= chatbotData.session.maxQuestionsPerUser) {
        return NextResponse.json({
          text: chatbotData.session.limitReachedResponse,
          links: [
            { label: "🤝 Connect with Anbu", url: "/contact" },
            { label: "📁 View Projects", url: "/projects" }
          ]
        });
      }
    }

    // 3. Intent Matching
    let matchedIntent = null;
    for (const intent of chatbotData.intents) {
      for (const pattern of intent.patterns) {
        if (lowerPrompt.includes(pattern.toLowerCase())) {
          matchedIntent = intent;
          break;
        }
      }
      if (matchedIntent) break;
    }

    let responseText = "";

    // 4. Handle Match or Fallback
    if (matchedIntent) {
      responseText = matchedIntent.response;
      if (matchedIntent.countsTowardLimit && ip !== "unknown") {
        userRate.count++;
        rateLimitMap.set(ip, userRate);
      }
    } else {
      responseText = chatbotData.fallback.response;
      // fallback doesn't count towards the limit as per matchingLogic step 6
    }

    // 5. Add CTA if final wish
    if (isFinalWish) {
      responseText += "\n\n**THIS IS YOUR FINAL WISH!** I warmly invite you to check out the Connect page to continue the conversation.";
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
