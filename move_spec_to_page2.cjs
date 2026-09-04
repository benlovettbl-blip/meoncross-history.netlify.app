/**
 * move_spec_to_page2.cjs
 * Moves the Edexcel spec box from page 1 (cover) to the top of page 2 (tracker page)
 * for all 5 Medicine pupil workbook HTML files.
 * Page 2 is then restructured to fill 95vh with: spec box (flex: 0) + tracker (flex: 1).
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'units', 'edexcel_medicine');

const files = [
  'pupil_workbook_medieval.html',
  'pupil_workbook_renaissance.html',
  'pupil_workbook_18th_19th.html',
  'pupil_workbook_modern.html',
  'pupil_workbook_western_front.html',
];

// ─── Regex to extract the spec box from the cover div ─────────────────────────
// Matches:
//   <div style="border: 2px solid #1e3a8a; ..."> ... </div>
// For the multiline (medieval) style:
const SPEC_BOX_MULTILINE =
  /\s*<div\s*\n\s*style="\s*\n\s*border: 2px solid #1e3a8a;[\s\S]*?<\/div>\s*\n(?=\s*\n?\s*<div)/;
// For the inline style (other periods):
const SPEC_BOX_INLINE =
  /\s*<div style="border: 2px solid #1e3a8a;[^>]*>[\s\S]*?<\/div>\s*(?=\s*\n?\s*<div)/;

// Page 2 tracker heading anchor (multiline version in medieval):
const PAGE2_ANCHOR_MULTILINE = `    <div
      style="
        page-break-after: always;
        page-break-inside: avoid;
        display: flex;
        flex-direction: column;
        height: 95vh;
        overflow: hidden;
      "
    >
      <h2`;

// Inline version used in other periods:
const PAGE2_ANCHOR_INLINE = `    <div style="page-break-after: always; page-break-inside: avoid; display: flex; flex-direction: column; height: 95vh; overflow: hidden;">`;

files.forEach((file) => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // ── Step 1: Extract the spec box ─────────────────────────────────────────────
  let specBoxHtml = null;
  let cleanedContent = content;

  // Try multiline format first (medieval)
  let match = content.match(SPEC_BOX_MULTILINE);
  if (match) {
    specBoxHtml = match[0];
    cleanedContent = content.replace(SPEC_BOX_MULTILINE, '\n');
  } else {
    // Try inline format (other periods)
    match = content.match(SPEC_BOX_INLINE);
    if (match) {
      specBoxHtml = match[0];
      cleanedContent = content.replace(SPEC_BOX_INLINE, '\n');
    }
  }

  if (!specBoxHtml) {
    console.warn(`⚠️  ${file}: Could not find spec box to extract. Skipping.`);
    return;
  }

  // ── Step 2: Reformat the spec box for page 2 (more compact, fits alongside tracker) ──
  // Extract the inner content (h3 + ul) from whatever wrapper was there
  const innerMatch = specBoxHtml.match(/<h3[\s\S]*?<\/ul>/);
  const innerContent = innerMatch ? innerMatch[0] : specBoxHtml;

  const specBoxPage2 = `
      <div style="border: 2px solid #1e3a8a; padding: 10px 15px; margin-bottom: 12px; background-color: #f0f4ff; flex-shrink: 0; border-radius: 4px;">
        ${innerContent.replace(/<h3[^>]*>/, '<h3 style="color: #1e3a8a; margin: 0 0 6px 0; font-size: 12pt;">').replace(/<ul[^>]*>/, '<ul style="font-size: 10pt; line-height: 1.4; margin: 0; padding-left: 18px;">')}
      </div>`;

  // ── Step 3: Inject the spec box at the top of page 2 ─────────────────────────
  // Also update the page 2 wrapper to be a true flex column that fills the page
  const newPage2WrapperMultiline = `    <div
      style="
        page-break-after: always;
        page-break-inside: avoid;
        display: flex;
        flex-direction: column;
        height: 95vh;
        overflow: hidden;
      "
    >
${specBoxPage2}
      <h2`;

  const newPage2WrapperInline = `    <div style="page-break-after: always; page-break-inside: avoid; display: flex; flex-direction: column; height: 95vh; overflow: hidden;">
${specBoxPage2}`;

  let finalContent = cleanedContent;

  if (finalContent.includes(PAGE2_ANCHOR_MULTILINE)) {
    finalContent = finalContent.replace(PAGE2_ANCHOR_MULTILINE, newPage2WrapperMultiline);
  } else if (finalContent.includes(PAGE2_ANCHOR_INLINE)) {
    finalContent = finalContent.replace(PAGE2_ANCHOR_INLINE, newPage2WrapperInline);
  } else {
    // Fallback: search for the Progress tracker heading
    const fallbackAnchor = `page-break-after: always; page-break-inside: avoid;`;
    if (finalContent.includes(fallbackAnchor)) {
      finalContent = finalContent.replace(
        new RegExp(`(\\s*<div[^>]*${fallbackAnchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*>)`),
        `$1\n${specBoxPage2}`,
      );
    } else {
      console.warn(`⚠️  ${file}: Could not find page 2 anchor. Spec box NOT moved.`);
      return;
    }
  }

  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`✅  ${file}: Spec box moved to page 2`);
});

console.log('\nDone. Regenerate PDFs with: node scripts/export_pdfs.cjs edexcel_medicine');
