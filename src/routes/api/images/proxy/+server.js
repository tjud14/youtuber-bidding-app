import { error } from '@sveltejs/kit';

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ url, fetch }) {
  try {
    // Get the image URL from the query parameter
    const imageUrl = url.searchParams.get('url');
    const cacheKey = url.searchParams.get('cache');
    
    if (!imageUrl) {
      throw error(400, 'Missing image URL parameter');
    }
    
    console.log(`Fetching image: ${imageUrl}`);
    
    // Fetch the image
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw error(response.status, `Failed to fetch image: ${response.statusText}`);
    }
    
    // Get the image data and content type
    const imageData = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Return the image with appropriate headers
    return new Response(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=604800', // Cache for 1 week
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    console.error('Error proxying image:', err);
    throw error(500, 'Failed to proxy image');
  }
}