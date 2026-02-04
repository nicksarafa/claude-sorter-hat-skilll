# 🎩 Quick Reference Card

## One-Minute Setup

```bash
# 1. Add API key to .env
ANTHROPIC_API_KEY=sk-ant-your-key-here

# 2. Start server
npm start

# 3. Open browser
# http://localhost:3000
```

## Common Commands

```bash
npm start          # Start the server
npm run dev        # Development mode (auto-reload)
node test-setup.js # Verify installation
node test-api.js   # Test Claude API
```

## File Locations

### Edit These Often
- `backend/data/house-traits.json` - House characteristics
- `frontend/css/main.css` - Styling and colors
- `backend/data/personality-guide.json` - Hat personality
- `.env` - Your API key

### Core Implementation
- `backend/server.js` - API endpoints
- `backend/services/sorting-logic.js` - Sorting intelligence
- `frontend/js/app.js` - Main application
- `frontend/js/sorting-ceremony.js` - Ceremony flow

## API Endpoints

```
GET  /api/health         # Check server status
POST /api/sort/image     # Sort an image (multipart/form-data)
POST /api/sort/text      # Sort text description (JSON)
POST /api/sort/url       # Sort a URL (JSON)
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` |
| "API key invalid" | Check `.env` format |
| "Port 3000 in use" | Change PORT in `.env` |
| Camera not working | Check browser permissions |
| Sorting fails | Run `node test-api.js` |

## Quick Tests

```bash
# Test with text
node test-api.js "a brave lion"

# Test different houses
node test-api.js "a loyal dog"      # Hufflepuff
node test-api.js "an ancient book"  # Ravenclaw
node test-api.js "a silver crown"   # Slytherin
```

## Browser URLs

- Main app: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`

## House Colors (CSS)

```css
--gryffindor: #740001
--gryffindor-gold: #D3A625
--hufflepuff: #FFD800
--ravenclaw: #0E1A40
--slytherin: #1A472A
```

## Project Structure

```
backend/
  server.js ..................... API server
  services/sorting-logic.js ..... Sorting brain
  data/
    house-traits.json ........... House database
    personality-guide.json ...... Hat character
    sorting-examples.json ....... Training data

frontend/
  index.html .................... Main UI
  css/ .......................... Styling
  js/ ........................... Application logic
  assets/ ....................... Images, audio, fonts
```

## Adding Audio (Optional)

1. Add MP3 files to `frontend/assets/audio/`
2. Edit `frontend/js/audio-manager.js`
3. Uncomment Howler.js initialization (line ~16)

See `frontend/assets/ASSETS_GUIDE.md` for details.

## Documentation

- `README.md` - Full documentation
- `GETTING_STARTED.md` - Quick start
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- `STATUS.md` - Current state
- `CHANGELOG.md` - What was built
- `ASSETS_GUIDE.md` - Add images/audio

## Tips

- Keep image files under 10MB
- API calls cost ~$0.01-0.03 each
- Sorting takes 5-15 seconds (includes drama!)
- Works on mobile browsers
- Camera needs HTTPS (or localhost)
- No data is saved (privacy by design)

## Child-Friendly Features

- Large buttons (easy to tap)
- Drag-and-drop (simple to use)
- Immediate visual feedback
- No complex navigation
- Can't break anything
- Errors handled gracefully

## Fun Things to Sort

- Your pets
- Toys
- Food items
- Family members (describe them!)
- Colors
- Abstract concepts ("bravery", "wisdom")
- Fictional characters
- Objects around the house

## Next Steps

1. ✅ Add API key
2. ✅ Start server
3. ✅ Sort something!
4. Optional: Add audio files
5. Optional: Customize house traits
6. Optional: Add custom images

---

**Need help?** Check the full documentation in README.md

🎩✨ **Happy Sorting!**
