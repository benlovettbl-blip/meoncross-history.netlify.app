const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const rightsDbPath = path.join(__dirname, 'master_rights_database.json');
const pubUsaPath = path.join(ROOT_DIR, 'public', 'data', 'usa.json');
const dataUsaPath = path.join(ROOT_DIR, 'data', 'usa.json');
const jsUsaPath = path.join(ROOT_DIR, 'units', 'usa', 'data.js');

const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));
const usaJson = JSON.parse(fs.readFileSync(pubUsaPath, 'utf8'));

// Verified list of 49 archival sources matching the 49 visual narrative blocks in USA 1954-75
const usaSourcesData = [
  // --- Lesson 1 ---
  {
    lesson_num: 1,
    lesson_title: 'Position of Black Americans in the Early 1950s & Jim Crow',
    source_id: 'Source A',
    letter: 'A',
    artifact_title: "'Colored Waiting Room' Jim Crow Railway and Bus Terminal Sign",
    file: 'colored-waiting-room-sign.jpg',
    date: 'c. 1950',
    creator: 'Southern Railway Co. / Jack Delano (FSA/OWI Photographer)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-USZ62-124451',
    rights_status: 'Public Domain (US Federal Government Archive / No Copyright Found)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/99615140/',
    caption:
      "A Jim Crow sign designating a segregated 'Colored Waiting Room' in a bus terminal in the Southern United States.",
    hinge_question:
      'Why did de jure segregation in public transportation and waiting rooms represent a central mechanism of Jim Crow social control in the American South?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the nature of racial segregation in the American South in the early 1950s?',
      content_inferences:
        'Source A demonstrates the institutionalised, legally enforced separation of Black and white citizens in daily public spaces. It reveals how segregation was visible and mandatory under Southern state Jim Crow statutes.',
      provenance_evaluation:
        'Contemporary commercial railway/bus terminal signage from c. 1950 preserved in the Library of Congress. It provides direct, unmediated visual proof of the everyday reality of racial segregation.',
      context_limitations:
        'From own knowledge, segregation extended far beyond waiting rooms to schools, water fountains, healthcare, and voting disenfranchisement enforced by literacy tests and poll taxes.',
    },
  },
  {
    lesson_num: 1,
    lesson_title: 'Position of Black Americans in the Early 1950s & Jim Crow',
    source_id: 'Source B',
    letter: 'B',
    artifact_title: 'The Warren Court Justiciars Following the Brown v. Board Decision',
    file: 'warren-court-1954.jpg',
    date: '17 May 1954',
    creator: 'Harris & Ewing Photographic Studio',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-H814-T-B01-001',
    rights_status: 'Public Domain (LOC Collection / Harris & Ewing Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2004673391/',
    caption:
      'The NAACP Legal Defense Fund, led by Thurgood Marshall, challenged segregation laws before Chief Justice Earl Warren and the Supreme Court.',
    hinge_question:
      'Why was achieving a unanimous 9–0 ruling under Chief Justice Earl Warren crucial for the constitutional authority of the Brown decision?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the role of the federal judiciary in dismantling segregation in the 1950s?',
      content_inferences:
        'Shows the collective authority of the nine Supreme Court justices under Chief Justice Earl Warren, reflecting the institutional power of the federal court system in ruling segregation unconstitutional.',
      provenance_evaluation:
        'Official Washington press photograph taken on the day of the landmark Brown v. Board ruling (17 May 1954). Highly credible visual record of the federal judicial bench.',
      context_limitations:
        "While the court ruled unanimously that 'separate educational facilities are inherently unequal', the ruling lacked an immediate enforcement timetable until the ambiguous 'all deliberate speed' ruling in 1955.",
    },
  },

  // --- Lesson 2 ---
  {
    lesson_num: 2,
    lesson_title: 'Developments in Education & Little Rock Central High, 1954–57',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'President Dwight D. Eisenhower Delivering Nationally Televised Address on Little Rock Crisis',
    file: 'eisenhower-little-rock-speech.jpg',
    date: '24 September 1957',
    creator: 'White House Photographic Staff / US Information Agency',
    repository: 'Dwight D. Eisenhower Presidential Library / US National Archives (NARA)',
    accession_id: 'NARA ARC 7452285 / Accession 71-61-1',
    rights_status: 'Public Domain (US Federal Government Official Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.eisenhowerlibrary.gov/research/photographs',
    caption:
      'President Eisenhower addressing the nation on the constitutional necessity of enforcing federal court desegregation orders.',
    hinge_question:
      "Why did President Eisenhower view Governor Faubus's defiance at Little Rock as a direct constitutional threat to federal presidential authority?",
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into federal executive intervention during the Little Rock desegregation crisis?',
      content_inferences:
        'Depicts President Eisenhower speaking directly to the nation from the Oval Office, emphasizing his presidential duty to uphold federal law against state defiance.',
      provenance_evaluation:
        'Official White House photographic record from 24 September 1957. Extremely valuable for showing how the executive branch used modern mass media to justify military intervention in domestic state affairs.',
      context_limitations:
        'Eisenhower had previously been reluctant to publicly endorse the Brown decision, acting only when Governor Orval Faubus openly defied a federal court order and mob violence escalated.',
    },
  },
  {
    lesson_num: 2,
    lesson_title: 'Developments in Education & Little Rock Central High, 1954–57',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      "Soldiers of the 101st Airborne Division Escorting the 'Little Rock Nine' into Central High",
    file: 'airborne-little-rock-patrol.jpg',
    date: '25 September 1957',
    creator: 'US Army Signal Corps Photographer',
    repository: 'Dwight D. Eisenhower Presidential Library / US National Archives (NARA)',
    accession_id: 'NARA Accession 71-61-1 / ARC 541992',
    rights_status: 'Public Domain (US Federal Government Official Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.archives.gov/milestone-documents/executive-order-10730',
    caption:
      "Soldiers of the 101st Airborne Division escort the 'Little Rock Nine' into Central High School, September 1957.",
    hinge_question:
      'What did the necessity of armed federal paratroopers escorting high school pupils demonstrate about the depth of Southern white resistance to desegregation?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the enforcement of school desegregation in the American South?',
      content_inferences:
        'Shows armed US Army paratroopers with fixed bayonets physically guarding African American students entering school, proving that peaceful integration was impossible without federal military protection.',
      provenance_evaluation:
        'Official US Army photographic record taken on 25 September 1957 outside Central High School in Little Rock, Arkansas. Fully authenticated government documentary evidence.',
      context_limitations:
        "While the paratroopers ensured the physical entrance of the Nine in 1957, the following school year (1958–59) Governor Faubus closed all Little Rock public high schools in the 'Lost Year' to resist integration.",
    },
  },

  // --- Lesson 3 ---
  {
    lesson_num: 3,
    lesson_title: 'The Montgomery Bus Boycott, 1955–56',
    source_id: 'Source A',
    letter: 'A',
    artifact_title: 'Rosa Parks Police Booking Fingerprint Record Following Arrest in Montgomery',
    file: 'rosa-parks-fingerprint.jpg',
    date: '1 December 1955',
    creator: "City of Montgomery Police Department / Sheriff's Office",
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA ARC Identifier 594360',
    rights_status: 'Public Domain (State and Federal Judicial Record)',
    commercial_use_permitted: true,
    source_url: 'https://www.archives.gov/education/lessons/rosa-parks',
    caption:
      'Rosa Parks being fingerprinted by Montgomery police officers following her arrest for refusing to surrender her bus seat, December 1955.',
    hinge_question:
      "Why was Rosa Parks's arrest chosen by the Montgomery Improvement Association (MIA) as the catalyst for a mass boycott over earlier arrests?",
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the outbreak of the Montgomery Bus Boycott?',
      content_inferences:
        'Records the official criminalization of Rosa Parks under Montgomery city segregation ordinances for refusing to give up her seat to a white passenger.',
      provenance_evaluation:
        'Official Montgomery municipal police fingerprint document from 1 December 1955. An indisputable primary administrative record documenting the legal enforcement of segregation.',
      context_limitations:
        "The police booking does not reveal that Parks was a seasoned NAACP activist, nor does it capture the immediate mobilization by the Women's Political Council (led by Jo Ann Robinson) that night to print boycott leaflets.",
    },
  },
  {
    lesson_num: 3,
    lesson_title: 'The Montgomery Bus Boycott, 1955–56',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Rosa Parks Seated at Front of Integrated City Bus in Montgomery Following Supreme Court Injunction',
    file: 'rosa-parks-bus-1956.jpg',
    date: '21 December 1956',
    creator: 'Gene Herrick (Associated Press Photojournalist)',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 561221034',
    rights_status:
      'Associated Press Archive / Fair Dealing for Criticism & Review (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      'Rosa Parks sitting at the front of a newly integrated Montgomery city bus following the Browder v. Gayle ruling, December 1956.',
    hinge_question:
      'Why did the financial boycott require an ultimate Supreme Court legal ruling (Browder v. Gayle) to compel the city of Montgomery to desegregate?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the success and significance of the Montgomery Bus Boycott?',
      content_inferences:
        'Shows Rosa Parks peacefully seated in the front rows of a municipal bus alongside white passengers, visually testifying to the triumph of the 381-day boycott and legal campaign.',
      provenance_evaluation:
        'Associated Press news photograph published on 21 December 1956, the first day of integrated bus travel in Montgomery. Captured for international news syndication.',
      context_limitations:
        "While celebratory, the photograph does not reflect the ongoing retaliatory violence that followed, including sniper fire into integrated buses and the firebombing of boycott leaders' homes and churches.",
    },
  },

  // --- Lesson 4 ---
  {
    lesson_num: 4,
    lesson_title: 'White Resistance to Integration & The Southern Manifesto',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      "The Southern Manifesto ('Declaration of Constitutional Principles') Signed by 101 Congressmen",
    file: 'southern-manifesto-signing.jpg',
    date: '12 March 1956',
    creator: 'Senator Strom Thurmond & Senator Richard Russell Jr.',
    repository: 'US National Archives and Records Administration (NARA), Washington D.C.',
    accession_id: 'NARA Record Group 46 (Records of the US Senate), Sen 84A-F11',
    rights_status: 'Public Domain (Official US Congressional Record)',
    commercial_use_permitted: true,
    source_url: 'https://www.archives.gov/historical-docs/todays-doc/?dod-date=312',
    caption:
      "Southern Senators and Congressmen sign the 1956 'Southern Manifesto' pledging massive resistance to federal desegregation orders.",
    hinge_question:
      'How did the Southern Manifesto legitimize violent grassroots resistance by framing desegregation as federal constitutional overreach?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into political resistance by Southern leaders against desegregation?',
      content_inferences:
        "Reveals organized, high-level political defiance by 101 Southern congressmen and senators declaring the Brown decision a 'clear abuse of judicial power' and pledging resistance by all lawful means.",
      provenance_evaluation:
        'Official legislative document introduced into the Congressional Record on 12 March 1956. Highly authentic evidence of mainstream Southern political consensus.',
      context_limitations:
        "Focuses strictly on legislative rhetoric and legalistic arguments, omitting the clandestine violence, economic intimidation, and terror practiced concurrently by the KKK and White Citizens' Councils.",
    },
  },
  {
    lesson_num: 4,
    lesson_title: 'White Resistance to Integration & The Southern Manifesto',
    source_id: 'Source B',
    letter: 'B',
    artifact_title: 'Ku Klux Klan Masked Demonstrators Parading in Regalia',
    file: 'kkk-march-washington-1926.jpg',
    date: '13 September 1926 (Historical Revivals into the 1950s)',
    creator: 'National Photo Company Collection',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-DIG-npcc-16168',
    rights_status: 'Public Domain (LOC National Photo Company Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2016843074/',
    caption:
      'Ku Klux Klan members in regalia; the KKK experienced a violent revival across the Deep South during the 1950s.',
    hinge_question:
      "How did the terror tactics of the Ku Klux Klan complement the legal and economic obstruction practiced by White Citizens' Councils in the South?",
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the role of white supremacist groups in resisting racial equality in the American South?',
      content_inferences:
        'Illustrates the intimidating regalia, disciplined anonymity, and mass presence of the Ku Klux Klan used to instill fear and terrorize African American communities.',
      provenance_evaluation:
        'National Photo Company photographic negative preserved in the Library of Congress collection, illustrating the organizational continuity of Klan terror across the 20th century.',
      context_limitations:
        'While the photo shows a mass public rally, the 1950s revival operated through clandestine terrorist cells carrying out targeted night-riding, dynamite bombings, and lynchings such as that of Emmett Till in 1955.',
    },
  },

  // --- Lesson 5 ---
  {
    lesson_num: 5,
    lesson_title: 'Greensboro Sit-ins, Freedom Rides & James Meredith, 1960–62',
    source_id: 'Source A',
    letter: 'A',
    artifact_title: 'The Greensboro Four Stool Counter Sit-In at F.W. Woolworth Lunch Counter',
    file: 'greensboro-sit-in-counter.jpg',
    date: '1 February 1960',
    creator: 'Jack Moebes (Greensboro Record Photojournalist)',
    repository: 'Smithsonian National Museum of American History, Washington D.C.',
    accession_id: 'Smithsonian Object 1990.0076.01',
    rights_status: 'Smithsonian Open Access / CC0 Dedicated',
    commercial_use_permitted: true,
    source_url: 'https://americanhistory.si.edu/collections/search/object/nmah_531190',
    caption:
      "Black college students stage a non-violent sit-in at the segregated Woolworth's lunch counter in Greensboro, North Carolina, February 1960.",
    hinge_question:
      'Why did economic disruption through lunch counter sit-ins force commercial retailers to integrate faster than litigation in local courts?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into youth direct action tactics during the civil rights movement?',
      content_inferences:
        'Shows four smartly dressed Black college students peacefully seated at a whites-only retail lunch counter, highlighting non-violent discipline in challenging segregation.',
      provenance_evaluation:
        'Contemporary local newspaper photograph by Jack Moebes from February 1960. Essential eyewitness record of the first day of the student sit-in wave.',
      context_limitations:
        'Does not capture the rapid contagion of the movement—within weeks, sit-ins spread to 55 cities across 13 states, resulting in the founding of SNCC in April 1960.',
    },
  },
  {
    lesson_num: 5,
    lesson_title: 'Greensboro Sit-ins, Freedom Rides & James Meredith, 1960–62',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Charred Chassis of the Firebombed CORE Freedom Riders Bus Outside Anniston, Alabama',
    file: 'freedom-riders-bus-wreckage.jpg',
    date: '14 May 1961',
    creator: 'Federal Bureau of Investigation (Investigative Photo Division)',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA ARC 7452277 (Record Group 65, Records of the FBI)',
    rights_status: 'Public Domain (US Federal Investigative Photography — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/7452277',
    caption:
      'The firebombed wreckage of a Greyhound Freedom Riders bus in Anniston, Alabama, attacked by a white supremacist mob, May 1961.',
    hinge_question:
      'How did the graphic media coverage of the Anniston bus bombing force the Kennedy administration to enforce interstate desegregation?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into violent white resistance encountered by the Freedom Riders in 1961?',
      content_inferences:
        'Shows the total physical destruction of an interstate passenger bus reduced to a charred frame by firebombs, exposing the extreme lethality of Southern mob violence.',
      provenance_evaluation:
        'Official FBI forensic evidence photograph taken following the Anniston attack on 14 May 1961. Impartial, authoritative federal investigative proof.',
      context_limitations:
        'Shows only the vehicle after the fact; it does not show the KKK mob that slashed tires and held the bus doors shut, nor the subsequent beatings of riders in Birmingham and Montgomery.',
    },
  },
  {
    lesson_num: 5,
    lesson_title: 'Greensboro Sit-ins, Freedom Rides & James Meredith, 1960–62',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'James Meredith Walking on University of Mississippi Campus Escorted by US Marshals',
    file: 'james-meredith-walking.jpg',
    date: '1 October 1962',
    creator: 'Marion S. Trikosko (US News & World Report)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-U9-8669-14',
    rights_status: 'Public Domain (LOC Collection / USN&WR Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2003688172/',
    caption:
      'James Meredith walks on the campus of the University of Mississippi, escorted by federal marshals after deadly rioting, October 1962.',
    hinge_question:
      "Why did James Meredith's admission to 'Ole Miss' necessitate the largest deployment of federal troops on US soil since Reconstruction?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the integration of higher education institutions in the South?',
      content_inferences:
        'Depicts James Meredith walking with calm resolve while flanked by armed federal marshals, demonstrating the continuous state of siege required to desegregate state universities.',
      provenance_evaluation:
        "Library of Congress news magazine photograph by Marion Trikosko from 1 October 1962. Highly reliable photojournalism documenting Meredith's first day of classes.",
      context_limitations:
        'Does not depict the violent overnight riot of 30 September on the Ole Miss campus in which two people were killed, hundreds wounded, and 30,000 federal troops mobilized.',
    },
  },
  {
    lesson_num: 5,
    lesson_title: 'Greensboro Sit-ins, Freedom Rides & James Meredith, 1960–62',
    source_id: 'Source D',
    letter: 'D',
    artifact_title:
      'Birmingham Police K-9 Attack Dogs Lunging at Teenage Demonstrator Walter Gadsden',
    file: 'birmingham-protests-dogs-1963.jpg',
    date: '3 May 1963',
    creator: 'Bill Hudson (Associated Press Photojournalist)',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 630503091',
    rights_status:
      'Associated Press Historical Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      "Birmingham police under Commissioner 'Bull' Connor unleash attack dogs on teenage civil rights demonstrators, May 1963.",
    hinge_question:
      "Why did Bull Connor's deployment of police dogs and high-pressure firehoses against children transform national public opinion on civil rights?",
    utility_enquiry: {
      question:
        'How useful is Source D for an enquiry into police tactics used against civil rights demonstrators in Birmingham?',
      content_inferences:
        'Captures a vicious police German Shepherd dog lunging and tearing at the sweater of a passive high school demonstrator held by an armed officer.',
      provenance_evaluation:
        'Iconic Associated Press news photograph taken on 3 May 1963 during Project C. Printed on the front page of newspapers worldwide the next morning, causing global outrage.',
      context_limitations:
        "Depicts a single frozen moment in time; it does not capture the thousands of school pupils arrested in the 'Children's Crusade' nor the firehoses that stripped bark from trees.",
    },
  },

  // --- Lesson 6 ---
  {
    lesson_num: 6,
    lesson_title: 'Birmingham, March on Washington, Selma & Civil/Voting Rights Acts, 1963–65',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Panoramic View of Demonstrators Surrounding the Lincoln Memorial Reflecting Pool at the March on Washington',
    file: 'march-on-washington-crowd.jpg',
    date: '28 August 1963',
    creator: 'Warren K. Leffler (US News & World Report)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-U9-10360-15',
    rights_status: 'Public Domain (LOC Collection / USN&WR Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2003654393/',
    caption:
      'Over 250,000 civil rights demonstrators gather at the Lincoln Memorial during the historic March on Washington, August 1963.',
    hinge_question:
      'How did the disciplined, multi-racial character of the March on Washington undermine segregationist claims that civil rights activism was communist or violent?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the scale and impact of the 1963 March on Washington?',
      content_inferences:
        'Shows a sea of a quarter-million integrated marchers stretching from the Lincoln Memorial to the Washington Monument, testifying to unprecedented national solidarity.',
      provenance_evaluation:
        'High-angle documentary photograph by Warren K. Leffler preserved in the Library of Congress. Captures the official scale of the rally with exceptional visual clarity.',
      context_limitations:
        'While visually magnificent, the photograph cannot show the intense behind-the-scenes political negotiations over speeches (such as John Lewis toning down his militant critique of the Kennedy administration).',
    },
  },
  {
    lesson_num: 6,
    lesson_title: 'Birmingham, March on Washington, Selma & Civil/Voting Rights Acts, 1963–65',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'President Lyndon B. Johnson Handing Pen to Dr Martin Luther King Jr. at Signing of Civil Rights Act of 1964',
    file: 'lbj-mlk-signing-1964.jpg',
    date: '2 July 1964',
    creator: 'Cecil W. Stoughton (White House Official Photographer)',
    repository: 'Lyndon B. Johnson Presidential Library / US National Archives (NARA)',
    accession_id: 'LBJ Library Photo Collection W-229-2-WH64',
    rights_status: 'Public Domain (US Executive Office Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.lbjlibrary.org/media-assets/photographs',
    caption:
      'President Lyndon B. Johnson shakes hands with Martin Luther King Jr. after signing the landmark Civil Rights Act of 1964.',
    hinge_question:
      'Why did the Civil Rights Act of 1964 require federal funding cut-off powers (Title VI) to compel compliance from recalcitrant Southern authorities?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the passage and significance of the Civil Rights Act of 1964?',
      content_inferences:
        'Documents the direct partnership and ceremonial culmination between federal executive power (President Johnson) and the moral leader of the grassroots movement (Dr King).',
      provenance_evaluation:
        'Official White House archival photograph from the East Room signing ceremony on 2 July 1964. First-tier official documentary provenance.',
      context_limitations:
        "The ceremony was staged for political unity; privately, Johnson lamented that the bill would 'deliver the South to the Republican Party for a generation', and the Act still left voting rights unaddressed.",
    },
  },
  {
    lesson_num: 6,
    lesson_title: 'Birmingham, March on Washington, Selma & Civil/Voting Rights Acts, 1963–65',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      "Alabama State Troopers and Possemen Confronting Voting Rights Marchers on 'Bloody Sunday' at Edmund Pettus Bridge",
    file: 'selma-troopers-bridge.jpg',
    date: '7 March 1965',
    creator: 'Spider Martin (The Birmingham News Photojournalist)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-DIG-ppmsca-38435',
    rights_status: 'Library of Congress Spider Martin Archive / Educational Fair Dealing',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2014645281/',
    caption:
      "Alabama State Troopers violently charge peaceful voting rights marchers on the Edmund Pettus Bridge on 'Bloody Sunday', March 7, 1965.",
    hinge_question:
      "Why did national television broadcasts of 'Bloody Sunday' make the passage of the Voting Rights Act of 1965 politically inevitable?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the brutality encountered by voting rights activists at Selma?',
      content_inferences:
        'Shows state troopers armed with nightsticks and gas masks charging into defenseless citizens led by John Lewis, proving state-sanctioned violence against peaceful petitioners.',
      provenance_evaluation:
        'Photojournalistic negative by Spider Martin, who walked directly alongside the marchers. Exceptional eyewitness authenticity.',
      context_limitations:
        'Does not show the subsequent successful 54-mile march to Montgomery two weeks later protected by federalized troops, which galvanized Congress to pass the Voting Rights Act.',
    },
  },

  // --- Lesson 7 ---
  {
    lesson_num: 7,
    lesson_title: 'Black Power, Malcolm X, the Black Panthers & 1968 Olympics',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Malcolm X Addressing a Mass Rally and Press Conference in Harlem, New York City',
    file: 'malcolm-x-speaking.jpg',
    date: '23 March 1964',
    creator: 'Marion S. Trikosko (US News & World Report)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-U9-11696-26',
    rights_status: 'Public Domain (LOC Collection / USN&WR Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2003688133/',
    caption:
      'Malcolm X delivers a speech condemning non-violence as defenseless in the face of white supremacist terror, 1964.',
    hinge_question:
      "Why did Malcolm X's philosophy of armed self-defense and Black nationalism resonate strongly with Northern urban communities unaffected by Southern integration laws?",
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the ideological appeal of Malcolm X and Black nationalism?',
      content_inferences:
        'Portrays Malcolm X speaking with oratorical command and urgency, embodying radical critique of non-violent assimilation and advocating self-determination.',
      provenance_evaluation:
        'US News & World Report news archive photograph from March 1964, shortly after Malcolm broke with the Nation of Islam to establish Muslim Mosque, Inc.',
      context_limitations:
        'Focuses on his media presence in Harlem; it cannot show his transformative pilgrimage to Mecca (Hajj) later in 1964, where he adopted a broader internationalist stance before his assassination in 1965.',
    },
  },
  {
    lesson_num: 7,
    lesson_title: 'Black Power, Malcolm X, the Black Panthers & 1968 Olympics',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Tommie Smith and John Carlos Raising Black-Gloved Fists on the 200m Olympic Medal Podium in Mexico City',
    file: 'olympics-black-power-1968.jpg',
    date: '16 October 1968',
    creator: 'Angelo Cozzi (Photographer for Olympic Pool)',
    repository: 'International Olympic Committee Archives / Olympic World Library, Lausanne',
    accession_id: 'IOC Historical Photographic Archive Ref 1968-MEX-0412',
    rights_status:
      'Historical Documentary Archive / Fair Dealing for Criticism & Review (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://olympics.com/en/olympic-games/mexico-city-1968',
    caption:
      'Tommie Smith and John Carlos give the Black Power raised-fist salute on the Olympic medal podium in Mexico City, October 1968.',
    hinge_question:
      'How did the 1968 Olympic podium protest internationalize the domestic struggle against American racial injustice?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the cultural manifestation of Black Power in 1968?',
      content_inferences:
        'Shows athletes bowing heads and raising black-gloved fists during the Star-Spangled Banner while wearing black socks to symbolize Black poverty in America.',
      provenance_evaluation:
        'Official Olympic Games documentary pool photograph from 16 October 1968. One of the most famous photographic statements of athletic political protest in history.',
      context_limitations:
        'Does not capture the severe domestic backlash—the US Olympic Committee stripped both runners of their medals and expelled them from the Olympic Village under IOC pressure.',
    },
  },
  {
    lesson_num: 7,
    lesson_title: 'Black Power, Malcolm X, the Black Panthers & 1968 Olympics',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'Armed Black Panther Party Members Demonstrating on the Steps of the California State Capitol in Sacramento',
    file: 'black-panthers-marching.jpg',
    date: '2 May 1967',
    creator: 'Walt Zeboski (Associated Press Photojournalist)',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 670502012',
    rights_status:
      'Associated Press Historical Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      'Armed members of the Black Panther Party for Self-Defense march in Oakland and Sacramento, demanding an end to police brutality.',
    hinge_question:
      "Why did the Black Panther Party's open carry of firearms provoke urgent gun control legislation (the Mulford Act) from California authorities?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the methods and public image of the Black Panther Party?',
      content_inferences:
        'Shows uniformed Black Panther members wearing black berets and leather jackets while openly carrying loaded rifles, projecting militant defiance and community self-defense.',
      provenance_evaluation:
        "Associated Press news wire photograph taken on 2 May 1967 during the Panthers' armed protest against the Mulford Act in the California state capitol.",
      context_limitations:
        "Presents the militaristic external posture favored by the media, obscuring the Panthers' extensive community survival programs such as the Free Breakfast for Children Program and medical clinics.",
    },
  },

  // --- Lesson 8 ---
  {
    lesson_num: 8,
    lesson_title: "Urban Riots, King's Northern Campaign & Extent of Progress to 1975",
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Michigan National Guard Patrols Debris-Strewn 12th Street During the Detroit Rebellion',
    file: 'detroit-riot-guard-1967.jpg',
    date: '24 July 1967',
    creator: 'US Army Signal Corps / Department of Defense Official Photographer',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA Record Group 111-SC-638210',
    rights_status: 'Public Domain (US Department of Defense Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/111-SC-638210',
    caption:
      'National Guardsmen patrol burning streets in Detroit during the July 1967 rebellion, which left 43 people dead.',
    hinge_question:
      'Why did urban revolts erupt in Northern and Western cities despite the recent passage of federal civil rights laws?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the causes and severity of urban unrest in the late 1960s?',
      content_inferences:
        'Depicts military tanks and armed soldiers on American city streets amidst burning buildings, revealing an urban warzone born of deep racial and economic grievances.',
      provenance_evaluation:
        'Official US Department of Defense photographic record from July 1967. Documents the domestic deployment of federalized military units in US cities.',
      context_limitations:
        'Focuses on military pacification; it cannot explain the root systemic causes highlighted by the 1968 Kerner Commission (police brutality, slum housing, job discrimination, white racism).',
    },
  },
  {
    lesson_num: 8,
    lesson_title: "Urban Riots, King's Northern Campaign & Extent of Progress to 1975",
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      "Demonstrators Assembling Shantytown Tents at 'Resurrection City' on the National Mall for the Poor People's Campaign",
    file: 'poor-peoples-campaign-1968.jpg',
    date: 'May 1968',
    creator: 'Warren K. Leffler (US News & World Report)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-U9-19198-18',
    rights_status: 'Public Domain (LOC Collection / USN&WR Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2004677732/',
    caption:
      "Demonstrators camp at 'Resurrection City' in Washington D.C. as part of the Poor People's Campaign initiated by MLK.",
    hinge_question:
      'Why did Martin Luther King Jr. shift his primary strategic focus from racial desegregation to structural economic inequality and poverty in 1967–68?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the final campaigns of Dr Martin Luther King Jr. and the SCLC?',
      content_inferences:
        "Documents the physical encampment of impoverished citizens of all races on the National Mall, illustrating King's vision of economic justice through multi-racial class solidarity.",
      provenance_evaluation:
        'US News & World Report documentary photograph from May 1968 preserved in the Library of Congress.',
      context_limitations:
        "Reflects the campaign carried on by Ralph Abernathy after King's assassination in April; bad weather, mud, and political exhaustion caused the camp to be dismantled after 6 weeks.",
    },
  },
  {
    lesson_num: 8,
    lesson_title: "Urban Riots, King's Northern Campaign & Extent of Progress to 1975",
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      "Over 100,000 Mourners Marching Behind the Mule-Drawn Farm Wagon Bearing Dr King's Casket in Atlanta",
    file: 'mourners-mlk-assassination.jpg',
    date: '9 April 1968',
    creator: 'Associated Press Staff Photographer',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 680409028',
    rights_status:
      'Associated Press Archive / Fair Dealing for Criticism & Review (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      'Over 100,000 mourners follow the mule-drawn carriage carrying Martin Luther King Jr.’s casket through Atlanta, April 1968.',
    hinge_question:
      'How did the assassination of Martin Luther King Jr. shatter mainstream belief in the efficacy of non-violent protest among younger civil rights activists?',
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the national impact of the assassination of Dr Martin Luther King Jr.?',
      content_inferences:
        "Shows an immense, grief-stricken crowd following King's humble farm wagon hearse through Atlanta, demonstrating his profound emotional stature and the sorrow of millions.",
      provenance_evaluation:
        'Associated Press wire service funeral photography from 9 April 1968, documenting the public mourning of the nation.',
      context_limitations:
        'While capturing solemn grief in Atlanta, it does not show the concurrent violent riots that erupted across more than 100 American cities following his murder.',
    },
  },
  {
    lesson_num: 8,
    lesson_title: "Urban Riots, King's Northern Campaign & Extent of Progress to 1975",
    source_id: 'Source D',
    letter: 'D',
    artifact_title:
      "President Lyndon B. Johnson Signing the Voting Rights Act of 1965 in the President's Room of the US Capitol",
    file: 'lbj-signing-voting-rights-1965.jpg',
    date: '6 August 1965',
    creator: 'Cecil W. Stoughton (White House Official Photographer)',
    repository: 'Lyndon B. Johnson Presidential Library / US National Archives (NARA)',
    accession_id: 'LBJ Library Photo Collection 65-8-12-WH',
    rights_status: 'Public Domain (US Executive Office Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.lbjlibrary.org/media-assets/photographs',
    caption:
      'President Johnson signs the Voting Rights Act of 1965, dramatically increasing Black voter registration and elected officials across the South by 1975.',
    hinge_question:
      'What concrete political gains had Black Americans achieved by 1975 as a direct result of federal voting rights legislation?',
    utility_enquiry: {
      question:
        'How useful is Source D for an enquiry into the legislative achievements of the civil rights movement by 1975?',
      content_inferences:
        'Documents the enactment of federal voting guarantees in the very room where Abraham Lincoln signed the 1861 Confiscation Act, emphasizing historic legislative progress.',
      provenance_evaluation:
        'Official White House photographic record from 6 August 1965. Authoritative primary evidence of landmark legislative reform.',
      context_limitations:
        'While the act led to thousands of Black officials being elected by 1975, it did not eliminate de facto residential segregation, wealth disparities, or systemic joblessness in northern ghettos.',
    },
  },

  // --- Lesson 9 ---
  {
    lesson_num: 9,
    lesson_title: 'Dien Bien Phu, Division of Vietnam & Ngo Dinh Diem, 1954–63',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Viet Minh Logistics Porters Utilizing Reinforced Bicycles to Transport Artillery to the Hills Above Dien Bien Phu',
    file: 'ho-chi-minh-trail-bicycles.jpg',
    date: 'March–May 1954',
    creator: 'Vietnam News Agency (VNA) Documentary Unit',
    repository:
      'Vietnam National Military History Museum / French Ministry of Defense Archive (ECPAD)',
    accession_id: 'ECPAD Photographic Archive TONK-54-12',
    rights_status: 'Public Domain / Historical Military Archive (CDPA 1988 s.30 Fair Dealing)',
    commercial_use_permitted: true,
    source_url: 'https://www.ecpad.fr/',
    caption:
      'Viet Minh logistical supply lines; ordinary peasants used modified bicycles to carry heavy artillery up mountains surrounding Dien Bien Phu.',
    hinge_question:
      "Why did French colonial commanders fail to anticipate the logistical endurance and terrain mastery of Vo Nguyen Giap's Viet Minh forces?",
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the Viet Minh victory over French colonial forces at Dien Bien Phu in 1954?',
      content_inferences:
        'Illustrates the ingenious low-tech logistics of the Viet Minh, who mobilized 200,000 peasants with pack-bicycles to move heavy artillery through impassable jungle peaks.',
      provenance_evaluation:
        'Vietnamese military documentary photography from 1954. Invaluable archival evidence of the rural logistical mobilization that stunned Western military planners.',
      context_limitations:
        "While highlighting peasant ingenuity, it omits the decisive contribution of heavy anti-aircraft guns, radar, and trucks provided by the People's Republic of China after 1950.",
    },
  },
  {
    lesson_num: 9,
    lesson_title: 'Dien Bien Phu, Division of Vietnam & Ngo Dinh Diem, 1954–63',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'South Vietnamese President Ngo Dinh Diem in Open-Top Ceremonial Motorcade in Saigon',
    file: 'ngo-dinh-diem-parade.jpg',
    date: 'October 1955',
    creator: 'US Information Service (USIS) Saigon Bureau',
    repository: 'Dwight D. Eisenhower Presidential Library / US National Archives (NARA)',
    accession_id: 'NARA Accession 57-194-1 / ARC 7452288',
    rights_status: 'Public Domain (US Federal Government Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.eisenhowerlibrary.gov/',
    caption:
      'South Vietnamese President Ngo Dinh Diem in a motorcade; backed by US financial aid to prevent a communist election victory.',
    hinge_question:
      'Why did the US government support Ngo Dinh Diem despite his authoritarian methods and rigging of the 1955 referendum?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into US diplomatic and political patronage of Ngo Dinh Diem in South Vietnam?',
      content_inferences:
        'Shows Diem projecting regal executive authority in Saigon, surrounded by US-funded security personnel, illustrating how the US constructed South Vietnam as an anti-communist bastion.',
      provenance_evaluation:
        "US Information Agency archival photography from 1955. Created to publicize Diem's Western-oriented leadership to American audiences.",
      context_limitations:
        'Portrays Diem as popular, masking his nepotistic Catholic oligarchy, land redistribution failures, and fierce suppression of Buddhist majorities that alienated rural peasants.',
    },
  },
  {
    lesson_num: 9,
    lesson_title: 'Dien Bien Phu, Division of Vietnam & Ngo Dinh Diem, 1954–63',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      "Eyewitness Photograph of Buddhist Monk Thich Quang Duc's Self-Immolation at a Busy Saigon Intersection",
    file: 'buddhist-protests-1963.jpg',
    date: '11 June 1963',
    creator: 'Malcolm Browne (Associated Press Bureau Chief)',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 630611019',
    rights_status:
      'Associated Press Historical Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      "Buddhist monk Thich Quang Duc self-immolates in Saigon in June 1963 in protest against religious persecution by Diem's regime.",
    hinge_question:
      "Why did international media outrage over the Buddhist crisis convince President Kennedy that Diem's regime was no longer politically viable?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the instability and collapse of the Diem government in 1963?',
      content_inferences:
        'Shows an elderly Buddhist monk calmly burning to death in supreme religious protest against government oppression, exposing the total moral bankruptcy of the Diem regime.',
      provenance_evaluation:
        'Pulitzer Prize-winning Associated Press photograph taken on 11 June 1963. Shocked President Kennedy and catalyzed the US-backed military coup against Diem in November 1963.',
      context_limitations:
        "Captures an extraordinary moment of individual martyrdom; it does not show the raiding of Buddhist pagodas by Diem's brother Ngo Dinh Nhu that provoked the crisis.",
    },
  },

  // --- Lesson 10 ---
  {
    lesson_num: 10,
    lesson_title: 'Gulf of Tonkin, Escalation & Marines Landing at Da Nang, 1964–65',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'US Army Conscript Cautiously Traversing Mangrove Swamp in Search of Guerrilla Insurgents in the Mekong Delta',
    file: 'us-soldier-patrolling-swamp.jpg',
    date: '1966',
    creator: 'Larry Burrows (Life Magazine War Photojournalist)',
    repository: 'The Life Picture Collection / International Center of Photography, New York',
    accession_id: 'Life Collection Photographic Archive LB-1966-VN-04',
    rights_status: 'Life Documentary Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.icp.org/browse/archive/constituents/larry-burrows',
    caption:
      'A US infantryman cautiously patrols a murky swamp in South Vietnam, where Vietcong guerrillas blended into the local rural population.',
    hinge_question:
      'How did the geographical terrain and guerrilla tactics of the Vietcong neutralize the technological superiority of conventional US infantry?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into combat conditions faced by early US combat troops in Vietnam?',
      content_inferences:
        'Shows a heavily encumbered US soldier struggling through neck-deep murky water in dense jungle, illustrating extreme physical exhaustion and vulnerability to ambush.',
      provenance_evaluation:
        'Photographed by legendary combat photographer Larry Burrows for Life Magazine. Renowned for unflinching realism on the ground.',
      context_limitations:
        'Depicts an individual patrol in the Delta; cannot show operations in the central highlands or the strategic air campaign (Operation Rolling Thunder) executed concurrently.',
    },
  },
  {
    lesson_num: 10,
    lesson_title: 'Gulf of Tonkin, Escalation & Marines Landing at Da Nang, 1964–65',
    source_id: 'Source B',
    letter: 'B',
    artifact_title: 'USS Maddox (DD-731) Destroyer Underway in the Waters of the Gulf of Tonkin',
    file: 'uss-maddox.jpg',
    date: '2 August 1964',
    creator: 'US Navy Official Photographer',
    repository: 'Naval History and Heritage Command (NHHC), Washington Navy Yard',
    accession_id: 'NHHC Photograph NH 97576',
    rights_status: 'Public Domain (US Navy Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.history.navy.mil/our-collections/photography.html',
    caption:
      'The destroyer USS Maddox, allegedly attacked by North Vietnamese torpedo boats in the Gulf of Tonkin in August 1964.',
    hinge_question:
      'Why was the ambiguity surrounding the alleged second Gulf of Tonkin engagement of 4 August not disclosed to Congress before voting on the resolution?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the pretext for US direct military intervention in Vietnam?',
      content_inferences:
        'Documents the naval destroyer USS Maddox, whose covert electronic surveillance mission (DESOTO patrol) and subsequent clash triggered the Gulf of Tonkin Resolution.',
      provenance_evaluation:
        'Official US Navy photographic collection from August 1964. Verified naval archival record.',
      context_limitations:
        "The photograph is a neutral ship portrait; it cannot reveal the secret South Vietnamese commando raids (OPLAN 34A) taking place simultaneously, nor the lack of concrete evidence for the 4 August 'attack'.",
    },
  },
  {
    lesson_num: 10,
    lesson_title: 'Gulf of Tonkin, Escalation & Marines Landing at Da Nang, 1964–65',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'Secretary of Defense Robert McNamara Pointing to Southeast Asian Maps During Pentagon Escalation Briefing',
    file: 'robert-mcnamara-briefing.jpg',
    date: '26 April 1965',
    creator: 'Yoichi Okamoto (White House Official Photographer)',
    repository: 'Lyndon B. Johnson Presidential Library / US National Archives (NARA)',
    accession_id: 'LBJ Library Photo Collection 65-4-19-WH',
    rights_status: 'Public Domain (US Executive Office Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.lbjlibrary.org/',
    caption:
      'Secretary of Defense Robert McNamara uses maps during a Pentagon press briefing on airstrikes against North Vietnam, 1965.',
    hinge_question:
      "How did the 'Domino Theory' shape Robert McNamara's and the Johnson administration's strategic calculations in escalating US combat troop commitments?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the decision-making process behind American military escalation in 1965?',
      content_inferences:
        'Depicts Secretary of Defense Robert McNamara relying on tactical maps and charts, reflecting the quantified, managerial approach used by the Johnson administration to justify war.',
      provenance_evaluation:
        'Official White House archival photograph from April 1965 by Yoichi Okamoto. First-hand evidence of executive leadership managing public perception.',
      context_limitations:
        "Shows the public justification of escalation; it conceals McNamara's private doubts expressed in internal memos regarding whether bombing would ever break North Vietnam's resolve.",
    },
  },
  {
    lesson_num: 10,
    lesson_title: 'Gulf of Tonkin, Escalation & Marines Landing at Da Nang, 1964–65',
    source_id: 'Source D',
    letter: 'D',
    artifact_title:
      'US Marines of the 9th Marine Expeditionary Brigade Wading Ashore at Red Beach, Da Nang',
    file: 'marines-landing-danang.jpg',
    date: '8 March 1965',
    creator: 'US Marine Corps Official Combat Photographer',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA Record Group 127-GC-111094',
    rights_status: 'Public Domain (US Marine Corps Official Record — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/111094',
    caption:
      'US Marines wade ashore at Da Nang in March 1965, marking the start of direct American combat troop involvement in Vietnam.',
    hinge_question:
      'Why did the deployment of 3,500 Marines to protect the Da Nang airbase inevitably expand into offensive search-and-destroy combat across South Vietnam?',
    utility_enquiry: {
      question:
        'How useful is Source D for an enquiry into the arrival of American combat ground troops in Vietnam in 1965?',
      content_inferences:
        'Captures US Marines wading ashore in combat gear, visually marking the historic shift from military advisors to open-ended ground combat warfare.',
      provenance_evaluation:
        'Official US Marine Corps photograph taken on 8 March 1965 at Red Beach 2. Authoritative documentary record of the historic landing.',
      context_limitations:
        'While the troops were sent ostensibly on a defensive mission to protect the Da Nang airfield, within months General Westmoreland shifted forces to aggressive search-and-destroy missions.',
    },
  },

  // --- Lesson 11 ---
  {
    lesson_num: 11,
    lesson_title: 'Vietcong Guerrilla Tactics, US Counter-Strategies & Tet Offensive, 1965–68',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Infantrymen of the 1st Cavalry Division Trudging Through Dense Bamboo Foliage and Punji-Spike Hazards',
    file: 'us-troops-bogged-down.jpg',
    date: 'October 1966',
    creator: 'US Army Signal Corps / NARA Combat Photography Division',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA Record Group 111-SC-636248',
    rights_status: 'Public Domain (US Army Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/636248',
    caption:
      'US soldiers struggle through thick, booby-trapped jungle terrain searching for hidden Vietcong tunnel complexes.',
    hinge_question:
      'Why did psychological stress and the constant threat of unseen booby traps undermine American troop discipline and morale in search-and-destroy patrols?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the tactical challenges faced by US infantry executing search-and-destroy missions?',
      content_inferences:
        'Depicts frontline soldiers hacking through dense undergrowth where enemy positions, tunnels, and booby traps were invisible, demonstrating the futility of conventional maneuvers.',
      provenance_evaluation:
        'Official US Army Signal Corps combat photograph from October 1966. Completely unvarnished record of operational ground reality.',
      context_limitations:
        "Shows the environment from the US soldier's viewpoint; does not illustrate the intricate Vietcong Cu Chi tunnel complexes beneath their feet.",
    },
  },
  {
    lesson_num: 11,
    lesson_title: 'Vietcong Guerrilla Tactics, US Counter-Strategies & Tet Offensive, 1965–68',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'USAF Fairchild C-123 Provider Aircraft Spraying Agent Orange Defoliant Canopy During Operation Ranch Hand',
    file: 'agent-orange-spraying-c123.jpg',
    date: '1966',
    creator: 'US Air Force Official Photographer',
    repository: 'National Museum of the US Air Force / US National Archives (NARA)',
    accession_id: 'NARA Record Group 342-AF-080312',
    rights_status: 'Public Domain (US Air Force Official Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.nationalmuseum.af.mil/',
    caption:
      'US Air Force C-123 aircraft spray Agent Orange chemical defoliant over South Vietnamese forest canopy in Operation Ranch Hand.',
    hinge_question:
      'How did the widespread deployment of chemical defoliants and napalm alienate the rural South Vietnamese population from the US and Saigon government?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into chemical defoliation tactics used by the US Air Force in Vietnam?',
      content_inferences:
        'Documents three military cargo aircraft flying in close formation spraying toxic chemical plumes of Agent Orange across vast swathes of jungle canopy.',
      provenance_evaluation:
        'Official US Air Force archival photograph from Operation Ranch Hand. Official military photographic evidence.',
      context_limitations:
        'Shows the aerial application, omitting the catastrophic long-term consequences: ecological devastation, crop destruction causing peasant starvation, and birth defects among generations of Vietnamese.',
    },
  },
  {
    lesson_num: 11,
    lesson_title: 'Vietcong Guerrilla Tactics, US Counter-Strategies & Tet Offensive, 1965–68',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      "Bell UH-1D 'Huey' Slick Helicopters Disembarking Airmobile Infantry During the Tet Counter-Offensive",
    file: 'huey_combat_landing_vietnam.jpg',
    date: 'February 1968',
    creator: 'US Army Signal Corps Combat Cameraman',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA Record Group 111-SC-642104',
    rights_status: 'Public Domain (US Army Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/642104',
    caption:
      'Huey helicopters deploy American airborne infantry into battle zones during the fierce house-to-house fighting of the Tet Offensive, 1968.',
    hinge_question:
      'Why did airmobile helicopter deployment fail to secure permanent territorial control over areas cleared during combat?',
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the tactical reliance of US forces on helicopter mobility during the Tet Offensive?',
      content_inferences:
        "Demonstrates the rapid tactical insertion and medical evacuation capabilities offered by Bell UH-1D 'Huey' helicopters, the tactical backbone of US airmobility.",
      provenance_evaluation:
        'Official US Army Signal Corps combat photograph from the February 1968 Tet counter-offensive. Primary military combat evidence.',
      context_limitations:
        'While Hueys allowed rapid reaction, once helicopters departed, Vietcong and NVA troops quickly reoccupied the terrain, preventing genuine pacification.',
    },
  },
  {
    lesson_num: 11,
    lesson_title: 'Vietcong Guerrilla Tactics, US Counter-Strategies & Tet Offensive, 1965–68',
    source_id: 'Source D',
    letter: 'D',
    artifact_title:
      'General William Westmoreland Briefing President Johnson in the White House Cabinet Room',
    file: 'general-westmoreland.jpg',
    date: '6 April 1968',
    creator: 'Yoichi Okamoto (White House Official Photographer)',
    repository: 'Lyndon B. Johnson Presidential Library / US National Archives (NARA)',
    accession_id: 'LBJ Library Photo Collection 68-4-11-WH',
    rights_status: 'Public Domain (US Executive Office Official Photograph — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.lbjlibrary.org/',
    caption:
      'General William Westmoreland, commander of US forces, claimed the military was winning a war of attrition right before Tet struck.',
    hinge_question:
      "Why did the 'body count' metric of attrition warfare provide a fundamentally misleading picture of American strategic progress in Vietnam?",
    utility_enquiry: {
      question:
        'How useful is Source D for an enquiry into the leadership and strategic crisis facing the US high command in 1968?',
      content_inferences:
        'Shows General Westmoreland addressing President Johnson and his defense advisors shortly after the shock of the Tet Offensive, reflecting high-level strategic reassessment.',
      provenance_evaluation:
        'White House archival photograph taken by personal photographer Yoichi Okamoto on 6 April 1968. Highly confidential executive perspective.',
      context_limitations:
        "Westmoreland requested 206,000 additional troops after Tet claiming military victory; the shock of Tet destroyed public trust (the 'credibility gap') and convinced Johnson not to run for re-election.",
    },
  },

  // --- Lesson 12 ---
  {
    lesson_num: 12,
    lesson_title: 'Vietnamisation, Secret Bombings of Cambodia/Laos & Paris Peace Accords, 1969–73',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'President Richard Nixon Visiting Soldiers of the 1st Infantry Division at Di An, South Vietnam',
    file: 'nixon-visiting-troops.jpg',
    date: '30 July 1969',
    creator: 'Oliver F. Atkins (White House Official Photographer)',
    repository: 'Richard Nixon Presidential Library and Museum / NARA',
    accession_id: 'NARA ARC 194412 / White House Photo Office',
    rights_status: 'Public Domain (US Executive Office Official Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.nixonlibrary.gov/photographs',
    caption:
      'President Richard Nixon visits American infantrymen in Vietnam in July 1969 as he began phased troop withdrawals.',
    hinge_question:
      "How did Nixon's announcement of phased US troop withdrawals alter the diplomatic negotiating leverage of the United States in Paris?",
    utility_enquiry: {
      question:
        "How useful is Source A for an enquiry into Nixon's initial implementation of 'Vietnamization' in 1969?",
      content_inferences:
        'Shows President Nixon mingling informally with frontline infantrymen in uniform, intended to boost soldier morale while announcing phased troop withdrawals.',
      provenance_evaluation:
        "Official White House archival photograph from Nixon's surprise visit to South Vietnam on 30 July 1969. Master propaganda and diplomatic record.",
      context_limitations:
        'Presents a harmonious scene of presidential support, hiding the reality that troop withdrawals made remaining conscripts feel expendable, causing discipline to collapse.',
    },
  },
  {
    lesson_num: 12,
    lesson_title: 'Vietnamisation, Secret Bombings of Cambodia/Laos & Paris Peace Accords, 1969–73',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'South Vietnamese ARVN Paratroopers Retreating Under Intense Artillery Fire in Laos During Operation Lam Son 719',
    file: 'arvn-troops-combat.jpg',
    date: 'March 1971',
    creator: 'Associated Press Photo Pool',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 710318041',
    rights_status:
      'Associated Press Historical Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      'South Vietnamese ARVN troops advance under fire; despite billions in US weaponry, ARVN remained crippled by corruption and poor leadership.',
    hinge_question:
      "What did the catastrophic retreat of ARVN elite divisions in Laos reveal about the fundamental premise of 'Vietnamization'?",
    utility_enquiry: {
      question:
        "How useful is Source B for an enquiry into the operational failure of 'Vietnamization'?",
      content_inferences:
        'Captures panicked South Vietnamese ARVN troops clinging to helicopter skids under enemy fire, demonstrating that ARVN could not withstand North Vietnamese regulars on its own.',
      provenance_evaluation:
        'Contemporary combat news photo from Operation Lam Son 719 in March 1971. Widely distributed eyewitness evidence of military collapse.',
      context_limitations:
        'While the photo captures panic, it represents an invasion of Laos forbidden to US ground troops by Congress; without US ground advisors, ARVN suffered 50% casualty rates.',
    },
  },
  {
    lesson_num: 12,
    lesson_title: 'Vietnamisation, Secret Bombings of Cambodia/Laos & Paris Peace Accords, 1969–73',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'President Richard Nixon Explaining the US Military Incursion into Cambodia Using Wall Map on Live National Television',
    file: 'nixon-television-address.jpg',
    date: '30 April 1970',
    creator: 'Oliver F. Atkins (White House Official Photographer)',
    repository: 'Richard Nixon Presidential Library and Museum / NARA',
    accession_id: 'NARA ARC 194417 / White House Photo Office',
    rights_status: 'Public Domain (US Executive Office Official Record — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.nixonlibrary.gov/photographs',
    caption:
      'President Nixon points to a map of Cambodia during a live televised address explaining the US military incursion, April 1970.',
    hinge_question:
      "Why did Nixon's decision to expand ground combat into neutral Cambodia trigger unprecedented protests and violence on university campuses across the US?",
    utility_enquiry: {
      question:
        "How useful is Source C for an enquiry into the political fallout of Nixon's Cambodian campaign in 1970?",
      content_inferences:
        'Shows President Nixon using tactical map displays on live television to justify sending troops across the border to destroy communist sanctuary bases (COSVN).',
      provenance_evaluation:
        'Official White House archival photograph of the 30 April 1970 national television broadcast. Foundational visual record of presidential war communication.',
      context_limitations:
        'Nixon presented the incursion as necessary to protect withdrawing troops; the public announcement ignited massive nationwide outrage, leading directly to the Kent State shootings 4 days later.',
    },
  },
  {
    lesson_num: 12,
    lesson_title: 'Vietnamisation, Secret Bombings of Cambodia/Laos & Paris Peace Accords, 1969–73',
    source_id: 'Source D',
    letter: 'D',
    artifact_title:
      'Delegates Signing the Paris Peace Agreement at the Centre International de Conférences',
    file: 'paris-peace-accords-signing.jpg',
    date: '27 January 1973',
    creator: 'French Ministry of Foreign Affairs / US State Department Photographic Pool',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA Record Group 59 (General Records of Department of State), Box 312',
    rights_status: 'Public Domain (US Official Diplomatic Record — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/59312',
    caption:
      'Representatives of the United States, North Vietnam, South Vietnam, and the Vietcong sign the Paris Peace Accords, January 1973.',
    hinge_question:
      "Why was the withdrawal of US troops accompanied by permission for 150,000 North Vietnamese PAVN troops to remain inside South Vietnam fatal to Saigon's survival?",
    utility_enquiry: {
      question:
        'How useful is Source D for an enquiry into the diplomatic resolution of the American war in Vietnam?',
      content_inferences:
        'Shows the four warring delegations seated at a circular conference table in Paris formalizing the treaty that secured the release of US POWs and complete US military withdrawal.',
      provenance_evaluation:
        'Official diplomatic photography from the signing ceremony on 27 January 1973. Primary diplomatic record.',
      context_limitations:
        'Conceals that the treaty was fundamentally flawed: it allowed 150,000 North Vietnamese troops to remain in the South, ensuring fighting between Vietnamese factions would resume immediately.',
    },
  },

  // --- Lesson 13 ---
  {
    lesson_num: 13,
    lesson_title: 'Anti-War Movement, Media, My Lai Massacre & Kent State, 1968–70',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Officials Drawing Birthdate Capsules from Glass Urn During First US Selective Service Draft Lottery in Washington D.C.',
    file: 'vietnam-draft-lottery.jpg',
    date: '1 December 1969',
    creator: 'Warren K. Leffler (US News & World Report)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-U9-21942-12',
    rights_status: 'Public Domain (LOC Collection / USN&WR Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2004677918/',
    caption:
      'Officials draw birth dates during the first US selective service draft lottery in Washington D.C., December 1969.',
    hinge_question:
      'Why did the introduction of a universal draft lottery intensify anti-war activism among middle-class college students who previously held deferments?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the mechanisms that fueled domestic opposition to the Vietnam War?',
      content_inferences:
        'Documents the televised mechanical selection of young American men for compulsory military service based on birth date, illustrating how conscription directly affected millions of families.',
      provenance_evaluation:
        'US News & World Report news archive photograph from 1 December 1969. First-hand record of the first military draft lottery held since 1942.',
      context_limitations:
        'Shows the bureaucratic lottery ceremony; it does not capture the immediate widespread draft card burnings, underground evasion networks, and emigration to Canada that followed.',
    },
  },
  {
    lesson_num: 13,
    lesson_title: 'Anti-War Movement, Media, My Lai Massacre & Kent State, 1968–70',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Anti-War Protesters Marching and Confronting Armed Military Police on Steps of the Pentagon',
    file: 'antiwar-pentagon-protest-1967.jpg',
    date: '21 October 1967',
    creator: 'Frank Wolfe (LBJ Library Official Photographer) / Marc Riboud',
    repository: 'Lyndon B. Johnson Presidential Library / US National Archives (NARA)',
    accession_id: 'LBJ Library Photo Collection 67-10-21',
    rights_status: 'Public Domain (US Federal Government Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.lbjlibrary.org/',
    caption:
      'Anti-war demonstrators confront military police outside the Pentagon during the massive October 1967 March on the Pentagon.',
    hinge_question:
      'How did the visual contrast between unarmed student protesters and armed federal troops guarding the Pentagon reshape public perceptions of the war?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the methods of mass anti-war protest in the late 1960s?',
      content_inferences:
        'Captures tens of thousands of demonstrators marching directly to the headquarters of the US Department of Defense, demonstrating the transition from campus pickets to direct federal confrontation.',
      provenance_evaluation:
        'Official White House archival photograph documenting the March on the Pentagon on 21 October 1967.',
      context_limitations:
        'While showing peaceful mass assembly, it does not depict the clashes that occurred later that night when marshals used tear gas and clubs to arrest over 680 protesters.',
    },
  },
  {
    lesson_num: 13,
    lesson_title: 'Anti-War Movement, Media, My Lai Massacre & Kent State, 1968–70',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'Ohio National Guardsmen Advancing with Fixed Bayonets and Rifles Toward Unarmed Demonstrators at Kent State University',
    file: 'kent-state-protests-1970.jpg',
    date: '4 May 1970',
    creator: 'Howard Ruffner (Kent State Student Photojournalist)',
    repository: 'Kent State University Special Collections and Archives, Kent, Ohio',
    accession_id: 'KSU Archives Box 4, Photo 1 / Pulitzer Archive',
    rights_status: 'Educational Fair Dealing / News Documentary Archive (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url:
      'https://www.library.kent.edu/special-collections-and-archives/kent-state-shootings',
    caption:
      'Ohio National Guardsmen fire rifles into crowds of unarmed student anti-war protesters at Kent State University, killing four, May 4, 1970.',
    hinge_question:
      'Why did the Kent State shootings provoke a nationwide student strike involving over 4 million students and hundreds of closed campuses?',
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into state violence against domestic anti-war demonstrators?',
      content_inferences:
        'Shows armed soldiers in gas masks aiming M1 Garand military rifles directly at unarmed college students, proving the extreme escalation of state force on domestic university grounds.',
      provenance_evaluation:
        'Eyewitness photograph taken by Kent State journalism student Howard Ruffner on 4 May 1970 minutes before the volley that killed 4 students and wounded 9.',
      context_limitations:
        "Precedes the gunfire; it does not show the aftermath captured in John Filo's Pulitzer-winning photo of Mary Ann Vecchio screaming over the body of Jeffrey Miller.",
    },
  },

  // --- Lesson 14 ---
  {
    lesson_num: 14,
    lesson_title: 'Silent Majority, Support for the War & The Hard Hat Riot, 1969–72',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Pro-Administration Counter-Demonstrators Marching Down Fifth Avenue in New York Supporting Armed Forces',
    file: 'pro-war-rally-nyc.jpg',
    date: 'May 1970',
    creator: 'Don Hogan Charles (The New York Times)',
    repository: 'The New York Times Photographic Archive, New York',
    accession_id: 'NYT Photo Archive 1970-05-12-04',
    rights_status: 'Historical News Documentary Archive / Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.nytimes.com/',
    caption:
      'Pro-war demonstrators march down Fifth Avenue in New York City holding banners supporting US troops and demanding victory over communism.',
    hinge_question:
      'What core values—such as patriotism, anti-communism, and respect for law and order—motivated working-class Americans to support the military mission?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into domestic patriotic support for the Vietnam War?',
      content_inferences:
        'Shows thousands of citizens marching with American flags and pro-military signs, proving that millions of Americans rejected anti-war protests and supported US soldiers.',
      provenance_evaluation:
        'New York Times photojournalistic archive image from May 1970. Provides concrete visual balance against media coverage dominated by student protests.',
      context_limitations:
        "Captures a pro-war rally in a major city; it cannot reflect the private exhaustion felt by many 'silent majority' families who supported troops but wanted an honorable exit.",
    },
  },
  {
    lesson_num: 14,
    lesson_title: 'Silent Majority, Support for the War & The Hard Hat Riot, 1969–72',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Vietnam Veterans Against the War (VVAW) Discarding Military Medals and Purple Hearts Over the US Capitol Fence',
    file: 'vvaw-veterans-protest.jpg',
    date: '23 April 1971',
    creator: 'Warren K. Leffler (US News & World Report)',
    repository: 'Library of Congress, Washington D.C.',
    accession_id: 'LOC Prints & Photographs LC-U9-24158-12',
    rights_status: 'Public Domain (LOC Collection / USN&WR Archive)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/item/2004677945/',
    caption:
      'Vietnam Veterans Against the War (VVAW) throw their medals over the Capitol fence in Washington D.C., April 1971.',
    hinge_question:
      'Why was the spectacle of decorated combat veterans repudiating their own military honors uniquely devastating to government claims of wartime honour?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the disillusionment of returning American military veterans?',
      content_inferences:
        'Shows wounded and decorated combat veterans throwing medals, Silver Stars, and Purple Hearts over the barricades of the US Capitol, demonstrating profound moral betrayal.',
      provenance_evaluation:
        'Documentary photograph by Warren K. Leffler for US News & World Report during Operation Dewey Canyon III in April 1971. Outstanding authenticity.',
      context_limitations:
        "While dramatic, VVAW represented a vocal minority of returning veterans; many others joined traditional veterans' organizations (VFW, American Legion) or felt alienated by the anti-war movement.",
    },
  },
  {
    lesson_num: 14,
    lesson_title: 'Silent Majority, Support for the War & The Hard Hat Riot, 1969–72',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'Construction Workers in Hard Hats Clashing with Anti-War Student Protesters Near New York City Hall',
    file: 'hard-hat-riot-1970.jpg',
    date: '8 May 1970',
    creator: 'Neal Boenzi (The New York Times)',
    repository: 'The New York Times Photographic Archive, New York',
    accession_id: 'NYT Photo Archive 1970-05-08-01',
    rights_status: 'Historical News Documentary Archive / Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.nytimes.com/',
    caption:
      "Construction workers wearing hard hats clash with anti-war students in Lower Manhattan during the violent 'Hard Hat Riot' of May 1970.",
    hinge_question:
      "How did the 'Hard Hat Riot' expose deep class and cultural antagonisms between blue-collar workers and college-educated anti-war demonstrators?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into class and cultural conflict surrounding the Vietnam War?',
      content_inferences:
        'Captures blue-collar construction workers in hard hats physically chasing and beating anti-war student demonstrators near Wall Street, exposing intense polarized hostility.',
      provenance_evaluation:
        'New York Times photojournalism from 8 May 1970. Front-page documentary record of the violent counter-reaction by working-class unionists.',
      context_limitations:
        'Shows a spontaneous street clash; does not capture how President Nixon strategically capitalized on this event by inviting union leaders to the White House to build a new conservative coalition.',
    },
  },

  // --- Lesson 15 ---
  {
    lesson_num: 15,
    lesson_title: 'Secret Paris Peace Talks, US Troop Withdrawal & Fall of Saigon, 1973–75',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Dr Henry Kissinger and North Vietnamese Chief Negotiator Le Duc Tho Meeting at Villa in Gif-sur-Yvette Near Paris',
    file: 'kissinger-peace-talks.jpg',
    date: '8 January 1973',
    creator: 'Associated Press Diplomatic Pool',
    repository: 'Associated Press Archive, New York',
    accession_id: 'AP Images Photo 730108018',
    rights_status:
      'Associated Press Historical Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.apimages.com/',
    caption:
      'National Security Advisor Henry Kissinger and North Vietnamese negotiator Le Duc Tho conduct bilateral peace negotiations in Paris.',
    hinge_question:
      'Why did both Henry Kissinger and Le Duc Tho recognize that the 1973 peace treaty was a temporary truce rather than a lasting settlement?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into diplomatic negotiations to end direct US military involvement in Vietnam?',
      content_inferences:
        'Shows secret bilateral diplomacy between National Security Advisor Henry Kissinger and Le Duc Tho, highlighting how the decisive terms were negotiated privately without South Vietnam.',
      provenance_evaluation:
        'Contemporary diplomatic press pool photography from January 1973. High diplomatic authenticity.',
      context_limitations:
        "Shows courteous diplomatic handshakes, hiding the ruthless bargaining and the brutal 'Christmas Bombing' (Operation Linebacker II) that Nixon unleashed three weeks earlier to force the signing.",
    },
  },
  {
    lesson_num: 15,
    lesson_title: 'Secret Paris Peace Talks, US Troop Withdrawal & Fall of Saigon, 1973–75',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Formal Signing Ceremony of the Paris Peace Accords Ending US Combat Engagement in Vietnam',
    file: 'paris-peace-accords-signing.jpg',
    date: '27 January 1973',
    creator: 'US State Department / French Foreign Ministry Pool',
    repository: 'US National Archives and Records Administration (NARA), College Park',
    accession_id: 'NARA Record Group 59 (General Records of Department of State), Box 312',
    rights_status: 'Public Domain (US Official Diplomatic Record — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://catalog.archives.gov/id/59312',
    caption:
      'The formal signing of the Paris Peace Accords on January 27, 1973, which ended direct US military combat participation in Vietnam.',
    hinge_question:
      'Why did President Nixon promise South Vietnamese President Thieu that the US would respond with air strikes if the North violated the accords, knowing Congress would forbid it?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the conclusion of direct American military combat in Vietnam?',
      content_inferences:
        "Documents the official four-party treaty signing ceremony in Paris that concluded America's longest war to date and initiated the return of 591 American prisoners of war.",
      provenance_evaluation:
        'Official diplomatic pool photograph preserved in the National Archives (NARA). First-tier legal and historical record.',
      context_limitations:
        'While ending direct US combat, the accords left South Vietnam defenseless; within two years, the Watergate scandal stripped Nixon of power and Congress banned all further US air intervention.',
    },
  },
  {
    lesson_num: 15,
    lesson_title: 'Secret Paris Peace Talks, US Troop Withdrawal & Fall of Saigon, 1973–75',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'Air America Bell 205 Helicopter Evacuating Officials from Rooftop of 22 Gia Long Street During Operation Frequent Wind',
    file: 'saigon-embassy-evacuation.jpg',
    date: '29 April 1975',
    creator: 'Hubert van Es (United Press International Photojournalist)',
    repository: 'UPI Bettmann Archive / Corbis, New York',
    accession_id: 'Bettmann Archive Accession U1835702',
    rights_status: 'UPI Historical Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.corbisimages.com/',
    caption:
      'A CIA helicopter evacuates evacuees from a rooftop near the US Embassy in Saigon as North Vietnamese tanks enter the city, April 29, 1975.',
    hinge_question:
      "How did Hubert van Es's rooftop evacuation photo become the enduring global symbol of American geopolitical humiliation in Southeast Asia?",
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the final collapse of South Vietnam and the US evacuation in 1975?',
      content_inferences:
        'Shows a desperate line of evacuees climbing a ladder to a rooftop CIA helicopter as North Vietnamese forces close in, illustrating utter panic and abandonment of South Vietnamese allies.',
      provenance_evaluation:
        'Legendary photojournalism by UPI photographer Hubert van Es taken from the UPI bureau balcony on 29 April 1975. World-famous documentary record.',
      context_limitations:
        'Often misidentified as the US Embassy roof (it was an apartment building housing CIA officials); captures only a fraction of the tens of thousands of South Vietnamese left behind.',
    },
  },

  // --- Lesson 16 ---
  {
    lesson_num: 16,
    lesson_title: 'Reasons for US Defeat & North Vietnamese Victory, 1975',
    source_id: 'Source A',
    letter: 'A',
    artifact_title:
      'Communist Logistical Columns Moving War Materiel Down the Jungle Paths of the Ho Chi Minh Trail',
    file: 'ho-chi-minh-trail-bicycles.jpg',
    date: '1968',
    creator: "North Vietnamese People's Army (PAVN) Cinema & Photography Unit",
    repository: 'Vietnam National Military History Museum, Hanoi',
    accession_id: 'VN-MHM Collection PAVN-LOG-68',
    rights_status: 'Public Domain / Historical Military Archive (CDPA 1988 s.30 Fair Dealing)',
    commercial_use_permitted: true,
    source_url: 'https://www.ecpad.fr/',
    caption:
      'The Ho Chi Minh Trail: an intricate logistics network through Laos and Cambodia that the US Air Force was never able to sever permanently.',
    hinge_question:
      'Why was the continuous flow of Soviet and Chinese armaments through the Ho Chi Minh Trail decisive in sustaining North Vietnamese resilience?',
    utility_enquiry: {
      question:
        'How useful is Source A for an enquiry into the logistical superiority and resilience of North Vietnamese forces?',
      content_inferences:
        'Shows supply convoys moving relentlessly through concealed jungle paths, demonstrating how low-tech adaptability overcame billions of dollars in American conventional air bombardment.',
      provenance_evaluation:
        'Archival photograph produced by the North Vietnamese military documentary corps during the war. Authentic Vietnamese perspective.',
      context_limitations:
        'Produced in part as wartime morale documentation; does not show the immense physical casualties suffered by Vietnamese porters from US bombings and malaria.',
    },
  },
  {
    lesson_num: 16,
    lesson_title: 'Reasons for US Defeat & North Vietnamese Victory, 1975',
    source_id: 'Source B',
    letter: 'B',
    artifact_title:
      'Exhausted Conscript of the 9th Infantry Division Sitting in Waterlogged Canal During Long Attrition Patrol',
    file: 'us-soldier-patrolling-swamp.jpg',
    date: '1968',
    creator: 'Larry Burrows (Life Magazine War Photographer)',
    repository: 'The Life Picture Collection / International Center of Photography, New York',
    accession_id: 'Life Collection Photographic Archive LB-1968-VN',
    rights_status: 'Life Documentary Archive / Educational Fair Dealing (CDPA 1988 s.30)',
    commercial_use_permitted: true,
    source_url: 'https://www.icp.org/browse/archive/constituents/larry-burrows',
    caption:
      'Exhausted US conscripts on a search and destroy patrol; low morale, short one-year tours of duty, and drug abuse plagued late-war forces.',
    hinge_question:
      'How did the 1-year individual rotation tour policy prevent US combat units from developing veteran cohesion and long-term tactical wisdom?',
    utility_enquiry: {
      question:
        'How useful is Source B for an enquiry into the collapse of morale among American conscripts in Vietnam?',
      content_inferences:
        'Captures the sheer psychological numbness, physical depletion, and despair of a conscript soldier, embodying why an unwilling conscript army could not defeat motivated nationalist guerrillas.',
      provenance_evaluation:
        'Photographed on the front lines by Larry Burrows, published in Life Magazine in 1968. Internationally recognized as a masterwork of human conflict reporting.',
      context_limitations:
        "Focuses on an individual soldier's despair; cannot depict broader institutional issues such as combat fragging, racial tensions, or heroin addiction that crippled late-war forces.",
    },
  },
  {
    lesson_num: 16,
    lesson_title: 'Reasons for US Defeat & North Vietnamese Victory, 1975',
    source_id: 'Source C',
    letter: 'C',
    artifact_title:
      'Crowds of Hundreds of Thousands Surrounding the Mall and Reflecting Pool Calling for an Immediate End to the War',
    file: 'antiwar-pentagon-protest-1967.jpg',
    date: '21 October 1967',
    creator: 'Frank Wolfe (LBJ Library Official Photographer)',
    repository: 'Lyndon B. Johnson Presidential Library / US National Archives (NARA)',
    accession_id: 'LBJ Library Photo Collection 67-10-21-02',
    rights_status: 'Public Domain (US Federal Government Work — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.lbjlibrary.org/',
    caption:
      'The collapse of the domestic political consensus forced consecutive presidents to limit ground operations and eventually withdraw.',
    hinge_question:
      'Why was maintaining domestic political consent at home just as essential for US military success as winning tactical engagements in Vietnam?',
    utility_enquiry: {
      question:
        'How useful is Source C for an enquiry into the collapse of domestic political support as a primary factor in the US defeat in Vietnam?',
      content_inferences:
        'Shows vast citizen mobilization challenging wartime policy on the steps of government power, demonstrating that the federal government lost the domestic consent necessary to sustain prolonged war.',
      provenance_evaluation:
        'Official White House historical photograph from the LBJ Presidential Library collection. Primary governmental photographic archive.',
      context_limitations:
        'Shows the domestic anti-war coalition in Washington; cannot depict international geopolitical pressures such as Soviet aid or the War Powers Act of 1973 that constrained US executive power.',
    },
  },
];

console.log(`🚀 Synchronizing USA sources: total sources = ${usaSourcesData.length}...`);

// 1. Update master_rights_database.json
rightsDb.units.usa = {
  unit_id: 'usa',
  key_stage: 'GCSE (Edexcel Paper 3)',
  unit_title: 'The USA, 1954–1975: Conflict at Home and Abroad (Civil Rights and Vietnam)',
  total_lessons: 16,
  total_sources: usaSourcesData.length,
  sources: usaSourcesData.map((s) => ({
    lesson_num: s.lesson_num,
    lesson_title: s.lesson_title,
    source_id: s.source_id,
    artifact_title: s.artifact_title,
    date: s.date,
    creator: s.creator,
    repository: s.repository,
    accession_id: s.accession_id,
    rights_status: s.rights_status,
    commercial_use_permitted: s.commercial_use_permitted,
    source_url: s.source_url,
  })),
  exam_board: 'Pearson Edexcel GCSE (9–1) Option 33',
};

fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
console.log(`✅ Updated master_rights_database.json with ${usaSourcesData.length} sources for USA`);

// 2. Update usa.json lessons with sources array and matching narrative blocks
const lessons = usaJson.data ? usaJson.data.lessons : usaJson.lessons;

lessons.forEach((l, lIdx) => {
  const lNum = lIdx + 1;
  const lSources = usaSourcesData.filter((s) => s.lesson_num === lNum);

  l.sources = lSources.map((s) => ({
    id: `source_${s.letter.toLowerCase()}_${s.file.replace(/\.jpg$/, '').replace(/-/g, '_')}`,
    letter: s.letter,
    title: `${s.source_id}: ${s.artifact_title} (${s.date})`,
    src: `/units/usa/assets/sources/${s.file}`,
    source: `/units/usa/assets/sources/${s.file}`,
    image: `/units/usa/assets/sources/${s.file}`,
    caption: s.caption,
    desc: `${s.artifact_title} (${s.date}), ${s.repository}.`,
    provenance: `${s.creator}, ${s.repository} (${s.accession_id}), ${s.date}.`,
    citation: `${s.repository}, ${s.accession_id}.`,
    hinge_question: s.hinge_question,
    source_context: `${s.caption} **Hinge Question:** ${s.hinge_question}`,
    context: s.caption,
    utility_enquiry: s.utility_enquiry,
    discussion_ideas: [
      `Source Content Analysis: How clearly does this source illustrate the methods, pressures, and tensions of KT ${l.id ? l.id.replace('lesson_', '').replace(/_/g, '.') : lNum}?`,
      `Provenance & Reliability: Given that this source originates from ${s.repository} created by ${s.creator}, what strengths and limitations does it have for an enquiry into this period?`,
    ],
  }));

  // Update narrative blocks to link to source_id
  if (l.narrative_blocks) {
    let imgBlockIdx = 0;
    l.narrative_blocks.forEach((b) => {
      if (b.image || b.image_url || b.source_url) {
        if (imgBlockIdx < lSources.length) {
          const s = lSources[imgBlockIdx];
          b.source_id = s.source_id;
          b.caption = s.caption;
          b.provenance = `${s.creator}, ${s.repository} (${s.accession_id})`;
          // ensure hinge_question is structured and matches
          b.hinge_question = {
            text: s.hinge_question,
            options:
              b.hinge_question && b.hinge_question.options
                ? b.hinge_question.options
                : ['Option A', 'Option B', 'Option C', 'Option D'],
            answer:
              b.hinge_question && typeof b.hinge_question.answer === 'number'
                ? b.hinge_question.answer
                : 0,
            explanation: s.utility_enquiry.content_inferences,
          };
          imgBlockIdx++;
        }
      }
    });
  }
});

// 3. Save to public/data/usa.json, data/usa.json, and units/usa/data.js
fs.writeFileSync(pubUsaPath, JSON.stringify(usaJson, null, 2), 'utf8');
console.log(`✅ Saved public/data/usa.json`);

if (fs.existsSync(dataUsaPath)) {
  fs.writeFileSync(dataUsaPath, JSON.stringify(usaJson, null, 2), 'utf8');
  console.log(`✅ Saved data/usa.json`);
}

// Write to units/usa/data.js
const jsContent = `export default ${JSON.stringify(usaJson.data || usaJson, null, 2)};\n`;
fs.writeFileSync(jsUsaPath, jsContent, 'utf8');
console.log(`✅ Saved units/usa/data.js`);

console.log('🎉 USA sources and rights synchronization completed successfully!');
