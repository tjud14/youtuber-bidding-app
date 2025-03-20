<script>
    import Enhanced3DCard from '$lib/components/ui/3d-card/hybridcards/Enhanced3DCard.svelte';
    
    // Demo State
    let currentHoverCard = null;
    
    // More diverse Z-values to demonstrate greater depths
    const zValues = {
      background: -200,
      backgroundPattern: -170,
      cardBackground: -150,
      image: -50,
      glow: -45, // Move glow closer to image layer to ensure it's visible
      badge: 40,
      container: 30,
      title: 80,
      subtitle: 60,
      specs: 70,
      price: 100,
      button: 50,
      buttonIcon: 65
    };
    
    // Products to showcase
    const products = [
      {
        id: 'gaming-keyboard',
        name: 'HyperX Alloy Elite RGB',
        subtitle: 'Mechanical Gaming Keyboard',
        specs: ['Cherry MX Red Switches', 'RGB Per-Key Lighting', 'Full N-Key Rollover'],
        price: 129.99,
        originalPrice: 169.99,
        discount: '24% OFF',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2836&q=80',
        color: 'blue',
        glowColor: '#3b82f6',
        stock: 12
      },
      {
        id: 'gaming-mouse',
        name: 'Logitech G Pro X Superlight',
        subtitle: 'Wireless Gaming Mouse',
        specs: ['Ultra-Lightweight 63g', '25K DPI HERO Sensor', '70hr Battery Life'],
        price: 149.99,
        originalPrice: 159.99,
        discount: '6% OFF',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80',
        color: 'pink',
        glowColor: '#ec4899',
        stock: 8
      },
      {
        id: 'gaming-headset',
        name: 'SteelSeries Arctis Pro',
        subtitle: 'Wireless Gaming Headset',
        specs: ['Hi-Res Audio Certified', 'Dual-Wireless System', 'ClearCast Microphone'],
        price: 249.99,
        originalPrice: 329.99,
        discount: '24% OFF',
        image: 'https://images.unsplash.com/photo-1618329340733-fe6fb0fc2f34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
        color: 'green',
        glowColor: '#10b981',
        stock: 5
      }
    ];
    
    // Handle hover state changes with card-specific effects
    function handleHoverChange(productId, event) {
      if (event.detail.isHovering) {
        currentHoverCard = productId;
      } else if (currentHoverCard === productId) {
        currentHoverCard = null;
      }
    }
    
    // Format currency
    function formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    }
  </script>
  
  <div class="container mx-auto py-12 px-4 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-2 text-white">Gaming Hardware</h1>
    <p class="text-center mb-12 max-w-2xl mx-auto text-white/80">
      Featuring our enhanced 3D interactive cards with advanced layering and animation effects.
    </p>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each products as product}
        <div class="h-[480px] card-container">
          <Enhanced3DCard
            hoverZScale={2.5}
            initialScale={1}
            hoverScale={1.08}
            maxRotation={12}
            perspective={1800}
            transitionDuration={0.3}
            transitionEasing="cubic-bezier(0.23, 1, 0.32, 1)"
            cardStyle="border-radius: 1rem;"
            className="gaming-card"
            on:hoverchange={(e) => handleHoverChange(product.id, e)}
          >
            <svelte:fragment slot="default" let:isHovering let:getItemStyle>
              <!-- Base card with color gradients -->
              <div class="absolute inset-0 card-base"
                   style:transform={getItemStyle(zValues.cardBackground).transform}
                   style:transition={getItemStyle(zValues.cardBackground).transition}>
                <div class="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
              </div>
              
              <!-- Animated background pattern with parallax -->
              <div class="absolute inset-0 card-pattern"
                   style:transform={getItemStyle(zValues.backgroundPattern, {delay: 0.05}).transform}
                   style:transition={getItemStyle(zValues.backgroundPattern, {delay: 0.05}).transition}>
                <div class="w-full h-full pattern-dots opacity-10"></div>
              </div>
              
              <!-- Product image layer -->
              <div class="absolute inset-0 card-image"
                   style:transform={getItemStyle(zValues.image, {
                     xOffset: isHovering ? -5 : 0,
                     yOffset: isHovering ? -5 : 0,
                     customDuration: 0.6,
                     delay: 0.1
                   }).transform}
                   style:transition={getItemStyle(zValues.image, {
                     customDuration: 0.6,
                     delay: 0.1
                   }).transition}>
                <!-- Image -->
                <img 
                  src={product.image} 
                  alt={product.name}
                  class="w-full h-full object-cover brightness-90 contrast-110"
                />
                
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              <!-- Glow effect layer - IMPORTANT: Placed as a separate layer -->
              {#if isHovering}
                <div class="absolute inset-0 card-glow" 
                     style:transform={getItemStyle(zValues.glow).transform}
                     style:transition={getItemStyle(zValues.glow, {
                       customDuration: 0.8,
                       customEasing: 'cubic-bezier(0.19, 1, 0.22, 1)'
                     }).transition}>
                  <div class="w-full h-full" 
                       style="background: radial-gradient(circle at center, {product.glowColor} 0%, transparent 70%); 
                              opacity: 0.05; 
                              mix-blend-mode: screen;">
                  </div>
                </div>
              {/if}
              
              <!-- Discount Badge with pop effect -->
              {#if product.discount}
                <div style:transform={getItemStyle(zValues.badge, {
                       scale: isHovering ? 1.1 : 1,
                       customDuration: 0.4,
                       delay: 0.2
                     }).transform}
                     style:transition={getItemStyle(zValues.badge, {
                       customDuration: 0.4,
                       delay: 0.2
                     }).transition}
                     class="absolute top-6 right-6">
                  <span class="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-red-500/30">
                    {product.discount}
                  </span>
                </div>
              {/if}
              
              <!-- Stock indicator -->
              <div style:transform={getItemStyle(zValues.badge - 10, {
                     customDuration: 0.4,
                     delay: 0.25
                   }).transform}
                   style:transition={getItemStyle(zValues.badge - 10, {
                     customDuration: 0.4,
                     delay: 0.25
                   }).transition}
                   class="absolute top-6 left-6">
                <span class={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${product.stock < 10 ? 'bg-amber-500 text-white shadow-amber-500/30' : 'bg-green-500 text-white shadow-green-500/30'}`}>
                  {product.stock < 10 ? 'LOW STOCK' : 'IN STOCK'}
                </span>
              </div>
              
              <!-- Content container -->
              <div class="absolute inset-0 flex flex-col justify-end p-8"
                   style:transform={getItemStyle(zValues.container).transform}
                   style:transition={getItemStyle(zValues.container).transition}>
                
                <!-- Title with staggered animation -->
                <div style:transform={getItemStyle(zValues.title, {
                       xOffset: isHovering ? 5 : 0,
                       delay: 0.1
                     }).transform}
                     style:transition={getItemStyle(zValues.title, {
                       delay: 0.1
                     }).transition}
                     class="mb-1">
                  <h3 class="text-2xl font-bold text-white text-shadow-sharp">{product.name}</h3>
                </div>
                
                <!-- Subtitle with slightly different animation timing -->
                <div style:transform={getItemStyle(zValues.subtitle, {
                       xOffset: isHovering ? 8 : 0, 
                       delay: 0.15
                     }).transform}
                     style:transition={getItemStyle(zValues.subtitle, {
                       delay: 0.15
                     }).transition}
                     class="mb-4">
                  <p class="text-white/90 text-sm font-medium">
                    {product.subtitle}
                  </p>
                </div>
                
                <!-- Specs list with sequential reveal -->
                <div style:transform={getItemStyle(zValues.specs, {
                       yOffset: isHovering ? -3 : 0, 
                       delay: 0.2
                     }).transform}
                     style:transition={getItemStyle(zValues.specs, {
                       delay: 0.2
                     }).transition}
                     class="mb-5">
                  <ul class="space-y-1">
                    {#each product.specs as spec, i}
                      <li class="text-white/80 text-xs flex items-center gap-2" 
                          style="transition-delay: {0.2 + (i * 0.05)}s; opacity: {isHovering ? '1' : '0.7'}; transform: translateX({isHovering ? '0' : '-5px'}); transition: opacity 0.3s ease, transform 0.3s ease;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white/60" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        {spec}
                      </li>
                    {/each}
                  </ul>
                </div>
                
                <!-- Price with enhanced pop effect -->
                <div style:transform={getItemStyle(zValues.price, {
                       scale: isHovering ? 1.1 : 1, 
                       delay: 0.3
                     }).transform}
                     style:transition={getItemStyle(zValues.price, {
                       delay: 0.3,
                       customDuration: 0.4,
                     }).transition}
                     class="mb-5 flex items-end gap-2">
                  <div class="text-3xl font-bold text-white text-shadow-sharp">
                    {formatCurrency(product.price)}
                  </div>
                  {#if product.originalPrice}
                    <div class="text-lg text-white/60 line-through">
                      {formatCurrency(product.originalPrice)}
                    </div>
                  {/if}
                </div>
                
                <!-- Buttons with hover effects -->
                <div class="flex gap-3">
                  <!-- Add to cart button with enhanced hover -->
                  <div style:transform={getItemStyle(zValues.button, {
                         delay: 0.35
                       }).transform}
                       style:transition={getItemStyle(zValues.button, {
                         delay: 0.35
                       }).transition}
                       class="flex-1">
                    <button class="add-to-cart-btn w-full bg-gradient-to-r 
                            from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                            text-white px-4 py-3 rounded-lg text-sm font-semibold 
                            shadow-xl hover:shadow-blue-500/40 
                            transition-all duration-300 ease-out">
                      Add to Cart
                    </button>
                  </div>
                  
                  <!-- Wishlist button with icon pop -->
                  <div style:transform={getItemStyle(zValues.button - 20, {
                         delay: 0.4
                       }).transform}
                       style:transition={getItemStyle(zValues.button - 20, {
                         delay: 0.4
                       }).transition}
                       class="wishlist-btn-container w-14">
                    <button class="wishlist-btn w-full h-full bg-white/10 hover:bg-white/20 
                             text-white rounded-lg flex items-center justify-center 
                             border border-white/20 hover:border-white/30
                             transition-all duration-300 ease-out">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 heart-icon" fill={isHovering ? "rgba(255,100,100,0.8)" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </svelte:fragment>
          </Enhanced3DCard>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    :global(body) {
      background-color: #0f172a;
      color: white;
      min-height: 100vh;
    }
    
    .text-shadow-sharp {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    
    /* Card container */
    .card-container {
      perspective: 1500px;
      transform-style: preserve-3d;
    }
    
    /* Card layer styles with proper border radius */
    .card-base, .card-pattern, .card-image, .card-glow {
      border-radius: 1rem;
      overflow: hidden;
    }
    
    /* Make text crisper */
    h1, h2, h3, p, span, button {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Button hover effects */
    .add-to-cart-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
    }
    
    .wishlist-btn:hover .heart-icon {
      transform: scale(1.2);
    }
    
    .heart-icon {
      transition: transform 0.3s ease, fill 0.3s ease;
    }
    
    /* Dot pattern background */
    .pattern-dots {
      background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
      background-size: 20px 20px;
    }
    
    /* Fix 3D transforms */
    :global(.gaming-card),
    :global(.enhanced-card) {
      border-radius: 1rem;
    }
    
    :global(.gaming-card *),
    :global(.enhanced-card *) {
      transform-style: preserve-3d !important;
    }
  
    /* Critical fix: Ensure the Enhanced3DCard component wrapper is properly styled */
    :global(.enhanced-card-wrapper) {
      border-radius: 1rem !important;
    }
    
    /* Add smooth transitions for list items */
    li {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    
    

  </style>