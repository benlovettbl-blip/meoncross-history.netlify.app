const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'units', 'medieval_england', 'data.js');

const medievalData = `/**
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
      dual_coding_prompt: 'Draw a Norman cavalry broadsword clashing with an Anglo-Saxon battle-axe.',
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
      dual_coding_prompt: 'Draw a royal parchment scroll with a royal wax seal dangling from ribbons.',
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
      subtitle: 'From the Succession Crisis of Edward the Confessor to the Shield Wall at Senlac Hill',
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
      did_you_know:
        'William of Normandy was known across Europe as "William the Bastard" because his parents were unmarried. At Hastings, when rumors spread that William was slain, he ripped off his iron helmet in the thick of battle and roared: "Look at me! I live, and with God’s help I shall conquer!"',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'Which people conquered Britain in AD 43, establishing paved roads and fortified towns?',
            answer: 'The Romans.',
          },
          {
            question: 'What Germanic tribes migrated to Britain after the collapse of Roman rule in AD 410?',
            answer: 'The Anglo-Saxons (Angles, Saxons, and Jutes).',
          },
          {
            question: 'What Viking kingdom covered northern and eastern England following the 9th-century invasions?',
            answer: 'The Danelaw.',
          },
          {
            question: 'What council of English nobles and bishops advised Anglo-Saxon kings on royal succession?',
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
          definition: 'A well-trained, professional Anglo-Saxon warrior armed with a heavy two-handed battleaxe.',
          phonetic: 'HOWS-kahrl',
          syllables: 'House-carl',
          tier: '3',
        },
        {
          term: 'Fyrd',
          definition: 'The part-time Anglo-Saxon peasant militia called up to fight in national emergencies.',
          phonetic: 'FEERD',
          syllables: 'Fyrd',
          tier: '3',
        },
        {
          term: 'Feigned Retreat',
          definition: 'A deliberate military trick where soldiers fake panic and run away to lure enemies out of formation.',
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
            title: 'Source A: The Bayeux Tapestry: Harold Swearing the Sacred Oath to William (c. 1070s)',
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
            title: 'Source B: The Bayeux Tapestry: Death of King Harold & Flight of the Saxons (1066)',
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
          type: 'short_answer',
          act: 1,
          qNum: 1,
          text: 'Why did the death of Edward the Confessor trigger a national succession crisis in January 1066?',
          starter: 'Edward the Confessor’s death triggered a crisis because...',
          answer:
            'Edward died childless without leaving a direct heir, leaving rival claimants with blood, oaths, or military power to contest the throne.',
          model_answer:
            'Edward the Confessor died without leaving a direct heir, creating a power vacuum. While the Anglo-Saxon Witan elected Harold Godwinson, rival foreign rulers claimed prior promises and military legitimacy, sparking an international invasion crisis.',
        },
        {
          type: 'short_answer',
          act: 3,
          qNum: 2,
          text: 'Explain how King Harold’s victory at Stamford Bridge weakened his defence against William at Hastings.',
          starter: 'Harold’s victory at Stamford Bridge weakened him because...',
          answer:
            'Harold lost many elite housecarls fighting Hardrada, and his men had to force-march 250 miles south in two weeks, leaving them physically exhausted.',
          model_answer:
            'Harold’s victory at Stamford Bridge proved costly: his finest housecarls suffered heavy casualties, and his surviving men had to endure a gruelling 250-mile forced march south, entering the Battle of Hastings severely fatigued.',
        },
        {
          type: 'short_answer',
          act: 5,
          qNum: 3,
          text: 'Describe how the Norman tactic of the "feigned retreat" broke the Anglo-Saxon shield wall.',
          starter: 'The feigned retreat broke the shield wall by...',
          answer:
            'Norman cavalry pretended to flee downhill, tempting undisciplined Saxon militia to break ranks, whereupon the cavalry wheeled around and slaughtered them.',
          model_answer:
            'The feigned retreat deceived the Saxon fyrd into believing the Normans were fleeing in panic. When inexperienced English fighters broke rank to pursue them downhill, Norman cavalry encircled them on open ground, opening lethal gaps in the shield wall.',
        },
        {
          type: 'source_utility',
          qNum: 4,
          source_letter: 'B',
          text: 'How useful is Source B for an enquiry into why William won the Battle of Hastings?',
          starter: 'Source B is useful because it visually demonstrates...',
          model_answer:
            'Source B is exceptionally useful because it provides contemporary visual evidence of the clash between Norman heavy cavalry and the disintegrating Anglo-Saxon shield wall. It highlights how mounted knights armed with lances overwhelmed foot soldiers once the defensive formation broke. However, its utility is shaped by its provenance: commissioned by the conquerors, it glorifies Norman martial prowess while ignoring William’s immense good fortune and Harold’s exhausted troops.',
        },
        {
          type: 'extended_writing',
          qNum: 5,
          text: 'Enquiry Essay: "William won the Battle of Hastings purely because of superior military tactics." How far do you agree?',
          guidance:
            'Structure a balanced argument: evaluate Norman cavalry and the feigned retreat on the one hand, versus Harold’s exhaustion, bad luck, and Stamford Bridge casualties on the other.',
          model_answer:
            'While Norman military tactics were vital, William’s victory was equally driven by Harold’s severe exhaustion and strategic misfortune.\\n\\nOn the one hand, William demonstrated tactical flexibility. Unlike the static Saxon army, William commanded a combined-arms force of archers, heavy infantry, and mounted cavalry. When frontal charges failed to crack the shield wall, William deployed the feigned retreat, exploiting Saxon lack of discipline to break their defensive perimeter.\\n\\nOn the other hand, Harold was defeated by circumstance and fatigue. Harold had been forced to fight Harald Hardrada at Stamford Bridge in Yorkshire, losing elite housecarls before marching 250 miles south in October. His men were physically depleted, and had Harold waited in London to gather reinforcements, the outcome may have differed.\\n\\nIn conclusion, tactics unlocked the shield wall, but Harold’s exhaustion created the vulnerability William exploited.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry establishes the foundational geopolitical crisis of 1066. Ground pupils in the succession void left by Edward the Confessor before examining the mechanics of Senlac Hill. Emphasise that the shield wall was nearly impenetrable until the feigned retreat broke Saxon discipline.',
        objectives: [
          {
            objective: 'Assess the rival claims to the English throne in 1066.',
            primer: 'Guide pupils through paragraph [1.2]. Contrast election by the Witan against William’s claimed holy relic oath.',
            question: 'Hinge Question: If bloodline succession was not legally established in 1066, what gave a medieval claimant true legitimacy: election, oaths, or military force?',
          },
          {
            objective: 'Explain the tactical turning points of the Battle of Hastings.',
            primer: 'Contrast Harold’s static shield wall against William’s combined-arms tactics and feigned retreat in paragraphs [1.4] and [1.5].',
            question: 'Hinge Question: Why did the feigned retreat succeed against the Anglo-Saxon fyrd when frontal cavalry charges had failed all morning?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'Who died in January 1066 without leaving an heir to the English throne?',
          options: ['Edward the Confessor', 'William the Conqueror', 'Alfred the Great', 'Harold Godwinson'],
          answer: 'Edward the Confessor',
        },
        {
          question: 'Where did Harold Godwinson crush Harald Hardrada’s Viking invasion army?',
          options: ['Stamford Bridge', 'Hastings', 'Fulford', 'Pevensey'],
          answer: 'Stamford Bridge',
        },
        {
          question: 'What military formation did Anglo-Saxon housecarls form at the crest of Senlac Hill?',
          options: ['The Shield Wall', 'The Flying Wedge', 'The Roman Square', 'The Phalanx'],
          answer: 'The Shield Wall',
        },
        {
          question: 'What tactical trick did Duke William use to lure the English downhill?',
          options: ['The Feigned Retreat', 'Poisoned Wells', 'Night Ambush', 'Smoke Screens'],
          answer: 'The Feigned Retreat',
        },
      ],

      flashcards: [
        {
          term: 'Witan',
          definition: 'The council of Anglo-Saxon nobles and bishops who held the power to elect the king.',
        },
        {
          term: 'Housecarl',
          definition: 'A professional, full-time Anglo-Saxon warrior armed with a heavy two-handed battleaxe.',
        },
        {
          term: 'Feigned Retreat',
          definition: 'A deliberate military trick where soldiers fake panic and run away to lure enemies out of position.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 2: Castles, Terror & Domesday: How did William control England?
    // ------------------------------------------------------------------------
    {
      id: 'lesson_2',
      title: 'Castles, Terror & Domesday: How did the Normans subjugate England?',
      enquiry: 'How did a minority Norman elite of fewer than 10,000 soldiers control two million hostile Anglo-Saxons?',
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
          definition: 'The act of bringing a conquered population under total, permanent military and political control.',
          phonetic: 'sub-joo-GAY-shun',
          syllables: 'Sub-ju-ga-tion',
          tier: '3',
        },
        {
          term: 'Motte-and-Bailey',
          definition: 'An early Norman timber fortress with a raised earth mound (motte) and palisaded courtyard (bailey).',
          phonetic: 'MOT-and-BAY-lee',
          syllables: 'Motte-and-Bai-ley',
          tier: '3',
        },
        {
          term: 'Castellan',
          definition: 'A trusted Norman governor appointed by the king to garrison and command a fortress.',
          phonetic: 'KAS-tuh-lun',
          syllables: 'Cas-tel-lan',
          tier: '3',
        },
        {
          term: 'Harrying',
          definition: 'The systematic burning of crops, destruction of villages, and slaughter of livestock to exterminate resistance.',
          phonetic: 'HAR-ee-ing',
          syllables: 'Har-ry-ing',
          tier: '3',
        },
        {
          term: 'Domesday Book',
          definition: 'The comprehensive land and property audit ordered by William I in 1086 to assess national taxable wealth.',
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
            'Slide to compare the Norman Keep architectural footprint against modern aerial Solent topography. Observe how Norman engineers placed a formidable four-storey stone keep directly inside the 3rd-century Roman Saxon Shore walls, repurposing ancient coastal defences to command Portsmouth Harbour and guard vital maritime supply lines to Normandy.',
          before_image: '/images/portchester_keep.jpg',
          before_label: 'Norman Stone Keep & Inner Bailey',
          after_image: '/images/portchester_seawards.jpg',
          after_label: 'Modern Aerial Solent & Sea Approaches',
          satellite_image: '/images/portchester_castle.jpg',
          satellite_label: 'Full Aerial Roman & Norman Enclosure',
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
          type: 'short_answer',
          act: 2,
          qNum: 1,
          text: 'Why did motte-and-bailey castles allow a tiny Norman minority to police an entire English district?',
          starter: 'Motte-and-bailey castles allowed Normans to police districts because...',
          answer:
            'They could be built in under two weeks using forced labour, gave 360-degree arrow sightlines, and housed mounted knights who could ride out to crush local uprisings within hours.',
          model_answer:
            'Motte-and-bailey castles served as impregnable regional police stations. Built in under two weeks using forced Saxon labour, their elevated keeps gave archers 360-degree sightlines, while a small garrison of thirty mounted knights could ride out rapidly to extinguish spontaneous Saxon rebellions.',
        },
        {
          type: 'short_answer',
          act: 3,
          qNum: 2,
          text: 'What was the purpose and human consequence of the Harrying of the North (1069–1070)?',
          starter: 'The purpose of the Harrying was... and the consequence was...',
          answer:
            'The purpose was to destroy northern rebellion through terror; the consequence was 100,000 civilian deaths from artificial famine and decades of depopulation.',
          model_answer:
            'The purpose was to terrorize northern rebels and eliminate any possibility of future resistance. By systematically burning crops, smashing farming tools, and salting soil, William triggered an artificial famine that caused 100,000 deaths and left Yorkshire largely desolate for decades.',
        },
        {
          type: 'short_answer',
          act: 5,
          qNum: 3,
          text: 'How does the surviving physical architecture at Portchester Castle prove Norman strategic priorities?',
          starter: 'Portchester Castle demonstrates Norman priorities because...',
          answer:
            'It shows how Normans repurposed Roman coastal fortresses with high stone keeps to command Portsmouth Harbour and secure sea supply routes back to Normandy.',
          model_answer:
            'Portchester Castle demonstrates that the Normans prioritized securing maritime communication with their homeland. By embedding a colossal stone keep inside existing Roman fort walls, they established an impregnable naval bastion commanding Portsmouth Harbour and the Solent.',
        },
        {
          type: 'source_utility',
          qNum: 4,
          source_letter: 'B',
          text: 'How useful is Source B (Domesday Book) for an enquiry into the impact of the Norman Conquest on English society?',
          starter: 'Source B is exceptionally useful because...',
          model_answer:
            'Source B is exceptionally useful because it provides verbatim, quantitative administrative evidence showing the total transfer of wealth from Anglo-Saxon thegns to Norman barons. It records every plough, mill, and woodland pig, demonstrating the invasive surveillance used by the Crown to extract taxation. However, as an exchequer ledger, it records only economic value and landowner names, omitting the human suffering, dispossession, and bonded serfdom endured by ordinary English peasants.',
        },
        {
          type: 'extended_writing',
          qNum: 5,
          text: 'Enquiry Essay: "Castles were more important than terror or the Domesday Book in establishing Norman control over England." How far do you agree?',
          guidance:
            'Evaluate the physical role of 500 motte-and-bailey castles on the one hand, versus psychological terror (Harrying of the North) and bureaucratic surveillance (Domesday) on the other.',
          model_answer:
            'While castles provided the indispensable physical frontline of control, Norman subjugation was achieved only through the combined triad of military architecture, psychological terror, and fiscal surveillance.\\n\\nOn the one hand, castles were the immediate foundation of conquest. Erecting over 500 timber motte-and-bailey castles across England in twenty years allowed small garrisons of mounted knights to dominate local shires. Castles acted as physical fortresses, administrative prisons, and psychological symbols of foreign dominance.\\n\\nOn the other hand, architecture alone was insufficient to extinguish northern rebellion. The Harrying of the North deployed deliberate state terror and artificial famine, starving 100,000 civilians to render resistance impossible. Furthermore, permanent control required the 1086 Domesday Book, which disinherited over 80% of English thegns, transferring land to 200 Norman barons and binding them to the Crown through feudal tenure.\\n\\nIn conclusion, castles held the land physically, terror broke the will to resist, and Domesday institutionalised Norman power permanently.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry challenges pupils to explain how a tiny foreign military elite achieved permanent subjugation. Structure the lesson around three pillars: physical architecture (castles), psychological terror (Harrying of the North), and fiscal surveillance (Domesday). Ground the lesson locally in Portchester Castle and Hampshire Domesday manors.',
        objectives: [
          {
            objective: 'Explain how motte-and-bailey castles functioned as weapons of subjugation.',
            primer: 'Direct pupils to paragraphs [2.1]–[2.2]. Emphasise the speed of construction and cavalry strike range.',
            question: 'Hinge Question: Was a motte-and-bailey castle primarily a defensive shelter for knights, or an offensive weapon of terror designed to control the surrounding population?',
          },
          {
            objective: 'Analyse the significance of the Domesday audit in disinheriting the English.',
            primer: 'Guide pupils through paragraph [2.4] and the Portchester/Fareham Domesday extract in Act 2.5.',
            question: 'Hinge Question: Why was a parchment book recording pigs, mills, and hides more dangerous to Anglo-Saxon independence than an army of Norman knights?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'Roughly how many Norman soldiers invaded England in 1066 to rule over 2 million people?',
          options: ['Fewer than 10,000', 'Over 100,000', 'Roughly 50,000', 'Fewer than 1,000'],
          answer: 'Fewer than 10,000',
        },
        {
          question: 'What was the artificial earthen mound of a Norman castle called?',
          options: ['The Motte', 'The Bailey', 'The Palisade', 'The Barbican'],
          answer: 'The Motte',
        },
        {
          question: 'What campaign did William carry out in the winter of 1069–1070?',
          options: ['The Harrying of the North', 'The Barons’ War', 'The Peasant Crusade', 'The Pilgrimage of Grace'],
          answer: 'The Harrying of the North',
        },
        {
          question: 'What great survey of English land and wealth did William commission in 1085–1086?',
          options: ['The Domesday Book', 'Magna Carta', 'The Constitutions of Clarendon', 'The Anglo-Saxon Chronicle'],
          answer: 'The Domesday Book',
        },
      ],

      flashcards: [
        {
          term: 'Motte-and-Bailey',
          definition: 'An early Norman timber fortress with a raised earth mound (motte) and palisaded courtyard (bailey).',
        },
        {
          term: 'Harrying of the North',
          definition: 'William I’s 1069–70 scorched-earth campaign that depopulated Yorkshire through artificial famine.',
        },
        {
          term: 'Domesday Book',
          definition: 'William the Conqueror’s 1086 national land audit recording ownership, resources, and taxable values.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 3: Crown vs Church: Henry II & Thomas Becket
    // ------------------------------------------------------------------------
    {
      id: 'lesson_3',
      title: 'Crown vs Church: Why did Henry II clash with Thomas Becket?',
      enquiry: 'Why did the conflict between King Henry II and Archbishop Thomas Becket erupt into murder in Canterbury Cathedral?',
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
      did_you_know:
        'When Archbishop Thomas Becket was murdered, monks washing his corpse discovered he secretly wore a coarse goat-hair shirt crawling with lice beneath his magnificent silk robes. This severe self-mortification convinced contemporaries that Becket was not a proud, stubborn politician, but a holy saint who died defending Christ’s Church!',

      do_now: {
        type: 'questions',
        items: [
          {
            question: 'What comprehensive land survey did William the Conqueror commission in 1086?',
            answer: 'The Domesday Book.',
          },
          {
            question: 'What type of castle featured an artificial mound and palisaded courtyard?',
            answer: 'Motte-and-bailey castle.',
          },
          {
            question: 'What supreme religious leader in Rome commanded the medieval Catholic Church?',
            answer: 'The Pope.',
          },
          {
            question: 'What is the ultimate punishment of expelling someone from the Catholic Church called?',
            answer: 'Excommunication.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Canon Law',
          definition: 'The legal system of the Catholic Church governing clergy conduct and spiritual matters.',
          phonetic: 'KAN-un LAW',
          syllables: 'Can-on Law',
          tier: '3',
        },
        {
          term: 'Criminous Clerk',
          definition: 'A medieval clergyman accused of committing serious secular crimes like murder, theft, or rape.',
          phonetic: 'KRIM-ih-nus KLURK',
          syllables: 'Crim-i-nous Clerk',
          tier: '3',
        },
        {
          term: 'Benefit of Clergy',
          definition: 'The legal right of educated churchmen to be tried in lenient Church courts rather than royal courts.',
          phonetic: 'BEN-ih-fit uv KLUR-jee',
          syllables: 'Ben-e-fit of Cler-gy',
          tier: '3',
        },
        {
          term: 'Constitutions of Clarendon',
          definition: 'A 1164 set of 16 royal customs issued by Henry II to bring Church courts under royal supervision.',
          phonetic: 'kon-stih-TOO-shunz uv KLAIR-un-dun',
          syllables: 'Con-sti-tu-tions of Clar-en-don',
          tier: '3',
        },
        {
          term: 'Martyrdom',
          definition: 'The suffering of death as a penalty for refusing to renounce religious beliefs or Church independence.',
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
            title: 'Source A: Manuscript Illumination of King Henry II and Thomas Becket Clashing (c. 1300s)',
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
            citation: 'British Library, London (Cotton MS Claudius D II) • Illuminated vellum (c. 1300s).',
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
            title: 'Source B: Eyewitness Account of the Murder of Thomas Becket by Edward Grim (1170)',
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
          type: 'short_answer',
          act: 1,
          qNum: 1,
          text: 'Why did King Henry II object so strongly to "Benefit of Clergy" and Church courts?',
          starter: 'Henry II objected to Church courts because...',
          answer:
            'Church courts could not impose the death penalty, allowing thousands of clergymen to escape execution for crimes like murder and rape, undermining royal law.',
          model_answer:
            'Henry II objected because Church courts operated under Canon Law, which prohibited executions. Consequently, thousands of clerics accused of murder and theft claimed Benefit of Clergy, receiving light punishments like defrocking and completely evading royal hanging.',
        },
        {
          type: 'short_answer',
          act: 2,
          qNum: 2,
          text: 'Why was Henry II shocked by Thomas Becket’s sudden change in behaviour upon becoming Archbishop?',
          starter: 'Henry II was shocked because...',
          answer:
            'Becket had been Henry’s loyal, luxury-loving Chancellor who lived extravagantly, but as Archbishop he gave up worldly wealth and prioritized loyalty to the Pope over the King.',
          model_answer:
            'Henry was stunned because Becket had spent years as his fun-loving, loyal Chancellor who championed royal interests. Upon becoming Archbishop, Becket unexpectedly renounced his luxury, donned ascetic sackcloth, and insisted that his ultimate loyalty belonged to God rather than the King.',
        },
        {
          type: 'short_answer',
          act: 5,
          qNum: 3,
          text: 'Why was King Henry II forced to undergo public flogging at Canterbury Cathedral in 1174?',
          starter: 'Henry II underwent public flogging because...',
          answer:
            'He was blamed across Europe for inciting Becket’s murder and had to perform public penance to appease the Pope and end the threat of papal excommunication.',
          model_answer:
            'Henry had to submit to public whipping to save his throne. The murder of an archbishop in his own cathedral horrified Christian Europe; Henry risked papal excommunication and baronial rebellion unless he demonstrated genuine, humiliating royal penance.',
        },
        {
          type: 'source_utility',
          qNum: 4,
          source_letter: 'B',
          text: 'How useful is Source B (Edward Grim’s eyewitness account) for an enquiry into what happened in Canterbury Cathedral on 29 December 1170?',
          starter: 'Source B is exceptionally useful because Edward Grim was...',
          model_answer:
            'Source B is exceptionally useful because it is written by a direct eyewitness who stood beside Becket at the altar and suffered a broken arm attempting to protect him. Grim captures the sheer violence, verbatim words, and brutality of the four knights. However, Grim wrote as an adoring Christian biographer intent on demonstrating that Becket died as a holy martyr, which leads him to portray Becket’s conduct as perfectly calm and Christ-like while possibly downplaying Becket’s angry insults toward the knights.',
        },
        {
          type: 'extended_writing',
          qNum: 5,
          text: 'Enquiry Essay: "Thomas Becket was more responsible than Henry II for his own violent death." How far do you agree?',
          guidance:
            'Weigh Becket’s unbending stubbornness, excommunications, and insults on the one hand, against Henry II’s tyrannical temper, overreaching demands, and fatal outburst on the other.',
          model_answer:
            'While Becket’s uncompromising fanaticism provoked the crisis, Henry II’s volatile authoritarian temper and ambiguous royal outburst bear primary responsibility for the murder.\\n\\nOn the one hand, Becket acted with extreme provocation. Even after Henry attempted reconciliation in 1170, Becket immediately ignited conflict by excommunicating the Archbishop of York upon landing in England. When the four knights confronted him in Canterbury Cathedral, Becket refused sanctuary and hurled furious personal insults at Reginald FitzUrse, escalating a tense standoff into a fatal slaughter.\\n\\nOn the other hand, Henry created the conditions for assassination. Henry demanded absolute subordination of Church courts at Clarendon, attempting to strip ancient ecclesiastical liberties. Most decisively, when Henry exploded into uncontrolled rage at Christmas 1170, shouting his famous complaint about the "low-born clerk," he incited his knights to violent action.\\n\\nIn conclusion, while Becket actively sought martyrdom, Henry II’s explosive royal temper was the decisive trigger of the murder.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry explores the fierce medieval clash between secular monarchy and ecclesiastical sovereignty. Guide pupils to see that both men felt they were defending vital principles: Henry was fighting for universal justice and the rule of law, while Becket was defending the spiritual autonomy of the Church from royal tyranny.',
        objectives: [
          {
            objective: 'Explain the conflict between Canon Law and royal courts over criminous clerks.',
            primer: 'Focus pupils on paragraph [3.1] and [3.3]. Contrast Benefit of Clergy with royal hanging.',
            question: 'Hinge Question: Was Henry II trying to modernize the legal system, or was he attempting an authoritarian power grab over the Catholic Church?',
          },
          {
            objective: 'Analyse the causes and consequences of Becket’s martyrdom.',
            primer: 'Examine paragraphs [3.4]–[3.5]. Highlight how Becket’s death ironically won total victory for Church courts.',
            question: 'Hinge Question: Why did the murder of Thomas Becket make it politically impossible for Henry II to implement the Constitutions of Clarendon?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'What royal office did Thomas Becket hold before becoming Archbishop of Canterbury?',
          options: ['Lord Chancellor', 'Lord High Treasurer', 'Earl Marshal', 'Justiciar'],
          answer: 'Lord Chancellor',
        },
        {
          question: 'What 1164 royal document attempted to make criminous clerks subject to royal courts?',
          options: ['The Constitutions of Clarendon', 'The Assize of Clarendon', 'Magna Carta', 'The Domesday Book'],
          answer: 'The Constitutions of Clarendon',
        },
        {
          question: 'On what date was Thomas Becket assassinated inside Canterbury Cathedral?',
          options: ['29 December 1170', '14 October 1066', '15 June 1215', '24 June 1381'],
          answer: '29 December 1170',
        },
        {
          question: 'What public punishment did King Henry II submit to at Canterbury in 1174?',
          options: ['Flogging by monks', 'Imprisonment in the Tower', 'Exile to Normandy', 'Loss of his crown'],
          answer: 'Flogging by monks',
        },
      ],

      flashcards: [
        {
          term: 'Benefit of Clergy',
          definition: 'The legal privilege of churchmen to be tried in lenient Church courts rather than royal courts.',
        },
        {
          term: 'Constitutions of Clarendon',
          definition: 'A 1164 legal decree issued by Henry II attempting to bring Church courts under royal supervision.',
        },
        {
          term: 'Canon Law',
          definition: 'The supreme legal system of the Catholic Church governing moral conduct and ecclesiastical matters.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 4: Magna Carta (1215) & Medieval Kingship
    // ------------------------------------------------------------------------
    {
      id: 'lesson_4',
      title: 'Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?',
      enquiry: 'Was Magna Carta a revolutionary victory for human freedom or a selfish act of baronial extortion?',
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
            question: 'What is the term for a medieval king who rules with absolute, unlimited power?',
            answer: 'Autocrat (Autocracy).',
          },
          {
            question: 'What term describes shield money paid by barons in place of military service?',
            answer: 'Scutage.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Magna Carta',
          definition: 'The "Great Charter" of 63 clauses agreed by King John in 1215, placing royal power under the rule of law.',
          phonetic: 'MAG-nuh KAHR-tuh',
          syllables: 'Mag-na Car-ta',
          tier: '3',
        },
        {
          term: 'Scutage',
          definition: 'A compulsory cash payment made by feudal barons to the king instead of providing knights for war.',
          phonetic: 'SKYOO-tij',
          syllables: 'Scu-tage',
          tier: '3',
        },
        {
          term: 'Interdict',
          definition: 'A papal decree closing all churches in a kingdom, banning church bells, weddings, and Christian burials.',
          phonetic: 'IN-ter-dikt',
          syllables: 'In-ter-dict',
          tier: '3',
        },
        {
          term: 'Habeas Corpus',
          definition: 'The ancient legal principle that a person cannot be detained indefinitely without trial or lawful cause.',
          phonetic: 'HAY-bee-us KOR-pus',
          syllables: 'Ha-be-as Cor-pus',
          tier: '3',
        },
        {
          term: 'Rule of Law',
          definition: 'The foundational principle that every person, including the monarch and government, is subject to the law.',
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
          type: 'short_answer',
          act: 1,
          qNum: 1,
          text: 'Why did King John’s loss of Normandy in 1204 lead directly to intense friction with his English barons?',
          starter: 'The loss of Normandy caused friction because...',
          answer:
            'Barons lost ancestral estates, and John spent the next decade demanding crushing scutage taxes and loans to fund an expensive war to win it back.',
          model_answer:
            'The loss of Normandy stripped English barons of their ancestral estates. Furthermore, John spent the next ten years imposing unprecedented feudal scutage taxes and extortionate fines to finance a massive mercenary army, pushing baronial patience to breaking point.',
        },
        {
          type: 'short_answer',
          act: 4,
          qNum: 2,
          text: 'Explain the revolutionary legal principle established by Clause 39 of Magna Carta.',
          starter: 'Clause 39 established the principle that...',
          answer:
            'No free man could be imprisoned or punished arbitrarily without lawful trial by his peers or by the law of the land.',
          model_answer:
            'Clause 39 established the constitutional principle of Habeas Corpus and the Rule of Law: the monarch could no longer arrest, execute, or seize the property of any free man arbitrarily without a lawful trial by his peers and the established law of the land.',
        },
        {
          type: 'short_answer',
          act: 5,
          qNum: 3,
          text: 'Why did the regency council of nine-year-old King Henry III repeatedly reissue Magna Carta after 1216?',
          starter: 'The regency council reissued Magna Carta because...',
          answer:
            'To persuade rebellious barons to desert the French Prince Louis and unite behind the legitimate child-king.',
          model_answer:
            'The regency council, led by William Marshal, reissued Magna Carta to demonstrate that the new child-king would rule under the law, successfully persuading rebellious English barons to abandon Prince Louis of France and defend Henry III.',
        },
        {
          type: 'source_utility',
          qNum: 4,
          source_letter: 'B',
          text: 'How useful is Source B (Clauses 39 & 40 of Magna Carta) for an enquiry into the limitations placed on King John’s power in 1215?',
          starter: 'Source B is exceptionally useful because it provides verbatim legal proof that...',
          model_answer:
            'Source B is exceptionally useful because it provides primary, contractual evidence of the exact legal boundaries forced upon King John. Clauses 39 and 40 explicitly forbid arbitrary imprisonment, denial of justice, and monarchical autocracy. However, its utility is qualified by medieval social reality: in 1215, "free men" represented only the narrow aristocratic elite and merchant class, completely excluding the unfree peasant serfs who formed over 75% of England’s population.',
        },
        {
          type: 'extended_writing',
          qNum: 5,
          text: 'Enquiry Essay: "Magna Carta was a selfish act of baronial extortion rather than a victory for human liberty." How far do you agree?',
          guidance:
            'Contrast the selfish, class-based motives of the 25 rebel barons on the one hand, against the enduring constitutional precedent of placing the Crown under the Rule of Law on the other.',
          model_answer:
            'While Magna Carta was drafted by selfish aristocrats to protect their private property, its foundational clauses established the permanent constitutional principle that the Crown is subject to the rule of law.\\n\\nOn the one hand, Magna Carta was an act of baronial self-interest. The 25 rebel barons were not modern democrats fighting for universal human rights; they were wealthy warlords furious at King John’s scutage taxes and loss of Normandy. The charter protected baronial inheritances, reduced royal wardship fines, and safeguarded feudal privileges. Most tellingly, its provisions applied exclusively to "free men," entirely ignoring the bonded peasant serfs who made up the vast majority of medieval England.\\n\\nOn the other hand, the charter created a revolutionary constitutional precedent. By forcing King John to seal Clause 39, the barons permanently shattered the doctrine of absolute monarchical autocracy. The king was no longer above the law. When reissued by Henry III in 1225, Magna Carta became the foundational cornerstone of English common law, inspiring Habeas Corpus, the American Constitution, and the Universal Declaration of Human Rights.\\n\\nIn conclusion, while born of feudal extortion, Magna Carta’s enduring historical significance lies in establishing the universal principle of the Rule of Law.',
        },
      ],

      teacher_notes: {
        primer:
          'This enquiry deconstructs the popular myth of Magna Carta. Challenge pupils to interrogate whether the charter was a modern manifesto of freedom or a medieval trade union agreement for 25 disgruntled barons. Emphasise Clause 39 as the pivot point where feudal self-interest inadvertently created constitutional law.',
        objectives: [
          {
            objective: 'Explain the financial and military pressures that pushed the barons into rebellion.',
            primer: 'Direct pupils to paragraphs [4.1]–[4.3]. Highlight John’s loss of Normandy, papal interdict, and Bouvines defeat.',
            question: 'Hinge Question: Was John an unusually evil king, or an unlucky administrator struggling to finance modern warfare on an outdated feudal budget?',
          },
          {
            objective: 'Evaluate the dual nature of Magna Carta: feudal self-interest versus constitutional legacy.',
            primer: 'Examine Clause 39 in Act 4.4 and contrast medieval "free men" against the bonded serfs.',
            question: 'Hinge Question: Can a document written by selfish barons to protect their tax exemptions still be considered the birth of modern human rights?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'What ancestral continental territory did King John lose to France in 1204?',
          options: ['Normandy', 'Aquitaine', 'Brittany', 'Gascony'],
          answer: 'Normandy',
        },
        {
          question: 'Where beside the River Thames did King John seal Magna Carta in June 1215?',
          options: ['Runnymede', 'Westminster', 'Canterbury', 'Oxford'],
          answer: 'Runnymede',
        },
        {
          question: 'Which famous clause guaranteed that no free man would be imprisoned without lawful judgement?',
          options: ['Clause 39', 'Clause 1', 'Clause 63', 'Clause 12'],
          answer: 'Clause 39',
        },
        {
          question: 'What did Pope Innocent III do to Magna Carta within ten weeks of its sealing?',
          options: ['He annulled it as null and void', 'He translated it into Latin', 'He blessed it in Rome', 'He crowned King John Emperor'],
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
          definition: 'Shield money paid by feudal barons to the monarch in place of military service.',
        },
        {
          term: 'Habeas Corpus',
          definition: 'The legal principle that a person cannot be detained without lawful cause and trial.',
        },
      ],
    },

    // ------------------------------------------------------------------------
    // LESSON 5: The Black Death (1348) & The Peasants’ Revolt (1381)
    // ------------------------------------------------------------------------
    {
      id: 'lesson_5',
      title: 'The Black Death (1348) & The Peasants’ Revolt (1381): How did plague and rebellion shatter feudalism?',
      enquiry: 'How did the demographic shock of the Black Death lead to the peasant uprising of 1381?',
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
            question: 'What flat tax levied equally on every individual head sparked rebellion in 1381?',
            answer: 'The Poll Tax.',
          },
        ],
      },

      vocabulary: [
        {
          term: 'Demography',
          definition: 'The study of population size, density, distribution, and mortality shifts over time.',
          phonetic: 'dih-MOG-ruh-fee',
          syllables: 'De-mog-ra-phy',
          tier: '3',
        },
        {
          term: 'Statute of Labourers',
          definition: 'A 1351 royal law freezing agricultural wages at pre-plague rates and punishing mobile workers.',
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
          definition: 'A flat tax levied equally on every individual person over fourteen regardless of income.',
          phonetic: 'POHL TAKS',
          syllables: 'Poll Tax',
          tier: '3',
        },
        {
          term: 'Insurrection',
          definition: 'A violent, organized uprising by citizens against established government authority.',
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
          type: 'short_answer',
          act: 1,
          qNum: 1,
          text: 'How did the demographic loss of one-third of England’s population during the Black Death alter the balance of power between lords and peasants?',
          starter: 'The Black Death altered the balance of power because...',
          answer:
            'With half the workforce dead, labour became scarce; surviving peasants could demand higher wages and leave estates if lords refused to pay.',
          model_answer:
            'The Black Death created an acute labour shortage. Landlords faced rotting harvests and were forced to compete for surviving workers. Peasants gained bargaining power, demanding higher cash wages and lower rents, breaking the strict feudal subservience of serfdom.',
        },
        {
          type: 'short_answer',
          act: 3,
          qNum: 2,
          text: 'Why did the 1381 Poll Tax cause far more widespread fury than earlier feudal taxes?',
          starter: 'The 1381 Poll Tax caused intense fury because...',
          answer:
            'It was a flat tax of one shilling on every person over 15 regardless of wealth, hurting impoverished peasants far more than rich lords.',
          model_answer:
            'The 1381 Poll Tax caused intense outrage because it was a regressive flat tax: every person over fifteen had to pay one shilling, regardless of whether they were a wealthy merchant or an impoverished peasant, demanding two weeks’ hard wages from starving families.',
        },
        {
          type: 'short_answer',
          act: 5,
          qNum: 3,
          text: 'What did Richard II say to the peasants once the rebellion was safely crushed?',
          starter: 'Richard II told the peasants...',
          answer:
            'He revoked all promised charters of freedom and told them: "Serfs you were, and serfs you shall remain."',
          model_answer:
            'Once the peasants had dispersed, Richard II betrayed his promises, revoking all charters of freedom and telling them: "Serfs you were, and serfs you shall remain, in yet harder bondage."',
        },
        {
          type: 'source_utility',
          qNum: 4,
          source_letter: 'B',
          text: 'How useful is Source B (Jean Froissart’s account of Wat Tyler’s death) for an enquiry into the climax of the Peasants’ Revolt at Smithfield?',
          starter: 'Source B is useful because it vividly portrays...',
          model_answer:
            'Source B is useful because it provides contemporary narrative detail and visual evidence of the dramatic confrontation at Smithfield, capturing the slaying of Wat Tyler by Mayor Walworth and Richard II’s intervention. However, its utility is shaped by Froissart’s extreme aristocratic bias: writing for royal and noble patrons, Froissart portrays the peasant rebels as arrogant, insolent villains and presents the royal court as noble heroes, omitting the broken royal promises that followed.',
        },
        {
          type: 'extended_writing',
          qNum: 5,
          text: 'Enquiry Essay: "The Peasants’ Revolt of 1381 was a complete failure." How far do you agree?',
          guidance:
            'Weigh the immediate military collapse, execution of leaders, and revocation of charters on the one hand, against the permanent death of poll taxes and the decline of serfdom on the other.',
          model_answer:
            'In the immediate term, the Peasants’ Revolt was brutally crushed; however, in the long term, it achieved a historic victory by permanently breaking the economic viability of serfdom.\\n\\nOn the one hand, the rebellion was a catastrophic short-term failure. Wat Tyler was assassinated at Smithfield, John Ball was hanged, drawn, and quartered, and Richard II ruthlessly revoked all promised charters of freedom. Over 1,500 rebels were executed, and the monarch reasserted that serfs would remain in bondage.\\n\\nOn the other hand, the revolt achieved profound long-term success. Parliament was terrified by the storming of London and never dared levy another poll tax. Furthermore, manorial lords recognized that attempting to enforce the Statute of Labourers was suicidal. Over the next century, lords abandoned forced feudal labour, commuting serfdom dues into cash wages and free tenancies. By 1485, serfdom had effectively vanished from England.\\n\\nIn conclusion, while the rebels lost the military battle of 1381, their uprising dealt the mortal blow that doomed the feudal system.',
        },
      ],

      teacher_notes: {
        primer:
          'This capstone enquiry traces the economic and social chain reaction from the biological shock of the Black Death (1348) to the political explosion of the Peasants’ Revolt (1381). Challenge pupils to connect demographic scarcity with wage inflation, royal repression (Statute of Labourers), and tax resistance.',
        objectives: [
          {
            objective: 'Explain the economic chain reaction connecting the Black Death to the labour crisis.',
            primer: 'Direct pupils to paragraphs [5.1]–[5.2]. Emphasise supply and demand: half the workers dead = higher wages.',
            question: 'Hinge Question: Why did the Black Death empower ordinary peasant workers when kings and bishops remained in power?',
          },
          {
            objective: 'Evaluate whether the Peasants’ Revolt was a failure or long-term success.',
            primer: 'Contrast Tyler’s execution in paragraph [5.5] with the permanent death of poll taxes and serfdom.',
            question: 'Hinge Question: If Richard II broke all his promises, why did serfdom still disappear from England within a century of the revolt?',
          },
        ],
      },

      quick_quiz: [
        {
          question: 'In what year did the Black Death first arrive in England?',
          options: ['1348', '1066', '1215', '1381'],
          answer: '1348',
        },
        {
          question: 'What 1351 royal law attempted to freeze peasant wages at pre-plague rates?',
          options: ['The Statute of Labourers', 'The Constitutions of Clarendon', 'Magna Carta', 'The Poor Law'],
          answer: 'The Statute of Labourers',
        },
        {
          question: 'What despised tax sparked the rebellion in Brentwood, Essex in 1381?',
          options: ['The Poll Tax', 'Scutage', 'Ship Money', 'Window Tax'],
          answer: 'The Poll Tax',
        },
        {
          question: 'Where was Wat Tyler killed by the Mayor of London in June 1381?',
          options: ['Smithfield', 'Tower Hill', 'Runnymede', 'Westminster'],
          answer: 'Smithfield',
        },
      ],

      flashcards: [
        {
          term: 'Statute of Labourers',
          definition: 'A 1351 law attempting to freeze wages at pre-plague rates and punish mobile workers.',
        },
        {
          term: 'Poll Tax',
          definition: 'A regressive flat tax levied equally on every individual person regardless of income.',
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
`;

fs.writeFileSync(targetFile, medievalData, 'utf8');
console.log('✅ Successfully wrote gold-standard 5-act data to:', targetFile);
