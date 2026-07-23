import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        unit: 'unit.html'
      }
    }
  },
  server: {
    port: 3001,
    open: true,
    watch: {
      ignored: ['**/public/assets/infographics/**']
    }
  }
});
