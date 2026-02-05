// Webcam Manager for capturing objects to sort

class WebcamManager {
  constructor() {
    this.stream = null;
    this.video = null;
    this.onCapture = null;
  }

  async start(onCapture) {
    this.onCapture = onCapture;

    // Create video element
    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.video.playsInline = true; // Important for iOS
    this.video.style.width = '100%';
    this.video.style.maxWidth = '500px';
    this.video.style.borderRadius = '15px';

    try {
      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Use front camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      this.video.srcObject = this.stream;

      // Show video in preview area
      const preview = document.getElementById('preview');
      preview.innerHTML = '';
      preview.appendChild(this.video);
      preview.classList.remove('hidden');

      // Add capture button
      const captureBtn = document.createElement('button');
      captureBtn.textContent = '📸 Capture & Sort!';
      captureBtn.className = 'magic-button large';
      captureBtn.onclick = () => this.capture();
      preview.appendChild(captureBtn);

      // Add cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.className = 'secondary-button';
      cancelBtn.onclick = () => this.stop();
      preview.appendChild(cancelBtn);

      console.log('Webcam started successfully');

    } catch (error) {
      console.error('Camera access error:', error);

      // Show user-friendly error
      const preview = document.getElementById('preview');
      preview.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <p style="font-size: 3rem; margin-bottom: 20px;">📸</p>
          <p style="font-size: 1.3rem; margin-bottom: 20px; color: var(--parchment);">
            Camera access is needed to sort objects!
          </p>
          <p style="font-size: 1rem; color: var(--stone-gray);">
            Please allow camera permissions and try again.
          </p>
          <button onclick="window.webcamManager.stop()" class="magic-button" style="margin-top: 20px;">
            Go Back
          </button>
        </div>
      `;
      preview.classList.remove('hidden');
    }
  }

  capture() {
    if (!this.video) return;

    console.log('Capturing image from webcam...');

    // Create canvas to capture frame
    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.video, 0, 0);

    // Convert to blob
    canvas.toBlob((blob) => {
      // Stop camera
      this.stop();

      // Show captured image in preview
      const preview = document.getElementById('preview');
      preview.innerHTML = '';

      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      img.style.maxWidth = '100%';
      img.style.maxHeight = '400px';
      img.style.borderRadius = '15px';
      preview.appendChild(img);

      // Create file from blob
      const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });

      // Trigger callback
      if (this.onCapture) {
        this.onCapture(file);
      }
    }, 'image/jpeg', 0.95);
  }

  stop() {
    console.log('Stopping webcam...');

    // Stop all tracks
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Remove video element
    if (this.video) {
      this.video.srcObject = null;
      this.video = null;
    }

    // Hide preview
    const preview = document.getElementById('preview');
    preview.innerHTML = '';
    preview.classList.add('hidden');

    // Show drop zone again
    const dropZone = document.getElementById('drop-zone');
    dropZone.classList.remove('hidden');
  }
}

// Create global instance
window.webcamManager = new WebcamManager();
