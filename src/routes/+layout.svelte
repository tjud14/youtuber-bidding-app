<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import NicknameCheckWrapper from '$lib/components/NicknameCheckWrapper.svelte';
  import BeamsBackground from '$lib/components/ui/Background/BeamsBackground(Animated).svelte';
  import { isAuthenticated } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import '../app.css';

  onMount(async () => {
    // Check authentication status when component mounts
    await isAuthenticated.check();
  });
</script>


<NicknameCheckWrapper currentPath={$page.url.pathname}>
  <BeamsBackground intensity="medium">
    <div class="flex flex-col min-h-screen w-full">
      <Navbar />
      <main class="flex-grow w-full">
        <slot />
      </main>
    </div>
  </BeamsBackground>
</NicknameCheckWrapper>

<style>
  /* Make sure body and html allow scrolling */
  :global(html, body) {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
