// House Reveal Animation and Effects

class HouseReveal {
  constructor() {
    this.revealElement = document.getElementById('house-reveal');
    this.houseNameElement = document.getElementById('house-name');
    this.houseQuoteElement = document.getElementById('house-quote');
    this.houseCrestElement = document.getElementById('house-crest');
    this.reasoningElement = document.getElementById('reasoning');

    // House data
    this.houseData = {
      gryffindor: {
        crest: '🦁',
        quote: 'Where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.',
        colors: ['#740001', '#D3A625']
      },
      hufflepuff: {
        crest: '🦡',
        quote: 'You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil.',
        colors: ['#FFD800', '#000000']
      },
      ravenclaw: {
        crest: '🦅',
        quote: 'Or yet in wise old Ravenclaw, if you\'ve a ready mind, where those of wit and learning, will always find their kind.',
        colors: ['#0E1A40', '#946B2D']
      },
      slytherin: {
        crest: '🐍',
        quote: 'Or perhaps in Slytherin, you\'ll make your real friends, those cunning folk use any means to achieve their ends.',
        colors: ['#1A472A', '#5D5D5D']
      }
    };
  }

  async reveal(house, reasoning, transformedImage = null) {
    const houseKey = house.toLowerCase();
    const data = this.houseData[houseKey];

    if (!data) {
      console.error('Invalid house:', house);
      return;
    }

    console.log('Revealing house:', house);

    // Set house class for styling
    this.revealElement.className = `house-reveal ${houseKey}`;

    // Set content
    this.houseNameElement.textContent = house;
    this.houseQuoteElement.textContent = data.quote;
    this.houseCrestElement.textContent = data.crest;
    this.reasoningElement.textContent = reasoning;

    // Display transformed image if available
    console.log('Reveal received transformedImage:', transformedImage);
    if (transformedImage && transformedImage.success) {
      console.log('Showing transformed image!');
      this.showTransformedImage(transformedImage);
    } else {
      console.log('No transformed image to show:', transformedImage);
    }

    // Show reveal
    this.revealElement.classList.remove('hidden');

    // Create particle effects
    this.createHouseEffects(data.colors);

    // Scroll to reveal if needed
    setTimeout(() => {
      this.revealElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  hide() {
    this.revealElement.classList.add('hidden');

    // Hide transformed image container
    const imageContainer = document.getElementById('transformed-image-container');
    if (imageContainer) {
      imageContainer.classList.add('hidden');
    }
  }

  showTransformedImage(transformedImage) {
    console.log('Displaying transformed house-themed image');

    // Get the existing container and image element
    const imageContainer = document.getElementById('transformed-image-container');
    const img = document.getElementById('transformed-image');
    const title = imageContainer.querySelector('.transformed-image-title');

    if (!imageContainer || !img) {
      console.error('Image container elements not found!');
      return;
    }

    // Set the image source
    img.src = `data:${transformedImage.mimeType};base64,${transformedImage.imageData}`;

    // Update title
    if (title) {
      title.textContent = transformedImage.isOriginal ? 'What I Sorted' : 'Your Magical Transformation';
    }

    // Show the container
    imageContainer.classList.remove('hidden');

    console.log('Image displayed successfully!');
  }

  createHouseEffects(colors) {
    console.log('Creating particle effects with colors:', colors);

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        this.createParticle(colors);
      }, i * 50); // Stagger particle creation
    }
  }

  createParticle(colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + 'vw';

    // Random color from house colors
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;

    // Random size
    const size = Math.random() * 10 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation delay
    particle.style.animationDelay = Math.random() * 0.5 + 's';

    // Add to document
    document.body.appendChild(particle);

    // Remove after animation
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }

  // Create sparkle effect around an element
  createSparkles(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.textContent = '✨';
      sparkle.style.position = 'fixed';
      sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
      sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';

      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 1000);
    }
  }
}

// Add sparkle fade animation
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkle-fade {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-50px) scale(0);
    }
  }
`;
document.head.appendChild(style);

// Create global instance
window.houseReveal = new HouseReveal();
