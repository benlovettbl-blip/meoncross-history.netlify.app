import fs from 'fs';
import { unitData } from './eee/data.js';

let output = '# Early Elizabethan England (1558-88): Exam Practice Overview\n\n';
output += 'Here is the current distribution of exam questions across the Elizabethan lessons. I have highlighted the gaps where lessons currently have **zero** exam practice questions assigned.\n\n';

unitData.lessons.forEach(l => {
    const count = (l.exam_practice && Array.isArray(l.exam_practice)) ? l.exam_practice.length : 0;
    output += `### ${l.title}\n`;
    output += `- **Questions assigned:** ${count}\n`;
    
    if (count > 0) {
        l.exam_practice.forEach(ep => {
            const qLines = ep.question.split('\n');
            output += `  - ${qLines[0]}\n`;
        });
    } else {
        output += `  - > [!WARNING]\n  - > **GAP**: No exam practice assigned to this lesson yet.\n`;
    }
    output += '\n';
});

fs.writeFileSync('C:/Users/fives/.gemini/antigravity-ide/brain/1f9faa89-7f32-4037-a93a-b3731e9de1fe/exam_practice_overview.md', output);
console.log('Done');
