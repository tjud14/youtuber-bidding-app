<script>
  import ExplicitZCard from '$lib/components/ui/3d-card/hybridcards/ExplicitZCard.svelte';
  
  // Card props
  export let itemImage = '';
  export let itemName = '';
  export let currentBid = 0;
  export let timeRemaining = '';
  export let bidCount = 0;
  
  // More conservative z-values for better perspective
  const baseZ = -20;
  const imageZ = -5;
  const contentZ = 10;
  const bidButtonZ = 25;
  
  // We use a smaller hover scale to avoid extreme z-depth changes
  const hoverZScale = 1.5;
</script>

<ExplicitZCard
  hoverZScale={hoverZScale}
  initialScale={1}
  hoverScale={1.03}
  cardStyle="border-radius: 0.75rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);"
  className="w-full h-full"
>
  <svelte:fragment slot="default" let:getItemStyle>
    <!-- Base layer with gradient background -->
    <div 
      class="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800" 
      style:transform={getItemStyle(baseZ).transform}
      style:transition={getItemStyle(baseZ).transition}
    ></div>
    
    <!-- Image layer -->
    <div 
      class="absolute inset-0 rounded-xl overflow-hidden" 
      style:transform={getItemStyle(imageZ).transform}
      style:transition={getItemStyle(imageZ).transition}
    >
      <div class="w-full h-48 overflow-hidden">
        {#if itemImage}
          <img 
            src={itemImage} 
            alt={itemName}
            class="w-full h-full object-cover transition-transform" 
          />
        {:else}
          <div class="w-full h-full bg-gray-800 flex items-center justify-center">
            <span class="text-gray-500">No image available</span>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Content layer -->
    <div 
      class="absolute inset-0 pt-48 p-4 rounded-xl" 
      style:transform={getItemStyle(contentZ).transform}
      style:transition={getItemStyle(contentZ).transition}
    >
      <h3 class="text-lg font-bold text-white mb-2 line-clamp-1">{itemName}</h3>
      
      <div class="flex justify-between items-center mb-4">
        <div>
          <p class="text-xs text-gray-400">Current Bid</p>
          <p class="text-xl font-bold text-amber-400">${currentBid.toLocaleString()}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-400">Time Left</p>
          <p class="text-sm font-medium text-white">{timeRemaining}</p>
        </div>
      </div>
      
      <div class="text-xs text-gray-400 mb-1">
        {bidCount} bid{bidCount !== 1 ? 's' : ''}
      </div>
    </div>
    
    <!-- Bid button layer -->
    <div 
      class="absolute bottom-4 left-4 right-4" 
      style:transform={getItemStyle(bidButtonZ).transform}
      style:transition={getItemStyle(bidButtonZ).transition}
    >
      <button class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors">
        Place Bid
      </button>
    </div>
  </svelte:fragment>
</ExplicitZCard> 