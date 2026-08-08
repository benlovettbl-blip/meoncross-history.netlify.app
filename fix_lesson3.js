const fs = require('fs');

const txt = fs.readFileSync('early_modern_world/data.js', 'utf8');
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
const data = eval('(' + jsonStr + ')');

const l3 = data.lessons[3];

// Fix 1: The Great Seal
const greatSealBlock = l3.narrative_blocks.find(b => b.title === 'Visual Analysis: The Great Seal of the Commonwealth (1651)');
if (greatSealBlock) {
  greatSealBlock.image = "/images/great_seal_1651.png";
  greatSealBlock.image_alt = "The Great Seal of the Commonwealth of England (1651)";
  greatSealBlock.image_caption = "The 1651 Great Seal of the Commonwealth. Notice the complete absence of any monarch. Instead, it depicts the House of Commons in session, physically illustrating that power now rested with Parliament.";
  greatSealBlock.image_context = "This seal was a revolutionary piece of propaganda. For 600 years, English seals showed the monarch on horseback. By replacing the King with the House of Commons, the new Republic was visually announcing the total destruction of the old royal order. **Hinge Question:** Why was it so important for the new government to completely erase the King's face from the official seal?";
}

// Fix 2: Remove duplicated Samuel Scott image from the Debate block
const debateBlock = l3.narrative_blocks.find(b => b.title === 'Historiographical Debate: Who won the English Civil War?');
if (debateBlock) {
  delete debateBlock.image;
  delete debateBlock.image_alt;
  delete debateBlock.image_caption;
  delete debateBlock.image_context;
  delete debateBlock.source_letter; // The text already has <strong>Source F:</strong>
}

const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);
fs.writeFileSync('early_modern_world/data.js', newTxt);
console.log('Successfully fixed Great Seal and Duplicate Source F in Lesson 3!');
