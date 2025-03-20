<script>
  // Props for the component
  export let src = '';
  export let webpSrc = '';
  export let width = 0;
  export let height = 0;
  export let alt = '';
  export let className = '';
  export let objectFit = 'cover';
  export let fallbackSrc = '/placeholder.jpg';
  export let fillContainer = false; // New prop for card layouts
  
  // Calculate aspect ratio
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;
  
  function handleError(e) {
    e.currentTarget.src = fallbackSrc;
  }
</script>

<picture class={fillContainer ? "w-full h-full" : ""}>
  {#if webpSrc}
    <source srcset={webpSrc} type="image/webp" />
  {/if}
  <img
    src={src}
    {alt}
    class={`${className} ${fillContainer ? "w-full h-full" : ""}`}
    loading="lazy"
    width={width || null}
    height={height || null}
    style={fillContainer 
      ? `object-fit: ${objectFit}; position: ${fillContainer ? 'absolute' : 'relative'}; inset: 0;` 
      : aspectRatio ? `aspect-ratio: ${aspectRatio}; object-fit: ${objectFit};` : ''}
    on:error={handleError}
  />
</picture>

<style>
  img {
    display: block;
    max-width: 100%;
  }
  
  picture.w-full, picture.h-full {
    position: relative;
    display: block;
  }
</style>