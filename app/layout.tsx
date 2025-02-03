'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/a21.ico" type="image/x-icon" />
        <title>The Article21 Initiative - Clean Air for Delhi</title>
        <meta name="description" content="Join our campaign to demand action on air pollution in Delhi." />
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
