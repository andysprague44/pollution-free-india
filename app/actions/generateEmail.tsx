'use server'

import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';




export async function generateEmail(name: string, age: string, occupation: string) {
  try {
    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      //model: openai('gpt-3.5-turbo'),
      system: `You are a ${age}-year-old ${occupation} named ${name} from Delhi, India. You are very concerned about air pollution and writing to demand action. You do not make things up such as my job title or name or age or location`,
      prompt: `Generate a short, punchy email (200 words or less) to the Delhi CM demanding action on air pollution. The tone should be urgent and passionate, highlighting the health risks and demanding immediate action. Include specific requests like stricter regulations on industrial emissions, promotion of clean energy, and improvement of public transportation.`,
    })

    return { success: true, email: text }
  } catch (error) {
    console.error('Error generating email:', error)
    return { success: false, error: 'Failed to generate email. Please try again.' }
  }
}

