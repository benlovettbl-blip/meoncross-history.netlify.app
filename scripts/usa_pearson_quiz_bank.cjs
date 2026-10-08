/**
 * usa_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 3 (1HI0/33):
 * The USA, 1954–75: Conflict at Home and Abroad.
 * Master Knowledge Retrieval Bank (16 Enquiries x 12 Questions = 192 Questions).
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Edexcel Specification and Revision Guide.
 * 2. High-Yield Specification Recall: Zero obscure trivia, zero university-level fluff.
 * 3. Two-Line Format: Line 1 = Key Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 4. 4-4-4 Tiered Hierarchy per Enquiry:
 *    - Q1–4: Chronology & Foundational Anchors (Dates, Acts, Protagonists, Terms)
 *    - Q5–8: Causal Mechanisms & Tactics (Why methods succeeded or failed, executive decisions)
 *    - Q9–12: Outcomes, Limitations & Debates (Significance, statistics, legislative gaps, examiner traps)
 * 5. Authentic Examiner Trap Callout for every enquiry.
 */

const USA_PEARSON_QUIZ_BANK = [
  // =========================================================================
  // KEY TOPIC 1: THE DEVELOPMENT OF THE CIVIL RIGHTS MOVEMENT, 1954–60
  // =========================================================================

  // ENQUIRY 1 (KT 1.1): The Position of Black Americans in the Early 1950s
  {
    num: 1,
    id: 'lesson_1_1',
    keyTopic: 'Key Topic 1: Civil Rights, 1954–60',
    title: 'Position of Black Americans in the Early 1950s',
    enquiry:
      'What was the legal, social, and political position of Black Americans in the early 1950s?',
    examinerTrap:
      'Examiner Warning: Do not confuse de jure segregation (enforced by Jim Crow state laws) with de facto segregation (caused by economic poverty and housing discrimination in the North).',
    questions: [
      {
        q: 'Which state laws enforced racial segregation in public facilities across the American South?',
        a: 'Jim Crow laws',
        exp: 'Legally mandated separate schools, transport, and restaurants, relegating Black Americans to second-class citizenship.',
      },
      {
        q: 'What 1896 Supreme Court ruling established the legal doctrine of "separate but equal"?',
        a: 'Plessy v. Ferguson (1896)',
        exp: 'Provided constitutional justification for Southern states to enforce racial segregation for over half a century.',
      },
      {
        q: 'What does the abbreviation NAACP stand for?',
        a: 'National Association for the Advancement of Colored People',
        exp: 'Founded in 1909, it pursued a methodical legal strategy challenging segregation through federal courts.',
      },
      {
        q: 'Which civil rights organisation was founded in Chicago in 1942 to pioneer non-violent direct action?',
        a: 'CORE (Congress of Racial Equality)',
        exp: 'Introduced sit-ins and peaceful boycotts inspired by Mahatma Gandhi, laying tactical foundations for the 1960s.',
      },
      {
        q: 'What two voting hurdles were systematically used in the South to disenfranchise Black citizens?',
        a: 'Poll taxes and literacy tests',
        exp: 'Administered corruptly by all-white registrars to prevent impoverished and educated Black citizens from registering.',
      },
      {
        q: 'Who served as the chief legal counsel for the NAACP Legal Defense Fund in landmark 1950s cases?',
        a: 'Thurgood Marshall',
        exp: 'Directed the litigation campaign that proved segregated facilities inherently violated the 14th Amendment.',
      },
      {
        q: 'Which US President issued Executive Order 9981 in 1948 to desegregate the US Armed Forces?',
        a: 'President Harry S. Truman',
        exp: 'Bypassed congressional Southern segregationists to demonstrate federal executive power in advancing civil rights.',
      },
      {
        q: 'What constitutional amendment guarantees all US citizens "equal protection of the laws"?',
        a: 'The 14th Amendment (1868)',
        exp: 'Served as the core constitutional weapon used by civil rights lawyers to strike down state segregation statutes.',
      },
      {
        q: 'What wartime campaign urged Black Americans to fight fascism abroad and racism at home?',
        a: 'The "Double V" Campaign',
        exp: 'Empowered over one million returning Black WWII veterans to demand full democratic rights and dignity.',
      },
      {
        q: 'Approximately what percentage of eligible Black adults were registered to vote in Mississippi in the early 1950s?',
        a: 'Fewer than 5% (under 20% across the South)',
        exp: 'Demonstrated how terror, physical intimidation, and economic coercion totally suppressed Black political power.',
      },
      {
        q: 'What 1944 Supreme Court case outlawed the all-white primary election system in Texas?',
        a: 'Smith v. Allwright (1944)',
        exp: 'Established a crucial legal precedent that political party primaries were subject to constitutional nondiscrimination.',
      },
      {
        q: 'What was the primary limitation of relying solely on NAACP courtroom victories in the early 1950s?',
        a: 'Court rulings were ignored or defied by Southern state governments without federal enforcement',
        exp: 'Highlighted that legal victories alone could not dismantle segregation without mass grassroots direct action.',
      },
    ],
  },

  // ENQUIRY 2 (KT 1.2): Progress in Education: Brown v. Topeka & Little Rock
  {
    num: 2,
    id: 'lesson_1_2',
    keyTopic: 'Key Topic 1: Civil Rights, 1954–60',
    title: 'Education: Brown v. Topeka & Little Rock',
    enquiry: 'How did developments in education challenge segregation between 1954 and 1957?',
    examinerTrap:
      'Examiner Warning: Brown v. Topeka (1954) outlawed school segregation in principle, but Brown II (1955) vaguely ordered integration "with all deliberate speed", allowing Southern states to stall for over a decade.',
    questions: [
      {
        q: 'On what date did the US Supreme Court deliver its landmark ruling in Brown v. Board of Education of Topeka?',
        a: '17 May 1954',
        exp: 'Unanimously ruled 9–0 that racial segregation in state public schools was unconstitutional under the 14th Amendment.',
      },
      {
        q: 'Who was the Chief Justice of the Supreme Court who authored the unanimous Brown decision?',
        a: 'Chief Justice Earl Warren',
        exp: 'United the court to declare that "in the field of public education, separate educational facilities are inherently unequal."',
      },
      {
        q: 'What famous psychological evidence was cited in Brown to prove segregation damaged Black children?',
        a: 'The Kenneth and Mamie Clark "doll test"',
        exp: 'Demonstrated that state-enforced segregation generated deep feelings of racial inferiority in Black school children.',
      },
      {
        q: 'What vague phrase in Brown II (1955) allowed Southern school boards to delay integration indefinitely?',
        a: '"With all deliberate speed"',
        exp: 'Gave segregationist Southern officials a legal loophole to delay desegregation for over a decade.',
      },
      {
        q: 'Which Arkansas high school became the central battleground for desegregation in September 1957?',
        a: 'Little Rock Central High School',
        exp: 'Nine Black students attempted to enrol under a federal court order, facing violent white mob resistance.',
      },
      {
        q: 'Which Arkansas Governor deployed the State National Guard to block the Little Rock Nine from entering?',
        a: 'Governor Orval Faubus',
        exp: 'Openly defied federal court authority to win segregationist votes in his upcoming state gubernatorial election.',
      },
      {
        q: 'Which 15-year-old student faced an angry white mob alone on the first day at Little Rock?',
        a: 'Elizabeth Eckford',
        exp: 'Photographs of her stoic dignity amidst screaming segregationists were broadcast globally, shocking the nation.',
      },
      {
        q: 'What decisive military action did President Eisenhower take on 24 September 1957 at Little Rock?',
        a: 'Sent 1,200 soldiers of the 101st Airborne Division and federalised the Arkansas National Guard',
        exp: 'Demonstrated that the federal executive branch would use armed military force to uphold Supreme Court rulings.',
      },
      {
        q: 'How did Governor Faubus retaliate the following school year in 1958–59 (the "Lost Year")?',
        a: 'He closed all four public high schools in Little Rock to prevent integration',
        exp: 'Over 3,000 students missed an entire year of education until federal courts forced the schools to reopen integrated.',
      },
      {
        q: 'What document was signed in 1956 by 101 Southern congressmen pledging to resist Brown by all lawful means?',
        a: 'The Southern Manifesto',
        exp: 'Encouraged state-sponsored "Massive Resistance" and institutional defiance of federal desegregation mandates.',
      },
      {
        q: 'Who was the first Black student to graduate from Little Rock Central High School in May 1958?',
        a: 'Ernest Green',
        exp: 'Attended by Martin Luther King Jr., his graduation proved Black students could succeed despite severe harassment.',
      },
      {
        q: 'What proportion of Southern Black children attended integrated schools by 1964, ten years after Brown?',
        a: 'Fewer than 2% (approx. 1.2%)',
        exp: 'Proved that legal rulings alone were inadequate without binding federal enforcement legislation and funding cuts.',
      },
    ],
  },

  // ENQUIRY 3 (KT 1.3): The Montgomery Bus Boycott (1955–56)
  {
    num: 3,
    id: 'lesson_1_3',
    keyTopic: 'Key Topic 1: Civil Rights, 1954–60',
    title: 'The Montgomery Bus Boycott (1955–56)',
    enquiry: 'How did the Montgomery Bus Boycott happen, and why did it achieve victory?',
    examinerTrap:
      'Examiner Warning: Rosa Parks was not an accidental activist who was merely tired; she was a trained NAACP field secretary whose arrest was seized upon by Jo Ann Robinson and the WPC to execute a long-planned boycott.',
    questions: [
      {
        q: 'On what date was Rosa Parks arrested in Montgomery, Alabama, for refusing to surrender her bus seat?',
        a: '1 December 1955',
        exp: 'Her arrest provided the catalyst for the Women’s Political Council to initiate a coordinated municipal bus boycott.',
      },
      {
        q: 'Which organisation and leader mimeographed 35,000 leaflets overnight calling for the Monday boycott?',
        a: 'Jo Ann Robinson and the Women’s Political Council (WPC)',
        exp: 'Demonstrated that the boycott was organised through disciplined grassroots leadership before national figures arrived.',
      },
      {
        q: 'What new organisation was formed on 5 December 1955 to oversee and run the bus boycott?',
        a: 'The Montgomery Improvement Association (MIA)',
        exp: 'Unified local church ministers and community leaders under a single coordinated leadership council.',
      },
      {
        q: 'Who was chosen as the 26-year-old president of the Montgomery Improvement Association?',
        a: 'Dr Martin Luther King Jr.',
        exp: 'His inspirational Christian rhetoric and non-violent philosophy catapulted him into national civil rights leadership.',
      },
      {
        q: 'What percentage of Montgomery bus passengers were Black, providing massive economic leverage?',
        a: 'Approximately 70% to 75%',
        exp: 'The boycott deprived the city bus company of vital fares, costing thousands of dollars daily in lost revenue.',
      },
      {
        q: 'How did the Black community travel to work during the 381-day boycott without city buses?',
        a: 'A coordinated 300-car pool system, Black taxi discounts, and walking up to 12 miles daily',
        exp: 'Displayed extraordinary community sacrifice, discipline, and logistical organisation across all weather.',
      },
      {
        q: 'How did segregationist authorities attempt to disrupt the car pool network?',
        a: 'Arrested drivers for trivial traffic offences, cancelled insurance policies, and harassed riders',
        exp: 'Failed to break the boycott; instead, the repression strengthened community resolve and attracted northern donations.',
      },
      {
        q: 'What violent acts did white extremists commit against boycott leaders during January 1956?',
        a: 'Firebombed the family homes of Martin Luther King Jr. and E.D. Nixon',
        exp: 'King urged his followers not to retaliate with violence, maintaining strict moral discipline.',
      },
      {
        q: 'What was the landmark federal court and Supreme Court ruling that declared bus segregation unconstitutional?',
        a: 'Browder v. Gayle (November 1956)',
        exp: 'Struck down Alabama’s state and municipal transit segregation laws as a violation of the 14th Amendment.',
      },
      {
        q: 'How many continuous days did the Montgomery Bus Boycott last before buses were integrated?',
        a: '381 days (ended 20–21 December 1956)',
        exp: 'Proved that prolonged, disciplined non-violent economic direct action could force constitutional change.',
      },
      {
        q: 'What major civil rights organisation did Martin Luther King Jr. found in 1957 following the boycott?',
        a: 'The Southern Christian Leadership Conference (SCLC)',
        exp: 'Organised Black Southern churches into a permanent regional network for non-violent direct action.',
      },
      {
        q: 'Why was the Montgomery Bus Boycott a decisive turning point in the civil rights struggle?',
        a: 'It proved grassroots mass mobilization and economic pressure could defeat Jim Crow when combined with federal law',
        exp: 'Shifted the civil rights movement from isolated legal court petitions into a mass non-violent popular crusade.',
      },
    ],
  },

  // ENQUIRY 4 (KT 1.4): White Resistance: Emmett Till, KKK & 1957 Civil Rights Act
  {
    num: 4,
    id: 'lesson_1_4',
    keyTopic: 'Key Topic 1: Civil Rights, 1954–60',
    title: 'White Resistance, Emmett Till & 1957 Act',
    enquiry:
      'How did white resistance manifest in the South, and what was the impact of the 1957 Civil Rights Act?',
    examinerTrap:
      'Examiner Warning: Do not confuse the White Citizens’ Councils (businessmen using mortgage cancellations and job firings) with the Ku Klux Klan (night riders using terror, firebombings, and physical lynchings).',
    questions: [
      {
        q: 'Which 14-year-old Chicago youth was brutally murdered in Money, Mississippi, in August 1955?',
        a: 'Emmett Till',
        exp: 'Accused of whistling at a white shopkeeper, he was abducted, beaten, shot, and dumped in the Tallahatchie River.',
      },
      {
        q: 'What courageous decision did Mamie Till Bradley make regarding her son’s funeral in Chicago?',
        a: 'She insisted on an open-casket funeral so the world could see the racial brutality',
        exp: 'Over 50,000 mourners attended, and published photos in Jet magazine horrified national and international audiences.',
      },
      {
        q: 'How quickly did the all-white male jury acquit Emmett Till’s killers in September 1955?',
        a: '67 minutes (just over one hour)',
        exp: 'Exposed the complete corruption of the Southern legal system, galvanising an entire generation of civil rights activists.',
      },
      {
        q: 'What organisation of white professionals and politicians was founded in 1954 to resist integration economically?',
        a: 'The White Citizens’ Councils',
        exp: 'Used economic terrorism: fired Black workers, evicted sharecroppers, and cancelled bank mortgages for civil rights supporters.',
      },
      {
        q: 'What white supremacist vigilante group revived across the South, using cross burnings and bombings?',
        a: 'The Ku Klux Klan (KKK)',
        exp: 'Terrorised Black communities with nighttime raids, beatings, and church bombings with local police complicity.',
      },
      {
        q: 'What was the primary goal of the Civil Rights Act of 1957 introduced by the Eisenhower administration?',
        a: 'To increase Black voter registration in the Southern states',
        exp: 'Established a federal Civil Rights Commission and created a Civil Rights Division within the US Justice Department.',
      },
      {
        q: 'Which Southern Senator conducted a record-breaking 24-hour-and-18-minute filibuster against the 1957 Act?',
        a: 'Senator Strom Thurmond (South Carolina)',
        exp: 'Demonstrated the ferocious resistance of Southern Democratic senators against any federal civil rights intervention.',
      },
      {
        q: 'Who was the Senate Majority Leader who watered down the 1957 bill to ensure its passage?',
        a: 'Lyndon B. Johnson',
        exp: 'Removed federal enforcement powers, requiring local Southern juries to try contempt cases, making convictions impossible.',
      },
      {
        q: 'By what percentage did Black voter registration increase in the South as a result of the 1957 Act?',
        a: 'By less than 3% (approximately 28,000 new voters)',
        exp: 'Revealed that weak federal voting laws without federal voter registrars could not overcome Southern obstruction.',
      },
      {
        q: 'What subsequent minor civil rights measure was signed by Eisenhower in 1960 to penalise obstruction of court orders?',
        a: 'The Civil Rights Act of 1960',
        exp: 'Introduced criminal penalties for bombing federal property and obstructing voting, but remained largely toothless.',
      },
      {
        q: 'What was the significance of the 1957 Act despite its practical weakness?',
        a: 'It was the first federal civil rights legislation passed by the US Congress since Reconstruction in 1875',
        exp: 'Broke an 82-year federal legislative paralysis, paving the way for the stronger 1964 and 1965 landmark acts.',
      },
      {
        q: 'How did Emmett Till’s killers respond after being acquitted by the Mississippi jury?',
        a: 'They confessed in detail to the murder in a paid Look magazine interview for $4,000',
        exp: 'Protected by constitutional double jeopardy, their brazen confession underscored the total lack of justice in the Deep South.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 2: PROTEST, PROGRESS AND RADICALISM, 1960–75
  // =========================================================================

  // ENQUIRY 5 (KT 2.1): Sit-Ins, Freedom Rides & James Meredith (1960–62)
  {
    num: 5,
    id: 'lesson_2_1',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Sit-Ins, Freedom Rides & James Meredith',
    enquiry:
      'How did peaceful protests (sit-ins and Freedom Rides) force the federal government to act?',
    examinerTrap:
      'Examiner Warning: The Freedom Rides (1961) specifically targeted interstate bus travel and terminal facilities governed by federal commerce laws, testing Boynton v. Virginia (1960), not general voting rights.',
    questions: [
      {
        q: 'Where did four Black college students launch the sit-in movement on 1 February 1960?',
        a: 'F.W. Woolworth lunch counter in Greensboro, North Carolina',
        exp: 'Refused to leave after being denied service, inspiring over 70,000 students to conduct sit-ins across the South.',
      },
      {
        q: 'What new student-led civil rights organisation was founded in April 1960 following the Greensboro sit-ins?',
        a: 'SNCC (Student Nonviolent Coordinating Committee)',
        exp: 'Mobilised fearless young activists committed to grassroots frontline direct action and jail-ins across the Deep South.',
      },
      {
        q: 'What tactic did sit-in protesters employ to strain Southern municipal authorities?',
        a: '"Jail-No-Bail"',
        exp: 'Refused to pay bail fines, filling local jails and creating acute financial and administrative crises for Southern cities.',
      },
      {
        q: 'What was the objective of the 1961 Freedom Rides organised by CORE?',
        a: 'To test whether interstate bus travel and terminal waiting rooms were being integrated as ordered by federal courts',
        exp: 'Tested enforcement of the Supreme Court’s Boynton v. Virginia ruling banning segregation in interstate transit.',
      },
      {
        q: 'What violent atrocity was committed against Freedom Riders outside Anniston, Alabama, in May 1961?',
        a: 'A KKK mob firebombed the Greyhound bus and held the doors shut to burn the riders alive',
        exp: 'Passengers narrowly escaped smoke inhalation; televised images of the burnt-out bus horrified global audiences.',
      },
      {
        q: 'Who was the Birmingham Police Commissioner who allowed the KKK 15 minutes to assault Freedom Riders?',
        a: 'Eugene "Bull" Connor',
        exp: 'Conspired with Klan leaders, ordering police officers away from the terminal so riders could be viciously beaten.',
      },
      {
        q: 'Which US Attorney General dispatched 500 federal marshals to protect the Freedom Riders in Montgomery?',
        a: 'Robert F. Kennedy',
        exp: 'Intervened when Alabama state troopers failed to provide protection, forcing Governor Patterson to yield.',
      },
      {
        q: 'What decisive federal order did the Interstate Commerce Commission (ICC) issue in November 1961?',
        a: 'Strictly desegregated all interstate buses, trains, and terminal facilities nationwide',
        exp: 'Proved that sustained non-violent student direct action could compel federal regulatory agencies to enforce the law.',
      },
      {
        q: 'Which Air Force veteran sought to become the first Black student at the University of Mississippi (Ole Miss) in 1962?',
        a: 'James Meredith',
        exp: 'Backed by an NAACP federal court order, his enrolment challenged Mississippi’s total collegiate segregation.',
      },
      {
        q: 'Which Mississippi Governor personally blocked James Meredith at the admissions door?',
        a: 'Governor Ross Barnett',
        exp: 'Defied federal court injunctions on state radio, inciting thousands of armed white segregationists to converge on Oxford.',
      },
      {
        q: 'What military force did President Kennedy dispatch to quell the campus riot at Ole Miss on 30 September 1962?',
        a: 'Over 300 federal marshals and 20,000 federal troops',
        exp: 'Suppressed a riot that left two dead and 300 injured, successfully escorting Meredith to register and attend classes.',
      },
      {
        q: 'How did sit-ins and Freedom Rides transform civil rights activism compared to early NAACP court cases?',
        a: 'They took the fight out of slow-moving courtrooms into direct public confrontations that forced immediate federal action',
        exp: 'Demonstrated the power of youth-driven direct action to create crises that federal leaders could not ignore.',
      },
    ],
  },

  // ENQUIRY 6 (KT 2.2): Birmingham, Washington & The Landmark Acts (1963–65)
  {
    num: 6,
    id: 'lesson_2_2',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Birmingham, Washington & Landmark Acts',
    enquiry:
      'How did campaigns in Birmingham and Selma lead to the Civil Rights and Voting Rights Acts?',
    examinerTrap:
      'Examiner Warning: The 1964 Civil Rights Act tackled segregation in public places and jobs, but omitted voting rights; it was the 1965 Selma campaign that compelled passage of the 1965 Voting Rights Act.',
    questions: [
      {
        q: 'What codename was given to the April–May 1963 SCLC desegregation campaign in Birmingham, Alabama?',
        a: '"Project C" (Project Confrontation)',
        exp: 'Deliberately targeted America’s most rigidly segregated city to provoke Bull Connor into televised police violence.',
      },
      {
        q: 'What controversial tactic did the SCLC deploy in Birmingham on 2–3 May 1963?',
        a: 'The Children’s Crusade',
        exp: 'Trained school students marched peacefully; Bull Connor attacked them with high-pressure firehoses and police attack dogs.',
      },
      {
        q: 'What famous philosophical text did MLK draft while imprisoned during the Birmingham campaign?',
        a: '"Letter from Birmingham Jail"',
        exp: 'Argued that citizens had a moral duty to disobey unjust segregation laws through peaceful direct action.',
      },
      {
        q: 'On what date was the historic March on Washington for Jobs and Freedom held?',
        a: '28 August 1963',
        exp: 'Brought together over 250,000 Black and white demonstrators at the Lincoln Memorial to lobby for civil rights legislation.',
      },
      {
        q: 'What iconic speech did Martin Luther King Jr. deliver at the Lincoln Memorial during the march?',
        a: 'The "I Have a Dream" speech',
        exp: 'Framed racial equality within the American Dream and Christian ethics, winning massive national moral support.',
      },
      {
        q: 'Which US President signed the landmark Civil Rights Act of 1964 on 2 July 1964?',
        a: 'President Lyndon B. Johnson (LBJ)',
        exp: 'Used his legislative skill and JFK’s memory to overcome a 54-day Southern Democratic Senate filibuster.',
      },
      {
        q: 'What core provisions were established by the Civil Rights Act of 1964?',
        a: 'Outlawed segregation in all public facilities, banned employment discrimination (EEOC), and cut federal funds to segregated schools',
        exp: 'Legally destroyed the entire public framework of Southern Jim Crow segregation.',
      },
      {
        q: 'What voter registration campaign was organised across Mississippi in the summer of 1964?',
        a: 'Freedom Summer',
        exp: 'SNCC, CORE, and 1,000 northern white student volunteers established Freedom Schools and registered Black voters.',
      },
      {
        q: 'Which three civil rights workers were abducted and murdered by the KKK in Philadelphia, Mississippi, in June 1964?',
        a: 'James Chaney, Andrew Goodman, and Michael Schwerner',
        exp: 'Their murders sparked massive national outrage and exposed state police complicity in white supremacist terror.',
      },
      {
        q: 'What violent clash occurred on the Edmund Pettus Bridge in Selma on 7 March 1965 ("Bloody Sunday")?',
        a: 'Alabama state troopers and mounted possemen tear-gassed and clubbed 600 peaceful marchers',
        exp: 'Televised footage interrupted Sunday films across America, shocking 48 million viewers and humiliating the government.',
      },
      {
        q: 'What revolutionary law did President Johnson sign on 6 August 1965 in response to Selma?',
        a: 'The Voting Rights Act of 1965',
        exp: 'Suspended literacy tests, banned poll taxes, and deployed federal registrars to register Southern Black voters directly.',
      },
      {
        q: 'How dramatic was the immediate impact of the Voting Rights Act of 1965 on Mississippi voter registration?',
        a: 'Black registration soared from under 7% in 1964 to over 60% by 1968',
        exp: 'Permanently transformed Southern democracy, leading to the election of thousands of Black municipal and state officials.',
      },
    ],
  },

  // ENQUIRY 7 (KT 2.3): Malcolm X & The Rise of Black Power (1964–68)
  {
    num: 7,
    id: 'lesson_2_3',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Malcolm X & Rise of Black Power',
    enquiry:
      'What was the Black Power movement, and how did it differ from non-violent direct action?',
    examinerTrap:
      'Examiner Warning: Never portray the Black Panther Party as purely violent extremists; examiners look for their community survival programs (Free Breakfast for Children, sickle cell clinics) alongside armed self-defense.',
    questions: [
      {
        q: 'Which religious organisation did Malcolm X champion before his split in 1964?',
        a: 'The Nation of Islam (Black Muslims)',
        exp: 'Led by Elijah Muhammad, it preached Black racial pride, religious discipline, and complete separation from white America.',
      },
      {
        q: 'Why did Malcolm X reject Martin Luther King Jr.’s philosophy of non-violence?',
        a: 'He argued non-violence left Black people defenceless against brutality, advocating self-defence "by any means necessary"',
        exp: 'Appealed deeply to young, impoverished urban Black Americans in Northern ghettos frustrated by police brutality.',
      },
      {
        q: 'What transformative event in 1964 led Malcolm X to abandon strict Black separatism?',
        a: 'His Hajj pilgrimage to Mecca',
        exp: 'Seeing Muslims of all races worshipping together, he adopted orthodox Islam and founded the secular OAAU.',
      },
      {
        q: 'On what date was Malcolm X assassinated by Nation of Islam gunmen in New York?',
        a: '21 February 1965',
        exp: 'Gunned down at the Audubon Ballroom; his life story in his published Autobiography inspired the Black Power generation.',
      },
      {
        q: 'Who popularised the rallying cry "Black Power" during the June 1966 March Against Fear in Mississippi?',
        a: 'Stokely Carmichael (SNCC Chairman)',
        exp: 'Reflected growing student anger with slow legislative progress, police brutality, and non-violent passivity.',
      },
      {
        q: 'What did the concept of "Black Power" advocate for Black Americans?',
        a: 'Racial pride, economic self-reliance, Black political independence, and psychological liberation from white dominance',
        exp: 'Encouraged Black communities to celebrate African heritage ("Black is Beautiful") and reject white assimilation.',
      },
      {
        q: 'Who founded the Black Panther Party for Self-Defense in Oakland, California, in October 1966?',
        a: 'Huey P. Newton and Bobby Seale',
        exp: 'Formed a revolutionary socialist organisation carrying loaded weapons to monitor police patrols in Black neighbourhoods.',
      },
      {
        q: 'What revolutionary manifesto set out the Black Panther Party’s political and economic demands?',
        a: 'The Ten-Point Program',
        exp: 'Demanded full employment, decent housing, education on Black history, exemption from the military draft, and an end to police brutality.',
      },
      {
        q: 'What vital community survival programs did the Black Panthers establish in urban neighbourhoods?',
        a: 'Free Breakfast for Children, free medical & sickle cell testing clinics, and community education centers',
        exp: 'Won immense community loyalty, serving tens of thousands of meals daily to impoverished urban children.',
      },
      {
        q: 'Which FBI Director launched COINTELPRO to disrupt, infiltrate, and neutralize Black nationalist groups?',
        a: 'J. Edgar Hoover',
        exp: 'Considered the Black Panthers the single greatest internal security threat to the USA, orchestrating raids and arrests.',
      },
      {
        q: 'What silent protest was staged by Tommie Smith and John Carlos at the 1968 Mexico City Olympics?',
        a: 'Raised black-gloved fists in a Black Power salute on the medal podium during the US national anthem',
        exp: 'Brought the struggle against American racial injustice and poverty to a global television audience, sparking furious backlash.',
      },
      {
        q: 'What was the core difference between MLK’s SCLC and the Black Power movement?',
        a: 'MLK sought racial integration through Christian non-violence; Black Power emphasized self-defence, Black pride, and autonomy',
        exp: 'Created ideological division, alienating white liberal donors while energising youth in northern urban centres.',
      },
    ],
  },

  // ENQUIRY 8 (KT 2.4): Urban Rioting, Kerner Report & MLK Assassination (1965–68)
  {
    num: 8,
    id: 'lesson_2_4',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Urban Rioting, Kerner Report & King (1965–68)',
    enquiry:
      'Why did riots break out in American cities (1965–68), and what was the impact of MLK’s assassination?',
    examinerTrap:
      'Examiner Warning: The 1965–68 urban riots occurred in Northern and Western cities (Watts, Detroit, Newark), not the rural South; they were driven by poverty, unemployment, and police brutality, not Jim Crow laws.',
    questions: [
      {
        q: 'In which Los Angeles neighbourhood did a major six-day riot erupt in August 1965, leaving 34 dead?',
        a: 'Watts',
        exp: 'Triggered by a violent police traffic arrest, revealing deep racial resentment in northern urban ghettos.',
      },
      {
        q: 'Which two major cities experienced catastrophic urban riots in the "Long Hot Summer" of July 1967?',
        a: 'Newark (New Jersey) and Detroit (Michigan)',
        exp: 'Federal tanks and National Guardsmen were deployed; Detroit saw 43 deaths and 7,000 arrests in five days of violence.',
      },
      {
        q: 'What presidential commission was established by Lyndon Johnson in 1967 to investigate urban rioting?',
        a: 'The Kerner Commission (National Advisory Commission on Civil Disorders)',
        exp: 'Chaired by Governor Otto Kerner to identify the fundamental causes of continuous urban unrest.',
      },
      {
        q: 'What was the famous conclusion published in the 1968 Kerner Commission Report?',
        a: '"Our nation is moving toward two societies, one black, one white—separate and unequal"',
        exp: 'Identified deep white institutional racism, high unemployment, inferior ghetto schools, and police bias as root causes.',
      },
      {
        q: 'What campaign did Martin Luther King Jr. launch in 1966 to challenge northern housing discrimination?',
        a: 'The Chicago Freedom Movement',
        exp: 'Faced violent white working-class mobs in Cicero, showing King that northern de facto racism was harder to tackle than Jim Crow.',
      },
      {
        q: 'On what date and in which city was Dr Martin Luther King Jr. assassinated?',
        a: '4 April 1968, at the Lorraine Motel in Memphis, Tennessee',
        exp: 'Shot dead by James Earl Ray while in Memphis supporting striking Black municipal sanitation workers.',
      },
      {
        q: 'How did Black urban communities react across America immediately following King’s assassination?',
        a: 'Violent riots erupted across more than 100 US cities, requiring 46,000 National Guardsmen to suppress',
        exp: 'Washington D.C., Chicago, and Baltimore burned, marking the end of the dominant non-violent era.',
      },
      {
        q: 'What final major civil rights statute was signed into law by President Johnson on 11 April 1968?',
        a: 'The Civil Rights Act of 1968 (Fair Housing Act)',
        exp: 'Passed in the shadow of King’s assassination, it banned racial discrimination in the sale, rental, and financing of housing.',
      },
      {
        q: 'What new campaign was MLK planning at the time of his death to unite impoverished people of all races?',
        a: 'The Poor People’s Campaign',
        exp: 'Shifted focus from purely racial civil rights to fundamental economic justice, fair wages, and anti-poverty legislation.',
      },
      {
        q: 'How did the urban riots of 1965–68 affect white suburban public opinion and politics?',
        a: 'Triggered a conservative white backlash, fueling Richard Nixon’s 1968 "Law and Order" presidential campaign',
        exp: 'Suburban voters associated civil rights militancy with street crime, shifting national politics to the right.',
      },
      {
        q: 'What did the Kerner Commission recommend the federal government invest billions in to prevent riots?',
        a: 'Massive federal investment in ghetto housing, job creation, education, and national police reform',
        exp: 'Largely rejected and unfunded by President Johnson due to the astronomical financial costs of the escalating Vietnam War.',
      },
      {
        q: 'What was the status of the civil rights movement by the early 1970s?',
        a: 'De jure segregation had been dismantled, but severe economic inequality, housing segregation, and educational gaps persisted',
        exp: 'Showed that achieving legal equality was easier than eliminating systemic economic poverty and racial disadvantage.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 3: US INVOLVEMENT IN THE VIETNAM WAR, 1954–75
  // =========================================================================

  // ENQUIRY 9 (KT 3.1): Why the US Intervened: Geneva, Domino Theory & Diem (1954–63)
  {
    num: 9,
    id: 'lesson_3_1',
    keyTopic: 'Key Topic 3: US & Vietnam War, 1954–75',
    title: 'US Intervention: Domino Theory & Diem',
    enquiry:
      'Why did the USA become militarily entangled in Vietnam, and why was Diem’s regime so unpopular?',
    examinerTrap:
      'Examiner Warning: Ngo Dinh Diem was not merely anti-communist; his Catholic regime violently discriminated against South Vietnam’s 80% Buddhist majority, sparking worldwide outrage through monk self-immolations.',
    questions: [
      {
        q: 'Which catastrophic military defeat in May 1954 ended French colonial rule in Indochina?',
        a: 'The Battle of Dien Bien Phu',
        exp: 'General Vo Nguyen Giap’s Vietminh troops surrounded and crushed French elite forces in an isolated valley.',
      },
      {
        q: 'What international agreements in July 1954 temporarily divided Vietnam at the 17th Parallel?',
        a: 'The Geneva Accords',
        exp: 'Divided Vietnam into communist North (Ho Chi Minh) and non-communist South, promising nationwide elections in 1956.',
      },
      {
        q: 'What Cold War theory did President Eisenhower articulate to justify US intervention in Southeast Asia?',
        a: 'The "Domino Theory"',
        exp: 'Held that if Vietnam fell to communism, neighbouring nations (Laos, Cambodia, Thailand) would topple like dominoes.',
      },
      {
        q: 'Why did South Vietnamese leader Ngo Dinh Diem refuse to hold the nationwide 1956 elections promised at Geneva?',
        a: 'He and the US knew communist leader Ho Chi Minh would win an overwhelming democratic landslide (approx. 80%)',
        exp: 'Permanently entrenched the division between the communist North and the US-backed Southern regime.',
      },
      {
        q: 'What communist guerrilla organisation was formed in South Vietnam in December 1960 to overthrow Diem?',
        a: 'The National Liberation Front (NLF / Vietcong)',
        exp: 'Recruited Southern rural peasants, supported and supplied by North Vietnam along the Ho Chi Minh Trail.',
      },
      {
        q: 'What unpopular program did Diem and the US launch in 1962, forcibly moving peasants into fortified villages?',
        a: 'The Strategic Hamlet Program',
        exp: 'Alienated peasant farmers by uprooting ancestral burial grounds, driving thousands of recruits directly into the Vietcong.',
      },
      {
        q: 'What religious majority in South Vietnam did Diem’s Catholic government heavily discriminate against?',
        a: 'Buddhists (approx. 70–80% of the population)',
        exp: 'Diem banned Buddhist flags and appointed Catholics to top military and civil posts, triggering mass protests.',
      },
      {
        q: 'What dramatic protest shocked the world in June 1963 in Saigon when photographed by Malcolm Browne?',
        a: 'Buddhist monk Thich Quang Duc burned himself to death (self-immolation) at a busy intersection',
        exp: 'Televised photos of the burning monk shattered US claims that Diem led a democratic, popular government.',
      },
      {
        q: 'How many US "military advisers" were stationed in South Vietnam by the time of Kennedy’s death in late 1963?',
        a: 'Over 16,000 (increased from approx. 900 under Eisenhower)',
        exp: 'Showed the gradual, creeping military escalation from financial aid to active combat advising and Green Beret deployments.',
      },
      {
        q: 'What happened to Ngo Dinh Diem on 2 November 1963 with quiet approval from the Kennedy administration?',
        a: 'He was overthrown in a military coup by ARVN generals and assassinated',
        exp: 'Left South Vietnam politically chaotic, governed by a succession of weak, corrupt, rotating military juntas.',
      },
      {
        q: 'Who was the charismatic communist leader of North Vietnam who fought against both France and the USA?',
        a: 'Ho Chi Minh',
        exp: 'Combined Marxist ideology with fierce Vietnamese nationalism, commanding total devotion across North and South.',
      },
      {
        q: 'What was the primary motive driving US policy in Vietnam between 1954 and 1963?',
        a: 'Cold War containment: preventing any expansion of Soviet and Chinese communist influence in Asia',
        exp: 'Blind adherence to containment locked successive presidents into propping up deeply corrupt Saigon dictators.',
      },
    ],
  },

  // ENQUIRY 10 (KT 3.2): Escalation: Gulf of Tonkin & Operation Rolling Thunder (1964–65)
  {
    num: 10,
    id: 'lesson_3_2',
    keyTopic: 'Key Topic 3: US & Vietnam War, 1954–75',
    title: 'Tonkin, Escalation & Rolling Thunder',
    enquiry: 'Why did the USA send combat troops to Vietnam after the Gulf of Tonkin incident?',
    examinerTrap:
      'Examiner Warning: The Gulf of Tonkin Resolution (August 1964) gave Johnson legal authority to wage war, but ground combat troops did not arrive until March 1965 at Da Nang to protect US air bases.',
    questions: [
      {
        q: 'Which US destroyer was allegedly attacked by North Vietnamese torpedo boats in August 1964?',
        a: 'The USS Maddox',
        exp: 'Engaged in covert electronic surveillance in the Gulf of Tonkin, providing Johnson the pretext for military escalation.',
      },
      {
        q: 'What sweeping resolution was passed by the US Congress on 7 August 1964 with almost unanimous approval?',
        a: 'The Gulf of Tonkin Resolution',
        exp: 'Authorized President Johnson to take "all necessary measures" to repel armed attack, functioning as a blank cheque for war.',
      },
      {
        q: 'What deadly Vietcong attack on a US military base in February 1965 killed 8 Americans, triggering air strikes?',
        a: 'The attack on the US airfield at Pleiku',
        exp: 'Convinced Johnson that the Saigon regime was near collapse and required direct US military power to survive.',
      },
      {
        q: 'What massive, sustained aerial bombing campaign against North Vietnam began in March 1965?',
        a: 'Operation Rolling Thunder',
        exp: 'A three-year continuous bombing campaign aimed at destroying Northern infrastructure and severing supply lines.',
      },
      {
        q: 'On what date did the first 3,500 US ground combat troops land at Da Nang, South Vietnam?',
        a: '8 March 1965',
        exp: 'Marked the fateful transition from advisory military support to an active, large-scale American ground combat war.',
      },
      {
        q: 'Who was the commanding general of US military forces in Vietnam from 1964 to 1968?',
        a: 'General William Westmoreland',
        exp: 'Pioneered an aggressive war of attrition based on search-and-destroy missions and comparative "body counts".',
      },
      {
        q: 'To what number did US troop deployment in Vietnam surge by the end of 1967?',
        a: 'Nearly 500,000 troops (approx. 485,000)',
        exp: 'Represented a massive military commitment that strained the US economy and ignited widespread domestic resistance.',
      },
      {
        q: 'What complex jungle supply network ran from North Vietnam through Laos and Cambodia into the South?',
        a: 'The Ho Chi Minh Trail',
        exp: 'Transported over 60 tons of military supplies and thousands of NVA reinforcements daily, despite relentless US bombing.',
      },
      {
        q: 'Which two major communist superpowers supplied modern heavy weapons, air defence, and finances to North Vietnam?',
        a: 'The Soviet Union (USSR) and the People’s Republic of China',
        exp: 'Supplied advanced SAM anti-aircraft missiles, radar, and AK-47 assault rifles, enabling North Vietnam to resist US air power.',
      },
      {
        q: 'Why was Operation Rolling Thunder largely ineffective in forcing North Vietnam to surrender?',
        a: 'North Vietnam was a pre-industrial agricultural society with few industrial targets, and bombed infrastructure was swiftly rebuilt',
        exp: 'Instead of breaking Northern morale, US bombing hardened nationalist resolve and generated global anti-US condemnation.',
      },
      {
        q: 'What secret operations had the CIA and South Vietnamese navy been running before the Tonkin incident (Operation Plan 34A)?',
        a: 'Covert commando raids and coastal shelling against North Vietnamese radar and island installations',
        exp: 'Proved the North Vietnamese patrol boats had responded to deliberate US provocation, hidden from the US Congress.',
      },
      {
        q: 'Why did President Johnson feel compelled to escalate in 1965 rather than withdraw?',
        a: 'He feared being branded "soft on communism", which would destroy his domestic Great Society anti-poverty legislation',
        exp: 'Illustrates how domestic electoral fear trapped US presidents into disastrous foreign policy escalation.',
      },
    ],
  },

  // ENQUIRY 11 (KT 3.3): Tactics & Technology: Guerrilla Warfare vs. Search and Destroy
  {
    num: 11,
    id: 'lesson_3_3',
    keyTopic: 'Key Topic 3: US & Vietnam War, 1954–75',
    title: 'Tactics: Guerrillas vs Search & Destroy',
    enquiry:
      'Why did US military tactics (bombing, Search and Destroy) fail to defeat Vietcong guerrilla tactics?',
    examinerTrap:
      'Examiner Warning: Do not confuse Search and Destroy (ground combat patrols using body counts) with strategic bombing or defoliation (Operation Ranch Hand); Search and Destroy alienated peasants because GIs burned entire villages ("zippo raids").',
    questions: [
      {
        q: 'What military strategy did the Vietcong adopt to negate superior US firepower, artillery, and air support?',
        a: 'Guerrilla warfare (ambushes, booby traps, hit-and-run strikes)',
        exp: 'Operated without uniforms, melted into peasant villages, and avoided large-scale pitched conventional battles.',
      },
      {
        q: 'What tactical slogan described the Vietcong technique of fighting in extreme close proximity to US soldiers?',
        a: '"Hanging on to the belts of the enemy"',
        exp: 'By fighting within 30 metres of GIs, the Vietcong prevented US commanders from calling in artillery or air strikes.',
      },
      {
        q: 'What extensive underground engineering marvel did the Vietcong construct near Saigon to survive US air strikes?',
        a: 'The Cu Chi tunnel network',
        exp: 'Contained over 250km of multi-level tunnels with hospitals, armouries, and barracks proof against heavy bombing.',
      },
      {
        q: 'What primitive, concealed booby trap caused severe puncture wounds and infection among US infantry patrols?',
        a: 'Punji stake traps (sharpened bamboo stakes smeared with excrement)',
        exp: 'Accounted for nearly 20% of all US combat casualties, inflicting constant psychological terror on American troops.',
      },
      {
        q: 'What primary ground combat tactic did General Westmoreland deploy to locate and eliminate Vietcong units?',
        a: 'Search-and-Destroy missions (using helicopter insertion)',
        exp: 'Heavily armed platoons flew by Huey helicopter into jungle villages to hunt enemy units and destroy supply caches.',
      },
      {
        q: 'What metric did the US military hierarchy use to measure "progress" in the absence of territorial frontlines?',
        a: 'The "Body Count" (number of enemy dead)',
        exp: 'Pressured officers to exaggerate enemy casualties and incentivised the killing of unarmed Vietnamese civilians.',
      },
      {
        q: 'What nickname was given to US search-and-destroy missions that burned peasant thatched huts with lighters?',
        a: '"Zippo raids"',
        exp: 'Devastated peasant communities, driving thousands of surviving rural families to support the Vietcong.',
      },
      {
        q: 'What toxic chemical defoliant did the US military spray over millions of acres of Vietnamese jungle (Operation Ranch Hand)?',
        a: 'Agent Orange',
        exp: 'Destroyed jungle canopy hiding supply trails, causing severe birth defects and cancers among Vietnamese and US veterans.',
      },
      {
        q: 'What jellied petroleum weapon was dropped by US fighter-bombers, burning skin at over 1,000°C?',
        a: 'Napalm',
        exp: 'Incinerated huge areas of forest and villages, inflicting horrific burns on civilian populations and creating global outcry.',
      },
      {
        q: 'What versatile utility helicopter became the iconic symbol of American mobility in Vietnam?',
        a: 'The Bell UH-1 Iroquois ("Huey")',
        exp: 'Enabled rapid combat insertion, medical evacuation (dust-offs), and rocket-fire close air support across dense jungle.',
      },
      {
        q: 'What demoralising phenomenon saw US conscripts violently assault or murder overzealous officers with grenades?',
        a: '"Fragging"',
        exp: 'Over 800 incidents were reported by 1971, reflecting severe breakdown in military discipline, morale, and drug abuse.',
      },
      {
        q: 'Why did US high-technology military tactics ultimately fail against the Vietcong?',
        a: 'They alienated the civilian population whose support was essential, while the Vietcong sustained endless casualties for independence',
        exp: 'Proved conventional military firepower cannot win a political counter-insurgency war without winning civilian hearts and minds.',
      },
    ],
  },

  // ENQUIRY 12 (KT 3.4): Nixon’s Policy: Vietnamization, Secret Bombing & Peace (1968–73)
  {
    num: 12,
    id: 'lesson_3_4',
    keyTopic: 'Key Topic 3: US & Vietnam War, 1954–75',
    title: 'Vietnamization, Secret Bombing & Accords',
    enquiry:
      'What was Nixon’s "Vietnamization" policy, and how did the USA exit the conflict in 1973?',
    examinerTrap:
      'Examiner Warning: Vietnamization did not mean immediate peace; while withdrawing US ground troops, Nixon massively intensified air warfare and secretly expanded the war by bombing and invading Cambodia and Laos.',
    questions: [
      {
        q: 'What policy did President Richard Nixon announce in June 1969 to withdraw US troops while expanding ARVN responsibility?',
        a: 'Vietnamization',
        exp: 'Trained and heavily armed South Vietnamese forces (ARVN) to assume combat duties so US soldiers could withdraw.',
      },
      {
        q: 'What diplomatic slogan did Nixon use to describe his goal of exiting Vietnam without an outright American surrender?',
        a: '"Peace with Honor"',
        exp: 'Sought an exit agreement that preserved an independent, non-communist South Vietnam and respected US international prestige.',
      },
      {
        q: 'To what number did Nixon reduce US ground troops in Vietnam between 1969 and 1972?',
        a: 'From 543,000 down to under 25,000',
        exp: 'Drastically lowered American casualties, aiming to quieten explosive domestic anti-war protests on university campuses.',
      },
      {
        q: 'What secret military operation did Nixon order in March 1969 to bomb communist sanctuaries in neighbouring Cambodia?',
        a: 'Operation Menu',
        exp: 'Dropped over 100,000 tons of bombs secretly without congressional approval, violating Cambodian neutrality.',
      },
      {
        q: 'What disastrous political consequence occurred in Cambodia as a direct result of US bombing and destabilisation?',
        a: 'It fueled the rise of the brutal Khmer Rouge regime led by Pol Pot',
        exp: 'Overthrew the government in 1975, leading to the Cambodian genocide that killed nearly two million people.',
      },
      {
        q: 'What offensive did the South Vietnamese Army (ARVN) launch into Laos in 1971 (Operation Lam Son 719)?',
        a: 'An invasion to cut the Ho Chi Minh Trail',
        exp: 'Ended in a humiliating ARVN rout despite heavy US air support, exposing the complete failure of Vietnamization.',
      },
      {
        q: 'Who was Nixon’s National Security Adviser who conducted four years of secret negotiations with North Vietnam in Paris?',
        a: 'Dr Henry Kissinger',
        exp: 'Conducted secret diplomacy with Hanoi’s chief negotiator Le Duc Tho to hammer out a bilateral withdrawal treaty.',
      },
      {
        q: 'What intense 11-day bombing campaign against Hanoi did Nixon launch in December 1972 (the "Christmas Bombings")?',
        a: 'Operation Linebacker II',
        exp: 'Dropped 20,000 tons of explosives with B-52s to force North Vietnam back to the negotiating table and reassure Saigon.',
      },
      {
        q: 'On what date were the Paris Peace Accords officially signed, ending direct US military involvement?',
        a: '27 January 1973',
        exp: 'Agreed on an immediate ceasefire, total US troop withdrawal within 60 days, and the release of all American POWs.',
      },
      {
        q: 'What crucial military concession did Kissinger make in the Paris Accords regarding North Vietnamese troops in the South?',
        a: 'Over 150,000 North Vietnamese Army (NVA) soldiers were permitted to remain stationed inside South Vietnam',
        exp: 'Left the South Vietnamese government of President Thieu militarily encircled and fatally vulnerable.',
      },
      {
        q: 'What diplomatic strategy did Nixon and Kissinger pursue with China and the USSR to isolate North Vietnam?',
        a: 'Détente and "Triangular Diplomacy"',
        exp: 'Exploited the Sino-Soviet split, visiting Beijing and Moscow in 1972 to pressure Hanoi into compromising in Paris.',
      },
      {
        q: 'On what date did the last American combat troops depart Vietnam, ending direct US military intervention?',
        a: '29 March 1973',
        exp: 'Closed eight years of direct combat operations, leaving South Vietnam to fight the communist North alone.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 4: REACTIONS TO, AND THE END OF, THE VIETNAM WAR, 1964–75
  // =========================================================================

  // ENQUIRY 13 (KT 4.1): The Turning Point: Tet Offensive & The Anti-War Movement
  {
    num: 13,
    id: 'lesson_4_1',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'Tet Offensive & The Anti-War Movement',
    enquiry: 'Why did opposition to the Vietnam War explode after the 1968 Tet Offensive?',
    examinerTrap:
      'Examiner Warning: The 1968 Tet Offensive was a catastrophic military defeat for the Vietcong (who lost over 40,000 fighters), but a decisive psychological and political victory for North Vietnam because it shattered US government credibility.',
    questions: [
      {
        q: 'On what Vietnamese holiday did the Vietcong and NVA launch a massive surprise nationwide offensive in January 1968?',
        a: 'Tet (the Vietnamese Lunar New Year)',
        exp: 'Over 84,000 communist troops struck more than 100 South Vietnamese towns, cities, and military installations.',
      },
      {
        q: 'What prominent building in central Saigon was penetrated by a Vietcong commando squad during Tet?',
        a: 'The US Embassy',
        exp: 'Televised gun battles inside the diplomatic compound shocked Americans who had been told the war was almost won.',
      },
      {
        q: 'What was the discrepancy between official US government optimism and televised reality called?',
        a: 'The "Credibility Gap"',
        exp: 'Americans realised their government had misled them about military progress, destroying public trust in the presidency.',
      },
      {
        q: 'Which revered CBS news anchor visited Vietnam after Tet and declared the war mired in an unwinnable stalemate?',
        a: 'Walter Cronkite',
        exp: 'Johnson famously lamented: "If I’ve lost Cronkite, I’ve lost Middle America", leading directly to his decision not to seek re-election.',
      },
      {
        q: 'What shocking political announcement did President Lyndon Johnson make on national television on 31 March 1968?',
        a: 'He would not seek or accept nomination for another term as US President',
        exp: 'Marked the political destruction of a presidency brought down by the military quagmire and protests of Vietnam.',
      },
      {
        q: 'Why did the military draft (conscription) generate intense social and racial anger among young Americans?',
        a: 'College students received deferments, meaning poor working-class and Black youth were drafted in disproportionate numbers',
        exp: 'Over 80% of combat infantrymen were from working-class or impoverished minority backgrounds.',
      },
      {
        q: 'What student organisation spearheaded mass university campus strikes and anti-war demonstrations?',
        a: 'SDS (Students for a Democratic Society)',
        exp: 'Organised teach-ins, draft-card burnings, and mass marches on the Pentagon attracting hundreds of thousands.',
      },
      {
        q: 'What iconic counter-culture slogan captured student fury against President Johnson outside the White House?',
        a: '"Hey, hey, LBJ! How many kids did you kill today?"',
        exp: 'Reflected the venomous personal vilification of Johnson that forced him to avoid public campaign appearances.',
      },
      {
        q: 'Which heavyweight boxing champion was stripped of his world title and convicted in 1967 for refusing the draft?',
        a: 'Muhammad Ali',
        exp: 'Declared: "No Vietcong ever called me nigger", inspiring millions of Black Americans to oppose the war.',
      },
      {
        q: 'What did thousands of young American draft-resisters do to evade military service in Vietnam?',
        a: 'Fled to Canada (approx. 30,000–50,000) or burnt draft cards and attended medical deferment clinics',
        exp: 'Showed the deepest generational revolt against federal authority in twentieth-century American history.',
      },
      {
        q: 'What was the military outcome of the Tet Offensive for the Vietcong insurgent army?',
        a: 'They suffered devastating casualties (over 40,000 killed) and were largely eliminated as an effective fighting force',
        exp: 'Forced North Vietnam’s conventional regular army (NVA) to take over the vast majority of subsequent combat.',
      },
      {
        q: 'Why is the Tet Offensive universally regarded as the decisive psychological turning point of the war?',
        a: 'It convinced the American public and political establishment that military victory was impossible at an acceptable cost',
        exp: 'Shifted US policy from pursuing outright victory to seeking negotiated withdrawal and damage control.',
      },
    ],
  },

  // ENQUIRY 14 (KT 4.2): Media, My Lai & The Clashes: Kent State & The Silent Majority
  {
    num: 14,
    id: 'lesson_4_2',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'Media, My Lai, Kent State & Silent Majority',
    enquiry:
      'How did My Lai, Kent State, and the "Silent Majority" demonstrate deep American domestic division?',
    examinerTrap:
      'Examiner Warning: The "Silent Majority" was not pro-war fanaticism; it was a large conservative coalition of middle-class Americans who rejected radical student rioting and supported an honourable withdrawal rather than immediate surrender.',
    questions: [
      {
        q: 'Why was Vietnam referred to by historians and media critics as America’s first "Living Room War"?',
        a: 'Uncensored television footage of combat, casualties, and napalm was broadcast nightly into family homes on the evening news',
        exp: 'Destroyed the sanitised, heroic myth of war, bringing the visceral horror of combat directly to the public.',
      },
      {
        q: 'In which South Vietnamese village did Charlie Company massacre over 500 unarmed civilians in March 1968?',
        a: 'My Lai (Son My village)',
        exp: 'US soldiers slaughtered elderly men, women, children, and infants, engaging in systematic rape and village burning.',
      },
      {
        q: 'Who was the US platoon lieutenant who was convicted of murder in 1971 for ordering the My Lai killings?',
        a: 'Lieutenant William Calley',
        exp: 'Sentenced to life imprisonment (later commuted by Nixon), he claimed he was merely following orders on a search-and-destroy mission.',
      },
      {
        q: 'Which investigative journalist broke the My Lai massacre story to the global public in November 1969?',
        a: 'Seymour Hersh',
        exp: 'Published explicit photographs taken by military photographer Ron Haeberle, shattering America’s moral self-image.',
      },
      {
        q: 'What phrase did President Nixon use in a televised November 1969 speech to mobilise conservative working Americans?',
        a: 'The "Silent Majority"',
        exp: 'Appealed to millions of patriotic citizens who resented anti-war demonstrators, drug culture, and urban rioters.',
      },
      {
        q: 'What military escalation announced by Nixon on 30 April 1970 triggered ferocious nationwide campus protests?',
        a: 'The US ground invasion of Cambodia',
        exp: 'Seen as a blatant expansion of the war, breaking Nixon’s promise of steady de-escalation and sparking strikes at 400 universities.',
      },
      {
        q: 'What tragedy occurred at Kent State University in Ohio on 4 May 1970 during an anti-war protest?',
        a: 'Ohio National Guardsmen fired 67 rounds into a crowd of student demonstrators, killing 4 and wounding 9',
        exp: 'Shocked the world; two of the slain students were simply walking between classes, demonstrating state violence at home.',
      },
      {
        q: 'What second campus shooting occurred ten days after Kent State on 15 May 1970, killing two Black students?',
        a: 'Jackson State University (Mississippi)',
        exp: 'City and state police fired into a women’s dormitory, highlighting the intersection of anti-war and racial brutality.',
      },
      {
        q: 'What violent clash occurred in New York City on 8 May 1970 between construction workers and anti-war students?',
        a: 'The "Hard Hat Riot"',
        exp: 'Union construction workers beat student demonstrators while police stood by, proving deep working-class support for Nixon.',
      },
      {
        q: 'What classified Department of Defense study was leaked to the New York Times by Daniel Ellsberg in June 1971?',
        a: 'The Pentagon Papers',
        exp: 'Proved successive administrations (Truman, Eisenhower, JFK, LBJ) had systematically lied to Congress and the public about Vietnam.',
      },
      {
        q: 'What organisation of returning combat soldiers marched on Washington in April 1971, hurling medals onto Capitol steps?',
        a: 'Vietnam Veterans Against the War (VVAW)',
        exp: 'Led by John Kerry, combat veterans testifying about war crimes dealt a catastrophic blow to military moral legitimacy.',
      },
      {
        q: 'How did domestic divisions over Vietnam affect American society by 1972?',
        a: 'The nation fractured along generational, class, and cultural lines, destroying the post-WWII political consensus',
        exp: 'Created a deep cynicism toward government, the presidency, and foreign military intervention lasting for decades.',
      },
    ],
  },

  // ENQUIRY 15 (KT 4.3): The Peace Process, Paris Agreement (1973) & Costs of the War
  {
    num: 15,
    id: 'lesson_4_3',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'The Peace Process, Paris Agreement (1973) & Costs of War',
    enquiry:
      'How did peace negotiations lead to the 1973 Paris Peace Agreement, and what were the human and economic costs of the war for the USA?',
    examinerTrap:
      'Examiner Warning: In the 1973 Paris Peace Agreement, North Vietnamese troops were permitted to remain in South Vietnam; the USA agreed to withdraw all troops within 60 days in exchange for US prisoners of war (POWs).',
    questions: [
      {
        q: 'Which two chief negotiators conducted the secret peace talks in Paris between 1969 and 1973?',
        a: 'Henry Kissinger (US National Security Adviser) and Le Duc Tho (North Vietnamese diplomat)',
        exp: 'Conducted years of private diplomatic bargaining in Paris alongside public formal four-party conferences.',
      },
      {
        q: 'What diplomatic breakthrough did Nixon achieve in 1972 to pressure North Vietnam to negotiate?',
        a: 'Détente with China and the Soviet Union (visiting Beijing and Moscow)',
        exp: 'Exploited Sino-Soviet tensions, encouraging North Vietnam’s communist superpower patrons to urge Hanoi toward a settlement.',
      },
      {
        q: 'What major conventional invasion did North Vietnam launch in March 1972 to test Vietnamization?',
        a: 'The Easter Offensive',
        exp: 'Conventional tank blitzkrieg across the DMZ; beaten back by massive US air strikes (Operation Linebacker) and ARVN defence.',
      },
      {
        q: 'What massive 12-day bombing campaign did Nixon order in December 1972 to force Hanoi back to talks?',
        a: 'Operation Linebacker II (the "Christmas Bombing")',
        exp: 'B-52 bombers dropped 20,000 tons of explosives on Hanoi and Haiphong, inflicting catastrophic damage until talks resumed.',
      },
      {
        q: 'On what exact date was the Paris Peace Agreement officially signed, ending direct US combat involvement?',
        a: '27 January 1973',
        exp: 'Signed by the USA, North Vietnam, South Vietnam, and the Vietcong (PRG), establishing an immediate ceasefire.',
      },
      {
        q: 'Under the Paris Peace Agreement, within how many days was the USA required to withdraw all military forces?',
        a: 'Within 60 days',
        exp: 'All American military bases, combat troops, and advisers had to be dismantled and evacuated by late March 1973.',
      },
      {
        q: 'What crucial commitment did North Vietnam make regarding American captives under the 1973 agreement?',
        a: 'The release of all American Prisoners of War (POWs) within 60 days (Operation Homecoming)',
        exp: '591 US prisoners of war, including many downed airmen held in the "Hanoi Hilton", were repatriated.',
      },
      {
        q: 'What major concession did the USA grant North Vietnam in the 1973 agreement that doomed South Vietnam?',
        a: 'Around 150,000 North Vietnamese Army (NVA) troops were permitted to remain stationed inside South Vietnam',
        exp: 'Left the communist regular army in control of strategic areas of the South, ready to strike when the Americans departed.',
      },
      {
        q: 'On what date did the last American combat troops depart from South Vietnam?',
        a: '29 March 1973',
        exp: 'Brought nearly a decade of direct US ground combat in Southeast Asia to an end.',
      },
      {
        q: 'Approximately how many American military service personnel lost their lives in the Vietnam War?',
        a: 'Over 58,000 Americans killed (along with over 300,000 wounded)',
        exp: 'Represented a traumatic human toll that scarred American families and defined a generation.',
      },
      {
        q: 'What severe psychological and social costs afflicted tens of thousands of returning American veterans?',
        a: 'PTSD (Post-Traumatic Stress Disorder), widespread substance addiction, depression, and high suicide rates',
        exp: 'Veterans returned to a divided, hostile society without the parades or psychiatric support given to WWII soldiers.',
      },
      {
        q: 'What estimated financial sum did the United States spend on the war, and what domestic impact did it have?',
        a: 'Over $167 billion, triggering rampant domestic inflation and gutting LBJ’s "Great Society" social welfare programs',
        exp: 'Diverted federal funds from healthcare, urban regeneration, and education, plunging the US into 1970s economic stagflation.',
      },
    ],
  },

  // ENQUIRY 16 (KT 4.4): Reasons for US Failure: Synoptic Evaluation
  {
    num: 16,
    id: 'lesson_4_4',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'Why the US Failed: Synoptic Evaluation',
    enquiry: 'What were the main reasons why the USA failed to achieve its objectives in Vietnam?',
    examinerTrap:
      'Examiner Warning: In synoptic Paper 3 20-mark evaluation essays (Q3d), examiners penalise one-sided essays; Grade 9 answers balance US tactical and military flaws, domestic political collapse, and North Vietnamese nationalist resilience.',
    questions: [
      {
        q: 'Approximately how many American military service personnel died in the Vietnam War?',
        a: 'Over 58,000 Americans (along with over 300,000 wounded)',
        exp: 'Represented a devastating human toll that scarred American families and shaped public attitudes toward military intervention.',
      },
      {
        q: 'What is the estimated total number of Vietnamese people (combatants and civilians) killed between 1954 and 1975?',
        a: 'Between 2 and 3 million Vietnamese',
        exp: 'Exposed the catastrophic physical, human, and demographic devastation inflicted upon Indochina.',
      },
      {
        q: 'What estimated financial sum did the United States spend on waging the Vietnam War?',
        a: 'Over $167 billion (over $1 trillion in modern value)',
        exp: 'Diverted vital funds from LBJ’s domestic "War on Poverty", triggering rampant inflation and economic stagnation in the 1970s.',
      },
      {
        q: 'Why was the failure to "win hearts and minds" among the South Vietnamese rural peasantry fatal to the US mission?',
        a: 'Heavy bombing, napalm, defoliants, and Search-and-Destroy raids made the US military hated by the rural population',
        exp: 'Ensured that rural peasants provided food, intelligence, shelter, and recruits to the Vietcong rather than Saigon.',
      },
      {
        q: 'What fundamental political weakness crippled the South Vietnamese government (ARVN / Republic of Vietnam)?',
        a: 'Widespread corruption, military incompetence, and a total lack of democratic legitimacy among ordinary citizens',
        exp: 'Peasants viewed Saigon politicians as selfish American puppets who cared nothing for land reform or rural welfare.',
      },
      {
        q: 'What motivational advantage did the Vietcong and North Vietnamese Army hold over American conscripts?',
        a: 'They were fighting a total war for national survival and independence, willing to accept unlimited casualties to win',
        exp: 'General Giap recognized the US public would eventually tire of body bags, whereas the Vietnamese would fight indefinitely.',
      },
      {
        q: 'How did geographical and environmental conditions undermine superior American military technology?',
        a: 'Dense tropical rainforest, extreme heat, monsoons, and swamp terrain nullified heavy tanks and aided guerrilla concealment',
        exp: 'Conscripted American soldiers found the terrain disorienting and exhausting, suffering foot rot, malaria, and heatstroke.',
      },
      {
        q: 'How did the one-year "tour of duty" (12 months for GIs) undermine American combat effectiveness?',
        a: 'Just as soldiers gained vital jungle combat experience, they rotated home, replacing seasoned troops with inexperienced rookies',
        exp: 'Created an army of perpetual novices whose primary individual goal was surviving their tour rather than winning the war.',
      },
      {
        q: 'What psychological trauma afflicted tens of thousands of returning American veterans following the war?',
        a: 'PTSD (Post-Traumatic Stress Disorder), widespread substance addiction, and high suicide rates',
        exp: 'Veterans were treated with public indifference or hostility, receiving inadequate medical and psychiatric care.',
      },
      {
        q: 'What foreign policy mindset dominated American politics for two decades following the defeat ("Vietnam Syndrome")?',
        a: 'A deep reluctance by the US public and Congress to commit military troops to foreign conflicts without rapid, guaranteed victory',
        exp: 'Severely constrained American military deployments in the Middle East, Africa, and Central America through the 1980s.',
      },
      {
        q: 'What memorial dedicated in Washington D.C. in 1982 became a sacred site of national healing?',
        a: 'The Vietnam Veterans Memorial (the "Wall", designed by Maya Lin)',
        exp: 'A black granite wall inscribed chronologically with the names of all 58,000 fallen service members.',
      },
      {
        q: 'In historical evaluation, what was the overarching reason why the world’s greatest superpower lost the Vietnam War?',
        a: 'The US attempted to solve a complex political and nationalist struggle with military force alone, underestimating Vietnamese resilience',
        exp: 'Proved that superior industrial and military firepower cannot overcome deeply rooted anti-colonial nationalism without political legitimacy.',
      },
    ],
  },
];

module.exports = { USA_PEARSON_QUIZ_BANK };
