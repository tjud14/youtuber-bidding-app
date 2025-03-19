<script>
    import { cn } from "$lib/utils/utils.js";
    
    export let card;
    export let index;
    export let hovered;
    
    function handleMouseEnter() {
      dispatchEvent(new CustomEvent('hoverChange', { 
        detail: index,
        bubbles: true 
      }));
    }
    
    function handleMouseLeave() {
      dispatchEvent(new CustomEvent('hoverChange', { 
        detail: null,
        bubbles: true 
      }));
    }
  </script>
  
  <div
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
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