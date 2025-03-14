<script>
    import { fetchApi } from '$lib/utils/api';
    import { goto } from '$app/navigation';
    import { isAuthenticated } from '$lib/stores/auth';
  
    let email = '';
    let password = '';
    let error = '';
    let isLoading = false;
  
    // Add the missing handleKeydown function
    function handleKeydown(event) {
      if (event.key === 'Enter' && !isLoading) {
        handleLogin();
      }
    }
  
    async function handleLogin() {
      if (!email || !password) {
        error = 'Please enter both email and password';
        return;
      }
  
      error = '';
      isLoading = true;
  
      try {
        const response = await fetchApi('login/', {
          method: 'POST',
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        });
        
        // Check if user is staff
        if (!response.user.is_staff) {
          error = 'You do not have admin access';
          $isAuthenticated = false;
          return;
        }
  
        $isAuthenticated = true;
        goto('/admin');
      } catch (e) {
        error = e.message || 'Login failed';
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
      <h1 class="mb-6 text-center text-2xl font-bold text-gray-900">Admin Login</h1>
  
      <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div class="space-y-4">
          <div>
            <label for="email" class="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email" 
              bind:value={email}
              on:keydown={handleKeydown}
              placeholder="Enter your email"
              class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              disabled={isLoading}
              autocomplete="email"
            />
          </div>
  
          <div>
            <label for="password" class="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              bind:value={password}
              on:keydown={handleKeydown}
              placeholder="Enter your password"
              class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              disabled={isLoading}
              autocomplete="current-password"
            />
          </div>
        </div>
  
        {#if error}
          <div class="rounded-r border-l-4 border-red-500 bg-red-50 p-4">
            <p class="text-sm text-red-700">{error}</p>
          </div>
        {/if}
  
        <button
          type="submit"
          class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Admin Login'}
        </button>
      </form>
    </div>
  </div>