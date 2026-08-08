const fs = require('fs');

const txt = fs.readFileSync('early_modern_world/data.js', 'utf8');
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
const data = eval('(' + jsonStr + ')');

const scaffolds = [
  {
    lesson: 0,
    scaffolding: [
      "Sentence Starter: Before 1450, many people assume Europe was the most advanced, but...",
      "Sentence Starter: For example, the Ming Dynasty was highly modern because...",
      "Sentence Starter: Similarly, the Mali Empire showed immense wealth when...",
      "Key Vocabulary Checklist: Mansa Musa, Industrial Engine, Silk Road."
    ]
  },
  {
    lesson: 1,
    scaffolding: [
      "Sentence Starter: The defeat of the Spanish Armada was a turning point because...",
      "Sentence Starter: Instead of just using the Royal Navy, the Queen used privateers to...",
      "Sentence Starter: This laid the foundation for a modern empire by...",
      "Key Vocabulary Checklist: Monopoly, Privateers, Sir Francis Drake."
    ]
  },
  {
    lesson: 2,
    scaffolding: [
      "Sentence Starter: Joint-stock companies were a very modern invention because they allowed merchants to...",
      "Sentence Starter: The East India Company showed modern financial power by...",
      "Sentence Starter: However, their early methods were often brutal, for example...",
      "Key Vocabulary Checklist: Joint-stock, Mughal Empire, Investment."
    ]
  },
  {
    lesson: 3,
    scaffolding: [
      "Sentence Starter: In one way, the government became more modern because the absolute power of the King was...",
      "Sentence Starter: The new Great Seal showed this change by...",
      "Sentence Starter: However, some historians argue it wasn't truly modern for everyone, because...",
      "Key Vocabulary Checklist: Absolute Monarchy, House of Commons, The Commonwealth."
    ]
  },
  {
    lesson: 4,
    scaffolding: [
      "Sentence Starter: The Transatlantic Slave Trade created massive 'modern' wealth for Britain by...",
      "Sentence Starter: However, this wealth was built on deeply un-modern and brutal practices, such as...",
      "Sentence Starter: The conditions in the barracoons and ships proved that...",
      "Key Vocabulary Checklist: Triangular Trade, Barracoons, Chattel Slavery."
    ]
  },
  {
    lesson: 5,
    scaffolding: [
      "Sentence Starter: Enslaved Africans did not just wait for Europeans to free them; instead they...",
      "Sentence Starter: One clear example of this resistance was...",
      "Sentence Starter: This proves that the push for 'modern' human rights actually came from...",
      "Key Vocabulary Checklist: The Stono Rebellion, Equiano, Day-to-day resistance."
    ]
  }
];

scaffolds.forEach(s => {
  const lesson = data.lessons[s.lesson];
  const block = lesson.narrative_blocks.find(b => b.title === 'Synoptic Challenge (Extension)');
  if (block && block.extended) {
    block.extended.scaffolding = s.scaffolding;
  }
});

const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);
fs.writeFileSync('early_modern_world/data.js', newTxt);
console.log('Successfully injected lesson-specific scaffolding into Synoptic Challenge blocks!');
