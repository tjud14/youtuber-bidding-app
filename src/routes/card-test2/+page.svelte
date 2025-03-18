<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard-test.svelte';
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold text-center mb-8">3D Card Direct Z-Scale Test</h1>
  <p class="text-lg text-center mb-16 max-w-2xl mx-auto">
    Testing with simplified InlineCard-test component (no scaling factors)
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <!-- Test Card 1: Simple Colored Layers -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Test 1: Direct Z Values</h3>
      <div class="h-[400px] perspective-wrapper">
        <InlineCard
          cardStyle="border-radius: 1rem; overflow: hidden; background: #111;"
          class_name="test-card"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background layer (z = -50) -->
            <div class="absolute inset-0 bg-purple-900" style="transform: {getItemTransform(-50)}"></div>
            
            <!-- Middle layer (z = 0) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(0)}">
              <div class="w-64 h-64 bg-purple-700 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold">Z = 0</span>
              </div>
            </div>
            
            <!-- Front layer (z = 50) -->
            <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(50)}">
              <div class="w-32 h-32 bg-purple-500 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold">Z = 50px</span>
              </div>
            </div>
            
            <!-- Floating text (z = 100) -->
            <div class="absolute top-8 left-0 right-0 text-center" style="transform: {getItemTransform(100)}">
              <span class="bg-white text-purple-900 px-4 py-2 rounded-full font-bold shadow-xl">Z = 100px</span>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>

    <!-- Test Card 2: 3D Buttons -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Test 2: Interactive Elements</h3>
      <div class="h-[400px] perspective-wrapper">
        <InlineCard
          cardStyle="border-radius: 1rem; overflow: hidden; background: linear-gradient(to bottom, #0f172a, #1e293b);"
          class_name="test-card"
        >
          <svelte:fragment slot="default" let:getItemTransform>
            <!-- Background patterns (z = -60) -->
            <div class="absolute inset-0 opacity-30" style="transform: {getItemTransform(-60)}">
              <div class="w-full h-full" style="background-image: radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
            </div>
            
            <!-- Card Title (z = 40) -->
            <div class="absolute top-8 inset-x-0 text-center" style="transform: {getItemTransform(40)}">
              <h2 class="text-2xl font-bold text-white">3D Button Test</h2>
            </div>
            
            <!-- Buttons with different Z values -->
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <!-- Button 1 (z = 20) -->
              <div style="transform: {getItemTransform(20)}">
                <button class="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium shadow-xl">
                  Z = 20px
                </button>
              </div>
              
              <!-- Button 2 (z = 60) -->
              <div style="transform: {getItemTransform(60)}">
                <button class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium shadow-xl">
                  Z = 60px
                </button>
              </div>
              
              <!-- Button 3 (z = 100) -->
              <div style="transform: {getItemTransform(100)}">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow-xl">
                  Z = 100px
                </button>
              </div>
            </div>
          </svelte:fragment>
        </InlineCard>
      </div>
    </div>
  </div>
  
  <!-- Information -->
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Implementation Notes</h2>
    <ul class="space-y-2 text-white/90">
      <li>• This page uses <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">InlineCard-test.svelte</code> - a simplified version</li>
      <li>• Z values are applied directly without scaling factors</li>
      <li>• On hover, Z values are doubled but otherwise unmodified</li>
      <li>• Added <code class="bg-black/20 px-1.5 py-0.5 rounded text-sm">position: relative</code> to the container</li>
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
  
  /* Ensuring all elements maintain 3D context */
  :global(.inline-card),
  :global(.inline-card *) {
    transform-style: preserve-3d !important;
  }
</style> 