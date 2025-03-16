<script>
  import { fetchApi, getCsrfToken } from '$lib/utils/api';
  import { createEventDispatcher, onMount } from 'svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  const dispatch = createEventDispatcher();

  export let show = false;
  let categories = [];
  let loading = false;
  let error = '';
  let imagePreviewUrls = [];
  let selectedFiles = [];  // Store selected files here
  let fileInput;  // Reference to the file input element
  
  let formData = {
    title: '',
    category: '',
    description: '',
    starting_price: '',
    end_date: '',
    youtube_url: '',
  };

  onMount(async () => {
    try {
      const data = await fetchApi('categories/');
      categories = data.results || [];
    } catch (e) {
      error = 'Failed to load categories';
      console.error('Error loading categories:', e);
    }
  });

  // Handle image changes, but accumulate files instead of replacing
  function handleImageChange(event) {
    const newFiles = Array.from(event.target.files);
    console.log(`Selected ${newFiles.length} new images:`, newFiles.map(f => f.name));
    
    // Add new files to our selected files array
    selectedFiles = [...selectedFiles, ...newFiles];
    
    // Generate previews for new files
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviewUrls = [...imagePreviewUrls, e.target.result];
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input so the same file can be selected again if needed
    fileInput.value = '';
  }

  // Remove an image from the selection
  function removeImage(index) {
    selectedFiles = selectedFiles.filter((_, i) => i !== index);
    imagePreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
  }

  async function handleSubmit() {
    loading = true;
    error = '';

    try {
      if (selectedFiles.length === 0) {
        error = 'Please select at least one image';
        loading = false;
        return;
      }

      console.log(`Submitting form with ${selectedFiles.length} images`);

      // Step 1: Create the item without images first
      const csrfToken = await getCsrfToken();
      
      // Create a JSON object for the initial item creation
      const itemData = {
        title: formData.title,
        category_id: formData.category,
        description: formData.description,
        starting_price: formData.starting_price,
        end_date: formData.end_date,
        is_active: true,
        youtube_url: formData.youtube_url || ''
      };
      
      console.log('Submitting item data:', JSON.stringify(itemData));
      
      // First create the item
      let createResponse;
      try {
        createResponse = await fetchApi('items/', {
          method: 'POST',
          body: JSON.stringify(itemData),
        });
      } catch (err) {
        console.error('Error during item creation API call:', err);
        throw new Error(`Failed to create item: ${err.message}`);
      }
      
      console.log('Item creation response:', createResponse);
      
      // Check if we have an ID from the response - handle different response formats
      const itemId = createResponse.id || 
                    (createResponse.data && createResponse.data.id) || 
                    (typeof createResponse === 'object' && Object.keys(createResponse).length > 0 ? 
                      createResponse[Object.keys(createResponse)[0]] : null);
      
      if (!itemId) {
        console.error('No item ID found in response:', createResponse);
        throw new Error('Failed to create item: No item ID returned');
      }
      
      // Step 2: Now upload the images in a separate request
      const newItemId = itemId;
      console.log(`Item created with ID ${newItemId}, now uploading ${selectedFiles.length} images`);
      
      // Create form data for images
      const imageForm = new FormData();
      
      // Add each image to the form
      selectedFiles.forEach(file => {
        imageForm.append('images', file);
      });
      
      // Make a separate request for image uploads
      const uploadResponse = await fetch(`/api/items/${newItemId}/add_images/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: imageForm
      });
      
      console.log('Image upload response status:', uploadResponse.status);
      
      if (!uploadResponse.ok) {
        let errorData;
        try {
          errorData = await uploadResponse.json();
          console.error('Image upload error details:', errorData);
        } catch (e) {
          console.error('Could not parse upload error response');
        }
        throw new Error(errorData?.detail || `Failed to upload images: ${uploadResponse.status}`);
      }
      
      console.log('Images uploaded successfully');

      dispatch('itemAdded');
      show = false;
    } catch (e) {
      console.error('Detailed error:', e);
      error = e.message || 'Failed to create item';
    } finally {
      loading = false;
    }
  }
</script>

{#if show}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 overflow-y-auto">
    <div class="w-full max-w-xl rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto">
      <h2 class="mb-4 text-2xl font-bold">Add New Item</h2>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div>
          <label for="title" class="mb-1 block">Title</label>
          <input
            id="title"
            type="text"
            bind:value={formData.title}
            class="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label for="category" class="mb-1 block">Category</label>
          <select
            id="category"
            bind:value={formData.category}
            class="w-full rounded border p-2"
            required
          >
            <option value="">Select category...</option>
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="description" class="mb-1 block">Description</label>
          <textarea
            id="description"
            bind:value={formData.description}
            class="w-full rounded border p-2"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label for="starting_price" class="mb-1 block">Starting Price ($)</label>
          <input
            id="starting_price"
            type="number"
            bind:value={formData.starting_price}
            step="0.01"
            class="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label for="end_date" class="mb-1 block text-sm font-medium text-gray-700">
            End Date and Time
            <span class="ml-1 text-xs text-gray-500">(Click calendar icon to select)</span>
          </label>
          <input
            id="end_date"
            type="datetime-local"
            bind:value={formData.end_date}
            class="w-full cursor-pointer rounded border p-2 focus:ring-2 focus:ring-blue-500"
            step="any"
            required
            title="Click to open date and time picker"
          />
        </div>
        
        <div>
          <label for="youtube_url" class="mb-1 block text-sm font-medium text-gray-700">
            YouTube Video URL (Optional)
          </label>
          <input
            id="youtube_url"
            type="url"
            bind:value={formData.youtube_url}
            placeholder="https://www.youtube.com/watch?v=..."
            class="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="images" class="mb-1 block">Images</label>
          <input
            id="images"
            type="file"
            on:change={handleImageChange}
            bind:this={fileInput}
            multiple
            accept="image/*"
            class="w-full rounded border p-2"
          />
          
          {#if imagePreviewUrls.length > 0}
            <div class="mt-3">
              <p class="text-sm text-gray-500 mb-2">{imagePreviewUrls.length} image(s) selected</p>
              <div class="grid grid-cols-3 gap-2">
                {#each imagePreviewUrls as imageUrl, index}
                  <div class="relative rounded border">
                    <img src={imageUrl} alt="Preview" class="h-24 w-full object-cover rounded" />
                    <button 
                      type="button" 
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      on:click={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        {#if error}
          <p class="text-red-500">{error}</p>
        {/if}

        <div class="flex justify-end space-x-2">
          <button
            type="button"
            on:click={() => (show = false)}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Item'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}