import fs from 'fs';

const dataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Patch 1: Lesson 1
const lesson1Cloze = `\n      "vocab_cloze_text": "Following the First World War, Britain was granted a [Mandate] to govern Palestine. This soon conflicted with [Zionism], the movement seeking to establish a Jewish homeland in the region. Frustrated by British immigration restrictions, radical paramilitary groups like the [Irgun] began a violent insurgency. The ensuing conflict and the creation of Israel in 1948 led to the displacement of hundreds of thousands of Palestinians, an event known in Arabic as the [Nakba].",`;
const lesson1Target = `          "term": "Nakba",
          "definition": "Arabic term for 'Catastrophe'; refers to the mass displacement of 700,000 Palestinians in 1948."
        }
      ],`;
content = content.replace(lesson1Target, lesson1Target + lesson1Cloze);


// Patch 2: Lesson 4
const lesson4Cloze = `\n      "vocab_cloze_text": "In the 1960s, Palestinian nationalism grew stronger with the creation of the [PLO], an umbrella organization, and its dominant guerrilla faction, [Fatah]. Border tensions flared violently when Israel launched the [Samu Raid] into the West Bank in 1966. These escalating events eventually culminated in June 1967 when Israel launched [Operation Focus], a devastating pre-emptive air strike that wiped out the Arab air forces on the ground.",`;
const lesson4Target = `          "term": "Operation Focus",
          "definition": "Pre-emptive Israeli air strike on 5 June 1967 that destroyed Arab air capabilities on the ground."
        }
      ],`;
content = content.replace(lesson4Target, lesson4Target + lesson4Cloze);


// Patch 3: Lesson 7
const lesson7Cloze = `\n      "vocab_cloze_text": "Following the Yom Kippur War, Henry Kissinger engaged in relentless [Shuttle Diplomacy] to broker disengagement agreements. This paved the way for Anwar Sadat's historic address to the Israeli [Knesset] in Jerusalem. In 1978, the US mediated the [Camp David Accords], establishing a framework for peace between Egypt and Israel. However, Sadat's willingness to make peace angered many Arabs, leading to his assassination by elements of [Islamist Extremism].",`;
const lesson7Target = `          "term": "Islamist Extremism",
          "definition": "Radical religious-political ideology; elements of which assassinated Sadat for making peace with Israel."
        }
      ],`;
content = content.replace(lesson7Target, lesson7Target + lesson7Cloze);


fs.writeFileSync(dataPath, content, 'utf8');
console.log("Successfully injected vocab_cloze_text properties into data.js!");
