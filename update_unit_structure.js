const fs = require('fs');

const dataPath = 'industrialisation_and_empire/data.js';
let rawData = fs.readFileSync(dataPath, 'utf8');
let jsonStr = rawData.replace(/^export const unitData = /, '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = JSON.parse(jsonStr);

// 1. Add Controversy Box to Lesson 1
const lesson1 = data.lessons.find(l => l.id === 'lesson_1');
if (lesson1) {
  lesson1.narrative_blocks.push({
    title: "Historical Controversy: Where Did the Money Come From?",
    content: "Building massive ironworks like Funtley and funding the broader Industrial Revolution required unimaginable amounts of capital. Modern historians emphasize that this sudden wealth was intrinsically tied to the profits of the 18th-century Transatlantic Slave Trade. Although Britain abolished the trade in 1807 and slavery itself in 1833, the industrial economy was kickstarted by the immense wealth extracted from enslaved labor on Caribbean sugar plantations, and continued to rely on slave-picked American cotton.",
    is_controversy: true
  });
}

// 2. Renumber Lessons 5, 6, 7 to 6, 7, 8
const lesson5 = data.lessons.find(l => l.id === 'lesson_5');
const lesson6 = data.lessons.find(l => l.id === 'lesson_6');
const lesson7 = data.lessons.find(l => l.id === 'lesson_7');

if (lesson5) lesson5.id = 'lesson_6';
if (lesson6) lesson6.id = 'lesson_7';
if (lesson7) {
  lesson7.id = 'lesson_8';
  
  // Update Lesson 8 (Capstone) with Advanced Historiography
  lesson7.narrative_blocks.splice(0, 0, {
    title: "Advanced Historiography: Silences and Entanglements",
    content: "When evaluating the impact of the 19th century, top-tier historians use two key concepts. First, **'Silences in the Archive'**: official reports (like Chadwick's) or industrial statistics often deliberately ignore or 'silence' the voices of the colonized (like Indian weavers) and marginalized (like working-class women or enslaved people whose labor funded the factories). Second, **'Entangled History'**: the Empire wasn't a simple binary of good vs. evil. Domestic British workers were ruthlessly oppressed at home, yet many participated in and benefited from colonial exploitation abroad, highlighting an 'entangled' system of collaboration and coercion."
  });
  
  if (lesson7.task && lesson7.task.mark_scheme) {
    lesson7.task.mark_scheme = lesson7.task.mark_scheme.map(level => {
      if (level.level === 5 || level.level === 'Level 5 (13-16 Marks)') {
        return {
          ...level,
          description: level.description + " MUST explicitly integrate the concepts of 'Silences in the Archive' (recognizing missing demographics like colonized subjects or women) and 'Entangled History' (the complex overlap between domestic oppression and colonial exploitation) to achieve full marks."
        };
      }
      return level;
    });
  }
}

// 3. Insert New Lesson 5 Shell
const newLesson5 = {
  id: "lesson_5",
  title: "How did the Empire strike back? The 1857 Indian Rebellion",
  teacher_notes: {
    primer: "This lesson contrasts domestic working-class resistance (Swing Riots/Chartism) with violent colonial resistance, shattering the myth of a passive Empire. It explores the causes of the 1857 Rebellion, the brutal suppression, and the monumental shift to the British Raj.",
    objectives: [
      {
        objective: "Understand the deep-rooted causes of the 1857 Indian Rebellion.",
        primer: "Guide pupils to look beyond the immediate catalyst of the greased cartridges to the systemic disrespect and land grabs by the East India Company.",
        question: "Was the rebellion simply a religious mutiny, or a broader war for independence?"
      },
      {
        objective: "Analyse the brutal response of the British state.",
        primer: "Examine the disproportionate violence used by the British to suppress the rebellion, comparing it to the domestic response to Chartism.",
        question: "Why did the British state react with such extreme violence in India compared to domestic unrest?"
      }
    ]
  },
  visual_hook: {
    title: "The Indian Rebellion (1857)",
    caption: "A depiction of the violent uprising against East India Company rule.",
    src: "",
    hinge_question: "What details in this image suggest a complete breakdown of colonial authority?"
  },
  do_now: {
    title: "Recall: The East India Company",
    type: "recall",
    items: [
      { question: "What was the East India Company?", answer: "A massive British trading corporation that essentially ruled India." },
      { question: "How did the EIC destroy the Indian textile industry?", answer: "By flooding the 'captive market' with cheap British machine-made cloth." }
    ]
  },
  narrative_blocks: [
    {
      title: "Content Pending",
      content: "Waiting for LLM generation of the narrative content..."
    }
  ],
  sources: [],
  quiz: [],
  vocab: [],
  task: {
    type: "source_analysis",
    title: "Evaluating Colonial Resistance",
    instructions: "Analyze the sources to evaluate the nature of the 1857 rebellion.",
    questions: []
  }
};

// Reorder lessons
const allLessons = [
  ...data.lessons.filter(l => ['lesson_1', 'lesson_2', 'lesson_3', 'lesson_4'].includes(l.id)),
  newLesson5,
  ...data.lessons.filter(l => ['lesson_6', 'lesson_7', 'lesson_8'].includes(l.id))
];

data.lessons = allLessons;

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully updated unit structure to 8 lessons!');
