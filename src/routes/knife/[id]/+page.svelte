<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Redirect from /knife/[id] to /knives/[id]
  onMount(() => {
    const id = $page.params.id;
    goto(`/knives/${id}`, { replaceState: true });
  });
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-2xl font-bold">Redirecting...</h1>
    <p class="mt-2">Taking you to the knife details page</p>
  </div>
</div>