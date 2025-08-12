import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Didática Inclusiva - Metodologias Educacionais",
  description: "Aprenda metodologias educacionais inclusivas de forma interativa e gamificada",
}

export default function EducacaoInclusivaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
