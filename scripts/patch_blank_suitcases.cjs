const fs = require('fs');
const path = require('path');

function updateWorksheet(filePath, isLesson3) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update CSS
  const oldCssRegex =
    /\.giant-compartments-grid[\s\S]*?\.compartment-item-rule\s*\.line\s*\{[^\}]*\}/;
  const newCss = `.giant-blank-suitcase-interior {
      flex: 1;
      border: 2px dashed #b45309;
      border-radius: 8px;
      background: #ffffff;
      margin-top: 4.5mm;
      padding: 6mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      box-shadow: inset 0 2px 8px rgba(120, 53, 15, 0.04);
    }`;

  if (oldCssRegex.test(content)) {
    content = content.replace(oldCssRegex, newCss);
    console.log('✅ CSS updated in', filePath);
  } else {
    console.log('⚠️ CSS regex did not match in', filePath);
  }

  // 2. Ensure HTML is updated
  const oldHtmlRegex =
    /<!-- 5 Compartments Grid -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- Footer -->/;

  const innerHtml = isLesson3
    ? `<!-- Completely Blank Open Suitcase Canvas -->
          <div class="giant-blank-suitcase-interior">
            <div style="opacity: 0.22; text-align: center; pointer-events: none; max-width: 170mm;">
              <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><path d="M9 16c1.5 1 4.5 1 6 0"/></svg>
              <div style="font-size: 8.8pt; font-weight: 800; color: #78350f; margin-top: 8px; letter-spacing: 0.05em; text-transform: uppercase;">Open Refugee Suitcase Canvas &bull; Draw, Color &amp; Pack Vera's Cherished Possessions Here</div>
              <div style="font-size: 7.2pt; font-weight: 600; color: #92400e; margin-top: 4px; font-style: italic;">Draw and arrange Vera's family photographs, warm clothes, dictionary, keepsake, and cherished memories freely inside her suitcase.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->`
    : `<!-- Completely Blank Open Suitcase Canvas -->
          <div class="giant-blank-suitcase-interior">
            <div style="opacity: 0.22; text-align: center; pointer-events: none; max-width: 170mm;">
              <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#78350f" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><path d="M9 16c1.5 1 4.5 1 6 0"/></svg>
              <div style="font-size: 8.8pt; font-weight: 800; color: #78350f; margin-top: 8px; letter-spacing: 0.05em; text-transform: uppercase;">Open Suitcase Canvas &bull; Draw, Color &amp; Pack Your Essential Items Here</div>
              <div style="font-size: 7.2pt; font-weight: 600; color: #92400e; margin-top: 4px; font-style: italic;">Draw and arrange your warm clothes, gas mask box, ration book, wash kit, and comfort keepsake freely inside your vintage suitcase.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->`;

  if (oldHtmlRegex.test(content)) {
    content = content.replace(oldHtmlRegex, innerHtml);
    console.log('✅ HTML updated in', filePath);
  }

  // 3. Update enquiry question text
  if (isLesson3) {
    content = content.replace(
      /Draw, color, and (?:label the 5 essential items you are packing|pack Vera's essential belongings) inside your vintage suitcase below\./g,
      "Draw, color, and pack Vera's essential belongings inside her vintage suitcase below.",
    );
  } else {
    content = content.replace(
      /Draw, color, and label the 5 essential items you are packing in your vintage suitcase below\./g,
      'Draw, color, and pack your essential evacuee belongings inside your vintage suitcase below.',
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

const targetFiles = [
  {
    path: path.join(
      __dirname,
      '..',
      'public',
      'units',
      'ks2_ww2',
      'worksheets',
      'lesson_02_evacuation_worksheet.html',
    ),
    isL3: false,
  },
  {
    path: path.join(
      __dirname,
      '..',
      'units',
      'ks2_ww2',
      'worksheets',
      'lesson_02_evacuation_worksheet.html',
    ),
    isL3: false,
  },
  {
    path: path.join(
      __dirname,
      '..',
      'public',
      'units',
      'ks2_ww2',
      'worksheets',
      'lesson_03_kindertransport_worksheet.html',
    ),
    isL3: true,
  },
  {
    path: path.join(
      __dirname,
      '..',
      'units',
      'ks2_ww2',
      'worksheets',
      'lesson_03_kindertransport_worksheet.html',
    ),
    isL3: true,
  },
];

targetFiles.forEach((t) => updateWorksheet(t.path, t.isL3));
console.log('🎉 Blank suitcase patch complete!');
