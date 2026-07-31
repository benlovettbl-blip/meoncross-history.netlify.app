const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'great_war_v2', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. Replace the sticky header
appContent = appContent.replace(
  /<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position: sticky; top: 0; background: white; padding: 15px 0; z-index: 1000; border-bottom: 2px solid #e2e8f0;">\s*<h2 style="margin: 0;">\$\{lesson\.title\}<\/h2>\s*<div style="display: flex; gap: 10px;">\s*<button class="btn btn-secondary" onclick="window\.renderDashboard\(\)"><i class="fa-solid fa-arrow-left"><\/i> Unit Menu<\/button>\s*<button class="btn btn-secondary" onclick="window\.location\.href='\.\.\/index\.html'"><i class="fa-solid fa-house"><\/i> Main Dashboard<\/button>\s*<\/div>\s*<\/div>/,
  `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position: sticky; top: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 10px 15px; z-index: 1000; border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <h4 style="margin: 0; font-size: 1.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; color: var(--primary);">\${lesson.title}</h4>
    <div style="display: flex; gap: 8px;">
      <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
      <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.9rem;" onclick="window.location.href='../index.html'"><i class="fa-solid fa-house"></i> Main Dashboard</button>
    </div>
  </div>`
);

// 2. Replace the renderDashboard implementation
const oldDashboardRegex = /window\.renderDashboard = \(\) => \{[\s\S]*?contentArea\.innerHTML = html;\s*\};/;

const newDashboardCode = `window.renderDashboard = () => {
    let html = \`<div class="dashboard-view" style="padding: 0 20px 40px 20px;">
      <div style="background: linear-gradient(to right, rgba(26,35,126,0.9), rgba(26,35,126,0.7)), url('../great_war/assets/ww1_road_to_war.png') no-repeat center center/cover; padding: 60px 30px; border-radius: 12px; color: white; margin-bottom: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <h1 style="margin: 0 0 10px 0; font-size: 2.8rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">The Great War: Causes & Outbreak</h1>
        <p style="margin: 0; font-size: 1.2rem; max-width: 650px; opacity: 0.95; line-height: 1.5; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Explore the long-term tensions and short-term triggers that plunged Europe into the most devastating conflict the world had ever seen.</p>
        <button class="btn btn-secondary" style="margin-top: 25px; padding: 10px 20px;" onclick="window.location.href='../index.html'"><i class="fa-solid fa-house"></i> Back to Main Menu</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
    \`;
    unitData.lessons.forEach((l, idx) => {
      let imgSrc = l.primary_source ? l.primary_source.src : 'assets/ww1_road_to_war.png';
      if (!imgSrc.startsWith('../')) imgSrc = \`../great_war/\${imgSrc}\`;
      
      html += \`<div class="lesson-card" onclick="window.renderLesson(\${idx})" style="cursor: pointer; border-radius: 12px; overflow: hidden; background: white; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; display: flex; flex-direction: column;">
        <div style="height: 180px; background: url('\${imgSrc}') no-repeat center center/cover; border-bottom: 4px solid var(--primary);"></div>
        <div style="padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="color: #64748b; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Lesson \${idx + 1}</div>
            <h3 style="margin: 0; font-size: 1.2rem; color: #1e293b; line-height: 1.4;">\${l.title.replace(/^Lesson \\d+: /, '')}</h3>
          </div>
          <div style="margin-top: 25px; display: flex; align-items: center; justify-content: space-between; color: var(--primary); font-weight: 600; font-size: 0.95rem;">
            <span>Start Lesson</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>\`;
    });
    html += \`</div>
    </div>\`;
    contentArea.innerHTML = html;
  };`;

appContent = appContent.replace(oldDashboardRegex, newDashboardCode);

fs.writeFileSync(appPath, appContent);
console.log("Updated app.js");
