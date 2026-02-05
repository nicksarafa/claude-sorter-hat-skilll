// API Client for communicating with backend

class APIClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  async sortImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`${this.baseURL}/api/sort/image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sort image');
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Transformed Image:', data.transformedImage);
      // Include transformedImage in the returned data
      return {
        ...data.sorting,
        transformedImage: data.transformedImage
      };
    } catch (error) {
      console.error('Error sorting image:', error);
      throw error;
    }
  }

  async sortText(description) {
    try {
      const response = await fetch(`${this.baseURL}/api/sort/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sort text');
      }

      const data = await response.json();
      return data.sorting;
    } catch (error) {
      console.error('Error sorting text:', error);
      throw error;
    }
  }

  async sortURL(url) {
    try {
      const response = await fetch(`${this.baseURL}/api/sort/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sort URL');
      }

      const data = await response.json();
      return data.sorting;
    } catch (error) {
      console.error('Error sorting URL:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', message: error.message };
    }
  }
}

// Create global instance with config
window.apiClient = new APIClient(window.APP_CONFIG ? window.APP_CONFIG.API_BASE_URL : '');
