# 🎨 Assets Guide

This guide explains where to place visual and audio assets to enhance the Sorting Hat experience.

## Current Status

The app currently works with **emoji-based placeholders**:
- 🎩 Sorting Hat
- 🦁 Gryffindor (Lion)
- 🦡 Hufflepuff (Badger)
- 🦅 Ravenclaw (Eagle)
- 🐍 Slytherin (Serpent)

These work perfectly fine! But you can enhance with actual images and audio.

## Images

### Sorting Hat (`images/sorting-hat/`)

**For static hat:**
- `hat-idle.png` - Default resting state (use transparent PNG)
- Recommended size: 512x512px

**For animated hat:**
- `hat-idle.gif` - Gentle swaying animation
- `hat-thinking.gif` - Intense wobbling while deliberating

To use images instead of emoji, update `frontend/index.html`:
```html
<!-- Change this: -->
<div id="sorting-hat" class="sorting-hat">🎩</div>

<!-- To this: -->
<img id="sorting-hat" class="sorting-hat" src="assets/images/sorting-hat/hat-idle.png" alt="Sorting Hat">
```

### House Crests (`images/houses/`)

Place house crest images:
- `gryffindor-crest.png`
- `hufflepuff-crest.png`
- `ravenclaw-crest.png`
- `slytherin-crest.png`

Recommended size: 256x256px, transparent background

Update in `frontend/js/house-reveal.js`:
```javascript
gryffindor: {
  crest: '<img src="assets/images/houses/gryffindor-crest.png">',
  // ... rest
}
```

### Backgrounds (`images/backgrounds/`)

Optional background images:
- `great-hall.jpg` - Main background
- `hogwarts-castle.jpg` - Alternative background
- `parchment-texture.png` - For UI elements

To use in CSS:
```css
.castle-background {
  background-image: url('../assets/images/backgrounds/great-hall.jpg');
  background-size: cover;
}
```

### Effects (`images/effects/`)

Optional particle/sparkle effects:
- `sparkle.png`
- `magic-particle.png`

## Audio

### Background Music (`audio/music/`)

Place ambient background music:
- `hogwarts-ambient.mp3` - Main theme
- `great-hall.mp3` - Alternative ambiance
- `hedwigs-theme.mp3` - Iconic theme

**Sources:**
- Royalty-free: [Incompetech](https://incompetech.com/) (search "fantasy" or "medieval")
- Or: [YouTube Audio Library](https://studio.youtube.com/channel/UC_CONTENT_ID/music)

### Sorting Hat Sounds (`audio/sorting-hat/`)

Voice clips or sound effects:
- `hmm.mp3` - Thoughtful "hmmm"
- `difficult.mp3` - "Difficult, very difficult..."
- `thinking-1.mp3` - Contemplative sound (can loop)
- `thinking-2.mp3` - Alternative thinking sound
- `rustling.mp3` - Hat movement sound

**How to create:**
- **Option 1**: Text-to-speech (ElevenLabs, free tier)
- **Option 2**: Record yourself with character voice
- **Option 3**: Hire voice actor on Fiverr ($20-50)
- **Option 4**: Freesound.org for generic sounds

### House Fanfares (`audio/houses/`)

Triumphant music for each house:
- `gryffindor-fanfare.mp3` - Bold brass
- `hufflepuff-fanfare.mp3` - Warm strings
- `ravenclaw-fanfare.mp3` - Ethereal chimes
- `slytherin-fanfare.mp3` - Mysterious woodwinds

**Sources:**
- Search "fanfare" or "flourish" on royalty-free sites
- Keep them short: 3-5 seconds

## Fonts (`fonts/`)

Harry Potter-style fonts (optional):

**Free options:**
- [Lumos](https://www.fontspace.com/lumos-font-f23294) - Similar to HP movies
- [Parseltongue](https://www.fontspace.com/parseltongue-font-f9175) - Stylized

Place font files here:
- `Lumos.ttf`
- `Parseltongue.ttf`

Add to CSS:
```css
@font-face {
  font-family: 'Lumos';
  src: url('../assets/fonts/Lumos.ttf') format('truetype');
}
```

## Enabling Audio

Once you've added audio files, edit `frontend/js/audio-manager.js`:

1. Uncomment the Howler.js initialization code (around line 16)
2. Update file paths to match your audio files
3. The app will automatically use them!

## Notes

- **File Sizes**: Keep images under 1MB, audio under 5MB each
- **Formats**:
  - Images: PNG (transparency), JPG (photos), GIF (animation)
  - Audio: MP3 (best compatibility)
- **Copyright**: Only use royalty-free or original content
- **Testing**: Add one asset at a time to verify it works

## Quick Win: Just Add Music

For the easiest enhancement:

1. Download one ambient fantasy track from Incompetech
2. Save as `frontend/assets/audio/music/hogwarts-ambient.mp3`
3. Uncomment music initialization in `audio-manager.js`
4. Restart server

That's it! Background music will play.

---

**The app works great without any assets - they're just enhancements!** 🎩✨
