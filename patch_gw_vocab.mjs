import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/great_war/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

const vocabData = [
  { // Lesson 1
    vocab: [
      { term: "Alsace-Lorraine", definition: "A resource-rich border region taken by Germany from France in 1871." },
      { term: "Ems Telegram", definition: "A diplomatic message altered by Bismarck to provoke France into declaring war." },
      { term: "Reparations", definition: "Massive financial fines forced upon a defeated nation to pay for war damages." },
      { term: "Siege", definition: "A military operation where enemy forces surround a town or building, cutting off essential supplies." }
    ],
    cloze: "In 1870, Chancellor Bismarck edited the [Ems Telegram] to trick France into war. After a devastating [Siege] of Paris, France was forced to pay massive [Reparations] and hand over the vital territory of [Alsace-Lorraine]."
  },
  { // Lesson 2
    vocab: [
      { term: "Imperialism", definition: "A policy of extending a country's power and influence through diplomacy or military force." },
      { term: "Scramble for Africa", definition: "The rapid invasion, annexation, and division of African territory by European powers." },
      { term: "Empire", definition: "An extensive group of states or countries ruled over by a single supreme authority." },
      { term: "Colony", definition: "A country or area under the full or partial political control of another country." }
    ],
    cloze: "In the late 19th century, European powers engaged in a [Scramble for Africa]. This fierce [Imperialism] was driven by a desire for raw materials and global prestige. Every major power wanted to build a vast overseas [Empire] by taking control of another [Colony]."
  },
  { // Lesson 3
    vocab: [
      { term: "Dreadnought", definition: "A revolutionary type of heavily-armoured battleship introduced by Britain in 1906." },
      { term: "Arms Race", definition: "A competition between nations to achieve superiority in the quantity and quality of military weapons." },
      { term: "Two-Power Standard", definition: "A British policy stating their navy must be as large as the next two largest navies combined." },
      { term: "Naval Supremacy", definition: "Having the most powerful and dominant navy in the world." }
    ],
    cloze: "Britain's traditional [Naval Supremacy] was challenged when Germany began a rapid naval buildup. This sparked a fierce [Arms Race] between the two nations. Britain relied on the [Two-Power Standard] to maintain a massive fleet, but the invention of the heavily-armed [Dreadnought] battleship reset the competition."
  },
  { // Lesson 4
    vocab: [
      { term: "Triple Entente", definition: "The military alliance linking the Russian Empire, the French Third Republic, and the United Kingdom." },
      { term: "Triple Alliance", definition: "A secret agreement between Germany, Austria-Hungary, and Italy formed in May 1882." },
      { term: "Reinsurance Treaty", definition: "A secret agreement between Germany and Russia arranged by Bismarck to prevent a two-front war." },
      { term: "Encirclement", definition: "A military term for the situation when a force or target is isolated and surrounded by enemy forces." }
    ],
    cloze: "Bismarck feared a two-front war and created the [Reinsurance Treaty] to keep Russia friendly. However, after his dismissal, Germany faced a nightmare scenario: [Encirclement] by hostile powers. Europe split into two armed camps: the [Triple Entente] (Britain, France, Russia) and the [Triple Alliance] (Germany, Austria-Hungary, Italy)."
  },
  { // Lesson 5
    vocab: [
      { term: "Assassination", definition: "The murder of a prominent person, often a political leader or ruler." },
      { term: "Black Hand", definition: "A secret Serbian society that used terrorist methods to promote the liberation of Serbs outside Serbia." },
      { term: "Ultimatum", definition: "A final demand or statement of terms, the rejection of which will result in retaliation or a breakdown in relations." },
      { term: "Mobilisation", definition: "The action of a country or its government preparing and organizing troops for active service." }
    ],
    cloze: "The [Assassination] of Archduke Franz Ferdinand by the [Black Hand] terrorist group sparked a massive crisis. Austria-Hungary issued a severe [Ultimatum] to Serbia, demanding they surrender their sovereignty. When Serbia refused, Russia began a massive [Mobilisation] of its army, dragging the entire alliance system into war."
  }
];

data.lessons.forEach((lesson, i) => {
  if (vocabData[i]) {
    lesson.vocab = vocabData[i].vocab;
    lesson.vocab_cloze_text = vocabData[i].cloze;
    lesson.flashcards = [...vocabData[i].vocab];
  }
});

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected vocab and cloze texts into great_war/data.js");
