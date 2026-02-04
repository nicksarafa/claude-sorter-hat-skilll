// Configuration for different environments

const config = {
  // Backend API URL
  // In production (Surge), this should point to your deployed backend
  // In development, it uses localhost
  API_BASE_URL: window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : (window.BACKEND_URL || 'http://localhost:3000'),

  // App settings
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic']
};

// Make config globally available
window.APP_CONFIG = config;
