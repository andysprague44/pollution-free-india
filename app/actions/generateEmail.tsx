'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function generateEmail(name: string, age: string, occupation: string) {
  const prompt = `Generate a short, punchy email (200 words or less) to the Delhi CM demanding action on air pollution. The email should be from the perspective of a ${age}-year-old ${occupation} named ${name}. The tone should be urgent and passionate, highlighting the health risks and demanding immediate action. Include specific requests like stricter regulations on industrial emissions, promotion of clean energy, and improvement of public transportation.`

  try {
    // TODO call AI!
    // const { text } = await generateText({
    //   model: openai('gpt-3.5-turbo'),
    //   prompt: prompt,
    // })
    let text = `Dear Delhi CM,

I am ${name}, a ${age}-year-old ${occupation}, and long-time resident of Delhi. I am writing to demand immediate action on the severe air pollution crisis in our city. The air quality has reached hazardous levels, posing serious health risks to all residents, especially children and the elderly.

I urge you to implement stricter regulations on industrial emissions, promote clean energy alternatives, and improve public transportation to reduce vehicle pollution. We need a comprehensive plan to tackle this issue and ensure a healthier future for all Delhiites.

Please prioritize this urgent matter. Our health and well-being depend on your swift action.

Sincerely,
${name}`

    return { success: true, email: text }
  } catch (error) {
    console.error('Error generating email:', error)
    return { success: false, error: 'Failed to generate email. Please try again.' }
  }
}

