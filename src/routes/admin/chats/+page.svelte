<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/stores/auth';
  import { conversations, loadConversations } from '$lib/stores/messaging';
  
  let refreshInterval;
  let loading = true;
  let error = null;
  let searchTerm = '';
  let sortOption = 'newest'; // Default sorting option
  
  onMount(async () => {
    if ($isAuthenticated) {
      await loadConversations();
      loading = false;
      
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
  
  // Function to sort conversations
  $: sortedConversations = $conversations ? [...$conversations].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.latest_message.created_at) - new Date(a.latest_message.created_at);
    } else if (sortOption === 'oldest') {
      return new Date(a.latest_message.created_at) - new Date(b.latest_message.created_at);
    } else if (sortOption === 'unread') {
      return b.unread_count - a.unread_count;
    }
    return 0;
  }) : [];
  
  // Function to filter conversations by search term
  $: filteredConversations = sortedConversations.filter(conversation => {
    if (!searchTerm.trim()) return true;
    
    const term = searchTerm.toLowerCase();
    const nickname = (conversation.user.nickname || '').toLowerCase();
    const username = (conversation.user.username || '').toLowerCase();
    const email = (conversation.user.email || '').toLowerCase();
    const messageContent = (conversation.latest_message.content || '').toLowerCase();
    
    return nickname.includes(term) || 
           username.includes(term) || 
           email.includes(term) || 
           messageContent.includes(term);
  });
</script>

<div class="p-6">
  <div class="mx-auto max-w-4xl">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">Support Conversations</h1>
      <a href="/admin" class="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
        Back to Admin
      </a>
    </div>
    
    <!-- Search and Sort Controls -->
    <div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <!-- Search Bar -->
      <div class="relative flex-grow">
        <input 
          type="text" 
          bind:value={searchTerm} 
          placeholder="Search by nickname, email or message content..." 
          class="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <!-- Sort Options -->
      <div class="flex-shrink-0">
        <select 
          bind:value={sortOption} 
          class="rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="unread">Unread First</option>
        </select>
      </div>
    </div>
    
    <div class="rounded-lg bg-white shadow-lg">
      {#if loading}
        <div class="py-8 text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
          <p class="mt-2 text-gray-600">Loading conversations...</p>
        </div>
      {:else if error}
        <div class="rounded-lg bg-red-50 p-4 text-red-700">
          <p>{error}</p>
        </div>
      {:else if filteredConversations.length === 0}
        <div class="py-8 text-center text-gray-600">
          {searchTerm ? 'No conversations match your search.' : 'No conversations found.'}
        </div>
      {:else}
        <div class="divide-y">
          {#each filteredConversations as conversation}
            <div 
              class="cursor-pointer p-4 transition-colors hover:bg-gray-50"
              on:click={() => handleUserClick(conversation.user.id)}
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                    {conversation.user.nickname?.[0] || conversation.user.username?.[0] || 'U'}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">
                      {conversation.user.nickname || conversation.user.username}
                      <span class="ml-2 text-sm text-gray-500">({conversation.user.email})</span>
                    </p>
                    <p class="mt-1 truncate text-sm text-gray-600">{conversation.latest_message.content}</p>
                  </div>
                </div>
                
                <div class="flex flex-col items-end">
                  <span class="text-xs text-gray-500">
                    {new Date(conversation.latest_message.created_at).toLocaleString()}
                  </span>
                  
                  {#if conversation.unread_count > 0}
                    <span class="mt-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      {conversation.unread_count}
                    </span>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>