import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MockerProvider from '@/contexts/MockerContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noland',
  description: 'The Golden City Does Exist',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MockerProvider>{children}</MockerProvider>
      </body>
    </html>
  )
}
