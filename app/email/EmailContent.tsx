'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { generateEmail } from '../actions/generateEmail'

export default function EmailContent() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [occupation, setOccupation] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const nameParam = searchParams.get('name') || ''
    const ageParam = searchParams.get('age') || ''
    const occupationParam = searchParams.get('occupation') || ''

    setName(nameParam)
    setAge(ageParam)
    setOccupation(occupationParam)

    const generateEmailContent = async () => {
      setIsLoading(true)
      const result = await generateEmail(nameParam, ageParam, occupationParam)
      setIsLoading(false)

      if (result.success) {
        setEmail(result.email)
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
        <h1 className="text-2xl font-bold mb-4">Generating Your Personalized Email</h1>
        <p>Please wait while we create your email...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Personalized Email</h1>
      <textarea
        ref={textareaRef}
        value={email}
        onChange={handleEmailEdit}
        className="w-full min-h-[200px] p-2 border rounded mb-4 resize-none overflow-hidden"
        aria-label="Generated email content"
      />
      <button
        onClick={handleSendEmail}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Email
      </button>
    </div>
  )
}
