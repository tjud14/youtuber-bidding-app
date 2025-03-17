<!-- CardContainer.svelte -->
<script>
    import { setContext } from 'svelte';
    import { writable } from 'svelte/store';
  
    // State to be shared with child components
    const mouseState = writable({
      isEntered: false,
      rotateX: 0,
      rotateY: 0,
      scale: 1
    });
    
    // Share the state with child components
    setContext('cardTransform', mouseState);
    
    // Element reference
    let container;
    
    // Handler functions
    function handleMouseMove(e) {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate mouse position relative to card center (more sensitive)
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      
      // Convert to rotation values with increased sensitivity
      const rotateY = (mouseX / width) * 25; // 25 degrees max rotation (more dramatic)
      const rotateX = (mouseY / height) * -25; // 25 degrees max rotation (more dramatic)
      
      // Update the shared state
      mouseState.set({
        isEntered: true,
        rotateX,
        rotateY,
        scale: 1.05
      });
    }
    
    function handleMouseEnter() {
      // Set isEntered when mouse enters
      mouseState.update(state => ({
        ...state,
        isEntered: true,
        scale: 1.05
      }));
    }
    
    function handleMouseLeave() {
      // Reset transformations
      mouseState.set({
        isEntered: false,
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
    class="card-container-wrapper"
    style="perspective: 1500px;" 
  >
    <div
      bind:this={container}
      on:mouseenter={handleMouseEnter}
      on:mousemove={handleMouseMove}
      on:mouseleave={handleMouseLeave}
      class="perspective-container {className}"
    >
      <slot />
    </div>
  </div>
  
  <style>
    .card-container-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
    }
    
    .perspective-container {
      transform-style: preserve-3d;
      transform-origin: center center;
      transition: transform 0.2s ease-out;
      position: relative;
      width: 100%;
      height: 100%;
    }
  </style>