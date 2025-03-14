import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  try {
    const id = params.id;
    
    // Try both endpoints in parallel to improve performance
    const [paintRes, itemRes] = await Promise.allSettled([
      fetch(`/api/paint/${id}/`, { credentials: 'include' }),
      fetch(`/api/items/${id}/`, { credentials: 'include' })
    ]);
    
    // Check if paint endpoint succeeded
    if (paintRes.status === 'fulfilled' && paintRes.value.ok) {
      const data = await paintRes.value.json();
      return { item: data };
    }
    
    // Check if generic endpoint succeeded
    if (itemRes.status === 'fulfilled' && itemRes.value.ok) {
      const data = await itemRes.value.json();
      
      // Verify this is actually a PAINT item
      if (data.category?.code !== 'PAINT') {
        console.warn(`Item ${id} is not a PAINT item: ${data.category?.code}`);
      }
      
      return { item: data };
    }
    
    // If we get here, both failed
    throw new Error('Could not load item data from either endpoint');
  } catch (e) {
    console.error('[+page.js] Error in load function:', e);
    throw error(404, {
      message: 'Item not found',
      detail: e.message
    });
  }
}