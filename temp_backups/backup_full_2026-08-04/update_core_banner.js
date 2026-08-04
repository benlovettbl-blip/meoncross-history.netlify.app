const fs = require('fs');

const path = 'src/core_app.js';
let code = fs.readFileSync(path, 'utf8');

// Replace the Exam Guide render code in core_app.js to have beautiful styling
const newRenderExamGuide = `
  function renderExamGuide() {
    contentArea.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'dashboard-container';
    
    let contentHtml = '';
    if (unitData.title && unitData.title.toLowerCase().includes('medicine')) {
      contentHtml = \`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); color: white; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(30, 58, 138, 0.2); position: relative; overflow: hidden; margin-bottom: 30px;">
          <div style="position: relative; z-index: 1;">
            <h1 class="welcome-title" style="color: white; font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; font-family: 'Outfit', sans-serif; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #bfdbfe; font-size: 1.2rem; font-weight: 500; font-family: 'Inter', sans-serif;">The Pearson Edexcel GCSE (9-1) History Paper 1</p>
          </div>
          <!-- Decorative element -->
          <div style="position: absolute; right: 5%; top: 50%; transform: translateY(-50%); opacity: 0.1; font-size: 10rem;">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
        </div>
        <div style="padding: 0;">
          \${sectionAGuide}
          \${sectionBGuide}
        </div>
      \`;
    } else {
      contentHtml = \`
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); color: white; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(30, 58, 138, 0.2); position: relative; overflow: hidden; margin-bottom: 30px;">
          <div style="position: relative; z-index: 1;">
            <h1 class="welcome-title" style="color: white; font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; font-family: 'Outfit', sans-serif; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #bfdbfe; font-size: 1.2rem; font-weight: 500; font-family: 'Inter', sans-serif;">Revision strategies for this unit</p>
          </div>
          <!-- Decorative element -->
          <div style="position: absolute; right: 5%; top: 50%; transform: translateY(-50%); opacity: 0.1; font-size: 10rem;">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <p>No specific exam guidance is available for this unit yet.</p>
        </div>
      \`;
    }
    
    container.innerHTML = contentHtml;
    contentArea.appendChild(container);
  }
`;

// Find the existing renderExamGuide and replace it
const regex = /function renderExamGuide\(\) \{[\s\S]*?contentArea\.appendChild\(container\);\s*\}/;
if (regex.test(code)) {
  code = code.replace(regex, newRenderExamGuide.trim());
  fs.writeFileSync(path, code, 'utf8');
  console.log('Replaced renderExamGuide in core_app.js successfully.');
} else {
  console.log('Could not find renderExamGuide in core_app.js');
}
