export const fetchApi = async (endpoint, options = {}) => {
  console.log('fetchApi called with:', { endpoint, options });
  
  // IMPORTANT: Use relative path only, never use http://api:8000 directly
  const baseUrl = '/api';
  const url = endpoint.startsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };
  
  try {
    // Always include CSRF token for POST, PUT, PATCH, DELETE
    if (options.method && options.method !== 'GET') {
      const csrfToken = await getCsrfToken();
      if (csrfToken) {
        console.log('Adding CSRF token to request:', csrfToken);
        headers['X-CSRFToken'] = csrfToken;
      }
    }
    
    console.log('Making fetch request to:', url);
    console.log('With credentials:', 'include');
    console.log('Headers:', headers);
    
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // This is critical for sending/receiving cookies
      headers,
    });
    
    // Log the response status and headers
    console.log(`Response status: ${response.status}`);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      // Try to get more detailed error message
      try {
        const errorData = await response.json();
        console.log('Error response data:', errorData);
        if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      } catch (e) {
        // If response isn't JSON, try to get text
        try {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          if (errorText) {
            errorMessage = errorText;
          }
        } catch {
          // If that fails too, just use the status error
        }
      }
      throw new Error(errorMessage);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getCsrfToken = async () => {
  try {
    // First try to get it from cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
      
    if (token) {
      console.log('Found CSRF token in cookies:', token);
      return token;
    }
    
    // If not in cookies, fetch it from the API
    console.log('No CSRF token in cookies, fetching from API');
    const response = await fetch('/api/csrf/', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
    
    const data = await response.json();
    console.log('Received CSRF token from API:', data.csrfToken);
    return data.csrfToken;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return null;
  }
};

// Helper function to debug cookies
export const logCookies = () => {
  console.log('Current cookies:', document.cookie);
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});
  console.log('Parsed cookies:', cookies);
  return cookies;
};