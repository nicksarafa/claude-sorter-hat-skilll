// Production Configuration
// Backend URL - update this after deploying backend to Railway/Render

const config = {
  // Backend API URL
  // Railway deployment
  API_BASE_URL: 'https://impartial-eagerness-production-9142.up.railway.app',

  // App settings
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic']
};

// Make config globally available
window.APP_CONFIG = config;
