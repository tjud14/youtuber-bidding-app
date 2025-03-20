<script>
  import { fetchApi } from '$lib/utils/api';
  import { isAuthenticated } from '$lib/stores/auth';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { containsProfanity, suggestCleanAlternative } from '$lib/utils/profanity-filter';
  import GlowingEffect from '$lib/components/ui/Glowing-Effect/GlowingEffect.svelte';
  import { fade } from 'svelte/transition';
  
  let user = null;
  let nickname = '';
  let email = '';
  let loading = true;
  let submitting = false;
  let error = '';
  let successMessage = '';
  let hasProfanity = false;
  let suggestion = '';
  let messageTimeout;
  
  // Notification preferences
  let outbidNotificationsEnabled = false;
  let winNotificationsEnabled = false;
  
  // Active tab state
  let activeTab = 'account'; // 'account', 'notifications', 'actions'
  
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
  
  onDestroy(() => {
    // Clear any pending timeouts when component is destroyed
    if (messageTimeout) clearTimeout(messageTimeout);
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
  
  // Clear message after timeout
  function clearMessageAfterDelay(type = 'success', delay = 5000) {
    // Clear any existing timeout
    if (messageTimeout) clearTimeout(messageTimeout);
    
    // Set new timeout
    messageTimeout = setTimeout(() => {
      if (type === 'success') successMessage = '';
      if (type === 'error') error = '';
    }, delay);
  }
  
  async function updateProfile() {
    // Double-check for profanity before submission
    if (containsProfanity(nickname)) {
      error = 'Your nickname contains inappropriate language. Please choose a different nickname.';
      clearMessageAfterDelay('error');
      return;
    }
    
    if (!nickname.trim()) {
      error = 'Please enter a nickname';
      clearMessageAfterDelay('error');
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
      clearMessageAfterDelay('success');
    } catch (e) {
      console.error('Error updating profile:', e);
      error = e.message || 'Failed to update your profile. Please try again.';
      clearMessageAfterDelay('error');
    } finally {
      submitting = false;
    }
  }
</script>

<div class="container mx-auto p-8">
  <h1 class="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">Your Profile</h1>
  
  {#if loading}
    <div class="flex justify-center">
      <div class="h-16 w-16 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></div>
    </div>
  {:else if user}
    <div class="max-w-3xl mx-auto">
      <!-- Tab navigation -->
      <div class="flex mb-6 rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 shadow-lg">
        <button 
          class="flex-1 py-3 px-4 text-white font-medium {activeTab === 'account' ? 'bg-blue-500/80' : 'hover:bg-white/10'} transition-colors"
          on:click={() => activeTab = 'account'}
        >
          Account
        </button>
        <button 
          class="flex-1 py-3 px-4 text-white font-medium {activeTab === 'notifications' ? 'bg-blue-500/80' : 'hover:bg-white/10'} transition-colors"
          on:click={() => activeTab = 'notifications'}
        >
          Notifications
        </button>
        <button 
          class="flex-1 py-3 px-4 text-white font-medium {activeTab === 'actions' ? 'bg-blue-500/80' : 'hover:bg-white/10'} transition-colors"
          on:click={() => activeTab = 'actions'}
        >
          Actions
        </button>
      </div>
      
      <!-- Profile card with glowing effect -->
      <div class="border-border relative rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div class="bg-background backdrop-blur-sm relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-white/30 bg-black/20 p-6 shadow-lg">
          
          {#if successMessage}
            <div transition:fade={{duration: 300}} class="mb-6 rounded-lg bg-green-100/90 p-4 text-green-800">
              <p>{successMessage}</p>
            </div>
          {/if}
          
          {#if error}
            <div transition:fade={{duration: 300}} class="mb-6 rounded-lg bg-red-100/90 p-4 text-red-800">
              <p>{error}</p>
            </div>
          {/if}
          
          <!-- Dynamic content based on active tab -->
          {#if activeTab === 'account'}
            <div class="relative space-y-6">
              <div class="mb-6">
                <h2 class="text-2xl font-semibold text-white mb-4">Account Information</h2>
                <p class="text-white/90 mb-4">
                  Email: <span class="font-medium">{email}</span>
                </p>
                
                <div class="mb-4">
                  <label for="nickname" class="block text-sm font-medium text-white mb-2">
                    Display Name
                  </label>
                  <div class="mt-1">
                    <input
                      id="nickname"
                      type="text"
                      bind:value={nickname}
                      class="w-full rounded-md border {hasProfanity ? 'border-red-400' : 'border-white/20'} p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white/30 backdrop-blur-sm text-white"
                      placeholder="Choose how you'll appear to other users"
                    />
                    {#if hasProfanity}
                      <div class="mt-2 rounded-md bg-red-100/80 backdrop-blur-sm p-3">
                        <p class="text-sm text-red-700">
                          Your nickname contains inappropriate language. Please choose a different nickname.
                        </p>
                        {#if suggestion && suggestion !== nickname}
                          <div class="mt-2">
                            <p class="text-sm text-gray-700">Suggested alternative:</p>
                            <div class="mt-1 flex">
                              <span class="rounded-l-md border border-r-0 border-gray-300 bg-gray-50/90 px-3 py-2 text-sm text-gray-700">
                                {suggestion}
                              </span>
                              <button
                                type="button"
                                class="rounded-r-md border border-l-0 border-blue-500 bg-blue-500/90 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <p class="mt-2 text-sm text-white/80">
                    This name will be displayed when you place bids or interact with other users.
                  </p>
                </div>
              </div>
            </div>
          {:else if activeTab === 'notifications'}
            <div class="relative space-y-6">
              <div>
                <h2 class="text-2xl font-semibold text-white mb-4">Email Notification Preferences</h2>
                
                <div class="space-y-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="outbidNotifications"
                        type="checkbox"
                        bind:checked={outbidNotificationsEnabled}
                        class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="outbidNotifications" class="font-medium text-white">
                        Receive outbid notifications
                      </label>
                      <p class="text-white/70">Get an email when someone outbids you in an auction</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="winNotifications"
                        type="checkbox"
                        bind:checked={winNotificationsEnabled}
                        class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="winNotifications" class="font-medium text-white">
                        Receive auction win notifications
                      </label>
                      <p class="text-white/70">Get an email when you win an auction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {:else if activeTab === 'actions'}
            <div class="relative space-y-6">
              <div>
                <h2 class="text-2xl font-semibold text-white mb-4">Profile Actions</h2>
                <p class="text-white/90 mb-6">
                  Save your changes or reset your preferences.
                </p>
              </div>
            </div>
          {/if}
          
          <!-- Action buttons always visible -->
          <div class="mt-8 flex justify-end gap-4">
            <button
              type="button"
              class="rounded-md bg-white/20 border border-white/30 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 transition-all"
            >
              Reset
            </button>
            <button
              type="button"
              on:click={updateProfile}
              class="rounded-md bg-blue-600/90 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all"
              disabled={submitting || hasProfanity}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Additional styling for this page */
  input, select, textarea {
    @apply backdrop-blur-sm;
  }
  
  /* Make text more readable against the beam background */
  h1, h2, p, label {
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  }
  
  /* Styling for dark backgrounds */
  .bg-background {
    @apply bg-black/20;
  }
  
  .border-border {
    @apply border-white/30;
  }
</style>