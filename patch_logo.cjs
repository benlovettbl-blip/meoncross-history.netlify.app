const fs = require('fs');

let code = fs.readFileSync('cme_new/index.html', 'utf8');

const oldHeader = `<div class="sidebar-header" style="padding: 1.5rem 1rem; border-bottom: 1px solid var(--border-glass); cursor: pointer;" onclick="window.location.href='/'" title="Back to History Hub">`;
const newHeader = `<div class="sidebar-logo" style="padding: 1.5rem 1rem; border-bottom: 1px solid var(--border-glass); cursor: pointer; margin-bottom: 0;" onclick="window.location.href='/'" title="Back to History Hub">`;

code = code.replace(oldHeader, newHeader);

const oldInner = `<div style="display: flex; align-items: center; gap: 10px;">
          <i class="fa-solid fa-graduation-cap" style="font-size: 1.8rem; color: #1a237e;"></i>
          <div>
            <h2 style="margin: 0; font-size: 1rem; font-weight: 700; line-height: 1.2; color: #1a237e;">Mr Lovett's History Hub</h2>
            <span style="font-size: 0.75rem; color: #555;">History Portal</span>
          </div>
        </div>`;

const newInner = `<i class="fa-solid fa-graduation-cap logo-icon"></i>
        <div>
          <h2 style="margin: 0;">Mr Lovett's History Hub</h2>
          <span>History Portal</span>
        </div>`;

code = code.replace(oldInner, newInner);

fs.writeFileSync('cme_new/index.html', code, 'utf8');
console.log('Successfully patched cme_new/index.html logo');
