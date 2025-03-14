<script>
    import { isAuthenticated, hasSetNickname } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fetchApi } from '$lib/utils/api';
    import NicknamePrompt from '$lib/components/NicknamePrompt.svelte';
    
    export let currentPath = '';
    let showPrompt = false;
    let user = null;
    
    // Function to force close the prompt
    function closePrompt() {
      console.log('Force closing nickname prompt');
      showPrompt = false;
      hasSetNickname.set(true);
    }
    
    // Reactively hide the prompt when hasSetNickname becomes true
    $: if ($hasSetNickname && showPrompt) {
      console.log('Nickname has been set, hiding prompt from wrapper');
      showPrompt = false;
    }
    
    onMount(async () => {
      // Make sure authentication is checked first
      await isAuthenticated.check();
      
      if ($isAuthenticated && !$hasSetNickname) {
        // Only show for authenticated users without nicknames
        console.log('User needs to set nickname');
        
        // Don't show on nickname setting page to avoid loops
        if (!currentPath.includes('/set-nickname')) {
          try {
            // Load user data for the prompt
            const userData = await fetchApi('users/me/');
            user = userData;
            
            // Double check if user has a nickname
            if (!userData.nickname) {
              console.log('Confirming user has no nickname, showing prompt');
              showPrompt = true;
            } else {
              // Update the store if the backend says user has a nickname
              hasSetNickname.set(true);
            }
          } catch (e) {
            console.error('Failed to load user data in NicknameCheckWrapper:', e);
          }
        }
      }
    });
</script>
  
<slot></slot>
  
{#if showPrompt && user}
  <NicknamePrompt show={true} {user} onClose={closePrompt} />
{/if}