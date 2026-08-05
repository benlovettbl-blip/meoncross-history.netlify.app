const fs = require('fs');

const dataPath = 'great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');
const jsonStart = content.indexOf('{');
const jsonEnd = content.lastIndexOf('}');
const jsonStr = content.slice(jsonStart, jsonEnd + 1);

const unitData = JSON.parse(jsonStr);

// 1. Fix Cover Caption
unitData.cover_caption = "The cover image displays two powerful historical sources that capture the dual reality of the First World War: on the left, the devastating industrial scale of trench warfare on the Western Front, and on the right, the vital contribution of women working as 'Munitionettes' on the Home Front. Together, they demonstrate how the conflict became a 'Total War' requiring the entire society to mobilize.";

// 2. Fix Features Question (Lesson 2)
const l2 = unitData.lessons.find(l => l.id === 'lesson_2');
if (l2 && l2.narrative_blocks && l2.narrative_blocks.length > 0) {
  const task = l2.narrative_blocks[0].tasks.find(t => t.text.includes('Features Practice'));
  if (task) {
    task.text = '<strong>Part B: Edexcel GCSE Paper 1 Features Practice</strong><br>1a. Describe one feature of early military aircraft. (2 marks)<br>1b. Describe one feature of trench warfare. (2 marks)';
    task.model = '1a. One feature of early military aircraft was how fragile they were. For example, they were constructed merely of wood and thick cloth held together by piano wire.<br><br>1b. One feature of trench warfare was the horrific conditions soldiers endured. For example, the constant mud and water in the trenches led to thousands of men suffering from "Trench Foot", which often required amputation.';
  }
}

// 3. Fix Quiz Answers (Lessons 1, 3, 4, 6)
unitData.lessons.forEach(l => {
  if (l.quiz && Array.isArray(l.quiz)) {
    l.quiz.forEach(q => {
      if (q.a === 0) {
        q.a = q.options[0];
      }
    });
  }
});

const updatedJsonStr = JSON.stringify(unitData, null, 2);
const newContent = content.slice(0, jsonStart) + updatedJsonStr + "\n";
fs.writeFileSync(dataPath, newContent);

console.log('Successfully applied all fixes to great_war_part2/data.js');
