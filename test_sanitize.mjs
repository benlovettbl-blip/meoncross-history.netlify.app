import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock data_parser logic
function cleanQuestionText(text) {
  if (!text) return "";
  return text.trim();
}

function sanitizeLessonData(lesson) {
  if (!lesson) return lesson;
  if (lesson.narrative && !lesson.narrative_blocks) {
    lesson.narrative_blocks = lesson.narrative.map(item => {
      return {
        ...item,
        type: item.type || "narrative",
        theme_heading: item.theme_heading || item.heading || item.title || "",
        text: item.text || item.content || ""
      };
    });
  }
  return lesson;
}

const dataFilePath = path.join(__dirname, 'eee', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');
let jsonStr = content.replace('export const unitData = ', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

let unitData = eval('(' + jsonStr + ')');

try {
    let lesson = unitData.lessons[0];
    let sanitized = sanitizeLessonData(JSON.parse(JSON.stringify(lesson)));
    console.log("Sanitized lesson 0:");
    console.log("narrative_blocks exists?", !!sanitized.narrative_blocks);
    if (sanitized.narrative_blocks) {
        console.log("first block:", sanitized.narrative_blocks[0].theme_heading);
    }
} catch (e) {
    console.error("Error sanitizing:", e);
}
