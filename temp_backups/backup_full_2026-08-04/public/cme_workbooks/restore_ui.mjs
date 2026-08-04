import fs from 'fs';

// 1. Patch index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Remove subtopic-mode-switcher
const modeSwitcherStart = '<div class="mode-switcher" id="subtopic-mode-switcher" style="display: none;">';
const modeSwitcherEnd = '</div>\n        </div>\n      </header>';
const startIdx = html.indexOf(modeSwitcherStart);
if (startIdx !== -1) {
  const endIdx = html.indexOf('</div>', startIdx + modeSwitcherStart.length);
  // Actually, let's just use regex for it.
}
// Regex to remove mode-switcher
html = html.replace(/<div class="mode-switcher" id="subtopic-mode-switcher" style="display: none;">[\s\S]*?<\/div>/, '');

// B. Restore Sidebar Fareham Title
html = html.replace('<h2 class="brand-title" style="font-size: 0.9rem; line-height: 1.2; font-weight: 700;">Edexcel GCSE History</h2>',
                    '<h2 class="brand-title" style="font-size: 0.9rem; line-height: 1.2; font-weight: 700;">Fareham Chimney Sweep Inc.</h2>');

// C. Restore Top Header Fareham Title
html = html.replace('Edexcel GCSE History Paper 2 • Study Dashboard', 'Fareham Chimney Sweep Inc. • Study Dashboard');

// D. Restore Top Header Chimney Logo
// Find <div class="brand-icon" id="header-brand-logo" ...> <i class="fa-solid fa-globe"></i> </div>
// and replace with bouncy-chimney SVG.
const bouncyChimneySvg = `
          <div class="header-logo bouncy-chimney brand-icon" id="header-brand-logo" title="Fareham Chimney Sweep">
            <svg width="32" height="36" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
              <!-- Chimney Base -->
              <rect x="5" y="24" width="14" height="2" rx="0.5" fill="#a03018" />
              <polygon points="6,24 8,4 16,4 18,24" fill="#e65c00" />
              <polygon points="8,4 16,4 16,6 8,6" fill="#cc4400" />
              <!-- Brick lines -->
              <line x1="8" y1="8" x2="16" y2="8" stroke="#a03018" stroke-width="0.5" />
              <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#a03018" stroke-width="0.5" />
              <line x1="7" y1="16" x2="17" y2="16" stroke="#a03018" stroke-width="0.5" />
              <line x1="6.5" y1="20" x2="17.5" y2="20" stroke="#a03018" stroke-width="0.5" />
              
              <!-- Chimney Pots -->
              <rect x="8.5" y="1" width="3" height="3" rx="0.5" fill="#a03018" />
              <rect x="12.5" y="1" width="3" height="3" rx="0.5" fill="#a03018" />
              
              <!-- Bouncy Smoke Bubbles -->
              <circle cx="10" cy="0" r="1.5" fill="#ffffff" class="smoke-1" opacity="0.8" />
              <circle cx="14" cy="-1" r="2" fill="#ffffff" class="smoke-2" opacity="0.6" />
              <circle cx="11" cy="-3" r="2.5" fill="#ffffff" class="smoke-3" opacity="0.4" />
            </svg>
          </div>
`;
// Top Header Icon
html = html.replace(/<div class="brand-icon" id="header-brand-logo"[\s\S]*?<\/div>/, bouncyChimneySvg);

// Sidebar icon
const sidebarIconRegex = /<div class="brand-icon" style="color: var\(--primary\); font-size: 1\.4rem;">\s*<i class="fa-solid fa-globe"><\/i>\s*<\/div>/;
const sidebarBouncySvg = bouncyChimneySvg.replace('id="header-brand-logo"', 'id="sidebar-brand-logo"');
html = html.replace(sidebarIconRegex, sidebarBouncySvg);

fs.writeFileSync('index.html', html);


// 2. Patch style.css
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/url\('\/assets\/middle_east_header\.png'\)/g, "url('/assets/jerusalem_sunset_hero.png')");
// Wait, the original background in falling_blocks.html also had the bouncy-chimney CSS. 
// I need to make sure the chimney bounce animation CSS is in style.css!
if (!css.includes('chimneyBounce')) {
  const chimneyCss = `
/* Bouncy Chimney Sweeper Logo Animations */
@keyframes chimneyBounce {
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-4px) scale(1.02); }
  60% { transform: translateY(-2px) scale(0.98); }
  80% { transform: translateY(-1px) scale(1.01); }
}
.bouncy-chimney {
  animation: chimneyBounce 2.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  display: inline-block;
  transform-origin: bottom center;
  transition: all 0.2s ease;
  cursor: pointer;
}
.bouncy-chimney:hover {
  animation-play-state: paused;
  transform: scale(1.1) rotate(3deg);
  filter: brightness(1.2) drop-shadow(0 0 8px rgba(255, 183, 3, 0.6));
}
.bouncy-chimney:active {
  transform: scale(0.9) rotate(-3deg);
}
.bouncy-chimney .smoke-1, .bouncy-chimney .smoke-2, .bouncy-chimney .smoke-3 {
  transition: all 0.3s ease;
  transform-origin: center;
}
@keyframes smokeFloat1 { 0% { transform: translateY(0) scale(1); opacity: 0.8; } 100% { transform: translateY(-6px) scale(1.5) translateX(-2px); opacity: 0; } }
@keyframes smokeFloat2 { 0% { transform: translateY(0) scale(1); opacity: 0.6; } 100% { transform: translateY(-8px) scale(1.8) translateX(3px); opacity: 0; } }
@keyframes smokeFloat3 { 0% { transform: translateY(0) scale(1); opacity: 0.4; } 100% { transform: translateY(-10px) scale(2) translateX(-1px); opacity: 0; } }
.bouncy-chimney .smoke-1 { animation: smokeFloat1 2s infinite linear; }
.bouncy-chimney .smoke-2 { animation: smokeFloat2 2.5s infinite linear 0.5s; }
.bouncy-chimney .smoke-3 { animation: smokeFloat3 3s infinite linear 1s; }
`;
  css += chimneyCss;
}

fs.writeFileSync('style.css', css);


// 3. Patch src/views.js
let views = fs.readFileSync('src/views.js', 'utf8');
// Replace the icon rendering with image rendering for topics.
// Find:
/*
    let topicIcon = 'fa-book-open';
    if (topic.id === 'topic_1') topicIcon = 'fa-monument';
    else if (topic.id === 'topic_2') topicIcon = 'fa-jet-fighter';
    else if (topic.id === 'topic_3') topicIcon = 'fa-dove';
    
    card.innerHTML = `
      ...
            <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--primary-glow); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1rem; flex-shrink: 0; margin-top: 2px;">
              <i class="fa-solid ${topicIcon}"></i>
            </div>
*/
const renderDashboardIconLogic = `    let topicIcon = 'fa-book-open';
    if (topic.id === 'topic_1') topicIcon = 'fa-monument';
    else if (topic.id === 'topic_2') topicIcon = 'fa-jet-fighter';
    else if (topic.id === 'topic_3') topicIcon = 'fa-dove';`;

const replacementLogic = `    let badgeImg = 'topic1_badge.png';
    if (topic.id === 'topic_1') badgeImg = 'topic1_badge.png';
    else if (topic.id === 'topic_2') badgeImg = 'topic2_badge.png';
    else if (topic.id === 'topic_3') badgeImg = 'topic3_badge.png';`;

views = views.replace(renderDashboardIconLogic, replacementLogic);

// Replace the actual HTML template injection
const iconHtml = `<div style="width: 32px; height: 32px; border-radius: 8px; background: var(--primary-glow); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1rem; flex-shrink: 0; margin-top: 2px;">
              <i class="fa-solid \${topicIcon}"></i>
            </div>`;
const imgHtml = `<div style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
              <img src="/assets/\${badgeImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="Topic Badge" />
            </div>`;
views = views.replace(iconHtml, imgHtml);

fs.writeFileSync('src/views.js', views);

console.log("Restorations complete.");
