const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

// Add flashcards
const flashcards = [
  // L1
  [
    { term: "Franco-Prussian War", definition: "A conflict in 1870-71 where German states defeated France, leading to the creation of the German Empire." },
    { term: "Alsace-Lorraine", definition: "A wealthy, resource-rich region annexed by Germany from France in 1871, fueling French desire for revenge." },
    { term: "Revanche", definition: "The French political desire to seek revenge against Germany and recapture lost territory." },
    { term: "Otto von Bismarck", definition: "The German Chancellor who orchestrated the unification of Germany and established a defensive web of alliances." },
    { term: "Encirclement", definition: "Germany's geographic nightmare of being surrounded by hostile allied powers (France and Russia)." },
    { term: "Reinsurance Treaty", definition: "A secret 1887 agreement between Germany and Russia orchestrated by Bismarck to prevent a two-front war." }
  ],
  // L2
  [
    { term: "Kaiser Wilhelm II", definition: "The ambitious and erratic German Emperor who dismissed Bismarck and pursued an aggressive global policy." },
    { term: "Weltpolitik", definition: "'World Policy'; Wilhelm II's aggressive strategy to turn Germany into a global imperial power with colonies and a large navy." },
    { term: "Entente Cordiale", definition: "A friendly 1904 agreement between Britain and France settling colonial disputes, which Germany later tried to break." },
    { term: "Tangier Crisis (1905)", definition: "The First Moroccan Crisis, where the Kaiser visited Morocco to support its independence, angering France and pushing Britain closer to France." },
    { term: "Agadir Crisis (1911)", definition: "The Second Moroccan Crisis, where Germany sent a gunboat to Morocco, further solidifying the Anglo-French military alliance." },
    { term: "Gunboat Diplomacy", definition: "Foreign policy supported by the use or threat of military force." }
  ],
  // L3
  [
    { term: "Two-Power Standard", definition: "The British policy that their navy must be equal to or greater than the world's next two largest navies combined." },
    { term: "HMS Dreadnought", definition: "A revolutionary British battleship launched in 1906 that made all older ships obsolete and reset the naval arms race." },
    { term: "Splendid Isolation", definition: "Britain's traditional foreign policy of avoiding permanent alliances in Europe and focusing on its overseas empire." },
    { term: "Anglo-German Naval Race", definition: "The intense competition between Britain and Germany from 1898 to 1912 to build the most Dreadnought-class battleships." },
    { term: "Risk Theory", definition: "German Admiral Tirpitz's strategy of building a navy just large enough to threaten Britain, forcing them to make concessions." }
  ],
  // L4
  [
    { term: "The Balkans", definition: "A volatile region in southeastern Europe, nicknamed the 'Powder Keg', due to intense nationalism and competing empires." },
    { term: "Austro-Hungarian Empire", definition: "A declining, multi-ethnic empire threatened by rising Slavic nationalism within its borders." },
    { term: "Greater Serbia", definition: "The nationalist goal to unite all South Slavs into a single independent nation, at the expense of Austria-Hungary." },
    { term: "Bosnian Crisis (1908)", definition: "Austria-Hungary formally annexed Bosnia, infuriating Serbia and Russia, and severely increasing regional tensions." },
    { term: "The Blank Check (1914)", definition: "Germany's unconditional promise to support Austria-Hungary in any conflict with Serbia following the assassination." }
  ],
  // L5
  [
    { term: "Archduke Franz Ferdinand", definition: "The heir to the Austro-Hungarian throne whose assassination in Sarajevo sparked the July Crisis." },
    { term: "Gavrilo Princip", definition: "The 19-year-old Serbian nationalist and member of the Black Hand who assassinated the Archduke." },
    { term: "The Black Hand", definition: "A secret Serbian military society that used terrorism to promote the liberation of Serbs outside Serbia." },
    { term: "The July Crisis", definition: "The month-long chain reaction of diplomatic failures, ultimatums, and military mobilizations following the assassination." },
    { term: "The Schlieffen Plan", definition: "Germany's inflexible military strategy to fight a two-front war by rapidly invading France through neutral Belgium." }
  ],
  // L6
  [
    { term: "Article 231", definition: "The 'War Guilt Clause' of the Treaty of Versailles that forced Germany to accept complete responsibility for causing the war." },
    { term: "Preventative War", definition: "A war launched to destroy a potential threat before it can grow too powerful (often argued as Germany's motivation in 1914)." },
    { term: "Cordon Sanitaire", definition: "A 'quarantine line' of newly independent states (like Poland) created to separate Germany and Soviet Russia." },
    { term: "Treaty of Versailles", definition: "The harsh 1919 peace settlement dictated by the victorious Allies that punished Germany militarily, territorially, and economically." },
    { term: "Margaret MacMillan", definition: "A modern historian who argues that no single nation was solely responsible for WWI, pointing instead to systemic failures." }
  ]
];

flashcards.forEach((cards, index) => {
  if (unitData.lessons[index]) {
    unitData.lessons[index].flashcards = cards;
  }
});

// Generate 50 Quiz Questions
const quizPack = [
  { q: "In what year did the Franco-Prussian War end?", a: "1871" },
  { q: "Which wealthy region did Germany take from France in 1871?", a: "Alsace-Lorraine" },
  { q: "What was the French desire for revenge called?", a: "Revanche" },
  { q: "Who was the German Chancellor that unified Germany?", a: "Otto von Bismarck" },
  { q: "What was Bismarck's greatest strategic fear?", a: "A war on two fronts (Encirclement)" },
  { q: "Which two countries did Bismarck fear would ally against Germany?", a: "France and Russia" },
  { q: "What was the secret 1887 agreement between Germany and Russia?", a: "The Reinsurance Treaty" },
  { q: "Which ambitious German Emperor dismissed Bismarck in 1890?", a: "Kaiser Wilhelm II" },
  { q: "What was Wilhelm II's aggressive global policy called?", a: "Weltpolitik (World Policy)" },
  { q: "What previous policy of Bismarck's focused on European peace?", a: "Realpolitik" },
  { q: "What agreement did Britain and France sign in 1904?", a: "The Entente Cordiale" },
  { q: "In which African country did Wilhelm provoke crises in 1905 and 1911?", a: "Morocco" },
  { q: "What was the result of the First Moroccan (Tangier) Crisis?", a: "Britain and France grew closer, isolating Germany" },
  { q: "What name was given to Germany's aggressive threat of military force?", a: "Gunboat Diplomacy" },
  { q: "What was the name of the German gunboat sent to Agadir in 1911?", a: "SMS Panther" },
  { q: "What was the British policy requiring their navy to be larger than the next two combined?", a: "The Two-Power Standard" },
  { q: "What revolutionary British battleship was launched in 1906?", a: "HMS Dreadnought" },
  { q: "Why did the Dreadnought ironically threaten British supremacy?", a: "It made all older ships obsolete, resetting the naval race" },
  { q: "What was Britain's traditional foreign policy of avoiding European alliances called?", a: "Splendid Isolation" },
  { q: "What was German Admiral Tirpitz's naval strategy called?", a: "Risk Theory" },
  { q: "What volatile region was known as the 'Powder Keg of Europe'?", a: "The Balkans" },
  { q: "What declining multi-ethnic empire dominated the northern Balkans?", a: "The Austro-Hungarian Empire" },
  { q: "Which empire was retreating from the Balkans, leaving a power vacuum?", a: "The Ottoman Empire" },
  { q: "Which nation wanted to unite all South Slavs into a 'Greater' nation?", a: "Serbia" },
  { q: "Which region did Austria-Hungary formally annex in 1908?", a: "Bosnia" },
  { q: "Which major power considered itself the protector of the Slavic people?", a: "Russia" },
  { q: "Who was the heir to the Austro-Hungarian throne?", a: "Archduke Franz Ferdinand" },
  { q: "In which city was the Archduke assassinated?", a: "Sarajevo" },
  { q: "On what date was the Archduke assassinated?", a: "June 28, 1914" },
  { q: "Who assassinated the Archduke?", a: "Gavrilo Princip" },
  { q: "What secret Serbian society did the assassin belong to?", a: "The Black Hand" },
  { q: "What unconditional promise did Germany give Austria-Hungary in July 1914?", a: "The 'Blank Check'" },
  { q: "What is the month of diplomatic failures after the assassination called?", a: "The July Crisis" },
  { q: "What did Austria-Hungary issue to Serbia on July 23?", a: "An ultimatum" },
  { q: "Which country began mobilizing its army to protect Serbia?", a: "Russia" },
  { q: "What was the name of Germany's military strategy for a two-front war?", a: "The Schlieffen Plan" },
  { q: "Which neutral country did Germany invade to attack France?", a: "Belgium" },
  { q: "Which country declared war on Germany due to the invasion of Belgium?", a: "Britain" },
  { q: "What was the alliance of Germany, Austria-Hungary, and Italy called?", a: "The Triple Alliance" },
  { q: "What was the alliance of Britain, France, and Russia called?", a: "The Triple Entente" },
  { q: "What treaty ended the First World War in 1919?", a: "The Treaty of Versailles" },
  { q: "Which clause forced Germany to accept full responsibility for the war?", a: "Article 231 (War Guilt Clause)" },
  { q: "What is the term for a war launched to destroy a rising threat before it gets too strong?", a: "Preventative War" },
  { q: "Which historian famously argued Germany planned a war of aggression?", a: "Fritz Fischer / Max Hastings" },
  { q: "Which historian argued the nations blundered into war due to rigid alliances?", a: "Margaret MacMillan" },
  { q: "What was the 'quarantine line' of new states created after WWI called?", a: "Cordon Sanitaire" },
  { q: "Name one new state created by the Treaty of Versailles.", a: "Poland / Czechoslovakia" },
  { q: "What European power was completely dismantled by the peace treaties?", a: "The Austro-Hungarian Empire" },
  { q: "What ideological threat did the Allies want to separate from Germany after the war?", a: "Soviet Communism" },
  { q: "Which major power's entry into the Entente definitively forced Germany to rethink its strategy?", a: "Russia (or Britain)" }
];

unitData.quizPack = quizPack;

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js successfully updated with flashcards and 50-question quiz pack.");
