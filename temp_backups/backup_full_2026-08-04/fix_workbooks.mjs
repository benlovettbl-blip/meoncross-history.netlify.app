import fs from 'fs';

const filePath = 'weimar_nazi_germany/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const regexWorkbooks = /"workbooks":\s*\[[\s\S]*?\],/g;
const regexPrintable = /"printable_workbooks":\s*\[[\s\S]*?\],/g;

const workbooksReplacement = `"workbooks": [
        { "id": "KT1", "title": "Key Topic 1: The Weimar Republic", "image": "", "prefix": "lesson_1_" },
        { "id": "KT2", "title": "Key Topic 2: Hitler's Rise to Power, 1919-33", "image": "", "prefix": "lesson_2_" },
        { "id": "KT3", "title": "Key Topic 3: Nazi Control and Dictatorship", "image": "", "prefix": "lesson_3_" }
    ],`;

content = content.replace(regexWorkbooks, workbooksReplacement);
content = content.replace(regexPrintable, workbooksReplacement.replace('"workbooks"', '"printable_workbooks"'));

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated workbooks arrays.");
