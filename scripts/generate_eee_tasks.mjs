import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({});

// Define pedagogical rules to pass to the model
const systemInstruction = `You are an expert history teacher writing tasks for a pupil workbook.
You are given the narrative text of a lesson. Generate 5-7 workbook tasks for a mixed-ability GCSE class.
Use strong pedagogical practice. Include a variety of question types (e.g., Causal Linkage, The 'But/Because/So' Strategy, Vocabulary in Context, Constrained Summary, The 'Diamond Ranking' Challenge, Timeline sorting).
Each task must be a JSON object with:
{
  "question": "The task instructions/question text",
  "model": "A detailed, historically accurate model answer"
}
Ensure the tasks strictly follow the narrative content provided. Return ONLY a raw JSON array of these task objects. Do not wrap in markdown blocks.`;

async function main() {
  const dataPath = path.join(__dirname, '../public/units/eee/data.js');
  let content = fs.readFileSync(dataPath, 'utf8');
  
  // Extract the object to parse it
  let jsStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
  let eeeData;
  try {
    eeeData = eval(`(${jsStr})`);
  } catch (e) {
    console.error("Error parsing eee/data.js", e);
    return;
  }

  const allTasks = {};

  for (const lesson of eeeData.lessons) {
    console.log(`Generating tasks for ${lesson.id}: ${lesson.title}`);
    let narrative = lesson.narrative_blocks?.map(b => b.text).join('\n\n') || '';
    if (!narrative) {
      console.log(`No narrative found for ${lesson.id}`);
      continue;
    }

    const prompt = `Lesson Title: ${lesson.title}\n\nNarrative Content:\n${narrative}\n\nGenerate the tasks.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      const tasks = JSON.parse(text);
      allTasks[lesson.id] = tasks;
      console.log(`✅ Generated ${tasks.length} tasks for ${lesson.id}`);
    } catch (e) {
      console.error(`❌ Error generating tasks for ${lesson.id}`, e);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../temp_eee_tasks.json'), JSON.stringify(allTasks, null, 2));
  console.log('Finished generating tasks. Saved to temp_eee_tasks.json');
}

main();
