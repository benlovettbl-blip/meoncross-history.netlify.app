const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../early_modern_world/data.js');
let txt = fs.readFileSync(dataPath, 'utf8');

// The JS file is effectively an ES module with `export const unitData = { ... }`.
// Since we only need to modify it as a JSON, let's extract the object safely.
const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
const data = eval('(' + jsonStr + ')');

const scaffolds = [
  {
    lesson: 0,
    title: "Assessment Practice",
    question: "Explain why Europe was not the center of global wealth and power in 1450.",
    hints: [
      "Mention the Ming Dynasty (China), the Islamic Empires (Ottoman/Mali), and the Silk Road.",
      "Sentence Starter: In 1450, the true centers of global wealth were...",
      "Sentence Starter: This was because they controlled...",
      "Sentence Starter: By contrast, Europe was relatively isolated because..."
    ],
    lines: 15
  },
  {
    lesson: 1,
    title: "Assessment Practice",
    question: "How did the Protestant Reformation push England into global exploration and conflict with Spain?",
    hints: [
      "Mention Henry VIII, the Pope, privateers (Francis Drake), and the Spanish Armada.",
      "Sentence Starter: When England became Protestant, it created conflict with Catholic Spain because...",
      "Sentence Starter: To challenge Spain’s wealth in the New World, English monarchs encouraged...",
      "Sentence Starter: This rivalry culminated in..."
    ],
    lines: 15
  },
  {
    lesson: 2,
    title: "Assessment Practice",
    question: "Explain how the creation of the East India Company (EIC) transformed British trade.",
    hints: [
      "Mention joint-stock companies, monopolies, violence, and Asian spices/textiles.",
      "Sentence Starter: Before the EIC, individual merchants struggled to trade in Asia because...",
      "Sentence Starter: The EIC solved this by using a 'joint-stock' model, which meant...",
      "Sentence Starter: However, they often used violence to secure a 'monopoly', allowing them to..."
    ],
    lines: 15
  },
  {
    lesson: 3,
    title: "Assessment Practice",
    question: "How did the English Civil War and the execution of Charles I change the balance of power?",
    hints: [
      "Mention the Divine Right of Kings, Parliament, and Oliver Cromwell.",
      "Sentence Starter: Before the Civil War, Charles I believed in the 'Divine Right of Kings', meaning...",
      "Sentence Starter: However, Parliament challenged this by...",
      "Sentence Starter: By executing the King in 1649, it proved that..."
    ],
    lines: 15
  },
  {
    lesson: 4,
    title: "Assessment Practice",
    question: "Explain how the 'Financial Revolution' (like the Bank of England) helped Britain build a modern empire.",
    hints: [
      "Mention the National Debt, the Bank of England (1694), and funding the Royal Navy.",
      "Sentence Starter: Following the Glorious Revolution, Britain created the Bank of England, which allowed the government to...",
      "Sentence Starter: This 'National Debt' was crucial because...",
      "Sentence Starter: Consequently, Britain could out-spend its rivals by building..."
    ],
    lines: 15
  },
  {
    lesson: 5,
    title: "Assessment Practice",
    question: "How did the Triangular Trade directly enrich British port cities?",
    hints: [
      "Mention Bristol/Liverpool, manufactured goods, enslaved people, and sugar/tobacco.",
      "Sentence Starter: The Triangular Trade enriched Britain through three main stages. Firstly...",
      "Sentence Starter: Secondly, enslaved Africans were brutally transported to...",
      "Sentence Starter: Finally, the immense profits from raw materials (like sugar) flowed back into British ports like..."
    ],
    lines: 15
  },
  {
    lesson: 6,
    title: "Assessment Practice",
    question: "Explain how the Jamaican Maroons successfully resisted British control.",
    hints: [
      "Mention Nanny of the Maroons, guerrilla warfare, and the geography of Jamaica.",
      "Sentence Starter: The Maroons were communities of...",
      "Sentence Starter: They were able to successfully resist the British army because they used...",
      "Sentence Starter: Ultimately, the British were forced to..."
    ],
    lines: 15
  }
];

// Inject the green assessment writing tasks directly to the lesson.extended object
scaffolds.forEach(s => {
  const lesson = data.lessons[s.lesson];
  lesson.extended = {
    title: s.title,
    question: s.question,
    hints: s.hints,
    lines: s.lines
  };
});

// Clean up Lesson 8 (index 7) smaller comprehension questions
const lesson8 = data.lessons[7];
if (lesson8 && lesson8.narrative_blocks) {
  lesson8.narrative_blocks.forEach(block => {
    // Only strip comprehension tasks, leave spectrum_mapper and lesson reflections
    if (block.tasks && block.tasks.length > 0) {
      block.tasks = block.tasks.filter(t => t.type !== 'comprehension');
    }
  });
}

// Convert back and save
const newJsonStr = JSON.stringify(data, null, 2);
const newTxt = txt.substring(0, startIdx) + newJsonStr + txt.substring(endIdx);
fs.writeFileSync(dataPath, newTxt, 'utf8');
console.log('Successfully injected assessments into Lessons 1-7 and cleared comprehension questions from Lesson 8.');
