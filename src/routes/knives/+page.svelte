<script>
  import { fetchApi } from '$lib/utils/api';
  import { onDestroy, onMount } from 'svelte';
  import Enhanced3DCard from '$lib/components/ui/3d-card/hybridcards/Enhanced3DCard.svelte';
  import AuctionCard from '$lib/components/ui/AuctionCard.svelte';

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
  
  // Load past knife auctions
  async function loadPastItems() {
    try {
      loadingPast = true;
      pastError = null;
      console.log('Loading past knives...');
      
      // Use the working endpoint with the correct parameters
      const data = await fetchApi('items/?category=KNIFE&active=false');
      console.log('Loaded past knives:', data);
      
      // This endpoint returns a paginated response object with a 'results' property
      pastItems = data.results || [];
    } catch (e) {
      console.error('Error loading past knives:', e);
      pastError = e.message || 'Failed to load past knives';
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
    
    // IMPROVED: Better specs extraction
    let specs = [];
    if (item.highlights) {
      // Use highlights if available, but limit to 3 meaningful points
      specs = item.highlights.split(',')
        .map(s => s.trim())
        .filter(s => s && s.length > 3)
        .slice(0, 3);
    } else if (item.description) {
      // Extract more meaningful information from description
      // Look for bullet points, dashes, or natural sentence breaks
      const descLines = item.description
        .replace(/•/g, '.')  // Convert bullets to periods
        .replace(/- /g, '. ') // Convert dashes to periods
        .split('.')
        .map(s => s.trim())
        .filter(s => s.length > 5 && s.length < 60); // More reasonable length
      
      specs = descLines.slice(0, 3);
    }
    
    // Get knife condition if available
    if (item.condition) {
      specs.unshift(`Condition: ${item.condition}`);
      specs = specs.slice(0, 3); // Keep only 3 total
    }
    
    // IMPROVED IMAGE SELECTION
    let imageUrl = '/placeholder.jpg';
    let images = [];

    if (item.images && item.images.length > 0) {
      // Create a proper images array for the 3D card
      images = item.images.map(img => ({
        image: img.image,
        webp_url: img.webp_url || '',
        width: img.width || 0,
        height: img.height || 0
      }));
      
      // Look for the best thumbnail image
      const mainImage = item.images.find(img => 
        img.image && img.is_primary
      ) || item.images[0];
      
      if (mainImage?.image) {
        imageUrl = mainImage.image;
      }
    } else if (item.thumbnail) {
      imageUrl = item.thumbnail;
      // Also add to images array for the card
      images = [{
        image: item.thumbnail,
        webp_url: '',
        width: 0,
        height: 0
      }];
    }
    
    // Add item ID to help with debugging
    console.log(`Item ${item.id} using image: ${imageUrl}`);
    
    return {
      id: item.id,
      name: item.title,
      youtuber: item.youtuber?.name || '',
      specs: specs,
      currentBid: item.current_price,
      startingPrice: item.starting_price || item.current_price * 0.7,
      label: label,
      image: imageUrl,
      images: images,
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
      await loadPastItems(); // Load past items
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
  
  <!-- Past Auctions Section with Enhanced 3D Cards -->
  <div class="mt-16">
    <!-- Background wrapper without overflow hidden -->
    <div class="rounded-xl bg-slate-900/50 backdrop-blur-sm p-8">
      <!-- Past auctions toggle header -->
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white drop-shadow-lg">
          Past Knife Auctions
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
      
      {#if showPastAuctions}
        {#if loadingPast}
          <div class="text-center text-xl text-white/80">Loading past auctions...</div>
        {:else if pastError}
          <div class="text-center text-xl text-red-600">{pastError}</div>
        {:else if pastItems.length === 0}
          <div class="text-center text-xl text-white/80">No past knives auctions found</div>
        {:else}
          <!-- Cards grid without overflow restriction -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500">
            {#each pastItems as item}
              <div class="h-[480px] card-container">
                <Enhanced3DCard
                  hoverZScale={1.3}
                  initialScale={1}
                  hoverScale={1.08}
                  maxRotation={12}
                  perspective={1800}
                  transitionDuration={0.3}
                  transitionEasing="cubic-bezier(0.23, 1, 0.32, 1)"
                  cardStyle="border-radius: 1rem;"
                  className="past-auction-card"
                  on:hoverchange={(e) => handleHoverChange(item.id, e)}
                >
                  <svelte:fragment slot="default" let:isHovering let:getItemStyle>
                    <!-- Base card with color gradients -->
                    <div class="absolute inset-0 card-base"
                         style:transform={getItemStyle(zValues.cardBackground).transform}
                         style:transition={getItemStyle(zValues.cardBackground).transition}>
                      <div class="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
                    </div>
                    
                    <!-- Animated background pattern with parallax -->
                    <div class="absolute inset-0 card-pattern"
                         style:transform={getItemStyle(zValues.backgroundPattern, {delay: 0.05}).transform}
                         style:transition={getItemStyle(zValues.backgroundPattern, {delay: 0.05}).transition}>
                      <div class="w-full h-full pattern-dots opacity-10"></div>
                    </div>
                    
                    <!-- Product image layer with grayscale filter -->
                    <div class="absolute inset-0 card-image"
                         style:transform={getItemStyle(zValues.image, {
                           xOffset: isHovering ? -5 : 0,
                           yOffset: isHovering ? -5 : 0,
                           customDuration: 0.6,
                           delay: 0.1
                         }).transform}
                         style:transition={getItemStyle(zValues.image, {
                           customDuration: 0.6,
                           delay: 0.1
                         }).transition}>
                      <!-- Image with grayscale that reduces on hover -->
                      <img 
                        src={getMainImage(item)} 
                        alt={item.title}
                        on:error={handleImageError}
                        class="w-full h-full object-cover filter"
                        style="filter: grayscale({isHovering ? '60%' : '90%'}) brightness({isHovering ? '100%' : '90%'}); transition: filter 0.5s ease-out;"
                      />
                      
                      <!-- Gradient overlay -->
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    
                    <!-- Glow effect layer -->
                    {#if isHovering}
                      <div class="absolute inset-0 card-glow" 
                           style:transform={getItemStyle(zValues.glow).transform}
                           style:transition={getItemStyle(zValues.glow, {
                             customDuration: 0.8,
                             customEasing: 'cubic-bezier(0.19, 1, 0.22, 1)'
                           }).transition}>
                        <div class="w-full h-full" 
                             style="background: radial-gradient(circle at center, {getItemColor(item).glow} 0%, transparent 70%); 
                                    opacity: 0.05; 
                                    mix-blend-mode: screen;">
                        </div>
                      </div>
                    {/if}
                    
                    <!-- SOLD Badge -->
                    <div style:transform={getItemStyle(zValues.badge, {
                           scale: isHovering ? 1.1 : 1,
                           customDuration: 0.4,
                           delay: 0.2
                         }).transform}
                         style:transition={getItemStyle(zValues.badge, {
                           customDuration: 0.4,
                           delay: 0.2
                         }).transition}
                         class="absolute top-6 right-6">
                      <span class="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-red-500/30">
                        SOLD
                      </span>
                    </div>
                    
                    <!-- Content container -->
                    <div class="absolute inset-0 flex flex-col p-8"
     style:transform={getItemStyle(zValues.container).transform}
     style:transition={getItemStyle(zValues.container).transition}>
  
  <!-- Dark gradient overlay for better text readability -->
  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none"></div>
  
  <!-- Title and subtitle at top -->
  <div class="relative z-10">
    <!-- Title -->
    <div style:transform={getItemStyle(zValues.title, {
           xOffset: isHovering ? 5 : 0,
           delay: 0.1
         }).transform}
         style:transition={getItemStyle(zValues.title, {
           delay: 0.1
         }).transition}
         class="mb-1">
      <h3 class="text-2xl font-bold text-white" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);">{item.title}</h3>
    </div>
    
    <!-- Subtitle -->
    <div style:transform={getItemStyle(zValues.subtitle, {
           xOffset: isHovering ? 8 : 0, 
           delay: 0.15
         }).transform}
         style:transition={getItemStyle(zValues.subtitle, {
           delay: 0.15
         }).transition}
         class="mb-4">
      <p class="text-white text-sm font-medium" style="text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);">
        {item.youtuber?.name || 'Collection Item'}
      </p>
    </div>
  </div>
  
  <!-- Specs and other elements pushed to bottom -->
  <div class="mt-auto relative z-10">
    <!-- Specs list with better clarity -->
    <div style:transform={getItemStyle(zValues.specs, {
           yOffset: isHovering ? -3 : 0, 
           delay: 0.2
         }).transform}
         style:transition={getItemStyle(zValues.specs, {
           delay: 0.2
         }).transition}
         class="mb-5">
      <ul class="space-y-2">
        {#each extractSpecs(item) as spec, i}
          <li class="flex items-center gap-2" 
              style="transition-delay: {0.2 + (i * 0.05)}s; opacity: {isHovering ? '1' : '0.9'}; transform: translateX({isHovering ? '0' : '-5px'}); transition: opacity 0.3s ease, transform 0.3s ease;">
            <div class="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-sm w-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-400 flex-shrink-0 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-white text-sm">{spec}</span>
            </div>
          </li>
        {/each}
      </ul>
    </div>
    
    <!-- Final price with enhanced clarity -->
    <div style:transform={getItemStyle(zValues.price, {
           scale: isHovering ? 1.1 : 1, 
           delay: 0.25
         }).transform}
         style:transition={getItemStyle(zValues.price, {
           delay: 0.25,
           customDuration: 0.4,
         }).transition}
         class="mb-3">
      <div class="bg-black/10 backdrop-blur-sm px-4 py-2 rounded-sm">
        <div class="flex items-center gap-2">
          <div class="text-sm text-white font-medium">Final Price:</div>
          <div class="text-2xl font-bold text-white" style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);">
            {formatPrice(item.current_price)}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Auction ended notice with better visibility -->
    <div style:transform={getItemStyle(zValues.specs - 10, {
           delay: 0.3
         }).transform}
         style:transition={getItemStyle(zValues.specs - 10, {
           delay: 0.3
         }).transition}
         class="mb-5">
      <div class="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-center">
        <p class="font-semibold text-red-300">Auction Ended</p>
      </div>
    </div>
    
    <!-- View Details button at bottom -->
    <div style:transform={getItemStyle(zValues.button, {
           delay: 0.35
         }).transform}
         style:transition={getItemStyle(zValues.button, {
           delay: 0.35
         }).transition}>
      <a 
        href="/knives/{item.id}"
        class="details-btn w-full bg-gradient-to-r 
               from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500
               text-white px-4 py-3 rounded-lg text-sm font-semibold 
               shadow-xl hover:shadow-gray-500/40 
               transition-all duration-300 ease-out text-center block">
        View Details
      </a>
    </div>
  </div>
                  </svelte:fragment>
                </Enhanced3DCard>
              </div>
            {/each}
          </div>
        {/if}
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
</style>