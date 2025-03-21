<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import Enhanced3DCard from '$lib/components/ui/3d-card/hybridcards/Enhanced3DCard.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  
  // Configurable props
  export let item = {
    id: '',
    title: '',
    youtuber: null,
    description: '',
    specs: [],
    current_price: 0,
    starting_price: 0,
    images: [],
    thumbnail: '',
    condition: '',
    highlights: ''
  };
  
  // Default card dimensions and appearance
  export let cardHeight = "h-[480px]";
  export let hoverScale = 1.08;
  export let maxRotation = 12;
  export let perspective = 1800;
  
  // Optional additional class for container
  export let containerClass = "";
  
  // Event dispatcher for handling clicks and interactions
  const dispatch = createEventDispatcher();
  
  // Handle hover state changes
  let currentHoverCard = null;
  
  function handleHoverChange(event) {
    if (event.detail.isHovering) {
      currentHoverCard = item.id;
    } else if (currentHoverCard === item.id) {
      currentHoverCard = null;
    }
    
    dispatch('hoverchange', event.detail);
  }
  
  // Format price
  function formatPrice(price) {
    // Check if price is a valid number to avoid NaN
    if (typeof price !== 'number' || isNaN(price)) {
      return "$0.00"; // Return default price if invalid
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }
  
  // Extract specs from item
  function extractSpecs(item) {
    let specs = [];
    
    if (item.highlights) {
      // Use highlights if available, limit to 3 meaningful points
      specs = item.highlights.split(',')
        .map(s => s.trim())
        .filter(s => s && s.length > 3)
        .slice(0, 3);
    } else if (item.description) {
      // Extract meaningful information from description
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
  
  // Get color for item
  function getItemColor(item) {
    const colors = [
      { color: 'blue', glow: '#60a5fa' },
      { color: 'indigo', glow: '#818cf8' },
      { color: 'purple', glow: '#a78bfa' },
      { color: 'emerald', glow: '#34d399' },
      { color: 'amber', glow: '#fbbf24' },
      { color: 'rose', glow: '#fb7185' },
      { color: 'cyan', glow: '#22d3ee' },
      { color: 'lime', glow: '#84cc16' },
      { color: 'teal', glow: '#14b8a6' },
      { color: 'orange', glow: '#fb923c' },
      { color: 'fuchsia', glow: '#d946ef' }
    ];
    
    // Use a consistent algorithm to pick a color based on item ID or other properties
    // Using multiple properties creates more variety
    const idStr = `${item.id}${item.title.length}`;
    const idNum = parseInt(idStr.replace(/\D/g, '')) || 0;
    const colorIndex = Math.abs(idNum % colors.length);
    return colors[colorIndex];
  }
  
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
</script>

<div class={`card-container ${cardHeight} ${containerClass}`}>
  <Enhanced3DCard
    hoverZScale={1.3}
    initialScale={1}
    hoverScale={hoverScale}
    maxRotation={maxRotation}
    perspective={perspective}
    transitionDuration={0.3}
    transitionEasing="cubic-bezier(0.23, 1, 0.32, 1)"
    cardStyle="border-radius: 1rem;"
    className="past-auction-card"
    on:hoverchange={handleHoverChange}
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
        
        <!-- Using ResponsiveImage for better image handling -->
        <div class="w-full h-full" 
             class:grayscale-60={isHovering}
             class:grayscale-90={!isHovering}
             class:brightness-100={isHovering}
             class:brightness-90={!isHovering}
             style="transition: filter 0.5s ease-out;">
          {#if item.images && item.images.length > 0}
            <ResponsiveImage
              src={item.images[0].image}
              webpSrc={item.images[0].webp_url || ''}
              width={item.images[0].width || 0}
              height={item.images[0].height || 0}
              alt={item.title}
              className="w-full h-full object-cover"
              fallbackSrc="/images/placeholder.jpg"
              fillContainer={true}
            />
          {:else if item.thumbnail}
            <ResponsiveImage
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              fallbackSrc="/images/placeholder.jpg"
              fillContainer={true}
            />
          {:else}
            <img 
              src="/images/placeholder.jpg" 
              alt={item.title}
              class="w-full h-full object-cover"
            />
          {/if}
        </div>
        
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
                    style="transition-delay: {0.2 + (i * 0.05)}s; 
                           opacity: {isHovering ? '1' : '0.9'}; 
                           transform: translateX({isHovering ? '0' : '-5px'}); 
                           transition: opacity 0.3s ease, transform 0.3s ease;">
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
                  {formatPrice(typeof item.current_price === 'number' ? item.current_price : 0)}
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
      </div>
    </svelte:fragment>
  </Enhanced3DCard>
</div>

<style>
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
  
  /* Grayscale and brightness utility classes */
  .grayscale-60 {
    filter: grayscale(60%);
  }
  
  .grayscale-90 {
    filter: grayscale(90%);
  }
  
  .brightness-100 {
    filter: brightness(100%);
  }
  
  .brightness-90 {
    filter: brightness(90%);
  }
</style> 