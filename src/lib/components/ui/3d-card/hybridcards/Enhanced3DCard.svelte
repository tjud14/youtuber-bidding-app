<script>
    import { onMount, createEventDispatcher } from 'svelte';
    
    // Props with enhanced customization options
    export let className = '';
    export let cardStyle = '';
    export let hoverZScale = 2; // Z amplification on hover
    export let initialScale = 1; // Initial card scale
    export let hoverScale = 1.05; // Card scale on hover
    export let maxRotation = 10; // Max rotation in degrees
    export let perspective = 1500; // Perspective value in px
    export let transitionDuration = 0.2; // Transition duration in seconds
    export let transitionEasing = 'ease-out'; // Transition timing function
    export let minZ = -300; // Minimum z-value constraint
    export let maxZ = 300; // Maximum z-value constraint
    
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
      
      // Calculate rotation based on mouse position, constrained by maxRotation
      rotateX = (((e.clientY - centerY) / (rect.height / 2)) * -maxRotation);
      rotateY = (((e.clientX - centerX) / (rect.width / 2)) * maxRotation);
      
      // Update state if not already hovering
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
    
    // Helper function to calculate z-transforms with enhanced options
    function getItemStyle(z, options = {}) {
      const { 
        xOffset = 0, 
        yOffset = 0, 
        scale = 1,
        delay = 0,
        customEasing = null,
        customDuration = null
      } = options;
      
      // Constrain z-value to prevent extreme transformations
      const zAmount = Math.max(minZ, Math.min(maxZ, isHovering ? z * hoverZScale : z));
      
      return {
        transform: `translate3d(${xOffset}px, ${yOffset}px, ${zAmount}px) scale(${scale})`,
        transition: `transform ${customDuration || transitionDuration}s ${customEasing || transitionEasing} ${delay}s`,
        zValue: zAmount // Return the actual zAmount so it can be used elsewhere
      };
    }
    
    // Export these for the parent component
    export { isHovering, getItemStyle };
  </script>
  
  <div class="enhanced-card-wrapper {className}" style="{cardStyle}">
    <div bind:this={container}
         on:mouseenter={handleMouseEnter}
         on:mousemove={handleMouseMove}
         on:mouseleave={handleMouseLeave}
         class="enhanced-card"
         style="transform: perspective({perspective}px) rotateX({rotateX}deg) rotateY({rotateY}deg) scale({scale});"
    >
      <slot {isHovering} {getItemStyle}></slot>
    </div>
  </div>
  
  <style>
    .enhanced-card-wrapper {
      perspective: 1500px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      overflow: visible !important;
    }
    
    .enhanced-card {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.2s ease-out;
      will-change: transform;
      border-radius: 1rem;
      overflow: visible !important;
    }
    
    /* Force 3D rendering on all elements */
    .enhanced-card :global(*) {
      transform-style: preserve-3d !important;
      backface-visibility: visible;
    }
    
    /* Fix specific content containers that might have overflow:hidden */
    .enhanced-card :global(.absolute) {
      overflow: visible !important;
    }
  </style>