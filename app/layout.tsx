import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Script from 'next/script'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

// Initialize Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const metadata: Metadata = {
  title: 'The Clean Air 21 Initiative - Clean Air for Delhi',
  description: 'Join our campaign to demand action on air pollution in Delhi. Together, we can make a difference!',
  icons: {
    icon: '/air.ico',
  },
  openGraph: {
    title: 'The CleanAir21 Initiative - Clean Air for Delhi',
    description: 'Join our campaign to demand action on air pollution in Delhi. Together, we can make a difference!',
    url: 'https://pollutionfreeindia.org/',
    siteName: 'Pollution Free India',
    images: [
      {
        url: 'https://pollutionfreeindia.org/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Clean Air 21 Initiative - Clean Air for Delhi',
    description: 'Join our campaign to demand action on air pollution in Delhi. Together, we can make a difference!',
    images: ['https://pollutionfreeindia.org/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/air.ico" type="image/x-icon" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}> 
        <Navbar />
        <main className="flex-grow">
          <div className="max-w-[40vw] mx-auto">
            {/* Adjust logo path */}
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
