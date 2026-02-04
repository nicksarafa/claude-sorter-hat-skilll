const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

class SortingHatAI {
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey });
    this.houseTraits = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/house-traits.json'), 'utf8')
    );
    this.examples = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/sorting-examples.json'), 'utf8')
    );
    this.personality = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/personality-guide.json'), 'utf8')
    );
  }

  async analyzeAndSort(input) {
    // Build comprehensive prompt
    const prompt = this.buildSortingPrompt(input);

    // Call Claude with vision if image is provided
    const messages = [{
      role: 'user',
      content: this.formatContent(input, prompt)
    }];

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        temperature: 0.8, // Allow creativity in deliberation
        messages: messages
      });

      // Parse response
      return this.parseResponse(response.content[0].text);
    } catch (error) {
      console.error('Error calling Claude API:', error);

      // Return fallback response in character
      return {
        deliberation: [
          "Oh my! The magic is acting up...",
          "*adjusts brim thoughtfully*",
          "Let me try that again with a different approach...",
          "Ah yes, I see it now!"
        ],
        house: this.getFallbackHouse(input),
        reasoning: "Even ancient magic has its quirky moments! Based on what I can sense, this belongs here.",
        confidence: 0.6,
        needsClarification: false
      };
    }
  }

  buildSortingPrompt(input) {
    // Select 3 random examples to keep prompt fresh
    const selectedExamples = this.getRandomExamples(3);

    return `You are the legendary Sorting Hat from Hogwarts School of Witchcraft and Wizardry.

# Your Role
You have been placed upon something new - ${this.getInputDescription(input)} - and you must determine which of the four Hogwarts houses it belongs to.

# House Characteristics
${JSON.stringify(this.houseTraits, null, 2)}

# Your Personality
${this.personality.voiceGuidelines}

You are:
- Ancient and wise (over 1000 years old)
- Slightly mischievous and witty
- Thoughtful and deliberate
- You think out loud and sometimes doubt yourself
- You occasionally ask rhetorical questions
- You take your duty seriously but can be playful

# Speech Patterns
Use phrases like:
${JSON.stringify(this.personality.speechPatterns, null, 2)}

# Analysis Process

1. **Initial Observation**: Describe what you see/sense (1-2 thoughts)
2. **Trait Analysis**: Identify key characteristics (2-3 thoughts)
3. **House Consideration**: Think through which houses might fit, showing internal debate (3-5 thoughts)
4. **Final Decision**: Build to the announcement with confidence

# Response Format

Return a JSON object with:
{
  "deliberation": [
    "Each thought should be a complete sentence",
    "Show your reasoning process naturally",
    "Include moments of doubt or consideration",
    "Build dramatic tension toward the decision",
    "Usually 6-10 thoughts total"
  ],
  "house": "gryffindor|hufflepuff|ravenclaw|slytherin",
  "reasoning": "A paragraph explaining why this house is perfect, written in the Sorting Hat's voice. Be specific about which traits or characteristics led to this decision. Make it personal and insightful.",
  "confidence": 0.7,
  "needsClarification": false
}

# Examples of Good Sortings
${selectedExamples.map(ex =>
  `Input: ${ex.input}\nHouse: ${ex.house}\nReasoning: ${ex.reasoning}`
).join('\n\n')}

# Important Guidelines
- Be authentic to the Sorting Hat's ancient, wise character
- Show genuine deliberation - consider multiple houses when appropriate
- Make the reasoning specific to what you observe
- Use the house's actual values and characteristics from the data above
- Keep deliberation thoughts concise (1-2 sentences each)
- Build dramatic tension - start uncertain, become confident
- For objects, think about their PURPOSE, APPEARANCE, and SYMBOLISM
- For images, describe what you SEE and what it represents

# The Subject to Sort
${input.description || 'Analyze the image provided and describe what you see before sorting.'}

Remember: Make it feel magical! Take your time deliberating. Show your personality!`;
  }

  getInputDescription(input) {
    const types = {
      'image': 'a photograph or image',
      'url': 'a web presence',
      'text': 'a description',
      'object': 'an object captured by camera'
    };
    return types[input.type] || 'something interesting';
  }

  getRandomExamples(count) {
    const shuffled = [...this.examples].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  formatContent(input, prompt) {
    if (input.type === 'image' && input.imageData) {
      // Use Claude's vision capabilities
      return [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: input.imageData.mimeType,
            data: input.imageData.base64
          }
        },
        {
          type: 'text',
          text: prompt
        }
      ];
    } else {
      return prompt;
    }
  }

  parseResponse(text) {
    // Extract JSON from response
    try {
      // Try to find JSON in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // Validate required fields
        if (parsed.house && parsed.deliberation && parsed.reasoning) {
          // Ensure house is lowercase
          parsed.house = parsed.house.toLowerCase();

          // Validate house is one of the four
          if (!['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'].includes(parsed.house)) {
            console.warn('Invalid house returned:', parsed.house);
            parsed.house = 'gryffindor'; // fallback
          }

          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse Claude response:', e);
    }

    // Fallback if JSON parsing fails - try to extract house from text
    const houseMatches = {
      gryffindor: /gryffindor/i,
      hufflepuff: /hufflepuff/i,
      ravenclaw: /ravenclaw/i,
      slytherin: /slytherin/i
    };

    let detectedHouse = 'gryffindor';
    for (const [house, regex] of Object.entries(houseMatches)) {
      if (regex.test(text)) {
        detectedHouse = house;
        break;
      }
    }

    return {
      deliberation: [
        "Hmm... this is quite unusual...",
        "I see many interesting traits here...",
        "Let me think carefully...",
        "Yes... yes, I see it now..."
      ],
      house: detectedHouse,
      reasoning: text.substring(0, 300) + '...',
      confidence: 0.5,
      needsClarification: false
    };
  }

  getFallbackHouse(input) {
    // Simple fallback logic based on input type
    const fallbacks = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

module.exports = SortingHatAI;
