const fs = require('fs');

let dataFile = 'edexcel_medicine/data.js';
let content = fs.readFileSync(dataFile, 'utf8');

// First fix the specific wording for the anatomical knowledge question
content = content.replace(
  /"Explain why the Renaissance was a period of rapid progress in anatomical knowledge\.?"/g,
  '"Explain why there was rapid progress in anatomical knowledge in the years c1500–c1700. (12 marks)"'
);

// Now find all other "Explain why..." questions that do not end with (12 marks)
content = content.replace(/("text"\s*:\s*|"question"\s*:\s*)"Explain why ([^"]+)"/g, (match, prefix, text) => {
  if (text.includes('(12 marks)')) {
    return `${prefix}"Explain why ${text}"`;
  } else {
    // Check if there's a trailing period before adding (12 marks)
    let cleanText = text.trim();
    if (cleanText.endsWith('.')) {
      cleanText = cleanText.slice(0, -1).trim();
    }
    return `${prefix}"Explain why ${cleanText}. (12 marks)"`;
  }
});

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Fixed exam questions in edexcel_medicine/data.js');
