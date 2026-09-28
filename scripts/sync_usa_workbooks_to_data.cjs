const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'usa', 'data.js');

const rawData = require(dataFilePath);
const usaData = rawData.default || rawData;

// =============================================================================
// 1. EXPAND DO NOWS TO 10 AUTHENTIC PRIOR-KNOWLEDGE QUESTIONS PER LESSON
// =============================================================================

// Lesson 1 Foundational Prior Knowledge (10 questions on pre-1954 context)
const lesson1DoNow = [
  {
    question:
      "What 1896 Supreme Court ruling established the legal doctrine of 'separate but equal'?",
    answer: 'Plessy v. Ferguson',
  },
  {
    question:
      'What was the name of the state and local laws enforcing racial segregation in the American South?',
    answer: 'Jim Crow laws',
  },
  {
    question:
      'What white supremacist terrorist group used lynching and cross-burnings to intimidate Black Americans?',
    answer: 'The Ku Klux Klan (KKK)',
  },
  {
    question:
      'Which civil rights organisation was founded in 1909 to fight racial injustice through legal challenges in the courts?',
    answer: 'The NAACP (National Association for the Advancement of Colored People)',
  },
  {
    question:
      "Which constitutional amendment, ratified in 1868, guaranteed citizenship and 'equal protection of the laws' to all persons born in the US?",
    answer: 'The 14th Amendment',
  },
  {
    question:
      'Which constitutional amendment, ratified in 1870, prohibited denying a citizen the right to vote based on race or color?',
    answer: 'The 15th Amendment',
  },
  {
    question:
      'What voting restrictions were commonly used by Southern states to disenfranchise Black voters without naming race?',
    answer: 'Poll taxes and literacy tests',
  },
  {
    question:
      'What term describes the mass migration of millions of Black Americans from the rural South to Northern cities between 1916 and 1970?',
    answer: 'The Great Migration',
  },
  {
    question:
      'What campaign during World War II called for victory against fascism abroad and victory against racism at home?',
    answer: 'The Double V Campaign',
  },
  {
    question:
      'Which US President issued Executive Order 9981 in 1948, desegregating the United States Armed Forces?',
    answer: 'President Harry S. Truman',
  },
];

usaData.lessons[0].do_now = {
  type: 'questions',
  title: 'Recall & Retrieval',
  instructions: 'Answer these questions in full sentences.',
  items: lesson1DoNow,
};

// For Lessons 2–16, expand existing 5 questions to 10 by drawing 5 prior questions from earlier lessons
for (let i = 1; i < usaData.lessons.length; i++) {
  const lesson = usaData.lessons[i];
  let currentItems = lesson.do_now ? lesson.do_now.items || lesson.do_now : [];

  // Ensure we have an array of { question, answer }
  const existingQuestions = currentItems.map((item) => item.question);

  // Pool questions from previous lessons (lessons 0 to i-1)
  const candidatePool = [];
  for (let prevIdx = 0; prevIdx < i; prevIdx++) {
    const prevLesson = usaData.lessons[prevIdx];
    // Add quiz questions
    if (prevLesson.quiz) {
      prevLesson.quiz.forEach((q) => {
        if (
          !existingQuestions.includes(q.question) &&
          !candidatePool.some((c) => c.question === q.question)
        ) {
          candidatePool.push({
            question: q.question,
            answer: q.answer,
          });
        }
      });
    }
  }

  // Pick up to 5 additional distinct prior-knowledge questions
  const additional = [];
  let step = Math.max(1, Math.floor(candidatePool.length / 5));
  for (let cIdx = 0; cIdx < candidatePool.length && additional.length < 5; cIdx += step) {
    additional.push(candidatePool[cIdx]);
  }

  // Combine to make exactly 10 questions
  const finalItems = [...currentItems, ...additional].slice(0, 10);

  lesson.do_now = {
    type: 'questions',
    title: 'Recall & Retrieval',
    instructions: 'Answer these questions in full sentences.',
    items: finalItems,
  };
}

// =============================================================================
// 2. PAPER 3 EXAM SPECIFICATION DATA & HIGH-SCORING MODEL ANSWERS
// =============================================================================

const EXAM_DATA = [
  // KT1: Lessons 1–4
  {
    lessonIndex: 0,
    tariff: '4 marks',
    type: 'inference_4m',
    qNum: '1. ',
    question:
      'Give two things you can infer from Source A about racial segregation in the American South in the early 1950s. [4 marks]',
    stimulus:
      "Source A: A segregated railway waiting room sign in Jacksonville, Florida, early 1950s reading 'Colored Waiting Room'.",
    model: `<p><strong>(i) What I can infer:</strong><br>I can infer that racial segregation was strictly enforced by law and physical barriers in public transport facilities.<br><strong>Details in the source that tell me this:</strong><br>A prominent, permanent metal sign suspended above the doorway explicitly designates the room for 'Colored' passengers only.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that Black Americans were systematically treated as second-class citizens with inferior, segregated public accommodations.<br><strong>Details in the source that tell me this:</strong><br>The separate, isolated entrance reflects the Jim Crow legal doctrine of 'separate but equal', which in practice enforced racial humiliation and public subjugation.</p>`,
  },
  {
    lessonIndex: 1,
    tariff: '12 marks',
    type: 'explain_why_12',
    qNum: '2. ',
    question:
      'Explain why it was difficult for Black Americans in the Southern states to register to vote in the early 1950s. [12 marks]',
    stimulus: ['Literacy tests', 'Ku Klux Klan (KKK)'],
    model: `One major reason why it was exceptionally difficult for Black Americans to register to vote was the institutional use of deliberately biased <strong>literacy tests and poll taxes</strong> by white state officials. Southern registrars exercised total discretion over grading these tests, routinely giving Black applicants impossibly complex constitutional questions while exempting illiterate white voters under 'grandfather clauses'. Furthermore, impoverished Black sharecroppers could rarely afford the cumulative poll taxes required before voting, legally barring hundreds of thousands from the ballot box.<br><br>A second decisive reason was the pervasive threat of physical terror and extralegal violence orchestrated by white supremacist groups like the <strong>Ku Klux Klan (KKK)</strong> and local police forces. Black citizens who attempted to register faced beatings, arson, and lynching, while their names were published in local newspapers. Consequently, white employers immediately fired Black workers and landlords evicted tenant farmers who attempted to exercise their constitutional rights, creating an atmosphere of overwhelming terror.<br><br>Finally, an underlying barrier was the absolute <strong>lack of federal intervention or legal protection</strong>. Southern courts, judges, juries, and law enforcement officers were exclusively white and committed to upholding white supremacy. Without federal marshals or voting rights legislation to enforce the 15th Amendment, Black citizens had no legal recourse when local officials illegally denied them the right to vote.`,
  },
  {
    lessonIndex: 2,
    tariff: '8 marks',
    type: 'utility_8m',
    qNum: '3(a). ',
    question:
      'Study Sources B and C. How useful are Sources B and C for an enquiry into the reasons for the success of the Montgomery Bus Boycott (1955–56)? [8 marks]',
    model: `Source B is useful for an enquiry into the success of the boycott because it demonstrates the critical role played by grassroots community organisation and alternative transport networks. From my own knowledge, I know that the Montgomery Improvement Association (MIA), led by Martin Luther King Jr., organised an elaborate carpool system involving over 300 private cars and church station wagons to transport 40,000 boycotters daily. The provenance of Source B makes it particularly valuable because, as a contemporary account by an active participant, it reveals the exceptional solidarity, planning, and discipline of the local Black community.<br><br>Source C is useful because it highlights the vital contribution of economic pressure and legal action in securing the boycott's victory. From my own knowledge, I know that Black citizens accounted for over 70% of bus ridership, depriving the Montgomery bus company of over 60% of its revenue, while NAACP lawyers fought the case to the Supreme Court in Browder v. Gayle (1956), which ruled segregated busing unconstitutional. The provenance of Source C adds strong historical value because it provides an analytical record of how local economic boycotts combined with federal judicial rulings to force municipal compliance. Combined, both sources provide high historical utility for understanding both the grassroots mobilization and the constitutional mechanisms that ensured victory.`,
  },
  {
    lessonIndex: 3,
    tariff: '16 marks (+4 SPaG)',
    type: 'verdict_16m',
    qNum: '3(d). ',
    question:
      'How far do you agree with Interpretation 2 about the reasons why Southern states resisted school desegregation after Brown v. Board of Education (1954)? [16 marks + 4 SPaG]',
    model: `On the one hand, Interpretation 1 is supported by compelling evidence showing that political leadership and 'Massive Resistance' organised by Southern state governments were fundamental in blocking school desegregation. Following the Brown ruling, 101 Southern congressmen signed the 'Southern Manifesto' in 1956, pledging to resist desegregation by all legal means. Southern governors like Orval Faubus at Little Rock (1957) actively deployed state National Guardsmen to block Black pupils from entering white schools, giving state-sponsored legitimacy to segregationist defiance.<br><br>On the other hand, Interpretation 2 offers an equally persuasive argument by focusing on the grassroots hostility, cultural racism, and violence organised by White Citizens' Councils and the KKK. White Citizens' Councils grew to over 250,000 members across the South, using economic intimidation, firing Black parents, and closing down public schools entirely (as in Prince Edward County, Virginia) to fund private all-white academies. This demonstrates that resistance was not merely top-down political rhetoric, but deeply embedded in the social fabric of white Southern communities.<br><br>Furthermore, contextual analysis confirms that the Supreme Court's vague wording in Brown II (1955)—ordering desegregation with 'all deliberate speed'—provided Southern school boards with an open invitation to delay integration for years without facing federal legal penalties.<br><br>In conclusion, having evaluated both interpretations against the historical evidence, I agree with Interpretation 2 to a large extent. While state governors and politicians provided legal cover, it was the deep-seated, community-wide white backlash and economic terror on the ground that made the enforcement of school desegregation so painfully slow and hazardous for Black children.`,
  },

  // KT2: Lessons 5–8
  {
    lessonIndex: 4,
    tariff: '4 marks',
    type: 'inference_4m',
    qNum: '1. ',
    question:
      'Give two things you can infer from Source A about the methods used by Southern police against civil rights demonstrators in Birmingham, Alabama (1963). [4 marks]',
    stimulus:
      'Source A: Photograph of police dogs and high-pressure fire hoses deployed against young demonstrators in Birmingham, May 1963.',
    model: `<p><strong>(i) What I can infer:</strong><br>I can infer that Southern police forces used extreme, disproportionate physical brutality against peaceful protesters.<br><strong>Details in the source that tell me this:</strong><br>Police under Eugene 'Bull' Connor deployed high-pressure fire hoses capable of tearing clothes and knocking demonstrators off their feet.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that authorities were determined to intimidate civil rights activists regardless of their age.<br><strong>Details in the source that tell me this:</strong><br>Attack dogs and aggressive police lines were unleashed directly against young student marchers participating in the Children's Crusade.</p>`,
  },
  {
    lessonIndex: 5,
    tariff: '12 marks',
    type: 'explain_why_12',
    qNum: '2. ',
    question: 'Explain why the Civil Rights Act was passed in 1964. [12 marks]',
    stimulus: [
      'The Birmingham Campaign (1963)',
      'The assassination of President Kennedy (November 1963)',
    ],
    model: `One major reason why the Civil Rights Act was passed was the national and international outrage generated by the <strong>Birmingham Campaign of May 1963</strong>. Televised images of Bull Connor’s police dogs attacking unarmed Black children and fire hoses tearing into demonstrators shocked the American public and deeply embarrassed the US government on the global Cold War stage. President Kennedy went on national television the following month declaring civil rights a 'moral issue', directly compelling the executive branch to draft comprehensive federal desegregation legislation.<br><br>A second decisive factor was the <strong>assassination of President John F. Kennedy in November 1963</strong> and the political skill of President Lyndon B. Johnson. Johnson used the immense wave of national grief to frame the passage of civil rights legislation as a sacred memorial to the fallen president, urging Congress not to let Kennedy's legacy fail. Furthermore, Johnson expertly leveraged his decades of congressional experience to break a record 54-day filibuster by Southern Democrats in the Senate.<br><br>Finally, the massive mobilization of over 250,000 peaceful citizens at the <strong>March on Washington in August 1963</strong> demonstrated unprecedented multiracial support for federal action. Martin Luther King Jr.'s iconic 'I Have a Dream' speech crystallized national moral sentiment, proving to wavering congressional moderates that civil rights could no longer be postponed without triggering catastrophic social unrest.`,
  },
  {
    lessonIndex: 6,
    tariff: '8 marks',
    type: 'utility_8m',
    qNum: '3(a). ',
    question:
      'Study Sources B and C. How useful are Sources B and C for an enquiry into the causes of the riots in northern and western cities between 1965 and 1967? [8 marks]',
    model: `Source B is useful for an enquiry into the urban riots because it illustrates the profound economic deprivation, de facto segregation, and police brutality experienced by Black Americans in northern ghettos like Watts, Los Angeles. From my own knowledge, I know that while the Civil Rights Act had dismantled legal Jim Crow in the South, it did nothing to resolve northern unemployment (often double the white rate), substandard tenement housing, and aggressive police profiling. The provenance of Source B makes it particularly valuable because, as a contemporary testimony from an inner-city resident, it reveals the deep sense of systemic hopelessness that erupted into spontaneous rebellion.<br><br>Source C is useful because it provides official, data-driven analysis of the structural causes of urban unrest. From my own knowledge, I know that the 1968 Kerner Commission concluded that the riots were caused by white racism, warning that America was 'moving toward two societies, one black, one white—separate and unequal'. The provenance of Source C is valuable because, as an independent federal investigation commissioned by President Johnson, it offers an authoritative, objective assessment of how governmental neglect and institutional discrimination sparked nationwide urban upheaval. Together, both sources provide high historical utility for understanding both the lived frustration on the streets and the macroeconomic failures that caused the riots.`,
  },
  {
    lessonIndex: 7,
    tariff: '16 marks (+4 SPaG)',
    type: 'verdict_16m',
    qNum: '3(d). ',
    question:
      'How far do you agree with Interpretation 2 about the causes of the split between non-violent civil rights organisations and the Black Power movement? [16 marks + 4 SPaG]',
    model: `On the one hand, Interpretation 1 argues that the split was caused primarily by ideological impatience and a fundamental rejection of non-violence by younger militants like Stokely Carmichael and Malcolm X. Younger activists in SNCC and CORE had endured brutal beatings during the Freedom Rides and Mississippi Freedom Summer without seeing tangible economic improvements in poor Black communities. Black Power advocates argued that non-violence was humiliating and ineffective for self-defense, adopting the slogan 'Black Power' and expelling white members to pursue racial self-determination and armed self-defense through groups like the Black Panther Party.<br><br>On the other hand, Interpretation 2 emphasizes that the split was driven by the changing geographical and economic focus of the movement from Southern legal desegregation to Northern urban poverty. When Martin Luther King Jr. brought his non-violent campaign to Chicago in 1966, he faced fierce white working-class hostility and found that moral marches could not resolve deep-rooted problems like housing discrimination, joblessness, and police brutality. Militants correctly recognized that the moderate tactics of the SCLC were ill-equipped to address the structural economic misery of urban ghettos.<br><br>Furthermore, government repression and the FBI’s COINTELPRO operations deliberately exacerbated divisions between civil rights leaders, planting false stories and escalating rivalries between mainstream organizations and radical factions.<br><br>In conclusion, having evaluated both interpretations against the historical evidence, I agree with Interpretation 2 to a moderate extent. While Carmichael and Malcolm X provided the radical rhetoric, it was the persistent failure of non-violent legalism to alleviate the crushing economic misery and police brutality in northern urban centres that made the fracture of the civil rights movement inevitable.`,
  },

  // KT3: Lessons 9–12
  {
    lessonIndex: 8,
    tariff: '4 marks',
    type: 'inference_4m',
    qNum: '1. ',
    question:
      'Give two things you can infer from Source A about the conditions faced by US infantry patrols fighting in South Vietnam (1965–68). [4 marks]',
    stimulus:
      "Source A: A soldier's account describing the intense heat, hidden booby traps, and unseen enemy snipers in the jungle.",
    model: `<p><strong>(i) What I can infer:</strong><br>I can infer that American soldiers operated in an intensely hazardous, unfamiliar jungle environment where lethal danger was omnipresent.<br><strong>Details in the source that tell me this:</strong><br>The extract highlights soldiers constantly looking down for concealed punji-stick booby traps and tripping wires hidden beneath dense foliage.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that US troops experienced extreme psychological terror because they rarely saw the enemy directly.<br><strong>Details in the source that tell me this:</strong><br>The account describes sudden sniper fire from invisible tree lines, followed by the immediate disappearance of Vietcong fighters into underground tunnel networks.</p>`,
  },
  {
    lessonIndex: 9,
    tariff: '12 marks',
    type: 'explain_why_12',
    qNum: '2. ',
    question:
      'Explain why US involvement in Vietnam escalated under President Johnson between 1964 and 1965. [12 marks]',
    stimulus: [
      'The Gulf of Tonkin incident (August 1964)',
      'The attack on the US base at Pleiku (February 1965)',
    ],
    model: `One major reason why US involvement escalated was the <strong>Gulf of Tonkin incident in August 1964</strong> and the subsequent congressional resolution. Following reports that North Vietnamese torpedo boats had attacked the USS Maddox, President Johnson obtained the Gulf of Tonkin Resolution from Congress with near-unanimous support. This resolution granted the president sweeping executive authority to 'take all necessary measures' to repel armed attacks, effectively providing Johnson with a blank cheque to wage war in Vietnam without a formal congressional declaration.<br><br>A second critical trigger was the <strong>Vietcong attack on the US military base at Pleiku in February 1965</strong>, which killed eight American servicemen and wounded over a hundred. Viewing this as an intolerable direct provocation, Johnson immediately launched Operation Rolling Thunder—a sustained aerial bombing campaign against North Vietnam. To protect the vital US airbases like Da Nang from counter-attack, Johnson made the historic decision in March 1965 to deploy the first 3,500 US ground combat troops, fundamentally transforming the conflict from an advisory mission into a full-scale American ground war.<br><br>Finally, an underlying driver was the pervasive <strong>Cold War Domino Theory</strong> and fear of communist expansion across Southeast Asia. US policymakers feared that if South Vietnam fell to Ho Chi Minh’s forces, neighbouring nations like Laos, Cambodia, Thailand, and Indonesia would inevitably collapse to communism. Furthermore, Johnson was politically determined not to be remembered as the first American president who 'lost' Vietnam to communism.`,
  },
  {
    lessonIndex: 10,
    tariff: '8 marks',
    type: 'utility_8m',
    qNum: '3(a). ',
    question:
      'Study Sources B and C. How useful are Sources B and C for an enquiry into the reasons why US military tactics failed to defeat the Vietcong (1965–68)? [8 marks]',
    model: `Source B is useful for an enquiry into the failure of US tactics because it reveals the immense counter-productive impact of American heavy firepower on the civilian population. From my own knowledge, I know that tactics like Operation Rolling Thunder, napalm, Agent Orange, and 'Search and Destroy' missions (Zippo raids) destroyed countless peasant villages and poisoned farmland, alienating ordinary South Vietnamese civilians and driving them into supporting the Vietcong. The provenance of Source B makes it particularly valuable because, as a contemporary account by an American war correspondent, it provides an eyewitness record of how brutal pacification tactics destroyed civilian hearts and minds.<br><br>Source C is useful because it highlights the superior guerrilla tactics and resilience of the Vietcong (NLF). From my own knowledge, I know that the Vietcong utilized the Ho Chi Minh Trail to keep supplies flowing, constructed thousands of miles of subterranean tunnels (such as Cu Chi), and practiced 'hanging onto the belts' of American troops—fighting at such close range that US artillery and air strikes could not be used without killing their own men. The provenance of Source C adds strong historical value because it details the disciplined ideological commitment and local geographic mastery that allowed guerrilla forces to survive massive American firepower. Together, both sources provide high historical utility for analyzing both the strategic flaws of US search-and-destroy warfare and the asymmetric superiority of Vietcong guerrilla resistance.`,
  },
  {
    lessonIndex: 11,
    tariff: '16 marks (+4 SPaG)',
    type: 'verdict_16m',
    qNum: '3(d). ',
    question:
      'How far do you agree with Interpretation 2 about the military and political significance of the Tet Offensive (January 1968)? [16 marks + 4 SPaG]',
    model: `On the one hand, Interpretation 1 emphasizes that from a purely military standpoint, the Tet Offensive was an overwhelming, catastrophic defeat for the Vietcong and North Vietnamese Army. Over 84,000 communist troops attacked over 100 South Vietnamese cities and military installations, including the US Embassy in Saigon. However, US and ARVN forces rapidly recaptured every single objective, inflicting devastating casualties—killing an estimated 45,000 communist fighters and permanently crippling the Vietcong's independent military capacity for the remainder of the war.<br><br>On the other hand, Interpretation 2 persuasively argues that the Tet Offensive was a decisive, war-winning political and psychological victory for the communists. For years, General Westmoreland and President Johnson had assured the American public that the war was nearly won and that there was 'light at the end of the tunnel'. Seeing communist commandos breach the US Embassy on television shattered public credibility, creating an unbridgeable 'credibility gap' and convincing influential journalists like Walter Cronkite that the war was un-winnable.<br><br>Furthermore, the political fallout was immediate and catastrophic for the US administration: anti-war demonstrations escalated, public support plummeted, and on 31 March 1968, President Johnson stunned the nation by announcing he would halt bombing and would not seek re-election.<br><br>In conclusion, having evaluated both interpretations against the historical evidence, I agree with Interpretation 2 to a very large extent. While the US military won the tactical engagements on the battlefield, the Tet Offensive fatally destroyed American political will on the home front, proving that the United States could not achieve total victory and making a negotiated US withdrawal inevitable.`,
  },

  // KT4: Lessons 13–16
  {
    lessonIndex: 12,
    tariff: '4 marks',
    type: 'inference_4m',
    qNum: '1. ',
    question:
      'Give two things you can infer from Source A about the confrontation at Kent State University in May 1970. [4 marks]',
    stimulus:
      'Source A: Photograph and report on Ohio National Guardsmen firing into student anti-war demonstrators at Kent State, killing four.',
    model: `<p><strong>(i) What I can infer:</strong><br>I can infer that domestic opposition to the Vietnam War had escalated into violent, lethal clashes on American soil.<br><strong>Details in the source that tell me this:</strong><br>National Guardsmen armed with live military ammunition opened fire on an unarmed student anti-war protest on a college campus, killing four students.</p><p><strong>(ii) What I can infer:</strong><br>I can infer that President Nixon's decision to expand the war into Cambodia provoked unprecedented outrage among the younger generation.<br><strong>Details in the source that tell me this:</strong><br>The protest was triggered directly by Nixon's public announcement of the Cambodian incursion, prompting nationwide student strikes that shut down hundreds of universities.</p>`,
  },
  {
    lessonIndex: 13,
    tariff: '12 marks',
    type: 'explain_why_12',
    qNum: '2. ',
    question:
      'Explain why President Richard Nixon introduced the policy of Vietnamization in 1969. [12 marks]',
    stimulus: ['Rising US casualties', 'The impact of the Tet Offensive (1968)'],
    model: `One major reason why President Nixon introduced Vietnamization was the unsustainable toll of <strong>rising American military casualties</strong> and the explosive anti-war backlash on the home front. By 1969, over 36,000 American soldiers had been killed, with hundreds dying each week. Draft resistance, student strikes, and veterans returning medals convinced Nixon that the American public would no longer tolerate high US body bags, forcing him to promise 'peace with honour' and begin the phased withdrawal of ground troops.<br><br>A second decisive factor was the <strong>shattering psychological impact of the 1968 Tet Offensive</strong>. Tet had destroyed the credibility of the US government, exposing the reality that 500,000 US soldiers could not secure South Vietnam against communist guerrilla infiltration. Nixon recognized that continuing a direct US ground war was politically suicidal, compelling him to shift the military burden of ground combat entirely onto the South Vietnamese Army (ARVN), supported by US air and naval power.<br><br>Finally, Nixon sought to implement his broader <strong>Nixon Doctrine and diplomatic détente</strong> with the Soviet Union and China. By pursuing diplomatic triangular diplomacy with Beijing and Moscow, Nixon hoped to isolate North Vietnam diplomatically while demonstrating that America’s Asian allies had to take primary responsibility for their own military defense, thereby facilitating an honourable exit for the United States.`,
  },
  {
    lessonIndex: 14,
    tariff: '8 marks',
    type: 'utility_8m',
    qNum: '3(a). ',
    question:
      'Study Sources B and C. How useful are Sources B and C for an enquiry into the main reasons for the growth of opposition to the Vietnam War in the USA (1968–71)? [8 marks]',
    model: `Source B is useful for an enquiry into the anti-war movement because it reveals the profound moral revulsion triggered by revelations of US military war crimes like the My Lai Massacre (revealed late 1969). From my own knowledge, I know that investigative reporting by Seymour Hersh uncovered that Charlie Company under Lt William Calley had murdered over 500 unarmed South Vietnamese women, children, and elderly villagers. The provenance of Source B makes it particularly valuable because, as a contemporary investigative report, it illustrates how photographic evidence of civilian massacres destroyed the moral justification for American involvement in Vietnam.<br><br>Source C is useful because it highlights the role of television broadcasting and the heavy human cost of the draft in mobilizing mass middle-class resistance. From my own knowledge, I know that Vietnam was America's first 'television war', bringing daily colour footage of burning villages, body bags, and wounded teenagers into living rooms, while draft card burnings and the Vietnam Veterans Against the War (VVAW) showed that ordinary Americans were turning decisively against the conflict. The provenance of Source C adds strong historical value because it details the widespread, multiracial scale of the anti-war coalitions like the Moratorium marchers. Together, both sources provide high historical utility for analyzing the moral, media, and human causes of domestic anti-war sentiment.`,
  },
  {
    lessonIndex: 15,
    tariff: '16 marks (+4 SPaG)',
    type: 'verdict_16m',
    qNum: '3(d). ',
    question:
      'How far do you agree with Interpretation 2 about the main reasons why the United States failed to defeat communist forces in Vietnam? [16 marks + 4 SPaG]',
    model: `On the one hand, Interpretation 1 argues that the United States lost the war primarily because of military and strategic failures on the battlefield. The US relied on inappropriate conventional tactics—such as heavy artillery, carpet-bombing, and Search and Destroy missions—that were completely unsuited to fighting an elusive guerrilla enemy in dense jungle terrain. Furthermore, the conscription draft system produced low morale, drug abuse, and 'fragging' among inexperienced one-year draftees, while widespread civilian destruction thoroughly alienated the South Vietnamese population.<br><br>On the other hand, Interpretation 2 forcefully argues that the US defeat was decided by the political loss of will on the domestic home front and the collapse of the corrupt, unpopular South Vietnamese regime. The growing anti-war movement, intense media scrutiny, and revelations like the Pentagon Papers made it impossible for US presidents to sustain indefinite military commitments. Simultaneously, the South Vietnamese government under Thieu was plagued by rampant corruption and lacked genuine popular legitimacy, meaning the ARVN collapsed rapidly once US air support and funding were terminated following the 1973 Paris Peace Accords.<br><br>Furthermore, contextual historical analysis confirms that the extraordinary ideological resilience and external superpower support (Soviet and Chinese weaponry) provided to the North Vietnamese allowed Ho Chi Minh's forces to sustain astronomical casualties and outlast American resolve.<br><br>In conclusion, having evaluated both interpretations against the historical evidence, I agree with Interpretation 2 to a large extent. While US tactical military methods were deeply flawed, military technology alone could never compensate for the absence of political legitimacy in Saigon and the total collapse of public and congressional support in Washington, making an American defeat inevitable.`,
  },
];

// Apply exam data to all 16 lessons
EXAM_DATA.forEach((ex) => {
  const lesson = usaData.lessons[ex.lessonIndex];
  if (!lesson) return;

  // 1. EXAM PRACTICE
  lesson.exam_practice = {
    title: 'Edexcel GCSE (9–1) Paper 3 Exam Practice',
    tariff: ex.tariff,
    questions: [
      {
        tariff: ex.tariff,
        type: ex.type,
        marks: ex.type.includes('16')
          ? 16
          : ex.type.includes('12')
            ? 12
            : ex.type.includes('8')
              ? 8
              : 4,
        question: `${ex.qNum}${ex.question}`,
        stimulus: ex.stimulus || [],
        prompt: 'Use the structure strip and historical guidance below to structure your response.',
        model: ex.model,
        scaffolding: {
          acronym: ex.type.includes('12')
            ? 'PEEL Structure Strip'
            : ex.type.includes('16')
              ? 'Evaluative Verdict Framework'
              : ex.type.includes('8')
                ? 'Source Utility Framework'
                : 'Point & Detail (4 Marks)',
          acronym_title: ex.type.includes('12')
            ? '3-Paragraph Causal Analysis (PEEL)'
            : ex.type.includes('16')
              ? 'Balanced Evaluative Essay (3 Themes + Judgement)'
              : ex.type.includes('8')
                ? 'Comparative Source Utility (Content, Knowledge, Provenance)'
                : 'Inference Formula: (i) Inference + Detail, (ii) Inference + Detail',
          sentence_starters: ex.type.includes('12')
            ? [
                'One major reason was...',
                'Furthermore, a second critical factor was...',
                'Finally, an underlying driver was...',
              ]
            : ex.type.includes('16')
              ? [
                  'On the one hand, Interpretation 1 argues that...',
                  'On the other hand, Interpretation 2 points out that...',
                  'In conclusion, having evaluated both views...',
                ]
              : [
                  'Source B is useful because...',
                  'Source C is useful because...',
                  'Combined, both sources provide...',
                ],
        },
      },
    ],
  };

  // 2. GCSE TASK (Interactive task cards)
  lesson.gcse_task = {
    title: `Edexcel GCSE Paper 3 Exam Practice: ${ex.tariff}`,
    tasks: [
      {
        type: 'written',
        tariff: `Question ${ex.qNum.trim()} [${ex.tariff}]`,
        text: `${ex.qNum}${ex.question}`,
        stimulus: ex.stimulus || [],
        model: ex.model,
      },
    ],
  };
});

// Serialize back to units/usa/data.js
const outputContent = `// USA 1954–75: Conflict at Home and Abroad Unit Data
const unitData = ${JSON.stringify(usaData, null, 2)};

export default unitData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(dataFilePath, outputContent, 'utf8');
console.log(
  '✅ Successfully expanded USA 1954–75 Do Nows to 10 questions and added Paper 3 Exam Tasks across all 16 lessons!',
);
