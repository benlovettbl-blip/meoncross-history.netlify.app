const fs = require('fs');
const path = require('path');

const upgradesContent = fs.readFileSync(path.join(__dirname, '../src/flashcard_upgrades.js'), 'utf8');
const questionsContent = fs.readFileSync(path.join(__dirname, '../questions.js'), 'utf8');

function parseModule(content) {
  let code = content.replace(/import\s+[\s\S]*?from\s+['\"].*?['\"];?/g, '');
  code = code
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+default\s+/g, '');
  return code;
}

const upgradesCode = parseModule(upgradesContent);
const questionsCode = parseModule(questionsContent);

const evalCode = `
function getFactSplitEnhanced(q) {
  if (EXPLANATION_SPLITS[q.id]) {
    return { type: 'custom', data: EXPLANATION_SPLITS[q.id] };
  }

  const exp = q.explanation || "";
  let sentences = exp.split(/(?<=[.!?]['\"]?)\\s+/).filter(Boolean);
  let context = "";
  let significance = "";

  if (sentences.length >= 2) {
    context = sentences[0];
    significance = sentences.slice(1).join(" ");
    return { type: 'sentences', context, significance };
  }

  const splitTriggers = [
    // Original triggers
    ", but ", ", although ", ", which ", ", forcing ", ", leading to ",
    ", resulting in ", ", prompting ", ", establishing ", ", declaring ",
    ", asserting ", ", demonstrating ", ", proving ", ", sparking ",
    ", triggering ", ", allowing ", ", preventing ", ", helping ",
    ", causing ", ", highlighting ", ", leaving ", ", making ", ", thereby ",
    " which ", " leading to ", " resulting in ", " forcing ", " proving ",
    " demonstrating ", " that eventually ", ", paving the way ",
    
    // New enhanced triggers
    ", serving as ", " serving as ",
    ", ensuring ", " ensuring ",
    ", transforming ", " transforming ",
    ", creating ", " creating ",
    ", bringing ", " bringing ",
    ", providing ", " providing ",
    ", securing ", " securing ",
    ", ending ", " ending ",
    ", compounding ", " compounding ",
    ", shattering ", " shattering ",
    ", challenging ", " challenging ",
    ", legally enshrining ", " legally enshrining ",
    ", designed to ", " designed to ",
    ", aimed at ", " aimed at ",
    " that helped ", " that would ",
    " and that ", " but that ",
    
    // Additional triggers from latest analysis
    ", involving ", " involving ",
    ", destroying ", " destroying ",
    ", coordinating ", " coordinating ",
    ", placing ", " placing ",
    ", meaning ", " meaning ", ", meaning that ", " meaning that ",
    ", replacing ", " replacing ",
    ", seeking ", " seeking ",
    ", hoping ", " hoping ",
    " and significantly ", " and subsequently ", " and ultimately ",
    " because ", " because it "
  ];

  let splitFound = false;
  for (let trigger of splitTriggers) {
    let idx = exp.indexOf(trigger);
    if (idx > -1) {
      context = exp.substring(0, idx).trim();
      let rest = exp.substring(idx + (trigger.startsWith(',') ? 1 : 0)).trim();
      significance = rest;
      significance = significance.charAt(0).toUpperCase() + significance.slice(1);
      splitFound = true;
      return { type: 'trigger', trigger, context, significance };
    }
  }

  context = exp;
  const subtopicId = q.subtopicId || "";
  const fallbacks = {
    "subtopic_1_1": "This event escalated tensions over immigration and land rights, ultimately driving the British to withdraw and triggering the declaration of the State of Israel.",
    "subtopic_1_2": "This outcome solidified the Green Line boundaries, created the Palestinian refugee crisis, and established the territorial baseline of the early conflict.",
    "subtopic_1_3": "This development intensified the cold war in the Middle East, leading directly to the Suez Crisis of 1956 and the rise of Nasser's influence.",
    "subtopic_2_1": "This military confrontation led to the Israeli occupation of the West Bank, Gaza, and Golan Heights, transforming the maps and dynamics of the conflict.",
    "subtopic_2_2": "This clash escalated the border warfare, fueled the rise of Yasser Arafat's PLO, and shifted the struggle to guerrilla raids and international hijacking.",
    "subtopic_2_3": "This war shattered Israel's security invincibility, prompted OPEC to use the oil weapon against the West, and forced a diplomatic path toward negotiations.",
    "subtopic_3_1": "This breakthrough led to the historic Camp David Accords, bringing peace between Egypt and Israel but isolating Egypt from the wider Arab world.",
    "subtopic_3_2": "This confrontation resulted in the siege of Beirut, the rise of Hezbollah, and a massive civilian-led grassroots uprising against Israeli occupation.",
    "subtopic_3_3": "This historic agreement established mutual recognition between Israel and the PLO, but the peace process was ultimately stalled by extremists on both sides."
  };
  significance = fallbacks[subtopicId] || "This represents a key developmental milestone in the history of the Arab-Israeli conflict.";
  return { type: 'fallback', context, significance };
}

const allQs = [];
const subtopicCounts = {};

QUIZ_DATA.forEach(topic => {
  topic.subtopics.forEach(subtopic => {
    subtopicCounts[subtopic.id] = { total: 0, customs: 0, sentences: 0, triggers: 0, fallbacks: [] };
    ['easy', 'medium', 'difficult'].forEach(diff => {
      if (subtopic[diff]) {
        subtopic[diff].forEach(q => {
          allQs.push({
            ...q,
            subtopicId: subtopic.id
          });
          subtopicCounts[subtopic.id].total++;
          
          const result = getFactSplitEnhanced(q);
          if (result.type === 'custom') {
            subtopicCounts[subtopic.id].customs++;
          } else if (result.type === 'sentences') {
            subtopicCounts[subtopic.id].sentences++;
          } else if (result.type === 'trigger') {
            subtopicCounts[subtopic.id].triggers++;
          } else {
            subtopicCounts[subtopic.id].fallbacks.push(q);
          }
        });
      }
    });
  });
});

console.log("SUBTOPIC STATUS WITH ADVANCED SPLITTER:");
let grandTotal = 0;
let grandCustoms = 0;
let grandSentences = 0;
let grandTriggers = 0;
let grandFallbacks = 0;

Object.keys(subtopicCounts).forEach(sid => {
  const c = subtopicCounts[sid];
  grandTotal += c.total;
  grandCustoms += c.customs;
  grandSentences += c.sentences;
  grandTriggers += c.triggers;
  grandFallbacks += c.fallbacks.length;
  
  const coverCount = c.total - c.fallbacks.length;
  const coverPercent = Math.round((coverCount / c.total) * 100);
  console.log(\`\${sid}: Total Qs=\${c.total}, Custom=\${c.customs}, AutoSentences=\${c.sentences}, AutoTriggers=\${c.triggers}, Coverage=\${coverPercent}%\`);
});

console.log("\\nGRAND TOTALS:");
console.log("Total Cards:", grandTotal);
console.log("Custom splits (dict):", grandCustoms);
console.log("Auto-sentences split:", grandSentences);
console.log("Auto-triggers split:", grandTriggers);
console.log("Fallbacks remaining:", grandFallbacks);
console.log("Overall Coverage:", Math.round(((grandTotal - grandFallbacks) / grandTotal) * 100) + "%");

console.log("\\nLIST OF CARDS STILL LACKING SPLITS (Sample of 10):");
let sampleCount = 0;
QUIZ_DATA.forEach(topic => {
  topic.subtopics.forEach(subtopic => {
    const c = subtopicCounts[subtopic.id];
    c.fallbacks.slice(0, 2).forEach(q => {
      if (sampleCount < 10) {
        console.log(\`  [\${q.id}]: "\${q.explanation}"\`);
        sampleCount++;
      }
    });
  });
});
`;

try {
  eval(questionsCode + '\n' + upgradesCode + '\n' + evalCode);
} catch (e) {
  console.error("Evaluation error:", e);
}
