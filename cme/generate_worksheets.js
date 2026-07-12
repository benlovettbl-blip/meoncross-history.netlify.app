import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateWorkbookHtml, generateBulkWorkbookHtml } from './src/workbook_html_generator.js';
import { WORKBOOK_DATA } from './src/workbook_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateWorksheets() {
  const keyTopics = [
    { id: 'KT1', subtopics: ['subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3'] },
    { id: 'KT2', subtopics: ['subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3'] },
    { id: 'KT3', subtopics: ['subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'] }
  ];

  const publicDir = path.join(__dirname, 'public', 'cme_workbooks');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Generate individual KT workbooks
  for (const kt of keyTopics) {
    let combinedBodyContent = '';
    let documentHeader = '';
    
    for (let i = 0; i < kt.subtopics.length; i++) {
      const subId = kt.subtopics[i];
      
      const html = await generateWorkbookHtml(subId, 'cornell', 'comfortable', false, []);
      
      const bodyStartIdx = html.indexOf('<body>');
      const bodyEndIdx = html.lastIndexOf('</body>');
      
      if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
        let bodyContent = html.substring(bodyStartIdx + 6, bodyEndIdx).trim();
        
        // Ensure page break after each lesson
        bodyContent = bodyContent.replace(/class="print-page-last"/g, 'class="print-page"');
        
        // Inject exam questions
        let examHtml = '';
        const lessonData = WORKBOOK_DATA[subId];
        if (lessonData && lessonData.examPractice && lessonData.examPractice.questions) {
          const selectedIndices = lessonData.examPractice.questions.map((_, idx) => idx);
          const rawExamHtml = await generateWorkbookHtml(subId, 'exam', 'compact', false, selectedIndices);
          
          if (rawExamHtml) {
            const examStartIdx = rawExamHtml.indexOf('<body>');
            const examEndIdx = rawExamHtml.lastIndexOf('</body>');
            if (examStartIdx !== -1 && examEndIdx !== -1) {
              examHtml = rawExamHtml.substring(examStartIdx + 6, examEndIdx).trim();
            }
          }
        }

        combinedBodyContent += `\n<!-- LESSON ${subId} -->\n` + bodyContent + "\n" + examHtml;
      }
      
      if (i === 0) {
        documentHeader = html.substring(0, bodyStartIdx + 6);
        let coverHtml = '';
        let ktTitle = "";
        let ktDesc = "";
        let ktSpecRows = "";

        if (kt.id === 'KT1') {
          ktTitle = "Key Topic 1: The Birth of the State of Israel (1945-63)";
          ktDesc = "Conflict in the Middle East";
          ktSpecRows = `
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
          `;
        } else if (kt.id === 'KT2') {
          ktTitle = "Key Topic 2: The Escalation of Conflict (1964-73)";
          ktDesc = "Conflict in the Middle East";
          ktSpecRows = `
            <tr style="border-bottom: 1px solid #9fa8da;">
              <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The origins and actions of the PLO, and the increasing tension between Arab states and Israel.</td>
              <td style="padding: 10px; font-style: italic; color: #333;">Why did Palestinian resistance become more organized and militant?</td>
            </tr>
            <tr style="border-bottom: 1px solid #9fa8da;">
              <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The Six-Day War (1967): causes, events, and profound consequences for the territorial shape of Israel.</td>
              <td style="padding: 10px; font-style: italic; color: #333;">How did Israel dramatically expand its borders in 1967?</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The Yom Kippur War (1973) and the use of the oil weapon by Arab states.</td>
              <td style="padding: 10px; font-style: italic; color: #333;">How did Arab states use surprise and economics to pressure Israel and the West?</td>
            </tr>
          `;
        } else if (kt.id === 'KT3') {
          ktTitle = "Key Topic 3: Attempts at Peace (1974-95)";
          ktDesc = "Conflict in the Middle East";
          ktSpecRows = `
            <tr style="border-bottom: 1px solid #9fa8da;">
              <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The Camp David Accords (1978) and the Egyptian-Israeli Peace Treaty.</td>
              <td style="padding: 10px; font-style: italic; color: #333;">How did Egypt and Israel finally make peace?</td>
            </tr>
            <tr style="border-bottom: 1px solid #9fa8da;">
              <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The Israeli invasion of Lebanon (1982) and the First Intifada (1987).</td>
              <td style="padding: 10px; font-style: italic; color: #333;">Why did conflict shift to Lebanon and the Occupied Territories?</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center;"><div style="width: 16px; height: 16px; border: 2px solid #1a237e; border-radius: 2px; display: inline-block; background: #fff;"></div></td>
              <td style="padding: 10px; border-right: 1px solid #9fa8da; font-weight: 500;">The Oslo Peace Accords (1993) and the assassination of Yitzhak Rabin (1995).</td>
              <td style="padding: 10px; font-style: italic; color: #333;">How close did Israel and the Palestinians come to a two-state solution?</td>
            </tr>
          `;
        }

        if (ktTitle) {
          coverHtml = `
            <div class="print-page" style="text-align: center; font-family: 'Outfit', sans-serif;">
              <h1 style="font-family: 'Playfair Display', serif; font-size: 32pt; margin-top: 50px;">${ktDesc}</h1>
              <p style="font-size:16pt; margin-top: 0; color: #555;">${ktTitle}</p>
              <p style="font-size:14pt; font-style: italic;">Student Workbook</p>
              
              <div style="margin: 20px 0;">
                <img src="/assets/sources/kt1_cover.png" alt="Middle East Cover" style="max-width: 65%; height: auto; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 3px 3px 10px rgba(0,0,0,0.15);">
              </div>

              <div style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; text-align: left;">Name: </div>
              <div style="margin-top: 25px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; margin-bottom: 40px; text-align: left;">Class: </div>
              
              <div style="margin: 30px 5%; padding: 0;">
                <h3 style="margin-top: 0; margin-bottom: 15px; color: #1a237e; text-align: center; font-family: 'Playfair Display', serif; font-size: 16pt;">Specification Checklist & Inquiries</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 10.5pt; border: 2px solid #1a237e; text-align: left;">
                  <thead>
                    <tr style="background: #e8eaf6; border-bottom: 2px solid #1a237e;">
                      <th style="padding: 10px; border-right: 1px solid #9fa8da; text-align: center; width: 8%;">Done</th>
                      <th style="padding: 10px; border-right: 1px solid #9fa8da; text-align: left; width: 46%;">${ktTitle}</th>
                      <th style="padding: 10px; text-align: left; width: 46%;">Core Inquiry Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ktSpecRows}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }
        documentHeader += coverHtml;
      }
    }
    
    // Generate Exam Practice Bank
    const questionsByStem = {
      "Consequence (4 Marks)": [],
      "Narrative (8 Marks)": [],
      "Importance (16 Marks)": []
    };
    
    for (const subId of kt.subtopics) {
      const lessonData = WORKBOOK_DATA[subId];
      if (lessonData && lessonData.examPractice && lessonData.examPractice.questions) {
        for (const q of lessonData.examPractice.questions) {
          if (q.title && q.title.includes("Consequence")) questionsByStem["Consequence (4 Marks)"].push(q);
          else if (q.title && q.title.includes("Narrative")) questionsByStem["Narrative (8 Marks)"].push(q);
          else if (q.title && q.title.includes("Importance")) questionsByStem["Importance (16 Marks)"].push(q);
        }
      }
    }
    
    let bankHtml = `
      <div class="print-page" style="page-break-before: always; font-family: 'Outfit', sans-serif;">
        <h2 class="main-title" style="text-align: center; margin-bottom: 30px; font-size: 20pt; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">${kt.id} Exam Practice Bank</h2>
    `;
    
    for (const [stem, questions] of Object.entries(questionsByStem)) {
      if (questions.length === 0) continue;
      bankHtml += `<h3 style="color: #1a237e; font-size: 16pt; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${stem}</h3>`;
      bankHtml += `<ul style="list-style-type: none; padding-left: 0; font-size: 12pt; line-height: 1.6;">`;
      for (let i = 0; i < Math.min(questions.length, 5); i++) {
        const q = questions[i];
        bankHtml += `<li style="margin-bottom: 15px; padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px;">
          <strong>Question:</strong> ${q.text || q.question}
          ${q.stimulus ? `<br><span style="font-size: 10.5pt; color: #555;"><em>You may use the following in your answer: &bull; ${q.stimulus.join(' &bull; ')}</em></span>` : ''}
        </li>`;
      }
      bankHtml += `</ul>`;
    }
    bankHtml += `</div>`;
    
    const finalHtml = documentHeader + combinedBodyContent + bankHtml + '\n</body>\n</html>';
    const filename = path.join(publicDir, `workbook_${kt.id}.html`);
    fs.writeFileSync(filename, finalHtml, 'utf8');
    console.log(`Saved ${filename} (${finalHtml.length} bytes)`);
  }

  // 2. Generate combined workbook
  const combinedHtml = await generateBulkWorkbookHtml('cornell', 'comfortable', false);
  const combinedFilename = path.join(publicDir, 'workbook_combined.html');
  fs.writeFileSync(combinedFilename, combinedHtml, 'utf8');
  console.log(`Saved ${combinedFilename} (${combinedHtml.length} bytes)`);
}

generateWorksheets().catch(console.error);
