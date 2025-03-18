<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard-revised.svelte';
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold text-center mb-8">3D Card Z-Scale Test</h1>
  <p class="text-lg text-center mb-16 max-w-2xl mx-auto">
    Minimal test to verify Z-scale functionality
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <!-- Test Card 1: Simple Red Box -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Test Card 1: Basic Z Positioning</h3>
      <div class="h-[400px] perspective-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={2}
          initialScale={1}
          hoverScale={1.05}
          cardStyle="border-radius: 1rem; overflow: hidden; background: #111;"
          class_name="test-card"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background (negative Z) -->
            <div class="absolute inset-0 bg-gray-900" style="transform: {getItemTransform(-50)}"></div>
            
            <!-- Front Box (positive Z) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(50)}">
              <div class="w-40 h-40 bg-red-500 shadow-xl"></div>
            </div>
            
            <!-- Text Label (highest Z) -->
            <div class="absolute inset-0 flex items-end justify-center p-8" style="transform: {getItemTransform(100)}">
              <span class="text-white font-bold">Z = 100px</span>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>

    <!-- Test Card 2: Stacked Layers -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Test Card 2: Stacked Layers</h3>
      <div class="h-[400px] perspective-wrapper">
        <InlineCard
          initialZScale={1}
          hoverZScale={2}
          initialScale={1}
          hoverScale={1.05}
          cardStyle="border-radius: 1rem; overflow: hidden; background: #111;"
          class_name="test-card"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background (most negative Z) -->
            <div class="absolute inset-0 bg-blue-900" style="transform: {getItemTransform(-80)}"></div>
            
            <!-- Middle layer (medium negative Z) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(-40)}">
              <div class="w-64 h-64 bg-blue-700 rounded-xl"></div>
            </div>
            
            <!-- Middle layer (zero Z) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(0)}">
              <div class="w-48 h-48 bg-blue-500 rounded-xl"></div>
            </div>
            
            <!-- Upper middle layer (medium Z) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(40)}">
              <div class="w-32 h-32 bg-blue-300 rounded-xl"></div>
            </div>
            
            <!-- Top layer (highest Z) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(80)}">
              <div class="w-16 h-16 bg-white rounded-xl"></div>
            </div>
            
            <!-- Z indicators -->
            <div class="absolute bottom-6 left-6 text-white text-sm font-mono" style="transform: {getItemTransform(90)}">
              Z-index: -80, -40, 0, 40, 80
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>

  <!-- Z-scale Debug Information -->
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
    <h2 class="text-xl font-bold mb-4">Debug Information</h2>
    <ul class="space-y-2 text-white/90">
      <li>• Using <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">InlineCard-revised.svelte</code></li>
      <li>• initialZScale: 1 (no initial scaling down)</li>
      <li>• hoverZScale: 2 (double on hover)</li>
      <li>• Z values range from -80px to +100px</li>
    </ul>
  </div>
</div>

<style>
  :global(body) {
    background: linear-gradient(to bottom, #111827, #1f2937);
    color: white;
    min-height: 100vh;
  }
  
  .perspective-wrapper {
    perspective: 1500px;
    transform-style: preserve-3d;
  }
  
  .test-card {
    transform-style: preserve-3d !important;
  }
  
  .test-card > :global(*) {
    transform-style: preserve-3d !important;
  }
  
  :global(.inline-card), 
  :global(.inline-card *) {
    transform-style: preserve-3d !important;
  }
</style> 