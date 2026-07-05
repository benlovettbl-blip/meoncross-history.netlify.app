import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        usa: 'usa/index.html',
        cme: 'cme/index.html',
        eee: 'eee/index.html'
      }
    }
  },
  server: {
    port: 3001,
    open: true
  }
});
