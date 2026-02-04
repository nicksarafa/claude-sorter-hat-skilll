#!/usr/bin/env node

// Test the Claude API integration directly
// Usage: node test-api.js "description of something to sort"

require('dotenv').config();
const SortingHatAI = require('./backend/services/sorting-logic');

async function testSorting() {
  // Check if API key is set
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_api_key_here') {
    console.error('\n❌ Error: Anthropic API key not set!');
    console.log('\nPlease add your API key to the .env file:');
    console.log('  ANTHROPIC_API_KEY=sk-ant-your-actual-key-here\n');
    console.log('Get your key from: https://console.anthropic.com/\n');
    process.exit(1);
  }

  // Get description from command line or use default
  const description = process.argv[2] || 'a brave red lion';

  console.log('\n🎩 Testing Sorting Hat AI...\n');
  console.log(`Sorting: "${description}"\n`);
  console.log('The Sorting Hat is thinking...\n');

  try {
    // Create sorting hat instance
    const sortingHat = new SortingHatAI(process.env.ANTHROPIC_API_KEY);

    // Test with text input
    const input = {
      type: 'text',
      description: description
    };

    // Perform sorting
    const result = await sortingHat.analyzeAndSort(input);

    // Display results
    console.log('🎩 The Sorting Hat says:\n');

    if (result.deliberation) {
      console.log('💭 Deliberation:');
      result.deliberation.forEach((thought, i) => {
        console.log(`   ${i + 1}. "${thought}"`);
      });
      console.log('');
    }

    console.log(`🏰 HOUSE: ${result.house.toUpperCase()}`);
    console.log(`\n📜 Reasoning:\n   ${result.reasoning}\n`);

    if (result.confidence) {
      console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(0)}%`);
    }

    console.log('\n✅ Test successful!\n');

  } catch (error) {
    console.error('\n❌ Error during sorting:', error.message);

    if (error.message.includes('API key')) {
      console.log('\nCheck that your API key in .env is correct.');
    } else if (error.message.includes('rate limit')) {
      console.log('\nYou may have hit the API rate limit. Wait a moment and try again.');
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      console.log('\nCheck your internet connection.');
    }

    console.log('');
    process.exit(1);
  }
}

// Show usage if --help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🎩 Sorting Hat API Test

Usage:
  node test-api.js [description]

Examples:
  node test-api.js "a brave red lion"
  node test-api.js "a wise old book"
  node test-api.js "a cunning silver snake"
  node test-api.js "a loyal golden retriever"

This tests the Claude API integration without starting the full server.
Make sure your ANTHROPIC_API_KEY is set in .env first!
  `);
  process.exit(0);
}

// Run test
testSorting();
