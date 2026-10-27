const fs = require('fs');

const med = JSON.parse(fs.readFileSync('data/edexcel_medicine.json', 'utf8'));

// 1. Ensure lesson fields
for (const l of med.lessons) {
  if (l.id === 'lesson_2_5') {
    l.banner = '/images/great_plague_1665_broadside.jpg';
    l.card_image = '/images/great_plague_1665_broadside.jpg';
    l.hero_image = '/images/great_plague_1665_broadside.jpg';
    l.banner_position = 'center 25%';
    l.card_position = 'center 25%';
  }
  if (l.id === 'lesson_3_1') {
    l.banner = '/images/pasteur_laboratory.jpg';
    l.card_image = '/images/pasteur_laboratory.jpg';
    l.hero_image = '/images/pasteur_laboratory.jpg';
    l.banner_position = 'center 20%';
    l.card_position = 'center 20%';
  }
  if (l.id === 'lesson_3_2') {
    l.banner = '/images/edward_jenner.jpg';
    l.card_image = '/images/edward_jenner.jpg';
    l.hero_image = '/images/edward_jenner.jpg';
    l.banner_position = 'center 15%';
    l.card_position = 'center 15%';
  }
}

// 2. Normalize narrative blocks and sources
for (const l of med.lessons) {
  l.enquiry_question = l.enquiry_question || l.inquiry_question || '';
  l.inquiry_question = l.inquiry_question || l.enquiry_question || '';
  if (Array.isArray(l.narrative_blocks)) {
    for (const b of l.narrative_blocks) {
      if (!b.text && b.content) b.text = b.content;
      if (!b.content && b.text) b.content = b.text;
      if (!b.theme_heading && (b.theme || b.title)) b.theme_heading = b.theme || b.title;
      if (!b.theme && b.theme_heading) b.theme = b.theme_heading;
      if (!b.title && b.theme_heading) b.title = b.theme_heading;
      if (Array.isArray(b.sources)) {
        for (const s of b.sources) {
          if (!s.text && s.content) s.text = s.content;
          if (!s.content && s.text) s.content = s.text;
          if (!s.question && s.enquiry_question) s.question = s.enquiry_question;
          if (!s.enquiry_question && s.question) s.enquiry_question = s.question;
        }
      }
    }
  }
  if (Array.isArray(l.sources)) {
    for (const s of l.sources) {
      if (!s.text && s.content) s.text = s.content;
      if (!s.content && s.text) s.content = s.text;
      if (!s.question && s.enquiry_question) s.question = s.enquiry_question;
      if (!s.enquiry_question && s.question) s.enquiry_question = s.question;
    }
  }
}

// Save JSONs
fs.writeFileSync('data/edexcel_medicine.json', JSON.stringify(med, null, 2), 'utf8');
fs.writeFileSync('public/data/edexcel_medicine.json', JSON.stringify(med, null, 2), 'utf8');

// Save JS files
const jsCode = 'const edexcel_medicine_data = ' + JSON.stringify(med, null, 2) + ';\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = edexcel_medicine_data;\n}\nexport default edexcel_medicine_data;\n';
fs.writeFileSync('units/edexcel_medicine/data.js', jsCode, 'utf8');
fs.writeFileSync('public/units/edexcel_medicine/data.js', jsCode, 'utf8');

// Save database.json and public/database.json
function updateDb(path) {
  const db = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (db.edexcel_medicine) {
    db.edexcel_medicine.data = med;
    db.edexcel_medicine.homepage_background = '/images/vesalius_muscle_men.jpg';
    db.edexcel_medicine.cover_image = '/images/vesalius_muscle_men.jpg';
  }
  fs.writeFileSync(path, JSON.stringify(db, null, 2), 'utf8');
  console.log('Saved', path);
}

updateDb('database.json');
updateDb('public/database.json');
console.log('All 6 files synchronized!');
