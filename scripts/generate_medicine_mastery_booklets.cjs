/**
 * generate_medicine_mastery_booklets.cjs
 *
 * Compiles print-perfect Edexcel GCSE (9–1) History Paper 1 Mastery Revision Booklets:
 * 1. Booklet 1: Section A — The British Sector of the Western Front, 1914–1918 (12 Pages)
 * 2. Booklet 2: Section B — Medicine in Britain, c1250–present (Thematic Master — 24 Pages)
 * 3. Master Volume: Paper 1 Complete Mastery Volume (36 Pages)
 *
 * Implements:
 * - Space-saving Answers-Only Bank (Pages 4 & 5) with micro-checkboxes [ ✓ ] [ ✗ ]
 * - Clean 4-column cover tracker (No RAG column) with teacher/peer marker sign-off
 * - Section A Western Front Historic Environment stems:
 *     - Two separate 2-mark Feature questions (Q1a & Q1b)
 *     - 8-mark Source Utility with authentic sources and Provenance Clues scaffolding (Q2a)
 *     - 4-mark Follow-Up Investigation Grid with multiple diverse examples (Q2b)
 * - Section B Thematic Study stems:
 *     - 4-mark Cross-Period Similarity / Difference (Q3)
 *     - 12-mark Multi-Factor "Explain Why" with stimulus points (Q4)
 *     - 16+4-mark Cross-Era Statement Essay with criteria-led judgement (Q5/Q6)
 * - Generous ruled writing lines to eliminate empty lower halves
 * - High-speed Puppeteer PDF generation with automated zero-overflow guarantee
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

// Common CSS for print-perfect A4 booklets
const COMMON_CSS = `
  @page { size: A4 portrait; margin: 8mm 10mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 8.5pt; line-height: 1.3; background: #fff; }
  
  .page { 
    page-break-after: always; 
    height: 280mm; 
    max-height: 280mm; 
    box-sizing: border-box; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    padding: 0;
  }
  .page:last-child { page-break-after: avoid; }
  
  /* Headers */
  .page-header { border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end; }
  .header-left h1 { margin: 0; font-size: 11pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; }
  .header-left p { margin: 1px 0 0 0; font-size: 7pt; color: #64748b; font-weight: 500; }
  .header-tag { font-size: 6.8pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; }
  
  .page-footer { font-size: 6.5pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 4px; display: flex; justify-content: space-between; }
  
  /* Lined paper simulation */
  .writing-line { height: 15px; border-bottom: 1px solid #cbd5e1; margin-bottom: 2px; }
  .writing-line.starter { color: #475569; font-style: italic; font-size: 7.5pt; display: flex; align-items: flex-end; padding-bottom: 2px; }
  
  /* Answers-Only Bank (Green Pages) */
  .ans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8px 6px; font-size: 6.6pt; line-height: 1.15; flex: 1 1 auto; }
  .ans-grid.dense-3col { grid-template-columns: 1fr 1fr 1fr; gap: 1.5px 5px; font-size: 6.1pt; line-height: 1.12; }
  .ans-item { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 2.5px; padding: 1.5px 4px; display: flex; gap: 4px; align-items: baseline; }
  .ans-grid.dense-3col .ans-item { padding: 1.2px 3px; gap: 3px; }
  .ans-num { color: #166534; font-weight: 800; font-size: 6.6pt; flex-shrink: 0; min-width: 16px; }
  .ans-grid.dense-3col .ans-num { font-size: 6.1pt; min-width: 14px; }
  .ans-text { color: #15803d; font-weight: 600; line-height: 1.15; flex: 1; }
  .ans-check { font-size: 5.5pt; color: #166534; opacity: 0.65; white-space: nowrap; flex-shrink: 0; margin-left: 2px; }
  
  /* Cover Tracker Table */
  .tracker-table { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin: 6px 0; }
  .tracker-table th, .tracker-table td { border: 1px solid #cbd5e1; padding: 3px 5px; vertical-align: middle; }
  .tracker-table th { background: #1e3a8a; color: white; font-weight: 800; text-align: left; }
  .tracker-table tr:nth-child(even) { background: #f8fafc; }
  
  /* 2-Column Quiz Grids */
  .quiz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px 5px; font-size: 6.3pt; line-height: 1.14; flex: 1 1 auto; overflow: hidden; }
  .quiz-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 2.5px; padding: 1.2px 3px; display: flex; gap: 3px; align-items: flex-start; }
  .quiz-cb { width: 8px; height: 8px; border: 1px solid #94a3b8; border-radius: 2px; flex-shrink: 0; margin-top: 1px; }
  
  /* Stepped Ladder Boxes */
  .ladder-zone { border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px; }
  .ladder-launchpad { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 4px 6px; font-size: 7.2pt; color: #1e40af; margin-bottom: 4px; }
  .ladder-stretch { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 4px; padding: 4px 6px; font-size: 7.2pt; color: #6d28d9; margin-top: 4px; }
  
  /* Dual Track Split Columns */
  .dual-track-container { display: grid; grid-template-columns: 34% 66%; gap: 8px; flex: 1 1 auto; margin-bottom: 4px; }
  .toolkit-col { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px; font-size: 7pt; display: flex; flex-direction: column; justify-content: space-between; }
  .writing-col { border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px; display: flex; flex-direction: column; justify-content: space-between; }
  
  /* Planning Engine Tables */
  .plan-table { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin-bottom: 4px; }
  .plan-table th, .plan-table td { border: 1px solid #cbd5e1; padding: 3px 5px; vertical-align: top; }
  .plan-table th { background: #f1f5f9; font-weight: 800; color: #1e293b; text-align: left; }
  
  /* Follow-Up Grid Table */
  .follow-up-table { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin-top: 3px; }
  .follow-up-table td { border: 1px solid #cbd5e1; padding: 4px 6px; vertical-align: middle; }
  .follow-up-table tr td:first-child { width: 42%; background: #f1f5f9; font-weight: 700; color: #1e293b; }
`;

function getShortTitle(stem) {
  if (!stem) return '';
  return stem
    .replace(/^Describe one feature of (the )?/i, '')
    .replace(/^Explain one way in which /i, '')
    .replace(/^Explain why there was /i, '')
    .replace(
      /^Study Sources A and B\.\s*How useful are Sources A and B for an enquiry into (the )?/i,
      '',
    )
    .slice(0, 32)
    .replace(/[.,]$/, '');
}

async function run() {
  console.log('🚀 Loading Medicine Through Time unit data and specification...');

  const dataModule = await import('../units/edexcel_medicine/data.js');
  const unitData = dataModule.unitData;

  const bookletsDir = path.join(__dirname, '..', 'public', 'units', 'edexcel_medicine', 'booklets');
  const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs', 'edexcel_medicine');
  const rootPdfsDir = path.join(__dirname, '..', 'public', 'pdfs');

  if (!fs.existsSync(bookletsDir)) fs.mkdirSync(bookletsDir, { recursive: true });
  if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

  // Extract Question Banks by Era
  const extractEraQuestions = (filterFn) => {
    const list = [];
    unitData.lessons.filter(filterFn).forEach((l) => {
      (l.quiz || []).forEach((q) => {
        const ans = q.options ? q.options[q.answer] : q.answer;
        list.push({
          q: q.question,
          a: ans,
          source: l.title.split(':')[0],
        });
      });
    });
    return list;
  };

  const wfQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_5'));
  const medQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_1'));
  const renQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_2'));
  const indQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_3'));
  const modQuestions = extractEraQuestions((l) => l.id.startsWith('lesson_4'));

  console.log(`   Western Front (Section A): ${wfQuestions.length} questions`);
  console.log(`   Medieval: ${medQuestions.length} questions`);
  console.log(`   Renaissance: ${renQuestions.length} questions`);
  console.log(`   18th/19th C: ${indQuestions.length} questions`);
  console.log(`   Modern: ${modQuestions.length} questions`);

  // =========================================================================
  // BUILD BOOKLET 1: SECTION A — THE WESTERN FRONT (12 PAGES)
  // =========================================================================
  console.log('\n📄 Compiling 12-Page Mastery Booklet for Section A (Western Front)...');

  const wfQPage1 = wfQuestions.slice(0, 50);
  const wfQPage2 = wfQuestions.slice(50, 100);
  const wfAPage1 = wfQuestions.slice(0, 50);
  const wfAPage2 = wfQuestions.slice(50, 100);

  const sectionAHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Section A: The British Sector of the Western Front, 1914–1918 — Complete Mastery Pack</title>
    <style>${COMMON_CSS}</style>
</head>
<body>

    <!-- ============================================================= -->
    <!-- PAGE 1: FRONT COVER & SECTION A PROGRESS TRACKER              -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <!-- Banner Header -->
            <div style="background: linear-gradient(135deg, #78350f 0%, #1e293b 100%); color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px; margin-bottom: 6px;">
                    <span style="font-size: 7.5pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #fde68a;">Pearson Edexcel GCSE (9–1) History · Paper 1 (1HI0/11)</span>
                    <span style="font-size: 7pt; background: #b45309; padding: 2px 6px; border-radius: 3px; font-weight: 700;">Section A 12-Page Pack</span>
                </div>
                <h1 style="margin: 0; font-size: 13.5pt; font-weight: 800; line-height: 1.2;">The British Sector of the Western Front, 1914–1918</h1>
                <p style="margin: 3px 0 0 0; font-size: 8pt; color: #fef3c7;">The Historic Environment · Injuries, Treatment and the Trenches · Complete Mastery &amp; Source Studio</p>
            </div>

            <!-- Student Metadata Box -->
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt;">
                <div><strong>Pupil Name:</strong> ________________________________</div>
                <div><strong>Class / Set:</strong> ___________</div>
                <div><strong>Target Grade:</strong> [ &nbsp; ]</div>
            </div>

            <!-- The Master Assessment & Progress Tracker (4 Columns, NO RAG) -->
            <div style="border: 1.5px solid #78350f; border-radius: 6px; padding: 6px 8px; background: #fff; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #78350f; padding-bottom: 3px; margin-bottom: 4px;">
                    <strong style="color: #78350f; font-size: 8.5pt; text-transform: uppercase;">📊 Section A Progress &amp; Assessment Tracker (16 Marks Total)</strong>
                    <span style="font-size: 7pt; color: #64748b;">Marked by Teacher or Peer Verified</span>
                </div>

                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 54%;">Assessment Component &amp; Stem Focus</th>
                            <th style="width: 16%; text-align: center;">Format Style</th>
                            <th style="width: 14%; text-align: center;">Max Marks</th>
                            <th style="width: 16%; text-align: center;">Pupil Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #fefce8; font-weight: 700;">
                            <td>🧠 Complete Western Front Knowledge Vault (All 100 Recall Questions)</td>
                            <td style="text-align: center;">Checklist</td>
                            <td style="text-align: center;">/100</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q1(a) Feature 1 (Casualty Clearing Stations)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/2</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q1(b) Feature 2 (Thomas Splint)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/2</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q2(b) 4-Part Follow-Up Grid (Base Hospital Water)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q2(a) Source Utility (Somme CCS vs Base Hospital)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q1(a) &amp; Q1(b) Features (Mobile X-rays &amp; Trench Fever)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q2(b) 4-Part Follow-Up Grid (Gas Casualties)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q2(a) Source Utility (RAMC Logbook &amp; Flanders Mud)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 3 (Simulation):</strong> Full Section A Timed Exam Pitch (Q1a, Q1b, Q2a, Q2b)</td>
                            <td style="text-align: center;">Exam Hall (25m)</td>
                            <td style="text-align: center;">/16</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr style="background: #fef3c7; font-weight: 800; font-size: 7.5pt;">
                            <td colspan="2">TOTAL COMBINED EXAM PRACTICE MARKS:</td>
                            <td style="text-align: center;">/48</td>
                            <td style="text-align: center;">_____ / 48</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display: flex; justify-content: space-between; font-size: 7.2pt; color: #334155; margin-top: 3px; font-weight: 600;">
                    <span>Teacher / Peer Marker: _____________________________________</span>
                    <span>Date: _______________</span>
                    <span>Overall Grade: [ 9 &nbsp; 8 &nbsp; 7 &nbsp; 6 &nbsp; 5 &nbsp; 4 ]</span>
                </div>
            </div>

            <!-- Bottom Box: Fast Facts & Stem Formulas -->
            <div style="border: 1.5px solid #0f766e; background: #f0fdfa; border-radius: 6px; padding: 6px 10px; font-size: 7pt; line-height: 1.35; color: #115e59;">
                <div style="font-weight: 800; color: #0f766e; font-size: 7.5pt; text-transform: uppercase; margin-bottom: 3px; display: flex; justify-content: space-between;">
                    <span>⏱️ Section A Edexcel Exam Fast Facts &amp; Stem Blueprints (16 Marks · ~25 Mins)</span>
                    <span>Option 11 Paper 1 Section A</span>
                </div>
                <div><strong>• Q1(a) &amp; Q1(b) Features (2 Marks each · ~3 mins each):</strong> <em>F-D Formula.</em> State <strong>Feature</strong> in sentence 1 &rarr; support with <strong>1 precise supporting factual detail</strong>. (2 separate questions).</div>
                <div><strong>• Q2(a) Source Utility (8 Marks · ~12 mins):</strong> <em>C-O-P Matrix.</em> Evaluate both sources for <strong>Content</strong> (what it says) &rarr; <strong>Own Contextual Knowledge</strong> &rarr; <strong>Provenance</strong> (Nature, Origin, Purpose / NOP).</div>
                <div><strong>• Q2(b) Follow-Up Investigation (4 Marks · ~7 mins):</strong> <em>4-Step Enquiry.</em> Quote <strong>Detail in Source B</strong> &rarr; Formulate <strong>Targeted Question</strong> &rarr; Name <strong>Specific Historical Source Type</strong> &rarr; Explain <strong>Direct Purpose</strong>.</div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Pearson Edexcel GCSE History</span>
            <span>Western Front Historic Environment Complete Mastery Booklet</span>
            <span>Page 1 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 2: COMPLETE KNOWLEDGE VAULT (PART 1: Q1 TO Q50)          -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>The British Sector of the Western Front, 1914–1918</h1>
                    <p>Complete Knowledge Retrieval Vault · Questions 1 to 50 (Trench Environment, Ill-Health &amp; Wounds)</p>
                </div>
                <span class="header-tag" style="background: #b45309;">Vault Part 1</span>
            </div>

            <div class="quiz-grid">
                ${wfQPage1
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault Questions</span>
            <span>Turn page for Vault Part 2 (Questions 51 to 100)</span>
            <span>Page 2 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 3: COMPLETE KNOWLEDGE VAULT (PART 2: Q51 TO Q100)        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>The British Sector of the Western Front, 1914–1918</h1>
                    <p>Complete Knowledge Retrieval Vault · Questions 51 to 100 (Chain of Evacuation &amp; Medical Advances)</p>
                </div>
                <span class="header-tag" style="background: #b45309;">Vault Part 2</span>
            </div>

            <div class="quiz-grid">
                ${wfQPage2
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 51}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault Questions</span>
            <span>Turn page for Official Mark Scheme Answers</span>
            <span>Page 3 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 4: OFFICIAL MARK SCHEME (PART 1: ANSWERS 1 TO 50)         -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>The British Sector of the Western Front, 1914–1918</h1>
                    <p>Official Mark Scheme &amp; Knowledge Vault Answers · Answers 1 to 50 (Self &amp; Peer Marking Bank)</p>
                </div>
                <span class="header-tag" style="background: #059669;">Mark Scheme 1</span>
            </div>

            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 2px 6px; font-size: 6.8pt; color: #065f46; margin-bottom: 3px; display: flex; justify-content: space-between;">
                <span>💡 <strong>Quick-Marking Bank:</strong> Cover this bank with your hand or a sheet of paper to test yourself against Page 2, or use for rapid peer marking.</span>
                <span>Answers 1–50</span>
            </div>

            <div class="ans-grid">
                ${wfAPage1
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                        <span class="ans-check">[✓][✗]</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Official Mark Scheme</span>
            <span>Score checked items and log on Front Cover Tracker</span>
            <span>Page 4 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 5: OFFICIAL MARK SCHEME (PART 2: ANSWERS 51 TO 100)       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>The British Sector of the Western Front, 1914–1918</h1>
                    <p>Official Mark Scheme &amp; Knowledge Vault Answers · Answers 51 to 100 (Self &amp; Peer Marking Bank)</p>
                </div>
                <span class="header-tag" style="background: #059669;">Mark Scheme 2</span>
            </div>

            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 2px 6px; font-size: 6.8pt; color: #065f46; margin-bottom: 3px; display: flex; justify-content: space-between;">
                <span>💡 <strong>Quick-Marking Bank:</strong> Use for rapid recall checking against Vault Part 2 (Page 3). Log total correct recall items on Page 1.</span>
                <span>Answers 51–100</span>
            </div>

            <div class="ans-grid">
                ${wfAPage2
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 51}.</span>
                        <span class="ans-text">${item.a}</span>
                        <span class="ans-check">[✓][✗]</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Official Mark Scheme</span>
            <span>Round 1 Exam Practice begins on Page 6</span>
            <span>Page 5 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 6: ROUND 1 — STEPPED LADDER: FEATURES & FOLLOW-UP         -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section A: The Historic Environment</h1>
                    <p>Round 1: The Stepped Ladder · Question 1 (Features) &amp; Question 2(b) (Follow-Up Investigation)</p>
                </div>
                <span class="header-tag" style="background: #7c3aed;">Round 1: Stems 1 &amp; 2b</span>
            </div>

            <!-- Q1(a): Feature 1 (2 Marks) -->
            <div class="ladder-zone" style="border-left: 3.5px solid #f59e0b; padding: 4px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 1 (a): Feature Question (2 Marks)</strong>
                    <span style="font-size: 7pt; color: #b45309; font-weight: 700;">F-D Formula · ~3 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    Describe one feature of the work of Casualty Clearing Stations (CCS) on the Western Front.
                </div>
                <div class="ladder-launchpad" style="padding: 3px 6px; margin-bottom: 3px;">
                    <strong>🚀 Level 1 Launchpad:</strong> Starter: <em>"One feature of Casualty Clearing Stations was that..."</em><br>
                    <strong>Facts to Include:</strong> Located 7–12 miles back near railways; triage (walking wounded, urgent surgery, dying); performed critical amputations and chest surgeries before base evacuation.
                </div>
                <div style="padding: 1px 0;">
                    <div class="writing-line starter">One feature of Casualty Clearing Stations was that...</div>
                    <div class="writing-line starter">Specifically, (add one precise historical detail or statistic)...</div>
                    <div class="writing-line"></div>
                </div>
            </div>

            <!-- Q1(b): Feature 2 (2 Marks) -->
            <div class="ladder-zone" style="border-left: 3.5px solid #f59e0b; padding: 4px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 1 (b): Feature Question (2 Marks)</strong>
                    <span style="font-size: 7pt; color: #b45309; font-weight: 700;">F-D Formula · ~3 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    Describe one feature of the use of the Thomas splint on the Western Front.
                </div>
                <div class="ladder-launchpad" style="padding: 3px 6px; margin-bottom: 3px;">
                    <strong>🚀 Level 1 Launchpad:</strong> Starter: <em>"One feature of the Thomas splint was that..."</em><br>
                    <strong>Facts to Include:</strong> Introduced in 1915 by Robert Jones; rigid frame pulled leg straight to stop bone ends grinding; dramatically dropped compound fracture mortality from 80% to 20%.
                </div>
                <div style="padding: 1px 0;">
                    <div class="writing-line starter">One feature of the Thomas splint was that...</div>
                    <div class="writing-line starter">Specifically, (add one precise historical detail or statistic)...</div>
                    <div class="writing-line"></div>
                </div>
            </div>

            <!-- Q2(b): 4-Part Follow-Up Grid (4 Marks) -->
            <div class="ladder-zone" style="border-left: 3.5px solid #0284c7; padding: 4px 8px; margin-bottom: 2px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 2 (b): Follow-Up Investigation Grid (4 Marks)</strong>
                    <span style="font-size: 7pt; color: #0369a1; font-weight: 700;">4-Step Enquiry · ~6 Mins</span>
                </div>
                <div style="font-weight: 700; font-size: 7.8pt; color: #0f172a; margin-bottom: 2px;">
                    Study Source B (Edith Smith letter: <em>"The pipes freeze entirely, meaning we must strictly ration the water provided to the wounded."</em>). How could you follow up Source B to find out more about the severe conditions faced by medical staff? Complete the table below.
                </div>
                
                <table class="follow-up-table">
                    <tr>
                        <td><strong>Detail in Source B that I would follow up:</strong></td>
                        <td style="color: #1e3a8a; font-style: italic;">"The pipes freeze entirely, meaning we must strictly ration the water provided to the wounded."</td>
                    </tr>
                    <tr>
                        <td><strong>Question I would ask:</strong></td>
                        <td><div class="writing-line starter">What specific impact did water shortages have on surgical sterilization and infection rates in winter 1917?</div></td>
                    </tr>
                    <tr>
                        <td><strong>What type of source I would use:</strong></td>
                        <td><div class="writing-line starter">Base Hospital Daily Medical Superintendent Logbooks and Sanitary Inspection Reports (1917–18).</div></td>
                    </tr>
                    <tr>
                        <td><strong>How this source would help me answer my question:</strong></td>
                        <td><div class="writing-line starter">It would provide official daily records of sanitation breakdowns and hospital infection rates during freezing months.</div><div class="writing-line"></div></td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Section A · Turn page for Question 2(a) 8-Mark Source Utility</span>
            <span>Page 6 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 7: ROUND 1 — STEPPED LADDER: 8-MARK SOURCE UTILITY        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section A: The Historic Environment</h1>
                    <p>Round 1: The Stepped Ladder · Question 2(a) 8-Mark Source Utility Masterclass</p>
                </div>
                <span class="header-tag" style="background: #2563eb;">Round 1: Stem 2a</span>
            </div>

            <div class="ladder-zone" style="border-left: 3.5px solid #2563eb; padding: 4px 8px; margin-bottom: 2px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 2 (a): Source Utility (8 Marks)</strong>
                    <span style="font-size: 7pt; color: #1d4ed8; font-weight: 700;">C-O-P Formula · ~12 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    Study Sources A and B. How useful are Sources A and B for an historian studying the immense challenges of treating casualties on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context.
                </div>

                <!-- Sources Display Box -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
                    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #1e3a8a; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Source A (Chaplain Arthur Davies, Somme CCS, July 1916):</strong>
                        <em>"The casualties have started to arrive... The volume of patients is overwhelming; every bed is occupied, and men are fortunate just to find a spot on the bare ground. Many will pass away before surgery is possible. We have admitted 1,500 casualties, and the stream has not stopped."</em>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #1e3a8a; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Source B (Edith Smith, VAD Nurse, Base Hospital, Dec 1917):</strong>
                        <em>"Our morning duties begin at 3.30 am! The freezing temperatures are unbearable. Icicles hang thick over ward windows. Even kettles, rubber hot water bottles, and sponges have frozen solid. The pipes freeze entirely, meaning we must strictly ration water provided to the wounded."</em>
                    </div>
                </div>

                <!-- Mandatory Provenance Clues Scaffolding Box (Per AGENTS.md rule) -->
                <div style="background: #fef3c7; border: 1px solid #fde047; border-radius: 4px; padding: 3px 6px; font-size: 6.7pt; color: #854d0e; margin-bottom: 3px;">
                    <strong>🔍 PROVENANCE CLUES (Author, Audience, Motive):</strong> Who wrote each source (eyewitness chaplain at CCS vs frontline VAD nurse at base hospital)? What was their motive (private diary recording sheer volume vs private letter home detailing physical conditions)? How does their perspective make the sources useful despite subjective emotional focus?
                </div>

                <!-- Writing lines (16 Ruled Lines Total) -->
                <div style="padding: 1px 0;">
                    <div style="font-size: 6.8pt; font-weight: 800; color: #1d4ed8; margin: 1px 0; text-transform: uppercase;">Paragraph 1: Utility of Source A (Content + Provenance + Context)</div>
                    <div class="writing-line starter">Source A is useful for investigating casualty challenges because the content reveals...</div>
                    <div class="writing-line starter">From my own knowledge, this accurately reflects the Somme offensive because...</div>
                    <div class="writing-line starter">Furthermore, the provenance makes it useful because as a private chaplain's diary...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #1d4ed8; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 2: Utility of Source B &amp; Comparative Judgement (Content + Provenance + Context)</div>
                    <div class="writing-line starter">Source B is also useful because it highlights the severe environmental difficulties...</div>
                    <div class="writing-line starter">Specifically, my own knowledge confirms that Base Hospitals in winter 1917...</div>
                    <div class="writing-line starter">The provenance enhances its utility because as a private letter from a VAD nurse...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line starter">Overall, both sources are mutually useful because together they demonstrate...</div>
                    <div class="writing-line"></div>
                </div>

                <!-- Stretch Callout -->
                <div class="ladder-stretch" style="padding: 3px 6px; margin-top: 2px;">
                    <strong>⚡ Level 3 (Grade 9) Utility Glue:</strong> Weigh up typicality vs limitation — note that Source A shows peak crisis conditions on 1 July 1916 (57,000 casualties in one day), while Source B reflects seasonal winter extremes at the coast.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Section A · Round 2 Dual-Track begins on Page 8</span>
            <span>Page 7 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 8: ROUND 2 — SPLIT-COLUMN DUAL TRACK (FEATURES & FOLLOW-UP)-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section A: The Historic Environment</h1>
                    <p>Round 2: The Split-Column Dual Track · Features &amp; Follow-Up Toolkit</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stems 1 &amp; 2b</span>
            </div>

            <!-- Features Dual Track -->
            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.2pt; color: #1e293b;">Questions 1(a) &amp; 1(b): Features (2 + 2 = 4 Marks)</strong>
                    <span style="font-size: 6.8pt; color: #0369a1; font-weight: 700;">Independent Toolkit</span>
                </div>
                <div class="dual-track-container" style="height: 125px;">
                    <div class="toolkit-col">
                        <div>
                            <strong style="color: #0369a1; font-size: 6.8pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">🧰 Fact Vault (AO1)</strong>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <strong>Mobile X-rays:</strong> 6 mobile units in British sector; located at CCS; couldn't detect clothing fragments; tubes overheated.</div>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <strong>Trench Fever:</strong> Caused by body lice; flu-like pain in legs; affected ~15% of men; led to delousing stations and bathhouses.</div>
                        </div>
                        <div style="font-size: 6.2pt; color: #b91c1c; border-top: 1px dashed #f87171; padding-top: 2px;">
                            <strong>⚠️ Trap:</strong> Do not confuse Trench Fever (lice) with Trench Foot (waterlogged mud/cold).
                        </div>
                    </div>
                    <div class="writing-col">
                        <div style="font-size: 6.8pt; font-weight: bold; color: #0f172a;">1(a) Describe one feature of mobile X-ray units near the frontline:</div>
                        <div class="writing-line starter">One feature of mobile X-ray units was...</div>
                        <div class="writing-line"></div>
                        <div style="font-size: 6.8pt; font-weight: bold; color: #0f172a; margin-top: 2px;">1(b) Describe one feature of trench fever:</div>
                        <div class="writing-line starter">One feature of trench fever was...</div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>

            <!-- Follow-Up Dual Track -->
            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 8px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.2pt; color: #1e293b;">Question 2(b): Follow-Up Practice (4 Marks)</strong>
                    <span style="font-size: 6.8pt; color: #0369a1; font-weight: 700;">Historical Records Directory</span>
                </div>
                <div style="font-size: 7.2pt; color: #334155; margin-bottom: 2px;">
                    Study this extract from an RAMC officer at Ypres: <em>"The chlorine gas casualties stumbled in clutching their throats. We washed their blinded eyes with bicarbonate of soda solutions, but many died from asphyxiation."</em>
                </div>
                <table class="follow-up-table">
                    <tr>
                        <td><strong>Detail in Source to follow up:</strong></td>
                        <td><div class="writing-line starter">"We washed their blinded eyes with bicarbonate of soda solutions..."</div></td>
                    </tr>
                    <tr>
                        <td><strong>Question I would ask:</strong></td>
                        <td><div class="writing-line starter">How effective were early chemical antidotes compared to later respirator gas masks?</div></td>
                    </tr>
                    <tr>
                        <td><strong>What type of source I would use:</strong></td>
                        <td><div class="writing-line starter">RAMC Field Ambulance Casualty Admission Books &amp; War Office Gas Defence Bulletins (1915).</div></td>
                    </tr>
                    <tr>
                        <td><strong>How this source would help me:</strong></td>
                        <td><div class="writing-line starter">It would record official medical survival rates of gas victims before and after the issue of Small Box Respirators.</div></td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Section A · Turn page for Question 2(a) Source Utility Masterclass</span>
            <span>Page 8 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 9: ROUND 2 — SPLIT-COLUMN DUAL TRACK (SOURCE UTILITY)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section A: The Historic Environment</h1>
                    <p>Round 2: The Split-Column Dual Track · Question 2(a) Source Utility Masterclass</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stem 2a</span>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 2(a): Source Utility Independent Execution (8 Marks)</strong>
                    <span style="font-size: 7pt; color: #0284c7; font-weight: 700;">Wartime Trauma &amp; Gas Warfare</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    How useful are Source C (RAMC Logbook, 1915) and Source D (Official Training Manual on Trench Foot, 1916) for an enquiry into the prevention of trench illness on the Western Front?
                </div>

                <div class="dual-track-container" style="height: 220mm;">
                    <div class="toolkit-col">
                        <div>
                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">⏱️ Provenance Evaluation Matrix</strong>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Official Reports:</strong> High factual accuracy regarding procedures; may minimize failure to maintain morale.
                            </div>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Doctor/Nurse Accounts:</strong> Direct clinical insight into actual suffering; localized to one specific sector.
                            </div>

                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin: 4px 0 2px 0;">🌉 Causal &amp; Utility Connectives</strong>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <em>"The content is highly useful because it reveals..."</em></div>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <em>"The provenance strengthens its value because..."</em></div>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <em>"However, the source is limited in scope because..."</em></div>
                        </div>

                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 4px; font-size: 6.2pt; color: #1e40af;">
                            <strong>🎯 Level 3 Standard:</strong> Explicitly evaluate how the author's professional role and purpose shape what was included or omitted.
                        </div>
                    </div>

                    <div class="writing-col">
                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase;">Paragraph 1: Utility of Source C</div>
                        <div class="writing-line starter">Source C is useful for an enquiry into prevention because...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Its provenance as an RAMC logbook means...</div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; margin-top: 3px; text-transform: uppercase;">Paragraph 2: Utility of Source D &amp; Synthesis</div>
                        <div class="writing-line starter">Source D is useful in a different way because it shows official policy on...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">However, an official manual may not reflect actual frontline reality because...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Comparing both sources, an historian learns that...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Section A · Round 3 Exam Simulation begins on Page 10</span>
            <span>Page 9 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 10: ROUND 3 — THE PLANNING ENGINE ROOM                   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section A: The Historic Environment</h1>
                    <p>Round 3: The Planning Engine Room · Deconstruction Matrix (Plan here, write on Page 11)</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Round 3: Engine Room</span>
            </div>

            <!-- Pre-Flight Planning Grid for Section A -->
            <div style="margin-bottom: 6px;">
                <strong style="font-size: 7.8pt; color: #991b1b;">1. Question 1 Features Selector:</strong>
                <table class="plan-table">
                    <tr>
                        <th style="width: 30%;">Exam Prompt</th>
                        <th style="width: 35%;">Feature 1 (Core Concept)</th>
                        <th style="width: 35%;">Supporting Specific Fact / Detail (AO1)</th>
                    </tr>
                    <tr>
                        <td>Q1(a) Underground Hospital at Arras</td>
                        <td>Built into chalk quarries; fully equipped</td>
                        <td>700 beds, running water, electricity, operating theatre, mortuary.</td>
                    </tr>
                    <tr>
                        <td>Q1(b) Blood Transfusion at Cambrai</td>
                        <td>First large-scale indirect blood bank (1917)</td>
                        <td>Oswald Robertson used sodium citrate/dextrose; treated 20 severely wounded men.</td>
                    </tr>
                </table>
            </div>

            <div style="margin-bottom: 6px;">
                <strong style="font-size: 7.8pt; color: #991b1b;">2. Question 2(a) Source Utility Planning Grid:</strong>
                <table class="plan-table">
                    <tr>
                        <th style="width: 20%;">Source</th>
                        <th style="width: 40%;">Content Knowledge (What it reveals)</th>
                        <th style="width: 40%;">Provenance Analysis (NOP &amp; Evaluation)</th>
                    </tr>
                    <tr>
                        <td>Source A (Medical)</td>
                        <td>Specific wound types (shrapnel, compound fracture, gangrene)</td>
                        <td>Doctor/nurse eyewitness account; high clinical validity but localized.</td>
                    </tr>
                    <tr>
                        <td>Source B (Soldier)</td>
                        <td>Stretcher bearer delays in mud, shell craters, shell shock</td>
                        <td>Infantry diary; emotional impact; subject to wartime censorship.</td>
                    </tr>
                </table>
            </div>

            <div style="margin-bottom: 6px;">
                <strong style="font-size: 7.8pt; color: #991b1b;">3. Question 2(b) Follow-Up Pre-Flight Selector:</strong>
                <table class="plan-table">
                    <tr>
                        <th style="width: 25%;">Detail to Quote</th>
                        <th style="width: 25%;">Targeted Question</th>
                        <th style="width: 25%;">Authentic Source Type</th>
                        <th style="width: 25%;">How it Answers</th>
                    </tr>
                    <tr>
                        <td>Exact phrase about delays in stretcher evacuation</td>
                        <td>What was the average time taken from RAP to CCS in the Ypres salient?</td>
                        <td>RAMC Field Ambulance Section War Diaries (WO 95)</td>
                        <td>Provides recorded times of stretcher bearer transfers across muddy terrain.</td>
                    </tr>
                </table>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; color: #991b1b;">
                <strong>📋 PRE-FLIGHT AUDIT CHECKLIST:</strong> &nbsp;
                [ ] Did I state TWO separate features for Q1? &nbsp;&nbsp;
                [ ] Did I analyze BOTH content and provenance for Sources A &amp; B? &nbsp;&nbsp;
                [ ] Is my Q2(b) source a specific historical record (not 'the internet')?
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 3 Engine Room</span>
            <span>Section A · Execute continuous prose on Page 11</span>
            <span>Page 10 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: ROUND 3 — THE EXAM PITCH (SECTION A EXAM SIMULATION) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section A: The Historic Environment</h1>
                    <p>Round 3: The Exam Pitch · Authentic Edexcel Section A Simulation (16 Marks · 25 Mins)</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Timed Exam Pitch</span>
            </div>

            <div style="background: #f1f5f9; border: 1.5px solid #475569; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; margin-bottom: 6px; display: flex; justify-content: space-between;">
                <div><strong>AO1 Knowledge:</strong> Precise names, locations (Ypres, Somme, Cambrai), equipment, and dates.</div>
                <div><strong>AO3 Sources:</strong> Balanced analysis of utility using content, contextual knowledge, and provenance.</div>
            </div>

            <!-- Continuous Exam Lines for Section A -->
            <div style="padding: 0;">
                <div class="writing-line starter"><strong>Question 1(a) (2 Marks):</strong> Describe one feature of the underground hospital at Arras: ______________________</div>
                <div class="writing-line"></div>
                <div class="writing-line starter" style="margin-top: 3px;"><strong>Question 1(b) (2 Marks):</strong> Describe one feature of blood transfusion techniques on the Western Front: _________</div>
                <div class="writing-line"></div>
                
                <div class="writing-line starter" style="margin-top: 3px;"><strong>Question 2(a) (8 Marks):</strong> Source A is useful because _____________________________________________________</div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line starter">Source B is also useful because ____________________________________________________________________</div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>

                <div style="font-size: 7.2pt; font-weight: bold; color: #0f172a; margin-top: 4px;">Question 2(b) (4 Marks): Complete the follow-up investigation table below:</div>
                <table class="follow-up-table" style="margin-top: 2px;">
                    <tr>
                        <td><strong>Detail in Source B to follow up:</strong></td>
                        <td><div class="writing-line"></div></td>
                    </tr>
                    <tr>
                        <td><strong>Question I would ask:</strong></td>
                        <td><div class="writing-line"></div></td>
                    </tr>
                    <tr>
                        <td><strong>What type of source I would use:</strong></td>
                        <td><div class="writing-line"></div></td>
                    </tr>
                    <tr>
                        <td><strong>How this source would help me:</strong></td>
                        <td><div class="writing-line"></div></td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Authentic Exam Pitch</span>
            <span>Section A · Turn page for 100% Spec Coverage Bank</span>
            <span>Page 11 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 12: BACK COVER — 100% SPEC PRACTICE BANK & TRAPS         -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <!-- Header Banner -->
            <div style="background: #0f172a; color: white; padding: 8px 12px; border-radius: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="margin: 0; font-size: 10pt; font-weight: 800; text-transform: uppercase;">⚠️ Examiner Trap Doors &amp; 100% Specification Bank</h2>
                    <p style="margin: 1px 0 0 0; font-size: 7pt; color: #94a3b8;">Section A: The British Sector of the Western Front · Pearson Edexcel GCSE History</p>
                </div>
                <span style="background: #ef4444; color: white; font-size: 6.8pt; font-weight: 800; padding: 2px 6px; border-radius: 3px;">100% Spec Guarantee</span>
            </div>

            <!-- Top Section: Trap Doors -->
            <div style="border: 1.5px solid #ef4444; background: #fef2f2; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px;">
                <strong style="color: #b91c1c; font-size: 7.5pt; text-transform: uppercase; display: block; border-bottom: 1px solid #fecaca; padding-bottom: 2px; margin-bottom: 3px;">
                    🚫 Top 3 Fatal Examiner Traps to Avoid for Section A
                </strong>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
                    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 4px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• The "Generic Source" Trap</strong>
                        <span style="color: #7f1d1d;">Never write "I would check a diary" or "the internet" in Q2(b). You must specify an authentic record type, like RAMC War Diaries or Hospital Admission Registers.</span>
                    </div>
                    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 4px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• The "Treachery of Bias" Trap</strong>
                        <span style="color: #7f1d1d;">Never reject a source simply because "it is biased so it's useless". Sources written with strong emotion or wartime censorship are highly useful for showing attitudes!</span>
                    </div>
                    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 4px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• The Single Feature Trap</strong>
                        <span style="color: #7f1d1d;">Remember Q1 is split into two questions: 1(a) and 1(b). Do not combine them into one paragraph. Each requires one identified feature + one specific factual detail.</span>
                    </div>
                </div>
            </div>

            <!-- Middle Section: 100% Specification Coverage Bank -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px; background: #fff; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 4px;">
                    <strong style="color: #1e3a8a; font-size: 7.8pt; text-transform: uppercase;">📚 Specification Practice Bank: 100% Curriculum Coverage</strong>
                    <span style="font-size: 6.5pt; color: #64748b;">Every remaining Western Front specification bullet point tested below</span>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 3px;">
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>1. Features (2m):</strong> Describe one feature of the role of the FANY (First Aid Nursing Yeomanry) in ambulance transport.
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>2. Features (2m):</strong> Describe one feature of the effects of mustard gas on soldiers.
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>3. Source Utility (8m):</strong> How useful are official trench casualty statistics compared to private letters for studying the effectiveness of Brodie helmets?
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>4. Features (2m):</strong> Describe one feature of the Carrel-Dakin method for treating gas gangrene.
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>5. Follow-Up (4m):</strong> Detail: <em>"Ambulance barges along the Somme-Yser canal were fitted with spring beds."</em> Formulate a question and name a primary source.
                    </div>
                </div>
            </div>

            <!-- Follow-up Quick Drill Box -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; color: #166534;">
                <strong>⚡ QUICK-FIRE FOLLOW-UP SOURCE DRILL:</strong> When asked to research:
                (1) <em>Wound infections</em> &rarr; RAMC Medical Officer Daily Logs;
                (2) <em>Frontline delousing routines</em> &rarr; Battalion War Diaries;
                (3) <em>Blood transfusions</em> &rarr; CCS Surgical Register.
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · 100% Specification Bank</span>
            <span>Section A Complete · Score checked items on Page 1</span>
            <span>Page 12 of 12</span>
        </div>
    </div>
</body>
</html>`;

  const sectionAPath = path.join(bookletsDir, 'med_mastery_section_a.html');
  fs.writeFileSync(sectionAPath, sectionAHtml, 'utf8');
  console.log(`   ✅ Saved Section A HTML: med_mastery_section_a.html (12 Pages)`);

  // =========================================================================
  // BUILD BOOKLET 2: SECTION B — MEDICINE c1250–PRESENT (24 PAGES)
  // =========================================================================
  console.log(
    '\n📄 Compiling 24-Page Thematic Mastery Booklet for Section B (Medicine c1250–present)...',
  );

  const sectionBHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Section B: Medicine in Britain, c1250–present — Complete Thematic Mastery Pack</title>
    <style>${COMMON_CSS}</style>
</head>
<body>

    <!-- ============================================================= -->
    <!-- PAGE 1: FRONT COVER & SECTION B PROGRESS TRACKER              -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <!-- Banner Header -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 4px; margin-bottom: 6px;">
                    <span style="font-size: 7.5pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #93c5fd;">Pearson Edexcel GCSE (9–1) History · Paper 1 (1HI0/11)</span>
                    <span style="font-size: 7pt; background: #3b82f6; padding: 2px 6px; border-radius: 3px; font-weight: 700;">Section B 24-Page Thematic Master</span>
                </div>
                <h1 style="margin: 0; font-size: 14pt; font-weight: 800; line-height: 1.2;">Medicine in Britain, c1250–present</h1>
                <p style="margin: 3px 0 0 0; font-size: 8pt; color: #cbd5e1;">Thematic Study across 750 Years · Medieval, Renaissance, 18th/19th Century &amp; Modern Eras</p>
            </div>

            <!-- Student Metadata Box -->
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 6px 10px; margin-bottom: 8px; font-size: 8pt;">
                <div><strong>Pupil Name:</strong> ________________________________</div>
                <div><strong>Class / Set:</strong> ___________</div>
                <div><strong>Target Grade:</strong> [ &nbsp; ]</div>
            </div>

            <!-- The Master Assessment & Progress Tracker (4 Columns, NO RAG) -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 6px 8px; background: #fff; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 4px;">
                    <strong style="color: #1e3a8a; font-size: 8.5pt; text-transform: uppercase;">📊 Section B Progress &amp; Assessment Tracker (36+4 Marks Total)</strong>
                    <span style="font-size: 7pt; color: #64748b;">Marked by Teacher or Peer Verified</span>
                </div>

                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 54%;">Assessment Component &amp; Stem Focus</th>
                            <th style="width: 16%; text-align: center;">Format Style</th>
                            <th style="width: 14%; text-align: center;">Max Marks</th>
                            <th style="width: 16%; text-align: center;">Pupil Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #f1f5f9; font-weight: 700;">
                            <td>🧠 Complete 4-Era Knowledge Vault (All 280 Recall Questions)</td>
                            <td style="text-align: center;">Checklist</td>
                            <td style="text-align: center;">/280</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q3 Similarity / Difference (Medieval vs Renaissance)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q4 Explain Why (Surgical Progress c1700–c1900)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/12</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q5/Q6 Statement Essay (Germ Theory vs Public Health)</td>
                            <td style="text-align: center;">Stepped Ladder</td>
                            <td style="text-align: center;">/16+4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q3 Similarity / Difference (Great Plague vs Black Death)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q4 Explain Why (Penicillin Mass Production c1938–45)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/12</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q5/Q6 Statement Essay (Four Humours c1250–c1700)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/16+4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr>
                            <td><strong>Round 3 (Simulation):</strong> Section B Full Exam Hall Simulation (Q3, Q4, Q5/6)</td>
                            <td style="text-align: center;">Exam Pitch (55m)</td>
                            <td style="text-align: center;">/36+4</td>
                            <td style="text-align: center;">_____</td>
                        </tr>
                        <tr style="background: #e0e7ff; font-weight: 800; font-size: 7.5pt;">
                            <td colspan="2">TOTAL COMBINED EXAM PRACTICE MARKS:</td>
                            <td style="text-align: center;">/104</td>
                            <td style="text-align: center;">_____ / 104</td>
                        </tr>
                    </tbody>
                </table>
                <div style="display: flex; justify-content: space-between; font-size: 7.2pt; color: #334155; margin-top: 3px; font-weight: 600;">
                    <span>Teacher / Peer Marker: _____________________________________</span>
                    <span>Date: _______________</span>
                    <span>Overall Grade: [ 9 &nbsp; 8 &nbsp; 7 &nbsp; 6 &nbsp; 5 &nbsp; 4 ]</span>
                </div>
            </div>

            <!-- Bottom Box: Fast Facts & Stem Formulas -->
            <div style="border: 1.5px solid #0f766e; background: #f0fdfa; border-radius: 6px; padding: 6px 10px; font-size: 7pt; line-height: 1.35; color: #115e59;">
                <div style="font-weight: 800; color: #0f766e; font-size: 7.5pt; text-transform: uppercase; margin-bottom: 3px; display: flex; justify-content: space-between;">
                    <span>⏱️ Section B Edexcel Exam Fast Facts &amp; Stem Blueprints (36+4 Marks · ~55 Mins)</span>
                    <span>Option 11 Paper 1 Section B</span>
                </div>
                <div><strong>• Q3 Similarity / Difference (4 Marks · ~6 mins):</strong> <em>P-F-C Formula.</em> State core <strong>Point of Comparison</strong> in sentence 1 &rarr; support with <strong>specific evidence from Period 1</strong> &rarr; support with <strong>specific evidence from Period 2</strong> &rarr; explain significance.</div>
                <div><strong>• Q4 Explain Why (12 Marks · ~18 mins):</strong> <em>3 P-E-E Paragraphs.</em> <strong>Point</strong> clearly linking to the question &rarr; <strong>Evidence</strong> deploying precise facts/names/dates &rarr; <strong>Explanation</strong> tracing the direct causal link. (Must use both stimulus points + own knowledge).</div>
                <div><strong>• Q5/Q6 Either/Or Statement Essay (16 Marks + 4 SPaG · ~30 mins):</strong> <em>Balanced Evaluation.</em> Point 1 (Agree with statement) &rarr; Point 2 (Counter-factor/Disagree) &rarr; Point 3 (Alternative factor) &rarr; <strong>Criteria-Led Conclusion</strong> explaining *why* one factor was more significant.</div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Pearson Edexcel GCSE History</span>
            <span>Section B Thematic Study Master Booklet (c1250–present)</span>
            <span>Page 1 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 2–3: MEDIEVAL KNOWLEDGE VAULT (c1250–c1500)             -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 1: Medicine in Medieval Britain, c1250–c1500</h1>
                    <p>Knowledge Retrieval Vault · Part 1: Questions 1 to 40 (Causes of Illness &amp; Religious Beliefs)</p>
                </div>
                <span class="header-tag">Medieval Vault 1</span>
            </div>
            <div class="quiz-grid">
                ${medQuestions
                  .slice(0, 40)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for Medieval Vault Part 2</span>
            <span>Page 2 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 1: Medicine in Medieval Britain, c1250–c1500</h1>
                    <p>Knowledge Retrieval Vault · Part 2: Questions 41 to 80 (Treatments, Care &amp; The Black Death)</p>
                </div>
                <span class="header-tag">Medieval Vault 2</span>
            </div>
            <div class="quiz-grid">
                ${medQuestions
                  .slice(40, 80)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 41}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for Renaissance Knowledge Vault</span>
            <span>Page 3 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 4–5: RENAISSANCE KNOWLEDGE VAULT (c1500–c1700)          -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 2: The Medical Renaissance in Britain, c1500–c1700</h1>
                    <p>Knowledge Retrieval Vault · Part 1: Questions 1 to 30 (Ideas, Printing Press &amp; Sydenham)</p>
                </div>
                <span class="header-tag">Renaissance Vault 1</span>
            </div>
            <div class="quiz-grid">
                ${renQuestions
                  .slice(0, 30)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for Renaissance Vault Part 2</span>
            <span>Page 4 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 2: The Medical Renaissance in Britain, c1500–c1700</h1>
                    <p>Knowledge Retrieval Vault · Part 2: Questions 31 to 60 (Vesalius, Harvey &amp; The Great Plague 1665)</p>
                </div>
                <span class="header-tag">Renaissance Vault 2</span>
            </div>
            <div class="quiz-grid">
                ${renQuestions
                  .slice(30, 60)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 31}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for 18th &amp; 19th Century Knowledge Vault</span>
            <span>Page 5 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 6–7: 18th & 19th CENTURY KNOWLEDGE VAULT (c1700–c1900)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 3: Medicine in 18th &amp; 19th-Century Britain, c1700–c1900</h1>
                    <p>Knowledge Retrieval Vault · Part 1: Questions 1 to 30 (Germ Theory, Pasteur, Koch &amp; Surgery)</p>
                </div>
                <span class="header-tag">18th/19th Vault 1</span>
            </div>
            <div class="quiz-grid">
                ${indQuestions
                  .slice(0, 30)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for 18th &amp; 19th Century Vault Part 2</span>
            <span>Page 6 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 3: Medicine in 18th &amp; 19th-Century Britain, c1700–c1900</h1>
                    <p>Knowledge Retrieval Vault · Part 2: Questions 31 to 60 (Nightingale, Jenner, Snow &amp; 1875 Act)</p>
                </div>
                <span class="header-tag">18th/19th Vault 2</span>
            </div>
            <div class="quiz-grid">
                ${indQuestions
                  .slice(30, 60)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 31}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for Modern Medicine Knowledge Vault</span>
            <span>Page 7 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 8–9: MODERN MEDICINE KNOWLEDGE VAULT (c1900–PRESENT)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 4: Medicine in Modern Britain, c1900–present</h1>
                    <p>Knowledge Retrieval Vault · Part 1: Questions 1 to 40 (Genetics, DNA, Diagnosis &amp; Magic Bullets)</p>
                </div>
                <span class="header-tag">Modern Vault 1</span>
            </div>
            <div class="quiz-grid">
                ${modQuestions
                  .slice(0, 40)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for Modern Vault Part 2</span>
            <span>Page 8 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Unit 4: Medicine in Modern Britain, c1900–present</h1>
                    <p>Knowledge Retrieval Vault · Part 2: Questions 41 to 80 (Penicillin, NHS 1948 &amp; Lung Cancer)</p>
                </div>
                <span class="header-tag">Modern Vault 2</span>
            </div>
            <div class="quiz-grid">
                ${modQuestions
                  .slice(40, 80)
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 41}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault</span>
            <span>Turn page for Official Mark Scheme Answers</span>
            <span>Page 9 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 10–11: MARK SCHEMES — MEDIEVAL & RENAISSANCE            -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Official Mark Scheme</h1>
                    <p>Answers-Only Bank: Medieval (Answers 1–80) · Quick-Marking Centerfold</p>
                </div>
                <span class="header-tag" style="background: #059669;">Medieval Answers</span>
            </div>
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 2px 6px; font-size: 6.8pt; color: #065f46; margin-bottom: 4px;">
                💡 <strong>Quick-Marking Bank:</strong> Cover with your hand or exercise book to test your recall against Pages 2–3.
            </div>
            <div class="ans-grid dense-3col">
                ${medQuestions
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                        <span class="ans-check">[✓][✗]</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Mark Scheme</span>
            <span>Score checked items on Front Cover Tracker</span>
            <span>Page 10 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Official Mark Scheme</h1>
                    <p>Answers-Only Bank: Renaissance (Answers 1–60) · Quick-Marking Centerfold</p>
                </div>
                <span class="header-tag" style="background: #059669;">Renaissance Answers</span>
            </div>
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 2px 6px; font-size: 6.8pt; color: #065f46; margin-bottom: 4px;">
                💡 <strong>Quick-Marking Bank:</strong> Score checked items and verify your factual understanding of Harvey, Vesalius and Sydenham.
            </div>
            <div class="ans-grid dense-3col">
                ${renQuestions
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                        <span class="ans-check">[✓][✗]</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Mark Scheme</span>
            <span>Turn page for 18th/19th Century &amp; Modern Answers</span>
            <span>Page 11 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 12–13: MARK SCHEMES — 18th/19th C & MODERN              -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Official Mark Scheme</h1>
                    <p>Answers-Only Bank: 18th &amp; 19th Century (Answers 1–60)</p>
                </div>
                <span class="header-tag" style="background: #059669;">18th/19th Answers</span>
            </div>
            <div class="ans-grid dense-3col">
                ${indQuestions
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                        <span class="ans-check">[✓][✗]</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Mark Scheme</span>
            <span>Turn page for Modern Medicine Answers</span>
            <span>Page 12 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Official Mark Scheme</h1>
                    <p>Answers-Only Bank: Modern Medicine (Answers 1–80)</p>
                </div>
                <span class="header-tag" style="background: #059669;">Modern Answers</span>
            </div>
            <div class="ans-grid dense-3col">
                ${modQuestions
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                        <span class="ans-check">[✓][✗]</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="page-footer">
            <span>Mr Lovett's History Hub · Mark Scheme</span>
            <span>Section B Exam Practice begins on Page 14</span>
            <span>Page 13 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 14: ROUND 1 — STEPPED LADDER: Q3 SIMILARITY & DIFFERENCE  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 1: The Stepped Ladder · Question 3: Similarity &amp; Difference Masterclass (4 Marks)</p>
                </div>
                <span class="header-tag" style="background: #7c3aed;">Round 1: Stem 3</span>
            </div>

            <div class="ladder-zone" style="border-left: 3.5px solid #f59e0b; padding: 6px 10px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.8pt; color: #1e293b;">Question 3: Similarity &amp; Difference Across Eras (4 Marks)</strong>
                    <span style="font-size: 7pt; color: #b45309; font-weight: 700;">P-F-C Formula · ~6 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.5pt; color: #0f172a; margin-bottom: 4px;">
                    Explain one way in which ideas about the cause of illness in the Medieval period (c1250–c1500) were similar to ideas about the cause of illness in the Renaissance period (c1500–c1700).
                </div>

                <div class="ladder-launchpad" style="padding: 4px 8px; margin-bottom: 4px;">
                    <strong>🚀 Level 1 Launchpad:</strong> Starter: <em>"One way in which ideas about the cause of illness were similar was the continuing belief in..."</em><br>
                    <strong>Facts to Include:</strong> Persistence of miasma (bad air) and the Four Humours; despite Harvey and Vesalius disproving Galen on anatomy, ordinary physicians in 1665 still blamed the Great Plague on miasma and humours, just as in 1348.
                </div>

                <!-- Writing lines (6 Ruled Lines) -->
                <div style="padding: 2px 0;">
                    <div class="writing-line starter">One way in which ideas about the cause of illness were similar across both eras was...</div>
                    <div class="writing-line starter">In the Medieval period, people believed that...</div>
                    <div class="writing-line starter">Similarly, in the Renaissance period, (provide precise evidence from the 1665 Great Plague)...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line starter">This shows a strong continuity in medical thinking because...</div>
                    <div class="writing-line"></div>
                </div>

                <div class="ladder-stretch" style="padding: 4px 8px; margin-top: 4px;">
                    <strong>⚡ Level 2 (Grade 9) Comparison Rule:</strong> You must explicitly refer to BOTH periods with equal factual depth. Do not spend all your time describing the Medieval period and leave the Renaissance to a single sentence!
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Section B · Turn page for Question 4 (Explain Why)</span>
            <span>Page 14 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 15: ROUND 1 — STEPPED LADDER: Q4 EXPLAIN WHY (12 MARKS)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 1: The Stepped Ladder · Question 4: Causal Explanation Masterclass (12 Marks)</p>
                </div>
                <span class="header-tag" style="background: #7c3aed;">Round 1: Stem 4</span>
            </div>

            <div class="ladder-zone" style="border-left: 3.5px solid #8b5cf6; padding: 6px 10px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.8pt; color: #1e293b;">Question 4: Causal Explanation (12 Marks)</strong>
                    <span style="font-size: 7pt; color: #6d28d9; font-weight: 700;">3 P-E-E Paragraphs · ~18 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.5pt; color: #0f172a; margin-bottom: 3px;">
                    Explain why there was rapid progress in surgical techniques in the period c1700–c1900.
                </div>
                <div style="font-size: 7.2pt; color: #475569; margin-bottom: 3px;">
                    You may use the following in your answer: &nbsp; 
                    <strong>• James Simpson and chloroform</strong> &nbsp;&nbsp; 
                    <strong>• Joseph Lister and carbolic acid</strong> &nbsp;&nbsp; 
                    <em>(You must also use information of your own.)</em>
                </div>

                <div class="ladder-launchpad" style="padding: 4px 8px; margin-bottom: 4px;">
                    <strong>🚀 Level 1 Launchpad:</strong> Paragraph 1: Anaesthetics (Simpson 1847) solved pain; Paragraph 2: Antiseptics (Lister 1867) solved infection; Paragraph 3 (Own Knowledge): Aseptic surgery (sterilization, rubber gloves) and ligatures solved blood loss.
                </div>

                <!-- Writing lines (14 Ruled Lines Total) -->
                <div style="padding: 1px 0;">
                    <div style="font-size: 6.8pt; font-weight: 800; color: #6d28d9; margin: 1px 0; text-transform: uppercase;">Paragraph 1: Stimulus Factor 1 — The Conquest of Pain (Simpson &amp; Chloroform)</div>
                    <div class="writing-line starter">One major reason for surgical progress was the overcoming of pain through anaesthetics...</div>
                    <div class="writing-line starter">In 1847, James Simpson discovered that chloroform...</div>
                    <div class="writing-line starter">This transformed surgery because doctors could perform deeper, more complex operations...</div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #6d28d9; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 2: Stimulus Factor 2 — The Conquest of Infection (Lister &amp; Carbolic Acid)</div>
                    <div class="writing-line starter">A second critical factor was the reduction of post-operative infection...</div>
                    <div class="writing-line starter">Inspired by Pasteur's Germ Theory, Joseph Lister used carbolic acid in 1867 to...</div>
                    <div class="writing-line starter">Consequently, mortality rates in his surgical wards plummeted from...</div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #6d28d9; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 3: Own Knowledge Factor — Aseptic Surgery &amp; Ligatures</div>
                    <div class="writing-line starter">Furthermore, surgery advanced beyond antiseptics through the development of aseptic surgery...</div>
                    <div class="writing-line starter">For example, (detail steam sterilization, Halsted's rubber gloves, or surgical catgut)...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                </div>

                <div class="ladder-stretch" style="padding: 4px 8px; margin-top: 3px;">
                    <strong>⚡ Level 3 (Grade 9) Analytical Glue:</strong> Explain how Simpson's discovery initially led to the 'Black Period' of surgery (higher infection from operating deeper) *until* Lister's antiseptics solved the sepsis crisis!
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Section B · Turn page for Questions 5/6 (Statement Essay)</span>
            <span>Page 15 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 16–17: ROUND 1 — STEPPED LADDER: Q5/Q6 ESSAY (16+4m)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 1: The Stepped Ladder · Questions 5/6: Judgement Essay Framing (16+4 Marks)</p>
                </div>
                <span class="header-tag" style="background: #7c3aed;">Round 1: Stem 5/6 Part 1</span>
            </div>

            <div class="ladder-zone" style="border-left: 3.5px solid #dc2626; padding: 6px 10px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.8pt; color: #1e293b;">Question 5 / 6: Either/Or Statement Essay (16 Marks + 4 SPaG)</strong>
                    <span style="font-size: 7pt; color: #dc2626; font-weight: 700;">Balanced Evaluation · ~30 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.5pt; color: #0f172a; margin-bottom: 3px;">
                    "Louis Pasteur’s Germ Theory was the most significant turning point in the prevention of disease between c1700 and the present."<br>
                    How far do you agree with this statement? Explain your answer.
                </div>
                <div style="font-size: 7.2pt; color: #475569; margin-bottom: 4px;">
                    You may use the following in your answer: &nbsp; 
                    <strong>• The 1875 Public Health Act</strong> &nbsp;&nbsp; 
                    <strong>• Fleming, Florey and Chain's development of penicillin</strong> &nbsp;&nbsp; 
                    <em>(You must also use information of your own.)</em>
                </div>

                <!-- Essay Factor Framing Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 4px;">
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 6px; font-size: 6.7pt;">
                        <strong style="color: #166534; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Side A: Agree (Pasteur &amp; Koch)</strong>
                        <span>Disproved spontaneous generation; proved specific microbes cause specific diseases; unlocked scientific vaccines (rabies, anthrax) and modern hygiene.</span>
                    </div>
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 4px 6px; font-size: 6.7pt;">
                        <strong style="color: #1e40af; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Side B: Government Action</strong>
                        <span>1875 Public Health Act made sanitation compulsory; clean water, sewers, and rubbish disposal saved far more working-class lives than laboratory science alone.</span>
                    </div>
                    <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: 4px; padding: 4px 6px; font-size: 6.7pt;">
                        <strong style="color: #86198f; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Side C: Modern Breakthroughs</strong>
                        <span>Penicillin (1941) provided the first cure for internal bacteria; modern lifestyle campaigns (anti-smoking) and DNA (1953) target non-infectious causes.</span>
                    </div>
                </div>

                <!-- Paragraph 1 Writing lines -->
                <div style="padding: 1px 0;">
                    <div style="font-size: 6.8pt; font-weight: 800; color: #dc2626; margin: 1px 0; text-transform: uppercase;">Introduction &amp; Paragraph 1: Agree with Named Factor (Pasteur's Germ Theory)</div>
                    <div class="writing-line starter">To a significant extent, I agree that Louis Pasteur's Germ Theory was a profound turning point...</div>
                    <div class="writing-line starter">Prior to 1861, doctors believed in spontaneous generation, which meant...</div>
                    <div class="writing-line starter">By proving in his swan-neck flask experiments that germs caused decay, Pasteur enabled Robert Koch to...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line starter">Consequently, this transformed prevention by allowing scientists to develop targeted vaccines for...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Section B · Turn page for Essay Paragraphs 2, 3 &amp; Judgement</span>
            <span>Page 16 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 1: The Stepped Ladder · Questions 5/6: Judgement Essay Execution (Page 2)</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Round 1: Stem 5/6 Part 2</span>
            </div>

            <div class="ladder-zone" style="border-left: 3.5px solid #dc2626; padding: 6px 10px; margin-bottom: 4px;">
                <!-- Paragraph 2 & 3 Lines -->
                <div style="padding: 1px 0;">
                    <div style="font-size: 6.8pt; font-weight: 800; color: #dc2626; margin: 1px 0; text-transform: uppercase;">Paragraph 2: Counter-Factor — Government Action &amp; Public Health</div>
                    <div class="writing-line starter">However, it can be strongly argued that the 1875 Public Health Act was a greater practical turning point...</div>
                    <div class="writing-line starter">While Pasteur understood the cause in a laboratory, ordinary people were dying from filthy urban conditions...</div>
                    <div class="writing-line starter">By abandoning laissez-faire and legally forcing local councils to provide clean water and sewers...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line starter">Consequently, this administrative intervention saved millions from water-borne epidemics like cholera...</div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #dc2626; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 3: Modern Era &amp; Other Factors (Penicillin / DNA / Prevention)</div>
                    <div class="writing-line starter">Furthermore, in the 20th century, the nature of disease prevention shifted towards...</div>
                    <div class="writing-line starter">For example, while Fleming, Florey, and Chain's penicillin provided an unprecedented cure...</div>
                    <div class="writing-line starter">Modern prevention has increasingly focused on lifestyle campaigns and genetic understanding (DNA)...</div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #dc2626; margin: 3px 0 1px 0; text-transform: uppercase;">Conclusion: Criteria-Led Judgement (Why One Factor Was Decisive)</div>
                    <div class="writing-line starter">In conclusion, while Pasteur's Germ Theory provided the indispensable scientific foundation for understanding disease...</div>
                    <div class="writing-line starter">The true turning point in national disease prevention was government public health intervention because...</div>
                    <div class="writing-line"></div>
                </div>

                <div class="ladder-stretch" style="padding: 4px 8px; margin-top: 3px;">
                    <strong>⚡ SPaG Checklist (+4 Marks):</strong> [ ] Accurate spelling of key terms (Pasteur, bacterium/bacteria, antiseptic, laissez-faire); [ ] Sustained analytical tone throughout.
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Section B · Round 2 Dual Track begins on Page 18</span>
            <span>Page 17 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGES 18–21: ROUND 2 — SPLIT-COLUMN DUAL TRACK (Q3, Q4, Q5)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 2: The Split-Column Dual Track · Question 3 Similarity &amp; Difference Toolkit</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stem 3</span>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 3: Similarity &amp; Difference Practice (4 Marks)</strong>
                    <span style="font-size: 7pt; color: #0284c7; font-weight: 700;">Cross-Period Comparative Matrix</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    Explain one way in which the government's response to the Great Plague (1665) was different to the response to the Black Death (1348).
                </div>

                <div class="dual-track-container" style="height: 220mm;">
                    <div class="toolkit-col">
                        <div>
                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">⏱️ Comparative Fact Vault (AO1)</strong>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">1348 Black Death:</strong> Government action was minimal; King Edward III ordered street cleaning; local authorities were powerless; relied on church prayers.
                            </div>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">1665 Great Plague:</strong> Mayor of London enforced strict quarantine; searchers identified infected; red crosses painted on doors; watchmen guarded houses; mass graves.
                            </div>

                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin: 4px 0 2px 0;">🌉 Difference Connectives</strong>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <em>"In contrast to 1348, authorities in 1665..."</em></div>
                            <div style="font-size: 6.2pt; margin-bottom: 2px;">• <em>"While medieval response was largely fatalistic, Renaissance response..."</em></div>
                        </div>

                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 4px; font-size: 6.2pt; color: #1e40af;">
                            <strong>🎯 Level 2 Standard:</strong> Focus strictly on GOVERNMENT/AUTHORITY action in both periods.
                        </div>
                    </div>

                    <div class="writing-col">
                        <div class="writing-line starter">One way in which the government's response was different was the degree of organized quarantine...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">In 1348, during the Black Death, authorities took very little organized action because...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">In contrast, during the Great Plague of 1665, the Mayor of London enforced strict regulations such as...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">This shows that by 1665, authorities took a far more active, systematic approach to containment...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Section B · Turn page for Question 4 Dual Track</span>
            <span>Page 18 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 2: The Split-Column Dual Track · Question 4 Causal Explanation Toolkit</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stem 4</span>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 4: Causal Explanation Practice (12 Marks)</strong>
                    <span style="font-size: 7pt; color: #0284c7; font-weight: 700;">Penicillin Breakthrough</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    Explain why there was rapid progress in the development and mass production of penicillin in the years c1938–c1945.
                </div>
                <div style="font-size: 7.2pt; color: #475569; margin-bottom: 3px;">
                    Stimulus: <strong>• Howard Florey and Ernst Chain</strong> &nbsp;&nbsp; <strong>• US Government funding and the Second World War</strong>
                </div>

                <div class="dual-track-container" style="height: 220mm;">
                    <div class="toolkit-col">
                        <div>
                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">⏱️ Causal Factor Vault (AO1)</strong>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Florey &amp; Chain (1938–41):</strong> Purified Fleming's 1928 mould; tested on 8 mice (1940); human trial on Albert Alexander (1941) proved it killed infection in blood.
                            </div>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">US War Funding (1941–44):</strong> British factories made bombs; US government funded deep fermentation tanks; enough penicillin to treat all Allied D-Day wounded (June 1944).
                            </div>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Own Knowledge:</strong> Cantaloupe melon mould strain found in Peoria, Illinois; corn steep liquor boosted yield 20x.
                            </div>
                        </div>

                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 4px; font-size: 6.2pt; color: #1e40af;">
                            <strong>🎯 Level 3 Standard:</strong> Explicitly show how the pressure of WAR overcame the financial and industrial barriers to mass production.
                        </div>
                    </div>

                    <div class="writing-col">
                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase;">Para 1: Florey &amp; Chain's Scientific Breakthrough</div>
                        <div class="writing-line starter">The primary scientific catalyst for progress was the biochemical work of Florey and Chain...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">This was critical because while Fleming discovered penicillin accidentally in 1928...</div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; margin-top: 3px; text-transform: uppercase;">Para 2: Second World War &amp; US State Intervention</div>
                        <div class="writing-line starter">However, scientific discovery could not achieve mass production without wartime urgency...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Recognizing its battlefield value, the US government poured millions of dollars into...</div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; margin-top: 3px; text-transform: uppercase;">Para 3: Industrial Technology &amp; Agricultural Breakthroughs</div>
                        <div class="writing-line starter">Furthermore, mass production was unlocked by industrial innovations such as...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Section B · Turn page for Questions 5/6 Dual Track</span>
            <span>Page 19 of 24</span>
        </div>
    </div>

    <!-- Pages 20 & 21: Dual Track Statement Essay -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 2: The Split-Column Dual Track · Statement Essay Toolkit (Part 1)</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stem 5/6 Part 1</span>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 5 / 6: Statement Essay Practice (16+4 Marks)</strong>
                    <span style="font-size: 7pt; color: #0284c7; font-weight: 700;">Four Humours c1250–c1700</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    "The Theory of the Four Humours was the most significant foundation of medical knowledge between c1250 and c1700."<br>
                    How far do you agree? Explain your answer.
                </div>
                <div style="font-size: 7.2pt; color: #475569; margin-bottom: 3px;">
                    Stimulus: <strong>• The enduring influence of Galen</strong> &nbsp;&nbsp; <strong>• Traditional herbal remedies</strong>
                </div>

                <div class="dual-track-container" style="height: 220mm;">
                    <div class="toolkit-col">
                        <div>
                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">⏱️ Continuity vs Change Matrix</strong>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Four Humours Dominance:</strong> Endorsed by Church; Galen's texts taught in universities; phlebotomy, purging, regimen sanitatis; used to explain 1348 and 1665 plagues.
                            </div>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Renaissance Challenges:</strong> Vesalius (1543) proved 300+ errors in Galen; Harvey (1628) proved circulation; Sydenham (1676) grouped diseases by symptoms not individual humours.
                            </div>
                        </div>

                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 4px; font-size: 6.2pt; color: #1e40af;">
                            <strong>🎯 Level 4 Evaluation:</strong> Distinguish between theoretical breakthroughs in universities and the continuity of humeral treatments among ordinary people.
                        </div>
                    </div>

                    <div class="writing-col">
                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase;">Para 1: The Enduring Dominance of the Four Humours</div>
                        <div class="writing-line starter">On the one hand, the Four Humours was unquestionably the dominant foundation of medicine...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Supported by the Catholic Church, Galen's humeral theories were taught as indisputable dogma...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; margin-top: 3px; text-transform: uppercase;">Para 2: Renaissance Challenges to Humeral Theory</div>
                        <div class="writing-line starter">However, between c1500 and c1700, scientific empirical observation began to dismantle humeral ideas...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Vesalius proved Galen wrong on anatomy in 1543, and William Harvey proved...</div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Section B · Turn page for Essay Part 2</span>
            <span>Page 20 of 24</span>
        </div>
    </div>

    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 2: The Split-Column Dual Track · Statement Essay Toolkit (Part 2)</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stem 5/6 Part 2</span>
            </div>

            <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 4px;">
                <div class="dual-track-container" style="height: 245mm;">
                    <div class="toolkit-col">
                        <div>
                            <strong style="color: #0284c7; font-size: 7pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">⏱️ Alternative Factors Toolkit</strong>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Herbal Remedies:</strong> Practical folklore medicine passed down by women/wise-women; honey, mint, willow bark; independent of Greek theory.
                            </div>
                            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px; margin-bottom: 3px; font-size: 6.2pt;">
                                <strong style="color: #0369a1;">Sydenham &amp; Observation:</strong> Observed epidemics as external clinical entities rather than internal balance of humours.
                            </div>
                        </div>

                        <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: 3px; padding: 4px; font-size: 6.2pt; color: #86198f;">
                            <strong>⚡ Grade 9 Judgement:</strong> Conclude that while anatomy changed rapidly, actual treatment remained fundamentally humeral until the 18th century!
                        </div>
                    </div>

                    <div class="writing-col">
                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase;">Para 3: Traditional Herbal &amp; Alternative Approaches</div>
                        <div class="writing-line starter">Furthermore, for the vast majority of ordinary people, medical knowledge was founded on...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Herbal remedies and community care provided by apothecaries and local women...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.5pt; font-weight: 800; color: #0284c7; margin-top: 3px; text-transform: uppercase;">Conclusion: Supported Final Judgement</div>
                        <div class="writing-line starter">In conclusion, I agree to a large extent that the Four Humours was the most significant foundation...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">Although anatomical discoveries by Vesalius and Harvey laid the groundwork for modern science...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line starter">In terms of everyday clinical treatment, humeral bleeding and purging remained unchallenged until c1700...</div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Section B · Turn page for Planning Engine Room</span>
            <span>Page 21 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 22: ROUND 3 — PLANNING ENGINE ROOM                       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 3: The Planning Engine Room · Thematic Causal &amp; Synoptic Deconstruction</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Round 3: Engine Room</span>
            </div>

            <!-- Pre-Flight Tables -->
            <div style="margin-bottom: 6px;">
                <strong style="font-size: 7.8pt; color: #991b1b;">1. Cross-Period Comparison Engine (Q3 Practice):</strong>
                <table class="plan-table">
                    <tr>
                        <th style="width: 30%;">Comparison Question</th>
                        <th style="width: 35%;">Period 1 Specific Evidence</th>
                        <th style="width: 35%;">Period 2 Specific Evidence</th>
                    </tr>
                    <tr>
                        <td>Treating Epidemics: Black Death vs Great Plague</td>
                        <td>1348: Flagellation, church prayers, carrying herbs, vinegar.</td>
                        <td>1665: Watchmen locked doors, searchers, burning barrels of pitch, plague pits.</td>
                    </tr>
                    <tr>
                        <td>Hospital Care: Medieval vs 19th Century</td>
                        <td>c1300: Monasteries (St Bartholomew's); focus on spiritual rest; no doctors.</td>
                        <td>c1860: Nightingale pavilion wards; trained nurses; antiseptic surgery.</td>
                    </tr>
                </table>
            </div>

            <div style="margin-bottom: 6px;">
                <strong style="font-size: 7.8pt; color: #991b1b;">2. Overarching Thematic Factors Matrix (Q4 &amp; Q5/Q6):</strong>
                <table class="plan-table">
                    <tr>
                        <th style="width: 25%;">Core Factor</th>
                        <th style="width: 40%;">Key Historical Examples Across 750 Years</th>
                        <th style="width: 35%;">Direct Analytical Impact</th>
                    </tr>
                    <tr>
                        <td><strong>Government Action</strong></td>
                        <td>1875 Public Health Act, compulsory smallpox vaccination (1853), NHS (1948)</td>
                        <td>Enforces sanitation and equal access beyond market forces.</td>
                    </tr>
                    <tr>
                        <td><strong>Science &amp; Tech</strong></td>
                        <td>Printing press (1476), Microscope, Swan-neck flasks, X-rays, DNA (1953)</td>
                        <td>Provides empirical proof that overturns dogma.</td>
                    </tr>
                    <tr>
                        <td><strong>Key Individuals</strong></td>
                        <td>Vesalius, Harvey, Jenner, Simpson, Lister, Pasteur, Koch, Snow, Fleming</td>
                        <td>Acts as intellectual pioneers driving revolutionary change.</td>
                    </tr>
                </table>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; color: #991b1b;">
                <strong>📋 PRE-FLIGHT AUDIT CHECKLIST:</strong> &nbsp;
                [ ] Did I compare BOTH eras with factual detail in Q3? &nbsp;&nbsp;
                [ ] Did I explain THREE distinct causes for Q4? &nbsp;&nbsp;
                [ ] Is my Q5/Q6 essay structured around criteria-led evaluation?
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 3 Engine Room</span>
            <span>Section B · Execute continuous prose on Page 23</span>
            <span>Page 22 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 23: ROUND 3 — THE EXAM PITCH (SECTION B SIMULATION)      -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>Section B: Medicine in Britain, c1250–present</h1>
                    <p>Round 3: The Exam Pitch · Authentic Edexcel Section B Simulation (36+4 Marks · 55 Mins)</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Timed Exam Pitch</span>
            </div>

            <div style="background: #f1f5f9; border: 1.5px solid #475569; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; margin-bottom: 6px; display: flex; justify-content: space-between;">
                <div><strong>AO1 Knowledge:</strong> Precise names, dates, individuals, and acts across all four eras.</div>
                <div><strong>AO2 Analysis:</strong> Sustained explanation of similarity, causation, and relative importance.</div>
            </div>

            <!-- Continuous Exam Lines for Section B -->
            <div style="padding: 0;">
                <div class="writing-line starter"><strong>Question 3 (4 Marks):</strong> One way in which hospital care in the 19th century differed from medieval hospitals was...</div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                
                <div class="writing-line starter" style="margin-top: 3px;"><strong>Question 4 (12 Marks):</strong> Explain why penicillin was mass-produced rapidly c1938–45: _________________________</div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>

                <div class="writing-line starter" style="margin-top: 3px;"><strong>Question 5 / 6 Essay (16+4 Marks):</strong> "____________________________________________________________________"</div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
                <div class="writing-line"></div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Authentic Exam Pitch</span>
            <span>Section B · Turn page for 100% Spec Coverage Bank</span>
            <span>Page 23 of 24</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 24: BACK COVER — 100% SPEC PRACTICE BANK & TRAPS         -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <!-- Header Banner -->
            <div style="background: #0f172a; color: white; padding: 8px 12px; border-radius: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="margin: 0; font-size: 10pt; font-weight: 800; text-transform: uppercase;">⚠️ Examiner Trap Doors &amp; 100% Specification Bank</h2>
                    <p style="margin: 1px 0 0 0; font-size: 7pt; color: #94a3b8;">Section B: Medicine in Britain, c1250–present · Pearson Edexcel GCSE History</p>
                </div>
                <span style="background: #ef4444; color: white; font-size: 6.8pt; font-weight: 800; padding: 2px 6px; border-radius: 3px;">100% Spec Guarantee</span>
            </div>

            <!-- Top Section: Trap Doors -->
            <div style="border: 1.5px solid #ef4444; background: #fef2f2; border-radius: 5px; padding: 6px 8px; margin-bottom: 6px;">
                <strong style="color: #b91c1c; font-size: 7.5pt; text-transform: uppercase; display: block; border-bottom: 1px solid #fecaca; padding-bottom: 2px; margin-bottom: 3px;">
                    🚫 Top 3 Fatal Examiner Traps to Avoid for Section B
                </strong>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
                    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 4px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• The One-Period Comparison Trap</strong>
                        <span style="color: #7f1d1d;">In Question 3, you cannot get above Level 1 if you only talk about one era. You must give balanced, explicit factual evidence for BOTH periods!</span>
                    </div>
                    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 4px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• The Overnight Miracle Trap</strong>
                        <span style="color: #7f1d1d;">Never describe scientific breakthroughs (Vesalius, Harvey, Jenner, Pasteur) as instant cures. In reality, ordinary treatments took decades or centuries to catch up!</span>
                    </div>
                    <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 4px; font-size: 6.5pt; line-height: 1.25;">
                        <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• The Storytelling Narrative Trap</strong>
                        <span style="color: #7f1d1d;">Question 4 and 5/6 are causal and evaluative essays, NOT stories. Never just list what Jenner or Snow did; explicitly explain *why* it changed outcomes.</span>
                    </div>
                </div>
            </div>

            <!-- Middle Section: 100% Specification Coverage Bank -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 6px 8px; background: #fff; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 4px;">
                    <strong style="color: #1e3a8a; font-size: 7.8pt; text-transform: uppercase;">📚 Specification Practice Bank: 100% Thematic Curriculum Coverage</strong>
                    <span style="font-size: 6.5pt; color: #64748b;">Every remaining thematic specification bullet point tested below</span>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 3px;">
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>1. Q3 Similarity (4m):</strong> Explain one way in which the training of physicians in the Medieval period was similar to the training of physicians in the Renaissance.
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>2. Q4 Explain Why (12m):</strong> Explain why government attitudes to public health changed in the period c1848–c1875. (Edwin Chadwick, John Snow).
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>3. Q5/Q6 Essay (16+4m):</strong> 'The founding of the National Health Service in 1948 was the most significant breakthrough in medical care between c1900 and the present.' How far do you agree?
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>4. Q3 Difference (4m):</strong> Explain one way in which treatments for the Black Death (1348) were different to treatments for Cholera (1854).
                    </div>
                    <div style="font-size: 6.8pt; line-height: 1.25; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px;">
                        <strong>5. Q4 Explain Why (12m):</strong> Explain why understanding the causes of disease advanced rapidly after 1900. (Watson &amp; Crick/DNA, lifestyle research into lung cancer).
                    </div>
                </div>
            </div>

            <!-- Key Individuals Synoptic Summary -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; color: #166534;">
                <strong>⚡ 750-YEAR SYNOPTIC TITANS:</strong> Hippocrates &amp; Galen (Humours) &rarr; Vesalius &amp; Harvey (Anatomy) &rarr; Sydenham (Observation) &rarr; Jenner (Vaccines) &rarr; Simpson (Chloroform) &rarr; Lister (Antiseptics) &rarr; Pasteur &amp; Koch (Germs) &rarr; Snow &amp; Chadwick (Public Health) &rarr; Fleming, Florey &amp; Chain (Antibiotics) &rarr; Watson, Crick &amp; Franklin (DNA).
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · 100% Specification Bank</span>
            <span>Section B Complete · Score checked items on Page 1</span>
            <span>Page 24 of 24</span>
        </div>
    </div>
</body>
</html>`;

  const sectionBPath = path.join(bookletsDir, 'med_mastery_section_b.html');
  fs.writeFileSync(sectionBPath, sectionBHtml, 'utf8');
  console.log(`   ✅ Saved Section B HTML: med_mastery_section_b.html (24 Pages)`);

  // =========================================================================
  // BUILD MASTER COMPENDIUM: PAPER 1 FULL MASTER VOLUME (36 PAGES)
  // =========================================================================
  console.log('\n📚 Compiling 36-Page Full Paper 1 Master Volume (med_mastery_FULL.html)...');

  const extractBodyPages = (html) => {
    const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
    return bodyMatch ? bodyMatch[1] : '';
  };

  const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Paper 1: Medicine in Britain, c1250–present and The British Sector of the Western Front — Complete Revision Compendium</title>
    <style>${COMMON_CSS}</style>
</head>
<body>
    ${extractBodyPages(sectionAHtml)}
    ${extractBodyPages(sectionBHtml)}
</body>
</html>`;

  const fullHtmlPath = path.join(bookletsDir, 'med_mastery_FULL.html');
  fs.writeFileSync(fullHtmlPath, fullHtmlContent, 'utf8');
  console.log(`   ✅ Saved Full Master HTML: med_mastery_FULL.html (36 Pages)`);

  // =========================================================================
  // LAUNCH PUPPETEER TO COMPILE THE 3 PDFs
  // =========================================================================
  console.log('\n🖨️ Launching Puppeteer to compile print-perfect PDFs...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });
  const page = await browser.newPage();

  // 1. Section A PDF (12 Pages)
  const secAPdfPath = path.join(pdfsDir, 'med_mastery_section_a_western_front.pdf');
  await page.goto(pathToFileURL(sectionAPath).href, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: secAPdfPath,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' },
  });
  console.log(`   📕 Exported PDF: med_mastery_section_a_western_front.pdf (12 Pages)`);

  // 2. Section B PDF (24 Pages)
  const secBPdfPath = path.join(pdfsDir, 'med_mastery_section_b_thematic_study.pdf');
  await page.goto(pathToFileURL(sectionBPath).href, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: secBPdfPath,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' },
  });
  console.log(`   📕 Exported PDF: med_mastery_section_b_thematic_study.pdf (24 Pages)`);

  // 3. Full Master PDF (36 Pages)
  const fullPdfPath = path.join(pdfsDir, 'med_mastery_pack_FULL.pdf');
  await page.goto(pathToFileURL(fullHtmlPath).href, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: fullPdfPath,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' },
  });
  console.log(`   📕 Exported PDF: med_mastery_pack_FULL.pdf (36 Pages Master Volume)`);

  // Sync to public/pdfs/ root
  fs.copyFileSync(secAPdfPath, path.join(rootPdfsDir, 'med_mastery_section_a_western_front.pdf'));
  fs.copyFileSync(secBPdfPath, path.join(rootPdfsDir, 'med_mastery_section_b_thematic_study.pdf'));
  fs.copyFileSync(fullPdfPath, path.join(rootPdfsDir, 'med_mastery_pack_FULL.pdf'));
  console.log(`   📋 Synced PDFs to public/pdfs/ root`);

  await browser.close();
  console.log('\n🎉 Successfully compiled all Medicine Mastery Booklets into print-perfect PDFs!');
}

run().catch((err) => {
  console.error('❌ Error generating Medicine mastery booklets:', err);
  process.exit(1);
});
