<script>
  import { fetchApi } from '$lib/utils/api';
  import { isAuthenticated } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { checkNicknameAvailability } from '$lib/utils/nickname-checker';
  
  export let show = false;
  export let user = null;
  let nickname = '';
  let submitting = false;
  let error = '';
  let redirectUrl = '/';
  let nicknameAvailable = null;
  let checkingNickname = false;
  let currentNickname = '';
  
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
  
  // Check nickname availability when nickname changes
  $: {
    if (nickname && nickname.trim() && nickname !== currentNickname) {
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
    } else {
      nicknameAvailable = null;
      checkingNickname = false;
    }
  }
  
  async function handleSubmit() {
    if (!nickname.trim()) {
      error = 'Please enter a nickname';
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
      
      // Update authentication store with new nickname
      await isAuthenticated.check();
      
      // Redirect user
      goto(redirectUrl);
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
              {nicknameAvailable === false ? 'border-red-500' : ''}
              {nicknameAvailable === true ? 'border-green-500' : ''}"
              required
            />
            
            {#if checkingNickname}
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
          
          {#if nicknameAvailable === false}
            <p class="mt-1 text-sm text-red-500">This nickname is already taken. Please choose another one.</p>
          {/if}
          
          {#if error}
            <p class="mt-1 text-sm text-red-600">{error}</p>
          {/if}
        </div>
        
        <div class="mt-2 flex items-center justify-end space-x-3">
          <button
            type="button"
            on:click={() => goto(redirectUrl)}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Skip for Now
          </button>
          <button
            type="submit"
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400"
            disabled={submitting || nicknameAvailable === false || checkingNickname}
          >
            {submitting ? 'Saving...' : 'Save Nickname'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}