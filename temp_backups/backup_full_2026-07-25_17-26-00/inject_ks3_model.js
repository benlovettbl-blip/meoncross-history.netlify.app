const fs = require('fs');

const path = 'water_and_sanitation/data.js';
let content = fs.readFileSync(path, 'utf8');

// I need to add "model": "..." inside the source_utility assessment.
// The assessment has: "description": "Study Sources B and C below. How useful are Sources B and C for an enquiry into Roman public health and bathhouses? (8 marks)",
// I'll use regex to insert the model property right after "topic" or at the end of the object. But the assessment object doesn't have a "topic". Let's insert it after the "sources" array.

const modelAnswer = `<strong>Source B is highly useful for revealing the social reality and everyday atmosphere of Roman bathhouses;</strong> <strong style=\\"color: #0284c7;\\">it describes the intense noise of 'hair-pluckers' and 'sausage-sellers', proving that bathhouses were busy social hubs rather than just places for hygiene.</strong> <strong style=\\"color: #9333ea;\\">As a private letter written by someone living directly above the baths, Seneca provides a highly reliable, unfiltered eyewitness account of the daily chaos.</strong> <strong style=\\"color: #16a34a;\\">This is supported by our knowledge that Roman bathhouses (thermae) contained exercise yards, food stalls, and meeting rooms, making them the centre of community life.</strong><br><br><strong>Source C is also extremely useful for showing the scale and engineering brilliance of Roman public health;</strong> <strong style=\\"color: #0284c7;\\">it highlights the 'abundance of water' that flowed through the city 'like a queen' for both private use and public pleasure.</strong> <strong style=\\"color: #9333ea;\\">As an official report written by the state water commissioner, Frontinus's purpose is to glorify Roman achievements and praise the Emperor, so he may exaggerate its perfection and ignore the poorer areas that lacked piped water.</strong> <strong style=\\"color: #16a34a;\\">However, we know that Roman aqueducts were indeed revolutionary engineering feats that used gravity to supply millions of gallons of fresh water to urban centres, drastically improving public health.</strong>`;

// Since JSON manipulation is safer, let's parse and stringify.
// The file starts with "export const unitData ="

let jsonStr = content.replace(/export const unitData = /, '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

let injected = false;
if (data.assessments) {
  let assessment = data.assessments.find(a => a.id === 'source_utility');
  if (assessment) {
    assessment.model = modelAnswer;
    injected = true;
  }
}

if (injected) {
  let newContent = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Successfully injected model answer into water_and_sanitation/data.js');
} else {
  console.log('Failed to find source_utility assessment');
}
