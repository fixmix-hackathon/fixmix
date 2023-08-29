import './globals.css'
// import './prism.css'
import type { Metadata } from 'next'
import Footer from './footer'
import Header from './header'
import Main from "./main"

export const metadata: Metadata = {
  title: 'fαm',
  description: '使い心地にこだわったＡＩチャット',
  openGraph: {
    title: 'fαm',
    description: '使い心地にこだわったＡＩチャット',
    images: '/openGraphImg.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      <head />
      <body className="min-h-screen bg-white md:bg-gray-100">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  )
}