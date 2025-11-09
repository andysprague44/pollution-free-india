/**
 * Test script for generateEmail function
 * 
 * To run this test:
 * 1. Install tsx if not already installed: npm install -D tsx
 * 2. Make sure ANTHROPIC_API_KEY is set in your .env.local file
 * 3. Run: npx tsx app/actions/generateEmail.test.ts
 */

import { generateEmail } from './generateEmail';

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    testsFailed++;
  }
}

function assertContains(text: string | undefined, substring: string, message: string) {
  if (text && text.includes(substring)) {
    console.log(`✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    console.error(`   Expected text to contain: "${substring}"`);
    console.error(`   Got: "${text?.substring(0, 100)}..."`);
    testsFailed++;
  }
}

async function runTests() {
  console.log('\n🧪 Starting generateEmail tests...\n');
  console.log('='.repeat(60));

  // Test 1: Basic email generation with all parameters
  console.log('\n📝 Test 1: Basic email generation with all parameters');
  console.log('-'.repeat(60));
  try {
    const result1 = await generateEmail(
      'Priya Singh',
      '35',
      'Teacher',
      ['Respiratory issues', 'Children\'s health at risk'],
      'I have been living in Delhi for 10 years and the situation is getting worse.'
    );

    assert(result1.success === true, 'Should return success: true');
    assert(result1.email !== undefined, 'Should return generated email');
    assert(result1.error === undefined, 'Should not have error message');
    
    if (result1.email) {
      console.log('\n📧 Generated Email Preview:');
      console.log('-'.repeat(60));
      console.log(result1.email.substring(0, 300) + '...');
      console.log('-'.repeat(60));
      
      assert(result1.email.length > 100, 'Email should be reasonably long (>100 chars)');
      assert(result1.email.length < 2000, 'Email should not be too long (<2000 chars)');
    }
  } catch (error: any) {
    console.error(`❌ Test 1 threw an error: ${error.message}`);
    testsFailed++;
  }

  // Test 2: Email generation with minimal information
  console.log('\n\n📝 Test 2: Email generation with minimal information');
  console.log('-'.repeat(60));
  try {
    const result2 = await generateEmail(
      'Raj Kumar',
      '28',
      'Software Engineer',
      [],
      ''
    );

    assert(result2.success === true, 'Should succeed with minimal info');
    assert(result2.email !== undefined, 'Should generate email with minimal info');
    
    if (result2.email) {
      console.log('\n📧 Generated Email Preview:');
      console.log('-'.repeat(60));
      console.log(result2.email.substring(0, 200) + '...');
      console.log('-'.repeat(60));
    }
  } catch (error: any) {
    console.error(`❌ Test 2 threw an error: ${error.message}`);
    testsFailed++;
  }

  // Test 3: Email generation with multiple impacts
  console.log('\n\n📝 Test 3: Email generation with multiple impacts');
  console.log('-'.repeat(60));
  try {
    const result3 = await generateEmail(
      'Anjali Patel',
      '42',
      'Doctor',
      [
        'Increased asthma cases in my patients',
        'Reduced outdoor activities',
        'Eye irritation',
        'Difficulty breathing'
      ],
      'As a healthcare professional, I see the devastating effects daily.'
    );

    assert(result3.success === true, 'Should succeed with multiple impacts');
    assert(result3.email !== undefined, 'Should generate email with multiple impacts');
    
    if (result3.email) {
      console.log('\n📧 Generated Email Preview:');
      console.log('-'.repeat(60));
      console.log(result3.email.substring(0, 200) + '...');
      console.log('-'.repeat(60));
    }
  } catch (error: any) {
    console.error(`❌ Test 3 threw an error: ${error.message}`);
    testsFailed++;
  }

  // Test 4: Email generation with special characters
  console.log('\n\n📝 Test 4: Email generation with special characters in input');
  console.log('-'.repeat(60));
  try {
    const result4 = await generateEmail(
      'Sanjay O\'Brien',
      '50',
      'Business Owner & Entrepreneur',
      ['Health issues (respiratory)', 'Economic impact on business'],
      'The air quality is affecting my business operations.'
    );

    assert(result4.success === true, 'Should handle special characters');
    assert(result4.email !== undefined, 'Should generate email with special chars');
  } catch (error: any) {
    console.error(`❌ Test 4 threw an error: ${error.message}`);
    testsFailed++;
  }

  // Test 5: Check API key handling (this will fail if no API key is set)
  console.log('\n\n📝 Test 5: API key validation');
  console.log('-'.repeat(60));
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('⚠️  Warning: ANTHROPIC_API_KEY not found in environment');
    console.log('   Some tests may have failed due to missing API key');
  } else {
    console.log('✅ ANTHROPIC_API_KEY is set');
    testsPassed++;
  }

  // Print summary
  console.log('\n\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${testsPassed}`);
  console.log(`❌ Failed: ${testsFailed}`);
  console.log(`📈 Total: ${testsPassed + testsFailed}`);
  
  if (testsFailed === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the output above.');
  }
  console.log('='.repeat(60) + '\n');
}

// Run the tests
runTests().catch(error => {
  console.error('\n❌ Fatal error running tests:', error);
  process.exit(1);
});

