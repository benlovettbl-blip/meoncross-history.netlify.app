const fs = require('fs');
const path = require('path');

const rendererPath = path.join(__dirname, '..', 'src', 'engine', 'lesson_renderer.js');
let code = fs.readFileSync(rendererPath, 'utf8');

// 1. Remove 'open' attribute from #lesson-chronology-spine so it is auto-collapsed by default
code = code.replace(
  /<details id="lesson-chronology-spine"([^>]*?)(\s+open)([^>]*?)>/,
  '<details id="lesson-chronology-spine"$1$3>',
);
console.log('✅ Removed open from lesson-chronology-spine (collapsed by default)');

// 2. Remove 'open' attribute from other timeline/stages drawers so they are collapsed by default
code = code.replace(
  /<details class="timeline-anchor-details"([^>]*?)(\s+open)([^>]*?)>/,
  '<details class="timeline-anchor-details"$1$3>',
);
code = code.replace(
  /<details id="lesson-workbook-stages-drawer"([^>]*?)(\s+open)([^>]*?)>/,
  '<details id="lesson-workbook-stages-drawer"$1$3>',
);
console.log('✅ Removed open from timeline-anchor-details and lesson-workbook-stages-drawer');

// 3. Replace summary header of #lesson-chronology-spine with clean, button-free header (No Copy Notes, No Toggle Drawers)
const oldSummaryRegex =
  /<details id="lesson-chronology-spine"[\s\S]*?<summary style="[\s\S]*?<\/summary>/;

const newSummaryReplacement = `<details id="lesson-chronology-spine" class="timeline-anchor-details cme-chronology-spine" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; margin-bottom: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); overflow: hidden;">
          <summary style="padding: 12px 18px; font-weight: 700; color: #0f172a; cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <span style="display: flex; align-items: center; gap: 10px;">
              <span style="background: #0284c7; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800; padding: 2.5px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Chronology Spine</span>
              <span style="font-weight: 800; font-size: 0.98rem; color: #0f172a; font-family: 'Inter', sans-serif;">Key Turning Points &bull; 5 Milestones</span>
            </span>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 0.74rem; font-weight: 700; color: #475569; background: #e2e8f0; padding: 2px 8px; border-radius: 12px;">\${spineItems.length} Milestones</span>
              <i class="fa-solid fa-chevron-down" style="color: #64748b; font-size: 0.85rem;"></i>
            </div>
          </summary>`;

if (oldSummaryRegex.test(code)) {
  code = code.replace(oldSummaryRegex, newSummaryReplacement);
  console.log('✅ Replaced summary header with button-free, clean collapsed header');
}

// 4. Update the card rendering inside spineItems.map to implement Option 1 (Clean Row 1 + Single Causal Impact Micro-Drawer)
const oldCardRegex =
  /<div class="cme-spine-card" data-stage="\${item\.step}"[\s\S]*?<\/div>\s*`;\s*\}\)\s*\.join\(''\)\}/;

const newCardReplacement = `<div class="cme-spine-card" data-stage="\${item.step}" style="background: #ffffff; border: 1.2px solid #cbd5e1; border-top: 4px solid \${isLast ? '#10b981' : '#0284c7'}; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; box-sizing: border-box; box-shadow: 0 1px 3px rgba(0,0,0,0.03); position: relative; overflow: visible;">
                \${
                  !isLast
                    ? \`
                <div class="cme-domino-pipeline-node" title="Stage \${item.step} triggers Stage \${item.step + 1}\${item.connective ? ': ' + item.connective : ''}">
                  <i class="fa-solid fa-arrow-right"></i>
                </div>\`
                    : ''
                }
                
                <!-- Equalized Baseline Narrative Zone (Row 1) -->
                <div class="cme-spine-narrative-zone" style="padding: 10px 10px 8px 10px; display: flex; flex-direction: column; box-sizing: border-box;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 4px; margin-bottom: 4px;">
                    <span style="background: \${isLast ? '#047857' : '#0f172a'}; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.5px; white-space: nowrap;">
                      STAGE \${item.step}
                    </span>
                    <span style="font-family: 'Inter', sans-serif; font-size: 0.70rem; font-weight: 800; color: \${isLast ? '#059669' : '#0284c7'}; text-align: right; line-height: 1.25;" title="\${item.date}">\${item.date}</span>
                  </div>

                  \${
                    item.tag || item.actor
                      ? \`
                  <div style="font-size: 0.63rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 5px; line-height: 1.35;" title="\${item.tag || ''} • \${item.actor || ''}">
                    \${item.tag ? \`\${item.tag} &bull; \` : ''}<strong style="color: #334155;">\${item.actor || ''}</strong>
                  </div>\`
                      : ''
                  }

                  <h5 style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.88rem; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.25;">
                    \${item.title}
                  </h5>

                  <div class="cme-spine-desc" style="font-size: 0.74rem; color: #334155; line-height: 1.38; margin-bottom: 6px;">
                    \${item.desc}
                  </div>
                </div>

                <!-- Option 1: Clean Causal Impact Micro-Drawer -->
                \${
                  item.because || item.therefore || item.connective
                    ? \`
                <details class="causal-impact-drawer" style="margin: 0 8px 8px 8px; border-top: 1px dashed #cbd5e1; padding-top: 6px;">
                  <summary style="font-size: 0.70rem; font-weight: 700; color: #0284c7; cursor: pointer; user-select: none; list-style: none; display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; background: #f0f9ff; border-radius: 4px; border: 1px solid #bae6fd; transition: background 0.15s ease;">
                    <span><i class="fa-solid fa-code-branch" style="font-size: 0.62rem; margin-right: 4px;"></i> Causal Impact</span>
                    <span style="font-size: 0.65rem; color: #0284c7;">▾</span>
                  </summary>
                  <div style="margin-top: 6px; padding: 7px 9px; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.72rem; line-height: 1.4; color: #334155;">
                    \${item.because ? \`<p style="margin: 0 0 5px 0;"><strong>Why:</strong> \${item.because}</p>\` : ''}
                    \${item.therefore ? \`<p style="margin: 0 0 \${item.connective ? '5px' : '0'};"><strong>Result:</strong> \${item.therefore}</p>\` : ''}
                    \${item.connective ? \`<div style="padding-top: 5px; border-top: 1px dashed #e2e8f0; font-weight: 600; color: \${isLast ? '#047857' : '#1d4ed8'}; font-size: 0.68rem;"><i class="fa-solid \${isLast ? 'fa-flag-checkered' : 'fa-arrow-right'}" style="margin-right: 4px;"></i> \${item.connective}</div>\` : ''}
                  </div>
                </details>\`
                    : ''
                }

                \${
                  item.exam_link
                    ? \`
                <div style="border-top: 1px solid #e2e8f0; padding: 5px 8px; font-size: 0.66rem; font-weight: 700; color: #475569; background: #f8fafc; border-radius: 0 0 7px 7px; margin-top: auto;">
                  <i class="fa-solid fa-bullseye" style="color: #dc2626; margin-right: 4px;"></i>\${item.exam_link}
                </div>\`
                    : ''
                }
              </div>
              \`;
              })
              .join('')}`;

if (oldCardRegex.test(code)) {
  code = code.replace(oldCardRegex, newCardReplacement);
  console.log('✅ Injected Option 1 card template into spineItems.map');
}

// 5. Update footer inside #lesson-chronology-spine (remove copy notes button from bottom as well)
const oldFooterRegex =
  /<div style="grid-column: 1 \/ -1; margin-top: 6px; padding-top: 8px; border-top: 1px dashed #cbd5e1;[\s\S]*?<\/div>/;

const newFooterReplacement = `<div style="grid-column: 1 / -1; margin-top: 4px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 0.74rem; color: #64748b; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-graduation-cap" style="color: #0284c7;"></i>
              <span>\${isKs3 ? '<strong>Chronology &amp; Causation:</strong> 5 key turning points forming the causal spine of this enquiry.' : '<strong>Edexcel Paper 2 Narrative Framework:</strong> 5 key turning points tracking how each consequence triggers the next event.'}</span>
            </div>`;

if (oldFooterRegex.test(code)) {
  code = code.replace(oldFooterRegex, newFooterReplacement);
  console.log('✅ Replaced footer with clean, button-free note strip');
}

fs.writeFileSync(rendererPath, code, 'utf8');
console.log('Successfully wrote Option 1 updates to lesson_renderer.js');
