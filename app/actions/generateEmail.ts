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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are helping write a formal email to the Chief Minister of Delhi about the air pollution crisis. The email should be professional, factual, and include personal experiences. Keep the tone respectful but urgent."
          },
          {
            role: "user",
            content: `Please write an email about Delhi's air pollution crisis using the following information:
              - Name: ${name}
              - Age: ${age}
              - Profession: ${profession}
              - Personal Impacts: ${impacts.join(', ')}
              ${additionalComments ? `- Additional Context: ${additionalComments}` : ''}
              
              The email should:
              1. Start with a formal greeting
              2. Introduce the writer
              3. Express concern about air pollution
              4. Share personal experiences of how air pollution affects them
              5. Request specific actions to address the crisis
              6. End with a professional closing`
          }
        ],
        temperature: 0.8, //0.7 is balanced, 0.8 is more varied
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate email');
    }

    return {
      success: true,
      email: data.choices[0].message.content.trim()
    };
  } catch (error) {
    console.error('Error generating email:', error);
    return {
      success: false,
      error: 'Failed to generate email. Please try again.'
    };
  }
}

// import { anthropic } from '@ai-sdk/anthropic';
// import { openai } from '@ai-sdk/openai';
// import { generateText } from 'ai';

// export async function generateEmail(name: string, age: string, occupation: string) {
//   try {
//     const { text } = await generateText({
//       model: anthropic('claude-3-5-sonnet-20241022'),
//       //model: openai('gpt-3.5-turbo'),
//       system: `You are a ${age}-year-old ${occupation} named ${name} from Delhi, India. You are very concerned about air pollution and writing to demand action. You do not make things up such as my job title or name or age or location`,
//       prompt: `Generate a short, punchy email (200 words or less) to the Delhi CM demanding action on air pollution. The tone should be urgent and passionate, highlighting the health risks and demanding immediate action. Include specific requests like stricter regulations on industrial emissions, promotion of clean energy, and improvement of public transportation.`,
//     })

//     return { success: true, email: text }
//   } catch (error) {
//     console.error('Error generating email:', error)
//     return { success: false, error: 'Failed to generate email. Please try again.' }
//   }
// }