<!-- CardContainer.svelte -->
<script>
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
  
    // State to be shared with child components
    const transformState = writable({
      rotateX: 0,
      rotateY: 0,
      scale: 1
    });
    
    // Share the state with child components
    setContext('cardTransform', transformState);
    
    // Element reference
    let container;
    
    // Handler functions
    function handleMouseMove(e) {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate mouse position relative to card center
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      
      // Convert to rotation values (reversed Y axis for natural feel)
      const rotateY = (mouseX / width) * 20; // 20 degrees max rotation
      const rotateX = (mouseY / height) * -20; // 20 degrees max rotation
      
      // Update the shared state
      transformState.set({
        rotateX,
        rotateY,
        scale: 1.05
      });
    }
    
    function handleMouseLeave() {
      // Reset transformations
      transformState.set({
        rotateX: 0,
        rotateY: 0,
        scale: 1
      });
    }
    
    // Props
    let className = '';
    export { className as class };
  </script>
  
  <div 
    bind:this={container}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    class="perspective-container {className}"
  >
    <slot />
  </div>
  
  <style>
    .perspective-container {
      perspective: 1000px;
      transform-style: preserve-3d;
    }
  </style>