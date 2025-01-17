'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Form() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [occupation, setOccupation] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/email?name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}&occupation=${encodeURIComponent(occupation)}`)
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Take Action</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="occupation" className="block mb-2">Occupation</label>
          <input
            type="text"
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Generate Email
        </button>
      </form>
    </div>
  )
}

