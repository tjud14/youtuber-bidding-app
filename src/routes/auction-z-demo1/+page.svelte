<script>
    import ReactiveExplicitZCard from '$lib/components/ui/3d-card/hybridcards/ReactiveExplicitZCard.svelte';
    
    // Demo State
    let currentHoverCard = null;
    
    // Conservative Z-values that work well
    const zValues = {
      background: -100,
      image: -40,
      overlay: -20,
      container: 20,
      title: 60,
      description: 45,
      price: 80,
      photographer: 40,
      button: 25,
      badge: 30
    };
    
    // Hover multiplier
    const hoverScale = 1.8;
    
    // Card configuration with Alaska landscapes
    const cards = [
      {
        id: 'kachemak',
        name: 'Kachemak Bay, Alaska',
        description: 'Spring morning view of turquoise waters and pine forests. Museum-quality print on archival paper.',
        price: 1250,
        image: 'https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        photographer: 'Michael Stevens',
        printNumber: '3/25',
        bids: 12,
        timeRemaining: '2d 8h'
      },
      {
        id: 'denali',
        name: 'Denali National Park',
        description: 'Dramatic winter landscape with snow-capped mountains. Limited edition panoramic print.',
        price: 1850,
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        photographer: 'Sarah Johnson',
        printNumber: '2/20',
        bids: 18,
        timeRemaining: '1d 12h'
      },
      {
        id: 'glacier',
        name: 'Mendenhall Glacier',
        description: 'Pristine blue ice formations captured during golden hour. Framable art print on metal.',
        price: 980,
        image: 'https://images.unsplash.com/photo-1568179048584-78a4f43a4059?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        photographer: 'Robert Chen',
        printNumber: '5/30',
        bids: 8,
        timeRemaining: '6h 15m'
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
    function formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
  </script>
  
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-center mb-4">Alaska Landscapes Auction</h1>
    <p class="text-center mb-10 max-w-2xl mx-auto">
      Exclusive collection of limited edition prints showcasing the majestic beauty of Alaska.
    </p>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each cards as card}
        <div class="h-[500px] card-container">
          <ReactiveExplicitZCard
            hoverZScale={hoverScale}
            initialScale={1}
            hoverScale={1.1}
            cardStyle="border-radius: 0.75rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0);"
            on:hoverchange={(e) => handleHoverChange(card.id, e)}
          >
            <svelte:fragment slot="default" let:isHovering let:getItemStyle>
              <!-- Background image with negative Z -->
              <div class="absolute inset-0 rounded-xl"
                   style:transform={getItemStyle(zValues.background).transform}
                   style:transition={getItemStyle(zValues.background).transition}>
                <div class="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800"></div>
              </div>
              
              <!-- Image layer (-40) -->
              <div class="absolute inset-0 rounded-xl"
                   style:transform={getItemStyle(zValues.image).transform}
                   style:transition={getItemStyle(zValues.image).transition}>
                <img 
                  src={card.image} 
                  alt={card.name}
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              
              <!-- Limited Edition Badge (90) -->
              <div style:transform={getItemStyle(zValues.badge).transform}
                   style:transition={getItemStyle(zValues.badge).transition}
                   class="absolute top-6 left-6">
                <span class="bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
                  LIMITED EDITION
                </span>
              </div>
              
              <!-- Print Number (90) -->
              <div style:transform={getItemStyle(zValues.badge).transform}
                   style:transition={getItemStyle(zValues.badge).transition}
                   class="absolute top-6 right-6">
                <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30">
                  PRINT {card.printNumber}
                </span>
              </div>
              
              <!-- Content overlay -->
              <div class="absolute inset-0 flex flex-col justify-end p-8">
                <!-- Title (60) -->
                <div style:transform={getItemStyle(zValues.title).transform}
                     style:transition={getItemStyle(zValues.title).transition}
                     class="mb-2">
                  <h3 class="text-2xl font-bold text-white text-shadow">{card.name}</h3>
                </div>
                
                <!-- Description (45) -->
                <div style:transform={getItemStyle(zValues.description).transform}
                     style:transition={getItemStyle(zValues.description).transition}
                     class="mb-4">
                  <p class="text-white/90 text-sm">
                    {card.description}
                  </p>
                </div>
                
                <!-- Price (80) -->
                <div style:transform={getItemStyle(zValues.price).transform}
                     style:transition={getItemStyle(zValues.price).transition}
                     class="mb-4">
                  <div class="text-3xl font-bold text-white text-shadow">${card.price}</div>
                </div>
                
                <!-- Photographer info (40) -->
                <div style:transform={getItemStyle(zValues.photographer).transform}
                     style:transition={getItemStyle(zValues.photographer).transition}
                     class="mb-6">
                  <div class="flex items-center gap-2 text-white/80 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Photographed by {card.photographer}</span>
                  </div>
                </div>
                
                <!-- Buttons (100) -->
                <div class="flex gap-3">
                  <div style:transform={getItemStyle(zValues.button).transform}
                       style:transition={getItemStyle(zValues.button).transition}
                       class="flex-1">
                    <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-xl hover:shadow-blue-500/20 transition-all duration-200">
                      Acquire Now
                    </button>
                  </div>
                  
                  <div style:transform={getItemStyle(zValues.button - 35).transform}
                       style:transition={getItemStyle(zValues.button - 35).transition}
                       class="w-14">
                    <button class="w-full h-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg flex items-center justify-center border border-white/30">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </svelte:fragment>
          </ReactiveExplicitZCard>
        </div>
      {/each}
    </div>
    
    <!-- Implementation notes -->
    <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-3xl mx-auto">
      <h2 class="text-xl font-bold mb-4">About Our Fine Art Photography</h2>
      <p class="mb-4">Each photograph in our collection is carefully selected to showcase the breathtaking landscapes of Alaska. Our limited edition prints are produced using museum-quality materials and techniques to ensure exceptional quality and longevity.</p>
      <p>Every print is individually numbered and includes a certificate of authenticity signed by the photographer.</p>
    </div>
  </div>
  
  <style>
    :global(body) {
      background-color: #0f172a;
      color: white;
      min-height: 100vh;
    }
    
    .text-shadow {
    text-shadow: 0 2px 4px rgba(21, 22, 22, 0.2);
  }
    
    /* Fix 3D clipping issues */
    .card-container {
      perspective: 1500px;
      transform-style: preserve-3d;
    }
    
    /* Force 3D Context with CSS */
    :global(.explicit-card-wrapper),
    :global(.explicit-card) {
      overflow: visible !important;
    }
    
    :global(.explicit-card-wrapper *),
    :global(.explicit-card *) {
      transform-style: preserve-3d !important;
    }
    
    /* Fix specific content containers that might have overflow:hidden */
    :global(.explicit-card .absolute) {
      overflow: visible !important;
    }
  </style>