<!--
    * This component is based on ported React code
    * Original code used under license that allows free use, modification,
    * and distribution with copyright notice requirement.
    * Source: [https://ui.aceternity.com/components/focus-cards]
-->
<script>
    import Card from "./Card.svelte";
    
    export let cards;
    
    let hovered = null;
    
    function handleHoverChange(event) {
      hovered = event.detail;
      console.log("Hover changed to:", hovered); // Debug log
    }
  </script>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
    {#each cards as card, index}
      <Card
        {card}
        {index}
        {hovered}
        on:hoverChange={handleHoverChange} />
    {/each}
  </div>
  