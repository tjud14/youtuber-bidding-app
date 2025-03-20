<script>
  import { Box, Lock, Search, Settings, Sparkles } from 'lucide-svelte';
  import GridItem from '@/components/ui/Glowing-Effect/GlowingEffect.svelte';
</script>

<ul
  class="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2"
>
  <GridItem
    area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    icon={Box}
    title="Do things the right way"
    description="Running out of copy so I'll write anything."
  />
  <GridItem
    area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    icon={Settings}
    title="The best AI code editor ever."
    description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
  />
  <GridItem
    area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    icon={Lock}
    title="You should buy Aceternity UI Pro"
    description="It's the best money you'll ever spend"
  />
  <GridItem
    area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    icon={Sparkles}
    title="This card is also built by Cursor"
    description="I'm not even kidding. Ask my mom if you don't believe me."
  />
  <GridItem
    area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
    icon={Search}
    title="Coming soon on Aceternity UI"
    description="I'm writing the code as I record this, no shit."
  />
</ul>
