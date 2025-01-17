'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function generateEmail(name: string, age: string, occupation: string) {
  const prompt = `Generate a short, punchy email (200 words or less) to the Delhi CM demanding action on air pollution. The email should be from the perspective of a ${age}-year-old ${occupation} named ${name}. The tone should be urgent and passionate, highlighting the health risks and demanding immediate action. Include specific requests like stricter regulations on industrial emissions, promotion of clean energy, and improvement of public transportation.`

  try {
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: prompt,
    })

    return { success: true, email: text }
  } catch (error) {
    console.error('Error generating email:', error)
    return { success: false, error: 'Failed to generate email. Please try again.' }
  }
}

