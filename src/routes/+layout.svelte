<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import NicknameCheckWrapper from '$lib/components/NicknameCheckWrapper.svelte';
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
  <div class="alaska-bg">
    <Navbar />
    <slot />
  </div>
</NicknameCheckWrapper>
