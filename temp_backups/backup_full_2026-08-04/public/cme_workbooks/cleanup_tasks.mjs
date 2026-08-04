import fs from 'fs';

let indexHtml = fs.readFileSync('index.html', 'utf8');

// TASK 1: Trim Worksheet Style Dropdown
const oldStyleSelect = `<select class="select-input" id="bulk-workbook-style" style="width: 100%; padding: 10px 12px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.9rem; outline: none; cursor: pointer;">
                  <option value="study">Lesson Study Sheet (Read ➔ Write)</option>
                  <option value="timeline">Differentiated Active Recall Timeline</option>
                  <option value="exam">Focused Exam Practice Pack</option>
                  <option value="quiz">Quick-Fire Quiz Sheet</option>
                </select>`;
const newStyleSelect = `<select class="select-input" id="bulk-workbook-style" style="width: 100%; padding: 10px 12px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-family: var(--font-body); font-size: 0.9rem; outline: none; cursor: pointer;">
                  <option value="study">Complete Lesson Pack</option>
                  <option value="quiz">Quick-Fire Quizzes Only</option>
                </select>`;
if (indexHtml.includes(oldStyleSelect)) {
  indexHtml = indexHtml.replace(oldStyleSelect, newStyleSelect);
  console.log("Trimming Bulk Generator Dropdown: Done");
} else {
  console.log("Could not find Bulk Generator Dropdown to trim.");
}

// TASK 2: Eliminate Layout Density Toggles
// 2A: Bulk Generator
const bulkDensityContainerRegex = /<div class="form-group" style="flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 8px;">\s*<label class="form-label" style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var\(--text-muted\);">Layout Density<\/label>\s*<select class="select-input" id="bulk-workbook-density".*?>\s*<option value="comfortable">Comfortable \(Standard spacing\)<\/option>\s*<option value="compact">Compact \(Fewer writing lines\)<\/option>\s*<\/select>\s*<\/div>/g;
indexHtml = indexHtml.replace(bulkDensityContainerRegex, '');
console.log("Removing Bulk Layout Density: Done");

// 2B: Individual Workbook Creator
// Let's find it.
const indDensityContainerRegex = /<div class="form-group">\s*<label class="form-label">Layout Density<\/label>\s*<select class="select-input" id="workbook-creator-density">\s*<option value="comfortable">Comfortable \(Standard spacing\)<\/option>\s*<option value="compact">Compact \(Fewer writing lines\)<\/option>\s*<\/select>\s*<\/div>/g;
indexHtml = indexHtml.replace(indDensityContainerRegex, '');
console.log("Removing Individual Layout Density: Done");


// TASK 3: Condense Revision Games Hub
const btnMastery = `<button class="tab-btn" id="btn-tab-game-mastery">
              <i class="fa-solid fa-trophy"></i> Mastery Match
            </button>`;
const btnMindmap = `<button class="tab-btn" id="btn-tab-game-mindmap">
              <i class="fa-solid fa-diagram-project"></i> Concept Mindmapper
            </button>`;

indexHtml = indexHtml.replace(btnMastery, '');
indexHtml = indexHtml.replace(btnMindmap, '');

const containerMastery = `<!-- Container for Mastery Match Game -->
          <div id="game-mastery-container" class="game-view-pane" style="display: none;">
            <div id="mastery-game-play-area">
              <!-- Dynamically populated -->
            </div>
          </div>`;
const containerMindmap = `<!-- Container for Concept Connector Game -->
          <div id="game-mindmap-container" class="game-view-pane" style="display: none;">
            <div id="mindmap-game-play-area">
              <!-- Dynamically populated -->
            </div>
          </div>`;

indexHtml = indexHtml.replace(containerMastery, '');
indexHtml = indexHtml.replace(containerMindmap, '');

fs.writeFileSync('index.html', indexHtml);
console.log("Condensing Games Hub: Done");
