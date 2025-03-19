<script>
    import Card from "./Card.svelte";
    
    export let cards;
    
    let hovered = null;
    
    function handleHoverChange(event) {
      hovered = event.detail;
    }
  </script>
  
  <div 
    on:hoverChange={handleHoverChange}
    class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
    {#each cards as card, index}
      <Card
        {card}
        {index}
        {hovered} />
    {/each}
  </div>
  