<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard.svelte';
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-4xl font-bold text-center mb-8">Auction Card Showcase</h1>
  <p class="text-lg text-center mb-16 max-w-2xl mx-auto">
    Explore different auction card designs with enhanced 3D depth effects using the InlineCard component.
  </p>

  <!-- Premium Knife Auction Cards -->
  <h2 class="text-3xl font-bold text-center mb-12">Premium Knives</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <!-- Damascus Knife - Dramatic Style -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Dramatic Style</h3>
      <div class="h-[500px]">
        <InlineCard>
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background with moderate negative Z -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
              <img 
                src="https://images.unsplash.com/photo-1607302524464-3b6250d3ebca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" 
                alt="Damascus knife" 
                class="w-full h-full object-cover brightness-75"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            </div>
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
              <div class="w-full h-full bg-gradient-to-br from-zinc-900 to-black"></div>
              <div class="absolute inset-0 opacity-20" 
                   style="background-image: url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h10v10H0V0zm10 10h10v10H10V10z\'/%3E%3C/g%3E%3C/svg%3E');"></div>
              <div class="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-red-900/20"></div>
            </div>
            
            <!-- Product Image with highest Z -->
            <div style="transform: {getItemTransform(90)}" class="absolute top-16 left-1/2 -translate-x-1/2">
              <img 
                src="https://i.imgur.com/AKt1vY2.jpg" 
                alt="Tactical Karambit Knife" 
                class="h-48 object-contain drop-shadow-2xl"
              />
            </div>
            
            <!-- Live Auction Badge with moderate Z -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-6 left-6">
              <span class="bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE AUCTION: 2h 15m
              </span>
            </div>
            
            <!-- Tactical Badge with similar Z -->
            <div style="transform: {getItemTransform(55)}" class="absolute top-6 right-6">
              <span class="bg-red-700/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                TACTICAL GRADE
              </span>
            </div>
            
            <!-- Centered Content with better spaced Z values -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div style="transform: {getItemTransform(70)}" class="mb-3">
                <h3 class="text-2xl font-bold text-white text-shadow">Tactical Karambit</h3>
              </div>
              
              <div style="transform: {getItemTransform(45)}" class="mb-4">
                <p class="text-white/80 text-sm">Professional-grade tactical combat knife with ergonomic finger ring design</p>
              </div>
              
              <div style="transform: {getItemTransform(80)}" class="mb-6">
                <div class="text-3xl font-bold text-red-500 text-shadow">$249.99</div>
              </div>
              
              <div style="transform: {getItemTransform(40)}" class="mb-8">
                <div class="flex items-center gap-1 text-white/70 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  <span>12 bids so far</span>
                </div>
              </div>
              
              <div class="flex gap-3">
                <div style="transform: {getItemTransform(65)}" class="flex-1">
                  <button class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xl hover:shadow-red-500/20 transition-all duration-200 hover:translate-y-[-2px]">
                    Place Bid
                  </button>
                </div>
                
                <div style="transform: {getItemTransform(65)}" class="flex-1">
                  <button class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/30">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Hunting Knife - Minimalist Style -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Minimalist Style</h3>
      <div class="h-[400px]">
        <InlineCard cardStyle="border-radius: 0.75rem; overflow: hidden; transform-style: preserve-3d;">
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background with gradient -->
            <div class="absolute inset-0" style="transform: {getItemTransform(-50)}">
              <div class="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
              <div class="absolute inset-0 opacity-20" 
                   style="background-image: url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h10v10H0V0zm10 10h10v10H10V10z\'/%3E%3C/g%3E%3C/svg%3E');"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            </div>
            
            <!-- Product Image with high Z -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-8 left-1/2 -translate-x-1/2">
              <img 
                src="file:///home/konosmgr/Downloads/dylan-taylor-N4UeHvGbPMA-unsplash.jpg" 
                alt="Hunting knife" 
                class="h-32 object-contain drop-shadow-2xl"
              />
            </div>
            
            <!-- Timer with medium Z -->
            <div style="transform: {getItemTransform(80)}" class="absolute top-6 right-6">
              <div class="bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                <div class="text-xs text-white/70 text-center">Ends in</div>
                <div class="text-white font-mono font-bold">01:23:45</div>
              </div>
            </div>
            
            <!-- Centered Content -->
            <div class="absolute inset-x-0 bottom-0 p-6">
              <div style="transform: {getItemTransform(90)}" class="mb-1">
                <h3 class="text-xl font-bold text-white">Vintage Hunting Knife</h3>
              </div>
              
              <div style="transform: {getItemTransform(70)}" class="mb-4">
                <div class="flex items-center gap-2">
                  <div class="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div class="h-full w-3/4 bg-green-500 rounded-full"></div>
                  </div>
                  <span class="text-white/80 text-xs whitespace-nowrap">8 of 10 left</span>
                </div>
              </div>
              
              <div class="flex justify-between items-end">
                <div style="transform: {getItemTransform(110)}" class="flex-1">
                  <div class="text-2xl font-bold text-white">$199.50</div>
                  <div class="text-green-400 text-xs">Minimum bid</div>
                </div>
                
                <div style="transform: {getItemTransform(130)}" class="flex-none">
                  <button class="bg-white hover:bg-gray-100 text-gray-900 px-5 py-2 rounded-lg text-sm font-bold">
                    Bid Now
                  </button>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Japanese Knife - Glass Style -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Glass Style</h3>
      <div class="h-[400px]">
        <InlineCard cardStyle="border-radius: 0.75rem; overflow: hidden; transform-style: preserve-3d;">
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Blurred Background Image -->
            <div class="absolute inset-0" style="transform: {getItemTransform(-80)}">
              <img 
                src="https://images.unsplash.com/photo-1593001460806-bdf4f9c75dbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Japanese knife background" 
                class="w-full h-full object-cover blur-sm brightness-50"
              />
              <div class="absolute inset-0 bg-indigo-900/40"></div>
            </div>
            
            <!-- Glass Card Overlay -->
            <div style="transform: {getItemTransform(-20)}" class="absolute inset-4 rounded-lg p-5 bg-white/10 backdrop-blur-md border border-white/20">
              <div class="relative w-full h-full">
                <!-- Item Image -->
                <div style="transform: {getItemTransform(100)}" class="absolute top-4 right-4 w-32 h-32">
                  <img 
                    src="https://images.unsplash.com/photo-1593001460806-bdf4f9c75dbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Japanese knife" 
                    class="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>

                <!-- Floating Japanese Character -->
                <div style="transform: {getItemTransform(80)} rotateZ(-5deg)" class="absolute top-6 left-4">
                  <span class="text-6xl font-bold text-white/30">刀</span>
                </div>
                
                <!-- Content -->
                <div class="absolute bottom-0 left-0 right-0">
                  <div style="transform: {getItemTransform(60)}" class="mb-2">
                    <div class="text-white/60 text-xs uppercase tracking-wider">Artisan Crafted</div>
                    <h3 class="text-2xl font-bold text-white">Japanese Santoku</h3>
                  </div>
                  
                  <div style="transform: {getItemTransform(40)}" class="mb-4">
                    <p class="text-white/80 text-sm">Hand-forged high-carbon steel with traditional handle</p>
                  </div>
                  
                  <div class="flex items-center justify-between mb-5">
                    <div style="transform: {getItemTransform(120)}" class="flex items-center gap-1.5">
                      <div class="text-2xl font-bold text-white">$289.00</div>
                      <div class="text-red-400 text-xs line-through">$350</div>
                    </div>
                    
                    <div style="transform: {getItemTransform(80)}">
                      <div class="flex items-center gap-1">
                        <div class="flex">
                          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        <span class="text-green-400 text-xs">23 watching</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style="transform: {getItemTransform(140)}">
                    <button class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 py-2.5 rounded-lg font-medium">
                      Place Bid or Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>

  <!-- Alaska Landscape Photography Auction Cards -->
  <h2 class="text-3xl font-bold text-center mb-12">Alaska Landscapes</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <!-- Alaska Bay - Nature Photography -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Nature Photography</h3>
      <div class="h-[500px]">
        <InlineCard>
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background image with negative Z -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            
            <!-- Limited Edition Badge -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-6 left-6">
              <span class="bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
                LIMITED EDITION
              </span>
            </div>
            
            <!-- Print Number -->
            <div style="transform: {getItemTransform(70)}" class="absolute top-6 right-6">
              <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
                PRINT 3/25
              </span>
            </div>
            
            <!-- Content overlay -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div style="transform: {getItemTransform(70)}" class="mb-2">
                <h3 class="text-2xl font-bold text-white text-shadow">Kachemak Bay, Alaska</h3>
              </div>
              
              <div style="transform: {getItemTransform(45)}" class="mb-4">
                <p class="text-white/90 text-sm">
                  Spring morning view of turquoise waters and pine forests. Museum-quality print on archival paper.
                </p>
              </div>
              
              <div style="transform: {getItemTransform(80)}" class="mb-4">
                <div class="text-3xl font-bold text-white text-shadow">$1,250</div>
              </div>
              
              <div style="transform: {getItemTransform(40)}" class="mb-6">
                <div class="flex items-center gap-2 text-white/80 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Photographed by Michael Stevens</span>
                </div>
              </div>
              
              <div class="flex gap-3">
                <div style="transform: {getItemTransform(100)}" class="flex-1">
                  <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl hover:shadow-blue-500/20 transition-all duration-200">
                    Acquire Now
                  </button>
                </div>
                
                <div style="transform: {getItemTransform(65)}" class="w-14">
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
      <div class="h-[500px]">
        <InlineCard>
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background image with negative Z -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            
            <!-- Expedition logo at negative Z to create depth -->
            <div style="transform: {getItemTransform(-10)}" class="absolute inset-0 flex items-center justify-center opacity-10">
              <svg class="w-64 h-64 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
              </svg>
            </div>
            
            <!-- Expedition badge -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-6 left-6">
              <div class="bg-green-700/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                GUIDED EXPEDITION
              </div>
            </div>
            
            <!-- Date badge -->
            <div style="transform: {getItemTransform(50)}" class="absolute top-6 right-6">
              <div class="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/30 text-center">
                <div class="text-white text-xs font-medium">JULY</div>
                <div class="text-white text-xl font-bold">15-22</div>
                <div class="text-white text-xs">2023</div>
              </div>
            </div>
            
            <!-- Content -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div style="transform: {getItemTransform(70)}" class="mb-2">
                <h3 class="text-2xl font-bold text-white text-shadow">Alaska Wilderness Explorer</h3>
              </div>
              
              <div style="transform: {getItemTransform(45)}" class="mb-4">
                <p class="text-white/90 text-sm">
                  7-day guided expedition through pristine Alaskan wilderness. Hiking, kayaking, and wildlife photography.
                </p>
              </div>
              
              <div style="transform: {getItemTransform(55)}" class="mb-4 flex flex-wrap gap-2">
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white">Hiking</span>
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white">Kayaking</span>
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white">Photography</span>
                <span class="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white">4 Spots Left</span>
              </div>
              
              <div style="transform: {getItemTransform(80)}" class="mb-6">
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
                <div style="transform: {getItemTransform(100)}" class="flex-1">
                  <button class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl transition-all duration-200">
                    Reserve Spot
                  </button>
                </div>
                
                <div style="transform: {getItemTransform(65)}" class="w-14">
                  <button class="w-full h-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg flex items-center justify-center border border-white/30">
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
      <div class="h-[500px]">
        <InlineCard>
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background image with negative Z -->
            <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
              <img 
                src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Alaska turquoise bay with mountains" 
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
            </div>
            
            <!-- Property type badge -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-6 left-6">
              <div class="bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
                LUXURY WATERFRONT
              </div>
            </div>
            
            <!-- Property details overlay with glass effect -->
            <div style="transform: {getItemTransform(40)}" class="absolute inset-x-6 bottom-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div style="transform: {getItemTransform(70)}" class="mb-3">
                <h3 class="text-2xl font-bold text-white">Kachemak Bay Retreat</h3>
                <p class="text-white/80 text-sm">Seward, Alaska</p>
              </div>
              
              <div style="transform: {getItemTransform(50)}" class="mb-4 grid grid-cols-2 gap-4">
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
              
              <div style="transform: {getItemTransform(80)}" class="mb-4">
                <div class="text-3xl font-bold text-white">$2,850,000</div>
              </div>
              
              <div style="transform: {getItemTransform(100)}" class="flex gap-3">
                <button class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                  Schedule Viewing
                </button>
                <div style="transform: {getItemTransform(65)}" class="flex-1">
                  <button class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/30">
                    View Details
                  </button>
                </div>
                <div style="transform: {getItemTransform(65)}" class="flex-1">
                  <button class="w-full bg-white/20 hover:bg-red-900/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>
  
  <!-- Design Info Section -->
  <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-20">
    <h2 class="text-2xl font-bold mb-6">About These 3D Auction Cards</h2>
    
    <div class="space-y-4">
      <p>These cards showcase the power of the InlineCard component for creating stunning 3D effects with proper depth perception. Key techniques used:</p>
      
      <ul class="list-disc pl-5 space-y-2">
        <li>Negative Z values (-50 to -80px) for backgrounds to push them further back</li>
        <li>High positive Z values (100-150px) for important interactive elements like buttons</li>
        <li>Medium Z values (40-80px) for content and information</li>
        <li>Careful layering of elements with different Z depths for a true parallax effect</li>
        <li>Using <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">transform-style: preserve-3d</code> to ensure proper 3D rendering</li>
      </ul>
      
      <p>The InlineCard component multiplies Z values by 1.8x when hovering, creating a more dramatic effect.</p>
    </div>
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
</style> 