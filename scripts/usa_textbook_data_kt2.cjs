/**
 * scripts/usa_textbook_data_kt2.cjs
 *
 * Component bank, primary sources, vocabulary, curated 4-Act narratives, and back-cover data for
 * Key Topic 2: Protest, Progress and Radicalism, 1960–75
 * Pearson Edexcel GCSE (9–1) History • Option 33 (1HI0/33)
 */

module.exports = function getKt2Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT2',
    topicNumber: 2,
    title: 'Protest, Progress and Radicalism, 1960–75',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 33 (1HI0/33) &bull; Key Topic 2 Synthesis',
    enquiry:
      'How did courageous direct action force landmark federal civil rights legislation, and why did the movement fracture into urban rebellion and Black Power?',
    coverImage: 'march-on-washington-crowd.jpg',
    caption:
      'Plate I: Over 250,000 Americans gather around the Lincoln Memorial Reflecting Pool during the March on Washington for Jobs and Freedom (28 August 1963).',
    specTopics: [
      {
        num: 1,
        title: '1. Direct Action Campaigns, 1960–62',
        bullets: [
          "Greensboro sit-ins (1960), Woolworth's lunch counters, and the founding of SNCC.",
          'The Freedom Riders (1961): CORE, bus firebombing at Anniston, and Attorney General Robert Kennedy.',
          'The James Meredith case at the University of Mississippi ("Ole Miss", 1962) and federal marshals.',
        ],
      },
      {
        num: 2,
        title: '2. Peaceful Protests & Landmark Acts, 1963–65',
        bullets: [
          'Birmingham campaign (1963): "Project C", Police Chief Eugene "Bull" Connor, fire hoses, and attack dogs.',
          'March on Washington (Aug 1963): 250,000 marchers and Dr King\'s "I Have a Dream" address.',
          'Freedom Summer (1964), the Mississippi murders, Civil Rights Act (1964), Selma (1965), and Voting Rights Act (1965).',
        ],
      },
      {
        num: 3,
        title: '3. Malcolm X & Black Power, 1963–70',
        bullets: [
          'Malcolm X: Nation of Islam, rejection of non-violence, break with Elijah Muhammad, and assassination (1965).',
          'Emergence of Black Power: Stokely Carmichael, the Meredith March, and the 1968 Mexico City Olympics salute.',
          'Black Panther Party for Self-Defense: Huey Newton, Bobby Seale, armed patrols, and community survival programs.',
        ],
      },
      {
        num: 4,
        title: '4. Urban Rebellion & Fracturing Movement, 1965–75',
        bullets: [
          'Urban ghetto riots: Watts (1965), Detroit and Newark (1967), and the 1968 Kerner Commission Report.',
          'King’s Northern campaign in Chicago (1966) confronting de facto housing and economic segregation.',
          'Assassination of Dr Martin Luther King Jr. (4 April 1968), nationwide uprisings, and progress by 1975.',
        ],
      },
    ],
  };

  const USA_COMPONENT_BANK = {
    // Page 3: KT 2.1 (Direct Action: Sit-ins, Freedom Rides, Ole Miss)
    p3: {
      keyFigure: {
        name: 'James Meredith',
        lifespan: 'Born 1933',
        role: 'US Air Force Veteran & Civil Rights Pioneer',
        significance:
          'Broke racial apartheid in Southern higher education by defying violent mob fury to desegregate the University of Mississippi in 1962.',
        actions: [
          'Applied to the all-white University of Mississippi in 1961, supported by the NAACP Legal Defense Fund.',
          'Secured a binding Fifth Circuit federal court order mandating his admission under the 14th Amendment.',
          'Enrolled on 1 October 1962 accompanied by 500 US Marshals following a deadly riot that left two civilians dead and 300 injured.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/james_meredith.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">TACTICAL MECHANISM: DIRECT ACTION</span>
            <span class="csb-category">STUDENT MOBILISATION &bull; 1960–1961</span>
          </div>
          <h4 class="csb-title">Confronting Federal Authority through Crisis Creation</h4>
          <div class="csb-body">
            Direct action pioneered by <strong>CORE</strong> and <strong>SNCC</strong> was deliberately designed to create visible, uncontrollable crises that forced a reluctant federal government to intervene. The <strong>Freedom Rides of 1961</strong> tested Supreme Court rulings desegregating interstate transit. When white mobs in Anniston and Birmingham firebombed buses and beat riders with iron pipes, Attorney General Robert F. Kennedy had no choice but to deploy federal marshals and petition the Interstate Commerce Commission (ICC) to enforce total desegregation.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Non-violent direct action exposed the federal government's reluctance to act, proving that Southern white authorities would only respect civil rights rulings when forced by federal executive coercion.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '1 Feb 1960',
          title: 'Greensboro Sit-in',
          text: "Four Black college students sit at Woolworth's segregated lunch counter, sparking nationwide sit-in wave.",
        },
        {
          date: '4 May 1961',
          title: 'Freedom Rides Depart',
          text: 'Interracial group rides Greyhound buses into Deep South; violently attacked at Anniston and Birmingham.',
        },
        {
          date: '1 Nov 1961',
          title: 'ICC Enforces Integration',
          text: 'Federal Interstate Commerce Commission outlaws segregation on all interstate buses and terminals.',
        },
        {
          date: '30 Sept 1962',
          title: 'Battle of Ole Miss',
          text: 'Deadly riot erupts at University of Mississippi; President Kennedy deploys 31,000 federal soldiers.',
        },
      ],
    },

    // Page 5: KT 2.2 (Birmingham, Washington, Selma & Landmark Acts)
    p5: {
      keyFigure: {
        name: 'President Lyndon B. Johnson',
        lifespan: '1908–1973',
        role: '36th President of the United States (1963–1969)',
        significance:
          'Deployed unparalleled legislative mastery to pass the monumental Civil Rights Act of 1964 and Voting Rights Act of 1965.',
        actions: [
          "Seized the national moral shock following JFK's assassination to demand passage of the Civil Rights Act as Kennedy's living memorial.",
          'Broke a 54-day filibuster staged by 18 Southern Democratic senators to sign the Civil Rights Act on 2 July 1964.',
          'Addressed a joint session of Congress after Selma, uttering the movement\'s anthem: "And we shall overcome," signing the Voting Rights Act.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/johnson.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">LEGISLATIVE MILESTONE: STATUTORY REFORM</span>
            <span class="csb-category">FEDERAL LEGISLATION &bull; 1964–1965</span>
          </div>
          <h4 class="csb-title">The Death of Jim Crow: The 1964 and 1965 Acts</h4>
          <div class="csb-body">
            The <strong>Civil Rights Act of 1964</strong> formally dismantled legal segregation across the United States. It outlawed discrimination in public accommodations, employment, and federally funded programs, creating the Equal Employment Opportunity Commission (EEOC). The <strong>Voting Rights Act of 1965</strong> abolished discriminatory literacy tests and gave federal examiners power to register voters in discriminatory counties. Within three years, Black voter registration in Mississippi jumped from under 7% to over 60%.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Together, these acts destroyed the legal architecture of Southern apartheid and transformed Black Americans from disenfranchised subjects into an influential national electoral bloc.
          </div>
        </div>
      `,
      timeline: [
        {
          date: 'May 1963',
          title: "Birmingham Children's Crusade",
          text: 'Bull Connor uses high-pressure fire hoses and dogs on young protesters; televised horror shocks nation.',
        },
        {
          date: '28 Aug 1963',
          title: 'March on Washington',
          text: '250,000 march for Jobs and Freedom; Dr King delivers iconic "I Have a Dream" speech.',
        },
        {
          date: '2 July 1964',
          title: 'Civil Rights Act of 1964',
          text: 'President Johnson signs historic bill outlawing public segregation and employment discrimination.',
        },
        {
          date: '7 March 1965',
          title: 'Bloody Sunday at Selma',
          text: 'State troopers violently beat peaceful voting rights marchers crossing Edmund Pettus Bridge.',
        },
      ],
    },

    // Page 7: KT 2.3 (Malcolm X, Black Power & Black Panthers)
    p7: {
      keyFigure: {
        name: 'Malcolm X (El-Hajj Malik El-Shabazz)',
        lifespan: '1925–1965',
        role: 'Spokesman for the Nation of Islam & Revolutionary Black Nationalist',
        significance:
          'Challenged non-violent integrationism, articulating the righteous anger of Northern urban Black Americans and championing self-defence.',
        actions: [
          'Served as national spokesman for the Nation of Islam, expanding membership from 500 to over 30,000 through fiery oratory.',
          'Condemned non-violent pacifism as psychological enslavement, advocating self-defence: "by any means necessary".',
          'Founded the Organization of Afro-American Unity (OAAU) in 1964 following his pilgrimage to Mecca, building global anti-colonial alliances.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/malcolm_x.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">RADICAL IDEOLOGY: BLACK POWER</span>
            <span class="csb-category">COMMUNITY EMPOWERMENT &bull; 1966–1970</span>
          </div>
          <h4 class="csb-title">Self-Reliance, Racial Pride &amp; The Black Panthers</h4>
          <div class="csb-body">
            Popularized by <strong>Stokely Carmichael</strong> in June 1966, <em>"Black Power"</em> marked a decisive break from the integrationist goals of the early movement. In October 1966, Huey P. Newton and Bobby Seale formed the <strong>Black Panther Party for Self-Defense</strong> in Oakland, California. Armed with shotguns and law books, Panthers monitored police brutality while establishing revolutionary community survival programs: free breakfast for 20,000 children daily, free medical clinics, and education centers.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> Black Power shifted the focus from legal integration to economic self-determination, cultural pride, and armed resistance against structural police violence in Northern and Western cities.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '21 Feb 1965',
          title: 'Assassination of Malcolm X',
          text: 'Malcolm X assassinated in Manhattan while addressing the Organization of Afro-American Unity.',
        },
        {
          date: '16 June 1966',
          title: 'Black Power Slogan Coined',
          text: 'Stokely Carmichael electrifies crowd during the Meredith March in Greenwood, Mississippi.',
        },
        {
          date: '15 Oct 1966',
          title: 'Black Panther Party Founded',
          text: 'Huey P. Newton and Bobby Seale establish Panther party in Oakland; publish Ten-Point Platform.',
        },
        {
          date: '16 Oct 1968',
          title: 'Black Power Olympic Salute',
          text: 'Tommie Smith and John Carlos raise black-gloved fists on medal podium at Mexico City Olympics.',
        },
      ],
    },

    // Page 9: KT 2.4 (Urban Riots, Kerner Report & MLK Assassination)
    p9: {
      keyFigure: {
        name: 'Dr Martin Luther King Jr.',
        lifespan: '1929–1968',
        role: 'President of the SCLC & Moral Leader of the Civil Rights Movement',
        significance:
          'Expanded his moral crusade beyond Southern legal desegregation to confront Northern economic racism, the Vietnam War, and poverty.',
        actions: [
          'Launched the Chicago Freedom Movement in 1966, moving into a slum tenement to highlight discriminatory housing and redlining.',
          'Delivered his courageous "Beyond Vietnam" speech at Riverside Church in April 1967, condemning the war as a moral catastrophe.',
          'Organized the Poor People’s Campaign before being assassinated on the balcony of the Lorraine Motel in Memphis on 4 April 1968.',
        ],
        image: getBase64Image('units/usa/assets/sources/portraits/mlk.jpg'),
      },
      conceptSpotlight: `
        <div class="concept-spotlight-box">
          <div class="csb-header">
            <span class="csb-tag">HISTORIOGRAPHICAL VERDICT: STRUCTURAL RACISM</span>
            <span class="csb-category">THE KERNER COMMISSION &bull; 1968</span>
          </div>
          <h4 class="csb-title">"Two Societies: One Black, One White—Separate and Unequal"</h4>
          <div class="csb-body">
            Following violent urban uprisings in Detroit and Newark that claimed over 60 lives in July 1967, President Johnson appointed Governor Otto Kerner to investigate the causes. The 1968 <strong>Kerner Report</strong> issued an uncompromising verdict: the root cause of urban rebellion was not criminal agitators, but institutional white racism that trapped Black citizens in squalid ghettos with substandard schools, joblessness, and brutal policing. The commission warned that America was dividing into two permanently polarized societies.
          </div>
          <div class="csb-takeaway">
            <strong>Strategic Legacy:</strong> The Kerner Report exposed the limits of legal desegregation: the Civil Rights Acts ended Southern Jim Crow, but failed to dismantle the deep economic segregation of Northern and Western urban metropolises.
          </div>
        </div>
      `,
      timeline: [
        {
          date: '11 Aug 1965',
          title: 'Watts Uprising, Los Angeles',
          text: 'Six-day urban rebellion leaves 34 dead and 1,000 buildings damaged; marks shift to Northern grievances.',
        },
        {
          date: 'July 1967',
          title: 'Detroit & Newark Riots',
          text: 'Massive urban rebellion in Detroit leaves 43 dead; US Army tanks deployed to restore order.',
        },
        {
          date: '29 Feb 1968',
          title: 'Kerner Report Published',
          text: 'Official commission condemns white racism and warns of permanent economic division in America.',
        },
        {
          date: '4 April 1968',
          title: 'Assassination of Dr King',
          text: 'King murdered in Memphis, Tennessee; uprisings erupt in over 100 cities; Fair Housing Act signed.',
        },
      ],
    },
  };

  const leftSources = {
    p2: {
      sourceA: {
        title: 'Source A: The Greensboro Four at the Woolworth’s Lunch Counter',
        type: 'Archival Photograph &bull; Jack Moebes, Greensboro News & Record',
        date: '1 February 1960',
        image: getBase64Image('units/usa/assets/sources/greensboro-sit-in-counter.jpg'),
        quote:
          'Four North Carolina A&T freshmen peacefully seated at the whites-only lunch counter.',
        context:
          "Ezell Blair Jr., David Richmond, Franklin McCain, and Joseph McNeil sit quietly at the segregated Woolworth's lunch counter in Greensboro, North Carolina. After being denied service, they remained seated until store closing, sparking a nationwide sit-in wave involving 70,000 students.",
        hingeQuestion:
          'How did student-led non-violent sit-ins fundamentally change the speed and tactical nature of the civil rights movement?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Freedom Rider James Peck on the Birmingham Bus Ambush (1961)',
        type: 'Eyewitness Primary Testimony &bull; CORE Archive Record',
        date: '14 May 1961',
        quote:
          'When the bus arrived at the Birmingham depot, an armed white mob was waiting with iron pipes, chains, and baseball bats. There were no police in sight. As soon as we stepped into the terminal, they surged forward, knocking us to the concrete floor and beating us unconscious while bystanders cheered.',
        context:
          'From CORE activist James Peck’s sworn statement describing the horrific mob ambush in Birmingham, where local police under Bull Connor intentionally delayed intervening for fifteen minutes to allow Klan violence.',
        hingeQuestion:
          'How does Peck’s account demonstrate the complicity of local Southern law enforcement in orchestrating white supremacist violence against peaceful protesters?',
      },
    },
    p4: {
      sourceA: {
        title: 'Source A: Police Attack Dogs Turned on Protesters in Birmingham',
        type: 'Archival Photograph &bull; Bill Hudson, Associated Press',
        date: '3 May 1963',
        image: getBase64Image('units/usa/assets/sources/birmingham-protests-dogs-1963.jpg'),
        quote:
          'Police dog lunges at high school student Walter Gadsden during Birmingham demonstrations.',
        context:
          'Under the orders of Public Safety Commissioner Eugene "Bull" Connor, Birmingham police unleashed German Shepherd attack dogs and high-pressure fire hoses—capable of stripping bark from trees—on peaceful teenage marchers during "Project C".',
        hingeQuestion:
          "How did Bull Connor's extreme violent overreaction in Birmingham become a decisive tactical asset for Dr King's campaign?",
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: Dr Martin Luther King Jr., "Letter from Birmingham Jail" (1963)',
        type: 'Prison Manuscript &bull; SCLC Historical Archive',
        date: '16 April 1963',
        quote:
          'For years now I have heard the word "Wait!" It rings in the ear of every Negro with piercing familiarity. This "Wait" has almost always meant "Never." We must come to see, with one of our distinguished jurists, that justice too long delayed is justice denied.',
        context:
          'Written by King on scraps of newspaper margins while held in solitary confinement in Birmingham city jail, rebuking moderate white clergymen who urged him to cease non-violent direct action.',
        hingeQuestion:
          'Why did King argue that non-violent crisis creation was morally necessary to compel municipal authorities to negotiate desegregation?',
      },
    },
    p6: {
      sourceA: {
        title: 'Source A: Malcolm X Addressing a Harlem Street Rally',
        type: 'Press Photograph &bull; Bob Parent / Getty Archive',
        date: 'c. 1963',
        image: getBase64Image('units/usa/assets/sources/malcolm-x-speaking.jpg'),
        quote: 'We want freedom by any means necessary. We want justice by any means necessary.',
        context:
          'Malcolm X addressing thousands of supporters in Harlem. Disillusioned with the slow legalism of the NAACP and Southern Christian non-violence, Malcolm urged African Americans to defend themselves against white vigilantes and reclaim their cultural heritage.',
        hingeQuestion:
          "Why did Malcolm X's rejection of non-violence resonate so powerfully among working-class Black Americans in Northern urban centres?",
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: The Black Panther Party Ten-Point Platform (October 1966)',
        type: 'Foundational Manifesto &bull; Black Panther Party for Self-Defense',
        date: '15 October 1966',
        quote:
          '1. We want freedom. We want power to determine the destiny of our Black Community. 2. We want full employment for our people... 7. We want an immediate end to POLICE BRUTALITY and MURDER of Black people... 10. We want land, bread, housing, education, clothing, justice and peace.',
        context:
          'Drafted by Huey P. Newton and Bobby Seale in Oakland, California, outlining the core ideological, social, and anti-capitalist demands of the Black Panther Party.',
        hingeQuestion:
          'How does the Panther Ten-Point Platform reflect a fundamental ideological evolution from Southern civil rights to radical Northern economic self-determination?',
      },
    },
    p8: {
      sourceA: {
        title: 'Source A: National Guardsmen Patrol Devastated Detroit Streets',
        type: 'Press Photograph &bull; Detroit News / Associated Press',
        date: '25 July 1967',
        image: getBase64Image('units/usa/assets/sources/detroit-riot-guard-1967.jpg'),
        quote:
          'Armed soldiers patrol smouldering ruins of commercial buildings along 12th Street, Detroit.',
        context:
          'Following a police raid on an unlicensed drinking club in a Black neighbourhood, five days of devastating urban rioting erupted in Detroit. 43 people were killed, over 1,000 injured, and 2,000 buildings destroyed before federal paratroopers restored order.',
        hingeQuestion:
          'What does the scale of urban destruction in Detroit reveal about the failure of federal civil rights laws to address economic inequality?',
      },
      sourceB: {
        isWritten: true,
        title: 'Source B: The Kerner Commission on Institutional White Racism (1968)',
        type: 'Official Presidential Report &bull; US Government Printing Office',
        date: '29 February 1968',
        quote:
          'This is our basic conclusion: Our nation is moving toward two societies, one black, one white—separate and unequal. What white Americans have never fully understood—but what the Negro can never forget—is that white society is deeply implicated in the ghetto. White institutions created it, white institutions maintain it, and white society condones it.',
        context:
          'From the official investigative report commissioned by President Lyndon B. Johnson following catastrophic urban uprisings across American cities in the "Long Hot Summer" of 1967.',
        hingeQuestion:
          'Why did the Kerner Commission place direct blame for urban rebellion upon white institutional racism rather than individual criminal lawlessness?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Sit-in Movement:',
        def: 'Direct action tactic beginning at Greensboro in 1960 where activists peacefully occupied segregated lunch counters until arrested.',
      },
      {
        term: 'SNCC:',
        def: 'Student Nonviolent Coordinating Committee; formed in 1960 to organize youth-led civil disobedience and voter registration in the Deep South.',
      },
      {
        term: 'Freedom Riders (1961):',
        def: 'Interracial activists who rode interstate buses across the Deep South to challenge illegal bus depot segregation, enduring violent mob attacks.',
      },
      {
        term: 'Anniston Bus Bombing:',
        def: "Ku Klux Klan terror attack on 14 May 1961 where a Freedom Riders' bus was firebombed and passengers beaten as they fled.",
      },
      {
        term: 'James Meredith:',
        def: 'Air Force veteran who enrolled as the first Black student at Ole Miss in 1962, requiring 31,000 federal troops to overcome violent riots.',
      },
    ],
    p4: [
      {
        term: 'Project C (Birmingham 1963):',
        def: 'SCLC direct action campaign ("C" for Confrontation) using economic boycotts and marches to force desegregation in Alabama.',
      },
      {
        term: 'Bull Connor:',
        def: 'Notorious Birmingham Public Safety Commissioner who directed police dogs and high-pressure fire hoses against teenage protesters.',
      },
      {
        term: 'March on Washington (1963):',
        def: 'Massive peaceful demonstration of 250,000 Americans demanding civil rights legislation, headlined by King\'s "I Have a Dream" speech.',
      },
      {
        term: 'Civil Rights Act of 1964:',
        def: 'Landmark federal law that permanently outlawed racial discrimination in public accommodations, schools, and employment.',
      },
      {
        term: 'Voting Rights Act of 1965:',
        def: 'Federal legislation abolishing literacy tests and authorizing federal examiners to supervise voter registration across the Deep South.',
      },
    ],
    p6: [
      {
        term: 'Nation of Islam:',
        def: 'African American religious movement led by Elijah Muhammad advocating Black separatism, self-reliance, and rejection of integration.',
      },
      {
        term: 'Malcolm X:',
        def: 'Charismatic Black nationalist leader who advocated militant self-defence against white violence before moderating his views in 1964.',
      },
      {
        term: 'Black Power:',
        def: 'Militant slogan coined by Stokely Carmichael in 1966 urging Black pride, independent political mobilization, and economic autonomy.',
      },
      {
        term: 'Black Panther Party:',
        def: 'Marxist-Leninist Black nationalist organization founded in Oakland in 1966 by Huey Newton and Bobby Seale to counter police brutality.',
      },
      {
        term: '1968 Olympics Salute:',
        def: 'Iconic protest by sprinters Tommie Smith and John Carlos raising black-gloved fists on the medal podium in Mexico City.',
      },
    ],
    p8: [
      {
        term: 'Watts Riots (1965):',
        def: 'Massive six-day urban uprising in Los Angeles resulting in 34 deaths and $40 million in damages, sparked by systemic police brutality.',
      },
      {
        term: 'Kerner Commission (1968):',
        def: 'Presidential inquiry concluding that urban riots were caused by institutional white racism, warning America was dividing into two unequal societies.',
      },
      {
        term: 'De Facto Segregation:',
        def: 'Informal, unwritten racial segregation resulting from residential housing discrimination, redlining, and systemic poverty rather than law.',
      },
      {
        term: 'Chicago Freedom Movement (1966):',
        def: "Dr King's northern campaign challenging discriminatory housing and real estate redlining, met with vicious white mob violence.",
      },
      {
        term: 'Civil Rights Act of 1968:',
        def: "The Fair Housing Act; banned racial discrimination in the sale, rental, and financing of residential housing, signed after King's death.",
      },
    ],
  };

  /**
   * Curated Christine Counsell 4-Act Narrative Enquiries (Strict Word Budget & Layout Balanced)
   */
  const narratives = {
    enquiry1: {
      act1: {
        title: 'Act 1: The Greensboro Spark & the Student Nonviolent Movement',
        text: `**The Greensboro Lunch Counter Sit-Ins:** On 1 February 1960, four Black freshmen from North Carolina A&T College—Ezell Blair Jr., Franklin McCain, Joseph McNeil, and David Richmond—walked into the Woolworth's department store in downtown Greensboro, purchased sundries, and sat at the whites-only lunch counter. Refused service, they remained politely seated until the store closed. The following morning, they returned with twenty additional students. Within five days, over 300 students occupied local counters. The tactic caught fire across the South: by August 1960, over 70,000 Black and white students had participated in sit-ins across dozens of cities, leading to more than 3,000 arrests but successfully integrating over 100 lunch counters.

**The Founding of the Student Nonviolent Coordinating Committee (SNCC):** In April 1960, legendary SCLC activist Ella Baker organized a conference of young activists at Shaw University in Raleigh, North Carolina. Baker warned the students against being subsumed under the cautious, minister-dominated hierarchy of Dr Martin Luther King Jr.'s SCLC. The students formed the Student Nonviolent Coordinating Committee (SNCC), committed to grassroots participatory democracy and aggressive non-violent civil disobedience. SNCC transformed the civil rights movement from occasional legal challenges into an unrelenting, youth-driven daily confrontation against Southern white supremacy.`,
      },
      act2: {
        title: 'Act 2: The Freedom Rides of 1961 & the Crisis of Interstate Transit',
        text: `**Testing the Law: The CORE Freedom Rides:** Although the Supreme Court had outlawed segregation in interstate bus terminals in *Boynton v. Virginia* (1960), Southern bus companies and municipal police routinely ignored federal law. On 4 May 1961, James Farmer, director of the Congress of Racial Equality (CORE), launched the "Freedom Rides". Interracial groups boarded Greyhound and Trailways buses in Washington, D.C., bound for New Orleans, determined to deliberately test whether Southern authorities would enforce federal transit desegregation.

**Firebombs and Savage Violence in Alabama:** On Mother's Day, 14 May 1961, the Greyhound bus was intercepted outside Anniston, Alabama, by an armed Ku Klux Klan mob. White vigilantes slashed the tires, firebombed the vehicle, and held the doors shut to roast the riders alive; the activists barely escaped through smoke and shattered windows, only to be brutally beaten with iron pipes. An hour later, riders on the Trailways bus arrived at Birmingham, where Public Safety Commissioner Eugene "Bull" Connor gave Klan thugs fifteen unhindered minutes to beat the riders unconscious. Graphic press photographs of the smouldering wreckage shocked the international community.`,
      },
      act3: {
        title: 'Act 3: Federal Intervention and the Battle of "Ole Miss"',
        text: `**Robert Kennedy and the Interstate Commerce Commission:** The savagery in Alabama created an acute foreign policy dilemma for President John F. Kennedy, who was preparing for a high-stakes summit in Vienna with Soviet Premier Nikita Khrushchev. Attorney General Robert F. Kennedy deployed 400 federal marshals to protect riders in Montgomery and petitioned the Interstate Commerce Commission (ICC). On 1 November 1961, the ICC issued strict regulations mandating the removal of all racial signs in bus terminals and stations, representing a clear operational victory for non-violent direct action.

**The Insurrection at the University of Mississippi (1962):** Direct action soon expanded to Southern university campuses. In September 1962, James Meredith, an Air Force veteran, attempted to enrol as the first Black student at the University of Mississippi ("Ole Miss"), backed by a federal court order. Mississippi Governor Ross Barnett personally blocked Meredith at the registrar's office. When 500 federal marshals escorted Meredith onto campus on 30 September, a furious white mob of 2,500 attacked them with firearms, petrol bombs, and acid. Two civilians were killed and 300 marshals injured before President Kennedy federalized the state guard and sent 31,000 soldiers to restore order. Meredith enrolled the following morning under military guard.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Tactical Coercion of Federal Authority',
        text: `**Exposing Federal Reluctance Through Direct Confrontation:** The campaigns of 1960–62 demonstrated that moral persuasion alone could never dismantle Southern segregation. Both the Eisenhower and early Kennedy administrations had sought to avoid antagonizing powerful Southern segregationist committee chairmen in Congress. By creating public crises that Southern police met with barbaric violence, student activists deliberately forced federal executive intervention, transforming civil rights from a state issue into an inescapable federal constitutional duty.

**A Hardened Generation of Grassroots Leaders:** These early direct-action campaigns forged a new cohort of battle-tested leaders, including John Lewis, Diane Nash, and James Farmer. While legal victories established theoretical rights, it was the courage of ordinary students sitting at lunch counters and boarding firebombed buses that made those rights real. By the close of 1962, the civil rights movement had established the tactical template that would shatter Southern Jim Crow forever in the climactic battles of Birmingham and Selma.`,
      },
    },

    enquiry2: {
      act1: {
        title: "Act 1: Project C in Birmingham: Confronting Bull Connor's Terror",
        text: `**Targeting the Citadel of Southern Segregation:** In April 1963, Dr Martin Luther King Jr., the SCLC, and local leader Rev. Fred Shuttlesworth launched "Project C" (for Confrontation) in Birmingham, Alabama—widely regarded as the most segregated city in America. Recognizing that municipal desegregation required severe economic pressure, activists targeted downtown department stores with sit-ins and boycotts. Birmingham's notorious Commissioner of Public Safety, Eugene "Bull" Connor, responded with mass arrests, imprisoning King on Good Friday. While incarcerated, King wrote his famous *Letter from Birmingham Jail*, declaring that "justice too long delayed is justice denied."

**The Children's Crusade and Televised Brutality:** Facing dwindling adult volunteers fearful of losing their jobs, SCLC organizer James Bevel recruited thousands of school students. On 2 and 3 May 1963, over a thousand young marchers poured out of the 16th Street Baptist Church. Connor unleashed snarling police dogs and commanded firefighters to blast the children with high-pressure fire hoses that tore clothes and rolled youths down the asphalt. Televised images of children being mauled by police dogs horrified the nation and forced white business leaders to agree to a desegregation pact on 10 May.`,
      },
      act2: {
        title: 'Act 2: The March on Washington & the Battle for the Civil Rights Act',
        text: `**The Historic March on Washington for Jobs and Freedom:** Emboldened by Birmingham, civil rights leaders organized the March on Washington on 28 August 1963. Over 250,000 Americans—nearly a quarter of them white—gathered peacefully at the Lincoln Memorial. The event climaxed with Dr King's iconic "I Have a Dream" address, which framed the freedom struggle within the grand promise of the American Declaration of Independence. The march demonstrated unprecedented interracial unity and exerted immense moral pressure on the Kennedy administration to enact comprehensive federal legislation.

**Lyndon B. Johnson and the Civil Rights Act of 1964:** Following Kennedy's assassination in November 1963, President Lyndon B. Johnson threw his immense legislative mastery behind the stalled civil rights bill. Defying Southern Democrats who staged a grueling 54-day Senate filibuster, Johnson signed the landmark Civil Rights Act on 2 July 1964. The Act delivered the death blow to Jim Crow: it outlawed racial discrimination in public accommodations, prohibited employment discrimination via the Equal Employment Opportunity Commission (EEOC), and empowered the Justice Department to sue non-compliant school boards.`,
      },
      act3: {
        title: 'Act 3: Bloody Sunday at Selma & the Voting Rights Revolution',
        text: `**The Struggle for the Southern Ballot:** Despite the 1964 Act, Southern Black citizens remained systematically disenfranchised. In early 1965, the SCLC joined SNCC in Selma, Alabama, where fewer than 2% of eligible Black adults were registered to vote. On Sunday, 7 March 1965 ("Bloody Sunday"), 600 peaceful marchers led by John Lewis attempted to march fifty miles to Montgomery. As they crossed the Edmund Pettus Bridge, Alabama state troopers on horseback, armed with tear gas and billy clubs, charged into the unarmed crowd, fracturing Lewis's skull and brutally beating marchers.

**The Voting Rights Act of 1965:** Television networks interrupted regular broadcasting to air footage of state-sanctioned savagery, triggering nationwide outrage. On 15 March, President Johnson addressed a joint session of Congress, calling Selma "a turning point in man's unending search for freedom" and concluding with the civil rights anthem: "And we shall overcome." On 6 August 1965, Johnson signed the Voting Rights Act. The law suspended all literacy tests and dispatched federal registrars to Southern counties. Within three years, Black voter registration in Mississippi skyrocketed from 7% to over 60%, revolutionizing Southern electoral politics.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: The Legislative Destruction of Jim Crow',
        text: `**The High-Water Mark of the Non-Violent Coalition:** Between May 1963 and August 1965, the mainstream civil rights coalition achieved its greatest constitutional and legislative triumphs. The combination of local sacrificial bravery, brilliant tactical provocation of violent white authorities, moral television imagery, and presidential political will dismantled the entire statutory architecture of Southern apartheid that had stood since Reconstruction.

**The Looming Frontier of Economic Disparity:** Yet even as President Johnson signed the Voting Rights Act, the seeds of future division were evident. Just five days later, the Watts ghetto in Los Angeles erupted in flames. Federal legislation had dismantled legal segregation in the South, but it had done almost nothing to solve the crushing problems of ghetto housing, police brutality, and entrenched economic poverty in the urban North and West. The movement's triumphant legislative era was over; an era of radical rebellion was about to begin.`,
      },
    },

    enquiry3: {
      act1: {
        title: 'Act 1: Malcolm X & the Challenge to Southern Non-Violence',
        text: `**The Voice of the Northern Ghetto:** While Dr King preached Christian love and legal integration in the rural South, millions of Black Americans in the squalid tenements of Harlem, Chicago, and Detroit experienced a very different reality. Their struggle was not against Jim Crow signs, but against *de facto* segregation, slum housing, joblessness, and white police violence. The fiery spokesman for this disillusioned urban populace was Malcolm X (born Malcolm Little), chief minister of the Nation of Islam (NOI), a religious movement led by the Honourable Elijah Muhammad.

**"By Any Means Necessary":** Malcolm X rejected King's integrationist philosophy, dismissing non-violence as a slave mentality that left Black people defenseless against white terrorism. Advocating Black nationalism, economic self-reliance, and armed self-defence, he urged African Americans to demand justice "by any means necessary." After breaking with the Nation of Islam in March 1964 and undertaking the pilgrimage to Mecca, Malcolm softened his racial separatism, embracing orthodox Islam and founding the Organization of Afro-American Unity. On 21 February 1965, he was assassinated in Manhattan by NOI gunmen, leaving a profound intellectual legacy for the rising generation.`,
      },
      act2: {
        title: 'Act 2: The Meredith March & the Cry of "Black Power"',
        text: `**The Meredith March and the Ideological Fracture:** In June 1966, James Meredith began a solo "March Against Fear" across Mississippi to encourage Black voter registration, only to be ambushed and wounded by a white gunman on the second day. Leaders of the major civil rights organizations—Dr King for the SCLC, Floyd McKissick for CORE, and newly elected chairman Stokely Carmichael for SNCC—rushed to Mississippi to continue the march. Tensions between the groups soon erupted into the open.

**Carmichael and the Birth of a Slogan:** Carmichael and younger SNCC field workers were deeply exhausted by white supremacist beatings, federal inaction, and the deaths of colleagues during the 1964 Freedom Summer. At a mass rally in Greenwood, Mississippi, after being arrested for the 27th time, Carmichael leaped onto the platform and shouted to the crowd: "We want Black Power!" The crowd roared back in thunderous unison. Black Power rejected white liberal financial backing, expelled white members from SNCC, and declared that Black Americans would build their own political and economic institutions rather than beg for admission into white society.`,
      },
      act3: {
        title: 'Act 3: The Black Panther Party: Armed Self-Defence & Survival Programs',
        text: `**Founding the Black Panther Party for Self-Defense:** In October 1966, Huey P. Newton and Bobby Seale founded the Black Panther Party in Oakland, California. Wearing distinctive black leather jackets and berets, the Panthers armed themselves with shotguns and law books, conducting armed patrols of Black neighbourhoods to monitor and deter police brutality. In May 1967, the Panthers marched fully armed into the California State Capitol in Sacramento to protest a gun control bill designed to disarm them, catapulting the party into international notoriety.

**Survival Programs and State Repression:** While demonized by the white media as violent revolutionaries, the Panthers operated extensive community "survival programs". They provided free hot breakfasts to over 20,000 poor schoolchildren daily, established free medical clinics, and operated sickle-cell anemia screening centers. However, their Marxist-Leninist rhetoric and armed posturing provoked ruthless federal retaliation. FBI Director J. Edgar Hoover branded the Panthers the "greatest internal security threat" in America, deploying the counter-intelligence program (COINTELPRO) to infiltrate, discredit, and violently assassinate Panther leaders, including Fred Hampton in Chicago in 1969.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Ideological Bifurcation and Cultural Pride',
        text: `**A Movement Irrevocably Split:** By the late 1960s, the civil rights movement had split into two rival ideological camps. Dr King and the older generation maintained their commitment to Christian non-violence and interracial coalitions, while younger radicals embraced Black Power, armed self-defence, and anti-imperialist solidarity with Third World liberation movements. This militant shift alienated white liberal allies and contributed to a conservative political backlash among white voters that propelled Richard Nixon to the White House in 1968.

**The Permanent Transformation of Black Identity:** Nevertheless, Black Power achieved a profound psychological and cultural revolution. Slogans like "Black is Beautiful," the adoption of natural Afro hairstyles, and the emergence of Black Studies departments in universities liberated millions of African Americans from centuries of internalized inferiority. The dramatic protest by sprinters Tommie Smith and John Carlos on the medal podium at the 1968 Mexico City Olympics permanently symbolized this unyielding demand for global dignity and human rights.`,
      },
    },

    enquiry4: {
      act1: {
        title: 'Act 1: The Long Hot Summers: Watts, Newark & Detroit in Flames',
        text: `**The Explosion of the Northern Ghettos:** Between 1964 and 1968, more than 300 major urban uprisings erupted in over 200 American cities. The first catastrophic explosion occurred in August 1965 in the Watts ghetto of Los Angeles, triggered by the violent arrest of a young Black motorist by the California Highway Patrol. Six days of rioting left 34 people dead, over 1,000 injured, and 4,000 arrested, with $40 million in property damage. Watts proved that federal civil rights laws passed in Washington meant nothing to impoverished urban youths trapped in deteriorating ghettos.

**The Cataclysm of 1967: Newark and Detroit:** The urban crisis reached its terrifying zenith during the "Long Hot Summer" of 1967. In Newark, New Jersey, twenty-six people died following days of street battles. Two weeks later, Detroit exploded in the bloodiest civil disorder in modern US history. Sparked by a police raid on a blind pig (after-hours drinking club), five days of rebellion resulted in 43 deaths, 7,000 arrests, and the destruction of over 2,000 buildings. President Johnson was forced to deploy thousands of armed federal paratroopers of the 82nd and 101st Airborne Divisions, backed by tanks and armoured personnel carriers, to retake American city streets.`,
      },
      act2: {
        title: 'Act 2: King Turns North: The SCLC and the Chicago Campaign',
        text: `**Confronting Northern De Facto Segregation:** Shaken by the urban conflagrations, Dr Martin Luther King Jr. resolved to take the non-violent crusade into Northern cities. In January 1966, King launched the Chicago Freedom Movement, moving his family into a dilapidated, unheated third-floor tenement in the West Side slum of North Lawndale. King sought to challenge systemic economic apartheid: discriminatory bank mortgage redlining, extortionate slum slumlords, and racially segregated schools orchestrated by powerful Democratic Mayor Richard J. Daley.

**The Hate of Marquette Park:** The Northern campaign proved far more grueling and hostile than the South. When King led peaceful marchers through all-white neighbourhoods such as Marquette Park to demand open housing, they were attacked by thousands of venomous white residents hurling bricks, bottles, and firecrackers, waving swastikas and Confederate battle flags. Struck in the head by a rock, King grimly remarked: "I have seen many mobs in Mississippi and Alabama, but I have never seen in Alabama or Mississippi mobs as hostile and as hate-filled as I\'ve seen in Chicago." The campaign achieved only vague, non-enforceable promises from municipal officials, demonstrating the stubborn resistance of Northern white homeowners.`,
      },
      act3: {
        title: 'Act 3: The Kerner Report and the Martyrdom of Dr King',
        text: `**The Kerner Commission's Scathing Indictment:** To investigate the root causes of the urban revolts, President Johnson appointed the National Advisory Commission on Civil Disorders, chaired by Illinois Governor Otto Kerner. Released in February 1968, the Kerner Report shocked white America by refuting conservative claims that riots were planned by communist agitators. The report identified the true culprit: systemic white racism. It famously warned: "Our nation is moving toward two societies, one black, one white—separate and unequal." The report demanded billions in federal funding for urban jobs, housing, and schools, but Johnson, overwhelmed by Vietnam War spending, shelved its recommendations.

**The Assassination of Dr King (4 April 1968):** In the spring of 1968, King traveled to Memphis, Tennessee, to support striking Black sanitation workers and organize a national Poor People\'s Campaign. On the evening of 4 April 1968, while standing on the balcony of the Lorraine Motel, King was assassinated by white supremacist James Earl Ray. King\'s murder unleashed the largest nationwide wave of social unrest in American history: uprisings erupted in over 125 cities, leaving 46 dead and requiring 45,000 troops to quell. In Washington, D.C., fires burned within sight of the White House. A week later, Congress rushed to pass the Civil Rights Act of 1968 (the Fair Housing Act), banning housing discrimination.`,
      },
      act4: {
        title: 'Act 4: The Historical Verdict: Progress, Division, and Legacy by 1975',
        text: `**A Transformed Political Landscape:** By 1975, the civil rights movement had fundamentally transformed the American South. The blatant barbarism of de jure segregation was extinct, and millions of enfranchised Black citizens wielded decisive political power, electing thousands of Black municipal officials, sheriffs, and members of Congress. In major cities, Black mayors took office in Cleveland, Gary, Newark, Detroit, Los Angeles, and Atlanta. Affirmative action programs opened the doors of universities, corporations, and federal civil service to a growing Black middle class.

**The Unfinished Revolution of Economic Justice:** Yet the promise of full racial equality remained tragically unfulfilled. As legal barriers fell, white Americans retreated into suburban enclaves ("white flight"), leaving inner-city schools and neighbourhoods more economically segregated than before. Dr King's ultimate crusade—the eradication of systemic poverty, urban ghettoization, and militarism—remained unfinished. The heroic era of 1954–75 had destroyed the legal pillars of racial apartheid, but it left the deeper structural inequalities of American capitalism and society unresolved.`,
      },
    },
  };

  const backCoverData = {
    title: 'Key Topic 2 Master Synoptic Consolidation',
    timeline: [
      {
        date: '1 Feb 1960',
        title: 'Greensboro Sit-Ins',
        body: 'Four Black college students spark a nationwide wave of non-violent sit-ins; founding of SNCC.',
      },
      {
        date: '4 May 1961',
        title: 'CORE Freedom Rides',
        body: 'Interracial riders challenge bus segregation; brutally firebombed in Anniston and beaten in Birmingham.',
      },
      {
        date: '3 May 1963',
        title: 'Birmingham Children’s March',
        body: 'Bull Connor unleashes police dogs and fire hoses; televised horror shocks world and galvanizes JFK.',
      },
      {
        date: '2 July 1964',
        title: 'Civil Rights Act of 1964',
        body: 'LBJ signs landmark federal law outlawing segregation in public accommodations and employment.',
      },
      {
        date: '7 Mar 1965',
        title: '"Bloody Sunday" at Selma',
        body: 'State troopers brutally attack voting marchers; LBJ signs monumental Voting Rights Act of 1965.',
      },
      {
        date: '4 Apr 1968',
        title: 'Assassination of Dr King',
        body: 'King murdered in Memphis; uprisings erupt in 125 cities; Congress enacts 1968 Fair Housing Act.',
      },
    ],
    pillars: [
      {
        title: 'I. Direct Action & Non-Violent Crisis Creation',
        body: 'Pioneered by SNCC and CORE, sit-ins, Freedom Rides, and the Birmingham campaign deliberately provoked violent white overreactions to compel reluctant federal executive intervention.',
      },
      {
        title: 'II. Legislative Destruction of Southern Apartheid',
        body: 'The Civil Rights Act of 1964 and Voting Rights Act of 1965 destroyed the statutory edifice of Jim Crow, empowering federal agencies and registering over one million new Southern Black voters.',
      },
      {
        title: 'III. Malcolm X, Black Power & Armed Self-Defence',
        body: 'Frustrated by peaceful moderation and ongoing police brutality, Malcolm X, Stokely Carmichael, and the Black Panthers championed Black nationalism, cultural pride, and community autonomy.',
      },
      {
        title: 'IV. Urban Rebellion & Entrenched Economic Racism',
        body: 'Riots in Watts, Detroit, and Newark exposed deep northern de facto segregation and economic despair. The 1968 Kerner Report concluded white institutional racism had divided America into two unequal societies.',
      },
    ],
    historiographyDebate: {
      interp1: {
        title:
          'Interpretation 1: The Primacy of Moral Consensus & Federal Statecraft (David Garrow)',
        text: '"The decisive victories of the 1960s civil rights movement were achieved through the moral discipline of non-violent Christian direct action, which awakened the national conscience and enabled President Lyndon B. Johnson to forge a bipartisan congressional consensus to pass the 1964 and 1965 Acts."',
      },
      interp2: {
        title:
          'Interpretation 2: The Coercive Power of Radical Grassroots Confrontation (Peniel Joseph)',
        text: '"Federal action was never voluntary; it was wrung from a recalcitrant political establishment by disruptive street crises, urban rebellion, and the existential threat of Black Power. Without the radical challenge posed by Malcolm X and the riots, moderate civil rights concessions would never have occurred."',
      },
    },
    verdicts: [
      {
        title: 'The Dismantling of De Jure Apartheid:',
        body: 'Between 1960 and 1965, the legal and constitutional architecture of Southern Jim Crow was permanently shattered by the 1964 Civil Rights Act and 1965 Voting Rights Act, enfranchising millions.',
      },
      {
        title: 'The Shift to Self-Determination:',
        body: 'The rise of Black Power and the Black Panthers revolutionized African American cultural consciousness, replacing assimilationist appeals with racial pride, economic autonomy, and resistance to police brutality.',
      },
      {
        title: 'The Unresolved Frontier of Economic Justice:',
        body: "Urban uprisings and King's Chicago campaign demonstrated that statutory desegregation could not cure deep de facto housing redlining, ghetto poverty, and structural unemployment across America.",
      },
    ],
    quizzes: [
      {
        num: 'KT 2.1',
        title: 'Direct Action 1960–62',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt2_1',
      },
      {
        num: 'KT 2.2',
        title: 'Birmingham to Selma & Acts',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt2_2',
      },
      {
        num: 'KT 2.3',
        title: 'Malcolm X & Black Power',
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt2_3',
      },
      {
        num: 'KT 2.4',
        title: "Urban Riots & King's Legacy",
        url: 'https://the-history-revision-hub.netlify.app/?unit=usa&quiz=kt2_4',
      },
    ],
  };

  return {
    coverConfig,
    componentBank: USA_COMPONENT_BANK,
    leftSources,
    leftVocab,
    narratives,
    backCoverData,
  };
};
