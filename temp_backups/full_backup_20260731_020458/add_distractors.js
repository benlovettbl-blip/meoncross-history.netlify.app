const fs = require('fs');

const updatedQuizPack = [
  {
    "q": "In what year did the Franco-Prussian War end?",
    "a": "1871",
    "options": ["1871", "1882", "1914", "1890"]
  },
  {
    "q": "Which wealthy region did Germany take from France in 1871?",
    "a": "Alsace-Lorraine",
    "options": ["Alsace-Lorraine", "The Rhineland", "The Sudetenland", "The Ruhr Valley"]
  },
  {
    "q": "What was the French desire for revenge called?",
    "a": "Revanche",
    "options": ["Revanche", "Weltpolitik", "Encirclement", "Pan-Slavism"]
  },
  {
    "q": "Who was the German Chancellor that unified Germany?",
    "a": "Otto von Bismarck",
    "options": ["Otto von Bismarck", "Kaiser Wilhelm II", "Count Leo von Caprivi", "Theobald von Bethmann-Hollweg"]
  },
  {
    "q": "What was Bismarck's greatest strategic fear?",
    "a": "A war on two fronts (Encirclement)",
    "options": ["A war on two fronts (Encirclement)", "A British naval blockade", "An uprising by the working class", "The collapse of Austria-Hungary"]
  },
  {
    "q": "Which two countries did Bismarck fear would ally against Germany?",
    "a": "France and Russia",
    "options": ["France and Russia", "Britain and France", "Russia and Austria-Hungary", "Britain and Russia"]
  },
  {
    "q": "What was the secret 1887 agreement between Germany and Russia?",
    "a": "The Reinsurance Treaty",
    "options": ["The Reinsurance Treaty", "The Entente Cordiale", "The Dual Alliance", "The Treaty of London"]
  },
  {
    "q": "Which ambitious German Emperor dismissed Bismarck in 1890?",
    "a": "Kaiser Wilhelm II",
    "options": ["Kaiser Wilhelm II", "Kaiser Wilhelm I", "Archduke Franz Ferdinand", "Tsar Nicholas II"]
  },
  {
    "q": "What was Wilhelm II's aggressive global policy called?",
    "a": "Weltpolitik (World Policy)",
    "options": ["Weltpolitik (World Policy)", "Realpolitik", "Lebensraum", "Splendid Isolation"]
  },
  {
    "q": "What previous policy of Bismarck's focused on European peace?",
    "a": "Realpolitik",
    "options": ["Realpolitik", "Weltpolitik (World Policy)", "Mitteleuropa", "Pan-Slavism"]
  },
  {
    "q": "What agreement did Britain and France sign in 1904?",
    "a": "The Entente Cordiale",
    "options": ["The Entente Cordiale", "The Triple Entente", "The Treaty of Versailles", "The Reinsurance Treaty"]
  },
  {
    "q": "In which African country did Wilhelm provoke crises in 1905 and 1911?",
    "a": "Morocco",
    "options": ["Morocco", "Egypt", "South Africa", "Sudan"]
  },
  {
    "q": "What was the result of the First Moroccan (Tangier) Crisis?",
    "a": "Britain and France grew closer, isolating Germany",
    "options": ["Britain and France grew closer, isolating Germany", "Germany gained control of Morocco", "The Entente Cordiale was dissolved", "Russia declared war on Germany"]
  },
  {
    "q": "What name was given to Germany's aggressive threat of military force?",
    "a": "Gunboat Diplomacy",
    "options": ["Gunboat Diplomacy", "Dollar Diplomacy", "Appeasement", "Risk Theory"]
  },
  {
    "q": "What was the name of the German gunboat sent to Agadir in 1911?",
    "a": "SMS Panther",
    "options": ["SMS Panther", "HMS Dreadnought", "SMS Emden", "SMS Bismarck"]
  },
  {
    "q": "What was the British policy requiring their navy to be larger than the next two combined?",
    "a": "The Two-Power Standard",
    "options": ["The Two-Power Standard", "The Risk Theory", "The Imperial Defense Act", "The Continental Commitment"]
  },
  {
    "q": "What revolutionary British battleship was launched in 1906?",
    "a": "HMS Dreadnought",
    "options": ["HMS Dreadnought", "HMS Victory", "HMS Invincible", "HMS Iron Duke"]
  },
  {
    "q": "Why did the Dreadnought ironically threaten British supremacy?",
    "a": "It made all older ships obsolete, resetting the naval race",
    "options": ["It made all older ships obsolete, resetting the naval race", "It was too expensive to build more than one", "It was easily destroyed by German U-Boats", "Its guns could not hit moving targets"]
  },
  {
    "q": "What was Britain's traditional foreign policy of avoiding European alliances called?",
    "a": "Splendid Isolation",
    "options": ["Splendid Isolation", "The Two-Power Standard", "Balance of Power", "Appeasement"]
  },
  {
    "q": "What was German Admiral Tirpitz's naval strategy called?",
    "a": "Risk Theory",
    "options": ["Risk Theory", "The Schlieffen Plan", "Weltpolitik", "Unrestricted Submarine Warfare"]
  },
  {
    "q": "What volatile region was known as the 'Powder Keg of Europe'?",
    "a": "The Balkans",
    "options": ["The Balkans", "The Rhineland", "The Middle East", "The Caucasus"]
  },
  {
    "q": "What declining multi-ethnic empire dominated the northern Balkans?",
    "a": "The Austro-Hungarian Empire",
    "options": ["The Austro-Hungarian Empire", "The Ottoman Empire", "The Russian Empire", "The British Empire"]
  },
  {
    "q": "Which empire was retreating from the Balkans, leaving a power vacuum?",
    "a": "The Ottoman Empire",
    "options": ["The Ottoman Empire", "The Austro-Hungarian Empire", "The Russian Empire", "The German Empire"]
  },
  {
    "q": "Which nation wanted to unite all South Slavs into a 'Greater' nation?",
    "a": "Serbia",
    "options": ["Serbia", "Bosnia", "Croatia", "Bulgaria"]
  },
  {
    "q": "Which region did Austria-Hungary formally annex in 1908?",
    "a": "Bosnia",
    "options": ["Bosnia", "Serbia", "Romania", "Albania"]
  },
  {
    "q": "Which major power considered itself the protector of the Slavic people?",
    "a": "Russia",
    "options": ["Russia", "Germany", "France", "Britain"]
  },
  {
    "q": "Who was the heir to the Austro-Hungarian throne?",
    "a": "Archduke Franz Ferdinand",
    "options": ["Archduke Franz Ferdinand", "Emperor Franz Joseph", "Kaiser Wilhelm II", "Tsar Nicholas II"]
  },
  {
    "q": "In which city was the Archduke assassinated?",
    "a": "Sarajevo",
    "options": ["Sarajevo", "Belgrade", "Vienna", "Berlin"]
  },
  {
    "q": "On what date was the Archduke assassinated?",
    "a": "June 28, 1914",
    "options": ["June 28, 1914", "July 23, 1914", "August 4, 1914", "November 11, 1918"]
  },
  {
    "q": "Who assassinated the Archduke?",
    "a": "Gavrilo Princip",
    "options": ["Gavrilo Princip", "Nedeljko Čabrinović", "Dragutin Dimitrijević", "Leon Trotsky"]
  },
  {
    "q": "What secret Serbian society did the assassin belong to?",
    "a": "The Black Hand",
    "options": ["The Black Hand", "The White Rose", "The Young Turks", "The Bolsheviks"]
  },
  {
    "q": "What unconditional promise did Germany give Austria-Hungary in July 1914?",
    "a": "The 'Blank Check'",
    "options": ["The 'Blank Check'", "The Reinsurance Treaty", "The Entente Cordiale", "The Ultimatum"]
  },
  {
    "q": "What is the month of diplomatic failures after the assassination called?",
    "a": "The July Crisis",
    "options": ["The July Crisis", "The Sarajevo Crisis", "The Balkan Wars", "The Blank Check Incident"]
  },
  {
    "q": "What did Austria-Hungary issue to Serbia on July 23?",
    "a": "An ultimatum",
    "options": ["An ultimatum", "A declaration of war", "A peace treaty", "A demand for reparations"]
  },
  {
    "q": "Which country began mobilizing its army to protect Serbia?",
    "a": "Russia",
    "options": ["Russia", "France", "Britain", "Germany"]
  },
  {
    "q": "What was the name of Germany's military strategy for a two-front war?",
    "a": "The Schlieffen Plan",
    "options": ["The Schlieffen Plan", "The Risk Theory", "Plan XVII", "The Bismarck Strategy"]
  },
  {
    "q": "Which neutral country did Germany invade to attack France?",
    "a": "Belgium",
    "options": ["Belgium", "Switzerland", "The Netherlands", "Luxembourg"]
  },
  {
    "q": "Which country declared war on Germany due to the invasion of Belgium?",
    "a": "Britain",
    "options": ["Britain", "Russia", "Italy", "The United States"]
  },
  {
    "q": "What was the alliance of Germany, Austria-Hungary, and Italy called?",
    "a": "The Triple Alliance",
    "options": ["The Triple Alliance", "The Triple Entente", "The Central Powers", "The League of Three Emperors"]
  },
  {
    "q": "What was the alliance of Britain, France, and Russia called?",
    "a": "The Triple Entente",
    "options": ["The Triple Entente", "The Triple Alliance", "The Allied Powers", "The Grand Alliance"]
  },
  {
    "q": "What treaty ended the First World War in 1919?",
    "a": "The Treaty of Versailles",
    "options": ["The Treaty of Versailles", "The Treaty of Brest-Litovsk", "The Treaty of Trianon", "The Congress of Vienna"]
  },
  {
    "q": "Which clause forced Germany to accept full responsibility for the war?",
    "a": "Article 231 (War Guilt Clause)",
    "options": ["Article 231 (War Guilt Clause)", "Article 48", "The Blank Check", "The Reparations Clause"]
  },
  {
    "q": "What is the term for a war launched to destroy a rising threat before it gets too strong?",
    "a": "Preventative War",
    "options": ["Preventative War", "Total War", "War of Attrition", "Proxy War"]
  },
  {
    "q": "Which historian famously argued Germany planned a war of aggression?",
    "a": "Fritz Fischer",
    "options": ["Fritz Fischer", "Margaret MacMillan", "A.J.P. Taylor", "Christopher Clark"]
  },
  {
    "q": "Which historian argued the nations blundered into war due to rigid alliances?",
    "a": "Margaret MacMillan",
    "options": ["Margaret MacMillan", "Fritz Fischer", "Ian Kershaw", "Richard Evans"]
  },
  {
    "q": "What was the 'quarantine line' of new states created after WWI called?",
    "a": "Cordon Sanitaire",
    "options": ["Cordon Sanitaire", "The Iron Curtain", "The Maginot Line", "Mitteleuropa"]
  },
  {
    "q": "Name one new state created by the Treaty of Versailles.",
    "a": "Poland",
    "options": ["Poland", "Serbia", "Bulgaria", "Romania"]
  },
  {
    "q": "What European power was completely dismantled by the peace treaties?",
    "a": "The Austro-Hungarian Empire",
    "options": ["The Austro-Hungarian Empire", "The German Empire", "The British Empire", "The Russian Empire"]
  },
  {
    "q": "What ideological threat did the Allies want to separate from Germany after the war?",
    "a": "Soviet Communism",
    "options": ["Soviet Communism", "Fascism", "Anarchism", "Imperialism"]
  },
  {
    "q": "Which country did Germany invade on 3 August 1914?",
    "a": "Belgium",
    "options": ["Belgium", "France", "Russia", "Serbia"]
  }
];

let rawData = fs.readFileSync('great_war/data.js', 'utf8');
const dataPrefix = "export const unitData = ";
let jsonStr = rawData.replace(dataPrefix, '').replace(/;\s*$/, '');
let unit = JSON.parse(jsonStr);

unit.quizPack = updatedQuizPack;

fs.writeFileSync('great_war/data.js', dataPrefix + JSON.stringify(unit, null, 4) + ';\n');

let db = JSON.parse(fs.readFileSync('database.json', 'utf8'));
db.great_war.data.quizPack = updatedQuizPack;
fs.writeFileSync('database.json', JSON.stringify(db, null, 2));

console.log('Distractors successfully added to quizPack in great_war/data.js and database.json!');
