const fs = require('fs');

// We can inspect the lesson objects of trip_ypres
import('../units/trip_ypres/data.js').then((m) => {
  const lessons = m.unitData.lessons;
  lessons.forEach((l, idx) => {
    console.log(`\n=== Lesson ${idx}: ${l.id} (${l.title}) ===`);
    console.log('do_now events:', l.do_now?.events?.length);
    console.log('sources:', l.sources?.length);
    console.log('primary_source:', !!l.primary_source);
    console.log('historians_corner:', !!l.historians_corner);
    console.log('pair_share:', !!l.pair_share);
    console.log('tasks:', l.tasks?.length);
    console.log('extended:', !!l.extended);
    console.log('utility_starters:', !!l.utility_starters);
  });
});
