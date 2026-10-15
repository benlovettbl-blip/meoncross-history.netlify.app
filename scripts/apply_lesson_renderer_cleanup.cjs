const fs = require('fs');
const path = require('path');

const rendererPath = path.join(__dirname, '..', 'src', 'engine', 'lesson_renderer.js');
let code = fs.readFileSync(rendererPath, 'utf8');

// 1. Remove quiz mode button in lesson-note-scaffold
const oldNoteQuizBtn = `<button type="button" id="btn-note-scaffold-quiz-mode" onclick="window.toggleNoteScaffoldQuizMode('\${lessonId}', event);" style="font-size: 0.82rem; padding: 3px 9px; background: #fefce8; color: #854d0e; border: 1px solid #fde047; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-weight: 700;">
            <i class="fa-solid fa-graduation-cap"></i> <span id="note-scaffold-quiz-label">Self-Quiz Mode</span>
          </button>`;

if (code.includes('id="btn-note-scaffold-quiz-mode"')) {
  code = code.replace(
    /<button type="button" id="btn-note-scaffold-quiz-mode"[\s\S]*?<\/button>\s*/,
    '',
  );
  console.log('✅ Removed btn-note-scaffold-quiz-mode from lesson-note-scaffold');
}

// 2. In renderCausalDominoSpine, remove practice toggle and practice elements
code = code.replace(/<div class="view-mode-toggle"[\s\S]*?<\/div>\s*/, '');
code = code.replace(/<!-- Interactive Per-Card Reveal in Practice Mode -->[\s\S]*?<\/div>/g, '');
code = code.replace(/<div class="domino-content-practice"[\s\S]*?<\/div>/g, '');
console.log('✅ Cleaned practice mode elements from renderCausalDominoSpine');

// 3. Update spine trigger condition to support great_war / KS3
const oldSpineCond = `if (isCme && (lesson.timeline_anchor || lesson.causal_domino_spine)) {`;
const newSpineCond = `if ((isCme || unitId === 'great_war' || isKs3) && (lesson.timeline_anchor || lesson.causal_domino_spine)) {`;
if (code.includes(oldSpineCond)) {
  code = code.replace(oldSpineCond, newSpineCond);
  console.log('✅ Updated spine condition to include great_war and isKs3');
}

// 4. Update the summary header of #lesson-chronology-spine
const oldSpineHeaderTarget = `<details id="lesson-chronology-spine" class="timeline-anchor-details cme-chronology-spine" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); overflow: hidden;" open>
          <summary style="padding: 12px 18px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <span style="display: flex; align-items: center; gap: 10px;">
              <span style="background: #0284c7; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800; padding: 2.5px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Core Task</span>
              <span style="font-weight: 800; font-size: 0.98rem; color: #0f172a; font-family: 'Inter', sans-serif;">Chronology & Causal Domino Spine &bull; Key Turning Points</span>
            </span>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;" onclick="event.stopPropagation();">
              <button type="button" id="btn-toggle-all-causal" onclick="window.toggleAllCausalSpineDrawers();" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;">
                <i class="fa-solid fa-code-branch"></i> <span id="toggle-causal-label">Expand Causal Analysis</span>
              </button>
              <button type="button" id="btn-cme-quiz-mode" onclick="window.toggleCmeSpineQuizMode();" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; background: #fefce8; color: #854d0e; border: 1px solid #fde047; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;">
                <i class="fa-solid fa-graduation-cap"></i> <span id="cme-quiz-label">Self-Quiz Mode</span>
              </button>
              <span style="font-size: 0.76rem; font-weight: 700; color: #475569; background: #e2e8f0; padding: 2px 8px; border-radius: 12px;">\${spineItems.length} Milestones</span>
            </div>
          </summary>
          <div id="cme-quiz-subbar" style="display: none; padding: 8px 18px; background: #fefce8; border-bottom: 1px solid #fef08a; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.76rem; color: #854d0e; font-weight: 700;">
              <i class="fa-solid fa-lightbulb" style="color: #ca8a04;"></i>
              <span><strong>Active Recall Starter / Exit Ticket:</strong> Motives and consequences are masked. Click any masked prompt to test recall before revealing!</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" id="btn-reveal-all-quiz" onclick="window.revealAllCmeQuizBlanks();" style="padding: 3px 9px; font-size: 0.72rem; font-weight: 700; background: #ffffff; color: #854d0e; border: 1px solid #fde047; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                <i class="fa-solid fa-eye"></i> Reveal All
              </button>
            </div>
          </div>`;

const newSpineHeader = `<details id="lesson-chronology-spine" class="timeline-anchor-details cme-chronology-spine" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); overflow: hidden;" open>
          <summary style="padding: 12px 18px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <span style="display: flex; align-items: center; gap: 10px;">
              <span style="background: #0284c7; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800; padding: 2.5px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Chronology Spine</span>
              <span style="font-weight: 800; font-size: 0.98rem; color: #0f172a; font-family: 'Inter', sans-serif;">Key Turning Points &bull; Causal Dominoes</span>
            </span>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;" onclick="event.stopPropagation();">
              \${!isKs3 ? \`
              <button type="button" id="btn-toggle-all-causal" onclick="window.toggleAllCausalSpineDrawers();" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;">
                <i class="fa-solid fa-code-branch"></i> <span id="toggle-causal-label">Expand Causal Analysis</span>
              </button>\` : ''}
              <span style="font-size: 0.76rem; font-weight: 700; color: #475569; background: #e2e8f0; padding: 2px 8px; border-radius: 12px;">\${spineItems.length} Milestones</span>
              <button type="button" onclick="window.copyDominoNotes();" style="padding: 4px 10px; font-size: 0.74rem; font-weight: 700; background: #f8fafc; color: #334155; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="Copy 5-stage notes">
                <i class="fa-solid fa-copy"></i> Copy Notes
              </button>
            </div>
          </summary>`;

if (code.includes(oldSpineHeaderTarget)) {
  code = code.replace(oldSpineHeaderTarget, newSpineHeader);
  console.log('✅ Replaced spine header: removed self-quiz button and subbar');
}

// 5. Update causal card rendering in spineItems.map
const oldCausalDrawerRegex =
  /<!-- Causal Analysis Drawer \(Starts at exact same baseline across all cards\) -->[\s\S]*?<\/details>`\s*:\s*''\s*\}/;

const newCausalZone = `<!-- Causal Analysis Zone -->
                \${
                  item.because || item.therefore
                    ? isKs3
                      ? \`
                <div class="cme-causal-static-zone" style="border-top: 1px dashed #cbd5e1; padding: 8px 10px; background: #fafafa; display: flex; flex-direction: column; gap: 6px;">
                  \${
                    item.because
                      ? \`
                  <div style="background: #fffbeb; border: 1px solid #fef08a; border-left: 3px solid #eab308; border-radius: 4px; padding: 6px 8px; font-size: 0.70rem; line-height: 1.35;">
                    <strong style="color: #854d0e; text-transform: uppercase; font-size: 0.60rem; display: block; margin-bottom: 2px; letter-spacing: 0.4px;">
                      <i class="fa-solid fa-lightbulb"></i> Motive (Why):
                    </strong>
                    <div style="color: #713f12;">\${item.because}</div>
                  </div>\`
                      : ''
                  }
                  \${
                    item.therefore
                      ? \`
                  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 3px solid #22c55e; border-radius: 4px; padding: 6px 8px; font-size: 0.70rem; line-height: 1.35;">
                    <strong style="color: #166534; text-transform: uppercase; font-size: 0.60rem; display: block; margin-bottom: 2px; letter-spacing: 0.4px;">
                      <i class="fa-solid fa-arrow-trend-up"></i> Consequence (Result):
                    </strong>
                    <div style="color: #14532d;">\${item.therefore}</div>
                  </div>\`
                      : ''
                  }
                </div>\`
                      : \`
                <details class="cme-causal-drawer" style="border-top: 1px dashed #cbd5e1; padding: 6px 8px 8px 8px; background: #fafafa; border-radius: 0;">
                  <summary style="font-size: 0.68rem; font-weight: 700; color: #0369a1; cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; padding: 2px 2px;">
                    <span><i class="fa-solid fa-code-branch" style="font-size: 0.62rem;"></i> Causal Analysis</span>
                    <span class="drawer-arrow" style="font-size: 0.65rem; color: #64748b;">▾</span>
                  </summary>
                  <div style="margin-top: 6px; display: flex; flex-direction: column; gap: 6px;">
                    \${
                      item.because
                        ? \`
                    <div class="cme-drawer-because" style="background: #fffbeb; border: 1px solid #fef08a; border-radius: 4px; padding: 6px 8px; font-size: 0.70rem; line-height: 1.35;">
                      <strong style="color: #854d0e; text-transform: uppercase; font-size: 0.62rem; display: block; margin-bottom: 2px; letter-spacing: 0.4px;">
                        <i class="fa-solid fa-lightbulb"></i> Motive:
                      </strong>
                      <div style="color: #713f12;">\${item.because}</div>
                    </div>\`
                        : ''
                    }
                    \${
                      item.therefore
                        ? \`
                    <div class="cme-drawer-therefore" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; padding: 6px 8px; font-size: 0.70rem; line-height: 1.35;">
                      <strong style="color: #166534; text-transform: uppercase; font-size: 0.62rem; display: block; margin-bottom: 2px; letter-spacing: 0.4px;">
                        <i class="fa-solid fa-arrow-trend-up"></i> Consequence:
                      </strong>
                      <div style="color: #14532d;">\${item.therefore}</div>
                    </div>\`
                        : ''
                    }
                  </div>
                </details>\`
                    : ''
                }`;

if (oldCausalDrawerRegex.test(code)) {
  code = code.replace(oldCausalDrawerRegex, newCausalZone);
  console.log(
    '✅ Replaced causal drawer with clean static KS3 rendering and mask-free GCSE rendering',
  );
}

// 6. Add exam_link footer if present to spine cards
const oldFooterRegex =
  /<!-- Elevated Causal Domino Spark Footer -->[\s\S]*?<\/div>`\s*:\s*''\s*\}\s*<\/div>\s*`;/;

const newFooterReplacement = `<!-- Elevated Causal Domino Spark Footer -->
                \${
                  item.connective
                    ? \`
                <div class="cme-domino-spark-footer \${isLast ? 'cme-spark-climax' : ''}" style="padding: 7px 9px; background: \${isLast ? '#ecfdf5' : '#eff6ff'}; border-top: 1.5px solid \${isLast ? '#a7f3d0' : '#bfdbfe'}; border-radius: 0; font-size: 0.68rem; line-height: 1.35; margin-top: auto;">
                  <div style="font-weight: 800; text-transform: uppercase; font-size: 0.60rem; letter-spacing: 0.5px; color: \${isLast ? '#047857' : '#1d4ed8'}; margin-bottom: 2px; display: flex; align-items: center; gap: 4px;">
                    <i class="fa-solid \${isLast ? 'fa-flag-checkered' : 'fa-arrow-right'}"></i>
                    <span>\${isLast ? 'Enquiry Outcome' : \`Domino Link &rarr; Stage \${item.step + 1}\`}</span>
                  </div>
                  <div style="color: \${isLast ? '#065f46' : '#1e40af'}; font-weight: 600;">
                    \${item.connective}
                  </div>
                </div>\`
                    : ''
                }

                \${
                  item.exam_link
                    ? \`
                <div style="border-top: 1px solid #e2e8f0; padding: 6px 9px; font-size: 0.66rem; font-weight: 700; color: #475569; background: #f8fafc; border-radius: 0 0 7px 7px;">
                  <i class="fa-solid fa-bullseye" style="color: #dc2626; margin-right: 4px;"></i>\${item.exam_link}
                </div>\`
                    : ''
                }
              </div>
              \`;`;

if (oldFooterRegex.test(code)) {
  code = code.replace(oldFooterRegex, newFooterReplacement);
  console.log('✅ Updated card footer with exam_link and clean domino spark');
}

// 7. Update spine grid bottom banner to adapt text for KS3 vs GCSE
const oldGridBannerRegex =
  /<span>\s*<i class="fa-solid fa-graduation-cap" style="color: #0284c7;"><\/i> <strong>Edexcel Paper 2 Narrative Framework:<\/strong> Track how each stage's <em>consequence<\/em> directly sparks the next stage's <em>trigger<\/em> to write high-scoring 8-mark explanations\.\s*<\/span>/;

const newGridBanner = `<span>
                <i class="fa-solid fa-graduation-cap" style="color: #0284c7;"></i> \${isKs3 ? '<strong>Chronology &amp; Causation Framework:</strong> Track how each milestone\\'s <em>consequence</em> directly sparks the next stage\\'s <em>trigger</em> to master multi-causal essay explanations.' : '<strong>Edexcel Paper 2 Narrative Framework:</strong> Track how each stage\\'s <em>consequence</em> directly sparks the next stage\\'s <em>trigger</em> to write high-scoring 8-mark explanations.'}
              </span>`;

if (oldGridBannerRegex.test(code)) {
  code = code.replace(oldGridBannerRegex, newGridBanner);
  console.log('✅ Updated spine grid bottom banner');
}

fs.writeFileSync(rendererPath, code, 'utf8');
console.log('Successfully wrote changes to lesson_renderer.js');
