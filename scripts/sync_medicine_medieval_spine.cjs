const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');

const medievalSpines = {
  lesson_1_1: {
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
        para_ref: '[1.2, 2.1]',
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
        para_ref: '[4.1–4.2]',
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
      title: 'Supernatural & Religious Explanations: Church Monopoly & Galen',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1250',
          para_ref: '[1.1–1.2]',
          title: 'Scriptoria & Church Monopoly on Learning',
          actor: 'Monastic Scribes & The Catholic Church',
          tag: '⛪ CHURCH MONOPOLY',
          trigger:
            'Throughout the Middle Ages, the Catholic Church held an institutional monopoly over book production, hand-copying Latin medical treatises in monastic scriptoria by candle-light.',
          desc: 'Throughout the Middle Ages, the Catholic Church held an institutional monopoly over book production, hand-copying Latin medical treatises in monastic scriptoria by candle-light.',
          connective:
            'Enforced strict doctrinal censorship, suppressing dissent and establishing Galenic teleology and biblical dogma as unchallengeable medical truth.',
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
            'Society viewed sudden disease and terrifying epidemics as divine retribution sent by God to chastise moral sin or test individual devotion.',
          desc: 'Society viewed sudden disease and terrifying epidemics as divine retribution sent by God to chastise moral sin or test individual devotion.',
          connective:
            'Subjected lepers to symbolic funeral rites before exiling them to isolated Lazar houses outside city walls with warning clappers.',
          question: 'Why was leprosy viewed as visible proof of divine judgment?',
        },
        {
          step: 3,
          date: '1345',
          para_ref: '[3.1–3.2]',
          title: 'Christian Astrology & Planetary Conjunction',
          actor: 'University of Paris Medical Faculty',
          tag: '⭐ CELESTIAL ASTROLOGY',
          trigger:
            'Scholars integrated astrology into university curricula, carrying pocket Vademecum almanacs featuring the Zodiac Man to guide medical interventions.',
          desc: 'Scholars integrated astrology into university curricula, carrying pocket Vademecum almanacs featuring the Zodiac Man to guide medical interventions.',
          connective:
            'Led the Paris medical faculty to blame the Black Death on the 1345 conjunction of Saturn, Jupiter, and Mars in Aquarius corrupting atmospheric air.',
          question: 'How did the Church reconcile astrology with Christian doctrine?',
        },
        {
          step: 4,
          date: 'c1350',
          para_ref: '[1.2, 2.1]',
          title: 'Purgatory, Saints & Holy Relics',
          actor: 'Sick Pilgrims & Shrine Keepers',
          tag: '🕯️ SACRED RELICS',
          trigger:
            'Believing disease was spiritual, hundreds of thousands of sick pilgrims journeyed to holy shrines like Canterbury to touch saintly relics and pray for miraculous healing.',
          desc: 'Believing disease was spiritual, hundreds of thousands of sick pilgrims journeyed to holy shrines like Canterbury to touch saintly relics and pray for miraculous healing.',
          connective:
            'Prioritized religious penitence, fasting, and paper indulgences over clinical treatments, reinforcing the belief that only God could grant recovery.',
          question: 'Why did sick people turn to pilgrimage shrines rather than doctors?',
        },
        {
          step: 5,
          date: 'c1400',
          para_ref: '[4.1–4.2]',
          title: 'Censorship & The Ban on Dissection',
          actor: 'Ecclesiastical Authorities & Roger Bacon',
          tag: '⚖️ SUPPRESSING DISSENT',
          trigger:
            'The Church declared Galen infallible because his teleological philosophy argued the human body was crafted by a single Creator, banning human dissection.',
          desc: 'The Church declared Galen infallible because his teleological philosophy argued the human body was crafted by a single Creator, banning human dissection.',
          connective:
            'Resulted in the exemplary 14-year imprisonment of Franciscan friar Roger Bacon in 1277 for advocating empirical observation, locking medicine into stagnation.',
          question: 'Why did church enforcement of Galen prevent medical progress?',
        },
      ],
    },
  },

  lesson_1_2: {
    workbook_stages: [
      {
        step: 1,
        date: 'c460 BC',
        para_ref: '[1.1–1.2]',
        heading: 'How did Hippocrates separate medicine from superstition?',
        bullets: [
          'Rejecting anger of gods at the bedside',
          'Writing case charts on fever symptoms',
          'Swearing ethical oath to protect patients',
        ],
        focus_clue: 'How did Hippocrates separate medicine from superstition?',
      },
      {
        step: 2,
        date: 'c1250',
        para_ref: '[1.2]',
        heading: 'Why did humoral theory seem logical to medieval people?',
        bullets: [
          'Balancing blood, phlegm, and two biles',
          'Linking fluids to four earthly elements',
          'Associating cold damp seasons with winter coughs',
        ],
        focus_clue: 'Why did humoral theory seem logical to medieval people?',
      },
      {
        step: 3,
        date: 'c1280',
        para_ref: '[2.1–2.2]',
        heading: 'How did the Theory of Opposites provide practical treatment rules?',
        bullets: [
          'Cooling burning summer fever with cold cucumber',
          'Treating excess phlegm with dry hot pepper',
          'Dissecting Barbary apes to map organs',
        ],
        focus_clue: 'How did the Theory of Opposites provide practical treatment rules?',
      },
      {
        step: 4,
        date: 'c1300',
        para_ref: '[4.1–4.2]',
        heading: 'Why did uroscopy give physicians great diagnostic authority?',
        bullets: [
          'Holding glass flasks up to window sunlight',
          'Comparing urine colours against twenty-shade wheels',
          'Sniffing and tasting samples for sweetness',
        ],
        focus_clue: 'Why did uroscopy give physicians great diagnostic authority?',
      },
      {
        step: 5,
        date: 'c1350',
        para_ref: '[3.1–3.2]',
        heading: 'Why did rational physicians link bad smells directly to epidemics?',
        bullets: [
          'Fearing stench from open roadside cesspools',
          'Smelling rotting town refuse heaps',
          'Believing toxic smells unbalanced bodily fluids',
        ],
        focus_clue: 'Why did rational physicians link bad smells directly to epidemics?',
      },
    ],
    causal_domino_spine: {
      title: 'Rational Explanations: Hippocrates, Galen & The Four Humours',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c460 BC',
          para_ref: '[1.1–1.2]',
          title: 'Hippocrates & Natural Observation',
          actor: 'Hippocrates of Kos',
          tag: '🩺 CLINICAL OBSERVATION',
          trigger:
            'Ancient Greek physician Hippocrates rejected supernatural causes, insisting that diseases were natural physical phenomena to be diagnosed through bedside clinical observation.',
          desc: 'Ancient Greek physician Hippocrates rejected supernatural causes, insisting that diseases were natural physical phenomena to be diagnosed through bedside clinical observation.',
          connective:
            'Separated medical practice from religious superstition, establishing the Hippocratic Oath and careful recording of pulse, fever, and symptoms.',
          question: 'How did Hippocrates separate medicine from superstition?',
        },
        {
          step: 2,
          date: 'c1250',
          para_ref: '[1.2]',
          title: 'The Four Bodily Humours',
          actor: 'Medieval Scholastic Physicians',
          tag: '💧 FOUR HUMOURS',
          trigger:
            'Hippocrates established that the body contained four vital humours—blood, phlegm, yellow bile, and black bile—linked to the four earthly elements and seasons.',
          desc: 'Hippocrates established that the body contained four vital humours—blood, phlegm, yellow bile, and black bile—linked to the four earthly elements and seasons.',
          connective:
            'Provided a reassuring, common-sense rationale for illness, teaching that seasonal fevers and coughs arose from internal humoural imbalances.',
          question: 'Why did humoral theory seem logical to medieval people?',
        },
        {
          step: 3,
          date: 'c1280',
          para_ref: '[2.1–2.2]',
          title: 'Galen’s Theory of Opposites',
          actor: 'Claudius Galen (Imperial Rome)',
          tag: '⚖️ THEORY OF OPPOSITES',
          trigger:
            'Claudius Galen expanded humoural pathology in imperial Rome into the Theory of Opposites, balancing excess humours with opposing physical qualities.',
          desc: 'Claudius Galen expanded humoural pathology in imperial Rome into the Theory of Opposites, balancing excess humours with opposing physical qualities.',
          connective:
            'Prescribed hot dry pepper for cold wet phlegm and cooling cucumber for hot dry fever, giving medieval doctors a complete, logical system of treatment.',
          question: 'How did the Theory of Opposites provide practical treatment rules?',
        },
        {
          step: 4,
          date: 'c1300',
          para_ref: '[4.1–4.2]',
          title: 'The Matula & Diagnostic Uroscopy',
          actor: 'Gowned University Doctors',
          tag: '🧪 DIAGNOSTIC UROSCOPY',
          trigger:
            'Because dissection was forbidden, physicians evaluated internal humoural balance by inspecting urine in a thin glass matula flask against circular twenty-shade wheels.',
          desc: 'Because dissection was forbidden, physicians evaluated internal humoural balance by inspecting urine in a thin glass matula flask against circular twenty-shade wheels.',
          connective:
            'Gave university doctors enormous professional authority as they sniffed, swirled, and tasted specimens, even though uroscopy revealed nothing about internal disease.',
          question: 'Why did uroscopy give physicians great diagnostic authority?',
        },
        {
          step: 5,
          date: 'c1350',
          para_ref: '[3.1–3.2]',
          title: 'Miasma Theory & Foul Vapours',
          actor: 'Town Bailiffs & Physicians',
          tag: '💨 MIASMA THEORY',
          trigger:
            'Physicians believed that toxic atmospheric fumes (miasma) arising from marshes, rotting carcasses, and open dung heaps corrupted bodily humours upon inhalation.',
          desc: 'Physicians believed that toxic atmospheric fumes (miasma) arising from marshes, rotting carcasses, and open dung heaps corrupted bodily humours upon inhalation.',
          connective:
            'Provided the primary rational explanation for epidemics like the Black Death, leading authorities to burn pitch fires and order street-clearing.',
          question: 'Why did rational physicians link bad smells directly to epidemics?',
        },
      ],
    },
  },

  lesson_1_3: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1250',
        para_ref: '[1.1–1.2]',
        heading: 'Why did ordinary people consider prayer more vital than medicine?',
        bullets: [
          'Chanting Latin prayers beside the sickbed',
          'Fasting on bread and well water',
          'Whipping bare backs to beg God for mercy',
        ],
        focus_clue: 'Why did ordinary people consider prayer more vital than medicine?',
      },
      {
        step: 2,
        date: 'c1300',
        para_ref: '[2.1–2.2]',
        heading: 'Why was bloodletting the most universal physical treatment?',
        bullets: [
          'Slicing vein walls with iron fleams',
          'Applying fat swamp leeches to temples',
          'Catching warm dark blood in pewter bowls',
        ],
        focus_clue: 'Why was bloodletting the most universal physical treatment?',
      },
      {
        step: 3,
        date: 'c1320',
        para_ref: '[3.1]',
        heading: 'How was purging believed to restore bodily equilibrium?',
        bullets: [
          'Swallowing poisonous black hellebore seeds',
          'Pumping warm mallow tea through boar-bladder clysters',
          'Emptying bowels to balance bodily humours',
        ],
        focus_clue: 'How was purging believed to restore bodily equilibrium?',
      },
      {
        step: 4,
        date: 'c1350',
        para_ref: '[3.2]',
        heading: 'Why did herbal recipes remain popular across all social classes?',
        bullets: [
          'Grinding crushed mint and sage in stone mortars',
          'Mixing seventy ingredients into treacle theriac',
          'Brewing bitter willow bark teas for fever',
        ],
        focus_clue: 'Why did herbal recipes remain popular across all social classes?',
      },
      {
        step: 5,
        date: 'c1400',
        para_ref: '[4.1–4.2]',
        heading: 'How did wealthy barons attempt to prevent sickness before it struck?',
        bullets: [
          'Following private Latin health rulebooks',
          'Burning sweet lavender sticks indoors',
          'Carrying fragrant posy flowers through smelly streets',
        ],
        focus_clue: 'How did wealthy barons attempt to prevent sickness before it struck?',
      },
    ],
    causal_domino_spine: {
      title: 'Approaches to Treatment & Prevention: Phlebotomy, Purging & Regimens',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1250',
          para_ref: '[1.1–1.2]',
          title: 'Religious Prayers, Fasting & Flagellation',
          actor: 'Parish Priest & Penitent Sufferers',
          tag: '🙏 SPIRITUAL HEALING',
          trigger:
            'Because sickness was governed by divine will, the essential first line of defence was spiritual appeasement through heartfelt prayer, church attendance, and fasting.',
          desc: 'Because sickness was governed by divine will, the essential first line of defence was spiritual appeasement through heartfelt prayer, church attendance, and fasting.',
          connective:
            'Led desperate crowds during epidemics to join flagellant processions, whipping bare shoulders to appease God’s wrath and beg for remission of sins.',
          question: 'Why did ordinary people consider prayer more vital than medicine?',
        },
        {
          step: 2,
          date: 'c1300',
          para_ref: '[2.1–2.2]',
          title: 'Humoral Phlebotomy (Bloodletting)',
          actor: 'Barber-Surgeons & Physicians',
          tag: '🩸 HUMORAL PHLEBOTOMY',
          trigger:
            'Whenever physical intervention was attempted, the universal remedy was phlebotomy—slicing veins with iron fleams or applying hungry leeches to temples.',
          desc: 'Whenever physical intervention was attempted, the universal remedy was phlebotomy—slicing veins with iron fleams or applying hungry leeches to temples.',
          connective:
            'Removed excess hot blood to restore humoural balance, guided by Zodiac Man charts to ensure the moon occupied a favourable astrological house.',
          question: 'Why was bloodletting the most universal physical treatment?',
        },
        {
          step: 3,
          date: 'c1320',
          para_ref: '[3.1]',
          title: 'Purging, Vomiting & Enemas',
          actor: 'Apothecaries & Sick Patients',
          tag: '🌿 EVACUATIVE PURGING',
          trigger:
            'To eliminate corrupted digestive humours, practitioners administered violent herbal emetics to trigger vomiting or pumped warm herbal broths via clyster syringes.',
          desc: 'To eliminate corrupted digestive humours, practitioners administered violent herbal emetics to trigger vomiting or pumped warm herbal broths via clyster syringes.',
          connective:
            'Provided dramatic, visible proof that toxic humours were being physically evacuated from the body, reinforcing the patient’s belief in humoural theory.',
          question: 'How was purging believed to restore bodily equilibrium?',
        },
        {
          step: 4,
          date: 'c1350',
          para_ref: '[3.2]',
          title: 'Herbal Apothecary Remedies & Theriac',
          actor: 'Guild Apothecaries & Housewives',
          tag: '🍯 COMPOUND THERIAC',
          trigger:
            'Apothecaries and housewives compounded herbal materia medica from mint, sage, and chamomile, mixing multi-ingredient antidotes called theriac.',
          desc: 'Apothecaries and housewives compounded herbal materia medica from mint, sage, and chamomile, mixing multi-ingredient antidotes called theriac.',
          connective:
            'Offered widely accessible, soothing remedies for everyday ailments, although complex theriac treacles were completely powerless against acute bacterial infections.',
          question: 'Why did herbal recipes remain popular across all social classes?',
        },
        {
          step: 5,
          date: 'c1400',
          para_ref: '[4.1–4.2]',
          title: 'The Regimen Sanitatis & Clean Air',
          actor: 'Salerno Medical Faculty & Wealthy Nobles',
          tag: '📜 REGIMEN SANITATIS',
          trigger:
            'The Regimen Sanitatis Salernitanum instructed the wealthy elite to regulate the six non-naturals—diet, exercise, sleep, bathing, fresh air, and emotional tranquility.',
          desc: 'The Regimen Sanitatis Salernitanum instructed the wealthy elite to regulate the six non-naturals—diet, exercise, sleep, bathing, fresh air, and emotional tranquility.',
          connective:
            'Established preventive lifestyle management as the pinnacle of medieval health, prompting barons to burn lavender and carry sweet posies through filthy towns.',
          question: 'How did wealthy barons attempt to prevent sickness before it struck?',
        },
      ],
    },
  },

  lesson_1_4: {
    workbook_stages: [
      {
        step: 1,
        date: 'c1250',
        para_ref: '[1.1–1.2]',
        heading: 'Why were university physicians accessible only to the ultra-wealthy?',
        bullets: [
          'Studying Latin texts for ten years in Oxford',
          'Consulting astronomical star charts for baronial clients',
          'Charging heavy silver fees without touching patients',
        ],
        focus_clue: 'Why were university physicians accessible only to the ultra-wealthy?',
      },
      {
        step: 2,
        date: 'c1300',
        para_ref: '[2.2]',
        heading: 'How did apothecaries provide accessible medicines to townspeople?',
        bullets: [
          'Weighing dried poppy roots on brass scales',
          'Selling cheap herbal pills to town weavers',
          'Learning trade secrets through guild apprenticeships',
        ],
        focus_clue: 'How did apothecaries provide accessible medicines to townspeople?',
      },
      {
        step: 3,
        date: 'c1320',
        para_ref: '[2.1]',
        heading: 'Why were barber-surgeons viewed as lower-status craftsmen?',
        bullets: [
          'Pulling rotten teeth with iron pliers',
          'Setting broken arm bones with wooden splints',
          'Cauterising bleeding flesh wounds with red-hot irons',
        ],
        focus_clue: 'Why were barber-surgeons viewed as lower-status craftsmen?',
      },
      {
        step: 4,
        date: 'c1350',
        para_ref: '[3.1–3.2]',
        heading: 'Why did monastic hospitals deliberately avoid medical treatment?',
        bullets: [
          'Sheltering bedridden pilgrims in monastic wards',
          'Providing warm woollen blankets and fresh vegetable stew',
          'Hearing Latin mass through chapel chancel screens',
        ],
        focus_clue: 'Why did monastic hospitals deliberately avoid medical treatment?',
      },
      {
        step: 5,
        date: 'c1400',
        para_ref: '[2.1, 4.1]',
        heading: 'Why did the vast majority of sick people rely on female family members?',
        bullets: [
          'Gathering wild chamomile in country hedgerows',
          'Delivering newborn babies in village cottages',
          'Applying warm bread poultices to swollen skin',
        ],
        focus_clue: 'Why did the vast majority of sick people rely on female family members?',
      },
    ],
    causal_domino_spine: {
      title: 'Medical Care Providers & Monastic Hospitals: Care Not Cure',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1250',
          para_ref: '[1.1–1.2]',
          title: 'University-Trained Physicians',
          actor: 'Oxford & Cambridge Medical Fellows',
          tag: '🎓 LICENSED PHYSICIANS',
          trigger:
            'Licensed physicians spent ten years studying classical Latin theory at Oxford or Cambridge, mastering Galen, Hippocrates, and astrological chart-casting.',
          desc: 'Licensed physicians spent ten years studying classical Latin theory at Oxford or Cambridge, mastering Galen, Hippocrates, and astrological chart-casting.',
          connective:
            'Charged enormous silver fees to diagnose aristocratic clients without touching physical bodies, remaining completely inaccessible to ninety-nine percent of the population.',
          question: 'Why were university physicians accessible only to the ultra-wealthy?',
        },
        {
          step: 2,
          date: 'c1300',
          para_ref: '[2.2]',
          title: 'Guild Apothecaries & Spicers',
          actor: 'Worshipful Company of Grocers & Spicers',
          tag: '⚖️ GUILD APOTHECARIES',
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
          para_ref: '[2.1]',
          title: 'Barber-Surgeons & Wound Care',
          actor: 'Barber-Surgeons’ Company',
          tag: '💈 CRAFT SURGERY',
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
          para_ref: '[3.1–3.2]',
          title: 'Monastic Hospitals: Care Not Cure',
          actor: 'Monks, Nuns & Infirmarers',
          tag: '🏥 CARE NOT CURE',
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
          para_ref: '[2.1, 4.1]',
          title: 'Women Healers & Household Care',
          actor: 'Village Mothers & Wise Women',
          tag: '👵 DOMESTIC HEALERS',
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
    workbook_stages: [
      {
        step: 1,
        date: 'June 1348',
        para_ref: '[1.1]',
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
        para_ref: '[1.2]',
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
        para_ref: '[3.1, 4.2]',
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
      title: 'The Black Death (1348–1349): Pathology, Treatments & Social Collapse',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'June 1348',
          para_ref: '[1.1]',
          title: 'Arrival at Melcombe Regis',
          actor: 'Gascon Cog Sailors & Dorset Stevedores',
          tag: '🚢 ARRIVAL AT MELCOMBE',
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
          para_ref: '[1.2]',
          title: 'Buboes & Pneumonic Terror',
          actor: 'Victims & Terrified Households',
          tag: '💀 DUAL PATHOLOGY',
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
          tag: '🐔 DESPERATE REMEDIES',
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
          tag: '👑 ROYAL CLEANLINESS ORDER',
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
          para_ref: '[3.1, 4.2]',
          title: 'Mass Burial Pits & Demographic Collapse',
          actor: 'Parish Gravediggers & Royal Commissioners',
          tag: '⚰️ DEMOGRAPHIC COLLAPSE',
          trigger:
            'Churchyards overflowed within months, forcing London authorities to open vast emergency mass trenches at East Smithfield to bury thousands of stacked corpses.',
          desc: 'Churchyards overflowed within months, forcing London authorities to open vast emergency mass trenches at East Smithfield to bury thousands of stacked corpses.',
          connective:
            'Wiped out 30% to 45% of England’s total population, creating severe agricultural labour shortages and sparking the long-term breakdown of the feudal system.',
          question: 'Why did the Black Death trigger a long-term social and economic crisis?',
        },
      ],
    },
  },
};

function main() {
  const { unitData } = require(dataFilePath);
  console.log(`Loaded edexcel_medicine data. Total lessons: ${unitData.lessons.length}`);

  let updatedCount = 0;
  for (let i = 0; i < unitData.lessons.length; i++) {
    const lesson = unitData.lessons[i];
    if (medievalSpines[lesson.id]) {
      const spine = medievalSpines[lesson.id];
      lesson.workbook_stages = spine.workbook_stages;
      lesson.causal_domino_spine = spine.causal_domino_spine;
      // Also update timeline_anchor so it stays in full harmony
      lesson.timeline_anchor = spine.causal_domino_spine.stages.map((st) => ({
        date: st.date,
        title: st.title,
        desc: st.trigger,
        para_ref: st.para_ref,
      }));
      updatedCount++;
      console.log(`[OK] Injected spine & stages into ${lesson.id} (${lesson.title})`);
    }
  }

  const exportString = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
  fs.writeFileSync(dataFilePath, exportString, 'utf8');
  console.log(`🎉 Successfully updated ${updatedCount} Medieval lessons in ${dataFilePath}`);
}

main();
