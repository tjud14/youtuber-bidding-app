<script>
  import { onMount, createEventDispatcher } from 'svelte';
  
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
  
  // Create a dispatcher to notify parent of hover state changes
  const dispatch = createEventDispatcher();
  
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
    if (!isHovering) {
      isHovering = true;
      scale = hoverScale;
      dispatch('hoverchange', { isHovering });
    }
  }
  
  function handleMouseEnter() {
    isHovering = true;
    scale = hoverScale;
    dispatch('hoverchange', { isHovering });
  }
  
  function handleMouseLeave() {
    isHovering = false;
    rotateX = 0;
    rotateY = 0;
    scale = initialScale;
    dispatch('hoverchange', { isHovering });
  }
  
  // Helper function to calculate z-transforms with explicit control
  function getItemStyle(z) {
    // Calculate z based on hover state
    const zAmount = isHovering ? z * hoverZScale : z;
    
    return {
      transform: `translate3d(0, 0, ${zAmount}px)`,
      transition: 'transform 0.2s ease-out',
      zValue: zAmount // Return the actual zAmount so it can be used elsewhere
    };
  }
  
  // Export these for the parent component
  export { isHovering, getItemStyle };
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
    <slot {isHovering} {getItemStyle}></slot>
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