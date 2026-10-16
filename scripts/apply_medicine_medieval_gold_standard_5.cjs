/**
 * History Revision Hub — Edexcel GCSE Medicine Through Time
 * Migration: Key Topic 1 (Medieval England c1250-c1500) to Gold Standard 5 Acts
 *
 * Converts lessons 1.1 through 1.5 in units/edexcel_medicine/data.js:
 * 1. Retires obsolete 3-box `note_scaffold` across all 5 lessons.
 * 2. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 3. Preserves and maps all authentic primary visual sources (Sources A and B) to their respective Acts.
 * 4. Aligns `workbook_stages` and `causal_domino_spine.stages` para_refs to [1.1–1.2] ... [5.1–5.2].
 * 5. Updates teacher_notes objectives with targeted hinge questions.
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Load unitData via eval
const startIndex = fileContent.indexOf('{');
const endIndex = fileContent.lastIndexOf('}');
const unitData = eval('(' + fileContent.substring(startIndex, endIndex + 1) + ')');

console.log('Loaded unitData with', unitData.lessons.length, 'lessons.');

// ============================================================================
// DEFINITIONS FOR KEY TOPIC 1 (LESSONS 1.1 TO 1.5)
// ============================================================================

const MEDIEVAL_5_ACT_DATA = {
  lesson_1_1: {
    teacher_notes: {
      primer:
        'This foundational enquiry examines why the medieval Catholic Church exercised a virtual monopoly over explanations of disease, and how theological doctrine, Christian astrology, and Galenic teleology combined to prevent scientific medical progress.',
      objectives: [
        {
          objective:
            'Explain how church control of scriptoria, education, and universities enforced Galenic orthodoxy.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that all copying occurred in monastic scriptoria where tonsured clergy acted as censors, suppressing non-conforming medical treatises.',
          question:
            'Why did monastic scriptoria make it almost impossible for independent medical discoveries to emerge?',
        },
        {
          objective:
            'Analyse why illness was interpreted as divine retribution and evaluate the treatment of biblical lepers.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Salisbury Doom Painting). Discuss how leprosy was treated as visible soul corruption and examine the ritual of separation (sequestratio).',
          question:
            'How did the Church’s belief that sickness was sent by God discourage physicians from searching for physical treatments?',
        },
        {
          objective:
            'Assess how Christian theology reconciled planetary astrology with medical diagnosis and phlebotomy.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Zodiac Man). Explain the 1345 Paris conjunction in Aquarius and why doctors checked lunar charts before bleeding.',
          question:
            'Why did university doctors consider consulting astrological almanacs more rational than physical experimentation?',
        },
        {
          objective:
            'Explain why sick medieval people turned to pilgrimage shrines and saints’ relics rather than doctors.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on purgatory, pilgrimages to Canterbury and Ely, kissing holy relics, and purchasing indulgences for healing.',
          question:
            'Why did pilgrimages and saintly relics provide more hope to ordinary sick peasants than university-trained doctors?',
        },
        {
          objective:
            'Evaluate why the Church’s adoption of Galen’s teleological design halted anatomical inquiry for centuries.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explore how Galen’s Creator theology fit Christian Genesis, the role of the lector in university dissections, and Roger Bacon’s 1277 imprisonment.',
          question:
            'Why was questioning Galen treated by the medieval Church as a crime of heresy rather than a scientific debate?',
        },
      ],
      source_context: {
        'Source A':
          'The Doom Painting of St Thomas’s Church, Salisbury (c.1475). A colossal medieval mural positioned above the chancel arch depicting Christ in majesty on Judgment Day, separating the righteous entering the Heavenly Jerusalem from condemned sinners driven into the flaming jaws of Hell. Sickness was interpreted as an earthly foretaste of divine judgment for moral sins. Hinge Question: How does this vivid visual depiction of divine retribution explain why medieval sick people sought priestly confession rather than physical medicine?',
        'Source B':
          'The Zodiac Man (Homo Signorum) from a late 14th-century English medical manuscript (MS Sloane 282). This instructional chart maps the twelve astrological constellations directly to zones of the human anatomy, guiding physicians on when to perform phlebotomy without offending celestial spheres. Hinge Question: Why did medieval university physicians believe that bleeding a patient under the wrong astrological sign could cause sudden death?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Scriptoria & The Church Monopoly on Learning (c. 1250)',
        theme_heading: 'Act 1: Scriptoria & The Church Monopoly on Learning (c. 1250)',
        text: '<span class="para-ref">[1.1]</span> In medieval England (c1250–c1500), the Roman Catholic Church exercised an unshakeable institutional monopoly over intellectual life, education, and societal values. Formal scholarship was an ecclesiastical privilege; cathedral grammar schools and universities like Oxford, Cambridge, and Paris were staffed exclusively by tonsured Catholic clergy. Most decisively, all book production and manuscript dissemination were concentrated within monastic scriptoria. In these monastic copying rooms, Benedictine and Cistercian monks laboriously hand-transcribed Latin scrolls onto vellum parchment over months of physical toil. Because the Church controlled the physical means of textual reproduction, clerical superiors operated as unyielding censors, deciding precisely which ancient treatises were copied, translated, or permanently suppressed from university libraries.<br><br><span class="para-ref">[1.2]</span> Medical instruction across medieval European faculties was strictly theoretical, scholastic, and subordinated to biblical scripture. The Church taught that the material universe was a temporary, imperfect terrestrial realm entirely subservient to divine providence. Consequently, comprehending human health did not require physical dissection, clinical experimentation, or empirical inquiry; it demanded the memorisation of holy scripture alongside ancient philosophical authorities sanctified by papal decree. Within medieval theological orthodoxy, sickness was treated as a spiritual condition reflecting divine purpose. To openly dispute canonical authority or propose alternate physical causes of disease was not treated as academic disagreement—it was prosecuted as dangerous heresy against Almighty God.',
      },
      {
        act: 2,
        title: 'Act 2: Biblical Leprosy & Divine Retribution (c. 1280)',
        theme_heading: 'Act 2: Biblical Leprosy & Divine Retribution (c. 1280)',
        source: {
          id: 'source_a_salisbury_doom',
          letter: 'A',
          title: 'Source A: The Doom Painting of St Thomas’s Church, Salisbury (c.1475)',
          src: '/images/salisbury_doom_painting.jpg',
          source: '/images/salisbury_doom_painting.jpg',
          image: '/images/salisbury_doom_painting.jpg',
          caption:
            'A 15th-century parish wall mural depicting Christ judging souls, sending the righteous to Heaven and the sinful to eternal torment in Hell.',
          desc: 'Fifteenth-century Doom Painting illustrating medieval beliefs about divine judgment.',
          provenance:
            'Chancel arch fresco, St Thomas’s Church, Salisbury, Wiltshire, c.1475 (restored 19th century).',
          citation:
            'Chancel arch fresco, St Thomas’s Church, Salisbury, Wiltshire, c.1475 (restored 19th century).',
          question:
            'How does this visual depiction of divine retribution explain why medieval sick people sought priestly confession rather than physical medicine?',
          hinge_question:
            'How does this visual depiction of divine retribution explain why medieval sick people sought priestly confession rather than physical medicine?',
          source_context:
            'A colossal medieval mural positioned above the chancel arch depicting Christ in majesty on Judgment Day, separating the righteous entering the Heavenly Jerusalem from condemned sinners driven into the flaming jaws of Hell. Sickness was interpreted as an earthly foretaste of divine judgment for moral sins.',
          context:
            'A colossal medieval mural positioned above the chancel arch depicting Christ in majesty on Judgment Day, separating the righteous entering the Heavenly Jerusalem from condemned sinners driven into the flaming jaws of Hell. Sickness was interpreted as an earthly foretaste of divine judgment for moral sins.',
        },
        text: '<span class="para-ref">[2.1]</span> Because Catholic dogma taught that God held omnipotent sovereignty over human existence, sickness was universally interpreted through a supernatural framework (<span class="archival-meta-tag">Source A</span>). An outbreak of sudden disease or epidemic pestilence was regarded as divine retribution—a deliberate punishment unleashed by God to chastise individuals or whole communities for mortal sins such as pride, gluttony, blasphemy, or heresy. Sickness could also be interpreted as an intentional divine test of spiritual fortitude, directly mirroring the suffering of Job in the Old Testament. Because the ultimate origin of disease was divine wrath, recovery was viewed as a spiritual pardon granted through prayer, penitence, fasting, and intercessory Masses, rather than physical medical intervention.<br><br><span class="para-ref">[2.2]</span> The most horrifying manifestation of divine punishment in the medieval imagination was leprosy. Prominently chronicled in scripture, leprosy was regarded as the outward physical rotting of an inwardly corrupted, sinful soul. When an individual was diagnosed, church authorities performed a solemn ritual of separation (<em>sequestratio</em>), during which a priest cast consecrated churchyard earth over the sufferer’s shoes, formally pronouncing them dead to the secular world. Lepers were cast out of towns and banished to isolated Lazar houses (leprosaria) constructed outside municipal walls. When walking country tracks, lepers were compelled by law to wear coarse grey hooded cloaks, walk on the leeward side of the road, and continuously rattle a wooden clapper or bell to warn healthy travelers to avoid their foul breath.',
      },
      {
        act: 3,
        title: 'Act 3: Christian Astrology & Planetary Conjunction (1345)',
        theme_heading: 'Act 3: Christian Astrology & Planetary Conjunction (1345)',
        source: {
          id: 'source_b_zodiac_man',
          letter: 'B',
          title: "Source B: The 'Zodiac Man' (Homo Signorum, c.1380)",
          src: '/images/zodiac_man.jpg',
          source: '/images/zodiac_man.jpg',
          image: '/images/zodiac_man.jpg',
          caption:
            'A medical manuscript diagram mapping the twelve signs of the zodiac to corresponding bodily organs and surgical sites.',
          desc: 'Fourteenth-century anatomical diagram of the Zodiac Man.',
          provenance:
            'Astronomical and Medical Calendar, England, c.1380–1400. British Library (Shelfmark: MS Sloane 282, fol. 18r).',
          citation:
            'Astronomical and Medical Calendar, England, c.1380–1400. British Library (Shelfmark: MS Sloane 282, fol. 18r).',
          question:
            'Why did medieval university physicians believe that bleeding a patient under the wrong astrological sign could cause sudden death?',
          hinge_question:
            'Why did medieval university physicians believe that bleeding a patient under the wrong astrological sign could cause sudden death?',
          source_context:
            'This instructional chart maps the twelve astrological constellations directly to zones of the human anatomy, guiding physicians on when to perform phlebotomy without offending celestial spheres.',
          context:
            'This instructional chart maps the twelve astrological constellations directly to zones of the human anatomy, guiding physicians on when to perform phlebotomy without offending celestial spheres.',
        },
        text: '<span class="para-ref">[3.1]</span> Alongside divine wrath, medieval society believed that human physiological health was intimately dictated by celestial configurations. While early Christian theologians had initially rejected astrological horoscopes as pagan divination, by the fourteenth century astrological medicine had become fully institutionalized within university medical faculties. European scholars conceptualized the cosmos as God’s grand clockwork mechanism, wherein the movement of the seven celestial spheres exerted continuous metaphysical and physical forces upon terrestrial matter. Medical practitioners carried folding pocket almanacs called <em>Vademecums</em>, which contained diagrams of the Zodiac Man (<em>Homo Signorum</em>, <span class="archival-meta-tag">Source B</span>), linking the twelve astrological constellations to specific zones of the human anatomy.<br><br><span class="para-ref">[3.2]</span> Whenever inexplicable continental epidemics struck, medieval physicians consulted astrological ephemerides to locate the causal celestial rupture. Most famously, when the Black Death swept across Western Europe in 1348, the royal medical faculty at the University of Paris issued an authoritative report declaring that the catastrophe originated on 20 March 1345 from a rare planetary conjunction of Saturn, Jupiter, and Mars in the fourteenth degree of Aquarius. Physicians argued that the malevolent heat of Mars combined with the corrupting moisture of Jupiter had drawn up toxic subterranean vapors from the earth, poisoning the atmospheric air with pestilential miasma. Consequently, physicians checked lunar charts before performing phlebotomy, fearing that bleeding a patient under the wrong zodiac sign would prove instantly fatal.',
      },
      {
        act: 4,
        title: 'Act 4: Purgatory, Pilgrimage Shrines & Holy Relics (c. 1350)',
        theme_heading: 'Act 4: Purgatory, Pilgrimage Shrines & Holy Relics (c. 1350)',
        text: '<span class="para-ref">[4.1]</span> Believing sickness reflected time owed in Purgatory or immediate spiritual transgression, suffering medieval people turned to sacred pilgrimage shrines rather than university physicians. Sufferers undertook arduous journeys to shrines of miraculous saints, most famously St Thomas Becket at Canterbury Cathedral, St Etheldreda at Ely, and Our Lady of Walsingham. The Church taught that saints held direct intercessory favour with God, capable of petitioning the Almighty to remit earthly physical punishment in exchange for sincere spiritual devotion and material penance.<br><br><span class="para-ref">[4.2]</span> At these pilgrimage destinations, sick pilgrims knelt before ornate gilded reliquaries, kissed holy bone fragments and preserved garments of deceased saints, lit expensive beeswax votive candles, and purchased lead pilgrimage badges alongside paper indulgences from pardoner priests. Wealthy barons and sick merchants endowed perpetual chantries where priests chanted daily intercessory Masses for their souls. This institutionalized spiritual devotion poured immense wealth into cathedral treasuries while leaving underlying physiological conditions and infectious pathogens entirely untreated.',
      },
      {
        act: 5,
        title: 'Act 5: Galen’s Teleology, Censorship & Roger Bacon (c. 1400)',
        theme_heading: 'Act 5: Galen’s Teleology, Censorship & Roger Bacon (c. 1400)',
        text: '<span class="para-ref">[5.1]</span> Why did the medieval Christian Church grant supreme, unquestioned authority to Claudius Galen, a pagan physician who practiced in pagan imperial Rome during the second century AD? The fundamental explanation was teleology. In his voluminous anatomical and philosophical treatises, Galen repeatedly argued that every single organ, bone, muscle, and tendon in the human body had been purposefully crafted with anatomical perfection by a supreme, benevolent, and singular Creator. This teleological design argument aligned so flawlessly with Christian creation theology and the Book of Genesis that the Papacy and university faculties embraced Galen’s writings as sacred, divinely inspired truth.<br><br><span class="para-ref">[5.2]</span> The resulting consequence for European medical development was centuries of profound intellectual stagnation. Questioning Galen’s anatomical descriptions was treated as questioning the perfection of God’s divine design. During rare university dissections of executed felons, the scholarly physician (lector) sat aloft in an elevated pulpit reading aloud from Galen’s Latin texts, while an unlettered barber-surgeon made crude incisions; if a cadaver’s internal organs contradicted Galen, lecturers insisted the corpse was deformed rather than admit Galen was mistaken. When the brilliant English Franciscan friar Roger Bacon argued at Oxford around 1277 that scholars must abandon blind deference to ancient texts and test nature through firsthand empirical experimentation, church authorities condemned his writings and imprisoned him for fourteen years. For over two centuries, scientific inquiry remained effectively outlawed.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1250',
        para_ref: '[1.1–1.2]',
        heading: 'How did church scriptoria prevent new medical ideas from spreading?',
        bullets: [
          'Hand-copying Latin manuscripts by candle-light',
          'Training university priests in Church doctrine',
          'Punishing medical heretics like Roger Bacon',
        ],
        focus_clue: 'How did church scriptoria prevent new medical ideas from spreading?',
      },
      {
        step: 2,
        date: 'c1280',
        para_ref: '[2.1–2.2]',
        heading: 'Why was leprosy viewed as visible proof of divine judgment?',
        bullets: [
          'Sending sickness to punish human sin',
          'Exiling lepers to isolated Lazar houses',
          'Ringing warning bells in dirt lanes',
        ],
        focus_clue: 'Why was leprosy viewed as visible proof of divine judgment?',
      },
      {
        step: 3,
        date: '1345',
        para_ref: '[3.1–3.2]',
        heading: 'How did the Church reconcile astrology with Christian doctrine?',
        bullets: [
          'Consulting parchment zodiac almanac wheels',
          'Aligning Mars, Jupiter, and Saturn in Aquarius',
          'Blaming corrupted night air for fever',
        ],
        focus_clue: 'How did the Church reconcile astrology with Christian doctrine?',
      },
      {
        step: 4,
        date: 'c1350',
        para_ref: '[4.1–4.2]',
        heading: 'Why did sick people turn to pilgrimage shrines rather than doctors?',
        bullets: [
          'Lighting beeswax candles before parish shrines',
          'Kissing holy bone relics of saints',
          'Selling paper indulgences to wealthy barons',
        ],
        focus_clue: 'Why did sick people turn to pilgrimage shrines rather than doctors?',
      },
      {
        step: 5,
        date: 'c1400',
        para_ref: '[5.1–5.2]',
        heading: 'Why did church enforcement of Galen prevent medical progress?',
        bullets: [
          'Treating Galen’s pagan texts as sacred truth',
          'Banning human dissections in English towns',
          'Threatening curious scholars with church excommunication',
        ],
        focus_clue: 'Why did church enforcement of Galen prevent medical progress?',
      },
    ],
    causal_domino_spine: {
      title: 'Supernatural & Religious Explanations of Disease',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1250',
          para_ref: '[1.1–1.2]',
          title: 'Scriptoria & Church Monopoly on Learning',
          actor: 'Monastic Scribes & The Catholic Church',
          tag: '📜 MONASTIC SCRIPTO RIA',
          trigger:
            'All book production and university education was strictly controlled by Benedictine and Cistercian monks hand-copying Latin manuscripts in monastic scriptoria.',
          desc: 'All book production and university education was strictly controlled by Benedictine and Cistercian monks hand-copying Latin manuscripts in monastic scriptoria.',
          connective:
            'Enforced absolute censorship over new scientific theories, banning unapproved ideas and ensuring that ancient Galenic orthodoxy was protected from challenge.',
          question: 'How did church scriptoria prevent new medical ideas from spreading?',
        },
        {
          step: 2,
          date: 'c1280',
          para_ref: '[2.1–2.2]',
          title: 'Biblical Leprosy & Divine Retribution',
          actor: 'Parish Priests & Municipal Bailiffs',
          tag: '🔔 DIVINE RETRIBUTION',
          trigger:
            'Because Catholic dogma taught that God was omnipotent, sickness was viewed as divine punishment for mortal sins like pride or heresy, or a divine test of faith.',
          desc: 'Because Catholic dogma taught that God was omnipotent, sickness was viewed as divine punishment for mortal sins like pride or heresy, or a divine test of faith.',
          connective:
            'Resulted in the social banishment of lepers to isolated Lazar houses with warning bells, while teaching the population that prayer and penitence were the only valid cures.',
          question: 'Why was leprosy viewed as visible proof of divine judgment?',
        },
        {
          step: 3,
          date: '1345',
          para_ref: '[3.1–3.2]',
          title: 'Christian Astrology & Planetary Conjunction',
          actor: 'University of Paris Medical Faculty',
          tag: '🌌 CELESTIAL MECHANICS',
          trigger:
            'Scholars integrated astrology into Christian theology, viewing the cosmos as God’s grand clockwork mechanism dictating bodily humours.',
          desc: 'Scholars integrated astrology into Christian theology, viewing the cosmos as God’s grand clockwork mechanism dictating bodily humours.',
          connective:
            'Led the University of Paris in 1348 to blame the Black Death on a 1345 planetary alignment of Saturn, Jupiter, and Mars in Aquarius, reinforcing supernatural causation.',
          question: 'How did the Church reconcile astrology with Christian doctrine?',
        },
        {
          step: 4,
          date: 'c1350',
          para_ref: '[4.1–4.2]',
          title: 'Purgatory, Saints & Holy Relics',
          actor: 'Sick Pilgrims & Shrine Keepers',
          tag: '⛪ PILGRIMAGE & RELICS',
          trigger:
            'Believing illness was punishment for sin or time in Purgatory, sick medieval people undertook long pilgrimages to holy cathedral shrines like Thomas Becket at Canterbury.',
          desc: 'Believing illness was punishment for sin or time in Purgatory, sick medieval people undertook long pilgrimages to holy cathedral shrines like Thomas Becket at Canterbury.',
          connective:
            'Kissed holy bone relics, lit expensive beeswax candles, and purchased paper indulgences from pardoner priests in desperate hopes of miraculous divine cure.',
          question: 'Why did sick people turn to pilgrimage shrines rather than doctors?',
        },
        {
          step: 5,
          date: 'c1400',
          para_ref: '[5.1–5.2]',
          title: 'Censorship & The Ban on Dissection',
          actor: 'Ecclesiastical Authorities & Roger Bacon',
          tag: '🔒 DOCTRINAL STAGNATION',
          trigger:
            'The Church canonized Galen’s teleological treatises because he argued the body was crafted with perfection by a single benevolent Creator, perfectly matching Genesis.',
          desc: 'The Church canonized Galen’s teleological treatises because he argued the body was crafted with perfection by a single benevolent Creator, perfectly matching Genesis.',
          connective:
            'Outlawed human dissection and imprisoned questioning scholars like Friar Roger Bacon (1277) for fourteen years, freezing anatomical inquiry for two centuries.',
          question: 'Why did church enforcement of Galen prevent medical progress?',
        },
      ],
    },
  },

  lesson_1_2: {
    teacher_notes: {
      primer:
        'This enquiry explores the rational, natural explanations of illness in the medieval era: how Hippocratic clinical observation, the Four Bodily Humours, Galen’s Theory of Opposites, diagnostic uroscopy, and miasma theory created a comprehensive natural medical framework.',
      objectives: [
        {
          objective:
            'Explain how Hippocrates established clinical observation and natural causes in Ancient Greece.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that Hippocrates separated illness from divine punishment and established clinical case records.',
          question:
            'How did Hippocrates’s concept of natural observation revolutionise the role of the ancient physician?',
        },
        {
          objective:
            'Analyse the Four Bodily Humours and explain why the theory seemed universally logical to medieval society.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Humours Wheel). Connect the 4 fluids (blood, phlegm, yellow bile, black bile) to seasons, elements, and temperaments.',
          question:
            'Why did medieval people find the Four Humours so persuasive when explaining physical sickness and emotional moods?',
        },
        {
          objective:
            'Demonstrate how Galen’s Theory of Opposites provided practical treatment rules for university physicians.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Contrast Hippocrates’s passive balance with Galen’s active intervention (contraria contrariis curantur).',
          question:
            'How did Galen’s Theory of Opposites give physicians a clear, systematic guide for prescribing bedside remedies?',
        },
        {
          objective:
            'Evaluate the diagnostic role of uroscopy and the glass matula flask in establishing physician authority.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Physician Inspecting Urine Flask). Explain color charts, sniffing/tasting urine, and why it carried elite prestige.',
          question:
            'Why was the glass urine flask (matula) the universal badge of professional authority for medieval university doctors?',
        },
        {
          objective:
            'Assess Miasma Theory and explain why rational doctors linked noxious environmental odours directly to epidemics.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explore how corrupt vapours from marshes, dunghills, and rotting cadavers were believed to disrupt humoral balance upon inhalation.',
          question:
            'How did belief in miasma lead medieval towns to introduce early sanitation measures despite complete ignorance of germs?',
        },
      ],
      source_context: {
        'Source A':
          'The Four Humours Wheel from a 14th-century Italian manuscript of Tacuinum Sanitatis. This classical circular diagram correlates the four bodily fluids (Blood, Phlegm, Yellow Bile, Black Bile) with the four seasons (Spring, Winter, Summer, Autumn) and the four terrestrial elements (Air, Water, Fire, Earth). Sickness was defined as humoral dyscrasia (imbalance). Hinge Question: How does this cyclical diagram demonstrate why medieval physicians believed that seasonal weather changes directly caused bodily illnesses?',
        'Source B':
          'Physician Inspecting Urine Flask, woodcut frontispiece from Johannes de Ketham’s Fasciculus Medicinae (Venice, 1491). Depicts a university-trained doctor in fur-trimmed robes holding a wheel-blown glass matula up to the window light, surrounded by twenty distinct colour gradations on a parchment urine wheel. Hinge Question: Why did the ritual of examining urine inside a glass matula grant medieval physicians such formidable diagnostic prestige?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Hippocrates, Clinical Observation & Natural Causes (c. 460 BC)',
        theme_heading: 'Act 1: Hippocrates, Clinical Observation & Natural Causes (c. 460 BC)',
        text: '<span class="para-ref">[1.1]</span> While the medieval Christian Church explained the ultimate theological purpose of suffering, the intellectual architecture of physical medicine was inherited from classical antiquity. In fifth-century BC Greece, the physician Hippocrates of Kos fundamentally liberated medical thought from supernatural superstition. Rejecting the entrenched belief that sickness was an invisible curse inflicted by vengeful pagan deities like Apollo, Hippocrates asserted that illness was an entirely natural bodily phenomenon governed by physical laws. He established the revolutionary practice of clinical observation: urging physicians to examine the patient directly at the bedside, systematically record changes in pulse, facial pallor, sweating, and urine, and track the natural trajectory of diseases over time.<br><br><span class="para-ref">[1.2]</span> Hippocrates preserved his clinical insights across the sixty treatises of the <em>Hippocratic Corpus</em>, establishing the ethical foundation of Western medicine through the Hippocratic Oath. He taught that the human body possessed inherent restorative capabilities, and that the doctor’s primary duty was not to impose violent physical intervention, but to assist nature through prescribed diet, restful sleep, moderate exercise, and herbal infusions. By insisting that disease possessed observable physical origins that could be diagnosed and anticipated through natural reason, Hippocrates laid the intellectual cornerstone upon which all medieval rational medicine was erected.',
      },
      {
        act: 2,
        title: 'Act 2: The Four Bodily Humours & Temperament (c. 1250)',
        theme_heading: 'Act 2: The Four Bodily Humours & Temperament (c. 1250)',
        source: {
          id: 'source_a_four_humours',
          letter: 'A',
          title: 'Source A: The Four Humours Wheel (Tacuinum Sanitatis, 14th c.)',
          src: '/images/four_humours_wheel.jpg',
          source: '/images/four_humours_wheel.jpg',
          image: '/images/four_humours_wheel.jpg',
          caption:
            'A 14th-century circular chart mapping the four bodily fluids to the four seasons, elements, and temperaments.',
          desc: 'Fourteenth-century diagram of the Four Humours.',
          provenance:
            'Tacuinum Sanitatis, Northern Italy, late 14th century. Österreichische Nationalbibliothek, Vienna (Codex Vindobonensis Series Nova 2644).',
          citation:
            'Tacuinum Sanitatis, Northern Italy, late 14th century. Österreichische Nationalbibliothek, Vienna (Codex Vindobonensis Series Nova 2644).',
          question:
            'How does this cyclical diagram demonstrate why medieval physicians believed that seasonal weather changes directly caused bodily illnesses?',
          hinge_question:
            'How does this cyclical diagram demonstrate why medieval physicians believed that seasonal weather changes directly caused bodily illnesses?',
          source_context:
            'This classical circular diagram correlates the four bodily fluids (Blood, Phlegm, Yellow Bile, Black Bile) with the four seasons (Spring, Winter, Summer, Autumn) and the four terrestrial elements (Air, Water, Fire, Earth). Sickness was defined as humoral dyscrasia (imbalance).',
          context:
            'This classical circular diagram correlates the four bodily fluids (Blood, Phlegm, Yellow Bile, Black Bile) with the four seasons (Spring, Winter, Summer, Autumn) and the four terrestrial elements (Air, Water, Fire, Earth). Sickness was defined as humoral dyscrasia (imbalance).',
        },
        text: '<span class="para-ref">[2.1]</span> To explain the biological mechanics of illness, Hippocrates and later classical commentators formulated the Theory of the Four Bodily Humours (<span class="archival-meta-tag">Source A</span>). This cosmological framework posited that the human body contained four vital liquid humours, each corresponding to one of the four terrestrial elements, seasons of the year, and physical qualities: <strong>Blood</strong> (warm and moist, corresponding to spring and air); <strong>Yellow Bile</strong> or choler (warm and dry, corresponding to summer and fire); <strong>Black Bile</strong> or melancholy (cold and dry, corresponding to autumn and earth); and <strong>Phlegm</strong> (cold and moist, corresponding to winter and water).<br><br><span class="para-ref">[2.2]</span> Perfect bodily health was defined as <em>eucrasia</em>—a state of harmonious balance between the four humours. When one humour became corrupted, deficient, or produced in excess, the individual descended into <em>dyscrasia</em>, manifesting fever, chills, coughing, or pain. The theory was persuasive to medieval people because it seamlessly integrated physiological symptoms with observable seasons and psychological personalities: a ruddy, jovial person was deemed sanguine (dominated by blood); an irritable, feverish person was choleric (yellow bile); a brooding, depressed scholar was melancholic (black bile); while a sluggish, pale person suffering winter catarrh was phlegmatic (phlegm). Humoural theory provided an all-encompassing, logical explanation for every human ailment.',
      },
      {
        act: 3,
        title: 'Act 3: Galen’s Theory of Opposites (c. 1280)',
        theme_heading: 'Act 3: Galen’s Theory of Opposites (c. 1280)',
        text: '<span class="para-ref">[3.1]</span> In the second century AD, the Greek physician Claudius Galen, practicing in imperial Rome, dramatically expanded Hippocrates’s ideas into a comprehensive therapeutic doctrine: the Theory of Opposites (<em>contraria contrariis curantur</em>). While Hippocrates had largely advocated passive dietary observation, Galen argued that physicians must actively intervene to restore humoural equilibrium by administering remedies that possessed qualities directly opposing the excess humour causing the disease.<br><br><span class="para-ref">[3.2]</span> Under Galen’s systematic doctrine, bedside diagnosis and prescription followed rigid deductive logic. If a patient presented with a common winter cold characterized by excessive cold and wet phlegm, the physician prescribed heating and drying therapies: hot dry toast, pungent mustard seeds, spicy pepper broths, and warm blankets. Conversely, if a summer fever left a patient flushed, delirious, hot, and dry with excess yellow bile, the doctor administered cooling and moistening remedies: chilled cucumber water, barley gruel, cold vinegar sponges, and bleeding to evacuate excessive boiling blood. The Theory of Opposites provided medieval practitioners with a clear, comforting, and authoritative manual that made prescribing feel scientifically certain.',
      },
      {
        act: 4,
        title: 'Act 4: Diagnostic Uroscopy & The Matula Flask (c. 1300)',
        theme_heading: 'Act 4: Diagnostic Uroscopy & The Matula Flask (c. 1300)',
        source: {
          id: 'source_b_uroscopy',
          letter: 'B',
          title: 'Source B: Physician Inspecting Urine Flask (Fasciculus Medicinae, 1491)',
          src: '/images/uroscopy_inspection.jpg',
          source: '/images/uroscopy_inspection.jpg',
          image: '/images/uroscopy_inspection.jpg',
          caption:
            'A woodcut showing a physician examining a matula flask against the light, surrounded by a diagnostic urine wheel.',
          desc: 'Fifteenth-century woodcut of a physician practicing uroscopy.',
          provenance:
            'Johannes de Ketham, Fasciculus Medicinae, Venice: Giovanni and Gregorio de Gregorii, 1491. British Library (Shelfmark: IB.21049).',
          citation:
            'Johannes de Ketham, Fasciculus Medicinae, Venice: Giovanni and Gregorio de Gregorii, 1491. British Library (Shelfmark: IB.21049).',
          question:
            'Why did the ritual of examining urine inside a glass matula grant medieval physicians such formidable diagnostic prestige?',
          hinge_question:
            'Why did the ritual of examining urine inside a glass matula grant medieval physicians such formidable diagnostic prestige?',
          source_context:
            'Depicts a university-trained doctor in fur-trimmed robes holding a wheel-blown glass matula up to the window light, surrounded by twenty distinct colour gradations on a parchment urine wheel.',
          context:
            'Depicts a university-trained doctor in fur-trimmed robes holding a wheel-blown glass matula up to the window light, surrounded by twenty distinct colour gradations on a parchment urine wheel.',
        },
        text: '<span class="para-ref">[4.1]</span> Because human anatomical dissection was forbidden by religious convention, medieval physicians relied on external bodily emanations to deduce internal humoural dyscrasia. The undisputed pinnacle of clinical diagnosis was uroscopy—the forensic inspection of patient urine (<span class="archival-meta-tag">Source B</span>). The signature instrument of the gowned physician was the <em>matula</em>, a wheel-blown, pear-shaped clear glass flask designed to mimic the internal chambers of the human torso, with three distinct horizontal layers representing the head, chest, and lower abdomen.<br><br><span class="para-ref">[4.2]</span> When called to a wealthy patient’s sickbed, the physician held the matula up to the morning daylight, scrutinizing its color, density, floating sediments, and surface foam against illustrated parchment "urine wheels" depicting twenty distinct hues ranging from crystal white to reddish-orange and putrid black. Dedicated practitioners smelled the specimen and even touched a drop to their tongue to detect sweetness or acidity. While uroscopy granted university physicians immense theatrical prestige and allowed them to charge exorbitant fees, it provided zero understanding of microscopic cellular pathology or infectious bacteria.',
      },
      {
        act: 5,
        title: 'Act 5: Miasma Theory & Foul Environmental Vapours (c. 1350)',
        theme_heading: 'Act 5: Miasma Theory & Foul Environmental Vapours (c. 1350)',
        text: '<span class="para-ref">[5.1]</span> Alongside internal humoural dyscrasia, the dominant environmental explanation for widespread epidemic disease was Miasma Theory. Originating in the classical writings of Hippocrates and Galen, miasma was conceptualized as a poisonous, corrupted atmospheric vapor laden with invisible putrefaction. Medieval physicians believed that miasma was generated by decaying terrestrial organic matter: stagnant marshland bogs, rotting animal carcasses, open cesspits, unburied corpses, and stagnant urban ditches choked with human excrement and butchers’ entrails.<br><br><span class="para-ref">[5.2]</span> When inhaled directly into the human lungs, this foul-smelling, corrupted air passed into the heart and arterial bloodstream, instantly poisoning the internal humours and sparking virulent fever. Because medieval senses instinctively associated putrid odors with sickness, miasma theory appeared deeply rational. It motivated civic magistrates to introduce early public health ordinances—commanding butchers to dump offal outside city walls, ordering householders to sweep street filth, and urging citizens to carry aromatic pomanders stuffed with dried lavender, cloves, and rose petals to neutralize deadly atmospheric vapours.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c460 BC',
        para_ref: '[1.1–1.2]',
        heading: 'How did Hippocrates separate medicine from superstition?',
        bullets: [
          'Observing clinical symptoms at the bedside',
          'Recording natural disease trajectories in treatises',
          'Rejecting divine curses in favour of bodily laws',
        ],
        focus_clue: 'How did Hippocrates separate medicine from superstition?',
      },
      {
        step: 2,
        date: 'c1250',
        para_ref: '[2.1–2.2]',
        heading: 'Why did humoral theory seem logical to medieval people?',
        bullets: [
          'Balancing blood, phlegm, yellow bile, and black bile',
          'Connecting bodily fluids to seasons and elements',
          'Explaining distinct emotional temperaments',
        ],
        focus_clue: 'Why did humoral theory seem logical to medieval people?',
      },
      {
        step: 3,
        date: 'c1280',
        para_ref: '[3.1–3.2]',
        heading: 'How did the Theory of Opposites provide practical treatment rules?',
        bullets: [
          'Formulating contraria contrariis curantur in imperial Rome',
          'Treating cold wet phlegm with hot dry spices',
          'Administering cooling cucumbers for burning yellow bile fevers',
        ],
        focus_clue: 'How did the Theory of Opposites provide practical treatment rules?',
      },
      {
        step: 4,
        date: 'c1300',
        para_ref: '[4.1–4.2]',
        heading: 'Why did uroscopy give physicians great diagnostic authority?',
        bullets: [
          'Inspecting clear glass matula flasks against window light',
          'Comparing urine colour against twenty-part parchment wheels',
          'Charging exorbitant consultation fees without cutting skin',
        ],
        focus_clue: 'Why did uroscopy give physicians great diagnostic authority?',
      },
      {
        step: 5,
        date: 'c1350',
        para_ref: '[5.1–5.2]',
        heading: 'Why did rational physicians link bad smells directly to epidemics?',
        bullets: [
          'Blaming poisonous miasma arising from stagnant cesspools',
          'Inhaling corrupt foul air directly into bloodstream',
          'Sniffing herbal pomanders to neutralise noxious vapours',
        ],
        focus_clue: 'Why did rational physicians link bad smells directly to epidemics?',
      },
    ],
    causal_domino_spine: {
      title: 'Rational Explanations: Hippocrates & The Four Humours',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c460 BC',
          para_ref: '[1.1–1.2]',
          title: 'Hippocrates & Natural Observation',
          actor: 'Hippocrates of Kos',
          tag: '🌿 CLINICAL OBSERVATION',
          trigger:
            'Hippocrates of Kos rejected divine curses, arguing that illness was caused by natural bodily imbalances that could be observed and recorded at the bedside.',
          desc: 'Hippocrates of Kos rejected divine curses, arguing that illness was caused by natural bodily imbalances that could be observed and recorded at the bedside.',
          connective:
            'Established clinical observation and the Hippocratic Corpus, creating the intellectual foundation for rational Western medical thought.',
          question: 'How did Hippocrates separate medicine from superstition?',
        },
        {
          step: 2,
          date: 'c1250',
          para_ref: '[2.1–2.2]',
          title: 'The Four Bodily Humours',
          actor: 'Medieval Scholastic Physicians',
          tag: '⚖️ FOUR HUMOURS',
          trigger:
            'Classical scholars formulated the Theory of the Four Humours (Blood, Phlegm, Yellow Bile, Black Bile), linking each fluid to elements, seasons, and temperaments.',
          desc: 'Classical scholars formulated the Theory of the Four Humours (Blood, Phlegm, Yellow Bile, Black Bile), linking each fluid to elements, seasons, and temperaments.',
          connective:
            'Provided an all-encompassing logical explanation for health and illness, convincing medieval society that disease arose from internal fluid imbalance.',
          question: 'Why did humoral theory seem logical to medieval people?',
        },
        {
          step: 3,
          date: 'c1280',
          para_ref: '[3.1–3.2]',
          title: 'Galen’s Theory of Opposites',
          actor: 'Claudius Galen (Imperial Rome)',
          tag: '🌶️ THEORY OF OPPOSITES',
          trigger:
            'Galen developed the Theory of Opposites in imperial Rome, instructing physicians to treat excess humours with remedies possessing opposite physical qualities.',
          desc: 'Galen developed the Theory of Opposites in imperial Rome, instructing physicians to treat excess humours with remedies possessing opposite physical qualities.',
          connective:
            'Gave medieval physicians an authoritative, practical bedside prescription manual (e.g. heating spices for cold chills), making remedies feel scientifically certain.',
          question: 'How did the Theory of Opposites provide practical treatment rules?',
        },
        {
          step: 4,
          date: 'c1300',
          para_ref: '[4.1–4.2]',
          title: 'The Matula & Diagnostic Uroscopy',
          actor: 'Gowned University Doctors',
          tag: '🧪 UROSCOPY FLASK',
          trigger:
            'Unable to dissect internal anatomy, university doctors analyzed patient urine inside wheel-blown glass matula flasks against twenty-color parchment urine wheels.',
          desc: 'Unable to dissect internal anatomy, university doctors analyzed patient urine inside wheel-blown glass matula flasks against twenty-color parchment urine wheels.',
          connective:
            'Granted university-trained physicians formidable diagnostic prestige and justified massive consultation fees, despite revealing zero microscopic causes.',
          question: 'Why did uroscopy give physicians great diagnostic authority?',
        },
        {
          step: 5,
          date: 'c1350',
          para_ref: '[5.1–5.2]',
          title: 'Miasma Theory & Foul Vapours',
          actor: 'Town Bailiffs & Physicians',
          tag: '💨 CORRUPTED MIASMA',
          trigger:
            'Physicians taught that corrupt, foul-smelling atmospheric air poisoned by rotting marshes and open cesspits disrupted internal humours upon inhalation.',
          desc: 'Physicians taught that corrupt, foul-smelling atmospheric air poisoned by rotting marshes and open cesspits disrupted internal humours upon inhalation.',
          connective:
            'Prompted early municipal hygiene measures like street-sweeping and offal removal, while reinforcing the belief that bad smells directly generated deadly pestilence.',
          question: 'Why did rational physicians link bad smells directly to epidemics?',
        },
      ],
    },
  },

  lesson_1_3: {
    teacher_notes: {
      primer:
        'This enquiry examines the full spectrum of medieval approaches to prevention and treatment: religious rituals, humoral bloodletting, digestive purging, herbal apothecary theriac compounds, and environmental regimens.',
      objectives: [
        {
          objective:
            'Explain why religious rituals, prayer, and flagellation remained the primary treatments for ordinary people.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that if God sent illness, physical therapy was useless without spiritual reconciliation.',
          question:
            'Why did medieval patients regard communal prayer and fasting as more vital for recovery than calling a doctor?',
        },
        {
          objective:
            'Analyse why bloodletting (phlebotomy) was the most universal physical treatment deployed across medieval society.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Phlebotomy Manuscript). Examine venesection, cupping, leeches, and monastic bleeding schedules.',
          question:
            'Why was phlebotomy practiced so universally despite frequently causing severe weakness and fatal infection?',
        },
        {
          objective:
            'Demonstrate how digestive purging (emetics, laxatives, and clysters) aimed to restore bodily equilibrium.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Focus on scammony, senna, and pewter clyster syringes used to flush corrupt humours from the bowels.',
          question:
            'How did purging and enemas demonstrate the practical application of Galenic humoral theory?',
        },
        {
          objective:
            'Assess herbal remedies, garden simples, and the universal panacea known as Theriac.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Galen Engraving). Discuss how domestic housewives and guild apothecaries compounded herbs with up to 70 ingredients.',
          question:
            'Why did complex herbal concoctions like Theriac remain trusted across all levels of society for centuries?',
        },
        {
          objective:
            'Evaluate preventive regimens (Regimen Sanitatis) and clean air measures among the wealthy nobility.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explore moderation in diet, carrying aromatic pomanders, and fleeing plague-ridden cities.',
          question:
            'Why was preventive lifestyle guidance accessible almost exclusively to the wealthy medieval aristocracy?',
        },
      ],
      source_context: {
        'Source A':
          'Phlebotomy / Bloodletting Manuscript from MS Sloane 1977 (c.1300), showing a seated medieval practitioner using a spring fleam and bowl to draw dark venous blood from a patient’s median arm vein. Bloodletting was the supreme physical therapy to relieve excess blood (plethora). Hinge Question: Why did medieval practitioners believe that draining large volumes of blood from an already weakened patient would restore bodily health?',
        'Source B':
          'Engraved portrait of Claudius Galen, the 2nd-century Roman imperial physician whose pharmaceutical writings codified over 500 plant-based remedies and complex compounds like Theriac. Hinge Question: How did Galen’s authority ensure that multi-ingredient herbal compounds like Theriac remained standard apothecary prescriptions for over 1,500 years?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Religious Treatments: Prayers, Fasting & Flagellation (c. 1250)',
        theme_heading: 'Act 1: Religious Treatments: Prayers, Fasting & Flagellation (c. 1250)',
        text: '<span class="para-ref">[1.1]</span> Because medieval society fundamentally believed that health and sickness were governed by divine will, religious and spiritual treatments constituted the essential first line of defence. When fever or epidemic pestilence struck, physical medicine was considered completely futile unless the patient first achieved spiritual reconciliation with Almighty God. Sufferers sought absolution by reciting repetitive devotional prayers—most commonly the <em>Pater Noster</em> (Lord’s Prayer), <em>Ave Maria</em> (Hail Mary), and the seven Penitential Psalms—while parish priests administered the Last Rites (Extreme Unction) to cleanse mortal sins from the dying soul.<br><br><span class="para-ref">[1.2]</span> Beyond bedside prayers, communities deployed collective religious rituals to avert divine wrath. Diocesan bishops commanded mandatory parish fasts, daily penitential processions through city lanes, and financial offerings to church altars. In moments of extreme existential crisis, desperate penitents engaged in extreme bodily mortification, including wearing abrasive horsehair shirts and self-flagellation, beating their bare shoulders with iron-tipped knotted cords to demonstrate genuine remorse. Spiritual pilgrimage to holy shrines like Canterbury or Walsingham was sought above all else, in the fervent conviction that touching saintly relics would elicit miraculous divine healing.',
      },
      {
        act: 2,
        title: 'Act 2: Humoral Phlebotomy: Bloodletting & Cupping (c. 1300)',
        theme_heading: 'Act 2: Humoral Phlebotomy: Bloodletting & Cupping (c. 1300)',
        source: {
          id: 'source_a_phlebotomy_manuscript',
          letter: 'A',
          title: 'Source A: Phlebotomy / Bloodletting Manuscript (MS Sloane 1977, c.1300)',
          src: '/images/phlebotomy_manuscript.jpg',
          source: '/images/phlebotomy_manuscript.jpg',
          image: '/images/phlebotomy_manuscript.jpg',
          caption:
            'A 14th-century illustration of a medical practitioner opening a vein in a patient’s arm with a lancet into a shallow collection bowl.',
          desc: 'Fourteenth-century manuscript miniature of bloodletting.',
          provenance:
            'Chirurgia by Roger Frugardi, England, c.1300–1320. British Library (Shelfmark: MS Sloane 1977, fol. 6r).',
          citation:
            'Chirurgia by Roger Frugardi, England, c.1300–1320. British Library (Shelfmark: MS Sloane 1977, fol. 6r).',
          question:
            'Why did medieval practitioners believe that draining large volumes of blood from an already weakened patient would restore bodily health?',
          hinge_question:
            'Why did medieval practitioners believe that draining large volumes of blood from an already weakened patient would restore bodily health?',
          source_context:
            'Showing a seated medieval practitioner using a spring fleam and bowl to draw dark venous blood from a patient’s median arm vein. Bloodletting was the supreme physical therapy to relieve excess blood (plethora).',
          context:
            'Showing a seated medieval practitioner using a spring fleam and bowl to draw dark venous blood from a patient’s median arm vein. Bloodletting was the supreme physical therapy to relieve excess blood (plethora).',
        },
        text: '<span class="para-ref">[2.1]</span> Whenever physical therapy was deployed, the most universal, authoritative, and ubiquitous treatment was phlebotomy—the deliberate surgical extraction of blood (<span class="archival-meta-tag">Source A</span>). Humoural doctrine taught that the human liver continuously generated blood from digested food, frequently producing a dangerous condition known as <em>plethora</em> (an overabundance of hot, moist blood that inflamed internal organs). To restore equilibrium, practitioners extracted blood using three distinct methods: venesection (slicing open a vein with a razor-sharp fleam or lancet), cupping (scratching the skin and placing heated glass or horn cups over the incision to draw blood to the surface via suction), and leeches (<em>hirudotherapy</em>, attaching medicinal leeches to sensitive areas like gums, nostrils, or hemorrhoids).<br><br><span class="para-ref">[2.2]</span> Phlebotomy was conducted with rigid anatomical and astrological precision. Practitioners consulted complex phlebotomy charts indicating which specific vein connected to which inflamed organ: the cephalic vein at the thumb base was incised for head ailments, while the basilic vein near the elbow was opened for liver and spleen fevers. Monks in monastic infirmaries were subjected to mandatory communal bleeding sessions up to six times per year to prevent lustful thoughts and humoural excess. Patients were routinely bled until they collapsed into unconscious syncope, a state practitioners interpreted as proof that burning humoural heat had been successfully purged.',
      },
      {
        act: 3,
        title: 'Act 3: Purging, Clysters & Humoral Cleansing (c. 1320)',
        theme_heading: 'Act 3: Purging, Clysters & Humoral Cleansing (c. 1320)',
        text: '<span class="para-ref">[3.1]</span> When phlebotomy failed to relieve humoural congestion, practitioners turned to purging the digestive tract. Galenic doctrine held that toxic, corrupt humours accumulated within the stomach and intestines, necessitating aggressive evacuation through vomiting or bowel evacuation. To induce violent vomiting, healers administered emetics formulated from antimony, bitter aloes, or scammony resin. Alternatively, to clear the lower intestines, patients were forced to ingest violent laxatives compounded from dried senna leaves, black hellebore root, and linseed oil, inducing debilitating gastrointestinal purging.<br><br><span class="para-ref">[3.2]</span> The most famous instrument of medieval purging was the clyster—an enema apparatus consisting of a long pewter or ivory pipe attached to an oiled pig’s bladder. The apothecary filled the bladder with a warm concoction of mallow leaves, chamomile flowers, crushed bran, and olive oil, injecting the fluid directly into the patient’s rectum to soften compacted faeces and purge corrupt melancholic bile. Although these violent treatments frequently induced severe dehydration, electrolyte collapse, and circulatory shock, they provided tangible sensory proof to the patient that dangerous internal poisons were being physically evacuated from the body.',
      },
      {
        act: 4,
        title: 'Act 4: Herbal Apothecary Remedies & Theriac (c. 1350)',
        theme_heading: 'Act 4: Herbal Apothecary Remedies & Theriac (c. 1350)',
        source: {
          id: 'source_b_galen_portrait',
          letter: 'B',
          title: 'Source B: Portrait of Claudius Galen (Engraving)',
          src: '/images/galen_portrait.jpg',
          source: '/images/galen_portrait.jpg',
          image: '/images/galen_portrait.jpg',
          caption:
            'A classical portrait of the imperial Roman physician Claudius Galen, whose medical writings dominated European pharmacopeias.',
          desc: 'Engraving of Claudius Galen, physician of antiquity.',
          provenance:
            'Engraved portrait, 16th century, based on classical busts. Wellcome Collection, London (Shelfmark: Iconographic Collection 3345i).',
          citation:
            'Engraved portrait, 16th century, based on classical busts. Wellcome Collection, London (Shelfmark: Iconographic Collection 3345i).',
          question:
            'How did Galen’s authority ensure that multi-ingredient herbal compounds like Theriac remained standard apothecary prescriptions for over 1,500 years?',
          hinge_question:
            'How did Galen’s authority ensure that multi-ingredient herbal compounds like Theriac remained standard apothecary prescriptions for over 1,500 years?',
          source_context:
            'The 2nd-century Roman imperial physician whose pharmaceutical writings codified over 500 plant-based remedies and complex compounds like Theriac.',
          context:
            'The 2nd-century Roman imperial physician whose pharmaceutical writings codified over 500 plant-based remedies and complex compounds like Theriac.',
        },
        text: '<span class="para-ref">[4.1]</span> For everyday non-surgical ailments, all social classes turned to herbal pharmacopeias codified by Galen (<span class="archival-meta-tag">Source B</span>) and preserved in medieval herbals like the <em>Macer Floridus</em>. Village housewives and guild apothecaries compounded hundreds of indigenous wild plants: crushed mint and chamomile were boiled to soothe abdominal colic; sage and marigold flowers were steeped in vinegar to treat septic wounds; and wormwood was distilled to expel intestinal parasites. Wealthier townspeople purchased imported exotic spices—such as cloves, cinnamon, ginger, and saffron from India and the Levant—which were ground into fine electuaries with honey.<br><br><span class="para-ref">[4.2]</span> The supreme universal panacea across the medieval world was Theriac (often termed Great Venice Treacle). Originally formulated by Emperor Nero’s court physician Andromachus, Theriac was a staggeringly complex concoction containing up to seventy distinct ingredients, including dried viper flesh, pure opium, asphalt, crushed pearls, myrrh, and wine. Ground over months in stone mortars, Theriac was prescribed as an infallible antidote against snakebites, virulent fevers, chest complaints, and the Black Death. While its high opium content dulled physical agony and induced restful sleep, it possessed zero biological efficacy against infectious bacterial pathogens.',
      },
      {
        act: 5,
        title: 'Act 5: The Regimen Sanitatis & Clean Air (c. 1400)',
        theme_heading: 'Act 5: The Regimen Sanitatis & Clean Air (c. 1400)',
        text: '<span class="para-ref">[5.1]</span> In medieval medical philosophy, preventive preservation of health was regarded as vastly superior to curative intervention. This philosophy was formalized in the <em>Regimen Sanitatis Salernitanum</em> (The Salerno Rule of Health), an influential didactic treatise composed by the prestigious medical faculty at Salerno, Italy, for the instruction of European nobility and royal courts. The Regimen instructed wealthy individuals to govern their lives according to the "Six Non-Naturals": air, food and drink, motion and rest, sleep and wakefulness, excretion and retention, and passions of the soul. Sickness was avoided by eating seasonal foods, avoiding heavy greasy meats, exercising moderately before meals, and maintaining emotional calm.<br><br><span class="para-ref">[5.2]</span> Most crucially, preventive regimen required continuous protection against corrupted environmental miasma. Wealthy barons and noble ladies carried pomanders—perforated gold or silver filigree orbs filled with ambergris, cloves, musk, and dried rose petals—which they held to their nostrils when traversing urban thoroughfares. In noble halls, servants burned sweet-scented woods like juniper, pine, and rosemary in open braziers to cleanse domestic air. When epidemic plague loomed, the ultimate preventive advice of classical physicians was simple and brutal: <em>Cito, longe, tarde</em> ("Flee quickly, travel far, return slowly")—an evasive luxury available only to the landowning aristocracy who could retreat to secluded rural country manors.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1250',
        para_ref: '[1.1–1.2]',
        heading: 'Why did ordinary people consider prayer more vital than medicine?',
        bullets: [
          'Chanting the Lord’s Prayer and Hail Marys',
          'Ordering parish fasts and penitential processions',
          'Seeking miraculous cures at saintly shrines',
        ],
        focus_clue: 'Why did ordinary people consider prayer more vital than medicine?',
      },
      {
        step: 2,
        date: 'c1300',
        para_ref: '[2.1–2.2]',
        heading: 'Why was bloodletting the most universal physical treatment?',
        bullets: [
          'Relieving dangerous plethoric blood congestion',
          'Slicing median arm veins with lancets and fleams',
          'Bleeding monastic brothers six times a year',
        ],
        focus_clue: 'Why was bloodletting the most universal physical treatment?',
      },
      {
        step: 3,
        date: 'c1320',
        para_ref: '[3.1–3.2]',
        heading: 'How was purging believed to restore bodily equilibrium?',
        bullets: [
          'Administering violent emetics to induce vomiting',
          'Injecting herbal broths through pewter clyster pipes',
          'Flushing corrupt poisonous humours from the bowels',
        ],
        focus_clue: 'How was purging believed to restore bodily equilibrium?',
      },
      {
        step: 4,
        date: 'c1350',
        para_ref: '[4.1–4.2]',
        heading: 'Why did herbal recipes remain popular across all social classes?',
        bullets: [
          'Compounding garden herbs like sage and mint',
          'Mixing seventy ingredients into Venice Theriac',
          'Using opium to dull acute physical pain',
        ],
        focus_clue: 'Why did herbal recipes remain popular across all social classes?',
      },
      {
        step: 5,
        date: 'c1400',
        para_ref: '[5.1–5.2]',
        heading: 'How did wealthy barons attempt to prevent sickness before it struck?',
        bullets: [
          'Following Salerno’s Regimen Sanitatis rules',
          'Holding sweet-scented pomanders against miasma',
          'Fleeing plague cities for rural country manors',
        ],
        focus_clue: 'How did wealthy barons attempt to prevent sickness before it struck?',
      },
    ],
    causal_domino_spine: {
      title: 'Approaches to Prevention & Treatment: Bleeding, Purging & Regimens',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1250',
          para_ref: '[1.1–1.2]',
          title: 'Religious Prayers, Fasting & Flagellation',
          actor: 'Parish Priest & Penitent Sufferers',
          tag: '🙏 SPIRITUAL DEVOTION',
          trigger:
            'Believing sickness was divine retribution for sin, suffering patients prioritized spiritual absolution through repetitive prayers, church fasts, and penitential processions.',
          desc: 'Believing sickness was divine retribution for sin, suffering patients prioritized spiritual absolution through repetitive prayers, church fasts, and penitential processions.',
          connective:
            'Ensured that religious repentance took precedence over physical medicine, reinforcing the Church’s authority over the sickbed.',
          question: 'Why did ordinary people consider prayer more vital than medicine?',
        },
        {
          step: 2,
          date: 'c1300',
          para_ref: '[2.1–2.2]',
          title: 'Humoral Phlebotomy (Bloodletting)',
          actor: 'Barber-Surgeons & Physicians',
          tag: '🩸 PHLEBOTOMY / BLEEDING',
          trigger:
            'To treat plethoric humoral excess, practitioners deployed venesection with lancets, heated cupping glasses, and medicinal leeches along mapped vein pathways.',
          desc: 'To treat plethoric humoral excess, practitioners deployed venesection with lancets, heated cupping glasses, and medicinal leeches along mapped vein pathways.',
          connective:
            'Became the universal medical therapy across monasteries, towns, and villages, routinely bleeding patients until unconscious syncope occurred.',
          question: 'Why was bloodletting the most universal physical treatment?',
        },
        {
          step: 3,
          date: 'c1320',
          para_ref: '[3.1–3.2]',
          title: 'Purging, Vomiting & Enemas',
          actor: 'Apothecaries & Sick Patients',
          tag: '🚽 DIGESTIVE PURGING',
          trigger:
            'Healers administered violent emetics, black hellebore laxatives, and pewter clyster enema syringes filled with herbal mallow broths to flush the digestive tract.',
          desc: 'Healers administered violent emetics, black hellebore laxatives, and pewter clyster enema syringes filled with herbal mallow broths to flush the digestive tract.',
          connective:
            'Provided visible, visceral proof that corrupt humours were leaving the body, despite frequently triggering fatal dehydration and shock.',
          question: 'How was purging believed to restore bodily equilibrium?',
        },
        {
          step: 4,
          date: 'c1350',
          para_ref: '[4.1–4.2]',
          title: 'Herbal Apothecary Remedies & Theriac',
          actor: 'Guild Apothecaries & Housewives',
          tag: '🌱 HERBAL THERIAC',
          trigger:
            'Housewives brewed garden mint and chamomile, while apothecaries compounded Theriac containing up to seventy ingredients including viper flesh and opium.',
          desc: 'Housewives brewed garden mint and chamomile, while apothecaries compounded Theriac containing up to seventy ingredients including viper flesh and opium.',
          connective:
            'Created an enduring herbal pharmacopeia that offered genuine narcotic pain relief and digestive comfort, even without curing infectious pathogens.',
          question: 'Why did herbal recipes remain popular across all social classes?',
        },
        {
          step: 5,
          date: 'c1400',
          para_ref: '[5.1–5.2]',
          title: 'The Regimen Sanitatis & Clean Air',
          actor: 'Salerno Medical Faculty & Wealthy Nobles',
          tag: '🏰 PREVENTIVE REGIMEN',
          trigger:
            'The Regimen Sanitatis Salernitanum instructed the wealthy aristocracy on moderating diet, sleep, exercise, and carrying clove pomanders to repel bad air.',
          desc: 'The Regimen Sanitatis Salernitanum instructed the wealthy aristocracy on moderating diet, sleep, exercise, and carrying clove pomanders to repel bad air.',
          connective:
            'Established preventive lifestyle health as an elite privilege, prompting wealthy lords to flee pestilential urban outbreaks for rural manors.',
          question: 'How did wealthy barons attempt to prevent sickness before it struck?',
        },
      ],
    },
  },

  lesson_1_4: {
    teacher_notes: {
      primer:
        'This enquiry examines the rigid medical hierarchy of medieval healthcare: university-trained physicians, guild apothecaries, barber-surgeons, monastic hospitals providing "care not cure", and female household healers.',
      objectives: [
        {
          objective:
            'Explain why university-trained physicians were accessible only to royalty and the ultra-wealthy.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize the 10-year Latin university training, theoretical focus, pulse/uroscopy inspection, and high fees.',
          question:
            'Why did university-trained physicians refuse to perform manual surgical operations or cut into living flesh?',
        },
        {
          objective:
            'Analyse how guild apothecaries provided accessible herbal medicines to townspeople.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Contrast trade guild apprenticeships with academic universities, and explore shopfront sales of electuaries and simples.',
          question:
            'Why were apothecaries often in conflict with university physicians over prescribing medicines?',
        },
        {
          objective:
            'Evaluate the lower social status and surgical duties of medieval barber-surgeons.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Surgeon Suturing Head Wound). Discuss bone-setting, tooth-pulling, amputations, and cautery without pain relief.',
          question:
            'Why did medieval society view barber-surgeons as manual craftsmen rather than respectable scholars?',
        },
        {
          objective:
            'Assess why medieval monastic hospitals deliberately focused on spiritual ‘care not cure’.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Hôtel-Dieu Hospital Ward). Highlight that over 1,200 hospitals provided beds, warmth, and prayer, but barred infectious sick.',
          question:
            'Why did medieval monastic hospitals bar infectious plague and leprosy sufferers from their wards?',
        },
        {
          objective:
            'Explain why the vast majority of ordinary peasants relied entirely on female family members and wise women.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explore practical village midwifery, poultices, bone-setting, and oral herbal tradition delivered at zero financial cost.',
          question:
            'Why was domestic healthcare provided by women often safer and more effective than professional medical care?',
        },
      ],
      source_context: {
        'Source A':
          'Medieval Surgeon Suturing a Head Wound, from a 14th-century surgical manuscript (MS Sloane 1977). Illustrates a barber-surgeon using a curved needle and silk thread to stitch a deep cranial laceration while his assistant steadies the conscious patient. Hinge Question: What does this depiction of manual surgery reveal about the practical skill—and immense pain—involved in medieval trauma treatment?',
        'Source B':
          'Hôtel-Dieu Hospital Ward, miniature from the Livre de Vie Active (c.1482). Depicts Augustinian nuns nursing bedridden patients wrapped in white linen shrouds, while a priest conducts the Catholic Mass at an altar directly visible from every patient bed. Hinge Question: How does this hospital miniature demonstrate the medieval principle of ‘care not cure’?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: University-Trained Physicians: Theory, Wealth & Status (c. 1250)',
        theme_heading: 'Act 1: University-Trained Physicians: Theory, Wealth & Status (c. 1250)',
        text: '<span class="para-ref">[1.1]</span> In medieval England, access to formal medical treatment was rigidly stratified by wealth and social class. At the absolute summit of the professional hierarchy stood the university-trained physician. Medical doctors trained for up to a decade at prestigious universities—including Oxford, Cambridge, Paris, Montpellier, and Bologna—studying in Latin and mastering the canonical texts of Hippocrates, Galen, and Avicenna. However, their education was entirely scholastic and theoretical: students debated philosophical disputations and memorized classical humoral aphorisms without ever touching a living patient or conducting a physical clinical dissection.<br><br><span class="para-ref">[1.2]</span> Because university training was immensely lengthy and costly, licensed physicians were exceptionally scarce: by 1300, there were fewer than one hundred university-trained doctors across the entirety of England. Gowned physicians considered physical manual labor beneath their intellectual dignity, refusing to cut into human skin, lance boils, or dress wounds. Instead, they conducted dignified bedside consultations, examining urine flasks, taking pulses, checking astrological charts, and writing complex Latin prescriptions. Because their consultation fees were exorbitant, physicians catered exclusively to the royal court, landowning aristocracy, and ultra-wealthy urban merchants, leaving ninety-nine percent of the population completely beyond their reach.',
      },
      {
        act: 2,
        title: 'Act 2: Guild Apothecaries & Spicers (c. 1300)',
        theme_heading: 'Act 2: Guild Apothecaries & Spicers (c. 1300)',
        text: '<span class="para-ref">[2.1]</span> For ordinary urban burghers, tradesmen, and master craftsmen who could never afford a physician, the high-street provider of physical medicine was the apothecary. Apothecaries were organized as skilled merchant craftsmen within powerful urban trade guilds—such as the Worshipful Company of Grocers in London. Unlike university doctors, apothecaries did not attend university; they acquired their extensive practical knowledge through seven-year apprenticeships, learning to identify, dry, weigh, and blend botanical herbs, mineral compounds, and imported spices.<br><br><span class="para-ref">[2.2]</span> Operating open shopfronts stocked with rows of labeled ceramic majolica jars, apothecaries compounded electuaries, soothing syrups, herbal simples, and clysters. While formal law stipulated that apothecaries were merely meant to compound recipes prescribed by licensed physicians, in everyday practice they served as direct diagnostic prescribers for townspeople. Dispensing medicines at a fraction of a physician’s fee, apothecaries were frequently accused by academic doctors of commercial quackery and illicit competition, yet they remained the indispensable pharmaceutical backbone of medieval town life.',
      },
      {
        act: 3,
        title: 'Act 3: Barber-Surgeons & Manual Wound Care (c. 1320)',
        theme_heading: 'Act 3: Barber-Surgeons & Manual Wound Care (c. 1320)',
        source: {
          id: 'source_a_surgeon_suturing',
          letter: 'A',
          title: 'Source A: Medieval Surgeon Suturing a Head Wound (14th c.)',
          src: '/images/medieval_surgeon_suturing.jpg',
          source: '/images/medieval_surgeon_suturing.jpg',
          image: '/images/medieval_surgeon_suturing.jpg',
          caption:
            'A 14th-century illumination depicting a barber-surgeon stitching a cranial laceration on a conscious patient with needle and thread.',
          desc: 'Fourteenth-century surgical miniature of head suturing.',
          provenance:
            'Chirurgia Magna by Guy de Chauliac, France/England, 14th century. Bibliothèque nationale de France (Shelfmark: MS Français 24249).',
          citation:
            'Chirurgia Magna by Guy de Chauliac, France/England, 14th century. Bibliothèque nationale de France (Shelfmark: MS Français 24249).',
          question:
            'What does this depiction of manual surgery reveal about the practical skill—and immense pain—involved in medieval trauma treatment?',
          hinge_question:
            'What does this depiction of manual surgery reveal about the practical skill—and immense pain—involved in medieval trauma treatment?',
          source_context:
            'Illustrates a barber-surgeon using a curved needle and silk thread to stitch a deep cranial laceration while his assistant steadies the conscious patient.',
          context:
            'Illustrates a barber-surgeon using a curved needle and silk thread to stitch a deep cranial laceration while his assistant steadies the conscious patient.',
        },
        text: '<span class="para-ref">[3.1]</span> Because university-trained physicians refused to engage in manual surgical intervention, all bloody, physical procedures were relegated to the lower-status barber-surgeon (<span class="archival-meta-tag">Source A</span>). Grouped within merchant trade guilds alongside ordinary barbers, these craftsmen were trained through practical manual apprenticeships rather than academic Latin treatises. Armed with bone saws, cauterizing irons, curved suture needles, razors, and forceps, barber-surgeons operated on the violent physical realities of medieval life: pulling infected teeth, lancing painful carbuncles, resetting dislocated joints, and dressing battle wounds.<br><br><span class="para-ref">[3.2]</span> On rare occasions, skilled surgeons performed major trauma operations, including the trepanning of fractured skulls to relieve intracranial pressure and the amputation of crushed or gangrenous limbs. These procedures were executed with agonizing speed on fully conscious patients held down by burly assistants, with pain dulled only by ale, wine, or dangerous herbal narcotics like hemlock and henbane. To halt torrential arterial bleeding, surgeons sealed severed stumps with red-hot cautery irons or boiling elderberry oil. Because they worked with their hands and were steeped in blood, barber-surgeons were held in low social esteem by the academic elite, yet their empirical dexterity saved countless trauma victims.',
      },
      {
        act: 4,
        title: 'Act 4: Monastic Hospitals: Spiritual ‘Care Not Cure’ (c. 1350)',
        theme_heading: 'Act 4: Monastic Hospitals: Spiritual ‘Care Not Cure’ (c. 1350)',
        source: {
          id: 'source_b_hotel_dieu',
          letter: 'B',
          title: 'Source B: Hôtel-Dieu Hospital Ward (Livre de Vie Active, c.1482)',
          src: '/images/hotel_dieu_hospital.jpg',
          source: '/images/hotel_dieu_hospital.jpg',
          image: '/images/hotel_dieu_hospital.jpg',
          caption:
            'A 15th-century illumination depicting Augustinian hospital nuns caring for sick patients in shared beds facing a chapel altar.',
          desc: 'Fifteenth-century illumination of a medieval monastic hospital ward.',
          provenance:
            'Jean Henry, Le Livre de Vie Active des Religieuses de l’Hôtel-Dieu de Paris, c.1482. Musée de l’Assistance Publique, Paris.',
          citation:
            'Jean Henry, Le Livre de Vie Active des Religieuses de l’Hôtel-Dieu de Paris, c.1482. Musée de l’Assistance Publique, Paris.',
          question:
            'How does this hospital miniature demonstrate the medieval principle of ‘care not cure’?',
          hinge_question:
            'How does this hospital miniature demonstrate the medieval principle of ‘care not cure’?',
          source_context:
            'Depicts Augustinian nuns nursing bedridden patients wrapped in white linen shrouds, while a priest conducts the Catholic Mass at an altar directly visible from every patient bed.',
          context:
            'Depicts Augustinian nuns nursing bedridden patients wrapped in white linen shrouds, while a priest conducts the Catholic Mass at an altar directly visible from every patient bed.',
        },
        text: '<span class="para-ref">[4.1]</span> Between 1100 and 1500, over 1,200 hospitals were founded across England by religious orders, philanthropic monarchs, and wealthy churchmen, including famous London foundations like St Bartholomew’s (founded 1123) and St Thomas’s (<span class="archival-meta-tag">Source B</span>). However, a medieval hospital (derived from the Latin <em>hospitium</em>, meaning hospitality) was not an institution of clinical medical treatment. Staffed entirely by Catholic monks, infirmarers, and nuns, hospitals functioned as religious houses of Christian charity, designed to provide shelter, warmth, clean bedding, and two simple meals a day to elderly destitute folk, weary pilgrims, and the infirm.<br><br><span class="para-ref">[4.2]</span> The overarching philosophy of the medieval hospital was strictly spiritual: "Care, not cure" (<em>cura praestatur, non sanatio</em>). Hospital wards were constructed with high timber roofs mirroring cathedral naves, arranged so that every row of beds faced directly toward the altar of a chapel at the eastern end of the hall. Patients were required to lie in bed, witness daily Catholic Mass, recite the rosary, and confess their mortal sins before death to ensure their souls avoided damnation. Crucially, university physicians were rarely employed, and patients suffering from infectious contagious diseases—such as plague, leprosy, smallpox, or scrofula—alongside pregnant women were strictly banned from admission to preserve institutional sanctity and prevent contamination.',
      },
      {
        act: 5,
        title: 'Act 5: Women Healers & Household Care (c. 1400)',
        theme_heading: 'Act 5: Women Healers & Household Care (c. 1400)',
        text: '<span class="para-ref">[5.1]</span> For the overwhelming majority of medieval people—the ninety percent of the population living in rural peasant villages—formal physicians, guild apothecaries, and monastic hospitals were completely inaccessible. When sickness struck a peasant cottage, healthcare was delivered entirely within the domestic household by women: wives, mothers, grandmothers, and local village wise women.<br><br><span class="para-ref">[5.2]</span> Peasant women possessed an extensive practical knowledge of herbal remedies cultivated in cottage kitchen gardens or gathered from hedgerows, boiling soothing broths, preparing warm bread-and-milk poultices for swollen joints, and mixing herbal salves for burns and rashes. In every village, experienced local women served as traditional midwives, managing labor and delivering infants using herbal teas, warm compresses, and manual techniques passed down through female oral tradition. Despite being completely excluded from universities and condemned by male physicians, women healers provided compassionate, practical, and accessible healthcare that was often far safer than the dangerous bloodletting and violent purges administered by the professional elite.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1250',
        para_ref: '[1.1–1.2]',
        heading: 'Why were university physicians accessible only to the ultra-wealthy?',
        bullets: [
          'Training ten years in Latin disputations and Galen',
          'Charging exorbitant bedside consultation fees',
          'Refusing manual surgical cutting as beneath dignity',
        ],
        focus_clue: 'Why were university physicians accessible only to the ultra-wealthy?',
      },
      {
        step: 2,
        date: 'c1300',
        para_ref: '[2.1–2.2]',
        heading: 'How did apothecaries provide accessible medicines to townspeople?',
        bullets: [
          'Serving seven-year practical merchant guild apprenticeships',
          'Dispensing herbal simples and syrups from shopfronts',
          'Offering cheap medicinal alternatives to town burghers',
        ],
        focus_clue: 'How did apothecaries provide accessible medicines to townspeople?',
      },
      {
        step: 3,
        date: 'c1320',
        para_ref: '[3.1–3.2]',
        heading: 'Why were barber-surgeons viewed as lower-status craftsmen?',
        bullets: [
          'Performing bloody manual procedures and amputations',
          'Belonging to craft trade guilds rather than universities',
          'Working with cautery irons without anaesthetic',
        ],
        focus_clue: 'Why were barber-surgeons viewed as lower-status craftsmen?',
      },
      {
        step: 4,
        date: 'c1350',
        para_ref: '[4.1–4.2]',
        heading: 'Why did monastic hospitals deliberately avoid medical treatment?',
        bullets: [
          'Emphasizing spiritual care not cure in chapels',
          'Providing clean beds and hot broth to elderly pilgrims',
          'Barring infectious plague and leprosy sufferers',
        ],
        focus_clue: 'Why did monastic hospitals deliberately avoid medical treatment?',
      },
      {
        step: 5,
        date: 'c1400',
        para_ref: '[5.1–5.2]',
        heading: 'Why did the vast majority of sick people rely on female family members?',
        bullets: [
          'Administering domestic garden poultices and tisanes',
          'Delivering village infants through traditional midwifery',
          'Providing free practical care inside peasant cottages',
        ],
        focus_clue: 'Why did the vast majority of sick people rely on female family members?',
      },
    ],
    causal_domino_spine: {
      title: 'Medical Care Providers & Monastic Hospitals: ‘Care Not Cure’',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1250',
          para_ref: '[1.1–1.2]',
          title: 'University-Trained Physicians',
          actor: 'Oxford & Cambridge Medical Fellows',
          tag: '🎓 SCHOLASTIC PHYSICIANS',
          trigger:
            'Physicians trained for up to a decade in Latin scholastic philosophy at universities like Oxford and Cambridge, mastering Galen and Avicenna without clinical dissection.',
          desc: 'Physicians trained for up to a decade in Latin scholastic philosophy at universities like Oxford and Cambridge, mastering Galen and Avicenna without clinical dissection.',
          connective:
            'Catered exclusively to the royal court and ultra-wealthy aristocracy due to exorbitant fees, refusing manual surgery as beneath academic dignity.',
          question: 'Why were university physicians accessible only to the ultra-wealthy?',
        },
        {
          step: 2,
          date: 'c1300',
          para_ref: '[2.1–2.2]',
          title: 'Guild Apothecaries & Spicers',
          actor: 'Worshipful Company of Grocers & Spicers',
          tag: '🏺 GUILD APOTHECARIES',
          trigger:
            'Apothecaries trained through rigorous merchant guild apprenticeships, stocking imported Eastern spices, mineral compounds, and dried medicinal herbs in London shops.',
          desc: 'Apothecaries trained through rigorous merchant guild apprenticeships, stocking imported Eastern spices, mineral compounds, and dried medicinal herbs in London shops.',
          connective:
            'Dispensed affordable remedies, ointments, and clysters to ordinary town weavers and tradesmen, operating as accessible high-street alternatives to doctors.',
          question: 'How did apothecaries provide accessible medicines to townspeople?',
        },
        {
          step: 3,
          date: 'c1320',
          para_ref: '[3.1–3.2]',
          title: 'Barber-Surgeons & Wound Care',
          actor: 'Barber-Surgeons’ Company',
          tag: '🪒 BARBER-SURGEONS',
          trigger:
            'Barber-surgeons performed manual, blood-soaked physical procedures: pulling rotten molars, lancing painful boils, setting broken bones, and amputating shattered limbs.',
          desc: 'Barber-surgeons performed manual, blood-soaked physical procedures: pulling rotten molars, lancing painful boils, setting broken bones, and amputating shattered limbs.',
          connective:
            'Occupied lower social status than university physicians because they worked with their hands, using cauterising irons and boiling oil without pain relief.',
          question: 'Why were barber-surgeons viewed as lower-status craftsmen?',
        },
        {
          step: 4,
          date: 'c1350',
          para_ref: '[4.1–4.2]',
          title: 'Monastic Hospitals: Care Not Cure',
          actor: 'Monks, Nuns & Infirmarers',
          tag: '⛪ MONASTIC HOSPITALS',
          trigger:
            'Over 1,200 hospitals were founded in medieval England by religious orders, providing warm beds, clean linens, and daily meals to elderly pilgrims and the destitute.',
          desc: 'Over 1,200 hospitals were founded in medieval England by religious orders, providing warm beds, clean linens, and daily meals to elderly pilgrims and the destitute.',
          connective:
            'Emphasised "care not cure": wards faced chapel altars so patients could witness Mass, while infectious victims of leprosy and plague were strictly barred.',
          question: 'Why did monastic hospitals deliberately avoid medical treatment?',
        },
        {
          step: 5,
          date: 'c1400',
          para_ref: '[5.1–5.2]',
          title: 'Women Healers & Household Care',
          actor: 'Village Mothers & Wise Women',
          tag: '🏡 DOMESTIC HEALERS',
          trigger:
            'The vast majority of medieval healthcare was delivered inside the peasant home by female family members, local midwives, and village wise women.',
          desc: 'The vast majority of medieval healthcare was delivered inside the peasant home by female family members, local midwives, and village wise women.',
          connective:
            'Brewed herbal teas, applied bread poultices, and delivered infants, preserving vital practical knowledge through oral tradition at zero financial cost.',
          question: 'Why did the vast majority of sick people rely on female family members?',
        },
      ],
    },
  },

  lesson_1_5: {
    teacher_notes: {
      primer:
        'This concluding case study examines the catastrophe of the Black Death in England (1348–1349): trade route vector, clinical manifestations (bubonic vs pneumonic), desperate treatments, royal miasma sanitation decrees, and mass burial demographic collapse.',
      objectives: [
        {
          objective:
            'Explain how maritime trade routes introduced the Black Death into southern England at Melcombe Regis in 1348.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize the Gascon wine cog, black ship rats (Rattus rattus), rodent fleas (Xenopsylla cheopis), and the bacillus Yersinia pestis.',
          question:
            'How did trade routes and shipping unwittingly create the perfect transmission corridor for the Black Death?',
        },
        {
          objective:
            'Distinguish between the clinical symptoms and mortality rates of bubonic and pneumonic plague.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source B (Victim with Buboes). Contrast flea-borne buboes (lymph nodes) with aerosolized pulmonary droplets coughing black blood.',
          question:
            'Why was pneumonic plague far more terrifying to medieval communities than the bubonic strain?',
        },
        {
          objective:
            'Analyse why medical treatments (hot knives, strapped chickens, emerald potions) completely failed.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Discuss lancing buboes with cautery irons, folk remedies, and theriac concoctions accelerating fatal septic shock.',
          question:
            'Why did contemporary medical treatments often accelerate the death of plague victims rather than saving them?',
        },
        {
          objective:
            'Evaluate King Edward III’s 1349 cleanliness order and civic attempts to combat pestilential miasma.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on posies, street bonfires, locking town gates at Gloucester, and Edward III’s royal mandate to London aldermen.',
          question:
            'Why were royal sanitation decrees completely powerless to stop the spread of the Black Death?',
        },
        {
          objective:
            'Assess the demographic collapse, mass emergency burial pits, and long-term socio-economic breakdown of feudalism.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source A (Citizens of Tournai Burying Plague Victims). Explore East Smithfield trench pits, 30-50% mortality, labour shortages, and the collapse of serfdom.',
          question:
            'How did the demographic catastrophe of the Black Death permanently alter English medieval society?',
        },
      ],
      source_context: {
        'Source A':
          'Citizens of Tournai Burying Plague Victims (1349), illumination from Gilles li Muisis’s chronicle (MS 13076-13077). Depicts citizens frantically carrying multiple wooden coffins through city streets toward overflowing cemetery pits during the peak of the Black Death. Hinge Question: How does this contemporary illumination convey the total breakdown of customary individual funeral rites during the Black Death?',
        'Source B':
          'Plague Victim with Groin and Armpit Buboes, woodcut from Hieronymus Brunschwig’s Cirurgia (Strasbourg, 1497). Illustrates a physician examining an infected patient bedridden with blackened, inflammatory lymphatic swellings (buboes) in the groin and axilla. Hinge Question: What does this depiction of agonizing buboes reveal about the physiological horror and medical helplessness of plague treatment?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Arrival at Melcombe Regis: Trade Routes & The Rat Vector (June 1348)',
        theme_heading:
          'Act 1: Arrival at Melcombe Regis: Trade Routes & The Rat Vector (June 1348)',
        text: '<span class="para-ref">[1.1]</span> In late June 1348, a merchant vessel from Gascony carrying barrels of wine dropped anchor at the southern English port of Melcombe Regis in Dorset. Unbeknownst to the dockers who unloaded the cargo, the bilge timbers and sacking harboured black ship rats (<em>Rattus rattus</em>) infested with tropical rodent fleas (<em>Xenopsylla cheopis</em>), themselves gorged on the virulent bacillus <em>Yersinia pestis</em>. Within weeks, the catastrophic pandemic known to chroniclers as the "Great Pestilence" or "Great Mortality"—and later named the Black Death—ignited across the Dorset countryside. Propelled along overland trade corridors and coastal shipping lanes, it engulfed Bristol, Salisbury, and London by Michaelmas 1348.<br><br><span class="para-ref">[1.2]</span> The rapid velocity of transmission was accelerated by crowded, unpaved timber settlements where families lived in close proximity to livestock, open drains, and infested straw bedding. England had experienced no major plague outbreak for over six centuries; its population possessed zero acquired biological immunity. Within eighteen months, the pestilence obliterated between thirty and fifty percent of the English population, slaughtering an estimated 1.5 to 2 million men, women, and children and devastating the economic fabric of the realm.',
      },
      {
        act: 2,
        title: 'Act 2: Clinical Terror: Bubonic vs Pneumonic Plague (Autumn 1348)',
        theme_heading: 'Act 2: Clinical Terror: Bubonic vs Pneumonic Plague (Autumn 1348)',
        source: {
          id: 'source_b_plague_victim_buboes',
          letter: 'B',
          title: 'Source B: Plague Victim with Groin and Armpit Buboes (1497)',
          src: '/images/plague_victim_buboes.jpg',
          source: '/images/plague_victim_buboes.jpg',
          image: '/images/plague_victim_buboes.jpg',
          caption:
            'A 15th-century woodcut showing a bedridden patient displaying agonizing swollen buboes in the armpit and groin.',
          desc: 'Fifteenth-century woodcut of a plague sufferer with buboes.',
          provenance:
            'Hieronymus Brunschwig, Buch der Cirurgia, Strasbourg: Johann Grüninger, 1497. Wellcome Collection, London (Shelfmark: EPB/A 1152).',
          citation:
            'Hieronymus Brunschwig, Buch der Cirurgia, Strasbourg: Johann Grüninger, 1497. Wellcome Collection, London (Shelfmark: EPB/A 1152).',
          question:
            'What does this depiction of agonizing buboes reveal about the physiological horror and medical helplessness of plague treatment?',
          hinge_question:
            'What does this depiction of agonizing buboes reveal about the physiological horror and medical helplessness of plague treatment?',
          source_context:
            'Illustrates a physician examining an infected patient bedridden with blackened, inflammatory lymphatic swellings (buboes) in the groin and axilla.',
          context:
            'Illustrates a physician examining an infected patient bedridden with blackened, inflammatory lymphatic swellings (buboes) in the groin and axilla.',
        },
        text: '<span class="para-ref">[2.1]</span> The disease struck terror through two distinct, devastating clinical manifestations (<span class="archival-meta-tag">Source B</span>). The predominant strain was Bubonic Plague, transmitted directly through the bite of an infected rat flea regurgitating bacteria into the human lymphatic system. Sufferers experienced abrupt chills, delirium, agonizing headaches, and subcutaneous haemorrhages that formed dark purple and black petechiae—known morbidly as "God’s tokens." Within hours, violent inflammatory swellings called buboes erupted in the lymph nodes of the groin, armpits, and neck, rapidly swelling to the size of apples, blackened with necrosis and oozing putrid matter. Untreated bubonic victims died in agony within three to five days with mortality rates reaching seventy to eighty percent.<br><br><span class="para-ref">[2.2]</span> The second, even more terrifying manifestation was Pneumonic Plague, occurring when the bacterial infection invaded the lungs. Spread directly through aerosolized droplets in breath, sneezes, and bloodstained sputum, pneumonic plague bypassed the flea vector entirely, transmitting rapidly from person to person within enclosed cottages. Pneumonic victims suffered burning fever, agonizing chest pain, coughed frothy black blood, and succumbed within forty-eight hours with a mortality rate approaching one hundred percent. The lethal speed of pneumonic infection caused widespread panic, prompting terrified families to abandon sick children and priests to refuse deathbed confessions.',
      },
      {
        act: 3,
        title: 'Act 3: Desperate Treatments: Hot Knives & Strapped Chickens (Winter 1348)',
        theme_heading: 'Act 3: Desperate Treatments: Hot Knives & Strapped Chickens (Winter 1348)',
        text: '<span class="para-ref">[3.1]</span> Contemporary medical practitioners proved totally impotent against the bacillus, offering treatments that were futile, agonizing, and lethal. Guided by humoural doctrine, barber-surgeons attempted to evacuate corrupt matter by applying heated cupping glasses to buboes or slicing them open with red-hot cautery irons. This crude surgery frequently induced catastrophic secondary septic shock, while allowing bacteria to contaminate instruments and hands, accelerating the spread of infection to attending healers.<br><br><span class="para-ref">[3.2]</span> Desperate folk remedies abounded across villages: healers strapped live, plucked chickens or dried toads directly to swollen buboes, believing the creature’s warm belly would draw the venomous poison out of the human body until the animal perished. Apothecaries prescribed costly concoctions of crushed emeralds dissolved in vinegar, melted gold cordial, and heavy doses of Theriac treacle. In domestic sickrooms, families burned sulfur, pitch, and dried rosemary to fumigate the air, while desperate sufferers drank concoctions of urine and crushed marigolds. Every single treatment failed completely, exposing the absolute bankruptcy of medieval therapeutics.',
      },
      {
        act: 4,
        title: 'Act 4: King Edward III’s Cleanliness Order & Miasma Prevention (1349)',
        theme_heading: 'Act 4: King Edward III’s Cleanliness Order & Miasma Prevention (1349)',
        text: '<span class="para-ref">[4.1]</span> In a desperate attempt to fend off miasma, civic leaders and citizens adopted aggressive environmental measures. People walked through alleys holding sweet posies, dried lavender, or sponges steeped in vinegar to their nostrils, while pitch fires burned perpetually at crossroads to purify the air. Certain urban settlements attempted quarantine: the borough of Gloucester sealed its town gates against all outsiders, though country lanes soon brought the infection regardless.<br><br><span class="para-ref">[4.2]</span> In April 1349, King Edward III dispatched an urgent royal mandate to the Mayor of London, furiously denouncing the filthy conditions of the capital where human dung, horse carcasses, and butchers’ entrails fouled the streets, generating a deadly stench that threatened his royal court. Edward demanded immediate civic street-clearing to dispel the pestilential miasma. However, because authorities lacked an organized sanitation bureaucracy or police enforcement, and remained wholly ignorant of the rodent and flea vector, royal decrees proved entirely powerless to halt the epidemic.',
      },
      {
        act: 5,
        title: 'Act 5: Mass Burial Pits & Demographic Collapse (1349–1350)',
        theme_heading: 'Act 5: Mass Burial Pits & Demographic Collapse (1349–1350)',
        source: {
          id: 'source_a_tournai_burials',
          letter: 'A',
          title: 'Source A: Citizens of Tournai Burying Plague Victims (1349)',
          src: '/images/tournai_plague_burials.jpg',
          source: '/images/tournai_plague_burials.jpg',
          image: '/images/tournai_plague_burials.jpg',
          caption:
            'A 14th-century chronicle miniature showing citizens carrying multiple wooden coffins through city streets toward communal mass burial pits.',
          desc: 'Fourteenth-century miniature depicting mass burials during the Black Death.',
          provenance:
            'Gilles li Muisis, Chronica majus, Tournai, Flanders, 1349–1352. Bibliothèque royale de Belgique, Brussels (Shelfmark: MS 13076-13077).',
          citation:
            'Gilles li Muisis, Chronica majus, Tournai, Flanders, 1349–1352. Bibliothèque royale de Belgique, Brussels (Shelfmark: MS 13076-13077).',
          question:
            'How does this contemporary illumination convey the total breakdown of customary individual funeral rites during the Black Death?',
          hinge_question:
            'How does this contemporary illumination convey the total breakdown of customary individual funeral rites during the Black Death?',
          source_context:
            'Depicts citizens frantically carrying multiple wooden coffins through city streets toward overflowing cemetery pits during the peak of the Black Death.',
          context:
            'Depicts citizens frantically carrying multiple wooden coffins through city streets toward overflowing cemetery pits during the peak of the Black Death.',
        },
        text: '<span class="para-ref">[5.1]</span> In London and provincial cities, parish graveyards filled so rapidly that Bishop Ralph Stratford purchased land at No Man’s Land and East Smithfield to excavate colossal communal trench pits (<span class="archival-meta-tag">Source A</span>). In these emergency mass burial trenches, thousands of decaying corpses were stacked like cordwood in layers five deep under thin coatings of Thames river clay. Traditional Christian burial rituals—solemn funeral processions, ringing bells, individual coffins, and consecrated personal graves—collapsed entirely as terrified gravediggers dumped bodies from night-carts.<br><br><span class="para-ref">[5.2]</span> The long-term societal consequence of the Black Death was an unprecedented structural shock to feudal England. Wiping out 30% to 50% of the entire population, the pandemic created an acute shortage of agricultural farm labourers. Surviving serfs demanded significantly higher wages and refused to perform customary unpaid feudal manorial duties, moving between estates in search of higher pay. When Parliament attempted to freeze wages through the 1351 Statute of Labourers, deep social resentments ignited that culminated thirty years later in the Peasants’ Revolt of 1381. The Black Death permanently shattered the stability of medieval feudalism while standing as permanent historical proof of the total impotence of medieval medicine.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'June 1348',
        para_ref: '[1.1–1.2]',
        heading: 'How did trade routes unwittingly bring the plague to England?',
        bullets: [
          'Docking trade cogs from Gascony in Dorset',
          'Unloading flea-infested wool sacks onto wharves',
          'Spreading black rats into crowded timber cottages',
        ],
        focus_clue: 'How did trade routes unwittingly bring the plague to England?',
      },
      {
        step: 2,
        date: 'Autumn 1348',
        para_ref: '[2.1–2.2]',
        heading: 'Why was the pneumonic strain far deadlier than the bubonic form?',
        bullets: [
          'Swelling agonizing egg-sized groin lumps',
          'Coughing bloody phlegm across family rooms',
          'Killing infected farm labourers within three days',
        ],
        focus_clue: 'Why was the pneumonic strain far deadlier than the bubonic form?',
      },
      {
        step: 3,
        date: 'Winter 1348',
        para_ref: '[3.1–3.2]',
        heading: 'Why were medical treatments completely useless against the plague?',
        bullets: [
          'Lancing hard neck swellings with hot knives',
          'Strapping plucked live hens to dark sores',
          'Drinking crushed emerald stones dissolved in vinegar',
        ],
        focus_clue: 'Why were medical treatments completely useless against the plague?',
      },
      {
        step: 4,
        date: '1349',
        para_ref: '[4.1–4.2]',
        heading: 'How did belief in miasma shape royal prevention orders?',
        bullets: [
          'Ordering town bailiffs to clear butchered animal entrails',
          'Shovelling horse dung out of unpaved London streets',
          'Lighting smoking pitch fires at road corners',
        ],
        focus_clue: 'How did belief in miasma shape royal prevention orders?',
      },
      {
        step: 5,
        date: '1349–1350',
        para_ref: '[5.1–5.2]',
        heading: 'Why did the Black Death trigger a long-term social and economic crisis?',
        bullets: [
          'Digging vast emergency trenches at East Smithfield',
          'Piling stacked corpses under thin river clay',
          'Losing half of England’s agricultural workforce',
        ],
        focus_clue: 'Why did the Black Death trigger a long-term social and economic crisis?',
      },
    ],
    causal_domino_spine: {
      title: 'Case Study: The Black Death in England (1348–1349)',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'June 1348',
          para_ref: '[1.1–1.2]',
          title: 'Arrival at Melcombe Regis',
          actor: 'Gascon Cog Sailors & Dorset Stevedores',
          tag: '🚢 MARITIME VECTOR',
          trigger:
            'In late June 1348, a merchant cog from Gascony carrying wine casks docked at Melcombe Regis in Dorset, carrying black rats infested with Xenopsylla cheopis fleas.',
          desc: 'In late June 1348, a merchant cog from Gascony carrying wine casks docked at Melcombe Regis in Dorset, carrying black rats infested with Xenopsylla cheopis fleas.',
          connective:
            'Unwittingly introduced Yersinia pestis into southern England, spreading like wildfire along trade roads toward Bristol, Gloucester, and London.',
          question: 'How did trade routes unwittingly bring the plague to England?',
        },
        {
          step: 2,
          date: 'Autumn 1348',
          para_ref: '[2.1–2.2]',
          title: 'Buboes & Pneumonic Terror',
          actor: 'Victims & Terrified Households',
          tag: '💀 CLINICAL HORROR',
          trigger:
            'The pandemic manifested in two terrifying forms: bubonic plague causing agonizing groin buboes, and highly contagious pneumonic plague spreading via bloody cough droplets.',
          desc: 'The pandemic manifested in two terrifying forms: bubonic plague causing agonizing groin buboes, and highly contagious pneumonic plague spreading via bloody cough droplets.',
          connective:
            'Killed victims within three to five days with mortality rates reaching eighty percent, causing total societal panic and the abandonment of sick relatives.',
          question: 'Why was the pneumonic strain far deadlier than the bubonic form?',
        },
        {
          step: 3,
          date: 'Winter 1348',
          para_ref: '[3.1–3.2]',
          title: 'Desperate Treatments & Strapped Chickens',
          actor: 'Helpless Apothecaries & Barber-Surgeons',
          tag: '🔪 FUTILE REMEDIES',
          trigger:
            'Helpless physicians and barber-surgeons lanced blackened buboes with hot knives, strapped live plucked hens to sores, and prescribed expensive emerald potions.',
          desc: 'Helpless physicians and barber-surgeons lanced blackened buboes with hot knives, strapped live plucked hens to sores, and prescribed expensive emerald potions.',
          connective:
            'Failed completely to cure patients, often causing fatal secondary septic shock while accelerating the spread of infection among desperate families.',
          question: 'Why were medical treatments completely useless against the plague?',
        },
        {
          step: 4,
          date: '1349',
          para_ref: '[4.1–4.2]',
          title: 'King Edward III’s Cleanliness Order',
          actor: 'King Edward III & London Aldermen',
          tag: '📜 ROYAL SANITATION',
          trigger:
            'Believing corrupted miasma caused the plague, King Edward III issued an urgent 1349 mandate ordering the Mayor of London to clear animal offal and street filth.',
          desc: 'Believing corrupted miasma caused the plague, King Edward III issued an urgent 1349 mandate ordering the Mayor of London to clear animal offal and street filth.',
          connective:
            'Prompted rudimentary street-sweeping and bonfire-lighting, but failed to curb the pandemic because magistrates remained ignorant of the rodent-and-flea vector.',
          question: 'How did belief in miasma shape royal prevention orders?',
        },
        {
          step: 5,
          date: '1349–1350',
          para_ref: '[5.1–5.2]',
          title: 'Mass Burial Pits & Demographic Collapse',
          actor: 'Parish Gravediggers & Royal Commissioners',
          tag: '⚰️ MASS GRAVES & SOCIAL SHOCK',
          trigger:
            'Churchyards overflowed within months, forcing London authorities to open vast emergency mass trenches at East Smithfield to bury thousands of stacked corpses.',
          desc: 'Churchyards overflowed within months, forcing London authorities to open vast emergency mass trenches at East Smithfield to bury thousands of stacked corpses.',
          connective:
            'Wiped out 30% to 50% of England’s total population, creating severe agricultural labour shortages and sparking the long-term breakdown of the feudal system.',
          question: 'Why did the Black Death trigger a long-term social and economic crisis?',
        },
      ],
    },
  },
};

// ============================================================================
// APPLY MIGRATION TO LESSONS 1.1 THROUGH 1.5
// ============================================================================

for (let i = 0; i < 5; i++) {
  const lesson = unitData.lessons[i];
  const updateData = MEDIEVAL_5_ACT_DATA[lesson.id];
  if (!updateData) continue;

  console.log(`\nTransforming ${lesson.id} (${lesson.title})...`);

  // 1. Remove note_scaffold
  if (lesson.note_scaffold) {
    delete lesson.note_scaffold;
    console.log(`  - Removed obsolete note_scaffold.`);
  }

  // 2. Apply 5 narrative_blocks
  lesson.narrative_blocks = updateData.narrative_blocks;
  console.log(`  - Applied 5 narrative blocks (${lesson.narrative_blocks.length} Acts).`);

  // 3. Apply workbook_stages
  lesson.workbook_stages = updateData.workbook_stages;
  console.log(`  - Aligned workbook_stages (${lesson.workbook_stages.length} stages).`);

  // 4. Apply causal_domino_spine
  lesson.causal_domino_spine = updateData.causal_domino_spine;
  console.log(
    `  - Aligned causal_domino_spine (${lesson.causal_domino_spine.stages.length} stages).`,
  );

  // 5. Apply teacher_notes
  lesson.teacher_notes = updateData.teacher_notes;
  console.log(`  - Updated teacher_notes with 5 structured objectives & hinge questions.`);
}

// Format back to JavaScript module string
const newFileContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log('\n✅ Successfully migrated Key Topic 1 (Medieval) to 5-Act Gold Standard in data.js!');
