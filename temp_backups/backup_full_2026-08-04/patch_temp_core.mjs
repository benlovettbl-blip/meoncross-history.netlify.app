import fs from 'fs';

const TARGET_FILE = "./temp_core2.js";
let content = fs.readFileSync(TARGET_FILE, 'utf16le');

// Let's do a reliable replace by finding the exact "    } else {" before "lessonsHTML = '<div style=\"display: grid;"
const regex = /    \} else \{\s+lessonsHTML = '<div style="display: grid; grid-template-columns: repeat\(auto-fill, minmax\(250px, 1fr\)\); gap: 20px; margin-top: 40px; text-align: left;">';\s+unitData\.lessons\.forEach\(\(lesson, index\) => \{/m;

const replacement = `    } else if (window.currentUnitId === 'weimar_nazi_germany') {
      const periods = [
        { id: 'KT1', title: 'Key Topic 1: The Weimar Republic', prefix: 'lesson_1_', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', border: '#3b82f6', image: 'kt1_weimar_banner.png', enquiry: 'From Democracy to Dictatorship?' },
        { id: 'KT2', title: "Key Topic 2: Hitler's Rise to Power, 1919-33", prefix: 'lesson_2_', gradient: 'linear-gradient(135deg, #7f1d1d, #dc2626)', border: '#dc2626', image: 'kt2_weimar_banner.png', enquiry: 'How did a tiny obscure political group transform?' }
      ];
      periods.forEach(p => {
        lessonsHTML += \`
          <div class="premium-banner">
            <div class="premium-banner-bg" style="background-image: url('assets/banners/\${p.image}');"></div>
            <div class="premium-banner-overlay-1"></div>
            <div class="premium-banner-overlay-2" style="background: \${p.gradient};"></div>
            <div class="premium-banner-glow" style="background: radial-gradient(circle, \${p.border} 0%, transparent 70%);"></div>
            <div class="premium-banner-content" style="border-left: 6px solid \${p.border};">
              <h3 class="premium-banner-title">\${p.title}</h3>
              <p class="premium-banner-enquiry">\${p.enquiry}</p>
            </div>
          </div>
        \`;
        lessonsHTML += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; text-align: left;">';
        
        let foundAny = false;
        unitData.lessons.forEach((lesson, index) => {
          if (lesson.id && lesson.id.startsWith(p.prefix)) {
            foundAny = true;
            lessonsHTML += \`
              <div class="homepage-lesson-card" data-index="\${index}" style="background: white; border: 1px solid #e2e8f0; border-left: 5px solid \${p.border}; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 12px 20px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.05)';">
                <h3 style="margin-top: 0; color: #1a237e; font-size: 1.15rem; margin-bottom: 10px; font-family: 'Outfit', sans-serif;">Lesson \${index + 1}</h3>
                <p style="margin: 0; color: #475569; font-weight: 500; font-size: 1rem; line-height: 1.4;">\${lesson.title.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')}</p>
              </div>
            \`;
          }
        });
        if (!foundAny) {
           lessonsHTML += \`<p style="color: #64748b; font-style: italic; margin-left: 10px;">No lessons found for this period.</p>\`;
        }
        lessonsHTML += '</div>';
      });
    } else {
      lessonsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; text-align: left;">';
      unitData.lessons.forEach((lesson, index) => {`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Successfully replaced lessonsHTML block!");
} else {
    console.log("Regex failed to match lessonsHTML block!");
}

// 2. Patch resourcesHTML logic
const resRegex = /    if \(window\.currentUnitId !== 'edexcel_medicine' && window\.currentUnitId !== 'cme_new'\) \{/;
if (resRegex.test(content)) {
    content = content.replace(resRegex, `    if (window.currentUnitId !== 'edexcel_medicine' && window.currentUnitId !== 'cme_new' && window.currentUnitId !== 'weimar_nazi_germany') {`);
    console.log("Successfully replaced resourcesHTML condition!");
} else {
    console.log("Regex failed to match resourcesHTML condition!");
}

const resRegex2 = /    \} else if \(window\.currentUnitId === 'cme_new'\) \{/;
const newElseIfLogic = `    } else if (window.currentUnitId === 'weimar_nazi_germany') {
      for (let ktNum = 1; ktNum <= 2; ktNum++) {
        resourcesHTML += \`
          <a href="/\${window.currentUnitId}/workbook_KT\${ktNum}.html" target="_blank" style="text-decoration: none;">
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-book-open" style="font-size: 1.5rem; color: #0284c7;"></i>
              <h4 style="margin: 0; color: #1e293b; font-size: 1rem;">KT\${ktNum} Workbook</h4>
            </div>
          </a>
        \`;
      }
    } else if (window.currentUnitId === 'cme_new') {`;

if (resRegex2.test(content)) {
    content = content.replace(resRegex2, newElseIfLogic);
    console.log("Successfully replaced resourcesHTML else if block!");
} else {
    console.log("Regex failed to match resourcesHTML else if block!");
}

fs.writeFileSync(TARGET_FILE, content, 'utf16le');
console.log("Done.");
