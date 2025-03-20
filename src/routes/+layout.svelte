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
    <div class="w-full min-h-screen">
      <Navbar />
      <slot />
    </div>
  </BeamsBackground>
</NicknameCheckWrapper>

<style>
  /* Add any global styles here if needed */
</style>
