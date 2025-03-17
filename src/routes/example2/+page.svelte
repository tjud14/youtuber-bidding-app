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
            
            <!-- Live Auction Badge with moderate Z -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-6 left-6">
              <span class="bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE AUCTION: 2h 15m
              </span>
            </div>
            
            <!-- Premium Badge with similar Z -->
            <div style="transform: {getItemTransform(55)}" class="absolute top-6 right-6">
              <span class="bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg">
                PREMIUM ITEM
              </span>
            </div>
            
            <!-- Centered Content with better spaced Z values -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div style="transform: {getItemTransform(70)}" class="mb-3">
                <h3 class="text-2xl font-bold text-white text-shadow">Damascus Steel Knife</h3>
              </div>
              
              <div style="transform: {getItemTransform(45)}" class="mb-4">
                <p class="text-white/80 text-sm">Hand-forged with 200+ layers of folded steel by master craftsmen</p>
              </div>
              
              <div style="transform: {getItemTransform(80)}" class="mb-6">
                <div class="text-3xl font-bold text-amber-400 text-shadow">$349.99</div>
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
                  <button class="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xl hover:shadow-amber-500/20 transition-all duration-200 hover:translate-y-[-2px]">
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
              <div class="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
              <div class="absolute inset-0 opacity-40 mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z\' fill=\'%23555\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"></div>
            </div>
            
            <!-- Product Image with high Z -->
            <div style="transform: {getItemTransform(60)}" class="absolute top-8 left-1/2 -translate-x-1/2">
              <img 
                src="https://images.unsplash.com/photo-1584442145608-eff2c7fac4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" 
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

  <!-- Artwork Auction Cards -->
  <h2 class="text-3xl font-bold text-center mb-12">Artwork Collection</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <!-- Classic Painting Style -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Classic Gallery Style</h3>
      <div class="h-[400px]">
        <InlineCard cardStyle="border-radius: 0.75rem; overflow: hidden; transform-style: preserve-3d;">
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background -->
            <div class="absolute inset-0 bg-gray-100" style="transform: {getItemTransform(-40)}">
              <!-- Subtle pattern -->
              <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            </div>
            
            <!-- Painting Frame -->
            <div style="transform: {getItemTransform(10)}" class="absolute inset-6">
              <div class="w-full h-full bg-amber-100 border-8 border-amber-800 shadow-lg">
                <!-- Artwork Image -->
                <img 
                  style="transform: {getItemTransform(40)}"
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1445&q=80" 
                  alt="Classic painting" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <!-- Gallery Tag -->
            <div style="transform: {getItemTransform(100)}" class="absolute bottom-8 left-1/2 -translate-x-1/2 w-5/6">
              <div class="bg-white shadow-lg p-3 rounded">
                <div class="text-center text-gray-800 font-serif">
                  <h3 class="text-lg font-semibold">European Landscape, 1887</h3>
                  <p class="text-sm text-gray-600">Oil on canvas • 24" × 36"</p>
                  <div class="mt-2 text-xl font-bold text-amber-800">Starting bid: $1,250</div>
                </div>
                <div class="mt-3">
                  <button class="w-full bg-amber-800 hover:bg-amber-900 text-white py-2 rounded font-serif">
                    Bid in Auction
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Auction Badge -->
            <div style="transform: {getItemTransform(150)}" class="absolute top-4 right-4">
              <div class="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                LIVE AUCTION
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Modern Art Style -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Modern Art Style</h3>
      <div class="h-[400px]">
        <InlineCard cardStyle="border-radius: 0.75rem; overflow: hidden; transform-style: preserve-3d; background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);">
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Abstract Background Elements -->
            <div style="transform: {getItemTransform(-80)}" class="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-500/20 blur-2xl"></div>
            <div style="transform: {getItemTransform(-60)}" class="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl"></div>
            
            <!-- Floating Shapes -->
            <div style="transform: {getItemTransform(30)} rotate(15deg)" class="absolute top-20 right-20 w-12 h-12 bg-yellow-400/40 rounded-sm"></div>
            <div style="transform: {getItemTransform(25)} rotate(-10deg)" class="absolute bottom-24 left-10 w-8 h-16 bg-indigo-500/40 rounded-full"></div>
            
            <!-- Artwork Layer -->
            <div style="transform: {getItemTransform(50)}" class="absolute inset-0 flex items-center justify-center p-10">
              <img 
                src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Modern art" 
                class="max-h-full object-contain rounded-md shadow-2xl"
              />
            </div>
            
            <!-- Information Overlay -->
            <div style="transform: {getItemTransform(120)}" class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div class="flex justify-between items-end">
                <div>
                  <div class="text-xs text-cyan-300 uppercase tracking-widest mb-1">Abstract Series</div>
                  <h3 class="text-xl font-bold text-white">Chromatic Fusion #8</h3>
                  <p class="text-white/70 text-sm">By Alexandra Reeves</p>
                </div>
                
                <div class="text-right">
                  <div class="text-white text-lg font-bold">$3,850</div>
                  <div class="text-green-400 text-xs">Reserve met</div>
                </div>
              </div>
              
              <div class="mt-4">
                <div class="flex items-center gap-2 mb-2">
                  <div class="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div class="h-full w-4/5 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span class="text-white/80 text-xs whitespace-nowrap">80%</span>
                </div>
                
                <div class="flex gap-2">
                  <button class="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Place Bid
                  </button>
                  <button class="bg-white/10 hover:bg-white/20 text-white p-2 rounded-md border border-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
    
    <!-- Digital Art NFT Style -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Digital NFT Style</h3>
      <div class="h-[400px]">
        <InlineCard cardStyle="border-radius: 0.75rem; overflow: hidden; transform-style: preserve-3d;">
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Dark Background with Glow -->
            <div class="absolute inset-0 bg-gray-900" style="transform: {getItemTransform(-60)}">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30"></div>
            </div>
            
            <!-- Floating Particles -->
            <div style="transform: {getItemTransform(-30)}" class="absolute inset-0">
              <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <div class="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
              <div class="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
              <div class="absolute top-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
            </div>
            
            <!-- Digital Artwork with Glow -->
            <div style="transform: {getItemTransform(40)}" class="absolute inset-6 rounded-lg overflow-hidden">
              <div class="relative w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Digital NFT art" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <!-- NFT Details with High Z -->
            <div style="transform: {getItemTransform(100)}" class="absolute bottom-0 inset-x-0 p-6">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-6 h-6 rounded-full overflow-hidden border-2 border-purple-500">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Creator" />
                    </div>
                    <span class="text-white/80 text-xs">@crypto_master</span>
                  </div>
                  <h3 class="text-xl font-bold text-white">Nebula Dreamer #42</h3>
                </div>
                
                <div class="flex items-center gap-2">
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-white/70 text-xs ml-1">1.2k</span>
                  </div>
                  <div class="h-4 w-px bg-white/20"></div>
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-white/70 text-xs ml-1">357</span>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-between items-center mb-4">
                <div>
                  <div class="text-white/60 text-xs">Current Bid</div>
                  <div class="flex items-center">
                    <svg class="h-4 w-4 text-cyan-400 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                    </svg>
                    <span class="text-xl font-bold text-white">0.45 ETH</span>
                  </div>
                </div>
                
                <div>
                  <div class="text-white/60 text-xs text-right">Ends in</div>
                  <div class="text-white font-mono">09:23:14</div>
                </div>
              </div>
            </div>
            
            <!-- Bid Button with highest Z -->
            <div style="transform: {getItemTransform(150)}" class="absolute bottom-6 inset-x-6">
              <button class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 rounded-lg font-medium">
                Place a Bid
              </button>
            </div>
            
            <!-- Authenticity Badge -->
            <div style="transform: {getItemTransform(120)}" class="absolute top-4 right-4">
              <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-1">
                <svg class="h-3 w-3 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
                </svg>
                <span class="text-white text-xs font-medium">Verified</span>
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