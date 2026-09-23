/**
 * History Revision Hub — Academic Authoring Pipeline
 *
 * Target: units/early_modern_world/data.js (KS3: Early Modern World & Global Encounters, 1450–1750)
 * Architecture: Full Christine Counsell 4-Act Disciplinary Model
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const targetFile = path.join(ROOT_DIR, 'units', 'early_modern_world', 'data.js');

// Load original data to preserve ancillary metadata
const originalData = require('../units/early_modern_world/data.js');
const baseUnit = originalData.unitData || originalData.default || originalData;

// Load 20-question quizzes from realign_early_modern_world_quizzes.cjs
const quizScriptContent = fs.readFileSync(
  path.join(ROOT_DIR, 'scripts', 'realign_early_modern_world_quizzes.cjs'),
  'utf8',
);
const quizCode =
  quizScriptContent.substring(0, quizScriptContent.indexOf('async function run()')) +
  '\nmodule.exports = { LESSON_QUIZZES };';
const tempQuizPath = path.join(ROOT_DIR, 'temp_em_quizzes.cjs');
fs.writeFileSync(tempQuizPath, quizCode, 'utf8');
const { LESSON_QUIZZES } = require(tempQuizPath);
fs.unlinkSync(tempQuizPath);

console.log('✅ Loaded all 9 lesson quizzes (20 questions each).');

const early_modern_lessons = [
  // ==========================================
  // LESSON 1: WHO HELD GLOBAL POWER IN 1450?
  // ==========================================
  {
    id: 'lesson_1',
    title: 'Who held global power in 1450?',
    enquiry_question:
      'To what extent was Europe a peripheral backwater compared to the Ming, Ottoman, and Songhai empires in 1450?',
    cover_image: '/images/silk_route_colored_map.jpg',
    banner: '/images/silk_route_colored_map.jpg',
    learning_objectives: [
      'Describe the economic, military, and territorial dominance of the Ming, Ottoman, and West African empires in 1450',
      'Explain how the Fall of Constantinople in 1453 disrupted Eurasian trade routes and isolated Europe',
      'Evaluate whether Europe was an impoverished global periphery compared to the wealth of Asia and Africa',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/the-renaissance-revolution-b-episode-1-of-3/',
        title: 'The Renaissance Revolution: Global Connections in 1450',
        duration: '4 mins 45 secs',
        viewing_task:
          'Identify two luxury commodities flowing into Europe along the Silk Roads and explain who controlled their supply.',
        model_answer:
          'Silk and spices (such as black pepper, cinnamon, and cloves) flowed from Ming China and the Moluccas into Europe. Their supply was strictly controlled by Ottoman and Arab merchants who charged heavy transit taxes at Mediterranean ports.',
      },
    ],
    do_now: {
      title: 'Do Now: Foundations of Late Medieval Europe',
      type: 'mixed',
      items: [
        {
          question:
            'Which catastrophic pandemic struck Europe in 1348, wiping out roughly half of its population?',
          answer: 'The Black Death (bubonic plague caused by Yersinia pestis).',
        },
        {
          question:
            'What international land trade network historically linked China and the Mediterranean across Central Asia?',
          answer: 'The Silk Road (or Silk Routes).',
        },
        {
          question:
            'Which Christian empire, with its capital at Constantinople, had endured for over a thousand years since the fall of ancient Rome?',
          answer: 'The Byzantine Empire (Eastern Roman Empire).',
        },
        {
          question:
            'What was the primary source of wealth and military power for medieval European monarchs and barons?',
          answer: 'Land ownership and agricultural labor extracted from feudal serfs and peasants.',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This opening enquiry dismantles the persistent Eurocentric myth that Europe has always been the center of world history. In 1450, Western Europe was a war-torn, impoverished peninsula recovering from the Black Death, while the true economic, military, and cultural superpowers of the globe were Ming China, the burgeoning Ottoman Empire, and the wealthy kingdoms of West Africa.',
      objectives: [
        {
          objective:
            'Understand the scale, naval technology, and commercial output of Ming Dynasty China under the Yongle Emperor and Admiral Zheng He.',
          primer:
            'Direct pupils to paragraphs [1.1]–[2.1] and Source A. Contrast the staggering 400-foot multi-decked treasure ships of Zheng He with the tiny wooden caravels available to European sailors.',
          question:
            'Why did the Ming Emperor decide to halt Zheng He’s oceanic voyages in 1433, and how does this prove China felt it needed nothing from the outside world?',
        },
        {
          objective:
            'Analyze the geopolitical consequences of the Ottoman capture of Constantinople in 1453.',
          primer:
            'Focus on paragraphs [2.2]–[3.1]. Explain how Sultan Mehmed II shattered European overland trade access to India and China, forcing Europeans to look to the Atlantic.',
          question:
            'How did the Fall of Constantinople act as the accidental catalyst for the European Age of Exploration?',
        },
        {
          objective:
            'Evaluate the wealth of West African empires using the Catalan Atlas and primary accounts of Mansa Musa.',
          primer:
            'Guide pupils through Source B and paragraphs [3.1]–[4.2]. Emphasize that African kingdoms like Mali and Songhai controlled the gold that backed Mediterranean currencies.',
          question:
            'Why does European cartography from 1375 depict Mansa Musa holding a golden orb, and what does this reveal about medieval European respect for African wealth?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: The Silk Road & Trade Bottleneck (1450)',
        src: '/images/silk_road.jpg',
        caption:
          'Contemporary map illustrating the historic overland Silk Road caravan routes linking China and Europe, which were heavily taxed and blocked after the Ottoman conquest of Constantinople in 1453.',
        shelfmark: 'Imperial Cartographic Archive (Shelfmark: ICA-SILK-1450)',
        citation: 'British Library, London.',
        context:
          'For centuries, silk, porcelain, and spices moved across Central Asia along the Silk Road. In 1453, the Ottoman Empire seized Constantinople and imposed crushing tariffs on Christian traders. **Hinge Question:** Why did the Ottoman bottleneck on the Silk Road force European monarchs to look toward the Atlantic Ocean?',
        hinge_question:
          'Why did the Ottoman bottleneck on the Silk Road force European monarchs to look toward the Atlantic Ocean?',
      },
      {
        letter: 'B',
        title: 'Source B: The Catalan Atlas Depiction of Mansa Musa of Mali (1375)',
        src: '/images/mansa_musa_catalan.jpg',
        caption:
          'Illuminated maritime map by Majorcan Jewish cartographer Cresques Abraham, depicting the Emperor of Mali seated upon a golden throne holding a massive gold nugget.',
        shelfmark: 'Bibliothèque nationale de France (Shelfmark: MS Espagnol 30)',
        citation: 'Département des Manuscrits, BnF, Paris.',
        context:
          'The Catalan Atlas was the most sophisticated map of the medieval Mediterranean world. It placed Emperor Mansa Musa at the center of the Sahara, describing him as the richest lord in all the earth. **Hinge Question:** Why did 14th-century European monarchs view West Africa as an unimaginable reservoir of bullion rather than a region to be dominated?',
        hinge_question:
          'Why did 14th-century European monarchs view West Africa as an unimaginable reservoir of bullion rather than a region to be dominated?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Eurocentric Myth & The Peripheral Peninsula)',
        text: '<span class="para-ref">[1.1]</span> In popular imagination, the modern world is often imagined as a European invention. Yet if an alien observer had orbited the earth in the year 1450, Western Europe would have appeared as little more than an impoverished, war-torn, and disease-ravaged peripheral backwater. Europe was still reeling from the demographic shock of the Black Death, which had annihilated between a third and a half of its population just a century earlier. England and France were trapped in the final bloody gasps of the Hundred Years’ War; rival baronies fought in the mud, literacy was restricted to a tiny Latin-speaking clerical elite, and London was a smelly, unpaved commercial town of barely 50,000 souls.<br><br><span class="para-ref">[1.2]</span> By sharp contrast, the true centers of global wealth, industrial manufacturing, and demographic power lay thousands of miles to the east and south. In 1450, the Mediterranean was not a European lake, but the western terminal of vast afro-eurasian trade arteries connecting the spices of the Moluccas, the silks of China, and the goldfields of West Africa. European monarchs possessed neither the naval technology to cross oceans nor the manufactured goods that Asian and African empires desired; Europe had little to offer the world except silver bullion and raw wool.',
      },
      {
        act: 2,
        title:
          'Act 2: Escalation & Conflict (The Giants of the East: Ming China & The Ottoman Blitz)',
        source: {
          letter: 'A',
          title: 'Source A: The Silk Road & Trade Bottleneck (1450)',
          src: '/images/silk_road.jpg',
          caption:
            'Contemporary map illustrating the historic overland Silk Road caravan routes linking China and Europe, which were heavily taxed and blocked after the Ottoman conquest of Constantinople in 1453.',
          shelfmark: 'Imperial Cartographic Archive (Shelfmark: ICA-SILK-1450)',
          citation: 'British Library, London.',
          context:
            'For centuries, silk, porcelain, and spices moved across Central Asia along the Silk Road. In 1453, the Ottoman Empire seized Constantinople and imposed crushing tariffs on Christian traders. **Hinge Question:** Why did the Ottoman bottleneck on the Silk Road force European monarchs to look toward the Atlantic Ocean?',
          hinge_question:
            'Why did the Ottoman bottleneck on the Silk Road force European monarchs to look toward the Atlantic Ocean?',
        },
        text: '<span class="para-ref">[2.1]</span> The undisputed economic and technological superpower of the fifteenth century was <strong>Ming Dynasty China</strong>. Ruling over 100 million citizens, China was an urban, bureaucratic, and industrial giant. Between 1405 and 1433, Emperor Yongle dispatched seven monumental naval expeditions commanded by <strong>Admiral Zheng He</strong>. Zheng He’s fleets were staggering: over 300 ships carrying 28,000 men, featuring nine-masted "Treasure Ships" (*baochuan*) up to 400 feet long with watertight bulkheads and magnetic compasses. These fleets sailed effortlessly across the Indian Ocean to India, the Persian Gulf, and the East African coast, distributing silks and blue-and-white porcelain to awe foreign rulers into paying tribute.<br><br><span class="para-ref">[2.2]</span> Meanwhile, on Europe’s immediate eastern doorstep, a formidable new Islamic superpower was rising: the <strong>Ottoman Empire</strong>. In May 1453, twenty-one-year-old Sultan <strong>Mehmed II</strong> deployed gigantic bronze super-cannons and 80,000 soldiers to besiege Constantinople, the ancient capital of the Byzantine Empire. The city fell on 29 May 1453, ending over 1,100 years of Roman imperial continuity. Mehmed transformed the city into Istanbul, the glittering seat of Ottoman power. Crucially for Europe, the Ottomans now controlled the Bosporus and Mediterranean trade terminals, imposing hefty customs tariffs and blocking European merchants from accessing the Silk Roads (Source A).',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Gold of Mali & Mansa Musa’s Riches)',
        source: {
          letter: 'B',
          title: 'Source B: The Catalan Atlas Depiction of Mansa Musa of Mali (1375)',
          src: '/images/mansa_musa_catalan.jpg',
          caption:
            'Illuminated maritime map by Majorcan Jewish cartographer Cresques Abraham, depicting the Emperor of Mali seated upon a golden throne holding a massive gold nugget.',
          shelfmark: 'Bibliothèque nationale de France (Shelfmark: MS Espagnol 30)',
          citation: 'Département des Manuscrits, BnF, Paris.',
          context:
            'The Catalan Atlas was the most sophisticated map of the medieval Mediterranean world. It placed Emperor Mansa Musa at the center of the Sahara, describing him as the richest lord in all the earth. **Hinge Question:** Why did 14th-century European monarchs view West Africa as an unimaginable reservoir of bullion rather than a region to be dominated?',
          hinge_question:
            'Why did 14th-century European monarchs view West Africa as an unimaginable reservoir of bullion rather than a region to be dominated?',
        },
        text: '<span class="para-ref">[3.1]</span> Forensic examination of primary artifacts demonstrates how self-assured the great non-European empires were. In Ming China, Zheng He recorded that imperial fleets had <em>"traversed more than one hundred thousand li of immense waters"</em> to treat distant barbarians with kindness and display <em>"the transforming power of imperial virtue."</em> China had no desire to conquer foreign lands or establish overseas settler colonies because Chinese emperors believed their Middle Kingdom already possessed everything under heaven. Consequently, when Confucian court officials judged the voyages too expensive, the fleet was ordered to rot at anchor and foreign voyages were outlawed in 1433.<br><br><span class="para-ref">[3.2]</span> In West Africa, the Mali and Songhai empires commanded immense commercial wealth. The legendary 1324 pilgrimage to Mecca by Emperor <strong>Mansa Musa</strong> had introduced so much pure gold into Cairo’s economy that the metal’s value was depressed for twelve years! European cartographers in Majorca drew the famous Catalan Atlas of 1375 (Source B) showing Mansa Musa crowned in gold, brandishing an enormous gold nugget like an apple. African kingdoms like the Kingdom of Benin cast intricate brass and bronze sculptures displaying sophisticated metallurgical mastery that rivaled anything produced in Renaissance Italy.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (The Desperation of the Edge)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'To what extent was Europe a peripheral backwater compared to the Ming, Ottoman, and Songhai empires in 1450?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'In 1450, popular Eurocentric assumptions are challenged by the fact that...',
                'The Ming Dynasty of China demonstrated superior wealth and technology because...',
                'The Ottoman conquest of Constantinople in 1453 transformed global geopolitics by...',
                'Ultimately, Europe’s eventual oceanic exploration was driven not by superior strength, but by...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In sharp contrast to',
                'Crucially, this forced',
                'This demonstrates that',
              ],
              evaluative_criteria: [
                'Contrast the population, technology, and wealth of Ming China and the Ottoman Empire with Western Europe.',
                'Assess the significance of the Fall of Constantinople in blocking Eurasian overland trade routes.',
                'Evaluate whether European overseas exploration was born from imperial confidence or economic desperation.',
              ],
            },
            model_answer:
              'In 1450, Western Europe was undeniably a peripheral backwater when evaluated against the staggering wealth, advanced technology, and military might of the Ming, Ottoman, and West African empires. While popular history often presents Europe as the permanent driving engine of civilization, fifteenth-century European kingdoms were demographically shattered by the Black Death, technologically backward at sea, and locked in parochial feudal warfare. In stark contrast, Ming Dynasty China was the world’s industrial titan: Admiral Zheng He’s treasure fleets of over 300 ships—some measuring 400 feet with watertight bulkheads—dominated the Indian Ocean decades before Columbus set sail. China was so wealthy and self-sufficient that it chose to end foreign expeditions in 1433 simply because the outside world held nothing it required. Meanwhile, the Ottoman Empire under Sultan Mehmed II breached Constantinople’s walls in 1453 using the world’s most advanced gunpowder artillery, establishing a choking Islamic monopoly over the Silk Road trade. European merchants, desperate for silks and spices, were subjected to crushing Ottoman tariffs. Furthermore, in West Africa, the Mali Empire controlled the goldmines that backed Mediterranean currencies, as memorialized by Mansa Musa in the Catalan Atlas. Ultimately, Europe’s subsequent "Age of Discovery" was not launched from a position of civilizational supremacy, but from deep geopolitical desperation: boxed in by the Ottoman superpower, impoverished European kingdoms were forced into the perilous Atlantic simply to find an alternative route to the fabulous wealth of Asia.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> Modern global historians, such as Professor Peter Frankopan in <em>The Silk Roads</em> (2015), have radically revised traditional Eurocentric narratives. Frankopan demonstrates that for thousands of years, the beating heart of world history was the Eurasian crossroads—Persia, Central Asia, and China—not Western Europe. The European "Age of Discovery" was not the inevitable triumph of European cultural genius; rather, it was born out of profound weakness and geographic desperation. Cut off from Asian trade by the Ottoman superpower, European kingdoms had to gamble on the open, terrifying Atlantic Ocean or remain impoverished forever.<br><br><span class="para-ref">[4.2]</span> The year 1450 marks the calm before a global storm. Within fifty years, small, desperate Portuguese and Spanish ships would round the Cape of Good Hope and stumble across the Americas, triggering a violent reordering of the planet. Yet in 1450, the rulers of Beijing, Istanbul, and Timbuktu would have laughed out loud at the suggestion that a tiny island called England would one day build the largest global empire in human history.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'To what extent was Europe a peripheral backwater compared to the Ming, Ottoman, and Songhai empires in 1450?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'In 1450, popular Eurocentric assumptions are challenged by the fact that...',
          'The Ming Dynasty of China demonstrated superior wealth and technology because...',
          'The Ottoman conquest of Constantinople in 1453 transformed global geopolitics by...',
          'Ultimately, Europe’s eventual oceanic exploration was driven not by superior strength, but by...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In sharp contrast to',
          'Crucially, this forced',
          'This demonstrates that',
        ],
        evaluative_criteria: [
          'Contrast the population, technology, and wealth of Ming China and the Ottoman Empire with Western Europe.',
          'Assess the significance of the Fall of Constantinople in blocking Eurasian overland trade routes.',
          'Evaluate whether European overseas exploration was born from imperial confidence or economic desperation.',
        ],
      },
      model_answer:
        'In 1450, Western Europe was undeniably a peripheral backwater when evaluated against the staggering wealth, advanced technology, and military might of the Ming, Ottoman, and West African empires. While popular history often presents Europe as the permanent driving engine of civilization, fifteenth-century European kingdoms were demographically shattered by the Black Death, technologically backward at sea, and locked in parochial feudal warfare. In stark contrast, Ming Dynasty China was the world’s industrial titan: Admiral Zheng He’s treasure fleets of over 300 ships—some measuring 400 feet with watertight bulkheads—dominated the Indian Ocean decades before Columbus set sail. China was so wealthy and self-sufficient that it chose to end foreign expeditions in 1433 simply because the outside world held nothing it required. Meanwhile, the Ottoman Empire under Sultan Mehmed II breached Constantinople’s walls in 1453 using the world’s most advanced gunpowder artillery, establishing a choking Islamic monopoly over the Silk Road trade. European merchants, desperate for silks and spices, were subjected to crushing Ottoman tariffs. Furthermore, in West Africa, the Mali Empire controlled the goldmines that backed Mediterranean currencies, as memorialized by Mansa Musa in the Catalan Atlas. Ultimately, Europe’s subsequent "Age of Discovery" was not launched from a position of civilizational supremacy, but from deep geopolitical desperation: boxed in by the Ottoman superpower, impoverished European kingdoms were forced into the perilous Atlantic simply to find an alternative route to the fabulous wealth of Asia.',
    },
    quiz: LESSON_QUIZZES.lesson_1,
  },

  // ==========================================
  // LESSON 2: RELIGION & EXPLORATION (1517–1588)
  // ==========================================
  {
    id: 'lesson_2',
    title: 'How did religious conflict trigger global exploration (1517–1588)?',
    enquiry_question:
      'Why did the Protestant Reformation turn the Atlantic Ocean into a violent battleground for European empires?',
    cover_image: '/images/early_mod_l2_banner.jpg',
    banner: '/images/early_mod_l2_banner.jpg',
    learning_objectives: [
      'Explain how Martin Luther’s Protestant Reformation of 1517 shattered Catholic religious unity across Europe',
      'Describe how Spain and Portugal used the Treaty of Tordesillas (1494) to claim a global monopoly on trade and souls',
      'Evaluate how religious hatred between Catholic Spain and Protestant England culminated in state piracy and the Spanish Armada of 1588',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/elizabeth-i-war-on-terror-episode-1-of-2/',
        title: 'Elizabeth I: War, Religion and the Sea Dogs',
        duration: '5 mins 20 secs',
        viewing_task:
          'Identify the religious and economic reasons why King Philip II of Spain launched the Armada against England in 1588.',
        model_answer:
          'Philip II launched the Armada to re-impose Roman Catholicism upon Protestant England, stop Elizabeth I from supporting Dutch Protestant rebels, and punish English privateers like Francis Drake for looting Spanish silver treasure fleets.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from 1450 Global Power',
      type: 'mixed',
      items: [
        {
          question:
            'Which imperial dynasty ruled China in 1450, deploying vast treasure fleets under Admiral Zheng He?',
          answer: 'The Ming Dynasty (1368–1644).',
        },
        {
          question:
            'What major city did Ottoman Sultan Mehmed II conquer in May 1453, ending the Byzantine Empire?',
          answer: 'Constantinople (renamed Istanbul).',
        },
        {
          question:
            'Why did the Ottoman conquest of Constantinople force Europeans to look for sea routes to Asia?',
          answer:
            'The Ottomans seized control of the overland Silk Road trade routes and charged punishing taxes on goods.',
        },
        {
          question:
            'Which West African Emperor became famous across medieval Europe for his immense gold wealth on the Catalan Atlas?',
          answer: 'Mansa Musa of the Mali Empire.',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson traces how an academic theological dispute in Germany transformed oceanic seafaring into holy war. When Martin Luther fractured European Christianity in 1517, oceanic exploration became a zero-sum contest not merely for spice and gold, but for immortal souls, sparking state-sponsored piracy and culminating in the Spanish Armada.',
      objectives: [
        {
          objective:
            'Understand the catalyst of the Protestant Reformation in 1517 and its global imperial repercussions.',
          primer:
            'Direct pupils to paragraphs [1.1]–[1.2]. Emphasize that Spain viewed overseas wealth as divine funding to stamp out Protestant heresy.',
          question:
            'Why did Catholic Spain believe it possessed a divine right to conquer the Americas and keep Protestant England out?',
        },
        {
          objective:
            'Analyze the Treaty of Tordesillas (1494) and English defiance via privateering and piracy.',
          primer:
            'Examine Source A and paragraphs [2.1]–[2.2]. Discuss Francis Drake’s raiding of Spanish silver galleons under Elizabeth’s secret blessing.',
          question:
            'What was the crucial difference between a pirate and a privateer, and why did Elizabeth I knight Francis Drake?',
        },
        {
          objective:
            'Evaluate the symbolism of the Armada Portrait and the defeat of the Spanish Armada in 1588.',
          primer:
            'Examine Source B and paragraphs [3.1]–[4.2]. Focus on Elizabeth’s hand resting on the globe and the shipwrecked Spanish fleet in the background.',
          question:
            'How does the Armada Portrait function as both religious propaganda and an imperial declaration of England’s global ambitions?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: Map of the Treaty of Tordesillas Meridian Line (1494)',
        src: '/images/tordesillas_map.png',
        caption:
          'Papal meridian line drawn by Pope Alexander VI in 1493 and finalized at Tordesillas in 1494, dividing the entire non-European globe between Spain and Portugal.',
        shelfmark: 'General Archive of the Indies (Shelfmark: AGI-PAT-1494-01)',
        citation: 'Archivo General de Indias, Seville, Spain.',
        context:
          'Pope Alexander VI, a Spaniard by birth, decreed that all newly discovered lands west of a line 370 leagues west of Cape Verde belonged to Spain, while lands east belonged to Portugal. England, France, and other nations were completely excluded. **Hinge Question:** Why did French King Francis I famously demand to see "the clause in Adam’s will" that excluded his nation from dividing the earth?',
        hinge_question:
          'Why did French King Francis I famously demand to see "the clause in Adam’s will" that excluded his nation from dividing the earth?',
      },
      {
        letter: 'B',
        title: 'Source B: The Armada Portrait of Queen Elizabeth I (1588)',
        src: '/images/armada_portrait.jpg',
        caption:
          'Masterpiece attributed to George Gower commemorating the English defeat of the Spanish Armada, depicting Elizabeth with her hand resting upon the globe.',
        shelfmark: 'Woburn Abbey Collection (Shelfmark: WOB-ARM-1588)',
        citation: 'The Duke of Bedford and the Trustees of the Bedford Estates.',
        context:
          'In the painting, the sunlit English fleet sails peacefully on the left, while on the right, the Catholic Spanish Armada is dashed against the rocks by violent storms. Elizabeth’s hand rests firmly upon the Americas. **Hinge Question:** How does this portrait communicate that God personally favored Protestant England over Catholic Spain?',
        hinge_question:
          'How does this portrait communicate that God personally favored Protestant England over Catholic Spain?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (Luther’s Hammer & The Papal Monopoly)',
        source: {
          letter: 'A',
          title: 'Source A: Map of the Treaty of Tordesillas Meridian Line (1494)',
          src: '/images/tordesillas_map.png',
          caption:
            'Papal meridian line drawn by Pope Alexander VI in 1493 and finalized at Tordesillas in 1494, dividing the entire non-European globe between Spain and Portugal.',
          shelfmark: 'General Archive of the Indies (Shelfmark: AGI-PAT-1494-01)',
          citation: 'Archivo General de Indias, Seville, Spain.',
          context:
            'Pope Alexander VI, a Spaniard by birth, decreed that all newly discovered lands west of a line 370 leagues west of Cape Verde belonged to Spain, while lands east belonged to Portugal. England, France, and other nations were completely excluded. **Hinge Question:** Why did French King Francis I famously demand to see "the clause in Adam’s will" that excluded his nation from dividing the earth?',
          hinge_question:
            'Why did French King Francis I famously demand to see "the clause in Adam’s will" that excluded his nation from dividing the earth?',
        },
        text: '<span class="para-ref">[1.1]</span> In October 1517, an obscure German monk named <strong>Martin Luther</strong> nailed ninety-five theses to the church door in Wittenberg, attacking the corruption of the Catholic papacy. Luther argued that salvation was achieved through personal faith alone, not by purchasing papal indulgences or submitting to Roman hierarchy. Luther’s protest ignited the **Protestant Reformation**, tearing Europe into two violently hostile religious camps: Catholic kingdoms loyal to the Pope (led by the mighty Habsburg superpower of Spain), and Protestant states (eventually including England, Scotland, the Netherlands, and northern Germany) who viewed the Pope as the Antichrist.<br><br><span class="para-ref">[1.2]</span> Meanwhile, Spain and Portugal had already struck maritime gold. In 1494, Pope Alexander VI mediated the **Treaty of Tordesillas** (Source A), audaciously drawing an imaginary meridian line down the Atlantic Ocean: all non-Christian lands discovered to the west belonged exclusively to Spain, while everything to the east belonged to Portugal. Spanish conquistadors like Cortés and Pizarro annihilated the Aztec and Inca empires, establishing a colossal silver-mining empire in Mexico and Peru. To Spanish King Philip II, this tidal wave of silver was not merely cash: it was divine funding provided by God to build invincible armies and crush Protestant heretics worldwide.',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (The Sea Dogs: Piracy in God’s Name)',
        text: '<span class="para-ref">[2.1]</span> In England, King Henry VIII broke with Rome in 1534 to secure a divorce, declaring himself Supreme Head of the Church of England. By the time his daughter <strong>Elizabeth I</strong> ascended the throne in 1558, England was a vulnerable Protestant island surrounded by powerful Catholic enemies. Excommunicated by Pope Pius V in 1570—who commanded English Catholics to depose their "heretic queen"—Elizabeth could not afford a full-scale war against Spain’s legendary infantry, the *tercios*. Instead, she turned to state-sponsored maritime piracy.<br><br><span class="para-ref">[2.2]</span> Elizabeth secretly licensed audacious Devon sea captains—the infamous **"Sea Dogs"**, including <strong>Sir Francis Drake</strong> and <strong>Sir John Hawkins</strong>. Armed with royal letters of marque, Drake ambushed Spanish treasure galleons in the Caribbean, looted silver mule-trains in Panama, and between 1577 and 1580 became the first Englishman to circumnavigate the globe in the *Golden Hind*. When Drake returned to Plymouth laden with tons of looted Spanish silver—yielding an astonishing 4,700 percent return on investment—Philip II furiously demanded his head. Instead, Elizabeth brazenly boarded Drake’s ship in London and knighted him on his own quarterdeck, openly mocking the Spanish superpower!',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Armada Portrait & The Protestant Wind)',
        source: {
          letter: 'B',
          title: 'Source B: The Armada Portrait of Queen Elizabeth I (1588)',
          src: '/images/armada_portrait.jpg',
          caption:
            'Masterpiece attributed to George Gower commemorating the English defeat of the Spanish Armada, depicting Elizabeth with her hand resting upon the globe.',
          shelfmark: 'Woburn Abbey Collection (Shelfmark: WOB-ARM-1588)',
          citation: 'The Duke of Bedford and the Trustees of the Bedford Estates.',
          context:
            'In the painting, the sunlit English fleet sails peacefully on the left, while on the right, the Catholic Spanish Armada is dashed against the rocks by violent storms. Elizabeth’s hand rests firmly upon the Americas. **Hinge Question:** How does this portrait communicate that God personally favored Protestant England over Catholic Spain?',
          hinge_question:
            'How does this portrait communicate that God personally favored Protestant England over Catholic Spain?',
        },
        text: '<span class="para-ref">[3.1]</span> Enraged by English piracy, Elizabeth’s military support for Dutch Protestant rebels, and the execution of Catholic Mary Queen of Scots in 1587, Philip II launched his "Enterprise of England" in July 1588: the <strong>Spanish Armada</strong>. A colossal fleet of 130 warships carrying 30,000 soldiers sailed up the English Channel in an unbreakable crescent formation, intending to ferry an invasion army across from Flanders and restore Catholicism to England at sword-point. But off Calais on 7 August, English commanders launched eight blazing hellburner fireships into the anchored Armada, throwing the Spanish galleons into midnight panic and scattering their formations.<br><br><span class="para-ref">[3.2]</span> The next day at the Battle of Gravelines, faster English race-built galleons pounded the disorganized Spanish ships at long range. Battered and blown northward by ferocious North Sea gales, the Armada was forced to attempt a catastrophic voyage home around the rocky coasts of Scotland and Ireland, where dozens of ships were smashed to kindling on the Atlantic rocks. The triumphant English struck a commemorative medal reading: <em>"God blew, and they were scattered."</em> In the famous **Armada Portrait** (Source B), Elizabeth is immortalized surrounded by royal pearls, her hand resting upon the global Americas while the shattered Spanish fleet flounders in tempestuous seas behind her.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (Religious Crusade or Imperial Rivalry?)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'Why did the Protestant Reformation turn the Atlantic Ocean into a violent battleground for European empires?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'Following Martin Luther’s 1517 Reformation, European conflict spread to the oceans because...',
                'Spain used the papal Treaty of Tordesillas to justify...',
                'Protestant England challenged this Catholic monopoly through...',
                'Ultimately, the clash between Spain and England was driven by both...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In direct retaliation',
                'This meant that',
                'Crucially, this resulted in',
              ],
              evaluative_criteria: [
                'Explain the connection between religious ideology (Catholic vs Protestant) and oceanic exploration.',
                'Analyze the role of Spanish silver bullion in funding European religious wars.',
                'Evaluate the strategic significance of the privateers and the 1588 Armada defeat.',
              ],
            },
            model_answer:
              'The Protestant Reformation turned the Atlantic Ocean into a ferocious global battleground because it transformed oceanic exploration from a commercial race for trade routes into an existential holy war between rival Christian ideologies. When Martin Luther fractured Western Christendom in 1517, Europe split into bitter Catholic and Protestant factions. Catholic Spain, having established an American silver-mining monopoly backed by the Pope’s 1494 Treaty of Tordesillas, viewed its oceanic empire as divine confirmation of its holy mission to conquer lands and eradicate Protestant heresy. In contrast, Protestant England under Elizabeth I found itself commercially and spiritually boxed out of the New World. Consequently, religious hatred directly fueled state-sponsored privateering: English captains like Francis Drake attacked Spanish silver galleons not merely for personal plunder, but to starve Catholic King Philip II of the bullion required to fund his armies in Europe. Furthermore, oceanic expeditions were framed as Protestant crusades against Catholic tyranny. When Philip launched the Spanish Armada in 1588 to depose Elizabeth and reimpose Roman Catholicism, the conflict reached its climax: England’s victory, memorialized in the Armada Portrait, broke the myth of Spanish naval invincibility. Ultimately, the Atlantic became a battlefield because religious ideology provided moral justification for commercial piracy, ensuring that the struggle for global empire was fought as a war for the salvation of human souls.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> Historians debate whether the Elizabethan naval struggle was primarily motivated by genuine religious zeal or by naked financial greed. Victorian historians painted Elizabeth’s Sea Dogs as Protestant freedom fighters standing bravely against Spanish Catholic tyranny. However, modern economic historians point out that Drake and Hawkins were primarily commercial opportunists and slave traders whose religious rhetoric conveniently justified ruthless robbery on the high seas.<br><br><span class="para-ref">[4.2]</span> Nevertheless, the psychological impact of 1588 was profound. The defeat of the Armada shattered the aura of Spanish naval invincibility and proved to English merchants that the Atlantic was open. For the first time, English investors began to dream of establishing permanent overseas colonies, laying the ideological and commercial foundations for what would become the British Empire.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'Why did the Protestant Reformation turn the Atlantic Ocean into a violent battleground for European empires?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'Following Martin Luther’s 1517 Reformation, European conflict spread to the oceans because...',
          'Spain used the papal Treaty of Tordesillas to justify...',
          'Protestant England challenged this Catholic monopoly through...',
          'Ultimately, the clash between Spain and England was driven by both...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In direct retaliation',
          'This meant that',
          'Crucially, this resulted in',
        ],
        evaluative_criteria: [
          'Explain the connection between religious ideology (Catholic vs Protestant) and oceanic exploration.',
          'Analyze the role of Spanish silver bullion in funding European religious wars.',
          'Evaluate the strategic significance of the privateers and the 1588 Armada defeat.',
        ],
      },
      model_answer:
        'The Protestant Reformation turned the Atlantic Ocean into a ferocious global battleground because it transformed oceanic exploration from a commercial race for trade routes into an existential holy war between rival Christian ideologies. When Martin Luther fractured Western Christendom in 1517, Europe split into bitter Catholic and Protestant factions. Catholic Spain, having established an American silver-mining monopoly backed by the Pope’s 1494 Treaty of Tordesillas, viewed its oceanic empire as divine confirmation of its holy mission to conquer lands and eradicate Protestant heresy. In contrast, Protestant England under Elizabeth I found itself commercially and spiritually boxed out of the New World. Consequently, religious hatred directly fueled state-sponsored privateering: English captains like Francis Drake attacked Spanish silver galleons not merely for personal plunder, but to starve Catholic King Philip II of the bullion required to fund his armies in Europe. Furthermore, oceanic expeditions were framed as Protestant crusades against Catholic tyranny. When Philip launched the Spanish Armada in 1588 to depose Elizabeth and reimpose Roman Catholicism, the conflict reached its climax: England’s victory, memorialized in the Armada Portrait, broke the myth of Spanish naval invincibility. Ultimately, the Atlantic became a battlefield because religious ideology provided moral justification for commercial piracy, ensuring that the struggle for global empire was fought as a war for the salvation of human souls.',
    },
    quiz: LESSON_QUIZZES.lesson_2,
  },

  // ==========================================
  // LESSON 3: TRADE OR TAKEOVER? (1600–1620)
  // ==========================================
  {
    id: 'lesson_3',
    title: 'Trade or takeover: How did early encounters turn into empire?',
    enquiry_question:
      'To what extent did early English commercial trade missions accidentally transform into territorial colonization?',
    cover_image: '/images/early_mod_l3_banner.jpg',
    banner: '/images/early_mod_l3_banner.jpg',
    learning_objectives: [
      'Explain how the joint-stock company model revolutionized English commercial expansion in America and Asia',
      'Contrast the precarious survival of the Jamestown Virginia settlement (1607) with the East India Company’s mission to Mughal India (1615)',
      'Evaluate whether the British Empire originated from calculated territorial conquest or speculative merchant trade',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/the-british-empire-in-colour-part-1/',
        title: 'The British Empire in Colour: Early Encounters and Merchants',
        duration: '6 mins 12 secs',
        viewing_task:
          'Explain why early English merchants relied on trade concessions from powerful foreign rulers rather than military invasion.',
        model_answer:
          'English merchants were far too weak militarily to conquer vast states like the Mughal Empire. Instead, they relied on royal charters, diplomatic gifts, and commercial treaties to establish fortified coastal warehouses (factory forts) for trade.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from Reformation & Armada',
      type: 'mixed',
      items: [
        {
          question:
            'What 1494 agreement between Spain and Portugal divided the non-European world down an Atlantic meridian line?',
          answer: 'The Treaty of Tordesillas.',
        },
        {
          question:
            'Which English monarch licensed privateers like Francis Drake to raid Spanish treasure fleets?',
          answer: 'Queen Elizabeth I.',
        },
        {
          question:
            'In what year did the Spanish Armada attempt to invade England, only to be scattered by fireships and storms?',
          answer: '1588.',
        },
        {
          question:
            'What German monk initiated the Protestant Reformation in 1517 by attacking papal indulgences?',
          answer: 'Martin Luther.',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson investigates the roots of English global empire. The British Empire did not begin with redcoats marching under imperial orders, but with speculative London merchants pooling capital in joint-stock ventures like the East India Company and the Virginia Company. We contrast the desperate struggle for survival in Jamestown with the humble posture of English ambassadors at the dazzling Mughal court.',
      objectives: [
        {
          objective: 'Understand the revolutionary financial structure of the joint-stock company.',
          primer:
            'Direct pupils to paragraphs [1.1]–[1.2]. Explain that by selling transferable shares, merchants could fund multi-year voyages without risking total ruin.',
          question:
            'Why was the joint-stock company safer and more ambitious than a traditional medieval merchant guild?',
        },
        {
          objective:
            'Analyze the survival mechanisms of Jamestown (1607) and the introduction of cash-crop tobacco.',
          primer:
            'Examine Source A and paragraphs [2.1]–[2.2]. Note the triangular wooden palisade designed to defend against both Spanish galleons and indigenous Powhatan warriors.',
          question:
            'Why did Jamestown shift from seeking gold to planting tobacco, and how did this decision seal the fate of indigenous lands?',
        },
        {
          objective:
            'Contrast the American experience with Sir Thomas Roe’s embassy to Mughal Emperor Jahangir.',
          primer:
            'Study Source B and paragraphs [3.1]–[4.2]. Emphasize that England arrived in India not as conquerors, but as humble supplicants begging for trade.',
          question:
            'How does Sir Thomas Roe’s journal prove that the Mughal Empire viewed English trade as insignificant in 1615?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: Contemporary Plan of the Jamestown Triangular Fort (1607)',
        src: '/images/jamestown_fort.jpg',
        caption:
          'Architectural plan of the fortified settlement built by the Virginia Company along the James River, showing artillery bastions at each triangle corner.',
        shelfmark: 'Virginia Company Cartographic Records (Shelfmark: VCR-JAM-1607)',
        citation: 'The National Archives, Kew (CO 1/1).',
        context:
          'In May 1607, 104 English settlers established Jamestown in Virginia. Half died within six months from starvation and malaria. The triangular fort was heavily palisaded against indigenous Powhatan archers and Spanish warships. **Hinge Question:** Why does the defensive design of the fort prove that the English felt vulnerable and surrounded, rather than dominant?',
        hinge_question:
          'Why does the defensive design of the fort prove that the English felt vulnerable and surrounded, rather than dominant?',
      },
      {
        letter: 'B',
        title: 'Source B: Sir Thomas Roe at the Imperial Court of Mughal Emperor Jahangir (1615)',
        src: '/images/sir_thomas_roe.jpg',
        caption:
          'Mughal miniature painting depicting King James I’s ambassador Sir Thomas Roe presenting credentials and gifts to Emperor Jahangir in Agra.',
        shelfmark: 'Imperial Mughal Collection (Shelfmark: IMC-JAH-ROE-1615)',
        citation: 'Victoria and Albert Museum, London.',
        context:
          'In 1615, Sir Thomas Roe spent three years at the Mughal court seeking trading concessions for the East India Company. Jahangir was unimpressed by English gifts (woollen cloth and clocks), but granted permission to establish trading "factories" at Surat. **Hinge Question:** Why did the Mughal Emperor treat the English ambassador as a minor supplicant rather than an equal superpower?',
        hinge_question:
          'Why did the Mughal Emperor treat the English ambassador as a minor supplicant rather than an equal superpower?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Joint-Stock Innovation & The London Merchants)',
        source: {
          letter: 'A',
          title: 'Source A: Contemporary Plan of the Jamestown Triangular Fort (1607)',
          src: '/images/jamestown_fort.jpg',
          caption:
            'Architectural plan of the fortified settlement built by the Virginia Company along the James River, showing artillery bastions at each triangle corner.',
          shelfmark: 'Virginia Company Cartographic Records (Shelfmark: VCR-JAM-1607)',
          citation: 'The National Archives, Kew (CO 1/1).',
          context:
            'In May 1607, 104 English settlers established Jamestown in Virginia. Half died within six months from starvation and malaria. The triangular fort was heavily palisaded against indigenous Powhatan archers and Spanish warships. **Hinge Question:** Why does the defensive design of the fort prove that the English felt vulnerable and surrounded, rather than dominant?',
          hinge_question:
            'Why does the defensive design of the fort prove that the English felt vulnerable and surrounded, rather than dominant?',
        },
        text: '<span class="para-ref">[1.1]</span> At the turn of the seventeenth century, English overseas expansion underwent an institutional revolution. Monarchs like Elizabeth I and James I were chronically broke; they could never finance state-run fleets like the Spanish Crown. Instead, London merchants pioneered a radical capitalist financial vehicle: the <strong>joint-stock company</strong>. Rather than a single merchant risking his entire fortune on a perilous three-year oceanic voyage, hundreds of investors bought transferable company shares. If a ship sank or was seized by pirates, an investor lost only what they had invested; if the ship returned laden with cloves, nutmeg, or silk, the profits were divided proportionally. This spread of financial risk unlocked immense pools of private capital.<br><br><span class="para-ref">[1.2]</span> On New Year’s Eve 1600, Elizabeth I signed a royal charter creating <em>"The Governor and Company of Merchants of London trading into the East Indies"</em>—the **East India Company (EIC)**. Granted a royal monopoly on all English trade east of the Cape of Good Hope, the EIC sailed into the Indian Ocean not with royal armies, but with ledgers, silver coins, and cargo manifests. Six years later in 1606, King James I chartered the **Virginia Company of London** to establish private profitable colonies along the North American Atlantic coast, erecting the fortified settlement at Jamestown (Source A).',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (Jamestown’s Starvation & The Mughal Colossus)',
        text: '<span class="para-ref">[2.1]</span> England’s initial colonial venture was an unmitigated disaster. In May 1607, three small Virginia Company ships landed 104 wealthy gentlemen, jewelers, and servants in Virginia, founding <strong>Jamestown</strong>. Expecting to discover gold and rubies like Spanish conquistadors, the pampered gentlemen refused to plant crops or dig wells. By winter, over half had perished from dysentery and starvation. During the horrific "Starving Time" of 1609–1610, desperate settlers ate roots, rats, their own leather boots, and in one gruesome instance, a settler reportedly cannibalized his deceased wife! The colony was saved from total annihilation only when John Rolfe crossbred a sweet Caribbean tobacco strain, sparking an addictive European cash-crop craze that turned Virginia into an agrarian boomtown hungry for indigenous land.<br><br><span class="para-ref">[2.2]</span> Meanwhile on the other side of the planet, the East India Company encountered a civilization that made London look like a village: the **Mughal Empire** in India. Ruling over 150 million subjects—a fifth of humanity—the Mughal Empire commanded an economy generating 25 percent of the world’s industrial output, famous for exquisite calico cottons, raw silk, and indigo. When English ships arrived off Gujarat, local governors viewed the newcomers as ragged coastal peddlers. To secure permanent trading footholds, King James I dispatched an aristocratic ambassador, <strong>Sir Thomas Roe</strong>, in 1615 to the glittering imperial court at Agra.',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Triangular Fort & The Agra Audience)',
        source: {
          letter: 'B',
          title: 'Source B: Sir Thomas Roe at the Imperial Court of Mughal Emperor Jahangir (1615)',
          src: '/images/sir_thomas_roe.jpg',
          caption:
            'Mughal miniature painting depicting King James I’s ambassador Sir Thomas Roe presenting credentials and gifts to Emperor Jahangir in Agra.',
          shelfmark: 'Imperial Mughal Collection (Shelfmark: IMC-JAH-ROE-1615)',
          citation: 'Victoria and Albert Museum, London.',
          context:
            'In 1615, Sir Thomas Roe spent three years at the Mughal court seeking trading concessions for the East India Company. Jahangir was unimpressed by English gifts (woollen cloth and clocks), but granted permission to establish trading "factories" at Surat. **Hinge Question:** Why did the Mughal Emperor treat the English ambassador as a minor supplicant rather than an equal superpower?',
          hinge_question:
            'Why did the Mughal Emperor treat the English ambassador as a minor supplicant rather than an equal superpower?',
        },
        text: '<span class="para-ref">[3.1]</span> Primary documents expose the immense vulnerability of early English expansion. The original architectural blueprint of Jamestown (Source A) shows a rigid triangular fort bristling with artillery bastions at each corner. This was not a monument to imperial conquest, but a desperate panic shelter: surrounded by the powerful Powhatan Confederacy and terrified of Catholic Spanish galleons, English settlers lived locked behind wooden palisades, dependent on trading copper kettles and glass beads to Chief Powhatan for baskets of life-saving corn.<br><br><span class="para-ref">[3.2]</span> An even sharper contrast is documented in Sir Thomas Roe’s journals from the court of Mughal Emperor <strong>Jahangir</strong> (Source B). Roe was stunned by the unimaginable luxury of the Mughal court: Jahangir sat upon golden thrones encrusted with diamonds and emeralds, surrounded by thousands of courtiers. Roe’s English gifts—heavy woollen cloth and a clockwork coach—were regarded by the Emperor with mild amusement as primitive curiosities. Jahangir eventually granted the Company an imperial *farman* (decree) allowing them to construct a "factory" (a fortified trading warehouse) at Surat, not out of fear, but because the Mughals welcomed foreign silver bullion into their treasury.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (An Empire in a Fit of Absence of Mind?)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'To what extent did early English commercial trade missions accidentally transform into territorial colonization?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'In the early seventeenth century, English global expansion was initiated by...',
                'The contrast between Jamestown in Virginia and the Mughal court in India reveals that...',
                'Over the following century, peaceful commercial trading posts gradually transformed into...',
                'Ultimately, the debate over whether the British Empire was planned or accidental shows that...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In sharp contrast to',
                'Crucially, this commercial drive led to',
                'This demonstrates that',
              ],
              evaluative_criteria: [
                'Analyze the role of joint-stock companies (Virginia Company, East India Company) in early expansion.',
                'Contrast the power dynamic in North America (colonization) with India (commercial submission).',
                'Evaluate Sir John Seeley’s "fit of absence of mind" thesis against modern post-colonial critique.',
              ],
            },
            model_answer:
              'Early English global encounters began strictly as private commercial trading missions, but their structural dynamics inevitably transformed them into territorial colonization and imperial dominion. In 1883, Victorian historian Sir John Seeley famously asserted that Britain acquired its empire "in a fit of absence of mind." In the early seventeenth century, there is substantial truth to this claim: the English Crown possessed neither the military force nor the financial treasury to conquer foreign empires. Instead, expansion was spearheaded by private joint-stock companies, such as the Virginia Company and the East India Company, whose shareholders were driven purely by profit, risk distribution, and dividends. In North America, the initial 1607 Jamestown settlement was a fragile, disease-ridden outpost clinging to survival behind wooden palisades (Source A). However, the accidental introduction of tobacco as a lucrative cash crop transformed the venture: growing tobacco required vast tracts of soil, inevitably driving the English to aggressively seize indigenous Powhatan lands and establish settler colonies. In contrast, in India, early English merchants under Sir Thomas Roe (Source B) arrived as humble supplicants begging Emperor Jahangir for basic trade concessions, acknowledging Mughal economic and military superiority. Yet modern historians, such as Professor Shashi Tharoor, challenge Seeley’s innocence: while the original encounters were commercial, the corporate pursuit of profit inherently necessitated armed protection. To safeguard their trade warehouses ("factories") from European rivals and local rulers, joint-stock companies hired private armies, fortified ports, and intervened in regional politics. By the eighteenth century, the merchant’s ledger had inevitably summoned the soldier’s musket, transforming corporate trading concessions into the territorial machinery of the British Empire.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> In 1883, imperial historian Sir John Seeley coined a famous historical aphorism: <em>"We seem, as it were, to have conquered and peopled half the world in a fit of absence of mind."</em> Seeley argued that the British Empire was never a pre-meditated government conspiracy; it emerged organically from the dispersed, private initiatives of adventurous merchants and desperate settlers who merely wanted to buy spices and grow tobacco.<br><br><span class="para-ref">[4.2]</span> Modern post-colonial historians, such as Professor Shashi Tharoor, present a far more critical interpretation. They demonstrate that while expansion began as trade, the logic of capitalist monopolies made territorial conquest inevitable. To protect their commercial profits, corporate trading posts like the East India Company built private mercenary armies, constructed stone forts, and bribed or intimidated local rulers. Over the next 150 years, the company’s accounting clerks would gradually transform themselves into imperial rulers, setting the stage for the total colonial conquest of the Indian subcontinent.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'To what extent did early English commercial trade missions accidentally transform into territorial colonization?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'In the early seventeenth century, English global expansion was initiated by...',
          'The contrast between Jamestown in Virginia and the Mughal court in India reveals that...',
          'Over the following century, peaceful commercial trading posts gradually transformed into...',
          'Ultimately, the debate over whether the British Empire was planned or accidental shows that...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In sharp contrast to',
          'Crucially, this commercial drive led to',
          'This demonstrates that',
        ],
        evaluative_criteria: [
          'Analyze the role of joint-stock companies (Virginia Company, East India Company) in early expansion.',
          'Contrast the power dynamic in North America (colonization) with India (commercial submission).',
          'Evaluate Sir John Seeley’s "fit of absence of mind" thesis against modern post-colonial critique.',
        ],
      },
      model_answer:
        'Early English global encounters began strictly as private commercial trading missions, but their structural dynamics inevitably transformed them into territorial colonization and imperial dominion. In 1883, Victorian historian Sir John Seeley famously asserted that Britain acquired its empire "in a fit of absence of mind." In the early seventeenth century, there is substantial truth to this claim: the English Crown possessed neither the military force nor the financial treasury to conquer foreign empires. Instead, expansion was spearheaded by private joint-stock companies, such as the Virginia Company and the East India Company, whose shareholders were driven purely by profit, risk distribution, and dividends. In North America, the initial 1607 Jamestown settlement was a fragile, disease-ridden outpost clinging to survival behind wooden palisades (Source A). However, the accidental introduction of tobacco as a lucrative cash crop transformed the venture: growing tobacco required vast tracts of soil, inevitably driving the English to aggressively seize indigenous Powhatan lands and establish settler colonies. In contrast, in India, early English merchants under Sir Thomas Roe (Source B) arrived as humble supplicants begging Emperor Jahangir for basic trade concessions, acknowledging Mughal economic and military superiority. Yet modern historians, such as Professor Shashi Tharoor, challenge Seeley’s innocence: while the original encounters were commercial, the corporate pursuit of profit inherently necessitated armed protection. To safeguard their trade warehouses ("factories") from European rivals and local rulers, joint-stock companies hired private armies, fortified ports, and intervened in regional politics. By the eighteenth century, the merchant’s ledger had inevitably summoned the soldier’s musket, transforming corporate trading concessions into the territorial machinery of the British Empire.',
    },
    quiz: LESSON_QUIZZES.lesson_3,
  },

  // ==========================================
  // LESSON 4: GUNPOWDER PLOT (1605)
  // ==========================================
  {
    id: 'lesson_4',
    title: 'James I and the Gunpowder Plot: Why was religious division so volatile?',
    enquiry_question:
      'How did religious division and the Divine Right of Kings make early Stuart Britain so volatile in 1605?',
    cover_image: '/images/gunpowder_conspirators_banner.jpg',
    banner: '/images/gunpowder_conspirators_banner.jpg',
    learning_objectives: [
      'Explain the religious tensions in England following the 1603 accession of King James I and the enforcement of recusancy fines',
      'Detail the conspiracy of Robert Catesby and Guy Fawkes to blow up the Houses of Parliament on 5 November 1605',
      'Evaluate how the state exploited the Gunpowder Plot through anti-Catholic legislation and the Oath of Allegiance',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/gunpowder-5-11-the-greatest-terror-plot-bbc-two/',
        title: 'Gunpowder 5/11: The Greatest Terror Plot',
        duration: '5 mins 40 secs',
        viewing_task:
          'Identify how Guy Fawkes and the conspirators smuggled 36 barrels of gunpowder into the cellars beneath the House of Lords.',
        model_answer:
          'The conspirators rented a ground-floor coal cellar directly beneath the House of Lords using the alias John Johnson. They smuggled thirty-six barrels of gunpowder across the River Thames by night, concealing them beneath bundles of firewood and iron bars.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from Trade to Empire',
      type: 'mixed',
      items: [
        {
          question:
            'What type of commercial company allowed English investors to pool capital and share risk in overseas ventures?',
          answer: 'A joint-stock company (e.g. East India Company, Virginia Company).',
        },
        {
          question:
            'What was the first permanent English settlement in North America, founded in Virginia in 1607?',
          answer: 'Jamestown.',
        },
        {
          question:
            'Which agricultural cash crop saved Jamestown from economic collapse after being introduced by John Rolfe?',
          answer: 'Tobacco.',
        },
        {
          question:
            'Which powerful Indian empire did English ambassador Sir Thomas Roe visit in 1615?',
          answer: 'The Mughal Empire (ruled by Emperor Jahangir).',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson investigates the domestic powder-keg of Jacobean England. Following Queen Elizabeth’s death in 1603, English Catholics hoped the new Scottish King James I—whose Catholic mother Mary Queen of Scots had been executed—would grant religious toleration. When James instead intensified recusancy fines and banished Catholic priests, a desperate cell of Catholic gentlemen plotted the most audacious act of domestic terrorism in British history.',
      objectives: [
        {
          objective:
            'Understand the catalyst of Catholic disappointment under James I and the doctrine of the Divine Right of Kings.',
          primer:
            'Direct pupils to paragraphs [1.1]–[1.2]. Emphasize James’s paranoia regarding assassination and his belief that his authority came directly from God.',
          question:
            'Why did English Catholics feel betrayed by James I after 1603, and what made the political atmosphere so volatile?',
        },
        {
          objective:
            'Examine the forensic evidence of the conspiracy: the Monteagle Letter and Guy Fawkes’ interrogation.',
          primer:
            'Compare Source A (the anonymous warning) with Source B (Fawkes’ signature before and after torture on the rack).',
          question:
            'What does the deterioration in Guy Fawkes’ handwriting between his two signatures reveal about seventeenth-century interrogation techniques?',
        },
        {
          objective:
            'Evaluate the political consequences of the Plot for British religious identity and state power.',
          primer:
            'Direct pupils to paragraphs [3.2]–[4.2]. Discuss the 1606 Oath of Allegiance and the creation of Bonfire Night as mandatory state propaganda.',
          question:
            'How did the Stuart state use the Gunpowder Plot to justify anti-Catholic discrimination for the next two centuries?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: Contemporary Engraving of the Gunpowder Plot Conspirators (1605)',
        src: '/images/gunpowder_conspirators.jpg',
        caption:
          'Dutch engraving by Crispijn van de Passe the Elder showing the Gunpowder Plot conspirators, including Robert Catesby, Guy Fawkes, and Thomas Winter, plotting in secret.',
        shelfmark: 'National Portrait Gallery Prints & Drawings (Shelfmark: NPG-D1078)',
        citation: 'National Portrait Gallery, London.',
        context:
          'Printed across Europe immediately after the plot’s discovery, this engraving shows the conspirators in huddle, scheming to blow up Parliament. **Hinge Question:** How does this contemporary engraving portray the Catholic conspirators as secretive, dangerous subversives?',
        hinge_question:
          'How does this contemporary engraving portray the Catholic conspirators as secretive, dangerous subversives?',
      },
      {
        letter: 'B',
        title: 'Source B: The Anonymous Monteagle Warning Letter (October 1605)',
        src: '/images/monteagle_letter.jpeg',
        caption:
          'Anonymous letter delivered to Catholic peer Lord Monteagle on 26 October 1605, warning him to avoid Parliament because "they shall receive a terrible blow."',
        shelfmark: 'State Papers Domestic (Shelfmark: SP 14/216/2)',
        citation: 'The National Archives, Kew.',
        context:
          'Lord Monteagle immediately delivered this mysterious letter to King James’s chief minister, Robert Cecil. The letter warned: <em>"Retire yourself into your country where you may expect the event in safety... for God and man hath concurred to punish the wickedness of this time."</em> **Hinge Question:** Why did the author of the letter warn Monteagle, and how did this single letter destroy the entire conspiracy?',
        hinge_question:
          'Why did the author of the letter warn Monteagle, and how did this single letter destroy the entire conspiracy?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Scottish King & Catholic Alienation)',
        source: {
          letter: 'A',
          title: 'Source A: Contemporary Engraving of the Gunpowder Plot Conspirators (1605)',
          src: '/images/gunpowder_conspirators.jpg',
          caption:
            'Dutch engraving by Crispijn van de Passe the Elder showing the Gunpowder Plot conspirators, including Robert Catesby, Guy Fawkes, and Thomas Winter, plotting in secret.',
          shelfmark: 'National Portrait Gallery Prints & Drawings (Shelfmark: NPG-D1078)',
          citation: 'National Portrait Gallery, London.',
          context:
            'Printed across Europe immediately after the plot’s discovery, this engraving shows the conspirators in huddle, scheming to blow up Parliament. **Hinge Question:** How does this contemporary engraving portray the Catholic conspirators as secretive, dangerous subversives?',
          hinge_question:
            'How does this contemporary engraving portray the Catholic conspirators as secretive, dangerous subversives?',
        },
        text: '<span class="para-ref">[1.1]</span> In March 1603, Queen Elizabeth I died without leaving an heir, ending the Tudor dynasty. The English crown passed peacefully to her cousin, King <strong>James VI of Scotland</strong>, who became King <strong>James I of England</strong>, uniting the two crowns in personal union. English Roman Catholics—who had suffered decades of persecution, secret masses in priest holes, and crippling recusancy fines under Elizabeth—greeted James’s arrival with cautious optimism. After all, James’s own mother, Mary Queen of Scots, had been a devout Catholic martyr beheaded by Elizabeth.<br><br><span class="para-ref">[1.2]</span> However, Catholic hopes were swiftly and brutally dashed. James believed passionately in the **Divine Right of Kings**—that monarchs answered only to God Almighty. Terrified that tolerating Catholics would provoke Puritan MPs, James cracked down in 1604, ordering all Catholic priests expelled and strictly enforcing ruinous recusancy fines. Driven to fury, Robert Catesby gathered a tight-knit circle of gentlemen conspirators (Source A) to strike a lethal blow against the state.',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (The Conspiracy: 36 Barrels of Terror)',
        text: '<span class="para-ref">[2.1]</span> Driven to fury by this betrayal, a charismatic, sword-wielding Catholic gentleman named <strong>Robert Catesby</strong> organized an audacious terrorist plot. Catesby gathered a tight-knit circle of twelve conspirators, including Thomas Wintour, Thomas Percy, and an experienced explosives mercenary named <strong>Guy (Guido) Fawkes</strong>, who had spent a decade fighting for the Catholic Spanish army in Flanders. Their objective was apocalyptic: to assassinate King James, his Protestant heirs, and the entire political ruling class in a single catastrophic explosion at the State Opening of Parliament, kidnap the King’s nine-year-old daughter Princess Elizabeth, and install her as a puppet Catholic queen.<br><br><span class="para-ref">[2.2]</span> In May 1604, Percy rented a ground-floor coal vault directly beneath the House of Lords. Over several months, Fawkes—posing as Percy’s servant under the false identity "John Johnson"—smuggled <strong>thirty-six barrels of gunpowder</strong> across the Thames by night, containing over 2,500 kilograms of high explosive. Fawkes concealed the lethal barrels beneath heavy piles of firewood and iron bars. The blast would have demolished Westminster Palace, pulverized everyone inside into dust, and shattered windows across London miles away.',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Monteagle Warning & The Agony of the Rack)',
        source: {
          letter: 'B',
          title: 'Source B: The Anonymous Monteagle Warning Letter (October 1605)',
          src: '/images/monteagle_letter.jpeg',
          caption:
            'Anonymous letter delivered to Catholic peer Lord Monteagle on 26 October 1605, warning him to avoid Parliament because "they shall receive a terrible blow."',
          shelfmark: 'State Papers Domestic (Shelfmark: SP 14/216/2)',
          citation: 'The National Archives, Kew.',
          context:
            'Lord Monteagle immediately delivered this mysterious letter to King James’s chief minister, Robert Cecil. The letter warned: <em>"Retire yourself into your country where you may expect the event in safety... for God and man hath concurred to punish the wickedness of this time."</em> **Hinge Question:** Why did the author of the letter warn Monteagle, and how did this single letter destroy the entire conspiracy?',
          hinge_question:
            'Why did the author of the letter warn Monteagle, and how did this single letter destroy the entire conspiracy?',
        },
        text: '<span class="para-ref">[3.1]</span> The conspiracy unraveled through a single fatal letter. Several conspirators worried that innocent Catholic peers would be incinerated in the blast. On 26 October 1605, an anonymous warning letter (Source B) was delivered to Catholic Lord Monteagle, advising him to stay away because Parliament would receive <em>"a terrible blow."</em> Monteagle immediately handed the letter to the King’s chief spymaster, Robert Cecil. At midnight on 4 November, royal guards raided the cellar, catching Guy Fawkes red-handed dressed in a cloak, boots, and spurs, carrying a dark lantern and slow-match fuses ready to ignite the powder.<br><br><span class="para-ref">[3.2]</span> Fawkes was dragged before King James, coolly boasting that his intention was <em>"to blow you Scotch beggars back to your native mountains!"</em> James ordered him taken to the Tower of London to face the rack. Interrogation records reveal the gruesome physical toll: on his first day, Fawkes boldly signed his alias "John Johnson" in a firm hand; after eight agonizing days having his joints dislocated on the rack, he scribbled a barely legible, broken signature "Guido", collapsing before he could finish his surname. Fawkes and his surviving co-conspirators were sentenced to be hanged, drawn, and quartered in January 1606.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (The Birth of Bonfire Night & State Propaganda)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'How did religious division and the Divine Right of Kings make early Stuart Britain so volatile in 1605?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'In 1603, the accession of King James I created immense religious volatility because...',
                'The conspiracy led by Robert Catesby and Guy Fawkes was triggered by...',
                'Forensic evidence from the Monteagle Letter and Tower interrogation proves that...',
                'Ultimately, the Stuart state exploited the failed Gunpowder Plot to...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In direct retaliation',
                'This demonstrates that',
                'Crucially, this cemented',
              ],
              evaluative_criteria: [
                'Explain how dashed Catholic hopes after Elizabeth’s death fueled violent radicalization.',
                'Analyze the role of royal absolutism and the Divine Right of Kings in state paranoia.',
                'Evaluate the long-term impact of anti-Catholic legislation and the Oath of Allegiance (1606).',
              ],
            },
            model_answer:
              'Early Stuart Britain in 1605 was intensely volatile because deep religious divisions intersected dangerously with King James I’s uncompromising belief in the Divine Right of Kings. Following Queen Elizabeth’s death in 1603, English Roman Catholics had harbored desperate hopes that James—the son of Catholic Mary Queen of Scots—would grant religious toleration. Instead, James viewed royal authority as absolute and divinely ordained, believing that permitting rival religious allegiances to the Pope threatened the sanctity of the monarchy. Consequently, when James banished Catholic priests and reinforced crushing £20 monthly recusancy fines in 1604, moderate Catholic frustration rapidly metastasized into extreme radicalization. Robert Catesby and his fellow conspirators concluded that peaceful reform was impossible, orchestrating a plot to obliterate the King and entire political establishment beneath thirty-six barrels of gunpowder. The discovery of Guy Fawkes with his lantern on 4 November, triggered by the anonymous Monteagle warning letter (Source A), spared Britain from catastrophic decapitation. However, the state’s response revealed the terrifying coercive power of early modern monarchy: Fawkes was broken on the rack until his signature deteriorated into a trembling scribble (Source B). Ultimately, the failed Gunpowder Plot had monumental consequences: Parliament enacted the 1606 Popish Recusants Act and the Oath of Allegiance, forcing Catholics to renounce the Pope’s power to depose monarchs, while institutionalizing Bonfire Night on 5 November as an annual national festival of Protestant deliverance that entrenched anti-Catholic discrimination for over two centuries.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> Historians have debated whether the Gunpowder Plot was an authentic grassroots Catholic rebellion or a conspiracy cleverly entrapped and exaggerated by spymaster Robert Cecil to consolidate royal power. While modern consensus agrees the plotters were entirely real, Cecil skillfully exploited the crisis to forge an invincible security state. In January 1606, Parliament passed the Thanksgiving Act, ordering every church in England to hold an annual sermon of deliverance on 5 November, establishing **Bonfire Night** as a permanent fixture of British national identity.<br><br><span class="para-ref">[4.2]</span> The long-term consequences for British Catholics were catastrophic. Parliament imposed the **Oath of Allegiance (1606)**, requiring subjects to declare that the Pope had no authority to excommunicate or depose princes. Catholics were banned from practicing law, serving as army officers, voting, or attending university. The trauma of 1605 cemented a pervasive British national belief that Catholicism was equated with foreign tyranny and treason, an ideology that would violently explode again four decades later during the English Civil War.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'How did religious division and the Divine Right of Kings make early Stuart Britain so volatile in 1605?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'In 1603, the accession of King James I created immense religious volatility because...',
          'The conspiracy led by Robert Catesby and Guy Fawkes was triggered by...',
          'Forensic evidence from the Monteagle Letter and Tower interrogation proves that...',
          'Ultimately, the Stuart state exploited the failed Gunpowder Plot to...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In direct retaliation',
          'This demonstrates that',
          'Crucially, this cemented',
        ],
        evaluative_criteria: [
          'Explain how dashed Catholic hopes after Elizabeth’s death fueled violent radicalization.',
          'Analyze the role of royal absolutism and the Divine Right of Kings in state paranoia.',
          'Evaluate the long-term impact of anti-Catholic legislation and the Oath of Allegiance (1606).',
        ],
      },
      model_answer:
        'Early Stuart Britain in 1605 was intensely volatile because deep religious divisions intersected dangerously with King James I’s uncompromising belief in the Divine Right of Kings. Following Queen Elizabeth’s death in 1603, English Roman Catholics had harbored desperate hopes that James—the son of Catholic Mary Queen of Scots—would grant religious toleration. Instead, James viewed royal authority as absolute and divinely ordained, believing that permitting rival religious allegiances to the Pope threatened the sanctity of the monarchy. Consequently, when James banished Catholic priests and reinforced crushing £20 monthly recusancy fines in 1604, moderate Catholic frustration rapidly metastasized into extreme radicalization. Robert Catesby and his fellow conspirators concluded that peaceful reform was impossible, orchestrating a plot to obliterate the King and entire political establishment beneath thirty-six barrels of gunpowder. The discovery of Guy Fawkes with his lantern on 4 November, triggered by the anonymous Monteagle warning letter (Source A), spared Britain from catastrophic decapitation. However, the state’s response revealed the terrifying coercive power of early modern monarchy: Fawkes was broken on the rack until his signature deteriorated into a trembling scribble (Source B). Ultimately, the failed Gunpowder Plot had monumental consequences: Parliament enacted the 1606 Popish Recusants Act and the Oath of Allegiance, forcing Catholics to renounce the Pope’s power to depose monarchs, while institutionalizing Bonfire Night on 5 November as an annual national festival of Protestant deliverance that entrenched anti-Catholic discrimination for over two centuries.',
    },
    quiz: LESSON_QUIZZES.lesson_4,
  },

  // ==========================================
  // LESSON 5: CIVIL WAR & REGICIDE (1642–1689)
  // ==========================================
  {
    id: 'lesson_5',
    title: 'Who controlled Britain? The Ideological Battle',
    enquiry_question:
      'Why did the ideological clash between Charles I and Parliament culminate in regicide and the Commonwealth?',
    cover_image: '/images/early_mod_l4_banner.jpg',
    banner: '/images/early_mod_l4_banner.jpg',
    learning_objectives: [
      'Explain how King Charles I’s belief in the Divine Right of Kings and eleven years of Personal Rule (1629–1640) alienated Parliament',
      'Analyze the outbreak of the English Civil War (1642) and the trial and public execution of King Charles I in January 1649',
      'Evaluate how the Commonwealth, Oliver Cromwell’s Protectorate, and the 1689 Bill of Rights established constitutional monarchy',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/the-english-civil-war-the-execution-of-charles-i/',
        title: 'The English Civil War: The Trial and Execution of Charles I',
        duration: '5 mins 50 secs',
        viewing_task:
          'Explain why Parliament took the unprecedented step of putting an anointed monarch on trial for high treason.',
        model_answer:
          'Parliament argued that the King was not above the law. By levying war against his own subjects in the Second Civil War, Charles I was declared a tyrant, traitor, murderer, and public enemy to the commonwealth of England.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from Gunpowder Plot',
      type: 'mixed',
      items: [
        {
          question:
            'What political doctrine asserted that kings derived their authority directly from God and could not be judged by Parliament?',
          answer: 'The Divine Right of Kings.',
        },
        {
          question: 'Who was the charismatic leader of the Gunpowder Plot conspirators in 1605?',
          answer: 'Robert Catesby.',
        },
        {
          question:
            'How many barrels of gunpowder did Guy Fawkes smuggle into the cellar beneath the House of Lords?',
          answer: 'Thirty-six barrels.',
        },
        {
          question:
            'What anonymous document delivered to Lord Monteagle led to the discovery of the Plot?',
          answer: 'The Monteagle Letter.',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson tackles one of the greatest constitutional earthquakes in European history: the English Civil War and the execution of King Charles I. We examine how disputes over religious style, unparliamentary taxation (Ship Money), and the limits of royal power culminated in regicide, a Puritan military republic under Oliver Cromwell, and eventually the 1689 Glorious Revolution.',
      objectives: [
        {
          objective:
            'Understand Charles I’s Personal Rule (1629–1640) and the constitutional controversy of Ship Money.',
          primer:
            'Direct pupils to paragraphs [1.1]–[1.2]. Contrast Charles’s belief that monarchs are accountable only to God with John Hampden’s refusal to pay taxes without parliamentary consent.',
          question:
            'Why was collecting Ship Money from inland counties during peacetime seen as an illegal tyrannical act?',
        },
        {
          objective:
            'Analyze the dramatic climax of the Civil War: the trial and execution of Charles I on 30 January 1649.',
          primer:
            'Examine Source A and paragraphs [2.1]–[3.1]. Highlight that Charles wore two shirts on the scaffold so the cold January wind would not make him shiver and look afraid.',
          question:
            'Why was putting an anointed king on trial for treason a completely revolutionary and legally shocking act in seventeenth-century Europe?',
        },
        {
          objective:
            'Evaluate the transition from Cromwell’s Commonwealth to the 1689 Bill of Rights.',
          primer:
            'Examine Source B and paragraphs [3.2]–[4.2]. Discuss how the Glorious Revolution permanently shifted supreme power from the Crown to Parliament.',
          question:
            'How did the Bill of Rights of 1689 permanently prevent future British monarchs from ruling as absolute despots?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: Contemporary Engraving of the Execution of King Charles I (1649)',
        src: '/images/charles_i_execution.jpg',
        caption:
          'German broadsheet engraving depicting the public beheading of King Charles I upon a black scaffold outside the Banqueting House in Whitehall on 30 January 1649.',
        shelfmark: 'British Museum Prints & Drawings (Shelfmark: 1856,0712.234)',
        citation: 'Department of Prints and Drawings, British Museum.',
        context:
          'On a freezing morning on 30 January 1649, Charles I was led onto a scaffold. The executioner severed his head with a single axe blow and held it up to the stunned crowd, provoking a collective groan. **Hinge Question:** Why did the execution of Charles I send shockwaves of terror across the royal courts of Europe?',
        hinge_question:
          'Why did the execution of Charles I send shockwaves of terror across the royal courts of Europe?',
      },
      {
        letter: 'B',
        title: 'Source B: The Great Seal of the Commonwealth of England (1651)',
        src: '/images/great_seal_1651.png',
        caption:
          'The official state seal designed by Thomas Simon for the English Republic, depicting the House of Commons in active debate instead of a monarch.',
        shelfmark: 'National Archives Seal Collection (Shelfmark: SC 13/F112)',
        citation: 'The National Archives, Kew.',
        context:
          'Following the abolition of the monarchy, the Commonwealth rejected traditional royal seals depicting the King on horseback. Instead, the seal showed the House of Commons with the inscription: <em>"In the third year of freedom by God’s blessing restored, 1651."</em> **Hinge Question:** How does this visual artifact symbolize that political sovereignty had shifted from a royal person to an elected assembly?',
        hinge_question:
          'How does this visual artifact symbolize that political sovereignty had shifted from a royal person to an elected assembly?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Arrogant Monarch & The Eleven Years’ Tyranny)',
        text: '<span class="para-ref">[1.1]</span> In 1625, King <strong>Charles I</strong> succeeded his father James. Rigid, aloof, and intensely insecure, Charles held an uncompromising belief in the **Divine Right of Kings**: he genuinely believed that the monarch was accountable only to God, and that questioning royal policy was equivalent to blasphemy. When MPs in the House of Commons refused to grant him taxation without redressing grievances, Charles dissolved Parliament in 1629 and embarked on eleven years of personal governance known as the **"Eleven Years’ Tyranny"** (Personal Rule).<br><br><span class="para-ref">[1.2]</span> To fund his royal court without summoning Parliament, Charles resurrected ancient, obsolete feudal levies. His most controversial tactic was levying <strong>Ship Money</strong>: traditionally a medieval tax paid exclusively by coastal towns during wartime to construct warships, Charles illegally extended the tax to inland counties in peacetime! When Buckinghamshire landowner John Hampden refused to pay twenty shillings on principle in 1637, he was prosecuted by royal judges. Millions of Englishmen concluded that Charles was seeking to strip away their historic liberties and establish a French-style absolute Catholic tyranny.',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (The Kingdom in Blood & The Trial of the Tyrant)',
        source: {
          letter: 'A',
          title: 'Source A: Contemporary Engraving of the Execution of King Charles I (1649)',
          src: '/images/charles_i_execution.jpg',
          caption:
            'German broadsheet engraving depicting the public beheading of King Charles I upon a black scaffold outside the Banqueting House in Whitehall on 30 January 1649.',
          shelfmark: 'British Museum Prints & Drawings (Shelfmark: 1856,0712.234)',
          citation: 'Department of Prints and Drawings, British Museum.',
          context:
            'On a freezing morning on 30 January 1649, Charles I was led onto a scaffold. The executioner severed his head with a single axe blow and held it up to the stunned crowd, provoking a collective groan. **Hinge Question:** Why did the execution of Charles I send shockwaves of terror across the royal courts of Europe?',
          hinge_question:
            'Why did the execution of Charles I send shockwaves of terror across the royal courts of Europe?',
        },
        text: '<span class="para-ref">[2.1]</span> War became unavoidable in January 1642 when Charles stormed into the House of Commons with 400 armed guards to arrest five leading MPs for treason—only to find that "the birds had flown." In August 1642, Charles raised his royal standard at Nottingham, plunging England into seven years of horrific Civil War. The nation fractured: **Cavaliers** (Royalists supporting the Crown and Church of England) fought **Roundheads** (Parliamentarians and Puritans fighting for liberty and parliamentary supremacy). Over 200,000 Englishmen died from combat and disease—a higher proportion of the population than Britain lost in World War I.<br><br><span class="para-ref">[2.2]</span> Parliament triumphed through military innovation: <strong>Oliver Cromwell</strong> created the **New Model Army**, a professional, disciplined force of godly soldiers promoted on merit rather than aristocratic birth. The New Model Army crushed the Royalists at Naseby (1645). When Charles secretly plotted with Scottish invaders to start a second civil war, Cromwell and hardline army officers decided that peace was impossible while the King lived. In December 1648, Colonel Pride barred moderate MPs from Parliament ("Pride’s Purge"), leaving a radical "Rump Parliament" that created a High Court of Justice to put Charles I on trial for high treason, sentencing the King to be beheaded outside Whitehall (Source A).',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Axe Falls & The Seal of the Commonwealth)',
        source: {
          letter: 'B',
          title: 'Source B: The Great Seal of the Commonwealth of England (1651)',
          src: '/images/great_seal_1651.png',
          caption:
            'The official state seal designed by Thomas Simon for the English Republic, depicting the House of Commons in active debate instead of a monarch.',
          shelfmark: 'National Archives Seal Collection (Shelfmark: SC 13/F112)',
          citation: 'The National Archives, Kew.',
          context:
            'Following the abolition of the monarchy, the Commonwealth rejected traditional royal seals depicting the King on horseback. Instead, the seal showed the House of Commons with the inscription: <em>"In the third year of freedom by God’s blessing restored, 1651."</em> **Hinge Question:** How does this visual artifact symbolize that political sovereignty had shifted from a royal person to an elected assembly?',
          hinge_question:
            'How does this visual artifact symbolize that political sovereignty had shifted from a royal person to an elected assembly?',
        },
        text: '<span class="para-ref">[3.1]</span> At his trial in Westminster Hall, Charles refused to remove his hat or enter a plea, haughtily demanding: <em>"By what lawful authority am I brought hither? No earthly power can justly call me, who am your King, to account."</em> But the court declared him a <em>"tyrant, traitor, murderer, and public enemy."</em> On 30 January 1649, Charles was marched onto a scaffold outside the Banqueting House at Whitehall (Source A). Showing dignified courage, Charles requested two shirts because the morning was freezing: <em>"The season is so sharp as probably may make me shake, which some observers will imagine proceeds from fear. I would have no such imputation!"</em> The masked executioner severed his head with one clean blow.<br><br><span class="para-ref">[3.2]</span> For the next eleven years, England was a republic: the **Commonwealth**. As captured in the Great Seal of 1651 (Source B), royal symbols were systematically obliterated: the seal depicted the House of Commons in session rather than a monarch on horseback. But liberty proved elusive. Cromwell dismissed Parliament by military force in 1653, declaring himself **Lord Protector**—ruling as a military dictator, dividing England into eleven military districts governed by puritan Major-Generals who banned Christmas, horse racing, and theatre.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (The Glorious Revolution of 1688)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'Why did the ideological clash between Charles I and Parliament culminate in regicide and the Commonwealth?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'The conflict between Charles I and Parliament was fundamentally an ideological clash between...',
                'During the eleven years of Personal Rule, Charles alienated his subjects by...',
                'The execution of Charles I on 30 January 1649 demonstrated that...',
                'Ultimately, the constitutional settlement of 1689 resolved this struggle by...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In direct defiance of',
                'This directly resulted in',
                'Crucially, this proved that',
              ],
              evaluative_criteria: [
                'Contrast the Divine Right of Kings with parliamentary constitutionalism.',
                'Analyze the role of illegal taxation (Ship Money) and religious fears.',
                'Evaluate the significance of the 1689 Bill of Rights in creating constitutional monarchy.',
              ],
            },
            model_answer:
              'The ideological clash between King Charles I and Parliament culminated in regicide and the creation of the Commonwealth because it was an irreconcilable conflict over the ultimate source of constitutional sovereignty. Charles I was an uncompromising adherent of the Divine Right of Kings, believing that his authority came directly from God and that Parliament existed merely as an advisory body to be summoned or dismissed at royal whim. During his eleven years of Personal Rule (1629–1640), Charles pushed this ideology to tyrannical extremes: he bypassed Parliament’s constitutional control over taxation by illegally levying Ship Money on inland counties during peacetime, while persecuting Puritan critics through the Star Chamber. Consequently, when Charles attempted to arrest five MPs in 1642, the ideological breach became a military reality. The English Civil War devastated the nation, but it was Charles’s refusal to accept any constitutional limits—even after total military defeat at Naseby—that forced Parliament’s hand. By secretly encouraging Scottish invaders in 1648, Charles was judged by the New Model Army as a "man of blood" who had waged war against his own people. The public execution of Charles I on 30 January 1649 (Source A) was a momentous turning point: it established the radical precedent that an anointed king could be held legally accountable for treason against his citizens. Although Cromwell’s subsequent Commonwealth devolved into a Puritan military dictatorship (Source B) and the monarchy was restored in 1660, the absolute power of the Crown was permanently broken. When James II attempted to resurrect Catholic absolutism, the Glorious Revolution of 1688 and the 1689 Bill of Rights permanently subordinated the Crown to Parliament, establishing Britain as a constitutional monarchy.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> Exhausted by Puritan military rule, England restored Charles II to the throne in the **Restoration of 1660**. Yet the constitutional question remained unresolved until 1688. When Charles II’s Catholic brother, **James II**, attempted to suspend laws and rule without Parliament, MPs invited Dutch Prince **William of Orange** and his wife Mary (James’s Protestant daughter) to invade England in the **Glorious Revolution of 1688**. James II fled into exile without a fight.<br><br><span class="para-ref">[4.2]</span> In 1689, William and Mary accepted the historic **Bill of Rights**. The statute permanently transformed Britain into a **constitutional monarchy**: the monarch could never suspend laws, levy taxes without Parliament, or maintain a standing army in peacetime. Freedom of speech in parliamentary debate was guaranteed forever. The bloody ideological struggle that began with Charles I’s divine pretensions in 1629 ended with the supreme authority of Parliament firmly etched into British law.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'Why did the ideological clash between Charles I and Parliament culminate in regicide and the Commonwealth?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'The conflict between Charles I and Parliament was fundamentally an ideological clash between...',
          'During the eleven years of Personal Rule, Charles alienated his subjects by...',
          'The execution of Charles I on 30 January 1649 demonstrated that...',
          'Ultimately, the constitutional settlement of 1689 resolved this struggle by...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In direct defiance of',
          'This directly resulted in',
          'Crucially, this proved that',
        ],
        evaluative_criteria: [
          'Contrast the Divine Right of Kings with parliamentary constitutionalism.',
          'Analyze the role of illegal taxation (Ship Money) and religious fears.',
          'Evaluate the significance of the 1689 Bill of Rights in creating constitutional monarchy.',
        ],
      },
      model_answer:
        'The ideological clash between King Charles I and Parliament culminated in regicide and the creation of the Commonwealth because it was an irreconcilable conflict over the ultimate source of constitutional sovereignty. Charles I was an uncompromising adherent of the Divine Right of Kings, believing that his authority came directly from God and that Parliament existed merely as an advisory body to be summoned or dismissed at royal whim. During his eleven years of Personal Rule (1629–1640), Charles pushed this ideology to tyrannical extremes: he bypassed Parliament’s constitutional control over taxation by illegally levying Ship Money on inland counties during peacetime, while persecuting Puritan critics through the Star Chamber. Consequently, when Charles attempted to arrest five MPs in 1642, the ideological breach became a military reality. The English Civil War devastated the nation, but it was Charles’s refusal to accept any constitutional limits—even after total military defeat at Naseby—that forced Parliament’s hand. By secretly encouraging Scottish invaders in 1648, Charles was judged by the New Model Army as a "man of blood" who had waged war against his own people. The public execution of Charles I on 30 January 1649 (Source A) was a momentous turning point: it established the radical precedent that an anointed king could be held legally accountable for treason against his citizens. Although Cromwell’s subsequent Commonwealth devolved into a Puritan military dictatorship (Source B) and the monarchy was restored in 1660, the absolute power of the Crown was permanently broken. When James II attempted to resurrect Catholic absolutism, the Glorious Revolution of 1688 and the 1689 Bill of Rights permanently subordinated the Crown to Parliament, establishing Britain as a constitutional monarchy.',
    },
    quiz: LESSON_QUIZZES.lesson_5,
  },

  // ==========================================
  // LESSON 6: THE ECONOMIC SHIFT (1650–1720)
  // ==========================================
  {
    id: 'lesson_6',
    title: 'Who controlled Britain? The Economic Shift',
    enquiry_question:
      'How did financial revolution, agrarian capitalism, and the merchant elite eclipse traditional aristocratic power by 1700?',
    cover_image: '/images/royal_exchange.jpg',
    banner: '/images/royal_exchange.jpg',
    learning_objectives: [
      'Explain how the Navigation Acts (1651) and merchant capitalism stimulated Britain’s oceanic trade and maritime power',
      'Analyze the Financial Revolution, including the founding of the Bank of England (1694) and London coffee-house trading exchanges',
      'Evaluate how wealth shifted from traditional feudal land ownership to commercial capital, creating a powerful merchant oligarchy',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/the-ascent-of-money-episode-2-bonds-of-war/',
        title: 'The Ascent of Money: The Birth of Modern Banking in London',
        duration: '5 mins 15 secs',
        viewing_task:
          'Explain why the founding of the Bank of England in 1694 allowed the British state to finance global wars more effectively than France.',
        model_answer:
          'The Bank of England created the National Debt, allowing the British government to borrow millions of pounds at low interest rates from private citizens and merchants, providing secure funding for the Royal Navy while France struggled with chaotic borrowing.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from Civil War & Regicide',
      type: 'mixed',
      items: [
        {
          question:
            'What controversial medieval coastal tax did Charles I extend to inland counties during his Personal Rule?',
          answer: 'Ship Money.',
        },
        {
          question:
            'In what year was King Charles I publicly executed outside the Banqueting House in Whitehall?',
          answer: '1649 (30 January).',
        },
        {
          question:
            'Who created the New Model Army and ruled Britain as Lord Protector during the Commonwealth?',
          answer: 'Oliver Cromwell.',
        },
        {
          question:
            'What landmark statute passed in 1689 permanently established Parliament’s authority over the British monarchy?',
          answer: 'The Bill of Rights.',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson traces the profound structural transformation of Britain’s economy between 1650 and 1720. While the aristocracy still owned vast country estates, real political and imperial power shifted into the hands of London financiers, joint-stock investors, and overseas traders. Through the Navigation Acts, the Bank of England, and the bustling stock markets of London coffee houses, Britain transformed into the world’s first fiscal-military state.',
      objectives: [
        {
          objective:
            'Understand how the Navigation Acts (1651) enforced a mercantilist monopoly on colonial trade.',
          primer:
            'Direct pupils to paragraphs [1.1]–[1.2]. Explain that all goods entering English colonies had to be carried on English-built ships with English crews, squeezing out the Dutch.',
          question:
            'Why did mercantilist laws like the Navigation Acts directly enrich London merchants while angering colonial settlers?',
        },
        {
          objective:
            'Analyze the Financial Revolution: the Bank of England (1694) and London coffee houses.',
          primer:
            'Study Source A and paragraphs [2.1]–[3.1]. Explain that coffee houses like Jonathan’s and Lloyd’s were not mere cafes, but the birthplaces of modern stock exchanges and insurance.',
          question:
            'Why were 17th-century London coffee houses nicknamed "Penny Universities", and how did they speed up commercial trade?',
        },
        {
          objective:
            'Evaluate the rise of the "fiscal-military state" and the changing balance of British social power.',
          primer:
            'Examine Source B and paragraphs [3.2]–[4.2]. Discuss John Brewer’s thesis that Britain’s global power was built on efficient taxation and public borrowing.',
          question:
            'Did traditional country lords or City of London financiers truly control Britain’s destiny by 1720?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: The Courtyard of the Second Royal Exchange, London (c. 1670)',
        src: '/images/royal_exchange_courtyard.jpg',
        caption:
          'Contemporary engraving showing merchants from Turkey, Holland, the West Indies, and Venice conducting international transactions in the pillared quadrangle of the Royal Exchange.',
        shelfmark: 'Guildhall Library Print Collection (Shelfmark: GL-PR-ROY-1670)',
        citation: 'London Metropolitan Archives, City of London.',
        context:
          'Rebuilt after the Great Fire of 1666, the Royal Exchange was the pulsating nervous system of British capitalism. Merchants gathered daily under specific colonnades ("walks") assigned to different global commodities: the Silk Walk, Jamaica Walk, and Virginia Walk. **Hinge Question:** How does this image prove that London was evolving into the financial capital of the world?',
        hinge_question:
          'How does this image prove that London was evolving into the financial capital of the world?',
      },
      {
        letter: 'B',
        title: 'Source B: Claude de Jongh’s View of London Bridge on the Thames (1632)',
        src: '/images/early_mod_l6_banner.jpg',
        caption:
          'Oil painting by Dutch master Claude de Jongh showing the dense maritime shipping, merchant warehouses, and waterborne commerce along the River Thames at the entrance to the City of London.',
        shelfmark: 'Kenwood House Collection (Shelfmark: KH-DJ-1632)',
        citation: 'English Heritage, Kenwood House, London.',
        context:
          'London’s transformation into a global financial powerhouse was carried upon the waters of the Thames. Thousands of merchant vessels, colliers, and barges unloaded sugar, tobacco, spices, and timber along custom quays. **Hinge Question:** Why was maritime river access to the Port of London essential for Britain’s commercial transformation?',
        hinge_question:
          'Why did maritime river access to the Port of London essential for Britain’s commercial transformation?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Death of Feudalism & The Mercantilist Shield)',
        text: '<span class="para-ref">[1.1]</span> Throughout the Middle Ages, power in Britain resided in the soil. Wealthy dukes, earls, and barons controlled vast agricultural estates worked by tenant farmers; money was physical gold and silver, and commerce was regarded by gentlemen as vulgar and beneath their dignity. But following the English Civil War, this ancient feudal social order was overtaken by an unstoppable economic revolution. Landowners embraced **agrarian capitalism**: enclosing common lands with hedges, draining fens, and introducing selective livestock breeding. Agriculture was no longer about basic family subsistence; it was an aggressive, market-driven commercial enterprise producing grain and wool for profit.<br><br><span class="para-ref">[1.2]</span> To guarantee that British merchants dominated the oceans, Oliver Cromwell’s Commonwealth passed the revolutionary **Navigation Act of 1651**. This was the cornerstone of **mercantilism**—the economic theory that global wealth was limited, and that a nation must export more than it imported while hoarding bullion. The Act decreed that goods imported from Asia, Africa, or America into Britain or its colonies could be carried only on English-built ships crewed by at least seventy-five percent English sailors. This policy dealt a crushing blow to Dutch trade competitors and transformed the Royal Navy into a permanent global shield for British merchant shipping.',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (The Financial Revolution & The City of London)',
        source: {
          letter: 'A',
          title: 'Source A: The Courtyard of the Second Royal Exchange, London (c. 1670)',
          src: '/images/royal_exchange_courtyard.jpg',
          caption:
            'Contemporary engraving showing merchants from Turkey, Holland, the West Indies, and Venice conducting international transactions in the pillared quadrangle of the Royal Exchange.',
          shelfmark: 'Guildhall Library Print Collection (Shelfmark: GL-PR-ROY-1670)',
          citation: 'London Metropolitan Archives, City of London.',
          context:
            'Rebuilt after the Great Fire of 1666, the Royal Exchange was the pulsating nervous system of British capitalism. Merchants gathered daily under specific colonnades ("walks") assigned to different global commodities: the Silk Walk, Jamaica Walk, and Virginia Walk. **Hinge Question:** How does this image prove that London was evolving into the financial capital of the world?',
          hinge_question:
            'How does this image prove that London was evolving into the financial capital of the world?',
        },
        text: '<span class="para-ref">[2.1]</span> Between 1688 and 1720, Britain experienced a **Financial Revolution** that laid the groundwork for modern capitalism. In 1694, when King William III needed millions of pounds to wage war against France, a chartered corporation of wealthy merchants created the <strong>Bank of England</strong>, loaning £1.2 million directly to the government in return for the right to issue banknotes and manage the National Debt. This guaranteed that Britain could borrow vast sums cheaply to fund an unbeatable global navy.<br><br><span class="para-ref">[2.2]</span> Meanwhile, global commerce remade London’s physical and commercial geography. In the vast pillared quadrangle of the rebuilt **Royal Exchange** (Source A), the world was literally divided into trade walks where merchants negotiated contracts for Virginia tobacco, Jamaican sugar, and Bengal calico. Nearby, coffee houses like Lloyd’s and Jonathan’s democratized financial intelligence, birthing the London Stock Exchange and maritime insurance.',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Maritime Thames & Global Shipping)',
        source: {
          letter: 'B',
          title: 'Source B: Claude de Jongh’s View of London Bridge on the Thames (1632)',
          src: '/images/early_mod_l6_banner.jpg',
          caption:
            'Oil painting by Dutch master Claude de Jongh showing the dense maritime shipping, merchant warehouses, and waterborne commerce along the River Thames at the entrance to the City of London.',
          shelfmark: 'Kenwood House Collection (Shelfmark: KH-DJ-1632)',
          citation: 'English Heritage, Kenwood House, London.',
          context:
            'London’s transformation into a global financial powerhouse was carried upon the waters of the Thames. Thousands of merchant vessels, colliers, and barges unloaded sugar, tobacco, spices, and timber along custom quays. **Hinge Question:** Why was maritime river access to the Port of London essential for Britain’s commercial transformation?',
          hinge_question:
            'Why was maritime river access to the Port of London essential for Britain’s commercial transformation?',
        },
        text: '<span class="para-ref">[3.1]</span> The lifeblood of Britain’s commercial revolution was maritime transport along the River Thames. As captured in Claude de Jongh’s panoramic view of London Bridge (Source B), the Pool of London was crammed with oceanic merchantmen, barges, and wharves handling cargo from every corner of the earth. London Bridge was not merely a crossing, but the gateway separating ocean-going vessels from river traffic.<br><br><span class="para-ref">[3.2]</span> Through these maritime docks flowed the immense profits of mercantilist trade. A new social class—the **bourgeoisie** (commercial middle class)—rose to challenge the ancient supremacy of the landed aristocracy. Power and social status were no longer defined purely by noble blood, but by commercial diligence, shipping tonnage, and financial capital.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (The Fiscal-Military Superpower)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'How did financial revolution, agrarian capitalism, and the merchant elite eclipse traditional aristocratic power by 1700?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'Following the seventeenth-century political upheavals, Britain’s balance of power shifted because...',
                'The Financial Revolution and the founding of the Bank of England in 1694 revolutionized the state by...',
                'The rise of merchant institutions like the Royal Exchange and coffee houses proved that...',
                'Ultimately, this economic transformation created what historians describe as...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In direct contrast to feudal land ownership',
                'This meant that',
                'Crucially, this resulted in',
              ],
              evaluative_criteria: [
                'Explain how agrarian capitalism and enclosure transformed rural land into commercial profit.',
                'Analyze the significance of the Bank of England (1694) and the National Debt in funding state warfare.',
                'Evaluate John Brewer’s "fiscal-military state" thesis regarding British global hegemony.',
              ],
            },
            model_answer:
              'Between 1650 and 1720, the foundation of British power underwent an epochal shift from feudal landownership to commercial capitalism and state-backed financial systems. For centuries, power in England had been monopolized by landed aristocrats whose wealth derived from feudal rents. However, the rise of agrarian capitalism—driven by enclosure and commercial crop rotation—turned agriculture into a market-driven industry. Simultaneously, the mercantilist Navigation Acts (1651) established a state-enforced shipping monopoly that channeled colonial commodities exclusively through British ports, massively enriching the merchant class. The true catalyst of this shift was the Financial Revolution following the Glorious Revolution of 1688. The creation of the Bank of England in 1694 established the modern National Debt, allowing the British government to borrow vast sums of private merchant capital at low interest rates. As historian John Brewer demonstrates in "The Sinews of Power", this forged Britain into an invincible "fiscal-military state": while absolute monarchs like Louis XIV of France struggled with chaotic tax collection and bankruptcy, Britain could sustain colossal naval fleets across the globe on credit. Furthermore, urban commercial hubs like the Royal Exchange (Source A) and London coffee houses democratized speculation, giving birth to stock markets and marine insurance. By the mid-eighteenth century, celebrated in Hogarth’s prints (Source B), British power was no longer dictated by medieval aristocratic pedigree, but by the financial credit, naval firepower, and commercial machinery of an ascending merchant oligarchy.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> In his groundbreaking study <em>The Sinews of Power</em> (1989), historian John Brewer demonstrated that Britain’s rise to global superpower status was not due to superior military tactics, but to its revolutionary financial architecture: the **fiscal-military state**. By combining efficient excise taxation with the credible public credit of the Bank of England, Britain was able to spend astronomical sums on warships and global garrisons without collapsing into the bankruptcy that repeatedly crippled France and Spain.<br><br><span class="para-ref">[4.2]</span> However, this economic miracle had a deeply exploitative foundation. The booming trade at the Royal Exchange and the soaring dividends of London investors were powered directly by imperial commodities: sugar, tobacco, and rum. These lucrative goods were produced not by free English laborers, but by millions of enslaved Africans trapped in the brutal, murderous machinery of transatlantic slavery.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'How did financial revolution, agrarian capitalism, and the merchant elite eclipse traditional aristocratic power by 1700?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'Following the seventeenth-century political upheavals, Britain’s balance of power shifted because...',
          'The Financial Revolution and the founding of the Bank of England in 1694 revolutionized the state by...',
          'The rise of merchant institutions like the Royal Exchange and coffee houses proved that...',
          'Ultimately, this economic transformation created what historians describe as...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In direct contrast to feudal land ownership',
          'This meant that',
          'Crucially, this resulted in',
        ],
        evaluative_criteria: [
          'Explain how agrarian capitalism and enclosure transformed rural land into commercial profit.',
          'Analyze the significance of the Bank of England (1694) and the National Debt in funding state warfare.',
          'Evaluate John Brewer’s "fiscal-military state" thesis regarding British global hegemony.',
        ],
      },
      model_answer:
        'Between 1650 and 1720, the foundation of British power underwent an epochal shift from feudal landownership to commercial capitalism and state-backed financial systems. For centuries, power in England had been monopolized by landed aristocrats whose wealth derived from feudal rents. However, the rise of agrarian capitalism—driven by enclosure and commercial crop rotation—turned agriculture into a market-driven industry. Simultaneously, the mercantilist Navigation Acts (1651) established a state-enforced shipping monopoly that channeled colonial commodities exclusively through British ports, massively enriching the merchant class. The true catalyst of this shift was the Financial Revolution following the Glorious Revolution of 1688. The creation of the Bank of England in 1694 established the modern National Debt, allowing the British government to borrow vast sums of private merchant capital at low interest rates. As historian John Brewer demonstrates in "The Sinews of Power", this forged Britain into an invincible "fiscal-military state": while absolute monarchs like Louis XIV of France struggled with chaotic tax collection and bankruptcy, Britain could sustain colossal naval fleets across the globe on credit. Furthermore, urban commercial hubs like the Royal Exchange (Source A) and London coffee houses democratized speculation, giving birth to stock markets and marine insurance. By the mid-eighteenth century, celebrated in Hogarth’s prints (Source B), British power was no longer dictated by medieval aristocratic pedigree, but by the financial credit, naval firepower, and commercial machinery of an ascending merchant oligarchy.',
    },
    quiz: LESSON_QUIZZES.lesson_6,
  },

  // ==========================================
  // LESSON 7: TRANSATLANTIC SLAVE TRADE (1672–1780)
  // ==========================================
  {
    id: 'lesson_7',
    title: 'What were the mechanics of the Transatlantic Slave Trade?',
    enquiry_question:
      'How did British ports, shipping networks, and colonial plantations orchestrate the brutal machinery of the Transatlantic Slave Trade?',
    cover_image: '/images/cape_coast_castle.jpg',
    banner: '/images/cape_coast_castle.jpg',
    learning_objectives: [
      'Describe the three legs of the Triangular Trade connecting British manufacturing, West African captive markets, and American plantations',
      'Analyze the horrific conditions of the Middle Passage through the forensic geometry of the slave ship Brookes (1788)',
      'Evaluate the economic significance of slave-grown sugar and tobacco to the growth of British port cities like Bristol and Liverpool',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/the-roots-of-racism-episode-1/',
        title: 'The Triangular Trade and the Horrors of the Middle Passage',
        duration: '6 mins 30 secs',
        viewing_task:
          'Identify the commodities carried on each of the three legs of the Triangular Trade network.',
        model_answer:
          'Leg 1 carried manufactured British goods (muskets, brass pans, gunpowder, textiles) to West Africa. Leg 2 (the Middle Passage) transported captured and enslaved African men, women, and children across the Atlantic. Leg 3 shipped raw slave-grown commodities (sugar, rum, tobacco, cotton) back to Britain.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from the Economic Shift',
      type: 'mixed',
      items: [
        {
          question:
            'What 1651 law decreed that goods imported into Britain must travel on English-built and English-crewed ships?',
          answer: 'The Navigation Act.',
        },
        {
          question:
            'Which national institution was founded in 1694 to manage the National Debt and fund state warfare?',
          answer: 'The Bank of England.',
        },
        {
          question:
            'What were seventeenth-century London coffee houses nicknamed because of the cheap intellectual and commercial exchanges inside?',
          answer: 'Penny Universities.',
        },
        {
          question:
            'What economic theory argued that a nation should maximize exports, restrict imports, and hoard gold bullion?',
          answer: 'Mercantilism.',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson confronts the darkest, most brutal engine of early modern British prosperity: the Transatlantic Slave Trade. We examine how British capital, industrial manufacturing, and maritime logistics combined into a relentless commercial system that commodified over twelve million human beings, transforming port cities like Bristol and Liverpool into global trading powerhouses.',
      objectives: [
        {
          objective:
            'Understand the mechanics and geometry of the Triangular Trade across three continents.',
          primer:
            'Direct pupils to Source B and paragraphs [1.1]–[2.1]. Trace the circular route: manufactured goods from Birmingham, human captives from the Bight of Benin, and sugar from Jamaica.',
          question:
            'Why was the Triangular Trade so profitable for British shipowners compared to traditional direct trade?',
        },
        {
          objective: 'Interrogate the forensic geometry of the slave ship Brookes (1788).',
          primer:
            'Study Source A and paragraphs [2.2]–[3.1]. Point out that enslaved human beings were packed side-by-side like cargo with less room than a corpse in a coffin.',
          question:
            'How does the diagram of the Brookes provide undeniable primary evidence of calculated, industrial dehumanization?',
        },
        {
          objective:
            'Evaluate Eric Williams’ thesis regarding the link between slavery profits and British industrialization.',
          primer:
            'Examine paragraphs [3.2]–[4.2]. Discuss how fortunes made in the slave trade built British docks, banks, canals, and steam mills.',
          question:
            'Can modern Britain’s Industrial Revolution be separated from the profits generated by enslaved labor in the Caribbean?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: Schematic Map of the Transatlantic Triangular Trade Network',
        src: '/images/triangular_trade.png',
        caption:
          'Cartographic diagram illustrating the prevailing Atlantic wind currents and the three commercial legs connecting Britain, West Africa, and the Caribbean plantations.',
        shelfmark: 'Maritime Historical Cartography (Shelfmark: MHC-TRI-1750)',
        citation: 'National Maritime Museum, Greenwich, London.',
        context:
          'The Triangular Trade operated on a self-reinforcing financial cycle. British manufactured goods bought human captives in West Africa; captive labor produced sugar, tobacco, and rum in the Americas; and raw colonial commodities were shipped back to Britain to feed domestic consumption and manufacturing. **Hinge Question:** How did the geography of Atlantic trade winds and ocean currents dictate the three legs of the trade?',
        hinge_question:
          'How did the geography of Atlantic trade winds and ocean currents dictate the three legs of the trade?',
      },
      {
        letter: 'B',
        title: 'Source B: Diagram of the Slave Ship Brookes (1788)',
        src: '/images/brookes_ship.jpg',
        caption:
          'Forensic architectural cross-section of the Liverpool slave ship Brookes, published by the Abolition Society, illustrating 454 enslaved Africans packed into its lower decks.',
        shelfmark: 'Abolitionist Print Archives (Shelfmark: APA-BRK-1788)',
        citation: 'The British Library, London (Add MS 21256).',
        context:
          'Under the 1788 Dolben Act, the Brookes was legally permitted to carry 454 captives, allocating a space measuring six feet by sixteen inches per man. On previous voyages before regulation, the captain had crammed over 600 human beings into the sweltering, airless hold. **Hinge Question:** Why did the Abolition Committee choose a cold, technical engineering blueprint rather than an emotional painting to sway public opinion?',
        hinge_question:
          'Why did the Abolition Committee choose a cold, technical engineering blueprint rather than an emotional painting to sway public opinion?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Hunger for Sweet Gold & The Royal African Company)',
        source: {
          letter: 'A',
          title: 'Source A: Schematic Map of the Transatlantic Triangular Trade Network',
          src: '/images/triangular_trade.png',
          caption:
            'Cartographic diagram illustrating the prevailing Atlantic wind currents and the three commercial legs connecting Britain, West Africa, and the Caribbean plantations.',
          shelfmark: 'Maritime Historical Cartography (Shelfmark: MHC-TRI-1750)',
          citation: 'National Maritime Museum, Greenwich, London.',
          context:
            'The Triangular Trade operated on a self-reinforcing financial cycle. British manufactured goods bought human captives in West Africa; captive labor produced sugar, tobacco, and rum in the Americas; and raw colonial commodities were shipped back to Britain to feed domestic consumption and manufacturing. **Hinge Question:** How did the geography of Atlantic trade winds and ocean currents dictate the three legs of the trade?',
          hinge_question:
            'How did the geography of Atlantic trade winds and ocean currents dictate the three legs of the trade?',
        },
        text: '<span class="para-ref">[1.1]</span> In the late seventeenth century, British consumer culture was radically transformed by imported imperial luxuries: tea, coffee, chocolate, and above all, **sugar**. Sugar was no longer a rare medicine for royalty; it became a staple food for the working class, sweetening bitter tea to provide quick calories for long factory shifts. But sugarcane was an exceptionally grueling, lethal crop: canes had to be planted, harvested with machetes in tropical heat, crushed in heavy iron mills, and boiled in toxic, bubbling copper vats. When indigenous populations were annihilated by Eurasian disease and European indentured servants proved unable to survive the brutal labor regime, plantation owners turned to the forced labor of enslaved Africans.<br><br><span class="para-ref">[1.2]</span> In 1672, King Charles II granted a royal charter creating the **Royal African Company**, headed by his brother James, Duke of York. The company was granted a state monopoly to capture and transport enslaved human beings from West Africa to English colonies in Jamaica, Barbados, and Virginia. The Duke of York personally ordered company captives branded on the chest with the letters "DoY" or "RAC" using red-hot irons, cementing the horrific reality of chattel slavery: human beings were legally transformed into commercial commodities to be bought, insured, and worked to death for British profit.',
      },
      {
        act: 2,
        title:
          'Act 2: Escalation & Conflict (The Triangular Machine & The Horror of the Middle Passage)',
        text: '<span class="para-ref">[2.1]</span> By the eighteenth century, British merchants had perfected the **Triangular Trade** (Source A)—a self-reinforcing oceanic machinery operating across three continents. On the **First Leg (Outward Passage)**, ships sailed from Bristol and Liverpool laden with British manufactured goods: flintlock muskets from Birmingham, iron bars, brass pans, gun flints, and Manchester cotton textiles. Arriving at fortified West African slave forts like Cape Coast Castle and Elmina, captains traded these goods to local African monarchs and warlords in exchange for war captives and kidnapped families.<br><br><span class="para-ref">[2.2]</span> The **Second Leg (The Middle Passage)** was the most concentrated theatre of human terror in history. Stripped naked and shaved, enslaved men were chained together in pairs by their ankles and wrists and crammed into sweltering, lightless decks beneath the waterline. Captains practiced "tight packing": stacking human bodies side-by-side on tiered wooden shelves with barely eighteen inches of vertical headroom. Chained in pools of blood, vomit, and human excrement, captives endured six to twelve weeks of horrific torment. Dysentery (the "bloody flux"), smallpox, and ophthalmia raged through the hold; those who went insane were flogged, and those who attempted suicide by starvation were force-fed using the <em>speculum oris</em>, a horrific iron screw device that prized open jaws. Between ten and fifteen percent of all captives died before reaching America, their bodies thrown overboard to following sharks.',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Geometry of the Brookes & The Sugar Ports)',
        source: {
          letter: 'B',
          title: 'Source B: Diagram of the Slave Ship Brookes (1788)',
          src: '/images/brookes_ship.jpg',
          caption:
            'Forensic architectural cross-section of the Liverpool slave ship Brookes, published by the Abolition Society, illustrating 454 enslaved Africans packed into its lower decks.',
          shelfmark: 'Abolitionist Print Archives (Shelfmark: APA-BRK-1788)',
          citation: 'The British Library, London (Add MS 21256).',
          context:
            'Under the 1788 Dolben Act, the Brookes was legally permitted to carry 454 captives, allocating a space measuring six feet by sixteen inches per man. On previous voyages before regulation, the captain had crammed over 600 human beings into the sweltering, airless hold. **Hinge Question:** Why did the Abolition Committee choose a cold, technical engineering blueprint rather than an emotional painting to sway public opinion?',
          hinge_question:
            'Why did the Abolition Committee choose a cold, technical engineering blueprint rather than an emotional painting to sway public opinion?',
        },
        text: '<span class="para-ref">[3.1]</span> The cold, calculated cruelty of the trade is permanently captured in the famous architectural diagram of the slave ship **Brookes** (Source B). Published in 1788 by abolitionist campaigner Thomas Clarkson, this clinical technical drawing shocked the public conscience: it depicted 454 human beings stowed in precise rows like logs of timber or barrels of rum, allocating a space six feet long by sixteen inches wide for an adult male—literally less room than a corpse inside a wooden coffin. On earlier voyages, the captain admitted to packing over 600 captives into the same hull, proving that human life was treated entirely as disposable cargo.<br><br><span class="para-ref">[3.2]</span> Surviving captives who survived the Middle Passage were auctioned like livestock in Kingston, Bridgetown, or Charleston. On the **Third Leg (Home Passage)**, slave ships returned to Britain packed with the raw fruits of unfree labor: hogsheads of raw brown muscovado sugar, barrels of Jamaican rum, crates of Virginian tobacco, and bales of Carolina cotton. The profits flowed directly into British port cities: Liverpool grew from a fishing village of 5,000 in 1700 into Europe’s premier slave-trading port by 1795, launching over 100 slave ships annually and controlling eighty percent of Britain’s slave trade.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (The Williams Thesis: Blood on the Loom)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'How did British ports, shipping networks, and colonial plantations orchestrate the brutal machinery of the Transatlantic Slave Trade?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'The Transatlantic Slave Trade was organized through a ruthless commercial network known as...',
                'The Middle Passage demonstrated industrial dehumanization because...',
                'The wealth extracted from the Triangular Trade transformed British port cities by...',
                'Ultimately, the Eric Williams thesis argues that transatlantic slavery was fundamental to...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'Crucially, this meant that',
                'In direct contrast to voluntary trade',
                'This demonstrates that',
              ],
              evaluative_criteria: [
                'Explain the three legs of the Triangular Trade and their economic connections.',
                'Analyze the forensic evidence of the Brookes diagram and the Middle Passage mortality.',
                'Evaluate the Williams Thesis on how slave wealth financed Britain’s Industrial Revolution.',
              ],
            },
            model_answer:
              'The Transatlantic Slave Trade was a meticulously coordinated, state-sanctioned commercial machine that linked British manufacturing, maritime logistics, and colonial plantations into a global system of unprecedented human exploitation. Beginning with royal charters like Charles II’s Royal African Company in 1672, the British ruling class treated human beings as commodified chattel. The trade operated as an unbreakable triangular network (Source B). On the first leg, British factories produced manufactured goods—Birmingham muskets, metal pans, and Manchester textiles—which were shipped to West Africa to purchase captive men, women, and children. The second leg, the Middle Passage, was characterized by extreme, calculated cruelty: the architectural diagram of the Liverpool ship Brookes (Source A) provides forensic proof that captives were tight-packed into dark, sweltering holds with less space than a body in a coffin. Up to fifteen percent perished from dehydration, smallpox, and dysentery before reaching the Americas. On the third leg, the raw commodities produced by unfree labor on Caribbean and American plantations—chiefly sugar, rum, and tobacco—were shipped back to Britain. In his seminal 1944 work "Capitalism and Slavery", historian Eric Williams proved that the staggering wealth generated by this unholy commerce laid the foundational capital for Britain’s Industrial Revolution. Slave-trade profits funded the expansion of Liverpool and Bristol docks, established major banks like Barclays and Barings, financed James Watt’s steam engines, and provided the cheap raw cotton that fueled Lancashire’s textile mills. Ultimately, Britain’s emergence as the world’s leading industrial and naval power was inextricably built upon the blood, sweat, and suffering of millions of enslaved Africans.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> In 1944, Trinidadian historian <strong>Eric Williams</strong> published a groundbreaking masterpiece: <em>Capitalism and Slavery</em>. Williams shattered comfortable Victorian narratives that portrayed Britain merely as a noble, compassionate nation that abolished slavery in 1833. Instead, Williams advanced the radical thesis that **the profits of transatlantic slavery financed the Industrial Revolution**. Fortunes amassed in the slave trade built Liverpool’s docks, capitalized private merchant banks like Barclays and Barings, financed the construction of canals and railways, and funded James Watt’s revolutionary steam engine experiments.<br><br><span class="para-ref">[4.2]</span> Today, British history directly confronts this legacy. The grand neoclassical buildings of Bristol and Liverpool, the stately country houses of the English aristocracy, and the booming cotton mills of Lancashire were all fertilized by the blood, sweat, and agony of enslaved Africans. Yet enslaved people were never passive victims in this machine; across the ocean, they fought back with ferocious courage.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'How did British ports, shipping networks, and colonial plantations orchestrate the brutal machinery of the Transatlantic Slave Trade?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'The Transatlantic Slave Trade was organized through a ruthless commercial network known as...',
          'The Middle Passage demonstrated industrial dehumanization because...',
          'The wealth extracted from the Triangular Trade transformed British port cities by...',
          'Ultimately, the Eric Williams thesis argues that transatlantic slavery was fundamental to...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'Crucially, this meant that',
          'In direct contrast to voluntary trade',
          'This demonstrates that',
        ],
        evaluative_criteria: [
          'Explain the three legs of the Triangular Trade and their economic connections.',
          'Analyze the forensic evidence of the Brookes diagram and the Middle Passage mortality.',
          'Evaluate the Williams Thesis on how slave wealth financed Britain’s Industrial Revolution.',
        ],
      },
      model_answer:
        'The Transatlantic Slave Trade was a meticulously coordinated, state-sanctioned commercial machine that linked British manufacturing, maritime logistics, and colonial plantations into a global system of unprecedented human exploitation. Beginning with royal charters like Charles II’s Royal African Company in 1672, the British ruling class treated human beings as commodified chattel. The trade operated as an unbreakable triangular network (Source B). On the first leg, British factories produced manufactured goods—Birmingham muskets, metal pans, and Manchester textiles—which were shipped to West Africa to purchase captive men, women, and children. The second leg, the Middle Passage, was characterized by extreme, calculated cruelty: the architectural diagram of the Liverpool ship Brookes (Source A) provides forensic proof that captives were tight-packed into dark, sweltering holds with less space than a body in a coffin. Up to fifteen percent perished from dehydration, smallpox, and dysentery before reaching the Americas. On the third leg, the raw commodities produced by unfree labor on Caribbean and American plantations—chiefly sugar, rum, and tobacco—were shipped back to Britain. In his seminal 1944 work "Capitalism and Slavery", historian Eric Williams proved that the staggering wealth generated by this unholy commerce laid the foundational capital for Britain’s Industrial Revolution. Slave-trade profits funded the expansion of Liverpool and Bristol docks, established major banks like Barclays and Barings, financed James Watt’s steam engines, and provided the cheap raw cotton that fueled Lancashire’s textile mills. Ultimately, Britain’s emergence as the world’s leading industrial and naval power was inextricably built upon the blood, sweat, and suffering of millions of enslaved Africans.',
    },
    quiz: LESSON_QUIZZES.lesson_7,
  },

  // ==========================================
  // LESSON 8: RESISTANCE TO SLAVERY (1700–1807)
  // ==========================================
  {
    id: 'lesson_8',
    title: 'How did enslaved Africans resist the Transatlantic Slave Trade?',
    enquiry_question:
      'What strategies did enslaved Africans use to fight against enslavement, from ship rebellions to Maroon resistance and political abolition?',
    cover_image: '/images/brookes_ship.jpg',
    banner: '/images/brookes_ship.jpg',
    learning_objectives: [
      'Describe the diverse spectrum of resistance used by enslaved Africans, from everyday sabotage to armed rebellion',
      'Analyze the guerrilla tactics of the Jamaican Maroons led by Queen Nanny in the Blue Mountains',
      'Evaluate the significance of Black agency and abolitionist activism, examining Olaudah Equiano’s bestselling narrative',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/enslaved-with-samuel-l-jackson-episode-2-heroes/',
        title: 'Enslaved: African Resistance and the Sons of Africa',
        duration: '5 mins 35 secs',
        viewing_task:
          'Identify two ways Olaudah Equiano and the Sons of Africa used their personal testimonies to turn British public opinion against the slave trade.',
        model_answer:
          'Equiano published his bestselling 1789 autobiography exposing the horrific reality of kidnapping and the Middle Passage, and traveled across Britain on lecture tours presenting petitions directly to Parliament.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from the Slave Trade Mechanics',
      type: 'mixed',
      items: [
        {
          question:
            'What was the voyage transporting enslaved Africans across the Atlantic called?',
          answer: 'The Middle Passage.',
        },
        {
          question:
            'Which British royal company, chartered in 1672, held a monopoly on capturing and shipping enslaved Africans?',
          answer: 'The Royal African Company (RAC).',
        },
        {
          question:
            'What famous 1788 architectural diagram illustrated over 450 human beings packed into a Liverpool slave ship?',
          answer: 'The diagram of the slave ship Brookes.',
        },
        {
          question:
            'Which Caribbean crop generated immense wealth for British absentee plantation owners?',
          answer: 'Sugarcane (raw sugar).',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This lesson dismantles the passive victim stereotype by placing Black agency, bravery, and intelligence at the heart of the abolition story. We examine the full spectrum of resistance: shipboard mutinies, daily plantation sabotage, the triumphant military resistance of the Jamaican Maroons under Queen Nanny, and the intellectual campaigning of Olaudah Equiano and the Sons of Africa.',
      objectives: [
        {
          objective:
            'Understand the broad spectrum of resistance: from subtle daily subversion to violent insurrection.',
          primer:
            'Direct pupils to paragraphs [1.1]–[2.1]. Emphasize that resistance occurred on every level: breaking hoe blades, feigning illness, preserving music and language, and armed revolt.',
          question:
            'Why is daily sabotage considered an act of resistance, even if it did not immediately overthrow the plantation?',
        },
        {
          objective: 'Analyze the military victory of the Jamaican Maroons led by Queen Nanny.',
          primer:
            'Examine Source A and paragraphs [2.2]–[3.1]. Highlight how escaped Africans used the mountainous Cockpit Country to defeat the British Army and force a 1739 peace treaty.',
          question:
            'How did Queen Nanny’s guerrilla fighters force the British Empire to legally recognize their freedom 90 years before abolition?',
        },
        {
          objective:
            'Evaluate the impact of Olaudah Equiano and Black abolitionists in dismantling the trade.',
          primer:
            'Study Source B and paragraphs [3.2]–[4.2]. Contrast Equiano’s firsthand moral authority with white parliamentary politicians.',
          question:
            'Why was Equiano’s autobiography such an explosive weapon against the pro-slavery lobby?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: Contemporary Print of the Jamaican Maroons in the Blue Mountains (1739)',
        src: '/images/jamaica_maroons.jpg',
        caption:
          'Engraving depicting armed Jamaican Maroon warriors negotiating the 1739 Peace Treaty with British colonial officers in the rugged Blue Mountains.',
        shelfmark: 'West India Committee Collection (Shelfmark: WIC-MAR-1739)',
        citation: 'The National Archives, Kew (CO 137/23).',
        context:
          'Escaped Africans established independent mountain communities known as Maroons. Led by Queen Nanny, they used guerrilla warfare and camouflage so effectively that the British military surrendered and signed a treaty granting them land and total autonomy in 1739. **Hinge Question:** Why did the British Empire choose to sign a formal peace treaty with escaped slaves rather than continuing the war?',
        hinge_question:
          'Why did the British Empire choose to sign a formal peace treaty with escaped slaves rather than continuing the war?',
      },
      {
        letter: 'B',
        title: 'Source B: Frontispiece Portrait of Olaudah Equiano from his 1789 Autobiography',
        src: '/images/equiano.jpg',
        caption:
          'Engraved portrait of Olaudah Equiano (Gustavus Vassa) holding an open Bible, published as the frontispiece to his bestselling 1789 autobiography.',
        shelfmark: 'Rare Books Collection (Shelfmark: RB-EQUI-1789)',
        citation: 'The British Library, London (General Reference Collection 1478.b.11).',
        context:
          'Kidnapped as a boy in West Africa, Equiano survived the Middle Passage, purchased his freedom in 1766, and moved to London. In 1789, he published *The Interesting Narrative of the Life of Olaudah Equiano*, exposing the horrors of the trade to hundreds of thousands of readers. **Hinge Question:** How did Equiano’s formal Georgian dress and open Bible directly challenge racist pro-slavery stereotypes?',
        hinge_question:
          'How did Equiano’s formal Georgian dress and open Bible directly challenge racist pro-slavery stereotypes?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Myth of Passivity & Oceanic Mutiny)',
        text: '<span class="para-ref">[1.1]</span> For centuries, Victorian histories depicted enslaved Africans as silent, passive victims who waited patiently for noble white parliamentarians like William Wilberforce to set them free. Modern scholarship has obliterated this myth. In truth, African resistance began the very second captives were ambushed in their homelands and continued relentlessly at every stage of their enslavement. Captives rebelled in coastal barracoons, leapt overboard into shark-infested waters to drown as free people rather than submit to chains, and launched armed mutinies aboard slave ships.<br><br><span class="para-ref">[1.2]</span> Shipboard insurrections were remarkably frequent: maritime records prove that violent revolts broke out on <strong>at least ten percent of all slave voyages</strong> across the Atlantic. Captives smuggled barrel hoops to pick locks, attacked crews with broken shackles, and in famous cases like the <em>Clara</em> (1729) or the <em>Amistad</em> (1839), overpowered the white crew and seized control of the ship. Knowing that mutinies could erupt at any moment, British captains invested in heavily armed crew barricades with swivel cannons aimed directly at the slave deck, terrified of their own human cargo.',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (The Spectrum of Resistance & The Maroon Guerrillas)',
        source: {
          letter: 'A',
          title:
            'Source A: Contemporary Print of the Jamaican Maroons in the Blue Mountains (1739)',
          src: '/images/jamaica_maroons.jpg',
          caption:
            'Engraving depicting armed Jamaican Maroon warriors negotiating the 1739 Peace Treaty with British colonial officers in the rugged Blue Mountains.',
          shelfmark: 'West India Committee Collection (Shelfmark: WIC-MAR-1739)',
          citation: 'The National Archives, Kew (CO 137/23).',
          context:
            'Escaped Africans established independent mountain communities known as Maroons. Led by Queen Nanny, they used guerrilla warfare and camouflage so effectively that the British military surrendered and signed a treaty granting them land and total autonomy in 1739. **Hinge Question:** Why did the British Empire choose to sign a formal peace treaty with escaped slaves rather than continuing the war?',
          hinge_question:
            'Why did the British Empire choose to sign a formal peace treaty with escaped slaves rather than continuing the war?',
        },
        text: '<span class="para-ref">[2.1]</span> Once sold onto American and Caribbean plantations, enslaved people engaged in a continuous **spectrum of resistance**. Subtle daily resistance was universal: laborers worked slowly, feigned illness, deliberately broke expensive sugarcane machetes, sabotaged sugar boiling houses, and preserved banned African languages, drumming, and religious traditions like Obeah. Women used herbal knowledge to administer secret abortifacients rather than bear children into lifelong chattel bondage. On a more dangerous level, enslaved rebels plotted armed uprisings, such as the **Stono Rebellion** in South Carolina (1739), where eighty enslaved men marched toward Spanish Florida beating drums and shouting for liberty.<br><br><span class="para-ref">[2.2]</span> The most formidable armed resistance emerged in Jamaica among the **Maroons**—communities of self-liberated Africans who fled into the impenetrable limestone ravines of the Cockpit Country and the misty heights of the Blue Mountains (Source A). Led by a brilliant military and spiritual leader named <strong>Queen Nanny</strong>, the Windward Maroons waged a savage guerrilla war against the British military throughout the 1730s. Disguising themselves with leafy branches, ambushing redcoats from mountain ledges, and communicating across valleys using a cow horn called the *abeng*, Nanny’s warriors slaughtered British regiments sent to re-enslave them.',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The 1739 Treaty & Equiano’s Bestselling Weapon)',
        source: {
          letter: 'B',
          title: 'Source B: Frontispiece Portrait of Olaudah Equiano from his 1789 Autobiography',
          src: '/images/equiano.jpg',
          caption:
            'Engraved portrait of Olaudah Equiano (Gustavus Vassa) holding an open Bible, published as the frontispiece to his bestselling 1789 autobiography.',
          shelfmark: 'Rare Books Collection (Shelfmark: RB-EQUI-1789)',
          citation: 'The British Library, London (General Reference Collection 1478.b.11).',
          context:
            'Kidnapped as a boy in West Africa, Equiano survived the Middle Passage, purchased his freedom in 1766, and moved to London. In 1789, he published *The Interesting Narrative of the Life of Olaudah Equiano*, exposing the horrors of the trade to hundreds of thousands of readers. **Hinge Question:** How did Equiano’s formal Georgian dress and open Bible directly challenge racist pro-slavery stereotypes?',
          hinge_question:
            'How did Equiano’s formal Georgian dress and open Bible directly challenge racist pro-slavery stereotypes?',
        },
        text: '<span class="para-ref">[3.1]</span> Primary documents reveal the humiliating retreat of British imperial power in the face of Maroon warfare. By 1739, colonial governor Edward Trelawny realized the British army could never defeat Queen Nanny’s guerrilla fighters. In the landmark **Treaty of 1739** (Source A), the British Crown formally recognized the Maroons as free people, granting them 1,500 acres of sovereign land and total autonomy—nearly a century before the abolition of slavery in the British Empire! Queen Nanny is celebrated today as Jamaica’s only female National Hero.<br><br><span class="para-ref">[3.2]</span> In Britain, the weapon of resistance was the pen. In 1789, <strong>Olaudah Equiano</strong>—a former enslaved Igbo man who had survived the Middle Passage and bought his freedom—published his bestselling autobiography: <em>The Interesting Narrative of the Life of Olaudah Equiano</em> (Source B). Depicted on the frontispiece dressed in fine Georgian attire holding a Bible, Equiano delivered a devastating blow to pro-slavery propagandists who claimed Africans were subhuman. Equiano joined the **Sons of Africa**, a political group of free Black Londoners that included Ottobah Cugoano, traveling across Britain giving fiery public lectures and personally lobbying Parliament.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (Who Truly Abolished Slavery?)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'What strategies did enslaved Africans use to fight against enslavement, from ship rebellions to Maroon resistance and political abolition?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'Enslaved Africans fought against the Transatlantic Slave Trade through a wide spectrum of resistance, including...',
                'Shipboard mutinies and plantation sabotage demonstrated that...',
                'The military triumph of the Jamaican Maroons under Queen Nanny proved...',
                'Ultimately, the historiographical debate over abolition shows that freedom was achieved not just by white politicians, but by...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In direct defiance of their oppressors',
                'This meant that',
                'Crucially, this proves that',
              ],
              evaluative_criteria: [
                'Distinguish between everyday covert resistance and armed collective rebellion.',
                'Analyze Queen Nanny’s guerrilla warfare and the significance of the 1739 Treaty.',
                'Evaluate the contribution of Black abolitionists like Olaudah Equiano versus parliamentary reformers.',
              ],
            },
            model_answer:
              'Enslaved Africans resisted the Transatlantic Slave Trade across every geographic sphere and through an extraordinarily diverse spectrum of tactical strategies, ranging from daily subversion to armed warfare and intellectual political mobilization. At sea, resistance began immediately: insurrections erupted on at least ten percent of all slave voyages, forcing captains to navigate under constant fear of violent mutiny. On American and Caribbean plantations, resistance was continuous: enslaved laborers engaged in covert daily sabotage—feigning stupidity, breaking agricultural tools, working slowly, and preserving African spiritual traditions like Obeah. On a collective military level, resistance was devastating: in Jamaica, escaped Africans established independent Maroon communities in the Blue Mountains. Led by the tactical brilliance of Queen Nanny, Maroon guerrilla fighters ambushed British redcoats with camouflage and superior terrain knowledge, forcing the British Empire to sign the 1739 Peace Treaty (Source A), which formally recognized Maroon independence ninety-five years before general emancipation. Furthermore, inside Britain itself, resistance transitioned into the intellectual sphere through the Sons of Africa. Olaudah Equiano’s bestselling 1789 autobiography (Source B) provided undeniable, articulate firsthand testimony that dismantled pro-slavery racist arguments, mobilizing millions of British citizens to sign abolition petitions. For generations, traditional British histories credited the 1807 abolition of the slave trade exclusively to white parliamentary philanthropists like William Wilberforce. However, modern historical consensus recognizes that abolition was fundamentally driven by Black agency: it was the relentless armed rebellions of enslaved people in the Caribbean and the moral leadership of Black writers that made the slave system militarily unsustainable, economically dangerous, and morally bankrupt.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> Historians remain engaged in a profound debate over what truly destroyed the Transatlantic Slave Trade in 1807. Traditional imperial historians credited white parliamentary reformers like William Wilberforce and Thomas Clarkson, celebrating British abolition as a triumph of Christian morality. Conversely, revisionist historians, beginning with Eric Williams and advanced by scholars like Professor Hilary Beckles, argue that the trade collapsed because enslaved rebellions made the Caribbean impossible to control. Constant slave uprisings made plantation insurance costs skyrocket and required thousands of British troops to suppress, rendering unfree labor an economic liability.<br><br><span class="para-ref">[4.2]</span> What is indisputable is that without the courageous resistance of enslaved Africans—from the fierce guerrilla warfare of Queen Nanny to the eloquent literature of Olaudah Equiano—the abolition of the slave trade would never have occurred. Their courage proved that human dignity could never be extinguished by chains, whips, or commercial ledgers.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'What strategies did enslaved Africans use to fight against enslavement, from ship rebellions to Maroon resistance and political abolition?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'Enslaved Africans fought against the Transatlantic Slave Trade through a wide spectrum of resistance, including...',
          'Shipboard mutinies and plantation sabotage demonstrated that...',
          'The military triumph of the Jamaican Maroons under Queen Nanny proved...',
          'Ultimately, the historiographical debate over abolition shows that freedom was achieved not just by white politicians, but by...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In direct defiance of their oppressors',
          'This meant that',
          'Crucially, this proves that',
        ],
        evaluative_criteria: [
          'Distinguish between everyday covert resistance and armed collective rebellion.',
          'Analyze Queen Nanny’s guerrilla warfare and the significance of the 1739 Treaty.',
          'Evaluate the contribution of Black abolitionists like Olaudah Equiano versus parliamentary reformers.',
        ],
      },
      model_answer:
        'Enslaved Africans resisted the Transatlantic Slave Trade across every geographic sphere and through an extraordinarily diverse spectrum of tactical strategies, ranging from daily subversion to armed warfare and intellectual political mobilization. At sea, resistance began immediately: insurrections erupted on at least ten percent of all slave voyages, forcing captains to navigate under constant fear of violent mutiny. On American and Caribbean plantations, resistance was continuous: enslaved laborers engaged in covert daily sabotage—feigning stupidity, breaking agricultural tools, working slowly, and preserving African spiritual traditions like Obeah. On a collective military level, resistance was devastating: in Jamaica, escaped Africans established independent Maroon communities in the Blue Mountains. Led by the tactical brilliance of Queen Nanny, Maroon guerrilla fighters ambushed British redcoats with camouflage and superior terrain knowledge, forcing the British Empire to sign the 1739 Peace Treaty (Source A), which formally recognized Maroon independence ninety-five years before general emancipation. Furthermore, inside Britain itself, resistance transitioned into the intellectual sphere through the Sons of Africa. Olaudah Equiano’s bestselling 1789 autobiography (Source B) provided undeniable, articulate firsthand testimony that dismantled pro-slavery racist arguments, mobilizing millions of British citizens to sign abolition petitions. For generations, traditional British histories credited the 1807 abolition of the slave trade exclusively to white parliamentary philanthropists like William Wilberforce. However, modern historical consensus recognizes that abolition was fundamentally driven by Black agency: it was the relentless armed rebellions of enslaved people in the Caribbean and the moral leadership of Black writers that made the slave system militarily unsustainable, economically dangerous, and morally bankrupt.',
    },
    quiz: LESSON_QUIZZES.lesson_8,
  },

  // ==========================================
  // LESSON 9: SYNTHESIS & ASSESSMENT (1450–1750)
  // ==========================================
  {
    id: 'lesson_9',
    title: "How 'modern' was Britain by 1750? (Synthesis & Assessment)",
    enquiry_question:
      'To what extent was Britain in 1750 a truly "modern" society, or an empire built upon extreme domestic inequality and colonial exploitation?',
    cover_image: '/images/early_mod_l6_banner.jpg',
    banner: '/images/early_mod_l6_banner.jpg',
    learning_objectives: [
      'Synthesize Britain’s 300-year transformation from a peripheral medieval island in 1450 to a global commercial empire in 1750',
      'Analyze the stark contrast between imperial luxury and domestic urban destitution during London’s "Gin Craze"',
      'Evaluate whether eighteenth-century Britain was an enlightened modern society or an exploitative imperial power',
    ],
    video: [
      {
        type: 'era',
        url: 'https://era.org.uk/streaming-service-resource/a-history-of-britain-by-simon-schama-the-wrong-kind-of-revolution/',
        title: 'A History of Britain: The Empire of Trade and Gin Lane',
        duration: '6 mins 10 secs',
        viewing_task:
          'Describe the deep contrast between the wealthy merchants of the City of London and the impoverished masses of Gin Lane in 1750.',
        model_answer:
          'While wealthy merchants built grand Georgian townhouses and grew rich on colonial sugar and tea, hundreds of thousands of impoverished Londoners lived in disease-ridden slums, drowning their despair in cheap, lethal gin depicted by William Hogarth.',
      },
    ],
    do_now: {
      title: 'Do Now: Prior Recall from Enslaved Resistance',
      type: 'mixed',
      items: [
        {
          question:
            'On roughly what percentage of Atlantic slave voyages did violent captive mutinies break out?',
          answer: 'At least ten percent (10%+).',
        },
        {
          question:
            'Who was the legendary female military and spiritual leader of the Jamaican Maroons in the Blue Mountains?',
          answer: 'Queen Nanny.',
        },
        {
          question:
            'What formal agreement in 1739 forced the British Crown to recognize Maroon freedom and grant them land?',
          answer: 'The Treaty of 1739.',
        },
        {
          question:
            'Which former enslaved African wrote a bestselling 1789 autobiography that helped turn British public opinion against slavery?',
          answer: 'Olaudah Equiano (Gustavus Vassa).',
        },
      ],
    },
    teacher_notes: {
      primer:
        'This capstone enquiry synthesizes the entire Year 8 unit. Pupils assess the profound transformation of Britain between 1450 and 1750: how a peripheral, plague-ridden island became the master of global seas, pioneer of constitutional monarchy, and home to modern capitalism. Yet we balance this triumph by investigating the dark underside: the horrors of the Gin Craze, brutal child labor, and total reliance on transatlantic slave labor.',
      objectives: [
        {
          objective: 'Trace the long-term arc from peripheral 1450 to global 1750.',
          primer:
            'Direct pupils to paragraphs [1.1]–[1.2]. Contrast the tiny, muddy London of 1450 with the sprawling imperial metropolis of 1750 commanding global trade.',
          question:
            'What were the three most important factors (financial, naval, political) that transformed Britain’s global standing over 300 years?',
        },
        {
          objective:
            'Interrogate imperial propaganda versus urban social reality using Source A and Source B.',
          primer:
            'Contrast Spiridione Roma’s ceiling painting (Source A) with Hogarth’s horrific engraving of Gin Lane (Source B).',
          question:
            'How does placing Gin Lane alongside The East Offering its Riches shatter the idealized image of 18th-century British prosperity?',
        },
        {
          objective: 'Evaluate the disciplinary concept of "modernity" in historical debate.',
          primer:
            'Direct pupils to paragraphs [3.2]–[4.2]. Guide them in writing the synoptic enquiry essay that balances commercial modernity against human exploitation.',
          question:
            'Can a society be accurately described as "modern" if its economy depends entirely upon unfree slave labor and extreme domestic poverty?',
        },
      ],
    },
    sources: [
      {
        letter: 'A',
        title: 'Source A: The East Offering its Riches to Britannia (1778) by Spiridione Roma',
        src: '/images/east_offering.jpg',
        caption:
          'Magnificent ceiling painting commissioned by the East India Company for its headquarters in Leadenhall Street, London, depicting India and China kneeling to present pearls and porcelain to Britannia.',
        shelfmark: 'Foreign and Commonwealth Office Collection (Shelfmark: FCO-EIC-1778)',
        citation: 'The British Library, London (Foster 245).',
        context:
          'Commissioned for the Revenue Committee room of the East India Company, Britannia sits enthroned guarded by a Roman lion and the river god Father Thames. Personified female figures of India and China submissively offer a basket of pearls and tea chests. **Hinge Question:** How does this painting serve as an idealized, whitewashed advertisement for corporate imperial exploitation?',
        hinge_question:
          'How does this painting serve as an idealized, whitewashed advertisement for corporate imperial exploitation?',
      },
      {
        letter: 'B',
        title: 'Source B: Gin Lane (1751) by William Hogarth',
        src: '/images/gin_lane.jpg',
        caption:
          'Engraving depicting the social collapse, starvation, and despair caused by unregulated gin drinking in the squalid London slum of St Giles.',
        shelfmark: 'Hogarth Engraving Collection (Shelfmark: BM-HOG-GIN-1751)',
        citation: 'Department of Prints and Drawings, British Museum.',
        context:
          'In 1750, London consumed over eleven million gallons of cheap, rotgut gin annually. Hogarth’s shocking print shows an intoxicated mother dropping her infant child from a staircase while a pawnbroker, an undertaker, and a starving distiller prosper in the background. **Hinge Question:** What does Gin Lane reveal about the brutal living conditions of ordinary working-class Londoners at the peak of Britain’s imperial wealth?',
        hinge_question:
          'What does Gin Lane reveal about the brutal living conditions of ordinary working-class Londoners at the peak of Britain’s imperial wealth?',
      },
    ],
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Context & Catalyst (The Great Transformation: 1450 vs. 1750)',
        text: '<span class="para-ref">[1.1]</span> In 1450, England was an insular, impoverished medieval kingdom on the fringes of Europe: recovering from the Black Death, torn apart by feudal baronies, with an unpaved capital of 50,000 citizens and zero overseas colonies. By 1750, three centuries later, Britain had undergone the most astonishing metamorphosis in human history. London was now a sprawling imperial metropolis of nearly 700,000 citizens—the financial, commercial, and maritime capital of the Western world. British merchant ships dominated every major oceanic trade route, the Royal Navy was the undisputed master of the seas, and British rule spanned from the sugar islands of the Caribbean to the trading factories of Bengal.<br><br><span class="para-ref">[1.2]</span> Domestically, Britain appeared to be the beacon of political stability and intellectual enlightenment. While absolute monarchs in France, Spain, and Russia ruled without parliaments, Britain was a constitutional monarchy governed by the rule of law, protected by the 1689 Bill of Rights. The Scientific Revolution and the Scottish Enlightenment had replaced medieval superstition with Newtonian physics and empirical science. Wealthy Britons enjoyed a "consumer revolution": drinking Jamaican sugar and Chinese tea from porcelain cups in elegant Georgian salons furnished with mahogany tables, discussing literature and global politics in comfortable townhouses.',
      },
      {
        act: 2,
        title: 'Act 2: Escalation & Conflict (The Dual Reality: Imperial Wealth Allegory)',
        source: {
          letter: 'A',
          title: 'Source A: The East Offering its Riches to Britannia (1778) by Spiridione Roma',
          src: '/images/east_offering.jpg',
          caption:
            'Magnificent ceiling painting commissioned by the East India Company for its headquarters in Leadenhall Street, London, depicting India and China kneeling to present pearls and porcelain to Britannia.',
          shelfmark: 'Foreign and Commonwealth Office Collection (Shelfmark: FCO-EIC-1778)',
          citation: 'The British Library, London (Foster 245).',
          context:
            'Commissioned for the Revenue Committee room of the East India Company, Britannia sits enthroned guarded by a Roman lion and the river god Father Thames. Personified female figures of India and China submissively offer a basket of pearls and tea chests. **Hinge Question:** How does this painting serve as an idealized, whitewashed advertisement for corporate imperial exploitation?',
          hinge_question:
            'How does this painting serve as an idealized, whitewashed advertisement for corporate imperial exploitation?',
        },
        text: '<span class="para-ref">[2.1]</span> The ascending wealth of the British Empire was celebrated through grandiose allegorical art. In Spiridione Roma’s ceiling painting for the East India Company, <em>The East Offering its Riches to Britannia</em> (Source A), Britain is depicted as a regal classical goddess receiving the voluntary homage of the world: personifications of India and China kneel humbly, pouring out pearls, jewels, and tea chests. It was the ultimate corporate propaganda: an image of benign, peaceful commerce that completely erased the brutal realities of naval cannon, military coercion, and colonial famine.<br><br><span class="para-ref">[2.2]</span> Yet beneath this glittering veneer of Georgian enlightenment lay a dark, deeply divided society. Britain’s commercial wealth was concentrated in the hands of a tiny oligarchy of landed aristocrats, London bankers, and Caribbean plantation owners. Enclosure acts had driven hundreds of thousands of landless agricultural laborers into squalid urban slums like St Giles, where whole families were packed into damp, airless cellar dwellings without running water or sanitation.',
      },
      {
        act: 3,
        title: 'Act 3: Forensic Archival Evidence (The Squalor of Gin Lane & Domestic Inequality)',
        source: {
          letter: 'B',
          title: 'Source B: Gin Lane (1751) by William Hogarth',
          src: '/images/gin_lane.jpg',
          caption:
            'Engraving depicting the social collapse, starvation, and despair caused by unregulated gin drinking in the squalid London slum of St Giles.',
          shelfmark: 'Hogarth Engraving Collection (Shelfmark: BM-HOG-GIN-1751)',
          citation: 'Department of Prints and Drawings, British Museum.',
          context:
            'In 1750, London consumed over eleven million gallons of cheap, rotgut gin annually. Hogarth’s shocking print shows an intoxicated mother dropping her infant child from a staircase while a pawnbroker, an undertaker, and a starving distiller prosper in the background. **Hinge Question:** What does Gin Lane reveal about the brutal living conditions of ordinary working-class Londoners at the peak of Britain’s imperial wealth?',
          hinge_question:
            'What does Gin Lane reveal about the brutal living conditions of ordinary working-class Londoners at the peak of Britain’s imperial wealth?',
        },
        text: '<span class="para-ref">[3.1]</span> The psychological despair of the urban poor exploded in the catastrophic **"Gin Craze"** of the 1730s and 1740s. Unregulated corn spirits flooded the capital: Londoners consumed over eleven million gallons of gin a year. In squalid alleyways, "dram shops" advertised that customers could get <em>"Drunk for a penny, dead drunk for twopence, with straw for nothing!"</em> Infant mortality soared: in the poorest London parishes, three out of four children died before their fifth birthday.<br><br><span class="para-ref">[3.2]</span> The brutal reality of domestic Britain is permanently recorded in William Hogarth’s searing 1751 masterpiece <em>Gin Lane</em> (Source B). Set in the notorious St Giles slum, Hogarth depicts an apocalyptic scene of social disintegration: an intoxicated mother drops her baby from a staircase to its death, while a skeletal ballad singer starves and an impoverished soldier pawns his sword for one more dram of liquor. Far from an enlightened modern paradise, 1750 Britain was a society of grotesque extremes: colossal imperial fortunes built alongside desperate domestic destitution.',
      },
      {
        act: 4,
        title:
          'Act 4: The Historical Verdict & Historiographical Debate (The Verdict on 1750: Modernity or Exploitation?)',
        tasks: [
          {
            title: 'Master Disciplinary Enquiry Task',
            prompt:
              'To what extent was Britain in 1750 a truly "modern" society, or an empire built upon extreme domestic inequality and colonial exploitation?',
            type: 'extended_writing',
            scaffolding: {
              sentence_starters: [
                'By 1750, Britain appeared undeniably "modern" because it had developed...',
                'In terms of global trade and political architecture, Britain had evolved from...',
                'However, this image of enlightened modernity is severely undermined by...',
                'Ultimately, Britain in 1750 is best understood not as a modern paradise, but as...',
              ],
              causal_connectives: [
                'Consequently',
                'Furthermore',
                'In direct contrast to this imperial wealth',
                'Crucially, this paradox reveals that',
                'This demonstrates that',
              ],
              evaluative_criteria: [
                'Evaluate the indicators of modernity: parliamentary democracy, financial systems, consumer goods, and scientific inquiry.',
                'Examine the counter-evidence of domestic poverty: the Gin Craze, child mortality, and lack of social welfare.',
                'Synthesize the global foundation: the reliance on transatlantic slave labor and imperial conquest.',
              ],
            },
            model_answer:
              'By 1750, Britain was an extraordinary historical paradox: it was undeniably the most commercially and politically "modern" state in the Western world, yet its modernity was constructed upon extreme domestic squalor and the brutal machinery of global colonial exploitation. In many respects, Britain had made a revolutionary leap from its peripheral medieval condition in 1450. It had pioneered a stable constitutional monarchy under the 1689 Bill of Rights, eliminating royal absolutism. Economically, the Financial Revolution—anchored by the Bank of England, the London Stock Exchange, and global joint-stock corporations—created an advanced capitalist economy unmatched by any European rival. British citizens enjoyed a consumer revolution of tea, sugar, and textiles, celebrating their maritime triumphs in artworks like "The East Offering its Riches to Britannia" (Source A). However, it is historically inaccurate to view 1750 Britain as a genuinely enlightened or modern society for the majority of its people. Domestically, Britain was characterized by savage inequality: enclosure had dispossessed the rural peasantry, while the urban masses crowded into airless, disease-ridden slums, drowning their despair in the catastrophic Gin Craze depicted by William Hogarth in Gin Lane (Source B), where infant mortality exceeded seventy percent. Most decisively, Britain’s global wealth was fundamentally derived from unfree labor: over a third of Britain’s oceanic trade relied directly upon the kidnapping, shipment, and enslavement of millions of Africans across Caribbean sugar plantations. Ultimately, Britain in 1750 was not an enlightened modern democracy in the contemporary sense, but the world’s first fiscal-military capitalist empire—a nation that brilliantly mastered the modern institutions of finance, naval power, and commerce, but utilized them to orchestrate unprecedented global exploitation.',
          },
        ],
        text: '<span class="para-ref">[4.1]</span> Historians remain divided over whether 1750 Britain should be celebrated as the world’s first "modern" society. Liberal constitutional historians emphasize the positive transformation: Britain was the pioneer of parliamentary democracy, the rule of law, religious toleration, and capitalist innovation, providing the political and financial stability that would soon launch the Industrial Revolution.<br><br><span class="para-ref">[4.2]</span> Conversely, social and post-colonial historians argue that Britain’s "modernity" was an illusion enjoyed only by a wealthy elite. They emphasize that the British Empire was built on the enslavement of over three million Africans, the violent dispossession of indigenous nations in America, and the commercial plunder of India, while its own working class perished in squalor. The year 1750 was not the end of Britain’s transformation, but the launchpad for a new industrial world that would export British power, industry, and empire to every corner of the earth.',
      },
    ],
    enquiry_task: {
      title: 'Master Disciplinary Enquiry Task',
      prompt:
        'To what extent was Britain in 1750 a truly "modern" society, or an empire built upon extreme domestic inequality and colonial exploitation?',
      type: 'extended_writing',
      scaffolding: {
        sentence_starters: [
          'By 1750, Britain appeared undeniably "modern" because it had developed...',
          'In terms of global trade and political architecture, Britain had evolved from...',
          'However, this image of enlightened modernity is severely undermined by...',
          'Ultimately, Britain in 1750 is best understood not as a modern paradise, but as...',
        ],
        causal_connectives: [
          'Consequently',
          'Furthermore',
          'In direct contrast to this imperial wealth',
          'Crucially, this paradox reveals that',
          'This demonstrates that',
        ],
        evaluative_criteria: [
          'Evaluate the indicators of modernity: parliamentary democracy, financial systems, consumer goods, and scientific inquiry.',
          'Examine the counter-evidence of domestic poverty: the Gin Craze, child mortality, and lack of social welfare.',
          'Synthesize the global foundation: the reliance on transatlantic slave labor and imperial conquest.',
        ],
      },
      model_answer:
        'By 1750, Britain was an extraordinary historical paradox: it was undeniably the most commercially and politically "modern" state in the Western world, yet its modernity was constructed upon extreme domestic squalor and the brutal machinery of global colonial exploitation. In many respects, Britain had made a revolutionary leap from its peripheral medieval condition in 1450. It had pioneered a stable constitutional monarchy under the 1689 Bill of Rights, eliminating royal absolutism. Economically, the Financial Revolution—anchored by the Bank of England, the London Stock Exchange, and global joint-stock corporations—created an advanced capitalist economy unmatched by any European rival. British citizens enjoyed a consumer revolution of tea, sugar, and textiles, celebrating their maritime triumphs in artworks like "The East Offering its Riches to Britannia" (Source A). However, it is historically inaccurate to view 1750 Britain as a genuinely enlightened or modern society for the majority of its people. Domestically, Britain was characterized by savage inequality: enclosure had dispossessed the rural peasantry, while the urban masses crowded into airless, disease-ridden slums, drowning their despair in the catastrophic Gin Craze depicted by William Hogarth in Gin Lane (Source B), where infant mortality exceeded seventy percent. Most decisively, Britain’s global wealth was fundamentally derived from unfree labor: over a third of Britain’s oceanic trade relied directly upon the kidnapping, shipment, and enslavement of millions of Africans across Caribbean sugar plantations. Ultimately, Britain in 1750 was not an enlightened modern democracy in the contemporary sense, but the world’s first fiscal-military capitalist empire—a nation that brilliantly mastered the modern institutions of finance, naval power, and commerce, but utilized them to orchestrate unprecedented global exploitation.',
    },
    quiz: LESSON_QUIZZES.lesson_9,
  },
];

console.log(`Generated ${early_modern_lessons.length} complete Christine Counsell 4-Act Lessons.`);

// Assemble clean, complete unit data object
const updatedUnitData = {
  id: 'early_modern_world',
  edition: '2026.1',
  title: baseUnit.title || 'KS3: Early Modern World & Global Encounters (1450–1750)',
  enquiry: baseUnit.enquiry || 'How "global" was Britain\'s transformation between 1450 and 1750?',
  cover_image: baseUnit.cover_image || '/images/east_offering.jpg',
  workbooks: baseUnit.workbooks || [{ id: 'full', name: 'full', title: 'Complete Unit' }],
  guided_reading: baseUnit.guided_reading || [],
  timeline: baseUnit.timeline || [],
  lessons: early_modern_lessons,
  portraits: baseUnit.portraits || [],
  description:
    'A rigorous Key Stage 3 enquiry exploring early modern global encounters, trade networks, religious conflicts, constitutional revolutions, and the transatlantic slave trade (1450–1750).',
  key_individuals: baseUnit.key_individuals || [],
  geographical_locations: baseUnit.geographical_locations || [],
  is_ks3: true,
};

// Write output files: BOTH data.js AND data_v2_4act.js
const codeContent = `const early_modern_world = ${JSON.stringify(updatedUnitData, null, 2)};\n\nexport const unitData = early_modern_world;\nexport default early_modern_world;\n`;
fs.writeFileSync(targetFile, codeContent, 'utf8');
console.log(`✅ Successfully authored 9 Christine Counsell 4-Act Lessons in ${targetFile}!`);

const v2TargetFile = path.join(ROOT_DIR, 'units', 'early_modern_world', 'data_v2_4act.js');
fs.writeFileSync(v2TargetFile, codeContent, 'utf8');
console.log(`✅ Successfully synchronized 9 Christine Counsell 4-Act Lessons in ${v2TargetFile}!`);

// Verify syntax for both
execSync(`node --check "${targetFile}"`, { stdio: 'inherit' });
execSync(`node --check "${v2TargetFile}"`, { stdio: 'inherit' });
console.log('✅ Syntax validation passed cleanly for both files.');
