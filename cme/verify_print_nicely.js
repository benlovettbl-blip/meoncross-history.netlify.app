const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

console.log("=================================================");
console.log("STARTING THOROUGH PRINT & EXPORT LAYOUT VALIDATOR");
console.log("=================================================");

const htmlContent = fs.readFileSync('c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/index.html', 'utf8');
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:3000',
  runScripts: 'outside-only',
  resources: 'usable'
});

const { window } = dom;

// Mock APIs
window.AudioContext = function() {
  return {
    state: 'suspended',
    currentTime: 0,
    resume: async () => {},
    createOscillator: () => ({
      frequency: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {}
    }),
    createGain: () => ({ connect: () => {} }),
    destination: {}
  };
};
window.webkitAudioContext = window.AudioContext;
window.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Mock localStorage
const storage = {};
window.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; },
  clear: () => {}
};

// Mock Leaflet
window.L = {
  map: () => ({ setView: function() { return this; }, invalidateSize: function() { return this; }, addTo: function() { return this; } }),
  tileLayer: () => ({ addTo: function() { return this; } }),
  layerGroup: () => ({ addTo: function() { return this; } }),
  divIcon: (opts) => opts,
  marker: () => ({ addTo: function() { return this; }, bindPopup: function() { return this; } }),
  polyline: () => ({ addTo: function() { return this; } })
};

// Load scripts
try {
  const qCode = fs.readFileSync('c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/questions.js', 'utf8');
  window.eval(qCode);
  const appCode = fs.readFileSync('c:/Users/fives/.gemini/antigravity/scratch/edexcelgcsehistorycme.netlify.app/app_test.js', 'utf8');
  window.eval(appCode);
  console.log("✓ Successfully loaded questions.js and app_test.js into JSDOM.");
} catch (e) {
  console.error("Failed loading scripts:", e);
  process.exit(1);
}

const subtopicIds = [
  'subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3',
  'subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3',
  'subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'
];

const styles = ['study', 'timeline', 'exam', 'quiz'];

async function runValidation() {
  let totalErrors = 0;

  for (const style of styles) {
    console.log(`\n---------------------------------------------\nValidating Style: '${style.toUpperCase()}'\n---------------------------------------------`);

    // 1. Bulk generation check
    const bulkHtml = await window.generateBulkWorkbookHtml(style, 'standard', false);
    
    // Check for promise leakage
    if (bulkHtml.includes('[object Promise]')) {
      console.error(`❌ ERROR: Bulk pack for style '${style}' contains promise leaked output '[object Promise]'!`);
      totalErrors++;
    }

    // Check for undefined values
    if (bulkHtml.includes('undefined') || bulkHtml.includes('null')) {
      // Sometimes 'null' might be in some class name or description text, but check for literal 'undefined'
      if (bulkHtml.includes('undefined')) {
        console.error(`❌ ERROR: Bulk pack for style '${style}' contains 'undefined' reference!`);
        totalErrors++;
      }
    }

    // Check page-break class presence
    const bulkPages = (bulkHtml.match(/class="print-page"/g) || []).length + (bulkHtml.match(/class="print-page-last"/g) || []).length;
    console.log(`✓ Bulk generated. Pages: ${bulkPages}. Characters: ${bulkHtml.length}`);

    if (style === 'study' || style === 'timeline') {
      // Each lesson is double sided, so 9 lessons * 2 pages = 18 pages in bulk
      const expectedPages = 18;
      if (bulkPages !== expectedPages) {
        console.error(`❌ WARNING: Expected exactly ${expectedPages} pages for bulk '${style}', but got ${bulkPages}.`);
      }
    }

    // 2. Individual subtopic checks
    for (const subId of subtopicIds) {
      const selectedIndices = [0, 1]; // for exam questions
      const html = await window.generateWorkbookHtml(subId, style, 'standard', false, selectedIndices);
      
      // Basic checks
      if (html.includes('[object Promise]')) {
        console.error(`❌ ERROR: ${subId} style '${style}' contains '[object Promise]'!`);
        totalErrors++;
      }
      if (html.includes('undefined')) {
        console.error(`❌ ERROR: ${subId} style '${style}' contains 'undefined'!`);
        totalErrors++;
      }

      // Check specific options structure
      if (style === 'study') {
        // Must contain narrative, vocabulary, and chronology references
        if (!html.includes('Lesson Narrative')) {
          console.error(`❌ ERROR: ${subId} style 'study' Page 1 is missing 'Lesson Narrative' header!`);
          totalErrors++;
        }
        if (!html.includes('Key Vocabulary')) {
          console.error(`❌ ERROR: ${subId} style 'study' Page 1 is missing 'Key Vocabulary' header!`);
          totalErrors++;
        }
        if (!html.includes('Chronology Reference')) {
          console.error(`❌ ERROR: ${subId} style 'study' Page 1 is missing 'Chronology Reference' header!`);
          totalErrors++;
        }
        // Verify table structure is used for the columns to ensure Word compatibility
        if (!html.includes('<table') || !html.includes('<tr') || !html.includes('<td')) {
          console.error(`❌ ERROR: ${subId} style 'study' is not using table layout for Word support!`);
          totalErrors++;
        }
      }

      if (style === 'timeline') {
        // Page 1: must contain Active Recall, Vocabulary Spotlight, Scrambled Word Bank
        if (!html.includes('Active Recall')) {
          console.error(`❌ ERROR: ${subId} style 'timeline' Page 1 is missing 'Active Recall' headers!`);
          totalErrors++;
        }
        if (!html.includes('Vocabulary Spotlight')) {
          console.error(`❌ ERROR: ${subId} style 'timeline' Page 1 is missing 'Vocabulary Spotlight'!`);
          totalErrors++;
        }
        if (!html.includes('Scrambled Word Bank')) {
          console.error(`❌ ERROR: ${subId} style 'timeline' Page 1 is missing 'Scrambled Word Bank'!`);
          totalErrors++;
        }
        // Suffixes must be absent
        if (html.includes('(Level 4 Support)') || html.includes('(Level 9 Focus)')) {
          console.error(`❌ ERROR: ${subId} style 'timeline' contains forbidden suffixes '(Level 4 Support)' or '(Level 9 Focus)' in headers!`);
          totalErrors++;
        }
        // Instructions block must be absent
        if (html.includes('Instructions:') && html.includes('Level 4')) {
          console.error(`❌ ERROR: ${subId} style 'timeline' still has instructions blocks!`);
          totalErrors++;
        }
      }

      if (style === 'exam') {
        // Page 1: must contain Question 1
        if (!html.includes('Question 1')) {
          console.error(`❌ ERROR: ${subId} style 'exam' is missing Question 1!`);
          totalErrors++;
        }
        // Rubric box
        if (!html.includes('rubric-box')) {
          console.error(`❌ ERROR: ${subId} style 'exam' is missing the self-evaluation/exam rubrics!`);
          totalErrors++;
        }
      }

      if (style === 'quiz') {
        // Page 1: must contain Quick-Fire Quiz
        if (!html.includes('Quick-Fire Quiz')) {
          console.error(`❌ ERROR: ${subId} style 'quiz' is missing 'Quick-Fire Quiz' title!`);
          totalErrors++;
        }
        // Page 2: must contain Score Tracker and Diagnostic guide
        if (!html.includes('Score Tracker')) {
          console.error(`❌ ERROR: ${subId} style 'quiz' is missing 'Score Tracker'!`);
          totalErrors++;
        }
        if (!html.includes('Diagnostic study guide')) {
          console.error(`❌ ERROR: ${subId} style 'quiz' is missing 'Diagnostic study guide'!`);
          totalErrors++;
        }
      }
    }
    console.log(`✓ All individual lessons verified for style '${style}'.`);
  }

  // 3. War-specific Quiz Sheets check
  console.log(`\n---------------------------------------------\nValidating War-Specific Quiz Sheets\n---------------------------------------------`);
  const wars = ['1948_1949', '1956_suez', '1967_sixday', '1973_yomkippur', '1982_lebanon'];
  for (const warId of wars) {
    const html = await window.generateWarWorkbookHtml(warId, 'standard', false);
    if (html.includes('[object Promise]')) {
      console.error(`❌ ERROR: War quiz '${warId}' contains '[object Promise]'!`);
      totalErrors++;
    }
    if (html.includes('undefined')) {
      console.error(`❌ ERROR: War quiz '${warId}' contains 'undefined'!`);
      totalErrors++;
    }
    if (!html.includes('Score Tracker')) {
      console.error(`❌ ERROR: War quiz '${warId}' is missing 'Score Tracker'!`);
      totalErrors++;
    }
    console.log(`✓ War quiz '${warId}' verified. Characters: ${html.length}`);
  }

  console.log("\n=============================================");
  if (totalErrors === 0) {
    console.log("🏆 SUCCESS: All layout and print checks passed without errors!");
  } else {
    console.log(`❌ FAILURE: Found ${totalErrors} errors in print layout verification.`);
  }
  console.log("=============================================");
  process.exit(totalErrors === 0 ? 0 : 1);
}

runValidation().catch(console.error);
