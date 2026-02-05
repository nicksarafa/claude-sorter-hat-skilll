// Main Application Logic

class SortingHatApp {
  constructor() {
    // Initialize managers
    this.audio = window.audioManager;
    this.api = window.apiClient;
    this.webcam = window.webcamManager;
    this.houseReveal = window.houseReveal;
    this.ceremony = new SortingCeremony(this.audio, this.api);

    // Get UI elements
    this.dropZone = document.getElementById('drop-zone');
    this.preview = document.getElementById('preview');
    this.loading = document.getElementById('loading');
    this.sortingStool = document.getElementById('sorting-stool');
    this.textInputArea = document.getElementById('text-input-area');

    // Initialize
    this.init();
  }

  init() {
    console.log('Initializing Sorting Hat App...');

    // Check if accessing remotely
    this.checkRemoteAccess();

    // Set up event listeners
    this.setupDropZone();
    this.setupButtons();
    this.setupAudioControls();

    // Check backend health
    this.checkBackend();

    console.log('App initialized successfully!');
  }

  checkRemoteAccess() {
    // Show notice if on remote domain and backend is localhost
    const isRemote = window.location.hostname !== 'localhost' &&
                     window.location.hostname !== '127.0.0.1';
    const backendIsLocal = window.APP_CONFIG &&
                          window.APP_CONFIG.API_BASE_URL.includes('localhost');

    if (isRemote && backendIsLocal) {
      const notice = document.getElementById('connection-notice');
      if (notice) {
        notice.classList.remove('hidden');

        // Set up dismiss button
        const dismissBtn = document.getElementById('dismiss-notice');
        if (dismissBtn) {
          dismissBtn.addEventListener('click', () => {
            notice.classList.add('hidden');
            localStorage.setItem('dismissedConnectionNotice', 'true');
          });
        }

        // Auto-dismiss if previously dismissed
        if (localStorage.getItem('dismissedConnectionNotice') === 'true') {
          notice.classList.add('hidden');
        }
      }
    }
  }

  async checkBackend() {
    const health = await this.api.checkHealth();
    if (health.status === 'ok') {
      console.log('✓ Backend is ready:', health.message);
    } else {
      console.warn('⚠ Backend health check failed:', health);
    }
  }

  setupDropZone() {
    // Drag and drop handlers
    this.dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropZone.classList.add('drag-over');
    });

    this.dropZone.addEventListener('dragleave', () => {
      this.dropZone.classList.remove('drag-over');
    });

    this.dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropZone.classList.remove('drag-over');

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleImageFile(files[0]);
      }
    });
  }

  setupButtons() {
    // File input button
    const fileBtn = document.getElementById('file-btn');
    const fileInput = document.getElementById('file-input');

    fileBtn.addEventListener('click', () => {
      fileInput.click();
      this.audio.init(); // Initialize audio on first interaction
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleImageFile(e.target.files[0]);
      }
    });

    // Webcam button
    const webcamBtn = document.getElementById('webcam-btn');
    webcamBtn.addEventListener('click', () => {
      this.startWebcam();
      this.audio.init();
    });

    // Text input button
    const textBtn = document.getElementById('text-btn');
    textBtn.addEventListener('click', () => {
      this.showTextInput();
      this.audio.init();
    });

    // Text input controls
    const textSortBtn = document.getElementById('text-sort-btn');
    textSortBtn.addEventListener('click', () => {
      this.handleTextSort();
    });

    const textCancelBtn = document.getElementById('text-cancel-btn');
    textCancelBtn.addEventListener('click', () => {
      this.hideTextInput();
    });

    // Sort again button
    const sortAgainBtn = document.getElementById('sort-again-btn');
    sortAgainBtn.addEventListener('click', () => {
      this.reset();
    });
  }

  setupAudioControls() {
    const muteBtn = document.getElementById('mute-btn');
    muteBtn.addEventListener('click', () => {
      const isMuted = this.audio.toggleMute();
      muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  async handleImageFile(file) {
    console.log('Handling image file:', file.name);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file!');
      return;
    }

    // Show preview
    this.showImagePreview(file);

    // Hide drop zone
    this.dropZone.classList.add('hidden');

    // Start sorting after a brief delay
    setTimeout(() => {
      this.sortImage(file);
    }, 1000);
  }

  showImagePreview(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.preview.innerHTML = '';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'Image to sort';

      this.preview.appendChild(img);
      this.preview.classList.remove('hidden');
    };

    reader.readAsDataURL(file);
  }

  async sortImage(file) {
    console.log('Starting image sorting ceremony...');

    try {
      // Hide preview and stool
      this.preview.classList.add('hidden');
      this.sortingStool.classList.add('hidden');

      // Show loading
      this.showLoading();

      // Perform the ceremony
      const result = await this.ceremony.performSorting(file, 'image');

      // Hide loading
      this.hideLoading();

      // Reveal house with transformed image
      await this.houseReveal.reveal(result.house, result.reasoning, result.transformedImage);

    } catch (error) {
      console.error('Sorting failed:', error);
      this.hideLoading();
      this.showError(error.message);
    }
  }

  startWebcam() {
    console.log('Starting webcam...');

    // Hide drop zone
    this.dropZone.classList.add('hidden');

    // Start webcam with callback
    this.webcam.start((capturedFile) => {
      this.sortImage(capturedFile);
    });
  }

  showTextInput() {
    console.log('Showing text input...');

    // Hide drop zone
    this.dropZone.classList.add('hidden');

    // Show text input area
    this.textInputArea.classList.remove('hidden');

    // Focus on textarea
    document.getElementById('text-description').focus();
  }

  hideTextInput() {
    this.textInputArea.classList.add('hidden');
    this.dropZone.classList.remove('hidden');

    // Clear textarea
    document.getElementById('text-description').value = '';
  }

  async handleTextSort() {
    const description = document.getElementById('text-description').value.trim();

    if (!description) {
      alert('Please enter a description!');
      return;
    }

    console.log('Starting text sorting ceremony...');

    try {
      // Hide text input
      this.textInputArea.classList.add('hidden');
      this.sortingStool.classList.add('hidden');

      // Show loading
      this.showLoading();

      // Perform the ceremony
      const result = await this.ceremony.performSorting(description, 'text');

      // Hide loading
      this.hideLoading();

      // Reveal house
      await this.houseReveal.reveal(result.house, result.reasoning);

    } catch (error) {
      console.error('Sorting failed:', error);
      this.hideLoading();
      this.showError(error.message);
    }
  }

  showLoading() {
    this.loading.classList.remove('hidden');
  }

  hideLoading() {
    this.loading.classList.add('hidden');
  }

  showError(message) {
    // Detect connection errors
    const isConnectionError = message && (
      message.includes('fetch') ||
      message.includes('network') ||
      message.includes('Failed to fetch') ||
      message.includes('NetworkError') ||
      message.includes('load')
    );

    let errorMessages;

    if (isConnectionError && window.location.hostname !== 'localhost') {
      // Remote access attempting to connect to localhost
      errorMessages = [
        "Oh my! I sense a disturbance in the magical connection...",
        "It appears you're accessing this from afar,",
        "but the backend server is running locally.",
        "",
        "To use this remotely, you'll need to:",
        "1. Deploy the backend to Railway or Render",
        "2. Update frontend/config.js with the backend URL",
        "3. Redeploy to Surge",
        "",
        "See DEPLOYMENT.md for instructions! ✨"
      ];
    } else if (isConnectionError) {
      errorMessages = [
        "The magical connection seems broken...",
        "Make sure the backend server is running:",
        "npm start",
        "",
        "Then try again! ✨"
      ];
    } else {
      errorMessages = [
        "The magic seems to be unstable...",
        message || "Something went wrong!",
        "Please try again!"
      ];
    }

    let index = 0;
    const showNext = () => {
      if (index < errorMessages.length) {
        this.ceremony.showThought(errorMessages[index]);
        index++;
        setTimeout(showNext, 2500);
      } else {
        this.ceremony.hideThought();
        this.reset();
      }
    };

    showNext();
  }

  reset() {
    console.log('Resetting app...');

    // Hide all sections
    this.preview.classList.add('hidden');
    this.loading.classList.add('hidden');
    this.textInputArea.classList.add('hidden');
    this.houseReveal.hide();

    // Show drop zone and stool
    this.dropZone.classList.remove('hidden');
    this.sortingStool.classList.remove('hidden');

    // Clear preview
    this.preview.innerHTML = '';

    // Clear text input
    document.getElementById('text-description').value = '';

    // Hide thought bubble
    this.ceremony.hideThought();

    // Reset file input
    document.getElementById('file-input').value = '';
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SortingHatApp();

  // Play background music on first user interaction
  document.body.addEventListener('click', () => {
    window.audioManager.playMusic();
  }, { once: true });
});
