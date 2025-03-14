<script>
  import { onDestroy, onMount } from 'svelte';

  let items = [];
  let loading = true;
  let error = null;
  let timerInterval;
  let searchTerm = '';
  let sortOption = 'ending-soon';

  function sortItems(items, option) {
    return [...items].sort((a, b) => {
      switch (option) {
        case 'price-high':
          return b.current_price - a.current_price;
        case 'price-low':
          return a.current_price - b.current_price;
        case 'ending-soon':
          return new Date(a.end_date) - new Date(b.end_date);
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return 0;
      }
    });
  }

  function handleImageError(e) {
    e.currentTarget.src = '/placeholder.jpg';
  }

  function getTimeRemaining(endDate) {
    const total = new Date(endDate) - new Date();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
      isExpired: total <= 0,
    };
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  function updateAllTimers() {
    items = items.map(item => ({
      ...item,
      timeRemaining: getTimeRemaining(item.end_date),
    }));
  }

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
      
      if (data.results && data.results.length > 0) {
        console.log('First item category:', data.results[0].category);
      }
      
      // Calculate the date 24 hours ago
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      
      // Process and filter items
      items = data.results.map(item => ({
        ...item,
        timeRemaining: getTimeRemaining(item.end_date),
      })).filter(item => {
        const endDate = new Date(item.end_date);
        const now = new Date();
        
        // Debug category data
        console.log(`Item ${item.id} (${item.title}) category:`, item.category);
        
        // Keep item if NOT expired, OR if expired less than 24 hours ago
        return !item.timeRemaining.isExpired || (item.timeRemaining.isExpired && endDate > twentyFourHoursAgo);
      });
    } catch (e) {
      error = `Failed to load auctions: ${e.message}`;
      console.error('Error loading auctions:', e);
    } finally {
      loading = false;
    }
  }
  $: sortedItems = items ? sortItems(items, sortOption) : [];
  $: filteredItems = sortedItems.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  onMount(async () => {
    await loadItems();
    timerInterval = setInterval(updateAllTimers, 1000);
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });
</script>

<div class="container mx-auto p-8">
  <h1 class="mb-8 text-center text-4xl font-bold text-zinc-300 drop-shadow-lg">Current Auctions</h1>

  {#if loading}
    <div class="text-center text-xl text-gray-600">Loading auctions...</div>
  {:else if error}
    <div class="text-center text-xl text-red-600">{error}</div>
  {:else}
    <div class="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="relative w-full sm:w-96">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search..."
          class="w-full rounded-lg bg-white bg-opacity-95 px-4 py-2.5 pl-10 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          class="absolute left-3 top-3 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <select
        bind:value={sortOption}
        class="rounded-lg border bg-white bg-opacity-95 px-4 py-2.5 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="ending-soon">Ending Soon</option>
        <option value="price-high">Price: High to Low</option>
        <option value="price-low">Price: Low to High</option>
        <option value="newest">Newest First</option>
      </select>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each filteredItems as item}
        <div
          class="flex flex-col overflow-hidden rounded-lg bg-white bg-opacity-95 shadow-lg transition duration-300 hover:shadow-xl"
        >
          <img
            src={item.image_url || (item.images?.length > 0 ? item.images[0].image : '/placeholder.jpg')}
            alt={item.title}
            class="h-64 w-full object-cover"
            on:error={handleImageError}
          />
          <div class="flex flex-grow flex-col p-6">
            <h2 class="mb-2 text-2xl font-semibold text-blue-500">{item.title}</h2>
            <span class="mb-2 text-sm font-medium text-gray-500">
              {#if typeof item.category === 'object' && item.category !== null}
                {item.category.name || (item.category.code === 'PAINT' ? 'Paint' : item.category.code === 'KNIFE' ? 'Knife' : item.category.code === 'MISC' ? 'Miscellaneous' : 'Uncategorized')}
              {:else if item.category_name}
                {item.category_name}
              {:else if item.category_code}
                {item.category_code === 'PAINT' ? 'Paintings/Art' : item.category_code === 'KNIFE' ? 'Knives' : item.category_code === 'MISC' ? 'Miscellaneous items' : 'Uncategorized'}
              {:else}
                Uncategorized
              {/if}
            </span>
            <p class="mb-4 line-clamp-2 text-gray-600">{item.description}</p>

            {#if item.timeRemaining}
              <div class="mb-4 rounded-lg bg-blue-50 p-3">
                {#if item.timeRemaining.isExpired}
                  <p class="text-center font-semibold text-red-600">Auction Ended</p>
                {:else}
                  <p class="text-center font-semibold text-blue-600">
                    Time Remaining:
                    {#if item.timeRemaining.days > 0}
                      {item.timeRemaining.days}d
                    {/if}
                    {item.timeRemaining.hours}h
                    {item.timeRemaining.minutes}m
                    {item.timeRemaining.seconds}s
                  </p>
                {/if}
              </div>
            {/if}

            <div class="mt-auto flex items-center justify-between">
              <span class="text-lg font-bold text-blue-600">{formatPrice(item.current_price)}</span>
              <a
                href={typeof item.category === 'object' && item.category !== null 
                  ? `/${item.category.code?.toLowerCase() || 'misc'}/${item.id}`
                  : item.category_code 
                    ? `/${item.category_code.toLowerCase()}/${item.id}`
                    : `/misc/${item.id}`}
                class="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >View Auction</a
              >
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="bg-blue-100 p-4 mb-4 rounded-lg">
      <h2 class="text-lg font-bold">Troubleshooting</h2>
      <p>Direct link to item ID 4 (SIGMA THE FIRST!):</p>
      <div class="flex gap-2 mt-2">
        <a href="/paint/4" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Paint Category (correct)</a>
        <a href="/items/4" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Generic Item Route</a>
      </div>
    </div>
  {/if}
</div>
