import React from "react";
import { Smile, Briefcase, Layers, PartyPopper, Search, Code2, Sparkles, Info } from "lucide-react";

export interface ProjectItem {
  slug: string;
  title: string;
  desc: string;
  problem: string;
  action: string;
  result: string;
  github: string;
  tags: string[];
  impact: string;
  impactType: "impact" | "learned";
  image: string;
  images?: string[];
  whatItIs?: string;
  builtFor?: string;
  targetAudience?: string[];
  n8nNodes?: { name: string; type: string; purpose: string }[];
  techStackDetails?: { category: string; tool: string; usage: string }[];
  features?: { title: string; desc: string }[];
  benefits?: { title: string; desc: string }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "ai-receptionist",
    title: "AI Voice Receptionist & Outbound Site Visit Agent",
    desc: "Autonomous voice AI receptionist that handles 24/7 inbound property inquiries, answers FAQs, books site visits, and executes automated outbound calls to verify appointments.",
    problem: "Real estate agencies lose up to 40% of prospective home buyers due to unanswered after-hours calls, busy lines, or slow follow-ups. Manual phone calls for confirming site visits waste hours of agent time every day and suffer from high buyer no-show rates.",
    action: "Developed an end-to-end voice AI system integrating Retell AI (for ultra-low latency voice conversations) with n8n workflow automation. Built for a Real Estate Business, the system handles 24/7 inbound buyer inquiries, negotiates viewing times, books calendar slots, and triggers automated outbound verification calls prior to scheduled site visits.",
    result: "Achieved 100% inbound call coverage 24/7, eliminated hold times, boosted site visit confirmation rates by 35%, and saved real estate agents 20+ hours per week in repetitive manual phone calls.",
    github: "#",
    tags: ["Retell AI", "n8n Workflow", "Twilio Voice", "OpenAI GPT-4o", "Calendar API", "Webhooks"],
    impact: "24/7 Call Coverage & Verification",
    impactType: "impact" as const,
    image: "/Project images/AI receptioninst/outboundcall.png",
    builtFor: "Real Estate Business, Property Consultants & Brokerages",
    whatItIs: "An AI Voice Receptionist is an autonomous voice assistant powered by generative AI, Webhooks, and Voice WebRTC (Retell AI). It acts as a 24/7 human-like front-desk agent that answers inbound phone calls instantly, responds to complex client questions, checks real-time calendar availability, books property viewing appointments, and triggers automated outbound calls to confirm upcoming site visits.",
    targetAudience: [
      "Real Estate Brokers & Property Agents",
      "Property Developers & Sales Offices",
      "Appointment-Driven Local Businesses",
      "High-Volume Outbound & Inbound Sales Teams"
    ],
    techStackDetails: [
      { category: "Voice AI & WebRTC Engine", tool: "Retell AI", usage: "Ultra-low latency human-like conversational voice synthesis and real-time duplex speech processing." },
      { category: "Workflow Automation", tool: "n8n", usage: "Orchestrates API calls, webhook routing, calendar queries, and automated outbound call triggers." },
      { category: "Conversational Intelligence", tool: "OpenAI GPT-4o / Claude 3.5", usage: "Powers context-aware responses, intent extraction, and real estate knowledge retrieval." },
      { category: "Telephony & SMS", tool: "Twilio API", usage: "PSTN phone number routing, call state callbacks, and instant SMS confirmation dispatch." },
      { category: "Calendar & Database", tool: "Google Calendar & CRM API", usage: "Checks slot availability, locks in booked appointments, and records lead details." }
    ],
    n8nNodes: [
      { name: "Webhook Listener Node", type: "Trigger Node", purpose: "Receives real-time HTTP payload events from Retell AI when a call connects, transcribes, or ends." },
      { name: "Real Estate Knowledge Base Node", type: "AI Vector / Context", purpose: "Feeds dynamic property data (prices, floor plans, address, amenities) into the voice session." },
      { name: "Google Calendar Availability Node", type: "Integration Node", purpose: "Queries real-time calendar slots mid-conversation to present available viewing times to the caller." },
      { name: "Outbound Trigger Cron Node", type: "Scheduler Node", purpose: "Triggers automated outbound call requests to Retell AI 2 hours prior to scheduled site visits." },
      { name: "SMS & Lead Dispatch Node", type: "Twilio Node", purpose: "Sends instant SMS confirmation with site location directions to buyer and alerts the property agent." }
    ],
    features: [
      { title: "24/7 Inbound Voice Reception", desc: "Answers incoming buyer phone calls instantly with human speech nuances, zero hold times, and multi-language capability." },
      { title: "Property Knowledge FAQ Handling", desc: "Deeply knowledgeable on listing details, pricing, payment plans, square footage, HOA rules, and neighborhood amenities." },
      { title: "Live Calendar Booking", desc: "Negotiates convenient appointment dates live over the phone and schedules site visits directly into agent calendars." },
      { title: "Automated Outbound Site Visit Verification", desc: "Places automated verification calls prior to appointments to confirm client attendance or handle reschedules automatically." },
      { title: "Instant SMS & Agent Alert", desc: "Dispatches location PINs via SMS to buyers while sending lead summaries directly to the real estate agent." }
    ],
    benefits: [
      { title: "Zero Missed Leads", desc: "100% of after-hours calls and weekend inquiries are converted into qualified appointments." },
      { title: "35% Lower Site Visit No-Shows", desc: "Automated outbound verification calls ensure clients confirm before real estate agents travel to properties." },
      { title: "20+ Hours Weekly Saved", desc: "Eliminates repetitive manual phone tag and scheduling administrative overhead." }
    ]
  },
  {
    slug: "android-twilio-cold-calls",
    title: "Ballz Android Cold Call CRM & Power Dialer",
    desc: "Native Android application built with Jetpack Compose & Twilio Voice SDK featuring instant CSV prospect import, live contact & business name dialing display, pie/bar chart sales analytics, and Value Per Dial ($) tracking.",
    problem: "Outbound sales reps waste hours manually dialing phone numbers, switching between desktop spreadsheets and mobile phones, and lacking structured metrics to track call conversion bottlenecks.",
    action: "Built 'Ballz' — a 100% offline-first native Android power dialer application using Jetpack Compose (Material 3), Twilio WebRTC VoIP SDK, Room SQLite database, and automated CSV parser. The app dynamically displays the prospect's Contact Name and Business Name directly on the call screen during active dialing, eliminating the need to check external computers. Includes built-in analytical Pie Charts and Bar Charts to track call volume, pitch objection reasons, technical issues, and Value Per Dial ($).",
    result: "Accelerated dialing speed by 4x, eliminated desktop lookup friction by showing live business names during calls, and provided deep analytical insights via pie/bar charts to optimize rep conversion funnels.",
    github: "https://github.com/anbu-max",
    tags: ["Android (SDK 36)", "Jetpack Compose", "Kotlin 2.2", "Twilio Voice SDK", "Room DB", "Power Dialer"],
    impact: "Boosted Conversions",
    impactType: "impact" as const,
    image: "/Project images/Android power dialer/dashboard.jpeg",
    images: [
      "/Project images/Android power dialer/dashboard.jpeg",
      "/Project images/Android power dialer/xcel ,csv file upload.jpeg",
      "/Project images/Android power dialer/dashboard 2.jpeg",
      "/Project images/Android power dialer/power dialer with business name.jpeg",
      "/Project images/Android power dialer/numbers.jpeg",
      "/Project images/Android power dialer/themes setting.jpeg",
      "/Project images/Android power dialer/dash end.jpeg",
    ],
    builtFor: "Outbound Sales Reps, Telesales Teams & Real Estate Agents",
    whatItIs: "Ballz is a high-velocity native Android sales application designed to turn smartphones into dedicated power dialing stations. When dialing contacts imported from Excel/CSV lead files, Ballz displays the prospect's full Contact Name and Business Name right on the active call screen—eliminating phone-to-computer context switching. Built-in interactive Pie Charts and Bar Charts analyze call metrics, objection types, and revenue economics to track rep performance bottlenecks.",
    targetAudience: ["Outbound Sales Representatives", "Real Estate Agents & Brokers", "B2B SDRs & Telesales Teams", "Independent Business Owners"],
    techStackDetails: [
      { category: "Mobile UI Engine", tool: "Jetpack Compose (Material 3)", usage: "Declarative UI rendering with smooth animations and dynamic dark/light theme switching." },
      { category: "VoIP Telephony SDK", tool: "Twilio Voice SDK & Cellular Dual-Dialer", usage: "WebRTC high-definition voice calling with automatic Android SIM cellular fallback." },
      { category: "Database & Local Persistence", tool: "Room SQLite Database", usage: "100% offline-first local storage with automated CSV column parser and export." },
      { category: "Analytics & Charting Engine", tool: "Custom Compose Charts & MPAndroidChart", usage: "Renders pie charts, bar charts, call duration distributions, and conversion funnel breakdown." }
    ],
    features: [
      { title: "Live Contact & Business Name Display", desc: "Displays the prospect's full name and company/business name on screen during active calls, eliminating desktop spreadsheet lookups." },
      { title: "One-Tap Power Dialing Engine", desc: "Automatically dials the next lead in queue as soon as a call concludes, maximizing phone time." },
      { title: "Interactive Analytics (Pie & Bar Charts)", desc: "Visualizes call volume breakdown, technical issues, objection categorizations, and conversion percentages." },
      { title: "Value Per Dial ($) & Deal Tracking", desc: "Calculates revenue earned per dial and logs call outcomes (Interested, Callback, Closed Deal) in two taps." }
    ],
    benefits: [
      { title: "Zero Computer Lookup Friction", desc: "Sales reps see exact prospect names and business context directly on phone screens while dialing." },
      { title: "Data-Driven Sales Optimization", desc: "Pie and bar charts highlight call bottlenecks and technical vs sales objections to improve team pitch strategy." },
      { title: "4x Faster Contact Rate", desc: "Hands-free continuous dialing eliminates manual keying downtime." }
    ]
  },
  {
    slug: "whatsapp-agent",
    title: "Multimodal WhatsApp AI Agent (n8n & OpenAI)",
    desc: "AI-powered WhatsApp Agent built with n8n & OpenAI that understands and responds to text messages, voice notes, images, and PDFs with conversation memory in real time.",
    problem: "Customer communication is evolving, and businesses can no longer afford slow response times, missed inquiries, or disjointed messaging channels.",
    action: "Built a powerful AI-powered WhatsApp Agent using n8n, OpenAI, WhatsApp API, Voice Transcription, Image Analysis, and AI Memory. Every incoming WhatsApp message triggers an input router that categorizes the payload: text, voice notes (transcribed via Whisper), images (analyzed via OpenAI Vision), and PDFs (text extracted). All inputs feed into a single AI agent with conversation memory. An output router dynamically decides whether to send a text reply or synthesize a WhatsApp voice audio message.",
    result: "Eliminates repetitive manual support work 24/7 so teams can focus on high-value conversations, automating customer inquiries, lead qualification, and appointment booking.",
    github: "https://github.com/anbu-max",
    tags: ["n8n Workflow", "OpenAI GPT-4o", "WhatsApp API", "Voice Transcription", "AI Vision", "Conversation Memory"],
    impact: "24/7 Multimodal Support",
    impactType: "impact" as const,
    image: "/Project images/Whasapp automation/image.png",
    builtFor: "Customer Support Automation, Lead Qualification & Sales Assistance",
    whatItIs: "Built a Multi-Modal WhatsApp AI Agent using n8n & OpenAI. It handles text messages, transcribes voice notes automatically, analyzes user images, extracts PDF context, and maintains conversation memory for context-aware responses—responding in text or audio voice replies 24/7 without human intervention.",
    targetAudience: [
      "Customer Support & Success Teams",
      "Lead Qualification & Nurturing Teams",
      "E-Commerce & Local Service Businesses",
      "Sales Assistance & Internal Operations"
    ],
    n8nNodes: [
      { name: "WhatsApp Webhook Trigger Node", type: "Trigger Node", purpose: "Captures all incoming WhatsApp text, audio voice note, image, and PDF events in real-time." },
      { name: "Input Type Classifier Router Node", type: "Router Node", purpose: "Routes incoming message payload to transcription, AI image vision, or document extraction pipelines." },
      { name: "Whisper STT & GPT-4o Vision Processing Node", type: "AI Extraction Node", purpose: "Transcribes voice notes into text, analyzes image content, and extracts PDF text for the agent." },
      { name: "Conversational AI Memory Agent Node", type: "AI Agent Node", purpose: "Maintains chat memory across turns, evaluating user intent to handle inquiries, pricing, and bookings." },
      { name: "Output Format Router & Speech Synthesis Node", type: "Output Router Node", purpose: "Determines whether to return a text reply or synthesize a natural WhatsApp voice audio message." }
    ],
    techStackDetails: [
      { category: "Workflow Orchestration", tool: "n8n Workflow", usage: "Single workflow managing 4 input types (text, voice, image, PDF) and dual output formats (text, voice audio)." },
      { category: "Generative Intelligence", tool: "OpenAI GPT-4o & AI Vision", usage: "Powers multi-turn contextual conversation memory, image analysis, and intelligent reply drafting." },
      { category: "Voice Transcription & Synthesis", tool: "Whisper STT & Speech API", usage: "Transcribes incoming audio voice notes and generates natural voice audio replies." },
      { category: "Messaging Channel", tool: "WhatsApp API", usage: "Dispatches real-time text and audio voice messages directly to customer WhatsApp chats." }
    ],
    features: [
      { title: "Multimodal Input Processing (Text, Voice, Image, PDF)", desc: "Processes text messages, transcribes voice notes, analyzes photo attachments, and extracts PDF document context." },
      { title: "Persistent Conversation Memory", desc: "Maintains full conversation context across turns so user interactions feel natural and seamless." },
      { title: "Smart Dual-Output Routing (Text & Voice Audio)", desc: "Dynamically selects between sending a written text response or a synthesized WhatsApp audio message." },
      { title: "24/7 Autonomous Customer Support", desc: "Handles product inquiries, pricing explanations, lead qualification, and appointment booking around the clock." }
    ],
    benefits: [
      { title: "Eliminates Repetitive Work", desc: "Frees up human support and sales teams to focus on high-value closing conversations." },
      { title: "Instant 24/7 Response Time", desc: "Prevents missed inquiries and slow response delays across all media types on WhatsApp." }
    ]
  },
  {
    slug: "seo-blog-agent",
    title: "Automated SEO Blog Agent (n8n, Perplexity Sonar & ChatGPT)",
    desc: "Autonomous n8n content pipeline that reads keyword intent from Google Sheets, performs verified web research via Perplexity Sonar AI, uses ChatGPT to write articles & optimize meta tags, and auto-publishes daily via WordPress API.",
    problem: "Content marketing teams spend 15+ hours weekly manually searching topic ideas, conducting web research, writing drafts, optimizing meta tags & descriptions, and publishing blog posts.",
    action: "Built an automated n8n workflow pipeline. You simply plan the target keywords and search intent in a Google Sheet. n8n reads the sheet, uses Perplexity Sonar AI to conduct deep web research (extracting verified numbers, data, and reference websites), then uses ChatGPT to write structured blog posts, craft optimized meta tags and meta descriptions, and push the code directly to WordPress to automatically publish every day.",
    result: "Reduces 100% of manual writing and web research overhead, requiring only keyword planning while publishing daily high-authority WordPress posts.",
    github: "https://github.com/anbu-max",
    tags: ["n8n", "Perplexity Sonar AI", "ChatGPT (OpenAI)", "WordPress API", "Google Sheets API"],
    impact: "Daily WordPress Auto-Publishing",
    impactType: "impact" as const,
    image: "/Project images/SEO automation/SEO.png",
    builtFor: "Content Marketing Agencies, Blog Publishers & SEO Teams",
    whatItIs: "An automated SEO content generation pipeline built on n8n. The system takes target keywords and search intent specified in a Google Sheet, uses Perplexity Sonar AI to research real-time data, verified numbers, and web sources, then uses ChatGPT to write long-form blog posts, optimize meta tags & meta descriptions, and automatically publish out via WordPress REST API every day. All you have to do is plan the keywords and search intent.",
    targetAudience: [
      "Content Marketing Agencies & Copywriters",
      "Niche Blog Owners & Affiliate Publishers",
      "SEO Consultants & Digital Marketers",
      "E-commerce Brands & Corporate Blogs"
    ],
    n8nNodes: [
      { name: "Google Sheets Keyword & Intent Trigger Node", type: "Trigger Node", purpose: "Reads planned target keywords and search intent directly from Google Sheets." },
      { name: "Perplexity Sonar Web Research Node", type: "AI Research Node", purpose: "Executes deep web research to retrieve verified numbers, statistics, data points, and reference websites." },
      { name: "ChatGPT Blog Writer & Meta Tag Optimizer Node", type: "AI Writer Node", purpose: "Uses ChatGPT to write comprehensive blog posts and craft optimized meta tags & meta descriptions." },
      { name: "WordPress Direct Auto-Publisher Node", type: "CMS Node", purpose: "Automatically pushes formatted code and publishes blog posts directly to WordPress every day." }
    ],
    techStackDetails: [
      { category: "Workflow Orchestration", tool: "n8n", usage: "Automates the daily research, drafting, meta tag optimization, and WordPress publishing pipeline." },
      { category: "Deep Web Research AI", tool: "Perplexity Sonar AI", usage: "Gathers real-time verified numbers, data points, and reference websites from across the web." },
      { category: "Generative Copywriter & SEO", tool: "ChatGPT (OpenAI)", usage: "Writes full blog posts, meta tags, and meta descriptions grounded in Perplexity findings." },
      { category: "Input & Publishing Engine", tool: "Google Sheets API & WordPress REST API", usage: "Reads keyword intent inputs and automatically pushes code/posts live to WordPress daily." }
    ],
    features: [
      { title: "Google Sheets Keyword & Intent Planning", desc: "Reduces manual work to just entering target keywords and search intent in Google Sheets." },
      { title: "Perplexity Sonar Verified Web Research", desc: "Retrieves real-time numbers, data, and verified source websites for high authority content." },
      { title: "ChatGPT Copywriting & Meta Tag Optimization", desc: "Generates engaging long-form posts, meta titles, and meta descriptions automatically." },
      { title: "WordPress Daily Auto-Publishing", desc: "Pushes formatted posts and code directly to WordPress for automated daily publishing." }
    ],
    benefits: [
      { title: "Eliminates Manual Writing & Research", desc: "Saves 15+ hours weekly by automating web research, drafting, meta tag optimization, and publishing." },
      { title: "Verified Data & Authority", desc: "Perplexity research ensures every post contains verified numbers, statistics, and web citations." }
    ]
  },
  {
    slug: "thriven-blog",
    title: "Thriven Blog | Personal Digital Content Space",
    desc: "My personal blog platform built with Next.js, Tailwind CSS, and MongoDB. Includes a custom admin CMS system to publish posts, update images, titles, and body content without touching codebase.",
    problem: "Having to edit codebase markdown files or redeploy code whenever publishing personal thoughts or updating post media.",
    action: "Built my personal blog platform using Next.js (App Router), Tailwind CSS, and MongoDB Atlas. I built a full admin management system (/admin) where I can easily update cover images, headings, and body text directly through the UI without touching the codebase. Secured with role-based authentication and Next.js middleware.",
    result: "Instant publishing and dynamic content updates directly from the admin dashboard with zero manual code deployment.",
    github: "https://github.com/anbu-max/thriven-Blog",
    tags: ["Next.js (App Router)", "Tailwind CSS", "MongoDB Atlas", "Vercel Blob", "Role Auth", "Next Middleware"],
    impact: "Dynamic Admin CMS",
    impactType: "impact" as const,
    image: "/Project images/Thriven/image.png",
    builtFor: "Personal Thought Space & Engineering Articles",
    whatItIs: "THRIVEN is my personal blog where I share my thoughts, ideas, and technical learnings. Instead of manually editing markdown or code every time I write, I built an intuitive admin portal (/admin) that lets me create posts, edit titles, update pictures, and modify body text on the fly without technical knowledge.",
    targetAudience: [
      "Developers & Tech Enthusiasts",
      "Personal Blog Readers",
      "Content Creators"
    ],
    techStackDetails: [
      { category: "Frontend Framework", tool: "Next.js (App Router)", usage: "React Server Components and Client Components for fast page loading." },
      { category: "Design System & Styling", tool: "Tailwind CSS", usage: "Clean responsive layout and modern typography styles." },
      { category: "Database & Storage", tool: "MongoDB Atlas & Vercel Blob", usage: "Persistent database for articles and direct cloud asset storage." },
      { category: "Security & Access", tool: "Role-Based Auth & Middleware", usage: "Protects admin routes so only authorized users can upload content or modify posts." }
    ],
    features: [
      { title: "Custom Admin Management System (/admin)", desc: "Allows uploading files, updating pictures, headings, and body text directly through the admin UI without code edits." },
      { title: "Role-Based Authentication & Middleware", desc: "Secures admin endpoints and prevents unauthorized access to content management operations." },
      { title: "Personal Thoughts & Articles Platform", desc: "A clean, casual blogging space where I pour in my ideas, tech stacks used, and project walkthroughs." },
      { title: "Direct Cloud Asset Pipeline", desc: "Uploads cover images and project visuals directly to cloud storage with instant UI preview." }
    ],
    benefits: [
      { title: "Zero Code Edits for Content Updates", desc: "Update headings, pictures, and body tags seamlessly from any device without touching code." },
      { title: "Secure & Fast", desc: "Role-based authentication paired with Next.js middleware ensures instant, protected publishing." }
    ]
  },
  {
    slug: "missed-call-text-back",
    title: "Missed Call Text Back System",
    desc: "Instant automated SMS responses to missed business calls with lead capture & booking link dispatch.",
    problem: "Businesses lose 30-40% of prospective leads when callers hit voicemail or busy lines and immediately call competitors.",
    action: "Built an automated missed call recovery system integrating Twilio API and n8n. Whenever an inbound call is missed or unanswered, n8n instantly dispatches a personalized SMS back to the caller within 5 seconds with a calendar booking link and lead capture inquiry form.",
    result: "Captured 100% of missed call opportunities, converting missed callers into booked appointments instantly.",
    github: "#",
    tags: ["n8n Workflow", "Twilio SMS", "Webhooks", "Calendar API"],
    impact: "Zero Missed Leads",
    impactType: "impact" as const,
    image: "/Project images/Missed call text back/image.png",
    builtFor: "Local Service Businesses, Agencies & Medical Practices",
    whatItIs: "A Missed Call Text-Back system automatically detects when a client calls a business phone line and gets no answer. Within 5 seconds, it sends an automated SMS text message back to the caller to capture their inquiry, answer common questions, and schedule an appointment before they reach out to competitors.",
    targetAudience: [
      "Local Service Providers (Plumbers, HVAC, Electricians)",
      "Medical & Dental Practices",
      "Real Estate & Property Management",
      "Consultants & Professional Service Agencies"
    ],
    n8nNodes: [
      { name: "Twilio Missed Call Webhook Node", type: "Trigger Node", purpose: "Captures call status events (Busy, No-Answer, Cancelled) from Twilio PSTN line in real-time." },
      { name: "Lead Deduplication & CRM Lookup Node", type: "Data Node", purpose: "Checks CRM database to determine if caller is an existing client or new prospect." },
      { name: "Instant SMS Dispatcher Node", type: "Messaging Node", purpose: "Triggers personalized SMS reply with appointment booking link and short inquiry form." },
      { name: "CRM Lead Record Node", type: "CRM Node", purpose: "Creates a new lead entry with phone number, timestamp, and missed call log details." }
    ],
    techStackDetails: [
      { category: "Telephony Engine", tool: "Twilio Voice & SMS API", usage: "Detects missed calls and dispatches instant SMS text messages." },
      { category: "Workflow Orchestrator", tool: "n8n", usage: "Routes call events, formats SMS copy, and updates CRM records." },
      { category: "CRM Integration", tool: "Google Sheets / Webhook API", usage: "Logs missed calls and captures lead response data automatically." }
    ],
    features: [
      { title: "Instant SMS Response (Under 5 Seconds)", desc: "Sends an immediate SMS back to missed callers before they reach out to competitors." },
      { title: "Automated Calendar Booking Link", desc: "Includes direct booking link so prospects can schedule appointments immediately." },
      { title: "CRM Lead Auto-Logging", desc: "Automatically captures phone number, call time, and status into business records." }
    ],
    benefits: [
      { title: "Zero Lost Opportunities", desc: "Converts missed incoming calls into active text conversations instantly." },
      { title: "Higher Conversion Rate", desc: "Clients appreciate immediate text responses when staff cannot answer calls." }
    ]
  },
  {
    slug: "5-star-google-review",
    title: "Reputation Management & Review Filtering System",
    desc: "Automated reputation & review routing system that intelligently sends 4-5 star reviews to Google and captures 1-3 star feedback privately.",
    problem: "Businesses struggle to collect positive public Google reviews while preventing negative customer experiences from damaging public ratings.",
    action: "Built an intelligent automated workflow using n8n and WhatsApp API that gates review requests based on customer rating. 4-5 star happy clients are deep-linked to Google Business Profile, while 1-3 star ratings trigger private owner alerts.",
    result: "Increased 5-star Google reviews by 300% while capturing negative feedback privately before public posting.",
    github: "#",
    tags: ["n8n Workflow", "WhatsApp Business API", "Google Business API", "AI Rating Gate"],
    impact: "+300% 5-Star Reviews",
    impactType: "impact" as const,
    image: "/Project images/Reputation management/image.png",
    builtFor: "Local Service Businesses, Restaurants & Medical Clinics",
    whatItIs: "An automated customer feedback routing engine built on n8n and WhatsApp API. It prompts customers after a service, intelligently routing 4-5 star happy clients directly to Google Business Profile for public reviews while redirecting 1-3 star feedback to a private owner channel to resolve issues before public posting.",
    targetAudience: [
      "Local Service Businesses & Clinics",
      "Restaurants & Hospitality Venues",
      "Multi-Location Franchises",
      "Service Agencies"
    ],
    n8nNodes: [
      { name: "Post-Service Trigger Node", type: "Trigger Node", purpose: "Fires automatically when a customer completes an appointment or invoice in POS/CRM." },
      { name: "WhatsApp Review Dispatcher Node", type: "Messaging Node", purpose: "Sends interactive 1-5 star review request messages via WhatsApp Business API." },
      { name: "Rating Classifier & Router Node", type: "Logic Node", purpose: "Gates review paths: 4-5 stars route to Google Business link, 1-3 stars open private feedback form." },
      { name: "Private Alert Notification Node", type: "Alert Node", purpose: "Instantly alerts business owner via SMS/Email with private customer notes for quick resolution." }
    ],
    techStackDetails: [
      { category: "Workflow Automation", tool: "n8n", usage: "Orchestrates customer triggers, rating branch routing, and alert webhooks." },
      { category: "Messaging Channel", tool: "WhatsApp Business API", usage: "High open-rate interactive messaging to solicit customer ratings post-service." },
      { category: "Review Platform Integration", tool: "Google Business Profile API", usage: "Direct deep-linking to Google review dialogs for 5-star raters." }
    ],
    features: [
      { title: "Smart Rating Branch Routing", desc: "4-5 star ratings are directed to public Google reviews; 1-3 star ratings are captured privately." },
      { title: "Instant Private Escalation Alerts", desc: "Notifies store manager immediately so unhappy customers are contacted before posting online." },
      { title: "Automated Post-Service Triggers", desc: "Triggers seamlessly upon POS transaction or CRM appointment completion." }
    ],
    benefits: [
      { title: "300% Boost in 5-Star Reviews", desc: "Drives satisfied customers directly to Google Business Profile, lifting local SEO search rank." },
      { title: "Protection Against Bad Public Reviews", desc: "Catches negative customer experiences privately so managers can resolve issues proactively." }
    ]
  },
  {
    slug: "viral-hunter",
    title: "Viral Hunter Social Media Hook & Trend Intelligence",
    desc: "AI-powered social media trend scanner & hook generator using Apify and n8n to automatically curate top viral content, extract hooks, and output repurposed video scripts directly into Google Sheets.",
    problem: "Content creators waste 2 to 4 hours every day scrolling social feeds trying to find trending hooks and high-retention video ideas in their niche.",
    action: "Developed Viral Hunter — an automated content intelligence tool using Apify scrapers, n8n workflows, and OpenAI GPT-4o. It scans niche content across social feeds daily, identifies why videos went viral over the past week, extracts opening hooks and scripts, and exports them to Google Sheets—complete with a repurposed format tailored for your niche.",
    result: "Saves 2 to 4 hours of daily manual scrolling by auto-curating viral hooks and generating repurposed scripts directly in Google Sheets.",
    github: "https://github.com/anbu-max",
    tags: ["Apify API", "n8n Workflow", "OpenAI GPT-4o", "Google Sheets API", "Trend Analytics"],
    impact: "Automated Daily Research",
    impactType: "impact" as const,
    image: "/Project images/Viral hunter/image.png",
    builtFor: "Content Creators, Social Media Managers & Niche Publishers",
    whatItIs: "Viral Hunter is an automated content research assistant. Instead of spending 2–4 hours scrolling social feeds every day trying to find what's going viral, Viral Hunter uses Apify and n8n to automatically scrape top niche videos, analyze why they performed over the last week, extract the 3-second hooks and scripts, and write repurposed versions straight into a Google Sheet for your niche.",
    targetAudience: [
      "Short-Form Video Creators (TikTok / Reels / Shorts)",
      "Social Media Growth Managers",
      "Niche Content Publishers"
    ],
    n8nNodes: [
      { name: "Apify Social Feed Trigger Node", type: "Trigger Node", purpose: "Triggers daily web scrapers via Apify API to fetch trending niche videos." },
      { name: "Viral Hook & Engagement Analyzer Node", type: "AI Node", purpose: "Analyzes why content went viral over the past week and extracts opening 3-second visual & audio hooks." },
      { name: "GPT-4o Repurposed Script Generator Node", type: "AI Chain", purpose: "Generates updated, niche-customized video scripts and hook variations." },
      { name: "Google Sheets Export Node", type: "Integration Node", purpose: "Exports curated viral hooks, original transcripts, and repurposed scripts into Google Sheets." }
    ],
    techStackDetails: [
      { category: "Trend Scraping Engine", tool: "Apify API", usage: "Scrapes trending niche video performance, view counts, and engagement velocity." },
      { category: "Workflow Orchestrator", tool: "n8n Workflow", usage: "Automates daily scraping schedules, AI analysis, and Google Sheets exports." },
      { category: "AI Script Generator", tool: "OpenAI GPT-4o", usage: "Transforms viral hook patterns into updated, repurposed short-form scripts." },
      { category: "Output & Storage", tool: "Google Sheets API", usage: "Stores daily viral digests, original hooks, and repurposed scripts for quick creator access." }
    ],
    features: [
      { title: "Automated Apify Niche Scraper", desc: "Scrapes top-performing videos in your niche daily without manual feed scrolling." },
      { title: "Weekly Viral Analysis & Hook Extraction", desc: "Analyzes why content went viral over the past week and extracts high-retention 3-second hooks." },
      { title: "Direct Google Sheets Export", desc: "Organizes hooks, transcripts, and metadata cleanly in Google Sheets." },
      { title: "Repurposed Script Format", desc: "Provides updated script versions customized specifically for your niche branding." }
    ],
    benefits: [
      { title: "Saves 2–4 Hours Daily", desc: "Eliminates endless scrolling by delivering ready-to-use viral hooks and scripts directly to Google Sheets." },
      { title: "Proven Viral Hooks", desc: "Builds video scripts on verified, high-retention opening hooks for maximum engagement." }
    ]
  },
  {
    slug: "moviedex",
    title: "MovieDex React Movie Catalog & Discovery Engine",
    desc: "Responsive movie discovery application built with React, OMDB REST API, live search debouncing, genre filtering, and local-storage favorites persistence.",
    problem: "Movie lovers need a fast, distraction-free movie search application to explore upcoming releases, read plot summaries, inspect IMDb ratings, and bookmark favorite films without cluttered ads.",
    action: "Engineered MovieDex using React, CSS Modules, and OMDB REST API. Implemented real-time search query debouncing to reduce API requests, dynamic modal view for cast and rating details, and persistent browser LocalStorage for bookmarking favorite movies offline.",
    result: "Delivered an instantaneous, responsive film catalog with 0ms local bookmarks retrieval and sub-300ms live search API responses.",
    github: "https://github.com/anbu-max/Moviedex",
    tags: ["React", "OMDB API", "CSS Modules", "LocalStorage API", "Debounce Search"],
    impact: "Learned React & API Integration",
    impactType: "learned" as const,
    image: "/img/projects/moviedex.png",
    builtFor: "Movie Enthusiasts & Film Collectors",
    whatItIs: "MovieDex is a lightweight, responsive web application for discovering movies, checking IMDb ratings, viewing plot synopses, and curating a personal watchlist saved directly in your browser.",
    targetAudience: [
      "Cinephiles & Movie Lovers",
      "Casual Viewers & Watchlist Curators",
      "Frontend Web Developers"
    ],
    techStackDetails: [
      { category: "Frontend Engine", tool: "React", usage: "Component-driven state management with dynamic routing and modal popups." },
      { category: "API Integration", tool: "OMDB REST API", usage: "Fetches live movie metadata, poster imagery, release dates, and IMDb rating scores." },
      { category: "Persistence & Styling", tool: "LocalStorage & CSS Modules", usage: "Stores user's saved favorite movies offline with custom responsive CSS layouts." }
    ],
    features: [
      { title: "Real-Time Movie Search & Debouncing", desc: "Instantly searches millions of films with debounced API requests to optimize network speed." },
      { title: "Offline Watchlist & Favorites", desc: "Saves bookmarked movies into LocalStorage for instant access without backend server login." },
      { title: "Rich Film Metadata & IMDb Ratings", desc: "Displays plot synopses, release years, directors, starring cast, and official IMDb scores." }
    ],
    benefits: [
      { title: "Instantaneous Search", desc: "Debounced API queries deliver ultra-fast movie poster and rating results." },
      { title: "Zero Authentication Needed", desc: "Saves favorite movies straight to browser storage for instant retrieval anytime." }
    ]
  },
  {
    slug: "todo-jwt-auth",
    title: "Todo Security API Spring Boot, JWT & Swagger Docs",
    desc: "Enterprise full-stack task management system built with Java Spring Boot, Spring Security, JSON Web Token (JWT) authentication, PostgreSQL DB, and interactive Swagger UI.",
    problem: "Web applications require robust role-based access control (RBAC), secure stateless session management, and self-documenting REST endpoints to prevent unauthorized data access.",
    action: "Developed a production-grade backend API using Java Spring Boot 3, Spring Security 6, and JWT authentication tokens. Built stateless token-based authorization filters, BCrypt password hashing, pagination for task lists, PostgreSQL Mapped Entities via JPA/Hibernate, and integrated Swagger OpenAPI UI for interactive endpoint testing.",
    result: "Achieved 100% test coverage for authentication filters, zero security vulnerabilities, and comprehensive OpenAPI documentation for frontend integration.",
    github: "https://github.com/anbu-max/TodoJwtAuth",
    tags: ["Spring Boot", "Spring Security", "JWT Auth", "PostgreSQL", "Swagger UI", "BCrypt"],
    impact: "Learned Auth & Security Patterns",
    impactType: "learned" as const,
    image: "/img/projects/todo.png",
    builtFor: "Enterprise Developers & Security Engineers",
    whatItIs: "Todo Security API is a full-stack backend application demonstrating production-grade security architecture. It handles user registration, secure login via JWT tokens, role-based task management, pagination, and automated Swagger API documentation.",
    targetAudience: [
      "Backend Java Developers",
      "Security Engineers",
      "Full-Stack Software Architects"
    ],
    techStackDetails: [
      { category: "Backend Framework", tool: "Java & Spring Boot", usage: "Enterprise REST API backend architecture with JPA/Hibernate data layer." },
      { category: "Security & Authentication", tool: "Spring Security & JWT", usage: "Stateless JSON Web Token authentication filters with BCrypt password hashing." },
      { category: "Database & Documentation", tool: "PostgreSQL & Swagger UI", usage: "Relational persistence with interactive OpenAPI endpoint testing interface." }
    ],
    features: [
      { title: "Stateless JWT Authentication", desc: "Issues secure JSON Web Tokens upon authentication for stateless API request authorization." },
      { title: "Role-Based Access Control (RBAC)", desc: "Enforces strict permissions between standard users and system administrators." },
      { title: "Swagger OpenAPI Documentation", desc: "Interactive Swagger UI for live testing of authentication, task creation, and pagination endpoints." }
    ],
    benefits: [
      { title: "Production-Grade Security", desc: "Protects API endpoints with robust JWT verification and BCrypt password encryption." },
      { title: "Self-Documenting REST API", desc: "Swagger OpenAPI UI makes integration seamless for frontend developers." }
    ]
  },
  {
    slug: "url-shortener",
    title: "Scalable URL Shortener Spring Boot, Redis & Docker",
    desc: "High-throughput link shortener microservice engineered with Spring Boot, Redis caching, MongoDB TTL indices, Docker containerization & Nginx reverse proxy.",
    problem: "Long, ugly URLs degrade click-through rates on social media and lack caching layers to handle sudden high-volume redirect traffic spikes.",
    action: "Built a high-performance URL shortener microservice using Spring Boot, Redis (for ultra-fast sub-5ms URL redirects), MongoDB (for persistent TTL link expiration), Docker Compose multi-container orchestration, and Nginx reverse proxy rate-limiting.",
    result: "Handled 10,000+ redirects/sec with sub-5ms Redis cache responses and automated TTL link expiration.",
    github: "https://github.com/anbu-max/URLs-Simplifier",
    tags: ["Spring Boot", "Redis Cache", "MongoDB TTL", "Docker Compose", "Nginx Proxy"],
    impact: "Learned Caching & Containerization",
    impactType: "learned" as const,
    image: "/img/projects/url.png",
    builtFor: "Digital Marketers, Agencies & High-Traffic Web Apps",
    whatItIs: "A production-ready URL shortener microservice designed to transform long web links into compact, trackable short URLs. Powered by Redis caching for instant redirects and MongoDB TTL for automatic link expiration.",
    targetAudience: [
      "Digital Marketers & Growth Hackers",
      "DevOps Engineers",
      "High-Traffic Web Platforms"
    ],
    techStackDetails: [
      { category: "Microservice Framework", tool: "Java & Spring Boot", usage: "Core REST controller logic for link generation, hash collisions, and redirects." },
      { category: "Caching Layer", tool: "Redis", usage: "Sub-5ms in-memory key-value cache for high-frequency URL redirects." },
      { category: "Persistence & Infrastructure", tool: "MongoDB, Docker & Nginx", usage: "MongoDB TTL indices for link expiration, Docker container orchestration, and Nginx proxy." }
    ],
    features: [
      { title: "Sub-5ms Redis In-Memory Redirects", desc: "Caches active short codes in Redis for instant high-concurrency redirection." },
      { title: "MongoDB TTL Link Expiration", desc: "Automates short URL cleanup using native MongoDB Time-To-Live (TTL) index policies." },
      { title: "Docker & Nginx Reverse Proxy Containerization", desc: "Fully containerized stack ready for one-command deployment via Docker Compose." }
    ],
    benefits: [
      { title: "High-Concurrency Performance", desc: "Handles traffic spikes effortless with Redis in-memory caching." },
      { title: "Zero Maintenance Link Expiration", desc: "Automatic MongoDB TTL cleans up stale links without scheduled cron jobs." }
    ]
  }
];

import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiSpringboot, SiPostgresql, SiGithub, SiPostman, SiTwilio, SiN8N, SiMongodb, SiRedis, SiDocker, SiPython } from "react-icons/si";
import { FaJava, FaGitAlt } from "react-icons/fa";
import { TbApi, TbMessage2, TbUsers, TbBulb, TbAdjustments } from "react-icons/tb";

export const SKILL_GROUPS = [
  { label: "Frontend", icon: <Code2 size={14} />, items: [
    { name: "React", icon: <SiReact size={18} color="#61DAFB" /> },
    { name: "Next.js", icon: <SiNextdotjs size={18} color="#111111" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={18} color="#06B6D4" /> },
    { name: "JavaScript", icon: <SiJavascript size={18} color="#F7DF1E" /> },
    { name: "HTML5", icon: <SiHtml5 size={18} color="#E34F26" /> },
    { name: "CSS3", icon: <SiCss3 size={18} color="#1572B6" /> }
  ]},
  { label: "Backend & DB", icon: <Code2 size={14} />, items: [
    { name: "Java", icon: <FaJava size={18} color="#007396" /> },
    { name: "Spring Boot", icon: <SiSpringboot size={18} color="#6DB33F" /> },
    { name: "Python", icon: <SiPython size={18} color="#3776AB" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={18} color="#336791" /> },
    { name: "MongoDB", icon: <SiMongodb size={18} color="#47A248" /> },
    { name: "Redis", icon: <SiRedis size={18} color="#DC382D" /> },
    { name: "Docker", icon: <SiDocker size={18} color="#2496ED" /> },
    { name: "Git", icon: <FaGitAlt size={18} color="#F05032" /> },
    { name: "GitHub", icon: <SiGithub size={18} color="#181717" /> }
  ]},
  { label: "Automation & AI Tools", icon: <Sparkles size={14} />, items: [
    { name: "n8n", icon: <SiN8N size={18} color="#EA4B71" /> },
    { name: "Twilio", icon: <SiTwilio size={18} color="#F22F46" /> },
    { name: "Postman", icon: <SiPostman size={18} color="#FF6C37" /> },
    { name: "REST APIs", icon: <TbApi size={18} color="#0284c7" /> }
  ]},
  { label: "Soft Skills", icon: <Info size={14} />, items: [
    { name: "Problem-Solving", icon: <TbBulb size={18} color="#eab308" /> },
    { name: "Communication", icon: <TbMessage2 size={18} color="#3b82f6" /> },
    { name: "Teamwork", icon: <TbUsers size={18} color="#10b981" /> },
    { name: "Adaptability", icon: <TbAdjustments size={18} color="#8b5cf6" /> }
  ]},
];

export const TABS = [
  { key: "me", label: "Me", icon: <Smile size={22} />, color: "#22c55e", path: "/me" },
  { key: "skills", label: "Skills", icon: <Layers size={22} />, color: "#a855f7", path: "/skills" },
  { key: "projects", label: "Projects", icon: <Briefcase size={22} />, color: "#16a34a", path: "/projects" },
  { key: "fun", label: "Fun", icon: <PartyPopper size={22} />, color: "#ec4899", path: "/fun" },
  { key: "contact", label: "Connect", icon: <Search size={22} />, color: "#f59e0b", path: "/contact" },
];

export const Tag = ({ t, icon }: { t: string, icon?: React.ReactNode }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "rgba(17, 17, 17, 0.05)", border: "1px solid rgba(17, 17, 17, 0.1)", backdropFilter: "blur(8px)", color: "#111", fontSize: 13, fontWeight: 600 }}>
    {icon && <span style={{ opacity: 0.9 }}>{icon}</span>}
    {t}
  </span>
);
