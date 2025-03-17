<script>
  import CardContainer from '$lib/components/ui/3d-card/3DCardComponents.svelte';
  import CardBody from '$lib/components/ui/3d-card/CardBody.svelte';
  import CardItem from '$lib/components/ui/3d-card/CardItem.svelte';
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-12">3D Card Demo</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Example 1: Simple Card -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Simple Card</h2>
      <CardContainer>
        <CardBody class="bg-white rounded-xl p-6 border shadow-lg">
          <CardItem translateZ={50} class="text-2xl font-bold mb-4">
            Beautiful 3D Card
          </CardItem>
          
          <CardItem as="p" translateZ={30} class="text-gray-500 mb-4">
            This card uses a 3D effect that responds to your mouse movements.
            Hover over the card to see the depth effect in action.
          </CardItem>
          
          <CardItem as="button" translateZ={40} class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-2">
            Click Me
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
    
    <!-- Example 2: Profile Card -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Profile Card</h2>
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
      <h2 class="text-xl font-semibold mb-4">Product Card</h2>
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
      <h2 class="text-xl font-semibold mb-4">Pricing Card</h2>
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
  
  <div class="mt-16">
    <h2 class="text-xl font-semibold mb-6">How it Works</h2>
    <div class="bg-white p-6 rounded-lg shadow">
      <p class="mb-4">The 3D Card effect uses three main components:</p>
      <ul class="list-disc pl-5 space-y-2">
        <li><code>CardContainer</code> - Tracks mouse movements and sets the perspective</li>
        <li><code>CardBody</code> - Applies the 3D rotation based on mouse position</li>
        <li><code>CardItem</code> - Individual elements with configurable Z-depth</li>
      </ul>
      <p class="mt-4">Each item can have different translateZ values to create a depth effect when the card tilts.</p>
    </div>
  </div>
</div> 