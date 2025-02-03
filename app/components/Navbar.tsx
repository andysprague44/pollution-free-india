'use client'

import Link from 'next/link'
import MobileNav from './MobileNav'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          {/* Logo for mobile, Text for desktop */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Article21 Initiative Logo"
              className="md:hidden h-10 w-auto"
            />
            <span className="hidden md:block text-[#f47704] text-xl font-bold">
              The Article21 Initiative
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/form"
              className="bg-[#f47704] text-white px-4 py-2 rounded-lg 
                     hover:bg-[#f47704]/90 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-[#f47704] focus:ring-offset-2"
            >
              Email Delhi CM
            </Link>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </nav>
      </div>
    </header>
  )
}
