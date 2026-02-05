const OpenAI = require('openai');
const sharp = require('sharp');

class ImageTransformer {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });

    // House-specific transformation prompts
    this.housePrompts = {
      gryffindor: `The person/object in Gryffindor house robes inside the Gryffindor common room. Rich scarlet red and gold colors, cozy roaring fireplace, crimson velvet armchairs, golden lion emblems, Gryffindor banners, warm magical lighting, heroic atmosphere. Cinematic Harry Potter movie style, photorealistic, high detail.`,

      hufflepuff: `The person/object in Hufflepuff house robes inside the Hufflepuff common room. Warm yellow and black colors, cozy underground space, honey-colored lighting, comfortable furniture with yellow cushions, badger emblems, plants and flowers, earthy elements, friendly atmosphere. Cinematic Harry Potter movie style, photorealistic, high detail.`,

      ravenclaw: `The person/object in Ravenclaw house robes inside the Ravenclaw tower. Deep blue and bronze colors, tall windows with starry sky, bookshelves with ancient tomes, bronze eagle emblems, celestial elements, mystical atmosphere. Cinematic Harry Potter movie style, photorealistic, high detail.`,

      slytherin: `The person/object in Slytherin house robes inside the Slytherin dungeon. Deep emerald green and silver colors, underwater lake views, dark stone walls, green ambient lighting, silver serpent emblems, mysterious shadows, elegant furniture, powerful atmosphere. Cinematic Harry Potter movie style, photorealistic, high detail.`
    };
  }

  async transformImage(base64Image, house) {
    try {
      const houseKey = house.toLowerCase();
      const housePrompt = this.housePrompts[houseKey];

      if (!housePrompt) {
        throw new Error(`Invalid house: ${house}`);
      }

      console.log(`Transforming image into ${house} house style...`);

      // Convert base64 to buffer
      const imageBuffer = Buffer.from(base64Image, 'base64');

      // Use sharp to convert to PNG and ensure it's square (DALL-E requirement)
      const processedImage = await sharp(imageBuffer)
        .resize(1024, 1024, { fit: 'cover' })
        .png()
        .toBuffer();

      // Create a transparent mask (full image transformation)
      const mask = await sharp({
        create: {
          width: 1024,
          height: 1024,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
        .png()
        .toBuffer();

      // Create File objects for the API
      const imageFile = new File([processedImage], 'image.png', { type: 'image/png' });
      const maskFile = new File([mask], 'mask.png', { type: 'image/png' });

      console.log('Calling DALL-E 2 edit API...');

      // Use DALL-E 2 edit API
      const response = await this.openai.images.edit({
        model: "dall-e-2",
        image: imageFile,
        mask: maskFile,
        prompt: housePrompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      });

      const imageData = response.data[0].b64_json;

      console.log('Image transformation complete');

      return {
        success: true,
        imageData: imageData,
        mimeType: 'image/png',
        isOriginal: false
      };

    } catch (error) {
      console.error('Image transformation error:', error.message);

      // Return error but don't crash
      return {
        success: false,
        error: error.message,
        isOriginal: true
      };
    }
  }
}

module.exports = ImageTransformer;
