'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        aria-expanded={isOpen}
      >
        <span 
          className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <span 
          className={`block w-6 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span 
          className={`block w-6 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-16 p-4 space-y-4">
            <Link
              href="/form"
              className="py-2 mt-2 bg-[#f47704] text-white px-4 rounded-lg 
                     hover:bg-[#f47704]/90 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-[#f47704] focus:ring-offset-2"
              onClick={toggleMenu}
            >
              Email Delhi CM
            </Link>
            <Link
              href="/"
              className="py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/faq"
              className="py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="py-2 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
