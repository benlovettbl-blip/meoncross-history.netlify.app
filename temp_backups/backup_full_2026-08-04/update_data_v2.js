const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const doNows = [
  // Lesson 1 Do Now
  [
    "1. In what year did the Franco-Prussian War end?",
    "2. Which country was victorious in the Franco-Prussian War?",
    "3. Who was the Prussian Chancellor during this war?",
    "4. What territory did France lose as a result?",
    "5. Where was the German Empire officially proclaimed?",
    "6. Explain how Bismarck manipulated the Ems Telegram to provoke France into declaring war.",
    "7. Why was the loss of Alsace-Lorraine such a devastating blow to the French economy and national pride?",
    "8. Describe the 'nightmare' scenario that Bismarck spent 20 years trying to avoid.",
    "9. How did Prussia's railway network give them a decisive advantage during the war?",
    "10. Evaluate the significance of declaring the new German Empire inside the Palace of Versailles."
  ],
  // Lesson 2 Do Now
  [
    "1. Who was the first Emperor of the newly unified Germany?",
    "2. Which Chancellor was dismissed by Kaiser Wilhelm II in 1890?",
    "3. Name the alliance formed between France and Russia.",
    "4. What do we call the competitive rush to claim territory in Africa?",
    "5. Which African country did Kaiser Wilhelm II visit to challenge French control?",
    "6. Explain why Kaiser Wilhelm II's 'Weltpolitik' policy threatened the British Empire.",
    "7. Describe the impact of Wilhelm II letting the Reinsurance Treaty with Russia expire.",
    "8. How did the Moroccan Crises actually backfire on Germany and strengthen the Entente Cordiale?",
    "9. Why did Britain traditionally follow a policy of 'Splendid Isolation' before the 1900s?",
    "10. Evaluate the role of Kaiser Wilhelm II's personality in destabilizing European diplomacy."
  ],
  // Lesson 3 Do Now
  [
    "1. Which two countries engaged in a naval arms race?",
    "2. What was the name of the revolutionary new British battleship launched in 1906?",
    "3. Who was the German Admiral pushing for a larger navy?",
    "4. What policy stated that the British navy must be as large as the next two combined?",
    "5. Which European power had the largest standing land army before 1914?",
    "6. Explain how the invention of the Dreadnought effectively reset the naval arms race to zero.",
    "7. Why did Germany feel that a powerful navy was essential for its survival and 'place in the sun'?",
    "8. Describe the psychological impact of the arms race on the British public's view of Germany.",
    "9. How did compulsory conscription change the nature of European armies compared to Britain?",
    "10. Evaluate to what extent the naval arms race made a war between Britain and Germany inevitable."
  ],
  // Lesson 4 Do Now
  [
    "1. Which empire was rapidly declining and losing control of the Balkans?",
    "2. Which newly independent country wanted to unite all Slavic people?",
    "3. Which major empire feared the rise of Balkan nationalism?",
    "4. Which great power saw itself as the 'protector of the Slavs'?",
    "5. Which territory did Austria-Hungary formally annex in 1908?",
    "6. Explain why the idea of 'Yugoslavia' was an existential threat to the Austro-Hungarian Empire.",
    "7. Describe the complex relationship between Serbia and Russia regarding the Balkans.",
    "8. How did the Balkan Wars of 1912-1913 alter the balance of power in the region?",
    "9. Why did the annexation of Bosnia specifically anger Serbian nationalists?",
    "10. Evaluate the danger of allowing small regional conflicts to draw in the major alliance blocs."
  ],
  // Lesson 5 Do Now
  [
    "1. What date was Archduke Franz Ferdinand assassinated?",
    "2. In which city did the assassination take place?",
    "3. Who was the assassin that fired the fatal shots?",
    "4. What terrorist group provided the weapons?",
    "5. Which country gave Austria-Hungary a 'blank cheque' of support?",
    "6. Explain the chain of events that led to Gavrilo Princip being in the exact right place to shoot the Archduke.",
    "7. Why did Austria-Hungary deliberately issue an ultimatum to Serbia that was impossible to accept?",
    "8. Describe how the complex system of alliances turned a regional dispute into a global conflict within weeks.",
    "9. What was the purpose of the Schlieffen Plan, and why did it bring Britain into the war?",
    "10. Evaluate whether the assassination was the root cause of WWI, or merely the spark that ignited a powder keg."
  ]
];

unitData.lessons.forEach((lesson, index) => {
  // Add Do Now
  lesson.do_now = doNows[index];

  // Fix Tasks
  lesson.tasks.forEach(task => {
    task.type = "written";
    const textLower = task.text.toLowerCase();
    if (textLower.includes("draw") || textLower.includes("annotate") || textLower.includes("circle") || textLower.includes("highlight")) {
      task.type = "draw";
    }
  });

  // Simplify Narratives (Basic word replacements for 14-year-olds)
  lesson.narrative = lesson.narrative.map(para => {
    return para
      .replace(/existential threat/gi, "massive threat to their survival")
      .replace(/catalyst/gi, "spark")
      .replace(/inexorable/gi, "unstoppable")
      .replace(/hegemony/gi, "total control")
      .replace(/conscripted/gi, "forced to join the army")
      .replace(/catastrophic/gi, "terrible");
  });

  // Replace Maps
  if (index === 0) {
    lesson.sources.forEach(s => {
      if (s.src.includes('map_lesson1')) {
        s.src = 'assets/alsace_lorraine_simple_map.png';
        s.caption = "Simplified map showing Alsace-Lorraine on the border between France and the new German Empire.";
      }
    });
  } else if (index === 2) { // Lesson 3
    // Wait, the Balkans map was in Lesson 5 in the old structure, or Lesson 4?
    // Let's just find any source that has 'map_balkans'
  }
});

// Specifically hunt down the Schlieffen and Balkan maps across all lessons
unitData.lessons.forEach(lesson => {
  lesson.sources.forEach(s => {
    if (s.src.includes('map_lesson5') || s.src.includes('balkans')) {
      s.src = 'assets/balkans_1914_simple_map.png';
      s.caption = "Simplified map of the highly unstable Balkan Peninsula in 1914.";
    }
    if (s.src.includes('schlieffen')) {
      s.src = 'assets/schlieffen_plan_simple_map.png';
      s.caption = "The Schlieffen Plan: Germany's strategy to quickly defeat France by swinging through Belgium.";
    }
  });
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("data.js successfully updated with Do Nows, fixed task types, and simpler maps!");
