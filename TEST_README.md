# Testing generateEmail Function

This guide explains how to test the `generateEmail` function without running the full site.

## Prerequisites

1. Make sure you have your Anthropic API key set in your environment:
   - Create a `.env.local` file in the root directory if it doesn't exist
   - Add: `ANTHROPIC_API_KEY=your_api_key_here`

2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```

## Running the Tests

### Option 1: Using npm script (Recommended)
```bash
npm run test:email
```

### Option 2: Using npx directly
```bash
npx tsx app/actions/generateEmail.test.ts
```

## What the Test Does

The test suite runs 5 different test cases:

1. **Basic email generation** - Tests with all parameters filled
2. **Minimal information** - Tests with empty impacts and comments
3. **Multiple impacts** - Tests with several health impacts listed
4. **Special characters** - Tests handling of special characters in inputs
5. **API key validation** - Checks if the API key is properly configured

## Expected Output

You should see output like this:

```
🧪 Starting generateEmail tests...

============================================================

📝 Test 1: Basic email generation with all parameters
------------------------------------------------------------
✅ PASS: Should return success: true
✅ PASS: Should return generated email
✅ PASS: Should not have error message

📧 Generated Email Preview:
------------------------------------------------------------
[Preview of generated email text]
------------------------------------------------------------
✅ PASS: Email should be reasonably long (>100 chars)
✅ PASS: Email should not be too long (<2000 chars)

...

============================================================
📊 TEST SUMMARY
============================================================
✅ Passed: 15
❌ Failed: 0
📈 Total: 15

🎉 All tests passed!
============================================================
```

## Troubleshooting

### Error: ANTHROPIC_API_KEY not found
- Make sure you have created `.env.local` file in the root directory
- Add your Anthropic API key to the file
- The test script will warn you if the key is missing

### Error: Module not found
- Run `npm install` to ensure all dependencies are installed
- Make sure you're in the project root directory

### API Rate Limits
- If you hit rate limits, wait a few moments before running tests again
- The Anthropic API has rate limits depending on your account tier

## Customizing Tests

You can modify `app/actions/generateEmail.test.ts` to:
- Add more test cases
- Test different input combinations
- Adjust the validation criteria
- Add mock testing (to avoid API calls)

## Notes

- Each test makes a real API call to Hugging Face
- Tests may take 10-30 seconds to complete
- Generated emails will vary due to the AI model's nature
- The test includes preview snippets of generated emails for manual review

