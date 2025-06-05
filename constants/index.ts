import ASSETS from "@/utils/assets";

export const PROJECTS = [
  {
    id: 0,
    title: "EaseTenant",
    description:
      "At Ease Tenant, the Commercial Building Management System project focuses on streamlining property operations through a modern web platform. It offers features like real-time tenant chat, a marketplace for services, maintenance request handling, and full lease management. I contributed to building and deploying the backend, designing APIs and real-time communication workflows to deliver a smooth and efficient tenant experience.",
    image: ASSETS.IMAGES.EASETENANT,
    techStack: [
      "TypeScript",
      "Mantine",
      "Tailwind",
      "Next.js",
      "Express.js",
      "Prisma",
      "Zod",
    ],
    link: "https://ease-tenant.pro.et",
    github: "https://github.com/nesrucodex/ease-tenant",
    longDescription:
      "A modern, secure, and user-friendly commercial building management system designed for property owners and tenants. The platform offers real-time chat, service marketplaces, maintenance request tracking, and comprehensive lease management tools. I contributed to the backend development, implementing API endpoints, real-time communication features, and ensuring a seamless, efficient experience for both tenants and property managers.",
    features: [
      "Real-time tenant-to-manager and tenant-to-tenant chat system",
      "Service marketplace for property-related services and offers",
      "Maintenance request creation, tracking, and status updates",
      "Full lease management with digital contracts and renewals",
      "Backend built with Node.js, Express, and WebSocket integration",
      "Designed for commercial building operations in Ethiopia",
    ],
  },
  {
    id: 1,
    title: "Endubis Wallet",
    description:
      "At Endubis, the Cardano Wallet project aims to simplify ADA asset management through a secure Telegram bot, making crypto accessible in Ethiopia. I helped build and deploy the backend, integrating Cardano's API and designing commands for an intuitive user experience in Telegram.",
    image: ASSETS.IMAGES.ENDUBIS_V2,
    techStack: [
      "TypeScript",
      "Mantine",
      "Tailwind",
      "Next.js",
      "Express.js",
      "Prisma",
      "Zod",
    ],
    link: "https://t.me/EndubisTestWalletBot",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A secure and user-friendly Cardano wallet experience integrated into Telegram, tailored for the Ethiopian market. This project enables users to manage their ADA assets, check balances, and perform transactions through a Telegram bot interface. I contributed to the backend development, implementing Cardano API integrations, Telegram command handlers, and ensuring a smooth, intuitive user experience within the chat environment.",
    features: [
      "Secure ADA asset management via Telegram bot",
      "Cardano blockchain API integration",
      "User-friendly Telegram commands for wallet operations",
      "Balance checking and transaction initiation",
      "Backend built with Node.js and Express",
      "Localized for the Ethiopian crypto community",
    ],
  },
  {
    id: 2,
    title: "SoundRig",
    description:
      "SoundRig is a music streaming platform where users can discover, share, and stream songs and albums. It offers a personalized listening experience with curated playlists and allows users to connect with artists and other music enthusiasts. The platform also supports features like offline listening and social sharing.",
    image: ASSETS.IMAGES.SOUNDRIG,
    techStack: ["TypeScript", "Mantine", "Tailwind", "Next.js"],
    link: "soundrig-artist-app.vercel.app",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A dynamic music streaming platform built with Next.js and TypeScript, designed for seamless discovery, sharing, and streaming of songs and albums. SoundRig offers users a personalized experience through curated playlists, offline listening options, and social sharing capabilities. It fosters a community-driven environment where users can follow artists, interact with other music lovers, and share their favorite tracks. The platform prioritizes an intuitive, responsive UI and robust performance for uninterrupted music enjoyment.",
    features: [
      "Personalized playlists and recommendations",
      "Stream songs, albums, and curated mixes",
      "Offline listening support",
      "Artist profiles and fan interactions",
      "Social sharing for tracks and playlists",
      "Responsive and modern user interface",
    ],
  },
  {
    id: 3,
    title: "Shengo",
    description:
      "Shengo Web App is a platform that automates contracts for various transactions, such as selling, buying, renting, and more.",
    image: ASSETS.IMAGES.SHENGO,
    techStack: [
      "Typescript",
      "Tailwind",
      "Next.js",
      "Prisma",
      "Postgres",
      "Zod",
      "@tanstack/react-query",
    ],
    link: "shengo.vercel.app",
    github: "https://github.com/nesrucodex/shengo",
    longDescription:
      "An innovative web application designed to automate contract creation and management for diverse transactions, including selling, buying, renting, and service agreements. Built with Vue.js and Express, Shengo streamlines the traditionally manual process of drafting contracts by providing customizable templates and secure digital signing capabilities. Users can easily generate, review, and manage legally binding agreements online, reducing paperwork and improving transaction efficiency.",
    features: [
      "Automated contract generation for various transaction types",
      "Customizable contract templates",
      "Secure digital signing functionality",
      "Contract history and status tracking",
      "User authentication and role-based access",
    ],
  },
];