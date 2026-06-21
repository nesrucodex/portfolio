import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Nav from "@/components/nav";
import ScrollProgress from "@/components/scroll-progress";
import SectionRail from "@/components/section-rail";

import "@/app/globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nesredin Getahun, Frontend · Backend · Mobile · Automation",
  description:
    "Nesredin Getahun (Nesru Codex), software engineer building production web apps, APIs, mobile apps and automation pipelines. Next.js, Node.js, Go, React Native, blockchain.",
  keywords: [
    "Nesredin Getahun",
    "Nesru Codex",
    "Full Stack Developer",
    "Frontend",
    "Backend",
    "Mobile Developer",
    "Automation Engineer",
    "Next.js",
    "Node.js",
    "Go",
    "React Native",
  ],
  authors: [{ name: "Nesredin Getahun" }],
  openGraph: {
    title: "Nesredin Getahun, Software Engineer",
    description:
      "Building across frontend, backend, mobile and automation. Selected work and stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-signal selection:text-ink",
          display.variable,
          body.variable,
          mono.variable
        )}
      >
        <ScrollProgress />
        <SectionRail />
        <Nav />
        {children}
      </body>
    </html>
  );
}
