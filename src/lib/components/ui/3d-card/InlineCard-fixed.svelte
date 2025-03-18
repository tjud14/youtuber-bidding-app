<script>
  import { onMount } from 'svelte';
  
  // Props
  export let class_name = '';
  export let cardStyle = '';
  export let initialZScale = 1; // How much of the Z effect to show initially (0-1)
  export let hoverZScale = 1.8; // How much to amplify Z on hover
  export let initialScale = 1; // Initial card scale
  export let hoverScale = 1.05; // Card scale on hover
  
  // Card state
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
  
  // Reactive transform declarations
  $: cardTransform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  
  // FIXED: Helper function with direct Z transformations that always respect the Z value
  function getItemTransform(z, additionalTransform = '') {
    // Apply scaling but make sure values are always visible
    // Directly apply Z value (no scaling down) when not hovering
    const zAmount = isHovering ? z * hoverZScale : z;
    
    return `translateZ(${zAmount}px) ${additionalTransform}`.trim();
  }
</script>

<div class="inline-card-wrapper {class_name}">
  <div 
    bind:this={container}
    on:mouseenter={handleMouseEnter}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    class="inline-card"
    style="transform: {cardTransform}; {cardStyle}"
  >
    <slot {getItemTransform} />
  </div>
</div>

<style>
  .inline-card-wrapper {
    perspective: 1500px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .inline-card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
    will-change: transform;
  }
  
  /* Critical: ensure all descendants maintain 3D context */
  .inline-card :global(*) {
    transform-style: preserve-3d;
  }
</style> 