const fs = require('fs');

const injectionData = [
  {
    lesson: 'lesson_1',
    vocab: [
      { term: "Industrial Revolution", definition: "The transition to new manufacturing processes, moving from hand production to machines." },
      { term: "Steam Engine", definition: "An engine that uses the expansion or rapid condensation of steam to generate power, heavily used in early factories." }
    ],
    sources: [
      {
        title: "Source A: The Funtley Ironworks",
        src: "/images/funtley_ironworks.jpg",
        caption: "Henry Cort's ironworks in Funtley, Hampshire, where he pioneered the puddling process."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain the significance of steam power during the Industrial Revolution.",
          marks: 8,
          hints: ["Sentence Starter: Steam power was significant because...", "Sentence Starter: For example, factories no longer needed to be built next to rivers..."]
        }
      ]
    }
  },
  {
    lesson: 'lesson_2',
    vocab: [
      { term: "Child Labour", definition: "The use of children in industry or business, often in dangerous and harsh conditions." },
      { term: "Brickfields", definition: "Areas where bricks are made, often employing heavy manual labor." }
    ],
    sources: [
      {
        title: "Source A: Fareham Brickfields",
        src: "/images/fareham_brickfields.jpg",
        caption: "Workers at a traditional brickfield in Fareham in the 19th century."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain why industrial work was often seen as a punishment for the working classes.",
          marks: 8,
          hints: ["Sentence Starter: Industrial work was harsh because...", "Sentence Starter: For example, child workers faced..."]
        }
      ]
    }
  },
  {
    lesson: 'lesson_3',
    vocab: [
      { term: "Urbanisation", definition: "The increase in the proportion of people living in towns and cities." },
      { term: "Cholera", definition: "A deadly waterborne disease that spread rapidly in overcrowded and unsanitary Victorian slums." }
    ],
    sources: [
      {
        title: "Source A: A Victorian Slum",
        src: "/images/victorian_slum.jpg",
        caption: "Overcrowded and dirty streets in a 19th-century British industrial town."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain why public health was so poor in early industrial towns.",
          marks: 8,
          hints: ["Sentence Starter: Public health was poor due to rapid urbanisation...", "Sentence Starter: For example, the lack of proper sewage systems led to..."]
        }
      ]
    }
  },
  {
    lesson: 'lesson_4',
    vocab: [
      { term: "British Raj", definition: "The period of direct British rule over the Indian subcontinent from 1858 to 1947." },
      { term: "Naval Supremacy", definition: "Complete control of the seas by a country's navy, which allowed Britain to defend and expand its empire." }
    ],
    sources: [
      {
        title: "Source A: Portsmouth Dockyard",
        src: "/images/portsmouth_dockyard.jpg",
        caption: "HMS Victory and other Royal Navy ships at Portsmouth Dockyard, the heart of British naval power."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain the role of the Royal Navy in sustaining the British Empire.",
          marks: 8,
          hints: ["Sentence Starter: The Royal Navy sustained the empire by protecting trade routes...", "Sentence Starter: For example, the dockyards at Portsmouth built ships that..."]
        }
      ]
    }
  },
  {
    lesson: 'lesson_5',
    vocab: [
      { term: "Chartism", definition: "A working-class movement for political reform in Britain that existed from 1838 to 1857." },
      { term: "Trade Unions", definition: "Organizations of workers formed to protect and advance their rights and interests." }
    ],
    sources: [
      {
        title: "Source A: The Swing Riots",
        src: "/images/swing_riots.jpg",
        caption: "An illustration of agricultural workers protesting against the introduction of threshing machines during the Swing Riots."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain why ordinary people protested during the early 19th century.",
          marks: 8,
          hints: ["Sentence Starter: People protested because they lacked political representation...", "Sentence Starter: For example, agricultural workers in Hampshire rioted because..."]
        }
      ]
    }
  },
  {
    lesson: 'lesson_6',
    vocab: [
      { term: "Reform Acts", definition: "A series of laws passed in the 19th century that gradually expanded the right to vote in Britain." },
      { term: "Secret Ballot", definition: "A voting method in which a voter's choices in an election are anonymous, introduced in 1872 to prevent intimidation." }
    ],
    sources: [
      {
        title: "Source A: A Pocket Borough",
        src: "/images/pocket_borough.jpg",
        caption: "A political cartoon mocking the corruption of un-reformed electoral constituencies."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain how the Reform Acts changed British democracy.",
          marks: 8,
          hints: ["Sentence Starter: The Reform Acts expanded democracy by giving the vote to...", "Sentence Starter: For example, the introduction of the secret ballot meant that..."]
        }
      ]
    }
  },
  {
    lesson: 'lesson_7',
    vocab: [
      { term: "Synthesis", definition: "The combination of ideas to form a theory or system." },
      { term: "Exploitation", definition: "The action or fact of treating someone unfairly in order to benefit from their work." }
    ],
    sources: [
      {
        title: "Source A: The Two Nations",
        src: "/images/two_nations.jpg",
        caption: "An illustration showing the stark divide between the rich industrialists and the poor working classes in Victorian Britain."
      }
    ],
    exam_practice: {
      questions: [
        {
          type: "explain",
          question: "Explain why historians disagree about who benefited most from the Industrial Revolution.",
          marks: 8,
          hints: ["Sentence Starter: Some historians argue the wealthy industrialists benefited most because...", "Sentence Starter: However, others argue that over time, the working classes gained..."]
        }
      ]
    }
  }
];

let content = fs.readFileSync('industrialisation_and_empire/data.js', 'utf8');

injectionData.forEach(inj => {
  const lessonIdx = content.indexOf(`"id": "${inj.lesson}"`);
  if (lessonIdx === -1) {
    console.error(`Could not find ${inj.lesson}`);
    return;
  }
  
  let nextLessonIdx = content.length;
  const nextLessonMatch = content.slice(lessonIdx + 20).match(/"id": "lesson_\d+"/);
  if (nextLessonMatch) {
    nextLessonIdx = lessonIdx + 20 + nextLessonMatch.index;
  }
  
  // Find the end of the lesson block, which is just before the next lesson or EOF.
  // Look for the last '    }' before nextLessonIdx
  const blockString = content.slice(lessonIdx, nextLessonIdx);
  const lastBraceIdx = blockString.lastIndexOf('    }');
  
  if (lastBraceIdx !== -1) {
    const injectPos = lessonIdx + lastBraceIdx;
    
    // Inject fields right before the closing brace of the lesson
    const injectStr = `,\n      "vocab": ${JSON.stringify(inj.vocab, null, 2).replace(/\n/g, '\n      ')},\n      "sources": ${JSON.stringify(inj.sources, null, 2).replace(/\n/g, '\n      ')},\n      "exam_practice": ${JSON.stringify(inj.exam_practice, null, 2).replace(/\n/g, '\n      ')}\n`;
    
    content = content.slice(0, injectPos) + injectStr + content.slice(injectPos);
  }
});

fs.writeFileSync('industrialisation_and_empire/data.js', content, 'utf8');
console.log('Injected vocab, sources, and exam practice into industrialisation_and_empire/data.js');
