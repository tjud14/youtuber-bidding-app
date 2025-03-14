<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fetchApi } from '$lib/utils/api';
  import { isAuthenticated } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  
  const dispatch = createEventDispatcher();
  let isLoading = false;
  let error = '';
  
  export let buttonText = "Sign in with Google";
  export let redirect = '/';
  
  function handleCallbackResponse(response) {
    // Got the ID token from Google
    isLoading = true;
    error = '';
    
    console.log("Google auth callback received");
    
    // Send to backend for verification
    fetchApi('google-auth/', {
      method: 'POST',
      body: JSON.stringify({
        token: response.credential
      })
    })
    .then(data => {
      // Authentication successful
      $isAuthenticated = true;
      dispatch('success', data);
      
      console.log("Google auth successful, user data:", data.user);
      
      // DIRECT APPROACH: Check if nickname exists
      if (!data.user.nickname) {
        console.log("No nickname set, redirecting to nickname page");
        // Force redirect to set nickname
        const currentPath = window.location.pathname;
        const redirectPath = encodeURIComponent(redirect || currentPath);
        window.location.href = `/set-nickname?redirect=${redirectPath}`;
      } else {
        console.log("Nickname exists, redirecting to:", redirect);
        // Normal redirect
        window.location.href = redirect;
      }
    })
    .catch(err => {
      error = err.message || 'Google authentication failed';
      console.error('Google auth error:', error);
      dispatch('error', { message: error });
    })
    .finally(() => {
      isLoading = false;
    });
  }

  onMount(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize Google Sign-In
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: '920691592499-l5e5eutni9tqu2s2ib097u9bgf2ln31j.apps.googleusercontent.com',
          callback: handleCallbackResponse
        });
        
        // Render the button
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { 
            theme: 'outline',
            size: 'large',
            text: buttonText,
            width: '100%'
          }
        );
      } else {
        console.error("Google Identity Services not loaded properly");
      }
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script on component unmount
      document.head.removeChild(script);
    };
  });
</script>

<div class="w-full">
{#if isLoading}
  <div class="w-full py-2 text-center">
    <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></span>
    <span class="ml-2">Authenticating...</span>
  </div>
{:else}
  <div id="googleSignInButton" class="w-full"></div>
{/if}

{#if error}
  <p class="mt-2 text-sm text-red-600">{error}</p>
{/if}
</div>