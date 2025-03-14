<script>
  import { fetchApi } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/stores/auth';
  import GoogleSignIn from '$lib/components/GoogleSignIn.svelte';
  import { onMount } from 'svelte';
  
  let email = '';
  let password = '';
  let error = '';
  let successMessage = '';
  let isLoading = false;
  let redirectUrl = '/';
  let needsVerification = false;
  let isResendingVerification = false;
  let verificationEmail = '';
  let verificationSent = false;

  onMount(() => {
    console.log("Login page mounted");
    
    // Get redirect URL from query params
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('redirect')) {
        redirectUrl = urlParams.get('redirect');
        console.log("Redirect URL set to:", redirectUrl);
      }
      
      // Check if we just verified email
      if (urlParams.has('verified') && urlParams.get('verified') === 'true') {
        successMessage = "Your email has been verified successfully! You can now log in.";
      }
    }
  });

  async function handleLogin() {
    if (!email || !password) {
      error = 'Please enter both email and password';
      return;
    }

    error = '';
    isLoading = true;
    needsVerification = false;
    console.log("Attempting login for:", email);

    try {
      const response = await fetchApi('login/', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      // Successfully logged in
      $isAuthenticated = true;
      console.log("Login successful, user data:", response.user);
      
      // Check if nickname exists
      if (!response.user.nickname) {
        console.log("No nickname set, redirecting to set-nickname");
        
        // Use explicit window.location for most reliable redirect
        window.location.href = `/set-nickname?redirect=${encodeURIComponent(redirectUrl)}`;
      } else {
        console.log("User has nickname, redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
      }
    } catch (e) {
      console.error("Login error:", e);
      
      // Handle verification error specially
      if (e.message && e.message.includes('verify your email')) {
        needsVerification = true;
        verificationEmail = email;
        error = 'Please verify your email before logging in.';
      } else {
        error = e.message || 'Login failed';
      }
      isLoading = false;
    }
  }
  
  async function resendVerification() {
    if (!verificationEmail) {
      verificationEmail = email;
    }
    
    if (!verificationEmail) {
      error = 'Email is required';
      return;
    }
    
    isResendingVerification = true;
    error = '';
    
    try {
      await fetchApi('resend-verification/', {
        method: 'POST',
        body: JSON.stringify({
          email: verificationEmail.trim()
        })
      });
      
      verificationSent = true;
      successMessage = `Verification email sent to ${verificationEmail}. Please check your inbox.`;
    } catch (e) {
      error = e.message || 'Failed to resend verification email';
    } finally {
      isResendingVerification = false;
    }
  }
  
  function handleGoogleSuccess(event) {
    console.log("Google login successful, redirecting based on nickname");
    
    // The redirect is handled in GoogleSignIn component
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
  <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
    <h1 class="mb-6 text-center text-2xl font-bold text-gray-900">Login</h1>

    {#if successMessage}
      <div class="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
        <p>{successMessage}</p>
      </div>
    {/if}

    {#if needsVerification}
      <div class="mb-6 rounded-lg bg-blue-50 p-4">
        <h3 class="font-semibold text-blue-700">Email Verification Required</h3>
        <p class="mt-2 text-blue-600">
          Please verify your email address before logging in. Check your inbox for a verification link.
        </p>
        
        {#if verificationSent}
          <p class="mt-2 text-green-600">
            Verification email sent! Please check your inbox.
          </p>
        {:else}
          <div class="mt-3">
            <p class="text-sm text-gray-600">
              Didn't receive the email? We can send it again.
            </p>
            <button
              on:click={resendVerification}
              class="mt-2 inline-flex items-center rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
              disabled={isResendingVerification}
            >
              {#if isResendingVerification}
                <span class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></span>
                Sending...
              {:else}
                Resend Verification Email
              {/if}
            </button>
          </div>
        {/if}
      </div>
    {/if}

    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <!-- Email field -->
      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email" 
          bind:value={email}
          placeholder="Enter your email"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <!-- Password field -->
      <div>
        <label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="Enter your password"
          class="w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <!-- Error message -->
      {#if error && !needsVerification}
        <div class="rounded-r border-l-4 border-red-500 bg-red-50 p-4">
          <p class="text-sm text-red-700">{error}</p>
        </div>
      {/if}

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-white px-2 text-gray-500">Or continue with</span>
      </div>
    </div>

    <!-- Google Sign-In -->
    <div class="mt-2">
      <GoogleSignIn redirect={redirectUrl} on:success={handleGoogleSuccess} />
    </div>

    <!-- Register link -->
    <div class="mt-6 text-center text-sm">
      <p>
        Don't have an account?
        <a href="/register" class="font-medium text-blue-600 hover:text-blue-500">
          Register
        </a>
      </p>
    </div>
  </div>
</div>