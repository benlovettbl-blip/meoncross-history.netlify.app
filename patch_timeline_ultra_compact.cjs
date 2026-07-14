const fs = require('fs');

let code = fs.readFileSync('cme_new/src/timeline_task.js', 'utf8');

// Container
code = code.replace(
  '<div style="max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 4px solid #3b82f6;">',
  '<div style="max-width: 1100px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border: 2px solid #3b82f6;">'
);

// H1
code = code.replace(
  'font-size: 3rem; color: #1e3a8a; margin-top: 0; margin-bottom: 10px;',
  'font-size: 2rem; color: #1e3a8a; margin-top: 0; margin-bottom: 5px;'
);

// Paragraph
code = code.replace(
  'font-size: 1.2rem; color: #475569;"',
  'font-size: 0.95rem; margin-bottom: 5px; color: #475569;"'
);

// Selection area
code = code.replace(
  'margin-bottom: 30px; background: #f8fafc; padding: 20px;',
  'margin-bottom: 15px; background: #f8fafc; padding: 10px;'
);
code = code.replace(
  'gap: 15px; flex-wrap: wrap;"',
  'gap: 10px; flex-wrap: wrap;"'
);

// Select Label
code = code.replace(
  'margin-bottom: 10px; color: #334155; font-size: 1.1rem;',
  'margin-bottom: 5px; color: #334155; font-size: 0.95rem;'
);

// Select
code = code.replace(
  'padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem;',
  'padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.95rem;'
);

// Button Focus
code = code.replace(
  'padding: 14px 20px; height: 55px; border-radius: 10px; font-weight: 600;',
  'padding: 8px 15px; height: 38px; border-radius: 6px; font-weight: 500; font-size: 0.95rem;'
);

// Timeline Container
code = code.replace(
  'id="timeline-container" style="display: flex; flex-direction: column; align-items: center; gap: 0; margin-bottom: 30px; padding: 10px 0;"',
  'id="timeline-container" style="display: flex; flex-direction: column; align-items: center; gap: 0; margin-bottom: 15px; padding: 5px 0;"'
);

// Wrapper max width
code = code.replace(
  "wrapper.style.maxWidth = '550px';",
  "wrapper.style.maxWidth = '900px';"
);

// Font Size
code = code.replace(
  "el.style.fontSize = '1rem';",
  "el.style.fontSize = '0.85rem';"
);

// Grip Handle
code = code.replace(
  '<div style="background: #e2e8f0; color: #64748b; padding: 12px 12px; display: flex; align-items: center; justify-content: center; border-right: 1px solid #cbd5e1;">',
  '<div style="background: #e2e8f0; color: #64748b; padding: 8px 10px; display: flex; align-items: center; justify-content: center; border-right: 1px solid #cbd5e1;">'
);

// Text area
code = code.replace(
  '<div style="padding: 12px 15px; flex: 1; line-height: 1.4;">',
  '<div style="padding: 8px 12px; flex: 1; line-height: 1.3;">'
);

// Buttons Check / Reset
code = code.replace(
  'padding: 14px 28px; font-size: 1.2rem; border: none; border-radius: 10px; font-weight: 600;',
  'padding: 10px 20px; font-size: 1rem; border: none; border-radius: 6px; font-weight: 600;'
);
code = code.replace(
  'padding: 14px 28px; font-size: 1.2rem; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600;',
  'padding: 10px 20px; font-size: 1rem; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 600;'
);

// Arrow padding
code = code.replace(
  "arrow.style.padding = '5px 0';",
  "arrow.style.padding = '2px 0';"
);
code = code.replace(
  "arrow.style.fontSize = '1.2rem';",
  "arrow.style.fontSize = '1rem';"
);

fs.writeFileSync('cme_new/src/timeline_task.js', code, 'utf8');
console.log('Successfully made domino flowcharts even more compact!');
