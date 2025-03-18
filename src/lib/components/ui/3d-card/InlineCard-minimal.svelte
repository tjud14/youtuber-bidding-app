<script>
  // Bare minimum state
  let isHovering = false;
  let rotateX = 0;
  let rotateY = 0;
  let container;
  
  // Simple event handlers
  function handleMouseMove(e) {
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    isHovering = true;
  }
  
  // Direct Z transform function - absolute minimum
  function getItemTransform(z) {
    return `translateZ(${z}px)`;
  }
</script>

<div class="wrapper">
  <div 
    bind:this={container}
    on:mouseenter={() => isHovering = true}
    on:mousemove={handleMouseMove}
    on:mouseleave={() => { isHovering = false; rotateX = 0; rotateY = 0; }}
    class="card"
    style="transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg);"
  >
    <slot {getItemTransform} />
  </div>
</div>

<style>
  .wrapper {
    perspective: 1000px;
    width: 100%;
    height: 100%;
  }
  
  .card {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
  }
  
  /* Critical: ensure all descendants maintain 3D context */
  .card :global(*) {
    transform-style: preserve-3d;
  }
</style> 