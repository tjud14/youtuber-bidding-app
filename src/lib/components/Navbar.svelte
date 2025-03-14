<script>
  import { page } from '$app/stores';
  import { isAuthenticated } from '$lib/stores/auth';
  import { fetchApi } from '$lib/utils/api';
  import { onMount } from 'svelte';
  import { unreadCount, loadConversations } from '$lib/stores/messaging';

  $: activeRoute = $page.url.pathname;
  $: isAdmin = false;

  let user = null;
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  onMount(async () => {
    // Check authentication status when component mounts
    await isAuthenticated.check();
    
    // If authenticated, fetch user data
    if ($isAuthenticated) {
      try {
        user = await fetchApi('users/me/');
        isAdmin = user.is_staff;
        console.log("Fetched user email:", user.email);
        
        // Load unread message count if user is authenticated
        await loadConversations();
      } catch (e) {
        console.error('Error fetching user data:', e);
      }
    }
  });

  async function handleLogout() {
    try {
      await isAuthenticated.logout();
      window.location.href = '/';
    } catch (e) {
      console.error('Logout failed:', e);
    }
  }
</script>

<header class="fixed top-0 z-50 w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-xl">
  <div class="container mx-auto px-4">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2">
        <span class="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-700 flex items-center justify-center text-white text-lg font-bold shadow-lg transition-transform hover:scale-110">A</span>
        <span class="text-lg font-semibold tracking-tight text-white">Betting on Alaska Auctions</span>
      </a>

      <!-- Desktop Menu -->
      <nav class="hidden lg:flex items-center space-x-2">
        <a
          href="/"
          class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}"
        >
          <span class="flex items-center text-sm font-medium group-hover:text-amber-300">
            Auctions
          </span>
          {#if activeRoute === '/'}
            <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
          {/if}
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>

        <a
          href="/knives"
          class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/knives' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}"
        >
          <span class="flex items-center text-sm font-medium group-hover:text-amber-300">
            Knives
          </span>
          {#if activeRoute === '/knives'}
            <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
          {/if}
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>

        <a
          href="/paintings"
          class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/paintings' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}"
        >
          <span class="flex items-center text-sm font-medium group-hover:text-amber-300">
            Art
          </span>
          {#if activeRoute === '/paintings'}
            <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
          {/if}
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>

        <a
          href="/misc"
          class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/misc' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}"
        >
          <span class="flex items-center text-sm font-medium group-hover:text-amber-300">
            Misc
          </span>
          {#if activeRoute === '/misc'}
            <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
          {/if}
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>

        <a href="/about" class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/about' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}">
          <span class="flex items-center text-sm font-medium group-hover:text-amber-300">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            About
          </span>
          {#if activeRoute === '/about'}
            <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
          {/if}
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>

        <a href="/contact" class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/contact' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}">
          <span class="flex items-center text-sm font-medium group-hover:text-amber-300">
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Contact
          </span>
          {#if activeRoute === '/contact'}
            <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
          {/if}
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>

        <!-- Support Chat Link -->
        {#if $isAuthenticated && !isAdmin}
          <a 
            href="/support" 
            class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/support' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}"
          >
            <span class="flex items-center text-sm font-medium group-hover:text-amber-300 relative">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Support
              {#if $unreadCount > 0}
                <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {$unreadCount}
                </span>
              {/if}
            </span>
            {#if activeRoute === '/support'}
              <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
            {/if}
            <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </a>
        {:else if $isAuthenticated && isAdmin}
          <a 
            href="/admin/chats" 
            class="group relative px-3 py-2 rounded-md transition-all duration-200 {activeRoute === '/admin/chats' ? 'bg-gray-700 text-amber-400' : 'text-gray-200'}"
          >
            <span class="flex items-center text-sm font-medium group-hover:text-amber-300 relative">
              <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Support Chats
              {#if $unreadCount > 0}
                <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {$unreadCount}
                </span>
              {/if}
            </span>
            {#if activeRoute === '/admin/chats'}
              <span class="absolute bottom-1 left-1/2 h-0.5 w-3/4 bg-amber-400 transform -translate-x-1/2 transition-all duration-300"></span>
            {/if}
            <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </a>
        {/if}

        <a href="https://www.youtube.com/@MickWhipple" target="_blank" rel="noopener noreferrer" class="group relative px-3 py-2 rounded-md transition-all duration-200 text-gray-200">
          <span class="flex items-center text-sm font-medium group-hover:text-red-400">
            <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            YouTube
          </span>
          <span class="absolute inset-0 rounded-md bg-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
        </a>
      </nav>

      <!-- Auth Buttons -->
      <div class="hidden lg:flex items-center space-x-3">
        {#if $isAuthenticated}
          <!-- User dropdown menu -->
          <div class="relative group">
            <button 
              class="px-4 py-1.5 text-sm font-medium text-gray-200 hover:text-amber-300 transition-colors duration-200 flex items-center"
            >
              Welcome <span class="mx-1 font-semibold text-amber-300">{user?.email || 'User'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a 
                href="/profile" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
              >
                <div class="flex items-center">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Your Profile
                </div>
              </a>
              {#if isAdmin}
                <a 
                  href="/admin" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                >
                  <div class="flex items-center">
                    <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Panel
                  </div>
                </a>
              {/if}
              <button 
                on:click={handleLogout}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white"
              >
                <div class="flex items-center">
                  <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </div>
              </button>
            </div>
          </div>
        {:else}
          <a href="/login" class="px-4 py-1.5 text-sm font-medium text-gray-200 hover:text-amber-300 transition-colors duration-200">
            Sign In
          </a>
          <a href="/register" class="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-yellow-700 rounded-full shadow-md hover:bg-gradient-to-r hover:from-amber-700 hover:to-yellow-800 transition-all duration-200">
            Register
          </a>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="lg:hidden p-2 text-gray-200 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-md transition-colors duration-200"
        on:click={toggleMenu}
        aria-expanded={isOpen}
      >
        <span class="sr-only">Toggle menu</span>
        {#if isOpen}
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div class="lg:hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg px-4 py-4 animate-slide-down">
      {#each [
        { href: "/", label: "Auctions" },
        { href: "/knives", label: "Knives" },
        { href: "/paintings", label: "Art" },
        { href: "/misc", label: "Misc" }
      ] as item}
        <a
          href={item.href}
          class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 {activeRoute === item.href ? 'text-amber-400 bg-gray-700' : ''}"
        >
          {item.label}
        </a>
      {/each}
      <a href="/about" class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 {activeRoute === '/about' ? 'text-amber-400 bg-gray-700' : ''}">
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        About
      </a>
      <a href="/contact" class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 {activeRoute === '/contact' ? 'text-amber-400 bg-gray-700' : ''}">
        <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        Contact
      </a>
      
      <!-- Support Chat Link (Mobile) -->
      {#if $isAuthenticated && !isAdmin}
        <a href="/support" class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 {activeRoute === '/support' ? 'text-amber-400 bg-gray-700' : ''}">
          <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span class="relative">
            Support
            {#if $unreadCount > 0}
              <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {$unreadCount}
              </span>
            {/if}
          </span>
        </a>
      {:else if $isAuthenticated && isAdmin}
        <a href="/admin/chats" class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 {activeRoute === '/admin/chats' ? 'text-amber-400 bg-gray-700' : ''}">
          <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span class="relative">
            Support Chats
            {#if $unreadCount > 0}
              <span class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {$unreadCount}
              </span>
            {/if}
          </span>
        </a>
      {/if}
      
      <a href="https://www.youtube.com/@MickWhipple" target="_blank" rel="noopener noreferrer" class="flex items-center px-3 py-2 text-gray-200 hover:text-red-400 hover:bg-gray-700/50 rounded-md transition-all duration-200">
        <svg class="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
        YouTube
      </a>
      
      <div class="mt-2 pt-2 border-t border-gray-700">
        {#if $isAuthenticated}
          <!-- Profile link in mobile menu -->
          <a 
            href="/profile"
            class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 mb-2"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Your Profile
          </a>
          
          {#if isAdmin}
            <a 
              href="/admin" 
              class="flex items-center px-3 py-2 text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200 mb-2"
            >
              <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Panel
            </a>
          {/if}
          <button 
            on:click={handleLogout}
            class="w-full flex items-center px-3 py-2 text-gray-200 hover:text-red-400 hover:bg-gray-700/50 rounded-md transition-all duration-200"
          >
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        {:else}
          <a href="/login" class="block px-4 py-2 text-sm font-medium text-gray-200 hover:text-amber-300 hover:bg-gray-700/50 rounded-md transition-all duration-200">
            Sign In
          </a>
          <a href="/register" class="block mt-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-600 to-yellow-700 rounded-md hover:bg-gradient-to-r hover:from-amber-700 hover:to-yellow-800 transition-all duration-200">
            Register
          </a>
        {/if}
      </div>
    </div>
  {/if}
</header>

<div class="h-16"></div>

<style>
  :global(.alaska-bg) {
    @apply min-h-screen;
    background-image: linear-gradient(to bottom right, rgba(17, 24, 39, 0.75), rgba(30, 58, 138, 0.75)), url('/images/alaska-bg.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  @keyframes slideDown {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-slide-down {
    animation: slideDown 0.2s ease-out;
  }
</style>