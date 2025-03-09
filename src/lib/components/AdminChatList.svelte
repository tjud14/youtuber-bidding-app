<script>
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';
    import { isAuthenticated } from '$lib/stores/auth';
    import { conversations, loadConversations, loadUserChat } from '$lib/stores/messaging';
    
    let refreshInterval;
    
    onMount(async () => {
      if ($isAuthenticated) {
        await loadConversations();
        
        // Refresh conversations every 30 seconds
        refreshInterval = setInterval(async () => {
          await loadConversations();
        }, 30000);
      } else {
        goto('/adminlogin');
      }
    });
    
    onDestroy(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
    
    function handleUserClick(userId) {
      goto(`/admin/chat/${userId}`);
    }
  </script>
  
  <div class="bg-white rounded-lg shadow-lg p-4">
    <div class="border-b pb-2 mb-4">
      <h2 class="text-xl font-semibold text-blue-600">Support Conversations</h2>
    </div>
    
    {#if $conversations && $conversations.length > 0}
      <div class="divide-y">
        {#each $conversations as conversation}
          <div 
            class="py-3 hover:bg-gray-50 cursor-pointer transition"
            on:click={() => handleUserClick(conversation.user.id)}
          >
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium">{conversation.user.nickname || conversation.user.username}</p>
                <p class="text-sm text-gray-600 truncate">{conversation.latest_message.content}</p>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-xs text-gray-500">
                  {new Date(conversation.latest_message.created_at).toLocaleString()}
                </span>
                
                {#if conversation.unread_count > 0}
                  <span class="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-1">
                    {conversation.unread_count}
                  </span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-gray-500 py-8">No conversations found.</p>
    {/if}
  </div>