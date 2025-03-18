<script>
  import ReactiveExplicitZCard from '$lib/components/ui/3d-card/hybridcards/ReactiveExplicitZCard.svelte';
  
  // Define z-values to make them visible in UI
  const baseZ = -50;
  const middleZ = 0;
  const frontZ = 50;
  const topZ = 100;
  
  // Calculate hover values
  $: hoverZScale = 2;
  $: hoverBaseZ = baseZ * hoverZScale;
  $: hoverMiddleZ = middleZ * hoverZScale;
  $: hoverFrontZ = frontZ * hoverZScale;
  $: hoverTopZ = topZ * hoverZScale;
  
  // For demo purposes - to view current z-values
  let isCardHovering = false;
  
  // Sync with component's hover state
  function handleHoverChange(event) {
    isCardHovering = event.detail.isHovering;
  }
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-8">Reactive Z-Value Test</h1>
  <p class="text-center mb-4 max-w-2xl mx-auto">This demo uses a reactive approach that properly updates Z-values.</p>
  
  <!-- Debug panel - always visible -->
  <div class="bg-white/10 backdrop-blur-md p-4 rounded-lg mx-auto max-w-xl mb-10">
    <h2 class="text-lg font-bold mb-2">Current Z-Values {isCardHovering ? '(Hovering)' : '(Normal)'}</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 text-center font-mono bg-black/20 py-2 rounded">
        Z Scale: {isCardHovering ? hoverZScale : 1}x
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-red-900/50 to-purple-900/50">
        <div class="text-sm text-white/70">Base Layer:</div>
        <div class="font-mono text-lg">
          {isCardHovering ? baseZ + ' → ' + hoverBaseZ : baseZ}px
        </div>
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-indigo-900/50 to-blue-900/50">
        <div class="text-sm text-white/70">Middle Layer:</div>
        <div class="font-mono text-lg">
          {isCardHovering ? middleZ + ' → ' + hoverMiddleZ : middleZ}px
        </div>
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-green-900/50 to-teal-900/50">
        <div class="text-sm text-white/70">Front Layer:</div>
        <div class="font-mono text-lg">
          {isCardHovering ? frontZ + ' → ' + hoverFrontZ : frontZ}px
        </div>
      </div>
      <div class="p-2 rounded bg-gradient-to-br from-amber-900/50 to-yellow-900/50">
        <div class="text-sm text-white/70">Top Layer:</div>
        <div class="font-mono text-lg">
          {isCardHovering ? topZ + ' → ' + hoverTopZ : topZ}px
        </div>
      </div>
    </div>
  </div>

  <div class="grid place-items-center">
    <div class="h-[400px] w-[300px]">
      <ReactiveExplicitZCard
        hoverZScale={hoverZScale}
        initialScale={1}
        hoverScale={1.05}
        cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
        on:hoverchange={handleHoverChange}
      >
        <svelte:fragment slot="default" let:getItemStyle let:isHovering>
          <!-- Base layer (deepest) -->
          <div 
            class="absolute inset-0 rounded-xl bg-gradient-to-br from-red-600 to-purple-700 transition-all" 
            style:transform={getItemStyle(baseZ).transform}
            style:transition={getItemStyle(baseZ).transition}
          >
            <div class="absolute top-2 left-2 right-2 text-center text-xs bg-black/40 backdrop-blur-sm rounded px-2 py-1">
              Base: {getItemStyle(baseZ).zValue}px
            </div>
          </div>
          
          <!-- Middle layer -->
          <div 
            class="absolute inset-0 rounded-xl flex items-center justify-center transition-all" 
            style:transform={getItemStyle(middleZ).transform}
            style:transition={getItemStyle(middleZ).transition}
          >
            <div class="bg-black/20 backdrop-blur-sm h-40 w-40 rounded-full flex items-center justify-center">
              <span class="text-lg font-bold text-white">
                Middle ({getItemStyle(middleZ).zValue}px)
              </span>
            </div>
          </div>
          
          <!-- Front layer -->
          <div 
            class="absolute top-10 left-0 right-0 flex justify-center transition-all"
            style:transform={getItemStyle(frontZ).transform}
            style:transition={getItemStyle(frontZ).transition}
          >
            <div class="bg-white px-6 py-3 rounded-full shadow-xl relative">
              <span class="text-lg font-bold text-purple-700">
                Front ({getItemStyle(frontZ).zValue}px)
              </span>
              <div class={`absolute -top-1 -right-1 h-3 w-3 rounded-full transition-all ${isHovering ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
          </div>
          
          <!-- Foremost layer -->
          <div 
            class="absolute bottom-10 left-0 right-0 flex justify-center transition-all"
            style:transform={getItemStyle(topZ).transform}
            style:transition={getItemStyle(topZ).transition}
          >
            <button class="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-xl relative">
              Top ({getItemStyle(topZ).zValue}px)
              <div class={`absolute -top-1 -right-1 h-3 w-3 rounded-full transition-all ${isHovering ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </button>
          </div>
        </svelte:fragment>
      </ReactiveExplicitZCard>
    </div>
  </div>

  <!-- Debug links -->
  <div class="mt-12 text-center text-sm text-white/60">
    <p>Try other approaches:</p>
    <ul class="mt-2 space-y-1">
      <li><a href="/testcard" class="underline">Original component test</a></li>
      <li><a href="/testcard2" class="underline">Direct DOM test</a></li>
      <li><a href="/explicitcard" class="underline">Explicit Z-Card (broken)</a></li>
    </ul>
  </div>
</div>

<style>
  :global(body) {
    background-color: #0f172a;
    color: white;
  }
</style> 