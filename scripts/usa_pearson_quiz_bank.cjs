/**
 * usa_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 3 (1HI0/33):
 * The USA, 1954–75: Conflict at Home and Abroad.
 * Master Knowledge Retrieval Bank (16 Enquiries x 8 Questions = 128 Questions).
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Edexcel Specification and Revision Guide.
 * 2. High-Yield Specification Recall: Zero obscure trivia, zero university-level fluff.
 * 3. Pre-Anchored Dates in Stems: Questions test substantive facts and mechanisms rather than date guessing.
 * 4. SEN-Accessible Language: Direct, accessible vocabulary preserving all Tier-3 specification terminology.
 * 5. Two-Line Format: Line 1 = Key Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 6. Authentic Examiner Trap Callout on every enquiry page.
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
      'Examiner Warning: Do not confuse de jure segregation (enforced by Jim Crow state laws in the South) with de facto segregation (caused by economic poverty and housing discrimination in the North).',
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
        q: 'In 1948, which US President issued Executive Order 9981 to desegregate the US Armed Forces?',
        a: 'President Harry S. Truman',
        exp: 'Bypassed congressional Southern segregationists to demonstrate federal executive power in advancing civil rights.',
      },
      {
        q: 'What constitutional amendment guarantees all US citizens "equal protection of the laws"?',
        a: 'The 14th Amendment (1868)',
        exp: 'Served as the core constitutional weapon used by civil rights lawyers to strike down state segregation statutes.',
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
        q: 'On 17 May 1954, what landmark ruling did the Supreme Court deliver in Brown v. Board of Education?',
        a: 'Racial segregation in state public schools was unconstitutional',
        exp: 'Overturned the 1896 Plessy doctrine, ruling unanimously that separate schools were inherently unequal.',
      },
      {
        q: 'Who was the Chief Justice of the Supreme Court who authored the unanimous Brown decision?',
        a: 'Chief Justice Earl Warren',
        exp: 'United the court to declare that "in the field of public education, separate educational facilities are inherently unequal."',
      },
      {
        q: 'What vague phrase in Brown II (1955) allowed Southern school boards to delay integration indefinitely?',
        a: '"With all deliberate speed"',
        exp: 'Gave segregationist officials legal leeway to stall desegregation for over a decade without penalties.',
      },
      {
        q: 'In 1956, what document was signed by 101 Southern congressmen pledging to resist Brown by all lawful means?',
        a: 'The Southern Manifesto',
        exp: 'Encouraged widespread white resistance and the revival of Ku Klux Klan terror groups across the South.',
      },
      {
        q: 'In September 1957, which Arkansas high school became the central battleground for desegregation?',
        a: 'Little Rock Central High School',
        exp: 'Nine Black students attempted to desegregate the school under federal court orders, facing violent white mobs.',
      },
      {
        q: 'Which Arkansas Governor deployed the State National Guard to block the Little Rock Nine from entering?',
        a: 'Governor Orval Faubus',
        exp: 'Directly challenged federal authority and the Supreme Court to preserve segregation for his white voters.',
      },
      {
        q: 'On 24 September 1957, what decisive military action did President Eisenhower take at Little Rock?',
        a: 'Sent 1,200 soldiers of the 101st Airborne Division and federalised the Arkansas National Guard',
        exp: 'Proved the federal government would use military force to uphold the Constitution and enforce court orders.',
      },
      {
        q: 'How did Governor Faubus retaliate during the following school year in 1958–59 (the "Lost Year")?',
        a: 'He closed all four public high schools in Little Rock to prevent integration',
        exp: 'Deprived thousands of teenagers of education rather than allow Black and white pupils to learn together.',
      },
    ],
  },

  // ENQUIRY 3 (KT 1.3): The Montgomery Bus Boycott (1955–56)
  {
    num: 3,
    id: 'lesson_1_3',
    keyTopic: 'Key Topic 1: Civil Rights, 1954–60',
    title: 'The Montgomery Bus Boycott (1955–56)',
    enquiry: 'Why was the Montgomery Bus Boycott successful and why was it a turning point?',
    examinerTrap:
      'Examiner Warning: Emphasize that Rosa Parks was not simply a tired seamstress; she was an experienced, trained NAACP activist. Also note that the boycott alone did not end segregation; federal court ruling Browder v. Gayle made it legally binding.',
    questions: [
      {
        q: 'On 1 December 1955, who was arrested in Montgomery, Alabama, for refusing to give up her bus seat?',
        a: 'Rosa Parks',
        exp: 'Trained NAACP secretary whose arrest provided the catalyst for a mass municipal direct action campaign.',
      },
      {
        q: 'Which organisation and leader mimeographed 35,000 leaflets overnight calling for a one-day bus boycott?',
        a: 'Jo Ann Robinson and the Women’s Political Council (WPC)',
        exp: 'Mobilized the Black community within 48 hours, transforming a single protest into a sustained boycott.',
      },
      {
        q: 'What new organisation was formed on 5 December 1955 to lead the bus boycott, and who was its president?',
        a: 'The Montgomery Improvement Association (MIA), led by Dr Martin Luther King Jr.',
        exp: 'Brought 26-year-old Martin Luther King Jr. to national prominence as a powerful orator of non-violent resistance.',
      },
      {
        q: 'What percentage of Montgomery bus passengers were Black, providing massive economic leverage?',
        a: 'Approximately 70% to 75%',
        exp: 'Deprived the bus company of the majority of its daily fare revenue, causing severe financial losses.',
      },
      {
        q: 'How did the Black community travel to work during the 381-day boycott without city buses?',
        a: 'A coordinated 300-car pool system, Black taxi discounts, and walking up to 12 miles daily',
        exp: 'Demonstrated remarkable discipline, solidarity, and self-reliance despite police harassment and intimidation.',
      },
      {
        q: 'In January 1956, what violent acts did white extremists commit against boycott leaders?',
        a: 'Firebombed the family homes of Martin Luther King Jr. and E.D. Nixon',
        exp: 'Failed to break boycott resolve and highlighted King’s unwavering commitment to Christian non-violence.',
      },
      {
        q: 'In November 1956, what landmark Supreme Court ruling declared bus segregation unconstitutional?',
        a: 'Browder v. Gayle (1956)',
        exp: 'Struck down Alabama’s bus segregation laws under the 14th Amendment, delivering legal victory to the boycott.',
      },
      {
        q: 'What major civil rights organisation did Martin Luther King Jr. found in 1957 following the boycott?',
        a: 'The Southern Christian Leadership Conference (SCLC)',
        exp: 'Organized Black Southern church ministers into a coordinated non-violent direct action movement.',
      },
    ],
  },

  // ENQUIRY 4 (KT 1.4): White Resistance, Emmett Till & 1957 Act
  {
    num: 4,
    id: 'lesson_1_4',
    keyTopic: 'Key Topic 1: Civil Rights, 1954–60',
    title: 'White Resistance, Emmett Till & 1957 Act',
    enquiry:
      'How strong was white resistance to civil rights and how significant was the 1957 Act?',
    examinerTrap:
      'Examiner Warning: Do not overstate the impact of the Civil Rights Act of 1957. While historically symbolic as the first civil rights statute since 1875, Southern filibusters watered it down so heavily that it added fewer than 3% new Black voters.',
    questions: [
      {
        q: 'In August 1955, which 14-year-old Chicago youth was brutally murdered in Money, Mississippi?',
        a: 'Emmett Till',
        exp: 'Kidnapped, beaten, and shot for allegedly whistling at a white woman in a grocery store.',
      },
      {
        q: 'What courageous decision did Mamie Till Bradley make regarding her son’s funeral in Chicago?',
        a: 'She insisted on an open-casket funeral so the world could see the racial brutality',
        exp: 'Photographs in Jet magazine shocked millions worldwide and galvanized a new generation of civil rights activists.',
      },
      {
        q: 'How quickly did the all-white male jury acquit Emmett Till’s killers in September 1955?',
        a: '67 minutes (just over one hour)',
        exp: 'Demonstrated that Southern legal systems protected white murderers from justice; killers later confessed in Look magazine.',
      },
      {
        q: 'What organisation of white professionals and politicians was founded in 1954 to resist integration economically?',
        a: 'The White Citizens’ Councils',
        exp: 'Used firings, eviction notices, and credit freezes to bankrupt Black citizens who signed school integration petitions.',
      },
      {
        q: 'What was the primary goal of the Civil Rights Act of 1957 introduced by the Eisenhower administration?',
        a: 'To increase Black voter registration in the Southern states',
        exp: 'Set up a Civil Rights Division in the Justice Department to investigate voting rights violations.',
      },
      {
        q: 'Which Southern Senator conducted a record-breaking 24-hour-and-18-minute filibuster against the 1957 Act?',
        a: 'Senator Strom Thurmond (South Carolina)',
        exp: 'Symbolized the fierce determination of Southern Democrats to block any federal civil rights legislation.',
      },
      {
        q: 'Why did the Civil Rights Act of 1957 achieve very limited practical results for Black voters?',
        a: 'Watered down by Congress: defendants faced all-white local juries, adding under 3% new voters',
        exp: 'Proved federal civil rights bills needed robust enforcement powers to overcome Southern resistance.',
      },
      {
        q: 'What was the main historical significance of the 1957 Act despite its practical weakness?',
        a: 'It was the first federal civil rights legislation passed by the US Congress since Reconstruction in 1875',
        exp: 'Broke an 82-year legislative deadlock and established federal responsibility for protecting Black voting rights.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 2: PROTEST, PROGRESS AND RADICALISM, 1960–75
  // =========================================================================

  // ENQUIRY 5 (KT 2.1): Sit-Ins, Freedom Rides & James Meredith
  {
    num: 5,
    id: 'lesson_2_1',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Sit-Ins, Freedom Rides & James Meredith',
    enquiry:
      'How did direct action and student protest accelerate the civil rights movement (1960–62)?',
    examinerTrap:
      'Examiner Warning: Distinguish between the organisations: CORE organized the 1961 Freedom Rides; SNCC grew out of the 1960 lunch counter sit-ins. Candidates often credit MLK and the SCLC with starting these student-led actions.',
    questions: [
      {
        q: 'On 1 February 1960, where did four Black college students launch the sit-in movement?',
        a: 'F.W. Woolworth lunch counter in Greensboro, North Carolina',
        exp: 'Ignited a wave of peaceful sit-ins across 55 Southern cities, integrating over 100 lunch counters by summer.',
      },
      {
        q: 'What student-led civil rights organisation was founded in April 1960 following the Greensboro sit-ins?',
        a: 'SNCC (Student Nonviolent Coordinating Committee)',
        exp: 'Empowered young activists to adopt confrontational non-violent direct action on the front lines of the South.',
      },
      {
        q: 'What was the objective of the 1961 Freedom Rides organised by CORE?',
        a: 'To test whether interstate bus travel and terminal waiting rooms were being integrated as ordered by federal courts',
        exp: 'Forced the federal government to confront Southern defiance of Supreme Court integration rulings (Boynton v. Virginia).',
      },
      {
        q: 'In May 1961, what violent attack occurred against Freedom Riders outside Anniston, Alabama?',
        a: 'A KKK mob firebombed the Greyhound bus and held the doors shut to burn the riders alive',
        exp: 'Horrific photographs on national television forced Attorney General Robert Kennedy to intervene.',
      },
      {
        q: 'Who was the Birmingham Police Commissioner who allowed the KKK 15 minutes to assault Freedom Riders?',
        a: 'Eugene "Bull" Connor',
        exp: 'Withdrew police protection at the bus station, leaving riders defenseless against brutal iron-pipe beatings.',
      },
      {
        q: 'In November 1961, what decisive order did the Interstate Commerce Commission (ICC) issue?',
        a: 'Strictly desegregated all interstate buses, trains, and terminal facilities nationwide',
        exp: 'Proved direct action could force federal agencies to enforce the law and dismantle Jim Crow in transport.',
      },
      {
        q: 'In 1962, which Air Force veteran sought to become the first Black student at the University of Mississippi?',
        a: 'James Meredith',
        exp: 'Won a federal court order to enroll, but was physically blocked at the door by Mississippi Governor Ross Barnett.',
      },
      {
        q: 'On 30 September 1962, what military force did President Kennedy dispatch to quell the campus riot at Ole Miss?',
        a: 'Over 300 federal marshals and 20,000 federal troops',
        exp: 'Two people were killed in deadly riots, but Meredith was successfully registered, breaking the university’s colour bar.',
      },
    ],
  },

  // ENQUIRY 6 (KT 2.2): Birmingham, Washington & Landmark Acts
  {
    num: 6,
    id: 'lesson_2_2',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Birmingham, Washington & Landmark Acts',
    enquiry:
      'How did mass demonstrations lead directly to the 1964 and 1965 civil rights statutes?',
    examinerTrap:
      'Examiner Warning: Master the distinct functions of the two landmark acts: the Civil Rights Act of 1964 desegregated public facilities and banned job discrimination; the Voting Rights Act of 1965 banned literacy tests and enforced Black suffrage.',
    questions: [
      {
        q: 'In April–May 1963, what codename was given to the SCLC desegregation campaign in Birmingham, Alabama?',
        a: '"Project C" (Project Confrontation)',
        exp: 'Aimed to provoke Police Commissioner Bull Connor into public brutality to shock the conscience of the nation.',
      },
      {
        q: 'What controversial tactic did the SCLC deploy in Birmingham on 2–3 May 1963?',
        a: 'The Children’s Crusade',
        exp: 'Connor unleashed high-pressure firehoses and attack dogs on child marchers; televised horror compelled JFK to draft civil rights laws.',
      },
      {
        q: 'On 28 August 1963, what historic mass rally was held at the Lincoln Memorial in Washington, D.C.?',
        a: 'The March on Washington for Jobs and Freedom',
        exp: '250,000 Black and white Americans gathered; Martin Luther King Jr. delivered his iconic "I Have a Dream" speech.',
      },
      {
        q: 'On 2 July 1964, which US President signed the landmark Civil Rights Act of 1964 into law?',
        a: 'President Lyndon B. Johnson (LBJ)',
        exp: 'Used his legislative skill and JFK’s memory to push through the most comprehensive civil rights bill in US history.',
      },
      {
        q: 'What core provisions were established by the Civil Rights Act of 1964?',
        a: 'Outlawed segregation in public facilities, banned employment discrimination (EEOC), and cut funds to segregated schools',
        exp: 'Legally abolished Jim Crow segregation throughout the American South and created federal enforcement machinery.',
      },
      {
        q: 'In June 1964, what tragedy befell three civil rights workers during Freedom Summer in Mississippi?',
        a: 'Abducted and murdered by the KKK in Philadelphia, Mississippi (Chaney, Goodman, and Schwerner)',
        exp: 'Demonstrated violent white terrorism against voter registration, sparking an extensive FBI investigation.',
      },
      {
        q: 'On 7 March 1965 ("Bloody Sunday"), what violent attack occurred at the Edmund Pettus Bridge in Selma, Alabama?',
        a: 'State troopers tear-gassed and clubbed 600 peaceful marchers demanding voting rights',
        exp: 'Televised brutality watched by 48 million viewers forced President Johnson to introduce voting rights legislation.',
      },
      {
        q: 'On 6 August 1965, what historic voting legislation did President Johnson sign into law?',
        a: 'The Voting Rights Act of 1965',
        exp: 'Outlawed literacy tests and deployed federal registrars; Southern Black registration surged from under 7% to 60% by 1968.',
      },
    ],
  },

  // ENQUIRY 7 (KT 2.3): Malcolm X & The Rise of Black Power
  {
    num: 7,
    id: 'lesson_2_3',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Malcolm X & Rise of Black Power',
    enquiry: 'Why did radical Black nationalism and Black Power emerge in the mid-1960s?',
    examinerTrap:
      'Examiner Warning: Do not portray the Black Panthers solely as violent militants. Explain their dual character: armed community patrols against police brutality alongside practical social survival programs (Free Breakfast for Children, health clinics).',
    questions: [
      {
        q: 'Which religious organisation did Malcolm X champion before his public break in 1964?',
        a: 'The Nation of Islam (Black Muslims)',
        exp: 'Preached Black separatism, economic self-reliance, and rejected integration into a corrupt white society.',
      },
      {
        q: 'Why did Malcolm X reject Martin Luther King Jr.’s philosophy of non-violence?',
        a: 'He argued non-violence left Black people defenceless against brutality, advocating self-defence "by any means necessary"',
        exp: 'Articulated northern ghetto fury, arguing Black Americans had a moral right to defend their lives and families.',
      },
      {
        q: 'In 1964, what transformative journey led Malcolm X to abandon strict Black separatism?',
        a: 'His Hajj pilgrimage to Mecca',
        exp: 'Witnessed racial harmony among Muslims of all skin colours, adopting orthodox Sunni Islam and founding the OAAU.',
      },
      {
        q: 'In June 1966, who popularised the rallying cry "Black Power" during the March Against Fear in Mississippi?',
        a: 'Stokely Carmichael (SNCC Chairman)',
        exp: 'Signalled a radical break from non-violence, urging Black Americans to build independent political and economic power.',
      },
      {
        q: 'In October 1966, who founded the Black Panther Party for Self-Defense in Oakland, California?',
        a: 'Huey P. Newton and Bobby Seale',
        exp: 'Carried loaded firearms while shadowing police patrols to protect Black citizens from systemic police brutality.',
      },
      {
        q: 'What revolutionary manifesto set out the Black Panther Party’s political and economic demands?',
        a: 'The Ten-Point Program',
        exp: 'Demanded full employment, decent housing, fair trials by Black juries, and an end to police brutality.',
      },
      {
        q: 'What vital community survival programs did the Black Panthers establish in urban neighbourhoods?',
        a: 'Free Breakfast for Children, free medical clinics, and community education centers',
        exp: 'Fed tens of thousands of impoverished children daily, building immense grassroots loyalty across inner-city ghettos.',
      },
      {
        q: 'At the 1968 Mexico City Olympics, what silent protest was staged by Tommie Smith and John Carlos on the medal podium?',
        a: 'Raised black-gloved fists in a Black Power salute during the US national anthem',
        exp: 'Brought the struggle against American racial injustice and poverty before a global television audience.',
      },
    ],
  },

  // ENQUIRY 8 (KT 2.4): Urban Rioting, Kerner Report & King (1965–68)
  {
    num: 8,
    id: 'lesson_2_4',
    keyTopic: 'Key Topic 2: Protest & Radicalism, 1960–75',
    title: 'Urban Rioting, Kerner Report & King (1965–68)',
    enquiry:
      'Why did urban riots erupt in northern cities and what was their impact on civil rights?',
    examinerTrap:
      'Examiner Warning: High-scoring answers recognize that the 1964 and 1965 Acts did not solve northern de facto segregation, job discrimination, or slum housing. The urban riots reflected economic frustration rather than opposition to integration laws.',
    questions: [
      {
        q: 'In August 1965, which Los Angeles neighbourhood erupted in a six-day riot leaving 34 dead?',
        a: 'Watts',
        exp: 'Sparked by police brutality; destroyed $40 million in property and shifted the civil rights focus to northern urban poverty.',
      },
      {
        q: 'In July 1967, which two major cities experienced catastrophic urban riots in the "Long Hot Summer"?',
        a: 'Newark (New Jersey) and Detroit (Michigan)',
        exp: '43 people died in Detroit; federal tanks were deployed to regain control of burning urban neighbourhoods.',
      },
      {
        q: 'In 1968, what famous warning was published in the Kerner Commission Report into urban rioting?',
        a: '"Our nation is moving toward two societies, one black, one white—separate and unequal"',
        exp: 'Blamed systemic white racism and economic deprivation for the riots, urging massive federal urban investment.',
      },
      {
        q: 'In 1966, what campaign did Martin Luther King Jr. launch in the North to challenge slum housing and poverty?',
        a: 'The Chicago Freedom Movement',
        exp: 'Confronted fierce white mob violence in Cicero, proving northern de facto housing racism was as vicious as southern Jim Crow.',
      },
      {
        q: 'On 4 April 1968, where was Dr Martin Luther King Jr. assassinated?',
        a: 'Lorraine Motel in Memphis, Tennessee (by James Earl Ray)',
        exp: 'Silenced the nation’s leading advocate of non-violence, triggering violent riots in over 100 American cities.',
      },
      {
        q: 'On 11 April 1968, what final major civil rights statute was signed into law by President Johnson?',
        a: 'The Civil Rights Act of 1968 (Fair Housing Act)',
        exp: 'Outlawed racial discrimination in the sale, rental, and financing of residential housing nationwide.',
      },
      {
        q: 'How did the urban riots of 1965–68 affect white suburban public opinion and politics?',
        a: 'Triggered a conservative white backlash, fueling Richard Nixon’s 1968 "Law and Order" presidential victory',
        exp: 'Many white voters felt civil rights had gone too far, turning away from liberal social reform programs.',
      },
      {
        q: 'What was the overall status of the civil rights struggle by the early 1970s?',
        a: 'De jure segregation had been dismantled, but severe economic inequality, housing segregation, and educational gaps persisted',
        exp: 'Showed that federal legislation could outlaw discriminatory laws, but could not easily eradicate systemic poverty or racism.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 3: US INVOLVEMENT IN THE VIETNAM WAR, 1954–75
  // =========================================================================

  // ENQUIRY 9 (KT 3.1): US Intervention: Domino Theory & Diem
  {
    num: 9,
    id: 'lesson_3_1',
    keyTopic: 'Key Topic 3: Vietnam War, 1954–75',
    title: 'US Intervention: Domino Theory & Diem',
    enquiry:
      'Why did the United States become militarily involved in Vietnam between 1954 and 1963?',
    examinerTrap:
      'Examiner Warning: Do not view US involvement as starting suddenly in 1965. Candidates must understand Eisenhower’s Domino Theory, the 1954 Geneva Accords, and Kennedy’s deployment of 16,000 military advisers to prop up Diem.',
    questions: [
      {
        q: 'In May 1954, which catastrophic military defeat ended French colonial rule in Indochina?',
        a: 'The Battle of Dien Bien Phu',
        exp: 'Viet Minh forces led by General Giap crushed the French garrison, forcing France to withdraw from Indochina.',
      },
      {
        q: 'In July 1954, what international agreements temporarily partitioned Vietnam at the 17th Parallel?',
        a: 'The Geneva Accords',
        exp: 'Divided Vietnam into North (Ho Chi Minh) and South (Ngo Dinh Diem) with nationwide elections promised for 1956.',
      },
      {
        q: 'What Cold War theory did President Eisenhower articulate to justify US intervention in Southeast Asia?',
        a: 'The "Domino Theory"',
        exp: 'Argued that if South Vietnam fell to communism, neighbouring countries like Laos, Cambodia, and Thailand would collapse next.',
      },
      {
        q: 'Why did South Vietnamese leader Ngo Dinh Diem refuse to hold the nationwide 1956 elections promised at Geneva?',
        a: 'He and the US knew communist leader Ho Chi Minh would win an overwhelming democratic landslide (approx. 80%)',
        exp: 'Violated the Geneva Accords to prevent the democratic unification of Vietnam under a communist government.',
      },
      {
        q: 'In December 1960, what communist guerrilla organisation was formed in South Vietnam to overthrow Diem?',
        a: 'The National Liberation Front (NLF / Vietcong)',
        exp: 'United southern communist and nationalist rebels, receiving covert supplies and reinforcements from North Vietnam.',
      },
      {
        q: 'In 1962, what unpopular program did Diem and the US launch, forcibly moving peasants into fortified villages?',
        a: 'The Strategic Hamlet Program',
        exp: 'Alienated rural peasants by uprooting them from ancestral lands, driving thousands of recruits into the Vietcong.',
      },
      {
        q: 'In June 1963, what dramatic protest shocked the world when photographed at a busy Saigon intersection?',
        a: 'Buddhist monk Thich Quang Duc burned himself to death (self-immolation)',
        exp: 'Protested Diem’s Catholic regime persecuting Buddhists, destroying US government claims that Diem led a democracy.',
      },
      {
        q: 'On 2 November 1963, what happened to Ngo Dinh Diem with quiet approval from the Kennedy administration?',
        a: 'He was overthrown in a military coup by ARVN generals and assassinated',
        exp: 'Left South Vietnam politically chaotic and unstable, increasing American pressure to intervene directly.',
      },
    ],
  },

  // ENQUIRY 10 (KT 3.2): Tonkin, Escalation & Rolling Thunder
  {
    num: 10,
    id: 'lesson_3_2',
    keyTopic: 'Key Topic 3: Vietnam War, 1954–75',
    title: 'Tonkin, Escalation & Rolling Thunder',
    enquiry:
      'How did the Gulf of Tonkin incident lead to full-scale American military escalation in 1965?',
    examinerTrap:
      'Examiner Warning: Explain that the Gulf of Tonkin Resolution was passed based on disputed second-night torpedo reports. Congress gave President Johnson sweeping powers without a formal declaration of war, creating a "blank cheque" for escalation.',
    questions: [
      {
        q: 'In August 1964, which US destroyer was allegedly attacked by North Vietnamese torpedo boats?',
        a: 'The USS Maddox',
        exp: 'Clashed with North Vietnamese patrol boats in the Gulf of Tonkin while gathering intelligence for covert coastal raids.',
      },
      {
        q: 'On 7 August 1964, what sweeping resolution was passed by the US Congress almost unanimously?',
        a: 'The Gulf of Tonkin Resolution',
        exp: 'Gave President Johnson a "blank cheque" to take "all necessary measures" to repel armed attacks without declaring war.',
      },
      {
        q: 'In February 1965, what deadly Vietcong attack on a US base killed 8 Americans, triggering air strikes?',
        a: 'The attack on the US airfield at Pleiku',
        exp: 'Provided the immediate justification for Johnson to launch sustained retaliatory aerial bombing against North Vietnam.',
      },
      {
        q: 'In March 1965, what massive sustained aerial bombing campaign against North Vietnam began?',
        a: 'Operation Rolling Thunder',
        exp: 'Dropped more bomb tonnage on North Vietnam over three years than was dropped in all of WWII, aiming to destroy supply routes.',
      },
      {
        q: 'On 8 March 1965, where did the first 3,500 US ground combat troops land in South Vietnam?',
        a: 'Da Nang air base',
        exp: 'Marked the transition from US military advisers to direct American combat deployment on the ground.',
      },
      {
        q: 'To what number did US troop deployment in Vietnam surge by the end of 1967?',
        a: 'Nearly 500,000 troops (approx. 485,000)',
        exp: 'General Westmoreland pursued a war of attrition, demanding continuous troop increases to overwhelm the enemy.',
      },
      {
        q: 'What complex jungle supply network ran from North Vietnam through Laos and Cambodia into the South?',
        a: 'The Ho Chi Minh Trail',
        exp: 'Moved tens of thousands of tons of weapons and troops south; bombed relentlessly but never successfully severed.',
      },
      {
        q: 'Why was Operation Rolling Thunder largely ineffective in forcing North Vietnam to surrender?',
        a: 'North Vietnam was a pre-industrial agricultural society with few industrial targets, and bombed routes were swiftly repaired',
        exp: 'Underground tunnels and manual labour kept supplies flowing, while heavy civilian bombing strengthened North Vietnamese resolve.',
      },
    ],
  },

  // ENQUIRY 11 (KT 3.3): Tactics: Guerrillas vs Search & Destroy
  {
    num: 11,
    id: 'lesson_3_3',
    keyTopic: 'Key Topic 3: Vietnam War, 1954–75',
    title: 'Tactics: Guerrillas vs Search & Destroy',
    enquiry: 'Why did American military technology fail to defeat Vietcong guerrilla tactics?',
    examinerTrap:
      'Examiner Warning: Emphasize that superior American firepower often worked against them politically. Indiscriminate weapons like napalm and Agent Orange alienated the rural population whose support was essential to winning.',
    questions: [
      {
        q: 'What military strategy did the Vietcong adopt to negate superior US firepower and air support?',
        a: 'Guerrilla warfare (ambushes, booby traps, and hit-and-run strikes)',
        exp: 'Avoided large-scale conventional battles, blending into the civilian population and attacking only when they held the advantage.',
      },
      {
        q: 'What tactical slogan described the Vietcong technique of fighting in extreme close proximity to US soldiers?',
        a: '"Hanging on to the belts of the enemy"',
        exp: 'Fought so close to American patrols that US commanders could not call in air strikes or artillery without killing their own men.',
      },
      {
        q: 'What extensive underground engineering marvel did the Vietcong construct near Saigon to survive US air strikes?',
        a: 'The Cu Chi tunnel network',
        exp: 'Contained hospitals, barracks, and weapon stores over 150 miles of tunnels, allowing fighters to launch surprise raids and vanish.',
      },
      {
        q: 'What primitive, concealed booby trap caused severe puncture wounds and infection among US infantry patrols?',
        a: 'Punji stake traps (sharpened bamboo stakes smeared with excrement)',
        exp: 'Accounted for over 10% of American casualties, causing immense psychological fear and slowing patrols to a crawl.',
      },
      {
        q: 'What primary ground combat tactic did General Westmoreland deploy to locate and eliminate Vietcong units?',
        a: 'Search-and-Destroy missions (using helicopter insertion)',
        exp: 'Troops flew into suspected enemy territory, destroyed camps and food stores, but left areas immediately open for Vietcong reoccupation.',
      },
      {
        q: 'What metric did the US military hierarchy use to measure "progress" in the absence of territorial frontlines?',
        a: 'The "Body Count" (number of enemy dead)',
        exp: 'Incentivised officers to inflate casualties and kill anyone running away, leading to atrocities against innocent peasants.',
      },
      {
        q: 'What toxic chemical defoliant did the US military spray over millions of acres of Vietnamese jungle?',
        a: 'Agent Orange',
        exp: 'Destroyed dense jungle cover and crops, causing devastating long-term birth defects and cancers among Vietnamese and US veterans.',
      },
      {
        q: 'What jellied petroleum weapon was dropped by US fighter-bombers, burning skin at over 1,000°C?',
        a: 'Napalm',
        exp: 'Clung to human flesh and incinerated village huts, outraging global opinion when images of burned children reached world news.',
      },
    ],
  },

  // ENQUIRY 12 (KT 3.4): Vietnamization, Secret Bombing & Accords
  {
    num: 12,
    id: 'lesson_3_4',
    keyTopic: 'Key Topic 3: Vietnam War, 1954–75',
    title: 'Vietnamization, Secret Bombing & Accords',
    enquiry: 'How did Richard Nixon change American strategy to withdraw US forces from Vietnam?',
    examinerTrap:
      'Examiner Warning: Note the apparent contradiction in Nixon’s policy: he withdrew US ground combat troops (Vietnamization) while simultaneously expanding the air war through secret bombings and invasions of Cambodia and Laos.',
    questions: [
      {
        q: 'In June 1969, what policy did President Richard Nixon announce to withdraw US troops while expanding ARVN responsibility?',
        a: 'Vietnamization',
        exp: 'Aimed to build up the South Vietnamese Army with modern US weapons so American combat troops could be withdrawn.',
      },
      {
        q: 'What diplomatic slogan did Nixon use to describe his goal of exiting Vietnam without an outright American surrender?',
        a: '"Peace with Honor"',
        exp: 'Sought to preserve an independent, non-communist South Vietnam and maintain American global credibility.',
      },
      {
        q: 'To what number did Nixon reduce US ground troops in Vietnam between 1969 and 1972?',
        a: 'From 543,000 down to under 25,000',
        exp: 'Reduced American battle casualties sharply, helping to defuse domestic anti-war protests at home.',
      },
      {
        q: 'In March 1969, what secret military operation did Nixon order to bomb communist sanctuaries in neighbouring Cambodia?',
        a: 'Operation Menu',
        exp: 'Conducted without congressional approval, dropping thousands of tons of bombs on neutral Cambodian border areas.',
      },
      {
        q: 'What disastrous political consequence occurred in Cambodia as a direct result of US bombing and destabilisation?',
        a: 'It fueled the rise of the brutal Khmer Rouge regime led by Pol Pot',
        exp: 'Destabilized the Cambodian government, leading to the takeover of the genocidal Khmer Rouge in 1975.',
      },
      {
        q: 'Who was Nixon’s National Security Adviser who conducted four years of secret peace negotiations with North Vietnam in Paris?',
        a: 'Dr Henry Kissinger',
        exp: 'Bypassed official diplomats to negotiate directly with North Vietnamese representative Le Duc Tho.',
      },
      {
        q: 'In December 1972, what intense 11-day bombing campaign against Hanoi did Nixon launch to force peace terms?',
        a: 'Operation Linebacker II (the "Christmas Bombings")',
        exp: 'Dropped 20,000 tons of explosives on North Vietnamese cities, forcing Hanoi back to the negotiating table.',
      },
      {
        q: 'On 27 January 1973, what historic agreement was officially signed ending direct US military involvement in Vietnam?',
        a: 'The Paris Peace Accords',
        exp: 'Enforced a ceasefire, the return of American POWs, and the complete withdrawal of all US combat troops within 60 days.',
      },
    ],
  },

  // =========================================================================
  // KEY TOPIC 4: REACTIONS TO, AND THE END OF, THE VIETNAM WAR, 1964–75
  // =========================================================================

  // ENQUIRY 13 (KT 4.1): The Tet Offensive & Anti-War Movement
  {
    num: 13,
    id: 'lesson_4_1',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'Tet Offensive & The Anti-War Movement',
    enquiry:
      'Why was the Tet Offensive the decisive turning point in American domestic support for the war?',
    examinerTrap:
      'Examiner Warning: Master the distinction between military reality and public perception during Tet. Militarily, the Vietcong were decimated (tactical defeat); psychologically, the US government’s claim that victory was in sight was destroyed (strategic victory for North).',
    questions: [
      {
        q: 'On 30–31 January 1968, what surprise offensive was launched by communist forces across South Vietnam?',
        a: 'The Tet Offensive',
        exp: '84,000 Vietcong and NVA troops attacked over 100 cities, towns, and the US Embassy in Saigon during the holiday truce.',
      },
      {
        q: 'Following the Tet attacks, what famous on-air judgment did CBS news anchor Walter Cronkite deliver?',
        a: 'He declared the Vietnam War an unwinnable "stalemate"',
        exp: 'Influenced millions of middle-class Americans to believe government reports of progress had been dishonest.',
      },
      {
        q: 'What term describes the widening difference between optimistic government statements and the grim reality of Vietnam on TV?',
        a: 'The "Credibility Gap"',
        exp: 'Severely eroded public trust in President Johnson and General Westmoreland’s claims that victory was near.',
      },
      {
        q: 'On 31 March 1968, what shocking political announcement did President Lyndon Johnson make on national television?',
        a: 'He would not seek or accept nomination for another term as US President',
        exp: 'Demonstrated how the political fallout from the Vietnam War had destroyed Johnson’s presidency.',
      },
      {
        q: 'Why did the military draft (conscription) generate intense social and racial anger among young Americans?',
        a: 'College students received deferments, meaning poor working-class and Black youth were drafted in disproportionate numbers',
        exp: 'Created bitter class divisions; Black soldiers made up a disproportionately high share of frontline combat casualties.',
      },
      {
        q: 'What student organisation spearheaded mass university campus strikes and anti-war demonstrations across America?',
        a: 'SDS (Students for a Democratic Society)',
        exp: 'Organized national teach-ins, draft-card burnings, and massive marches on Washington to demand an immediate ceasefire.',
      },
      {
        q: 'In 1967, which heavyweight boxing champion was stripped of his world title and convicted for refusing the draft?',
        a: 'Muhammad Ali',
        exp: 'Declared "no Vietcong ever called me nigger", linking the anti-war movement directly with Black civil rights.',
      },
      {
        q: 'Why is the Tet Offensive universally regarded as the decisive psychological turning point of the war?',
        a: 'It convinced the American public and political establishment that military victory was impossible at an acceptable cost',
        exp: 'Forced Washington to abandon escalation and begin the protracted diplomatic search for an exit strategy.',
      },
    ],
  },

  // ENQUIRY 14 (KT 4.2): Media, My Lai, Kent State & Silent Majority
  {
    num: 14,
    id: 'lesson_4_2',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'Media, My Lai, Kent State & Silent Majority',
    enquiry:
      'How did media coverage and domestic atrocities polarise American society between 1968 and 1971?',
    examinerTrap:
      'Examiner Warning: Understand that media coverage did not turn anti-war immediately in 1965. Early coverage supported the war; only after the 1968 Tet Offensive and the exposure of My Lai and the Pentagon Papers did journalism become openly adversarial.',
    questions: [
      {
        q: 'Why was Vietnam referred to by historians and media critics as America’s first "Living Room War"?',
        a: 'Uncensored television footage of combat, casualties, and napalm was broadcast nightly into family homes on the evening news',
        exp: 'Brought the horrific human realities of jungle combat directly to the electorate, eroding domestic morale.',
      },
      {
        q: 'On 16 March 1968, in which South Vietnamese village did Charlie Company massacre over 500 unarmed civilians?',
        a: 'My Lai (Son My village)',
        exp: 'Soldiers murdered unarmed women, children, and infants; covered up by the military for over a year.',
      },
      {
        q: 'In November 1969, which investigative journalist broke the My Lai massacre story to the global public?',
        a: 'Seymour Hersh',
        exp: 'Exposed military atrocities and photos of mass graves, horrifying the American public and world opinion.',
      },
      {
        q: 'In November 1969, what phrase did President Nixon use in a televised speech to mobilise conservative working Americans?',
        a: 'The "Silent Majority"',
        exp: 'Appealed to patriotic, law-abiding citizens who supported the war against vocal radical student demonstrators.',
      },
      {
        q: 'On 30 April 1970, what military escalation announced by Nixon triggered ferocious nationwide campus protests?',
        a: 'The US ground invasion of Cambodia',
        exp: 'Viewed as a dangerous widening of the war, triggering strikes across over 400 university campuses.',
      },
      {
        q: 'On 4 May 1970, what tragedy occurred at Kent State University in Ohio during an anti-war protest?',
        a: 'Ohio National Guardsmen fired 67 rounds into a crowd of student demonstrators, killing 4 and wounding 9',
        exp: 'Shocked the world and caused 4 million students to walk out on strike in the largest student strike in US history.',
      },
      {
        q: 'In June 1971, what classified Department of Defense study was leaked to the New York Times by Daniel Ellsberg?',
        a: 'The Pentagon Papers',
        exp: 'Proved the US government and four successive presidents had systematically lied to Congress and the public about Vietnam.',
      },
      {
        q: 'How did domestic divisions over Vietnam affect American society by 1972?',
        a: 'The nation fractured along generational, class, and cultural lines, destroying the post-WWII political consensus',
        exp: 'Created deep cultural bitterness between pro-war conservatives and anti-war liberals that lasted for decades.',
      },
    ],
  },

  // ENQUIRY 15 (KT 4.3): The Peace Process, Paris Agreement (1973) & Costs of War
  {
    num: 15,
    id: 'lesson_4_3',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'The Peace Process, Paris Agreement (1973) & Costs of War',
    enquiry:
      'How were the Paris Peace Accords negotiated and what were the human and economic costs of the war?',
    examinerTrap:
      'Examiner Warning: Candidates must understand why South Vietnam’s President Thieu opposed the 1973 Paris Peace Accords: the agreement allowed over 150,000 North Vietnamese Army soldiers to remain inside South Vietnam, effectively dooming Saigon.',
    questions: [
      {
        q: 'Which two chief negotiators conducted the secret peace talks in Paris between 1969 and 1973?',
        a: 'Henry Kissinger (US National Security Adviser) and Le Duc Tho (North Vietnamese diplomat)',
        exp: 'Negotiated for four years before reaching the breakthrough ceasefire terms in early 1973.',
      },
      {
        q: 'In 1972, what diplomatic strategy of Détente did Nixon pursue to pressure North Vietnam to negotiate?',
        a: 'Visited communist leaders in Beijing (China) and Moscow (Soviet Union)',
        exp: 'Exploited the Sino-Soviet split, reducing superpower aid to North Vietnam and isolating Hanoi diplomatically.',
      },
      {
        q: 'In December 1972, what massive 11-day bombing campaign did Nixon order to force Hanoi back to talks?',
        a: 'Operation Linebacker II (the "Christmas Bombings")',
        exp: 'Dropped 20,000 tons of explosives on North Vietnam, overcoming final objections and securing the peace treaty.',
      },
      {
        q: 'Under the Paris Peace Agreement of 27 January 1973, within how many days was the US required to withdraw all troops?',
        a: 'Within 60 days',
        exp: 'Ended direct American military combat involvement and led to the departure of the last combat troops on 29 March 1973.',
      },
      {
        q: 'What crucial commitment did North Vietnam make regarding American captives under the 1973 agreement?',
        a: 'The release of all American Prisoners of War (POWs) within 60 days (Operation Homecoming)',
        exp: '591 American POWs (including future Senator John McCain) were released from North Vietnamese prisons.',
      },
      {
        q: 'What major concession did the USA grant North Vietnam in the 1973 agreement that doomed South Vietnam?',
        a: 'Around 150,000 North Vietnamese Army (NVA) troops were permitted to remain stationed inside South Vietnam',
        exp: 'Left the communist army in prime tactical position to launch the final invasion that conquered Saigon in 1975.',
      },
      {
        q: 'Approximately how many American military service personnel lost their lives in the Vietnam War?',
        a: 'Over 58,000 Americans killed (along with over 300,000 wounded)',
        exp: 'Represents the fourth-deadliest conflict in US history, leaving lasting trauma across American society.',
      },
      {
        q: 'What estimated financial sum did the United States spend on the war, and what domestic impact did it have?',
        a: 'Over $167 billion, triggering rampant domestic inflation and gutting LBJ’s "Great Society" social welfare programs',
        exp: 'Drained federal funds away from anti-poverty, housing, and healthcare programs at home.',
      },
    ],
  },

  // ENQUIRY 16 (KT 4.4): Why the US Failed: Synoptic Evaluation
  {
    num: 16,
    id: 'lesson_4_4',
    keyTopic: 'Key Topic 4: Reactions & End of War, 1964–75',
    title: 'Why the US Failed: Synoptic Evaluation',
    enquiry: 'Why did the United States fail to achieve its strategic objectives in Vietnam?',
    examinerTrap:
      'Examiner Warning: In 16-mark synoptic evaluation essays, candidates must balance multiple factors: military tactical errors, failure to win hearts and minds, corruption of the ARVN, and the collapse of domestic political support.',
    questions: [
      {
        q: 'What is the estimated total number of Vietnamese people (combatants and civilians) killed between 1954 and 1975?',
        a: 'Between 2 and 3 million Vietnamese',
        exp: 'Reflects the immense human devastation inflicted on Vietnam’s population and infrastructure during two decades of war.',
      },
      {
        q: 'Why was the failure to "win hearts and minds" among the South Vietnamese rural peasantry fatal to the US mission?',
        a: 'Heavy bombing, napalm, defoliants, and Search-and-Destroy raids made the US military hated by the rural population',
        exp: 'Drove millions of peasants to support the Vietcong, ensuring communist guerrillas had endless food, shelter, and intelligence.',
      },
      {
        q: 'What fundamental political weakness crippled the South Vietnamese government and its army (ARVN)?',
        a: 'Widespread corruption, military incompetence, and a total lack of democratic legitimacy among ordinary citizens',
        exp: 'Ordinary Vietnamese viewed the Saigon government as American puppets who had no genuine popular support.',
      },
      {
        q: 'What motivational advantage did the Vietcong and North Vietnamese Army hold over American conscripts?',
        a: 'They were fighting a total war for national survival and independence, willing to accept unlimited casualties to win',
        exp: 'American soldiers were fighting a limited war far from home, counting the days until their 12-month tour ended.',
      },
      {
        q: 'How did geographical and environmental conditions undermine superior American military technology?',
        a: 'Dense tropical rainforest, extreme heat, monsoons, and swamp terrain nullified heavy tanks and aided guerrilla concealment',
        exp: 'Created ideal conditions for ambush and booby traps while neutralizing heavy American armored divisions.',
      },
      {
        q: 'How did the one-year "tour of duty" (12 months for GIs) undermine American combat effectiveness?',
        a: 'Just as soldiers gained vital jungle combat experience, they rotated home, replacing seasoned troops with inexperienced rookies',
        exp: 'Meant the US was not fighting a 10-year war with seasoned troops, but fighting a one-year war ten times over.',
      },
      {
        q: 'What term describes the foreign policy reluctance that dominated American politics for two decades following the defeat?',
        a: 'The "Vietnam Syndrome"',
        exp: 'A deep reluctance by the public and Congress to commit US ground troops abroad without rapid, guaranteed victory.',
      },
      {
        q: 'In historical evaluation, what was the overarching reason why the world’s greatest superpower lost the Vietnam War?',
        a: 'The US attempted to solve a complex political and nationalist struggle with military force alone, underestimating Vietnamese resilience',
        exp: 'Proved that superior technology and firepower cannot overcome deeply rooted anti-colonial nationalism without political legitimacy.',
      },
    ],
  },
];

module.exports = {
  USA_PEARSON_QUIZ_BANK,
};
