/**
 * History Revision Hub — GCSE Weimar and Nazi Germany Master Textbook Engine
 *
 * Compiles companion dual-column Master Revision Guides & Textbooks
 * for Key Topics 1 to 4 using Christine Counsell 4-Act enquiries.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'images', 'weimar_individuals', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'weimar_nazi_germany', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

function getLessonSections(lesson, idx) {
  const blocks = (lesson.narrative_blocks || []).filter(
    (b) =>
      b &&
      b.title !== 'Consolidation Task' &&
      b.theme_heading !== 'Consolidation Task' &&
      b.heading !== 'Consolidation Task',
  );

  const extractTitle = (b, fallback) => {
    if (!b) return fallback;
    if (b.theme_heading) return b.theme_heading;
    if (b.title) return b.title;
    if (b.heading) return b.heading;
    if (b.text) {
      const m = b.text.match(/^\*\*([^*]+)\*\*/);
      if (m) return m[1];
    }
    return fallback;
  };

  if (blocks.length === 4) {
    return blocks.map((b, i) => ({
      title: extractTitle(b, `Act ${i + 1}`),
      text: b.text || b.content || '',
    }));
  }

  const n = blocks.length;
  const q1 = blocks.slice(0, Math.ceil(n / 4));
  const q2 = blocks.slice(Math.ceil(n / 4), Math.ceil(n / 2));
  const q3 = blocks.slice(Math.ceil(n / 2), Math.ceil((3 * n) / 4));
  const q4 = blocks.slice(Math.ceil((3 * n) / 4));

  const formatQuarter = (quarter, fallbackTitle) => {
    const title = extractTitle(quarter[0], fallbackTitle);
    const paras = quarter.map((b) => b.text || b.content || '').filter(Boolean);
    return {
      title,
      text: paras.join('\n\n'),
    };
  };

  return [
    formatQuarter(q1, 'Act 1: Context & Catalyst'),
    formatQuarter(q2, 'Act 2: Escalation & Conflict'),
    formatQuarter(q3, 'Act 3: Forensic Archival Evidence'),
    formatQuarter(q4, 'Act 4: The Historical Verdict'),
  ];
}

async function buildPublisherTextbookHtml(targetKt = 'kt1') {
  const ktLower = targetKt.toLowerCase();
  let getKtData;
  try {
    getKtData = require(`./weimar_textbook_data_${ktLower}.cjs`);
  } catch (e) {
    console.error(`Failed to load data module for ${targetKt}:`, e.message);
    process.exit(1);
  }

  const ktData = getKtData({ getBase64Image });
  const {
    coverConfig,
    componentBank,
    leftSources,
    leftVocab,
    backCoverData,
    paragraphEnrichments,
  } = ktData;

  let lessonSliceStart = 0;
  if (ktLower === 'kt2') lessonSliceStart = 4;
  else if (ktLower === 'kt3') lessonSliceStart = 8;
  else if (ktLower === 'kt4') lessonSliceStart = 12;

  const targetLessons = unitData.lessons.slice(lessonSliceStart, lessonSliceStart + 4);

  let lessonsHtml = '';

  targetLessons.forEach((lesson, idx) => {
    const lessonNum = idx + 1;
    const leftPageNum = lessonNum * 2;
    const rightPageNum = lessonNum * 2 + 1;
    const bankKey = `p${rightPageNum}`;
    const leftVocabKey = `p${leftPageNum}`;
    const leftSrcKey = `p${leftPageNum}`;
    const bank = componentBank[bankKey] || {};
    const vocabTerms = leftVocab[leftVocabKey] || [];
    const sources = leftSources[leftSrcKey] || {};

    const secList = getLessonSections(lesson, idx);
    const sec1 = secList[0];
    const sec2 = secList[1];
    const sec3 = secList[2];
    const sec4 = secList[3];

    const formatBlockParas = (block, secNum, lessonIndex = 0) => {
      if (!block || !block.text) {
        return `<p class="narrative-p"><span class="para-ref">[${secNum}.1]</span>Historical analysis examining key archival mechanisms and political developments during this phase.</p>`;
      }
      const raw = block.text;
      let paras = [];
      if (Array.isArray(raw)) {
        paras = [...raw];
      } else if (raw.includes('<br><br>')) {
        paras = raw
          .split('<br><br>')
          .map((p) => p.trim())
          .filter(Boolean);
      } else {
        paras = String(raw)
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);
      }

      if (paragraphEnrichments && typeof paragraphEnrichments.enrichParas === 'function') {
        paras = paragraphEnrichments.enrichParas(lessonIndex, secNum, paras);
      }

      return paras
        .map((p, pIdx) => {
          if (p.includes('<table') || p.includes('styled-table')) {
            if (coverConfig.ktId === 'KT1' && lessonIndex === 0) {
              return `
                <div class="analytical-matrix-card">
                  <div class="amc-header">THE WEIMAR CONSTITUTION: STRENGTHS VS FATAL WEAKNESSES</div>
                  <div class="amc-item">
                    <div class="amc-badge">DEMOCRACY</div>
                    <div class="amc-body">
                      <p><strong>Universal Suffrage:</strong> Men and women over 20 gained the vote; direct proportional representation gave every vote equal weight.</p>
                      <p><strong>Fatal Flaw:</strong> PR fragmented the Reichstag into dozens of splinter parties; no party ever won a majority, causing 20 coalition collapses.</p>
                    </div>
                  </div>
                  <div class="amc-item">
                    <div class="amc-badge">EXECUTIVE</div>
                    <div class="amc-body">
                      <p><strong>Checks &amp; Balances:</strong> President, Chancellor, and Reichstag balanced powers; 18 <em>Länder</em> preserved regional self-government.</p>
                      <p><strong>Fatal Flaw:</strong> Article 48 gave the President power to suspend civil rights and rule by decree, creating a constitutional route to dictatorship.</p>
                    </div>
                  </div>
                  <div class="amc-item">
                    <div class="amc-badge">FEDERALISM</div>
                    <div class="amc-body">
                      <p><strong>Regional Autonomy:</strong> The 18 <em>Länder</em> controlled local police, schools, and justice, preventing dictatorial centralisation in Berlin.</p>
                      <p><strong>Fatal Flaw:</strong> Nationalist regional governments (e.g. Bavaria) frequently defied Berlin, providing safe havens for right-wing paramilitaries.</p>
                    </div>
                  </div>
                  <div class="amc-item">
                    <div class="amc-badge">CIVIL RIGHTS</div>
                    <div class="amc-body">
                      <p><strong>Progressive Charter:</strong> Guaranteed freedom of speech, assembly, and religious belief, with equal rights enshrined in law.</p>
                      <p><strong>Fatal Flaw:</strong> The Republic failed to reform the imperial civil service and judiciary, leaving anti-democratic judges to subvert the rule of law.</p>
                    </div>
                  </div>
                </div>
              `;
            }
            if (coverConfig.ktId === 'KT1' && lessonIndex === 3) {
              return `
                <div class="analytical-matrix-card">
                  <div class="amc-header">WOMEN IN WEIMAR GERMANY: PROGRESS VS THE TRADITIONAL REALITY</div>
                  <div class="amc-item">
                    <div class="amc-badge">POLITICS</div>
                    <div class="amc-body">
                      <p><strong>Progress:</strong> Women over 20 gained the right to vote; by 1926, 32 female deputies sat in the Reichstag—a higher proportion than in Britain or the USA.</p>
                      <p><strong>Limitation:</strong> Zero female cabinet ministers were ever appointed; women rarely held executive leadership in political parties.</p>
                    </div>
                  </div>
                  <div class="amc-item">
                    <div class="amc-badge">WORK</div>
                    <div class="amc-body">
                      <p><strong>Progress:</strong> 100,000 female teachers and 3,000 doctors by 1933; equal civil service pay was enshrined in Article 109.</p>
                      <p><strong>Limitation:</strong> Demobilised men reclaimed better-paid industrial jobs; married working women were attacked as 'double-earners' stealing men's jobs.</p>
                    </div>
                  </div>
                  <div class="amc-item">
                    <div class="amc-badge">LEISURE</div>
                    <div class="amc-body">
                      <p><strong>Progress:</strong> The 'New Woman'—young, financially independent city women with bobbed hair, modern fashion, smoking, and unchaperoned nightlife.</p>
                      <p><strong>Limitation:</strong> Largely a media phenomenon concentrated in Berlin; in rural, traditional communities, patriarchal expectations persisted.</p>
                    </div>
                  </div>
                </div>
              `;
            }
          }

          if (p.includes('para-ref')) {
            return `<p class="narrative-p">${formatText(p)}</p>`;
          }
          return `<p class="narrative-p"><span class="para-ref">[${secNum}.${pIdx + 1}]</span>${formatText(p)}</p>`;
        })
        .join('');
    };

    const renderArchivalSourceBox = (src) => {
      if (!src) return '';
      if (src.text) {
        return `
          <div class="archival-source-box written-source-box">
            <div class="archival-header">
              <div class="source-identity">
                <span class="source-badge">${src.badge}</span>
                <span class="source-type">${src.type}</span>
              </div>
              ${src.date ? `<span class="source-date-micro">${src.date}</span>` : ''}
            </div>
            <div class="archival-title">${src.title}</div>
            <div class="archival-body">${src.text}</div>
            <div class="archival-context-box">
              <p class="archival-context-text">${src.context}</p>
              <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
            </div>
          </div>
        `;
      }
      if (src.image) {
        return `
          <div class="archival-source-box">
            <div class="archival-header">
              <div class="source-identity">
                <span class="source-badge">${src.badge}</span>
                <span class="source-type">${src.type}</span>
              </div>
              ${src.date ? `<span class="source-date-micro">${src.date}</span>` : ''}
            </div>
            <div class="archival-title">${src.title}</div>
            <img class="archival-image" src="${src.image}" alt="${src.title}">
            <div class="archival-context-box">
              <p class="archival-context-text">${src.context}</p>
              <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
            </div>
          </div>
        `;
      }
      return '';
    };

    // LEFT PAGE (Verso)
    lessonsHtml += `
    <!-- PAGE ${leftPageNum}: KT ${coverConfig.topicNumber}.${lessonNum} Left Page (Verso) -->
    <div class="textbook-page page a4-page" data-page="${leftPageNum}">
      <div class="page-inner">
        
        <div class="lesson-header">
          <div class="lesson-badge-strip">
            <span class="topic-badge">PEARSON EDEXCEL GCSE (9–1) &bull; PAPER 3 (1HI0/31)</span>
            <span class="spec-ref-badge">KEY TOPIC ${coverConfig.topicNumber} &bull; ENQUIRY ${lessonNum} OF 4</span>
          </div>
          <h2 class="lesson-title">${lesson.title}</h2>
          <div class="lesson-spec-anchor">
            <strong>Key Enquiry:</strong> ${lesson.enquiry || lesson.title} &bull; <em>Sections 1 &amp; 2: Context, Catalysts &amp; Primary Evidence</em>
          </div>
        </div>

        <div class="two-column-prose">
          
          <div class="section-banner">
            <span class="sb-num">ACT 1</span>
            <span class="sb-title">${(sec1.title || 'Context & Catalyst').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec1, 1, idx)}

          ${renderArchivalSourceBox(sources.sourceA)}

          <div class="section-banner">
            <span class="sb-num">ACT 2</span>
            <span class="sb-title">${(sec2.title || 'Escalation & Conflict').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec2, 2, idx)}

          ${renderArchivalSourceBox(sources.sourceB)}

        </div>

        <div class="bottom-vocab-box">
          <div class="bvb-header">
            <span class="bvb-title">CORE DISCIPLINARY TERMINOLOGY &bull; ENQUIRY ${coverConfig.topicNumber}.${lessonNum}</span>
            <span class="bvb-badge">EDEXCEL PAPER 3 VOCABULARY</span>
          </div>
          <div class="bvb-grid">
            ${vocabTerms
              .map(
                (v) => `
              <div class="bvb-col">
                <strong>${v.term}</strong>
                ${v.def}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div class="page-footer">
          <span>Weimar &amp; Nazi Germany (1918–1939) &bull; Key Topic ${coverConfig.topicNumber}: ${coverConfig.title.replace(/^KEY TOPIC \d+:\s*/, '')}</span>
          <span>Page ${leftPageNum}</span>
        </div>

      </div>
    </div>

    <!-- PAGE ${rightPageNum}: KT ${coverConfig.topicNumber}.${lessonNum} Right Page (Recto) -->
    <div class="textbook-page page a4-page" data-page="${rightPageNum}">
      <div class="page-inner">
        
        <div class="right-page-header">
          <div class="rph-meta">
            <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; EDEXCEL PAPER 3</span>
            <span class="rph-lesson">ENQUIRY ${coverConfig.topicNumber}.${lessonNum}: ACTS 3 &amp; 4</span>
          </div>
          <h3 class="rph-title">${lesson.title}</h3>
        </div>

        <div class="two-column-prose">
          
          <div class="section-banner">
            <span class="sb-num">ACT 3</span>
            <span class="sb-title">${(sec3.title || 'Forensic Archival Evidence').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec3, 3, idx)}

          ${
            bank.keyFigure
              ? `
          <div class="key-figure-box">
            <div class="kf-header">
              <span class="kf-tag">KEY HISTORICAL INDIVIDUAL</span>
              <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
            </div>
            <div class="kf-identity-row">
              ${bank.keyFigure.image ? `<img class="kf-portrait" src="${bank.keyFigure.image}" alt="${bank.keyFigure.name}">` : ''}
              <div class="kf-identity-text">
                <div class="kf-name">${bank.keyFigure.name}</div>
                <div class="kf-role">${bank.keyFigure.role}</div>
              </div>
            </div>
            <div class="kf-significance">${bank.keyFigure.significance}</div>
            <div class="kf-actions-title">DECISIVE ACTIONS:</div>
            <ul class="kf-actions-list">
              ${bank.keyFigure.actions.map((a) => `<li>${a}</li>`).join('')}
            </ul>
          </div>`
              : ''
          }

          <div class="section-banner">
            <span class="sb-num">ACT 4</span>
            <span class="sb-title">${(sec4.title || 'The Historical Verdict & Historiographical Debate').replace(/^Act\s*\d+:\s*/i, '').replace(/^\d+\.\s*/, '')}</span>
          </div>
          ${formatBlockParas(sec4, 4, idx)}

          ${bank.conceptSpotlight || ''}

          ${bank.archivalDispatch || ''}

          ${bank.academicDebate || ''}

        </div>

        ${
          bank.bottomEnquiry
            ? `
        <div class="bottom-enquiry-box">
          <div class="beb-header">
            <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT</span>
            <span class="beb-badge">ENQUIRY ${coverConfig.topicNumber}.${lessonNum} SYNTHESIS</span>
          </div>
          <div class="beb-grid">
            <div class="beb-col">
              <strong>1. Knowledge Recall &amp; Evidence:</strong>
              ${bank.bottomEnquiry.q1}
            </div>
            <div class="beb-col">
              <strong>2. Causal Analysis (PEEL):</strong>
              ${bank.bottomEnquiry.q2}
            </div>
            <div class="beb-col">
              <strong>3. Historical Evaluation &amp; Debate:</strong>
              ${bank.bottomEnquiry.q3}
            </div>
          </div>
        </div>`
            : ''
        }

        <div class="page-footer">
          <span>Weimar &amp; Nazi Germany (1918–1939) &bull; Key Topic ${coverConfig.topicNumber}: ${coverConfig.title.replace(/^KEY TOPIC \d+:\s*/, '')}</span>
          <span>Page ${rightPageNum}</span>
        </div>

      </div>
    </div>
    `;
  });

  const qrCardsHtml = backCoverData.quizzes
    .map(
      (l) => `
    <div class="bqr-card">
      <div class="bqr-header">
        <span class="bqr-num">${l.code || l.num}</span>
        <span class="bqr-title">${l.title}</span>
      </div>
      <div class="bqr-code-box">
        ${generateQrSvg(l.url)}
      </div>
      <div class="bqr-footer">Interactive Hub &bull; Quiz</div>
    </div>
  `,
    )
    .join('');

  const coverImgData =
    getBase64Image(coverConfig.coverImage) ||
    getBase64Image(coverConfig.coverImage?.replace(/\.png$/, '.jpg'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weimar &amp; Nazi Germany (1918–1939) — Key Topic ${coverConfig.topicNumber} Master Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.35pt;
      line-height: 1.44;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 10mm 12mm 8mm 12mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    @media print {
      body { background: #ffffff; }
      .textbook-page { margin: 0; }
    }

    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Lesson Header */
    .lesson-header {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.6pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 1px 0;
      line-height: 1.15;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.25;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 1.5px 5px;
      border-radius: 0 2px 2px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-lesson { color: #64748b; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }

    /* 2-Column Reading Measure */
    .two-column-prose {
      column-count: 2;
      column-gap: 14px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
    }

    .section-banner {
      column-span: all;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      border-bottom: 1px solid #e2e8f0;
      padding: 2px 5px;
      border-radius: 0 2px 2px 0;
      margin: 4px 0 2px 0;
      display: flex;
      align-items: center;
      gap: 5px;
      font-family: 'Inter', sans-serif;
    }
    .sb-num {
      font-size: 6.0pt;
      font-weight: 900;
      color: #1e3a8a;
      background: #dbeafe;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .sb-title {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 4px 0;
      text-indent: 0.9em;
    }
    .narrative-p:first-of-type, .section-banner + .narrative-p {
      text-indent: 0;
    }

    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 3px;
      border-radius: 2px;
      margin-right: 3px;
      vertical-align: baseline;
      letter-spacing: 0.02em;
    }

    
    /* Analytical Matrix Card (Page 8 Comparison) */
    .analytical-matrix-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3px solid #1e3a8a;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 4px 0;
      break-inside: avoid;
      font-size: 7.6pt;
      line-height: 1.25;
    }
    .amc-header {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .amc-item {
      margin-bottom: 3px;
      padding-bottom: 2px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .amc-item:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    .amc-badge {
      display: inline-block;
      background: #1e3a8a;
      color: #ffffff;
      font-size: 5.8pt;
      font-weight: 800;
      padding: 0.5px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      margin-bottom: 1px;
    }
    .amc-body p {
      margin: 1px 0;
    }

    /* Cover Header Meta Strip */
    .cover-top-header {
      margin-bottom: 4px;
    }
    .cover-header-meta {
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
    }
    .chm-spec {
      font-size: 7.6pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      text-transform: uppercase;
    }
    .chm-code {
      font-size: 7.4pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
    }
    .cover-topic-title {
      font-family: 'Inter', sans-serif;
      font-size: 11pt;
      font-weight: 800;
      color: #1e3a8a;
      margin: 1px 0 2px 0;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .cover-sub-bar {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 700;
      color: #475569;
      display: flex;
      justify-content: space-between;
    }

    /* Verbatim Specification Checklist Box (Matching Middle East) */
    .cover-spec-checklist-box {
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      padding: 5px 8px;
      background: #ffffff;
      font-family: 'Inter', sans-serif;
      margin-top: 4px;
    }
    .cscb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 4px;
    }
    .cscb-title {
      font-size: 7.8pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .cscb-subtitle {
      font-size: 6.8pt;
      font-weight: 700;
      color: #475569;
    }
    .cscb-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      font-size: 6.5pt;
      line-height: 1.22;
      color: #1e293b;
    }
    .cscb-col {
      border-right: 1px solid #e2e8f0;
      padding-right: 5px;
    }
    .cscb-topic-title {
      font-size: 7.2pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      margin-bottom: 3px;
      border-bottom: 1px solid #1e3a8a;
      padding-bottom: 1px;
    }
    .cscb-item {
      display: flex;
      gap: 3px;
      align-items: flex-start;
      margin-bottom: 2.5px;
    }
    .cscb-bullet {
      display: inline-block;
      color: #1e3a8a;
      font-size: 7.5pt;
      line-height: 1;
      flex-shrink: 0;
      margin-top: -1px;
    }

    /* Archival Source Box */
    .archival-source-box {
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #78716c;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .source-badge {
      font-size: 5.8pt;
      font-weight: 900;
      color: #fff;
      background: #0f172a;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 5.8pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 3px;
    }
    .source-date-micro {
      font-size: 5.6pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      max-height: 110px;
      object-fit: contain;
      border-radius: 2px;
      margin-bottom: 2px;
      display: block;
      background: #fafaf9;
    }
    .archival-body {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #292524;
      font-style: italic;
      margin-bottom: 2px;
    }
    .written-source-box .archival-body {
      background: #fafaf9;
      border-left: 2px solid #78716c;
      padding: 3px 5px;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.0pt;
      line-height: 1.26;
      color: #1c1917;
      font-style: italic;
      margin-bottom: 2px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 2.5px 4.5px;
      margin: 2px 0 1px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #334155;
      margin: 0 0 1px 0;
    }
    .archival-hinge-q {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #0f172a;
      background: #f0f9ff;
      padding: 1.5px 3.5px;
      border-radius: 2px;
      margin-top: 1px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 5.4pt;
      letter-spacing: 0.03em;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 4px 7px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .kf-tag {
      font-size: 5.8pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kf-lifespan {
      font-size: 5.6pt;
      color: #64748b;
      font-weight: 600;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 2px;
    }
    .kf-portrait {
      width: 40px;
      height: 48px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kf-identity-text { flex: 1; }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.12;
    }
    .kf-role {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      line-height: 1.15;
    }
    .kf-significance {
      font-size: 7.0pt;
      font-style: italic;
      color: #334155;
      line-height: 1.25;
      margin-bottom: 2px;
    }
    .kf-actions-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      margin: 1.5px 0 1px 0;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      line-height: 1.24;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 4px 7px;
      margin: 4px 0;
      break-inside: avoid;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
      border-bottom: 1px solid #ffedd5;
      padding-bottom: 1px;
      font-family: 'Inter', sans-serif;
    }
    .csb-tag {
      font-size: 5.8pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 5.4pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 1px 0;
      line-height: 1.12;
    }
    .csb-body {
      font-size: 7.1pt;
      line-height: 1.28;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .csb-takeaway {
      font-family: 'Inter', sans-serif;
      font-size: 6.0pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 1.5px 4.5px;
      border-radius: 0 2px 2px 0;
    }

    /* Bottom Decks */
    .bottom-vocab-box, .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 1px;
      padding: 6px 8px;
      border-radius: 3px;
      font-family: 'Inter', sans-serif;
    }
    .bottom-vocab-box {
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-top: 2.5px solid #b45309;
    }
    .bvb-header, .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
    }
    .bvb-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.4pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.4pt;
      line-height: 1.25;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 5.8pt;
    }

    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
    }
    .beb-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      font-size: 6.4pt;
      line-height: 1.26;
      color: #334155;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Cover Page */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 10px 14px 2px 14px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 10px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      line-height: 1.1;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 10.0pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 8px;
    }
    .cover-plate-frame {
      border: 1px solid #cbd5e1;
      padding: 3px;
      background: #ffffff;
      margin-bottom: 6px;
    }
    .cover-plate-img {
      width: 100%;
      height: 172mm;
      object-fit: cover;
      object-position: center 35%;
      display: block;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      color: #64748b;
      margin-top: 2px;
      text-align: right;
      display: flex;
      justify-content: space-between;
    }
    .cover-enquiry-box {
      background: #f8fafc;
      border: 1.5px solid #1e3a8a;
      border-left: 4px solid #1e3a8a;
      padding: 5px 8px;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.4pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.6pt;
      margin-top: 3px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 4.5px 6px;
      text-align: left;
      font-weight: 800;
      font-size: 6.4pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 5px 6px;
      color: #334155;
    }
    .cover-matrix-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.4pt;
      color: #475569;
      font-weight: 700;
    }

    /* Master Back Cover Architecture */
    .back-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 14px 18px 12px 18px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .back-body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
    }
    
    /* Historiographical Debate Box */
    .historiography-box {
      background: #fafaf9;
      border: 1.2px solid #e7e5e4;
      border-left: 3.5px solid #78350f;
      padding: 4px 6px;
      margin-bottom: 5px;
      font-family: 'Inter', sans-serif;
      box-sizing: border-box;
    }
    .hb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3px;
      border-bottom: 1px solid #e7e5e4;
      padding-bottom: 1.5px;
    }
    .hb-tag {
      font-size: 5.6pt;
      font-weight: 900;
      color: #78350f;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .hb-focus {
      font-size: 5.4pt;
      font-weight: 700;
      color: #a8a29e;
      text-transform: uppercase;
    }
    .hb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .hb-col {
      font-size: 6.2pt;
      line-height: 1.25;
      color: #292524;
    }
    .hb-col strong {
      display: block;
      color: #451a03;
      font-size: 6.0pt;
      margin-bottom: 1px;
    }
    .hb-col p {
      margin: 0;
      font-style: italic;
    }

    .back-header-strip {
      text-align: center;
      margin-bottom: 4px;
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 4px;
    }
    .back-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0;
      line-height: 1.15;
      letter-spacing: 0.02em;
    }
    .back-subtitle {
      font-size: 7.2pt;
      color: #475569;
      margin-top: 1.5px;
      font-style: italic;
      font-weight: 500;
    }
    .back-section-title {
      font-size: 7.8pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      margin: 0 0 3px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .back-section-tag {
      font-size: 6.0pt;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 0.03em;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.8pt;
      line-height: 1.34;
    }
    .bt-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 6.5px 7px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #1e3a8a; font-weight: 800; }
    
    .back-main-matrix-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-size: 6.8pt;
      line-height: 1.34;
    }
    .bmm-col {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 8px 8px;
      border-radius: 2px;
    }
    .bmm-col strong {
      display: block;
      color: #1e3a8a;
      text-transform: uppercase;
      font-size: 6.8pt;
      font-weight: 800;
      margin-bottom: 2px;
    }

    /* Back Cover Synoptic Verdict Grid */
    .back-verdict-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.8pt;
      line-height: 1.34;
    }
    .bvg-col {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #0f172a;
      padding: 8px 8px;
      border-radius: 2px;
      color: #334155;
    }
    .bvg-col strong {
      display: block;
      color: #0f172a;
      text-transform: uppercase;
      font-size: 6.8pt;
      font-weight: 800;
      margin-bottom: 2px;
    }

    .back-qr-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 2px;
    }
    .bqr-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 9px 6px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .bqr-header {
      width: 100%;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 2px;
    }
    .bqr-num {
      display: block;
      font-size: 6.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
    }
    .bqr-title {
      font-size: 6.2pt;
      color: #475569;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    .bqr-code-box {
      width: 62px;
      height: 62px;
      margin: 4px 0;
    }
    .bqr-footer {
      font-size: 5.6pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- ===================================================================== -->
  <!-- PAGE 1: MASTER FRONT COVER                                            -->
  <!-- ===================================================================== -->
  <div class="textbook-page page a4-page" data-page="1">
    <div class="cover-container">
      
      <!-- 1. TOP HEADER STRIP & MAIN TITLE -->
      <div class="cover-top-header">
        <div class="cover-header-meta">
          <span class="chm-spec">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION 31</span>
          <span class="chm-code">1HI0/31 &bull; Master Textbook Series</span>
        </div>
        <h1 class="cover-main-title">Weimar and Nazi Germany, 1918–1939</h1>
        <div class="cover-topic-title">Key Topic ${coverConfig.topicNumber}: ${coverConfig.title}</div>
        <div class="cover-sub-bar">
          <span>Student Master Textbook &bull; Core Knowledge, Disciplinary Enquiries &amp; Archival Evidence</span>
        </div>
      </div>

      <!-- 2. ARCHIVAL PRIMARY PLATE -->
      <div class="cover-plate-frame">
        ${coverImgData ? `<img class="cover-plate-img" src="${coverImgData}" alt="${coverConfig.title}">` : ''}
        <div class="cover-plate-caption">
          <span>${coverConfig.caption}</span>
          <span>Historical Primary Photograph</span>
        </div>
      </div>

      <!-- 4. OFFICIAL PEARSON SPECIFICATION OVERVIEW & SYLLABUS MAPPING -->
      <div class="cover-spec-checklist-box">
        <div class="cscb-header">
          <span class="cscb-title">Official Pearson Edexcel GCSE Specification Structure &amp; Syllabus Mapping (Option 31: KT${coverConfig.topicNumber})</span>
          <span class="cscb-subtitle">Core syllabus coverage across all four key enquiries:</span>
        </div>
        <div class="cscb-grid">
          ${coverConfig.specTopics
            .map(
              (top, i) => `
            <div class="cscb-col" ${i === 3 ? 'style="border-right: none;"' : ''}>
              <div class="cscb-topic-title">${top.num}. ${top.title.replace(/^\d+\.\s*/, '')}</div>
              ${top.bullets
                .map(
                  (b) => `
                <div class="cscb-item">
                  <span class="cscb-bullet">&bull;</span>
                  <span>${b}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- 5. COVER FOOTER (Strict Institutional Neutrality) -->
      <div class="cover-footer">
        <span>The History Revision Hub &bull; GCSE History Department</span>
        <span>Key Topic ${coverConfig.topicNumber} Master Textbook &bull; Page 1</span>
      </div>

    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- PAGES 2–9: THE 4 CORE ENQUIRIES                                       -->
  <!-- ===================================================================== -->
  ${lessonsHtml}

  <!-- ===================================================================== -->
  <!-- PAGE 10: MASTER REVISION BACK COVER                                   -->
  <!-- ===================================================================== -->
  <div class="textbook-page page a4-page" data-page="10">
    <div class="back-container">
      
      <div class="back-header-strip">
        <h2 class="back-title">Key Topic ${coverConfig.topicNumber} Revision Spine: Core Knowledge &amp; Exam Strategy</h2>
        <div class="back-subtitle">${coverConfig.subtitle}</div>
      </div>

      <div class="back-body-content">
        
        <!-- 1. Chronological Sequence -->
        <div>
          <div class="back-section-title">
            <span>1. Key Chronology &bull; Causal Turning Points</span>
            <span class="back-section-tag">KEY CHRONOLOGY</span>
          </div>
          <div class="back-timeline-grid">
            ${(backCoverData.timelineCards || backCoverData.timeline || [])
              .map((t) => {
                if (typeof t === 'string') return `<div class="bt-card">${t}</div>`;
                return `<div class="bt-card"><strong>${t.date ? `${t.date}: ` : ''}${t.title}:</strong> ${t.body || t.event || ''}</div>`;
              })
              .join('')}
          </div>
        </div>

        <!-- 2. Four Disciplinary Pillars Matrix -->
        <div>
          <div class="back-section-title">
            <span>2. Core Specification Themes</span>
            <span class="back-section-tag">SPECIFICATION REVIEW</span>
          </div>
          <div class="back-main-matrix-grid">
            ${backCoverData.pillars
              .map(
                (p) => `
              <div class="bmm-col">
                <strong>${p.title}</strong>
                ${p.body}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- 3. Historiographical Debate & Exam Timing Matrix -->
        <div>
          <div class="back-section-title">
            <span>3. Historiographical Debate &amp; Edexcel Paper 3 Examination Strategy</span>
            <span class="back-section-tag">EXAM STRATEGY &bull; Q3(b,c,d)</span>
          </div>
          <div class="back-main-matrix-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 5px;">
            <div class="bmm-col">
              <strong>${backCoverData.historiographyDebate.interp1.title}</strong>
              ${backCoverData.historiographyDebate.interp1.text}
            </div>
            <div class="bmm-col">
              <strong>${backCoverData.historiographyDebate.interp2.title}</strong>
              ${backCoverData.historiographyDebate.interp2.text}
            </div>
          </div>
          
          <!-- Exam Timing & Mark Tariff Blueprint -->
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; text-align: center;">
            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 4.5px 3px; border-radius: 2px; font-size: 6.6pt; line-height: 1.25;">
              <strong style="display: block; color: #0f172a; font-size: 6.6pt;">Q1: INFERENCE [4m]</strong>
              <span>5 Mins &bull; 2 Inferences + Quotes</span>
            </div>
            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 4.5px 3px; border-radius: 2px; font-size: 6.6pt; line-height: 1.25;">
              <strong style="display: block; color: #0f172a; font-size: 6.6pt;">Q2: CAUSATION [12m]</strong>
              <span>15 Mins &bull; 3 PEEL Causal Factors</span>
            </div>
            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 4.5px 3px; border-radius: 2px; font-size: 6.6pt; line-height: 1.25;">
              <strong style="display: block; color: #0f172a; font-size: 6.6pt;">Q3(a): UTILITY [8m]</strong>
              <span>12 Mins &bull; Content, NOP &amp; Context</span>
            </div>
            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 4.5px 3px; border-radius: 2px; font-size: 6.6pt; line-height: 1.25;">
              <strong style="display: block; color: #0f172a; font-size: 6.6pt;">Q3(b/c): VIEWS [8m]</strong>
              <span>10 Mins &bull; Differences &amp; Reasons</span>
            </div>
            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-top: 2.5px solid #0f172a; padding: 4.5px 3px; border-radius: 2px; font-size: 6.6pt; line-height: 1.25;">
              <strong style="display: block; color: #0f172a; font-size: 6.6pt;">Q3(d): VERDICT [16+4m]</strong>
              <span>25 Mins &bull; Balanced Evaluation</span>
            </div>
          </div>
        </div>

        <!-- 4. Synoptic Historical Verdict & Thematic Synthesis -->
        <div>
          <div class="back-section-title">
            <span>4. Synoptic Assessment &bull; Historical Verdict</span>
            <span class="back-section-tag">EVALUATION &amp; SIGNIFICANCE</span>
          </div>
          <div class="back-verdict-grid">
            ${backCoverData.verdicts
              .map(
                (v) => `
              <div class="bvg-col">
                <strong>${v.title}</strong>
                ${v.body}
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- 5. Interactive Digital Quizzing Hub -->
        <div>
          <div class="back-section-title">
            <span>5. Interactive Quizzing Hub &bull; Scan with Smartphone Camera</span>
            <span class="back-section-tag">20-QUESTION PRACTICE QUIZZES</span>
          </div>
          <div class="back-qr-grid">
            ${qrCardsHtml}
          </div>
        </div>

      </div>

      <div class="cover-footer" style="margin-top: 4px;">
        <span>The History Revision Hub &bull; GCSE History Department</span>
        <span>Key Topic ${coverConfig.topicNumber} Master Textbook Complete &bull; Page 10</span>
      </div>

    </div>
  </div>

</body>
</html>`;
}

async function renderTextbookPdf(targetKt = 'kt1') {
  console.log(`=============================================================`);
  console.log(`📘 GENERATING MASTER TEXTBOOK: Weimar & Nazi Germany (${targetKt.toUpperCase()})`);
  console.log(`=============================================================`);

  const htmlContent = await buildPublisherTextbookHtml(targetKt);

  const htmlPathUnit = path.join(
    ROOT_DIR,
    'public',
    'units',
    'weimar_nazi_germany',
    `textbook_${targetKt.toUpperCase()}_PUBLISHER.html`,
  );
  const pdfPathUnit = path.join(
    ROOT_DIR,
    'public',
    'units',
    'weimar_nazi_germany',
    `textbook_${targetKt.toUpperCase()}_PUBLISHER.pdf`,
  );
  const pdfPathPdfs = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `weimar_nazi_germany_textbook_${targetKt.toUpperCase()}_PUBLISHER.pdf`,
  );

  fs.writeFileSync(htmlPathUnit, htmlContent, 'utf8');
  console.log(`✅ Saved HTML: ${htmlPathUnit}`);

  console.log(`🖨️ Compiling PDF with Puppeteer & Auditing Space Budget...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: ['load', 'networkidle0'] });

  // 1. Fast headless pre-flight test: check element heights and child utilization
  const preflightResults = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.textbook-page'));
    const warnings = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const inner = p.querySelector('.page-inner, .cover-container, .back-container');
      if (inner) {
        const innerH = inner.clientHeight;
        const children = Array.from(inner.children).filter(
          (c) => !['SCRIPT', 'STYLE', 'LINK'].includes(c.tagName) && c.clientHeight > 0,
        );
        const totalChildH = children.reduce((acc, c) => acc + c.offsetHeight, 0);
        const utilization = Math.min(100, Math.round((totalChildH / innerH) * 100));
        if (utilization < 85 && pageNum !== 1) {
          warnings.push({
            pageNum,
            utilization,
            message: `Page ${pageNum} child elements occupy ${utilization}% (< 85% allotted vertical budget)`,
          });
        }
      }
    });
    return warnings;
  });

  if (preflightResults.length > 0) {
    preflightResults.forEach((w) => {
      console.warn(`  ⚠️ Pre-Flight Height Warning: ${w.message}`);
    });
  } else {
    console.log(
      `  ✅ Pre-Flight Height Check Passed: All containers occupy >= 85% vertical budget.`,
    );
  }

  // 2. Run comprehensive automated page budget & clutter audit
  const auditResults = await auditPageBudget(page, {
    pageSelector: '.textbook-page, .page, .a4-page',
    maxPageHeightPx: 1123,
    underflowThresholdPx: 40,
    minUtilizationPct: 85,
    maxGapAboveFooterPx: 25,
    maxInterTaskGapPx: 35,
  });

  printSpaceAuditReport(auditResults, path.basename(htmlPathUnit));

  if (auditResults.hasErrors) {
    const errorDetails = auditResults.results
      .filter(
        (r) =>
          r.isOverflow ||
          r.isVoidBackCover ||
          r.isVoidSection ||
          r.isVoidInternalProse ||
          r.isVoidFooter ||
          r.isVoidInterTask ||
          r.isClutterError,
      )
      .map(
        (r) =>
          `Page ${r.pageNum}: ${[
            r.isOverflow ? `OVERFLOW (${r.overflow}px)` : '',
            r.isVoidBackCover ? `BACK COVER VOID (${r.backCoverBottomVoid}px)` : '',
            r.isVoidSection ? `SECTION GAP (${r.maxSectionGap}px)` : '',
            r.isVoidInternalProse ? `INTERNAL PROSE VOID (${r.internalProseGap}px)` : '',
            r.isVoidFooter ? `FOOTER VOID (${r.gapAboveFooter}px)` : '',
            r.isVoidInterTask ? `INTER-TASK VOID (${r.maxInterTaskGap}px)` : '',
            r.isClutterError ? `CLUTTER: ${r.clutterViolations.join(', ')}` : '',
          ]
            .filter(Boolean)
            .join(', ')}`,
      )
      .join('\n   ');

    console.error(
      `\n❌ CRITICAL LAYOUT AUDIT FAILURE in ${targetKt.toUpperCase()}:\n   ${errorDetails}\n`,
    );
    await browser.close();
    throw new Error(
      `Textbook compilation failed: Critical layout errors detected in ${targetKt.toUpperCase()}!`,
    );
  }

  await page.pdf({
    path: pdfPathUnit,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  fs.copyFileSync(pdfPathUnit, pdfPathPdfs);
  console.log(`✅ Compiled Master PDF: ${pdfPathUnit}`);
  console.log(`✅ Mirrored to Public PDFs: ${pdfPathPdfs}`);

  await browser.close();
}

async function run() {
  const arg = (process.argv[2] || 'all').toLowerCase();
  if (arg === 'all') {
    for (const kt of ['kt1', 'kt2', 'kt3', 'kt4']) {
      await renderTextbookPdf(kt);
    }
  } else if (['kt1', 'kt2', 'kt3', 'kt4'].includes(arg)) {
    await renderTextbookPdf(arg);
  } else {
    console.error(`Unknown argument: "${arg}". Use kt1, kt2, kt3, kt4, or all.`);
    process.exit(1);
  }
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error during textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = {
  buildPublisherTextbookHtml,
  renderTextbookPdf,
};
