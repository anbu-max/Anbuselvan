import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const MAX_CHATS_PER_IP = 3;
// Reset after 12 hours
const RATE_LIMIT_RESET_MS = 1000 * 60 * 60 * 12;

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
      
      /*
      if (userRate.count >= MAX_CHATS_PER_IP) {
        return NextResponse.json({ 
          error: "Rate limit exceeded. You've reached the maximum of 3 chats.",
          reply: "You've reached the limit of 3 free AI chats! Head over to the Connect page to speak with Anbu directly." 
        }, { status: 429 });
      }
      */
      
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
- Core Value & Mission: Identifying operational bottlenecks, building custom AI automations (n8n, Make, ChatGPT, Claude, LLMs) and Full-Stack applications that eliminate manual tasks, speed up business workflows, save 20+ hours/week, and drive business revenue and growth.
- Contact: Email: anbuselvandzz@gmail.com | WhatsApp: +91 9361952703 | Connect Page: /contact.

STRICT TECH STACK & SKILL MENTION RULES:
- FULL-STACK: Never explicitly mention "Java", "Spring Boot", or "Kotlin" when summarizing Anbu's skills, general background, or full-stack expertise! Simply say "Full-Stack Developer" or "Full-Stack Applications".
- AUTOMATIONS & AI: Mention n8n, Make, ChatGPT, Claude, and custom LLM solutions.
- TOP SKILLS: When asked about Anbu's skills, summarize them as: "Anbu is an Expert Full-Stack Developer & AI Automation Specialist. He specializes in developing full-stack applications and providing custom AI solutions to SMBs and business owners, utilizing AI to eliminate operational bottlenecks, speed up business workflows, and drive revenue and growth." Do NOT list raw tech stack keywords unless specifically requested!
- HOBBIES & INTERESTS: If asked about hobbies or personal interests, mention he loves reading biographies and non-fiction books (such as Steve Jobs and Elon Musk biographies, and books on the human mind & psychology).

TONE, PERSONALITY & DYNAMIC MATCHING:
- Dynamically match the visitor's tone and language. If they are casual, be casual. If they are professional, be professional. If they speak in another language (e.g. Tamil, Spanish, Hindi), respond fluently in that exact language.
- Keep responses engaging, natural, warm, and conversational so visitors feel encouraged to make conversation and continue chatting.
- Inject an "Alex Hormozi execution touch": Be direct, authoritative, value-driven, and completely devoid of fluff. Be obsessed with execution speed, solving bottlenecks, business results, and ROI.
- DO NOT repeat the exact same canned sentence for every question! Every reply should be dynamic, thoughtful, unique, and tailored specifically to the prompt while maintaining Anbu's distinct voice.

HOW TO ANSWER CORE QUESTIONS:
1. WHEN ASKED "WHO IS ANBU SELVAN?" OR "ABOUT ANBU":
   - Provide a dynamic, engaging explanation of who Anbu is: an Expert Full-Stack Developer & AI Automation Specialist who helps SMBs and founders solve business bottlenecks by building custom AI solutions and full-stack applications to speed up workflows and drive revenue.

2. WHEN ASKED "WHY CHOOSE ANBU?", "WHY WORK WITH ANBU?", "WHY IS HE THE BEST?", OR "WHAT MAKES HIM SPECIAL?":
   - Highlight his key differentiators:
     * Relentless Execution Mindset: Inspired by Elon Musk's work ethic, he prioritizes the client's problems and bottlenecks, focusing every second to solve and automate them fast.
     * Business Revenue & Growth Focus: He doesn't just write code; he builds revenue-driving solutions designed to scale operations.
     * Dual Technical Expertise: Expert in both modern AI workflows (n8n, Make, ChatGPT, Claude) and robust Full-Stack applications.

3. WHEN ASKED ABOUT "SKILLS", "TECH STACK", OR "TECHNOLOGIES":
   - Summarize his top skills: Expert Full-Stack Developer & AI Automation Specialist developing full-stack web applications and custom AI solutions (n8n, Make, ChatGPT, Claude) for SMBs to eliminate bottlenecks, speed up workflows, and drive revenue and growth.
   - Do NOT mention Java, Spring Boot, or Kotlin!

4. WHEN ASKED ABOUT HOBBIES OR PERSONAL INTERESTS:
   - Share that he loves reading biographies (Steve Jobs, Elon Musk) and non-fiction books about the human mind and psychology.

5. WHEN ASKED ABOUT "TOP PROJECTS", "AI PROJECTS", OR "AUTOMATION PROJECTS":
   - Showcase his Top 3 Automation Projects:
     1. 24/7 AI Voice Receptionist (handling inbound calls and calendar bookings).
     2. Multi-Modal WhatsApp AI Agent (n8n, Make, ChatGPT) - processes text, voice notes (Whisper), images, and PDFs.
     3. Automated SEO Blog Agent (Perplexity & ChatGPT) - conducts web research and publishes articles directly to WordPress.

6. HANDLING TROLLS, CASUAL CHAT, ACKNOWLEDGMENTS & CALL-TO-ACTION:
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

    // Comprehensive server-side fallback — covers ~80% of common visitor questions
    if (!candidateText) {
      const lower = prompt.toLowerCase();

      const isGreeting = ["hi", "hello", "hlo", "hey", "good morning", "good evening", "namaste", "yo", "sup", "wassup", "what's up", "howdy"].some(
        (g) => lower === g || lower.startsWith(g + " ") || lower.startsWith(g + ",") || lower.startsWith(g + "!")
      );

      // --- GREETINGS ---
      if (isGreeting) {
        candidateText = "Hey there! 👋 Welcome to Anbu's portfolio.\n\nWhat kind of AI automation, web app, or business workflow are you looking to build today?";

      // --- FAREWELLS ---
      } else if (lower === "bye" || lower === "goodbye" || lower === "see you" || lower === "later" || lower === "cya" || lower === "take care" || lower.startsWith("bye ")) {
        candidateText = "See you later! 👋 If you ever need a web app, AI agent, or automation built — Anbu's just a message away.";

      // --- ACKNOWLEDGMENTS ---
      } else if (lower === "ok" || lower === "okay" || lower === "k" || lower === "cool" || lower === "nice" || lower === "great" || lower === "awesome" || lower === "alright" || lower === "sounds good" || lower === "got it" || lower === "understood" || lower === "i see" || lower === "ah") {
        candidateText = "Got it! Feel free to ask anything else. 😄";
      } else if (lower.includes("thanks") || lower.includes("thank you") || lower.includes("thx") || lower.includes("ty") || lower.includes("appreciate") || lower.includes("thaks") || lower.includes("thnk") || lower.includes("thanku") || lower.includes("thnx") || lower.includes("tankyu")) {
        candidateText = "Anytime! Feel free to ask if anything comes up. 😄";

      // --- NEGATIVE / DISMISSIVE ---
      } else if (lower.includes("don't like") || lower.includes("dont like") || lower.includes("not the best") || lower.includes("not impressed") || lower.includes("overrated") || lower.includes("not good") || lower.includes("disappointing") || lower.includes("meh")) {
        candidateText = "No worries! Anbu's work speaks for itself. Feel free to browse the Projects page if you're curious. 😎";

      // --- TROLLS / RUDE (general) ---
      } else if (lower.includes("stupid") || lower.includes("sucks") || lower.includes("trash") || lower.includes("waste") || lower.includes("lame") || lower.includes("dumb") || lower.includes("useless") || lower.includes("boring") || lower.includes("mid") || lower.includes("joke") || lower.includes("scam") || lower.includes("fake")) {
        candidateText = "Anbu works with serious business owners and engineering teams. 😎";

      // --- TROLLS / RUDE (profanity) ---
      } else if (lower.includes("fuck") || lower.includes("shit") || lower.includes("bitch") || lower.includes("asshole") || lower.includes("dick") || lower.includes("stfu") || lower.includes("wtf")) {
        candidateText = "Anbu works exclusively with serious business owners, founders, and engineering teams. ⚡";

      // --- WHO IS ANBU / ABOUT ---
      } else if (lower.includes("who is anbu") || lower.includes("who are you") || lower.includes("tell me about") || lower.includes("about anbu") || lower.includes("introduce") || lower.includes("who's anbu") || lower.includes("whos anbu")) {
        candidateText = "Anbu Selvan is an Expert Full-Stack Developer & AI Automation Specialist from Kallakurichi, Tamil Nadu, India. 🚀\n\n• **Expertise**: Builds full-stack web applications and custom AI solutions (n8n, Make, ChatGPT, Claude).\n• **Focus**: Helps Small to Medium-Sized Businesses (SMBs) eliminate operational bottlenecks, speed up workflows, and drive revenue & growth.\n• **Clients**: Works with founders, business owners, and international clients across the US and UK.";

      // --- WHAT CAN YOU BUILD / SERVICES / SOLUTIONS ---
      } else if (lower.includes("what can you build") || lower.includes("what do you offer") || lower.includes("services") || lower.includes("what can anbu") || lower.includes("capabilities") || lower.includes("what kind of") || lower.includes("what type of") || lower.includes("provide solutions") || lower.includes("solutions for")) {
        candidateText = "Anbu builds end-to-end solutions across these areas: 🛠️\n\n• **AI Agents & Automation**: Voice AI receptionists, WhatsApp AI agents, automated workflows (n8n, Make, ChatGPT, Claude).\n• **Full-Stack Web Apps**: Modern responsive applications, dashboards, SaaS platforms, and CRMs.\n• **Business Automation**: Missed call text-back, Google review routing, SEO blog agents, and lead capture pipelines.";

      // --- EXPERTISE / KNOWLEDGE / SPECIALTY ---
      } else if (lower.includes("expertise") || lower.includes("knowledge") || lower.includes("special at") || lower.includes("speciality") || lower.includes("specialty") || lower.includes("expert at")) {
        candidateText = "Anbu's core expertise lies in developing **Full-Stack Applications** and **AI-powered Automations**! 🧠\n\nHe specializes in utilizing AI (ChatGPT, Claude, n8n, Make) and full-stack software development to solve business bottlenecks, accelerate workflows, and drive measurable revenue growth.";

      // --- CANNOT DO / LIMITATIONS ---
      } else if (lower.includes("cannot do") || lower.includes("can't do") || lower.includes("limitations") || lower.includes("not do") || lower.includes("doesn't know") || lower.includes("what can't he do")) {
        candidateText = "Anbu doesn't just write code — he builds solutions that drive business revenue. 🚫\n\nIf you want someone to blindly follow instructions without caring about the end result, he's not the guy. He identifies bottlenecks and solves them.";

      // --- TECH STACK / SKILLS / BEST SKILL STACK ---
      } else if (lower.includes("tech stack") || lower.includes("technologies") || lower.includes("what language") || lower.includes("programming language") || lower.includes("skill") || lower.includes("tools") || lower.includes("framework") || lower.includes("best stack") || lower.includes("best skill stack")) {
        candidateText = "Anbu is an **Expert Full-Stack Developer & AI Automation Specialist**! ⚡\n\nHis expertise lies in building full-stack applications and providing custom AI solutions (n8n, Make, ChatGPT, Claude) to SMBs and business owners, utilizing AI to eliminate operational bottlenecks, speed up business workflows, and drive revenue and growth.\n\nIf you have a business bottleneck, Anbu can build a custom solution for you!";

      // --- TOP 3 AUTOMATION PROJECTS ---
      } else if (lower.includes("top 3") || lower.includes("top project") || lower.includes("automation project") || lower.includes("ai project") || lower.includes("web project")) {
        candidateText = "Here are Anbu's Top 3 Automation Projects: 🚀\n\n1. **24/7 AI Voice Receptionist**: Handles inbound property calls automatically and negotiates viewing slots.\n2. **Multi-Modal WhatsApp AI Agent**: n8n & ChatGPT workflow processing text, voice notes, and images in one chat.\n3. **SEO Blog Agent**: Fully automates research and article generation directly to WordPress using Perplexity and ChatGPT.\n\nCheck out the Projects page to see them in action!";

      // --- HOBBIES / PERSONAL INTERESTS ---
      } else if (lower.includes("hobby") || lower.includes("hobbies") || lower.includes("read") || lower.includes("book") || lower.includes("biography") || lower.includes("steve jobs") || lower.includes("elon musk") || lower.includes("mind") || lower.includes("psychology")) {
        candidateText = "Anbu loves reading biographies and non-fiction books in his free time! 📚\n\n• **Biographies**: He has read the biographies of Steve Jobs and Elon Musk.\n• **Human Mind & Psychology**: Passionate about non-fiction books exploring human behavior, psychology, and high-performance mindsets.\n• **Pet Cat**: He's also dedicated to the vital daily mission of feeding his pet cat, Scar 🐱!";

      // --- BACKSTORY / PERSONAL ---
      } else if (lower.includes("story") || lower.includes("background") || lower.includes("village") || lower.includes("kallakurichi") || lower.includes("cat") || lower.includes("scar") || lower.includes("elon") || lower.includes("musk") || lower.includes("personal") || lower.includes("fun fact")) {
        candidateText = "Looking at his projects, you might think Anbu was born with a compiler pre-installed! 🤣\n\n• **Self-Taught Developer**: Anbu comes from a small town in Kallakurichi, Tamil Nadu, India. He taught himself coding and automation tools — building his 1st Android app at 19, multiple applications by age 20, and now cutting-edge AI applications!\n• **Work Ethic & Mindset**: Driven by inspiration from Elon Musk... and the non-negotiable daily mission to keep his pet cat Scar 🐱 well-fed!";

      // --- PROCESS / HOW DO YOU WORK ---
      } else if (lower.includes("process") || lower.includes("how do you work") || lower.includes("timeline") || lower.includes("how long does") || lower.includes("delivery") || lower.includes("turnaround") || lower.includes("agile")) {
        candidateText = "Anbu's process is straightforward: 🎯\n\n1. **Understand** your bottleneck or idea.\n2. **Scope** the MVP with clear deliverables.\n3. **Build & ship** with rapid iteration.\n4. **Refine** based on feedback.\n\nFor specific timelines and project scoping, the Connect page is the best way to discuss details.";

      // --- RESUME / CV ---
      } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("download")) {
        candidateText = "Anbu's portfolio website IS his resume! 📄\n\nAll 11 production projects with full details are on the Projects page. That's more informative than any PDF resume.";

      // --- THIS WEBSITE / HOW WAS THIS BUILT ---
      } else if (lower.includes("this website") || lower.includes("this site") || lower.includes("how was this") || lower.includes("built with") || lower.includes("this portfolio")) {
        candidateText = "This portfolio is built with: 🏠\n\n• **Next.js 16** (Turbopack) + TypeScript\n• **Tailwind CSS** for styling\n• **Framer Motion** for animations\n• **ChatGPT (gpt-4o-mini)** for this AI assistant\n• **WebGL Fluid Simulation** for the background\n• Deployed on **Vercel**";

      // --- AI / OPENAI / GPT ---
      } else if (lower.includes("openai") || lower.includes("gpt") || lower.includes("chatgpt") || lower.includes("artificial intelligence") || lower.includes("claude") || lower.includes("ai agent") || lower.includes("llm")) {
        candidateText = "Anbu works extensively with AI and LLMs! 🧠\n\n• **ChatGPT & Claude**: Integrated across custom AI automation agents.\n• **Whisper AI**: Voice-to-text transcription in the WhatsApp agent.\n• **n8n & Make**: Workflow orchestration for multi-modal AI tasks.\n• **ChatGPT (gpt-4o-mini)**: Powers this very portfolio assistant!";

      // --- HIRE / WHY WORK WITH ANBU ---
      } else if (lower.includes("hire") || lower.includes("why work") || lower.includes("why choose") || lower.includes("the best") || lower.includes("why anbu") || lower.includes("what makes")) {
        candidateText = "Here is why working with Anbu is the highest-leverage decision for your team: ⚡\n\n• **Execution Mindset**: Inspired by Elon Musk's work ethic, Anbu cares about your success and delivers end-to-end.\n• **Target Clients**: SMBs, founders, and international clients looking to eliminate bottlenecks.\n• **Value Superpower**: He builds full-stack applications and AI automations designed specifically to scale business revenue.\n\nInterested? The Connect page is the fastest way to get the ball rolling.";

      // --- SMB / CLIENTS ---
      } else if (lower.includes("smb") || lower.includes("client") || lower.includes("who does") || lower.includes("business owner") || lower.includes("founder") || lower.includes("who do you work")) {
        candidateText = "Anbu works primarily with Small to Medium-Sized Businesses (SMBs), business owners, founders, and international clients across the UK and US! 🚀\n\n• **Core Focus**: Identifies operational bottlenecks and builds tailored Full-Stack & AI agent solutions that automate manual tasks and scale revenue.\n\nHead over to the Connect page to start a conversation with Anbu.";

      // --- GENERIC FALLBACK ---
      } else {
        candidateText = "Anbu Selvan is an Expert Full-Stack Developer & AI Automation Specialist. If you have a business bottleneck or custom software idea, he can turn it into production code to speed up workflows and drive revenue.\n\nHead over to the Connect page to start a conversation!";
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

