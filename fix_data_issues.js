const fs = require('fs');

const publicPath = './public/data/water_and_sanitation.json';
const srcPath = 'water_and_sanitation/data.js';

let jsonData = JSON.parse(fs.readFileSync(publicPath, 'utf8'));

let unitData = jsonData.data ? jsonData.data : jsonData;

// 1. Fix truncated titles in Enquiry questions
unitData.lessons.forEach(lesson => {
  if (lesson.enquiry && lesson.enquiry.includes('...')) {
    // Extract the actual lesson topic from the title, e.g. "Lesson 1: Prehistoric and Roman Sanitation" -> "Prehistoric and Roman Sanitation"
    const topic = lesson.title.split(': ')[1];
    lesson.enquiry = `Why was the historical context of ${topic} so significant?`;
  }
});

// 2. Remove "Recall from last lesson: " etc.
unitData.lessons.forEach(lesson => {
  if (lesson.do_now && lesson.do_now.items) {
    lesson.do_now.items.forEach(item => {
      item.question = item.question
        .replace(/^Recall from last lesson:\s*/i, '')
        .replace(/^Recall from previous lessons:\s*/i, '');
    });
  }
});

// 3. Add more glossary words
// Lesson 2
if (unitData.lessons[1].glossary) {
  Object.assign(unitData.lessons[1].glossary, {
    "monastery": "A building or buildings occupied by a community of monks living under religious vows.",
    "cesspit": "A pit for the disposal of liquid waste and sewage.",
    "privy": "A toilet, especially a simple one such as an outhouse."
  });
}
// Lesson 3
if (unitData.lessons[2].glossary) {
  Object.assign(unitData.lessons[2].glossary, {
    "miasma": "A highly unpleasant or unhealthy smell or vapor, formerly thought to cause disease.",
    "gong farmer": "A person employed to empty cesspits and privies in early modern cities.",
    "urbanisation": "The increase in the proportion of people living in towns and cities."
  });
}
// Lesson 4
if (unitData.lessons[3].glossary) {
  Object.assign(unitData.lessons[3].glossary, {
    "cholera": "An infectious and often fatal bacterial disease of the small intestine, typically contracted from infected water supplies.",
    "epidemic": "A widespread occurrence of an infectious disease in a community at a particular time.",
    "public health": "The health of the population as a whole, especially as monitored and regulated by the state.",
    "laissez-faire": "A policy or attitude of letting things take their own course, without interfering."
  });
}
// Lesson 5
if (unitData.lessons[4].glossary) {
  Object.assign(unitData.lessons[4].glossary, {
    "sewage": "Waste water and excrement conveyed in sewers.",
    "civil engineering": "The design and construction of public works, such as dams, bridges and other large-scale projects.",
    "infrastructure": "The basic physical and organizational structures and facilities needed for the operation of a society."
  });
}

// 5. Remove Seneca's image
const lesson1 = unitData.lessons[0];
if (lesson1.sources) {
  const senecaSrc = lesson1.sources.find(s => s.title && s.title.includes('Seneca'));
  if (senecaSrc) {
    senecaSrc.src = ""; // remove the image path
    // Remove the HTML bold question from the caption so it renders nicely
    senecaSrc.caption = senecaSrc.caption.replace('<strong>What is this source showing?</strong> ', '');
  }
}

if (jsonData.data) {
  jsonData.data = unitData;
} else {
  jsonData = unitData;
}

fs.writeFileSync(publicPath, JSON.stringify(jsonData, null, 2));

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
fs.writeFileSync(srcPath, jsContent);

console.log('Fixed data.js and JSON');
