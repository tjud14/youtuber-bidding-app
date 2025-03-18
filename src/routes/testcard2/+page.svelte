<script>
  // No component import - built from scratch
  let isHovering = false;
  let rotateX = 0;
  let rotateY = 0;
  let container;
  
  function handleMouseMove(e) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position
    rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    
    isHovering = true;
  }
  
  function handleMouseEnter() {
    isHovering = true;
  }
  
  function handleMouseLeave() {
    isHovering = false;
    rotateX = 0;
    rotateY = 0;
  }
  
  // Calculate z-depths based on hover state
  $: zMultiplier = isHovering ? 2 : 1;
  $: baseZ = -50 * zMultiplier;
  $: middleZ = 0;
  $: frontZ = isHovering ? 50 : 20; // Still has some depth when not hovering
  $: topZ = isHovering ? 100 : 40;  // Still has some depth when not hovering
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-8">Alternative 3D Card Test</h1>
  <p class="text-center mb-12 max-w-2xl mx-auto">This version uses a different approach with direct style manipulations.</p>

  <div class="grid place-items-center">
    <!-- 3D Card built from scratch -->
    <div class="scene">
      <div 
        bind:this={container}
        class="card-wrapper" 
        on:mouseenter={handleMouseEnter}
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        style="transform: perspective(1500px) rotateX({rotateX}deg) rotateY({rotateY}deg);"
      >
        <!-- Base layer (deepest) -->
        <div 
          class="layer base-layer"
          style="transform: translate3d(0, 0, {baseZ}px);"
        ></div>
        
        <!-- Middle layer -->
        <div 
          class="layer middle-layer"
          style="transform: translate3d(0, 0, {middleZ}px);"
        >
          <div class="circle">
            <span>Middle (z={middleZ})</span>
          </div>
        </div>
        
        <!-- Front layer -->
        <div 
          class="layer front-layer"
          style="transform: translate3d(0, 0, {frontZ}px);"
        >
          <div class="pill">
            <span>Front (z={frontZ})</span>
          </div>
        </div>
        
        <!-- Top layer -->
        <div 
          class="layer top-layer"
          style="transform: translate3d(0, 0, {topZ}px);"
        >
          <button class="button">
            Top (z={topZ})
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Debug info -->
  <div class="mt-12 text-center text-white/60">
    <p>Hover state: {isHovering ? 'Active' : 'Inactive'}</p>
    <p>Rotation: X: {rotateX.toFixed(2)}deg, Y: {rotateY.toFixed(2)}deg</p>
  </div>
</div>

<style>
  :global(body) {
    background-color: #0f172a;
    color: white;
  }
  
  .scene {
    width: 300px;
    height: 400px;
    perspective: 1500px;
    margin: 0 auto;
  }
  
  .card-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
    will-change: transform;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  
  .layer {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
    border-radius: 1rem;
  }
  
  .base-layer {
    background: linear-gradient(135deg, #4f46e5, #7e22ce);
  }
  
  .middle-layer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .circle {
    width: 160px;
    height: 160px;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.125rem;
    color: white;
  }
  
  .front-layer {
    top: 40px;
    display: flex;
    justify-content: center;
  }
  
  .pill {
    background-color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: bold;
    color: #7e22ce;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .top-layer {
    bottom: 40px;
    display: flex;
    justify-content: center;
  }
  
  .button {
    background-color: #7e22ce;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: bold;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border: none;
  }
  
  .button:hover {
    background-color: #6d28d9;
  }
</style> 