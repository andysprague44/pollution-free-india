import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-[#f47704] text-xl font-bold hover:opacity-90 transition-opacity">
          The Article21 Initiative
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/"
              className="text-gray-700 hover:text-[#f47704] transition-colors text-sm font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/form" 
              className="text-gray-700 hover:text-[#f47704] transition-colors text-sm font-medium"
            >
              Email CM
            </Link>
          </li>
          <li>
            <Link 
              href="/faq" 
              className="text-gray-700 hover:text-[#f47704] transition-colors text-sm font-medium"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

