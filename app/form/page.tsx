'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PROFESSIONS = [
  'Student',
  'Professional',
  'Teacher',
  'Healthcare Worker',
  'Non-Profit Worker',
  'Retired',
  'Other'
]

const IMPACT_OPTIONS = [
  'Personal or family health is being affected',
  'Children cannot attend school or play outdoors',
  'Work productivity is being impacted',
  'Elderly family members cannot maintain active lifestyles',
  'Mental health and well-being are suffering',
  'Increased medical expenses due to respiratory issues'
]

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    profession: '',
    impacts: [] as string[],
    additionalComments: ''
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImpactChange = (impact: string) => {
    setFormData(prev => ({
      ...prev,
      impacts: prev.impacts.includes(impact)
        ? prev.impacts.filter(i => i !== impact)
        : [...prev.impacts, impact]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams({
      name: formData.name,
      age: formData.age,
      profession: formData.profession,
      impacts: JSON.stringify(formData.impacts),
      additionalComments: formData.additionalComments
    })
    router.push(`/email?${queryParams.toString()}`)
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-[#f47704]">Take Action for Clean Air</h1>
      <p className="text-gray-600 mb-8">
        Your voice matters in the fight for clean air in Delhi. Fill out this form to generate a personalized email to the Delhi CM.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#f47704] focus:border-[#f47704] transition-colors"
            placeholder="Your full name"
          />
        </div>

        {/* Age Field */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#f47704] focus:border-[#f47704] transition-colors"
          />
        </div>

        {/* Profession Field */}
        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
            Profession <span className="text-red-500">*</span>
          </label>
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#f47704] focus:border-[#f47704] transition-colors"
          >
            <option value="">Select your profession</option>
            {PROFESSIONS.map(profession => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
        </div>

        {/* Impact Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How has poor air quality impacted your life? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {IMPACT_OPTIONS.map(impact => (
              <label key={impact} className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.impacts.includes(impact)}
                  onChange={() => handleImpactChange(impact)}
                  className="mt-1 h-4 w-4 text-[#f47704] border-gray-300 rounded focus:ring-[#f47704]"
                />
                <span className="ml-3 text-sm text-gray-600">{impact}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Comments */}
        <div>
          <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-2">
            Anything else you wish to add?
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#f47704] focus:border-[#f47704] transition-colors"
            placeholder="Share your personal story or additional concerns..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#f47704] hover:bg-[#f47704]/90 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#f47704] focus:ring-offset-2"
        >
          Generate Email to Delhi CM
        </button>
      </form>
    </div>
  )
}
