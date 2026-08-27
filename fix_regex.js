const fs = require('fs');

['generate_pupil_workbooks.js', 'generate_workbooks.js', 'generate_textbooks.js'].forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\/\^Q\(\\d\+\)\/i/g, '/Q(\\d+)/i');
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
  }
});
