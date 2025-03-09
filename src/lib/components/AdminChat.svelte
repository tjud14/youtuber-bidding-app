<script>
    import { onMount, onDestroy } from 'svelte';
    import { isAuthenticated } from '$lib/stores/auth';
    import { messages, sendMessage, loadMessages, loadUserChat } from '$lib/stores/messaging';
    
    let newMessage = '';
    let chatContainer;
    let refreshInterval;
    
    onMount(async () => {
      if ($isAuthenticated) {
        await loadMessages();
        scrollToBottom();
        
        // Refresh messages every 10 seconds
        refreshInterval = setInterval(async () => {
          await loadMessages();
          scrollToBottom();
        }, 10000);
      }
    });
    
    onDestroy(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
    
    function scrollToBottom() {
      if (chatContainer) {
        setTimeout(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
      }
    }
    
    async function handleSend() {
      if (!newMessage.trim()) return;
      
      try {
        console.log(`Sending message to user ID: ${userId}`);
        
        // Use the sendMessage function from the store, passing both content and userId
        await sendMessage(newMessage, userId);
        
        // Clear input
        newMessage = '';
        
        // Scroll to show the new message
        scrollToBottom();
      } catch (e) {
        console.error('Error sending message:', e);
      }
    }
  </script>
  
  <div class="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
    <div class="border-b pb-2 mb-4">
      <h2 class="text-xl font-semibold text-blue-600">Support Chat</h2>
    </div>
    
    <div bind:this={chatContainer} class="flex-grow overflow-y-auto mb-4 p-2">
      {#if $messages && $messages.length > 0}
        {#each $messages as message}
          {@const isCurrentUser = message.sender !== 1} <!-- Assuming 1 is admin ID, adjust as needed -->
          <div class="mb-4 {isCurrentUser ? 'flex justify-end' : ''}">
            <div class="{isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg px-4 py-2 max-w-[80%]">
              <p>{message.content}</p>
              <p class="text-xs mt-1 opacity-75">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        {/each}
      {:else}
        <div class="text-center text-gray-500 py-8">
          <p>No messages yet. Start the conversation!</p>
        </div>
      {/if}
    </div>
    
    <div class="border-t pt-4">
      <div class="flex items-center">
        <textarea
          bind:value={newMessage}
          on:keydown={handleKeydown}
          placeholder="Type your message here..."
          class="flex-grow border rounded-lg p-2 mr-2 focus:ring-2 focus:ring-blue-500"
          rows="2"
        ></textarea>
        <button
          on:click={handleSend}
          class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>