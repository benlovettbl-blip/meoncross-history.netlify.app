import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function serviceWorkerVersionPlugin() {
  return {
    name: 'sw-version-stamper',
    closeBundle() {
      const swPath = path.resolve(process.cwd(), 'dist/sw.js');
      if (fs.existsSync(swPath)) {
        let swContent = fs.readFileSync(swPath, 'utf8');
        const buildTimestamp = Date.now();
        swContent = swContent.replace(
          /const CACHE_NAME = ['"][^'"]+['"];/,
          `const CACHE_NAME = 'history-hub-cache-v17-${buildTimestamp}';`,
        );
        swContent = swContent.replace(
          /const DYNAMIC_CACHE = ['"][^'"]+['"];/,
          `const DYNAMIC_CACHE = 'history-hub-dynamic-v17-${buildTimestamp}';`,
        );
        fs.writeFileSync(swPath, swContent, 'utf8');
        console.log(
          `[sw-version-stamper] Stamped dist/sw.js with build timestamp: ${buildTimestamp}`,
        );
      }
    },
  };
}

function localChessSyncPlugin() {
  let inMemoryState = null;
  return {
    name: 'local-chess-sync-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/.netlify/functions/chess_sync')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-teacher-passkey');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Content-Type', 'application/json');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            return res.end();
          }

          if (req.method === 'GET') {
            res.statusCode = 200;
            return res.end(JSON.stringify(inMemoryState || null));
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                inMemoryState = { ...data, syncedAt: Date.now() };
                res.statusCode = 200;
                return res.end(JSON.stringify({ success: true, syncedAt: inMemoryState.syncedAt }));
              } catch (e) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: e.message }));
              }
            });
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: '.',
  plugins: [serviceWorkerVersionPlugin(), localChessSyncPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  server: {
    port: 3003,
    host: true,
    open: true,
    watch: {
      ignored: ['**/public/assets/infographics/**', '**/dist/**', '**/dist2/**'],
    },
  },
});
