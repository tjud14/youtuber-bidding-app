<script>
    import CardContainer from '$lib/components/ui/3d-card/3DCardComponents.svelte';
    import CardBody from '$lib/components/ui/3d-card/CardBody.svelte';
    import CardItem from '$lib/components/ui/3d-card/CardItem.svelte';
  </script>
  
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-white">Aceternity-Style Card (Three Components)</h2>
      
      <div class="h-[500px]">
        <CardContainer>
          <CardBody class="rounded-xl overflow-hidden border border-white/10">
            <!-- Semi-transparent background with deepest negative Z -->
            <CardItem translateZ={-100} class="absolute inset-0 z-0">
              <div class="w-full h-full bg-black/80 backdrop-blur-sm"></div>
            </CardItem>
            
            <!-- Forest image with medium-negative Z -->
            <CardItem translateZ={-10} class="absolute inset-0 z-10">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1471&auto=format&fit=crop" 
                alt="Forest" 
                class="w-full h-full object-cover opacity-90"
              />
            </CardItem>
            
            <!-- Dark overlay for better text contrast -->
            <CardItem translateZ={-20} class="absolute inset-0 z-20">
              <div class="w-full h-full bg-black/50 rounded-xl"></div>
            </CardItem>
            
            <!-- Main content in the center -->
            <div class="absolute inset-0 flex flex-col items-center justify-center p-8 z-30">
              <!-- Headline with very high Z -->
              <CardItem translateZ={100} class="mb-6">
                <h2 class="text-3xl font-bold text-white text-center">Make things float in air</h2>
              </CardItem>
              
              <!-- Subheading with high Z -->
              <CardItem translateZ={70} class="mb-12">
                <p class="text-white/90 text-center max-w-xs">
                  Hover over this card to unleash the power of CSS perspective
                </p>
              </CardItem>
              
              <!-- Button with highest Z -->
              <CardItem translateZ={150}>
                <button class="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-medium transition-colors duration-200 flex items-center gap-2">
                  Try now
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </CardItem>
            </div>
            
            <!-- Bottom right corner "Sign up" button -->
            <CardItem translateZ={120} class="absolute bottom-4 right-4 z-30">
              <button class="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Sign up
              </button>
            </CardItem>
            
            <!-- Bottom left UI element -->
            <CardItem translateZ={80} class="absolute bottom-4 left-4 z-30">
              <div class="flex items-center gap-1 text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span class="text-sm">Try now →</span>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
      
      <!-- Enhanced version with even more dramatic depth -->
      <h2 class="text-2xl font-bold mt-12 mb-6 text-white">Enhanced 3D Depth Version</h2>
      
      <div class="h-[500px] mt-8">
        <CardContainer>
          <CardBody class="rounded-xl overflow-hidden border border-white/10">
            <!-- Deepest background layer -->
            <CardItem translateZ={-150} class="absolute inset-0 z-0">
              <div class="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
            </CardItem>
            
            <!-- Background patterns layer -->
            <CardItem translateZ={-120} class="absolute inset-0 z-10">
              <div class="w-full h-full opacity-30" style="background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);"></div>
            </CardItem>
            
            <!-- Forest image pushed back -->
            <CardItem translateZ={-80} class="absolute inset-0 z-20">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1471&auto=format&fit=crop" 
                alt="Forest" 
                class="w-full h-full object-cover opacity-80 blur-[1px]"
              />
            </CardItem>
            
            <!-- Dark overlay with vignette -->
            <CardItem translateZ={-40} class="absolute inset-0 z-30">
              <div class="w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            </CardItem>
            
            <!-- Decorative elements -->
            <CardItem translateZ={-20} translateX={20} translateY={-30} class="absolute top-10 left-10 z-40">
              <div class="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md"></div>
            </CardItem>
            
            <CardItem translateZ={-10} translateX={-15} translateY={10} class="absolute bottom-20 right-10 z-40">
              <div class="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md"></div>
            </CardItem>
            
            <!-- Main content in the center -->
            <div class="absolute inset-0 flex flex-col items-center justify-center p-8 z-50">
              <!-- Headline with very high Z -->
              <CardItem translateZ={120} class="mb-6">
                <h2 class="text-3xl font-bold text-white text-center">Make things float in air</h2>
              </CardItem>
              
              <!-- Subheading with high Z -->
              <CardItem translateZ={90} class="mb-12">
                <p class="text-white/90 text-center max-w-xs">
                  Hover over this card to unleash the power of CSS perspective
                </p>
              </CardItem>
              
              <!-- Button with extremely high Z -->
              <CardItem translateZ={200} translateY={-15}>
                <button class="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg">
                  Try now
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </CardItem>
            </div>
            
            <!-- Bottom right corner "Sign up" button -->
            <CardItem translateZ={180} class="absolute bottom-4 right-4 z-50">
              <button class="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-md">
                Sign up
              </button>
            </CardItem>
            
            <!-- Bottom left UI element -->
            <CardItem translateZ={130} class="absolute bottom-4 left-4 z-50">
              <div class="flex items-center gap-1 text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span class="text-sm">Try now →</span>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  </div>