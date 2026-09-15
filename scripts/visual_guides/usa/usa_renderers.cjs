/**
 * usa_renderers.cjs
 *
 * Common layout renderers and high-contrast monochrome styles for
 * Edexcel GCSE History Paper 3: Conflict at Home and Abroad: the USA, 1954–1975 (Option 33).
 *
 * Implements the Paper 3 4-4-4-4 Question Matrix:
 * - 4x Section A: Q1 Inference [4m] + Q2 Explain Why [12m]
 * - 4x Section B: Q3(a) Utility of Sources B and C [8m]
 * - 4x Section B: Q3(b) Differences in Views [4m] + Q3(c) Suggest Reasons for Difference [4m]
 * - 4x Section B: Q3(d) Evaluative Essay with Criteria Judgement [16+4m]
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
  const homeImgUri = getImg('images/usa_march_on_washington_leaders.jpg');
  const abroadImgUri = getImg('images/huey_combat_landing_vietnam.jpg');

  return `
    <div class="page" id="page_1" data-page="1">
      <div class="cover-border">
        
        <!-- 1. PUPIL DETAILS BOX (VERY TOP AS REQUESTED) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 10px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 8.2pt; color: #000000;">
          <div style="display: flex; align-items: center; flex: 1.4;">
            <strong style="font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.5px;">CANDIDATE NAME:</strong>
            <span style="display: inline-block; border-bottom: 1.5px solid #000000; flex: 1; margin: 0 12px 0 6px;">&nbsp;</span>
          </div>
          <div style="display: flex; gap: 14px; font-weight: 700; font-size: 7.8pt;">
            <span>Class: <strong>Year 10 / 11</strong></span>
            <span>Teacher: <strong>Mr Lovett</strong></span>
            <span>Target: <strong>Grade 7–9</strong></span>
          </div>
        </div>

        <!-- 2. MASTER TITLE BLOCK -->
        <div style="text-align: center; margin: 3px 0 2px 0;">
          <div style="font-size: 8.2pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #000000; margin-bottom: 2px;">
            PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION 33 (1HI0/33)
          </div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 900; margin: 0 0 2px 0; line-height: 1.1; color: #000000; letter-spacing: -0.3px;">
            Conflict at Home and Abroad: The USA, 1954–1975
          </h1>
          <div style="font-size: 8.6pt; font-style: italic; color: #334155; margin-bottom: 4px;">
            Visual Revision Masterclasses &amp; Complete Specification Guide
          </div>
          <div style="display: flex; justify-content: center; gap: 8px; font-size: 7.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
            <span style="background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">Paper 3: Modern Depth Study</span>
            <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">Time: 1 Hour 20 Minutes</span>
            <span style="border: 1.2px solid #000000; padding: 2px 8px; border-radius: 2px;">Total: 52 Raw Marks (+4 SPaG = 56)</span>
            <span style="background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">36-Page Master Volume</span>
          </div>
        </div>

        <!-- 3. DUAL ARCHIVAL PLATES (CONFLICT AT HOME VS CONFLICT ABROAD) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
          <div style="font-size: 7.4pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
            Dual Archival Plates &bull; The Two Defining Arenas of American Turmoil (1954–1975)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <!-- Left Plate: Conflict at Home -->
            <div style="border: 1px solid #000000; border-radius: 2px; padding: 4px 6px; background: #fafafa; display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">
                <strong style="font-size: 7.0pt; text-transform: uppercase; color: #000000;">1. Conflict at Home: Civil Rights</strong>
                <span style="font-size: 6.2pt; color: #475569;">Warren K. Leffler / LOC (1963)</span>
              </div>
              <div style="height: 96px; border: 1px solid #000000; border-radius: 2px; overflow: hidden; background: #000000; margin-bottom: 2px;">
                <img src="${homeImgUri}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="March on Washington Leaders 1963" />
              </div>
              <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.20;">
                <strong>Key Context:</strong> Over 250,000 marchers gathered at the Lincoln Memorial (August 1963) demanding civil and economic rights, generating irresistible national momentum for the Civil Rights Act of 1964.
              </div>
            </div>

            <!-- Right Plate: Conflict Abroad -->
            <div style="border: 1px solid #000000; border-radius: 2px; padding: 4px 6px; background: #fafafa; display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">
                <strong style="font-size: 7.0pt; text-transform: uppercase; color: #000000;">2. Conflict Abroad: Vietnam War</strong>
                <span style="font-size: 6.2pt; color: #475569;">US Army / NARA (1966)</span>
              </div>
              <div style="height: 96px; border: 1px solid #000000; border-radius: 2px; overflow: hidden; background: #000000; margin-bottom: 2px;">
                <img src="${abroadImgUri}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Huey Helicopter Combat Landing in Vietnam" />
              </div>
              <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.20;">
                <strong>Key Context:</strong> Airmobile operations with UH-1 Huey helicopters defined Search and Destroy tactics against Vietcong guerrilla networks, sparking a massive domestic anti-war movement across US campuses.
              </div>
            </div>
          </div>
        </div>

        <!-- 4. FOUR PAPER 3 QUESTION FORMATS SUMMARY -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1.2fr; gap: 6px;">
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Q1: Inference</span>
              <span>4m</span>
            </div>
            <p style="font-size: 6.3pt; color: #1e293b; line-height: 1.20; margin: 1px 0 0 0;">
              Give <strong>TWO inferences</strong> from Source A (~6 mins). State inference &rarr; quote supporting evidence.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Q2: Explain Why</span>
              <span>12m</span>
            </div>
            <p style="font-size: 6.3pt; color: #1e293b; line-height: 1.20; margin: 1px 0 0 0;">
              Multi-causal essay (~18 mins). 3 developed P-E-E paragraphs. <strong>MUST</strong> use own knowledge beyond stimulus.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Q3(a): Utility</span>
              <span>8m</span>
            </div>
            <p style="font-size: 6.3pt; color: #1e293b; line-height: 1.20; margin: 1px 0 0 0;">
              Utility of Sources B &amp; C (~14 mins). Evaluate <strong>Content + Provenance (NOP) + Context</strong>.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 3px 5px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Q3(b–d): Interpretations</span>
              <span>28m</span>
            </div>
            <p style="font-size: 6.3pt; color: #1e293b; line-height: 1.20; margin: 1px 0 0 0;">
              Q3b Views Diff [4m] &bull; Q3c Reasons [4m] &bull; Q3d Evaluative Essay with criteria judgement [16+4 SPaG].
            </p>
          </div>
        </div>

        <!-- 5. ENLARGED FULL SPECIFICATION CURRICULUM CHECKLIST (4 COLUMNS) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #ffffff; flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-top: 2px;">
          <div style="font-size: 8.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; text-align: center; border-bottom: 1.4px solid #000000; padding-bottom: 2px; letter-spacing: 0.5px;">
            ★ Official Pearson Edexcel GCSE Specification Curriculum Checklist (Option 33)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-size: 7.4pt; line-height: 1.30; color: #0f172a; flex: 1;">
            
            <!-- Column 1: KT1 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                KT1: Civil Rights 1954–60
              </div>
              <strong style="display:block; color: #000000; font-size: 7.2pt;">1. Position in early 1950s:</strong>
              <div>&bull; Segregation &amp; Jim Crow laws.</div>
              <div>&bull; Disenfranchisement &amp; terror.</div>
              <div>&bull; Work of NAACP &amp; CORE.</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">2. Education Progress:</strong>
              <div>&bull; Brown v. Topeka (1954).</div>
              <div>&bull; Little Rock High School (1957).</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">3. Montgomery Boycott:</strong>
              <div>&bull; Rosa Parks &amp; 381-day boycott.</div>
              <div>&bull; Browder v Gayle &amp; MLK/SCLC.</div>
              <div>&bull; Civil Rights Act of 1957.</div>

              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">4. White Opposition:</strong>
              <div>&bull; Ku Klux Klan &amp; Emmett Till (1955).</div>
              <div>&bull; Dixiecrats &amp; Citizens' Councils.</div>
            </div>

            <!-- Column 2: KT2 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                KT2: Radicalism 1960–75
              </div>
              <strong style="display:block; color: #000000; font-size: 7.2pt;">1. Developments 1960–62:</strong>
              <div>&bull; Greensboro sit-ins &amp; SNCC.</div>
              <div>&bull; Freedom Riders &amp; Anniston bomb.</div>
              <div>&bull; James Meredith case (1962).</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">2. Peaceful Protests 1963–65:</strong>
              <div>&bull; Birmingham &amp; Washington (1963).</div>
              <div>&bull; Civil Rights Act (1964).</div>
              <div>&bull; Selma &amp; Voting Rights Act (1965).</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">3. Malcolm X &amp; Black Power:</strong>
              <div>&bull; Malcolm X &amp; Nation of Islam.</div>
              <div>&bull; Stokely Carmichael &amp; 1968 Olympics.</div>
              <div>&bull; Black Panther Party methods.</div>

              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">4. Civil Rights 1965–75:</strong>
              <div>&bull; Riots 1965–67 &amp; Kerner Report.</div>
              <div>&bull; King in North &amp; assassination.</div>
              <div>&bull; Progress extent by 1975.</div>
            </div>

            <!-- Column 3: KT3 -->
            <div style="border-right: 1.2px solid #cbd5e1; padding-right: 6px;">
              <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                KT3: Vietnam War 1954–75
              </div>
              <strong style="display:block; color: #000000; font-size: 7.2pt;">1. Involvement 1954–63:</strong>
              <div>&bull; Domino theory &amp; Diem regime.</div>
              <div>&bull; Kennedy, Hamlets &amp; Diem coup.</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">2. Escalation under LBJ:</strong>
              <div>&bull; Vietcong threat expansion.</div>
              <div>&bull; Gulf of Tonkin incident (1964).</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">3. Nature of Conflict 1964–68:</strong>
              <div>&bull; Vietcong guerrilla warfare.</div>
              <div>&bull; Search &amp; Destroy &amp; chemicals.</div>
              <div>&bull; Operation Rolling Thunder.</div>
              <div>&bull; The Tet Offensive (1968).</div>

              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">4. Changes under Nixon:</strong>
              <div>&bull; Vietnamisation &amp; troop exits.</div>
              <div>&bull; Invasions of Cambodia &amp; Laos.</div>
              <div>&bull; 1972 Linebacker bombing.</div>
            </div>

            <!-- Column 4: KT4 -->
            <div>
              <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">
                KT4: Reactions &amp; End 1964–75
              </div>
              <strong style="display:block; color: #000000; font-size: 7.2pt;">1. Opposition to the War:</strong>
              <div>&bull; Students, media &amp; draft system.</div>
              <div>&bull; My Lai Massacre &amp; Lt. Calley.</div>
              <div>&bull; Kent State shootings (1970).</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">2. Support for the War:</strong>
              <div>&bull; Fear of communism.</div>
              <div>&bull; 'Hard hats' &amp; 'silent majority'.</div>
              
              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">3. The Peace Process:</strong>
              <div>&bull; Negotiations 1972–73.</div>
              <div>&bull; Paris Peace Agreement (1973).</div>
              <div>&bull; Human and economic costs.</div>

              <strong style="display:block; color: #000000; font-size: 7.2pt; margin-top: 3px;">4. Reasons for US Failure:</strong>
              <div>&bull; Vietcong &amp; Ho Chi Minh Trail.</div>
              <div>&bull; USSR &amp; Chinese military aid.</div>
              <div>&bull; US tactical failures &amp; dissent.</div>
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
              Paper 3 (Modern Depth Study): 80-Minute Pacing Blueprint &amp; Exam Architecture
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            Exam Blueprint
          </div>
        </div>

        <!-- 1. Four Non-Negotiable Success Principles -->
        <div style="background: #f8fafc; border: 1.5px solid #000; border-radius: 3px; padding: 8px 10px; margin-bottom: 8px;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            The Four Non-Negotiable Rules for Securing Grade 7–9 in Paper 3 (Option 33)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.2pt; line-height: 1.30; color: #1e293b;">
            <div>
              <strong>1. Strict Timing Allocation (80 Mins Total):</strong>
              Spend exactly 30 minutes on Section A (6 mins on Q1 Inference [4m], 24 mins on Q2 Explain Why [12m]), and 50 minutes on Section B (14 mins on Q3a Utility [8m], 6 mins on Q3b Diff [4m], 6 mins on Q3c Why [4m], and 24 mins on Q3d Evaluative Essay [16+4m]).
            </div>
            <div>
              <strong>2. Beyond the Stimulus in Q2 (The Level 2 Cap):</strong>
              In Q2 (Explain Why), examiners provide two bullet prompts. Relying solely on the provided prompts caps your score at Level 2 (5 marks maximum). You MUST include distinct own-knowledge historical factors to access Level 3/4.
            </div>
            <div>
              <strong>3. Forensic C-O-P in Q3(a) Utility:</strong>
              Never dismiss a primary source as "biased and therefore useless." Evaluate <strong>Content</strong> (what it says), <strong>Origin &amp; Purpose</strong> (author's position, motive, date), and <strong>Context</strong> (precise cross-referencing) to explain what it is useful <em>for</em>.
            </div>
            <div>
              <strong>4. Criteria-Driven Evaluation in Q3(d):</strong>
              In the 16+4 mark essay, avoid a superficial summary. Establish explicit criteria (e.g. military effectiveness vs political fallout, grassroots agency vs executive legislation) to substantiate why one interpretation is historically more convincing.
            </div>
          </div>
        </div>

        <!-- 2. Breakdown of the 4 Exam Question Types -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #ffffff; margin-bottom: 8px;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            Structural Masterclasses &amp; Timing Formulas by Question Stem
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.1pt; line-height: 1.30; color: #1e293b;">
            <div style="border-left: 3px solid #000; padding-left: 6px;">
              <strong>• Section A: Q1 Inference [4 Marks &bull; ~6 Mins]</strong><br/>
              <em>Inference-Quote Formula.</em> Give two separate inferences from Source A. For each inference, state the inferred meaning in sentence 1, then cite precise supporting evidence from the source in sentence 2. Zero provenance evaluation.
            </div>
            <div style="border-left: 3px solid #000; padding-left: 6px;">
              <strong>• Section A: Q2 Explain Why [12 Marks &bull; ~24 Mins]</strong><br/>
              <em>3-Paragraph Causal Chain.</em> Point (linking to the question) &rarr; Evidence (dates, statistics, names) &rarr; Explanation (direct mechanism tracing how the factor caused the outcome). Must deploy own knowledge beyond stimulus.
            </div>
            <div style="border-left: 3px solid #000; padding-left: 6px;">
              <strong>• Section B: Q3(a) Source Utility [8 Marks &bull; ~14 Mins]</strong><br/>
              <em>C-O-P Matrix.</em> Evaluate Source B (Content + Context + Provenance NOP) &rarr; Evaluate Source C (Content + Context + Provenance NOP) &rarr; Comparative conclusion explaining how both sources together provide complementary insight.
            </div>
            <div style="border-left: 3px solid #000; padding-left: 6px;">
              <strong>• Section B: Q3(b–d) Historiography [28 Marks &bull; ~36 Mins]</strong><br/>
              <em>The Interpretations Suite.</em> 3(b) State core difference in views [4m] &bull; 3(c) Explain why views differ by matching to different sources/focuses [4m] &bull; 3(d) Evaluative essay testing both interpretations against own knowledge with criteria judgement [16+4 SPaG].
            </div>
          </div>
        </div>

        <!-- 3. Assessment Objectives & Grade 9 Rubric -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #fafafa;">
          <div style="font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 3px;">
            Assessment Objectives (AO1–AO4) Distribution &bull; 52 Raw Marks Total
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-size: 6.8pt; line-height: 1.25; color: #1e293b;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px;">
              <strong style="color: #000; display: block;">AO1: Factual Recall (16m)</strong>
              Precise knowledge across civil rights and Vietnam: exact acts, dates, statistics, casualties, and leaders.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px;">
              <strong style="color: #000; display: block;">AO2: Causation &amp; Analysis (12m)</strong>
              Multi-layered causal explanations showing primary vs secondary triggers and sustained historical mechanisms.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px;">
              <strong style="color: #000; display: block;">AO3: Source Utility (8m)</strong>
              Evaluating contemporary primary evidence using Content, Provenance (NOP), and Historical Context.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px;">
              <strong style="color: #000; display: block;">AO4: Interpretations (16+4m)</strong>
              Analyzing how and why historians differ, testing views against sources and facts to substantiate a final verdict.
            </div>
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option 33: The USA, 1954–75</span>
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
              Synchronized Chronology &bull; Thematic Arc
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 800; color: #000; margin: 2px 0 0 0;">
              Dual Chronological Matrix: Conflict at Home vs. Conflict Abroad (1954–1975)
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            1954–1975 Timeline
          </div>
        </div>

        <!-- 3-Column Parallel Master Chronology -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          
          <!-- Column 1: KT1 & Early KT2 (1954–1963) -->
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              Era 1: Legal Challenges &amp; Direct Action (1954–63)
            </div>
            <div style="font-size: 6.8pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>May 1954:</strong> <em>Brown v. Board of Education</em> outlaws segregated public schools.</div>
              <div><strong>Aug 1955:</strong> Emmett Till murdered in Mississippi; killers acquitted in 67 mins.</div>
              <div><strong>Dec 1955:</strong> Rosa Parks arrested; 381-day Montgomery Bus Boycott begins.</div>
              <div><strong>Nov 1956:</strong> <em>Browder v. Gayle</em> rules bus segregation unconstitutional.</div>
              <div><strong>Sep 1957:</strong> Little Rock Nine integrated Central High under 101st Airborne.</div>
              <div><strong>Feb 1960:</strong> Greensboro lunch counter sit-ins; SNCC formed in April.</div>
              <div><strong>May 1961:</strong> CORE Freedom Rides test interstate travel; Anniston bus bombed.</div>
              <div><strong>Oct 1962:</strong> James Meredith integrates University of Mississippi ('Ole Miss').</div>
              <div><strong>May 1963:</strong> SCLC Birmingham Campaign; Bull Connor uses dogs &amp; hoses.</div>
              <div><strong>Aug 1963:</strong> March on Washington; King delivers "I Have a Dream" speech.</div>
              <div><strong>Nov 1963:</strong> Ngo Dinh Diem assassinated; JFK assassinated in Dallas.</div>
            </div>
          </div>

          <!-- Column 2: KT2 & KT3 Escalation (1964–1968) -->
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              Era 2: Legislative Triumphs &amp; Vietnam Escalation (1964–68)
            </div>
            <div style="font-size: 6.8pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>Jul 1964:</strong> LBJ signs historic Civil Rights Act banning segregation.</div>
              <div><strong>Aug 1964:</strong> Gulf of Tonkin Incident; Congress passes Gulf of Tonkin Resolution.</div>
              <div><strong>Feb 1965:</strong> Malcolm X assassinated in Harlem; Operation Rolling Thunder begins.</div>
              <div><strong>Mar 1965:</strong> Selma to Montgomery marches; 3,500 US Marines land at Da Nang.</div>
              <div><strong>Aug 1965:</strong> Voting Rights Act signed; Watts riots erupt in Los Angeles.</div>
              <div><strong>Oct 1966:</strong> Black Panther Party founded by Huey Newton &amp; Bobby Seale.</div>
              <div><strong>Jan 1968:</strong> Tet Offensive launched across South Vietnam; US credibility gap.</div>
              <div><strong>Mar 1968:</strong> My Lai Massacre (347–504 killed); LBJ withdraws from re-election.</div>
              <div><strong>Apr 1968:</strong> Martin Luther King Jr. assassinated in Memphis; nationwide riots.</div>
              <div><strong>Oct 1968:</strong> Tommie Smith &amp; John Carlos Black Power salute at Mexico Olympics.</div>
            </div>
          </div>

          <!-- Column 3: KT3 & KT4 End of War (1969–1975) -->
          <div style="border: 1.5px solid #000; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 4px;">
              Era 3: Radicalism, Disillusionment &amp; US Exit (1969–75)
            </div>
            <div style="font-size: 6.8pt; line-height: 1.28; color: #1e293b; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>Nov 1969:</strong> Nixon's 'Silent Majority' address; My Lai Massacre exposed in press.</div>
              <div><strong>Apr 1970:</strong> US invasion of Cambodia sparks massive campus protests.</div>
              <div><strong>May 1970:</strong> Kent State shootings (4 students killed); Hard Hat riot in NYC.</div>
              <div><strong>Feb 1971:</strong> ARVN invasion of Laos (Operation Lam Son 719) fails disastrously.</div>
              <div><strong>May 1972:</strong> Operation Linebacker mining and heavy bombing of North Vietnam.</div>
              <div><strong>Dec 1972:</strong> 'Christmas Bombings' (Linebacker II) force Hanoi to negotiate.</div>
              <div><strong>Jan 1973:</strong> Paris Peace Agreement signed; last US combat troops withdraw.</div>
              <div><strong>Nov 1973:</strong> War Powers Act limits presidential power to wage undeclared war.</div>
              <div><strong>Aug 1974:</strong> Nixon resigns following Watergate; Gerald Ford becomes president.</div>
              <div><strong>Apr 1975:</strong> Fall of Saigon; North Vietnamese tanks crush presidential palace.</div>
            </div>
          </div>

        </div>

        <!-- Examiner Synoptic Takeaway Box -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #fafafa;">
          <div style="font-size: 7.4pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 2px;">
            Examiner Synoptic Takeaway: The Collision of Domestic Reform and Foreign Quagmire
          </div>
          <p style="margin: 0; font-size: 7.0pt; line-height: 1.30; color: #1e293b;">
            Notice the profound historical interconnection across the 21-year period: (1) <strong>The Great Society Diverted:</strong> President Johnson’s ambition to eliminate poverty and racial injustice was starved of federal funding by the spiraling costs of the Vietnam War ($167 billion). (2) <strong>Disillusionment and Radicalisation:</strong> The slow pace of economic equality in northern ghettos, combined with the disproportionate drafting of working-class and Black soldiers in Vietnam, fractured the non-violent consensus of 1963 into Black Power militancy and anti-war student radicalism. (3) <strong>The Imperial Presidency Checked:</strong> The Gulf of Tonkin Resolution gave the White House unchecked war-making powers in 1964; by 1973, military defeat and public outrage forced Congress to pass the War Powers Act, fundamentally reasserting constitutional limits on executive power.
          </p>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option 33: The USA, 1954–75</span>
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

  const figuresHtml = (left.keyFigures || [])
    .map(
      (fig) => `
    <div style="background: #f8fafc; border: 1.2px solid #000; border-radius: 3px; padding: 4px 6px;">
      <strong style="font-size: 7.2pt; color: #000; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${fig.name}</strong>
      <div style="font-size: 6.6pt; color: #334155; line-height: 1.22;">${formatMd(fig.role)}</div>
    </div>
  `,
    )
    .join('');

  const milestonesHtml = (left.milestones || [])
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

        <!-- Chronological Milestone Anchor Strip -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.0pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.4px; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; display: flex; justify-content: space-between;">
            <span>Chronological Milestone Anchor &bull; Key Turning Points</span>
            <span style="color: #475569; font-weight: 600;">Paper 3 Core Specification</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(${left.milestones.length}, 1fr); gap: 6px; font-size: 6.6pt; line-height: 1.25; color: #1e293b;">
            ${milestonesHtml}
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option 33: The USA, 1954–75</span>
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
            <div style="font-size: 6.8pt; color: #475569; font-weight: 700; margin-top: 2px;">${q.marksTime || 'Paper 3 Specification'}</div>
          </div>
        </div>

        <!-- Exam Masterclass Card with Model Answer -->
        <div style="background: #ffffff; border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; margin-bottom: 7px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
            <span style="font-size: 8.6pt; font-weight: 800; color: #000;">
              Exam Task: ${q.stem}
            </span>
            <span style="font-size: 8.2pt; font-weight: 800; color: #000; white-space: nowrap;">[${q.marks} Marks]</span>
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
        <span>GCSE History Visual Revision Guide &bull; Option 33: The USA, 1954–75</span>
        <span>Assessment Mastery &bull; Page ${pageNum}</span>
      </div>
    </div>
  `;
}

function renderPage36() {
  return `
    <div class="page" id="page_36" data-page="36">
      <div>
        <div class="page-header">
          <div>
            <span style="font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000; letter-spacing: 0.5px;">
              Historiographical Perspectives &bull; Paper 3 Master Review
            </span>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; font-weight: 800; color: #000; margin: 2px 0 0 0;">
              Master Historiographical Perspectives &amp; Grade 9 Synoptic Review
            </h2>
          </div>
          <div style="font-size: 7.6pt; font-weight: 800; background: #000; color: #fff; padding: 2px 8px; border-radius: 2px; text-transform: uppercase;">
            Historiography &bull; Page 36
          </div>
        </div>

        <!-- 1. Civil Rights Movement Debates -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #ffffff; margin-bottom: 7px;">
          <div style="font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1.2px solid #000; padding-bottom: 2px;">
            1. Civil Rights Movement Historiography: Competing Academic Interpretations
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 6.9pt; line-height: 1.26; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #000; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                Traditional / King-Centric
              </div>
              <div>&bull; <strong>Core Thesis:</strong> Focuses on charismatic leadership of Martin Luther King Jr., moral non-violence, and federal executive partnership (JFK/LBJ).</div>
              <div>&bull; <strong>Turning Point:</strong> March on Washington (1963) and Selma (1965) forcing Congress to pass landmark civil rights legislation.</div>
              <div>&bull; <strong>Key Historians:</strong> David Garrow, Taylor Branch.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #000; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                Revisionist / Grassroots Movement
              </div>
              <div>&bull; <strong>Core Thesis:</strong> Emphasises bottom-up local organizing by women, students, and local Black communities (Ella Baker, Fannie Lou Hamer, Jo Ann Robinson).</div>
              <div>&bull; <strong>Turning Point:</strong> Montgomery Women's Council, Greensboro sit-ins, and Mississippi Freedom Summer driving momentum before King arrived.</div>
              <div>&bull; <strong>Key Historians:</strong> Clayborne Carson, Charles Payne.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #000; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                Black Power / Armed Self-Defense
              </div>
              <div>&bull; <strong>Core Thesis:</strong> Non-violence was effective only because the armed alternative (Malcolm X, Robert F. Williams, Black Panthers) threatened white authority.</div>
              <div>&bull; <strong>Turning Point:</strong> Watts riots (1965) and Black Panther community survival programs exposing northern economic apartheid.</div>
              <div>&bull; <strong>Key Historians:</strong> Peniel Joseph, Timothy Tyson.</div>
            </div>
          </div>
        </div>

        <!-- 2. Vietnam War Historiography Debates -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #ffffff; margin-bottom: 7px;">
          <div style="font-size: 7.8pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 4px; border-bottom: 1.2px solid #000; padding-bottom: 2px;">
            2. Vietnam War Historiography: Why Did the United States Fail?
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 6.9pt; line-height: 1.26; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #000; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                Orthodox / 'Quagmire' School
              </div>
              <div>&bull; <strong>Core Thesis:</strong> The war was an unwinnable error from the outset. US policymakers misunderstood Vietnamese nationalism as monolithic communism.</div>
              <div>&bull; <strong>Failure Cause:</strong> Backing corrupt, illegitimate Saigon regimes and using futile conventional firepower against a resilient peasant guerrilla movement.</div>
              <div>&bull; <strong>Key Historians:</strong> David Halberstam, Stanley Karnow.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #000; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                Revisionist / 'Noble Cause' School
              </div>
              <div>&bull; <strong>Core Thesis:</strong> The war was a morally justified defense of South Vietnam against aggressive Soviet and Chinese expansion.</div>
              <div>&bull; <strong>Failure Cause:</strong> The US military was undefeated in major battles (e.g. crushed Tet), but was betrayed by political micromanagement and media defeatism.</div>
              <div>&bull; <strong>Key Historians:</strong> Guenter Lewy, Harry Summers.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #000; font-size: 7.2pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                Post-Revisionist / Internationalist
              </div>
              <div>&bull; <strong>Core Thesis:</strong> Synthesises archival records from Hanoi, Moscow, and Beijing showing that North Vietnam was determined to reunify regardless of cost.</div>
              <div>&bull; <strong>Failure Cause:</strong> Washington was boxed in: unable to invade North Vietnam due to fear of Chinese/Soviet nuclear escalation, yet unable to stabilise the South.</div>
              <div>&bull; <strong>Key Historians:</strong> Fredrik Logevall, Lien-Hang Nguyen.</div>
            </div>
          </div>
        </div>

        <!-- 3. Grade 9 Final Pre-Exam Checklist -->
        <div style="border: 1.5px solid #000; border-radius: 3px; padding: 7px 10px; background: #fafafa;">
          <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000; margin-bottom: 3px; border-bottom: 1px solid #000; padding-bottom: 2px;">
            Grade 9 Final Pre-Exam Checklist: Can You Execute These Paper 3 Skills?
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 6.9pt; line-height: 1.26; color: #1e293b;">
            <div>
              <div>&bull; <strong>Q1 Inference (4m):</strong> Can you give 2 inferences + 2 direct quotes in under 6 minutes without analyzing provenance?</div>
              <div>&bull; <strong>Q2 Causation (12m):</strong> Can you write 3 P-E-E paragraphs with at least one piece of own knowledge beyond the stimulus?</div>
              <div>&bull; <strong>Q3(a) Utility (8m):</strong> Can you evaluate Content, Provenance (NOP), and Context for both Source B and Source C?</div>
            </div>
            <div>
              <div>&bull; <strong>Q3(b) &amp; Q3(c) Views (8m):</strong> Can you clearly state the difference in view and explain why (matching to sources/emphasis)?</div>
              <div>&bull; <strong>Q3(d) Evaluative Essay (16+4m):</strong> Can you evaluate both interpretations and substantiate a criteria-led final verdict?</div>
              <div>&bull; <strong>Key Dates:</strong> 1954 Brown, 1957 Little Rock, 1963 Birmingham, 1964 Tonkin/CRA, 1968 Tet, 1970 Kent State, 1973 Paris.</div>
            </div>
          </div>
        </div>

      </div>

      <div class="page-footer">
        <span>GCSE History Visual Revision Guide &bull; Option 33: The USA, 1954–75</span>
        <span>Historiography &bull; Page 36</span>
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
  renderPage36,
  formatMd,
};
