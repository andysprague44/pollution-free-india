'use server';

import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Pollution Free India <contact@pollutionfreeindia.in>',
      to: ['andy.sprague44@gmail.com', 'k.karankumar@gmail.com'],
      // TODO once it doesnt go directly to karan: //cc: formData.email,
      subject: `Pollution Free India Contact Form: ${formData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (error) {
      console.error('Error sending email:', error);
      return { 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: 'Failed to send email. Please try again later.' 
    };
  }
}
