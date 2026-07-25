import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the "Major War Revision Quizzes" card
const startMarker = '<!-- Educator Resource Hub: War-Specific Quiz Pack Card -->';
const endMarker = '<!-- Dynamic Exam Sheet Container (Hidden until paper is active) -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  html = html.substring(0, startIndex) + html.substring(endIndex);
}

// 2. Trim the Worksheet Styles dropdown
const oldDropdown = `<select class="select-input" id="bulk-workbook-style" style="width: 100%; padding: 10px 12px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.9rem; outline: none; cursor: pointer;">
                  <option value="study">Lesson Study Sheet (Read ➔ Write)</option>
                  <option value="timeline">Differentiated Active Recall Timeline</option>
                  <option value="exam">Focused Exam Practice Pack</option>
                  <option value="quiz">Quick-Fire Quiz Sheet</option>
                </select>`;

const newDropdown = `<select class="select-input" id="bulk-workbook-style" style="width: 100%; padding: 10px 12px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.9rem; outline: none; cursor: pointer;">
                  <option value="study">The Complete Lesson Pack (Narrative + Timeline + Wars)</option>
                  <option value="quiz">Quick-Fire Quizzes Only (15-Q Recall)</option>
                </select>`;

html = html.replace(oldDropdown, newDropdown);

fs.writeFileSync('index.html', html);
console.log('UI cleanup applied to index.html');
