<script>
  import { onMount } from 'svelte';
  
  let items = [];
  let loading = true;
  let error = null;
  
  async function loadItems() {
    try {
      const response = await fetch('/api/items/', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      items = data.results || [];
    } catch (e) {
      error = `Failed to load items: ${e.message}`;
      console.error('Error loading items:', e);
    } finally {
      loading = false;
    }
  }
  
  onMount(async () => {
    await loadItems();
  });
</script>

<div class="container mx-auto p-8">
  <h1 class="mb-8 text-center text-4xl font-bold">API Test Page</h1>
  
  {#if loading}
    <div class="text-center text-xl">Loading items...</div>
  {:else if error}
    <div class="text-center text-xl text-red-600">{error}</div>
  {:else}
    <div class="space-y-8">
      {#each items as item}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-2">{item.title}</h2>
          <div class="mb-4">
            <strong>Category Data:</strong>
            <pre class="bg-gray-100 p-2 rounded mt-1">{JSON.stringify(item.category, null, 2)}</pre>
          </div>
          <div>
            <strong>Full Item Data:</strong>
            <pre class="bg-gray-100 p-2 rounded mt-1">{JSON.stringify(item, null, 2)}</pre>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div> 