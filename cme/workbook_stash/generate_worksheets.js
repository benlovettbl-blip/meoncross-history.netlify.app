const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function generateWorksheets() {
  const rootDir = path.join(__dirname, '..', '..');
  const distHtmlPath = path.join(rootDir, 'dist', 'cme', 'index.html');
  
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

  const jsCodePath = path.join(rootDir, 'cme', 'app.js');
  let jsCode = fs.readFileSync(jsCodePath, 'utf8');

  try {
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
    const lessonsDataCode = fs.readFileSync(path.join(rootDir, 'cme', 'src', 'lessons_data.js'), 'utf8');
    const cleanObjStr = lessonsDataCode.replace('export const LESSONS_DATA =', '').trim();
    LESSONS_DATA = (new Function("return " + cleanObjStr.replace(/;\\s*$/, '')))();
  }

  const keyTopics = [
    { id: 'KT1', subtopics: ['subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3'] },
    { id: 'KT2', subtopics: ['subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3'] },
    { id: 'KT3', subtopics: ['subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'] }
  ];

  const scratchDir = path.join(rootDir, 'cme', 'scratch');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir);
  }

  for (const kt of keyTopics) {
    let combinedBodyContent = '';
    let documentHeader = '';
    
    for (let i = 0; i < kt.subtopics.length; i++) {
      const subId = kt.subtopics[i];
      let html = await window.generateWorkbookHtml(subId, 'cornell', 'comfortable', false);
      
      const bodyStartIdx = html.indexOf('<body>');
      const bodyEndIdx = html.lastIndexOf('</body>');
      
      if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
        let bodyContent = html.substring(bodyStartIdx + 6, bodyEndIdx).trim();
        
        // Ensure page break after each lesson
        bodyContent = bodyContent.replace(/class="print-page-last"/g, 'class="print-page"');
        
        // Inject exam questions using the built-in exam style
        const lessonData = LESSONS_DATA[subId];
        let examHtml = '';
        if (lessonData && lessonData.questionVault && lessonData.questionVault.length > 0) {
          const selectedIndices = lessonData.questionVault.map((_, idx) => idx);
          let rawExamHtml = await window.generateWorkbookHtml(subId, 'exam', 'compact', false, selectedIndices);
          
          const examStartIdx = rawExamHtml.indexOf('<body>');
          const examEndIdx = rawExamHtml.lastIndexOf('</body>');
          if (examStartIdx !== -1 && examEndIdx !== -1) {
            examHtml = rawExamHtml.substring(examStartIdx + 6, examEndIdx).trim();
          }
        }

        combinedBodyContent += `\n<!-- LESSON ${subId} -->\n` + bodyContent + examHtml;
      }
      
      
      if (i === 0) {
        documentHeader = html.substring(0, bodyStartIdx + 6);
        
        // Add custom fonts
        documentHeader = documentHeader.replace(
          '</head>', 
          '  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">\n</head>'
        );
        
        let coverHtml = '';
        if (kt.id === 'KT1') {
          coverHtml = `
            <div class="print-page" style="text-align: center; font-family: 'Outfit', sans-serif;">
              <h1 style="font-family: 'Playfair Display', serif; font-size: 32pt; margin-top: 50px;">Conflict in the Middle East</h1>
              <p style="font-size:16pt; margin-top: 0; color: #555;">Key Topic 1: The Birth of the State of Israel (1945-63)</p>
              <p style="font-size:14pt; font-style: italic;">Student Workbook</p>
              
              <div style="margin: 20px 0;">
                <img src="../public/assets/sources/kt1_cover.png" alt="Middle East Cover" style="max-width: 65%; height: auto; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 3px 3px 10px rgba(0,0,0,0.15);">
              </div>

              <div style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; text-align: left;">Name: </div>
              <div style="margin-top: 25px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; margin-bottom: 40px; text-align: left;">Class: </div>
              
              <div style="margin: 30px 5%; padding: 0;">
                <h3 style="margin-top: 0; margin-bottom: 15px; color: #1a237e; text-align: center; font-family: 'Playfair Display', serif; font-size: 16pt;">Specification Checklist & Inquiries</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt; border: 2px solid #1a237e; text-align: left;">
                  <thead>
                    <tr style="background: #e8eaf6; border-bottom: 2px solid #1a237e;">
                      <th style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center; width: 8%;">Done</th>
                      <th style="padding: 10px; border-right: 1px solid #9fa8da; text-align: left; width: 46%;">Key Topic 1: The Birth of the State of Israel (1945-63)</th>
                      <th style="padding: 10px; text-align: left; width: 46%;">Core Inquiry Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid #9fa8da;">
                      <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
                      <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">Conflicting interests and demands of Jews and Arabs within the British Mandate.</td>
                      <td style="padding: 10px; font-style: italic; color: #333;">Why were the conflicting demands impossible for the British to resolve?</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #9fa8da;">
                      <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
                      <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">Key events leading to the end of the British Mandate, partition and the creation of Israel, including the significance of the bombing of the King David Hotel and UN Resolution 181.</td>
                      <td style="padding: 10px; font-style: italic; color: #333;">How did violence and international pressure force the British to withdraw?</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
                      <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The War of 1948-49 and its impact on the development of the State of Israel, the status of Jerusalem, and the creation of the Palestinian refugee problem.</td>
                      <td style="padding: 10px; font-style: italic; color: #333;">How did the 1948-49 war transform the Middle East?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }
        documentHeader += coverHtml;
      }

    }
    
    const finalHtml = documentHeader + combinedBodyContent + '\n</body>\n</html>';
    const filename = path.join(scratchDir, `workbook_${kt.id}.html`);
    fs.writeFileSync(filename, finalHtml, 'utf8');
    console.log(`Saved ${filename} (${finalHtml.length} bytes)`);
  }

  console.log("All Key Topic workbooks generated successfully.");
  process.exit(0);
}

generateWorksheets();
