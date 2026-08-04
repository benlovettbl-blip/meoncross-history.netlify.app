const fs = require('fs');

const corePath = 'src/core_app.js';
let coreApp = fs.readFileSync(corePath, 'utf8');

const getNewRenderLesson = require('./new_renderLesson.js');
const newRenderLesson = getNewRenderLesson();

// We need to find the start and end of the old renderLesson.
// It starts at "// Render Lesson Content\n  function renderLesson(lesson) {"
// It ends right before "  // Toggling elements helper\n  window.toggleElement = (id) => {"

const startMarker = "// Render Lesson Content";
const endMarker = "// Toggling elements helper";

const startIndex = coreApp.indexOf(startMarker);
const endIndex = coreApp.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found!");
  process.exit(1);
}

const before = coreApp.substring(0, startIndex);
const after = coreApp.substring(endIndex);

// Add the switchTab function into the after string, before toggleElement
const switchTabFunc = `
  window.switchTab = (tabId) => {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(el => {
      el.style.display = 'none';
    });
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    // Show requested tab
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.style.display = 'block';
    }
    // Set clicked button to active (we can find it via the onclick string)
    const btn = document.querySelector(\`button[onclick*="\${tabId}"]\`);
    if (btn) {
      btn.classList.add('active');
    }
  };

  // Toggling elements helper
`;

const updatedAfter = after.replace("// Toggling elements helper", switchTabFunc);

const newCoreApp = before + newRenderLesson + updatedAfter;

fs.writeFileSync(corePath, newCoreApp, 'utf8');
console.log("Successfully replaced renderLesson and added switchTab function!");
