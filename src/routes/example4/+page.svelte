<script>
  import InlineCard from '$lib/components/ui/3d-card/hybridcards/InlineCardHybrid.svelte';
</script>

<!-- Alaska Landscape Photography Auction Cards -->
<h2 class="text-3xl font-bold text-center mb-12">Alaska Landscapes</h2>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
  <!-- Alaska Bay - Nature Photography -->
  <div>
    <h3 class="text-xl font-semibold mb-4">Nature Photography</h3>
    <div class="h-[500px]">
      <InlineCard
        zBehavior="hybrid"
        hoverZScale={2.2}
        initialScale={1.02}
        hoverScale={1.15}
        cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Deep background with larger negative Z -->
          <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-150)}">
            <img 
              src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
              alt="Alaska turquoise bay with mountains" 
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Gradient overlay slightly closer than the background -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-100)}">
            <div class="w-full h-full bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          </div>
          
          <!-- Limited Edition Badge -->
          <div class="absolute top-6 left-6" style="transform: {getItemTransform(100)}">
            <span class="bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
              LIMITED EDITION
            </span>
          </div>
          
          <!-- Print Number -->
          <div class="absolute top-6 right-6" style="transform: {getItemTransform(100)}">
            <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
              PRINT 3/25
            </span>
          </div>
          
          <!-- Content overlay -->
          <div class="absolute inset-0 flex flex-col justify-end p-8">
            <div class="mb-2" style="transform: {getItemTransform(120)}">
              <h3 class="text-2xl font-bold text-white text-shadow">Kachemak Bay, Alaska</h3>
            </div>
            
            <div class="mb-4" style="transform: {getItemTransform(85)}">
              <p class="text-white/90 text-sm">
                Spring morning view of turquoise waters and pine forests. Museum-quality print on archival paper.
              </p>
            </div>
            
            <div class="mb-4" style="transform: {getItemTransform(140)}">
              <div class="text-3xl font-bold text-white text-shadow">$1,250</div>
            </div>
            
            <div class="mb-6" style="transform: {getItemTransform(70)}">
              <div class="flex items-center gap-2 text-white/80 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Photographed by Michael Stevens</span>
              </div>
            </div>
            
            <div class="flex gap-3">
              <div class="flex-1" style="transform: {getItemTransform(180)}">
                <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl hover:shadow-blue-500/20 transition-all duration-200">
                  Acquire Now
                </button>
              </div>
              
              <div class="w-14" style="transform: {getItemTransform(120)}">
                <button class="w-full h-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg flex items-center justify-center border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </svelte:fragment>
      </InlineCard>
    </div>
  </div>
  
  <!-- Additional cards would go here -->
</div>

<style>
  /* Global styles */
  :global(body) {
    background: linear-gradient(to bottom, #111827, #1f2937);
    color: white;
    min-height: 100vh;
  }

  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>