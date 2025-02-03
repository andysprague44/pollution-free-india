'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

interface EmailResponse {
  success: boolean;
  email?: string;
  error?: string;
}

export async function generateEmail(
  name: string,
  age: string,
  profession: string,
  impacts: string[],
  additionalComments: string
): Promise<EmailResponse> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('Anthropic API key is not set')
    }

    const impactsText = impacts.length > 0 
      ? `I am particularly concerned because: ${impacts.join(', ')}.` 
      : '';
    
    const additionalContext = additionalComments 
      ? `Additionally, ${additionalComments}` 
      : '';

    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: `You are a ${age}-year-old ${profession} named ${name} from Delhi, India. You are very concerned about air pollution and writing to demand action. You do not hallucinate. You do not make things up such as job title, name, age, or location.`,
      prompt: `Generate a short, punchy email (200-250 words) to the Delhi CM demanding action on air pollution. 
      
      Include these personal impacts in the email: ${impactsText}
      ${additionalContext}
      
      The email should:
      1. Be urgent and passionate
      2. Highlight specific health risks and personal experiences
      3. Demand immediate, concrete action
      4. Request specific measures like:
         - Stricter regulations on industrial emissions
         - Promotion of clean energy
         - Improvement of public transportation
         - Better enforcement of existing environmental laws
      5. Be professional yet convey the gravity of the situation`,
      maxTokens: 1000,
      temperature: 0.8
    })

    return { success: true, email: text }
  } catch (error) {
    console.error('Error generating email:', error)
    return { success: false, error: 'Failed to generate email. Please try again.' }
  }
}