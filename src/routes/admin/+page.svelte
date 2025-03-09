<script>
  import AddItemModal from '$lib/components/AddItemModal.svelte';
  import { isAuthenticated } from '$lib/stores/auth';
  import { fetchApi, getCsrfToken } from '$lib/utils/api';
  import { onMount } from 'svelte';
  import { unreadCount } from '$lib/stores/messaging';

  let items = [];
  let loading = true;
  let showAddModal = false;

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

  async function loadItems() {
    try {
      loading = true;
      const data = await fetchApi('items/');
      items = data.results;
      loading = false;
    } catch (e) {
      console.error('Error loading items:', e);
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
        await loadItems();
      } catch (e) {
        console.error('Error deleting item:', e);
      }
    }
  }
</script>

<div class="p-8">
  <div class="mx-auto max-w-6xl">
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
         {#if $unreadCount > 0}
             <span class="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {$unreadCount}
            </span>
          {/if}
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

    {#if loading}
      <p>Loading...</p>
    {:else}
      <div class="rounded-lg bg-white shadow">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="p-4 text-left">Title</th>
              <th class="p-4 text-left">Category</th>
              <th class="p-4 text-left">Current Price</th>
              <th class="p-4 text-left">End Date</th>
              <th class="p-4 text-left">YouTube</th>
              <th class="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each items as item}
              <tr class="border-t">
                <td class="p-4"><a href="/admin/edit/{item.id}" class="text-blue-600 underline hover:text-blue-800">{item.title}</a></td>
                <td class="p-4">{item.category.name}</td>
                <td class="p-4">${item.current_price}</td>
                <td class="p-4">{new Date(item.end_date).toLocaleString()}</td>
                <td class="p-4">
                  {#if item.youtube_url}
                    <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">View</a>
                  {:else}
                    -
                  {/if}
                </td>
                <td class="p-4">
                  <button class="text-red-500 hover:text-red-700" on:click={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if showAddModal}
      <AddItemModal bind:show={showAddModal} on:itemAdded={loadItems} />
    {/if}
  </div>
</div>