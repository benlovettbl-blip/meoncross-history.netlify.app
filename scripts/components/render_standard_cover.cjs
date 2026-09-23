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

/**
 * Renders the Standard Outside Back Cover for Key Stage 3 Workbooks (Page 16, 20, or 24)
 * - Strict institutional neutrality (data-department-name customizer standard)
 * - Target Grade, Class, and Target Level header strip
 * - Full KS3 Attainment Criteria (Emerging, Developing, Secure, Advanced, Mastery) & Effort Rubric (1-5)
 * - Dynamic Lesson Assessment Ledger Table (supporting 6, 8, 9, or 10 lessons)
 * - Teacher Formative Feedback (WWW & EBI handwriting lines)
 * - Dynamic Digital Quizzing & Revision QR Hub (supporting 6, 8, or N individual lesson QR cards)
 * - Institutional Colophon & Reprographics Notice
 */
function renderKs3BackCover({
  unitId = 'early_modern_world',
  unitTitle = 'THE EARLY MODERN WORLD (1450–1750)',
  yearGroup = 'Year 8',
  trackerTitle = 'Progress & Assessment Record',
  trackerSubtitle = 'Key Stage 3 Historical Studies • Termly Evidence Ledger',
  pupil = {},
  lessons = [],
  feedback = {
    signature: '____________________________',
    date: '___/___/2026',
  },
  qrLessons = [],
  footerQuip = '',
  totalPageCount = 20,
  pageHeight = '256mm',
  renderFooterStrip = null,
}) {
  const qrColumnCount = qrLessons.length > 6 ? 8 : qrLessons.length || 6;

  const qrCardsHtml = qrLessons
    .map((qrItem, idx) => {
      const qrSvg = generateQrSvg(qrItem.url);
      const subLabelHtml = qrItem.subLabel
        ? `<div style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 600; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; margin-top: -1px; margin-bottom: 1px;">${qrItem.subLabel}</div>`
        : '';
      return `
        <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 2px 2px; background: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-width: 0;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">
            ${qrItem.label || `L${idx + 1}`}
          </div>
          ${subLabelHtml}
          <div style="width: 15mm; height: 15mm; margin: 1px auto;">
            ${qrSvg}
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 700; color: #1e3a8a; line-height: 1;">
            Scan to Quiz
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #0f172a; margin-top: 1px; white-space: nowrap;">
            [ &nbsp; <strong>/ ${qrItem.questionCount || 20}</strong> ]
          </div>
        </div>`;
    })
    .join('\n');

  const padY = lessons.length <= 6 ? '3.5px' : '2.8px';
  const lessonRowsHtml = lessons
    .map((l, idx) => {
      const isEven = idx % 2 === 1;
      return `
        <tr style="border-bottom: 1px solid #cbd5e1; background: ${isEven ? '#f8fafc' : '#ffffff'}; font-size: 7.6pt;">
          <td style="padding: ${padY} 4px; border-right: 1px solid #94a3b8; text-align: center; font-weight: 800; color: #1e3a8a; font-size: 7.8pt;">
            L${l.num || idx + 1}
          </td>
          <td style="padding: ${padY} 6px; border-right: 1px solid #94a3b8; font-weight: 700; line-height: 1.2; color: #0f172a; font-size: 7.8pt;">
            ${l.title || `Enquiry ${idx + 1}`}
          </td>
          <td style="padding: ${padY} 4px; border-right: 1px solid #94a3b8; text-align: center; color: #334155; font-size: 7.3pt; font-weight: 600;">
            ${l.skill || 'Analysis'}
          </td>
          <td style="padding: ${padY} 4px; border-right: 1px solid #94a3b8; text-align: center; font-weight: 800; color: #1e3a8a; font-size: 8.0pt; white-space: nowrap;">
            [ &nbsp;&nbsp; <strong>/ 5</strong> ]
          </td>
          <td style="padding: ${padY} 4px; border-right: 1px solid #94a3b8; text-align: center; font-weight: 800; font-size: 8.0pt; white-space: nowrap;">
            [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
          </td>
          <td style="padding: ${padY} 4px; border-right: 1px solid #94a3b8; text-align: center; font-size: 7.2pt; color: #475569; font-weight: 600; white-space: nowrap;">
            1 &bull; 2 &bull; 3 &bull; 4 &bull; 5
          </td>
          <td style="padding: ${padY} 6px; font-size: 7.2pt; color: #334155;">
            &nbsp;
          </td>
        </tr>`;
    })
    .join('\n');

  const footerHtml = renderFooterStrip
    ? renderFooterStrip(totalPageCount, footerQuip, totalPageCount)
    : `
      <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; display: flex; justify-content: space-between; border-top: 1.2px solid #cbd5e1; padding-top: 3px; margin-top: 2px;">
        <span>The History Department &bull; KS3 Assessment Record &bull; ${yearGroup}</span>
        <span>Page ${totalPageCount}</span>
      </div>`;

  return `
  <!-- ====================================================================
       PAGE ${totalPageCount}: BACK COVER (KS3 Assessment Record & Digital Quizzing Hub)
       ==================================================================== -->
  <div class="page page-container verso-page" id="page-${totalPageCount}" style="padding: 10px 14px; display: flex; flex-direction: column; justify-content: space-between; height: ${pageHeight}; border: 1px solid #cbd5e1; outline: 3.5px double #0f172a; outline-offset: -8px; box-sizing: border-box;">
    
    <!-- Top Branding Strip -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 2px; margin-bottom: 3px;" data-department-name="The History Department">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #0f172a;">The History Department</span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #475569;">Key Stage 3 History &bull; Pupil Assessment Record</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #cbd5e1; padding-top: 2px;">
        <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #1e3a8a;">UNIT: ${unitTitle.toUpperCase()}</span>
      </div>
    </div>

    <!-- Pupil Name, Class & Target Level (Open & Spacious for Large Handwriting - No Restrictive Box) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 4px 2px 5px 2px; margin-bottom: 3px;">
      <div style="display: flex; align-items: baseline; flex: 2; margin-right: 20px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-right: 6px; white-space: nowrap;">Pupil Name:</strong>
        <span style="flex: 1; border-bottom: 1.4px solid #0f172a; height: 16px; display: inline-block;"></span>
      </div>
      <div style="display: flex; align-items: baseline; flex: 1; margin-right: 20px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-right: 6px; white-space: nowrap;">Class:</strong>
        <span style="flex: 1; border-bottom: 1.4px solid #0f172a; height: 16px; display: inline-block;"></span>
      </div>
      <div style="display: flex; align-items: baseline; width: 140px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; font-weight: 800; text-transform: uppercase; color: #0f172a; margin-right: 6px; white-space: nowrap;">Target Level:</strong>
        <span style="flex: 1; border-bottom: 1.4px solid #0f172a; height: 16px; display: inline-block;"></span>
      </div>
    </div>

    <!-- KS3 Attainment Criteria & Effort Scale Box -->
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.2; margin-bottom: 3px; border: 1.2px solid #0f172a;">
      <tbody>
        <tr style="background: #1e3a8a; color: #fff;">
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; font-weight: 800; width: 11%; text-transform: uppercase;">KS3 Pathway</td>
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; width: 17.8%; background: #f8fafc; color: #0f172a;"><strong>Emerging (1–2):</strong> Isolated facts; basic descriptive recall.</td>
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; width: 17.8%; background: #ffffff; color: #0f172a;"><strong>Developing (3):</strong> Identifies causes &amp; features with simple explanation.</td>
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; width: 17.8%; background: #f8fafc; color: #0f172a;"><strong>Secure (4–5):</strong> Structured PEEL arguments with precise facts.</td>
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; width: 17.8%; background: #ffffff; color: #0f172a;"><strong>Advanced (6–7):</strong> Evaluates competing causes; nuanced explanation.</td>
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; width: 17.8%; background: #f8fafc; color: #0f172a;"><strong>Mastery (8–9):</strong> Sustained historical criteria &amp; historiographical verdicts.</td>
        </tr>
        <tr style="background: #0f172a; color: #fff;">
          <td style="border: 1px solid #0f172a; padding: 2.5px 5px; font-weight: 800; text-transform: uppercase;">Effort Rubric</td>
          <td style="border: 1px solid #0f172a; padding: 2px 5px; background: #fff; color: #111;"><strong>1 &bull; Concern:</strong> Incomplete work.</td>
          <td style="border: 1px solid #0f172a; padding: 2px 5px; background: #fafafa; color: #111;"><strong>2 &bull; Inconsistent:</strong> Needs prompts.</td>
          <td style="border: 1px solid #0f172a; padding: 2px 5px; background: #fff; color: #111;"><strong>3 &bull; Satisfactory:</strong> Meets baseline.</td>
          <td style="border: 1px solid #0f172a; padding: 2px 5px; background: #fafafa; color: #111;"><strong>4 &bull; Good:</strong> Thoughtful scholar.</td>
          <td style="border: 1px solid #0f172a; padding: 2px 5px; background: #fff; color: #111;"><strong>5 &bull; Exemplary:</strong> Exceptional pride.</td>
        </tr>
      </tbody>
    </table>

    <!-- Master Assessment Tracking Ledger Table -->
    <div style="border: 1.3px solid #0f172a; border-radius: 4px; overflow: hidden; margin-bottom: 3px;">
      <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif;">
        <thead>
          <tr style="background: #1e3a8a; color: #ffffff; font-size: 7.6pt;">
            <th style="padding: 3.5px 4px; width: 24px; text-align: center; font-weight: 900; border-right: 1px solid rgba(255,255,255,0.4);">#</th>
            <th style="padding: 3.5px 6px; text-align: left; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4); width: 38%;">Enquiry Title</th>
            <th style="padding: 3.5px 4px; width: 72px; text-align: center; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4);">Historical Skill</th>
            <th style="padding: 3.5px 4px; width: 54px; text-align: center; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4);">Do Now</th>
            <th style="padding: 3.5px 4px; width: 70px; text-align: center; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4);">Task 4 Grade</th>
            <th style="padding: 3.5px 4px; width: 62px; text-align: center; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.4);">Effort</th>
            <th style="padding: 3.5px 6px; text-align: left; font-weight: 900; text-transform: uppercase;">Teacher Feedback</th>
          </tr>
        </thead>
        <tbody>
          ${lessonRowsHtml}
          <tr style="background: #e2e8f0; font-weight: 900; border-top: 1.5px solid #0f172a; font-size: 7.6pt;">
            <td colspan="3" style="padding: 3.5px 6px; border-right: 1px solid #94a3b8; text-transform: uppercase; color: #0f172a;">
              Unit Summative Outcome
            </td>
            <td style="padding: 3.5px 3px; border-right: 1px solid #94a3b8; text-align: center; background: #ffffff; color: #1e3a8a; font-size: 8.2pt;">[ &nbsp; / ${lessons.length * 5} ]</td>
            <td style="padding: 3.5px 3px; border-right: 1px solid #94a3b8; text-align: center; background: #ffffff; font-size: 8.2pt;">[ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</td>
            <td style="padding: 3.5px 3px; border-right: 1px solid #94a3b8; text-align: center; background: #ffffff; font-size: 7.4pt;">[ 1 2 3 4 5 ]</td>
            <td style="padding: 3.5px 6px; background: #ffffff; font-size: 7.2pt; color: #334155;">
              Signed: __________________________ &bull; Date: ___/___/2026
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Teacher Feedback Section (WWW & EBI handwriting lines) -->
    <div style="border: 1.3px solid #0f172a; border-radius: 4px; padding: 3px 8px; background: #ffffff; margin-bottom: 3px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.4pt; text-transform: uppercase; color: #0f172a;">
          Overall Unit Formative Assessment &amp; Academic Guidance
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 700; color: #64748b;">KEY STAGE 3 MASTERY</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #1e3a8a; display: block; margin-bottom: 1px;">
            What Went Well (WWW):
          </strong>
          <div class="task-line" style="height: 6.0mm;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #b91c1c; display: block; margin-bottom: 1px;">
            Even Better If (EBI):
          </strong>
          <div class="task-line" style="height: 6.0mm;"></div>
          <div class="task-line" style="height: 6.0mm;"></div>
        </div>
      </div>
    </div>

    <!-- Digital Revision & Interactive Quizzing Hub (QR Grid for all Lessons) -->
    <div style="border: 1.4px solid #0f172a; border-radius: 4px; padding: 3px 6px; background: #fdfbf7; margin-bottom: 2px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #0f172a; padding-bottom: 1px; margin-bottom: 3px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.3pt; text-transform: uppercase; color: #0f172a;">
          📱 Interactive Digital Quizzing Hub &bull; Scan for Instant Self-Marking Quizzes (${qrLessons.length} Lessons &bull; ${qrLessons.length * (qrLessons[0]?.questionCount || 20)} Questions)
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #475569;">Instant Recall Practice</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(${qrColumnCount}, 1fr); gap: 3.5px; text-align: center;">
        ${qrCardsHtml}
      </div>
    </div>

    <!-- Summer Assessment Revision Protocol: Cognitive Science & Retrieval Techniques -->
    <div style="border: 1.3px solid #1e3a8a; border-radius: 4px; padding: 4px 8px; background: #f0fdf4; margin-bottom: 2px;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #bbf7d0; padding-bottom: 2px; margin-bottom: 3px;">
        <strong style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; color: #166534; letter-spacing: 0.5px;">
          🎯 Summer Assessment Revision Protocol &bull; 4 Evidence-Based Retrieval Techniques
        </strong>
        <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; color: #15803d; text-transform: uppercase;">Cognitive Science in Practice</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-family: 'Inter', sans-serif;">
        <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-size: 7.1pt; color: #166534; display: block; margin-bottom: 1px;">1. Spaced Flash Quizzing</strong>
          <span style="font-size: 6.5pt; color: #334155; line-height: 1.22; display: block;">Scan each QR code weekly. Retest until you score 100% on factual recall before checking your workbook notes.</span>
        </div>
        <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-size: 7.1pt; color: #166534; display: block; margin-bottom: 1px;">2. Dual-Coding Timeline Walk</strong>
          <span style="font-size: 6.5pt; color: #334155; line-height: 1.22; display: block;">Turn to Pages 2–3. Cover the written text and narrate the historical story aloud using only your sketchpad symbols.</span>
        </div>
        <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-size: 7.1pt; color: #166534; display: block; margin-bottom: 1px;">3. 5-Minute Brain Dumps</strong>
          <span style="font-size: 6.5pt; color: #334155; line-height: 1.22; display: block;">Pick an enquiry question. Spend 5 uninterrupted minutes writing every name, date, and cause from memory.</span>
        </div>
        <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 3px; padding: 3px 5px;">
          <strong style="font-size: 7.1pt; color: #166534; display: block; margin-bottom: 1px;">4. Causal Connective Drills</strong>
          <span style="font-size: 6.5pt; color: #334155; line-height: 1.22; display: block;">Draft 3 PEEL sentences explaining <em>why</em> an event happened using: <em>Consequently... This directly resulted in...</em></span>
        </div>
      </div>
    </div>

    ${footerHtml}
  </div>`;
}

module.exports = {
  renderStandardFrontCover,
  renderStandardBackCover,
  renderKs3BackCover,
  generateQrSvg,
};
