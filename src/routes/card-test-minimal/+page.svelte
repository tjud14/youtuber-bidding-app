<script>
  import InlineCard from '$lib/components/ui/3d-card/InlineCard-minimal.svelte';
</script>

<div class="container mx-auto p-6">
  <h1 class="text-3xl font-bold text-center mb-8">Minimal 3D Card Test</h1>
  <p class="text-center mb-8">
    Using absolute minimal card component with direct Z transformations
  </p>

  <div class="w-full max-w-xl mx-auto h-[400px]">
    <InlineCard>
      <svelte:fragment slot="default" let:getItemTransform>
        <!-- Background (z = -100) -->
        <div class="absolute inset-0 bg-gray-900 rounded-xl" style="transform: {getItemTransform(-100)}"></div>
        
        <!-- Large text at back (z = -50) -->
        <div class="absolute inset-0 flex items-center justify-center opacity-20" style="transform: {getItemTransform(-50)}">
          <span class="text-9xl font-bold text-white">3D</span>
        </div>
        
        <!-- Middle square (z = 0) -->
        <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(0)}">
          <div class="w-64 h-64 bg-indigo-600 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold">Z = 0</span>
          </div>
        </div>
        
        <!-- Smaller square (z = 50) -->
        <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(50)}">
          <div class="w-32 h-32 bg-pink-500 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold">Z = 50</span>
          </div>
        </div>
        
        <!-- Smallest square (z = 100) -->
        <div class="absolute inset-0 flex items-center justify-center" style="transform: {getItemTransform(100)}">
          <div class="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
            <span class="text-white font-bold">Z = 100</span>
          </div>
        </div>
        
        <!-- Floating label (z = 150) -->
        <div class="absolute bottom-8 inset-x-0 flex justify-center" style="transform: {getItemTransform(150)}">
          <span class="bg-white text-gray-900 px-4 py-2 rounded-full font-bold shadow-xl">
            Z = 150px
          </span>
        </div>
      </svelte:fragment>
    </InlineCard>
  </div>
  
  <div class="mt-16 bg-gray-800 p-6 rounded-lg max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Important Debug Notes</h2>
    <ul class="list-disc pl-6 space-y-2">
      <li>This test uses a completely minimal implementation</li>
      <li>Z values are direct pixel values (-100px to 150px)</li>
      <li>Each colored box is at a different Z position</li>
      <li>If you can't see depth when hovering, check browser settings</li>
      <li>Try testing in Chrome, Firefox and Safari</li>
    </ul>
  </div>
</div>

<style>
  :global(body) {
    background: linear-gradient(to bottom, #111827, #1f2937);
    color: white;
    min-height: 100vh;
  }
</style> 