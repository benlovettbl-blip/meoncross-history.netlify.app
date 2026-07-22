const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let prompt = `# Task: Generate Interactive Hinge Questions

You are an expert history teacher. I need you to generate a multiple-choice diagnostic "Hinge Question" for each of the learning objectives listed below. 

## Requirements for EACH question:
1. **The Question:** A clear, concise question that tests the core concept of the objective.
2. **Options:** Provide exactly 4 options (A, B, C, D).
3. **Distractors:** One option must be correct. The other three MUST be highly plausible "distractors" based on common student misconceptions.
4. **Explanation:** A brief 1-2 sentence explanation of why the correct answer is right and why the distractors are wrong.

Please format your response strictly as a JSON array of objects. Do not wrap it in markdown code blocks, just raw JSON. Each object should follow this EXACT schema:
[
  {
    "lesson_id": "the_lesson_id_provided",
    "objective_index": 0,
    "text": "The question text here?",
    "options": [
      "Option A text",
      "Option B text",
      "Option C text",
      "Option D text"
    ],
    "correct_index": 1, 
    "explanation": "The explanation here."
  }
]

## The Objectives:

`;

unitData.lessons.forEach(l => {
    let hasHinge = false;
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => {
            if (b.hinge_question) hasHinge = true;
        });
    }
    // We already did lesson_2_3, lesson_3_2, lesson_3_3.
    if (!hasHinge && l.teacher_notes && l.teacher_notes.objectives) {
        prompt += `### Lesson ID: ${l.id}\n`;
        prompt += `Lesson Title: ${l.title}\n`;
        l.teacher_notes.objectives.forEach((obj, index) => {
            prompt += `- Objective Index ${index}: ${obj.objective}\n`;
        });
        prompt += `\n`;
    }
});

fs.writeFileSync(path.join(__dirname, 'notebooklm_prompt.txt'), prompt);
console.log("Prompt generated at scratch/notebooklm_prompt.txt");
