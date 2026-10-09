/**
 * History Revision Hub — Crown, Church, or Parliament (1517–1689)
 * Dedicated 20-Page A4 Saddle-Stitched Pupil Workbook Compiler
 *
 * Target: units/monarchy_religion_power
 * Output HTML: public/units/monarchy_religion_power/pupil_workbook.html
 * Output PDF:  public/pdfs/monarchy_religion_power_pupil_workbook.pdf
 *
 * Pedagogical Architecture:
 * - 20 Pages (5 Folded A3 Sheets, Saddle-Stitched)
 * - Page 1:  Master Front Cover (renderKs3FrontCover)
 * - Pages 2–3: Unit Knowledge Organiser & Sovereignty Concept Map
 * - Pages 4–5: Lesson 1 Spread (Verso: 4-Act Notes, 10.5pt font & Bullshit-free prose; Recto: Causation & Motive)
 * - Pages 6–7: Lesson 2 Spread (Verso: 4-Act Notes & Did You Know; Recto: Source Utility & Pelican Portrait)
 * - Pages 8–9: Lesson 3 Spread (Verso: 4-Act Notes & Did You Know; Recto: Historical Interpretations & Fireships)
 * - Pages 10–11: EXACT PHYSICAL CENTRE FOLD: Living Timeline & Dual-Coding Canvas (7 Milestones, lays 100% flat!)
 * - Pages 12–13: Lesson 4 Spread (Verso: 4 Visual Story Milestones; Recto: Regicide & Significance)
 * - Pages 14–15: Lesson 5 Spread (Verso: 4 Synthesis Strands; Recto: "World Turned Upside Down" Evaluative Matrix)
 * - Pages 16–17: Synoptic Essay Planning Matrix & Full Ruled Writing Spread
 * - Pages 18–19: Knowledge Retrieval Companion (Page 18: 25 Do Now Questions; Page 19: Complete Answers & DIRT Scoreboard)
 * - Page 20: Master Outside Back Cover (renderKs3BackCover)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');

const {
  renderKs3FrontCover,
  renderKs3BackCover,
  generateQrSvg,
} = require('./components/render_standard_cover.cjs');

const { unitData } = require('../units/monarchy_religion_power/data.js');

function getBase64Image(relPath) {
  if (!relPath) return '';
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const b64 = fs.readFileSync(cand).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  return relPath;
}

function renderFooter(pageNum, isVerso, quip) {
  if (isVerso) {
    return `
      <div class="page-footer-strip">
        <span class="footer-page-num">${pageNum}</span>
        <span class="footer-title">KS3 History &bull; Crown, Church, or Parliament (1517–1689)</span>
        <span class="footer-quip"><em>${quip || 'The History Revision Hub'}</em></span>
      </div>`;
  } else {
    return `
      <div class="page-footer-strip">
        <span class="footer-quip"><em>${quip || 'The History Revision Hub'}</em></span>
        <span class="footer-title">KS3 History &bull; Crown, Church, or Parliament (1517–1689)</span>
        <span class="footer-page-num">${pageNum}</span>
      </div>`;
  }
}

async function buildWorkbookHtml() {
  const coverImgBase64 = getBase64Image(unitData.cover_image);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Crown, Church, or Parliament (1517–1689) &bull; Pupil Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 8mm 8mm 10mm 8mm;
    }
    body {
      font-family: 'Newsreader', 'Georgia', serif;
      font-size: 8.8pt;
      line-height: 1.34;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    img {
      display: block;
      max-width: 100%;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3mm 4mm;
      background: #ffffff;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }
    .page-footer-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #000000;
      padding-top: 2px;
      margin-top: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .footer-page-num {
      background: #000000;
      color: #ffffff;
      padding: 1px 6px;
      border-radius: 2px;
      font-weight: 900;
    }
    .badge {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid #000000;
      padding: 1px 6px;
      border-radius: 3px;
    }
    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #000000;
      margin-right: 3px;
    }
    .task-line-dotted {
      border-bottom: 1px dotted #888888;
      height: 4.8mm;
      width: 100%;
    }
    .task-line-solid {
      border-bottom: 1px solid #888888;
      height: 4.8mm;
      width: 100%;
    }
    .act-box {
      border: 1px solid #000000;
      border-radius: 3px;
      padding: 3.5px 6px;
      margin-bottom: 3.5px;
      background: #ffffff;
    }
    .act-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #000000;
      padding-bottom: 1.5px;
      margin-bottom: 2px;
    }
    .did-you-know-box {
      border: 1.2px dashed #000000;
      background: #fbfbfb;
      padding: 3px 6px;
      border-radius: 3px;
      margin-top: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      line-height: 1.25;
    }
  </style>
</head>
<body>
`;

  // ==========================================================================
  // PAGE 1: FRONT COVER (Master KS3 Standard)
  // ==========================================================================
  html += renderKs3FrontCover({
    unitId: 'monarchy_religion_power',
    unitTitle: 'CROWN, CHURCH, OR PARLIAMENT (1517–1689)',
    yearGroup: 'Year 8',
    subtitle: 'From Henry VIII’s Break with Rome to the 1689 Bill of Rights',
    overarchingEnquiry: unitData.enquiry,
    coverImgData: coverImgBase64,
    heroPhotoHeightMm: 80,
    coverPlate: {
      tag: 'Primary Visual Evidence',
      shelfmark: 'TUDOR & STUART ARCHIVE',
      title: 'Queen Elizabeth I & The Invincible Armada (1588)',
      description:
        'The Armada Portrait commemorating English naval victory and Protestant survival in the Atlantic world.',
    },
    lessons: unitData.lessons.map((l) => ({ title: l.title })),
    thematicStrands: [
      'Religious Conflict & Reformation',
      'Crown Authority vs Parliamentary Law',
      'Civil War & Regicide',
      'Social Hierarchy & Ordinary Life',
    ],
    totalPageCount: 20,
    renderFooterStrip: () => renderFooter(1, false, 'The History Revision Hub'),
  });

  // ==========================================================================
  // PAGE 2: KNOWLEDGE ORGANISER (Part 1: 12 Core Terms & Chronology)
  // ==========================================================================
  html += `
  <div class="page page-container verso-page" id="page-2">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              YEAR 8 AUTUMN &bull; UNIT KNOWLEDGE ORGANISER
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              Crown, Church, or Parliament &bull; 12 Core Historical Terms
            </h2>
          </div>
          <span class="badge">SUBSTANTIVE VOCABULARY</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 5px;">
          Master these 12 core Tier 3 terms to write with authentic historical authority across this enquiry.
        </div>
      </div>

      <!-- 12 Glossary Terms (2 Columns of 6) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; flex: 1;">
        ${unitData.glossary
          .map(
            (g, idx) => `
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; color: #000000;">${idx + 1}. ${g.term}</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 700; text-transform: uppercase;">Tier 3 Term</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 8.0pt; line-height: 1.25; color: #000000;">
              ${g.definition}
            </div>
          </div>
          <div style="margin-top: 3px; border-top: 1px dotted #888888; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic; color: #333333;">
            My Example Sentence: <span style="border-bottom: 1px dotted #888888; display: inline-block; width: 68%;"></span>
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Quick Self-Test Prompt -->
      <div style="border: 1.2px solid #000000; padding: 3px 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Pupil Self-Quiz:</strong> Cover the definitions with a ruler and test your partner on terms 1 to 12.</span>
        <span style="border: 1px solid #000000; padding: 1px 5px; font-weight: 800; border-radius: 2px;">Score: &nbsp; &nbsp; / 12</span>
      </div>

      ${renderFooter(2, true, 'Unit Knowledge Organiser &bull; Tier 3 Vocabulary')}
    </div>
  </div>
  `;

  // ==========================================================================
  // PAGE 3: KNOWLEDGE ORGANISER (Part 2: The Sovereignty Concept Map)
  // ==========================================================================
  html += `
  <div class="page page-container recto-page" id="page-3">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              THE STRUGGLE FOR SOVEREIGNTY &bull; 1517 TO 1689
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              Who Held True Power: Pope, Crown, or Parliament?
            </h2>
          </div>
          <span class="badge">HISTORICAL NARRATIVE SPHERE</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 4px;">
          Over 172 years, the answer to "Who rules Britain?" changed violently three times. Trace the shift across four eras:
        </div>
      </div>

      <!-- 4 Historical Eras of Sovereignty -->
      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
        <!-- Era 1 -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt;">Phase 1: Medieval Catholic Unity (Before 1534)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">SOVEREIGN: THE POPE</span>
          </div>
          <p style="font-family: 'Newsreader', serif; font-size: 8.2pt; margin: 0; line-height: 1.25;">
            The King of England is an obedient Catholic prince. The Pope in Rome holds supreme authority over religious law, taxes (Peter’s Pence), and marriages. Disobeying the Church means damnation or death as a heretic.
          </p>
        </div>

        <!-- Era 2 -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt;">Phase 2: Tudor Royal Supremacy (1534–1603)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">SOVEREIGN: THE MONARCH</span>
          </div>
          <p style="font-family: 'Newsreader', serif; font-size: 8.2pt; margin: 0; line-height: 1.25;">
            Henry VIII fires the Pope and crowns himself Supreme Head of the Church. The monarch controls both Crown and Altar. Elizabeth I preserves this through the 1559 "Middle Way", defeating Catholic plots and the 1588 Spanish Armada.
          </p>
        </div>

        <!-- Era 3 -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt;">Phase 3: Civil War, Regicide & Republic (1625–1660)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">SOVEREIGN: THE ARMY & CROMWELL</span>
          </div>
          <p style="font-family: 'Newsreader', serif; font-size: 8.2pt; margin: 0; line-height: 1.25;">
            Charles I claims Divine Right; Parliament fights back. In 1649, Parliament beheads the King and creates a Republic. Oliver Cromwell rules as Lord Protector, but strict Puritan laws make military dictatorship deeply unpopular.
          </p>
        </div>

        <!-- Era 4 -->
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt;">Phase 4: Parliamentary Constitutional Monarchy (1689 Onward)</strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">SOVEREIGN: PARLIAMENT UNDER LAW</span>
          </div>
          <p style="font-family: 'Newsreader', serif; font-size: 8.2pt; margin: 0; line-height: 1.25;">
            The 1688 Glorious Revolution replaces James II with William and Mary. In 1689, the Bill of Rights forces the Crown to obey Parliament: the King reigns, but Parliament rules. Modern constitutional Britain is born.
          </p>
        </div>
      </div>

      <!-- Quick Reflection Question -->
      <div style="border: 1.2px solid #000000; padding: 3px 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; margin-top: 4px;">
        <strong>Enquiry Focus Question:</strong> <em>"Between 1517 and 1689, which was more dangerous to a King of England: defying the Pope, or defying Parliament?"</em> Discuss with your partner.
      </div>

      ${renderFooter(3, false, 'The Evolution of Sovereignty in Britain')}
    </div>
  </div>
  `;

  // ==========================================================================
  // LESSONS 1, 2, 3 SPREADS (Pages 4–9)
  // ==========================================================================
  unitData.lessons.slice(0, 3).forEach((l, idx) => {
    const leftPageNum = (idx + 1) * 2 + 2; // L1: 4, L2: 6, L3: 8
    const rightPageNum = leftPageNum + 1; // L1: 5, L2: 7, L3: 9

    // LEFT PAGE (VERSO): The 4-Act Story & Large-Font Note Prompts
    html += `
    <div class="page page-container verso-page" id="page-${leftPageNum}">
      <div class="page-body-full">
        <!-- Header Strip -->
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              ENQUIRY LESSON ${idx + 1} &bull; CORE KNOWLEDGE &amp; NARRATIVE SPINE
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
              ${l.enquiry}
            </h2>
          </div>
          <span class="badge">LESSON ${idx + 1}</span>
        </div>

        <!-- 4-Beat Margin Spine + 4 Acts Layout -->
        <div style="display: flex; gap: 8px; flex: 1; overflow: hidden;">
          <!-- Left Margin Chronological Spine -->
          <div style="width: 28mm; border-right: 1.2px solid #000000; padding-right: 4px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 4px;">
              CHRONOLOGY
            </div>
            ${l.margin_spine
              .map(
                (m) => `
            <div style="border: 1px solid #000; border-radius: 2px; padding: 2px 3px; margin-bottom: 4px; background: #fafafa;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000; display: block;">${m.year}</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 600; line-height: 1.15; display: block;">${m.label}</span>
            </div>
            `,
              )
              .join('')}
            <div style="flex: 1;"></div>
          </div>

          <!-- Main 4-Act Story Blocks with Note Prompts -->
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
            ${l.narrative_blocks
              .map(
                (act, aIdx) => `
            <div class="act-box" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="act-title-row">
                  <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.4px;">
                    ${act.title}
                  </strong>
                  <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800;">ACT ${act.act}</span>
                </div>
                <div style="font-family: 'Newsreader', serif; font-size: 8.2pt; line-height: 1.24; color: #000000; margin-bottom: 2px;">
                  ${act.text}
                </div>
              </div>
              <div style="background: #fbfbfb; border: 1px dotted #888888; border-radius: 2px; padding: 2px 5px; margin-top: 1px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">
                  ✎ Note Prompt: ${l.act_questions[aIdx].q}
                </div>
                <div class="task-line-dotted"></div>
              </div>
            </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Humorous Did You Know Box -->
        <div class="did-you-know-box">
          <strong>★ Did You Know? (Human Quirks of History):</strong> ${l.did_you_know}
        </div>

        ${renderFooter(leftPageNum, true, l.subtitle)}
      </div>
    </div>
    `;

    // RIGHT PAGE (RECTO): Disciplinary Skill & Visual Source
    const src = l.right_page_task.visual_source;
    const srcBase64 = getBase64Image(src.image);

    html += `
    <div class="page page-container recto-page" id="page-${rightPageNum}">
      <div class="page-body-full">
        <!-- Header Strip -->
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              HISTORICAL DISCIPLINARY PRACTICE &bull; EVIDENCE &amp; EVALUATION
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
              ${l.right_page_task.skill_title}
            </h2>
          </div>
          <span class="badge">${l.skill}</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 4px;">
          <strong>Historical Investigation:</strong> ${l.right_page_task.instructions}
        </div>

        <!-- Visual Primary Source Box -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; margin-bottom: 4px; display: flex; gap: 8px; align-items: center; background: #ffffff;">
          <div style="width: 38mm; height: 38mm; flex-shrink: 0; border: 1px solid #000; overflow: hidden; background: #eee;">
            <img src="${srcBase64}" alt="${src.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex: 1;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              ${src.title}
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 7.8pt; line-height: 1.22; color: #111; margin-bottom: 3px;">
              ${src.caption}
            </div>
            <div style="background: #fbfbfb; border: 1px dotted #888; border-radius: 2px; padding: 2px 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
              <strong>Question on Source:</strong> ${src.question}
            </div>
          </div>
        </div>

        <!-- Written Analytical Response Block (Ruled Lines) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Structured Written Response &bull; Analytical Argument
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000; padding: 0 4px; border-radius: 2px;">ASSESSMENT FOCUS</span>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 3px;">
              ${l.right_page_task.written_task_prompt}
            </div>
          </div>

          <!-- Handwriting Lines (Strictly Balanced for 0px Overflow) -->
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around; margin: 2px 0;">
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
          </div>

          <!-- Success Criteria Footer -->
          <div style="border-top: 1px dashed #888; padding-top: 2px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #333;">
            <span>[✓] Deploys specific date/fact</span>
            <span>[✓] Explains historical consequence</span>
            <span>[✓] Reaches reasoned verdict</span>
            <span style="font-weight: 800; color: #000;">Teacher Score: [ &nbsp; / 8 ]</span>
          </div>
        </div>

        ${renderFooter(rightPageNum, false, l.right_page_task.skill_title)}
      </div>
    </div>
    `;
  });

  // ==========================================================================
  // PAGES 10–11: EXACT PHYSICAL CENTRE FOLD: THE LIVING TIMELINE & DUAL-CODING
  // ==========================================================================
  // Part 1: Milestones 1–4 on Page 10 (Verso)
  html += `
  <div class="page page-container verso-page" id="page-10">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              PHYSICAL CENTRE FOLD SPREAD &bull; PANORAMIC LIVING TIMELINE (PART 1: 1517–1588)
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              The Tudor Reformation &amp; Atlantic Crisis &bull; Dual-Coding Canvas
            </h2>
          </div>
          <span class="badge">CENTRE FOLD (LAYS 100% FLAT)</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 4px;">
          <strong>Timeline Task:</strong> For each milestone, read the historical anchor and draw a visual symbol in the dashed box to dual-code the turning point into memory.
        </div>
      </div>

      <!-- 4 Milestone Boxes on Left Half -->
      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
        ${unitData.timeline
          .slice(0, 4)
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt;">${m.year} &bull; ${m.title}</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; border: 1px solid #000; padding: 0 4px; border-radius: 2px;">MILESTONE</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 8.0pt; line-height: 1.2; color: #000;">
              ${m.description}
            </div>
          </div>
          <!-- Dual-Coding Sketchpad Canvas -->
          <div style="border: 1px dashed #000000; border-radius: 2px; min-height: 19mm; flex: 1; background: #fafafa; margin-top: 2px; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-style: italic; color: #444;">
              ✎ ${m.dual_coding_prompt}
            </span>
            <div style="text-align: right; font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #888;">[Sketch Icon Here]</div>
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      ${renderFooter(10, true, 'Panoramic Living Timeline &bull; 1517 to 1588')}
    </div>
  </div>
  `;

  // Part 2: Milestones 5–7 on Page 11 (Recto) + Chronological Reflection
  html += `
  <div class="page page-container recto-page" id="page-11">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              PHYSICAL CENTRE FOLD SPREAD &bull; PANORAMIC LIVING TIMELINE (PART 2: 1642–1689)
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              Civil War, Regicide &amp; The Bill of Rights &bull; Dual-Coding Canvas
            </h2>
          </div>
          <span class="badge">CENTRE FOLD (LAYS 100% FLAT)</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 4px;">
          <strong>Timeline Task:</strong> Complete the dual-coding drawings for the Stuart struggle and answer the synthesis timeline challenge.
        </div>
      </div>

      <!-- 3 Milestone Boxes on Right Half + Synthesis Box -->
      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
        ${unitData.timeline
          .slice(4, 7)
          .map(
            (m) => `
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt;">${m.year} &bull; ${m.title}</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; border: 1px solid #000; padding: 0 4px; border-radius: 2px;">MILESTONE</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 8.0pt; line-height: 1.2; color: #000;">
              ${m.description}
            </div>
          </div>
          <!-- Dual-Coding Sketchpad Canvas -->
          <div style="border: 1px dashed #000000; border-radius: 2px; min-height: 19mm; flex: 1; background: #fafafa; margin-top: 2px; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 4px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-style: italic; color: #444;">
              ✎ ${m.dual_coding_prompt}
            </span>
            <div style="text-align: right; font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #888;">[Sketch Icon Here]</div>
          </div>
        </div>
        `,
          )
          .join('')}

        <!-- Synthesis Timeline Reflection Box -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.6pt; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
            ★ Synoptic Chronology Challenge: The Causal Domino
          </strong>
          <div style="font-family: 'Newsreader', serif; font-size: 7.8pt; line-height: 1.2; margin-bottom: 3px;">
            Look across all seven milestones from 1517 to 1689. In one sentence, explain how Henry VIII breaking with Rome in 1534 directly caused the Civil War in 1642:
          </div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
      </div>

      ${renderFooter(11, false, 'Panoramic Living Timeline &bull; 1642 to 1689')}
    </div>
  </div>
  `;

  // ==========================================================================
  // LESSONS 4 & 5 SPREADS (Pages 12–15)
  // ==========================================================================
  unitData.lessons.slice(3, 5).forEach((l, idx) => {
    const lessonIdx = idx + 3; // L4 is index 3, L5 is index 4
    const leftPageNum = (lessonIdx + 1) * 2 + 4; // L4: 12, L5: 14
    const rightPageNum = leftPageNum + 1; // L4: 13, L5: 15

    // LEFT PAGE (VERSO): The 4-Act Story / 4 Milestones
    html += `
    <div class="page page-container verso-page" id="page-${leftPageNum}">
      <div class="page-body-full">
        <!-- Header Strip -->
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              ENQUIRY LESSON ${lessonIdx + 1} &bull; CORE KNOWLEDGE &amp; NARRATIVE SPINE
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
              ${l.enquiry}
            </h2>
          </div>
          <span class="badge">LESSON ${lessonIdx + 1}</span>
        </div>

        <!-- 4-Beat Margin Spine + 4 Acts Layout -->
        <div style="display: flex; gap: 8px; flex: 1; overflow: hidden;">
          <!-- Left Margin Chronological Spine -->
          <div style="width: 28mm; border-right: 1.2px solid #000000; padding-right: 4px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 4px;">
              CHRONOLOGY
            </div>
            ${l.margin_spine
              .map(
                (m) => `
            <div style="border: 1px solid #000; border-radius: 2px; padding: 2px 3px; margin-bottom: 4px; background: #fafafa;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; color: #000; display: block;">${m.year}</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 600; line-height: 1.15; display: block;">${m.label}</span>
            </div>
            `,
              )
              .join('')}
            <div style="flex: 1;"></div>
          </div>

          <!-- Main 4-Act Story Blocks with Note Prompts -->
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
            ${l.narrative_blocks
              .map(
                (act, aIdx) => `
            <div class="act-box" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="act-title-row">
                  <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.4px;">
                    ${act.title}
                  </strong>
                  <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800;">ACT ${act.act || aIdx + 1}</span>
                </div>
                <div style="font-family: 'Newsreader', serif; font-size: 8.2pt; line-height: 1.24; color: #000000; margin-bottom: 2px;">
                  ${act.text}
                </div>
              </div>
              <div style="background: #fbfbfb; border: 1px dotted #888888; border-radius: 2px; padding: 2px 5px; margin-top: 1px;">
                <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #000000;">
                  ✎ Note Prompt: ${l.act_questions[aIdx].q}
                </div>
                <div class="task-line-dotted"></div>
              </div>
            </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Humorous Did You Know Box -->
        <div class="did-you-know-box">
          <strong>★ Did You Know? (Human Quirks of History):</strong> ${l.did_you_know}
        </div>

        ${renderFooter(leftPageNum, true, l.subtitle)}
      </div>
    </div>
    `;

    // RIGHT PAGE (RECTO): Disciplinary Skill & Visual Source
    const src = l.right_page_task.visual_source;
    const srcBase64 = getBase64Image(src.image);

    html += `
    <div class="page page-container recto-page" id="page-${rightPageNum}">
      <div class="page-body-full">
        <!-- Header Strip -->
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              HISTORICAL DISCIPLINARY PRACTICE &bull; EVIDENCE &amp; EVALUATION
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.2pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.15;">
              ${l.right_page_task.skill_title}
            </h2>
          </div>
          <span class="badge">${l.skill}</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 4px;">
          <strong>Historical Investigation:</strong> ${l.right_page_task.instructions}
        </div>

        <!-- Visual Primary Source Box -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; margin-bottom: 4px; display: flex; gap: 8px; align-items: center; background: #ffffff;">
          <div style="width: 38mm; height: 38mm; flex-shrink: 0; border: 1px solid #000; overflow: hidden; background: #eee;">
            <img src="${srcBase64}" alt="${src.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex: 1;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              ${src.title}
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 7.8pt; line-height: 1.22; color: #111; margin-bottom: 3px;">
              ${src.caption}
            </div>
            <div style="background: #fbfbfb; border: 1px dotted #888; border-radius: 2px; padding: 2px 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
              <strong>Question on Source:</strong> ${src.question}
            </div>
          </div>
        </div>

        <!-- Written Analytical Response Block (Ruled Lines) -->
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt; text-transform: uppercase; letter-spacing: 0.5px;">
                Structured Written Response &bull; Analytical Argument
              </strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; border: 1px solid #000; padding: 0 4px; border-radius: 2px;">ASSESSMENT FOCUS</span>
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 3px;">
              ${l.right_page_task.written_task_prompt}
            </div>
          </div>

          <!-- Handwriting Lines (Strictly Balanced for 0px Overflow) -->
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-around; margin: 2px 0;">
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
            <div class="task-line-solid"></div>
          </div>

          <!-- Success Criteria Footer -->
          <div style="border-top: 1px dashed #888; padding-top: 2px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6.4pt; color: #333;">
            <span>[✓] Deploys specific date/fact</span>
            <span>[✓] Explains historical consequence</span>
            <span>[✓] Reaches reasoned verdict</span>
            <span style="font-weight: 800; color: #000;">Teacher Score: [ &nbsp; / 8 ]</span>
          </div>
        </div>

        ${renderFooter(rightPageNum, false, l.right_page_task.skill_title)}
      </div>
    </div>
    `;
  });

  // ==========================================================================
  // PAGES 16–17: SYNOPTIC EXTENDED ESSAY RESPONSE SPREAD
  // ==========================================================================
  // Page 16 (Verso): The Evaluative Matrix & Sentence Connectives
  html += `
  <div class="page page-container verso-page" id="page-16">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              YEAR 8 SYNOPTIC ASSESSMENT &bull; DISCIPLINARY WRITING MASTERCLASS
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              Planning Frame: “The World Turned Upside Down?” (1517–1689)
            </h2>
          </div>
          <span class="badge">ESSAY SCAFFOLD</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.25; margin-bottom: 4px;">
          <strong>Enquiry Essay Question:</strong> <em>“‘The World Turned Upside Down’? To what extent did life and power in Britain truly change between 1517 and 1689?”</em>
        </div>
      </div>

      <!-- 4-Box Evaluative Decision Matrix -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; flex: 1;">
        <!-- Box 1: Political Power -->
        <div style="border: 1px solid #000; border-radius: 3px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt;">1. Political Power &amp; Law</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000; padding: 0 3px;">TRANSFORMATION</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 7.6pt; line-height: 1.2;">
              • <strong>1517:</strong> Divine Right monarchs ruled alone; Henry VIII jailed and beheaded opponents.<br>
              • <strong>1689:</strong> Bill of Rights forces monarchs to obey Parliament; taxation and law belong to MPs.
            </div>
          </div>
          <div style="border-top: 1px dotted #888; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic;">
            Extent of Change: <strong style="color: #000;">RADICAL TRANSFORMATION</strong>
          </div>
        </div>

        <!-- Box 2: Religion & Faith -->
        <div style="border: 1px solid #000; border-radius: 3px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt;">2. Religion &amp; Faith</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000; padding: 0 3px;">SIGNIFICANT SHIFT</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 7.6pt; line-height: 1.2;">
              • <strong>1517:</strong> 100% Catholic, answering to the Pope; heretics burned at the stake.<br>
              • <strong>1689:</strong> National Protestant Church; 1689 Toleration Act permits non-conformist worship.
            </div>
          </div>
          <div style="border-top: 1px dotted #888; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic;">
            Extent of Change: <strong style="color: #000;">SUBSTANTIAL REFORM</strong>
          </div>
        </div>

        <!-- Box 3: Ideas & Public Debate -->
        <div style="border: 1px solid #000; border-radius: 3px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt;">3. Free Speech &amp; Ideas</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000; padding: 0 3px;">MAJOR CHANGE</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 7.6pt; line-height: 1.2;">
              • <strong>1517:</strong> Strict royal censorship; critics had their ears sliced off in public pillories.<br>
              • <strong>1689:</strong> 22,000 pamphlets printed; Levellers, Diggers, and vibrant coffee-house debate.
            </div>
          </div>
          <div style="border-top: 1px dotted #888; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic;">
            Extent of Change: <strong style="color: #000;">EXPLOSION OF IDEAS</strong>
          </div>
        </div>

        <!-- Box 4: Everyday Life & Women -->
        <div style="border: 1px solid #000; border-radius: 3px; padding: 4px 6px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
              <strong style="font-family: 'Inter', sans-serif; font-size: 7.8pt;">4. Ordinary People &amp; Women</strong>
              <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; border: 1px solid #000; padding: 0 3px;">CONTINUITY</span>
            </div>
            <div style="font-family: 'Newsreader', serif; font-size: 7.6pt; line-height: 1.2;">
              • <strong>1517:</strong> Poor agricultural labourers lived in mud huts; women had zero legal property rights.<br>
              • <strong>1689:</strong> Only rich male landowners could vote; poor farm workers remained impoverished.
            </div>
          </div>
          <div style="border-top: 1px dotted #888; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-style: italic;">
            Extent of Change: <strong style="color: #000;">STRIKING CONTINUITY (90%)</strong>
          </div>
        </div>
      </div>

      <!-- Causal Connectives & Essay Structure Toolkit -->
      <div style="border: 1.2px solid #000; border-radius: 3px; padding: 4px 8px; margin-top: 4px; background: #fafafa;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
          ★ Analytical Historian’s Writing Toolkit (Use these sentence stems on Page 17):
        </strong>
        <div style="font-family: 'Newsreader', serif; font-size: 7.4pt; line-height: 1.22; color: #222;">
          <em>• "At the pinnacle of political power, Britain experienced a fundamental revolution because..."</em><br>
          <em>• "In terms of religion, the medieval papal monopoly was permanently replaced by..."</em><br>
          <em>• "However, the claim that the world turned 'upside down' is heavily undermined when examining the bottom 90% of society..."</em><br>
          <em>• "Consequently, while power shifted from monarch to Parliament, social inequality showed remarkable continuity because..."</em>
        </div>
      </div>

      ${renderFooter(16, true, 'Synoptic Essay Planning Matrix')}
    </div>
  </div>
  `;

  // Page 17 (Recto): Ruled Extended Essay Response Spread
  html += `
  <div class="page page-container recto-page" id="page-17">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              YEAR 8 SYNOPTIC ASSESSMENT &bull; FORMAL EVALUATIVE ESSAY
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              Enquiry Verdict: “The World Turned Upside Down?” (1517–1689)
            </h2>
          </div>
          <span class="badge">EXTENDED WRITING</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border: 1px solid #000; padding: 2px 6px; border-radius: 2px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 7.0pt;">
          <span><strong>Pupil Name:</strong> ___________________________________</span>
          <span><strong>Class:</strong> Year 8 ____</span>
          <span><strong>Target Band:</strong> Band 4 (Exemplary)</span>
        </div>
      </div>

      <!-- Ruled Handwriting Lines (Exactly 22 Lines for 0px Overflow) -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 2px 0;">
        ${Array(22)
          .fill(0)
          .map(() => '<div class="task-line-solid"></div>')
          .join('')}
      </div>

      <!-- Band 4 Evaluative Rubric Footer -->
      <div style="border: 1.2px solid #000; border-radius: 3px; padding: 3px 6px; margin-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.4pt;">
        <div>
          <strong>Band 4 Criteria:</strong> Nuanced distinction between radical political change at the top vs social continuity for the 90% at the bottom.
        </div>
        <div style="font-weight: 800; font-size: 7.2pt;">
          Mark: [ &nbsp;&nbsp;&nbsp;&nbsp; / 16 ]
        </div>
      </div>

      ${renderFooter(17, false, 'Formal Evaluative Essay Response')}
    </div>
  </div>
  `;

  // ==========================================================================
  // PAGES 18–19: KNOWLEDGE RETRIEVAL COMPANION & ANSWER KEY
  // ==========================================================================
  // Page 18 (Verso): 25 Core Retrieval Drill Questions
  html += `
  <div class="page page-container verso-page" id="page-18">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              KNOWLEDGE RETRIEVAL COMPANION &bull; DO NOW &amp; RECALL DRILL BANK
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              25 Core Knowledge Retrieval Questions (Lessons 1 to 5)
            </h2>
          </div>
          <span class="badge">RETRIEVAL BANK</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.22; margin-bottom: 4px;">
          Use these questions for lesson start-up Do Nows, home study, and partner quizzing. Write your answers, then turn to Page 19 to self-mark.
        </div>
      </div>

      <!-- 5 Lesson Retrieval Sections (5 Questions Each) -->
      <div style="display: flex; flex-direction: column; gap: 3.5px; flex: 1;">
        ${unitData.quizzing_pack.sections
          .map(
            (sec, sIdx) => `
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; letter-spacing: 0.4px;">
              ${sec.title}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800;">Score: &nbsp; &nbsp; / 5</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px;">
            ${sec.questions
              .map(
                (q, qIdx) => `
            <div>
              <div style="font-family: 'Inter', sans-serif; font-size: 6.6pt; line-height: 1.15; color: #000;">
                <strong>${q.id.toUpperCase()}:</strong> ${q.q}
              </div>
              <div style="border-bottom: 1px dotted #888888; height: 4.2mm; width: 100%;"></div>
            </div>
            `,
              )
              .join('')}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Total Score Box -->
      <div style="border: 1.2px solid #000; border-radius: 3px; padding: 2px 6px; margin-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.0pt;">
        <span><strong>Total Mastery Score:</strong> Sum up all 5 lesson scores after checking Page 19.</span>
        <span style="border: 1px solid #000; padding: 1px 6px; font-weight: 900; border-radius: 2px;">TOTAL: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 25 ]</span>
      </div>

      ${renderFooter(18, true, '25 Core Knowledge Retrieval Questions')}
    </div>
  </div>
  `;

  // Page 19 (Recto): Complete 25-Question Answer Key & DIRT Scoreboard
  html += `
  <div class="page page-container recto-page" id="page-19">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 800;">
              KNOWLEDGE RETRIEVAL COMPANION &bull; GREEN-PEN DIRT REVIEW
            </div>
            <h2 style="font-family: 'Playfair Display', serif; font-size: 11.5pt; color: #000000; margin: 1px 0 0 0; font-weight: 900;">
              Official 25-Question Answer Key &amp; Scoreboard
            </h2>
          </div>
          <span class="badge">ANSWER KEY</span>
        </div>

        <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.22; margin-bottom: 4px;">
          Use a green pen to mark your answers on Page 18. Correct any misconceptions immediately.
        </div>
      </div>

      <!-- 5 Answer Key Blocks -->
      <div style="display: flex; flex-direction: column; gap: 3.5px; flex: 1;">
        ${unitData.quizzing_pack.sections
          .map(
            (sec) => `
        <div style="border: 1px solid #000000; border-radius: 3px; padding: 3px 6px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; background: #ffffff;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #000; padding-bottom: 1px; margin-bottom: 2px;">
            ${sec.title} &bull; Answers
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; font-family: 'Newsreader', serif; font-size: 7.2pt; line-height: 1.18;">
            ${sec.questions
              .map(
                (q) => `
            <div>
              <strong style="font-family: 'Inter', sans-serif; font-size: 6.6pt;">${q.id.toUpperCase()}:</strong> ${q.a}
            </div>
            `,
              )
              .join('')}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Gamified DIRT Scoreboard Matrix -->
      <div style="border: 1.5px solid #000; border-radius: 3px; padding: 3px 6px; margin-top: 3px; background: #fafafa;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">
          ★ Green-Pen DIRT Scoreboard &bull; Diagnostic Mastery Level:
        </strong>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-family: 'Inter', sans-serif; font-size: 6.5pt;">
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fff;">
            <strong>22–25 / 25: Master of the Council</strong><br>
            Exemplary recall! Ready for Grade 9 analysis.
          </div>
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fff;">
            <strong>17–21 / 25: Parliamentary Champion</strong><br>
            Secure core recall; revise missed terms in green pen.
          </div>
          <div style="border: 1px solid #000; padding: 2px 4px; border-radius: 2px; background: #fff;">
            <strong>&lt; 17 / 25: Tower of London</strong><br>
            DIRT correction: re-read the 4 Act story blocks.
          </div>
        </div>
      </div>

      ${renderFooter(19, false, 'Official Knowledge Retrieval Answer Key')}
    </div>
  </div>
  `;

  // ==========================================================================
  // PAGE 20: MASTER OUTSIDE BACK COVER
  // ==========================================================================
  html += renderKs3BackCover({
    unitId: 'monarchy_religion_power',
    unitTitle: 'CROWN, CHURCH, OR PARLIAMENT (1517–1689)',
    yearGroup: 'Year 8',
    departmentName: 'The History Department',
    lessons: [
      ...unitData.lessons.map((l) => ({ title: l.title, skill: l.skill })),
      { title: 'The Living Timeline & Dual-Coding Canvas', skill: 'Chronological Dual-Coding' },
      {
        title: 'Synoptic Essay: “The World Turned Upside Down?” (1517–1689)',
        skill: 'Evaluative Synthesis',
      },
      { title: 'Unit Retrieval Companion & Green-Pen DIRT Review', skill: 'Knowledge Recall' },
    ],
    qrLessons: unitData.lessons.map((l, i) => ({
      label: `Enquiry ${i + 1}`,
      subLabel: l.skill,
      url: `https://the-history-revision-hub.netlify.app/?unit=monarchy_religion_power&lesson=lesson_${i + 1}`,
      questionCount: 20,
    })),
    nextUnitPreview: {
      title: 'Spring Term &bull; Unit 2: The First British Empire (1600–1783)',
      desc: 'Investigate the East India Company, the Transatlantic Slave Trade, Maroon resistance in Jamaica, and the American Declaration of Independence.',
    },
    totalPageCount: 20,
    renderFooterStrip: () => renderFooter(20, true, 'The History Revision Hub'),
  });

  html += `
</body>
</html>`;

  return html;
}

async function compileWorkbook() {
  console.log(
    '🚀 Compiling 20-Page A4 Pupil Workbook for Crown, Church, or Parliament (1517–1689)...',
  );

  const html = await buildWorkbookHtml();

  const outHtmlPublic = path.join(
    ROOT_DIR,
    'public',
    'units',
    'monarchy_religion_power',
    'pupil_workbook.html',
  );
  const outHtmlUnit = path.join(
    ROOT_DIR,
    'units',
    'monarchy_religion_power',
    'pupil_workbook.html',
  );
  const outPdf = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'monarchy_religion_power_pupil_workbook.pdf',
  );

  fs.writeFileSync(outHtmlPublic, html, 'utf8');
  fs.writeFileSync(outHtmlUnit, html, 'utf8');
  console.log('✅ Wrote HTML to:', outHtmlPublic);

  console.log('📄 Launching Puppeteer to compile PDF with exact 272mm page budget...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Verify page count inside DOM
  const pageCount = await page.evaluate(() => document.querySelectorAll('.page').length);
  console.log(`📊 Total pages detected in DOM: ${pageCount} (Target: 20)`);

  await page.pdf({
    path: outPdf,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  await browser.close();
  console.log('🎉 Successfully compiled 20-page PDF to:', outPdf);
}

if (require.main === module) {
  compileWorkbook().catch((err) => {
    console.error('❌ Error compiling workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  compileWorkbook,
  buildWorkbookHtml,
};
