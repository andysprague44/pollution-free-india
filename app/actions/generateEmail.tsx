'use server'

// Using Hugging Face's Llama 2 model for text generation

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
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('Hugging Face API key is not set');
    }

    const impactsText = impacts.length > 0 
      ? `I am particularly concerned because: ${impacts.join(', ')}.` 
      : '';
    
    const additionalContext = additionalComments 
      ? `Additionally, ${additionalComments}` 
      : '';

    // Construct the prompt
    const prompt = `<s>[INST] You are a ${age}-year-old ${profession} named ${name} from Delhi, India. You are very concerned about air pollution and writing to demand action.

Generate a compelling and forceful email (200-250 words) to the Delhi CM demanding immediate action on the critical air pollution crisis.

${impactsText}
${additionalContext}

The email should:
1. Express extreme urgency - this is a life-or-death matter affecting millions
2. Use strong, emotionally charged language while remaining professional
3. Emphasize the devastating human cost of inaction
4. Demand specific, immediate actions including:
   - Harsh penalties for industrial polluters
   - Rapid transition to clean energy
   - Major expansion of public transportation
   - Strict enforcement of environmental laws with real consequences
5. Convey frustration with past inaction while demanding accountability
6. Include specific air quality data or health statistics if provided

Make the tone assertive and uncompromising - lives are at stake.

Do not make up any details about job title, name, age, family members, health conditions, or location that weren't provided. 

Do not respond with anything except the email contents. Do not include any preamble or subject line, start from the greeting[/INST]</s>`;

    // Call Hugging Face API
    const response = await fetch(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.2,
            top_p: 0.95,
            repetition_penalty: 1.15
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const result = await response.json();
    const generatedText = result[0]?.generated_text;

    if (!generatedText) {
      throw new Error('No text was generated');
    }

    // Clean up the response by removing the prompt and any system tokens
    const cleanedText = generatedText
      .replace(prompt, '')
      .replace(/^\s*<s>\[/g, '')
      .replace(/\]<\/s>\s*$/g, '')
      .trim();
    
    return { success: true, email: cleanedText };
  } catch (error) {
    console.error('Error generating email:', error);
    return { success: false, error: 'Failed to generate email. Please try again.' };
  }
}