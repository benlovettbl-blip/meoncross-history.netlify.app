/**
 * Medieval England (1066–1485)
 * Key Stage 3 Year 7 • 5-Lesson Disciplinary Enquiry
 *
 * Storytelling: 5-Act Decimal Standard (1.1 to 1.5) with Inline Evidential Sources
 * Pedagogical Architecture: Large-font (10.5pt) note-making, rotating disciplinary skills,
 * centre-fold living timeline, and back-of-booklet retrieval companion.
 *
 * Commercial Neutrality: 100% Institutional-neutral.
 */

export const unitData = {
  id: 'medieval_england',
  title: 'Medieval England: 1066–1485',
  short_title: 'Medieval England',
  period: '1066–1485',
  enquiry: 'How was power won, maintained, and contested in Medieval England?',
  description:
    'From the succession crisis of 1066 and Norman castle subjugation to the murder of Thomas Becket, Magna Carta, and the catastrophe of the Black Death, explore how military force, religious authority, and popular rebellion forged the medieval realm.',
  cover_image: '/images/bayeux_william_hastings_wide.jpg',
  cover_image_position: 'center 30%',
  is_ks3: true,
  year_group: 'Year 7',

  // Core Chronology for Living Timeline (Pages 8–9)
  timeline: [
    {
      year: '1066',
      title: 'The Battle of Hastings & Norman Conquest',
      description:
        'William, Duke of Normandy, defeats King Harold Godwinson at Senlac Hill, crowned King of England in Westminster Abbey on Christmas Day.',
      dual_coding_prompt:
        'Draw a Norman cavalry broadsword clashing with an Anglo-Saxon battle-axe.',
    },
    {
      year: '1086',
      title: 'The Great Domesday Book Survey',
      description:
        'William I commissions an unprecedented land audit of England to assess taxable wealth, tenant obligations, and military resources.',
      dual_coding_prompt: 'Draw an open royal parchment ledger marked with a royal exchequer seal.',
    },
    {
      year: '1170',
      title: 'The Murder of Thomas Becket',
      description:
        'Four Norman knights assassinate Archbishop Thomas Becket inside Canterbury Cathedral following his dispute with King Henry II over Church legal independence.',
      dual_coding_prompt: 'Draw an archbishop’s cross snapped beside a knight’s iron dagger.',
    },
    {
      year: '1215',
      title: 'The Sealing of Magna Carta at Runnymede',
      description:
        'Rebellious barons force King John to grant the Great Charter, establishing for the first time that the English monarch is subject to the rule of law.',
      dual_coding_prompt:
        'Draw a royal parchment scroll with a royal wax seal dangling from ribbons.',
    },
    {
      year: '1381',
      title: 'The Peasants’ Revolt',
      description:
        'Wat Tyler and preacher John Ball lead thousands of rural labourers into London demanding the abolition of serfdom and the hated poll tax.',
      dual_coding_prompt: 'Draw an agricultural scythe crossed with a broken iron feudal collar.',
    },
  ],

  // Core 12 Disciplinary Tier 3 Terms (Pages 2–3)
  vocabulary: [
    {
      term: 'Succession',
      definition:
        'The formal legal order and process by which a person inherits a royal title or monarchical throne.',
      phonetic: 'suhk-SESH-un',
      syllables: 'Suc-ces-sion',
      tier: '3',
    },
    {
      term: 'Subjugation',
      definition:
        'The act of bringing a conquered population under total, permanent military, political, and physical control.',
      phonetic: 'sub-joo-GAY-shun',
      syllables: 'Sub-ju-ga-tion',
      tier: '3',
    },
    {
      term: 'Motte-and-Bailey',
      definition:
        'An early Norman timber fortress featuring a steep artificial earth mound (motte) and an enclosed palisaded courtyard (bailey).',
      phonetic: 'MOT-and-BAY-lee',
      syllables: 'Motte-and-Bai-ley',
      tier: '3',
    },
    {
      term: 'Castellan',
      definition:
        'A trusted Norman governor or constable appointed by the monarch to command a royal fortress and police the surrounding shire.',
      phonetic: 'KAS-tuh-lun',
      syllables: 'Cas-tel-lan',
      tier: '3',
    },
    {
      term: 'Feudalism',
      definition:
        'The medieval socio-political hierarchy where land was granted by the monarch in return for military knight service and bonded peasant labour.',
      phonetic: 'FYOO-duh-liz-um',
      syllables: 'Feu-dal-ism',
      tier: '3',
    },
    {
      term: 'Canon Law',
      definition:
        'The supreme ecclesiastical legal system of the Roman Catholic Church, governing clergy privileges, marriage, and spiritual offences.',
      phonetic: 'KAN-un LAW',
      syllables: 'Can-on Law',
      tier: '3',
    },
    {
      term: 'Excommunication',
      definition:
        'The ultimate spiritual penalty imposed by the Pope, expelling an individual from the Catholic Church and denying Christian burial.',
      phonetic: 'eks-kuh-myoo-nih-KAY-shun',
      syllables: 'Ex-com-mu-ni-ca-tion',
      tier: '3',
    },
    {
      term: 'Scutage',
      definition:
        '‘Shield money’: a compulsory cash tax paid by feudal barons to the monarch in lieu of providing direct military knight service.',
      phonetic: 'SKYOO-tij',
      syllables: 'Scu-tage',
      tier: '3',
    },
    {
      term: 'Autocracy',
      definition:
        'A system of governance where supreme, unlimited political and legal power is held by a single absolute monarch.',
      phonetic: 'aw-TOK-ruh-see',
      syllables: 'Au-toc-ra-cy',
      tier: '3',
    },
    {
      term: 'Demography',
      definition:
        'The historical and statistical study of human population sizes, densities, birth rates, and catastrophic mortality shifts.',
      phonetic: 'dih-MOG-ruh-fee',
      syllables: 'De-mog-ra-phy',
      tier: '3',
    },
    {
      term: 'Serfdom',
      definition:
        'The hereditary legal condition of unfree bonded peasants (serfs/villeins) tied to a manorial estate, unable to leave without their lord’s permission.',
      phonetic: 'SURF-dum',
      syllables: 'Serf-dom',
      tier: '3',
    },
    {
      term: 'Poll Tax',
      definition:
        'A flat, universal tax levied equally on every individual person over a certain age regardless of their personal wealth or poverty.',
      phonetic: 'POHL TAKS',
      syllables: 'Poll Tax',
      tier: '3',
    },
  ],

  // Knowledge Companion 25-Question Retrieval Bank (5 per lesson)
  quizzing_pack: {
    title: 'Knowledge Retrieval Companion: 25 Core Retrieval Drill Questions',
    description:
      'Use these questions for lesson Do Nows, homework practice, and self-testing. Mark using the Answer Key at the back.',
    scoreboard: [
      {
        range: '22–25',
        badge: 'Lord High Chancellor of the Realm',
        desc: 'Mastery of medieval political chronology, royal power, and popular resistance.',
      },
      {
        range: '17–21',
        badge: 'Royal Castellan',
        desc: 'Secure core knowledge; review the missed questions using green pen corrections.',
      },
      {
        range: '0–16',
        badge: 'Bonded Villein',
        desc: 'Key facts are missing; revisit the living timeline on pages 8–9 and retest.',
      },
    ],
    enquiries: [
      {
        lesson_id: 'lesson_1',
        video: [
          {
            url: 'https://www.youtube.com/watch?v=PE0RAgHr06U',
            title: 'Norman Conquest - Timelines.tv History of Britain B01',
            duration: '7 mins 34 secs',
            teacher_guidance:
              "Andrew Chater explains the crisis of 1066, Harold Godwinson's forced march north to Stamford Bridge, and the tactical turning points at Senlac Hill.",
          },
        ],
        title: 'Lesson 1 Retrieval: 1066 & The Battle of Hastings',
        questions: [
          {
            id: 'q1',
            q: 'Which childless Anglo-Saxon king died in January 1066, triggering the succession crisis?',
            a: 'Edward the Confessor',
          },
          {
            id: 'q2',
            q: 'Who was chosen as king by the Anglo-Saxon Witan immediately following Edward’s death?',
            a: 'Harold Godwinson (Earl of Wessex)',
          },
          {
            id: 'q3',
            q: 'At which northern battle did Harold Godwinson defeat Harald Hardrada on 25 September 1066?',
            a: 'The Battle of Stamford Bridge',
          },
          {
            id: 'q4',
            q: 'What impenetrable defensive tactic did the Anglo-Saxon army form at the crest of Senlac Hill?',
            a: 'The Shield Wall',
          },
          {
            id: 'q5',
            q: 'What tactical cavalry manoeuvre broke the Anglo-Saxon shield wall in the afternoon?',
            a: 'The Feigned Retreat',
          },
        ],
      },
      {
        lesson_id: 'lesson_2',
        video: [
          {
            url: 'https://www.youtube.com/watch?v=BEU_xPJd7Yo',
            title: 'The Norman Conquest - Timelines.tv',
            duration: '7 mins 34 secs',
            teacher_guidance:
              'Focuses on the Harrying of the North, motte-and-bailey castle construction, and the administrative surveillance of the Domesday Book.',
          },
        ],
        title: 'Lesson 2 Retrieval: Castles, Terror & Domesday',
        questions: [
          {
            id: 'q6',
            q: 'What type of rapid earth-and-timber castle did the Normans construct across England after 1066?',
            a: 'Motte-and-bailey castle',
          },
          {
            id: 'q7',
            q: 'What brutal campaign of systematic devastation did William wage in northern England in 1069–1070?',
            a: 'The Harrying of the North',
          },
          {
            id: 'q8',
            q: 'What great land survey did William the Conqueror commission at Gloucester at Christmas 1085?',
            a: 'The Domesday Book (1086)',
          },
          {
            id: 'q9',
            q: 'Which Hampshire Roman fortress was repurposed by the Normans with a 4-storey stone keep?',
            a: 'Portchester Castle',
          },
          {
            id: 'q10',
            q: 'What percentage of English agricultural land was seized and transferred to Norman barons?',
            a: 'Over 80 percent',
          },
        ],
      },
      {
        lesson_id: 'lesson_3',
        video: [
          {
            url: 'https://www.youtube.com/watch?v=_EKUIBz_po0',
            title: 'Church & Crown - Timelines.tv',
            duration: '3 mins 53 secs',
            teacher_guidance:
              'Explores the Constitutions of Clarendon, criminous clerks, and the shocking martyrdom of Archbishop Thomas Becket in Canterbury Cathedral in 1170.',
          },
        ],
        title: 'Lesson 3 Retrieval: Crown vs Church (Henry II & Becket)',
        questions: [
          {
            id: 'q11',
            q: 'What royal office did Thomas Becket hold before Henry II appointed him Archbishop of Canterbury?',
            a: 'Lord Chancellor of England',
          },
          {
            id: 'q12',
            q: 'What legal document of 1164 attempted to bring "criminous clerks" under royal courts?',
            a: 'The Constitutions of Clarendon',
          },
          {
            id: 'q13',
            q: 'How many years did Thomas Becket live in exile in France following his clash with Henry II?',
            a: 'Six years (1164–1170)',
          },
          {
            id: 'q14',
            q: 'On what date was Thomas Becket assassinated inside Canterbury Cathedral by four Norman knights?',
            a: '29 December 1170',
          },
          {
            id: 'q15',
            q: 'What public act of penance did King Henry II submit to at Becket’s tomb in 1174?',
            a: 'Flogging (scourging) by Canterbury monks',
          },
        ],
      },
      {
        lesson_id: 'lesson_4',
        video: [
          {
            url: 'https://www.youtube.com/watch?v=7xo4tUMdAMw',
            title: 'What is Magna Carta?',
            duration: '3 mins 33 secs',
            teacher_guidance:
              "Clear overview of King John's abuses, the feudal revolt of the barons, and the key clauses at Runnymede establishing the rule of law.",
          },
        ],
        title: 'Lesson 4 Retrieval: Magna Carta (1215) & Medieval Kingship',
        questions: [
          {
            id: 'q16',
            q: 'Which English king was forced to seal Magna Carta following defeat in Normandy?',
            a: 'King John',
          },
          {
            id: 'q17',
            q: 'In what year and at which meadow beside the River Thames was Magna Carta granted?',
            a: '1215 at Runnymede (Surrey)',
          },
          {
            id: 'q18',
            q: 'Which famous clause guaranteed that no free man would be imprisoned without lawful judgement?',
            a: 'Clause 39',
          },
          {
            id: 'q19',
            q: 'Which Pope annulled Magna Carta within ten weeks of its sealing, calling it shameful?',
            a: 'Pope Innocent III',
          },
          {
            id: 'q20',
            q: 'Which boy-king reissued Magna Carta in 1216 and 1225 to secure baronial loyalty?',
            a: 'Henry III',
          },
        ],
      },
      {
        lesson_id: 'lesson_5',
        video: [
          {
            url: 'https://www.youtube.com/watch?v=YhsPPBGtquo',
            title: 'Black Death - Timelines.tv',
            duration: '6 mins 33 secs',
            teacher_guidance:
              'Examines the catastrophic social and economic impact of the 1348 bubonic plague, labour shortages, and the collapse of the feudal hierarchy.',
          },
          {
            url: 'https://www.youtube.com/watch?v=fgd9eI8dk6U',
            title: 'Medieval Manor - Timelines.tv',
            duration: '7 mins 21 secs',
            teacher_guidance:
              'Everyday life in a medieval village: open field farming, tithes, church control, and serfdom.',
          },
          {
            url: 'https://www.youtube.com/watch?v=D3EzLF2rOKY',
            title: 'Peasants Revolt - Timelines.tv',
            duration: '8 mins 44 secs',
            teacher_guidance:
              'Explores the 1381 poll tax crisis, Wat Tyler, John Ball, and the dramatic march of the peasants on London.',
          },
          {
            url: 'https://www.youtube.com/watch?v=uNcBrrMoyL8',
            title: 'Ten Minute English and British History #16 - The Wars of the Roses',
            duration: '9 mins 59 secs',
            teacher_guidance:
              'Fast-paced overview of the dynastic clash between Lancaster and York culminating at the Battle of Bosworth Field (1485).',
          },
        ],
        title: 'Lesson 5 Retrieval: The Black Death & The Peasants’ Revolt',
        questions: [
          {
            id: 'q21',
            q: 'In what year did the Black Death arrive in England, wiping out over one-third of the population?',
            a: '1348',
          },
          {
            id: 'q22',
            q: 'What 1351 royal statute attempted to freeze peasant agricultural wages at pre-plague levels?',
            a: 'The Statute of Labourers',
          },
          {
            id: 'q23',
            q: 'What hated tax introduced in 1377, 1379, and 1381 sparked the Peasants’ Revolt?',
            a: 'The Poll Tax',
          },
          {
            id: 'q24',
            q: 'Who was the charismatic rebel leader who led the peasant march on London in June 1381?',
            a: 'Wat Tyler',
          },
          {
            id: 'q25',
            q: 'At which London square was Wat Tyler killed by the Mayor of London in front of King Richard II?',
            a: 'Smithfield',
          },
        ],
      },
    ],
  },

  // The 5 Core Lessons
  lessons: [
    // ------------------------------------------------------------------------
    // LESSON 1: 1066 & The Battle of Hastings: Why did William win?
    // ------------------------------------------------------------------------
    {
      id: 'lesson_1',
      title: '1066 & The Battle of Hastings: Why did William win?',
      enquiry: 'Why did William of Normandy win the Battle of Hastings in 1066?',
      subtitle:
        'From the Succession Crisis of Edward the Confessor to the Shield Wall at Senlac Hill',
      skill: 'Causation & Battlefield Tactics',
      card_image: '/images/william_the_conqueror.jpg',
      card_position: 'center 20%',
      banner: {
        image: '/images/bayeux_norman_cavalry.jpg',
        position: 'center 35%',
        caption:
          'Norman heavy cavalry crashing against the Anglo-Saxon shield wall at the Battle of Hastings (14 October 1066), as depicted in the Bayeux Tapestry.',
      },
      margin_spine: [
        { year: 'Jan 1066', label: '1.1 Succession Void' },
        { year: 'Jan 1066', label: '1.2 The Three Rivals' },
        { year: 'Sept 1066', label: '1.3 Stamford Bridge' },
        { year: 'Oct 1066', label: '1.4 The Shield Wall' },
        { year: 'Oct 1066', label: '1.5 Feigned Retreat' },
      ],
      causal_domino_spine: {
        title: '1066 & The Battle of Hastings: Chronology Spine',
        subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
        stages: [
          {
            step: 1,
            date: 'Jan 1066',
            title: 'Death of Edward the Confessor & Succession Void',
            actor: 'Edward the Confessor & The Witan',
            tag: '👑 SUCCESSION CRISIS',
            trigger:
              'King Edward the Confessor died in January 1066 without leaving a direct heir, ending the House of Wessex and creating an immediate power vacuum.',
            connective:
              'Prompted the Anglo-Saxon Witan council to swiftly elect Harold Godwinson, triggering furious invasion preparations from rival claimants in Norway and Normandy.',
            question: 'Why did the death of Edward the Confessor trigger a succession crisis?',
          },
          {
            step: 2,
            date: '1066',
            title: 'Three Rivals Contend for the English Crown',
            actor: 'Harold Godwinson, Harald Hardrada & Duke William',
            tag: '⚔️ THREE CLAIMANTS',
            trigger:
              'Harold Godwinson seized the crown, but faced rival claims from Viking King Harald Hardrada and Duke William of Normandy, who claimed Edward had promised him the throne.',
            connective:
              'Forced England into a two-front defence, forcing Harold to guard the southern coast against Normandy while Viking invaders massed across the North Sea.',
            question: 'Who were the three rival claimants contending for the English crown?',
          },
          {
            step: 3,
            date: 'Sept 1066',
            title: 'Stamford Bridge & The 200-Mile Forced March',
            actor: 'King Harold & Harald Hardrada',
            tag: '🛡️ NORTHERN CRUCIBLE',
            trigger:
              'King Harold marched his army 200 miles north in four days, catching Harald Hardrada by surprise at Stamford Bridge and annihilating the Viking invasion army.',
            connective:
              'Eliminated the Viking threat, but left Harold’s elite housecarls decimated and forced a gruelling return march south just as Duke William landed at Pevensey.',
            question:
              'How did the Battle of Stamford Bridge exhaust King Harold’s northern forces?',
          },
          {
            step: 4,
            date: '14 Oct 1066',
            title: 'The Anglo-Saxon Shield Wall on Senlac Hill',
            actor: 'Saxon Fyrd & Norman Combined Arms',
            tag: '🛡️ SENLAC RIDGE',
            trigger:
              'King Harold deployed his exhausted army atop the steep ridge of Senlac Hill, forming a dense, interlocking shield wall of wooden round shields and two-handed battleaxes.',
            connective:
              'Repulsed wave after wave of Norman cavalry and infantry charges for over six hours, threatening Duke William with catastrophic tactical failure.',
            question:
              'How did the Anglo-Saxon shield wall withstand repeated Norman charges on Senlac Hill?',
          },
          {
            step: 5,
            date: 'Oct 1066',
            title: 'The Feigned Retreat & Norman Triumph',
            actor: 'Duke William & Norman Cavalry',
            tag: '🐎 FEIGNED RETREAT',
            trigger:
              'Duke William ordered his cavalry to feign retreat downhill, luring undisciplined Saxon fyrdmen into breaking their defensive formation to pursue.',
            connective:
              'Decimated the fractured shield wall, killed King Harold, and decisively handed the English Crown to William the Conqueror.',
            question:
              'How did the feigned retreat tactic break the shield wall and secure Norman victory?',
          },
        ],
      },
      did_you_know:
        'William of Normandy was known across Europe as "William the Bastard" because his parents were unmarried. At Hastings, when rumors spread that William was slain, he ripped off his iron helmet in the thick of battle and roared: "Look at me! I live, and with God’s help I shall conquer!"',

      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'Which people conquered Britain in AD 43, establishing paved roads and fortified towns?',
            answer: 'The Romans.',
          },
          {
            question:
              'What Germanic tribes migrated to Britain after the collapse of Roman rule in AD 410?',
            answer: 'The Anglo-Saxons (Angles, Saxons, and Jutes).',
          },
          {
            question:
              'What Viking kingdom covered northern and eastern England following the 9th-century invasions?',
            answer: 'The Danelaw.',
          },
          {
            question:
              'What council of English nobles and bishops advised Anglo-Saxon kings on royal succession?',
            answer: 'The Witan (Witenagemot).',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Succession',
          definition: 'The formal legal order in which a person inherits a royal crown or throne.',
          phonetic: 'suhk-SESH-un',
          syllables: 'Suc-ces-sion',
          tier: '3',
        },
        {
          term: 'Witan',
          definition: 'The council of Anglo-Saxon nobles and churchmen who elected the king.',
          phonetic: 'WIT-un',
          syllables: 'Wi-tan',
          tier: '3',
        },
        {
          term: 'Housecarl',
          definition:
            'A well-trained, professional Anglo-Saxon warrior armed with a heavy two-handed battleaxe.',
          phonetic: 'HOWS-kahrl',
          syllables: 'House-carl',
          tier: '3',
        },
        {
          term: 'Fyrd',
          definition:
            'The part-time Anglo-Saxon peasant militia called up to fight in national emergencies.',
          phonetic: 'FEERD',
          syllables: 'Fyrd',
          tier: '3',
        },
        {
          term: 'Feigned Retreat',
          definition:
            'A deliberate military trick where soldiers fake panic and run away to lure enemies out of formation.',
          phonetic: 'FAYND rih-TREET',
          syllables: 'Feigned Re-treat',
          tier: '3',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '1.1 The Succession Void (January 1066)',
          text: '<span class="para-ref">[1.1]</span> On 5 January 1066, King Edward the Confessor died after reigning for twenty-four years. Edward left England in an existential crisis: he had died childless, leaving no direct heir to the throne. In Anglo-Saxon England, royal blood did not guarantee succession; the royal council, known as the <strong>Witan</strong>, held the constitutional right to elect the next monarch. Within twenty-four hours of Edward’s burial in Westminster Abbey, the Witan elected England’s wealthiest nobleman, <strong>Harold Godwinson</strong>, Earl of Wessex. Harold was crowned King Harold II, but his coronation ignited an international dynastic bloodbath.',
        },
        {
          act: 2,
          title: '1.2 The Three Claimants (1066)',
          text: '<span class="para-ref">[1.2]</span> Harold’s crown was immediately challenged by two formidable foreign rulers. In Normandy, <strong>Duke William</strong> claimed that Edward the Confessor had promised him the English throne in 1051, and that Harold Godwinson had sworn a sacred oath on holy relics in 1064 supporting William’s claim. William secured the blessing of Pope Alexander II, carrying a papal banner into battle. Simultaneously in Scandinavia, the fearsome Viking king <strong>Harald Hardrada</strong> of Norway staked a claim based on an earlier agreement between his ancestors and former Danish rulers of England. Surrounded by enemies, King Harold mobilized England’s armies for an unavoidable two-front invasion.',
          source: {
            letter: 'A',
            title:
              'Source A: The Bayeux Tapestry: Harold Swearing the Sacred Oath to William (c. 1070s)',
            image: '/images/bayeux_harold_oath.jpg',
            caption:
              'Harold Godwinson stands between two holy reliquaries, with hands outstretched, swearing an oath of allegiance to Duke William of Normandy in 1064.',
            source_context:
              'Commissioned by William’s half-brother Bishop Odo of Bayeux shortly after the Conquest, this 70-metre embroidered linen narrative presents the official Norman justification for conquering England.',
            how_useful_question:
              'How useful is Source A for an enquiry into why the Normans believed they had a legitimate right to invade England in 1066?',
            provenance_clues: [
              'Author: Norman-commissioned embroidery designed to legitimize William’s conquest to Christian Europe.',
              'Audience: Anglo-Norman nobles and churchgoers viewing the tapestry in Bayeux Cathedral.',
              'Motive: To prove that Harold Godwinson was an unholy oath-breaker (perjurer) who had betrayed his sacred vow to Duke William.',
            ],
            hinge_question:
              'Hinge Question: Does Source A prove that Harold genuinely promised England to William, or does it reflect Norman wartime propaganda manufactured to justify invasion?',
            citation: 'Bayeux Museum, Normandy • Embroidered linen (c. 1070s).',
          },
        },
        {
          act: 3,
          title: '1.3 The Forced March & Stamford Bridge (September 1066)',
          text: '<span class="para-ref">[1.3]</span> The first blow fell in the north. In September 1066, Harald Hardrada landed 300 Viking longships along the Yorkshire coast. King Harold performed a superhuman military feat: he marched his army 190 miles north from London in just four days. On 25 September, Harold surprised the Vikings at <strong>Stamford Bridge</strong>. In a savage battle, Hardrada was killed with an arrow through the throat, and the Viking army was so utterly annihilated that only 24 longships were needed to carry the survivors home. But Harold’s triumph was fatally brief. Two days later, Duke William’s invasion fleet landed unopposed at Pevensey Bay on the southern coast.',
        },
        {
          act: 4,
          title: '1.4 The Shield Wall at Senlac Hill (14 October 1066)',
          text: '<span class="para-ref">[1.4]</span> Rather than resting his exhausted troops in London, Harold immediately force-marched his men 250 miles back south. On the morning of 14 October 1066, the armies collided on <strong>Senlac Hill</strong> near Hastings. Harold deployed his men in a dense, interlocking <strong>shield wall</strong> across the ridge, with elite two-handed axemen (housecarls) in front and peasant militia (the fyrd) behind. For five gruelling hours, the Saxon shield wall held firm. Norman cavalry charged uphill into a blizzard of javelins and axes, while Norman archers shot blind into the shield wall without breaking it.',
        },
        {
          act: 5,
          title: '1.5 The Feigned Retreat & Anglo-Saxon Defeat (October 1066)',
          text: '<span class="para-ref">[1.5]</span> The turning point came in the late afternoon. Sensing panic on his left flank where Breton soldiers retreated, William turned disaster into tactical genius. He ordered repeated <strong>feigned retreats</strong>: Norman cavalry charged the hill, then pretended to flee in terror. Tempted by the prospect of victory, undisciplined Saxon fyrd militia broke rank and surged downhill in pursuit. Immediately, Norman horsemen wheeled around, surrounded the scattered Saxons on open ground, and butchered them. With the shield wall fractured, Norman archers angled arrows high into the air. Harold was killed—traditionally struck in the eye with an arrow—and the Anglo-Saxon army disintegrated.',
          source: {
            letter: 'B',
            title:
              'Source B: The Bayeux Tapestry: Death of King Harold & Flight of the Saxons (1066)',
            image: '/images/battle_of_hastings_bayeux.jpg',
            caption:
              'Under the Latin inscription "HAROLD REX INTERFECTUS EST", King Harold is struck in the eye with an arrow before being cut down by a mounted Norman knight beside the Anglo-Saxon dragon standard.',
            source_context:
              'The climactic scene of the Battle of Hastings embroidered under Latin text: "HAROLD REX INTERFECTUS EST" (King Harold is killed).',
            how_useful_question:
              'How useful is Source B for an enquiry into the death of King Harold and the collapse of the Anglo-Saxon army at Hastings?',
            provenance_clues: [
              'Author: Anglo-Saxon embroiderers working under Norman supervision in Canterbury.',
              'Audience: Contemporary Norman aristocracy celebrating their battlefield supremacy.',
              'Motive: To depict the climax of the Conquest as a decisive military triumph sanctioned by God.',
            ],
            hinge_question:
              'Hinge Question: Was Harold’s defeat caused primarily by William’s superior cavalry tactics, or by Harold’s reckless exhaustion after Stamford Bridge?',
            citation: 'Bayeux Museum, Normandy • Wool embroidery on linen (c. 1070s).',
          },
        },
      ],

      tasks: [
        {
          id: 'me_l1_q2_explain_why',
          type: 'extended_writing',
          topic: 'Question 2: Explain Why [12 marks • 15 mins]',
          title: 'Question 2: Explain Why [12 marks • 15 mins]',
          question:
            'Explain why William of Normandy achieved victory at the Battle of Hastings in 1066. [12 marks]',
          stimulus: [
            'Norman military tactics, heavy cavalry, and the feigned retreat',
            'Anglo-Saxon exhaustion and loss of shield-wall discipline',
          ],
          hints: [
            'Point: State your central thesis: weigh whether Norman combined-arms tactics (heavy cavalry and feigned retreat) or Anglo-Saxon exhaustion and loss of shield-wall discipline proved more decisive on Senlac Hill [1.4, 1.5].',
            "Evidence: Deploy specific factual evidence: the 200-mile forced march after Stamford Bridge, the shield wall on Senlac Hill, Breton cavalry charges, feigned retreats, and Harold's death [1.3–1.5].",
            'Explanation: Explain the causal connection: show how the feigned retreat lured undisciplined Saxon fyrd militia off the hill, opening fatal gaps in the shield wall that cavalry exploited [1.5].',
            'Link: Conclude with a sustained comparative judgment: evaluate whether superior tactical flexibility or Saxon fatigue was the ultimate reason for William’s victory [1.1–1.5].',
          ],
          model_answer:
            'While Norman military tactics were vital, William’s victory was equally driven by Harold’s severe exhaustion and strategic misfortune.<br><br>On the one hand, William demonstrated tactical flexibility. Unlike the static Saxon army, William commanded a combined-arms force of archers, heavy infantry, and mounted cavalry. When frontal charges failed to crack the shield wall, William deployed the feigned retreat, exploiting Saxon lack of discipline to break their defensive perimeter.<br><br>On the other hand, Harold was defeated by circumstance and fatigue. Harold had been forced to fight Harald Hardrada at Stamford Bridge in Yorkshire, losing elite housecarls before marching 250 miles south in October. His men were physically depleted, and had Harold waited in London to gather reinforcements, the outcome may have differed.<br><br>In conclusion, tactics unlocked the shield wall, but Harold’s exhaustion created the vulnerability William exploited.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry establishes the foundational geopolitical crisis of 1066. Ground pupils in the succession void left by Edward the Confessor before examining the mechanics of Senlac Hill. Emphasise that the shield wall was nearly impenetrable until the feigned retreat broke Saxon discipline.',
        objectives: [
          {
            objective: 'Assess the rival claims to the English throne in 1066.',
            primer:
              'Guide pupils through paragraph [1.2]. Contrast election by the Witan against William’s claimed holy relic oath.',
            question:
              'Hinge Question: If bloodline succession was not legally established in 1066, what gave a medieval claimant true legitimacy: election, oaths, or military force?',
          },
          {
            objective: 'Explain the tactical turning points of the Battle of Hastings.',
            primer:
              'Contrast Harold’s static shield wall against William’s combined-arms tactics and feigned retreat in paragraphs [1.4] and [1.5].',
            question:
              'Hinge Question: Why did the feigned retreat succeed against the Anglo-Saxon fyrd when frontal cavalry charges had failed all morning?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'Who died in January 1066 without leaving an heir to the English throne?',
          options: [
            'Harold Godwinson',
            'Edward the Confessor',
            'Alfred the Great',
            'William the Conqueror',
          ],
          answer: 'Edward the Confessor',
        },
        {
          question: 'Where did Harold Godwinson crush Harald Hardrada’s Viking invasion army?',
          options: ['Fulford', 'Hastings', 'Stamford Bridge', 'Pevensey'],
          answer: 'Stamford Bridge',
        },
        {
          question:
            'What military formation did Anglo-Saxon housecarls form at the crest of Senlac Hill?',
          options: ['The Roman Square', 'The Phalanx', 'The Flying Wedge', 'The Shield Wall'],
          answer: 'The Shield Wall',
        },
        {
          question: 'What tactical trick did Duke William use to lure the English downhill?',
          options: ['The Feigned Retreat', 'Night Ambush', 'Poisoned Wells', 'Smoke Screens'],
          answer: 'The Feigned Retreat',
        },
      ],

      flashcards: [
        {
          term: 'Witan',
          definition:
            'The council of Anglo-Saxon nobles and bishops who held the power to elect the king.',
        },
        {
          term: 'Housecarl',
          definition:
            'A professional, full-time Anglo-Saxon warrior armed with a heavy two-handed battleaxe.',
        },
        {
          term: 'Feigned Retreat',
          definition:
            'A deliberate military trick where soldiers fake panic and run away to lure enemies out of position.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 2: Castles, Terror & Domesday: How did William control England?
    // ------------------------------------------------------------------------
    {
      id: 'lesson_2',
      title: 'Castles, Terror & Domesday: How did the Normans subjugate England?',
      enquiry:
        'How did a minority Norman elite of fewer than 10,000 soldiers control two million hostile Anglo-Saxons?',
      subtitle: 'Earthworks, Extermination, and Fiscal Surveillance',
      skill: 'Historical Analysis: Control & Subjugation',
      card_image: '/images/portchester_keep.jpg',
      card_position: 'center 25%',
      banner: {
        image: '/images/portchester_seawards.jpg',
        position: 'center 35%',
        caption:
          'Portchester Castle, Hampshire: William the Conqueror planted a 4-storey Norman stone keep inside the massive Roman Saxon Shore fort walls to police the Solent and Portsmouth Harbour.',
      },
      margin_spine: [
        { year: '1066–70', label: '2.1 The Minority Dilemma' },
        { year: '1067–80', label: '2.2 Motte & Bailey Blitz' },
        { year: '1069–70', label: '2.3 Harrying of the North' },
        { year: '1086', label: '2.4 Great Domesday Audit' },
        { year: '1086', label: '2.5 Local Fieldwork: Portchester' },
      ],
      causal_domino_spine: {
        title: 'Castles, Terror & Domesday (1066–1086)',
        subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
        stages: [
          {
            step: 1,
            date: '1066–1068',
            title: 'The Motte-and-Bailey Castle Blitz',
            actor: 'Norman Colonists & Anglo-Saxon Labour',
            tag: '🏰 TIMBER STRONGHOLDS',
            trigger:
              'Fewer than 10,000 Norman invaders erected over 500 earthen motte-and-bailey castles across England in under twenty years using forced Saxon labour.',
            connective:
              'Allowed tiny garrisons of heavily armed knights to dominate vast hostile populations, surveil river routes, and rapidly crush local insurgencies.',
            question:
              'How did the motte-and-bailey blitz allow 10,000 Normans to dominate 2 million Saxons?',
          },
          {
            step: 2,
            date: '1069–1070',
            title: 'The Scorched-Earth Harrying of the North',
            actor: 'William the Conqueror & Northern Rebels',
            tag: '🔥 STATE TERROR',
            trigger:
              'After northern English rebels slaughtered the Norman garrison at York, William unleashed a systematic campaign of scorched-earth terror across Yorkshire.',
            connective:
              'Burned crops, slaughtered herds, and salted fields, causing over 100,000 peasants to starve and permanently eliminating the North as a centre of rebellion.',
            question: 'Why did William unleash the brutal scorched-earth Harrying of the North?',
          },
          {
            step: 3,
            date: '1070–1100',
            title: 'Stone Keeps & Portchester Castle',
            actor: 'Anglo-Norman Architects & Garrison Troops',
            tag: '🏛️ STONE MASTERY',
            trigger:
              'The Normans replaced temporary timber forts with towering stone keeps, building Portchester Castle’s monumental limestone keep directly inside Roman coastal walls.',
            connective:
              'Projected permanent imperial authority over strategic harbours, ensuring sea communications with the Duchy of Normandy remained secure.',
            question:
              'How did massive stone keeps like Portchester Castle project permanent imperial permanence?',
          },
          {
            step: 4,
            date: '1085–1086',
            title: 'The Great Domesday Book Audit',
            actor: 'William I & Royal Commissioners',
            tag: '📖 DOMESDAY SURVEY',
            trigger:
              'Facing the threat of a combined Viking invasion, King William commissioned an exhaustive land and wealth audit across every shire in England at Gloucester.',
            connective:
              'Catalogued every hide of land, mill, pig, and ox, providing the Crown with an inescapable tax ledger and sealing Norman administrative dominance.',
            question:
              'Why did William commission the exhaustive Domesday Book audit at Gloucester?',
          },
          {
            step: 5,
            date: '1086',
            title: 'Feudal Hierarchy & Land Dispossession',
            actor: 'Norman Barons & Dispossessed Thegns',
            tag: '⚖️ FEUDAL SUBJUGATION',
            trigger:
              'The Domesday survey codified the near-total dispossession of the Anglo-Saxon aristocracy, transferring over 90% of English land to fewer than 200 Norman barons.',
            connective:
              'Enshrined the feudal pyramid where all land belonged to the Crown, locking the English peasantry into centuries of manorial serfdom.',
            question:
              'What does the local Domesday hundred reveal about Anglo-Saxon land dispossession?',
          },
        ],
      },
      did_you_know:
        'William the Conqueror’s Domesday Book was so thorough that the Anglo-Saxon Chronicle lamented: "Not a single hide of land, nor ox, cow, or pig was omitted from his record." The English called it "Domesday" (Doomsday) because its tax rulings were as final and terrifying as the Day of Judgement!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'In what year was the Battle of Hastings fought?',
            answer: '1066 (14 October).',
          },
          {
            question: 'What military tactic broke the Anglo-Saxon shield wall at Hastings?',
            answer: 'The feigned retreat.',
          },
          {
            question: 'Where was William crowned King of England on Christmas Day 1066?',
            answer: 'Westminster Abbey.',
          },
          {
            question: 'What term describes the formal legal process of inheriting a royal crown?',
            answer: 'Succession.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Subjugation',
          definition:
            'The act of bringing a conquered population under total, permanent military and political control.',
          phonetic: 'sub-joo-GAY-shun',
          syllables: 'Sub-ju-ga-tion',
          tier: '3',
        },
        {
          term: 'Motte-and-Bailey',
          definition:
            'An early Norman timber fortress with a raised earth mound (motte) and palisaded courtyard (bailey).',
          phonetic: 'MOT-and-BAY-lee',
          syllables: 'Motte-and-Bai-ley',
          tier: '3',
        },
        {
          term: 'Castellan',
          definition:
            'A trusted Norman governor appointed by the king to garrison and command a fortress.',
          phonetic: 'KAS-tuh-lun',
          syllables: 'Cas-tel-lan',
          tier: '3',
        },
        {
          term: 'Harrying',
          definition:
            'The systematic burning of crops, destruction of villages, and slaughter of livestock to exterminate resistance.',
          phonetic: 'HAR-ee-ing',
          syllables: 'Har-ry-ing',
          tier: '3',
        },
        {
          term: 'Domesday Book',
          definition:
            'The comprehensive land and property audit ordered by William I in 1086 to assess national taxable wealth.',
          phonetic: 'DOOMS-day BOOK',
          syllables: 'Domes-day Book',
          tier: '3',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '2.1 The Minority Dilemma (1066–1070)',
          text: '<span class="para-ref">[2.1]</span> When William was crowned King of England on Christmas Day 1066, he faced an existential emergency: how could an invading elite of fewer than 10,000 French-speaking Norman soldiers govern a fiercely hostile population of over two million Anglo-Saxons? The English viewed the Normans as illegitimate, violent usurpers. Widespread rebellions erupted across Kent, Devon, the Welsh border, and the fenlands of Ely led by Hereward the Wake. William realized that victory on the battlefield was meaningless without permanent, terrifying instruments of domestic <strong>subjugation</strong>.',
        },
        {
          act: 2,
          title: '2.2 The Motte & Bailey Blitz (1067–1085)',
          text: '<span class="para-ref">[2.2]</span> William’s immediate military solution was an unprecedented castle-building campaign. Within twenty years, the Normans erected over five hundred <strong>Motte and Bailey</strong> castles across England. Built in just eight to fourteen days using forced Anglo-Saxon labour, these fortresses were placed fifteen to twenty miles apart—exactly one day’s march for mounted cavalry. A steep earth mound (the <em>motte</em>) stood up to ten metres high, topped with a timber watchtower keep. Below lay the <em>bailey</em>, an enclosed courtyard protected by a deep ditch and palisade, housing garrison barracks and stables. From these fortresses, just thirty mounted knights could terrorise and police an entire district of 5,000 peasants.',
          source: {
            letter: 'A',
            title: 'Source A: The Bayeux Tapestry: Normans Building a Castle at Hastings (1066)',
            image: '/images/motte_and_bailey.jpg',
            caption:
              'Norman overseers holding rods command Anglo-Saxon forced labourers carrying spades to pile earth for the motte at Hastings.',
            source_context:
              'The Bayeux Tapestry depicts William ordering the construction of a motte-and-bailey castle immediately upon landing at Pevensey and Hastings before the battle.',
            how_useful_question:
              'How useful is Source A for an enquiry into the speed and methods used by the Normans to fortify England?',
            provenance_clues: [
              'Author: Anglo-Saxon embroiderers working under Norman direction.',
              'Audience: Norman ruling class demonstrating their organizational dominance.',
              'Motive: To record how earthworks and physical fortifications formed the immediate spearhead of the Conquest.',
            ],
            hinge_question:
              'Hinge Question: Why were quick-to-build timber motte-and-bailey castles far more effective for early Norman conquest than slow stone fortresses?',
            citation: 'Bayeux Museum, Normandy • Wool embroidery on linen (c. 1070s).',
          },
        },
        {
          act: 3,
          title: '2.3 The Harrying of the North (1069–1070)',
          text: '<span class="para-ref">[2.3]</span> Where castles failed to deter rebellion, William deployed merciless state terror. In 1069, northern English rebels allied with Danish invaders to capture York, slaughtering the 3,000-man Norman garrison. William’s vengeance was cataclysmic. During the winter of 1069–1070, William launched the <strong>Harrying of the North</strong>. His armies systematically burned every village, granary, and field between the River Humber and the River Tees. They slaughtered herds of cattle, smashed farming tools, and salted the soil. The resulting artificial famine wiped out over 100,000 civilians. When Domesday commissioners surveyed Yorkshire sixteen years later, one-third of the county was still recorded as uninhabited wasteland (*waste*).',
        },
        {
          act: 4,
          title: '2.4 Bureaucracy & The Great Domesday Audit (1086)',
          text: '<span class="para-ref">[2.4]</span> William recognized that physical brutality had to be sealed by administrative surveillance. At Christmas 1085, fearing a massive Viking invasion, William commissioned the <strong>Domesday Book</strong>. Royal inquisitors were sent into every shire to interview sworn panels of local jurors. They recorded who owned every acre under Edward the Confessor, who owned it now, how many ploughs, mills, and woodlands existed, and how much annual tax could be extracted. Over 80% of English land was confiscated from Anglo-Saxon thegns and handed to roughly 200 Norman tenants-in-chief. Domesday established an unshakeable feudal tax grip that bound every landowner directly to the King.',
          source: {
            letter: 'B',
            title: 'Source B: Great Domesday Book Folio: Survey of the King’s Manors (1086)',
            image: '/images/domesday_book.jpg',
            caption:
              'Parchment page from Great Domesday Book written in abbreviated Latin script by royal scribes at Winchester, recording lands, mills, and tax values.',
            source_context:
              'Compiled at Winchester in 1086, Domesday provided William with the exact military and financial inventory of his newly conquered kingdom.',
            how_useful_question:
              'How useful is Source B for an enquiry into how William the Conqueror transformed England’s land ownership and economy?',
            provenance_clues: [
              'Author: Official royal clerks working for the King’s Exchequer at Winchester.',
              'Audience: King William and his royal tax collectors.',
              'Motive: To record property values accurately to maximise royal taxation and prevent baronial tax evasion.',
            ],
            hinge_question:
              'Hinge Question: Was Domesday primarily a tax ledger, or a legal weapon designed to permanently disinherit the Anglo-Saxon aristocracy?',
            citation: 'The National Archives, Kew (E 31/2) • Vellum manuscript (1086).',
          },
        },
        {
          act: 5,
          title: '2.5 Local Fieldwork & Landscape Forensics: Portchester Castle',
          text: '<span class="para-ref">[2.5]</span> The physical anatomy of Norman subjugation remains dramatically visible along the Hampshire coastline at <strong>Portchester Castle</strong>. Rather than building from scratch, the Normans recognized the strategic value of the 3rd-century Roman Saxon Shore fort guarding Portsmouth Harbour. In the late 11th century, Norman engineers planted a colossal four-storey stone keep directly inside the north-west corner of the Roman flint walls, creating an inner bailey. At the same time, William audited the surrounding local manors in Domesday: the 1086 survey records that the King held Portchester (assessed at 2 hides with woodland for 10 pigs), while adjacent Fareham was assessed at 20 hides with two watermills and fisheries along the River Meon. These landscape forensics prove how military architecture and fiscal surveillance worked as two halves of a single imperial machine.',
        },
        {
          type: 'photo_slider',
          collapsible: true,
          accordion_title: 'Local Fieldwork Study • Portchester Castle & The Norman Subjugation',
          tag: 'Norman Fortification & Landscape Forensics',
          title: 'Portchester Castle: Roman Saxon Shore Fort to Norman Royal Keep',
          description:
            'Slide to compare the 1890s Ordnance Survey 25-inch survey with modern aerial and street topography. Observe how Norman engineers placed a formidable four-storey stone keep directly inside the 3rd-century Roman Saxon Shore walls, repurposing ancient coastal defences to command Portsmouth Harbour and guard vital maritime supply lines to Normandy.',
          before_image: '/images/portchester/portchester_castle_historic_os_map_1890s.jpg',
          before_label: '1890s OS 25-Inch Map (Roman Fort & Norman Keep)',
          after_image: '/images/portchester/portchester_castle_modern_map.jpg',
          after_label: 'Modern Street Map (OpenStreetMap)',
          satellite_image: '/images/portchester/portchester_castle_modern_satellite.jpg',
          satellite_label: 'Modern Satellite Aerial View (ESRI)',
          links: [
            {
              label: 'English Heritage: History of Portchester Castle',
              url: 'https://www.english-heritage.org.uk/visit/places/portchester-castle/history-and-stories/',
              icon: 'fa-solid fa-landmark',
            },
            {
              label: 'Open Domesday: Portchester Hundred Survey (1086)',
              url: 'https://opendomesday.org/place/SU6204/portchester/',
              icon: 'fa-solid fa-scroll',
            },
          ],
        },
      ],

      tasks: [
        {
          id: 'me_l2_q1_features',
          type: 'extended_writing',
          qNum: 1,
          topic: 'Question 1: Describe Two Features [4 marks • 5 mins]',
          title: 'Question 1: Describe Two Features [4 marks • 5 mins]',
          question: 'Describe two features of Norman motte-and-bailey castles. [4 marks]',
          hints: [
            'Point (Feature 1): One key feature was the raised earth mound or motte, topped by a timber keep and watchtower [2.2].',
            'Evidence (Detail 1): Specifically, this elevated position gave Norman sentries 360-degree sightlines to spot approaching rebel forces miles away and shoot downward with complete tactical advantage [2.2].',
            'Explanation (Feature 2): A second key feature was the enclosed courtyard or bailey at the base of the motte, surrounded by a deep ditch and timber palisade [2.2].',
            'Link (Detail 2): This served the purpose of safely sheltering up to thirty mounted knights, warhorses, armouries, and food stores, allowing a tiny Norman garrison to live securely inside hostile territory and ride out rapidly to extinguish spontaneous revolts [2.2].',
          ],
          model_answer:
            'Feature 1: One key feature of a motte-and-bailey castle was the motte, an artificial earth mound up to thirty feet high topped by a wooden keep and watchtower. Specifically, this elevated position gave Norman sentries 360-degree sightlines to spot approaching rebel Saxon forces miles away and shoot downward with complete tactical advantage.<br><br>Feature 2: A second key feature was the bailey, an enclosed courtyard at the base of the motte surrounded by a deep ditch and timber palisade. Specifically, the bailey served the purpose of safely sheltering up to thirty mounted knights, warhorses, armouries, and food stores, allowing a tiny Norman garrison to live securely inside hostile English territory and ride out rapidly to extinguish spontaneous local revolts.',
        },
        {
          id: 'me_l2_q2_consequence',
          type: 'extended_writing',
          qNum: 2,
          topic: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
          title: 'Question 2: Explain One Consequence [4 marks • 5 mins]',
          question:
            'Explain one consequence of the motte-and-bailey blitz for Anglo-Saxon resistance against Norman rule. [4 marks]',
          hints: [
            'Point: A significant consequence of the motte-and-bailey blitz was the fatal fracturing and paralysis of Anglo-Saxon ability to organize sustained guerrilla resistance [2.2].',
            'Evidence: Over 500 timber motte-and-bailey castles were thrown up across England in under twenty years, each housing thirty heavily armoured Norman cavalrymen [2.2].',
            'Explanation: Because castles could be erected in under a fortnight using forced Saxon labour, mounted Norman patrols could ride out to extinguish spontaneous revolts within hours before rebellions could coalesce into regional armies [2.2].',
            'Link: Consequently, the castle network broke the territorial unity of England, locking each shire under permanent military surveillance and cementing Norman rule [2.2, 2.5].',
          ],
          model_answer:
            'A significant consequence of the motte-and-bailey castle blitz was the fatal fracturing and paralysis of Anglo-Saxon resistance across England. By constructing over 500 fortified outposts within two decades, a tiny foreign elite of roughly 10,000 Normans was able to dominate two million hostile English subjects. Impregnable keeps provided elevated sightlines and secure bases for garrisons of thirty mounted knights, who could deploy within hours to crush spontaneous local revolts before they could coalesce into coordinated regional rebellions. Furthermore, the psychological intimidation of colossal earthworks built by forced Saxon labour reinforced Norman supremacy. Consequently, the English lost the physical and strategic ability to mount sustained guerrilla warfare, locking the shires under permanent military subjugation.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry challenges pupils to explain how a tiny foreign military elite achieved permanent subjugation. Structure the lesson around three pillars: physical architecture (castles), psychological terror (Harrying of the North), and fiscal surveillance (Domesday). Ground the lesson locally in Portchester Castle and Hampshire Domesday manors.',
        objectives: [
          {
            objective: 'Explain how motte-and-bailey castles functioned as weapons of subjugation.',
            primer:
              'Direct pupils to paragraphs [2.1]–[2.2]. Emphasise the speed of construction and cavalry strike range.',
            question:
              'Hinge Question: Was a motte-and-bailey castle primarily a defensive shelter for knights, or an offensive weapon of terror designed to control the surrounding population?',
          },
          {
            objective:
              'Analyse the significance of the Domesday audit in disinheriting the English.',
            primer:
              'Guide pupils through paragraph [2.4] and the Portchester/Fareham Domesday extract in Act 2.5.',
            question:
              'Hinge Question: Why was a parchment book recording pigs, mills, and hides more dangerous to Anglo-Saxon independence than an army of Norman knights?',
          },
        ],
      },

      quick_quiz: [
        {
          question:
            'Roughly how many Norman soldiers invaded England in 1066 to rule over 2 million people?',
          options: ['Over 100,000', 'Fewer than 1,000', 'Roughly 50,000', 'Fewer than 10,000'],
          answer: 'Fewer than 10,000',
        },
        {
          question: 'What was the artificial earthen mound of a Norman castle called?',
          options: ['The Palisade', 'The Bailey', 'The Motte', 'The Barbican'],
          answer: 'The Motte',
        },
        {
          question: 'What campaign did William carry out in the winter of 1069–1070?',
          options: [
            'The Harrying of the North',
            'The Peasant Crusade',
            'The Pilgrimage of Grace',
            'The Barons’ War',
          ],
          answer: 'The Harrying of the North',
        },
        {
          question:
            'What great survey of English land and wealth did William commission in 1085–1086?',
          options: [
            'The Constitutions of Clarendon',
            'The Domesday Book',
            'The Anglo-Saxon Chronicle',
            'Magna Carta',
          ],
          answer: 'The Domesday Book',
        },
      ],

      flashcards: [
        {
          term: 'Motte-and-Bailey',
          definition:
            'An early Norman timber fortress with a raised earth mound (motte) and palisaded courtyard (bailey).',
        },
        {
          term: 'Harrying of the North',
          definition:
            'William I’s 1069–70 scorched-earth campaign that depopulated Yorkshire through artificial famine.',
        },
        {
          term: 'Domesday Book',
          definition:
            'William the Conqueror’s 1086 national land audit recording ownership, resources, and taxable values.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 3: Crown vs Church: Henry II & Thomas Becket
    // ------------------------------------------------------------------------
    {
      id: 'lesson_3',
      title: 'Crown vs Church: Why did Henry II clash with Thomas Becket?',
      enquiry:
        'Why did the conflict between King Henry II and Archbishop Thomas Becket erupt into murder in Canterbury Cathedral?',
      subtitle: 'Criminous Clerks, Royal Sovereignty, and the Martyrdom of 1170',
      skill: 'Historical Significance & Church-State Conflict',
      card_image: '/images/becket_murder.jpg',
      card_position: 'center 20%',
      banner: {
        image: '/images/henry_becket_dispute.jpg',
        position: 'center 30%',
        caption:
          'King Henry II and Archbishop Thomas Becket disputing royal versus ecclesiastical sovereignty, depicted in a 14th-century English manuscript illumination.',
      },
      margin_spine: [
        { year: '1154–62', label: '3.1 Two Jurisdictions' },
        { year: '1162', label: '3.2 Becket’s Metamorphosis' },
        { year: '1164', label: '3.3 Clarendon & Clerks' },
        { year: '1164–70', label: '3.4 Exile & The Fatal Cry' },
        { year: '1170–74', label: '3.5 Martyrdom & Penance' },
      ],
      causal_domino_spine: {
        title: 'Crown vs Church: Henry II & Thomas Becket (1154–1174)',
        subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
        stages: [
          {
            step: 1,
            date: '1154–1162',
            title: 'Worldly Chancellor to Archbishop of Canterbury',
            actor: 'King Henry II & Chancellor Thomas Becket',
            tag: '👑 ROYAL APPOINTMENT',
            trigger:
              'King Henry II appointed his worldly hunting companion, chancellor, and drinking friend Thomas Becket as Archbishop of Canterbury in 1162.',
            connective:
              'Sought to install a pliable royal puppet who would bring the wealthy English Catholic Church firmly under royal Crown control.',
            question:
              'Why did Henry II appoint his worldly drinking companion Becket as Archbishop?',
          },
          {
            step: 2,
            date: '1162',
            title: 'Becket’s Metamorphosis & Spiritual Allegiance',
            actor: 'Archbishop Thomas Becket',
            tag: '✝️ SPIRITUAL CONVERSION',
            trigger:
              'Upon consecration, Becket dramatically discarded his rich silk robes, donned an austere goat hairshirt, and dedicated his total allegiance solely to God and the Pope.',
            connective:
              'Shattered Henry’s political strategy, turning his closest royal friend into an unbending champion of papal independence and ecclesiastical immunity.',
            question: 'How did Becket’s sudden spiritual transformation shock King Henry?',
          },
          {
            step: 3,
            date: '1164',
            title: 'Constitutions of Clarendon & ‘Criminous Clerks’',
            actor: 'Henry II, Becket & The Royal Council',
            tag: '📜 CLARENDON DISPUTE',
            trigger:
              'Henry issued the Constitutions of Clarendon, demanding that "criminous clerks" who committed felonies be stripped of holy orders and punished by royal judges.',
            connective:
              'Provoked Becket to refuse royal jurisdiction, triggering a constitutional crisis that forced Becket to flee secretly into a six-year French exile.',
            question:
              'Why did the Constitutions of Clarendon and ‘criminous clerks’ provoke an open rift?',
          },
          {
            step: 4,
            date: '29 Dec 1170',
            title: 'Murder in Canterbury Cathedral',
            actor: 'Four Norman Knights & Archbishop Becket',
            tag: '🗡️ CATHEDRAL REGICIDE',
            trigger:
              'Four knights took Henry II’s furious outburst literally, riding to Canterbury and murdering Archbishop Becket with swords before the cathedral altar.',
            connective:
              'Shocked Christian Europe, turned Becket into an instant international martyr, and severely endangered Henry II’s continental empire with excommunication.',
            question: 'How did royal rage culminate in brutal murder in Canterbury Cathedral?',
          },
          {
            step: 5,
            date: '1170–1174',
            title: 'Barefoot Royal Penance & Papal Compromise',
            actor: 'King Henry II & The Monks of Canterbury',
            tag: '🏛️ ROYAL PENANCE',
            trigger:
              'In 1174, King Henry II walked barefoot in sackcloth through Canterbury streets, weeping at Becket’s tomb and submitting to a public flogging by eighty monks.',
            connective:
              'Secured papal absolution, but forced the Crown to abandon the Constitutions of Clarendon and left Church courts exempt from royal control until the Tudors.',
            question: 'Why was Henry II forced to perform barefoot public penance at Canterbury?',
          },
        ],
      },
      did_you_know:
        'When Archbishop Thomas Becket was murdered, monks washing his corpse discovered he secretly wore a coarse goat-hair shirt crawling with lice beneath his magnificent silk robes. This severe self-mortification convinced contemporaries that Becket was not a proud, stubborn politician, but a holy saint who died defending Christ’s Church!',

      do_now: {
        type: 'questions',
        items: [
          {
            question:
              'What comprehensive land survey did William the Conqueror commission in 1086?',
            answer: 'The Domesday Book.',
          },
          {
            question: 'What type of castle featured an artificial mound and palisaded courtyard?',
            answer: 'Motte-and-bailey castle.',
          },
          {
            question:
              'What supreme religious leader in Rome commanded the medieval Catholic Church?',
            answer: 'The Pope.',
          },
          {
            question:
              'What is the ultimate punishment of expelling someone from the Catholic Church called?',
            answer: 'Excommunication.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Canon Law',
          definition:
            'The legal system of the Catholic Church governing clergy conduct and spiritual matters.',
          phonetic: 'KAN-un LAW',
          syllables: 'Can-on Law',
          tier: '3',
        },
        {
          term: 'Criminous Clerk',
          definition:
            'A medieval clergyman accused of committing serious secular crimes like murder, theft, or rape.',
          phonetic: 'KRIM-ih-nus KLURK',
          syllables: 'Crim-i-nous Clerk',
          tier: '3',
        },
        {
          term: 'Benefit of Clergy',
          definition:
            'The legal right of educated churchmen to be tried in lenient Church courts rather than royal courts.',
          phonetic: 'BEN-ih-fit uv KLUR-jee',
          syllables: 'Ben-e-fit of Cler-gy',
          tier: '3',
        },
        {
          term: 'Constitutions of Clarendon',
          definition:
            'A 1164 set of 16 royal customs issued by Henry II to bring Church courts under royal supervision.',
          phonetic: 'kon-stih-TOO-shunz uv KLAIR-un-dun',
          syllables: 'Con-sti-tu-tions of Clar-en-don',
          tier: '3',
        },
        {
          term: 'Martyrdom',
          definition:
            'The suffering of death as a penalty for refusing to renounce religious beliefs or Church independence.',
          phonetic: 'MAHR-ter-dum',
          syllables: 'Mar-tyr-dom',
          tier: '3',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '3.1 Two Sovereign Kingdoms (1154–1162)',
          text: '<span class="para-ref">[3.1]</span> In 12th-century medieval England, every citizen lived under two competing sovereign powers: the Crown and the Catholic Church. While King Henry II ruled the secular kingdom, the Church owned one-third of England’s agricultural land and answered solely to the Pope in Rome. The most explosive point of friction was the legal system. Church courts operated under <strong>Canon Law</strong>, which refused to impose the death penalty. If a priest, monk, or literate deacon committed murder or rape, he claimed <strong>Benefit of Clergy</strong>: instead of being hanged in the King’s courts, he was tried in Church courts where the harshest punishment was defrocking or a pilgrimage.',
        },
        {
          act: 2,
          title: '3.2 Becket’s Metamorphosis (1162)',
          text: '<span class="para-ref">[3.2]</span> King Henry II was determined to restore royal legal authority. To achieve this, Henry hatched an audacious plan: he would appoint his closest friend, trusted companion, and drinking partner, <strong>Thomas Becket</strong>, as Archbishop of Canterbury—the highest religious post in England. Becket was already Henry’s Lord Chancellor, famous for living in flamboyant luxury, hawking, and leading cavalry in battle. Henry assumed that having his loyal friend as head of the Church would allow him to subordinate Church courts effortlessly. But the moment Becket was consecrated in June 1162, he underwent an astonishing transformation: he resigned as Chancellor, traded his silk robes for coarse sackcloth, and declared his ultimate allegiance belonged not to the King of England, but to Jesus Christ.',
        },
        {
          act: 3,
          title: '3.3 The Constitutions of Clarendon (1164)',
          text: '<span class="para-ref">[3.3]</span> The clash erupted over "criminous clerks." Henry argued that approximately one in six adult men were tonsured churchmen, and that over one hundred murders had been committed by clergymen who escaped royal hanging. In January 1164, at Clarendon Palace, Henry demanded that all English bishops seal the <strong>Constitutions of Clarendon</strong>. Clause 3 decreed that churchmen accused of crimes must be questioned in the King’s court, tried in Church court, and, if found guilty, handed back to royal bailiffs to be hanged. Becket initially hesitated under intense pressure, but then fiercely refused to sign, claiming that punishing a clerk twice violated biblical law (*"God does not judge twice for the same offence"*).',
          source: {
            letter: 'A',
            title:
              'Source A: Manuscript Illumination of King Henry II and Thomas Becket Clashing (c. 1300s)',
            image: '/images/henry_becket_dispute.jpg',
            caption:
              'King Henry II on his royal throne pointing an accusatory finger at Archbishop Thomas Becket, who clutches his archiepiscopal cross and refuses to yield.',
            source_context:
              'Created in England around 1300, this illumination in Cotton MS Claudius D II visually encapsulates the unresolvable ideological clash between royal secular authority and Church spiritual autonomy.',
            how_useful_question:
              'How useful is Source A for an enquiry into the nature of the constitutional conflict between Henry II and Thomas Becket?',
            provenance_clues: [
              'Author: English monastic scribe depicting historical kings and archbishops.',
              'Audience: Medieval scholars and churchmen examining historical precedent.',
              'Motive: To emphasize Becket’s steadfast defence of Church privileges against royal overreach.',
            ],
            hinge_question:
              'Hinge Question: Was Becket defending Christian justice and Church independence, or was he defending an unjust legal loophole that allowed murderous priests to escape punishment?',
            citation:
              'British Library, London (Cotton MS Claudius D II) • Illuminated vellum (c. 1300s).',
          },
        },
        {
          act: 4,
          title: '3.4 Exile & The Fatal Cry (1164–1170)',
          text: '<span class="para-ref">[3.4]</span> Furious at Becket’s defiance, Henry charged him with treason and embezzlement. Becket fled secretly to France, where he spent six years in bitter exile protected by King Louis VII. From France, Becket wielded spiritual terror, excommunicating Henry’s closest ministers. A hollow reconciliation was brokered in July 1170, and Becket returned to England. But upon landing, Becket promptly excommunicated the Archbishop of York and two other bishops who had illegally crowned Henry’s son in Becket’s absence. When news reached Henry at his castle in Normandy at Christmas 1170, the King exploded into legendary rage, famously screaming: <em>"What miserable drones and traitors have I nourished in my household, that they allow their lord to be treated with such shameful contempt by a low-born clerk?"</em>',
        },
        {
          act: 5,
          title: '3.5 The Murder in the Cathedral & Penance (29 December 1170)',
          text: '<span class="para-ref">[3.5]</span> Four Norman knights—Reginald FitzUrse, William de Tracy, Hugh de Morville, and Richard le Breton—took the King’s outburst literally. They crossed the Channel, rode to Canterbury, and burst into the cathedral at dusk on <strong>29 December 1170</strong> while monks chanted vespers. Confronting Becket near the altar of St Benedict, the knights demanded he lift the excommunications. When Becket refused, calling FitzUrse a pimp, they drew their broadswords. They struck Becket repeatedly on the head until his skull was severed, scattering his brains across the cathedral flagstones. Europe was convulsed with horror. Pope Alexander III canonized Becket as a saint just three years later. In July 1174, a devastated Henry II walked barefoot through the streets of Canterbury and knelt before Becket’s tomb, allowing monks to scourge his bare back with rods in public royal penance.',
          source: {
            letter: 'B',
            title:
              'Source B: Eyewitness Account of the Murder of Thomas Becket by Edward Grim (1170)',
            image: '/images/becket_murder.jpg',
            caption:
              'Illumination showing the four Norman knights in chainmail striking Archbishop Thomas Becket at the altar as clerk Edward Grim holds up the cross.',
            source_context:
              'Edward Grim, a visiting Cambridge clerk, stood beside Becket during the assault and had his arm fractured by a knight’s sword while trying to shield the Archbishop.',
            how_useful_question:
              'How useful is Source B for an enquiry into the brutal nature of Thomas Becket’s murder inside Canterbury Cathedral?',
            provenance_clues: [
              'Author: Edward Grim, a direct eyewitness wounded alongside Becket during the assassination.',
              'Audience: Christians across Europe seeking the holy record of Becket’s martyrdom.',
              'Motive: To immortalise Becket as a holy Christian martyr who accepted death with serene piety.',
            ],
            hinge_question:
              'Hinge Question: How did Becket’s violent death ultimately grant the Church total victory over King Henry II in the battle for legal independence?',
            citation: 'Edward Grim • Vita S. Thomae (c. 1172) / British Library (Harley MS 5102).',
          },
        },
      ],

      tasks: [
        {
          id: 'me_l3_q3_interpretations',
          type: 'historical_interpretations',
          qNum: 3,
          topic: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks • 10 mins]',
          title: 'Question 3(b) & 3(c): Contrasting Interpretations [8 marks • 10 mins]',
          text: 'Explain how Interpretations 1 and 2 differ on Thomas Becket’s motives and character, and suggest one reason why they differ. [8 marks]',
          interp1: {
            title: 'Interpretation 1',
            badge: 'Contemporary Hagiography (c. 1175)',
            author: 'Edward Grim, Eyewitness Monk & Chronicler, Life of St Thomas (c. 1175)',
            text: '“The glorious martyr Thomas stood like a rock before the altar, refusing to yield the sacred liberties of Christ’s holy Church to earthly tyrants. He offered his neck to the wicked swords of the four knights, dying willingly so that God’s law might triumph over royal pride.”',
          },
          interp2: {
            title: 'Interpretation 2',
            badge: 'Modern Critical Revisionism (1986)',
            author: 'Historian Frank Barlow, Thomas Becket (1986)',
            text: '“Becket was vain, stubborn, and obsessively confrontational. Having served Henry faithfully as chancellor, his dramatic conversion into an unbending champion of clerical privilege was theatrical extremism. By shielding rapists and murderers in holy orders from secular law, Becket provoked a needless crisis.”',
          },
          matrix: [
            {
              col: '1. INTERPRETATION 1 CLAIMS',
              text: 'Portrays Becket as a holy martyr defending divine law and Church liberties against royal tyranny.',
            },
            {
              col: '2. INTERPRETATION 2 CRITIQUE',
              text: 'Portrays Becket as a stubborn, vain fanatic defending corrupt clerical immunities (criminous clerks).',
            },
            {
              col: '3. HISTORIOGRAPHICAL REASON',
              text: 'Differs because the historians focus on different aspects: Becket’s spiritual martyrdom vs his political obstinacy over royal law.',
            },
          ],
          connectives: [
            'Interpretations 1 and 2 differ on...',
            'Interpretation 1 argues that...',
            'In sharp contrast, Interpretation 2 suggests that...',
            'This is a difference because...',
            'One reason why Interpretations 1 and 2 differ is because they have a different focus...',
            'Specifically, Interpretation 1 focuses primarily on Becket’s spiritual devotion and defence of sacred liberties, whereas Interpretation 2 focuses on...',
            'As a result, they reach contrasting conclusions because...',
          ],
          model_answer:
            "Interpretations 1 and 2 differ fundamentally over Thomas Becket’s character and motivation during the crisis with King Henry II.<br><br>Interpretation 1 presents Becket as a pious, principled Christian martyr who heroically defended Church liberties against secular tyranny, offering his life willingly for divine law. In sharp contrast, Interpretation 2 depicts Becket as an arrogant, theatrical extremist whose obstinacy precipitated a pointless constitutional crisis by shielding criminal clergy from the King's courts.<br><br>A primary reason why Interpretations 1 and 2 differ is that the authors have a different focus. Interpretation 1 focuses primarily on Becket's religious conviction, spiritual devotion, and steadfast martyrdom at the altar of Canterbury Cathedral, portraying him as a selfless defender of God’s law against earthly tyranny. In contrast, Interpretation 2 focuses primarily on the constitutional and legal crisis caused by Becket's resistance to royal justice, emphasising his shielding of criminous clerks from the King's common law courts and viewing his conversion as destructive obstinacy. Because the two authors focus on entirely different aspects of Becket’s actions, they arrive at contrasting interpretations.",
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry explores the fierce medieval clash between secular monarchy and ecclesiastical sovereignty. Guide pupils to see that both men felt they were defending vital principles: Henry was fighting for universal justice and the rule of law, while Becket was defending the spiritual autonomy of the Church from royal tyranny.',
        objectives: [
          {
            objective:
              'Explain the conflict between Canon Law and royal courts over criminous clerks.',
            primer:
              'Focus pupils on paragraph [3.1] and [3.3]. Contrast Benefit of Clergy with royal hanging.',
            question:
              'Hinge Question: Was Henry II trying to modernize the legal system, or was he attempting an authoritarian power grab over the Catholic Church?',
          },
          {
            objective: 'Analyse the causes and consequences of Becket’s martyrdom.',
            primer:
              'Examine paragraphs [3.4]–[3.5]. Highlight how Becket’s death ironically won total victory for Church courts.',
            question:
              'Hinge Question: Why did the murder of Thomas Becket make it politically impossible for Henry II to implement the Constitutions of Clarendon?',
          },
        ],
      },

      quick_quiz: [
        {
          question:
            'What royal office did Thomas Becket hold before becoming Archbishop of Canterbury?',
          options: ['Justiciar', 'Lord Chancellor', 'Earl Marshal', 'Lord High Treasurer'],
          answer: 'Lord Chancellor',
        },
        {
          question:
            'What 1164 royal document attempted to make criminous clerks subject to royal courts?',
          options: [
            'The Constitutions of Clarendon',
            'The Assize of Clarendon',
            'Magna Carta',
            'The Domesday Book',
          ],
          answer: 'The Constitutions of Clarendon',
        },
        {
          question: 'On what date was Thomas Becket assassinated inside Canterbury Cathedral?',
          options: ['24 June 1381', '15 June 1215', '29 December 1170', '14 October 1066'],
          answer: '29 December 1170',
        },
        {
          question: 'What public punishment did King Henry II submit to at Canterbury in 1174?',
          options: [
            'Exile to Normandy',
            'Loss of his crown',
            'Imprisonment in the Tower',
            'Flogging by monks',
          ],
          answer: 'Flogging by monks',
        },
      ],

      flashcards: [
        {
          term: 'Benefit of Clergy',
          definition:
            'The legal privilege of churchmen to be tried in lenient Church courts rather than royal courts.',
        },
        {
          term: 'Constitutions of Clarendon',
          definition:
            'A 1164 legal decree issued by Henry II attempting to bring Church courts under royal supervision.',
        },
        {
          term: 'Canon Law',
          definition:
            'The supreme legal system of the Catholic Church governing moral conduct and ecclesiastical matters.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 4: Magna Carta (1215) & Medieval Kingship
    // ------------------------------------------------------------------------
    {
      id: 'lesson_4',
      title: 'Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?',
      enquiry:
        'Was Magna Carta a revolutionary victory for human freedom or a selfish act of baronial extortion?',
      subtitle: 'Scutage, Royal Autocracy, and the Meadow of Runnymede',
      skill: 'Historical Interpretation: Liberty vs Self-Interest',
      card_image: '/images/magna_carta_1215.jpg',
      card_position: 'center 20%',
      banner: {
        image: '/images/king_john_matthew_paris.jpg',
        position: 'center 25%',
        caption:
          'King John depicted in Matthew Paris’s 13th-century chronicle Historia Anglorum: a monarch whose financial extortion and military failures brought civil war.',
      },
      margin_spine: [
        { year: '1199–1204', label: '4.1 Softsword & Normandy' },
        { year: '1205–13', label: '4.2 Papal Interdict' },
        { year: '1214–15', label: '4.3 Baronial Rebellion' },
        { year: 'June 1215', label: '4.4 Clauses of Runnymede' },
        { year: '1215–25', label: '4.5 War & The Great Myth' },
      ],
      causal_domino_spine: {
        title: 'Magna Carta & Medieval Kingship (1199–1216)',
        subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
        stages: [
          {
            step: 1,
            date: '1199–1204',
            title: 'Loss of Normandy & ‘Softsword’ Humiliation',
            actor: 'King John & King Philip II of France',
            tag: '🏰 LOSS OF NORMANDY',
            trigger:
              'King Philip II of France drove King John’s armies out of Normandy in 1204, earning John the mocking baronial nickname ‘Softsword’.',
            connective:
              'Deprived the English Crown of its ancestral continental heartland and made John fanatically obsessed with wringing silver from English barons to fund reconquest.',
            question:
              'Why did the loss of Normandy earn King John the mocking nickname ‘Softsword’?',
          },
          {
            step: 2,
            date: '1205–1213',
            title: 'Scutage Extortion & The Papal Interdict',
            actor: 'King John & Pope Innocent III',
            tag: '💰 SCUTAGE EXTORTION',
            trigger:
              'John levied unprecedented scutage (shield-tax) rates eleven times in sixteen years while feuding with Pope Innocent III, who placed England under a five-year Interdict.',
            connective:
              'Silenced church bells, left the dead unburied in ditches, and pushed deeply religious barons toward active conspiracy and open rebellion.',
            question: 'How did scutage tax extortion and the papal interdict alienate the realm?',
          },
          {
            step: 3,
            date: '1214',
            title: 'Catastrophe at the Battle of Bouvines',
            actor: 'King John’s Coalition & French Crown',
            tag: '⚔️ BOUVINES DISASTER',
            trigger:
              'King John’s expensive international mercenary coalition was crushed by French royal forces at the Battle of Bouvines in Flanders.',
            connective:
              'Emptied the royal treasury, obliterated John’s military prestige, and left him bankrupt and helpless when armed barons captured London in May 1215.',
            question:
              'How did the catastrophic defeat at the Battle of Bouvines shatter John’s authority?',
          },
          {
            step: 4,
            date: '15 June 1215',
            title: 'Runnymede & The Rule of Law (Clause 39)',
            actor: 'King John & The Rebel Barons',
            tag: '📜 THE GREAT CHARTER',
            trigger:
              'On 15 June 1215 at Runnymede, King John affixed the Great Seal to Magna Carta, agreeing that no free man could be imprisoned without lawful judgment of his peers.',
            connective:
              'Established the revolutionary constitutional principle that the monarch is subject to the law, permanently restricting arbitrary royal tyranny.',
            question: 'What revolutionary legal principle was enshrined in Clause 39 at Runnymede?',
          },
          {
            step: 5,
            date: '1215–1216',
            title: 'Papal Annulment & The First Barons’ War',
            actor: 'King John, Pope Innocent III & Prince Louis',
            tag: '⚡ BARONS’ WAR',
            trigger:
              'Pope Innocent III annulled Magna Carta as a shameful treaty signed under duress, prompting John to plunge the kingdom into civil war against rebel barons.',
            connective:
              'Prompted rebel barons to invite Prince Louis of France to take the throne, ending only with John’s sudden death and the charter’s reissuing by the regency.',
            question:
              'Why did the First Barons’ War erupt immediately after the charter was sealed?',
          },
        ],
      },
      did_you_know:
        'King John had zero intention of keeping his promises in Magna Carta. Just ten weeks after sealing it at Runnymede, John secretly appealed to Pope Innocent III, who declared Magna Carta "null, void of all validity for ever!" John immediately triggered a civil war in which rebellious English barons invited the French Prince Louis to invade England and take the crown!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'Which archbishop was murdered inside Canterbury Cathedral in 1170?',
            answer: 'Thomas Becket.',
          },
          {
            question: 'What king submitted to public flogging at Canterbury in 1174?',
            answer: 'Henry II.',
          },
          {
            question:
              'What is the term for a medieval king who rules with absolute, unlimited power?',
            answer: 'Autocrat (Autocracy).',
          },
          {
            question:
              'What term describes shield money paid by barons in place of military service?',
            answer: 'Scutage.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Magna Carta',
          definition:
            'The "Great Charter" of 63 clauses agreed by King John in 1215, placing royal power under the rule of law.',
          phonetic: 'MAG-nuh KAHR-tuh',
          syllables: 'Mag-na Car-ta',
          tier: '3',
        },
        {
          term: 'Scutage',
          definition:
            'A compulsory cash payment made by feudal barons to the king instead of providing knights for war.',
          phonetic: 'SKYOO-tij',
          syllables: 'Scu-tage',
          tier: '3',
        },
        {
          term: 'Interdict',
          definition:
            'A papal decree closing all churches in a kingdom, banning church bells, weddings, and Christian burials.',
          phonetic: 'IN-ter-dikt',
          syllables: 'In-ter-dict',
          tier: '3',
        },
        {
          term: 'Habeas Corpus',
          definition:
            'The ancient legal principle that a person cannot be detained indefinitely without trial or lawful cause.',
          phonetic: 'HAY-bee-us KOR-pus',
          syllables: 'Ha-be-as Cor-pus',
          tier: '3',
        },
        {
          term: 'Rule of Law',
          definition:
            'The foundational principle that every person, including the monarch and government, is subject to the law.',
          phonetic: 'ROOL uv LAW',
          syllables: 'Rule of Law',
          tier: '3',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '4.1 ‘Softsword’ & The Loss of Normandy (1199–1204)',
          text: '<span class="para-ref">[4.1]</span> When King John inherited the Angevin Empire in 1199, he succeeded his heroic elder brother, Richard the Lionheart. But while Richard had spent England’s wealth on crusades, John was an administrative micromanager who lacked military genius. In 1204, King Philip II of France outmanoeuvred John and captured Normandy—the ancestral homeland of the English aristocracy. Mocked by his barons as "John Softsword," John spent the next decade obsessively raising astronomical sums of money to finance an army to win Normandy back, pushing royal feudal taxation to breaking point.',
        },
        {
          act: 2,
          title: '4.2 The Papal Interdict & Extortion (1205–1213)',
          text: '<span class="para-ref">[4.2]</span> John’s financial desperation led him into a catastrophic feud with Pope Innocent III over who should appoint the next Archbishop of Canterbury. When John refused to accept Stephen Langton, the Pope placed England under an <strong>Interdict</strong> in 1208. For five agonizing years, church doors were locked, church bells fell silent, babies could not be baptized in church, and the dead were buried in unhallowed ditches. John retaliated by confiscating all church lands and revenues, pocketing over £100,000. In 1209, the Pope excommunicated John. To avoid a French invasion, John capitulated in 1213: he surrendered England as a papal fiefdom, agreeing to pay the Pope an annual tribute of 1,000 marks.',
        },
        {
          act: 3,
          title: '4.3 The Baronial Rebellion (1214–1215)',
          text: '<span class="para-ref">[4.3]</span> John’s gamble collapsed in July 1214 at the Battle of Bouvines in Flanders. John’s expensive coalition of mercenaries was smashed by the French king, and John’s dream of reconquering Normandy was permanently extinguished. When John returned to England demanding yet another crushing <strong>scutage</strong> tax from barons who had refused to fight in France, the aristocracy revolted. Led by Robert Fitzwalter—who styled himself "Marshal of the Army of God"—a coalition of northern and eastern barons renounced their feudal homage, marched south, and captured the city of London in May 1215. Cornered and bankrupt, John was forced to negotiate.',
          source: {
            letter: 'A',
            title: 'Source A: Matthew Paris, Chronicle Portrait of King John (c. 1250)',
            image: '/images/king_john_matthew_paris.jpg',
            caption:
              'Matthew Paris’s 13th-century manuscript depiction of King John tumbling backwards as his royal crown slips from his head.',
            source_context:
              'Matthew Paris, a monk of St Albans writing decades after John’s death, famously wrote: "Foul as it is, hell itself is defiled by the foul presence of King John."',
            how_useful_question:
              'How useful is Source A for an enquiry into how 13th-century chroniclers presented King John’s monarchical failures?',
            provenance_clues: [
              'Author: Matthew Paris, a Benedictine monk writing from St Albans Abbey.',
              'Audience: Monks, scholars, and future kings examining historical morality.',
              'Motive: To portray King John as a tyrannical, ungodly monarch who deserved his downfall.',
            ],
            hinge_question:
              'Hinge Question: Does Matthew Paris provide an objective assessment of John’s reign, or does his monastic hatred of royal taxation distort his historical interpretation?',
            citation: 'Matthew Paris • Chronica Majora / British Library (Royal MS 14 C VII).',
          },
        },
        {
          act: 4,
          title: '4.4 The Clauses of Runnymede (15 June 1215)',
          text: '<span class="para-ref">[4.4]</span> On 15 June 1215, in the water-meadow of <strong>Runnymede</strong> beside the River Thames near Windsor, King John met the armed rebel barons. John affixed the Great Seal of England to a parchment document comprising 63 revolutionary clauses: <strong>Magna Carta</strong> (The Great Charter). The charter curtailed royal autocracy: it stopped the king from seizing baronial lands, protected widows from forced remarriages, standardized weights and measures, and prohibited arbitrary taxation without baronial consent. Crucially, <strong>Clause 39</strong> established the foundational bedrock of English common law: <em>"No free man shall be seized or imprisoned... except by the lawful judgement of his equals or by the law of the land."</em>',
          source: {
            letter: 'B',
            title: 'Source B: Magna Carta: Verbatim Clauses 39 and 40 (1215)',
            image: '/images/magna_carta_1215.jpg',
            caption:
              'One of four surviving original exemplars of Magna Carta written in Latin on sheepskin parchment with royal wax seal cords.',
            source_context:
              'Sealed at Runnymede on 15 June 1215, Clauses 39 and 40 established the universal principle that royal power was subject to the rule of law.',
            how_useful_question:
              'How useful is Source B for an enquiry into whether Magna Carta established fundamental human rights or merely protected wealthy barons?',
            provenance_clues: [
              'Author: Chancery clerks under the joint direction of King John and the rebel barons.',
              'Audience: Sheriffs and courts across every English shire where the charter was publicly proclaimed.',
              'Motive: To legally bind the Crown to specific contractual limitations on arbitrary arrest and royal extortion.',
            ],
            hinge_question:
              'Hinge Question: In 1215, who counted as a "free man" under Clause 39, and what does this reveal about whether Magna Carta protected ordinary peasants?',
            citation: 'The British Library, London (Cotton MS Augustus II.106) • Parchment (1215).',
          },
        },
        {
          act: 5,
          title: '4.5 Civil War & The Myth of Liberty (1215–1225)',
          text: '<span class="para-ref">[4.5]</span> Magna Carta was not a peace treaty; it triggered immediate war. Pope Innocent III annulled the charter, and John waged a scorched-earth campaign against his barons. The barons invited Prince Louis of France to take the English throne, and French troops marched into London. John’s sudden death from dysentery at Newark in October 1216 saved the Plantagenet dynasty. John’s nine-year-old son was crowned <strong>King Henry III</strong>. Under the regency of the legendary knight William Marshal, the royal council reissued Magna Carta in 1216, 1217, and 1225 to win back baronial loyalty. Over the centuries, a document created by selfish feudal lords to protect their own bank balances was transformed into the global symbol of constitutional liberty and human rights.',
        },
      ],

      tasks: [
        {
          id: 'me_l4_q2_narrative_account',
          type: 'extended_writing',
          qNum: 2,
          topic: 'Question 2: Narrative Account [8 marks • 12 mins]',
          title: 'Question 2: Narrative Account [8 marks • 12 mins]',
          question:
            'Write a narrative account analysing the key events leading from the loss of Normandy (1204) to the sealing of Magna Carta (1215). [8 marks]',
          stimulus: [
            'The loss of Normandy and heavy scutage taxation',
            'The defeat at the Battle of Bouvines (1214)',
          ],
          hints: [
            'Point: Sequence begins with the collapse of the Angevin Empire: in 1204, King John lost Normandy to King Philip Augustus of France, stripping English barons of ancestral lands [4.1].',
            'Evidence: Following this, John spent a decade imposing eleven crushing scutage levies (shield money) and clashing with Pope Innocent III to finance an army to reconquer Normandy [4.1, 4.2].',
            'Explanation: A decisive turning point occurred in July 1214 at the Battle of Bouvines, where John’s lavishly funded continental coalition was crushed, leaving John bankrupt and militarily humiliated [4.3].',
            'Link: Consequently, northern barons led by Robert Fitzwalter renounced their homage, seized London, and cornered John at Runnymede in June 1215, forcing his seal onto Magna Carta and establishing Clause 39 [4.3, 4.4].',
          ],
          model_answer:
            'Initially, the sequence began in 1204 when King John suffered the humiliating loss of Normandy to King Philip Augustus of France. This disaster stripped English barons of their ancestral cross-Channel estates and provoked bitter resentment against the Crown. Determined to reconquer his lost duchy, John spent the next decade demanding unprecedented financial extortion, levying eleven crushing scutage taxes (shield money) in sixteen years, seizing church property during a five-year papal interdict, and abusing royal feudal wardship fines to amass a massive war chest.<br><br>Following this period of financial coercion, the decisive military turning point occurred in July 1214 at the Battle of Bouvines in Flanders. John’s lavishly funded continental coalition was catastrophically defeated by Philip Augustus. Bouvines destroyed John’s master strategy in a single afternoon: John returned to England completely bankrupt, militarily discredited, and stripped of royal prestige, with nothing to show for over £130,000 of extorted funds.<br><br>Consequently, rebellious northern barons (the "Northerners") seized the moment of royal weakness. In May 1215, led by Robert Fitzwalter styling himself "Marshal of the Army of God," the rebel barons renounced their feudal homage and marched into London, winning the financial and military support of the capital’s wealthy merchant oligarchy. Completely isolated and devoid of military leverage, King John was forced to agree to negotiations beside the River Thames at Runnymede. On 15 June 1215, John pressed his Great Seal onto the parchment of Magna Carta, conceding Clause 39 and agreeing that royal power was permanently subject to the rule of law.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry deconstructs the popular myth of Magna Carta. Challenge pupils to interrogate whether the charter was a modern manifesto of freedom or a medieval trade union agreement for 25 disgruntled barons. Emphasise Clause 39 as the pivot point where feudal self-interest inadvertently created constitutional law.',
        objectives: [
          {
            objective:
              'Explain the financial and military pressures that pushed the barons into rebellion.',
            primer:
              'Direct pupils to paragraphs [4.1]–[4.3]. Highlight John’s loss of Normandy, papal interdict, and Bouvines defeat.',
            question:
              'Hinge Question: Was John an unusually evil king, or an unlucky administrator struggling to finance modern warfare on an outdated feudal budget?',
          },
          {
            objective:
              'Evaluate the dual nature of Magna Carta: feudal self-interest versus constitutional legacy.',
            primer:
              'Examine Clause 39 in Act 4.4 and contrast medieval "free men" against the bonded serfs.',
            question:
              'Hinge Question: Can a document written by selfish barons to protect their tax exemptions still be considered the birth of modern human rights?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'What ancestral continental territory did King John lose to France in 1204?',
          options: ['Brittany', 'Gascony', 'Normandy', 'Aquitaine'],
          answer: 'Normandy',
        },
        {
          question: 'Where beside the River Thames did King John seal Magna Carta in June 1215?',
          options: ['Westminster', 'Oxford', 'Canterbury', 'Runnymede'],
          answer: 'Runnymede',
        },
        {
          question:
            'Which famous clause guaranteed that no free man would be imprisoned without lawful judgement?',
          options: ['Clause 12', 'Clause 39', 'Clause 1', 'Clause 63'],
          answer: 'Clause 39',
        },
        {
          question: 'What did Pope Innocent III do to Magna Carta within ten weeks of its sealing?',
          options: [
            'He annulled it as null and void',
            'He translated it into Latin',
            'He blessed it in Rome',
            'He crowned King John Emperor',
          ],
          answer: 'He annulled it as null and void',
        },
      ],

      flashcards: [
        {
          term: 'Magna Carta',
          definition: 'The Great Charter of 1215 placing monarchical power under the rule of law.',
        },
        {
          term: 'Scutage',
          definition:
            'Shield money paid by feudal barons to the monarch in place of military service.',
        },
        {
          term: 'Habeas Corpus',
          definition:
            'The legal principle that a person cannot be detained without lawful cause and trial.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 5: The Black Death (1348) & The Peasants’ Revolt (1381)
    // ------------------------------------------------------------------------
    {
      id: 'lesson_5',
      title:
        'The Black Death (1348) & The Peasants’ Revolt (1381): How did plague and rebellion shatter feudalism?',
      enquiry:
        'How did the demographic shock of the Black Death lead to the peasant uprising of 1381?',
      subtitle: 'Yersinia Pestis, The Statute of Labourers, and the Storming of London',
      skill: 'Causal Links & Socio-Economic Change',
      card_image: '/images/black_death.jpg',
      card_position: 'center 20%',
      banner: {
        image: '/images/plague_burial.jpg',
        position: 'center 30%',
        caption:
          'Citizens of Tournai burying plague victims in communal coffins during the Black Death of 1348–1349, depicted in the contemporary chronicle of Gilles li Muisis.',
      },
      margin_spine: [
        { year: '1348–50', label: '5.1 Black Death Arrives' },
        { year: '1351', label: '5.2 Statute of Labourers' },
        { year: '1377–81', label: '5.3 Poll Tax Sparks' },
        { year: 'June 1381', label: '5.4 March on London' },
        { year: 'June 1381', label: '5.5 Smithfield Betrayal' },
      ],
      causal_domino_spine: {
        title: 'The Black Death & The Peasants’ Revolt (1348–1381)',
        subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
        stages: [
          {
            step: 1,
            date: '1348–1349',
            title: 'Arrival of the Plague at Melcombe Regis',
            actor: 'Yersinia pestis & The English Population',
            tag: '💀 THE BLACK DEATH',
            trigger:
              'In the summer of 1348, a merchant vessel docked at Melcombe Regis carrying bubonic plague, which spread rapidly across England and killed 35–50% of the population.',
            connective:
              'Decimated agricultural villages, emptied manors, and created an acute, unprecedented national labour shortage across the feudal countryside.',
            question: 'How did the Black Death wipe out nearly half the population of England?',
          },
          {
            step: 2,
            date: '1349–1351',
            title: 'Labour Shortage & The Economic Revolution',
            actor: 'Surviving Peasants & Landlords',
            tag: '🌾 PEASANT LEVERAGE',
            trigger:
              'With fields left unploughed and crops rotting, surviving serfs and day-labourers discovered they could demand double wages or abandon their feudal manors.',
            connective:
              'Permanently weakened the economic grip of feudal landlords, giving ordinary peasants unprecedented bargaining power and social mobility.',
            question: 'Why did demographic collapse trigger an unprecedented economic power shift?',
          },
          {
            step: 3,
            date: '1351–1377',
            title: 'The Statute of Labourers & Sumptuary Resistance',
            actor: 'The Royal Parliament & Defiant Workers',
            tag: '⚖️ STATUTE OF LABOURERS',
            trigger:
              'Parliament passed the 1351 Statute of Labourers to freeze wages at pre-plague rates and enacted sumptuary laws to forbid peasants from wearing fine fabrics.',
            connective:
              'Provoked bitter generational class resentment among rural workers, who defied the wage caps and forged underground networks of mutual resistance.',
            question:
              'How did the Statute of Labourers and sumptuary laws provoke bitter class resentment?',
          },
          {
            step: 4,
            date: '1377–1381',
            title: 'The Regressive Poll Taxes & Brentwood Spark',
            actor: 'King Richard II, John Bampton & Essex Villagers',
            tag: '🔥 POLL TAX UPRISING',
            trigger:
              'To finance the costly Hundred Years’ War, Parliament imposed three regressive Poll Taxes, forcing impoverished peasants to pay the exact same twelve pence as wealthy lords.',
            connective:
              'Ignited armed insurrection when villagers drove royal tax collector John Bampton out of Brentwood, sparking a coordinated march on London.',
            question:
              'Why did the regressive Poll Taxes of 1377–1381 spark armed peasant uprising?',
          },
          {
            step: 5,
            date: 'June 1381',
            title: 'Showdown at Smithfield & The End of Serfdom',
            actor: 'Wat Tyler, Preacher John Ball & King Richard II',
            tag: '🪓 THE PEASANTS’ REVOLT',
            trigger:
              'Thousands of rebels stormed London, burning tax rolls and confronting fourteen-year-old King Richard II at Smithfield, where Wat Tyler was killed by the Mayor.',
            connective:
              'Although Richard revoked his promises of freedom, Parliament abandoned future Poll Taxes, and serfdom withered away over the next century.',
            question:
              'How did the showdown at Smithfield shatter the myth of unquestioned feudal authority?',
          },
        ],
      },
      did_you_know:
        'During the Peasants’ Revolt, rebels stormed the Tower of London and found the Archbishop of Canterbury, Simon of Sudbury, praying in the royal chapel. Blaming him for the poll tax, they dragged him to Tower Hill and beheaded him with eight blows of an axe. His mummified skull is still preserved in a display case at St Gregory’s Church in Suffolk!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'In what year was Magna Carta sealed at Runnymede?',
            answer: '1215.',
          },
          {
            question: 'What term describes unfree medieval peasants tied to a lord’s manor?',
            answer: 'Serfs (villeins).',
          },
          {
            question: 'What bacterium carried by rat fleas caused the Black Death?',
            answer: 'Yersinia pestis.',
          },
          {
            question:
              'What flat tax levied equally on every individual head sparked rebellion in 1381?',
            answer: 'The Poll Tax.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Demography',
          definition:
            'The study of population size, density, distribution, and mortality shifts over time.',
          phonetic: 'dih-MOG-ruh-fee',
          syllables: 'De-mog-ra-phy',
          tier: '3',
        },
        {
          term: 'Statute of Labourers',
          definition:
            'A 1351 royal law freezing agricultural wages at pre-plague rates and punishing mobile workers.',
          phonetic: 'STAT-yoot uv LAY-ber-ers',
          syllables: 'Stat-ute of La-bour-ers',
          tier: '3',
        },
        {
          term: 'Serfdom',
          definition: 'The hereditary legal bondage of peasants tied to a lord’s manorial estate.',
          phonetic: 'SURF-dum',
          syllables: 'Serf-dom',
          tier: '3',
        },
        {
          term: 'Poll Tax',
          definition:
            'A flat tax levied equally on every individual person over fourteen regardless of income.',
          phonetic: 'POHL TAKS',
          syllables: 'Poll Tax',
          tier: '3',
        },
        {
          term: 'Insurrection',
          definition:
            'A violent, organized uprising by citizens against established government authority.',
          phonetic: 'in-suh-REK-shun',
          syllables: 'In-sur-rec-tion',
          tier: '3',
        },
      ],

      narrative_blocks: [
        {
          act: 1,
          title: '5.1 The Black Death Catastrophe (1348–1350)',
          text: '<span class="para-ref">[5.1]</span> In the summer of 1348, a merchant ship from Gascony docked at Melcombe Regis in Dorset, carrying a lethal microscopic passenger: <em>Yersinia pestis</em>—the <strong>Black Death</strong>. Spreading through fleas on black rats and airborne respiratory droplets, the bubonic and pneumonic plagues swept across England with terrifying speed. Victims developed agonizing black swellings (buboes) in the groin and armpits, coughed black blood, and died within three days. By 1350, between 35% and 50% of England’s entire population had perished. Fields lay unharvested, cattle roamed through abandoned villages, and mass communal burial pits were dug outside city walls. The demographic foundations of feudalism had been shattered.',
        },
        {
          act: 2,
          title: '5.2 The Shifting Economic Balance (1351)',
          text: '<span class="para-ref">[5.2]</span> The catastrophic death toll triggered an unprecedented socio-economic revolution. With half the workforce dead, surviving agricultural labourers discovered the immense power of supply and demand: landlords were desperate for workers to harvest crops before they rotted. Peasants began demanding double or triple their pre-plague wages, and bonded <strong>serfs</strong> simply walked off estates to work for higher-paying lords. Terrified of losing their social supremacy, the landowner-dominated Parliament passed the emergency <strong>Statute of Labourers</strong> in 1351. The law ordered that wages be frozen at 1346 rates, banned peasants from leaving their villages, and ordered that workers demanding higher pay be branded on the forehead with the letter "F" (for Falsity). The statute generated bitter working-class resentment that festered for three decades.',
          source: {
            letter: 'A',
            title: 'Source A: The Statute of Labourers Parliamentary Statute Extract (1351)',
            image: '/images/black_death.jpg',
            caption:
              'Parliamentary parchment statute passed under King Edward III ordering that all farm labourers must work for the old 1346 wages on pain of imprisonment.',
            source_context:
              'Passed in 1351, this royal statute illustrates the desperate attempts of English landowners to legally suppress the economic empowerment of post-plague peasants.',
            how_useful_question:
              'How useful is Source A for an enquiry into the economic grievances of English peasants after the Black Death?',
            provenance_clues: [
              'Author: Landowner-dominated Parliament acting to protect aristocratic profits.',
              'Audience: Justices of the peace, sheriffs, and manorial lords across England.',
              'Motive: To force peasants back into feudal submission and suppress market wage increases.',
            ],
            hinge_question:
              'Hinge Question: Why did the Statute of Labourers fail in practice, and how did it pave the way for rebellion thirty years later?',
            citation: 'Statutes of the Realm, 25 Edward III (1351) • The National Archives, Kew.',
          },
        },
        {
          act: 3,
          title: '5.3 The Sparks of Rebellion: The Poll Taxes (1377–1381)',
          text: '<span class="para-ref">[5.3]</span> The simmering tension exploded during the reign of fourteen-year-old King Richard II. To fund the expensive, disastrous Hundred Years’ War in France, Parliament levied three successive <strong>Poll Taxes</strong> in 1377, 1379, and 1381. Unlike traditional taxes assessed on wealth or land, the 1381 poll tax demanded twelve pence (one shilling) from every person over the age of fifteen—equivalent to two weeks’ hard agricultural wages for an impoverished peasant. Widespread tax evasion followed: over 450,000 taxpayers vanished from official lists. When royal commissioner John Bampton rode into Brentwood in Essex on 30 May 1381 to investigate tax dodgers, angry villagers drove him out with bows and arrows. The Peasants’ Revolt had begun.',
        },
        {
          act: 4,
          title: '5.4 The March on London (June 1381)',
          text: '<span class="para-ref">[5.4]</span> Rebellion spread like wildfire across Essex, Kent, and East Anglia. The rebels found two formidable leaders: <strong>Wat Tyler</strong>, an experienced Kentish soldier, and <strong>John Ball</strong>, a radical renegade priest who preached human equality: <em>"When Adam delved and Eve span, who was then the gentleman?"</em> On 13 June 1381, over 30,000 peasants converged on London. Sympathetic London apprentices opened the city gates. The rebels burned down the Savoy Palace of John of Gaunt (the King’s despised uncle), threw open the prisons, and stormed the Tower of London. They dragged out Archbishop Simon of Sudbury and Treasurer Robert Hales, beheading them on Tower Hill.',
          source: {
            letter: 'B',
            title: 'Source B: Jean Froissart: The Death of Wat Tyler at Smithfield (c. 1380s)',
            image: '/images/death_wat_tyler_smithfield.jpg',
            caption:
              'Illumination showing Mayor William Walworth slashing Wat Tyler on his horse while young King Richard II rides forward to calm the rebel peasant army.',
            source_context:
              'Jean Froissart, an aristocratic French chronicler, wrote for the royal court and viewed the peasant rebels as dangerous, lawless savages.',
            how_useful_question:
              'How useful is Source B for an enquiry into how the royal court viewed and resolved the Peasants’ Revolt?',
            provenance_clues: [
              'Author: Jean Froissart, court chronicler with deep aristocratic bias against working-class rebels.',
              'Audience: European nobility and monarchs concerned with crushing peasant insurrections.',
              'Motive: To depict King Richard II as a brave, divine hero and Wat Tyler as an arrogant traitor.',
            ],
            hinge_question:
              'Hinge Question: Was Richard II’s promise of freedom at Smithfield a genuine act of youthful mercy or calculated political deceit?',
            citation: 'Jean Froissart • Chroniques (c. 1380s) / British Library (Royal MS 18 E I).',
          },
        },
        {
          act: 5,
          title: '5.5 Confrontation at Smithfield & The Legacy of Serfdom (1381)',
          text: '<span class="para-ref">[5.5]</span> On 15 June 1381, King Richard II agreed to meet Wat Tyler in open ground at <strong>Smithfield</strong>. Riding forward alone, Tyler boldly demanded the total abolition of <strong>serfdom</strong>, the confiscation of church property, and that all men be equal under the King. An argument erupted with the King’s retinue; the Mayor of London, William Walworth, drew his cutlass and slashed Tyler across the neck. As Tyler fell dying, the furious peasant army drew their bows. In a moment of sheer courage, fourteen-year-old Richard II spurred his horse directly toward the rebels, shouting: <em>"I am your King and your leader! Follow me!"</em> He led them to Clerkenwell Fields and promised them pardons and charters of freedom. But once the peasants disbanded and went home, the King ruthlessly revoked all charters, declaring: <em>"Serfs you were, and serfs you shall remain."</em> Over 1,500 rebels were hunted down and hanged. Yet despite the bloody retribution, Parliament never dared pass another poll tax, and within a century, serfdom died out completely across England.',
        },
      ],

      tasks: [
        {
          id: 'me_l5_q5_evaluative_essay',
          type: 'extended_writing',
          qNum: 5,
          topic: 'Question 5: Evaluative Statement Essay [12 marks • 15 mins]',
          title: 'Question 5: Evaluative Statement Essay [12 marks • 15 mins]',
          question:
            '‘The Black Death of 1348 was the main cause of the breakdown of the feudal system in medieval England.’ How far do you agree? [12 marks]',
          stimulus: [
            'The demographic collapse and labour shortage caused by the Black Death (1348–1350)',
            'The 1351 Statute of Labourers and the Peasants’ Revolt of 1381',
          ],
          hints: [
            'Point: State your thesis: evaluate whether biological demographic collapse (Black Death 1348) or political peasant resistance (1381 Peasants’ Revolt) was the primary cause of feudal breakdown [5.1, 5.5].',
            'Evidence (Plague & Economic Leverage): Between 1348 and 1350, Yersinia pestis wiped out 40–50% of England’s population, triggering an acute labour shortage where crops rotted and manorial lords were forced to pay competitive cash wages [5.1, 5.2].',
            'Explanation (Repression & Social Rebellion): In response, the ruling elite attempted to freeze wages via the 1351 Statute of Labourers and extract money through regressive Poll Taxes, sparking explosive armed rebellion in 1381 led by Wat Tyler and John Ball [5.3, 5.4].',
            'Link (Comparative Verdict): Conclude with a sustained judgment: the plague created irreversible economic conditions for free wage labour, but the 1381 revolt broke the political resolve of lords to enforce serfdom [5.1–5.5].',
          ],
          model_answer:
            'To a large extent, the Black Death of 1348 was the foundational catalyst for the collapse of feudalism, although political resistance during the Peasants’ Revolt of 1381 was necessary to seal its demise.<br><br>On the one hand, the Black Death dealt an insurmountable biological shock to the feudal economy. Between 1348 and 1350, bubonic plague wiped out nearly half of England’s population. This demographic catastrophe triggered an acute labour shortage: with fields unploughed and harvests rotting, surviving peasants possessed unprecedented economic bargaining leverage. In defiance of feudal tradition, villeins demanded cash wages, lower rents, and the freedom to move to rival estates offering higher pay. Although the ruling elite attempted to restore feudal control through the 1351 Statute of Labourers and sumptuary laws, the inexorable economic reality of supply and demand rendered serfdom increasingly unenforceable.<br><br>On the other hand, the feudal system did not crumble through economic forces alone; armed political rebellion by ordinary peasants proved decisive. When royal governments attempted to finance the Hundred Years’ War through repeated, regressive Poll Taxes, simmering peasant fury erupted into the Peasants’ Revolt of 1381. Led by Wat Tyler and inspired by John Ball’s egalitarian sermons, thousands of rebels stormed London, burned tax rolls in the Savoy Palace, and demanded the immediate abolition of serfdom. While King Richard II brutally executed over 1,500 rebels after Smithfield, the ruling elite was thoroughly traumatised. Parliament never dared levy another poll tax, and landlords quietly abandoned compulsory feudal labour services in favour of paid tenancies.<br><br>In conclusion, while the Black Death supplied the underlying economic death blow to serfdom by making labour scarce, the Peasants’ Revolt of 1381 shattered the political will of the aristocracy to maintain feudal bondage.',
        },
      ],

      teacher_notes: {
        primer:
          'This capstone enquiry traces the economic and social chain reaction from the biological shock of the Black Death (1348) to the political explosion of the Peasants’ Revolt (1381). Challenge pupils to connect demographic scarcity with wage inflation, royal repression (Statute of Labourers), and tax resistance.',
        objectives: [
          {
            objective:
              'Explain the economic chain reaction connecting the Black Death to the labour crisis.',
            primer:
              'Direct pupils to paragraphs [5.1]–[5.2]. Emphasise supply and demand: half the workers dead = higher wages.',
            question:
              'Hinge Question: Why did the Black Death empower ordinary peasant workers when kings and bishops remained in power?',
          },
          {
            objective: 'Evaluate whether the Peasants’ Revolt was a failure or long-term success.',
            primer:
              'Contrast Tyler’s execution in paragraph [5.5] with the permanent death of poll taxes and serfdom.',
            question:
              'Hinge Question: If Richard II broke all his promises, why did serfdom still disappear from England within a century of the revolt?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'In what year did the Black Death first arrive in England?',
          options: ['1348', '1381', '1066', '1215'],
          answer: '1348',
        },
        {
          question: 'What 1351 royal law attempted to freeze peasant wages at pre-plague rates?',
          options: [
            'Magna Carta',
            'The Poor Law',
            'The Constitutions of Clarendon',
            'The Statute of Labourers',
          ],
          answer: 'The Statute of Labourers',
        },
        {
          question: 'What despised tax sparked the rebellion in Brentwood, Essex in 1381?',
          options: ['Scutage', 'Ship Money', 'The Poll Tax', 'Window Tax'],
          answer: 'The Poll Tax',
        },
        {
          question: 'Where was Wat Tyler killed by the Mayor of London in June 1381?',
          options: ['Tower Hill', 'Smithfield', 'Runnymede', 'Westminster'],
          answer: 'Smithfield',
        },
      ],

      flashcards: [
        {
          term: 'Statute of Labourers',
          definition:
            'A 1351 law attempting to freeze wages at pre-plague rates and punish mobile workers.',
        },
        {
          term: 'Poll Tax',
          definition:
            'A regressive flat tax levied equally on every individual person regardless of income.',
        },
        {
          term: 'Serfdom',
          definition: 'The hereditary legal bondage of peasants tied to a lord’s manorial estate.',
        },
      ],
    },
  ],
};

export default unitData;
