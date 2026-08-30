const fs = require('fs');
const path = require('path');

const unitsToProcess = [
  'australia',
  'change_1450_1750',
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'great_war_part2'
];

unitsToProcess.forEach(unit => {
  const dataPath = path.join(__dirname, 'public', 'units', unit, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.log(`Not found: ${dataPath}`);
    return;
  }
  
  let unitDataModule;
  try {
    unitDataModule = require(dataPath);
  } catch (e) {
    console.log(`Failed to require ${dataPath}: ${e.message}`);
    return;
  }
  
  const unitData = unitDataModule.unitData || unitDataModule.default || unitDataModule.data || unitDataModule;
  
  const overview = {
    title: `KS3 History: ${unitData.title}`,
    subtitle: "A condensed roadmap and revision sheet for this unit.",
    sections: [
      {
        id: "section-a",
        title: "Core Curriculum Content",
        topics: []
      }
    ]
  };
  
  unitData.lessons.forEach((lesson, i) => {
    let objective = "To understand " + lesson.title.replace(/^\d+\.\s*/, '').replace(/^Lesson \d+:\s*/, '');
    
    let keyTopics = [];
    if (lesson.narrative) {
      keyTopics = lesson.narrative.map(n => n.title).filter(t => t);
    } else if (lesson.vocab) {
      keyTopics = lesson.vocab.map(v => v.term).filter(t => t);
    }
    let topicsString = keyTopics.join(', ');
    if (!topicsString) topicsString = "Various historical sources and events";
    
    overview.sections[0].topics.push({
      title: `${i + 1}. ${lesson.title.replace(/^Lesson \d+:\s*/, '').replace(/^\d+\.\s*/, '')}`,
      points: [
        `**Objective:** ${objective}`,
        `**Key Topics:** ${topicsString}`
      ]
    });
  });
  
  const overviewFileName = `${unit}_overview.json`;
  const overviewPath = path.join(__dirname, 'public', 'data', overviewFileName);
  fs.writeFileSync(overviewPath, JSON.stringify(overview, null, 2));
  console.log(`Created ${overviewPath}`);
  
  let rawData = fs.readFileSync(dataPath, 'utf8');
  if (rawData.includes('"specification_file"')) {
    rawData = rawData.replace(/"specification_file":\s*".*?"/, `"specification_file": "/data/${overviewFileName}"`);
  } else {
    rawData = rawData.replace(/("title":\s*".*?",)/, `$1\n  "specification_file": "/data/${overviewFileName}",`);
  }
  fs.writeFileSync(dataPath, rawData);
  console.log(`Updated ${dataPath}`);
});
