<script>
    import CardContainer from '$lib/components/ui/3d-card/3DCardComponents.svelte';
    import CardBody from '$lib/components/ui/3d-card/CardBody.svelte';
    import CardItem from '$lib/components/ui/3d-card/CardItem.svelte';
    import InlineCard from '$lib/components/ui/3d-card/InlineCard.svelte';
  </script>
  
  <div class="container mx-auto py-16 px-4">
    <h1 class="text-4xl font-bold text-center mb-16">Stunning 3D Card Examples</h1>
    
    <!-- Modern Product Card -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      <div>
        <h2 class="text-2xl font-semibold mb-6">Premium Product Card</h2>
        <div class="h-[400px]">
          <CardContainer>
            <CardBody class="bg-white rounded-xl overflow-hidden">
              <!-- Background image with slight negative Z to create depth -->
              <CardItem as="img" translateZ={-10} class="w-full h-[250px] object-cover" 
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070" 
                        alt="Headphones" />
              
              <div class="p-6">
                <!-- Product name with high Z -->
                <CardItem translateZ={50} class="text-xl font-bold mb-2 text-gray-800">
                  Ultra Wireless Headphones
                </CardItem>
                
                <!-- Description with medium Z -->
                <CardItem translateZ={40} class="text-gray-600 mb-4 text-sm">
                  Premium noise-canceling with 40h battery life and studio-quality sound
                </CardItem>
                
                <div class="flex justify-between items-center">
                  <!-- Price with high Z -->
                  <CardItem translateZ={60} class="text-indigo-600 font-bold text-xl">
                    $249.99
                  </CardItem>
                  
                  <!-- Action button with highest Z -->
                  <CardItem as="button" translateZ={80} class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Add to Cart
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- App Download Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">App Download Card</h2>
        <div class="h-[400px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500">
              <!-- Decorative elements with negative Z -->
              <CardItem translateZ={-30} class="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"></CardItem>
              <CardItem translateZ={-20} class="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10"></CardItem>
              
              <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
                <!-- App icon with high Z -->
                <CardItem translateZ={80} class="mb-6">
                  <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                </CardItem>
                
                <!-- App name with high Z -->
                <CardItem translateZ={60} class="text-2xl font-bold text-white mb-3 text-center">
                  Harmony Connect
                </CardItem>
                
                <!-- Description with medium Z -->
                <CardItem translateZ={40} class="text-white/90 mb-6 text-center max-w-xs">
                  Experience our revolutionary AI-powered social platform. Connect with like-minded people around the world.
                </CardItem>
                
                <!-- Download buttons with highest Z -->
                <div class="flex gap-4">
                  <CardItem translateZ={100} class="bg-white/20 backdrop-blur-sm border border-white/30 px-5 py-2 rounded-lg text-white font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.5,12.5h-15C1.7,12.5,1,11.8,1,11v-1c0-0.8,0.7-1.5,1.5-1.5h15c0.8,0,1.5,0.7,1.5,1.5v1 C19,11.8,18.3,12.5,17.5,12.5z"/>
                      <path d="M17.5,18H2.5C1.7,18,1,17.3,1,16.5v-1c0-0.8,0.7-1.5,1.5-1.5h15c0.8,0,1.5,0.7,1.5,1.5v1 C19,17.3,18.3,18,17.5,18z"/>
                      <path d="M17.5,7H2.5C1.7,7,1,6.3,1,5.5v-1C1,3.7,1.7,3,2.5,3h15C18.3,3,19,3.7,19,4.5v1C19,6.3,18.3,7,17.5,7z"/>
                    </svg>
                    App Store
                  </CardItem>
                  <CardItem translateZ={100} class="bg-white text-purple-600 px-5 py-2 rounded-lg font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3,3v14l8-7L3,3z"/>
                      <path d="M3,3l7,8l3-2l7,8V3H3z"/>
                    </svg>
                    Google Play
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- Pricing Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Premium Pricing Card</h2>
        <div class="h-[400px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 border border-white/20">
              <!-- Background elements -->
              <CardItem translateZ={-20} class="absolute inset-0">
                <div class="w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_70%)]"></div>
              </CardItem>
              
              <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
                <!-- Popular badge -->
                <CardItem translateZ={100} class="absolute top-4 right-4">
                  <span class="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </CardItem>
                
                <!-- Plan name with high Z -->
                <CardItem translateZ={60} class="text-2xl font-bold text-white mb-2 text-center">
                  Business Pro
                </CardItem>
                
                <!-- Price with very high Z -->
                <CardItem translateZ={90} class="mb-1">
                  <div class="flex items-baseline">
                    <span class="text-4xl font-bold text-white">$49</span>
                    <span class="text-white/80 ml-1">/month</span>
                  </div>
                </CardItem>
                
                <!-- Billing cycle with medium Z -->
                <CardItem translateZ={40} class="text-white/70 text-sm mb-6">
                  billed annually or $59 monthly
                </CardItem>
                
                <!-- Features list with medium Z -->
                <CardItem translateZ={50} class="mb-8 w-full max-w-xs">
                  <ul class="space-y-3">
                    <li class="flex items-center text-white">
                      <svg class="h-5 w-5 mr-2 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Unlimited projects
                    </li>
                    <li class="flex items-center text-white">
                      <svg class="h-5 w-5 mr-2 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Advanced analytics
                    </li>
                    <li class="flex items-center text-white">
                      <svg class="h-5 w-5 mr-2 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      24/7 Priority support
                    </li>
                  </ul>
                </CardItem>
                
                <!-- CTA button with highest Z -->
                <CardItem translateZ={120} class="w-full max-w-xs">
                  <button class="w-full bg-white text-blue-600 py-3 rounded-lg font-bold transition-colors hover:bg-blue-50">
                    Get Started
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
    
    <!-- Stunning Featured Cards -->
    <h2 class="text-3xl font-bold text-center mb-12">Featured Examples</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      <!-- Modern Dashboard Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Analytics Dashboard Card</h2>
        <div class="h-[500px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
              <!-- Header with high Z -->
              <CardItem translateZ={60} class="p-6 border-b border-gray-700">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-bold text-white">Performance Overview</h3>
                  <div class="bg-gray-800 rounded-md p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                </div>
              </CardItem>
              
              <!-- Chart section with high Z -->
              <CardItem translateZ={40} class="p-6">
                <div class="mb-4 flex justify-between items-center">
                  <div>
                    <span class="text-gray-400 text-sm">Total Revenue</span>
                    <div class="text-2xl font-bold text-white">$82,950</div>
                    <div class="flex items-center text-green-400 text-sm mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      24.5% vs last month
                    </div>
                  </div>
                  <div>
                    <div class="bg-gray-800 p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- Fake chart -->
                <CardItem translateZ={20} class="h-40 bg-gray-800 rounded-lg overflow-hidden">
                  <div class="h-full w-full relative">
                    <div class="absolute bottom-0 left-0 w-full h-28 flex items-end">
                      <div class="w-1/12 h-[35%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[45%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[28%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[65%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[40%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[60%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[75%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[62%] bg-blue-500/60 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[85%] bg-blue-500 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[68%] bg-blue-500 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[90%] bg-blue-500 mx-0.5 rounded-t"></div>
                      <div class="w-1/12 h-[100%] bg-blue-500 mx-0.5 rounded-t"></div>
                    </div>
                  </div>
                </CardItem>
              </CardItem>
              
              <!-- Stats section with high Z -->
              <CardItem translateZ={50} class="px-6 pb-6">
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-gray-800 p-4 rounded-lg">
                    <div class="text-gray-400 text-xs mb-1">Customers</div>
                    <div class="text-white font-bold">1,429</div>
                    <div class="text-green-400 text-xs mt-1">+5.3%</div>
                  </div>
                  <div class="bg-gray-800 p-4 rounded-lg">
                    <div class="text-gray-400 text-xs mb-1">Orders</div>
                    <div class="text-white font-bold">826</div>
                    <div class="text-green-400 text-xs mt-1">+12.7%</div>
                  </div>
                  <div class="bg-gray-800 p-4 rounded-lg">
                    <div class="text-gray-400 text-xs mb-1">Conversion</div>
                    <div class="text-white font-bold">24.8%</div>
                    <div class="text-red-400 text-xs mt-1">-2.1%</div>
                  </div>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- Cinematic Card with Floating Elements -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Cinematic Travel Card</h2>
        <div class="h-[500px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden">
              <!-- Background image with negative Z -->
              <CardItem translateZ={-50} class="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2070" 
                  alt="Santorini, Greece" 
                  class="w-full h-full object-cover brightness-[0.6]"
                />
                <div class="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-black/60"></div>
              </CardItem>
              
              <!-- Floating elements at different Z heights -->
              <CardItem translateZ={30} class="absolute top-10 right-10">
                <div class="text-white text-right">
                  <div class="font-light mb-0.5">DESTINATION</div>
                  <div class="text-4xl font-bold tracking-wide">GREECE</div>
                </div>
              </CardItem>
              
              <CardItem translateZ={40} class="absolute top-8 left-8">
                <div class="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </CardItem>
              
              <CardItem translateZ={20} class="absolute bottom-40 left-10">
                <div class="bg-white/10 backdrop-blur-md rounded-full px-4 py-1 text-white text-xs flex items-center gap-1 border border-white/20">
                  <span class="inline-block w-2 h-2 bg-white rounded-full"></span>
                  MEDITERRANEAN
                </div>
              </CardItem>
              
              <!-- Main content with high Z -->
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <CardItem translateZ={80} class="mb-2">
                  <h1 class="text-3xl font-bold text-white">Santorini Luxury Retreat</h1>
                </CardItem>
                
                <CardItem translateZ={60} class="mb-4">
                  <p class="text-white/80">Experience breathtaking sunsets from your private infinity pool overlooking the Aegean Sea.</p>
                </CardItem>
                
                <CardItem translateZ={100} class="flex justify-between items-center">
                  <div class="text-white">
                    <span class="text-2xl font-bold">$4,299</span>
                    <span class="text-white/70 ml-1">per person</span>
                  </div>
                  
                  <button class="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                    Book Now
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
    
    <!-- InlineCard Examples -->
    <h2 class="text-3xl font-bold text-center mb-12">Inline Card Examples</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      <!-- Game Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Game Card</h2>
        <div class="h-[500px]">
          <InlineCard>
            <svelte:fragment slot="default" let:getItemTransform>
              <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070" 
                  alt="Game background" 
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>
              
              <div style="transform: {getItemTransform(50)}" class="absolute top-6 left-6 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm border border-white/20">
                NEW RELEASE
              </div>
              
              <div class="absolute inset-0 flex flex-col justify-end p-6">
                <div style="transform: {getItemTransform(80)}" class="mb-2">
                  <h2 class="text-3xl font-bold text-white">Ethereal Legends</h2>
                </div>
                
                <div style="transform: {getItemTransform(60)}" class="mb-4">
                  <p class="text-white/80">Embark on an epic adventure through mythical realms and ancient mysteries.</p>
                </div>
                
                <div style="transform: {getItemTransform(90)}" class="mb-6">
                  <div class="flex -space-x-2">
                    <img class="w-8 h-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                    <img class="w-8 h-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                    <img class="w-8 h-8 rounded-full border-2 border-gray-800" src="https://randomuser.me/api/portraits/men/36.jpg" alt="User" />
                    <div class="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white">+5</div>
                  </div>
                </div>
                
                <div style="transform: {getItemTransform(100)}" class="flex justify-between items-center">
                  <div class="text-amber-400 font-bold text-2xl">$59.99</div>
                  <button class="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
                    Pre-order Now
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </InlineCard>
        </div>
      </div>
      
      <!-- Event Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Event Card</h2>
        <div class="h-[500px]">
          <InlineCard>
            <svelte:fragment slot="default" let:getItemTransform>
              <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-20)}">
                <div class="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-800"></div>
                <!-- Decorative elements -->
                <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink-500/20 blur-2xl"></div>
                <div class="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-500/20 blur-2xl"></div>
              </div>
              
              <div style="transform: {getItemTransform(90)}" class="absolute top-8 left-8">
                <div class="bg-white rounded-xl p-4 text-center w-16">
                  <div class="text-purple-600 font-bold text-xl">12</div>
                  <div class="text-gray-600 text-sm font-medium">MAY</div>
                </div>
              </div>
              
              <div class="absolute inset-0 flex flex-col justify-end p-8">
                <div style="transform: {getItemTransform(80)}" class="mb-2">
                  <h2 class="text-3xl font-bold text-white">Tech Summit 2025</h2>
                </div>
                
                <div style="transform: {getItemTransform(60)}" class="mb-4">
                  <p class="text-white/80">Join industry leaders and innovators for a day of inspiration and networking.</p>
                </div>
                
                <div style="transform: {getItemTransform(70)}" class="mb-6 flex items-center gap-3">
                  <div class="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white border border-white/20 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    San Francisco
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white border border-white/20 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    9:00 AM - 5:00 PM
                  </div>
                </div>
                
                <div style="transform: {getItemTransform(100)}" class="flex justify-center">
                  <button class="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-purple-50">
                    Register Now
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </InlineCard>
        </div>
      </div>
      
      <!-- NFT Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">NFT Showcase Card</h2>
        <div class="h-[500px]">
          <InlineCard>
            <svelte:fragment slot="default" let:getItemTransform>
              <!-- Background with subtle gradient -->
              <div class="absolute inset-0 rounded-xl overflow-hidden bg-gray-900" style="transform: {getItemTransform(-10)}">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
                <div class="absolute inset-0 opacity-30" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23777\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"></div>
              </div>
              
              <!-- NFT artwork with highest Z -->
              <div style="transform: {getItemTransform(70)}" class="absolute top-6 inset-x-6">
                <div class="rounded-lg overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
                  <img 
                    src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=1056" 
                    alt="Digital Art NFT" 
                    class="w-full h-56 object-cover"
                  />
                </div>
              </div>
              
              <div class="absolute inset-0 flex flex-col justify-end p-6">
                <div style="transform: {getItemTransform(90)}" class="flex justify-between mb-2">
                  <h2 class="text-2xl font-bold text-white">Cosmic Dreamer #042</h2>
                  <div class="bg-purple-500/20 backdrop-blur-sm p-2 rounded-md border border-purple-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                
                <div style="transform: {getItemTransform(60)}" class="mb-4">
                  <div class="flex items-center gap-2">
                    <img class="w-8 h-8 rounded-full border-2 border-purple-500/30" src="https://randomuser.me/api/portraits/women/42.jpg" alt="Creator" />
                    <div>
                      <div class="text-gray-400 text-xs">Created by</div>
                      <div class="text-white text-sm font-medium">@nova_creator</div>
                    </div>
                  </div>
                </div>
                
                <div style="transform: {getItemTransform(50)}" class="mb-5 flex justify-between">
                  <div>
                    <div class="text-gray-400 text-xs">Current Bid</div>
                    <div class="text-white text-xl font-bold flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      2.75 ETH
                    </div>
                  </div>
                  <div>
                    <div class="text-gray-400 text-xs">Ends in</div>
                    <div class="text-white text-xl font-bold">12h 30m 15s</div>
                  </div>
                </div>
                
                <div style="transform: {getItemTransform(100)}" class="flex gap-3">
                  <button class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold">
                    Place Bid
                  </button>
                  <button class="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg border border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </InlineCard>
        </div>
      </div>
    </div>
    
    <!-- More Creative Examples -->
    <h2 class="text-3xl font-bold text-center mb-12">Creative Combinations</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
      <!-- Parallax Depth Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Parallax Mountain Card</h2>
        <div class="h-[500px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden">
              <!-- Sky layer (deepest) -->
              <CardItem translateZ={-100} class="absolute inset-0">
                <div class="w-full h-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
              </CardItem>
              
              <!-- Far mountains (very deep) -->
              <CardItem translateZ={-80} class="absolute inset-0">
                <div class="absolute bottom-0 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full opacity-70">
                    <path fill="#6366f1" fill-opacity="0.7" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                </div>
              </CardItem>
              
              <!-- Mid mountains (medium depth) -->
              <CardItem translateZ={-60} class="absolute inset-0">
                <div class="absolute bottom-0 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
                    <path fill="#4f46e5" fill-opacity="0.8" d="M0,96L48,128C96,160,192,224,288,218.7C384,213,480,139,576,117.3C672,96,768,128,864,170.7C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                </div>
              </CardItem>
              
              <!-- Near mountains (shallow depth) -->
              <CardItem translateZ={-40} class="absolute inset-0">
                <div class="absolute bottom-0 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
                    <path fill="#3730a3" fill-opacity="0.9" d="M0,32L48,37.3C96,43,192,53,288,90.7C384,128,480,192,576,202.7C672,213,768,171,864,170.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                </div>
              </CardItem>
              
              <!-- Foreground mountains -->
              <CardItem translateZ={-20} class="absolute inset-0">
                <div class="absolute bottom-0 w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
                    <path fill="#312e81" d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,181.3C672,149,768,107,864,112C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                </div>
              </CardItem>
              
              <!-- Sun -->
              <CardItem translateZ={-50} class="absolute top-12 right-12">
                <div class="h-20 w-20 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50"></div>
              </CardItem>
              
              <!-- Clouds -->
              <CardItem translateZ={-70} class="absolute top-24 left-12">
                <div class="h-8 w-16 rounded-full bg-white opacity-80"></div>
              </CardItem>
              <CardItem translateZ={-65} class="absolute top-16 left-20">
                <div class="h-6 w-20 rounded-full bg-white opacity-90"></div>
              </CardItem>
              
              <!-- Content in foreground -->
              <div class="absolute inset-x-0 bottom-0 p-8 pb-10">
                <CardItem translateZ={80} class="mb-4">
                  <h2 class="text-4xl font-bold text-white text-center">Mountain Retreat</h2>
                </CardItem>
                
                <CardItem translateZ={60} class="mb-8">
                  <p class="text-white/90 text-center max-w-md mx-auto">
                    Immerse yourself in the tranquility of nature with our guided mountain hiking experiences.
                  </p>
                </CardItem>
                
                <CardItem translateZ={100} class="flex justify-center">
                  <button class="bg-white text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                    Explore Packages
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- Space Exploration Card -->
      <div>
        <h2 class="text-2xl font-semibold mb-6">Space Exploration Card</h2>
        <div class="h-[500px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden bg-black">
              <!-- Stars background (deepest) -->
              <CardItem translateZ={-100} class="absolute inset-0">
                <div class="w-full h-full bg-[url('https://media.istockphoto.com/id/1341707102/vector/space-background-with-stars-vector-illustration.jpg?s=612x612&w=0&k=20&c=4d1XS0soizPFBBIARN1UlWvNlLCYHvTdmfVHNZ2eZOU=')] bg-cover opacity-80"></div>
              </CardItem>
              
              <!-- Planet (deep) -->
              <CardItem translateZ={-60} class="absolute -bottom-20 -right-20">
                <div class="h-64 w-64 rounded-full" style="background: radial-gradient(circle at 30% 40%, #1e3a8a 0%, #1e40af 30%, #3b82f6 100%); box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);"></div>
                <!-- Planet ring -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-72 w-72 border-8 border-gray-300/20 rounded-full rotate-12"></div>
              </CardItem>
              
              <!-- Floating asteroid 1 -->
              <CardItem translateZ={-40} translateX={-10} translateY={20} class="absolute top-32 left-20">
                <div class="h-6 w-6 rounded-full bg-gray-600"></div>
              </CardItem>
              
              <!-- Floating asteroid 2 -->
              <CardItem translateZ={-30} translateX={10} translateY={-15} class="absolute bottom-40 right-32">
                <div class="h-4 w-4 rounded-full bg-gray-500"></div>
              </CardItem>
              
              <!-- Spaceship with highest Z -->
              <CardItem translateZ={60} translateX={-30} translateY={-20} rotateZ={15} class="absolute top-1/3 right-1/4">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-lg">
                  <path d="M70 20H10C10 20 0 15 0 10C0 5 10 0 10 0H70C70 0 80 5 80 10C80 15 70 20 70 20Z" fill="#e2e8f0"/>
                  <path d="M70 40H10C10 40 0 35 0 30C0 25 10 20 10 20H70C70 20 80 25 80 30C80 35 70 40 70 40Z" fill="#94a3b8"/>
                  <circle cx="40" cy="20" r="10" fill="#3b82f6"/>
                  <path d="M10 0V20M70 0V20" stroke="#475569" stroke-width="2"/>
                </svg>
              </CardItem>
              
              <!-- Content overlay -->
              <div class="absolute inset-0 flex flex-col justify-end p-8">
                <CardItem translateZ={80} class="mb-2">
                  <h2 class="text-3xl font-bold text-white">Space Odyssey 2025</h2>
                </CardItem>
                
                <CardItem translateZ={60} class="mb-6">
                  <p class="text-blue-200 max-w-md">
                    The next generation of space tourism is here. Experience zero gravity and witness Earth from above.
                  </p>
                </CardItem>
                
                <CardItem translateZ={100} class="flex gap-4">
                  <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium">
                    Book Flight
                  </button>
                  <button class="bg-transparent border border-blue-400 text-blue-300 hover:bg-blue-900/30 px-5 py-2 rounded-md font-medium">
                    Learn More
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
    
    <!-- Explanation Section -->
    <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-20">
      <h2 class="text-2xl font-bold mb-6">How to Use These Cards</h2>
      
      <div class="space-y-4">
        <p>These examples demonstrate the power of 3D cards using our Svelte implementation. Here are some tips to create stunning 3D effects:</p>
        
        <ol class="list-decimal pl-5 space-y-2">
          <li>Use <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">translateZ</code> to control how far elements appear from the card surface (higher values = closer to viewer)</li>
          <li>Create depth by using negative Z values for backgrounds and high positive values for important elements</li>
          <li>Combine with <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">translateX/Y</code> and <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">rotateX/Y/Z</code> for more dynamic effects</li>
          <li>Layer multiple elements at different Z depths to create a parallax effect</li>
          <li>Use the <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">InlineCard</code> component for simpler implementations with the <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">getItemTransform</code> function</li>
        </ol>
        
        <p>Experiment with these examples and adapt them to your needs. The possibilities are endless!</p>
      </div>
    </div>
  </div>