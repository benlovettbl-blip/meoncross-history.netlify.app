import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { unitData } from './weimar_nazi_germany/data.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function getPromptForLesson(lesson) {
    let narrativeText = '';
    if (lesson.narrative) {
        narrativeText = lesson.narrative.map(b => b.text).join('\n\n');
    }
    
    let vocabText = '';
    if (lesson.vocab) {
        vocabText = lesson.vocab.map(v => v.term).join(', ');
    }

    return `
You are an expert history teacher writing pedagogical tasks for a lesson titled: "${lesson.title}".

Here is the core narrative of the lesson that the students have just read:
---
${narrativeText}
---

Keywords for this lesson: ${vocabText}

Your task is to write EXACTLY 4 escalating written tasks for the students to complete. 
You must output ONLY valid JSON matching this exact schema:

[
  {
    "question": "[Task Type Name]: [The actual question/prompt]",
    "model": "[The model answer]"
  },
  ...
]

Important Rules for the 4 Tasks:
- Task 1 MUST be a Comprehension/Consolidation task (e.g., "Constrained Summary", "But/Because/So", or "True/False/Justify").
- Task 2 MUST be an Application task using the vocab (e.g., "Vocabulary in Context", "Transforming Information", "Headline Writer").
- Task 3 MUST be an Analysis task (e.g., "Causal Linkage", "Prioritising Causes", "The 'What If' Challenge").
- Task 4 MUST be a Level 9 Challenge (e.g., "The 'Diamond Ranking' Challenge", "Counter-Factual History", or "Complex Causal Reasoning").

For each "question", you must start the string with the pedagogical strategy name, followed by a colon, followed by the specific instruction.
For example:
"question": "Causal Linkage: Write a short paragraph explaining exactly how X led to Y."
"question": "The 'But/Because/So' Strategy: Complete these sentences: 1) X happened BUT... 2) Y happened BECAUSE..."

Make the model answers historically accurate and high-quality. Do NOT include markdown blocks in your response, ONLY the raw JSON array. Make sure you escape double quotes properly inside strings!
`;
}

async function processLesson(lesson) {
    if (lesson.id === 'lesson_1_1') {
        console.log(`Skipping lesson 1_1 as it is the model example with 7 tasks.`);
        return;
    }

    if (lesson.tasks && lesson.tasks.length === 4) {
        console.log(`Skipping lesson ${lesson.title} - already has exactly 4 tasks.`);
        return;
    }

    console.log(`Generating tasks for lesson: ${lesson.title}...`);
    const prompt = getPromptForLesson(lesson);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.4,
            }
        });

        let jsonString = response.text;
        
        if (jsonString.includes('```json')) {
            jsonString = jsonString.split('```json')[1].split('```')[0].trim();
        } else if (jsonString.includes('```')) {
            jsonString = jsonString.split('```')[1].split('```')[0].trim();
        }

        const tasksArray = JSON.parse(jsonString);
        
        if (Array.isArray(tasksArray) && tasksArray.length === 4) {
            lesson.tasks = tasksArray;
            console.log(`✅ Successfully generated 4 tasks for ${lesson.title}`);
        } else {
            console.log(`⚠️ Expected 4 tasks but got ${tasksArray.length} for ${lesson.title}`);
        }

    } catch (error) {
        console.error(`❌ Error processing lesson ${lesson.title}:`, error.message);
    }
}

async function main() {
    console.log(`Batch generating written tasks for Weimar Nazi Germany...`);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < unitData.lessons.length; i++) {
        const lesson = unitData.lessons[i];
        
        if (lesson.id === 'lesson_1_1' || (lesson.tasks && lesson.tasks.length === 4)) {
            continue;
        }

        await processLesson(lesson);
        
        const outputContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
        fs.writeFileSync('./weimar_nazi_germany/data.js', outputContent);
        
        console.log('Waiting 8 seconds before next API call...');
        await delay(8000);
    }
    
    console.log('🎉 All tasks processed!');
}

main();
