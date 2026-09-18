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
  const vesaliusImgUri = getImageDataUri('images/vesalius_muscle_men.jpg');
  const xrayImgUri = getImageDataUri('images/mobile_xray_field_hospital_1917.jpg');

  return `
    <div class="page" id="page_1" data-page="1">
      <div style="border: 2px solid #000000; border-radius: 4px; padding: 10px 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; background: #ffffff;">

        <!-- Top Header Strip -->
        <div style="border-bottom: 2px solid #000000; padding-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #000000;">
            <span>PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 1 (1HI0/11)</span>
            <span style="border: 1px solid #000000; padding: 1px 6px; border-radius: 2px;">THEMATIC STUDY &amp; HISTORIC ENVIRONMENT</span>
          </div>
        </div>

        <!-- Main Title & Candidate Box -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 14px; margin: 4px 0 6px 0;">
          <div style="flex: 1;">
            <div style="font-size: 8.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 1.2px; color: #475569; margin-bottom: 1px;">
              Visual Revision Masterclasses &bull; Complete Specification Guide
            </div>
            <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 21pt; font-weight: 900; line-height: 1.05; margin: 0; color: #000000; letter-spacing: -0.5px;">
              Medicine in Britain, c.1250–present
            </h1>
            <div style="font-size: 9.8pt; font-weight: 800; color: #000000; margin-top: 2px;">
              &amp; The British Sector of the Western Front, 1914–18: Injuries, Treatment &amp; the Trenches
            </div>
          </div>

          <!-- Pupil Details Box -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 10px; width: 230px; background: #ffffff; flex-shrink: 0;">
            <div style="font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 4px; color: #000000; border-bottom: 1px solid #000000; padding-bottom: 1px;">
              Candidate Details:
            </div>
            <div style="font-size: 7.2pt; font-weight: 700; margin-bottom: 3px;">
              NAME: <span style="display: inline-block; width: 145px; border-bottom: 1px solid #000000;">&nbsp;</span>
            </div>
            <div style="font-size: 7.2pt; font-weight: 700;">
              TEACHER: <span style="display: inline-block; width: 125px; border-bottom: 1px solid #000000;">Department Lead</span>
            </div>
          </div>
        </div>

        <!-- Official Exam Metadata Bar -->
        <div style="background: #000000; color: #ffffff; padding: 4px 10px; border-radius: 2px; display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; font-weight: 700;">
          <span>Official Paper 1 Duration: 1 Hour 15 Minutes (75 mins)</span>
          <span>Total Marks: 52 (+4 SPaG = 56 Marks)</span>
          <span>Section A: 16m &bull; Section B: 36m (+4 SPaG)</span>
          <span>Weighting: 30% of Total GCSE</span>
        </div>

        <!-- Dual Archival Primary Visual Plates (Contrasting Eras) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 4px 0;">
          <!-- Plate Left: Vesalius Fabrica (Thematic Study) -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.0pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>SECTION B &bull; THEMATIC REVOLUTION</span>
              <span>1543 FABRICA</span>
            </div>
            <div style="height: 125px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f8fafc; border: 1px solid #cbd5e1; margin-bottom: 4px;">
              <img src="${vesaliusImgUri}" alt="Vesalius De Humani Corporis Fabrica" style="width: 100%; height: 100%; object-fit: contain; filter: grayscale(100%) contrast(115%);" />
            </div>
            <div style="font-size: 6.5pt; line-height: 1.2; color: #1e293b;">
              <strong>Primary Archival Plate A:</strong> Andreas Vesalius' groundbreaking anatomical woodcut from <em>De Humani Corporis Fabrica</em> (1543), correcting over 300 of Galen's animal-based errors and establishing direct human dissection as the scientific foundation of modern medicine.
            </div>
          </div>

          <!-- Plate Right: Western Front Mobile X-Ray & Triage (Historic Environment) -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.0pt; font-weight: 800; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>SECTION A &bull; HISTORIC ENVIRONMENT</span>
              <span>1917 RAMC TRIAGE</span>
            </div>
            <div style="height: 125px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f8fafc; border: 1px solid #cbd5e1; margin-bottom: 4px;">
              <img src="${xrayImgUri}" alt="RAMC Mobile X-Ray Field Hospital 1917" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(115%);" />
            </div>
            <div style="font-size: 6.5pt; line-height: 1.2; color: #1e293b;">
              <strong>Primary Archival Plate B:</strong> Royal Army Medical Corps (RAMC) mobile X-ray unit and surgical triage van operating near the front line at the Third Battle of Ypres (Passchendaele, 1917), locating shrapnel fragments within hours to prevent lethal gas gangrene.
            </div>
          </div>
        </div>

        <!-- Four Exam Question Disciplines Box -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #f8fafc;">
          <div style="font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Edexcel Paper 1 Question Types &amp; Mark Scheme Formulas</span>
            <span style="font-size: 6.6pt; color: #475569;">Complete Section A &amp; B Matrix</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 6.6pt; line-height: 1.22; color: #1e293b;">
            <div style="border-left: 2px solid #000000; padding-left: 4px;">
              <strong style="display: block; font-size: 7.0pt; text-transform: uppercase;">Q1 Feature Questions [2+2=4m]</strong>
              Section A: Two separate 2-mark questions. State ONE valid feature (1 mark) + add precise historical supporting detail (1 mark). Zero explanation required.
            </div>
            <div style="border-left: 2px solid #000000; padding-left: 4px;">
              <strong style="display: block; font-size: 7.0pt; text-transform: uppercase;">Q2 Utility &amp; Follow-up [8+4=12m]</strong>
              Q2(a) Evaluate Sources A and B for utility (Content, Origin, Purpose, Context). Q2(b) 4-step investigation follow-up using exact official Edexcel phrases.
            </div>
            <div style="border-left: 2px solid #000000; padding-left: 4px;">
              <strong style="display: block; font-size: 7.0pt; text-transform: uppercase;">Q3 Similarity / Difference [4m]</strong>
              Section B: Explain one similarity or difference between two specified eras. 1 developed comparative PEEL paragraph with balanced evidence from both periods.
            </div>
            <div style="border-left: 2px solid #000000; padding-left: 4px;">
              <strong style="display: block; font-size: 7.0pt; text-transform: uppercase;">Q4 (12m) &amp; Q5/Q6 (16+4m)</strong>
              Q4: 3 PEEL causal paragraphs (stimulus + own knowledge). Q5/Q6: Evaluative essay spanning 150-300+ years. Balance factors against criteria for Grade 9.
            </div>
          </div>
        </div>

        <!-- Complete Specification Syllabus Checklist (4 Topics + Section A) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.4pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Official Pearson Edexcel Paper 1 Specification Syllabus Checklist</span>
            <span style="font-size: 6.6pt; color: #475569;">16 Core Master Spreads Across All 5 Topics</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 6.2pt; line-height: 1.2; color: #1e293b;">
            <!-- Col 1: Medieval -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                T1: MEDIEVAL c.1250–1500
              </strong>
              <strong>1. Ideas About Cause:</strong> Four Humours, Galen, Church dogma, astrology, miasma.<br/>
              <strong>2. Treatment &amp; Care:</strong> Herbal remedies, phlebotomy, barber-surgeons, monastic hospitals.<br/>
              <strong>3. The Black Death (1348):</strong> Flagellants, bad air, quarantine failure, social impact.
            </div>

            <!-- Col 2: Renaissance -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                T2: RENAISSANCE c.1500–1700
              </strong>
              <strong>1. Scientific Revolution:</strong> Royal Society, Sydenham observation, printing press.<br/>
              <strong>2. Vesalius &amp; Anatomy:</strong> <em>De Fabrica</em> (1543), human dissection, disproving Galen.<br/>
              <strong>3. Harvey &amp; Plague (1665):</strong> Heart pump (1628), blood circulation, searchers, pest houses.
            </div>

            <!-- Col 3: Industrial -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                T3: INDUSTRIAL c.1700–1900
              </strong>
              <strong>1. Germ Theory:</strong> Pasteur (1861), Koch bacteriology, agar stains.<br/>
              <strong>2. Surgical Revolution:</strong> Simpson chloroform, Lister carbolic acid, asepsis.<br/>
              <strong>3. Prevention:</strong> Jenner smallpox vaccine (1796), compulsory act 1853.<br/>
              <strong>4. Public Health:</strong> Chadwick 1842, Snow 1854 cholera, 1875 Act, Bazalgette sewers.
            </div>

            <!-- Col 4: Modern -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                T4: MODERN c.1900–PRESENT
              </strong>
              <strong>1. Genetics &amp; Lifestyle:</strong> DNA (1953), Human Genome Project, smoking, diet.<br/>
              <strong>2. Treatments &amp; NHS:</strong> Magic bullets (606, Prontosil), Penicillin (Fleming, Florey/Chain), NHS (1948).<br/>
              <strong>3. Lung Cancer:</strong> CT scans, radiotherapy, chemotherapy, 2007 smoking ban.
            </div>

            <!-- Col 5: Western Front -->
            <div>
              <strong style="display: block; font-size: 6.6pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
                SEC A: WESTERN FRONT 1914–18
              </strong>
              <strong>1. Trenches &amp; Injuries:</strong> Ypres, Somme, Arras; gas, shrapnel, trench foot, shell shock.<br/>
              <strong>2. Evacuation Chain:</strong> Stretcher bearers, RAP, ADS, CCS, Base Hospitals, RAMC, FANY.<br/>
              <strong>3. Innovations:</strong> Thomas splint, mobile X-rays, blood storage/banks, plastic surgery.
            </div>
          </div>
        </div>

        <!-- Institutional Footer -->
        <div style="border-top: 1.5px solid #000000; padding-top: 2px; display: flex; justify-content: space-between; font-size: 6.8pt; font-weight: 700; color: #475569;">
          <span>The History Department &bull; GCSE Masterclass Series</span>
          <span>PEARSON EDEXCEL 1HI0/11 &bull; 36-PAGE MASTER VOLUME</span>
        </div>
      </div>
    </div>
  `;
}

// Page 2: Paper 1 Blueprint & Success Principles
function renderPage2() {
  return `
    <div class="page" id="page_2" data-page="2">
      <div class="page-header">
        <div>
          <span class="archival-tag">Paper 1 Blueprint &bull; Exam Overview</span>
          <h2 class="page-title">Edexcel GCSE Paper 1: Exam Structure, Timings &amp; Success Principles</h2>
        </div>
        <div class="page-badge">Total Marks: 52 (+4 SPaG) &bull; Time: 1h 15m</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #000000; color: #ffffff; padding: 7px 12px; border-radius: 3px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 9.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4px;">
              Pearson Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11) Examination Blueprint
            </div>
            <div style="font-size: 7.2pt; color: #e2e8f0; line-height: 1.25; margin-top: 1px;">
              Paper 1 combines two distinct papers in 75 minutes: <strong>Section A (16 marks &bull; 25 mins)</strong> tests source utility and historical environment investigation on the Western Front; <strong>Section B (36+4 marks &bull; 50 mins)</strong> tests thematic continuity, change, causation, and judgement across 750 years of medicine.
            </div>
          </div>
        </div>

        <!-- Assessment Objectives Bar (AO1–AO3) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Pearson Edexcel Paper 1 Assessment Objectives &amp; Marks Distribution</span>
            <span style="color: #475569; font-size: 6.8pt;">52 Raw Marks + 4 SPaG &bull; 30% of Total GCSE</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; font-size: 6.8pt; line-height: 1.24; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO1: Factual Recall &amp; Knowledge</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">24 Marks Total (~46%)</div>
              Demonstrate precise, accurate knowledge of key dates, individuals, medical discoveries, government statutes, and trench warfare conditions across all five topics.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO2: Causation, Change &amp; Evaluation</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">20 Marks Total (~38%)</div>
              Explain and analyze key historical concepts: causation (Q4), similarity/difference (Q3), and extended comparative judgement across time periods (Q5/Q6).
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">AO3: Source Utility &amp; Historical Enquiries</strong>
              <div style="font-weight: 800; font-size: 6.8pt; margin-bottom: 1px;">8 Marks Total (~16%)</div>
              Evaluate contemporary sources on the Western Front for a specified historical enquiry using Content, Origin/Provenance, and Contextual knowledge (COP).
            </div>
          </div>
        </div>

        <!-- Four Non-Negotiable Success Principles -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Four Non-Negotiable Paper 1 Success Principles</span>
            <span style="font-size: 6.8pt; color: #475569;">Examiner Standards</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.25; color: #1e293b;">
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">1. Strict 25 / 50-Minute Section Discipline</strong>
              Spend exactly <strong>25 minutes on Section A</strong>: Q1(a) [3m], Q1(b) [3m], Q2(a) [14m], Q2(b) [5m]. Switch to Section B at 50 minutes remaining: Q3 [6m], Q4 [18m], Q5/Q6 [24m], leaving 2 minutes to check SPaG. Never steal time from Section B!
            </div>
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">2. Q2(b) Official Edexcel 4-Phrase Phrasing</strong>
              In the 4-mark follow-up investigation, you must strictly follow the official Edexcel structure: (1) <em>"Detail in Source B that I would follow up:"</em> (direct quote); (2) <em>"Question I would ask:"</em>; (3) <em>"What type of source I could use:"</em> (RAMC casualty diaries, medical logs); (4) <em>"How this might help answer my question:"</em>.
            </div>
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">3. Beyond the Stimulus in Q4 (The Level 2 Trap)</strong>
              In Question 4 (12 marks), Edexcel awards a maximum of <strong>Level 2 (5/12 marks)</strong> if you rely only on the two provided stimulus points. You MUST introduce a third distinct factor from your own contextual knowledge to access Level 3 and Level 4.
            </div>
            <div style="border-left: 3px solid #000000; padding-left: 6px;">
              <strong style="font-size: 7.4pt; text-transform: uppercase; display: block; margin-bottom: 1px;">4. Comparative Criteria &amp; The 5 Factors in Q5/Q6</strong>
              In the 16-mark essay spanning multiple centuries, evaluate factors (War, Government, Science &amp; Tech, Religion, Individual Genius). Do not write a chronological narrative. Establish clear evaluative criteria (e.g. pace of change, impact on ordinary patients vs elite theory).
            </div>
          </div>
        </div>

        <!-- Analytical Connective Vault -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #f8fafc;">
          <div style="font-size: 7.8pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>Thematic Analytical Connective Vault &bull; Paper 1 Phrase Bank</span>
            <span style="font-size: 6.8pt; color: #475569;">High-Yield Writing Scaffolds</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.24; color: #1e293b;">
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Cross-Era Comparison (Q3 &amp; Q5)</strong>
              &bull; "A striking continuity between both eras was..."<br/>
              &bull; "This represented a fundamental paradigm shift from..."<br/>
              &bull; "Whereas medieval treatments were supernatural, 19th-century..."<br/>
              &bull; "However, the rate of change was heavily constrained by..."
            </div>
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Causal Catalysts (Q4)</strong>
              &bull; "The primary catalyst for this breakthrough was..."<br/>
              &bull; "This was facilitated by rapid technological advances in..."<br/>
              &bull; "Consequently, the institutional grip of Galen was fractured..."<br/>
              &bull; "This directly compelled the government to abandon laissez-faire..."
            </div>
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Source Utility &amp; COP (Q2a)</strong>
              &bull; "This source is highly useful for revealing the frontline reality of..."<br/>
              &bull; "The utility is strengthened by the author's direct medical expertise as..."<br/>
              &bull; "However, the motive to maintain home front morale limits..."<br/>
              &bull; "Cross-referenced with RAMC casualty statistics, this confirms..."
            </div>
          </div>
        </div>

        <!-- Examiner Warning Pitfalls Strip -->
        <div style="background: #ffffff; border: 1.5px solid #000000; border-radius: 3px; padding: 4px 8px; font-size: 6.8pt; color: #000000; line-height: 1.24;">
          <div style="font-weight: 900; font-size: 7.2pt; text-transform: uppercase; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            &cross; THREE DEADLY EXAMINER PITFALLS TO AVOID ON PAPER 1:
          </div>
          <strong>1. Over-explaining in Q1(a) &amp; Q1(b):</strong> Pupils waste 10+ minutes writing paragraphs. Q1 requires ONE sentence for the feature, ONE sentence of detail. Maximum 3 minutes each.<br/>
          <strong>2. The Section B Feature Trap:</strong> Remember: Feature questions appear ONLY in Section A (Western Front). Section B has NO feature questions (it starts with Q3 similarity/difference).<br/>
          <strong>3. The "No Treatment" Myth:</strong> Do NOT claim Renaissance anatomists (Vesalius/Harvey) discovered cures. They revolutionized understanding of the body, but effective treatments only emerged centuries later.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain &amp; the Western Front</span>
        <span class="page-num">2</span>
      </div>
    </div>
  `;
}

// Page 3: Synchronized 750-Year Thematic Chronology Matrix (c.1250–present)
function renderPage3() {
  return `
    <div class="page" id="page_3" data-page="3">
      <div class="page-header">
        <div>
          <span class="archival-tag">Thematic Chronology &bull; Synoptic Timeline</span>
          <h2 class="page-title">Paper 1 Master Thematic Chronological Matrix (c.1250–Present)</h2>
        </div>
        <div class="page-badge">750-Year Synoptic Matrix</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 5px 10px;">
          <div style="font-size: 8.8pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            Synchronized Cross-Era Chronology: 750 Years of Continuity, Transformation &amp; Frontline Innovation
          </div>
          <div style="font-size: 7.2pt; color: #1e293b; line-height: 1.25;">
            Mastering Paper 1 requires viewing history thematically across the four eras (Medieval, Renaissance, Industrial, Modern) alongside Section A (Western Front), tracking how the <strong>5 Key Factors</strong> (War, Government, Science &amp; Tech, Religion, Individual Genius) drove or hindered medical progress.
          </div>
        </div>

        <!-- 5-Era Parallel Timeline Columns -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin: 4px 0;">
          <!-- Col 1: Medieval -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              Medieval (c.1250–1500)
            </div>
            <div style="font-size: 6.2pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>c.1250:</strong> Catholic Church strictly enforces Galenic doctrines; dissection outlawed.</div>
              <div><strong>c.1300:</strong> Four Humours &amp; Theory of Opposites dominate medical practice.</div>
              <div><strong>1348:</strong> Black Death strikes England; 30–45% of population dies in 18 months.</div>
              <div><strong>1349:</strong> Edward III orders streets cleaned of filth; quarantine largely fails.</div>
              <div><strong>c.1400:</strong> Over 700 monastic hospitals operating; focus on care and prayer, not cure.</div>
              <div><strong>c.1450:</strong> Barber-surgeons form guild; perform bloodletting and minor lancing.</div>
            </div>
          </div>

          <!-- Col 2: Renaissance -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              Renaissance (c.1500–1700)
            </div>
            <div style="font-size: 6.2pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>1476:</strong> Caxton brings printing press to England; ideas spread without Church censorship.</div>
              <div><strong>1543:</strong> Vesalius publishes <em>De Fabrica</em>, correcting 300+ of Galen's anatomical errors.</div>
              <div><strong>1628:</strong> William Harvey proves blood circulation; disproves Galen's liver theory.</div>
              <div><strong>1660:</strong> Royal Society founded; motto <em>Nullius in Verba</em> champions scientific empiricism.</div>
              <div><strong>1665:</strong> Great Plague of London kills 100,000; searchers and quarantine enforce orders.</div>
              <div><strong>1676:</strong> Thomas Sydenham publishes <em>Observationes Medicae</em>, classifying illnesses as species.</div>
            </div>
          </div>

          <!-- Col 3: Industrial -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              Industrial (c.1700–1900)
            </div>
            <div style="font-size: 6.2pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>1796:</strong> Jenner develops smallpox vaccine using cowpox; publishes findings in 1798.</div>
              <div><strong>1842:</strong> Chadwick's Sanitary Report exposes squalor; sparks 1848 Public Health Act.</div>
              <div><strong>1847:</strong> James Simpson discovers chloroform anaesthetic; Queen Victoria uses it (1853).</div>
              <div><strong>1854:</strong> John Snow removes Broad Street pump handle; proves waterborne cholera.</div>
              <div><strong>1861:</strong> Louis Pasteur publishes Germ Theory, shattering spontaneous generation.</div>
              <div><strong>1865:</strong> Joseph Lister introduces carbolic acid antiseptic spray in surgeries.</div>
              <div><strong>1875:</strong> Compulsory Public Health Act passed; Bazalgette finishes London sewers.</div>
              <div><strong>1882:</strong> Robert Koch identifies specific tuberculosis bacteria using chemical dyes.</div>
            </div>
          </div>

          <!-- Col 4: Modern -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              Modern (c.1900–Present)
            </div>
            <div style="font-size: 6.2pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>1909:</strong> Paul Ehrlich discovers Salvarsan 606, the first chemical "magic bullet".</div>
              <div><strong>1928:</strong> Alexander Fleming discovers penicillin mould; publishes in 1929.</div>
              <div><strong>1932:</strong> Gerhard Domagk discovers Prontosil, the second magic bullet against sepsis.</div>
              <div><strong>1941:</strong> Florey and Chain purify penicillin; US mass production saves Allied lives in WWII.</div>
              <div><strong>1948:</strong> Aneurin Bevan launches National Health Service (NHS); free care for all.</div>
              <div><strong>1953:</strong> Watson, Crick, Franklin &amp; Wilkins discover double-helix structure of DNA.</div>
              <div><strong>2000:</strong> Human Genome Project completes rough draft mapping of human DNA sequence.</div>
              <div><strong>2007:</strong> UK government bans smoking in all enclosed public places and workplaces.</div>
            </div>
          </div>

          <!-- Col 5: Western Front -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 6px; background: #ffffff; display: flex; flex-direction: column;">
            <div style="font-size: 7.2pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
              Western Front (1914–18)
            </div>
            <div style="font-size: 6.2pt; line-height: 1.22; color: #1e293b; display: flex; flex-direction: column; gap: 2px;">
              <div><strong>Oct 1914:</strong> 1st Battle of Ypres; British establish Salient; trenches dug.</div>
              <div><strong>Apr 1915:</strong> 2nd Battle of Ypres; Germans launch first chlorine gas attack.</div>
              <div><strong>Dec 1915:</strong> Thomas splint introduced; femur fracture survival leaps from 20% to 82%.</div>
              <div><strong>Jul–Nov 1916:</strong> Battle of the Somme; 57,000 casualties on Day 1; CCS expanded.</div>
              <div><strong>Apr 1917:</strong> Battle of Arras; RAMC constructs subterranean hospital in chalk caves.</div>
              <div><strong>Jul–Nov 1917:</strong> 3rd Battle of Ypres (Passchendaele); catastrophic liquid mud and gas gangrene.</div>
              <div><strong>Nov 1917:</strong> Battle of Cambrai; Oswald Hope Robertson establishes first frontline blood depot.</div>
              <div><strong>1917–18:</strong> Harold Gillies pioneers plastic surgery at Queen's Hospital, Sidcup.</div>
            </div>
          </div>
        </div>

        <!-- Examiner Synoptic Takeaway Box -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; font-size: 7.0pt; color: #000000; line-height: 1.25;">
          <strong>Examiner Synoptic Takeaway:</strong> Notice how <strong>War</strong> (stimulating surgery, transfusions, and antibiotics in 1914–18 and 1939–45) and <strong>Government</strong> (transitioning from medieval and 18th-century laissez-faire to compulsory vaccination in 1853, sanitation in 1875, and the NHS in 1948) act as the two most decisive accelerating factors across the 750-year syllabus.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain &amp; the Western Front</span>
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
            <span>Key Historical Figures &amp; Pioneers</span>
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
        <span>Pearson Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain &amp; the Western Front</span>
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
        <span>Pearson Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain &amp; the Western Front</span>
        <span class="page-num">${rightPageNum}</span>
      </div>
    </div>
  `;
}

// Page 36: Outside Back Cover — Master Factors & 16-Mark Essay Evaluation Matrix
function renderPage36() {
  return `
    <div class="page" id="page_36" data-page="36">
      <div class="page-header">
        <div>
          <span class="archival-tag">Synoptic Factors &amp; Extended Writing &bull; Paper 1 Section B</span>
          <h2 class="page-title">Master Factors in Medicine &amp; 16-Mark Essay Evaluation Framework</h2>
        </div>
        <div class="page-badge">Paper 1 Section B Mastery &bull; Q5/Q6 [16+4 Marks]</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 5px 9px; font-size: 7.2pt; color: #1e293b; line-height: 1.26;">
          <strong>Why Thematic Factors Matter:</strong> In Questions 5 and 6 [16m + 4 SPaG], Grade 9 answers require students to evaluate change, continuity, and significance across centuries by comparing the <strong>5 Core Factors</strong> (War, Government, Science &amp; Technology, Religion &amp; Superstition, Individual Genius).
        </div>

        <!-- Section 1: The 5 Factors Matrix Across 750 Years -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>1. The Five Driving Factors Across All Four Eras</span>
            <span style="font-size: 6.8pt; color: #475569;">Comparative Thematic Pillars</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 6.5pt; line-height: 1.22; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 5px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">1. Warfare</strong>
              <strong>Impact:</strong> Massive catalyst. Compelled surgical innovation (Pare ligatures, WWI blood transfusions, Thomas splint, Fleming penicillin in WWII). WWI transformed casualty triage.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 5px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">2. Government</strong>
              <strong>Impact:</strong> Evolved from medieval/early modern laissez-faire to compulsory action: 1853 Vaccination Act, 1875 Public Health Act, 1948 NHS, and modern anti-smoking legislation.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 5px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">3. Science &amp; Tech</strong>
              <strong>Impact:</strong> Enabled proof over theory: printing press (1476), microscopes (17th C), Koch's chemical dye stains (1870s), X-rays (1895), DNA sequencing, and robotic surgery.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 5px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">4. Religion &amp; Belief</strong>
              <strong>Impact:</strong> Major barrier in medieval era (enforcing Galen, outlawing dissection). Faded during Renaissance humanism and 19th-century secular rationalism.
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 5px;">
              <strong style="display: block; font-size: 7.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">5. Individual Genius</strong>
              <strong>Impact:</strong> Critical pioneers (Vesalius, Harvey, Jenner, Simpson, Lister, Snow, Pasteur, Koch, Fleming, Bevan) who challenged orthodoxy through relentless empiricism.
            </div>
          </div>
        </div>

        <!-- Section 2: Master 4-Step Architecture for Q5/Q6 Extended Writing [16+4 Marks] -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>2. Master 4-Step Architecture for Q5 / Q6 Statement Essays [16+4 Marks]</span>
            <span style="font-size: 6.8pt; color: #475569;">Level 4 Examiner Formula</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-size: 6.7pt; line-height: 1.22; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 1: Unpack Statement &amp; Criteria</strong>
              Define the core historical premise of the question (e.g. <em>"Government was the main reason for improvement in public health..."</em>). Set explicit criteria (short vs long term, rural vs urban).
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 2: Stimulus + Own Knowledge</strong>
              Dedicate two rigorous PEEL paragraphs to the named statement factor and stimulus. Introduce a THIRD distinct factor from own knowledge spanning the full time period.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 3: Comparative Factor Weighting</strong>
              Explicitly compare factors against each other: explain why one factor (e.g. Science/Germ Theory) was a necessary prerequisite before another factor (e.g. Government 1875 Act) could act.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 2px; padding: 4px 6px;">
              <strong style="display: block; font-size: 7.2pt; color: #000000; margin-bottom: 2px;">Step 4: Sustained Justified Verdict</strong>
              Deliver a definitive conclusion. Never say "they were all equally important." State clearly which factor was the root cause and justify your choice using your criteria.
            </div>
          </div>
        </div>

        <!-- Section 3: Grade 9 Thematic Essay Model Bank -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #f8fafc;">
          <div style="font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
            <span>3. Typical Edexcel 16-Mark Essay Themes &amp; Relative Weightings</span>
            <span style="font-size: 6.8pt; color: #475569;">High-Yield Exam Prompts</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 6.8pt; line-height: 1.24; color: #1e293b;">
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Public Health Improvement</strong>
              <strong>Debate:</strong> Government intervention (1848/1875 Acts, Bevan NHS) vs Science/Individuals (Chadwick, Snow, Bazalgette).<br/>
              <em>Examiner Verdict:</em> Scientific proof (Snow/Pasteur) was the essential catalyst that compelled government to abandon laissez-faire.
            </div>
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Surgical &amp; Treatment Progress</strong>
              <strong>Debate:</strong> Individual Genius (Simpson, Lister) vs Science &amp; Warfare (Germ Theory, autoclaves, WWI blood storage, WWII penicillin).<br/>
              <em>Examiner Verdict:</em> Individual ideas were futile until antiseptic science and wartime industrial funding enabled mass adoption.
            </div>
            <div>
              <strong style="font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">Understanding Causes of Illness</strong>
              <strong>Debate:</strong> The Church &amp; Galen (1,300 years of stagnation) vs Renaissance anatomy &amp; 19th C Germ Theory.<br/>
              <em>Examiner Verdict:</em> True progress required breaking institutional religious monopolies before empirical laboratory science could prove microbial etiology.
            </div>
          </div>
        </div>

        <!-- Institutional Sign-off -->
        <div style="background: #000000; color: #ffffff; padding: 4px 10px; border-radius: 2px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; font-weight: 700;">
          <span>The History Department &bull; GCSE Masterclass Series</span>
          <span>Pearson Edexcel GCSE History (9–1) &bull; Paper 1 Option 1HI0/11 Complete</span>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain &amp; the Western Front</span>
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
