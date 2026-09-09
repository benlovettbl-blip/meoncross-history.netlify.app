/**
 * generate_overdue_revision_sheets.cjs
 *
 * Automated Overdue Revision Sheet Generator
 * Generates print-ready 2-page A4 revision boosters for GCSE History cohorts:
 * - Year 10: Paper 3 Weimar & Nazi Germany (1HI0/31)
 * - Year 11: Paper 3 Conflict at Home & Abroad: the USA, 1954–75 (1HI0/33)
 * - Also supports Paper 1 Medicine, Paper 2 Elizabethan, and Paper 2 Middle East
 *
 * Output:
 * - public/revision_sheets/<filename>.html
 * - public/pdfs/<filename>.pdf (via Puppeteer)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DATA_DIR = path.join(ROOT_DIR, 'public', 'data');
const REVISION_SHEETS_DIR = path.join(ROOT_DIR, 'public', 'revision_sheets');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(REVISION_SHEETS_DIR)) {
  fs.mkdirSync(REVISION_SHEETS_DIR, { recursive: true });
}
if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

const CONFIGS = {
  weimar_nazi_germany: {
    unitId: 'weimar_nazi_germany',
    cohort: 'Year 10',
    title: 'Paper 3: Weimar and Nazi Germany, 1918–1939',
    paperCode: '1HI0/31',
    color: '#be123c',
    lightColor: '#ffe4e6',
    gradient: 'linear-gradient(135deg, #881337 0%, #be123c 100%)',
    trendFile: path.join(PUBLIC_DATA_DIR, 'weimar_nazi_germany_trend_analysis.json'),
    htmlFileName: 'year10_germany_overdue_booster.html',
    pdfFileName: 'year10_germany_overdue_booster.pdf',
    modelAnswerQuestion:
      'Explain why the Nazis were able to control religious groups in Germany in the years 1933–39. (12 marks)',
    modelAnswerContent: {
      intro:
        'The Nazi regime employed a two-pronged strategy of legal appeasement followed by systematic intimidation, censorship, and co-optation to neutralize Christian religious influence between 1933 and 1939.',
      point1:
        'Firstly, Hitler initially neutralized the Roman Catholic Church through diplomacy. In July 1933, the Nazis signed the Concordat (Reichskonkordat) with Pope Pius XI, promising not to interfere in Catholic youth organizations and schools provided the Church remained out of politics. However, once his power was consolidated, Hitler systematically broke this treaty by closing Catholic youth leagues, shutting down Catholic schools, and arresting priests on fabricated currency smuggling and immorality charges. When Pope Pius XI issued the encyclical "Mit Brennender Sorge" (With Burning Concern) in 1937 condemning Nazi racism and paganism, the Gestapo seized all copies and intensified the persecution of Catholic clergy, effectively silencing open opposition.',
      point2:
        'Secondly, the Nazis attempted to unify and control Protestant Christians by creating a coordinated state church. In 1933, the German Evangelical Church was consolidated into the Reich Church under the leadership of Nazi-appointed Reich Bishop Ludwig Müller. Pastors who joined the "German Christians" movement wore Nazi uniforms and placed swastikas on altars, seeking to remove Jewish Old Testament scripture from Christian theology. Although dissident pastors such as Martin Niemöller and Dietrich Bonhoeffer formed the rival Confessing Church to protect theological independence, the Gestapo ruthlessly arrested over 800 pastors, including Niemöller who was sent to Dachau concentration camp in 1938, neutralizing organized resistance.',
      point3:
        'Furthermore, the regime established state-controlled alternatives to diminish Christian influence in daily life. Through the Ministry of Church Affairs established under Hanns Kerrl in 1935, religious education was phased out of schools, crucifixes were removed from classrooms, and young people were required to join the Hitler Youth and League of German Girls, which scheduled activities on Sunday mornings to directly compete with church attendance. A small number of extreme Nazis also promoted the pagan "German Faith Movement" to replace Christian rituals with state festivals.',
    },
    chiefExaminerWarning:
      'Chief examiners report that candidates frequently confuse the Concordat (Catholic) with the Reich Church (Protestant), or make generic assertions that "Hitler banned all religion". High-scoring responses clearly distinguish between policies toward Catholics versus Protestants and provide specific names (e.g. Ludwig Müller, Martin Niemöller, Pope Pius XI).',
    hingeQuestions: [
      {
        q: 'What agreement did Hitler sign with the Catholic Church in July 1933, and what did it promise?',
        a: 'The Concordat (Reichskonkordat): Hitler agreed not to interfere in Catholic worship, schools, or youth leagues if priests stayed out of politics.',
      },
      {
        q: 'Name the anti-Nazi Protestant organization set up by Martin Niemöller in 1934.',
        a: "The Confessing Church (and the Pastors' Emergency League).",
      },
      {
        q: 'What two major constitutional weaknesses undermined the Weimar Republic from 1919?',
        a: 'Proportional Representation (fostered unstable coalitions) and Article 48 (presidential emergency decree power).',
      },
      {
        q: "Which international treaties restored Germany's diplomatic standing between 1925 and 1928?",
        a: 'The Locarno Pact (1925), entry into the League of Nations (1926), and the Kellogg-Briand Pact (1928).',
      },
      {
        q: 'What was the official name of the papal encyclical issued in 1937 attacking Nazi violations of the Concordat?',
        a: '"Mit Brennender Sorge" (With Burning Concern) issued by Pope Pius XI.',
      },
    ],
  },
  usa: {
    unitId: 'usa',
    cohort: 'Year 11',
    title: 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75',
    paperCode: '1HI0/33',
    color: '#2563eb',
    lightColor: '#dbeafe',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    trendFile: path.join(PUBLIC_DATA_DIR, 'usa_trend_analysis.json'),
    htmlFileName: 'year11_usa_overdue_booster.html',
    pdfFileName: 'year11_usa_overdue_booster.pdf',
    modelAnswerQuestion:
      'Explain why the sit-in movement of 1960 was significant in the civil rights campaign. (12 marks)',
    modelAnswerContent: {
      intro:
        'The Greensboro lunch counter sit-in launched by four Black college students in February 1960 represented a crucial tactical and psychological evolution in the civil rights movement, accelerating desegregation and empowering student youth.',
      point1:
        "Firstly, the sit-ins demonstrated the extraordinary power of non-violent direct action to achieve immediate desegregation in public accommodations. When Ezell Blair Jr., David Richmond, Franklin McCain, and Joseph McNeil refused to leave the whites-only counter at Woolworth's in Greensboro, North Carolina, their dignified discipline in the face of verbal abuse and food dumping attracted national media attention. Within days, the protest swelled to hundreds of students, and by July 1960 Woolworth's desegregated its lunch counters. The tactic rapidly spread across 55 cities in 13 Southern states involving over 70,000 participants, successfully integrating public facilities across the upper South far faster than courtroom lawsuits had achieved.",
      point2:
        "Secondly, the movement catalyzed the formation of the Student Nonviolent Coordinating Committee (SNCC), establishing young people as the frontline vanguard of the struggle. Under the guidance of veteran activist Ella Baker at Shaw University in April 1960, SNCC was founded to maintain student autonomy separate from Martin Luther King's SCLC and the NAACP. SNCC activists brought radical energy, organizational fearlessness, and grassroots focus to the movement, immediately going on to lead the 1961 Freedom Rides and the 1964 Freedom Summer voter registration campaigns in Mississippi.",
      point3:
        'Thirdly, the sit-ins mobilized economic pressure that forced commercial business owners to capitulate. Because Black customers represented a significant portion of downtown shopping revenue, selective buying boycotts organized alongside sit-ins cost Southern retailers millions of dollars in lost trade. Store owners recognized that maintaining segregation was economically ruinous, creating powerful commercial pressure that bypassed slow-moving Southern state legislatures.',
    },
    chiefExaminerWarning:
      'Examiners note that candidates frequently describe the Greensboro sit-in as an isolated event without explaining its wider significance (e.g. the creation of SNCC, the contagion effect across 55 cities, and the direct link to the 1961 Freedom Rides). Always explain why the event mattered in the broader struggle.',
    hingeQuestions: [
      {
        q: 'Where did the 1960 lunch counter sit-in begin, and what store was targeted?',
        a: "Greensboro, North Carolina at the Woolworth's department store lunch counter.",
      },
      {
        q: 'What new civil rights organization was founded in April 1960 directly as a result of the sit-ins?',
        a: 'SNCC (Student Nonviolent Coordinating Committee), mentored by Ella Baker.',
      },
      {
        q: 'What was the Gulf of Tonkin Resolution (1964), and why was it significant?',
        a: 'A congressional resolution giving President Johnson authority to take "all necessary measures" in Vietnam without declaring war.',
      },
      {
        q: 'Which 1970 event saw four unarmed student anti-war protesters shot dead by the National Guard?',
        a: 'The Kent State University shootings in Ohio (4 May 1970).',
      },
      {
        q: 'Name the 1965 civil rights march that was attacked on "Bloody Sunday" at the Edmund Pettus Bridge.',
        a: 'The Selma to Montgomery march in Alabama.',
      },
    ],
  },
};

function extractTopOverdueTopics(trendData, maxCount = 5) {
  const points = [];
  trendData.sections.forEach((sec) => {
    sec.topics.forEach((top) => {
      top.points.forEach((pt) => {
        points.push({
          sectionTitle: sec.title,
          topicTitle: top.title,
          ...pt,
        });
      });
    });
  });

  // Sort by overdue score descending, then by high-tariff gap
  points.sort((a, b) => {
    if (b.overdue_score !== a.overdue_score) {
      return b.overdue_score - a.overdue_score;
    }
    if (b.high_tariff_gap && !a.high_tariff_gap) return 1;
    if (!b.high_tariff_gap && a.high_tariff_gap) return -1;
    return a.exam_count - b.exam_count;
  });

  return points.slice(0, maxCount);
}

function cleanPointText(text) {
  // Extract primary topic title from bold markdown
  const boldMatch = text.match(/\\*\\*(.*?)\\*\\*/);
  if (boldMatch) return boldMatch[1].replace(/[:.]/g, '').trim();
  return text.split(':')[0].replace(/[*_]/g, '').trim();
}

function extractKeyKnowledge(text) {
  const parts = text.split(';');
  if (parts.length > 1) {
    return parts.map((p) => p.replace(/[*_]/g, '').trim()).filter((p) => p.length > 10);
  }
  return [text.replace(/[*_]/g, '').trim()];
}

function generateBoosterHtml(cfg, topTopics) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${cfg.cohort} GCSE History Overdue Booster: ${cfg.title}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      margin: 0;
      padding: 0;
      font-size: 9.5pt;
      line-height: 1.35;
    }
    .sheet-page {
      width: 210mm;
      min-height: 297mm;
      padding: 12mm 14mm;
      margin: 0 auto 20px auto;
      background: white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      position: relative;
    }
    @media print {
      body { background: white; }
      .sheet-page {
        margin: 0;
        box-shadow: none;
        page-break-after: always;
        min-height: 290mm;
      }
    }
    .header-banner {
      background: ${cfg.gradient};
      border-radius: 12px;
      padding: 16px 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }
    .cohort-badge {
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.35);
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-block;
      margin-bottom: 4px;
    }
    .main-title {
      margin: 0;
      font-size: 14pt;
      font-weight: 800;
      letter-spacing: -0.2px;
    }
    .sub-title {
      margin: 3px 0 0 0;
      font-size: 9pt;
      opacity: 0.9;
    }
    .radar-alert-bar {
      background: #fff1f2;
      border: 1px solid #fecdd3;
      border-left: 4px solid ${cfg.color};
      border-radius: 8px;
      padding: 8px 14px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5pt;
    }
    .section-heading {
      font-size: 11pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid ${cfg.color};
      padding-bottom: 4px;
      margin: 0 0 10px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .topic-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 8px;
      background: #ffffff;
      border-left: 4px solid #94a3b8;
    }
    .topic-card.priority-1 { border-left-color: #e11d48; background: #fff5f7; }
    .topic-card.priority-2 { border-left-color: #f97316; }
    .topic-card.priority-3 { border-left-color: #eab308; }
    .topic-card.priority-4 { border-left-color: #3b82f6; }
    .topic-card.priority-5 { border-left-color: #8b5cf6; }

    .topic-top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }
    .topic-title {
      font-size: 10pt;
      font-weight: 800;
      color: #0f172a;
    }
    .topic-status-tag {
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .tag-unexamined { background: #fee2e2; color: #991b1b; }
    .tag-overdue { background: #ffedd5; color: #9a3412; }
    .tag-gap { background: #fef3c7; color: #92400e; }

    .knowledge-list {
      margin: 4px 0 0 0;
      padding-left: 16px;
      font-size: 8.5pt;
      color: #334155;
    }
    .knowledge-list li {
      margin-bottom: 3px;
    }
    .target-q-box {
      margin-top: 6px;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 8pt;
      color: #1e293b;
      font-weight: 600;
    }

    /* PAGE 2 STYLES */
    .hinge-grid {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 12px;
    }
    .hinge-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 7px 10px;
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 8.5pt;
    }
    .hinge-num {
      background: ${cfg.color};
      color: white;
      font-weight: 800;
      font-size: 7.5pt;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .model-answer-box {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px 16px;
      background: #f8fafc;
      margin-bottom: 12px;
      font-size: 8.5pt;
      line-height: 1.45;
    }
    .examiner-warning-box {
      background: #fffbeb;
      border: 1px solid #fef08a;
      border-left: 4px solid #eab308;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 12px;
      font-size: 8pt;
      color: #854d0e;
    }
    .checklist-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
    }
    .checklist-table th, .checklist-table td {
      border: 1px solid #e2e8f0;
      padding: 4px 8px;
      text-align: left;
    }
    .checklist-table th {
      background: #f1f5f9;
      font-weight: 700;
      color: #334155;
    }
    .page-footer {
      position: absolute;
      bottom: 10mm;
      left: 14mm;
      right: 14mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      font-size: 7.5pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: THE RADAR & TOP 5 PRIORITY OVERDUE TOPICS -->
  <div class="sheet-page">
    <div class="header-banner">
      <div>
        <div class="cohort-badge">${cfg.cohort} GCSE HISTORY EXAM BOOSTER</div>
        <h1 class="main-title">Specification Overdue Radar & High-Probability Topic Booster</h1>
        <div class="sub-title">${cfg.title} (${cfg.paperCode}) • Edexcel GCSE (9–1) Examination Series 2018–2026</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 18pt; font-weight: 900;">2-PAGE</div>
        <div style="font-size: 8pt; text-transform: uppercase; font-weight: 700; opacity: 0.9;">Revision Dossier</div>
      </div>
    </div>

    <div class="radar-alert-bar">
      <div>
        <strong style="color: ${cfg.color};"><i class="fa-solid fa-triangle-exclamation"></i> EXAMINER RADAR ALERT:</strong>
        Pearson Edexcel rotates high-tariff topics. The 5 topics below have been either <em>completely unexamined</em> or <em>absent for 4+ exam series</em>.
      </div>
      <div style="font-weight: 800; color: #0f172a; flex-shrink: 0; margin-left: 15px;">
        TARGET: SUMMER 2026 / MOCK EXAMS
      </div>
    </div>

    <h2 class="section-heading">
      <i class="fa-solid fa-bullseye" style="color: ${cfg.color};"></i>
      Top 5 High-Probability Overdue Exam Topics
    </h2>

    ${topTopics
      .map((t, idx) => {
        const priorityClass = `priority-${idx + 1}`;
        let tagClass = 'tag-overdue';
        let tagLabel = `Overdue (${t.last_examined})`;
        if (t.last_examined === 'Never') {
          tagClass = 'tag-unexamined';
          tagLabel = 'Never Examined (High Gap)';
        } else if (t.high_tariff_gap) {
          tagClass = 'tag-gap';
          tagLabel = 'High-Tariff Essay Gap';
        }

        const titleClean = cleanPointText(t.point_text);
        const knowledgePoints = extractKeyKnowledge(t.point_text);

        return `
          <div class="topic-card ${priorityClass}">
            <div class="topic-top-row">
              <div class="topic-title">
                <span style="color: ${cfg.color}; font-weight: 900; margin-right: 4px;">#${idx + 1}</span>
                ${titleClean}
              </div>
              <span class="topic-status-tag ${tagClass}">${tagLabel}</span>
            </div>
            <div style="font-size: 7.8pt; color: #64748b; margin-bottom: 4px;">
              ${t.sectionTitle} • ${t.topicTitle}
            </div>
            <ul class="knowledge-list">
              ${knowledgePoints
                .slice(0, 3)
                .map((pt) => `<li>${pt}</li>`)
                .join('')}
            </ul>
            <div class="target-q-box">
              <i class="fa-solid fa-pen-nib" style="color: ${cfg.color}; margin-right: 4px;"></i>
              <strong>Predicted Exam Prompt:</strong> Explain why ${titleClean.toLowerCase()} was significant... [12m/16m]
            </div>
          </div>
        `;
      })
      .join('')}

    <div class="page-footer">
      <div>Meoncross School History Hub • ${cfg.cohort} Portfolio Tracker</div>
      <div>Page 1 of 2 (Turn over for Retrieval Hinge Check & Grade 9 Model)</div>
    </div>
  </div>

  <!-- PAGE 2: HINGE CHECK & GRADE 9 MODEL ANSWER -->
  <div class="sheet-page">
    <h2 class="section-heading">
      <i class="fa-solid fa-bolt" style="color: #eab308;"></i>
      Rapid Retrieval Hinge Check (5 Core Questions)
    </h2>
    <div class="hinge-grid">
      ${cfg.hingeQuestions
        .map(
          (h, i) => `
        <div class="hinge-item">
          <div class="hinge-num">${i + 1}</div>
          <div style="flex-grow: 1;">
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 3px;">${h.q}</div>
            <div style="font-size: 7.8pt; color: #475569; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px;">
              <strong style="color: #0d9488;">Answer Key:</strong> ${h.a}
            </div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>

    <h2 class="section-heading">
      <i class="fa-solid fa-award" style="color: #10b981;"></i>
      Grade 9 Exemplar Model Answer
    </h2>
    <div style="font-weight: 800; color: #0f172a; font-size: 9.5pt; margin-bottom: 6px;">
      ${cfg.modelAnswerQuestion}
    </div>

    <div class="model-answer-box">
      <p style="margin: 0 0 6px 0; font-style: italic; color: #475569;">${cfg.modelAnswerContent.intro}</p>
      <p style="margin: 0 0 6px 0;"><strong>PEEL Paragraph 1:</strong> ${cfg.modelAnswerContent.point1}</p>
      <p style="margin: 0 0 6px 0;"><strong>PEEL Paragraph 2:</strong> ${cfg.modelAnswerContent.point2}</p>
      <p style="margin: 0;"><strong>PEEL Paragraph 3:</strong> ${cfg.modelAnswerContent.point3}</p>
    </div>

    <div class="examiner-warning-box">
      <strong style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
        <i class="fa-solid fa-triangle-exclamation"></i> CHIEF EXAMINER PITFALL WARNING:
      </strong>
      ${cfg.chiefExaminerWarning}
    </div>

    <h2 class="section-heading" style="font-size: 9pt; margin-bottom: 6px;">
      <i class="fa-solid fa-clipboard-check" style="color: ${cfg.color};"></i>
      Pupil Pre-Exam Traffic Light Self-Check
    </h2>
    <table class="checklist-table">
      <thead>
        <tr>
          <th style="width: 50%;">Specification Overdue Topic</th>
          <th style="width: 25%;">Core Facts Mastered?</th>
          <th style="width: 25%;">Essay Plan Ready?</th>
        </tr>
      </thead>
      <tbody>
        ${topTopics
          .map(
            (t) => `
          <tr>
            <td><strong>${cleanPointText(t.point_text)}</strong></td>
            <td>[ &nbsp; ] Red &nbsp; [ &nbsp; ] Amber &nbsp; [ &nbsp; ] Green</td>
            <td>[ &nbsp; ] Ready to write</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>

    <div class="page-footer">
      <div>Meoncross School History Hub • ${cfg.cohort} Portfolio Tracker</div>
      <div>Page 2 of 2 • Edexcel GCSE (9–1) Revision Booster</div>
    </div>
  </div>

</body>
</html>`;
}

async function run() {
  console.log('=== Starting Automated Overdue Revision Sheet Generator ===');

  const targetArg = process.argv[2]; // optional unitId or cohort
  const unitsToProcess = [];

  if (targetArg === 'year10' || targetArg === 'weimar_nazi_germany') {
    unitsToProcess.push('weimar_nazi_germany');
  } else if (targetArg === 'year11' || targetArg === 'usa') {
    unitsToProcess.push('usa');
  } else {
    // Process both Year 10 and Year 11 by default!
    unitsToProcess.push('weimar_nazi_germany', 'usa');
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  for (const unitId of unitsToProcess) {
    const cfg = CONFIGS[unitId];
    if (!cfg) continue;

    console.log(`\\nGenerating Revision Booster for ${cfg.cohort}: ${cfg.title}...`);
    if (!fs.existsSync(cfg.trendFile)) {
      console.warn(`Trend file not found: ${cfg.trendFile}. Skipping.`);
      continue;
    }

    const trendData = JSON.parse(fs.readFileSync(cfg.trendFile, 'utf8'));
    const topTopics = extractTopOverdueTopics(trendData, 5);

    const htmlContent = generateBoosterHtml(cfg, topTopics);
    const htmlPath = path.join(REVISION_SHEETS_DIR, cfg.htmlFileName);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`[OK] Saved HTML to ${htmlPath}`);

    // Render PDF via Puppeteer
    const pdfPath = path.join(PDFS_DIR, cfg.pdfFileName);
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        bottom: '0mm',
        left: '0mm',
        right: '0mm',
      },
    });
    await page.close();
    console.log(`[OK] Rendered PDF to ${pdfPath}`);
  }

  await browser.close();
  console.log('\\n🎉 Automated Overdue Revision Sheet Generation Complete!');
}

run().catch((err) => {
  console.error('Error generating overdue revision sheets:', err);
  process.exit(1);
});
