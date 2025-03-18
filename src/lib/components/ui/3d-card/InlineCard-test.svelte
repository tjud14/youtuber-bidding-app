<script>
  import { onMount } from 'svelte';
  
  // Props
  export let class_name = '';
  export let cardStyle = '';
  
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
  
  // Reactive transform declarations
  $: cardTransform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
  
  // Helper function to calculate z-transforms for child elements
  // Simplified version that directly applies Z translation without scaling factors
  function getItemTransform(z, additionalTransform = '') {
    // Direct Z translation - hover simply doubles the effect
    const zAmount = isHovering ? z * 2 : z;
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
  
  /* Make sure all children preserve 3D */
  .inline-card :global(*) {
    transform-style: preserve-3d;
  }
</style> 