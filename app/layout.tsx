import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import CreativeNav from "@/components/creative-nav"
import { cn } from "@/lib/utils"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nesru Codex | Full Stack Developer",
  description: "Personal portfolio of Nesru Codex, a Full Stack Developer specializing in modern web technologies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CreativeNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
