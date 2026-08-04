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

Here is a master database of interpretations and sources for the entire unit:
---
${interpretationsText}
---

Your Task:
1. Identify the most relevant Key Topic section from the text above that matches the lesson "${lessonTitle}".
2. From that section, extract the provided Source B, Source C, Interpretation 1, and Interpretation 2 EXACTLY as written.
3. Generate an "exam_practice" JSON object for this lesson following the Edexcel Paper 3 format.
4. You must write top-level (Level 4, 16/16) model answers for all 5 questions. The model answers must explicitly use the sources and interpretations provided, deploying deep historical context (AO1/AO2) and sustained evaluation (AO4).
5. CRITICAL: For Q2 (the 12-mark Explain Why question), you MUST format the model answer EXACTLY as shown in the JSON schema below, including the "Colour Coding Key" and all of the 🔴 🔵 🟢 🟡 span style tags to visually breakdown the PEEL structure. DO NOT just write normal paragraphs for Q2.
6. YOU MUST OUTPUT VALID JSON. Be extremely careful to escape any double quotes inside the HTML strings as \\".

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
            "title": "Source B: ...",
            "content": "..."
        },
        {
            "title": "Source C: ...",
            "content": "..."
        }
    ],
    "questions": [
        {
            "question": "2. Explain why [Topic]... (12 marks).<br><br>You may use the following in your answer:<ul style=\\"margin-top: 5px; margin-bottom: 10px;\\"><li>[Bullet 1]</li><li>[Bullet 2]</li></ul>You must also use information of your own.",
            "model": "<h3 style=\\"margin-top: 15px; margin-bottom: 5px;\\">Colour Coding Key:</h3><ul style=\\"margin-top: 0; margin-bottom: 15px;\\"><li>🔴 <span style=\\"color: #dc2626; font-weight: bold;\\">Point (P):</span> Identifies a distinct, valid cause.</li><li>🔵 <span style=\\"color: #2563eb; font-weight: bold;\\">Evidence (E):</span> Deploys precise historical knowledge.</li><li>🟢 <span style=\\"color: #16a34a; font-weight: bold;\\">Explanation (E):</span> Analyzes exactly how and why this factor caused the event.</li><li>🟡 <span style=\\"color: #d97706; font-weight: bold;\\">Link (L):</span> Connects back to the question.</li></ul><hr style=\\"margin: 20px 0;\\"><p style=\\"margin-bottom: 15px;\\">🔴 <span style=\\"color: #dc2626;\\"><strong>[Point Sentence]</strong>.</span> 🔵 <span style=\\"color: #2563eb;\\">[Evidence Sentences]</span> 🟢 <span style=\\"color: #16a34a;\\">[Explanation Sentences]</span> 🟡 <span style=\\"color: #d97706;\\"><strong>[Link Sentence]</strong></span></p><p style=\\"margin-bottom: 15px;\\">🔴 <span style=\\"color: #dc2626;\\"><strong>[Point 2]</strong>.</span> 🔵 <span style=\\"color: #2563eb;\\">[Evidence 2]</span> 🟢 <span style=\\"color: #16a34a;\\">[Explanation 2]</span> 🟡 <span style=\\"color: #d97706;\\"><strong>[Link 2]</strong></span></p><p style=\\"margin-bottom: 15px;\\">🔴 <span style=\\"color: #dc2626;\\"><strong>[Point 3]</strong>.</span> 🔵 <span style=\\"color: #2563eb;\\">[Evidence 3]</span> 🟢 <span style=\\"color: #16a34a;\\">[Explanation 3]</span> 🟡 <span style=\\"color: #d97706;\\"><strong>[Link 3]</strong></span></p>"
        },
        {
            "question": "3a. How useful are Sources B and C for an enquiry into [Topic]? (8 marks)",
            "model": "<p>Source B is useful because...</p>"
        },
        {
            "question": "3b. Study Interpretations 1 and 2. They give different views about [Topic]. What is the main difference between these views? (4 marks)",
            "model": "<p>The main difference is that Interpretation 1 suggests... whereas Interpretation 2 argues...</p>"
        },
        {
            "question": "3c. Suggest one reason why Interpretations 1 and 2 give different views about [Topic]. You may use Sources B and C to help explain your answer. (4 marks)",
            "model": "<p>The interpretations may differ because they have relied on different sources of evidence. For example, Interpretation 1 is supported by Source B, which shows... However, Interpretation 2 is supported by Source C, which highlights...</p>"
        },
        {
            "question": "3d. How far do you agree with Interpretation [1 or 2] about [Topic]? Explain your answer, using both interpretations and your knowledge of the historical context. (16 marks)",
            "model": "<p>I [strongly agree / partially agree / disagree] with Interpretation [1 or 2] because...</p>"
        }
    ]
}
`;
}

async function processLesson(lesson) {
    console.log(`Processing lesson: ${lesson.title}...`);
    const prompt = getPromptForLesson(lesson.title);
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.2,
            }
        });

        let jsonString = response.text;
        
        if (jsonString.includes('```json')) {
            jsonString = jsonString.split('```json')[1].split('```')[0].trim();
        } else if (jsonString.includes('```')) {
            jsonString = jsonString.split('```')[1].split('```')[0].trim();
        }

        const examPracticeData = JSON.parse(jsonString);
        lesson.exam_practice = examPracticeData;
        console.log(`✅ Successfully generated exam practice for ${lesson.title}`);

    } catch (error) {
        console.error(`❌ Error processing lesson ${lesson.title}:`, error.message);
    }
}

async function main() {
    const targetLessonId = process.argv[2];
    
    if (!targetLessonId) {
        console.log('Usage: node generate_weimar_mocks_api.mjs <lesson_id> (or "all")');
        process.exit(1);
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    if (targetLessonId === 'all') {
        console.log(`Batch processing ALL lessons. This will take a few minutes to avoid rate limits...`);
        for (let i = 0; i < unitData.lessons.length; i++) {
            const lesson = unitData.lessons[i];
            await processLesson(lesson);
            
            const outputContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
            fs.writeFileSync('./weimar_nazi_germany/data.js', outputContent);
            
            if (i < unitData.lessons.length - 1) {
                console.log('Waiting 10 seconds before next API call...');
                await delay(10000);
            }
        }
        console.log('🎉 All lessons processed!');
    } else {
        const lesson = unitData.lessons.find(l => l.id === targetLessonId);
        if (!lesson) {
            console.error(`Lesson with ID ${targetLessonId} not found.`);
            process.exit(1);
        }
        
        await processLesson(lesson);
        const outputContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
        fs.writeFileSync('./weimar_nazi_germany/data.js', outputContent);
        console.log('Done!');
    }
}

main();
