import { unitData } from './great_war_v2/data.js';

unitData.lessons.forEach((l, i) => {
  if (l.do_now.type === 'questions') {
    console.log(`\nLesson ${i + 1}:`);
    l.do_now.items.forEach(item => {
      console.log(`Q: ${item.question}`);
      console.log(`A: ${item.answer}`);
    });
  }
});
