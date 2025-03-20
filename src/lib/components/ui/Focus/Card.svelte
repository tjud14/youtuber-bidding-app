<!--
    * This component is based on ported React code
    * Original code used under license that allows free use, modification,
    * and distribution with copyright notice requirement.
    * Source: [https://ui.aceternity.com/components/focus-cards]
-->
<script>
    // Fix the import path - use the $lib alias to import from your utils
    import { cn } from "$lib/utils/utils";
    
    export let card;
    export let index;
    export let hovered;
    
    // Use Svelte's createEventDispatcher instead of custom events
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    function handleMouseEnter() {
      dispatch('hoverChange', index);
    }
    
    function handleMouseLeave() {
      dispatch('hoverChange', null);
    }
  </script>
  
  <div
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="button" 
    tabindex="0"
    class={cn(
      "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
    )}>
    <img
      src={card.src}
      alt={card.title}
      class="object-cover absolute inset-0 w-full h-full" />
    <div
      class={cn(
        "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-0"
      )}>
      <div
        class="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
        {card.title}
      </div>
    </div>
  </div>