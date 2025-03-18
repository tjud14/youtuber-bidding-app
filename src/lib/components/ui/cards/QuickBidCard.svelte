<script>
  import ExplicitZCard from '$lib/components/ui/3d-card/hybridcards/ExplicitZCard.svelte';
  
  // Card props
  export let itemImage = '';
  export let itemName = '';
  export let currentBid = 0;
  export let nextBid = 0;
  export let bidIncrement = 10;
  export let timeRemaining = '';

  // Subtle z-values for a more flat appearance with just enough depth
  const baseZ = -15;
  const imageZ = -5;
  const titleZ = 5;
  const priceZ = 10;
  const bidActionsZ = 20;
</script>

<ExplicitZCard
  hoverZScale={1.4}
  initialScale={1}
  hoverScale={1.02}
  cardStyle="border-radius: 0.75rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);"
  className="w-full h-full"
>
  <svelte:fragment slot="default" let:getItemStyle>
    <!-- Base layer -->
    <div 
      class="absolute inset-0 rounded-xl bg-white dark:bg-gray-800" 
      style:transform={getItemStyle(baseZ).transform}
      style:transition={getItemStyle(baseZ).transition}
    ></div>
    
    <!-- Image layer -->
    <div 
      class="absolute inset-x-0 top-0 h-40 rounded-t-xl overflow-hidden" 
      style:transform={getItemStyle(imageZ).transform}
      style:transition={getItemStyle(imageZ).transition}
    >
      {#if itemImage}
        <img 
          src={itemImage} 
          alt={itemName}
          class="w-full h-full object-cover" 
        />
      {:else}
        <div class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span class="text-gray-500 dark:text-gray-400">No image</span>
        </div>
      {/if}
      
      <!-- Time remaining overlay -->
      <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {timeRemaining}
      </div>
    </div>
    
    <!-- Title layer -->
    <div 
      class="absolute inset-x-0 top-40 px-4 pt-3" 
      style:transform={getItemStyle(titleZ).transform}
      style:transition={getItemStyle(titleZ).transition}
    >
      <h3 class="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">{itemName}</h3>
    </div>
    
    <!-- Price layer -->
    <div 
      class="absolute inset-x-0 top-[160px] px-4" 
      style:transform={getItemStyle(priceZ).transform}
      style:transition={getItemStyle(priceZ).transition}
    >
      <div class="flex justify-between items-baseline">
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Current</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">${currentBid}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-500 dark:text-gray-400">Next Bid</p>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300">${nextBid}</p>
        </div>
      </div>
    </div>
    
    <!-- Bid actions layer -->
    <div 
      class="absolute inset-x-0 bottom-4 px-4" 
      style:transform={getItemStyle(bidActionsZ).transform}
      style:transition={getItemStyle(bidActionsZ).transition}
    >
      <div class="flex space-x-2">
        <button class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 rounded transition-colors">
          +${bidIncrement}
        </button>
        <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors">
          Bid ${nextBid}
        </button>
      </div>
    </div>
  </svelte:fragment>
</ExplicitZCard> 