<script>
  import { page } from '$app/stores';
  import { isAuthenticated } from '$lib/stores/auth';
  import BidModal from '$lib/components/BidModal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import YouTubeEmbed from '$lib/components/YouTubeEmbed.svelte';
  import { fetchApi, getCsrfToken } from '$lib/utils/api';
  import { onDestroy, onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let item = null;
  let loading = true;
  let error = null;
  let timerInterval;
  let timeRemaining = null;
  let showBidModal = false;
  let showToast = false;
  let toastMessage = '';
  let currentImageIndex = 0;
  let autoRefresh; // For auto-refreshing bids
  let showLastMinuteAlert = false; // For last-minute bidding alert
  let retryCount = 0;
  const MAX_RETRIES = 3;

  // Generate unique colors for each bidder
  $: uniqueUsers = item?.bids ? [...new Set(item.bids.map(bid => bid.user_email))] : [];
  $: colors = [
    'text-blue-600', 'text-purple-600', 'text-green-600', 
    'text-amber-600', 'text-rose-600', 'text-teal-600', 
    'text-indigo-600', 'text-orange-600', 'text-emerald-600'
  ];
  
  $: userColors = {};
  $: {
    uniqueUsers.forEach((user, index) => {
      userColors[user] = colors[index % colors.length];
    });
  }

  async function refreshItem() {
    loading = true;
    error = null;
    
    try {
      const id = $page.params.id;
      console.log(`Loading item ${id}`);
      
      try {
        // Try the primary endpoint
        const data = await fetchApi(`items/${id}/`);
        item = data;
        timeRemaining = getTimeRemaining(item.end_date);
      } catch (primaryError) {
        console.warn('Primary endpoint failed:', primaryError.message);
        
        // Try category-specific endpoint as fallback
        const category = $page.url.pathname.split('/')[1];
        console.log(`Trying ${category}-specific endpoint`);
        const data = await fetchApi(`${category}/${id}/`);
        item = data;
        timeRemaining = getTimeRemaining(item.end_date);
      }
    } catch (e) {
      console.error('Error in refreshItem:', e);
      error = e.message || 'Failed to load auction details';
    } finally {
      loading = false;
    }
  }

  function nextImage() {
    if (item.images?.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % item.images.length;
    }
  }

  function previousImage() {
    if (item.images?.length > 0) {
      currentImageIndex = (currentImageIndex - 1 + item.images.length) % item.images.length;
    }
  }

  function selectImage(index) {
    currentImageIndex = index;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  function showSuccessToast(message) {
    toastMessage = message;
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }

  function getTimeRemaining(endDate) {
    const total = new Date(endDate) - new Date();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
      isExpired: total <= 0,
    };
  }
  
  function maskEmail(email) {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (username.length <= 2) {
      return `${username}***@${domain}`;
    }
    return `${username[0]}***${username[username.length - 1]}@${domain}`;
  }

  function handleLoginClick() {
    goto(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
  }

  function handleImageError(e) {
    console.error('Image failed to load:', e.currentTarget.src);
    e.currentTarget.src = '/placeholder.jpg';
    e.currentTarget.onerror = null; // Prevent infinite error loops
  }

  onMount(async () => {
    try {
      await refreshItem();
      loading = false;

      // Timer for countdown only
      timerInterval = setInterval(() => {
        timeRemaining = getTimeRemaining(item.end_date);
        
        // Check for last minute bidding
        if (timeRemaining && timeRemaining.days === 0 && timeRemaining.hours < 1) {
          showLastMinuteAlert = true;
        }
        
        // Optionally, check if auction has ended and clear interval
        if (timeRemaining && timeRemaining.isExpired) {
          clearInterval(timerInterval);
        }
      }, 1000);
    } catch (e) {
      console.error('Failed to load auction details:', e);
      error = 'Failed to load auction details';
      loading = false;
    }
  });

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
  });

  async function handleBidPlaced() {
    try {
      await refreshItem();
      showSuccessToast('Bid placed successfully!');
    } catch (e) {
      console.error('Error refreshing after bid:', e);
    }
  }
</script>

<div class="alaska-bg min-h-screen p-8">
  <div class="container mx-auto max-w-5xl">
    <button
      on:click={() => window.history.back()}
      class="mb-4 flex items-center text-white transition-colors hover:text-gray-200"
    >
      <svg class="mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Auctions
    </button>

    {#if loading}
      <div class="text-center text-xl text-gray-600">Loading auction details...</div>
    {:else if error}
      <div class="text-center text-xl text-red-600">{error}</div>
    {:else if item}
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h1 class="mb-4 text-3xl font-bold text-blue-600">{item.title}</h1>
        <p class="mb-4 text-sm font-medium text-gray-500">{item.category.name}</p>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div class="relative">
              <img
                src={item.image_url || (item.images?.length > 0
                  ? item.images[currentImageIndex].image
                  : '/placeholder.jpg')}
                alt={item.title}
                class="w-full rounded-lg shadow-md"
                on:error={handleImageError}
              />
              {#if item.images?.length > 1}
                <button
                  class="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white"
                  on:click={previousImage}
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white"
                  on:click={nextImage}
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              {/if}
            </div>

            {#if item.images?.length > 1}
              <div class="mt-4 grid grid-cols-4 gap-2">
                {#each item.images as image, i}
                  <img
                    src={image.image_url || image.image}
                    alt={`${item.title} - Image ${i + 1}`}
                    class="h-20 w-full cursor-pointer rounded object-cover hover:opacity-75 {i ===
                    currentImageIndex ? 'ring-2 ring-blue-500' : ''}"
                    on:click={() => selectImage(i)}
                    on:error={handleImageError}
                  />
                {/each}
              </div>
            {/if}
            
            {#if item.youtube_url}
              <div class="mt-4">
                <h3 class="mb-2 text-lg font-semibold text-blue-600">Watch Video</h3>
                <YouTubeEmbed youtubeUrl={item.youtube_url} />
              </div>
            {/if}
          </div>

          <div>
            <div class="mb-4 rounded-lg bg-blue-50 p-4">
              {#if timeRemaining}
                {#if timeRemaining.isExpired}
                  <p class="text-center text-xl font-bold text-red-600">Auction Ended</p>
                {:else}
                  <p class="mb-2 text-center text-lg font-semibold text-blue-800">
                    Time Remaining:
                  </p>
                  <div class="grid grid-cols-4 gap-2 text-center">
                    <div class="rounded bg-white p-2 shadow">
                      <span class="text-2xl font-bold text-blue-600">{timeRemaining.days}</span>
                      <p class="text-sm text-gray-600">Days</p>
                    </div>
                    <div class="rounded bg-white p-2 shadow">
                      <span class="text-2xl font-bold text-blue-600">{timeRemaining.hours}</span>
                      <p class="text-sm text-gray-600">Hours</p>
                    </div>
                    <div class="rounded bg-white p-2 shadow">
                      <span class="text-2xl font-bold text-blue-600">{timeRemaining.minutes}</span>
                      <p class="text-sm text-gray-600">Minutes</p>
                    </div>
                    <div class="rounded bg-white p-2 shadow">
                      <span class="text-2xl font-bold text-blue-600">{timeRemaining.seconds}</span>
                      <p class="text-sm text-gray-600">Seconds</p>
                    </div>
                  </div>
                {/if}
              {/if}
            </div>

            <p class="mb-4 text-gray-700">{item.description}</p>

            <!-- Stats and Share button -->
            <div class="mb-4 flex items-center justify-between">
              <div class="text-sm text-gray-600">
                <div>Total Bids: {item.bids.length}</div>
                <div>Unique Bidders: {new Set(item.bids.map(bid => bid.user_email)).size}</div>
              </div>
              <button
                class="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                on:click={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showSuccessToast('Link copied to clipboard!');
                }}
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share Auction
              </button>
            </div>

            <div class="mb-4 rounded-lg bg-blue-50 p-4">
              <p class="text-lg font-semibold text-blue-800">
                Current Bid: {formatPrice(item.current_price)}
              </p>
              <p class="text-sm text-blue-600">
                Starting Price: {formatPrice(item.starting_price)}
              </p>
            </div>

            {#if timeRemaining && !timeRemaining.isExpired}
              {#if $isAuthenticated}
                <button
                  on:click={() => (showBidModal = true)}
                  class="w-full rounded-lg bg-blue-500 px-4 py-3 text-white transition hover:bg-blue-600"
                >
                  Place Bid
                </button>
              {:else}
                <button
                  on:click={handleLoginClick}
                  class="w-full rounded-lg bg-blue-500 px-4 py-3 text-white transition hover:bg-blue-600"
                >
                  Log In to Bid
                </button>
                <p class="mt-2 text-center text-sm text-gray-500">
                  You must be logged in to place a bid
                </p>
              {/if}
            {:else}
              <button class="w-full cursor-not-allowed rounded-lg bg-gray-400 px-4 py-3 text-white">
                Auction Ended
              </button>
            {/if}
          </div>
        </div>

        {#if showBidModal}
          <BidModal {item} bind:show={showBidModal} on:bidPlaced={handleBidPlaced} />
        {/if}
      </div>

      {#if item.bids?.length > 0}
        <div class="mt-8">
          <!-- Redesigned Bid History Component -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 p-4">
              <h2 class="text-xl font-semibold text-white">Bid History</h2>
            </div>
            
            <div class="divide-y divide-gray-100">
              {#each item.bids as bid, i}
                {@const isRepeatBidder = item.bids
                  .slice(0, i)
                  .some(prevBid => prevBid.user_email === bid.user_email)}
                {@const isMostRecentBidder =
                  i > 0 && item.bids[i - 1].user_email === bid.user_email}
                
                <div class="flex items-center p-4 transition-colors hover:bg-blue-50 {i === 0 ? 'bg-blue-50' : ''}">
                  <div class="flex-grow">
                    <div class="flex items-center gap-2">
                      <p class="font-medium {userColors[bid.user_email] || 'text-gray-800'}">
                        {bid.user_nickname || 'User'}
                        <span class="ml-2 text-sm text-gray-500">
                          ({maskEmail(bid.user_email)})
                        </span>
                      </p>
                      
                      {#if i === 0}
                        <span class="rounded bg-green-100 px-2 py-1 text-xs text-green-600">
                          Current Highest
                        </span>
                      {/if}
                      
                      {#if isRepeatBidder}
                        <span class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600">
                          Returning Bidder
                        </span>
                      {/if}
                    </div>
                    <p class="text-sm text-gray-500">
                      {new Date(bid.created_at).toLocaleString()}
                    </p>
                  </div>
                  
                  <div class="text-right">
                    <span class="text-lg font-bold text-blue-600">
                      {formatPrice(bid.amount)}
                    </span>
                    {#if i < item.bids.length - 1}
                      <div class="text-sm text-gray-500">
                        +${(bid.amount - item.bids[i + 1].amount).toFixed(2)}
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <div class="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <p class="text-center text-gray-600">No bids yet. Be the first to bid!</p>
        </div>
      {/if}
    {/if}
  </div>
</div>

<Toast message={toastMessage} type="success" bind:show={showToast} />