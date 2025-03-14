<script>
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import { isAuthenticated } from '$lib/stores/auth';
  import { messages, loadUserChat, sendMessage } from '$lib/stores/messaging';
  import { goto } from '$app/navigation';
  import { fetchApi } from '$lib/utils/api';
  
  let userId;
  let user = null;
  let adminUser = null;
  let adminMap = {}; // Store admin details for multiple admins
  let newMessage = '';
  let chatContainer;
  let refreshInterval;
  let loading = true;
  let error = null;
  let sendingMessage = false;
  let isWinner = false; // Flag for if this user is an auction winner
  let wonItems = []; // Items the user has won
  
  onMount(async () => {
    if (!$isAuthenticated) {
      goto('/adminlogin');
      return;
    }
    
    try {
      // Get current admin user
      adminUser = await fetchApi('users/me/');
      if (!adminUser.is_staff) {
        goto('/');
        return;
      }
      
      // Store current admin in the map
      adminMap[adminUser.id] = adminUser;
      
      // Get chat user
      userId = $page.params.id;
      console.log(`Loading chat for user ID: ${userId}`);
      const userData = await fetchApi(`users/${userId}/`);
      user = userData;
      console.log(`User data loaded:`, user);
      
      await loadUserChat(userId);
      
      // Check if this user has won any auctions
      try {
        // This would be a new API endpoint to implement
        const itemsData = await fetchApi(`admin/user-won-items/${userId}/`);
        wonItems = itemsData.items || [];
        isWinner = wonItems.length > 0;
      } catch (e) {
        console.warn('Could not fetch won items:', e);
        // Fallback: Check message content for congratulation messages
        isWinner = $messages.some(m => 
          m.content.includes("Congratulations") && 
          m.content.includes("won") &&
          m.sender === adminUser.id
        );
      }
      
      // Load other admin data from messages
      const adminIds = [...new Set($messages
        .filter(m => m.sender !== parseInt(userId) && m.sender !== adminUser.id)
        .map(m => m.sender))];
        
      for (const adminId of adminIds) {
        try {
          if (!adminMap[adminId]) {
            const adminData = await fetchApi(`users/${adminId}/`);
            adminMap[adminId] = adminData;
            console.log(`Loaded admin data for ID ${adminId}:`, adminData);
          }
        } catch (e) {
          console.warn(`Couldn't load admin data for ID ${adminId}:`, e);
          adminMap[adminId] = { nickname: "Support Team", username: "admin" };
        }
      }
      
      scrollToBottom();
      loading = false;
      console.log("Messages loaded:", $messages);
      
      // Auto-refresh messages
      refreshInterval = setInterval(async () => {
        await loadUserChat(userId);
        
        // Check for new admins in messages
        const newAdminIds = [...new Set($messages
          .filter(m => m.sender !== parseInt(userId) && !adminMap[m.sender])
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
      console.error('Error loading user chat:', e);
      error = e.message || 'Failed to load user chat';
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
  
  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString();
  }
  
  // Quick templates for common admin responses
  const messageTemplates = [
    {
      name: "Shipping Details",
      message: "Hello! To arrange shipping for your won auction, please provide your shipping address and phone number. We'll calculate shipping costs and get back to you with payment details."
    },
    {
      name: "Payment Information",
      message: "Thank you for your interest in completing your purchase. We accept payment via PayPal, credit card, or bank transfer. Please let me know your preferred method, and I'll provide the relevant details."
    },
    {
      name: "Order Confirmation",
      message: "I'm pleased to confirm that we've received your payment and shipping information. Your item will be carefully packaged and shipped within 2-3 business days. We'll provide tracking information once it's available."
    }
  ];
  
  function useTemplate(template) {
    newMessage = template.message;
    // Focus the textarea
    document.getElementById('messageInput').focus();
  }
  
  async function handleSend() {
    if (!newMessage.trim() || sendingMessage) return;
    
    try {
      sendingMessage = true;
      console.log(`Admin ${adminUser.id} sending message to user ID: ${userId}`);
      
      // Pass both the content and userId to sendMessage
      await sendMessage(newMessage, userId);
      
      // Clear input
      newMessage = '';
      
      // Refresh to see the new message
      await loadUserChat(userId);
      scrollToBottom();
    } catch (e) {
      console.error('Error sending message:', e);
      error = e.message || 'Failed to send message';
    } finally {
      sendingMessage = false;
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }
</script>

<div class="p-6">
  <div class="mx-auto max-w-4xl">
    <!-- Header with back button and user info -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center">
        <a 
          href="/admin/chats" 
          class="mr-4 flex items-center text-amber-500 hover:text-amber-600"
        >
          <svg class="mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to conversations
        </a>
        
        {#if user}
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              Chat with {user.nickname || user.username || user.email}
            </h1>
            {#if isWinner}
              <span class="ml-3 bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded-full font-medium">
                Auction Winner
              </span>
            {/if}
          </div>
        {:else}
          <h1 class="text-2xl font-bold text-gray-900">Loading user...</h1>
        {/if}
      </div>
      
      <a href="/admin" class="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
        Back to Admin
      </a>
    </div>
    
    <!-- Won items display (if any) -->
    {#if wonItems && wonItems.length > 0}
      <div class="mb-6 rounded-lg bg-amber-50 p-4 border border-amber-200">
        <h3 class="text-amber-800 font-medium mb-2">
          Items Won by This Customer:
        </h3>
        <ul class="space-y-2">
          {#each wonItems as item}
            <li class="flex justify-between items-center">
              <span>{item.title}</span>
              <span class="font-medium">${item.current_price}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    
    <!-- Message templates -->
    <div class="mb-4 rounded-lg bg-gray-50 p-3 border border-gray-200">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Quick Templates:</h3>
      <div class="flex flex-wrap gap-2">
        {#each messageTemplates as template}
          <button 
            on:click={() => useTemplate(template)}
            class="bg-white border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100 transition-colors"
          >
            {template.name}
          </button>
        {/each}
      </div>
    </div>

    <div class="rounded-lg bg-white shadow-lg overflow-hidden">
      {#if loading}
        <div class="py-8 text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-600">Loading messages...</p>
        </div>
      {:else if error}
        <div class="p-4">
          <div class="rounded-lg bg-red-50 p-4 text-red-700">
            <p>{error}</p>
          </div>
        </div>
      {:else}
        <div class="flex h-[600px] flex-col">
          <div bind:this={chatContainer} class="flex-grow overflow-y-auto p-4">
            {#if $messages.length === 0}
              <div class="flex h-full items-center justify-center">
                <div class="text-center text-gray-500">
                  <svg class="mx-auto mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p>No messages yet. Start the conversation!</p>
                </div>
              </div>
            {:else}
              {#each $messages as message}
                {@const isAdmin = message.sender !== parseInt(userId)}
                {@const isCurrentAdmin = message.sender === adminUser.id}
                <div class="mb-6 {isAdmin ? 'flex justify-end' : ''}">
                  <!-- Message container with sender name -->
                  <div class="flex flex-col max-w-[75%]">
                    <!-- Sender name -->
                    <span class="text-xs font-medium {isAdmin ? 'text-right mr-2 text-amber-700' : 'text-gray-600 ml-2'} mb-1">
                      {isAdmin 
                        ? (isCurrentAdmin ? 'You' : getAdminInfo(message.sender)) 
                        : (user?.nickname || user?.username || user?.email || 'User')}
                    </span>
                    
                    <!-- Message bubble -->
                    <div class="{isAdmin ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white' : 'bg-gray-200'} rounded-lg px-4 py-2 shadow">
                      <p class="whitespace-pre-wrap break-words">{message.content}</p>
                      <p class="mt-1 text-right text-xs {isAdmin ? 'text-amber-100' : 'text-gray-500'}">
                        {formatDate(message.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
          
          <div class="border-t p-4">
            <div class="flex items-start">
              <textarea
                id="messageInput"
                bind:value={newMessage}
                on:keydown={handleKeydown}
                placeholder="Type your message here..."
                class="flex-grow rounded-lg border border-gray-300 p-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                rows="3"
                disabled={sendingMessage}
              ></textarea>
              <button
                on:click={handleSend}
                class="ml-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 px-4 py-3 font-medium text-white shadow-md transition-all hover:from-amber-600 hover:to-yellow-700 active:scale-95 disabled:opacity-50"
                disabled={sendingMessage || !newMessage.trim()}
              >
                {#if sendingMessage}
                  <div class="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {:else}
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                {/if}
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>