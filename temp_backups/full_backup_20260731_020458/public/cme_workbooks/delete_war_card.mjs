import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// The marker for the start of the Major War card
const cardStartText = '<!-- Educator Resource Hub: War-Specific Quiz Pack Card -->';
// The marker for the next section
const cardEndText = '<!-- Dynamic Exam Sheet Container (Hidden until paper is active) -->';

const startIndex = html.indexOf(cardStartText);
const endIndex = html.indexOf(cardEndText);

if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + html.substring(endIndex);
  fs.writeFileSync('index.html', html);
  console.log("Successfully deleted the Major War card.");
} else {
  console.log("Could not find the bounds to delete the card.");
}
