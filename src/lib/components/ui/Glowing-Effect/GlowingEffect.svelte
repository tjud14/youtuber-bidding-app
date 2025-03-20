<script>
    import { onMount, onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { cn } from '$lib/utils/utils';
    
    // Props with default values
    export let blur = 0;
    export let inactiveZone = 0.7;
    export let proximity = 0;
    export let spread = 20;
    export let variant = "default";
    export let glow = false;
    export let className = "";
    export let movementDuration = 2;
    export let borderWidth = 1;
    export let disabled = true;
    
    // Equivalent to useRef in React
    let containerEl;
    let lastPosition = { x: 0, y: 0 };
    let animationFrameId = null;
    
    // Tweened value for angle animation (equivalent to motion/react animate)
    const currentAngle = tweened(0, {
      duration: movementDuration * 1000, 
      easing: cubicOut
    });
  
    // Handle mouse movement (equivalent to useCallback in React)
    function handleMove(e) {
      if (!containerEl) return;
  
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
  
      animationFrameId = requestAnimationFrame(() => {
        if (!containerEl) return;
  
        const { left, top, width, height } = containerEl.getBoundingClientRect();
        const mouseX = e?.x ?? lastPosition.x;
        const mouseY = e?.y ?? lastPosition.y;
  
        if (e) {
          lastPosition = { x: mouseX, y: mouseY };
        }
  
        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(
          mouseX - center[0],
          mouseY - center[1]
        );
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;
  
        if (distanceFromCenter < inactiveRadius) {
          containerEl.style.setProperty("--active", "0");
          return;
        }
  
        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;
  
        containerEl.style.setProperty("--active", isActive ? "1" : "0");
  
        if (!isActive) return;
  
        let targetAngle =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
            Math.PI +
          90;
  
        const current = $currentAngle;
        const angleDiff = ((targetAngle - current + 180) % 360) - 180;
        const newAngle = current + angleDiff;
  
        currentAngle.set(newAngle);
      });
    }
  
    // Set up event listeners (equivalent to useEffect in React)
    onMount(() => {
      if (disabled) return;
  
      const handleScroll = () => handleMove();
      const handlePointerMove = (e) => handleMove(e);
  
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
  
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    });
  
    // Clean up on component destroy
    onDestroy(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  
    // Watch for currentAngle changes and update CSS property
    $: containerEl && containerEl.style.setProperty("--start", String($currentAngle));
  
    // Generate gradient based on variant
    $: gradient = variant === "white"
      ? `repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          var(--black),
          var(--black) calc(25% / var(--repeating-conic-gradient-times))
        )`
      : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
         radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
         radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
         radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
         repeating-conic-gradient(
           from 236.84deg at 50% 50%,
           #dd7bbb 0%,
           #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
           #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
           #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
           #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
         )`;
  </script>
  
  <div
    class={cn(
      "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
      glow && "opacity-100",
      variant === "white" && "border-white",
      disabled && "!block"
    )}
  ></div>
  
  <div
    bind:this={containerEl}
    style="--blur: {blur}px; 
           --spread: {spread}; 
           --start: 0; 
           --active: 0; 
           --glowingeffect-border-width: {borderWidth}px; 
           --repeating-conic-gradient-times: 5; 
           --gradient: {gradient};"
    class={cn(
      "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
      glow && "opacity-100",
      blur > 0 && "blur-[var(--blur)] ",
      className,
      disabled && "!hidden"
    )}
  >
    <div
      class={cn(
        "glow",
        "rounded-[inherit]",
        'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
        "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
        "after:[background:var(--gradient)] after:[background-attachment:fixed]",
        "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
        "after:[mask-clip:padding-box,border-box]",
        "after:[mask-composite:intersect]",
        "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
      )}
    ></div>
  </div>