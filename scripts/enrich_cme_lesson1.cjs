const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const dataFilePath = path.join(__dirname, '../units/cme_new/data.js');

async function run() {
  const fileUrl = 'file:///' + dataFilePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.default || mod.unitData;

  const lesson1 = unit.lessons.find((l) => l.id === 'lesson_1');
  if (!lesson1) {
    console.error('Lesson 1 not found in cme_new/data.js');
    process.exit(1);
  }

  lesson1.learning_objectives = [
    'Understand how the collapse of the Ottoman Empire after WW1 and the secret Sykes-Picot Agreement (1916) created artificial borders and European mandates in the Middle East.',
    'Examine conflicting British wartime promises: the McMahon-Hussein Correspondence (1915) versus the Balfour Declaration (1917).',
    'Define and contrast the core historical ideologies of Zionism and Arab Nationalism.',
    'Identify the strategic geography of the region, including vital maritime chokepoints (Suez Canal, Straits of Tiran) and contested territories (West Bank, Gaza Strip, Golan Heights, Sinai Peninsula).',
  ];

  lesson1.teacher_notes = {
    primer:
      'This foundational lesson establishes the critical geopolitical, historical, and geographic groundwork for GCSE Paper 2 (Conflict in the Middle East, 1945–1995). Before students can analyze the 1948 Arab-Israeli War or subsequent crises, they must understand how British and French imperial partition carved up the Ottoman Empire, why contradictory wartime pledges bred enduring mutual mistrust between Arab and Jewish populations, and how the physical terrain and maritime chokepoints shaped strategic military conflict.',
    objectives: [
      {
        objective:
          'Understand how the collapse of the Ottoman Empire after WW1 and the secret Sykes-Picot Agreement (1916) created artificial borders and European mandates in the Middle East.',
        primer:
          'Direct students to Narrative Block 1. Highlight how British and French diplomats (Mark Sykes and François Georges-Picot) drew arbitrary straight lines across desert territory without consulting indigenous populations, trapping diverse ethnic and religious communities within artificial states.',
        question:
          'Why did drawing arbitrary straight lines across former Ottoman lands create long-term political instability in the modern Middle East?',
      },
      {
        objective:
          'Examine conflicting British wartime promises: the McMahon-Hussein Correspondence (1915) versus the Balfour Declaration (1917).',
        primer:
          "Lead a comparative source analysis of Britain's contradictory commitments during WW1. Guide students to see how both Arabs and Zionists felt legitimately promised sovereignty over Palestine.",
        question:
          "How did Britain's simultaneous promises to Sharif Hussein and Lord Rothschild make future conflict over Palestine almost unavoidable?",
      },
      {
        objective:
          'Define and contrast the core historical ideologies of Zionism and Arab Nationalism.',
        primer:
          "Discuss Theodor Herzl's vision of a Jewish national sanctuary in response to European anti-Semitic pogroms versus the Arab struggle for self-determination after centuries of Ottoman Turkish rule.",
        question:
          'Why did both Zionists and Arab Nationalists regard sovereignty over Palestine as an existential necessity for their collective survival?',
      },
      {
        objective:
          'Identify the strategic geography of the region, including vital maritime chokepoints (Suez Canal, Straits of Tiran) and contested territories (West Bank, Gaza Strip, Golan Heights, Sinai Peninsula).',
        primer:
          'Walk students through Narrative Block 3 and the map exercises, connecting physical geography (waterways and high ground) to the military triggers of the 1956 Suez Crisis and 1967 Six-Day War.',
        question:
          "Why would Egypt's closure of the Straits of Tiran or nationalisation of the Suez Canal be considered a direct act of war by Israel and Western powers?",
      },
    ],
  };

  lesson1.narrative_blocks = [
    {
      type: 'narrative',
      theme_heading: 'The Collapse of the Ottoman Empire & The Sykes-Picot Mandates (1916–1920)',
      text: "For over four centuries leading up to the First World War, the Middle East was ruled as part of the vast Turkish <strong>Ottoman Empire</strong>. The region was not divided into modern nation-states like Lebanon, Syria, Jordan, or Iraq; instead, it was administered as administrative provinces (vilayets) under the Ottoman Sultan in Constantinople.<br><br>When the Ottoman Empire entered World War One on the side of Germany and the Central Powers in October 1914, Britain and France realised that victory would give them the opportunity to dismember the Turkish empire and expand their own imperial influence. In May 1916, British diplomat Sir Mark Sykes and French diplomat François Georges-Picot drew up a secret treaty known as the <strong>Sykes-Picot Agreement</strong>. Using a ruler on a map, they carved the Middle East into British and French spheres of direct control and influence.<br><br>Following the Allied victory in 1918 and the collapse of the Ottoman Empire, the newly established <strong>League of Nations</strong> formalised this partition through the <strong>Mandates System</strong> at the San Remo Conference (1920). Under this system, European powers were granted authority to govern former Ottoman territories until they were deemed 'able to stand by themselves':<ul><li><strong>French Mandates:</strong> Syria and Lebanon.</li><li><strong>British Mandates:</strong> Mesopotamia (modern Iraq), Transjordan (modern Jordan), and <strong>Palestine</strong>.</li></ul>These straight-line borders completely ignored traditional tribal loyalties, religious sects (Sunni, Shia, Christian, Druze, Jewish), and geographical natural boundaries. This artificial map sowed the seeds of chronic regional instability that persists to this day.",
      tasks: [
        {
          type: 'comprehension',
          question:
            'Explain why the Sykes-Picot Agreement and League of Nations mandates created artificial borders in the Middle East.',
          model:
            'The Sykes-Picot Agreement created artificial borders because British and French diplomats divided the collapsed Ottoman Empire according to European imperial interests rather than local realities. They drew arbitrary straight lines across maps without consulting the indigenous inhabitants, grouping distinct religious sects and rival tribes into newly created states while splitting historic communities across national frontiers.',
        },
      ],
    },
    {
      type: 'narrative',
      theme_heading:
        'Conflicting Pledges: McMahon-Hussein, The Balfour Declaration & Competing Nationalisms',
      text: "During the desperate fighting of World War One, the British government made contradictory promises to both Arab and Jewish leaders in order to secure wartime support, creating a legacy of bitter betrayal.<br><br><strong>1. The McMahon-Hussein Correspondence (1915–1916):</strong><br>Sir Henry McMahon, the British High Commissioner in Cairo, exchanged ten letters with <strong>Sharif Hussein of Mecca</strong>, the guardian of Islam's holy sites. In exchange for the Arabs launching an armed uprising (the Great Arab Revolt, assisted by T.E. Lawrence) against Turkish Ottoman forces, Britain promised to support an independent, unified Arab state across the Middle East. Arab leaders believed this pledge encompassed Palestine, though Britain later disputed the exact borders intended.<br><br><strong>2. The Balfour Declaration (2 November 1917):</strong><br>Just two years later, British Foreign Secretary Arthur Balfour sent an official letter to Lord Walter Rothschild, a prominent leader of the British Jewish community. The declaration stated: <em>'His Majesty's Government view with favour the establishment in Palestine of a national home for the Jewish people...'</em>. While it added that nothing should prejudice the civil and religious rights of existing non-Jewish communities, it made no mention of their political or national rights, despite Arabs making up over 90% of Palestine's population at the time.<br><br><strong>The Ideological Collision: Zionism vs. Arab Nationalism:</strong><ul><li><strong>Zionism:</strong> A political movement established in 1897 by Austrian Jewish journalist Theodor Herzl. In the wake of horrific anti-Semitic pogroms across Russia and Eastern Europe, Herzl argued that Jewish people would never be safe from persecution until they possessed their own sovereign homeland in their ancestral biblical home (Eretz Israel / Palestine).</li><li><strong>Arab Nationalism:</strong> An emerging political movement seeking self-determination, sovereignty, and dignity for Arab peoples. Arab nationalists rejected European colonial tutelage, arguing that having lived continuously in Palestine for centuries, the Arab population held an undisputed right to self-government and national independence.</li></ul>Britain had promised the same sliver of land to two different peoples with mutually irreconcilable aspirations.",
      tasks: [
        {
          type: 'comprehension',
          question:
            'Explain the fundamental contradiction between the McMahon-Hussein Correspondence and the Balfour Declaration.',
          model:
            'The fundamental contradiction was that Britain pledged the same territory to two opposing nationalist movements. Through the McMahon-Hussein Correspondence, Arab leaders were led to believe Britain would support an independent Arab kingdom including Palestine in reward for fighting the Ottomans. However, the Balfour Declaration officially promised British backing for a Jewish national home in Palestine, ignoring the political self-determination of the existing 90% Arab majority.',
        },
      ],
    },
    {
      type: 'narrative',
      theme_heading: 'Strategic Geography: Chokepoints, Borders & Contested Zones',
      text: "Understanding the physical geography of the Middle East is essential to understanding the military strategies, casus belli (reasons for war), and peace negotiations of the Arab-Israeli conflict.<br><br><strong>Strategic Maritime Chokepoints:</strong><ul><li><strong>The Suez Canal:</strong> Completed by French and Egyptian engineers in 1869, this 120-mile artificial sea-level waterway cuts across Egypt to link the Mediterranean Sea directly to the Red Sea. For Britain, it was the 'imperial lifeline' to India and Middle Eastern oil routes. When Egyptian President Gamal Abdel Nasser nationalised the canal in 1956, it triggered the Suez Crisis.</li><li><strong>The Straits of Tiran & Gulf of Aqaba:</strong> A narrow passage of water between the Sinai Peninsula and the Arabian coast. It provides Israel with its sole maritime access from the southern port of Eilat to the Red Sea and international markets in Asia and Africa. Egyptian blockades of the Straits in 1956 and June 1967 were treated by Israel as acts of war.</li></ul><br><strong>The Contested Territories (Pre- and Post-1967):</strong><ul><li><strong>The West Bank & East Jerusalem:</strong> The hill country west of the River Jordan, containing ancient sacred sites revered by Jews (Western Wall, Temple Mount), Muslims (Al-Aqsa Mosque, Dome of the Rock), and Christians (Church of the Holy Sepulchre). Annexed by Jordan in 1948, it was captured and occupied by Israel during the 1967 Six-Day War.</li><li><strong>The Gaza Strip:</strong> A narrow, densely populated coastal strip bordering south-west Israel and Egypt's Sinai desert. Administered under Egyptian military rule from 1948 until captured by Israel in 1967.</li><li><strong>The Golan Heights:</strong> A steep, strategic volcanic plateau in south-western Syria. Rising high above the Sea of Galilee and northern Israeli kibbutzim, Syrian artillery repeatedly shelled Israeli farms below until Israel captured and fortified the heights in 1967.</li><li><strong>The Sinai Peninsula:</strong> A massive triangular desert buffer of 60,000 square kilometres connecting Africa and Asia. It was captured by Israel in 1956 (and returned in 1957) and captured again in 1967, before being returned to Egypt under the historic 1978–1979 Camp David Accords.</li></ul>",
      tasks: [
        {
          type: 'comprehension',
          question:
            'Why were the Golan Heights and the Straits of Tiran of supreme strategic importance in the Arab-Israeli wars?',
          model:
            "The Golan Heights were strategically vital because their high elevation gave Syrian artillery commanding sightlines to shell civilian Israeli settlements across the Galilee plain, making capture of the high plateau essential for Israeli border security. The Straits of Tiran were crucial because they represented Israel's only southern maritime corridor to the Red Sea and global oil supplies; when Egypt closed this chokepoint in 1967, it severed Israel's trade lifeline and triggered the Six-Day War.",
        },
      ],
    },
  ];

  lesson1.vocab = [
    {
      term: 'Sykes-Picot Agreement',
      definition:
        'A secret 1916 pact between Britain and France dividing Ottoman Arab lands into European spheres of influence.',
    },
    {
      term: 'Mandate',
      definition:
        'An authorization granted by the League of Nations to a European power to govern a former Ottoman territory until independence.',
    },
    {
      term: 'Balfour Declaration',
      definition:
        'A 1917 letter from British Foreign Secretary Arthur Balfour declaring support for a Jewish national home in Palestine.',
    },
    {
      term: 'Zionism',
      definition:
        'The nationalist movement advocating for the re-establishment and protection of a Jewish nation state in their ancestral homeland.',
    },
    {
      term: 'Arab Nationalism',
      definition:
        'A nationalist ideology celebrating the glorious heritage of the Arab world and demanding independence from imperial control.',
    },
    {
      term: 'Chokepoint',
      definition:
        'A narrow, strategic maritime passage (like the Suez Canal or Straits of Tiran) whose closure can cripple trade and cause war.',
    },
    {
      term: 'Contested Territory',
      definition:
        'Land claimed by more than one sovereign nation or people, including the West Bank, Gaza, Golan Heights, and Sinai.',
    },
  ];

  lesson1.flashcards = [
    {
      term: 'Sykes-Picot Agreement (1916)',
      definition:
        'Secret pact where Britain and France partitioned Arab provinces of the Ottoman Empire into colonial spheres.',
    },
    {
      term: 'League of Nations Mandate',
      definition:
        'System giving Britain and France legal control over former Ottoman lands, creating artificial borders.',
    },
    {
      term: 'McMahon-Hussein Letters (1915)',
      definition:
        'British promises of an independent Arab state in exchange for an Arab revolt against the Ottoman Turks.',
    },
    {
      term: 'Balfour Declaration (1917)',
      definition: "British pledge to support a 'national home for the Jewish people' in Palestine.",
    },
    {
      term: 'Zionism',
      definition:
        'Movement founded by Theodor Herzl seeking a sovereign Jewish state to escape European anti-Semitism.',
    },
    {
      term: 'Straits of Tiran',
      definition:
        'Narrow maritime passage into the Gulf of Aqaba; Egyptian blockades in 1956 and 1967 sparked major wars.',
    },
    {
      term: 'Golan Heights',
      definition:
        'Elevated Syrian plateau captured by Israel in 1967 to stop Syrian artillery shelling northern settlements.',
    },
  ];

  const outputCode = 'export default ' + JSON.stringify(unit, null, 2) + ';\n';

  // Acorn validation
  try {
    acorn.parse(outputCode, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('✅ Acorn validation passed for cme_new/data.js');
  } catch (err) {
    console.error('❌ Acorn validation failed:', err.message);
    process.exit(1);
  }

  fs.writeFileSync(dataFilePath, outputCode, 'utf8');
  console.log(
    '🎉 Successfully enriched cme_new/data.js Lesson 1 with learning objectives, teacher notes, and 3 narrative blocks!',
  );
}

run().catch(console.error);
