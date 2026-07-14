const fs = require('fs');

let code = fs.readFileSync('cme_new/src/timeline_task.js', 'utf8');

// 1. Reduce padding of the timeline container
code = code.replace(
  'padding: 20px 0;"',
  'padding: 10px 0;"'
);

// 2. Reduce max-width of wrapper
code = code.replace(
  "wrapper.style.maxWidth = '650px';",
  "wrapper.style.maxWidth = '550px';"
);

// 3. Adjust font size of the card
code = code.replace(
  "el.style.fontSize = '1.15rem';",
  "el.style.fontSize = '1rem';"
);

// 4. Adjust padding inside the card (grip handle)
code = code.replace(
  '<div style="background: #e2e8f0; color: #64748b; padding: 20px 15px; display: flex; align-items: center; justify-content: center; border-right: 1px solid #cbd5e1;">',
  '<div style="background: #e2e8f0; color: #64748b; padding: 12px 12px; display: flex; align-items: center; justify-content: center; border-right: 1px solid #cbd5e1;">'
);

// 5. Adjust padding inside the card (text area)
code = code.replace(
  '<div style="padding: 20px; flex: 1; line-height: 1.5;">${item.text}</div>',
  '<div style="padding: 12px 15px; flex: 1; line-height: 1.4;">${item.text}</div>'
);

// 6. Adjust arrow size and padding
code = code.replace(
  "arrow.style.fontSize = '1.5rem';",
  "arrow.style.fontSize = '1.2rem';"
);
code = code.replace(
  "arrow.style.padding = '10px 0';",
  "arrow.style.padding = '5px 0';"
);

fs.writeFileSync('cme_new/src/timeline_task.js', code, 'utf8');
console.log('Successfully made domino flowcharts more compact!');
