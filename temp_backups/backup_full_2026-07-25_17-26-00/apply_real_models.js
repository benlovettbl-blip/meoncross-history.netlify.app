const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const realModelAnswers = [
  // L1
  { match: "France was desperate to seek revenge", answer: "France sought revenge because the newly unified German Empire had humiliatingly defeated them in the Franco-Prussian War, forced them to pay a massive 5 billion franc indemnity, occupied Paris, and annexed the culturally and economically vital region of Alsace-Lorraine. Crowning the German Emperor inside the French Palace of Versailles added the ultimate insult to injury." },
  { match: "Bismarck's greatest fear was a \"war on two fronts\"", answer: "Bismarck feared a two-front war because Germany was geographically sandwiched between France and Russia. Fighting both simultaneously would divide the German army and likely lead to defeat. He tried to prevent this by forming complex diplomatic alliances, particularly the Reinsurance Treaty with Russia, to ensure Russia would not ally with France." },
  { match: "Draw a solid line on the map", answer: "(Draw a solid line along the eastern edge of France, specifically outlining the western boundary of the newly German-controlled Alsace-Lorraine region.)" },
  { match: "Shade the region of Alsace-Lorraine", answer: "(Shade the Alsace-Lorraine region. Annotation: Alsace-Lorraine was economically vital due to its rich iron ore deposits and booming textile industries, which Germany seized to fuel its own industrial revolution.)" },
  { match: "change in leadership from Bismarck to Kaiser Wilhelm II", answer: "Bismarck's defensive web of alliances, specifically the Reinsurance Treaty with Russia, successfully isolated France and prevented a two-front war. Wilhelm II's aggressive ambition and dismissal of Bismarck led him to foolishly drop the Russian treaty, pushing Russia into an alliance with France. This completely destroyed Germany's diplomatic safety net, creating the exact 'encirclement' nightmare Bismarck had spent 20 years avoiding." },
  // L2
  { match: "Weltpolitik", answer: "'Weltpolitik' (World Policy) was Kaiser Wilhelm II's aggressive foreign policy aimed at transforming Germany into a global imperial power with an overseas empire and strong navy. This sharply contrasted with Bismarck's 'Realpolitik', which focused on maintaining peace in Europe through careful diplomacy and keeping France isolated, rather than seeking global dominance." },
  { match: "Moroccan Crises", answer: "Wilhelm II attempted to test and break the new Entente Cordiale by interfering in French-controlled Morocco. However, his aggressive posturing (such as sending a gunboat in 1911) backfired completely; it convinced Britain that Germany was a genuine military threat, driving Britain and France into a much closer, formal military alliance against Germany." },
  { match: "testing the Entente Cordiale during the Moroccan Crises", answer: "Wilhelm gambled that aggressive posturing in Morocco would expose the Entente Cordiale as a weak, meaningless agreement. However, his heavy-handed 'gunboat diplomacy' only served to terrify Britain. Instead of breaking the alliance, Wilhelm's actions proved to Britain that France needed their support against German aggression, transforming a loose friendly agreement into a concrete military partnership directed entirely at containing Germany." },
  // L3
  { match: "HMS Dreadnought", answer: "The HMS Dreadnought was so technologically advanced—being faster, heavily armored, and armed exclusively with massive long-range guns—that it rendered all previous battleships obsolete. This effectively reset the naval arms race to zero, allowing Germany to start building Dreadnoughts on an equal footing with Britain." },
  { match: "British Army as a minor concern", answer: "As an island nation heavily dependent on its global empire and maritime trade for survival, Britain's entire defense relied on naval supremacy (the Two-Power Standard). A strong German navy directly threatened Britain's existence. Conversely, Germany possessed the most powerful land army in Europe and viewed Britain's small, volunteer expeditionary force as insignificant." },
  { match: "endanger British naval supremacy despite being a British invention", answer: "Before the Dreadnought, Britain possessed an insurmountable numerical advantage in traditional battleships. However, by inventing a ship so revolutionary that it made all older classes instantly obsolete, Britain accidentally reset everyone's fleet strength to zero. This gave Germany a blank slate to begin competing directly with Britain in a Dreadnought-building race, wiping out decades of previous British naval dominance overnight." },
  // L4
  { match: "massive threat to their survival for the Austro-Hungarian", answer: "The Austro-Hungarian Empire was a multi-ethnic empire composed of numerous different nationalities. Serbian nationalism, and the dream of a 'Greater Yugoslavia', threatened to inspire the Slavic populations within Austria-Hungary to rebel and break away, which would cause the entire empire to collapse from within." },
  { match: "annexation of Bosnia specifically anger", answer: "Bosnia contained a large population of ethnic Serbs. Serbian nationalists believed that Bosnia rightfully belonged to a future united 'Greater Serbia' or Yugoslavia. When Austria-Hungary formally annexed Bosnia in 1908, it crushed those nationalist dreams and sparked intense anti-Austrian hatred." },
  { match: "Blank Check", answer: "While some historians claim the Kaiser acted impulsively out of grief, the evidence heavily suggests a calculated military gamble. The German High Command knew Russia was rapidly modernizing and would soon be too strong to defeat. By writing the 'Blank Check', Germany deliberately encouraged Austria to crush Serbia, knowing it would provoke Russia. They saw 1914 as their last best chance to win a preventative war against the Franco-Russian alliance before it was too late." },
  // L5
  { match: "structural failure of the first bomb plot", answer: "The first assassin threw a bomb that bounced off the Archduke's car and exploded behind them. Because of this, the Archduke's driver later changed the route to visit the injured in the hospital. However, the driver wasn't informed of the route change, took a wrong turn, and stalled the car right in front of a cafe where Gavrilo Princip was standing, giving him a point-blank shot." },
  { match: "chronological sequence of events", answer: "Austria-Hungary issued a harsh ultimatum to Serbia (July 23). When Serbia refused one term, Austria declared war (July 28). Russia mobilized its army to defend Serbia (July 30). In response, Germany declared war on Russia (Aug 1) and France (Aug 3). To attack France quickly, Germany invaded neutral Belgium, forcing Britain to declare war on Germany (Aug 4)." },
  { match: "Interpretation 2, who blames competing nationalist ideologies", answer: "Interpretation 1 (Max Hastings) argues that Germany was primarily to blame, deliberately using the crisis to launch a pre-emptive war of aggression to break their 'encirclement'. Interpretation 2 (Margaret MacMillan) argues that no single nation was solely responsible; rather, the rigid alliance system and unstoppable military mobilization timetables caused the nations to blindly slide into war together." },
  { match: "assassination in Sarajevo acted merely as a contributory trigger", answer: "The assassination was merely the spark that ignited the 'powder keg'. The true, necessary causes were the decades of deep-rooted, structural tensions: the aggressive imperialism (Weltpolitik), the paranoid arms race (Dreadnoughts), the inflexible alliance systems dividing Europe into two armed camps, and the inflexible military mobilization timetables." },
  { match: "Draw an arrow to the figure", answer: "(Draw an arrow to the Austro-Hungarian figure on the lid. Label: 'Fearful that rising Balkan nationalism and Slavic independence movements would cause their multi-ethnic empire to collapse.')" },
  { match: "Circle the steam escaping", answer: "(Circle the steam. Annotation: 'The steam represents the explosive, short-term tension of the July Crisis and the assassination of Archduke Franz Ferdinand.')" },
  { match: "How useful are Source A and Source B", answer: "Source A (Boiling Point) is highly useful for showing the extreme tension in the Balkans and how all Great Powers were precariously trying to keep the peace. However, it doesn't show the alliance treaties. Source B (Senegalese troops) is not useful for understanding the failure of diplomacy in July 1914, as it shows colonial troops fighting much later during the actual trench warfare phase." },
  { match: "What is the main difference between Interpretation 1 and Interpretation 2", answer: "Interpretation 1 places the blame squarely on the shoulders of the German leadership, accusing them of launching a deliberate war of aggression. Interpretation 2 argues against blaming a single nation, instead claiming that the rigidly structured alliance system and military timetables caused a systemic failure where everyone blundered into war." },
  { match: "Suggest why Interpretation 1 and Interpretation 2 give different views", answer: "They give different views because they emphasize different historical factors. Interpretation 1 focuses on the deliberate political decisions of individuals (like the Kaiser issuing the 'blank cheque'). Interpretation 2 focuses on structural, long-term factors (like the alliance networks and the inflexible Schlieffen Plan) that forced the hands of the politicians." },
  { match: "Explain how the creation of Poland and Czechoslovakia", answer: "The Treaty of Versailles intentionally carved out the independent nations of Poland and Czechoslovakia from the ruins of the German, Austro-Hungarian, and Russian empires. These new states acted as a physical 'buffer zone' (a cordon sanitaire) separating defeated Germany from the ideological threat of communist Soviet Russia, aiming to prevent them from allying or sharing a border." }
];

function findModelAnswer(questionText) {
  if (!questionText) return "";
  for (let m of realModelAnswers) {
    if (questionText.toLowerCase().includes(m.match.toLowerCase())) {
      return m.answer;
    }
  }
  return "A detailed historical explanation using specific chronology and evidence from the lesson.";
}

unitData.lessons.forEach((lesson, index) => {
  // 1. Correct Lesson 1 Primary Source Text
  if (index === 0 && lesson.primary_source && lesson.primary_source.question) {
    lesson.primary_source.question = "Enquiry: What are the two opposing figures doing in this 1871 painting by Anton von Werner, and what does the bag represent?";
  }

  // 2. Real Model Answers for Tasks
  if (lesson.tasks) {
    lesson.tasks.forEach(task => {
      task.model = findModelAnswer(task.text);
    });
  }

  // 3. Extract Extended Scholarship Question
  if (lesson.extended && lesson.extended.paragraphs && lesson.extended.paragraphs.length > 0) {
    const lastP = lesson.extended.paragraphs[lesson.extended.paragraphs.length - 1];
    // Check if the last paragraph is essentially a question (starts and ends with quotes, or has a question mark)
    if (lastP.startsWith('"') || lastP.includes('?')) {
      let qText = lastP.replace(/^"|"$/g, '').trim(); // remove surrounding quotes
      lesson.extended.question = qText;
      lesson.extended.model = findModelAnswer(qText);
      // Remove it from paragraphs
      lesson.extended.paragraphs.pop();
    }
  }
  
  // Clean up extended array of questions in Lesson 5 if any
  if (index === 4 && lesson.extended && lesson.extended.paragraphs) {
      lesson.extended.paragraphs = lesson.extended.paragraphs.filter(p => !p.startsWith("Question"));
  }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js successfully updated with extended questions and real models.");
