<script>
  import { fetchApi } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/stores/auth';
  import GoogleSignIn from '$lib/components/GoogleSignIn.svelte';
  import { validatePassword, getPasswordStrength, getStrengthFeedback } from '$lib/utils/password-validator';
  import { checkNicknameAvailability } from '$lib/utils/nickname-checker';
  import { containsProfanity, suggestCleanAlternative } from '$lib/utils/profanity-filter';

  let email = '';
  let username = '';
  let password = '';
  let passwordConfirm = '';
  let nickname = '';
  let fullName = '';
  let error = '';
  let success = '';
  let isLoading = false;
  let passwordVisible = false;
  let passwordStrength = 0;
  let passwordFeedback = { color: 'gray', label: 'Not set' };
  let validationErrors = [];
  let nicknameAvailable = null;
  let checkingNickname = false;
  let hasProfanity = false;
  let nicknameSuggestion = '';

  // Update password strength when password changes
  $: {
    if (password) {
      passwordStrength = getPasswordStrength(password);
      passwordFeedback = getStrengthFeedback(passwordStrength);
      const validation = validatePassword(password);
      validationErrors = validation.errors;
    } else {
      passwordStrength = 0;
      passwordFeedback = { color: 'gray', label: 'Not set' };
      validationErrors = [];
    }
  }

  function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
  }
  
  // Check nickname availability and profanity when nickname changes
  $: {
    if (nickname && nickname.trim()) {
      // Check for profanity
      hasProfanity = containsProfanity(nickname);
      if (hasProfanity) {
        nicknameSuggestion = suggestCleanAlternative(nickname);
      } else {
        nicknameSuggestion = '';
        // Only check availability if no profanity
        checkingNickname = true;
        checkNicknameAvailability(nickname, (result) => {
          checkingNickname = false;
          if (result) {
            nicknameAvailable = result.available;
          }
        });
      }
    } else {
      nicknameAvailable = null;
      hasProfanity = false;
      nicknameSuggestion = '';
    }
  }

  async function handleRegister() {
    if (!email || !password || !passwordConfirm || !nickname) {
      error = 'Please fill in all required fields';
      return;
    }

    if (password !== passwordConfirm) {
      error = 'Passwords do not match';
      return;
    }

    // Validate password strength
    const validation = validatePassword(password);
    if (!validation.isValid) {
      error = 'Password does not meet security requirements';
      validationErrors = validation.errors;
      return;
    }
    
    // Check nickname for profanity
    if (hasProfanity) {
      error = 'Your nickname contains inappropriate language. Please choose a different nickname.';
      return;
    }
    
    // Check nickname availability
    if (nicknameAvailable === false) {
      error = 'This nickname is already taken. Please choose another one.';
      return;
    }

    error = '';
    success = '';
    isLoading = true;

    try {
      // For now we'll bypass captcha for development
      await fetchApi('register/', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim() || undefined, // Optional
          password: password.trim(),
          password_confirm: passwordConfirm.trim(),
          nickname: nickname.trim() || undefined, // Optional
          full_name: fullName.trim() || undefined, // Optional
          captcha_response: 'bypass-for-development'
        }),
      });

      success = 'Registration successful! Please check your email for verification. For now, you can login directly.';
      
      // Clear the form
      email = '';
      username = '';
      password = '';
      passwordConfirm = '';
      nickname = '';
      fullName = '';
      
      // Optional: redirect to login after a delay
      setTimeout(() => {
        goto('/login');
      }, 3000);
    } catch (e) {
      error = e.message || 'Registration failed';
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="alaska-bg">
  <div class="flex min-h-screen items-center justify-center p-4">
    <div class="w-full max-w-md rounded-lg bg-white bg-opacity-95 p-6 shadow-lg">
      <h1 class="mb-6 text-center text-2xl font-bold text-gray-900">Create Your Account</h1>

      {#if success}
        <div class="mb-6 rounded-lg bg-green-50 p-4 text-green-700">
          <p>{success}</p>
        </div>
      {/if}

      <div class="mb-6">
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">Register with Google</span>
          </div>
        </div>
        
        <div class="mt-2">
          <GoogleSignIn buttonText="Sign up with Google" />
        </div>

        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">Or register with email</span>
          </div>
        </div>
      </div>

      <form on:submit|preventDefault={handleRegister} class="space-y-4">
        <div>
          <label for="email" class="mb-1 block text-sm font-medium text-gray-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label for="username" class="mb-1 block text-sm font-medium text-gray-700">
            Username (Optional)
          </label>
          <input
            id="username"
            type="text"
            bind:value={username}
            class="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <p class="mt-1 text-xs text-gray-500">
            If not provided, your email will be used to generate a username.
          </p>
        </div>

        <div>
          <label for="nickname" class="mb-1 block text-sm font-medium text-gray-700">
            Nickname
          </label>
          <div class="relative">
            <input
              id="nickname"
              type="text"
              bind:value={nickname}
              class="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500
              {hasProfanity ? 'border-red-500' : ''}
              {nicknameAvailable === false ? 'border-red-500' : ''}
              {!hasProfanity && nicknameAvailable === true ? 'border-green-500' : ''}"
              disabled={isLoading}
              required
            />
            
            {#if hasProfanity}
              <div class="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            {:else if checkingNickname}
              <div class="absolute right-2 top-1/2 -translate-y-1/2">
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
              </div>
            {:else if nicknameAvailable === true}
              <div class="absolute right-2 top-1/2 -translate-y-1/2 text-green-500">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            {:else if nicknameAvailable === false}
              <div class="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            {/if}
          </div>
          <p class="mt-1 text-xs text-gray-500">
            Your nickname will be visible to other users when you place bids.
          </p>
          
          {#if hasProfanity}
            <div class="mt-1 rounded-md bg-red-50 p-3">
              <p class="text-sm text-red-600">
                Your nickname contains inappropriate language. Please choose a different nickname.
              </p>
              {#if nicknameSuggestion && nicknameSuggestion !== nickname}
                <div class="mt-2">
                  <p class="text-sm text-gray-700">Suggested alternative:</p>
                  <div class="mt-1 flex">
                    <span class="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                      {nicknameSuggestion}
                    </span>
                    <button
                      type="button"
                      class="rounded-r-md border border-l-0 border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      on:click={() => nickname = nicknameSuggestion}
                    >
                      Use this
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          {:else if nicknameAvailable === false}
            <p class="mt-1 text-xs text-red-500">This nickname is already taken. Please choose another one.</p>
          {/if}
        </div>

        <div>
          <label for="fullName" class="mb-1 block text-sm font-medium text-gray-700">
            Full Name (Optional)
          </label>
          <input
            id="fullName"
            type="text"
            bind:value={fullName}
            class="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label for="password" class="mb-1 block text-sm font-medium text-gray-700">
            Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              bind:value={password}
              required
              class="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button 
              type="button"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
              on:click={togglePasswordVisibility}
            >
              {#if passwordVisible}
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              {:else}
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              {/if}
            </button>
          </div>

          <!-- Password strength meter -->
          {#if password}
            <div class="mt-1">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs">Password strength:</span>
                <span class="text-xs font-medium" style="color: {passwordFeedback.color}">
                  {passwordFeedback.label}
                </span>
              </div>
              <div class="h-1.5 w-full bg-gray-200 rounded-full">
                <div class="h-1.5 rounded-full" 
                    style="width: {passwordStrength}%; background-color: {passwordFeedback.color}">
                </div>
              </div>
            </div>
          {/if}

          <!-- Password requirements -->
          <div class="mt-2 text-xs text-gray-600">
            <p class="mb-1 font-semibold">Password must have:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li class={password && password.length >= 8 ? "text-green-500" : ""}>
                At least 8 characters
              </li>
              <li class={password && /[A-Z]/.test(password) ? "text-green-500" : ""}>
                At least one uppercase letter
              </li>
              <li class={password && /[a-z]/.test(password) ? "text-green-500" : ""}>
                At least one lowercase letter
              </li>
              <li class={password && /[0-9]/.test(password) ? "text-green-500" : ""}>
                At least one number
              </li>
              <li class={password && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "text-green-500" : ""}>
                At least one special character
              </li>
            </ul>
          </div>
        </div>

        <div>
          <label for="passwordConfirm" class="mb-1 block text-sm font-medium text-gray-700">
            Confirm Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              id="passwordConfirm"
              type={passwordVisible ? "text" : "password"}
              bind:value={passwordConfirm}
              required
              class="w-full rounded-md border p-2 focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          {#if passwordConfirm && password !== passwordConfirm}
            <p class="mt-1 text-xs text-red-500">Passwords do not match</p>
          {/if}
        </div>

        {#if error}
          <div class="rounded border-l-4 border-red-500 bg-red-50 p-4">
            <p class="text-sm text-red-700">{error}</p>
            {#if validationErrors.length > 0}
              <ul class="mt-2 text-xs text-red-600 list-disc pl-5">
                {#each validationErrors as err}
                  <li>{err}</li>
                {/each}
              </ul>
            {/if}
          </div>
        {/if}

        <button
          type="submit"
          class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        <div class="text-center text-sm">
          <p>
            Already have an account?
            <a href="/login" class="font-medium text-blue-600 hover:text-blue-500">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>