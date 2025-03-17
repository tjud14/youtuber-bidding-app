<!-- CardBody.svelte -->
<script>
    import { getContext } from 'svelte';
    
    // Get the transform state from parent CardContainer
    const mouseState = getContext('cardTransform');
    
    // Props
    let className = '';
    export { className as class };
</script>
  
{#if $mouseState}
  <div 
    class="card-body {className}"
    style="transform: rotateX({$mouseState.rotateX}deg) rotateY({$mouseState.rotateY}deg) scale({$mouseState.scale});"
  >
    <slot />
  </div>
{/if}
  
<style>
  .card-body {
    transform-style: preserve-3d;
    transform-origin: center center;
    position: relative;
    transition: transform 0.2s ease-out;
    width: 100%;
    height: 100%;
    will-change: transform;
  }
  
  /* Ensure all child elements maintain 3D transforms */
  .card-body :global(*) {
    transform-style: preserve-3d;
  }
</style>