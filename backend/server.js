const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const SortingHatAI = require('./services/sorting-logic');
const ImageTransformer = require('./services/image-transformer');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize services
const sortingHat = new SortingHatAI(process.env.ANTHROPIC_API_KEY);
const imageTransformer = new ImageTransformer(process.env.OPENAI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|heic/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'The Sorting Hat is ready!',
    timestamp: new Date().toISOString()
  });
});

// Sort image endpoint
app.post('/api/sort/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image provided',
        message: 'Please upload an image to sort!'
      });
    }

    console.log('Received image:', req.file.originalname, req.file.mimetype, req.file.size, 'bytes');

    // Convert buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Prepare input for sorting
    const input = {
      type: 'image',
      imageData: {
        base64: base64Image,
        mimeType: req.file.mimetype
      },
      description: req.body.description || null
    };

    // Perform sorting
    const result = await sortingHat.analyzeAndSort(input);

    console.log('Sorting complete:', result.house);

    // Generate transformed image using DALL-E
    // Extract description from Claude's analysis
    const imageDescription = result.imageDescription || input.description || "The uploaded subject";

    console.log('Generating transformed image...');
    const transformedImage = await imageTransformer.transformImage(
      imageDescription,
      result.house
    );

    // If transformation failed, return original image
    if (!transformedImage.success) {
      transformedImage.imageData = base64Image;
      transformedImage.mimeType = req.file.mimetype;
      transformedImage.isOriginal = true;
    }

    res.json({
      success: true,
      sorting: result,
      transformedImage: transformedImage
    });

  } catch (error) {
    console.error('Error sorting image:', error);

    res.status(500).json({
      error: 'Sorting failed',
      message: 'The Sorting Hat encountered some magical interference. Please try again!',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Sort text/description endpoint
app.post('/api/sort/text', async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim().length === 0) {
      return res.status(400).json({
        error: 'No description provided',
        message: 'Please provide a description to sort!'
      });
    }

    console.log('Received text description:', description.substring(0, 100) + '...');

    // Prepare input for sorting
    const input = {
      type: 'text',
      description: description
    };

    // Perform sorting
    const result = await sortingHat.analyzeAndSort(input);

    res.json({
      success: true,
      sorting: result
    });

  } catch (error) {
    console.error('Error sorting text:', error);

    res.status(500).json({
      error: 'Sorting failed',
      message: 'The Sorting Hat encountered some magical interference. Please try again!',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Sort URL endpoint (placeholder - would need web scraping implementation)
app.post('/api/sort/url', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        error: 'No URL provided',
        message: 'Please provide a URL to sort!'
      });
    }

    console.log('Received URL:', url);

    // For now, just treat URL as text description
    // In Phase 5, this would scrape the URL content
    const input = {
      type: 'url',
      description: `A website at ${url}. (Note: Full URL scraping not yet implemented - sorting based on URL alone)`
    };

    // Perform sorting
    const result = await sortingHat.analyzeAndSort(input);

    res.json({
      success: true,
      sorting: result,
      note: 'Full URL scraping coming in Phase 5!'
    });

  } catch (error) {
    console.error('Error sorting URL:', error);

    res.status(500).json({
      error: 'Sorting failed',
      message: 'The Sorting Hat encountered some magical interference. Please try again!',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'Image must be smaller than 10MB'
      });
    }
  }

  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong with the magic!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🎩 ============================================ 🎩
   The Sorting Hat is ready!
   Server running on http://localhost:${PORT}

   Press Ctrl+C to stop the server
🎩 ============================================ 🎩
  `);
});

module.exports = app;
