const fs = require('fs');
const path = require('path');

function formatText(txt) {
  if (!txt) return '';
  return txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function buildIndustrialisationTextbook(unitData) {
  const genDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Course Textbook - Industrialisation, Empire &amp; Power</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 16mm 16mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 10pt;
      line-height: 1.45;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    h1, h2, h3, h4, h5, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .textbook-cover {
      width: 100%;
      min-height: 260mm;
      padding: 20px 24px;
      border: 1px solid #cbd5e1;
      outline: 3.5px double #0f172a;
      outline-offset: -8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: always;
    }
    .textbook-lesson {
      page-break-before: always;
      break-before: always;
      margin-top: 10px;
      padding-bottom: 25px;
    }
    .lesson-header {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 8px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .lesson-eyebrow {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #1e3a8a;
      font-weight: 700;
    }
    .lesson-title {
      font-family: 'Playfair Display', serif;
      font-size: 17pt;
      color: #0f172a;
      margin: 4px 0 0 0;
      line-height: 1.2;
    }
    .meta-box {
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 12px;
    }
    .objectives-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
    }
    .do-now-box {
      background: #ffffff;
      border: 1.2px solid #94a3b8;
      border-left: 4px solid #1e3a8a;
    }
    .vocab-box {
      background: #fdfbf7;
      border: 1.2px solid #e2e8f0;
      border-left: 4px solid #d97706;
    }
    .act-header {
      font-family: 'Inter', sans-serif;
      font-size: 11pt;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 800;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 4px;
      margin: 22px 0 10px 0;
      page-break-after: avoid;
      break-after: avoid;
    }
    .narrative-p {
      text-align: justify;
      margin-bottom: 12px;
      font-size: 10.2pt;
      line-height: 1.5;
      color: #1e293b;
    }
    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 1px 4px;
      border-radius: 3px;
      margin-right: 5px;
      vertical-align: baseline;
    }
    .plate-container {
      margin: 14px 0;
      padding: 8px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #f8fafc;
      page-break-inside: avoid;
      break-inside: avoid;
      text-align: center;
    }
    .plate-img {
      max-width: 100%;
      max-height: 240px;
      object-fit: contain;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      display: block;
      margin: 0 auto;
    }
    .plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 8pt;
      color: #475569;
      margin-top: 6px;
      line-height: 1.35;
      text-align: center;
    }
    .archival-box {
      margin: 16px 0;
      border: 1.5px solid #b45309;
      background: #fffdfa;
      border-radius: 6px;
      padding: 12px 14px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fde68a;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 2px 6px;
      border-radius: 3px;
      background: #fef3c7;
      color: #92400e;
      font-weight: 700;
    }
    .archival-shelfmark {
      font-family: 'Courier New', Courier, monospace;
      font-size: 7.5pt;
      color: #78350f;
      font-weight: bold;
    }
    .archival-quote {
      font-family: 'Georgia', serif;
      font-size: 10.5pt;
      font-style: italic;
      color: #451a03;
      line-height: 1.5;
      margin: 0 0 8px 0;
    }
    .archival-footer {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      color: #92400e;
      border-top: 1px dashed #fde68a;
      padding-top: 4px;
    }
    .essay-prep-box {
      margin: 20px 0 10px 0;
      border: 1.5px solid #1e3a8a;
      background: #f8fafc;
      border-radius: 6px;
      padding: 12px 14px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .scholar-edge-box {
      margin: 12px 0;
      border: 1px dashed #d97706;
      background: #fffbeb;
      border-radius: 6px;
      padding: 8px 12px;
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      color: #92400e;
      line-height: 1.4;
      page-break-inside: avoid;
      break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- ========================================== -->
  <!-- FRONT COVER                                -->
  <!-- ========================================== -->
  <div class="textbook-cover">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 9pt; text-transform: uppercase; letter-spacing: 2px; color: #1e3a8a; font-weight: 700;">
          The History Portal &bull; Department of History
        </span>
        <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: 600;">
          Year 8 Course Textbook
        </span>
      </div>
      <div style="text-align: center; border-bottom: 1.5px solid #cbd5e1; padding: 10px 0 12px 0; margin-bottom: 14px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; color: #0f172a; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1.5px; line-height: 1.15;">
          Industrialisation, Empire &amp; Power
        </h1>
        <div style="font-family: 'Inter', sans-serif; font-size: 10pt; color: #334155; font-weight: 500;">
          Britain’s Transformation from Agrarian Kingdom to Global Workshop (1750–1901)
        </div>
      </div>

      <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 10px 16px; background: #f8fafc; margin-bottom: 14px; text-align: center;">
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1.8px; color: #1e3a8a; font-weight: 700; margin-bottom: 3px;">
          Overarching Historical Enquiry
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 14pt; color: #0f172a; font-style: italic; font-weight: 600;">
          “How did 19th-century Britain transform at home and abroad?”
        </div>
      </div>

      <div style="border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 8px; background: #ffffff; text-align: center; margin-bottom: 14px;">
        <img src="../../images/imperial_federation_map.jpg" style="max-width: 100%; max-height: 380px; object-fit: contain; display: block; margin: 0 auto; border-radius: 4px;" alt="Imperial Federation Map 1886">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #64748b; margin-top: 6px;">
          <strong>Primary Visual Plate:</strong> <em>Imperial Federation: Map of the World Showing the Extent of the British Empire in 1886</em> (Walter Crane)
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #cbd5e1; padding-top: 8px; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 8pt; color: #64748b;">
      <span>Department of History &bull; KS3 Curriculum Companion</span>
      <span>${genDate} &bull; The History Revision Hub</span>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- CONTENTS & ROADMAP                         -->
  <!-- ========================================== -->
  <div style="page-break-before: always; break-before: always; padding: 10px 0;">
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: baseline;">
      <h2 style="margin: 0; font-size: 15pt; color: #0f172a; text-transform: uppercase; letter-spacing: 1px;">Table of Contents &bull; Unit Enquiries</h2>
      <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; color: #1e3a8a;">8 Four-Act Enquiries</span>
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
`;

  unitData.lessons.forEach((l, idx) => {
    html += `
      <div style="display: flex; align-items: baseline; border-bottom: 1px dotted #cbd5e1; padding-bottom: 4px;">
        <span style="font-family: 'Inter', sans-serif; font-weight: 800; color: #1e3a8a; font-size: 9pt; width: 85px; flex-shrink: 0;">Lesson ${idx + 1}</span>
        <span style="font-family: 'Georgia', serif; font-size: 9.5pt; color: #0f172a; flex: 1;">${formatText(l.title)}</span>
      </div>
    `;
  });

  html += `
    </div>

    <!-- Chronological Spine -->
    <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; background: #f8fafc;">
      <h3 style="margin: 0 0 8px 0; font-size: 10pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a;">Chronological Spine (1750–1901)</h3>
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #334155; line-height: 1.5;">
        <strong>1769–1784:</strong> Watt steam engine patent &amp; Henry Cort Funtley ironworks breakthroughs.<br>
        <strong>1780–1830:</strong> Mechanisation of textiles; rise of factory cities &amp; decline of domestic system.<br>
        <strong>1815–1819:</strong> Post-Waterloo economic distress; 1819 Peterloo Massacre at St Peter’s Field.<br>
        <strong>1832:</strong> Great Reform Act enfranchises industrial middle class; working class excluded.<br>
        <strong>1842:</strong> Edwin Chadwick’s Sanitary Report exposes squalor of industrial slums.<br>
        <strong>1857:</strong> Indian Rebellion shatters East India Company rule; direct Crown Raj established.<br>
        <strong>1870–1901:</strong> High Victorian Empire, Scramble for Africa, and the standard of living debate.
      </div>
    </div>
  </div>
`;

  // ==========================================
  // LESSONS 1 TO 8 (FOUR-ACT CHAPTERS)
  // ==========================================
  unitData.lessons.forEach((lesson, lIdx) => {
    html += `
  <div class="textbook-lesson" id="lesson-${lIdx + 1}">
    <!-- Lesson Header -->
    <div class="lesson-header">
      <div>
        <div class="lesson-eyebrow">Unit 4: Industrialisation &bull; Enquiry Lesson ${lIdx + 1}</div>
        <h2 class="lesson-title">L${lIdx + 1}: ${formatText(lesson.title)}</h2>
      </div>
    </div>

    <!-- Learning Objectives Box -->
    <div class="meta-box objectives-box">
      <strong style="font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px; color: #1e3a8a; display: block; margin-bottom: 4px;">
        Core Learning Objectives:
      </strong>
      <ul style="margin: 0; padding-left: 18px; font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #334155; line-height: 1.35;">
    `;
    (lesson.learning_objectives?.scaffolded || []).slice(0, 3).forEach((obj) => {
      html += `<li>${formatText(obj)}</li>`;
    });
    html += `
      </ul>
    </div>

    <!-- Do Now: Prior Knowledge Recall Box (Exact 5 questions matching workbook & app) -->
    <div class="meta-box do-now-box">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
        <strong style="font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.6px; color: #1e3a8a;">
          Do Now: Prior Knowledge Recall (5 Questions)
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; font-weight: 600;">Answer in your Workbook</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 14px; font-family: 'Inter', sans-serif; font-size: 8pt; color: #1e293b; line-height: 1.3;">
    `;
    (lesson.do_now?.items || []).slice(0, 5).forEach((item, qIdx) => {
      html += `
        <div>
          <strong style="color: #1e3a8a;">Q${qIdx + 1}:</strong> ${formatText(item.question)}
        </div>
      `;
    });
    html += `
      </div>
    </div>
    `;

    // Core Vocabulary Box
    if (lesson.vocab || lesson.vocabulary) {
      const vocabList = lesson.vocab || lesson.vocabulary;
      html += `
      <div class="meta-box vocab-box">
        <strong style="font-size: 8pt; text-transform: uppercase; letter-spacing: 0.6px; color: #b45309; display: block; margin-bottom: 4px;">
          Core Vocabulary Checklist:
        </strong>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; font-family: 'Inter', sans-serif; font-size: 8pt;">
      `;
      vocabList.forEach((v) => {
        const word = typeof v === 'string' ? v : v.term || v.word;
        const def =
          typeof v === 'object' && v.definition ? ` &mdash; <em>${v.definition}</em>` : '';
        html += `<span style="background: #ffffff; border: 1px solid #fed7aa; padding: 2px 7px; border-radius: 4px; color: #7c2d12;"><strong>${word}</strong>${def}</span>`;
      });
      html += `
        </div>
      </div>
      `;
    }

    // Four-Act Narrative Blocks
    (lesson.narrative_blocks || []).forEach((block) => {
      if (block.title) {
        html += `<h3 class="act-header">${formatText(block.title)}</h3>`;
      }

      // Visual plate (Source A / B / D)
      if (block.image) {
        let imgSrc = block.image.startsWith('/') ? `../..${block.image}` : `../../${block.image}`;
        html += `
        <div class="plate-container">
          <img src="${imgSrc}" class="plate-img" alt="${block.image_alt || 'Historical Plate'}">
          <div class="plate-caption">
            ${block.image_caption ? formatText(block.image_caption) : block.image_alt || ''}
          </div>
        </div>
        `;
      }

      // Paragraph prose
      if (block.text) {
        let textWithImages = block.text;
        // Split paragraphs cleanly
        const paras = textWithImages.split(/<br\s*\/?>\s*<br\s*\/?>/);
        paras.forEach((p) => {
          if (p.trim()) {
            html += `<p class="narrative-p">${p.trim()}</p>`;
          }
        });
      }

      // Archival Source (Source C)
      const src = block.archival_source || block.source;
      if (src && (src.text || src.content)) {
        html += `
        <div class="archival-box">
          <div class="archival-header">
            <span class="archival-badge">Primary Archival Record</span>
            <span class="archival-shelfmark">${src.shelfmark || 'OFFICIAL RECORD'}</span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: 10.5pt; color: #0f172a; margin-bottom: 6px;">
            ${src.title || 'Official Primary Source'}
          </div>
          <div class="archival-quote">
            ${src.text || src.content}
          </div>
          <div class="archival-footer">
            <strong>Provenance:</strong> ${src.citation || 'Official contemporary archive record.'}
          </div>
        </div>
        `;
      }
    });

    // Essay Prompt & Structure Strip at end of lesson
    const extTask = (lesson.narrative_blocks || [])
      .flatMap((b) => b.tasks || [])
      .find((t) => t.type === 'extended_writing');

    if (extTask) {
      html += `
      <div class="essay-prep-box">
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a; font-weight: 700; margin-bottom: 4px;">
          Enquiry Extended Writing Task &bull; Completed in Workbook (Page ${lIdx * 2 + 5})
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 12pt; font-weight: 700; color: #0f172a; margin-bottom: 8px;">
          ${extTask.question}
        </div>
      `;

      if (extTask.scaffolding?.structure_strip) {
        html += `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; margin-top: 8px;">
        `;
        extTask.scaffolding.structure_strip.forEach((s) => {
          html += `
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-family: 'Inter', sans-serif; font-size: 7.8pt; line-height: 1.35; color: #334155;">
            ${formatText(s)}
          </div>
          `;
        });
        html += `</div>`;
      }

      html += `</div>`;
    }

    html += `
    <div style="margin-top: 14px; padding-top: 6px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #94a3b8;">
      <span>The History Portal &bull; Industrialisation, Empire &amp; Power</span>
      <span>Lesson ${lIdx + 1} Reading Plate</span>
    </div>
  </div>
    `;
  });

  html += `
</body>
</html>
`;

  // Write outputs
  const rootUnitsPath = path.join(
    __dirname,
    '..',
    'units',
    'industrialisation_and_empire',
    'textbook.html',
  );
  const publicUnitsPath = path.join(
    __dirname,
    '..',
    'public',
    'units',
    'industrialisation_and_empire',
    'textbook.html',
  );

  fs.writeFileSync(rootUnitsPath, html, 'utf8');
  fs.writeFileSync(publicUnitsPath, html, 'utf8');
  console.log(`✅ Generated Four-Act Companion Textbook: ${rootUnitsPath}`);
  console.log(`✅ Generated Four-Act Companion Textbook: ${publicUnitsPath}`);
}

module.exports = {
  buildIndustrialisationTextbook,
};
