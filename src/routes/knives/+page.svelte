<script>
  import { fetchApi } from '$lib/utils/api';
  import { onDestroy, onMount } from 'svelte';
  import Enhanced3DCard from '$lib/components/ui/3d-card/hybridcards/Enhanced3DCard.svelte';
  import AuctionCard from '$lib/components/ui/AuctionCard.svelte';
  import PastAuctionCard from '$lib/components/ui/PastAuctionCard.svelte';
  import { fade } from 'svelte/transition';

  let items = [];
  let loading = true;
  let error = null;
  let timerInterval;
  let searchTerm = '';
  let sortOption = 'ending-soon';
  
  // Past auctions state
  let pastItems = [];
  let loadingPast = true;
  let pastError = null;
  let showPastAuctions = true;
  let currentHoverCard = null;
  
  // Z-values for 3D card layers
  const zValues = {
    background: -200,
    backgroundPattern: -170,
    cardBackground: -150,
    image: -50,
    glow: -45,
    badge: 40,
    container: 30,
    title: 80,
    subtitle: 60,
    specs: 70,
    price: 100,
    button: 50,
    buttonIcon: 65
  };

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
  
  // Map API item data to the format expected by AuctionCard
  function mapItemToAuctionCard(item) {
    // Create proper images array with all required properties
    let images = [];
    
    if (item.images && item.images.length > 0) {
      images = item.images.map(img => ({
        image: img.image || img.url || '',
        webp_url: img.webp_url || '',
        width: img.width || 800,
        height: img.height || 600
      }));
    } else if (item.image) {
      // Single image string
      images = [{
        image: item.image,
        webp_url: '',
        width: 800,
        height: 600
      }];
    } else if (item.thumbnail) {
      // Fallback to thumbnail
      images = [{
        image: item.thumbnail,
        webp_url: '',
        width: 800,
        height: 600
      }];
    }
    
    // FIXED: Return a properly formatted object for the AuctionCard component
    // The AuctionCard expects properties like 'currentBid', 'name', etc.
    return {
      id: item.id,
      name: item.title,
      youtuber: item.youtuber?.name || '',
      specs: extractSpecs(item),
      currentBid: item.current_price, // Map current_price to currentBid
      startingPrice: item.starting_price || 0,
      label: item.is_featured ? 'FEATURED' : '',
      image: '',
      images: images.length > 0 ? images : [{ 
        image: '/images/placeholder.jpg',
        webp_url: '',
        width: 800,
        height: 600
      }],
      color: getItemColor(item).color,
      glowColor: getItemColor(item).glow,
      bids: item.bids?.length || 0,
      timeLeft: item.timeRemaining ? 
        `${item.timeRemaining.days > 0 ? item.timeRemaining.days + 'd ' : ''}${item.timeRemaining.hours}h ${item.timeRemaining.minutes}m` : '',
    };
  }
  
  // Replace the loadPastItems function with our improved version
  async function loadPastItems() {
    loadingPast = true;
    pastError = null;
    
    try {
      console.log('Loading past knives...');
      
      // Use the working endpoint with the correct parameters
      const data = await fetchApi('items/?category=KNIFE&active=false');
      console.log('Loaded past knives:', data);
      
      // This endpoint returns a paginated response object with a 'results' property
      const results = data.results || [];
      
      // Process each past auction item to ensure it has valid data
      pastItems = results
        .filter(item => item !== null)
        .map(item => {
          // Ensure current_price is a number to avoid NaN
          const current_price = typeof item.current_price === 'number' ? 
            item.current_price : 
            (typeof item.current_price === 'string' ? 
              parseFloat(item.current_price) : 0);
          
          // Return a properly formatted item
          return {
            ...item,
            current_price: current_price || 0,
            starting_price: item.starting_price || 0,
            title: item.title || 'Unknown Item',
            // Create proper images structure
            images: prepareItemImages(item)
          };
        });
      
      console.log('Loaded past items:', pastItems);
    } catch (err) {
      console.error('Error fetching past auctions:', err);
      pastError = err.message || "Failed to load past auctions";
      pastItems = [];
    } finally {
      loadingPast = false;
    }
  }

  // Helper function to prepare images for both current and past auctions
  function prepareItemImages(item) {
    let images = [];
    
    if (item.images && item.images.length > 0) {
      images = item.images.map(img => ({
        image: img.image || img.url || '',
        webp_url: img.webp_url || '',
        width: img.width || 800,
        height: img.height || 600
      }));
    } else if (item.image) {
      // Single image string
      images = [{
        image: item.image,
        webp_url: '',
        width: 800,
        height: 600
      }];
    } else if (item.thumbnail) {
      // Fallback to thumbnail
      images = [{
        image: item.thumbnail,
        webp_url: '',
        width: 800,
        height: 600
      }];
    }
    
    // Return a valid images array or a placeholder
    return images.length > 0 ? images : [{ 
      image: '/images/placeholder.jpg',
      webp_url: '',
      width: 800,
      height: 600
    }];
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

  // Add the missing updateTimeRemaining function
  function updateTimeRemaining(itemsToUpdate) {
    return itemsToUpdate.map(item => ({
      ...item,
      timeRemaining: getTimeRemaining(item.end_date)
    }));
  }

  $: sortedItems = items ? sortItems(items, sortOption) : [];
  $: filteredItems = sortedItems.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Handle hover state changes for 3D cards
  function handleHoverChange(itemId, event) {
    if (event.detail.isHovering) {
      currentHoverCard = itemId;
    } else if (currentHoverCard === itemId) {
      currentHoverCard = null;
    }
  }
  
  // Extract relevant specs from item description
  function extractSpecs(item) {
    let specs = [];
    
    if (item.highlights) {
      // Use highlights if available, but limit to 3 meaningful points
      specs = item.highlights.split(',')
        .map(s => s.trim())
        .filter(s => s && s.length > 3)
        .slice(0, 3);
    } else if (item.description) {
      // Extract more meaningful information from description
      const descLines = item.description
        .replace(/•/g, '.')  // Convert bullets to periods
        .replace(/- /g, '. ') // Convert dashes to periods
        .split('.')
        .map(s => s.trim())
        .filter(s => s.length > 5 && s.length < 60);
      
      specs = descLines.slice(0, 3);
    }
    
    // Get knife condition if available
    if (item.condition) {
      specs.unshift(`Condition: ${item.condition}`);
      specs = specs.slice(0, 3);
    }
    
    return specs.length > 0 ? specs : ['Knife auction', 'Final sale', 'No returns'];
  }
  
  // Get main image from item
  function getMainImage(item) {
    if (item.images && item.images.length > 0) {
      const mainImage = item.images.find(img => 
        img.image && img.is_primary
      ) || item.images[0];
      
      if (mainImage?.image) {
        return mainImage.image;
      }
    }
    
    return item.thumbnail || '/placeholder.jpg';
  }
  
  // Create color assignment for consistent colors
  function getItemColor(item) {
    const colors = [
      { color: 'blue', glow: '#60a5fa' },
      { color: 'indigo', glow: '#818cf8' },
      { color: 'purple', glow: '#a78bfa' },
      { color: 'emerald', glow: '#34d399' },
      { color: 'amber', glow: '#fbbf24' },
      { color: 'rose', glow: '#fb7185' }
    ];
    
    const idNum = parseInt(item.id.toString().replace(/\D/g, '')) || 0;
    const colorIndex = Math.abs(idNum % colors.length);
    return colors[colorIndex];
  }
  
  // Handle image error
  function handleImageError(e) {
    e.currentTarget.src = '/placeholder.jpg';
  }

  onMount(async () => {
    try {
      await loadItems();
      await loadPastItems(); // Load past items with improved image handling
      
      timerInterval = setInterval(() => {
        // Update timers
        if (items.length > 0) {
          items = updateTimeRemaining(items);
        }
      }, 60000); // Update every minute
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });
</script>

<div class="container mx-auto py-8">
  <h1 class="mb-8 text-center text-4xl font-bold text-white drop-shadow-lg">Knife Collection</h1>

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
            cardHeight="h-[500px]"
            hoverScale={1.2}
            on:bid={handleBid}
            on:watchlist={handleWatchlist}
            on:imageClick={handleImageClick}
          />
        </div>
      {/each}
    </div>
  {/if}
  
  <!-- Past Auctions Section -->
  <div class="mt-24 mb-20">
    <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-white mb-2 tracking-tight">Past Auctions</h2>
      <p class="text-gray-400 mb-10">Check out previously sold items.</p>
      
      {#if loadingPast}
        <div class="text-center py-10">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          <p class="mt-2 text-gray-400">Loading past auctions...</p>
        </div>
      {:else if pastError}
        <div class="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <p class="text-red-400">{pastError}</p>
        </div>
      {:else if pastItems.length === 0}
        <div class="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 text-center">
          <p class="text-gray-400">No past auctions available.</p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10" transition:fade={{ duration: 800 }}>
          {#each pastItems as item, i (item.id)}
            <div 
              class="auction-card-wrapper transform transition-all duration-[800ms]"
              style="--index: {i}; 
                     animation: fadein 500ms calc(100ms * var(--index)) both;
                     transform-origin: center;"
            >
              <PastAuctionCard {item} cardHeight="h-[480px]" hoverScale={1.08} />
            </div>
          {/each}
        </div>
      {/if}
    </div>
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
  
  /* Card styling for past auctions */
  .card-container {
    perspective: 1500px;
    transform-style: preserve-3d; 
    transition: opacity 0.5s ease;
    /* Critical: Ensure 3D effects aren't clipped */
    overflow: visible !important;
    /* Add margin to create space between cards */
    margin: 0.5rem;
    /* Ensure z-index works properly */
    isolation: isolate;
    position: relative;
    z-index: 1;
  }
  
  /* Target child elements to ensure they don't clip */
  .card-container > * {
    overflow: visible !important;
  }
  
  /* Card layer styles with proper border radius but no overflow hidden */
  .card-base, .card-pattern, .card-image, .card-glow {
    border-radius: 1rem;
  }
  
  /* Text shadow for better readability */
  .text-shadow-sharp {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  
  /* Button hover effects */
  .details-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(107, 114, 128, 0.5);
  }
  
  /* Dot pattern background */
  .pattern-dots {
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  /* Fix 3D transforms */
  :global(.past-auction-card),
  :global(.enhanced-card) {
    border-radius: 1rem;
    overflow: visible !important;
  }
  
  :global(.past-auction-card *),
  :global(.enhanced-card *) {
    transform-style: preserve-3d !important;
  }
  
  /* Critical fix: Ensure the Enhanced3DCard component wrapper is properly styled */
  :global(.enhanced-card-wrapper) {
    border-radius: 1rem !important;
    overflow: visible !important;
  }
  
  /* Ensure grid items have enough margin and no overflow restrictions */
  .grid {
    margin: 1rem 0;
    overflow: visible !important;
  }
  
  /* Add keyframes animation for fading in cards */
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Adjust wrapper for better animation display */
  .auction-card-wrapper {
    /* Create space for 3D effects */
    transform-style: preserve-3d;
    perspective: 1000px;
    /* Ensure there's enough space around cards */
    margin: 0.5rem;
    /* Prevent cards from being clipped */
    overflow: visible !important;
  }
  
  /* Make sure this also applies to child elements */
  :global(.auction-card-wrapper > *) {
    overflow: visible !important;
  }
</style>