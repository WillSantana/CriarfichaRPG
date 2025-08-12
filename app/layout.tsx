import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SF-RPG - Sistema de Fichas RPG",
  description: "Sistema completo de gerenciamento de fichas de personagem para RPG D&D",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gradient-to-br from-parchment to-amber-50">
          <Sidebar />
          <main className="flex-1 lg:ml-64">{children}</main>
        </div>
      </body>
    </html>
  )
}
