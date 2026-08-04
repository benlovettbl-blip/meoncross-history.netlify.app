import fs from 'fs';
import { unitData } from './weimar_nazi_germany/data.js';

const lesson = unitData.lessons.find(l => l.id === 'lesson_4_2');
if(lesson) {
    const ep = lesson.exam_practice.find(q => q.type === 'q3_enquiry');
    if(ep) {
        ep.model_answer = fs.readFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/scratch/scratch_raw_m3.txt', 'utf8');
    }
}
fs.writeFileSync('weimar_nazi_germany/data.js', 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';');
console.log('Mock 3 patched');
