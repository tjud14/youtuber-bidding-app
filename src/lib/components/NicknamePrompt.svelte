<script>
  import { fetchApi } from '$lib/utils/api';
  import { isAuthenticated, hasSetNickname } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { checkNicknameAvailability } from '$lib/utils/nickname-checker';
  import { containsProfanity, suggestCleanAlternative } from '$lib/utils/profanity-filter';
  
  export let show = false;
  export let user = null;
  export let onClose = () => {}; // Default empty function if not provided
  
  let nickname = '';
  let submitting = false;
  let error = '';
  let redirectUrl = '/';
  let nicknameAvailable = null;
  let checkingNickname = false;
  let currentNickname = '';
  let hasProfanity = false;
  let nicknameSuggestion = '';
  
  // Watch hasSetNickname store and close modal when it becomes true
  $: if ($hasSetNickname && show) {
    console.log('Nickname has been set, closing prompt');
    show = false;
    onClose(); // Call the onClose callback
  }
  
  // Function to close the modal and proceed
  function closeAndProceed() {
    console.log('Closing nickname prompt and proceeding');
    hasSetNickname.set(true);
    show = false;
    onClose(); // Call the onClose callback
    goto(redirectUrl);
  }
  
  onMount(() => {
    // Initialize nickname with user's current nickname if available
    if (user && user.nickname) {
      nickname = user.nickname;
      currentNickname = user.nickname;
    } else if (user && user.full_name) {
      // Suggest user's full name as nickname if available
      nickname = user.full_name;
    }
    
    // Get redirect URL from query params if available
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('redirect')) {
      redirectUrl = urlParams.get('redirect');
    }
  });
  
  // Check nickname availability and profanity when nickname changes
  $: {
    if (nickname && nickname.trim()) {
      // Check for profanity
      hasProfanity = containsProfanity(nickname);
      if (hasProfanity) {
        nicknameSuggestion = suggestCleanAlternative(nickname);
        nicknameAvailable = null;
        checkingNickname = false;
      } else if (nickname !== currentNickname) {
        // Only check availability if no profanity and nickname changed
        nicknameSuggestion = '';
        checkingNickname = true;
        checkNicknameAvailability(nickname, (result) => {
          checkingNickname = false;
          if (result) {
            nicknameAvailable = result.available;
          }
        });
      } else if (nickname === currentNickname) {
        // If user hasn't changed their nickname, it's available (to them)
        nicknameAvailable = true;
        checkingNickname = false;
        nicknameSuggestion = '';
      }
    } else {
      nicknameAvailable = null;
      checkingNickname = false;
      hasProfanity = false;
      nicknameSuggestion = '';
    }
  }
  
  async function handleSubmit() {
    if (!nickname.trim()) {
      error = 'Please enter a nickname';
      return;
    }
    
    // Check for profanity
    if (hasProfanity) {
      error = 'Your nickname contains inappropriate language. Please choose a different nickname.';
      return;
    }
    
    if (nicknameAvailable === false) {
      error = 'This nickname is already taken. Please choose another one.';
      return;
    }
    
    submitting = true;
    error = '';
    
    try {
      // Update user's nickname
      await fetchApi('users/update_profile/', {
        method: 'POST',
        body: JSON.stringify({
          nickname: nickname.trim()
        })
      });
      
      // Try to update authentication store with new nickname
      try {
        await isAuthenticated.check();
      } catch (e) {
        console.error('Error checking authentication after nickname update:', e);
        // Continue anyway
      }
      
      // Close the modal and proceed regardless of backend response
      closeAndProceed();
    } catch (e) {
      error = e.message || 'Failed to update nickname';
      submitting = false;
    }
  }
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-4 text-2xl font-bold text-blue-600">Choose Your Display Name</h2>
      
      <p class="mb-6 text-gray-600">
        This nickname will be visible to other users when you place bids. 
        It helps other bidders recognize you while keeping your email private.
      </p>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label for="nickname" class="mb-1 block text-sm font-medium text-gray-700">
            Your Nickname
          </label>
          <div class="relative">
            <input
              type="text"
              id="nickname"
              bind:value={nickname}
              placeholder="Choose a nickname"
              class="w-full rounded-lg border border-gray-300 p-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
              {hasProfanity ? 'border-red-500' : ''}
              {nicknameAvailable === false ? 'border-red-500' : ''}
              {!hasProfanity && nicknameAvailable === true ? 'border-green-500' : ''}"
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
            <p class="mt-1 text-sm text-red-500">This nickname is already taken. Please choose another one.</p>
          {/if}
          
          {#if error}
            <p class="mt-1 text-sm text-red-600">{error}</p>
          {/if}
        </div>
        
        <div class="mt-2 flex items-center justify-end space-x-3">
          <button
            type="button"
            on:click={closeAndProceed}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Skip for Now
          </button>
                        <button
            type="submit"
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400"
            disabled={submitting || nicknameAvailable === false || checkingNickname || hasProfanity}
          >
            {submitting ? 'Saving...' : 'Save Nickname'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}