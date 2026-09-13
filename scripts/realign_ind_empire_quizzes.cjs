const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function seededShuffle(arr, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    hash = Math.sin(hash++) * 10000;
    const j = Math.floor((hash - Math.floor(hash)) * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function makeQ(qText, ansText, explanationText, distractors, seed) {
  const unShuffled = [ansText, ...distractors];
  const options = seededShuffle(unShuffled, seed);
  return {
    question: qText,
    q: qText,
    options: options,
    answer: ansText,
    a: ansText,
    explanation: explanationText,
  };
}

async function realign() {
  const dataJsPath = path.join(__dirname, '..', 'units', 'industrialisation_and_empire', 'data.js');
  const mod = await import(require('url').pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  console.log('Re-aligning industrialisation_and_empire quizzes...');

  // --- Lesson 4: Fix Q1, Q2, Q3 ---
  const l4 = unitData.lessons[3];
  console.log('Fixing Lesson 4:', l4.title);
  const l4_newQ1 = makeQ(
    'What private joint-stock corporation held a royal charter to control British trade and territories in India until 1858?',
    'The East India Company (EIC)',
    'Founded in 1600, the East India Company became a corporate empire with its own private army, extracting taxes and monopolizing trade across the Indian subcontinent.',
    ['The Royal African Company', "The Hudson's Bay Company", 'The South Sea Company'],
    'l4_q1_seed',
  );
  const l4_newQ2 = makeQ(
    "What was the 'Two-Power Standard' adopted by Britain to guarantee global maritime supremacy?",
    'A policy requiring the Royal Navy to be as strong as the next two largest navies combined.',
    "Adopted formally in the Naval Defence Act of 1889, the Two-Power Standard ensured Britain's battle fleet could defeat any two rival navies acting in alliance.",
    [
      'A treaty dividing global naval bases equally between Britain and France.',
      'A rule requiring every warship to carry twice as many guns as foreign vessels.',
      'A law requiring two admirals to command every fleet squadron.',
    ],
    'l4_q2_seed',
  );
  const l4_newQ3 = makeQ(
    "Launched in 1860, which Portsmouth-associated vessel was the Royal Navy's first revolutionary iron-hulled armoured warship?",
    'HMS Warrior',
    'HMS Warrior, completed in 1860, combined an iron hull with steam power and heavy rifled guns, rendering all existing wooden warships immediately obsolete.',
    ['HMS Dreadnought', 'HMS Victory', 'HMS Beagle'],
    'l4_q3_seed',
  );
  l4.quiz[0] = l4_newQ1;
  l4.quiz[1] = l4_newQ2;
  l4.quiz[2] = l4_newQ3;
  console.log('  Lesson 4 now has', l4.quiz.length, 'questions.');

  // --- Lesson 5: Slice from 22 to 20 ---
  const l5 = unitData.lessons[4];
  console.log('Fixing Lesson 5:', l5.title);
  l5.quiz = l5.quiz.slice(0, 20);
  console.log('  Lesson 5 now has', l5.quiz.length, 'questions.');

  // --- Lesson 6: Fix Q1, Q2, Q3 ---
  const l6 = unitData.lessons[5];
  console.log('Fixing Lesson 6:', l6.title);
  const l6_newQ1 = makeQ(
    "What repressive legislation, known as the 'Six Acts', did Parliament pass in response to the 1819 Peterloo Massacre?",
    'Laws banning unauthorized military drilling, taxing radical pamphlets, and prohibiting large meetings.',
    "Fearing a French-style revolution, Lord Liverpool's government enacted the Six Acts (1819) to suppress political dissent, criminalize mass assemblies, and censor radical newspapers.",
    [
      'A law extending the right to vote to all urban factory workers.',
      'An act abolishing the traditional property tax for rural peasants.',
      'A statute legalizing trade unions across northern manufacturing towns.',
    ],
    'l6_q1_seed',
  );
  const l6_newQ2 = makeQ(
    "Who was the radical orator whose speech on parliamentary reform at St Peter's Field in 1819 was interrupted by the Manchester Yeomanry charge?",
    "Henry 'Orator' Hunt",
    "Henry Hunt was Britain's most famous radical speaker, known for his signature white top hat and fiery speeches demanding universal suffrage and the repeal of the Corn Laws.",
    ['William Lovett', "Feargus O'Connor", 'Robert Owen'],
    'l6_q2_seed',
  );
  const l6_newQ3 = makeQ(
    "Which London cabinet-maker and radical activist drafted the six points of the 'People's Charter' in 1838?",
    'William Lovett',
    "William Lovett co-founded the London Working Men's Association and authored the 1838 People's Charter, advocating moral force and peaceful constitutional petitions to secure working-class voting rights.",
    ['George Loveless', 'Arthur Wellesley', 'Edwin Chadwick'],
    'l6_q3_seed',
  );
  l6.quiz[0] = l6_newQ1;
  l6.quiz[1] = l6_newQ2;
  l6.quiz[2] = l6_newQ3;
  console.log('  Lesson 6 now has', l6.quiz.length, 'questions.');

  // --- Lesson 7: Fix Q1, Q2, Q3 ---
  const l7 = unitData.lessons[6];
  console.log('Fixing Lesson 7:', l7.title);
  const l7_newQ1 = makeQ(
    'Which Whig Prime Minister led the parliamentary battle to pass the landmark 1832 Great Reform Act?',
    'Earl Grey',
    'Charles Grey, 2nd Earl Grey, recognized that the aristocracy had to reform parliament or face violent revolution, pushing the 1832 Reform Act through intense House of Lords opposition.',
    ['The Duke of Wellington', 'Robert Peel', 'Benjamin Disraeli'],
    'l7_q1_seed',
  );
  const l7_newQ2 = makeQ(
    'Which major industrial cities, completely unrepresented before 1832, were finally granted parliamentary MPs under the Great Reform Act?',
    'Manchester, Birmingham, and Leeds',
    "The 1832 Reform Act disenfranchised corrupt 'rotten boroughs' and transferred their parliamentary seats to rapidly growing industrial powerhouses like Manchester and Birmingham.",
    ['Old Sarum and Dunwich', 'Oxford and Cambridge', 'Portsmouth and Southampton'],
    'l7_q2_seed',
  );
  const l7_newQ3 = makeQ(
    'Which 1872 statute finally eliminated public bribery and landlord intimidation during elections by introducing private voting booths?',
    'The Secret Ballot Act',
    'The Ballot Act of 1872 ended the tradition of public voting on open hustings, enabling working men and tenants to vote without fear of being evicted by their landlords or fired by factory bosses.',
    ['The Great Reform Act', 'The Public Health Act', 'The Representation of the People Act'],
    'l7_q3_seed',
  );
  l7.quiz[0] = l7_newQ1;
  l7.quiz[1] = l7_newQ2;
  l7.quiz[2] = l7_newQ3;
  console.log('  Lesson 7 now has', l7.quiz.length, 'questions.');

  // --- Lesson 8: Remove repeats to make exactly 20 ---
  const l8 = unitData.lessons[7];
  console.log('Fixing Lesson 8:', l8.title);
  // Filter out the 3 questions about Henry Cort, puddling production, and Fareham Red bricks
  l8.quiz = l8.quiz.filter((q) => {
    const txt = q.question || q.q;
    return (
      !txt.includes('Henry Cort') &&
      !txt.includes('Fareham Red') &&
      !txt.includes('Two-Power Standard')
    );
  });
  // Ensure exactly 20
  l8.quiz = l8.quiz.slice(0, 20);
  console.log('  Lesson 8 now has', l8.quiz.length, 'questions.');

  // Verify all lessons in industrialisation_and_empire have exactly 20 questions
  unitData.lessons.forEach((l, idx) => {
    console.log(`Lesson ${idx + 1} (${l.id}): ${l.quiz.length} questions`);
    if (l.quiz.length !== 20) {
      throw new Error(`Lesson ${idx + 1} has ${l.quiz.length} questions instead of 20!`);
    }
  });

  const fileContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
  fs.writeFileSync(dataJsPath, fileContent, 'utf8');
  console.log('Saved updated industrialisation_and_empire/data.js.');

  execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
  console.log('✅ Syntax validation passed.');
}

realign().catch((err) => {
  console.error('❌ Error realigning industrialisation_and_empire:', err);
  process.exit(1);
});
