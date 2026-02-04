# 🎩 Getting Started with the Sorting Hat

Welcome! Let's get your magical sorting experience up and running.

## Quick Setup (5 minutes)

### Step 1: Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (it looks like: `sk-ant-...`)

### Step 2: Add Your API Key

Open the `.env` file in this directory and replace:
```
ANTHROPIC_API_KEY=your_api_key_here
```

With your actual key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

Save the file.

### Step 3: Start the Server

Run:
```bash
npm start
```

You should see:
```
🎩 ============================================ 🎩
   The Sorting Hat is ready!
   Server running on http://localhost:3000
🎩 ============================================ 🎩
```

### Step 4: Open Your Browser

Navigate to:
```
http://localhost:3000
```

You should see the Sorting Hat interface!

## First Sort

Try sorting something:

1. **Drag a photo** onto the drop zone
   - Try a picture of a lion, a book, a garden, or anything!

2. **Use the camera**
   - Click "Use Camera"
   - Point at an object
   - Click "Capture & Sort"

3. **Describe something**
   - Click "Describe Something"
   - Type: "A brave red dragon"
   - Click "Sort It!"

Watch the Sorting Hat think through its decision and announce the house!

## Troubleshooting

### "Cannot connect to server"
- Make sure the server is running (`npm start`)
- Check that nothing else is using port 3000

### "API key error"
- Double-check your API key in `.env`
- Make sure there are no spaces or quotes around it
- Verify the key starts with `sk-ant-`

### "Camera not working"
- Grant camera permissions when prompted
- Try HTTPS if on a remote server (cameras require secure connection)

### "Image upload fails"
- Images must be under 10MB
- Supported formats: JPEG, PNG, GIF, WebP, HEIC

## What's Implemented

✅ **Phase 1-4 Complete:**
- Image upload and sorting
- Webcam object capture
- Text description sorting
- Sorting Hat personality with deliberation
- House reveal with animations
- Drag-and-drop interface
- Child-friendly UI

🎵 **Audio (Optional):**
Audio is ready but files need to be added to `frontend/assets/audio/`
- See README for details on adding sound files

## Next Steps

Want to customize? Check out:

- `backend/data/house-traits.json` - Adjust house characteristics
- `backend/data/personality-guide.json` - Modify the Hat's personality
- `frontend/css/main.css` - Change colors and styling
- `frontend/assets/audio/` - Add your own music and sound effects

## Development Mode

For auto-reload during development:
```bash
npm run dev
```

## Have Fun!

The Sorting Hat is ready to sort anything you can imagine:
- Your pets
- Food items
- Toys
- Famous people (just describe them)
- Fictional characters
- Abstract concepts
- Websites (coming in Phase 5!)

*"Oh, you may not think I'm pretty, but don't judge on what you see..."* 🎩✨

---

Need help? Check the main README.md or create an issue on GitHub.
