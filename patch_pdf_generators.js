const fs = require('fs');
const path = require('path');

const units = ['great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'change_1450_1750', 'cme', 'eee', 'usa'];

const scriptInjection = `
<script src="/knowledge_bank.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    try {
      const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
      if (taught.length > 0 && window.KNOWLEDGE_BANK) {
        const doNows = document.querySelectorAll('.do-now-q');
        doNows.forEach(q => {
          if (q.textContent.includes('PAST TOPIC:')) {
            const unit = taught[Math.floor(Math.random() * taught.length)];
            const bank = window.KNOWLEDGE_BANK[unit];
            if (bank && bank.length > 0) {
              const randQ = bank[Math.floor(Math.random() * bank.length)];
              const strong = q.querySelector('strong');
              const prefix = strong ? strong.outerHTML + ' ' : '';
              q.innerHTML = prefix + 'PAST TOPIC: ' + randQ.question;
              
              // If answer key, update the next sibling
              const nextEl = q.nextElementSibling;
              if (nextEl && nextEl.style && nextEl.style.color === 'red') {
                nextEl.innerHTML = randQ.answer;
              }
            }
          }
        });
      }
    } catch (e) { console.error('Dynamic Do Now error:', e); }
  });
</script>
</body>
`;

units.forEach(unit => {
  ['generate_worksheets.js', 'generate_answer_key.js'].forEach(file => {
    const filePath = path.join(__dirname, unit, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (!content.includes('knowledge_bank.js')) {
        content = content.replace('</body>', scriptInjection);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Patched ${filePath}`);
      }
    }
  });
});
