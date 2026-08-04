const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const notes = [
  "In the 1871 Franco-Prussian War, the newly formed German Empire conquered the French territories of Alsace and Lorraine. Proclaiming the German Empire inside the French royal palace of Versailles was a calculated humiliation. This fueled a burning French desire for revanche (revenge) that poisoned European diplomacy for decades.",
  "This cartoon references the 1884-85 Berlin Conference where Bismarck helped orchestrate the \"Scramble for Africa\". Britain, long the dominant global empire, felt deeply threatened by Germany's sudden, aggressive expansion into Africa and the Pacific (Weltpolitik), fearing it would disrupt their economic dominance.",
  "Launched in 1906, HMS Dreadnought was so heavily armored and carried such massive guns that it instantly made every older battleship in the world obsolete. Ironically, while intended to secure British naval supremacy, it effectively reset the naval arms race to zero, allowing Germany to start building their own Dreadnoughts on an equal footing.",
  "In the early 20th century, a nation's military power was determined by heavy industry (steel for artillery/shells) and railways (for rapidly moving millions of troops to the front lines). Germany's massive industrial lead terrified France and Russia, forcing them to ally with each other to balance the scales.",
  "The Balkans was known as the \"Powder Keg of Europe\" because of explosive nationalist movements, particularly Slavic groups seeking independence from the Austro-Hungarian Empire. The \"Great Powers\" (Britain, France, Germany, Russia, Austria-Hungary) are shown desperately trying to keep a lid on the tension, which finally exploded with the Archduke's assassination."
];

unitData.lessons.forEach((lesson, idx) => {
  if (lesson.primary_source) {
    lesson.primary_source.teacher_note = notes[idx];
  }
});

const newJsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, newJsContent);
console.log("Updated data.js");

const appPath = path.join(__dirname, 'great_war', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// Inject the details block into app.js
const noteUI = `
            \${lesson.primary_source.teacher_note ? \`<details style="margin-top: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
              <summary style="color: #64748b; font-size: 0.95rem; font-weight: 600; cursor: pointer; list-style: none; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Teacher Note: Expand for historical context
              </summary>
              <p style="margin: 10px 0 0 0; font-size: 0.95rem; color: #475569; line-height: 1.5;">\${lesson.primary_source.teacher_note}</p>
            </details>\` : ''}
`;

if (!appContent.includes('Teacher Note')) {
  appContent = appContent.replace(
    /\$\{lesson\.primary_source\.caption \? \`<p class="source-caption">\$\{lesson\.primary_source\.caption\}<\/p>\` : ''\}/,
    `\${lesson.primary_source.caption ? \`<p class="source-caption">\${lesson.primary_source.caption}</p>\` : ''}${noteUI}`
  );
  fs.writeFileSync(appPath, appContent);
  console.log("Updated app.js");
}

const genPath = path.join(__dirname, 'great_war', 'generate_worksheets.js');
let genContent = fs.readFileSync(genPath, 'utf8');

if (!genContent.includes('Teacher Note')) {
  const genNoteUI = `
            \${lesson.primary_source.teacher_note ? \`<div style="margin-top: 15px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 10px;">
              <div style="color: #64748b; font-size: 0.85rem; font-weight: 600; margin-bottom: 5px;">
                <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Teacher Note (For Reference)
              </div>
              <p style="margin: 0; font-size: 0.85rem; color: #475569; line-height: 1.4;">\${lesson.primary_source.teacher_note}</p>
            </div>\` : ''}
  `;
  genContent = genContent.replace(
    /\$\{lesson\.primary_source\.caption \? \`<p class="source-caption">\$\{lesson\.primary_source\.caption\}<\/p>\` : ''\}/,
    `\${lesson.primary_source.caption ? \`<p class="source-caption">\${lesson.primary_source.caption}</p>\` : ''}${genNoteUI}`
  );
  fs.writeFileSync(genPath, genContent);
  console.log("Updated generate_worksheets.js");
}
