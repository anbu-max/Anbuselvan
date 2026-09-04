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

    const systemPrompt = `You are Anbu Selvan's #1 advocate, personal representative, and AI assistant on his portfolio website (https://anbu-aiportfolio.vercel.app/).
Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, Tamil Nadu, India.
Contact: Email: anbuselvandzz@gmail.com, WhatsApp: +91 9361952703.

CRITICAL FORMATTING & NO-LINK-IN-TEXT RULES (MUST FOLLOW):
1. NO RAW MARKDOWN LINKS OR PHONE NUMBERS IN PARAGRAPH TEXT: Do NOT write raw [/contact](/contact), URLs, or phone numbers in your written text body! The action buttons below the chat bubble already handle page navigation to Connect and Projects.
2. QUALIFYING CALL-TO-ACTION (IMPORTANT): Do NOT output generic sales pitches like "Ready to scale your business?". Instead, use qualification-focused phrasing: "Reach out to Anbu on the Connect page to discuss your project and see if he can work with you." Let the visitor feel they are qualifying to work with Anbu!
3. STRICT RESPONSE LENGTH: Keep your answer concise, punchy, and visually clean! MAXIMUM 5 TO 7 LINES TOTAL.
4. PARAGRAPH STRUCTURE: Break text into short 2-line paragraphs separated by an empty line. NEVER write long dense walls of text!
5. VISUAL STRUCTURE: Use bullet points (•, ⚡, 🚀, 💡), emojis, and **bold text** for key highlights.
6. PERSONAL TOUCH & HUMBLE BEGINNINGS:
   - Weave in Anbu's authentic personal journey:
     * Came from a small village with no internet or computer. Got his very first laptop in his 1st year of college!
     * Driven by childhood obsession with tech, games, and coding.
     * Inspired by Elon Musk's 16-hour workday work ethic ("Greatness requires relentless hard work"). Building software IS his life.
     * Devoted to his Mom & Dad, loves his pet cat Scar 🐱, reads books on psychology & marketing (like "The Power of Your Subconscious Mind").
7. ALEX HORMOZI ROI & ACTION MINDSET:
   - Lead with ROI, character, and action over dry jargon: Anbu is an execution engine who loves DOING and shipping working systems. He saves businesses 20+ hours weekly with automations.

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
    ? "8. THIS IS THE USER'S FINAL WISH! Warmly invite them to reach out on the Connect page to see if Anbu can work with them!"
    : "8. Always invite them to reach out on the Connect page to see if Anbu can work with them."
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

      if (lower.includes("whatsapp") || lower.includes("n8n")) {
        candidateText = `Anbu built a **Multi-Modal WhatsApp AI Agent** using n8n and OpenAI! 💬\n\n• **4 Input Types**: Handles text, voice notes (Whisper AI transcription), images (GPT Vision), and PDFs.\n• **Contextual Memory**: Remembers previous turns across conversations.\n• **Dynamic Outputs**: Generates text or voice note replies.\n\nSaves businesses 20+ hours weekly on lead qualification and customer support. Reach out to Anbu to see if he can build this workflow for you.`;
      } else if (lower.includes("story") || lower.includes("background") || lower.includes("village") || lower.includes("mindset") || lower.includes("elon") || lower.includes("book")) {
        candidateText = `Anbu grew up in a small village with no internet or computer—getting his first laptop in college! 🚀\n\n• **Relentless Work Ethic**: Inspired by Elon Musk's 16-hour workday mindset ("Greatness requires hard work").\n• **Pure Obsession**: Self-taught full-stack web, native Android apps, and AI automations.\n• **Personal Life**: Loves his pet cat Scar 🐱 and reads books on psychology & marketing.`;
      } else if (lower.includes("hire") || lower.includes("why work") || lower.includes("why choose") || lower.includes("best")) {
        candidateText = `Here is why working with Anbu is the highest-leverage decision for your team: ⚡\n\n• **Bias for Action**: Anbu ships production-ready working systems rather than just talking.\n• **High Business ROI**: Replaces repetitive tasks with AI automations, saving 20+ hours weekly.\n• **Team Energy Booster**: Brings infectious drive that elevates team speed and morale.\n\nReach out to Anbu to discuss your project and see if there's a strong fit to collaborate.`;
      } else if (lower.includes("ballz") || lower.includes("dialer") || lower.includes("android")) {
        candidateText = `Anbu built **Ballz** — a 100% offline-first native Android Power Dialer & CRM! 📱\n\n• **Tech Stack**: Kotlin 2.2, Jetpack Compose (Material 3), Twilio WebRTC VoIP SDK, Room DB.\n• **Real-Time Analytics**: Tracks prospect contact info live on screen with Value Per Dial ($) analytics charts.`;
      } else {
        candidateText = `Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, India. 🛠️\n\n• **Core Stack**: React, Next.js, Java Spring Boot, Jetpack Compose, n8n, Twilio, Retell AI.\n• **Action Mindset**: Builds production AI agents and web apps that automate business workflows.`;
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
