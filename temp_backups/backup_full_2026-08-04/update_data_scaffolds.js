const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

// Add answers to Do Nows (for L2-5)
const doNowAnswers = [
  // L1: No questions, replaced with Timeline
  null,
  // L2
  [
    "1871",
    "Germany",
    "Otto von Bismarck",
    "Franco-Russian Alliance",
    "Scramble for Africa",
    "Morocco",
    "It challenged British naval dominance and made them feel threatened.",
    "It allowed France and Russia to form an alliance, enclosing Germany.",
    "It proved Britain would stand by France against Germany.",
    "They focused on global empire rather than European alliances."
  ],
  // L3
  [
    "Britain and Germany",
    "HMS Dreadnought",
    "Admiral Tirpitz",
    "Two-Power Standard",
    "Russia",
    "It made all older battleships completely obsolete overnight.",
    "To protect their growing empire and trade routes.",
    "It created a deep paranoia and anti-German sentiment in Britain.",
    "It created massive, multi-million man armies ready for total war.",
    "It fundamentally shifted Britain away from isolationism and towards anti-German alliances."
  ],
  // L4
  [
    "The Ottoman Empire",
    "Serbia",
    "Austria-Hungary",
    "Russia",
    "Bosnia and Herzegovina",
    "It would inspire other ethnic groups to break away, destroying the empire.",
    "Russia saw itself as the cultural and religious protector of the Slavic Serbs.",
    "They nearly destroyed the Ottoman presence in Europe, making Serbia larger and more ambitious.",
    "Bosnia had a large Serbian population that Serbia wanted to unite with.",
    "A local war over borders could force all of Europe's major powers to mobilize."
  ],
  // L5
  [
    "28 June 1914",
    "Sarajevo, Bosnia",
    "Gavrilo Princip",
    "The Black Hand",
    "Germany",
    "The Archduke's car took a wrong turn and stopped right in front of him.",
    "They wanted an excuse to invade and destroy Serbia once and for all.",
    "Because Russia mobilized to protect Serbia, forcing Germany to mobilize to protect Austria-Hungary.",
    "To knock France out before Russia could attack; it required invading neutral Belgium, which brought Britain in.",
    "It was merely the final spark that detonated decades of built-up militarism and alliances."
  ]
];

const lesson1Timeline = [
  { year: "1871", title: "The Unification of Germany", detail: "The Franco-Prussian War", img: "assets/was_germany_unification.png" },
  { year: "1897", title: "Imperial Rivalries", detail: "The Place in the Sun speech", img: "assets/was_greedy_boy.png" },
  { year: "1906", title: "The Naval Arms Race", detail: "The Launch of HMS Dreadnought", img: "assets/was_dreadnought_blueprint.png" },
  { year: "1907", title: "Encirclement & Alliances", detail: "The Triple Entente System", img: "assets/was_military_matrix.png" },
  { year: "June 1914", title: "The Spark in Sarajevo", detail: "The Assassination of the Archduke", img: "assets/was_boiling_point.png" }
];

unitData.lessons.forEach((lesson, index) => {
  // 1. Primary Source
  if (lesson.sources && lesson.sources.length > 0) {
    // Extract the most visually engaging source (prefer cartoons/paintings over maps if possible)
    let primaryIndex = lesson.sources.findIndex(s => !s.src.includes('map'));
    if (primaryIndex === -1) primaryIndex = 0; // fallback to first
    lesson.primary_source = lesson.sources.splice(primaryIndex, 1)[0];
  }

  // 2. Do Now Answers & Timeline
  if (index === 0) {
    lesson.do_now = {
      type: "timeline",
      events: lesson1Timeline
    };
  } else {
    // Convert do_now array to objects with answers
    const questions = lesson.do_now;
    lesson.do_now = {
      type: "questions",
      items: questions.map((q, i) => ({
        question: q,
        answer: doNowAnswers[index][i]
      }))
    };
  }

  // 3. Knowledge Check Scaffolds
  if (lesson.tasks) {
    lesson.tasks.forEach(task => {
      if (task.type === "written") {
        task.starter = "One important reason was...";
        task.model = "A perfect answer would include detailed chronological evidence and explain the long-term impact.";
        task.clue = "Think about the alliances or the military strategy discussed earlier.";
      }
    });
  }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js successfully updated with scaffolds, timeline, and primary sources!");
