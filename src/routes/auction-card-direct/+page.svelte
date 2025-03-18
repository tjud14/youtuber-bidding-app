<script>
  // Card state
  let isHovering = false;
  let rotateX = 0;
  let rotateY = 0;
  let scale = 1;
  let container;
  
  // Handler functions
  function handleMouseMove(e) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position
    rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    
    // Update state
    isHovering = true;
    scale = 1.05;
  }
  
  function handleMouseEnter() {
    isHovering = true;
    scale = 1.05;
  }
  
  function handleMouseLeave() {
    isHovering = false;
    rotateX = 0;
    rotateY = 0;
    scale = 1;
  }
  
  // Helper function to calculate z-transforms
  function getZTransform(z) {
    // Scale z-values differently based on hover state
    const zAmount = isHovering ? (z < 0 ? z * 2 : z * 2) : (z < 0 ? z : z * 0.4);
    return `translate3d(0, 0, ${zAmount}px)`;
  }
  
  // Reactive transform declarations
  $: cardTransform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-8">Auction Card - Direct DOM Manipulation</h1>
  <p class="text-center mb-12 max-w-2xl mx-auto">This implementation uses direct DOM manipulation for Z-transformations.</p>

  <div class="max-w-md mx-auto">
    <!-- Card Container -->
    <div class="card-wrapper">
      <div 
        bind:this={container}
        on:mouseenter={handleMouseEnter}
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        class="card"
        style="transform: {cardTransform};"
      >
        <!-- Background image (deep negative Z) -->
        <div class="absolute inset-0 rounded-xl overflow-hidden" style="transform: {getZTransform(-120)}">
          <img 
            src="https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
            alt="Alaska turquoise bay with mountains" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Dark gradient overlay (moderate negative Z) -->
        <div class="absolute inset-0" style="transform: {getZTransform(-60)}">
          <div class="w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <!-- Badge (high positive Z) -->
        <div class="absolute top-6 left-6" style="transform: {getZTransform(80)}">
          <span class="bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
            LIMITED EDITION
          </span>
        </div>
        
        <!-- Print number (high positive Z) -->
        <div class="absolute top-6 right-6" style="transform: {getZTransform(80)}">
          <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
            PRINT 3/25
          </span>
        </div>
        
        <!-- Content container -->
        <div class="absolute inset-0 flex flex-col justify-end p-8">
          <!-- Title (high positive Z) -->
          <div class="mb-2" style="transform: {getZTransform(100)}">
            <h3 class="text-2xl font-bold text-white text-shadow">Kachemak Bay, Alaska</h3>
          </div>
          
          <!-- Description (medium positive Z) -->
          <div class="mb-4" style="transform: {getZTransform(60)}">
            <p class="text-white/90 text-sm">
              Spring morning view of turquoise waters and pine forests. Museum-quality print on archival paper.
            </p>
          </div>
          
          <!-- Price (high positive Z) -->
          <div class="mb-4" style="transform: {getZTransform(90)}">
            <div class="text-3xl font-bold text-white text-shadow">$1,250</div>
          </div>
          
          <!-- Photographer info (medium positive Z) -->
          <div class="mb-6" style="transform: {getZTransform(70)}">
            <div class="flex items-center gap-2 text-white/80 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Photographed by Michael Stevens</span>
            </div>
          </div>
          
          <!-- Button row (highest positive Z) -->
          <div class="flex gap-3" style="transform: {getZTransform(120)}">
            <div class="flex-1">
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl hover:shadow-blue-500/20 transition-all duration-200">
                Acquire Now
              </button>
            </div>
            
            <div class="w-14">
              <button class="w-full h-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg flex items-center justify-center border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
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
  
  .card-wrapper {
    perspective: 1500px;
    height: 550px;
    width: 100%;
  }
  
  .card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
    will-change: transform;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  
  /* Critical: ensure all descendants maintain 3D context */
  .card * {
    transform-style: preserve-3d;
    backface-visibility: visible;
  }
</style> 