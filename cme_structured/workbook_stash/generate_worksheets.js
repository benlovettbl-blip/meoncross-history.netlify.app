const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function generateWorksheets() {
  const rootDir = __dirname;
  const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
  
  if (!fs.existsSync(distHtmlPath)) {
    console.error("Error: You must run 'npm run build' first so dist/index.html exists.");
    process.exit(1);
  }

  const htmlContent = fs.readFileSync(distHtmlPath, 'utf8');
  const dom = new JSDOM(htmlContent, {
    url: 'http://localhost:3000',
    runScripts: 'outside-only',
    resources: 'usable'
  });

  const { window } = dom;
  window.AudioContext = function() { return {}; };
  window.webkitAudioContext = window.AudioContext;
  window.requestAnimationFrame = (cb) => setTimeout(cb, 0);

  const assetsDir = path.join(rootDir, 'dist', 'assets');
  const files = fs.readdirSync(assetsDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  // Node.js dynamic imports resolve relative to the script file, not CWD.
  // Copy JS chunks to root so import('./chunk.js') works.
  for (const f of jsFiles) {
    fs.copyFileSync(path.join(assetsDir, f), path.join(rootDir, f));
  }

  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
  let jsCode = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  
  jsCode = jsCode.replace(/export\s*\{[^}]+\};?/g, '');
  jsCode = jsCode.replace(/export\s+const\s+/g, 'const ');
  jsCode = jsCode.replace(/export\s+function\s+/g, 'function ');
  jsCode = jsCode.replace(/export\s+default\s+/g, '');

  try {
    // We execute it in the context of the assets folder so dynamic imports work
    process.chdir(assetsDir);
    window.eval(jsCode);
  } catch (e) {
    console.error("Eval failed:", e);
  }

  // Wait for modules to load and dynamic imports to resolve
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (typeof window.generateWorkbookHtml !== 'function') {
    console.error("Failed to find window.generateWorkbookHtml. Ensure you built the app.");
    process.exit(1);
  }

  // Get LESSONS_DATA to extract exam questions
  let LESSONS_DATA = {};
  if (window.LESSONS_DATA) {
    LESSONS_DATA = window.LESSONS_DATA;
  } else {
    // We need to parse it ourselves if it was minified out
    const lessonsDataCode = fs.readFileSync(path.join(rootDir, 'src', 'lessons_data.js'), 'utf8');
    const cleanObjStr = lessonsDataCode.replace('export const LESSONS_DATA =', '').trim();
    LESSONS_DATA = (new Function("return " + cleanObjStr.replace(/;\\s*$/, '')))();
  }

  const keyTopics = [
    { id: 'KT1', subtopics: ['subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3'] },
    { id: 'KT2', subtopics: ['subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3'] },
    { id: 'KT3', subtopics: ['subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'] }
  ];

  const scratchDir = path.join(rootDir, 'scratch');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir);
  }

  for (const kt of keyTopics) {
    let combinedBodyContent = '';
    let documentHeader = '';
    
    for (let i = 0; i < kt.subtopics.length; i++) {
      const subId = kt.subtopics[i];
      let html = await window.generateWorkbookHtml(subId, 'study', 'comfortable', false);
      
      const bodyStartIdx = html.indexOf('<body>');
      const bodyEndIdx = html.lastIndexOf('</body>');
      
      if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
        let bodyContent = html.substring(bodyStartIdx + 6, bodyEndIdx).trim();
        
        // Ensure page break after each lesson
        bodyContent = bodyContent.replace(/class="print-page-last"/g, 'class="print-page"');
        
        // Inject exam questions & blank writing space
        const lessonData = LESSONS_DATA[subId];
        let examHtml = '';
        if (lessonData && lessonData.questionVault && lessonData.questionVault.length > 0) {
          examHtml = `
            <div class="print-page" style="position: relative; min-height: 27.2cm; box-sizing: border-box; padding: 1.0cm; margin-top: 20px; page-break-before: always;">
              <h2 class="main-title">Exam Practice: ${lessonData.headerTitle ? lessonData.headerTitle.replace(/<[^>]+>/g, '') : subId}</h2>
              <div style="font-size: 11pt; margin-bottom: 20px;">Use the space below to answer the following exam questions.</div>
          `;
          
          lessonData.questionVault.forEach((q, idx) => {
            examHtml += `
              <div style="margin-bottom: 20px;">
                <strong>Q${idx+1}:</strong> ${q.question}
              </div>
            `;
          });

          // Add blank writing space (lined page)
          examHtml += `
              <div style="margin-top: 30px;">
                <div style="width: 100%; border-bottom: 1.5px solid #000; margin-bottom: 10px;"><strong>Writing Space:</strong></div>
          `;
          // Add 30 lined rows
          for (let lines = 0; lines < 30; lines++) {
            examHtml += `<div style="border-bottom: 1px dashed #9ca3af; height: 25px; width: 100%; margin-bottom: 5px;"></div>`;
          }
          examHtml += `</div></div>`;
        }

        combinedBodyContent += `\n<!-- LESSON ${subId} -->\n` + bodyContent + examHtml;
      }
      
      if (i === 0) {
        documentHeader = html.substring(0, bodyStartIdx + 6);
      }
    }
    
    const finalHtml = documentHeader + combinedBodyContent + '\n</body>\n</html>';
    const filename = path.join(scratchDir, `workbook_${kt.id}.html`);
    fs.writeFileSync(filename, finalHtml, 'utf8');
    console.log(`Saved ${filename} (${finalHtml.length} bytes)`);
  }

  for (const f of jsFiles) {
    try { fs.unlinkSync(path.join(rootDir, f)); } catch (e) {}
  }

  console.log("All Key Topic workbooks generated successfully.");
  process.exit(0);
}

generateWorksheets();
