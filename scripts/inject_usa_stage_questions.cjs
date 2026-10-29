/**
 * scripts/inject_usa_stage_questions.cjs
 *
 * Injects standardized 5-Stage Chronological Inquiry Spines and examiner-calibrated
 * enquiry questions across all 16 lessons of Edexcel GCSE Paper 3: The USA, 1954–1975.
 *
 * Conforms strictly to:
 * - src/engine/stage_schema.js
 * - scripts/verify_stage_question_schema.cjs
 * - Zero AI corporate buzzwords policy
 * - 100% thematic alignment between lesson narrative and causal domino stages
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'units', 'usa', 'data.js');
const PUBLIC_FILE = path.join(ROOT_DIR, 'public', 'units', 'usa', 'data.js');

const USA_16_LESSON_SPINES = [
  // =========================================================================
  // KEY TOPIC 1: THE DEVELOPMENT OF THE CIVIL RIGHTS MOVEMENT, 1954–60
  // =========================================================================

  // Lesson 1 (KT 1.1)
  {
    lessonId: 'lesson_1_1',
    title: 'Segregation & Disenfranchisement in the Early 1950s: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Trace how constitutional doctrine institutionalised white supremacy and provoked organised legal and direct action challenges.',
    stages: [
      {
        step: 1,
        date: '1896',
        title: 'The Plessy v. Ferguson Precedent',
        actor: 'US Supreme Court',
        tag: 'Constitutional Legitimation',
        trigger:
          "The US Supreme Court rules in Plessy v. Ferguson that racial segregation is constitutional under the 'separate but equal' doctrine.",
        because:
          'Southern states sought legal immunity from federal intervention after Reconstruction ended to reassert white political and social dominance.',
        therefore:
          'Gave Southern state governments legal authority to pass comprehensive Jim Crow statutes segregating all public spaces.',
        connective:
          'With segregation enshrined in constitutional law, Southern states systematically stripped Black citizens of their political power...',
        exam_link:
          'Significance: Established the legal foundation of segregation that the civil rights movement had to overturn.',
        question:
          'How did the 1896 Plessy v. Ferguson ruling legally entrench racial segregation across the American South?',
      },
      {
        step: 2,
        date: '1900–1950',
        title: 'Institutionalisation of Jim Crow',
        actor: 'Southern State Legislatures',
        tag: 'Legalised Inequality',
        trigger:
          'Southern legislatures pass comprehensive Jim Crow codes segregating trains, buses, schools, hospitals, parks, and cemeteries.',
        because:
          'White segregationists sought to prevent any social or economic equality between Black and white citizens.',
        therefore:
          'Black Americans were relegated to inferior public services, substandard schools, and humiliating daily subordination.',
        connective:
          'Economic and social subjugation was reinforced by total exclusion from the ballot box...',
        exam_link:
          'Significance: Created a dual society where public facilities for Black citizens were drastically underfunded and degraded.',
        question:
          'In what ways did Jim Crow laws enforce daily economic, social, and physical subordination for Black Southerners?',
      },
      {
        step: 3,
        date: '1910–1950',
        title: 'Systematic Voter Disenfranchisement',
        actor: 'Southern Registrars & Vigilantes',
        tag: 'Political Exclusion',
        trigger:
          'County registrars enforce discriminatory literacy tests, exorbitant poll taxes, and white primaries backed by KKK terror.',
        because:
          'White politicians feared that Black voting majorities in rural counties would unseat segregationist sheriffs and judges.',
        therefore:
          'Fewer than 5% of eligible Black citizens were registered to vote across the Deep South, leaving them powerless to change discriminatory laws.',
        connective:
          'Faced with completely blocked political avenues, civil rights leaders turned to the federal judicial system...',
        exam_link:
          'Significance: Ensured that southern courts, sheriffs, and politicians remained entirely white and committed to segregation.',
        question:
          'Why did discriminatory voting restrictions leave Black Americans virtually powerless to challenge Southern segregation?',
      },
      {
        step: 4,
        date: '1909–1940s',
        title: 'Formation of NAACP Legal Defense',
        actor: 'NAACP Legal Team',
        tag: 'Judicial Strategy',
        trigger:
          'The NAACP establishes its Legal Defense Fund under Thurgood Marshall to systematically challenge the inequality of segregated facilities in federal court.',
        because:
          'State legislatures and Congress were paralyzed by Southern filibusters, making the federal courts the only viable path to reform.',
        therefore:
          'Won key legal victories proving that separate graduate and law schools were inherently unequal, laying the groundwork to attack school segregation.',
        connective:
          'Alongside legal litigation, grassroots activists pioneered direct confrontation...',
        exam_link:
          'Significance: Built the courtroom jurisprudence that directly dismantled Plessy v. Ferguson in 1954.',
        question:
          "How did the NAACP's legal strategy lay the groundwork for dismantling the 'separate but equal' doctrine in federal courts?",
      },
      {
        step: 5,
        date: '1942–1954',
        title: 'Emergence of Non-Violent Direct Action',
        actor: 'CORE Activists',
        tag: 'Grassroots Resistance',
        trigger:
          'CORE organizes the 1947 Journey of Reconciliation and early restaurant sit-ins to expose the failure to enforce interstate desegregation rulings.',
        because:
          'Activists recognized that courtroom rulings alone were ignored by Southern officials unless compelled by public direct action.',
        therefore:
          'Pioneered Gandhian non-violent protest techniques that would define the mass civil rights campaigns of the late 1950s and 1960s.',
        connective:
          'These dual prongs of courtroom litigation and direct action converged into the historic school desegregation crisis of 1954...',
        exam_link:
          'Significance: Established the moral power and tactical framework of non-violent resistance for the entire civil rights era.',
        question:
          'Why did early non-violent direct action by CORE mark an important tactical shift from courtroom litigation?',
      },
    ],
  },

  // Lesson 2 (KT 1.2)
  {
    lessonId: 'lesson_1_2',
    title: 'Desegregation in Education & Southern Defiance: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Assess how federal judicial intervention triggered massive Southern resistance and forced executive military enforcement.',
    stages: [
      {
        step: 1,
        date: 'May 1954',
        title: 'The Brown v. Board Ruling',
        actor: 'Supreme Court under Earl Warren',
        tag: 'Judicial Breakthrough',
        trigger:
          'The Supreme Court rules 9-0 in Brown v. Board that segregated schools are inherently unequal and generate feelings of inferiority.',
        because:
          "Chief Justice Warren forged a unanimous consensus that state-mandated separation damaged Black children's psychological development.",
        therefore:
          'Overturned Plessy v. Ferguson in public education and legally outlawed state-sponsored school segregation nationwide.',
        connective:
          'However, without a strict timetable, Southern white officials organized massive resistance...',
        exam_link:
          'Significance: Established the decisive constitutional precedent that all state-enforced racial segregation was illegal.',
        question:
          'Why was the 1954 Brown v. Board of Education decision a landmark turning point in the legal struggle against segregation?',
      },
      {
        step: 2,
        date: '1955–1956',
        title: 'Southern Massive Resistance',
        actor: 'Southern Governors & Legislators',
        tag: 'State Nullification',
        trigger:
          'Southern politicians sign the Southern Manifesto and pass laws cutting off state funding to any school district that attempts integration.',
        because:
          "White Southern leaders believed the federal Supreme Court had overstepped its constitutional authority and infringed states' rights.",
        therefore:
          'Virtually zero schools in the Deep South were integrated in the three years following the Brown decision.',
        connective:
          'This intransigence created a direct constitutional showdown at Central High School in Little Rock...',
        exam_link:
          'Significance: Demonstrated the immense resistance of Southern state governments to federal civil rights rulings.',
        question:
          "How did Southern political leaders organize 'Massive Resistance' to block court-ordered school integration?",
      },
      {
        step: 3,
        date: 'September 1957',
        title: 'Faubus Blocks the Little Rock Nine',
        actor: 'Governor Orval Faubus',
        tag: 'Gubernatorial Defiance',
        trigger:
          'Governor Faubus surrounds Central High School with the Arkansas National Guard, turning away the Little Rock Nine to appease racist mobs.',
        because:
          'Faubus faced a tough re-election campaign and sought to secure the white segregationist vote.',
        therefore:
          'Created a direct confrontation between state authority and the federal Constitution broadcast live on international television.',
        connective:
          'This open defiance forced the federal government to intervene with military power...',
        exam_link:
          'Significance: Transformed school desegregation into a national and international Cold War crisis for the White House.',
        question:
          'Why did Governor Orval Faubus deploy the Arkansas National Guard to surround Little Rock Central High School?',
      },
      {
        step: 4,
        date: 'September 1957',
        title: 'Eisenhower Deploys the 101st Airborne',
        actor: 'President Dwight D. Eisenhower',
        tag: 'Federal Intervention',
        trigger:
          'President Eisenhower federalizes the Arkansas National Guard and sends 1,000 paratroopers of the 101st Airborne Division to Little Rock.',
        because:
          'Eisenhower was compelled to uphold federal court authority against armed state insubordination before global allies and enemies.',
        therefore:
          'Paratroopers escorted the nine Black students into Central High School at bayonet point, protecting them from violent crowds.',
        connective:
          'Yet Southern resistance did not end with federal troops occupying the school...',
        exam_link:
          'Significance: Proved the federal executive would use military force to uphold federal court desegregation orders.',
        question:
          "How did President Eisenhower's deployment of the 101st Airborne Division demonstrate federal supremacy over state defiance?",
      },
      {
        step: 5,
        date: '1958–1959',
        title: 'The Lost Year in Little Rock',
        actor: 'Governor Faubus & School Board',
        tag: 'Educational Sacrifice',
        trigger:
          'Governor Faubus closes all four Little Rock high schools for an entire academic year to prevent further court-ordered integration.',
        because:
          'Segregationists preferred shutting down public education entirely rather than permitting integrated classrooms.',
        therefore:
          'Demonstrated that Southern states would sacrifice public education itself to preserve racial segregation.',
        connective:
          'The limits of courtroom decrees convinced activists that mass direct action was required...',
        exam_link:
          'Significance: Highlighted that federal legal victories required persistent local activism and enforcement.',
        question:
          "What did the closure of Little Rock high schools during the 'Lost Year' reveal about the limits of initial desegregation?",
      },
    ],
  },

  // Lesson 3 (KT 1.3)
  {
    lessonId: 'lesson_1_3',
    title: 'The Montgomery Bus Boycott & Grassroots Mobilisation: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Explain how local courage, community organization, and economic leverage forced federal legal desegregation.',
    stages: [
      {
        step: 1,
        date: '1 December 1955',
        title: 'The Arrest of Rosa Parks',
        actor: 'Rosa Parks & Montgomery Police',
        tag: 'Catalytic Direct Action',
        trigger:
          'Rosa Parks refuses to surrender her seat on a segregated Montgomery bus, triggering her arrest under city segregation ordinances.',
        because:
          'Parks was an experienced NAACP secretary chosen by community organizers as a respected figure with unimpeachable character.',
        therefore:
          "Provided the Women's Political Council and local ministers with the ideal legal test case to challenge bus segregation.",
        connective:
          'Within hours, church and civic leaders mobilized the entire Black community...',
        exam_link:
          'Significance: Served as the spark that transformed isolated legal challenges into a mass community-wide movement.',
        question:
          "Why was Rosa Parks' deliberate refusal to give up her seat the ideal catalyst to spark a citywide bus boycott?",
      },
      {
        step: 2,
        date: '5 December 1955',
        title: 'Founding of the MIA & Boycott Launch',
        actor: 'Martin Luther King Jr. & MIA',
        tag: 'Charismatic Leadership',
        trigger:
          'Local Black leaders form the Montgomery Improvement Association (MIA) and elect 26-year-old pastor Dr Martin Luther King Jr. as president.',
        because:
          'King was a dynamic orator new to Montgomery whose theological eloquence could unify diverse church congregations.',
        therefore:
          "Unified Montgomery's 50,000 Black citizens behind sustained non-violent civil disobedience and articulate moral leadership.",
        connective:
          'To make the boycott viable over months, an alternative transportation infrastructure was essential...',
        exam_link:
          'Significance: Brought Dr Martin Luther King Jr. onto the national stage as the foremost leader of non-violent protest.',
        question:
          'How did the formation of the Montgomery Improvement Association (MIA) unite the local Black community behind sustained protest?',
      },
      {
        step: 3,
        date: '1955–1956',
        title: 'The 381-Day Carpool Operation',
        actor: 'Black Church Network & Volunteers',
        tag: 'Economic & Logistical Leverage',
        trigger:
          'The MIA organizes a complex, highly efficient carpool system using hundreds of private cars and church station wagons.',
        because:
          'Boycotters needed dependable daily transit to reach domestic, service, and industrial jobs across the city.',
        therefore:
          'Sustained the boycott for 381 consecutive days, depriving the municipal bus company of 65% of its daily passenger revenue.',
        connective:
          'Economic pressure paralyzed the bus company, but municipal authorities refused to surrender until federal courts ruled...',
        exam_link:
          'Significance: Proved the organizational sophistication and economic leverage of the Black community.',
        question:
          'How did the community-run carpool network enable 50,000 citizens to sustain the boycott for over a year?',
      },
      {
        step: 4,
        date: '13 November 1956',
        title: 'Browder v. Gayle Supreme Court Ruling',
        actor: 'US Supreme Court',
        tag: 'Judicial Desegregation',
        trigger:
          "The Supreme Court affirms Browder v. Gayle, ruling that segregated bus transportation violates the 14th Amendment's Equal Protection Clause.",
        because:
          'The court extended the principle of Brown v. Board from schools to municipal public transportation systems.',
        therefore:
          'Provided federal constitutional backing that overrode Alabama state and municipal bus segregation laws.',
        connective:
          'With federal injunctions served, segregationist officials were legally forced to concede...',
        exam_link:
          'Significance: Established the legal requirement that municipal public transit must be integrated across the nation.',
        question:
          'Why was the Browder v. Gayle Supreme Court ruling decisive in ending segregated public transit in Montgomery?',
      },
      {
        step: 5,
        date: '21 December 1956',
        title: 'Desegregated Buses Roll in Montgomery',
        actor: 'Dr King & Montgomery Citizens',
        tag: 'Triumph of Non-Violence',
        trigger:
          'Federal injunctions take effect; Dr King and boycott leaders board desegregated buses, sitting in the front rows without incident.',
        because:
          'Over a year of relentless non-violent discipline and legal fortitude exhausted municipal opposition.',
        therefore:
          'Proved that disciplined, non-violent mass collective action could triumph against entrenched Southern white supremacy.',
        connective:
          'The triumph in Montgomery led directly to the founding of the Southern Christian Leadership Conference (SCLC)...',
        exam_link:
          'Significance: Provided the strategic blueprint and moral confidence for all subsequent direct action campaigns.',
        question:
          'What was the broader national significance of the Montgomery Bus Boycott for the emerging civil rights movement?',
      },
    ],
  },

  // Lesson 4 (KT 1.4)
  {
    lessonId: 'lesson_1_4',
    title: 'White Resistance, Vigilante Terror & The 1957 Act: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Analyse how economic, vigilante, and congressional tactics preserved white supremacy despite early civil rights pressure.',
    stages: [
      {
        step: 1,
        date: 'July 1954',
        title: "Formation of White Citizens' Councils",
        actor: 'Robert B. Patterson & Southern Elites',
        tag: 'Economic Coercion',
        trigger:
          "White businessmen and politicians form Citizens' Councils across the South to resist desegregation through economic intimidation and blacklisting.",
        because:
          "Elite segregationists sought a 'respectable' alternative to Klan violence that used financial pressure to silence dissent.",
        therefore:
          'Fired Black activists, denied bank loans and farm mortgages, and coordinated legal resistance to keep the South segregated.',
        connective: 'Economic pressure was accompanied by brutal extra-judicial terror...',
        exam_link:
          'Significance: Demonstrated how white economic control was systematically weaponized against civil rights supporters.',
        question:
          "How did White Citizens' Councils use economic intimidation and blacklisting to suppress Southern civil rights activism?",
      },
      {
        step: 2,
        date: 'August 1955',
        title: 'The Murder of Emmett Till',
        actor: 'Roy Bryant & J.W. Milam',
        tag: 'Vigilante Lynching',
        trigger:
          '14-year-old Chicago youth Emmett Till is abducted, brutally beaten, shot, and dumped in the Tallahatchie River for allegedly whistling at a white woman.',
        because:
          'White supremacists violently enforced racial taboos to terrorize the Black community into total deference.',
        therefore:
          'Exposed the lethal brutality of Southern white supremacy when his mother Mamie Till Bradley insisted on an open-casket funeral.',
        connective:
          'The killers were quickly arrested, but the Southern court system ensured total impunity...',
        exam_link:
          'Significance: Galvanized an entire generation of young Black Americans into civil rights activism.',
        question:
          'Why did the brutal murder of 14-year-old Emmett Till shock international opinion and galvanize civil rights support?',
      },
      {
        step: 3,
        date: 'September 1955',
        title: 'The All-White Jury Acquittal',
        actor: 'Sumner County Jury',
        tag: 'Judicial Complicity',
        trigger:
          'An all-white male jury deliberates for just 67 minutes before acquitting Till killers, who subsequently sell their confession to Look magazine for $3,150.',
        because:
          'Black citizens were barred from jury service by voter disenfranchisement, guaranteeing all-white juries sympathetic to racist killers.',
        therefore:
          'Demonstrated that Southern legal and judicial systems completely protected white vigilante violence against Black citizens.',
        connective:
          'Encouraged by judicial impunity, terrorist groups stepped up violent bombing campaigns...',
        exam_link:
          'Significance: Proved to the nation and the world that Southern state justice was a complete sham for Black citizens.',
        question:
          "What did the swift acquittal of Emmett Till's killers demonstrate about the Southern judicial system?",
      },
      {
        step: 4,
        date: '1955–1957',
        title: 'Resurgence of KKK Bombing Campaigns',
        actor: 'Ku Klux Klan Klansmen',
        tag: 'Domestic Terrorism',
        trigger:
          'The Ku Klux Klan bombs Black churches, community centers, and the homes of civil rights leaders including Dr Martin Luther King Jr.',
        because:
          'Extremist segregationists believed terror and dynamite would intimidate Black communities into abandoning their demands.',
        therefore:
          'Sought to terrorize the Black community into abandoning integration, but instead strengthened activist resolve and moral authority.',
        connective:
          'Mounting Southern violence forced the Eisenhower administration to propose civil rights legislation...',
        exam_link:
          'Significance: Showed that white supremacist terror failed to halt the growing moral momentum of the civil rights movement.',
        question:
          'How did violent KKK bombing campaigns against churches and homes paradoxically strengthen civil rights resolve?',
      },
      {
        step: 5,
        date: 'September 1957',
        title: 'Passage of the Flawed 1957 Act',
        actor: 'Senator Strom Thurmond & Congress',
        tag: 'Legislative Compromise',
        trigger:
          'Strom Thurmond stages a record 24-hour filibuster; the watered-down Civil Rights Act of 1957 passes without enforcement teeth.',
        because:
          'Southern senators held key committee chairmanships and diluted voting enforcement clauses before allowing the bill to pass.',
        therefore:
          'All-white Southern juries still tried voting violations, resulting in almost zero new Black registered voters by 1960.',
        connective:
          'The failure of the 1957 Act showed that only radical, non-violent direct action could shatter Jim Crow...',
        exam_link:
          'Significance: The first federal civil rights act since 1875, but proved that weak laws without federal enforcement were ineffective.',
        question:
          'Why did the Civil Rights Act of 1957 fail to significantly expand Black voter registration across the Deep South?',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 2: INTENSIFICATION OF THE CIVIL RIGHTS MOVEMENT, 1960–68
  // =========================================================================

  // Lesson 5 (KT 2.1)
  {
    lessonId: 'lesson_2_1',
    title: 'Direct Action Vanguard: Sit-Ins & Freedom Rides: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Evaluate how student-led direct action coerced reluctant federal intervention through deliberate, public crisis-creation.',
    stages: [
      {
        step: 1,
        date: 'February 1960',
        title: 'The Greensboro Lunch Counter Sit-Ins',
        actor: 'The Greensboro Four',
        tag: 'Student Direct Action',
        trigger:
          "Four Black college freshmen refuse to leave whites-only seats at Woolworth's in Greensboro; within days hundreds join them.",
        because:
          'Students were impatient with the slow pace of courtroom litigation and determined to take direct moral action.',
        therefore:
          "Sparked lunch counter sit-ins across 54 cities in nine states, forcing Woolworth's to integrate its dining counters nationwide.",
        connective:
          'The student sit-in wave required a formal organization to coordinate regional strategy...',
        exam_link:
          'Significance: Demonstrated the immense disruptive power of youth-led non-violent direct action.',
        question:
          'How did the Greensboro lunch counter sit-ins spark a spontaneous, youth-led wave of direct action across the South?',
      },
      {
        step: 2,
        date: 'April 1960',
        title: 'The Founding of SNCC',
        actor: 'Ella Baker & Student Activists',
        tag: 'Organizational Coordination',
        trigger:
          'Ella Baker organizes student leaders at Shaw University to establish the Student Nonviolent Coordinating Committee (SNCC).',
        because:
          'Baker believed students should form their own democratic, group-centered organization independent of older minister-led groups.',
        therefore:
          'Formed a fearless, youth vanguard prepared to confront Jim Crow segregation in the most dangerous rural counties of the Deep South.',
        connective:
          'SNCC joined veteran CORE activists to take direct action onto interstate highways...',
        exam_link:
          'Significance: Created the most radical and frontline youth organization of the southern civil rights movement.',
        question:
          'Why was the creation of SNCC critical in mobilizing young students into the front line of civil rights protest?',
      },
      {
        step: 3,
        date: 'May 1961',
        title: 'The Launch of the Freedom Rides',
        actor: 'CORE & Interracial Volunteers',
        tag: 'Testing Federal Law',
        trigger:
          'Thirteen interracial CORE activists depart Washington DC on buses to test the Boynton v. Virginia ruling outlawing terminal segregation.',
        because:
          'Southern states were openly violating federal Supreme Court mandates requiring desegregated interstate transit facilities.',
        therefore:
          'Directly challenged the federal government to uphold constitutional law against defiance in Alabama and Mississippi.',
        connective:
          'As the buses penetrated deep into Alabama, white vigilantes prepared an ambush...',
        exam_link:
          'Significance: Tested whether the Kennedy administration would enforce federal desegregation in hostile Southern states.',
        question:
          'What was the primary goal of the 1961 Freedom Rides organized by CORE across the interstate South?',
      },
      {
        step: 4,
        date: 'May 1961',
        title: 'The Anniston & Montgomery Ambush',
        actor: 'KKK Mobs & Complicit Police',
        tag: 'Violent Backlash',
        trigger:
          'A white mob firebombs a Freedom Riders bus in Anniston; in Montgomery, riders including John Lewis are beaten unconscious while police look on.',
        because:
          'Local police under commissioners like Bull Connor deliberately gave Klan mobs 15 minutes of uninterrupted violence before responding.',
        therefore:
          'Photographs of the burning bus and beaten riders made global headlines, deeply embarrassing President Kennedy during the Cold War.',
        connective:
          'International shame and physical danger compelled the Justice Department to take direct action...',
        exam_link:
          'Significance: Forced the Kennedy White House to intervene and deploy federal marshals to protect American citizens.',
        question:
          'How did televised violence against Freedom Riders in Anniston and Montgomery force federal intervention?',
      },
      {
        step: 5,
        date: 'November 1961',
        title: 'The ICC Desegregation Order',
        actor: 'Interstate Commerce Commission & RFK',
        tag: 'Federal Compliance',
        trigger:
          'Attorney General Robert F. Kennedy petitions the ICC, which orders all interstate bus and rail terminals to remove Jim Crow signs.',
        because:
          'The continuous influx of new Freedom Riders willing to fill Mississippi jails made federal enforcement unavoidable.',
        therefore:
          'Achieved total desegregation of interstate travel facilities by late 1962, proving that non-violent disruption could compel federal action.',
        connective:
          'This success proved that forcing a crisis was the most effective method to achieve civil rights breakthroughs...',
        exam_link:
          'Significance: Delivered a concrete national desegregation victory through student sacrifice and federal regulation.',
        question:
          "Why did the ICC's November 1961 desegregation order represent a decisive victory for direct action protest?",
      },
    ],
  },

  // Lesson 6 (KT 2.2)
  {
    lessonId: 'lesson_2_2',
    title: 'From Birmingham to Selma: Legislative Revolution: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Analyse how confrontations in Birmingham and Selma broke congressional gridlock to pass the 1964 and 1965 Acts.',
    stages: [
      {
        step: 1,
        date: 'April–May 1963',
        title: "Project C & The Children's Crusade in Birmingham",
        actor: 'SCLC & Birmingham Schoolchildren',
        tag: 'Confronting Police Brutality',
        trigger:
          'Bull Connor deploys police attack dogs and high-pressure firehoses against marching schoolchildren during Project C in Birmingham.',
        because:
          'SCLC deliberately provoked Bull Connor into an overreaction to expose Southern police savagery to national television cameras.',
        therefore:
          'Televised footage of police brutality against youth horrified the nation and forced local merchants to desegregate downtown stores.',
        connective:
          "The moral revulsion across America culminated in a massive demonstration in the nation's capital...",
        exam_link:
          'Significance: Forced President John F. Kennedy to introduce the most comprehensive civil rights bill in US history.',
        question:
          "How did Bull Connor's violent suppression of the Children's Crusade in Birmingham transform national opinion?",
      },
      {
        step: 2,
        date: '28 August 1963',
        title: 'The March on Washington for Jobs and Freedom',
        actor: '250,000 Marchers & The Big Six Leaders',
        tag: 'Moral Mobilization',
        trigger:
          "A quarter of a million citizens gather peacefully at the Lincoln Memorial, where Dr Martin Luther King Jr. delivers his 'I Have a Dream' speech.",
        because:
          "Civil rights leaders needed to show Congress broad multiracial support for Kennedy's stalled civil rights legislation.",
        therefore:
          'Demonstrated unprecedented multiracial unity and put immense moral pressure on Congress to pass comprehensive civil rights legislation.',
        connective:
          "Following Kennedy's assassination, Lyndon B. Johnson made passing the bill his highest domestic priority...",
        exam_link:
          'Significance: Elevated civil rights to the central moral test of American national democracy.',
        question:
          'Why was the 1963 March on Washington a pivotal moment in generating momentum for federal civil rights laws?',
      },
      {
        step: 3,
        date: '2 July 1964',
        title: 'Passage of the Civil Rights Act of 1964',
        actor: 'President Lyndon B. Johnson & Congress',
        tag: 'Abolishing Legal Jim Crow',
        trigger:
          'President Johnson signs the landmark Civil Rights Act of 1964 into law, using his political clout to break a 54-day Southern Senate filibuster.',
        because:
          'Johnson leveraged the national mourning for JFK and forged a bipartisan coalition of northern Democrats and moderate Republicans.',
        therefore:
          'Legally abolished segregation in public accommodations, motels, restaurants, and employment nationwide through the Equal Employment Opportunity Commission.',
        connective:
          'However, the 1964 Act left the problem of Southern Black voting disenfranchisement unresolved...',
        exam_link:
          'Significance: The most important civil rights legislation in modern US history, legally ending segregation.',
        question:
          'How did the Civil Rights Act of 1964 dismantle the legal foundations of Southern Jim Crow segregation?',
      },
      {
        step: 4,
        date: '7 March 1965',
        title: "'Bloody Sunday' at Edmund Pettus Bridge in Selma",
        actor: 'Alabama State Troopers & Dallas County Voters',
        tag: 'Voting Rights Showdown',
        trigger:
          'State troopers violently attack 600 voting rights marchers on Edmund Pettus Bridge in Selma with tear gas, clubs, and mounted whips.',
        because:
          'Only 2% of eligible Black adults were registered in Dallas County, and segregationists were determined to crush voting rights agitation.',
        therefore:
          'Televised footage interrupted network broadcasts, provoking nationwide outrage and compelling President Johnson to demand federal voting rights legislation.',
        connective:
          'With the nation clamoring for action, President Johnson addressed a joint session of Congress...',
        exam_link:
          'Significance: Produced the moral outrage that swept away all congressional resistance to federal voting rights enforcement.',
        question:
          'Why did the violent clash on Edmund Pettus Bridge in Selma create irresistible momentum for federal voting rights?',
      },
      {
        step: 5,
        date: '6 August 1965',
        title: 'Enactment of the Voting Rights Act of 1965',
        actor: 'President Johnson & Federal Examiners',
        tag: 'Electoral Revolution',
        trigger:
          'President Johnson signs the Voting Rights Act of 1965, outlawing literacy tests and deploying federal registrars to Southern counties.',
        because:
          'The federal government assumed direct authority over elections in jurisdictions with a history of racial discrimination.',
        therefore:
          'Black voter registration in Mississippi surged from 7% to over 60% within two years, permanently transforming Southern electoral power.',
        connective:
          'Yet the winning of Southern voting rights left Northern urban economic grievances untouched...',
        exam_link:
          'Significance: Revolutionized Southern politics by enfranchising millions of Black citizens and enabling the election of Black officials.',
        question:
          'In what ways did the Voting Rights Act of 1965 revolutionize political participation for Black Americans in the South?',
      },
    ],
  },

  // Lesson 7 (KT 2.3)
  {
    lessonId: 'lesson_2_3',
    title: 'The Black Power Movement & Black Panthers: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Contrast the ideological, tactical, and regional divergence between Southern non-violence and northern militant Black Power.',
    stages: [
      {
        step: 1,
        date: '1952–1964',
        title: 'Malcolm X & The Nation of Islam',
        actor: 'Malcolm X & Elijah Muhammad',
        tag: 'Militant Self-Determination',
        trigger:
          'Malcolm X rejects non-violent integration as passive capitulation, advocating Black nationalism, self-defense, and racial pride.',
        because:
          "Malcolm argued that white America was hypocritical and that Black Americans had a natural right to defend themselves 'by any means necessary'.",
        therefore:
          'Articulated the deep frustration of urban Black youth who felt non-violent Southern campaigns did not address northern ghetto realities.',
        connective:
          "Malcolm's ideas directly influenced a younger, frustrated generation within SNCC and CORE...",
        exam_link:
          'Significance: Laid the intellectual and cultural foundation for the Black Power movement of the late 1960s.',
        question:
          'Why did Malcolm X reject non-violent integrationism in favor of Black nationalism and self-defense?',
      },
      {
        step: 2,
        date: 'June 1966',
        title: "The Meredith March & The Cry of 'Black Power'",
        actor: 'Stokely Carmichael & SNCC',
        tag: 'Ideological Rupture',
        trigger:
          "Following the shooting of James Meredith, Stokely Carmichael popularizes the slogan 'Black Power' at a Greenwood rally.",
        because:
          'Young SNCC and CORE field workers were exhausted by years of beatings, jailings, and unpunished white murders in the South.',
        therefore:
          "Signaled a radical philosophical departure from King's non-violent coalition politics toward Black self-determination and political autonomy.",
        connective:
          'Inspired by the call for Black Power, northern activists organized armed community resistance...',
        exam_link:
          'Significance: Fractured the civil rights movement into moderate integrationist and radical nationalist wings.',
        question:
          "How did Stokely Carmichael's call for 'Black Power' during the 1966 Meredith March divide the civil rights movement?",
      },
      {
        step: 3,
        date: 'October 1966',
        title: 'Founding of the Black Panther Party in Oakland',
        actor: 'Huey P. Newton & Bobby Seale',
        tag: 'Armed Self-Defense',
        trigger:
          'Newton and Seale establish the Black Panther Party for Self-Defense, formulating their radical Ten-Point Program.',
        because:
          'Working-class Black residents in Oakland suffered endemic police harassment, brutality, and economic exploitation.',
        therefore:
          'Initiated armed citizen patrols monitoring police conduct in Black neighborhoods with shotguns and California law books.',
        connective:
          'Beyond armed patrols, the Panthers built grassroots social institutions to serve impoverished communities...',
        exam_link:
          'Significance: Symbolized the militant face of Black Power and terrified white establishment politicians.',
        question:
          "What were the primary aims and methods outlined in the Black Panther Party's Ten-Point Program?",
      },
      {
        step: 4,
        date: '1968–1969',
        title: 'Black Panther Community Survival Programs',
        actor: 'Panther Cadres & Community Volunteers',
        tag: 'Grassroots Social Aid',
        trigger:
          'The Panthers organize Free Breakfast for Children programs, free medical clinics, and sickle-cell anemia testing across 45 urban chapters.',
        because:
          'The party aimed to meet the immediate survival needs of impoverished communities that government welfare ignored.',
        therefore:
          'Earned widespread grassroots loyalty among working-class urban communities while challenging racist government neglect.',
        connective:
          'The global reach of the movement was dramatically underscored at the international Olympic Games...',
        exam_link:
          'Significance: Demonstrated that the Panthers were a comprehensive community service movement, not merely a paramilitary militia.',
        question:
          "How did the Panthers' community survival programs challenge mainstream media portrayals of the party as merely violent?",
      },
      {
        step: 5,
        date: '16 October 1968',
        title: 'The Mexico City Olympics Black Power Salute',
        actor: 'Tommie Smith & John Carlos',
        tag: 'Global Protest Platform',
        trigger:
          'Gold medalist Tommie Smith and bronze medalist John Carlos raise black-gloved fists atop the Olympic medal podium in Mexico City.',
        because:
          "Athletes used the world's premier sporting event to protest ongoing American racial injustice, poverty, and lynchings.",
        therefore:
          'Projected the Black Power struggle onto a global stage, highlighting systemic racial oppression to hundreds of millions of international viewers.',
        connective:
          'Yet mounting urban desperation soon exploded into widespread street rebellions across northern cities...',
        exam_link:
          'Significance: Created one of the most iconic images of resistance and protest in modern world history.',
        question:
          'Why was the silent protest by Tommie Smith and John Carlos at the 1968 Olympics such a powerful cultural statement?',
      },
    ],
  },

  // Lesson 8 (KT 2.4)
  {
    lessonId: 'lesson_2_4',
    title: "Urban Rebellions, The Kerner Report & King's Legacy: 5-Stage Causal Domino Chain",
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Analyse how economic deprivation, police brutality, and white backlash caused the urban uprisings of 1965–68.',
    stages: [
      {
        step: 1,
        date: '11–17 August 1965',
        title: 'The Watts Rebellion in Los Angeles',
        actor: 'Watts Residents & California National Guard',
        tag: 'Urban Frustration Explosion',
        trigger:
          'A routine traffic stop by highway patrol sparks six days of rebellion across the Watts district of Los Angeles.',
        because:
          'Residents suffered from high unemployment, substandard housing, poor schools, and chronic police brutality by an all-white police force.',
        therefore:
          'Left 34 dead, over 1,000 injured, and $40 million in property damage, exposing profound anger over northern police brutality and ghetto poverty.',
        connective:
          'Recognizing that legal rights had not cured economic misery, Dr King moved his campaign North...',
        exam_link:
          'Significance: Shifted the national civil rights focus from Southern legal segregation to northern urban economic despair.',
        question:
          'Why did a routine traffic arrest in Watts ignite six days of violent urban rebellion in August 1965?',
      },
      {
        step: 2,
        date: '1966',
        title: "Dr King's Chicago Freedom Movement",
        actor: 'SCLC & Chicago White Mobs',
        tag: 'Tackling De Facto Segregation',
        trigger:
          'Dr King moves into a dilapidated Chicago slum tenement to campaign against slumlords, redlining, and segregated housing.',
        because:
          'King recognized that the civil rights movement had to address systemic poverty and housing discrimination in the North.',
        therefore:
          'Faced violent white mobs hurling bricks in Marquette Park, proving that northern racial prejudice was as virulent as Southern segregation.',
        connective:
          'As peaceful northern reform stalled, summer temperatures brought devastating riots in other industrial cities...',
        exam_link:
          'Significance: Demonstrated the immense difficulty of dismantling de facto economic and residential segregation.',
        question:
          "What did Dr King's campaign in Chicago reveal about the entrenched nature of northern de facto segregation?",
      },
      {
        step: 3,
        date: 'July 1967',
        title: 'The Detroit & Newark Rebellions',
        actor: 'Urban Residents, Police & Federal Paratroopers',
        tag: 'The Long Hot Summers',
        trigger:
          'Police raids in Newark and Detroit trigger massive street uprisings, requiring tanks and 82nd Airborne paratroopers to suppress.',
        because:
          'Decades of redlining, job loss, police harassment, and extreme racial segregation concentrated unbearable poverty in inner cities.',
        therefore:
          'Resulted in 43 deaths in Detroit and 26 in Newark, convincing the White House that American cities were in state of near-insurrection.',
        connective:
          'In response to the unprecedented urban violence, President Johnson appointed a federal commission of inquiry...',
        exam_link:
          "Significance: Marked the peak of urban unrest and provoked a fierce white political backlash demanding 'Law and Order'.",
        question:
          'How did the violent urban rebellions in Newark and Detroit in 1967 demonstrate the failure of Great Society antipoverty programs?',
      },
      {
        step: 4,
        date: 'February–March 1968',
        title: 'The Kerner Commission Report',
        actor: "President Johnson's Kerner Commission",
        tag: 'Forensic Diagnosis of Racism',
        trigger:
          "The National Advisory Commission on Civil Disorders concludes: 'Our nation is moving toward two societies, one black, one white—separate and unequal.'",
        because:
          'The bipartisan commission conducted exhaustive field research into ghetto conditions and police practices across 23 cities.',
        therefore:
          'Identified pervasive white racism and economic exclusion as the root causes of urban unrest, recommending massive federal spending.',
        connective:
          "However, before the commission's recommendations could be enacted, disaster struck the movement...",
        exam_link:
          'Significance: Provided the official federal admission that systemic white racism was responsible for urban poverty and violence.',
        question:
          'Why did the Kerner Commission Report conclude that white racism was the primary cause of urban riots?',
      },
      {
        step: 5,
        date: '4–11 April 1968',
        title: "King's Assassination & The 1968 Civil Rights Act",
        actor: 'James Earl Ray, Rioting Cities & Congress',
        tag: 'Tragic Climax & Fair Housing',
        trigger:
          'Dr King is assassinated in Memphis; uprisings erupt in over 100 cities, pushing Congress to rush through the 1968 Fair Housing Act.',
        because:
          'Congressional leaders realized that passing the stalled open-housing bill was the only way to honor King and quell nationwide urban violence.',
        therefore:
          'Banned housing discrimination nationwide but left the civil rights movement fractured and traumatized without its foremost unifying leader.',
        connective:
          'With King gone and cities smoldering, American attention increasingly turned to the expanding war in Vietnam...',
        exam_link:
          'Significance: Outlawed racial discrimination in housing while marking the effective conclusion of the mass civil rights era.',
        question:
          'How did the assassination of Dr Martin Luther King Jr. and the passage of the 1968 Fair Housing Act reshape the movement?',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 3: US INVOLVEMENT IN THE VIETNAM WAR, 1954–68
  // =========================================================================

  // Lesson 9 (KT 3.1)
  {
    lessonId: 'lesson_3_1',
    title: 'Geneva Partition, Ngo Dinh Diem & The Vietcong: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Explain why Cold War containment and the Domino Theory locked the US into supporting an autocratic regime in Saigon.',
    stages: [
      {
        step: 1,
        date: 'May–July 1954',
        title: 'Dien Bien Phu & The Geneva Partition',
        actor: 'Viet Minh, France & World Powers',
        tag: 'Colonial Collapse & Division',
        trigger:
          'Viet Minh forces defeat the French garrison at Dien Bien Phu; the Geneva Accords temporarily partition Vietnam at the 17th Parallel.',
        because:
          'French colonial forces were militarily exhausted and politically unable to sustain the First Indochina War.',
        therefore:
          'Created a communist North under Ho Chi Minh and a Western-backed South, scheduling national reunification elections for July 1956.',
        connective:
          'Fearful that Ho Chi Minh would win any free election, the United States searched for a client ruler in Saigon...',
        exam_link:
          'Significance: Ended French colonial rule in Indochina and established the 17th Parallel partition that drew in the United States.',
        question:
          'Why did the French defeat at Dien Bien Phu lead to the temporary partition of Vietnam at the 17th Parallel?',
      },
      {
        step: 2,
        date: '1955–1956',
        title: 'Diem Takes Power & Rejects Elections',
        actor: 'Ngo Dinh Diem & US Advisors',
        tag: 'Puppet Regime & Sabotage',
        trigger:
          'Backed by US financial aid, Catholic autocrat Ngo Dinh Diem rigs the southern referendum and cancels the scheduled 1956 nationwide elections.',
        because:
          "Washington supported Diem under the 'Domino Theory', fearing Ho Chi Minh would win a landslide democratic election across all Vietnam.",
        therefore:
          'Destroyed any peaceful constitutional path to Vietnamese reunification, ensuring the communist North would resort to armed insurgency.',
        connective:
          "Diem's brutal crackdowns on political dissidents and peasants ignited armed rural resistance...",
        exam_link:
          'Significance: Locked the US into underwriting an unpopular and corrupt regime in South Vietnam.',
        question:
          'Why did Ngo Dinh Diem cancel the 1956 nationwide reunification elections with American support?',
      },
      {
        step: 3,
        date: 'December 1960',
        title: 'Formation of the Vietcong (NLF)',
        actor: 'Southern Insurgents & Hanoi',
        tag: 'Rural Insurgency Founded',
        trigger:
          'Southern opponents of Diem establish the National Liberation Front (Vietcong) to wage rural guerrilla warfare against Saigon.',
        because:
          'Peasants and southern communists needed an organized military structure to overthrow Diem and reunite the country.',
        therefore:
          "Threatened Diem's control over the Mekong Delta countryside, prompting President Kennedy to increase US military advisors from 900 to over 16,000.",
        connective:
          'To counter the rapid spread of the Vietcong, the US and Diem devised a drastic counter-insurgency plan...',
        exam_link:
          'Significance: Established the formidable guerrilla organization that would fight US and ARVN forces for fifteen years.',
        question:
          "How did Diem's repressive policies in South Vietnam lead directly to the formation of the Vietcong in 1960?",
      },
      {
        step: 4,
        date: '1962–1963',
        title: 'Failure of the Strategic Hamlet Program & The Buddhist Crisis',
        actor: 'Diem Regime, Peasants & Buddhist Monks',
        tag: 'Alienating the Population',
        trigger:
          "Diem forcibly relocates peasants into barbed-wire 'strategic hamlets' and persecutes the Buddhist majority, prompting self-immolation protests.",
        because:
          'Diem sought to isolate peasants from Vietcong infiltrators and enforce Catholic minority dominance over Buddhist traditions.',
        therefore:
          'Deeply alienated the rural peasantry and outraged global public opinion when Buddhist monks burned themselves alive in Saigon streets.',
        connective:
          "Diem's brutality and incompetence convinced Washington that South Vietnam could not survive under his leadership...",
        exam_link:
          'Significance: Completely destroyed the moral and political legitimacy of the Diem regime at home and internationally.',
        question:
          'Why did the Strategic Hamlet Program and the Buddhist Crisis fatally undermine South Vietnamese support for Diem?',
      },
      {
        step: 5,
        date: '1–2 November 1963',
        title: 'The Overthrow & Assassination of Diem',
        actor: 'ARVN Generals & CIA',
        tag: 'Coup & Instability',
        trigger:
          'South Vietnamese military officers stage a coup with covert CIA foreknowledge, executing Diem and his brother Nhu in an armored personnel carrier.',
        because:
          'US officials concluded Diem was a liability who was losing the war against communism and embarrassing American diplomacy.',
        therefore:
          'Left South Vietnam politically paralyzed under a succession of corrupt military juntas, dragging the US deeper into the quagmire.',
        connective:
          'With South Vietnam spiraling toward collapse, President Johnson searched for an excuse to escalate direct American force...',
        exam_link:
          'Significance: Created a power vacuum in Saigon that made direct US military intervention almost inevitable.',
        question:
          'How did the 1963 military coup and assassination of Diem leave the United States trapped in South Vietnam?',
      },
    ],
  },

  // Lesson 10 (KT 3.2)
  {
    lessonId: 'lesson_3_2',
    title: 'Gulf of Tonkin, Escalation & Ground Troops: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Analyse how the Tonkin incident enabled President Johnson to transition from advisory support to full-scale American ground war.',
    stages: [
      {
        step: 1,
        date: '1963–1964',
        title: 'ARVN Deterioration & Vietcong Expansion',
        actor: 'Vietcong Insurgents & ARVN Forces',
        tag: 'South Vietnamese Collapse',
        trigger:
          'The Vietcong inflict severe defeats on the demoralized ARVN, gaining effective control over 40% of South Vietnam rural villages.',
        because:
          'South Vietnamese military commanders were corrupt political appointees who avoided aggressive contact with communist guerrillas.',
        therefore:
          'Convinced President Lyndon B. Johnson that South Vietnam would fall to communism without direct US military intervention.',
        connective:
          'Facing an election year, Johnson looked for an opportunity to assert decisive presidential authority...',
        exam_link:
          'Significance: Proved that US aid and advisors alone were insufficient to stop the Vietcong from taking over the country.',
        question:
          'Why did the military collapse of the ARVN in 1963–64 convince US leaders that direct intervention was unavoidable?',
      },
      {
        step: 2,
        date: '2–4 August 1964',
        title: 'The Gulf of Tonkin Incident',
        actor: 'USS Maddox, US Navy & NV Torpedo Boats',
        tag: 'Naval Pretext',
        trigger:
          'Reports allege North Vietnamese torpedo boats attacked US surveillance destroyers in murky waters off the North Vietnamese coast.',
        because:
          'The US destroyer Maddox was supporting covert South Vietnamese commando raids against North Vietnamese coastal radar installations.',
        therefore:
          'Provided President Johnson with the political pretext he needed to show anti-communist resolve ahead of the 1964 presidential election.',
        connective:
          'Armed with dubious reports of enemy aggression, Johnson requested extraordinary war powers from Congress...',
        exam_link:
          'Significance: The crucial flashpoint used to justify the dramatic escalation of American military involvement in Vietnam.',
        question:
          'What occurred during the August 1964 Gulf of Tonkin incident, and how did Johnson use it politically?',
      },
      {
        step: 3,
        date: '7 August 1964',
        title: 'The Gulf of Tonkin Resolution Passes Congress',
        actor: 'US Congress & President Johnson',
        tag: 'Presidential War Powers',
        trigger:
          "Congress overwhelmingly passes the Tonkin Resolution (416-0 in House, 88-2 in Senate), granting the president power to take 'all necessary measures'.",
        because:
          'Congress rallied behind the commander-in-chief during a perceived Cold War crisis based on misleading White House intelligence.',
        therefore:
          'Handed the White House a blank check to wage war in Southeast Asia without formal congressional declaration of war.',
        connective:
          'With legal authority secured, the administration waited for the next communist attack to unleash its air power...',
        exam_link:
          'Significance: Transferred the constitutional war-making authority of Congress into the hands of the executive branch.',
        question:
          "Why was the Gulf of Tonkin Resolution described by critics as a 'blank check' for presidential war-making?",
      },
      {
        step: 4,
        date: 'February–March 1965',
        title: 'Operation Rolling Thunder Bombing Offensive',
        actor: 'US Air Force & Navy Bombers',
        tag: 'Strategic Air Campaign',
        trigger:
          'Following a Vietcong mortar attack on the US base at Pleiku, Johnson orders Operation Rolling Thunder, a 3-year sustained bombing campaign.',
        because:
          "US strategists believed relentless aerial destruction of North Vietnamese infrastructure would break Hanoi's will to support southern rebels.",
        therefore:
          'Dropped more bomb tonnage on North Vietnam than on Nazi Germany, aiming to force Hanoi to cease supplying southern insurgents.',
        connective:
          'Protecting American air bases from retaliatory Vietcong sapper raids required American ground combat soldiers...',
        exam_link:
          'Significance: Marked the escalation from retaliatory strikes to continuous, total technological warfare against North Vietnam.',
        question:
          'What were the strategic objectives of Operation Rolling Thunder, and why did it fail to halt northern infiltration?',
      },
      {
        step: 5,
        date: '8 March 1965',
        title: 'First US Ground Combat Troops Land at Da Nang',
        actor: '3,500 US Marines & General Westmoreland',
        tag: 'Arrival of Ground Forces',
        trigger:
          '3,500 US Marines land on the beaches of Da Nang to guard the airbase, marking the arrival of America first official ground combat units.',
        because:
          'General William Westmoreland warned that South Vietnamese troops could not be trusted to defend vital US bomber bases.',
        therefore:
          'Fundamentally transformed the conflict from an advisory mission into an American ground war, with troop numbers climbing to 184,000 by year end.',
        connective:
          'Once ground troops were deployed, the military quickly transitioned from static defense to aggressive offensive search missions...',
        exam_link:
          'Significance: The decisive moment of American commitment, beginning eight years of large-scale ground combat in Asia.',
        question:
          'How did the landing of 3,500 Marines at Da Nang in March 1965 mark the permanent Americanization of the war?',
      },
    ],
  },

  // Lesson 11 (KT 3.3)
  {
    lessonId: 'lesson_3_3',
    title: 'Asymmetric Warfare & The Failure of US Tactics: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Contrast guerrilla evasion strategies with American technological firepower to explain the military stalemate.',
    stages: [
      {
        step: 1,
        date: '1965–1968',
        title: 'Vietcong Asymmetric Guerrilla Tactics',
        actor: 'Vietcong Fighters & Peasant Militia',
        tag: 'Guerrilla Doctrine',
        trigger:
          "The Vietcong employ 'hanging onto the belts' close-quarter ambushes, camouflage, and unyielding psychological attrition against US patrols.",
        because:
          'Communist guerrillas could not match the industrial firepower, aircraft, or artillery of the US military in open conventional battle.',
        therefore:
          'Neutralized superior American artillery and air power by fighting within 30 meters of US lines, inflicting steady US casualties.',
        connective:
          'To survive relentless US carpet bombing, guerrillas moved their entire infrastructure subterranean...',
        exam_link:
          'Significance: Demonstrated how an underdeveloped guerrilla force could effectively nullify modern superpower military superiority.',
        question:
          "How did the Vietcong tactic of 'hanging onto the belts' neutralize superior American firepower and technology?",
      },
      {
        step: 2,
        date: '1960–1975',
        title: 'Underground Tunnels of Cu Chi & Booby Traps',
        actor: 'Vietcong Tunnel Sappers',
        tag: 'Subterranean Fortifications',
        trigger:
          'Guerrillas construct 250 kilometers of subterranean tunnels featuring sleeping quarters, hospitals, and booby traps laced with punji sticks.',
        because:
          'Tunnels provided complete immunity from B-52 bombings and enabled hidden fighters to ambush American patrols from behind.',
        therefore:
          'Allowed guerrillas to launch surprise strikes and vanish underground, rendering US search patrols anxious, frustrated, and demoralized.',
        connective:
          'Southern guerrillas were kept constantly armed and reinforced by an international logistics highway...',
        exam_link:
          'Significance: Inflicted severe psychological weariness and high casualty rates on US infantry patrols.',
        question:
          'Why did the Cu Chi tunnel complex and deadly booby traps severely undermine American military morale?',
      },
      {
        step: 3,
        date: '1959–1975',
        title: 'The Ho Chi Minh Trail Supply Lifeline',
        actor: 'North Vietnamese Army & Logistics Cadres',
        tag: 'Logistics Highway',
        trigger:
          'Hanoi routes troops, fuel, and Soviet-supplied weapons south along a 16,000-kilometer labyrinth of jungle tracks through neutral Laos and Cambodia.',
        because:
          'North Vietnam was determined to liberate the South and utilized international borders where US ground troops were legally forbidden to tread.',
        therefore:
          'Maintained a continuous flow of reinforcement supplies despite relentless US bombing, ensuring southern guerrillas could fight indefinitely.',
        connective:
          'Frustrated by dense jungle canopy concealing the trail and ambushes, the US turned to chemical warfare...',
        exam_link:
          'Significance: Ensured that the communist war effort in the South could never be starved of manpower or weaponry.',
        question:
          'How did the Ho Chi Minh Trail enable North Vietnam to sustain the southern insurgency despite continuous US bombing?',
      },
      {
        step: 4,
        date: '1962–1971',
        title: 'Chemical Defoliation & Napalm Warfare',
        actor: "US Air Force 'Ranch Hand' Crews",
        tag: 'Chemical Defoliants',
        trigger:
          'US forces spray 19 million gallons of toxic Agent Orange herbicide and drop thousands of tons of jellied napalm to destroy jungle canopy and crops.',
        because:
          'Military planners wanted to strip away guerrilla jungle hiding places and destroy crops feeding communist forces.',
        therefore:
          'Devastated rural ecosystems, poisoned civilian food supplies, and caused horrific burns, turning peasant populations against the US.',
        connective:
          'On the ground, American units engaged in aggressive pacification missions that further alienated peasants...',
        exam_link:
          'Significance: Caused catastrophic human and environmental devastation while completely failing to defeat guerrilla forces.',
        question:
          'Why did the use of chemical defoliants like Agent Orange and napalm prove counterproductive for US military objectives?',
      },
      {
        step: 5,
        date: '1965–1968',
        title: "Search & Destroy Operations ('Zippo Raids')",
        actor: 'General Westmoreland & US Platoons',
        tag: 'Attrition Strategy',
        trigger:
          "US platoons airlifted by helicopter into villages conduct 'Search and Destroy' missions, incinerating suspected Vietcong huts with Zippo lighters.",
        because:
          "General Westmoreland pursued a war of attrition, measuring success by the 'body count' of dead enemy combatants.",
        therefore:
          "Displaced over three million peasant refugees and produced a deceptive 'body count' metric that completely alienated hearts and minds.",
        connective:
          'The disconnect between military claims of progress and the battlefield reality exploded in the catastrophic Tet Offensive...',
        exam_link:
          'Significance: Destroyed rural South Vietnamese society, driving millions of ordinary peasants into active support for the Vietcong.',
        question:
          'How did Search and Destroy operations fail to distinguish between civilian peasants and Vietcong fighters?',
      },
    ],
  },

  // Lesson 12 (KT 3.4)
  {
    lessonId: 'lesson_3_4',
    title: 'Tet Offensive, Cronkite Verdict & Vietnamization: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Assess how the psychological shock of Tet broke domestic political support and initiated Nixon Vietnamization policy.',
    stages: [
      {
        step: 1,
        date: '31 January 1968',
        title: 'The Tet Offensive Surprise Attacks',
        actor: '84,000 Vietcong & NVA Soldiers',
        tag: 'Psychological Shockwave',
        trigger:
          'Communist forces launch a coordinated lunar new year offensive against over 100 cities, 36 provincial capitals, and the US Embassy in Saigon.',
        because:
          'Hanoi sought to provoke a popular southern uprising and shatter American domestic belief that the war was being won.',
        therefore:
          "Shattered Washington's claims that victory was near, demonstrating that the enemy possessed enormous nationwide offensive capability.",
        connective:
          'Television cameras captured combat inside the US Embassy compound, shocking the nation most trusted journalists...',
        exam_link:
          'Significance: The decisive psychological turning point of the war, shattering American belief in victory.',
        question:
          'Why did the 1968 Tet Offensive shatter American government claims that the war in Vietnam was nearly won?',
      },
      {
        step: 2,
        date: 'February–March 1968',
        title: 'Walter Cronkite Verdict & The Credibility Gap',
        actor: 'Walter Cronkite & CBS Evening News',
        tag: 'Media Realism',
        trigger:
          "CBS anchor Walter Cronkite broadcasts that Vietnam is a 'stalemate', prompting LBJ to lament: 'If I have lost Cronkite, I have lost Middle America.'",
        because:
          'Cronkite traveled to Hue and Saigon, witnessing firsthand the destruction and refuting Pentagon optimism.',
        therefore:
          'Created an unbridgeable credibility gap between government optimism and public perception, convincing voters the war was unwinnable.',
        connective:
          "The political fallout demolished President Johnson's standing in his own party...",
        exam_link:
          'Significance: Crystallized mainstream American skepticism about the war and doomed Johnson re-election prospects.',
        question:
          "How did Walter Cronkite's television broadcast deepen the public 'credibility gap' regarding the Vietnam War?",
      },
      {
        step: 3,
        date: '31 March 1968',
        title: "President Johnson's Dramatic Abdication",
        actor: 'President Lyndon B. Johnson',
        tag: 'Political Abdication',
        trigger:
          'Facing humiliation in the New Hampshire primary, Johnson announces a partial bombing halt and declares he will not seek re-election.',
        because:
          'Johnson was broken by the collapse of his Great Society vision and the realization that Vietnam had made him politically radioactive.',
        therefore:
          "Marked the political destruction of Johnson's presidency by the Vietnam quagmire and opened the path for Richard Nixon's 1968 election.",
        connective:
          'Winning the presidency, Richard Nixon introduced a new strategy to extricate American troops...',
        exam_link:
          'Significance: Demonstrated that public opposition to the Vietnam War was powerful enough to unseat a sitting US president.',
        question:
          'Why did the political fallout from the Tet Offensive force President Johnson to withdraw from the 1968 presidential election?',
      },
      {
        step: 4,
        date: '1969',
        title: "Nixon Announces 'Vietnamization' & Secret Incursions",
        actor: 'President Richard Nixon & Henry Kissinger',
        tag: 'Shifting the Burden',
        trigger:
          'Nixon introduces Vietnamization to train and equip ARVN forces to replace departing US ground troops while secretly bombing Cambodia.',
        because:
          'Nixon needed to placate intense anti-war sentiment at home while keeping South Vietnam from immediately collapsing.',
        therefore:
          "Aimed to achieve 'peace with honor' by withdrawing 500,000 US soldiers while using devastating air power to prevent South Vietnam's immediate collapse.",
        connective:
          'While troop withdrawals began, remaining American soldiers realized they were fighting in a war already being abandoned...',
        exam_link:
          'Significance: Transferred primary ground combat responsibility to the ARVN while secretly expanding the war into neighboring Cambodia.',
        question:
          "What were the core goals and contradictions of President Nixon's policy of 'Vietnamization'?",
      },
      {
        step: 5,
        date: '1969–1972',
        title: 'Phased Troop Withdrawals & Morale Collapse',
        actor: 'US Conscripts & Military Command',
        tag: 'Military Breakdown',
        trigger:
          'As US troop numbers drop from 543,000 to under 50,000, remaining soldiers experience rampant drug abuse, racial tensions, and officer fragging.',
        because:
          "No soldier wanted to be 'the last man to die in Vietnam', eroding military discipline and willingness to patrol.",
        therefore:
          'Proved that the US ground military could no longer sustain combat effectiveness, forcing Washington to accelerate peace negotiations in Paris.',
        connective:
          'Meanwhile on the home front, the anti-war movement swelled into the largest mass protest movement in American history...',
        exam_link:
          'Significance: Highlighted the internal collapse of the US armed forces in the final stages of the ground conflict.',
        question:
          'How did phased troop withdrawals under Vietnamization affect the discipline and morale of remaining US forces?',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 4: REACTIONS TO & END OF US INVOLVEMENT IN VIETNAM, 1964–75
  // =========================================================================

  // Lesson 13 (KT 4.1)
  {
    lessonId: 'lesson_4_1',
    title: 'The Anti-War Movement, Draft Resistance & Kent State: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Explain why television coverage, conscription inequities, and civilian atrocities fueled mass domestic protest against the war.',
    stages: [
      {
        step: 1,
        date: '1965–1968',
        title: 'The Living Room War & Television Media',
        actor: 'Network News Crews & American Public',
        tag: 'Uncensored Media Coverage',
        trigger:
          'Color television brings uncensored daily battlefield footage, body bags, and burning villages directly into 50 million American living rooms.',
        because:
          'The US military had not imposed wartime press censorship, allowing journalists to film the grim reality of jungle warfare.',
        therefore:
          'Eroded public faith in official military briefings, turning millions of moderate middle-class citizens against the conflict.',
        connective:
          'Domestic opposition became intensely personal for young men subject to compulsory military conscription...',
        exam_link:
          'Significance: The first television war in history, profoundly changing how democracies experience protracted conflicts.',
        question:
          'How did uncensored nightly television coverage turn American domestic public opinion against the Vietnam War?',
      },
      {
        step: 2,
        date: '1966–1969',
        title: 'The Draft System & Class Inequity',
        actor: 'Selective Service System & Student Protesters',
        tag: 'Conscription Injustice',
        trigger:
          'The draft conscripts 40,000 young men monthly; college deferments protect affluent white youth while poor and Black men suffer disproportionate casualties.',
        because:
          'The Selective Service system allowed wealthy students to avoid conscription by staying enrolled in universities.',
        therefore:
          'Triggered widespread draft card burnings, underground evasion networks, and violent clashes at university campus recruitment offices.',
        connective:
          'Moral opposition deepened into horror when reports surfaced of atrocities committed by American troops...',
        exam_link:
          'Significance: Made anti-war resistance personal and urgent for millions of young Americans facing conscription.',
        question:
          'Why did class and racial inequalities in the military draft provoke widespread campus resistance and draft card burnings?',
      },
      {
        step: 3,
        date: 'November 1969',
        title: 'Exposure of the My Lai Massacre',
        actor: 'Seymour Hersh & Lieutenant William Calley',
        tag: 'Atrocity Revealed',
        trigger:
          'Journalist Seymour Hersh exposes the murder of 504 unarmed Vietnamese villagers at My Lai by Charlie Company troops under Lt. Calley.',
        because:
          'Frustrated soldiers had been told all inhabitants in the village were enemy combatants or sympathizers.',
        therefore:
          'Horrified the nation and shattered the moral argument that American forces were defending Vietnamese freedom against evil.',
        connective:
          'When President Nixon ordered the invasion of Cambodia in 1970, campus fury erupted into deadly violence...',
        exam_link:
          'Significance: Destroyed the moral claim of American intervention and energized the nationwide anti-war movement.',
        question:
          'How did revelations of the My Lai massacre undermine the moral justification for the American war effort?',
      },
      {
        step: 4,
        date: '4 May 1970',
        title: 'The Kent State University Shootings',
        actor: 'Ohio National Guardsmen & Student Protesters',
        tag: 'Campus Martyrdom',
        trigger:
          'Ohio National Guardsmen fire 67 rounds into unarmed students protesting the invasion of Cambodia, killing four and wounding nine.',
        because:
          'Guardsmen panicked when confronting an angry crowd of student demonstrators on the university campus commons.',
        therefore:
          'Triggered a nationwide student strike of four million students, closing over 450 universities and high schools across the country.',
        connective:
          'Government credibility collapsed completely when internal secret archives were leaked to the press...',
        exam_link:
          'Significance: Brought the violence of the Vietnam War onto an American college campus, shocking the nation.',
        question:
          'Why did the shooting of student protesters at Kent State University in May 1970 cause nationwide campus upheaval?',
      },
      {
        step: 5,
        date: 'June 1971',
        title: 'Publication of the Pentagon Papers',
        actor: 'Daniel Ellsberg & The New York Times',
        tag: 'Government Deception Exposed',
        trigger:
          'Whistleblower Daniel Ellsberg leaks classified Defense Department studies proving four administrations systematically lied about the scope of the war.',
        because:
          'Ellsberg believed the American public had a right to know their leaders had knowingly expanded a war they privately judged unwinnable.',
        therefore:
          'The Supreme Court protected press freedom against Nixon, destroying the final remnants of trust between the American public and the federal government.',
        connective:
          'Yet despite mass opposition, millions of Americans fiercely defended the war effort and supported the president...',
        exam_link:
          'Significance: Confirmed the public worst suspicions regarding systematic official deceit concerning Vietnam.',
        question:
          'How did the publication of the Pentagon Papers permanently damage public trust in presidential honesty?',
      },
    ],
  },

  // Lesson 14 (KT 4.2)
  {
    lessonId: 'lesson_4_2',
    title: 'The Silent Majority, Cold War Patriotism & Hard Hat Riots: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Analyse why conservative, patriotic, and blue-collar Americans supported the war and rejected counter-culture protests.',
    stages: [
      {
        step: 1,
        date: '1965–1969',
        title: 'Cold War Patriotism & The Red Threat',
        actor: "Middle America & Veterans' Organizations",
        tag: 'Anti-Communist Loyalty',
        trigger:
          'Millions of conservative, blue-collar, and churchgoing Americans view the war as a patriotic duty to halt Soviet and Chinese communist aggression.',
        because:
          'Generation of World War II and Korean War veterans believed America was the global defender of Christian democracy against atheist totalitarianism.',
        therefore:
          'Condemned student anti-war protesters as privileged, unpatriotic draft-dodgers who were betraying American soldiers dying in the jungle.',
        connective:
          'President Nixon capitalized on this deep resentment to build a durable conservative political coalition...',
        exam_link:
          'Significance: Explained why a substantial portion of the American electorate steadfastly supported the war effort.',
        question:
          'Why did millions of patriotic Americans continue to view the Vietnam War as an essential Cold War struggle?',
      },
      {
        step: 2,
        date: '3 November 1969',
        title: "Nixon's 'Silent Majority' Address",
        actor: 'President Richard Nixon & American Television',
        tag: 'Mobilizing Middle America',
        trigger:
          "President Nixon appeals directly to 'the great silent majority of my fellow Americans' to support his gradual withdrawal strategy.",
        because:
          'Nixon wanted to isolate anti-war marchers as a noisy radical minority and rally conservative suburban and rural voters.',
        therefore:
          'Galvanized 77% public approval, mobilizing conservative voters against radical anti-war demonstrators and radical counter-culture.',
        connective:
          'Tensions between anti-war students and patriotic working-class citizens erupted in street violence...',
        exam_link:
          'Significance: Gave political voice and ideological legitimacy to the conservative backlash against the 1960s counter-culture.',
        question:
          "How did President Nixon's 'Silent Majority' speech mobilize conservative support for his administration's war policies?",
      },
      {
        step: 3,
        date: '8 May 1970',
        title: 'The Hard Hat Riots in New York City',
        actor: '200 Construction Workers & Student Demonstrators',
        tag: 'Blue-Collar Violence',
        trigger:
          "200 helmeted construction workers attack anti-war students protesting the Kent State shootings in Lower Manhattan, chanting 'USA All the Way'.",
        because:
          'Union laborers resented affluent college students who burned flags while working-class sons were drafted to fight and die in Vietnam.',
        therefore:
          'Revealed profound cultural, class, and political polarization between working-class laborers and university student activists.',
        connective:
          'Pro-war sentiment also remained dominant among conservative congressional hawks...',
        exam_link:
          'Significance: Demonstrated the profound class division within American society over the Vietnam War.',
        question:
          "What did the May 1970 'Hard Hat Riots' in Manhattan reveal about working-class hostility toward student anti-war protesters?",
      },
      {
        step: 4,
        date: '1970–1972',
        title: 'Congressional Hawks & The Fear of Humiliation',
        actor: 'Conservative Congressmen & Military Leaders',
        tag: 'Superpower Credibility',
        trigger:
          'Conservative politicians argue that a premature exit would dishonor 50,000 fallen troops, embolden Soviet aggression, and humiliate the superpower.',
        because:
          'Hawks believed American global credibility across NATO and Asia depended on proving Washington would never abandon an ally.',
        therefore:
          'Sustained vital congressional military budgets for bombing campaigns while Nixon negotiated phased troop drawdowns.',
        connective:
          'This conservative loyalty translated into one of the largest electoral landslides in American political history...',
        exam_link:
          'Significance: Prevented Congress from immediately cutting off military funding during Nixon first presidential term.',
        question:
          'Why did congressional hawks argue that immediate American withdrawal would catastrophically damage US global credibility?',
      },
      {
        step: 5,
        date: 'November 1972',
        title: "Nixon's 49-State Landslide Re-election",
        actor: 'Richard Nixon & The American Electorate',
        tag: 'Electoral Vindication',
        trigger:
          "Nixon defeats anti-war candidate George McGovern in a 49-state landslide, winning 60.7% of the popular vote on 'Peace is at hand'.",
        because:
          "Voters rejected McGovern's platform of immediate withdrawal and amnesty for draft evaders as too radical.",
        therefore:
          "Demonstrated that mainstream Middle America rejected radical anti-war liberalism and favored Nixon's negotiated 'peace with honor'.",
        connective:
          'With a massive mandate secured, Nixon applied final coercive military pressure to force a peace treaty...',
        exam_link:
          'Significance: Confirmed the immense political power of the Silent Majority and endorsed Nixon handling of the conflict.',
        question:
          "How did Nixon's massive 1972 electoral victory prove the enduring strength of the conservative 'Silent Majority'?",
      },
    ],
  },

  // Lesson 15 (KT 4.3)
  {
    lessonId: 'lesson_4_3',
    title: 'Paris Peace Accords, Christmas Bombings & Exit: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Evaluate how diplomacy, bombing pressure, and congressional limitations enabled US military extrication while dooming Saigon.',
    stages: [
      {
        step: 1,
        date: '1969–1972',
        title: 'Secret Paris Negotiations (Kissinger & Le Duc Tho)',
        actor: 'Henry Kissinger & Le Duc Tho',
        tag: 'Clandestine Diplomacy',
        trigger:
          'Kissinger conducts three years of clandestine diplomacy in Paris, conceding that North Vietnamese troops could remain stationed in the South.',
        because:
          'The US was desperate to extricate its military and realized Hanoi would never agree to withdraw its forces from South Vietnamese soil.',
        therefore:
          "Overrode furious objections from South Vietnamese President Thieu, prioritizing American troop exit above South Vietnam's territorial integrity.",
        connective:
          "When negotiations deadlocked over Saigon's objections, Nixon resorted to ferocious air power...",
        exam_link:
          'Significance: Achieved the secret diplomatic compromises necessary for the United States to withdraw its armed forces.',
        question:
          "Why was Henry Kissinger's concession allowing North Vietnamese troops to remain in South Vietnam so controversial?",
      },
      {
        step: 2,
        date: '18–29 December 1972',
        title: 'Operation Linebacker II (Christmas Bombings)',
        actor: 'B-52 Stratofortresses & Hanoi Defenses',
        tag: 'Coercive Carpet Bombing',
        trigger:
          'When peace talks stall, Nixon unleashes 729 B-52 sorties dropping 20,000 tons of explosives on Hanoi and Haiphong over 11 days.',
        because:
          'Nixon wanted to force Hanoi back to the negotiating table and convince President Thieu that the US would defend South Vietnam with air power.',
        therefore:
          'Forced Hanoi back to the negotiating table while coercing President Thieu into signing the agreement with promises of US retaliation if broken.',
        connective:
          'Within weeks of the bombing halt, all four belligerents gathered in Paris to sign the final peace treaty...',
        exam_link:
          'Significance: The most intense bombing campaign of the war, used to compel the signing of the Paris Peace Accords.',
        question:
          "What did Nixon intend to achieve by unleashing the massive Operation Linebacker II 'Christmas Bombings' in December 1972?",
      },
      {
        step: 3,
        date: '27 January 1973',
        title: 'Signing of the Paris Peace Accords',
        actor: 'US, North Vietnam, South Vietnam & Vietcong',
        tag: 'Formal Peace Treaty',
        trigger:
          'The four parties sign the Paris Peace Accords, agreeing to a complete US military withdrawal, release of 591 American POWs, and a ceasefire in place.',
        because:
          'The US achieved its minimum objective of recovering American prisoners of war and exiting combat without formal surrender.',
        therefore:
          'Ended direct US military combat intervention in Vietnam after eight years, leaving 150,000 communist troops occupying South Vietnamese territory.',
        connective:
          'Under the strict 60-day timetable of the treaty, the final American military units boarded transports home...',
        exam_link:
          'Significance: Formally ended direct American military participation in the Vietnam War.',
        question:
          'What were the primary terms of the 1973 Paris Peace Accords, and how did they favor North Vietnam strategically?',
      },
      {
        step: 4,
        date: '29 March 1973',
        title: 'Departure of Final US Combat Troops',
        actor: 'US Military Assistance Command, Vietnam (MACV)',
        tag: 'Complete Military Withdrawal',
        trigger:
          'General Weyand folds the MACV colors; the last American combat troops fly home, leaving behind only a small defense attaché in Saigon.',
        because:
          'The United States completed its withdrawal obligations under the Paris Peace Accords, closing all American military bases.',
        therefore:
          'Left the South Vietnamese armed forces to defend their territory against the North with dwindling American ammunition and fuel supplies.',
        connective:
          'Determined that the White House should never again drag the country into undeclared foreign wars, Congress reasserted its authority...',
        exam_link:
          'Significance: Concluded the direct military deployment of over 2.7 million Americans who served in Vietnam.',
        question:
          'How did the final departure of US combat troops in March 1973 leave South Vietnam militarily vulnerable?',
      },
      {
        step: 5,
        date: '7 November 1973',
        title: "Congress Passes the War Powers Act Over Nixon's Veto",
        actor: 'US Congress & President Nixon',
        tag: 'Limiting War Powers',
        trigger:
          'Congress passes the War Powers Act of 1973 over Nixon veto, requiring the president to consult Congress before committing armed forces abroad.',
        because:
          'Lawmakers were determined to prevent another imperial presidency using incidents like Tonkin to wage secret, protracted wars.',
        therefore:
          'Stripped the presidency of unilateral war-making power, ensuring the US could not deploy air strikes when North Vietnam invaded the South.',
        connective:
          'With American military intervention legally impossible, Hanoi prepared its final, decisive conventional offensive...',
        exam_link:
          'Significance: Permanently constrained presidential war-making power and guaranteed that US air power would not save South Vietnam.',
        question:
          'Why was the 1973 War Powers Act passed by Congress, and how did it prevent future US military intervention?',
      },
    ],
  },

  // Lesson 16 (KT 4.4)
  {
    lessonId: 'lesson_4_4',
    title: 'The Fall of Saigon & Four Reasons for Defeat: 5-Stage Causal Domino Chain',
    subtitle: 'Edexcel Paper 3 Analytical Strategy for Causation & Historical Significance',
    exam_strategy:
      'Synthesise the military, political, domestic, and ideological factors that caused the total failure of US policy in Vietnam.',
    stages: [
      {
        step: 1,
        date: 'January–March 1975',
        title: 'The North Vietnamese Spring Offensive',
        actor: 'General Van Tien Dung & NVA Armies',
        tag: 'Conventional Blitzkrieg',
        trigger:
          'North Vietnam launches a full-scale conventional armor and infantry invasion; President Thieu orders a disastrous ARVN retreat from the Central Highlands.',
        because:
          'Hanoi recognized that Watergate and the War Powers Act prevented the United States from re-entering the war with B-52 air support.',
        therefore:
          "Triggered a chaotic rout known as the 'Column of Tears', as demoralized ARVN units disintegrated and abandoned hundreds of millions in US weapons.",
        connective:
          'Communist divisions rapidly encircled Saigon, triggering panic throughout the South Vietnamese capital...',
        exam_link:
          'Significance: Exposed the total inability of the ARVN to defend South Vietnam without direct American military air intervention.',
        question:
          'Why did the South Vietnamese military collapse so rapidly during the communist Spring Offensive of 1975?',
      },
      {
        step: 2,
        date: '29–30 April 1975',
        title: 'Operation Frequent Wind & The Fall of Saigon',
        actor: 'US Marine Helicopters & Evacuees',
        tag: 'Humiliating Evacuation',
        trigger:
          'US helicopters evacuate 7,000 Americans and at-risk Vietnamese from Saigon rooftops; NVA Tank 390 crashes through the gates of the Presidential Palace.',
        because:
          'Saigon was completely surrounded and South Vietnamese armed resistance had completely collapsed across the entire country.',
        therefore:
          'President Duong Van Minh announced unconditional surrender, reuniting Vietnam under communist rule and concluding America first defeat.',
        connective:
          'The dramatic fall of Saigon prompted historians to identify four fundamental causes of American defeat...',
        exam_link:
          'Significance: The dramatic and symbolic final moment of American defeat, completing thirty years of conflict in Vietnam.',
        question:
          'How did the frantic helicopter evacuations and the fall of Saigon on 30 April 1975 symbolize total American defeat?',
      },
      {
        step: 3,
        date: '1954–1975',
        title: 'Vietnamese Determination vs Weakness of South Vietnam',
        actor: 'Vietcong / NVA Cadres vs Saigon Government',
        tag: 'Political Legitimacy Gap',
        trigger:
          'Communist forces were fueled by nationalist anti-colonial dedication, while the Saigon regime was crippled by endemic corruption, coups, and lack of peasant legitimacy.',
        because:
          'Peasants saw the communist movement as the authentic champions of national independence against foreign Western imperialists.',
        therefore:
          'Ensured the North Vietnamese would endure astronomical casualties that no democratic American government could politically tolerate.',
        connective:
          'In contrast, American conventional military doctrine was fundamentally ill-suited to the conflict...',
        exam_link:
          'Significance: Demonstrated that military hardware cannot compensate for an utter lack of political legitimacy and grassroots loyalty.',
        question:
          'Why was the ideological commitment of Vietnamese communists superior to the fragile political legitimacy of South Vietnam?',
      },
      {
        step: 4,
        date: '1965–1973',
        title: 'Failure of Industrial Military Tactics in Jungle Warfare',
        actor: 'US Military Command & Asymmetric Insurgency',
        tag: 'Flawed Military Doctrine',
        trigger:
          'Superior US firepower, carpet bombing, and defoliants proved useless against elusive guerrilla tunnel warfare and the Ho Chi Minh supply highway.',
        because:
          'The Pentagon incorrectly assumed that overwhelming conventional firepower and high body counts would compel the enemy to surrender.',
        therefore:
          'Inflicted catastrophic civilian casualties that turned the South Vietnamese population against the US military and created millions of refugees.',
        connective:
          'Crucially, the war could not be won because the American domestic political foundation collapsed...',
        exam_link:
          'Significance: Proved the bankruptcy of the US attrition strategy against an asymmetric guerrilla enemy with infinite determination.',
        question:
          'Why were advanced American military technology and firepower unable to overcome asymmetric jungle guerrilla warfare?',
      },
      {
        step: 5,
        date: '1968–1975',
        title: 'The Collapse of the American Domestic Home Front',
        actor: 'US Public, Media, Congress & Returning Veterans',
        tag: 'Home Front Collapse',
        trigger:
          'Mounting troop deaths (58,220), the living room television war, economic inflation, and moral disgust destroyed political willingness to sustain the war.',
        because:
          'Democracies cannot fight prolonged, costly wars without clear strategic goals and the moral consent of their citizens.',
        therefore:
          'Forced Congress to cut off military funding for South Vietnam, proving that modern democracies cannot sustain protracted wars without public consent.',
        connective:
          "The legacy of Vietnam left America psychologically scarred by the 'Vietnam Syndrome' for a generation...",
        exam_link:
          'Significance: Demonstrated that the ultimate decisive battlefield of modern democratic warfare is domestic public and political support.',
        question:
          'How did the loss of American domestic political will ultimately decide the outcome of the Vietnam War?',
      },
    ],
  },
];

console.log('======================================================================');
console.log('🇺🇸 INJECTING STANDARDIZED USA 5-STAGE ENQUIRY SPINES');
console.log('======================================================================');

function applySpinesToTarget(filePath) {
  console.log(`\n▶ Processing target: ${filePath}`);
  const rawData = require(filePath);
  const data = rawData.default || rawData.usa_data || rawData;

  let updatedCount = 0;
  USA_16_LESSON_SPINES.forEach((spineDef) => {
    const lesson = data.lessons.find((l) => l.id === spineDef.lessonId);
    if (!lesson) {
      console.warn(`  ⚠️ Could not find lesson with id: ${spineDef.lessonId}`);
      return;
    }

    lesson.causal_domino_spine = {
      title: spineDef.title,
      subtitle: spineDef.subtitle,
      exam_strategy: spineDef.exam_strategy,
      stages: spineDef.stages,
    };
    updatedCount++;
    console.log(`  ✅ Injected 5 stages into ${lesson.id} ("${lesson.title.slice(0, 45)}...")`);
  });

  // Re-write file with dual CommonJS / ESM export structure
  const fileContent = `const usa_data = ${JSON.stringify(data, null, 2)};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = usa_data;
}
export default usa_data;
export { usa_data };
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`  💾 Successfully updated ${filePath} (${updatedCount} lessons).`);
}

applySpinesToTarget(SOURCE_FILE);
applySpinesToTarget(PUBLIC_FILE);

console.log('\n======================================================================');
console.log('🎉 USA 5-STAGE CAUSAL DOMINO INJECTION COMPLETE');
console.log('======================================================================');
