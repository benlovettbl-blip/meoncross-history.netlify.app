import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function repairAppJs(unitPath) {
    const appJsPath = path.join(__dirname, unitPath, 'app.js');
    if (!fs.existsSync(appJsPath)) return;
    
    let content = fs.readFileSync(appJsPath, 'utf8');
    
    // Pattern to match the if (unitEnquiryText) block inside renderLesson
    // We'll use a regex that matches the if block for unitEnquiryText
    const pattern = /if\s*\(\s*unitEnquiryText\s*\)\s*\{[\s\S]*?html\s*\+=\s*`[\s\S]*?`;\s*\}/g;
    
    if (pattern.test(content)) {
        content = content.replace(pattern, '');
        fs.writeFileSync(appJsPath, content, 'utf8');
        console.log(`Repaired ${unitPath}/app.js`);
    } else {
        console.log(`No match in ${unitPath}/app.js`);
    }
}

repairAppJs('eee');
repairAppJs('weimar_nazi_germany');
