import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { unitData } from './weimar_nazi_germany/data.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const interpretationsPath = 'C:/Users/fives/.gemini/antigravity-ide/brain/8858e5c0-1c2a-43f9-98ab-50645efaed35/interpretations.md';
const interpretationsText = fs.readFileSync(interpretationsPath, 'utf8');

// Function to map a lesson to its interpretations based on the Key Topic and title
function getPromptForLesson(lessonTitle) {
    return `
You are an expert Edexcel GCSE History (Weimar and Nazi Germany 1918-39) examiner and author.
I have a lesson titled: "${lessonTitle}".

Here are the interpretations for the entire unit:
---
${interpretationsText}
---

Your Task:
1. Identify the most relevant Key Topic and Interpretation pairing from the text above that matches the lesson "${lessonTitle}".
2. Generate an "exam_practice" JSON object for this lesson following the Edexcel Paper 3 format.
3. You must invent/source TWO authentic primary sources (Source C and Source D) from the era that match the topic. Source C must be a written primary source. Source D can be a written primary source, or a visual source (if visual, describe it in detail).
4. You must write top-level (Level 4, 16/16) model answers for all 5 questions. The model answers must explicitly use the sources and interpretations provided, deploying deep historical context (AO1/AO2) and sustained evaluation (AO4).

The output MUST be ONLY valid JSON matching this schema exactly (no markdown formatting, no code blocks):
{
    "stimulus": [
        {
            "title": "Interpretation 1: ...",
            "content": "..."
        },
        {
            "title": "Interpretation 2: ...",
            "content": "..."
        },
        {
            "title": "Source C: ...",
            "content": "..."
        },
        {
            "title": "Source D: ...",
            "content": "..."
        }
    ],
    "questions": [
        {
            "question": "2. Explain why [Topic]... (12 marks).<br><br>You may use the following in your answer:<ul style=\\"margin-top: 5px; margin-bottom: 10px;\\"><li>[Bullet 1]</li><li>[Bullet 2]</li></ul>You must also use information of your own.",
            "model": "<h3 style=\\"margin-top: 15px; margin-bottom: 5px;\\">Colour Coding Key:</h3><ul style=\\"margin-top: 0; margin-bottom: 15px;\\"><li>🔴 <span style=\\"color: #dc2626; font-weight: bold;\\">Point (P):</span> Identifies a distinct, valid cause.</li><li>🔵 <span style=\\"color: #2563eb; font-weight: bold;\\">Evidence (E):</span> Deploys precise historical knowledge.</li><li>🟢 <span style=\\"color: #16a34a; font-weight: bold;\\">Explanation (E):</span> Analyzes exactly how and why this factor caused the event.</li><li>🟡 <span style=\\"color: #d97706; font-weight: bold;\\">Link (L):</span> Connects back to the question.</li></ul><hr style=\\"margin: 20px 0;\\"><p style=\\"margin-bottom: 15px;\\">🔴 <span style=\\"color: #dc2626;\\"><strong>[Point Sentence]</strong>.</span> 🔵 <span style=\\"color: #2563eb;\\">[Evidence Sentences]</span> 🟢 <span style=\\"color: #16a34a;\\">[Explanation Sentences]</span> 🟡 <span style=\\"color: #d97706;\\"><strong>[Link Sentence]</strong></span></p><p style=\\"margin-bottom: 15px;\\">🔴 <span style=\\"color: #dc2626;\\"><strong>[Point 2]</strong>.</span> 🔵 <span style=\\"color: #2563eb;\\">[Evidence 2]</span> 🟢 <span style=\\"color: #16a34a;\\">[Explanation 2]</span> 🟡 <span style=\\"color: #d97706;\\"><strong>[Link 2]</strong></span></p><p style=\\"margin-bottom: 15px;\\">🔴 <span style=\\"color: #dc2626;\\"><strong>[Point 3]</strong>.</span> 🔵 <span style=\\"color: #2563eb;\\">[Evidence 3]</span> 🟢 <span style=\\"color: #16a34a;\\">[Explanation 3]</span> 🟡 <span style=\\"color: #d97706;\\"><strong>[Link 3]</strong></span></p>"
        },
        {
            "question": "3a. How useful are Sources C and D... (8 marks)",
            "model": "<p>Source C is useful because...</p>"
        },
        {
            "question": "3b. Study Interpretations 1 and 2. What is the main difference... (4 marks)",
            "model": "The main difference is..."
        },
        {
            "question": "3c. Suggest one reason why Interpretation 1 and 2 give different views... (4 marks)",
            "model": "One reason is..."
        },
        {
            "question": "3d. How far do you agree with Interpretation 2... (16 marks)",
            "model": "<p>Interpretation 2 presents a highly convincing argument...</p>"
        }
    ]
}
`;
}

async function processLesson(lessonId) {
    console.log(`Processing lesson: ${lessonId}...`);
    const lesson = unitData.lessons.find(l => l.id === lessonId);
    if (!lesson) {
        console.error(`Lesson ${lessonId} not found.`);
        return;
    }

    const prompt = getPromptForLesson(lesson.title);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview',
            contents: prompt,
            config: {
                temperature: 0.2,
            }
        });
        
        let jsonStr = response.text.trim();
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.replace(/^```json/, '').replace(/```$/, '').trim();
        }
        
        const generatedPractice = JSON.parse(jsonStr);
        lesson.exam_practice = generatedPractice;
        
        // Write the data back to disk
        const dataPath = './weimar_nazi_germany/data.js';
        const newContent = 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n';
        fs.writeFileSync(dataPath, newContent, 'utf8');
        
        console.log(`Successfully generated and injected exam practice for ${lessonId}`);
    } catch (e) {
        console.error(`Failed to generate for ${lessonId}:`, e);
    }
}

async function processAll() {
    const lessonsToProcess = unitData.lessons.filter(l => l.id !== 'lesson_1_1' && l.id !== 'lesson_1_2');
    for (const lesson of lessonsToProcess) {
        await processLesson(lesson.id);
        // Wait 10 seconds between requests to avoid rate limits
        await new Promise(r => setTimeout(r, 10000));
    }
    console.log("All lessons processed!");
}

const targetLesson = process.argv[2];
if (!targetLesson) {
    console.log("Please provide a lesson ID to process, or 'all'. Example: node generate_weimar_mocks_api.mjs lesson_1_2");
    process.exit(1);
}

if (targetLesson === 'all') {
    processAll();
} else {
    processLesson(targetLesson);
}
