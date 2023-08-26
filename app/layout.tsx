import './globals.css'
import './prism.css'
import type { Metadata } from 'next'
import Footer from './footer'
import Header from './header'
import Main from "./main"

export const metadata: Metadata = {
  title: 'fix-mix（仮）',
  description: 'チームfixmixの作品',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <head />
      <body className="min-h-screen bg-white md:bg-gray-100">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  )
}