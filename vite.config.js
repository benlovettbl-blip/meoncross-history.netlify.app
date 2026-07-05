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
        eee: 'eee/index.html',
        water_and_sanitation: 'water_and_sanitation/index.html'
      }
    }
  },
  server: {
    port: 3001,
    open: true
  }
});
