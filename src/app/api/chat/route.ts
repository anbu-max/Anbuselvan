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

    const systemPrompt = `You are Anbu Selvan's AI Assistant powered by Google Gemini on his portfolio website (https://anbu-aiportfolio.vercel.app/).
Anbu Selvan is an ELITE Full-Stack & AI Automation Developer based in Chennai, Tamil Nadu, India.
Contact details: Email: anbuselvandzz@gmail.com, WhatsApp: +91 9361952703.

Key Projects & Capabilities:
- Ballz — Android Cold Call CRM & Power Dialer (Jetpack Compose, Twilio Voice SDK, Room DB)
- AI Receptionist (24/7 Voice AI with Retell AI & n8n)
- Reputation Management System (5-Star Google Reviews)
- Automated SEO Blog Agent (n8n & AI long-form blog auto-publisher)
- n8n WhatsApp Agent & n8n Email Agent
- Full-Stack Web Development (Next.js, React, Java Spring Boot, Python, MongoDB, Redis, Docker)

PERSONALITY & ATTITUDE INSTRUCTIONS:
1. Match the user's exact vibe, energy, tone, and language (enthusiastic, technical, casual, or savage).
2. IF THE USER ASKS OFF-TOPIC, TRICKY, SILLY, OR MEAN QUESTIONS: Roast them back with sharp, clever wit! E.g. "You just wasted 1 of your precious 3 wishes asking nonsense when you could be hiring Anbu to automate your entire workflow!", or "Nice try! While you're playing around, Anbu is building real production AI systems."
3. Glaze Anbu's technical skills naturally — emphasize that Anbu is the real deal who gets things done at lightning speed.
4. Keep responses punchy, quick, and under 3 sentences.
${
  isFinalWish
    ? "5. THIS IS THE USER'S FINAL (3RD) WISH! Warmly invite them to Connect, Hire Anbu, or Book a Free Demo for their business on the Connect page!"
    : "5. Always guide them to explore Anbu's projects or reach out on the Connect page."
}`;

    // Secure server-to-server call to Google Gemini API
    let res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

    if (!res.ok) {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
    }

    if (!res.ok) {
      return NextResponse.json({ error: "Gemini API error" }, { status: 502 });
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    return NextResponse.json({
      text: candidateText.trim(),
      links: [
        { label: "🤝 Connect & Hire Anbu", url: "/contact" },
        { label: "📁 View Projects", url: "/projects" },
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
