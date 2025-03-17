<!-- CardBody.svelte -->
<script>
    import { getContext } from 'svelte';
    
    // Get the transform state from parent CardContainer
    const transformState = getContext('cardTransform');
    
    // Props
    let className = '';
    export { className as class };
  </script>
  
  {#if $transformState}
    <div 
      class="card-body {className}"
      style="transform: perspective(1000px) rotateX({$transformState.rotateX}deg) rotateY({$transformState.rotateY}deg) scale({$transformState.scale}); transition: transform 0.1s ease-out;"
    >
      <slot />
    </div>
  {/if}
  
  <style>
    .card-body {
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
    }
  </style>