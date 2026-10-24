/**
 * scripts/backfill_usa_flashcards.cjs
 *
 * Authors and injects high-yield flashcards (6 per lesson) for all 16 lessons
 * in USA 1954–75: Conflict at Home and Abroad (KT1 to KT4: lesson_1_1 to lesson_4_4).
 * Ensures both { term, definition, q, a } schema.
 */

const fs = require('fs');
const path = require('path');

const USA_FLASHCARDS = {
  lesson_1_1: [
    {
      term: 'Jim Crow Laws',
      definition:
        'State and local statutes enacted in the American South mandating racial segregation in all public facilities, schools, transportation, and public spaces.',
      q: 'What were Jim Crow laws in the American South?',
      a: 'State and local laws enforcing rigid racial segregation in public facilities, schools, and transportation across the South.',
    },
    {
      term: 'Plessy v. Ferguson (1896)',
      definition:
        "The landmark US Supreme Court decision that legalized racial segregation under the constitutional doctrine of 'separate but equal'.",
      q: 'What was the significance of Plessy v. Ferguson (1896)?',
      a: "The Supreme Court established the 'separate but equal' doctrine, providing legal justification for Southern Jim Crow laws.",
    },
    {
      term: 'NAACP',
      definition:
        'National Association for the Advancement of Colored People, founded in 1909 to fight racial discrimination primarily through legal challenges in federal courts.',
      q: 'What was the NAACP, and what method did it use to challenge segregation?',
      a: 'A civil rights organisation founded in 1909 that challenged segregation through strategic legal court battles.',
    },
    {
      term: 'CORE',
      definition:
        'Congress of Racial Equality, an interracial civil rights group founded in 1942 that pioneered non-violent direct action, including sit-ins and Journey of Reconciliation.',
      q: "What was CORE's strategy in the early civil rights movement?",
      a: 'Using non-violent direct action, including boycotts and sit-ins, to challenge racial segregation.',
    },
    {
      term: 'Disenfranchisement',
      definition:
        'The systematic denial of voting rights to Black citizens in the Deep South through poll taxes, literacy tests, white primaries, and intimidation.',
      q: 'How were Black Americans disenfranchised in the South during the early 1950s?',
      a: 'Through unfair literacy tests, prohibitive poll taxes, intimidation, and violence by white registrars and vigilantes.',
    },
    {
      term: 'De Jure vs De Facto Segregation',
      definition:
        'De Jure segregation was mandated by law (in the South); De Facto segregation existed in practice through housing discrimination, poverty, and prejudice (in the North).',
      q: 'What is the difference between De Jure and De Facto segregation?',
      a: 'De Jure segregation is enforced by statutory law, whereas De Facto segregation occurs through social and economic custom.',
    },
  ],

  lesson_1_2: [
    {
      term: 'Brown v. Board of Education (1954)',
      definition:
        "The unanimous Supreme Court ruling declaring that racial segregation in public schools violated the 14th Amendment because 'separate educational facilities are inherently unequal'.",
      q: 'What did the Supreme Court rule in Brown v. Board of Education (1954)?',
      a: 'That state laws establishing separate public schools for Black and white students were inherently unequal and unconstitutional.',
    },
    {
      term: 'Chief Justice Earl Warren',
      definition:
        'The progressive Supreme Court Chief Justice who forged a unanimous 9-0 ruling in Brown v. Board and declared that segregation generated feelings of inferiority.',
      q: 'Who was Chief Justice Earl Warren?',
      a: 'The US Chief Justice who united the Supreme Court in the unanimous 1954 Brown decision striking down school segregation.',
    },
    {
      term: 'Little Rock Nine (1957)',
      definition:
        'Nine brave African American students chosen to integrate Little Rock Central High School in Arkansas, facing violent white mobs and state resistance.',
      q: 'Who were the Little Rock Nine?',
      a: 'Nine Black students who integrated Central High School in Little Rock, Arkansas in September 1957 amidst fierce white resistance.',
    },
    {
      term: 'Governor Orval Faubus',
      definition:
        'The segregationist Governor of Arkansas who deployed the state National Guard to physically block the Little Rock Nine from entering Central High School.',
      q: 'What action did Governor Orval Faubus take at Little Rock in 1957?',
      a: 'He ordered the Arkansas National Guard to surround Central High School and physically prevent Black students from entering.',
    },
    {
      term: '101st Airborne Division Intervention',
      definition:
        'President Dwight D. Eisenhower federalized the Arkansas National Guard and dispatched 1,000 elite paratroopers of the 101st Airborne to escort the students at bayonet point.',
      q: 'How did President Eisenhower respond to the Little Rock crisis?',
      a: 'He federalized the National Guard and sent 1,000 soldiers of the 101st Airborne Division to protect the students and enforce federal law.',
    },
    {
      term: "The 'Lost Year' (1958–59)",
      definition:
        'Governor Faubus closed all four Little Rock public high schools for the entire 1958–59 academic year to prevent further desegregation before federal courts reopened them.',
      q: "What was the 'Lost Year' in Little Rock?",
      a: 'The 1958–59 school year when Governor Faubus shut all public high schools in Little Rock to prevent integration.',
    },
  ],

  lesson_1_3: [
    {
      term: 'Murder of Emmett Till (August 1955)',
      definition:
        'The brutal abduction and lynching of 14-year-old Chicago boy Emmett Till in Mississippi after allegedly whistling at a white woman; his killers were acquitted by an all-white jury.',
      q: 'Why did the murder of Emmett Till catalyze the civil rights movement?',
      a: "His mother's decision to hold an open-casket funeral exposed the brutal reality of Southern white racism to international media.",
    },
    {
      term: 'Rosa Parks',
      definition:
        'A dedicated NAACP secretary and activist who was arrested on 1 December 1955 in Montgomery, Alabama, for refusing to surrender her bus seat to a white passenger.',
      q: 'What action did Rosa Parks take on 1 December 1955?',
      a: 'She refused to give up her bus seat to a white man in Montgomery, Alabama, sparking the Montgomery Bus Boycott.',
    },
    {
      term: 'Montgomery Bus Boycott (1955–56)',
      definition:
        'A 381-day peaceful boycott of city buses by 40,000 Black citizens in Montgomery, crippling the bus company financially until federal courts integrated the system.',
      q: 'How long did the Montgomery Bus Boycott last and why was it effective?',
      a: 'It lasted 381 days and succeeded because 90% of Black passengers boycotted buses, causing crippling revenue losses.',
    },
    {
      term: 'Montgomery Improvement Association (MIA)',
      definition:
        'The organization formed by local Black leaders and ministers to oversee the boycott, coordinate carpools, and elect 26-year-old Martin Luther King Jr. as president.',
      q: 'What was the Montgomery Improvement Association (MIA)?',
      a: 'The committee established to coordinate the bus boycott and direct non-violent resistance, led by Martin Luther King Jr.',
    },
    {
      term: 'Martin Luther King Jr.',
      definition:
        'A Baptist pastor whose eloquent oratory, Christian theology, and Gandhian philosophy of non-violent direct action transformed him into the foremost civil rights leader.',
      q: 'What philosophy did Martin Luther King Jr. advocate in the civil rights movement?',
      a: "Non-violent direct resistance combining Christian principles with Mahatma Gandhi's techniques of peaceful civil disobedience.",
    },
    {
      term: 'Browder v. Gayle (1956)',
      definition:
        'The federal district court and Supreme Court ruling declaring segregated city bus transportation in Alabama unconstitutional under the 14th Amendment.',
      q: 'What was the legal outcome of Browder v. Gayle (1956)?',
      a: 'The US Supreme Court ruled that bus segregation in Montgomery was unconstitutional, legally ending the boycott.',
    },
  ],

  lesson_1_4: [
    {
      term: 'The Southern Manifesto (1956)',
      definition:
        "A declaration signed by 101 Southern congressmen and senators condemning the Brown decision as a 'clear abuse of judicial power' and pledging resistance to integration.",
      q: 'What was the Southern Manifesto of 1956?',
      a: "A declaration by 101 Southern congressmen vowing to resist federal desegregation rulings through 'all lawful means'.",
    },
    {
      term: "White Citizens' Councils (WCC)",
      definition:
        'Organisations formed by prominent Southern white businessmen and professionals to exert economic coercion (firing workers, evicting tenants) against civil rights activists.',
      q: "How did White Citizens' Councils oppose integration?",
      a: 'They used economic pressure, including firing Black activists, cancelling mortgages, and denying credit, to stop desegregation.',
    },
    {
      term: 'Ku Klux Klan (KKK) Revival',
      definition:
        'The resurgence of violent white supremacist terror groups in the 1950s using cross-burnings, dynamite bombings, beatings, and murders to terrorize Black communities.',
      q: 'How did the Ku Klux Klan respond to the civil rights movement in the 1950s?',
      a: 'With terror and violence, including firebombing Black churches and homes, beatings, and assassinations.',
    },
    {
      term: 'Dixiecrats',
      definition:
        "Conservative Southern Democratic politicians who vigorously defended white supremacy, states' rights, and racial segregation against federal intervention.",
      q: 'Who were the Dixiecrats?',
      a: "Southern Democrats who opposed civil rights legislation and fought to maintain racial segregation and states' rights.",
    },
    {
      term: 'Civil Rights Act of 1957',
      definition:
        'The first federal civil rights legislation since Reconstruction, creating the Civil Rights Division in the Justice Department, though weakened by Southern filibusters.',
      q: 'What did the Civil Rights Act of 1957 achieve?',
      a: 'It established the US Civil Rights Commission and a Justice Department Civil Rights Division, though its voting enforcement was weak.',
    },
    {
      term: 'Filibuster',
      definition:
        "A parliamentary tactic in the US Senate where opponents deliver marathon speeches (such as Strom Thurmond's 24-hour speech) to delay and dilute civil rights bills.",
      q: 'How was the filibuster used against civil rights legislation?',
      a: 'Southern senators delivered marathon speeches to block votes and force compromises that weakened civil rights bills.',
    },
  ],

  lesson_2_1: [
    {
      term: 'Greensboro Sit-Ins (1960)',
      definition:
        "The non-violent protest initiated on 1 February 1960 by four Black college students at Woolworth's whites-only lunch counter in North Carolina, sparking sit-ins across the South.",
      q: 'What were the Greensboro sit-ins of 1960?',
      a: "Non-violent protests starting at a Woolworth's lunch counter by four students, spreading to 70,000 participants across the South.",
    },
    {
      term: 'SNCC',
      definition:
        'Student Nonviolent Coordinating Committee, founded in April 1960 by youth activists to organize grassroots student direct action and voter registration drives.',
      q: 'What was SNCC and what was its original philosophy?',
      a: 'A student-led civil rights organisation formed in 1960 focused on non-violent direct action and grassroots community organising.',
    },
    {
      term: 'Freedom Rides (1961)',
      definition:
        'Interracial bus journeys organized by CORE and SNCC through the Deep South to test federal court orders banning segregation in interstate bus terminals.',
      q: 'What was the purpose of the 1961 Freedom Rides?',
      a: 'To test and enforce Supreme Court rulings banning racial segregation in interstate bus terminals and waiting rooms.',
    },
    {
      term: 'Anniston Bus Firebombing',
      definition:
        'The violent attack on 14 May 1961 in Anniston, Alabama, where a white mob slashed tires, threw an incendiary bomb into a Freedom Rider bus, and barricaded the doors.',
      q: 'What happened to the Freedom Riders at Anniston, Alabama?',
      a: 'A white mob firebombed the Greyhound bus and beat escaping riders, shocking national and international audiences.',
    },
    {
      term: 'James Meredith & Ole Miss (1962)',
      definition:
        'The first African American student admitted to the segregated University of Mississippi in 1962, requiring 500 US marshals and federal troops after riots killed two.',
      q: 'What was the significance of James Meredith enrolling at Ole Miss in 1962?',
      a: 'It broke university segregation in Mississippi, but required President Kennedy to send 500 federal marshals and troops after deadly riots.',
    },
    {
      term: 'ICC Desegregation Order (November 1961)',
      definition:
        'The directive issued by Attorney General Robert Kennedy and the Interstate Commerce Commission strictly enforcing desegregation in all interstate travel and stations.',
      q: 'What was the outcome of the Freedom Rides?',
      a: 'The federal government issued strict regulations prohibiting segregation on interstate buses, trains, and terminal facilities.',
    },
  ],

  lesson_2_2: [
    {
      term: 'Birmingham Campaign (Project C, 1963)',
      definition:
        "A targeted direct action campaign in Birmingham, Alabama ('Bombingham') led by SCLC to confront police brutality and desegregate downtown commerce.",
      q: 'What was the Birmingham Campaign of 1963?',
      a: 'A series of marches, sit-ins, and boycotts in Alabama aimed at dismantling strict municipal segregation and police brutality.',
    },
    {
      term: "Eugene 'Bull' Connor",
      definition:
        'The notorious Birmingham Public Safety Commissioner who deployed high-pressure water hoses and police attack dogs against peaceful student marchers.',
      q: "Who was Eugene 'Bull' Connor?",
      a: "Birmingham's segregationist police chief who ordered police attack dogs and firehoses against peaceful marchers, including children.",
    },
    {
      term: "Children's Crusade (May 1963)",
      definition:
        'Over 1,000 young students who marched out of 16th Street Baptist Church; images of children bowled over by firehoses shocked international opinion.',
      q: "What was the Children's Crusade in Birmingham?",
      a: 'Marches by hundreds of school children in May 1963; television footage of police dogs and firehoses attacking them outraged the nation.',
    },
    {
      term: 'March on Washington (28 August 1963)',
      definition:
        'A massive, peaceful demonstration of over 250,000 people at the Lincoln Memorial demanding federal civil rights legislation and economic justice.',
      q: 'What took place during the March on Washington on 28 August 1963?',
      a: 'Over 250,000 Black and white Americans rallied peacefully at the Lincoln Memorial for civil rights and economic equality.',
    },
    {
      term: "'I Have a Dream' Speech",
      definition:
        "Martin Luther King Jr.'s iconic address delivered at the March on Washington, envisioning a colorblind America grounded in democratic principles and brotherhood.",
      q: "What was the core message of King's 'I Have a Dream' speech?",
      a: 'A vision of an America where people are judged by the content of their character rather than the color of their skin.',
    },
    {
      term: '16th Street Baptist Church Bombing',
      definition:
        'The KKK terrorist bombing in Birmingham on 15 September 1963 that murdered four young Black girls attending Sunday school, intensifying national pressure for reform.',
      q: 'What occurred at the 16th Street Baptist Church in September 1963?',
      a: 'A KKK bomb murdered four young Black girls in Sunday school, shocking the conscience of the nation and speeding up federal action.',
    },
  ],

  lesson_2_3: [
    {
      term: 'Freedom Summer (Mississippi 1964)',
      definition:
        'A voter registration campaign organized by SNCC and CORE that brought hundreds of Northern white student volunteers to Mississippi to register Black voters.',
      q: 'What was the goal of Freedom Summer in 1964?',
      a: 'To register Black voters and establish Freedom Schools in Mississippi, the most racially repressive state in the nation.',
    },
    {
      term: 'Murder of Chaney, Goodman, and Schwerner',
      definition:
        'Three civil rights workers abducted, murdered, and buried in an earthen dam by Klansmen and local police officers near Philadelphia, Mississippi in June 1964.',
      q: 'What was the Mississippi Burning case of 1964?',
      a: 'The murder of three civil rights workers (James Chaney, Andrew Goodman, Michael Schwerner) by KKK members and local deputies.',
    },
    {
      term: 'Mississippi Freedom Democratic Party (MFDP)',
      definition:
        'An integrated political party formed to challenge the legitimacy of the all-white, segregationist Mississippi delegation at the 1964 Democratic National Convention.',
      q: 'What was the MFDP, and who was its notable spokesperson?',
      a: 'An integrated delegation founded to challenge the all-white Mississippi party, famously championed by Fannie Lou Hamer.',
    },
    {
      term: 'Selma to Montgomery Marches (March 1965)',
      definition:
        "Three protest marches across Alabama demanding voting rights for Black citizens, who comprised 50% of Selma's population but only 1% of registered voters.",
      q: 'Why were the 1965 marches in Selma, Alabama organized?',
      a: 'To demand federal voting rights protection after local authorities systematically blocked Black residents from registering.',
    },
    {
      term: "'Bloody Sunday' at Edmund Pettus Bridge",
      definition:
        'On 7 March 1965, Alabama state troopers and mounted posse armed with clubs and tear gas brutally attacked 600 peaceful marchers on Edmund Pettus Bridge.',
      q: "What occurred on 'Bloody Sunday' (7 March 1965)?",
      a: 'Alabama state troopers brutally beat peaceful marchers crossing Edmund Pettus Bridge on live television, horrifying the American public.',
    },
    {
      term: 'Voting Rights Act of 1965',
      definition:
        'Federal legislation signed by LBJ that outlawed literacy tests and authorized federal examiners to register voters in discriminatory Southern districts.',
      q: 'What did the Voting Rights Act of 1965 achieve?',
      a: 'It banned literacy tests and sent federal registrars to Southern states, dramatically increasing Black voter registration.',
    },
  ],

  lesson_2_4: [
    {
      term: 'Civil Rights Act of 1964',
      definition:
        'Landmark federal legislation banning racial discrimination in all public accommodations, prohibiting employment discrimination, and empowering the federal government to desegregate schools.',
      q: 'What were the key provisions of the Civil Rights Act of 1964?',
      a: 'It banned discrimination in public accommodations, prohibited employment discrimination, and tied federal funding to school desegregation.',
    },
    {
      term: 'EEOC',
      definition:
        'Equal Employment Opportunity Commission, established under Title VII of the 1964 Civil Rights Act to investigate workplace and hiring discrimination.',
      q: 'What was the role of the EEOC created in 1964?',
      a: 'To investigate and enforce prohibitions against employment discrimination based on race, color, religion, sex, or national origin.',
    },
    {
      term: '24th Amendment (1964)',
      definition:
        'Constitutional amendment prohibiting the revocation of voting rights in federal elections based on failure to pay any poll tax or other tax.',
      q: 'What did the 24th Amendment accomplish?',
      a: 'It outlawed poll taxes in federal elections, removing a major financial barrier to voting for poor Black citizens.',
    },
    {
      term: "Lyndon B. Johnson's 'Great Society'",
      definition:
        "President Johnson's ambitious domestic reform program aimed at eliminating poverty and racial injustice through Medicare, Medicaid, Head Start, and education funding.",
      q: "What was Lyndon B. Johnson's 'Great Society'?",
      a: 'A sweeping series of domestic reforms to eliminate poverty, expand civil rights, and provide federal healthcare and education.',
    },
    {
      term: 'Fair Housing Act (Civil Rights Act of 1968)',
      definition:
        "Legislation passed days after MLK's assassination prohibiting racial discrimination in the sale, rental, and financing of residential housing.",
      q: 'What was prohibited by the Fair Housing Act of 1968?',
      a: 'Racial discrimination in the sale, rental, and financing of housing, targeting de facto northern residential segregation.',
    },
    {
      term: 'Shift to Economic & Northern Rights',
      definition:
        'The pivot of civil rights focus after 1965 towards addressing entrenched Northern urban problems: ghetto slums, unemployment, poverty, and police violence.',
      q: 'How did the civil rights focus shift after the 1965 Voting Rights Act?',
      a: 'It shifted from legal segregation in the South to economic inequality, substandard housing, and joblessness in northern cities.',
    },
  ],

  lesson_3_1: [
    {
      term: 'Malcolm X (El-Hajj Malik El-Shabazz)',
      definition:
        'Influential Black nationalist leader and orator who rejected integration and passive non-violence, advocating Black pride, self-defense, and self-determination.',
      q: "How did Malcolm X's approach differ from Martin Luther King Jr.'s?",
      a: 'Malcolm X rejected non-violence and racial integration, advocating Black pride, self-determination, and armed self-defense.',
    },
    {
      term: 'Nation of Islam (Black Muslims)',
      definition:
        "A religious and political organization led by Elijah Muhammad teaching that white people were 'devils' and advocating strict religious discipline and a separate Black nation.",
      q: 'What were the core beliefs of the Nation of Islam?',
      a: 'It preached Black racial supremacy, strict Islamic moral codes, self-sufficiency, and total economic and territorial separation from white America.',
    },
    {
      term: 'Black Nationalism',
      definition:
        'A political ideology emphasizing Black cultural pride, economic independence, and racial solidarity rather than assimilation into white-dominated American society.',
      q: 'What was Black Nationalism?',
      a: 'An ideology promoting Black political self-determination, economic independence, and cultural pride rather than integration.',
    },
    {
      term: "'By Any Means Necessary'",
      definition:
        "Malcolm X's famous doctrine asserting that African Americans had the moral and legal right to use self-defense against white racial violence.",
      q: "What did Malcolm X mean by advocating self-defense 'by any means necessary'?",
      a: 'That Black Americans had the right to defend themselves, including with physical force, when law enforcement failed to protect them.',
    },
    {
      term: 'Hajj to Mecca (1964)',
      definition:
        "Malcolm X's pilgrimage to Mecca in April 1964, where praying alongside Muslims of all races led him to abandon Black supremacy and embrace orthodox Islam and international human rights.",
      q: "How did Malcolm X's pilgrimage to Mecca in 1964 change his views?",
      a: 'Seeing Muslims of all races worshipping together led him to reject anti-white racial dogma and adopt a broader human rights perspective.',
    },
    {
      term: 'Assassination of Malcolm X (1965)',
      definition:
        'The assassination of Malcolm X on 21 February 1965 at the Audubon Ballroom in Manhattan by members of the Nation of Islam following his break with Elijah Muhammad.',
      q: 'When and why was Malcolm X assassinated?',
      a: 'On 21 February 1965 by Nation of Islam gunmen after he split from the group and formed the Organization of Afro-American Unity.',
    },
  ],

  lesson_3_2: [
    {
      term: 'Black Power',
      definition:
        'A militant slogan and movement popularized by Stokely Carmichael in 1966 demanding Black political empowerment, cultural pride, and community control.',
      q: "What did the slogan 'Black Power' mean when coined in 1966?",
      a: 'It demanded Black political and economic empowerment, racial pride, and control over their own institutions without white paternalism.',
    },
    {
      term: 'Stokely Carmichael',
      definition:
        "SNCC chairman who broke with non-violence during the 1966 Meredith March Against Fear, proclaiming 'What we need now is Black Power!'",
      q: 'What role did Stokely Carmichael play in the civil rights movement?',
      a: 'He shifted SNCC toward Black Power and militant separatism, expelling white members and rejecting non-violent protest.',
    },
    {
      term: 'Black Panther Party for Self-Defense',
      definition:
        'A revolutionary Marxist-Leninist organization founded in Oakland, California in October 1966 by Huey Newton and Bobby Seale to combat police brutality.',
      q: 'Who founded the Black Panther Party and why?',
      a: 'Huey Newton and Bobby Seale founded it in Oakland in 1966 to monitor police brutality and protect Black neighborhoods.',
    },
    {
      term: 'Ten-Point Program',
      definition:
        'The founding manifesto of the Black Panthers demanding employment, decent housing, education, an end to police brutality, and exemption from the Vietnam draft.',
      q: "What were the main demands of the Black Panthers' Ten-Point Program?",
      a: 'Freedom, full employment, decent housing, relevant education, an end to police brutality, and fair trials by Black juries.',
    },
    {
      term: 'Panther Survival Programs',
      definition:
        'Community service initiatives run by the Black Panthers, most notably the Free Breakfast for School Children Program feeding tens of thousands daily.',
      q: 'What community survival programs did the Black Panthers run?',
      a: 'Free breakfast programs for children, free health clinics, and educational classes in impoverished inner-city communities.',
    },
    {
      term: '1968 Mexico City Olympics Black Power Salute',
      definition:
        'Sprinters Tommie Smith and John Carlos raised black-gloved fists on the medal podium during the national anthem to protest racial injustice, provoking international controversy.',
      q: 'What protest occurred at the 1968 Mexico City Olympic Games?',
      a: 'Tommie Smith and John Carlos gave the Black Power salute on the medal podium to protest racial inequality in America.',
    },
  ],

  lesson_3_3: [
    {
      term: 'Watts Riots (August 1965)',
      definition:
        'Six days of violent urban rebellion in the Watts district of Los Angeles triggered by police mistreatment, resulting in 34 deaths, 1,000 injuries, and $40 million in damage.',
      q: 'What caused the Watts Riots in Los Angeles in August 1965?',
      a: 'Simmering anger over police harassment, high unemployment, and miserable ghetto housing erupted after an aggressive traffic arrest.',
    },
    {
      term: "'Long, Hot Summers' (1965–1967)",
      definition:
        'A wave of over 150 race riots that erupted in northern and western industrial cities (such as Newark and Detroit in 1967), exposing deep racial divisions outside the South.',
      q: "What were the 'Long, Hot Summers' of 1965–1967?",
      a: 'Outbreaks of violent urban rioting across dozens of northern cities including Detroit and Newark, fueled by poverty and police brutality.',
    },
    {
      term: 'Kerner Commission Report (1968)',
      definition:
        "President Johnson's investigative commission that concluded white racism was the primary cause of urban riots, warning the nation was 'moving toward two societies, one black, one white—separate and unequal'.",
      q: 'What was the conclusion of the 1968 Kerner Commission Report?',
      a: 'It blamed white racism for ghetto poverty and police abuse, famously warning America was dividing into two separate and unequal societies.',
    },
    {
      term: 'Urban Ghetto Conditions',
      definition:
        'Severe socioeconomic disadvantages facing northern Black urban populations: decaying tenement housing, underfunded schools, discriminatory redlining, and structural joblessness.',
      q: 'What underlying grievances caused urban unrest in northern cities?',
      a: 'Substandard housing, high Black youth unemployment, commercial exploitation, and hostile white police forces.',
    },
    {
      term: 'Detroit Riot of 1967',
      definition:
        'One of the deadliest urban rebellions in US history, lasting five days after police raided an unlicensed bar, requiring 82nd Airborne troops and resulting in 43 deaths.',
      q: 'How severe was the 1967 Detroit rebellion?',
      a: '43 people were killed, over 1,000 injured, and 7,000 arrested, requiring federal army tanks and paratroopers to suppress.',
    },
    {
      term: "White Backlash ('Law and Order')",
      definition:
        "The political reaction among white suburban voters who blamed civil rights militants and rioters for disorder, leading to Richard Nixon's 'law and order' presidential victory in 1968.",
      q: 'How did white suburban Americans react to the urban riots?',
      a: "With a conservative backlash demanding strict 'law and order', turning against civil rights funding and electing Richard Nixon.",
    },
  ],

  lesson_3_4: [
    {
      term: "Poor People's Campaign (1968)",
      definition:
        "Martin Luther King Jr.'s final ambitious multiracial initiative to demand an Economic Bill of Rights, living wages, and federal anti-poverty legislation.",
      q: "What was the goal of King's Poor People's Campaign in 1968?",
      a: 'To unite poor Americans of all races to demand federal guarantees for jobs, affordable housing, and living incomes.',
    },
    {
      term: 'Assassination of Martin Luther King Jr.',
      definition:
        'The shooting of Martin Luther King Jr. on the balcony of the Lorraine Motel in Memphis, Tennessee on 4 April 1968 by white segregationist James Earl Ray.',
      q: 'When and where was Martin Luther King Jr. assassinated?',
      a: 'On 4 April 1968 at the Lorraine Motel in Memphis, Tennessee, while supporting striking Black sanitation workers.',
    },
    {
      term: '1968 Post-Assassination Riots',
      definition:
        "Outbreaks of grief, fury, and violent rioting in over 100 American cities (including Washington, Chicago, and Baltimore) immediately following King's assassination.",
      q: "How did American cities respond to Martin Luther King's assassination?",
      a: 'Violent rebellions broke out in more than 100 cities, requiring 45,000 National Guard troops to restore order.',
    },
    {
      term: 'Civil Rights Act of 1968 (Fair Housing)',
      definition:
        "Passed by Congress six days after King's murder as a tribute to his legacy, prohibiting racial and religious discrimination in housing sales and rentals.",
      q: "What legislation was passed immediately following King's assassination?",
      a: 'The Civil Rights Act of 1968, which outlawed discrimination in the sale, financing, and rental of housing.',
    },
    {
      term: 'Splintering of the Civil Rights Movement',
      definition:
        'The loss of unified national leadership and ideological fractures between non-violent assimilationists (SCLC, NAACP) and militant separatists (SNCC, Panthers).',
      q: 'Why did the civil rights coalition collapse after 1968?',
      a: 'It fractured between non-violent integrationists and militant Black Power groups, losing white moderate support and central coordination.',
    },
    {
      term: 'Long-Term Legacy of the Movement',
      definition:
        'The permanent destruction of legal segregation, enfranchisement of millions of Black voters, and rise of Black mayors and congressmen, alongside lingering economic inequality.',
      q: 'What were the lasting achievements of the Civil Rights Movement?',
      a: 'Dismantling legal segregation, securing constitutional voting protections, and expanding Black political power across America.',
    },
  ],

  lesson_4_1: [
    {
      term: 'Domino Theory',
      definition:
        "President Eisenhower's foreign policy doctrine postulating that if South Vietnam fell to communism, surrounding Southeast Asian nations would collapse like falling dominoes.",
      q: "What was the 'Domino Theory' regarding Southeast Asia?",
      a: 'The belief that if Vietnam fell to communism, neighboring countries (Laos, Cambodia, Thailand) would quickly follow.',
    },
    {
      term: 'Geneva Accords (1954) & 17th Parallel',
      definition:
        'The international peace treaty temporarily partitioning Vietnam at the 17th Parallel into communist North Vietnam (under Ho Chi Minh) and non-communist South Vietnam.',
      q: 'What did the 1954 Geneva Accords establish?',
      a: 'They divided Vietnam temporarily at the 17th Parallel and scheduled nationwide reunification elections for 1956.',
    },
    {
      term: 'Ngo Dinh Diem',
      definition:
        "The autocratic Catholic, anti-communist leader of South Vietnam who cancelled the 1956 reunification elections and violently persecuted the country's Buddhist majority.",
      q: 'Why was South Vietnamese President Ngo Dinh Diem unpopular?',
      a: 'He ran a corrupt, nepotistic regime, favoured the Catholic minority, persecuted Buddhists, and crushed political opposition.',
    },
    {
      term: 'Vietcong (NLF)',
      definition:
        'The National Liberation Front, a communist guerrilla army formed in 1960 in South Vietnam backed by North Vietnam to overthrow Diem and unify the country.',
      q: 'Who were the Vietcong (National Liberation Front)?',
      a: 'Communist guerrilla fighters in South Vietnam fighting with Northern support to overthrow the US-backed Saigon government.',
    },
    {
      term: 'Strategic Hamlet Program (1962)',
      definition:
        'A joint US-South Vietnamese initiative forcibly relocating rural peasants into fortified stockade villages to isolate them from Vietcong insurgents, which alienated the population.',
      q: 'Why did the Strategic Hamlet Program fail?',
      a: 'It forcibly displaced peasants from ancestral burial lands and Buddhist shrines, increasing peasant sympathy for the Vietcong.',
    },
    {
      term: 'Buddhist Crisis & Overthrow of Diem (1963)',
      definition:
        "Public self-immolations by Buddhist monks protesting Diem's oppression, leading to a US-backed military coup on 1 November 1963 in which Diem was executed.",
      q: 'What led to the overthrow of President Diem in November 1963?',
      a: 'Buddhist monks burned themselves in protest, leading the US to sanction a military coup that assassinated Diem.',
    },
  ],

  lesson_4_2: [
    {
      term: 'Gulf of Tonkin Incident (August 1964)',
      definition:
        'Reports that North Vietnamese torpedo boats attacked the US destroyer USS Maddox in international waters in the Gulf of Tonkin off North Vietnam.',
      q: 'What was the Gulf of Tonkin incident of August 1964?',
      a: 'Alleged North Vietnamese torpedo attacks on US destroyers, used by President Johnson to justify direct military intervention.',
    },
    {
      term: 'Gulf of Tonkin Resolution',
      definition:
        "A nearly unanimous congressional resolution authorising President Johnson to 'take all necessary measures' to repel armed attacks in Vietnam, effectively a blank check for war.",
      q: 'What power did the Gulf of Tonkin Resolution give President Johnson?',
      a: 'It gave the President authority to wage full-scale war in Vietnam without a formal congressional declaration of war.',
    },
    {
      term: 'Operation Rolling Thunder (1965–1968)',
      definition:
        "A sustained, three-year US aerial bombardment campaign against North Vietnam designed to destroy infrastructure, interrupt the Ho Chi Minh Trail, and break Hanoi's will.",
      q: 'What was Operation Rolling Thunder?',
      a: 'A massive, continuous bombing campaign against North Vietnamese military and supply targets from 1965 to 1968.',
    },
    {
      term: 'Landing of Ground Troops at Da Nang (March 1965)',
      definition:
        'The arrival of 3,500 US Marines at Da Nang on 8 March 1965, marking the official transformation of the US role from military advisers to direct ground combatants.',
      q: 'When did the first US combat troops arrive in South Vietnam?',
      a: 'In March 1965, when 3,500 US Marines landed at Da Nang to protect US air bases.',
    },
    {
      term: 'General William Westmoreland',
      definition:
        "The supreme commander of US forces in Vietnam who implemented a military strategy of attrition, seeking to kill enemy forces faster than they could be replaced ('body count').",
      q: "What was General Westmoreland's strategy in Vietnam?",
      a: 'A strategy of attrition using overwhelming firepower to inflict more casualties than the enemy could sustain.',
    },
    {
      term: 'The Military Draft (Selective Service)',
      definition:
        'The conscription system that drafted hundreds of thousands of young American men (average age 19) into military combat, disproportionately affecting working-class youth.',
      q: 'Why was the Vietnam military draft controversial?',
      a: 'College deferments allowed wealthier youth to avoid combat, causing working-class and minority youth to be drafted in disproportionate numbers.',
    },
  ],

  lesson_4_3: [
    {
      term: 'Guerrilla Warfare Tactics',
      definition:
        'Irregular military tactics used by the Vietcong, including hit-and-run ambushes, camouflage, booby traps (punji stakes, bouncing bettys), and vanishing into local populations.',
      q: 'What tactics did the Vietcong use against technologically superior US forces?',
      a: "Guerrilla tactics: ambushes, booby traps, close-quarters combat ('hanging onto the belts'), and fading into the local population.",
    },
    {
      term: 'Cu Chi Tunnels',
      definition:
        'An elaborate, multi-level 250-kilometre underground tunnel network containing barracks, hospitals, workshops, and command centers that protected Vietcong fighters from bombing.',
      q: 'What was the purpose of the Cu Chi tunnel network?',
      a: 'To shelter Vietcong fighters from US air strikes and artillery, store supplies, and launch surprise attacks on US bases.',
    },
    {
      term: 'Ho Chi Minh Trail',
      definition:
        'A 16,000-kilometre network of jungle paths, roads, and waterways running through neutral Laos and Cambodia used to funnel troops and supplies from North to South Vietnam.',
      q: 'Why could the US military not cut off the Ho Chi Minh Trail?',
      a: 'It passed through neutral Laos and Cambodia, was sheltered by thick jungle canopy, and was constantly repaired by 300,000 workers.',
    },
    {
      term: "Search and Destroy Missions ('Zippo Raids')",
      definition:
        'US ground combat operations where helicopters inserted troops to locate enemy forces, destroy supply caches, and burn suspected Vietcong villages to the ground.',
      q: "What were US 'Search and Destroy' missions?",
      a: 'Missions to track down enemy fighters, kill them, and burn down sympathiser villages to deny the Vietcong food and shelter.',
    },
    {
      term: 'Agent Orange (Operation Ranch Hand)',
      definition:
        'A toxic chemical defoliant containing dioxin sprayed over millions of acres of Vietnamese jungle to strip forest cover and destroy crops, causing severe birth defects and cancers.',
      q: 'What was Agent Orange and why was it used?',
      a: 'A toxic chemical herbicide sprayed over jungles to destroy foliage concealing the enemy and eradicate food crops.',
    },
    {
      term: 'Napalm',
      definition:
        'A jellied petroleum incendiary weapon dropped in canisters that adhered to human skin and burned at 1,000°C, causing devastating and fatal burn injuries.',
      q: 'What was napalm and why was it feared?',
      a: 'A sticky gasoline-based jelly weapon that burned through skin and clothing, incinerating jungle foliage and human targets.',
    },
  ],

  lesson_4_4: [
    {
      term: 'Tet Offensive (January 1968)',
      definition:
        'A massive, simultaneous surprise offensive launched by 84,000 Vietcong and NVA troops striking over 100 cities, towns, and the US Embassy during the lunar new year holiday.',
      q: 'What was the Tet Offensive (1968) and why was it a turning point?',
      a: 'A massive communist surprise assault across South Vietnam that shocked the American public and proved the war was unwinnable.',
    },
    {
      term: 'Credibility Gap & Walter Cronkite',
      definition:
        'The chasm between upbeat official US government claims and the grim reality on television; broadcaster Walter Cronkite declared the war was mired in an unwinnable stalemate.',
      q: "What was the 'credibility gap' exposed by the Tet Offensive?",
      a: 'The difference between government promises of impending victory and television images showing intense combat at the US Embassy.',
    },
    {
      term: 'My Lai Massacre (March 1968)',
      definition:
        'The massacre of 504 unarmed Vietnamese women, children, and elderly civilians by Charlie Company soldiers under Lieutenant William Calley, covered up for over a year.',
      q: 'What happened at My Lai in March 1968?',
      a: 'US soldiers under Lt. Calley slaughtered over 500 unarmed Vietnamese villagers, horrifying the public when exposed in late 1969.',
    },
    {
      term: "Nixon's 'Vietnamization'",
      definition:
        "President Richard Nixon's policy announced in 1969 to gradually withdraw US ground troops and train and equip South Vietnamese forces (ARVN) to fight their own war.",
      q: "What was Nixon's policy of 'Vietnamization'?",
      a: 'Gradually pulling US ground troops out of Vietnam while building up the South Vietnamese army to take over full combat responsibility.',
    },
    {
      term: 'Kent State Shootings (May 1970)',
      definition:
        "The killing of four unarmed university students and wounding of nine by the Ohio National Guard during campus protests against Nixon's invasion of Cambodia.",
      q: 'What occurred at Kent State University in May 1970?',
      a: 'Ohio National Guardsmen fired 67 rounds into student anti-war protesters, killing four students and triggering a national student strike.',
    },
    {
      term: 'Paris Peace Accords (1973) & Fall of Saigon (1975)',
      definition:
        'The treaty signed in January 1973 withdrawing all US forces; in April 1975, North Vietnamese tanks broke through the presidential palace gates in Saigon, reunifying Vietnam.',
      q: 'How did the Vietnam War end in 1975?',
      a: 'After US troops withdrew in 1973, North Vietnamese forces launched a final offensive capturing Saigon on 30 April 1975.',
    },
  ],
};

function backfillUsaFlashcards() {
  console.log('📦 Backfilling USA 1954–75 Flashcards (16 Lessons)...');

  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'usa.json'),
    path.join(__dirname, '..', 'data', 'usa.json'),
  ];

  let totalInjected = 0;

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l) => {
        if (USA_FLASHCARDS[l.id]) {
          l.flashcards = USA_FLASHCARDS[l.id];
          totalInjected += l.flashcards.length;
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Injected flashcards into ${fp}`);
    }
  });

  // Also update units/usa/data.js
  const unitJs = path.join(__dirname, '..', 'units', 'usa', 'data.js');
  if (fs.existsSync(unitJs)) {
    try {
      const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
      const unitObj = pubData.data || pubData;
      const jsContent = `// USA 1954–75: Conflict at Home and Abroad Unit Data\nexport const unitData = ${JSON.stringify(unitObj, null, 2)};\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
      fs.writeFileSync(unitJs, jsContent, 'utf8');
      console.log(`  ✔ Synchronized units/usa/data.js`);
    } catch (err) {
      console.warn(`  ⚠️ Could not update units/usa/data.js: ${err.message}`);
    }
  }

  console.log(`✅ USA 1954–75: Backfilled ${totalInjected / 2} flashcards across all 16 lessons.`);
}

if (require.main === module) {
  backfillUsaFlashcards();
}

module.exports = { backfillUsaFlashcards, USA_FLASHCARDS };
