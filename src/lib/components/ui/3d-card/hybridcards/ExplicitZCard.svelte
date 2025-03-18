<script>
  import { onMount } from 'svelte';
  
  // Props
  export let className = '';
  export let cardStyle = '';
  export let hoverZScale = 2; // Z amplification on hover
  export let initialScale = 1; // Initial card scale
  export let hoverScale = 1.05; // Card scale on hover
  
  // State
  let isHovering = false;
  let rotateX = 0;
  let rotateY = 0;
  let scale = initialScale;
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
    scale = hoverScale;
  }
  
  function handleMouseEnter() {
    isHovering = true;
    scale = hoverScale;
  }
  
  function handleMouseLeave() {
    isHovering = false;
    rotateX = 0;
    rotateY = 0;
    scale = initialScale;
  }
  
  // Helper function to calculate z-transforms with explicit control
  function getItemStyle(z) {
    // Calculate z based on hover state
    const zAmount = isHovering ? z * hoverZScale : z;
    
    return {
      transform: `translate3d(0, 0, ${zAmount}px)`,
      transition: 'transform 0.2s ease-out'
    };
  }
</script>

<div class="explicit-card-wrapper {className}" style="{cardStyle}">
  <div
    bind:this={container}
    on:mouseenter={handleMouseEnter}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    class="explicit-card"
    style="transform: perspective(1500px) rotateX({rotateX}deg) rotateY({rotateY}deg) scale({scale});"
  >
    <div 
      class="absolute top-10 left-0 right-0 flex justify-center"
      style:transform={getItemStyle(50).transform}
      style:transition={getItemStyle(50).transition}
    >
      <div class="bg-white px-6 py-3 rounded-full shadow-xl">
        <span class="text-lg font-bold text-purple-700">Front (z=50)</span>
      </div>
    </div>
  </div>
</div>

<style>
  .explicit-card-wrapper {
    perspective: 1500px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .explicit-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
    will-change: transform;
  }
  
  /* Force 3D rendering on all elements */
  .explicit-card :global(*) {
    transform-style: preserve-3d;
    backface-visibility: visible;
  }
</style> 