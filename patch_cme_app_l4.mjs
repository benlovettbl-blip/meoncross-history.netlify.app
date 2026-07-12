import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/app.js';
let content = fs.readFileSync(filePath, 'utf8');

const tabMappingStr = `
const tabMappings = {
  tab1: { title: "1. The British Mandate", view: "lessonView", data: unitData.lessons[0] },
  tab2: { title: "2. The 1948 War", view: "lessonView", data: unitData.lessons[1] },
  tab3: { title: "3. Nasser & Suez", view: "lessonView", data: unitData.lessons[2] },
  tab4: { title: "4. The Six Day War", view: "lessonView", data: unitData.lessons[3] }
};
`.trim();

// Use a regex to replace the old tabMappings
content = content.replace(/const tabMappings = \{[\s\S]*?\};\n/g, tabMappingStr + '\n\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated tabMappings in cme_new/app.js");
