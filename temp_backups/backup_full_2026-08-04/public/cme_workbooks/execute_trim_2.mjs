import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Remove Classic Accordions view toggle
const classicToggle = `<button class="mode-btn" data-mode="classic">
              <i class="fa-solid fa-list-ul"></i> <span>Accordions</span>
            </button>`;
indexHtml = indexHtml.replace(classicToggle, '');

// 2. Remove Classic Accordions View Section
const classicSectionStart = '<!-- 2. CLASSIC ACCORDIONS VIEW -->';
const classicSectionEnd = '<!-- 3. FLASHCARDS STUDY VIEW -->';
const startIndex = indexHtml.indexOf(classicSectionStart);
const endIndex = indexHtml.indexOf(classicSectionEnd);
if (startIndex !== -1 && endIndex !== -1) {
  indexHtml = indexHtml.substring(0, startIndex) + indexHtml.substring(endIndex);
}

// 3. Remove "Chronological Order" toggle
const orderToggleRegex = /<div class="form-group">\s*<label class="form-label">Question Order<\/label>\s*<select class="select-input" id="exam-order-select">\s*<option value="random">Randomized Shuffle<\/option>\s*<option value="chronological">Chronological Order<\/option>\s*<\/select>\s*<\/div>/;
indexHtml = indexHtml.replace(orderToggleRegex, '');

// 4. Remove "Skip Question" Button
const skipButtonRegex = /<div style="margin-top: 8px;">\s*<button class="btn-secondary" id="btn-exam-skip" style="width: 100%;">Skip Question<\/button>\s*<\/div>/;
indexHtml = indexHtml.replace(skipButtonRegex, '');

fs.writeFileSync('index.html', indexHtml);
console.log("UI trims applied.");
