<script>
  import ExplicitZCard from '$lib/components/ui/3d-card/hybridcards/ExplicitZCard.svelte';
  
  // Card props
  export let itemImage = '';
  export let itemName = '';
  export let currentBid = 0;
  export let estimatedValue = 0;
  export let timeRemaining = '';
  export let itemCategory = '';
  export let premium = false;
  
  // Moderate z-values for better perspective
  const baseZ = -25;
  const overlayZ = -15;
  const badgeZ = 5;
  const contentZ = 15;
  const buttonZ = 30;
</script>

<ExplicitZCard
  hoverZScale={1.6}
  initialScale={1}
  hoverScale={1.04}
  cardStyle="border-radius: 0.75rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);"
  className="w-full h-full"
>
  <svelte:fragment slot="default" let:getItemStyle>
    <!-- Base layer with image background -->
    <div 
      class="absolute inset-0" 
      style:transform={getItemStyle(baseZ).transform}
      style:transition={getItemStyle(baseZ).transition}
    >
      {#if itemImage}
        <img 
          src={itemImage} 
          alt={itemName}
          class="w-full h-full object-cover"
        />
      {:else}
        <div class="w-full h-full bg-gray-900"></div>
      {/if}
    </div>
    
    <!-- Gradient overlay for readability -->
    <div 
      class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" 
      style:transform={getItemStyle(overlayZ).transform}
      style:transition={getItemStyle(overlayZ).transition}
    ></div>
    
    <!-- Premium badge (if applicable) -->
    {#if premium}
      <div 
        class="absolute top-3 right-3" 
        style:transform={getItemStyle(badgeZ).transform}
        style:transition={getItemStyle(badgeZ).transition}
      >
        <div class="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          PREMIUM
        </div>
      </div>
    {/if}
    
    <!-- Category badge -->
    <div 
      class="absolute top-3 left-3" 
      style:transform={getItemStyle(badgeZ).transform}
      style:transition={getItemStyle(badgeZ).transition}
    >
      <div class="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
        {itemCategory}
      </div>
    </div>
    
    <!-- Content layer -->
    <div 
      class="absolute inset-x-0 bottom-0 p-4" 
      style:transform={getItemStyle(contentZ).transform}
      style:transition={getItemStyle(contentZ).transition}
    >
      <h3 class="text-xl font-bold text-white mb-2 line-clamp-2">{itemName}</h3>
      
      <div class="flex justify-between items-end mb-4">
        <div>
          <p class="text-xs text-gray-300">Current Bid</p>
          <p class="text-2xl font-bold text-white">${currentBid.toLocaleString()}</p>
          {#if estimatedValue > 0}
            <p class="text-xs text-gray-400">Est. Value: ${estimatedValue.toLocaleString()}</p>
          {/if}
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded px-3 py-1 text-center">
          <p class="text-xs text-gray-300">Ends In</p>
          <p class="text-sm font-medium text-white">{timeRemaining}</p>
        </div>
      </div>
      
      <!-- Bid button -->
      <div 
        class="mt-2" 
        style:transform={getItemStyle(buttonZ).transform}
        style:transition={getItemStyle(buttonZ).transition}
      >
        <button class="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg shadow-lg transition-colors">
          Bid Now
        </button>
      </div>
    </div>
  </svelte:fragment>
</ExplicitZCard> 