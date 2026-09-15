// Topic 1: Medieval Britain (c.1250–c.1500) — Spreads 1, 2, 3
module.exports = [
  // ==========================================
  // SPREAD 1: IDEAS ABOUT CAUSES OF ILLNESS
  // ==========================================
  {
    topic: 'Topic 1 &bull; Medieval Britain (c.1250–c.1500)',
    title: 'Spread 1: What Did Medieval People Believe Caused Illness?',
    left: {
      headline: 'Ideas About Cause: The Classical-Religious Monopoly',
      summary:
        'Medical thinking in medieval Britain was trapped in intellectual stagnation. The **Catholic Church** strictly enforced Galenic and Hippocratic doctrines because they aligned with scripture, suppressing anatomical dissection, independent enquiry, and scientific challenge.',
      pillars: [
        {
          title: '1. The Catholic Church',
          subtitle: 'Institutional Hegemony',
          bullets: [
            'Monopolised education, universities, and manuscript copying; preserved Galenic texts as unchallengeable truth.',
            'Taught that disease was sent directly by **God** as punishment for sin, spiritual cleansing, or a test of faith.',
            'Outlawed human dissection and branded any empirical challenge to Galen as dangerous heresy.',
            'Promoted prayer, pilgrimage, fasting, and buying indulgences as the only true pathways to healing.',
          ],
        },
        {
          title: '2. Hippocrates (c.460–370 BC)',
          subtitle: 'Ancient Greek Rationalism',
          bullets: [
            'Pioneered natural etiology: created the **Theory of the Four Humours** (Blood, Phlegm, Yellow Bile, Black Bile).',
            'Argued disease occurred when internal humours fell out of natural balance due to diet, season, or climate.',
            'Pioneered clinical observation: examining patient pulse, complexion, and recording symptom progression.',
            'Established the Hippocratic Oath of professional ethics and advocated moderate diet and rest.',
          ],
        },
        {
          title: '3. Claudius Galen (c.129–216 AD)',
          subtitle: 'Imperial Roman Synthesis',
          bullets: [
            'Expanded humoral theory: formulated the **Theory of Opposites** (e.g. treating cold phlegm with hot chillies).',
            'Dissected pigs, apes, and dogs; incorrectly claimed humans had a two-lobed liver and porous cardiac septum.',
            'Argued the human body had a single divine designer (teleology), winning total endorsement from the Church.',
            'Authored over 300 medical treatises that became the mandatory curriculum in European medieval medical schools.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Hippocrates',
          role: 'Greek physician; father of modern clinical observation and Four Humours theory.',
        },
        {
          name: 'Claudius Galen',
          role: 'Roman physician; created Theory of Opposites; single divine creator theory adopted by Church.',
        },
        {
          name: 'Roger Bacon',
          role: '13th-century Franciscan friar imprisoned for advocating empirical scientific observation over Galen.',
        },
        {
          name: 'The Pope & Clergy',
          role: 'Institutional guardians of dogma; controlled medical licenses and university curricula.',
        },
      ],
      archivalSource: {
        title: 'Miasma & Divine Wrath in Medieval Medical Manuscripts',
        citation: 'British Library · Sloane MS 2435, Compendium Medicinae, c.1320',
        quote:
          'When the air becometh corrupt through the unburied corpses of beasts, marshes, or the alignment of malignant stars, the breath draweth into the heart pestilential venom. Yet above all earthly causes standeth the righteous wrath of Almighty God, whose arrows strike down the sinner.',
        significance:
          'Demonstrates how rational humoral ideas (corrupt air/miasma) were inseparable from religious and supernatural explanations in medieval academic treatises.',
      },
    },
    right: {
      deepCases: [
        {
          title: 'Case 1: The Four Humours in Daily Diagnosis',
          points: [
            'Every person possessed an individual humoral balance linked to personality, age, and zodiac signs.',
            'Physicians used urine charts comparing color, clarity, and smell against 20 standard shades to determine excess humour.',
            'Excess Blood required venesection (phlebotomy); excess Phlegm was purged using emetics and steaming baths.',
            'The theory provided a rational explanation without requiring supernatural intervention, explaining its massive longevity.',
          ],
        },
        {
          title: 'Case 2: Astrology & Malignant Conjunctions',
          points: [
            'Physicians carried a *Vade Mecum* ("Go with me") pocket book containing astrological charts and zodiac men.',
            'Different zodiac signs governed specific body parts (e.g. Aries ruled the head, Pisces ruled the feet).',
            'Surgeons refused to perform operations or bloodletting if the moon was in an unfavorable astrological house.',
            'Major epidemics were frequently blamed on unusual planetary conjunctions, such as Saturn, Jupiter, and Mars in 1345.',
          ],
        },
        {
          title: 'Case 3: Miasma (Corrupt Air) Doctrine',
          points: [
            'Miasma was believed to be poisonous, foul-smelling air generated by swamps, rotting corpses, dung heaps, and cesspits.',
            "Inhaling miasma was thought to disrupt the body's internal humoral balance, corrupting blood and organs.",
            'Wealthy citizens carried pomanders (metal balls containing sweet herbs, ambergris, and rosewater) to ward off noxious air.',
            'Town councils occasionally ordered muck-heaps moved outside city gates, inadvertently improving urban sanitation.',
          ],
        },
        {
          title: 'Case 4: The Grip of the Medieval University',
          points: [
            'Training to become a fully qualified physician took 7 to 10 years of reading classical Latin and Greek texts.',
            'Medical students never examined live hospital patients; learning consisted entirely of debating Galenic texts.',
            'Anatomical demonstrations were rare: a barber-surgeon dissected a dog or pig while the professor read Galen aloud.',
            'If a human dissection contradicted Galen, professors insisted the cadaver was abnormal or deformed.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Church Adoption',
          text: "Catholic Church adopts Galen's teleological texts into theological canon.",
        },
        {
          stage: '2. Monastic Control',
          text: 'Monasteries monopolize book copying; reject any non-biblical medical challenges.',
        },
        {
          stage: '3. University Stagnation',
          text: 'Medical faculties mandate rote Latin memorization; clinical dissection banned.',
        },
        {
          stage: '4. Centuries of Stagnation',
          text: 'Humoral and miasma orthodoxy freezes medical progress for over 1,300 years.',
        },
      ],
      masterWordBank: [
        {
          term: 'Four Humours',
          def: 'Blood, Phlegm, Yellow Bile, Black Bile; natural bodily fluids.',
        },
        {
          term: 'Theory of Opposites',
          def: 'Galenic principle of balancing humours with opposite qualities.',
        },
        { term: 'Miasma', def: 'Foul-smelling, corrupt air believed to carry lethal disease.' },
        {
          term: 'Teleology',
          def: 'Belief that the body was purposely designed by a divine creator.',
        },
        {
          term: 'Phlebotomy',
          def: 'Surgical bloodletting using venesection, cupping, or leeches.',
        },
        { term: 'Zodiac Man', def: 'Astrological diagram linking body parts to constellations.' },
        {
          term: 'Urine Chart',
          def: 'Visual guide used by physicians to diagnose humoral imbalance.',
        },
        { term: 'Vade Mecum', def: 'Portable physician reference booklet with planetary tables.' },
        {
          term: 'Clinical Observation',
          def: 'Hippocratic practice of recording patient symptoms systematically.',
        },
        {
          term: 'Dogma',
          def: 'Authoritative religious belief that cannot be questioned or challenged.',
        },
        {
          term: 'Indulgences',
          def: 'Church certificates purchased to reduce punishment for sins.',
        },
        { term: 'Apothecary', def: 'Medieval tradesman who prepared herbal medicines and charms.' },
      ],
    },
  },

  // ==========================================
  // SPREAD 2: APPROACHES TO TREATMENT & CARE
  // ==========================================
  {
    topic: 'Topic 1 &bull; Medieval Britain (c.1250–c.1500)',
    title: 'Spread 2: Approaches to Treatment & Care: Rational, Supernatural & Monastic',
    left: {
      headline: 'Treatment & Care: Between Monastery, Guild, and Herbal Lore',
      summary:
        'Medieval treatments reflected the sharp division between elite academic theory and everyday folk practice. Care focused on spiritual comfort and balancing humours, while surgical operations were excruciating, dirty, and frequently lethal.',
      pillars: [
        {
          title: '1. Humoral Balancing',
          subtitle: 'Phlebotomy & Purging',
          bullets: [
            'Bloodletting was the most common treatment: performed via vein opening, warm glass cupping, or live leeches.',
            'Purging the digestive tract used strong herbal emetics, scammony, and clysters (enemas) to expel corrupt humours.',
            'Regimen Sanitatis: personalized lifestyle guides advising on diet, exercise, sleep, and bathing to maintain balance.',
            'Baths and warm herbal infusions were prescribed to open skin pores and draw out internal hot or dry humours.',
          ],
        },
        {
          title: '2. Supernatural Healing',
          subtitle: 'Religious & Magical Rites',
          bullets: [
            'Chantries and pilgrimage to holy shrines (e.g. Thomas Becket at Canterbury) to pray for miraculous intervention.',
            'Touching holy relics, wearing inscribed parchment amulets, and reciting devotional prayers (Pater Noster, Ave Maria).',
            'The "Royal Touch": monarchs were believed to possess God-given miraculous powers to cure scrofula (King\'s Evil).',
            'Self-flagellation and fasting undertaken to appease divine anger and purge sinful bodily desires.',
          ],
        },
        {
          title: '3. Medieval Practitioners',
          subtitle: 'The Healthcare Hierarchy',
          bullets: [
            'Physicians: university-educated elite; diagnosed illnesses but rarely touched patients; extremely expensive.',
            'Apothecaries: mixed herbal remedies, ointments, and poisons based on the *Materia Medica*; cheaper than physicians.',
            'Barber-Surgeons: performed minor operations, lanced boils, amputated limbs, and pulled teeth; guild-trained tradesmen.',
            'Wise Women & Midwives: delivered babies and treated rural villagers using traditional herbal folklore.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'John of Arderne',
          role: 'English medieval surgeon (1307–1392); wrote *Practica Chirurgiae*; pioneered fistula surgery.',
        },
        {
          name: 'Wise Woman',
          role: 'Local village healer; provided herbal concoctions, bone setting, and midwifery for the poor.',
        },
        {
          name: 'Barber-Surgeon',
          role: 'Guild craftsman armed with razors and saws; performed external surgeries and bloodletting.',
        },
        {
          name: 'Medieval Abbott',
          role: 'Monastic overseer of hospital infirmaries; prioritized spiritual salvation over medical cure.',
        },
      ],
      archivalSource: {
        title: "Rules and Regulations of St Bartholomew's Hospital, London",
        citation:
          "London Metropolitan Archives · St Bartholomew's Cartulary, c.1180 (revised 1350)",
        quote:
          'Let the sick poor be received with gentle charity; let them be washed, placed in clean beds, and confessed of all their sins by the chaplain. For what profiteth it a man if his flesh be made whole, yet his immortal soul perisheth in eternal damnation? Let prayer be continuous at the altar.',
        significance:
          'Reveals that medieval monastic hospitals were spiritual hospices providing food, warmth, and pastoral prayer, strictly refusing infectious or terminal patients.',
      },
    },
    right: {
      deepCases: [
        {
          title: 'Case 1: The Medieval Hospital (Care, Not Cure)',
          points: [
            'Over 700 hospitals founded in England by 1500, run by Catholic monks and nuns financed by wealthy benefactors.',
            'Wards were designed like churches with beds facing the altar so patients could participate in daily Latin Mass.',
            'Hospitals provided clean bedding, warm fires, nutritious broth, and spiritual confession, but zero medical surgery.',
            'Leprosaria (Lazar houses) were built outside city boundaries to isolate disfigured lepers from the wider population.',
          ],
        },
        {
          title: 'Case 2: Herbal Pharmacopoeia & Domestic Lore',
          points: [
            'Remedies drew heavily on native plants: mint for stomach cramps, chamomile for fever, willow bark for joint pain.',
            'Theriac: a complex universal antidote containing over 60 ingredients including crushed vipers, opium, and honey.',
            'Doctrine of Signatures: plants resembling body parts were used to treat them (e.g. lungwort for chest infections).',
            'Herbal knowledge was compiled in family leechbooks passed down through generations of housewives and nuns.',
          ],
        },
        {
          title: 'Case 3: Surgery Without Antiseptics or Anaesthetics',
          points: [
            'Surgeons lacked effective pain relief; patients were held down by strong assistants or given wine and mandrake.',
            'Clysters (enemas) made from pig bladders and reed pipes were used to administer violent purgatives.',
            'Cauterization: open amputation stumps and wounds were sealed using red-hot branding irons or boiling elderberry oil.',
            'Surgeons believed pus in wounds ("laudable pus") was a natural and healthy sign of the body expelling disease.',
          ],
        },
        {
          title: 'Case 4: John of Arderne & Surgical Specialism',
          points: [
            "Served as a military surgeon during the Hundred Years' War, treating battlefield injuries at the Siege of Calais (1347).",
            'Developed a specialized surgical procedure for *anal fistula* using custom instruments with a claimed 50% survival rate.',
            'Advised surgeons to wash their hands, keep wounds clean, and dress injuries with soothing chamomile and egg white.',
            'Urged practitioners to maintain a calm, professional bedside manner and demand high fees from noblemen to preserve status.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Spiritual Prioritization',
          text: 'Church positions disease as spiritual crisis; monasteries establish care wards.',
        },
        {
          stage: '2. Guild Segregation',
          text: 'Physicians read theory in Latin; barber-surgeons perform bloody trade surgeries.',
        },
        {
          stage: '3. Empirical Limits',
          text: 'Lack of antiseptics, anaesthetics, and germ awareness keeps surgery lethal.',
        },
        {
          stage: '4. Enduring Folklore',
          text: 'Poor rely exclusively on wise women and herbal leeches for day-to-day relief.',
        },
      ],
      masterWordBank: [
        { term: 'Lazar House', def: 'Specialized monastic hospital built to isolate lepers.' },
        { term: 'Leech', def: 'Blood-sucking worm used for precise, painless phlebotomy.' },
        {
          term: 'Theriac',
          def: 'Complex herbal mixture of 60+ ingredients used as universal panacea.',
        },
        { term: 'Cauterization', def: 'Burning flesh with red-hot iron to seal blood vessels.' },
        {
          term: 'Anal Fistula',
          def: 'Painful infected tunnel between bowel and skin; treated by Arderne.',
        },
        {
          term: 'Laudable Pus',
          def: 'Medieval misconception that wound suppuration indicated healing.',
        },
        { term: 'Clyster', def: 'Enema pipe used to inject liquids into the rectum.' },
        {
          term: 'Regimen Sanitatis',
          def: 'Personalized rule of health outlining diet, rest, and hygiene.',
        },
        {
          term: 'Monastic Infirmary',
          def: 'Monastery ward providing shelter, food, and prayer for sick.',
        },
        {
          term: 'Materia Medica',
          def: 'Classical encyclopedias listing properties of medicinal herbs.',
        },
        {
          term: 'Barber-Surgeon',
          def: 'Tradesman performing external operations and hair cutting.',
        },
        {
          term: 'Royal Touch',
          def: 'Monarchical ceremony believed to cure scrofula through divine grace.',
        },
      ],
    },
  },

  // ==========================================
  // SPREAD 3: CASE STUDY: THE BLACK DEATH (1348–49)
  // ==========================================
  {
    topic: 'Topic 1 &bull; Medieval Britain (c.1250–c.1500)',
    title: 'Spread 3: Case Study: The Black Death, 1348–49 (Causes, Treatments &amp; Impact)',
    left: {
      headline: 'The Cataclysm: Society, Plague, and Total Collapse',
      summary:
        'Arriving in Dorset in the summer of 1348, the **Black Death** annihilated 30% to 45% of the English population within eighteen months. Confronted by an invisible killer, medieval medical theory collapsed into superstition, religious hysteria, and municipal panic.',
      pillars: [
        {
          title: '1. Medical & Divine Causes',
          subtitle: 'The Spectrum of Blame',
          bullets: [
            'Primary belief: divine retribution sent by an angry God for human vanity, greed, and general moral corruption.',
            'Astrological catalyst: unusual conjunction of Saturn, Jupiter, and Mars in the sign of Aquarius in March 1345.',
            'Miasma: foul vapors released by earthquakes in China or rising from unburied, putrefying corpses.',
            'Modern epidemiology: *Yersinia pestis* bacteria carried by fleas (*Xenopsylla cheopis*) living on black rats (*Rattus rattus*).',
          ],
        },
        {
          title: '2. Desperate Treatments',
          subtitle: 'Futile Medieval Responses',
          bullets: [
            'Bleeding and violent purging: performed to balance humours, but severely weakened patients and accelerated death.',
            'Lancing buboes: cutting open agonizing swellings in groins and armpits, frequently causing lethal septic shock.',
            'Applying warm poultices made of cooked onions, crushed herbs, pigeon droppings, or plucked live chicken bellies.',
            'Drinking crushed emeralds, vinegar, and arsenic; holding fragrant pomanders or posies to ward off poisoned air.',
          ],
        },
        {
          title: '3. Containment & Control',
          subtitle: 'Municipal Interventions',
          bullets: [
            'London and Gloucester attempted to close city gates and bar travelers arriving from infected coastal ports.',
            'Houses with infected inhabitants were boarded up with families trapped inside, marked with crosses.',
            'King Edward III ordered the Mayor of London to clean dung heaps and slaughterhouse filth from city streets.',
            'Churchyards overflowed; authorities dug massive communal plague pits outside city boundaries (e.g. Smithfield).',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'King Edward III',
          role: 'English monarch; ordered streets cleaned of filth to dispel miasma; passed 1351 Statute of Labourers.',
        },
        {
          name: 'Pope Clement VI',
          role: 'Pope at Avignon; sat between two blazing fires to survive; granted blanket absolution to plague victims.',
        },
        {
          name: 'The Flagellants',
          role: "Fanatical religious sect who whipped themselves publicly to atone for sins and avert God's wrath.",
        },
        {
          name: 'Parish Clergy',
          role: 'Priests who died in disproportionate numbers (~45%) administering last rites to dying parishioners.',
        },
      ],
      archivalSource: {
        title: 'Chronicle of the Plague in Rochester',
        citation: 'British Library · Cotton MS Nero D. II, William of Dene, Rochester Priory, 1349',
        quote:
          "Men and women carried their children upon their shoulders towards the church and cast them into common pits. Such a terror struck everyone that no one dared enter a sick person's house, nor would a priest administer the Holy Sacraments. Fields remained unploughed, cattle roamed wild through the corn, and the living could scarce suffice to bury the dead.",
        significance:
          'Directly illustrates the complete breakdown of social order, religious ministry, and agricultural economy during the peak mortality of 1348–49.',
      },
    },
    right: {
      deepCases: [
        {
          title: 'Case 1: Bubonic vs Pneumonic Plague Manifestations',
          points: [
            'Bubonic plague: flea-borne infection of the lymphatic system causing fever, black spots (*petechiae*), and agonizing buboes.',
            'Buboes swelled in armpits and groins to the size of apples, oozing foul pus; death occurred in 3 to 5 days in 70% of cases.',
            'Pneumonic plague: airborne mutation transmitted directly via coughing; attacked lungs causing bloody sputum.',
            'Pneumonic plague was almost 100% fatal within 24 hours, terrorizing physicians who observed healthy people die overnight.',
          ],
        },
        {
          title: 'Case 2: The Flagellant Movement & Religious Hysteria',
          points: [
            'Originating in Central Europe, brotherhoods of flagellants marched through towns stripped to the waist.',
            'Chanting Latin hymns, they scourged their backs with iron-tipped leather whips three times a day for 33 days.',
            'Their presence inflamed antisemitic pogroms across Europe, falsely blaming Jewish communities for poisoning wells.',
            'Pope Clement VI officially condemned and banned the movement in October 1349 as heretical and dangerous to social order.',
          ],
        },
        {
          title: 'Case 3: Failure of Quarantine & Town Infrastructure',
          points: [
            'Winchester refused to allow corpses from Southampton inside city gates, but the epidemic leaped boundaries regardless.',
            'Quarantine failed because authorities had no concept of flea vectors; clothes and bedding of the dead were resold.',
            'Streets in London lacked drainage; open open kennels ran with sewage and offal, providing ideal breeding grounds for rats.',
            'London authorities hired "rakers" to cart dung outside walls, but could not enforce disposal regulations during mass die-offs.',
          ],
        },
        {
          title: 'Case 4: Long-Term Socio-Economic Consequences',
          points: [
            'Massive death toll (~40% of population) caused severe labor shortages; surviving peasants demanded double wages.',
            'Feudal landowners were forced to offer freedom and cash wages to prevent serfs abandoning manors, shattering feudalism.',
            'Government passed the 1351 *Statute of Labourers* fixing wages at pre-plague rates, generating peasant fury.',
            "Deep resentment against oppressive wage caps directly fueled the landmark Peasants' Revolt of 1381.",
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Asian Trade Routes',
          text: 'Black rat fleas travel along Silk Road and Genoese ships to Melcombe Regis (1348).',
        },
        {
          stage: '2. Rapid Transmission',
          text: 'Flea bites and coughing infect vulnerable, malnourished urban populations.',
        },
        {
          stage: '3. Medical Futility',
          text: 'Humoral bleeding and incense fail completely; 1.5 million Britons perish.',
        },
        {
          stage: '4. Feudal Collapse',
          text: 'Severe labor shortages empower working classes, triggering economic revolution.',
        },
      ],
      masterWordBank: [
        {
          term: 'Buboes',
          def: 'Agonizing swellings of lymph nodes in the groin, armpits, or neck.',
        },
        { term: 'Yersinia pestis', def: 'Bacterium causing bubonic and pneumonic plague.' },
        {
          term: 'Flagellants',
          def: 'Radical religious groups who whipped themselves to appease God.',
        },
        { term: 'Petechiae', def: 'Dark purple spots on skin caused by internal hemorrhaging.' },
        {
          term: 'Plague Pit',
          def: 'Mass burial trench used when consecrated churchyards overflowed.',
        },
        {
          term: 'Pneumonic Plague',
          def: 'Airborne version of plague attacking lungs; highly contagious and fatal.',
        },
        {
          term: 'Statute of Labourers',
          def: '1351 English law attempting to freeze peasant wages at pre-plague levels.',
        },
        { term: 'Rakers', def: 'Medieval street-cleaners appointed to shovel muck and offal.' },
        {
          term: 'Absolution',
          def: 'Formal Catholic forgiveness of sins, granted in bulk during crisis.',
        },
        {
          term: 'Pomander',
          def: 'Perforated metal ball filled with sweet spices to ward off miasma.',
        },
        {
          term: 'Quarantine',
          def: 'Isolation period (traditionally 40 days) to prevent spread of disease.',
        },
        {
          term: 'Vector',
          def: 'Organism (such as the rat flea) that transmits disease pathogens.',
        },
      ],
    },
  },
];
