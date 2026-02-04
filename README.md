# 🎩 Hogwarts Sorting Hat Experience

An immersive, magical web application where users can sort **anything** into Hogwarts houses using AI-powered analysis. Features an animated Sorting Hat with personality, background music, sound effects, and support for images, webcam capture, and text descriptions.

## ✨ Features

- **Universal Sorting**: Sort photos, objects via webcam, URLs, or text descriptions
- **Authentic Sorting Hat Personality**: The Hat thinks out loud, deliberates, and makes decisions just like in the books
- **Immersive Experience**: Background music, sound effects, animations, and house-themed reveals
- **Child-Friendly Interface**: Large buttons, drag-and-drop, designed for easy use by young children
- **AI-Powered**: Uses Claude's Vision API for deep, intelligent analysis
- **All Four Houses**: Gryffindor, Hufflepuff, Ravenclaw, and Slytherin with accurate characteristics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd claude-sorter-hat-skilll
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎮 How to Use

### Sort an Image
1. Drag and drop a photo onto the drop zone, OR
2. Click "Choose Photo" to select an image file
3. Watch the Sorting Hat deliberate
4. Discover which house it belongs to!

### Use the Camera
1. Click "Use Camera"
2. Allow camera permissions
3. Point at any object
4. Click "Capture & Sort"
5. The Sorting Hat will analyze the object

### Describe Something
1. Click "Describe Something"
2. Type what you'd like to sort
3. Click "Sort It!"
4. The Hat will consider your description

## 🏰 How It Works

### The Sorting Process

1. **Input Analysis**: The app accepts images, webcam captures, or text descriptions
2. **Vision AI**: Claude's Vision API analyzes the input
3. **House Determination**: Using comprehensive house traits and sorting criteria, the AI determines the best fit
4. **Personality Layer**: The Sorting Hat's character brings deliberation and announcement to life
5. **Magical Reveal**: Animated house reveal with particles, colors, and reasoning

### House Characteristics

Each house has detailed traits across multiple dimensions:
- **Core values** (courage, loyalty, wisdom, ambition)
- **Personality traits**
- **Sorting criteria** for people, objects, places, and concepts
- **Colors, symbols, and quotes**

The AI considers:
- Visual appearance and design
- Purpose and function
- Symbolic meaning
- Associated emotions and values

## 📁 Project Structure

```
claude-sorter-hat-skilll/
├── backend/
│   ├── server.js              # Express server
│   ├── services/
│   │   └── sorting-logic.js   # Claude API integration
│   └── data/
│       ├── house-traits.json  # House characteristics
│       ├── personality-guide.json
│       └── sorting-examples.json
├── frontend/
│   ├── index.html            # Main UI
│   ├── css/
│   │   ├── main.css         # Base styles
│   │   ├── houses.css       # House-specific themes
│   │   └── animations.css   # Sorting hat animations
│   ├── js/
│   │   ├── app.js           # Main application
│   │   ├── sorting-ceremony.js
│   │   ├── audio-manager.js
│   │   ├── webcam.js
│   │   ├── api-client.js
│   │   └── house-reveal.js
│   └── assets/
│       ├── images/
│       ├── audio/
│       └── fonts/
└── package.json
```

## 🎨 Customization

### Adding Audio Files

Audio is currently set up with placeholders. To add actual sounds:

1. Place audio files in `frontend/assets/audio/`
   - `music/hogwarts-ambient.mp3` - Background music
   - `sorting-hat/hmm.mp3` - Thinking sounds
   - `houses/gryffindor-fanfare.mp3` - House fanfares (x4)

2. Uncomment the audio initialization in `frontend/js/audio-manager.js`

### Customizing House Traits

Edit `backend/data/house-traits.json` to adjust:
- Core values
- Personality traits
- Sorting criteria
- Famous members

### Adjusting Sorting Hat Personality

Edit `backend/data/personality-guide.json` to change:
- Voice guidelines
- Speech patterns
- Tone and style

## 🧪 Development

### Run in Development Mode
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when files change.

### Testing the API

Health check:
```bash
curl http://localhost:3000/api/health
```

Sort text:
```bash
curl -X POST http://localhost:3000/api/sort/text \
  -H "Content-Type: application/json" \
  -d '{"description": "A brave lion"}'
```

## 🎯 Current Implementation Status

✅ **Phase 1-2 Complete** (Foundation & Core Sorting)
- Project structure
- Backend server with Express
- Claude API integration
- Image upload and sorting
- Text description sorting
- Basic UI with drag-and-drop

✅ **Phase 3 Complete** (Immersive Experience)
- Sorting Hat personality and deliberation
- Animated ceremony flow
- House reveal with effects
- Audio manager (ready for sound files)

✅ **Phase 4 Complete** (Webcam Integration)
- Camera access and capture
- Live object sorting
- Child-friendly UX

🚧 **Phase 5 Coming Soon** (URL & Advanced Features)
- Web scraping for URL analysis
- Instagram profile sorting
- Enhanced input detection

## 🎭 The Sorting Hat's Character

The Sorting Hat is:
- **Ancient and wise** (over 1000 years old)
- **Thoughtful and deliberate** (thinks out loud)
- **Occasionally mischievous** (dry wit and humor)
- **Genuinely caring** (wants to get it right)

The deliberation shows:
- Initial observations
- Trait analysis
- Internal debate between houses
- Moments of doubt and revelation
- Confident final decision

## 🎓 Educational Use

This project demonstrates:
- AI vision and language model integration
- Full-stack web development
- User experience design for children
- Thematic interface design
- Audio/visual synchronization

## 📝 License

MIT License - Feel free to use and modify!

## ⚠️ Disclaimer

This is a fan project and is not affiliated with Warner Bros, J.K. Rowling, or the official Harry Potter franchise. All Harry Potter characters, names, and related indicia are trademarks of Warner Bros.

## 🙏 Acknowledgments

- Anthropic for Claude API
- The Harry Potter universe for inspiration
- Howler.js for audio management

---

**Made with magic** ✨

*"It is our choices that show what we truly are, far more than our abilities."*
