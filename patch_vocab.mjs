import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function patchVocab(unitPath) {
    const dataFilePath = path.join(__dirname, unitPath, 'data.js');
    let content = fs.readFileSync(dataFilePath, 'utf8');
    let jsonStr = content.replace('export const unitData = ', '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

    let unitData = eval('(' + jsonStr + ')');
    
    let modified = false;
    unitData.lessons.forEach(lesson => {
        if (!lesson.vocab) {
            lesson.vocab = [];
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
        console.log(`Patched missing vocab in ${unitPath}`);
    }
}

patchVocab('weimar_nazi_germany');
patchVocab('eee');
