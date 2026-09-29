/**
 * cme_renderers.cjs
 *
 * Professional monochrome renderers for Pearson Edexcel GCSE (9–1) History
 * Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)
 * Complete Revision Guide & Cartographic Specification Masterclass (20 Pages).
 *
 * Designed for lower-ability 14- to 15-year-old GCSE pupils (Year 10/11):
 * - Simple, direct language mirroring Pearson Edexcel revision guides.
 * - 1-to-1 alignment with the 12 lessons taught on the app.
 * - Universal flex-stretch (.page-body-stretch) to eliminate dead-space voids.
 * - Authentic, high-yield historical revision material throughout.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..', '..');

function getImageDataUri(imgPath) {
  if (!imgPath) return '';
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  const fullPath = path.join(ROOT_DIR, 'public', cleanPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).toLowerCase().replace('.', '');
    const mime =
      ext === 'svg'
        ? 'image/svg+xml'
        : ext === 'png'
          ? 'image/png'
          : ext === 'webp'
            ? 'image/webp'
            : 'image/jpeg';
    const b64 = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }
  return '';
}

function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function getStyles() {
  return `
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0;
    background: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 794px; height: 1123px; max-height: 1123px;
    overflow: hidden; page-break-after: always;
    padding: 13px 18px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: #ffffff;
    position: relative;
    box-sizing: border-box;
  }
  .page:last-child { page-break-after: avoid; }
  
  .page-body-stretch {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    gap: 6px;
  }

  .cover-border {
    border: 2px solid #0f172a;
    border-radius: 6px;
    padding: 11px 13px;
    height: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
    background: #ffffff;
    box-sizing: border-box;
  }

  .page-header {
    border-bottom: 2px solid #0f172a;
    padding-bottom: 3px; margin-bottom: 5px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .page-footer {
    border-top: 1.5px solid #0f172a;
    padding-top: 3px; margin-top: auto;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 8.0pt; font-weight: 700; color: #0f172a;
    text-transform: uppercase;
    white-space: nowrap;
    letter-spacing: 0.2px;
  }

  .pub-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    overflow: hidden;
  }
  .pub-card-blue { border-top: 3.5px solid #0284c7; }
  .pub-card-navy { border-top: 3.5px solid #1e3a8a; }
  .pub-card-amber { border-top: 3.5px solid #d97706; }
  .pub-card-crimson { border-top: 3.5px solid #b91c1c; }
  .pub-card-slate { border-top: 3.5px solid #475569; }

  .badge-blue {
    display: inline-block;
    background: #e0f2fe; color: #0369a1;
    border: 1px solid #bae6fd;
    font-size: 7.6pt; font-weight: 800;
    padding: 1.5px 6px; border-radius: 3px;
    text-transform: uppercase; letter-spacing: 0.3px;
  }
  .badge-navy {
    display: inline-block;
    background: #1e3a8a; color: #ffffff;
    font-size: 7.6pt; font-weight: 800;
    padding: 1.5px 6px; border-radius: 3px;
    text-transform: uppercase; letter-spacing: 0.3px;
  }
  .badge-amber {
    display: inline-block;
    background: #fef3c7; color: #92400e;
    border: 1px solid #fde68a;
    font-size: 7.6pt; font-weight: 800;
    padding: 1.5px 6px; border-radius: 3px;
    text-transform: uppercase; letter-spacing: 0.3px;
  }
  .badge-crimson {
    display: inline-block;
    background: #fee2e2; color: #991b1b;
    border: 1px solid #fecaca;
    font-size: 7.6pt; font-weight: 800;
    padding: 1.5px 6px; border-radius: 3px;
    text-transform: uppercase; letter-spacing: 0.3px;
  }
`;
}

// Page 1: Cover
function renderPage1() {
  const unrwaImgUri = getImageDataUri('images/nakba_unrwa_women_bread_1948.jpg');
  const rubingerImgUri = getImageDataUri('images/israeli_troops_wall.jpg');

  return `
    <div class="page" id="page_1" data-page="1">
      <div class="cover-border">
        
        <!-- 1. PUPIL DETAILS BOX -->
        <div style="border: 1.5px solid #cbd5e1; border-top: 3.5px solid #0284c7; border-radius: 5px; padding: 6px 11px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 9.0pt; color: #0f172a; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
          <div style="flex: 1; display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; font-size: 8.8pt; color: #0f172a; margin-right: 6px; letter-spacing: 0.3px;">Candidate Name:</strong>
            <span style="border-bottom: 1.2px solid #94a3b8; flex: 1; height: 14px; margin-right: 14px;"></span>
          </div>
          <div style="display: flex; gap: 14px; font-size: 8.5pt; color: #334155; white-space: nowrap;">
            <span><strong>Class:</strong> Year 10 / 11</span>
            <span><strong>Teacher:</strong> Department Lead</span>
            <span><strong style="color: #0369a1;">Target:</strong> GCSE Grades 4–9</span>
          </div>
        </div>

        <!-- 2. TOP HEADER STRIP & MAIN TITLE -->
        <div>
          <div style="border-bottom: 1.5px solid #0f172a; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 8.5pt; font-weight: 800; letter-spacing: 0.6px; color: #0369a1; text-transform: uppercase;">
              PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5
            </span>
            <span style="font-size: 8.2pt; font-weight: 700; color: #475569; text-transform: uppercase;">
              1HI0/P5 &bull; Period Study Revision Guide
            </span>
          </div>

          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 17.5pt; font-weight: 900; line-height: 1.12; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 0.3px;">
            Option P5: Conflict in the Middle East, 1945–1995
          </h1>
          <div style="font-size: 9.0pt; font-weight: 700; color: #334155; display: flex; justify-content: space-between; align-items: center;">
            <span>Complete Revision Guide &bull; 12 Specification Cheat Sheets, 4 Map Atlases &amp; Exam Strategy</span>
            <span class="badge-navy" style="font-size: 8.2pt; padding: 2px 8px;">
              20-Page Master Edition
            </span>
          </div>
        </div>

        <!-- 3. DUAL ARCHIVAL PRIMARY PLATES -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #fafafa;">
          <div style="font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 0.3px; margin-bottom: 4px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px;">
            Two Defining Turning Points of the Conflict
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <!-- Left Plate: 1948 Al-Nakba -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 4px; border-radius: 2px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
                <strong style="font-size: 8.2pt; text-transform: uppercase; color: #000000;">1. The 1948 Al-Nakba (The Catastrophe)</strong>
                <span style="font-size: 7.6pt; font-weight: 700; color: #475569;">UNRWA Archive</span>
              </div>
              <div style="width: 100%; height: 140px; background: #ffffff; border: 1px solid #000000; margin-bottom: 3px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="${unrwaImgUri}" alt="Palestinian refugees 1948" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(100%); display: block;" />
              </div>
              <div style="font-size: 8.0pt; color: #000000; line-height: 1.22;">
                <strong>Key Result:</strong> Over 700,000 Palestinian Arabs became refugees following the 1948–49 War, living in UNRWA camps.
              </div>
            </div>

            <!-- Right Plate: 1967 Six Day War -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 4px; border-radius: 2px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
                <strong style="font-size: 8.2pt; text-transform: uppercase; color: #000000;">2. 1967 Paratroopers at Western Wall</strong>
                <span style="font-size: 7.6pt; font-weight: 700; color: #475569;">GPO Archive</span>
              </div>
              <div style="width: 100%; height: 140px; background: #ffffff; border: 1px solid #000000; margin-bottom: 3px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="${rubingerImgUri}" alt="Israeli paratroopers Western Wall 1967" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(100%); display: block;" />
              </div>
              <div style="font-size: 8.0pt; color: #000000; line-height: 1.22;">
                <strong>Key Result:</strong> Israel captured East Jerusalem, the West Bank, Gaza, Sinai, and Golan, putting 1 million Palestinians under military rule.
              </div>
            </div>
          </div>
        </div>

        <!-- 4. OFFICIAL SPECIFICATION CHECKLIST -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border-bottom: 1.2px solid #000000; padding-bottom: 2px;">
            <span style="font-size: 8.8pt; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: 0.3px;">
              📋 Official Pearson Edexcel Specification Revision Checklist
            </span>
            <span style="font-size: 7.6pt; font-weight: 700; color: #000000;">Tick each topic once revised:</span>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 7.2pt; line-height: 1.24; color: #000000;">
            
            <!-- Column 1: KT1 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 8.2pt; font-weight: 900; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #000; padding-bottom: 1px;">
                Key Topic 1: Birth of Israel (1945–63)
              </div>
              
              <div style="margin-bottom: 4px;">
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">1. End of Mandate &amp; Israel Created</strong>
                <div>&bull; Demands of Jews and Arabs under the Mandate.</div>
                <div>&bull; King David Hotel bombing &amp; UN Res 181.</div>
                <div>&bull; Key events of the 1948–49 Arab-Israeli War.</div>
              </div>
              
              <div style="margin-bottom: 4px;">
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">2. Aftermath of 1948–49 War</strong>
                <div>&bull; Territorial changes &amp; 1949 Green Line.</div>
                <div>&bull; Palestinian refugee crisis (Al-Nakba).</div>
                <div>&bull; Creation of the IDF &amp; Law of Return (1950).</div>
                <div>&bull; US aid to Israel &amp; relations with Egypt.</div>
              </div>

              <div>
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">3. Increased Tension &amp; Suez (1955–63)</strong>
                <div>&bull; Nasser and leadership of the Arab world.</div>
                <div>&bull; 1955 Gaza attack &amp; 1956 Sinai attack.</div>
                <div>&bull; Suez Crisis (1956) &amp; creation of UAR (1958).</div>
              </div>
            </div>

            <!-- Column 2: KT2 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 8.2pt; font-weight: 900; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #000; padding-bottom: 1px;">
                Key Topic 2: Escalating Conflict (1964–73)
              </div>
              
              <div style="margin-bottom: 4px;">
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">1. The Six Day War (1967)</strong>
                <div>&bull; 1964 Cairo Conference &amp; growth of PLO/Fatah.</div>
                <div>&bull; Water disputes, Samu Raid &amp; 7 April dogfight.</div>
                <div>&bull; Actions of USSR, Nasser &amp; USA before war.</div>
                <div>&bull; Operation Focus &amp; events of the 1967 war.</div>
              </div>

              <div style="margin-bottom: 4px;">
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">2. Aftermath of 1967 War</strong>
                <div>&bull; UN Resolution 242 &amp; Land for Peace.</div>
                <div>&bull; Occupied Territories &amp; new Palestinian refugees.</div>
                <div>&bull; PFLP plane hijacks (1970) &amp; Dawson's Field.</div>
                <div>&bull; Black September in Jordan &amp; Munich Olympics.</div>
              </div>

              <div>
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">3. Israel &amp; Egypt (1967–73)</strong>
                <div>&bull; War of Attrition along the Suez Canal.</div>
                <div>&bull; Israeli settlements in occupied lands.</div>
                <div>&bull; Yom Kippur War (1973) &amp; OPEC oil embargo.</div>
              </div>
            </div>

            <!-- Column 3: KT3 -->
            <div>
              <div style="font-size: 8.2pt; font-weight: 900; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #000; padding-bottom: 1px;">
                Key Topic 3: Search for Peace (1974–95)
              </div>
              
              <div style="margin-bottom: 4px;">
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">1. Diplomatic Negotiations</strong>
                <div>&bull; 1973 Oil crisis &amp; superpower involvement.</div>
                <div>&bull; Kissinger, shuttle diplomacy &amp; Suez reopens.</div>
                <div>&bull; Sadat visits Jerusalem (1977).</div>
                <div>&bull; Carter, Camp David (1978) &amp; Washington Treaty.</div>
              </div>

              <div style="margin-bottom: 4px;">
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">2. The Palestinian Issue</strong>
                <div>&bull; Yasser Arafat speaks to the UN (1974).</div>
                <div>&bull; PLO in Lebanon &amp; 1982 Israeli invasion.</div>
                <div>&bull; Sabra and Shatila massacres &amp; Sharon inquiry.</div>
                <div>&bull; The First Palestinian Intifada (1987–93).</div>
              </div>

              <div>
                <strong style="display: block; font-size: 7.6pt; text-transform: uppercase; color: #000000;">3. Attempts at a Solution</strong>
                <div>&bull; Arafat renounces terrorism at UN (1988).</div>
                <div>&bull; End of Cold War &amp; 1991 Gulf War impact.</div>
                <div>&bull; Oslo I Accords (1993) &amp; Palestinian Authority.</div>
                <div>&bull; Israel-Jordan Peace (1994) &amp; Oslo II (1995).</div>
                <div>&bull; Assassination of Yitzhak Rabin (Nov 1995).</div>
              </div>
            </div>

          </div>
        </div>

        <!-- 5. REVISION RULES FOR SUCCESS -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt; line-height: 1.24; color: #334155;">
          <div><strong>Exam Structure:</strong> Paper 2 Period Study = 3 Questions, 28 Marks Total, Exactly 50 Minutes.</div>
          <div><strong style="color: #0369a1;">Golden Rule:</strong> Write in clear paragraphs; always link your facts to the question asked.</div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Candidate Cover &bull; Page 1 of 20</span>
      </div>
    </div>
  `;
}

// Page 2: Paper 2 Blueprint
function renderPage2() {
  return `
    <div class="page" id="page_2" data-page="2">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;">
            Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Period Study (1HI0/P5)
          </span>
          <h2 style="font-size: 14.0pt; font-weight: 900; color: #0f172a; margin: 1px 0 0 0; text-transform: uppercase;">
            Paper 2 Exam Guide: How to Answer Every Question
          </h2>
        </div>
        <span class="badge-navy" style="font-size: 8.0pt; padding: 2px 8px;">
          50 Minutes &bull; 28 Marks
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- 1. The Three Question Formats -->
        <div class="pub-card pub-card-blue" style="padding: 6px 9px; flex: 1.05; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 8.6pt; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 3px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>The Three Question Types &bull; What the Examiner Wants</span>
            <span style="color: #0369a1;">Total Time: 50 Minutes</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1.1fr 1.2fr; gap: 7px; font-size: 7.8pt; line-height: 1.26; color: #1e293b; flex: 1;">
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 7px;">
              <div style="font-size: 8.2pt; font-weight: 800; color: #0369a1; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 3px; text-transform: uppercase;">
                Q1: One Consequence (4 Marks &bull; 6 Mins)
              </div>
              <div>&bull; <strong>Question:</strong> "Explain one consequence of [an event]..."</div>
              <div>&bull; <strong>What to write:</strong> Write ONE clear paragraph.</div>
              <div>&bull; <strong>Formula:</strong> State the consequence clearly in sentence 1. Then give 2 detailed facts. Finish by explaining what happened because of it.</div>
              <div>&bull; <strong>Important:</strong> Do NOT write an introduction, conclusion, or a second consequence! You only get marks for ONE.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 7px;">
              <div style="font-size: 8.2pt; font-weight: 800; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 3px; text-transform: uppercase;">
                Q2: Narrative Account (8 Marks &bull; 14 Mins)
              </div>
              <div>&bull; <strong>Question:</strong> "Write a narrative account analysing..."</div>
              <div>&bull; <strong>What to write:</strong> Tell the historical story in 3 paragraphs: Beginning ➔ Turning Point ➔ Outcome.</div>
              <div>&bull; <strong>Formula:</strong> Link every paragraph using connecting words like <em>As a result</em>, <em>Because of this</em>, or <em>This led to</em>.</div>
              <div>&bull; <strong>Important:</strong> You get 2 bullet points on the exam paper. You MUST also include facts from your own knowledge!</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 7px;">
              <div style="font-size: 8.2pt; font-weight: 800; color: #d97706; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 3px; text-transform: uppercase;">
                Q3: Importance of Two (16 Marks &bull; 24 Mins)
              </div>
              <div>&bull; <strong>Question:</strong> "Explain the importance of TWO of the following..."</div>
              <div>&bull; <strong>Choice:</strong> Choose strictly <strong>TWO out of three</strong> options (8 marks each). Never attempt all three!</div>
              <div>&bull; <strong>Structure:</strong> Write 2 paragraphs for each option you choose.</div>
              <div>&bull; <strong>Para 1:</strong> What was the immediate impact of the event?</div>
              <div>&bull; <strong>Para 2:</strong> What was the long-term impact on peace or conflict?</div>
            </div>

          </div>
        </div>

        <!-- 2. Four Golden Rules for Exam Success -->
        <div class="pub-card pub-card-navy" style="padding: 5px 9px; flex: 0.8; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 8.4pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
            Four Golden Rules for Success
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 7.7pt; line-height: 1.25; color: #1e293b; flex: 1;">
            <div><strong>1. Use Specific Facts:</strong> Always include real names, dates, and numbers (e.g. <em>UN Resolution 242</em>, <em>King David Hotel</em>, <em>700,000 refugees</em>).</div>
            <div><strong>2. Use Linking Words:</strong> In Question 2, show <em>how</em> one event caused the next (e.g. <em>This directly caused</em>, <em>Consequently</em>).</div>
            <div><strong>3. Explain the Impact:</strong> In Question 3, don't just describe the story; explain <em>why</em> it made a big difference to peace or war.</div>
            <div><strong>4. Watch the Clock:</strong> Spend exactly 6 minutes on Q1, 14 minutes on Q2, and 24 minutes on Q3. Stop at 50 minutes!</div>
          </div>
        </div>

        <!-- 3. Model Answers (WAGOLL) in Simple, Clear English -->
        <div class="pub-card pub-card-amber" style="padding: 6px 9px; flex: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 8.6pt; font-weight: 800; text-transform: uppercase; color: #92400e; margin-bottom: 3px; border-bottom: 1.2px solid #fde68a; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>⭐ Model Answers (WAGOLL): Clear Examples of Top-Mark Answers</span>
            <span style="font-size: 7.5pt; color: #78350f;">See How to Structure Your Writing</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; flex: 1;">
            
            <!-- Q1 Model -->
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 7.9pt; font-weight: 800; color: #92400e; border-bottom: 1px dashed #fde68a; padding-bottom: 2px; margin-bottom: 3px;">
                  Q1 Model: Consequence of the 1948 War [4 Marks]
                </div>
                <p style="margin: 0 0 3px 0; font-size: 7.6pt; line-height: 1.26; color: #1e293b; font-family: Georgia, serif; font-style: italic;">
                  "One consequence of the 1948–49 Arab-Israeli War was the creation of a massive Palestinian refugee crisis. During the fighting, over 700,000 Palestinian Arabs fled or were forced out of their homes in what became known as Al-Nakba. Israel refused to let them return after the war because it wanted to protect its Jewish majority. As a result, hundreds of thousands of Palestinians were forced to live in permanent refugee camps in Gaza, the West Bank, and Jordan, run by the UN agency UNRWA."
                </p>
              </div>
              <div style="font-size: 7.0pt; color: #78350f; line-height: 1.18; background: rgba(254, 243, 199, 0.7); padding: 2px 4px; border-radius: 2px;">
                <strong>Why this scores 4/4:</strong> States the consequence in line 1 &bull; Gives exact facts (700,000, Al-Nakba, UNRWA) &bull; Explains the result clearly.
              </div>
            </div>

            <!-- Q2 Model -->
            <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 7.9pt; font-weight: 800; color: #92400e; border-bottom: 1px dashed #fde68a; padding-bottom: 2px; margin-bottom: 3px;">
                  Q2 Model: Events Leading to the 1956 Suez Crisis [8 Marks]
                </div>
                <p style="margin: 0 0 3px 0; font-size: 7.6pt; line-height: 1.26; color: #1e293b; font-family: Georgia, serif; font-style: italic;">
                  "The crisis began in July 1956 when President Nasser of Egypt nationalised the Suez Canal after the USA cancelled loans to build the Aswan Dam. Because the canal was owned by Britain and France, both countries were furious and wanted to regain control. As a result, Britain and France held secret talks with Israel at Sèvres in October 1956, agreeing that Israel would invade Egypt so Britain and France could step in to 'protect' the canal. The turning point came when US President Eisenhower threatened to cut off financial loans to Britain. Consequently, Britain and France were forced into a humiliating retreat, leaving Nasser with the canal."
                </p>
              </div>
              <div style="font-size: 7.0pt; color: #78350f; line-height: 1.18; background: rgba(254, 243, 199, 0.7); padding: 2px 4px; border-radius: 2px;">
                <strong>Why this scores 8/8:</strong> Tells the story in clear chronological order &bull; Uses linking words in every step &bull; Includes own knowledge (Aswan Dam, Sèvres).
              </div>
            </div>

          </div>
        </div>

        <!-- 4. Three Traps to Avoid -->
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 3.5px solid #b91c1c; border-radius: 4px; padding: 4px 8px; font-size: 7.6pt; line-height: 1.24; color: #991b1b; flex: 0.65; display: flex; flex-direction: column; justify-content: space-around;">
          <strong style="text-transform: uppercase; font-size: 7.8pt; display: block;">
            ⚠️ Common Mistakes to Avoid on Exam Day
          </strong>
          <div>&bull; <strong>Don't write two consequences for Q1:</strong> Examiners only mark your FIRST consequence. Writing a second wastes time.</div>
          <div>&bull; <strong>Don't answer all three options in Q3:</strong> You only get marks for TWO. Answering all three wastes 12 minutes!</div>
          <div>&bull; <strong>Don't just write a list of events in Q2:</strong> Always explain <em>why</em> one event caused the next event to happen.</div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Paper 2 Exam Guide &bull; Page 2 of 20</span>
      </div>
    </div>
  `;
}

// Page 3: 50-Year Chronology Timeline & Four Big Themes
function renderPage3() {
  return `
    <div class="page" id="page_3" data-page="3">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px;">
            Key Chronology &bull; The Complete 50-Year Story (1945–1995)
          </span>
          <h2 style="font-size: 14.0pt; font-weight: 900; color: #0f172a; margin: 1px 0 0 0; text-transform: uppercase;">
            50-Year Timeline: From the Creation of Israel to the Oslo Accords
          </h2>
        </div>
        <span class="badge-navy" style="font-size: 8.0pt; padding: 2px 8px;">
          Master Timeline
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- 3-Column Chronology Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; flex: 1.25; min-height: 0;">
          
          <!-- KT1 -->
          <div class="pub-card pub-card-blue" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #0369a1; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                Key Topic 1: Birth of Israel (1945–63)
              </div>
              <div style="font-size: 7.3pt; line-height: 1.26; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
                <div><strong>July 1946:</strong> Irgun bombs British military HQ at King David Hotel (91 dead).</div>
                <div><strong>Feb 1947:</strong> Britain gives up Mandate and asks the UN to take over.</div>
                <div><strong>July 1947:</strong> Royal Navy intercepts SS Exodus with 4,500 refugees.</div>
                <div><strong>Nov 1947:</strong> UN passes Res 181 to divide Palestine (55% Jewish / 44% Arab).</div>
                <div><strong>9 Apr 1948:</strong> Deir Yassin massacre; Palestinian civilians flee in fear.</div>
                <div><strong>14 May 1948:</strong> David Ben-Gurion declares the independent State of Israel.</div>
                <div><strong>15 May 1948:</strong> Five Arab armies invade; First Arab-Israeli War starts.</div>
                <div><strong>1949:</strong> Armistice agreements set the Green Line; Israel holds 79% of land.</div>
                <div><strong>1949:</strong> Over 700,000 Palestinians become refugees in UNRWA camps (Al-Nakba).</div>
                <div><strong>1950:</strong> Israel passes Law of Return; population doubles in 3 years.</div>
                <div><strong>July 1956:</strong> President Nasser nationalises the Suez Canal.</div>
                <div><strong>Oct–Nov 1956:</strong> Suez Crisis; Israel invades Sinai; USA forces UK withdrawal.</div>
              </div>
            </div>
          </div>

          <!-- KT2 -->
          <div class="pub-card pub-card-navy" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                Key Topic 2: Escalating Conflict (1964–73)
              </div>
              <div style="font-size: 7.3pt; line-height: 1.26; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
                <div><strong>Jan 1964:</strong> Arab leaders meet in Cairo; PLO is formed; Water Wars begin.</div>
                <div><strong>Nov 1966:</strong> Israel launches major reprisal raid on Samu in the West Bank.</div>
                <div><strong>7 Apr 1967:</strong> Israeli jets shoot down 6 Syrian MiG planes over Damascus.</div>
                <div><strong>May 1967:</strong> Nasser expels UN troops, moves 100,000 soldiers, shuts Tiran Straits.</div>
                <div><strong>5–10 June 1967:</strong> Six-Day War; Israel captures Sinai, Gaza, West Bank, Golan.</div>
                <div><strong>Aug 1967:</strong> Arab summit at Khartoum declares 'Three Noes' (no peace, no recognition).</div>
                <div><strong>Nov 1967:</strong> UN passes Resolution 242 establishing 'Land for Peace' formula.</div>
                <div><strong>1969–70:</strong> War of Attrition; heavy artillery battles along the Suez Canal.</div>
                <div><strong>Sept 1970:</strong> Dawson's Field plane hijackings; Black September in Jordan.</div>
                <div><strong>Sept 1972:</strong> Black September terrorists kill 11 Israeli athletes at Munich Olympics.</div>
                <div><strong>6 Oct 1973:</strong> Yom Kippur War; surprise Egyptian &amp; Syrian attack on holy day.</div>
                <div><strong>Oct 1973:</strong> Arab OPEC states launch oil embargo, quadrupling world oil prices.</div>
              </div>
            </div>
          </div>

          <!-- KT3 -->
          <div class="pub-card pub-card-amber" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #d97706; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                Key Topic 3: Search for Peace (1974–95)
              </div>
              <div style="font-size: 7.3pt; line-height: 1.26; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
                <div><strong>1974–75:</strong> Henry Kissinger uses 'shuttle diplomacy'; Suez Canal reopens.</div>
                <div><strong>Nov 1974:</strong> Yasser Arafat addresses UN General Assembly ('gun and olive branch').</div>
                <div><strong>19 Nov 1977:</strong> Anwar Sadat visits Jerusalem and speaks to the Israeli Knesset.</div>
                <div><strong>Sept 1978:</strong> President Carter brokers Camp David Accords between Egypt and Israel.</div>
                <div><strong>26 Mar 1979:</strong> Treaty of Washington signs formal peace; Sinai returned to Egypt.</div>
                <div><strong>6 Oct 1981:</strong> Anwar Sadat is assassinated in Cairo by Islamic extremists.</div>
                <div><strong>June 1982:</strong> Israel invades Lebanon; Arafat and PLO are evacuated to Tunisia.</div>
                <div><strong>Sept 1982:</strong> Sabra and Shatila refugee camp massacres; Sharon forced to resign.</div>
                <div><strong>Dec 1987:</strong> First Palestinian Intifada begins in Gaza and West Bank (stone-throwing).</div>
                <div><strong>Nov 1988:</strong> Yasser Arafat renounces terrorism and accepts UN Resolution 242.</div>
                <div><strong>13 Sept 1993:</strong> Oslo I Accords signed at White House; Rabin and Arafat shake hands.</div>
                <div><strong>1994–95:</strong> Israel-Jordan peace treaty; Oslo II divides West Bank; Rabin assassinated.</div>
              </div>
            </div>
          </div>

        </div>

        <!-- Four Big Themes to Remember -->
        <div class="pub-card pub-card-navy" style="padding: 5px 8px; flex: 0.95; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 8.4pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-bottom: 3px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 1px; display: flex; justify-content: space-between;">
            <span>Four Big Themes to Remember (1945–1995)</span>
            <span style="font-size: 7.4pt; color: #0369a1;">Essential Ideas for Your Exam</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-size: 7.3pt; line-height: 1.24; color: #1e293b; flex: 1;">
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #0369a1; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">1. The Superpowers (USA &amp; USSR)</strong>
              The Cold War shaped the Middle East. The USA gave money and weapons to Israel. The Soviet Union armed Egypt and Syria. In 1973, US weapons saved Israel. When the USSR collapsed in 1991, the USA became the sole peace broker.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #1e3a8a; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">2. The Palestinian People</strong>
              In 1948, 700,000 Palestinians became refugees. In 1964, the PLO was formed to fight for their homeland. In the 1970s, militant groups turned to plane hijackings. In 1987, the First Intifada showed their determination, leading to the Oslo Accords.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #b91c1c; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">3. The Arab-Israeli Wars</strong>
              Four major wars were fought: 1948 (survival), 1956 (Suez), 1967 (Six-Day War / territories captured), and 1973 (Yom Kippur). The 1973 war broke the myth of Israeli invincibility and proved that a military stalemate could only be solved by talks.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #d97706; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">4. The Search for Peace</strong>
              Peace was achieved step-by-step: Kissinger's shuttle diplomacy (1974–75), Camp David and peace with Egypt (1979), peace with Jordan (1994), and the Oslo Accords (1993–95). However, extremist violence repeatedly threatened progress.
            </div>

          </div>
        </div>

        <!-- Examiner Tip Box -->
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-left: 3.5px solid #0284c7; border-radius: 4px; padding: 4px 8px; flex: 0.55; display: flex; flex-direction: column; justify-content: center;">
          <div style="font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #0369a1; margin-bottom: 1px;">
            💡 Examiner Tip: The Big Picture Across 50 Years
          </div>
          <p style="margin: 0; font-size: 7.5pt; line-height: 1.25; color: #0c4a6e;">
            Notice how the conflict changed: from 1948 to 1973, it was a war between <strong>countries</strong> (Israel vs Arab states). After 1973, Arab states began making peace (Egypt in 1979, Jordan in 1994), and the focus shifted directly to the <strong>Palestinians</strong> fighting for self-determination in the West Bank and Gaza.
          </p>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Key Chronology &bull; Page 3 of 20</span>
      </div>
    </div>
  `;
}

// Page 4: 1947 UN Partition Plan Atlas
function renderPage4() {
  const mapUri = getImageDataUri('images/palestine_1947_map.png');
  return `
    <div class="page" id="page_4" data-page="4">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Cartographic Atlas 1 &bull; The 1947 Territorial Division
          </span>
          <h2 style="font-size: 13.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase; color: #0f172a;">
            The 1947 United Nations Partition Plan (Resolution 181)
          </h2>
        </div>
        <span class="badge-blue" style="font-size: 8.0pt; padding: 2px 8px;">
          Map Atlas 1
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- Map Container -->
        <div class="pub-card" style="padding: 4px; background: #ffffff; flex: 1.35; display: flex; align-items: center; justify-content: center; min-height: 0;">
          <div style="width: 100%; height: 100%; min-height: 590px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="${mapUri}" alt="1947 UN Partition Plan" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;" />
          </div>
        </div>

        <!-- 4-Quadrant Analysis -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 7.7pt; line-height: 1.25; flex: 0.85; min-height: 0;">
          
          <div class="pub-card pub-card-blue" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #0369a1; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              1. The Land Split (55% vs 44%)
            </div>
            <div>&bull; <strong>Jewish State (55%):</strong> Given to ~500,000 Jews and ~400,000 Arabs. Included the fertile coastal plain and the large Negev desert.</div>
            <div>&bull; <strong>Arab State (44%):</strong> Given to ~725,000 Arabs and ~10,000 Jews. Included the hilly areas of Judea, Samaria, and Western Galilee.</div>
            <div>&bull; <strong>Population Difference:</strong> Arabs were two-thirds of the population, but were allocated less than half of the land.</div>
          </div>

          <div class="pub-card pub-card-navy" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              2. Conflicting Reactions
            </div>
            <div>&bull; <strong>Jewish Leaders (Ben-Gurion):</strong> Accepted the plan because it gave international legal recognition to a Jewish state.</div>
            <div>&bull; <strong>Arab Leaders:</strong> Completely rejected the plan, arguing that Britain and the UN had no right to give away Arab land without consent.</div>
            <div>&bull; <strong>The UN Vote:</strong> Passed on 29 November 1947 with 33 votes in favour, 13 against, and 10 abstentions (including Britain).</div>
          </div>

          <div class="pub-card pub-card-amber" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #d97706; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              3. The Problem with the Borders
            </div>
            <div>&bull; <strong>Divided into Pieces:</strong> Both states were broken into 3 separate pieces that only touched at tiny crossroads, making defence very difficult.</div>
            <div>&bull; <strong>Jerusalem:</strong> Placed under international control (run by the UN) so neither Jews nor Arabs owned the holy city.</div>
            <div>&bull; <strong>British Withdrawal:</strong> Britain refused to help carry out the plan, leaving in May 1948 without keeping order.</div>
          </div>

          <div class="pub-card pub-card-crimson" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #b91c1c; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              4. Immediate Result (Exam Link)
            </div>
            <div>&bull; <strong>Civil War Begins:</strong> Fighting between Arabs and Jews broke out the very next day (30 November 1947).</div>
            <div>&bull; <strong>Deir Yassin &amp; Panic:</strong> In April 1948, Jewish fighters attacked the village of Deir Yassin, causing panic and mass civilian flight.</div>
            <div>&bull; <strong>Leads to 1948 War:</strong> When Britain left on 14 May 1948, Israel declared independence and five Arab armies invaded.</div>
          </div>

        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Page 4 of 20 &bull; 1947 UN Partition Plan Atlas</span>
      </div>
    </div>
  `;
}

// Page 5: 1948 Arab Invasions Atlas
function renderPage5() {
  const mapUri = getImageDataUri('images/cme_1948_arab_invasion_map.png');
  return `
    <div class="page" id="page_5" data-page="5">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Cartographic Atlas 1 &bull; The 1948–49 Arab-Israeli War
          </span>
          <h2 style="font-size: 13.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase; color: #0f172a;">
            The 1948 Arab Invasions &amp; The First Arab-Israeli War
          </h2>
        </div>
        <span class="badge-blue" style="font-size: 8.0pt; padding: 2px 8px;">
          Map Atlas 1
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- Map Container -->
        <div class="pub-card" style="padding: 4px; background: #ffffff; flex: 1.35; display: flex; align-items: center; justify-content: center; min-height: 0;">
          <div style="width: 100%; height: 100%; min-height: 590px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="${mapUri}" alt="1948 Arab Invasions Map" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;" />
          </div>
        </div>

        <!-- 4-Quadrant Analysis -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 7.7pt; line-height: 1.25; flex: 0.85; min-height: 0;">
          
          <div class="pub-card pub-card-blue" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #0369a1; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              1. The Five Arab Invasions (15 May 1948)
            </div>
            <div>&bull; <strong>Egypt (11,000 soldiers):</strong> Advanced through Gaza along the coast towards Tel Aviv; halted 35km away by Israeli defences.</div>
            <div>&bull; <strong>Jordan (Arab Legion):</strong> Well-trained by British officers; captured the Old City of Jerusalem and the West Bank.</div>
            <div>&bull; <strong>Syria, Iraq &amp; Lebanon:</strong> Attacked from the north and east; Syrian troops were stopped in heavy fighting around Galilee.</div>
          </div>

          <div class="pub-card pub-card-navy" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              2. The Crucial June Truce
            </div>
            <div>&bull; <strong>Four-Week Ceasefire (11 June):** The UN arranged a temporary truce; both sides were banned from importing weapons.</div>
            <div>&bull; <strong>Czech Arms Import:** Israel secretly bought rifles, machine guns, and fighter planes from Czechoslovakia, giving it superior firepower.</div>
            <div>&bull; <strong>IDF Reorganisation:** Ben-Gurion united separate underground groups into one disciplined Israeli Defence Force (IDF).</div>
          </div>

          <div class="pub-card pub-card-amber" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #d97706; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              3. The 1949 Green Line Borders
            </div>
            <div>&bull; <strong>Israel Expands:** Israel won the war and took **79% of the land** (far more than the 55% given by the UN plan).</div>
            <div>&bull; <strong>Jordan &amp; Egypt:** Jordan kept the West Bank and East Jerusalem; Egypt kept the Gaza Strip.</div>
            <div>&bull; <strong>No Palestinian State:** Palestine was completely wiped off the map, divided between Israel, Jordan, and Egypt.</div>
          </div>

          <div class="pub-card pub-card-crimson" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #b91c1c; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              4. The Refugee Crisis (Al-Nakba)
            </div>
            <div>&bull; <strong>700,000 Flee:** Over **700,000 Palestinian Arabs** lost their homes and land, fleeing to neighbouring Arab countries.</div>
            <div>&bull; <strong>UNRWA Camps:** Refugees lived in crowded tent camps, dependent on food rations from the United Nations.</div>
            <div>&bull; <strong>Ongoing Conflict:** Arab states refused to recognise Israel, and displaced Palestinians began cross-border fedayeen raids.</div>
          </div>

        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Page 5 of 20 &bull; 1948 Arab Invasions Atlas</span>
      </div>
    </div>
  `;
}

// Metadata for the 12 Single-Page Specification Cheat Sheets (Pages 6 to 17)
const CME_LESSON_METADATA = {
  1: {
    specTarget:
      'Conflicting British wartime promises (McMahon-Hussein & Balfour Declaration) • British Mandate and Jewish immigration • 1936–39 Arab Revolt • 1939 White Paper limits.',
    stats: [
      { val: '1917', label: 'Balfour Declaration' },
      { val: '1915', label: 'McMahon-Hussein Letters' },
      { val: '15,000 / YR', label: '1939 White Paper Quota' },
      { val: '1936–39', label: 'Arab Revolt Duration' },
    ],
    whyItMatters: [
      'Britain promised the same land to both Arabs and Jews during WW1, giving both sides legal claims.',
      'Rising Jewish immigration during the 1930s caused Arab fear of losing land, leading to violence.',
      'The 1939 White Paper limited immigration just as the Holocaust began, angering both sides.',
    ],
  },
  2: {
    specTarget:
      'End of the British Mandate • Jewish resistance (King David Hotel bombing) • UN Resolution 181 partition plan • Declaration of the State of Israel (14 May 1948) • The 1948–49 War.',
    stats: [
      { val: '22 JULY 1946', label: 'King David Hotel Bombing' },
      { val: '91 DEAD', label: 'Casualties in Bombing' },
      { val: '55% vs 45%', label: 'UN Res 181 Partition Split' },
      { val: '14 MAY 1948', label: 'State of Israel Declared' },
    ],
    whyItMatters: [
      'Attacks by Jewish armed groups and the King David Hotel bombing proved Britain could no longer rule.',
      'UN Resolution 181 gave international approval for a Jewish state, but Arabs rejected losing half their land.',
      'David Ben-Gurion declaring Israel led immediately to five Arab armies invading the next day.',
    ],
  },
  3: {
    specTarget:
      'Territorial changes and the 1949 Green Line • The Palestinian refugee crisis (Al-Nakba) • The Law of Return (1950) • Creation of the IDF • US financial aid to Israel.',
    stats: [
      { val: '700,000+', label: 'Palestinian Refugees (Al-Nakba)' },
      { val: '79% OF LAND', label: 'Israeli Control by 1949' },
      { val: '1950', label: 'Law of Return Passed' },
      { val: '688,000', label: 'New Immigrants by 1951' },
    ],
    whyItMatters: [
      'Over 700,000 Palestinians became permanent refugees in camps, creating an ongoing conflict.',
      'The 1949 armistices created the Green Line borders, but Arab states refused to recognise Israel.',
      'The Law of Return allowed Jewish people worldwide to settle in Israel, doubling its population.',
    ],
  },
  4: {
    specTarget:
      'President Nasser and Pan-Arabism • 1955 Czech Arms Deal • Nationalisation of the Suez Canal (1956) • Secret Sèvres Agreement • Suez War and superpower intervention.',
    stats: [
      { val: '26 JULY 1956', label: 'Nasser Nationalises Suez' },
      { val: 'OCT 1956', label: 'Secret Sèvres Agreement' },
      { val: '100 HOURS', label: 'Israel Sweeps Across Sinai' },
      { val: 'UNEF', label: 'UN Peacekeepers in Sinai' },
    ],
    whyItMatters: [
      'Buying Soviet weapons from Czechoslovakia and taking the canal made Nasser the hero of the Arab world.',
      'The secret attack by Britain, France, and Israel failed when the USA threatened financial ruin.',
      'The crisis showed Britain and France were no longer world powers; the USA and USSR took over.',
    ],
  },
  5: {
    specTarget:
      'Causes of the Six-Day War • 1964 Cairo Conference & creation of the PLO • Water Wars & Fatah raids • Samu Raid (1966) & April 1967 dogfight • Closure of the Straits of Tiran.',
    stats: [
      { val: 'JAN 1964', label: 'Cairo Conference (PLO Created)' },
      { val: 'NOV 1966', label: 'Samu Reprisal Raid' },
      { val: '6 JETS', label: 'Syrian MiGs Downed (Apr 67)' },
      { val: '22 MAY 1967', label: 'Straits of Tiran Closed' },
    ],
    whyItMatters: [
      'Disputes over River Jordan water and guerrilla raids pushed Israel and Syria into open fighting.',
      'The Samu Raid and the downing of 6 Syrian planes humiliated Arab leaders and increased pressure for war.',
      "Closing the Straits of Tiran cut off Israel's oil supply, giving Israel the reason to strike first.",
    ],
  },
  6: {
    specTarget:
      'Operation Focus surprise air strike (5 June 1967) • The three fronts: Sinai, West Bank/Jerusalem, and Golan Heights • Reasons for swift Israeli victory.',
    stats: [
      { val: '5–10 JUNE', label: '1967 War Duration (6 Days)' },
      { val: '300+ JETS', label: 'Egyptian Air Force Destroyed' },
      { val: '7 JUNE 1967', label: 'Western Wall Captured' },
      { val: '3x EXPANSION', label: 'Israeli Territory Tripled' },
    ],
    whyItMatters: [
      "Wiping out Egypt's air force in three hours gave Israel complete control of the skies on all fronts.",
      'Capturing East Jerusalem reunited the city under Israeli control and secured holy Jewish sites.',
      'Taking the Golan Heights stopped Syrian artillery shelling Israeli farms in the Galilee valley below.',
    ],
  },
  7: {
    specTarget:
      'Territorial results: Sinai, Gaza, West Bank, Golan Heights, East Jerusalem • 1 million Palestinians under military rule • Khartoum Conference "Three Noes" • UN Resolution 242.',
    stats: [
      { val: '1 MILLION', label: 'Palestinians Under IDF Rule' },
      { val: 'THREE NOs', label: 'Khartoum Arab Pledge' },
      { val: 'RES 242', label: 'UN Land for Peace Formula' },
      { val: '300,000', label: 'New Refugees Flee to Jordan' },
    ],
    whyItMatters: [
      'Controlling the occupied territories gave Israel security buffers, but left 1 million Palestinians stateless.',
      'The "Three Noes" at Khartoum blocked all direct peace talks between Arab states and Israel.',
      'UN Resolution 242 became the basis of all future peace plans: give up occupied land in return for peace.',
    ],
  },
  8: {
    specTarget:
      "Rise of Palestinian resistance • Yasser Arafat and the PLO • Battle of Karameh (1968) • PFLP plane hijackings & Dawson's Field (1970) • Black September • Munich Olympics (1972).",
    stats: [
      { val: 'MARCH 1968', label: 'Battle of Karameh' },
      { val: 'SEPT 1970', label: "Dawson's Field Hijackings" },
      { val: '1970', label: 'Black September in Jordan' },
      { val: '11 KILLED', label: 'Israeli Athletes at Munich' },
    ],
    whyItMatters: [
      'Karameh proved Palestinians could fight for themselves, making Yasser Arafat the leader of the movement.',
      'Hijackings and violence caused King Hussein to expel the PLO from Jordan into southern Lebanon.',
      'The Munich Olympics massacre shocked the world and led Israel to launch assassination squads against killers.',
    ],
  },
  9: {
    specTarget:
      'The War of Attrition (1969–70) • Causes of the 1973 Yom Kippur War • Operation Badr and Bar-Lev Line breach • Superpower airlifts • The OPEC oil embargo.',
    stats: [
      { val: '6 OCT 1973', label: 'Yom Kippur Surprise Attack' },
      { val: '80,000 MEN', label: 'Crossed the Suez Canal' },
      { val: '4x INCREASE', label: 'OPEC Oil Price Hike' },
      { val: '25 OCT 1973', label: 'UN Ceasefire Agreed' },
    ],
    whyItMatters: [
      'President Sadat attacked to shatter the stalemate and force the USA to negotiate the return of Sinai.',
      'Crossing the canal and breaking the Bar-Lev Line restored Arab pride after the humiliation of 1967.',
      'The Arab oil embargo proved oil could be used as a political weapon against Western economies.',
    ],
  },
  10: {
    specTarget:
      "Kissinger and shuttle diplomacy (1974–75) • Reopening of the Suez Canal (1975) • Sadat's visit to Jerusalem (1977) • Camp David Accords (1978) • Treaty of Washington (1979).",
    stats: [
      { val: '19 NOV 1977', label: 'Sadat Visits Jerusalem' },
      { val: '13 DAYS', label: 'Camp David Summit (1978)' },
      { val: '26 MAR 1979', label: 'Treaty of Washington Signed' },
      { val: '6 OCT 1981', label: 'Sadat Assassinated in Cairo' },
    ],
    whyItMatters: [
      "Sadat's visit to Jerusalem broke 30 years of Arab boycott and proved Egypt genuinely wanted peace.",
      'The Treaty of Washington returned all of Sinai to Egypt; Egypt was the first Arab nation to recognise Israel.',
      'Arab nations boycotted Egypt, and Islamic extremists assassinated Sadat for signing the peace treaty.',
    ],
  },
  11: {
    specTarget:
      '1982 Israeli invasion of Lebanon (Operation Peace for Galilee) • Siege of Beirut & evacuation of PLO • Sabra and Shatila massacres • The First Intifada (1987–93) and "iron fist" policy.',
    stats: [
      { val: '6 JUNE 1982', label: 'Invasion of Lebanon Begins' },
      { val: '14,000', label: 'PLO Fighters Leave for Tunis' },
      { val: 'SEPT 1982', label: 'Sabra & Shatila Massacres' },
      { val: 'DEC 1987', label: 'First Intifada Starts' },
    ],
    whyItMatters: [
      'The Lebanon War expelled the PLO to Tunisia, but led to the rise of more militant groups like Hezbollah.',
      "The Sabra and Shatila massacres forced Defence Minister Ariel Sharon to resign and damaged Israel's image.",
      'The First Intifada proved Palestinians in the occupied lands would resist, forcing Israel to consider talks.',
    ],
  },
  12: {
    specTarget:
      'Arafat renounces terrorism (1988) • Madrid Conference (1991) • Secret Oslo talks • Oslo I Accord (1993) & White House handshake • Oslo II (1995) • Assassination of Yitzhak Rabin.',
    stats: [
      { val: '13 SEPT 1993', label: 'Oslo I White House Handshake' },
      { val: 'OCT 1994', label: 'Jordan-Israel Peace Treaty' },
      { val: 'AREAS A, B, C', label: 'Oslo II Division of West Bank' },
      { val: '4 NOV 1995', label: 'Yitzhak Rabin Assassinated' },
    ],
    whyItMatters: [
      'The Oslo Accords created mutual recognition and established the Palestinian Authority in Gaza and Jericho.',
      'Oslo II divided the West Bank into separate zones, leaving Israel in military control of over 70% of the land.',
      "Rabin's assassination by a Jewish extremist and Hamas suicide bus bombings severely derailed the peace process.",
    ],
  },
};

// 1-Page Master Specification Cheat Sheet (Pages 6 to 17)
function renderSpecificationCheatSheet(spread, pageNum) {
  const left = spread.left;
  const right = spread.right;
  const lessonIdx = pageNum - 5; // Page 6 is Lesson 1, Page 17 is Lesson 12
  const meta = CME_LESSON_METADATA[lessonIdx] || {
    specTarget: spread.title,
    stats: [
      { val: 'KEY FACT 1', label: 'Crucial Statistic' },
      { val: 'KEY FACT 2', label: 'Crucial Statistic' },
      { val: 'KEY FACT 3', label: 'Crucial Statistic' },
      { val: 'KEY FACT 4', label: 'Crucial Statistic' },
    ],
    whyItMatters: [
      'Core causal factor for exam answers.',
      'Crucial turning point in the conflict.',
      'Long-term consequence for Middle East peace.',
    ],
  };

  // Section 1: 3 Pillars (Side-by-Side 3 Columns)
  const cardThemes = ['pub-card-blue', 'pub-card-navy', 'pub-card-blue'];
  const titleColors = ['#0284c7', '#1e3a8a', '#0369a1'];
  const pillarsHtml = left.pillars
    .map(
      (p, idx) => `
    <div class="pub-card ${cardThemes[idx % 3]}" style="padding: 6px 8px; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="font-size: 8.8pt; font-weight: 800; text-transform: uppercase; color: ${titleColors[idx % 3]}; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 2px;">
          ${idx + 1}. ${p.title}
        </div>
        <div style="font-size: 7.6pt; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.2px;">
          ${p.subtitle}
        </div>
        <ul style="margin: 0; padding-left: 13px; font-size: 8.0pt; color: #1e293b; line-height: 1.28;">
          ${p.bullets
            .slice(0, 3)
            .map((b) => `<li style="margin-bottom: 3px;">${formatMd(b)}</li>`)
            .join('')}
        </ul>
      </div>
      <div style="background: #f8fafc; border-top: 1px dashed #cbd5e1; border-radius: 2px; margin-top: 5px; padding: 3px 5px; font-size: 7.5pt; line-height: 1.22; color: #0f172a;">
        <strong style="color: #0369a1;">⚡ Why It Matters:</strong> ${meta.whyItMatters[idx] || ''}
      </div>
    </div>
  `,
    )
    .join('');

  // Section 2: Step-by-Step Story (Narrative Account & Q2 Guide)
  const stepBadges = [
    { cls: 'badge-blue', label: '1. TRIGGER' },
    { cls: 'badge-amber', label: '2. ESCALATION' },
    { cls: 'badge-crimson', label: '3. KEY EVENT' },
    { cls: 'badge-navy', label: '4. OUTCOME' },
  ];
  const pathwayHtml = right.causalPathway
    .map((p, i) => {
      const badge = stepBadges[i] || { cls: 'badge-navy', label: `STEP ${i + 1}` };
      const stageClean = (p.stage || '').replace(/^\d+[\.\s]*/, '');
      return `
    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 6px; font-size: 7.6pt; line-height: 1.24; display: flex; flex-direction: column; justify-content: flex-start; box-shadow: 0 1px 2px rgba(0,0,0,0.02); min-width: 0;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px; min-width: 0;">
        <span class="${badge.cls}" style="font-size: 6.8pt; font-weight: 800; padding: 1px 4px; flex-shrink: 0;">
          ${badge.label}
        </span>
        <strong style="color: #0f172a; font-size: 7.4pt; text-transform: uppercase; margin-left: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;">
          ${stageClean}
        </strong>
      </div>
      <div style="color: #334155; font-size: 7.5pt;">
        ${formatMd(p.text || p.desc || '')}
      </div>
    </div>
  `;
    })
    .join('');

  // Section 3 Left: Key Facts & Dates to Memorise + Key Words to Know
  const statsHtml = meta.stats
    .map(
      (s) => `
    <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; padding: 3px 4px; text-align: center;">
      <div style="font-size: 10.0pt; font-weight: 900; color: #0369a1; line-height: 1.1; letter-spacing: -0.2px;">${s.val}</div>
      <div style="font-size: 6.8pt; font-weight: 700; color: #475569; text-transform: uppercase; line-height: 1.1; margin-top: 1px;">${s.label}</div>
    </div>
  `,
    )
    .join('');

  const vocabWords = right.masterWordBank.slice(0, 4);
  const vocabHtml = vocabWords
    .map(
      (w) => `
    <div style="font-size: 7.4pt; line-height: 1.22; color: #1e293b; display: flex; align-items: baseline; gap: 4px;">
      <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 7.0pt; padding: 1px 5px; border-radius: 2px; text-transform: uppercase; white-space: nowrap; border: 1px solid #bae6fd; flex-shrink: 0;">
        ${w.term}
      </span>
      <span>${formatMd(w.def)}</span>
    </div>
  `,
    )
    .join('');

  // Section 3 Right: Key Evidence & Key People
  const source = left.archivalSource;
  const figures = left.keyFigures.slice(0, 4);
  const figuresHtml = figures
    .map(
      (f) => `
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 3px 5px;">
      <strong style="color: #0f172a; display: block; font-size: 7.7pt;">${f.name}</strong>
      <span style="font-size: 7.1pt; color: #475569; line-height: 1.16; display: block;">${f.role}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${pageNum}" data-page="${pageNum}">
      
      <!-- 1. Header Strip -->
      <div class="page-header" style="margin-bottom: 5px; padding-bottom: 3px;">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">${spread.topic}</span>
          <h2 style="font-size: 13.0pt; font-weight: 900; color: #0f172a; margin: 1px 0 0 0; line-height: 1.15; text-transform: uppercase;">${spread.title}</h2>
        </div>
        <div style="text-align: right; white-space: nowrap;">
          <span class="badge-navy" style="font-size: 8.0pt; padding: 2px 7px;">Specification Cheat Sheet</span>
          <div style="font-size: 7.6pt; color: #475569; font-weight: 700; margin-top: 1px;">Lesson ${lessonIdx} Revision</div>
        </div>
      </div>

      <!-- 2. Page Body Flex Stretch Container -->
      <div class="page-body-stretch">
        
        <!-- Specification Focus Ribbon -->
        <div style="background: #f0f9ff; border: 1.2px solid #bae6fd; border-left: 4px solid #0284c7; border-radius: 3px; padding: 4px 8px; font-size: 7.7pt; line-height: 1.24; color: #0c4a6e;">
          <strong>📋 OFFICIAL SPECIFICATION FOCUS:</strong> ${meta.specTarget}
        </div>

        <!-- Three Core Knowledge Cards (3-Col Grid) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; flex: 1.15; min-height: 0;">
          ${pillarsHtml}
        </div>

        <!-- Step-by-Step Story (Narrative Account & Q2 Guide) -->
        <div class="pub-card pub-card-navy" style="padding: 5px 7px; flex: 0.95; display: flex; flex-direction: column; justify-content: space-between; min-height: 0;">
          <div style="font-size: 8.0pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; display: flex; justify-content: space-between; align-items: center;">
            <span>🔗 Step-by-Step: What Happened &amp; Why (Narrative Account &bull; Q2 Guide)</span>
            <span style="font-size: 7.2pt; font-weight: 700; color: #0284c7;">1. Trigger ➔ 2. Escalation ➔ 3. Key Event ➔ 4. Outcome</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 5px; flex: 1;">
            ${pathwayHtml}
          </div>
        </div>

        <!-- Lower-Ability Support Split Container -->
        <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 6px; flex: 1.05; min-height: 0;">
          
          <!-- Left: Key Facts & Key Words -->
          <div class="pub-card" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
             <div>
               <div style="font-size: 8.0pt; font-weight: 800; text-transform: uppercase; color: #0284c7; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
                 <span>🧠 Key Facts &amp; Dates to Memorise</span>
                 <span style="font-size: 7.0pt; color: #64748b;">Essential Knowledge</span>
               </div>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 4px;">
                 ${statsHtml}
               </div>
             </div>
             <div style="border-top: 1px dashed #cbd5e1; padding-top: 3px; display: flex; flex-direction: column; gap: 2.5px;">
               ${vocabHtml}
             </div>
          </div>

          <!-- Right: Key Evidence & Key People -->
          <div class="pub-card" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
             <!-- Primary Quote -->
             <div style="background: #fffbeb; border: 1px solid #fde68a; border-left: 3.5px solid #d97706; border-radius: 3px; padding: 4px 6px; margin-bottom: 3px;">
               <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #fef3c7; padding-bottom: 1px;">
                 <strong style="font-size: 7.4pt; text-transform: uppercase; color: #92400e;">📜 KEY HISTORICAL EVIDENCE:</strong>
                 <span style="font-size: 7.0pt; color: #78350f; font-weight: 700;">${source.citation}</span>
               </div>
               <div style="font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 7.8pt; color: #1e293b; line-height: 1.22; margin: 2px 0;">
                 "${source.quote}"
               </div>
               <div style="font-size: 7.1pt; color: #92400e; line-height: 1.18; background: rgba(254, 243, 199, 0.7); padding: 2px 4px; border-radius: 2px;">
                 <strong>💡 What This Shows:</strong> ${source.significance}
               </div>
             </div>

             <!-- Key People (4 Figures) -->
             <div>
               <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                 👥 Key People
               </div>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                 ${figuresHtml}
               </div>
             </div>
          </div>

        </div>

      </div>

      <!-- 3. Page Footer -->
      <div class="page-footer" style="padding-top: 2px; margin-top: auto;">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Page ${pageNum} of 20 &bull; Specification Cheat Sheet</span>
      </div>
    </div>
  `;
}

// Page 18: 1967 Six-Day War Atlas
function renderPage18() {
  const mapUri = getImageDataUri('images/cme_1967_six_day_war_map.png');
  return `
    <div class="page" id="page_18" data-page="18">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Cartographic Atlas 2 &bull; The June 1967 Blitzkrieg
          </span>
          <h2 style="font-size: 13.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase; color: #0f172a;">
            The 1967 Six-Day War &amp; The Occupied Territories
          </h2>
        </div>
        <span class="badge-blue" style="font-size: 8.0pt; padding: 2px 8px;">
          Map Atlas 2
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- Map Container -->
        <div class="pub-card" style="padding: 4px; background: #ffffff; flex: 1.35; display: flex; align-items: center; justify-content: center; min-height: 0;">
          <div style="width: 100%; height: 100%; min-height: 590px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="${mapUri}" alt="1967 Six Day War Map" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;" />
          </div>
        </div>

        <!-- 4-Quadrant Analysis -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 7.7pt; line-height: 1.25; flex: 0.85; min-height: 0;">
          
          <div class="pub-card pub-card-blue" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #0369a1; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              1. Operation Focus: The Dawn Air Strike
            </div>
            <div>&bull; <strong>Surprise Strike (5 June):</strong> At 7:45 AM, 200 Israeli jets flew low under Egyptian radar over the Mediterranean Sea.</div>
            <div>&bull; <strong>300+ Planes Destroyed:</strong> In 3 hours, Israel wiped out the Egyptian air force on the ground, winning complete control of the skies.</div>
            <div>&bull; <strong>Decisive Advantage:</strong> Without air protection, ground armies from Egypt, Jordan, and Syria could not defend themselves.</div>
          </div>

          <div class="pub-card pub-card-navy" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              2. Fighting on Three Fronts
            </div>
            <div>&bull; <strong>Sinai Front:</strong> Israeli tanks smashed through Egyptian lines, reaching the Suez Canal in four days and capturing all of Sinai.</div>
            <div>&bull; <strong>Jerusalem &amp; West Bank:</strong> Israeli paratroopers captured East Jerusalem and the Western Wall on 7 June, taking the West Bank from Jordan.</div>
            <div>&bull; <strong>Golan Heights:</strong> On 9–10 June, Israeli forces stormed Syrian bunker positions on the high cliffs of the Golan Heights.</div>
          </div>

          <div class="pub-card pub-card-amber" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #d97706; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              3. The Occupied Territories
            </div>
            <div>&bull; <strong>Territory Tripled:</strong> Israel captured 70,000 sq km: the Sinai Desert, Gaza Strip, West Bank, East Jerusalem, and Golan Heights.</div>
            <div>&bull; <strong>1 Million Palestinians:</strong> Israel was now in military control of over 1 million Palestinian Arabs living in the West Bank and Gaza.</div>
            <div>&bull; <strong>Strategic Buffers:</strong> Israel gained natural barriers (Suez Canal, River Jordan, Golan Heights) to protect its heartland.</div>
          </div>

          <div class="pub-card pub-card-crimson" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #b91c1c; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              4. Diplomatic Results
            </div>
            <div>&bull; <strong>Khartoum "Three Noes":</strong> Arab leaders refused to make peace, recognize Israel, or negotiate with Israel.</div>
            <div>&bull; <strong>UN Resolution 242:</strong> Called for "Land for Peace" (Israel returns occupied land in return for Arab recognition and security).</div>
            <div>&bull; <strong>Rise of the PLO:</strong> Humiliated Arab armies lost credibility; Palestinians turned to Yasser Arafat's PLO to fight for themselves.</div>
          </div>

        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Page 18 of 20 &bull; 1967 Six-Day War Atlas</span>
      </div>
    </div>
  `;
}

// Page 19: 1995 Oslo II Atlas
function renderPage19() {
  const mapUri = getImageDataUri('images/cme_oslo_areas_map.png');
  return `
    <div class="page" id="page_19" data-page="19">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Cartographic Atlas 2 &bull; The Oslo Peace Process (1993–1995)
          </span>
          <h2 style="font-size: 13.5pt; font-weight: 900; margin: 1px 0 0 0; text-transform: uppercase; color: #0f172a;">
            The 1995 Oslo II Division: Areas A, B, and C
          </h2>
        </div>
        <span class="badge-blue" style="font-size: 8.0pt; padding: 2px 8px;">
          Map Atlas 2
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- Map Container -->
        <div class="pub-card" style="padding: 4px; background: #ffffff; flex: 1.35; display: flex; align-items: center; justify-content: center; min-height: 0;">
          <div style="width: 100%; height: 100%; min-height: 590px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="${mapUri}" alt="1995 Oslo II Areas A B C Map" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;" />
          </div>
        </div>

        <!-- 4-Quadrant Analysis -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 7.7pt; line-height: 1.25; flex: 0.85; min-height: 0;">
          
          <div class="pub-card pub-card-blue" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #0369a1; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              1. Area A: Full Palestinian Control (~3%)
            </div>
            <div>&bull; <strong>Towns &amp; Cities:</strong> Included 8 major Palestinian cities: Ramallah, Nablus, Jenin, Bethlehem, Jericho, Qalqilya, Tulkarm, and parts of Hebron.</div>
            <div>&bull; <strong>Palestinian Authority:</strong> The PNA had full control over civil affairs (schools, police, hospitals).</div>
            <div>&bull; <strong>Islands of Control:</strong> Area A formed separate, disconnected islands surrounded by Israeli-controlled roads.</div>
          </div>

          <div class="pub-card pub-card-navy" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              2. Area B: Shared Control (~25%)
            </div>
            <div>&bull; <strong>Villages:</strong> Included approximately 450 Palestinian villages across the West Bank.</div>
            <div>&bull; <strong>Shared Responsibility:</strong> The Palestinian Authority handled civil matters, but the Israeli military maintained security control.</div>
            <div>&bull; <strong>Checkpoints:</strong> Israeli soldiers could enter Area B at any time to arrest suspects, and set up military checkpoints.</div>
          </div>

          <div class="pub-card pub-card-amber" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #d97706; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              3. Area C: Full Israeli Control (~72%)
            </div>
            <div>&bull; <strong>Majority of Land:</strong> Israel kept total civil and military control over nearly three-quarters of the West Bank.</div>
            <div>&bull; <strong>Jewish Settlements:</strong> Encompassed all 130+ Jewish settlements, major roads, water resources, and the Jordan Valley border.</div>
            <div>&bull; <strong>Settler Population:</strong> Increased rapidly from 110,000 to over 200,000 during the 1990s peace talks, creating deep anger.</div>
          </div>

          <div class="pub-card pub-card-crimson" style="padding: 5px 7px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-weight: 800; text-transform: uppercase; color: #b91c1c; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px; font-size: 7.9pt;">
              4. Why the Peace Process Failed
            </div>
            <div>&bull; <strong>Difficult Issues Postponed:</strong> Oslo delayed the hardest problems: the status of Jerusalem, refugee return, and final borders.</div>
            <div>&bull; <strong>Extremist Violence:</strong> Militant Islamic group Hamas launched suicide bus bombings inside Israel to destroy the peace process.</div>
            <div>&bull; <strong>Rabin Assassinated:</strong> On 4 November 1995, Israeli PM Yitzhak Rabin was shot dead by a Jewish extremist opposed to Oslo.</div>
          </div>

        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Page 19 of 20 &bull; 1995 Oslo II Atlas</span>
      </div>
    </div>
  `;
}

// Page 20: Master Revision Summary & Paper 2 Exam Strategy
function renderPage20() {
  return `
    <div class="page" id="page_20" data-page="20">
      <div class="page-header">
        <div>
          <span style="font-size: 8.5pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px;">
            Paper 2 Master Revision &bull; Summary &amp; Exam Strategy
          </span>
          <h2 style="font-size: 14.0pt; font-weight: 900; color: #0f172a; margin: 1px 0 0 0; text-transform: uppercase;">
            Conflict in the Middle East: Master Revision &amp; Exam Checklist
          </h2>
        </div>
        <span class="badge-navy" style="font-size: 8.0pt; padding: 2px 8px;">
          Final Summary
        </span>
      </div>

      <div class="page-body-stretch">
        
        <!-- 1. The Six Key Turning Points -->
        <div class="pub-card pub-card-blue" style="padding: 5px 8px; flex: 1.05; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #0369a1; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>The Six Key Turning Points of the Conflict (1945–1995)</span>
            <span style="font-size: 7.4pt; color: #64748b;">Must-Know Historical Milestones</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 7.4pt; line-height: 1.25; color: #1e293b; flex: 1;">
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #0369a1; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">1. 1948–49 War &amp; Al-Nakba</strong>
              Israel declared independence; five Arab armies invaded. Israel won and expanded to 79% of land. Over 700,000 Palestinian Arabs became refugees in UNRWA camps.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #1e3a8a; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">2. 1956 Suez Crisis</strong>
              Nasser nationalised the Suez Canal. Britain, France, and Israel secretly attacked Egypt. US President Eisenhower forced them to withdraw, ending British imperial power.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #0369a1; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">3. 1967 Six-Day War</strong>
              Israel destroyed Egypt's air force in a surprise strike and captured Sinai, Gaza, West Bank, Golan, and East Jerusalem. UN passed Resolution 242 ('Land for Peace').
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #d97706; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">4. 1973 Yom Kippur War</strong>
              Egypt and Syria launched a surprise attack on Yom Kippur, crossing the Suez Canal. Arab oil states launched an oil embargo, quadrupling prices and forcing peace talks.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #b91c1c; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">5. 1979 Treaty of Washington</strong>
              Sadat visited Jerusalem in 1977. Carter hosted Camp David (1978). Egypt became the first Arab state to recognise Israel, reclaiming Sinai; Sadat was assassinated in 1981.
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 4px 5px;">
              <strong style="color: #15803d; display: block; border-bottom: 1px dashed #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">6. 1993 Oslo I Accords</strong>
              After the 1987 Intifada, secret talks led to the White House handshake between Rabin and Arafat. The Palestinian Authority was set up, but Rabin was murdered in 1995.
            </div>

          </div>
        </div>

        <!-- 2. Essential Exam Vocabulary Match -->
        <div class="pub-card pub-card-navy" style="padding: 5px 8px; flex: 1.05; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>12 Key Words You Must Know for the Exam</span>
            <span style="font-size: 7.4pt; color: #0369a1;">Quick Glossary</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-size: 7.3pt; line-height: 1.24; color: #1e293b; flex: 1;">
            <div>&bull; <strong>Mandate:</strong> British control over Palestine (1920–48).</div>
            <div>&bull; <strong>Zionism:</strong> Movement for a Jewish homeland in Palestine.</div>
            <div>&bull; <strong>Al-Nakba:</strong> Arabic for 'Catastrophe' (1948 refugees).</div>
            <div>&bull; <strong>Green Line:</strong> The 1949 armistice borders of Israel.</div>
            <div>&bull; <strong>Nationalisation:</strong> Government takeover of the Suez Canal.</div>
            <div>&bull; <strong>UNEF:</strong> UN Emergency Force peacekeepers in Sinai.</div>
            <div>&bull; <strong>UN Res 242:</strong> 1967 'Land for Peace' formula.</div>
            <div>&bull; <strong>Fedayeen:</strong> Armed Palestinian guerrilla fighters.</div>
            <div>&bull; <strong>Bar-Lev Line:</strong> Israeli sand-wall forts along Suez.</div>
            <div>&bull; <strong>Shuttle Diplomacy:</strong> Kissinger flying between capitals.</div>
            <div>&bull; <strong>First Intifada:</strong> 1987–93 Palestinian stone-throwing uprising.</div>
            <div>&bull; <strong>Oslo Accords:</strong> 1993–95 peace deals creating Palestinian rule.</div>
          </div>
        </div>

        <!-- 3. Paper 2 Exam Day Tactical Checklist -->
        <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #0284c7; border-radius: 4px; padding: 5px 8px; font-size: 7.5pt; line-height: 1.25; color: #1e293b; flex: 0.9; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 2px; font-size: 7.8pt; display: flex; justify-content: space-between;">
            <span>🎯 Paper 2 Exam Day Golden Rules (50 Minutes Period Study Allocation)</span>
            <span style="color: #0369a1;">Pacing Guide</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <div>&bull; <strong>Question 1 (4 marks &bull; 6 mins):</strong> State your consequence in line 1. Give 2 facts. Explain the result. Do not write a second consequence!</div>
            <div>&bull; <strong>Question 2 (8 marks &bull; 14 mins):</strong> Write 3 paragraphs in chronological order (Beginning ➔ Turning Point ➔ Outcome). Use linking words in every paragraph.</div>
            <div>&bull; <strong>Question 3 (16 marks &bull; 24 mins):</strong> Strictly choose TWO questions (e.g. 3a and 3b). Write 2 paragraphs for each: immediate impact vs long-term impact on peace.</div>
            <div>&bull; <strong>Timing Guardrail:</strong> Stop writing at exactly 50 minutes. Protect your British Depth study allocation!</div>
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Master Revision Summary &bull; Page 20 of 20</span>
      </div>
    </div>
  `;
}

// Backwards compatibility aliases
function renderPage36() {
  return renderPage20();
}
function renderPage30() {
  return renderPage14();
}
function renderPage31() {
  return renderPage25();
}
function renderPage32() {
  return renderPage36();
}
function renderPage14() {
  return renderPage20();
}
function renderPage15() {
  return renderPage20();
}
function renderPage24() {
  return renderPage20();
}
function renderPage25() {
  return renderPage20();
}
function renderPage34() {
  return renderPage20();
}
function renderPage35() {
  return renderPage20();
}
function renderSpreadLeft() {
  return '';
}
function renderSpreadRight() {
  return '';
}

module.exports = {
  getStyles,
  renderPage1,
  renderPage2,
  renderPage3,
  renderPage4,
  renderPage5,
  renderSpecificationCheatSheet,
  renderPage18,
  renderPage19,
  renderPage20,
  renderPage14,
  renderPage15,
  renderPage24,
  renderPage25,
  renderPage34,
  renderPage35,
  renderPage36,
  renderSpreadLeft,
  renderSpreadRight,
  renderPage30,
  renderPage31,
  renderPage32,
  renderPage28: renderPage36,
  getImageDataUri,
};
