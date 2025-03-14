<script>
  import { fetchApi } from '$lib/utils/api';
  import { isAuthenticated } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { containsProfanity, suggestCleanAlternative } from '$lib/utils/profanity-filter';
  
  let user = null;
  let nickname = '';
  let email = '';
  let loading = true;
  let submitting = false;
  let error = '';
  let successMessage = '';
  let hasProfanity = false;
  let suggestion = '';
  
  // Notification preferences
  let outbidNotificationsEnabled = false;
  let winNotificationsEnabled = false;
  
  onMount(async () => {
    if (!$isAuthenticated) {
      goto('/login?redirect=/profile');
      return;
    }
    
    try {
      user = await fetchApi('users/me/');
      nickname = user.nickname || '';
      email = user.email || '';
      
      // Set notification preferences from user data
      // Assuming these fields exist or are added to your user model
      outbidNotificationsEnabled = user.outbid_notifications_enabled || false;
      winNotificationsEnabled = user.win_notifications_enabled || false;
      
      loading = false;
    } catch (e) {
      console.error('Error loading user profile:', e);
      error = 'Failed to load your profile. Please try again.';
      loading = false;
    }
  });
  
  // Check for profanity as user types and generate suggestion if needed
  $: {
    hasProfanity = containsProfanity(nickname);
    if (hasProfanity && nickname.trim()) {
      suggestion = suggestCleanAlternative(nickname);
    } else {
      suggestion = '';
    }
  }
  
  // Function to use the suggested alternative
  function useSuggestion() {
    if (suggestion) {
      nickname = suggestion;
    }
  }
  
  async function updateProfile() {
    // Double-check for profanity before submission
    if (containsProfanity(nickname)) {
      error = 'Your nickname contains inappropriate language. Please choose a different nickname.';
      return;
    }
    
    if (!nickname.trim()) {
      error = 'Please enter a nickname';
      return;
    }
    
    submitting = true;
    error = '';
    successMessage = '';
    
    try {
      // Prepare the update data
      const updateData = {
        nickname: nickname.trim(),
        outbid_notifications_enabled: outbidNotificationsEnabled,
        win_notifications_enabled: winNotificationsEnabled
      };
      
      // Update user's profile
      const response = await fetchApi('users/update_profile/', {
        method: 'POST',
        body: JSON.stringify(updateData)
      });
      
      // Update local user data
      user = response;
      
      // Update authentication store to reflect the changes
      await isAuthenticated.check();
      
      successMessage = 'Your profile has been updated successfully!';
    } catch (e) {
      console.error('Error updating profile:', e);
      error = e.message || 'Failed to update your profile. Please try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<div class="alaska-bg min-h-screen">
  <div class="container mx-auto p-8">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-6 text-3xl font-bold text-white drop-shadow-lg">Your Profile</h1>
      
      {#if loading}
        <div class="rounded-lg bg-white bg-opacity-95 p-8 shadow-lg">
          <div class="flex justify-center">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      {:else if user}
        <div class="rounded-lg bg-white bg-opacity-95 p-8 shadow-lg">
          {#if successMessage}
            <div class="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
              <p>{successMessage}</p>
            </div>
          {/if}
          
          {#if error}
            <div class="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
              <p>{error}</p>
            </div>
          {/if}
          
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Account Information</h2>
            <p class="mt-2 text-gray-600">
              Email: <span class="font-medium">{email}</span>
            </p>
          </div>
          
          <form on:submit|preventDefault={updateProfile} class="space-y-6">
            <div>
              <label for="nickname" class="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <div class="mt-1">
                <input
                  id="nickname"
                  type="text"
                  bind:value={nickname}
                  class="w-full rounded-md border {hasProfanity ? 'border-red-500' : 'border-gray-300'} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Choose how you'll appear to other users"
                />
                {#if hasProfanity}
                  <div class="mt-1 rounded-md bg-red-50 p-3">
                    <p class="text-sm text-red-600">
                      Your nickname contains inappropriate language. Please choose a different nickname.
                    </p>
                    {#if suggestion && suggestion !== nickname}
                      <div class="mt-2">
                        <p class="text-sm text-gray-700">Suggested alternative:</p>
                        <div class="mt-1 flex">
                          <span class="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                            {suggestion}
                          </span>
                          <button
                            type="button"
                            class="rounded-r-md border border-l-0 border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            on:click={useSuggestion}
                          >
                            Use this
                          </button>
                        </div>
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
              <p class="mt-1 text-sm text-gray-500">
                This name will be displayed when you place bids or interact with other users.
              </p>
            </div>
            
            <!-- Notification Preferences Section -->
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 class="mb-3 text-lg font-medium text-gray-800">Email Notification Preferences</h3>
              
              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    id="outbidNotifications"
                    type="checkbox"
                    bind:checked={outbidNotificationsEnabled}
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label for="outbidNotifications" class="ml-2 block text-sm text-gray-700">
                    Receive outbid notifications
                    <p class="text-xs text-gray-500">Get an email when someone outbids you in an auction</p>
                  </label>
                </div>
                
                <div class="flex items-center">
                  <input
                    id="winNotifications"
                    type="checkbox"
                    bind:checked={winNotificationsEnabled}
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label for="winNotifications" class="ml-2 block text-sm text-gray-700">
                    Receive auction win notifications
                    <p class="text-xs text-gray-500">Get an email when you win an auction</p>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button
                type="submit"
                class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={submitting || hasProfanity}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      {/if}
    </div>
  </div>
</div>