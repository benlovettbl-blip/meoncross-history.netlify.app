const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const bookletsDir = path.join(ROOT_DIR, 'public', 'units', 'usa', 'booklets');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'usa');
const globalPdfsDir = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(bookletsDir)) fs.mkdirSync(bookletsDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

// =============================================================================
// COMPREHENSIVE CURRICULUM DATA: USA 1954–75 (PAPER 3: 1HI0/33)
// =============================================================================
const KT_DATA = {
  KT1: {
    id: 'KT1',
    number: '1',
    title: 'Key Topic 1: The Development of the Civil Rights Movement, 1954–60',
    shortTitle: 'Civil Rights Movement, 1954–60',
    dates: '1954–1960',
    paperRef: '1HI0/33 (Paper 3: Modern Depth Study)',
    exam: {
      q1: {
        num: '1',
        stem: 'Give two things you can infer from Source A about racial segregation in the American South in the early 1950s.',
        marks: 4,
        sourceA: {
          image: 'colored-waiting-room-sign.jpg',
          shelfmark:
            'US National Archives · Record Group 21 / Southern Railway Photographic Records',
          title:
            'Source A: Segregated Municipal Railway Waiting Room, Jacksonville, Florida, early 1950s',
          extract:
            'A large metal sign suspended above the municipal terminal entrance reads: "COLORED WAITING ROOM" with dual directional arrows pointing towards the segregated facility. Under Jim Crow laws, Black travelers were strictly relegated to separate facilities under penalty of fine or imprisonment.',
          provenance:
            'Official photograph documenting Jim Crow segregation signage at a Southern passenger terminal, early 1950s (Library of Congress / National Archives).',
        },
        lines: 10,
        inference1: {
          prompt: '(i) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
        inference2: {
          prompt: '(ii) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
      },
      q2: {
        num: '2',
        stem: 'Explain why it was difficult for Black Americans in the Southern states to register to vote in the early 1950s.',
        marks: 12,
        stimulus: ['Literacy tests', 'Ku Klux Klan (KKK)'],
        linesPage3: 20,
        linesPage4: 18,
        vocabBank: [
          '15th Amendment bypassed',
          'Poll taxes',
          'Impossible literacy questions',
          'All-white registrars',
          'KKK lynchings & cross burnings',
          'White Citizens’ Councils evictions',
          'Fewer than 20% registered in South',
        ],
        connectives: [
          'A fundamental obstacle was...',
          'Furthermore, ...',
          'This was reinforced by...',
          'Consequently, ...',
          'As a result, ...',
        ],
        stages: {
          p1: 'Paragraph 1: Legal & Bureaucratic Barriers — Unfair literacy tests and poll taxes enforced arbitrarily by all-white registrars.',
          p2: 'Paragraph 2: Terror & Physical Violence — KKK night raids, firebombings, and lynchings operating with total judicial immunity.',
          p3: 'Paragraph 3: Economic Coercion (Own Knowledge) — White Citizens’ Councils firing activists, canceling mortgages, and evicting sharecroppers.',
        },
      },
      // Section B Enquiry Dossier
      dossier: {
        enquiry: 'The Reasons for the Success of the Montgomery Bus Boycott (1955–56)',
        sourceB: {
          shelfmark: 'Alabama Department of Archives and History · WPC Collection, Box 2',
          title:
            'Source B: From a protest flyer mimeographed and distributed in Montgomery, 2 December 1955',
          extract:
            '"Another woman has been arrested and thrown into jail because she refused to get up out of her seat on the bus for a white person... This has to be stopped. Negroes have rights too. If Negroes did not ride the buses, they could not operate; three-fourths of the riders are Negroes. We are asking every Negro to stay off the buses on Monday in protest of the arrest and trial. Don’t ride the buses to work, to town, to school, or anywhere on Monday. If you must work, take a cab, or share a ride, or walk."',
          provenance:
            'Protest leaflet written and mimeographed overnight by Jo Ann Robinson and the Women’s Political Council (WPC), distributing 35,000 copies.',
        },
        sourceC: {
          shelfmark: 'Martin Luther King Jr. Papers Project · Stanford University, Vol. III',
          title:
            'Source C: From an address by Dr Martin Luther King Jr. to the Montgomery Improvement Association, 5 December 1955',
          extract:
            '"We are here this evening for serious business. We are here in a general sense because first and foremost we are American citizens, and we are determined to apply our citizenship to the fullness of its meaning... There comes a time when people get tired of being trampled over by the iron feet of oppression. Our method will be that of persuasion, not coercion. We will say to the people: let your conscience be your guide. Our actions must be guided by the highest Christian principles of love and non-violence."',
          provenance:
            'Speech delivered by Dr Martin Luther King Jr. at Holt Street Baptist Church to over 5,000 citizens at the first mass rally of the boycott.',
        },
        int1: {
          author:
            "Historian Danielle L. McGuire, 'At the Dark End of the Street: Black Women, Rape, and Resistance' (2010)",
          text: '"The Montgomery Bus Boycott was fundamentally the achievement of organized Black working-class women. Long before national male leaders arrived, Jo Ann Robinson and the Women’s Political Council had methodically planned a bus strike. Within hours of Rosa Parks’ arrest, Robinson spent the night mimeographing 35,000 leaflets. Over the next 381 days, thousands of domestic maids and cooks walked up to twelve miles a day in freezing winter and blistering summer, while local drivers ran an intricate 300-car dispatch network. It was this daily grassroots courage and economic sacrifice—depriving the bus company of over 70% of its passengers—that brought Montgomery to its knees."',
        },
        int2: {
          author: "Historian David L. Lewis, 'King: A Critical Biography' (1970)",
          text: '"While grassroots logistics sustained the boycott, the movement achieved national momentum and ultimate victory because of the charismatic moral leadership of Dr Martin Luther King Jr. King provided the strategic vision and rhetorical genius that unified disparate local factions and prevented violent retaliation despite firebombings and arrests. He framed the local dispute as a national crusade for Christian justice, attracting essential northern financial support and national media coverage. Crucially, local economic pressure alone could not change municipal segregation laws; success ultimately depended on the legal strategy that secured the Supreme Court’s Browder v. Gayle ruling."',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the reasons for the success of the Montgomery Bus Boycott (1955–56)?',
        marks: 8,
        lines: 25,
        scaffold: {
          sourceB_focus:
            'Source B Utility (Content & COP): Shows the immediate grassroots mobilization, the role of Jo Ann Robinson/WPC, and the deliberate strategy of economic pressure (75% Black passengers).',
          sourceC_focus:
            'Source C Utility (Content & COP): Shows MLK’s inspirational leadership, framing the boycott around Christian non-violence and constitutional citizenship, securing mass discipline.',
          ownKnowledge_focus:
            'Contextual Knowledge: Mention the 381-day duration, the 300-car pool network, the Browder v. Gayle Supreme Court ruling (Nov 1956), and violent white backlash.',
        },
      },
      q3b: {
        num: '3 (b)',
        stem: 'Study Interpretations 1 and 2. They give different views about the main reason why the Montgomery Bus Boycott succeeded. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        marks: 4,
        lines: 10,
        formula:
          'Interpretation 1 argues that the boycott succeeded primarily due to grassroots mobilization and economic sacrifices of working-class Black women (Jo Ann Robinson, WPC, walking domestic workers), whereas Interpretation 2 argues that success was primarily driven by Dr Martin Luther King Jr.’s charismatic moral leadership and federal legal intervention (Browder v. Gayle).',
      },
      q3c: {
        num: '3 (c)',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the main reason why the Montgomery Bus Boycott succeeded. You may use Sources B and C to help explain your answer.',
        marks: 4,
        lines: 10,
        formula:
          'The historians give different views because they have relied on different types of primary evidence. The author of Interpretation 1 has focused on grassroots evidence such as Source B, highlighting the practical organizational labor of the Women’s Political Council and economic leverage. In contrast, the author of Interpretation 2 has drawn upon evidence such as Source C, emphasizing Dr King’s philosophical oratory and national leadership.',
      },
      q3d: {
        num: '3 (d)',
        stem: 'How far do you agree with Interpretation 2 about the reasons for the success of the Montgomery Bus Boycott (1955–56)?',
        marks: 20,
        subMarks: '16 marks for essay + 4 marks for SPaG',
        linesPage7: 26,
        linesPage8: 28,
        criteria: [
          'Grassroots economic mobilization (WPC, 300-car pool, walking 381 days, 70% revenue loss)',
          'Charismatic moral leadership (MLK, non-violence, mass church rallies, national media coverage)',
          'Federal legal intervention (Supreme Court ruling in Browder v. Gayle, 14th Amendment supremacy)',
        ],
      },
    },
    depthBank: {
      alternateQ: {
        num: '4',
        type: 'Explain Why',
        stem: 'Explain why the Brown v. Board of Education decision (1954) met with intense resistance in the Southern states.',
        marks: 12,
        stimulus: ['The Southern Manifesto (1956)', 'Orval Faubus at Little Rock (1957)'],
        lines: 22,
        vocabBank: [
          'Earl Warren unanimous 9-0 ruling',
          '"Separate is inherently unequal"',
          '101 Southern congressmen',
          'White Citizens’ Councils (1954)',
          '101st Airborne Division deployed',
          'Closure of public schools',
        ],
        planner: {
          p1: 'Southern Political Resistance: The Southern Manifesto signed by 101 congressmen urging states to resist federal tyranny.',
          p2: 'State-Level Nullification & Little Rock: Governor Faubus deploying the National Guard to defy federal court desegregation orders.',
          p3: 'Community & Economic Backlash (Own Knowledge): White Citizens’ Councils intimidating Black parents and closing public schools.',
        },
      },
    },
    exemplars: {
      q1: {
        stem: 'Give two things you can infer from Source A about racial segregation in the American South in the early 1950s.',
        model:
          '(i) What I can infer: I can infer that racial segregation was strictly enforced and institutionalized by municipal authorities rather than being merely informal discrimination.\nDetails in the source that tell me this: The source displays a prominent overhead street sign explicitly commanding "COLORED WAITING ROOM" with arrows directing Black travelers away from white areas.\n\n(ii) What I can infer: I can infer that Black Americans were treated as second-class citizens and relegated to separate, segregated facilities in public transport.\nDetails in the source that tell me this: The sign designates a completely separate waiting room specifically for "Colored" passengers, showing that basic facilities like waiting areas were racially divided under Jim Crow.',
        examiner:
          'Level 2 (4/4 Marks): Two valid, supported inferences drawn directly from the visual and textual evidence of the primary source.',
      },
      q2: {
        stem: 'Explain why it was difficult for Black Americans in the Southern states to register to vote in the early 1950s. (12 marks)',
        modelP1:
          'A fundamental reason why voter registration was exceedingly difficult was the systematic use of discriminatory literacy tests and poll taxes. Under the doctrine of states’ rights, Southern registrars held unchecked authority to administer registration tests. Black applicants were routinely asked impossible, obscure questions—such as reciting complex sections of the state constitution or guessing the number of bubbles in a bar of soap. Poor Black citizens were also subjected to cumulative poll taxes, which intentionally priced impoverished sharecroppers out of democracy. As a result, fewer than 20% of eligible Black adults were registered across the South, and under 5% in rural Mississippi.',
        modelP2:
          'Furthermore, voter registration was severely impeded by the constant threat of white supremacist violence and terror. Vigilante groups such as the Ku Klux Klan (KKK) operated with complete judicial impunity across the Deep South. Black citizens who dared to approach registration offices were subjected to violent intimidation, nighttime cross-burnings, house firebombings, and lynchings. Because local police sheriffs were frequently Klan members or sympathizers, Black applicants knew that the law would not protect them, creating a paralyzing climate of fear that suppressed political mobilization.',
        modelP3:
          'Finally, registration was blocked by systematic economic coercion orchestrated by the White Citizens’ Councils. Founded in 1954, these organizations of middle-class white professionals, bankers, and merchants used economic retaliation against any Black individual attempting to exercise civil rights. Black applicants had their names published in local newspapers, leading immediately to job dismissals, eviction from tenant farms, and the cancellation of bank credit and mortgages. This economic stranglehold ensured that even Black citizens willing to risk physical violence were deterred by the immediate prospect of financial ruin for their families.',
        examiner:
          'Level 4 (12/12 Marks): Fully developed 3-paragraph causal explanation; integrates both stimulus points alongside substantial own knowledge (White Citizens’ Councils); precise historical facts and sustained analytical focus.',
      },
      q3a: {
        stem: 'How useful are Sources B and C for an enquiry into the reasons for the success of the Montgomery Bus Boycott (1955–56)? (8 marks)',
        model:
          'Source B is highly useful because it provides direct contemporary evidence of the rapid grassroots mobilization of the Black community. Written by Jo Ann Robinson and distributed by the Women’s Political Council on 2 December 1955, the flyer reveals the strategic awareness of Black economic power, pointing out that "three-fourths of the riders are Negroes" and urging an immediate boycott. The utility is enhanced by its provenance: as an authentic working document distributed to 35,000 citizens, it proves that the boycott was organized by local women before national leaders took charge. However, its usefulness is limited as it only reflects the initial call to action, omitting the subsequent 381 days of walking and the 300-car pool network.\n\nSource C is also extremely useful because it provides firsthand insight into the inspirational moral leadership of Dr Martin Luther King Jr. In his 5 December speech, King establishes the core philosophy of Christian non-violence and frames the boycott as a struggle for constitutional citizenship. The provenance makes it particularly valuable: as a speech delivered to 5,000 energized protesters, it shows how King maintained community morale and non-violent discipline despite police harassment and bomb threats. When evaluated together with knowledge that the Supreme Court’s Browder v. Gayle ruling ultimately outlawed bus segregation in November 1956, both sources are exceptionally useful in demonstrating how grassroots logistics (Source B) and charismatic spiritual leadership (Source C) combined to achieve victory.',
        examiner:
          'Level 3 (8/8 Marks): Sophisticated evaluation of content, provenance (nature, origin, purpose), and contextual knowledge for both sources; weighs usefulness in relation to the specific enquiry.',
      },
      q3bc: {
        q3bModel:
          'The main difference between the interpretations is that Interpretation 1 views the boycott as the achievement of working-class Black women and grassroots community logistics, whereas Interpretation 2 argues that success was primarily due to Dr Martin Luther King Jr.’s charismatic moral leadership and federal legal intervention. Interpretation 1 emphasizes that Jo Ann Robinson and the WPC organized the 35,000 leaflets and the 381-day walking protest, while Interpretation 2 asserts that King’s rhetorical genius gave the movement national visibility and that only the Supreme Court’s Browder v. Gayle ruling could legally force desegregation.',
        q3bExaminer:
          'Level 2 (4/4 Marks): Direct, clear contrast of main viewpoints using accurate supporting details from both interpretations.',
        q3cModel:
          'Interpretations 1 and 2 give different views because the historians have investigated different aspects of the historical evidence. The author of Interpretation 1 has relied on grassroots documentation such as Source B, focusing on the practical organizing efforts of the Women’s Political Council and the economic power of domestic workers. Conversely, the author of Interpretation 2 has focused on high-profile public records and leadership speeches such as Source C, emphasizing Dr King’s oratory, the church mass rallies, and the national constitutional legal battle in the federal courts.',
        q3cExaminer:
          'Level 2 (4/4 Marks): Explains differing interpretations by linking them explicitly to differing source material and historical emphases.',
      },
      q3d: {
        stem: 'How far do you agree with Interpretation 2 about the reasons for the success of the Montgomery Bus Boycott (1955–56)? (16+4 marks)',
        modelExtract:
          'In conclusion, I agree with Interpretation 2 to a substantial extent, because without Dr King’s inspirational moral leadership and the binding constitutional authority of the federal courts, the boycott could never have achieved permanent legal desegregation. King’s philosophy of Christian non-violence maintained community discipline across 381 days of terror, while his national profile secured essential financial backing from northern sympathizers. Most decisively, municipal authorities adamantly refused to compromise despite severe commercial losses; only the Supreme Court’s landmark ruling in Browder v. Gayle (November 1956) legally outlawed bus segregation under the 14th Amendment. However, Interpretation 2 understates the indispensable grassroots mobilization highlighted in Interpretation 1. Without Jo Ann Robinson, the Women’s Political Council, and thousands of domestic workers sustaining the intricate 300-car pool network, there would have been no platform for King to lead or legal challenge for the courts to uphold. Therefore, while grassroots heroism created the crisis, charismatic leadership and federal judicial power were the decisive catalysts that transformed local resistance into historic victory.',
        examiner:
          'Level 4 (16+4 = 20/20 Marks): Sustained, criteria-based historiographical judgement; balances both interpretations with extensive own knowledge; nuanced conclusion weighing grassroots resistance against federal judicial power.',
      },
      traps: [
        {
          title: 'Rosa Parks was NOT an accidental protester',
          desc: 'Do not describe Rosa Parks as an exhausted seamstress who simply acted on impulse. She was a seasoned NAACP secretary trained in civil disobedience at the Highlander Folk School.',
        },
        {
          title: 'Economic pressure alone did NOT desegregate buses',
          desc: 'The bus company suffered crippling financial losses, but city ordinances forbade integration. Desegregation occurred strictly because the Supreme Court ruled in Browder v. Gayle that bus segregation violated the 14th Amendment.',
        },
        {
          title: 'The Boycott did NOT desegregate Montgomery',
          desc: 'The 1956 victory applied strictly to municipal public buses. All other public facilities in Montgomery—schools, restaurants, swimming pools, and waiting rooms—remained fiercely segregated.',
        },
      ],
    },
    tracker: {
      sectionA: [
        {
          q: '1',
          type: 'Inference',
          topic: 'Source A: Jim Crow Railway Sign (Jacksonville, FL)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Explain Why',
          topic: 'Obstacles to Southern Black Voter Registration (Early 1950s)',
          page: 'P3',
          marks: 12,
        },
      ],
      sectionB: [
        {
          q: 'Dossier',
          type: 'Enquiry',
          topic: 'Dossier: Montgomery Bus Boycott (Sources B, C & Ints 1, 2)',
          page: 'P4',
          marks: '-',
        },
        {
          q: '3 (a)',
          type: 'Utility',
          topic: 'Sources B & C: Reasons for Success of Montgomery Boycott',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Difference',
          topic: 'Interpretations 1 & 2: Main Difference in Views on Boycott',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (c)',
          type: 'Reason',
          topic: 'Interpretations 1 & 2: Reasons for Difference in Historical Views',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (d)',
          type: 'Essay',
          topic: 'Evaluative Essay: How Far Do You Agree with Interpretation 1?',
          page: 'P7–8',
          marks: 20,
        },
        {
          q: '4',
          type: 'Depth Booster',
          topic: 'Spec Depth: Why Brown v. Board Met Intense Resistance',
          page: 'P9',
          marks: 12,
        },
      ],
      sectionC: [
        {
          q: 'Exemplars',
          type: 'Section A Models',
          topic: 'Full Level 2 Model Q1 & Level 4 Model Q2 Essay + Examiner Marks',
          page: 'P10',
          marks: 'Audit',
        },
        {
          q: 'Exemplars',
          type: 'Section B Models',
          topic: 'Full Level 3 Model Q3a, Q3b, Q3c & Level 4 Q3d Model + Top 3 Traps',
          page: 'P11',
          marks: 'Audit',
        },
      ],
    },
  },

  KT2: {
    id: 'KT2',
    number: '2',
    title: 'Key Topic 2: The Radicalisation of the Civil Rights Movement, 1965–68',
    shortTitle: 'Radicalisation of Civil Rights, 1965–68',
    dates: '1965–1968',
    paperRef: '1HI0/33 (Paper 3: Modern Depth Study)',
    exam: {
      q1: {
        num: '1',
        stem: 'Give two things you can infer from Source A about the methods used by Southern police against civil rights demonstrators in Birmingham, Alabama (1963).',
        marks: 4,
        sourceA: {
          image: 'birmingham-protests-dogs-1963.jpg',
          shelfmark: 'Associated Press Photo Archive / Birmingham Civil Rights Digital Collection',
          title:
            'Source A: Police Dogs Lunging at High School Demonstrators, Birmingham, Alabama, 3 May 1963',
          extract:
            'Birmingham police officer Dick Pence holds the leash of a German Shepherd attack dog as it lunges at fifteen-year-old student Walter Gadsden during the Children’s Crusade. High-pressure fire hoses and attack dogs were deployed on unarmed teenage marchers on the orders of Eugene ‘Bull’ Connor.',
          provenance:
            'Photographed by Bill Hudson for the Associated Press on 3 May 1963; published across front pages of national and international newspapers.',
        },
        lines: 10,
        inference1: {
          prompt: '(i) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
        inference2: {
          prompt: '(ii) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
      },
      q2: {
        num: '2',
        stem: 'Explain why the Civil Rights Act was passed in 1964.',
        marks: 12,
        stimulus: [
          'The Birmingham Campaign (1963)',
          'The assassination of President Kennedy (November 1963)',
        ],
        linesPage3: 20,
        linesPage4: 18,
        vocabBank: [
          'Bull Connor fire hoses & dogs',
          'Televised violence shocked voters',
          'March on Washington (August 1963)',
          '250,000 peaceful demonstrators',
          '"I Have a Dream" speech',
          'Lyndon B. Johnson legislative mastery',
          'Broke 54-day Senate filibuster',
        ],
        connectives: [
          'A decisive catalyst was...',
          'Furthermore, ...',
          'This moral momentum was deepened when...',
          'Consequently, ...',
          'Ultimately, this led to...',
        ],
        stages: {
          p1: 'Paragraph 1: Birmingham & Televised Shock — Connor’s brutal crackdown on children horrified northern public opinion and damaged US global prestige.',
          p2: 'Paragraph 2: Kennedy’s Assassination & LBJ — Johnson used JFK’s martyrdom as an unstoppable moral mandate to push the bill through Congress.',
          p3: 'Paragraph 3: March on Washington (Own Knowledge) — 250,000 demonstrators created irresistible public pressure to break the 54-day Southern filibuster.',
        },
      },
      // Section B Enquiry Dossier
      dossier: {
        enquiry: 'The Causes of the Riots in Northern and Western Cities (1965–67)',
        sourceB: {
          shelfmark:
            'US Government Publishing Office · Report of the National Advisory Commission on Civil Disorders, Chapter 1',
          title:
            'Source B: From the official Report of the Kerner Commission, presented to President Johnson in March 1968',
          extract:
            '"Our nation is moving toward two societies, one black, one white—separate and unequal... Segregation and poverty have created in the racial ghetto a destructive environment totally unknown to white Americans. What white Americans have never fully understood—but what the Negro can never forget—is that white society is deeply implicated in the ghetto. White institutions created it, white institutions maintain it, and white society condones it. Pervasive discrimination in employment and housing, coupled with routine police harassment, has generated a reservoir of frustration that ignited in Watts, Newark, and Detroit."',
          provenance:
            'From the official findings of the National Advisory Commission on Civil Disorders (the Kerner Commission), established by President Lyndon B. Johnson to investigate urban riots.',
        },
        sourceC: {
          shelfmark:
            'Student Nonviolent Coordinating Committee Papers · King Library and Archives, Atlanta',
          title:
            'Source C: From a speech by Stokely Carmichael, chairman of SNCC, addressing a rally in Chicago, July 1966',
          extract:
            '"We have been begging the white man for freedom for over a century, singing ‘We Shall Overcome’ while his police beat our heads and his judges throw us in jail. Non-violence has failed to protect Black people in the northern slums. The Civil Rights Act did not give our brothers jobs; it did not tear down the rats and roaches in Harlem and Chicago! Black Power means Black people coming together to organize our own strength. If white police come into our communities acting like an occupying army, Black men have a duty to defend themselves and take control of our own destiny."',
          provenance:
            'Speech by SNCC leader Stokely Carmichael delivered to an audience of urban Black youths in Chicago, widely broadcast across national media.',
        },
        int1: {
          author: "Historian Harvard Sitkoff, 'The Struggle for Black Equality, 1954–1980' (1981)",
          text: '"The explosion of urban rebellions in Watts, Chicago, Newark, and Detroit was the direct consequence of intolerable economic despair and de facto segregation in northern ghettos. While the civil rights movement had won voting rights in the South, it had done almost nothing to alleviate poverty, dilapidated tenement housing, and 30% youth unemployment in northern cities. Confined by bank redlining and landlord discrimination into overcrowded slums, and subjected to routine brutality by almost entirely white police forces, young Black urbanites felt completely excluded from American prosperity. The riots were spontaneous eruptions of economic rage against living conditions that legislative civil rights acts had left untouched."',
        },
        int2: {
          author:
            "Historian Clayborne Carson, 'In Struggle: SNCC and the Black Awakening of the 1960s' (1981)",
          text: '"The wave of urban violence from 1965 onwards was driven primarily by a profound ideological transformation: the rise of Black Power and militant Black nationalism. Inspired by the uncompromising rhetoric of Malcolm X and popularized by Stokely Carmichael, younger activists completely rejected Martin Luther King’s philosophy of non-violence and interracial integration. Black Power taught urban youth that non-violence was humiliating and ineffective, encouraging them instead to confront white institutional power directly. The fiery speeches of SNCC and Black Panther leaders gave voice and political legitimacy to rebellion, transforming street unrest into conscious acts of defiance against white authority."',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the causes of the riots in northern and western cities between 1965 and 1967?',
        marks: 8,
        lines: 25,
        scaffold: {
          sourceB_focus:
            'Source B Utility (Content & COP): Official government investigation identifying deep structural causes: white racism, ghettoization, housing redlining, 30% unemployment, and police hostility.',
          sourceC_focus:
            'Source C Utility (Content & COP): Eyewitness political speech demonstrating the ideological shift towards Black Power, disillusionment with non-violence, and active anger against white police brutality.',
          ownKnowledge_focus:
            'Contextual Knowledge: Reference the Watts Riots (Aug 1965, 34 dead, $40m damage), Detroit & Newark (1967), Kerner Report recommendations, and the rise of the Black Panthers.',
        },
      },
      q3b: {
        num: '3 (b)',
        stem: 'Study Interpretations 1 and 2. They give different views about the main cause of the urban riots between 1965 and 1967. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        marks: 4,
        lines: 10,
        formula:
          'Interpretation 1 argues that the urban riots were spontaneous eruptions driven by severe economic deprivation, poverty, and de facto ghetto segregation in northern cities, whereas Interpretation 2 argues that the riots were primarily caused by an ideological shift towards Black Power, Malcolm X’s rhetoric, and the rejection of non-violence.',
      },
      q3c: {
        num: '3 (c)',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the main cause of the urban riots between 1965 and 1967. You may use Sources B and C to help explain your answer.',
        marks: 4,
        lines: 10,
        formula:
          'The historians have different views because they have relied on different historical evidence. The author of Interpretation 1 has focused on socio-economic investigations such as the Kerner Commission Report in Source B, which emphasized structural poverty and housing discrimination. In contrast, the author of Interpretation 2 has examined political speeches and activist manifestos such as Source C, emphasizing the radical rhetoric of Stokely Carmichael and the appeal of Black Power.',
      },
      q3d: {
        num: '3 (d)',
        stem: 'How far do you agree with Interpretation 2 about the causes of the riots in northern and western cities between 1965 and 1967?',
        marks: 20,
        subMarks: '16 marks for essay + 4 marks for SPaG',
        linesPage7: 26,
        linesPage8: 28,
        criteria: [
          'Socio-economic deprivation (Watts, ghetto slums, bank redlining, 30%+ youth unemployment)',
          'Ideological radicalisation (Black Power, Malcolm X, Stokely Carmichael, rejection of non-violence)',
          'Police brutality as the immediate trigger (white police forces acting as occupying armies in ghettos)',
        ],
      },
    },
    depthBank: {
      alternateQ: {
        num: '4',
        type: 'Explain Why',
        stem: 'Explain why the Black Panther Party was formed in Oakland, California, in 1966.',
        marks: 12,
        stimulus: ['Bobby Seale and Huey Newton', 'Police brutality in Black neighbourhoods'],
        lines: 22,
        vocabBank: [
          'Oakland, California (Oct 1966)',
          'Ten-Point Programme',
          'Armed citizen patrols (Mule law)',
          'Black leather jackets & berets',
          'Free Breakfast for Children',
          'Free health clinics & sickle cell screening',
        ],
        planner: {
          p1: 'Founding & Leadership: Huey Newton and Bobby Seale establishing the party to protect Black communities from police violence.',
          p2: 'Armed Community Defense: Patrolling streets with law books and loaded firearms to monitor police stops and deter abuse.',
          p3: 'Community Survival Programs (Own Knowledge): The Ten-Point Programme providing Free Breakfast for Children, shoes, and free medical clinics.',
        },
      },
    },
    exemplars: {
      q1: {
        stem: 'Give two things you can infer from Source A about the methods used by Southern police against civil rights demonstrators in Birmingham, Alabama (1963).',
        model:
          '(i) What I can infer: I can infer that Southern authorities used aggressive physical force and police attack dogs to terrorize young civil rights marchers.\nDetails in the source that tell me this: The photograph shows a uniformed police officer firmly gripping the leash of a snarling German Shepherd attack dog as it lunges directly at a teenage demonstrator.\n\n(ii) What I can infer: I can infer that the civil rights demonstrators maintained non-violent discipline even when confronted by terrifying police brutality.\nDetails in the source that tell me this: The young student (Walter Gadsden) stands calmly without raising his hands, fleeing, or attempting to strike the dog or police officer.',
        examiner:
          'Level 2 (4/4 Marks): Two valid inferences directly supported by specific visual details from the historic photograph.',
      },
      q2: {
        stem: 'Explain why the Civil Rights Act was passed in 1964. (12 marks)',
        modelP1:
          'A primary catalyst for the passage of the 1964 Civil Rights Act was the national and international outrage generated by the Birmingham Campaign in May 1963. SCLC leader Martin Luther King Jr. deliberately chose Birmingham to expose the extreme violence of segregationist authorities. When Public Safety Commissioner Eugene ‘Bull’ Connor turned high-pressure fire hoses and vicious police dogs on marching schoolchildren, the scenes were broadcast across national television networks. This visual brutality horrified millions of northern white voters and severely damaged American diplomatic standing during the Cold War, forcing President John F. Kennedy to publicly announce comprehensive civil rights legislation on national television in June 1963.',
        modelP2:
          'Furthermore, the assassination of President Kennedy in November 1963 provided the crucial moral and emotional impetus needed to pass the bill. When Vice President Lyndon B. Johnson assumed the presidency, he skillfully utilized Kennedy’s martyrdom to overcome legislative gridlock. Johnson addressed a joint session of Congress, proclaiming that "no memorial oration or eulogy could more eloquently honor President Kennedy’s memory than the earliest possible passage of the civil rights bill." This emotional appeal made it politically toxic for moderate congressmen to oppose the legislation, transforming Kennedy’s draft into an urgent national tribute.',
        modelP3:
          'Finally, the passage of the Act was secured by the immense public pressure generated by the March on Washington in August 1963, combined with President Johnson’s legislative mastery. Over 250,000 peaceful demonstrators gathered at the Lincoln Memorial, where King delivered his iconic ‘I Have a Dream’ speech. This unprecedented mobilization proved that civil rights had become a mass national movement. When Southern Democratic senators launched a historic 54-day filibuster to block the bill, Johnson utilized his formidable Senate expertise to forge a bipartisan coalition with Republican minority leader Everett Dirksen. Together, they secured the two-thirds supermajority required to break the filibuster, signing the historic Act into law on 2 July 1964.',
        examiner:
          'Level 4 (12/12 Marks): Comprehensive 3-paragraph causal structure; fully explores Birmingham, Kennedy’s assassination, and the March on Washington; excellent analytical connectives and historical precision.',
      },
      q3a: {
        stem: 'How useful are Sources B and C for an enquiry into the causes of the riots in northern and western cities between 1965 and 1967? (8 marks)',
        model:
          'Source B is highly useful because it provides official, authoritative evidence of the deep structural and economic causes of urban unrest. Commissioned by President Johnson following the devastating Detroit riots of 1967, the Kerner Report boldly concluded that "white society is deeply implicated in the ghetto." The content reveals that discriminatory employment, redlined housing, and routine police harassment created an explosive "reservoir of frustration." Its provenance as an official federal investigation gives it exceptional utility, as it represents the first time the US government officially acknowledged institutional white racism as the root cause of urban riots.\n\nSource C is also extremely useful because it provides immediate eyewitness insight into the radical ideological mindset of young Black activists. In this July 1966 Chicago speech, SNCC leader Stokely Carmichael explicitly repudiates Martin Luther King’s philosophy of Christian non-violence, arguing that the 1964 Civil Rights Act brought no tangible improvements to northern slums. The utility of Source C lies in showing how the slogan of ‘Black Power’ gave political legitimacy to urban street rebellion, framing riots not as senseless crime but as legitimate self-defense against white police acting as an "occupying army." Combined with contextual knowledge of the Watts Riots (August 1965, 34 killed) and the rise of the Black Panther Party in 1966, both sources are invaluable: Source B exposes the underlying socio-economic tinderbox, while Source C explains the ideological spark that ignited it.',
        examiner:
          'Level 3 (8/8 Marks): Perceptive evaluation of content, provenance, and historical context; contrasts structural socio-economic causes with political/ideological drivers.',
      },
      q3bc: {
        q3bModel:
          'The main difference is that Interpretation 1 views the riots as spontaneous explosions of rage caused by severe socio-economic misery, poverty, and de facto ghetto segregation, whereas Interpretation 2 argues that the violence was primarily driven by an ideological transformation centered on Black Power, Malcolm X’s militant rhetoric, and the rejection of non-violence. Interpretation 1 focuses on 30% youth unemployment and slum housing, while Interpretation 2 emphasizes that leaders like Stokely Carmichael gave urban youth the ideological justification to rebel against white authority.',
        q3bExaminer:
          'Level 2 (4/4 Marks): Direct, accurate contrast between socio-economic and ideological arguments with detailed evidence from both extracts.',
        q3cModel:
          'Interpretations 1 and 2 give different views because the historians have investigated different bodies of historical evidence. The author of Interpretation 1 has relied on government sociological investigations such as the Kerner Report in Source B, which methodically documented housing redlining, poverty, and unemployment statistics. Conversely, the author of Interpretation 2 has examined the militant political speeches and publications of SNCC and the Black Panthers, such as Source C, which highlighted the popular rejection of non-violence and the adoption of armed self-defense.',
        q3cExaminer:
          'Level 2 (4/4 Marks): Clear, historically grounded explanation linking differing viewpoints to differing source types and research perspectives.',
      },
      q3d: {
        stem: 'How far do you agree with Interpretation 2 about the causes of the riots in northern and western cities between 1965 and 1967? (16+4 marks)',
        modelExtract:
          'In conclusion, I agree with Interpretation 2 only to a limited extent. While Interpretation 2 correctly identifies that Black Power ideology (championed by Malcolm X and Stokely Carmichael) provided an empowering political language for urban rebellion, militant ideology was an accelerator rather than the root cause of the riots. The primary catalyst was the unbearable socio-economic deprivation and systemic police brutality detailed in Interpretation 1. The civil rights legislation of 1964 and 1965 dismantled de jure segregation in the South, but it left the de facto apartheid of northern cities completely untouched. In Watts, Detroit, and Newark, Black citizens were trapped in redlined slums with 30%+ youth unemployment and abusive, all-white police forces acting like an occupying army. As the Kerner Commission concluded in Source B, white institutions created the ghetto tinderbox. Without these intolerable material conditions, the radical calls for armed defiance in Source C would never have resonated with thousands of ordinary residents. Therefore, while Black Power shaped how anger was expressed, socio-economic misery was the fundamental cause of the explosion.',
        examiner:
          'Level 4 (16+4 = 20/20 Marks): Exemplary evaluative conclusion; sustains explicit criteria; integrates both interpretations with deep factual knowledge; clearly establishes primary causation.',
      },
      traps: [
        {
          title: 'Riots were NOT caused by Southern Jim Crow laws',
          desc: 'Northern and western riots (Watts, Detroit, Newark) occurred in cities with NO legal de jure segregation. They were driven by de facto segregation: redlining, jobs, and police brutality.',
        },
        {
          title: 'Do NOT confuse Black Power with Black Panthers',
          desc: 'Black Power was a broad political philosophy popularised by Stokely Carmichael in 1966. The Black Panther Party was a specific revolutionary organization founded by Huey Newton and Bobby Seale.',
        },
        {
          title: 'The Kerner Report blamed WHITE society, not rioters',
          desc: 'Students often incorrectly write that the government blamed Black rioters. The Kerner Commission famously declared: "White society is deeply implicated in the ghetto. White institutions created it, white institutions maintain it."',
        },
      ],
    },
    tracker: {
      sectionA: [
        {
          q: '1',
          type: 'Inference',
          topic: 'Source A: Birmingham Police Crackdown on Marchers (1963)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Explain Why',
          topic: 'Passage of the Civil Rights Act of 1964',
          page: 'P3',
          marks: 12,
        },
      ],
      sectionB: [
        {
          q: 'Dossier',
          type: 'Enquiry',
          topic: 'Dossier: Northern Urban Riots (Sources B, C & Ints 1, 2)',
          page: 'P4',
          marks: '-',
        },
        {
          q: '3 (a)',
          type: 'Utility',
          topic: 'Sources B & C: Causes of Urban Riots (1965–67)',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Difference',
          topic: 'Interpretations 1 & 2: Main Difference in Views on Urban Riots',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (c)',
          type: 'Reason',
          topic: 'Interpretations 1 & 2: Reasons for Difference in Historical Views',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (d)',
          type: 'Essay',
          topic: 'Evaluative Essay: How Far Do You Agree with Interpretation 1?',
          page: 'P7–8',
          marks: 20,
        },
        {
          q: '4',
          type: 'Depth Booster',
          topic: 'Spec Depth: Formation of the Black Panther Party (1966)',
          page: 'P9',
          marks: 12,
        },
      ],
      sectionC: [
        {
          q: 'Exemplars',
          type: 'Section A Models',
          topic: 'Full Level 2 Model Q1 & Level 4 Model Q2 Essay + Examiner Marks',
          page: 'P10',
          marks: 'Audit',
        },
        {
          q: 'Exemplars',
          type: 'Section B Models',
          topic: 'Full Level 3 Model Q3a, Q3b, Q3c & Level 4 Q3d Model + Top 3 Traps',
          page: 'P11',
          marks: 'Audit',
        },
      ],
    },
  },

  KT3: {
    id: 'KT3',
    number: '3',
    title: 'Key Topic 3: US Involvement in the Vietnam War, 1954–68',
    shortTitle: 'US Involvement in Vietnam, 1954–68',
    dates: '1954–1968',
    paperRef: '1HI0/33 (Paper 3: Modern Depth Study)',
    exam: {
      q1: {
        num: '1',
        stem: 'Give two things you can infer from Source A about the conditions faced by US infantry patrols fighting in South Vietnam (1965–68).',
        marks: 4,
        sourceA: {
          image: 'us-soldier-patrolling-swamp.jpg',
          shelfmark:
            'US National Archives · Records of the Office of the Chief of Military History, Vietnam Collection',
          title: 'Source A: A US Soldier on Combat Patrol in the Swamps of South Vietnam, 1966',
          extract:
            'An American soldier from the 9th Infantry Division wades through chest-deep swamp water carrying an M60 machine gun and bandoliers of ammunition during a search-and-destroy mission against Vietcong guerrillas in the Mekong Delta.',
          provenance:
            'Official combat photograph taken by US Army military photographers in South Vietnam, 1966 (National Archives Record Group 111).',
        },
        lines: 10,
        inference1: {
          prompt: '(i) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
        inference2: {
          prompt: '(ii) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
      },
      q2: {
        num: '2',
        stem: 'Explain why US involvement in Vietnam escalated under President Johnson between 1964 and 1965.',
        marks: 12,
        stimulus: [
          'The Gulf of Tonkin incident (August 1964)',
          'The attack on the US base at Pleiku (February 1965)',
        ],
        linesPage3: 20,
        linesPage4: 18,
        vocabBank: [
          'Domino Theory & containment',
          'USS Maddox attacked',
          'Gulf of Tonkin Resolution (blank check)',
          'Pleiku mortar attack kills 8 Americans',
          'Operation Rolling Thunder (March 1965)',
          '3,500 US Marines land at Da Nang',
          'Weakness of ARVN & Saigon regime',
        ],
        connectives: [
          'A decisive turning point occurred when...',
          'In response, Congress...',
          'This escalation was accelerated by...',
          'Consequently, ...',
          'This directly resulted in...',
        ],
        stages: {
          p1: 'Paragraph 1: Gulf of Tonkin Incident & Resolution — Alleged North Vietnamese torpedo boat attack giving LBJ congressional authority to wage war.',
          p2: 'Paragraph 2: Pleiku Attack & Operation Rolling Thunder — Vietcong mortar attack on US airbase prompting 3-year sustained aerial bombing campaign.',
          p3: 'Paragraph 3: Troop Deployments & Da Nang (Own Knowledge) — Landing of 3,500 Marines in March 1965 to defend air bases, beginning full ground combat commitment.',
        },
      },
      // Section B Enquiry Dossier
      dossier: {
        enquiry: 'The Reasons Why US Military Tactics Failed to Defeat the Vietcong (1965–68)',
        sourceB: {
          shelfmark:
            'Marine Corps Historical Center · Oral History Collection, Vietnam Combat Series',
          title:
            'Source B: From combat memoirs by US Marine Lieutenant Philip Caputo, published in ‘A Rumor of War’ (1977)',
          extract:
            '"We were sent on ‘search and destroy’ patrols through dense jungle and steaming swamps. The strategy was simple: find the enemy, fix him, and destroy him with massive artillery and air strikes. But we could almost never locate him. The Vietcong fought on their own terms: a sudden burst of fire from concealed tree lines, a sniper round, or an explosive booby trap made from a recycled artillery shell and bamboo punji sticks. When we entered a village, we could not distinguish a friendly farmer by day from a guerrilla fighter by night. Frustrated soldiers burned thatched huts with Zippo lighters, turning the very peasants we were sent to defend into sworn enemies."',
          provenance:
            'Written by Philip Caputo, a US Marine lieutenant who commanded combat infantry units in South Vietnam in 1965–66.',
        },
        sourceC: {
          shelfmark:
            'War Remnants Museum · Military History Institute of Vietnam, Cu Chi Guerrilla Archives',
          title:
            'Source C: From an interview with Vo Thi Mo, a female Vietcong guerrilla fighter in Cu Chi district, recorded in 1982',
          extract:
            '"The Americans possessed immense firepower—jets, helicopters, tanks, and chemical poisons that destroyed our rice crops. But they did not know the forest, and they did not know our people. Beneath the soil, we built over two hundred kilometers of multi-level tunnels with barracks, hospitals, and weapons factories. When their planes bombed, we remained safe twenty feet underground. When their infantry advanced, our booby traps—punji stakes smeared with animal dung, tripwires, and toe-poppers—inflicted daily casualties and wrecked their nerves. We were fighting for our own homeland; their soldiers fought only because they were drafted."',
          provenance:
            'Oral history interview with a veteran Vietcong combatant who operated in the Cu Chi tunnel network throughout the war.',
        },
        int1: {
          author:
            "Historian Christian G. Appy, 'Working-Class War: American Combat Soldiers and Vietnam' (1993)",
          text: '"American military tactics were fundamentally mismatched with the political realities of guerrilla warfare in Vietnam. General Westmoreland’s strategy of ‘search and destroy’ relied on attrition—measuring progress through enemy ‘body counts’ rather than securing territory. Because US troops were dropped into hostile territory by helicopter and evacuated immediately after contact, they never established permanent security for South Vietnamese villagers. Furthermore, the massive reliance on indiscriminate firepower—napalm, defoliants (Agent Orange), and artillery—inflicted horrific civilian casualties, alienating the rural population and pushing thousands of previously neutral peasants into active support for the National Liberation Front."',
        },
        int2: {
          author: "Historian Guenter Lewy, 'America in Vietnam' (1978)",
          text: '"The failure of the American military effort was not primarily due to flawed US tactics, but to the extraordinary effectiveness, discipline, and strategic design of the communist insurgency. The Vietcong and North Vietnamese Army operated an exceptionally sophisticated underground logistics infrastructure. Their vast network of subterranean tunnels in Cu Chi and the Iron Triangle neutralized American air superiority. Moreover, the Vietcong enforced strict discipline, utilized terror ruthlessly to eliminate uncooperative village leaders, and benefited from an inexhaustible flow of Soviet and Chinese weapons down the Ho Chi Minh Trail. The tenacity and survival techniques of the communist cadres made them impervious to military defeat."',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the reasons why US military tactics failed to defeat the Vietcong (1965–68)?',
        marks: 8,
        lines: 25,
        scaffold: {
          sourceB_focus:
            'Source B Utility (Content & COP): Eyewitness combat officer detailing tactical failures: inability to find the enemy, booby traps, burning villages (Zippo raids), and losing the "hearts and minds" of peasants.',
          sourceC_focus:
            'Source C Utility (Content & COP): Primary guerrilla perspective showing why Vietcong tactics succeeded: Cu Chi tunnels neutralizing air power, psychological impact of booby traps, and high morale.',
          ownKnowledge_focus:
            'Contextual Knowledge: Explain Search and Destroy, Operation Rolling Thunder, Agent Orange, punji traps, Cu Chi tunnels, and the Ho Chi Minh Trail.',
        },
      },
      q3b: {
        num: '3 (b)',
        stem: 'Study Interpretations 1 and 2. They give different views about why US military tactics failed to defeat the Vietcong. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        marks: 4,
        lines: 10,
        formula:
          'Interpretation 1 argues that US failure was caused by flawed American military strategy—specifically the reliance on attrition, search-and-destroy, and indiscriminate firepower that alienated the peasant population. In contrast, Interpretation 2 argues that US failure was primarily due to the superior resilience, subterranean tunnel networks, and effective guerrilla discipline of the Vietcong.',
      },
      q3c: {
        num: '3 (c)',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views about why US military tactics failed to defeat the Vietcong. You may use Sources B and C to help explain your answer.',
        marks: 4,
        lines: 10,
        formula:
          'The historians give different views because they have utilized different perspectives in their research. The author of Interpretation 1 has focused on American combat reports and soldier accounts like Source B, emphasizing how search-and-destroy alienated Vietnamese villagers. In contrast, the author of Interpretation 2 has examined communist operational records and guerrilla testimonies like Source C, highlighting the subterranean engineering of the Cu Chi tunnels and guerrilla resilience.',
      },
      q3d: {
        num: '3 (d)',
        stem: 'How far do you agree with Interpretation 2 about the reasons why US military tactics failed to defeat the Vietcong (1965–68)?',
        marks: 20,
        subMarks: '16 marks for essay + 4 marks for SPaG',
        linesPage7: 26,
        linesPage8: 28,
        criteria: [
          'Flawed US military tactics (Search and Destroy, body counts, Zippo raids, napalm/Agent Orange destroying villages)',
          'Guerrilla tactics & terrain advantages (Cu Chi tunnels, booby traps, lack of uniform, peasant concealment)',
          'External communist support (Ho Chi Minh Trail, Soviet and Chinese modern weapons, anti-aircraft guns)',
        ],
      },
    },
    depthBank: {
      alternateQ: {
        num: '4',
        type: 'Explain Why',
        stem: 'Explain why the Vietcong and North Vietnamese Army were able to launch the Tet Offensive in January 1968.',
        marks: 12,
        stimulus: ['The Ho Chi Minh Trail', 'The siege at Khe Sanh'],
        lines: 22,
        vocabBank: [
          'Tet Lunar New Year holiday',
          '31 January 1968 assault',
          '84,000 communist troops',
          'Attacks on 100+ cities & Saigon US Embassy',
          'Khe Sanh diversion drew US forces away',
          'Smuggled arms in coffins & vegetable carts',
        ],
        planner: {
          p1: 'Logistics & Supply Lines: The Ho Chi Minh Trail moving Soviet and Chinese heavy weapons and 84,000 troops south undetected.',
          p2: 'Strategic Diversion at Khe Sanh: General Giap attacking the remote Marine base at Khe Sanh to lure US reserves away from major cities.',
          p3: 'Tactical Surprise & Infiltration (Own Knowledge): Breaking the traditional holiday truce and smuggling weapons into Saigon in false-bottomed trucks.',
        },
      },
    },
    exemplars: {
      q1: {
        stem: 'Give two things you can infer from Source A about the conditions faced by US infantry patrols fighting in South Vietnam (1965–68).',
        model:
          '(i) What I can infer: I can infer that American ground troops had to operate in treacherous, exhausting physical conditions in the Vietnamese countryside.\nDetails in the source that tell me this: The soldier is shown wading through deep, muddy swamp water and dense vegetation that severely hindered mobility.\n\n(ii) What I can infer: I can infer that infantrymen were forced to carry immense physical loads of heavy weaponry to prepare for surprise ambushes.\nDetails in the source that tell me this: The soldier is carrying a heavy M60 machine gun and long belts of live ammunition draped over his shoulder while traversing the swamp.',
        examiner:
          'Level 2 (4/4 Marks): Two valid inferences supported by specific visual details from the combat photograph.',
      },
      q2: {
        stem: 'Explain why US involvement in Vietnam escalated under President Johnson between 1964 and 1965. (12 marks)',
        modelP1:
          'A major reason for the escalation of US involvement was the Gulf of Tonkin incident in August 1964. Following alleged North Vietnamese torpedo boat attacks against the destroyer USS Maddox in international waters, President Lyndon B. Johnson requested emergency powers from Congress. The resulting Gulf of Tonkin Resolution passed almost unanimously, granting Johnson the constitutional authority to "take all necessary measures to repel any armed attack against the forces of the United States." This effectively served as a functional declaration of war and a blank check, enabling the president to escalate military commitments without formal congressional debate.',
        modelP2:
          'Furthermore, escalation was triggered by the Vietcong attack on the American airbase at Pleiku in February 1965. A surprise mortar attack killed eight American servicemen and wounded over one hundred, destroying ten aircraft. Johnson felt compelled to respond decisively to prove American resolve and deter communist aggression, declaring that he would not let Saigon fall. Within days, Johnson authorized Operation Rolling Thunder—a sustained, multi-year aerial bombardment campaign targeting North Vietnamese military bases, supply routes, and rail lines across the 17th parallel.',
        modelP3:
          'Finally, the escalation to ground combat troops was driven by the catastrophic military weakness of the South Vietnamese Army (ARVN) and the immediate necessity to protect US air bases. General William Westmoreland warned Washington that the corrupt Saigon regime was on the verge of total military collapse. In March 1965, Johnson deployed 3,500 US Marines to land on the beaches of Da Nang to guard the American airfield. Once ground combat troops were committed to defensive duties, Westmoreland rapidly shifted their mission to aggressive ‘search and destroy’ patrols, causing US troop numbers to skyrocket to over 184,000 by the end of 1965.',
        examiner:
          'Level 4 (12/12 Marks): Comprehensive 3-part causal analysis; covers the Gulf of Tonkin Resolution, Pleiku/Rolling Thunder, and the Da Nang troop landings; clear analytical flow and strong factual support.',
      },
      q3a: {
        stem: 'How useful are Sources B and C for an enquiry into the reasons why US military tactics failed to defeat the Vietcong (1965–68)? (8 marks)',
        model:
          'Source B is exceptionally useful because it provides an unvarnished firsthand account from an American combat officer detailing the fundamental operational flaws of search-and-destroy tactics. Lieutenant Philip Caputo reveals that despite massive air and artillery firepower, US troops could rarely locate the elusive guerrilla enemy, who dictated the terms of combat through sudden ambushes and homemade booby traps. Furthermore, Caputo highlights how the inability to distinguish guerrillas from innocent peasants led soldiers to burn thatched huts ("Zippo raids"), thereby alienating the very population the US intended to protect. The provenance gives it great value: written by a frontline combat officer with no reason to flatter high command, it offers authentic insight into soldier demoralization.\n\nSource C is equally useful because it offers an invaluable primary perspective from the opposing side, explaining the subterranean tactics that neutralized American technological superiority. Vo Thi Mo describes how the Cu Chi tunnel network—stretching over 200 kilometers across multiple levels—enabled Vietcong fighters to survive heavy aerial bombardment, manufacture weapons, and live safely underground. Furthermore, she highlights the psychological power of low-tech booby traps (punji stakes) in wrecking American morale and emphasizes the deep motivation of fighting for one’s homeland compared to conscripted US troops. Evaluated in the context of the Ho Chi Minh Trail and General Westmoreland’s failed strategy of attrition, both sources are immensely useful: Source B exposes the tactical frustration and alienation caused by American search-and-destroy methods, while Source C demonstrates the extraordinary resilience and tactical ingenuity of the communist underground resistance.',
        examiner:
          'Level 3 (8/8 Marks): Perceptive evaluation of both sources; examines tactical failure vs guerrilla resilience; integrates provenance (nature, origin, purpose) and detailed contextual knowledge.',
      },
      q3bc: {
        q3bModel:
          'The main difference is that Interpretation 1 attributes US failure to flawed American military strategies—specifically search-and-destroy, body counts, and the excessive use of firepower (napalm, Agent Orange) that turned the peasant population against the US. On the other hand, Interpretation 2 argues that failure was primarily caused by the extraordinary resilience, discipline, and subterranean tunnel engineering of the Vietcong, supported by Chinese and Soviet arms supplies down the Ho Chi Minh Trail.',
        q3bExaminer:
          'Level 2 (4/4 Marks): Direct, clear contrast of main viewpoints supported by specific details and terminology from both texts.',
        q3cModel:
          'Interpretations 1 and 2 differ because the historians have investigated different dimensions of the war. The author of Interpretation 1 has focused on American military command records and veteran testimonies like Source B, analyzing the failure of search-and-destroy tactics and the moral alienation of the Vietnamese peasantry. In contrast, the author of Interpretation 2 has focused on Vietnamese guerrilla engineering and communist military archives like Source C, evaluating the military effectiveness of the Cu Chi tunnel systems and the logistical resilience of the National Liberation Front.',
        q3cExaminer:
          'Level 2 (4/4 Marks): Sound historical explanation linking differing interpretations to differing source materials and historical focuses.',
      },
      q3d: {
        stem: 'How far do you agree with Interpretation 2 about the reasons why US military tactics failed to defeat the Vietcong (1965–68)? (16+4 marks)',
        modelExtract:
          "In conclusion, I agree with Interpretation 2 to a very large extent, because the remarkable tactical resilience, discipline, and subterranean ingenuity of the Vietcong were the decisive factors that neutralized America’s overwhelming technological superiority. As detailed in Source C, the construction of over 200 kilometers of multi-tiered tunnels at Cu Chi enabled guerrilla fighters to survive intense aerial bombing, conceal weapons workshops, and emerge behind US patrols to launch lethal ambushes. Coupled with low-tech booby traps (punji stakes) that inflicted heavy psychological casualties, and the constant influx of supplies down the Ho Chi Minh Trail, the communists dictated the geography and tempo of combat. However, Interpretation 2 must be evaluated alongside the fatal operational flaws of American strategy outlined in Interpretation 1. As revealed in Source B, General Westmoreland’s reliance on conventional 'search and destroy' missions, measured purely by body counts, alienated the civilian peasantry whose allegiance was essential for counter-insurgency victory. Indiscriminate saturation bombing, napalm, and Agent Orange defoliation destroyed ancestral villages and turned ordinary farmers into active Vietcong sympathizers. Therefore, while American tactical blunders created immense popular hostility, it was the Vietcong’s superior guerrilla resilience and tunnel infrastructure that ultimately made them impossible to defeat.",
        examiner:
          'Level 4 (16+4 = 20/20 Marks): Nuanced, criteria-based evaluation; compares flawed US firepower against Vietcong tactical adaptability; demonstrates mastery of historical context.',
      },
      traps: [
        {
          title: 'Vietcong were NOT the North Vietnamese Army',
          desc: 'The Vietcong (National Liberation Front) were South Vietnamese communist guerrillas fighting in the south. The NVA (PAVN) were the regular army of communist North Vietnam.',
        },
        {
          title: 'Agent Orange was a DEFOLIANT, not a poison gas',
          desc: 'Agent Orange was a chemical herbicide designed to strip jungle foliage and expose guerrilla trails. Napalm was a sticky jellied petroleum incendiary bomb. Do not confuse them.',
        },
        {
          title: 'Search and Destroy measured SUCCESS BY BODY COUNT',
          desc: 'Unlike WWII, territory was not captured and held. US troops landed by helicopter, fought, counted dead enemy bodies, and evacuated, allowing the Vietcong to re-occupy the area immediately.',
        },
      ],
    },
    tracker: {
      sectionA: [
        {
          q: '1',
          type: 'Inference',
          topic: 'Source A: Ineffectiveness of US Aerial Bombing (Sheehan Report)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Explain Why',
          topic: 'Escalation of US Involvement under LBJ (1964–65)',
          page: 'P3',
          marks: 12,
        },
      ],
      sectionB: [
        {
          q: 'Dossier',
          type: 'Enquiry',
          topic: 'Dossier: Failure of US Military Tactics (Sources B, C & Ints 1, 2)',
          page: 'P4',
          marks: '-',
        },
        {
          q: '3 (a)',
          type: 'Utility',
          topic: 'Sources B & C: Failure of US Military Tactics in Vietnam',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Difference',
          topic: 'Interpretations 1 & 2: Main Difference on Why Tactics Failed',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (c)',
          type: 'Reason',
          topic: 'Interpretations 1 & 2: Reasons for Difference in Historical Views',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (d)',
          type: 'Essay',
          topic: 'Evaluative Essay: How Far Do You Agree with Interpretation 1?',
          page: 'P7–8',
          marks: 20,
        },
        {
          q: '4',
          type: 'Depth Booster',
          topic: 'Spec Depth: How Vietcong Launched the Tet Offensive (1968)',
          page: 'P9',
          marks: 12,
        },
      ],
      sectionC: [
        {
          q: 'Exemplars',
          type: 'Section A Models',
          topic: 'Full Level 2 Model Q1 & Level 4 Model Q2 Essay + Examiner Marks',
          page: 'P10',
          marks: 'Audit',
        },
        {
          q: 'Exemplars',
          type: 'Section B Models',
          topic: 'Full Level 3 Model Q3a, Q3b, Q3c & Level 4 Q3d Model + Top 3 Traps',
          page: 'P11',
          marks: 'Audit',
        },
      ],
    },
  },

  KT4: {
    id: 'KT4',
    number: '4',
    title: 'Key Topic 4: The End of the Vietnam War, 1968–75',
    shortTitle: 'The End of the Vietnam War, 1968–75',
    dates: '1968–1975',
    paperRef: '1HI0/33 (Paper 3: Modern Depth Study)',
    exam: {
      q1: {
        num: '1',
        stem: 'Give two things you can infer from Source A about the confrontation at Kent State University in May 1970.',
        marks: 4,
        sourceA: {
          image: 'kent-state-protests-1970.jpg',
          shelfmark:
            'Kent State University Libraries · Special Collections and Archives, May 4 Collection',
          title:
            'Source A: Ohio National Guard Confronting Anti-War Student Protesters at Kent State University, 4 May 1970',
          extract:
            'Armed Ohio National Guardsmen in military formation and gas masks deploy tear gas canisters against unarmed student demonstrators on the campus commons protesting President Nixon’s invasion of Cambodia. Minutes later, troops fired sixty-seven live rounds, killing four students.',
          provenance:
            'Contemporary news photograph documenting the confrontation between the Ohio National Guard and anti-war student demonstrators at Kent State University, 4 May 1970.',
        },
        lines: 10,
        inference1: {
          prompt: '(i) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
        inference2: {
          prompt: '(ii) What I can infer:',
          details: 'Details in the source that tell me this:',
        },
      },
      q2: {
        num: '2',
        stem: 'Explain why President Richard Nixon introduced the policy of Vietnamization in 1969.',
        marks: 12,
        stimulus: ['Rising US casualties', 'The impact of the Tet Offensive (1968)'],
        linesPage3: 20,
        linesPage4: 18,
        vocabBank: [
          '14,000+ US deaths in 1968',
          'Tet Offensive shattered victory claims',
          'Credibility gap exposed',
          'Walter Cronkite television verdict',
          'Nixon election pledge: "Peace with Honor"',
          'Build up ARVN combat strength',
          'Withdraw 500,000 US troops',
        ],
        connectives: [
          'A fundamental reason was...',
          'This was intensified by...',
          'Consequently, Nixon was forced to...',
          'Furthermore, ...',
          'This policy aimed to...',
        ],
        stages: {
          p1: 'Paragraph 1: Rising Casualties & Tet Trauma — Over 14,000 US combat deaths in 1968 shattered public faith in military victory.',
          p2: 'Paragraph 2: Political Pressure & Peace with Honor — Nixon was elected promising to end the draft and withdraw troops without appearing to surrender.',
          p3: 'Paragraph 3: Strengthening the ARVN (Own Knowledge) — Equipping South Vietnamese forces with modern aircraft and artillery so US soldiers could leave.',
        },
      },
      // Section B Enquiry Dossier
      dossier: {
        enquiry:
          'The Main Reason for the Growth of Opposition to the Vietnam War in the USA (1968–71)',
        sourceB: {
          shelfmark:
            'CBS News Broadcast Archives · The CBS Evening News with Walter Cronkite, 27 February 1968',
          title:
            'Source B: From a special television broadcast by CBS News anchor Walter Cronkite, 27 February 1968',
          extract:
            '"It seems now more certain than ever that the bloody experience of Vietnam is to end in a stalemate. To say that we are closer to victory today is to believe, in the face of the evidence, the optimists who have been wrong in the past. To suggest we are on the edge of defeat is to yield to unreasonable despair. To say that we are mired in stalemate seems the only realistic, yet unsatisfactory, conclusion. It is increasingly clear to this reporter that the only rational way out will be to negotiate, not as victors, but as an honorable people who lived up to their pledge to defend democracy and did the best they could."',
          provenance:
            'Broadcast to millions of American households by the nation’s most respected news anchor following his fact-finding mission to Vietnam after the Tet Offensive.',
        },
        sourceC: {
          shelfmark:
            'Wisconsin Historical Society · Social Action Collection, SDS Anti-Draft Leaflet Series',
          title:
            'Source C: From an anti-draft flyer distributed by Students for a Democratic Society (SDS) at university campuses, October 1969',
          extract:
            '"Rich young men with political connections go to prestigious colleges and receive student deferments. Working-class and Black youth who cannot afford university are handed M16 rifles and shipped off to die in the jungles for a corrupt dictatorship in Saigon. Over 35,000 American boys have already come home in aluminum coffins, while Washington politicians lie about ‘progress’. We refuse to participate in the slaughter of Vietnamese peasants. Burn your draft cards! Join the nationwide Moratorium on October 15! Strike against the war machine!"',
          provenance:
            'Protest pamphlet produced and circulated by the student anti-war organization Students for a Democratic Society (SDS) prior to the October 1969 Moratorium.',
        },
        int1: {
          author: "Historian Chester Pach, 'The Real Media War on Vietnam' (1996)",
          text: '"The fundamental engine driving mass opposition to the war was television journalism and the uncensored visual exposure of combat horrors. Vietnam was America’s first ‘living-room war’. Night after night, millions of ordinary Americans watched unedited color footage of wounded soldiers, burning huts, civilian body counts, and napalmed children alongside their evening dinners. When trusted national figures like Walter Cronkite declared the war unwinnable after the Tet Offensive, it shattered the government’s credibility. The media’s subsequent exposure of atrocities like the My Lai massacre in 1969 made it impossible for the moral conscience of middle America to support the war any longer."',
        },
        int2: {
          author:
            "Historian Melvin Small, 'Antiwarriors: The Vietnam War and the Battle for America’s Hearts and Minds' (2002)",
          text: '"While television coverage was vivid, the primary catalyst for mass domestic opposition was the personal, immediate threat posed by the military draft system combined with skyrocketing American casualties. Young men faced the terrifying prospect of conscription into an ambiguous conflict, producing a massive student rebellion across college campuses. Student organizations like SDS, energized by civil rights techniques, transformed anti-war sentiment into sustained street mobilization, draft-card burnings, and nationwide moratoriums involving millions of demonstrators. It was the visceral fear of the draft, coupled with the rising toll of over 50,000 American deaths, that galvanized grassroots resistance and made the war politically unsustainable."',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Study Sources B and C. How useful are Sources B and C for an enquiry into the main reason for the growth of opposition to the Vietnam War in the USA (1968–71)?',
        marks: 8,
        lines: 25,
        scaffold: {
          sourceB_focus:
            'Source B Utility (Content & COP): Illustrates the immense influence of televised news journalism; Cronkite declaring the war a stalemate destroyed the "credibility gap" and swayed middle-class opinion.',
          sourceC_focus:
            'Source C Utility (Content & COP): Illustrates the anger over the military draft system, class inequalities (deferments for rich students), rising body bags, and the direct action tactics of student groups like SDS.',
          ownKnowledge_focus:
            'Contextual Knowledge: Reference the Tet Offensive (1968), the My Lai Massacre revelations (Nov 1969), the Draft Lottery (Dec 1969), and the Kent State shootings (May 1970).',
        },
      },
      q3b: {
        num: '3 (b)',
        stem: 'Study Interpretations 1 and 2. They give different views about the main reason for the growth of opposition to the Vietnam War. What is the main difference between these views? Explain your answer, using details from both interpretations.',
        marks: 4,
        lines: 10,
        formula:
          'Interpretation 1 argues that anti-war opposition was primarily generated by uncensored television media coverage and news anchors like Walter Cronkite exposing combat horrors and atrocities (My Lai), whereas Interpretation 2 argues that opposition was driven primarily by the personal threat of the military draft, rising casualties, and campus student protests.',
      },
      q3c: {
        num: '3 (c)',
        stem: 'Suggest one reason why Interpretations 1 and 2 give different views about the main reason for the growth of opposition to the Vietnam War. You may use Sources B and C to help explain your answer.',
        marks: 4,
        lines: 10,
        formula:
          'The historians hold different views because they have examined different sources of evidence. The author of Interpretation 1 has focused on television broadcast history and media journalism such as Source B, showing how Cronkite’s commentary swayed middle America. In contrast, the author of Interpretation 2 has focused on youth resistance records and protest flyers such as Source C, emphasizing the direct fear of the draft, casualty rates, and student activism on university campuses.',
      },
      q3d: {
        num: '3 (d)',
        stem: 'How far do you agree with Interpretation 2 about the main reason for the growth of opposition to the Vietnam War in the USA (1968–71)?',
        marks: 20,
        subMarks: '16 marks for essay + 4 marks for SPaG',
        linesPage7: 26,
        linesPage8: 28,
        criteria: [
          'Media coverage & credibility gap (Living-room war, Walter Cronkite, My Lai massacre exposed in 1969)',
          'The draft & student protest (Conscription threat, draft card burnings, SDS, Kent State shootings 1970)',
          'Casualties & economic strain (58,000+ total US deaths, runaway inflation, veterans joining protests (VVAW))',
        ],
      },
    },
    depthBank: {
      alternateQ: {
        num: '4',
        type: 'Explain Why',
        stem: 'Explain why the Paris Peace Accords were signed in January 1973.',
        marks: 12,
        stimulus: [
          'Operation Linebacker (December 1972)',
          'Détente with the Soviet Union and China',
        ],
        lines: 22,
        vocabBank: [
          'Operation Linebacker II (Christmas Bombings)',
          '40,000 tons of bombs on Hanoi & Haiphong',
          'Nixon visit to Beijing (Feb 1972) & Moscow (May 1972)',
          'Henry Kissinger and Le Duc Tho talks',
          'Complete withdrawal of US troops in 60 days',
          'Return of all American POWs',
        ],
        planner: {
          p1: 'Superpower Diplomacy & Détente: Nixon’s diplomatic breakthroughs in Beijing and Moscow pressuring North Vietnam to negotiate.',
          p2: 'Operation Linebacker II: The devastating 11-day Christmas bombing forcing Hanoi back to the negotiating table.',
          p3: 'American Domestic Pressure (Own Knowledge): The US public’s absolute exhaustion with the war and congressional threats to cut funding.',
        },
      },
    },
    exemplars: {
      q1: {
        stem: 'Give two things you can infer from Source A about the confrontation at Kent State University in May 1970.',
        model:
          '(i) What I can infer: I can infer that the government deployed heavily armed, militarized forces onto university grounds to suppress anti-war protests.\nDetails in the source that tell me this: The photograph shows a large formation of Ohio National Guardsmen wearing gas masks and military uniforms marching in rank across the campus green.\n\n(ii) What I can infer: I can infer that the confrontation caused widespread panic and chaos across the university.\nDetails in the source that tell me this: Plumes of tear gas are billowing across the commons while unarmed students flee across the field in panic.',
        examiner:
          'Level 2 (4/4 Marks): Two valid, supported inferences extracted directly from the primary photograph.',
      },
      q2: {
        stem: 'Explain why President Richard Nixon introduced the policy of Vietnamization in 1969. (12 marks)',
        modelP1:
          'A primary reason for introducing Vietnamization was the unsustainable toll of American casualties combined with the psychological shock of the Tet Offensive in 1968. Over 14,000 American soldiers were killed in 1968 alone, bringing total US combat deaths past 30,000. The Tet Offensive thoroughly demolished the Johnson administration’s claims that victory was near, creating an irreparable ‘credibility gap’ in the minds of the American public. When CBS anchor Walter Cronkite declared the war mired in a bloody stalemate, public support for maintaining massive US troop deployments collapsed, convincing incoming President Nixon that the war had become politically unwinnable with American ground forces.',
        modelP2:
          'Furthermore, Nixon introduced Vietnamization to fulfill his central 1968 presidential election campaign promise of achieving "peace with honor." Nixon understood that immediate, unilateral withdrawal would be seen as an ignominious defeat, damaging America’s Cold War credibility and leading to the immediate communist takeover of South Vietnam. Vietnamization was designed as a strategic compromise: it allowed Nixon to systematically de-escalate domestic anti-war fury by withdrawing American conscripts, while transferring ground combat responsibilities to the South Vietnamese army (ARVN) so the US did not appear to be surrendering.',
        modelP3:
          'Finally, Vietnamization was made feasible by a massive program to re-equip and modernize the ARVN into a self-sufficient fighting force. The United States poured billions of dollars of modern military hardware into South Vietnam, providing over one million M16 rifles, armored vehicles, heavy artillery, and the world’s fourth-largest air force. Between 1969 and 1972, Nixon withdrew over 500,000 American troops while relying heavily on US air power to support ARVN ground operations. This enabled Nixon to dramatically reduce US casualties while maintaining military pressure on North Vietnam during peace negotiations in Paris.',
        examiner:
          'Level 4 (12/12 Marks): Outstanding causal analysis; explores casualties/Tet, Nixon’s domestic political strategy, and ARVN modernization; rich factual detail and sophisticated historical terminology.',
      },
      q3a: {
        stem: 'How useful are Sources B and C for an enquiry into the main reason for the growth of opposition to the Vietnam War in the USA (1968–71)? (8 marks)',
        model:
          'Source B is exceptionally useful because it provides direct evidence of how influential national television journalists helped turn middle-class public opinion against the war. Walter Cronkite was universally regarded as "the most trusted man in America." When he broadcast his personal verdict on 27 February 1968 stating that the war was "mired in stalemate" and that negotiation was the only rational exit, it dealt a catastrophic blow to government claims of military progress. The utility of Source B lies in its massive national reach: President Johnson famously remarked, "If I’ve lost Cronkite, I’ve lost middle America." This demonstrates how televised editorial commentary legitimized anti-war views among ordinary, previously patriotic citizens.\n\nSource C is equally useful because it offers direct insight into the intense grievances driving the youth and student anti-war movement. Circulated by Students for a Democratic Society (SDS) in October 1969, the leaflet reveals how the military draft was viewed as deeply discriminatory, forcing working-class and Black youth to die in "aluminum coffins" while wealthy students secured college deferments. The provenance makes it particularly valuable: as an authentic organizing pamphlet for the historic nationwide Moratorium of October 1969 (which mobilized over two million protesters), it shows how student radicals actively channeled fear of conscription into civil disobedience and draft-card burnings. When contextualized alongside the horrific revelations of the My Lai massacre in November 1969 and the Kent State shootings in May 1970, both sources are highly useful: Source B shows how television destroyed government credibility for middle America, while Source C demonstrates how the threat of the draft radicalized American youth.',
        examiner:
          'Level 3 (8/8 Marks): Exceptional evaluation of both sources; analyzes media influence vs the military draft; thoroughly investigates nature, origin, purpose, and detailed contextual knowledge.',
      },
      q3bc: {
        q3bModel:
          'The main difference is that Interpretation 1 views the growth of anti-war opposition as primarily driven by television journalism and visual media exposure of combat atrocities (such as Walter Cronkite’s broadcast and the My Lai massacre), whereas Interpretation 2 argues that opposition was primarily fueled by the personal, immediate threat of the military draft system, rising US casualties, and direct student activism on university campuses.',
        q3bExaminer:
          'Level 2 (4/4 Marks): Clear, direct contrast between media-driven and draft/casualty-driven arguments with specific supporting details from both extracts.',
        q3cModel:
          'Interpretations 1 and 2 give different views because the historians have investigated different dimensions of the anti-war movement. The author of Interpretation 1 has focused on television network archives and media reception studies like Source B, analyzing how broadcast coverage of combat created a credibility gap for middle-class Americans. In contrast, the author of Interpretation 2 has examined university archives, protest leaflets like Source C, and draft resistance statistics, focusing on how conscription and rising body counts mobilized American college youth.',
        q3cExaminer:
          'Level 2 (4/4 Marks): Fully developed explanation connecting differing historical viewpoints to differing evidence types and historical focuses.',
      },
      q3d: {
        stem: 'How far do you agree with Interpretation 2 about the main reason for the growth of opposition to the Vietnam War in the USA (1968–71)? (16+4 marks)',
        modelExtract:
          "In conclusion, I agree with Interpretation 2 to a very large extent, because the personal, visceral threat posed by the military draft system and escalating American casualties was the primary engine that mobilized millions of Americans into sustained street protest. Conscription forced millions of young American men to confront the terrifying reality that they could be legally compelled to fight and die in an ambiguous foreign conflict. As seen in Source C, the draft was deeply unequal, offering deferments to wealthy college students while sending working-class and Black youth to die in 'aluminum coffins'. Combined with the grim toll of over 50,000 American deaths, this personal fear transformed passive unease into militant student strikes, draft-card burnings, and massive demonstrations like the 1969 Moratorium. When the Ohio National Guard killed four unarmed students at Kent State in 1970, it triggered strikes across 400 campuses. While Interpretation 1 correctly argues that uncensored television coverage and Walter Cronkite’s post-Tet verdict shattered government credibility, television alone could not have generated such militant mass resistance without the direct threat of conscription and body bags. Therefore, while television exposed the horrors of war, the draft and casualties made the conflict intolerable.",
        examiner:
          'Level 4 (16+4 = 20/20 Marks): Authoritative evaluative essay; establishes clear criteria comparing media exposure against conscription and casualties; demonstrates profound mastery of the Edexcel specification.',
      },
      traps: [
        {
          title: 'Vietnamization was NOT an immediate withdrawal',
          desc: 'Nixon withdrew US ground combat troops gradually over 4 years (1969–73) while vastly INCREASING aerial bombing (Operation Linebacker) and invading Cambodia and Laos.',
        },
        {
          title: 'The Draft was NOT equal across social classes',
          desc: 'Until the 1969 draft lottery, wealthy and middle-class youths received college deferments, meaning working-class and Black Americans were disproportionately drafted and killed.',
        },
        {
          title: 'Kent State occurred because of the CAMBODIA invasion',
          desc: 'The May 1970 Kent State protests were specifically triggered by President Nixon’s surprise television announcement that US forces had invaded neighboring Cambodia.',
        },
      ],
    },
    tracker: {
      sectionA: [
        {
          q: '1',
          type: 'Inference',
          topic: 'Source A: The Kent State University Shootings (May 1970)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Explain Why',
          topic: 'Why Nixon Introduced Vietnamization in 1969',
          page: 'P3',
          marks: 12,
        },
      ],
      sectionB: [
        {
          q: 'Dossier',
          type: 'Enquiry',
          topic: 'Dossier: Growth of Anti-War Opposition (Sources B, C & Ints 1, 2)',
          page: 'P4',
          marks: '-',
        },
        {
          q: '3 (a)',
          type: 'Utility',
          topic: 'Sources B & C: Reasons for Growth of Anti-War Opposition',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Difference',
          topic: 'Interpretations 1 & 2: Main Difference in Views on Anti-War Movement',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (c)',
          type: 'Reason',
          topic: 'Interpretations 1 & 2: Reasons for Difference in Historical Views',
          page: 'P6',
          marks: 4,
        },
        {
          q: '3 (d)',
          type: 'Essay',
          topic: 'Evaluative Essay: How Far Do You Agree with Interpretation 1?',
          page: 'P7–8',
          marks: 20,
        },
        {
          q: '4',
          type: 'Depth Booster',
          topic: 'Spec Depth: Why the Paris Peace Accords Were Signed (1973)',
          page: 'P9',
          marks: 12,
        },
      ],
      sectionC: [
        {
          q: 'Exemplars',
          type: 'Section A Models',
          topic: 'Full Level 2 Model Q1 & Level 4 Model Q2 Essay + Examiner Marks',
          page: 'P10',
          marks: 'Audit',
        },
        {
          q: 'Exemplars',
          type: 'Section B Models',
          topic: 'Full Level 3 Model Q3a, Q3b, Q3c & Level 4 Q3d Model + Top 3 Traps',
          page: 'P11',
          marks: 'Audit',
        },
      ],
    },
  },
};

// =============================================================================
// CSS STYLING: REFINED ARCHIVAL PRINT MASTERPIECE (EXACT ZERO-OVERFLOW FIT)
// =============================================================================
const COMMON_CSS = `
  @page {
    size: A4 portrait;
    margin: 10mm 12mm;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    background: #fff;
    font-size: 8.5pt;
    line-height: 1.35;
  }
  .page {
    page-break-after: always;
    height: 277mm;
    max-height: 277mm;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }
  .page:last-child {
    page-break-after: avoid;
  }

  /* Cover Page Styles */
  .cover-warning {
    border: 2px solid #000;
    padding: 4px 8px;
    font-size: 7.5pt;
    font-weight: 700;
    text-align: center;
    margin-bottom: 8px;
    background: #f8fafc;
  }
  .candidate-box {
    border: 1.5px solid #334155;
    padding: 6px 10px;
    margin-bottom: 8px;
    background: #f8fafc;
    border-radius: 4px;
  }
  .candidate-row {
    display: flex;
    gap: 12px;
    margin-bottom: 4px;
  }
  .candidate-row:last-child {
    margin-bottom: 0;
  }
  .field-label {
    font-size: 7.2pt;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .field-input {
    border: 1.5px solid #666;
    border-radius: 4px;
    height: 24px;
    background: #fff;
  }
  .char-cell {
    border: 1.5px solid #666;
    border-radius: 4px;
    height: 24px;
    width: 20px;
    display: inline-block;
    background: #fff;
    margin-right: 2px;
  }
  .edexcel-banner {
    font-size: 15pt;
    font-weight: 800;
    margin: 6px 0 4px 0;
    letter-spacing: -0.3px;
    color: #0f172a;
  }
  .exam-header-box {
    border: 2px solid #0f172a;
    border-radius: 6px;
    padding: 8px 12px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }
  .exam-header-left {
    flex: 1;
  }
  .exam-date {
    font-size: 7.8pt;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
  }
  .exam-time {
    font-size: 7.8pt;
    color: #334155;
    margin-bottom: 3px;
  }
  .exam-subject {
    font-size: 16pt;
    font-weight: 800;
    line-height: 1.1;
    margin: 2px 0;
    color: #0f172a;
  }
  .exam-booklet {
    font-size: 9.5pt;
    font-weight: 700;
    color: #1e293b;
  }
  .exam-subtopic {
    font-size: 8.5pt;
    color: #475569;
    margin-top: 1px;
  }
  .exam-header-right {
    text-align: right;
    padding-left: 12px;
    border-left: 1.5px solid #cbd5e1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ref-label {
    font-size: 7.2pt;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
  }
  .ref-val {
    font-size: 13pt;
    font-weight: 800;
    color: #0f172a;
  }
  .must-have-row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }
  .must-have-box {
    border: 1.5px solid #475569;
    border-radius: 4px;
    padding: 6px 10px;
    flex: 1;
    font-size: 8pt;
    line-height: 1.3;
    background: #fff;
  }
  .marks-box {
    border: 1.5px solid #0f172a;
    border-radius: 4px;
    width: 85px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 8pt;
    font-weight: 700;
    background: #f8fafc;
  }
  .marks-number {
    font-size: 15pt;
    font-weight: 800;
    color: #0f172a;
  }
  .exam-notice-strip {
    border: 1.5px solid #64748b;
    border-radius: 4px;
    background: #f8fafc;
    padding: 5px 8px;
    font-size: 7.6pt;
    line-height: 1.3;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
  .exam-notice-strip > div {
    flex: 1;
  }
  .exam-notice-strip strong {
    color: #0f172a;
  }

  /* Cover Tracker Table */
  .tracker-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.2pt;
  }
  .tracker-table th, .tracker-table td {
    border: 1px solid #94a3b8;
    padding: 3px 5px;
    vertical-align: middle;
  }
  .tracker-table th {
    background: #0f172a;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 7pt;
    letter-spacing: 0.2px;
  }
  .tracker-section-hdr td {
    background: #e2e8f0;
    font-weight: 800;
    color: #0f172a;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    padding: 2.5px 5px;
  }
  .tracker-row td {
    background: #fff;
  }
  .tracker-row:nth-child(even) td {
    background: #f8fafc;
  }
  .tracker-box {
    width: 10px;
    height: 10px;
    border: 1.5px solid #475569;
    border-radius: 2px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 2px;
    background: #fff;
  }
  .score-cell {
    font-weight: 700;
    color: #0f172a;
    text-align: center;
    white-space: nowrap;
    width: 55px;
  }
  .marks-cell {
    font-weight: 600;
    color: #334155;
    text-align: center;
    width: 40px;
  }
  .page-cell {
    font-weight: 700;
    color: #1e3a8a;
    text-align: center;
    width: 38px;
  }
  .type-tag {
    font-size: 6.8pt;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
  }
  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 7.2pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 3px;
    margin-top: 3px;
  }
  .turn-over {
    font-weight: 700;
    font-size: 8pt;
    color: #000;
  }

  /* Inner Pages */
  .page-header {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 3px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h2 {
    margin: 0;
    font-size: 10pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .header-left p {
    margin: 1px 0 0 0;
    font-size: 7.4pt;
    color: #475569;
  }
  .header-tag {
    font-size: 6.8pt;
    font-weight: 700;
    background: #0f172a;
    color: #fff;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .question-container {
    margin-bottom: 5px;
  }
  .question-prompt {
    font-size: 10pt;
    font-weight: 700;
    color: #000;
    line-height: 1.28;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .q-num {
    font-weight: 800;
    margin-right: 5px;
  }
  .q-marks {
    font-size: 9.5pt;
    font-weight: 700;
    color: #334155;
    margin-left: 8px;
    white-space: nowrap;
  }
  .stimulus-card {
    border: 1.5px solid #64748b;
    border-radius: 4px;
    padding: 5px 8px;
    font-size: 8pt;
    background: #f8fafc;
    margin-bottom: 5px;
    line-height: 1.25;
  }
  .stimulus-card ul {
    margin: 1px 0 0 0;
    padding-left: 16px;
  }

  /* Authentic Pearson Edexcel GCSE Exam Ruled Lines (8mm line spacing - Photocopier & Duplex Safe) */
  .dotted-line {
    border-bottom: 1.2px solid #475569;
    height: 8mm;
    width: 100%;
    box-sizing: border-box;
  }

  /* Scaffolding Containers */
  .scaffold-bar {
    border: 1.5px solid #475569;
    border-radius: 4px;
    background: #f8fafc;
    padding: 4px 7px;
    margin-bottom: 5px;
    font-size: 7pt;
    line-height: 1.25;
    display: flex;
    gap: 6px;
  }
  .scaffold-col {
    border-right: 1px solid #cbd5e1;
    padding-right: 5px;
  }
  .scaffold-col:last-child {
    border-right: none;
    padding-right: 0;
  }
  .scaffold-label {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 6.5pt;
    color: #0f172a;
    margin-bottom: 1px;
    display: block;
    letter-spacing: 0.2px;
  }
  .scaffold-content {
    color: #334155;
  }
  .scaffold-pill {
    display: inline-block;
    background: #fff;
    border: 1px solid #94a3b8;
    border-radius: 3px;
    padding: 1px 3px;
    margin: 1px 2px 1px 0;
    font-size: 6.5pt;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
  }

  /* Archival Source Box Standards */
  .archival-source-box {
    border: 1.5px solid #334155;
    border-radius: 4px;
    background: #fdfcf9;
    padding: 5px 8px;
    margin-bottom: 5px;
    position: relative;
  }
  .archival-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 3px;
  }
  .archival-title {
    font-family: Georgia, serif;
    font-size: 8.5pt;
    font-weight: 700;
    color: #0f172a;
  }
  .archival-shelfmark {
    font-size: 6.2pt;
    font-family: monospace;
    color: #475569;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 2px;
    padding: 1px 4px;
    white-space: nowrap;
  }
  .archival-body {
    font-family: Georgia, serif;
    font-size: 7.5pt;
    line-height: 1.35;
    color: #1e293b;
    margin-bottom: 3px;
  }
  .archival-footer {
    border-top: 1px dashed #cbd5e1;
    padding-top: 2px;
    font-size: 6.8pt;
    color: #64748b;
    font-style: italic;
  }

  /* Inference Scaffolding Cards */
  .inference-grid {
    display: flex;
    gap: 6px;
    margin-bottom: 5px;
  }
  .inference-card {
    flex: 1;
    border: 1.5px solid #475569;
    border-radius: 4px;
    background: #f8fafc;
    padding: 4px 6px;
    font-size: 7.2pt;
  }
  .inference-card strong {
    color: #0f172a;
    display: block;
    margin-bottom: 2px;
    font-size: 7pt;
    text-transform: uppercase;
  }
  .inference-row {
    border-bottom: 1.2px solid #475569;
    height: 18px;
    margin-top: 2px;
  }

  /* Dossier Grid Layout (Page 5) */
  .dossier-banner {
    background: #0f172a;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 800;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dossier-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-bottom: 4px;
  }

  /* Criteria Evaluation Matrix (Page 8) */
  .matrix-grid {
    display: grid;
    grid-template-columns: 1.2fr 1.2fr 1fr;
    gap: 6px;
    border: 1.5px solid #475569;
    border-radius: 4px;
    background: #f8fafc;
    padding: 4px 6px;
    margin-bottom: 5px;
    font-size: 7pt;
  }
  .matrix-col {
    border-right: 1px solid #cbd5e1;
    padding-right: 5px;
  }
  .matrix-col:last-child {
    border-right: none;
    padding-right: 0;
  }

  /* Exemplars & Examiner Standards (Pages 11–12) */
  .exemplar-box {
    border: 1.5px solid #1e3a8a;
    border-radius: 4px;
    background: #f8fafc;
    padding: 5px 8px;
    margin-bottom: 5px;
  }
  .exemplar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 3px;
  }
  .exemplar-title {
    font-size: 8pt;
    font-weight: 800;
    color: #1e3a8a;
    text-transform: uppercase;
  }
  .exemplar-grade {
    font-size: 7pt;
    font-weight: 700;
    background: #15803d;
    color: #fff;
    padding: 1px 5px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  .exemplar-stem {
    font-size: 7.2pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
  }
  .exemplar-text {
    font-size: 7.2pt;
    line-height: 1.32;
    color: #1e293b;
    margin-bottom: 3px;
  }
  .examiner-note {
    border-top: 1px dashed #94a3b8;
    padding-top: 2px;
    font-size: 6.8pt;
    color: #0f766e;
    font-style: italic;
    background: #f0fdf4;
    padding: 2px 5px;
    border-radius: 2px;
  }

  /* Traps Grid */
  .traps-card {
    border: 1.5px solid #dc2626;
    border-radius: 4px;
    background: #fef2f2;
    padding: 5px 7px;
    margin-top: 4px;
  }
  .traps-header {
    font-size: 7.8pt;
    font-weight: 800;
    color: #991b1b;
    text-transform: uppercase;
    border-bottom: 1px solid #fca5a5;
    padding-bottom: 2px;
    margin-bottom: 3px;
  }
  .traps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
  }
  .trap-item {
    background: #fff;
    border: 1px solid #fca5a5;
    border-radius: 3px;
    padding: 3px 5px;
    font-size: 6.8pt;
    line-height: 1.22;
  }
  .trap-item strong {
    color: #991b1b;
    display: block;
    margin-bottom: 1px;
  }
  .trap-item span {
    color: #7f1d1d;
  }

  .page-footer {
    font-size: 7pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

// Helper to render ruled dotted lines
function renderLines(count) {
  let lines = '';
  for (let i = 0; i < count; i++) {
    lines += '<div class="dotted-line"></div>\n';
  }
  return lines;
}

// =============================================================================
// HTML RENDERER: 12-PAGE PER-KEY-TOPIC MASTER BOOKLET
// =============================================================================
function renderBookletHtml(ktKey, meta) {
  const e = meta.exam;
  const d = meta.depthBank;
  const x = meta.exemplars;

  // Resolve base64 image for Source A
  let sourceAImgTag = '';
  if (e.q1.sourceA.image) {
    const imgFile = path.join(
      ROOT_DIR,
      'public',
      'units',
      'usa',
      'assets',
      'sources',
      e.q1.sourceA.image,
    );
    if (fs.existsSync(imgFile)) {
      const b64 = fs.readFileSync(imgFile).toString('base64');
      sourceAImgTag = `<div style="flex-shrink: 0; width: 140px; height: 105px; background: #000; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid #94a3b8; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
          <img src="data:image/jpeg;base64,${b64}" alt="Source A" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>`;
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${meta.title} — Pearson Edexcel GCSE (9–1) Exam Practice Pack</title>
    <style>${COMMON_CSS}</style>
</head>
<body>

    <!-- ============================================================= -->
    <!-- PAGE 1: AUTHENTIC PEARSON EDEXCEL EXAMINATION COVER           -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="cover-warning">
                Please check the examination details below before entering your candidate information
            </div>

            <!-- Candidate Information Box -->
            <div class="candidate-box">
                <div class="candidate-row">
                    <div style="flex: 2;">
                        <div class="field-label">Candidate surname</div>
                        <div class="field-input"></div>
                    </div>
                    <div style="flex: 1.5;">
                        <div class="field-label">Other names</div>
                        <div class="field-input"></div>
                    </div>
                </div>
                <div class="candidate-row">
                    <div style="flex: 1;">
                        <div class="field-label">Centre Number</div>
                        <div>
                            <span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="field-label">Candidate Number</div>
                        <div>
                            <span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edexcel-banner">Pearson Edexcel GCSE (9–1)</div>

            <!-- Exam Header Box -->
            <div class="exam-header-box">
                <div class="exam-header-left">
                    <div class="exam-date">History · Paper 3: Modern Depth Study</div>
                    <div class="exam-time">Time: 1 hour 20 minutes (Complete Mock) · 52 Marks (+4 SPaG)</div>
                    <div class="exam-subject">Option 33: Conflict at Home and Abroad: the USA, 1954–75</div>
                    <div class="exam-booklet">${meta.title}</div>
                    <div class="exam-subtopic">Comprehensive 11-Page Specification Practice Pack · ${meta.dates}</div>
                </div>
                <div class="exam-header-right">
                    <div class="ref-label">Paper<br>reference</div>
                    <div class="ref-val">1HI0/33</div>
                </div>
            </div>

            <!-- Materials Required / Marks Summary -->
            <div class="must-have-row">
                <div class="must-have-box">
                    <strong>Instructions:</strong> Use black ink or ball-point pen. Fill in candidate details above.<br>
                    • Answer ALL questions in Section A (Question 1 and Question 2).<br>
                    • Answer ALL questions in Section B (Question 3(a), 3(b), 3(c), and 3(d)).<br>
                    • Read the Section B Historical Enquiry Dossier carefully on Page 5 before attempting Questions 3(a)–(d).
                </div>
                <div class="marks-box">
                    <span style="font-size: 7pt; text-transform: uppercase; color: #475569;">Total Marks</span>
                    <span class="marks-number">56</span>
                    <span style="font-size: 6.5pt; color: #64748b;">(52 + 4 SPaG)</span>
                </div>
            </div>

            <div class="exam-notice-strip">
                <div><strong>Advice:</strong> Spend approx. 15 minutes on Section A Q1–Q2, and 60 minutes on Section B Q3(a)–(d).</div>
                <div><strong>SPaG:</strong> 4 marks are awarded for spelling, punctuation, grammar, and specialist terms on Q3(d).</div>
            </div>

            <!-- Spec-Mapped Question & Mark Tracker -->
            <div class="tracker-container">
                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 32px;">Q</th>
                            <th style="width: 80px;">Type</th>
                            <th>Specification Topic Focus</th>
                            <th style="width: 38px;">Page</th>
                            <th style="width: 40px;">Marks</th>
                            <th style="width: 55px;">Audit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- SECTION A -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">SECTION A: TIMED EXAM PAPER (Compulsory Question 1 &amp; Question 2)</td>
                        </tr>
                        ${meta.tracker.sectionA
                          .map(
                            (item) => `
                        <tr class="tracker-row">
                            <td><strong>Q${item.q}</strong></td>
                            <td><span class="type-tag">${item.type}</span></td>
                            <td>${item.topic}</td>
                            <td class="page-cell">${item.page}</td>
                            <td class="marks-cell">[${item.marks}]</td>
                            <td class="score-cell"><span class="tracker-box"></span> / ${item.marks}</td>
                        </tr>
                        `,
                          )
                          .join('')}

                        <!-- SECTION B -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">SECTION B: HISTORICAL ENQUIRY &amp; INTERPRETATIONS (Integrated 36m + 4 SPaG)</td>
                        </tr>
                        ${meta.tracker.sectionB
                          .map(
                            (item) => `
                        <tr class="tracker-row">
                            <td><strong>${item.q}</strong></td>
                            <td><span class="type-tag">${item.type}</span></td>
                            <td>${item.topic}</td>
                            <td class="page-cell">${item.page}</td>
                            <td class="marks-cell">${item.marks === '-' ? 'Dossier' : '[' + item.marks + ']'}</td>
                            <td class="score-cell"><span class="tracker-box"></span> / ${item.marks === '-' ? 'Read' : item.marks}</td>
                        </tr>
                        `,
                          )
                          .join('')}

                        <!-- SECTION C -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">SECTION C: GRADE 8/9 STANDARDS &amp; EXAM TRAPS (Self &amp; Peer Assessment)</td>
                        </tr>
                        ${meta.tracker.sectionC
                          .map(
                            (item) => `
                        <tr class="tracker-row">
                            <td><strong>${item.q}</strong></td>
                            <td><span class="type-tag">${item.type}</span></td>
                            <td>${item.topic}</td>
                            <td class="page-cell">${item.page}</td>
                            <td class="marks-cell">Audit</td>
                            <td class="score-cell"><span class="tracker-box"></span> Verified</td>
                        </tr>
                        `,
                          )
                          .join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="cover-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Paper 3: Option 33 Conflict at Home and Abroad: the USA, 1954–75</span>
            <span class="turn-over">Turn over for Section A &#9654;</span>
            <span>Page 1 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 2: SECTION A — QUESTION 1: SOURCE INFERENCE [4 MARKS]    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 1</h2>
                    <p>Spend approx. 5 minutes on Question 1. Answer both parts (i) and (ii).</p>
                </div>
                <span class="header-tag">Q1: Source Inference [4m]</span>
            </div>

            <!-- Archival Visual Source A Box -->
            <div class="archival-source-box" style="margin-bottom: 8px; padding: 7px 10px;">
                <div class="archival-header" style="margin-bottom: 5px; padding-bottom: 3px;">
                    <span class="archival-title" style="font-size: 8.2pt;">${e.q1.sourceA.title}</span>
                    <span class="archival-shelfmark" style="font-size: 6.2pt;">${e.q1.sourceA.shelfmark}</span>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    ${sourceAImgTag}
                    <div style="flex: 1;">
                        <div class="archival-body" style="font-size: 7.2pt; line-height: 1.35; margin-bottom: 3px;">
                            ${e.q1.sourceA.extract
                              .split('\n')
                              .map((line) => `<p style="margin: 0 0 2px 0;">${line}</p>`)
                              .join('')}
                        </div>
                        <div class="archival-footer" style="font-size: 6.5pt; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 2px;">
                            <strong>Provenance:</strong> ${e.q1.sourceA.provenance}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 1 Prompt -->
            <div class="question-container">
                <div class="question-prompt" style="margin-bottom: 5px;">
                    <span><strong class="q-num">1</strong> ${e.q1.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>

                <!-- Structured Inference Scaffolding Grid -->
                <div class="inference-grid" style="margin-bottom: 6px;">
                    <div class="inference-card" style="padding: 5px 8px;">
                        <strong>(i) Inference 1:</strong>
                        <div style="font-size: 6.8pt; color: #475569; margin-bottom: 2px;">What I can infer from Source A:</div>
                        <div class="inference-row"></div>
                        <div style="font-size: 6.8pt; color: #475569; margin: 3px 0 2px 0;">Details in the source that tell me this:</div>
                        <div class="inference-row"></div>
                    </div>
                    <div class="inference-card" style="padding: 5px 8px;">
                        <strong>(ii) Inference 2:</strong>
                        <div style="font-size: 6.8pt; color: #475569; margin-bottom: 2px;">What I can infer from Source A:</div>
                        <div class="inference-row"></div>
                        <div style="font-size: 6.8pt; color: #475569; margin: 3px 0 2px 0;">Details in the source that tell me this:</div>
                        <div class="inference-row"></div>
                    </div>
                </div>

                <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin: 5px 0 2px 0;">Candidate Response Lines:</div>
                ${renderLines(e.q1.lines || 6)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · ${meta.shortTitle}</span>
            <span class="turn-over">Turn over for Question 2 &#9654;</span>
            <span>Page 2 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 3: SECTION A — QUESTION 2: EXPLAIN WHY [12 MARKS]        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 2</h2>
                    <p>Spend approx. 15 minutes on Question 2. Construct three developed causal paragraphs.</p>
                </div>
                <span class="header-tag">Q2: Causation Essay [12m]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt" style="margin-bottom: 4px;">
                    <span><strong class="q-num">2</strong> ${e.q2.stem}</span>
                    <span class="q-marks">(12)</span>
                </div>

                <!-- Stimulus Box -->
                <div class="stimulus-card" style="margin-bottom: 4px; padding: 4px 8px; font-size: 7pt;">
                    You may use the following in your answer:
                    <ul style="margin: 2px 0; padding-left: 18px;">
                        <li><strong>${e.q2.stimulus[0]}</strong></li>
                        <li><strong>${e.q2.stimulus[1]}</strong></li>
                    </ul>
                    <span style="display: block; margin-top: 1px; font-style: italic; color: #475569;">(You must also use information of your own.)</span>
                </div>

                <!-- Causal Architecture Planner -->
                <div class="scaffold-bar" style="margin-bottom: 4px; padding: 3px 6px;">
                    <div class="scaffold-col" style="flex: 1.4;">
                        <span class="scaffold-label">Fact Bank:</span>
                        <div class="scaffold-content">${e.q2.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.1;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${e.q2.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                </div>

                <!-- Consecutive Paragraph Focus Prompts -->
                <div style="display: flex; flex-direction: column; gap: 3px; margin-bottom: 5px;">
                    <div style="border: 1px solid #cbd5e1; border-radius: 3px; background: #f8fafc; padding: 3px 6px; font-size: 6.8pt; color: #334155;">
                        <strong>Paragraph 1 Focus:</strong> ${e.q2.stages.p1}
                    </div>
                    <div style="border: 1px solid #cbd5e1; border-radius: 3px; background: #f8fafc; padding: 3px 6px; font-size: 6.8pt; color: #334155;">
                        <strong>Paragraph 2 Focus:</strong> ${e.q2.stages.p2}
                    </div>
                </div>

                <!-- Candidate Response Lines -->
                <div style="font-size: 7pt; font-weight: 700; color: #0f172a; margin: 4px 0 2px 0;">Candidate Response Lines:</div>
                ${renderLines(e.q2.linesPage3 || 14)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · Section A (Question 2 continues)</span>
            <span class="turn-over">Question 2 continues on next page &#9654;</span>
            <span>Page 3 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 4: SECTION A — QUESTION 2: EXPLAIN WHY (PART 2)          -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 2 (Continued)</h2>
                    <p>Complete your causation essay with a developed third paragraph and criteria evaluation.</p>
                </div>
                <span class="header-tag">Q2: Developed Causation</span>
            </div>

            <div class="question-container">
                <!-- Compulsory Own Knowledge Focus -->
                <div style="border: 1.5px solid #1e3a8a; border-radius: 4px; background: #eff6ff; padding: 4px 8px; margin-bottom: 6px; font-size: 7pt; color: #1e3a8a; display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>Paragraph 3 Focus (Compulsory Own Knowledge):</strong> ${e.q2.stages.p3}</span>
                    <span style="font-weight: 800; text-transform: uppercase; font-size: 6.5pt; background: #1e3a8a; color: #fff; padding: 1.5px 5px; border-radius: 3px;">Spec Guarantee</span>
                </div>

                <!-- Candidate Response Lines -->
                ${renderLines(e.q2.linesPage4 || 24)}

                <!-- Pearson Edexcel Level 4 Criteria Checklist -->
                <div style="border: 1.5px solid #64748b; border-radius: 4px; background: #f8fafc; padding: 4px 8px; margin-top: 6px; font-size: 6.8pt; line-height: 1.25;">
                    <div style="font-weight: 800; text-transform: uppercase; color: #0f172a; margin-bottom: 2px;">
                        Pearson Edexcel Level 4 Criteria Checklist [10–12 Marks]:
                    </div>
                    <div style="color: #334155; display: flex; gap: 10px;">
                        <div><span class="tracker-box"></span> 3 Developed Causal Factors</div>
                        <div><span class="tracker-box"></span> Beyond Stimulus Own Fact</div>
                        <div><span class="tracker-box"></span> Explicit Connectives</div>
                        <div><span class="tracker-box"></span> Sustained Analytical Focus</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · End of Section A (16 Marks Total)</span>
            <span class="turn-over">Turn over for Section B Enquiry Dossier &#9654;</span>
            <span>Page 4 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 5: SECTION B — HISTORICAL ENQUIRY DOSSIER (SOURCES & INTS) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Historical Enquiry Dossier</h2>
                    <p>Read this archival dossier carefully. All questions in Section B (Questions 3a–3d) relate to these materials.</p>
                </div>
                <span class="header-tag" style="background: #1e3a8a;">Section B Dossier</span>
            </div>

            <!-- Enquiry Banner -->
            <div class="dossier-banner">
                <span>Historical Enquiry Focus: ${e.dossier.enquiry}</span>
                <span style="font-size: 7pt; font-weight: 600;">Paper 3 · Section B</span>
            </div>

            <!-- 2x2 Archival Grid -->
            <div class="dossier-grid">
                <!-- Source B -->
                <div class="archival-source-box" style="margin-bottom: 0;">
                    <div class="archival-header">
                        <span class="archival-title">${e.dossier.sourceB.title}</span>
                        <span class="archival-shelfmark">${e.dossier.sourceB.shelfmark.split('·')[0]}</span>
                    </div>
                    <div class="archival-body">
                        ${e.dossier.sourceB.extract}
                    </div>
                    <div class="archival-footer">
                        <strong>Provenance:</strong> ${e.dossier.sourceB.provenance}
                    </div>
                </div>

                <!-- Source C -->
                <div class="archival-source-box" style="margin-bottom: 0;">
                    <div class="archival-header">
                        <span class="archival-title">${e.dossier.sourceC.title}</span>
                        <span class="archival-shelfmark">${e.dossier.sourceC.shelfmark.split('·')[0]}</span>
                    </div>
                    <div class="archival-body">
                        ${e.dossier.sourceC.extract}
                    </div>
                    <div class="archival-footer">
                        <strong>Provenance:</strong> ${e.dossier.sourceC.provenance}
                    </div>
                </div>

                <!-- Interpretation 1 -->
                <div class="archival-source-box" style="margin-bottom: 0; background: #f8fafc; border-color: #475569;">
                    <div class="archival-header">
                        <span class="archival-title" style="color: #1e3a8a;">Interpretation 1</span>
                        <span class="archival-shelfmark">HISTORIOGRAPHY</span>
                    </div>
                    <div class="archival-body" style="font-size: 7.2pt;">
                        <div style="font-weight: 700; color: #0f172a; margin-bottom: 2px;">From ${e.dossier.int1.author}:</div>
                        ${e.dossier.int1.text}
                    </div>
                </div>

                <!-- Interpretation 2 -->
                <div class="archival-source-box" style="margin-bottom: 0; background: #f8fafc; border-color: #475569;">
                    <div class="archival-header">
                        <span class="archival-title" style="color: #1e3a8a;">Interpretation 2</span>
                        <span class="archival-shelfmark">HISTORIOGRAPHY</span>
                    </div>
                    <div class="archival-body" style="font-size: 7.2pt;">
                        <div style="font-weight: 700; color: #0f172a; margin-bottom: 2px;">From ${e.dossier.int2.author}:</div>
                        ${e.dossier.int2.text}
                    </div>
                </div>
            </div>

            <!-- Reading Guide Banner -->
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; background: #f1f5f9; padding: 4px 8px; font-size: 6.8pt; color: #334155; display: flex; justify-content: space-between; align-items: center;">
                <span><strong>Enquiry Core:</strong> Source B &amp; C provide contemporary primary evidence; Interpretations 1 &amp; 2 provide competing modern historical views.</span>
                <span style="font-weight: 700; color: #1e3a8a;">Keep Page 5 open for Q3(a)–(d)</span>
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · Historical Enquiry Dossier</span>
            <span class="turn-over">Turn over for Question 3(a) &#9654;</span>
            <span>Page 5 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 6: SECTION B — QUESTION 3(a): SOURCE UTILITY [8 MARKS]   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Timed Exam Paper · Question 3(a)</h2>
                    <p>Spend approx. 12 minutes on Question 3(a). Evaluate content, provenance (COP), and context.</p>
                </div>
                <span class="header-tag">Q3(a): Source Utility [8m]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">3 (a)</strong> ${e.q3a.stem}</span>
                    <span class="q-marks">(8)</span>
                </div>

                <!-- Utility Scaffolding Bar -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Source B Utility (Content &amp; COP):</span>
                        <div class="scaffold-content" style="font-size: 6.6pt;">${e.q3a.scaffold.sourceB_focus}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Source C Utility (Content &amp; COP):</span>
                        <div class="scaffold-content" style="font-size: 6.6pt;">${e.q3a.scaffold.sourceC_focus}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1;">
                        <span class="scaffold-label">Contextual Knowledge:</span>
                        <div class="scaffold-content" style="font-size: 6.6pt;">${e.q3a.scaffold.ownKnowledge_focus}</div>
                    </div>
                </div>

                <div style="font-size: 7pt; font-weight: 700; color: #475569; margin-bottom: 2px;">
                    Response Structure: Evaluate Source B (Content + Nature/Origin/Purpose + Context) &rarr; Evaluate Source C &rarr; Conclusion on Comparative Utility.
                </div>

                ${renderLines(e.q3a.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · ${meta.shortTitle}</span>
            <span class="turn-over">Turn over for Question 3(b) &amp; 3(c) &#9654;</span>
            <span>Page 6 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 7: SECTION B — QUESTION 3(b) & 3(c) [4 + 4 = 8 MARKS]     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Timed Exam Paper · Question 3(b) &amp; 3(c)</h2>
                    <p>Spend approx. 5 minutes on Q3(b) and 5 minutes on Q3(c). Write in concise, focused prose.</p>
                </div>
                <span class="header-tag">Q3(b) &amp; Q3(c): Interpretations [8m]</span>
            </div>

            <!-- Question 3(b) -->
            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">3 (b)</strong> ${e.q3b.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>
                <div style="border: 1px solid #94a3b8; border-radius: 3px; background: #f8fafc; padding: 3px 6px; margin-bottom: 3px; font-size: 6.8pt; color: #334155;">
                    <strong>Direct Contrast Frame:</strong> <em>Interpretation 1 argues that... whereas Interpretation 2 argues that...</em>
                </div>
                ${renderLines(10)}
            </div>

            <!-- Question 3(c) -->
            <div class="question-container" style="margin-top: 6px;">
                <div class="question-prompt">
                    <span><strong class="q-num">3 (c)</strong> ${e.q3c.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>
                <div style="border: 1px solid #94a3b8; border-radius: 3px; background: #f8fafc; padding: 3px 6px; margin-bottom: 3px; font-size: 6.8pt; color: #334155;">
                    <strong>Different Views Frame:</strong> <em>The historians give different views because they have relied on different sources/evidence. Interpretation 1 is supported by Source B, which emphasizes... whereas Interpretation 2 is supported by Source C, which emphasizes...</em>
                </div>
                ${renderLines(12)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · ${meta.shortTitle}</span>
            <span class="turn-over">Turn over for Question 3(d) Evaluative Essay &#9654;</span>
            <span>Page 7 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 8: SECTION B — QUESTION 3(d): EVALUATIVE ESSAY (PART 1)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Timed Exam Paper · Question 3(d) (Part 1)</h2>
                    <p>Spend approx. 25 minutes on Question 3(d). 16 marks for content + 4 marks for SPaG.</p>
                </div>
                <span class="header-tag" style="background: #1e3a8a;">Q3(d): Evaluative Essay [20m Total]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">3 (d)</strong> ${e.q3d.stem}</span>
                    <span class="q-marks">(16 + 4 SPaG)</span>
                </div>

                <!-- Criteria Judgement Matrix -->
                <div class="matrix-grid" style="margin-bottom: 4px;">
                    <div class="matrix-col">
                        <span class="scaffold-label">Agree with Interpretation 2:</span>
                        <div style="font-size: 6.6pt; color: #334155;">
                            • Points in Int 2 that are valid<br>
                            • Evidence from Source C supporting this<br>
                            • Specific contextual knowledge backing it
                        </div>
                    </div>
                    <div class="matrix-col">
                        <span class="scaffold-label">Alternative / Counter-view (Interpretation 1):</span>
                        <div style="font-size: 6.6pt; color: #334155;">
                            • Counter-argument in Int 1<br>
                            • Evidence from Source B supporting this<br>
                            • Specific contextual knowledge backing it
                        </div>
                    </div>
                    <div class="matrix-col">
                        <span class="scaffold-label">Evaluative Criteria for Judgement:</span>
                        <div style="font-size: 6.6pt; color: #1e3a8a; font-weight: 600;">
                            ${e.q3d.criteria.map((c) => `• ${c}`).join('<br>')}
                        </div>
                    </div>
                </div>

                <div style="font-size: 6.8pt; color: #475569; font-style: italic; margin-bottom: 3px;">
                    Paragraph 1: Evaluate Interpretation 2 with precise own knowledge &rarr; Paragraph 2: Evaluate Interpretation 1 with precise own knowledge.
                </div>

                ${renderLines(e.q3d.linesPage7 || 26)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · ${meta.shortTitle}</span>
            <span class="turn-over">Question 3(d) continues on next page &#9654;</span>
            <span>Page 8 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 9: SECTION B — QUESTION 3(d): EVALUATIVE ESSAY (PART 2)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Timed Exam Paper · Question 3(d) (Continued)</h2>
                    <p>Complete your synthesis and reach a weighed, criteria-based conclusion.</p>
                </div>
                <span class="header-tag">Q3(d): Conclusion &amp; Judgement</span>
            </div>

            <div class="question-container">
                <div style="border: 1px solid #94a3b8; border-radius: 3px; background: #f8fafc; padding: 3px 6px; margin-bottom: 4px; font-size: 6.8pt; color: #334155; display: flex; justify-content: space-between;">
                    <span><strong>Conclusion Rule:</strong> State explicitly <em>how far</em> you agree with Interpretation 2 using your chosen criteria. Do not merely summarize.</span>
                    <span><strong>SPaG Check:</strong> Capital letters for proper nouns (e.g. SCLC, Supreme Court, Vietcong).</span>
                </div>

                ${renderLines(e.q3d.linesPage8 || 28)}

                <!-- Level 4 Marking Criteria Box -->
                <div style="border: 1.5px solid #1e3a8a; border-radius: 4px; background: #eff6ff; padding: 4px 6px; margin-top: 4px; font-size: 6.8pt; line-height: 1.25;">
                    <div style="font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-bottom: 1px;">
                        Pearson Edexcel Level 4 Mark Scheme [13–16 Marks + 4 SPaG = 17–20 Marks]:
                    </div>
                    <div style="color: #1e293b; display: flex; gap: 8px;">
                        <div><span class="tracker-box"></span> Both Interpretations Weighed</div>
                        <div><span class="tracker-box"></span> Extensive Contextual Facts</div>
                        <div><span class="tracker-box"></span> Sustained Evaluative Criteria</div>
                        <div><span class="tracker-box"></span> Flawless SPaG &amp; Specialist Terms</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · End of Section B (36 Marks + 4 SPaG)</span>
            <span class="turn-over">Turn over for Section B Depth Booster &#9654;</span>
            <span>Page 9 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 10: SECTION B — SPECIFICATION DEPTH BOOSTER [12 MARKS]   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Booster · Mastery Practice</h2>
                    <p>Exhaustive specification coverage. Practice an alternative high-yield exam question for this Key Topic.</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Spec Depth Booster [12m]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">${d.alternateQ.num}</strong> ${d.alternateQ.stem}</span>
                    <span class="q-marks">(12)</span>
                </div>

                <!-- Stimulus Box -->
                <div class="stimulus-card">
                    You may use the following in your answer:
                    <ul>
                        <li><strong>${d.alternateQ.stimulus[0]}</strong></li>
                        <li><strong>${d.alternateQ.stimulus[1]}</strong></li>
                    </ul>
                    <span style="display: block; margin-top: 2px; font-style: italic; color: #475569;">(You must also use information of your own.)</span>
                </div>

                <!-- Knowledge Bank & Planner -->
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Knowledge Bank:</span>
                        <div class="scaffold-content">${d.alternateQ.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">3-Paragraph Plan:</span>
                        <div style="font-size: 6.6pt; color: #334155;">
                            • <strong>P1:</strong> ${d.alternateQ.planner.p1}<br>
                            • <strong>P2:</strong> ${d.alternateQ.planner.p2}<br>
                            • <strong>P3:</strong> ${d.alternateQ.planner.p3}
                        </div>
                    </div>
                </div>

                ${renderLines(d.alternateQ.lines || 22)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Section C (Exemplar Answers) &#9654;</span>
            <span>Page 10 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: SECTION C — GRADE 8/9 MODEL ANSWERS: SECTION A       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section C: High-Scoring Exemplar Responses · Section A</h2>
                    <p>Official Pearson Edexcel Level 2 &amp; Level 4 continuous prose models with examiner annotations.</p>
                </div>
                <span class="header-tag" style="background: #15803d;">Grade 8/9 Models: Q1 &amp; Q2</span>
            </div>

            <!-- Q1 Inference Model -->
            <div class="exemplar-box">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 1: Source Inference Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 2 (4/4)</span>
                </div>
                <div class="exemplar-stem">${x.q1.stem}</div>
                <div class="exemplar-text" style="white-space: pre-line;">
                    ${x.q1.model}
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.q1.examiner}
                </div>
            </div>

            <!-- Q2 Explain Why Model -->
            <div class="exemplar-box" style="margin-bottom: 0;">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 2: Causation Essay Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 4 (12/12)</span>
                </div>
                <div class="exemplar-stem">${x.q2.stem}</div>
                <div class="exemplar-text">
                    <p style="margin: 0 0 3px 0;">${x.q2.modelP1}</p>
                    <p style="margin: 0 0 3px 0;">${x.q2.modelP2}</p>
                    <p style="margin: 0;">${x.q2.modelP3}</p>
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.q2.examiner}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Option 33 · Official Exam Criteria &amp; Exemplars</span>
            <span class="turn-over">Turn over for Section B Models &amp; Traps &#9654;</span>
            <span>Page 11 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 12: SECTION C — GRADE 8/9 MODEL ANSWERS: SECTION B & TRAPS-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section C: Section B Models &amp; Fatal Examiner Traps</h2>
                    <p>Official Level 3 &amp; Level 4 continuous prose models and high-frequency pitfalls to avoid.</p>
                </div>
                <span class="header-tag" style="background: #15803d;">Grade 8/9 Models: Q3 &amp; Traps</span>
            </div>

            <!-- Q3a Utility Model -->
            <div class="exemplar-box" style="margin-bottom: 4px;">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 3(a): Source Utility Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 3 (8/8)</span>
                </div>
                <div class="exemplar-text">
                    ${x.q3a.model
                      .split('\n\n')
                      .map((p) => `<p style="margin: 0 0 2px 0;">${p}</p>`)
                      .join('')}
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.q3a.examiner}
                </div>
            </div>

            <!-- Q3b & Q3c Models -->
            <div class="exemplar-box" style="margin-bottom: 4px;">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 3(b) &amp; 3(c): Interpretations Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 2 (4/4 + 4/4)</span>
                </div>
                <div class="exemplar-text">
                    <p style="margin: 0 0 2px 0;"><strong>Q3(b) Difference:</strong> ${x.q3bc.q3bModel}</p>
                    <p style="margin: 0;"><strong>Q3(c) Reason:</strong> ${x.q3bc.q3cModel}</p>
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> Q3b: ${x.q3bc.q3bExaminer} | Q3c: ${x.q3bc.q3cExaminer}
                </div>
            </div>

            <!-- Q3d Evaluative Essay Model Extract -->
            <div class="exemplar-box" style="margin-bottom: 4px;">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 3(d): Evaluative Essay Conclusion Model</span>
                    <span class="exemplar-grade">Full Marks · Level 4 (16+4 = 20/20)</span>
                </div>
                <div class="exemplar-text">
                    ${x.q3d.modelExtract}
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.q3d.examiner}
                </div>
            </div>

            <!-- Top 3 Fatal Examiner Traps -->
            <div class="traps-card">
                <div class="traps-header">
                    Top 3 Fatal Examiner Traps to Avoid for Key Topic ${meta.number}
                </div>
                <div class="traps-grid">
                    ${x.traps
                      .map(
                        (t) => `
                        <div class="trap-item">
                            <strong>• ${t.title}</strong>
                            <span>${t.desc}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option 33 Conflict at Home and Abroad: the USA, 1954–75</span>
            <span style="font-weight: 700; color: #0f172a;">100% Specification Coverage Completed</span>
            <span>Page 12 of 12</span>
        </div>
    </div>

</body>
</html>`;
}

// =============================================================================
// MAIN COMPILATION & PDF EXPORT
// =============================================================================
(async () => {
  try {
    console.log('🚀 Starting compilation of authentic 11-page USA Exam Practice Packs...');

    const generatedHtmlFiles = {};

    for (const [ktKey, meta] of Object.entries(KT_DATA)) {
      console.log(`\n📄 Generating 12-Page Exam Practice Pack HTML for ${ktKey}...`);
      const htmlContent = renderBookletHtml(ktKey, meta);
      const outHtmlPath = path.join(bookletsDir, `usa_mastery_${ktKey}.html`);
      fs.writeFileSync(outHtmlPath, htmlContent, 'utf8');
      generatedHtmlFiles[ktKey] = outHtmlPath;
      console.log(`   ✅ Saved: ${path.basename(outHtmlPath)}`);
    }

    // Compile the Combined Master HTML booklet (48 Pages)
    console.log('\n📚 Compiling 48-Page Full Master Booklet (usa_mastery_FULL.html)...');
    let fullHtmlPages = '';
    for (const [ktKey] of Object.entries(KT_DATA)) {
      const htmlFile = generatedHtmlFiles[ktKey];
      const rawHtml = fs.readFileSync(htmlFile, 'utf8');
      const bodyMatch = rawHtml.match(/<body>([\s\S]*?)<\/body>/);
      if (bodyMatch) {
        fullHtmlPages += bodyMatch[1] + '\n';
      }
    }

    const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Conflict at Home and Abroad: the USA, 1954–75 — Complete Unit Exam Master Pack</title>
    <style>${COMMON_CSS}</style>
</head>
<body>
    ${fullHtmlPages}
</body>
</html>`;

    const fullHtmlPath = path.join(bookletsDir, 'usa_mastery_FULL.html');
    fs.writeFileSync(fullHtmlPath, fullHtmlContent, 'utf8');
    console.log(`   ✅ Saved: usa_mastery_FULL.html (48 Pages Total)`);

    // Launch Puppeteer
    console.log('\n🖨️ Launching Puppeteer to compile print-perfect PDFs...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--allow-file-access-from-files',
        '--disable-web-security',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    const renderPdf = async (htmlPath, pdfPath, label) => {
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(180000);
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0', timeout: 180000 });

      // Page overflow audit inside Puppeteer
      const overflows = await page.evaluate(() => {
        const pages = document.querySelectorAll('.page');
        const results = [];
        pages.forEach((p, idx) => {
          if (p.scrollHeight > p.clientHeight + 2) {
            results.push({
              page: idx + 1,
              scrollHeight: p.scrollHeight,
              clientHeight: p.clientHeight,
            });
          }
        });
        return results;
      });

      if (overflows.length > 0) {
        console.warn(
          `   ⚠️ WARNING: Layout overflow detected on page(s): ${JSON.stringify(overflows)}`,
        );
      } else {
        console.log(`   ✨ Layout check passed: Zero overflows across all pages.`);
      }

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        landscape: false,
        printBackground: true,
        margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' },
        timeout: 180000,
      });
      await page.close();

      // Verify physical page count via PDF buffer
      const buf = fs.readFileSync(pdfPath);
      const matches = buf.toString('latin1').match(/\/Type\s*\/Page\b/g);
      const pageCount = matches ? matches.length : 0;
      console.log(`   📕 Exported PDF: ${label} — Exact Page Count: ${pageCount} pages`);
      return pageCount;
    };

    // 1. KT1 PDF
    const kt1PdfPath = path.join(pdfsDir, 'usa_mastery_pack_KT1.pdf');
    await renderPdf(generatedHtmlFiles['KT1'], kt1PdfPath, 'usa_mastery_pack_KT1.pdf');

    // 2. KT2 PDF
    const kt2PdfPath = path.join(pdfsDir, 'usa_mastery_pack_KT2.pdf');
    await renderPdf(generatedHtmlFiles['KT2'], kt2PdfPath, 'usa_mastery_pack_KT2.pdf');

    // 3. KT3 PDF
    const kt3PdfPath = path.join(pdfsDir, 'usa_mastery_pack_KT3.pdf');
    await renderPdf(generatedHtmlFiles['KT3'], kt3PdfPath, 'usa_mastery_pack_KT3.pdf');

    // 4. KT4 PDF
    const kt4PdfPath = path.join(pdfsDir, 'usa_mastery_pack_KT4.pdf');
    await renderPdf(generatedHtmlFiles['KT4'], kt4PdfPath, 'usa_mastery_pack_KT4.pdf');

    // 5. FULL Master PDF
    const fullPdfPath = path.join(pdfsDir, 'usa_mastery_pack_FULL.pdf');
    await renderPdf(fullHtmlPath, fullPdfPath, 'usa_mastery_pack_FULL.pdf');

    // Sync to public/pdfs/ root
    fs.copyFileSync(kt1PdfPath, path.join(globalPdfsDir, 'usa_mastery_pack_KT1.pdf'));
    fs.copyFileSync(kt2PdfPath, path.join(globalPdfsDir, 'usa_mastery_pack_KT2.pdf'));
    fs.copyFileSync(kt3PdfPath, path.join(globalPdfsDir, 'usa_mastery_pack_KT3.pdf'));
    fs.copyFileSync(kt4PdfPath, path.join(globalPdfsDir, 'usa_mastery_pack_KT4.pdf'));
    fs.copyFileSync(fullPdfPath, path.join(globalPdfsDir, 'usa_mastery_pack_FULL.pdf'));

    console.log(`   📋 Synced all 5 USA PDFs to public/pdfs/ root`);

    await browser.close();

    // Auto-sync to Google Drive Department File (School Laptop Access)
    console.log(`\n📂 Auto-syncing USA Mastery PDFs to Google Drive Department File...`);
    try {
      const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
      syncAdminPdfsToDrive();
      console.log(`✅ Google Drive Department File updated with fresh USA Mastery PDFs.`);
    } catch (driveErr) {
      console.warn(`⚠️ Warning: Could not sync to Google Drive: ${driveErr.message}`);
    }

    console.log(
      '\n🎉 Successfully compiled all 5 USA Exam Practice Booklets into print-perfect PDFs!',
    );
  } catch (err) {
    console.error('❌ Error generating USA mastery booklets:', err);
    process.exit(1);
  }
})();
