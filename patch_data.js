const fs = require('fs');

let data = fs.readFileSync('early_modern_world/data.js', 'utf8');

const cloze4 = `"vocab_cloze_text": "King Charles I believed in the [Divine Right of Kings], which angered Parliament. After losing the Civil War to the [New Model Army], the monarchy was abolished and replaced by the [Commonwealth]. Meanwhile, wealthy merchants who funded Parliament grew rich from Caribbean [Plantation] slavery. They then passed the [Navigation Acts] to ensure all this wealth flowed directly into English ships.",`;

const cloze7 = `"vocab_cloze_text": "To write a successful [Synoptic] essay, historians must evaluate both progress and backwardness. By 1750, Britain's [Modernity] was visible in its global trade network and the creation of a [National Debt] managed by the Bank of England. However, this wealth contrasted sharply with brutal domestic laws like [The Bloody Code] and an unfair political system where corrupt [Rotten Borough] seats allowed wealthy elites to buy their way into Parliament.",`;

let lesson4Index = data.indexOf('"title": "Who controlled Britain: The King, Parliament, or Imperial Profits?"');
let lesson4VocabEnd = data.indexOf('],', data.indexOf('"vocab": [', lesson4Index)) + 2;
data = data.slice(0, lesson4VocabEnd) + '\n        ' + cloze4 + data.slice(lesson4VocabEnd);

let lesson7Index = data.indexOf('"title": "How \'modern\' was Britain by 1750? (Synthesis & Assessment)"');
let lesson7VocabEnd = data.indexOf('],', data.indexOf('"vocab": [', lesson7Index)) + 2;
data = data.slice(0, lesson7VocabEnd) + '\n        ' + cloze7 + data.slice(lesson7VocabEnd);

fs.writeFileSync('early_modern_world/data.js', data, 'utf8');
console.log('Added cloze texts');
