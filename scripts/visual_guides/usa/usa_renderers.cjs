const fs = require('fs');
const path = require('path');

function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function getStyles() {
  return `
  @page {
    size: A4 portrait;
    margin: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #e2e8f0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #000000;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    height: 297mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    background: #ffffff;
    box-sizing: border-box;
    padding: 13mm 15mm 11mm 15mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .page-header {
    border-bottom: 2px solid #000000;
    padding-bottom: 3px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .archival-tag {
    font-size: 7.2pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #475569;
    display: block;
    margin-bottom: 1px;
  }

  .page-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 14.5pt;
    font-weight: 800;
    color: #000000;
    margin: 0;
    line-height: 1.12;
  }

  .page-badge {
    border: 1.5px solid #000000;
    border-radius: 2px;
    padding: 2px 7px;
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #000000;
    background: #ffffff;
    white-space: nowrap;
  }

  .page-footer {
    border-top: 1px solid #000000;
    padding-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.0pt;
    color: #475569;
    font-weight: 600;
  }

  .page-num {
    font-weight: 800;
    font-size: 7.6pt;
    color: #000000;
  }

  .wb-pill {
    background: #000000;
    color: #ffffff;
    padding: 1px 5px;
    border-radius: 2px;
    font-weight: 800;
    font-size: 6.8pt;
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 2px;
    letter-spacing: 0.2px;
  }
  `;
}

// Page 1: Front Cover
function renderPage1(getImageDataUri) {
  const homeImgUri = getImageDataUri('images/usa_march_on_washington_leaders.jpg');
  const abroadImgUri = getImageDataUri('images/huey_combat_landing_vietnam.jpg');

  return `
    <div class="page" id="page_1" data-page="1" style="padding: 12mm 15mm 10mm 15mm;">
      <!-- Outer Archival Border -->
      <div style="position: absolute; top: 8mm; left: 10mm; right: 10mm; bottom: 8mm; border: 2px solid #000000; pointer-events: none;"></div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; position: relative; z-index: 1;">
        <!-- Top Institutional Strip -->
        <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8.4pt; font-weight: 900; letter-spacing: 0.8px; text-transform: uppercase;">
            PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION 33
          </span>
          <span style="font-size: 7.6pt; font-weight: 800; letter-spacing: 0.4px;">
            1HI0/33 &bull; PAPER 3 SPECIFICATION GUIDE
          </span>
        </div>

        <!-- Master Title Block -->
        <div style="text-align: center; margin: 4px 0 3px 0;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24pt; font-weight: 900; margin: 0 0 2px 0; line-height: 1.08; letter-spacing: -0.5px; color: #000000;">
            Conflict at Home and Abroad: the USA, 1954–1975
          </h1>
          <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 11.5pt; font-style: italic; color: #1e293b; margin-bottom: 4px;">
            Visual Revision Masterclasses &amp; Complete Specification Guide
          </div>
          <div style="display: flex; justify-content: center; gap: 8px; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
            <span style="background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">PAPER 3: MODERN DEPTH STUDY</span>
            <span style="border: 1px solid #000000; padding: 2px 8px; border-radius: 2px;">TIME: 1 HOUR 20 MINUTES</span>
            <span style="border: 1px solid #000000; padding: 2px 8px; border-radius: 2px;">TOTAL: 52 RAW MARKS (+4 SPaG = 56)</span>
            <span style="background: #000000; color: #ffffff; padding: 2px 8px; border-radius: 2px;">36-PAGE MASTER VOLUME</span>
          </div>
        </div>

        <!-- Dual Contrasting Archival Plates: Conflict at Home vs Conflict Abroad -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
            DUAL ARCHIVAL PLATES: THE TWO DEFINING ARENAS OF AMERICAN TURMOIL (1954–1975)
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <!-- Left Plate: Conflict at Home (March on Washington) -->
            <div style="border: 1px solid #000000; border-radius: 2px; padding: 4px 6px; background: #fafafa; display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
                <strong style="font-size: 7.2pt; text-transform: uppercase; color: #000000;">1. CONFLICT AT HOME: CIVIL RIGHTS</strong>
                <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">Warren K. Leffler / NARA / LOC</span>
              </div>
              <div style="height: 125px; border: 1px solid #000000; border-radius: 2px; overflow: hidden; background: #000000; margin-bottom: 3px;">
                <img src="${homeImgUri}" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block;" alt="Civil Rights Leaders at March on Washington 1963" />
              </div>
              <div style="font-size: 6.8pt; font-style: italic; font-weight: 700; color: #000000; margin-bottom: 2px; line-height: 1.15;">
                "Civil rights leaders marching arm-in-arm along Constitution Avenue, Washington D.C. (28 August 1963)"
              </div>
              <div style="font-size: 6.2pt; color: #334155; line-height: 1.18; margin-bottom: 2px;">
                <strong>Archive Citation:</strong> US National Archives &amp; Records Administration (NARA) / Library of Congress (LC-U9-10335-08). Photograph by Warren K. Leffler.
              </div>
              <div style="font-size: 6.2pt; color: #1e293b; line-height: 1.18;">
                <strong>Historical Context:</strong> Over 250,000 Americans gathered at the Lincoln Memorial demanding civil and economic rights. Leaders including A. Philip Randolph, Roy Wilkins, and Walter Reuther marched arm-in-arm, creating irresistible pressure for the Civil Rights Act of 1964.
              </div>
            </div>

            <!-- Right Plate: Conflict Abroad (Huey Airmobility Combat) -->
            <div style="border: 1px solid #000000; border-radius: 2px; padding: 4px 6px; background: #fafafa; display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
                <strong style="font-size: 7.2pt; text-transform: uppercase; color: #000000;">2. CONFLICT ABROAD: THE VIETNAM WAR</strong>
                <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">US Army Signal Corps / NARA</span>
              </div>
              <div style="height: 125px; border: 1px solid #000000; border-radius: 2px; overflow: hidden; background: #000000; margin-bottom: 3px;">
                <img src="${abroadImgUri}" style="width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block;" alt="UH-1D Huey Helicopters Combat Assault Vietnam 1967" />
              </div>
              <div style="font-size: 6.8pt; font-style: italic; font-weight: 700; color: #000000; margin-bottom: 2px; line-height: 1.15;">
                "US 1st Cavalry Division troops disembark from Bell UH-1D Huey helicopters during Operation Oregon (1967)"
              </div>
              <div style="font-size: 6.2pt; color: #334155; line-height: 1.18; margin-bottom: 2px;">
                <strong>Archive Citation:</strong> US Army Signal Corps / US National Archives (NARA), Record ID: 111-SC-638062 (Duc Pho combat landing).
              </div>
              <div style="font-size: 6.2pt; color: #1e293b; line-height: 1.18;">
                <strong>Historical Context:</strong> US infantrymen deploy rapidly from Bell UH-1D 'Huey' helicopters into an active hot landing zone. The photograph epitomises General Westmoreland's airmobile 'search and destroy' doctrine in South Vietnam.
              </div>
            </div>
          </div>
        </div>

        <!-- Candidate Information Frame -->
        <div style="border: 1.5px solid #000000; border-radius: 2px; padding: 4px 10px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt;">
          <div style="display: flex; align-items: center; flex: 1.4;">
            <strong style="font-size: 8.0pt; text-transform: uppercase;">PUPIL:</strong>
            <span style="display: inline-block; border-bottom: 1.5px solid #000000; flex: 1; margin: 0 12px 0 6px;">&nbsp;</span>
          </div>
          <div style="display: flex; gap: 14px; font-size: 7.6pt; font-weight: 700;">
            <span><strong>Class:</strong> Year 11</span>
            <span><strong>Teacher:</strong> Mr Lovett</span>
            <span><strong>School:</strong> Meoncross School</span>
          </div>
        </div>

        <!-- The 4 Question Formats of Paper 3 -->
        <div style="display: grid; grid-template-columns: 1fr 1.25fr 1.2fr 1.55fr; gap: 6px;">
          <!-- Q1 -->
          <div style="border: 1.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-size: 7.2pt; text-transform: uppercase;">Q1: INFERENCE</strong>
              <span style="font-size: 6.8pt; font-weight: 800;">4M</span>
            </div>
            <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.2;">
              Give TWO valid inferences from Source A (~6 mins). State inference &rarr; quote direct evidence. Zero evaluation.
            </div>
          </div>

          <!-- Q2 -->
          <div style="border: 1.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-size: 7.2pt; text-transform: uppercase;">Q2: EXPLAIN WHY</strong>
              <span style="font-size: 6.8pt; font-weight: 800;">12M</span>
            </div>
            <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.2;">
              Multi-causal explanation (~18 mins). 3 developed PEEL paragraphs. MUST include own knowledge beyond stimulus.
            </div>
          </div>

          <!-- Q3(a) -->
          <div style="border: 1.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-size: 7.2pt; text-transform: uppercase;">Q3(a): UTILITY</strong>
              <span style="font-size: 6.8pt; font-weight: 800;">8M</span>
            </div>
            <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.2;">
              How useful are Sources B and C (~14 mins). Evaluate Content, Provenance (COP: author, motive, date), and Context.
            </div>
          </div>

          <!-- Q3(b-d) -->
          <div style="border: 1.5px solid #000000; border-radius: 2px; padding: 4px 6px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-size: 7.2pt; text-transform: uppercase;">Q3(b–d): INTERPRETATIONS</strong>
              <span style="font-size: 6.8pt; font-weight: 800;">4+4+16(+4)=28M</span>
            </div>
            <div style="font-size: 6.4pt; color: #1e293b; line-height: 1.2;">
              3(b) Differences in views [4m] &bull; 3(c) Reasons for difference [4m] &bull; 3(d) Evaluative essay with criteria judgement [16+4 SPaG].
            </div>
          </div>
        </div>

        <!-- Official Pearson Edexcel Specification Checklist (4 Columns) -->
        <div style="border: 1.5px solid #000000; border-radius: 2px; padding: 4px 8px; background: #ffffff;">
          <div style="font-size: 7.4pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4px; text-align: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
            &star; OFFICIAL PEARSON EDEXCEL SPECIFICATION CURRICULUM CHECKLIST (OPTION 33)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-size: 6.0pt; line-height: 1.22; color: #1e293b;">
            <!-- Col 1: KT1 -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                KT1: CIVIL RIGHTS 1954–60
              </strong>
              <strong>1. Position early 1950s:</strong> Segregation, Jim Crow, voting denial, NAACP, CORE.<br/>
              <strong>2. Education progress:</strong> Brown v Board (1954), Brown II (1955), Little Rock Nine (1957).<br/>
              <strong>3. Montgomery Boycott:</strong> Rosa Parks, MIA, MLK, Browder v Gayle, SCLC, 1957 Act.<br/>
              <strong>4. Opposition:</strong> KKK, Emmett Till (1955), WCC, Dixiecrats, Southern Manifesto.
            </div>

            <!-- Col 2: KT2 -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                KT2: PROTEST &amp; RADICALISM
              </strong>
              <strong>1. Progress 1960–62:</strong> Greensboro sit-ins, SNCC, Freedom Rides, James Meredith (1962).<br/>
              <strong>2. Peaceful protests 1963–65:</strong> Birmingham (1963), March on Washington, Selma (1965).<br/>
              <strong>3. Federal laws:</strong> Civil Rights Act 1964, Voting Rights Act 1965.<br/>
              <strong>4. Black Power &amp; Riots:</strong> Malcolm X, Black Panthers, Watts, Detroit, Kerner Report, MLK killed.
            </div>

            <!-- Col 3: KT3 -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                KT3: VIETNAM ESCALATION
              </strong>
              <strong>1. US involvement 1954–63:</strong> Domino theory, Ngo Dinh Diem, Vietcong, Strategic Hamlets.<br/>
              <strong>2. Escalation 1964–65:</strong> Gulf of Tonkin Incident &amp; Resolution, Rolling Thunder, Da Nang (1965).<br/>
              <strong>3. Combat tactics:</strong> Search and destroy, napalm, Agent Orange, Vietcong guerrilla tunnels.<br/>
              <strong>4. Turning point 1968:</strong> Tet Offensive, Walter Cronkite, My Lai, LBJ withdraws.
            </div>

            <!-- Col 4: KT4 -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                KT4: END OF US INVOLVEMENT
              </strong>
              <strong>1. Anti-war movement:</strong> Media role, draft resistance, Moratorium, Kent State (1970).<br/>
              <strong>2. Pro-war support:</strong> Nixon's Silent Majority speech, Hard Hat riot (1970).<br/>
              <strong>3. Peace negotiations:</strong> Secret talks, Kissinger, Le Duc Tho, Linebacker bombings.<br/>
              <strong>4. US exit &amp; defeat:</strong> Paris Accords 1973, War Powers Act, Fall of Saigon (1975), failure causes.
            </div>
          </div>
        </div>

        <!-- Institutional Footer -->
        <div style="border-top: 1.5px solid #000000; padding-top: 2px; display: flex; justify-content: space-between; font-size: 6.8pt; font-weight: 700; color: #475569;">
          <span>Meoncross History Department &bull; GCSE Masterclass Series</span>
          <span>PEARSON EDEXCEL 1HI0/33 &bull; 36-PAGE MASTER VOLUME</span>
        </div>
      </div>
    </div>
  `;
}

// Page 2: Paper 3 Blueprint & Non-Negotiable Success Principles
function renderPage2() {
  return `
    <div class="page" id="page_2" data-page="2">
      <div class="page-header">
        <div>
          <span class="archival-tag">Paper 3 Blueprint &bull; Exam Overview</span>
          <h2 class="page-title">Edexcel GCSE Paper 3: Exam Structure, Timings &amp; Success Principles</h2>
        </div>
        <div class="page-badge">Total Marks: 52 (+4 SPaG) &bull; Time: 1h 20m</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #000000; color: #ffffff; padding: 7px 12px; border-radius: 3px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 9.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4px;">
              Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Modern Depth Study Blueprint
            </div>
            <div style="font-size: 7.2pt; color: #e2e8f0; line-height: 1.25; margin-top: 1px;">
              Option 33 tests both deep knowledge recall and forensic historical skills: <strong>Section A (16m &bull; 20% of GCSE)</strong> focuses on inference and multi-causal explanation; <strong>Section B (36m &bull; 30% of GCSE)</strong> focuses on source utility and historiographical interpretations.
            </div>
          </div>
        </div>

        <!-- Assessment Objectives Bar (AO1–AO4) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel Paper 3 Assessment Objectives (AO1–AO4)</span>
            <span style="color: #475569; font-size: 6.8pt;">52 Raw Marks Total &bull; 100% of Paper 3</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; font-size: 6.8pt; line-height: 1.22; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO1: Recall Knowledge</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">16 Marks (31%)</div>
              Demonstrate precise factual recall across all 4 Key Topics: exact dates, acts, casualties, and protagonists.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO2: Causation &amp; Analysis</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">12 Marks (23%)</div>
              Explain why events happened using multi-layered causal factors, direct mechanisms, and sustained consequences.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO3: Source Utility (COP)</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">8 Marks (15%)</div>
              Evaluate contemporary sources for a specific enquiry using Content, Origin/Provenance, and Contextual knowledge.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO4: Interpretations (Q3d)</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">16m + 4 SPaG (31%)</div>
              Evaluate how and why historians differ, testing views against sources and own knowledge to reach a criteria judgement.
            </div>
          </div>
        </div>

        <!-- Four Non-Negotiable Success Principles -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Four Non-Negotiable Paper 3 Success Principles</span>
            <span style="font-size: 6.8pt; color: #475569;">Examiner Standards</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.25; color: #1e293b;">
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">1. Strict 80-Minute Timing Discipline</strong>
              Allocate your time ruthlessly: <strong>Q1 (6 mins)</strong>, <strong>Q2 (18 mins)</strong>, <strong>Q3(a) (14 mins)</strong>, <strong>Q3(b) (6 mins)</strong>, <strong>Q3(c) (6 mins)</strong>, <strong>Q3(d) (25 mins)</strong>, leaving 5 minutes for final proofreading. Never let Q2 run over 20 minutes.
            </div>
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">2. Beyond the Stimulus in Q2 (The Level 2 Trap)</strong>
              Edexcel mark schemes strictly state: an answer relying <em>only</em> on the provided stimulus points is capped at <strong>Level 2 (5 marks maximum out of 12)</strong>. You MUST introduce at least one substantial own knowledge factor not mentioned on the exam paper.
            </div>
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">3. Forensic COP in Q3(a) Utility</strong>
              Never dismiss a source as "biased and therefore useless." Evaluate <strong>Content</strong> (what it reveals), <strong>Origin &amp; Purpose</strong> (author's position, motive, date), and <strong>Context</strong> (precise historical cross-reference) to explain what it is useful <em>for</em>.
            </div>
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">4. Criteria-Driven Evaluation in Q3(d)</strong>
              In the 16+4 mark essay, avoid a superficial "agree with both" summary. Establish explicit criteria (e.g. military effectiveness vs political fallout, grassroots agency vs executive action) to substantiate why one interpretation is historically superior.
            </div>
          </div>
        </div>

        <!-- Historian's Analytical Connective Vault -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #f8fafc;">
          <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Historian's Analytical Connective Vault &bull; Paper 3 Phrase Bank</span>
            <span style="font-size: 6.8pt; color: #475569;">High-Yield Writing Scaffolds</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.24; color: #1e293b;">
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Causal Transitions (Q2)</strong>
              &bull; "This served as the primary catalyst because..."<br/>
              &bull; "Consequently, federal intervention became unavoidable..."<br/>
              &bull; "This directly exacerbated domestic opposition by..."<br/>
              &bull; "Fundamentally, this transformed military strategy from..."
            </div>
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Source Provenance (Q3a)</strong>
              &bull; "Given that the author was directly positioned to observe..."<br/>
              &bull; "The utility is enhanced by its confidential nature as..."<br/>
              &bull; "However, the motive to secure congressional funding suggests..."<br/>
              &bull; "Cross-referenced with contemporary casualties, this proves..."
            </div>
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Historiographical Weight (Q3d)</strong>
              &bull; "Interpretation 1 places primary weight on..."<br/>
              &bull; "Conversely, Interpretation 2 adopts a revisionist stance..."<br/>
              &bull; "While Int 1 accurately reflects elite policy decisions..."<br/>
              &bull; "On balance, Int 2 provides a more persuasive verdict because..."
            </div>
          </div>
        </div>

        <!-- Examiner Warning Pitfalls Strip -->
        <div style="background: #ffffff; border: 1.5px solid #000000; border-radius: 3px; padding: 4px 8px; font-size: 6.8pt; color: #000000; line-height: 1.24;">
          <div style="font-weight: 900; font-size: 7.2pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            &cross; THREE DEADLY EXAMINER PITFALLS TO AVOID ON PAPER 3:
          </div>
          <strong>1. Surface Copying in Q1:</strong> Stating "the source shows a sign" is description, not inference. You must infer the underlying social reality (e.g. institutionalized racial hierarchy).<br/>
          <strong>2. The Section B Source Confusion:</strong> Treating Q3(b) and Q3(c) as source utility questions. They are about HISTORIANS' VIEWS, not primary source reliability.<br/>
          <strong>3. One-Sided Essay in Q3(d):</strong> Writing solely about Interpretation 1 will cap your mark at 8/16. You MUST evaluate BOTH interpretations with balanced own knowledge.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">2</span>
      </div>
    </div>
  `;
}

// Page 3: Master Chronological Matrix & Synoptic Architecture (1954–1975)
function renderPage3() {
  return `
    <div class="page" id="page_3" data-page="3">
      <div class="page-header">
        <div>
          <span class="archival-tag">Master Chronology &bull; Synoptic Timeline</span>
          <h2 class="page-title">Paper 3 Master Chronological Matrix &amp; Synoptic Architecture (1954–1975)</h2>
        </div>
        <div class="page-badge">1954–1975 Master Sequence</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 5px 10px;">
          <div style="font-size: 8.8pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            Synchronized Dual Chronology: The Collision of Domestic Protests and Foreign War
          </div>
          <div style="font-size: 7.2pt; color: #1e293b; line-height: 1.25;">
            Mastering Paper 3 requires understanding how the struggle for racial equality at home unfolded simultaneously with American military escalation in Southeast Asia, creating an unprecedented domestic political crisis that fractured American society.
          </div>
        </div>

        <!-- 2-Column Parallel Chronology Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 4px 0;">
          <!-- Left Column: Civil Rights Timeline (1954–1968) -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Civil Rights Movement (1954–1968)</span>
              <span style="font-size: 6.8pt; color: #475569;">Conflict at Home</span>
            </div>
            <div style="font-size: 6.7pt; line-height: 1.25; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>May 1954:</strong> Supreme Court outlaws segregated schools in <em>Brown v. Board of Education</em>.</div>
              <div><strong>Aug 1955:</strong> Murder of 14-year-old Emmett Till in Mississippi galvanizes national outrage.</div>
              <div><strong>Dec 1955:</strong> Rosa Parks arrested in Montgomery; 381-day Bus Boycott begins under MLK.</div>
              <div><strong>Nov 1956:</strong> Supreme Court declares Montgomery bus segregation unconstitutional (<em>Browder v Gayle</em>).</div>
              <div><strong>Sep 1957:</strong> Little Rock Crisis; Eisenhower dispatches 101st Airborne to enforce integration.</div>
              <div><strong>Feb 1960:</strong> Greensboro sit-ins launch lunch counter protests; SNCC founded in April.</div>
              <div><strong>May 1961:</strong> CORE Freedom Rides challenge interstate bus segregation; buses firebombed in Alabama.</div>
              <div><strong>Oct 1962:</strong> James Meredith integrates Ole Miss; Kennedy sends 500 US Marshals to quell riots.</div>
              <div><strong>Apr 1963:</strong> SCLC Project C in Birmingham; Bull Connor uses police dogs and fire hoses on marchers.</div>
              <div><strong>Aug 1963:</strong> March on Washington draws 250,000; King delivers "I Have a Dream" address.</div>
              <div><strong>Jul 1964:</strong> President Johnson signs historic Civil Rights Act of 1964 banning public segregation.</div>
              <div><strong>Feb 1965:</strong> Malcolm X assassinated in New York City after breaking with the Nation of Islam.</div>
              <div><strong>Mar 1965:</strong> "Bloody Sunday" at Selma bridge; Voting Rights Act of 1965 signed in August.</div>
              <div><strong>Aug 1965:</strong> Watts Riot erupts in Los Angeles (34 dead); signifies shift to northern economic anger.</div>
              <div><strong>Jun 1966:</strong> Stokely Carmichael proclaims "Black Power" on the March Against Fear.</div>
              <div><strong>Oct 1966:</strong> Black Panther Party for Self-Defense founded in Oakland by Newton and Seale.</div>
              <div><strong>Jul 1967:</strong> "Long Hot Summer": devastating urban rebellions erupt in Newark and Detroit.</div>
              <div><strong>Mar 1968:</strong> Kerner Commission warns: "Our nation is moving toward two societies: separate, unequal."</div>
              <div><strong>Apr 1968:</strong> Martin Luther King Jr. assassinated in Memphis; riots in over 100 cities; Fair Housing Act passed.</div>
            </div>
          </div>

          <!-- Right Column: Vietnam War Timeline (1954–1975) -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 8px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between;">
              <span>Vietnam War &amp; Home Front (1954–1975)</span>
              <span style="font-size: 6.8pt; color: #475569;">Conflict Abroad</span>
            </div>
            <div style="font-size: 6.7pt; line-height: 1.25; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>May 1954:</strong> French defeated at Dien Bien Phu; Geneva Accords divide Vietnam at 17th Parallel.</div>
              <div><strong>1955–56:</strong> Ngo Dinh Diem proclaims Republic of Vietnam (South); rejects nationwide elections.</div>
              <div><strong>Dec 1960:</strong> National Liberation Front (Vietcong) founded to launch insurgency against Diem.</div>
              <div><strong>1961–63:</strong> Kennedy expands military advisers to 16,000; backs Strategic Hamlets programme.</div>
              <div><strong>May–Nov 1963:</strong> Buddhist Crisis and self-immolations; Diem overthrown and assassinated in coup.</div>
              <div><strong>Aug 1964:</strong> Gulf of Tonkin Incident; Congress grants LBJ blank check war powers resolution.</div>
              <div><strong>Feb 1965:</strong> Operation Rolling Thunder aerial bombing offensive against North Vietnam launched.</div>
              <div><strong>Mar 1965:</strong> 3,500 US Marines land at Da Nang; launch of direct American ground combat role.</div>
              <div><strong>1965–67:</strong> Search-and-destroy doctrine, defoliation with Agent Orange, Cu Chi tunnel combat.</div>
              <div><strong>Jan 1968:</strong> Tet Offensive launched by VC/NVA; Walter Cronkite declares the war a military stalemate.</div>
              <div><strong>Mar 1968:</strong> My Lai Massacre of over 500 civilians; LBJ announces he will not seek re-election.</div>
              <div><strong>Jan 1969:</strong> Richard Nixon inaugurated; introduces "Vietnamization" and gradual troop withdrawals.</div>
              <div><strong>Mar 1969:</strong> Operation Menu: secret B-52 carpet bombing of neutral Cambodia ordered by Nixon.</div>
              <div><strong>Nov 1969:</strong> Nixon delivers "Silent Majority" address; 500,000 march in Washington Moratorium.</div>
              <div><strong>May 1970:</strong> US invasion of Cambodia sparks nationwide student strikes; 4 killed at Kent State.</div>
              <div><strong>Jan 1973:</strong> Paris Peace Accords signed; remaining US combat troops withdraw; 591 POWs returned.</div>
              <div><strong>Nov 1973:</strong> War Powers Act passed over Nixon's veto, strictly curbing presidential war powers.</div>
              <div><strong>Apr 1975:</strong> North Vietnamese Spring Offensive; Operation Frequent Wind airlift; Fall of Saigon.</div>
            </div>
          </div>
        </div>

        <!-- Examiner Synoptic Takeaway Box -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; font-size: 7.0pt; color: #000000; line-height: 1.25;">
          <strong>Examiner Synoptic Takeaway:</strong> Notice how <strong>1964</strong> (Civil Rights Act + Tonkin Resolution), <strong>1965</strong> (Voting Rights Act + Combat Troop Deployment), and <strong>1968</strong> (Tet Offensive + King Assassination + Urban Riots) represent decisive pivot points where domestic civil unrest and foreign war collided to transform modern American politics.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">3</span>
      </div>
    </div>
  `;
}

// Left-Hand Spread Page (Knowledge & Archival Evidence)
function renderSpreadLeft(spread, leftPageNum) {
  const left = spread.left;

  const pillarsHtml = left.pillars
    .map(
      (p) => `
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 2px;">
      <div style="border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="font-size: 7.8pt; font-weight: 800; color: #000000; line-height: 1.15;">${p.title}</div>
        <div style="font-size: 6.6pt; color: #475569; font-style: italic; margin-bottom: 2px;">${p.subtitle}</div>
      </div>
      <ul style="margin: 0; padding-left: 10px; font-size: 7.0pt; color: #000000; line-height: 1.22;">
        ${p.bullets.map((b) => `<li style="margin-bottom: 2px;">${formatMd(b)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const figuresHtml = (left.keyFigures || [])
    .map(
      (f) => `
    <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 3px 5px;">
      <strong style="color: #000000; display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 1px;">${f.name}</strong>
      <span style="font-size: 6.5pt; color: #1e293b; line-height: 1.15;">${f.role}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${leftPageNum}" data-page="${leftPageNum}">
      <div class="page-header">
        <div>
          <span class="archival-tag">${spread.topic}</span>
          <h2 class="page-title">${spread.title}</h2>
        </div>
        <div class="page-badge">Deep Knowledge Spread</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Strategic Context Overview -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 5px 9px;">
          <div style="font-size: 8.8pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            ${left.headline}
          </div>
          <div style="font-size: 7.4pt; color: #1e293b; line-height: 1.25;">
            ${formatMd(left.summary)}
          </div>
        </div>

        <!-- Three Core Historical Pillars -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; margin: 3px 0;">
          ${pillarsHtml}
        </div>

        <!-- Key Figures & Organisations (4 Cards) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 7px; background: #ffffff;">
          <div style="font-size: 8.2pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Key Historical Figures &amp; Organisations</span>
            <span style="font-size: 6.8pt; color: #475569;">Specification Protagonists</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;">
            ${figuresHtml}
          </div>
        </div>

        <!-- Archival Primary Evidence / Historical Source Box -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-radius: 3px; padding: 5px 9px; font-size: 7.2pt; line-height: 1.22; color: #000000;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            <strong style="font-size: 7.8pt; text-transform: uppercase; color: #000000; letter-spacing: 0.3px;">PRIMARY ARCHIVAL EVIDENCE &bull; ${left.archivalSource.title}:</strong>
            <span style="font-size: 7.0pt; font-weight: 700; color: #334155;">${left.archivalSource.citation}</span>
          </div>
          <p style="margin: 3px 0; font-style: italic; font-family: 'Playfair Display', serif; font-size: 7.4pt; color: #000000; line-height: 1.22;">
            "${left.archivalSource.quote}"
          </p>
          <div style="margin-top: 1px; font-size: 6.6pt; color: #334155; line-height: 1.16;">
            <strong>Historical Significance:</strong> ${left.archivalSource.significance}
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">${leftPageNum}</span>
      </div>
    </div>
  `;
}

// Right-Hand Spread Page (Analysis & Word Bank - ZERO blank lines)
function renderSpreadRight(spread, rightPageNum) {
  const right = spread.right;

  const casesHtml = (right.deepCases || [])
    .map(
      (c) => `
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 2px;">
      <div style="font-size: 7.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
        ${c.title}
      </div>
      <ul style="margin: 0; padding-left: 10px; font-size: 7.2pt; color: #000000; line-height: 1.22;">
        ${c.points.map((p) => `<li style="margin-bottom: 2px;">${formatMd(p)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const pathwayHtml = (right.causalPathway || [])
    .map(
      (p) => `
    <div style="background: #ffffff; border: 1px solid #000000; border-radius: 2px; padding: 3px 5px;">
      <strong style="color: #000000; display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 1px;">${p.stage}</strong>
      <span style="font-size: 6.6pt; color: #1e293b; line-height: 1.16;">${p.text}</span>
    </div>
  `,
    )
    .join('');

  const wordBankHtml = (right.masterWordBank || [])
    .map(
      (w) => `
    <div>
      <span class="wb-pill">${w.term}</span>
      <span style="font-size: 6.6pt; color: #1e293b; line-height: 1.16;">${w.def}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${rightPageNum}" data-page="${rightPageNum}">
      <div class="page-header">
        <div>
          <span class="archival-tag">${spread.topic}</span>
          <h2 class="page-title">${spread.title.split(': ')[1] || spread.title}: Analysis &amp; Word Bank</h2>
        </div>
        <div class="page-badge">Analysis &amp; Word Bank</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Four Deep-Knowledge Forensic Case Studies (2x2 Grid) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin: 3px 0;">
          ${casesHtml}
        </div>

        <!-- Visual Causal Pathway (4 Connected Stages) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 7px; background: #f8fafc; margin: 2px 0;">
          <div style="font-size: 8.2pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Visual Causal Pathway: Key Historical Mechanisms</span>
            <span style="font-size: 6.8pt; color: #475569;">Cause &amp; Consequence Chain</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;">
            ${pathwayHtml}
          </div>
        </div>

        <!-- Master GCSE Specification Word Bank Box (12 Terms) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff;">
          <div style="font-size: 8.2pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>★ GCSE Specification Word Bank &amp; Essential Historical Concepts</span>
            <span style="color: #475569; font-size: 6.8pt;">Must-Use Vocabulary</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; line-height: 1.24;">
            ${wordBankHtml}
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">${rightPageNum}</span>
      </div>
    </div>
  `;
}

// Page 36: Back Cover (Master Paper 3 Section B Historiography Guide)
function renderPage36() {
  return `
    <div class="page" id="page_36" data-page="36">
      <div class="page-header">
        <div>
          <span class="archival-tag">Historiography &bull; Academic Interpretations</span>
          <h2 class="page-title">Historical Interpretations Guide: Competing Schools of Historiography</h2>
        </div>
        <div class="page-badge">Paper 3 Section B Mastery &bull; Q3(d) [16+4 Marks]</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 5px 9px; font-size: 7.2pt; color: #1e293b; line-height: 1.26;">
          <strong>Why Historiography Matters:</strong> In Question 3(d) [16m + 4 SPaG], Level 4 marks require students to demonstrate sophisticated awareness of why historians reach contrasting conclusions. Use this guide to cite academic perspectives and understand the ideological foundations behind differing interpretations.
        </div>

        <!-- Section 1: Civil Rights Historiographical Schools -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>1. The Civil Rights Historiographical Debate</span>
            <span style="font-size: 6.8pt; color: #475569;">Key Topics 1 &amp; 2</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.24; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Orthodox / Classical School</strong>
              <strong>Core Argument:</strong> Focuses on charismatic leadership (Dr. Martin Luther King Jr., SCLC), Christian non-violent moral crusade, and national legislative milestones (1964 Civil Rights Act, 1965 Voting Rights Act).<br/>
              <em>Key Proponents:</em> David Garrow, Taylor Branch.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Revisionist / Grassroots School</strong>
              <strong>Core Argument:</strong> Emphasises bottom-up local activism over elite leaders. Focuses on local women organisers (Jo Ann Robinson, Ella Baker, Fannie Lou Hamer), student militants (SNCC), and everyday voter registration in Mississippi.<br/>
              <em>Key Proponents:</em> Clayborne Carson, Danielle L. McGuire.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Post-Revisionist / Black Power</strong>
              <strong>Core Argument:</strong> Challenges the neat division between non-violence and militancy. Argues armed self-defense (Robert F. Williams) always coexisted with peaceful marches, and northern economic racism demanded radical nationalism.<br/>
              <em>Key Proponents:</em> Peniel Joseph, Hasan Kwame Jeffries.
            </div>
          </div>
        </div>

        <!-- Section 2: Vietnam War Historiographical Schools -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>2. The Vietnam War Historiographical Debate</span>
            <span style="font-size: 6.8pt; color: #475569;">Key Topics 3 &amp; 4</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.24; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Orthodox / Quagmire School</strong>
              <strong>Core Argument:</strong> The war was an unwinnable tragedy from the outset. American policymakers fundamentally misunderstood Vietnamese anti-colonial nationalism, backed corrupt, illegitimate Saigon regimes, and relied on futile firepower.<br/>
              <em>Key Proponents:</em> David Halberstam, Stanley Karnow, Christian Appy.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Revisionist / 'Noble Cause' School</strong>
              <strong>Core Argument:</strong> The war was a morally justified defense of South Vietnamese freedom against aggressive Soviet/Chinese communist expansion. Argues the military won on the battlefield (e.g. defeating Tet) but was betrayed by media defeatism and political micro-management.<br/>
              <em>Key Proponents:</em> Guenter Lewy, Mark Moyar, Harry Summers.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Post-Revisionist / Internationalist</strong>
              <strong>Core Argument:</strong> Synthesises multi-archival international perspectives (Hanoi, Beijing, Moscow). Demonstrates that North Vietnam was determined to achieve unification regardless of casualties, while Washington was constrained by fear of Chinese intervention.<br/>
              <em>Key Proponents:</em> Lien-Hang Nguyen, Fredrik Logevall.
            </div>
          </div>
        </div>

        <!-- Section 3: Master Assessment Criteria Framework for Q3(d) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>3. Master 4-Step Evaluation Architecture for Question 3(d) [16+4 Marks]</span>
            <span style="font-size: 6.8pt; color: #475569;">Level 4 Examiner Formula</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-size: 6.7pt; line-height: 1.22; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 1: Identify Perspectives</strong>
              State the exact thesis of Interpretation 1 and Interpretation 2 with direct supporting quotes. Clarify the core conceptual disagreement.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 2: Source Corroboration</strong>
              Explicitly cross-reference both interpretations against <strong>Source B</strong> and <strong>Source C</strong> to test whether contemporary evidence supports their arguments.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 3: Deploy Own Knowledge</strong>
              Introduce precise, contextual factual evidence (specific statistics, dates, casualty figures, legislation) that goes beyond the stimulus texts.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 4: Criteria Judgement</strong>
              Reach a sustained, definitive conclusion explaining why one interpretation is historically superior using explicit criteria (e.g. short-term vs long-term impact).
            </div>
          </div>
        </div>

        <!-- Institutional Sign-off -->
        <div style="background: #000000; color: #ffffff; padding: 4px 10px; border-radius: 2px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; font-weight: 700;">
          <span>Meoncross History Department &bull; GCSE Masterclass Series</span>
          <span>Pearson Edexcel GCSE History (9–1) &bull; Paper 3 Option 33 Complete</span>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="page-num">36</span>
      </div>
    </div>
  `;
}

module.exports = {
  formatMd,
  getStyles,
  renderPage1,
  renderPage2,
  renderPage3,
  renderSpreadLeft,
  renderSpreadRight,
  renderPage36,
};
