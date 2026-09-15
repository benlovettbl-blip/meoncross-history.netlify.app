/**
 * usa_spreads_kt2.cjs
 *
 * Spreads 5 to 8 for Key Topic 2: Protest, Progress and Radicalism, 1960–75
 * Grounded in Hodder GCSE History for Edexcel (Steve Waugh & John Wright, pp. 28–63)
 *
 * Enforces the Paper 3 4-4-4-4 Question Matrix:
 * - Spread 5 (KT 2.1): inference_causation (Section A: Q1 Inference [4m] + Q2 Explain Why [12m])
 * - Spread 6 (KT 2.2): source_utility (Section B: Q3(a) Utility of Sources B and C [8m])
 * - Spread 7 (KT 2.3): interpretation_diff_why (Section B: Q3(b) Views Diff [4m] + Q3(c) Reasons [4m])
 * - Spread 8 (KT 2.4): interpretation_eval (Section B: Q3(d) Evaluative Essay [16+4m])
 */

module.exports = [
  // =========================================================================
  // SPREAD 5: KT 2.1 — DEVELOPMENTS, 1960–62: SIT-INS, FREEDOM RIDERS, MEREDITH
  // Exam Format: inference_causation (Section A: Q1 [4m] + Q2 [12m])
  // =========================================================================
  {
    id: 'lesson_2_1',
    topic: 'Key Topic 2: Protest, Progress & Radicalism, 1960–75',
    title: 'KT 2.1: Developments 1960–62: Sit-Ins, Freedom Riders & Meredith',
    footerTag: 'KT 2.1: Developments 1960–62',
    left: {
      sectionTag: 'Direct Action Escalation',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1960 and 1962, a new generation of student activists seized the initiative from conservative courtrooms. The Greensboro sit-ins launched non-violent direct action across the South and created SNCC. In 1961, CORE’s Freedom Riders braved KKK firebombings to enforce interstate travel desegregation. In 1962, federal marshals escorted James Meredith onto the Ole Miss campus amid lethal rioting.',
      pillars: [
        {
          title: 'The Greensboro Sit-Ins & SNCC (1960)',
          subtitle: 'Lunch Counter Desegregation',
          bullets: [
            "On 1 Feb 1960, four Black college students sat at the whites-only Woolworth's lunch counter in Greensboro, North Carolina, refusing to leave when refused service.",
            'Within days, hundreds joined; students maintained strict non-violent dignity while white youths poured coffee, extinguished cigarettes on them, and shouted abuse.',
            'The sit-in tactic spread to 55 cities in 13 states; in April 1960, Ella Baker organised student leaders to form **SNCC** (Student Nonviolent Coordinating Committee).',
          ],
        },
        {
          title: 'The Freedom Rides (1961)',
          subtitle: 'Testing Interstate Transit Laws',
          bullets: [
            'In May 1961, **CORE** (led by James Farmer) sent 13 Black and white riders on buses from Washington to New Orleans to test the *Boynton v. Virginia* desegregation ruling.',
            'On Mother’s Day (14 May), an Anniston mob firebombed the bus and held doors shut; riders were viciously beaten with baseball bats in Birmingham as police delayed arrival.',
            'Attorney General Robert Kennedy sent 500 US Marshals; by Nov 1961, the **Interstate Commerce Commission (ICC)** ordered all interstate terminals desegregated.',
          ],
        },
        {
          title: 'The James Meredith Case (1962)',
          subtitle: "Desegregating 'Ole Miss'",
          bullets: [
            'In 1962, Black Air Force veteran **James Meredith** was rejected by the University of Mississippi solely due to race; the Supreme Court ordered his admission.',
            'Governor Ross Barnett personally blocked Meredith, declaring the state would never surrender to federal court orders.',
            'President Kennedy dispatched 500 US Marshals; white supremacist mobs attacked with bricks and gunfire (2 killed, 300 wounded) before 12,000 federal soldiers quelled the riot.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'James Farmer',
          role: 'National Director of CORE; conceived and led the 1961 Freedom Rides to deliberately provoke federal intervention in interstate transport.',
        },
        {
          name: 'Ella Baker',
          role: 'Veteran civil rights organiser who advised student sit-in leaders to remain independent from SCLC, founding SNCC in April 1960.',
        },
        {
          name: 'James Meredith',
          role: 'First Black student admitted to the University of Mississippi (1962); his enrollment broke segregation in higher education in the Deep South.',
        },
        {
          name: 'Ross Barnett',
          role: 'Segregationist Governor of Mississippi who physically defied federal court orders to prevent James Meredith from registering at Ole Miss.',
        },
      ],
      milestones: [
        {
          date: '1 Feb 1960',
          event: 'Four Greensboro students begin Woolworth’s lunch counter sit-in',
        },
        {
          date: '15 Apr 1960',
          event: 'SNCC founded at Shaw University under guidance of Ella Baker',
        },
        { date: '14 May 1961', event: 'Freedom Riders bus firebombed in Anniston, Alabama' },
        {
          date: '1 Nov 1961',
          event: 'ICC officially bans segregation in all interstate bus terminals',
        },
        {
          date: '1 Oct 1962',
          event: 'James Meredith enrolls at Ole Miss following lethal campus riot',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section A: Q1 Inference [4m] & Q2 Explain Why [12m]',
        title: 'Freedom Riders Violence & The Spread of the Sit-In Movement',
        stem: 'Q1 (4m) Inference from Source A &bull; Q2 (12m) Explain why the Greensboro sit-in movement spread so rapidly across the South in 1960.',
        marks: '4 + 12 = 16',
        marksTime: '16 Marks &bull; ~24 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q1 Inference (4m):</strong> Inference 1 + direct quote from Source A on Klan brutality; Inference 2 + direct quote on police complicity.<br/><strong>Q2 Causation (12m - 3 PEE Paragraphs):</strong> (1) Youth frustration with slow NAACP legal progress &rarr; (2) Simplicity and accessibility of non-violent direct action &rarr; (3) Economic effectiveness of consumer boycotts & national media coverage.',
        modelAnswer:
          '<strong>Q1 (Inference):</strong> One inference from Source A is that white supremacists used deadly violence to halt the Freedom Riders. The source states "a firebomb was hurled through the window, and men held the doors shut to burn the riders alive", showing attackers intended to kill passengers. A second inference is that local authorities cooperated with the attackers. The source notes "the police in Birmingham agreed to give the Klan 15 minutes to attack the riders before sending officers", proving police actively facilitated violence.<br/><br/><strong>Q2 (Explain Why):</strong> One primary reason the sit-in movement spread rapidly was intense generational frustration among Black youth with the slow pace of courtroom litigation. Six years after Brown v. Board (1954), deep Southern states were still almost entirely segregated. College students realized that legal challenges took years, whereas sitting at a lunch counter forced an immediate, visible challenge to Jim Crow on day one.<br/><br/>A second reason was the practical simplicity, accessibility, and high moral impact of the sit-in tactic. Any group of students could simply walk into a local department store, sit down with textbooks, and study peacefully. The stark contrast between well-dressed, polite Black students and abusive white mobs pouring sugar and extinguishing cigarettes on them captured television cameras, shaming white store owners into desegregating to protect their commercial profits.',
        examinerNote:
          'Full 16 marks. Q1 gives two distinct inferences supported by verbatim quotes. Q2 provides two analytical, multi-causal paragraphs demonstrating how generational impatience and media dynamics accelerated the spread.',
        pitfallCategory: 'Inference & Multi-Causal Pitfalls',
        pitfall:
          'In Q2, do not simply describe the Greensboro sit-in. The question asks why it SPREAD to 55 cities! Focus on why other students replicated the tactic across the South.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Student Escalation of Direct Action (1960–1962)',
        steps: [
          {
            stage: '1. Greensboro Sit-In',
            desc: 'Four students refuse to leave Woolworth’s lunch counter, triggering regional protests.',
          },
          {
            stage: '2. SNCC Formation',
            desc: 'Ella Baker organizes student leaders into SNCC, coordinating mass youth action.',
          },
          {
            stage: '3. Freedom Rides (1961)',
            desc: 'CORE tests interstate travel; Anniston bus bombing forces federal ICC enforcement.',
          },
          {
            stage: '4. Ole Miss Crisis (1962)',
            desc: 'Kennedy deploys 500 US Marshals to enroll James Meredith against state resistance.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Greensboro Sit-In',
          def: '1960 non-violent protest at a Woolworth’s lunch counter that ignited the student movement.',
        },
        {
          term: 'SNCC',
          def: 'Student Nonviolent Coordinating Committee; grassroots youth group founded in April 1960.',
        },
        {
          term: 'Ella Baker',
          def: 'Executive director of the SCLC who guided students to form an independent SNCC.',
        },
        {
          term: 'Freedom Riders',
          def: 'Activists who rode interstate buses into the segregated South in 1961 to test federal laws.',
        },
        {
          term: 'Anniston Bombing',
          def: 'Attack on 14 May 1961 where a white mob firebombed a Freedom bus in Alabama.',
        },
        {
          term: 'Robert F. Kennedy',
          def: 'US Attorney General who dispatched 500 US Marshals to protect Freedom Riders and Meredith.',
        },
        {
          term: 'ICC',
          def: 'Interstate Commerce Commission; federal agency that ordered transit desegregation in Nov 1961.',
        },
        {
          term: 'James Meredith',
          def: 'First Black student to enroll at the University of Mississippi in October 1962.',
        },
        {
          term: 'Ross Barnett',
          def: 'Governor of Mississippi who attempted to physically block Meredith from entering Ole Miss.',
        },
        {
          term: 'Ole Miss Riot',
          def: 'Campus riot on 30 Sep 1962 leaving 2 dead and 300 injured before troops restored order.',
        },
        {
          term: 'Direct Action',
          def: 'Public demonstrations, strikes, and sit-ins designed to force immediate confrontation.',
        },
        {
          term: 'Boynton v. Virginia',
          def: '1960 Supreme Court ruling declaring segregation in interstate bus terminals unconstitutional.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 6: KT 2.2 — PEACEFUL PROTESTS & THEIR IMPACT, 1963–65
  // Exam Format: source_utility (Section B: Q3(a) [8m])
  // =========================================================================
  {
    id: 'lesson_2_2',
    topic: 'Key Topic 2: Protest, Progress & Radicalism, 1960–75',
    title: 'KT 2.2: Peaceful Protests & Their Impact, 1963–65',
    footerTag: 'KT 2.2: Peaceful Protests 1963–65',
    left: {
      sectionTag: 'Legislative Triumphs',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1963 and 1965, the non-violent civil rights movement reached its zenith. King’s Birmingham campaign and the historic March on Washington galvanized national conscience, compelling President Johnson to sign the landmark Civil Rights Act of 1964. The following year, state troopers’ brutal assault on marchers in Selma spurred the passage of the Voting Rights Act of 1965.',
      pillars: [
        {
          title: 'The Birmingham Campaign (1963)',
          subtitle: 'Project C & The Children’s Crusade',
          bullets: [
            'SCLC targeted Birmingham, Alabama ("Bombingham"), the most segregated major city in America, led by notorious Police Chief **Bull Connor**.',
            'During the **Children’s Crusade** (May 1963), Connor unleashed police dogs and high-pressure fire hoses (100 lbs/sq inch) on child marchers; images horrified the globe.',
            'President John F. Kennedy intervened, stating on national television (11 June 1963) that civil rights was a "moral issue as old as the scriptures", drafting federal legislation.',
          ],
        },
        {
          title: 'March on Washington & Freedom Summer',
          subtitle: 'National Climax & Mississippi Murders',
          bullets: [
            'On 28 August 1963, 250,000 marchers gathered at the Lincoln Memorial; King delivered his historic **"I Have a Dream"** speech, creating irresistible moral momentum.',
            'In 1964, **Freedom Summer** recruited 1,000 college volunteers to open Freedom Schools and register voters in Mississippi, defying white terror.',
            'On 21 June 1964, civil rights workers Michael Schwerner, Andrew Goodman, and James Chaney were murdered by the KKK with complicity of deputy sheriff Cecil Price.',
          ],
        },
        {
          title: 'Civil Rights Act (1964) & Voting Rights Act (1965)',
          subtitle: 'Dismantling Legal Apartheid',
          bullets: [
            '**Civil Rights Act of 1964** (signed 2 July by LBJ) outlawed segregation in all public facilities, banned employment discrimination, and empowered justice officials to enforce integration.',
            'In March 1965, King led marches from Selma to Montgomery; on **"Bloody Sunday"** (7 March), state troopers tear-gassed and clubbed 600 marchers at the Edmund Pettus Bridge.',
            '**Voting Rights Act of 1965** (signed 6 August) outlawed literacy tests and deployed federal registrars; within three years, Black voter registration in the South soared past 60%.',
          ],
        },
      ],
      keyFigures: [
        {
          name: "Eugene 'Bull' Connor",
          role: 'Birmingham Commissioner of Public Safety; ordered police dogs and water cannons against teenage marchers, galvanizing international outrage.',
        },
        {
          name: 'Lyndon B. Johnson',
          role: '36th US President; used his legislative skill and national mourning for JFK to force the Civil Rights Act (1964) and Voting Rights Act (1965) through Congress.',
        },
        {
          name: 'John Lewis',
          role: 'Chairman of SNCC; co-led the march on Bloody Sunday across the Edmund Pettus Bridge in Selma, suffering a fractured skull from state troopers.',
        },
        {
          name: 'A. Philip Randolph',
          role: 'Elder statesman of civil rights and union leader; principal visionary and organiser of the 1963 March on Washington for Jobs and Freedom.',
        },
      ],
      milestones: [
        {
          date: 'May 1963',
          event: 'Bull Connor turns dogs and hoses on child marchers in Birmingham',
        },
        {
          date: '28 Aug 1963',
          event: '250,000 attend March on Washington; King delivers "I Have a Dream"',
        },
        { date: '2 Jul 1964', event: 'President Johnson signs landmark Civil Rights Act of 1964' },
        { date: '7 Mar 1965', event: 'Bloody Sunday at Edmund Pettus Bridge in Selma, Alabama' },
        {
          date: '6 Aug 1965',
          event: 'Voting Rights Act of 1965 signed into law by President Johnson',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(a) Source Utility [8m]',
        title: 'Effectiveness of the Birmingham Campaign (1963)',
        stem: "How useful are Sources B and C for an enquiry into the effectiveness of Martin Luther King's campaign in Birmingham, Alabama, in May 1963? [8 Marks]",
        marks: '8',
        marksTime: '8 Marks &bull; ~14 Mins',
        planningGuideTitle: 'Examiner Planning & Structural Framework (C-O-P Matrix):',
        planningGuide:
          "<strong>Source B:</strong> Content (King explaining tactical deliberate provocation of media) &rarr; Context (Project C planning) &rarr; Provenance (Letter from Birmingham Jail).<br/><strong>Source C:</strong> Content (Bull Connor defending police action against rioters) &rarr; Context (Children's Crusade) &rarr; Provenance (official press statement).<br/><strong>Synthesis:</strong> Evaluate how both sources show how televised confrontation forced federal action.",
        modelAnswer:
          'Source B is useful because its content reveals the conscious tactical philosophy behind the Birmingham campaign. Writing from his prison cell, Dr. King explains that non-violent direct action "seeks to create such a crisis and foster such a tension that a community which has constantly refused to negotiate is forced to confront the issue." From my contextual knowledge, SCLC strategists specifically chose Birmingham ("Bombingham") because they knew Public Safety Commissioner Bull Connor would react with unbridled brutality, creating shocking televised images that would compel President Kennedy to act. The provenance enhances its utility because, as King’s private reflection composed on newspaper margins, it reveals his authentic strategic thinking rather than a public PR statement.<br/><br/>Source C is useful in a different way because it reveals how city segregationists attempted to defend their suppression of the marches. Bull Connor claims that his officers used fire hoses "only to disperse violent mobs who were blocking traffic and violating city injunctions." From my knowledge, Connor ordered high-pressure hoses (powerful enough to strip bark off trees) against unarmed teenage school children in the "Children\'s Crusade". The provenance as Connor’s official press release makes it valuable for studying the defensive propaganda used by Southern authorities to deflect national outrage.<br/><br/>Overall, both sources are highly useful together: Source B exposes the deliberate strategy of non-violent crisis creation, while Source C demonstrates how the city authorities played directly into King’s hands by using excessive, televised violence.',
        examinerNote:
          'Full 8 marks (Level 3). Evaluates Content, Contextual Knowledge, and Provenance (author, motive, form) for both sources, culminating in an integrated comparative judgement on tactical success.',
        pitfallCategory: 'Source Utility Traps',
        pitfall:
          'Never evaluate sources in isolation! Compare how Source B (activist strategy) and Source C (authoritarian reaction) combine to explain why Birmingham succeeded.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From Street Confrontation to Federal Civil Rights Acts',
        steps: [
          {
            stage: '1. Birmingham (1963)',
            desc: 'Televised brutality against child marchers shames JFK into drafting civil rights legislation.',
          },
          {
            stage: '2. March on Washington',
            desc: '250,000 citizens demonstrate interracial solidarity; King delivers "I Have a Dream".',
          },
          {
            stage: '3. 1964 Act Passed',
            desc: "LBJ leverages Kennedy's legacy to sign the Civil Rights Act, abolishing Jim Crow.",
          },
          {
            stage: '4. Selma & 1965 Act',
            desc: 'Bloody Sunday televised violence forces Congress to pass Voting Rights Act.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Project C',
          def: 'SCLC codename ("Confrontation") for the 1963 non-violent campaign in Birmingham, Alabama.',
        },
        {
          term: 'Children’s Crusade',
          def: 'Controversial 1963 march of thousands of school students in Birmingham targeted by police dogs.',
        },
        {
          term: 'Letter from Birmingham Jail',
          def: 'MLK’s famous 1963 theological defense of civil disobedience against unjust laws.',
        },
        {
          term: 'March on Washington',
          def: 'Mass gathering of 250,000 on 28 Aug 1963 demanding federal civil rights legislation.',
        },
        {
          term: 'Freedom Summer',
          def: '1964 voter registration drive in Mississippi that established Freedom Schools.',
        },
        {
          term: 'Mississippi Murders',
          def: 'The 1964 KKK murders of activists James Chaney, Andrew Goodman, and Michael Schwerner.',
        },
        {
          term: 'Civil Rights Act 1964',
          def: 'Historic federal legislation outlawing segregation in public facilities and employment.',
        },
        {
          term: 'Selma to Montgomery',
          def: '54-mile protest marches in March 1965 demanding voting rights for Black citizens in Alabama.',
        },
        {
          term: 'Bloody Sunday',
          def: '7 March 1965 assault by Alabama state troopers on peaceful marchers at Edmund Pettus Bridge.',
        },
        {
          term: 'Voting Rights Act 1965',
          def: 'Federal law banning literacy tests and placing voter registration under federal supervision.',
        },
        {
          term: 'Edmund Pettus Bridge',
          def: 'Bridge in Selma where John Lewis and 600 marchers were clubbed and tear-gassed.',
        },
        {
          term: 'Lyndon B. Johnson',
          def: 'US President whose political mastery forced the 1964 and 1965 Civil Rights Acts through Congress.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 7: KT 2.3 — MALCOLM X & BLACK POWER, 1963–70
  // Exam Format: interpretation_diff_why (Section B: Q3(b) [4m] + Q3(c) [4m])
  // =========================================================================
  {
    id: 'lesson_2_3',
    topic: 'Key Topic 2: Protest, Progress & Radicalism, 1960–75',
    title: 'KT 2.3: Malcolm X & Black Power, 1963–70',
    footerTag: 'KT 2.3: Malcolm X & Black Power',
    left: {
      sectionTag: 'Radical Transformation',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'By the mid-1960s, younger activists grew frustrated with non-violent passivity and persistent urban poverty. Malcolm X championed Black nationalism and armed self-defense. Following his 1965 assassination, Stokely Carmichael popularised "Black Power", while Huey Newton and Bobby Seale formed the Black Panther Party in Oakland, combining armed police patrols with community survival programs.',
      pillars: [
        {
          title: 'Malcolm X & The Nation of Islam',
          subtitle: 'Racial Pride & Armed Self-Defense',
          bullets: [
            'Malcolm X joined the **Nation of Islam (Black Muslims)** in prison, rejecting King’s integration as "begging the white man" and advocating Black separatism and self-respect.',
            'He asserted the right of Black Americans to defend themselves "by any means necessary", arguing non-violence disarmed victims while white mobs went unpunished.',
            'After breaking with Elijah Muhammad and completing the Hajj pilgrimage to Mecca in 1964, he embraced interracial brotherhood before being assassinated on 21 Feb 1965.',
          ],
        },
        {
          title: 'The Emergence of Black Power (1966)',
          subtitle: 'Stokely Carmichael & The 1968 Olympics',
          bullets: [
            'During the June 1966 March Against Fear in Mississippi, SNCC leader **Stokely Carmichael** rejected non-violence and coined the thunderous slogan **"Black Power"**.',
            'Black Power urged African Americans to build their own economic institutions, reject white standards of beauty ("Black is Beautiful"), and demand political autonomy.',
            'At the 1968 Mexico Olympics, 200m medalists **Tommie Smith and John Carlos** bowed their heads and raised black-gloved fists on the podium, catapulting the movement worldwide.',
          ],
        },
        {
          title: 'The Black Panther Party (1966–70)',
          subtitle: 'Ten-Point Program & Survival Programs',
          bullets: [
            'Founded in Oakland (Oct 1966) by **Huey Newton and Bobby Seale**, the Black Panthers adopted berets, leather jackets, and loaded weapons to monitor police brutality.',
            'Their **Ten-Point Program** demanded full employment, decent housing, exemption from the Vietnam draft, and an end to racist police terror.',
            'They ran **Community Survival Programs**: feeding 10,000 children daily in the Free Breakfast Program, running medical clinics, and providing sickle cell anemia screening.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Malcolm X',
          role: 'Charismatic spokesperson for Black nationalism; inspired Black Power through his emphasis on self-defense, racial dignity, and pan-African unity.',
        },
        {
          name: 'Stokely Carmichael',
          role: 'SNCC chairman who radicalised the movement in 1966 with the "Black Power" slogan, expelling white members to pursue Black self-determination.',
        },
        {
          name: 'Huey P. Newton',
          role: 'Co-founder and Minister of Defense of the Black Panther Party; developed armed "copwatching" patrols and the socialist Ten-Point Program.',
        },
        {
          name: 'Bobby Seale',
          role: 'Co-founder and Chairman of the Black Panthers; organised community health clinics and ran for Mayor of Oakland in 1973.',
        },
      ],
      milestones: [
        {
          date: '8 Mar 1964',
          event: 'Malcolm X breaks with Nation of Islam to form Muslim Mosque, Inc.',
        },
        {
          date: '21 Feb 1965',
          event: 'Malcolm X assassinated in Harlem by Nation of Islam gunmen',
        },
        {
          date: '16 Jun 1966',
          event: 'Stokely Carmichael first uses "Black Power" slogan in Greenwood',
        },
        {
          date: '15 Oct 1966',
          event: 'Black Panther Party for Self-Defense founded in Oakland, California',
        },
        {
          date: '16 Oct 1968',
          event: 'Tommie Smith & John Carlos raise Black Power salute at Mexico Olympics',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(b) & Q3(c) Historians’ Views [8m]',
        title: 'The Nature and Impact of the Black Panther Party',
        stem: 'Study Interpretations 1 and 2. (b) What is the main difference between the views? [4m] &bull; (c) Suggest one reason why they differ. [4m]',
        marks: '4 + 4 = 8',
        marksTime: '8 Marks &bull; ~14 Mins Total',
        planningGuideTitle: 'Examiner Planning & Structural Framework:',
        planningGuide:
          '<strong>Q3(b) Views Difference (4m):</strong> Contrast Interpretation 1 (viewing Panthers as violent, armed extremists who alienated white support) with Interpretation 2 (viewing Panthers as community defenders running socialist welfare programs).<br/><strong>Q3(c) Reason for Difference (4m):</strong> Explain how Historian 1 relied on FBI COINTELPRO records and sensationalist media, whereas Historian 2 investigated Oakland grassroots oral histories and Free Breakfast records.',
        modelAnswer:
          '<strong>Q3(b) Main Difference in Views:</strong> The main difference is that Interpretation 1 views the Black Panthers as a dangerous, paramilitary organization that promoted violence and alienated moderate support, whereas Interpretation 2 views them as a vital community-led movement providing social survival programs. Interpretation 1 emphasizes that the Panthers "carried loaded rifles through state capitols, engaged in gun battles with police, and frightened white allies with revolutionary Marxist rhetoric." In contrast, Interpretation 2 stresses that "their primary legacy lay in community empowerment, providing free breakfasts to 10,000 school children daily and operating medical clinics in impoverished Black neighborhoods."<br/><br/><strong>Q3(c) Reason for Difference:</strong> One reason the interpretations differ is that the two historians investigated entirely different bodies of historical evidence. Historian 1 drew primarily on contemporary FBI surveillance files (J. Edgar Hoover’s COINTELPRO) and sensationalist white television reports, which focused overwhelmingly on armed shootouts and criminal trials. Conversely, Historian 2 examined local community archives in Oakland and oral testimonies from ordinary Black mothers and children who benefited directly from the Free Breakfast for Children and sickle cell screening programs.',
        examinerNote:
          'Full 8 marks. 3(b) accurately identifies the conceptual divergence (violent militants vs social welfare providers) with supporting evidence. 3(c) explains how differing evidence (FBI records vs community welfare files) generated the conflicting viewpoints.',
        pitfallCategory: 'Interpretation Difference Pitfalls',
        pitfall:
          "Do not summarize the Black Panthers' history in Q3(c)! You must specifically explain WHY the two historians reached opposing verdicts based on their evidence or focus.",
      },
      causalPathway: {
        title: 'Visual Causal Pathway: The Evolution of Black Power & Radicalism',
        steps: [
          {
            stage: '1. Malcolm X Critique',
            desc: 'Malcolm X challenges non-violent integration, promoting armed self-defense and Black pride.',
          },
          {
            stage: '2. SNCC Radicalisation',
            desc: 'Stokely Carmichael popularizes "Black Power" amid frustration with unpunished white violence.',
          },
          {
            stage: '3. Black Panther Party',
            desc: 'Oakland Panthers combine armed patrols against police brutality with welfare programs.',
          },
          {
            stage: '4. State Repression',
            desc: 'FBI COINTELPRO infiltrates and disrupts the Panthers, assassinating key leaders.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Malcolm X',
          def: 'Black nationalist leader who rejected non-violence and championed racial dignity and self-defense.',
        },
        {
          term: 'Nation of Islam',
          def: 'Religious group led by Elijah Muhammad advocating Black separatism and Islamic teachings.',
        },
        {
          term: 'By Any Means Necessary',
          def: 'Famous phrase coined by Malcolm X asserting the right to self-defense against terror.',
        },
        {
          term: 'Stokely Carmichael',
          def: 'SNCC chairman who coined the slogan "Black Power" during the 1966 March Against Fear.',
        },
        {
          term: 'Black Power',
          def: 'Movement emphasizing Black pride, economic self-reliance, and independent political action.',
        },
        {
          term: 'Black Panther Party',
          def: 'Revolutionary socialist organization founded in 1966 in Oakland by Newton and Seale.',
        },
        {
          term: 'Ten-Point Program',
          def: 'The core political manifesto of the Black Panthers demanding employment, housing, and justice.',
        },
        {
          term: 'Free Breakfast Program',
          def: 'Pioneering Black Panther welfare initiative feeding thousands of poor urban school children.',
        },
        {
          term: 'Huey P. Newton',
          def: 'Co-founder and chief political theorist of the Black Panther Party for Self-Defense.',
        },
        {
          term: 'Bobby Seale',
          def: 'Chairman of the Black Panthers who co-authored the Ten-Point Program with Huey Newton.',
        },
        {
          term: '1968 Mexico Olympics',
          def: 'Games where US sprinters Tommie Smith and John Carlos raised gloved fists for Black Power.',
        },
        {
          term: 'COINTELPRO',
          def: 'Covert FBI counterintelligence program that targeted, infiltrated, and destroyed Black radical groups.',
        },
      ],
    },
  },

  // =========================================================================
  // SPREAD 8: KT 2.4 — THE CIVIL RIGHTS MOVEMENT, 1965–75
  // Exam Format: interpretation_eval (Section B: Q3(d) [16+4m])
  // =========================================================================
  {
    id: 'lesson_2_4',
    topic: 'Key Topic 2: Protest, Progress & Radicalism, 1960–75',
    title: 'KT 2.4: The Civil Rights Movement, 1965–75: Riots, Kerner & Legacy',
    footerTag: 'KT 2.4: Civil Rights Movement 1965–75',
    left: {
      sectionTag: 'Ghettos & Assassination',
      contextTitle: 'Strategic Context & Geopolitical Overview',
      summary:
        'Between 1965 and 1975, the civil rights struggle shifted from legal desegregation in the South to entrenched economic inequality and police brutality in northern urban ghettos. Explosive riots in Watts, Newark, and Detroit led to the 1968 Kerner Report’s stark warning. The assassination of Martin Luther King Jr. in 1968 shattered the non-violent coalition, leaving a complex legacy of major political gains alongside enduring economic division.',
      pillars: [
        {
          title: 'The Long Hot Summers: Urban Riots (1965–67)',
          subtitle: 'Ghettos, Poverty & Police Brutality',
          bullets: [
            'Just five days after the Voting Rights Act passed, the **Watts Riot** erupted in Los Angeles (Aug 1965); 34 were killed and 1,000 injured during six days of burning.',
            'Between 1965 and 1967, over 250 race riots erupted in northern and western cities, most severely in **Newark** (26 dead, 1967) and **Detroit** (43 dead, 1967).',
            'Riots were triggered by routine police traffic stops but fueled by deep structural grievances: slum housing, 30% youth unemployment, and underfunded schools.',
          ],
        },
        {
          title: 'The Kerner Report & King in the North',
          subtitle: 'The Chicago Campaign & Systemic Racism',
          bullets: [
            'In 1966, King launched the **Chicago Freedom Movement** against slum housing; during a march in Marquette Park, he was hit by a rock, noting northern whites were more hateful than in Mississippi.',
            'President Johnson’s **Kerner Commission (1968)** concluded: *"Our nation is moving toward two societies, one black, one white—separate and unequal."*',
            'The report blamed white racism for ghetto poverty and recommended massive federal investment, but Johnson buried the report due to soaring Vietnam War costs.',
          ],
        },
        {
          title: 'Assassination of MLK & Progress by 1975',
          subtitle: 'Memphis, Fair Housing & The Balance Sheet',
          bullets: [
            'On 4 April 1968, **Martin Luther King Jr. was assassinated** in Memphis, Tennessee, by James Earl Ray; riots erupted in over 100 cities leaving 46 dead.',
            'In response, Congress swiftly passed the **Civil Rights Act of 1968 (Fair Housing Act)**, outlawing racial discrimination in the sale or rental of housing.',
            'By 1975, legal segregation was eliminated, Black voter registration exceeded 60%, and Black mayors led major cities (Los Angeles, Atlanta, Detroit); yet deep economic inequalities persisted.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Otto Kerner Jr.',
          role: 'Governor of Illinois and chairman of the National Advisory Commission on Civil Disorders that produced the landmark 1968 Kerner Report.',
        },
        {
          name: 'James Earl Ray',
          role: 'Fugitive white supremacist who assassinated Dr. Martin Luther King Jr. on the balcony of the Lorraine Motel in Memphis on 4 April 1968.',
        },
        {
          name: 'Tom Bradley',
          role: 'Former police officer elected as the first African American Mayor of Los Angeles in 1973, symbolising dramatic Black political progress.',
        },
        {
          name: 'Maynard Jackson',
          role: 'Elected as the first African American Mayor of Atlanta in 1973, reflecting the transformative power of the Voting Rights Act of 1965.',
        },
      ],
      milestones: [
        {
          date: '11 Aug 1965',
          event: 'Watts riots erupt in Los Angeles leaving 34 dead and $40m damage',
        },
        {
          date: '23 Jul 1967',
          event: 'Detroit riot begins; 43 killed as federal tanks patrol city streets',
        },
        {
          date: '29 Feb 1968',
          event: 'Kerner Report warns America is dividing into two unequal societies',
        },
        { date: '4 Apr 1968', event: 'Martin Luther King Jr. assassinated in Memphis, Tennessee' },
        {
          date: '11 Apr 1968',
          event: 'President Johnson signs Civil Rights Act of 1968 (Fair Housing Act)',
        },
      ],
    },
    right: {
      question: {
        typeHeader: 'Section B: Q3(d) Evaluative Essay [16+4m]',
        title: 'Extent of Civil Rights Progress by 1975',
        stem: 'How far do you agree with Interpretation 1 that the civil rights movement had achieved fundamental success in transforming the lives of Black Americans by 1975? [16+4 SPaG Marks]',
        marks: '16 + 4',
        marksTime: '20 Marks &bull; ~25 Mins',
        planningGuideTitle: 'Examiner Planning & Structural Framework (Criteria-Led Essay):',
        planningGuide:
          '<strong>Paragraph 1 (Agree with Int 1):</strong> Evaluate legal and political transformation (Civil Rights Act 1964, Voting Rights Act 1965, Fair Housing Act 1968, Black mayors elected in major cities).<br/><strong>Paragraph 2 (Evaluate Int 2 - Counter):</strong> Evaluate persistent economic inequalities (urban ghetto poverty, de facto housing segregation, Watts/Detroit riots, Kerner Report findings).<br/><strong>Conclusion:</strong> Reach a criteria-driven verdict: Total success in dismantling de jure legal apartheid, but limited success in eradicating de facto economic inequality.',
        modelAnswer:
          'Interpretation 1 argues that the civil rights movement achieved fundamental success by 1975, transforming the legal and political landscape of the United States. There is compelling historical evidence to substantiate this view. The movement completely dismantled the century-old system of Southern de jure apartheid. Landmark federal statutes—the Civil Rights Act of 1964, the Voting Rights Act of 1965, and the Fair Housing Act of 1968—permanently outlawed Jim Crow segregation in public accommodations, employment, and housing. Furthermore, the political empowerment of Black Americans was transformative: protected by federal registrars, Black voter registration in Mississippi jumped from under 7% in 1964 to over 60% by 1970. This democratic enfranchisement led directly to the election of Black mayors in major metropolitan centers, including Tom Bradley in Los Angeles (1973) and Maynard Jackson in Atlanta (1973).<br/><br/>Conversely, Interpretation 2 emphasizes the severe limitations of this progress, asserting that economic inequality and systemic racism remained deeply entrenched. As Dr. King discovered during his 1966 Chicago campaign, civil rights legislation did nothing to alleviate northern de facto segregation, predatory slum landlords, or systemic employment discrimination. The explosive "Long Hot Summers"—with devastating riots in Watts (1965), Newark (1967), and Detroit (1967)—reflected immense grassroots despair. The federal Kerner Commission (1968) confirmed this grim reality, concluding that the nation was dividing into "two societies, one black, one white—separate and unequal." By 1975, Black unemployment remained double that of whites, and white flight to suburbs left inner-city schools chronically segregated.<br/><br/>In conclusion, I agree with Interpretation 1 regarding constitutional and political rights, but agree with Interpretation 2 regarding economic and social equality. The movement succeeded completely in abolishing legal segregation and establishing political enfranchisement, but it fundamentally failed to dismantle the structural poverty of northern urban ghettos.',
        examinerNote:
          'Level 4 response (16/16 + 4 SPaG = 20/20). Masterfully balances the legal/political achievements against northern economic realities with precise factual deployment (Kerner Report, Detroit/Watts, Voting Rights percentages, Bradley/Jackson mayors).',
        pitfallCategory: 'Paper 3 Essay Pitfalls',
        pitfall:
          'Do not make a sweeping, one-sided claim that civil rights was "a total triumph" or "a total failure". Establish a clear distinction between legal/political success versus socio-economic stagnation.',
      },
      causalPathway: {
        title: 'Visual Causal Pathway: From Legislative Breakthrough to Economic Friction',
        steps: [
          {
            stage: '1. Legislative Peak (1964–65)',
            desc: 'Civil Rights and Voting Rights Acts eliminate legal Jim Crow apartheid.',
          },
          {
            stage: '2. Urban Explosion (1965–67)',
            desc: 'Northern ghetto riots erupt over slum conditions, unemployment, and police brutality.',
          },
          {
            stage: '3. King’s Northern Push',
            desc: 'MLK challenges Chicago slums; Kerner Report warns of two separate, unequal societies.',
          },
          {
            stage: '4. Mixed Legacy by 1975',
            desc: 'Unprecedented Black political representation emerges alongside persistent economic poverty.',
          },
        ],
      },
      wordBank: [
        {
          term: 'Watts Riots',
          def: 'Six-day August 1965 civil rebellion in Los Angeles leaving 34 dead and $40m in damage.',
        },
        {
          term: 'Long Hot Summers',
          def: 'Series of explosive urban race riots across northern cities between 1965 and 1967.',
        },
        {
          term: 'Kerner Report',
          def: '1968 presidential report concluding America was moving toward two separate, unequal societies.',
        },
        {
          term: 'Chicago Movement',
          def: '1966 SCLC campaign against housing discrimination and slums in the urban North.',
        },
        {
          term: 'Fair Housing Act 1968',
          def: 'Title VIII of the Civil Rights Act of 1968 prohibiting racial discrimination in housing.',
        },
        {
          term: 'James Earl Ray',
          def: 'White supremacist convict who assassinated Martin Luther King Jr. in Memphis on 4 April 1968.',
        },
        {
          term: 'De Facto Segregation',
          def: 'Racial segregation maintained by residential housing patterns rather than explicit state laws.',
        },
        {
          term: 'White Flight',
          def: 'Mass demographic migration of middle-class white Americans from cities to suburbs in the 1960s/70s.',
        },
        {
          term: 'Tom Bradley',
          def: 'Elected in 1973 as the first African American Mayor of Los Angeles, serving for 20 years.',
        },
        {
          term: 'Maynard Jackson',
          def: 'Elected in 1973 as the first Black Mayor of Atlanta, Georgia, transforming city contracts.',
        },
        {
          term: 'Ghettoisation',
          def: 'Concentration of impoverished minority groups into neglected inner-city urban neighborhoods.',
        },
        {
          term: 'Civil Rights Act 1968',
          def: 'Federal law passed days after King’s assassination outlawing housing discrimination.',
        },
      ],
    },
  },
];
