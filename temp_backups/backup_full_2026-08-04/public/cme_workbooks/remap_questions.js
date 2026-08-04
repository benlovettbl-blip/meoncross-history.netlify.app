const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '..', 'questions.js');
const fileContent = fs.readFileSync(questionsFile, 'utf8');

// Load QUIZ_DATA using require
const { QUIZ_DATA } = require(questionsFile);

const mapping = {
  "subtopic_1_1": {
    "easy": ["q_1_1_s1", "q_1_1_s2", "q_1_1_s3", "q_1_1_s4", "q_1_1_s10"],
    "medium": ["q_1_1_s5", "q_1_1_s6", "q_1_1_s7", "q_1_1_s9", "q_1_1_d2"],
    "difficult": ["q_1_1_s8", "q_1_1_d1", "q_1_1_d3", "q_1_1_d4", "q_1_1_d6"]
  },
  "subtopic_1_2": {
    "easy": ["q_1_2_s1", "q_1_2_s2", "q_1_2_s3", "q_1_2_s4", "q_1_2_s9"],
    "medium": ["q_1_2_s5", "q_1_2_s6", "q_1_2_s7", "q_1_2_s8", "q_1_2_s10"],
    "difficult": ["q_1_2_d1", "q_1_2_d3", "q_1_2_d4", "q_1_2_d5", "q_1_2_d6"]
  },
  "subtopic_1_3": {
    "easy": ["q_1_3_s1", "q_1_3_s2", "q_1_3_s5", "q_1_3_s7", "q_1_3_s9"],
    "medium": ["q_1_3_s3", "q_1_3_s4", "q_1_3_s6", "q_1_3_s10", "q_1_3_d3"],
    "difficult": ["q_1_3_s8", "q_1_3_d1", "q_1_3_d2", "q_1_3_d4", "q_1_3_d5"]
  },
  "subtopic_2_1": {
    "easy": ["q_2_1_s2", "q_2_1_s3", "q_2_1_s8", "q_2_1_s9", "q_2_1_s10"],
    "medium": ["q_2_1_s1", "q_2_1_s4", "q_2_1_s5", "q_2_1_s6", "q_2_1_s7"],
    "difficult": ["q_2_1_d1", "q_2_1_d2", "q_2_1_d3", "q_2_1_d4", "q_2_1_d5"]
  },
  "subtopic_2_2": {
    "easy": ["q_2_2_s1", "q_2_2_s4", "q_2_2_s5", "q_2_2_s6", "q_2_2_s10"],
    "medium": ["q_2_2_s2", "q_2_2_s3", "q_2_2_s7", "q_2_2_s8", "q_2_2_s9"],
    "difficult": ["q_2_2_d1", "q_2_2_d2", "q_2_2_d3", "q_2_2_d4", "q_2_2_d5"]
  },
  "subtopic_2_3": {
    "easy": ["q_2_3_s1", "q_2_3_s3", "q_2_3_s4", "q_2_3_s5", "q_2_3_s8"],
    "medium": ["q_2_3_s2", "q_2_3_s6", "q_2_3_s7", "q_2_3_s9", "q_2_3_s10"],
    "difficult": ["q_2_3_d1", "q_2_3_d2", "q_2_3_d3", "q_2_3_d4", "q_2_3_d5"]
  },
  "subtopic_3_1": {
    "easy": ["q_3_1_s2", "q_3_1_s3", "q_3_1_s6", "q_3_1_s8", "q_3_1_s10"],
    "medium": ["q_3_1_s1", "q_3_1_s4", "q_3_1_s5", "q_3_1_s7", "q_3_1_s9"],
    "difficult": ["q_3_1_d2", "q_3_1_d3", "q_3_1_d4", "q_3_1_d5", "q_3_1_d6"]
  },
  "subtopic_3_2": {
    "easy": ["q_3_2_s1", "q_3_2_s2", "q_3_2_s6", "q_3_2_s9", "q_3_2_s10"],
    "medium": ["q_3_2_s3", "q_3_2_s4", "q_3_2_s5", "q_3_2_s7", "q_3_2_s8"],
    "difficult": ["q_3_2_d1", "q_3_2_d2", "q_3_2_d4", "q_3_2_d5", "q_3_2_d6"]
  },
  "subtopic_3_3": {
    "easy": ["q_3_3_s2", "q_3_3_s3", "q_3_3_s7", "q_3_3_s8", "q_3_3_s10"],
    "medium": ["q_3_3_s1", "q_3_3_s4", "q_3_3_s5", "q_3_3_s6", "q_3_3_s9"],
    "difficult": ["q_3_3_d3", "q_3_3_d4", "q_3_3_d5", "q_3_3_d7", "q_3_3_d8"]
  }
};

// Remap QUIZ_DATA
QUIZ_DATA.forEach(topic => {
  topic.subtopics.forEach(subtopic => {
    const subtopicId = subtopic.id;
    const rules = mapping[subtopicId];
    if (!rules) {
      console.error(`Missing mapping rules for ${subtopicId}`);
      return;
    }

    // Combine standard and depth questions into a single look-up map by ID
    const allQuestionsMap = {};
    subtopic.standard.forEach(q => { allQuestionsMap[q.id] = q; });
    subtopic.depth.forEach(q => { allQuestionsMap[q.id] = q; });

    // Build the new arrays
    const newEasy = rules.easy.map(id => {
      const q = allQuestionsMap[id];
      if (!q) throw new Error(`Question ${id} not found in ${subtopicId}`);
      return q;
    });

    const newMedium = rules.medium.map(id => {
      const q = allQuestionsMap[id];
      if (!q) throw new Error(`Question ${id} not found in ${subtopicId}`);
      return q;
    });

    const newDifficult = rules.difficult.map(id => {
      const q = allQuestionsMap[id];
      if (!q) throw new Error(`Question ${id} not found in ${subtopicId}`);
      return q;
    });

    // Replace the properties
    delete subtopic.standard;
    delete subtopic.depth;
    subtopic.easy = newEasy;
    subtopic.medium = newMedium;
    subtopic.difficult = newDifficult;
  });
});

// Now generate the new file content.
// Find the split point in the original file content.
const splitText = 'const EXAM_SKILLS_DATA =';
const splitIndex = fileContent.indexOf(splitText);
if (splitIndex === -1) {
  throw new Error("Could not find 'const EXAM_SKILLS_DATA =' in questions.js");
}
const secondPart = fileContent.substring(splitIndex);

// First part will be the new QUIZ_DATA definition
const firstPart = `// Middle East Conflict (1945-95) Quiz Data
// Stored as a global variable to prevent CORS issues when run via file:// protocol.

const QUIZ_DATA = ${JSON.stringify(QUIZ_DATA, null, 2)};

`;

fs.writeFileSync(questionsFile, firstPart + secondPart, 'utf8');
console.log("Successfully remapped questions.js into easy, medium, and difficult!");
