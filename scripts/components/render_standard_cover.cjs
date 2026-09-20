/**
 * Standard Cover Engine for GCSE History Revision Hub Workbooks
 *
 * Provides unified, mathematically calibrated Master Front & Back Covers
 * guaranteeing:
 * - 120mm cinematic 3:2 landscape historical photo framing
 * - Clean full-width Pupil Workbook & Assessment identity strip
 * - 8.8pt auto-distributing 3-column official Pearson specification box (100% space filled, 0 dead void)
 * - Standardized Assessment Progress Ledger (/26 enquiry marks, /130 total)
 * - 4-line 7.2mm WWW/EBI handwriting sections for SEND/teacher feedback
 * - 5-code vector QR interactive quizzing hub
 * - Strict institutional neutrality (data-department-name customizer standard)
 */

const QRCode = require('qrcode');

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
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

/**
 * Renders the Standard Outside Front Cover (Page 1)
 */
function renderStandardFrontCover({
  unitId = 'cme_new',
  paperTitle = 'EDEXCEL GCSE (9–1) HISTORY • PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995',
  specCode = 'SPECIFICATION 1HI0/2B',
  keyTopicNum = 1,
  dateRange = '1945–1963',
  title = '',
  subtitle = '',
  heroImage = {
    src: '',
    alt: '',
    objectPosition: 'center 36%',
    shelfmark: '',
    date: '',
    title: '',
    caption: '',
    sourceTag: 'Historical Primary Source',
    archiveTag: 'Edexcel Paper 2 Master Archive',
    heightMm: 120,
  },
  specBox = {
    title: 'Pearson Edexcel GCSE (9–1) History Specification Content',
    subtopics: [],
  },
  footerQuip = '',
  totalPageCount = 16,
  renderFooterStrip = null,
}) {
  const photoHeight = heroImage.heightMm || 120;
  const objectPos = heroImage.objectPosition || 'center 36%';

  const subtopicsHtml = (specBox.subtopics || [])
    .map((sub, idx) => {
      const isLast = idx === specBox.subtopics.length - 1;
      const borderStyle = isLast ? '' : 'border-right: 1.2px solid #e2e8f0; padding-right: 12px;';
      const itemsHtml = (sub.items || []).map((item) => `<div>&bull; ${item}</div>`).join('\n');

      return `
          <!-- Subtopic ${idx + 1} -->
          <div style="${borderStyle} display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
            <strong style="font-size: 8.8pt; text-transform: uppercase; color: #000; border-bottom: 1.5px solid #000; padding-bottom: 3px; display: block;">
              ${sub.title}
            </strong>
            ${itemsHtml}
          </div>`;
    })
    .join('\n');

  const footerHtml = renderFooterStrip
    ? renderFooterStrip(1, footerQuip, totalPageCount)
    : `
      <div class="page-footer-strip">
        <span class="footer-quip" style="text-align: left; flex: 1; margin-right: 8px;">${footerQuip}</span>
        <span class="footer-page-num">1/${totalPageCount}</span>
      </div>`;

  return `
  <!-- ====================================================================
       PAGE 1: OUTSIDE FRONT COVER (Master Architectural Cover)
       ==================================================================== -->
  <div class="page page-container recto-page" id="page-1" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Pupil Workbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">${paperTitle}</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">${specCode}</span>
        </div>
      </div>

      <!-- Key Topic Title & Inquiry Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 4px 8px; background: #fff; margin-bottom: 3px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1px;">
          <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
            Key Topic ${keyTopicNum}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Chronological Enquiry Sequence &bull; ${dateRange}
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 14pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #000;">
          ${title}
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.0pt; color: #222; font-style: italic; line-height: 1.2;">
          ${subtitle}
        </div>
      </div>

      <!-- Master Wide Photographic Plate (Full Width Hero Layout) -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 3px; display: flex; flex-direction: column;">
        
        <!-- Wide Photo Frame: 3:2 Landscape Photograph -->
        <div style="height: ${photoHeight}mm; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${heroImage.src}" alt="${heroImage.alt}" style="width: 100%; height: 100%; object-fit: cover; object-position: ${objectPos}; display: block; filter: grayscale(100%) contrast(115%);">
        </div>

        <!-- Archival Provenance Plate Underneath Photo -->
        <div style="border-top: 1.5px solid #000; padding: 3.5px 8px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
              Archival Primary Record &bull; ${heroImage.date}
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 900; background: #000; color: #fff; padding: 1px 5px; border-radius: 2px;">
              ${heroImage.shelfmark}
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.5pt; font-weight: 800; line-height: 1.15; margin: 1px 0;">
            ${heroImage.title}
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; color: #111; line-height: 1.22;">
            ${heroImage.caption}
          </div>
          <div style="margin-top: 2px; padding-top: 2px; border-top: 1px dashed #999; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; color: #333;">
            <span>${heroImage.sourceTag || 'Historical Primary Source'}</span>
            <span>${heroImage.archiveTag || 'Edexcel Paper 2 Master Archive'}</span>
          </div>
        </div>

      </div>

      <!-- Pupil Workbook & Assessment Card (Spanning Across the Page) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; padding: 6px 12px; background: #fff; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.2px solid #000; padding-bottom: 2px; margin-bottom: 5px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.8px;">
            Pupil Workbook &amp; Assessment
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Paper 2: Conflict in the Middle East, 1945–1995 &bull; Key Topic ${keyTopicNum}
          </span>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr 1.2fr; gap: 16px; font-family: 'Inter', sans-serif; font-size: 7.5pt;">
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 48px; font-size: 7.0pt;">Name:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 44px; font-size: 7.0pt;">Class:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
          <div style="display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; width: 56px; font-size: 7.0pt;">Teacher:</strong>
            <div style="flex: 1; border-bottom: 1.2px solid #000; height: 14px;"></div>
          </div>
        </div>
      </div>

      <!-- Pearson Edexcel Specification Word-For-Word (Spanning Across the Page) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; flex: 1; display: flex; flex-direction: column; margin-bottom: 3px;">
        <div style="background: #000; color: #fff; padding: 4px 12px; font-family: 'Inter', sans-serif; font-size: 7.8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>${specBox.title}</span>
          <span style="font-size: 7.0pt; letter-spacing: 0.5px;">Official Specification Content</span>
        </div>

        <div style="padding: 10px 14px; display: grid; grid-template-columns: repeat(${specBox.subtopics.length || 3}, 1fr); gap: 14px; font-family: 'Inter', sans-serif; font-size: 8.8pt; line-height: 1.5; color: #111; flex: 1;">
          ${subtopicsHtml}
        </div>
      </div>

      ${footerHtml}
    </div>
  </div>`;
}

/**
 * Renders the Standard Outside Back Cover (Page 16)
 */
function renderStandardBackCover({
  unitId = 'cme_new',
  paperTitle = 'EDEXCEL GCSE (9–1) HISTORY • PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995',
  keyTopicNum = 1,
  trackerTitle = 'Student Assessment Record &bull; Key Topic Tracker',
  trackerSubtitle = 'Paper 2: Conflict in the Middle East, 1945–1995',
  enquiries = [],
  feedback = {
    effortGrade: '',
    signature: '____________________________',
    date: '____________________',
  },
  qrLessons = [],
  footerQuip = '',
  totalPageCount = 16,
  renderFooterStrip = null,
}) {
  const enquiriesRowsHtml = enquiries
    .map(
      (enq) => `
            <tr style="border-bottom: 1px solid #000000;">
              <td style="padding: 4px 4px; border-right: 1px solid #000000; text-align: center; font-weight: 800; font-size: 8.5pt;">${enq.num}</td>
              <td style="padding: 4px 8px; border-right: 1px solid #000000; font-size: 8.0pt;"><strong>${enq.code || `KT${keyTopicNum}.${enq.num}`}:</strong> ${enq.title}</td>
              <td style="padding: 4px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.0pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${enq.doNowMarks || 10}</strong> ]</span></td>
              <td style="padding: 4px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.0pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; <strong>/ ${enq.q1aMarks || 4}</strong> ]</span></td>
              <td style="padding: 4px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap;"><span style="font-size: 9.0pt; font-weight: 800;">[ &nbsp;&nbsp;&nbsp; <strong>/ ${enq.q1bMarks || 4}</strong> ]</span></td>
              <td style="padding: 4px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.8pt;">${enq.extType || 'Q2'}: <span style="font-size: 9.0pt; font-weight: 800;">[ &nbsp;&nbsp; <strong>/ ${enq.extMarks || 8}</strong> ]</span></td>
              <td style="padding: 4px 6px; text-align: center; font-size: 9.5pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ ${enq.totalMarks || 26}</strong> ]</td>
            </tr>`,
    )
    .join('\n');

  const qrCardsHtml = qrLessons
    .map((qrItem, idx) => {
      const qrSvg = generateQrSvg(qrItem.url);
      return `
          <div style="border: 1px solid #000000; border-radius: 3px; padding: 4px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #000000; margin-bottom: 2px; text-transform: uppercase;">
              ${qrItem.label || `KT ${keyTopicNum}.${idx + 1}`}
            </div>
            <div style="width: 20mm; height: 20mm; margin: 2px auto;">
              ${qrSvg}
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 700; color: #000000; margin-top: 2px;">
              Scan to Quiz
            </div>
            <div style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #000000; margin-top: 1px; white-space: nowrap;">
              Best Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 20</strong> ]
            </div>
          </div>`;
    })
    .join('\n');

  const footerHtml = renderFooterStrip
    ? renderFooterStrip(totalPageCount, footerQuip, totalPageCount)
    : `
      <div class="page-footer-strip">
        <span class="footer-page-num" style="margin-right: 8px;">${totalPageCount}/${totalPageCount}</span>
        <span class="footer-quip" style="text-align: right; flex: 1;">${footerQuip}</span>
      </div>`;

  return `
  <!-- ====================================================================
       PAGE 16: OUTSIDE BACK COVER (Student Assessment Record & Digital Quizzing Hub)
       ==================================================================== -->
  <div class="page page-container verso-page" id="page-16" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Pupil Assessment Record</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">${paperTitle}</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800;">OUTSIDE BACK COVER</span>
        </div>
      </div>

      <!-- Header Block -->
      <div style="text-align: center; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 6px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 13pt; margin: 0 0 2px 0; font-weight: 900; text-transform: uppercase;">
          ${trackerTitle}
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #222222; font-weight: 700; letter-spacing: 0.5px;">
          ${trackerSubtitle}
        </div>
      </div>

      <!-- Target Grade & Pupil Information Strip -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 14px; background: #ffffff; display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 12px; align-items: center; margin-bottom: 6px;">
        <div>
          <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; text-transform: uppercase;">Pupil:</span>
          <div style="border-bottom: 1.5px solid #000000; height: 16px; margin-top: 1px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Target Grade:</span>
          <div style="border: 1.5px solid #000000; border-radius: 3px; width: 36px; height: 24px; margin: 2px auto 0 auto; font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; line-height: 22px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Predicted:</span>
          <div style="border: 1.5px solid #000000; border-radius: 3px; width: 36px; height: 24px; margin: 2px auto 0 auto; font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; line-height: 22px;"></div>
        </div>
        <div style="text-align: center;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase;">Attitude:</span>
          <div style="font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 800; margin-top: 4px;">
            1 &bull; 2 &bull; 3 &bull; 4 &bull; 5
          </div>
        </div>
      </div>

      <!-- Assessment Progress Ledger Table (Expanded Spacing & Clear 26m Totals) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
              <th style="padding: 5px 4px; width: 26px; text-align: center; font-size: 8.5pt; font-weight: 900; border-right: 1px solid #000000;">#</th>
              <th style="padding: 5px 8px; text-align: left; font-size: 8.2pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Enquiry / Lesson Assessment</th>
              <th style="padding: 5px 4px; width: 80px; text-align: center; font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Do Now (10m)</th>
              <th style="padding: 5px 4px; width: 78px; text-align: center; font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Q1(a) (4m)</th>
              <th style="padding: 5px 4px; width: 78px; text-align: center; font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Q1(b) (4m)</th>
              <th style="padding: 5px 4px; width: 80px; text-align: center; font-size: 8.0pt; font-weight: 900; text-transform: uppercase; border-right: 1px solid #000000;">Extended (8m)</th>
              <th style="padding: 5px 6px; width: 82px; text-align: center; font-size: 8.5pt; font-weight: 900; text-transform: uppercase;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            ${enquiriesRowsHtml}
            <tr style="background: #ffffff; font-weight: 900; border-top: 2px solid #000000;">
              <td colspan="2" style="padding: 5px 8px; border-right: 1px solid #000000; text-transform: uppercase; font-size: 8.0pt;">Key Topic ${keyTopicNum} Cumulative Assessment Totals</td>
              <td style="padding: 5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.8pt;">Do Now: <span style="font-size: 9pt; font-weight: 900;">[ &nbsp; <strong>/ 50</strong> ]</span></td>
              <td style="padding: 5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.8pt;">Q1(a): <span style="font-size: 9pt; font-weight: 900;">[ &nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.8pt;">Q1(b): <span style="font-size: 9pt; font-weight: 900;">[ &nbsp; <strong>/ 20</strong> ]</span></td>
              <td style="padding: 5px 4px; border-right: 1px solid #000000; text-align: center; white-space: nowrap; font-size: 7.8pt;">Ext: <span style="font-size: 9pt; font-weight: 900;">[ &nbsp; <strong>/ 40</strong> ]</span></td>
              <td style="padding: 5px 6px; text-align: center; font-size: 10pt; font-weight: 900;">[ &nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 130</strong> ]</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Teacher Feedback Section (WWW & EBI 4 lines each at 7.2mm) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 10px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.6pt; text-transform: uppercase; color: #000000;">
            Teacher Formative Assessment &bull; WWW / EBI Feedback
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.8pt; color: #222222; font-weight: 700;">
            Effort Grade: [ &nbsp;&nbsp;&nbsp;&nbsp; ]
          </span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              What Went Well (WWW):
            </span>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
          </div>
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #000000; text-transform: uppercase; display: block; margin-bottom: 1px;">
              Even Better If (EBI):
            </span>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
            <div class="task-line" style="height: 7.2mm;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000000; padding-top: 2px; margin-top: 3px; font-family: 'Inter', sans-serif; font-size: 7.8pt;">
          <span><strong>Teacher Signature:</strong> ${feedback.signature || '____________________________'}</span>
          <span><strong>Date:</strong> ${feedback.date || '____________________'}</span>
        </div>
      </div>

      <!-- Interactive Quizzing & Revision QR Hub -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 5px 8px; background: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 2px; margin-bottom: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; text-transform: uppercase; color: #000000;">
            📱 Interactive Digital Quizzing Hub &bull; Scan for Instant 20-Question Retrieval Practice
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #222222; font-weight: 700;">
            Scan with smartphone camera to open live interactive 20-question self-marking quizzes
          </span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(${qrLessons.length || 5}, 1fr); gap: 6px; text-align: center;">
          ${qrCardsHtml}
        </div>
      </div>

      ${footerHtml}
    </div>
  </div>`;
}

module.exports = {
  renderStandardFrontCover,
  renderStandardBackCover,
  generateQrSvg,
};
