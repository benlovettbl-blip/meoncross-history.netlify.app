const fs = require('fs');
const vm = require('vm');

function harmonizeMedicineKT1(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip export default to evaluate cleanly in VM
  const cleanCode = content.replace(/export\s+default\s+edexcel_medicine_data;?/, '');
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.createContext(sandbox);
  vm.runInContext(cleanCode, sandbox);
  const data = sandbox.module.exports || sandbox.exports || sandbox.edexcel_medicine_data;

  if (!data || !data.lessons) {
    console.error('Failed to parse edexcel_medicine data from:', filePath);
    process.exit(1);
  }

  // =========================================================================
  // Lesson 1.1: Supernatural & Religious Explanations of Disease
  // =========================================================================
  const l1 = data.lessons[0];
  const l1_sources = l1.sources;

  const l1_src_zodiac = l1_sources.find(
    (s) => s.id === 'med_l1_source_a' || s.title.includes('Zodiac Man'),
  );
  const l1_src_zouche = l1_sources.find(
    (s) => s.id === 'med_l1_source_b' || s.title.includes('William Zouche'),
  );
  const l1_src_ampulla = l1_sources.find(
    (s) => s.id === 'med_l1_source_c' || s.title.includes('Ampulla'),
  );
  const l1_src_leper = l1_sources.find(
    (s) => s.id === 'med_l1_source_d' || s.title.includes('Lepers'),
  );
  const l1_src_bacon = l1_sources.find(
    (s) => s.id === 'med_l1_source_e' || s.title.includes('Roger Bacon'),
  );

  l1_src_zouche.letter = 'A';
  l1_src_zouche.title = l1_src_zouche.title.replace(/^Source [A-E]/, 'Source A');
  l1_src_leper.letter = 'B';
  l1_src_leper.title = l1_src_leper.title.replace(/^Source [A-E]/, 'Source B');
  l1_src_zodiac.letter = 'C';
  l1_src_zodiac.title = l1_src_zodiac.title.replace(/^Source [A-E]/, 'Source C');
  l1_src_ampulla.letter = 'D';
  l1_src_ampulla.title = l1_src_ampulla.title.replace(/^Source [A-E]/, 'Source D');
  l1_src_bacon.letter = 'E';
  l1_src_bacon.title = l1_src_bacon.title.replace(/^Source [A-E]/, 'Source E');

  l1.sources = [l1_src_zouche, l1_src_leper, l1_src_zodiac, l1_src_ampulla, l1_src_bacon];

  const orig_l1_b1 = l1.narrative_blocks[0];
  const orig_l1_b2 = l1.narrative_blocks[1];
  const orig_l1_b3 = l1.narrative_blocks[2];
  const orig_l1_b4 = l1.narrative_blocks[3];

  l1.narrative_blocks = [
    {
      act: 1,
      act_title:
        'Stage 1: Scriptoria & Church Monopoly on Learning — How did church scriptoria prevent new medical ideas from spreading?',
      theme: 'Divine Retribution and Original Sin',
      title: 'Divine Retribution and Original Sin',
      content: orig_l1_b1.content,
      text: orig_l1_b1.content,
      image: '/images/monastic_scriptorium.jpg',
      caption:
        'Monastic scriptorium where Catholic monks preserved and copied ancient Galenic manuscripts.',
      image_alt: 'Medieval monk copying ancient manuscript at wooden desk',
      isReversed: false,
      sources: [l1_src_zouche],
    },
    {
      act: 2,
      act_title:
        'Stage 2: Biblical Leprosy & Divine Retribution — Why was leprosy viewed as visible proof of divine judgment?',
      theme: 'Moral Taint: Leprosy and Social Exclusion',
      title: 'Moral Taint: Leprosy and Social Exclusion',
      content: orig_l1_b4.content,
      text: orig_l1_b4.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l1_src_leper],
    },
    {
      act: 3,
      act_title:
        'Stage 3: Christian Astrology & Planetary Conjunction — How did the Church reconcile astrology with Christian doctrine?',
      theme: 'Astrological Influences and the Zodiac Man',
      title: 'Astrological Influences and the Zodiac Man',
      content: orig_l1_b2.content,
      text: orig_l1_b2.content,
      image: '/images/medieval_church_interior.jpg',
      caption:
        'Medieval church interior where liturgical processions and prayers were offered to avert divine judgment.',
      image_alt: 'Interior of a medieval vaulted church with stained glass windows',
      isReversed: true,
      sources: [l1_src_zodiac],
    },
    {
      act: 4,
      act_title:
        'Stage 4: Purgatory, Saints & Holy Relics — Why did sick people turn to pilgrimage shrines rather than doctors?',
      theme: 'Spiritual Intercession, Relics, and Miracle Cures',
      title: 'Spiritual Intercession, Relics, and Miracle Cures',
      content: orig_l1_b3.content,
      text: orig_l1_b3.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l1_src_ampulla],
    },
    {
      act: 5,
      act_title:
        'Stage 5: Censorship & The Ban on Dissection — Why did church enforcement of Galen prevent medical progress?',
      theme: 'Censorship, Roger Bacon, and the Church Ban on Dissection',
      title: 'Censorship, Roger Bacon, and the Church Ban on Dissection',
      content:
        "While the Catholic Church preserved ancient medical manuscripts in monastic scriptoria, it strictly policed intellectual inquiry and fiercely suppressed scientific heresy. Medical doctrine was required to conform absolutely to Christian scripture; because Galen taught that the human body was created by a purposeful divine designer (teleology), church authorities canonised his anatomical errors as indisputable truth. Dissection of human cadavers was strictly regulated or banned outright across Catholic Christendom, viewed as a sacrilegious mutilation of bodies created in the image of God destined for physical resurrection on the Last Day. Scholars who challenged this rigid intellectual monopoly faced severe ecclesiastical retribution. In the 1260s, Franciscan friar and philosopher Roger Bacon was imprisoned after urging fellow scholars to abandon blind deference to ancient dogma in favour of empirical observation, scientific experiment, and direct sensory investigation of the natural world. Consequently, the Church's iron grip over university medical faculties ensured that medieval medical theory remained intellectually frozen for over two centuries.",
      text: "While the Catholic Church preserved ancient medical manuscripts in monastic scriptoria, it strictly policed intellectual inquiry and fiercely suppressed scientific heresy. Medical doctrine was required to conform absolutely to Christian scripture; because Galen taught that the human body was created by a purposeful divine designer (teleology), church authorities canonised his anatomical errors as indisputable truth. Dissection of human cadavers was strictly regulated or banned outright across Catholic Christendom, viewed as a sacrilegious mutilation of bodies created in the image of God destined for physical resurrection on the Last Day. Scholars who challenged this rigid intellectual monopoly faced severe ecclesiastical retribution. In the 1260s, Franciscan friar and philosopher Roger Bacon was imprisoned after urging fellow scholars to abandon blind deference to ancient dogma in favour of empirical observation, scientific experiment, and direct sensory investigation of the natural world. Consequently, the Church's iron grip over university medical faculties ensured that medieval medical theory remained intellectually frozen for over two centuries.",
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l1_src_bacon],
    },
  ];

  // =========================================================================
  // Lesson 1.2: Rational Explanations: Hippocrates, Galen & The Four Humours
  // =========================================================================
  const l2 = data.lessons[1];
  const l2_sources = l2.sources;

  const l2_src_humours = l2_sources.find(
    (s) => s.id === 'med_l2_source_a' || s.title.includes('Four Bodily Humours'),
  );
  const l2_src_galen = l2_sources.find(
    (s) => s.id === 'med_l2_source_c' || s.title.includes('Opposites'),
  );
  const l2_src_urine = l2_sources.find(
    (s) => s.id === 'med_l2_source_b' || s.title.includes('Urine Wheel'),
  );
  const l2_src_paris = l2_sources.find(
    (s) => s.id === 'med_l2_source_d' || s.title.includes('Paris'),
  );
  const l2_src_miasma = l2_sources.find(
    (s) => s.id === 'med_l2_source_e' || s.title.includes('London Assize'),
  );

  l2_src_humours.letter = 'A';
  l2_src_humours.title = l2_src_humours.title.replace(/^Source [A-E]/, 'Source A');
  l2_src_galen.letter = 'B';
  l2_src_galen.title = l2_src_galen.title.replace(/^Source [A-E]/, 'Source B');
  l2_src_urine.letter = 'C';
  l2_src_urine.title = l2_src_urine.title.replace(/^Source [A-E]/, 'Source C');
  l2_src_paris.letter = 'D';
  l2_src_paris.title = l2_src_paris.title.replace(/^Source [A-E]/, 'Source D');
  l2_src_miasma.letter = 'E';
  l2_src_miasma.title = l2_src_miasma.title.replace(/^Source [A-E]/, 'Source E');

  l2.sources = [l2_src_humours, l2_src_galen, l2_src_urine, l2_src_paris, l2_src_miasma];

  const orig_l2_b1 = l2.narrative_blocks[0];
  const orig_l2_b2 = l2.narrative_blocks[1];
  const orig_l2_b3 = l2.narrative_blocks[2];
  const orig_l2_b4 = l2.narrative_blocks[3];

  l2.narrative_blocks = [
    {
      act: 1,
      act_title:
        'Stage 1: Hippocrates & Natural Observation — How did Hippocrates separate medicine from superstition?',
      theme: 'Hippocratic Medicine and the Four Humours',
      title: 'Hippocratic Medicine and the Four Humours',
      content: orig_l2_b1.content,
      text: orig_l2_b1.content,
      image: '/images/hippocrates_portrait.jpg',
      caption:
        'Hippocrates of Kos, the ancient Greek father of clinical observation and humoral medicine.',
      image_alt: 'Classical portrait engraving of Hippocrates',
      isReversed: false,
      sources: [l2_src_humours],
    },
    {
      act: 2,
      act_title:
        'Stage 2: The Four Bodily Humours — Why did humoral theory seem logical to medieval people?',
      theme: "Galen's Theory of Opposites and Humoral Balance",
      title: "Galen's Theory of Opposites and Humoral Balance",
      content:
        "In the second century AD, the Greek physician Galen working in Rome greatly expanded Hippocratic humoralism by creating the Theory of Opposites (contraria contrariis curantur). While Hippocrates had emphasised clinical observation and gentle dietary regulation to allow nature to restore humoral balance, Galen argued that physicians must actively intervene to counteract excess humours with their exact clinical opposite. If a patient suffered from a fever—believed to be caused by an excess of blood or yellow bile, characterised as hot and dry—the physician must prescribe cold, wet remedies such as cucumber, cooling herbs, or cold baths. Conversely, a winter phlegmatic chest chill (cold and wet) required hot, dry treatments such as pepper, wine, and warm blankets. Galen also developed an intricate system of bodily anatomy based largely on dissecting pigs, apes, and dogs. Because human dissection was socially taboo in ancient Rome, Galen assumed human anatomy was identical to animal structures, erroneously claiming that the human jaw consisted of two bones, the liver had five lobes, and blood was manufactured in the liver and absorbed by the body. Despite these errors, Galen's logical system dominated medical practice for over 1,300 years.",
      text: "In the second century AD, the Greek physician Galen working in Rome greatly expanded Hippocratic humoralism by creating the Theory of Opposites (contraria contrariis curantur). While Hippocrates had emphasised clinical observation and gentle dietary regulation to allow nature to restore humoral balance, Galen argued that physicians must actively intervene to counteract excess humours with their exact clinical opposite. If a patient suffered from a fever—believed to be caused by an excess of blood or yellow bile, characterised as hot and dry—the physician must prescribe cold, wet remedies such as cucumber, cooling herbs, or cold baths. Conversely, a winter phlegmatic chest chill (cold and wet) required hot, dry treatments such as pepper, wine, and warm blankets. Galen also developed an intricate system of bodily anatomy based largely on dissecting pigs, apes, and dogs. Because human dissection was socially taboo in ancient Rome, Galen assumed human anatomy was identical to animal structures, erroneously claiming that the human jaw consisted of two bones, the liver had five lobes, and blood was manufactured in the liver and absorbed by the body. Despite these errors, Galen's logical system dominated medical practice for over 1,300 years.",
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l2_src_galen],
    },
    {
      act: 3,
      act_title:
        'Stage 3: Galen’s Theory of Opposites — How did the Theory of Opposites provide practical treatment rules?',
      theme: 'Clinical Observation: Uroscopy and Pulse Taking',
      title: 'Clinical Observation: Uroscopy and Pulse Taking',
      content: orig_l2_b3.content,
      text: orig_l2_b3.content,
      image: '/images/uroscopy_inspection.jpg',
      caption:
        "Medieval physician inspecting the colour and sediment of a patient's urine in a flask.",
      image_alt: 'Physician examining urine flask in a study',
      isReversed: true,
      sources: [l2_src_urine],
    },
    {
      act: 4,
      act_title:
        'Stage 4: The Matula & Diagnostic Uroscopy — Why did uroscopy give physicians great diagnostic authority?',
      theme: "Galen, Teleology, and the Church's Monopoly",
      title: "Galen, Teleology, and the Church's Monopoly",
      content: orig_l2_b2.content,
      text: orig_l2_b2.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l2_src_paris],
    },
    {
      act: 5,
      act_title:
        'Stage 5: Miasma Theory & Foul Vapours — Why did rational physicians link bad smells directly to epidemics?',
      theme: 'Miasma Theory and Environmental Health',
      title: 'Miasma Theory and Environmental Health',
      content: orig_l2_b4.content,
      text: orig_l2_b4.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l2_src_miasma],
    },
  ];

  // =========================================================================
  // Lesson 1.3: Approaches to Prevention & Treatment
  // =========================================================================
  const l3 = data.lessons[2];
  const l3_sources = l3.sources;

  const l3_src_becket = l3_sources.find(
    (s) => s.id === 'med_l3_source_d' || s.title.includes('Becket'),
  );
  const l3_src_phlebotomy = l3_sources.find(
    (s) => s.id === 'med_l3_source_a' || s.title.includes('Phlebotomy'),
  );
  const l3_src_bowl = l3_sources.find(
    (s) => s.id === 'med_l3_source_c' || s.title.includes('Bowl'),
  );
  const l3_src_theriac = l3_sources.find(
    (s) => s.id === 'med_l3_source_e' || s.title.includes('Theriac'),
  );
  const l3_src_arderne = l3_sources.find(
    (s) => s.id === 'med_l3_source_b' || s.title.includes('Arderne'),
  );

  l3_src_becket.letter = 'A';
  l3_src_becket.title = l3_src_becket.title.replace(/^Source [A-E]/, 'Source A');
  l3_src_phlebotomy.letter = 'B';
  l3_src_phlebotomy.title = l3_src_phlebotomy.title.replace(/^Source [A-E]/, 'Source B');
  l3_src_bowl.letter = 'C';
  l3_src_bowl.title = l3_src_bowl.title.replace(/^Source [A-E]/, 'Source C');
  l3_src_theriac.letter = 'D';
  l3_src_theriac.title = l3_src_theriac.title.replace(/^Source [A-E]/, 'Source D');
  l3_src_arderne.letter = 'E';
  l3_src_arderne.title = l3_src_arderne.title.replace(/^Source [A-E]/, 'Source E');

  l3.sources = [l3_src_becket, l3_src_phlebotomy, l3_src_bowl, l3_src_theriac, l3_src_arderne];

  const orig_l3_b1 = l3.narrative_blocks[0];
  const orig_l3_b2 = l3.narrative_blocks[1];
  const orig_l3_b3 = l3.narrative_blocks[2];
  const orig_l3_b4 = l3.narrative_blocks[3];

  l3.narrative_blocks = [
    {
      act: 1,
      act_title:
        'Stage 1: Religious Prayers, Fasting & Flagellation — Why did ordinary people consider prayer more vital than medicine?',
      theme: 'Spiritual Remedies: Prayer, Fasting, and Miraculous Intercession',
      title: 'Spiritual Remedies: Prayer, Fasting, and Miraculous Intercession',
      content:
        "Before any physical medicine was administered, medieval patients sought spiritual pardon. Sickness was understood as a trial sent by God, meaning that medical remedies could not succeed without divine mercy. The primary treatments were therefore religious: saying special prayers such as the Ave Maria and Paternoster, paying for chanting masses, fasting on bread and water, and lighting consecrated candles at local parish altars. Affluent barons gave money to monasteries to pray for their souls, while sufferers of chronic ailments undertook arduous pilgrimages to sacred shrines, such as Canterbury Cathedral to touch the shrine of St Thomas Becket or Walsingham to venerate the Virgin Mary. Pilgrims purchased pewter badges and ampullae containing 'holy water' mixed with traces of saintly blood to rub on diseased limbs. In times of severe epidemics, flagellants marched through towns whipping themselves with knotted iron-tipped scourges in public penance to appease God's anger.",
      text: "Before any physical medicine was administered, medieval patients sought spiritual pardon. Sickness was understood as a trial sent by God, meaning that medical remedies could not succeed without divine mercy. The primary treatments were therefore religious: saying special prayers such as the Ave Maria and Paternoster, paying for chanting masses, fasting on bread and water, and lighting consecrated candles at local parish altars. Affluent barons gave money to monasteries to pray for their souls, while sufferers of chronic ailments undertook arduous pilgrimages to sacred shrines, such as Canterbury Cathedral to touch the shrine of St Thomas Becket or Walsingham to venerate the Virgin Mary. Pilgrims purchased pewter badges and ampullae containing 'holy water' mixed with traces of saintly blood to rub on diseased limbs. In times of severe epidemics, flagellants marched through towns whipping themselves with knotted iron-tipped scourges in public penance to appease God's anger.",
      image: '/images/phlebotomy_manuscript.jpg',
      caption:
        'Medieval medical manuscript illustration showing bloodletting points and surgical instruments.',
      image_alt: 'Medieval anatomical drawing of human body marked with venesection vein points',
      isReversed: false,
      sources: [l3_src_becket],
    },
    {
      act: 2,
      act_title:
        'Stage 2: Humoral Phlebotomy (Bloodletting) — Why was bloodletting the most universal physical treatment?',
      theme: 'Phlebotomy: Restoring Balance through Bloodletting',
      title: 'Phlebotomy: Restoring Balance through Bloodletting',
      content: orig_l3_b1.content,
      text: orig_l3_b1.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l3_src_phlebotomy],
    },
    {
      act: 3,
      act_title:
        'Stage 3: Purging, Vomiting & Enemas — How was purging believed to restore bodily equilibrium?',
      theme: 'Purging, Emetics, and Clysters: Evacuating Toxic Humours',
      title: 'Purging, Emetics, and Clysters: Evacuating Toxic Humours',
      content:
        "When phlebotomy was deemed insufficient or when the digestive system was implicated in humoral corruption, physicians and barber-surgeons employed systematic purging to evacuate poisons from the stomach and intestines. Patients were administered powerful herbal emetics formulated from hellebore or antimony to induce violent vomiting. Alternatively, laxatives made from aloe, linseed, senna, or scammonium were prescribed to flush the bowels. For stubborn ailments, practitioners administered a clyster—an enema injected into the rectum using a pewter or copper syringe attached to an animal bladder. Clyster solutions consisted of warm water infused with camomile, crushed marsh mallows, salt, and melted boar's lard. Purging was so violently exhausting that patients frequently faint from dehydration, but medieval healers believed this physical trauma proved that corrupted, malignant humours were successfully leaving the patient's system.",
      text: "When phlebotomy was deemed insufficient or when the digestive system was implicated in humoral corruption, physicians and barber-surgeons employed systematic purging to evacuate poisons from the stomach and intestines. Patients were administered powerful herbal emetics formulated from hellebore or antimony to induce violent vomiting. Alternatively, laxatives made from aloe, linseed, senna, or scammonium were prescribed to flush the bowels. For stubborn ailments, practitioners administered a clyster—an enema injected into the rectum using a pewter or copper syringe attached to an animal bladder. Clyster solutions consisted of warm water infused with camomile, crushed marsh mallows, salt, and melted boar's lard. Purging was so violently exhausting that patients frequently faint from dehydration, but medieval healers believed this physical trauma proved that corrupted, malignant humours were successfully leaving the patient's system.",
      image: '/images/theriac_compounding_apothecary.jpg',
      caption:
        'Apothecary workshop compounding complex theriac electuaries from medicinal herbs and minerals.',
      image_alt: 'Medieval apothecary shop interior with shelves of jars and scales',
      isReversed: true,
      sources: [l3_src_bowl],
    },
    {
      act: 4,
      act_title:
        'Stage 4: Herbal Apothecary Remedies & Theriac — Why did herbal recipes remain popular across all social classes?',
      theme: 'Herbal Pharmacy: Simples, Electuaries, and Theriac',
      title: 'Herbal Pharmacy: Simples, Electuaries, and Theriac',
      content: orig_l3_b2.content,
      text: orig_l3_b2.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l3_src_theriac],
    },
    {
      act: 5,
      act_title:
        'Stage 5: The Regimen Sanitatis & Clean Air — How did wealthy barons attempt to prevent sickness before it struck?',
      theme: 'Surgical Interventions and Preventative Regimens',
      title: 'Surgical Interventions and Preventative Regimens',
      content: orig_l3_b3.content + '\n\n' + orig_l3_b4.content,
      text: orig_l3_b3.content + '\n\n' + orig_l3_b4.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l3_src_arderne],
    },
  ];

  // =========================================================================
  // Lesson 1.4: Medical Care Providers & Monastic Hospitals
  // =========================================================================
  const l4 = data.lessons[3];
  const l4_sources = l4.sources;

  const l4_src_barbers = l4_sources.find(
    (s) => s.id === 'med_l4_source_a' || s.title.includes('Fellowship'),
  );
  const l4_src_ordinances = l4_sources.find(
    (s) => s.id === 'med_l4_source_c' || s.title.includes('Guild Ordinances'),
  );
  const l4_src_tomb = l4_sources.find(
    (s) => s.id === 'med_l4_source_d' || s.title.includes('Rahere'),
  );
  const l4_src_barts = l4_sources.find(
    (s) => s.id === 'med_l4_source_b' || s.title.includes('Statutes of St Bartholomew'),
  );
  const l4_src_domestic = l4_sources.find(
    (s) => s.id === 'med_l4_source_e' || s.title.includes('Domestic Recipe'),
  );

  l4_src_barbers.letter = 'A';
  l4_src_barbers.title = l4_src_barbers.title.replace(/^Source [A-E]/, 'Source A');
  l4_src_ordinances.letter = 'B';
  l4_src_ordinances.title = l4_src_ordinances.title.replace(/^Source [A-E]/, 'Source B');
  l4_src_tomb.letter = 'C';
  l4_src_tomb.title = l4_src_tomb.title.replace(/^Source [A-E]/, 'Source C');
  l4_src_barts.letter = 'D';
  l4_src_barts.title = l4_src_barts.title.replace(/^Source [A-E]/, 'Source D');
  l4_src_domestic.letter = 'E';
  l4_src_domestic.title = l4_src_domestic.title.replace(/^Source [A-E]/, 'Source E');

  l4.sources = [l4_src_barbers, l4_src_ordinances, l4_src_tomb, l4_src_barts, l4_src_domestic];

  const orig_l4_b1 = l4.narrative_blocks[0];
  const orig_l4_b2 = l4.narrative_blocks[1];
  const orig_l4_b3 = l4.narrative_blocks[2];
  const orig_l4_b4 = l4.narrative_blocks[3];

  l4.narrative_blocks = [
    {
      act: 1,
      act_title:
        'Stage 1: University-Trained Physicians — Why were university physicians accessible only to the ultra-wealthy?',
      theme: 'University-Trained Physicians: Theory Over Practice',
      title: 'University-Trained Physicians: Theory Over Practice',
      content: orig_l4_b1.content,
      text: orig_l4_b1.content,
      image: '/images/medieval_physician_bedside.jpg',
      caption:
        'University-trained physician conducting a formal bedside consultation with a wealthy patron.',
      image_alt: "Medieval physician taking a patient's pulse in a richly draped bedchamber",
      isReversed: false,
      sources: [l4_src_barbers],
    },
    {
      act: 2,
      act_title:
        'Stage 2: Guild Apothecaries & Spicers — How did apothecaries provide accessible medicines to townspeople?',
      theme: 'Guild Apothecaries and Spicers: Retail Medicine',
      title: 'Guild Apothecaries and Spicers: Retail Medicine',
      content:
        'For urban townspeople and merchants who could not afford a university physician, the local apothecary shop was the first port of call. Apothecaries were organized into trading guilds (often alongside pepperers and grocers) and trained through rigorous seven-year manual apprenticeships. They stocked hundreds of dried roots, leaves, minerals, animal fats, and imported spices from Mediterranean trade networks. Unlike physicians who charged high diagnostic consultation fees and wrote prescriptions in academic Latin, apothecaries diagnosed customers directly across the shop counter and compounded customized ointments, cough syrups, and digestive electuaries on the spot. While physicians viewed apothecaries with professional snobbery as mere tradesmen motivated by commerce, ordinary citizens valued their practical pharmacology, accessible advice, and affordable pricing.',
      text: 'For urban townspeople and merchants who could not afford a university physician, the local apothecary shop was the first port of call. Apothecaries were organized into trading guilds (often alongside pepperers and grocers) and trained through rigorous seven-year manual apprenticeships. They stocked hundreds of dried roots, leaves, minerals, animal fats, and imported spices from Mediterranean trade networks. Unlike physicians who charged high diagnostic consultation fees and wrote prescriptions in academic Latin, apothecaries diagnosed customers directly across the shop counter and compounded customized ointments, cough syrups, and digestive electuaries on the spot. While physicians viewed apothecaries with professional snobbery as mere tradesmen motivated by commerce, ordinary citizens valued their practical pharmacology, accessible advice, and affordable pricing.',
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l4_src_ordinances],
    },
    {
      act: 3,
      act_title:
        'Stage 3: Barber-Surgeons & Wound Care — Why were barber-surgeons viewed as lower-status craftsmen?',
      theme: 'Barber-Surgeons and Craft Medicine',
      title: 'Barber-Surgeons and Craft Medicine',
      content: orig_l4_b2.content,
      text: orig_l4_b2.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l4_src_tomb],
    },
    {
      act: 4,
      act_title:
        'Stage 4: Monastic Hospitals: Care Not Cure — Why did monastic hospitals deliberately avoid medical treatment?',
      theme: 'Monastic Hospitals: ‘Care Not Cure’',
      title: 'Monastic Hospitals: ‘Care Not Cure’',
      content: orig_l4_b4.content,
      text: orig_l4_b4.content,
      image: '/images/hotel_dieu_hospital.jpg',
      caption:
        'Medieval hospital ward where religious sisters provided nursing care and hospitality for the sick and destitute.',
      image_alt: 'Long medieval hospital ward with parallel rows of curtained beds',
      isReversed: true,
      sources: [l4_src_barts],
    },
    {
      act: 5,
      act_title:
        'Stage 5: Women Healers & Household Care — Why did the vast majority of sick people rely on female family members?',
      theme: 'Domestic Healers and Wise Women',
      title: 'Domestic Healers and Wise Women',
      content: orig_l4_b3.content,
      text: orig_l4_b3.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l4_src_domestic],
    },
  ];

  // =========================================================================
  // Lesson 1.5: Case Study: Dealing with the Black Death (1348–1349)
  // =========================================================================
  const l5 = data.lessons[4];
  const l5_sources = l5.sources;

  const l5_src_boccaccio = l5_sources.find(
    (s) => s.id === 'med_l5_source_d' || s.title.includes('Boccaccio'),
  );
  const l5_src_bedside = l5_sources.find(
    (s) => s.id === 'med_l5_source_a' || s.title.includes('Bedside'),
  );
  const l5_src_paris = l5_sources.find(
    (s) => s.id === 'med_l5_source_c' || s.title.includes('Paris'),
  );
  const l5_src_flagellants = l5_sources.find(
    (s) => s.id === 'med_l5_source_e' || s.title.includes('Flagellants'),
  );
  const l5_src_edward = l5_sources.find(
    (s) => s.id === 'med_l5_source_b' || s.title.includes('Edward III'),
  );

  l5_src_boccaccio.letter = 'A';
  l5_src_boccaccio.title = l5_src_boccaccio.title.replace(/^Source [A-E]/, 'Source A');
  l5_src_bedside.letter = 'B';
  l5_src_bedside.title = l5_src_bedside.title.replace(/^Source [A-E]/, 'Source B');
  l5_src_paris.letter = 'C';
  l5_src_paris.title = l5_src_paris.title.replace(/^Source [A-E]/, 'Source C');
  l5_src_flagellants.letter = 'D';
  l5_src_flagellants.title = l5_src_flagellants.title.replace(/^Source [A-E]/, 'Source D');
  l5_src_edward.letter = 'E';
  l5_src_edward.title = l5_src_edward.title.replace(/^Source [A-E]/, 'Source E');

  l5.sources = [l5_src_boccaccio, l5_src_bedside, l5_src_paris, l5_src_flagellants, l5_src_edward];

  const orig_l5_b1 = l5.narrative_blocks[0];
  const orig_l5_b2 = l5.narrative_blocks[1];
  const orig_l5_b3 = l5.narrative_blocks[2];
  const orig_l5_b4 = l5.narrative_blocks[3];

  l5.narrative_blocks = [
    {
      act: 1,
      act_title:
        'Stage 1: Arrival at Melcombe Regis — How did trade routes unwittingly bring the plague to England?',
      theme: 'Arrival and Clinical Symptoms of the Pestilence',
      title: 'Arrival and Clinical Symptoms of the Pestilence',
      content: orig_l5_b1.content,
      text: orig_l5_b1.content,
      image: '/images/medieval_trading_cog_ship.jpg',
      caption:
        'Fourteenth-century trading cog ship of the type that transported Black Death victims and cargo to Melcombe Regis.',
      image_alt: 'Medieval merchant sailing ship with single square sail on water',
      isReversed: false,
      sources: [l5_src_boccaccio],
    },
    {
      act: 2,
      act_title:
        'Stage 2: Buboes & Pneumonic Terror — Why was the pneumonic strain far deadlier than the bubonic form?',
      theme: 'Clinical Symptoms: Bubonic and Pneumonic Terror',
      title: 'Clinical Symptoms: Bubonic and Pneumonic Terror',
      content:
        'The Black Death attacked the human body with terrifying speed in two distinct epidemiological forms. The bubonic strain, transmitted by fleas from infected black rats, attacked the lymphatic system: victims suffered violent shivering, vomiting, high fevers, and the eruption of agonizing, foul-smelling swellings called buboes in the groin, armpits, and neck, which grew to the size of apples and turned black as internal hemorrhaging occurred. If the buboes failed to burst, victims died within three to five days. Even more lethal was the pneumonic strain, which spread directly through airborne coughs and sneezes into the respiratory tract. Patients spat blood, experienced suffocating chest pain, and perished within twenty-four hours without ever developing buboes. The mortality rate of pneumonic plague approached nearly 100%, and its rapid airborne transmission terrorized doctors and priests, who fled infected sickbeds in panic.',
      text: 'The Black Death attacked the human body with terrifying speed in two distinct epidemiological forms. The bubonic strain, transmitted by fleas from infected black rats, attacked the lymphatic system: victims suffered violent shivering, vomiting, high fevers, and the eruption of agonizing, foul-smelling swellings called buboes in the groin, armpits, and neck, which grew to the size of apples and turned black as internal hemorrhaging occurred. If the buboes failed to burst, victims died within three to five days. Even more lethal was the pneumonic strain, which spread directly through airborne coughs and sneezes into the respiratory tract. Patients spat blood, experienced suffocating chest pain, and perished within twenty-four hours without ever developing buboes. The mortality rate of pneumonic plague approached nearly 100%, and its rapid airborne transmission terrorized doctors and priests, who fled infected sickbeds in panic.',
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l5_src_bedside],
    },
    {
      act: 3,
      act_title:
        'Stage 3: Desperate Treatments & Strapped Chickens — Why were medical treatments completely useless against the plague?',
      theme: 'Medieval Explanations: Wrath of God and Planetary Alignment',
      title: 'Medieval Explanations: Wrath of God and Planetary Alignment',
      content: orig_l5_b2.content,
      text: orig_l5_b2.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l5_src_paris],
    },
    {
      act: 4,
      act_title:
        'Stage 4: King Edward III’s Cleanliness Order — How did belief in miasma shape royal prevention orders?',
      theme: 'Desperate Approaches to Treatment',
      title: 'Desperate Approaches to Treatment',
      content: orig_l5_b3.content,
      text: orig_l5_b3.content,
      image: null,
      caption: null,
      image_alt: null,
      isReversed: false,
      sources: [l5_src_flagellants],
    },
    {
      act: 5,
      act_title:
        'Stage 5: Mass Burial Pits & Demographic Collapse — Why did the Black Death trigger a long-term social and economic crisis?',
      theme: 'Attempts at Prevention, Mass Graves, and Social Collapse',
      title: 'Attempts at Prevention, Mass Graves, and Social Collapse',
      content:
        orig_l5_b4.content +
        "\n\nAs the death toll escalated beyond the capacity of traditional churchyards, London authorities purchased new emergency cemetery grounds at East Smithfield and Spitalfields, excavating colossal mass burial trenches where hundreds of corpses were stacked in layers like cargo in a ship's hold. Between 1348 and 1350, an estimated 30% to 45% of England's population—nearly two million people—perished. Whole villages were abandoned, agricultural fields lay unharvested, and livestock roamed untended. The catastrophic demographic collapse produced severe labour shortages, empowering surviving serfs to demand higher wages and directly undermining the feudal economic order.",
      text:
        orig_l5_b4.content +
        "\n\nAs the death toll escalated beyond the capacity of traditional churchyards, London authorities purchased new emergency cemetery grounds at East Smithfield and Spitalfields, excavating colossal mass burial trenches where hundreds of corpses were stacked in layers like cargo in a ship's hold. Between 1348 and 1350, an estimated 30% to 45% of England's population—nearly two million people—perished. Whole villages were abandoned, agricultural fields lay unharvested, and livestock roamed untended. The catastrophic demographic collapse produced severe labour shortages, empowering surviving serfs to demand higher wages and directly undermining the feudal economic order.",
      image: '/images/plague_burial.jpg',
      caption:
        'Mass burial trench during the Black Death pandemic as cemetery grounds were rapidly overwhelmed.',
      image_alt:
        'Fourteenth-century miniature showing corpses in shrouds lowered into a large communal grave pit',
      isReversed: true,
      sources: [l5_src_edward],
    },
  ];

  // Re-serialize cleanly
  const outCode = `// Edexcel GCSE History: Medicine Through Time (c1250–present)\n// Standardized 5-Block Narrative & Aligned Sources\n\nconst edexcel_medicine_data = ${JSON.stringify(data, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = edexcel_medicine_data;\n}\nexport default edexcel_medicine_data;\n`;

  fs.writeFileSync(filePath, outCode, 'utf8');
  console.log(`Successfully harmonized KT1 in: ${filePath}`);
}

harmonizeMedicineKT1('units/edexcel_medicine/data.js');
harmonizeMedicineKT1('public/units/edexcel_medicine/data.js');
