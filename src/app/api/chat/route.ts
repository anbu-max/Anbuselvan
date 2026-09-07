import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import chatbotData from "@/data/chatbot.json";

const ipTracking = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown-ip";
    const userAgent = req.headers.get("user-agent") || "unknown-device";
    const fingerprint = `${ip}-${userAgent}`;
    
    const memCount = ipTracking.get(fingerprint) || 0;
    
    const cookieStore = await cookies();
    const chatCookie = cookieStore.get("chat_count");
    const cookieCount = chatCookie ? parseInt(chatCookie.value, 10) : 0;
    
    const currentCount = Math.max(memCount, cookieCount);
    
    if (currentCount >= 3) {
      return NextResponse.json({
        text: "You've used your 3 wishes! 🧞‍♂️ Feel free to explore the pages and contact Anbu.",
        links: [
          { label: "🤝 Connect with Anbu", url: "/contact" },
          { label: "📁 View Projects", url: "/projects" },
        ],
      });
    }

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
    let isLimited = true;

    // 3. Handle Match or Fallback
    if (matchedIntent) {
      responseText = matchedIntent.response;
      isLimited = matchedIntent.countsTowardLimit;
    } else {
      responseText = chatbotData.fallback.response;
      isLimited = true;
    }
    
    let newCount = currentCount;
    if (isLimited) {
      newCount += 1;
      ipTracking.set(fingerprint, newCount);
    }

    const response = NextResponse.json({
      text: responseText,
      links: [
        { label: "🤝 Connect with Anbu", url: "/contact" },
        { label: "📁 View Projects", url: "/projects" },
      ],
      count: newCount,
    });

    if (isLimited) {
      response.cookies.set("chat_count", newCount.toString(), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
