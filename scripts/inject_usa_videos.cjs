const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const usaVideos = [
  // Lesson 1: KT 1.1: What was the position of Black Americans in the early 1950s?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=rYynBR7heVQ',
      title: 'Jim Crow Laws and the Segregated South | Daily Dose Documentary',
      duration: '3 mins 09 secs',
      teacher_guidance:
        "Examines the legal framework of state-sanctioned racial apartheid in the American South, tracing the origins of Jim Crow statutes and the 1896 Plessy v. Ferguson 'separate but equal' doctrine.",
      viewing_task:
        'How did Jim Crow statutes and the 1896 Plessy v. Ferguson ruling enforce racial subordination across the American Deep South in the early 1950s?',
      model_answer:
        "In the early 1950s, Southern states enforced a comprehensive system of de jure segregation through state and local Jim Crow laws, legally underpinned by the 1896 Supreme Court ruling Plessy v. Ferguson which established the doctrine of 'separate but equal'. In practice, facilities for Black Americans—such as segregated schools, hospitals, public transport, waiting rooms, and restrooms—were chronically underfunded, dilapidated, and inherently unequal. Furthermore, Southern states systematically disenfranchised Black citizens through discriminatory voter registration devices including arbitrary literacy tests, poll taxes, and 'grandfather clauses', backed by the threat of vigilante terror from white supremacist groups like the Ku Klux Klan.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=SYiI7j6GW68',
      title: 'Emmett Till, Age 14, Abducted and Murdered | Voices of the Civil Rights Movement',
      duration: '3 mins 33 secs',
      teacher_guidance:
        "Archival footage and historical overview of the August 1955 lynching of 14-year-old Emmett Till in Money, Mississippi, his mother Mamie Till Mobley's open-casket decision, and the acquittal of his killers.",
      viewing_task:
        'Why did the brutal lynching of Emmett Till and the subsequent sham trial act as a national catalyst for the Civil Rights Movement in 1955?',
      model_answer:
        "The August 1955 murder of 14-year-old Emmett Till in Money, Mississippi, galvanized national and international outrage after his mother, Mamie Till-Mobley, courageously insisted on an open-casket funeral in Chicago so 'the world can see what they did to my boy.' Photographs published in Jet magazine exposed the barbaric reality of Southern white supremacist violence to millions. When an all-white, all-male jury acquitted killers Roy Bryant and J.W. Milam in under an hour—and the men later boasted about the murder in Look magazine for financial profit—it exposed the total collapse of justice in the Southern legal system, igniting a wave of direct-action protest and directly inspiring young activists like Rosa Parks.",
    },
  ],

  // Lesson 2: KT 1.2: How did developments in education challenge segregation (1954–57)?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=auATIIhUXVU',
      title: 'Civil Rights Movement: The Little Rock Nine | GCSE History | Homeschool History',
      duration: '1 min 43 secs',
      teacher_guidance:
        "Concise GCSE revision breakdown of the 1957 Little Rock Central High School crisis, Governor Orval Faubus' defiance, and President Eisenhower's deployment of the 101st Airborne Division.",
      viewing_task:
        'Why was President Eisenhower forced to intervene with federal troops at Little Rock Central High School in September 1957?',
      model_answer:
        "President Dwight D. Eisenhower was forced to intervene when Arkansas Governor Orval Faubus openly defied federal court desegregation orders by deploying the Arkansas National Guard to block nine Black students (the 'Little Rock Nine') from entering Central High School on 4 September 1957. When televised footage showed furious white mobs screaming abuse at Elizabeth Eckford, Eisenhower recognized that state defiance threatened the constitutional authority of the Supreme Court and federal law. Exercising executive power, Eisenhower federalized the Arkansas National Guard (removing them from Faubus' control) and dispatched 1,200 combat paratroopers from the 101st Airborne Division to escort the students under armed federal bayonets for the remainder of the school year.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jRYK4RWyUAo',
      title: 'Brown v. Board of Education Explained | Landmark Cases in a Nutshell',
      duration: '3 mins 46 secs',
      teacher_guidance:
        "Detailed constitutional analysis of Chief Justice Earl Warren's unanimous 1954 ruling, Thurgood Marshall's NAACP legal strategy, the doll test sociological evidence, and the limitations of Brown II ('with all deliberate speed').",
      viewing_task:
        'On what constitutional and psychological grounds did the Supreme Court overturn school segregation in Brown v. Board of Education (1954), and what was its major limitation?',
      model_answer:
        "In May 1954, Supreme Court Chief Justice Earl Warren delivered a unanimous 9–0 verdict in Brown v. Board of Education of Topeka, ruling that state-mandated segregation in public schools violated the Equal Protection Clause of the Fourteenth Amendment. Relying on NAACP legal counsel Thurgood Marshall and Kenneth and Mamie Clark's 'doll test' psychological evidence, the Court declared that separating children purely because of race generates a feeling of inferiority that inherently damages their hearts and minds, concluding that 'separate educational facilities are inherently unequal'. However, the ruling set no fixed timetable for integration; in Brown II (1955), the Court vaguely ordered desegregation to proceed 'with all deliberate speed', enabling Southern states to exploit the loophole through 'Massive Resistance' and years of obstructive delay.",
    },
  ],

  // Lesson 3: KT 1.3: How did the Montgomery Bus Boycott happen, and why did it succeed?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=_omQ841ZAWg',
      title: 'The Montgomery Bus Boycott of 1955 | Black American Heroes | HISTORY',
      duration: '5 mins 33 secs',
      teacher_guidance:
        "Examines the 381-day Montgomery Bus Boycott sparked by Rosa Parks, detailing the grassroots carpool logistics organized by the Women's Political Council and the emergence of 26-year-old Dr. Martin Luther King Jr.",
      viewing_task:
        'What tactical and organizational factors enabled the Montgomery Black community to sustain the bus boycott for over a year despite violent intimidation?',
      model_answer:
        "The Montgomery Bus Boycott (1 December 1955 – 20 December 1956) succeeded due to meticulous grassroots logistics, non-violent discipline, and economic leverage. Sparked by Rosa Parks' arrest, Jo Ann Robinson's Women's Political Council immediately mimeographed 35,000 boycott leaflets. The newly formed Montgomery Improvement Association (MIA), led by Dr. Martin Luther King Jr., organized an intricate private carpool network comprising over 300 private vehicles and volunteer church dispatchers, while Black-owned taxi companies charged bus-fare equivalents (10 cents). Because Black passengers comprised over 70% of bus ridership, the municipal bus company suffered devastating revenue losses. Even when segregationists bombed King's home and arrested organizers under archaic anti-boycott statutes, the community maintained non-violent discipline until the Supreme Court ruled segregated buses unconstitutional in Browder v. Gayle in November 1956.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ylOpide9dus',
      title: 'The Montgomery Bus Boycott: Crash Course Black American History #35 | CrashCourse',
      duration: '12 mins 44 secs',
      teacher_guidance:
        "Clint Smith provides deep context on pre-boycott civil rights organizing, Rosa Parks' lifelong activism with the NAACP, Claudette Colvin's earlier arrest, and the legal victory in Browder v. Gayle.",
      viewing_task:
        "Why is it historically inaccurate to view Rosa Parks as simply a 'tired seamstress', and how did her lifelong activism shape the boycott?",
      model_answer:
        "Describing Rosa Parks as merely a 'tired seamstress' who spontaneously refused to surrender her seat erases her decades of calculated political training and civil rights leadership. In reality, Parks had served as the secretary of the Montgomery NAACP branch since 1943, investigating racially motivated sexual assaults against Black women and attending non-violent civil rights workshops at Tennessee's Highlander Folk School. While 15-year-old Claudette Colvin had been arrested nine months earlier for refusing to yield her seat, NAACP leaders chose Parks as their plaintiff because her impeccable community standing, moral stature, and activist training made her an unassailable symbol for a national legal test case and a mass boycott.",
    },
  ],

  // Lesson 4: KT 1.4: Why did white people in the South resist integration, and how did they do it?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=2vxRVCj9Unc',
      title: 'The Civil Rights Act of 1957: Support, Filibuster and Opposition | Wise Society',
      duration: '7 mins 24 secs',
      teacher_guidance:
        'Examines congressional obstruction, Southern Democratic filibuster tactics led by Strom Thurmond (record 24-hour speech), and how the 1957 Civil Rights Act was diluted to pass the Senate.',
      viewing_task:
        "What legislative tactics did Southern congressmen use to weaken the 1957 Civil Rights Act, and what was the law's ultimate practical impact?",
      model_answer:
        "Southern politicians used legislative obstruction, procedural filibusters, and strategic amendments to neutralize the Civil Rights Act of 1957. Leading the 'Dixiecrat' resistance, South Carolina Senator Strom Thurmond staged a record-breaking 24-hour, 18-minute solo filibuster to kill the bill. To secure passage, Senate Majority Leader Lyndon B. Johnson watered down the legislation, eliminating provisions that allowed federal intervention in school desegregation and requiring that registrars accused of suppressing Black votes be tried by local juries (who were invariably all-white). While the Act established the Civil Rights Commission and a Civil Rights Division within the Justice Department, its actual impact on expanding Black voter registration was negligible, adding only about 3% more Black voters by 1960.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=S64zRnnn4Po',
      title: 'Civil Rights and the 1950s: Crash Course US History #39 | CrashCourse',
      duration: '11 mins 58 secs',
      teacher_guidance:
        "John Green surveys the post-war domestic climate, Truman's executive desegregation of the military (Executive Order 9981), the Southern Manifesto of 1956 signed by 101 congressmen, and White Citizens' Councils.",
      viewing_task:
        "How did Southern segregationists organize 'Massive Resistance' through the Southern Manifesto, White Citizens' Councils, and economic reprisals?",
      model_answer:
        "Following Brown v. Board of Education, Southern white leaders mounted a coordinated campaign of 'Massive Resistance'. In 1956, 101 Southern congressmen signed the 'Southern Manifesto', declaring the Supreme Court's ruling a clear abuse of judicial power and pledging to resist forced desegregation through lawful means. Locally, business leaders and politicians formed White Citizens' Councils across the South, using economic terrorism—firing Black employees who signed desegregation petitions, denying bank loans, evicting sharecroppers, and cancelling insurance policies. Simultaneously, violent elements resurrected the Ku Klux Klan, terrorizing activists with cross-burnings, dynamite bombings of churches and homes, and physical assaults.",
    },
  ],

  // Lesson 5: KT 2.1: How did peaceful protests (like sit-ins and Freedom Rides) force the government to act?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1zBY6gkpbTg',
      title: 'The Freedom Riders History | Smithsonian Magazine',
      duration: '5 mins 04 secs',
      teacher_guidance:
        "Explores the 1961 Congress of Racial Equality (CORE) Freedom Rides to test interstate desegregation, the firebombing of the Anniston bus, beatings in Birmingham, and Attorney General Robert F. Kennedy's intervention.",
      viewing_task:
        "How did the Freedom Riders expose the federal government's failure to enforce interstate desegregation, and what did their sacrifices achieve?",
      model_answer:
        'In May 1961, CORE and SNCC organized the Freedom Rides to test whether Southern states were complying with Supreme Court rulings (Morgan v. Virginia and Boynton v. Virginia) outlawing segregation on interstate buses and terminals. In Anniston, Alabama, a KKK mob firebombed a Freedom Ride bus and held the doors shut to burn the riders alive; in Birmingham and Montgomery, riders were savagely beaten with iron pipes while police stood by. By deliberately risking death to highlight federal passivity, the Freedom Riders forced Attorney General Robert F. Kennedy to dispatch 400 federal marshals and petition the Interstate Commerce Commission (ICC), which issued strict federal regulations desegregating all interstate bus terminals, ticket counters, and waiting rooms by November 1961.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=F624q1jBd0Y',
      title: 'Student Civil Rights Activism: Crash Course Black American History #37 | CrashCourse',
      duration: '13 mins 26 secs',
      teacher_guidance:
        'Clint Smith examines the birth of the student direct-action movement, beginning with the 1 February 1960 Greensboro Woolworth lunch counter sit-in, the founding of SNCC by Ella Baker, and the tactical power of youth protest.',
      viewing_task:
        'Why were student-led sit-ins at Woolworth lunch counters in 1960 so effective in revitalizing the Civil Rights Movement?',
      model_answer:
        'On 1 February 1960, four Black freshmen from North Carolina A&T College sat down at an all-white Woolworth lunch counter in Greensboro, refusing to leave after being denied service. Their non-violent direct action transformed civil rights tactics because it was simple, youth-led, and easily replicated. Within weeks, sit-ins spread to 55 cities across 13 states, involving over 70,000 students who endured food dumped over their heads, cigarette burns, verbal abuse, and mass arrests without retaliating. Organized into the Student Nonviolent Coordinating Committee (SNCC) by veteran activist Ella Baker, students placed immense economic pressure on downtown merchants through parallel boycotts, forcing hundreds of department stores and restaurants across the upper South to desegregate by summer 1960.',
    },
  ],

  // Lesson 6: KT 2.2: How did protests in Birmingham and Selma lead to the Civil and Voting Rights Acts?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Vd6D64Ai49I',
      title: 'The Story of Bloody Sunday | Black American Heroes | HISTORY',
      duration: '5 mins 05 secs',
      teacher_guidance:
        "Focuses on the 7 March 1965 Selma to Montgomery voting rights march, state trooper brutality on the Edmund Pettus Bridge, and President Lyndon B. Johnson's historic 'We Shall Overcome' voting rights address.",
      viewing_task:
        "How did the televised brutality of 'Bloody Sunday' in Selma force President Lyndon B. Johnson and Congress to enact the Voting Rights Act of 1965?",
      model_answer:
        "On 7 March 1965, 600 civil rights demonstrators led by John Lewis marched across the Edmund Pettus Bridge in Selma, Alabama, demanding voting rights for Black citizens (who comprised over 50% of Dallas County's population but less than 2% of registered voters). Under orders from segregationist Governor George Wallace, state troopers and mounted possem*n attacked the peaceful crowd with tear gas, bullwhips, and nightsticks. Televised nationwide, 'Bloody Sunday' deeply shocked the American public. Eight days later, President Lyndon B. Johnson addressed a joint session of Congress, declaring 'We Shall Overcome' and introducing the Voting Rights Act of 1965, which abolished literacy tests, outlawed discriminatory registration devices, and placed voter registration under federal oversight.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TLberHUJgHY',
      title: 'The Fight Against Segregation in Birmingham | Black American Heroes | HISTORY',
      duration: '6 mins 46 secs',
      teacher_guidance:
        "Examines Project C (Confrontation) in Birmingham, Alabama (spring 1963), Dr. King's 'Letter from Birmingham Jail', Public Safety Commissioner Bull Connor's deployment of police attack dogs and fire hoses against child marchers.",
      viewing_task:
        "Why did SCLC choose Birmingham, Alabama for 'Project C' in 1963, and how did Bull Connor's violent reaction accelerate national civil rights legislation?",
      model_answer:
        "SCLC chose Birmingham in April 1963 because it was the most rigidly segregated city in the South, nicknamed 'Bombingham' due to over 50 unsolved racially motivated bombings, and led by ultra-segregationist Public Safety Commissioner Eugene 'Bull' Connor. During 'Project C' (Confrontation), when adult arrest numbers dwindled, James Bevel recruited school children for the 'Children's Crusade' in May. Bull Connor turned high-pressure fire hoses and snarling German Shepherd police dogs on peaceful child demonstrators, images of which were broadcast across global television networks. Outraged by the brutality, President John F. Kennedy declared the images 'sickening' and announced a sweeping federal civil rights bill on national television, which was signed into law by Lyndon B. Johnson as the Civil Rights Act of 1964.",
    },
  ],

  // Lesson 7: KT 2.3: What was the Black Power movement, and how did it differ from non-violent protests?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6UBOl5Yq-ms',
      title: 'The Birth of the Black Panthers | Black History in Two Minutes or so',
      duration: '2 mins 06 secs',
      teacher_guidance:
        'Explores the October 1966 founding of the Black Panther Party for Self-Defense in Oakland, California by Huey P. Newton and Bobby Seale, their Ten-Point Program, armed neighborhood cop-watching, and social survival programs.',
      viewing_task:
        'What were the primary core objectives and methods of the Black Panther Party, and how did their approach differ from traditional non-violent protest?',
      model_answer:
        "Founded in Oakland, California in October 1966 by Huey P. Newton and Bobby Seale, the Black Panther Party for Self-Defense rejected Dr. King's Christian philosophy of non-violent turn-the-other-cheek integration, arguing that peaceful marches were powerless against police brutality and institutional racism. Embracing armed self-defense, Panthers conducted armed patrols of police officers ('cop-watching') carrying law books and shotguns to protect Black citizens from arbitrary police violence. Guided by their Marxist-Leninist Ten-Point Program, the Panthers emphasized Black pride, self-reliance, and community empowerment, running grassroots social survival programs such as Free Breakfast for Children, community health clinics, and sickle cell screening, while facing severe suppression from J. Edgar Hoover's FBI COINTELPRO.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=8woU9Rq0cPI',
      title:
        'Malcolm X and the Rise of Black Power: Crash Course Black American History #38 | CrashCourse',
      duration: '14 mins 24 secs',
      teacher_guidance:
        "Clint Smith analyzes Malcolm X's intellectual philosophy, his critique of civil rights integration as 'begging the white man', advocacy for Black nationalism, his break with the Nation of Islam, pilgrimage to Mecca, and assassination in 1965.",
      viewing_task:
        'Why did Malcolm X reject non-violent integration, and what ideological principles did he contribute to the emerging Black Power movement?',
      model_answer:
        "As the national spokesman for the Nation of Islam, Malcolm X rejected Dr. Martin Luther King Jr.'s philosophy of non-violent integration, arguing that begging white oppressors for civil rights was humiliating and ineffective. Malcolm argued that Black Americans had a moral and constitutional right to self-defense 'by any means necessary'. He advocated Black nationalism, racial pride, and economic separatism, urging Black communities to control their own businesses, schools, and political institutions. After leaving the Nation of Islam and completing the Hajj pilgrimage to Mecca in 1964, he adopted Sunni Islam and formed the Organization of Afro-American Unity (OAAU), softening his anti-white rhetoric while continuing to link the African American struggle to global anti-colonial movements, providing the ideological foundation for Stokely Carmichael's 1966 call for 'Black Power'.",
    },
  ],

  // Lesson 8: KT 2.4: Why did riots break out in American cities between 1965 and 1968?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6dlmBco7zsc',
      title: 'The Watts Riots | Voices of the Civil Rights Movement',
      duration: '2 mins 30 secs',
      teacher_guidance:
        'Examines the 11–17 August 1965 Watts rebellion in Los Angeles, sparked by the traffic stop of Marquette Frye, resulting in 34 deaths, over 1,000 injuries, and $40 million in property destruction.',
      viewing_task:
        'What underlying socio-economic grievances caused the explosive outbreak of the Watts rebellion in August 1965, just days after the Voting Rights Act was signed?',
      model_answer:
        'The August 1965 Watts uprising in Los Angeles erupted just five days after President Johnson signed the Voting Rights Act, demonstrating that legal civil rights victories in the South had failed to resolve the deep socio-economic misery of Northern and Western urban ghettos. Black residents in Watts suffered from systemic police brutality from the aggressively militarized LAPD, sub-standard housing, chronic unemployment reaching 30%, and inferior, segregated schools. When a routine traffic stop of 21-year-old Marquette Frye escalated into a physical confrontation on 11 August, simmering frustration over decades of economic deprivation and police harassment exploded into six days of arson, looting, and armed clashes that required 14,000 National Guard troops to suppress.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OX33xb8kbpA',
      title: 'Excerpt: MP886 Detroit Riots & Kerner Commission | TheLBJLibrary',
      duration: '2 mins 31 secs',
      teacher_guidance:
        "Archival footage and presidential records from the LBJ Presidential Library detailing the July 1967 Detroit 12th Street riot (43 dead) and President Johnson's National Advisory Commission on Civil Disorders (Kerner Commission).",
      viewing_task:
        'What famous diagnosis did the 1968 Kerner Commission conclude regarding the causes of urban riots across America?',
      model_answer:
        "Established by President Lyndon B. Johnson following the catastrophic 1967 Detroit riots, the National Advisory Commission on Civil Disorders (headed by Illinois Governor Otto Kerner) released its landmark report in March 1968. The Kerner Commission delivered an unsparing verdict, warning that: 'Our nation is moving toward two societies, one black, one white—separate and unequal.' The commission placed direct blame for urban civil unrest on white racism, chronic black unemployment, substandard ghetto housing, underfunded inner-city schools, and aggressive, biased policing. It recommended massive federal investment in housing, job creation, and welfare, but Johnson largely rejected the recommendations due to the escalating financial drain of the Vietnam War.",
    },
  ],

  // Lesson 9: KT 3.1: Why did the US support the unpopular government of Ngo Dinh Diem in South Vietnam?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=44cnzhzcYjs',
      title: 'Drawn History: What is Domino Theory? | HISTORY',
      duration: '1 min 06 secs',
      teacher_guidance:
        "Rapid-fire visual explainer of President Dwight D. Eisenhower's April 1954 'Domino Theory' press conference, explaining how the fall of French Indochina was believed to threaten all of Southeast Asia.",
      viewing_task:
        "What was President Eisenhower's 'Domino Theory', and how did it dictate US foreign policy toward Vietnam following the 1954 Geneva Accords?",
      model_answer:
        "Articulated by President Eisenhower in April 1954, the 'Domino Theory' posited that if one nation in Southeast Asia fell under communist control, neighboring countries would inevitably topple in succession, like a row of dominos. Washington policymakers feared that if Vietnam fell to Ho Chi Minh's communist Vietminh, Laos, Cambodia, Thailand, Burma, and Malaya would collapse, ultimately threatening Japan, Indonesia, and Australasia. Consequently, when the 1954 Geneva Accords temporarily divided Vietnam along the 17th parallel and scheduled nationwide democratic reunification elections for 1956, the US refused to sign. Fearing an overwhelming electoral landslide for Ho Chi Minh (estimated by Eisenhower at 80%), the US blocked the elections and poured billions in military and economic aid into propping up Ngo Dinh Diem's anti-communist regime in the South.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=028fwjzsAOc',
      title:
        "The Cold War: Diem in South Vietnam - Hamlet Program, Buddhist Crisis and Assassination | I'm Stuck GCSE History",
      duration: '7 mins 13 secs',
      teacher_guidance:
        "Comprehensive Edexcel GCSE Paper 3 review covering Diem's Catholic nepotism, the Strategic Hamlet Program, Thich Quang Duc's self-immolation in Saigon (1963 Buddhist Crisis), and the November 1963 military coup.",
      viewing_task:
        "Why did Ngo Dinh Diem's domestic policies alienate the South Vietnamese population, and why did the US administration ultimately sanction his removal in November 1963?",
      model_answer:
        "Ngo Dinh Diem's authoritarian regime alienated South Vietnam's population because of extreme corruption, nepotism, and religious persecution. A devout Roman Catholic in a country where 70–80% were Buddhist, Diem awarded government jobs and land to Catholics while banning the Buddhist flag. His 'Strategic Hamlet Program' (1962), which forcibly relocated peasants into fortified, barbed-wire compounds to isolate them from the Vietcong, deeply offended traditional peasant ancestor worship and drove thousands to support the communist National Liberation Front (NLF). In May 1963, Diem's troops fired on Buddhist protesters in Hue, sparking the Buddhist Crisis and monk Thich Quang Duc's televised self-immolation. Recognizing that Diem was politically toxic and losing the war, the Kennedy administration gave tacit approval to South Vietnamese generals, who overthrew and assassinated Diem on 2 November 1963.",
    },
  ],

  // Lesson 10: KT 3.2: Why did the US send combat troops to Vietnam after the Gulf of Tonkin incident?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=crALHjTiXbk',
      title: 'The Gulf of Tonkin Incident (1964) | Simple History',
      duration: '3 mins 12 secs',
      teacher_guidance:
        'Animated breakdown of the August 1964 clashes involving USS Maddox and USS Turner Joy in the Gulf of Tonkin, the murky second attack, and how LBJ manipulated the incident to secure congressional authority.',
      viewing_task:
        'What actually occurred during the Gulf of Tonkin incidents on 2 and 4 August 1964, and how did President Johnson present these events to Congress?',
      model_answer:
        "On 2 August 1964, the US destroyer USS Maddox, engaged in covert electronic surveillance (DESOTO patrol) supporting South Vietnamese commando raids against North Vietnamese radar stations, engaged three North Vietnamese torpedo boats in the Gulf of Tonkin. On 4 August, during a stormy night with turbulent seas and freak radar echoes, the Maddox and USS Turner Joy reported a second attack. Although US naval commanders and President Johnson privately acknowledged that no enemy torpedo boats were actually present, Johnson told Congress that North Vietnam had committed 'unprovoked aggression' against American warships in international waters. Johnson used this false pretext to demand emergency powers, railroading the Gulf of Tonkin Resolution through Congress with near-unanimous approval.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=gMhx8R7IL8M',
      title: 'The Gulf of Tonkin Resolution | HISTORY',
      duration: '3 mins 42 secs',
      teacher_guidance:
        "Examines the constitutional implications of the Gulf of Tonkin Resolution (August 1964), known as a 'blank cheque', which allowed Johnson to wage full-scale war without a formal declaration, culminating in the March 1965 Da Nang combat landings.",
      viewing_task:
        "Why was the Gulf of Tonkin Resolution termed a 'blank cheque', and what direct military escalation followed in early 1965?",
      model_answer:
        "Passed on 7 August 1964, the Gulf of Tonkin Resolution authorized the President to 'take all necessary measures to repel any armed attack against the forces of the United States and to prevent further aggression.' Because Congress surrendered its constitutional war-declaring power, the resolution functioned as a presidential 'blank cheque' to wage unlimited undeclared war. Following a Vietcong mortar attack on a US base at Pleiku in February 1965 that killed nine Americans, Johnson unleashed Operation Rolling Thunder—a three-year sustained aerial bombing campaign against North Vietnam. To protect airfields launchings these strikes, Johnson deployed 3,500 US Marines to Red Beach, Da Nang on 8 March 1965, marking the transition from military advisory support to full-scale American ground combat.",
    },
  ],

  // Lesson 11: KT 3.3: Why did US military tactics (like bombing and search & destroy) fail to defeat the Vietcong?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=huRWshoW7T8',
      title: 'Vietcong Guerilla (Vietnam war) | Simple History',
      duration: '3 mins 09 secs',
      teacher_guidance:
        "Examines Vietcong asymmetric guerrilla tactics, Maoist principles of blending with the peasantry ('fish in the sea'), punji stick booby traps, ambush tactics, and the Ho Chi Minh Trail.",
      viewing_task:
        "How did the Vietcong's guerrilla tactics, booby traps, and the Ho Chi Minh Trail successfully neutralize the US military's vast technological and firepower superiority?",
      model_answer:
        "The Vietcong (VC) effectively neutralized US technological superiority by waging asymmetric guerrilla warfare based on Mao Zedong's doctrine: 'The enemy advances, we retreat; the enemy camps, we harass; the enemy tires, we attack; the enemy retreats, we pursue.' Lacking tanks or aircraft, the VC blended seamlessly with civilian villagers ('swimming like fish in water'), making enemy identification impossible for conscripted GIs. They engaged in close-quarters ambush tactics ('hanging onto the American belt-buckles') so US air strikes and artillery could not be deployed without killing friendly troops. Approximately 11% of US deaths and 15% of wounds were inflicted by concealed booby traps, punji stick pits smeared with excrement, and tripwires. Resupply and troop reinforcements flowed continuously down the heavily camouflaged Ho Chi Minh Trail through Laos and Cambodia, which US bombing was powerless to sever.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=XsLE6EtrvhM',
      title: 'Viet Cong Tunnels and Traps - Platoon: The True Story | Discovery UK',
      duration: '3 mins 13 secs',
      teacher_guidance:
        "Veterans and military historians explore the 150-mile subterranean Cu Chi tunnel complexes, describing living conditions, ventilation traps, underground hospitals, and why US 'Search and Destroy' operations failed.",
      viewing_task:
        "Why did the Cu Chi tunnel network and the US military's 'Search and Destroy' strategy alienate South Vietnamese civilians and fail to achieve military victory?",
      model_answer:
        "The 150-mile underground tunnel complex at Cu Chi provided the Vietcong with bomb-proof subterranean bases housing kitchens, command bunkers, weapons factories, and hospitals, allowing guerrillas to stage surprise ambushes and vanish underground before US air support arrived. Specialized American 'tunnel rats' sent into the narrow tunnels faced lethal punji traps, venomous snakes, and booby-trapped trapdoors. In response, US commander General William Westmoreland relied on helicopter-borne 'Search and Destroy' missions, measuring success through arbitrary 'body counts'. US troops torched entire villages with Zippo lighters ('Zippo raids'), defoliated jungles with 20 million gallons of toxic Agent Orange, and incinerated hamlets with gelatinized napalm. These scorched-earth tactics terrorized peasant farmers, radicalized survivors into joining the Vietcong, and completely destroyed the US campaign to 'win hearts and minds'.",
    },
  ],

  // Lesson 12: KT 3.4: What was Nixon's 'Vietnamization' policy, and did it achieve peace with honour?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=JUzTdiaiHhQ',
      title: 'Why Did Kissinger Wage A Secret War On Cambodia? | American Experience | PBS',
      duration: '5 mins 01 secs',
      teacher_guidance:
        "Examines Operation Menu (1969 secret B-52 carpet bombing of neutral Cambodia), National Security Advisor Henry Kissinger's strategy to disrupt the Ho Chi Minh Trail, and the April 1970 ground incursion.",
      viewing_task:
        'Why did President Nixon and Henry Kissinger order the secret bombing and ground invasion of neutral Cambodia in 1969–70, and what were its catastrophic consequences?',
      model_answer:
        "In March 1969, President Richard Nixon and Henry Kissinger launched Operation Menu, a secret campaign of B-52 carpet bombing targeting neutral Cambodia, concealing the missions from Congress and the American public through falsified military flight logs. Nixon aimed to destroy North Vietnamese and Vietcong sanctuary bases, headquarters (COSVN), and supply depots along the Ho Chi Minh Trail to buy time for his Vietnamization policy. In April 1970, Nixon expanded this by ordering 30,000 US and ARVN combat troops to invade Cambodia. While tactical caches were captured, the incursions destabilized Cambodian society, paved the way for Pol Pot's genocidal Khmer Rouge to seize power, and ignited explosive anti-war outrage across US college campuses, culminating in the Kent State massacre.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=n4fzowrmYh8',
      title:
        "The Cold War: Nixon in Vietnam - Vietnamisation, Cambodia and Invasion of Laos | I'm Stuck GCSE History",
      duration: '7 mins 26 secs',
      teacher_guidance:
        'Comprehensive Pearson Edexcel GCSE overview of the Nixon Doctrine (1969), withdrawal of US combat ground troops, expansion of ARVN equipment, Operation Lam Son 719 into Laos (1971), and the Madman Theory.',
      viewing_task:
        "What were the core tenets of Nixon's 'Vietnamization' policy, and why did the 1971 invasion of Laos (Operation Lam Son 719) prove the policy was failing?",
      model_answer:
        "Announced in 1969 under the Nixon Doctrine, 'Vietnamization' was designed to secure 'peace with honor' by withdrawing all 540,000 US combat ground troops while training, arming, and financing the Army of the Republic of Vietnam (ARVN) to assume full responsibility for fighting the war. Nixon poured modern jet fighters, M16 rifles, artillery, and armored vehicles into the South Vietnamese military, expanding ARVN to over one million men while using American air power to substitute for ground forces. However, Operation Lam Son 719 in February 1971—where ARVN troops invaded Laos without US ground advisors to cut the Ho Chi Minh Trail—shattered the illusion of ARVN self-sufficiency. North Vietnamese forces routed the South Vietnamese army, forcing panic-stricken ARVN soldiers to cling desperately to the landing skids of evacuating American helicopters, proving that South Vietnam could not survive without direct US combat intervention.",
    },
  ],

  // Lesson 13: KT 4.1: Why did so many Americans oppose the Vietnam War (like at My Lai and Kent State)?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=9Pwro3vCUdU',
      title: 'The Kent State Shootings, Explained | History',
      duration: '5 mins 33 secs',
      teacher_guidance:
        'Examines the 4 May 1970 Kent State University shootings in Ohio, the burning of the ROTC building, the National Guard opening fire with M1 Garand rifles, leaving four students dead and nine wounded.',
      viewing_task:
        'Why did protests erupt at Kent State University in May 1970, and how did the shootings by Ohio National Guardsmen impact public opinion on the war?',
      model_answer:
        "Protests erupted at Kent State University in early May 1970 immediately following President Nixon's televised announcement that US combat troops had invaded neutral Cambodia, which students viewed as an illegal, deceptive expansion of a war Nixon had promised to de-escalate. Following days of tension and the burning of an on-campus ROTC building, Ohio Governor James Rhodes dispatched the Ohio National Guard. On 4 May 1970, Guardsmen armed with live ammunition and bayonets opened fire into a crowd of unarmed student demonstrators, firing 67 rounds in 13 seconds, killing four students (Allison Krause, Jeffrey Miller, Sandra Scheuer, and William Schroeder) and wounding nine others. The iconic Pulitzer Prize-winning photograph of Mary Ann Vecchio kneeling over Miller's body horrified the world, triggering a nationwide student strike that shut down over 450 colleges and universities and polarizing the country into bitter pro- and anti-war factions.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=ydo1TLuOHiY',
      title: 'The Hero who stood up to the My Lai Massacre (1968) | Simple History',
      duration: '9 mins 45 secs',
      teacher_guidance:
        "Detailed account of the 16 March 1968 My Lai massacre by Charlie Company under Lieutenant William Calley, the cover-up, investigative journalist Seymour Hersh's exposure, and helicopter pilot Hugh Thompson Jr.'s moral courage.",
      viewing_task:
        'What took place during the My Lai Massacre in March 1968, and why did its revelation in November 1969 profoundly undermine American moral justification for the war?',
      model_answer:
        'On 16 March 1968, soldiers of Charlie Company, 11th Infantry Brigade, led by Lieutenant William Calley, entered the village of Son My (My Lai) on a Search and Destroy mission. Despite finding zero Vietcong combatants or weapons, American troops rounded up, systematically raped, and slaughtered between 347 and 504 unarmed Vietnamese civilians, primarily women, children, infants, and elderly men, dumping their corpses into drainage ditches. The slaughter was halted only when US helicopter observation pilot Hugh Thompson Jr. landed between troops and civilians, ordering his crew to aim heavy machine guns at their fellow American soldiers if they continued shooting. Although the military covered up the war crime for over a year, investigative journalist Seymour Hersh broke the story in November 1969 with graphic photographs, shattering the moral myth that the US was defending Vietnamese freedom and converting millions of mainstream Americans against the war.',
    },
  ],

  // Lesson 14: KT 4.2: Why did some Americans support the Vietnam War and the 'Silent Majority'?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Hqz0i83Jqxg',
      title: "Nixon's 'Great Silent Majority' | American Experience | PBS",
      duration: '1 min 34 secs',
      teacher_guidance:
        "Archival footage and analysis of President Richard Nixon's defining 3 November 1969 televised address appealing to the 'great silent majority' of Americans who supported his Vietnam policy against vocal street protesters.",
      viewing_task:
        "Who were the 'Silent Majority' described by President Nixon in November 1969, and why did they support continuing the war in Vietnam?",
      model_answer:
        "In his landmark 3 November 1969 televised speech, President Richard Nixon appealed directly to the 'great silent majority' of Americans. This demographic comprised working-class and middle-class citizens, suburban voters, World War II and Korean War veterans, and conservative blue-collar workers who felt alienated and insulted by vocal campus radicals, draft dodgers, counterculture hippies, and anti-war street demonstrators. The Silent Majority supported continued US involvement because they believed in traditional patriotism, feared that an abrupt American retreat would represent an intolerable national humiliation, and accepted the Cold War imperative of containing global communism. Nixon's speech was an enormous political triumph, garnering over 77% public approval and demonstrating that pro-war sentiment remained deeply entrenched across Middle America.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CYjxP7un91U',
      title: 'The 1970 Riot that Split America | American Experience | PBS',
      duration: '3 mins 48 secs',
      teacher_guidance:
        "Examines the 8 May 1970 'Hard Hat Riot' in Lower Manhattan, where 200 construction workers attacked anti-war student demonstrators mourning the Kent State dead, and its political endorsement by Nixon.",
      viewing_task:
        "How did the 1970 'Hard Hat Riot' in New York demonstrate the deep social and class divisions within American society over the Vietnam War?",
      model_answer:
        'On 8 May 1970, just four days after the Kent State shootings, approximately 200 pro-war union construction workers wearing yellow hard hats attacked roughly 1,000 anti-war high school and college students holding a peaceful memorial near Wall Street in Lower Manhattan. Armed with lead pipes, scaffolding clubs, and wrenches, the construction workers chased and violently beat demonstrators, demanding they wave the American flag and singing patriotic hymns while police largely looked away. The riot reflected fierce class antagonism: working-class tradesmen, whose sons disproportionately filled the draft because they could not afford college deferments, viewed privileged, middle-class anti-war college students as unpatriotic traitors. President Nixon capitalized on these divisions, inviting union leaders to the White House and securing blue-collar votes for the Republican coalition.',
    },
  ],

  // Lesson 15: KT 4.3: How did the US exit Vietnam, and why did South Vietnam fall so quickly in 1975?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=k3SfcSageUk',
      title: 'Fall of Saigon - Vietnam War Ends - April 30, 1975 | NBCUniversal Archives',
      duration: '2 mins 11 secs',
      teacher_guidance:
        'Dramatic archival newsreel capturing the chaotic final hours of the Republic of Vietnam on 30 April 1975: Operation Frequent Wind helicopter evacuations from the US Embassy rooftop and North Vietnamese tanks crashing through the gates of the Independence Palace.',
      viewing_task:
        'Why did South Vietnam collapse in just 55 days during the Spring 1975 Offensive, culminating in the Fall of Saigon on 30 April?',
      model_answer:
        "South Vietnam collapsed with catastrophic speed during the 55-day Spring Offensive (March–April 1975) because the ARVN was crippled by corruption, collapsing morale, and the complete withdrawal of American military backing. Following the Watergate scandal and President Nixon's resignation in August 1974, an assertive US Congress passed the War Powers Act of 1973 and drastically slashed military and fuel aid to South Vietnam. When North Vietnamese General Van Tien Dung launched his multi-corps assault, ARVN President Nguyen Van Thieu ordered a chaotic, panicked retreat from the Central Highlands, causing entire divisions to disintegrate into anarchy. On 30 April 1975, as US helicopters frantically evacuated embassy staff in Operation Frequent Wind, North Vietnamese T-54 Tank 390 crashed through the iron gates of Saigon's Presidential Palace, ending the 30-year war and reunifying Vietnam under communist rule.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=mfBTw2UejO0',
      title:
        "The Cold War: The Paris Peace Agreement 1973 and the End of the Vietnam War | I'm Stuck GCSE History",
      duration: '5 mins 18 secs',
      teacher_guidance:
        'Comprehensive analysis of the January 1973 Paris Peace Accords negotiated by Henry Kissinger and Le Duc Tho, the Christmas Bombings (Operation Linebacker II), and the terms of American military withdrawal.',
      viewing_task:
        "What were the core terms of the January 1973 Paris Peace Accords, and why was the treaty deeply flawed for South Vietnam's long-term survival?",
      model_answer:
        "Signed on 27 January 1973 by the United States, North Vietnam, South Vietnam, and the Vietcong (PRG), the Paris Peace Accords established an immediate ceasefire, required the complete withdrawal of all remaining US combat troops within 60 days, and mandated the return of all American prisoners of war (POWs). However, the treaty was fundamentally fatal to South Vietnam because Henry Kissinger made a catastrophic diplomatic concession: roughly 150,000 North Vietnamese Army (PAVN) troops were permitted to remain in control of their captured territory inside South Vietnam. While Nixon privately gave President Thieu written guarantees that the US would respond with air strikes if the North violated the treaty, Nixon's political destruction in Watergate rendered these promises worthless, leaving South Vietnam completely exposed to full-scale invasion.",
    },
  ],

  // Lesson 16: KT 4.4: What were the main reasons why the US failed to win the war in Vietnam?
  [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=zAq6MrYgLr0',
      title: 'How did the U.S. Fail in Vietnam? | Animated History | The Armchair Historian',
      duration: '8 mins 23 secs',
      teacher_guidance:
        "High-level military and political overview analyzing why the world's greatest superpower failed to achieve its objectives: tactical guerrilla resilience, terrain challenges, lack of political legitimacy in Saigon, and home front collapse.",
      viewing_task:
        "Why did the US military's reliance on conventional firepower and attrition fail against the Vietcong and North Vietnamese forces in the jungle?",
      model_answer:
        "The US failed militarily because it attempted to fight a conventional war of attrition against an asymmetric ideological insurgency operating in dense jungle terrain. General Westmoreland believed that massive firepower (delivering three times the total tonnage of bombs dropped in World War II) and helicopter mobility would reach a 'crossover point' where enemy casualties exceeded replacement capacity. However, North Vietnamese and Vietcong fighters possessed total ideological commitment, viewing the conflict as an existential sacred war for national liberation and reunification. They absorbed staggering losses (over 1.1 million soldiers killed) without breaking. Furthermore, US soldiers served one-year tours of duty, meaning that just as GIs gained jungle combat experience, they were rotated home and replaced by green conscripts, resulting in severe morale crises, drug abuse, and 'fragging' incidents in the latter years of the war.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=XMLZamqVifg',
      title: 'GCSE History Rapid Revision: Why did the USA Fail in Vietnam? | MrClokeHistory',
      duration: '13 mins 28 secs',
      teacher_guidance:
        'Masterclass GCSE Edexcel revision evaluating and categorizing the five decisive pillars of US failure: US military shortcomings, North Vietnamese strengths, South Vietnamese unpopularity, domestic opposition, and international diplomacy.',
      viewing_task:
        'Synthesize the five core reasons why the United States failed in Vietnam into a balanced GCSE 16-mark explanatory argument.',
      model_answer:
        "The United States failed to achieve its objectives in Vietnam due to five interconnected factors. First, **US Military Inadequacy:** relying on indiscriminate Search and Destroy tactics, napalm, and Agent Orange devastated the countryside and alienated the very civilians the US was ostensibly defending. Second, **North Vietnamese Strengths:** the Vietcong utilized asymmetric guerrilla warfare, booby traps, and the subterranean Cu Chi tunnel networks, sustained by continuous Soviet and Chinese arms flowing down the unseverable Ho Chi Minh Trail. Third, **South Vietnamese Political Weakness:** the Saigon regime was hopelessly corrupt, nepotistic, and lacked legitimate popular consent among peasant farmers. Fourth, **Collapse of the American Home Front:** as the first televised 'living room war', graphic media coverage of the Tet Offensive, My Lai, and Kent State shattered the domestic consensus, sparking mass draft resistance and civil unrest. Fifth, **Economic and Geopolitical Limits:** escalating war expenditures fueled domestic inflation and depleted military resources, forcing consecutive presidents to pursue withdrawal.",
    },
  ],
];

async function main() {
  const dataFilePath = path.join(__dirname, '../units/usa/data.js');
  const mod = await import(pathToFileURL(dataFilePath).href);
  const unitData = mod.default || mod.unitData || mod;

  if (!unitData || !unitData.lessons) {
    console.error('Could not load USA data.js!');
    process.exit(1);
  }

  console.log(`Loaded USA data with ${unitData.lessons.length} lessons.`);

  unitData.lessons.forEach((lesson, idx) => {
    if (usaVideos[idx]) {
      lesson.video = usaVideos[idx];
      console.log(`Lesson ${idx + 1} (${lesson.id}): Injected ${lesson.video.length} videos.`);
    } else {
      console.warn(`No videos found for lesson index ${idx}`);
    }
  });

  // Construct new clean data.js with dual exports
  const newContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataFilePath, newContent, 'utf8');
  console.log(`Updated ${dataFilePath}`);

  // Sync to public/data/usa.json
  const publicJsonPath = path.join(__dirname, '../public/data/usa.json');
  if (fs.existsSync(publicJsonPath)) {
    fs.writeFileSync(publicJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
    console.log(`Updated ${publicJsonPath}`);
  }

  // Sync to data/usa.json
  const dataJsonPath = path.join(__dirname, '../data/usa.json');
  if (fs.existsSync(dataJsonPath)) {
    fs.writeFileSync(dataJsonPath, JSON.stringify(unitData, null, 2), 'utf8');
    console.log(`Updated ${dataJsonPath}`);
  }

  console.log('USA video injection complete!');
}

main().catch(console.error);
