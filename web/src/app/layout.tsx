import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'github-nippou',
  description: "Print today's your GitHub activity",
  openGraph: {
    title: 'github-nippou',
    description: "Print today's your GitHub activity",
    url: 'https://github-nippou-web.vercel.app/',
  },
  twitter: {
    title: 'github-nippou',
    description: "Print today's your GitHub activity",
    card: 'summary',
  },
}

// biome-ignore lint/style/noDefaultExport: Next.js requires default export for layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className="h-full bg-slate-100">
      <body className="h-full">{children}</body>
    </html>
  )
}
