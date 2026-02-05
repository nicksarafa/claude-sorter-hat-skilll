const { GoogleGenerativeAI } = require('@google/generative-ai');

class ImageTransformer {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);

    // House-specific transformation prompts
    this.housePrompts = {
      gryffindor: `Transform this image into a cinematic Harry Potter scene in Gryffindor house style.
        The subject should be depicted in the Hogwarts Gryffindor common room or tower, surrounded by:
        - Rich scarlet red and gold colors
        - Cozy fireplace with roaring flames
        - Crimson velvet armchairs and tapestries
        - Lion emblems and Gryffindor banners
        - Warm, brave, heroic atmosphere
        - Golden magical sparkles and courage-themed elements
        - Cinematic lighting with warm red-gold tones
        Style: Photorealistic, cinematic, Harry Potter film aesthetic, dramatic lighting, high detail, 4K quality`,

      hufflepuff: `Transform this image into a cinematic Harry Potter scene in Hufflepuff house style.
        The subject should be depicted in the Hogwarts Hufflepuff common room near the kitchens, surrounded by:
        - Warm yellow and black colors
        - Cozy underground space with honey-colored lighting
        - Comfortable round furniture with yellow cushions
        - Badger emblems and Hufflepuff banners
        - Plants, flowers, and earthy natural elements
        - Warm, friendly, loyal atmosphere
        - Golden wheat fields or garden elements
        - Cinematic lighting with warm honey tones
        Style: Photorealistic, cinematic, Harry Potter film aesthetic, cozy lighting, high detail, 4K quality`,

      ravenclaw: `Transform this image into a cinematic Harry Potter scene in Ravenclaw house style.
        The subject should be depicted in the Hogwarts Ravenclaw tower library, surrounded by:
        - Deep blue and bronze colors
        - Tall arched windows with starry night sky views
        - Endless bookshelves filled with ancient tomes
        - Eagle emblems and Ravenclaw banners
        - Celestial elements like stars, moons, constellations
        - Wise, intellectual, mystical atmosphere
        - Bronze magical sparkles and wisdom-themed elements
        - Cinematic lighting with cool blue-bronze tones
        Style: Photorealistic, cinematic, Harry Potter film aesthetic, ethereal lighting, high detail, 4K quality`,

      slytherin: `Transform this image into a cinematic Harry Potter scene in Slytherin house style.
        The subject should be depicted in the Hogwarts Slytherin dungeon common room, surrounded by:
        - Deep green and silver colors
        - Underwater views through dungeon windows (lake)
        - Dark stone walls with green ambient lighting
        - Serpent emblems and Slytherin banners
        - Mysterious shadows and elegant furniture
        - Ambitious, cunning, powerful atmosphere
        - Silver magical sparkles and snake-themed elements
        - Cinematic lighting with emerald-silver tones
        Style: Photorealistic, cinematic, Harry Potter film aesthetic, moody dramatic lighting, high detail, 4K quality`
    };
  }

  async transformImage(imageBase64, mimeType, house) {
    try {
      const houseKey = house.toLowerCase();
      const prompt = this.housePrompts[houseKey];

      if (!prompt) {
        throw new Error(`Invalid house: ${house}`);
      }

      console.log(`Transforming image for house: ${house}`);

      // Use Gemini 3 Pro Image model (Nano Banana Pro)
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-3-pro-image-preview'
      });

      // Prepare the image data
      const imageParts = [{
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        }
      }];

      // Generate the house-themed image
      const result = await model.generateContent([
        prompt,
        ...imageParts
      ]);

      const response = await result.response;

      // Extract the generated image
      if (response.candidates && response.candidates[0]) {
        const candidate = response.candidates[0];

        // Nano Banana Pro returns image in parts
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData) {
              return {
                success: true,
                imageData: part.inlineData.data,
                mimeType: part.inlineData.mimeType || 'image/png'
              };
            }
          }
        }
      }

      throw new Error('No image generated in response');

    } catch (error) {
      console.error('Image transformation error:', error);

      // Return original image if transformation fails
      return {
        success: false,
        error: error.message,
        fallback: true,
        imageData: imageBase64,
        mimeType: mimeType
      };
    }
  }
}

module.exports = ImageTransformer;
