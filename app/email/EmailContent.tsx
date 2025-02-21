'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { generateEmail } from '../actions/generateEmail'
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { toast, Toaster } from 'react-hot-toast';
import { trackEvent } from '../utils/analytics';

export default function EmailContent() {
  const [showImDone, setShowImDone] = useState(false);
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
  const router = useRouter()

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

  const handleCopyEmail = async () => {
    const emailAddress = 'cmdelhi@nic.in'
    const subject = 'Urgent: Action Needed on Delhi Air Pollution'
    const fullEmailContent = `To: ${emailAddress}\nSubject: ${subject}\n\n${email}`
    
    try {
      await navigator.clipboard.writeText(fullEmailContent)
      toast("Email copied to clipboard.\nOpen your email client to send it!", {
        duration: 2000,
        className: "bg-gray-800 text-white"
      })
      setShowImDone(true);
      trackEvent('click', 'email', 'copy_email');
    } catch (err) {
      toast("Failed to copy email", {
        duration: 2000,
        className: "bg-gray-800 text-white"
      })
      trackEvent('error', 'email', 'copy_email_failed');
    }
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Urgent: Action Needed on Delhi Air Pollution')
    const body = encodeURIComponent(email)
    window.location.href = `mailto:cmdelhi@nic.in?subject=${subject}&body=${body}`
    setShowImDone(true);
    trackEvent('click', 'email', 'send_email');
  }

  const handleImDone = () => {
    trackEvent('click', 'flow', 'completed');
    router.push('/congratulations')
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
    <>
    <Toaster/>
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-[#f47704]">Your Personalized Email</h1>
      <p className="text-gray-600 mb-6">
        Review your email below. Feel free to make any edits before sending.
      </p>
      <Textarea
        value={email}
        onChange={handleEmailEdit}
        className="min-h-[620px] resize-y mb-6"
      />
      <div className="flex gap-4">
        <button
          onClick={handleSendEmail}
          className="flex-1 bg-[#f47704] hover:bg-[#f47704]/90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Send Email
        </button>
        <button
          onClick={handleCopyEmail}
          className="flex-1 bg-[#f47704] hover:bg-[#f47704]/90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Copy to Clipboard
        </button>
      </div>
      <div className="flex gap-4">
      {showImDone && (<button
          onClick={handleImDone}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-4"
          style={{ width: '80%' }}
        >
          I'm Done!
        </button>
      )}
      </div>

    </div>
    </>
  )
}
