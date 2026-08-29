const fs = require('fs');
let data = fs.readFileSync('public/units/trip_ypres/data.js', 'utf8');

// Replace Hooge Crater Map
data = data.replace(
  "src='/images/placeholder.jpg' style='max-width: 100%; border-radius: 6px; border: 1px solid #ccc;' alt='Hooge Crater'",
  "src='/images/hooge_crater_trench.png' style='max-width: 100%; border-radius: 6px; border: 1px solid #ccc;' alt='Hooge Crater'"
);

// Replace Ypres Salient Map
data = data.replace(
  "src='/images/placeholder.jpg' style='max-width: 100%; border-radius: 6px; border: 1px solid #ccc;' alt='Ypres Salient Map'",
  "src='/images/ypres_salient_map_new.png' style='max-width: 100%; border-radius: 6px; border: 1px solid #ccc;' alt='Ypres Salient Map'"
);

fs.writeFileSync('public/units/trip_ypres/data.js', data);
console.log('Successfully replaced both image placeholders.');
