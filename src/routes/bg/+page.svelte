<script>
  import { fly } from 'svelte/transition';
  import BeamsBackground from '$lib/components/ui/Background/BeamsBackground(Animated).svelte';
</script>

<BeamsBackground>
  <div class="flex flex-col items-center justify-center gap-6 px-4 text-center">
    <h1
      in:fly={{ y: 20, duration: 800, delay: 0 }}
      class="text-6xl font-semibold tracking-tighter text-white md:text-7xl lg:text-8xl"
    >
      Beams<br />
      Background
    </h1>
    <p
      in:fly={{ y: 20, duration: 800, delay: 100 }}
      class="text-lg tracking-tighter text-white/70 md:text-2xl lg:text-3xl"
    >
      For your pleasure
    </p>
  </div>
</BeamsBackground>
