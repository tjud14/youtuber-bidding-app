<script>
  import { fetchApi } from '$lib/utils/api';
  import { onDestroy, onMount } from 'svelte';
  import PastAuctions from '$lib/components/PastAuctions.svelte';

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

  function isAuctionEnded(endDate) {
  return new Date(endDate) < new Date();
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

  async function loadItems() {
    try {
      const data = await fetchApi('items/?active=true&category=MISC');
      items = data.results
        .filter(item => !isAuctionEnded(item.end_date))
        .map(item => ({
          ...item,
          timeRemaining: getTimeRemaining(item.end_date),
        }));
    } catch (e) {
      console.error('Error loading items:', e);
      error = 'Failed to load auctions';
    } finally {
      loading = false;
    }
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

  $: sortedItems = items ? sortItems(items, sortOption) : [];
  $: filteredItems = sortedItems.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  onMount(async () => {
    try {
      await loadItems();
      timerInterval = setInterval(() => {
        // Update timers
        updateAllTimers();
        
        // Check for newly ended auctions and remove them from the active list
        items = items.filter(item => !item.timeRemaining.isExpired);
      }, 1000);
    } catch (e) {
      error = 'Failed to load auctions';
      loading = false;
    }
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });
</script>

<div class="alaska-bg">
  <div class="container mx-auto min-h-screen p-8">
    <h1 class="mb-8 text-center text-4xl font-bold text-white drop-shadow-lg"></h1>

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
              src={item.images && item.images.length > 0 ? item.images[0].image : '/placeholder.jpg'}
              alt={item.title}
              class="h-64 w-full bg-gray-100 object-cover"
              on:error={handleImageError}
            />
            <div class="flex flex-grow flex-col p-6">
              <h2 class="mb-2 text-2xl font-semibold text-blue-500">{item.title}</h2>
              <span class="mb-2 text-sm font-medium text-gray-500">
                {item.category.name}
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
                  href="/{item.category?.code?.toLowerCase() || 'misc'}/{item.id}"
                  class="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                  >View Auction</a
                >
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
    <PastAuctions categoryCode="MISC" categoryName=""
    headingClass="text-amber-500 font-bold"  
    />
  </div>
</div>