import fs from 'fs';

let layoutJs = fs.readFileSync('src/layout.js', 'utf8');

const helper = `
export function updateMobileNavActive(activeId) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeEl = document.getElementById(activeId);
  if (activeEl) activeEl.classList.add('active');
}
`;

fs.writeFileSync('src/layout.js', layoutJs + '\n' + helper);
console.log("Appended helper to layout.js");
