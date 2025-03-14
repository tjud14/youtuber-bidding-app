<script>
  import { fetchApi } from '$lib/utils/api';
  import { onMount } from 'svelte';
  
  // Props
  export let categoryCode = ''; // e.g., 'KNIFE', 'PAINT', 'MISC'
  export let categoryName = ''; // e.g., 'Knives', 'Art', 'Misc'
  export let headingClass = ''; // Custom class for styling the heading
  
  let pastItems = [];
  let loadingPast = true;
  let error = null;
  let showPastAuctions = true; // Show by default
  
  // Load past items for this category
  async function loadPastItems() {
    try {
      loadingPast = true;
      error = null;
      console.log(`Loading past ${categoryName}...`);
      
      // Use the working endpoint with the correct parameters
      const data = await fetchApi(`items/?category=${categoryCode}&active=false`);
      console.log(`Loaded past ${categoryName}:`, data);
      
      // This endpoint returns a paginated response object with a 'results' property
      pastItems = data.results || [];
    } catch (e) {
      console.error(`Error loading past ${categoryName}:`, e);
      error = e.message || `Failed to load past ${categoryName}`;
      pastItems = []; // Set to empty array in case of error
    } finally {
      loadingPast = false;
    }
  }
  
  function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
  
  function handleImageError(e) {
    e.currentTarget.src = '/placeholder.jpg';
  }
  
  onMount(() => {
    loadPastItems();
  });
</script>

<!-- Past auctions toggle -->
<div class="mt-16 mb-6 flex items-center justify-between">
  <h2 class="text-2xl font-bold text-white drop-shadow-lg {headingClass}">
    Past {categoryName} Auctions
  </h2>
  <button 
    on:click={() => showPastAuctions = !showPastAuctions}
    class="flex items-center rounded-lg bg-gray-800 bg-opacity-70 px-4 py-2 text-white transition-all hover:bg-opacity-90"
  >
    {showPastAuctions ? 'Hide Past Auctions' : 'Show Past Auctions'}
    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d={showPastAuctions ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </button>
</div>

<!-- Past auctions section (with normal colors) -->
{#if showPastAuctions}
  {#if loadingPast}
    <div class="text-center text-xl text-gray-200">Loading past auctions...</div>
  {:else if error}
    <div class="text-center text-xl text-red-400">{error}</div>
  {:else if pastItems.length === 0}
    <div class="text-center text-xl text-gray-200">No past auctions found</div>
  {:else}
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-90">
      {#each pastItems as item}
        <div class="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 group">
          <!-- Sold badge -->
          <div class="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
            SOLD
          </div>
          
          <img
            src={item.images && item.images.length > 0 ? item.images[0].image : '/placeholder.jpg'}
            alt={item.title}
            class="h-64 w-full bg-gray-100 object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
            on:error={handleImageError}
          />
          <div class="flex flex-grow flex-col p-6">
            <h2 class="mb-2 text-2xl font-semibold text-gray-700">{item.title}</h2>
            <span class="mb-2 text-sm font-medium text-gray-600">
              {item.category.name}
            </span>
            <p class="mb-4 line-clamp-2 text-gray-600">{item.description}</p>

            <div class="mb-4 rounded-lg bg-gray-100 p-3">
              <p class="text-center font-semibold text-red-600">Auction Ended</p>
            </div>

            <div class="mt-auto flex items-center justify-between">
              <span class="text-lg font-bold text-gray-700">Final Price: {formatPrice(item.current_price)}</span>
              <a
                href="/{item.category?.code?.toLowerCase() || 'misc'}/{item.id}"
                class="rounded bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
              >View Details</a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
{/if}