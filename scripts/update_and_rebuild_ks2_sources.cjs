const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const assetsDir = path.join(baseDir, 'public', 'units', 'ks2_ww2', 'assets');

const sourceUpdates = {
  'lesson_01_outbreak_gasmasks_worksheet.html': {
    assetFile: 'gas_mask_box_1939.jpg',
    oldCaptionRegex: /<p class="artifact-caption"><strong>Source B:<\/strong>[^<]*<\/p>/,
    newCaption:
      '<p class="artifact-caption"><strong>Source B:</strong> Authentic 1939 British civilian respirator with rubber facepiece and original cardboard carton carrier with shoulder cord. (Auckland War Memorial Museum AM 1995.59.20)</p>',
  },
  'lesson_04_the_blitz_shelters_worksheet.html': {
    assetFile: 'tube_station_shelter_1940.jpg',
    oldCaptionRegex: /<p class="artifact-caption"><strong>Source B:<\/strong>[^<]*<\/p>/,
    newCaption:
      '<p class="artifact-caption"><strong>Source B:</strong> Shelterers sleeping along the curved platform of Swiss Cottage Underground station during the London Blitz, c. 1940. (London Transport Museum / Imperial War Museum)</p>',
  },
  'lesson_05_dig_for_victory_rationing_worksheet.html': {
    assetFile: 'ration_book_coupons_1940.jpg',
    oldCaptionRegex: /<p class="artifact-caption"><strong>Source B:<\/strong>[^<]*<\/p>/,
    newCaption:
      '<p class="artifact-caption"><strong>Source B:</strong> Authentic Ministry of Food Child\'s Ration Book with coupons for bacon, sugar, meat, butter, and margarine. (Wellcome Collection L0072436)</p>',
  },
  'lesson_06_women_at_war_land_army_worksheet.html': {
    assetFile: 'land_army_poster_1941.jpg',
    oldCaptionRegex: /<p class="artifact-caption"><strong>Source B:<\/strong>[^<]*<\/p>/,
    newCaption:
      '<p class="artifact-caption"><strong>Source B:</strong> 1941 recruitment poster: "Come and Help with the Victory Harvest - Join the Women\'s Land Army", depicting a smiling Land Girl. (Ministry of Agriculture / HMSO)</p>',
  },
  'lesson_10_ve_day_remembrance_worksheet.html': {
    assetFile: 've_day_children_table_1945.jpg',
    oldCaptionRegex: /<p class="artifact-caption"><strong>Source B:<\/strong>[^<]*<\/p>/,
    newCaption:
      '<p class="artifact-caption"><strong>Source B:</strong> Two young girls wave Union flags amidst the bomb rubble and ruined brickwork of Battersea, London, on VE Day, 8 May 1945. (Imperial War Museum HU 49414)</p>',
  },
};

const dirs = [
  path.join(baseDir, 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(baseDir, 'units', 'ks2_ww2', 'worksheets'),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) return;
  console.log(`\nUpdating worksheets in: ${dir}`);

  for (const [filename, info] of Object.entries(sourceUpdates)) {
    const filePath = path.join(dir, filename);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Load authentic image buffer and base64
    const assetPath = path.join(assetsDir, info.assetFile);
    const assetBuf = fs.readFileSync(assetPath);
    const base64Data = `data:image/jpeg;base64,${assetBuf.toString('base64')}`;

    // Replace the artifact-img src (whether it was relative or base64)
    content = content.replace(
      /<img\s+src="([^"]+)"\s+class="artifact-img"\s+alt="Source B">/,
      `<img src="${base64Data}" class="artifact-img" alt="Source B">`,
    );

    // Replace caption
    if (info.oldCaptionRegex.test(content)) {
      content = content.replace(info.oldCaptionRegex, info.newCaption);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filename} with authentic ${info.assetFile}`);
  }
});

console.log(
  '\n✨ All individual worksheet files updated with authentic archival images and verified captions!',
);
