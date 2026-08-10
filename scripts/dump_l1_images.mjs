import { unitData } from '../early_modern_world/data.js';
const l1 = unitData.lessons[0];
l1.narrative_blocks.forEach((b, i) => {
  console.log(`\nBlock ${i}: ${b.title || 'No Title'}`);
  console.log('Source Letter:', b.source_letter || 'None');
  if (b.image) console.log(`  Image: ${b.image}`);
  if (b.images) b.images.forEach(img => console.log(`  Gallery Image: ${img.url} (Source: ${img.source_letter})`));
  if (b.text && b.text.includes('Source')) {
    console.log(`  Text mentions Source: Yes`);
  }
});
