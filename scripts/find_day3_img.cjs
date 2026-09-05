const fs = require('fs');

const files = [
  'temp_backups/trip_ypres_data.js.bak',
  'temp_backups/backup_1788552326792/data.js',
  'temp_backups/backup_1788552689245/trip_ypres_data.js',
];

files.forEach((p) => {
  if (fs.existsSync(p)) {
    const text = fs.readFileSync(p, 'utf8');
    const day3Idx = text.indexOf('"id": "day_3"');
    if (day3Idx !== -1) {
      const slice = text.slice(day3Idx, day3Idx + 10000);
      const m = slice.match(/src="([^"]+)"/g);
      console.log(p, 'matches:', m);
      const imgTags = slice.match(/<img[^>]+>/g);
      console.log(p, 'img tags:', imgTags);
    }
  }
});
