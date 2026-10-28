const fs = require('fs');

const files = [
  'data/edexcel_medicine.json',
  'public/data/edexcel_medicine.json',
  'units/edexcel_medicine/data.js',
  'public/units/edexcel_medicine/data.js',
  'database.json',
  'public/database.json',
  'public/visual_audit_gallery.html'
];

const oldCaption = "Robert Koch's Microscopic Plate (1882): By utilizing methyl violet chemical dyes and solid agar jelly growth mediums, Koch isolated the specific rod-shaped bacterium Mycobacterium tuberculosis, definitively linking one microbe to one specific human disease.";
const newCaption = "Dr Robert Koch in his Berlin Laboratory (c. 1885): Koch transformed microbiology through four innovations: isolating pure bacterial colonies in flat glass Petri dishes using solid nutrient agar, staining transparent microbes with synthetic industrial aniline dyes, and examining specimen slides with precision oil-immersion Zeiss microscopes.";

files.forEach((f) => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.split('/images/koch_plate_439.jpg').join('/images/robert_koch_laboratory.jpg');
    content = content.split('koch_plate_439.jpg').join('robert_koch_laboratory.jpg');
    content = content.split(oldCaption).join(newCaption);
    fs.writeFileSync(f, content, 'utf8');
    console.log('✅ Updated', f);
  }
});
