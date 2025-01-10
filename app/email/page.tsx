'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Email() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const nameParam = searchParams.get('name')
    if (nameParam) {
      setName(nameParam)
      // In a real application, we would generate the email using AI here
      setEmail(`Dear Delhi CM,

I am ${nameParam}, a concerned citizen of Delhi. I am writing to demand immediate action on the severe air pollution crisis in our city. The air quality has reached hazardous levels, posing serious health risks to all residents, especially children and the elderly.

I urge you to implement stricter regulations on industrial emissions, promote clean energy alternatives, and improve public transportation to reduce vehicle pollution. We need a comprehensive plan to tackle this issue and ensure a healthier future for all Delhiites.

Please prioritize this urgent matter. Our health and well-being depend on your swift action.

Sincerely,
${nameParam}`)
    }
  }, [searchParams])

  const handleEmailEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Urgent: Action Needed on Delhi Air Pollution')
    const body = encodeURIComponent(email)
    window.location.href = `mailto:delhicm@example.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Personalized Email</h1>
      <textarea
        value={email}
        onChange={handleEmailEdit}
        className="w-full h-64 p-2 border rounded mb-4"
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

