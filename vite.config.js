import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/Landing-page/',
  server: {
    host: true,
  },
  // Dev-only mock endpoint for /api/fusionsuite/create to avoid 404 during local development.
  // This returns a minimal JSON response for POST requests. Remove or replace with a proxy to
  // your real backend in production.
  plugins: [react(), {
    name: 'vite:mock-fusionsuite',
    configureServer(server) {
      if (process.env.NODE_ENV === 'production') return;
      const { middlewares } = server;
      middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/fusionsuite/create') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const mockResponse = { success: true, id: 'mock-suite-123', payload: parsed };
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(mockResponse));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'invalid json' }));
            }
          });
          return;
        }
        next();
      });
    }
  }],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
})
