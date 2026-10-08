/**
 * scripts/apply_eee_workbook_improvements.cjs
 *
 * Implements user requested improvements to scripts/render_eee_twopage_workbook.cjs:
 * 1. Add featureC to all 12 enquiries in KEY_TOPICS_DATA
 * 2. Update renderFeaturePage:
 *    - Remove Core Specification Vocabulary Distinction
 *    - Add Question 1(c): Describe One Key Feature [2 marks]
 *    - Remove 38mm Draft Sketchpad from Timeline Mission, switch to Medicine-style slim strip
 * 3. Update renderExtendedWritingPages:
 *    - Remove Word Bank and Connectives from workbook (retained in digital app)
 *    - Increase ruled lines from 14 to 17
 * 4. Update renderSynopticVaultPages:
 *    - Add upside-down quick-check answer key on Page 23 for Questions 1–40
 * 5. Update Page 24 Assessment Tracker:
 *    - 4 rows per enquiry (Q1a, Q1b, Q1c, Extended Writing) with merged Homework Deadline
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'render_eee_twopage_workbook.cjs');
let code = fs.readFileSync(targetFile, 'utf8');

// 1. Data for featureC
const FEATURE_C_MAP = {
  lesson_1_1: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.3]',
          stem: 'Describe one key feature of the challenges Elizabeth faced regarding marriage in 1558.',
          guidance:
            'Point (Intense pressure to produce a Protestant heir and secure foreign alliances) &bull; Fact (Marriage to an English noble created factional jealousy; marrying a foreign Catholic prince risked foreign domination like Mary I and Philip II).',
          stems:
            'One key feature was the intense political dilemma over marriage... Specifically, Elizabeth was wary because...',
        },`,
  lesson_1_2: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of the Act of Uniformity (1559).',
          guidance:
            'Point (Enforced identical church worship and prayer book throughout England) &bull; Fact (Made church attendance compulsory on Sundays with a one-shilling recusancy fine and reinstated the 1552 Protestant Book of Common Prayer).',
          stems:
            'One key feature was the legal enforcement of uniform church services... Specifically, the Act established that...',
        },`,
  lesson_1_3: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.3]',
          stem: 'Describe one key feature of the Puritan challenge over crucifixes.',
          guidance:
            'Point (Puritans objected to crucifixes as Catholic idolatry representing graven images) &bull; Fact (Puritan bishops threatened to resign when Elizabeth ordered crucifixes displayed in every church, forcing her to compromise by removing them from parish churches).',
          stems:
            'One key feature was strong Puritan resistance to visual symbols of Catholicism... Specifically, Puritans argued that...',
        },`,
  lesson_1_4: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of Mary, Queen of Scots’ arrival in England in May 1568.',
          guidance:
            'Point (Mary fled Scotland after Protestant nobles defeated her and sought Elizabeth’s military aid) &bull; Fact (Elizabeth placed Mary under house arrest in the north because her presence as a legitimate Catholic claimant threatened English stability).',
          stems:
            'One key feature of Mary’s arrival was the acute security crisis it posed... Specifically, Elizabeth decided to...',
        },`,
  lesson_2_1: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.1]',
          stem: 'Describe one key feature of the Ridolfi Plot (1571).',
          guidance:
            'Point (A conspiracy led by Italian banker Roberto Ridolfi to assassinate Elizabeth and place Mary on the throne) &bull; Fact (Planned for 10,000 Spanish troops under the Duke of Alba to invade; Cecil uncovered the cipher letters and the Duke of Norfolk was executed).',
          stems:
            'One key feature was the conspiracy to depose Elizabeth with Spanish military backing... Specifically, the plotters planned to...',
        },`,
  lesson_2_2: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.2]',
          stem: 'Describe one key feature of English privateering against Spanish treasure fleets.',
          guidance:
            'Point (Elizabeth secretly backed English captains to capture Spanish silver without open declaration of war) &bull; Fact (Captains like Francis Drake held royal letters of marque, bringing vast riches to England and crippling Philip II’s Atlantic supply lines).',
          stems:
            'One key feature was the covert state sponsorship of privateering raids... Specifically, English privateers...',
        },`,
  lesson_2_3: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §1.1]',
          stem: 'Describe one key feature of the Treaty of Joinville (1584).',
          guidance:
            'Point (A secret alliance between Philip II of Spain and the French Catholic League) &bull; Fact (Both parties agreed to eradicate Protestantism, isolating England and removing France as a counterweight against Spanish aggression).',
          stems:
            'One key feature was the secret Catholic alliance signed between Spain and France... Specifically, the Treaty of Joinville meant that...',
        },`,
  lesson_2_4: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of English naval tactics during the Armada campaign.',
          guidance:
            'Point (English ships utilized superior maneuverability and long-range gunnery) &bull; Fact (English race-built galleons kept out of Spanish grappling range, pounding Spanish vessels with culverin broadsides and causing severe damage at Gravelines).',
          stems:
            'One key feature was the reliance on long-distance artillery rather than boarding... Specifically, English commanders...',
        },`,
  lesson_3_1: `        featureC: {
          provenance: 'Edexcel Specification Focus',
          ref: '[Textbook §2.2]',
          stem: 'Describe one key feature of sports and pastimes in Elizabethan England.',
          guidance:
            'Point (Pastimes were strictly divided along social class lines) &bull; Fact (Nobles participated in hunting, hawking, and fencing, while ordinary folk gathered for brutal blood sports like bear-baiting, cock-fighting, and football).',
          stems:
            'One key feature was the clear social division in leisure activities... Specifically, while the nobility engaged in...',
        },`,
  lesson_3_2: `        featureC: {
    provenance: 'Edexcel Specification Focus',
    ref: '[Textbook §1.1]',
    stem: 'Describe one key feature of the distinction between the ‘deserving’ and ‘idle’ poor.',
    guidance:
      'Point (Elizabethan authorities distinguished between those unable to work and those deemed lazy) &bull; Fact (The impotent poor received parish relief and shelter, whereas sturdy beggars and vagabonds were publicly whipped and sent to Houses of Correction).',
    stems:
      'One key feature was the official separation of the poor into two categories... Specifically, the law differentiated between...',
  },`,
  lesson_3_3: `        featureC: {
    provenance: 'Edexcel Specification Focus',
    ref: '[Textbook §2.1]',
    stem: 'Describe one key feature of the search for the Northwest Passage.',
    guidance:
      'Point (English navigators sought an ice-free northern sea route to Asia to bypass Spanish trade routes) &bull; Fact (Explorers Martin Frobisher and John Davis made three expeditions to northern Canada, charting Arctic waters despite failing to reach China).',
    stems:
      'One key feature was the economic motivation to find a northern trade route to Asia... Specifically, explorers like Frobisher...',
  },`,
  lesson_3_4: `        featureC: {
    provenance: 'Edexcel Specification Focus',
    ref: '[Textbook §3.2]',
    stem: 'Describe one key feature of the ‘Lost Colony’ of Roanoke (1587–90).',
    guidance:
      'Point (A second settlement of 117 men, women, and children led by John White disappeared completely) • Fact (Delayed by the Spanish Armada, White returned in 1590 to find the fort abandoned with only the word ‘CROATOAN’ carved into a palisade post).',
    stems:
      'One key feature was the complete and mysterious disappearance of the second colony... Specifically, when John White returned in 1590...',
  },`,
};

// Insert featureC into each lesson
for (const [lessonId, featCCode] of Object.entries(FEATURE_C_MAP)) {
  const lessonRegex = new RegExp(
    `(id:\\s*'${lessonId}'[\\s\\S]*?featureB:\\s*\\{[\\s\\S]*?\\},)`,
    'g',
  );
  code = code.replace(lessonRegex, `$1\n${featCCode}`);
}

// 2. Replace renderFeaturePage implementation
const newRenderFeaturePage = `function renderFeaturePage(enq, pageNum, quip, keyTopicNum) {
  const featAProb = enq.featureA.probability || '★ HIGH PROBABILITY';
  const featBProb = enq.featureB.probability || 'CORE SPECIFICATION FOCUS';
  const featCProb = enq.featureC?.probability || 'HIGH-YIELD SPECIFICATION FOCUS';

  return \`
  <!-- SHORT-TARIFF EXAM PRACTICE: 3x Q1 FEATURE [2m+2m+2m] + TIMELINE MISSION (PAGE \${pageNum}) -->
  <div class="page page-container recto-page" id="page-\${pageNum}" style="padding: 3.5mm 6mm 2.5mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      
      <!-- Top Exam Header -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
            KEY TOPIC \${keyTopicNum}.\${enq.enquiryNum} &bull; SHORT-TARIFF EXAM PRACTICE
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
            EDEXCEL PAPER 2 &bull; FACTUAL RECALL (AO1)
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 1px 0 0 0; font-weight: 900; line-height: 1.2;">
            Question 1 Practice: Describe Three Key Features [3 &times; 2 marks &bull; 9 mins]
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; border: 1.2px solid #000000; padding: 1px 5px; border-radius: 2px;">
            Total Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 6 ]
          </span>
        </div>
      </div>

      <!-- Question 1(a): Describe One Key Feature [2 marks] -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 1.5px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; Question 1(a): Describe One Key Feature [2 marks &bull; 3 mins]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
              \${featAProb}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            \${enq.featureA.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.18;">
          \${enq.featureA.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> \${enq.featureA.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> \${enq.featureA.stems}
        </div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
      </div>

      <!-- Question 1(b): Describe One Key Feature [2 marks] -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 1.5px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; Question 1(b): Describe One Key Feature [2 marks &bull; 3 mins]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
              \${featBProb}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            \${enq.featureB.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.18;">
          \${enq.featureB.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> \${enq.featureB.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> \${enq.featureB.stems}
        </div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
      </div>

      <!-- Question 1(c): Describe One Key Feature [2 marks] -->
      <div class="task-section" style="border: 1.2px solid #000000; border-radius: 3px; padding: 3px 6px; background: #ffffff; margin-bottom: 2px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1.5px; margin-bottom: 1.5px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 8.2pt; text-transform: uppercase; letter-spacing: 0.5px;">
              &bull; Question 1(c): Describe One Key Feature [2 marks &bull; 3 mins]
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 4px; border-radius: 2px;">
              \${featCProb}
            </span>
          </div>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f8fafc;">
            \${enq.featureC?.provenance || 'EDEXCEL PAPER 2'}
          </span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 9.0pt; font-weight: 800; color: #000000; margin: 1px 0 2px 0; line-height: 1.18;">
          \${enq.featureC?.stem}
        </p>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-style: italic; color: #333333; margin-bottom: 1px; line-height: 1.15;">
          <strong>Target Guidance:</strong> \${enq.featureC?.guidance}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; margin-bottom: 2px;">
          <strong>Sentence Stems:</strong> \${enq.featureC?.stems}
        </div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
        <div class="task-line" style="height: 6.5mm;"></div>
      </div>

      <!-- Timeline Mission (Medicine-Style Analytical Navigation Strip) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-top: 2px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px; text-transform: uppercase; white-space: nowrap;">
            Timeline Mission
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; color: #000000; line-height: 1.2;">
            \${enq.rightExam.timelineMission}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; white-space: nowrap; margin-left: 8px;">
          &larr; Pages 2–3
        </span>
      </div>

      \${renderFooterStrip(pageNum, quip, 24)}
    </div>
  </div>\`;
}`;

// Replace renderFeaturePage
const renderFeaturePageRegex =
  /function renderFeaturePage\(enq, pageNum, quip, keyTopicNum\) \{[\s\S]*?\n\}/;
code = code.replace(renderFeaturePageRegex, newRenderFeaturePage);

// 3. Replace renderExtendedWritingPages
const newRenderExtendedWritingPages = `function renderExtendedWritingPages(enq, leftPageNum, rightPageNum, footers, keyTopicNum) {
  const rx = enq.rightExam;
  const is12m = rx.type === 'explain_why_12';
  const maxScore = is12m ? '12' : '20';
  const rightProb = rx.probability || '★ HIGH-YIELD FORECAST';

  // 17 Ruled lines for first page (Word Bank omitted from workbook; preserved in digital app)
  const leftTaskLines = Array.from(
    { length: 17 },
    () => \`
      <div class="lined-row">
        <div class="lined-margin-cell">&nbsp;</div>
        <div class="lined-content-cell">&nbsp;</div>
      </div>\`,
  ).join('');

  // 28 Ruled lines for continuation page
  const rightTaskLines = Array.from({ length: 28 }, (_, lIdx) => {
    const isFirst = lIdx === 0;
    const marginContent = isFirst
      ? \`<span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #555555; text-transform: uppercase; font-weight: 700;">Margin</span>\`
      : \`&nbsp;\`;
    const linePrompt = isFirst
      ? \`<span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-style: italic; color: #777777;">[ Extended Writing Continued &bull; Paragraph 2/3 &amp; Final Sustained Conclusion ]</span>\`
      : \`&nbsp;\`;
    return \`
        <div class="lined-row">
          <div class="lined-margin-cell">\${marginContent}</div>
          <div class="lined-content-cell">\${linePrompt}</div>
        </div>\`;
  }).join('');

  return \`
  <!-- EXTENDED WRITING PART 1 (VERSO - PAGE \${leftPageNum}) -->
  <div class="page page-container verso-page" id="page-\${leftPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Exam Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;">
        <div style="display: flex; align-items: baseline; gap: 6px;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; margin: 0; font-weight: 800;">
            \${rx.tariff}
          </h2>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px; background: #f1f5f9; text-transform: uppercase;">
            \${rx.provenance || 'EDEXCEL PAPER 2'}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 900; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px;">
            \${rightProb}
          </span>
        </div>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; border: 1.2px solid #000000; padding: 0 5px; border-radius: 2px;">
          Score: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / \${maxScore} ]
        </span>
      </div>

      <!-- Question Stem & Stimulus -->
      <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; margin-bottom: 3px;">
        <p style="font-family: 'Playfair Display', serif; font-size: 9.6pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.22;">
          \${rx.stem}
        </p>
        <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.6pt; color: #000000; background: #f8fafc; border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 2px;">
          <strong>You may use in your answer:</strong>
          <span>&bull; \${rx.stimulus[0]}</span>
          <span>&bull; \${rx.stimulus[1]}</span>
          <span style="font-style: italic; color: #1e3a8a; font-weight: 700;">(You must also use information of your own.)</span>
        </div>
      </div>

      <!-- 3-Column Mastery Structure Strip -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 2px;">
        \${rx.structureStrip
          .map(
            (col, cIdx) => \`
        <div style="border: 1.2px solid #000000; border-radius: 3px; padding: 2px 4px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000000; padding-bottom: 1px; margin-bottom: 1px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.0pt; text-transform: uppercase; color: #000000;">
              \${col.col}
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; border: 1px solid #000000; padding: 0 3px; border-radius: 2px; background: #f8fafc;">POINT \${cIdx + 1}</span>
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #111111; margin: 0; line-height: 1.15;">
            \${col.text}
          </p>
        </div>
        \`,
          )
          .join('')}
      </div>

      <!-- Ruled Task Lines Prompt -->
      <div style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-style: italic; color: #222222; margin: 2px 0 1px 0;">
        <strong>Task:</strong> Using the structure strip above, write your analytical response below (continue on facing page for full timed response):
      </div>

      <!-- 17 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid" style="flex: 1; min-height: 0;">
        \${leftTaskLines}
      </div>

      \${renderFooterStrip(leftPageNum, footers[leftPageNum - 1], 24)}
    </div>
  </div>

  <!-- EXTENDED WRITING PART 2 (RECTO - PAGE \${rightPageNum}) -->
  <div class="page page-container recto-page" id="page-\${rightPageNum}" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <!-- Running Header -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 4px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #000000; margin: 0; font-weight: 800;">
          Enquiry \${keyTopicNum}.\${enq.enquiryNum}: \${enq.title} &bull; \${rx.tariff.split(':')[0]} Continued
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
          Independent Timed Response &bull; Final Historical Verdict
        </span>
      </div>

      <!-- 28 Ruled Lines with 22mm Left Margin -->
      <div class="lined-page-grid" style="flex: 1; min-height: 0;">
        \${rightTaskLines}
      </div>

      \${renderFooterStrip(rightPageNum, footers[rightPageNum - 1], 24)}
    </div>
  </div>\`;
}`;

const renderExtendedWritingPagesRegex =
  /function renderExtendedWritingPages\(enq, leftPageNum, rightPageNum, footers, keyTopicNum\) \{[\s\S]*?\n\}/;
code = code.replace(renderExtendedWritingPagesRegex, newRenderExtendedWritingPages);

// 4. Update renderSynopticVaultPages to include upside-down answer key on Page 23
const newRenderSynopticVaultPages = `function renderSynopticVaultPages(data, footers) {
  const enq1 = data.enquiries[0];
  const enq2 = data.enquiries[1];
  const enq3 = data.enquiries[2];
  const enq4 = data.enquiries[3];

  function renderDrillColumn(enq, startNum) {
    return \`
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; border: 1.2px solid #000000; border-radius: 4px; padding: 3px 6px; background: #ffffff;">
        <div style="border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 2px; display: flex; justify-content: space-between; align-items: center;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.0pt; text-transform: uppercase; color: #000000;">
            Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; border: 1px solid #000000; padding: 0 4px; border-radius: 2px;">
            [ &nbsp;&nbsp;&nbsp;&nbsp; / 10 ]
          </span>
        </div>
        <div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between; min-height: 0;">
          \${enq.doNow
            .map(
              (item, qi) => \`
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding-top: 1px; min-height: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 4px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 7.3pt; font-weight: 700; color: #000000; line-height: 1.15;">
                \${startNum + qi}. \${item.q}
              </span>
              <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; color: #555555; white-space: nowrap; flex-shrink: 0; padding-top: 1px;">
                [ ] R1 &nbsp; [ ] R2 &nbsp; [ ] R3
              </span>
            </div>
            <div style="flex: 1; min-height: 2.2mm;"></div>
            <div style="border-bottom: 1.2px dotted #000000; width: 100%; margin-bottom: 1px;"></div>
          </div>
          \`,
            )
            .join('')}
        </div>
      </div>\`;
  }

  // Generate 40-question answers for upside-down key
  const ans1 = enq1.doNow.map((item, idx) => \`<strong>\${1 + idx}.</strong> \${item.a}\`).join(' &bull; ');
  const ans2 = enq2.doNow.map((item, idx) => \`<strong>\${11 + idx}.</strong> \${item.a}\`).join(' &bull; ');
  const ans3 = enq3.doNow.map((item, idx) => \`<strong>\${21 + idx}.</strong> \${item.a}\`).join(' &bull; ');
  const ans4 = enq4.doNow.map((item, idx) => \`<strong>\${31 + idx}.</strong> \${item.a}\`).join(' &bull; ');

  // Page 22 (Enquiries 1 & 2)
  const page22Html = \`
  <!-- PAGE 22: SYNOPTIC RETRIEVAL VAULT PART 1 (ENQUIRIES 1 & 2) -->
  <div class="page page-container verso-page" id="page-22" style="padding: 4mm 6mm;">
    <div class="page-body-full">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
              KEY TOPIC \${data.keyTopicNum} &bull; SYNOPTIC RETRIEVAL VAULT &bull; PART 1
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              SPACED RETRIEVAL DRILLS &bull; DO NOW QUESTIONS 1–20
            </span>
          </div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; font-weight: 900;">
            Cumulative Specification Recall: Enquiries \${data.keyTopicNum}.1 &amp; \${data.keyTopicNum}.2
          </h2>
        </div>

        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
          <strong>Classroom Protocol:</strong> Complete 5–10 questions as a Do Now bell-ringer at the start of each lesson, or quiz yourself across the term. Tick the review checkboxes (<strong>R1, R2, R3</strong>) after each spaced retrieval attempt.
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; min-height: 0;">
        \${renderDrillColumn(enq1, 1)}
        \${renderDrillColumn(enq2, 11)}
      </div>

      \${renderFooterStrip(22, footers[21], 24)}
    </div>
  </div>\`;

  // Page 23 (Enquiries 3 & 4 + Upside-down Quick-Check Answer Key)
  const page23Html = \`
  <!-- PAGE 23: SYNOPTIC RETRIEVAL VAULT PART 2 (ENQUIRIES 3 & 4) -->
  <div class="page page-container recto-page" id="page-23" style="padding: 4mm 6mm;">
    <div class="page-body-full" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 3px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; border: 1.2px solid #000000; padding: 1px 6px; border-radius: 2px;">
              KEY TOPIC \${data.keyTopicNum} &bull; SYNOPTIC RETRIEVAL VAULT &bull; PART 2
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; text-transform: uppercase; color: #000000;">
              SPACED RETRIEVAL DRILLS &bull; DO NOW QUESTIONS 21–40
            </span>
          </div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 11pt; color: #000000; font-weight: 900;">
            Cumulative Specification Recall: Enquiries \${data.keyTopicNum}.3 &amp; \${data.keyTopicNum}.4
          </h2>
        </div>

        <div style="border: 1px solid #000000; border-left: 3.5px solid #000000; padding: 2px 6px; background: #f8fafc; margin-bottom: 3px; font-family: 'Inter', sans-serif; font-size: 7.2pt; line-height: 1.2;">
          <strong>Spaced Retention Target:</strong> Test yourself on previous weeks’ topics before starting a new enquiry. Frequent low-stakes retrieval prevents forgetting and secures Level 4 factual precision.
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1; min-height: 0;">
        \${renderDrillColumn(enq3, 21)}
        \${renderDrillColumn(enq4, 31)}
      </div>

      <!-- Upside-Down Quick-Check Answer Key (Rotated 180° for self-marking in green pen) -->
      <div style="transform: rotate(180deg); margin: 3px 0 1px 0; border: 1.2px solid #000000; border-radius: 3px; padding: 2.5px 6px; background: #f8fafc; font-family: 'Inter', sans-serif; font-size: 5.3pt; line-height: 1.22; color: #1e293b; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 0.8px solid #000000; padding-bottom: 1px; margin-bottom: 1.5px;">
          <strong style="text-transform: uppercase; font-size: 5.6pt; color: #000000; letter-spacing: 0.3px;">
            🔄 Quick-Check Answer Key &bull; Key Topic \${data.keyTopicNum} Synoptic Vault (Questions 1–40)
          </strong>
          <span style="font-size: 4.8pt; font-style: italic; color: #64748b;">Rotate booklet 180&deg; to self-mark retrieval drills in green pen</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5px 8px;">
          <div><strong style="color: #000000;">Enquiry \${data.keyTopicNum}.1 (Q1–10):</strong> \${ans1}</div>
          <div><strong style="color: #000000;">Enquiry \${data.keyTopicNum}.2 (Q11–20):</strong> \${ans2}</div>
          <div><strong style="color: #000000;">Enquiry \${data.keyTopicNum}.3 (Q21–30):</strong> \${ans3}</div>
          <div><strong style="color: #000000;">Enquiry \${data.keyTopicNum}.4 (Q31–40):</strong> \${ans4}</div>
        </div>
      </div>

      \${renderFooterStrip(23, footers[22], 24)}
    </div>
  </div>\`;

  return page22Html + page23Html;
}`;

const renderSynopticVaultPagesRegex =
  /function renderSynopticVaultPages\(data, footers\) \{[\s\S]*?\n\}/;
code = code.replace(renderSynopticVaultPagesRegex, newRenderSynopticVaultPages);

// 5. Update Page 24 examRowsHtml to include Q1(a), Q1(b), Q1(c), and Extended Writing (4 rows per enquiry)
const oldExamRowsPattern =
  /let examRowsHtml = '';[\s\S]*?data\.enquiries\.forEach\(\(enq, idx\) => \{[\s\S]*?examRowsHtml \+= `[\s\S]*?<\/tr>\s*`;\s*\}\);/;

const newExamRowsCode = `let examRowsHtml = '';

  data.enquiries.forEach((enq, idx) => {
    const leftPageNum = idx * 4 + 4;
    const rightPageNum = idx * 4 + 5;
    const extTariff = enq.rightExam.type === 'explain_why_12' ? 12 : 16;
    const extLabel = enq.rightExam.type === 'explain_why_12' ? 'Q2 Explain Why' : 'Q3 Essay';

    const featAText = cleanStem(enq.featureA?.stem);
    const featBText = cleanStem(enq.featureB?.stem);
    const featCText = cleanStem(enq.featureC?.stem);
    let extText = enq.rightExam?.stem || 'Extended Writing Task';
    if (extText.length > 70) extText = extText.slice(0, 67) + '...';

    examRowsHtml += \`
      <tr style="border-top: 1.5px solid #000000; border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td rowspan="4" style="padding: 3px 4px; text-align: center; font-weight: 900; font-size: 8.5pt; border-right: 1.2px solid #000000; vertical-align: middle; background: #f8fafc;">
          \${data.keyTopicNum}.\${enq.enquiryNum}
        </td>
        <td rowspan="4" style="padding: 3px 8px; border-right: 1.2px solid #000000; vertical-align: middle; background: #ffffff;">
          <strong style="font-size: 8.0pt; text-transform: uppercase; color: #000000; display: block; line-height: 1.2;">
            Enquiry \${data.keyTopicNum}.\${enq.enquiryNum}: \${enq.title}
          </strong>
          <span style="font-size: 7.2pt; color: #475569; display: block; margin-top: 2px;">
            Do Now Retrieval (p. \${leftPageNum}): [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 10</strong> ]
          </span>
        </td>
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(a) Feature:</strong> \${featAText} [2m]
        </td>
        <td rowspan="4" style="padding: 4px 6px; text-align: center; border-right: 1.2px solid #000000; font-size: 8.5pt; font-weight: 800; vertical-align: middle; background: #ffffff;">
          [ &nbsp;&nbsp;&nbsp;<strong>___ / ___</strong>&nbsp;&nbsp;&nbsp; ]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(b) Feature:</strong> \${featBText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>Q1(c) Feature:</strong> \${featCText} [2m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ 2</strong> ]
        </td>
      </tr>
      <tr style="border-bottom: 1.5px solid #000000; background: #ffffff;">
        <td style="padding: 3px 4px; text-align: center; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 800; background: #fafafa;">
          p. \${rightPageNum}
        </td>
        <td style="padding: 3px 8px; border-right: 1px solid #000000; font-size: 7.4pt; font-weight: 600;">
          <strong>\${extLabel}:</strong> \${extText} [\${extTariff}m]
        </td>
        <td style="padding: 3px 6px; text-align: center; font-size: 9.0pt; font-weight: 800; white-space: nowrap;">
          [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>/ \${extTariff}</strong> ]
        </td>
      </tr>
    \`;
  });`;

code = code.replace(oldExamRowsPattern, newExamRowsCode);

fs.writeFileSync(targetFile, code, 'utf8');
console.log(
  '✅ Successfully applied workbook improvements to scripts/render_eee_twopage_workbook.cjs',
);
