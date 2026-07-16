import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        unit: 'unit.html',
        water_and_sanitation: 'water_and_sanitation/index.html',
        water_and_sanitation_workbook: 'water_and_sanitation/workbook.html',
        water_and_sanitation_answers: 'water_and_sanitation/answer_key.html',
        great_war: 'great_war/index.html',
        great_war_workbook: 'great_war/workbook.html',
        great_war_answers: 'great_war/answer_key.html',
        great_war_part2: 'great_war_part2/index.html',
        great_war_part2_workbook: 'great_war_part2/workbook.html',
        great_war_part2_answers: 'great_war_part2/answer_key.html',
        change_1450_1750: 'change_1450_1750/index.html',
        eee: 'eee/index.html',
        change_1450_1750_workbook: 'change_1450_1750/workbook.html',
        change_1450_1750_answers: 'change_1450_1750/answer_key.html',
        cme_new: 'cme_new/index.html',
        cme_new_quiz_pack: 'cme_new/quiz_pack.html',
        cme_new_workbook: 'cme_new/workbook.html',
        cme_new_workbook_kt1: 'cme_new/workbook_KT1.html',
        cme_new_workbook_kt2: 'cme_new/workbook_KT2.html',
        cme_new_workbook_kt3: 'cme_new/workbook_KT3.html',
        cme_new_answers: 'cme_new/answer_key.html',
      }
    }
  },
  server: {
    port: 3001,
    open: true
  }
});
