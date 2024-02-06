import { Poppins } from 'next/font/google'
import SiteHeader from './list/SiteHeader'
import ClientCommons from './ClientCommons'
import '../styles/globals.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import { Metadata, Viewport, Route } from 'next'
// import { Providers } from "@/shared/providers"
import { auth } from "auth"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})


export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  initialScale: 1,
  width: 'device-width',
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
  interactiveWidget: 'overlays-content'
}

export const metadata: Metadata = {
  title: 'TourAbi',
  description: 'TourAbi.net Travel Tour Portal',
  // generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['tourabi', 'tours', 'miajupiter', 'mrtek-yazilimevi', 'travel', 'booking', 'silkroad'],
  authors: [
    { name: 'Shaman Coders' },
    {
      name: 'Ali TEK',
      url: 'https://linktr.ee/alitek',
    },
  ],

  // viewport:viewport,
  icons: [
    // { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: '/favicon.ico' },
    // { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const session: Session | null = await auth()

  return (

    <html lang='en' className={`${poppins.className}`}>

      <body className='bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200'>
        <SessionProvider session={session}>
          <ClientCommons />
          {session &&
            <>
              <SiteHeader />
              {children}
              <FooterNav />
              <Footer />
            </>
          }
          {session == null &&
            <>
              {children}
            </>
          }
        </SessionProvider>
      </body>
    </html>
  )
}
