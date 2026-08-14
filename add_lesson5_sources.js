const fs = require('fs');
const file = 'industrialisation_and_empire/data.js';

let rawData = fs.readFileSync(file, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

let data = JSON.parse(jsonStr);

let lesson5 = data.lessons.find(l => l.id === 'lesson_5');

if (lesson5) {
  let mutinyBlock = lesson5.narrative_blocks.find(b => b.title === "From Mutiny to National War");
  if (mutinyBlock) {
    mutinyBlock.source = {
      type: "written",
      title: "Source A: The Indian Rebel Manifesto",
      content: "\"It is well known to all, that in this age the people of Hindoostan, both Hindoos and Mohammedans, are being ruined under the tyranny and oppression of the infidel and treacherous English. It is therefore the bounden duty of all the wealthy people of India... to stake their lives and property for the well-being of the public.\"\n— The Azamgarh Proclamation, issued by rebel leaders in August 1857",
      provenance_clue: "A public manifesto written and distributed by rebel leaders to convince local rulers and ordinary people to join the uprising."
    };
    mutinyBlock.tasks = [
      {
        type: "source_analysis",
        qNum: 1,
        question: "Source Analysis: According to Source A, how did the rebel leaders attempt to unite the diverse religious populations of India against the British?",
        model_answer: "The rebel leaders attempted to unite the diverse populations by emphasizing a shared suffering. The proclamation explicitly addresses \"both Hindoos and Mohammedans,\" arguing that regardless of their religious differences, both groups were \"being ruined under the tyranny and oppression\" of the British. By framing the British as \"infidel and treacherous\" outsiders, the leaders created a common enemy to foster national unity."
      }
    ];
  }

  let reprisalBlock = lesson5.narrative_blocks.find(b => b.title === "Industrialized Brutality and Reprisal");
  if (reprisalBlock) {
    reprisalBlock.source = {
      type: "written",
      title: "Source B: The British Military Reprisal",
      content: "\"We have power of life and death in our hands, and I assure you we spare not. A very summary trial is all that takes place. The condemned are placed under a tree with a rope around their necks, standing on a carriage, and it is then pulled away.\"\n— Extract from a private letter written by a British officer stationed in Allahabad, 1857",
      provenance_clue: "A private, uncensored letter sent back home to Britain by an officer who directly participated in the brutal suppression."
    };
    reprisalBlock.tasks = [
      {
        type: "provenance",
        qNum: 2,
        question: "Provenance Analysis: Why might a private letter from a British officer stationed in India in 1857 (Source B) be a highly reliable source for a historian studying the brutality of the British reprisal?",
        model_answer: "A private letter is highly reliable for studying British brutality because it was not intended for official government publication or public propaganda. The officer had no reason to censor his actions or downplay the violence to his family; instead, he openly admits that \"we spare not\" and describes the horrific \"summary trials.\" This candid admission of extreme violence provides authentic, unfiltered evidence of the terror tactics the British state used to crush the rebellion."
      }
    ];
  }
}

fs.writeFileSync(file, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully added sources to Lesson 5.');
