import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;\s*$/, '');
let unitData;
try {
  unitData = JSON.parse(jsonContent);
} catch (e) {
  const script = dataContent.replace('export const unitData = ', 'module.exports = ');
  fs.writeFileSync('temp_data.cjs', script);
  unitData = require('./temp_data.cjs');
}

// 1. Fix Lesson 4 Primary Source
unitData.lessons[3].primary_source.title = "Source A: 'The Chain of Friendship', an American cartoon published in the Brooklyn Eagle, July 1914.";
unitData.lessons[3].primary_source.caption = "<strong>What is this source showing?</strong> This cartoon shows how the complex web of alliances dragged all the European powers into war. Serbia is threatened by Austria, who is threatened by Russia, who is threatened by Germany, and so on.";
unitData.lessons[3].primary_source.tasks = [
  {
    "type": "draw",
    "text": "Task 1: Identify which figure represents Germany and explain how you know.",
    "model": "The large, aggressive figure second from the right, wearing the spiked Pickelhaube helmet, represents Germany threatening Russia."
  },
  {
    "type": "written",
    "text": "Task 2: Draw an arrow to the figure representing Russia and annotate why they are getting involved.",
    "model": "Russia (the third figure from the left) is getting involved to protect its smaller Slavic ally, Serbia, from being crushed by Austria-Hungary."
  }
];
unitData.lessons[3].primary_source.teacher_note = "This cartoon perfectly illustrates how the alliance system functioned as a 'doomsday machine'. A localized dispute in the Balkans quickly cascaded into a global conflict because each nation was bound to protect its ally.";
// IMPORTANT: change the src to the cartoon!
unitData.lessons[3].primary_source.src = "assets/was_military_matrix.png";

// 2. Fix Do Now Activities to only ask previous lessons
// Lesson 2 Do Now (Tests Lesson 1)
unitData.lessons[1].do_now.items = [
  { question: "1. Who was the first Emperor of the newly unified Germany in 1871?", answer: "Kaiser Wilhelm I" },
  { question: "2. Which brilliant Chancellor united the German states?", answer: "Otto von Bismarck" },
  { question: "3. Which country was humiliatingly defeated in the Franco-Prussian War?", answer: "France" },
  { question: "4. What strategic border territory did Germany take in 1871?", answer: "Alsace-Lorraine" },
  { question: "5. What is the French word for their desire for revenge?", answer: "Revanche" },
  { question: "6. Explain how Bismarck used the Ems Telegram to trap France into a war.", answer: "He edited the King's telegram to make it look like an insult to the French ambassador, forcing France to declare war out of pride." },
  { question: "7. Detail the two military advantages the Prussian army possessed.", answer: "Advanced railway networks for rapid mobilization and superior Krupp steel artillery." },
  { question: "8. Why was the location of the German Empire's proclamation so humiliating for France?", answer: "It took place in the Hall of Mirrors at the Palace of Versailles, the historic heart of French royalty." },
  { question: "9. Why did Bismarck weave a complex web of secret alliances after 1871?", answer: "To keep France diplomatically isolated so they could never find an ally to help them fight a revenge war." },
  { question: "10. What was Bismarck's ultimate nightmare scenario?", answer: "A two-front war against both France and Russia simultaneously." }
];

// Lesson 3 Do Now (Tests Lesson 1 & 2)
unitData.lessons[2].do_now.items = [
  { question: "1. What territory did Germany take from France in 1871?", answer: "Alsace-Lorraine" },
  { question: "2. Which young Emperor dismissed Bismarck in 1890?", answer: "Kaiser Wilhelm II" },
  { question: "3. What was Wilhelm II's aggressive foreign policy called?", answer: "Weltpolitik (World Policy)" },
  { question: "4. What do we call the competitive rush to claim territory in Africa?", answer: "The Scramble for Africa" },
  { question: "5. Which alliance was formed directly because Wilhelm let the Reinsurance Treaty expire?", answer: "The Franco-Russian Alliance" },
  { question: "6. Explain how Wilhelm II's actions during the Moroccan Crises backfired.", answer: "By aggressively interfering in Morocco, he terrified Britain into forming a much closer military alliance with France (the Entente Cordiale)." },
  { question: "7. Describe the impact of Britain abandoning its policy of 'Splendid Isolation'.", answer: "Britain realized it could no longer defend its global empire alone and began actively seeking European allies against Germany." },
  { question: "8. How did the Scramble for Colonies change European diplomacy?", answer: "It turned European empires into global rivals, causing constant friction and border disputes across Africa and Asia." },
  { question: "9. Why was the Franco-Russian Alliance a strategic disaster for Germany?", answer: "It meant Germany was now surrounded on both sides and would face a devastating two-front war." },
  { question: "10. Evaluate the role of Wilhelm II's personality in destabilizing Europe.", answer: "His impulsive, aggressive, and unpredictable nature alienated potential allies and destroyed the careful balance Bismarck had built." }
];

// Lesson 4 Do Now (Tests Lesson 1, 2, 3)
unitData.lessons[3].do_now.items = [
  { question: "1. What was the name of the revolutionary British battleship launched in 1906?", answer: "HMS Dreadnought" },
  { question: "2. Who was the German Admiral pushing for a larger high seas fleet?", answer: "Admiral von Tirpitz" },
  { question: "3. What British policy stated their navy must be as large as the next two combined?", answer: "The Two-Power Standard" },
  { question: "4. What organization did Tirpitz create to build public support for the navy?", answer: "The Navy League" },
  { question: "5. What was the popular British slogan chanted by the public in 1909?", answer: "We want eight, and we won't wait!" },
  { question: "6. Explain why Britain felt their survival depended on massive naval supremacy.", answer: "As an island nation with a global empire, Britain relied on the sea to import food, protect trade routes, and defend its shores." },
  { question: "7. Why did Germany feel they needed a massive navy?", answer: "To protect their growing global trade and forcefully assert their 'place in the sun' as a top-tier world power." },
  { question: "8. How did the invention of the Dreadnought ironically hurt British supremacy?", answer: "It rendered all older ships obsolete, effectively wiping out Britain's numerical lead and allowing Germany to compete from scratch." },
  { question: "9. Describe the psychological impact of the arms race on the British public.", answer: "It created intense paranoia, fueled by invasion-scare novels and a deeply entrenched fear of a German attack." },
  { question: "10. Why did the Anglo-German naval race make war more likely?", answer: "It convinced Britain that Germany was a direct existential threat, cementing Britain's commitment to the Triple Entente." }
];

// Lesson 5 Do Now (Tests Lesson 1, 2, 3, 4)
unitData.lessons[4].do_now.items = [
  { question: "1. Which three countries made up the Triple Entente?", answer: "Great Britain, France, and Russia" },
  { question: "2. Which three countries made up the Triple Alliance?", answer: "Germany, Austria-Hungary, and Italy" },
  { question: "3. What military plan did Germany create to avoid a long two-front war?", answer: "The Schlieffen Plan" },
  { question: "4. Which neutral country did the Schlieffen Plan require invading?", answer: "Belgium" },
  { question: "5. What feeling of being surrounded by enemies haunted German planners?", answer: "Encirclement" },
  { question: "6. Explain the theoretical logic of how the alliance system was supposed to keep peace.", answer: "It was believed that the blocs were so heavily armed that attacking one would trigger a massive, unwinnable war against all, deterring aggression." },
  { question: "7. Why did German generals believe a European war was 'inevitable and necessary'?", answer: "They feared Russia was industrializing so rapidly that Germany had to fight a preventative war immediately before Russia became too strong to defeat." },
  { question: "8. How did the massive expansion of railways alter the speed of war?", answer: "It allowed generals to mobilize hundreds of thousands of troops to the front lines in a matter of hours, making military timetables inflexible." },
  { question: "9. Describe the danger of dividing Europe into two 'armed camps'.", answer: "Any single local dispute would no longer remain isolated; it would automatically drag all the Great Powers into a total global slaughter." },
  { question: "10. Why did the alliance system actually increase paranoia instead of security?", answer: "Nations felt trapped by their defensive commitments and constantly feared their rivals were plotting a coordinated sudden attack." }
];

const newJsContent = "export const unitData = " + JSON.stringify(unitData, null, 2) + ";\\n";
fs.writeFileSync(dataPath, newJsContent);
console.log("Fixed Primary Source for Lesson 4 and aligned Do Now activities.");
