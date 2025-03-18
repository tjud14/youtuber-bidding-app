<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard-revised.svelte';
</script>

<div class="container mx-auto p-8">
  <h1 class="text-3xl font-bold mb-8 text-center">Auction Item Examples</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Example 1: Tactical Knife Auction Card -->
    <div class="h-[450px]">
            <InlineCard 
        initialZScale={0.6} 
        hoverZScale={2.5} 
        initialScale={1.05} 
        hoverScale={1.2}
        cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
        class_name="shadow-2xl"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Background foundation layer with deeper negative Z -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-200)}">
            <div class="w-full h-full bg-gradient-to-br from-gray-900/90 to-black/90"></div>
          </div>
          
          <!-- Product image layer with improved shadow -->
          <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(-20)}">
            <img 
              src="https://images.unsplash.com/photo-1585825232981-ff2f3ef3d272" 
              alt="Tactical Knife" 
              class="w-4/5 h-auto object-contain drop-shadow-2xl" 
            />
          </div>
          
          <!-- Live badge with higher Z -->
          <div class="absolute top-4 left-4" style="transform: {getItemTransform(150)}">
            <div class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
              <span class="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
              LIVE AUCTION: 3h 15m
            </div>
          </div>
          
          <!-- Button with extreme Z for maximum pop -->
          <div style="transform: {getItemTransform(250)}" class="absolute bottom-6 left-6 right-6">
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-colors w-full shadow-xl">
              Place Bid
            </button>
          </div>
        </svelte:fragment>
      </InlineCard>
    </div>

    <!-- Example 2: Vintage Hunting Knife Card -->
    <div class="h-[450px]">
      <InlineCard 
        initialZScale={0.4} 
        hoverZScale={2.0} 
        initialScale={1.02} 
        hoverScale={1.2}
        cardStyle="border-radius: 1rem; overflow: hidden;"
        class_name="shadow-xl"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Background foundation layer (semi-transparent) -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-140)}">
            <div class="w-full h-full bg-gradient-to-r from-emerald-900/90 to-gray-900/90"></div>
          </div>
          
          <!-- Background texture -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-90)}">
            <div class="w-full h-full bg-[url('/images/wood-texture.svg')] opacity-30"></div>
          </div>
          
          <!-- Product image layer -->
          <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(-10)}">
            <img src="https://placehold.co/600x400/2d3d2d/FFF?text=Hunting+Knife" alt="Hunting Knife" class="w-4/5 h-auto object-contain" />
          </div>
          
          <!-- Time left -->
          <div class="absolute top-4 right-4" style="transform: {getItemTransform(100)}">
            <div class="bg-black/80 text-white px-3 py-2 rounded-md text-sm font-mono">
              Ends in: <span class="text-yellow-400">01:23:45</span>
            </div>
          </div>
          
          <!-- Content container at bottom -->
          <div class="absolute bottom-0 left-0 right-0 p-6" style="transform: {getItemTransform(40)}">
            <div class="bg-black/70 backdrop-blur-sm p-4 rounded-lg">
              <!-- Title -->
              <div style="transform: {getItemTransform(120)}" class="mb-3">
                <h2 class="text-2xl font-bold text-white">Vintage Hunting Knife</h2>
                <div class="flex items-center mt-1">
                  <div class="text-yellow-500 text-xs mr-2">★★★★☆</div>
                  <div class="text-gray-400 text-xs">8 of 10 left</div>
                </div>
              </div>
              
              <!-- Price -->
              <div style="transform: {getItemTransform(160)}" class="mb-4">
                <div class="text-2xl font-bold text-white">$199.50</div>
                <div class="text-gray-400 text-xs">Minimum bid</div>
              </div>
              
              <!-- Button -->
              <div style="transform: {getItemTransform(200)}">
                <button class="bg-emerald-600 hover:bg-emerald-700 text-white w-full px-4 py-2 rounded-md font-semibold transition-colors">
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        </svelte:fragment>
      </InlineCard>
    </div>

    <!-- Example 3: Japanese Santoku Knife Card -->
    <div class="h-[450px]">
      <InlineCard 
        initialZScale={0.45} 
        hoverZScale={2.3} 
        initialScale={1.03} 
        hoverScale={1.2}
        cardStyle="border-radius: 1rem; overflow: hidden;"
        class_name="shadow-xl"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Background foundation layer (semi-transparent) -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-150)}">
            <div class="w-full h-full bg-gradient-to-br from-indigo-900/90 to-purple-900/90"></div>
          </div>
          
          <!-- Japanese pattern layer -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-100)}">
            <div class="w-full h-full bg-[url('/images/japanese-pattern.svg')] opacity-20"></div>
          </div>
          
          <!-- Glowing effect -->
          <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(-60)}">
            <div class="w-2/3 h-2/3 rounded-full bg-white/10 blur-3xl"></div>
          </div>
          
          <!-- Kanji symbol -->
          <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(-30)}">
            <div class="text-white/20 text-[150px] font-serif">刀</div>
          </div>
          
          <!-- Product image layer -->
          <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(20)}">
            <img src="https://placehold.co/600x400/3d3d5d/FFF?text=Japanese+Knife" alt="Japanese Santoku" class="w-4/5 h-auto object-contain" />
          </div>
          
          <!-- "Artisan Crafted" badge -->
          <div class="absolute top-4 left-4" style="transform: {getItemTransform(120)}">
            <div class="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs uppercase tracking-wider">
              Artisan Crafted
            </div>
          </div>
          
          <!-- Watching counter -->
          <div class="absolute top-4 right-4" style="transform: {getItemTransform(110)}">
            <div class="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              22 watching
            </div>
          </div>
          
          <!-- Content container at bottom -->
          <div class="absolute bottom-0 left-0 right-0 p-6" style="transform: {getItemTransform(60)}">
            <div class="bg-white/10 backdrop-blur-lg p-4 rounded-lg border border-white/20">
              <!-- Title -->
              <div style="transform: {getItemTransform(120)}" class="mb-3">
                <h2 class="text-2xl font-bold text-white">Japanese Santoku</h2>
                <p class="text-purple-200/80 text-sm">Hand-forged high-carbon steel with traditional handle</p>
              </div>
              
              <!-- Price -->
              <div style="transform: {getItemTransform(150)}" class="mb-4">
                <div class="flex items-baseline">
                  <div class="text-2xl font-bold text-white">$289.00</div>
                  <div class="text-gray-400 text-xs ml-2 line-through">$349</div>
                </div>
              </div>
              
              <!-- Button -->
              <div style="transform: {getItemTransform(180)}">
                <button class="bg-white/20 hover:bg-white/30 text-white w-full px-4 py-2 rounded-md font-semibold transition-colors backdrop-blur-sm border border-white/30">
                  Place Bid or Buy Now
                </button>
              </div>
            </div>
          </div>
        </svelte:fragment>
      </InlineCard>
    </div>
  </div>
</div>

<style>
  /* Add any custom styles here */
  :global(body) {
    background-color: #f5f5f5;
    background-image: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
    min-height: 100vh;
  }
</style> 