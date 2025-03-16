<script>
  // Props for the component
  export let src = ''; // Original image URL (fallback)
  export let webpSrc = ''; // WebP image URL
  export let width = 0; // Image width in pixels
  export let height = 0; // Image height in pixels
  export let alt = ''; // Alt text for accessibility
  export let className = ''; // Optional CSS class
  export let objectFit = 'cover'; // CSS object-fit property
  export let fallbackSrc = '/placeholder.jpg'; // Fallback image if src fails to load

  // Calculate aspect ratio for use with object-fit
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  // Handle image loading errors
  function handleError(e) {
    e.currentTarget.src = fallbackSrc;
  }
</script>

<picture>
  <!-- WebP version for browsers that support it -->
  {#if webpSrc}
    <source srcset={webpSrc} type="image/webp" />
  {/if}
  
  <!-- Original image as fallback -->
  <img
    src={src}
    {alt}
    class={className}
    loading="lazy"
    width={width || null}
    height={height || null}
    style={aspectRatio ? `aspect-ratio: ${aspectRatio}; object-fit: ${objectFit};` : ''}
    on:error={handleError}
  />
</picture>

<style>
  img {
    display: block;
    max-width: 100%;
  }
</style> 