const fs = require('fs');

const apps = ['norman_conquest', 'change_1450_1750', 'great_war', 'great_war_part2', 'water_and_sanitation', 'cme', 'eee', 'usa'];
apps.forEach(app => {
  const p = app + '/index.html';
  if (fs.existsSync(p)) {
    let html = fs.readFileSync(p, 'utf8');
    const newBtn = `<button id="btn-text-size" class="btn btn-secondary" style="margin-right: 5px;" onclick="document.body.classList.toggle('large-text')"><i class="fa-solid fa-text-height"></i> A+ / A-</button>\n          <button id="btn-dyslexia"`;
    
    html = html.replace('<button id="btn-dyslexia"', newBtn);
    fs.writeFileSync(p, html);
    console.log("Updated", p);
  }
});
