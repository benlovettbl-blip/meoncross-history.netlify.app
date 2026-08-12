const fs = require('fs');

let fileContent = fs.readFileSync('public/units/great_war/data.js', 'utf8');

const consolidations = [
  "Explain how Otto von Bismarck used 'blood and iron' to achieve the unification of Germany by 1871.",
  "Why did the annexation of Alsace-Lorraine guarantee long-term hostility between France and the new German Empire?",
  "How did the Moroccan Crises of 1905 and 1911 demonstrate that imperial competition in Africa could lead to war in Europe?",
  "In what ways did Kaiser Wilhelm II's 'Weltpolitik' and the Naval Race force Britain to abandon its 'splendid isolation'?",
  "Explain how the Triple Alliance and the Triple Entente divided Europe into two armed camps by 1907.",
  "How did the 'Blank Cheque' and the subsequent July Crisis turn a regional Balkan conflict into a massive global war?"
];

const lessonTitles = [
  'How was the German Empire created in 1871?',
  'How did the Franco-Prussian War create a lasting legacy of hatred?',
  "To what extent did the 'Scramble for Africa' increase tension in Europe?",
  'Why did a battleship building contest destroy Anglo-German relations?',
  'Did the Alliance System protect Europe or guarantee a global war?',
  'Why did a single assassination in Sarajevo ignite a World War?'
];

for (let i = 0; i < lessonTitles.length; i++) {
  const title = lessonTitles[i];
  const consolidation = consolidations[i];
  
  // Find the lesson block
  // A bit hacky: we find "title": "KS3: Causes of the Great War" etc.
  // Actually we can just find `"title": "${title}"`
  // Wait, there might be other things with that title, like `do_now` or `tasks`?
  // Usually the lesson title is unique. 
  
  const searchStr = `"title": "${title}",`;
  const replacementStr = `"title": "${title}",\n      "lesson_consolidation": "${consolidation}",`;
  
  if (fileContent.includes(searchStr)) {
    fileContent = fileContent.replace(searchStr, replacementStr);
    console.log(`Injected consolidation for Lesson ${i+1}`);
  } else {
    // try with escaping quotes if needed
    console.log(`Failed to find title string for Lesson ${i+1}`);
  }
}

fs.writeFileSync('public/units/great_war/data.js', fileContent);
console.log('Successfully updated great_war/data.js with lesson consolidations.');
