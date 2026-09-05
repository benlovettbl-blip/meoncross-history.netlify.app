const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'scripts', 'generate_pupil_workbooks.cjs');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Inject the rotating lesson debrief (Idea 1)
// We look for:
// flatQuestions.forEach((q) => (html += q.html));
//
// if (allVideos.length > 0) {
const debriefInjection = `
      // --- PUPIL VOICE (ROTATING DISCIPLINARY DEBRIEF ACROSS ALL UNITS) ---
      const debriefQuestions = [
        "What was the most significant event or decision in today's lesson, and what was its major historical consequence?",
        "What was the most important change that occurred during this period, and what remained continuous (the same)?",
        "How did the events or developments studied today affect different groups of people in contrasting ways?",
        "What piece of historical evidence (e.g. government record, personal diary, photograph) would be most valuable to investigate today's enquiry, and why?",
        "Was the main outcome of today's lesson inevitable, or was there a crucial turning point where events could have taken a different path?",
        "How might two different historians interpret the motives or actions of the key figures or governments studied today?",
        "How does what we studied today connect to, build upon, or challenge an earlier period or theme in history?",
      ];
      
      const q = debriefQuestions[lessonIndex % debriefQuestions.length];
      
      html += \`<div style="margin-top: 20px; page-break-inside: avoid; border: 1.5px solid #1e3a8a; border-radius: 8px; padding: 15px; background-color: #f0fdf4;">
        <h4 style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 11pt; font-family: 'Playfair Display', serif; display: flex; align-items: center;">
          <span style="font-size: 14pt; margin-right: 8px;">🗣️</span> Pupil Voice
        </h4>
        <div style="font-weight: 600; font-size: 9.5pt; margin-bottom: 12px; color: #0f172a;">
          \${q}
        </div>
        <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 18px;"></div>
        <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 18px;"></div>
        <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 18px;"></div>
      </div>\`;
      // --- END PUPIL VOICE ---

`;
code = code.replace(
  /flatQuestions\.forEach\(\(q\) => \(html \+= q\.html\)\);\s*if \(allVideos\.length > 0\)/,
  `flatQuestions.forEach((q) => (html += q.html));\n${debriefInjection}      if (allVideos.length > 0)`,
);

// 2. Inject the Unit Capstone (Idea 2)
// We look for:
//     });
//
//     if (unitId === 'cme_new') {
const capstoneInjection = `
    // --- PUPIL VOICE (END OF UNIT CAPSTONE) ---
    // Generate the holistic pupil voice page at the very end of the booklet
    if (unitId !== 'v2-app' && periodLessons.length > 0) {
      html += \`<div style="page-break-before: always; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-family: 'Playfair Display', serif; color: #1b365d; font-size: 24pt; margin: 0; border-bottom: 3px solid #facc15; display: inline-block; padding-bottom: 5px;">End of Unit: Pupil Voice</h2>
          <p style="color: #475569; font-size: 11pt; margin-top: 10px;">Your feedback helps us improve. Take a moment to reflect on everything you've learned in this booklet.</p>
        </div>

        <div style="margin-bottom: 25px;">
          <strong style="font-size: 11pt; color: #0f172a;">1. Which specific lesson or topic did you enjoy the most this term, and why?</strong>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px; margin-top: 10px;"></div>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px;"></div>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px;"></div>
        </div>

        <div style="margin-bottom: 25px;">
          <strong style="font-size: 11pt; color: #0f172a;">2. Which historical figure or event did you find the most shocking or surprising?</strong>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px; margin-top: 10px;"></div>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px;"></div>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px;"></div>
        </div>

        <div style="margin-bottom: 25px;">
          <strong style="font-size: 11pt; color: #0f172a;">3. What is one topic from this booklet you wish we had spent more time on?</strong>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px; margin-top: 10px;"></div>
          <div style="width: 100%; border-bottom: 1px dotted #94a3b8; height: 22px;"></div>
        </div>

        <div style="margin-bottom: 30px; background-color: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1;">
          <strong style="font-size: 11pt; color: #0f172a; display: block; margin-bottom: 15px; text-align: center;">4. On a scale of 1-10, how confident do you feel about the knowledge in this booklet?</strong>
          <div style="display: flex; justify-content: space-between; padding: 0 20px;">
            <span style="font-weight: bold; color: #ef4444;">1<br><span style="font-size: 8pt; font-weight: normal; color: #64748b;">Not at all</span></span>
            <span>2</span><span>3</span><span>4</span><span>5</span>
            <span style="font-weight: bold; color: #eab308;">6<br><span style="font-size: 8pt; font-weight: normal; color: #64748b;">Okay</span></span>
            <span>7</span><span>8</span><span>9</span>
            <span style="font-weight: bold; color: #22c55e;">10<br><span style="font-size: 8pt; font-weight: normal; color: #64748b;">Very confident</span></span>
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <strong style="font-size: 11pt; color: #0f172a;">5. Visual Reflection:</strong>
          <p style="margin: 5px 0 10px 0; font-size: 9.5pt; color: #475569;">In the box below, draw an image or symbol that comes to mind when you think about this unit of study.</p>
          <div style="width: 100%; height: 250px; border: 2px dashed #94a3b8; border-radius: 8px;"></div>
        </div>

      </div>\`;
    }
    // --- END PUPIL VOICE CAPSTONE ---

`;
code = code.replace(
  /    \}\);\s*if \(unitId === 'cme_new'\) \{/,
  `    });\n${capstoneInjection}    if (unitId === 'cme_new') {`,
);

fs.writeFileSync(filePath, code);
console.log('Workbooks script patched successfully with Pupil Voice injections.');
