<script>
  import ClassicAuctionCard from '$lib/components/ui/cards/ClassicAuctionCard.svelte';
  import PremiumAuctionCard from '$lib/components/ui/cards/PremiumAuctionCard.svelte';
  import QuickBidCard from '$lib/components/ui/cards/QuickBidCard.svelte';
  
  // Sample auction items
  const auctionItems = [
    {
      id: 1,
      name: "Vintage Hunting Knife",
      image: "/images/hunting-knife.jpg",
      currentBid: 125,
      estimatedValue: 200,
      nextBid: 135,
      timeRemaining: "2h 15m",
      bidCount: 8,
      category: "Knives",
      premium: true
    },
    {
      id: 2,
      name: "Alaskan Gold Mining Equipment",
      image: "/images/mining-equipment.jpg",
      currentBid: 3200,
      estimatedValue: 5000,
      nextBid: 3300,
      timeRemaining: "1d 4h",
      bidCount: 15,
      category: "Equipment",
      premium: false
    },
    {
      id: 3,
      name: "Ice Fishing Kit - Complete Set",
      image: "/images/ice-fishing.jpg",
      currentBid: 450,
      estimatedValue: 800,
      nextBid: 475,
      timeRemaining: "5h 30m",
      bidCount: 12,
      category: "Fishing",
      premium: false
    }
  ];
</script>

<div class="container mx-auto py-12 px-4">
  <h1 class="text-3xl font-bold mb-8">Featured Auctions</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Classic auction card -->
    <div class="h-[400px]">
      <ClassicAuctionCard 
        itemImage={auctionItems[0].image}
        itemName={auctionItems[0].name}
        currentBid={auctionItems[0].currentBid}
        timeRemaining={auctionItems[0].timeRemaining}
        bidCount={auctionItems[0].bidCount}
      />
    </div>
    
    <!-- Premium auction card -->
    <div class="h-[400px]">
      <PremiumAuctionCard
        itemImage={auctionItems[1].image}
        itemName={auctionItems[1].name}
        currentBid={auctionItems[1].currentBid}
        estimatedValue={auctionItems[1].estimatedValue}
        timeRemaining={auctionItems[1].timeRemaining}
        itemCategory={auctionItems[1].category}
        premium={auctionItems[1].premium}
      />
    </div>
    
    <!-- Quick bid card -->
    <div class="h-[400px]">
      <QuickBidCard
        itemImage={auctionItems[2].image}
        itemName={auctionItems[2].name}
        currentBid={auctionItems[2].currentBid}
        nextBid={auctionItems[2].nextBid}
        bidIncrement={25}
        timeRemaining={auctionItems[2].timeRemaining}
      />
    </div>
  </div>
</div> 