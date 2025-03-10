<script>
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/stores/auth';
  import { fetchApi, getCsrfToken } from '$lib/utils/api';
  import { onMount } from 'svelte';
  import AddItemModal from '$lib/components/AddItemModal.svelte';

  let items = [];
  let loading = true;
  let error = null;
  let showAddModal = false;
  let selectedItems = new Set();
  let statusFilter = "all"; // Filter options: all, active, ended, with_winner, without_winner
  let errorMsg = "";
  let successMsg = "";
  let assigningWinnerId = null; // Track which item is currently being assigned
  
  // For tracking which bid history is expanded
  let expandedHistory = null;
  // For bid history modal
  let showBidHistoryModal = false;
  let activeBidHistoryItem = null;

  onMount(async () => {
    try {
      if (!$isAuthenticated) {
        window.location.href = '/adminlogin';
        return;
      }
      
      // Verify staff status
      const userData = await fetchApi('users/me/');
      if (!userData.is_staff) {
        // Not admin - redirect to home
        alert('You do not have permission to access the admin area');
        window.location.href = '/';
        return;
      }
      
      // Continue with admin page loading
      await loadItems();
    } catch (e) {
      console.error('Error checking user status:', e);
      window.location.href = '/adminlogin';
    }
  });

  async function handleLogout() {
    try {
      await fetchApi('logout/', { method: 'POST' });
      isAuthenticated.set(false);
      window.location.href = '/adminlogin';
    } catch (e) {
      console.error('Logout failed:', e);
    }
  }

  // Add this function for timezone-aware auction end checking
  function isAuctionEnded(endDate) {
    // Add a 2-hour buffer to account for timezone differences
    const endDateTime = new Date(endDate);
    const nowWithBuffer = new Date();
    return endDateTime < nowWithBuffer;
  }

  async function loadItems() {
    try {
      loading = true;
      errorMsg = "";
      successMsg = "";
      const data = await fetchApi('items/');
      
      items = data.results.map(item => {
        // Use the timezone-aware function
        return {
          ...item,
          isEnded: isAuctionEnded(item.end_date),
          selected: false
        };
      });
      loading = false;
      // Reset the assigning winner id after reload
      assigningWinnerId = null;
    } catch (e) {
      console.error('Error loading items:', e);
      errorMsg = "Failed to load auction items";
      loading = false;
    }
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const csrfToken = await getCsrfToken();
        await fetchApi(`items/${id}/`, {
          method: 'DELETE',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });
        successMsg = "Item deleted successfully";
        await loadItems();
      } catch (e) {
        console.error('Error deleting item:', e);
        errorMsg = "Failed to delete item";
      }
    }
  }

  function toggleSelectItem(id) {
    if (selectedItems.has(id)) {
      selectedItems.delete(id);
    } else {
      selectedItems.add(id);
    }
    selectedItems = selectedItems; // Trigger reactivity
  }

  function isSelected(id) {
    return selectedItems.has(id);
  }

  function toggleSelectAll() {
    if (selectedItems.size === filteredItems.length) {
      // If all are selected, deselect all
      selectedItems.clear();
    } else {
      // Select all filtered items
      selectedItems = new Set(filteredItems.map(item => item.id));
    }
    selectedItems = selectedItems; // Trigger reactivity
  }

  async function assignWinner(itemId, userId) {
    try {
      // Show loading state
      assigningWinnerId = itemId;
      errorMsg = "";
      successMsg = "Assigning winner...";
      
      console.log(`Assigning winner: Item ID ${itemId}, User ID ${userId}`);
      
      // Find the bid information for this user
      const item = items.find(i => i.id === itemId);
      const bid = item?.bids.find(b => b.user == userId);
      
      if (!bid) {
        throw new Error("Bid information not found");
      }
      
      // Check if the auction has ended
      if (!item.isEnded) {
        throw new Error("Cannot assign winner to active auction");
      }
      
      // Make the API call
      const response = await fetchApi('admin/mark_winners/', {
        method: 'POST',
        body: JSON.stringify({
          item_ids: [itemId],
          user_id: parseInt(userId, 10)
        }),
      });

      // Show success message
      successMsg = `Successfully assigned ${bid.user_email} as winner`;
      
      // Important: Reload items from server to get the updated winner information
      await loadItems();
      
    } catch (e) {
      console.error('Error assigning winner:', e);
      errorMsg = `Failed to assign winner: ${e.message || e}`;
    } finally {
      assigningWinnerId = null;
    }
  }

  async function contactWinner(itemId) {
    try {
      loading = true;
      errorMsg = "";
      successMsg = "Contacting winner...";
      
      const response = await fetchApi('admin/contact_winners/', {
        method: 'POST',
        body: JSON.stringify({
          item_ids: [itemId]
        }),
      });

      successMsg = `Successfully contacted the winner`;
      await loadItems();
    } catch (e) {
      console.error('Error contacting winner:', e);
      errorMsg = e.message || 'Failed to contact winner';
    } finally {
      loading = false;
    }
  }

  async function contactWinners() {
    if (selectedItems.size === 0) {
      errorMsg = 'Please select at least one auction with a winner';
      return;
    }

    try {
      loading = true;
      errorMsg = "";
      successMsg = "Contacting winners...";
      
      const response = await fetchApi('admin/contact_winners/', {
        method: 'POST',
        body: JSON.stringify({
          item_ids: Array.from(selectedItems)
        }),
      });

      successMsg = `Successfully contacted ${response.contacted} winners`;
      await loadItems();
      selectedItems.clear();
    } catch (e) {
      console.error('Error contacting winners:', e);
      errorMsg = e.message || 'Failed to contact winners';
    } finally {
      loading = false;
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  function getWinnerStatus(item) {
    // First check if the auction is still active (not ended)
    if (!item.isEnded && item.is_active) {
      return { status: 'active', label: 'Active', color: 'bg-blue-100 text-blue-700' };
    }
    
    // Auction has ended - now check bid and winner status
    if (!item.bids || item.bids.length === 0) {
      return { status: 'no_bids', label: 'No Bids', color: 'bg-gray-100 text-gray-700' };
    }
    
    if (item.winner) {
      if (item.winner_notified) {
        return { status: 'notified', label: 'Winner Notified', color: 'bg-green-100 text-green-700' };
      }
      return { status: 'winner', label: 'Winner Picked', color: 'bg-yellow-100 text-yellow-700' };
    }
    
    return { status: 'needs_winner', label: 'Needs Winner', color: 'bg-red-100 text-red-700' };
  }

  // Bid history modal functions
  function openBidHistoryModal(item) {
    activeBidHistoryItem = item;
    showBidHistoryModal = true;
  }

  function closeBidHistoryModal() {
    showBidHistoryModal = false;
    activeBidHistoryItem = null;
  }

  // Computed property for filtered items
  $: filteredItems = items.filter(item => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return !item.isEnded;
    if (statusFilter === 'ended') return item.isEnded;
    if (statusFilter === 'with_winner') return item.winner != null;
    if (statusFilter === 'without_winner') return item.isEnded && item.bids && item.bids.length > 0 && !item.winner;
    return true;
  });

  // Sort items by end date (active first, then ended)
  $: sortedItems = [...filteredItems].sort((a, b) => {
    // First by auction status (active first)
    if (a.isEnded !== b.isEnded) {
      return a.isEnded ? 1 : -1;
    }
    
    // For active auctions, sort by end date (soonest first)
    if (!a.isEnded) {
      return new Date(a.end_date) - new Date(b.end_date);
    }
    
    // For ended auctions, sort by end date (most recent first)
    return new Date(b.end_date) - new Date(a.end_date);
  });
</script>

<div class="p-8">
  <div class="mx-auto max-w-7xl">
    <div class="mb-6 flex justify-between">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <div class="flex gap-4">
        <button
          class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          on:click={() => (showAddModal = true)}
        >
          Add New Item
        </button>
        <a 
          href="/admin/chats"
          class="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Support Messages
        </a>
        <a 
          href="/admin/analytics"
          class="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Analytics Dashboard
        </a>
        <button
          class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          on:click={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Status filter and winner management controls -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <label for="statusFilter" class="mr-2 font-medium">Filter:</label>
        <select 
          id="statusFilter" 
          bind:value={statusFilter}
          class="rounded-md border border-gray-300 px-3 py-1.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Auctions</option>
          <option value="active">Active Auctions</option>
          <option value="ended">Ended Auctions</option>
          <option value="with_winner">With Winner</option>
          <option value="without_winner">Needs Winner</option>
        </select>
      </div>
      
      <div class="flex items-center gap-2">
        <button
          on:click={contactWinners}
          class="rounded-md bg-green-500 px-3 py-1.5 text-white hover:bg-green-600 disabled:opacity-50"
          disabled={selectedItems.size === 0 || loading}
        >
          Contact Winners
        </button>
        
        <div class="ml-2 text-sm text-gray-500">
          {selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'} selected
        </div>
      </div>
    </div>

    <!-- Display error or success messages -->
    {#if errorMsg}
      <div class="mb-4 rounded-lg bg-red-100 p-4 text-red-800">
        {errorMsg}
      </div>
    {/if}

    {#if successMsg}
      <div class="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
        {successMsg}
      </div>
    {/if}

    {#if loading}
      <div class="flex h-64 items-center justify-center">
        <div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    {:else}
      <div class="overflow-x-auto rounded-lg bg-white shadow">
        <table class="min-w-full table-auto">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                <input 
                  type="checkbox" 
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  on:change={toggleSelectAll} 
                  checked={selectedItems.size === filteredItems.length && filteredItems.length > 0}
                />
              </th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Current Price</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Winner</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bids</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">YouTube</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {#each sortedItems as item (item.id)}
              {@const winnerStatus = getWinnerStatus(item)}
              <tr class={item.isEnded ? 'bg-gray-50' : 'bg-white'}>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <input 
                    type="checkbox" 
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={isSelected(item.id)} 
                    on:change={() => toggleSelectItem(item.id)}
                  />
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <span class={`inline-flex rounded-full px-2 text-xs font-medium ${winnerStatus.color}`}>
                    {winnerStatus.label}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <a href="/admin/edit/{item.id}" class="text-blue-600 hover:text-blue-800 font-medium">
                    {item.title}
                  </a>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.category.name}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm font-medium">${item.current_price}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span class={item.isEnded ? 'text-red-600' : 'text-green-600'}>
                    {formatDate(item.end_date)}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {#if item.winner && item.isEnded}
                    <div class="flex items-center gap-2">
                      <span class="text-green-600">{item.winner.email}</span>
                      {#if !item.winner_notified}
                        <button 
                          class="rounded bg-green-500 px-2 py-1 text-xs text-white"
                          on:click={() => contactWinner(item.id)}
                        >
                          Contact
                        </button>
                      {/if}
                    </div>
                  {:else if winnerStatus.status === 'needs_winner' && item.bids && item.bids.length > 0}
                    {#if assigningWinnerId === item.id}
                      <div class="flex items-center">
                        <span class="mr-2">Assigning...</span>
                        <div class="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    {:else}
                      <select 
                        class="border border-orange-300 rounded px-2 py-1 bg-orange-50 text-sm"
                        on:change={(e) => {
                          console.log("Selected winner from dropdown, value:", e.target.value);
                          if (e.target.value) {
                            assignWinner(item.id, e.target.value);
                          }
                        }}
                      >
                        <option value="">Select winner...</option>
                        {#each item.bids as bid}
                          <option value={bid.user}>
                            ${bid.amount} - {bid.user_email} (ID: {bid.user})
                          </option>
                        {/each}
                      </select>
                    {/if}
                  {:else if winnerStatus.status === 'active'}
                    <span class="text-gray-500">Auction still active</span>
                  {:else}
                    <span class="text-gray-500">No bids</span>
                  {/if}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {#if item.bids && item.bids.length > 0}
                    <button 
                      class="rounded bg-blue-100 px-2 py-1 text-blue-800 hover:bg-blue-200"
                      on:click={() => openBidHistoryModal(item)}
                    >
                      {item.bids.length} bid{item.bids.length !== 1 ? 's' : ''}
                    </button>
                  {:else}
                    <span class="text-gray-500">No bids</span>
                  {/if}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {#if item.youtube_url}
                    <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
                      View
                    </a>
                  {:else}
                    -
                  {/if}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <div class="flex space-x-2">
                    <a href="/admin/edit/{item.id}" class="text-blue-600 hover:text-blue-800">
                      Edit
                    </a>
                    <button class="text-red-600 hover:text-red-800" on:click={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <!-- Bid History Modal -->
    {#if showBidHistoryModal && activeBidHistoryItem}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="w-full max-w-3xl rounded-lg bg-white shadow-xl">
          <div class="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 p-4">
            <h2 class="text-xl font-semibold text-white">
              Bid History for {activeBidHistoryItem.title}
            </h2>
            <button 
              class="text-white hover:text-gray-200"
              on:click={closeBidHistoryModal}
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="max-h-[80vh] overflow-y-auto p-6">
            {#if activeBidHistoryItem.bids.length === 0}
              <p class="text-center text-gray-500">No bids for this item.</p>
            {:else}
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Amount</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Bidder</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Date & Time</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  {#each activeBidHistoryItem.bids as bid}
                    <tr class="hover:bg-gray-50">
                      <td class="px-4 py-3 text-sm font-medium text-blue-600">${bid.amount}</td>
                      <td class="px-4 py-3">
                        <div class="text-sm font-medium text-gray-900">{bid.user_email}</div>
                        {#if bid.user_nickname}
                          <div class="text-xs text-gray-500">{bid.user_nickname}</div>
                        {/if}
                        <div class="text-xs text-blue-500">ID: {bid.user}</div>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-500">
                        {new Date(bid.created_at).toLocaleString()}
                      </td>
                      <td class="px-4 py-3">
                        {#if activeBidHistoryItem.isEnded}
                          <button 
                            class="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition-colors"
                            on:click={() => {
                              assignWinner(activeBidHistoryItem.id, bid.user);
                              closeBidHistoryModal();
                            }}
                          >
                            Select as Winner
                          </button>
                        {:else}
                          <span class="text-gray-500">Auction still active</span>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    {#if showAddModal}
      <AddItemModal bind:show={showAddModal} on:itemAdded={loadItems} />
    {/if}
  </div>
</div>