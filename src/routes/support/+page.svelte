<script>
  import { onMount, onDestroy } from 'svelte';
  import { isAuthenticated } from '$lib/stores/auth';
  import { messages, loadMessages, sendMessage } from '$lib/stores/messaging';
  import { fetchApi } from '$lib/utils/api';
  import { goto } from '$app/navigation';
  
  let newMessage = '';
  let chatContainer;
  let refreshInterval;
  let loading = true;
  let error = null;
  let user = null;
  let adminMap = {}; // Store admin user details
  
  onMount(async () => {
    if (!$isAuthenticated) {
      return;
    }
    
    try {
      // Fetch current user info
      const userData = await fetchApi('users/me/');
      user = userData;
      
      await loadMessages();
      
      // Extract admin IDs from messages and fetch their details
      const adminIds = [...new Set($messages
        .filter(m => m.sender !== userData.id)
        .map(m => m.sender))];
      
      if (adminIds.length > 0) {
        for (const adminId of adminIds) {
          try {
            // Fetch admin details if not already in cache
            if (!adminMap[adminId]) {
              const adminData = await fetchApi(`users/${adminId}/`);
              adminMap[adminId] = adminData;
              console.log(`Loaded admin data for ID ${adminId}:`, adminData);
            }
          } catch (e) {
            console.warn(`Couldn't load admin data for ID ${adminId}:`, e);
            // Create a fallback entry
            adminMap[adminId] = { nickname: "Support Team", username: "admin" };
          }
        }
      }
      
      scrollToBottom();
      loading = false;
      
      // Auto-refresh messages
      refreshInterval = setInterval(async () => {
        await loadMessages();
        
        // Check for new admins in messages
        const newAdminIds = [...new Set($messages
          .filter(m => m.sender !== userData.id && !adminMap[m.sender])
          .map(m => m.sender))];
        
        for (const adminId of newAdminIds) {
          try {
            const adminData = await fetchApi(`users/${adminId}/`);
            adminMap[adminId] = adminData;
          } catch (e) {
            adminMap[adminId] = { nickname: "Support Team", username: "admin" };
          }
        }
        
        scrollToBottom();
      }, 10000);
    } catch (e) {
      console.error('Error loading messages:', e);
      error = e.message || 'Failed to load messages';
      loading = false;
    }
  });
  
  onDestroy(() => {
    if (refreshInterval) clearInterval(refreshInterval);
  });
  
  function scrollToBottom() {
    if (chatContainer) {
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 100);
    }
  }
  
  function getAdminInfo(adminId) {
    const admin = adminMap[adminId];
    if (admin) {
      return admin.nickname || admin.username || "Support Team";
    }
    return "Support Team"; // Fallback
  }
  
  async function handleSend() {
    if (!newMessage.trim()) return;
    
    try {
      console.log("Sending message:", newMessage);
      await sendMessage(newMessage);
      newMessage = '';
      await loadMessages();
      scrollToBottom();
    } catch (e) {
      console.error('Error sending message:', e);
      // Show an error to the user
      error = e.message || 'Failed to send message';
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }
  
  function handleLoginClick() {
    goto('/login?redirect=/support');
  }
</script>

<div class="alaska-bg">
  <div class="container mx-auto min-h-screen p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-6 text-4xl font-bold text-white drop-shadow-lg">Support</h1>
      
      <div class="bg-white bg-opacity-95 rounded-lg shadow-lg p-6">
        {#if $isAuthenticated}
          <div class="h-[500px] flex flex-col">
            {#if loading}
              <div class="flex-grow flex items-center justify-center">
                <div class="text-center">
                  <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
                  <p class="mt-2 text-gray-600">Loading messages...</p>
                </div>
              </div>
            {:else if error}
              <div class="flex-grow flex items-center justify-center">
                <div class="rounded-lg bg-red-50 p-4 text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            {:else}
              <div bind:this={chatContainer} class="flex-grow overflow-y-auto p-4">
                {#if $messages.length === 0}
                  <div class="flex h-full items-center justify-center">
                    <div class="text-center text-gray-500">
                      <svg class="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <div class="text-center">
                        <p class="text-xl font-bold">Hey welcome to support!</p>
                        <p class="text-lg mt-2">Shoot me a message and I'll get back to you as soon as possible.</p>
                      </div>
                    </div>
                  </div>
                {:else}
                  {#each $messages as message}
                    {@const isCurrentUser = message.sender === user.id}
                    <div class="mb-4 {isCurrentUser ? 'flex justify-end' : ''}">
                      <!-- Message bubble with name label -->
                      <div class="flex flex-col max-w-[75%]">
                        <!-- Name label above the message -->
                        <span class="text-xs font-medium {isCurrentUser ? 'text-right mr-2 text-amber-700' : 'text-gray-600 ml-2'} mb-1">
                          {isCurrentUser ? (user?.nickname || user?.username || 'You') : getAdminInfo(message.sender)}
                        </span>
                        
                        <!-- Message bubble -->
                        <div class="{isCurrentUser ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white' : 'bg-gray-200'} rounded-lg px-4 py-2 shadow">
                          <p class="whitespace-pre-wrap">{message.content}</p>
                          <p class="mt-1 text-right text-xs opacity-75">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  {/each}
                {/if}
              </div>
              
              <div class="border-t pt-4">
                <div class="flex items-center">
                  <textarea
                    bind:value={newMessage}
                    on:keydown={handleKeydown}
                    placeholder="Type your message here..."
                    class="flex-grow rounded-lg border border-gray-300 p-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    rows="3"
                  ></textarea>
                  <button
                    on:click={handleSend}
                    class="ml-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-3 font-medium text-white shadow-md transition-all hover:from-amber-600 hover:to-yellow-700 active:scale-95"
                  >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            {/if}
          </div>
        {:else}
          <div class="text-center py-12">
            <h2 class="text-2xl font-semibold mb-4">Please Log In</h2>
            <p class="mb-6 text-gray-600">You need to be logged in to use the support chat.</p>
            <button 
              on:click={handleLoginClick}
              class="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium rounded-lg shadow-md hover:from-amber-600 hover:to-yellow-700 transition-all"
            >
              Log In
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>