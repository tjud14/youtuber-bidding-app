<script>
  // Props can be added here if the component needs configuration
  export let className = '';

  // Import cn from your existing utils file
  import { cn } from '$lib/utils/utils';
</script>

<div class={cn('relative isolate overflow-hidden', className)}>
  <!-- Enhanced gradient background to better match the original -->
  <div class="absolute inset-0 -z-10 h-full w-full bg-slate-950">
    <!-- Primary gradient beam -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_40%,rgba(76,29,149,0.4),transparent_60%)]"
    ></div>

    <!-- Secondary gradients to create depth -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_600px_at_30%_60%,rgba(56,189,248,0.15),transparent_80%)]"
    ></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_800px_at_70%_30%,rgba(124,58,237,0.2),transparent_70%)]"
    ></div>

    <!-- Additional accent gradient -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_400px_at_20%_80%,rgba(45,212,191,0.1),transparent_70%)]"
    ></div>
  </div>

  <!-- Content slot -->
  <slot></slot>
</div>
