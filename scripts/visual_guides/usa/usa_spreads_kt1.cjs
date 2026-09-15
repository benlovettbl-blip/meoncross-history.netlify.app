/**
 * usa_spreads_kt1.cjs
 *
 * Spreads 1 to 4 for Key Topic 1: The Development of the Civil Rights Movement, 1954–60
 * Grounded in Hodder GCSE History for Edexcel (Steve Waugh & John Wright, pp. 7–27)
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 1 (KT 1.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 2 (KT 1.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 3 (KT 1.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 4 (KT 1.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 1: KT 1.1 — THE POSITION OF BLACK AMERICANS IN THE EARLY 1950s
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_1_1',
    topic: 'Key Topic 1: Civil Rights Movement, 1954–60',
    title: 'KT 1.1: The Position of Black Americans in the Early 1950s',
    footerTag: 'KT 1.1: Position of Black Americans in early 1950s',
    left: {
      sectionTag: 'Jim Crow South',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'In the early 1950s, Black Americans in the Southern states lived under state-mandated racial apartheid known as Jim Crow. Legitimised by the 1896 Plessy v. Ferguson Supreme Court ruling ("separate but equal"), sustained through near-total voter disenfranchisement, and enforced by white vigilante terror, Black citizens were systematically denied the constitutional protections of the 14th and 15th Amendments.',
      pillars: [
        {
          title: 'De Jure Segregation in the South',
          subtitle: 'State-Sanctioned Apartheid',
          bullets: [
            '**Plessy v. Ferguson (1896)** established the legal fiction of "separate but equal", allowing 17 Southern states to mandate racial segregation by law.',
            'Everyday public life was partitioned: schools, buses, waiting rooms, restaurants, and water fountains for Black citizens were chronically dilapidated and underfunded.',
            'Social etiquette enforced racial deference: Black Americans had to address whites as "Mr." or "Sir", yield sidewalks, and sit strictly in the back of public buses.',
          ],
        },
        {
          title: 'Systematic Disenfranchisement',
          subtitle: 'Denial of Democratic Rights',
          bullets: [
            'Southern registrars nullified the **15th Amendment** using poll taxes, complex literacy tests, and grandfather clauses designed to exclude Black voters.',
            'In 1950, only ~20% of eligible Black adults in the South were registered to vote, and under 5% in rural Mississippi counties.',
            'White primaries and physical intimidation ensured only pro-segregation white politicians, judges, and law enforcement officials were ever elected.',
          ],
        },
        {
          title: 'Early Civil Rights Legal Resistance',
          subtitle: 'The Work of NAACP & CORE',
          bullets: [
            'The **NAACP** (founded 1909), led by lawyer Thurgood Marshall, pursued a meticulous judicial strategy challenging segregation in university law schools.',
            'The **CORE** (Congress of Racial Equality, founded 1942 by James Farmer) pioneered non-violent direct action and sit-ins in northern public facilities.',
            'President Harry S. Truman issued **Executive Order 9981 (1948)** desegregating the US Armed Forces, establishing the first federal breach in segregation.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Thurgood Marshall',
          role: 'Chief Legal Counsel for the NAACP; masterminded court challenges overturning segregated higher education in Sweatt v. Painter (1950).',
        },
        {
          name: 'James Farmer',
          role: 'Co-founder of CORE (1942); pioneered non-violent direct action sit-ins inspired by Mahatma Gandhi’s philosophy of non-cooperation.',
        },
        {
          name: 'Harry S. Truman',
          role: '33rd US President; published "To Secure These Rights" (1947) and desegregated the US Armed Forces by Executive Order 9981 in 1948.',
        },
        {
          name: 'Walter White',
          role: 'NAACP Executive Secretary (1931–55); expanded southern branch membership and investigated lynchings to pressure federal authorities.',
        },
      ],
      milestones: [
        { date: '1896', event: 'Plessy v Ferguson establishes "separate but equal"' },
        { date: '1909', event: 'NAACP founded following Springfield race riots' },
        { date: '1942', event: 'CORE founded in Chicago to pursue direct action' },
        { date: '1948', event: 'Executive Order 9981 desegregates US military' },
        { date: '1950', event: 'Sweatt v Painter outlaws Texas makeshift Black law school' },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'Jim Crow Segregation & KKK Impunity in the 1950s',
        stem: 'Q1 (4m) Inference from Source A &bull; Q2 (12m) Explain why the Ku Klux Klan operated with impunity in the Southern states in the 1950s.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks &bull; ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Formula:</strong> Inference 1 + Direct Quote from Source A; Inference 2 + Direct Quote. Zero provenance.<br/><strong>Q2 Formula (3 PEE Paragraphs):</strong> (1) Complicity of local law enforcement & all-white juries &rarr; (2) Political shielding by Dixiecrat politicians &rarr; (3) Economic intimidation of sharecroppers preventing legal complaints.',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that segregation was enforced with criminal penalties. The source states "failure to obey is a criminal misdemeanor", showing racial separation was state law, not personal choice. A second inference is that public transport facilities were strictly divided by race. The source states "separate waiting rooms, ticket windows, and sanitary drinking facilities shall be maintained", proving public spaces were physically partitioned.<br/><br/><strong>Q2 (Explain Why):</strong> One reason the KKK operated with impunity was the direct complicity of local southern law enforcement and all-white juries. Police officers, sheriffs, and court officials were frequently active Klan members. Consequently, when racially motivated beatings or murders occurred, local sheriffs refused to gather evidence. Furthermore, state laws excluded non-voters from jury duty, ensuring juries were 100% white. These all-white juries routinely acquitted white assailants within minutes, guaranteeing total legal immunity.<br/><br/>A second reason was the political protection provided by Southern Democrats ("Dixiecrats"). Southern politicians held senior chairmanships in Congress and filibustered every federal anti-lynching bill introduced in Washington. Knowing the federal government was reluctant to intervene in "states\' rights", Klan members operated without fear of federal prosecution.',
        examinerNote:
          'Full marks. Q1 gives two distinct, valid inferences with verbatim supporting evidence. Q2 provides two fully developed, multi-layered causal paragraphs with precise terminology (Dixiecrats, 100% white juries, filibuster).',
        pitfallCategory: 'Inference & Multi-Causal Pitfalls',
        pitfall:
          'In Q1, never evaluate source reliability; simply infer what the text reveals. In Q2, avoid simple storytelling: you must explain HOW each factor caused Klan impunity.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Architecture of Southern Disenfranchisement',
        steps: [
          {
            stage: '1. Plessy Doctrine (1896)',
            desc: 'Supreme Court establishes "separate but equal", legalising state segregation codes.',
          },
          {
            stage: '2. Voting Roadblocks',
            desc: 'Poll taxes & impossible literacy tests strip 80% of Black citizens of voter registration.',
          },
          {
            stage: '3. Judicial Complicity',
            desc: 'Non-voters excluded from juries; all-white courts ensure zero convictions for racial violence.',
          },
          {
            stage: '4. NAACP Legal Action',
            desc: 'NAACP challenges unequal graduate schools, paving the way for Brown v. Board of Education.',
          },
        ],
      },
      wordBank: [
        {
          term: 'De Jure Segregation',
          def: 'Racial separation enforced by compulsory state and local statutes.',
        },
        {
          term: 'De Facto Segregation',
          def: 'Racial separation sustained by social custom and housing patterns in northern cities.',
        },
        {
          term: 'Jim Crow Laws',
          def: 'State statutes in the South enforcing racial segregation from 1877 to 1965.',
        },
        {
          term: 'Plessy v. Ferguson',
          def: '1896 Supreme Court ruling establishing the doctrine of "separate but equal".',
        },
        {
          term: 'Disenfranchisement',
          def: 'The systematic deprivation of a person or group of the right to vote.',
        },
        {
          term: 'Poll Tax',
          def: 'A fee levied on voters as a prerequisite for casting ballots, designed to stop poor Black voting.',
        },
        {
          term: 'Literacy Test',
          def: 'Arbitrary, impossible reading exams administered by white registrars to disqualify Black voters.',
        },
        {
          term: 'White Primary',
          def: 'Primary elections in Southern states in which only white voters were permitted to participate.',
        },
        {
          term: 'NAACP',
          def: 'National Association for the Advancement of Colored People; focused on constitutional litigation.',
        },
        {
          term: 'CORE',
          def: 'Congress of Racial Equality; founded in 1942 to pioneer non-violent direct action.',
        },
        {
          term: 'Executive Order 9981',
          def: 'President Truman’s 1948 executive order banning racial discrimination in the US military.',
        },
        {
          term: 'Sweatt v. Painter',
          def: '1950 Supreme Court decision ruling a segregated Black law school in Texas was inherently unequal.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 2: KT 1.2 — DEVELOPMENTS IN EDUCATION: BROWN (1954) & LITTLE ROCK (1957)
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_1_2',
    topic: 'Key Topic 1: Civil Rights Movement, 1954–60',
    title: 'KT 1.2: Developments in Education: Brown v. Topeka & Little Rock',
    footerTag: 'KT 1.2: Education: Brown v. Topeka & Little Rock',
    left: {
      sectionTag: 'School Desegregation',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'In May 1954, the Supreme Court ruled in Brown v. Topeka that segregated schools were inherently unequal, striking down the 1896 Plessy precedent. However, deep Southern states mounted fierce "Massive Resistance". When nine Black students attempted to desegregate Little Rock Central High School in 1957, Governor Orval Faubus used armed National Guardsmen to block them, forcing President Eisenhower to send federal troops to uphold the law.',
      pillars: [
        {
          title: 'Brown v. Board of Education (1954)',
          subtitle: 'The Constitutional Breakthrough',
          bullets: [
            'Oliver Brown sued the Topeka Board of Education after his 7-year-old daughter Linda had to walk across dangerous rail yards to an all-Black school.',
            'NAACP counsel Thurgood Marshall argued that state segregation generated a psychological feeling of inferiority that violated the 14th Amendment.',
            'Chief Justice **Earl Warren** led a unanimous (9–0) ruling declaring that "separate educational facilities are inherently unequal", overturning Plessy.',
          ],
        },
        {
          title: 'Massive Resistance & Brown II (1955)',
          subtitle: 'Southern Obstruction & Evasion',
          bullets: [
            'In **Brown II (1955)**, the Court ordered desegregation "with all deliberate speed", an ambiguous phrase Southern states used to delay integration for years.',
            'In March 1956, 101 Southern congressmen signed the **Southern Manifesto**, pledging to use "all lawful means" to preserve segregation.',
            'By 1957, zero Black children attended integrated schools in six Southern states (Alabama, Florida, Georgia, Louisiana, Mississippi, South Carolina).',
          ],
        },
        {
          title: 'Little Rock Central High School (1957)',
          subtitle: 'Federal Force vs State Defiance',
          bullets: [
            'In September 1957, nine Black students ("**Little Rock Nine**") attempted to enter Central High; Governor **Orval Faubus** deployed National Guard troops to block them.',
            '15-year-old **Elizabeth Eckford** walked alone through a screaming white mob threatening to lynch her before a white bystander helped her onto a bus.',
            'Faced with state defiance, **President Eisenhower** federalised the Arkansas National Guard and dispatched 1,000 troops of the **101st Airborne Division** to protect the students.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Linda Brown',
          role: 'Third-grade student in Topeka, Kansas, whose father Oliver Brown challenged school segregation with the NAACP, leading to the landmark 1954 ruling.',
        },
        {
          name: 'Earl Warren',
          role: 'Chief Justice of the US Supreme Court (1953–69); engineered unanimous 9–0 decision in Brown declaring segregation inherently unconstitutional.',
        },
        {
          name: 'Orval Faubus',
          role: 'Governor of Arkansas; deployed Arkansas National Guard in 1957 to block Little Rock Nine to secure white segregationist votes for re-election.',
        },
        {
          name: 'Dwight D. Eisenhower',
          role: '34th US President; intervened in Little Rock, sending 101st Airborne to enforce federal court orders and uphold the authority of the Supreme Court.',
        },
      ],
      milestones: [
        {
          date: '17 May 1954',
          event: 'Supreme Court unanimously rules segregation unconstitutional in Brown',
        },
        {
          date: '31 May 1955',
          event: 'Brown II issues ambiguous order to desegregate "with all deliberate speed"',
        },
        {
          date: '12 Mar 1956',
          event: '101 Southern congressmen sign Southern Manifesto defying Brown',
        },
        {
          date: '4 Sep 1957',
          event: 'Little Rock Nine physically blocked by Arkansas National Guard',
        },
        {
          date: '24 Sep 1957',
          event: 'Eisenhower dispatches 101st Airborne to escort Little Rock Nine',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'White Opposition to Desegregation at Little Rock (1957)',
        stem: 'How useful are Sources B and C for an enquiry into the reasons for white opposition to school integration at Little Rock Central High School in 1957? [8 Marks]',
        marks: '8',
        marksTime: '8 Marks &bull; ~14 Mins',
        planningGuideTitle: 'Examiner Planning & Structural Framework (C-O-P Matrix):',
        planningGuide:
          '<strong>Source B:</strong> Evaluate Content (fear of disorder) &rarr; Context (Faubus re-election bid) &rarr; Provenance (official political broadcast).<br/><strong>Source C:</strong> Evaluate Content (visceral mob hostility) &rarr; Context (Eckford mobbing) &rarr; Provenance (firsthand NAACP eyewitness).<br/><strong>Synthesis:</strong> Weigh how both sources combine political demagoguery with street-level mob intimidation.',
        modelAnswer:
          'Source B is useful because its content reveals how political leaders manufactured fear to justify segregation. Governor Faubus claims that integrating Central High would cause "imminent bloodshed and civil disorder", justifying his use of the National Guard as a peace-keeping measure. From my contextual knowledge, Faubus faced a difficult primary election in 1957 and cynically manipulated white racial fears to secure segregationist votes. The provenance enhances its utility because, as a televised gubernatorial address, it shows the official public arguments used by Southern politicians to defy federal courts.<br/><br/>Source C is useful in a different way because it reveals the visceral street-level hatred of the white mob. Daisy Bates records how white crowds screamed "Lynch her! Drag her over to this tree!" at 15-year-old Elizabeth Eckford. From my knowledge, Eckford missed the carpool and walked alone, facing 400 abusive protesters while police stood idle. The provenance as an eyewitness account by Arkansas NAACP president Daisy Bates makes it valuable for showing the terrifying intimidation pupils endured, though her activist role means she emphasizes the brutality of the mob.<br/><br/>Overall, both sources are mutually useful: Source B shows the top-down political rhetoric used by state officials, while Source C provides vivid evidence of the violent bottom-up street resistance that this rhetoric unleashed.',
        examinerNote:
          'Full 8 marks (Level 3). Comprehensively evaluates Content, Own Knowledge context, and Provenance (NOP) for both sources, culminating in a balanced comparative judgement on their mutual utility.',
        pitfallCategory: 'Source Utility Traps',
        pitfall:
          'Never claim a source is "useless because it is biased". State politicians (Source B) and civil rights leaders (Source C) have motives, but their perspectives are precisely what makes them useful for studying opposition!',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From Supreme Court Ruling to Federal Troops in Little Rock',
        steps: [
          {
            stage: '1. Brown Ruling (1954)',
            desc: 'Supreme Court outlaws segregated schools; declares separate inherently unequal.',
          },
          {
            stage: '2. Brown II Loophole',
            desc: 'Court orders desegregation "with all deliberate speed"; South delays compliance.',
          },
          {
            stage: '3. Faubus Blockade',
            desc: 'Gov. Faubus deploys Arkansas National Guard to block 9 Black pupils from Central High.',
          },
          {
            stage: '4. Presidential Action',
            desc: 'Eisenhower sends 101st Airborne; federal troops escort Little Rock Nine for full year.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Brown v. Topeka',
          def: '1954 landmark Supreme Court decision ruling segregated public schools unconstitutional.',
        },
        {
          term: 'Inherently Unequal',
          def: 'Key legal doctrine established by Earl Warren in Brown, overturning Plessy.',
        },
        {
          term: 'Earl Warren',
          def: 'Chief Justice of the US Supreme Court who engineered the unanimous 9–0 Brown ruling.',
        },
        {
          term: 'Brown II',
          def: '1955 Supreme Court follow-up decree ordering school desegregation "with all deliberate speed".',
        },
        {
          term: 'All Deliberate Speed',
          def: 'Vague judicial phrase in Brown II exploited by Southern states to delay desegregation.',
        },
        {
          term: 'Southern Manifesto',
          def: '1956 document signed by 101 Southern congressmen pledging resistance to school integration.',
        },
        {
          term: 'Little Rock Nine',
          def: 'The nine Black students who integrated Little Rock Central High School in September 1957.',
        },
        {
          term: 'Orval Faubus',
          def: 'Governor of Arkansas who deployed the National Guard to block the Little Rock Nine.',
        },
        {
          term: '101st Airborne',
          def: 'Elite US Army division deployed by Eisenhower to enforce federal integration at Little Rock.',
        },
        {
          term: 'Daisy Bates',
          def: 'President of Arkansas NAACP who coordinated and mentored the Little Rock Nine.',
        },
        {
          term: 'Elizabeth Eckford',
          def: 'Little Rock student who arrived alone on 4 Sep 1957 and braved a screaming white mob.',
        },
        {
          term: 'The Lost Year',
          def: '1958–59 school year when Faubus closed all Little Rock high schools to prevent integration.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 3: KT 1.3 — MONTGOMERY BUS BOYCOTT & ITS IMPACT, 1955–60
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_1_3',
    topic: 'Key Topic 1: Civil Rights Movement, 1954–60',
    title: 'KT 1.3: The Montgomery Bus Boycott & Its Impact, 1955–60',
    footerTag: 'KT 1.3: Montgomery Bus Boycott & its impact',
    left: {
      sectionTag: 'Non-Violent Direct Action',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'On 1 December 1955, Rosa Parks was arrested in Montgomery, Alabama, for refusing to give up her bus seat. This triggered a 381-day boycott by 40,000 Black citizens coordinated by the Montgomery Improvement Association (MIA) under 26-year-old Dr. Martin Luther King Jr. The campaign proved the devastating power of non-violent economic boycotts, culminating in the Browder v. Gayle Supreme Court ruling desegregating public transport.',
      pillars: [
        {
          title: 'Causes & Grassroots Mobilisation',
          subtitle: 'Parks Arrest & The Women’s Council',
          bullets: [
            'Rosa Parks, a respected 42-year-old seamstress and NAACP secretary, was arrested for violating Montgomery city segregation ordinances on 1 Dec 1955.',
            '**Jo Ann Robinson** and the Women’s Political Council worked overnight duplicating 35,000 mimeographed leaflets calling for a one-day boycott on 5 December.',
            'Over 90% of Black riders boycotted the buses on 5 Dec; that evening, the **Montgomery Improvement Association (MIA)** formed and elected Martin Luther King Jr. leader.',
          ],
        },
        {
          title: 'The 381-Day Economic Siege',
          subtitle: 'Carpools & Non-Violent Discipline',
          bullets: [
            'To sustain the boycott, the Black community organised an intricate carpool network with 300 private cars operating from 40 church pick-up points.',
            'The Montgomery bus company lost 65% of its daily revenue; downtown white merchants suffered devastating economic losses without Black retail customers.',
            'White supremacists retaliated: King’s home was firebombed (Jan 1956), and police arrested 90 boycott leaders under anti-boycott labor laws, generating national media coverage.',
          ],
        },
        {
          title: 'Supreme Court Victory & National Impact',
          subtitle: 'Browder v. Gayle & Birth of SCLC',
          bullets: [
            'In **Browder v. Gayle (Nov 1956)**, the Supreme Court upheld that bus segregation violated the 14th Amendment; on 20 Dec 1956, Montgomery buses desegregated.',
            'The victory established **Martin Luther King Jr.** as a charismatic national leader and proved non-violent direct action could dismantle segregation.',
            'In January 1957, King and Southern church leaders founded the **SCLC** (Southern Christian Leadership Conference) to coordinate mass church-led campaigns across the South.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Rosa Parks',
          role: 'Montgomery NAACP secretary whose arrest on 1 Dec 1955 triggered the bus boycott; chosen as an unimpeachable test case for desegregation.',
        },
        {
          name: 'Martin Luther King Jr.',
          role: '26-year-old pastor of Dexter Avenue Baptist Church; elected president of MIA, introducing Christian non-violent direct action.',
        },
        {
          name: 'Jo Ann Robinson',
          role: 'President of Women’s Political Council; mimeographed 35,000 flyers overnight launching the 5 December bus boycott.',
        },
        {
          name: 'Ralph Abernathy',
          role: 'King’s closest civil rights colleague and co-founder of the MIA and SCLC; organised church carpools and community meetings.',
        },
      ],
      milestones: [
        {
          date: '1 Dec 1955',
          event: 'Rosa Parks arrested in Montgomery for refusing to yield bus seat',
        },
        {
          date: '5 Dec 1955',
          event: 'One-day boycott succeeds; MIA founded with MLK as president',
        },
        { date: '30 Jan 1956', event: 'MLK’s home firebombed; King urges non-violent discipline' },
        {
          date: '13 Nov 1956',
          event: 'Supreme Court declares bus segregation unconstitutional in Browder v Gayle',
        },
        {
          date: '21 Dec 1956',
          event: 'Montgomery buses officially desegregated after 381 days of boycott',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) & Q3(c) Historians’ Views [8m]',
        title: 'Reasons for the Success of the Montgomery Bus Boycott',
        stem: 'Study Interpretations 1 and 2. (b) What is the main difference between the views? [4m] &bull; (c) Suggest one reason why they differ. [4m]',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks &bull; ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          "<strong>Q3(b) Views Difference (4m):</strong> State core disagreement in sentence 1 &rarr; Quote/evidence from Int 1 (grassroots community solidarity) &rarr; Contrast with quote/evidence from Int 2 (MLK leadership & federal court intervention).<br/><strong>Q3(c) Reason for Difference (4m):</strong> Explain how Historian 1 focused on local organizational records (Women's Council carpools) while Historian 2 drew upon national media broadcasts and Supreme Court records.",
        modelAnswer:
          '<strong>Q3(b) Main Difference in Views:</strong> The main difference is that Interpretation 1 emphasizes the indispensable role of grassroots Black community organization, whereas Interpretation 2 emphasizes the charismatic leadership of Martin Luther King and federal judicial intervention. Interpretation 1 states that the boycott succeeded because "ordinary Black citizens demonstrated extraordinary economic endurance, walking miles to work and operating an intricate church carpool." In contrast, Interpretation 2 argues that "without the moral authority and inspiring oratory of Dr. King, the movement would have collapsed, and it was ultimately the Supreme Court’s Browder v. Gayle ruling that legally forced desegregation."<br/><br/><strong>Q3(c) Reason for Difference:</strong> One reason the interpretations differ is that the historians relied on different types of historical evidence. Historian 1 relied primarily on local grassroots records and oral histories from the Women’s Political Council and church organizers like Jo Ann Robinson, leading them to view the boycott from the bottom up. Conversely, Historian 2 relied on national newspaper coverage, King’s published speeches, and federal Supreme Court legal documents, naturally leading them to prioritize high-profile leadership and constitutional law.',
        examinerNote:
          'Full 8 marks (Level 2 on both 3b and 3c). 3(b) directly contrasts the two arguments using quotations. 3(c) accurately explains the historiographical mechanism causing the disagreement (differing source materials: local oral history vs national media/court records).',
        pitfallCategory: 'Interpretation Difference Pitfalls',
        pitfall:
          'In Q3(b), never summarize both interpretations separately; you must explicitly compare them. In Q3(c), never say "one historian is biased"; you must explain that they investigated different aspects or used different evidence.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Mechanics of the Montgomery Bus Boycott',
        steps: [
          {
            stage: '1. Parks Arrest',
            desc: "Rosa Parks arrested on 1 Dec 1955; Women's Political Council issues 35,000 boycott flyers.",
          },
          {
            stage: '2. MIA Formation',
            desc: 'MIA created; MLK elected leader; 40,000 citizens maintain 381-day non-violent boycott.',
          },
          {
            stage: '3. Economic Blow',
            desc: 'Bus company loses 65% revenue; white merchants suffer severe financial losses.',
          },
          {
            stage: '4. Legal Victory',
            desc: 'Browder v. Gayle outlaws transit segregation; SCLC founded to replicate strategy.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Rosa Parks',
          def: 'Montgomery NAACP secretary whose refusal to give up her bus seat sparked the 381-day boycott.',
        },
        {
          term: 'MIA',
          def: 'Montgomery Improvement Association; community organisation formed to run the bus boycott.',
        },
        {
          term: 'Martin Luther King Jr.',
          def: 'Elected leader of MIA; introduced Christian non-violence and became national figure.',
        },
        {
          term: 'Jo Ann Robinson',
          def: 'Leader of Women’s Political Council who mobilised Montgomery churches overnight.',
        },
        {
          term: 'Women’s Political Council',
          def: 'Black professional women’s civic organisation in Montgomery that initiated the boycott.',
        },
        {
          term: '381-Day Boycott',
          def: 'Duration of the Montgomery bus protest from 5 Dec 1955 to 20 Dec 1956.',
        },
        {
          term: 'Church Carpools',
          def: 'System of 300 private vehicles and 40 pickup stations that sustained the boycott.',
        },
        {
          term: 'Browder v. Gayle',
          def: '1956 Supreme Court ruling declaring public bus segregation unconstitutional under 14th Amendment.',
        },
        {
          term: 'Non-Violent Direct Action',
          def: 'Philosophy of resisting oppression without violence, inspired by Gandhi and Christianity.',
        },
        {
          term: 'SCLC',
          def: 'Southern Christian Leadership Conference; church-led civil rights group founded by MLK in 1957.',
        },
        {
          term: 'Civil Rights Act 1957',
          def: 'First federal civil rights law since Reconstruction, creating the Civil Rights Commission.',
        },
        {
          term: 'Ralph Abernathy',
          def: 'Key Montgomery pastor, boycott organiser, and co-founder of the SCLC alongside King.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 4: KT 1.4 — OPPOSITION TO CIVIL RIGHTS: KKK, TILL, DIXIECRATS, WCC
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_1_4',
    topic: 'Key Topic 1: Civil Rights Movement, 1954–60',
    title: 'KT 1.4: Opposition to Civil Rights: KKK, Emmett Till & Dixiecrats',
    footerTag: 'KT 1.4: Opposition: KKK, Emmett Till, Dixiecrats',
    left: {
      sectionTag: 'White Backlash',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        "The Brown ruling ignited a massive white supremacist counter-offensive across the American South. Middle-class whites formed White Citizens' Councils using economic blackmail, Southern politicians signed the Southern Manifesto, and the Ku Klux Klan revived violent terror. In August 1955, the barbaric lynching of 14-year-old Emmett Till and the swift acquittal of his killers shocked the global conscience, accelerating youth mobilization.",
      pillars: [
        {
          title: 'White Supremacist Terror: The KKK',
          subtitle: 'Vigilante Violence & Impunity',
          bullets: [
            'The **Ku Klux Klan** expanded rapidly after 1954, operating as hooded vigilantes using beatings, church bombings, and cross-burnings to terrorize activists.',
            'Klan groups assassinated NAACP state leaders, including Harry T. Moore in Florida and ministers who supported the Montgomery bus boycott.',
            'Because police officers and judges were often Klan members, all-white juries routinely acquitted white killers, creating an atmosphere of total impunity.',
          ],
        },
        {
          title: 'The Murder & Trial of Emmett Till (1955)',
          subtitle: 'The Catalyst of National Outrage',
          bullets: [
            'In August 1955, 14-year-old **Emmett Till** of Chicago was kidnapped, brutally beaten, shot in the head, and thrown into the Tallahatchie River for allegedly whistling at a white woman in Money, Mississippi.',
            'His mother, **Mamie Till Bradley**, insisted on an open-casket funeral in Chicago; over 50,000 viewed his mutilated face, published worldwide in *Jet* magazine.',
            'An all-white, all-male jury acquitted killers Roy Bryant and J.W. Milam in **67 minutes**; months later, they sold their confession to *Look* magazine for $4,000.',
          ],
        },
        {
          title: 'Institutional Resistance: WCC & Dixiecrats',
          subtitle: 'Economic Coercion & Congressional Obstruction',
          bullets: [
            '**White Citizens’ Councils (WCC)** formed in Mississippi in 1954, growing to 250,000 members; called the "country club Klan", they used economic retaliation.',
            'WCC banks denied loans, insurance companies cancelled policies, and white employers fired any Black citizen who signed civil rights petitions or joined the NAACP.',
            'Southern politicians known as **Dixiecrats**, led by Senator Strom Thurmond, used congressional filibusters and signed the **Southern Manifesto** to block federal legislation.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Emmett Till',
          role: '14-year-old Black boy from Chicago murdered in Mississippi in August 1955; his horrific death and the sham trial galvanized a generation of activists.',
        },
        {
          name: 'Mamie Till Bradley',
          role: 'Mother of Emmett Till; bravely held an open-casket funeral to "let the world see what they did to my boy", sparking international condemnation.',
        },
        {
          name: 'Strom Thurmond',
          role: 'Leading Dixiecrat Senator from South Carolina; conducted a record 24-hour filibuster against the Civil Rights Act of 1957.',
        },
        {
          name: 'Robert B. Patterson',
          role: 'Founder of the White Citizens’ Council in Indianola, Mississippi (1954); led middle-class economic resistance to school integration.',
        },
      ],
      milestones: [
        {
          date: 'Jul 1954',
          event: "First White Citizens' Council formed in Indianola, Mississippi",
        },
        {
          date: '28 Aug 1955',
          event: '14-year-old Emmett Till abducted and murdered in Money, Mississippi',
        },
        {
          date: '3 Sep 1955',
          event: 'Open-casket funeral in Chicago attended by 50,000; images published in Jet',
        },
        { date: '23 Sep 1955', event: 'All-white jury acquits Till’s killers in 67 minutes' },
        {
          date: 'Aug 1957',
          event: 'Strom Thurmond filibusters Civil Rights Act of 1957 for 24 hours 18 mins',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'Significance of the Murder of Emmett Till (1955)',
        stem: 'How far do you agree with Interpretation 2 that the murder of Emmett Till was the most powerful catalyst for the civil rights movement in the 1950s? [16+4 SPaG Marks]',
        marks: '16 + 4',
        marksTime: '20 Marks &bull; ~25 Mins',
        planningGuideTitle: 'Examiner Planning & Structural Framework (Criteria-Led Essay):',
        planningGuide:
          "<strong>Paragraph 1 (Agree with Int 2):</strong> Evaluate emotional mobilization, Mamie Till's open-casket decision, Jet magazine impact, radicalizing youth (John Lewis generation).<br/><strong>Paragraph 2 (Evaluate Int 1 - Alternative):</strong> Evaluate legal breakthrough of Brown v. Board (1954) & Montgomery Boycott establishing non-violent strategy.<br/><strong>Conclusion:</strong> Formulate definitive criteria judgement: Till provided the visceral emotional catalyst, but Brown provided the constitutional framework.",
        modelAnswer:
          'Interpretation 2 argues that the murder of Emmett Till was the decisive catalyst that transformed civil rights into a mass movement. There is substantial evidence to support this view. The barbaric murder of a 14-year-old Chicago boy visiting Mississippi in August 1955, followed by the acquittal of his self-confessed killers Roy Bryant and J.W. Milam by an all-white jury in just 67 minutes, exposed the unvarnished reality of Southern racial violence to the global press. Crucially, Mamie Till Bradley’s courageous decision to hold an open-casket funeral in Chicago allowed over 50,000 people to witness his mutilated body, and photographs published in Jet magazine caused visceral horror nationwide. For young Black Americans—including future leaders like John Lewis and Anne Moody—Till’s murder destroyed any illusion that the South would reform voluntarily, creating an urgent generational imperative to engage in direct action.<br/><br/>However, Interpretation 1 places greater weight on judicial victories, specifically Brown v. Board of Education (1954). Brown was undeniably fundamental because it struck down Plessy v. Ferguson and established the constitutional principle that segregation was illegal under the 14th Amendment. Without Earl Warren’s ruling, grassroots activists would have had no federal legal backing. Furthermore, the Montgomery Bus Boycott (1955–56) provided the tactical blueprint of non-violent economic resistance that Brown lacked.<br/><br/>In conclusion, I agree with Interpretation 2 to a great extent regarding emotional mobilization, but with a crucial qualification. While Brown provided the constitutional justification and Montgomery provided the organizational model, it was the raw, personal horror of Emmett Till’s murder that converted passive outrage into active defiance. As Rosa Parks herself remarked, she thought of Emmett Till on the day she refused to give up her bus seat.',
        examinerNote:
          'Level 4 response (16/16 + 4 SPaG = 20/20). Evaluates both interpretations with rich contextual knowledge (Mamie Till, Jet magazine, John Lewis, Rosa Parks quote, Brown 14th Amendment analysis) and reaches a nuanced, criteria-driven conclusion.',
        pitfallCategory: 'Paper 3 Essay Pitfalls',
        pitfall:
          'Never write an essay that only evaluates Interpretation 2! You must analyze BOTH interpretations with balanced own knowledge and reach an evaluative criteria conclusion.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From White Backlash to Civil Rights Mobilisation',
        steps: [
          {
            stage: '1. Massive Resistance',
            desc: "Southern Manifesto & White Citizens' Councils organize economic & legal obstruction.",
          },
          {
            stage: '2. Till Lynching (1955)',
            desc: 'Emmett Till brutally murdered in Mississippi; killers acquitted in 67 minutes.',
          },
          {
            stage: '3. National Exposure',
            desc: 'Open-casket funeral and Jet magazine photos generate international condemnation.',
          },
          {
            stage: '4. Generational Mobilisation',
            desc: 'Shock radicalizes Black youth, directly inspiring Rosa Parks and student sit-ins.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Emmett Till',
          def: '14-year-old Chicago youth murdered in Money, Mississippi, in August 1955 for whistling at a white woman.',
        },
        {
          term: 'Mamie Till Bradley',
          def: 'Mother of Emmett Till who insisted on an open-casket funeral to expose Southern white violence.',
        },
        {
          term: 'Tallahatchie River',
          def: 'Mississippi river where Emmett Till’s weighted, barbed-wire wrapped body was recovered.',
        },
        {
          term: 'All-White Jury',
          def: 'Jury of 12 white men in Sumner, Mississippi, that acquitted Till’s murderers in 67 minutes.',
        },
        {
          term: 'White Citizens’ Councils',
          def: 'Middle-class segregationist groups formed in 1954 that used economic retaliation against activists.',
        },
        {
          term: 'Economic Retaliation',
          def: 'Firing workers, foreclosing mortgages, and cancelling insurance policies to stop civil rights.',
        },
        {
          term: 'Dixiecrats',
          def: 'Conservative Southern Democrats who opposed civil rights and weaponised the Senate filibuster.',
        },
        {
          term: 'Southern Manifesto',
          def: '1956 document signed by 101 congressmen urging Southern states to resist federal integration.',
        },
        {
          term: 'Strom Thurmond',
          def: 'South Carolina Dixiecrat Senator who conducted a 24-hour filibuster against the 1957 Civil Rights Act.',
        },
        {
          term: 'Ku Klux Klan',
          def: 'Armed white vigilante terrorist organization that carried out bombings and lynchings in the South.',
        },
        {
          term: 'Cross Burning',
          def: 'Terror tactic utilized by the KKK to intimidate Black communities and civil rights workers.',
        },
        {
          term: 'Jet Magazine',
          def: 'African American publication that printed photographs of Emmett Till’s mutilated face.',
        },
      ],
    },
  },
];
