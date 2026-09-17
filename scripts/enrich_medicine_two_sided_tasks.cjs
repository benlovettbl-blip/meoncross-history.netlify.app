const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
console.log('Loading edexcel_medicine data.js...');

let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// Load module
const tempExport = require(dataFilePath);
const unitData = tempExport.unitData;

if (!unitData || !unitData.lessons) {
  console.error('❌ Could not read unitData.lessons');
  process.exit(1);
}

// Map of updates
const lessons = unitData.lessons;

// -----------------------------------------------------------------------------
// KT2.1: Lesson 4 (lesson_2_1) - Renaissance Causes, Communication, Vesalius, Sydenham, Printing Press, Royal Society
// -----------------------------------------------------------------------------
const l4 = lessons.find((l) => l.id === 'lesson_2_1');
if (l4) {
  console.log('Enriching Lesson 4 (KT2.1)...');

  // Narrative Block 0: Medical Renaissance Begins
  // Narrative Block 1: Vesalius Key Individual
  // Narrative Block 2: Vesalius & Human Anatomy
  if (l4.narrative_blocks[2]) {
    l4.narrative_blocks[2].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'Andreas Vesalius and Human Anatomy',
        instruction:
          'GCSE Analytical Assessment: Evaluate both the revolutionary anatomical breakthroughs and the critical practical limitations of Vesalius.',
        advancement: {
          title: 'Breakthrough & Advancement (Change)',
          points: [
            'Overthrew 1,300 years of dogmatic medical tradition by performing human dissections himself in Padua rather than lecturing from Galen in an elevated chair.',
            "Corrected over 300 of Galen's anatomical errors in De Humani Corporis Fabrica (1543), proving Galen dissected animals (e.g. human lower jaw is 1 bone, breastbone has 3 parts, heart septum has no pores).",
            'Published extraordinarily detailed, mathematically accurate woodcut illustrations using the printing press, standardizing empirical anatomical training across European universities.',
          ],
          starter:
            'On the one hand, Andreas Vesalius made revolutionary breakthroughs in Renaissance medicine because...',
        },
        limitations: {
          title: 'Critical Limitations & Stagnation (Continuity)',
          points: [
            'Anatomical corrections did NOT cure a single disease, heal patients, or prevent deadly epidemics like the plague.',
            'Vesalius did not understand the causes of disease (microbes and infection remained completely unknown for another 300 years).',
            'Everyday medical treatments experienced zero change: bloodletting, purging, and the Theory of the Four Humours remained standard practice.',
            'Traditional physicians fiercely resisted his findings; some claimed the human body had deformed since Galen’s time rather than admit Galen was wrong.',
          ],
          starter:
            'However, the practical significance of Vesalius was severely limited because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating how far Andreas Vesalius transformed medicine in the Renaissance.',
        synthesis_connectives: [
          'Although...',
          'However, in practical terms...',
          'Consequently, while anatomy advanced...',
          'Overall, his impact was limited to...',
        ],
        model_answer:
          "On the one hand, Andreas Vesalius made revolutionary breakthroughs in Renaissance medicine by overthrowing 1,300 years of uncritical obedience to Galen. Working as Professor of Surgery at Padua University, Vesalius performed human dissections with his own hands rather than relying on uneducated barbers while lecturing from ancient texts. In his masterwork *De Humani Corporis Fabrica* (1543), he corrected over 300 of Galen's anatomical errors, proving conclusively that Galen had based his treatises on animal dissections (such as apes and dogs). For example, Vesalius proved that the human jawbone consists of a single bone rather than two, the sternum has three segments instead of seven, and the muscular septum of the heart is solid with no invisible pores. Furthermore, by mass-producing these findings with exceptionally precise woodcut illustrations via the printing press, Vesalius established empirical observation and human dissection as the bedrock of university medical training across Europe.<br><br>However, the practical significance of Vesalius was severely limited because his anatomical discoveries did not save a single patient's life or lead to any new medical treatments. Knowing the correct structure of muscles, bones, and organs did nothing to explain what caused disease, as microbes and bacteria were still completely unknown. Consequently, ordinary people and physicians continued to rely entirely on the Theory of the Four Humours and miasma to explain illness. Everyday medical treatments remained identical to the medieval period: patients were still bled, purged, and treated with herbal concoctions. In addition, conservative physicians—such as his former teacher Jacobus Sylvius in Paris—fiercely attacked his work, with some claiming human anatomy had simply deformed since classical antiquity. Therefore, while Vesalius sparked a revolution in anatomical science and scientific methodology, his direct impact on patient health and medical treatment was virtually non-existent during his lifetime.",
      },
    ];
  }

  // Narrative Block 3: Thomas Sydenham & Clinical Observation
  if (l4.narrative_blocks[3]) {
    l4.narrative_blocks[3].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'Thomas Sydenham and Bedside Diagnosis',
        instruction:
          'GCSE Analytical Assessment: Evaluate both the diagnostic advancements and the practical treatment limitations of Thomas Sydenham.',
        advancement: {
          title: 'Diagnostic Advancement (Change)',
          points: [
            "Rejected book-based theoretical medicine in favor of direct clinical bedside observation, earning the title 'the English Hippocrates'.",
            'Argued that diseases were distinct external entities (like botanical plant species) that could be classified by observing symptom clusters across different patients.',
            'Successfully distinguished scarlet fever from measles as two entirely separate diseases in Observationes Medicae (1676).',
            'Introduced rational practical treatments: prescribed cinchona bark (quinine) for malaria and advocated cool bedrooms and fresh air for smallpox rather than heavy sweating blankets.',
          ],
          starter:
            'On the one hand, Thomas Sydenham significantly advanced medical diagnosis because...',
        },
        limitations: {
          title: 'Critical Limitations & Continuity',
          points: [
            'Had zero understanding of microorganisms or germs; still believed disease was caused by atmospheric miasma (bad air) and environmental vapors.',
            'Could not explain the true biological cause of illnesses, meaning his classification was based purely on external symptoms rather than internal pathogens.',
            'Continued to rely on traditional humoral treatments for many illnesses, including bleeding and purging patients.',
            'Conservative physicians in London ridiculed his methods, refusing to abandon the traditional individualized Four Humours theory.',
          ],
          starter: 'However, the practical impact of Sydenham was limited because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating the extent to which Thomas Sydenham revolutionized medicine in the 17th century.',
        synthesis_connectives: [
          'Although Sydenham transformed diagnosis...',
          'However, regarding treatments...',
          'Consequently...',
          'Therefore, while his methodology pointed forward...',
        ],
        model_answer:
          "On the one hand, Thomas Sydenham significantly advanced medical diagnosis by pioneering a scientific, observational approach to patient care that rejected traditional book-based Galenism. Nicknamed the 'English Hippocrates', Sydenham insisted on sitting at the patient's bedside, taking meticulous clinical notes, and tracking the precise progression of symptoms over time. In his landmark 1676 publication *Observationes Medicae*, Sydenham argued that diseases were like plants or animals: separate, external species that could be systematically classified into distinct categories rather than being treated as unique, personal humoral imbalances. This enabled him to successfully identify scarlet fever and measles as two entirely different diseases for the first time in medical history. Furthermore, Sydenham popularized practical, effective therapies, such as using Peruvian bark (cinchona/quinine) to treat ague (malaria) and advocating cool bedrooms and plenty of fresh air for smallpox victims instead of suffocating them under heavy heating blankets.<br><br>However, the practical impact of Sydenham was severely constrained because he had no knowledge of germs and remained tethered to traditional 17th-century explanations of disease. Because microscopes were primitive and germ theory was two centuries away, Sydenham still believed that illnesses were triggered by poisonous atmospheric miasmas and toxic vapors in the air. Consequently, he was unable to discover actual cures for infectious diseases and frequently continued to prescribe traditional bloodletting and purging when other remedies failed. Furthermore, conservative physicians in London resisted his ideas, criticizing his refusal to base diagnoses on classical Galenic texts. Therefore, while Sydenham revolutionized the philosophy of clinical diagnosis and laid the foundations for modern epidemiology, his work resulted in very little immediate improvement in saving lives or curing illness during the Renaissance.",
      },
    ];
  }

  // Narrative Block 5: The Printing Press
  if (l4.narrative_blocks[5]) {
    l4.narrative_blocks[5].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'The Printing Press and Medical Communication',
        instruction:
          'GCSE Analytical Assessment: Evaluate both the revolutionary impact of the printing press and its historical limitations.',
        advancement: {
          title: 'Communication Revolution (Change)',
          points: [
            "Invented by Johannes Gutenberg (c1440), it mass-produced identical books rapidly and cheaply, ending the Catholic Church's scribal monopoly and censorship.",
            'Allowed medical discoveries—such as Vesalius’ De Fabrica (1543)—to be published and distributed simultaneously to university medical faculties across Europe.',
            'Eliminated copying errors common in hand-transcribed manuscripts and allowed precise anatomical woodcuts and diagrams to be reproduced identically.',
          ],
          starter:
            'On the one hand, the printing press transformed the communication of medical knowledge because...',
        },
        limitations: {
          title: 'Practical Limitations & Continuity',
          points: [
            'Books remained expensive luxury items that only wealthy physicians, aristocrats, and universities could afford.',
            'The vast majority of ordinary people across Europe were illiterate and unable to read Latin medical treatises.',
            'Printing houses also mass-produced traditional astrological almanacs, medieval herbals, and classical Galenic texts, entrenching old superstitions among the public.',
            'Spreading ideas did not automatically lead to better healthcare, as ordinary barber-surgeons and apothecaries had no formal university training.',
          ],
          starter:
            'However, the impact of the printing press on everyday healthcare was limited because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph explaining why the printing press changed medical communication while having limited immediate effect on public health.',
        synthesis_connectives: [
          'While the printing press enabled unprecedented spread of research...',
          'Nevertheless, for the wider population...',
          'This meant that...',
          'Ultimately...',
        ],
        model_answer:
          "On the one hand, the invention of the movable-type printing press by Johannes Gutenberg in c.1440 transformed the communication of medical ideas by shattering the Catholic Church's institutional monopoly over information. Prior to printing, books had to be laboriously copied by hand by monastic scribes, making them exceptionally rare, expensive, and strictly censored to prevent any challenge to religious or Galenic orthodoxy. The printing press allowed pioneering Renaissance texts, most notably Andreas Vesalius's *De Humani Corporis Fabrica* (1543), to be mass-produced and distributed simultaneously to universities across Europe before conservative authorities could suppress them. Crucially, the press allowed complex anatomical woodcuts to be reproduced identically with zero risk of the copying errors and artistic distortions that plagued medieval manuscripts, ensuring medical students across different countries could study identical, anatomically accurate diagrams.<br><br>However, the impact of the printing press on everyday healthcare was severely limited by social inequality and widespread illiteracy. Medical treatises were printed in Latin and cost substantial sums, restricting their readership strictly to an educated, wealthy minority of university scholars. The overwhelming majority of the European population remained completely illiterate and never read a scientific text. Furthermore, commercial printer-publishers rapidly discovered that printing popular astrological almanacs, medieval folk herbals, and traditional Galenic textbooks was far more profitable than printing avant-garde scientific works, which actually served to entrench traditional superstitious beliefs among the public. Consequently, while the printing press revolutionized elite scientific networking, it had almost zero direct effect on improving the medical treatments received by the average sick person in Renaissance Britain.",
      },
    ];
  }

  // Narrative Block 6: The Royal Society
  if (l4.narrative_blocks[6]) {
    l4.narrative_blocks[6].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'The Royal Society and Scientific Progress',
        instruction:
          'GCSE Analytical Assessment: Evaluate both the institutional breakthrough of the Royal Society and its practical limitations.',
        advancement: {
          title: 'Institutional Breakthrough (Change)',
          points: [
            'Founded in London in 1660 and granted a Royal Charter by King Charles II (1662), giving state prestige and funding to experimental science.',
            "Operated under the radical motto 'Nullius in Verba' ('Take nobody's word for it'), rejecting ancient classical authority in favor of hands-on experimental proof and demonstration.",
            "Published the world's first scientific journal, Philosophical Transactions (1665), establishing an international network for peer review and disseminating discoveries.",
            "Supported Antonie van Leeuwenhoek’s microscopic observations of 'animalcules' (bacteria) in 1676/1683 and Robert Hooke's Micrographia (1665).",
          ],
          starter:
            'On the one hand, the Royal Society accelerated medical and scientific progress because...',
        },
        limitations: {
          title: 'Practical Limitations & Continuity',
          points: [
            'Functioned as an exclusive gentleman’s debating club for wealthy amateurs; it ran no hospitals, dispensaries, or clinics to treat patients.',
            'Leeuwenhoek’s microscopic "animalcules" were viewed as fascinating curiosities rather than recognized as the causes of disease.',
            'The Society focused heavily on physics, astronomy, mechanics, and chemistry, with medicine remaining largely unregulated and unscientific in daily practice.',
            'Ordinary sick Londoners continued to visit quack doctors, apothecaries, and wise women, untouched by elite scientific lectures.',
          ],
          starter:
            'However, the practical contribution of the Royal Society to saving lives was limited because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating the extent to which the Royal Society transformed medicine between 1660 and 1700.',
        synthesis_connectives: [
          'On the one hand, the Royal Society institutionalized empirical science...',
          'However, in terms of practical patient care...',
          'Because microbes were not understood as pathogens...',
          'Therefore, its immediate medical impact was...',
        ],
        model_answer:
          "On the one hand, the establishment of the Royal Society in London in 1660 accelerated scientific progress by creating the first formal, prestigious institution dedicated entirely to empirical research. Awarded a Royal Charter by King Charles II in 1662, the Society actively rejected the medieval reliance on ancient dogma under its uncompromising Latin motto *Nullius in Verba* ('Take nobody's word for it'). Instead of treating Galen as infallible, members were required to demonstrate discoveries through physical experiments and repeatable evidence. Crucially, in 1665 the Society began publishing *Philosophical Transactions*, the world's first scientific journal, which established an international peer-review network. This allowed groundbreaking observations—such as Robert Hooke's microscopic cell studies in *Micrographia* (1665) and Antonie van Leeuwenhoek's discovery of microscopic 'animalcules' in 1676—to be rapidly translated, printed, and debated across Europe, permanently encouraging a culture of scientific questioning.<br><br>However, the Royal Society had almost no immediate impact on medical treatment or saving patients' lives during the 17th century. The Society was an exclusive club for wealthy gentlemen and amateur philosophers; it did not operate hospitals, train physicians, or treat the sick. Furthermore, while the Society confirmed Leeuwenhoek's sighting of bacteria under the microscope, no one understood what these 'animalcules' actually did: they were treated as entertaining microscopic curiosities rather than recognized as the cause of infectious disease (a realization that took another 200 years until Pasteur's Germ Theory in 1861). Meanwhile, the average sick citizen continued to rely on traditional humoral bleeding, purging, and quack remedies. Therefore, while the Royal Society established the institutional foundation for the modern Scientific Revolution, its direct practical impact on curing illnesses in the 17th century was practically zero.",
      },
    ];
  }

  // Update GCSE Tasks for Lesson 4 to strictly enforce Paper 1 Section B specification:
  l4.gcse_task = {
    title: 'Edexcel Exam Practice: Section B (Q3 & Q4)',
    tasks: [
      {
        type: 'written',
        text: 'Explain one way in which ideas about the causes of disease in the Renaissance period (c1500–c1700) were similar to ideas about the causes of disease in the medieval period (c1250–c1500). (4 marks)',
        model:
          'One way in which ideas about the causes of disease were similar in both the medieval and Renaissance periods was the persistent belief in **miasma** (bad air). In both periods, people rationalized that decaying matter, uncleaned waste, and stagnant swamps corrupted the atmosphere, creating foul-smelling vapors that entered the body and caused epidemic diseases like the Black Death in 1348 and the Great Plague in 1665. **This similarity existed because** although Renaissance scientists made major breakthroughs in anatomy through Vesalius, they still had no knowledge of germs or microorganisms. Without microscopes capable of identifying airborne pathogens, miasma remained the most logical scientific explanation for why diseases spread rapidly through dirty, crowded urban centers in both eras.',
      },
      {
        type: 'written',
        text: 'Explain why there were changes in the way ideas about the causes of disease and illness were communicated in the period c1500–c1700. (12 marks)',
        model:
          "The primary technological driver behind changes in medical communication during the Renaissance was the invention of the **movable-type printing press** (c1440). Prior to this period, medical texts had to be copied by hand by monastic scribes, making books exceptionally rare, highly expensive, and strictly censored by the Catholic Church to prevent challenges to Galen's classical authority. **The printing press shattered this technological bottleneck**. It allowed pioneering Renaissance scientists to bypass monastic scribes and mass-produce identical copies of their research rapidly and cheaply. **This meant that** when **Andreas Vesalius** completed his revolutionary human dissections, he could publish ***De Humani Corporis Fabrica* (1543)** containing exceptionally detailed, mathematically precise woodcuts with zero risk of copying errors. **Consequently**, identical anatomical diagrams could be distributed simultaneously to universities across Europe, allowing students and physicians to study correct physical structures identically rather than relying on corrupted translations of classical manuscripts.<br><br>A second crucial factor was the establishment of **the Royal Society** in London (**1660**), which created a highly structured, respected institution dedicated to the sharing of empirical scientific findings. Under their motto *'Nullius in verba'* (take nobody's word for it), the Society actively rejected classical dogma in favor of experimental proof, observation, and open debate. **This resulted in the publication of the world's first scientific journal**, ***Philosophical Transactions* (1665)**, which established a standardized, international network for peer-reviewing and disseminating medical ideas. **This meant that** when Antony van Leeuwenhoek developed more powerful microscopes and observed tiny bacteria (\"animalcules\") scraped from teeth, his detailed letters and drawings were printed, translated, and distributed to hundreds of physicians across Europe. **As a result**, the Royal Society provided the institutional framework that turned private, isolated laboratory discoveries into public, debated scientific knowledge, permanently accelerating the decline of uncritical respect for ancient authorities.<br><br>Furthermore, these communication changes were driven by **the decline of the Catholic Church's institutional monopoly** over European education and publishing. Following the Protestant Reformation and political actions like King Henry VIII's **Dissolution of the Monasteries in 1536**, the Church lost its absolute power to censor scientific texts and control university curricula. **Consequently**, medical schools and printer-publishers were free to produce and read books that actively criticized or disproved classical authorities like Galen and Hippocrates. This decline in religious authority coincided with the rise of **humanism**, which encouraged scholars to value direct observation and physical evidence over ancient book-based dogma. **This led directly to** a new intellectual environment where physicians were eager to write, publish, and buy books on empirical medical research, permanently transforming communication from a system of religious preservation to one of active scientific progress.",
      },
    ],
  };
}

// -----------------------------------------------------------------------------
// KT2.2: Lesson 5 (lesson_2_2) - Renaissance Treatments, Paré, New World Remedies
// -----------------------------------------------------------------------------
const l5 = lessons.find((l) => l.id === 'lesson_2_2');
if (l5) {
  console.log('Enriching Lesson 5 (KT2.2)...');
  // Paré & Surgery
  if (l5.narrative_blocks[1]) {
    l5.narrative_blocks[1].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'Ambroise Paré and Renaissance Surgery',
        instruction:
          'GCSE Analytical Assessment: Evaluate both the surgical advancements of Ambroise Paré and their practical limitations.',
        advancement: {
          title: 'Surgical Breakthroughs (Change)',
          points: [
            'In 1537, ran out of boiling elderberry oil at the Siege of Turin and invented a soothing digestive ointment (egg yolk, oil of roses, turpentine) that healed wounds faster without searing pain.',
            'Promoted the use of silk ligatures (threads) to tie individual blood vessels during amputations instead of using agonizing red-hot cautery irons.',
            'Designed sophisticated articulated artificial limbs and prosthetic eyes for maimed soldiers.',
          ],
          starter:
            'On the one hand, Ambroise Paré significantly advanced surgical practice because...',
        },
        limitations: {
          title: 'Critical Limitations & Dangers',
          points: [
            'Silk ligatures were dirty and unsterilized, often carrying deadly bacteria deep into surgical wounds and causing fatal gangrene/infection.',
            'Ligatures took much longer to tie on the chaotic battlefield compared to cauterization, increasing patient blood loss.',
            'The discovery of his soothing ointment was entirely accidental and could not prevent wound infections.',
            'Surgery still had no effective anaesthetics; operations remained agonizing, horrifying experiences that often caused fatal shock.',
          ],
          starter: 'However, Paré’s surgical methods had severe limitations because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating the significance of Ambroise Paré in the development of surgery.',
        synthesis_connectives: [
          'Although Paré pioneered gentler surgical techniques...',
          'However, in the absence of antiseptics...',
          'This meant that...',
          'Overall, his methods were a double-edged sword because...',
        ],
        model_answer:
          "On the one hand, Ambroise Paré significantly advanced surgical practice during the Renaissance by challenging brutal medieval methods with empirical battlefield experimentation. As a French army surgeon at the 1537 Siege of Turin, Paré ran out of boiling elderberry oil—the traditional Galenic treatment used to cauterize and 'detoxify' gunpowder wounds. In desperation, he concocted a soothing mixture of egg yolks, oil of roses, and turpentine. The following morning, he discovered that patients treated with the ointment were resting comfortably with cool, uninflamed wounds, whereas those treated with boiling oil were screaming in fever and agony. Furthermore, Paré pioneered the use of silk ligatures to tie individual blood vessels during amputations, sparing patients the torture of the red-hot cautery iron, and designed articulated iron prosthetic limbs for disabled veterans.<br><br>However, Paré’s innovations suffered from dangerous limitations because the biological causes of infection remained completely unknown. Without knowledge of bacteria or antiseptic practices, surgeons handled silk ligatures with dirty, unwashed hands. These unsterilized threads carried deadly microbes deep into amputation stumps, frequently causing fatal post-operative gangrene. Tying multiple ligatures was also far slower than cauterization, meaning wounded soldiers on chaotic battlefields often bled to death before bleeding could be stopped. Most critically, because effective anaesthesia did not exist, surgery remained an agonizing ordeal of shock and trauma. Consequently, while Paré demonstrated that gentler clinical methods were superior to classical dogma, his techniques were double-edged and could not dramatically improve overall surgical survival rates.",
      },
    ];
  }
}

// -----------------------------------------------------------------------------
// KT2.3: Lesson 6 (lesson_2_3) - William Harvey & The Great Plague (1665)
// -----------------------------------------------------------------------------
const l6 = lessons.find((l) => l.id === 'lesson_2_3');
if (l6) {
  console.log('Enriching Lesson 6 (KT2.3)...');
  // William Harvey
  if (l6.narrative_blocks[1]) {
    l6.narrative_blocks[1].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'William Harvey and Blood Circulation',
        instruction:
          'GCSE Analytical Assessment: Evaluate both the revolutionary physiology of William Harvey and its total lack of practical treatment impact.',
        advancement: {
          title: 'Physiological Breakthrough (Change)',
          points: [
            'Proved in De Motu Cordis (1628) that blood circulates continuously around the body in a closed one-way system pumped by the muscular heart.',
            "Completely disproved Galen's 1,400-year theory that the liver constantly manufactures new blood from food that is consumed by the tissues.",
            'Used rigorous mechanical calculations and simple tourniquet experiments on human arms to prove blood must be recycled and that veins contain one-way valves.',
          ],
          starter:
            'On the one hand, William Harvey made a momentous breakthrough in physiology because...',
        },
        limitations: {
          title: 'Critical Limitations & Zero Cures',
          points: [
            'Harvey’s discovery did NOT lead to a single new medical treatment, cure, or surgical technique during his lifetime.',
            'Did not know about microscopic capillaries (invisible without powerful microscopes) connecting arteries and veins; Malpighi only proved them in 1661.',
            'Doctors continued bleeding patients using phlebotomy and leeches for another 200 years, completely ignoring the reality of closed circulation.',
            'Contemporary physicians called Harvey a madman and a "circulator" (quack); many of his private patients abandoned him.',
          ],
          starter:
            'However, Harvey’s discovery had almost no practical significance for patients because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating the significance of William Harvey’s discovery of the circulation of blood.',
        synthesis_connectives: [
          'On the one hand, Harvey dismantled classical physiology...',
          'However, in terms of practical medicine and patient survival...',
          'Because bloodletting continued unabated...',
          'Therefore, his significance was theoretical rather than clinical...',
        ],
        model_answer:
          "On the one hand, William Harvey made a momentous scientific breakthrough by discovering the true mechanics of blood circulation, completely dismantling 1,400 years of Galenic physiology. In *De Motu Cordis* (1628), Harvey proved that the heart acts as a muscular mechanical pump driving blood in a continuous, one-way circular loop around the body. Galen had taught that the liver perpetually manufactures new blood from digested food, which is consumed as fuel by body tissues. Harvey used mathematical calculations to prove this was physically impossible: the liver would have to produce an impossible 250 liters of blood per day to sustain Galen's theory. Through careful dissections of cold-blooded animals and simple tourniquet experiments on living human arms, Harvey demonstrated that valves in veins only permit blood to flow toward the heart, proving that blood must be recycled continuously.<br><br>However, the practical significance of Harvey’s discovery for sick patients was virtually zero during his lifetime. Understanding that blood circulated did not give physicians the ability to cure disease or stop deadly infections. Because blood types and transfusion safety were unknown, early attempts at transfusion killed patients and were promptly banned. In fact, despite Harvey conclusively proving that the body contains a finite, precious volume of blood, doctors—and Harvey himself—continued to prescribe aggressive bloodletting as a standard treatment for the next two centuries. Furthermore, conservative physicians ridiculed Harvey as a 'circulator' (a derogatory Latin term meaning quack), and he lost many private patients who thought his theories were absurd. Therefore, while Harvey laid the indispensable foundation for modern cardiovascular physiology, his discovery was purely theoretical and saved no lives during the Renaissance.",
      },
    ];
  }

  // The Great Plague 1665
  if (l6.narrative_blocks[3]) {
    l6.narrative_blocks[3].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'The Response to the Great Plague of 1665',
        instruction:
          'GCSE Analytical Assessment: Evaluate the advancements in government organization against the ongoing medical ignorance of the 1665 plague.',
        advancement: {
          title: 'Government Organization (Change)',
          points: [
            'The Lord Mayor of London issued strict quarantine orders: infected houses locked for 28 days with red crosses and watchmen.',
            'Killed over 40,000 stray dogs and cats believed to carry miasma or infection; banned public gatherings, theatres, and funerals.',
            'Weekly Bills of Mortality recorded exact plague casualties across parishes, representing early statistical epidemiology.',
          ],
          starter:
            'On the one hand, the government response to the Great Plague was far more organized than in 1348 because...',
        },
        limitations: {
          title: 'Medical Ignorance & Superstition (Continuity)',
          points: [
            'People and physicians were still completely ignorant of the true cause (Yersinia pestis transmitted by rat fleas); killing cats and dogs actually allowed the rat population to explode.',
            'Miasma, astrological alignment, and God’s wrath remained the primary explanations.',
            'Treatments were completely useless: strapping plucked chickens or dried toads to buboes, drinking plague water with mercury, and forcing schoolboys to smoke tobacco.',
            'Over 100,000 Londoners (20% of the population) died; the epidemic was ended by winter cold and quarantine, not medical science.',
          ],
          starter:
            'However, the medical response to the Great Plague remained fundamentally medieval because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph explaining why the 1665 response was an administrative success but a medical failure.',
        synthesis_connectives: [
          'Although municipal quarantine was strictly enforced...',
          'Nevertheless, from a clinical perspective...',
          'Crucially, because rat fleas were unknown...',
          'Ultimately...',
        ],
        model_answer:
          "On the one hand, the response to the Great Plague of 1665 demonstrated significant progress in municipal public health organization compared to the chaotic response to the Black Death in 1348. The Lord Mayor of London and local aldermen enforced strict regulations to contain the epidemic. Infected houses were boarded up for 28 days and marked with a painted red cross and the words 'Lord have mercy upon us', guarded by watchmen to enforce quarantine. Large public gatherings, theatrical plays, and traditional funerals were banned, and mass plague pits were dug outside city walls. Furthermore, the parish-by-parish recording of deaths in weekly Bills of Mortality allowed authorities to track the geographic spread of the epidemic, representing an early form of statistical epidemiology.<br><br>However, in terms of medical knowledge and effective treatments, the response in 1665 was an absolute failure characterized by overwhelming continuity with the Middle Ages. Physicians and authorities were still completely ignorant of the bacterium *Yersinia pestis* and its transmission by rat fleas. Miasma (poisonous air) and divine retribution remained the dominant explanations. In a tragic error born of the miasma theory, authorities ordered the slaughter of over 40,000 stray cats and dogs, which wiped out the natural predators of black rats and allowed the flea-infested rodent population to explode. Furthermore, medical treatments remained superstitious and ineffective: doctors prescribed smoking tobacco to ward off bad air, strapped plucked chickens or dried toads to swollen buboes, and charged vast sums for useless herbal 'plague water'. Consequently, over 100,000 Londoners died in a single year, proving that without scientific knowledge of germs, administrative quarantine could do little to prevent catastrophic mortality.",
      },
    ];
  }
}

// -----------------------------------------------------------------------------
// KT1: Medieval Period (c1250–c1500)
// -----------------------------------------------------------------------------
const l1 = lessons.find((l) => l.id === 'lesson_1_1');
if (l1) {
  console.log('Enriching Lesson 1 (KT1.1)...');
  // Two-sided on Four Humours & Galen
  if (l1.narrative_blocks[2]) {
    l1.narrative_blocks[2].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'The Theory of the Four Humours and Galenic Medicine',
        instruction:
          'GCSE Analytical Assessment: Evaluate the logical strengths and scientific limitations of Galenic humoral medicine in the Middle Ages.',
        advancement: {
          title: 'Logical & Natural Rationale (Rationality)',
          points: [
            'Provided a rational, natural explanation for illness based on physical bodily fluids (blood, phlegm, yellow bile, black bile) rather than blaming demons or witchcraft.',
            "Galen's Theory of Opposites gave physicians a systematic framework for prescribing clinical treatments (e.g. treating a cold phlegmatic fever with hot, dry pepper).",
            'Encouraged careful observation of bodily symptoms, diet, and clinical pulse taking.',
          ],
          starter:
            'On the one hand, the Theory of the Four Humours was considered a rational medical framework because...',
        },
        limitations: {
          title: 'Doctrinal Stagnation & Flaws',
          points: [
            'The four humours were factually non-existent; treatments based on balancing them (bleeding, purging, vomiting) severely weakened sick patients and frequently proved fatal.',
            'The Catholic Church adopted Galen as absolute dogma because his writings argued the body was designed by a single Creator, making criticism of Galen an act of heresy.',
            'The Church strictly banned human dissection, freezing anatomical knowledge in classical antiquity and preventing doctors from discovering real bodily organs.',
          ],
          starter:
            'However, Galenic humoral medicine severely hindered medical progress because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating why Galenic medicine dominated the medieval period despite having fatal medical flaws.',
        synthesis_connectives: [
          'Although the Four Humours offered a naturalistic explanation...',
          'However, its factual inaccuracies meant that...',
          'Furthermore, because the Church enforced it as religious dogma...',
          'Consequently...',
        ],
        model_answer:
          "On the one hand, the Theory of the Four Humours represented a rational and sophisticated medical framework for medieval society because it offered a naturalistic, secular explanation for disease. Derived from Hippocrates and expanded by Galen, the theory posited that health was governed by a balance of four bodily fluids: blood, phlegm, yellow bile, and black bile. Rather than attributing illness to demonic possession, witchcraft, or divine curse, humoral theory argued that disease was caused by a physical imbalance within the patient's own body, influenced by diet, climate, and lifestyle. Furthermore, Galen's Theory of Opposites provided physicians with a logical system of clinical intervention (for example, counteracting cold, moist phlegm with warm, dry foods like hot peppers), encouraging doctors to conduct careful bedside observations of symptoms, pulses, and urine charts.<br><br>However, Galenic humoral medicine severely paralyzed medical progress for over a millennium because it was factually incorrect and backed by religious tyranny. Because the biological humours did not exist, standard humoral treatments—most notably aggressive bloodletting (phlebotomy) and violent purging with laxatives—drastically lowered the immune defenses of sick patients and frequently hastened death from dehydration and blood loss. More critically, the Catholic Church embraced Galen's treatises as absolute theological dogma because Galen believed that every human organ had been purposefully designed by a single divine Creator. Consequently, the Church controlled university medical training, strictly forbade human dissection, and treated anyone who questioned Galen as a dangerous heretic. This ensured that medieval doctors remained trapped in classical dogma, leaving patients entirely vulnerable to fatal epidemics.",
      },
    ];
  }

  // Fix Section B exam question (replace invalid "Describe two features" with authentic Q3 & Q4)
  l1.gcse_task = {
    title: 'Edexcel Exam Practice: Section B (Q3 & Q4)',
    tasks: [
      {
        type: 'written',
        text: 'Explain one way in which ideas about the cause of disease in the medieval period (c1250–c1500) were similar to ideas about the cause of disease in the Renaissance period (c1500–c1700). (4 marks)',
        model:
          'One way in which ideas about the cause of disease were similar across both periods was the persistent belief in **miasma** (poisonous air). In the medieval period, people believed the Black Death (1348) was spread by foul air corrupted by swamps and uncleaned streets; identically, in the Renaissance, miasma was widely blamed for the Great Plague of 1665. **This similarity existed because** although Renaissance anatomists like Vesalius corrected Galen’s anatomical errors, no scientist had yet discovered the existence of microscopic germs or bacteria. Consequently, foul odors and contaminated air remained the most logical scientific explanation for the spread of infectious disease in both eras.',
      },
      {
        type: 'written',
        text: 'Explain why the Church had such a significant influence on medieval medicine in the period c1250–c1500. (12 marks)',
        model:
          "The Catholic Church exercised immense influence over medieval medicine primarily through its **monopoly over education and university medical training**. During the Middle Ages, virtually all European universities were controlled and funded by the Church, and medical students were required to be clerics who could read and write Latin. The Church strictly determined the medical curriculum, enforcing the study of classical texts by Hippocrates and Galen. **This meant that** students were taught that Galen's anatomical descriptions were completely infallible. **Consequently**, doctors were trained not to experiment or observe human anatomy directly, but rather to memorize ancient books. Because the Church taught that challenging Galen was an act of heresy that defied God's divine order, medical thinking remained completely static for centuries.<br><br>A second major factor was the **theological role of the Church in explaining the causes of disease**. Christianity taught that all disease was sent directly by God, either as a divine punishment for personal sins or as a test of faith. **This resulted in** patients seeking spiritual and supernatural remedies rather than medical cures. **This meant that** when catastrophic epidemics like the Black Death struck England in 1348, people turned to prayer, purchasing indulgences, pilgrimages to holy shrines, and self-flagellation to appease God's anger. **Consequently**, scientific investigation into the physical causes of disease was discouraged, as attempting to cure a disease sent by God was viewed as interfering with divine will.<br><br>Furthermore, the Church controlled medical practice through its **establishment and management of medieval hospitals**. Rather than functioning as places of medical treatment and cure, medieval hospitals were religious hospices run by monks and nuns dedicated to providing spiritual care, shelter, warmth, and food for the poor, elderly, and dying. **As a result**, physicians were rarely employed in hospitals, and surgical operations were prohibited. The primary objective was saving the patient's eternal soul through regular confession and prayer rather than curing their earthly illness. **Therefore**, the Church shaped the entire experience of illness from diagnosis to death, cementing its institutional control over medieval healthcare.",
      },
    ],
  };
}

const l2 = lessons.find((l) => l.id === 'lesson_1_2');
if (l2) {
  console.log('Enriching Lesson 2 (KT1.2)...');
  if (l2.narrative_blocks[2]) {
    l2.narrative_blocks[2].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'Medieval Hospitals: Care versus Cure',
        instruction:
          'GCSE Analytical Assessment: Evaluate the compassionate care provided by medieval hospitals against their total lack of medical cures.',
        advancement: {
          title: 'Compassionate Care & Hospitality',
          points: [
            "Hundreds of hospitals established by religious orders (over 700 in England by 1500, e.g. St Bartholomew's in London founded 1123).",
            'Provided clean beds, warmth, nutritious food, clean water, and peaceful shelter for the destitute, elderly, and travelers.',
            'Monks and nuns offered compassionate spiritual comfort, palliative nursing, and dignity to the dying.',
          ],
          starter:
            'On the one hand, medieval hospitals provided essential humanitarian care because...',
        },
        limitations: {
          title: 'Total Lack of Medical Cure',
          points: [
            'Hospitals provided care, NOT cure; doctors and surgeons were rarely employed, and surgical operations were forbidden.',
            'Infectious, contagious patients and pregnant women were strictly turned away to prevent contaminating the wards.',
            'Primary focus was on saving the soul through daily mass, prayer, and confession, leaving physical disease untreated.',
          ],
          starter:
            'However, medieval hospitals were completely ineffective at curing disease because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating the statement: "Medieval hospitals were places of spiritual hospitality rather than medical treatment."',
        synthesis_connectives: [
          'Although hospitals provided vital shelter and basic nursing...',
          'However, in terms of clinical medicine...',
          'Because infectious diseases were excluded...',
          'Ultimately...',
        ],
        model_answer:
          "On the one hand, medieval hospitals provided invaluable humanitarian care and shelter for the vulnerable in a society with zero state welfare. Run exclusively by monastic orders, over 700 hospitals were established in England by 1500, such as St Leonard's in York and St Bartholomew's in London (founded 1123). For the poor, the elderly, and disabled travelers, these institutions provided clean bedding, warmth, nutritious food, fresh water, and rest. Monks and Augustinian nuns provided compassionate nursing care, changing dressings, washing patients, and offering palliative peace. In an era of harsh poverty and famine, this institutional charity saved many vulnerable people from starvation and exposure.<br><br>However, medieval hospitals were fundamentally religious hospices rather than centers of medical treatment and cure. Because the Latin word *hospes* means guest, these facilities were designed for Christian hospitality and spiritual salvation rather than medical intervention. University-trained physicians were virtually never employed on the wards, and surgical operations were strictly forbidden. Furthermore, anyone suffering from contagious epidemic diseases, leprosy, or mental illness was explicitly banned from admission to avoid contaminating the religious community. The central feature of every hospital ward was an altar where patients were required to attend daily mass, confess their sins, and pray for the souls of the wealthy patrons who endowed the hospital. Consequently, while medieval hospitals were successful refuges of Christian charity, they did nothing to advance medical science or cure bodily diseases.",
      },
    ];
  }
}

// -----------------------------------------------------------------------------
// KT3: Industrial Revolution (c1700–c1900)
// -----------------------------------------------------------------------------
const l7 = lessons.find((l) => l.id === 'lesson_3_1');
if (l7) {
  console.log('Enriching Lesson 7 (KT3.1 - Germ Theory)...');
  if (l7.narrative_blocks[2]) {
    l7.narrative_blocks[2].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'Louis Pasteur and Robert Koch: The Germ Theory',
        instruction:
          'GCSE Analytical Assessment: Evaluate the monumental scientific breakthrough of Germ Theory against its delayed clinical application in curing disease.',
        advancement: {
          title: 'Microbiological Revolution (Change)',
          points: [
            'Louis Pasteur’s 1861 swan-neck flask experiments decisively disproved the ancient theory of Spontaneous Generation, proving microbes cause decay.',
            'Robert Koch applied industrial scientific methods: stained specific bacteria with methylene-blue dyes, grew pure cultures on solid agar jelly, and photographed them under high-power microscopes.',
            'Identified the specific pathogens responsible for deadly diseases: anthrax (1876), tuberculosis (1882), and cholera (1883).',
          ],
          starter:
            'On the one hand, the discovery of Germ Theory was the ultimate turning point in medical understanding because...',
        },
        limitations: {
          title: 'Delayed Cures & Scientific Resistance',
          points: [
            'Identifying a bacterial pathogen did NOT mean doctors could cure it; antibiotics like penicillin were not discovered until 1928 and mass-produced until the 1940s.',
            'British medical authorities fiercely resisted Germ Theory for decades; prominent doctors like Henry Bastian continued arguing for spontaneous generation into the 1880s.',
            'Patients suffering from tuberculosis and cholera continued to die in huge numbers despite doctors now knowing the microbe responsible.',
          ],
          starter: 'However, the immediate practical value of Germ Theory was limited because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating the extent to which Germ Theory immediately transformed healthcare in the late 19th century.',
        synthesis_connectives: [
          'While Germ Theory solved the mystery of disease causation...',
          'However, a massive gap remained between diagnosis and cure...',
          'Consequently...',
          'Therefore, its true significance was realized only in...',
        ],
        model_answer:
          "On the one hand, the development of Germ Theory by Louis Pasteur and Robert Koch was the definitive turning point in the history of medicine, permanently destroying thousands of years of belief in miasma and the Four Humours. In 1861, Pasteur published his Germ Theory, using swan-neck flask experiments to prove conclusively that microorganisms in the air caused fermentation and decay, utterly disproving the orthodox belief in 'Spontaneous Generation'. Building upon this foundation, German doctor Robert Koch developed revolutionary laboratory methods: he used industrial aniline dyes (methylene blue) to stain specific bacteria, cultivated pure microbial colonies on solid agar jelly, and photographed them with high-magnification photomicrography. Between 1876 and 1883, Koch isolated the specific causative bacteria for anthrax, tuberculosis, and cholera, proving beyond doubt that specific diseases were caused by specific micro-pathogens.<br><br>However, the immediate impact of Germ Theory on saving patients' lives was severely limited because identifying a bacterial pathogen did not provide a cure. In the late 19th century, doctors possessed no chemical drugs capable of killing bacteria inside the living human body without poisoning the patient. Consequently, patients diagnosed with tuberculosis or cholera continued to suffer and die at virtually identical rates. Furthermore, established medical authorities in Britain fiercely resisted Pasteur and Koch's findings: influential figures like Dr Henry Bastian defended spontaneous generation well into the 1880s, dismissing microbes as the consequence rather than the cause of illness. Therefore, while Germ Theory laid the essential intellectual bedrock for modern medicine, its direct therapeutic payoff was delayed until the 20th century with the arrival of magic bullets and antibiotics.",
      },
    ];
  }
}

const l8 = lessons.find((l) => l.id === 'lesson_3_2');
if (l8) {
  console.log('Enriching Lesson 8 (KT3.2 - Surgery & Hospitals)...');
  if (l8.narrative_blocks[2]) {
    l8.narrative_blocks[2].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'James Simpson, Chloroform, and the "Black Period" of Surgery',
        instruction:
          'GCSE Analytical Assessment: Evaluate the breakthrough of anaesthesia against the deadly paradox of the "Black Period" of surgery.',
        advancement: {
          title: 'Conquest of Pain (Change)',
          points: [
            'James Simpson discovered the anaesthetic properties of chloroform in Edinburgh in 1847, allowing patients to be rendered completely unconscious during surgery.',
            'Ended the agonizing screams, torture, and physical shock that caused so many surgical patients to die on the operating table.',
            'Gained royal and societal acceptance after Queen Victoria used chloroform during the birth of Prince Leopold in 1853.',
          ],
          starter:
            'On the one hand, James Simpson’s discovery of chloroform transformed surgical practice because...',
        },
        limitations: {
          title: 'The Deadly "Black Period" Paradox',
          points: [
            'Paradoxically, death rates from surgery INCREASED in the decades immediately following Simpson’s discovery (known as the "Black Period").',
            'Surgeons operated deeper, longer, and inside the abdomen with unwashed hands and dirty instruments, introducing massive infections.',
            'Without antiseptics, patients survived the surgery only to die days later from fatal gangrene and sepsis.',
            'Incorrect dosages of chloroform frequently caused fatal heart failure (e.g. 15-year-old Hannah Greener in 1848).',
          ],
          starter:
            'However, the introduction of chloroform initially worsened surgical mortality because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating why the discovery of anaesthesia was initially dangerous for surgical patients.',
        synthesis_connectives: [
          'Although chloroform conquered the problem of pain...',
          'Crucially, in the absence of antiseptics...',
          'Consequently...',
          'Therefore, anaesthesia was a dangerous breakthrough until...',
        ],
        model_answer:
          "On the one hand, James Simpson’s discovery of chloroform in 1847 was a revolutionary breakthrough that conquered the age-old barrier of surgical pain. Before anaesthesia, surgery was a barbaric ordeal of screaming agony: patients had to be strapped down by muscular orderlies while surgeons amputated limbs in under 30 seconds, with many dying on the table purely from physical shock. Simpson’s discovery that inhaling chloroform vapors caused deep, safe unconsciousness allowed surgeons to take their time and operate with precision. Furthermore, when Queen Victoria praised chloroform after using it during the birth of Prince Leopold in 1853, religious opposition melted away, establishing general anaesthesia as a standard medical humanitarian practice.<br><br>However, the introduction of chloroform paradoxically caused surgical mortality rates to soar, triggering the deadly 'Black Period' of Victorian surgery (c.1847–1870). Because patients were unconscious and relaxed, ambitious surgeons attempted longer, far more invasive operations deeper inside the body, such as abdominal surgery. Crucially, because this took place before Joseph Lister developed antiseptics in 1865, surgeons operated in filthy frock coats with unwashed hands and unsterilized instruments. Operating deeper inside the body simply introduced deadly bacteria directly into open wounds and vital organs, causing a massive surge in fatal cases of gangrene, pyaemia, and sepsis. Furthermore, because proper dosage was unstandardized, patients frequently suffered fatal cardiac arrest from chloroform overdoses, most famously 15-year-old Hannah Greener during a simple toenail removal in 1848. Therefore, until antisepsis solved the crisis of infection, anaesthesia actually made surgery significantly more dangerous for patients.",
      },
    ];
  }
}

// -----------------------------------------------------------------------------
// KT4: Modern Era (c1900–present)
// -----------------------------------------------------------------------------
const l12 = lessons.find((l) => l.id === 'lesson_4_3');
if (l12) {
  console.log('Enriching Lesson 12 (KT4.3 - Penicillin)...');
  if (l12.narrative_blocks[1]) {
    l12.narrative_blocks[1].tasks = [
      {
        type: 'two_sided_argument',
        topic: 'The Discovery and Mass Production of Penicillin',
        instruction:
          'GCSE Analytical Assessment: Evaluate the miraculous antibacterial breakthrough of penicillin against its industrial challenges and modern limitations.',
        advancement: {
          title: 'Antibiotic Miracle (Change)',
          points: [
            'Alexander Fleming observed in 1928 that penicillium notatum mold destroyed staphylococcus bacteria colonies on an open culture plate.',
            'Howard Florey and Ernst Chain at Oxford (1938–1941) successfully isolated and purified penicillin, proving it cured deadly bacterial infections in mice and human trials.',
            'US industrial scale and War Production Board funding produced 2.3 million doses in 1944, saving thousands of Allied soldiers on D-Day and eliminating pneumonia/gangrene.',
          ],
          starter:
            'On the one hand, the development of penicillin was the greatest therapeutic breakthrough of the 20th century because...',
        },
        limitations: {
          title: 'Industrial Fragility & Antibiotic Resistance',
          points: [
            'Fleming abandoned his discovery in 1929 because he could not extract enough pure penicillin; without Florey, Chain, and US funding, it would have remained a laboratory footnote.',
            'Oxford trials showed how fragile the supply was: policeman Albert Alexander showed rapid recovery but died when the team ran out of penicillin.',
            'Penicillin was completely useless against viral infections like influenza, measles, or the common cold.',
            'Modern over-prescription in humans and livestock has bred dangerous antibiotic-resistant superbugs like MRSA.',
          ],
          starter: 'However, the penicillin breakthrough had profound limitations because...',
        },
        synthesis_prompt:
          'Write a balanced GCSE exam paragraph evaluating how far penicillin was an individual discovery versus an industrial collaboration with modern vulnerabilities.',
        synthesis_connectives: [
          'Although Fleming made the initial serendipitous discovery...',
          'Crucially, transforming this into a viable drug required...',
          'Furthermore, in contemporary medicine...',
          'Ultimately...',
        ],
        model_answer:
          "On the one hand, the development of penicillin was the single greatest therapeutic breakthrough in the history of medicine, ushering in the modern antibiotic era and saving hundreds of millions of lives. In 1928, Alexander Fleming serendipitously discovered that a spore of *Penicillium notatum* mold had contaminated a petri dish of staphylococcus bacteria at St Mary's Hospital, creating a clear halo of bacterial destruction. A decade later, Howard Florey and Ernst Chain assembled a multidisciplinary scientific team at Oxford University, successfully purifying and concentrating the drug. After human trials proved penicillin could cure fatal bacterial septicaemia, Florey secured massive industrial backing from the United States government during World War II. By June 1944, American pharmaceutical corporations were mass-producing 2.3 million doses for D-Day, drastically slashing military deaths from infected battlefield wounds and pneumonia.<br><br>However, the penicillin story reveals profound limitations regarding individual genius, industrial fragility, and modern clinical efficacy. Fleming himself abandoned his research in 1929 because he was a bacteriologist who lacked the chemical expertise to isolate or stabilize the active compound; without Florey and Chain, Fleming's discovery would have remained an obscure scientific curiosity. Even at Oxford, production was so agonizingly slow that their first human patient, policeman Albert Alexander, began recovering from deadly facial sepsis only to relapse and die when the team ran completely out of penicillin. Furthermore, penicillin was totally ineffective against viral diseases. In modern medicine, decades of routine over-prescription have allowed bacteria to evolve resistance through natural selection, creating dangerous 'superbugs' like MRSA that threaten to render modern surgery and antibiotics obsolete. Therefore, penicillin's success was entirely dependent on institutional teamwork and wartime industrial finance, and its miraculous power is now increasingly threatened by bacterial resistance.",
      },
    ];
  }
}

// Write back to data.js
console.log('\nWriting updated data back to ' + dataFilePath + '...');
const serialized = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('🎉 Successfully enriched Edexcel Medicine data.js with two-sided argument tasks!');
