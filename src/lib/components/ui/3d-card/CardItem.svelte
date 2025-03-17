<!-- CardItem.svelte -->
<script>
    // Props
    export let translateZ = 0;
    export let as = 'div';
    let className = '';
    export { className as class };
    
    // Forward any additional props to the component
    const restProps = $$restProps;
  </script>
  
  {#if as === 'p'}
    <p 
      class="card-item {className}" 
      style="transform: translateZ({translateZ}px);"
      {...restProps}
    >
      <slot />
    </p>
  {:else if as === 'a'}
    <a 
      class="card-item {className}" 
      style="transform: translateZ({translateZ}px);"
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
      style="transform: translateZ({translateZ}px);"
      type={restProps.type || 'button'}
      {...restProps}
    >
      <slot />
    </button>
  {:else if as === 'img'}
    <img 
      class="card-item {className}" 
      style="transform: translateZ({translateZ}px);"
      src={restProps.src || ''}
      alt={restProps.alt || ''}
      {...restProps}
    />
  {:else}
    <div 
      class="card-item {className}" 
      style="transform: translateZ({translateZ}px);"
      {...restProps}
    >
      <slot />
    </div>
  {/if}
  
  <style>
    .card-item {
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
    }
  </style>