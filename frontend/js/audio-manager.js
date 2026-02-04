// Audio Manager for Sorting Hat Experience
// Note: Audio files need to be added to assets/audio/ directory

class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.isMuted = false;
    this.isInitialized = false;

    // We'll initialize on first user interaction due to browser autoplay policies
  }

  init() {
    if (this.isInitialized) return;

    console.log('Initializing audio manager...');

    // For now, we'll use placeholder sounds
    // In Phase 3, replace with actual audio files

    // Uncomment when audio files are added:
    /*
    this.music = new Howl({
      src: ['assets/audio/music/hogwarts-ambient.mp3'],
      loop: true,
      volume: 0.3,
      autoplay: false
    });

    this.sounds.rustling = new Howl({
      src: ['assets/audio/sorting-hat/rustling.mp3'],
      volume: 0.5
    });

    this.sounds.hmm = new Howl({
      src: ['assets/audio/sorting-hat/hmm.mp3'],
      volume: 0.6
    });

    this.sounds.difficult = new Howl({
      src: ['assets/audio/sorting-hat/difficult.mp3'],
      volume: 0.6
    });

    this.sounds.thinking = new Howl({
      src: ['assets/audio/sorting-hat/thinking-1.mp3'],
      volume: 0.5,
      loop: true
    });

    this.sounds.gryffindor = new Howl({
      src: ['assets/audio/houses/gryffindor-fanfare.mp3'],
      volume: 0.8
    });

    this.sounds.hufflepuff = new Howl({
      src: ['assets/audio/houses/hufflepuff-fanfare.mp3'],
      volume: 0.8
    });

    this.sounds.ravenclaw = new Howl({
      src: ['assets/audio/houses/ravenclaw-fanfare.mp3'],
      volume: 0.8
    });

    this.sounds.slytherin = new Howl({
      src: ['assets/audio/houses/slytherin-fanfare.mp3'],
      volume: 0.8
    });
    */

    this.isInitialized = true;
  }

  play(soundName) {
    if (!this.isInitialized) this.init();

    if (!this.isMuted && this.sounds[soundName]) {
      this.sounds[soundName].play();
    } else {
      console.log(`Would play sound: ${soundName}`);
    }
  }

  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].stop();
    }
  }

  playMusic() {
    if (!this.isInitialized) this.init();

    if (this.music && !this.isMuted) {
      this.music.play();
    }
  }

  playHouseFanfare(house) {
    console.log(`Playing fanfare for ${house}`);

    // Stop any ongoing sounds
    this.stop('thinking');

    // Fade out background music if it exists
    if (this.music) {
      this.music.fade(0.3, 0.1, 1000);
    }

    // Play house fanfare
    this.play(house.toLowerCase());

    // Fade music back in after fanfare
    setTimeout(() => {
      if (this.music) {
        this.music.fade(0.1, 0.3, 1000);
      }
    }, 5000);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.music) {
      this.music.mute(this.isMuted);
    }

    Object.values(this.sounds).forEach(sound => {
      if (sound && sound.mute) {
        sound.mute(this.isMuted);
      }
    });

    return this.isMuted;
  }
}

// Create global instance
window.audioManager = new AudioManager();
