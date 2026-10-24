const fs = require('fs');

async function main() {
  const mod = await import('../public/units/usa/data.js');
  const usa = mod.usa;
  console.log('Total lessons:', usa.lessons.length);
  usa.lessons.forEach((l, idx) => {
    const str = JSON.stringify(l);
    const regex = /["']([^"']+\.(?:jpg|png|webp))["']/gi;
    let m;
    const images = [];
    while ((m = regex.exec(str)) !== null) {
      images.push(m[1]);
    }
    console.log(`Lesson ${idx + 1} (${l.id}) images count: ${images.length}`);
    if (images.length > 0) {
      console.log('   Images:', images);
    }
  });
}

main().catch(console.error);
