import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://api:8000',  // This must match the service name in backend docker-compose.yml
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.log('=== PROXY ERROR ===');
            console.log('Error:', err.message);
            console.log('Request URL:', req.url);
            console.log('Request Method:', req.method);
            console.log('Request Headers:', req.headers);
            console.log('=== END PROXY ERROR ===');
            
            // If the response hasn't been sent yet, send a meaningful error
            if (!res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              
              const json = {
                error: 'proxy_error',
                message: 'Could not connect to the API server',
                details: err.message,
              };
              
              res.end(JSON.stringify(json));
            }
          });
          
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            // Log request headers for debugging
            console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
          });
          
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log(`Received Response from the Target: ${proxyRes.statusCode} ${req.url}`);
            // Log response headers for debugging
            console.log('Response Headers:', JSON.stringify(proxyRes.headers, null, 2));
            
            // Add more detailed logging for error responses
            if (proxyRes.statusCode >= 400) {
              console.log(`Error Response: ${proxyRes.statusCode} for ${req.url}`);
              let responseBody = '';
              
              proxyRes.on('data', (chunk) => {
                responseBody += chunk;
              });
              
              proxyRes.on('end', () => {
                try {
                  console.log('Error Response Body:', responseBody);
                } catch (e) {
                  console.log('Error parsing response body:', e.message);
                  console.log('Raw Response Body:', responseBody);
                }
              });
            }
          });
        },
      },
    },
  },
});