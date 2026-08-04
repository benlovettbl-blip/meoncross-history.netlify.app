const fs = require('fs');

const cssOverride = `
<style id="overflow-fixes">
  /* Global Layout Spillage Fixes */
  .page {
    padding: 8mm 12mm !important; /* Slightly thinner margins */
  }
  .page h1.unit-title { font-size: 16pt !important; margin-bottom: 4px !important; padding: 4px !important; }
  .page h2.lesson-title { font-size: 14pt !important; margin-bottom: 4px !important; padding: 4px !important; }
  .page h3.section-subtitle { font-size: 11pt !important; margin: 4px 0 !important; }
  .page h4.task-heading { font-size: 10pt !important; margin: 2px 0 !important; }
  
  .page p { margin-bottom: 4px !important; line-height: 1.2 !important; }
  
  .vocab-container { margin-bottom: 4px !important; }
  .vocab-grid { gap: 4px !important; }
  .vocab-item { padding: 4px !important; font-size: 8pt !important; }
  
  /* Do Now Tables */
  table { margin-top: 4px !important; font-size: 8.5pt !important; }
  td { padding: 4px 6px !important; }
  
  /* Images and Maps */
  .map-container { margin: 4px 0 !important; }
  .map-container img { max-height: 160px !important; object-fit: contain !important; }
  
  /* Reading Narratives */
  .narrative-col { font-size: 9pt !important; line-height: 1.3 !important; margin-bottom: 4px !important; }
  .simplified-narrative { font-size: 9pt !important; line-height: 1.3 !important; }
  .source-box { font-size: 9pt !important; padding: 6px !important; margin: 4px 0 !important; }
  
  /* Assessment lines */
  .writing-lines-box { height: auto !important; min-height: 40px !important; }
  
  /* Ensure page footer sits nicely without spilling */
  .page-footer { margin-top: auto !important; padding-top: 4px !important; font-size: 8pt !important; }
</style>
`;

let html = fs.readFileSync('great_war/index.html', 'utf8');

// Remove existing override if present
html = html.replace(/<style id="overflow-fixes">[\s\S]*?<\/style>/, '');

// Insert just before </head>
html = html.replace('</head>', cssOverride + '\n</head>');

fs.writeFileSync('great_war/index.html', html);
console.log('Successfully injected overflow CSS fixes!');
