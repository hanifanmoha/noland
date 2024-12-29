import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import MockerProvider from '@/contexts/MockerContext'
import { Suspense } from 'react'

const font = Plus_Jakarta_Sans({ weight: '400', subsets: ['latin'], display: 'swap' })

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
      <body className={font.className}>
        <Suspense>
          <MockerProvider>{children}</MockerProvider>
        </Suspense>
      </body>
    </html>
  )
}
