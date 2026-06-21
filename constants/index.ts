import ASSETS from "@/utils/assets";

export const PROFILE = {
  name: "Nesredin Getahun",
  handle: "Nesru Codex",
  roles: ["Frontend", "Backend", "Mobile", "Automation", "AI"] as const,
  tagline:
    "I build production software end-to-end, interfaces people enjoy, APIs that hold up under load, mobile apps, AI-powered features, and the automation that ties it all together.",
  location: "Addis Ababa, Ethiopia",
  email: "nesrucodex01@gmail.com",
  phone: "+251 962 875 515",
  github: "https://github.com/nesrucodex",
  linkedin: "https://www.linkedin.com/in/nesru-codex-530a372b5",
  availability: "Open to freelance & full-time roles",
  resume: "/Nesredin-Getahun-Resume.pdf",
  resumeFile: "Nesredin-Getahun-Resume.pdf",
};

export const STATS = [
  { value: "3+", label: "Years shipping", sub: "since 2023" },
  { value: "3.93", label: "BSc GPA", sub: "Software Eng, AASTU" },
  { value: "89%", label: "National exit exam", sub: "2025" },
  { value: "5", label: "Disciplines", sub: "FE · BE · Mobile · Automation · AI" },
];

export type Discipline = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  stack: string[];
  proof: string;
};

export const DISCIPLINES: Discipline[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend",
    blurb:
      "Accessible, fast, characterful interfaces. Component architecture, state, motion and performance, not just screens that render.",
    stack: ["React", "Next.js", "Preact", "TypeScript", "Tailwind", "Framer Motion"],
    proof: "Built the Next.js frontends for EaseTenant, SoundRig & Shengo.",
  },
  {
    id: "backend",
    index: "02",
    title: "Backend",
    blurb:
      "Secure, scalable APIs and data layers. Auth, real-time, payments and blockchain workflows from wallet to signed transaction.",
    stack: ["Node.js", "Bun", "Hono", "Nest.js", "Express", "Go (Golang)", "PostgreSQL", "Redis", "GraphQL"],
    proof: "Shipped custodial Cardano/TON wallets & real-time APIs at Endubis.",
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile",
    blurb:
      "Cross-platform apps and chat-native experiences, from React Native builds to Telegram bot interfaces real users transact on.",
    stack: ["React Native", "Expo", "Telegram Bot API", "Push / Realtime"],
    proof: "Cardano wallet delivered as a Telegram bot for the Ethiopian market.",
  },
  {
    id: "automation",
    index: "04",
    title: "Automation",
    blurb:
      "Pipelines that remove manual work, document signing, OCR training, PDF generation and CI/CD wired through Go subprocesses.",
    stack: ["Go", "Docker", "GitHub Actions", "CI/CD", "BullMQ / queues", "Cron jobs", "Puppeteer", "Bash scripting", "PDF tooling", "OCR", "Webhooks"],
    proof: "Engineered PDF/OCR + signing automation at TaptoSign.",
  },
  {
    id: "ai",
    index: "05",
    title: "AI",
    blurb:
      "Applied AI in real products, LLM integration, document AI & OCR, retrieval, and the data annotation / model-evaluation work that keeps outputs trustworthy.",
    stack: [
      "LLM integration",
      "Prompt engineering",
      "OCR / Document AI",
      "RAG",
      "Data annotation",
      "Python",
    ],
    proof: "Built OCR/document-AI training workflows; expert data annotator.",
  },
];

export const STACK_GROUPS = [
  {
    label: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Preact", "TailwindCSS", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Bun", "Express", "Hono", "Nest.js", "Go (Golang)", "GraphQL", "REST"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Mongoose", "Redis"],
  },
  {
    label: "Mobile & Realtime",
    items: ["React Native", "Expo", "Socket.io", "Pusher", "Telegram Bot API"],
  },
  {
    label: "Automation & Tooling",
    items: ["Docker", "GitHub Actions", "CI/CD", "BullMQ / queues", "Cron jobs", "Puppeteer", "Bash scripting", "PDF manipulation", "OCR tools", "Webhooks", "Git", "Blockfrost / Lucid"],
  },
  {
    label: "AI & Data",
    items: ["LLM integration", "Prompt engineering", "OCR / Document AI", "RAG", "Data annotation & evaluation", "Python"],
  },
];

export type Repo = {
  name: string;
  desc: string;
  lang: string;
  href: string;
};

// Curated public repositories worth a look (beyond the featured projects above)
export const REPOS: Repo[] = [
  { name: "etho-711", desc: "Community / utility platform", lang: "TypeScript", href: "https://github.com/nesrucodex/etho-711" },
  { name: "petCare", desc: "Pet care app, Next.js, Prisma, Postgres", lang: "TypeScript", href: "https://github.com/nesrucodex/petCare" },
  { name: "fetena", desc: "Create, explore & buy questions across categories", lang: "JavaScript", href: "https://github.com/nesrucodex/fetena" },
  { name: "nestjs-best-practices", desc: "Reference patterns for scalable Nest.js APIs", lang: "TypeScript", href: "https://github.com/nesrucodex/nestjs-best-practices" },
  { name: "go_td", desc: "Go experiments & tooling", lang: "Go", href: "https://github.com/nesrucodex/go_td" },
  { name: "graphql-ws", desc: "GraphQL over WebSocket exploration", lang: "TypeScript", href: "https://github.com/nesrucodex/graphql-ws" },
  { name: "advanced-searching-algorithms", desc: "AI search algorithms in Python", lang: "Python", href: "https://github.com/nesrucodex/advanced-searching-algorithms" },
  { name: "aora-rn", desc: "React Native (Expo) mobile app", lang: "TypeScript", href: "https://github.com/nesrucodex/aora-rn" },
];

export const EXPERIENCE = [
  {
    company: "Endubis",
    role: "Full Stack Developer",
    period: "May 2023 to Present",
    location: "Addis Ababa",
    notes: [
      "Built & deployed web apps with Next.js and Node.js across the full stack.",
      "Developed custodial wallets for Cardano & TON, creation, transactions, vote delegation, staking.",
      "Integrated Blockfrost & Lucid for Cardano; built secure end-to-end auth.",
    ],
  },
  {
    company: "TaptoSign",
    role: "Fullstack Developer",
    period: "Apr 2025 to Jun 2025",
    location: "Remote · USA",
    notes: [
      "Built full-stack features with Preact + Go (Golang) backend services.",
      "Engineered PDF manipulation via compiled pdf-lib through Go subprocesses.",
      "Implemented document signing, OCR training workflows and Redis caching.",
    ],
  },
  {
    company: "GDSC · AASTU",
    role: "React Mentor & Team Lead",
    period: "Jan 2023 to Jun 2024",
    location: "Addis Ababa",
    notes: [
      "Mentored developers building React apps; ran workshops & code reviews.",
      "Guided teams on architecture, state management and UI/UX.",
    ],
  },
];

export type Project = {
  id: number;
  title: string;
  year: string;
  role: string;
  tags: string[];
  description: string;
  image: string;
  fit?: "cover" | "contain";
  gallery?: string[];
  techStack: string[];
  link?: string;
  github?: string;
  docs?: string;
  note?: string;
  longDescription: string;
  features: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 5,
    title: "Aatma · Transit Admin",
    year: "2025",
    role: "Backend Architect",
    tags: ["Backend", "Platform", "Fintech"],
    description:
      "Architected the backend for a city-scale transit platform, 15+ domain modules (vehicles, terminals, routing, wallet, payroll, payment distribution) behind a versioned, OpenAPI-documented REST API.",
    image: ASSETS.IMAGES.AATMA,
    gallery: [ASSETS.IMAGES.AATMA_DOCS],
    techStack: ["TypeScript", "Nest.js", "PostgreSQL", "Prisma", "REST", "JWT"],
    docs: "https://aatmabackend.etpay.et/docs",
    longDescription:
      "Aatma is a transit administration platform for managing taxi and terminal operations end-to-end. I worked on the backend, a broad, versioned REST API (OpenAPI 3) covering auth, users, vehicles, terminals, routes, terminal operations, transactions, analytics, route optimization and a financial layer (wallet, salary, payment distribution). The admin dashboard lets operators track taxis, monitor operators and optimize terminal operations in one place.",
    features: [
      "Comprehensive OpenAPI 3 documented REST API",
      "Vehicles, terminals, routes & terminal operations",
      "Transactions, wallet, salary & payment distribution",
      "Route optimization & analytics",
      "Role-based auth with JWT",
      "Emergency request handling",
    ],
  },
  {
    id: 0,
    title: "EaseTenant",
    year: "2024",
    role: "Backend Lead · Realtime",
    tags: ["Backend", "Realtime", "Proptech"],
    description:
      "Owned the backend for a commercial property platform, real-time messaging, full lease lifecycle and a service marketplace on a Node + WebSocket core.",
    image: ASSETS.IMAGES.EASETENANT,
    techStack: ["TypeScript", "Next.js", "Express.js", "Prisma", "Zod", "WebSocket"],
    link: "https://ease-tenant.pro.et",
    github: "https://github.com/nesrucodex/ease-tenant",
    longDescription:
      "A modern, secure commercial building management system for property owners and tenants. I led backend development, API endpoints, real-time communication and lease workflows, delivering a seamless experience for both tenants and property managers.",
    features: [
      "Real-time tenant-to-manager & tenant-to-tenant chat",
      "Service marketplace for property-related offers",
      "Maintenance request creation, tracking & status updates",
      "Full lease management with digital contracts & renewals",
      "Node.js + Express + WebSocket backend",
    ],
  },
  {
    id: 1,
    title: "Endubis Wallet",
    year: "2023",
    role: "Backend · Blockchain",
    tags: ["Blockchain", "Backend", "Fintech"],
    description:
      "Built custodial Cardano & TON wallets, on-chain transactions, staking and vote delegation, delivered to users through a Telegram-native experience.",
    image: ASSETS.IMAGES.ENDUBIS_V2,
    fit: "contain",
    techStack: ["TypeScript", "Express.js", "Cardano API", "Blockfrost", "Lucid", "Prisma"],
    link: "https://t.me/EndubisTestWalletBot",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A user-friendly Cardano wallet integrated into Telegram, tailored for Ethiopia. I built backend Cardano integrations, Telegram command handlers and transaction flows for a smooth in-chat experience, balance checks, transfers, staking and vote delegation.",
    features: [
      "Secure ADA asset management via Telegram bot",
      "Cardano blockchain integration (Blockfrost + Lucid)",
      "Intuitive chat commands for wallet operations",
      "Balance checks & transaction initiation",
      "Localized for the Ethiopian crypto community",
    ],
  },
  {
    id: 2,
    title: "Shengo",
    year: "2024",
    role: "Full-Stack Owner",
    tags: ["Full-Stack", "Automation", "Legaltech"],
    description:
      "Shipped an end-to-end contract-automation platform, templated generation, secure e-signing and role-based access across many deal types.",
    image: ASSETS.IMAGES.SHENGO,
    techStack: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Zod", "React Query"],
    link: "https://shengo.vercel.app",
    github: "https://github.com/nesrucodex/shengo",
    longDescription:
      "A web app that automates contract creation and management across transaction types. Shengo replaces manual drafting with customizable templates and secure digital signing, so users can generate, review and manage agreements online, cutting paperwork and speeding up deals.",
    features: [
      "Automated contract generation for many transaction types",
      "Customizable contract templates",
      "Secure digital signing",
      "Contract history & status tracking",
      "Auth with role-based access",
    ],
  },
  {
    id: 3,
    title: "SoundRig",
    year: "2024",
    role: "Frontend Engineer",
    tags: ["Frontend", "Product"],
    description:
      "Engineered a performant music-streaming UI, album builder, curated playlists and offline playback in a responsive Next.js app.",
    image: ASSETS.IMAGES.SOUNDRIG,
    techStack: ["TypeScript", "Next.js", "Mantine", "Tailwind"],
    link: "https://soundrig-artist-app.vercel.app",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A dynamic music streaming platform built with Next.js and TypeScript for seamless discovery, sharing and streaming. SoundRig delivers personalized playlists, offline listening and social sharing in a responsive, performance-focused UI.",
    features: [
      "Personalized playlists & recommendations",
      "Stream songs, albums and curated mixes",
      "Offline listening support",
      "Artist profiles & fan interactions",
      "Responsive, modern interface",
    ],
  },
  {
    id: 4,
    title: "TaptoSign",
    year: "2025",
    role: "Automation Engineer",
    tags: ["Automation", "Go", "Document AI"],
    description:
      "Automated document signing at scale, PDF pipelines via Go subprocesses + compiled pdf-lib, plus OCR training workflows and Redis-backed sessions.",
    image: "",
    techStack: ["Go (Golang)", "Preact", "Redis", "pdf-lib", "OCR"],
    link: "https://taptosign.com",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A digital signing and contract management product. I engineered PDF manipulation features by integrating compiled pdf-lib through Go subprocess execution, implemented document signing and OCR training workflows, and used Redis for caching and session management, a hybrid of Node compiled tools and Go services.",
    features: [
      "PDF manipulation via Go subprocess + compiled pdf-lib",
      "Document signing workflows",
      "OCR training pipelines",
      "Redis caching & session management",
      "Secure, scalable contract handling",
    ],
  },
  {
    id: 6,
    title: "Game Server Dashboard",
    year: "2025",
    role: "Backend · Realtime",
    tags: ["Realtime", "Backend", "Infra"],
    description:
      "Built the realtime control plane for a game backend, secure session auth, live monitoring and server operations tooling.",
    image: ASSETS.IMAGES.GAME_SERVER,
    techStack: ["TypeScript", "Node.js", "WebSocket", "Redis", "JWT"],
    note: "Private, live demo available on request",
    longDescription:
      "A control panel for operating a real-time game backend. It provides a secure, session-based admin sign-in (24-hour sessions), and tooling to manage and monitor live server operations. The admin surface is intentionally private; happy to walk through it on request.",
    features: [
      "Secure session-based admin authentication",
      "Real-time game server operations",
      "Session lifecycle management (24h)",
      "Operator-facing control panel",
    ],
  },
  {
    id: 7,
    title: "Parking Backend",
    year: "2024",
    role: "Backend Engineer",
    tags: ["Backend", "APIs"],
    description:
      "Designed backend services for a smart parking system, covering spot inventory, bookings and access control, built for reliability.",
    image: "",
    techStack: ["Node.js", "Express", "PostgreSQL", "REST"],
    github: "https://github.com/TheAIGarage/Parking-backend",
    note: "Private repository (TheAIGarage)",
    longDescription:
      "Backend services powering a smart parking product: APIs for managing parking spots, handling bookings and enforcing access control, built for reliability under real-world traffic.",
    features: [
      "Parking spot & availability APIs",
      "Booking and reservation flows",
      "Access control & validation",
      "Built for production reliability",
    ],
  },
];
