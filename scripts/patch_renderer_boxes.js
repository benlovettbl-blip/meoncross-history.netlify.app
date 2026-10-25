const fs = require('fs');
const path = 'src/engine/lesson_renderer.js';
let content = fs.readFileSync(path, 'utf8');

const target1 = '${renderArchivalSourceDiscussionBox(rawSource.hinge_question || rawSource.question || rawSource.source_question, rawSource, isKs2, \'12px\')}';
const rep1 = '${qhasUtilityCard ? renderArchivalSourceDiscussionBox(rawSource.hinge_question || rawSource.question || rawSource.source_question, rawSource, isKs2, \'12px\') : \'\'}';
if (content.includes(target1)) {
  content = content.replace(target1, rep1);
  console.log('Replaced target1 (written source discussion)');
} else {
  console.log('target1 not found');
}

const target2 = '${primaryDisc.promptHtml}';
const rep2 = '${!phasUtilityCard ? primaryDisc.promptHtml : \'\'}';
if (content.includes(target2)) {
  content = content.replace(target2, rep2);
  console.log('Replaced target2 (visual source prompt)');
} else {
  conwole.log('target2 not found');
}

const target3 = '${primaryDisc.panelHtml}';
const rep3 = '${qhasUtilityCard ? primaryDisc.panelHtml : \'\'}';
if (content.includes(target3)) {
  content = content.replace(target3, rep3);
  console.log('Replaced target3 (visual source panel)');
} else {
  console.log('target3 not found');
}

fs.writeFileSync(path, content, 'utf8');
console.log('DONE');
