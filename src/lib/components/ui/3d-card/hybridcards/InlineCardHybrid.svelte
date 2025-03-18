<script>
    import { onMount } from 'svelte';
   // Props
   export let class_name = '';
   export let cardStyle = '';
   export let zBehavior = 'hybrid'; // 'flat', 'hybrid', or 'subtle'
   export let hoverZScale = 1.8; // How much to amplify Z on hover
   export let initialScale = 1; // Initial card scale
   export let hoverScale = 1.05; // Card scale on hover
   
   // Card state
   let isHovering = false;
   let rotateX = 0;
   let rotateY = 0;
   let scale = initialScale;
   let container;
   
   // Handler functions
   function handleMouseMove(e) {
     if (!container) return;
     const rect = container.getBoundingClientRect();
     const centerX = rect.left + rect.width / 2;
     const centerY = rect.top + rect.height / 2;
     
     // Calculate rotation based on mouse position
     rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
     rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
     
     // Update state
     isHovering = true;
     scale = hoverScale;
   }
   
   function handleMouseEnter() {
     isHovering = true;
     scale = hoverScale;
   }
   
   function handleMouseLeave() {
     isHovering = false;
     rotateX = 0;
     rotateY = 0;
     scale = initialScale;
   }
   
   // Reactive transform declarations
   $: cardTransform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
   
   // Helper function to calculate z-transforms for child elements
   function getItemTransform(z, additionalTransform = '') {
     let zAmount;
     
     if (zBehavior === 'flat') {
       // Only apply Z transforms on hover (Aceternity UI style)
       zAmount = isHovering ? z : 0;
     } 
     else if (zBehavior === 'hybrid') {
       // Background elements (negative Z) maintain depth
       // Foreground elements (positive Z) have initial depth and enhanced on hover
       if (z < 0) {
         zAmount = isHovering ? z * hoverZScale : z;
       } else {
         zAmount = isHovering ? z * hoverZScale : z * 0.4; // Keep 40% of z-depth when not hovering
       }
     }
     else if (zBehavior === 'subtle') {
       // Background elements maintain full depth
       // Foreground elements have subtle depth (20%) at rest
       if (z < 0) {
         zAmount = isHovering ? z * hoverZScale : z;
       } else {
         zAmount = isHovering ? z : z * 0.2;
       }
     }
     else {
       // Default behavior - original implementation
       zAmount = isHovering ? z * hoverZScale : z;
     }
     
     // Use translate3d instead of translateZ for better browser support
     return `translate3d(0, 0, ${zAmount}px) ${additionalTransform}`.trim();
   }
   </script>
   
   <div class="inline-card-wrapper {class_name}">
     <div
       bind:this={container}
       on:mouseenter={handleMouseEnter}
       on:mousemove={handleMouseMove}
       on:mouseleave={handleMouseLeave}
       class="inline-card"
       style="transform: {cardTransform}; {cardStyle}"
     >
       <slot {getItemTransform} />
     </div>
   </div>
   
   <style>
     .inline-card-wrapper {
       perspective: 1500px;
       display: flex;
       justify-content: center;
       align-items: center;
       width: 100%;
       height: 100%;
     }
     
     .inline-card {
       position: relative;
       width: 100%;
       height: 100%;
       transform-style: preserve-3d;
       transition: transform 0.2s ease-out;
       will-change: transform;
     }
     
     /* Critical: ensure all descendants maintain 3D context */
     .inline-card :global(*) {
       transform-style: preserve-3d;
       backface-visibility: visible;
     }
     
     /* Force direct children to have their own stacking context */
     .inline-card :global(> *) {
       transform-style: preserve-3d;
       transition: transform 0.2s ease-out;
     }
   </style>