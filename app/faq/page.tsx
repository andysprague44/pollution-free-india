export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">What is The Clean Air 21 Initiative?</h2>
          <p>The Clean Air 21 Initiative is a citizen-led campaign to demand action on Delhi's air pollution crisis, invoking our fundamental right to clean air under Article 21 of Constitution of India.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">How does the email campaign work?</h2>
          <p>Our platform helps you generate a personalized email to the Chief Minister of Delhi expressing your concerns about air pollution. You can review and edit the email before sending it through your own email client.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Is my information secure?</h2>
          <p>We take your privacy seriously. We only collect the information necessary to generate your personalized email and do not store any sensitive personal data.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">What happens after I send the email?</h2>
          <p>Your email will be sent directly to the Delhi CM's office. While we cannot guarantee individual responses, a large number of citizen emails can help demonstrate public concern and demand for action.</p>
        </div>
      </div>
    </div>
  )
}

