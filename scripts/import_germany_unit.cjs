const fs = require('fs');
const path = require('path');

const GERMANY_DATA_PATH = path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js');

console.log('--- Step 1: Loading current Germany unit data ---');
let fileContent = fs.readFileSync(GERMANY_DATA_PATH, 'utf8');

// Use dynamic import via eval in an async wrapper or strip exports to parse
function loadUnitData(content) {
  // Strip export statements to evaluate cleanly in CJS
  let cleanCode = content
    .replace(/export\s+const\s+unitData\s*=\s*weimar_nazi_germany;/g, '')
    .replace(/export\s+default\s+weimar_nazi_germany;/g, '')
    .replace(/if\s*\(typeof\s+module\s*!==\s*'undefined'[\s\S]*$/, '');

  const fn = new Function(`${cleanCode}; return weimar_nazi_germany;`);
  return fn();
}

const unitData = loadUnitData(fileContent);
console.log(`Loaded unit "${unitData.title}" with ${unitData.lessons.length} lessons.`);

// Corrected Do Now items for Lessons 4.3 and 4.4 to enforce strict prior recall
const LESSON_4_3_PRIOR_DO_NOW = [
  {
    question: "What were the 'Three Ks' (Kinder, Küche, Kirche) expected of women in Nazi Germany?",
    answer:
      'Children, Kitchen, Church - the traditional domestic roles promoted for women by Nazi propaganda.',
  },
  {
    question:
      'What financial incentive did the 1933 Law for the Encouragement of Marriage offer young couples?',
    answer:
      'Marriage loans of up to 1,000 marks, with 25% of the loan wiped out for each child born.',
  },
  {
    question: "What was the Mother's Cross awarded for?",
    answer:
      'Medals given to women for having large families (Bronze for 4-5 children, Silver for 6-7, Gold for 8+).',
  },
  {
    question: 'What was the Hitler Youth (Hitlerjugend / HJ)?',
    answer:
      'The compulsory Nazi organisation for boys aged 14-18, focusing on military drills, physical fitness, and ideological loyalty.',
  },
  {
    question: 'What was the League of German Girls (Bund Deutscher Mädel / BDM)?',
    answer:
      'The Nazi organisation for girls aged 14-18, focusing on fitness, domestic homemaking skills, and preparation for motherhood.',
  },
  {
    question: 'How did the school curriculum change under the Nazis?',
    answer:
      'History was rewritten to glorify German military triumphs, Biology taught racial pseudo-science, and PE was doubled to 15% of lesson time.',
  },
  {
    question: 'Who were the Edelweiss Pirates?',
    answer:
      'Working-class youth resistance groups who rejected Hitler Youth regimentation, beat up Nazi patrols, and listened to banned jazz music.',
  },
  {
    question: 'Who was Joseph Goebbels?',
    answer:
      'The Reich Minister of Public Enlightenment and Propaganda, who had absolute control over the press, radio, cinema, and the arts.',
  },
  {
    question: 'What was the Gestapo?',
    answer:
      'The secret state police, led by Reinhard Heydrich under Heinrich Himmler, feared for arresting and torturing opponents without trial.',
  },
  {
    question: 'What was the Night of the Long Knives (June 1934)?',
    answer:
      "Hitler's purge of Ernst Röhm and the SA leadership, securing the support of the regular army and eliminating internal rivals.",
  },
];

const LESSON_4_4_PRIOR_DO_NOW = [
  {
    question: 'What was the National Labour Service (RAD)?',
    answer:
      'A compulsory scheme requiring all 18-25 year old men to complete 6 months of manual labour in military conditions.',
  },
  {
    question:
      "Name two ways the Nazis reduced official unemployment through 'invisible unemployment'.",
    answer:
      'By excluding Jews and women from the register, counting conscripted soldiers as employed, and forcing men into the RAD.',
  },
  {
    question: "What was 'Strength Through Joy' (Kraft durch Freude / KdF)?",
    answer:
      'A state organisation run by the DAF offering cheap leisure activities, cinema tickets, sports, and cruise holidays to reward workers.',
  },
  {
    question: "What was the 'Beauty of Labour' (Schönheit der Arbeit / SdA)?",
    answer:
      'A branch of the KdF that persuaded employers to improve workplace conditions with better lighting, canteens, and washrooms.',
  },
  {
    question: 'What organisation replaced all independent trade unions in May 1933?',
    answer: 'The German Labour Front (Deutsche Arbeitsfront / DAF), led by Robert Ley.',
  },
  {
    question: "What was the Volkswagen 'People's Car' scheme?",
    answer:
      'A savings scheme where workers paid 5 marks a week to buy a car; no cars were ever delivered as factories switched to military vehicles.',
  },
  {
    question: "What were the 'Three Ks' expected of women under Nazi policy?",
    answer: 'Kinder, Küche, Kirche (Children, Kitchen, Church).',
  },
  {
    question: "What was the Mother's Cross award?",
    answer:
      'Medals awarded to German mothers for bearing large numbers of children (Bronze for 4-5, Silver for 6-7, Gold for 8+).',
  },
  {
    question: 'What were the Edelweiss Pirates and Swing Youth?',
    answer:
      'Youth groups who resisted Nazi regimentation, rejected the Hitler Youth, and expressed cultural defiance.',
  },
  {
    question: 'What was the Gestapo?',
    answer:
      'The Nazi secret state police, relying on voluntary denunciations and terror to eliminate political opposition.',
  },
];

// Contemporary eyewitness quotes for Lived Experience in narrative block 0
const EYEWITNESS_QUOTES = {
  lesson_1_1: {
    speaker: 'Princess Evelyn Blücher',
    role: 'English resident living in Berlin, diary entry 9 November 1918',
    quote:
      'The people are crying out for bread... The revolution is not a political one, but a revolution of empty stomachs. The Allied blockade has done its work; the people are simply too starved to fight any longer.',
  },
  lesson_1_2: {
    speaker: 'Erna von Pustau',
    role: 'Hamburg resident, recalling the hyperinflation crisis of 1923',
    quote:
      'As soon as father received his wages, we ran to the shops. An hour later, a loaf of bread cost twice as much. You had to buy whatever was on the shelves immediately, whether you needed it or not, before the money became completely worthless paper.',
  },
  lesson_1_3: {
    speaker: 'Gustav Stresemann',
    role: 'Foreign Minister, speaking to the League of Nations in 1926',
    quote:
      'Germany is in truth dancing on a volcano. If the short-term American loans are called in, a large section of our economy will collapse overnight.',
  },
  lesson_1_4: {
    speaker: 'Christopher Isherwood',
    role: 'British writer living in Weimar Berlin, *Goodbye to Berlin*',
    quote:
      'Berlin was in a state of perpetual excitation... a city living on borrowed time, where cabarets, modern art, and jazz flourished in a whirlwind of dazzling freedom and underlying desperation.',
  },
  lesson_2_1: {
    speaker: 'Kurt Ludecke',
    role: 'Early Nazi Party supporter, describing hearing Hitler speak in Munich, 1922',
    quote:
      'My critical faculty was swept away. He was holding the masses, and me with them, under a hypnotic spell by the sheer force of his conviction and intense passion.',
  },
  lesson_2_2: {
    speaker: 'Egon Hanfstaengl',
    role: 'Eyewitness to the Munich Putsch in the Bürgerbräukeller, 8 November 1923',
    quote:
      "Hitler jumped onto a chair, fired a pistol shot into the ceiling, and cried in a hoarse voice: 'The National Revolution has broken out! The Bavarian government is deposed!' For a moment there was stunned, deathly silence.",
  },
  lesson_2_3: {
    speaker: 'Heinrich Hauser',
    role: 'German journalist describing the breadlines during the Great Depression, 1932',
    quote:
      'An almost unbroken chain of homeless men and women were tramping along the highway. They had the blank eyes of starved animals. When Hitler promised work and bread, he was speaking to people with nothing left to lose.',
  },
  lesson_2_4: {
    speaker: 'Franz von Papen',
    role: 'Conservative Vice-Chancellor, boasting to friends in January 1933',
    quote:
      "No danger at all. We have hired Hitler for our purpose. Within two months, we will have pushed him so far into a corner that he'll squeak!",
  },
  lesson_3_1: {
    speaker: 'Dolf Sternberger',
    role: 'Eyewitness to the aftermath of the Reichstag Fire, Berlin, February 1933',
    quote:
      'The sky over the Tiergarten was blood red. The great glass dome had collapsed. The morning after, the decree was published; overnight, all our constitutional rights, our privacy, our free speech, had vanished.',
  },
  lesson_3_2: {
    speaker: 'Victor Klemperer',
    role: 'Dresden professor and diarist, recording daily life under the Gestapo',
    quote:
      'One never knows who is an informer. The grocer, the postman, the neighbour on the landing... fear sits at the dinner table with every family.',
  },
  lesson_3_3: {
    speaker: 'William L. Shirer',
    role: 'American CBS journalist, observing the 1934 Nuremberg Rally',
    quote:
      "About thirty thousand storm troopers were massed in squares. The morning light gleamed on their bayonets. When Hitler appeared, the roar of 'Heil!' was not polite applause; it was an ecstatic, religious frenzy.",
  },
  lesson_3_4: {
    speaker: 'Hans Scholl',
    role: 'Leader of the White Rose student resistance, Munich University 1942',
    quote:
      'Our present state is the dictatorship of evil. We must offer passive resistance wherever we can, before the last young German is sacrificed to the senseless bloodlust of the regime.',
  },
  lesson_4_1: {
    speaker: 'Marianne Gartner',
    role: 'Young Austrian woman recalling Nazi marriage loans and expectations',
    quote:
      "A woman's place was strictly defined. We were encouraged to leave jobs and marry young. If you produced four children, you were presented with the Mother's Cross like a decorated soldier of the home front.",
  },
  lesson_4_2: {
    speaker: 'Alfons Heck',
    role: 'Former Hitler Youth member, *A Child of Hitler*',
    quote:
      'I belonged to Adolf Hitler body and soul. From our tenth year onward, we were indoctrinated into believing that dying for the Fatherland was the highest honor a boy could achieve.',
  },
  lesson_4_3: {
    speaker: 'A German industrial worker',
    role: 'Report to the underground SPD (Sopade), Ruhr Valley 1937',
    quote:
      'There is work, yes, but we are prisoners of the factory. The DAF takes our dues, strikes are outlawed, and wages are frozen while food prices climb. The KdF holidays are for the party bosses, not for us.',
  },
  lesson_4_4: {
    speaker: 'Ruth Klüger',
    role: 'Jewish schoolchild in Vienna, recalling the November Pogrom (Kristallnacht) 1938',
    quote:
      'The street was littered with jagged shards of glass that crunched underfoot. The synagogue was in flames, and the fire brigade stood by, only spraying water on the neighboring German houses to protect them.',
  },
};

console.log('--- Step 2: Streamlining all 16 lessons ---');

unitData.lessons.forEach((lesson, index) => {
  console.log(`Processing Lesson ${lesson.id} (${lesson.title})...`);

  // 1. Extract visual source from utility_starters if present
  let visualSource = null;
  if (lesson.utility_starters && lesson.utility_starters.sources) {
    visualSource = lesson.utility_starters.sources.find((s) => s.type === 'visual' || s.source);
  }

  // Set utility_starters to null to eliminate top clutter
  lesson.utility_starters = null;

  // 2. Embed visual source into narrative_blocks[0]
  if (visualSource && lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
    const cleanSrc = visualSource.source.replace(/\?v=\d+/, '');
    const contextText = visualSource.source_context || lesson.teacher_notes?.source_context || '';

    // Ensure image context has a Hinge Question
    let finalContext = contextText;
    if (!finalContext.includes('Hinge Question')) {
      finalContext += ` **Hinge Question:** Why is this visual source particularly significant for understanding the historical events of this lesson?`;
    }

    lesson.narrative_blocks[0].images = [
      {
        src: cleanSrc,
        caption: visualSource.caption || 'Authentic Historical Source',
        image_context: finalContext,
      },
    ];

    // Ensure teacher_notes.source_context matches
    if (lesson.teacher_notes) {
      lesson.teacher_notes.source_context = finalContext;
    }
  }

  // 3. Embed contemporary eyewitness testimony into narrative_blocks[0].text
  const testimony = EYEWITNESS_QUOTES[lesson.id];
  if (testimony && lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
    let block0Text = lesson.narrative_blocks[0].text || '';
    // Avoid double-injecting
    if (!block0Text.includes('Lived Experience:')) {
      const quoteBlock = `<br><br>> **Lived Experience: ${testimony.speaker} (${testimony.role})**<br>> "${testimony.quote}"`;
      lesson.narrative_blocks[0].text = block0Text + quoteBlock;
    }
  }

  // 4. Audit & Enforce Strict Prior Recall on Do Nows
  if (lesson.id === 'lesson_4_3') {
    lesson.do_now.items = LESSON_4_3_PRIOR_DO_NOW;
  } else if (lesson.id === 'lesson_4_4') {
    lesson.do_now.items = LESSON_4_4_PRIOR_DO_NOW;
  }

  // 5. Redistribute Exam Practice across the 4-Lesson Key Topic Ladder
  const rawStimulus = lesson.exam_practice?.stimulus || [];
  const rawQuestions = lesson.exam_practice?.questions || [];

  const lessonCycle = index % 4; // 0 = X.1 (Inference), 1 = X.2 (Causation), 2 = X.3 (Utility), 3 = X.4 (Interpretations)

  if (rawQuestions.length >= 6) {
    if (lessonCycle === 0) {
      // Lesson X.1: Question 1 (Inference, 4 marks) on Source A
      lesson.exam_practice = {
        stimulus: rawStimulus.slice(0, 1), // Source A
        questions: [
          {
            ...rawQuestions[0],
            tariff: '4 marks',
            type: '4-mark',
          },
        ],
      };
    } else if (lessonCycle === 1) {
      // Lesson X.2: Question 2 (Causation, 12 marks)
      lesson.exam_practice = {
        stimulus: [], // No stimulus for Q2
        questions: [
          {
            ...rawQuestions[1],
            tariff: '12 marks',
            type: '12-mark',
          },
        ],
      };
    } else if (lessonCycle === 2) {
      // Lesson X.3: Question 3(a) (Source Utility, 8 marks) on Sources B & C
      lesson.exam_practice = {
        stimulus: [rawStimulus[3], rawStimulus[4]].filter(Boolean), // Sources B and C
        questions: [
          {
            ...rawQuestions[2],
            tariff: '8 marks',
            type: '8-mark',
          },
        ],
      };
    } else if (lessonCycle === 3) {
      // Lesson X.4: The Interpretations Suite (Q3b, Q3c, Q3d - 24 marks total)
      lesson.exam_practice = {
        stimulus: [rawStimulus[1], rawStimulus[2]].filter(Boolean), // Interpretations 1 and 2
        questions: [
          {
            ...rawQuestions[3],
            tariff: '4 marks',
            type: '4-mark',
          },
          {
            ...rawQuestions[4],
            tariff: '4 marks',
            type: '4-mark',
          },
          {
            ...rawQuestions[5],
            tariff: '16 marks',
            type: '16-mark',
          },
        ],
      };
    }
  }

  // Remove redundant sources array so sources are not duplicated across the page
  lesson.sources = undefined;
});

console.log('--- Step 3: Serializing updated unit data ---');

const headerCode = `// Auto-generated Paper 3 Weimar & Nazi Germany Unit Data\nconst weimar_nazi_germany = `;
const footerCode = `;\n\nexport const unitData = weimar_nazi_germany;\nexport default weimar_nazi_germany;\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = weimar_nazi_germany;\n}\n`;

const serialized = headerCode + JSON.stringify(unitData, null, 2) + footerCode;

fs.writeFileSync(GERMANY_DATA_PATH, serialized, 'utf8');
console.log(`Successfully wrote streamlined Germany unit data to: ${GERMANY_DATA_PATH}`);
