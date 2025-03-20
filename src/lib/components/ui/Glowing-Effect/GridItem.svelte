<script>
  import { cn } from '@/lib/utils';
  import GlowingEffect from '@/components/ui/Glowing-Effect/GlowingEffect.svelte';

  // Props
  export let area = '';
  export let icon;
  export let title = '';
  export let description = '';
</script>

<li class={cn('min-h-[14rem] list-none', area)}>
  <div
    class="border-border relative h-full rounded-[1.25rem] border-[0.75px] p-2 md:rounded-[1.5rem] md:p-3"
  >
    <GlowingEffect
      spread={40}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={3}
    />
    <div
      class="bg-background relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-6 dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]"
    >
      <div class="relative flex flex-1 flex-col justify-between gap-3">
        <div class="border-border bg-muted w-fit rounded-lg border-[0.75px] p-2">
          <svelte:component this={icon} class="h-4 w-4" />
        </div>
        <div class="space-y-3">
          <h3
            class="text-foreground text-balance pt-0.5 font-sans text-xl font-semibold leading-[1.375rem] tracking-[-0.04em] md:text-2xl md:leading-[1.875rem]"
          >
            {title}
          </h3>
          <h2
            class="text-muted-foreground font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold"
          >
            {description}
          </h2>
        </div>
      </div>
    </div>
  </div>
</li>
