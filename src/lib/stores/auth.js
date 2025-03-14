import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { fetchApi } from '../utils/api';

// Create writable stores for authentication and nickname status
export const hasSetNickname = writable(false);

// Create a persistent authentication store
function createAuthStore() {
  const { subscribe, set, update } = writable(false);
  
  return {
    subscribe,
    set: (value) => {
      if (browser) {
        localStorage.setItem('isAuthenticated', String(value));
      }
      set(value);
    },
    
    check: async () => {
      try {
        // Use users/me endpoint to verify authentication
        const response = await fetchApi('users/me/', {
          method: 'GET'
        });
        
        console.log('Auth check successful:', response);
        set(true);
        
        // Check if user has set a nickname and update the store
        if (response.nickname) {
          hasSetNickname.set(true);
          console.log('User has nickname:', response.nickname);
        } else {
          hasSetNickname.set(false);
          console.log('User does not have a nickname');
        }
        
        return true;
      } catch (e) {
        console.log('Auth check failed, not authenticated:', e);
        set(false);
        hasSetNickname.set(false);
        
        // Also clear localStorage to ensure consistency
        if (browser) {
          localStorage.removeItem('isAuthenticated');
        }
        
        return false;
      }
    },
    
    logout: async () => {
      try {
        // Call the logout endpoint
        await fetchApi('logout/', { method: 'POST' });
        
        // Clear authentication state
        set(false);
        hasSetNickname.set(false);
        
        if (browser) {
          // Clear localStorage
          localStorage.removeItem('isAuthenticated');
          
          // Clear cookies
          document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        
        return true;
      } catch (e) {
        console.error('Logout error:', e);
        
        // Even if the API call fails, clear local state
        set(false);
        hasSetNickname.set(false);
        
        if (browser) {
          localStorage.removeItem('isAuthenticated');
          document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        
        return false;
      }
    }
  };
}

export const isAuthenticated = createAuthStore();

// Initialize the store
if (browser) {
  // Check if user was previously authenticated
  const storedAuth = localStorage.getItem('isAuthenticated');
  if (storedAuth === 'true') {
    // Set initial state based on localStorage, but verify with backend
    isAuthenticated.set(true);
  } else {
    // Default to false
    isAuthenticated.set(false);
  }
  
  // Always verify with backend on page load
  isAuthenticated.check().then(authenticated => {
    console.log('Authentication verified:', authenticated);
  });
}