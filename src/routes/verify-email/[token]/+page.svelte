
<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib/utils/api';
  
    let loading = true;
    let success = false;
    let error = null;
  
    onMount(async () => {
      try {
        const token = $page.params.token;
        console.log("Verifying email with token:", token);
        
        // Call the backend verification endpoint
        const response = await fetchApi(`verify-email/${token}/`);
        console.log("Verification response:", response);
        
        success = true;
        loading = false;
        
        // Redirect to login after a short delay
        setTimeout(() => {
          goto('/login');
        }, 3000);
      } catch (e) {
        console.error("Email verification failed:", e);
        error = e.message || "Verification failed. The link may be invalid or expired.";
        loading = false;
      }
    });
  </script>
  
  <div class="min-h-screen alaska-bg flex items-center justify-center p-4">
    <div class="bg-white bg-opacity-95 rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-600">Email Verification</h1>
      
      {#if loading}
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p class="mt-4 text-gray-600">Verifying your email...</p>
        </div>
      {:else if success}
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="mt-3 text-xl font-medium text-gray-900">Email Verified Successfully!</h3>
          <p class="mt-2 text-gray-500">Your email has been verified. You'll be redirected to login shortly.</p>
          <div class="mt-4">
            <a href="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Go to Login
            </a>
          </div>
        </div>
      {:else if error}
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 class="mt-3 text-xl font-medium text-gray-900">Verification Failed</h3>
          <p class="mt-2 text-sm text-red-600">{error}</p>
          <div class="mt-4">
            <a href="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Go to Login
            </a>
          </div>
        </div>
      {/if}
    </div>
  </div>