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
        water_and_sanitation: 'water_and_sanitation/index.html',
        great_war: 'great_war/index.html',
        great_war_part2: 'great_war_part2/index.html',
        norman_conquest: 'norman_conquest/index.html',
        change_1450_1750: 'change_1450_1750/index.html'
      }
    }
  },
  server: {
    port: 3001,
    open: true
  }
});

