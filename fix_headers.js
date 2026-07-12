const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const files = execSync('dir /b /s index.html').toString().split('\r\n').filter(f => f && !f.includes('node_modules') && !f.includes('public'));
  
  const rx = /<div class="header-actions"[^>]*>([\s\S]*?)<\/div>\s*<\/header>/;
  const repl = `<div class="header-actions" style="display: flex; gap: 10px; align-items: center;">
          <button id="btn-fullscreen" class="btn btn-secondary" style="margin-right: 5px; padding: 6px 12px;" onclick="if (!document.fullscreenElement) { const el = document.querySelector('.main-wrapper') || document.documentElement; el.requestFullscreen(); } else { document.exitFullscreen(); }" title="Full Screen"><i class="fa-solid fa-expand"></i></button>
          <button id="btn-simplify" class="btn btn-secondary" style="margin-right: 5px; padding: 6px 12px;" onclick="document.body.classList.toggle('simplified-mode')" title="Simplify Text"><i class="fa-solid fa-language"></i></button>
          <button id="btn-text-size" class="btn btn-secondary" style="margin-right: 5px; padding: 6px 12px;" onclick="document.body.classList.toggle('large-text')" title="A+ / A-"><i class="fa-solid fa-text-height"></i></button>
          <button id="btn-dyslexia" class="btn btn-secondary" style="padding: 6px 12px;" title="SEN / Dyslexia Mode"><i class="fa-solid fa-glasses"></i></button>
        </div>
      </header>`;

  files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    if(c.match(rx)) {
      fs.writeFileSync(f, c.replace(rx, repl));
      console.log('Fixed', f);
    }
  });
} catch (e) {
  console.error(e);
}
