const fs = require('fs');
const path = require('path');

const { upgrades: kt1 } = require('./weimar_full_video_dictionary.cjs');
const { kt2 } = require('./weimar_dictionary_kt2.cjs');
const { kt3 } = require('./weimar_dictionary_kt3.cjs');
const { kt4 } = require('./weimar_dictionary_kt4.cjs');

const allWeimarVideos = [
  // Key Topic 1
  kt1.lesson_1_1,
  kt1.lesson_1_2,
  kt1.lesson_1_3,
  kt1.lesson_1_4,
  // Key Topic 2
  kt2.lesson_2_1,
  kt2.lesson_2_2,
  kt2.lesson_2_3,
  kt2.lesson_2_4,
  // Key Topic 3
  kt3.lesson_3_1,
  kt3.lesson_3_2,
  kt3.lesson_3_3,
  kt3.lesson_3_4,
  // Key Topic 4
  kt4.lesson_4_1,
  kt4.lesson_4_2,
  kt4.lesson_4_3,
  kt4.lesson_4_4,
];

console.log(`Loaded ${allWeimarVideos.length} lesson video suites.`);
allWeimarVideos.forEach((vids, idx) => {
  if (!vids || vids.length === 0) {
    throw new Error(`Missing videos for lesson index ${idx}`);
  }
});

function formatVideoBlock(videoList) {
  let out = 'video: [\n';
  videoList.forEach((v) => {
    out += '        {\n';
    out += `          type: '${v.type}',\n`;
    out += `          url: '${v.url}',\n`;
    out += `          title:\n            '${v.title.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',\n`;
    out += `          duration: '${v.duration}',\n`;
    out += `          pathway: '${v.pathway}',\n`;
    out += `          teacher_guidance:\n            '${v.teacher_guidance.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',\n`;
    out += `          viewing_task:\n            '${v.viewing_task.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',\n`;
    out += `          model_answer:\n            '${v.model_answer.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',\n`;
    out += '        },\n';
  });
  out += '      ],';
  return out;
}

// 1. Process units/weimar_nazi_germany/data.js
const dataFile = path.resolve(__dirname, '../units/weimar_nazi_germany/data.js');
const publicDataFile = path.resolve(__dirname, '../public/units/weimar_nazi_germany/data.js');

console.log('🔄 Loading units/weimar_nazi_germany/data.js...');
let rawContent = fs.readFileSync(dataFile, 'utf8');

const matches = [...rawContent.matchAll(/video:\s*\[([\s\S]*?)\]\s*,/g)];
if (matches.length !== 16) {
  throw new Error(`Expected 16 video blocks in file, but found ${matches.length}`);
}

for (let i = matches.length - 1; i >= 0; i--) {
  const match = matches[i];
  const replacement = formatVideoBlock(allWeimarVideos[i]);
  rawContent = rawContent.slice(0, match.index) + replacement + rawContent.slice(match.index + match[0].length);
}

fs.writeFileSync(dataFile, rawContent, 'utf8');
console.log('✅ Updated units/weimar_nazi_germany/data.js');

fs.writeFileSync(publicDataFile, rawContent, 'utf8');
console.log('✅ Updated public/units/weimar_nazi_germany/data.js');

// 2. Process data/weimar_nazi_germany.json & public/data/weimar_nazi_germany.json
const jsonFile = path.resolve(__dirname, '../data/weimar_nazi_germany.json');
const publicJsonFile = path.resolve(__dirname, '../public/data/weimar_nazi_germany.json');

const updateJsonFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.lessons && data.lessons.length === 16) {
      data.lessons.forEach((l, idx) => {
        l.video = allWeimarVideos[idx];
      });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Updated ${filePath}`);
    }
  }
};

updateJsonFile(jsonFile);
updateJsonFile(publicJsonFile);

console.log('🎉 Successfully upgraded all 16 Weimar & Nazi Germany lessons with gold-standard 3-tier videos!');
