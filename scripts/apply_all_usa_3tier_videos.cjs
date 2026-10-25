const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { kt1 } = require('./usa_dictionary_kt1.cjs');
const { kt2 } = require('./usa_dictionary_kt2.cjs');
const { kt3 } = require('./usa_dictionary_kt3.cjs');
const { kt4 } = require('./usa_dictionary_kt4.cjs');

const allUsaVideos = [
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

console.log(`Loaded ${allUsaVideos.length} lesson video suites for USA.`);
allUsaVideos.forEach((vids, idx) => {
  if (!vids || vids.length === 0) {
    throw new Error(`Missing videos for USA lesson index ${idx}`);
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

// 1. Process units/usa/data.js
const dataFile = path.resolve(__dirname, '../units/usa/data.js');
const publicDataFile = path.resolve(__dirname, '../public/units/usa/data.js');

console.log('🔄 Loading units/usa/data.js...');
let rawContent = fs.readFileSync(dataFile, 'utf8');

const matches = [...rawContent.matchAll(/video:\s*\[([\s\S]*?)\]\s*,/g)];
if (matches.length !== 16) {
  throw new Error(`Expected 16 video blocks in file, but found ${matches.length}`);
}

for (let i = matches.length - 1; i >= 0; i--) {
  const match = matches[i];
  const replacement = formatVideoBlock(allUsaVideos[i]);
  rawContent = rawContent.slice(0, match.index) + replacement + rawContent.slice(match.index + match[0].length);
}

fs.writeFileSync(dataFile, rawContent, 'utf8');
console.log('✅ Updated units/usa/data.js');

fs.writeFileSync(publicDataFile, rawContent, 'utf8');
console.log('✅ Updated public/units/usa/data.js');

// 2. Process data/usa.json & public/data/usa.json
const jsonFile = path.resolve(__dirname, '../data/usa.json');
const publicJsonFile = path.resolve(__dirname, '../public/data/usa.json');

const updateJsonFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const lessons = data.lessons || (data.data && data.data.lessons);
    if (lessons && lessons.length === 16) {
      lessons.forEach((l, idx) => {
        l.video = allUsaVideos[idx];
      });
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Updated ${filePath}`);
    }
  }
};

updateJsonFile(jsonFile);
updateJsonFile(publicJsonFile);

console.log('🔄 Rebuilding public/database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });

console.log('🎉 Successfully upgraded all 16 USA (1954–75) lessons with gold-standard multi-lens & proportional videos!');
