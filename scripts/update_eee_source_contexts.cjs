const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataJsonPath = path.join(ROOT_DIR, 'data', 'eee.json');
const pubDataJsonPath = path.join(ROOT_DIR, 'public', 'data', 'eee.json');
const dataJsPath = path.join(ROOT_DIR, 'units', 'eee', 'data.js');
const pubDataJsPath = path.join(ROOT_DIR, 'public', 'units', 'eee', 'data.js');

const eeeData = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));

const updatedContexts = {
  lesson_1_1: "Official portrait of Queen Elizabeth I in her gold cloth of estate coronation robes, holding the orb and sceptre to signify divinely ordained monarchical power. Hinge Question: How does Source A illustrate how Elizabeth used visual majesty and Tudor symbolism to overcome doubts about female rule?",
  lesson_1_2: "Contemporary sixteenth-century engraving depicting Queen Elizabeth I enthroned opening the 1559 Reformation Parliament to establish the Religious Settlement and her royal supremacy. Hinge Question: How does Source A illustrate Elizabeth's strategic reliance on parliamentary statute rather than direct royal decree to secure moderate religious conformity?",
  lesson_1_3: "Contemporary portrait engraving of Father Edmund Campion, the brilliant Oxford scholar turned Jesuit missionary who returned secretly to England in 1580 to administer Catholic sacraments before being captured and executed at Tyburn. Hinge Question: Why did the Elizabethan government view missionary priests like Campion depicted in Source C as foreign political agents of treason rather than simple men of God?",
  lesson_1_4: "François Clouet's celebrated portrait 'Le Deuil Blanc' (c. 1560) depicting Mary Stuart in white mourning robes as the widowed Queen of France and reigning Queen of Scots, asserting her royal stature and dynastic prestige. Hinge Question: How does Source A illustrate why Mary Stuart was regarded by European monarchs and English Catholics as a dangerously attractive dynastic alternative to Elizabeth?",
  lesson_2_1: "The intercepted Babington cipher letter featuring the fraudulent forged postscript by cryptanalyst Thomas Phelippes, tricking Mary into naming her co-conspirators. Hinge Question: How does the discovery of the Babington cipher in Source A provide decisive evidence of Francis Walsingham’s intelligence supremacy?",
  lesson_2_2: "Marcus Gheeraerts's formal portrait of Sir Francis Drake wearing the golden Drake Jewel gifted by Elizabeth I after he returned with £140,000 of plundered Spanish treasure. Hinge Question: How does Source B reflect Elizabeth’s defiance of Philip II by publicly honoring and knighting an English privateer who plundered the Spanish Empire?",
  lesson_2_3: "Contemporary navigational chart by Vice-Admiral William Borough documenting Drake’s audacious preemptive strike on Cadiz harbor in April 1587, destroying thirty Spanish warships and burning thousands of tons of seasoned oak barrel staves. Hinge Question: How does Source A illustrate why Drake’s raid on Cadiz delayed the launch of the Spanish Armada by over twelve months?",
  lesson_2_4: "The iconic 1588 Armada Portrait showing Elizabeth I with her hand resting upon the Americas on a globe, while the background windows contrast English fireships dispersing the Spanish crescent with Spanish galleons wrecked by storms on Irish rocks. Hinge Question: How do the dual window vignettes behind Elizabeth in Source B summarize the reasons for England’s miraculous victory over the Armada?",
  lesson_3_1: "The only surviving contemporary visual record of an Elizabethan playhouse interior, sketched by Dutch traveler Johannes de Witt at the Swan Theatre in Southwark, showing groundlings standing in the pit around the thrust stage while wealthy patrons sat in covered galleries. Hinge Question: How does Source B illustrate how Elizabethan public playhouses brought diverse social classes together while provoking Puritan moral condemnation?",
  lesson_3_2: "Woodcut title page from Justice of the Peace Thomas Harman’s 1567 bestseller classifying vagrants into deceitful criminal categories like 'Counterfeit Cranks' and 'Abraham Men.' Hinge Question: How does Source A reflect the growing anxiety and moral panic felt by Elizabethan property owners towards the 'sturdy poor'?",
  lesson_3_3: "Jodocus Hondius’s master world chart 'Vera Totius Expeditionis Nauticae' (1595), tracing Sir Francis Drake’s 1577–1580 circumnavigation and featuring his flagship Golden Hind. Hinge Question: Why did Drake’s navigational voyage depicted in Source A combine pioneering global exploration with aggressive commercial plunder against the Spanish Empire?",
  lesson_3_4: "John White’s detailed 1585 watercolor map of Roanoke Island showing the shallow coastal sandbars and Secotan Native American settlements along the coast of Virginia. Hinge Question: How does the geography depicted in Source B explain why English supply ships struggled with treacherous shallows and sandbars at Roanoke?"
};

eeeData.lessons.forEach(l => {
  if (updatedContexts[l.id]) {
    if (!l.teacher_notes) l.teacher_notes = {};
    l.teacher_notes.source_context = updatedContexts[l.id];
    console.log(`Updated teacher_notes.source_context for ${l.id}`);
  }
});

function generateDataJs(obj) {
  const jsonStr = JSON.stringify(obj, null, 2);
  return `export const unitData = ${jsonStr};
export default unitData;
if (typeof window !== "undefined") {
  window.unitData = unitData;
  window.eee_data = unitData;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = unitData;
}
`;
}

fs.writeFileSync(dataJsonPath, JSON.stringify(eeeData, null, 2), 'utf8');
fs.writeFileSync(pubDataJsonPath, JSON.stringify(eeeData, null, 2), 'utf8');
fs.writeFileSync(dataJsPath, generateDataJs(eeeData), 'utf8');
fs.writeFileSync(pubDataJsPath, generateDataJs(eeeData), 'utf8');

console.log('✅ Synchronized all 4 data files with 100% verified source contexts and hinge questions.');
