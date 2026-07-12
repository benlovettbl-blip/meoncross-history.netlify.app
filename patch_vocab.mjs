import fs from 'fs';

const dataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');

const targetStr = `      "vocab": [
        {
          "term": "Mandate",
          "definition": "An authorization granted by the League of Nations to govern a territory until it was deemed ready for independence."
        },
        {
          "term": "Zionism",
          "definition": "A nationalist movement that emerged in the 19th century supporting the creation of a Jewish homeland in the territory defined as the Land of Israel."
        },
        {
          "term": "Irgun",
          "definition": "A right-wing Zionist paramilitary organization that used militant tactics against British forces and Arab populations."
        },
        {
          "term": "Nakba",
          "definition": "Meaning 'The Catastrophe' in Arabic, referring to the permanent displacement and dispossession of over 700,000 Palestinians during the 1948 war."
        }
      ],`;

const replacementStr = `      "vocab": [
        {
          "term": "Mandate",
          "definition": "An authorization granted by the League of Nations to govern a territory until it was deemed ready for independence."
        },
        {
          "term": "Zionism",
          "definition": "A nationalist movement that emerged in the 19th century supporting the creation of a Jewish homeland in the territory defined as the Land of Israel."
        },
        {
          "term": "Irgun",
          "definition": "A right-wing Zionist paramilitary organization that used militant tactics against British forces and Arab populations."
        },
        {
          "term": "Nakba",
          "definition": "Meaning 'The Catastrophe' in Arabic, referring to the permanent displacement and dispossession of over 700,000 Palestinians during the 1948 war."
        }
      ],
      "vocab_cloze_text": "Following World War II, Britain struggled to control its League of Nations [Mandate] in Palestine. The horrors of the Holocaust increased international sympathy for [Zionism], leading to demands for a Jewish state. As tensions rose, militant groups like the [Irgun] launched violent attacks against the British, such as the bombing of the King David Hotel. Ultimately, the 1948 war resulted in the creation of Israel but also led to the [Nakba], where hundreds of thousands of Palestinians were displaced.",`;

if (dataContent.includes(targetStr) && !dataContent.includes('"vocab_cloze_text": "Following World War II')) {
  dataContent = dataContent.replace(targetStr, replacementStr);
  fs.writeFileSync(dataPath, dataContent, 'utf8');
  console.log("Injected vocab_cloze_text for Lesson 1!");
} else {
  console.log("Could not find the target string, or it's already injected.");
}
