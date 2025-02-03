'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { generateEmail } from '../actions/generateEmail'

export default function EmailContent() {
  const [email, setEmail] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    profession: '',
    impacts: [] as string[],
    additionalComments: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const name = searchParams.get('name') || ''
    const age = searchParams.get('age') || ''
    const profession = searchParams.get('profession') || ''
    const impacts = JSON.parse(searchParams.get('impacts') || '[]')
    const additionalComments = searchParams.get('additionalComments') || ''

    setFormData({
      name,
      age,
      profession,
      impacts,
      additionalComments
    })

    const generateEmailContent = async () => {
      setIsLoading(true)
      const result = await generateEmail(
        name,
        age,
        profession,
        impacts,
        additionalComments
      )
      setIsLoading(false)

      if (result.success) {
        setEmail(result.email || '')
      } else {
        setError(result.error || 'An error occurred while generating the email.')
      }
    }

    generateEmailContent()
  }, [searchParams])

  useEffect(() => {
    const adjustTextareaHeight = () => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    adjustTextareaHeight()
  }, [email])

  const handleEmailEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Urgent: Action Needed on Delhi Air Pollution')
    const body = encodeURIComponent(email)
    window.location.href = `mailto:delhicm@example.com?subject=${subject}&body=${body}`
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#f47704]">Generating Your Personalized Email</h1>
        <p className="text-gray-600">Should be quick...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#f47704]">Error</h1>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#f47704] hover:bg-[#f47704]/90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-[#f47704]">Your Personalized Email</h1>
      <p className="text-gray-600 mb-6">
        Review your email below. Feel free to make any edits before sending.
      </p>
      <textarea
        ref={textareaRef}
        value={email}
        onChange={handleEmailEdit}
        className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg mb-6 resize-none overflow-hidden focus:ring-[#f47704] focus:border-[#f47704] transition-colors"
        aria-label="Generated email content"
      />
      <button
        onClick={handleSendEmail}
        className="w-full bg-[#f47704] hover:bg-[#f47704]/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#f47704] focus:ring-offset-2"
      >
        Send Email
      </button>
    </div>
  )
}
