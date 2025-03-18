<script>
  import ReactiveExplicitZCard from '$lib/components/ui/3d-card/hybridcards/ReactiveExplicitZCard.svelte';
  
  // Demo State
  let currentHoverCard = null;
  
  // Conservative Z-values that work well
  const zValues = {
    base: -30,
    middle: -5,
    content: 20,
    action: 40
  };
  
  // Hover multiplier (conservative)
  const hoverScale = 4;
  
  // Card configuration
  const cards = [
    {
      id: 'knife',
      name: 'Alaskan Hunter Knife',
      category: 'Knives',
      price: 249,
      image: 'https://images.unsplash.com/photo-1589574515959-42f13a6d1ecd?q=80&w=2071&auto=format&fit=crop',
      bids: 12,
      timeRemaining: '4h 30m'
    },
    {
      id: 'gold',
      name: 'Gold Nugget Collection',
      category: 'Minerals',
      price: 1850,
      image: 'https://images.unsplash.com/photo-1610375461369-d613b564ed76?q=80&w=2070&auto=format&fit=crop',
      bids: 23,
      timeRemaining: '2d 8h'
    },
    {
      id: 'fishing',
      name: 'Vintage Fishing Kit',
      category: 'Equipment',
      price: 350,
      image: 'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?q=80&w=2029&auto=format&fit=crop',
      bids: 8,
      timeRemaining: '6h 15m'
    }
  ];
  
  // Handle hover state changes
  function handleHoverChange(cardId, event) {
    if (event.detail.isHovering) {
      currentHoverCard = cardId;
    } else if (currentHoverCard === cardId) {
      currentHoverCard = null;
    }
  }
</script>

<div class="container mx-auto py-12 px-4">
  <h1 class="text-3xl font-bold text-center mb-4">Reactive Z-Value Transition Demo</h1>
  <p class="text-center mb-10 max-w-2xl mx-auto">
    This demo shows Z-values changing between initial and hover states using the ReactiveExplicitZCard component.
  </p>
  
  <!-- Debug panel showing current Z values -->
  <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg mx-auto max-w-xl mb-10">
    <h2 class="text-lg font-bold mb-2">Z-Values {currentHoverCard ? '(Hovering)' : '(Normal)'}</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 text-center font-mono bg-black/20 py-2 rounded">
        Z Scale: {currentHoverCard ? hoverScale : 1}x
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-red-900/50 to-purple-900/50">
        <div class="text-sm text-white/70">Base Layer:</div>
        <div class="font-mono text-lg">
          {currentHoverCard ? `${zValues.base} → ${zValues.base * hoverScale}px` : `${zValues.base}px`}
        </div>
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-indigo-900/50 to-blue-900/50">
        <div class="text-sm text-white/70">Middle Layer:</div>
        <div class="font-mono text-lg">
          {currentHoverCard ? `${zValues.middle} → ${zValues.middle * hoverScale}px` : `${zValues.middle}px`}
        </div>
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-green-900/50 to-teal-900/50">
        <div class="text-sm text-white/70">Content Layer:</div>
        <div class="font-mono text-lg">
          {currentHoverCard ? `${zValues.content} → ${zValues.content * hoverScale}px` : `${zValues.content}px`}
        </div>
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-amber-900/50 to-yellow-900/50">
        <div class="text-sm text-white/70">Action Layer:</div>
        <div class="font-mono text-lg">
          {currentHoverCard ? `${zValues.action} → ${zValues.action * hoverScale}px` : `${zValues.action}px`}
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {#each cards as card}
      <div class="h-[450px]">
        <ReactiveExplicitZCard
          hoverZScale={hoverScale}
          initialScale={1}
          hoverScale={1.05}
          cardStyle="border-radius: 0.75rem; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);"
          on:hoverchange={(e) => handleHoverChange(card.id, e)}
        >
          <svelte:fragment slot="default" let:isHovering let:getItemStyle>
            <!-- Base layer with gradient (z = -30) -->
            <div 
              class="absolute inset-0 rounded-xl transition-all duration-300" 
              style:transform={getItemStyle(zValues.base).transform}
              style:transition={getItemStyle(zValues.base).transition}
            >
              <div class="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800"></div>
              <div class="absolute top-2 left-2 text-xs bg-black/40 text-white/70 px-2 py-1 rounded">
                Base (z={isHovering ? zValues.base * hoverScale : zValues.base})
              </div>
            </div>
            
            <!-- Middle layer with image (z = -5) -->
            <div 
              class="absolute inset-0 rounded-xl overflow-hidden transition-all duration-300" 
              style:transform={getItemStyle(zValues.middle).transform}
              style:transition={getItemStyle(zValues.middle).transition}
            >
              <div class="w-full h-48 overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.name}
                  class="w-full h-full object-cover" 
                />
                <div class="absolute top-2 right-2 text-xs bg-black/40 text-white/70 px-2 py-1 rounded">
                  Middle (z={isHovering ? zValues.middle * hoverScale : zValues.middle})
                </div>
              </div>
            </div>
            
            <!-- Content layer (z = 20) -->
            <div 
              class="absolute inset-x-0 bottom-0 p-5 transition-all duration-300" 
              style:transform={getItemStyle(zValues.content).transform}
              style:transition={getItemStyle(zValues.content).transition}
            >
              <div class="absolute top-0 right-5 text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                Content (z={isHovering ? zValues.content * hoverScale : zValues.content})
              </div>
              
              <h3 class="text-xl font-bold text-white mb-2">{card.name}</h3>
              
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-medium py-1 px-2 bg-white/20 rounded-full text-white">
                  {card.category}
                </span>
                <span class="text-xs text-white/70">
                  {card.bids} bids
                </span>
              </div>
              
              <div class="flex justify-between items-end mb-5">
                <div>
                  <p class="text-xs text-white/70">Current Bid</p>
                  <p class="text-2xl font-bold text-amber-400">${card.price}</p>
                </div>
                <div class="bg-white/10 backdrop-blur-sm py-1 px-3 rounded text-center">
                  <p class="text-xs text-white/70">Ends in</p>
                  <p class="text-sm font-medium text-white">{card.timeRemaining}</p>
                </div>
              </div>
              
              <!-- Action layer (z = 40) -->
              <div 
                class="transition-all duration-300" 
                style:transform={getItemStyle(zValues.action).transform}
                style:transition={getItemStyle(zValues.action).transition}
              >
                <div class="absolute -top-3 -right-1 text-xs bg-white/20 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  Action (z={isHovering ? zValues.action * hoverScale : zValues.action})
                </div>
                
                <button class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors">
                  Place Bid
                </button>
              </div>
            </div>
            
            <!-- Hover indicator -->
            <div class="absolute top-4 left-4 flex items-center gap-2">
              <div class={`h-3 w-3 rounded-full transition-colors ${isHovering ? 'bg-green-500' : 'bg-white/30'}`}></div>
              <span class="text-xs text-white/80">{isHovering ? 'Hovering' : 'Not hovering'}</span>
            </div>
          </svelte:fragment>
        </ReactiveExplicitZCard>
      </div>
    {/each}
  </div>
  
  <!-- Technical notes -->
  <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-3xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Implementation Notes</h2>
    <ul class="list-disc pl-5 space-y-2">
      <li>Uses ReactiveExplicitZCard component that properly updates z-values on hover</li>
      <li>Conservative z-values used: base (-30), middle (-5), content (20), action (40)</li>
      <li>Hover multiplier set to 1.5x to avoid flattening effects</li>
      <li>Z-values are explicitly shown and update on hover</li>
      <li>Each card tracks and displays its hover state and current z-values</li>
    </ul>
    
    <div class="mt-6">
      <p class="text-sm text-white/70">Try other approaches:</p>
      <div class="flex gap-4 mt-2">
        <a href="/testcard" class="text-amber-400 hover:text-amber-300 text-sm">Original Test</a>
        <a href="/testcard2" class="text-amber-400 hover:text-amber-300 text-sm">Direct DOM Test</a>
        <a href="/explicitcard" class="text-amber-400 hover:text-amber-300 text-sm">ExplicitCard Test</a>
        <a href="/example2" class="text-amber-400 hover:text-amber-300 text-sm">Example 2</a>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #0f172a;
    color: white;
    min-height: 100vh;
  }
</style> 