/**
 * render_standard_textbook_great_war_part2.cjs
 *
 * PURE NARRATIVE CLASSROOM TEXTBOOK (12-Page Saddle-Stitch Model)
 * Conforms strictly to the KS3 Classroom Textbook Engine Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero QR codes/ledgers)
 * - Large, comfortable, high-legibility typography for Year 9 reading (11.5pt body, 1.57–1.6 line-height)
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - 5 Canonical Enquiries across 5 flat double-page spreads (Verso + Recto)
 * - Explicit paragraph referencing [1.1] to [5.5] matching pupil workbook citations
 * - Master Front Cover with 80x64mm hero plate, 2-para overview, 5-enquiry syllabus box, and core concepts strip
 * - Back cover: 5-Card Master Knowledge Retrieval Quiz (Cards 1–4 for Enquiries 1–4, Card 5 full-width for compound Enquiry 5; 60 canonical questions, 0 answers)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// ============================================================================
// CANONICAL 5-ENQUIRY PURE NARRATIVE TEXT
// ============================================================================
const ENQUIRIES = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'great_war_part2_calibrated_enquiries.json'), 'utf8'),
);

// ============================================================================
// 60 CANONICAL KNOWLEDGE RETRIEVAL QUESTIONS (10 PER BOX / PART)
// ============================================================================
const QUIZ_QUESTIONS = {
  box1: [
    'Which crisis precipitated the outbreak of the First World War in 1914?',
    'Which 1839 treaty guaranteeing Belgian neutrality brought Britain into the war?',
    "How large was Britain's professional standing army (the BEF) in August 1914?",
    'Which Secretary of State for War warned the conflict would last years?',
    "How many British volunteers enlisted in the first eight weeks of Kitchener's appeal?",
    "What was the core purpose of creating civic 'Pals Battalions'?",
    'Which local Hampshire battalions were raised in Portsmouth?',
    'What symbol of cowardice was pinned on civilian men by women in 1914?',
    "How did recruitment posters like 'Women of Britain Say—GO!' pressure men?",
    'Why did the loss of a Pals battalion devastate entire home towns?',
  ],
  box2: [
    'Which rapid-firing defensive weapon made infantry charges across open ground suicidal?',
    'What was the name of the cratered wasteland between opposing front lines?',
    'What three tiered defensive lines made up a standard Western Front trench system?',
    'Which painful fungal infection, caused by standing in cold water, threatened amputation?',
    'What medical term described severe trauma caused by constant artillery shelling?',
    'Who served as Commander-in-Chief of the British Army from December 1915?',
    'How many British casualties were suffered on the first day of the Somme?',
    'Why did the seven-day preliminary bombardment fail to destroy German defences?',
    'Which phrase did Alan Clark popularize to describe British soldiers and generals?',
    "What concept do modern historians use to describe the British Army's tactical evolution?",
  ],
  box3: [
    'Approximately how many troops and labourers were mobilised across the British Empire?',
    'Which colony sent over 1.3 million combatants and labourers to the Allied war effort?',
    'Who was the first South Asian soldier awarded the Victoria Cross in 1914?',
    'Which regiment of Caribbean volunteers was raised in 1915 to fight for Britain?',
    'What discriminatory restriction barred Black colonial soldiers from European frontline combat?',
    'How many unarmed Chinese civilian volunteers served in the Chinese Labour Corps?',
    'What hazardous tasks did non-white labour corps undertake under artillery fire?',
    'Which Italian port saw Caribbean soldiers mutiny against racial abuse in 1918?',
    'How were returning Caribbean veterans treated by colonial authorities in 1919?',
    'What term describes the postwar erasure of colonial troops from British public memory?',
  ],
  box4: [
    'Which emergency act passed in August 1914 granted sweeping state powers over daily life?',
    'Name two daily activities that were restricted or criminalised under DORA.',
    "Which 1915 political scandal toppled Asquith's government over artillery ammunition?",
    'Who was appointed Minister of Munitions in 1915 to reorganise British industry?',
    'What nickname was given to female munitions workers whose skin turned yellow from TNT?',
    'What severe health risks and hazards did female munitionettes face in factories?',
    'Which 1916 act introduced compulsory military conscription for British men?',
    'What was the legal term for men who refused military service on moral grounds?',
    "What was the distinction between 'alternativist' and 'absolutist' conscientious objectors?",
    'How did British authorities punish absolutist objectors who refused all labour?',
  ],
  box5PartA: [
    "What was the codename for Germany's massive Western Front offensive in March 1918?",
    'Which specialized infantry units used infiltration tactics and flamethrowers?',
    'What Allied counter-offensive in August 1918 broke the German Hindenburg Line?',
    "Which fresh nation's arrival in France provided decisive reinforcements in 1918?",
    'Where did German sailors mutiny in October 1918, sparking domestic revolution?',
    'On what date and at what time did the Armistice take effect on the Western Front?',
    'Where did German delegates meet Marshal Foch to sign the Armistice agreement?',
    'What happened to Kaiser Wilhelm II on 9 November 1918?',
    'Which Allied naval measure continued to starve German civilians after the Armistice?',
    "What myth claimed that Germany's undefeated military was betrayed by politicians at home?",
  ],
  box5PartB: [
    'Which three Allied leaders dominated the Paris Peace Conference in 1919?',
    "How did Georges Clemenceau's aims differ from Woodrow Wilson's Fourteen Points?",
    'What was Article 231 of the Treaty of Versailles commonly known as?',
    'What total sum in financial reparations was fixed on Germany in 1921?',
    'To what maximum troop number was the German Army restricted under the treaty?',
    'Which territory was returned to France, and which was created to give Poland sea access?',
    "Why did the German public condemn the Treaty of Versailles as a 'Diktat'?",
    'What international peace-keeping organisation was created at Versailles?',
    "What warning did John Maynard Keynes make about crushing Germany's economy?",
    'How did the humiliation of Versailles help pave the path to war in 1939?',
  ],
};

// ============================================================================
// HTML GENERATOR FUNCTION
// ============================================================================
function buildNarrativeTextbookHtml() {
  const coverImgData =
    getBase64Image('/images/bg_great_war_part2.jpg') || '/images/bg_great_war_part2.jpg';

  let spreadsHtml = '';

  ENQUIRIES.forEach((enquiry) => {
    const num = enquiry.num;
    const versoPage = num * 2;
    const rectoPage = num * 2 + 1;

    spreadsHtml += `
    <!-- =========================================================
         PAGE ${versoPage} (VERSO): ENQUIRY ${num} PART I
         ========================================================= -->
    <div class="a4-page verso textbook-page" data-page="${versoPage}" id="page-${versoPage}">
      
      <!-- Running Header -->
      <header class="page-running-header">
        <span class="rh-left">KEY STAGE 3 DISCIPLINARY HISTORY</span>
        <span class="rh-right">ENQUIRY 0${num} &bull; PART I</span>
      </header>

      <!-- Enquiry Title Banner -->
      <div class="enquiry-title-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-badge">ENQUIRY 0${num} &bull; YEAR 9</span>
          <span class="enquiry-subtitle-tag">${enquiry.versoSubtitle}</span>
        </div>
        <h1 class="enquiry-main-title">${enquiry.title}</h1>
        <div class="enquiry-question-box">
          <span class="eq-icon">&sect;</span>
          <span class="eq-text"><strong>Key Enquiry Question:</strong> ${enquiry.enquiry}</span>
        </div>
      </div>

      <!-- Main Prose Reading Area (2-Column Flow for Blocks 1 & 2) -->
      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <!-- Block 1 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block1.ref}]</span>
              <span class="block-date">${enquiry.block1.date}</span>
              <h2 class="block-title">${enquiry.block1.title}</h2>
            </div>
            ${enquiry.block1.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block1.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 2 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block2.ref}]</span>
              <span class="block-date">${enquiry.block2.date}</span>
              <h2 class="block-title">${enquiry.block2.title}</h2>
            </div>
            ${enquiry.block2.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block2.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

        </div>
      </main>

      <!-- Running Footer -->
      <footer class="page-running-footer">
        <span>The Great War (1914&ndash;1919) &bull; Enquiry 0${num} Part I</span>
        <span class="page-num">${versoPage}</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE ${rectoPage} (RECTO): ENQUIRY ${num} PART II
         ========================================================= -->
    <div class="a4-page recto textbook-page" data-page="${rectoPage}" id="page-${rectoPage}">
      
      <!-- Running Header -->
      <header class="page-running-header">
        <span class="rh-left">THE GREAT WAR (1914&ndash;1919)</span>
        <span class="rh-right">ENQUIRY 0${num} &bull; PART II</span>
      </header>

      <!-- Recto Section Header -->
      <div class="recto-header-banner">
        <span class="recto-part-tag">PART II: CLIMAX, TURNING POINTS &amp; HISTORICAL CONSEQUENCE</span>
        <span class="recto-subhead">${enquiry.rectoSubtitle}</span>
      </div>

      <!-- Main Prose Reading Area (2-Column Continuous Flow for Blocks 3, 4 & 5) -->
      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <!-- Block 3 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block3.ref}]</span>
              <span class="block-date">${enquiry.block3.date}</span>
              <h2 class="block-title">${enquiry.block3.title}</h2>
            </div>
            ${enquiry.block3.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block3.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 4 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block4.ref}]</span>
              <span class="block-date">${enquiry.block4.date}</span>
              <h2 class="block-title">${enquiry.block4.title}</h2>
            </div>
            ${enquiry.block4.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block4.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 5 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block5.ref}]</span>
              <span class="block-date">${enquiry.block5.date}</span>
              <h2 class="block-title">${enquiry.block5.title}</h2>
            </div>
            ${enquiry.block5.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block5.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

        </div>
      </main>

      <!-- Running Footer -->
      <footer class="page-running-footer">
        <span>The Great War (1914&ndash;1919) &bull; Enquiry 0${num} Part II</span>
        <span class="page-num">${rectoPage}</span>
      </footer>

    </div>
    `;
  });

  // Master Knowledge Retrieval Quiz helper
  let globalQNum = 1;
  function renderQList(questions) {
    return questions
      .map((qText) => {
        const num = globalQNum++;
        return `
        <div class="quiz-item">
          <span class="quiz-num">${num}.</span>
          <span class="quiz-text">${qText}</span>
        </div>
      `;
      })
      .join('');
  }

  const box1List = renderQList(QUIZ_QUESTIONS.box1);
  const box2List = renderQList(QUIZ_QUESTIONS.box2);
  const box3List = renderQList(QUIZ_QUESTIONS.box3);
  const box4List = renderQList(QUIZ_QUESTIONS.box4);
  const box5PartAList = renderQList(QUIZ_QUESTIONS.box5PartA);
  const box5PartBList = renderQList(QUIZ_QUESTIONS.box5PartB);

  const quizBoxesHtml = `
    <!-- BOX 1: ENQUIRY 1 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 01</span>
          <span class="quiz-title">1914: The Outbreak &amp; Pals’ Battalions</span>
        </div>
        <span class="quiz-locator">pp. 2&ndash;3 &bull; Ref [1.1]&ndash;[1.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box1List}
      </div>
    </div>

    <!-- BOX 2: ENQUIRY 2 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 02</span>
          <span class="quiz-title">Blood, Mud &amp; Trench Warfare</span>
        </div>
        <span class="quiz-locator">pp. 4&ndash;5 &bull; Ref [2.1]&ndash;[2.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box2List}
      </div>
    </div>

    <!-- BOX 3: ENQUIRY 3 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 03</span>
          <span class="quiz-title">The Forgotten Global Empire</span>
        </div>
        <span class="quiz-locator">pp. 6&ndash;7 &bull; Ref [3.1]&ndash;[3.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box3List}
      </div>
    </div>

    <!-- BOX 4: ENQUIRY 4 -->
    <div class="quiz-grid-card">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 04</span>
          <span class="quiz-title">The Total War Home Front</span>
        </div>
        <span class="quiz-locator">pp. 8&ndash;9 &bull; Ref [4.1]&ndash;[4.5]</span>
      </div>
      <div class="quiz-items-wrap">
        ${box4List}
      </div>
    </div>

    <!-- BOX 5: ENQUIRY 5 (SPANS BOTH COLUMNS) -->
    <div class="quiz-grid-card enquiry-span-2">
      <div class="quiz-grid-header">
        <div class="quiz-title-wrap">
          <span class="quiz-badge">ENQUIRY 05</span>
          <span class="quiz-title">The Armistice (1918), The Versailles Diktat (1919) &amp; The Fragile Peace</span>
        </div>
        <span class="quiz-locator">pp. 10&ndash;11 &bull; Ref [5.1]&ndash;[5.5]</span>
      </div>
      <div class="compound-columns-wrap">
        <div class="compound-subcol">
          <div class="subcol-header">
            <span>Part I: 1918 Hundred Days &amp; Armistice</span>
            <span class="subcol-tag">p. 10 &bull; Ref [5.1]&ndash;[5.2]</span>
          </div>
          <div class="quiz-items-wrap">
            ${box5PartAList}
          </div>
        </div>
        <div class="compound-subcol">
          <div class="subcol-header">
            <span>Part II: Versailles, Article 231 &amp; The Diktat</span>
            <span class="subcol-tag">p. 11 &bull; Ref [5.3]&ndash;[5.5]</span>
          </div>
          <div class="quiz-items-wrap">
            ${box5PartBList}
          </div>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Great War (1914–1919) — Classroom Reading Anthology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink-primary: #0f172a;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --crimson-accent: #991b1b;
      --crimson-dark: #7f1d1d;
      --navy-deep: #0f284e;
      --gold-royal: #b45309;
      --parchment-bg: #fdfbf7;
      --border-soft: #cbd5e1;
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', -apple-system, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background: #e2e8f0;
      color: var(--ink-primary);
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.6;
      margin: 0;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Screen Quick Control Bar */
    .screen-control-bar {
      width: 210mm;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;
      margin-bottom: 20px;
      font-family: var(--font-sans);
      font-size: 8.5pt;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .screen-control-bar .badge-hub {
      background: var(--crimson-accent);
      color: #ffffff;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .screen-control-bar button {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 8pt;
    }
    .screen-control-bar button:hover {
      background: #334155;
    }

    /* =============================================================
       A4 PAGE ARCHITECTURE (210mm x 297mm)
       ============================================================= */
    .a4-page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 14mm 16mm 11mm 16mm;
      page-break-after: always;
      break-after: always;
    }

    /* =============================================================
       PAGE 1: MASTER FRONT COVER (Rich Architectural Overview)
       ============================================================= */
    .a4-page.front-cover {
      background: #0f172a;
      color: #ffffff;
      padding: 10mm 15mm 9mm 15mm;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1.5mm;
      margin-bottom: 2.5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #94a3b8;
    }

    .cover-title-group {
      text-align: center;
      margin-bottom: 2.8mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: #991b1b;
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      padding: 2.5px 12px;
      border-radius: 3px;
      margin-bottom: 2mm;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 26pt;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: #ffffff;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 2mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-size: 10.8pt;
      font-style: italic;
      color: #cbd5e1;
      line-height: 1.35;
    }

    /* Hero Plate & Overview Row */
    .cover-hero-row {
      display: flex;
      gap: 16px;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      padding: 3mm 4.5mm;
      margin-bottom: 3.2mm;
      align-items: center;
    }
    .cover-hero-artwork-frame {
      width: 68.33mm;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .cover-hero-img-box {
      width: 100%;
      height: 82mm;
      border-radius: 3px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      background: #000000;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6pt;
      color: #94a3b8;
      margin-top: 1mm;
      line-height: 1.15;
      text-align: center;
      font-style: italic;
    }
    .cover-overview-narrative {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.8mm;
    }
    .cover-overview-title {
      color: #fca5a5;
      font-family: var(--font-sans);
      font-size: 9.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(252, 165, 165, 0.3);
      padding-bottom: 1.2mm;
      margin-bottom: 0.5mm;
    }
    .cover-overview-p {
      font-family: var(--font-body);
      font-size: 10.4pt;
      line-height: 1.42;
      color: #f8fafc;
      text-align: justify;
      text-justify: inter-word;
    }

    /* Enquiries Syllabus Box */
    .cover-enquiries-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: 3.8mm 5.5mm;
      border-left: 5px solid #991b1b;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    .cover-enquiries-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 2px solid #0f284e;
      padding-bottom: 1.4mm;
      margin-bottom: 2mm;
      font-family: var(--font-sans);
    }
    .cover-enquiries-header h2 {
      font-size: 9.2pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0f284e;
    }
    .cover-enquiries-header span {
      font-size: 7.4pt;
      font-weight: 700;
      color: #991b1b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-enquiry-list {
      display: flex;
      flex-direction: column;
      gap: 3.5mm;
    }
    .cover-enquiry-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-family: var(--font-sans);
      padding-bottom: 2.2mm;
      border-bottom: 1px solid #f1f5f9;
    }
    .cover-enquiry-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .cover-enquiry-num {
      background: #0f284e;
      color: #ffffff;
      font-size: 7.8pt;
      font-weight: 800;
      padding: 2.5px 7px;
      border-radius: 3px;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .cover-enquiry-text {
      flex: 1;
    }
    .cover-enquiry-top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .cover-enquiry-title {
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
    }
    .cover-enquiry-locator {
      font-size: 7.4pt;
      font-weight: 700;
      color: #991b1b;
      flex-shrink: 0;
      margin-left: 8px;
    }
    .cover-enquiry-question {
      font-family: var(--font-body);
      font-size: 8.2pt;
      font-style: italic;
      color: #334155;
      line-height: 1.28;
      margin-bottom: 1px;
    }
    .cover-enquiry-desc {
      font-size: 7.4pt;
      color: #64748b;
      line-height: 1.32;
    }

    /* Bottom Concept Strip */
    .cover-concept-strip {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      padding: 2.2mm 4mm;
      margin-top: 3.2mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 10px;
      line-height: 1.35;
    }
    .cover-concept-label {
      background: #0f284e;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 2px;
      text-transform: uppercase;
      font-size: 6.5pt;
      letter-spacing: 0.06em;
      flex-shrink: 0;
    }

    .cover-footer-meta {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 2.5mm;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      font-family: var(--font-sans);
      font-size: 7pt;
      color: #94a3b8;
    }

    /* =============================================================
       PAGES 2–11: SPREAD RUNNING HEADERS & FOOTERS
       ============================================================= */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-soft);
      padding-bottom: 2mm;
      margin-bottom: 3.5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }
    .page-running-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-soft);
      padding-top: 2.5mm;
      margin-top: 2.2mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: var(--ink-muted);
    }
    .page-running-footer .page-num {
      font-weight: 800;
      color: var(--ink-primary);
      font-size: 8.5pt;
    }

    /* =============================================================
       VERSO ENQUIRY HEADER
       ============================================================= */
    .enquiry-title-banner {
      margin-bottom: 4mm;
    }
    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5mm;
    }
    .enquiry-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 2px 7px;
      border-radius: 2px;
    }
    .enquiry-subtitle-tag {
      font-family: var(--font-sans);
      font-size: 7pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .enquiry-main-title {
      font-family: var(--font-display);
      font-size: 15.5pt;
      font-weight: 800;
      color: var(--ink-primary);
      line-height: 1.2;
      margin-bottom: 2mm;
    }
    .enquiry-question-box {
      background: #f8fafc;
      border-left: 3px solid var(--crimson-accent);
      padding: 3mm 4mm;
      border-radius: 0 3px 3px 0;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .eq-icon {
      color: var(--crimson-accent);
      font-weight: 800;
      font-size: 9.5pt;
    }
    .eq-text {
      font-family: var(--font-body);
      font-size: 9.2pt;
      font-style: italic;
      color: var(--ink-secondary);
      line-height: 1.35;
    }
    .eq-text strong {
      font-style: normal;
      font-family: var(--font-sans);
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }

    /* =============================================================
       RECTO RUNNING SUBHEAD
       ============================================================= */
    .recto-header-banner {
      background: #f8fafc;
      border-bottom: 2px solid var(--navy-deep);
      padding: 2mm 3.5mm;
      margin-bottom: 4mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
    }
    .recto-part-tag {
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .recto-subhead {
      font-size: 7.2pt;
      font-weight: 600;
      color: var(--ink-muted);
      font-style: italic;
    }

    /* =============================================================
       PROSE BODY & TWO-COLUMN ARCHITECTURE (11.5pt Reading Grade)
       ============================================================= */
    .page-prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .prose-two-column {
      column-count: 2;
      column-gap: 22px;
      column-fill: balance;
      height: 100%;
    }
    .prose-two-column .narrative-block:last-child,
    .prose-two-column .narrative-block:last-child .prose-p:last-child {
      margin-bottom: 0;
    }
    .narrative-block {
      break-inside: auto;
      margin-bottom: 10px;
    }
    .block-header {
      break-after: avoid;
      break-inside: avoid;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px;
    }
    .block-ref {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .block-date {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .block-title {
      font-family: var(--font-sans);
      font-size: 8.8pt;
      font-weight: 800;
      color: var(--ink-primary);
      width: 100%;
      margin-top: 1px;
      line-height: 1.25;
    }
    .prose-p {
      font-size: 11pt;
      line-height: 1.57;
      color: #1e293b;
      text-align: justify;
      hyphens: auto;
      text-justify: inter-word;
      margin-bottom: 5.8px;
    }
    .para-pill {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--navy-deep);
      background: #e2e8f0;
      padding: 1px 4px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: 1px;
    }
    .prose-p strong {
      color: var(--ink-primary);
      font-weight: 700;
    }

    /* =============================================================
       PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ (5-Card Grid)
       ============================================================= */
    .a4-page.back-cover {
      background: #faf8f5;
      padding: 7.5mm 13mm 5.5mm 13mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0;
    }
    .back-header-strip {
      border-bottom: 2.2px solid #8b0000;
      padding-bottom: 1.5mm;
      margin-bottom: 1.6mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h2 {
      font-family: var(--font-display);
      font-size: 15.5pt;
      font-weight: 800;
      color: #0b192c;
      letter-spacing: 0.04em;
      line-height: 1.1;
    }
    .header-left p {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      color: #8b0000;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1.5px;
    }
    .header-right {
      text-align: right;
    }
    .badge-capsule {
      background: #0b192c;
      color: #fff;
      font-family: var(--font-sans);
      font-size: 7pt;
      font-weight: 700;
      padding: 2.5px 8px;
      border-radius: 3px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: inline-block;
    }
    .header-right p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
      margin-top: 2px;
    }

    /* INSTRUCTIONS BANNER */
    .quiz-instructions-strip {
      background: #f1f5f9;
      border-left: 3px solid #8b0000;
      padding: 1.2mm 2.8mm;
      margin-bottom: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: #1e293b;
    }
    .quiz-instructions-strip span {
      flex: 1;
    }
    .quiz-instructions-strip strong {
      color: #0b192c;
    }

    /* 2x3 GRID CONTAINER */
    .quiz-grid-container {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      gap: 1.8mm 3.5mm;
    }
    .quiz-grid-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 1.8mm 2.6mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    /* Box 5 spans full width across both columns */
    .quiz-grid-card.enquiry-span-2 {
      grid-column: span 2;
    }
    .quiz-grid-header {
      border-bottom: 1.4px solid #8b0000;
      padding-bottom: 1.5px;
      margin-bottom: 1.8px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .quiz-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .quiz-badge {
      font-family: var(--font-sans);
      font-size: 6.5pt;
      font-weight: 800;
      color: #8b0000;
      letter-spacing: 0.04em;
    }
    .quiz-title {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: #0b192c;
    }
    .quiz-locator {
      font-family: var(--font-sans);
      font-size: 6.3pt;
      font-weight: 700;
      color: #64748b;
    }
    .quiz-items-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5px;
    }
    .quiz-item {
      display: flex;
      gap: 3.5px;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      line-height: 1.25;
      color: #1e293b;
    }
    .quiz-num {
      font-weight: 800;
      color: #8b0000;
      min-width: 15px;
      flex-shrink: 0;
    }
    .quiz-text {
      flex: 1;
    }
    /* Compound Box 5 inner split */
    .compound-columns-wrap {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4mm;
    }
    .compound-subcol {
      display: flex;
      flex-direction: column;
    }
    .subcol-header {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #0b192c;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 1px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
    }
    .subcol-header span.subcol-tag {
      color: #8b0000;
      font-size: 6.2pt;
    }
    .back-colophon {
      border-top: 1px solid #cbd5e1;
      padding-top: 1.8mm;
      margin-top: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
    }

    /* Print media overrides */
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .screen-control-bar {
        display: none !important;
      }
      .a4-page {
        box-shadow: none !important;
        margin: 0 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Only Quick Control Bar -->
  <div class="screen-control-bar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span class="badge-hub">The History Revision Hub</span>
      <span>The Great War (1914&ndash;1919) &bull; Master Classroom Reading Anthology (12 Pages)</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>

  <div class="anthology-book-container">

    <!-- =========================================================
         PAGE 1: MASTER FRONT COVER
         ========================================================= -->
    <div class="a4-page front-cover cover-page textbook-page" data-page="1" id="page-1">
      <div class="cover-top-masthead">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Key Stage 3 Disciplinary History</span>
      </div>

      <div class="cover-title-group">
        <span class="cover-date-pill">1914 &ndash; 1919</span>
        <h1>THE GREAT WAR</h1>
        <p>Total War, Industrial Slaughter &amp; The Fragile Peace</p>
      </div>

      <!-- HERO VISUAL PLATE & OVERVIEW ROW -->
      <div class="cover-hero-row">
        <div class="cover-hero-artwork-frame">
          <div class="cover-hero-img-box">
            <img src="${coverImgData}" alt="The Signing of Peace in the Hall of Mirrors, Versailles (1919) by Sir William Orpen" />
          </div>
          <div class="cover-hero-caption">Sir William Orpen &bull; The Signing of Peace in the Hall of Mirrors, Versailles (1919)</div>
        </div>
        <div class="cover-overview-narrative">
          <div class="cover-overview-title">INTO THE ABYSS &bull; 1914&ndash;1919</div>
          <p class="cover-overview-p">
            In the summer of 1914, millions of young men marched eagerly to war, swept up in patriotic fever and promised they would return home victorious before Christmas. None foresaw the industrial nightmare awaiting them. Within months, rapid-firing machine guns, heavy artillery, and poison gas obliterated the old world of cavalry charges, trapping an entire generation in the mud, blood, and barbed wire of the Western Front.
          </p>
          <p class="cover-overview-p">
            From the catastrophic slaughter of the Somme to the forgotten heroism of four million imperial troops of colour, and from the courage of female munition workers on the Home Front to the bitter peace dictated in the Hall of Mirrors at Versailles, this anthology tells the dramatic story of five cataclysmic years that shattered empires and reshaped human history forever.
          </p>
        </div>
      </div>

      <!-- 5 ENQUIRIES OVERVIEW BOX -->
      <div class="cover-enquiries-box">
        <div class="cover-enquiries-header">
          <h2>Curriculum Enquiries in This Volume</h2>
          <span>Chronological Syllabus Overview</span>
        </div>
        <div class="cover-enquiry-list">
          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">01</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">1914: The Outbreak, The Alliance Trap &amp; The Pals’ Battalions</span>
                <span class="cover-enquiry-locator">pp. 2&ndash;3 &bull; Ref [1.1]&ndash;[1.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Why were young men so desperate to volunteer for the slaughter of 1914?</div>
              <div class="cover-enquiry-desc">${ENQUIRIES[0].coverDesc}</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">02</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">Blood, Mud &amp; Steel: Did British Generals Make Trench Warfare Worse?</span>
                <span class="cover-enquiry-locator">pp. 4&ndash;5 &bull; Ref [2.1]&ndash;[2.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Were British commanders like General Haig callous 'donkeys' or prisoners of industrial technology?</div>
              <div class="cover-enquiry-desc">${ENQUIRIES[1].coverDesc}</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">03</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">The Forgotten Global Empire: Troops of Colour on the Western Front</span>
                <span class="cover-enquiry-locator">pp. 6&ndash;7 &bull; Ref [3.1]&ndash;[3.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Why were over four million colonial and dominion troops erased from popular memory?</div>
              <div class="cover-enquiry-desc">${ENQUIRIES[2].coverDesc}</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">04</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">The Total War Home Front: DORA, Canaries &amp; The Subjugation of Civilian Life</span>
                <span class="cover-enquiry-locator">pp. 8&ndash;9 &bull; Ref [4.1]&ndash;[4.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: How did an overseas war fundamentally transform the British state and civilian life?</div>
              <div class="cover-enquiry-desc">${ENQUIRIES[3].coverDesc}</div>
            </div>
          </div>

          <div class="cover-enquiry-item">
            <span class="cover-enquiry-num">05</span>
            <div class="cover-enquiry-text">
              <div class="cover-enquiry-top-row">
                <span class="cover-enquiry-title">The Armistice (1918), The Versailles Diktat (1919) &amp; The Fragile Peace</span>
                <span class="cover-enquiry-locator">pp. 10&ndash;11 &bull; Ref [5.1]&ndash;[5.5]</span>
              </div>
              <div class="cover-enquiry-question">Key Question: Did the Treaty of Versailles resolve the problems of 1914 or cultivate the seeds of 1939?</div>
              <div class="cover-enquiry-desc">${ENQUIRIES[4].coverDesc}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CORE CONCEPTS STRIP -->
      <div class="cover-concept-strip">
        <span class="cover-concept-label">Core Concepts</span>
        <span>Industrialised Attrition &bull; Total War Mobilisation &bull; Imperial Subjugation &bull; Conscription &amp; Conscience &bull; Geopolitical Diktat &amp; War Guilt</span>
      </div>

      <div class="cover-footer-meta">
        <span>The History Revision Hub &bull; Commercial Educational Publishing</span>
        <span>Classroom Reading Edition &bull; 100% Pure Disciplinary Narrative Architecture</span>
      </div>
    </div>

    <!-- =========================================================
         PAGES 2–11: 5 CANONICAL ENQUIRY SPREADS
         ========================================================= -->
    ${spreadsHtml}

    <!-- =========================================================
         PAGE 12: MASTER CLASSROOM BACK COVER (Knowledge Retrieval Quiz)
         ========================================================= -->
    <div class="a4-page back-cover textbook-page" data-page="12" id="page-12">
      
      <div class="back-header-strip">
        <div class="header-left">
          <h2>Master Knowledge Retrieval Quiz</h2>
          <p>60 Essential Recall Questions &bull; The Great War (1914&ndash;1919)</p>
        </div>
        <div class="header-right">
          <span class="badge-capsule">Partner Quiz or Solo Practice</span>
          <p>Check your answers inside &bull; Paragraphs [1.1] to [5.5]</p>
        </div>
      </div>

      <div class="quiz-instructions-strip">
        <span><strong>Partner Quiz:</strong> Sit in pairs with one book closed. Take turns reading 5 questions to test your partner. Swap roles!</span>
        <span><strong>Solo Practice:</strong> Pick an Enquiry box. Write answers 1 to 10 in your book from memory, then check paragraphs to mark your score.</span>
      </div>

      <div class="quiz-grid-container">
        ${quizBoxesHtml}
      </div>

      <footer class="back-colophon page-footer">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Classroom Retrieval Edition &bull; Page 12 of 12</span>
      </footer>

    </div>

  </div>

</body>
</html>`;
}

// ============================================================================
// MAIN EXECUTION & PDF GENERATION
// ============================================================================
async function run() {
  console.log(
    'Building 12-Page Pure Narrative Classroom Textbook HTML for The Great War (1914–1919)...',
  );
  const html = buildNarrativeTextbookHtml();

  // Ensure public and root destination folders exist
  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'great_war_part2');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const rootDir = path.join(ROOT_DIR, 'units', 'great_war_part2');
  if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir, { recursive: true });

  const publicHtmlPath = path.join(publicDir, 'textbook.html');
  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  console.log('HTML saved to:', publicHtmlPath);

  const rootHtmlPath = path.join(rootDir, 'textbook.html');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');

  console.log('Launching Puppeteer to audit and compile 12-page PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Page Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a4-page');
    return Array.from(pages).map((p, index) => {
      const pageNum = p.getAttribute('data-page') || index + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      return {
        page: pageNum,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: scrollH > clientH + 4,
        diff: scrollH - clientH,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  const overflows = auditResults.filter((r) => r.overflow);
  if (overflows.length > 0) {
    console.warn('WARNING: Pages with height overflows:', overflows);
  } else {
    console.log('PERFECT: All 12 pages have 0px overflow!');
  }

  // Audit Page Budget
  console.log('\nAuditing Page Budget...');
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.a4-page, .textbook-page',
      underflowThresholdPx: 45,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 25,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'textbook.html');
  } catch (err) {
    console.warn('Audit warning:', err.message);
  }

  // Compile PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) {
    fs.mkdirSync(pdfOutputDir, { recursive: true });
  }

  const pdfPath = path.join(pdfOutputDir, 'great_war_part2_textbook_FINAL.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });

  console.log('Master 12-Page Textbook PDF compiled to:', pdfPath);
  await browser.close();

  console.log('Compilation completed successfully.');
}

run().catch((err) => {
  console.error('Fatal error during compilation:', err);
  process.exit(1);
});
