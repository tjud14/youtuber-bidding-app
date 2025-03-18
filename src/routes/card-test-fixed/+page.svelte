<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard-fixed.svelte';
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold text-center mb-8">Fixed 3D Card Test</h1>
  <p class="text-lg text-center mb-16 max-w-2xl mx-auto">
    Using the fixed InlineCard component with proper Z transformations
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <!-- Card 1: Simple Z Layers -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Card 1: Basic Z Layering</h3>
      <div class="h-[500px] card-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={1.8}
          initialScale={1.02}
          hoverScale={1.15}
          cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
          class_name="card-3d"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background (z = -80) -->
            <div class="absolute inset-0 rounded-xl overflow-hidden transform-3d" style="transform: {getItemTransform(-80)}">
              <div class="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900"></div>
            </div>
            
            <!-- Middle layer (z = 0) -->
            <div class="absolute inset-0 flex items-center justify-center transform-3d" style="transform: {getItemTransform(0)}">
              <div class="w-64 h-64 bg-indigo-600/50 backdrop-blur-sm rounded-xl border border-indigo-400/30 flex items-center justify-center text-center p-4">
                <span class="text-white text-xl font-bold">This card should show Z-depth correctly</span>
              </div>
            </div>
            
            <!-- Top layer (z = 80) -->
            <div class="absolute inset-0 flex items-center justify-center transform-3d" style="transform: {getItemTransform(80)}">
              <div class="w-32 h-32 bg-pink-500/70 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl">
                <span class="text-white font-bold">Z = 80px</span>
              </div>
            </div>
            
            <!-- Floating badge (z = 120) -->
            <div class="absolute top-6 right-6 transform-3d" style="transform: {getItemTransform(120)}">
              <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
                Z = 120px
              </span>
            </div>
            
            <!-- Bottom button (z = 100) -->
            <div class="absolute bottom-8 inset-x-0 flex justify-center transform-3d" style="transform: {getItemTransform(100)}">
              <button class="bg-white hover:bg-gray-100 text-indigo-900 px-6 py-3 rounded-lg text-sm font-bold shadow-xl transition-all duration-200">
                Hover to see Z-depth
              </button>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Card 2: Adventure Card -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Card 2: Adventure Package</h3>
      <div class="h-[500px] card-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={2}
          initialScale={1.03}
          hoverScale={1.18}
          cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
          class_name="card-3d"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background with negative Z -->
            <div class="absolute inset-0 rounded-xl overflow-hidden transform-3d" style="transform: {getItemTransform(-100)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            
            <!-- Expedition badge -->
            <div class="absolute top-6 left-6 transform-3d" style="transform: {getItemTransform(80)}">
              <div class="bg-green-700/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                GUIDED EXPEDITION
              </div>
            </div>
            
            <!-- Content -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div class="mb-2 transform-3d" style="transform: {getItemTransform(50)}">
                <h3 class="text-2xl font-bold text-white text-shadow">Alaska Wilderness Explorer</h3>
              </div>
              
              <div class="mb-4 transform-3d" style="transform: {getItemTransform(30)}">
                <p class="text-white/90 text-sm">
                  7-day guided expedition through pristine Alaskan wilderness. Hiking, kayaking, and wildlife photography.
                </p>
              </div>
              
              <div class="mb-6 transform-3d" style="transform: {getItemTransform(70)}">
                <div class="text-3xl font-bold text-white text-shadow">$3,499</div>
              </div>
              
              <div class="flex gap-3">
                <div class="flex-1 transform-3d" style="transform: {getItemTransform(100)}">
                  <button class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl transition-all duration-200">
                    Reserve Spot
                  </button>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Card 3: Property Card -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Card 3: Luxury Property</h3>
      <div class="h-[500px] card-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={2.2}
          initialScale={1.05}
          hoverScale={1.2}
          cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);"
          class_name="card-3d"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background with negative Z -->
            <div class="absolute inset-0 rounded-xl overflow-hidden transform-3d" style="transform: {getItemTransform(-150)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
            </div>
            
            <!-- Property type badge -->
            <div class="absolute top-6 left-6 transform-3d" style="transform: {getItemTransform(80)}">
              <div class="bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
                LUXURY WATERFRONT
              </div>
            </div>
            
            <!-- Property details overlay with glass effect -->
            <div class="absolute inset-x-6 bottom-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg transform-3d" style="transform: {getItemTransform(40)}">
              <div class="mb-3 transform-3d" style="transform: {getItemTransform(90)}">
                <h3 class="text-2xl font-bold text-white">Kachemak Bay Retreat</h3>
                <p class="text-white/80 text-sm">Seward, Alaska</p>
              </div>
              
              <div class="mb-4 transform-3d" style="transform: {getItemTransform(110)}">
                <div class="text-3xl font-bold text-white shadow-sm">$2,850,000</div>
              </div>
              
              <div class="flex gap-3 transform-3d" style="transform: {getItemTransform(130)}">
                <button class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                  Schedule Viewing
                </button>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>
  
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-12">
    <h2 class="text-xl font-bold mb-4">What's Fixed?</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li>Z values are now applied at full strength even when not hovering</li>
      <li>Hover effect now amplifies Z values but doesn't completely hide them initially</li>
      <li>Added position: relative to the card container</li>
      <li>Made sure all transform-style: preserve-3d properties are correctly applied</li>
    </ul>
  </div>
</div>

<style>
  :global(body) {
    background: linear-gradient(to bottom, #111827, #1f2937);
    color: white;
    min-height: 100vh;
  }

  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .card-wrapper {
    perspective: 1500px;
  }
  
  .card-3d {
    transform-style: preserve-3d !important;
  }
  
  .transform-3d {
    transform-style: preserve-3d !important;
    backface-visibility: hidden;
  }
</style> 