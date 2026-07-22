const fs = require('fs');
const path = require('path');

async function refineQuestions() {
  const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
  let dataJsStr = fs.readFileSync(dataPath, 'utf8');
  
  // Quick dynamic import approach
  const { default: unitData } = await import('file:///' + dataPath.replace(/\\/g, '/'));
  
  // Replace heavy questions with lighter ones
  unitData.lessons.forEach(lesson => {
    const isKT5 = lesson.title.startsWith("KT5");
    
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach((block, index) => {
        if (block.tasks) {
          block.tasks.forEach(t => {
            if (t.type === 'written') {
              if (isKT5) {
                // Western Front formatting: Features question
                if (!t.text.includes("Describe one feature of")) {
                  t.text = `Describe one feature of ${t.text.replace(/Identify one /i, "").replace(/Describe the /i, "").replace(/Describe two ways /i, "").replace(/\.$/, "")}.`;
                }
              } else {
                // Core Medicine formatting: Simplify cognitive overload
                if (t.text.includes("Evaluate the significance")) {
                  t.text = t.text.replace(/Evaluate the significance of/i, "Explain one reason why").replace(/ was significant/i, " was important");
                  t.model = "This is a simplified answer focusing on explanation rather than evaluation.";
                }
                if (t.text.includes("To what extent")) {
                  t.text = t.text.replace(/To what extent were/i, "Describe how");
                }
                if (t.text.includes("Identify one")) {
                  t.text = t.text.replace(/Identify one/i, "Explain one feature of");
                }
                if (t.text.includes("Identify the")) {
                  t.text = t.text.replace(/Identify the/i, "Describe the");
                }
              }
            }
          });
        }
        
        // Add a hinge question to block 1 of Lesson 1 (KT1)
        if (lesson.id === 'lesson_1_1' && index === 1) {
          if (!block.tasks) block.tasks = [];
          const hasHinge = block.tasks.some(t => t.type === 'multiple_choice');
          if (!hasHinge) {
            block.tasks.push({
              type: "multiple_choice",
              text: "Hinge Question: Why did the Church promote Galen's medical ideas?",
              options: [
                "Because he was a Christian bishop.",
                "Because his idea of the body having a creator fit Christian beliefs.",
                "Because he proved the Four Humours were wrong.",
                "Because he invented the microscope."
              ],
              correct_answer: "Because his idea of the body having a creator fit Christian beliefs.",
              explanation: "Galen believed the body was perfectly designed by a creator, which perfectly matched the Church's teachings."
            });
          }
        }
        
        // Add a hinge question to KT3.1 block 2 (Pasteur)
        if (lesson.id === 'lesson_3_1' && index === 2) {
          if (!block.tasks) block.tasks = [];
          const hasHinge = block.tasks.some(t => t.type === 'multiple_choice');
          if (!hasHinge) {
            block.tasks.push({
              type: "multiple_choice",
              text: "Hinge Question: What did Louis Pasteur prove in 1861?",
              options: [
                "That spontaneous generation was true.",
                "That germs are created by decaying matter.",
                "That microbes in the air cause decay.",
                "That penicillin kills bacteria."
              ],
              correct_answer: "That microbes in the air cause decay.",
              explanation: "Pasteur proved that decay was caused by microbes in the air, disproving spontaneous generation."
            });
          }
        }
      });
    }
  });

  const newDataStr = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;`;
  fs.writeFileSync(dataPath, newDataStr);
  console.log("Refined questions and added hinge questions.");
}

refineQuestions().catch(console.error);
