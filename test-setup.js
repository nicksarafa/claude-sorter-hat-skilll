#!/usr/bin/env node

// Quick setup verification script

const fs = require('fs');
const path = require('path');

console.log('🎩 Verifying Sorting Hat Setup...\n');

let allGood = true;

// Check files exist
const requiredFiles = [
  'backend/server.js',
  'backend/services/sorting-logic.js',
  'backend/data/house-traits.json',
  'backend/data/personality-guide.json',
  'backend/data/sorting-examples.json',
  'frontend/index.html',
  'frontend/css/main.css',
  'frontend/css/houses.css',
  'frontend/css/animations.css',
  'frontend/js/app.js',
  'frontend/js/sorting-ceremony.js',
  'frontend/js/audio-manager.js',
  'frontend/js/webcam.js',
  'frontend/js/api-client.js',
  'frontend/js/house-reveal.js',
  'package.json',
  '.env'
];

console.log('Checking required files...');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
  if (!exists) allGood = false;
});

console.log('\nChecking directories...');
const requiredDirs = [
  'backend/routes',
  'backend/scripts',
  'frontend/assets/images',
  'frontend/assets/audio',
  'frontend/assets/fonts'
];

requiredDirs.forEach(dir => {
  const exists = fs.existsSync(path.join(__dirname, dir));
  console.log(`  ${exists ? '✓' : '✗'} ${dir}`);
  if (!exists) allGood = false;
});

// Check .env configuration
console.log('\nChecking environment configuration...');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const hasApiKey = envContent.includes('ANTHROPIC_API_KEY=') && !envContent.includes('your_api_key_here');

  if (hasApiKey) {
    console.log('  ✓ Anthropic API key is set');
  } else {
    console.log('  ⚠ Anthropic API key needs to be added to .env file');
    console.log('    Get your key from: https://console.anthropic.com/');
    allGood = false;
  }
} catch (e) {
  console.log('  ✗ Could not read .env file');
  allGood = false;
}

// Check node_modules
console.log('\nChecking dependencies...');
const hasNodeModules = fs.existsSync('node_modules');
console.log(`  ${hasNodeModules ? '✓' : '✗'} node_modules directory`);
if (!hasNodeModules) {
  console.log('    Run: npm install');
  allGood = false;
}

// Final verdict
console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✅ Everything looks good! Ready to start.');
  console.log('\nTo start the server:');
  console.log('  npm start');
  console.log('\nThen open: http://localhost:3000');
} else {
  console.log('⚠️  Some issues found. Please fix them before starting.');
}
console.log('='.repeat(50) + '\n');

process.exit(allGood ? 0 : 1);
