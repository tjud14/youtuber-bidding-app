<script>
  export let message = '';
  export let type = 'success';
  export let show = false;

  function getTypeStyles() {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  }
</script>

{#if show}
  <div class="animate-slide-in fixed right-4 top-20 z-50">
    <div
      class={`${getTypeStyles()} flex items-center space-x-2 rounded-lg px-6 py-3 text-white shadow-lg`}
    >
      <span>{message}</span>
    </div>
  </div>
{/if}

<style>
  .animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
