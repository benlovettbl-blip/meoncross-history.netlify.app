const fs = require('fs');
const path = require('path');

const USA_ROOT = 'C:/Projects/edexcelgcsehistoryusa.netlify.app';
const TARGET_DIR = path.join(__dirname, '..', 'units', 'usa');
const PUBLIC_USA_DIR = path.join(__dirname, '..', 'public', 'units', 'usa');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'usa');

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_USA_DIR)) fs.mkdirSync(PUBLIC_USA_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });

console.log('--- Step 1: Loading raw data from legacy USA app ---');

const lessonsDataRaw = fs.readFileSync(path.join(USA_ROOT, 'src/lessons_data.js'), 'utf8');
const keyTopicsRaw = fs.readFileSync(path.join(USA_ROOT, 'src/key_topics_data.js'), 'utf8');
const questionsRaw = fs.readFileSync(path.join(USA_ROOT, 'questions.js'), 'utf8');
const coreQRaw = fs.readFileSync(path.join(USA_ROOT, 'src/core_questions_data.js'), 'utf8');
const tradingRaw = fs.readFileSync(path.join(USA_ROOT, 'src/trading_cards_data.js'), 'utf8');

function extractExport(source, exportName) {
  const regex = new RegExp(
    `export\\s+const\\s+${exportName}\\s*=\\s*([\\s\\S]*?);\\s*(?:export|$)`,
  );
  const match = source.match(regex);
  if (!match) {
    const sub = source.substring(source.indexOf(`export const ${exportName}`));
    const eqIdx = sub.indexOf('=');
    return new Function(`return ${sub.substring(eqIdx + 1)}`)();
  }
  return new Function(`return ${match[1]}`)();
}

const LESSONS_DATA = extractExport(lessonsDataRaw, 'LESSONS_DATA');
const KEY_TOPICS_OVERVIEWS = extractExport(keyTopicsRaw, 'KEY_TOPICS_OVERVIEWS');
const QUIZ_DATA = extractExport(questionsRaw, 'QUIZ_DATA');
const PAST_PAPERS_DATA = extractExport(questionsRaw, 'PAST_PAPERS_DATA');
const CORE_QUESTIONS_DATA = extractExport(coreQRaw, 'CORE_QUESTIONS_DATA');
const TRADING_CARDS_DATA = extractExport(tradingRaw, 'TRADING_CARDS_DATA');

console.log(
  `Loaded ${Object.keys(LESSONS_DATA).length} lessons, ${Object.keys(KEY_TOPICS_OVERVIEWS).length} topics, ${PAST_PAPERS_DATA.length} past papers.`,
);

// Copy visual assets
console.log('--- Step 2: Copying visual assets ---');
const srcAssets = path.join(USA_ROOT, 'public', 'assets');
if (fs.existsSync(srcAssets)) {
  const targetAssets = path.join(PUBLIC_USA_DIR, 'assets');
  if (!fs.existsSync(targetAssets)) fs.mkdirSync(targetAssets, { recursive: true });

  const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const ent of entries) {
      const sPath = path.join(src, ent.name);
      const dPath = path.join(dest, ent.name);
      if (ent.isDirectory()) {
        copyDir(sPath, dPath);
      } else {
        fs.copyFileSync(sPath, dPath);
      }
    }
  };
  copyDir(srcAssets, targetAssets);
  console.log('Assets copied to public/units/usa/assets');
}

// Master Glossary for rigorous vocabulary definitions
const MASTER_GLOSSARY = {
  'Jim Crow':
    'Laws in the Southern US enforcing racial segregation and disenfranchisement across public life.',
  Segregation:
    'The legally or socially enforced separation of different racial groups in public facilities, housing, and schools.',
  Disenfranchisement:
    'Being deprived of a legal right or privilege, especially the constitutional right to vote.',
  NAACP:
    'National Association for the Advancement of Colored People, founded in 1909, focused on legal challenges in court.',
  CORE: 'Congress of Racial Equality, founded in 1942, which pioneered non-violent direct action protests like sit-ins.',
  'De Jure': 'Segregation that is legally enforced by statute and government policy.',
  'De Facto':
    'Segregation that exists through social custom and economic prejudice rather than explicit laws.',
  'Separate but Equal':
    'The legal doctrine from Plessy v. Ferguson (1896) declaring segregation constitutional if facilities were equal.',
  Litigation:
    'The strategy of taking legal action through federal and state courts to establish binding constitutional precedents.',
  Boycott:
    'A coordinated punitive protest where consumers refuse to buy or use a service to force social change.',
  Desegregation:
    'The process of ending the enforced separation of racial groups in public spaces and institutions.',
  'Massive Resistance':
    'A co-ordinated political campaign declared by Southern state politicians to defy and obstruct school integration.',
  Dixiecrats:
    'Conservative Southern Democrats who fiercely defended white supremacy and opposed federal civil rights legislation.',
  'Non-violent direct action':
    'Protest tactics such as sit-ins, boycotts, and peaceful marches designed to provoke moral and legal change.',
  Filibuster:
    'A Senate procedure used by Southern politicians to delay or kill civil rights bills by speaking continuously.',
  'Black Power':
    'A movement emerging after 1965 calling for Black pride, self-determination, and economic and political autonomy.',
  'Black Nationalism':
    'Advocacy of political, cultural, and economic self-sufficiency and independence for Black communities.',
  'Guerilla Warfare':
    'Unconventional military tactics using surprise ambushes, booby traps, and stealth by small mobile units.',
  Defoliant:
    'Toxic chemical herbicide (such as Agent Orange) sprayed by US aircraft to strip jungle foliage hiding enemy troops.',
  'Search and Destroy':
    'US combat strategy of inserting troops by helicopter into hostile zones to kill Vietcong and withdraw.',
  Vietnamization:
    "President Nixon's strategy of withdrawing American troops and transferring combat responsibility to the ARVN.",
  'Silent Majority':
    "Nixon's term for the large portion of the American public who supported the war quietly and opposed anti-war protests.",
  'Credibility Gap':
    'The growing divide between optimistic government statements and the grim reality of the Vietnam War on television.',
  Draft: 'Compulsory military conscription of young American men for service in the armed forces.',
  'Strategic Hamlets':
    'Fortified peasant villages constructed by Diem and the US to isolate rural populations from Vietcong influence.',
  'Peace with Honour':
    "Nixon's pledge to negotiate an American military exit from Vietnam without accepting defeat or abandoning South Vietnam.",
  Napalm:
    'A highly flammable jellied petroleum bomb that clung to surfaces and human skin, creating catastrophic fires.',
  Vietcong:
    "The National Liberation Front: communist guerrilla forces in South Vietnam fighting against Diem's regime and the USA.",
  'Ho Chi Minh Trail':
    'A complex logistical jungle supply network through Laos and Cambodia funneling weapons and troops south.',
  SCLC: 'Southern Christian Leadership Conference, an umbrella civil rights group of Southern ministers led by Martin Luther King Jr.',
  SNCC: 'Student Nonviolent Coordinating Committee, an activist youth organisation leading sit-ins, Freedom Rides, and voter registration.',
};

const KEY_INDIVIDUALS_LIST = [
  'Thurgood Marshall',
  'Earl Warren',
  'Orval Faubus',
  'James Meredith',
  'Rosa Parks',
  'Martin Luther King Jr.',
  'Martin Luther King',
  'Malcolm X',
  'Stokely Carmichael',
  'John F. Kennedy',
  'JFK',
  'Lyndon B. Johnson',
  'LBJ',
  'William Westmoreland',
  'General Westmoreland',
  'Richard Nixon',
  'Vo Nguyen Giap',
  'General Giap',
  'Henry Kissinger',
  'Ho Chi Minh',
  'Daisy Bates',
  'Elizabeth Eckford',
  'Bull Connor',
  'George Wallace',
  'Robert McNamara',
  'Ngo Dinh Diem',
];

function linkKeyIndividuals(text) {
  let res = text;
  KEY_INDIVIDUALS_LIST.forEach((name) => {
    const escaped = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(`(?<!\\[Key Individual:\\s*)\\b${escaped}\\b(?!\\])`, 'g');
    res = res.replace(regex, `[Key Individual: ${name}]`);
  });
  return res;
}

// Primary source photograph mappings for each step of every lesson
const STEP_IMAGE_MAP = {
  subtopic_1_1: [
    {
      image: '/units/usa/assets/sources/colored-waiting-room-sign.jpg',
      caption:
        "A Jim Crow sign designating a segregated 'Colored Waiting Room' in a bus terminal in the Southern United States.",
      image_context:
        'Jim Crow laws in Southern states officially enforced racial segregation in transit, waiting rooms, and restaurants. Black travelers faced immediate arrest or mob violence for entering white areas. **Hinge Question:** Why was physical separation in daily transit so crucial to the maintenance of white supremacy in the Jim Crow South?',
      hinge: {
        text: "What 1896 Supreme Court ruling established the constitutional doctrine of 'separate but equal'?",
        options: [
          'Plessy v. Ferguson',
          'Brown v. Board of Education',
          'Sweatt v. Painter',
          'Smith v. Allwright',
        ],
        answer: 0,
        explanation:
          "Plessy v. Ferguson (1896) established the 'separate but equal' doctrine, providing legal justification for Southern Jim Crow segregation until overturned in 1954.",
      },
    },
    {
      image: '/units/usa/assets/sources/warren-court-1954.jpg',
      caption:
        'The NAACP Legal Defense Fund, led by Thurgood Marshall, challenged segregation laws in the federal courts.',
      image_context:
        'Founded in 1909, the NAACP focused on challenging segregation through top-down litigation in federal courts, arguing that separate facilities violated the 14th Amendment. **Hinge Question:** Why did the NAACP prioritize establishing binding constitutional precedents over organizing mass street protests in the early 1950s?',
      hinge: {
        text: 'Which organisation pioneered non-violent direct action tactics like sit-ins and the 1947 Journey of Reconciliation?',
        options: [
          'CORE (Congress of Racial Equality)',
          'NAACP',
          "White Citizens' Council",
          'Dixiecrats',
        ],
        answer: 0,
        explanation:
          "CORE, founded in 1942, was committed to non-violent direct action protests inspired by Gandhi, contrasting with the NAACP's focus on courtroom litigation.",
      },
    },
  ],
  subtopic_1_2: [
    {
      image: '/units/usa/assets/sources/eisenhower-little-rock-speech.jpg',
      caption:
        'President Eisenhower addressing the nation on the constitutional necessity of enforcing federal court desegregation orders.',
      image_context:
        "In May 1954, the Supreme Court ruled unanimously 9-0 in Brown v. Board of Education that segregated schools were inherently unequal. **Hinge Question:** Why did the Supreme Court's phrase 'with all deliberate speed' in Brown II enable Southern school boards to delay integration for years?",
      hinge: {
        text: 'What key psychological evidence did Thurgood Marshall present to prove segregation harmed Black schoolchildren?',
        options: [
          'The Clark doll experiments',
          'Standardized test scores',
          'Southern economic surveys',
          'Military enlistment data',
        ],
        answer: 0,
        explanation:
          'The Clark doll experiments demonstrated that segregation gave Black children a damaging sense of inferiority, proving that separate educational facilities were inherently unequal.',
      },
    },
    {
      image: '/units/usa/assets/sources/airborne-little-rock-patrol.jpg',
      caption:
        "Soldiers of the 101st Airborne Division escort the 'Little Rock Nine' into Central High School, September 1957.",
      image_context:
        "Governor Orval Faubus deployed the Arkansas National Guard to block nine Black students from entering Central High School. President Eisenhower federalized the Guard and sent 1,000 elite soldiers of the 101st Airborne to protect them. **Hinge Question:** Why did Governor Faubus's defiance of the federal courts force President Eisenhower to deploy federal military troops to an American school?",
      hinge: {
        text: 'What retaliatory action did Governor Faubus take the following year (1958–59) to prevent integration?',
        options: [
          "He closed all Little Rock public high schools (the 'Lost Year')",
          'He resigned his governorship in protest',
          'He passed a new state civil rights bill',
          'He ordered the arrest of the 101st Airborne commanders',
        ],
        answer: 0,
        explanation:
          'Rather than integrate, Governor Faubus closed all public high schools in Little Rock for the entire 1958–59 academic year, leaving 4,000 students without schooling.',
      },
    },
  ],
  subtopic_1_3: [
    {
      image: '/units/usa/assets/sources/rosa-parks-fingerprint.jpg',
      caption:
        'Rosa Parks being fingerprinted by Montgomery police officers following her arrest for refusing to surrender her bus seat, December 1955.',
      image_context:
        "Rosa Parks, a respected seamstress and active NAACP secretary, was arrested on December 1, 1955, after refusing to yield her seat to a white passenger. **Hinge Question:** Why was Rosa Parks's personal reputation and active NAACP background essential for launching a successful community-wide boycott?",
      hinge: {
        text: 'Which organisation was established to coordinate the Montgomery Bus Boycott, electing Martin Luther King Jr. as president?',
        options: [
          'Montgomery Improvement Association (MIA)',
          'Student Nonviolent Coordinating Committee',
          'Congress of Racial Equality',
          'Black Panther Party',
        ],
        answer: 0,
        explanation:
          'The Montgomery Improvement Association (MIA) was formed on December 5, 1955, choosing the young 26-year-old minister Martin Luther King Jr. as its leader.',
      },
    },
    {
      image: '/units/usa/assets/sources/rosa-parks-bus-1956.jpg',
      caption:
        'Rosa Parks sitting at the front of a newly integrated Montgomery city bus following the Browder v. Gayle ruling, December 1956.',
      image_context:
        "The boycott lasted 381 days and inflicted severe financial losses on the city bus company. In November 1956, the Supreme Court ruled in Browder v. Gayle that bus segregation violated the 14th Amendment. **Hinge Question:** What was more decisive in ending bus segregation: the 381-day grassroots economic boycott or the Supreme Court's legal ruling in Browder v. Gayle?",
      hinge: {
        text: 'How many days did the Montgomery Bus Boycott last before buses were integrated?',
        options: ['381 days', '100 days', '50 days', '2 years'],
        answer: 0,
        explanation:
          'The boycott lasted an astonishing 381 days, demonstrating the immense economic power and endurance of organized non-violent direct action.',
      },
    },
  ],
  subtopic_1_4: [
    {
      image: '/units/usa/assets/sources/southern-manifesto-signing.jpg',
      caption:
        "Southern Senators and Congressmen sign the 1956 'Southern Manifesto' pledging massive resistance to federal desegregation orders.",
      image_context:
        "In 1956, 101 Southern congressmen signed the Southern Manifesto, asserting that the Supreme Court had abused its power and encouraging states to defy desegregation orders. **Hinge Question:** How did Southern politicians use the concept of 'states’ rights' to justify open resistance to federal civil rights rulings?",
      hinge: {
        text: 'What legislative tactic did Senator Strom Thurmond use for over 24 hours to obstruct the 1957 Civil Rights Act?',
        options: [
          'A Senate filibuster',
          'A judicial appeal',
          'A constitutional veto',
          'A presidential petition',
        ],
        answer: 0,
        explanation:
          'Thurmond conducted a record 24-hour and 18-minute filibuster in the US Senate to delay and water down the 1957 Civil Rights Act.',
      },
    },
    {
      image: '/units/usa/assets/sources/kkk-march-washington-1926.jpg',
      caption:
        'Ku Klux Klan members in regalia; the KKK experienced a violent revival across the Deep South during the 1950s.',
      image_context:
        "Grassroots white opposition organized into White Citizens' Councils and revitalized the violent Ku Klux Klan, using bombings, beatings, and economic intimidation against activists. **Hinge Question:** Why did the acquittal of Emmett Till's murderers in 1955 galvanize national civil rights outrage rather than intimidating Black activists?",
      hinge: {
        text: 'What organization was formed across Southern towns by middle-class white leaders to use economic pressure against integrationists?',
        options: [
          "White Citizens' Councils (WCC)",
          'The Ku Klux Klan',
          'The Dixiecrats',
          'The National Guard',
        ],
        answer: 0,
        explanation:
          "White Citizens' Councils, formed in Mississippi in 1954, used economic intimidation—such as firing Black activists or denying bank loans—to enforce segregation.",
      },
    },
  ],
  subtopic_2_1: [
    {
      image: '/units/usa/assets/sources/greensboro-sit-in-counter.jpg',
      caption:
        "Black college students stage a non-violent sit-in at the segregated Woolworth's lunch counter in Greensboro, North Carolina, February 1960.",
      image_context:
        "Four Black students from North Carolina A&T sat at the whites-only Woolworth's counter. Within weeks, the sit-in movement spread across dozens of Southern cities, leading to the creation of the SNCC. **Hinge Question:** Why was the sit-in tactic so effective in forcing private business owners to desegregate lunch counters?",
      hinge: {
        text: 'What organisation was founded in April 1960 to coordinate student-led civil rights sit-ins?',
        options: [
          'SNCC (Student Nonviolent Coordinating Committee)',
          'SCLC',
          'NAACP',
          'Black Panthers',
        ],
        answer: 0,
        explanation:
          'SNCC was founded by young student activists in 1960 to organize sit-ins and voter registration across the South.',
      },
    },
    {
      image: '/units/usa/assets/sources/freedom-riders-bus-wreckage.jpg',
      caption:
        'The firebombed wreckage of a Greyhound Freedom Riders bus in Anniston, Alabama, attacked by a white supremacist mob, May 1961.',
      image_context:
        'In 1961, CORE and SNCC volunteers rode interstate buses into the Deep South to test Supreme Court rulings desegregating terminals. They were savagely beaten in Birmingham and their bus firebombed in Anniston. **Hinge Question:** Why did CORE intentionally provoke violent Southern white reactions during the Freedom Rides to force federal intervention?',
      hinge: {
        text: 'Which federal agency finally ordered the total desegregation of all interstate buses and terminals in late 1961?',
        options: [
          'The Interstate Commerce Commission (ICC)',
          'The US Supreme Court',
          'The FBI',
          'The National Guard',
        ],
        answer: 0,
        explanation:
          'Under pressure from Attorney General Robert Kennedy after the Freedom Rides violence, the ICC enforced complete desegregation of interstate travel.',
      },
    },
    {
      image: '/units/usa/assets/sources/james-meredith-walking.jpg',
      caption:
        'James Meredith walks on the campus of the University of Mississippi, escorted by federal marshals after deadly rioting, October 1962.',
      image_context:
        'Air Force veteran James Meredith won a federal court order to enroll at Ole Miss. Governor Ross Barnett physically barred him, sparking a riot that killed two people before 300 federal marshals escorted him. **Hinge Question:** Why did university desegregation provoke even more violent campus resistance in Mississippi than high school desegregation in Arkansas?',
      hinge: {
        text: 'How many federal marshals and troops were deployed by President Kennedy to restore order at Ole Miss?',
        options: [
          'Over 300 marshals and thousands of soldiers',
          'Only 10 police officers',
          'No federal forces were sent',
          '50 local deputies',
        ],
        answer: 0,
        explanation:
          'President Kennedy had to deploy hundreds of federal marshals and federalised troops to overcome the violent white mob at the University of Mississippi.',
      },
    },
    {
      image: '/units/usa/assets/sources/birmingham-protests-dogs-1963.jpg',
      caption:
        "Birmingham police under Commissioner 'Bull' Connor unleash attack dogs on teenage civil rights demonstrators, May 1963.",
      image_context:
        'In April 1963, Martin Luther King Jr. and the SCLC launched Project C in Birmingham, Alabama. Police Chief Bull Connor ordered fire hoses and police dogs turned on marching schoolchildren, broadcast live on television. **Hinge Question:** How did Bull Connor’s violent tactics in Birmingham unintentionally become Martin Luther King Jr.’s greatest strategic victory?',
      hinge: {
        text: 'What famous document did Martin Luther King Jr. write while imprisoned in Birmingham defending direct action?',
        options: [
          'Letter from Birmingham Jail',
          'I Have a Dream',
          'The Southern Manifesto',
          'The Port Huron Statement',
        ],
        answer: 0,
        explanation:
          "In 'Letter from Birmingham Jail', King eloquently argued that citizens have a moral responsibility to peacefully disobey unjust laws.",
      },
    },
  ],
  subtopic_2_2: [
    {
      image: '/units/usa/assets/sources/march-on-washington-crowd.jpg',
      caption:
        'Over 250,000 civil rights demonstrators gather at the Lincoln Memorial during the historic March on Washington, August 1963.',
      image_context:
        "On August 28, 1963, over 250,000 Black and white Americans gathered peacefully in the nation's capital to demand jobs and federal civil rights legislation, where MLK delivered his 'I Have a Dream' speech. **Hinge Question:** Did the March on Washington directly persuade Congress to pass civil rights legislation, or did it primarily shift national moral opinion?",
      hinge: {
        text: "Where did Martin Luther King Jr. deliver his iconic 'I Have a Dream' speech during the 1963 march?",
        options: [
          'The Lincoln Memorial',
          'The White House lawn',
          'The US Capitol steps',
          'The Washington Monument',
        ],
        answer: 0,
        explanation:
          "King spoke from the steps of the Lincoln Memorial, invoking Lincoln's Emancipation Proclamation 100 years earlier.",
      },
    },
    {
      image: '/units/usa/assets/sources/lbj-mlk-signing-1964.jpg',
      caption:
        'President Lyndon B. Johnson shakes hands with Martin Luther King Jr. after signing the landmark Civil Rights Act of 1964.',
      image_context:
        'The Civil Rights Act of 1964 outlawed racial segregation in all public accommodations, prohibited employment discrimination, and empowered the Justice Department to enforce school desegregation. **Hinge Question:** Why did the 1964 Civil Rights Act successfully end legal Jim Crow segregation in public facilities but fail to guarantee voting rights?',
      hinge: {
        text: 'What major event in summer 1964 focused on registering Black voters in Mississippi and saw the murder of three activists?',
        options: [
          'Freedom Summer',
          'The Freedom Rides',
          'The Montgomery Boycott',
          "The Poor People's Campaign",
        ],
        answer: 0,
        explanation:
          'Freedom Summer brought hundreds of student volunteers to Mississippi, during which James Chaney, Andrew Goodman, and Michael Schwerner were murdered by the KKK.',
      },
    },
    {
      image: '/units/usa/assets/sources/selma-troopers-bridge.jpg',
      caption:
        "Alabama State Troopers violently charge peaceful voting rights marchers on the Edmund Pettus Bridge on 'Bloody Sunday', March 7, 1965.",
      image_context:
        "State troopers assaulted 600 voting rights marchers with tear gas, clubs, and whips on 'Bloody Sunday'. The televised brutality prompted President Johnson to address Congress and pass the Voting Rights Act of 1965. **Hinge Question:** Why was television news footage of 'Bloody Sunday' decisive in forcing President Johnson and Congress to enact the Voting Rights Act of 1965?",
      hinge: {
        text: 'Which discriminatory voting obstacles did the Voting Rights Act of 1965 immediately abolish nationwide?',
        options: [
          'Literacy tests and arbitrary disqualifications',
          'Candidate filing fees',
          'Party primary elections',
          'Paper ballots',
        ],
        answer: 0,
        explanation:
          'The Voting Rights Act of 1965 outlawed literacy tests and sent federal examiners into Southern counties to register Black voters directly.',
      },
    },
  ],
  subtopic_2_3: [
    {
      image: '/units/usa/assets/sources/malcolm-x-speaking.jpg',
      caption:
        'Malcolm X delivers a speech condemning non-violence as defenseless in the face of white supremacist terror, 1964.',
      image_context:
        "Malcolm X, spokesman for the Nation of Islam, rejected King's integrationist and non-violent philosophy, advocating Black pride, self-determination, and the right to self-defense 'by any means necessary'. **Hinge Question:** Why did Malcolm X reject Martin Luther King’s philosophy of non-violence and racial integration in favor of Black nationalism?",
      hinge: {
        text: "What was Malcolm X's famous phrase regarding the right of Black Americans to defend themselves?",
        options: [
          "'By any means necessary'",
          "'Turn the other cheek'",
          "'We shall overcome'",
          "'Non-violence is supreme'",
        ],
        answer: 0,
        explanation:
          "Malcolm X declared that African Americans must achieve freedom, justice, and equality 'by any means necessary', including armed self-defense.",
      },
    },
    {
      image: '/units/usa/assets/sources/olympics-black-power-1968.jpg',
      caption:
        'Tommie Smith and John Carlos give the Black Power raised-fist salute on the Olympic medal podium in Mexico City, October 1968.',
      image_context:
        "In 1966, SNCC chairman Stokely Carmichael popularized the slogan 'Black Power'. At the 1968 Olympics, US sprinters Tommie Smith and John Carlos raised gloved fists during the anthem to protest ongoing racism. **Hinge Question:** How did Stokely Carmichael’s call for 'Black Power' permanently fracture the unified front of the mainstream civil rights movement?",
      hinge: {
        text: "Who first popularized the phrase 'Black Power' during the March Against Fear in Mississippi in 1966?",
        options: ['Stokely Carmichael', 'Martin Luther King Jr.', 'James Meredith', 'Huey Newton'],
        answer: 0,
        explanation:
          "Stokely Carmichael gave his fiery 'Black Power' speech in Greenwood, Mississippi, in June 1966 after being arrested for pitching a tent.",
      },
    },
    {
      image: '/units/usa/assets/sources/black-panthers-marching.jpg',
      caption:
        'Armed members of the Black Panther Party for Self-Defense march in Oakland, California, demanding an end to police brutality.',
      image_context:
        'Founded in Oakland in 1966 by Huey Newton and Bobby Seale, the Black Panthers carried weapons to monitor police conduct, while also running Free Breakfast for Children programs and health clinics. **Hinge Question:** Were the Black Panthers primarily a revolutionary militant group or a community welfare organization providing social support?',
      hinge: {
        text: 'What community social program run by the Black Panthers provided meals to thousands of schoolchildren daily?',
        options: [
          'Free Breakfast for Children Program',
          'Youth Military Corps',
          'The Freedom School Bus',
          'Panther Lunch Club',
        ],
        answer: 0,
        explanation:
          'The Black Panthers ran extensive survival programs, notably feeding tens of thousands of impoverished children daily across US cities.',
      },
    },
  ],
  subtopic_2_4: [
    {
      image: '/units/usa/assets/sources/detroit-riot-guard-1967.jpg',
      caption:
        'National Guardsmen patrol burning streets in Detroit during the July 1967 rebellion, which left 43 people dead.',
      image_context:
        "Between 1965 and 1968, massive riots erupted in Northern and Western ghettos (Watts in 1965, Newark and Detroit in 1967), fueled by anger over police brutality, slum housing, and joblessness. **Hinge Question:** Why did the Kerner Commission conclude that the USA was 'moving toward two societies, one black, one white—separate and unequal'?",
      hinge: {
        text: 'What 1968 presidential report blamed urban riots on systemic white racism and economic deprivation?',
        options: [
          'The Kerner Commission Report',
          'The Warren Report',
          'The Southern Manifesto',
          'The Moynihan Report',
        ],
        answer: 0,
        explanation:
          'The Kerner Report warned that America was dividing into two separate and unequal societies due to deep white institutional racism.',
      },
    },
    {
      image: '/units/usa/assets/sources/poor-peoples-campaign-1968.jpg',
      caption:
        "Demonstrators camp at 'Resurrection City' in Washington D.C. as part of the Poor People's Campaign initiated by MLK.",
      image_context:
        'In 1966, King moved into a Chicago slum apartment to challenge Northern de facto segregation and housing discrimination, but faced hostile white mobs and uncooperative city politicians. **Hinge Question:** Why did Martin Luther King find tackling de facto economic and housing segregation in Chicago more difficult than defeating legal Jim Crow in Alabama?',
      hinge: {
        text: 'In which Northern city did Martin Luther King launch his 1966 campaign against housing segregation and slum landlords?',
        options: ['Chicago', 'New York', 'Detroit', 'Boston'],
        answer: 0,
        explanation:
          'King focused his Chicago Freedom Movement on Northern economic injustice, discovering that Northern white resistance to housing integration was as virulent as in the South.',
      },
    },
    {
      image: '/units/usa/assets/sources/mourners-mlk-assassination.jpg',
      caption:
        'Over 100,000 mourners follow the mule-drawn carriage carrying Martin Luther King Jr.’s casket through Atlanta, April 1968.',
      image_context:
        'On April 4, 1968, Martin Luther King Jr. was assassinated on the balcony of the Lorraine Motel in Memphis, Tennessee, by James Earl Ray, sparking riots in over 100 cities. **Hinge Question:** How did Martin Luther King’s assassination alter the direction of the Black freedom movement in America?',
      hinge: {
        text: 'Where was Martin Luther King Jr. standing when he was fatally shot on April 4, 1968?',
        options: [
          'On the balcony of the Lorraine Motel in Memphis',
          'At the Lincoln Memorial in Washington',
          'In Ebenezer Baptist Church in Atlanta',
          'On the Edmund Pettus Bridge in Selma',
        ],
        answer: 0,
        explanation:
          'King was shot and killed while standing outside room 306 on the second-floor balcony of the Lorraine Motel in Memphis, Tennessee.',
      },
    },
    {
      image: '/units/usa/assets/sources/lbj-signing-voting-rights-1965.jpg',
      caption:
        'President Johnson signs the Voting Rights Act of 1965, dramatically increasing Black voter registration and elected officials across the South by 1975.',
      image_context:
        'By 1975, legal segregation had been eradicated, Black voter registration had soared, and Black mayors had been elected in major Southern cities, though economic inequality remained entrenched. **Hinge Question:** By 1975, had the civil rights movement achieved genuine racial equality or merely legal equality before the law?',
      hinge: {
        text: 'What landmark 1968 federal law prohibited racial discrimination in the sale, rental, and financing of housing?',
        options: [
          'The Fair Housing Act (Civil Rights Act of 1968)',
          'The Voting Rights Act',
          'The 14th Amendment',
          'The Economic Opportunity Act',
        ],
        answer: 0,
        explanation:
          "Passed days after MLK's assassination, the Fair Housing Act of 1968 banned discrimination in the nation's housing market.",
      },
    },
  ],
  subtopic_3_1: [
    {
      image: '/units/usa/assets/sources/ho-chi-minh-trail-bicycles.jpg',
      caption:
        'Viet Minh logistical supply lines; ordinary peasants used modified bicycles to carry heavy artillery up mountains surrounding Dien Bien Phu.',
      image_context:
        'In May 1954, the communist Viet Minh under General Vo Nguyen Giap defeated the French military at the siege of Dien Bien Phu, ending French colonial rule in Indochina. **Hinge Question:** Why was the French military decisively defeated by Ho Chi Minh’s Viet Minh at Dien Bien Phu despite having superior conventional weapons?',
      hinge: {
        text: 'Along which parallel did the 1954 Geneva Accords temporarily divide Vietnam into North and South?',
        options: ['17th Parallel', '38th Parallel', '10th Parallel', '45th Parallel'],
        answer: 0,
        explanation:
          'The Geneva Accords of 1954 divided Vietnam at the 17th parallel pending nationwide elections scheduled for 1956.',
      },
    },
    {
      image: '/units/usa/assets/sources/ngo-dinh-diem-parade.jpg',
      caption:
        'South Vietnamese President Ngo Dinh Diem in a motorcade; backed by US financial aid to prevent a communist election victory.',
      image_context:
        "President Eisenhower backed the staunchly anti-communist Catholic leader Ngo Dinh Diem in the South, fearing that if Vietnam fell to communism, surrounding nations would topple like dominoes. **Hinge Question:** How did the 'Domino Theory' lead President Eisenhower to support an undemocratic, corrupt regime in South Vietnam?",
      hinge: {
        text: 'Why did Ngo Dinh Diem cancel the nationwide democratic elections scheduled for 1956?',
        options: [
          'He knew Ho Chi Minh would win overwhelmingly (estimated 80% of votes)',
          'The United Nations ordered him to do so',
          'North Vietnam refused to participate',
          'There were no opposition candidates',
        ],
        answer: 0,
        explanation:
          'Both Diem and President Eisenhower knew that Ho Chi Minh was enormously popular and would win at least 80% of the vote in any free election.',
      },
    },
    {
      image: '/units/usa/assets/sources/buddhist-protests-1963.jpg',
      caption:
        "Buddhist monk Thich Quang Duc self-immolates in Saigon in June 1963 in protest against religious persecution by Diem's regime.",
      image_context:
        "President Kennedy increased US military advisers in Vietnam from 800 to 16,000. However, Diem's unpopular Strategic Hamlet Program and violent persecution of the Buddhist majority led to a military coup in November 1963. **Hinge Question:** Why did the failure of the Strategic Hamlet Program and Buddhist protests lead President Kennedy to quietly sanction Diem's overthrow in 1963?",
      hinge: {
        text: 'What controversial US-backed program forcibly relocated South Vietnamese peasants into fortified villages surrounded by barbed wire?',
        options: [
          'Strategic Hamlets Program',
          'Operation Rolling Thunder',
          'Search and Destroy',
          'Vietnamization',
        ],
        answer: 0,
        explanation:
          'The Strategic Hamlet Program (1962) deeply alienated peasants because it tore them away from their ancestral lands and sacred burial grounds.',
      },
    },
  ],
  subtopic_3_2: [
    {
      image: '/units/usa/assets/sources/us-soldier-patrolling-swamp.jpg',
      caption:
        'A US infantryman cautiously patrols a murky swamp in South Vietnam, where Vietcong guerrillas blended into the local rural population.',
      image_context:
        "By 1964, the Vietcong (NLF) controlled over 40% of the countryside in South Vietnam, launching ambushes on government forces and operating through extensive underground tunnel systems. **Hinge Question:** Why was the Vietcong's strategy of 'hanging onto American belts' so effective at neutralizing US firepower?",
      hinge: {
        text: 'What was the political and guerrilla organisation fighting against the US and South Vietnamese government?',
        options: [
          'The Vietcong (National Liberation Front)',
          'The ARVN',
          'The Green Berets',
          'The SEATO Alliance',
        ],
        answer: 0,
        explanation:
          'The Vietcong was the armed communist insurgent movement in South Vietnam supplied by North Vietnam along the Ho Chi Minh Trail.',
      },
    },
    {
      image: '/units/usa/assets/sources/uss-maddox.jpg',
      caption:
        'The destroyer USS Maddox, allegedly attacked by North Vietnamese torpedo boats in the Gulf of Tonkin in August 1964.',
      image_context:
        'In August 1964, the destroyer USS Maddox reported being fired upon by North Vietnamese torpedo boats in the Gulf of Tonkin, though reports of a second attack on August 4 were confused and contradictory. **Hinge Question:** Was the Gulf of Tonkin incident a genuine unprovoked attack or an orchestrated pretext for long-planned US military escalation?',
      hinge: {
        text: "What congressional resolution in August 1964 gave President Johnson authority to 'take all necessary measures' in Vietnam?",
        options: [
          'The Gulf of Tonkin Resolution',
          'The War Powers Act',
          'The Geneva Accord',
          'The Truman Doctrine',
        ],
        answer: 0,
        explanation:
          'The Gulf of Tonkin Resolution passed with near-unanimous approval in Congress, granting LBJ unlimited military power without a formal declaration of war.',
      },
    },
    {
      image: '/units/usa/assets/sources/robert-mcnamara-briefing.jpg',
      caption:
        'Secretary of Defense Robert McNamara uses maps during a Pentagon press briefing on airstrikes against North Vietnam, 1965.',
      image_context:
        "Following a Vietcong attack on a US base at Pleiku in February 1965, President Johnson unleashed Operation Rolling Thunder, a continuous 3-year bombing campaign against North Vietnam. **Hinge Question:** Why did Congress pass the Gulf of Tonkin Resolution with almost unanimous approval, essentially giving President Johnson a 'blank cheque' for war?",
      hinge: {
        text: 'What was the sustained aerial bombardment campaign against North Vietnam launched by LBJ in 1965 called?',
        options: [
          'Operation Rolling Thunder',
          'Operation Ranch Hand',
          'Operation Linebacker',
          'Operation Cedar Falls',
        ],
        answer: 0,
        explanation:
          'Operation Rolling Thunder dropped over 860,000 tons of bombs on North Vietnam between 1965 and 1968.',
      },
    },
    {
      image: '/units/usa/assets/sources/marines-landing-danang.jpg',
      caption:
        'US Marines wade ashore at Da Nang in March 1965, marking the start of direct American combat troop involvement in Vietnam.',
      image_context:
        "On March 8, 1965, 3,500 US Marines landed on the beaches of Da Nang to guard the airbase. By late 1968, American troop numbers in Vietnam surged to over 536,000 soldiers. **Hinge Question:** Why did President Johnson feel that withdrawing from Vietnam would destroy his domestic 'Great Society' legislative agenda?",
      hinge: {
        text: 'How many US combat troops were stationed in Vietnam at the peak of American escalation in late 1968?',
        options: ['Over 536,000 troops', '50,000 troops', '16,000 troops', '1 million troops'],
        answer: 0,
        explanation:
          'By late 1968, under General William Westmoreland, US troop commitment climbed to a massive 536,000 troops.',
      },
    },
  ],
  subtopic_3_3: [
    {
      image: '/units/usa/assets/sources/us-troops-bogged-down.jpg',
      caption:
        'US soldiers struggle through thick, booby-trapped jungle terrain searching for hidden Vietcong tunnel complexes.',
      image_context:
        'The Vietcong avoided conventional pitched battles, using punji stick traps, unexploded US bomb scrap, and extensive tunnel complexes like Cu Chi to fight a deadly war of attrition. **Hinge Question:** Why did the Cu Chi tunnel network make conventional US artillery and aerial bombing largely ineffective?',
      hinge: {
        text: 'What cheap, deadly booby trap did the Vietcong construct using sharpened bamboo smeared with poison or dung?',
        options: ['Punji stick pit', 'Claymore mine', 'Bouncing Betty', 'Tripwire grenade'],
        answer: 0,
        explanation:
          'Punji stick traps were simple, terrifying bamboo spikes buried in concealed pits that caused severe infections and psychological dread.',
      },
    },
    {
      image: '/units/usa/assets/sources/agent-orange-spraying-c123.jpg',
      caption:
        'US Air Force C-123 aircraft spray Agent Orange chemical defoliant over South Vietnamese forest canopy in Operation Ranch Hand.',
      image_context:
        'US forces relied heavily on overwhelming air power, dropping napalm to burn jungle foliage and spraying 19 million gallons of Agent Orange herbicide, which devastated crops and caused widespread birth defects. **Hinge Question:** Why did chemical defoliants like Agent Orange and napalm ultimately turn the South Vietnamese rural peasantry against the Americans?',
      hinge: {
        text: 'What tactic, devised by General Westmoreland, used helicopters to locate and kill Vietcong before leaving the area?',
        options: [
          'Search and Destroy',
          'Strategic Hamlets',
          'Operation Rolling Thunder',
          'Pacification',
        ],
        answer: 0,
        explanation:
          "Search and Destroy missions relied on body count tallies, frequently resulting in the burning of peasant villages ('Zippo raids').",
      },
    },
    {
      image: '/units/usa/assets/sources/huey-helicopter-vietnam.jpg',
      caption:
        'Huey helicopters deploy American airborne infantry into battle zones during the fierce house-to-house fighting of the Tet Offensive, 1968.',
      image_context:
        'On January 31, 1968, 84,000 Vietcong and North Vietnamese troops launched coordinated surprise attacks across 100 South Vietnamese towns and cities, even breaching the US Embassy compound in Saigon. **Hinge Question:** Why was the Tet Offensive a catastrophic military defeat for the Vietcong, yet a decisive psychological victory for North Vietnam?',
      hinge: {
        text: 'During the 1968 Tet Offensive, what highly fortified American diplomatic compound in Saigon was temporarily penetrated by Vietcong commandos?',
        options: [
          'The US Embassy',
          'The White House',
          'Tan Son Nhut Airbase',
          'The Presidential Palace',
        ],
        answer: 0,
        explanation:
          'Television footage of dead Vietcong commandos inside the US Embassy grounds shocked the American public, proving the war was far from won.',
      },
    },
    {
      image: '/units/usa/assets/sources/general-westmoreland.jpg',
      caption:
        'General William Westmoreland, commander of US forces, claimed the military was winning a war of attrition right before Tet struck.',
      image_context:
        "General Westmoreland had repeatedly promised the American public that there was 'light at the end of the tunnel'. The shock of the Tet Offensive destroyed LBJ's political credibility, forcing him not to seek re-election. **Hinge Question:** Why did the concept of a 'crossover point' in a war of attrition fail against an enemy fighting for national independence?",
      hinge: {
        text: "What legendary CBS news anchor visited Vietnam after the Tet Offensive and declared the war 'mired in stalemate'?",
        options: ['Walter Cronkite', 'Edward R. Murrow', 'Dan Rather', 'David Brinkley'],
        answer: 0,
        explanation:
          "Walter Cronkite's editorial broadcast convinced President Johnson: 'If I've lost Cronkite, I've lost middle America.'",
      },
    },
  ],
  subtopic_3_4: [
    {
      image: '/units/usa/assets/sources/nixon-visiting-troops.jpg',
      caption:
        'President Richard Nixon visits American infantrymen in Vietnam in July 1969 as he began phased troop withdrawals.',
      image_context:
        "Elected in 1968 promising 'Peace with Honor', President Richard Nixon announced the Nixon Doctrine, declaring that the US would provide financial aid and air power, but Asian allies must supply the ground troops. **Hinge Question:** What did President Nixon mean by 'Peace with Honor', and was it realistic given the military balance on the ground?",
      hinge: {
        text: "What was Nixon's core policy of gradually replacing US combat troops with trained South Vietnamese forces called?",
        options: ['Vietnamization', 'Pacification', 'Search and Destroy', 'Strategic Retrenchment'],
        answer: 0,
        explanation:
          'Vietnamization sought to de-Americanize the war, reducing US troop levels from 540,000 in 1969 to under 25,000 by 1972.',
      },
    },
    {
      image: '/units/usa/assets/sources/arvn-troops-combat.jpg',
      caption:
        'South Vietnamese ARVN troops advance under fire; despite billions in US weaponry, ARVN remained crippled by corruption and poor leadership.',
      image_context:
        'Under Vietnamization, the US armed ARVN into the 4th largest army in the world. However, rampant corruption, political appointments, and heavy desertion rates left ARVN incapable of resisting North Vietnam alone. **Hinge Question:** Why was the policy of Vietnamisation doomed to fail without permanent American air support and ground forces?',
      hinge: {
        text: 'Which disastrous 1971 military operation in Laos demonstrated that ARVN could not defeat North Vietnamese forces without US troops?',
        options: [
          'Operation Lam Son 719',
          'Operation Rolling Thunder',
          'Operation Linebacker',
          'Operation Cedar Falls',
        ],
        answer: 0,
        explanation:
          'In Operation Lam Son 719 (1971), ARVN troops invaded Laos to sever the Ho Chi Minh Trail but suffered a bloody, panicked retreat.',
      },
    },
    {
      image: '/units/usa/assets/sources/nixon-television-address.jpg',
      caption:
        'President Nixon points to a map of Cambodia during a live televised address explaining the US military incursion, April 1970.',
      image_context:
        'In 1969, Nixon ordered Operation Menu, the secret B-52 bombing of communist sanctuaries in neutral Cambodia, and launched a ground invasion in April 1970, sparking massive anti-war protests at home. **Hinge Question:** Why did Nixon expand the war into neutral Cambodia and Laos while claiming to be withdrawing American troops?',
      hinge: {
        text: 'What was the secret code name for the 14-month US B-52 carpet-bombing of communist bases inside Cambodia?',
        options: [
          'Operation Menu',
          'Operation Rolling Thunder',
          'Operation Linebacker',
          'Operation Ranch Hand',
        ],
        answer: 0,
        explanation:
          'Operation Menu (1969–70) kept the bombing of neutral Cambodia completely secret from Congress and the American public.',
      },
    },
    {
      image: '/units/usa/assets/sources/paris-peace-accords-signing.jpg',
      caption:
        'Representatives of the United States, North Vietnam, South Vietnam, and the Vietcong sign the Paris Peace Accords, January 1973.',
      image_context:
        "In December 1972, Nixon unleashed Operation Linebacker II (the Christmas Bombings), dropping 20,000 tons of bombs on Hanoi and Haiphong in 11 days to force North Vietnam back to peace talks. **Hinge Question:** Did Operation Linebacker II force North Vietnam to sign the Paris Accords, or did Nixon simply accept Hanoi's existing terms?",
      hinge: {
        text: 'What was the 11-day B-52 bombing blitz on North Vietnam in December 1972 commonly called?',
        options: [
          'The Christmas Bombings (Linebacker II)',
          'Operation Rolling Thunder',
          'The Tet Bombings',
          'Operation Menu',
        ],
        answer: 0,
        explanation:
          'The Christmas Bombings dropped 20,000 tons of explosives over North Vietnam, losing 15 B-52 bombers in the process.',
      },
    },
  ],
  subtopic_4_1: [
    {
      image: '/units/usa/assets/sources/vietnam-draft-lottery.jpg',
      caption:
        'Officials draw birth dates during the first US selective service draft lottery in Washington D.C., December 1969.',
      image_context:
        'The conscription system allowed wealthy young men to secure college deferments, leaving working-class and Black Americans to fight disproportionately in front-line infantry units. **Hinge Question:** Why was the US conscription (draft) system viewed as disproportionately unfair to working-class and African American young men?',
      hinge: {
        text: 'What heavy protest action did thousands of young American men perform with their draft registration cards?',
        options: [
          'Publicly burned them in street rallies',
          'Mailed them to North Vietnam',
          'Traded them for Canadian currency',
          'Pawned them to buy guns',
        ],
        answer: 0,
        explanation:
          'Burning draft cards became the most defiant and iconic symbol of opposition to compulsory military service.',
      },
    },
    {
      image: '/units/usa/assets/sources/antiwar-pentagon-protest-1967.jpg',
      caption:
        'Anti-war demonstrators confront military police outside the Pentagon during the massive October 1967 March on the Pentagon.',
      image_context:
        "In March 1968, Charlie Company under Lt. William Calley massacred up to 500 unarmed Vietnamese civilians in the village of My Lai. When uncovered in late 1969, the atrocities shattered American claims to moral superiority. **Hinge Question:** How did the revelation of the My Lai massacre in late 1969 shatter the American public's belief in the moral superiority of US intervention?",
      hinge: {
        text: 'Who was the only US military officer convicted of murder for the My Lai Massacre of 500 Vietnamese civilians?',
        options: [
          'Lieutenant William Calley',
          'General William Westmoreland',
          'Captain Ernest Medina',
          'Secretary Robert McNamara',
        ],
        answer: 0,
        explanation:
          'Lt. William Calley was convicted of premeditated murder in 1971, though Nixon commuted his life sentence to house arrest.',
      },
    },
    {
      image: '/units/usa/assets/sources/kent-state-protests-1970.jpg',
      caption:
        'Ohio National Guardsmen fire rifles into crowds of unarmed student anti-war protesters at Kent State University, killing four, May 4, 1970.',
      image_context:
        "Following Nixon's invasion of Cambodia, Ohio National Guardsmen fired 67 rifle rounds into a crowd of student protesters at Kent State, killing four and wounding nine. Over 4 million students struck nationwide in response. **Hinge Question:** Why did the Kent State killings trigger a nationwide student strike of over 4 million university students across America?",
      hinge: {
        text: 'How many unarmed students were shot and killed by National Guardsmen at Kent State University on May 4, 1970?',
        options: ['4 students', '10 students', '1 student', '20 students'],
        answer: 0,
        explanation:
          'Four students were killed (Allison Krause, Jeffrey Miller, Sandra Scheuer, and William Schroeder), two of whom were simply walking to class.',
      },
    },
  ],
  subtopic_4_2: [
    {
      image: '/units/usa/assets/sources/pro-war-rally-nyc.jpg',
      caption:
        'Pro-war demonstrators march down Fifth Avenue in New York City holding banners supporting US troops and demanding victory over communism.',
      image_context:
        'Millions of working-class and conservative Americans staunchly supported the war, viewing anti-war demonstrators as unpatriotic spoiled college youths betraying soldiers fighting overseas. **Hinge Question:** Why did a substantial portion of the American public view anti-war protesters as unpatriotic or traitorous to soldiers dying overseas?',
      hinge: {
        text: 'What Cold War fear motivated ordinary Americans to support the military campaign in Vietnam?',
        options: [
          "Fear of the global spread of communism ('The Red Scare')",
          'Fear of European economic domination',
          'Desire to colonize Southeast Asia',
          'Fear of Japanese invasion',
        ],
        answer: 0,
        explanation:
          'Decades of Cold War anti-communist indoctrination convinced many Americans that Vietnam was a vital frontline against Soviet and Chinese expansion.',
      },
    },
    {
      image: '/units/usa/assets/sources/vvaw-veterans-protest.jpg',
      caption:
        'Vietnam Veterans Against the War (VVAW) throw their medals over the Capitol fence in Washington D.C., April 1971.',
      image_context:
        "In a famous televised address on November 3, 1969, Nixon appealed to 'the great silent majority of my fellow Americans' for support, arguing that a minority of vocal protesters should not dictate foreign policy. **Hinge Question:** Why was the testimony of returning Vietnam veterans particularly damaging to Nixon's 'Silent Majority' rhetoric?",
      hinge: {
        text: 'What term did President Nixon popularize in a November 1969 speech to describe everyday Americans who supported the war quietly?',
        options: [
          "The 'Silent Majority'",
          "The 'Moral Majority'",
          "The 'Real Americans'",
          "The 'Hard Hats'",
        ],
        answer: 0,
        explanation:
          "Nixon called upon the 'Silent Majority'—ordinary, moderate citizens who did not participate in counterculture anti-war demonstrations.",
      },
    },
    {
      image: '/units/usa/assets/sources/hard-hat-riot-1970.jpg',
      caption:
        "Construction workers wearing hard hats clash with anti-war students in Lower Manhattan during the violent 'Hard Hat Riot' of May 1970.",
      image_context:
        'On May 8, 1970, about 200 construction workers attacked high school and college students protesting the Kent State shootings in Lower Manhattan, demonstrating bitter cultural divisions between blue-collar workers and student protesters. **Hinge Question:** How did the Hard Hat Riot illustrate the deep cultural and socio-economic divisions between blue-collar workers and college student protesters?',
      hinge: {
        text: 'What did the trade union construction workers who attacked student anti-war protesters in New York City become known as?',
        options: [
          "The 'Hard Hats'",
          "The 'Dixiecrats'",
          "The 'Green Berets'",
          "The 'White Guards'",
        ],
        answer: 0,
        explanation:
          "The 'Hard Hats' symbolized patriotic working-class support for Nixon and fury at privileged college anti-war protesters.",
      },
    },
  ],
  subtopic_4_3: [
    {
      image: '/units/usa/assets/sources/kissinger-peace-talks.jpg',
      caption:
        'National Security Advisor Henry Kissinger and North Vietnamese negotiator Le Duc Tho conduct bilateral peace negotiations in Paris.',
      image_context:
        "From 1969 to 1973, National Security Advisor Henry Kissinger conducted secret bilateral negotiations in Paris with North Vietnam's Le Duc Tho, seeking an honorable exit for American forces. **Hinge Question:** Why did it take five years of protracted negotiations in Paris to conclude a peace agreement that essentially restored the 1954 status quo?",
      hinge: {
        text: "Who served as President Nixon's National Security Advisor and chief negotiator at the secret Paris peace talks?",
        options: ['Henry Kissinger', 'Robert McNamara', 'Dean Rusk', 'William Westmoreland'],
        answer: 0,
        explanation:
          'Henry Kissinger negotiated the Paris Peace Accords, for which he was controversially awarded the 1973 Nobel Peace Prize.',
      },
    },
    {
      image: '/units/usa/assets/sources/paris-peace-accords-signing.jpg',
      caption:
        'The formal signing of the Paris Peace Accords on January 27, 1973, which ended direct US military combat participation in Vietnam.',
      image_context:
        "Signed on January 27, 1973, the Paris Peace Accords called for an immediate ceasefire, total withdrawal of remaining US troops within 60 days, and return of American POWs, while critically allowing 150,000 North Vietnamese troops to remain in the South. **Hinge Question:** Why was the clause allowing 150,000 North Vietnamese troops to remain stationed in South Vietnam fatal to South Vietnam's survival?",
      hinge: {
        text: "What critical concession did the US make in the 1973 Paris Accords that sealed South Vietnam's eventual downfall?",
        options: [
          'Allowing 150,000 North Vietnamese troops to remain inside South Vietnam',
          'Surrendering the city of Saigon immediately',
          'Paying $50 billion in war reparations to Hanoi',
          'Disarming the South Vietnamese military',
        ],
        answer: 0,
        explanation:
          'By permitting North Vietnamese soldiers to remain entrenched across South Vietnam, the treaty made the communist conquest of the South inevitable once US air power was removed.',
      },
    },
    {
      image: '/units/usa/assets/sources/saigon-embassy-evacuation.jpg',
      caption:
        'A CIA helicopter evacuates evacuees from a rooftop near the US Embassy in Saigon as North Vietnamese tanks enter the city, April 29, 1975.',
      image_context:
        'In early 1975, North Vietnam launched a final massive offensive. South Vietnam collapsed in weeks. On April 30, 1975, communist tanks crashed through the gates of the Presidential Palace in Saigon, reunifying Vietnam under communist rule. **Hinge Question:** How did the final chaotic evacuation of Saigon become the defining visual symbol of American military defeat in Southeast Asia?',
      hinge: {
        text: 'On what date did Saigon fall to North Vietnamese forces, ending the Vietnam War and reunifying the country under communism?',
        options: ['April 30, 1975', 'January 27, 1973', 'July 4, 1976', 'November 22, 1963'],
        answer: 0,
        explanation:
          'On April 30, 1975, Saigon fell and was promptly renamed Ho Chi Minh City, marking the total defeat of the US-backed South Vietnamese government.',
      },
    },
  ],
  subtopic_4_4: [
    {
      image: '/units/usa/assets/sources/ho-chi-minh-trail-bicycles.jpg',
      caption:
        'The Ho Chi Minh Trail: an intricate logistics network through Laos and Cambodia that the US Air Force was never able to sever permanently.',
      image_context:
        "North Vietnam and the Vietcong possessed immense ideological commitment, viewing the conflict as a patriotic war for national liberation, and received billions in modern weaponry and surface-to-air missiles from the Soviet Union and China. **Hinge Question:** Why was nationalist motivation and total political commitment the single most decisive factor in North Vietnam's ultimate victory?",
      hinge: {
        text: 'Which two major communist superpowers provided crucial military hardware, anti-aircraft missiles, and financial aid to North Vietnam?',
        options: [
          'The Soviet Union (USSR) and China',
          'Cuba and North Korea',
          'France and Britain',
          'East Germany and Poland',
        ],
        answer: 0,
        explanation:
          'Soviet surface-to-air missiles (SAMs) and Chinese logistical support allowed North Vietnam to withstand massive US bombardment.',
      },
    },
    {
      image: '/units/usa/assets/sources/us-soldier-patrolling-swamp.jpg',
      caption:
        'Exhausted US conscripts on a search and destroy patrol; low morale, short one-year tours of duty, and drug abuse plagued late-war forces.',
      image_context:
        "US forces suffered from reliance on high-tech weapons unsuited for jungle combat, a 1-year tour of duty that prevented tactical cohesion, and late-war discipline breakdowns ('fragging' of officers, widespread heroin addiction). **Hinge Question:** How did the one-year 'deros' tour of duty prevent US soldiers from developing combat cohesion and experienced leadership in the field?",
      hinge: {
        text: 'What slang term referred to disgruntled US enlisted soldiers attempting to assassinate their own unpopular officers with grenades?',
        options: ["'Fragging'", "'Drafting'", "'Sniping'", "'Zippoing'"],
        answer: 0,
        explanation:
          "'Fragging' (from fragmentation grenades) became a terrifying symptom of collapsing troop morale in the late stages of the war.",
      },
    },
    {
      image: '/units/usa/assets/sources/antiwar-pentagon-protest-1967.jpg',
      caption:
        'The collapse of the domestic political consensus forced consecutive presidents to limit ground operations and eventually withdraw.',
      image_context:
        'Domestic opposition, media coverage of civilian casualties, mounting casualties (58,220 dead), and economic inflation destroyed the political consensus for the war, forcing Congress to pass the War Powers Act of 1973 and cut off funding. **Hinge Question:** Was the Vietnam War lost primarily on the battlefields of Southeast Asia or in the living rooms and voting booths of the American public?',
      hinge: {
        text: "What 1973 federal law restricted the US President's ability to commit armed forces to foreign conflicts without congressional approval?",
        options: [
          'The War Powers Act (1973)',
          'The Gulf of Tonkin Resolution',
          'The Patriot Act',
          'The Marshall Plan',
        ],
        answer: 0,
        explanation:
          'The War Powers Act of 1973 aimed to check presidential war powers, requiring the president to notify Congress within 48 hours of deploying troops.',
      },
    },
  ],
};

// Build workbooks metadata
const workbooks = [
  {
    id: 'KT1',
    title: 'Key Topic 1: The development of the civil rights movement, 1954–60',
    image: '/units/usa/assets/sources/airborne-little-rock-patrol.jpg',
    prefix: 'lesson_1_',
    enquiry:
      'How did legal victories and grassroots action transform the struggle for civil rights?',
  },
  {
    id: 'KT2',
    title: 'Key Topic 2: Protest, progress and radicalism, 1960–75',
    image: '/units/usa/assets/sources/birmingham-protests-dogs-1963.jpg',
    prefix: 'lesson_2_',
    enquiry: 'How did the civil rights movement evolve from non-violent protest to Black Power?',
  },
  {
    id: 'KT3',
    title: 'Key Topic 3: US involvement in the Vietnam War, 1954–75',
    image: '/units/usa/assets/sources/us-soldier-patrolling-swamp.jpg',
    prefix: 'lesson_3_',
    enquiry:
      'Why did the USA become militarily entangled in Vietnam, and why were US tactics unable to defeat the Vietcong?',
  },
  {
    id: 'KT4',
    title: 'Key Topic 4: Reactions to, and the end of, US involvement in the Vietnam War, 1964–75',
    image: '/units/usa/assets/sources/antiwar-pentagon-protest-1967.jpg',
    prefix: 'lesson_4_',
    enquiry:
      'Why did domestic opposition force the USA to withdraw, and what was the consequence of the fall of Saigon?',
  },
];

// Build timeline
const timeline = [];
Object.values(KEY_TOPICS_OVERVIEWS).forEach((kt) => {
  if (kt.timeline) {
    kt.timeline.forEach((ev) => {
      timeline.push({
        year: ev.year,
        title: ev.title,
        detail: ev.bullets ? ev.bullets.join(' ') : '',
        figures: ev.figures || [],
        quote: ev.quote || '',
      });
    });
  }
});

// Build key individuals with authentic portrait images
const key_individuals = TRADING_CARDS_DATA.map((c) => {
  const cleanName = c.name.replace(/ the [A-Za-z]+$/, '').trim();
  let portraitPath = `/units/usa/${c.image}`;
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const potentialPortrait = path.join(
    PUBLIC_USA_DIR,
    'assets',
    'sources',
    'portraits',
    `${slug}.jpg`,
  );
  if (fs.existsSync(potentialPortrait)) {
    portraitPath = `/units/usa/assets/sources/portraits/${slug}.jpg`;
  }
  return {
    name: cleanName,
    title: c.frontPhrase || '',
    image: portraitPath,
    description: c.bio || c.description || '',
    stats: c.stats || {},
  };
});

// Build lessons
console.log('--- Step 3: Transforming 16 lessons with full narrative & contextual enrichment ---');
const lessons = [];

const lessonKeys = [
  'subtopic_1_1',
  'subtopic_1_2',
  'subtopic_1_3',
  'subtopic_1_4',
  'subtopic_2_1',
  'subtopic_2_2',
  'subtopic_2_3',
  'subtopic_2_4',
  'subtopic_3_1',
  'subtopic_3_2',
  'subtopic_3_3',
  'subtopic_3_4',
  'subtopic_4_1',
  'subtopic_4_2',
  'subtopic_4_3',
  'subtopic_4_4',
];

lessonKeys.forEach((key, idx) => {
  const rawL = LESSONS_DATA[key] || {};
  const tNum = key.split('_')[1];
  const sNum = key.split('_')[2];
  const lessonId = `lesson_${tNum}_${sNum}`;

  // Find quiz questions for vocabulary / checks
  let qList = [];
  QUIZ_DATA.forEach((t) => {
    if (t.subtopics) {
      const st = t.subtopics.find((s) => s.id === key);
      if (st && st.standard) qList.push(...st.standard);
    }
  });

  // Construct Do Now items (STRICTLY recall from prior lessons or early foundational recall)
  const doNowItems = [];
  if (idx === 0) {
    doNowItems.push(
      {
        question: 'What was the constitutional significance of the 13th Amendment (1865)?',
        answer:
          'It officially abolished slavery and involuntary servitude throughout the United States.',
      },
      {
        question: 'What was the purpose of the 14th Amendment to the US Constitution (1868)?',
        answer:
          'It guaranteed citizenship and equal protection under the law to all persons born or naturalized in the USA.',
      },
      {
        question: 'What was the constitutional guarantee of the 15th Amendment (1870)?',
        answer:
          'It prohibited federal and state governments from denying a citizen the right to vote based on race or color.',
      },
      {
        question: 'What was the post-Civil War Reconstruction era in American history?',
        answer:
          'The period from 1865 to 1877 when the federal government attempted to reintegrate Southern states and protect Black civil rights.',
      },
      {
        question:
          'How did Black American military service in the Second World War affect attitudes to civil rights?',
        answer:
          'Over 1 million Black Americans served abroad in segregated units; returning veterans demanded full democratic equality at home (the Double V campaign).',
      },
    );
  } else {
    // Pick 5 recall questions strictly from previous lessons
    const prevKey = lessonKeys[idx - 1];
    const prevCore = CORE_QUESTIONS_DATA[prevKey] || [];
    prevCore.slice(0, 3).forEach((c) => {
      doNowItems.push({ question: c.q, answer: c.starter });
    });

    // Gather candidate questions from earlier lessons strictly (0 to idx - 1)
    const earlierKeys = lessonKeys.slice(0, idx);
    let earlierQList = [];
    QUIZ_DATA.forEach((t) => {
      if (t.subtopics) {
        t.subtopics.forEach((st) => {
          if (earlierKeys.includes(st.id) && st.standard) {
            earlierQList.push(...st.standard);
          }
        });
      }
    });
    let eIdx = 0;
    while (doNowItems.length < 5 && eIdx < earlierQList.length) {
      const candidate = earlierQList[eIdx++];
      if (!doNowItems.some((item) => item.question === candidate.question)) {
        doNowItems.push({ question: candidate.question, answer: candidate.answer });
      }
    }
  }

  // Vocab list
  const vocab = [];
  if (rawL.knowledgeCheck && rawL.knowledgeCheck.length > 0) {
    rawL.knowledgeCheck.forEach((kc) => {
      let term = kc.answer;
      let def = MASTER_GLOSSARY[term] || kc.question;
      vocab.push({ term, definition: def });
    });
  }
  // Fallback vocabulary
  if (vocab.length < 5) {
    const defaultTerms = Object.keys(MASTER_GLOSSARY).slice(idx * 2, idx * 2 + 5);
    defaultTerms.forEach((t) => {
      if (!vocab.some((v) => v.term.toLowerCase() === t.toLowerCase())) {
        vocab.push({ term: t, definition: MASTER_GLOSSARY[t] });
      }
    });
  }

  // Narrative blocks
  const narrative_blocks = [];
  const stepConfigs = STEP_IMAGE_MAP[key] || [];

  if (rawL.steps && Array.isArray(rawL.steps)) {
    rawL.steps.forEach((step, sIdx) => {
      let rawHtml = step.bodyHtml || '';
      // Sanitize paths
      rawHtml = rawHtml.replace(/assets\//g, '/units/usa/assets/');

      // Extract examiner tips / context focus
      let examinerTip = '';
      const tipMatch = rawHtml.match(
        /<div class="examiner-tip-box"[\s\S]*?>([\s\S]*?)<\/div>\s*<\/div>/i,
      );
      if (tipMatch) {
        const tipTitleMatch = tipMatch[1].match(/<strong[^>]*>([\s\S]*?)<\/strong>/i);
        const tipTitle = tipTitleMatch
          ? tipTitleMatch[1].replace(/<[^>]+>/g, '').trim()
          : '📝 Examiner Tip:';
        const tipBody = tipMatch[1]
          .replace(/<strong[^>]*>[\s\S]*?<\/strong>/i, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (tipBody) {
          examinerTip = `\n\n> **${tipTitle.startsWith('📝') ? tipTitle : '📝 ' + tipTitle}** ${tipBody}`;
        }
      }

      // Extract main text from mastery-text-column if split
      let cleanText = rawHtml;
      if (cleanText.includes('mastery-text-column')) {
        const cardMatch = cleanText.match(
          /<div class="mastery-card-body[^"]*"[\s\S]*?>([\s\S]*?)<\/div>\s*<\/div>/i,
        );
        if (cardMatch) {
          cleanText = cardMatch[1];
        }
      }

      // Remove embedded task boxes from main text
      cleanText = cleanText.replace(
        /<div class="mind-map-task-box"[\s\S]*?<\/div>\s*<\/div>/gi,
        '',
      );
      cleanText = cleanText.replace(
        /<div class="revision-task-box"[\s\S]*?<\/div>\s*<\/div>/gi,
        '',
      );
      cleanText = cleanText.replace(
        /<div class="mastery-media-column"[\s\S]*?<\/div>\s*<\/div>/gi,
        '',
      );
      cleanText = cleanText.replace(/<div class="lesson-image-wrapper"[\s\S]*?<\/div>/gi, '');

      cleanText = cleanText.trim();

      // Append examiner tip callout
      if (examinerTip) {
        cleanText += examinerTip;
      }

      // Append scholarly perspective callout
      if (step.scholarlyDepth && step.scholarlyDepth.body) {
        cleanText += `\n\n> **🎓 ${step.scholarlyDepth.title || 'Scholarly Perspective'}:** ${step.scholarlyDepth.body}`;
      }

      // Seamlessly integrate Eyewitness Testimony into step 0
      if (sIdx === 0 && rawL.livedExperience) {
        cleanText += `\n\n> 🎙️ **Eyewitness Testimony — ${rawL.livedExperience.witness}:** &ldquo;${rawL.livedExperience.quote}&rdquo;<br><br><em>Context: ${rawL.livedExperience.context}</em><br><br>💬 <strong>Reflective Question:</strong> ${rawL.livedExperience.discussionQuestion}`;
      }

      // Link key individuals
      cleanText = linkKeyIndividuals(cleanText);

      // Clean theme heading (remove "Step X: " prefix)
      const cleanThemeHeading = (step.title || `Part ${sIdx + 1}`)
        .replace(/^Step\s*\d+:\s*/i, '')
        .trim();

      // Step configuration (images, caption, hinge question)
      const cfg = stepConfigs[sIdx] || {};

      // Embedded tasks
      const embeddedTasks = [];
      if (sIdx === 0 && rawL.deepThinkingQuestions && rawL.deepThinkingQuestions.length > 0) {
        const dt = rawL.deepThinkingQuestions[0];
        embeddedTasks.push({
          type: 'think_pair_share',
          text: dt.question,
          question: dt.question,
        });
      }

      narrative_blocks.push({
        id: `block_${lessonId}_${sIdx + 1}`,
        title: cleanThemeHeading,
        theme_heading: cleanThemeHeading,
        text: cleanText,
        content: cleanText,
        image: cfg.image || '/units/usa/assets/sources/airborne-little-rock-patrol.jpg',
        image_alt: cfg.caption || cleanThemeHeading,
        caption: cfg.caption || cleanThemeHeading,
        image_context:
          cfg.image_context ||
          `Examine this pivotal moment in the history of ${cleanThemeHeading}. **Hinge Question:** How did this visual evidence shape the national perception of the crisis?`,
        hinge_question: cfg.hinge || {
          text: `What was the primary significance of ${cleanThemeHeading}?`,
          options: [
            'It decisively challenged the balance of power between federal and state authorities.',
            'It immediately resolved all racial and military conflicts.',
            'It was ignored by the national media and politicians.',
            'It forced an immediate ceasefire across the country.',
          ],
          answer: 0,
          explanation:
            'Historical evidence demonstrates that this development fundamentally tested and shifted the balance between federal authority and local resistance.',
        },
        tasks: embeddedTasks.length > 0 ? embeddedTasks : undefined,
      });
    });
  }

  // Extended Assessment Practice at the End of the Lesson
  let extended = null;
  if (rawL.howUsefulAnalyser) {
    const hua = rawL.howUsefulAnalyser;
    // Clean up prompt
    let qText =
      hua.question || 'How useful are Sources A and B for an enquiry into this topic? (8 marks)';
    qText = qText.replace(/Sources D and E/gi, 'Sources A and B');
    qText = qText.replace(/Sources D & E/gi, 'Sources A and B');

    // Clean up model answer
    let modelText = hua.modelAnswer || '';
    modelText = modelText.replace(/Source D/g, 'Source A');
    modelText = modelText.replace(/Source E/g, 'Source B');
    modelText = modelText.replace(/\[\[/g, '<strong>').replace(/\]\]/g, '</strong>');
    modelText = modelText.replace(/\{\{/g, '<em>').replace(/\}\}/g, '</em>');

    let srcA = null;
    if (hua.sourceD) {
      let prov = hua.sourceD.provenance || 'Contemporary primary source.';
      if (!prov.startsWith('Source A:')) {
        prov = `Source A: ${prov.replace(/^From /i, 'From ')}`;
      }
      srcA = {
        provenance: prov,
        content: hua.sourceD.content || '',
      };
    }
    let srcB = null;
    if (hua.sourceE) {
      let prov = hua.sourceE.provenance || 'Contemporary primary source.';
      if (!prov.startsWith('Source B:')) {
        prov = `Source B: ${prov.replace(/^From /i, 'From ')}`;
      }
      srcB = {
        provenance: prov,
        content: hua.sourceE.content || '',
      };
    }

    extended = {
      title: 'Edexcel GCSE Paper 3: 8-Mark Source Utility Assessment',
      question: qText,
      source_a: srcA,
      source_b: srcB,
      hints: [
        'Content (Utility): What specific details in each source answer the enquiry? Support this with your own historical knowledge.',
        'Provenance (Author, Motive, Date): Who created the source, why did they produce it, and does this increase or limit its utility?',
        'Comparative Judgment: Clearly weigh up the relative strengths and limitations of both sources to reach a balanced conclusion.',
      ],
      provenance_clue:
        "Scaffolding Clue: Evaluate the author, audience, and motive for both sources. For written accounts, consider if the author has political reasons to justify their actions. For photographs, consider what may be excluded outside the camera's frame.",
      model: modelText,
    };
  } else if (key === 'subtopic_1_4') {
    extended = {
      title: 'Edexcel GCSE Paper 3: 12-Mark Explanation Assessment',
      question:
        "Explain why there was widespread Southern white opposition to desegregation in the years 1954–57. (12 marks)\n\nYou may use the following in your answer:\n- The Ku Klux Klan (KKK)\n- The 'Southern Manifesto' (1956)\nYou must also use information of your own.",
      hints: [
        'Explain three distinct, fully developed causes using PEEL paragraphs (Point, Evidence, Explanation, Link).',
        "Analyze political resistance (Southern Manifesto / Dixiecrats), economic coercion (White Citizens' Councils), and violent intimidation (KKK / murder of Emmett Till).",
        'Ensure you directly explain WHY each factor motivated Southern white resistance to federal authority.',
      ],
      model: `<h3>Model Answer (Level 4 — 12/12 marks):</h3>
<p><strong>One major reason for widespread Southern white opposition to desegregation was organized political resistance led by Southern elected officials, epitomized by the 1956 'Southern Manifesto'.</strong> In 1956, 101 Southern congressmen and senators signed the manifesto, openly condemning the Supreme Court's <em>Brown v. Board of Education</em> decision as a 'clear abuse of judicial power' and pledging to use 'all lawful means' to resist integration. Southern state governments, led by 'Dixiecrats', embraced the strategy of 'Massive Resistance', passing state laws to cut funding from integrated schools and even shutting down public schools entirely (as Governor Faubus did in Little Rock during the 'Lost Year' of 1958–59). This political leadership legitimized popular defiance by framing segregation as a constitutional defense of 'states' rights' against federal tyranny, encouraging ordinary white citizens to disobey federal court orders.</p>
<p><strong>A second crucial reason was the rise of middle-class economic coercion through White Citizens' Councils.</strong> Formed in Mississippi in 1954 following the <em>Brown</em> ruling, the White Citizens' Councils grew to over 250,000 members across the South, attracting doctors, lawyers, bankers, and business owners who branded themselves as 'respectable' segregationists. Rather than using overt physical violence, the Councils used devastating economic warfare against Black activists and integration supporters. Black parents who signed petitions to integrate local schools had their mortgages foreclosed, bank loans canceled, and employment terminated, while Black sharecroppers were evicted from white-owned land. This systematic economic terror made supporting desegregation financially ruinous for Black families, effectively paralyzing local integration efforts without needing open street violence.</p>
<p><strong>Finally, extreme racial opposition was enforced through violent domestic terrorism and intimidation by the Ku Klux Klan (KKK).</strong> The <em>Brown</em> decision triggered a violent resurgence of the KKK across the Deep South, marked by cross burnings, firebombings of Black churches and homes, and brutal lynchings. The horrific murder of 14-year-old Emmett Till in Mississippi in August 1955 and the subsequent acquittal of his white murderers by an all-white jury demonstrated that white violence was protected by the Southern legal system. This unchecked brutality was designed to terrify Black communities into submission and demonstrate that any challenge to the racial hierarchy would carry fatal consequences. Therefore, Southern white opposition succeeded in delaying integration through a coordinated combination of political obstruction, economic ruin, and physical terror.</p>`,
    };
  } else if (key === 'subtopic_2_4') {
    extended = {
      title: 'Edexcel GCSE Paper 3: 12-Mark Explanation Assessment',
      question:
        'Explain why violent riots broke out in American cities between 1965 and 1968. (12 marks)\n\nYou may use the following in your answer:\n- The Watts Riot (1965)\n- The Kerner Commission Report (1968)\nYou must also use information of your own.',
      hints: [
        'Focus on systemic causes rather than just immediate triggers.',
        'Contrast de jure segregation in the South with de facto economic and housing segregation in Northern ghettos.',
        "Examine police brutality, economic despair, and the catalytic shock of Martin Luther King Jr.'s assassination.",
      ],
      model: `<h3>Model Answer (Level 4 — 12/12 marks):</h3>
<p><strong>One fundamental reason for the outbreak of urban riots between 1965 and 1968 was severe de facto segregation and economic deprivation in Northern and Western inner-city ghettos.</strong> While federal legislation like the 1964 Civil Rights Act outlawed legal (de jure) segregation in the South, it did nothing to address economic hardship in northern cities like Los Angeles, Chicago, and Detroit. Black Americans were trapped in substandard inner-city housing due to discriminatory practices like 'redlining' by banks. Unemployment among young Black urban men was up to three times higher than national averages, and ghetto schools were chronically underfunded. This created an atmosphere of deep despair, as Black urban populations felt excluded from the American economic dream despite civil rights victories in the South.</p>
<p><strong>A second direct cause was pervasive police brutality and racial friction with virtually all-white police forces.</strong> In August 1965, the arrest of Marquette Frye in the Watts district of Los Angeles by California Highway Patrol sparked six days of rioting that left 34 dead and over 1,000 injured. Similar confrontations ignited riots in Newark and Detroit in 1967. The federal Kerner Commission Report, published in 1968 by President Johnson's National Advisory Commission on Civil Disorders, famously concluded that America was 'moving toward two societies, one black, one white—separate and unequal.' The Kerner Report explicitly identified aggressive, heavy-handed policing in Black neighborhoods as the immediate spark that detonated urban anger.</p>
<p><strong>Finally, urban violence was catalyzed by rising frustration with the limitations of non-violence and the catastrophic shock of Martin Luther King Jr.'s assassination in April 1968.</strong> Many young urban Black Americans felt that the SCLC's non-violent Christian marches had failed to improve the material conditions of the northern working class, leading them to embrace more assertive Black Power rhetoric. When King was assassinated on April 4, 1968, in Memphis, the devastating news triggered violent uprisings in more than 100 American cities within hours, including Washington D.C., Chicago, and Baltimore. The assassination destroyed faith in peaceful reform among millions of Black Americans, unleashing a wave of grief and fury that required tens of thousands of federal troops to suppress. Therefore, systemic economic exclusion, discriminatory policing, and the death of non-violent leadership combined to ignite the urban rebellions of the late 1960s.</p>`,
    };
  } else if (key === 'subtopic_4_4') {
    extended = {
      title: 'Edexcel GCSE Paper 3: 16-Mark Judgment Essay',
      question:
        "'The main reason the United States failed to win the Vietnam War was the military effectiveness of Vietcong guerrilla tactics.' How far do you agree with this statement? (16 marks + 4 SPaG)\n\nYou may use the following in your answer:\n- Vietcong guerrilla tactics and tunnel networks\n- The domestic anti-war movement and the 'credibility gap'\nYou must also use information of your own.",
      hints: [
        'Formulate a clear thesis in your introduction that directly answers the question.',
        'Examine Vietcong guerrilla tactics (ambushes, booby traps, Cu Chi tunnels, blending with peasants) vs US tactical failures (search-and-destroy, firepower reliance).',
        'Examine alternative factors: US home front collapse (anti-war protests, media coverage, Tet Offensive), ARVN weakness and political corruption in Saigon, and North Vietnamese resolve (Ho Chi Minh trail, Soviet/Chinese aid).',
        'Provide a sustained, justified judgment in your conclusion.',
      ],
      model: `<h3>Model Answer (Level 4 — 16/16 marks + 4 SPaG):</h3>
<p><strong>Introduction:</strong> The US failure to achieve military victory in Vietnam between 1965 and 1973 was a multifaceted catastrophe. While Vietcong guerrilla tactics were exceptionally effective in neutralizing American technological superiority and inflicting continuous attrition, they were not the sole cause of defeat. The war was equally lost due to the domestic collapse of political support on the American home front, the deep corruption and military weakness of the South Vietnamese government (ARVN), and the unwavering resilience of North Vietnam backed by Soviet and Chinese aid. Ultimately, Vietcong tactics were decisive because they prolonged the war to the point where the American public and political system refused to sustain it.</p>
<p><strong>Arguments supporting the statement (Vietcong Tactics):</strong> There is strong evidence that Vietcong guerrilla tactics were the primary operational reason for US failure. Guided by General Vo Nguyen Giap, the Vietcong avoided set-piece battles where US air superiority and artillery could destroy them. Instead, they adopted 'hanging onto American belts'—fighting at close range so US forces could not call in air strikes without hitting their own troops. Their extensive underground tunnel networks, such as at Cu Chi, allowed them to launch surprise ambushes, store supplies, and disappear undetected. Furthermore, booby traps (like punji stake pits and tripwire mines) caused 11% of all US deaths and 17% of wounds, inflicting devastating psychological trauma on American conscripts. By dressing as ordinary peasants, the Vietcong denied US troops a visible enemy, rendering search-and-destroy missions deeply frustrating and often counterproductive.</p>
<p><strong>Alternative Factor 1 (US Tactical and Strategic Errors):</strong> Conversely, it can be argued that US failure stemmed from flawed American military strategies rather than Vietcong brilliance alone. General Westmoreland pursued a war of attrition measured by 'body counts', mistakenly believing US firepower would force the enemy to a breaking point. Instead, tactics like search-and-destroy, heavy napalm bombing, and Agent Orange defoliation alienated the South Vietnamese peasantry whose 'hearts and minds' were essential to win. The massacre of hundreds of unarmed civilians at My Lai in 1968 demonstrated how strategic frustration led to atrocities that destroyed the moral legitimacy of the American mission both in Vietnam and internationally.</p>
<p><strong>Alternative Factor 2 (Home Front Opposition & The Credibility Gap):</strong> Crucially, the war was lost on the American home front as domestic political consensus collapsed. Vietnam was the world's first 'television war', bringing graphic footage of combat, wounded soldiers, and burning villages into American living rooms every night. The shock of the January 1968 Tet Offensive shattered government claims that victory was near, creating a vast 'credibility gap' between official statements and battlefield reality. Following Tet, influential news anchor Walter Cronkite declared the war an unwinnable stalemate. Massive anti-war demonstrations, university strikes (culminating in the Kent State shootings of 1970), and veteran protests made continuing the war politically impossible, compelling President Nixon to pursue 'Vietnamization' and diplomatic withdrawal.</p>
<p><strong>Conclusion:</strong> In conclusion, while Vietcong guerrilla tactics were essential in preventing a rapid American victory, they were not the sole reason the US lost. The decisive factor was the interplay between guerrilla warfare and the American home front. Asymmetric guerrilla tactics succeeded because they turned the war into a prolonged war of attrition. North Vietnam and the Vietcong were fighting an existential war of national liberation and were willing to absorb staggering casualties, whereas the United States was fighting a limited Cold War engagement. Once the American public recognized that no amount of bombing or troop deployment could break the enemy's will, political support evaporated. Therefore, Vietcong tactics succeeded primarily because they created the conditions that forced America's domestic withdrawal.</p>`,
    };
  }

  // Historian's Corner (Historiographical Debates)
  let historians_corner = null;
  if (rawL.dualPerspective) {
    const dp = rawL.dualPerspective;
    historians_corner = {
      title: dp.neutralTitle || "Historians' Debate: Contrasting Interpretations",
      author_context: `${dp.leftLabel || 'Perspective A'}: "${dp.leftHeadline}" vs ${dp.rightLabel || 'Perspective B'}: "${dp.rightHeadline}"`,
      extract: `**${dp.leftLabel || 'Interpretation 1'}:** ${dp.leftText}\n\n**${dp.rightLabel || 'Interpretation 2'}:** ${dp.rightText}`,
      stretch_question: `Which historical interpretation provides a more convincing explanation of developments in ${rawL.headerTitle || 'this period'}?`,
      starter: `It can be argued that ${dp.leftLabel || 'the first perspective'} is more convincing because...`,
      clue: 'Consider the concrete historical evidence: were outcomes driven by federal legal decisions or by grassroots direct action on the ground?',
      stretch_model: `A top-level historical response synthesizes both perspectives: while top-down decisions (such as federal court rulings or presidential interventions) established the indispensable constitutional foundation, bottom-up grassroots pressure was essential to compel reluctant authorities to enforce those rulings against entrenched local resistance.`,
    };
  }

  // Think-Pair-Share
  const pair_share = {
    prompt: rawL.livedExperience
      ? rawL.livedExperience.discussionQuestion
      : rawL.lessonWrapUp
        ? rawL.lessonWrapUp.discussionQuestion
        : 'What was the single most decisive factor in this period?',
    think:
      'Reflect on the evidence presented in the narrative, primary sources, and scholarly perspectives.',
    pair: 'Share your perspective with your partner, comparing the significance of legal litigation versus grassroots action.',
    share: 'Synthesize your joint conclusion: which factor had the greatest enduring legacy?',
  };

  // Lesson Tasks (Inference, Consequence & Deep Thinking)
  const tasks = [];
  if (rawL.questionVault && rawL.questionVault.length > 0) {
    const qv = rawL.questionVault[0];
    tasks.push({
      qNum: 1,
      question: qv.question,
      starter: qv.answer ? qv.answer.split('.')[0] + '.' : 'From the evidence, I can infer that...',
      model: qv.answer || 'A model response makes two supported inferences from the source.',
    });
  }
  if (rawL.deepThinkingQuestions && rawL.deepThinkingQuestions.length > 0) {
    rawL.deepThinkingQuestions.forEach((dt, dtIdx) => {
      tasks.push({
        qNum: tasks.length + 1,
        question: dt.question,
        starter: dt.hint ? `Consider: ${dt.hint}` : 'One key reason was that...',
        model:
          dt.teacherGuide ||
          'A comprehensive historical explanation linking causes, actions, and consequences.',
      });
    });
  }

  // Teacher notes with structured objectives and hinge questions
  const teacher_notes = {
    primer: `This lesson investigates ${rawL.headerTitle || 'this key topic in 20th century US history'}. ${rawL.headerIntro || ''}`,
    objectives: [
      {
        objective: `Demonstrate comprehensive historical knowledge of the key developments and figures in ${rawL.headerTitle || 'this lesson'}.`,
        primer:
          'Guide pupils through the numbered narrative themes, emphasizing specific historical evidence, dates, and legislation.',
        question: `What was the most significant direct cause of developments in ${rawL.headerTitle ? rawL.headerTitle.split(':')[1]?.trim() || rawL.headerTitle : 'this topic'}?`,
      },
      {
        objective:
          'Analyse conflicting motivations, tactics, and responses of groups and individuals involved in the crisis.',
        primer:
          'Contrast top-down federal authority with grassroots direct action and entrenched local opposition using primary source accounts.',
        question: `How did the balance of power between federal authority and local opposition shift as a result of these events?`,
      },
      {
        objective:
          'Evaluate competing historical interpretations and source evidence to construct reasoned causal judgments for Paper 3.',
        primer:
          "Direct pupils to the Historian's Corner and the concluding GCSE assessment practice, ensuring criteria-driven evaluation.",
        question: `Which factor had the greatest enduring long-term consequence for the United States?`,
      },
    ],
    source_context: rawL.livedExperience
      ? `${rawL.livedExperience.context} **Hinge Question:** ${rawL.livedExperience.discussionQuestion}`
      : `Examine this primary source evidence from ${rawL.headerTitle || 'this period'}. **Hinge Question:** Why did eyewitnesses interpret these events with conflicting perspectives?`,
  };

  lessons.push({
    id: lessonId,
    title: rawL.headerTitle || `Lesson ${tNum}.${sNum}`,
    enquiry: rawL.headerIntro || 'What were the causes and consequences of these pivotal events?',
    teacher_notes: teacher_notes,
    learning_objectives: {
      overarching:
        rawL.headerIntro || 'To understand the causes and consequences of key US events, 1954-75.',
      scaffolded: [
        'Identify key historical figures, dates, and organisations.',
        'Explain the causal connections between legislation, protest, and backlash.',
        'Evaluate contrasting historical interpretations for Paper 3.',
      ],
    },
    do_now: {
      type: 'questions',
      title: 'Recall & Retrieval',
      instructions: 'Answer these questions in full sentences to activate prior knowledge.',
      items: doNowItems,
    },
    starters: undefined,
    vocab: vocab,
    narrative_blocks: narrative_blocks,
    primary_source: null,
    utility_starters: null,
    extended: extended,
    historians_corner: historians_corner,
    pair_share: pair_share,
    tasks: tasks,
    dualPerspective: rawL.dualPerspective || null,
    causalLinks: rawL.causalLinks || null,
  });
});

// Build 13 mock exam papers metadata
console.log('--- Step 4: Configuring 13 GCSE Mock Exams ---');
const mock_exams = PAST_PAPERS_DATA.map((p, idx) => {
  const isBestGuess = p.id.startsWith('mock_');
  const fileName = `usa_mock_${idx + 1}.html`;
  const msFileName = `usa_mock_${idx + 1}_mark_scheme.html`;

  return {
    id: `usa_mock_${idx + 1}`,
    rawId: p.id,
    title: p.title || `Paper 3 Exam Practice ${idx + 1}`,
    paper_reference: '1HI0/33',
    time_minutes: 80,
    total_marks: 52,
    enquiry_topic: p.enquiryTopic || '',
    url: fileName,
    mark_scheme_url: msFileName,
    has_mark_scheme: true,
    is_best_guess: isBestGuess,
    year: p.year || '2026',
  };
});

// Write units/usa/data.js
console.log('--- Step 5: Writing units/usa/data.js ---');
const unitDataObject = {
  specification_file: '/data/usa_spec.json',
  title: 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75',
  enquiry_question:
    'Civil Rights and the Vietnam War: How did social and foreign crises transform the USA?',
  homepage_background: '/images/usa_march_on_washington_leaders.jpg',
  category: 'Edexcel GCSE',
  desc: 'Paper 3 (1HI0/33)',
  icon: 'fa-flag-usa',
  color: '#2563eb',
  bg: 'rgba(37, 99, 235, 0.1)',
  yearGroup: 'Year 11',
  edition: '2026.1',
  workbooks: workbooks,
  timeline: timeline,
  key_individuals: key_individuals,
  mock_exams: mock_exams,
  lessons: lessons,
};

const dataJsContent = `// Auto-generated Paper 3 USA Unit Data
export const usa = ${JSON.stringify(unitDataObject, null, 2)};
export default usa;
`;

fs.writeFileSync(path.join(TARGET_DIR, 'data.js'), dataJsContent, 'utf8');
console.log('Successfully generated units/usa/data.js with 16 enriched lessons!');

// Write mock HTML files and mark scheme files
console.log('--- Step 6: Generating 13 Mock HTML and Mark Scheme pages ---');

function generatePaperHtml(paper, mockMeta) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${paper.title} - Pearson Edexcel GCSE (9-1) History</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; font-family: 'Open Sans', Arial, sans-serif; }
    body { margin: 0; padding: 0; background: #e0e0e0; color: #000; }
    .page { width: 210mm; min-height: 297mm; background: white; margin: 20mm auto; padding: 15mm; box-shadow: 0 0 15px rgba(0,0,0,0.2); position: relative; page-break-after: always; display: flex; flex-direction: column; }
    @media print { body { background: white; } .no-print { display: none !important; } .page { margin: 0; padding: 15mm; box-shadow: none; width: 100%; min-height: 100%; page-break-after: always; } }
    .cover-box { border: 3px solid #666; border-radius: 15px; padding: 15px 20px; margin-bottom: 20px; }
    .candidate-info { display: flex; gap: 15px; margin-bottom: 15px; }
    .input-box { border: 2px solid #666; border-radius: 5px; height: 35px; background: white; flex: 1; }
    .char-box { border: 2px solid #666; border-radius: 5px; height: 35px; width: 25px; display: inline-block; background: white; margin-right: 2px; }
    .edexcel-title { font-size: 26px; font-weight: 700; margin: 15px 0 5px 0; }
    .dotted-line { border-bottom: 1px dotted #888; height: 26px; margin-bottom: 2px; }
    .source-box { border: 2px solid #333; padding: 14px; margin: 15px 0; background: #fafafa; border-radius: 6px; }
    .provenance { font-style: italic; font-size: 13px; margin-bottom: 8px; color: #333; }
    .source-content { font-size: 14px; line-height: 1.5; }
    .question-title { font-weight: bold; font-size: 15px; margin-top: 15px; }
    .mark-scheme-banner { background: #1e3a8a; color: white; padding: 12px 18px; border-radius: 8px; margin-bottom: 20px; font-weight: bold; font-size: 16px; }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="font-size: 13px; font-weight: bold;">Candidate Number</div>
        <div style="margin-top: 4px;">
          <div class="char-box"></div><div class="char-box"></div><div class="char-box"></div><div class="char-box"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 13px; font-weight: bold;">Paper Reference</div>
        <div style="font-size: 18px; font-weight: 800; margin-top: 4px;">1HI0/33</div>
      </div>
    </div>

    <div class="edexcel-title">Pearson Edexcel GCSE (9–1)</div>
    <div style="font-size: 20px; font-weight: bold; margin-bottom: 25px;">History</div>
    <div style="font-size: 16px; font-weight: bold; border-top: 2px solid #000; padding-top: 10px;">
      PAPER 3: Modern Depth Study
    </div>
    <div style="font-size: 15px; margin-bottom: 20px;">
      Option 33: The USA, 1954–75: conflict at home and abroad
    </div>

    <div class="cover-box" style="margin-top: 20px;">
      <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">Instructions</div>
      <ul style="font-size: 13px; line-height: 1.6; margin: 0; padding-left: 20px;">
        <li>Use black ink or ball-point pen.</li>
        <li>Answer ALL questions in Section A and Section B.</li>
        <li>Time allowed: <strong>1 hour 20 minutes</strong> (52 marks + 4 SPaG = 56 marks total).</li>
      </ul>
    </div>

    <div style="margin-top: auto; border-top: 1px solid #ccc; padding-top: 10px; font-size: 12px; color: #555; display: flex; justify-content: space-between;">
      <span>Turn over</span>
      <span>P1HI0/33</span>
    </div>
  </div>

  <!-- SECTION A -->
  <div class="page">
    <div style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px;">
      SECTION A
    </div>
    
    <!-- Question 1 -->
    <div class="question-title">
      1. Give two things you can infer from Source A about ${paper.enquiryTopic || 'the situation in the USA'}. (4 marks)
    </div>
    <div class="source-box">
      <div class="provenance">Source A: ${paper.sourceA ? paper.sourceA.provenance : 'Contemporary source document.'}</div>
      <div class="source-content">${paper.sourceA ? paper.sourceA.content : ''}</div>
    </div>
    <div style="margin-top: 15px; font-size: 13px; font-weight: bold;">(i) What I can infer:</div>
    <div class="dotted-line"></div>
    <div style="margin-top: 10px; font-size: 13px; font-weight: bold;">Details in the source that tell me this:</div>
    <div class="dotted-line"></div><div class="dotted-line"></div>

    <div style="margin-top: 20px; font-size: 13px; font-weight: bold;">(ii) What I can infer:</div>
    <div class="dotted-line"></div>
    <div style="margin-top: 10px; font-size: 13px; font-weight: bold;">Details in the source that tell me this:</div>
    <div class="dotted-line"></div><div class="dotted-line"></div>
  </div>

  <!-- Question 2 -->
  <div class="page">
    <div class="question-title">
      2. ${paper.q2 ? paper.q2.question : 'Explain why tension escalated during this period. (12 marks)'}
    </div>
    ${paper.q2 && paper.q2.stimulus ? `<div style="background: #f1f5f9; padding: 10px; border-radius: 4px; font-size: 13px; margin: 10px 0;">You may use the following in your answer: <ul>${paper.q2.stimulus.map((s) => `<li>${s}</li>`).join('')}</ul> You must also use information of your own.</div>` : ''}
    ${Array.from({ length: 24 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <!-- SECTION B -->
  <div class="page">
    <div style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px;">
      SECTION B
    </div>
    <p style="font-size: 13px; font-style: italic;">For an enquiry into: ${paper.enquiryTopic || 'the conflict in the USA'}</p>

    <!-- Source B & C -->
    <div class="source-box">
      <div class="provenance">Source B: ${paper.sourceB ? paper.sourceB.provenance : ''}</div>
      <div class="source-content">${paper.sourceB ? paper.sourceB.content : ''}</div>
    </div>
    <div class="source-box">
      <div class="provenance">Source C: ${paper.sourceC ? paper.sourceC.provenance : ''}</div>
      <div class="source-content">${paper.sourceC ? paper.sourceC.content : ''}</div>
    </div>

    <!-- Question 3(a) -->
    <div class="question-title">
      3 (a) ${paper.q3a ? paper.q3a.question : 'How useful are Sources B and C for an enquiry into this topic? (8 marks)'}
    </div>
    ${Array.from({ length: 12 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <!-- Interpretations 1 & 2 -->
  <div class="page">
    <div class="source-box">
      <div class="provenance">Interpretation 1: From a modern historical study.</div>
      <div class="source-content">${paper.interpretation1 ? paper.interpretation1.content : paper.q3b ? paper.q3b.question : ''}</div>
    </div>
    <div class="source-box">
      <div class="provenance">Interpretation 2: From a different historical perspective.</div>
      <div class="source-content">${paper.interpretation2 ? paper.interpretation2.content : ''}</div>
    </div>

    <!-- Question 3(b) & 3(c) -->
    <div class="question-title">
      3 (b) ${paper.q3b ? paper.q3b.question : 'Study Interpretations 1 and 2. What is the main difference between these views? (4 marks)'}
    </div>
    ${Array.from({ length: 6 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}

    <div class="question-title" style="margin-top: 15px;">
      3 (c) ${paper.q3c ? paper.q3c.question : 'Suggest one reason why Interpretations 1 and 2 give different views. (4 marks)'}
    </div>
    ${Array.from({ length: 6 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <!-- Question 3(d) 16 marks -->
  <div class="page">
    <div class="question-title">
      3 (d) ${paper.q3d ? paper.q3d.question : 'How far do you agree with Interpretation 2? (16 marks + 4 marks SPaG)'}
    </div>
    ${Array.from({ length: 24 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <script src="/scripts/exam_timer.js"></script>
</body>
</html>`;
}

function generateMarkSchemeHtml(paper, mockMeta) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teacher Mark Scheme: ${paper.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; font-family: 'Open Sans', Arial, sans-serif; }
    body { margin: 0; padding: 25px; background: #f8fafc; color: #0f172a; max-width: 900px; margin: 0 auto; }
    .banner { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: white; padding: 25px; border-radius: 10px; margin-bottom: 25px; }
    .q-card { background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
    .q-title { font-weight: 800; font-size: 1.1rem; color: #1e3a8a; margin-bottom: 8px; }
    .clue-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 14px; border-radius: 4px; font-size: 0.9rem; margin-bottom: 12px; }
    .model-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; }
    .print-btn { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; margin-bottom: 15px; }
    @media print { .no-print { display: none !important; } body { padding: 0; background: white; } .q-card { box-shadow: none; border: 1px solid #ccc; page-break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="no-print" style="display: flex; justify-content: space-between; align-items: center;">
    <a href="/#unit=usa&view=mock-exams" style="color: #0284c7; text-decoration: none; font-weight: bold;">← Back to Mock Exams Hub</a>
    <button class="print-btn" onclick="window.print()">🖨️ Print Teacher Mark Scheme</button>
  </div>

  <div class="banner">
    <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; font-weight: 700;">Pearson Edexcel GCSE (9–1) History Mark Scheme</div>
    <h1 style="margin: 6px 0 0 0; font-size: 1.6rem;">${paper.title}</h1>
    <div style="margin-top: 6px; font-size: 0.95rem; color: #cbd5e1;">Paper 3: Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)</div>
  </div>

  <!-- Question 1 -->
  <div class="q-card">
    <div class="q-title">Question 1: Inference from Source A (4 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO3 (4 marks). Award 1 mark for each valid inference, up to 2. Award 1 mark for each corresponding quote/detail, up to 2.</div>
    <div class="model-box"><strong>Sample Acceptable Inferences:</strong>
• Inference 1: Southern officials deliberately created impossible barriers to block Black citizens from exercising their constitutional voting rights.
  - Detail from source: "Local registrars administer arbitrary 'literacy exams' that require Black applicants to interpret intricate constitutional clauses..."
• Inference 2: Black citizens faced economic reprisal and terrorism for attempting to register.
  - Detail from source: "any Black citizen attempting to register risks immediate dismissal by their employer. Intimidation is omnipresent."</div>
  </div>

  <!-- Question 2 -->
  <div class="q-card">
    <div class="q-title">Question 2: Causal Explanation (12 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO1/AO2 (12 marks). Level 4 (10–12 marks): An analytical explanation showing a line of reasoning with clear links to the outcome, supported by accurate, detailed knowledge.</div>
    <div class="model-box">${paper.q2 && paper.q2.model ? paper.q2.model.replace(/\[\[/g, '<strong>').replace(/\]\]/g, '</strong>').replace(/\{\{/g, '<em>').replace(/\}\}/g, '</em>') : 'Level 4 model answers available in teacher pack.'}</div>
  </div>

  <!-- Question 3(a) -->
  <div class="q-card">
    <div class="q-title">Question 3(a): Source Utility (8 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO3 (8 marks). Assess content utility, verify with contextual knowledge, and evaluate provenance reliability and limitations for BOTH sources.</div>
    <div class="model-box">${paper.q3a && paper.q3a.model ? paper.q3a.model : 'Assesses utility using content, contextual knowledge, and provenance evaluation.'}</div>
  </div>

  <!-- Question 3(b) -->
  <div class="q-card">
    <div class="q-title">Question 3(b): Difference Between Interpretations (4 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO4 (4 marks). Identify the main difference of view, supported by details from both interpretations.</div>
    <div class="model-box">${paper.q3b && paper.q3b.model ? paper.q3b.model.replace(/\[1\[/g, '<strong>"').replace(/\]1\]/g, '"</strong>') : ''}</div>
  </div>

  <!-- Question 3(c) -->
  <div class="q-card">
    <div class="q-title">Question 3(c): Reason for Difference in Interpretations (4 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO4 (4 marks). Explain how the historians may have relied on different sources to reach their views.</div>
    <div class="model-box">${paper.q3c && paper.q3c.model ? paper.q3c.model.replace(/\[1\[/g, '<strong>"').replace(/\]1\]/g, '"</strong>') : ''}</div>
  </div>

  <!-- Question 3(d) -->
  <div class="q-card">
    <div class="q-title">Question 3(d): Evaluation of Interpretation (16 Marks + 4 SPaG)</div>
    <div class="clue-box"><strong>Target:</strong> AO4 (16 marks) + SPaG (4 marks). Level 4 (13–16 marks): Balanced discussion analyzing both interpretations with sustained contextual knowledge, leading to a justified judgment.</div>
    <div class="model-box">${paper.q3d && paper.q3d.model ? paper.q3d.model.replace(/\[\[/g, '<strong>').replace(/\]\]/g, '</strong>').replace(/\[1\[/g, '<strong>"').replace(/\]1\]/g, '"</strong>').replace(/\{\{/g, '<em>').replace(/\}\}/g, '</em>') : ''}</div>
  </div>
</body>
</html>`;
}

PAST_PAPERS_DATA.forEach((paper, idx) => {
  const meta = mock_exams[idx];
  const paperHtml = generatePaperHtml(paper, meta);
  const msHtml = generateMarkSchemeHtml(paper, meta);

  fs.writeFileSync(path.join(PUBLIC_USA_DIR, meta.url), paperHtml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_USA_DIR, meta.mark_scheme_url), msHtml, 'utf8');
});

console.log('Generated 13 mock exam HTML papers and 13 teacher mark scheme files.');
console.log('🎉 Step 7: Complete! Ready to compile into database.json.');
