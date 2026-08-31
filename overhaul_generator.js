const fs = require('fs');

const path = 'generate_pupil_workbooks.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Extended Writing Formatting
const oldRenderLines = `          } else if (text.includes("16 marks")) {
            for (let i = 0; i < 96; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
          } else if (
            text.includes("12 marks") ||
            text.includes("Explain why")
          ) {
            for (let i = 0; i < 64; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
          }`;

const newRenderLines = `          } else if (text.includes("16 marks") || text.includes("12 marks")) {
            for (let i = 0; i < 40; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
            html += \`<div style="page-break-before: always;"></div>\`;
            for (let i = 0; i < 40; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
          } else if (
            text.includes("Explain why")
          ) {
            for (let i = 0; i < 64; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
          }`;

if (content.includes(oldRenderLines)) {
    content = content.replace(oldRenderLines, newRenderLines);
} else {
    console.error("Could not find renderLines block to replace.");
}

// 2. Reposition Pair & Share Tasks (Great War Only)
// The original pair_share block
const originalPairShare = `    // Pair Share
    if (lesson.pair_share) {
        html += \`<div class="task-box" style="  ">\`;
        html += \`<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>\`;

        if (lesson.pair_share.sources) {
          let sourceHTML =
            '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
          lesson.pair_share.sources.forEach((srcObj) => {
            sourceHTML +=
              '<div style="flex: 1; border: 1px solid #0d9488; padding-top: 5px; padding-bottom: 5px; text-align: left; ">';
            if (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) {
              let imgSrc =
                typeof resolveAssetPath === "function"
                  ? resolveAssetPath((srcObj.src || srcObj.source || srcObj.image), 2)
                  : (srcObj.src || srcObj.source || srcObj.image);
              sourceHTML += \`<img src="\${imgSrc}" style="max-width: 100%; max-height: 250px;">\`;
            } 
        if (srcObj.text || srcObj.content) { 
              sourceHTML += \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${srcObj.text}</blockquote>\`;
            }
            if (srcObj.title)
              sourceHTML += \`<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\\</p>\`;
            sourceHTML += "</div>";
          });
          sourceHTML += "</div>";
          html += sourceHTML;
        }

        html += \`<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Q\${globalQNum++}. Prompt: \${lesson.pair_share.prompt}</p>\`;
        if (lesson.pair_share.think)
          html += \`<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: \${lesson.pair_share.think}</p>\`;
        html += \`<div style="margin-top: 15px; border-left: 4px solid #0f766e; padding-left: 15px;"><strong>Your Notes:</strong>\`;
        for (let i = 0; i < 6; i++) {
          html += \`<div class="task-lines-large"></div>\`;
        }
        html += \`</div>\`;
        html += \`</div>\`;
      }`;

const wrappedPairShare = `    // Pair Share (Hidden for Great War units here, moved to later)
    if (lesson.pair_share && !(unitId === "great_war" || unitId === "great_war_part2")) {
        html += \`<div class="task-box" style="  ">\`;
        html += \`<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>\`;

        if (lesson.pair_share.sources) {
          let sourceHTML =
            '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
          lesson.pair_share.sources.forEach((srcObj) => {
            sourceHTML +=
              '<div style="flex: 1; border: 1px solid #0d9488; padding-top: 5px; padding-bottom: 5px; text-align: left; ">';
            if (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) {
              let imgSrc =
                typeof resolveAssetPath === "function"
                  ? resolveAssetPath((srcObj.src || srcObj.source || srcObj.image), 2)
                  : (srcObj.src || srcObj.source || srcObj.image);
              sourceHTML += \`<img src="\${imgSrc}" style="max-width: 100%; max-height: 250px;">\`;
            } 
        if (srcObj.text || srcObj.content) { 
              sourceHTML += \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${srcObj.text}</blockquote>\`;
            }
            if (srcObj.title)
              sourceHTML += \`<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\\</p>\`;
            sourceHTML += "</div>";
          });
          sourceHTML += "</div>";
          html += sourceHTML;
        }

        html += \`<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Q\${globalQNum++}. Prompt: \${lesson.pair_share.prompt}</p>\`;
        if (lesson.pair_share.think)
          html += \`<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: \${lesson.pair_share.think}</p>\`;
        html += \`<div style="margin-top: 15px; border-left: 4px solid #0f766e; padding-left: 15px;"><strong>Your Notes:</strong>\`;
        for (let i = 0; i < 6; i++) {
          html += \`<div class="task-lines-large"></div>\`;
        }
        html += \`</div>\`;
        html += \`</div>\`;
      }`;

const injectedPairShare = `        // Injected Pair Share for Great War units, immediately before extended writing
        if (lesson.pair_share && (unitId === "great_war" || unitId === "great_war_part2")) {
            html += \`<div class="task-box" style="  ">\`;
            html += \`<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>\`;

            if (lesson.pair_share.sources) {
              let sourceHTML =
                '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
              lesson.pair_share.sources.forEach((srcObj) => {
                sourceHTML +=
                  '<div style="flex: 1; border: 1px solid #0d9488; padding-top: 5px; padding-bottom: 5px; text-align: left; ">';
                if (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) {
                  let imgSrc =
                    typeof resolveAssetPath === "function"
                      ? resolveAssetPath((srcObj.src || srcObj.source || srcObj.image), 2)
                      : (srcObj.src || srcObj.source || srcObj.image);
                  sourceHTML += \`<img src="\${imgSrc}" style="max-width: 100%; max-height: 250px;">\`;
                } 
            if (srcObj.text || srcObj.content) { 
                  sourceHTML += \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${srcObj.text}</blockquote>\`;
                }
                if (srcObj.title)
                  sourceHTML += \`<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\\</p>\`;
                sourceHTML += "</div>";
              });
              sourceHTML += "</div>";
              html += sourceHTML;
            }

            html += \`<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Q\${globalQNum++}. Prompt: \${lesson.pair_share.prompt}</p>\`;
            if (lesson.pair_share.think)
              html += \`<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: \${lesson.pair_share.think}</p>\`;
            html += \`<div style="margin-top: 15px; border-left: 4px solid #0f766e; padding-left: 15px;"><strong>Your Notes:</strong>\`;
            for (let i = 0; i < 6; i++) {
              html += \`<div class="task-lines-large"></div>\`;
            }
            html += \`</div>\`;
            html += \`</div>\`;
        }

        if (lesson.extended && lesson.extended.question) {`;

if (content.includes(originalPairShare)) {
    content = content.replace(originalPairShare, wrappedPairShare);
} else {
    console.error("Could not find original pair_share block to replace.");
}

const extendedBlock = `        if (lesson.extended && lesson.extended.question) {`;
if (content.includes(extendedBlock)) {
    // Only replace the first instance to avoid injecting it multiple times if this block appears elsewhere (it shouldn't, but just in case)
    let injected = false;
    content = content.replace(/        if \(lesson\.extended && lesson\.extended\.question\) \{/g, (match) => {
        if (!injected) {
            injected = true;
            return injectedPairShare;
        }
        return match;
    });
} else {
    console.error("Could not find extended question block to inject before.");
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated generate_pupil_workbooks.js');
