<script>
  import { fetchApi } from '$lib/utils/api';
  import { onDestroy, onMount } from 'svelte';
  import PastAuctions from '$lib/components/PastAuctions.svelte';
  import AuctionCard from '$lib/components/ui/AuctionCard.svelte';

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
      const data = await fetchApi('items/?active=true&category=KNIFE');
      
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

  // Map API item data to the format expected by AuctionCard
  function mapItemToAuctionCard(item) {
    // Assign color based on price range or some other property
    const colors = [
      { color: 'blue', glow: '#60a5fa' },
      { color: 'indigo', glow: '#818cf8' },
      { color: 'purple', glow: '#a78bfa' },
      { color: 'emerald', glow: '#34d399' },
      { color: 'amber', glow: '#fbbf24' },
      { color: 'rose', glow: '#fb7185' }
    ];
    
    // Assign colors based on item properties for variety
    const colorIndex = Math.abs(item.id.toString().charCodeAt(0) % colors.length);
    const { color, glow } = colors[colorIndex];
    
    // Generate a label based on item properties
    let label = '';
    if (item.is_featured) label = 'FEATURED';
    else if (item.bids?.length > 10) label = 'POPULAR';
    else if (item.current_price > 500) label = 'PREMIUM';
    else if (item.timeRemaining?.total < 24 * 60 * 60 * 1000) label = 'ENDING SOON';
    
    // FIXED IMAGE SELECTION
    let imageUrl = '/placeholder.jpg';
    
    if (item.images && item.images.length > 0) {
      // Log all available images to help debug
      console.log("All item images:", item.images);
      
      // Look specifically for knife images first
      const knifeImage = item.images.find(img => 
        img.image && (
          img.image.toLowerCase().includes('knife') || 
          img.image.toLowerCase().includes('blade') ||
          img.image.toLowerCase().includes('thumbnail')
        )
      );
      
      // Use the knife-specific image if found, otherwise use the first image
      if (knifeImage) {
        imageUrl = knifeImage.image;
        console.log("Found knife-specific image:", imageUrl);
      } else if (item.images[0]?.image) {
        imageUrl = item.images[0].image;
        console.log("Using first available image:", imageUrl);
      }
    } else if (item.thumbnail) {
      // Some APIs provide a dedicated thumbnail field
      imageUrl = item.thumbnail;
      console.log("Using thumbnail image:", imageUrl);
    }
    
    // Add item ID to help with debugging
    console.log(`Item ${item.id} using image: ${imageUrl}`);
    
    return {
      id: item.id,
      name: item.title,
      youtuber: item.youtuber?.name || '',
      specs: item.highlights?.split(',').map(s => s.trim()).filter(s => s) || 
             item.description?.split('.').map(s => s.trim()).filter(s => s.length > 10 && s.length < 40).slice(0, 3) || [],
      currentBid: item.current_price,
      startingPrice: item.starting_price || item.current_price * 0.7,
      label: label,
      image: imageUrl,
      images: item.images,
      color: color,
      glowColor: glow,
      bids: item.bids?.length || 0,
      timeLeft: item.timeRemaining ? 
        `${item.timeRemaining.days > 0 ? item.timeRemaining.days + 'd ' : ''}${item.timeRemaining.hours}h ${item.timeRemaining.minutes}m` : '',
    };
  }

  // Handle bid events
  function handleBid(event) {
    console.log('Bid placed on item:', event.detail.itemId);
    
    // Find the item and navigate to its page
    const item = filteredItems.find(i => 
      i.id === event.detail.itemId || 
      (i.id && i.id.toString() === event.detail.itemId)
    );
    
    if (item) {
      const categoryPath = item.category?.code?.toLowerCase() || 'misc';
      window.location.href = `/${categoryPath}/${item.id}`;
    }
  }
  
  // Handle watchlist events
  function handleWatchlist(event) {
    console.log('Item added to watchlist:', event.detail.itemId);
    // Here you would add the item to the user's watchlist
  }

  // Handle image click events - navigates to the specific auction
  function handleImageClick(event) {
    console.log('Image clicked for item:', event.detail.itemId);
    
    // Find the item and navigate to its page
    const item = filteredItems.find(i => 
      i.id === event.detail.itemId || 
      (i.id && i.id.toString() === event.detail.itemId)
    );
    
    if (item) {
      const categoryPath = 'knives'; // We're on the knives page
      window.location.href = `/${categoryPath}/${item.id}`;
    }
  }

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

<div class="container mx-auto py-8">
  <h1 class="mb-8 text-center text-4xl font-bold text-white drop-shadow-lg">Knives Collection</h1>

  {#if loading}
    <div class="text-center text-xl text-white/80">Loading auctions...</div>
  {:else if error}
    <div class="text-center text-xl text-red-600">{error}</div>
  {:else if filteredItems.length === 0}
    <div class="text-center text-xl text-white/80">No knives available at the moment. Check back soon!</div>
  {:else}
    <div class="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="relative w-full sm:w-96">
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search..."
          class="w-full rounded-lg bg-white/90 px-4 py-2.5 pl-10 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        class="rounded-lg border bg-white/90 px-4 py-2.5 text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="ending-soon">Ending Soon</option>
        <option value="price-high">Price: High to Low</option>
        <option value="price-low">Price: Low to High</option>
        <option value="newest">Newest First</option>
      </select>
    </div>

    <!-- Real auctions grid with AuctionCard -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each filteredItems as item}
        <div class="card-wrapper">
          <AuctionCard 
            item={mapItemToAuctionCard(item)}
            cardHeight="h-[480px]"
            hoverScale={1.04}
            on:bid={handleBid}
            on:watchlist={handleWatchlist}
            on:imageClick={handleImageClick}
          />
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- Past Auctions Section with proper styling -->
  <div class="mt-16 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm p-8">
    <PastAuctions 
      categoryCode="KNIFE" 
      categoryName="Knives"
      headingClass="text-2xl font-bold text-white mb-6"  
    />
  </div>
</div>

<style>
  .card-wrapper {
    /* Create space for 3D effects */
    transform-style: preserve-3d;
    perspective: 1000px;
    /* Ensure there's enough space around cards */
    margin: 1.5rem;
    /* Prevent cards from being clipped */
    overflow: visible;
  }

  /* Make sure this also applies to child elements */
  :global(.card-wrapper > *) {
    overflow: visible !important;
  }
</style>