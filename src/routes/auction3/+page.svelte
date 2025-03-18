<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard-fixed.svelte';
</script>

<div class="container mx-auto p-6">
  <h2 class="text-3xl font-bold text-center mb-12">Alaska Landscapes</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <!-- Alaska Bay - Nature Photography -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Nature Photography</h3>
      <div class="h-[500px] card-wrapper">
        <InlineCard
          initialZScale={0.5}
          hoverZScale={1.5}
          initialScale={1.02}
          hoverScale={1.15}
          cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
          class_name="card-3d"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Deep background with larger negative Z - reduced value -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-120)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Gradient overlay slightly closer than the background - reduced value -->
            <div class="absolute inset-0" style="transform: {getItemTransform(-90)}">
              <div class="w-full h-full bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            
            <!-- Limited Edition Badge -->
            <div class="absolute top-6 left-6" style="transform: {getItemTransform(250)}">
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
    
    <!-- Alaska Mountains - Adventure Package -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Adventure Package</h3>
      <div class="h-[500px] card-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={2.5}
          initialScale={1.03}
          hoverScale={1.18}
          cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
          class_name="card-3d"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Deep background with larger negative Z - reduced value -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-120)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Gradient overlay slightly closer - reduced value -->
            <div class="absolute inset-0" style="transform: {getItemTransform(-90)}">
              <div class="w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            
            <!-- Expedition logo at negative Z to create depth - reduced value -->
            <div class="absolute inset-0 flex items-center justify-center opacity-10" style="transform: {getItemTransform(-60)}">
              <svg class="w-64 h-64 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
              </svg>
            </div>
            
            <!-- Expedition badge -->
            <div class="absolute top-6 left-6" style="transform: {getItemTransform(110)}">
              <div class="bg-green-700/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                GUIDED EXPEDITION
              </div>
            </div>
            
            <!-- Date badge -->
            <div class="absolute top-6 right-6" style="transform: {getItemTransform(90)}">
              <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/30 text-center shadow-lg">
                <div class="text-white text-xs font-medium">JULY</div>
                <div class="text-white text-xl font-bold">15-22</div>
                <div class="text-white text-xs">2023</div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div class="mb-2" style="transform: {getItemTransform(130)}">
                <h3 class="text-2xl font-bold text-white text-shadow">Alaska Wilderness Explorer</h3>
              </div>
              
              <div class="mb-4" style="transform: {getItemTransform(90)}">
                <p class="text-white/90 text-sm">
                  7-day guided expedition through pristine Alaskan wilderness. Hiking, kayaking, and wildlife photography.
                </p>
              </div>
              
              <div class="mb-4 flex flex-wrap gap-2" style="transform: {getItemTransform(100)}">
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white shadow-sm">Hiking</span>
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white shadow-sm">Kayaking</span>
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white shadow-sm">Photography</span>
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white shadow-sm">4 Spots Left</span>
              </div>
              
              <div class="mb-6" style="transform: {getItemTransform(150)}">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-3xl font-bold text-white text-shadow">$3,499</div>
                    <div class="text-green-400 text-xs">All-inclusive package</div>
                  </div>
                  <div class="flex -space-x-2">
                    <img class="w-8 h-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/women/42.jpg" alt="User" />
                    <img class="w-8 h-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                    <div class="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white">+2</div>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-3">
                <div class="flex-1" style="transform: {getItemTransform(180)}">
                  <button class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl transition-all duration-200">
                    Reserve Spot
                  </button>
                </div>
                
                <div class="w-14" style="transform: {getItemTransform(160)}">
                  <button class="w-full h-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg flex items-center justify-center border border-white/30 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Alaska Real Estate -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Luxury Property</h3>
      <div class="h-[500px] card-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={2.8}
          initialScale={1.05}
          hoverScale={1.2}
          cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);"
          class_name="card-3d"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Deep background with larger negative Z - reduced value -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-120)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Gradient overlay with a bit less depth - reduced value -->
            <div class="absolute inset-0" style="transform: {getItemTransform(-90)}">
              <div class="w-full h-full bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
            </div>
            
            <!-- Property type badge -->
            <div class="absolute top-6 left-6" style="transform: {getItemTransform(130)}">
              <div class="bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
                LUXURY WATERFRONT
              </div>
            </div>
            
            <!-- Property details overlay with glass effect - mid-level element -->
            <div class="absolute inset-x-6 bottom-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-lg" style="transform: {getItemTransform(30)}">
              <div class="mb-3" style="transform: {getItemTransform(100)}">
                <h3 class="text-2xl font-bold text-white">Kachemak Bay Retreat</h3>
                <p class="text-white/80 text-sm">Seward, Alaska</p>
              </div>
              
              <div class="mb-4 grid grid-cols-2 gap-4" style="transform: {getItemTransform(70)}">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="text-white">4,850 sq ft</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span class="text-white">4 Bedrooms</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-white">Built 2022</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span class="text-white">25 Acres</span>
                </div>
              </div>
              
              <div class="mb-4" style="transform: {getItemTransform(140)}">
                <div class="text-3xl font-bold text-white shadow-sm">$2,850,000</div>
              </div>
              
              <div class="flex gap-3" style="transform: {getItemTransform(180)}">
                <button class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                  Schedule Viewing
                </button>
                <button class="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/30 shadow-md">
                  View Details
                </button>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>
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
  
  /* Critical 3D styles */
  .card-wrapper {
    perspective: 1500px;
  }
  
  .card-3d {
    transform-style: preserve-3d !important;
  }
  
  /* These styles aren't needed anymore since we're applying transforms directly */
  /* .transform-3d {
    position: relative;
    transform-style: preserve-3d !important;
    backface-visibility: hidden;
    transition: transform 0.2s ease-out;
    will-change: transform;
  } */
  
  /* Make sure all elements in the card maintain 3D context */
  :global(.inline-card), 
  :global(.inline-card *),
  :global([style*="transform:"]) {
    transform-style: preserve-3d !important;
    backface-visibility: hidden;
  }
  
  /* Apply specific transitions to transform elements */
  :global([style*="transform:"]) {
    transition: transform 0.2s ease-out;
    will-change: transform;
  }
</style>