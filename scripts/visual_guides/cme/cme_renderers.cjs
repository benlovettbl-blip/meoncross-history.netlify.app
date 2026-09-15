/**
 * cme_renderers.cjs
 *
 * Common layout renderers and high-contrast monochrome styles for
 * Edexcel GCSE History Paper 2: Conflict in the Middle East, 1945–1995 (Option P5).
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
  return imgPath;
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
    color: #000000;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 794px; height: 1123px; max-height: 1123px;
    overflow: hidden; page-break-after: always;
    padding: 18px 22px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: #ffffff;
  }
  .page:last-child { page-break-after: avoid; }
  
  .cover-border {
    border: 2.5px solid #000000;
    padding: 14px 16px;
    height: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
  }

  .page-header {
    border-bottom: 2px solid #000000;
    padding-bottom: 4px; margin-bottom: 6px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .page-footer {
    border-top: 1.5px solid #000000;
    padding-top: 4px; margin-top: 6px;
    display: flex; justify-content: space-between;
    font-size: 7.2pt; font-weight: 700; color: #475569;
  }

  .wb-pill {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid #334155;
    color: #000000;
    font-size: 6.8pt; font-weight: 800; padding: 1px 4px;
    border-radius: 2px;
    margin-right: 4px;
  }
`;
}

function renderPage1(customGetImage) {
  const getImg = customGetImage || getImageDataUri;
  const unrwaImgUri = getImg('images/nakba_unrwa_women_bread_1948.jpg');
  const rubingerImgUri = getImg('images/israeli_troops_wall.jpg');

  return `
    <div class="page" id="page_1" data-page="1">
      <div class="cover-border">
        
        <!-- 1. PUPIL DETAILS BOX (VERY TOP AS REQUESTED) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 10px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 8.2pt; color: #000000;">
          <div style="flex: 1; display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; font-size: 8.2pt; color: #000000; margin-right: 8px; letter-spacing: 0.4px;">Candidate Name:</strong>
            <span style="border-bottom: 1.4px solid #000000; flex: 1; height: 15px; margin-right: 14px;"></span>
          </div>
          <div style="display: flex; gap: 12px; font-size: 7.8pt; color: #1e293b; white-space: nowrap;">
            <span><strong>Class:</strong> Year 10 / 11</span>
            <span><strong>Teacher:</strong> Mr Lovett</span>
            <span><strong>Target:</strong> Grade 7–9</span>
          </div>
        </div>

        <!-- 2. TOP HEADER STRIP & MAIN TITLE -->
        <div>
          <div style="border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 8.0pt; font-weight: 800; letter-spacing: 0.6px; color: #000000; text-transform: uppercase;">
              PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5
            </span>
            <span style="font-size: 7.6pt; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.4px;">
              1HI0/P5 &bull; Period Study Specification Guide
            </span>
          </div>

          <div style="text-align: center; margin: 2px 0 6px 0;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 21pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.1;">
              Conflict in the Middle East, 1945–1995
            </h1>
            <div style="font-family: 'Playfair Display', serif; font-size: 11pt; font-weight: 700; color: #1e293b; margin: 0 0 5px 0;">
              Visual Revision Masterclasses &amp; Complete Specification Guide
            </div>
            <div style="display: flex; justify-content: center; gap: 8px; font-size: 7.4pt; font-weight: 700; color: #000000; text-transform: uppercase;">
              <span style="background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">Paper 2: Period Study</span>
              <span style="background: #f1f5f9; color: #000000; padding: 2px 8px; border-radius: 2px; border: 1.2px solid #000000;">Time: 50 Minutes</span>
              <span style="background: #f1f5f9; color: #000000; padding: 2px 8px; border-radius: 2px; border: 1.2px solid #000000;">Total: 32 Raw Marks</span>
              <span style="background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">28-Page Master Volume</span>
            </div>
          </div>
        </div>

        <!-- 3. DUAL ARCHIVAL PLATES (SIDE-BY-SIDE INTEGRATED DESIGN, 0 CUTOFF) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 7px; background: #fafafa;">
          <div style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 0.5px; margin-bottom: 5px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px;">
            Dual Primary Archival Plates: Two Defining Turning Points of Conflict in the Middle East
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            
            <!-- Left Plate: 1948 Al-Nakba -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 5px; border-radius: 2px; display: flex; gap: 8px;">
              <div style="width: 102px; height: 96px; flex-shrink: 0; background: #f8fafc; border: 1px solid #000000; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="${unrwaImgUri}" alt="1948 Nakba" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(100%); display: block;" />
              </div>
              <div style="flex: 1; font-size: 6.8pt; color: #1e293b; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-size: 7.0pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">
                    1. The 1948 Al-Nakba (Catastrophe)
                  </div>
                  <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 6.9pt; font-weight: 700; font-style: italic; color: #000000; margin-bottom: 2px;">
                    "Refugee mother &amp; daughter with bread rations outside shelter tent (1948)"
                  </div>
                  <div><strong>Archive Citation:</strong> UNRWA / UNRPR Historic Archive, ID: I0000l5SkmJo1hLc.</div>
                </div>
                <div style="color: #334155; font-size: 6.5pt;">
                  <strong>Context:</strong> Over 700,000 Palestinian Arabs were displaced during the 1948 war, creating the unresolved refugee crisis.
                </div>
              </div>
            </div>

            <!-- Right Plate: 1967 Western Wall Victory -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 5px; border-radius: 2px; display: flex; gap: 8px;">
              <div style="width: 102px; height: 96px; flex-shrink: 0; background: #f8fafc; border: 1px solid #000000; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="${rubingerImgUri}" alt="1967 Western Wall Victory" style="max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(100%); display: block;" />
              </div>
              <div style="flex: 1; font-size: 6.8pt; color: #1e293b; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-size: 7.0pt; font-weight: 800; text-transform: uppercase; color: #000000; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">
                    2. The 1967 Western Wall Victory
                  </div>
                  <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 6.9pt; font-weight: 700; font-style: italic; color: #000000; margin-bottom: 2px;">
                    "Paratroopers at the Western Wall, Jerusalem (7 June 1967)"
                  </div>
                  <div><strong>Photo:</strong> David Rubinger (1924–2017) &bull; Israel GPO Collection.</div>
                </div>
                <div style="color: #334155; font-size: 6.5pt;">
                  <strong>Context:</strong> Paratroopers Zion Karasenti, Yitzhak Yifat &amp; Haim Oshri gaze up at the Western Wall, symbolizing the 1967 conquest.
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- 4. THE THREE EXAM QUESTION TYPES BREAKDOWN -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 1: Consequence</span>
              <span style="color: #000000;">4+4 = 8m</span>
            </div>
            <p style="font-size: 6.6pt; color: #1e293b; line-height: 1.25; margin: 2px 0 0 0;">
              Answer <strong>BOTH 1(a) and 1(b)</strong> (~6 mins each). State ONE consequence &rarr; Support with precise facts &rarr; Trace direct causal link. Zero source evaluation.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 2: Narrative</span>
              <span style="color: #000000;">8m</span>
            </div>
            <p style="font-size: 6.6pt; color: #1e293b; line-height: 1.25; margin: 2px 0 0 0;">
              Compulsory continuous prose (~12 mins). 3-act structure: <strong>Beginning &rarr; Turning Point &rarr; Outcome</strong>. Must include own knowledge beyond stimulus.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 3: Importance</span>
              <span style="color: #000000;">8+8 = 16m</span>
            </div>
            <p style="font-size: 6.6pt; color: #1e293b; line-height: 1.25; margin: 2px 0 0 0;">
              Choose <strong>TWO from 3(a), 3(b), 3(c)</strong> (~12 mins each). Write 2 explanatory paragraphs analyzing short-term impact vs long-term consequence.
            </p>
          </div>
        </div>

        <!-- 5. ENLARGED FULL SPECIFICATION CURRICULUM CHECKLIST (3 COLUMNS) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-top: 2px;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 6px; text-align: center; border-bottom: 1.4px solid #000000; padding-bottom: 3px; letter-spacing: 0.5px;">
            ★ Official Pearson Edexcel GCSE Specification Curriculum Checklist (Option P5)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 8.2pt; line-height: 1.40; color: #0f172a; flex: 1;">
            
            <!-- Column 1: KT1 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 8px;">
              <div style="font-size: 8.5pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
                KT1: Birth of Israel (1945–63)
              </div>
              <strong style="display:block; color: #000000; margin-bottom: 1px;">1. British Withdrawal &amp; Creation:</strong>
              <div>&bull; Conflicting Jewish and Arab interests in Mandate.</div>
              <div>&bull; King David Hotel bombing (1946); SS Exodus (1947).</div>
              <div>&bull; UN Resolution 181 partition; End of Mandate (1948).</div>
              <div>&bull; 1948–49 Arab-Israeli War: causes, phases, armistice.</div>
              
              <strong style="display:block; color: #000000; margin-top: 5px; margin-bottom: 1px;">2. Aftermath of 1948–49 War:</strong>
              <div>&bull; Territorial changes &amp; Green Line boundaries.</div>
              <div>&bull; Palestinian refugee crisis &amp; UNRWA creation.</div>
              <div>&bull; Creation of the IDF &amp; Law of Return (1950).</div>
              <div>&bull; US financial aid &amp; Israeli relations with Egypt.</div>
              
              <strong style="display:block; color: #000000; margin-top: 5px; margin-bottom: 1px;">3. Increased Tension (1955–63):</strong>
              <div>&bull; Nasser’s leadership &amp; Arab nationalism.</div>
              <div>&bull; Israeli raid on Gaza (1955) &amp; Czech arms deal.</div>
              <div>&bull; Suez Crisis (1956): Sèvres protocol, invasion, withdrawal.</div>
              <div>&bull; Formation of the United Arab Republic (UAR, 1958).</div>
            </div>

            <!-- Column 2: KT2 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 8px;">
              <div style="font-size: 8.5pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
                KT2: Escalating Conflict (1964–73)
              </div>
              <strong style="display:block; color: #000000; margin-bottom: 1px;">1. The Six Day War, 1967:</strong>
              <div>&bull; Cairo Conference (1964) &amp; creation of the PLO.</div>
              <div>&bull; Syria-Israel border clashes, Samu raid &amp; 7 April 1967.</div>
              <div>&bull; Soviet false alert, UNEF expulsion &amp; Straits of Tiran.</div>
              <div>&bull; Operation Focus air strikes &amp; Six Day War blitz.</div>
              
              <strong style="display:block; color: #000000; margin-top: 5px; margin-bottom: 1px;">2. Aftermath of 1967 War:</strong>
              <div>&bull; UN Resolution 242 ('land for peace' principles).</div>
              <div>&bull; Occupied territories: West Bank, Gaza, Sinai, Golan.</div>
              <div>&bull; Growth of Palestinian guerrilla groups (Fatah, PFLP).</div>
              <div>&bull; Black September (1970) &amp; Munich Olympics (1972).</div>
              
              <strong style="display:block; color: #000000; margin-top: 5px; margin-bottom: 1px;">3. Yom Kippur War (1973):</strong>
              <div>&bull; Sadat’s goals, Soviet military equipment &amp; diplomacy.</div>
              <div>&bull; Egyptian-Syrian surprise offensive (Operation Badr).</div>
              <div>&bull; US airlift (Operation Nickel Grass) &amp; IDF counter-strike.</div>
              <div>&bull; Superpower alert, ceasefire &amp; OAPEC oil embargo.</div>
            </div>

            <!-- Column 3: KT3 -->
            <div>
              <div style="font-size: 8.5pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
                KT3: Attempts at Solution (1974–95)
              </div>
              <strong style="display:block; color: #000000; margin-bottom: 1px;">1. Diplomatic Negotiations:</strong>
              <div>&bull; Kissinger shuttle diplomacy &amp; Suez clearing.</div>
              <div>&bull; Sadat’s historic visit to Jerusalem Knesset (1977).</div>
              <div>&bull; Camp David Accords (1978) mediated by Jimmy Carter.</div>
              <div>&bull; Treaty of Washington (1979) &amp; Sinai staged return.</div>
              
              <strong style="display:block; color: #000000; margin-top: 5px; margin-bottom: 1px;">2. The Palestinian Issue:</strong>
              <div>&bull; Arafat’s 'Gun and Olive Branch' UN speech (1974).</div>
              <div>&bull; PLO insurgency in southern Lebanon &amp; Israeli raids.</div>
              <div>&bull; 1982 Lebanon War, siege of Beirut, Sabra &amp; Shatila.</div>
              <div>&bull; First Intifada (1987–93): causes, stone protests, Hamas.</div>
              
              <strong style="display:block; color: #000000; margin-top: 5px; margin-bottom: 1px;">3. The Peace Process (1988–95):</strong>
              <div>&bull; Arafat renounces terrorism at UN (1988).</div>
              <div>&bull; End of Cold War, Gulf War (1991) &amp; Madrid Conference.</div>
              <div>&bull; Secret Oslo Accords (1993) &amp; White House handshake.</div>
              <div>&bull; PNA self-rule, Jordan Peace (1994), Oslo II (1995).</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `;
}

function renderPage2() {
  return `
    <div class="page" id="page_2" data-page="2">
      <div>
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">
              Executive Pacing &bull; Pearson Edexcel Specification Standard
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 800; color: #000; margin: 2px 0 0 0;">
              Paper 2 (Period Study): 50-Minute Pacing Blueprint &amp; Exam Architecture
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            Exam Blueprint
          </div>
        </div>

        <!-- 1. Four Non-Negotiable Success Principles -->
        <div style="background: #f8fafc; border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; margin-bottom: 8px;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            The Four Non-Negotiable Rules for Securing Grade 7–9 in Period Study (Option P5)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.2pt; line-height: 1.30; color: #1e293b;">
            <div>
              <strong>1. Strict Time Allocation (50 Minutes):</strong>
              Spend exactly 12 minutes on Q1 (6 mins each for 1a and 1b), 12 minutes on Q2 (Narrative), and 24 minutes on Q3 (12 mins each for two parts). Leave 2 minutes for a final factual check.
            </div>
            <div>
              <strong>2. Beyond the Stimulus (The Level 2 Trap):</strong>
              In Q2 (Narrative), examiners supply two bullet-point stimulus prompts. Relying solely on the stimulus caps your score at Level 2 (5 marks maximum). You MUST include distinct own-knowledge facts.
            </div>
            <div>
              <strong>3. Causal Sequencing Over Mere Storytelling:</strong>
              A chronological narrative without causal connectives (e.g., <em>"Consequently"</em>, <em>"This directly precipitated"</em>, <em>"As an inevitable outcome"</em>) is merely descriptive and capped at Level 1.
            </div>
            <div>
              <strong>4. Significance vs Description in Q3:</strong>
              Question 3 asks for <em>importance</em>. Do not retell what happened; explain the immediate tactical impact and evaluate the long-term geopolitical consequence on peace or conflict.
            </div>
          </div>
        </div>

        <!-- 2. Question Architecture Breakdown Table -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; background: #fff; margin-bottom: 8px;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            Paper 2 Period Study Exam Structure &amp; Mark Scheme Criteria
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 7.0pt; line-height: 1.28; text-align: left;">
            <thead>
              <tr style="border-bottom: 1.5px solid #000; background: #f1f5f9;">
                <th style="padding: 3px 5px; font-weight: 800;">Question</th>
                <th style="padding: 3px 5px; font-weight: 800;">Target &amp; Format</th>
                <th style="padding: 3px 5px; font-weight: 800;">Marks &amp; Time</th>
                <th style="padding: 3px 5px; font-weight: 800;">Key Formula for Full Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #cbd5e1;">
                <td style="padding: 4px 5px; font-weight: 800;">Q1(a) &amp; Q1(b)</td>
                <td style="padding: 4px 5px;">Explain <strong>one</strong> consequence of [event].</td>
                <td style="padding: 4px 5px;"><strong>4+4 = 8m</strong><br/>~12 mins total</td>
                <td style="padding: 4px 5px;">State ONE distinct consequence &rarr; Support with precise historical facts &rarr; Explain direct resulting outcome.</td>
              </tr>
              <tr style="border-bottom: 1px solid #cbd5e1;">
                <td style="padding: 4px 5px; font-weight: 800;">Q2</td>
                <td style="padding: 4px 5px;">Write a narrative account analysing [development].</td>
                <td style="padding: 4px 5px;"><strong>8 Marks</strong><br/>~12 mins</td>
                <td style="padding: 4px 5px;">3-stage causal account (Beginning &rarr; Turning Point &rarr; Outcome). Must include own knowledge not in stimulus.</td>
              </tr>
              <tr>
                <td style="padding: 4px 5px; font-weight: 800;">Q3 (Choose 2)</td>
                <td style="padding: 4px 5px;">Explain the importance of [event] for [theme/state].</td>
                <td style="padding: 4px 5px;"><strong>8+8 = 16m</strong><br/>~24 mins</td>
                <td style="padding: 4px 5px;">Write 2 detailed paragraphs per part: Paragraph 1 on short-term impact; Paragraph 2 on long-term systemic change.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. Analytical Connective Vault -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #fafafa; margin-bottom: 8px;">
          <div style="font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            The Historian’s Analytical Connective Vault &bull; High-Yield Causal Phrasing
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 6.8pt; line-height: 1.25; color: #1e293b;">
            <div>
              <strong style="color: #000; display: block; margin-bottom: 1px;">Direct Causal Transitions:</strong>
              <div>&bull; <em>"This directly precipitated..."</em></div>
              <div>&bull; <em>"Consequently, the Israeli cabinet was compelled to..."</em></div>
              <div>&bull; <em>"As an immediate strategic outcome..."</em></div>
            </div>
            <div>
              <strong style="color: #000; display: block; margin-bottom: 1px;">Narrative Sequence Connectors:</strong>
              <div>&bull; <em>"This crisis catalyzed the subsequent phase when..."</em></div>
              <div>&bull; <em>"The turning point arrived with..."</em></div>
              <div>&bull; <em>"Following this escalation, relations deteriorated into..."</em></div>
            </div>
            <div>
              <strong style="color: #000; display: block; margin-bottom: 1px;">Evaluative Importance Stems:</strong>
              <div>&bull; <em>"The primary significance lay in the fact that..."</em></div>
              <div>&bull; <em>"Fundamentally altered the geopolitical balance by..."</em></div>
              <div>&bull; <em>"Established an enduring precedent because..."</em></div>
            </div>
          </div>
        </div>

        <!-- 4. Three Fatal Pitfalls Warning -->
        <div style="background: #ffffff; border: 1.5px solid #000; border-radius: 3px; padding: 6px 10px; font-size: 7.0pt; line-height: 1.28; color: #000;">
          <strong style="text-transform: uppercase; font-size: 7.2pt; color: #000; display: block; margin-bottom: 2px;">
            ⚠️ The Three Fatal Pitfalls (Examiner Warning Strip):
          </strong>
          <div>&bull; <strong>Pitfall 1 (Writing Two Consequences in Q1):</strong> Explaining two consequences wastes 6 minutes; examiners only mark your single best answer. Fully develop ONE consequence.</div>
          <div>&bull; <strong>Pitfall 2 (Failing to Exceed Stimulus in Q2):</strong> If you do not introduce at least one major own-knowledge event outside the two stimulus bullets, your mark is capped at 5/8.</div>
          <div>&bull; <strong>Pitfall 3 (Treating Q3 as a General Description):</strong> Answering <em>"What happened"</em> instead of <em>"Why it was important for X"</em> keeps your answer in Level 1 (1–2 marks).</div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Executive Blueprint &bull; Page 2</span>
      </div>
    </div>
  `;
}

function renderPage3() {
  return `
    <div class="page" id="page_3" data-page="3">
      <div>
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">
              Synoptic Timeline &bull; Multi-Era Master Reference (1945–1995)
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 800; color: #000; margin: 2px 0 0 0;">
              Master Thematic Chronology &amp; Geopolitical Shift Matrix
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            Master Matrix
          </div>
        </div>

        <!-- 3-Column Timeline: KT1, KT2, KT3 -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          
          <!-- Column 1: KT1 -->
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              Key Topic 1: Birth of Israel (1945–63)
            </div>
            <div style="font-size: 6.8pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>May 1939:</strong> White Paper restricts Jewish immigration to 15k/year.</div>
              <div><strong>July 1946:</strong> Irgun bombs British HQ at King David Hotel (91 dead).</div>
              <div><strong>Feb 1947:</strong> Britain refers Palestine Mandate problem to UN.</div>
              <div><strong>July 1947:</strong> Royal Navy turns back SS Exodus; Sergeants Affair.</div>
              <div><strong>Nov 1947:</strong> UN Resolution 181 approves Partition Plan (56% to Jews).</div>
              <div><strong>14 May 1948:</strong> Israel declares independence; British troops withdraw.</div>
              <div><strong>May 1948 – Mar 1949:</strong> Arab-Israeli War; Israel secures 79% of Palestine.</div>
              <div><strong>1948–49 Nakba:</strong> Over 700,000 Palestinian Arabs displaced into refugee camps.</div>
              <div><strong>May 1948:</strong> Creation of the Israeli Defence Forces (IDF).</div>
              <div><strong>July 1950:</strong> Knesset passes Law of Return granting citizenship to all Jews.</div>
              <div><strong>Feb 1955:</strong> Israeli raid on Gaza kills 38 Egyptian soldiers; Nasser seeks arms.</div>
              <div><strong>July 1956:</strong> Nasser nationalises the Suez Canal Company.</div>
              <div><strong>Oct–Nov 1956:</strong> Suez Crisis; Israel invades Sinai with Britain and France.</div>
              <div><strong>Feb 1958:</strong> Egypt and Syria unite as the United Arab Republic (UAR).</div>
            </div>
          </div>

          <!-- Column 2: KT2 -->
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              Key Topic 2: Escalating Conflict (1964–73)
            </div>
            <div style="font-size: 6.8pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>Jan 1964:</strong> Arab League Cairo Summit establishes Palestine Liberation Organization (PLO).</div>
              <div><strong>Nov 1966:</strong> Israeli raid on Samu (West Bank) destroys 125 houses.</div>
              <div><strong>7 Apr 1967:</strong> Border clashes; Israeli Mirage jets down 6 Syrian MiGs.</div>
              <div><strong>May 1967:</strong> Soviet false alert; Nasser expels UNEF and closes Straits of Tiran.</div>
              <div><strong>5–10 June 1967:</strong> Six Day War; Israel captures Sinai, Gaza, West Bank &amp; Golan.</div>
              <div><strong>Sept 1967:</strong> Arab League Khartoum Summit issues "Three No's" resolution.</div>
              <div><strong>Nov 1967:</strong> UN passes Resolution 242 ('land for peace' formula).</div>
              <div><strong>1968–70:</strong> War of Attrition along Suez Canal; artillery and air strikes.</div>
              <div><strong>Sept 1970:</strong> PFLP hijacks 4 airliners to Dawson's Field (Jordan).</div>
              <div><strong>Sept 1970:</strong> Black September; King Hussein expels PLO guerrillas to Lebanon.</div>
              <div><strong>Sept 1970:</strong> President Nasser dies; Anwar Sadat becomes President of Egypt.</div>
              <div><strong>Sept 1972:</strong> Black September group murders 11 Israeli athletes at Munich Olympics.</div>
              <div><strong>6–25 Oct 1973:</strong> Yom Kippur War; Egyptian/Syrian surprise offensive.</div>
              <div><strong>Oct 1973:</strong> US Operation Nickel Grass airlift; OAPEC imposes 400% oil embargo.</div>
            </div>
          </div>

          <!-- Column 3: KT3 -->
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              Key Topic 3: Attempts at Solution (1974–95)
            </div>
            <div style="font-size: 6.8pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>1974–75:</strong> Henry Kissinger conducts 'shuttle diplomacy'; Suez reopened.</div>
              <div><strong>Nov 1974:</strong> Yasser Arafat addresses UN ("gun and olive branch" speech).</div>
              <div><strong>Nov 1977:</strong> Sadat makes historic visit to Jerusalem and addresses Knesset.</div>
              <div><strong>Sept 1978:</strong> Carter brokers Camp David Accords between Sadat and Begin.</div>
              <div><strong>26 Mar 1979:</strong> Treaty of Washington signed; Egypt-Israel bilateral peace.</div>
              <div><strong>Oct 1981:</strong> Sadat assassinated by Islamist militants in Cairo; Mubarak takes over.</div>
              <div><strong>June 1982:</strong> Israel launches Operation Peace for Galilee (Invasion of Lebanon).</div>
              <div><strong>Sept 1982:</strong> Sabra and Shatila refugee camp massacre by Phalangist militia.</div>
              <div><strong>Dec 1987:</strong> Road collision at Jabalya ignites the First Palestinian Intifada.</div>
              <div><strong>1987:</strong> Foundation of Hamas in Gaza opposing any compromise with Israel.</div>
              <div><strong>Nov 1988:</strong> Arafat renounces terrorism and recognizes UN Resolution 242.</div>
              <div><strong>1991:</strong> Gulf War and Madrid Peace Conference sponsored by US and USSR.</div>
              <div><strong>13 Sept 1993:</strong> Rabin and Arafat sign Oslo I Accord on White House lawn.</div>
              <div><strong>Oct 1994:</strong> Israel-Jordan Peace Treaty signed by Rabin and King Hussein.</div>
              <div><strong>Sept 1995:</strong> Oslo II divides West Bank into Areas A, B, and C.</div>
              <div><strong>4 Nov 1995:</strong> Prime Minister Yitzhak Rabin assassinated by Jewish extremist.</div>
            </div>
          </div>

        </div>

        <!-- Examiner Synoptic Takeaway Box -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #fafafa;">
          <div style="font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 2px;">
            Examiner Synoptic Takeaway: The Master Arc of Conflict and Peace (1945–1995)
          </div>
          <p style="margin: 0; font-size: 7.0pt; line-height: 1.30; color: #1e293b;">
            Notice the three sweeping historical shifts across the 50-year period: (1) <strong>From Imperial Dilemma to Statehood (1945–63):</strong> The collapse of the British Mandate, creation of Israel, and Nasser’s emergence as the champion of Pan-Arab nationalism. (2) <strong>From Conventional Interstate War to Asymmetric Insurgency (1964–73):</strong> The dramatic 1967 victory that brought 1 million Palestinians under Israeli military occupation, leading to the rise of independent Palestinian fedayeen resistance and the 1973 Yom Kippur shock. (3) <strong>From Bilateral Peace to Grassroots Stalemate (1974–95):</strong> While sovereign states reached peace (Egypt in 1979, Jordan in 1994), the core Palestinian struggle shifted from external guerrilla bases in Lebanon to internal civil disobedience (the 1987 Intifada) and the fragile, extremist-threatened Oslo process.
          </p>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Thematic Chronology &bull; Page 3</span>
      </div>
    </div>
  `;
}

function renderSpreadLeft(spread, pageNum) {
  const left = spread.left;

  const pillarsHtml = left.pillars
    .map(
      (pillar, idx) => `
    <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 9px; background: #fff;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
        <strong style="font-size: 8.2pt; color: #000;">${idx + 1}. ${pillar.title}</strong>
        <span style="font-size: 6.8pt; font-weight: 700; color: #475569; text-transform: uppercase;">${pillar.subtitle || ''}</span>
      </div>
      <ul style="margin: 0; padding-left: 14px; font-size: 7.5pt; color: #1e293b; line-height: 1.32;">
        ${pillar.bullets.map((b) => `<li>${formatMd(b)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const figuresHtml = left.keyFigures
    .map(
      (fig) => `
    <div style="background: #f8fafc; border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px;">
      <strong style="font-size: 7.2pt; color: #000; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${fig.name}</strong>
      <div style="font-size: 6.6pt; color: #334155; line-height: 1.22;">${formatMd(fig.role)}</div>
    </div>
  `,
    )
    .join('');

  const milestonesHtml = left.milestones
    .map(
      (m) => `
    <div><strong>${m.date}:</strong> ${m.event}</div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${pageNum}" data-page="${pageNum}">
      <div>
        <!-- Header -->
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">
              ${spread.topic}
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; font-weight: 800; color: #000; margin: 2px 0 0 0; line-height: 1.15;">
              ${spread.title}
            </h2>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 7.2pt; font-weight: 800; background: #000; color: #fff; padding: 2px 7px; border-radius: 2px; text-transform: uppercase;">
              Knowledge Masterclass
            </span>
            <div style="font-size: 6.8pt; color: #475569; font-weight: 700; margin-top: 2px;">${left.sectionTag || 'Core Knowledge'}</div>
          </div>
        </div>

        <!-- Strategic Context Card -->
        <div style="background: #f8fafc; border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; margin-bottom: 7px;">
          <div style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.4px; margin-bottom: 2px;">
            ${left.contextTitle || 'Strategic Context & Geopolitical Overview'}
          </div>
          <p style="margin: 0; font-size: 7.8pt; line-height: 1.34; color: #1e293b;">
            ${formatMd(left.summary)}
          </p>
        </div>

        <!-- Three Core Historical Pillars -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 7px;">
          ${pillarsHtml}
        </div>

        <!-- Key Figures Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; margin-bottom: 7px;">
          ${figuresHtml}
        </div>

        <!-- Chronological Milestone Anchor Strip (Replaces Irrelevant Source Box) -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.0pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.4px; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; display: flex; justify-content: space-between;">
            <span>Chronological Milestone Anchor &bull; Key Turning Points</span>
            <span style="color: #475569; font-weight: 600;">Paper 2 Core Specification</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(${left.milestones.length}, 1fr); gap: 6px; font-size: 6.6pt; line-height: 1.25; color: #1e293b;">
            ${milestonesHtml}
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>${spread.footerTag || spread.title} &bull; Page ${pageNum}</span>
      </div>
    </div>
  `;
}

function renderSpreadRight(spread, pageNum) {
  const right = spread.right;
  const q = right.question;

  const wordsHtml = right.wordBank
    .map(
      (item) => `
    <div><span class="wb-pill">${item.term}</span> ${formatMd(item.def)}</div>
  `,
    )
    .join('');

  const pathwayStepsHtml = right.causalPathway.steps
    .map(
      (step) => `
    <div style="background: #ffffff; border: 1.2px solid #000; border-radius: 3px; padding: 5px; font-size: 6.9pt; line-height: 1.25;">
      <div style="font-weight: 800; color: #000; text-transform: uppercase; margin-bottom: 1px;">${step.stage}</div>
      ${formatMd(step.desc)}
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${pageNum}" data-page="${pageNum}">
      <div>
        <!-- Header -->
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">
              ${q.typeHeader || 'Exam Masterclass'}
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; font-weight: 800; color: #000; margin: 2px 0 0 0; line-height: 1.15;">
              ${q.title || 'Assessment Mastery & Examiner Benchmark'}
            </h2>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 7.2pt; font-weight: 800; background: #000; color: #fff; padding: 2px 7px; border-radius: 2px; text-transform: uppercase;">
              Exam Technique
            </span>
            <div style="font-size: 6.8pt; color: #475569; font-weight: 700; margin-top: 2px;">${q.marksTime || '4 Marks • ~6 Mins'}</div>
          </div>
        </div>

        <!-- Exam Masterclass Card with Model Answer -->
        <div style="background: #ffffff; border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; margin-bottom: 7px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
            <span style="font-size: 9.0pt; font-weight: 800; color: #000;">
              Exam Task: ${q.stem}
            </span>
            <span style="font-size: 8.4pt; font-weight: 800; color: #000; white-space: nowrap;">[${q.marks} Marks]</span>
          </div>
          
          <!-- Planning Guide / Structural Framework -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 5px 8px; margin-bottom: 5px; font-size: 7.2pt; line-height: 1.30; color: #1e293b;">
            <strong style="color: #000; text-transform: uppercase; font-size: 6.8pt; display: block; margin-bottom: 2px;">
              ${q.planningGuideTitle || 'Examiner Planning & Structural Framework:'}
            </strong>
            ${q.planningGuide}
          </div>

          <!-- Annotated Benchmark Model Answer -->
          <div style="background: #fafafa; border: 1.2px solid #000; border-radius: 3px; padding: 6px 9px; margin-bottom: 4px; font-size: 7.6pt; line-height: 1.34; color: #000;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <strong style="text-transform: uppercase; font-size: 7.0pt; color: #000;">★ Pearson Benchmark Model Answer (${q.levelTag || 'Full Marks'}):</strong>
              <span style="font-size: 6.8pt; font-weight: 700; color: #000;">${q.scoreTag || 'Level Benchmark'}</span>
            </div>
            <p style="margin: 0; font-style: italic;">
              "${q.modelAnswer}"
            </p>
          </div>

          <div style="font-size: 6.8pt; color: #334155; line-height: 1.25;">
            <strong>Examiner Assessment Commentary:</strong> ${formatMd(q.examinerNote)}
          </div>
        </div>

        <!-- Visual Causal Pathway -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 9px; background: #fafafa; margin-bottom: 7px;">
          <div style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.4px; margin-bottom: 4px; text-align: center; border-bottom: 1px solid #000; padding-bottom: 2px;">
            ${right.causalPathway.title}
          </div>
          <div style="display: grid; grid-template-columns: repeat(${right.causalPathway.steps.length}, 1fr); gap: 6px;">
            ${pathwayStepsHtml}
          </div>
        </div>

        <!-- Master GCSE Word Bank (12 Tagged Terms) -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 9px; background: #ffffff; margin-bottom: 6px;">
          <div style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.4px; margin-bottom: 4px; border-bottom: 1px solid #000; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Master GCSE Specification Word Bank &bull; Essential Technical Vocabulary</span>
            <span style="font-weight: 700; color: #475569;">12 Key Terms</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 10px; font-size: 6.9pt; line-height: 1.25; color: #1e293b;">
            ${wordsHtml}
          </div>
        </div>

        <!-- Examiner Common Pitfall Warning -->
        <div style="background: #f8fafc; border: 1.2px solid #000; border-radius: 3px; padding: 4px 8px; font-size: 6.8pt; line-height: 1.25; color: #000;">
          <strong>⚠️ Examiner Warning (${q.pitfallCategory || 'Exam Technique Pitfalls'}):</strong> ${formatMd(q.pitfall)}
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Assessment Mastery &bull; Page ${pageNum}</span>
      </div>
    </div>
  `;
}

function renderPage28() {
  return `
    <div class="page" id="page_28" data-page="28">
      <div>
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">
              Historiographical Synthesis &bull; Revision Toolkit
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 800; color: #000; margin: 2px 0 0 0;">
              Master Historiographical Perspectives &amp; Grade 9 Synoptic Review
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            Historiography &bull; Page 28
          </div>
        </div>

        <!-- Historiographical Perspectives Matrix (3 Debates) -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; background: #ffffff; margin-bottom: 8px;">
          <div style="font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 5px; border-bottom: 1.2px solid #000; padding-bottom: 2px;">
            The Core Academic Debates: Competing Historical Perspectives
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 7.0pt; line-height: 1.30; color: #1e293b;">
            
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 6px 8px;">
              <strong style="color: #000; font-size: 7.4pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                1. Traditional Zionist School
              </strong>
              <div>&bull; <strong>1948 Narrative:</strong> Small David defending against overwhelming Arab Goliath invading armies.</div>
              <div>&bull; <strong>Refugee Origin:</strong> Palestinian flight caused by voluntary evacuation broadcasts from Arab high command.</div>
              <div>&bull; <strong>1967 War:</strong> Pre-emptive war of national survival against existential destruction.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 6px 8px;">
              <strong style="color: #000; font-size: 7.4pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                2. Arab Nationalist School
              </strong>
              <div>&bull; <strong>1948 Narrative:</strong> European colonial settler expansion dividing indigenous Arab land without consent.</div>
              <div>&bull; <strong>Refugee Origin:</strong> Systematic expulsion (Al-Nakba) through psychological terror and military force.</div>
              <div>&bull; <strong>1967 War:</strong> Pre-planned Israeli expansionism to seize biblical lands and water sources.</div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 6px 8px;">
              <strong style="color: #000; font-size: 7.4pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                3. The 'New Historians' (Morris, Shlaim)
              </strong>
              <div>&bull; <strong>1948 Archive Revelations:</strong> IDF possessed superior organisation, arms, and troop numbers by summer 1948.</div>
              <div>&bull; <strong>Refugee Origin:</strong> Complex mosaic of war fear, localized expulsions, and refusal of right to return.</div>
              <div>&bull; <strong>1967 Re-evaluation:</strong> War caused by mutual miscalculation, Nasser's brinkmanship, and deterrence failure.</div>
            </div>

          </div>
        </div>

        <!-- Synoptic Cross-Era Causation Matrix -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; background: #fafafa; margin-bottom: 8px;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            The 4 Synoptic Drivers Across 50 Years of Middle Eastern History (1945–1995)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 7px; font-size: 6.9pt; line-height: 1.28; color: #1e293b;">
            <div style="background: #ffffff; border: 1px solid #000; border-radius: 2px; padding: 5px;">
              <strong style="color: #000; display: block; margin-bottom: 2px;">1. Land &amp; Borders</strong>
              UN Res 181 (1947) &rarr; 1949 Green Line &rarr; 1967 Occupied Territories &rarr; Camp David Sinai return &rarr; Oslo II Areas A, B, C.
            </div>
            <div style="background: #ffffff; border: 1px solid #000; border-radius: 2px; padding: 5px;">
              <strong style="color: #000; display: block; margin-bottom: 2px;">2. Refugees &amp; Identity</strong>
              700k displaced in 1948 &rarr; UNRWA camps &rarr; 1964 PLO formation &rarr; 1970 Black September &rarr; 1987 Intifada &amp; rise of Hamas.
            </div>
            <div style="background: #ffffff; border: 1px solid #000; border-radius: 2px; padding: 5px;">
              <strong style="color: #000; display: block; margin-bottom: 2px;">3. Superpower Rivalry</strong>
              Truman backing partition &rarr; 1955 Czech arms deal &rarr; 1973 Soviet/US airlifts &rarr; 1979 Washington Treaty &rarr; 1991 Cold War end.
            </div>
            <div style="background: #ffffff; border: 1px solid #000; border-radius: 2px; padding: 5px;">
              <strong style="color: #000; display: block; margin-bottom: 2px;">4. Moderates vs Extremists</strong>
              Sadat-Begin peace (1979) costs Sadat’s life (1981) &rarr; Rabin-Arafat handshake (1993) ends in Rabin’s assassination (1995).
            </div>
          </div>
        </div>

        <!-- Grade 9 Final Revision Checklist -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; background: #ffffff;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            Grade 9 Final Pre-Exam Checklist: Can You Execute These Techniques?
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.0pt; line-height: 1.28; color: #1e293b;">
            <div>
              <div>&bull; <strong>Consequence (Q1):</strong> Can you immediately state ONE consequence and trace its causal chain to a political or territorial outcome in 6 minutes?</div>
              <div>&bull; <strong>Narrative (Q2):</strong> Can you divide the development into 3 chronological acts and introduce at least one specific piece of own knowledge beyond the stimulus?</div>
            </div>
            <div>
              <div>&bull; <strong>Importance (Q3):</strong> Can you write two analytical paragraphs explaining short-term crisis impact vs long-term structural importance on relations?</div>
              <div>&bull; <strong>Factual Precision:</strong> Can you accurately cite key dates (1947 Res 181, 1956 Suez, 1967 Res 242, 1973 Badr, 1979 Washington, 1993 Oslo)?</div>
            </div>
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Historiography &amp; Final Checklist &bull; Page 28</span>
      </div>
    </div>
  `;
}

module.exports = {
  getStyles,
  renderPage1,
  renderPage2,
  renderPage3,
  renderSpreadLeft,
  renderSpreadRight,
  renderPage28,
  formatMd,
};
