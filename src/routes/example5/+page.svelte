<script>
  import InlineCard from '$lib/components/ui/3d-card/hybridcards/InlineCardHybrid.svelte';
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-8">3D Card Test - Initial & Hover Z-Transforms</h1>
  <p class="text-center mb-12 max-w-2xl mx-auto">This demo shows elements with different initial z-positions that enhance on hover. Notice how elements maintain their relative depth even before hovering.</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
    <!-- Demo Card 1 -->
    <div class="h-[500px]">
      <InlineCard
        zBehavior="hybrid"
        hoverZScale={1.8}
        initialScale={1}
        hoverScale={1.05}
        cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Background image (deep Z) -->
          <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-120)}">
            <div class="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
          </div>
          
          <!-- Middle layer pattern -->
          <div class="absolute inset-0" style="transform: {getItemTransform(-60)}">
            <div class="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:12px_12px]"></div>
          </div>
          
          <!-- Content container -->
          <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
            <!-- Title (high Z) -->
            <div class="mb-6" style="transform: {getItemTransform(100)}">
              <h2 class="text-3xl font-bold text-white text-center">3D Layers Demo</h2>
            </div>
            
            <!-- Description (medium Z) -->
            <div class="mb-8" style="transform: {getItemTransform(50)}">
              <p class="text-white/90 text-center">
                This card demonstrates different Z-values that are visible both initially and enhanced on hover.
              </p>
            </div>
            
            <!-- Button (highest Z) -->
            <div style="transform: {getItemTransform(150)}">
              <button class="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium shadow-xl hover:bg-opacity-90 transition-all duration-200">
                Highest Layer (z=150)
              </button>
            </div>
          </div>
          
          <!-- Corner elements to demonstrate depth -->
          <div class="absolute top-4 left-4" style="transform: {getItemTransform(80)}">
            <div class="bg-white/20 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">z=80</span>
            </div>
          </div>
          
          <div class="absolute top-4 right-4" style="transform: {getItemTransform(30)}">
            <div class="bg-white/20 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">z=30</span>
            </div>
          </div>
          
          <div class="absolute bottom-4 left-4" style="transform: {getItemTransform(-30)}">
            <div class="bg-black/30 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">z=-30</span>
            </div>
          </div>
          
          <div class="absolute bottom-4 right-4" style="transform: {getItemTransform(-80)}">
            <div class="bg-black/30 backdrop-blur-sm h-12 w-12 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">z=-80</span>
            </div>
          </div>
        </svelte:fragment>
      </InlineCard>
    </div>
    
    <!-- Demo Card 2 - More subtle example -->
    <div class="h-[500px]">
      <InlineCard
        zBehavior="hybrid"
        hoverZScale={2}
        initialScale={1}
        hoverScale={1.05}
        cardStyle="border-radius: 1rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Background image -->
          <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getItemTransform(-100)}">
            <img 
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Abstract gradient" 
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Content card -->
          <div 
            class="absolute inset-0 m-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10" 
            style="transform: {getItemTransform(20)}"
          >
            <div class="p-6 flex flex-col h-full">
              <!-- Card title -->
              <div class="mb-4" style="transform: {getItemTransform(60)}">
                <h3 class="text-2xl font-bold text-white">Card with Multiple Z-Layers</h3>
              </div>
              
              <!-- Card content -->
              <div class="mb-6" style="transform: {getItemTransform(40)}">
                <p class="text-white/80">
                  Notice how elements have different depths even before you hover over the card.
                  The z-positions are enhanced when you hover, creating a more dramatic effect.
                </p>
              </div>
              
              <!-- Stats with varying z-heights -->
              <div class="grid grid-cols-3 gap-4 mb-auto">
                <div class="text-center" style="transform: {getItemTransform(50)}">
                  <div class="text-2xl font-bold text-white">40%</div>
                  <div class="text-xs text-white/70">Initial Z</div>
                </div>
                <div class="text-center" style="transform: {getItemTransform(70)}">
                  <div class="text-2xl font-bold text-white">100%</div>
                  <div class="text-xs text-white/70">Hover Z</div>
                </div>
                <div class="text-center" style="transform: {getItemTransform(90)}">
                  <div class="text-2xl font-bold text-white">1.8x</div>
                  <div class="text-xs text-white/70">Z Scale</div>
                </div>
              </div>
              
              <!-- Action button -->
              <div style="transform: {getItemTransform(100)}">
                <button class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Interactive Button
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
  :global(body) {
    background-color: #0f172a;
    color: white;
  }
</style> 