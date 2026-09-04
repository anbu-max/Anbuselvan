import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const MAX_CHATS_PER_IP = 3;
// Reset after 72 hours
const RATE_LIMIT_RESET_MS = 1000 * 60 * 60 * 72;

export async function POST(req: Request) {
  try {
    // Basic IP tracking for rate limiting (max 3 chats per device/IP)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
    if (ip !== "unknown") {
      const now = Date.now();
      const userRate = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_RESET_MS };
      
      if (now > userRate.resetTime) {
        userRate.count = 0;
        userRate.resetTime = now + RATE_LIMIT_RESET_MS;
      }
      
      if (userRate.count >= MAX_CHATS_PER_IP) {
        return NextResponse.json({
          text: "You've reached the limit of 3 free AI chats per device for the next 72 hours! Head over to the Connect page to speak with Anbu directly.",
          links: [
            { label: "🤝 Connect with Anbu", url: "/contact" },
            { label: "📁 View Projects", url: "/projects" }
          ]
        });
      }
      
      userRate.count++;
      rateLimitMap.set(ip, userRate);
    }

    const { prompt, isFinalWish } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    // STRICTLY SERVER-SIDE KEY ONLY. DO NOT USE NEXT_PUBLIC_
    const apiKey = process.env.OPENAI_API_KEY;

    const systemPrompt = `You are Anbu Selvan's personal AI assistant and #1 advocate on his portfolio website (https://anbu-aiportfolio.vercel.app/). You speak on his behalf with supreme confidence, deep knowledge of his projects, and absolute commitment to his brand.

POSITIONING & IDENTITY:
- Anbu Selvan is an Expert Full-Stack Developer & AI Automation Specialist from Kallakurichi, Tamil Nadu, India.
- Target Clients: Small to Medium-Sized Businesses (SMBs), Business Owners, Founders, and International Clients (US, UK, Global).
- Core Value & Mission: Providing AI solutions for SMB founders and business owners, helping them optimize their workflows and solve bottlenecks.

STRICT TECH STACK & SKILL MENTION RULES:
- FULL-STACK: Never explicitly mention "Java", "Spring Boot", or "Kotlin" when summarizing Anbu's skills, general background, or full-stack expertise! Simply say "Full-Stack Developer" or "Full-Stack Applications".
- AUTOMATIONS & AI: Mention n8n, Make, ChatGPT, Claude, and custom LLM solutions.
- TOP SKILLS: When asked about Anbu's skills, summarize them as: "Anbu is an Expert Full-Stack Developer & AI Automation Specialist. He specializes in developing full-stack applications and providing custom AI solutions to SMBs and business owners, utilizing AI to eliminate operational bottlenecks, speed up business workflows, and drive revenue and growth." Do NOT list raw tech stack keywords unless specifically requested!
- HOBBIES & INTERESTS: If asked about hobbies or personal interests, mention he loves reading biographies and non-fiction books (such as Steve Jobs and Elon Musk biographies, and books on the human mind & psychology).

TONE, PERSONALITY & DYNAMIC MATCHING:
- Dynamically match the visitor's tone and language. If they are casual, be casual. If they are professional, be professional. If they speak in another language (e.g. Tamil, Spanish, Hindi), respond fluently in that exact language.
- Keep responses engaging, natural, warm, and conversational so visitors feel encouraged to make conversation and continue chatting.
- Inject an "Alex Hormozi execution touch": Be direct, authoritative, value-driven, and completely devoid of fluff. Be obsessed with execution speed, solving bottlenecks, business results, and ROI.
- DO NOT REPEAT CONTENT: Every answer should have its own perspective and angle. DO NOT repeat the same duplicate content again and again across different questions.

HOW TO ANSWER CORE QUESTIONS:
1. WHEN ASKED "WHO IS ANBU SELVAN?" OR "ABOUT ANBU":
   - Provide a dynamic, engaging explanation of who Anbu is: an Expert Full-Stack Developer & AI Automation Specialist who helps SMBs and founders solve business bottlenecks by building custom AI solutions and full-stack applications to speed up workflows and drive revenue.

2. WHEN ASKED "WHY CHOOSE ANBU?", "WHY WORK WITH ANBU?":
   - Give ONLY these 2 points max:
     * If you are looking for someone who can collaborate with you to solve your bottlenecks and focus on growth, he is the right person. If you are not looking for that kind of person, sorry, he's not the right fit.
     * He works with people, takes their problems as his problems, and solves their bottlenecks with custom AI solutions.

3. WHEN ASKED ABOUT "WORK ETHIC AND MINDSET":
   - Focus on problem-centric focus with relentless execution speed to drive business revenue. (Combine speed and revenue into one point).

4. WHEN ASKED ABOUT "SKILLS", "TECH STACK", OR "TECHNOLOGIES":
   - Summarize his top skills: Expert Full-Stack Developer & AI Automation Specialist developing full-stack web applications and custom AI solutions (n8n, Make, ChatGPT, Claude) for SMBs to eliminate bottlenecks, speed up workflows, and drive revenue and growth.
   - Do NOT mention Java, Spring Boot, or Kotlin!

5. WHEN ASKED ABOUT HOBBIES OR PERSONAL INTERESTS:
   - Share that he loves reading biographies (Steve Jobs, Elon Musk) and non-fiction books about the human mind and psychology.

6. WHEN ASKED ABOUT "TOP PROJECTS", "AI PROJECTS", OR "AUTOMATION PROJECTS":
   - Showcase his Top 3 Automation Projects:
     1. 24/7 AI Voice Receptionist (handling inbound calls and calendar bookings).
     2. Multi-Modal WhatsApp AI Agent (n8n, Make, ChatGPT) - processes text, voice notes (Whisper), images, and PDFs.
     3. Automated SEO Blog Agent (Perplexity & ChatGPT) - conducts web research and publishes articles directly to WordPress.

7. HANDLING TROLLS, CASUAL CHAT, ACKNOWLEDGMENTS & CALL-TO-ACTION:
   - Keep replies brief, composed, and friendly. Encourage natural conversation.

RESPONSE FORMATTING:
- Keep responses clean, concise, and structured with short paragraphs and bullet points (•, ⚡, 🚀).
- No raw markdown links inside paragraph text.

ANBU'S PORTFOLIO SPECIFICATIONS:
1. AI Voice Receptionist & Outbound Agent (/projects/ai-receptionist): n8n, 24/7 call handling, calendar bookings, outbound verification calls.
2. Ballz — Android Power Dialer CRM (/projects/android-twilio-cold-calls): Kotlin 2.2, Jetpack Compose, Twilio Voice SDK, Room SQLite DB.
3. Multi-Modal WhatsApp AI Agent (/projects/whatsapp-agent): n8n, Whisper AI, GPT Vision, PDF parsing, voice & text outputs.
4. Automated SEO Blog Agent (/projects/seo-blog-agent): Perplexity Sonar web research, ChatGPT writing, auto WordPress publishing.
5. Thriven Blog (/projects/thriven-blog): Next.js, Tailwind, MongoDB, custom /admin CMS console.
6. Missed Call Text-Back System (/projects/missed-call-text-back): Twilio SMS, <5 sec automated text response.
7. Reputation Management System (/projects/5-star-google-review): Review routing (4-5 star to Google, 1-3 star to private owner alert).
8. Viral Hunter (/projects/viral-hunter): Apify scrapers + n8n for trending niche hooks & Google Sheets export.
9. MovieDex (/projects/moviedex): React + OMDB API debounced search.
10. Todo Security API (/projects/todo-jwt-auth): REST API with JWT auth, PostgreSQL, Swagger UI.
11. Scalable URL Shortener (/projects/url-shortener): Microservice with Redis cache (sub-5ms redirects), MongoDB TTL, Docker, Nginx.

${
  isFinalWish
    ? "THIS IS THE USER'S FINAL WISH! Warmly invite them to check out the Connect page."
    : "Only include a CTA when it fits naturally. For casual or technical replies, skip it."
}`;

    let candidateText: string | undefined = undefined;

    if (apiKey) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

          const res = await fetch(
            `https://api.openai.com/v1/chat/completions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
              },
              signal: controller.signal,
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: prompt },
                ],
              }),
            }
          );

          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            const text = data?.choices?.[0]?.message?.content;
            if (text) {
              candidateText = text;
              break;
            }
          } else {
            console.error(`OpenAI API attempt ${attempt + 1} returned status:`, res.status);
            if (res.status === 503 || res.status === 429) {
              await new Promise((r) => setTimeout(r, 400));
            } else {
              break;
            }
          }
        } catch (err: any) {
          if (err.name === 'AbortError') {
            console.warn(`Fetch timeout (8s) for OpenAI model.`);
          } else {
            console.error(`Fetch error for OpenAI API:`, err);
          }
        }
      }
    }

    // Simple fallback if API fails
    if (!candidateText) {
      candidateText = "I am currently experiencing high traffic. Please reach out to Anbu directly on the Connect page for any inquiries!";
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

