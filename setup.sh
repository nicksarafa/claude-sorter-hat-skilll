#!/bin/bash

echo "🎩 ============================================ 🎩"
echo "   Hogwarts Sorting Hat - Setup Script"
echo "🎩 ============================================ 🎩"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your Anthropic API key!"
    echo "   Get your API key from: https://console.anthropic.com/"
    echo ""
else
    echo "✓ .env file already exists"
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
else
    echo "✓ Dependencies already installed"
    echo ""
fi

echo "🎩 Setup complete!"
echo ""
echo "To start the server:"
echo "  npm start"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:3000"
echo ""
echo "For development (auto-reload):"
echo "  npm run dev"
echo ""
echo "🎩 ============================================ 🎩"
