const OpenAI = require('openai');

class ImageTransformer {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });

    // House-specific transformation prompts
    this.housePrompts = {
      gryffindor: `in the style of a cinematic Harry Potter movie scene. The subject is in the Gryffindor common room, surrounded by: rich scarlet red and gold colors, a cozy roaring fireplace, crimson velvet armchairs, golden lion emblems, Gryffindor banners, warm magical lighting, golden sparkles, heroic and brave atmosphere. Photorealistic, cinematic lighting, high detail, dramatic composition.`,

      hufflepuff: `in the style of a cinematic Harry Potter movie scene. The subject is in the Hufflepuff common room near the kitchens, surrounded by: warm yellow and black colors, cozy underground space with honey-colored lighting, comfortable round furniture with yellow cushions, badger emblems, Hufflepuff banners, plants and flowers, earthy natural elements, warm and friendly atmosphere. Photorealistic, cinematic lighting, high detail, cozy composition.`,

      ravenclaw: `in the style of a cinematic Harry Potter movie scene. The subject is in the Ravenclaw tower library, surrounded by: deep blue and bronze colors, tall arched windows showing starry night sky, endless bookshelves with ancient tomes, eagle emblems, Ravenclaw banners, celestial elements like stars and moons, wise and mystical atmosphere, bronze sparkles. Photorealistic, cinematic lighting, high detail, ethereal composition.`,

      slytherin: `in the style of a cinematic Harry Potter movie scene. The subject is in the Slytherin dungeon common room, surrounded by: deep emerald green and silver colors, underwater lake views through windows, dark stone walls with green ambient lighting, silver serpent emblems, Slytherin banners, mysterious shadows, elegant furniture, ambitious and powerful atmosphere. Photorealistic, cinematic lighting, high detail, moody composition.`
    };
  }

  async transformImage(imageDescription, house) {
    try {
      const houseKey = house.toLowerCase();
      const housePrompt = this.housePrompts[houseKey];

      if (!housePrompt) {
        throw new Error(`Invalid house: ${house}`);
      }

      console.log(`Generating ${house} themed image for: ${imageDescription}`);

      // Create the full prompt
      const fullPrompt = `${imageDescription} ${housePrompt}`;

      console.log('DALL-E prompt:', fullPrompt);

      // Generate image using DALL-E 3
      const response = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: fullPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json"
      });

      const imageData = response.data[0].b64_json;

      console.log('Image generated successfully');

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
