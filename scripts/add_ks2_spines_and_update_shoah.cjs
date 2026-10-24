const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

// 1. Update The Shoah Lesson 2 Block 4 image to boerneplatz_synagogue_burning_1938.png
async function updateShoah() {
  const dataJsPath = path.join(ROOT, 'units', 'the_shoah', 'data.js');
  const publicDataJsonPath = path.join(ROOT, 'public', 'data', 'the_shoah.json');

  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.unitData;

  data.lessons[1].narrative_blocks[3].source.image =
    '/images/boerneplatz_synagogue_burning_1938.png';
  data.lessons[1].narrative_blocks[3].source.src = '/images/boerneplatz_synagogue_burning_1938.png';
  data.lessons[1].narrative_blocks[3].source.title =
    'Source D (Archival Photograph): Spectators Watching the Boerneplatz Synagogue Burning in Frankfurt am Main (10 November 1938)';
  data.lessons[1].narrative_blocks[3].source.caption =
    'Spectators and municipal authorities watching the landmark Boerneplatz Synagogue burn in Frankfurt am Main on 10 November 1938 during the state-orchestrated November Pogrom (Kristallnacht). Emergency fire crews were strictly ordered to protect adjacent "Aryan" properties while letting Jewish houses of worship burn to their foundations.';

  const exportStr = 'export default ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, exportStr, 'utf8');

  const publicUnitJson = {
    id: 'the_shoah',
    data: data,
  };
  fs.writeFileSync(publicDataJsonPath, JSON.stringify(publicUnitJson, null, 2), 'utf8');
  console.log(
    '✅ Updated The Shoah Lesson 2 Block 4 to boerneplatz_synagogue_burning_1938.png in data.js & public/data',
  );

  // Update master rights database
  const rightsPath = path.join(ROOT, 'scripts', 'master_rights_database.json');
  const rightsDb = JSON.parse(fs.readFileSync(rightsPath, 'utf8'));
  const s2d = rightsDb.units.the_shoah.sources.find(
    (s) => s.lesson_num === 2 && s.source_id === 'Source D',
  );
  if (s2d) {
    s2d.artifact_title =
      'Spectators Watching the Boerneplatz Synagogue Burning in Frankfurt am Main (10 November 1938)';
    s2d.repository = 'Jewish Museum Frankfurt / German Federal Archives / Wikimedia Commons';
    s2d.accession_id = 'JMF-BOERNEPLATZ-1938 / BArch-1938-POGROM';
    s2d.source_url =
      'https://commons.wikimedia.org/wiki/File:B%C3%B6rnerplatz_synagogue_burning_-_Kristallnacht_1938-11-10.png';
    fs.writeFileSync(rightsPath, JSON.stringify(rightsDb, null, 2), 'utf8');
    console.log('✅ Updated master rights database for The Shoah Lesson 2 Source D');
  }
}

// 2. Add chronological spines to all 11 lessons of KS2 WW2
async function updateKs2Ww2Spines() {
  const ks2DataJsPath = path.join(ROOT, 'units', 'ks2_ww2', 'data.js');
  const ks2PublicJsonPath = path.join(ROOT, 'public', 'data', 'ks2_ww2.json');

  const fileUrl = 'file:///' + ks2DataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.unitData;

  const ks2Spines = [
    // Lesson 1
    {
      title: 'Home Front Mobilisation Spine',
      subtitle: "From Chamberlain's Radio Broadcast to Blackout Curtains and Gas Masks",
      stages: [
        {
          step: 1,
          para_ref: '[1.1]',
          date: '3 September 1939',
          title: 'The Sunday Wireless Broadcast',
          actor: 'Neville Chamberlain',
          tag: '📻 OUTBREAK',
          trigger:
            "Prime Minister Neville Chamberlain announced over the BBC wireless radio that Britain was at war with Germany following Hitler's invasion of Poland.",
          connective:
            'Triggered immediate nationwide civil defence preparations, sounding air raid sirens across London within minutes of the broadcast.',
          question:
            "How did Chamberlain's radio broadcast transform ordinary family life on a quiet Sunday morning?",
        },
        {
          step: 2,
          para_ref: '[1.3]',
          date: 'Autumn 1939',
          title: 'The Cardboard Gas Mask Box',
          actor: 'British Civilians & Children',
          tag: '📦 PROTECTION',
          trigger:
            'The government issued over 38 million civilian gas masks in cardboard boxes slung over shoulders, fearing devastating aerial gas attacks.',
          connective:
            'Carrying the box everywhere became mandatory for school attendance and travel, visibly transforming British children into wartime citizens.',
          question:
            'Why was carrying a cardboard gas mask box an inescapable daily reminder of war?',
        },
        {
          step: 3,
          para_ref: '[1.5]',
          date: 'September 1939 onwards',
          title: 'The Total Blackout & ARP Wardens',
          actor: 'ARP Wardens & Householders',
          tag: '🚨 BLACKOUT',
          trigger:
            'Thick blackout curtains, car headlight hoods, and extinguished street lamps plunged Britain into total darkness every night.',
          connective:
            'Required 1.4 million civilian Air Raid Precautions (ARP) wardens to patrol streets, ensuring no light betrayed towns to German bombers.',
          question:
            'What challenges did ordinary families face living in pitch-black streets every night?',
        },
      ],
    },

    // Lesson 2
    {
      title: 'Operation Pied Piper Spine',
      subtitle: 'The Colossal Journey of 1.5 Million Children from City Slums to Country Farms',
      stages: [
        {
          step: 1,
          para_ref: '[2.1]',
          date: '1 September 1939',
          title: 'The Great Station Exodus',
          actor: '1.5 Million Schoolchildren & Teachers',
          tag: '🚂 DEPARTURE',
          trigger:
            'The British government launched Operation Pied Piper, gathering thousands of children with brown luggage labels at city railway stations.',
          connective:
            'Emptied urban classrooms in three days, sending trains of bewildered youngsters away from parents into the countryside for safety.',
          question:
            'Why did the British government feel it was essential to separate children from their parents?',
        },
        {
          step: 2,
          para_ref: '[2.3]',
          date: 'September 1939',
          title: 'The Billeting Hall Lottery',
          actor: 'Host Families & Billeting Officers',
          tag: '🏷️ SELECTION',
          trigger:
            'Weary evacuees arrived in village halls where local residents inspected them and chose which children to take into their homes.',
          connective:
            'Created an emotionally fraught lottery where siblings were sometimes separated and children faced anxious uncertainty.',
          question:
            'Why was the billeting hall experience often the most traumatic moment of evacuation for young children?',
        },
        {
          step: 3,
          para_ref: '[2.5]',
          date: '1939–1940',
          title: 'Culture Shock & Rural Discoveries',
          actor: 'Evacuees & Countryside Communities',
          tag: '🌾 CULTURE SHOCK',
          trigger:
            'City children from industrial cobbled streets encountered indoor bathrooms, apple orchards, live cows, and fresh milk for the first time.',
          connective:
            'Exposed deep social divides between city poverty and rural wealth, permanently changing attitudes and fostering lasting bonds.',
          question:
            'How did evacuation open the eyes of British society to the realities of urban poverty?',
        },
      ],
    },

    // Lesson 3
    {
      title: 'The Kindertransport Spine',
      subtitle: 'The Rescue of 10,000 Jewish Children to Safety in Britain (1938–1939)',
      stages: [
        {
          step: 1,
          para_ref: '[3.1]',
          date: 'November 1938',
          title: "The Decision to Open Britain's Doors",
          actor: 'British Parliament & Jewish Relief Agencies',
          tag: '🏛️ RESCUE CHARTER',
          trigger:
            'Following the violence of Kristallnacht in November 1938, the British parliament agreed to admit unaccompanied child refugees under 17.',
          connective:
            'Created an urgent humanitarian lifeline allowing refugee charities to raise £50 per child and arrange emergency transport.',
          question:
            'What prompted the British government to change its immigration rules for child refugees after November 1938?',
        },
        {
          step: 2,
          para_ref: '[3.3]',
          date: 'May 1939',
          title: "Vera's Small Suitcase in Prague",
          actor: 'Vera Schaufeld & Her Parents',
          tag: '🧳 FAREWELL',
          trigger:
            'In Prague, nine-year-old Vera Schaufeld packed a small suitcase with her English doll and family photos as her parents made the heartbreaking sacrifice to send her away.',
          connective:
            'Demanded an agonizing parting from parents who sent their children into the unknown, promising they would reunite once the danger passed.',
          question:
            "What does Vera's small suitcase reveal about the agonizing choices Jewish families were forced to make?",
        },
        {
          step: 3,
          para_ref: '[3.5]',
          date: 'Summer 1939',
          title: 'Arrival at Liverpool Street Station',
          actor: 'Kindertransport Children & British Foster Families',
          tag: '🚉 NEW LIFE',
          trigger:
            "After crossing borders under armed Nazi inspection and boarding North Sea ferries, ten thousand children arrived at London's Liverpool Street Station.",
          connective:
            'Gave sanctuary to children who grew up to contribute immensely to British life, though the vast majority never saw their parents again.',
          question:
            'Why is the arrival at Liverpool Street remembered as both a moment of salvation and deep loneliness?',
        },
      ],
    },

    // Lesson 4
    {
      title: 'The Blitz Chronological Spine',
      subtitle: '57 Nights of Fire, Anderson Shelters, and the Underground Platform Dormitories',
      stages: [
        {
          step: 1,
          para_ref: '[4.1]',
          date: '7 September 1940',
          title: 'Black Saturday & 57 Nights of Fire',
          actor: 'German Luftwaffe & London Civilians',
          tag: '🔥 BOMBARDMENT',
          trigger:
            "Over 300 German bombers escorted by 600 fighter planes attacked London's East End docks, beginning 57 consecutive nights of bombing known as The Blitz.",
          connective:
            'Tested the endurance of ordinary civilians as homes, schools, and factories were reduced to rubble across industrial cities nationwide.',
          question:
            'Why did the German Luftwaffe shift from attacking RAF airfields to bombing civilian cities?',
        },
        {
          step: 2,
          para_ref: '[4.3]',
          date: 'Autumn 1940',
          title: 'Anderson & Morrison Backyard Shelters',
          actor: 'British Families',
          tag: '🛡️ SHELTER',
          trigger:
            'Millions of families erected corrugated steel Anderson shelters in garden soil, or assembled steel-caged Morrison tables inside their homes.',
          connective:
            'Provided essential protection against flying shrapnel and falling masonry, saving tens of thousands of lives despite freezing conditions.',
          question:
            'How did domestic shelters allow ordinary families to survive night after night of aerial bombardment?',
        },
        {
          step: 3,
          para_ref: '[4.5]',
          date: 'Winter 1940–1941',
          title: 'Underground Platforms & Volunteer Fire Watchers',
          actor: 'London Commuters & Civilian Volunteers',
          tag: '🚇 BLITZ SPIRIT',
          trigger:
            'Over 175,000 Londoners bought tickets each night to sleep on deep Underground tube platforms, while fire watchers patrolled rooftops extinguishing bombs.',
          connective:
            "Forged the legendary 'Blitz Spirit' of mutual solidarity, defying Hitler's strategic goal of breaking civilian morale through terror.",
          question:
            'In what ways did sheltering on Underground platforms foster community spirit during the Blitz?',
        },
      ],
    },

    // Lesson 5
    {
      title: 'Food & Farming Home Front Spine',
      subtitle: 'The Atlantic Lifeline, Ration Books, and Allotment Gardening',
      stages: [
        {
          step: 1,
          para_ref: '[5.1]',
          date: 'Autumn 1939',
          title: 'The Atlantic Supply Lifeline Under Siege',
          actor: 'German U-Boats & Merchant Navy',
          tag: '🚢 SUPPLY THREAT',
          trigger:
            'Nazi U-boats attacked Allied merchant convoys crossing the Atlantic, threatening to starve an island nation that imported 70% of its food.',
          connective:
            'Forced the British government to take unprecedented total control over the national food supply, agriculture, and dietary consumption.',
          question: 'Why was Britain uniquely vulnerable to maritime blockades in 1939?',
        },
        {
          step: 2,
          para_ref: '[5.3]',
          date: '8 January 1940',
          title: 'Ration Books: Fair Shares for All',
          actor: 'Ministry of Food & British Households',
          tag: '📖 RATION BOOK',
          trigger:
            'The Ministry of Food introduced coupons for butter, sugar, bacon, meat, and eggs, guaranteeing that wealth could not buy extra basic food.',
          connective:
            'Equalized British nutrition so that working-class children in poor neighbourhoods actually ate healthier diets during wartime than in the 1930s.',
          question:
            'How did the ration book ensure fairness and improve the basic health of British children?',
        },
        {
          step: 3,
          para_ref: '[5.5]',
          date: '1940–1945',
          title: 'Dig for Victory: Turning Lawns into Allotments',
          actor: 'British Gardeners & Allotment Holders',
          tag: '🌱 ALLOTMENTS',
          trigger:
            'Millions of citizens dug up domestic flowerbeds, parks, railway embankments, and the Tower of London moat to grow potatoes, carrots, and cabbages.',
          connective:
            'Produced millions of tons of homegrown vegetables, defeating the U-boat blockade and freeing precious cargo ships to carry war munitions.',
          question:
            "How did the 'Dig for Victory' campaign empower ordinary children and families to fight the war in their own gardens?",
        },
      ],
    },

    // Lesson 6
    {
      title: "Women's Mobilisation Spine",
      subtitle: "The National Call-Up, Women's Land Army, and Munitions Factories",
      stages: [
        {
          step: 1,
          para_ref: '[6.1]',
          date: 'December 1941',
          title: 'The National Service Act: Conscription of Women',
          actor: 'British Parliament & Unmarried Women',
          tag: '📜 CONSCRIPTION',
          trigger:
            'Britain became the first democracy in history to conscript women into national service, calling up unmarried women aged 20 to 30.',
          connective:
            'Mobilised over 7 million women into military auxiliary units, farm labour, civil defence, and manufacturing, keeping the nation functioning.',
          question:
            'Why was the conscription of women in 1941 a revolutionary milestone in British history?',
        },
        {
          step: 2,
          para_ref: '[6.3]',
          date: '1939–1945',
          title: "The Women's Land Army: Feeding the Nation",
          actor: '80,000 Land Girls',
          tag: '🚜 LAND ARMY',
          trigger:
            "Eighty thousand young women joined the Women's Land Army, swapping city clothes for corduroy breeches, woollen jumpers, and heavy boots to work farm fields.",
          connective:
            'Drove tractors, milked herds, cleared ditches, and harvested crops, ensuring British agriculture produced record grain yields without male farmhands.',
          question:
            'What challenges did urban women face when adapting to exhausting physical labour in the countryside?',
        },
        {
          step: 3,
          para_ref: '[6.5]',
          date: '1940–1945',
          title: 'Canary Girls & Spitfire Ferry Pilots',
          actor: 'Munitions Workers & ATA Pilots',
          tag: '✈️ FACTORY & FLIGHT',
          trigger:
            "Hundreds of thousands of women filled shells with toxic cordite (turning their skin bright yellow as 'Canary Girls') or flew unarmed Spitfires with the ATA.",
          connective:
            "Directly supplied the frontline armed forces with weapons, aircraft, and ammunition, permanently shattering sexist assumptions about women's capability.",
          question:
            "How did the dangerous work of 'Canary Girls' and ATA pilots alter societal perceptions of women?",
        },
      ],
    },

    // Lesson 7
    {
      title: 'Erosion of Civil Rights Spine',
      subtitle: 'Vibrant Jewish Communities, the Nuremberg Laws, and Segregated Classrooms',
      stages: [
        {
          step: 1,
          para_ref: '[7.1]',
          date: 'Pre-1933',
          title: 'Vibrant European Jewish Communities',
          actor: 'European Jewish Families',
          tag: '🌍 DIVERSITY',
          trigger:
            'Over nine million Jewish citizens lived across Europe as integrated neighbours, attending school, playing sports, writing books, and practicing their traditions.',
          connective:
            'Sustained centuries of intellectual, artistic, and community achievements across major capitals and countryside towns.',
          question:
            'What does pre-war family photography teach us about Jewish life in Europe before Nazi rule?',
        },
        {
          step: 2,
          para_ref: '[7.3]',
          date: '1933–1938',
          title: 'The Step-by-Step Stripping of Rights',
          actor: 'Nazi State Authorities',
          tag: '⚖️ DISCRIMINATION',
          trigger:
            'Through over 400 discriminatory decrees, including the 1935 Nuremberg Laws, the Nazi regime systematically stripped German Jews of citizenship and careers.',
          connective:
            'Banned Jews from parks, benches, swimming pools, and professions, socially isolating families before total physical persecution began.',
          question:
            'Why did the Nazi regime strip Jewish rights gradually in small steps rather than all at once?',
        },
        {
          step: 3,
          para_ref: '[7.5]',
          date: '15 November 1938',
          title: 'Expelled from the Classroom',
          actor: 'Jewish Schoolchildren & Teachers',
          tag: '🎒 EXCLUSION',
          trigger:
            'Following Kristallnacht, the Nazi government officially expelled every Jewish pupil from German state schools and universities.',
          connective:
            'Severed childhood friendships overnight and forced Jewish children into segregated classrooms, leaving them vulnerable to deportation.',
          question:
            'How did exclusion from schools and sports clubs affect the daily lives of Jewish young people?',
        },
      ],
    },

    // Lesson 8
    {
      title: 'Bletchley Park Codebreaking Spine',
      subtitle: "The Enigma Machine, Alan Turing's Bombe, and the Wrens of Station X",
      stages: [
        {
          step: 1,
          para_ref: '[8.1]',
          date: '1939',
          title: 'The Enigma Machine: 158 Million Million Settings',
          actor: 'German Military Signal Corps',
          tag: '⚙️ CIPHER',
          trigger:
            'The German armed forces relied on the electro-mechanical Enigma machine to scramble military signals into billions of changing combinations.',
          connective:
            'Convinced German high commanders that their top-secret tactical plans, submarine coordinates, and orders were completely unbreakable.',
          question:
            'Why did German military commanders believe the Enigma cipher was impossible to break?',
        },
        {
          step: 2,
          para_ref: '[8.3]',
          date: '1940',
          title: "Station X & Alan Turing's Electro-Mechanical Bombe",
          actor: 'Alan Turing & Gordon Welchman',
          tag: '💡 GENIUS',
          trigger:
            "Mathematician Alan Turing set up Hut 8 at Bletchley Park, designing the 'Bombe' machine to test thousands of Enigma rotor combinations in minutes.",
          connective:
            'Decrypted top-secret German naval messages (codenamed Ultra), revealing U-boat positions and safeguarding vital Atlantic food and troop convoys.',
          question:
            "How did Alan Turing's mechanical Bombe revolutionize the speed of codebreaking?",
        },
        {
          step: 3,
          para_ref: '[8.5]',
          date: '1941–1945',
          title: "The Secret Army of Women: 75% of Bletchley's Workforce",
          actor: 'Wrens & Civilian Cryptanalysts',
          tag: '🤫 ULTRA SECRET',
          trigger:
            'Over 7,500 women operated the deafening Bombe machines, transcribed Morse code intercepted from radio towers, and cross-referenced card index archives.',
          connective:
            'Kept the codebreaking secret for thirty years after the war, directly shortening World War II by an estimated two to four years.',
          question:
            "Why was the total secrecy maintained by Bletchley's female workforce crucial to Allied victory?",
        },
      ],
    },

    // Lesson 9
    {
      title: 'Prague Rescue Chain Spine',
      subtitle: 'Nicholas Winton, Trevor Chadwick, and the Secret Scrapbook of 669 Children',
      stages: [
        {
          step: 1,
          para_ref: '[9.1]',
          date: 'December 1938',
          title: 'The Cancelled Skiing Holiday',
          actor: 'Nicholas Winton',
          tag: '⛷️ DECISION',
          trigger:
            'Twenty-nine-year-old London stockbroker Nicholas Winton cancelled his Swiss skiing holiday to visit Prague refugee camps at the request of friend Martin Blake.',
          connective:
            'Confronted thousands of desperate refugee families living in frozen tents, prompting Winton to open an unofficial rescue bureau in his Prague hotel room.',
          question:
            'What motivated Nicholas Winton to abandon his holiday and commit to saving refugee children?',
        },
        {
          step: 2,
          para_ref: '[9.3]',
          date: 'Spring 1939',
          title: 'The Prague-to-London Rescue Chain',
          actor: 'Trevor Chadwick & Doreen Warriner',
          tag: '🔗 RESCUE CHAIN',
          trigger:
            'In Prague, schoolteacher Trevor Chadwick secured Gestapo exit permits under constant danger, while Winton persuaded the British Home Office and found foster families in London.',
          connective:
            'Coordinated eight train journeys carrying 669 predominantly Jewish children across Nazi-occupied Europe to safety in Britain.',
          question:
            'Why did saving 669 children require an interconnected chain of brave people across multiple countries?',
        },
        {
          step: 3,
          para_ref: '[9.5]',
          date: '1939 & 1988',
          title: "The Secret Scrapbook & That's Life!",
          actor: 'Nicholas Winton & Grete Winton',
          tag: "📖 THAT'S LIFE",
          trigger:
            'Winton never spoke of the rescue for fifty years until his wife Grete found his leatherbound scrapbook of names and photographs in their attic.',
          connective:
            "Reunited Winton with dozens of grown evacuees on BBC television's That's Life! in 1988, inspiring generations with the power of individual courage.",
          question:
            'Why did Nicholas Winton keep his wartime rescue operation a secret for fifty years?',
        },
      ],
    },

    // Lesson 10
    {
      title: 'VE Day & Remembrance Spine',
      subtitle: 'The Joyous Street Parties of 8 May 1945, Deep Grief, and the Duty to Remember',
      stages: [
        {
          step: 1,
          para_ref: '[10.1]',
          date: '8 May 1945',
          title: 'Victory in Europe Day: The Streets Erupt in Song',
          actor: 'British Public & Winston Churchill',
          tag: '🎉 VE DAY',
          trigger:
            "Prime Minister Winston Churchill announced Germany's unconditional surrender at 3:00pm, declaring an official public holiday across Britain.",
          connective:
            'Spurred millions into joyous street parties with red-white-and-blue bunting, tea tables, bonfires, and dancing around Buckingham Palace.',
          question:
            'How did communities across Britain celebrate the announcement that the war in Europe was over?',
        },
        {
          step: 2,
          para_ref: '[10.3]',
          date: 'Summer 1945',
          title: 'The Tinge of Sorrow: Loss & Rebuilding',
          actor: 'Bereaved Families & Returning Troops',
          tag: '🕯️ REMEMBRANCE',
          trigger:
            'Amidst the cheers, millions mourned fallen relatives, faced bombed-out homes, and waited anxiously for news of prisoners of war in Asia.',
          connective:
            'Tempered jubilant celebrations with quiet grief, beginning the monumental collective task of clearing rubble and building post-war homes and schools.',
          question:
            'Why was VE Day an emotionally complicated day of both celebration and sorrow for many families?',
        },
        {
          step: 3,
          para_ref: '[10.5]',
          date: 'Post-War to Present',
          title: 'The Poppy & The Duty to Remember',
          actor: 'Future Generations & The Royal British Legion',
          tag: '🌺 RED POPPY',
          trigger:
            'Every November, communities gather at village war memorials and the Cenotaph in London, observing two minutes of silence and wearing the red poppy.',
          connective:
            "Connects modern school pupils directly to the sacrifices of wartime generations, fulfilling the solemn national promise: 'We will remember them.'",
          question:
            'Why do we continue to observe two minutes of silence at the Cenotaph eighty years after World War II?',
        },
      ],
    },

    // Lesson 11
    {
      title: 'The Windermere Sanctuary Spine',
      subtitle:
        "From Auschwitz to Ambleside: Recuperation, Tom Palmer's Novel, and the '45 Aid Society",
      stages: [
        {
          step: 1,
          para_ref: '[11.1]',
          date: 'August 1945',
          title: 'The RAF Mercy Airlift from Prague',
          actor: '300 Child Survivors & RAF Lancaster Crews',
          tag: '✈️ AIRLIFT',
          trigger:
            'The British government and Jewish relief charities arranged for ten RAF Stirling and Lancaster bombers to fly 300 liberated child survivors from Prague to Carlisle.',
          connective:
            'Rescued deeply traumatised orphan survivors from the ashes of concentration camps, bringing them to the serene Lake District.',
          question:
            'What were the physical and psychological conditions of the child survivors when the RAF airlifted them to Britain?',
        },
        {
          step: 2,
          para_ref: '[11.3]',
          date: 'Autumn 1945',
          title: 'Sanctuary at Calgarth: Bread Under Pillows & Red Bicycles',
          actor: 'Windermere Children & Carers',
          tag: '🍞 HEALING',
          trigger:
            'Accommodated in wooden wartime factory chalets at Calgarth Estate by Lake Windermere, children received warm beds, clean clothes, and compassionate medical care.',
          connective:
            'Allowed starved children who initially hid bread under their pillows to swim in the lake, ride red bicycles, laugh again, and forge lifelong adoptive families.',
          question:
            'How did simple acts of kindness—such as plentiful food and bicycles—help the Windermere children begin to heal?',
        },
        {
          step: 3,
          para_ref: '[11.5]',
          date: 'Modern Day',
          title: "Tom Palmer's 'After the War': Grounded in Real Survivor Testimony",
          actor: 'Author Tom Palmer & Survivors Arek Hersh & Ike Alterman',
          tag: '📚 LITERATURE',
          trigger:
            "Children's author Tom Palmer interviewed Windermere survivors Arek Hersh, Ike Alterman, and Sam Laskier to write his award-winning novel After the War.",
          connective:
            'Brought authentic historical eyewitness memories of survival and recovery alive for modern Key Stage 2 readers through sensitive storytelling.',
          question:
            "How does historical fiction like Tom Palmer's 'After the War' preserve authentic survivor memories for future generations?",
        },
        {
          step: 4,
          para_ref: '[11.7]',
          date: '1963 to Present',
          title: "The '45 Aid Society: Giving Back to Britain",
          actor: 'Windermere Survivors & Families',
          tag: '🤝 GIVING BACK',
          trigger:
            "In 1963, the Windermere 'boys and girls' founded the '45 Aid Society to support each other and raise funds for British charitable causes.",
          connective:
            'Completed an inspiring journey from destitute refugees to proud British citizens who gave back to the nation that offered them sanctuary.',
          question:
            'Why did the Windermere survivors feel a profound lifelong duty to support humanitarian charities across Britain?',
        },
      ],
    },
  ];

  data.lessons.forEach((lesson, idx) => {
    if (ks2Spines[idx]) {
      lesson.causal_domino_spine = ks2Spines[idx];
      console.log(
        `  - Attached spine to Lesson ${idx + 1}: ${ks2Spines[idx].title} (${ks2Spines[idx].stages.length} stages)`,
      );
    }
  });

  const exportStr = 'export default ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(ks2DataJsPath, exportStr, 'utf8');

  const publicUnitJson = {
    id: 'ks2_ww2',
    data: data,
  };
  fs.writeFileSync(ks2PublicJsonPath, JSON.stringify(publicUnitJson, null, 2), 'utf8');
  console.log('✅ Updated KS2 WW2 units/ks2_ww2/data.js and public/data/ks2_ww2.json');
}

async function run() {
  await updateShoah();
  await updateKs2Ww2Spines();

  console.log('🗄️ Rebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT });

  console.log('📚 Recompiling Master Rights Register and Source Bibliographies...');
  execSync('node scripts/generate_rights_register_pdf.cjs', { stdio: 'inherit', cwd: ROOT });

  console.log('🛡️ Verifying sanitization policy...');
  execSync('node scripts/verify_sanitization.cjs', { stdio: 'inherit', cwd: ROOT });

  console.log('\n🎉 ALL UPDATES COMPLETED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Error during execution:', err);
  process.exit(1);
});
