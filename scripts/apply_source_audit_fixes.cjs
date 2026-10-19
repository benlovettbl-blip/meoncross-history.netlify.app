const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const assetsDir = path.join(baseDir, 'public', 'units', 'ks2_ww2', 'assets');

const wintonPhotoPath = path.join(assetsDir, 'winton_scrapbook_children_photos.jpg');
const wintonPhotoBuf = fs.readFileSync(wintonPhotoPath);
const wintonBase64 = `data:image/jpeg;base64,${wintonPhotoBuf.toString('base64')}`;

const dirs = [
  path.join(baseDir, 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(baseDir, 'units', 'ks2_ww2', 'worksheets'),
];

dirs.forEach((dir) => {
  console.log(`Processing directory: ${dir}`);

  // 1. Update Lesson 09
  const l9Path = path.join(dir, 'lesson_09_rescuers_winton_worksheet.html');
  if (fs.existsSync(l9Path)) {
    let content = fs.readFileSync(l9Path, 'utf8');

    // Replace img tag inside .tag-container
    content = content.replace(
      /<div class="tag-container">\s*<img\s+src="[^"]*"\s+class="tag-img"[^>]*>/,
      `<div class="tag-container">\n            <img src="${wintonBase64}" class="tag-img" alt="Nicholas Winton scrapbook page showing children photographs and placed cards">`,
    );

    // Replace caption
    content = content.replace(
      /<p class="tag-caption"><strong>Source B:<\/strong>[\s\S]*?<\/p>/,
      `<p class="tag-caption"><strong>Source B:</strong> Authentic scrapbook document compiled by Nicholas Winton showing passport-style photographs of Czech children (left) alongside their typed index ledger (right) marked with "placed" stamps once foster families were secured. <em>(Yad Vashem Archive)</em></p>`,
    );

    // Replace questions
    content = content.replace(
      /<p class="q-item">1\. Look at Source B\. Why did Nicholas Winton keep such meticulous records[\s\S]*?<\/p>/,
      `<p class="q-item">1. Look closely at Source B. Notice the children's portrait photographs on the left and the typed names marked "placed" on the right. Why was it vital for Nicholas Winton to keep a photograph and index card for every single child?</p>`,
    );

    content = content.replace(
      /<p class="q-item">2\. How does Source B prove that rescue required hard, practical teamwork[\s\S]*?<\/p>/,
      `<p class="q-item">2. How does this detailed filing system prove that saving 669 children required complex administrative organisation, rather than just good intentions?</p>`,
    );

    fs.writeFileSync(l9Path, content, 'utf8');
    console.log('✅ Updated Lesson 09 in ' + dir);
  }

  // 2. Update Lesson 01
  const l1Path = path.join(dir, 'lesson_01_outbreak_gasmasks_worksheet.html');
  if (fs.existsSync(l1Path)) {
    let content = fs.readFileSync(l1Path, 'utf8');

    // Update Task 1 title
    content = content.replace(
      /Task 1: Artifact Detective • The Civilian Respirator Box/,
      `Task 1: Artifact Detective • The Civilian Gas Mask`,
    );

    // Update caption
    content = content.replace(
      /<p class="artifact-caption"><strong>Source B:<\/strong>[\s\S]*?<\/p>/,
      `<p class="artifact-caption"><strong>Source B:</strong> Authentic 1939 British civilian respirator showing the moulded black rubber facepiece, celluloid viewing visor, and cylindrical filter canister with perforated metal inlet. <em>(Auckland War Memorial Museum AM 1995.59.20)</em></p>`,
    );

    // Update Question 1
    content = content.replace(
      /<p class="q-item">1\. Look closely at Source B\. Why did the government give children cardboard boxes with string straps[\s\S]*?<\/p>/,
      `<p class="q-item">1. Look closely at Source B. How did the rubber facepiece and filter canister protect ordinary civilians from poison gas, and why did the British government issue over 38 million of these masks in 1939?</p>`,
    );

    // Update Question 2
    content = content.replace(
      /<p class="q-item">2\. Comparing Source A and Source B, what does having to carry a gas mask to school every single day tell us about how the threat of war changed ordinary childhood overnight\?<\/p>/,
      `<p class="q-item">2. Comparing Source A and Source B, what does having to wear these rubber respirators in school gas-mask drills tell us about how the fear of aerial bombing changed daily childhood?</p>`,
    );

    fs.writeFileSync(l1Path, content, 'utf8');
    console.log('✅ Updated Lesson 01 in ' + dir);
  }
});

console.log('All updates complete.');
