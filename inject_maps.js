const fs = require('fs');
const dataPath = 'industrialisation_and_empire/data.js';

let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// Helper to assign hinge question
function assignHinge(sourceObj) {
  if (!sourceObj) return;
  const title = sourceObj.title || '';
  if (title.includes("Henry Cort") || title.includes("Ironworks")) {
    sourceObj.hinge_question = "What details in this image suggest that industrial progress required immense physical danger for the workers?";
  } else if (title.includes("Child") || title.includes("Trappers")) {
    sourceObj.hinge_question = "How does this primary source contradict the 'Optimist' view that the Industrial Revolution improved the lives of the working class?";
  } else if (title.includes("Chadwick") || title.includes("Slum") || title.includes("Back-to-Back")) {
    sourceObj.hinge_question = "How did the physical layout of these 'back-to-back' houses guarantee the spread of waterborne diseases like cholera?";
  } else if (title.includes("Warrior")) {
    sourceObj.hinge_question = "How does the construction of HMS Warrior reflect the direct link between local Hampshire industry (iron/bricks) and global British power?";
  } else if (title.includes("Chartist")) {
    sourceObj.hinge_question = "Why would the sheer size and organization of this working-class crowd terrify the ruling aristocratic elite?";
  } else if (title.includes("Ballot Box")) {
    sourceObj.hinge_question = "Why was this simple wooden box considered a devastating blow to the political power of wealthy landlords and factory owners?";
  } else if (title.includes("Rotten Tree")) {
    sourceObj.hinge_question = "What is the artist suggesting about the 'Rotten Borough' system by depicting it as a dead, decaying tree filled with greedy cormorants?";
  } else if (title.includes("Capital and Labour")) {
    sourceObj.hinge_question = "How does the artist use vertical space (top vs. bottom) to summarize the 'Optimist vs. Pessimist' debate of the 19th century?";
  } else if (title.includes("Hampshire") && title.includes("Map")) {
    sourceObj.hinge_question = "How does the geography of Hampshire, particularly its access to the coast and rivers, help explain why industrial sites like Funtley Ironworks were so successful?";
  } else if (title.includes("Imperial Federation Map")) {
    sourceObj.hinge_question = "Look at the sheer scale of the territories colored pink/red. Why was maintaining a 'Two-Power Standard' navy absolutely vital to sustaining this global network?";
  } else if (title.includes("Parliamentary Representation Map")) {
    sourceObj.hinge_question = "Based on this map, why would the rapidly growing industrial cities in the North feel completely betrayed by the pre-1832 electoral system?";
  }
}

// Maps to add
const mapLesson1 = {
  title: "Hampshire Administrative Map (1832)",
  caption: "An authentic 1832 map showing the county of Hampshire.",
  src: "/images/map_hampshire_1832.png",
  hinge_question: "How does the geography of Hampshire, particularly its access to the coast and rivers, help explain why industrial sites like Funtley Ironworks were so successful?"
};
const mapLesson4 = {
  title: "Walter Crane's Imperial Federation Map (1886)",
  caption: "A classic high-Victorian map showing the extent of the British Empire colored in red.",
  src: "/images/map_empire_1886.jpg",
  hinge_question: "Look at the sheer scale of the territories colored pink/red. Why was maintaining a 'Two-Power Standard' navy absolutely vital to sustaining this global network?"
};
const mapLesson6 = {
  title: "Parliamentary Representation Map of England & Wales (1832)",
  caption: "An authentic map showing the distribution of MPs before the Reform Act.",
  src: "/images/map_rotten_boroughs.jpg",
  hinge_question: "Based on this map, why would the rapidly growing industrial cities in the North feel completely betrayed by the pre-1832 electoral system?"
};

data.lessons.forEach(lesson => {
  // Add hinge questions to existing
  if (lesson.visual_hook) assignHinge(lesson.visual_hook);
  if (lesson.sources) {
    lesson.sources.forEach(assignHinge);
  } else {
    lesson.sources = [];
  }
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.source) assignHinge(block.source);
    });
  }

  // Inject Maps
  if (lesson.id === 'lesson_1') {
    if (!lesson.sources.find(s => s.title.includes("Hampshire"))) {
      lesson.sources.push(mapLesson1);
    }
  }
  if (lesson.id === 'lesson_4') {
    if (!lesson.sources.find(s => s.title.includes("Federation"))) {
      lesson.sources.push(mapLesson4);
    }
  }
  if (lesson.id === 'lesson_6') {
    if (!lesson.sources.find(s => s.title.includes("Parliamentary Representation"))) {
      lesson.sources.push(mapLesson6);
    }
  }
});

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully injected maps and hinge questions!');
