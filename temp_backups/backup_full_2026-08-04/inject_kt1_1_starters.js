const fs = require('fs');

const dataPath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const utilityStarters = `
    "utility_starters": {
      "enquiry": "the origins of the Weimar Republic, 1918-19",
      "sources": [
        {
          "type": "written",
          "title": "Source A: From a speech by Philipp Scheidemann, announcing the new Republic from the balcony of the Reichstag, 9 November 1918.",
          "content": "\\\"Workers and soldiers! The German people have won all along the line! The old and rotten monarchy has collapsed. Long live the new German Republic!\\\"",
          "provenance_clue": "Consider who Scheidemann is addressing (the workers and soldiers) and why he might want to paint the revolution as a massive, positive victory right at that moment. Is he trying to calm a chaotic situation?"
        },
        {
          "type": "visual",
          "title": "Source B: A photograph showing armed Spartacists on the streets of Berlin, January 1919.",
          "source": "/images/spartacist_uprising.jpg",
          "caption": "Armed revolutionaries during the Spartacist Uprising",
          "provenance_clue": "Photographs can capture a snapshot of reality, but think about what might be happening outside the frame. Does this image support the idea that the new republic was stable and fully supported by the people?"
        }
      ]
    },`;

// Inject into lesson_1_1
// Find lesson_1_1
const lessonStart = content.indexOf('"id": "lesson_1_1"');
if (lessonStart !== -1) {
    // Insert after "id": "lesson_1_1",
    const insertPoint = content.indexOf(',', lessonStart) + 1;
    content = content.slice(0, insertPoint) + utilityStarters + content.slice(insertPoint);
    fs.writeFileSync(dataPath, content);
    console.log('Successfully injected utility_starters into KT 1.1');
} else {
    console.error('Could not find lesson_1_1');
}
