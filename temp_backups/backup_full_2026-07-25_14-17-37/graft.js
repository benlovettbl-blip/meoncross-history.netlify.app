const fs = require('fs');

let waterHtml = fs.readFileSync('water_and_sanitation/index.html', 'utf8');
let wwiHtml = fs.readFileSync('great_war/index.html', 'utf8');
let waterCss = fs.readFileSync('water_and_sanitation/styles.css', 'utf8');
let wwiCss = fs.readFileSync('great_war/styles.css', 'utf8');

// 1. Extract Header & Nav from Water
let headerMatch = waterHtml.match(/<header[^>]*>([\s\S]*?)<\/header>/);
let navMatch = waterHtml.match(/<nav[^>]*>([\s\S]*?)<\/nav>/);

if (!headerMatch || !navMatch) {
    console.error("Could not extract header or nav");
    process.exit(1);
}

let waterHeader = `<header class="no-print-header" style="background: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 1rem 2rem; position: sticky; top: 0; z-index: 1000; box-shadow: var(--shadow-sm);">${headerMatch[1]}</header>`;

// Modify the text in the extracted header
waterHeader = waterHeader.replace('🚰 Water & Sanitation Through Time', '🌍 The Great War: Causes & Outbreak');
waterHeader = waterHeader.replace('Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?', 'Unit Enquiry: Was the outbreak of the First World War in 1914 an inevitable disaster?');

// Extract CSS root variables and utility classes
let rootMatch = waterCss.match(/:root\s*\{([\s\S]*?)\}/);
let darkThemeMatch = waterCss.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\}/);
let badgeStyles = `
/* UI Badges & Utilities */
.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 500;
}
.badge-primary {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary);
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
}
.btn-secondary {
  background: rgba(15, 23, 42, 0.05);
  color: var(--text-main);
}
.btn-secondary:hover {
  background: rgba(15, 23, 42, 0.1);
}
.nav-tab {
  background: none;
  border: none;
  padding: 1rem 0.5rem;
  font-family: var(--font-title);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-muted);
}
.nav-tab.active {
  border-bottom: 3px solid var(--primary);
  color: var(--primary);
}
.nav-tab:hover {
  color: var(--primary);
}
`;

// Inject variables into WWI CSS if not present
if (rootMatch && !wwiCss.includes('--bg-surface')) {
    wwiCss = wwiCss.replace(/:root\s*\{/, `:root {\n${rootMatch[1]}`);
}
if (!wwiCss.includes('.badge-primary')) {
    wwiCss += badgeStyles;
}
fs.writeFileSync('great_war/styles.css', wwiCss);


// Replace the header and old tabs in WWI HTML
// We will replace `<header class="no-print-header">...` with the new header and nav.
let navButtons = `
  <nav class="no-print-header tb-nav" id="workbookTabs" style="background: var(--bg-surface-alt); border-bottom: 1px solid var(--border-color); padding: 0 2rem;">
    <div style="display: flex; gap: 1.5rem; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; align-items: center;">
      <a href="../index.html" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; text-decoration: none; font-size: 0.82rem; font-family: var(--font-title); font-weight: 700; color: var(--text-main); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-color); background: rgba(79, 70, 229, 0.05); margin-right: 10px;">
        <i class="fa-solid fa-arrow-left"></i> Portal
      </a>
      <button class="tb-tab nav-tab active" data-tab="cover">📚 Cover & Plans</button>
      <button class="tb-tab nav-tab" data-tab="timeline">⏳ Timeline</button>
      <button class="tb-tab nav-tab" data-tab="lesson1">L1: Powder Keg</button>
      <button class="tb-tab nav-tab" data-tab="lesson2">L2: Empires</button>
      <button class="tb-tab nav-tab" data-tab="lesson3">L3: Navies</button>
      <button class="tb-tab nav-tab" data-tab="lesson4">L4: Alliances</button>
      <button class="tb-tab nav-tab" data-tab="lesson5">L5: Sarajevo</button>
      <button class="tb-tab nav-tab" data-tab="assessment">📝 Assessment</button>
      <button class="tb-tab nav-tab" data-tab="exhibition">🖼️ Exhibition</button>
      <button class="btn" onclick="printWorkbook()" style="margin-left: auto; background: var(--primary); color: white; padding: 0.5rem 1rem; font-size: 0.85rem;"><i class="fa-solid fa-print"></i> Print Workbook</button>
    </div>
  </nav>
`;

wwiHtml = wwiHtml.replace(/<header class="no-print-header">[\s\S]*?<\/header>/, waterHeader + '\n' + navButtons);
fs.writeFileSync('great_war/index.html', wwiHtml);

console.log("Graft complete.");
