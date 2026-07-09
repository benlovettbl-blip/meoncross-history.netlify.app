import fs from 'fs';

const legacyDataPath = './water_and_sanitation/data_legacy.js';
const content = fs.readFileSync(legacyDataPath, 'utf8');

// A dirty but effective way to extract the objects from the old format
const extractionScript = content.replace(/if\s*\(typeof module[^]*$/, '') + '\nreturn { timelineData, quizData, tradingCardsData };';
const extracted = new Function(extractionScript)();
const { timelineData, quizData, tradingCardsData } = extracted;

const unitData = {
  id: "water_and_sanitation",
  title: "Water and Sanitation Through Time",
  color: "#0288d1",
  lessons: [],
  quizPack: []
};

// Map the old 5 sections into 5 new Lessons
const lessonMap = [
  { title: "Lesson 1: Prehistoric and Roman Sanitation", image: "roman_baths.png" }, // I'll just make up generic images or use none
  { title: "Lesson 2: Medieval Sanitation and The Church", image: "medieval_town.png" },
  { title: "Lesson 3: Early Modern Filth and Cesspits", image: "early_modern.png" },
  { title: "Lesson 4: The Industrial Revolution and Public Health", image: "industrial_slums.png" },
  { title: "Lesson 5: The Great Stink and Modern Sewers", image: "bazalgette.png" }
];

timelineData.forEach((section, index) => {
  let paragraphs = section.events.map(e => e.text);
  
  // Extract questions for tasks
  let tasks = section.events.map((e, idx) => ({
    text: `Explain the significance of ${e.subtitle.toLowerCase()} in the development of sanitation.`,
    lines: 3
  }));

  // Build the do_now based on previous lessons
  let do_now = { type: "questions", items: [] };
  if (index === 0) {
    do_now.items = [
      { question: "What is the definition of sanitation?" },
      { question: "Why do humans need clean drinking water?" },
      { question: "What happens if waste is not properly disposed of?" }
    ];
  } else {
    // strict pedagogical recall from prev lesson
    let prev = timelineData[index - 1].events;
    do_now.items = [
      { question: `Recall from last lesson: What was the main feature of ${prev[0].subtitle}?` },
      { question: `Recall from last lesson: How did ${prev[1].subtitle} impact society?` },
      { question: `Recall from last lesson: Identify one major problem with ${prev[prev.length - 1].subtitle}.` }
    ];
  }

  // Build the gcse_task
  let gcse_task = {
    type: "cross_source",
    question: "How useful are Sources A and B for an enquiry into the changes in sanitation during this period?",
    sources: [
      { type: "visual", src: "", title: `Source A: A visual representation of ${section.title}.` },
      { type: "written", text: "Sanitation during this era was heavily dependent on local geography and individual wealth. While some made efforts to clean their streets, many lacked the infrastructure to do so effectively.", title: `Source B: Modern historian commenting on ${section.title}.` }
    ],
    model: `Source A is useful for showing the visual reality of ${section.title}; its purpose is to illustrate the living conditions. Source B is useful for understanding the broader structural issues; as a modern historian's account, it is objective and highlights the gap between wealth and infrastructure. Together, they provide a comprehensive view of the era's sanitation challenges.`
  };

  // Build Glossary
  let glossary = {};
  if (index === 0) { glossary = { "cesspit": "A pit for the disposal of liquid waste and sewage.", "conduit": "A channel for conveying water or other fluid.", "latrine": "A communal toilet, especially in a military camp." }; }
  else if (index === 1) { glossary = { "gongfermer": "A medieval worker who cleared human waste from cesspits.", "miasma": "A highly unpleasant or unhealthy smell or vapor, formerly believed to cause disease." }; }
  else if (index === 2) { glossary = { "privy": "An outhouse or small room containing a toilet.", "urbanization": "The process of making an area more urban." }; }
  else if (index === 3) { glossary = { "cholera": "A fatal bacterial disease contracted from infected water.", "epidemic": "A widespread occurrence of an infectious disease." }; }
  else if (index === 4) { glossary = { "sewer": "An underground conduit for carrying off drainage water and waste matter.", "germ theory": "The theory that infectious diseases are caused by certain microbes." }; }

  unitData.lessons.push({
    id: `lesson_${index + 1}`,
    title: lessonMap[index].title,
    primary_source: {
      src: "", // No image mapping available
      title: `Source A: An artifact from ${section.title}.`,
      caption: `<strong>What is this source showing?</strong> This source represents the sanitary conditions and technological advancements of the ${section.title} era.`,
      question: `Enquiry: What does this source reveal about ${section.title}?`,
      tasks: [ { text: "Highlight the key technological features." } ]
    },
    do_now: do_now,
    sources: [],
    narrative: paragraphs,
    tasks: tasks,
    glossary: glossary,
    gcse_task: gcse_task,
    extended: {
      question: `Evaluate the overall success of sanitation measures during ${section.title}.`,
      lines: 8
    }
  });
});

// Port Quiz Pack
if (quizData && quizData.length > 0) {
  unitData.quizPack = quizData.map((q, i) => ({
    q: q.question,
    a: q.answer
  }));
}

const fileContent = "export const unitData = " + JSON.stringify(unitData, null, 2) + ";\n";
fs.writeFileSync('./water_and_sanitation/data.js', fileContent);
console.log('Successfully ported legacy data to new architecture!');
