const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const injections = [
  {
    lessonId: "lesson_1_1",
    blockContains: "Because the Church had such immense power, challenging Galen's ideas",
    hinge: {
      text: "Why did the Church so fiercely support Galen's medical ideas?",
      options: [
        "Because Galen was a devout Christian who wrote the Bible.",
        "Because Galen's theory that the body was perfectly designed fit with the Christian belief in a single Creator.",
        "Because Galen proved that God sent diseases as a punishment for sin.",
        "Because the Pope was treated by Galen and cured of a deadly fever."
      ],
      correct_index: 1,
      explanation: "Galen was actually an Ancient Roman (not a Christian), but his idea of a perfectly designed body aligned perfectly with Christian creation theology, making his work the absolute truth in medieval universities."
    }
  },
  {
    lessonId: "lesson_1_1",
    blockContains: "The Church taught that illness was a punishment from God",
    hinge: {
      text: "If a medieval peasant caught leprosy, what was the most likely explanation given by the Church?",
      options: [
        "They had breathed in miasma (bad air) from a nearby swamp.",
        "Their Four Humours were severely unbalanced.",
        "God was punishing them for a sin they had committed.",
        "They had been infected by invisible germs in their drinking water."
      ],
      correct_index: 2,
      explanation: "While miasma and humours were rational theories used by physicians, the Church heavily promoted the supernatural idea that disease was a direct punishment from God for sinful behaviour."
    }
  },
  {
    lessonId: "lesson_1_1",
    blockContains: "Miasma was another highly popular rational theory",
    hinge: {
      text: "How did the Theory of Miasma explain the spread of disease?",
      options: [
        "Disease was spread by touching infected people.",
        "Disease was caused by breathing in foul-smelling, corrupted air (bad fumes).",
        "Disease was a result of an imbalance of yellow bile in the stomach.",
        "Disease was spread by fleas biting infected rats and then biting humans."
      ],
      correct_index: 1,
      explanation: "Miasma theory held that 'bad air' filled with fumes from rotting matter or swamps corrupted the body. (Fleas and rats caused the plague, but medieval people did not know this!)"
    }
  },
  {
    lessonId: "lesson_1_2",
    blockContains: "Physicians were the most highly trained medical professionals",
    hinge: {
      text: "Why did a medieval physician rarely treat ordinary peasants?",
      options: [
        "They were too busy dissecting human bodies in universities.",
        "They only treated soldiers injured in battles.",
        "Their university training made them incredibly expensive, so only the rich could afford them.",
        "Peasants preferred to use magic and witchcraft instead."
      ],
      correct_index: 2,
      explanation: "Physicians trained for 7-10 years at university. Because there were very few of them, they charged huge fees that only the nobility could afford. Peasants relied on local wise women or apothecaries."
    }
  },
  {
    lessonId: "lesson_1_2",
    blockContains: "Apothecaries mixed herbal remedies",
    hinge: {
      text: "What was the main difference between an apothecary and a physician?",
      options: [
        "Physicians performed surgery, apothecaries diagnosed illness.",
        "Apothecaries mixed herbal remedies based on experience, while physicians diagnosed using astrology and ancient books.",
        "Apothecaries were trained at university, physicians were not.",
        "Physicians were always monks, apothecaries were always women."
      ],
      correct_index: 1,
      explanation: "Apothecaries were practical tradesmen who mixed remedies (like modern pharmacists), while physicians were academic scholars who diagnosed patients using urine charts, star signs, and Galen's texts."
    }
  },
  {
    lessonId: "lesson_1_3",
    blockContains: "The Black Death arrived in England in 1348",
    hinge: {
      text: "Which of the following was an actual treatment medieval people used to try and cure the Black Death?",
      options: [
        "Drinking clean water boiled to kill germs.",
        "Taking antibiotics like penicillin.",
        "Strapping live toads to buboes to draw out the poison.",
        "Performing complex internal surgery to remove the infected organs."
      ],
      correct_index: 2,
      explanation: "Without knowing about germs, people tried bizarre treatments based on superstition and humours, including strapping live animals to their sores, bloodletting, or whipping themselves (flagellants)."
    }
  }
];

let matchCount = 0;

injections.forEach(inj => {
    // We will do a string replacement to inject the hinge question directly into the block string to avoid JSON stringify destroying functions
    // Find the block text
    const blockTextString = `"text": ${JSON.stringify(inj.blockContains)}`; // wait, it might not match exactly.
    // Better: find the block index in the file
});

// Since parsing and stringifying data.js destroys functions (if any exist), let's use a regex replace method.
// We'll search for the blockText and append the hinge_question.

injections.forEach(inj => {
    // Find the string in the file
    let snippet = inj.blockContains;
    let index = dataContent.indexOf(snippet);
    if (index !== -1) {
        // Find the end of this block object which is the next closing brace }
        // Actually, we can just replace the snippet string. 
        // The block looks like: "text": "... snippet ..."
        // We can replace the end of the string `"` with `",\n"hinge_question": ` + JSON.stringify(inj.hinge)
        // Wait, the block might have tasks: [] after it.
        // Let's use regex to find the end of the text string.
        
        let regex = new RegExp(`("text":\\s*".*?${snippet.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&')}.*?")`, 's');
        if (regex.test(dataContent)) {
            let hingeStr = `,\n          "hinge_question": ${JSON.stringify(inj.hinge, null, 12).replace(/\\n/g, '\\n')}`;
            dataContent = dataContent.replace(regex, `$1${hingeStr}`);
            matchCount++;
        }
    }
});

fs.writeFileSync(dataPath, dataContent);
console.log(`Injected ${matchCount} hinge questions into KT1.`);
