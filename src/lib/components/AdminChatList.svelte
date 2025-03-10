<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/stores/auth';
  import { conversations, loadConversations } from '$lib/stores/messaging';
  import { fetchApi } from '$lib/utils/api';
  
  let refreshInterval;
  let loading = true;
  let error = null;
  let searchTerm = '';
  let sortOption = 'newest'; // Default sorting option
  let filter = 'all'; // Filter: 'all', 'unread', 'winners'
  let winnerIds = []; // IDs of users who have won auctions
  
  // Function to load winner IDs (users who have won auctions)
  async function loadWinnerIds() {
    try {
      // Replace this with actual API call when implemented
      const data = await fetchApi('admin/winner-ids/');
      winnerIds = data.ids;
    } catch (e) {
      console.error('Error loading winner IDs:', e);
      // For now, we'll try to extract winner IDs from conversations
      // You should implement a proper API endpoint later
      if ($conversations) {
        // Temporary solution: check for "Congratulations" in messages
        winnerIds = $conversations
          .filter(conv => 
            conv.latest_message && 
            conv.latest_message.content && 
            conv.latest_message.content.includes("Congratulations") && 
            conv.latest_message.content.includes("won"))
          .map(conv => conv.user.id);
      }
    }
  }
  
  onMount(async () => {
    if ($isAuthenticated) {
      try {
        // Verify staff status first
        const userData = await fetchApi('users/me/');
        if (!userData.is_staff) {
          goto('/');
          return;
        }
        
        // Load conversations and winner IDs
        await loadConversations();
        await loadWinnerIds();
        loading = false;
        
        // Refresh conversations every 30 seconds
        refreshInterval = setInterval(async () => {
          await loadConversations();
        }, 30000);
      } catch (e) {
        console.error('Error in AdminChatList:', e);
        error = e.message || 'An error occurred';
        loading = false;
      }
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
  
  // Format date to readable format
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today - show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      // This week - show day name
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      // Older - show date
      return date.toLocaleDateString();
    }
  }
  
  // Function to get initials from name
  function getInitials(user) {
    if (user.nickname) {
      return user.nickname[0].toUpperCase();
    } else if (user.username) {
      return user.username[0].toUpperCase();
    } else if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  }
  
  // Compute background color based on user ID for avatar
  function getAvatarColor(userId) {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-amber-500 to-amber-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
    ];
    
    // Use a hash function to get consistent color for each user
    const hash = userId % colors.length;
    return colors[hash];
  }
  
  // Computed properties for filtering and sorting
  $: filteredByType = filter === 'winners' 
    ? $conversations.filter(conv => winnerIds.includes(conv.user.id))
    : filter === 'unread'
      ? $conversations.filter(conv => conv.unread_count > 0)
      : $conversations;
  
  // Then sort the filtered conversations      
  $: sortedConversations = filteredByType ? [...filteredByType].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.latest_message.created_at) - new Date(a.latest_message.created_at);
    } else if (sortOption === 'oldest') {
      return new Date(a.latest_message.created_at) - new Date(b.latest_message.created_at);
    } else if (sortOption === 'unread') {
      return b.unread_count - a.unread_count;
    }
    return 0;
  }) : [];
  
  // Apply search filter
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
    
    <!-- Filter Options -->
    <div class="mb-6">
      <div class="flex space-x-2">
        <button 
          class={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          on:click={() => filter = 'all'}
        >
          All Conversations
        </button>
        <button 
          class={`px-4 py-2 rounded-lg transition-colors ${filter === 'unread' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          on:click={() => filter = 'unread'}
        >
          Unread
        </button>
        <button 
          class={`px-4 py-2 rounded-lg transition-colors ${filter === 'winners' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          on:click={() => filter = 'winners'}
        >
          Auction Winners
        </button>
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
            {@const isWinner = winnerIds.includes(conversation.user.id)}
            <div 
              class="cursor-pointer p-4 transition-colors hover:bg-gray-50"
              on:click={() => handleUserClick(conversation.user.id)}
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class={`h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r ${getAvatarColor(conversation.user.id)} flex items-center justify-center text-white font-bold`}>
                    {getInitials(conversation.user)}
                  </div>
                  <div>
                    <div class="flex items-center">
                      <p class="font-medium text-gray-900">
                        {conversation.user.nickname || conversation.user.username || conversation.user.email}
                      </p>
                      {#if isWinner}
                        <span class="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          Winner
                        </span>
                      {/if}
                    </div>
                    <p class="mt-1 truncate text-sm text-gray-600">
                      {conversation.latest_message.content.length > 50 
                        ? conversation.latest_message.content.substring(0, 50) + '...' 
                        : conversation.latest_message.content}
                    </p>
                  </div>
                </div>
                
                <div class="flex flex-col items-end">
                  <span class="text-xs text-gray-500">
                    {formatDate(conversation.latest_message.created_at)}
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