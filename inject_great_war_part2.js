const fs = require('fs');

const examPractices = [
  {
    lesson: 'lesson_1', // L1
    data: {
      questions: [
        {
          type: 'explain',
          question: 'Explain why so many young British men volunteered for the army in 1914.',
          marks: 8,
          hints: [
            'Sentence Starter: One reason young men volunteered was because of effective propaganda...',
            'Sentence Starter: For example, posters like "Your Country Needs You" made men feel...',
            'Sentence Starter: This resulted in a surge of volunteers who wanted to...'
          ]
        }
      ]
    }
  },
  {
    lesson: 'lesson_2', // L2
    data: {
      questions: [
        {
          type: 'explain',
          question: 'Explain why the conditions in the trenches were so difficult for soldiers.',
          marks: 8,
          hints: [
            'Sentence Starter: The conditions were difficult because of the constant threat of disease...',
            'Sentence Starter: For example, many soldiers suffered from trench foot due to...',
            'Sentence Starter: This resulted in a high number of casualties before battles even began...'
          ]
        }
      ]
    }
  },
  {
    lesson: 'lesson_3', // L3
    data: {
      questions: [
        {
          type: 'explain',
          question: 'Explain why the contribution of Empire troops was so important to the British war effort.',
          marks: 8,
          hints: [
            'Sentence Starter: Empire troops were important because they provided vital manpower...',
            'Sentence Starter: For example, Indian soldiers fought in major battles such as...',
            'Sentence Starter: This resulted in Britain being able to maintain its strength on multiple fronts...'
          ]
        }
      ]
    }
  },
  {
    lesson: 'lesson_4', // L4
    data: {
      questions: [
        {
          type: 'explain',
          question: 'Explain how the Defence of the Realm Act (DORA) changed everyday life in Britain.',
          marks: 8,
          hints: [
            'Sentence Starter: DORA changed everyday life by giving the government unprecedented control...',
            'Sentence Starter: For example, the government introduced censorship and rationing to...',
            'Sentence Starter: This resulted in ordinary civilians facing strict rules about...'
          ]
        }
      ]
    }
  },
  {
    lesson: 'lesson_5', // L5
    data: {
      questions: [
        {
          type: 'explain',
          question: 'Explain why the Treaty of Versailles caused so much resentment in Germany.',
          marks: 8,
          hints: [
            'Sentence Starter: The Treaty caused resentment because Germany felt it was a "Diktat" (dictated peace)...',
            'Sentence Starter: For example, the War Guilt Clause (Article 231) forced Germany to...',
            'Sentence Starter: This resulted in a deep sense of humiliation and economic ruin due to...'
          ]
        }
      ]
    }
  },
  {
    lesson: 'lesson_6', // L6
    data: {
      questions: [
        {
          type: 'explain',
          question: 'Explain the impact of the First World War on local communities like Stubbington.',
          marks: 8,
          hints: [
            'Sentence Starter: The war impacted local communities heavily through the loss of a generation of young men...',
            'Sentence Starter: For example, the use of "Pals Battalions" meant that a single battle could...',
            'Sentence Starter: This resulted in long-lasting grief and the building of war memorials to...'
          ]
        }
      ]
    }
  }
];

let content = fs.readFileSync('great_war_part2/data.js', 'utf8');

examPractices.forEach(ep => {
  // We need to inject the exam_practice at the end of the lesson block.
  // The safest way is to find the title of the next lesson (or end of array) and insert before it.
  // However, it's easier to find the "quiz": [ ... ] block and inject it after.
  
  // Find where the quiz for this lesson ends
  // This is tricky with regex, let's use a simpler approach:
  // Find the string `"id": "${ep.lesson}"`
  const lessonIdx = content.indexOf(`"id": "${ep.lesson}"`);
  if (lessonIdx === -1) {
    console.error(`Could not find ${ep.lesson}`);
    return;
  }
  
  // Find the next lesson id to bound our search
  let nextLessonIdx = content.length;
  const nextLessonMatch = content.slice(lessonIdx + 20).match(/"id": "lesson_\d+"/);
  if (nextLessonMatch) {
    nextLessonIdx = lessonIdx + 20 + nextLessonMatch.index;
  }
  
  // In this lesson block, find the last `      ]` before the next lesson starts.
  // The quiz is the last item usually. Let's find `"quiz":`
  const quizIdx = content.indexOf('"quiz":', lessonIdx);
  if (quizIdx !== -1 && quizIdx < nextLessonIdx) {
    // Find the end of the quiz array
    let openBrackets = 0;
    let quizStart = content.indexOf('[', quizIdx);
    let i = quizStart;
    for (; i < nextLessonIdx; i++) {
      if (content[i] === '[') openBrackets++;
      if (content[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) break;
      }
    }
    
    // Inject exam_practice after the quiz array closes
    const injectPos = i + 1;
    const injectContent = `,\n      "exam_practice": ${JSON.stringify(ep.data, null, 2).replace(/\n/g, '\n      ')}`;
    content = content.slice(0, injectPos) + injectContent + content.slice(injectPos);
  }
});

fs.writeFileSync('great_war_part2/data.js', content, 'utf8');
console.log('Injected exam practice into great_war_part2/data.js');
