const fs = require('fs');
const path = require('path');

const medicineScaffolds = {
  lesson_1_1: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to analyse medieval religious and supernatural beliefs about illness:',
    blocks: [
      {
        num: 1,
        badge: 'RELIGIOUS DOGMA',
        title: '1. Divine Retribution & The Catholic Church',
        prompt:
          'Explain why medieval society believed illness was sent directly by God as a punishment for sin or a test of faith:',
        model_notes: [
          'God was seen as the primary cause of all earthly events; disease was divine punishment for moral transgression or a test of devotion.',
          'The Catholic Church held a monopoly over education, scriptoria (manuscript copying), and universities, teaching that challenging scripture was heresy.',
          'Friar Roger Bacon was imprisoned in 1277 for advocating empirical observation rather than blind acceptance of ancient authority.',
        ],
        key_terms: ['Divine Retribution', 'Monastic Scriptoria'],
      },
      {
        num: 2,
        badge: 'ASTROLOGY',
        title: '2. Celestial Movements & The 1345 Conjunction',
        prompt:
          'Explain how medieval physicians used astrological charts (almanacs) and zodiac signs to diagnose illness:',
        model_notes: [
          "Physicians carried 'almanacs' (astrological calendars) and examined the alignment of planets and stars to calculate disease risks.",
          'The great planetary conjunction of Mars, Jupiter, and Saturn in Aquarius in 1345 was blamed by Paris physicians for corrupting atmospheric air.',
          "The 'Zodiac Man' diagram instructed doctors which bodily organs corresponded to which constellations before attempting medical interventions.",
        ],
        key_terms: ['Astrological Almanac', 'Planetary Conjunction'],
      },
      {
        num: 3,
        badge: 'IMPACT ON PROGRESS',
        title: '3. Why Religious Beliefs Blocked Medical Change',
        prompt:
          'Evaluate why unquestioning belief in divine cause and biblical authority prevented natural cures from developing:',
        model_notes: [
          'Because illness was sent by God, the only rational cures were prayer, pilgrimages to shrines, and fasting rather than clinical experimentation.',
          "The Church protected Galen's texts because his teleological philosophy argued the human body was designed by a single Creator.",
          'Human dissection was strictly controlled or forbidden, locking anatomy into 1,000-year-old animal-based Galenic theory.',
        ],
        key_terms: ['Galenic Orthodoxy', 'Heresy'],
      },
    ],
  },
  lesson_1_2: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to map rational medieval explanations (Hippocrates, Galen & Miasma):',
    blocks: [
      {
        num: 1,
        badge: 'FOUR HUMOURS',
        title: '1. Hippocrates & Bodily Balance',
        prompt:
          "Explain Hippocrates' Theory of the Four Humours and how an internal imbalance produced disease symptoms:",
        model_notes: [
          'Hippocrates argued the body contained 4 vital fluids: Blood (spring/air/hot & wet), Phlegm (winter/water/cold & wet), Yellow Bile (summer/fire/hot & dry), and Black Bile (autumn/earth/cold & dry).',
          'A healthy individual had humours in balance; illness occurred when one humour became excessive, deficient, or corrupt.',
          'This was rational because symptoms (e.g. fever = hot/dry; winter cold = wet phlegm) appeared to physically match humoural properties.',
        ],
        key_terms: ['Four Humours', 'Clinical Observation'],
      },
      {
        num: 2,
        badge: 'THEORY OF OPPOSITES',
        title: '2. Galen & Restoring Internal Harmony',
        prompt:
          'Explain how Galen developed the Theory of Opposites to treat disease, and why the Church adopted him:',
        model_notes: [
          'Galen introduced treatment by balance: treating symptoms with their opposite qualities (e.g. cold phlegmatic chills treated with hot, dry pepper and red wine).',
          'Phlebotomy (bloodletting) was prescribed to remove excess hot blood, alongside purging with emetics and laxatives.',
          "Galen believed the human body was purposefully crafted by a single Creator ('teleology'), leading the Catholic Church to adopt his writings as absolute truth.",
        ],
        key_terms: ['Theory of Opposites', 'Phlebotomy'],
      },
      {
        num: 3,
        badge: 'MIASMA THEORY',
        title: '3. Bad Air, Swamps & Rotting Matter',
        prompt:
          "Explain what medieval people meant by 'miasma' and how it connected the environment to bodily humours:",
        model_notes: [
          'Miasma was poisonous vapour arising from decaying corpses, uncleaned cesspits, swamps, and stagnant filth.',
          'Inhaling foul air was believed to corrupt the internal humours, causing epidemic diseases like plague.',
          'Miasma led to sensible public health practices (clearing dung, burning fragrant herbs, carrying pomanders), even though the biological mechanism was incorrect.',
        ],
        key_terms: ['Miasma', 'Pestilential Vapours'],
      },
    ],
  },
  lesson_1_3: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate medieval approaches to prevention and treatment:',
    blocks: [
      {
        num: 1,
        badge: 'HUMOURAL PRACTICE',
        title: '1. Phlebotomy, Purging & The Regimen Sanitatis',
        prompt:
          'Detail the specific methods medieval practitioners used to rebalance humours (bleeding, purging, cupping):',
        model_notes: [
          'Phlebotomy was performed via vein-cutting (using a fleam), leeches, or warm cupping glasses to draw excessive blood.',
          'Purging cleared the digestive tract using emetics (vomit-inducing hellebore) and strong herbal laxatives (linseed and senna).',
          "The 'Regimen Sanitatis' gave wealthy patients holistic lifestyle guidelines: balanced diet, moderate exercise, regular bathing, and sleep.",
        ],
        key_terms: ['Purging', 'Regimen Sanitatis'],
      },
      {
        num: 2,
        badge: 'RELIGIOUS REMEDIES',
        title: '2. Pilgrimages, Relics, Fasting & Flagellation',
        prompt:
          'Explain the supernatural and religious actions ordinary people took to cure or prevent illness:',
        model_notes: [
          'Pilgrimages were made to holy shrines (e.g. Canterbury Cathedral to touch the shrine of Thomas Becket) seeking miraculous healing.',
          'Patients touched saintly relics, lit votive candles, fasted, and prayed for saintly intercession.',
          'During epidemics, religious zealots (Flagellants) whipped themselves publicly to show repentance and avert divine punishment.',
        ],
        key_terms: ['Pilgrimage to Shrines', 'Flagellants'],
      },
      {
        num: 3,
        badge: 'HERBAL REMEDIES',
        title: '3. The Role of the Wise Woman & Herbal Theriac',
        prompt:
          'Explain how ordinary folk remedies, apothecaries, and herbal compounds (theriac) were used in daily life:',
        model_notes: [
          'Theriac was a famous multi-ingredient antidote containing up to 70 herbs, spices, and crushed serpent flesh.',
          'Wise women in local villages provided practical herbal knowledge (chamomile, mint, willow bark) and delivered babies as midwives.',
          'Ordinary peasants relied almost exclusively on wise women and apothecaries because university physicians charged prohibitive fees.',
        ],
        key_terms: ['Theriac', 'Wise Woman Healers'],
      },
    ],
  },
  lesson_1_4: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to examine medical practitioners and monastic hospitals:',
    blocks: [
      {
        num: 1,
        badge: 'PRACTITIONERS',
        title: '1. Physicians vs Barber-Surgeons & Apothecaries',
        prompt:
          'Compare the training, status, and treatments of university physicians versus apprentice barber-surgeons:',
        model_notes: [
          'Physicians studied 7-10 years at universities reading Latin texts, examined urine flasks, rarely touched patients, and charged high fees.',
          'Barber-surgeons learned via apprenticeships, pulled teeth, set broken bones, lanced buboes, and amputated limbs with boiling oil cautery.',
          'Apothecaries mixed herbal prescriptions, ointments, and poisons; cheaper than physicians, accessible to the urban middle class.',
        ],
        key_terms: ['University Physician', 'Barber-Surgeon'],
      },
      {
        num: 2,
        badge: 'MONASTIC HOSPITALS',
        title: "2. St Bartholomew's, St Thomas's & 'Care Not Cure'",
        prompt:
          'Explain why medieval monastic hospitals focused on hospitality, warmth, and prayer rather than medical treatment:',
        model_notes: [
          "Hospitals (like St Bartholomew's, founded 1123) were run by monks and nuns as charitable Christian sanctuaries.",
          "Their core philosophy was 'care not cure': providing clean bedding, warmth, food, and daily prayer to comfort the soul.",
          'Infectious diseases (plague, leprosy), terminal cases, and pregnant women were rejected to preserve order and spiritual purity.',
        ],
        key_terms: ['Care not Cure', 'Monastic Infirmary'],
      },
      {
        num: 3,
        badge: 'SEGREGATION',
        title: '3. Lazar Houses & Leprosy Containment',
        prompt:
          'Explain how medieval communities managed leprosy through isolation in Lazar houses on town outskirts:',
        model_notes: [
          'Leprosy was feared as an incurable, disfiguring contagion and viewed as a sign of inner moral or spiritual corruption.',
          "Sufferers were legally cast out of towns and housed in dedicated 'Lazar houses' located well outside parish boundaries.",
          'Lepers were forced to wear hooded cloaks and ring wooden hand-clappers or bells to warn healthy citizens to keep away.',
        ],
        key_terms: ['Lazar House', 'Leprosy Quarantine'],
      },
    ],
  },
  lesson_1_5: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate contemporary responses to the Black Death (1348–1349):',
    blocks: [
      {
        num: 1,
        badge: 'THE DISASTER',
        title: '1. The Black Death Arrives: Symptoms & Scale (1348)',
        prompt:
          'Detail the symptoms, transmission, and catastrophic death toll of the Black Death across England:',
        model_notes: [
          'Arrived at Melcombe Regis (Dorset) in June 1348 aboard trading ships; spread rapidly along trade routes to London by autumn.',
          'Bubonic form caused high fevers, vomiting, and agonizing dark buboes in armpits and groin; pneumonic form attacked lungs via coughing.',
          'Killed 30-45% of the English population within 18 months, causing massive economic disruption and social paralysis.',
        ],
        key_terms: ['Buboes', 'Bubonic Plague'],
      },
      {
        num: 2,
        badge: 'CONTEMPORARY BELIEFS',
        title: '2. Blaming God, Miasma & Planetary Conjunctions',
        prompt:
          'Explain the conflicting causes medieval people blamed for the plague and the remedies they attempted:',
        model_notes: [
          'Supernatural causes: divine anger at human wickedness, leading to mass religious processions, prayers, and flagellation.',
          'Environmental causes: poisonous miasma from rotting matter and the 1345 planetary conjunction; people carried sweet herbs and lit fires.',
          'Humoural treatments: bleeding buboes, applying warm pigeon entrails to swellings, drinking crushed emeralds; complete clinical failure.',
        ],
        key_terms: ['Divine Wrath', 'Planetary Alignment'],
      },
      {
        num: 3,
        badge: 'CIVIC RESPONSE',
        title: '3. Quarantine Attempts, Cemeteries & Structural Limits',
        prompt:
          "Evaluate civic attempts to halt contagion (quarantine, Gloucester's border closure) and why they failed:",
        model_notes: [
          'Gloucester attempted to close borders to people from Bristol; London established emergency mass burial trenches outside town walls.',
          'Quarantine failed because authorities had no concept of Yersinia pestis, rat flea vectors (Xenopsylla cheopis), or airborne droplets.',
          'Civic councils lacked police forces, professional public health departments, or legal powers to enforce strict cordons sanitaires.',
        ],
        key_terms: ['Quarantine', 'Street Cleaning'],
      },
    ],
  },
  lesson_2_1: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to map how ideas spread and why clerical authority broke down:',
    blocks: [
      {
        num: 1,
        badge: 'TECHNOLOGY',
        title: '1. The Movable Type Printing Press (c. 1440 Gutenberg / 1476 Caxton)',
        prompt:
          'Explain how mass-producing identical copies broke the Catholic Church’s clerical monopoly on medical textbooks:',
        model_notes: [
          'Books could be reproduced in identical form without copyist errors; ideas spread across Europe in weeks instead of centuries.',
          'Weakened Church censorship because thousands of copies circulated faster than inquisitors or bishops could confiscate them.',
          'Enabled humanists to translate and print original ancient Greek manuscripts directly, bypassing medieval Latin corruptions.',
        ],
        key_terms: ['Humanism', 'Movable-Type Press'],
      },
      {
        num: 2,
        badge: 'SCIENTIFIC METHOD',
        title: '2. The Royal Society & ‘Nullius in Verba’ (1660 / Royal Charter 1662)',
        prompt:
          'Explain how peer review and Philosophical Transactions (1665) replaced Galenic authority with laboratory proof:',
        model_notes: [
          "Motto 'Nullius in verba' (Take nobody's word for it) formally rejected ancient dogma in favour of laboratory experiments.",
          "Published 'Philosophical Transactions' (1665), the world's first peer-reviewed scientific journal, encouraging open scientific exchange.",
          'Received a Royal Charter from King Charles II (1662), giving secular scientific research royal prestige and state protection.',
        ],
        key_terms: ['Royal Society', 'Nullius in Verba'],
      },
      {
        num: 3,
        badge: 'HISTORICAL PARADOX',
        title: '3. The Limits of Renaissance Science (Why didn’t this cure sick patients?)',
        prompt:
          'Explain why ordinary sick people experienced almost zero benefit despite this revolution in printing and elite science:',
        model_notes: [
          'Breakthroughs were strictly in anatomical science, physics, and methodology, not in clinical therapeutics or pharmacology.',
          'University professors, apothecaries, and quacks continued prescribing humoural bleeding, purging, and astrological charms.',
          'Life expectancy and infant mortality remained virtually identical between 1500 and 1700; science understood anatomy, not cures.',
        ],
        key_terms: ['Medical Continuity', 'Galenic Dogma'],
      },
    ],
  },
  lesson_2_2: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate why Sydenham became ‘The English Hippocrates’:',
    blocks: [
      {
        num: 1,
        badge: 'CLINICAL METHOD',
        title: '1. Bedside Observation vs. Book-Learning (Observationes Medicae 1676)',
        prompt:
          'Explain how Sydenham’s method of closely monitoring real-time symptoms rejected Galenic library study and astrology:',
        model_notes: [
          "Nicknamed 'The English Hippocrates'; rejected studying theoretical Latin manuscripts; visited patients at bedside, recorded detailed symptom chronologies.",
          "Refused to check astrology or complex pulse charts, arguing that the patient's physical symptoms were the only true guide to illness.",
          "Encouraged doctors to observe the natural course of a disease and let the body's natural defenses fight it whenever possible.",
        ],
        key_terms: ['Bedside Observation', 'Observationes Medicae'],
      },
      {
        num: 2,
        badge: 'DIAGNOSIS',
        title: '2. Classifying Diseases into ‘Distinct Species’ (Like Plants in Botany)',
        prompt:
          'Explain how Sydenham viewed diseases as separate outside illnesses rather than unique personal fluid imbalances:',
        model_notes: [
          'Argued diseases had distinct, predictable identities like botanical species in plant classification.',
          'Successfully proved scarlet fever and measles were two entirely separate illnesses, requiring different clinical responses.',
          "Directly challenged ancient humoural dogma that every patient's illness was a unique personal imbalance of humours.",
        ],
        key_terms: ['Disease Classification', 'Scarlet Fever'],
      },
      {
        num: 3,
        badge: 'CONTINUITY PARADOX',
        title: '3. The Sydenham Paradox (Clinical Genius with Medieval Treatments)',
        prompt:
          'Explain why Sydenham prescribed cinchona bark and fresh air, but still relied heavily on bloodletting and humoural purging:',
        model_notes: [
          'Pioneered practical treatments: cinchona bark (quinine) for malaria fevers; cool bedrooms and light blankets for smallpox.',
          'Yet remained humoural at his core, prescribing regular venesection (bloodletting) and purges to expel toxins.',
          'Illustrates the central Renaissance paradox: clinical observation advanced dramatically, but treatments showed deep continuity.',
        ],
        key_terms: ['Cinchona Bark', 'Venesection'],
      },
    ],
  },
  lesson_2_3: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to analyze how direct human dissection overturned 1,400 years of Galenic dogma:',
    blocks: [
      {
        num: 1,
        badge: 'DISSECTION',
        title: '1. Direct Human Dissection & Correcting Galen’s Errors (De Fabrica 1543)',
        prompt:
          'Detail 2 specific anatomical errors Vesalius corrected by dissecting human criminals rather than Galen’s apes and pigs:',
        model_notes: [
          'Proved the human lower jaw (mandible) is one single bone, not two bones as Galen claimed from dog dissections.',
          'Proved the breastbone (sternum) has three segments, not seven as Galen described from apes.',
          'Proved the human heart septum had no invisible porous holes for blood to pass directly from the right to left ventricle.',
        ],
        key_terms: ['Human Dissection', 'De Fabrica (1543)'],
      },
      {
        num: 2,
        badge: 'RESISTANCE',
        title: '2. The Fierce Backlash from Conservative Doctors & Universities',
        prompt:
          'Explain why professors like Jacobus Sylvius attacked Vesalius and claimed the human body had ‘changed’ since Galen:',
        model_notes: [
          "Sylvius (Vesalius's former teacher) publicly attacked him, claiming Galen was infallible and human bodies had degenerated over time.",
          'Conservative medical faculties feared their costly library collections and university degrees would become worthless if Galen fell.',
          'Vesalius faced such intense professional hostility and academic vitriol that he resigned his professorship at Padua in frustration.',
        ],
        key_terms: ['Jacobus Sylvius', 'Galenic Infallibility'],
      },
      {
        num: 3,
        badge: 'EVALUATION',
        title: '3. The Significance Verdict: Master Anatomist vs Zero Cures',
        prompt:
          'Explain why De Fabrica transformed surgery and medical training forever, yet failed to cure a single sick patient in 1543:',
        model_notes: [
          "Published 'De Humani Corporis Fabrica' (1543) with magnificent illustrated woodcut plates printed on movable-type presses.",
          'Established anatomy as a primary empirical science, inspiring a generation of pioneering European anatomists.',
          'However, knowing precise bone and muscle structures did not stop blood loss, prevent infection, or cure internal epidemic disease.',
        ],
        key_terms: ['Anatomical Accuracy', 'Empirical Science'],
      },
    ],
  },
  lesson_2_4: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to trace how mechanical physics and mathematics proved circulation:',
    blocks: [
      {
        num: 1,
        badge: 'MATHEMATICS',
        title: '1. The Mechanical Pump & Mathematical Proof (De Motu Cordis 1628)',
        prompt:
          'Explain how Harvey calculated that 540 pints of blood pumped per hour mathematically destroyed Galen’s liver theory:',
        model_notes: [
          'Galen claimed the liver manufactured new blood from digested food, which was then burned as fuel by the body.',
          'Harvey measured heart capacity (2 ounces per beat) and calculated 540 pints pumped per hour (3x the weight of an average human).',
          'Mathematically proved the liver could not possibly manufacture this impossible volume; blood must circulate in a closed loop.',
        ],
        key_terms: ['Circulation of Blood', 'De Motu Cordis (1628)'],
      },
      {
        num: 2,
        badge: 'EXPERIMENT',
        title: '2. The Arm Ligature Experiment & One-Way Vein Valves',
        prompt:
          'Explain how tying tight and loose bandages proved arteries carry blood from the heart and vein valves only allow flow back to it:',
        model_notes: [
          'Tight arm bandage cut off arterial supply: hand went pale and cold; arteries pulsed strongly above the bandage.',
          'Loosening bandage allowed blood into arm via deeper arteries, but blocked superficial veins: veins swelled with trapped blood.',
          'Pushing blood past vein valves proved blood could only travel one way (toward the heart), confirming mechanical circulation.',
        ],
        key_terms: ['One-Way Valves', 'Mechanical Pump'],
      },
      {
        num: 3,
        badge: 'STAGNATION',
        title: '3. The 50-Year Delay & Continued Bloodletting',
        prompt:
          'Explain why doctors called Harvey a ‘circulator’ (quack) and continued phlebotomy despite knowing blood circulated:',
        model_notes: [
          "Conservative doctors fiercely defended Galen and nicknamed Harvey 'circulator' (Latin slang for a travelling quack or mountebank).",
          "Capillaries connecting arteries and veins were microscopic; circulation could not be visually completed until Malpighi's microscope (1661).",
          'Knowing blood circulated did not cure disease; physicians continued prescribing phlebotomy (bleeding) to balance humours until the mid-19th century.',
        ],
        key_terms: ['Capillaries', 'Scientific Revolution'],
      },
    ],
  },
  lesson_2_5: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to weigh municipal change against medical continuity during the Great Plague:',
    blocks: [
      {
        num: 1,
        badge: 'CIVIC CHANGE',
        title: '1. Municipal Quarantine & State Enforcement (What Changed since 1348?)',
        prompt:
          'Detail how the Mayor of London enforced 28-day house lock-ins, red crosses, parish watchmen, and Bills of Mortality:',
        model_notes: [
          "Lord Mayor's Orders padlocked infected houses for 28 days with a red cross and 'Lord have mercy upon us' painted on the door.",
          'Parish watchmen guarded locked houses 24/7; searchers of the dead inspected corpses; weekly Bills of Mortality tracked deaths by parish.',
          'Theatres, public taverns, and crowded fairs were shut down; street fires burned night and day; stray dogs and cats were exterminated.',
        ],
        key_terms: ['Tobacco Smoking', 'Pomanders'],
      },
      {
        num: 2,
        badge: 'MEDICAL CONTINUITY',
        title: '2. Treatments & Beliefs about Cause (What Stayed Exactly the Same?)',
        prompt:
          'Explain why ordinary Londoners and plague doctors still blamed miasma and God, relying on smoking tobacco, pomanders, and bleeding:',
        model_notes: [
          "Etiology mirrored 1348: plague was blamed on God's wrath and foul air (miasma) rising from unpaved streets and rotting corpses.",
          'Plague doctors wore waxed leather cloaks and bird-like beak masks stuffed with camphor and sweet spices to filter air.',
          'Eton schoolboys were whipped if they refused to smoke tobacco each morning; apothecaries sold useless plague waters and crushed gems.',
        ],
        key_terms: ['Pest House', 'Charity Hospital'],
      },
      {
        num: 3,
        badge: 'VERDICT',
        title: '3. The Historical Verdict: Civic Efficiency vs. Biological Helplessness',
        prompt:
          'Evaluate: Did London handle the 1665 plague better than 1348 because of science, or merely because of ruthless municipal policing?',
        model_notes: [
          'Over 100,000 Londoners perished (approx. 20% of the city); the wealthy (including King Charles II, court, and doctors like Sydenham) fled.',
          'Quarantine was a municipal policing measure enforcing isolation, not a biomedical cure; locking infected families with healthy ones increased deaths.',
          'The plague subsided not because of medical science, but because the cold winter suppressed fleas and the Great Fire of 1666 destroyed squalid wooden tenements.',
        ],
        key_terms: ['Plague Orders (1665)', 'Red Cross Searchers'],
      },
    ],
  },
  lesson_3_1: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to trace how Germ Theory overturned miasma:',
    blocks: [
      {
        num: 1,
        badge: 'BREAKTHROUGH',
        title: '1. Pasteur’s Germ Theory & Swan-Neck Flask Experiments (1861)',
        prompt:
          'Explain how Louis Pasteur disproved spontaneous generation and proved micro-organisms cause decay and illness:',
        model_notes: [
          'Investigated why wine and beer soured; proved living microbes were responsible for fermentation and spoilage, destroyed by heating (pasteurisation).',
          'Famous swan-neck flask experiments showed sterile broth stayed germ-free indefinitely until airborne dust entered the flask neck.',
          "Published 'Germ Theory' in 1861, proving micro-organisms in air cause decay, directly disproving spontaneous generation and miasma.",
        ],
        key_terms: ['Spontaneous Generation', 'Swan-Neck Flask'],
      },
      {
        num: 2,
        badge: 'MICROBE HUNTERS',
        title: '2. Robert Koch, Staining Dyes & Specific Pathogens (1876–1883)',
        prompt:
          'Explain how Robert Koch identified specific bacteria (anthrax, TB, cholera) using industrial chemical dyes and photography:',
        model_notes: [
          'Developed method of growing pure bacterial cultures on solid agar jelly in flat glass Petri dishes.',
          'Used synthetic industrial chemical dyes (methyl violet, methylene blue) to stain transparent bacteria so they stood out clearly under microscopes.',
          'Used photomicrography to capture unarguable visual proof; identified specific pathogens: anthrax (1876), tuberculosis (1882), and cholera (1883).',
        ],
        key_terms: ['Agar Jelly Plates', 'Specific Pathogens'],
      },
      {
        num: 3,
        badge: 'BRITISH SCEPTICISM',
        title: '3. The 20-Year Delay in British Medical Acceptance',
        prompt:
          'Explain why prominent British doctors like Dr Charlton Bastian fiercely resisted Germ Theory until the late 1880s:',
        model_notes: [
          'Bastian (Professor of Medicine at University College Hospital) insisted microbes were generated spontaneously by diseased bodily tissue.',
          'British physicians argued that germs were the *result* or symptom of illness, not its primary *cause*.',
          'Sanitarians like Florence Nightingale resisted Germ Theory because cleaning foul smells (miasma) had already dramatically lowered death rates.',
        ],
        key_terms: ['Dr Charlton Bastian', 'British Scepticism'],
      },
    ],
  },
  lesson_3_2: {
    instruction:
      "As you read the chapter, complete these 3 structured enquiry blocks to examine Jenner's smallpox vaccine and state vaccination mandates:",
    blocks: [
      {
        num: 1,
        badge: 'INNOVATION',
        title: '1. Smallpox Inoculation vs. Jenner’s Cowpox Discovery (1796)',
        prompt:
          "Contrast the dangerous practice of smallpox inoculation with Jenner's cowpox vaccination of James Phipps:",
        model_notes: [
          'Inoculation (popularised by Lady Mary Wortley Montagu) scratched live smallpox scabs into skin; risked deadly infection and sparked fresh epidemics.',
          'Jenner observed Gloucestershire milkmaids never caught smallpox after contracting mild, non-lethal cowpox from cow udders.',
          'In 1796, Jenner inoculated 8-year-old James Phipps with cowpox pus, then exposed him to smallpox; Phipps remained completely healthy.',
        ],
        key_terms: ['Smallpox Inoculation', 'Cowpox Immunity'],
      },
      {
        num: 2,
        badge: 'OPPOSITION',
        title: '2. Anti-Vaccination Backlash & Professional Hostility',
        prompt:
          'Explain the moral, religious, financial, and scientific arguments used by critics against Jenner’s vaccine:',
        model_notes: [
          "Religious critics argued injecting animal matter into God's human creation was unchristian and monstrous (Gillray cartoons showed cow horns sprouting).",
          'Professional inoculators fiercely opposed vaccination because it threatened their highly lucrative private inoculation businesses.',
          "The prestigious Royal Society initially rejected Jenner's paper because he could not explain *why* or *how* cowpox conferred immunity.",
        ],
        key_terms: ['James Phipps', 'Anti-Vaccine Opposition'],
      },
      {
        num: 3,
        badge: 'STATE INTERVENTION',
        title: '3. The Compulsory Vaccination Act (1853) & Public Health Mandate',
        prompt:
          'Trace how the British government shifted from laissez-faire to compulsory vaccination by 1853:',
        model_notes: [
          'Parliament granted Jenner £10,000 (1802) and £20,000 (1807) to establish the National Vaccine Establishment.',
          'In 1840, Parliament banned dangerous inoculation and provided free infant vaccination paid by poor-law unions.',
          'The Compulsory Vaccination Act of 1853 made smallpox vaccination mandatory for all newborn infants, marking a historic public health mandate.',
        ],
        key_terms: ['National Vaccine Establishment', '1853 Compulsory Vaccination Act'],
      },
    ],
  },
  lesson_3_3: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate the transformation of hospitals and nursing in the 19th century:',
    blocks: [
      {
        num: 1,
        badge: 'CRIMEAN WAR',
        title: '1. Florence Nightingale & The Sanitary Revolution at Scutari (1854)',
        prompt:
          'Detail Nightingale’s sanitary reforms at Scutari Barrack Hospital and their dramatic impact on soldier mortality:',
        model_notes: [
          'Found Scutari hospital built over a blocked sewer cesspool; unwashed soldiers lay in rotting uniforms covered in lice, gangrene, and cholera.',
          'Enforced strict hygiene: cleaned drains, scrubbed floors, set up boiling laundries, provided clean bedding and fresh, nutritious meals.',
          'The death rate plummeted from 42% to 2% within six months, demonstrating that hospital filth was killing more soldiers than Russian bullets.',
        ],
        key_terms: ['Scutari Barrack Hospital', 'Sanitary Hygiene'],
      },
      {
        num: 2,
        badge: 'FRONTLINE BRAVERY',
        title: '2. Mary Seacole & The British Hotel at Balaclava',
        prompt:
          'Explain Mary Seacole’s independent nursing work, herbal remedies, and battlefield rescue during the Crimean War:',
        model_notes: [
          "Jamaican-born doctress; rejected by the War Office and Nightingale's team due to racial prejudice; funded her own passage to the Crimea.",
          "Built the 'British Hotel' near Balaclava, offering warm food, convalescent shelter, and traditional herbal remedies for cholera and dysentery.",
          'Treated wounded soldiers directly on active battlefields under heavy fire, earning legendary affection from common infantrymen.',
        ],
        key_terms: ['Mary Seacole', 'British Hotel Balaclava'],
      },
      {
        num: 3,
        badge: 'MODERN HOSPITAL',
        title: '3. The Pavilion Plan & Professional Nursing Training (1859–1863)',
        prompt:
          'Explain how Nightingale transformed civilian hospital design and professionalized nursing in Britain:',
        model_notes: [
          "Published 'Notes on Nursing' (1859) and 'Notes on Hospitals' (1863), establishing the 'Pavilion Plan' (isolated wards, high ceilings, large windows).",
          "Founded the Nightingale Training School at St Thomas' Hospital (1860), transforming nursing into an educated, respected, disciplined profession.",
          'Hospitals evolved from dangerous death-houses for the destitute into clean, scientific institutions for medical recovery.',
        ],
        key_terms: ['Pavilion Plan', 'Notes on Nursing (1859)'],
      },
    ],
  },
  lesson_3_4: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to analyze how pain, shock, and sepsis were conquered in surgery:',
    blocks: [
      {
        num: 1,
        badge: 'ANAESTHETICS',
        title: '1. James Simpson & The Discovery of Chloroform (1847)',
        prompt:
          'Explain how James Simpson discovered chloroform, the Black Period of surgery, and John Snow’s inhaler:',
        model_notes: [
          'Simpson tested chemical vapours with friends (1847); discovered chloroform was faster, more potent, and less irritating than ether.',
          "Led to the 'Black Period' of surgery: painless patients allowed surgeons to operate deeper and slower, increasing fatal blood loss and infection.",
          "Opposition (religious objections to painless childbirth) collapsed after Queen Victoria used chloroform for Prince Leopold's birth (1853), administered by John Snow's inhaler.",
        ],
        key_terms: ['James Simpson', 'Chloroform (1847)'],
      },
      {
        num: 2,
        badge: 'ANTISEPTICS',
        title: '2. Joseph Lister & The Carbolic Acid Spray (1865)',
        prompt:
          "Explain how Joseph Lister applied Pasteur's Germ Theory using carbolic acid spray, slashing surgical mortality:",
        model_notes: [
          "Read Pasteur's Germ Theory; realized compound fracture gangrene was caused by airborne micro-organisms entering exposed wounds.",
          'Used carbolic acid (used to treat foul town sewage) to sterilize dressings, surgical instruments, and wounds (1865).',
          'Invented the carbolic spray machine to saturate operating theatre air; reduced his surgical ward mortality from 46% to 15%.',
        ],
        key_terms: ['Joseph Lister', 'Carbolic Acid Spray (1865)'],
      },
      {
        num: 3,
        badge: 'ASEPTIC REVOLUTION',
        title: '3. The Transition from Antiseptic to Modern Aseptic Surgery (1890s)',
        prompt:
          "Explain the shift from Lister's caustic carbolic spray to complete aseptic sterilization in operating theatres:",
        model_notes: [
          "Carbolic acid was corrosive: cracked surgeons' hands, irritated lung tissue, and slowed natural wound healing.",
          'Shifted from antiseptic (killing germs in wounds) to aseptic (preventing any germs from entering the theatre in the first place).',
          'By the 1890s, theatres used steam autoclaves to sterilize metal instruments, wore sterile rubber gloves (Halsted), white surgical gowns, and face masks.',
        ],
        key_terms: ['Aseptic Surgery', 'Steam Autoclave'],
      },
    ],
  },
  lesson_3_5: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to examine John Snow, cholera, and the 1875 Public Health Act:',
    blocks: [
      {
        num: 1,
        badge: 'EPIDEMIOLOGY',
        title: '1. John Snow & The Broad Street Pump Investigation (1854)',
        prompt:
          'Explain how John Snow proved cholera was waterborne using his spot map and the removal of the Broad Street pump handle:',
        model_notes: [
          "Soho cholera outbreak killed over 500 people in 10 days; Snow plotted each fatality on a detailed street map ('spot map').",
          'Showed deaths clustered precisely around the Broad Street water pump; nearby brewery workers drank beer and suffered zero fatalities.',
          'Removed pump handle, halting the epidemic; proved a cracked underground cesspool was leaking sewage directly into drinking water.',
        ],
        key_terms: ['John Snow', 'Broad Street Pump (1854)'],
      },
      {
        num: 2,
        badge: 'INFRASTRUCTURE',
        title: '2. The Great Stink (1858) & Bazalgette’s London Sewer Network',
        prompt:
          'Explain how the Great Stink of 1858 forced Parliament to fund Joseph Bazalgette’s revolutionary sewer network:',
        model_notes: [
          "Hot summer of 1858 dried the River Thames, creating an unbearable stench ('The Great Stink') that forced MPs to abandon Parliament.",
          'Parliament immediately passed emergency legislation funding civil engineer Joseph Bazalgette to build a comprehensive sewer system.',
          "Constructed 82 miles of underground intercepting brick sewers and 1,100 miles of street drains, carrying London's sewage east away from drinking intakes.",
        ],
        key_terms: ['Great Stink (1858)', 'Bazalgette Sewer System'],
      },
      {
        num: 3,
        badge: 'LEGISLATION',
        title: '3. From Laissez-Faire to State Mandate: The 1875 Public Health Act',
        prompt:
          'Contrast the voluntary 1848 Public Health Act with the compulsory powers enforced under the landmark 1875 Act:',
        model_notes: [
          'The 1848 Act was permissive (voluntary); local town councils could choose to ignore health boards to avoid raising local taxes.',
          'The 1875 Public Health Act made public health compulsory: councils were forced to appoint Medical Officers of Health and sanitary inspectors.',
          'Mandated clean piped water, proper sewage disposal, street paving, street lighting, and food inspection, ending the era of government laissez-faire.',
        ],
        key_terms: ['Laissez-Faire', '1875 Public Health Act'],
      },
    ],
  },
  lesson_4_1: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to analyse genetics, DNA, and the Human Genome Project:',
    blocks: [
      {
        num: 1,
        badge: 'DISCOVERY OF DNA',
        title: '1. Crick, Watson, Franklin & The Double Helix (1953)',
        prompt:
          'Explain how Rosalind Franklin’s Photo 51 enabled Francis Crick and James Watson to decode the DNA double helix:',
        model_notes: [
          "Franklin produced Photo 51 using X-ray crystallography at King's College London, revealing the distinct helical diffraction pattern.",
          'Crick and Watson at Cambridge used her uncredited data to construct the 3D double-helix molecular model of DNA in 1953.',
          'Proved DNA carries the universal genetic code instructing cell growth and transmitting hereditary characteristics across generations.',
        ],
        key_terms: ['Double Helix (1953)', 'Rosalind Franklin Crystallography'],
      },
      {
        num: 2,
        badge: 'GENOME MAPPING',
        title: '2. The Human Genome Project (1990–2003)',
        prompt:
          'Explain how international scientists mapped all 3 billion chemical base pairs in human DNA and its diagnostic impact:',
        model_notes: [
          '13-year international scientific consortium led by public scientists mapped every gene in human DNA (completed 2003).',
          "Enabled identification of specific faulty genes responsible for hereditary diseases (cystic fibrosis, Huntington's, BRCA breast cancer).",
          "Paved the way for personalized medicine, carrier screening, and pharmacogenomics (tailoring drug therapies to a patient's genetic profile).",
        ],
        key_terms: ['Human Genome Project', 'Gene Mapping'],
      },
      {
        num: 3,
        badge: 'CLINICAL GAP',
        title: '3. The Diagnostic Revolution vs. The Treatment Gap',
        prompt:
          'Evaluate why decoding DNA has revolutionized disease diagnosis, yet genetic cures remain difficult to achieve:',
        model_notes: [
          'Doctors can accurately predict genetic disease susceptibility and perform preventative surgeries before symptoms appear.',
          'However, editing human DNA (gene therapy or CRISPR) inside millions of living body cells remains technically difficult and ethically controversial.',
          'Knowing the genetic cause of a disease does not immediately translate into an affordable, safe, or permanent clinical cure.',
        ],
        key_terms: ['Genetic Screening', 'Gene Therapy'],
      },
    ],
  },
  lesson_4_2: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to examine lifestyle diseases and modern diagnostic technology:',
    blocks: [
      {
        num: 1,
        badge: 'LIFESTYLE KILLERS',
        title: '1. The Epidemiological Shift from Infection to Lifestyle Illness',
        prompt:
          'Explain how 20th-century medicine shifted focus from infectious diseases to lifestyle-driven chronic conditions:',
        model_notes: [
          'Antibiotics and vaccinations largely conquered lethal bacterial and viral epidemics like cholera, diphtheria, and tuberculosis.',
          'Average life expectancy climbed past 80, leading to the rise of chronic non-communicable killers: heart disease, stroke, diabetes, and cancers.',
          'Modern illnesses are heavily influenced by voluntary lifestyle factors: cigarette smoking, alcohol abuse, lack of exercise, and processed high-sugar diets.',
        ],
        key_terms: ['Non-Communicable Diseases', 'Lifestyle Factors'],
      },
      {
        num: 2,
        badge: 'HIGH-TECH DIAGNOSIS',
        title: '2. The Technological Revolution in Non-Invasive Diagnosis',
        prompt:
          'Detail how modern medical technology (X-rays, blood tests, CT scans, MRI, endoscopes) transformed diagnosis:',
        model_notes: [
          'X-rays (1895 Roentgen) allowed non-invasive imaging of skeletal trauma and chest infections.',
          'CT scans (1970s Hounsfield) and MRI scans (1970s Mansfield) produced detailed cross-sectional 3D images of soft organs and brain tissue.',
          'Endoscopes allowed optical cameras inside the digestive tract; mass blood chemistry testing detected early organ failure and hormone imbalances.',
        ],
        key_terms: ['CT and MRI Scans', 'Endoscopy'],
      },
      {
        num: 3,
        badge: 'PUBLIC HEALTH',
        title: '3. Government Intervention & Nudge Campaigns in Modern Britain',
        prompt:
          'Explain how modern British governments use legislation and education campaigns to prevent lifestyle diseases:',
        model_notes: [
          'Passed aggressive public health legislation: 2007 indoor public smoking ban; compulsory car seatbelt laws; 2018 Soft Drinks Industry Levy (Sugar Tax).',
          "Public education campaigns: 'Change4Life', 'Stoptober', and '5 A Day' fruit and vegetable nutritional guidance.",
          'Shifted from reactive treatment to proactive prevention, reducing long-term financial pressure on the National Health Service.',
        ],
        key_terms: ['Public Health Legislation', 'Preventative Campaigns'],
      },
    ],
  },
  lesson_4_3: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to trace magic bullets, synthetic drugs, and the foundation of the NHS:',
    blocks: [
      {
        num: 1,
        badge: 'MAGIC BULLETS',
        title: '1. Synthetic Chemical Drugs: Salvarsan 606 & Prontosil',
        prompt:
          'Explain how Paul Ehrlich and Gerhard Domagk created synthetic chemicals designed to target specific internal microbes:',
        model_notes: [
          "Paul Ehrlich coined the term 'magic bullet': a chemical compound that would destroy specific microbes inside the body without harming human tissue.",
          'Tested hundreds of arsenic compounds, discovering Salvarsan 606 (1909), the first effective cure for the deadly venereal disease syphilis.',
          'Gerhard Domagk discovered Prontosil (1932), a red leather dye sulfonamide that killed streptococcus bacteria, saving his own daughter from amputation.',
        ],
        key_terms: ['Salvarsan 606', 'Prontosil Sulphonamide (1932)'],
      },
      {
        num: 2,
        badge: 'WELFARE STATE',
        title: '2. The Beveridge Report (1942) & Aneurin Bevan (1948)',
        prompt:
          'Trace how William Beveridge’s Five Giants inspired Aneurin Bevan to establish the National Health Service in 1948:',
        model_notes: [
          "1942 Beveridge Report proposed slaying the 'Five Giant Evils' (Want, Disease, Ignorance, Squalor, Idleness) through a comprehensive welfare state.",
          'Post-war Labour Health Minister Aneurin Bevan spearheaded the creation of the NHS, launched on 5 July 1948 at Park Hospital, Manchester.',
          'Established healthcare free at the point of delivery, funded through central taxation, ensuring medical treatment was based on clinical need, not wealth.',
        ],
        key_terms: ['Beveridge Report (1942)', 'Free at Point of Delivery'],
      },
      {
        num: 3,
        badge: 'POLITICAL STRUGGLE',
        title: "3. Overcoming BMA Opposition: 'Stuffing Their Mouths with Gold'",
        prompt:
          'Explain why the British Medical Association opposed the NHS and how Bevan persuaded doctors to cooperate:',
        model_notes: [
          'The BMA fiercely resisted the NHS; doctors feared becoming salaried state civil servants and losing lucrative private fees.',
          "In early 1948, over 90% of doctors voted against joining Bevan's proposed National Health Service.",
          "Bevan compromised by allowing hospital consultants to retain private fee-paying patients alongside NHS duties ('stuffed their mouths with gold').",
        ],
        key_terms: ['BMA Resistance', 'National Health Service (1948)'],
      },
    ],
  },
  lesson_4_4: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to examine the discovery, purification, and mass production of penicillin:',
    blocks: [
      {
        num: 1,
        badge: 'CHANCE DISCOVERY',
        title: '1. Alexander Fleming & Penicillium Notatum (1928)',
        prompt:
          'Explain how chance, observation, and lab conditions led Alexander Fleming to discover penicillin mould in 1928:',
        model_notes: [
          'Returned from vacation to find an open Petri dish of staphylococci contaminated by wind-blown Penicillium notatum mould spores.',
          'Observed a clear bacterial-free halo around the mould where the bacteria had dissolved and been destroyed.',
          'Published his findings in 1929; however, Fleming was a bacteriologist, lacked chemical expertise to purify the unstable mould, and abandoned it.',
        ],
        key_terms: ['Alexander Fleming', 'Penicillium Notatum (1928)'],
      },
      {
        num: 2,
        badge: 'PURIFICATION',
        title: '2. Florey, Chain & The Oxford University Laboratory (1938–1941)',
        prompt:
          'Explain how Howard Florey and Ernst Chain purified penicillin and proved its effectiveness on mice and Albert Alexander:',
        model_notes: [
          'Assembled an Oxford biochemistry team; grew mould in milk bottles and bedpans; used freeze-drying to isolate pure penicillin powder.',
          'Tested on eight mice infected with deadly streptococcus (1940): the four treated with penicillin survived; the untreated four died.',
          'Treated policeman Albert Alexander (1941); his fatal facial infection dramatically cleared until the tiny drug supply ran out and he died.',
        ],
        key_terms: ['Florey and Chain', 'Penicillin Purification'],
      },
      {
        num: 3,
        badge: 'WAR PRODUCTION',
        title: '3. US Industrial Mass Production (1941–1944) & Modern Resistance',
        prompt:
          'Explain how US industrial funding enabled D-Day mass supply, and evaluate the modern danger of antibiotic resistance:',
        model_notes: [
          'British factories were bombed in WWII; Florey travelled to the USA (1941) to persuade pharmaceutical companies and the War Production Board.',
          'US factories used deep fermentation vats with corn-steep liquor, producing 2.3 million doses in time for the D-Day landings in June 1944.',
          "Modern crisis: widespread over-prescription and livestock feed misuse has caused bacteria to mutate into drug-resistant 'superbugs' (MRSA).",
        ],
        key_terms: ['Deep Fermentation Vats', 'D-Day Antibiotic Supply'],
      },
    ],
  },
  lesson_4_5: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate public health action against the modern epidemic of lung cancer:',
    blocks: [
      {
        num: 1,
        badge: 'EPIDEMIOLOGY',
        title: '1. Richard Doll, Austin Bradford Hill & The Smoking Link (1950)',
        prompt:
          'Explain how Doll and Hill’s statistical study proved tobacco smoking was the primary cause of lung cancer:',
        model_notes: [
          'Lung cancer deaths rose dramatically across Britain from 1920 to 1950, previously blamed on motor exhaust fumes and tarmac dust.',
          'Doll and Hill interviewed 1,465 hospital patients and monitored 40,000 British doctors over decades in a rigorous statistical study.',
          'Proved unarguably that heavy cigarette smokers were up to 50 times more likely to develop lung cancer than non-smokers.',
        ],
        key_terms: ['Richard Doll (1950)', 'Epidemiological Study'],
      },
      {
        num: 2,
        badge: 'GOVERNMENT ACTION',
        title: '2. Government Action: Banning Advertisements to Plain Packaging',
        prompt:
          'Detail the escalating legal, fiscal, and advertising restrictions British governments enforced to reduce smoking:',
        model_notes: [
          'Banned cigarette television advertising in 1965; added mandatory health warnings to cigarette packets starting in 1971.',
          'Passed the Health Act 2006 banning smoking in all enclosed workplaces, pubs, and restaurants from July 2007; raised legal buying age to 18.',
          'Enforced standardised plain packaging in 2016 featuring graphic diseased-lung imagery and removed tobacco displays from retail shops.',
        ],
        key_terms: ['2007 Public Smoking Ban', 'Plain Packaging (2016)'],
      },
      {
        num: 3,
        badge: 'TREATMENT REALITY',
        title: '3. Modern Diagnostic Technology vs. Poor 5-Year Survival Rates',
        prompt:
          'Explain how modern medicine detects and treats lung cancer, and why mortality remains stubbornly high:',
        model_notes: [
          'Diagnostic tools include high-resolution spiral CT scans, PET scans, bronchoscopy, and genetic tumor profiling.',
          'Treatments combine surgical lobectomy (removing lung lobes), targeted beam radiotherapy, and biological immunotherapy drugs.',
          'However, early lung cancer is painless and symptom-free; 70-80% of patients are diagnosed too late (Stage 3 or 4), keeping 5-year survival under 15%.',
        ],
        key_terms: ['High-Resolution CT Scans', 'Targeted Radiotherapy'],
      },
    ],
  },
  lesson_5_1: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to analyse the strategic geography and battle context of the Western Front:',
    blocks: [
      {
        num: 1,
        badge: 'STRATEGY',
        title: '1. Strategic Geography: The Ypres Salient & Channel Ports',
        prompt:
          'Explain the strategic importance of the Ypres Salient and why the British Army fought desperately to defend it:',
        model_notes: [
          'Defended vital English Channel supply ports (Calais, Boulogne, Dunkirk), keeping British reinforcement and hospital supply lines open.',
          'The Salient projected dangerously into German lines; German forces held the surrounding high ground (Passchendaele, Messines Ridge) with clear artillery visibility.',
          'The waterlogged Flanders clay soil and broken drainage canals created persistent, deep liquid mud that drowned men, horses, and equipment.',
        ],
        key_terms: ['Ypres Salient', 'Channel Ports Defence'],
      },
      {
        num: 2,
        badge: 'MAJOR BATTLES',
        title: '2. Key Medical Challenges: Ypres, The Somme, Arras & Cambrai',
        prompt:
          'Compare the medical catastrophes at the Somme (July 1916: 57,000 casualties day 1), Arras (quarries), and Cambrai (tanks):',
        model_notes: [
          '1st July 1916 (Somme): 57,000 casualties on day one completely overwhelmed frontline Regimental Aid Posts and evacuation routes.',
          "Arras (1917): British engineers excavated chalk quarries into an underground hospital city (Thompson's Cave) holding 700 hospital beds safely under shellfire.",
          'Cambrai (1917): First mass tank breakthrough and first clinical test of stored refrigerated blood transfusions by Oswald Robertson.',
        ],
        key_terms: ['Battle of the Somme (1916)', 'Thompson’s Cave Arras'],
      },
      {
        num: 3,
        badge: 'TRENCH LAYOUT',
        title: '3. Trench System Layout & Evacuation Obstacles',
        prompt:
          'Describe the physical layout of the trench system and why its design hindered stretcher-bearer evacuation:',
        model_notes: [
          'Built in parallel rows: Frontline fire trench, Support trench (80 yards back), and Reserve trench (several hundred yards back).',
          'Connected by zig-zag communication trenches designed to prevent shrapnel and gunfire blasting straight down the line.',
          'Zig-zag right angles made carrying rigid 6-foot stretchers round narrow, muddy corners excruciatingly slow, painful, and exhausting.',
        ],
        key_terms: ['Frontline and Support Trenches', 'Communication Trenches'],
      },
    ],
  },
  lesson_5_2: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to examine the medical challenges of the trench environment:',
    blocks: [
      {
        num: 1,
        badge: 'TRENCH FOOT',
        title: '1. Trench Foot: Causes, Gangrene & Whale Oil Prevention',
        prompt:
          'Explain the causes, physical consequences, and preventive measures enforced for Trench Foot:',
        model_notes: [
          'Caused by standing for days in cold, waterlogged mud; constricted capillary circulation, leading to severe numbness, swelling, and tissue death (gangrene).',
          'Required surgical amputation if gangrene took hold, permanently incapacitating thousands of combat troops.',
          "Prevented by rubbing whale oil on feet, changing dry socks 2-3 times daily, installing wooden duckboards, and enforcing the mandatory 'buddy system'.",
        ],
        key_terms: ['Trench Foot', 'Whale Oil Inspection'],
      },
      {
        num: 2,
        badge: 'VERMIN & FEVER',
        title: '2. Trench Fever: Body Lice & Divisional Disinfection Baths',
        prompt:
          'Explain how body lice spread Trench Fever and the disinfection measures used at divisional bathhouses:',
        model_notes: [
          'Caused by micro-organisms living in body lice feces, which soldiers rubbed into bite wounds while scratching itchy uniform seams.',
          'Symptoms included agonizing pyrexia (fever), violent shivering, severe headaches, and deep shooting pain in the shins, lasting for weeks.',
          'Combated by setting up mobile divisional bathhouses, washing uniforms in high-temperature steam vans, and burning lice eggs from seams with hot irons.',
        ],
        key_terms: ['Trench Fever Lice', 'Divisional Bathhouses'],
      },
      {
        num: 3,
        badge: 'SHELL SHOCK',
        title: '3. Shell Shock (NYDN) vs. Military Discipline',
        prompt:
          'Explain the symptoms of Shell Shock and the conflicting medical versus disciplinary reactions of the British Army:',
        model_notes: [
          'Caused by relentless artillery concussions, sleep deprivation, and psychological terror; symptoms included tics, tremors, mutism, and mental collapse.',
          "Over 80,000 British soldiers suffered; initial military diagnosis was 'NYDN' (Not Yet Diagnosed, Nervous) and often dismissed as cowardice.",
          '306 soldiers were executed by firing squad for desertion; later in the war, specialist psychiatric hospitals (e.g. Craiglockhart) provided rest therapies.',
        ],
        key_terms: ['Chlorine and Phosgene', 'Mustard Gas (1917)'],
      },
    ],
  },
  lesson_5_3: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to analyse battlefield trauma from artillery, infection, and poison gas:',
    blocks: [
      {
        num: 1,
        badge: 'ARTILLERY TRAUMA',
        title: '1. High Explosive Shrapnel & The Brodie Steel Helmet (1915)',
        prompt:
          'Explain why explosive shells caused 58% of all Western Front wounds, and how the Brodie helmet reduced fatalities:',
        model_notes: [
          'High explosive shells threw thousands of jagged steel fragments and balls at supersonic speeds, smashing bone and tearing flesh.',
          'Early soldiers wore cloth caps; steel Brodie helmets introduced in late 1915 featured a wide protective rim, reducing fatal head wounds by 80%.',
          'Artillery blasts caused severe compound fractures where broken bones pierced skin, triggering immediate fatal hemorrhage and shock.',
        ],
        key_terms: ['High Explosive Shrapnel', 'Brodie Steel Helmet'],
      },
      {
        num: 2,
        badge: 'GAS GANGRENE',
        title: '2. Manured Belgian Soil, Gas Gangrene & Tetanus',
        prompt:
          'Explain why rich agricultural soil produced virulent anaerobic infections, and how anti-tetanus serum helped:',
        model_notes: [
          'Flanders and Somme farmland was heavily fertilised with animal manure for centuries, saturating the soil with deadly anaerobic bacteria.',
          'Deep shrapnel wounds drove mud and filthy uniform cloth into airless muscle tissue, incubating deadly tetanus and gas gangrene.',
          'Gas gangrene produced gas bubbles in rotting flesh and killed within hours; routine anti-tetanus serum injections at the RAP drastically reduced lockjaw deaths.',
        ],
        key_terms: ['Gas Gangrene', 'Anti-Tetanus Serum'],
      },
      {
        num: 3,
        badge: 'POISON GAS',
        title: '3. Poison Gas: Chlorine, Phosgene & Mustard Gas (1915–1917)',
        prompt:
          'Contrast the effects of chlorine, phosgene, and mustard gas, and how British respirators evolved:',
        model_notes: [
          'Chlorine (1915): green cloud stripping bronchial lining, causing suffocation; phosgene: invisible, delayed killer; Mustard gas (1917): blistered skin, blinded, and rotted lungs.',
          'Gas masks evolved rapidly: urine-soaked handkerchiefs -> Hypo helmets soaked in chemicals -> British Small Box Respirator (1916) with charcoal filter.',
          'Gas produced psychological terror and clogged evacuation chains, though it caused less than 5% of total war fatalities.',
        ],
        key_terms: ['Chlorine and Phosgene', 'Mustard Gas'],
      },
    ],
  },
  lesson_5_4: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to examine the Chain of Evacuation from frontline to base:',
    blocks: [
      {
        num: 1,
        badge: 'FRONTLINE RESCUE',
        title: '1. Stretcher Bearers & The Regimental Aid Post (RAP)',
        prompt:
          'Describe the dangerous role of stretcher-bearers and the immediate emergency first-aid provided at the RAP:',
        model_notes: [
          '16 stretcher-bearers per battalion worked in pairs of four to haul heavy 6-foot stretchers across deep mud and shell-holes under heavy fire.',
          'The Regimental Aid Post was located within 200m of the frontline in a dugout, cellar, or trench communication corner.',
          'The Regimental Medical Officer (RMO) bandaged wounds, applied splints, administered anti-tetanus injections, and sorted men for rear evacuation.',
        ],
        key_terms: ['Regimental Aid Post (RAP)', 'Stretcher Bearers'],
      },
      {
        num: 2,
        badge: 'TRIAGE & CCS',
        title: '2. Advanced Dressing Stations & Casualty Clearing Station (CCS) Triage',
        prompt:
          'Explain the triage system at Casualty Clearing Stations and why surgical capacity shifted closer to the frontline:',
        model_notes: [
          'Field Ambulances ran ADS and MDS 1-2 miles back; motor ambulances transported severe cases to Casualty Clearing Stations (7-12 miles back near railheads).',
          'CCS operated strict surgical triage: 1) Walking wounded, 2) In urgent need of lifesaving surgery, 3) Hopeless cases (given comfort care).',
          "CCS performed urgent surgeries (amputations, debridement) because operating within the first 12 hours ('golden window') stopped fatal gas gangrene.",
        ],
        key_terms: ['Casualty Clearing Station (CCS)', 'Surgical Triage'],
      },
      {
        num: 3,
        badge: 'BASE REAR',
        title: '3. Base Hospitals, Ambulance Trains & The FANY Ambulance Drivers',
        prompt:
          'Trace the final evacuation stages: Base Hospitals, canal barges, ambulance trains, and FANY drivers:',
        model_notes: [
          'Large military Base Hospitals located on French coast (Boulogne, Étaples); patients evacuated via dedicated hospital trains and smooth canal barges.',
          'First Aid Nursing Yeomanry (FANY) were volunteer women who drove motor ambulances, mobile soup kitchens, and canteen vans in hazardous combat zones.',
          "Soldiers with disabling injuries requiring months of rehabilitation were shipped across the Channel on hospital ships for treatment in 'Blighty'.",
        ],
        key_terms: ['Base Hospitals', 'FANY Ambulance Drivers'],
      },
    ],
  },
  lesson_5_5: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate surgical innovations on the Western Front:',
    blocks: [
      {
        num: 1,
        badge: 'THOMAS SPLINT',
        title: '1. Hugh Owen Thomas & The Thomas Splint (1915)',
        prompt:
          'Explain how the Thomas Splint reduced fractured femur mortality from 80% to 20% in the British Army:',
        model_notes: [
          'Femur fractures caused broken bone ends to saw through muscle and femoral arteries during bumpy carriage transit, causing fatal shock and hemorrhage.',
          "Robert Jones introduced his uncle Hugh Owen Thomas's splint to the Western Front in December 1915.",
          'The rigid metal traction frame locked the leg firmly in tension, reducing compound femur fracture death rates from 80% down to 20%.',
        ],
        key_terms: ['Thomas Splint (1915)', 'Compound Femur Fractures'],
      },
      {
        num: 2,
        badge: 'MOBILE RADIOLOGY',
        title: '2. Mobile X-Rays & Locating Deep Shrapnel',
        prompt:
          'Explain how mobile X-ray vans and hospital radiographic units enabled surgeons to locate buried shrapnel:',
        model_notes: [
          'Base hospitals and larger CCS units operated stationary radiographic X-ray machines.',
          'Six mobile X-ray vans operated across the British sector, moving directly between CCS stations during major military offensives.',
          'Located exact depths and angles of jagged shrapnel fragments and bullets inside muscle before surgery, preventing destructive exploratory probing.',
        ],
        key_terms: ['Mobile X-Ray Vans', 'Radiographic Shrapnel Location'],
      },
      {
        num: 3,
        badge: 'WOUND SURGERY',
        title: '3. Wound Debridement & The Carrel-Dakin Continuous Irrigation Method',
        prompt:
          'Explain why carbolic acid failed on deep wounds and how debridement and Carrel-Dakin irrigation solved infection:',
        model_notes: [
          "Lister's carbolic acid failed because it burnt delicate tissue and could not penetrate deep into anaerobic shrapnel cavities.",
          "Surgeons developed 'wound debridement' (wound excision): cutting away all dead, damaged, and contaminated tissue to starve bacteria.",
          'The Carrel-Dakin technique inserted rubber tubes into open wounds to continuously flush them with a mild, sterilizing sodium hypochlorite antiseptic solution.',
        ],
        key_terms: ['Wound Debridement', 'Carrel-Dakin Irrigation'],
      },
    ],
  },
  lesson_5_6: {
    instruction:
      'As you read the chapter, complete these 3 structured enquiry blocks to evaluate blood storage, brain surgery, and plastic reconstruction:',
    blocks: [
      {
        num: 1,
        badge: 'BLOOD BANKING',
        title: '1. Sodium Citrate, Glucose & The Cambrai Blood Bank (1917)',
        prompt:
          'Trace how Lewisohn, Rous, Turner, and Oswald Robertson created the first frontline blood bank at Cambrai:',
        model_notes: [
          'Direct person-to-person transfusion was slow and impractical under heavy shellfire.',
          'Richard Lewisohn (1915) added sodium citrate to prevent blood clotting; Francis Rous and James Turner (1916) added glucose, enabling refrigeration for 4 weeks.',
          "Canadian doctor Oswald Robertson established the world's first mobile blood depot at the Battle of Cambrai (1917), treating 20 casualties in advance.",
        ],
        key_terms: ['Sodium Citrate Anticoagulant', 'Cambrai Blood Depot (1917)'],
      },
      {
        num: 2,
        badge: 'BRAIN SURGERY',
        title: '2. Harvey Cushing & Neurosurgical Advances',
        prompt:
          'Explain how American surgeon Harvey Cushing revolutionized treatment of severe head and cranial wounds:',
        model_notes: [
          'Brain wounds carried enormous mortality (over 55%) due to pressure and infection from bone fragments.',
          'Harvey Cushing pioneered operating under local anaesthetic rather than general, preventing fatal brain swelling and intracranial pressure.',
          'Used delicate surgical magnets, electric cautery, and suction pumps to remove shrapnel and bone; reduced neurosurgical mortality to 28%.',
        ],
        key_terms: ['Harvey Cushing', 'Local Anaesthetic Brain Surgery'],
      },
      {
        num: 3,
        badge: 'PLASTIC SURGERY',
        title: '3. Harold Gillies & Facial Reconstruction at Queen’s Hospital, Sidcup',
        prompt:
          'Detail Harold Gillies’ pioneering plastic surgery techniques (pedicle skin tubes) for horrifically disfigured soldiers:',
        model_notes: [
          'High explosive shrapnel caused horrific facial mutilations, leaving surviving soldiers socially ostracised and stigmatised.',
          "New Zealand surgeon Harold Gillies established the Queen's Hospital in Sidcup, Kent (1917), the world's first specialized plastic surgery centre.",
          "Pioneered the 'tubed pedicle' skin-grafting technique: rolling living skin into a tube to maintain blood supply while grafting it onto damaged faces.",
        ],
        key_terms: ['Harold Gillies', 'Tubed Pedicle Skin Graft'],
      },
    ],
  },
};

// Patch units/edexcel_medicine/data.js
const targetFile = path.resolve(__dirname, '../units/edexcel_medicine/data.js');
let content = fs.readFileSync(targetFile, 'utf8');

// Loop over all 26 lesson keys and inject note_scaffold property if not present
let patchCount = 0;
for (const [lessonId, scaffold] of Object.entries(medicineScaffolds)) {
  const idRegex = new RegExp(`id:\\s*['"]${lessonId}['"]`);
  if (!idRegex.test(content)) {
    console.warn(`Warning: Could not find lesson ${lessonId} in units/edexcel_medicine/data.js`);
    continue;
  }

  // Check if note_scaffold already exists for this lesson
  // We match from this id to the next id or end
  const lessonMatch = content.match(
    new RegExp(`(id:\\s*['"]${lessonId}['"][\\s\\S]*?)(?=(?:id:\\s*['"]lesson_\\d+_\\d+['"]|\\Z))`),
  );
  if (lessonMatch) {
    const lessonChunk = lessonMatch[1];
    if (lessonChunk.includes('note_scaffold:')) {
      console.log(`Lesson ${lessonId} already has note_scaffold. Updating...`);
      // Replace existing note_scaffold
      const updatedChunk = lessonChunk.replace(
        /note_scaffold:\s*\{[\s\S]*?\n\s*\},/,
        `note_scaffold: ${JSON.stringify(scaffold, null, 6)},`,
      );
      content = content.replace(lessonChunk, updatedChunk);
      patchCount++;
    } else {
      // Insert note_scaffold right after id: '...'
      const scaffoldJson = JSON.stringify(scaffold, null, 6);
      const replacement = `id: '${lessonId}',\n      note_scaffold: ${scaffoldJson},`;
      content = content.replace(new RegExp(`id:\\s*['"]${lessonId}['"],?`), replacement);
      patchCount++;
    }
  }
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log(`🎉 Successfully injected note_scaffold into ${patchCount} lessons in ${targetFile}`);

// Also copy to public/units/edexcel_medicine/data.js to keep in 100% sync
const publicTargetFile = path.resolve(__dirname, '../public/units/edexcel_medicine/data.js');
fs.writeFileSync(publicTargetFile, content, 'utf8');
console.log(`🎉 Successfully synchronized ${publicTargetFile}`);
