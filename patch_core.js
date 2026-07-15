const fs = require('fs');

const corePath = 'src/core_app.js';
let core = fs.readFileSync(corePath, 'utf8');

// 1. Fix Historians Corner hc.text
if (core.includes('${hc.text}')) {
  core = core.replace(
    '<p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${hc.text}</p>',
    '<p style="font-size: 1.05rem; line-height: 1.6; color: #334155; margin-bottom: 20px;">${hc.text || (hc.author_context + "<br><br><i>" + hc.extract + "</i>")}</p>'
  );
}

// 2. Remove stretch response textarea
const textareaStr = '<textarea class="student-answer-input" placeholder="Write your stretch response here..." oninput="window.updateProgress()"></textarea>';
if (core.includes(textareaStr)) {
  core = core.replace(textareaStr, '');
}

// 3. Fix embedded task reveal answer
const oldReveal = 'onclick="this.nextElementSibling.classList.toggle(\'revealed\')"';
const newReveal = 'onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === \'none\' ? \'block\' : \'none\'"';
if (core.includes(oldReveal)) {
  core = core.replace(oldReveal, newReveal);
}

// 4. Fix image paths in narrative blocks
const oldContentStr = 'let contentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.text}</em>` : highlightGlossary(block.text);';
const newContentStr = 'let contentStr = isQuote ? `<em style="font-size:1.1rem; color:#475569;">${block.text}</em>` : highlightGlossary(block.text);\n        contentStr = contentStr.replace(/src=["\'](\\.\\/)?assets\\//g, \'src="/\' + window.currentUnitId + \'/assets/\');';
if (core.includes(oldContentStr) && !core.includes('contentStr.replace(/src=')) {
  core = core.replace(oldContentStr, newContentStr);
}

// 5. Add Timeline Do Now support
const oldRetrieval = 'if (lesson.do_now && lesson.do_now.items) {';
const newRetrieval = `if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
      html += \`
        <div class="phase-card" id="phase-\${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Phase \${phaseNum++}: Chronological Timeline</div>
          </div>
          <div style="margin-bottom: 20px; font-size: 1.1rem; color: #1e3a8a;"><strong>\${lesson.do_now.prediction_question || ''}</strong></div>
          <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
      \`;
      lesson.do_now.events.forEach((ev, idx) => {
        html += \`
          <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
            <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;">\${ev.year}</div>
            <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">\${ev.title}</div>
            <div style="font-size: 0.95rem; color: #475569;">\${ev.detail}</div>
            \${ev.img ? \`<img src="\${getAssetUrl(ev.img)}" style="width: 100%; border-radius: 4px; margin-top: 10px; border: 1px solid #e2e8f0;">\` : ''}
          </div>
        \`;
      });
      html += \`</div></div>\`;
    } else if (lesson.do_now && lesson.do_now.items) {\n`;
if (core.includes(oldRetrieval) && !core.includes("lesson.do_now.type === 'timeline'")) {
  core = core.replace(oldRetrieval, newRetrieval);
}

fs.writeFileSync(corePath, core, 'utf8');
console.log('Patched core_app.js');

// Fix great_war.json Eckart Kehr theory and Primat der Innenpolitik
const gwPath = './public/data/great_war.json';
let gw = JSON.parse(fs.readFileSync(gwPath, 'utf8'));
const l5 = gw.data.lessons.find(l => l.id === 'lesson_5');
if (l5 && l5.historians_corner) {
  l5.historians_corner.title = "The Primacy of Domestic Politics";
  l5.historians_corner.author_context = "While many historians focus on international alliances, historians like Eckart Kehr argue that Germany's foreign policy was actually driven by domestic fears. This theory is known as the 'Primacy of Domestic Politics' (Primat der Innenpolitik).";
  l5.historians_corner.extract = "Kehr suggested that the Kaiser and conservative elites were terrified of the growing socialist movement inside Germany. To distract the working class from a potential revolution at home, the government launched an aggressive, nationalist foreign policy—a 'flight forward'—to unite the country behind the Kaiser.";
}
fs.writeFileSync(gwPath, JSON.stringify(gw, null, 2), 'utf8');
console.log('Patched great_war.json');

// Fix printed workbooks GCSE Challenge Task
const cmePath = './cme_new/generate_worksheets.js';
if (fs.existsSync(cmePath)) {
  let cme = fs.readFileSync(cmePath, 'utf8');
  cme = cme.replace(
    /let cleanTask = \(lesson\.gcse_task\.text \|\| lesson\.gcse_task\.question \|\| ''\)/,
    "let cleanTask = (lesson.gcse_task.text || lesson.gcse_task.question || lesson.gcse_task.topic || '')"
  );
  fs.writeFileSync(cmePath, cme, 'utf8');
  console.log('Patched cme_new/generate_worksheets.js');
}

const wwPath = './water_and_sanitation/generate_worksheets.js';
if (fs.existsSync(wwPath)) {
  let ww = fs.readFileSync(wwPath, 'utf8');
  ww = ww.replace(
    /let cleanTask = \(lesson\.gcse_task\.text \|\| lesson\.gcse_task\.question \|\| ''\)/,
    "let cleanTask = (lesson.gcse_task.text || lesson.gcse_task.question || lesson.gcse_task.topic || '')"
  );
  fs.writeFileSync(wwPath, ww, 'utf8');
  console.log('Patched water_and_sanitation/generate_worksheets.js');
}
