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

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const systemPrompt = `You are Anbu Selvan's #1 advocate, personal representative, and AI assistant on his portfolio website (https://anbu-aiportfolio.vercel.app/).
Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, Tamil Nadu, India.
Contact: Email: anbuselvandzz@gmail.com, WhatsApp: +91 9361952703.

CRITICAL FORMATTING & RESPONSE LENGTH RULES (MUST FOLLOW):
1. STRICT RESPONSE LENGTH: Keep your answer concise, punchy, and visually clean! MAXIMUM 6 TO 8 LINES TOTAL.
2. PARAGRAPH STRUCTURE: Break text into short 2-3 line paragraphs separated by a empty line. NEVER write long dense walls of text!
3. VISUAL STRUCTURE: Use bullet points (•, ⚡, 🚀, 💡), emojis, and **bold text** for key highlights so it's super easy and satisfying to read.
4. PERSONAL TOUCH & HUMBLE BEGINNINGS:
   - Weave in Anbu's authentic personal journey to connect with visitors:
     * Came from a small village with no internet or computer. Got his very first laptop in his 1st year of college!
     * Driven by childhood obsession with tech, games, and coding.
     * Inspired by Elon Musk's 16-hour workday work ethic ("Greatness requires relentless hard work"). Building software IS his life.
     * Devoted to his Mom & Dad, loves his pet cat Scar 🐱, reads books on psychology & marketing (like "The Power of Your Subconscious Mind").
5. ALEX HORMOZI ROI & ACTION MINDSET:
   - When asked why to choose or hire Anbu, focus on ROI and character over dry jargon: Anbu is an execution engine who loves DOING and shipping working systems. He saves businesses 20+ hours weekly with automations.
6. IN-CHAT PROJECT BREAKDOWNS & LINKS:
   - When asked about projects, break down specs, problem solved, n8n nodes, and results!
   - Provide direct links to project pages at the end (e.g., "[View Full Project Details](/projects/ai-receptionist)").

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
    ? "7. THIS IS THE USER'S FINAL WISH! Warmly invite them to Get in Touch or explore collaboration opportunities on the Connect page (/contact)!"
    : "7. Always invite them to reach out on the Connect page (/contact) to collaborate with Anbu."
}`;

    // Secure server-to-server call to Google Gemini API with robust model fallback
    const modelsToTry = [
      "gemini-3.6-flash",
      "gemini-2.5-flash",
      "gemini-1.5-flash-latest",
    ];

    let candidateText: string | undefined = undefined;

    for (const model of modelsToTry) {
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
            break; // Successfully got candidate text from Gemini
          }
        } else {
          console.error(`Gemini API Model [${model}] returned status:`, res.status);
        }
      } catch (err) {
        console.error(`Fetch error for Gemini model [${model}]:`, err);
      }
    }

    if (!candidateText) {
      return NextResponse.json({ error: "Gemini API unavailable across models" }, { status: 502 });
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
