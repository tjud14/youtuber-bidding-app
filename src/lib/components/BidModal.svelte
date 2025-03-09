<script>
  import { fetchApi } from '$lib/utils/api';
  import { isAuthenticated } from '$lib/stores/auth';
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  
  const dispatch = createEventDispatcher();

  export let item;
  export let show = false;

  // Convert current_price to number and add 1
  let bidAmount = parseFloat(item.current_price) + 1;
  let error = '';
  let submitting = false;

  function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  async function resendVerification() {
    try {
      await fetchApi('resend-verification/', {
        method: 'POST',
        body: JSON.stringify({ email: 'your-email@example.com' }) // You'll need to get this from the auth store
      });
      
      error = 'Verification email sent! Please check your inbox.';
    } catch (e) {
      error = e.message || 'Failed to resend verification';
    }
  }

  async function handleSubmit() {
    console.log('Submit button clicked');
    error = '';
    submitting = true;

    try {
      // Check if user is authenticated
      if (!$isAuthenticated) {
        // Close modal and redirect to login with return URL
        show = false;
        goto(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      console.log('Starting bid submission with amount:', bidAmount);

      if (!bidAmount) {
        throw new Error('Please enter a bid amount');
      }

      const currentPrice = parseFloat(item.current_price);
      if (parseFloat(bidAmount) <= currentPrice) {
        throw new Error('Bid must be higher than current price');
      }

      if (parseFloat(bidAmount) < currentPrice + 1) {
        throw new Error('Minimum bid increment is $1.00');
      }

      const response = await fetchApi(`items/${item.id}/place_bid/`, {
        method: 'POST',
        body: JSON.stringify({
          amount: parseFloat(bidAmount),
        }),
      });

      // Close modal and emit event to parent component to handle updating UI
      show = false;
      dispatch('bidPlaced');
    } catch (e) {
      console.error('Bid error:', e);
      
      // Simplified error handling since backend now returns clean errors
      if (e.response && e.response.data && e.response.data.detail) {
        error = e.response.data.detail;
      } else if (e.message) {
        error = e.message;
      } else {
        error = 'Failed to place bid';
      }
    } finally {
      submitting = false;
    }
  }
</script>

<div>
  {#if show}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div class="w-full max-w-md rounded-lg bg-white p-6">
        <h2 class="mb-4 text-2xl font-bold text-blue-600">Place a Bid</h2>

        {#if !$isAuthenticated}
          <p class="mb-4 text-center">You must be logged in to place a bid.</p>
          <div class="flex justify-center space-x-3 pt-4">
            <button
              on:click={() => (show = false)}
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              on:click={() => goto('/login?redirect=' + encodeURIComponent(window.location.pathname))}
              class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Log In
            </button>
          </div>
        {:else}
          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
              <label for="bidAmount" class="mb-1 block text-sm font-medium text-gray-700">
                Bid Amount ($)
              </label>
              <input
                type="number"
                id="bidAmount"
                bind:value={bidAmount}
                step="0.50"
                min={parseFloat(item.current_price) + 1}
                class="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
              <p class="mt-1 text-sm text-gray-500">
                Current bid: {formatPrice(item.current_price)}
                <br />
                Minimum bid: {formatPrice(parseFloat(item.current_price) + 1)}
              </p>
            </div>

            {#if error && error.includes('verify your email')}
              <div class="mt-4 rounded-lg border border-blue-300 bg-blue-50 p-4 text-sm text-blue-700">
                <p class="font-medium">Your email needs to be verified.</p>
                <p class="mt-2">Please check your email for a verification link or click below to resend it.</p>
                <button
                  type="button"
                  class="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                  on:click={resendVerification}
                >
                  Resend Verification Email
                </button>
              </div>
            {:else if error}
              <p class="text-sm text-red-500">{error}</p>
            {/if}

            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                on:click={() => (show = false)}
                class="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
              >
                {submitting ? 'Placing Bid...' : 'Place Bid'}
              </button>
            </div>
          </form>
        {/if}
      </div>
    </div>
  {/if}
</div>