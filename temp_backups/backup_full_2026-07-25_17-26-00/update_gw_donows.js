const fs = require('fs');

const lesson2Items = [
  { question: "1. Who was the first Emperor of the newly unified Germany in 1871?", answer: "Kaiser Wilhelm I" },
  { question: "2. Which brilliant Chancellor united the German states?", answer: "Otto von Bismarck" },
  { question: "3. Which country was humiliatingly defeated in the Franco-Prussian War?", answer: "France" },
  { question: "4. What strategic border territory did Germany take in 1871?", answer: "Alsace-Lorraine" },
  { question: "5. What is the French word for their desire for revenge?", answer: "Revanche" },
  { question: "6. Explain how Bismarck used the Ems Telegram to trap France into a war.", answer: "He edited the King's telegram to make it look like an insult to the French ambassador, forcing France to declare war out of pride." },
  { question: "7. Detail the two military advantages the Prussian army possessed.", answer: "Advanced railway networks for rapid mobilization and superior Krupp steel artillery." },
  { question: "8. PAST TOPIC: Why was the location of the German Empire's proclamation so humiliating for France?", answer: "It took place in the Hall of Mirrors at the Palace of Versailles, the historic heart of French royalty." },
  { question: "9. PAST TOPIC: Why did Bismarck weave a complex web of secret alliances after 1871?", answer: "To keep France diplomatically isolated so they could never find an ally to help them fight a revenge war." },
  { question: "10. PAST TOPIC: What was Bismarck's ultimate nightmare scenario?", answer: "A two-front war against both France and Russia simultaneously." }
];

const lesson3Items = [
  { question: "1. What was the name of Kaiser Wilhelm II's aggressive foreign policy?", answer: "Weltpolitik (World Policy)" },
  { question: "2. Explain how Wilhelm II's actions during the Moroccan Crises backfired on Germany.", answer: "By aggressively interfering, he terrified Britain into forming a closer military alliance with France." },
  { question: "3. Why was the Franco-Russian Alliance a strategic disaster for Germany?", answer: "It destroyed Bismarck's diplomatic safety net and threatened Germany with a two-front war." },
  { question: "4. Evaluate how the 'Scramble for Africa' increased tensions in Europe.", answer: "It turned European empires into global rivals, causing constant friction and border disputes." },
  { question: "5. Describe the impact of Britain abandoning its policy of 'Splendid Isolation'.", answer: "Britain realized it could no longer defend its empire alone and sought European allies." },
  { question: "6. Evaluate the role of Wilhelm II's personality in destabilizing Europe.", answer: "His impulsive, aggressive nature alienated allies and destroyed Bismarck's careful diplomatic balance." },
  { question: "7. Who dismissed Otto von Bismarck in 1890?", answer: "Kaiser Wilhelm II" },
  { question: "8. PAST TOPIC: What strategic territory did Germany take from France in 1871?", answer: "Alsace-Lorraine" },
  { question: "9. PAST TOPIC: Why did Bismarck weave a complex web of secret alliances after 1871?", answer: "To keep France diplomatically isolated so they could never start a revenge war." },
  { question: "10. PAST TOPIC: What was Bismarck's ultimate nightmare scenario?", answer: "A two-front war against both France and Russia simultaneously." }
];

const lesson4Items = [
  { question: "1. What revolutionary British battleship was launched in 1906?", answer: "HMS Dreadnought" },
  { question: "2. What was the 'Two-Power Standard'?", answer: "A British policy stating their navy must be as large as the next two rival navies combined." },
  { question: "3. Why did Germany feel it needed a massive high seas fleet?", answer: "To protect their growing global trade and forcefully assert their status as a top-tier world power." },
  { question: "4. Explain how the invention of the Dreadnought ironically hurt British supremacy.", answer: "It rendered older ships obsolete, wiping out Britain's numerical lead and allowing Germany to compete from scratch." },
  { question: "5. What was the popular British slogan chanted by the public in 1909?", answer: "We want eight, and we won't wait!" },
  { question: "6. Why did Britain feel their survival depended on massive naval supremacy?", answer: "As an island nation, Britain relied on the sea to import food and defend its global empire." },
  { question: "7. How did the Anglo-German naval race make war more likely?", answer: "It convinced Britain that Germany was an existential threat, cementing Britain's commitment to the Triple Entente." },
  { question: "8. PAST TOPIC: What was the name of Kaiser Wilhelm II's aggressive foreign policy?", answer: "Weltpolitik (World Policy)" },
  { question: "9. PAST TOPIC: Explain how Wilhelm II's actions during the Moroccan Crises backfired on Germany.", answer: "By aggressively interfering, he terrified Britain into forming a closer military alliance with France." },
  { question: "10. PAST TOPIC: Evaluate how the 'Scramble for Africa' increased tensions in Europe.", answer: "It turned European empires into global rivals, causing constant friction and border disputes." }
];

const lesson5Items = [
  { question: "1. Which three countries made up the Triple Entente?", answer: "Great Britain, France, and Russia" },
  { question: "2. Which three countries made up the Triple Alliance?", answer: "Germany, Austria-Hungary, and Italy" },
  { question: "3. Explain the theoretical logic of how the alliance system was supposed to keep peace.", answer: "It was believed that the blocs were so heavily armed that attacking one would trigger an unwinnable global war, deterring aggression." },
  { question: "4. Why did the alliance system actually increase paranoia instead of security?", answer: "Nations felt trapped by their defensive commitments and constantly feared their rivals were plotting a sudden attack." },
  { question: "5. What military plan did Germany create to avoid a long two-front war?", answer: "The Schlieffen Plan" },
  { question: "6. Which neutral country did the Schlieffen Plan require invading?", answer: "Belgium" },
  { question: "7. What feeling of being surrounded by enemies haunted German planners?", answer: "Encirclement" },
  { question: "8. PAST TOPIC: What revolutionary British battleship was launched in 1906?", answer: "HMS Dreadnought" },
  { question: "9. PAST TOPIC: Explain how the invention of the Dreadnought ironically hurt British supremacy.", answer: "It rendered older ships obsolete, wiping out Britain's numerical lead and allowing Germany to compete from scratch." },
  { question: "10. PAST TOPIC: How did the Anglo-German naval race make war more likely?", answer: "It convinced Britain that Germany was an existential threat, cementing Britain's commitment to the Triple Entente." }
];

let fileContent = fs.readFileSync('great_war/data.js', 'utf8');
const objStr = fileContent.replace('export const unitData = ', '');
let unitData;
eval('unitData = ' + objStr);

unitData.lessons.forEach(l => {
  if (l.id === 'lesson_2') l.do_now.items = lesson2Items;
  if (l.id === 'lesson_3') l.do_now.items = lesson3Items;
  if (l.id === 'lesson_4') l.do_now.items = lesson4Items;
  if (l.id === 'lesson_5') l.do_now.items = lesson5Items;
});

let newFileContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync('great_war/data.js', newFileContent, 'utf8');
console.log('Successfully updated great_war/data.js with micro-spacing fallback!');
