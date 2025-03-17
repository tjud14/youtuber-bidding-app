<script>
  import CardContainer from '$lib/components/ui/3d-card/3DCardComponents.svelte';
  import CardBody from '$lib/components/ui/3d-card/CardBody.svelte';
  import CardItem from '$lib/components/ui/3d-card/CardItem.svelte';
  import InlineCard from '$lib/components/ui/3d-card/InlineCard.svelte';
</script>

<div class="alaska-bg container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-12 text-white">3D Card Demo</h1>
  
  <!-- Inline Auction Card with Different Z Values -->
  <div class="mb-16">
    <h2 class="text-xl font-semibold mb-4 text-white">Enhanced 3D Auction Card</h2>
    <div class="max-w-sm mx-auto">
      <div class="test-card">
        <CardContainer>
          <CardBody class="rounded-xl overflow-hidden">
            <!-- Background Image -->
            <CardItem as="div" translateZ={-20} class="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1607302524464-3b6250d3ebca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" 
                alt="Damascus knife" 
                class="w-full h-full object-cover opacity-40"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 rounded-xl"></div>
              <div class="absolute -top-1 -left-1 -right-1 h-20 bg-gradient-to-b from-black/80 to-transparent"></div>
            </CardItem>
            
            <!-- Auction Timer Badge -->
            <CardItem translateZ={100} class="absolute top-4 left-4 z-30">
              <div class="relative">
                <span class="bg-red-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
                  <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE AUCTION: 2h 15m
                </span>
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 -left-1 whitespace-nowrap text-white">
                  translateZ(100px)
                </span>
              </div>
            </CardItem>
            
            <!-- Premium Badge -->
            <CardItem translateZ={80} class="absolute top-4 right-4 z-30">
              <div class="relative">
                <span class="bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                  PREMIUM ITEM
                </span>
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 -right-1 whitespace-nowrap text-white">
                  translateZ(80px)
                </span>
              </div>
            </CardItem>
            
            <!-- Content Container -->
            <div class="absolute inset-0 flex flex-col justify-end p-6 z-10">
              <!-- Title -->
              <CardItem translateZ={60} class="relative mb-1">
                <h3 class="text-2xl font-bold text-white">Damascus Steel Knife</h3>
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-0 whitespace-nowrap text-white">
                  translateZ(60px)
                </span>
              </CardItem>
              
              <!-- Description -->
              <CardItem translateZ={40} class="relative mb-3">
                <p class="text-white/80 text-sm">Hand-forged with 200+ layers of folded steel by master craftsmen</p>
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-0 whitespace-nowrap text-white">
                  translateZ(40px)
                </span>
              </CardItem>
              
              <!-- Price -->
              <CardItem translateZ={70} class="relative mb-4">
                <div class="text-3xl font-bold text-amber-400">$349.99</div>
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-0 whitespace-nowrap text-white">
                  translateZ(70px)
                </span>
              </CardItem>
              
              <!-- Bid Counter -->
              <CardItem translateZ={30} class="relative mb-4">
                <div class="flex items-center gap-1 text-white/70 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  <span>12 bids so far</span>
                </div>
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-0 whitespace-nowrap text-white">
                  translateZ(30px)
                </span>
              </CardItem>
              
              <!-- Action Buttons with different Z values -->
              <div class="flex gap-3">
                <!-- Primary Button -->
                <CardItem translateZ={90} class="relative flex-1">
                  <button class="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Place Bid
                  </button>
                  <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-white">
                    translateZ(90px)
                  </span>
                </CardItem>
                
                <!-- Secondary Button -->
                <CardItem translateZ={50} class="relative flex-1">
                  <button class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm font-medium border border-white/30">
                    View Details
                  </button>
                  <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-white">
                    translateZ(50px)
                  </span>
                </CardItem>
              </div>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  </div>
  
  <!-- Test Card Row - Inline Implementation -->
  <div class="mb-16">
    <h2 class="text-xl font-semibold mb-4 text-white">Inline 3D Card (Fixed Version)</h2>
    <div class="max-w-sm mx-auto">
      <div class="test-card">
        <InlineCard cardStyle="background: linear-gradient(135deg, #4338ca, #3b82f6); border-radius: 0.75rem; padding: 1.5rem;">
          <svelte:fragment slot="default" let:getItemTransform>
            <div style="transform: {getItemTransform(80)}; margin-bottom: 1rem;" class="text-2xl font-bold text-white text-center">
              Inline 3D Card
            </div>
            
            <p style="transform: {getItemTransform(40)}; margin-bottom: 1.5rem;" class="text-white/90 text-center">
              This uses a simplified all-in-one component for reliable 3D effects.
            </p>
            
            <div class="grid grid-cols-2 gap-4">
              <button style="transform: {getItemTransform(60)};" class="bg-white text-blue-600 py-2 rounded-lg font-medium">
                Primary
              </button>
              
              <button style="transform: {getItemTransform(30)};" class="bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg font-medium border border-white/30">
                Secondary
              </button>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>
  
  <!-- Test Card Row -->
  <div class="mb-16">
    <h2 class="text-xl font-semibold mb-4 text-white">Test Card (New Implementation)</h2>
    <div class="max-w-sm mx-auto">
      <div class="test-card">
        <CardContainer>
          <CardBody class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6">
            <CardItem translateZ={80} class="text-2xl font-bold text-white text-center mb-4">
              3D Test Card
            </CardItem>
            
            <CardItem translateZ={60} class="text-white/90 text-center mb-6">
              This card uses a simplified structure to test the 3D hover effect.
            </CardItem>
            
            <div class="grid grid-cols-2 gap-4">
              <CardItem as="button" translateZ={40} class="bg-white text-blue-600 py-2 rounded-lg font-medium">
                Button 1
              </CardItem>
              
              <CardItem as="button" translateZ={40} class="bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg font-medium border border-white/30">
                Button 2
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    <!-- Example 1: Simple Card (Updated to match Aceternity) -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-white">Nature Card</h2>
      <CardContainer>
        <CardBody class="rounded-xl overflow-hidden">
          <CardItem as="img" translateZ={0} class="w-full h-64 object-cover rounded-xl" 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Forest" />
          
          <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent rounded-xl">
            <CardItem translateZ={50} class="text-2xl font-bold text-white mb-2">
              Make things float in air
            </CardItem>
            
            <CardItem as="p" translateZ={30} class="text-white/90 mb-6">
              Hover over this card to unleash the power of CSS perspective
            </CardItem>
            
            <CardItem as="button" translateZ={40} class="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-md w-fit text-sm font-medium">
              Try now →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
    
    <!-- New Auction Card Example -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-white">Auction Card</h2>
      <CardContainer>
        <CardBody class="rounded-xl overflow-hidden">
          <CardItem as="img" translateZ={0} class="w-full h-64 object-cover rounded-xl" 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1445&q=80" 
                  alt="Vintage Knife" />
          
          <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent rounded-xl">
            <CardItem translateZ={70} class="absolute top-4 left-4">
              <span class="bg-red-500/80 px-3 py-1 rounded-full text-xs font-semibold text-white">
                ENDING SOON: 2h 15m
              </span>
            </CardItem>
            
            <CardItem translateZ={50} class="text-2xl font-bold text-white mb-1">
              Vintage Hunting Knife
            </CardItem>
            
            <CardItem translateZ={40} class="text-white/80 mb-3">
              Handcrafted by master artisans with traditional techniques
            </CardItem>
            
            <CardItem translateZ={60} class="text-3xl font-bold text-amber-400 mb-4">
              $249.99
            </CardItem>
            
            <div class="flex gap-3">
              <CardItem as="a" href="#" translateZ={50} class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium flex-1 text-center">
                Place Bid
              </CardItem>
              <CardItem as="a" href="#" translateZ={30} class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm font-medium flex-1 text-center">
                View Details
              </CardItem>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </div>
    
    <!-- Enhanced 3D Demo Card with Z-Depth Indicators -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-white">3D Depth Demo</h2>
      <CardContainer>
        <CardBody class="rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900/80 to-blue-900/80 border border-indigo-500/30">
          <CardItem as="div" translateZ={120} class="absolute top-3 right-3 z-10">
            <span class="bg-indigo-500/80 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
              <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              translateZ(120px)
            </span>
          </CardItem>
          
          <CardItem as="img" translateZ={-20} class="w-full h-64 object-cover opacity-20 scale-110" 
                  src="https://images.unsplash.com/photo-1465488867967-ffb57e7f0a89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Background" />
          
          <div class="absolute inset-0 flex flex-col items-center justify-center p-6">
            <CardItem translateZ={100} class="text-3xl font-bold text-white mb-6 text-center relative">
              <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                translateZ(100px)
              </span>
              The 3D Depth Effect
            </CardItem>
            
            <CardItem translateZ={60} rotateX={5} class="text-white/90 mb-8 text-center max-w-xs relative">
              <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                translateZ(60px) + rotateX(5deg)
              </span>
              The translateZ prop determines how far elements float above the card. Higher values bring elements closer to you.
            </CardItem>
            
            <div class="flex gap-3 w-full max-w-xs">
              <CardItem as="div" translateZ={80} translateY={-10} class="flex-1 relative">
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  translateZ(80px)
                </span>
                <button class="w-full bg-white text-indigo-600 py-2 rounded-lg font-medium hover:bg-blue-50">
                  High
                </button>
              </CardItem>
              
              <CardItem as="div" translateZ={40} class="flex-1 relative">
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  translateZ(40px)
                </span>
                <button class="w-full bg-white/80 text-indigo-600 py-2 rounded-lg font-medium">
                  Medium
                </button>
              </CardItem>
              
              <CardItem as="div" translateZ={20} translateY={5} class="flex-1 relative">
                <span class="bg-indigo-500/80 px-2 py-0.5 text-xs font-semibold rounded absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  translateZ(20px)
                </span>
                <button class="w-full bg-white/60 text-indigo-600 py-2 rounded-lg font-medium">
                  Low
                </button>
              </CardItem>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Example 2: Profile Card -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-white">Profile Card</h2>
      <CardContainer>
        <CardBody class="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
          <CardItem as="img" translateZ={60} class="w-24 h-24 rounded-full mx-auto mb-4" 
                  src="https://randomuser.me/api/portraits/women/17.jpg" alt="Profile" />
          
          <CardItem translateZ={50} class="text-xl font-bold text-center mb-2">
            Sarah Johnson
          </CardItem>
          
          <CardItem translateZ={40} class="text-center text-indigo-100 mb-4">
            Full Stack Developer
          </CardItem>
          
          <CardItem translateZ={30} class="flex justify-center gap-3">
            <CardItem as="button" translateZ={20} class="bg-white text-indigo-600 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </CardItem>
            <CardItem as="button" translateZ={20} class="bg-white text-indigo-600 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-1.005-.02-2.3-1.39-2.3-1.39 0-1.6 1.097-1.6 2.23v4.248H7.905V8.5h2.6v1.19h.04c.355-.675 1.23-1.39 2.53-1.39 2.7 0 3.2 1.778 3.2 4.092v3.946z" clip-rule="evenodd" />
                <path d="M5.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path fill-rule="evenodd" d="M4.5 9.5h-2v7h2v-7z" clip-rule="evenodd" />
              </svg>
            </CardItem>
            <CardItem as="button" translateZ={20} class="bg-white text-indigo-600 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17A3 3 0 015 5zm5 10a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </CardItem>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
    
    <!-- Example 3: Product Card -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-white">Product Card</h2>
      <CardContainer>
        <CardBody class="bg-white rounded-xl overflow-hidden shadow-lg">
          <CardItem as="img" translateZ={0} class="w-full h-48 object-cover" 
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Product" />
          
          <div class="p-6">
            <CardItem translateZ={50} class="text-xl font-bold mb-2">
              Polaroid Camera
            </CardItem>
            
            <CardItem translateZ={40} class="text-gray-600 mb-4">
              Vintage-inspired instant camera with modern features
            </CardItem>
            
            <CardItem translateZ={30} class="text-green-600 font-bold text-xl mb-4">
              $149.99
            </CardItem>
            
            <CardItem as="button" translateZ={60} class="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              Add to Cart
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
    
    <!-- Example 4: Pricing Card -->
    <div>
      <h2 class="text-xl font-semibold mb-4 text-white">Pricing Card</h2>
      <CardContainer>
        <CardBody class="rounded-xl p-6 text-white">
          <CardItem translateZ={60} class="text-center">
            <span class="bg-blue-500/70 px-3 py-1 rounded-full text-sm">POPULAR</span>
          </CardItem>
          
          <CardItem translateZ={50} class="text-2xl font-bold text-center my-4">
            Pro Plan
          </CardItem>
          
          <CardItem translateZ={40} class="text-center text-4xl font-bold mb-1">
            $29
          </CardItem>
          
          <CardItem translateZ={30} class="text-center text-blue-100 mb-6">
            per month, billed annually
          </CardItem>
          
          <CardItem translateZ={20} class="space-y-2 mb-6">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Unlimited projects</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Advanced analytics</span>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>24/7 Priority support</span>
            </div>
          </CardItem>
          
          <CardItem as="button" translateZ={70} class="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50">
            Get Started
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  </div>
  
  <div class="mt-16 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
    <h2 class="text-xl font-semibold mb-6 text-white">How it Works</h2>
    <div class="text-white/90">
      <p class="mb-4">The 3D Card effect uses three main components:</p>
      <ul class="list-disc pl-5 space-y-2">
        <li><code class="bg-white/10 px-1 py-0.5 rounded">CardContainer</code> - Tracks mouse movements and sets the perspective</li>
        <li><code class="bg-white/10 px-1 py-0.5 rounded">CardBody</code> - Applies the 3D rotation based on mouse position</li>
        <li><code class="bg-white/10 px-1 py-0.5 rounded">CardItem</code> - Individual elements with configurable Z-depth</li>
      </ul>
      <p class="mt-4">Each item can have different translateZ values to create a depth effect when the card tilts.</p>
      <p class="mt-2">For dramatic effects, try values between 20-120px. You can also combine with translateX, translateY, and rotation.</p>
    </div>
  </div>

  <!-- NEW: Aceternity-Style Forest Card Section -->
  <div class="mt-16">
    <h2 class="text-3xl font-bold text-center mb-12 text-white">Aceternity-Style Cards</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <!-- Using CardContainer/CardBody/CardItem approach -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-white">Forest Card (CardContainer)</h2>
        <div class="h-[350px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden">
              <!-- Background with negative Z -->
              <CardItem translateZ={-50} class="absolute inset-0 opacity-90">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Forest" 
                  class="w-full h-full object-cover brightness-[0.8]"
                />
                <div class="absolute inset-0 bg-black/20"></div>
              </CardItem>
              
              <!-- Title with very high Z -->
              <CardItem translateZ={120} class="text-3xl font-bold text-white mb-6 text-center absolute inset-x-0 top-1/3 transform -translate-y-1/2">
                Make things float in air
              </CardItem>
              
              <!-- Description with high Z -->
              <CardItem translateZ={80} class="text-white/90 mb-8 text-center max-w-xs mx-auto absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                Hover over this card to unleash the power of CSS perspective
              </CardItem>
              
              <!-- Button with extremely high Z -->
              <div class="flex justify-center absolute inset-x-0 bottom-10">
                <CardItem translateZ={150} class="relative">
                  <button class="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100">
                    Try now →
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- Using InlineCard approach - also completely reworked -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-white">Forest Card (InlineCard)</h2>
        <div class="h-[350px]">
          <InlineCard cardStyle="border-radius: 0.75rem; overflow: hidden; transform-style: preserve-3d;">
            <svelte:fragment slot="default" let:getItemTransform>
              <!-- Background Image with very negative Z -->
              <div class="absolute inset-0 z-0" style="transform: {getItemTransform(-70)}">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Forest" 
                  class="w-full h-full object-cover brightness-[0.8]"
                />
                <div class="absolute inset-0 bg-black/20"></div>
              </div>
              
              <!-- Content positioned exactly like the Super Deep Effect card -->
              <div style="transform: {getItemTransform(120)}" class="text-3xl font-bold text-white text-center absolute inset-x-0 top-1/3 transform -translate-y-1/2">
                Make things float in air
              </div>
              
              <div style="transform: {getItemTransform(80)}" class="text-white/90 text-center max-w-xs mx-auto absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                Hover over this card to unleash the power of CSS perspective
              </div>
              
              <div class="absolute inset-x-0 bottom-10 flex justify-center">
                <div style="transform: {getItemTransform(150)}">
                  <button class="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100">
                    Try now →
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </InlineCard>
        </div>
      </div>
    </div>
    
    <!-- Add Additional Aceternity-Style Cards with varying Z heights -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <!-- Card with dramatic Z differences -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-white">Dramatic Z Heights</h2>
        <div class="h-[350px]">
          <CardContainer>
            <CardBody class="rounded-xl bg-gradient-to-br from-purple-700/70 to-violet-900/70 p-6 border border-white/10">
              <CardItem translateZ={-50} class="absolute inset-0 opacity-50">
                <div class="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
              </CardItem>
              
              <CardItem translateZ={120} class="text-2xl font-bold text-white mb-6 text-center">
                Super Deep Effect
              </CardItem>
              
              <CardItem translateZ={80} class="text-white/80 mb-8 text-center">
                Elements with high Z values (120px) will appear to float much higher than those with lower values
              </CardItem>
              
              <div class="flex justify-center">
                <CardItem translateZ={150} class="relative">
                  <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500/80 text-white text-xs py-1 px-2 rounded-full">
                    Z: 150px
                  </span>
                  <button class="px-5 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50">
                    Highest
                  </button>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- Glass Card Effect -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-white">Glass Card Effect</h2>
        <div class="h-[350px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
              <CardItem translateZ={-20} class="absolute inset-0">
                <div class="w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)]"></div>
              </CardItem>
              
              <div class="absolute inset-0 flex flex-col justify-center items-center p-6">
                <CardItem translateZ={50} class="text-2xl font-bold text-white mb-3 text-center">
                  Glass Morphism
                </CardItem>
                
                <CardItem translateZ={30} class="text-white/90 mb-6 text-center max-w-xs">
                  Combine backdrop-blur with subtle gradients and borders
                </CardItem>
                
                <CardItem translateZ={70} class="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium">
                  Explore →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      
      <!-- Layered Elements Card -->
      <div>
        <h2 class="text-xl font-semibold mb-4 text-white">Layered Elements</h2>
        <div class="h-[350px]">
          <CardContainer>
            <CardBody class="rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/90 to-indigo-900/90 border border-blue-500/20 p-6">
              <!-- Background Elements at negative Z -->
              <CardItem translateZ={-30} class="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></CardItem>
              <CardItem translateZ={-20} class="absolute -top-6 -left-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl"></CardItem>
              
              <!-- Content at different Z heights -->
              <CardItem translateZ={40} class="text-2xl font-bold text-white mb-4 text-center">
                Layered Design
              </CardItem>
              
              <CardItem translateZ={30} class="text-white/80 mb-6 text-center">
                Use negative Z values for background elements and positive values for content
              </CardItem>
              
              <div class="flex justify-between mt-8">
                <CardItem translateZ={60} class="h-8 w-8 rounded-full bg-blue-500/80"></CardItem>
                <CardItem translateZ={80} class="h-10 w-10 rounded-full bg-indigo-500/80"></CardItem>
                <CardItem translateZ={100} class="h-12 w-12 rounded-full bg-violet-500/80"></CardItem>
                <CardItem translateZ={120} class="h-14 w-14 rounded-full bg-purple-500/80"></CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .alaska-bg {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/assets/images/alaska-1.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
  
  .test-card {
    height: 300px;
  }
</style> 