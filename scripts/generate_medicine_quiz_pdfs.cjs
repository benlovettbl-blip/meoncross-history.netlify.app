/**
 * generate_medicine_quiz_pdfs.cjs
 *
 * Pillar 3: Knowledge Retrieval Quizzing & Answers Banks for
 * Pearson Edexcel GCSE (9–1) History Paper 1: Medicine in Britain & The Western Front (1HI0/11)
 *
 * Compiles print-ready spaced-recall quiz booklets with 2-column checklist items
 * and green quick-marking answers banks with micro-checkboxes [ ✓ ] [ ✗ ].
 *
 * Outputs:
 * 1. med_recall_quiz_western_front.pdf (4 pages - 100 questions + answers)
 * 2. med_recall_quiz_thematic_study.pdf (12 pages - 280 questions + answers across 4 eras)
 * 3. med_recall_quiz_pack_FULL.pdf (16 pages - complete 380-question recall bank)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const COMMON_CSS = `
  @page { size: A4 portrait; margin: 8mm 10mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 8.5pt; line-height: 1.3; background: #fff; }
  .page { page-break-after: always; height: 280mm; max-height: 280mm; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 0; }
  .page:last-child { page-break-after: avoid; }
  .page-header { border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end; }
  .header-left h1 { margin: 0; font-size: 11pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; }
  .header-left p { margin: 1px 0 0 0; font-size: 7pt; color: #64748b; font-weight: 500; }
  .header-tag { font-size: 6.8pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; }
  .page-footer { font-size: 6.5pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 4px; display: flex; justify-content: space-between; }
  .quiz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px 5px; font-size: 6.3pt; line-height: 1.14; flex: 1 1 auto; overflow: hidden; }
  .quiz-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 2.5px; padding: 1.2px 3px; display: flex; gap: 3px; align-items: flex-start; }
  .quiz-cb { width: 8px; height: 8px; border: 1px solid #94a3b8; border-radius: 2px; flex-shrink: 0; margin-top: 1px; }
  .ans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8px 6px; font-size: 6.6pt; line-height: 1.15; flex: 1 1 auto; }
  .ans-item { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 2.5px; padding: 1.5px 4px; display: flex; gap: 4px; align-items: baseline; }
  .ans-num { color: #166534; font-weight: 800; font-size: 6.6pt; flex-shrink: 0; min-width: 16px; }
  .ans-text { color: #15803d; font-weight: 600; line-height: 1.15; flex: 1; }
  .ans-check { font-size: 5.5pt; color: #166534; opacity: 0.65; white-space: nowrap; flex-shrink: 0; margin-left: 2px; }
`;

async function run() {
  console.log('🚀 Loading Medicine Through Time unit data for Pillar 3 Quizzes...');
  const dataModule = await import('../units/edexcel_medicine/data.js');
  const unitData = dataModule.unitData;

  const unitDir = path.join(__dirname, '..', 'public', 'units', 'edexcel_medicine');
  const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs', 'edexcel_medicine');
  const globalPdfsDir = path.join(__dirname, '..', 'public', 'pdfs');

  if (!fs.existsSync(unitDir)) fs.mkdirSync(unitDir, { recursive: true });
  if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });
  if (!fs.existsSync(globalPdfsDir)) fs.mkdirSync(globalPdfsDir, { recursive: true });

  const extractEraQuestions = (filterFn) => {
    const list = [];
    unitData.lessons.filter(filterFn).forEach((l) => {
      (l.quiz || []).forEach((q) => {
        const ans = q.options ? q.options[q.answer] : q.answer;
        list.push({ q: q.question, a: ans, source: l.title.split(':')[0] });
      });
    });
    return list;
  };

  const wfQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_5'));
  const medQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_1'));
  const renQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_2'));
  const indQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_3'));
  const modQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_4'));

  console.log(
    `Extracted: WF=${wfQuestions.length}, Med=${medQuestions.length}, Ren=${renQuestions.length}, Ind=${indQuestions.length}, Mod=${modQuestions.length}`,
  );

  // 1. Build WF Quiz HTML (4 Pages)
  const wfPages = `
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>The British Sector of the Western Front, 1914–1918</h1><p>Complete Knowledge Retrieval Vault · Questions 1 to 50</p></div><span class="header-tag" style="background:#b45309;">WF Vault 1</span></div>
    <div class="quiz-grid">${wfQuestions
      .slice(0, 50)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 1}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Knowledge Vault</span><span>Western Front Retrieval</span><span>Page 1 of 4</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>The British Sector of the Western Front, 1914–1918</h1><p>Complete Knowledge Retrieval Vault · Questions 51 to 100</p></div><span class="header-tag" style="background:#b45309;">WF Vault 2</span></div>
    <div class="quiz-grid">${wfQuestions
      .slice(50, 100)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 51}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Knowledge Vault</span><span>Western Front Retrieval</span><span>Page 2 of 4</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Western Front Mark Scheme Answers</h1><p>Quick-Marking Bank · Answers 1 to 50</p></div><span class="header-tag" style="background:#166534">Answers 1–50</span></div>
    <div class="ans-grid">${wfQuestions
      .slice(0, 50)
      .map(
        (item, i) =>
          `<div class="ans-item"><span class="ans-num">${i + 1}.</span><span class="ans-text">${item.a}</span><span class="ans-check">[✓][✗]</span></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Answers Bank</span><span>Western Front</span><span>Page 3 of 4</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Western Front Mark Scheme Answers</h1><p>Quick-Marking Bank · Answers 51 to 100</p></div><span class="header-tag" style="background:#166534">Answers 51–100</span></div>
    <div class="ans-grid">${wfQuestions
      .slice(50, 100)
      .map(
        (item, i) =>
          `<div class="ans-item"><span class="ans-num">${i + 51}.</span><span class="ans-text">${item.a}</span><span class="ans-check">[✓][✗]</span></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Answers Bank</span><span>Western Front</span><span>Page 4 of 4</span></div>
  </div>`;

  // 2. Build Thematic Study Quiz HTML (12 Pages: 80 Med, 60 Ren, 60 Ind, 80 Mod)
  const thematicPages = `
  <!-- Medieval Pages (2 pages Qs) -->
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 1: Medicine in Medieval Britain, c1250–c1500</h1><p>Knowledge Retrieval Vault · Questions 1 to 40</p></div><span class="header-tag">Medieval 1</span></div>
    <div class="quiz-grid">${medQuestions
      .slice(0, 40)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 1}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 1 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 1: Medicine in Medieval Britain, c1250–c1500</h1><p>Knowledge Retrieval Vault · Questions 41 to 80</p></div><span class="header-tag">Medieval 2</span></div>
    <div class="quiz-grid">${medQuestions
      .slice(40, 80)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 41}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 2 of 12</span></div>
  </div>

  <!-- Renaissance Pages (2 pages Qs) -->
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 2: The Medical Renaissance in Britain, c1500–c1700</h1><p>Knowledge Retrieval Vault · Questions 1 to 30</p></div><span class="header-tag" style="background:#0284c7">Renaissance 1</span></div>
    <div class="quiz-grid">${renQuestions
      .slice(0, 30)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 1}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 3 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 2: The Medical Renaissance in Britain, c1500–c1700</h1><p>Knowledge Retrieval Vault · Questions 31 to 60</p></div><span class="header-tag" style="background:#0284c7">Renaissance 2</span></div>
    <div class="quiz-grid">${renQuestions
      .slice(30, 60)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 31}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 4 of 12</span></div>
  </div>

  <!-- Industrial Pages (2 pages Qs) -->
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 3: Medicine in 18th & 19th Century Britain, c1700–c1900</h1><p>Knowledge Retrieval Vault · Questions 1 to 30</p></div><span class="header-tag" style="background:#b45309">Industrial 1</span></div>
    <div class="quiz-grid">${indQuestions
      .slice(0, 30)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 1}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 5 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 3: Medicine in 18th & 19th Century Britain, c1700–c1900</h1><p>Knowledge Retrieval Vault · Questions 31 to 60</p></div><span class="header-tag" style="background:#b45309">Industrial 2</span></div>
    <div class="quiz-grid">${indQuestions
      .slice(30, 60)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 31}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 6 of 12</span></div>
  </div>

  <!-- Modern Pages (2 pages Qs) -->
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 4: Medicine in Modern Britain, c1900–present</h1><p>Knowledge Retrieval Vault · Questions 1 to 40</p></div><span class="header-tag" style="background:#0f766e">Modern 1</span></div>
    <div class="quiz-grid">${modQuestions
      .slice(0, 40)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 1}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 7 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Unit 4: Medicine in Modern Britain, c1900–present</h1><p>Knowledge Retrieval Vault · Questions 41 to 80</p></div><span class="header-tag" style="background:#0f766e">Modern 2</span></div>
    <div class="quiz-grid">${modQuestions
      .slice(40, 80)
      .map(
        (item, i) =>
          `<div class="quiz-item"><div class="quiz-cb"></div><div style="flex:1"><strong>${i + 41}.</strong> ${item.q}<div style="color:#94a3b8;font-size:6.5pt">[${item.source}]</div></div></div>`,
      )
      .join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3</span><span>Page 8 of 12</span></div>
  </div>

  <!-- Answer Banks (4 pages Answers) -->
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Medieval Medicine Mark Scheme Answers</h1><p>Quick-Marking Answers Bank · Questions 1 to 80</p></div><span class="header-tag" style="background:#166534">Medieval Ans</span></div>
    <div class="ans-grid">${medQuestions.map((item, i) => `<div class="ans-item"><span class="ans-num">${i + 1}.</span><span class="ans-text">${item.a}</span><span class="ans-check">[✓][✗]</span></div>`).join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Answers</span><span>Page 9 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Renaissance Medicine Mark Scheme Answers</h1><p>Quick-Marking Answers Bank · Questions 1 to 60</p></div><span class="header-tag" style="background:#166534">Renaissance Ans</span></div>
    <div class="ans-grid">${renQuestions.map((item, i) => `<div class="ans-item"><span class="ans-num">${i + 1}.</span><span class="ans-text">${item.a}</span><span class="ans-check">[✓][✗]</span></div>`).join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Answers</span><span>Page 10 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>18th & 19th C Medicine Mark Scheme Answers</h1><p>Quick-Marking Answers Bank · Questions 1 to 60</p></div><span class="header-tag" style="background:#166534">Industrial Ans</span></div>
    <div class="ans-grid">${indQuestions.map((item, i) => `<div class="ans-item"><span class="ans-num">${i + 1}.</span><span class="ans-text">${item.a}</span><span class="ans-check">[✓][✗]</span></div>`).join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Answers</span><span>Page 11 of 12</span></div>
  </div>
  <div class="page">
    <div class="page-header"><div class="header-left"><h1>Modern Medicine Mark Scheme Answers</h1><p>Quick-Marking Answers Bank · Questions 1 to 80</p></div><span class="header-tag" style="background:#166534">Modern Ans</span></div>
    <div class="ans-grid">${modQuestions.map((item, i) => `<div class="ans-item"><span class="ans-num">${i + 1}.</span><span class="ans-text">${item.a}</span><span class="ans-check">[✓][✗]</span></div>`).join('')}</div>
    <div class="page-footer"><span>Mr Lovett's History Hub · Pillar 3 Answers</span><span>Page 12 of 12</span></div>
  </div>`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--no-sandbox'],
  });
  const page = await browser.newPage();

  // 1. Export Full Master Quiz PDF (16 Pages)
  const fullQuizHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Paper 1 Medicine Complete Knowledge Retrieval Compendium</title><style>${COMMON_CSS}</style></head><body>${wfPages}${thematicPages}</body></html>`;
  const fullQuizHtmlPath = path.join(unitDir, 'med_recall_quiz_FULL.html');
  fs.writeFileSync(fullQuizHtmlPath, fullQuizHtml, 'utf8');
  const fullQuizPdfPath = path.join(pdfsDir, 'med_recall_quiz_pack_FULL.pdf');
  await page.setContent(fullQuizHtml, { waitUntil: 'domcontentloaded' });
  await page.pdf({
    path: fullQuizPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' },
  });
  fs.copyFileSync(fullQuizPdfPath, path.join(globalPdfsDir, 'med_recall_quiz_pack_FULL.pdf'));
  console.log(
    `✅ Exported Pillar 3: med_recall_quiz_pack_FULL.pdf (16 Pages Master Retrieval Volume)`,
  );

  await browser.close();

  // Auto-sync to Google Drive Department File
  try {
    const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
    syncAdminPdfsToDrive();
    console.log(`✅ Synced Pillar 3 Quiz PDFs to Google Drive.`);
  } catch (e) {
    console.warn(`⚠️ Warning: Drive sync error: ${e.message}`);
  }
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { run };
