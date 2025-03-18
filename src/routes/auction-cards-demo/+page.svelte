<script>
  import ClassicAuctionCard from '$lib/components/ui/cards/ClassicAuctionCard.svelte';
  import PremiumAuctionCard from '$lib/components/ui/cards/PremiumAuctionCard.svelte';
  import QuickBidCard from '$lib/components/ui/cards/QuickBidCard.svelte';
  
  // Sample auction items with realistic data
  const auctionItems = [
    {
      id: 1,
      name: "Vintage Alaskan Gold Mining Pan",
      image: "https://images.unsplash.com/photo-1610375461369-d613b564ed76?q=80&w=2070&auto=format&fit=crop",
      currentBid: 125,
      estimatedValue: 200,
      nextBid: 135,
      timeRemaining: "2h 15m",
      bidCount: 8,
      category: "Mining",
      premium: true
    },
    {
      id: 2,
      name: "Custom Handcrafted Bowie Knife",
      image: "https://images.unsplash.com/photo-1589574515959-42f13a6d1ecd?q=80&w=2071&auto=format&fit=crop",
      currentBid: 340,
      estimatedValue: 500,
      nextBid: 360,
      timeRemaining: "4h 45m",
      bidCount: 12,
      category: "Knives",
      premium: false
    },
    {
      id: 3,
      name: "Vintage Bear Pelt - 1950s Taxidermy",
      image: "https://images.unsplash.com/photo-1574873215043-44119461cb3b?q=80&w=2070&auto=format&fit=crop",
      currentBid: 850,
      estimatedValue: 1200,
      nextBid: 900,
      timeRemaining: "1d 3h",
      bidCount: 19,
      category: "Art",
      premium: true
    },
    {
      id: 4,
      name: "Professional Ice Fishing Kit - Complete",
      image: "https://images.unsplash.com/photo-1612548403247-aa2873e9422d?q=80&w=2029&auto=format&fit=crop",
      currentBid: 450,
      estimatedValue: 700,
      nextBid: 475,
      timeRemaining: "5h 30m",
      bidCount: 7,
      category: "Fishing",
      premium: false
    },
    {
      id: 5,
      name: "Alaskan Gold Nugget Collection (5 pieces)",
      image: "https://images.unsplash.com/photo-1610375461369-d613b564ed76?q=80&w=2070&auto=format&fit=crop",
      currentBid: 2800,
      estimatedValue: 3500,
      nextBid: 2900,
      timeRemaining: "3d 6h",
      bidCount: 23,
      category: "Minerals",
      premium: true
    },
    {
      id: 6,
      name: "Handmade Leather Hunting Boots",
      image: "https://images.unsplash.com/photo-1605812830455-2fadc55bc4ba?q=80&w=1974&auto=format&fit=crop",
      currentBid: 220,
      estimatedValue: 350,
      nextBid: 240,
      timeRemaining: "8h 15m",
      bidCount: 5,
      category: "Apparel",
      premium: false
    }
  ];
  
  // Display options
  let selectedDesign = 'all';
  const designs = [
    { id: 'all', name: 'All Designs' },
    { id: 'classic', name: 'Classic Cards' },
    { id: 'premium', name: 'Premium Cards' },
    { id: 'quick', name: 'Quick Bid Cards' }
  ];
</script>

<div class="bg-slate-900 min-h-screen text-white">
  <div class="container mx-auto py-12 px-4">
    <header class="mb-12">
      <h1 class="text-4xl font-bold mb-4">3D Auction Cards Demo</h1>
      <p class="text-lg text-slate-300 max-w-3xl">
        Interactive 3D auction cards with depth effects on hover. Each design is optimized for different auction scenarios.
      </p>
      
      <!-- Design selector -->
      <div class="mt-8">
        <div class="flex flex-wrap gap-2">
          {#each designs as design}
            <button 
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedDesign === design.id ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white hover:bg-slate-700'}"
              on:click={() => selectedDesign = design.id}
            >
              {design.name}
            </button>
          {/each}
        </div>
      </div>
    </header>
    
    {#if selectedDesign === 'all' || selectedDesign === 'classic'}
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <span class="inline-block w-4 h-4 bg-blue-500 mr-2 rounded-sm"></span>
          Classic Auction Cards
        </h2>
        <p class="text-slate-400 mb-8">Traditional auction card design with focus on item details and bidding.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each auctionItems.slice(0, 3) as item}
            <div class="h-[400px]">
              <ClassicAuctionCard 
                itemImage={item.image}
                itemName={item.name}
                currentBid={item.currentBid}
                timeRemaining={item.timeRemaining}
                bidCount={item.bidCount}
              />
            </div>
          {/each}
        </div>
      </section>
    {/if}
    
    {#if selectedDesign === 'all' || selectedDesign === 'premium'}
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <span class="inline-block w-4 h-4 bg-purple-500 mr-2 rounded-sm"></span>
          Premium Auction Cards
        </h2>
        <p class="text-slate-400 mb-8">Immersive full-image cards with rich details for premium items.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each auctionItems.slice(2, 5) as item}
            <div class="h-[400px]">
              <PremiumAuctionCard
                itemImage={item.image}
                itemName={item.name}
                currentBid={item.currentBid}
                estimatedValue={item.estimatedValue}
                timeRemaining={item.timeRemaining}
                itemCategory={item.category}
                premium={item.premium}
              />
            </div>
          {/each}
        </div>
      </section>
    {/if}
    
    {#if selectedDesign === 'all' || selectedDesign === 'quick'}
      <section class="mb-16">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <span class="inline-block w-4 h-4 bg-green-500 mr-2 rounded-sm"></span>
          Quick Bid Cards
        </h2>
        <p class="text-slate-400 mb-8">Streamlined interface focusing on rapid bidding actions.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each auctionItems.slice(3, 6) as item}
            <div class="h-[400px]">
              <QuickBidCard
                itemImage={item.image}
                itemName={item.name}
                currentBid={item.currentBid}
                nextBid={item.nextBid}
                bidIncrement={25}
                timeRemaining={item.timeRemaining}
              />
            </div>
          {/each}
        </div>
      </section>
    {/if}
    
    <!-- Technical information section -->
    <section class="mt-16 border-t border-slate-800 pt-8">
      <h2 class="text-xl font-bold mb-4">Implementation Notes</h2>
      
      <div class="bg-slate-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Technical Details:</h3>
        <ul class="list-disc list-inside space-y-2 text-slate-300">
          <li>Cards use moderate z-value ranges (-25px to 30px) to maintain realistic perspective</li>
          <li>HoverZScale set between 1.4-1.6 to avoid jarring transitions</li>
          <li>All parent elements maintain transform-style: preserve-3d for consistent 3D rendering</li>
          <li>Visual hierarchy preserved with subtle depth differences</li>
          <li>Interactive elements (buttons) positioned with highest z-values</li>
        </ul>
        
        <div class="mt-6 flex justify-end">
          <div class="flex space-x-4">
            <a href="/testcard" class="text-amber-400 hover:text-amber-300 text-sm underline">Original Test</a>
            <a href="/testcard2" class="text-amber-400 hover:text-amber-300 text-sm underline">Direct DOM Test</a>
            <a href="/explicitcard" class="text-amber-400 hover:text-amber-300 text-sm underline">Z-Value Test</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</div> 