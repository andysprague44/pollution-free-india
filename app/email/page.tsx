import { Suspense } from 'react'
import EmailContent from './EmailContent'

export default function EmailPage() {
  return (
    <Suspense fallback={<EmailLoading />}>
      <EmailContent />
    </Suspense>
  )
}

function EmailLoading() {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Generating Your Personalized Email</h1>
      <p>Should be quick...</p>
    </div>
  )
}

