const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Supplemental questions for the 7 subtopics that have 19 questions
const SUPPLEMENTAL_QUESTIONS = {
  subtopic_1_1: {
    question: "What was the 'Double V' campaign popularised during the Second World War?",
    answer: 'A campaign for victory over fascism abroad and victory over discrimination at home.',
    explanation:
      'The Double V campaign was launched by the Pittsburgh Courier in 1942, urging Black Americans to fight for democracy abroad while demanding an end to racial segregation and inequality in the United States.',
    distractors: [
      'A military plan to recruit two segregated Black divisions in Europe.',
      'A legal campaign to win two consecutive Supreme Court civil rights cases.',
      'A protest demanding double wages for Black war factory workers.',
    ],
  },
  subtopic_1_2: {
    question:
      'What famous psychological test was presented by Kenneth and Mamie Clark as evidence in Brown v. Board of Education to prove the emotional harm of segregation?',
    answer:
      "The 'doll test', showing Black children preferred white dolls and saw Black dolls as inferior.",
    explanation:
      "Psychologists Kenneth and Mamie Clark conducted the 'doll test', showing that racial segregation damaged Black children's self-esteem and internalized feelings of inferiority. Chief Justice Earl Warren cited this psychological harm in the unanimous 1954 ruling.",
    distractors: [
      'The Stanford-Binet IQ test, showing equal cognitive ability across races.',
      'The inkblot Rorschach test, demonstrating fear of Southern law enforcement.',
      'The reading comprehension speed test, comparing segregated school facilities.',
    ],
  },
  subtopic_1_3: {
    question:
      'On what date in December 1956 did Black residents of Montgomery officially end their boycott and return to integrated buses?',
    answer: '21 December 1956, after the Supreme Court injunction took legal effect.',
    explanation:
      "Following the Supreme Court's ruling in Browder v. Gayle, the official federal mandate arrived in Montgomery on 20 December 1956. The next morning, 21 December 1956, Martin Luther King Jr., Ralph Abernathy, and E.D. Nixon boarded the first integrated city bus, bringing the 381-day boycott to a triumphant conclusion.",
    distractors: [
      "1 December 1955, immediately following Rosa Parks' arrest.",
      '4 July 1957, following the passage of the Civil Rights Act.',
      '28 August 1963, after the March on Washington.',
    ],
  },
  subtopic_1_4: {
    question:
      "In what Mississippi town was the murder trial of Emmett Till's killers held in September 1955, resulting in an all-white jury acquitting them in just over an hour?",
    answer: 'Sumner, Mississippi.',
    explanation:
      "The murder trial of J.W. Milam and Roy Bryant took place in Sumner, Mississippi. Despite eyewitness testimony from Emmett Till's great-uncle Moses Wright, the all-white male jury took just 67 minutes to find the killers not guilty. Months later, the men admitted their guilt in a paid Look magazine interview.",
    distractors: ['Little Rock, Arkansas.', 'Montgomery, Alabama.', 'Greensboro, North Carolina.'],
  },
  subtopic_2_1: {
    question:
      'Which major department store lunch counter in Greensboro, North Carolina, was targeted by four Black college students on 1 February 1960?',
    answer: "F.W. Woolworth's.",
    explanation:
      'On 1 February 1960, four Black freshmen from North Carolina A&T College (Ezell Blair Jr., David Richmond, Franklin McCain, and Joseph McNeil) sat down at the whites-only lunch counter inside the F.W. Woolworth store in Greensboro, sparking a nationwide sit-in movement.',
    distractors: ['Walgreens.', "Macy's.", 'Sears Roebuck.'],
  },
  subtopic_2_2: {
    question:
      'Which tragic event occurred at the 16th Street Baptist Church in Birmingham, Alabama, on 15 September 1963, killing four young Black girls?',
    answer: 'A Ku Klux Klan bomb explosion during Sunday church services.',
    explanation:
      'Just weeks after the March on Washington, KKK terrorists planted 15 sticks of dynamite beneath the steps of the 16th Street Baptist Church in Birmingham. The explosion killed Addie Mae Collins, Denise McNair, Carole Robertson, and Cynthia Wesley, sparking nationwide outrage and intensifying calls for the 1964 Civil Rights Act.',
    distractors: [
      'A tear gas attack by local police during a student sit-in.',
      'A fire caused by an accidental electrical malfunction.',
      'A riot triggered by the arrest of Martin Luther King Jr.',
    ],
  },
  subtopic_2_3: {
    question:
      'What symbol and uniform did members of the Black Panther Party adopt as a visual statement of Black pride and discipline?',
    answer: 'Black leather jackets, black berets, and dark sunglasses.',
    explanation:
      'Founded in Oakland in 1966 by Huey Newton and Bobby Seale, the Black Panthers adopted a distinctive uniform of black leather jackets, black berets, and powder-blue shirts, combined with openly carrying firearms under California law to project an image of militant Black self-defence.',
    distractors: [
      'White robes, red armbands, and military helmets.',
      'Blue denim overalls and cloth caps.',
      'Green camouflage fatigues and combat boots.',
    ],
  },
};

// Deterministic shuffle helper using a seed string
function seededShuffle(arr, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    hash = Math.sin(hash++) * 10000;
    const j = Math.floor((hash - Math.floor(hash)) * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

async function injectUsaQuizzes() {
  const ROOT_DIR = path.join(__dirname, '..');
  const questionsPath = path.join(ROOT_DIR, 'public', 'units', 'usa', 'questions.js');
  const dataJsPath = path.join(ROOT_DIR, 'units', 'usa', 'data.js');

  console.log('Loading questions.js...');
  const qModule = await import(require('url').pathToFileURL(questionsPath).href);
  const QUIZ_DATA = qModule.QUIZ_DATA;

  const subtopicMap = {};

  QUIZ_DATA.forEach((t) => {
    t.subtopics.forEach((s) => {
      let std = [...(s.standard || [])];
      let depthAndAna = [...(s.depth || []), ...(s.analytical || [])];

      if (SUPPLEMENTAL_QUESTIONS[s.id]) {
        depthAndAna.push(SUPPLEMENTAL_QUESTIONS[s.id]);
      }

      let core10 = std.slice(0, 10);
      let mastery10 = depthAndAna.slice(0, 10);

      while (core10.length < 10 && depthAndAna.length > mastery10.length) {
        core10.push(depthAndAna[mastery10.length++]);
      }

      const raw20 = [...core10, ...mastery10];
      if (raw20.length !== 20) {
        throw new Error(`Subtopic ${s.id} does not have exactly 20! Has: ${raw20.length}`);
      }

      const formatted20 = raw20.map((raw, idx) => {
        const questionText = (raw.question || raw.q || '').trim();
        const answerText = (raw.answer || raw.a || '').trim();
        const explanationText = (raw.explanation || '').trim();
        const distractors = (raw.distractors || []).map((d) => (d || '').trim());

        if (!questionText) throw new Error(`Missing questionText in ${s.id} index ${idx}`);
        if (!answerText) throw new Error(`Missing answerText in ${s.id} index ${idx}`);
        if (distractors.length < 3)
          throw new Error(`Fewer than 3 distractors in ${s.id} index ${idx}`);

        const unShuffled = [answerText, distractors[0], distractors[1], distractors[2]];
        const options = seededShuffle(unShuffled, questionText + '_' + idx);

        if (!options.includes(answerText)) {
          throw new Error(`Options missing answer in ${s.id} index ${idx}`);
        }

        return {
          question: questionText,
          q: questionText,
          options: options,
          answer: answerText,
          a: answerText,
          explanation: explanationText,
        };
      });

      subtopicMap[s.id] = formatted20;
    });
  });

  console.log(`Compiled quizzes for ${Object.keys(subtopicMap).length} subtopics.`);

  console.log('Loading units/usa/data.js...');
  const dataModule = await import(require('url').pathToFileURL(dataJsPath).href);
  const unitData = dataModule.default || dataModule.usa;

  let injectedCount = 0;
  unitData.lessons.forEach((lesson) => {
    // Map lesson ID like 'lesson_1_1' to 'subtopic_1_1'
    const subtopicId = lesson.id.replace(/^lesson_/, 'subtopic_');
    if (subtopicMap[subtopicId]) {
      lesson.quiz = subtopicMap[subtopicId];
      injectedCount++;
      console.log(
        `✅ Injected 20 quiz questions into ${lesson.id} (${lesson.title.slice(0, 45)}...)`,
      );
    } else {
      console.warn(`⚠️ No quiz found for lesson ID: ${lesson.id} (looked for ${subtopicId})`);
    }
  });

  if (injectedCount !== 16) {
    throw new Error(`Expected to inject into 16 lessons, but injected into ${injectedCount}!`);
  }

  console.log(`Writing updated unitData back to ${dataJsPath}...`);
  const fileContent = `// Auto-generated Paper 3 USA Unit Data\nexport const usa = ${JSON.stringify(unitData, null, 2)};\nexport default usa;\n`;
  fs.writeFileSync(dataJsPath, fileContent, 'utf8');

  console.log('Validating JavaScript syntax...');
  execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
  console.log('🎉 Syntax check passed cleanly!');
}

injectUsaQuizzes().catch((err) => {
  console.error('❌ Error injecting USA quizzes:', err);
  process.exit(1);
});
