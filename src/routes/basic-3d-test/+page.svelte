<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold text-center mb-8">Basic 3D Transform Test</h1>
  <p class="text-center mb-16">
    Testing basic CSS 3D transforms without any components
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Test 1: Simple translateZ -->
    <div>
      <h2 class="text-xl font-bold mb-4">Test 1: Basic translateZ</h2>
      <div class="scene">
        <div class="card">
          <div class="card-face">Front (Z=0)</div>
          <div class="card-face card-face-back">Back (Z=-100px)</div>
        </div>
      </div>
      <p class="mt-4">Hover over the card to see rotation</p>
    </div>

    <!-- Test 2: Stacked layers with Z -->
    <div>
      <h2 class="text-xl font-bold mb-4">Test 2: Multiple Z Layers</h2>
      <div class="z-stack-scene">
        <div class="z-stack">
          <div class="z-layer" style="--z: -100; --bg: rgba(59, 130, 246, 0.5);">Z = -100px</div>
          <div class="z-layer" style="--z: -50; --bg: rgba(99, 102, 241, 0.6);">Z = -50px</div>
          <div class="z-layer" style="--z: 0; --bg: rgba(139, 92, 246, 0.7);">Z = 0px</div>
          <div class="z-layer" style="--z: 50; --bg: rgba(236, 72, 153, 0.8);">Z = 50px</div>
          <div class="z-layer" style="--z: 100; --bg: rgba(249, 115, 22, 0.9);">Z = 100px</div>
        </div>
      </div>
      <p class="mt-4">Hover and move mouse over the stack to see 3D effect</p>
    </div>
  </div>

  <!-- Manual Debug Controls -->
  <div class="mt-16 bg-gray-800 rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Browser 3D Capability Check</h2>
    <p class="mb-4">
      If you're seeing the 3D effects above, your browser supports 3D transformations. If not, there might be issues with:
    </p>
    <ul class="list-disc ml-6 space-y-2">
      <li>Hardware acceleration being disabled</li>
      <li>CSS 3D transforms not being supported</li>
      <li>Conflicts with other CSS in your application</li>
    </ul>
  </div>
</div>

<style>
  :global(body) {
    background: linear-gradient(to bottom, #111827, #1f2937);
    color: white;
    min-height: 100vh;
  }

  /* Test 1: Basic card flip */
  .scene {
    width: 300px;
    height: 200px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }

  .scene:hover .card {
    transform: rotateY(180deg);
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 0.5rem;
  }

  .card-face {
    background-color: rgba(59, 130, 246, 0.8);
  }

  .card-face-back {
    background-color: rgba(236, 72, 153, 0.8);
    transform: rotateY(180deg);
  }

  /* Test 2: Z-stack with layers */
  .z-stack-scene {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .z-stack {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.1s;
  }

  .z-stack-scene:hover .z-stack {
    transition: transform 0.05s;
  }

  .z-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg);
    transform: translateZ(calc(var(--z) * 1px));
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    font-weight: bold;
    font-size: 18px;
  }

  /* Event listeners for rotating the z-stack */
  .z-stack-scene {
    position: relative;
  }

  .z-stack-scene:hover .z-stack {
    transform: rotateX(calc(var(--rotateX) * 1deg)) rotateY(calc(var(--rotateY) * 1deg));
  }
</style>

<script>
  import { onMount } from 'svelte';

  onMount(() => {
    const scene = document.querySelector('.z-stack-scene');
    const stack = document.querySelector('.z-stack');
    
    if (scene && stack) {
      scene.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate rotation (max 20 degrees)
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 20;
        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -20;
        
        // Apply rotation
        stack.style.setProperty('--rotateX', rotateX);
        stack.style.setProperty('--rotateY', rotateY);
      });
    }
  });
</script> 