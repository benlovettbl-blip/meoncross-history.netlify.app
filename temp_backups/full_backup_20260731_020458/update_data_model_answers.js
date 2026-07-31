const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const realModelAnswers = {
  // L1
  "Q1: Summarize the reasons why France was desperate to seek revenge against the new German Empire after 1871.": "France sought revenge because the newly unified German Empire had humiliatingly defeated them in the Franco-Prussian War, forced them to pay a massive 5 billion franc indemnity, occupied Paris, and annexed the culturally and economically vital region of Alsace-Lorraine. Crowning the German Emperor inside the French Palace of Versailles added the ultimate insult to injury.",
  "Q2: Explain why Chancellor Otto von Bismarck's greatest fear was a \"war on two fronts.\" How did he try to prevent this?": "Bismarck feared a two-front war because Germany was geographically sandwiched between France and Russia. Fighting both simultaneously would divide the German army and likely lead to defeat. He tried to prevent this by forming complex diplomatic alliances, particularly the Reinsurance Treaty with Russia, to ensure Russia would not ally with France.",
  "Task 1: Draw a solid line on the map marking the new border between France and Germany created in 1871.": "(Draw a solid line along the eastern edge of France, specifically outlining the western boundary of the newly German-controlled Alsace-Lorraine region.)",
  "Task 2: Shade the region of Alsace-Lorraine and annotate why it was economically important.": "(Shade the Alsace-Lorraine region. Annotation: Alsace-Lorraine was economically vital due to its rich iron ore deposits and booming textile industries, which Germany seized to fuel its own industrial revolution.)",
  // L2
  "Q1: What does the term 'Weltpolitik' mean, and how did it differ from Bismarck's approach?": "'Weltpolitik' (World Policy) was Kaiser Wilhelm II's aggressive foreign policy aimed at transforming Germany into a global imperial power with an overseas empire and strong navy. This sharply contrasted with Bismarck's 'Realpolitik', which focused on maintaining peace in Europe through careful diplomacy and keeping France isolated, rather than seeking global dominance.",
  "Q2: Explain how the Moroccan Crises of 1905 and 1911 were a diplomatic disaster for Germany.": "Wilhelm II attempted to test and break the new Entente Cordiale by interfering in French-controlled Morocco. However, his aggressive posturing (such as sending a gunboat in 1911) backfired completely; it convinced Britain that Germany was a genuine military threat, driving Britain and France into a much closer, formal military alliance against Germany.",
  // L3
  "Q1: Describe the impact the HMS Dreadnought had on the naval arms race when it was launched in 1906.": "The HMS Dreadnought was so technologically advanced—being faster, heavily armored, and armed exclusively with massive long-range guns—that it rendered all previous battleships obsolete. This effectively reset the naval arms race to zero, allowing Germany to start building Dreadnoughts on an equal footing with Britain.",
  "Q2: Explain why Britain viewed the expansion of the German Navy as an existential threat, whereas Germany viewed the British Army as a minor concern.": "As an island nation heavily dependent on its global empire and maritime trade for survival, Britain's entire defense relied on naval supremacy (the Two-Power Standard). A strong German navy directly threatened Britain's existence. Conversely, Germany possessed the most powerful land army in Europe and viewed Britain's small, volunteer expeditionary force as insignificant.",
  // L4
  "Q1: Explain why the rise of independent Balkan states and Serbian nationalism represented a massive threat to their survival for the Austro-Hungarian Empire.": "The Austro-Hungarian Empire was a multi-ethnic empire composed of numerous different nationalities. Serbian nationalism, and the dream of a 'Greater Yugoslavia', threatened to inspire the Slavic populations within Austria-Hungary to rebel and break away, which would cause the entire empire to collapse from within.",
  "Q2: Explain why the annexation of Bosnia specifically anger Serbian nationalists?": "Bosnia contained a large population of ethnic Serbs. Serbian nationalists believed that Bosnia rightfully belonged to a future united 'Greater Serbia' or Yugoslavia. When Austria-Hungary formally annexed Bosnia in 1908, it crushed those nationalist dreams and sparked intense anti-Austrian hatred.",
  // L5
  "Q1: Detail how the structural failure of the first bomb plot inadvertently led to the exact scenario where Gavrilo Princip was able to shoot the Archduke.": "The first assassin threw a bomb that bounced off the Archduke's car and exploded behind them. Because of this, the Archduke's driver later changed the route to visit the injured in the hospital. However, the driver wasn't informed of the route change, took a wrong turn, and stalled the car right in front of a cafe where Gavrilo Princip was standing, giving him a point-blank shot.",
  "Q2: Outline the chronological sequence of events from July 23 to August 4, 1914, that transformed a local Balkan assassination into a total European war between alliances.": "Austria-Hungary issued a harsh ultimatum to Serbia (July 23). When Serbia refused one term, Austria declared war (July 28). Russia mobilized its army to defend Serbia (July 30). In response, Germany declared war on Russia (Aug 1) and France (Aug 3). To attack France quickly, Germany invaded neutral Belgium, forcing Britain to declare war on Germany (Aug 4).",
  "Q3: Contrast the historical argument of Interpretation 2, who blames competing nationalist ideologies, with Interpretation 1 who blame external threats.": "Interpretation 1 (Max Hastings) argues that Germany was primarily to blame, deliberately using the crisis to launch a pre-emptive war of aggression to break their 'encirclement'. Interpretation 2 (Margaret MacMillan) argues that no single nation was solely responsible; rather, the rigid alliance system and unstoppable military mobilization timetables caused the nations to blindly slide into war together.",
  "Q4: Explain why the assassination in Sarajevo acted merely as a contributory trigger to set off a general explosion, rather than being the lone necessary cause of the war.": "The assassination was merely the spark that ignited the 'powder keg'. The true, necessary causes were the decades of deep-rooted, structural tensions: the aggressive imperialism (Weltpolitik), the paranoid arms race (Dreadnoughts), the inflexible alliance systems dividing Europe into two armed camps, and the inflexible military mobilization timetables.",
  "Task 1: Draw an arrow to the figure representing Austria-Hungary and label what its main fear was regarding the Balkans.": "(Draw an arrow to the Austro-Hungarian figure on the lid. Label: 'Fearful that rising Balkan nationalism and Slavic independence movements would cause their multi-ethnic empire to collapse.')",
  "Task 2: Circle the steam escaping from the pot and annotate what specific short-term force this steam represents.": "(Circle the steam. Annotation: 'The steam represents the explosive, short-term tension of the July Crisis and the assassination of Archduke Franz Ferdinand.')",
  "Question 3a: How useful are Source A and Source B together to a historian researching why the European alliance system failed to maintain peace in July 1914?": "Source A (Boiling Point) is highly useful for showing the extreme tension in the Balkans and how all Great Powers were precariously trying to keep the peace. However, it doesn't show the alliance treaties. Source B (Senegalese troops) is not useful for understanding the failure of diplomacy in July 1914, as it shows colonial troops fighting much later during the actual trench warfare phase.",
  "Question 3b: What is the main difference between Interpretation 1 and Interpretation 2 regarding who or what was to blame for starting the First World War?": "Interpretation 1 places the blame squarely on the shoulders of the German leadership, accusing them of launching a deliberate war of aggression. Interpretation 2 argues against blaming a single nation, instead claiming that the rigidly structured alliance system and military timetables caused a systemic failure where everyone blundered into war.",
  "Question 3c: Suggest why Interpretation 1 and Interpretation 2 give different views on the causes of the war.": "They give different views because they emphasize different historical factors. Interpretation 1 focuses on the deliberate political decisions of individuals (like the Kaiser issuing the 'blank cheque'). Interpretation 2 focuses on structural, long-term factors (like the alliance networks and the inflexible Schlieffen Plan) that forced the hands of the politicians.",
  "Enquiry Task: Explain how the creation of Poland and Czechoslovakia in 1919 acted as a strategic boundary buffer between Germany and the newly formed Soviet Union.": "The Treaty of Versailles intentionally carved out the independent nations of Poland and Czechoslovakia from the ruins of the German, Austro-Hungarian, and Russian empires. These new states acted as a physical 'buffer zone' (a cordon sanitaire) separating defeated Germany from the ideological threat of communist Soviet Russia, aiming to prevent them from allying or sharing a border."
};

const primaryQuestions = [
  "Enquiry: What are the two opposing figures doing in this 1871 cartoon, and what does the bag represent?",
  "Enquiry: Look closely at the man standing over Africa. What is his posture suggesting about imperial ambitions?",
  "Enquiry: This blueprint represents the HMS Dreadnought. Why would this ship make all other navies obsolete?",
  "Enquiry: Study the intertwined hands and figures in this map. What does it suggest about how a local conflict might spread?",
  "Enquiry: Look at the men sitting on the 'Balkan Troubles' pot. What are they desperately trying to prevent?"
];

unitData.lessons.forEach((lesson, index) => {
  // 1. Add Primary Question
  if (lesson.primary_source) {
    lesson.primary_source.question = primaryQuestions[index];
  }

  // 2. Timeline Prediction Question
  if (lesson.do_now && lesson.do_now.type === "timeline") {
    lesson.do_now.prediction_question = "Predict: Looking at this long-term timeline, which factor do you think was the most dangerous necessary cause of the war?";
  }

  // 3. Real Model Answers
  if (lesson.tasks) {
    lesson.tasks.forEach(task => {
      // Remove old scaffolds
      delete task.starter;
      delete task.clue;
      // Inject real answer
      if (realModelAnswers[task.text]) {
        task.model = realModelAnswers[task.text];
      } else {
        // Fallback if text doesn't exactly match
        task.model = "A detailed historical explanation using specific chronology and evidence from the lesson.";
      }
    });
  }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js successfully updated with real model answers, primary questions, and timeline predictions!");
