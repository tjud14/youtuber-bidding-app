<!--
    * This component is based on ported React code
    * Original code used under license that allows free use, modification,
    * and distribution with copyright notice requirement.
    * Source: [https://21st.dev/kokonutd/beams-background/default
    * Author: Kokonut UI
-->
<script>
    import { onMount, onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicInOut } from 'svelte/easing';
    import { cn } from '$lib/utils/utils';
  
    export let className = "";
    export let intensity = "strong"; // "subtle" | "medium" | "strong"
  
    // Canvas references
    let canvas;
    let beams = [];
    let animationFrame;
    const MINIMUM_BEAMS = 20;
  
    const opacityMap = {
      subtle: 0.7,
      medium: 0.85,
      strong: 1,
    };
  
    // Create the pulsing background effect
    const opacity = tweened(0.05, {
      duration: 10000,
      easing: cubicInOut
    });
  
    function updateOpacity() {
      opacity.set(0.15).then(() => {
        opacity.set(0.05).then(updateOpacity);
      });
    }
  
    // Function to create a new beam
    function createBeam(width, height) {
      const angle = -35 + Math.random() * 10;
      return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }
  
    // Function to reset a beam when it goes off-screen
    function resetBeam(beam, index, totalBeams) {
      if (!canvas) return beam;
      
      const column = index % 3;
      const spacing = canvas.width / 3;
  
      beam.y = canvas.height + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 190 + (index * 70) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }
  
    // Function to draw a beam on the canvas
    function drawBeam(ctx, beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);
  
      // Calculate pulsing opacity
      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];
  
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
  
      // Enhanced gradient with multiple color stops
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);
  
      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }
  
    // Animation function
    function animate() {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";
  
      const totalBeams = beams.length;
      beams.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
  
        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }
  
        drawBeam(ctx, beam);
      });
  
      animationFrame = requestAnimationFrame(animate);
    }
  
    onMount(() => {
      if (!canvas) return;
  
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      // Update canvas size and create beams
      const updateCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        canvas.width = viewportWidth * dpr;
        canvas.height = viewportHeight * dpr;
        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${viewportHeight}px`;
        ctx.scale(dpr, dpr);
  
        // Adjust beams for the new dimensions
        const totalBeams = MINIMUM_BEAMS * 1.5;
        beams = Array.from({ length: totalBeams }, () =>
          createBeam(viewportWidth, viewportHeight)
        );
      };
  
      updateCanvasSize();
      
      // Handle window resize and scroll events
      window.addEventListener('resize', updateCanvasSize);
      
      // Start animations
      animate();
      updateOpacity();
  
      return () => {
        window.removeEventListener('resize', updateCanvasSize);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    });
  
    onDestroy(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    });
  </script>
  
  <div class={cn("relative w-full overflow-x-hidden bg-neutral-950", className)}>
    <canvas 
      bind:this={canvas} 
      class="fixed inset-0 w-full h-full" 
      style="filter: blur(15px);"
    ></canvas>
  
    <div 
      class="fixed inset-0 w-full h-full bg-neutral-950/5"
      style="backdrop-filter: blur(50px); opacity: {$opacity};"
    ></div>
  
    <div class="relative z-10 w-full">
      <slot></slot>
    </div>
  </div>