import { unitData } from './units/edexcel_medicine/data.js';

console.log('Groupings:', JSON.stringify(unitData.groupings, null, 2));

const medievalLessons = unitData.lessons.filter(
  (l) =>
    l.id.includes('medieval') ||
    l.category === 'Medieval' ||
    (unitData.groupings &&
      unitData.groupings.find((g) => g.id === 'medieval')?.lesson_ids.includes(l.id)),
);

if (medievalLessons.length === 0) {
  console.log(
    'Looking at first 10 lesson ids:',
    unitData.lessons.slice(0, 10).map((l) => l.id),
  );
} else {
  console.log(`Found ${medievalLessons.length} medieval lessons.`);
}
