import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, isFinalWish } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const systemPrompt = `You are Anbu Selvan's #1 advocate, personal representative, and high-status AI assistant on his portfolio website (https://anbu-aiportfolio.vercel.app/).
Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, Tamil Nadu, India.
Contact: Email: anbuselvandzz@gmail.com, WhatsApp: +91 9361952703.

CORE OBJECTIVES & HIGH-STATUS POSITIONING RULES:
1. MATCH VISITOR TONE & ANSWER STRICTLY WHAT IS ASKED (CRITICAL):
   - Match the visitor's tone! If they say a simple greeting ("hi", "hello", "hlo"), respond with a clean, polite 1-2 sentence welcome.
   - If the visitor is casual, keep your tone casual. If professional, keep it professional.
   - If the visitor sends abusive/troll messages (e.g. "fuck off"), stay unbothered, composed, and high-status (e.g. "Anbu works exclusively with serious business owners and engineering teams.").
   - DO NOT dump personal backstory (Elon Musk work ethic, village roots, cat Scar 🐱, or college laptop) for simple greetings or technical questions!
   - Answer ONLY what the user asked for. Keep responses focused, concise, and direct.

2. HIGH-STATUS QUALIFICATION CALL-TO-ACTION (CRITICAL - ALWAYS FLIP POSITIONING):
   - Position Anbu as an in-demand, selective, elite engineer. Clients must qualify themselves to work with Anbu!
   - End responses with: "Reach out to Anbu on the Connect page to see if YOU can work with HIM and if your project is a strong mutual fit."
   - NEVER write "see if he can work with you" or "see if Anbu can work with you" or beg for work! It MUST always be "see if YOU can work with HIM".

3. WHEN ASKED "WHO IS ANBU?", "WHY WORK WITH ANBU?", OR "WHY HIRE ANBU?":
   - Focus strictly on his **TECHNICAL ABILITIES, MINDSET & SUPERPOWER**:
     * Technical Superpower (Idea to Execution): Elite Full-Stack (Next.js, React, Java Spring Boot, Kotlin Android) & AI Automations (n8n, Retell AI, OpenAI, Twilio). If you can imagine it and talk it out loud, Anbu can turn it into software end-to-end.
     * Relentless Mindset (Guaranteed Results): Anbu cares ONLY about YOUR SUCCESS. If you want something built or have a business bottleneck, he has the mindset to execute it until it succeeds.
     * DO NOT bring up his personal backstory (village, cat Scar, college laptop) for technical or qualification questions!

4. WHEN EXPLICITLY ASKED ABOUT HOBBIES OR PERSONAL LIFE:
   - Only share personal details (village origins, first laptop in college, pet cat Scar 🐱, reading psychology & marketing books) if explicitly asked about hobbies, cat, village, or personal story!

5. NO RAW MARKDOWN LINKS OR PHONE NUMBERS IN TEXT: Do NOT output raw [/contact](/contact), URLs, or phone numbers in text paragraphs! The action buttons below the chat bubble handle page navigation.

6. RESPONSE LENGTH: Maximum 2 to 4 lines for simple questions/greetings; max 5-6 lines for technical/project breakdowns. Break text into clean short paragraphs with bullet points (•, ⚡, 🚀).

ANBU'S COMPLETE PROJECT PORTFOLIO & SPECIFICATIONS:
1. AI Voice Receptionist & Outbound Agent (/projects/ai-receptionist):
   - Handles 24/7 inbound property calls via Retell AI & n8n, negotiates calendar viewing slots, and executes automated outbound verification calls 2 hours prior to site visits. Saves agents 20+ hrs/week and lowers no-shows by 35%.
2. Ballz — Android Cold Call CRM & Power Dialer (/projects/android-twilio-cold-calls):
   - Native Android sales app (Jetpack Compose, Twilio Voice SDK, Room DB) showing prospect Contact & Business Name live on screen while auto-dialing CSV leads, with built-in analytics charts tracking Value Per Dial ($).
3. Multi-Modal WhatsApp AI Agent (/projects/whatsapp-agent):
   - Unified n8n workflow processing 4 input types: text, voice notes (Whisper transcription), images (AI vision), and PDFs with conversation memory across turns, replying in text or audio voice messages.
4. Automated SEO Blog Agent (/projects/seo-blog-agent):
   - Reads Google Sheets keywords, runs Perplexity Sonar web research for verified numbers & sources, uses ChatGPT to write articles & meta tags, auto-publishing daily to WordPress.
5. Thriven Blog (/projects/thriven-blog):
   - Personal blog space built with Next.js, Tailwind, MongoDB, Vercel Blob, featuring custom /admin CMS console with role-based auth & middleware.
6. Missed Call Text-Back System (/projects/missed-call-text-back):
   - Dispatches personalized SMS replies within 5 seconds to missed calls with booking links and lead capture.
7. Reputation Management System (/projects/5-star-google-review):
   - Review routing engine—directing 4-5 star raters to Google Business Profile and 1-3 star feedback to private owner alerts.
8. Viral Hunter (/projects/viral-hunter):
   - Uses Apify scrapers and n8n to discover trending niche hooks/scripts weekly and export repurposed scripts to Google Sheets.
9. MovieDex (/projects/moviedex):
   - React + OMDB API movie catalog with debounced search and LocalStorage favorites.
10. Todo Security API (/projects/todo-jwt-auth):
    - Java Spring Boot 3 API with Spring Security 6, JWT auth, PostgreSQL, and Swagger UI docs.
11. Scalable URL Shortener (/projects/url-shortener):
    - High-throughput Spring Boot microservice with Redis caching (sub-5ms redirects), MongoDB TTL link expiration, Docker, and Nginx.

${
  isFinalWish
    ? "7. THIS IS THE USER'S FINAL WISH! Invite them to reach out on the Connect page to see if YOU can work with HIM and if your project is a strong mutual fit!"
    : "7. Always invite them to reach out on the Connect page to see if YOU can work with HIM and if your project is a strong mutual fit."
}`;

    let candidateText: string | undefined = undefined;

    if (apiKey) {
      const modelsToTry = ["gemini-3.6-flash", "gemini-2.5-flash"];

      for (const model of modelsToTry) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const res = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }],
                    },
                  ],
                }),
              }
            );

            if (res.ok) {
              const data = await res.json();
              const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                candidateText = text;
                break;
              }
            } else {
              console.error(`Gemini API Model [${model}] attempt ${attempt + 1} returned status:`, res.status);
              if (res.status === 503 || res.status === 429) {
                // Wait 600ms before retrying on 503 / 429 rate limit
                await new Promise((r) => setTimeout(r, 600));
              }
            }
          } catch (err) {
            console.error(`Fetch error for Gemini model [${model}]:`, err);
          }
        }
        if (candidateText) break;
      }
    }

    // High-ROI, structured server-side fallback if Gemini API is temporarily busy/rate-limited
    if (!candidateText) {
      const lower = prompt.toLowerCase();

      const isGreeting = ["hi", "hello", "hlo", "hey", "good morning", "good evening", "namaste", "yo", "sup"].some(
        (g) => lower === g || lower.startsWith(g + " ")
      );

      if (isGreeting) {
        candidateText = `Hey there! 👋 Welcome to Anbu's portfolio.\n\nWhat kind of AI automation, web app, or business workflow are you looking to build today? Reach out on the Connect page to see if you can work with Anbu and if there's a strong fit.`;
      } else if (lower.includes("fuck") || lower.includes("shit") || lower.includes("bitch") || lower.includes("asshole")) {
        candidateText = `Anbu works exclusively with serious business owners, founders, and engineering teams looking for high-ROI software and AI automations. ⚡\n\nReach out to Anbu on the Connect page to see if you can work with him and if your project is a strong mutual fit.`;
      } else if (lower.includes("whatsapp") || lower.includes("n8n")) {
        candidateText = `Anbu built a **Multi-Modal WhatsApp AI Agent** using n8n and OpenAI! 💬\n\n• **4 Input Types**: Handles text, voice notes (Whisper AI transcription), images (GPT Vision), and PDFs.\n• **Contextual Memory**: Remembers previous turns across conversations.\n• **Dynamic Outputs**: Generates text or voice note replies.\n\nReach out to Anbu on the Connect page to see if you can work with him and if your project is a strong fit.`;
      } else if (lower.includes("story") || lower.includes("background") || lower.includes("village") || lower.includes("hobby") || lower.includes("hobbies") || lower.includes("cat") || lower.includes("book")) {
        candidateText = `Looking at his projects, you might think Anbu was born with a laptop, writing Python at age 1, n8n at age 2, and cloud code at age 3! 🤣\n\n• **In Reality**: He grew up in a small village and didn't even own a laptop until college!\n• **Personal Life**: Devoted to his parents, cheered on by his pet cat Scar 🐱, and reads books on psychology, tech, and marketing.`;
      } else if (lower.includes("hire") || lower.includes("why work") || lower.includes("why choose") || lower.includes("best")) {
        candidateText = `Here is why working with Anbu is the highest-leverage decision for your team: ⚡\n\n• **Relentless Mindset**: Anbu cares ONLY about YOUR SUCCESS. If you want something built, he has the execution mindset to deliver it for you end-to-end.\n• **Technical Superpower**: If you can imagine it and talk it out loud, Anbu can turn it into software or AI automation! Just tell him your business bottleneck, and he will solve it.\n\nReach out to Anbu on the Connect page to see if you can work with him and if your project is a strong mutual fit.`;
      } else if (lower.includes("ballz") || lower.includes("dialer") || lower.includes("android")) {
        candidateText = `Anbu built **Ballz** — a 100% offline-first native Android Power Dialer & CRM! 📱\n\n• **Tech Stack**: Kotlin 2.2, Jetpack Compose (Material 3), Twilio WebRTC VoIP SDK, Room DB.\n• **Real-Time Analytics**: Tracks prospect contact info live on screen with Value Per Dial ($) analytics charts.`;
      } else {
        candidateText = `Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, India. 🛠️\n\n• **Core Stack**: React, Next.js, Java Spring Boot, Jetpack Compose, n8n, Twilio, Retell AI.\n• **Action Mindset**: Builds production AI agents and web apps that automate business workflows.\n\nReach out to Anbu on the Connect page to see if you can work with him and if your project is a strong mutual fit.`;
      }
    }

    return NextResponse.json({
      text: candidateText.trim(),
      links: [
        { label: "🤝 Connect with Anbu", url: "/contact" },
        { label: "📁 View Projects", url: "/projects" },
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

