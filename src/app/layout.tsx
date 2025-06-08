import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import MockerProvider from '@/contexts/MockerContext'
import { Suspense } from 'react'
import Script from 'next/script'

const font = Open_Sans({ weight: '400', subsets: ['latin'], display: 'swap' })

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G5V9QXP80B"
          strategy="afterInteractive" // Ensures script runs after page load
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G5V9QXP80B');
        `}
        </Script>
      </body>
    </html>
  )
}

