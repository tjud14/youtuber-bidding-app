let csrfToken = null;

/**
 * Get CSRF token from the API server
 */
export async function getCsrfToken() {
  if (csrfToken) return csrfToken;

  try {
    const response = await fetch('/api/csrf/', {
      method: 'GET',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get CSRF token: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    csrfToken = data.csrfToken;
    console.log('CSRF token acquired:', csrfToken ? 'SUCCESS' : 'FAILED');
    return csrfToken;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    throw error;
  }
}

/**
 * Fetch data from the API
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
export async function fetchApi(endpoint, options = {}) {
  const url = `/api/${endpoint}`;
  console.log(`Fetching from: ${url}`);
  
  // Ensure we have a CSRF token if making non-GET requests
  if (options.method && options.method !== 'GET' && !csrfToken) {
    await getCsrfToken();
  }
  
  // Prepare fetch options with defaults
  const fetchOptions = {
    method: options.method || 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  
  // Add CSRF token for non-GET requests
  if (fetchOptions.method !== 'GET' && csrfToken) {
    fetchOptions.headers['X-CSRFToken'] = csrfToken;
  }
  
  try {
    const response = await fetch(url, fetchOptions);
    
    // Log detailed information about the response
    console.log(`API response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      // Try to get error details if available
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || JSON.stringify(errorData);
      } catch (e) {
        errorMessage = `${response.status} ${response.statusText}`;
      }
      
      throw new Error(`API Error: ${errorMessage}`);
    }
    
    // Handle no content responses
    if (response.status === 204) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    throw error;
  }
}

/**
 * Post data to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Data to post
 * @returns {Promise<any>} Response data
 */
export async function postApi(endpoint, data) {
  return fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Put data to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Data to put
 * @returns {Promise<any>} Response data
 */
export async function putApi(endpoint, data) {
  return fetchApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete data from the API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
export async function deleteApi(endpoint) {
  return fetchApi(endpoint, {
    method: 'DELETE',
  });
}

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