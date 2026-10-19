const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'units', 'ks2_ww2', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

const updatedDoNows = [
  // Lesson 1: Outbreak 1939 & Home Front Mobilisation
  {
    lessonIndex: 0,
    do_now: {
      title: 'Do Now: Foundations of the Second World War',
      type: 'mixed',
      items: [
        {
          question: 'Between which years was the First World War fought?',
          answer: '1914–1918',
        },
        {
          question:
            'Which country did Adolf Hitler and Nazi Germany invade on 1 September 1939, triggering Britain to declare war?',
          answer: 'Poland',
        },
        {
          question: 'What does the term "civilian" mean in wartime?',
          answer:
            'An ordinary person who is not a member of the armed forces (army, navy, or air force)',
        },
        {
          question:
            'Which body of water separates the island of Great Britain from mainland Europe?',
          answer: 'The English Channel',
        },
      ],
    },
  },
  // Lesson 2: Operation Pied Piper & British Evacuation -> Retrieves from Enquiry 1
  {
    lessonIndex: 1,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 1 (Outbreak & Home Front)',
      type: 'mixed',
      items: [
        {
          question:
            'On what exact date did Great Britain declare war on Germany following the invasion of Poland?',
          answer: 'Sunday 3 September 1939',
        },
        {
          question:
            'Which British Prime Minister delivered the 11:15am wireless radio broadcast announcing Britain was at war?',
          answer: 'Neville Chamberlain',
        },
        {
          question:
            'What protective equipment was issued to every British civilian in a small cardboard box with a shoulder string?',
          answer: 'A civilian gas mask (respirator)',
        },
        {
          question:
            'What strict wartime rule required all lights, windows, and vehicle headlights to be dimmed or covered after dark?',
          answer: 'The Blackout',
        },
      ],
    },
  },
  // Lesson 3: Vera's Journey & The Kindertransport -> Retrieves from Enquiry 2
  {
    lessonIndex: 2,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 2 (Operation Pied Piper & Evacuation)',
      type: 'mixed',
      items: [
        {
          question:
            'What was the official British government codename for the mass evacuation of children to the countryside in 1939?',
          answer: 'Operation Pied Piper',
        },
        {
          question:
            'Approximately how many people, mostly school pupils and mothers, were evacuated from British cities in September 1939?',
          answer: 'Approximately 1.5 million people',
        },
        {
          question:
            "What item was tied or pinned to every evacuee child's coat for identification before boarding the trains?",
          answer: 'A brown cardboard luggage label',
        },
        {
          question:
            'What was the title of the local official in country towns responsible for billeting (housing) arriving evacuee children?',
          answer: 'A Billeting Officer',
        },
      ],
    },
  },
  // Lesson 4: The Blitz & Air Raids -> Retrieves from Enquiry 3
  {
    lessonIndex: 3,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 3 (The Kindertransport)',
      type: 'mixed',
      items: [
        {
          question: 'What does the German word "Kindertransport" mean in English?',
          answer: "Children's transport",
        },
        {
          question:
            'Approximately how many unaccompanied refugee children were rescued and brought to Britain by the Kindertransport?',
          answer: 'Nearly 10,000 children',
        },
        {
          question:
            'Which London railway terminus was the arrival station where Kindertransport children met their British foster families?',
          answer: 'Liverpool Street Station',
        },
        {
          question:
            "Why were the children's parents not allowed to accompany them to Britain on the Kindertransport?",
          answer:
            'British rescue visas and financial guarantees were strictly granted only for unaccompanied children under 17',
        },
      ],
    },
  },
  // Lesson 5: Dig for Victory & Wartime Rationing -> Retrieves from Enquiry 4
  {
    lessonIndex: 4,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 4 (The Blitz & Air Raids)',
      type: 'mixed',
      items: [
        {
          question:
            'From which German word meaning "lightning war" did the term "The Blitz" originate?',
          answer: 'Blitzkrieg',
        },
        {
          question:
            'For how many consecutive nights was the city of London bombed by the Luftwaffe between September and November 1940?',
          answer: '57 consecutive nights',
        },
        {
          question:
            'Which type of garden shelter was built by digging into the earth and assembling curved corrugated steel arches?',
          answer: 'An Anderson Shelter',
        },
        {
          question:
            'Where did thousands of Londoners shelter overnight to escape falling bombs when they did not have a garden?',
          answer: 'London Underground (Tube) stations (or Morrison table shelters)',
        },
      ],
    },
  },
  // Lesson 6: Women at War -> Retrieves from Enquiry 5
  {
    lessonIndex: 5,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 5 (Rationing & Food Production)',
      type: 'mixed',
      items: [
        {
          question:
            'In which month and year was compulsory food rationing first introduced in Great Britain?',
          answer: 'January 1940',
        },
        {
          question:
            'What naval weapon threatened British merchant cargo ships bringing imported food across the Atlantic Ocean?',
          answer: 'German U-boats (submarines)',
        },
        {
          question:
            'What was the famous government campaign slogan encouraging citizens to turn gardens and parks into vegetable allotments?',
          answer: '"Dig for Victory"',
        },
        {
          question:
            'What was the name for the illegal, underground buying and selling of rationed goods without coupons?',
          answer: 'The Black Market',
        },
      ],
    },
  },
  // Lesson 7: Pre-War Life & Rights Lost -> Retrieves from Enquiry 6
  {
    lessonIndex: 6,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 6 (Women at War)',
      type: 'mixed',
      items: [
        {
          question:
            'In which year did Great Britain become the first nation to conscript (call up) unmarried women for wartime work?',
          answer: 'December 1941',
        },
        {
          question:
            'What was the civilian organisation where over 80,000 women worked on farms to feed the nation called?',
          answer: 'The Women\'s Land Army (WLA / "Land Girls")',
        },
        {
          question:
            'Why were female munitions factory workers who handled explosives nicknamed "Canary Girls"?',
          answer:
            'Toxic chemicals in TNT explosives temporarily turned their skin and hair bright yellow',
        },
        {
          question:
            'Which civilian aviation organisation employed skilled female pilots to deliver new military aircraft to RAF airfields?',
          answer: 'The Air Transport Auxiliary (ATA)',
        },
      ],
    },
  },
  // Lesson 8: Secret Codebreakers & Bletchley Park -> Retrieves from Enquiry 7
  {
    lessonIndex: 7,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 7 (Pre-War Life & Civil Rights)',
      type: 'mixed',
      items: [
        {
          question:
            'What traditional decorated cardboard cone filled with sweets and school supplies did German children carry on their first school day?',
          answer: 'A Schultüte',
        },
        {
          question:
            'What term describes the basic legal rights and protections that every citizen should enjoy in a fair society?',
          answer: 'Civil rights',
        },
        {
          question:
            'In which month and year did the Nazi government officially ban all Jewish children from attending state schools?',
          answer: 'November 1938',
        },
        {
          question:
            'What term describes treating a specific group unfairly or cruelly because of their religion, race, or identity?',
          answer: 'Discrimination (or Persecution)',
        },
      ],
    },
  },
  // Lesson 9: Who Were the Rescuers? -> Retrieves from Enquiry 8
  {
    lessonIndex: 8,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 8 (Codebreakers & Bletchley Park)',
      type: 'mixed',
      items: [
        {
          question:
            'What secret codename was given to the government codebreaking headquarters at Bletchley Park in Buckinghamshire?',
          answer: 'Station X',
        },
        {
          question:
            'What was the electro-mechanical rotor machine used by the German military to scramble secret radio communications?',
          answer: 'The Enigma Machine',
        },
        {
          question:
            'Which brilliant mathematician and computer pioneer led the Hut 8 team that designed the Bombe codebreaking machine?',
          answer: 'Alan Turing',
        },
        {
          question:
            'Approximately what percentage of the secret workforce deciphering codes at Bletchley Park were women?',
          answer: 'Approximately 75% (around 9,000 women)',
        },
      ],
    },
  },
  // Lesson 10: VE Day, Post-War Rebuilding & Remembrance -> Retrieves from Enquiry 9
  {
    lessonIndex: 9,
    do_now: {
      title: 'Do Now: Retrieval from Enquiry 9 (The Prague Rescuers)',
      type: 'mixed',
      items: [
        {
          question:
            'How many refugee children did Nicholas Winton, Trevor Chadwick, and their volunteer team rescue from Prague in 1939?',
          answer: '669 children',
        },
        {
          question:
            "What was Nicholas Winton's regular daytime job in London before volunteering to organise rescue trains in Prague?",
          answer: 'A stockbroker (financial clerk)',
        },
        {
          question:
            "Where did Nicholas Winton keep his historic scrapbook containing all 669 children's names and photos for nearly 50 years?",
          answer: 'In an old notebook in his attic (until discovered in 1988)',
        },
        {
          question:
            'Which London railway station was the final arrival terminus where the rescued children were met by foster parents?',
          answer: 'Liverpool Street Station',
        },
      ],
    },
  },
];

// Helper to format a do_now object into JS code string
function formatDoNow(dn) {
  const lines = [];
  lines.push('      do_now: {');
  lines.push(`        title: ${JSON.stringify(dn.title)},`);
  lines.push(`        type: 'mixed',`);
  lines.push('        items: [');
  dn.items.forEach((item, idx) => {
    lines.push('          {');
    lines.push(`            question: ${JSON.stringify(item.question)},`);
    lines.push(`            answer: ${JSON.stringify(item.answer)}`);
    lines.push(`          }${idx < dn.items.length - 1 ? ',' : ''}`);
  });
  lines.push('        ]');
  lines.push('      },');
  return lines.join('\n');
}

// Regex replace each lesson's do_now block
// Each lesson has `do_now: { ... },\n        vocab:`
const lessonRegex = /do_now:\s*\{[\s\S]*?\},\s*(?=\s*vocab:)/g;

let lessonCount = 0;
content = content.replace(lessonRegex, (match) => {
  if (lessonCount < updatedDoNows.length) {
    const replacement = formatDoNow(updatedDoNows[lessonCount].do_now);
    lessonCount++;
    return replacement + '\n';
  }
  return match;
});

console.log(`Updated ${lessonCount} do_now blocks in units/ks2_ww2/data.js`);
fs.writeFileSync(dataJsPath, content, 'utf8');

// Also update data/ks2_ww2.json if it exists
const dataJsonPath = path.join(__dirname, '..', 'data', 'ks2_ww2.json');
if (fs.existsSync(dataJsonPath)) {
  const jsonContent = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  if (jsonContent.lessons) {
    updatedDoNows.forEach(({ lessonIndex, do_now }) => {
      if (jsonContent.lessons[lessonIndex]) {
        jsonContent.lessons[lessonIndex].do_now = do_now;
      }
    });
    fs.writeFileSync(dataJsonPath, JSON.stringify(jsonContent, null, 2), 'utf8');
    console.log('Updated data/ks2_ww2.json');
  }
}
