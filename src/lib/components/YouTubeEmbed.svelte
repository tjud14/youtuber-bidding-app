<script>
  export let youtubeUrl = '';
  let videoId = '';

  $: {
    if (youtubeUrl) {
      // Extract video ID from various YouTube URL formats
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = youtubeUrl.match(regExp);
      videoId = (match && match[7]?.length === 11) ? match[7] : '';
    }
  }
</script>

{#if videoId}
  <div class="youtube-container">
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/{videoId}" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
    ></iframe>
  </div>
{/if}

<style>
  .youtube-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin-bottom: 1rem;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .youtube-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.375rem;
  }
</style>