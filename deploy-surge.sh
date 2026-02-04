#!/bin/bash

echo "🎩 ================================================ 🎩"
echo "   Deploying Sorting Hat Frontend to Surge"
echo "🎩 ================================================ 🎩"
echo ""

# Check if surge is installed
if ! command -v surge &> /dev/null; then
    echo "📦 Surge not found. Installing surge..."
    npm install -g surge
fi

# Prompt for backend URL
echo "📝 Configuration"
echo ""
read -p "Enter your backend URL (e.g., http://localhost:3000 or https://your-backend.railway.app): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend URL is required!"
    exit 1
fi

echo ""
echo "🔧 Creating production config..."

# Create a production config file
cat > frontend/config.js << EOF
// Production Configuration
// This file is generated during deployment

const config = {
  // Backend API URL - configured during deployment
  API_BASE_URL: '${BACKEND_URL}',

  // App settings
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic']
};

// Make config globally available
window.APP_CONFIG = config;
EOF

echo "✅ Config created with backend: ${BACKEND_URL}"
echo ""

# Deploy to Surge
echo "🚀 Deploying to Surge..."
echo ""

cd frontend
surge . sorting-hat.surge.sh

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Your Sorting Hat is now live at:"
echo "   https://sorting-hat.surge.sh"
echo ""
echo "Backend URL configured: ${BACKEND_URL}"
echo ""
echo "🎩 ================================================ 🎩"
