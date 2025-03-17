<!-- CardItem.svelte -->
<script>
    import { getContext } from 'svelte';
    
    // Props
    export let translateZ = 0;
    export let translateX = 0;
    export let translateY = 0;
    export let rotateX = 0;
    export let rotateY = 0;
    export let rotateZ = 0;
    export let as = 'div';
    let className = '';
    export { className as class };
    
    // Get mouse state from context
    const mouseState = getContext('cardTransform');
    
    // Compute enhanced transform when hovered
    $: enhancedZ = $mouseState?.isEntered ? translateZ * 1.7 : translateZ;
    $: itemTransform = `
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        translateZ(${enhancedZ}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        rotateZ(${rotateZ}deg)
    `;
    
    // Forward any additional props to the component
    const restProps = $$restProps;
</script>
  
{#if as === 'p'}
  <p 
    class="card-item {className}" 
    style="transform: {itemTransform}"
    {...restProps}
  >
    <slot />
  </p>
{:else if as === 'a'}
  <a 
    class="card-item {className}" 
    style="transform: {itemTransform}"
    href={restProps.href || '#'}
    target={restProps.target || '_self'}
    rel={restProps.rel || ''}
    {...restProps}
  >
    <slot />
  </a>
{:else if as === 'button'}
  <button 
    class="card-item {className}" 
    style="transform: {itemTransform}"
    type={restProps.type || 'button'}
    {...restProps}
  >
    <slot />
  </button>
{:else if as === 'img'}
  <img 
    class="card-item {className}" 
    style="transform: {itemTransform}"
    src={restProps.src || ''}
    alt={restProps.alt || ''}
    {...restProps}
  />
{:else}
  <div 
    class="card-item {className}" 
    style="transform: {itemTransform}"
    {...restProps}
  >
    <slot />
  </div>
{/if}
  
<style>
  .card-item {
    transform-style: preserve-3d;
    transition: transform 0.2s ease-out;
    will-change: transform;
  }
</style>