import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './footer'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'fix-mix（仮）',
  description: 'チームfixmixの作品',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Header />
      <body className={inter.className}>{children}</body>
      <Footer />
    </html>
  )
}
