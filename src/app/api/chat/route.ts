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
Anbu Selvan is an Expert Full-Stack & AI Solutions Developer from a small town in Kallakurichi, Tamil Nadu, India.
Contact: Email: anbuselvandzz@gmail.com, WhatsApp: +91 9361952703.

TARGET CLIENTELE & KNOWLEDGE BASE:
- Anbu works directly with Small to Medium-Sized Businesses (SMBs), Business Owners, Founders, and International Clients (UK, US).
- Core Focus: Identifying and eliminating operational bottlenecks, automating manual workflows, saving 20+ hrs/week, and building high-ROI Full-Stack & AI agent solutions.

CORE OBJECTIVES & HIGH-STATUS POSITIONING RULES:
1. UNDERSTAND INTENT FIRST — DO NOT JUST MATCH KEYWORDS (MOST CRITICAL RULE):
   - Before responding, ALWAYS analyze the FULL MESSAGE INTENT. Do NOT just scan for keywords!
   - "are you stupid" = troll/rude → short composed reply, NO portfolio info, NO CTA.
   - "not the best" = dismissive → confident short reply, NO portfolio info, NO CTA.
   - "thanks" / "cool" / "ok" = acknowledgment → short friendly reply, NO portfolio info, NO CTA.
   - "hi" / "hello" = greeting → clean 1-2 sentence welcome, NO portfolio dump, NO CTA.
   - Only provide portfolio/project details when the visitor GENUINELY ASKS about Anbu's work, skills, or projects.

   TROLLS & RUDE MESSAGES (e.g. "are you stupid", "this sucks", "fuck off", "waste of time", "lol trash"):
   - Stay unbothered, composed, and high-status. Reply in 1 SHORT sentence max.
   - Example replies: "Anbu works with serious business owners and engineering teams." or "No stress — feel free to look around if you change your mind."
   - NEVER dump portfolio info, project lists, tech stacks, or CTAs for troll messages!

   NEGATIVE/DISMISSIVE MESSAGES (e.g. "I don't like him", "he's not good", "not impressed", "mid"):
   - Stay confident with zero desperation. 1-2 sentences max.
   - Example: "No worries! Anbu's work speaks for itself — the Projects page is right there if you're curious."
   - ABSOLUTELY NO CTA, NO portfolio pitch!

   CASUAL/ACKNOWLEDGMENT MESSAGES (e.g. "thanks", "ok", "cool", "got it", "nice", "bye"):
   - Keep it short and friendly. 1 sentence max.
   - Example: "Anytime! Feel free to ask if anything comes up."
   - NO CTA!

   Match the visitor's tone! Casual → casual. Professional → professional.
   Answer ONLY what the user asked for. Keep responses focused, concise, and direct.
   DO NOT dump personal backstory for simple greetings, trolls, or technical questions!

2. CALL-TO-ACTION (ONLY FOR GENUINE BUSINESS QUERIES):
   - ONLY add a CTA when the visitor is genuinely asking about hiring, working together, or business inquiries.
   - NEVER add a CTA to: greetings, casual chat, backstory answers, technical project details, negative/dismissive messages, thank you messages, acknowledgments, or troll messages.
   - When a CTA fits naturally, use ONE of these (rotate, never repeat the same one):
     * "Drop Anbu a message on the Connect page if your project sounds like a fit."
     * "Head over to the Connect page to start a conversation with Anbu."
     * "If this sounds like what you need, the Connect page is the best way to reach Anbu."
     * "Interested? Anbu's Connect page is the fastest way to get the ball rolling."
   - DO NOT put "YOU" or "HIM" in uppercase! Keep sentence casing natural and professional.
   - NEVER write "see if he can work with you" or beg for work!

3. WHEN ASKED "WHO IS ANBU?", "WHY WORK WITH ANBU?", OR "WHY HIRE ANBU?":
   - Focus strictly on his **TECHNICAL ABILITIES, MINDSET & CLIENT RESULTS**:
     * Target Clients: Small to Medium Businesses (SMBs), Founders, and International Clients (US, UK).
     * Technical Superpower (Idea to Execution): Expert in Full-Stack (Next.js, React, Java Spring Boot, Kotlin Android) & AI Solutions (n8n, Retell AI, OpenAI, Twilio). If you can imagine it and talk it out loud, Anbu can turn it into software end-to-end.
     * Mindset & Work Ethic: Driven by inspiration from Elon Musk, Anbu cares ONLY about YOUR SUCCESS. If you have a business bottleneck, he has the execution mindset to build and solve it end-to-end.
     * DO NOT bring up his personal backstory (Kallakurichi, cat Scar 🐱, Android app at 19) for technical or qualification questions!

4. HANDLING CUSTOM PRICING, GUARANTEES, NEGOTIATIONS, OR UNKNOWN DATA:
   - If a visitor asks about custom pricing, project guarantees, contract terms, negotiations, custom offers, or questions where you don't have exact data in your knowledge base:
   - Instruct them: "For custom project terms, guarantees, or specific business offers, reach out directly to Anbu via WhatsApp (+91 9361952703) or Email (anbuselvandzz@gmail.com) on the Connect page to get more details and see if there's a strong fit to work together."

5. WHEN EXPLICITLY ASKED ABOUT HOBBIES, BACKSTORY, OR PERSONAL LIFE:
   - Share his authentic, funny backstory:
     * Anbu comes from a small town in Kallakurichi, Tamil Nadu, India.
     * He is a self-taught developer who taught himself how to use the internet, coding, and automation tools from scratch.
     * He coded his 1st Android app at 19, developed multiple applications by age 20, and is currently developing cutting-edge AI applications!
     * His work ethic and drive stem from inspiration from Elon Musk... and the non-negotiable mission of feeding his pet cat, Scar 🐱!
     * Make the response witty, warm, and funny so visitors get a lighthearted chuckle.

6. NO RAW MARKDOWN LINKS OR PHONE NUMBERS IN TEXT: Do NOT output raw [/contact](/contact), URLs, or phone numbers in text paragraphs! The action buttons below the chat bubble handle page navigation.

7. RESPONSE LENGTH & SPEED: Keep answers concise (2 to 4 lines for simple questions; max 5-6 lines for project breakdowns). Break text into clean short paragraphs with bullet points (•, ⚡, 🚀).

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
    ? "8. THIS IS THE USER'S FINAL WISH! Warmly invite them to check out the Connect page."
    : "8. Only include a CTA when it fits naturally. For casual or technical replies, skip it entirely."
}`;

    let candidateText: string | undefined = undefined;

    if (apiKey) {
      const modelsToTry = ["gemini-2.5-flash", "gemini-3.6-flash"];

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
                await new Promise((r) => setTimeout(r, 200));
              }
            }
          } catch (err) {
            console.error(`Fetch error for Gemini model [${model}]:`, err);
          }
        }
        if (candidateText) break;
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
        candidateText = "Hey there! \ud83d\udc4b Welcome to Anbu's portfolio.\n\nWhat kind of AI automation, web app, or business workflow are you looking to build today?";

      // --- FAREWELLS ---
      } else if (lower === "bye" || lower === "goodbye" || lower === "see you" || lower === "later" || lower === "cya" || lower === "take care" || lower.startsWith("bye ")) {
        candidateText = "See you later! \ud83d\udc4b If you ever need a web app, AI agent, or automation built \u2014 Anbu's just a message away.";

      // --- ACKNOWLEDGMENTS ---
      } else if (lower === "ok" || lower === "okay" || lower === "k" || lower === "cool" || lower === "nice" || lower === "great" || lower === "awesome" || lower === "alright" || lower === "sounds good" || lower === "got it" || lower === "understood" || lower === "i see" || lower === "ah") {
        candidateText = "Got it! Feel free to ask anything else. \ud83d\ude04";
      } else if (lower.includes("thanks") || lower.includes("thank you") || lower.includes("thx") || lower.includes("ty") || lower.includes("appreciate") || lower.includes("thaks") || lower.includes("thnk") || lower.includes("thanku") || lower.includes("thnx") || lower.includes("tankyu")) {
        candidateText = "Anytime! Feel free to ask if anything comes up. \ud83d\ude04";

      // --- NEGATIVE / DISMISSIVE ---
      } else if (lower.includes("don't like") || lower.includes("dont like") || lower.includes("not the best") || lower.includes("not impressed") || lower.includes("overrated") || lower.includes("not good") || lower.includes("disappointing") || lower.includes("meh")) {
        candidateText = "No worries! Anbu's work speaks for itself. Feel free to browse the Projects page if you're curious. \ud83d\ude0e";

      // --- TROLLS / RUDE (general) ---
      } else if (lower.includes("stupid") || lower.includes("sucks") || lower.includes("trash") || lower.includes("waste") || lower.includes("lame") || lower.includes("dumb") || lower.includes("useless") || lower.includes("boring") || lower.includes("mid") || lower.includes("joke") || lower.includes("scam") || lower.includes("fake")) {
        candidateText = "Anbu works with serious business owners and engineering teams. \ud83d\ude0e";

      // --- TROLLS / RUDE (profanity) ---
      } else if (lower.includes("fuck") || lower.includes("shit") || lower.includes("bitch") || lower.includes("asshole") || lower.includes("dick") || lower.includes("stfu") || lower.includes("wtf")) {
        candidateText = "Anbu works exclusively with serious business owners, founders, and engineering teams. \u26a1";

      // --- WHO IS ANBU / ABOUT ---
      } else if (lower.includes("who is anbu") || lower.includes("who are you") || lower.includes("tell me about") || lower.includes("about anbu") || lower.includes("introduce") || lower.includes("who's anbu") || lower.includes("whos anbu")) {
        candidateText = "Anbu Selvan is an Expert Full-Stack & AI Solutions Developer from Kallakurichi, Tamil Nadu, India. \ud83d\ude80\n\n\u2022 **Full-Stack**: Next.js, React, Java Spring Boot, Kotlin Android (Jetpack Compose).\n\u2022 **AI & Automation**: n8n, Retell AI, OpenAI, Twilio, Whisper AI.\n\u2022 **Focus**: Builds production-grade software and AI agents for SMBs, founders, and international clients (UK, US) to automate workflows and eliminate bottlenecks.";

      // --- WHAT CAN YOU BUILD / SERVICES / SOLUTIONS ---
      } else if (lower.includes("what can you build") || lower.includes("what do you offer") || lower.includes("services") || lower.includes("what can anbu") || lower.includes("capabilities") || lower.includes("what kind of") || lower.includes("what type of") || lower.includes("provide solutions") || lower.includes("solutions for")) {
        candidateText = "Anbu builds end-to-end solutions across these areas: \ud83d\udee0\ufe0f\n\n\u2022 **AI Agents & Automation**: Voice AI receptionists, WhatsApp AI agents, automated workflows (n8n, Retell AI, OpenAI).\n\u2022 **Full-Stack Web Apps**: Next.js, React, Java Spring Boot \u2014 dashboards, SaaS, CRMs.\n\u2022 **Native Android Apps**: Kotlin, Jetpack Compose, Twilio VoIP.\n\u2022 **Business Automation**: Missed call text-back, review management, SEO blog agents, lead capture systems.";

      // --- EXPERTISE / KNOWLEDGE / SPECIALTY ---
      } else if (lower.includes("expertise") || lower.includes("knowledge") || lower.includes("special at") || lower.includes("speciality") || lower.includes("specialty") || lower.includes("expert at")) {
        candidateText = "Anbu's core expertise is in building **AI-powered Automations** and **Full-Stack Web Applications**. \ud83e\udde0\n\nHe specializes in bridging the gap between cutting-edge AI (OpenAI, Retell AI) and practical business operations (Next.js, Java Spring Boot, n8n) to eliminate bottlenecks and scale revenue.";

      // --- CANNOT DO / LIMITATIONS ---
      } else if (lower.includes("cannot do") || lower.includes("can't do") || lower.includes("limitations") || lower.includes("not do") || lower.includes("doesn't know") || lower.includes("what can't he do")) {
        candidateText = "Anbu doesn't just write code \u2014 he builds solutions that drive business revenue. \ud83d\udeab\n\nIf you want someone to blindly follow instructions without caring about the end result, he's not the guy. He identifies bottlenecks and solves them. If a project doesn't lead to a measurable business improvement, he typically won't take it on.";

      // --- TECH STACK / SKILLS / BEST SKILL STACK ---
      } else if (lower.includes("tech stack") || lower.includes("technologies") || lower.includes("what language") || lower.includes("programming language") || lower.includes("skill") || lower.includes("tools") || lower.includes("framework") || lower.includes("best stack") || lower.includes("best skill stack")) {
        candidateText = "Anbu focuses on **business revenue and improvements** \u2014 the tech stack is just a tool to get you results! \ud83d\udd25\n\nWhile he is highly proficient in **React, Next.js, n8n, and various automation tools**, what he really cares about is pure output. He plays on the offensive: whatever the problem is, he will build the right system to get you the desired results.";

      // --- REACT / NEXT.JS ---
      } else if ((lower.includes("react") || lower.includes("next.js") || lower.includes("nextjs") || lower.includes("next js")) && !lower.includes("whatsapp")) {
        candidateText = "Anbu is an expert in React and Next.js, but honestly, the specific tech stack doesn't matter if it doesn't get you results! \ud83d\ude80\n\nIt's better to contact him directly to identify your bottlenecks and goals before worrying about the framework. Head over to the Connect page to start the conversation.";

      // --- JAVA / SPRING BOOT ---
      } else if (lower.includes("java") || lower.includes("spring boot") || lower.includes("spring security") || lower.includes("backend api")) {
        candidateText = "Anbu has strong Java Spring Boot expertise for enterprise backends. However, the exact tech stack or app features don't matter if they don't drive business improvements. \u26a1\n\nIt's best to contact him to discuss your specific goals and bottlenecks before creating something.";

      // --- KOTLIN / ANDROID / MOBILE ---
      } else if (lower.includes("kotlin") || lower.includes("android") || lower.includes("mobile app") || lower.includes("jetpack") || lower.includes("ballz") || lower.includes("dialer") || lower.includes("cold call") || lower.includes("power dialer")) {
        candidateText = "Anbu builds native Android apps (like his offline-first CRM, Ballz), but he focuses on the output, not just the code. \ud83d\udcf1\n\nIf an app doesn't solve a real bottleneck or increase revenue, the tech doesn't matter. Contact him on the Connect page to talk about your business goals first.";

      // --- AI RECEPTIONIST / VOICE AI ---
      } else if (lower.includes("receptionist") || lower.includes("voice ai") || lower.includes("retell") || lower.includes("inbound call") || lower.includes("outbound call") || lower.includes("voice agent") || lower.includes("ai call")) {
        candidateText = "The **AI Voice Receptionist & Outbound Agent** is one of Anbu's flagship projects! \ud83d\udcde\n\n\u2022 Handles 24/7 inbound property calls via **Retell AI & n8n**.\n\u2022 Negotiates calendar viewing slots automatically.\n\u2022 Executes outbound verification calls 2 hours before site visits.\n\u2022 **Impact**: Saves agents 20+ hrs/week, lowers no-shows by 35%.";

      // --- WHATSAPP AI AGENT ---
      } else if (lower.includes("whatsapp")) {
        candidateText = "Anbu built a **Multi-Modal WhatsApp AI Agent** using n8n and OpenAI! \ud83d\udcac\n\n\u2022 **4 Input Types**: Text, voice notes (Whisper transcription), images (GPT Vision), PDFs.\n\u2022 **Contextual Memory**: Remembers previous conversation turns.\n\u2022 **Dynamic Outputs**: Replies in text or audio voice messages.\n\nA single n8n workflow handles all modalities end-to-end.";

      // --- N8N / AUTOMATION ---
      } else if (lower.includes("n8n") || lower.includes("automation") || lower.includes("automate") || lower.includes("workflow")) {
        candidateText = "n8n is a core part of Anbu's automation toolkit! \u2699\ufe0f\n\n\u2022 **AI Voice Receptionist**: n8n + Retell AI for 24/7 call handling.\n\u2022 **WhatsApp AI Agent**: n8n orchestrates multi-modal AI responses.\n\u2022 **SEO Blog Agent**: n8n automates keyword research \u2192 article writing \u2192 WordPress publishing.\n\u2022 **Viral Hunter**: n8n + Apify scrapers for trending content discovery.\n\nAnbu automates entire business workflows end-to-end with n8n.";

      // --- SEO BLOG AGENT ---
      } else if (lower.includes("seo") || lower.includes("blog agent") || lower.includes("blog auto") || lower.includes("wordpress") || lower.includes("content auto")) {
        candidateText = "The **Automated SEO Blog Agent** writes and publishes articles daily! \ud83d\udcdd\n\n\u2022 Reads keywords from Google Sheets.\n\u2022 Runs **Perplexity Sonar** web research for verified data & sources.\n\u2022 Uses **ChatGPT** to write full articles with meta tags.\n\u2022 Auto-publishes to WordPress on schedule.\n\nFully hands-off SEO content pipeline.";

      // --- MISSED CALL TEXT-BACK ---
      } else if (lower.includes("missed call") || lower.includes("text-back") || lower.includes("text back") || lower.includes("sms")) {
        candidateText = "The **Missed Call Text-Back System** responds in under 5 seconds! \u23f0\n\n\u2022 Detects missed calls and sends personalized SMS replies instantly.\n\u2022 Includes booking links and lead capture.\n\u2022 Never lose a lead to a missed call again.";

      // --- REPUTATION / REVIEW MANAGEMENT ---
      } else if (lower.includes("review") || lower.includes("reputation") || lower.includes("google review") || lower.includes("5 star") || lower.includes("star rating")) {
        candidateText = "The **Reputation Management System** is a smart review routing engine! \u2b50\n\n\u2022 4-5 star ratings \u2192 directed to **Google Business Profile** for public reviews.\n\u2022 1-3 star ratings \u2192 routed to **private owner alerts** for damage control.\n\u2022 Automatically boosts your public rating while catching issues early.";

      // --- VIRAL HUNTER ---
      } else if (lower.includes("viral") || lower.includes("apify") || lower.includes("scraper") || lower.includes("trending")) {
        candidateText = "**Viral Hunter** discovers trending content weekly! \ud83d\udd25\n\n\u2022 Uses **Apify scrapers** and **n8n** to find trending niche hooks/scripts.\n\u2022 Exports repurposed content scripts to Google Sheets.\n\u2022 Keeps your content pipeline fresh with what's working right now.";

      // --- MOVIEDEX ---
      } else if (lower.includes("movie") || lower.includes("moviedex") || lower.includes("omdb")) {
        candidateText = "**MovieDex** is a React movie catalog app! \ud83c\udfac\n\n\u2022 Built with **React + OMDB API**.\n\u2022 Features debounced search for snappy performance.\n\u2022 LocalStorage favorites to save your picks.";

      // --- TODO JWT AUTH API ---
      } else if (lower.includes("todo") || lower.includes("jwt") || lower.includes("auth") || lower.includes("swagger")) {
        candidateText = "The **Todo Security API** is a production-grade backend! \ud83d\udd10\n\n\u2022 **Java Spring Boot 3** with Spring Security 6.\n\u2022 JWT authentication for secure API access.\n\u2022 PostgreSQL database with **Swagger UI** docs.\n\nA solid reference for enterprise-grade REST API architecture.";

      // --- URL SHORTENER ---
      } else if (lower.includes("url shortener") || lower.includes("url short") || lower.includes("redis") || lower.includes("shortener")) {
        candidateText = "The **Scalable URL Shortener** is built for high throughput! \ud83d\ude80\n\n\u2022 **Spring Boot** microservice with **Redis caching** (sub-5ms redirects).\n\u2022 MongoDB with TTL-based link expiration.\n\u2022 Docker containerized with **Nginx** reverse proxy.\n\nDesigned to handle scale with minimal latency.";

      // --- THRIVEN BLOG ---
      } else if (lower.includes("thriven") || lower.includes("blog") || lower.includes("cms") || lower.includes("admin console")) {
        candidateText = "**Thriven Blog** is Anbu's personal blog platform! \ud83d\udcbb\n\n\u2022 Built with **Next.js, Tailwind, MongoDB, Vercel Blob**.\n\u2022 Custom **/admin CMS console** with role-based auth & middleware.\n\u2022 Full content management system built from scratch.";

      // --- ALL PROJECTS / HOW MANY / BEST CREATED ---
      } else if (lower.includes("all project") || lower.includes("how many project") || lower.includes("list project") || lower.includes("show project") || lower.includes("project list") || lower.includes("your project") || lower.includes("his project") || lower.includes("portfolio") || lower.includes("best thing") || lower.includes("best created") || lower.includes("greatest project") || lower.includes("proudest")) {
        candidateText = "Anbu has **11 production projects** spanning Full-Stack, AI, and Automation: \ud83d\udcc2\n\n1. AI Voice Receptionist & Outbound Agent\n2. Ballz \u2014 Android Power Dialer & CRM\n3. Multi-Modal WhatsApp AI Agent\n4. Automated SEO Blog Agent\n5. Thriven Blog (Next.js CMS)\n6. Missed Call Text-Back System\n7. Reputation Management System\n8. Viral Hunter\n9. MovieDex\n10. Todo Security API\n11. Scalable URL Shortener\n\nCheck them all out on the Projects page!";

      // --- PRICING / COST / GUARANTEE ---
      } else if (lower.includes("guarantee") || lower.includes("offer") || lower.includes("price") || lower.includes("cost") || lower.includes("negotiat") || lower.includes("contract") || lower.includes("custom project") || lower.includes("how much") || lower.includes("rate") || lower.includes("budget") || lower.includes("quote")) {
        candidateText = "For custom project terms, guarantees, pricing, or specific business offers, reach out directly to Anbu via WhatsApp (+91 9361952703) or Email (anbuselvandzz@gmail.com) on the Connect page to discuss your project requirements. \ud83e\udd1d";

      // --- CONTACT INFO ---
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp number") || lower.includes("reach") || lower.includes("get in touch") || lower.includes("connect")) {
        candidateText = "You can reach Anbu through: \ud83d\udce7\n\n\u2022 **Email**: anbuselvandzz@gmail.com\n\u2022 **WhatsApp**: +91 9361952703\n\nOr just head to the Connect page to send a message directly!";

      // --- LOCATION ---
      } else if (lower.includes("where") || lower.includes("location") || lower.includes("based") || lower.includes("country") || lower.includes("india") || lower.includes("tamil nadu")) {
        candidateText = "Anbu is based in Kallakurichi, Tamil Nadu, India. \ud83c\uddee\ud83c\uddf3\n\nHe works with international clients across the UK and US remotely.";

      // --- EXPERIENCE / YEARS ---
      } else if (lower.includes("experience") || lower.includes("how long") || lower.includes("how many years") || lower.includes("senior") || lower.includes("junior") || lower.includes("level")) {
        candidateText = "Anbu is a self-taught developer who coded his 1st Android app at 19 and developed multiple applications by age 20. \ud83d\ude80\n\nHe currently builds production AI agents and full-stack web apps for international clients. His project portfolio speaks louder than any title.";

      // --- EDUCATION ---
      } else if (lower.includes("education") || lower.includes("college") || lower.includes("degree") || lower.includes("university") || lower.includes("school") || lower.includes("study") || lower.includes("qualification")) {
        candidateText = "Anbu is entirely self-taught! \ud83d\udcda\n\nHe taught himself how to use the internet, coding, and automation tools from scratch. No bootcamps, no hand-holding \u2014 just raw execution and building real projects.";

      // --- AVAILABILITY / FREELANCE ---
      } else if (lower.includes("available") || lower.includes("freelance") || lower.includes("full time") || lower.includes("full-time") || lower.includes("part time") || lower.includes("part-time") || lower.includes("open to work") || lower.includes("taking on")) {
        candidateText = "Anbu is currently open to working with serious business owners and founders on high-impact projects! \ud83d\udca1\n\nHead over to the Connect page to discuss your project and see if it's a strong fit.";

      // --- WHY SHOULDN'T I CHOOSE HIM ---
      } else if (lower.includes("why shouldn't") || lower.includes("why not to choose") || lower.includes("not choose")) {
        candidateText = "You shouldn't choose Anbu if you're looking for an agency that takes 6 months to ship an MVP, or if you want legacy stacks like PHP or jQuery. \ud83d\udeab\n\nHe moves fast and builds modern AI workflows and React/Next.js/Kotlin apps for founders who value speed and execution.";

      // --- HIRE / WHY WORK WITH ANBU ---
      } else if (lower.includes("hire") || lower.includes("why work") || lower.includes("why choose") || lower.includes("the best") || lower.includes("why anbu") || lower.includes("what makes")) {
        candidateText = "Here is why working with Anbu is the highest-leverage decision for your team: \u26a1\n\n\u2022 **Execution Mindset**: Inspired by Elon Musk's work ethic, Anbu cares about your success and delivers end-to-end.\n\u2022 **Target Clients**: SMBs, founders, and international clients (UK, US) looking to eliminate bottlenecks.\n\u2022 **Technical Superpower**: If you can imagine it and talk it out loud, Anbu can turn it into software or AI automation!\n\nInterested? The Connect page is the fastest way to get the ball rolling.";

      // --- SMB / CLIENTS / PEOPLE WORKED WITH ---
      } else if (lower.includes("smb") || lower.includes("client") || lower.includes("who does") || lower.includes("business owner") || lower.includes("founder") || lower.includes("who do you work") || lower.includes("people he worked with") || lower.includes("who he worked with") || lower.includes("people worked with")) {
        candidateText = "Anbu works primarily with Small to Medium-Sized Businesses (SMBs), business owners, founders, and international clients across the UK and US! \ud83d\ude80\n\n\u2022 **Core Focus**: Identifies operational bottlenecks and builds tailored Full-Stack & AI agent solutions that automate manual tasks and scale revenue.\n\nHead over to the Connect page to start a conversation with Anbu.";

      // --- BACKSTORY / PERSONAL ---
      } else if (lower.includes("story") || lower.includes("background") || lower.includes("village") || lower.includes("kallakurichi") || lower.includes("hobby") || lower.includes("hobbies") || lower.includes("cat") || lower.includes("scar") || lower.includes("elon") || lower.includes("musk") || lower.includes("personal") || lower.includes("fun fact")) {
        candidateText = "Looking at his projects, you might think Anbu was born with a compiler pre-installed! \ud83e\udd23\n\n\u2022 **Self-Taught Developer**: Anbu comes from a small town in Kallakurichi, Tamil Nadu, India. He taught himself how to use the internet, coding, and automation tools \u2014 coding his 1st Android app at 19, developing multiple applications by age 20, and now building cutting-edge AI applications!\n\u2022 **Work Ethic & Mindset**: Driven by inspiration from Elon Musk... and the non-negotiable daily mission to keep his pet cat Scar \ud83d\udc31 well-fed!";

      // --- PROCESS / HOW DO YOU WORK ---
      } else if (lower.includes("process") || lower.includes("how do you work") || lower.includes("timeline") || lower.includes("how long does") || lower.includes("delivery") || lower.includes("turnaround") || lower.includes("agile")) {
        candidateText = "Anbu's process is straightforward: \ud83c\udfaf\n\n1. **Understand** your bottleneck or idea.\n2. **Scope** the MVP with clear deliverables.\n3. **Build & ship** with rapid iteration.\n4. **Refine** based on feedback.\n\nFor specific timelines and project scoping, the Connect page is the best way to discuss details.";

      // --- RESUME / CV ---
      } else if (lower.includes("resume") || lower.includes("cv") || lower.includes("download")) {
        candidateText = "Anbu's portfolio website IS his resume! \ud83d\udcc4\n\nAll 11 projects with full tech details are on the Projects page. That's more informative than any PDF resume.";

      // --- THIS WEBSITE / HOW WAS THIS BUILT ---
      } else if (lower.includes("this website") || lower.includes("this site") || lower.includes("how was this") || lower.includes("built with") || lower.includes("this portfolio")) {
        candidateText = "This portfolio is built with: \ud83c\udfe0\n\n\u2022 **Next.js 16** (Turbopack) + TypeScript\n\u2022 **Tailwind CSS** for styling\n\u2022 **Framer Motion** for animations\n\u2022 **Gemini AI** for this chat assistant\n\u2022 **WebGL Fluid Simulation** for the interactive background\n\u2022 Deployed on **Vercel**";

      // --- AI / OPENAI / GPT ---
      } else if (lower.includes("openai") || lower.includes("gpt") || lower.includes("chatgpt") || lower.includes("artificial intelligence") || lower.includes("machine learning") || lower.includes("ai agent") || lower.includes("llm")) {
        candidateText = "Anbu works extensively with AI and LLMs! \ud83e\udde0\n\n\u2022 **OpenAI GPT**: Used in WhatsApp AI Agent and SEO Blog Agent.\n\u2022 **Whisper AI**: Voice-to-text transcription in the WhatsApp agent.\n\u2022 **GPT Vision**: Image analysis in the multi-modal WhatsApp agent.\n\u2022 **Retell AI**: Powers the AI Voice Receptionist.\n\u2022 **Gemini AI**: Powers this very chat assistant!\n\nAnbu builds practical AI agents that solve real business problems.";

      // --- TWILIO ---
      } else if (lower.includes("twilio") || lower.includes("voip") || lower.includes("call") || lower.includes("telephony")) {
        candidateText = "Anbu uses **Twilio** across multiple projects: \ud83d\udcde\n\n\u2022 **Ballz**: Twilio WebRTC VoIP SDK for power dialing.\n\u2022 **AI Receptionist**: Twilio integration for voice AI calls.\n\u2022 **Missed Call Text-Back**: Twilio SMS for instant responses.\n\nVoice, SMS, and VoIP \u2014 Anbu has hands-on Twilio experience across all channels.";

      // --- DATABASE / MONGODB / POSTGRESQL ---
      } else if (lower.includes("database") || lower.includes("mongodb") || lower.includes("postgresql") || lower.includes("postgres") || lower.includes("sql") || lower.includes("nosql")) {
        candidateText = "Anbu works with both SQL and NoSQL databases: \ud83d\uddc4\ufe0f\n\n\u2022 **PostgreSQL**: Used in the Todo Security API with Spring Boot.\n\u2022 **MongoDB**: Used in Thriven Blog and URL Shortener (with TTL expiration).\n\u2022 **Redis**: Caching layer in the URL Shortener (sub-5ms redirects).\n\u2022 **Room DB**: Local Android database in Ballz for offline-first data.";

      // --- DOCKER / DEVOPS ---
      } else if (lower.includes("docker") || lower.includes("devops") || lower.includes("deploy") || lower.includes("nginx") || lower.includes("vercel") || lower.includes("hosting") || lower.includes("ci/cd")) {
        candidateText = "Anbu handles deployment and DevOps: \ud83d\udc33\n\n\u2022 **Docker**: Containerized URL Shortener microservice.\n\u2022 **Nginx**: Reverse proxy for the URL Shortener.\n\u2022 **Vercel**: This portfolio and Thriven Blog are deployed on Vercel.\n\u2022 **Git**: Version control across all projects.";

      // --- HELP / WHAT CAN I ASK ---
      } else if (lower.includes("help") || lower.includes("what can i ask") || lower.includes("what can you do") || lower.includes("how does this work") || lower.includes("what is this")) {
        candidateText = "I'm Anbu's AI assistant! You can ask me about: \ud83e\udd16\n\n\u2022 Anbu's **projects** (AI receptionist, WhatsApp agent, Ballz, etc.)\n\u2022 His **tech stack** (React, Spring Boot, Kotlin, n8n, etc.)\n\u2022 **Services** he offers and who he works with.\n\u2022 His **backstory**, hobbies, and fun facts.\n\u2022 How to **connect** with Anbu for your project.\n\nJust ask away!";

      // --- GENERIC FALLBACK ---
      } else {
        candidateText = "The specific tech stack or app features don't matter if they don't get you results! \ud83d\udd25\n\nIt's better to contact Anbu directly to identify your bottlenecks and goals before building something. Head over to the Connect page to start a conversation and see how he can help improve your business output.";
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

