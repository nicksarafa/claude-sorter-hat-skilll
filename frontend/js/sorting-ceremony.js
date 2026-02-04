// Sorting Ceremony - The Heart of the Experience

class SortingCeremony {
  constructor(audioManager, apiClient) {
    this.audio = audioManager;
    this.api = apiClient;
    this.hat = document.getElementById('sorting-hat');
    this.thoughtBubble = document.querySelector('.thought-bubble');
    this.thoughtText = document.getElementById('hat-thoughts');
  }

  async performSorting(inputData, inputType = 'image') {
    try {
      // Phase 1: Hat Placement
      await this.placeHat();

      // Phase 2: Initial Observation
      await this.initialObservation();

      // Phase 3: Call backend for deep analysis
      let analysis;
      if (inputType === 'image') {
        analysis = await this.api.sortImage(inputData);
      } else if (inputType === 'text') {
        analysis = await this.api.sortText(inputData);
      } else if (inputType === 'url') {
        analysis = await this.api.sortURL(inputData);
      }

      // Phase 4: Deliberation (thinking out loud)
      await this.deliberate(analysis);

      // Phase 5: Final Decision & Announcement
      await this.announceHouse(analysis.house, analysis.reasoning);

      return analysis;

    } catch (error) {
      console.error('Sorting ceremony error:', error);

      // Handle error in character
      await this.handleError(error);

      throw error;
    }
  }

  async placeHat() {
    console.log('Placing hat...');

    this.audio.play('rustling');
    this.showThought("Ahh, what have we here?");
    await this.wait(2000);
  }

  async initialObservation() {
    console.log('Initial observation...');

    const observations = [
      "Let me take a good look...",
      "Hmm, interesting...",
      "Most curious indeed..."
    ];

    for (const obs of observations) {
      this.showThought(obs);
      this.audio.play('hmm');
      await this.wait(1500);
    }
  }

  async deliberate(analysis) {
    console.log('Deliberating...', analysis);

    // Make hat wobble intensely
    this.hat.classList.add('thinking');
    this.audio.play('thinking');

    // Show internal debate from Claude's analysis
    const deliberationThoughts = analysis.deliberation || [
      "Difficult, very difficult...",
      "I see courage here...",
      "But also loyalty...",
      "Where to put you?"
    ];

    for (const thought of deliberationThoughts) {
      this.showThought(thought);
      await this.wait(2500);

      // Occasional sound effects
      if (Math.random() > 0.6) {
        this.audio.play('difficult');
      }
    }

    // Building to climax
    this.showThought("Yes... yes, I see it now...");
    await this.wait(2000);

    this.hat.classList.remove('thinking');
    this.audio.stop('thinking');
  }

  async announceHouse(house, reasoning) {
    console.log('Announcing house:', house);

    // Dramatic pause
    this.showThought("Better be...");
    await this.wait(1500);

    // Hide thought bubble
    this.hideThought();
    await this.wait(500);

    // THE SHOUT - Show in thought bubble dramatically
    this.thoughtText.style.fontSize = '2.5rem';
    this.thoughtText.style.fontWeight = 'bold';
    this.thoughtText.style.color = this.getHouseColor(house);
    this.showThought(house.toUpperCase() + "!");

    // Play house fanfare
    this.audio.playHouseFanfare(house);

    // Wait for dramatic effect
    await this.wait(2000);

    // Hide thought bubble
    this.hideThought();

    // Reset thought bubble styling
    this.thoughtText.style.fontSize = '';
    this.thoughtText.style.fontWeight = '';
    this.thoughtText.style.color = '';
  }

  async handleError(error) {
    this.hat.classList.remove('thinking');
    this.audio.stop('thinking');

    const errorMessages = [
      "Oh my! The magic is acting up...",
      "*adjusts brim thoughtfully*",
      "Even ancient artifacts have their moments...",
      "Perhaps we should try that again?"
    ];

    for (const msg of errorMessages) {
      this.showThought(msg);
      await this.wait(2000);
    }

    this.hideThought();
  }

  getHouseColor(house) {
    const colors = {
      gryffindor: '#D3A625',
      hufflepuff: '#FFD800',
      ravenclaw: '#946B2D',
      slytherin: '#5D5D5D'
    };
    return colors[house.toLowerCase()] || '#D3A625';
  }

  showThought(text) {
    this.thoughtText.textContent = text;
    this.thoughtBubble.classList.remove('hidden');
  }

  hideThought() {
    this.thoughtBubble.classList.add('hidden');
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Will be initialized in app.js
window.SortingCeremony = SortingCeremony;
