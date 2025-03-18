<script>
  import InlineCard from '$lib/components/ui/3d-card/hybridcards/InlineCardHybrid.svelte';
</script>

<div class="container mx-auto py-16 px-4">
  <h1 class="text-3xl font-bold text-center mb-8">Minimal 3D Card Test</h1>
  <p class="text-center mb-12 max-w-2xl mx-auto">This is a simplified test to verify if z-transformations work properly.</p>

  <div class="grid place-items-center">
    <div class="h-[400px] w-[300px]">
      <InlineCard
        zBehavior="hybrid"
        hoverZScale={2}
        initialScale={1}
        hoverScale={1.05}
        cardStyle="border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);"
      >
        <svelte:fragment slot="default" let:getItemTransform>
          <!-- Base layer (deepest) -->
          <div 
            class="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-700" 
            style="transform: {getItemTransform(-50)}"
          ></div>
          
          <!-- Middle layer -->
          <div 
            class="absolute inset-0 rounded-xl flex items-center justify-center" 
            style="transform: {getItemTransform(0)}"
          >
            <div class="bg-black/20 backdrop-blur-sm h-40 w-40 rounded-full flex items-center justify-center">
              <span class="text-lg font-bold text-white">Middle (z=0)</span>
            </div>
          </div>
          
          <!-- Front layer -->
          <div 
            class="absolute top-10 left-0 right-0 flex justify-center"
            style="transform: {getItemTransform(50)}"
          >
            <div class="bg-white px-6 py-3 rounded-full shadow-xl">
              <span class="text-lg font-bold text-purple-700">Front (z=50)</span>
            </div>
          </div>
          
          <!-- Foremost layer -->
          <div 
            class="absolute bottom-10 left-0 right-0 flex justify-center"
            style="transform: {getItemTransform(100)}"
          >
            <button class="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-xl">
              Top (z=100)
            </button>
          </div>
        </svelte:fragment>
      </InlineCard>
    </div>
  </div>

  <!-- Debug info -->
  <div class="mt-12 text-center text-sm text-white/60">
    <p>Try another approach:</p>
    <ul class="mt-2 space-y-1">
      <li>
        <a href="/testcard2" class="underline">Test with explicit 3D scene mode</a>
      </li>
    </ul>
  </div>
</div>

<style>
  :global(body) {
    background-color: #0f172a;
    color: white;
  }
</style> 