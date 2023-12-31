import './globals.css'
import type { Metadata } from 'next'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full bg-slate-100">
      <body className="h-full">{children}</body>
    </html>
  )
}
