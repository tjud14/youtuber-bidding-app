<script>
    import Enhanced3DCard from '$lib/components/ui/3d-card/hybridcards/Enhanced3DCard.svelte';
    
    // Demo State
    let currentHoverCard = null;
    
    // Z-values with better organization
    const zValues = {
      background: -80,
      image: -30,
      content: 20,
      title: 50,
      details: 30,
      price: 60,
      button: 40,
      badge: 70
    };
    
    // Different use cases for demo
    const cards = [
      {
        id: 'product',
        title: 'Premium Leather Watch',
        description: 'Hand-crafted Italian leather with sapphire crystal face. Limited edition design.',
        price: 299,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        badge: 'LIMITED EDITION',
        colorOptions: ['Black', 'Brown', 'Navy'],
        inStock: true,
        rating: 4.8,
        reviews: 36
      },
      {
        id: 'travel',
        title: 'Kyoto Temple Tour',
        description: 'Explore ancient Japanese temples with expert guides. Includes traditional tea ceremony.',
        price: 189,
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        badge: 'TOP RATED',
        duration: '4 hours',
        groupSize: 'Max 8 people',
        languages: ['English', 'Japanese'],
        included: ['Guide', 'Tea ceremony', 'Temple admission']
      },
      {
        id: 'nft',
        title: 'Digital Horizon #024',
        description: 'Part of the acclaimed "Horizons" collection by digital artist Elena Chen.',
        price: 0.85,
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        badge: 'VERIFIED',
        creator: 'Elena Chen',
        tokenId: '#024',
        blockchain: 'Ethereum',
        edition: '1 of 10',
        history: [
          { price: 0.5, date: '3 months ago' },
          { price: 0.7, date: '1 month ago' }
        ]
      }
    ];
    
    // Handle hover state changes
    function handleHoverChange(cardId, event) {
      if (event.detail.isHovering) {
        currentHoverCard = cardId;
      } else if (currentHoverCard === cardId) {
        currentHoverCard = null;
      }
    }
    
    // Format currency
    function formatCurrency(value, isCrypto = false) {
      if (isCrypto) {
        return `${value} ETH`;
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
  </script>
  
  <div class="py-16 px-4 bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen">
    <div class="container mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">Enhanced 3D Card Showcase</h1>
        <p class="text-lg text-white/80 max-w-2xl mx-auto">
          Demonstrating the improved 3D card component with three different use cases: Product, Travel, and Digital Art.
        </p>
      </div>
      
      <!-- Card Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <!-- Product Card -->
        <div class="h-[500px]">
          <Enhanced3DCard
            hoverZScale={1.5}
            initialScale={1}
            hoverScale={1.04}
            perspective={1200}
            maxRotation={8}
            transitionDuration={0.25}
            cardStyle="border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);"
            on:hoverchange={(e) => handleHoverChange('product', e)}
          >
            <svelte:fragment slot="default" let:isHovering let:getItemStyle>
              <!-- Background -->
              <div class="absolute inset-0 rounded-xl overflow-hidden"
                   style:transform={getItemStyle(zValues.background).transform}
                   style:transition={getItemStyle(zValues.background).transition}>
                <div class="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl"></div>
              </div>
              
              <!-- Image -->
              <div class="absolute inset-0 overflow-hidden rounded-xl"
                   style:transform={getItemStyle(zValues.image).transform}
                   style:transition={getItemStyle(zValues.image).transition}>
                <div class="h-[55%] overflow-hidden rounded-t-xl">
                  <img 
                    src={cards[0].image} 
                    alt={cards[0].title}
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <!-- Badge -->
              <div style:transform={getItemStyle(zValues.badge).transform}
                   style:transition={getItemStyle(zValues.badge).transition}
                   class="absolute top-4 right-4">
                <span class="bg-black px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  {cards[0].badge}
                </span>
              </div>
              
              <!-- Content -->
              <div class="absolute inset-x-0 bottom-0 top-[50%] p-5 flex flex-col"
                   style:transform={getItemStyle(zValues.content).transform}
                   style:transition={getItemStyle(zValues.content).transition}>
                
                <!-- Title -->
                <div style:transform={getItemStyle(zValues.title).transform}
                     style:transition={getItemStyle(zValues.title).transition}
                     class="mb-2">
                  <h3 class="text-xl font-bold text-white text-sharp">{cards[0].title}</h3>
                </div>
                
                <!-- Description -->
                <div style:transform={getItemStyle(zValues.details).transform}
                     style:transition={getItemStyle(zValues.details).transition}
                     class="mb-2">
                  <p class="text-white/80 text-sm font-medium">
                    {cards[0].description}
                  </p>
                </div>
                
                <!-- Color options -->
                <div style:transform={getItemStyle(zValues.details, { delay: 0.05 }).transform}
                     style:transition={getItemStyle(zValues.details, { delay: 0.05 }).transition}
                     class="flex gap-2 mt-3 mb-4">
                  {#each cards[0].colorOptions as color}
                    <div class="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                      <span class="w-4 h-4 rounded-full" style="background-color: {color.toLowerCase()};"></span>
                    </div>
                  {/each}
                </div>
                
                <!-- Price -->
                <div style:transform={getItemStyle(zValues.price).transform}
                     style:transition={getItemStyle(zValues.price).transition}
                     class="mt-auto mb-4">
                  <div class="flex justify-between items-center">
                    <div class="text-2xl font-bold text-white text-sharp">{formatCurrency(cards[0].price)}</div>
                    <div class="flex items-center text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-xs ml-1 font-medium">{cards[0].rating} ({cards[0].reviews})</span>
                    </div>
                  </div>
                </div>
                
                <!-- Button -->
                <div style:transform={getItemStyle(zValues.button).transform}
                     style:transition={getItemStyle(zValues.button).transition}>
                  <button class="w-full bg-white hover:bg-white/90 text-black px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </Enhanced3DCard>
        </div>
        
        <!-- Travel Card -->
        <div class="h-[500px]">
          <Enhanced3DCard
            hoverZScale={1.8}
            initialScale={1}
            hoverScale={1.06}
            perspective={1500}
            maxRotation={12}
            transitionDuration={0.3}
            cardStyle="border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);"
            on:hoverchange={(e) => handleHoverChange('travel', e)}
          >
            <svelte:fragment slot="default" let:isHovering let:getItemStyle>
              <!-- Background -->
              <div class="absolute inset-0 rounded-xl overflow-hidden"
                   style:transform={getItemStyle(zValues.background).transform}
                   style:transition={getItemStyle(zValues.background).transition}>
                <div class="w-full h-full bg-gradient-to-br from-emerald-900 to-teal-800 rounded-xl"></div>
              </div>
              
              <!-- Image -->
              <div class="absolute inset-0 overflow-hidden rounded-xl"
                   style:transform={getItemStyle(zValues.image).transform}
                   style:transition={getItemStyle(zValues.image).transition}>
                <img 
                  src={cards[1].image} 
                  alt={cards[1].title}
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              
              <!-- Badge -->
              <div style:transform={getItemStyle(zValues.badge).transform}
                   style:transition={getItemStyle(zValues.badge).transition}
                   class="absolute top-4 left-4">
                <span class="bg-emerald-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {cards[1].badge}
                </span>
              </div>
              
              <!-- Content -->
              <div class="absolute inset-0 flex flex-col justify-end p-6"
                   style:transform={getItemStyle(zValues.content).transform}
                   style:transition={getItemStyle(zValues.content).transition}>
                
                <!-- Title -->
                <div style:transform={getItemStyle(zValues.title).transform}
                     style:transition={getItemStyle(zValues.title).transition}
                     class="mb-2">
                  <h3 class="text-2xl font-bold text-white text-sharp">{cards[1].title}</h3>
                </div>
                
                <!-- Description -->
                <div style:transform={getItemStyle(zValues.details).transform}
                     style:transition={getItemStyle(zValues.details).transition}
                     class="mb-4">
                  <p class="text-white/90 text-sm font-medium">
                    {cards[1].description}
                  </p>
                </div>
                
                <!-- Details -->
                <div style:transform={getItemStyle(zValues.details, { delay: 0.05 }).transform}
                     style:transition={getItemStyle(zValues.details, { delay: 0.05 }).transition}
                     class="grid grid-cols-2 gap-2 mb-5">
                  <div class="flex items-center gap-2 text-white/80 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{cards[1].duration}</span>
                  </div>
                  <div class="flex items-center gap-2 text-white/80 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{cards[1].groupSize}</span>
                  </div>
                  <div class="flex items-center gap-2 text-white/80 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span>{cards[1].languages.join(', ')}</span>
                  </div>
                </div>
                
                <!-- Price -->
                <div style:transform={getItemStyle(zValues.price).transform}
                     style:transition={getItemStyle(zValues.price).transition}
                     class="mb-4">
                  <div class="text-2xl font-bold text-white text-sharp">
                    {formatCurrency(cards[1].price)}
                    <span class="text-sm font-medium ml-1 text-white/70">per person</span>
                  </div>
                </div>
                
                <!-- Button -->
                <div style:transform={getItemStyle(zValues.button).transform}
                     style:transition={getItemStyle(zValues.button).transition}>
                  <button class="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </Enhanced3DCard>
        </div>
        
        <!-- NFT Card -->
        <div class="h-[500px]">
          <Enhanced3DCard
            hoverZScale={2.2}
            initialScale={1}
            hoverScale={1.08}
            perspective={1800}
            maxRotation={15}
            transitionDuration={0.35}
            cardStyle="border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);"
            on:hoverchange={(e) => handleHoverChange('nft', e)}
          >
            <svelte:fragment slot="default" let:isHovering let:getItemStyle>
              <!-- Background -->
              <div class="absolute inset-0 rounded-xl overflow-hidden"
                   style:transform={getItemStyle(zValues.background).transform}
                   style:transition={getItemStyle(zValues.background).transition}>
                <div class="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl"></div>
              </div>
              
              <!-- Image -->
              <div class="absolute inset-0 overflow-hidden rounded-xl"
                   style:transform={getItemStyle(zValues.image).transform}
                   style:transition={getItemStyle(zValues.image).transition}>
                <img 
                  src={cards[2].image} 
                  alt={cards[2].title}
                  class="w-full h-[65%] object-cover"
                />
              </div>
              
              <!-- Badge -->
              <div style:transform={getItemStyle(zValues.badge).transform}
                   style:transition={getItemStyle(zValues.badge).transition}
                   class="absolute top-4 right-4">
                <span class="bg-purple-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {cards[2].badge}
                </span>
              </div>
              
              <!-- Edition -->
              <div style:transform={getItemStyle(zValues.badge).transform}
                   style:transition={getItemStyle(zValues.badge).transition}
                   class="absolute top-4 left-4">
                <span class="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/30">
                  {cards[2].edition}
                </span>
              </div>
              
              <!-- Content -->
              <div class="absolute inset-x-0 bottom-0 top-[60%] p-5 flex flex-col"
                   style:transform={getItemStyle(zValues.content).transform}
                   style:transition={getItemStyle(zValues.content).transition}>
                
                <!-- Title & ID -->
                <div style:transform={getItemStyle(zValues.title).transform}
                     style:transition={getItemStyle(zValues.title).transition}
                     class="flex justify-between items-center mb-1">
                  <h3 class="text-xl font-bold text-white text-sharp">{cards[2].title}</h3>
                  <div class="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/70">{cards[2].tokenId}</div>
                </div>
                
                <!-- Creator -->
                <div style:transform={getItemStyle(zValues.details).transform}
                     style:transition={getItemStyle(zValues.details).transition}
                     class="mb-3">
                  <p class="text-white/80 text-xs font-medium">
                    Created by <span class="text-purple-300">{cards[2].creator}</span> • <span class="text-white/60">{cards[2].blockchain}</span>
                  </p>
                </div>
                
                <!-- Description -->
                <div style:transform={getItemStyle(zValues.details, { delay: 0.05 }).transform}
                     style:transition={getItemStyle(zValues.details, { delay: 0.05 }).transition}
                     class="mb-4">
                  <p class="text-white/90 text-sm font-medium">
                    {cards[2].description}
                  </p>
                </div>
                
                <!-- Price History -->
                <div style:transform={getItemStyle(zValues.details, { delay: 0.1 }).transform}
                     style:transition={getItemStyle(zValues.details, { delay: 0.1 }).transition}
                     class="my-2">
                  <div class="flex justify-between items-center text-xs text-white/60 mb-1">
                    <span>Price History</span>
                  </div>
                  <div class="space-y-1">
                    {#each cards[2].history as item}
                      <div class="flex justify-between text-xs">
                        <span class="text-white/70">{item.date}</span>
                        <span class="font-medium text-white">{item.price} ETH</span>
                      </div>
                    {/each}
                  </div>
                </div>
                
                <!-- Price -->
                <div style:transform={getItemStyle(zValues.price).transform}
                     style:transition={getItemStyle(zValues.price).transition}
                     class="mt-auto mb-4">
                  <div class="text-2xl font-bold text-white text-sharp">{formatCurrency(cards[2].price, true)}</div>
                </div>
                
                <!-- Button -->
                <div style:transform={getItemStyle(zValues.button).transform}
                     style:transition={getItemStyle(zValues.button).transition}>
                  <button class="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-200">
                    Purchase NFT
                  </button>
                </div>
              </div>
            </svelte:fragment>
          </Enhanced3DCard>
        </div>
      </div>
      
      <!-- Features Explanation -->
      <div class="bg-white/10 backdrop-blur-sm p-8 rounded-xl max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-white mb-6">Enhanced 3D Card Component Features</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-white">Customizable Parameters</h3>
            <ul class="space-y-2 text-white/80">
              <li class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Adjustable rotation intensity <code class="text-xs bg-black/20 px-1 rounded">maxRotation</code></span>
              </li>
              <li class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Configurable perspective <code class="text-xs bg-black/20 px-1 rounded">perspective</code></span>
              </li>
              <li class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Customizable transition timing <code class="text-xs bg-black/20 px-1 rounded">transitionDuration</code></span>
              </li>
              <li class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Z-value constraints <code class="text-xs bg-black/20 px-1 rounded">minZ</code> & <code class="text-xs bg-black/20 px-1 rounded">maxZ</code></span>
              </li>
            </ul>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-white">Advanced Features</h3>
            <ul class="space-y-2 text-white/80">
                <li class="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Enhanced <code class="text-xs bg-black/20 px-1 rounded">getItemStyle()</code> with X/Y offsets and delays</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Per-element animation timing and easing</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Sequential animations with delay parameters</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Optimized performance with <code class="text-xs bg-black/20 px-1 rounded">will-change</code></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t border-white/10">
            <h3 class="text-lg font-semibold text-white mb-3">Component Implementation</h3>
            <p class="text-white/80 mb-4">
              The Enhanced3DCard component is a significant improvement over the original ReactiveExplicitZCard, addressing all of the limitations identified earlier. It provides a more customizable, robust interface for creating 3D card effects.
            </p>
            <div class="flex flex-wrap gap-4">
              <div class="flex-1 min-w-[200px]">
                <h4 class="text-sm font-semibold text-white mb-2">Product Card Example</h4>
                <pre class="bg-black/30 p-3 rounded-lg text-xs text-white/90 overflow-auto"><code>&lt;Enhanced3DCard
      hoverZScale={1.5}
      perspective={1200}
      maxRotation={8}
      transitionDuration={0.25}
    &gt;
      &lt;!-- Content --&gt;
    &lt;/Enhanced3DCard&gt;</code></pre>
              </div>
              <div class="flex-1 min-w-[200px]">
                <h4 class="text-sm font-semibold text-white mb-2">NFT Card Example</h4>
                <pre class="bg-black/30 p-3 rounded-lg text-xs text-white/90 overflow-auto"><code>&lt;Enhanced3DCard
      hoverZScale={2.2}
      perspective={1800}
      maxRotation={15}
      transitionDuration={0.35}
    &gt;
      &lt;!-- Content --&gt;
    &lt;/Enhanced3DCard&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      /* Make text crisper */
      h1, h2, h3, p, span, button {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      .text-sharp {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      
      /* Override any potential clipping issues */
      :global(.enhanced-card-wrapper),
      :global(.enhanced-card) {
        overflow: visible !important;
      }
      
      :global(.enhanced-card *) {
        transform-style: preserve-3d !important;
      }
      
      
    </style>