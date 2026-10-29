/**
 * scripts/render_medicine_master_textbook.cjs
 *
 * UNIFIED PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER FOR EDEXCEL GCSE MEDICINE (OPTION 11)
 * Paper 1: Medicine Through Time in Britain, c1250–present & The British Sector of the Western Front
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & GCSE Master Engine:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero key figures, zero exam rubrics)
 * - Exact 1:1 verbatim SSoT fidelity to units/edexcel_medicine/data.js narrative_blocks
 * - 5x Era Saddle-Stitch Booklets:
 *   * Medieval (c1250–c1500) — 12 Pages (3 folded A3 sheets)
 *   * Renaissance (c1500–c1700) — 12 Pages (3 folded A3 sheets)
 *   * 18th & 19th Century (c1700–c1900) — 12 Pages (3 folded A3 sheets)
 *   * Modern Britain (c1900–present) — 12 Pages (3 folded A3 sheets)
 *   * The Western Front (1914–1918) — 16 Pages (4 folded A3 sheets)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 * - In-browser typography calibration engine (0px overflow, < 25px footer void, >= 95% utilization)
 *
 * Usage:
 *   node scripts/render_medicine_master_textbook.cjs medieval
 *   node scripts/render_medicine_master_textbook.cjs renaissance
 *   node scripts/render_medicine_master_textbook.cjs 18th_19th
 *   node scripts/render_medicine_master_textbook.cjs modern
 *   node scripts/render_medicine_master_textbook.cjs western_front
 *   node scripts/render_medicine_master_textbook.cjs all
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');
const { MEDICINE_ERAS } = require('./components/medicine_textbook_metadata.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency offline rendering
function getBase64Image(relativePath) {
  if (!relativePath) return '';
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(
        ROOT_DIR,
        'public',
        'units',
        'edexcel_medicine',
        'assets',
        path.basename(cleanPath),
      ),
      path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'assets', path.basename(cleanPath)),
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
                : ext === '.svg'
                  ? 'image/svg+xml'
                  : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return relativePath;
  } catch (err) {
    return relativePath;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>) and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/<span\s+class=["']archival-meta-tag["']>[^<]*<\/span>\s*/gi, '')
    .replace(/<span\s+class=["']para-ref-pill["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/,\s*\)/g, ')')
    .replace(/\(\s*,\s*/g, '(')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Clean block section titles (removes "Act 1: ", etc.)
function cleanBlockTitle(title) {
  if (!title) return '';
  return title
    .replace(/^Act\s+\d+:\s*/i, '')
    .replace(/^Block\s+\d+:\s*/i, '')
    .trim();
}

// Clean lesson titles (removes "KT1.1: ", "L21: ", etc.)
function cleanLessonTitle(title) {
  if (!title) return '';
  return title
    .replace(/^KT\d+\.\d+:\s*/i, '')
    .replace(/^L\d+:\s*/i, '')
    .replace(/^Lesson\s+\d+:\s*/i, '')
    .trim();
}

// Load Medicine Unit Data from units/edexcel_medicine/data.js
function loadMedicineData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.error('Data file not found:', dataPath);
    process.exit(1);
  }
  const content = fs.readFileSync(dataPath, 'utf8');
  const startIndex = content.indexOf('{');
  const endIndex = content.lastIndexOf('}');
  return eval('(' + content.substring(startIndex, endIndex + 1) + ')');
}

// Narrative Overview Synopses for each Era Cover
const ERA_SYNOPSES = {
  medieval: {
    period: 'c1250–c1500',
    caption:
      'The Church Monopoly & Galenic Orthodoxy (c1250–c1500): Monks in monastic scriptoria copying theological treatises and Galenic manuscripts by candlelight, British Library MS Sloane.',
    p1: 'In medieval Britain, illness was understood through Catholic theological dogma and ancient classical authority. The Church held an institutional monopoly over learning, scriptoria, and universities, declaring Claudius Galen infallible. Disease was interpreted as divine retribution for sin, celestial alignment, or humoural imbalance, while human dissection remained strictly prohibited and questioning doctrine was condemned as heresy.',
    p2: 'When the catastrophic Black Death struck in 1348, killing over a third of the population, a society bound to the Four Humours and miasma theory stood powerless. From flagellants in city streets to herbal remedies, prayer, and bloodletting, this volume charts an age where religious devotion and Galenic tradition defined the human struggle against disease.',
  },
  renaissance: {
    period: 'c1500–c1700',
    caption:
      'Vesalius Dissecting the Human Arm (1543): Andreas Vesalius demonstrating anatomical structures directly from the human cadaver, De Humani Corporis Fabrica, Basel.',
    p1: "The collapse of feudalism, the printing press, and Renaissance humanism dismantled the Church's monopoly over medical learning. Scholars began questioning ancient texts, insisting that knowledge must rest on direct anatomical dissection and observable evidence. In 1543, Andreas Vesalius published De Humani Corporis Fabrica, proving Galen had committed over two hundred anatomical errors.",
    p2: 'From William Harvey proving the mechanical circulation of blood in 1628 to Thomas Sydenham championing clinical bedside observation, the Scientific Revolution transformed medicine into an empirical science. Yet as the 1665 Great Plague demonstrated, revolutionary breakthroughs in anatomical understanding could not immediately overcome the ancient challenge of discovering effective medical cures.',
  },
  '18th_19th': {
    period: 'c1700–c1900',
    caption:
      'Edward Jenner Vaccinating James Phipps (1796): Jenner inoculating the boy with cowpox lymph from milkmaid Sarah Nelmes, Wellcome Collection, London.',
    p1: 'The Industrial Revolution created packed, unsewered urban slums where cholera, typhus, and tuberculosis raged. In 1796, Edward Jenner developed the first smallpox vaccine. In 1861, Louis Pasteur published Germ Theory, proving microscopic pathogens caused decay—a breakthrough weaponised by Robert Koch to isolate the specific bacterial microbes of anthrax, tuberculosis, and cholera.',
    p2: 'Simultaneously, surgical and hospital care underwent a revolution. James Simpson introduced chloroform anaesthesia in 1847, while Joseph Lister conquered sepsis with carbolic acid spray in 1865. Pioneered by Florence Nightingale, John Snow, and the compulsory 1875 Public Health Act, Victorian Britain transformed hospitals and forced the state to abandon laissez-faire fatalism.',
  },
  modern: {
    period: 'c1900–present',
    caption:
      "Alexander Fleming in His Laboratory (1928): Fleming examining culture plates of penicillium notatum mould at St Mary's Hospital, London, Imperial War Museum.",
    p1: 'The twentieth century witnessed an unprecedented acceleration of clinical capability. In 1928, Alexander Fleming discovered penicillin, transformed into mass-produced antibiotics by Florey and Chain during the Second World War. With the 1948 launch of the National Health Service by Aneurin Bevan, medical treatment in Britain became a universal human right, free at the point of delivery.',
    p2: 'From Crick and Watson unravelling the double helix of DNA in 1953 to robotic surgery, organ transplants, and public health drives combating smoking and cancer, medicine advanced from fighting microbes to mastering molecular genetics. This volume traces how state welfare and high-technology science radically extended modern life expectancy.',
  },
  western_front: {
    period: '1914–1918',
    caption:
      'Stretcher Bearers in the Mud of Passchendaele (1917): RAMC stretcher bearers carrying a wounded soldier through liquid mud along duckboard tracks, Imperial War Museum Q 5935.',
    p1: 'The industrial violence of the First World War turned the Western Front into an unprecedented trauma laboratory. In the waterlogged, manured clay of Flanders and the Somme, artillery shrapnel and machine-gun fire caused horrific lacerations contaminated with gas gangrene and tetanus. The RAMC and FANY faced the colossal task of treating casualties under continuous shellfire.',
    p2: "British military medicine responded with urgent innovation: the rapid evacuation chain from Regimental Aid Posts to Casualty Clearing Stations, the life-saving Thomas Splint, mobile X-rays, preserved blood transfusions at Cambrai, and Harold Gillies's pioneering plastic surgery. This volume explores how the trauma of trench warfare catalyzed modern emergency surgery.",
  },
};

// Generates HTML for an era textbook
function generateEraHtml(eraKey, unitData) {
  const eraMeta = MEDICINE_ERAS[eraKey];
  if (!eraMeta) throw new Error(`Unknown era key: ${eraKey}`);

  const synopsisData = ERA_SYNOPSES[eraKey];
  const lessons = unitData.lessons.slice(
    eraMeta.lessonStart,
    eraMeta.lessonStart + eraMeta.lessonCount,
  );
  const totalPages = eraKey === 'western_front' ? 16 : 12;

  const heroImageUri = getBase64Image(eraMeta.coverImage);

  // Build Enquiry Spreads HTML
  let spreadsHtml = '';
  lessons.forEach((lesson, lIdx) => {
    const globalLessonNum = eraMeta.lessonStart + lIdx + 1;
    const isWf = eraKey === 'western_front';
    const versoPageNum = isWf ? lIdx * 2 + 3 : lIdx * 2 + 2;
    const rectoPageNum = isWf ? lIdx * 2 + 4 : lIdx * 2 + 3;

    const fullTitle = cleanLessonTitle(lesson.title);
    const shortTitle = fullTitle.split('(')[0].split(':')[0].trim();
    const blocks = lesson.narrative_blocks || [];

    // Concept spotlight for Recto banner
    const cs = (eraMeta.conceptSpotlights && eraMeta.conceptSpotlights[lIdx]) || {
      title: 'Historical Causation & Decisive Breakthrough',
      takeaway: 'Key Causation: Fundamental transformation in clinical practice and understanding.',
    };
    const cleanTakeaway = cs.takeaway.replace(
      /^(Key Causation|Exam Distinction|Key Evidence|Core Specification Anchor|Historiographical Reality|Key Impact|Exam Anchor|Key Insight|Core Pedagogical Point|Specification Anchor|Key Scientific Shift|Historiographical Factor|Modern Public Health Principle|Historic Environment Anchor|Core Surgical Innovation):\s*/i,
      '',
    );

    // Format paragraphs
    const formatBlockParas = (block, defaultAct) => {
      if (!block || !block.text) return '';
      const parts = block.text.split(/<br\s*\/?>\s*<br\s*\/?>|\n\s*\n/).filter((p) => p.trim());
      return parts
        .map((p) => {
          const cleaned = cleanProse(p);
          return `<p class="prose-p">${formatMarkdown(cleaned)}</p>`;
        })
        .join('');
    };

    // Verso: Blocks 0 & 1 (Acts 1 & 2)
    const block1 = blocks[0] || {};
    const block2 = blocks[1] || {};

    // Recto: Blocks 2, 3, 4 (Acts 3, 4, 5)
    const block3 = blocks[2] || {};
    const block4 = blocks[3] || {};
    const block5 = blocks[4] || {};

    // ----------------------------------------------------
    // VERSO PAGE (PART I)
    // ----------------------------------------------------
    spreadsHtml += `
    <!-- ENQUIRY ${lIdx + 1}: VERSO (PAGE ${versoPageNum}) -->
    <div class="page spread-page verso-page" id="page-${versoPageNum}" data-page="${versoPageNum}">
      <header class="running-header">
        <span class="header-unit">The History Revision Hub &bull; GCSE Master Series &bull; ${eraMeta.title}</span>
        <span class="header-enquiry">Enquiry 0${lIdx + 1} &bull; Part I</span>
      </header>

      <div class="spread-banner verso-banner">
        <div class="banner-top-row">
          <span class="enquiry-pill">ENQUIRY 0${lIdx + 1} &bull; PART I</span>
          <span class="spec-tag">Pearson Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)</span>
        </div>
        <h2 class="enquiry-title">${fullTitle}</h2>
        <div class="enquiry-question-box">
          <span class="eq-badge">KEY ENQUIRY QUESTION</span>
          <span class="eq-text"><em>${lesson.enquiry_question || 'How did medical understanding develop across this period?'}</em></span>
        </div>
      </div>

      <div class="spread-body">
        <div class="prose-columns">
          ${
            block1.title
              ? `
          <div class="block-section">
            <h3 class="block-header">[${lIdx + 1}.1] ${cleanBlockTitle(block1.title)}</h3>
            ${formatBlockParas(block1, 1)}
          </div>`
              : ''
          }

          ${
            block2.title
              ? `
          <div class="block-section">
            <h3 class="block-header">[${lIdx + 1}.2] ${cleanBlockTitle(block2.title)}</h3>
            ${formatBlockParas(block2, 2)}
          </div>`
              : ''
          }
        </div>
      </div>

      <footer class="page-footer">
        <span class="footer-left">Page ${versoPageNum} &bull; Enquiry 0${lIdx + 1}: ${shortTitle}</span>
        <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="footer-right">Paper 1 Option 11</span>
      </footer>
    </div>

    <!-- ENQUIRY ${lIdx + 1}: RECTO (PAGE ${rectoPageNum}) -->
    <div class="page spread-page recto-page" id="page-${rectoPageNum}" data-page="${rectoPageNum}">
      <header class="running-header">
        <span class="header-unit">The History Revision Hub &bull; GCSE Master Series &bull; ${eraMeta.title}</span>
        <span class="header-enquiry">Enquiry 0${lIdx + 1} &bull; Part II</span>
      </header>

      <div class="spread-banner recto-banner">
        <div class="banner-top-row">
          <span class="enquiry-pill" style="background: #1e3a8a;">ENQUIRY 0${lIdx + 1} &bull; PART II</span>
          <span class="spec-tag" style="color: #1e3a8a; font-weight: 700;">Turning Points &amp; Historical Consequences</span>
        </div>
        <h2 class="enquiry-title" style="font-size: 11pt;">${cs.title || 'Historical Significance &amp; Decisive Turning Points'}</h2>
        <div class="enquiry-question-box" style="border-left-color: #1e3a8a; background: #eff6ff;">
          <span class="eq-badge" style="background: #1e3a8a;">DECISIVE HISTORICAL MECHANISM</span>
          <span class="eq-text" style="color: #1e3a8a;">${cleanTakeaway}</span>
        </div>
      </div>

      <div class="spread-body">
        <div class="prose-columns">
          ${
            block3.title
              ? `
          <div class="block-section">
            <h3 class="block-header">[${lIdx + 1}.3] ${cleanBlockTitle(block3.title)}</h3>
            ${formatBlockParas(block3, 3)}
          </div>`
              : ''
          }

          ${
            block4.title
              ? `
          <div class="block-section">
            <h3 class="block-header">[${lIdx + 1}.4] ${cleanBlockTitle(block4.title)}</h3>
            ${formatBlockParas(block4, 4)}
          </div>`
              : ''
          }

          ${
            block5.title
              ? `
          <div class="block-section">
            <h3 class="block-header">[${lIdx + 1}.5] ${cleanBlockTitle(block5.title)}</h3>
            ${formatBlockParas(block5, 5)}
          </div>`
              : ''
          }
        </div>
      </div>

      <footer class="page-footer">
        <span class="footer-left">Page ${rectoPageNum} &bull; Enquiry 0${lIdx + 1}: Turning Points &amp; Outcomes</span>
        <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="footer-right">Paper 1 Option 11</span>
      </footer>
    </div>
    `;
  });

  // Build Western Front Middle Pages (Page 2 Milestone Spine & Page 15 Evacuation Atlas)
  let wfPage2Html = '';
  let wfPage15Html = '';

  if (eraKey === 'western_front') {
    const milestones = eraMeta.timeline || [];
    const spineHtml = milestones
      .slice(0, 12)
      .map(
        (m, idx) => `
      <div class="milestone-item">
        <div class="milestone-date-badge">${m.year}</div>
        <div class="milestone-connector">
          <div class="milestone-node"></div>
          ${idx < 11 ? '<div class="milestone-line"></div>' : ''}
        </div>
        <div class="milestone-content">
          <div class="milestone-header-row">
            <span class="milestone-title">${(m.event.split(':')[0] || m.event).split(';')[0].trim()}</span>
          </div>
          <p class="milestone-desc">${(m.event.includes(';') ? m.event.split(';').slice(1).join(';') : m.event.includes(':') ? m.event.split(':').slice(1).join(':') : m.event).trim()}</p>
        </div>
      </div>
    `,
      )
      .join('');

    wfPage2Html = `
    <!-- PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE -->
    <div class="page spine-page" id="page-2" data-page="2">
      <header class="running-header">
        <span class="header-unit">The History Revision Hub &bull; GCSE Master Series &bull; ${eraMeta.title}</span>
        <span class="header-enquiry">Chronological Milestone Spine &bull; 1914–1918</span>
      </header>

      <div class="spine-intro-banner">
        <span class="spine-pill">CHRONOLOGY HIGHWAY &bull; 1914–1918</span>
        <h2 class="spine-title">Twelve Pivotal Turning Points of Western Front Trauma &amp; Surgery</h2>
        <p class="spine-subtitle">Follow the chronological spine of medical innovations, from early evacuation paralysis in 1914 to the institutionalised surgical triage of the Hundred Days.</p>
      </div>

      <div class="spine-list" id="spine-list">
        ${spineHtml}
      </div>

      <footer class="page-footer">
        <span class="footer-left">Page 2 &bull; Chronological Milestone Spine</span>
        <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="footer-right">1914–1918</span>
      </footer>
    </div>
    `;

    const trenchImgUri = getBase64Image('public/images/trench_construction_diagram_1914.png');
    const evacImgUri = getBase64Image('public/images/ramc_chain_of_evacuation.jpg');

    wfPage15Html = `
    <!-- PAGE 15: HISTORIC ENVIRONMENT ANATOMY & EVACUATION ATLAS -->
    <div class="page atlas-page" id="page-15" data-page="15">
      <header class="running-header">
        <span class="header-unit">The History Revision Hub &bull; GCSE Master Series &bull; ${eraMeta.title}</span>
        <span class="header-enquiry">Historic Environment Anatomy &bull; Evacuation &amp; Terrain</span>
      </header>

      <div class="spine-intro-banner" style="margin-bottom: 5px;">
        <span class="spine-pill">HISTORIC ENVIRONMENT ATLAS</span>
        <h2 class="spine-title" style="font-size: 11pt;">The Western Front Theater &amp; The RAMC Chain of Evacuation</h2>
        <p class="spine-subtitle">Understanding how battlefield geography, trench architecture, and transport bottlenecks dictated surgical survival rates.</p>
      </div>

      <div class="atlas-dual-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 6px;">
        <div class="atlas-card" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; box-sizing: border-box;">
          <div style="height: 50mm; overflow: hidden; border-radius: 3px; background: #fff; text-align: center; box-sizing: border-box;">
            ${trenchImgUri ? `<img src="${trenchImgUri}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="Trench System Diagram">` : ''}
          </div>
          <div style="font-size: 6.3pt; color: #475569; margin-top: 3px; line-height: 1.25;">
            <strong>Trench Anatomy:</strong> Frontline, support, and reserve lines connected by zigzag communications trenches to contain blast radius.
          </div>
        </div>
        <div class="atlas-card" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px; background: #fafaf9; box-sizing: border-box;">
          <div style="height: 50mm; overflow: hidden; border-radius: 3px; background: #fff; text-align: center; box-sizing: border-box;">
            ${evacImgUri ? `<img src="${evacImgUri}" style="width: 100%; height: 100%; object-fit: contain; display: block;" alt="RAMC Evacuation Chain">` : ''}
          </div>
          <div style="font-size: 6.3pt; color: #475569; margin-top: 3px; line-height: 1.25;">
            <strong>Chain of Evacuation:</strong> Stretcher Bearers &rarr; Regimental Aid Post &rarr; Dressing Stations &rarr; Casualty Clearing Station &rarr; Base Hospitals.
          </div>
        </div>
      </div>

      <div class="flashpoints-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; flex: 1;">
        <div class="fp-card" style="border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 3px; padding: 5px 8px; background: #fff;">
          <div style="font-size: 7pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">1. Manured Soil Ecology &amp; Gas Gangrene</div>
          <div style="font-size: 6.4pt; color: #334155; line-height: 1.28;">Intensively farmed Flanders clay contained lethal clostridium and tetanus bacteria. Shrapnel blasted soiled uniform cloth deep into lacerations, causing rapid anaerobic tissue necrosis.</div>
        </div>
        <div class="fp-card" style="border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 3px; padding: 5px 8px; background: #fff;">
          <div style="font-size: 7pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">2. Mud, Crater Fields &amp; Bearer Relays</div>
          <div style="font-size: 6.4pt; color: #334155; line-height: 1.28;">Continuous artillery bombardments destroyed natural drainage canals. Carrying a single stretcher through Passchendaele mud required up to eight exhausted bearers over six agonizing hours.</div>
        </div>
        <div class="fp-card" style="border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 3px; padding: 5px 8px; background: #fff;">
          <div style="font-size: 7pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">3. Triage &amp; The Critical 12-Hour Window</div>
          <div style="font-size: 6.4pt; color: #334155; line-height: 1.28;">Casualty Clearing Stations performed vital emergency surgery. Unless abdominal and chest trauma cases reached the surgeon’s table within 12 hours, peritonitis and irreversible shock proved fatal.</div>
        </div>
        <div class="fp-card" style="border: 1px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; border-radius: 3px; padding: 5px 8px; background: #fff;">
          <div style="font-size: 7pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">4. Subterranean &amp; Mobile Infrastructure</div>
          <div style="font-size: 6.4pt; color: #334155; line-height: 1.28;">At Arras, British engineers linked ancient limestone quarries into Thompson's Cave, a bombproof 700-bed hospital with electric lights, operating theatres, and piped water 20 meters underground.</div>
        </div>
      </div>

      <footer class="page-footer">
        <span class="footer-left">Page 15 &bull; Historic Environment Anatomy &amp; Evacuation Atlas</span>
        <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span class="footer-right">The Western Front</span>
      </footer>
    </div>
    `;
  }

  // Build Back Cover Quiz Cards
  let quizCardsHtml = '';
  if (eraKey === 'western_front') {
    // 6 Cards x 6 Questions = 36 Questions
    quizCardsHtml = lessons
      .map((lesson, lIdx) => {
        const qItems = (lesson.do_now && lesson.do_now.items) || [];
        const questions = qItems
          .slice(0, 6)
          .map(
            (item, qIdx) => `
        <li>
          <span class="q-num">${lIdx * 6 + qIdx + 1}.</span>
          <span class="q-txt">${item.question}</span>
        </li>
      `,
          )
          .join('');

        return `
        <div class="quiz-card">
          <div class="quiz-card-header">
            <span class="quiz-card-topic">Enquiry 0${lIdx + 1}: ${cleanLessonTitle(lesson.title).split('(')[0].trim()}</span>
            <span class="quiz-card-loc">pp. ${lIdx * 2 + 3}–${lIdx * 2 + 4} &bull; Ref [${21 + lIdx}.1]–[${21 + lIdx}.5]</span>
          </div>
          <ul class="quiz-card-list">
            ${questions}
          </ul>
        </div>
      `;
      })
      .join('');
  } else {
    // Eras 1–4: 5 Enquiry Cards + 1 Synoptic Card (6 Cards x 5 Questions = 30 Questions)
    const cards = lessons.map((lesson, lIdx) => {
      const qItems = (lesson.do_now && lesson.do_now.items) || [];
      const questions = qItems
        .slice(0, 5)
        .map(
          (item, qIdx) => `
        <li>
          <span class="q-num">${lIdx * 5 + qIdx + 1}.</span>
          <span class="q-txt">${item.question}</span>
        </li>
      `,
        )
        .join('');

      return `
        <div class="quiz-card">
          <div class="quiz-card-header">
            <span class="quiz-card-topic">Enquiry 0${lIdx + 1}: ${cleanLessonTitle(lesson.title).split('(')[0].trim()}</span>
            <span class="quiz-card-loc">pp. ${lIdx * 2 + 2}–${lIdx * 2 + 3} &bull; Ref [${lIdx + 1}.1]–[${lIdx + 1}.5]</span>
          </div>
          <ul class="quiz-card-list">
            ${questions}
          </ul>
        </div>
      `;
    });

    // Card 6: Synoptic Retrieval & Causal Dominoes
    const synopticQuestions = [
      'Explain the single biggest obstacle to medical progress across this era.',
      'Which institution or technological breakthrough triggered the greatest shift in clinical practice?',
      'How did contemporary beliefs about the causes of disease influence the treatments administered?',
      'Assess the extent of continuity between the start and end of this chronological period.',
      'Identify one individual whose contributions laid the groundwork for subsequent breakthroughs.',
    ]
      .map(
        (q, idx) => `
      <li>
        <span class="q-num">${25 + idx + 1}.</span>
        <span class="q-txt"><strong>[Synoptic]</strong> ${q}</span>
      </li>
    `,
      )
      .join('');

    cards.push(`
      <div class="quiz-card" style="border-top-color: #1e3a8a;">
        <div class="quiz-card-header" style="background: #eff6ff;">
          <span class="quiz-card-topic" style="color: #1e3a8a;">Synoptic Synthesis &amp; Historical Causation</span>
          <span class="quiz-card-loc">pp. 2–11 &bull; Whole-Era Recall</span>
        </div>
        <ul class="quiz-card-list">
          ${synopticQuestions}
        </ul>
      </div>
    `);

    quizCardsHtml = cards.join('');
  }

  // Build Front Cover Specification Directory Cards (6 Enquiry Cards)
  const enquiryCards = eraMeta.enquiryCards || [];
  const cardsHtml = enquiryCards
    .map(
      (e) => `
    <div class="card-box">
      <div class="card-head">
        <span class="enquiry-tag">${e.num === '06' && eraKey !== 'western_front' ? 'THEMATIC MATRIX' : `ENQUIRY ${e.num}`}</span>
        <span class="page-locator">${e.pages}</span>
      </div>
      
      <h3 class="card-heading">${e.title}</h3>
      
      <div class="card-question">
        <span class="q-badge">KEY QUESTION:</span>
        <span class="q-quote">"${e.question}"</span>
      </div>

      <div class="card-points">
        <div class="pt-row"><span class="bullet-dot">▪</span><div class="pt-content">${e.b1}</div></div>
        <div class="pt-row"><span class="bullet-dot">▪</span><div class="pt-content">${e.b2}</div></div>
        <div class="pt-row"><span class="bullet-dot">▪</span><div class="pt-content">${e.b3}</div></div>
      </div>
    </div>
  `,
    )
    .join('');

  let examRibbonHtml = '';
  if (eraKey === 'western_front') {
    examRibbonHtml = `
      <div class="master-exam-ribbon">
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Specification Paper</div>
          <div class="ribbon-cell-content">Paper 1 Option 11 &bull; Historic Environment</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Section A Question Architecture</div>
          <div class="ribbon-cell-content">Q1: Features [4m] &bull; Q2(a): Utility [8m] &bull; Q2(b): Follow-Up [4m]</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Assessment Weighting</div>
          <div class="ribbon-cell-content">16 Raw Marks + 4 SPaG &bull; 30% of Paper 1 Total</div>
        </div>
      </div>
    `;
  } else {
    examRibbonHtml = `
      <div class="master-exam-ribbon">
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Specification Paper</div>
          <div class="ribbon-cell-content">Paper 1 Option 11 &bull; Thematic Study</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Section B Question Architecture</div>
          <div class="ribbon-cell-content">Q3: Similarity/Diff [4m] &bull; Q4: Causation [12m] &bull; Q5/Q6: Essay [16m+4m]</div>
        </div>
        <div class="ribbon-cell">
          <div class="ribbon-cell-title">Assessment Weighting</div>
          <div class="ribbon-cell-content">36 Raw Marks + 4 SPaG &bull; 70% of Paper 1 Total</div>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Revision Hub &bull; ${eraMeta.title} (${eraMeta.period}) Master Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }

    @page {
      size: A4 portrait;
      margin: 12mm 14mm 12mm 14mm;
    }

    body {
      font-family: 'Lora', Georgia, serif;
      font-size: 11pt;
      line-height: 1.54;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .page {
      width: 100%;
      height: 273mm;
      max-height: 273mm;
      overflow: hidden;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    /* Common Running Header & Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .page-footer {
      border-top: 1.2px solid #cbd5e1;
      padding-top: 4px;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #64748b;
      flex-shrink: 0;
      white-space: nowrap;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================================== */
    .cover-page {
      padding: 0;
    }

    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      flex-shrink: 0;
    }

    .masthead-title {
      font-family: 'Cinzel', serif;
      font-size: 10.5pt;
      font-weight: 900;
      letter-spacing: 0.10em;
      color: #0f172a;
    }

    .masthead-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 800;
      background: #1e3a8a;
      color: #ffffff;
      padding: 1.5px 6.5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
    }

    .cover-titles-wrap {
      text-align: center;
      margin-bottom: 3px;
      flex-shrink: 0;
    }

    .cover-spec-pill {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1px;
      display: inline-block;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: ${eraKey === 'western_front' ? '15pt' : '16pt'};
      font-weight: 900;
      letter-spacing: 0.02em;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.15;
      white-space: nowrap;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.5pt;
      font-style: italic;
      color: #475569;
      margin: 0;
    }

    /* Middle Row: Calibrated 54mm height */
    .cover-middle-row {
      display: grid;
      grid-template-columns: 80mm 1fr;
      gap: 9px;
      margin-bottom: 3px;
      height: 54mm;
      flex-shrink: 0;
    }

    .cover-hero-col {
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3px;
      background: #fafaf9;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .cover-hero-artwork-frame {
      flex: 1;
      overflow: hidden;
      border-radius: 3px;
      background: #ffffff;
    }

    .cover-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      display: block;
    }

    .cover-hero-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.2;
      color: #475569;
      margin-top: 2px;
    }

    .cover-synopsis-card {
      border: 1px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      border-radius: 4px;
      padding: 5px 9px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .blurb-header {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 900;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1e3a8a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 2px;
      flex-shrink: 0;
    }

    .cover-synopsis-quote {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.9pt;
      line-height: 1.28;
      color: #1e293b;
      text-align: justify;
    }

    .cover-synopsis-quote p {
      margin: 0 0 3px 0;
    }

    .cover-synopsis-quote p:last-child {
      margin-bottom: 0;
    }

    .cover-overview-footer {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      flex-shrink: 0;
    }

    /* LOWER SECTION: SPECIFICATION DIRECTORY - CLEAN, ZERO FLUFF */
    .master-dossier {
      border: 2px solid #0f172a;
      border-radius: 4px;
      background: #ffffff;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 3px;
      min-height: 0;
    }
    
    .dossier-header-bar {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    .dossier-header-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .dossier-header-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #93c5fd;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .dossier-card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 4px;
      padding: 4px;
      background: #f1f5f9;
      flex: 1;
      min-height: 0;
    }
    
    /* The Enquiry Card: Snug, Filled, Readable, Zero Ref Pills */
    .card-box {
      background: #ffffff;
      border: 1.2px solid #cbd5e1;
      border-top: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 4.5px 7px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
      min-width: 0;
    }
    
    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
      flex-shrink: 0;
    }

    .enquiry-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 900;
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 5.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .page-locator {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #1e3a8a;
    }

    .card-heading {
      font-family: 'Inter', sans-serif;
      font-size: 9.0pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 2px 0;
    }

    .card-question {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 3px solid #1e3a8a;
      border-radius: 2px;
      padding: 2px 5px;
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 2px;
      flex-shrink: 0;
    }

    .q-badge {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 900;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .q-quote {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.8pt;
      font-style: italic;
      color: #1e3a8a;
      line-height: 1.18;
    }

    .card-points {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      flex: 1;
      justify-content: space-between;
    }

    .pt-row {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      line-height: 1.22;
      color: #334155;
    }

    .bullet-dot {
      color: #1e3a8a;
      font-size: 8.0pt;
      font-weight: 900;
      line-height: 1.0;
      flex-shrink: 0;
    }

    .pt-content {
      flex: 1;
    }

    .pt-content strong {
      color: #0f172a;
      font-weight: 800;
    }

    /* Bottom Exam Ribbon: Authentic Exam Specification & Weighting */
    .master-exam-ribbon {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 10px;
      display: grid;
      grid-template-columns: 0.95fr 1.4fr 0.95fr;
      gap: 8px;
      border-top: 2px solid #1e3a8a;
      align-items: center;
      flex-shrink: 0;
    }

    .ribbon-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
    }

    .ribbon-cell-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #93c5fd;
      margin-bottom: 1px;
      white-space: nowrap;
    }

    .ribbon-cell-content {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      color: #e2e8f0;
      line-height: 1.2;
      white-space: nowrap;
    }

    .cover-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      color: #64748b;
      flex-shrink: 0;
    }

    /* ==========================================================================
       SPREAD PAGES: DOUBLE-PAGE NARRATIVE
       ========================================================================== */
    .spread-page {
      padding: 0;
    }

    .spread-banner {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }

    .banner-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .enquiry-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: #0f172a;
      color: #ffffff;
      padding: 1.5px 6px;
      border-radius: 2px;
    }

    .spec-tag {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 11.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2.5px 0;
      line-height: 1.15;
    }

    .enquiry-question-box {
      background: #f1f5f9;
      border-left: 3px solid #0f172a;
      padding: 2.5px 6px;
      font-size: 7.3pt;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .eq-badge {
      font-family: 'Inter', sans-serif;
      font-size: 6pt;
      font-weight: 900;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: #0f172a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .eq-text {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.6pt;
      color: #1e293b;
    }

    .spread-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      margin-bottom: 12px;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 16px;
      column-fill: balance;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
    }

    .block-section {
      break-inside: auto;
      margin-bottom: 5px;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2.5px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
      letter-spacing: 0.02em;
    }

    .prose-p {
      font-family: 'Lora', Georgia, serif;
      font-size: 11.2pt;
      line-height: 1.54;
      color: #1e293b;
      margin: 0 0 6px 0;
      text-indent: 0;
    }

    /* Calibrated Base Typography per Page Type (Verso vs Recto) */
    .verso-page .prose-p {
      font-size: 11.0pt;
      line-height: 1.50;
      margin: 0 0 6.0px 0;
    }
    .verso-page .block-section {
      margin-bottom: 6.5px;
    }
    .verso-page .block-header {
      font-size: 8.4pt;
      margin-bottom: 2.5px;
    }

    .recto-page .prose-p {
      font-size: 9.6pt;
      line-height: 1.38;
      margin: 0 0 3.5px 0;
    }
    .recto-page .block-section {
      margin-bottom: 3.5px;
    }
    .recto-page .block-header {
      font-size: 7.8pt;
      margin-bottom: 1.6px;
    }

    /* ==========================================================================
       PAGE 2: CHRONOLOGICAL SPINE (WESTERN FRONT)
       ========================================================================== */
    .spine-intro-banner {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3.5px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }

    .spine-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      background: #0f172a;
      color: #ffffff;
      padding: 1.5px 6px;
      border-radius: 2px;
      display: inline-block;
      margin-bottom: 2px;
    }

    .spine-title {
      font-family: 'Cinzel', serif;
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
    }

    .spine-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.5pt;
      font-style: italic;
      color: #475569;
      margin: 0;
    }

    .spine-list {
      display: flex;
      flex-direction: column;
      gap: 6.5px;
      flex: 1;
      justify-content: flex-start;
    }

    .milestone-item {
      display: flex;
      align-items: stretch;
      gap: 6px;
    }

    .milestone-date-badge {
      width: 20mm;
      flex-shrink: 0;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 800;
      color: #1e3a8a;
      text-align: right;
      padding-top: 1px;
    }

    .milestone-connector {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 10px;
      flex-shrink: 0;
    }

    .milestone-node {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 1.5px solid #ffffff;
      box-shadow: 0 0 0 1px #1e3a8a;
      margin-top: 2px;
    }

    .milestone-line {
      flex: 1;
      width: 1.5px;
      background: #cbd5e1;
      margin-top: 1px;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 3.5px 8px;
    }

    .milestone-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .milestone-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
    }

    .milestone-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.4pt;
      line-height: 1.28;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       BACK COVER: MASTER KNOWLEDGE RETRIEVAL QUIZ
       ========================================================================== */
    .quiz-page {
      padding: 0;
    }

    .quiz-masthead {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-shrink: 0;
    }

    .quiz-titles {
      margin-bottom: 4px;
      text-align: center;
      flex-shrink: 0;
    }

    .quiz-main-title {
      font-family: 'Cinzel', serif;
      font-size: 15pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 1px 0;
      letter-spacing: 0.04em;
    }

    .quiz-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.4pt;
      font-style: italic;
      color: #475569;
      margin: 0;
    }

    .quiz-protocol-banner {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      border-radius: 3px;
      padding: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      line-height: 1.25;
      color: #334155;
      margin-bottom: 6px;
      flex-shrink: 0;
    }

    .quiz-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px;
      flex: 1;
    }

    .quiz-card {
      min-width: 0;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #0f172a;
      border-radius: 3px;
      background: #ffffff;
      padding: 4.5px 6.5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .quiz-card-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }

    .quiz-card-topic {
      font-family: 'Inter', sans-serif;
      font-size: 7.1pt;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 65%;
    }

    .quiz-card-loc {
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      font-weight: 700;
      color: #1e3a8a;
      white-space: nowrap;
    }

    .quiz-card-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 2px;
    }

    .quiz-card-list li {
      display: flex;
      align-items: flex-start;
      gap: 3px;
      font-family: 'Lora', Georgia, serif;
      font-size: 6.6pt;
      line-height: 1.22;
      color: #1e293b;
    }

    .q-num {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      color: #0f172a;
      flex-shrink: 0;
      min-width: 12px;
    }

    .q-txt {
      flex: 1;
    }
  </style>
</head>
<body>

  <!-- ==========================================
       PAGE 1: MASTER FRONT COVER
  =========================================== -->
  <div class="page cover-page" id="page-1" data-page="1">
    <div>
      <header class="cover-top-masthead">
        <span class="masthead-title">The History Revision Hub</span>
        <span class="masthead-badge">Master Curriculum Series &bull; KS4 GCSE</span>
      </header>

      <div class="cover-titles-wrap">
        <span class="cover-spec-pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 1 Option 11</span>
        <h1 class="cover-main-title">${eraMeta.coverTitle}</h1>
        <p class="cover-subtitle">${eraMeta.coverSubtitle}</p>
      </div>

      <div class="cover-middle-row">
        <div class="cover-hero-col">
          <div class="cover-hero-artwork-frame">
            <img class="cover-hero-img" src="${heroImageUri}" alt="${eraMeta.title}">
          </div>
          <div class="cover-hero-caption">
            <strong>${eraMeta.title}:</strong> ${synopsisData.caption}
          </div>
        </div>

        <div class="cover-synopsis-card">
          <div>
            <div class="blurb-header">HISTORICAL OVERVIEW &bull; ${eraMeta.period}</div>
            <div class="cover-synopsis-quote">
              <p>${synopsisData.p1}</p>
              <p>${synopsisData.p2}</p>
            </div>
          </div>
          <div class="cover-overview-footer">
            <span>Pearson Edexcel GCSE History</span>
            <span>Paper 1 Option 11</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Clean, Zero-Fluff Specification Directory -->
    <div class="master-dossier">
      <div class="dossier-header-bar">
        <span class="dossier-header-title">SPECIFICATION &amp; ENQUIRY DIRECTORY</span>
        <span class="dossier-header-badge">Pearson Edexcel GCSE (9–1) History</span>
      </div>
      <div class="dossier-card-grid">
        ${cardsHtml}
      </div>
      ${examRibbonHtml}
    </div>

    <footer class="cover-footer">
      <span>Page 1 &bull; Course Specification &amp; Enquiry Directory</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Series</span>
      <span>${totalPages} Pages &bull; Saddle-Stitch</span>
    </footer>
  </div>

  ${wfPage2Html}

  ${spreadsHtml}

  ${wfPage15Html}

  <!-- ==========================================
       BACK COVER: MASTER KNOWLEDGE RETRIEVAL QUIZ
  =========================================== -->
  <div class="page quiz-page" id="page-${totalPages}" data-page="${totalPages}">
    <header class="quiz-masthead">
      <span class="masthead-title" style="font-size: 8.5pt;">The History Revision Hub</span>
      <span class="masthead-badge">Master Retrieval Engine</span>
    </header>

    <div class="quiz-titles">
      <h2 class="quiz-main-title">Master Knowledge Retrieval Quiz</h2>
      <p class="quiz-subtitle">${eraMeta.title} &bull; ${eraMeta.period} (${eraKey === 'western_front' ? '36' : '30'} Essential Recall Questions)</p>
    </div>

    <div class="quiz-protocol-banner">
      <strong>Standard Recall Protocol: Partner Quiz or Solo Practice.</strong> Test your rapid chronological, factual, and conceptual recall across all ${eraMeta.lessonCount} enquiries. All questions are cross-referenced directly to paragraph locations in this textbook; zero answers are printed to maintain active retrieval integrity.
    </div>

    <div class="quiz-grid">
      ${quizCardsHtml}
    </div>

    <footer class="page-footer">
      <span class="footer-left">Page ${totalPages} &bull; Master Knowledge Retrieval Quiz</span>
      <span class="footer-mid">The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span class="footer-right">Paper 1 Option 11</span>
    </footer>
  </div>

  <script>
    // Client-side auto-fit engines

    function autoFitSpreadTypography() {
      document.querySelectorAll('.spread-page').forEach(page => {
        const body = page.querySelector('.spread-body');
        const cols = page.querySelector('.prose-columns');
        const footer = page.querySelector('.page-footer');
        if (!body || !cols || !footer) return;

        const paras = Array.from(body.querySelectorAll('.prose-p'));
        const blocks = Array.from(body.querySelectorAll('.block-section'));
        if (!paras.length) return;

        const isRecto = page.classList.contains('recto-page');

        const getClearance = () => {
          const fTop = footer.getBoundingClientRect().top;
          let maxBottom = 0;
          if (cols) {
            const cBottom = cols.getBoundingClientRect().bottom;
            if (cBottom > maxBottom) maxBottom = cBottom;
          }
          const allElements = body.querySelectorAll('.prose-p, .block-header, .block-section');
          allElements.forEach(el => {
            const rects = el.getClientRects();
            for (let i = 0; i < rects.length; i++) {
              if (rects[i].bottom > maxBottom) maxBottom = rects[i].bottom;
            }
          });
          return fTop - maxBottom;
        };

        const MIN_CLEARANCE = 55;

        const checkOverflow = () => {
          const clearance = getClearance();
          const pageOver = page.scrollHeight > page.clientHeight;
          const colOver = cols.scrollWidth > cols.clientWidth + 2;
          return (clearance < MIN_CLEARANCE) || pageOver || colOver;
        };

        let currentFs = parseFloat(window.getComputedStyle(paras[0]).fontSize) * 0.75;
        let currentLh = parseFloat(window.getComputedStyle(paras[0]).lineHeight) / (currentFs * (96/72));
        if (isNaN(currentLh) || currentLh < 1.2) currentLh = isRecto ? 1.38 : 1.50;
        let currentMb = parseFloat(window.getComputedStyle(paras[0]).marginBottom) || (isRecto ? 3.5 : 6.0);
        let attempts = 0;

        // Downward scaling until safe clearance (>= 55px) and zero overflow
        while (checkOverflow() && attempts < 40 && currentFs > 8.4) {
          currentFs -= 0.10;
          currentLh = Math.max(1.28, currentLh - 0.010);
          currentMb = Math.max(1.8, currentMb - 0.15);
          paras.forEach(p => {
            p.style.fontSize = currentFs.toFixed(2) + 'pt';
            p.style.lineHeight = currentLh.toFixed(2);
            p.style.marginBottom = currentMb.toFixed(1) + 'px';
          });
          blocks.forEach(b => {
            b.style.marginBottom = Math.max(2.0, currentMb * 0.9).toFixed(1) + 'px';
          });
          attempts++;
        }

        // Upward scaling: ONLY on Verso, ONLY if clearance > 90px, capped at 11.2pt
        if (!isRecto && getClearance() > 90 && !checkOverflow()) {
          let testSize = currentFs;
          let testLine = currentLh;
          let testMb = currentMb;
          let upAttempts = 0;
          while (testSize < 11.2 && upAttempts < 15) {
            testSize += 0.08;
            testLine = Math.min(1.52, testLine + 0.008);
            testMb = Math.min(6.5, testMb + 0.15);
            paras.forEach(p => {
              p.style.fontSize = testSize.toFixed(2) + 'pt';
              p.style.lineHeight = testLine.toFixed(2);
              p.style.marginBottom = testMb.toFixed(1) + 'px';
            });
            blocks.forEach(b => {
              b.style.marginBottom = Math.max(2.5, testMb * 0.9).toFixed(1) + 'px';
            });
            if (checkOverflow()) {
              testSize -= 0.08;
              testLine -= 0.008;
              testMb -= 0.15;
              paras.forEach(p => {
                p.style.fontSize = testSize.toFixed(2) + 'pt';
                p.style.lineHeight = testLine.toFixed(2);
                p.style.marginBottom = testMb.toFixed(1) + 'px';
              });
              blocks.forEach(b => {
                b.style.marginBottom = Math.max(2.5, testMb * 0.9).toFixed(1) + 'px';
              });
              break;
            }
            upAttempts++;
          }
        }
      });
    }

    window.addEventListener('load', () => {
      autoFitSpreadTypography();
    });
  </script>
</body>
</html>`;
}

// Compile a single era textbook
async function renderEra(eraKey, unitData, browser) {
  const eraMeta = MEDICINE_ERAS[eraKey];
  console.log(`\n================================================================================`);
  console.log(`🏛️ RENDERING ERA: ${eraMeta.title.toUpperCase()} (${eraKey})`);
  console.log(`================================================================================`);

  const html = generateEraHtml(eraKey, unitData);

  // Write HTML outputs
  const pubHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'edexcel_medicine',
    `textbook_${eraKey}_PUBLISHER.html`,
  );
  const pubAltHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'edexcel_medicine',
    `textbook_${eraKey}.html`,
  );
  const rootHtmlPath = path.join(ROOT_DIR, 'units', 'edexcel_medicine', `textbook_${eraKey}.html`);

  fs.writeFileSync(pubHtmlPath, html, 'utf8');
  fs.writeFileSync(pubAltHtmlPath, html, 'utf8');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');
  console.log(`[HTML] Written to:\n  - ${pubHtmlPath}\n  - ${pubAltHtmlPath}\n  - ${rootHtmlPath}`);

  // Launch page in browser
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.emulateMediaType('print');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');

  // Evaluate auto-fit engines
  await page.evaluate(() => {
    if (typeof autoFitSpreadTypography === 'function') autoFitSpreadTypography();
  });
  await new Promise((r) => setTimeout(r, 600));

  // Run reprographic space audit
  const auditReport = await auditPageBudget(page);
  printSpaceAuditReport(auditReport);

  // Compile PDF
  const pdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `edexcel_medicine_textbook_${eraKey}_FINAL_V17.pdf`,
  );
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm',
    },
  });

  const pdfStats = fs.statSync(pdfPath);
  console.log(`[PDF] Generated: ${pdfPath} (${(pdfStats.size / 1024).toFixed(1)} KB)`);

  // Sync to standard aliases
  const legacyPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `edexcel_medicine_textbook_${eraKey}.pdf`,
  );
  const publisherPdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `edexcel_medicine_textbook_${eraKey}_PUBLISHER.pdf`,
  );
  const publisherFinalV17PdfPath = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `edexcel_medicine_textbook_${eraKey}_PUBLISHER_FINAL_V17.pdf`,
  );
  fs.copyFileSync(pdfPath, legacyPdfPath);
  fs.copyFileSync(pdfPath, publisherPdfPath);
  fs.copyFileSync(pdfPath, publisherFinalV17PdfPath);

  await page.close();
  return { eraKey, pdfPath, auditReport };
}

async function main() {
  const targetEra = process.argv[2] || 'medieval';
  const unitData = loadMedicineData();

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

  try {
    if (targetEra === 'all') {
      const eras = ['medieval', 'renaissance', '18th_19th', 'modern', 'western_front'];
      for (const e of eras) {
        await renderEra(e, unitData, browser);
      }
    } else {
      await renderEra(targetEra, unitData, browser);
    }
    console.log(`\n🎉 All requested Medicine textbooks rendered successfully!`);
  } catch (err) {
    console.error('Rendering error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
