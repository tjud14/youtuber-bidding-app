<script>
    import { onMount, onDestroy } from 'svelte';
    import { fetchApi } from '$lib/utils/api';
    import Chart from '$lib/utils/chartUtils';  // Import our custom Chart module

    let timeRange = '30days';
    let isLoading = true;
    let error = null;
    
    // Canvas references
    let pageViewsCanvas;
    let registrationsCanvas;
    let hourlyUsersCanvas;
    let categoryCanvas;
    
    // Chart instances
    let charts = {};
    
    // Data states
    let pageViewsData = [];
    let userRegistrationsData = [];
    let activeUsersByHour = [];
    let categoryData = [];
    let topItemsData = [];
    let totalViews = 0;
    let totalBids = 0;
    let totalRevenue = 0;
    let totalRegistrations = 0;
    let conversionRate = 0;
  
    // Generate sample data for the dashboard
    function generateSampleData() {
      // Page Views Over Time
      pageViewsData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1}/2`,
        views: Math.floor(Math.random() * 500) + 1000,
      }));
  
      // User Registrations
      userRegistrationsData = Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1}/2`,
        registrations: Math.floor(Math.random() * 20) + 5,
      }));
  
      // Active Users by Hour
      activeUsersByHour = Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        users: Math.floor(Math.random() * 50) + 10,
      }));
  
      // Category Distribution
      categoryData = [
        { name: 'Knives', value: 45 },
        { name: 'Paintings', value: 30 },
        { name: 'Misc', value: 25 },
      ];
  
      // Top Items by Bids
      topItemsData = [
        { name: 'Alaskan Hunting Knife', bids: 28, views: 342, currentPrice: 1250 },
        { name: 'Northern Lights Painting', bids: 24, views: 289, currentPrice: 950 },
        { name: 'Vintage Gold Rush Tools', bids: 19, views: 251, currentPrice: 700 },
        { name: 'Handcrafted Cedar Box', bids: 17, views: 213, currentPrice: 450 },
        { name: 'Alaska Map from 1920', bids: 15, views: 198, currentPrice: 380 },
      ];
  
      // Calculate totals and metrics
      totalViews = pageViewsData.reduce((sum, item) => sum + item.views, 0);
      totalBids = topItemsData.reduce((sum, item) => sum + item.bids, 0);
      totalRevenue = 27600; // Placeholder value
      totalRegistrations = userRegistrationsData.reduce((sum, item) => sum + item.registrations, 0);
      conversionRate = ((totalBids / totalViews) * 100).toFixed(2);
    }
  
    async function fetchDashboardData() {
      try {
        isLoading = true;
        
        // In a real implementation, this would fetch from your API
        // For demo purposes, we'll just generate sample data
        generateSampleData();
        
        isLoading = false;
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        error = 'Failed to load dashboard data';
        isLoading = false;
      }
    }
  
    function setTimeRangeValue(value) {
      timeRange = value;
      fetchDashboardData();
      
      // Clean up existing charts
      Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
      });
      charts = {};
      
      // Draw new charts
      setTimeout(() => {
        initCharts();
      }, 100);
    }
    
    function initCharts() {
      try {
        // Only proceed if the DOM elements exist
        if (!pageViewsCanvas || !registrationsCanvas || !hourlyUsersCanvas || !categoryCanvas) {
          console.error('Canvas elements not found in DOM');
          return;
        }
        
        // Draw page views chart
        charts.pageViews = new Chart(pageViewsCanvas, {
          type: 'line',
          data: {
            labels: pageViewsData.map(item => item.date),
            datasets: [{
              label: 'Page Views',
              data: pageViewsData.map(item => item.views),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        // Draw registrations chart
        charts.registrations = new Chart(registrationsCanvas, {
          type: 'bar',
          data: {
            labels: userRegistrationsData.map(item => item.date),
            datasets: [{
              label: 'New Registrations',
              data: userRegistrationsData.map(item => item.registrations),
              backgroundColor: 'rgba(153, 102, 255, 0.5)'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        // Draw hourly users chart
        charts.hourlyUsers = new Chart(hourlyUsersCanvas, {
          type: 'bar',
          data: {
            labels: activeUsersByHour.map(item => item.hour),
            datasets: [{
              label: 'Active Users',
              data: activeUsersByHour.map(item => item.users),
              backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        // Draw category chart
        charts.category = new Chart(categoryCanvas, {
          type: 'pie',
          data: {
            labels: categoryData.map(item => item.name),
            datasets: [{
              data: categoryData.map(item => item.value),
              backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      } catch (err) {
        console.error('Error creating charts:', err);
        error = `Failed to create charts: ${err.message}`;
      }
    }
  
    onMount(async () => {
      await fetchDashboardData();
      
      // Wait for the DOM to be ready before initializing charts
      setTimeout(() => {
        initCharts();
      }, 100);
    });
    
    onDestroy(() => {
      // Clean up chart instances
      Object.values(charts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
          chart.destroy();
        }
      });
    });
</script>

<div class="min-h-screen bg-gray-100 p-6">
  <!-- Header with Back button -->
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
      <p class="text-gray-600">Overview of auction performance and user engagement</p>
    </div>
    
    <a href="/admin" class="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
      Back to Admin
    </a>
  </div>

  <!-- Time range selector -->
  <div class="mb-6">
    <div class="flex space-x-2">
      <button
        class={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === '7days' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        on:click={() => setTimeRangeValue('7days')}
      >
        Last 7 Days
      </button>
      <button
        class={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === '30days' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        on:click={() => setTimeRangeValue('30days')}
      >
        Last 30 Days
      </button>
      <button
        class={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === '90days' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        on:click={() => setTimeRangeValue('90days')}
      >
        Last 90 Days
      </button>
      <button
        class={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        on:click={() => setTimeRangeValue('year')}
      >
        Last Year
      </button>
    </div>
  </div>

  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <div class="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="ml-2">Loading dashboard data...</p>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{error}</p>
    </div>
  {:else}
    <!-- KPI metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Page Views</p>
            <p class="text-2xl font-bold mt-1">{totalViews.toLocaleString()}</p>
            <p class="flex items-center text-sm mt-1 text-green-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12.5%
            </p>
          </div>
          <div class="bg-blue-100 p-2 rounded-md">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">New User Registrations</p>
            <p class="text-2xl font-bold mt-1">{totalRegistrations}</p>
            <p class="flex items-center text-sm mt-1 text-green-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              8.3%
            </p>
          </div>
          <div class="bg-blue-100 p-2 rounded-md">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Total Bids Placed</p>
            <p class="text-2xl font-bold mt-1">{totalBids}</p>
            <p class="flex items-center text-sm mt-1 text-green-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              5.2%
            </p>
          </div>
          <div class="bg-blue-100 p-2 rounded-md">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Revenue</p>
            <p class="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</p>
            <p class="flex items-center text-sm mt-1 text-green-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              15.8%
            </p>
          </div>
          <div class="bg-blue-100 p-2 rounded-md">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row 1 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="font-semibold text-gray-700 mb-4">Page Views Over Time</h3>
        <div class="h-64 relative">
          <canvas bind:this={pageViewsCanvas}></canvas>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="font-semibold text-gray-700 mb-4">User Registrations</h3>
        <div class="h-64 relative">
          <canvas bind:this={registrationsCanvas}></canvas>
        </div>
      </div>
    </div>
    
    <!-- Charts Row 2 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="font-semibold text-gray-700 mb-4">Active Users by Hour</h3>
        <div class="h-64 relative">
          <canvas bind:this={hourlyUsersCanvas}></canvas>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="font-semibold text-gray-700 mb-4">Category Distribution</h3>
        <div class="h-64 relative">
          <canvas bind:this={categoryCanvas}></canvas>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-md">
        <h3 class="font-semibold text-gray-700 mb-4">Conversion Rate</h3>
        <div class="flex items-center justify-center h-64">
          <div class="text-center">
            <p class="text-4xl font-bold text-blue-500">{conversionRate}%</p>
            <p class="mt-2 text-gray-500">View to Bid Conversion</p>
            <div class="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-600 h-2.5 rounded-full" style="width: {Math.min(parseFloat(conversionRate) * 5, 100)}%"></div>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              {parseFloat(conversionRate) > 3 ? 'Above Average' : 'Below Average'}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Items Table -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 class="font-semibold text-gray-700 mb-4">Top Items by Bids</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bids</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each topItemsData as item, index}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bids}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.currentPrice}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {((item.bids / item.views) * 100).toFixed(2)}%
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>