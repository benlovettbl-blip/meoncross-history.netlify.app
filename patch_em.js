const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Task 1: Fix workbook link
if (data.printable_workbooks && data.printable_workbooks.length > 0) {
    data.printable_workbooks[0].id = "full";
}

// Task 2: Reformat Quizzes
data.lessons.forEach(lesson => {
    if (lesson.quiz && lesson.quiz.length > 0) {
        // Only reformat if it has 'q' and 'a'
        if (lesson.quiz[0].q) {
            lesson.quiz = lesson.quiz.map(qItem => {
                let options = qItem.distractors ? [...qItem.distractors] : [];
                // Fill up to 3 distractors if missing
                while(options.length < 3) {
                    options.push("Incorrect Option");
                }
                const insertIdx = Math.floor(Math.random() * (options.length + 1));
                options.splice(insertIdx, 0, qItem.a);
                return {
                    question: qItem.q,
                    options: options,
                    answer: insertIdx,
                    explanation: qItem.a
                };
            });
            console.log(`Reformatted quiz for ${lesson.id}`);
        }
    }
});

// Task 3: Inject Synoptic Reflection tasks
const synopticTasks = {
  "lesson_2": {
      question: "Identify one piece of evidence from this lesson that shows England becoming more 'modern' and globally powerful.",
      model_answer: "England became more modern by challenging Catholic Spain's dominance through state-sponsored privateers (like Francis Drake), building a navy capable of defeating the Armada, and establishing global trading ambitions."
  },
  "lesson_3": {
      question: "How did joint-stock capitalism make England's economy more 'modern', but also more ruthless?",
      model_answer: "Joint-stock capitalism allowed wealthy merchants to pool their money and share risks without needing the King's funding. This drove massive commercial expansion (like the EIC and Virginia Company), but made them ruthless because their primary goal was extracting profit by any means necessary, including land theft and war."
  },
  "lesson_4": {
      question: "What evidence from this lesson suggests Britain's political and legal systems were still deeply 'un-modern' (brutal and unequal)?",
      model_answer: "Despite getting rid of an absolute monarch, the new Commonwealth and Parliament were still un-modern because only a tiny fraction of wealthy men could vote, and the legal system used horrific violence (like the Bloody Code and Cromwell's massacres in Ireland) to maintain control."
  },
  "lesson_5": {
      question: "How does the reality of the Transatlantic Slave Trade challenge the idea that 18th-century Britain was a 'modern', enlightened society?",
      model_answer: "While Britain had modern financial systems (banks, stock exchanges) and global trade, this wealth was built entirely on chattel slavery. Treating millions of African human beings as property to be tortured and exploited for sugar profits shows that society was deeply un-modern and brutal."
  }
};

data.lessons.forEach(lesson => {
    if (synopticTasks[lesson.id]) {
        const blocks = lesson.narrative_blocks;
        if (blocks && blocks.length > 0) {
            const lastBlock = blocks[blocks.length - 1];
            if (!lastBlock.tasks) lastBlock.tasks = [];
            // Check if already injected
            const alreadyExists = lastBlock.tasks.find(t => t.question && t.question.includes("Synoptic Reflection"));
            if (!alreadyExists) {
                lastBlock.tasks.push({
                    type: "comprehension",
                    question: `Synoptic Reflection: ${synopticTasks[lesson.id].question}`,
                    model_answer: synopticTasks[lesson.id].model_answer
                });
                console.log(`Injected Synoptic Reflection for ${lesson.id}`);
            }
        }
    }
});

const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully patched early_modern_world/data.js");
