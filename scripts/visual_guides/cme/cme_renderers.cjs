/**
 * cme_renderers.cjs
 *
 * Professional monochrome renderers for Pearson Edexcel GCSE (9–1) History
 * Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)
 * Visual Revision Masterclasses & Complete Specification Guide (28 Pages).
 *
 * Enforces:
 * - Commercial 28-page saddle-stitch layout (0 blank pages, 0 overflows <= 1123px).
 * - Word-for-word Pearson Edexcel specification checklist on Page 1 from official specification.
 * - Restored Primary Archival Evidence box on every left spread page.
 * - Restored 4 Deep Forensic Case Studies (2x2 grid) on every right spread page (Zero exam questions, Zero quizzes).
 * - High-density 7.8pt–8.2pt body typography to eliminate dead whitespace while preventing overflow.
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
    position: relative;
  }
  .page:last-child { page-break-after: avoid; }
  
  .cover-border {
    border: 2.5px solid #000000;
    padding: 12px 14px;
    height: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
  }

  .page-header {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 3px; margin-bottom: 6px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .page-footer {
    border-top: 1.5px solid #000000;
    padding-top: 3px; margin-top: auto;
    display: flex; justify-content: space-between;
    font-size: 7.0pt; font-weight: 700; color: #334155;
    text-transform: uppercase;
  }

  .wb-pill {
    display: inline-block;
    background: #000000;
    color: #ffffff;
    font-size: 6.8pt; font-weight: 800; padding: 1px 5px;
    border-radius: 2px;
    text-transform: uppercase;
    margin-right: 3px;
    white-space: nowrap;
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
        
        <!-- 1. PUPIL DETAILS BOX (AT VERY TOP AS REQUESTED) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt; color: #000000;">
          <div style="flex: 1; display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; font-size: 7.8pt; color: #000000; margin-right: 6px; letter-spacing: 0.3px;">Candidate Name:</strong>
            <span style="border-bottom: 1.2px solid #000000; flex: 1; height: 14px; margin-right: 12px;"></span>
          </div>
          <div style="display: flex; gap: 10px; font-size: 7.4pt; color: #1e293b; white-space: nowrap;">
            <span><strong>Class:</strong> Year 10 / 11</span>
            <span><strong>Teacher:</strong> Mr Lovett</span>
            <span><strong>Target:</strong> Grade 7–9</span>
          </div>
        </div>

        <!-- 2. TOP HEADER STRIP & MAIN TITLE -->
        <div>
          <div style="border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 7.8pt; font-weight: 800; letter-spacing: 0.5px; color: #000000; text-transform: uppercase;">
              PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5
            </span>
            <span style="font-size: 7.4pt; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.3px;">
              1HI0/P5 &bull; Period Study Specification Guide
            </span>
          </div>

          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16.5pt; font-weight: 900; line-height: 1.12; color: #000000; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 0.2px;">
            Option P5: Conflict in the Middle East, 1945–1995
          </h1>
          <div style="font-size: 8.4pt; font-weight: 700; color: #1e293b; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Visual Revision Masterclasses &bull; Complete Knowledge &amp; Specification Volume</span>
            <span style="font-size: 7.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 6px; border-radius: 2px; text-transform: uppercase;">
              28-Page Master Edition
            </span>
          </div>
        </div>

        <!-- 3. DUAL ARCHIVAL PRIMARY PLATES (1948 NAKBA & 1967 RUBINGER) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #fafafa;">
          <div style="font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 0.4px; margin-bottom: 4px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px;">
            Dual Archival Plates: The Two Defining Turning Points of Conflict in the Middle East
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <!-- Left Plate: 1948 Al-Nakba (UNRWA Archive) -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 4px; border-radius: 2px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
                <strong style="font-size: 6.8pt; text-transform: uppercase; color: #000000;">1. The 1948 Al-Nakba (The Catastrophe)</strong>
                <span style="font-size: 6.2pt; font-weight: 700; color: #475569;">UNRWA Photo Archive</span>
              </div>
              <div style="width: 100%; height: 115px; overflow: hidden; background: #000000; border: 1px solid #000000; margin-bottom: 3px;">
                <img src="${unrwaImgUri}" alt="Palestinian refugee mother and daughter outside tent with bread rations, 1948" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: grayscale(100%) contrast(115%); display: block;" />
              </div>
              <div style="font-size: 6.6pt; color: #1e293b; line-height: 1.22;">
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 7.0pt; font-weight: 700; font-style: italic; color: #000000; margin-bottom: 1px;">
                  "Palestinian refugee mother and daughter with bread rations outside shelter tent (1948)"
                </div>
                <div><strong>Archive Citation:</strong> UN Relief and Works Agency (UNRWA) / UNRPR Historic Milestones Archive, ID: I0000l5SkmJo1hLc.</div>
                <div style="margin-top: 1px; color: #334155;"><strong>Significance:</strong> Over 700,000 Palestinian Arabs were displaced during the 1948 war, creating the permanent refugee crisis.</div>
              </div>
            </div>

            <!-- Right Plate: 1967 Six Day War (David Rubinger / GPO) -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 4px; border-radius: 2px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
                <strong style="font-size: 6.8pt; text-transform: uppercase; color: #000000;">2. The 1967 Western Wall Victory</strong>
                <span style="font-size: 6.2pt; font-weight: 700; color: #475569;">David Rubinger / GPO</span>
              </div>
              <div style="width: 100%; height: 115px; overflow: hidden; background: #000000; border: 1px solid #000000; margin-bottom: 3px;">
                <img src="${rubingerImgUri}" alt="Israeli paratroopers at the Western Wall, 7 June 1967 by David Rubinger" style="width: 100%; height: 100%; object-fit: cover; object-position: center 25%; filter: grayscale(100%) contrast(115%); display: block;" />
              </div>
              <div style="font-size: 6.6pt; color: #1e293b; line-height: 1.22;">
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 7.0pt; font-weight: 700; font-style: italic; color: #000000; margin-bottom: 1px;">
                  "Paratroopers at the Western Wall, Jerusalem (7 June 1967)"
                </div>
                <div><strong>Photograph by:</strong> David Rubinger (1924–2017) &bull; Israel Government Press Office (GPO) Collection.</div>
                <div style="margin-top: 1px; color: #334155;"><strong>Significance:</strong> Capturing East Jerusalem and West Bank brought 1 million Palestinians under Israeli military occupation.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. THE THREE EXAM QUESTION TYPES STRIP -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 1: Consequence</span>
              <span style="color: #000000;">4+4 = 8m</span>
            </div>
            <p style="font-size: 6.5pt; color: #1e293b; line-height: 1.22; margin: 2px 0 0 0;">
              Answer <strong>BOTH 1(a) and 1(b)</strong> (~6 mins each). State ONE consequence &rarr; Support with precise facts &rarr; Trace direct causal link.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 2: Narrative</span>
              <span style="color: #000000;">8m</span>
            </div>
            <p style="font-size: 6.5pt; color: #1e293b; line-height: 1.22; margin: 2px 0 0 0;">
              Continuous causal prose (~12 mins). 3-act structure: <strong>Beginning &rarr; Turning Point &rarr; Outcome</strong>. Must exceed stimulus points.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 3: Importance</span>
              <span style="color: #000000;">8+8 = 16m</span>
            </div>
            <p style="font-size: 6.5pt; color: #1e293b; line-height: 1.22; margin: 2px 0 0 0;">
              Choose <strong>TWO from 3(a), 3(b), 3(c)</strong> (~12 mins each). 2 explanatory paragraphs on short-term impact vs long-term consequence.
            </p>
          </div>
        </div>

        <!-- 5. VERBATIM OFFICIAL PEARSON SPECIFICATION CHECKLIST (OPTION P5) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
          <div style="font-size: 7.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px; letter-spacing: 0.3px;">
            ★ Official Pearson Edexcel GCSE Specification Curriculum Checklist (Option P5)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 6.2pt; line-height: 1.24; color: #0f172a;">
            
            <!-- Column 1: KT1 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 6.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                Key topic 1: The birth of the state of Israel, 1945–63
              </div>
              <strong style="display:block; color: #000000; margin-top: 2px;">1 The British withdrawal and the creation of Israel</strong>
              <div>&bull; Conflicting interests and demands of Jews and Arabs within the British Mandate.</div>
              <div>&bull; Key events leading to the end of the British Mandate, partition and the creation of Israel, including the significance of the bombing of the King David Hotel and UN Resolution 181.</div>
              <div>&bull; Key events of the Arab-Israeli war (1948–49).</div>
              
              <strong style="display:block; color: #000000; margin-top: 3px;">2 Aftermath of the 1948–49 war</strong>
              <div>&bull; Territorial changes and their impact. The refugee status of Palestinian Arabs.</div>
              <div>&bull; The creation of the Israeli Defence Forces and the Law of Return. US aid to Israel.</div>
              <div>&bull; Israel's relations with Egypt.</div>
              
              <strong style="display:block; color: #000000; margin-top: 3px;">3 Increased tension, 1955–63</strong>
              <div>&bull; Nasser and Egypt's leadership of the Arab world.</div>
              <div>&bull; The events and significance of Israeli attacks on Gaza in 1955 and Sinai in 1956.</div>
              <div>&bull; The events and significance of the Suez Crisis (1956), including the formation of the UAR in 1958.</div>
            </div>

            <!-- Column 2: KT2 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 6.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                Key topic 2: The escalating conflict, 1964–73
              </div>
              <strong style="display:block; color: #000000; margin-top: 2px;">1 The Six Day War, 1967</strong>
              <div>&bull; The significance of the Cairo Conference (1964). Escalating tension between Israel, Syria and Jordan: Syria's support for Fatah, Israel's raid on Samu and events of 7 April 1967.</div>
              <div>&bull; The actions of the USSR, Nasser and the USA in the period leading to war.</div>
              <div>&bull; Key events of the war.</div>
              
              <strong style="display:block; color: #000000; margin-top: 3px;">2 Aftermath of the 1967 war</strong>
              <div>&bull; UN Resolution 242 and continued dispute over the Suez Canal.</div>
              <div>&bull; Palestinian refugees and the significance of the occupied territories: Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem.</div>
              <div>&bull; The use of terrorism, Israel's response and international attitudes towards the Palestine issue: the PFLP airplane hijacks of 1970; Black September and the Munich Olympics. The expulsion of the PLO from Jordan (1970).</div>
              
              <strong style="display:block; color: #000000; margin-top: 3px;">3 Israel and Egypt, 1967–73</strong>
              <div>&bull; Egyptian relations with Israel, the USA, the USSR and other Arab states.</div>
              <div>&bull; Israel's consolidation of control of the occupied territories.</div>
              <div>&bull; Key events of the Yom Kippur War (1973) and its aftermath.</div>
            </div>

            <!-- Column 3: KT3 -->
            <div>
              <div style="font-size: 6.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                Key topic 3: Attempts at a solution, 1974–95
              </div>
              <strong style="display:block; color: #000000; margin-top: 2px;">1 Diplomatic negotiations</strong>
              <div>&bull; The significance of the oil crisis and the involvement of the USA and the USSR.</div>
              <div>&bull; Kissinger, 'shuttle diplomacy' and the reopening of the Suez Canal.</div>
              <div>&bull; Sadat's visit to Israel (1977), Begin's visit to Egypt (1977), US President Carter and Camp David (1978) and the Treaty of Washington (1979).</div>
              
              <strong style="display:block; color: #000000; margin-top: 3px;">2 The Palestinian issue</strong>
              <div>&bull; Arafat's speech to the UN (1974). The significance of PLO activities in Lebanon.</div>
              <div>&bull; Israeli reprisals, the invasion of Lebanon (1982) and the results.</div>
              <div>&bull; The Israeli occupied territories and the First Palestinian Intifada (1987–93).</div>
              
              <strong style="display:block; color: #000000; margin-top: 3px;">3 Attempts at a solution</strong>
              <div>&bull; The significance of Arafat's renunciation of terrorism in a speech at the UN (1988).</div>
              <div>&bull; Changing superpower policies in the Middle East: US involvement in the Gulf War (1991), and the end of the Cold War.</div>
              <div>&bull; Arafat, Rabin and the Oslo Accords (1993); the setting up of the Palestinian National Authority; Israel-Jordan peace treaty (1994); Oslo II (1995).</div>
            </div>

          </div>
        </div>

        <!-- 6. FOOTER STRIP -->
        <div style="border-top: 1.5px solid #000000; padding-top: 2px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; color: #000000;">
          <span><strong>Meoncross History Department</strong> &bull; GCSE Masterclass Series</span>
          <span style="font-weight: 800; text-transform: uppercase;">Pearson Edexcel 1HI0/P5 &bull; 28-Page Master Volume</span>
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
          <div style="font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            The Four Non-Negotiable Rules for Securing Grade 7–9 in Period Study (Option P5)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.4pt; line-height: 1.32; color: #1e293b;">
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

        <!-- 2. Question-by-Question Formula Card -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 9px; background: #fff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
              Q1: Consequence [4m + 4m]
            </div>
            <div style="font-size: 7.2pt; color: #1e293b; line-height: 1.28;">
              <p style="margin: 0 0 3px 0;"><strong>Structure (1 Developed Paragraph):</strong></p>
              <div>&bull; <strong>Point:</strong> Identify one clear consequence.</div>
              <div>&bull; <strong>Evidence:</strong> Add 2–3 precise dates, names, figures.</div>
              <div>&bull; <strong>Impact:</strong> Trace causal mechanism &amp; result.</div>
              <div style="margin-top: 3px; font-weight: 700; color: #000;">DO NOT write two consequences!</div>
            </div>
          </div>
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 9px; background: #fff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
              Q2: Narrative Account [8m]
            </div>
            <div style="font-size: 7.2pt; color: #1e293b; line-height: 1.28;">
              <p style="margin: 0 0 3px 0;"><strong>Structure (3-Act Causal Narrative):</strong></p>
              <div>&bull; <strong>Act 1:</strong> Catalyst / Opening move.</div>
              <div>&bull; <strong>Act 2:</strong> Decisive turning point (Own Knowledge!).</div>
              <div>&bull; <strong>Act 3:</strong> Final outcome / Historical impact.</div>
              <div style="margin-top: 3px; font-weight: 700; color: #000;">Use explicit causal links between acts.</div>
            </div>
          </div>
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 9px; background: #fff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
              Q3: Explain Importance [8m + 8m]
            </div>
            <div style="font-size: 7.2pt; color: #1e293b; line-height: 1.28;">
              <p style="margin: 0 0 3px 0;"><strong>Structure (2 Explanatory Paragraphs):</strong></p>
              <div>&bull; <strong>Para 1:</strong> Immediate tactical significance.</div>
              <div>&bull; <strong>Para 2:</strong> Long-term geopolitical consequence.</div>
              <div>&bull; <strong>Verdict:</strong> Clinching evaluative sentence.</div>
              <div style="margin-top: 3px; font-weight: 700; color: #000;">Answer 2 of the 3 options provided.</div>
            </div>
          </div>
        </div>

        <!-- 3. Analytical Connectives Vault -->
        <div style="background: #fafafa; border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; margin-bottom: 8px;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            The Historian's Analytical Connective Toolkit (Examiner Trigger Language)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 7.2pt; line-height: 1.30; color: #1e293b;">
            <div>
              <strong style="color: #000; display: block; margin-bottom: 1px;">Direct Causal Stems:</strong>
              <div>&bull; <em>"This directly precipitated..."</em></div>
              <div>&bull; <em>"Consequently, this forced..."</em></div>
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
        <div style="background: #ffffff; border: 1.5px solid #000; border-radius: 3px; padding: 6px 10px; font-size: 7.2pt; line-height: 1.30; color: #000;">
          <strong style="text-transform: uppercase; font-size: 7.4pt; color: #000; display: block; margin-bottom: 2px;">
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
            <div style="font-size: 7.0pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 3.5px;">
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
            <div style="font-size: 7.0pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 3.5px;">
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
            <div style="font-size: 7.0pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 3.5px;">
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
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 2px;">
            Examiner Synoptic Takeaway: The Master Arc of Conflict and Peace (1945–1995)
          </div>
          <p style="margin: 0; font-size: 7.4pt; line-height: 1.34; color: #1e293b;">
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
      (p, idx) => `
    <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 9px; background: #fff; flex: 1;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px;">
        <strong style="font-size: 8.4pt; color: #000;">${idx + 1}. ${p.title}</strong>
        <span style="font-size: 7.0pt; font-weight: 700; color: #475569; text-transform: uppercase;">${p.subtitle}</span>
      </div>
      <ul style="margin: 0; padding-left: 14px; font-size: 7.8pt; color: #0f172a; line-height: 1.34;">
        ${p.bullets.map((b) => `<li style="margin-bottom: 3px;">${formatMd(b)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const figuresHtml = left.keyFigures
    .map(
      (f) => `
    <div style="background: #f8fafc; border: 1.2px solid #000; border-radius: 2px; padding: 4px 6px;">
      <strong style="color: #000; display: block; font-size: 7.6pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${f.name}</strong>
      <span style="font-size: 7.0pt; color: #334155; line-height: 1.22;">${f.role}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${pageNum}" data-page="${pageNum}">
      <div>
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">${spread.topic}</span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; font-weight: 800; color: #000; margin: 2px 0 0 0; line-height: 1.15;">${spread.title}</h2>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 7.2pt; font-weight: 800; background: #000; color: #fff; padding: 2px 7px; border-radius: 2px; text-transform: uppercase;">Knowledge Masterclass</span>
            <div style="font-size: 6.8pt; color: #475569; font-weight: 700; margin-top: 2px;">Core Knowledge</div>
          </div>
        </div>

        <!-- Strategic Context Overview -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 7px 10px; margin-bottom: 7px;">
          <div style="font-size: 9.6pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 3px;">
            ${left.headline}
          </div>
          <div style="font-size: 8.0pt; color: #1e293b; line-height: 1.35;">
            ${formatMd(left.summary)}
          </div>
        </div>

        <!-- Three Core Historical Pillars -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 7px;">
          ${pillarsHtml}
        </div>

        <!-- Key Figures & Organisations (4 Cards) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; margin-bottom: 7px;">
          <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Key Historical Figures &amp; Organisations</span>
            <span style="font-size: 6.8pt; color: #475569;">Specification Protagonists</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;">
            ${figuresHtml}
          </div>
        </div>

        <!-- Primary Archival Source & Historical Evidence Box -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-radius: 3px; padding: 6px 10px; font-size: 7.6pt; line-height: 1.30; color: #000000;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000000; letter-spacing: 0.4px;">PRIMARY ARCHIVAL EVIDENCE &bull; ${left.archivalSource.title}:</strong>
            <span style="font-size: 7.0pt; font-weight: 700; color: #334155;">${left.archivalSource.citation}</span>
          </div>
          <p style="margin: 4px 0; font-style: italic; font-family: 'Playfair Display', serif; font-size: 8.0pt; color: #000000; line-height: 1.30;">
            "${left.archivalSource.quote}"
          </p>
          <div style="margin-top: 2px; font-size: 7.0pt; color: #334155; line-height: 1.22;">
            <strong>Historical Significance:</strong> ${left.archivalSource.significance}
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>${spread.title} &bull; Page ${pageNum}</span>
      </div>
    </div>
  `;
}

function renderSpreadRight(spread, pageNum) {
  const right = spread.right;

  const casesHtml = right.deepCases
    .map(
      (c) => `
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 3px;">
      <div style="font-size: 8.2pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
        ${c.title}
      </div>
      <ul style="margin: 0; padding-left: 13px; font-size: 7.8pt; color: #0f172a; line-height: 1.32;">
        ${c.points.map((p) => `<li style="margin-bottom: 3px;">${formatMd(p)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const pathwayHtml = right.causalPathway
    .map(
      (p) => `
    <div style="background: #ffffff; border: 1.2px solid #000000; border-radius: 2px; padding: 5px 6px; font-size: 7.1pt; line-height: 1.24;">
      <strong style="color: #000000; display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${p.stage}</strong>
      ${formatMd(p.text || p.desc || '')}
    </div>
  `,
    )
    .join('');

  const wordBankHtml = right.masterWordBank
    .map(
      (w) => `
    <div style="font-size: 7.2pt; line-height: 1.26; color: #1e293b;">
      <span class="wb-pill">${w.term}</span> ${formatMd(w.def)}
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${pageNum}" data-page="${pageNum}">
      <div>
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">${spread.topic}</span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 13.5pt; font-weight: 800; color: #000; margin: 2px 0 0 0; line-height: 1.15;">${spread.title}: Forensic Analysis &amp; Word Bank</h2>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 7.2pt; font-weight: 800; background: #000; color: #fff; padding: 2px 7px; border-radius: 2px; text-transform: uppercase;">Deep Knowledge</span>
            <div style="font-size: 6.8pt; color: #475569; font-weight: 700; margin-top: 2px;">Forensic Case Studies</div>
          </div>
        </div>

        <!-- Four Deep-Knowledge Forensic Case Studies (2x2 Grid) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 7px;">
          ${casesHtml}
        </div>

        <!-- Visual Causal Pathway (4 Connected Stages) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 9px; background: #f8fafc; margin-bottom: 7px;">
          <div style="font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Visual Causal Pathway: Key Historical Mechanisms</span>
            <span style="font-size: 6.8pt; color: #475569;">Cause &amp; Consequence Chain</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;">
            ${pathwayHtml}
          </div>
        </div>

        <!-- Master GCSE Specification Word Bank Box -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 9px; background: #ffffff;">
          <div style="font-size: 7.4pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>★ GCSE Specification Word Bank &amp; Essential Historical Concepts</span>
            <span style="color: #475569; font-size: 6.8pt;">12 Key Terms</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px 10px;">
            ${wordBankHtml}
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option P5: Conflict in the Middle East</span>
        <span>Analysis &amp; Word Bank &bull; Page ${pageNum}</span>
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
              Historiography &bull; Academic Perspectives &bull; Grade 9 Evaluative Mastery
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 800; color: #000; margin: 2px 0 0 0;">
              Master Historiographical Debates: Traditional vs New Historians
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            Grade 9 Mastery
          </div>
        </div>

        <!-- Top Context Card -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 7px 10px; margin-bottom: 8px;">
          <div style="font-size: 9.0pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            Historiographical Awareness: Declassified Archives &amp; Shifting Interpretations
          </div>
          <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.34;">
            Top-tier candidates achieve Grade 9 by demonstrating awareness that historical interpretations of the Arab-Israeli conflict are contested. In the late 1980s, Israeli state archives were declassified under the 30-year rule, giving rise to the <strong>"New Historians" (Benny Morris, Avi Shlaim, Ilan Pappé)</strong>, who challenged traditional national narratives.
          </div>
        </div>

        <!-- 4 Historiographical Debates Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              1. The 1948 Palestinian Refugee Crisis
            </div>
            <div style="font-size: 7.6pt; color: #000000; line-height: 1.30;">
              <div><strong>Traditional View:</strong> Arab leaders broadcast radio orders telling civilians to leave temporarily to clear the path for invading Arab armies.</div>
              <div style="margin-top: 3px;"><strong>Benny Morris (New Historian):</strong> "Born of war, not by design"; flight was caused by a combination of fear (Deir Yassin), economic collapse, and targeted IDF expulsions (Lydda &amp; Ramle).</div>
            </div>
          </div>

          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              2. The Military Balance in 1948
            </div>
            <div style="font-size: 7.6pt; color: #000000; line-height: 1.30;">
              <div><strong>Traditional View:</strong> A desperate "David vs. Goliath" struggle of an unarmed infant Jewish state against five massive Arab armies.</div>
              <div style="margin-top: 3px;"><strong>Avi Shlaim:</strong> Israel held decisive advantages after the June truce in mobilization, unified command, and Czech modern weaponry; Arab armies were divided and rivalrous.</div>
            </div>
          </div>

          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              3. Responsibility for the 1967 War
            </div>
            <div style="font-size: 7.6pt; color: #000000; line-height: 1.30;">
              <div><strong>Traditional View:</strong> Nasser actively sought war; expelling UNEF and closing the Straits of Tiran left Israel facing existential destruction.</div>
              <div style="margin-top: 3px;"><strong>Michael Oren:</strong> War was an accidental escalation caused by Soviet false intelligence, inter-Arab brinkmanship, and miscalculation, rather than a premeditated Arab plan.</div>
            </div>
          </div>

          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              4. The Failure of the Oslo Peace Accords
            </div>
            <div style="font-size: 7.6pt; color: #000000; line-height: 1.30;">
              <div><strong>Pro-Israeli Interpretation:</strong> Arafat was never truly committed to a two-state solution, failing to stop Hamas terrorism and inciting hatred.</div>
              <div style="margin-top: 3px;"><strong>Pro-Palestinian / Revisionist:</strong> Oslo was a flawed agreement that allowed Israel to double settlements, fragmenting the West Bank into disconnected Bantustans.</div>
            </div>
          </div>
        </div>

        <!-- Grade 9 Verification Checklist Box -->
        <div style="background: #fafafa; border: 1.5px solid #000000; border-radius: 3px; padding: 7px 10px; margin-bottom: 6px;">
          <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>★ Final Master Examination Checklist: 10 Non-Negotiable Core Concepts</span>
            <span style="color: #475569; font-size: 7.0pt;">Self-Audit</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px 12px; font-size: 7.4pt; color: #000000; line-height: 1.28;">
            <div>[ ] 1. 1947 Partition: 55% land / 67% Arab population with 400,000 Arabs in Jewish state.</div>
            <div>[ ] 2. Deir Yassin: ~100 killed, triggering panic flight of 250,000 Palestinians.</div>
            <div>[ ] 3. 1948–49 War: 650k vs 40m; June truce allows Czech arms and Burma Road.</div>
            <div>[ ] 4. 1949 Refugees: 280k West Bank, 190k Gaza, 100k Lebanon, 75k Syria, 70k Jordan.</div>
            <div>[ ] 5. Conscription &amp; Aid: 30m men / 18m women to age 55; $300m US aid; Law of Return.</div>
            <div>[ ] 6. 1956 Suez: 80k British troops out; Sèvres collusion (22 Oct); US halts invasion.</div>
            <div>[ ] 7. 1967 War: Samu raid; 7 April dogfight; Op Focus destroys 300+ jets; 70k sq km won.</div>
            <div>[ ] 8. 1973 War: Bar-Lev breached by water monitors; DEFCON 3 alert; 400% oil price rise.</div>
            <div>[ ] 9. Camp David (1978): $10bn Egypt / $3bn Israel aid; Treaty of Washington (1979).</div>
            <div>[ ] 10. Oslo II (1995): West Bank split into Areas A (3%), B (25%), C (72%); Rabin murdered.</div>
          </div>
        </div>

        <!-- Footer Sign-Off Strip -->
        <div style="border-top: 1.5px solid #000000; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; color: #000000;">
          <span><strong>Meoncross School History Department</strong> &bull; Complete GCSE Syllabus Mastery</span>
          <span style="font-weight: 800; text-transform: uppercase;">Option P5 &bull; Complete 28-Page Master Volume</span>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East</span>
        <span>Historiography &bull; Page 28</span>
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
  getImageDataUri,
};
