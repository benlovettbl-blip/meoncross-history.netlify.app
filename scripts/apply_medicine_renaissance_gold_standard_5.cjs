/**
 * History Revision Hub — Edexcel GCSE Medicine Through Time
 * Migration: Key Topic 2 (Renaissance Britain c1500-c1700) to Gold Standard 5 Acts
 *
 * Converts remaining Renaissance lessons 2.2 through 2.5 in units/edexcel_medicine/data.js:
 * 1. Retires obsolete 3-box `note_scaffold` across all remaining lessons.
 * 2. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 3. Preserves and maps all authentic primary visual sources (Sources A, B, C) to their respective Acts.
 * 4. Aligns `workbook_stages` and `causal_domino_spine.stages` para_refs to [1.1–1.2] ... [5.1–5.2].
 * 5. Updates teacher_notes objectives with targeted hinge questions.
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const startIndex = fileContent.indexOf('{');
const endIndex = fileContent.lastIndexOf('}');
const unitData = eval('(' + fileContent.substring(startIndex, endIndex + 1) + ')');

console.log('Loaded unitData with', unitData.lessons.length, 'lessons.');

const RENAISSANCE_5_ACT_DATA = {
  lesson_2_2: {
    teacher_notes: {
      primer:
        'This enquiry explores Thomas Sydenham ("The English Hippocrates"), examining how his bedside clinical observations, disease classification, cool therapy for smallpox, and use of Cinchona bark (quinine) challenged medieval individual humoral theory, while evaluating why everyday medical treatments remained predominantly traditional.',
      objectives: [
        {
          objective:
            'Explain why Sydenham rejected scholastic book learning in favour of direct bedside observation.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Portrait by Mary Beale). Emphasize his insistence that doctors must observe symptoms directly rather than theorising about humours.',
          question:
            'Why did Sydenham believe that observing a patient at the bedside was more valuable than reading Galen at university?',
        },
        {
          objective:
            'Analyse how classifying diseases in Observationes Medicae challenged individual humoral theory.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source B (The Quack Physician). Connect Sydenham’s plant-like taxonomy of disease to the concept that diseases are external entities with uniform symptoms.',
          question:
            'How did classifying diseases into distinct species undermine the 1,400-year-old belief in individual humoral balance?',
        },
        {
          objective:
            'Assess the significance of Cinchona bark (quinine) in demonstrating that specific remedies target specific diseases.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Discuss how Peruvian bark cured malaria without purging or bloodletting, striking a fatal blow against Galenic therapeutics.',
          question:
            'Why was the success of Peruvian bark such a profound conceptual challenge to Galen’s Theory of Opposites?',
        },
        {
          objective: 'Evaluate Sydenham’s innovative "cool therapy" for smallpox fevers.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Contrast the lethal traditional sweating treatment (heavy blankets, sealed rooms) with Sydenham’s open windows and cool drinks.',
          question:
            'Why did Sydenham’s common-sense cool treatment dramatically reduce smallpox fatalities in London?',
        },
        {
          objective:
            'Explain why medical treatments remained mostly medieval despite Sydenham’s diagnostic breakthroughs.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source C. Highlight that without germ theory, Sydenham still relied on bloodletting, purges, and iron tonics for most ailments.',
          question:
            'Why did Sydenham’s brilliant clinical observations fail to revolutionize everyday medical treatments in the 17th century?',
        },
      ],
      source_context: {
        'Source A':
          'Portrait of Thomas Sydenham by Mary Beale (c.1688). Depicts the celebrated London physician in simple gentlemanly attire, known as the "English Hippocrates" for revitalizing clinical observation. Hinge Question: How does Sydenham’s austere portrait reflect his rejection of theatrical university dogma in favour of practical bedside clinical care?',
        'Source B':
          'The Quack Physician, painting by Jan Steen (1660s). Satirizes an itinerant medical practitioner holding up a urine flask to deceive anxious patients with bogus humoral diagnoses. Hinge Question: Why did Sydenham argue that traditional scholastic doctors who relied on urine flasks were no better than theatrical quacks?',
        'Source C':
          'Renaissance Municipal Hospital Ward, woodcut engraving illustrating rows of simple iron cots in an English charitable infirmary. Hinge Question: What does the layout of this 17th-century ward suggest about the persistent limits of hospital care despite Sydenham’s diagnostic advances?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Rejecting Book Learning at the Bedside (1660s)',
        theme_heading: 'Act 1: Rejecting Book Learning at the Bedside (1660s)',
        source: {
          id: 'source_a_sydenham_portrait',
          letter: 'A',
          title: 'Source A: Portrait of Thomas Sydenham by Mary Beale (c.1688)',
          src: '/images/thomas_sydenham_portrait.jpg',
          source: '/images/thomas_sydenham_portrait.jpg',
          image: '/images/thomas_sydenham_portrait.jpg',
          caption:
            'Portrait of Thomas Sydenham by Mary Beale (c.1688), celebrated London physician known as the ‘English Hippocrates’.',
          desc: 'Seventeenth-century portrait of Dr Thomas Sydenham.',
          provenance:
            'Oil on canvas by Mary Beale, c.1688. National Portrait Gallery, London (NPG 211).',
          citation:
            'Oil on canvas by Mary Beale, c.1688. National Portrait Gallery, London (NPG 211).',
          question:
            'How does Sydenham’s austere portrait reflect his rejection of theatrical university dogma in favour of practical bedside clinical care?',
          hinge_question:
            'How does Sydenham’s austere portrait reflect his rejection of theatrical university dogma in favour of practical bedside clinical care?',
          source_context:
            'Depicts the celebrated London physician in simple gentlemanly attire, known as the "English Hippocrates" for revitalizing clinical observation.',
          context:
            'Depicts the celebrated London physician in simple gentlemanly attire, known as the "English Hippocrates" for revitalizing clinical observation.',
        },
        text: '<span class="para-ref">[1.1]</span> In seventeenth-century England, medical scholarship remained largely trapped within theoretical scholasticism. University doctors read Latin translations of Galen, scrutinized urine flasks, and argued endlessly about metaphysical philosophy while rarely interacting with living sufferers. Dr Thomas Sydenham (1624–1689), practicing in London, staged a radical revolt against this academic elitism (<span class="archival-meta-tag">Source A</span>). Dubbed the "English Hippocrates", Sydenham insisted that true medical science could never be learned from antique books in a library, but only through empirical observation directly at the patient’s bedside. His famous advice to young physicians was blunt: "Go to the bedside, there alone can you learn disease."<br><br><span class="para-ref">[1.2]</span> Sydenham urged physicians to abandon speculative theoretical disputes and adopt meticulous, objective clinical record-keeping. He spent hours monitoring patients, noting precise changes in pulse rate, skin temperature, sweating patterns, tongue coating, and the progression of rashes day by day. By recording detailed case histories and watching nature take its course, Sydenham sought to understand the true biological lifecycle of illnesses, reviving Hippocratic clinical observation for the early modern era.',
      },
      {
        act: 2,
        title: 'Act 2: Observationes Medicae & Disease Classification (1676)',
        theme_heading: 'Act 2: Observationes Medicae & Disease Classification (1676)',
        source: {
          id: 'source_b_quack_physician',
          letter: 'B',
          title: 'Source B: The Quack Physician by Jan Steen (1660s)',
          src: '/images/quack_physician_steen.jpg',
          source: '/images/quack_physician_steen.jpg',
          image: '/images/quack_physician_steen.jpg',
          caption:
            'A 17th-century painting by Jan Steen depicting an itinerant quack doctor grandly inspecting a urine flask to deceive a credulous patient.',
          desc: 'Seventeenth-century Dutch genre painting satirizing diagnostic uroscopy.',
          provenance:
            'Oil on oak panel by Jan Steen, c.1660–1665. Mauritshuis, The Hague (Inv. no. 168).',
          citation:
            'Oil on oak panel by Jan Steen, c.1660–1665. Mauritshuis, The Hague (Inv. no. 168).',
          question:
            'Why did Sydenham argue that traditional scholastic doctors who relied on urine flasks were no better than theatrical quacks?',
          hinge_question:
            'Why did traditional scholastic doctors who relied on urine flasks fail to diagnose distinct diseases compared to Sydenham’s bedside methods?',
          source_context:
            'Satirizes an itinerant medical practitioner holding up a urine flask to deceive anxious patients with bogus humoral diagnoses.',
          context:
            'Satirizes an itinerant medical practitioner holding up a urine flask to deceive anxious patients with bogus humoral diagnoses.',
        },
        text: '<span class="para-ref">[2.1]</span> In 1676, Sydenham published his masterwork, <em>Observationes Medicae</em>, which served as a foundational medical textbook across Europe for over two centuries. In it, Sydenham advanced a revolutionary hypothesis: diseases could be systematically organized and classified into distinct species, precisely like botanists classify plants and trees. Prior to Sydenham, medieval humoral doctrine taught that every patient had a unique, individual mixture of humours, meaning that a fever in one person was considered fundamentally different from a fever in another.<br><br><span class="para-ref">[2.2]</span> Sydenham demolished this individualized model. He demonstrated that patients suffering from the same disease exhibited identical, predictable symptom patterns regardless of their individual constitution, age, or background. By differentiating between conditions that had previously been lumped together—most famously distinguishing measles from scarlet fever—Sydenham proved that diseases were distinct external pathological entities rather than vague internal fluid imbalances, striking a mortal blow against traditional Galenic diagnosis (<span class="archival-meta-tag">Source B</span>).',
      },
      {
        act: 3,
        title: 'Act 3: Quinine & Cinchona Bark for Malaria (c. 1670s)',
        theme_heading: 'Act 3: Quinine & Cinchona Bark for Malaria (c. 1670s)',
        text: '<span class="para-ref">[3.1]</span> Sydenham’s empirical bedside method bore its most celebrated therapeutic fruit in his championing of Cinchona bark (Peruvian bark) for the treatment of "intermittent fevers" (ague, known today as malaria). Imported from South America by Jesuit missionaries, Cinchona bark was initially viewed with deep suspicion by conservative Protestant English doctors, who dismissed it as a dangerous Catholic concoction. Sydenham tested it rigorously on patients suffering ague in the marshy Thames estuary, carefully calculating dosages and timing administration to coincide with fever remissions.<br><br><span class="para-ref">[3.2]</span> The results were miraculous: the bark (which contained natural quinine) cured malaria directly and rapidly. Crucially, Cinchona bark did not purge the bowels or induce vomiting; it operated as a specific chemical remedy targeting a specific illness. This discovery was conceptually devastating to Galenism. If a single imported tree bark could cure ague without adjusting the Four Humours or bleeding the patient, then the entire Galenic edifice of humoral balance was fundamentally flawed.',
      },
      {
        act: 4,
        title: 'Act 4: Cool Therapy for Smallpox Fevers (c. 1670s)',
        theme_heading: 'Act 4: Cool Therapy for Smallpox Fevers (c. 1670s)',
        text: '<span class="para-ref">[4.1]</span> Sydenham also revolutionized the clinical management of smallpox, one of the deadliest and most disfiguring killers of the seventeenth century. Traditional Galenic physicians treated smallpox fevers by attempting to sweat the poison out of the body: patients were locked in stifling rooms with shuttered windows, roaring hearth fires, and piled under heavy woolen blankets, while being administered heating cordials and wine. This horrific "sweating regimen" caused severe dehydration, accelerated systemic delirium, and dramatically increased patient mortality.<br><br><span class="para-ref">[4.2]</span> Sydenham overturned this centuries-old practice with his famous "cool therapy". He ordered windows opened to allow fresh air to circulate freely through the sickroom, removed heavy blankets in favor of light sheets, extinguished bedchamber fires, and forbade hot cordials, prescribing instead refreshing cold drinks and mild barley waters. While Sydenham could not cure the smallpox virus itself, his cool regimen allowed patients’ immune systems to survive the acute fever crisis, drastically reducing smallpox fatalities and earning him widespread acclaim among grateful London families.',
      },
      {
        act: 5,
        title: 'Act 5: The Limits of Sydenham’s Legacy (1680s)',
        theme_heading: 'Act 5: The Limits of Sydenham’s Legacy (1680s)',
        source: {
          id: 'source_c_municipal_hospital',
          letter: 'C',
          title: 'Source C: Renaissance Municipal Hospital Ward',
          src: '/images/renaissance_hospital_ward.jpg',
          source: '/images/renaissance_hospital_ward.jpg',
          image: '/images/renaissance_hospital_ward.jpg',
          caption:
            'A 17th-century engraving showing an early modern hospital ward with rows of simple beds, reflecting modest clinical care.',
          desc: 'Seventeenth-century engraving of a municipal hospital ward.',
          provenance: 'Wellcome Collection, London (Shelfmark: Iconographic Collection 3892i).',
          citation: 'Wellcome Collection, London (Shelfmark: Iconographic Collection 3892i).',
          question:
            'What does the layout of this 17th-century ward suggest about the persistent limits of hospital care despite Sydenham’s diagnostic advances?',
          hinge_question:
            'What does the layout of this 17th-century ward suggest about the persistent limits of hospital care despite Sydenham’s diagnostic advances?',
          source_context:
            'Illustrating rows of simple iron cots in an English charitable infirmary.',
          context: 'Illustrating rows of simple iron cots in an English charitable infirmary.',
        },
        text: '<span class="para-ref">[5.1]</span> Despite his profound clinical innovations, Sydenham faced bitter opposition from the medical establishment. Senior fellows of the Royal College of Physicians resented his contempt for scholastic textbook learning, denouncing him as a dangerous rebel whose empirical focus degraded noble academic medicine into a vulgar mechanic trade. Sydenham was never elected a Fellow of the Royal College, remaining a licentiate throughout his life.<br><br><span class="para-ref">[5.2]</span> Furthermore, Sydenham’s breakthrough illustrated the enduring paradox of Renaissance medicine: revolutionary diagnostic observation did not produce revolutionary cures (<span class="archival-meta-tag">Source C</span>). Because the microscope was in its infancy and germ theory lay almost two centuries in the future, Sydenham had no understanding of microscopic bacteria or viruses. Consequently, outside of quinine for malaria and cool therapy for smallpox, his therapeutic repertoire remained largely traditional: he continued to prescribe regular bloodletting, mild purges, and iron tonics for gout and fevers. Sydenham transformed how diseases were observed and classified, but left everyday therapeutics fundamentally grounded in the ancient world.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1660s',
        para_ref: '[1.1–1.2]',
        heading: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
        bullets: [
          'Dismissing speculative book learning in Latin',
          'Observing real patient symptoms at the bedside',
          'Recording fever patterns and changes in pulse',
        ],
        focus_clue: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
      },
      {
        step: 2,
        date: '1676',
        para_ref: '[2.1–2.2]',
        heading: 'How did classifying diseases challenge traditional individual humoral theory?',
        bullets: [
          'Publishing landmark Observationes Medicae textbook',
          'Classifying diseases into distinct species like plants',
          'Distinguishing scarlet fever from measles',
        ],
        focus_clue: 'How did classifying diseases challenge traditional individual humoral theory?',
      },
      {
        step: 3,
        date: 'c1670s',
        para_ref: '[3.1–3.2]',
        heading: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
        bullets: [
          'Using Cinchona tree bark to cure malaria fevers',
          'Targeting specific diseases with specific chemicals',
          'Disproving the need for humoral purging',
        ],
        focus_clue: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
      },
      {
        step: 4,
        date: 'c1670s',
        para_ref: '[4.1–4.2]',
        heading: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
        bullets: [
          'Ending dangerous heated sweating rooms',
          'Prescribing light bedsheets and open fresh air',
          'Administering cooling fluids to lower fever',
        ],
        focus_clue: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
      },
      {
        step: 5,
        date: '1680s',
        para_ref: '[5.1–5.2]',
        heading: 'Why did medical treatments remain mostly medieval despite Sydenham?',
        bullets: [
          'Lacking knowledge of microscopic bacteria and germs',
          'Continuing to prescribe bloodletting and purges',
          'Facing resistance from the Royal College of Physicians',
        ],
        focus_clue: 'Why did medical treatments remain mostly medieval despite Sydenham?',
      },
    ],
    causal_domino_spine: {
      title: 'Thomas Sydenham & The Art of Bedside Observation',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1660s',
          para_ref: '[1.1–1.2]',
          title: 'Rejecting Book Learning at the Bedside',
          actor: 'Dr Thomas Sydenham (London Physician)',
          tag: '🛏️ BEDSIDE EMPIRICISM',
          trigger:
            'Dr Thomas Sydenham rejected scholastic book learning, declaring that medicine could only be mastered by direct clinical observation of patients at the bedside.',
          desc: 'Dr Thomas Sydenham rejected scholastic book learning, declaring that medicine could only be mastered by direct clinical observation of patients at the bedside.',
          connective:
            'Revived Hippocratic clinical observation, recording meticulous daily symptom histories rather than theorizing about invisible humoral fluids.',
          question: 'Why did Sydenham believe bedside observation surpassed textbook learning?',
        },
        {
          step: 2,
          date: '1676',
          para_ref: '[2.1–2.2]',
          title: 'Observationes Medicae & Disease Classification',
          actor: 'Thomas Sydenham & European Physicians',
          tag: '📖 OBSERVATIONES MEDICAE',
          trigger:
            'Sydenham published Observationes Medicae, arguing that diseases could be classified into distinct species like plants, distinguishing scarlet fever from measles.',
          desc: 'Sydenham published Observationes Medicae, arguing that diseases could be classified into distinct species like plants, distinguishing scarlet fever from measles.',
          connective:
            'Demolished the medieval belief that sickness was unique to each person’s humours, proving diseases were uniform external pathological entities.',
          question: 'How did classifying diseases challenge traditional individual humoral theory?',
        },
        {
          step: 3,
          date: 'c1670s',
          para_ref: '[3.1–3.2]',
          title: 'Quinine & Cinchona Bark for Malaria',
          actor: 'Sydenham & Thames Estuary Patients',
          tag: '🌿 CINCHONA BARK / QUININE',
          trigger:
            'Sydenham successfully deployed Cinchona bark (containing quinine) to cure malaria fevers directly without bloodletting or purging.',
          desc: 'Sydenham successfully deployed Cinchona bark (containing quinine) to cure malaria fevers directly without bloodletting or purging.',
          connective:
            'Proved that specific chemical treatments targeted specific diseases, delivering a devastating conceptual blow to Galen’s Theory of Opposites.',
          question: 'Why was the success of Peruvian bark a mortal blow to humoral balance?',
        },
        {
          step: 4,
          date: 'c1670s',
          para_ref: '[4.1–4.2]',
          title: 'Cool Therapy for Smallpox Fevers',
          actor: 'Sydenham & Smallpox Patients',
          tag: '❄️ COOL THERAPY',
          trigger:
            'Sydenham abolished the lethal traditional sweating treatment for smallpox, introducing open windows, fresh air, light sheets, and cool barley drinks.',
          desc: 'Sydenham abolished the lethal traditional sweating treatment for smallpox, introducing open windows, fresh air, light sheets, and cool barley drinks.',
          connective:
            'Drastically cut smallpox fever mortality, establishing common-sense empirical hygiene over violent scholastic interventions.',
          question: 'Why did Sydenham’s cool treatment drastically cut smallpox deaths?',
        },
        {
          step: 5,
          date: '1680s',
          para_ref: '[5.1–5.2]',
          title: 'The Limits of Sydenham’s Legacy',
          actor: 'Royal College of Physicians & Traditionalists',
          tag: '🔒 CONTINUITY IN TREATMENTS',
          trigger:
            'Conservative physicians resisted Sydenham’s ideas, while the absence of germ theory meant Sydenham still prescribed bleeding and mild purges for most illnesses.',
          desc: 'Conservative physicians resisted Sydenham’s ideas, while the absence of germ theory meant Sydenham still prescribed bleeding and mild purges for most illnesses.',
          connective:
            'Proved that while disease classification advanced dramatically, everyday medical treatments remained predominantly grounded in the medieval world.',
          question: 'Why did medical treatments remain mostly medieval despite Sydenham?',
        },
      ],
    },
  },

  lesson_2_3: {
    teacher_notes: {
      primer:
        'This enquiry examines Andreas Vesalius and the Renaissance Anatomical Revolution: how his firsthand human dissections at Padua, proof of over 300 Galenic errors, landmark publication of De Humani Corporis Fabrica (1543), and English dissemination via Thomas Geminus transformed anatomy while exposing the persistent gap between anatomical knowledge and medical cure.',
      objectives: [
        {
          objective:
            'Explain why a professor dissecting human bodies himself at Padua in 1537 was revolutionary.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Fabrica Frontispiece). Contrast the medieval lector reading Galen from a pulpit with Vesalius handling scalpel and cadaver.',
          question:
            'Why did Vesalius stepping down from the elevated pulpit to perform dissections himself shock conservative academics?',
        },
        {
          objective:
            'Analyse how Vesalius proved Galen had made over 300 anatomical mistakes by dissecting animals instead of humans.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Cite specific anatomical corrections: the jawbone (1 bone vs 2), breastbone (3 segments vs 7), liver (2 lobes vs 5), and septum pores.',
          question:
            'Why had Galen made hundreds of anatomical errors, and why had no doctor noticed them for 1,400 years?',
        },
        {
          objective:
            'Assess the significance of De Humani Corporis Fabrica (1543) as a masterpiece of Renaissance art and science.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Muscle Men Plate). Connect movable type printing with Titian’s woodcut illustrations depicting dynamic muscle layers.',
          question:
            'How did the partnership between Renaissance printing technology and Renaissance art make The Fabrica so revolutionary?',
        },
        {
          objective:
            'Evaluate how Thomas Geminus’s Compendiosa and English translations brought Vesalian anatomy to ordinary barber-surgeons.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source C. Explain how Geminus copied the copperplates and Nicholas Udall translated the text into English in 1553.',
          question:
            'Why was translating Vesalius into English essential for improving practical trauma surgery in Tudor England?',
        },
        {
          objective:
            'Explain the fierce opposition Vesalius faced and analyse why anatomical breakthroughs produced zero immediate cures.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Discuss Jacobus Sylvius’s attacks, Vesalius burning his manuscripts, and the fact that knowing bone structures cured no diseases.',
          question:
            'Why did Vesalius’s anatomical revolution fail to save a single patient’s life during the 16th century?',
        },
      ],
      source_context: {
        'Source A':
          'Frontispiece of De Humani Corporis Fabrica by Andreas Vesalius (Basel: Johannes Oporinus, 1543). Depicts a bustling Padua anatomical theatre where Vesalius stands in the center dissecting a female cadaver with his own hands, surrounded by students, city magistrates, and curious citizens. Hinge Question: How does this frontispiece visually symbolize the triumph of direct empirical observation over blind deference to medieval textual authority?',
        'Source B':
          'Vesalius Muscle Men Plate from De Humani Corporis Fabrica (1543). A famous woodcut attributed to Jan van Calcar (Titian’s workshop) depicting a standing human figure posed against a rustic Italian landscape, demonstrating progressive muscular layers with anatomical precision. Hinge Question: Why was combining forensic anatomical accuracy with dynamic Renaissance artistic realism vital for overthrowing Galen?',
        'Source C':
          'Traditional Phlebotomy Man Diagram from a late medieval surgical compendium (MS Sloane 1977). Illustrates a schematic medieval figure covered in simplistic vein markers without realistic skeletal or muscular proportion. Hinge Question: In what ways does comparing Source C with Vesalius’s Muscle Men (Source B) prove that Renaissance anatomy represented a complete break with medieval tradition?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Professor of Surgery at Padua University (1537)',
        theme_heading: 'Act 1: Professor of Surgery at Padua University (1537)',
        source: {
          id: 'source_a_fabrica_frontispiece',
          letter: 'A',
          title: 'Source A: Frontispiece of De Humani Corporis Fabrica (1543)',
          src: '/images/vesalius_fabrica_frontispiece.jpg',
          source: '/images/vesalius_fabrica_frontispiece.jpg',
          image: '/images/vesalius_fabrica_frontispiece.jpg',
          caption:
            'The monumental woodcut frontispiece of De Humani Corporis Fabrica (1543), showing Vesalius dissecting a human body in a crowded amphitheater.',
          desc: 'Title page woodcut of Vesalius dissecting a female cadaver at Padua.',
          provenance:
            'De Humani Corporis Fabrica, Basel: Johannes Oporinus, 1543. British Library (Shelfmark: C.54.k.12).',
          citation:
            'De Humani Corporis Fabrica, Basel: Johannes Oporinus, 1543. British Library (Shelfmark: C.54.k.12).',
          question:
            'How does this frontispiece visually symbolize the triumph of direct empirical observation over blind deference to medieval textual authority?',
          hinge_question:
            'How does this frontispiece visually symbolize the triumph of direct empirical observation over blind deference to medieval textual authority?',
          source_context:
            'Depicts a bustling Padua anatomical theatre where Vesalius stands in the center dissecting a female cadaver with his own hands, surrounded by students, city magistrates, and curious citizens.',
          context:
            'Depicts a bustling Padua anatomical theatre where Vesalius stands in the center dissecting a female cadaver with his own hands, surrounded by students, city magistrates, and curious citizens.',
        },
        text: '<span class="para-ref">[1.1]</span> In medieval Europe, anatomical dissection was a rare, fossilized academic ritual. In prestigious university faculties, a senior professor (lector) sat aloft in an elevated wooden pulpit, intoning Latin passages from Claudius Galen’s second-century treatises. Far below on the blood-soaked floor, an unlettered barber-surgeon (ostensor) made clumsy incisions into the decaying corpse of an executed felon, merely demonstrating what the ancient text had already declared. If a cadaver’s internal organs visibly contradicted Galen’s descriptions, professors insisted that the body was deformed or that the criminal had lived an unnatural life, never daring to question Galen’s sacred authority.<br><br><span class="para-ref">[1.2]</span> In 1537, a brilliant 23-year-old Flemish doctor, Andreas Vesalius (1514–1564), was appointed Professor of Surgery and Anatomy at the University of Padua in northern Italy. Vesalius shattered academic convention: he climbed down from the pulpit, dismissed the barber-surgeons, and carried out human dissections with his own hands before hundreds of rapt students (<span class="archival-meta-tag">Source A</span>). He argued passionately that physicians could never understand the human body through second-hand textual memorization, demanding that empirical dissection of human corpses become the primary foundation of medical education.',
      },
      {
        act: 2,
        title: 'Act 2: Proving Galen Wrong on Human Anatomy (1540)',
        theme_heading: 'Act 2: Proving Galen Wrong on Human Anatomy (1540)',
        text: '<span class="para-ref">[2.1]</span> Through years of hands-on human dissection, Vesalius made a startling discovery that shook European scholarship to its core: Claudius Galen had never dissected a human body in his entire career. Under imperial Roman pagan law, the dissection of human corpses had been strictly outlawed as desecration. Consequently, Galen had dissected Barbary apes, dogs, pigs, and sheep, falsely projecting animal anatomy directly onto the human species. For fourteen centuries, European university doctors had been worshipping the anatomy of apes while believing they were studying humanity.<br><br><span class="para-ref">[2.2]</span> Vesalius systematically compiled a catalog of over three hundred major anatomical errors in Galen’s canonical texts. Among his most famous corrections: he proved that the human lower jawbone is a single solid bone (not two bones fused together as in dogs); the human breastbone (sternum) consists of three parts (not seven segments as in apes); the human liver has two lobes (not five lobes as in pigs); and the human uterus is a simple pear-shaped chamber (not a multi-horned animal organ). Most radically, he investigated the muscular wall (septum) of the heart, proving that it was solid and contained no invisible porous holes for blood to filter through as Galen had claimed.',
      },
      {
        act: 3,
        title: 'Act 3: Publication of De Humani Corporis Fabrica (1543)',
        theme_heading: 'Act 3: Publication of De Humani Corporis Fabrica (1543)',
        source: {
          id: 'source_b_vesalius_muscle_men',
          letter: 'B',
          title: 'Source B: Vesalius Muscle Men Plate (1543)',
          src: '/images/vesalius_muscle_men.jpg',
          source: '/images/vesalius_muscle_men.jpg',
          image: '/images/vesalius_muscle_men.jpg',
          caption:
            'A famous woodcut from The Fabrica depicting a human figure posed dynamically against an Italian landscape, demonstrating muscular layers.',
          desc: 'Woodcut illustration from De Humani Corporis Fabrica showing human musculature.',
          provenance:
            'De Humani Corporis Fabrica, Basel: Johannes Oporinus, 1543. British Library (Shelfmark: C.54.k.12, p. 178).',
          citation:
            'De Humani Corporis Fabrica, Basel: Johannes Oporinus, 1543. British Library (Shelfmark: C.54.k.12, p. 178).',
          question:
            'Why was combining forensic anatomical accuracy with dynamic Renaissance artistic realism vital for overthrowing Galen?',
          hinge_question:
            'Why was combining forensic anatomical accuracy with dynamic Renaissance artistic realism vital for overthrowing Galen?',
          source_context:
            'A famous woodcut attributed to Jan van Calcar (Titian’s workshop) depicting a standing human figure posed against a rustic Italian landscape, demonstrating progressive muscular layers with anatomical precision.',
          context:
            'A famous woodcut attributed to Jan van Calcar (Titian’s workshop) depicting a standing human figure posed against a rustic Italian landscape, demonstrating progressive muscular layers with anatomical precision.',
        },
        text: '<span class="para-ref">[3.1]</span> In 1543, at the age of just twenty-eight, Vesalius published his monumental masterpiece in Basel: <em>De Humani Corporis Fabrica</em> ("On the Fabric of the Human Body"). Spanning seven lavishly printed volumes, <em>The Fabrica</em> was a triumph of Renaissance intellectual and artistic synthesis. Benefiting from Gutenberg’s movable metal printing press, the work featured over two hundred intricate woodcut illustrations engraved by master artists from the Venetian workshop of Titian, notably Jan van Calcar (<span class="archival-meta-tag">Source B</span>).<br><br><span class="para-ref">[3.2]</span> Unlike crude medieval schematic diagrams, <em>The Fabrica</em> depicted lifelike, muscular human figures posed dynamically against rustic Italian landscapes. The plates systematically peeled back superficial skin to expose deeper layers of skeletal bones, striated muscles, nerves, veins, and internal viscera with breathtaking precision. For the first time in human history, medical students across Europe possessed identical, anatomically accurate visual reference manuals, setting a permanent new standard for biological publishing.',
      },
      {
        act: 4,
        title: 'Act 4: Thomas Geminus & Dissemination in Britain (1545–1553)',
        theme_heading: 'Act 4: Thomas Geminus & Dissemination in Britain (1545–1553)',
        source: {
          id: 'source_c_traditional_phlebotomy_man',
          letter: 'C',
          title: 'Source C: Traditional Phlebotomy Man Diagram',
          src: '/images/traditional_phlebotomy_man.jpg',
          source: '/images/traditional_phlebotomy_man.jpg',
          image: '/images/traditional_phlebotomy_man.jpg',
          caption:
            'A late medieval schematic phlebotomy diagram marking vein sites, showing crude anatomical proportions compared to Vesalius.',
          desc: 'Medieval schematic diagram of veins for bloodletting.',
          provenance: 'British Library (Shelfmark: MS Sloane 1977, fol. 7r).',
          citation: 'British Library (Shelfmark: MS Sloane 1977, fol. 7r).',
          question:
            'In what ways does comparing Source C with Vesalius’s Muscle Men (Source B) prove that Renaissance anatomy represented a complete break with medieval tradition?',
          hinge_question:
            'In what ways does comparing Source C with Vesalius’s Muscle Men (Source B) prove that Renaissance anatomy represented a complete break with medieval tradition?',
          source_context:
            'Illustrates a schematic medieval figure covered in simplistic vein markers without realistic skeletal or muscular proportion.',
          context:
            'Illustrates a schematic medieval figure covered in simplistic vein markers without realistic skeletal or muscular proportion.',
        },
        text: '<span class="para-ref">[4.1]</span> Because <em>The Fabrica</em> was a massive, costly Latin folio volume, its initial readership was confined to wealthy continental university professors. However, its radical anatomical discoveries rapidly permeated Tudor England through ingenious publishing adaptations. In 1545, an Italian engraver working in London named Thomas Geminus published <em>Compendiosa Totius Anatomie Delineatio</em>, copying Vesalius’s famous woodcuts onto durable copperplate engravings. Geminus condensed the vast seven volumes into a portable manual designed for practical operating practitioners.<br><br><span class="para-ref">[4.2]</span> Most decisively, in 1553, the English scholar Nicholas Udall translated Geminus’s text into vernacular English. For the first time, ordinary English barber-surgeons and apothecaries—who possessed no Latin education—could read precise descriptions of human muscles, arteries, and bones (<span class="archival-meta-tag">Source C</span>). Geminus’s manual became an indispensable standard reference book for London surgeons, dramatically improving practical wound management and surgical confidence on battlefields and in urban workshops.',
      },
      {
        act: 5,
        title: 'Act 5: Fierce Opposition & Practical Limitations (c. 1560)',
        theme_heading: 'Act 5: Fierce Opposition & Practical Limitations (c. 1560)',
        text: '<span class="para-ref">[5.1]</span> Vesalius’s demolition of Galen provoked furious outrage across conservative medical faculties. Traditionalist physicians in Paris and London condemned him as an arrogant upstart. His former university professor, Jacobus Sylvius, published a vitriolic attack branding Vesalius an "insolent madman" whose dissections were fraudulent, arguing that if human anatomy contradicted Galen, it was because the human body had degenerate and deformed since antiquity rather than Galen being wrong. Exhausted by bitter academic vitriol, Vesalius burned his remaining research notes in disgust, resigned his professorship at Padua, and spent his remaining career as court physician to Holy Roman Emperor Charles V.<br><br><span class="para-ref">[5.2]</span> Most significantly for ordinary patients, Vesalius’s anatomical revolution suffered from a profound practical limitation: knowing the exact structure of the human skeleton and muscles did not cure disease. Vesalius could describe an inflamed appendix or a diseased lung with forensic brilliance, but he could not prevent infection, stop internal hemorrhages, or alleviate fever. Without antiseptics, anaesthetics, or germ theory, everyday treatments remained stubbornly medieval: barber-surgeons still cauterized stumps with boiling oil, and physicians still bled patients according to the Four Humours. Vesalius revolutionized anatomical science, but saved zero lives in his lifetime.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1537',
        para_ref: '[1.1–1.2]',
        heading: 'Why was a professor dissecting human bodies revolutionary in 1537?',
        bullets: [
          'Stepping down from the elevated university pulpit',
          'Dismissing uneducated barber-surgeons from dissection',
          'Handling human cadavers directly with his own hands',
        ],
        focus_clue: 'Why was a professor dissecting human bodies revolutionary in 1537?',
      },
      {
        step: 2,
        date: '1540',
        para_ref: '[2.1–2.2]',
        heading: 'How did Vesalius prove Galen had made anatomical mistakes?',
        bullets: [
          'Revealing Galen dissected Barbary apes and dogs',
          'Proving the human jawbone is one bone not two',
          'Cataloguing over three hundred major Galenic errors',
        ],
        focus_clue: 'How did Vesalius prove Galen had made anatomical mistakes?',
      },
      {
        step: 3,
        date: '1543',
        para_ref: '[3.1–3.2]',
        heading: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
        bullets: [
          'Publishing lavish woodcut plates from Titian’s workshop',
          'Depicting realistic muscle men against Italian landscapes',
          'Printing identical anatomical textbooks across Europe',
        ],
        focus_clue: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
      },
      {
        step: 4,
        date: '1545–1553',
        para_ref: '[4.1–4.2]',
        heading: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
        bullets: [
          'Engraving Thomas Geminus’s portable copperplate manual',
          'Translating Latin anatomical texts into vernacular English',
          'Putting accurate diagrams into the hands of surgeons',
        ],
        focus_clue: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
      },
      {
        step: 5,
        date: 'c1560',
        para_ref: '[5.1–5.2]',
        heading:
          'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
        bullets: [
          'Facing furious resistance from traditional Galenists',
          'Lacking anaesthetics, antiseptics, and germ theory',
          'Providing anatomical knowledge without clinical cures',
        ],
        focus_clue:
          'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
      },
    ],
    causal_domino_spine: {
      title: 'Andreas Vesalius & The Anatomical Revolution',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1537',
          para_ref: '[1.1–1.2]',
          title: 'Professor of Surgery at Padua University',
          actor: 'Andreas Vesalius (Flemish Anatomist)',
          tag: '🔬 EMPIRICAL DISSECTION',
          trigger:
            'Appointed Professor of Surgery at Padua in 1537, Andreas Vesalius stepped down from the traditional pulpit to perform human dissections with his own hands.',
          desc: 'Appointed Professor of Surgery at Padua in 1537, Andreas Vesalius stepped down from the traditional pulpit to perform human dissections with his own hands.',
          connective:
            'Broke centuries of passive academic lecturing, establishing firsthand empirical dissection as the primary foundation of medical education.',
          question: 'Why was a professor dissecting human bodies revolutionary in 1537?',
        },
        {
          step: 2,
          date: '1540',
          para_ref: '[2.1–2.2]',
          title: 'Proving Galen Wrong on Human Anatomy',
          actor: 'Andreas Vesalius & Padua Students',
          tag: '❌ 300 GALENIC ERRORS',
          trigger:
            'Vesalius proved that Galen had dissected Barbary apes and pigs rather than humans, cataloging over 300 major anatomical errors including the single human jawbone.',
          desc: 'Vesalius proved that Galen had dissected Barbary apes and pigs rather than humans, cataloging over 300 major anatomical errors including the single human jawbone.',
          connective:
            'Demolished the unquestioned authority of ancient Roman medical dogma, proving that ancient texts were fallible and must be tested against nature.',
          question: 'How did Vesalius prove Galen had made anatomical mistakes?',
        },
        {
          step: 3,
          date: '1543',
          para_ref: '[3.1–3.2]',
          title: 'Publication of De Humani Corporis Fabrica',
          actor: 'Vesalius, Johannes Oporinus & Titian’s Artists',
          tag: '📚 THE FABRICA (1543)',
          trigger:
            'In 1543, Vesalius published De Humani Corporis Fabrica in Basel, illustrated with over 200 breathtaking woodcuts by Titian’s Venetian workshop.',
          desc: 'In 1543, Vesalius published De Humani Corporis Fabrica in Basel, illustrated with over 200 breathtaking woodcuts by Titian’s Venetian workshop.',
          connective:
            'Provided European medical students with their first identical, anatomically accurate visual reference text, setting a permanent publishing standard.',
          question: 'Why was The Fabrica considered a masterpiece of Renaissance science?',
        },
        {
          step: 4,
          date: '1545–1553',
          para_ref: '[4.1–4.2]',
          title: 'Thomas Geminus & Dissemination in Britain',
          actor: 'Thomas Geminus & Nicholas Udall',
          tag: '🇬🇧 ENGLISH DISSEMINATION',
          trigger:
            'Thomas Geminus engraved copperplate copies of Vesalius’s illustrations in London (1545), translated into English by Nicholas Udall in 1553.',
          desc: 'Thomas Geminus engraved copperplate copies of Vesalius’s illustrations in London (1545), translated into English by Nicholas Udall in 1553.',
          connective:
            'Disseminated cutting-edge anatomical science directly to English barber-surgeons who could not read Latin, improving battlefield and trauma wound care.',
          question: 'How did English translations spread Vesalius’s ideas to barber-surgeons?',
        },
        {
          step: 5,
          date: 'c1560',
          para_ref: '[5.1–5.2]',
          title: 'Fierce Opposition & Practical Limitations',
          actor: 'Jacobus Sylvius & Conservative Galenists',
          tag: '🔒 LIMITS OF ANATOMY',
          trigger:
            'Conservative Galenists fiercely attacked Vesalius as an insolent madman, while knowing human anatomy produced zero immediate cures for infectious diseases.',
          desc: 'Conservative Galenists fiercely attacked Vesalius as an insolent madman, while knowing human anatomy produced zero immediate cures for infectious diseases.',
          connective:
            'Proved that while anatomical science was revolutionized, everyday patient treatments remained trapped in medieval bloodletting and herbal purging.',
          question:
            'Why did Vesalius’s anatomical discoveries fail to save sick patients immediately?',
        },
      ],
    },
  },

  lesson_2_4: {
    teacher_notes: {
      primer:
        'This enquiry examines William Harvey and the Circulation of the Blood (1628): how animal vivisection, mechanical pump calculations, the tourniquet experiment, publication of De Motu Cordis, and Malpighi’s discovery of capillaries (1661) transformed physiology while leaving clinical treatments unchanged.',
      objectives: [
        {
          objective:
            'Explain why Harvey studied cold-blooded animals and Fabricius’s vein valves to analyse the heart.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Contrast Galen’s two-blood theory with Harvey observing the slow heartbeats of frogs and snakes, and Fabricius’s valves in Padua.',
          question:
            'Why was dissecting slow-beating cold-blooded animals essential for Harvey to understand the human heartbeat?',
        },
        {
          objective:
            'Demonstrate how mathematical calculations proved Galen’s continuous blood-manufacturing theory was impossible.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Cite the calculation: 2 ounces per beat, 72 beats/min, 540 pints per hour (three times human body weight).',
          question:
            'How did Harvey use mathematical logic to prove that the liver could not possibly manufacture the body’s blood from food?',
        },
        {
          objective:
            'Analyse the tourniquet experiment and the publication of De Motu Cordis in 1628.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Vein Valve Experiments). Explain how pressing blood past valves proved veins carry blood exclusively toward the heart.',
          question:
            'How did Harvey’s simple tourniquet experiment provide undeniable physical proof of one-way blood flow?',
        },
        {
          objective:
            'Explain why conservative physicians fiercely rejected Harvey and ridiculed him as a "circulator".',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Discuss Galenist opposition, lost private patients, and the missing anatomical link between arteries and veins.',
          question:
            'Why did established university doctors find Harvey’s theory of blood circulation so threatening to their professional status?',
        },
        {
          objective:
            'Assess Marcello Malpighi’s discovery of capillaries (1661) and evaluate why Harvey’s breakthrough saved zero lives.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explore how microscopic capillaries completed the circuit, and why bloodletting continued for two centuries despite Harvey.',
          question:
            'Why did understanding that blood circulated in a closed loop fail to improve medical treatments during the Renaissance?',
        },
      ],
      source_context: {
        'Source A':
          'Vein Valve Experiments from William Harvey’s De Motu Cordis (Frankfurt, 1628). Engraving illustrating Harvey’s tourniquet demonstration on a volunteer’s forearm: compressed veins swell at valves, and stroking a vein away from the heart leaves the vessel empty, proving blood flows only toward the heart. Hinge Question: How does this simple, repeatable experiment demonstrate the triumph of empirical mechanics over 1,400 years of Galenic theory?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Dissecting Cold-Blooded Animals & Padua Foundations (c. 1615)',
        theme_heading: 'Act 1: Dissecting Cold-Blooded Animals & Padua Foundations (c. 1615)',
        text: '<span class="para-ref">[1.1]</span> For fourteen centuries, European medicine operated under Claudius Galen’s complex model of physiology. Galen taught that the human body contained two entirely separate circulatory systems with different functions. Dark venous blood, containing natural spirits, was continuously manufactured in the liver from digested food (chyle) and flowed outwards through veins to nourish body tissues, where it was completely consumed like fuel in a fire. Meanwhile, bright arterial blood, enriched with vital heat and air from the lungs, was pumped through arteries to provide life and movement. Galen insisted that blood seeped between these two systems through invisible pores in the central muscular wall (septum) of the heart.<br><br><span class="para-ref">[1.2]</span> William Harvey (1578–1657) dismantled this ancient dogma. After studying at Cambridge, Harvey traveled to the University of Padua, the leading center of European anatomical research. There, he studied under the master anatomist Hieronymus Fabricius, who had discovered tiny one-way flaps or "valves" inside human veins. While Fabricius believed these valves merely slowed down the outward rush of blood to prevent pooling in the feet, Harvey suspected they had a far more radical mechanical purpose: to ensure that blood could only ever flow in one direction—back toward the heart. Returning to England, Harvey conducted intensive laboratory vivisections on over eighty species of animals, focusing on cold-blooded creatures like frogs, toads, and snakes whose slow heartbeats allowed him to observe cardiac contractions clearly.',
      },
      {
        act: 2,
        title: 'Act 2: The Mechanical Pump & Quantitative Proof (1620s)',
        theme_heading: 'Act 2: The Mechanical Pump & Quantitative Proof (1620s)',
        text: '<span class="para-ref">[2.1]</span> Influenced by the Renaissance mechanical philosophy of the scientific revolution—which viewed nature as an intricate clockwork mechanism—Harvey reconceptualized the heart not as a mysterious spiritual furnace, but as a mechanical muscular pump. Through meticulous vivisections, he proved that the heart actively contracts during systole, forcing blood out into the arteries, rather than expanding like a sponge to suck blood in as Galen had claimed.<br><br><span class="para-ref">[2.2]</span> Harvey’s most devastating argument against Galen was mathematical. Measuring the internal capacity of the human left ventricle, he calculated that with every heartbeat, approximately two ounces of blood were forced into the aorta. At an average pulse of 72 beats per minute, the heart pumped 540 pints (nearly 300 liters) of blood into the body every single hour—three times the total weight of an average human being! It was physically impossible for the liver to manufacture this astronomical quantity of blood from food, nor could the body consume it. The only logical scientific conclusion was that the blood was not consumed at all: it was the same finite volume of blood circulating continuously in a closed, perpetual loop.',
      },
      {
        act: 3,
        title: 'Act 3: Publication of De Motu Cordis & Tourniquet Proof (1628)',
        theme_heading: 'Act 3: Publication of De Motu Cordis & Tourniquet Proof (1628)',
        source: {
          id: 'source_a_harvey_de_motu_cordis',
          letter: 'A',
          title: 'Source A: Vein Valve Experiments from De Motu Cordis (1628)',
          src: '/images/harvey_de_motu_cordis_valves.jpg',
          source: '/images/harvey_de_motu_cordis_valves.jpg',
          image: '/images/harvey_de_motu_cordis_valves.jpg',
          caption:
            'Engraving from De Motu Cordis (1628) showing Harvey’s tourniquet experiment demonstrating that vein valves allow blood to flow only toward the heart.',
          desc: 'Engraving illustrating Harvey’s vein valve experiment.',
          provenance:
            'Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus, Frankfurt: William Fitzer, 1628. British Library (Shelfmark: C.54.b.20).',
          citation:
            'Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus, Frankfurt: William Fitzer, 1628. British Library (Shelfmark: C.54.b.20).',
          question:
            'How does this simple, repeatable experiment demonstrate the triumph of empirical mechanics over 1,400 years of Galenic theory?',
          hinge_question:
            'How does this simple, repeatable experiment demonstrate the triumph of empirical mechanics over 1,400 years of Galenic theory?',
          source_context:
            'Engraving illustrating Harvey’s tourniquet demonstration on a volunteer’s forearm: compressed veins swell at valves, and stroking a vein away from the heart leaves the vessel empty, proving blood flows only toward the heart.',
          context:
            'Engraving illustrating Harvey’s tourniquet demonstration on a volunteer’s forearm: compressed veins swell at valves, and stroking a vein away from the heart leaves the vessel empty, proving blood flows only toward the heart.',
        },
        text: '<span class="para-ref">[3.1]</span> To prove that blood circulated in a single direction, Harvey devised a brilliant, elegant experiment using living human volunteers (<span class="archival-meta-tag">Source A</span>). He tied a tight ligature (tourniquet) around an arm until the arterial pulse in the wrist ceased and the hand grew pale and cold, proving that blood entered the arm through deep arteries. When he loosened the bandage slightly into a medium tightness, the arteries remained open, but the superficial surface veins were compressed. The veins swelled dramatically, and tiny nodules appeared along their length—the one-way valves discovered by Fabricius.<br><br><span class="para-ref">[3.2]</span> Harvey then used his finger to press and push blood down a vein away from the heart, between two valves. The vein remained completely empty and collapsed; blood refused to flow backwards. As soon as he released the lower finger, blood instantly rushed upwards toward the shoulder. This simple, repeatable physical demonstration proved conclusively that veins carry blood in only one direction: toward the heart. In 1628, Harvey published his complete findings in Frankfurt in his masterpiece, <em>Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus</em> ("On the Motion of the Heart and Blood in Animals").',
      },
      {
        act: 4,
        title: 'Act 4: Ridicule by ‘Galenists’ & Lost Patients (1630s–1650s)',
        theme_heading: 'Act 4: Ridicule by ‘Galenists’ & Lost Patients (1630s–1650s)',
        text: '<span class="para-ref">[4.1]</span> Harvey’s discovery met furious resistance from conservative physicians across Europe. Senior doctors refused to believe that Galen had been mistaken for over a millennium. Critics ridiculed Harvey as a "circulator" (a Latin pun meaning an irrational quack who travels in circles), and many of his wealthy private patients abandoned him, fearing his radical, unproven theories would endanger their health.<br><br><span class="para-ref">[4.2]</span> Furthermore, Harvey faced a major scientific gap that his critics ruthlessly exploited: he could not explain how blood passed from the microscopic endings of the arteries into the beginnings of the veins. Harvey theorized that tiny invisible channels must exist in body tissue, but because compound microscopes were in their infancy, he could not physically demonstrate them, leaving a frustrating anatomical gap in his complete circulatory circuit.',
      },
      {
        act: 5,
        title: 'Act 5: Marcello Malpighi Confirms Capillaries & Practical Limits (1661)',
        theme_heading: 'Act 5: Marcello Malpighi Confirms Capillaries & Practical Limits (1661)',
        text: '<span class="para-ref">[5.1]</span> The missing anatomical link was finally discovered in 1661, four years after Harvey’s death. The Italian anatomist Marcello Malpighi, using newly perfected compound microscopes, examined the thin lung tissue of a living frog. Magnified under curved glass lenses, Malpighi observed delicate, microscopic blood vessels connecting the arterial branches directly to the venous system—the capillaries. Malpighi’s microscopic discovery provided the final physical proof of Harvey’s closed circulatory loop, silencing his remaining critics forever.<br><br><span class="para-ref">[5.2]</span> Yet despite this crowning intellectual victory, Harvey’s discovery had virtually zero immediate impact on everyday medical treatment. Knowing that blood circulated did not cure fevers, heal surgical gangrene, or prevent plague. Early attempts at blood transfusion in England and France killed patients due to ignorance of blood groups, prompting Parliament to ban transfusion by law. Most tragically, despite Harvey proving that the body possessed a finite, precious circulating volume of blood, physicians—including Harvey himself—continued to prescribe aggressive bloodletting using leeches and lancets for another two hundred years. Harvey revolutionized physiology, but saved no lives during the Renaissance.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1615',
        para_ref: '[1.1–1.2]',
        heading: 'Why did Harvey study cold-blooded animals to understand the human heart?',
        bullets: [
          'Observing the slow-beating hearts of frogs and snakes',
          'Studying one-way vein valves under Fabricius at Padua',
          'Challenging Galen’s two separate blood systems',
        ],
        focus_clue: 'Why did Harvey study cold-blooded animals to understand the human heart?',
      },
      {
        step: 2,
        date: '1620s',
        para_ref: '[2.1–2.2]',
        heading: 'How did mathematical calculations prove Galen’s theory impossible?',
        bullets: [
          'Calculating two ounces of blood pumped per beat',
          'Pumping 540 pints per hour (three times body weight)',
          'Proving the liver could not manufacture this volume',
        ],
        focus_clue: 'How did mathematical calculations prove Galen’s theory impossible?',
      },
      {
        step: 3,
        date: '1628',
        para_ref: '[3.1–3.2]',
        heading: 'Why did Harvey publish his research abroad rather than in England?',
        bullets: [
          'Conducting the famous arm tourniquet experiment',
          'Publishing De Motu Cordis in Frankfurt in 1628',
          'Providing undeniable proof that blood circulates',
        ],
        focus_clue: 'Why did Harvey publish his research abroad rather than in England?',
      },
      {
        step: 4,
        date: '1630s–1650s',
        para_ref: '[4.1–4.2]',
        heading: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
        bullets: [
          'Facing ridicule by Galenists as a quack circulator',
          'Losing wealthy patients who feared radical ideas',
          'Lacking microscopes to show artery-vein connections',
        ],
        focus_clue: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
      },
      {
        step: 5,
        date: '1661',
        para_ref: '[5.1–5.2]',
        heading: 'Why was the discovery of capillaries the final proof Harvey was right?',
        bullets: [
          'Observing frog lung capillaries under Malpighi’s microscope',
          'Confirming Harvey’s closed circulatory circuit',
          'Continuing bloodletting treatments for two hundred years',
        ],
        focus_clue: 'Why was the discovery of capillaries the final proof Harvey was right?',
      },
    ],
    causal_domino_spine: {
      title: 'William Harvey & The Circulation of the Blood',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1615',
          para_ref: '[1.1–1.2]',
          title: 'Dissecting Cold-Blooded Animals & Padua Foundations',
          actor: 'William Harvey & Hieronymus Fabricius',
          tag: '🐸 ANIMAL VIVISECTION',
          trigger:
            'After studying Fabricius’s vein valves in Padua, William Harvey dissected cold-blooded frogs and snakes in London to observe cardiac contractions in slow motion.',
          desc: 'After studying Fabricius’s vein valves in Padua, William Harvey dissected cold-blooded frogs and snakes in London to observe cardiac contractions in slow motion.',
          connective:
            'Proved that the heart was a muscular mechanical pump actively expelling blood into arteries during systole, disproving Galen’s two-blood theory.',
          question: 'Why did Harvey study cold-blooded animals to understand the human heart?',
        },
        {
          step: 2,
          date: '1620s',
          para_ref: '[2.1–2.2]',
          title: 'The Mechanical Pump & Quantitative Proof',
          actor: 'William Harvey (Mathematical Calculations)',
          tag: '🧮 MATHEMATICAL PROOF',
          trigger:
            'Harvey calculated that the human heart pumps 540 pints (300 liters) of blood per hour—three times the total weight of an average adult human body.',
          desc: 'Harvey calculated that the human heart pumps 540 pints (300 liters) of blood per hour—three times the total weight of an average adult human body.',
          connective:
            'Proved mathematically that the liver could not manufacture this volume from food, proving blood must circulate continuously in a closed loop.',
          question: 'How did mathematical calculations prove Galen’s theory impossible?',
        },
        {
          step: 3,
          date: '1628',
          para_ref: '[3.1–3.2]',
          title: 'Publication of De Motu Cordis',
          actor: 'William Harvey (Frankfurt Publication)',
          tag: '📖 DE MOTU CORDIS (1628)',
          trigger:
            'Harvey conducted his famous arm tourniquet experiment, proving blood flows only towards the heart through vein valves, publishing De Motu Cordis in 1628.',
          desc: 'Harvey conducted his famous arm tourniquet experiment, proving blood flows only towards the heart through vein valves, publishing De Motu Cordis in 1628.',
          connective:
            'Delivered definitive, repeatable physical proof of blood circulation, sparking a scientific revolution in mechanical physiology across Europe.',
          question: 'Why did Harvey publish his research abroad rather than in England?',
        },
        {
          step: 4,
          date: '1630s–1650s',
          para_ref: '[4.1–4.2]',
          title: 'Ridicule by ‘Galenists’ & Lost Patients',
          actor: 'Conservative Physicians & London Elites',
          tag: '😡 MEDICAL RIDICULE',
          trigger:
            'Conservative doctors ridiculed Harvey as an irrational "circulator" and patients abandoned him, because he could not yet see microscopic capillaries.',
          desc: 'Conservative doctors ridiculed Harvey as an irrational "circulator" and patients abandoned him, because he could not yet see microscopic capillaries.',
          connective:
            'Delayed general acceptance of circulation for decades, demonstrating the stubborn entrenchment of ancient Galenic authority.',
          question: 'Why was Harvey’s discovery fiercely rejected by established doctors?',
        },
        {
          step: 5,
          date: '1661',
          para_ref: '[5.1–5.2]',
          title: 'Marcello Malpighi Confirms Capillaries',
          actor: 'Marcello Malpighi (Italian Anatomist)',
          tag: '🔬 MICROSCOPIC CAPILLARIES',
          trigger:
            'Using improved microscopes in 1661, Marcello Malpighi discovered microscopic capillaries connecting arteries to veins in a frog’s lung, confirming Harvey’s closed circulatory circuit.',
          desc: 'Using improved microscopes in 1661, Marcello Malpighi discovered microscopic capillaries connecting arteries to veins in a frog’s lung, confirming Harvey’s closed circulatory circuit.',
          connective:
            'Supplied the missing anatomical link Harvey could never see, confirming circulation beyond doubt though bloodletting continued for another two centuries.',
          question: 'Why was the discovery of capillaries the final proof Harvey was right?',
        },
      ],
    },
  },

  lesson_2_5: {
    teacher_notes: {
      primer:
        'This concluding case study examines the Great Plague of London (1665): the initial outbreak in St Giles, continuity of medieval humoral and miasma beliefs, municipal Plague Orders and household quarantine, the catastrophic slaughter of domestic dogs and cats, and mass burial pits alongside the eventual decline of the plague.',
      objectives: [
        {
          objective:
            'Explain how the 1665 plague broke out and why the rich fled while the poor suffered catastrophic mortality.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize the crowded timber slums of St Giles, the flight of King Charles II and physicians, and the vulnerability of the poor.',
          question:
            'Why did the flight of wealthy physicians leave ordinary Londoners completely defenceless during the 1665 plague?',
        },
        {
          objective:
            'Analyse why medical understanding and treatments in 1665 showed almost complete continuity with 1348.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source B (Plague Doctor). Discuss bird beak masks, smoking tobacco, pomanders, and strapping live pigeons to buboes.',
          question:
            'Why did physicians in 1665 still rely on medieval humoral and miasma treatments despite the scientific revolution?',
        },
        {
          objective:
            'Evaluate municipal government action (Mayor’s Plague Orders, Searchers, and 28-day quarantine).',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Focus on painted red crosses ("Lord have mercy upon us"), armed watchmen, Bills of Mortality, and Pest Houses.',
          question:
            'How did London’s municipal response to the 1665 plague show greater civic organization than in 1348?',
        },
        {
          objective:
            'Explain why the slaughter of 40,000 dogs and 200,000 cats was a disastrous medical mistake.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Connect the belief that animal fur carried miasma to the elimination of predators, allowing black rats and fleas to proliferate.',
          question:
            'How did civic magistrates unwittingly accelerate the spread of the plague by ordering the slaughter of dogs and cats?',
        },
        {
          objective:
            'Assess the demographic impact, night dead-carts, mass pits, and the factors that finally ended the plague.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source A (Night Burial in a Mass Plague Pit). Explore 100,000 dead, East Smithfield pits, winter frosts, and the 1666 Great Fire.',
          question:
            'Why did weather and physical clearance, rather than medical treatment, bring the Great Plague to an end?',
        },
      ],
      source_context: {
        'Source A':
          'Night Burial in a Mass Plague Pit (1665), contemporary woodcut engraving showing shrouded corpses tipped by dead-cart drivers into a colossal communal lime trench by torchlight. Hinge Question: How does this scene of nocturnal mass burial convey the breakdown of normal Christian funeral customs during the Great Plague of 1665?',
        'Source B':
          '17th-Century Plague Doctor (Schnabel von Rom), engraving by Paul Fürst (c.1656). Depicts a physician in full leather protective suit, spectacles, and a long bird-like beak mask stuffed with dried herbs to filter miasma. Hinge Question: What does this iconic plague doctor costume reveal about 17th-century beliefs concerning the transmission of epidemic disease?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Outbreak in St Giles-in-the-Fields (Spring 1665)',
        theme_heading: 'Act 1: The Outbreak in St Giles-in-the-Fields (Spring 1665)',
        text: '<span class="para-ref">[1.1]</span> In the spring of 1665, after a winter of bitter frost, bubonic plague erupted across London. Beginning in the crowded, impoverished suburban parish of St Giles-in-the-Fields, the epidemic exploded during an unusually hot, dry summer. Within weeks, the death toll escalated from dozens to thousands per week. At its catastrophic peak in September, over 7,000 people were dying every seven days. By the time the epidemic subsided in the winter frost, over 100,000 Londoners—nearly twenty percent of the city’s population—had perished.<br><br><span class="para-ref">[1.2]</span> As panic gripped the capital, King Charles II, Parliament, and wealthy aristocrats fled to the countryside. Most university-educated physicians abandoned their practices and followed the royal court, leaving ordinary citizens to face the nightmare alone. Commerce collapsed, shipping on the River Thames was quarantined, and London became an eerie city of silence, punctuated only by the mourning wails of families and the midnight rumble of dead-carts.',
      },
      {
        act: 2,
        title: 'Act 2: Continuity of Humoral & Supernatural Beliefs (Summer 1665)',
        theme_heading: 'Act 2: Continuity of Humoral & Supernatural Beliefs (Summer 1665)',
        source: {
          id: 'source_b_plague_doctor_schnabel',
          letter: 'B',
          title: 'Source B: 17th-Century Plague Doctor (Schnabel von Rom)',
          src: '/images/plague_doctor_schnabel.jpg',
          source: '/images/plague_doctor_schnabel.jpg',
          image: '/images/plague_doctor_schnabel.jpg',
          caption:
            'A 17th-century engraving by Paul Fürst depicting a plague doctor wearing a protective leather coat, spectacles, and a bird-like beak mask packed with herbs.',
          desc: 'Seventeenth-century engraving of a plague doctor in protective beak mask.',
          provenance:
            'Paul Fürst, Doctor Schnabel von Rom, Nuremberg, 1656. British Museum (Department of Prints and Drawings, 1868,0808.3373).',
          citation:
            'Paul Fürst, Doctor Schnabel von Rom, Nuremberg, 1656. British Museum (Department of Prints and Drawings, 1868,0808.3373).',
          question:
            'What does this iconic plague doctor costume reveal about 17th-century beliefs concerning the transmission of epidemic disease?',
          hinge_question:
            'What does this iconic plague doctor costume reveal about 17th-century beliefs concerning the transmission of epidemic disease?',
          source_context:
            'Depicts a physician in full leather protective suit, spectacles, and a long bird-like beak mask stuffed with dried herbs to filter miasma.',
          context:
            'Depicts a physician in full leather protective suit, spectacles, and a long bird-like beak mask stuffed with dried herbs to filter miasma.',
        },
        text: '<span class="para-ref">[2.1]</span> While municipal administration progressed, medical understanding in 1665 showed almost complete continuity with the medieval Black Death. Because the bacterium <em>Yersinia pestis</em> was unknown, physicians and magistrates remained completely ignorant of the true vector: rat fleas. Sickness was still blamed on divine wrath, unfavorable planetary alignments, and foul environmental miasma arising from open gutters and cesspools.<br><br><span class="para-ref">[2.2]</span> Doctors wore protective leather suits and grotesque bird-like beak masks (<span class="archival-meta-tag">Source B</span>) packed with dried roses, cloves, and camphor to filter out "pestilential air". Citizens carried sweet-smelling pomanders, held sponges soaked in vinegar to their noses, and burned barrels of pitch in the streets. Schoolboys at Eton were forced to smoke tobacco every morning to ward off contagion. Quack doctors made fortunes selling useless "Plague Water", while folk healers strapped plucked, living chickens or dried toads to swollen buboes to "draw out the poison". One hundred and fifty years of Renaissance anatomical discovery had produced zero change in understanding epidemic causation or effective clinical therapy.',
      },
      {
        act: 3,
        title: 'Act 3: Mayor’s Orders & Pest Houses (1665)',
        theme_heading: 'Act 3: Mayor’s Orders & Pest Houses (1665)',
        text: '<span class="para-ref">[3.1]</span> Compared to the disorganized, panicked response to the Black Death in 1348, the response of London’s local government in 1665 demonstrated a major advancement in civic public health administration. The Lord Mayor and Court of Aldermen issued strict "Plague Orders". Parishes appointed two female "Searchers of the Dead" to inspect corpses and verify the cause of death. Parishes also published weekly <em>Bills of Mortality</em>, detailing deaths parish by parish to monitor the epidemic’s spread—an early form of statistical epidemiology.<br><br><span class="para-ref">[3.2]</span> The most aggressive municipal policy was compulsory household quarantine. When plague struck a family, the entire house was boarded up and locked for 28 days. A red cross, twelve inches high, was painted on the door beneath the solemn plea: "Lord have mercy upon us". Two watchmen were assigned to every locked home—one by day and one by night—to bring food and prevent anyone from escaping. All public gatherings, theatrical performances, sports, and traditional funeral ceremonies were banned. Sufferers were transferred where possible to dedicated municipal wooden Pest Houses constructed outside the city walls to isolate infection.',
      },
      {
        act: 4,
        title: 'Act 4: Slaughter of Dogs & Smoking Tar Barrels (1665)',
        theme_heading: 'Act 4: Slaughter of Dogs & Smoking Tar Barrels (1665)',
        text: '<span class="para-ref">[4.1]</span> Believing that domestic animals carried the poisonous miasmatic contagion in their fur, the Lord Mayor ordered the mass extermination of domestic animals. Special animal catchers were employed, leading to the slaughter of over 40,000 domestic dogs and an estimated 200,000 cats across the city’s parishes.<br><br><span class="para-ref">[4.2]</span> This decision proved to be a catastrophic medical error. Slaughtering cats and dogs eliminated the natural predators of the black rat (<em>Rattus rattus</em>). With rodent predators removed, flea-carrying black rats multiplied completely unchecked throughout London’s timbered tenements, accelerating the spread of <em>Yersinia pestis</em>. Meanwhile, city constables burned barrels of pitch and sulfur day and night at street crossings, choking residents in acrid smoke without killing a single flea.',
      },
      {
        act: 5,
        title: 'Act 5: The Dead Carts & Demographic Collapse (Winter 1665–1666)',
        theme_heading: 'Act 5: The Dead Carts & Demographic Collapse (Winter 1665–1666)',
        source: {
          id: 'source_a_night_plague_burials',
          letter: 'A',
          title: 'Source A: Night Burial in a Mass Plague Pit (1665)',
          src: '/images/night_plague_burials_1665.jpg',
          source: '/images/night_plague_burials_1665.jpg',
          image: '/images/night_plague_burials_1665.jpg',
          caption:
            'A 17th-century engraving depicting night-cart orderlies dumping shrouded plague corpses into a mass lime trench by torchlight.',
          desc: 'Seventeenth-century engraving showing nocturnal plague burials in London.',
          provenance:
            'Broadside illustration from London’s Dreadful Visitation, London: E. Cotes, 1665. Wellcome Collection, London (Shelfmark: EPB 33261/B).',
          citation:
            'Broadside illustration from London’s Dreadful Visitation, London: E. Cotes, 1665. Wellcome Collection, London (Shelfmark: EPB 33261/B).',
          question:
            'How does this scene of nocturnal mass burial convey the breakdown of normal Christian funeral customs during the Great Plague of 1665?',
          hinge_question:
            'How does this scene of nocturnal mass burial convey the breakdown of normal Christian funeral customs during the Great Plague of 1665?',
          source_context:
            'Contemporary woodcut engraving showing shrouded corpses tipped by dead-cart drivers into a colossal communal lime trench by torchlight.',
          context:
            'Contemporary woodcut engraving showing shrouded corpses tipped by dead-cart drivers into a colossal communal lime trench by torchlight.',
        },
        text: '<span class="para-ref">[5.1]</span> In the climax of the disaster, traditional burials collapsed entirely. Burials were permitted only between sunset and sunrise. Dead-carts rattled through silent, deserted lanes, their drivers ringing handbells and calling into dark alleyways: "Bring out your dead!" Bodies were stripped of valuables and tipped into vast communal trenches excavated at Holywell Mount and Aldgate (<span class="archival-meta-tag">Source A</span>), where corpses were stacked five deep and coated with quicklime.<br><br><span class="para-ref">[5.2]</span> The Great Plague was eventually brought to an end not by medical science or doctor’s remedies, but by environmental forces. The bitter frosts of November and December 1665 chilled the capital, killing off the flea population and forcing black rats into dormancy. Ten months later, in September 1666, the catastrophic Great Fire of London incinerated over 13,000 rat-infested timber and thatch slums across the ancient city. Historiographically, 1665 stands as a powerful demonstration of administrative progress alongside profound medical continuity: London’s municipal governance was far more organized than in 1348, yet its doctors were as powerless to cure the biological infection as medieval monks.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'Spring 1665',
        para_ref: '[1.1–1.2]',
        heading: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
        bullets: [
          'Spreading through poor crowded London parishes',
          'Fleeing town by carriage: King Charles II and physicians',
          'Leaving poor weavers trapped behind city gates',
        ],
        focus_clue: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
      },
      {
        step: 2,
        date: 'Summer 1665',
        para_ref: '[2.1–2.2]',
        heading: 'Why did people still use 14th-century remedies in 1665?',
        bullets: [
          'Blaming planetary alignments and wrath of God',
          'Sniffing dried sponges soaked in vinegar',
          'Strapping plucked live pigeons to hot buboes',
        ],
        focus_clue: 'Why did people still use 14th-century remedies in 1665?',
      },
      {
        step: 3,
        date: '1665',
        para_ref: '[3.1–3.2]',
        heading: 'How did local government action in 1665 show greater organization than 1348?',
        bullets: [
          'Painting red crosses on barred front doors',
          'Posting armed watchmen to enforce quarantine',
          'Building wooden pest houses outside city walls',
        ],
        focus_clue: 'How did local government action in 1665 show greater organization than 1348?',
      },
      {
        step: 4,
        date: '1665',
        para_ref: '[4.1–4.2]',
        heading: 'Why was slaughtering cats and dogs a tragic medical mistake?',
        bullets: [
          'Killing forty thousand domestic dogs and cats',
          'Eliminating the natural predators of black rats',
          'Allowing plague-carrying rodent fleas to multiply',
        ],
        focus_clue: 'Why was slaughtering cats and dogs a tragic medical mistake?',
      },
      {
        step: 5,
        date: 'Winter 1665–1666',
        para_ref: '[5.1–5.2]',
        heading: 'How devastating was the demographic impact of the 1665 epidemic?',
        bullets: [
          'Calling "Bring out your dead" into empty alleys',
          'Burying one hundred thousand Londoners in mass trenches',
          'Ending the plague through winter frosts and the Great Fire',
        ],
        focus_clue: 'How devastating was the demographic impact of the 1665 epidemic?',
      },
    ],
    causal_domino_spine: {
      title: 'Continuity in Treatment & The Great Plague of London (1665)',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'Spring 1665',
          para_ref: '[1.1–1.2]',
          title: 'The Outbreak in St Giles-in-the-Fields',
          actor: 'King Charles II & London Citizens',
          tag: '🏃 FLIGHT OF THE WEALTHY',
          trigger:
            'Plague broke out in the crowded slums of St Giles-in-the-Fields in spring 1665, triggering the mass flight of King Charles II, royal courtiers, and wealthy physicians to the countryside.',
          desc: 'Plague broke out in the crowded slums of St Giles-in-the-Fields in spring 1665, triggering the mass flight of King Charles II, royal courtiers, and wealthy physicians to the countryside.',
          connective:
            'Left impoverished Londoners trapped behind city gates to face an escalating death toll that peaked at over 7,000 casualties per week in September.',
          question: 'Why did the rich flee London while the poor suffered catastrophic mortality?',
        },
        {
          step: 2,
          date: 'Summer 1665',
          para_ref: '[2.1–2.2]',
          title: 'Continuity of Humoral & Supernatural Beliefs',
          actor: 'London Physicians & Folk Healers',
          tag: '🎭 MEDICAL STAGNATION',
          trigger:
            'Without knowledge of Yersinia pestis or rat fleas, doctors wore bird masks, burned street pitch, carried pomanders, and strapped live plucked chickens to buboes.',
          desc: 'Without knowledge of Yersinia pestis or rat fleas, doctors wore bird masks, burned street pitch, carried pomanders, and strapped live plucked chickens to buboes.',
          connective:
            'Proved that 150 years of Renaissance anatomical discovery had produced zero change in understanding epidemic causation or effective clinical therapy.',
          question: 'Why did people still use 14th-century remedies in 1665?',
        },
        {
          step: 3,
          date: '1665',
          para_ref: '[3.1–3.2]',
          title: 'Mayor’s Orders & Pest Houses',
          actor: 'Lord Mayor & Searchers of the Dead',
          tag: '📜 CIVIC QUARANTINE',
          trigger:
            'The Lord Mayor issued strict Plague Orders: red crosses were painted on infected homes, armed watchmen enforced 28-day quarantine, and female Searchers checked corpses.',
          desc: 'The Lord Mayor issued strict Plague Orders: red crosses were painted on infected homes, armed watchmen enforced 28-day quarantine, and female Searchers checked corpses.',
          connective:
            'Demonstrated sophisticated civic coordination and statistical epidemiology through Bills of Mortality, marking a significant administrative advance over 1348.',
          question: 'How did local government action in 1665 show greater organization than 1348?',
        },
        {
          step: 4,
          date: '1665',
          para_ref: '[4.1–4.2]',
          title: 'Slaughter of Dogs & Smoking Tar Barrels',
          actor: 'City Magistrates & Town Constables',
          tag: '🐕 TRAGIC ANIMAL SLAUGHTER',
          trigger:
            'Believing domestic animal fur carried poisonous miasma, magistrates ordered the slaughter of 40,000 dogs and 200,000 cats, alongside burning barrels of pitch in the streets.',
          desc: 'Believing domestic animal fur carried poisonous miasma, magistrates ordered the slaughter of 40,000 dogs and 200,000 cats, alongside burning barrels of pitch in the streets.',
          connective:
            'Unintentionally wiped out the natural predators of the black rat, allowing plague-infected rodent fleas to multiply completely unchecked through crowded tenements.',
          question: 'Why was slaughtering cats and dogs a tragic medical mistake?',
        },
        {
          step: 5,
          date: 'Winter 1665–1666',
          para_ref: '[5.1–5.2]',
          title: 'The Dead Carts & East Smithfield Pits',
          actor: 'Parish Gravediggers & Dead-Cart Orderlies',
          tag: '⚰️ MASS LIME PITS',
          trigger:
            'Over 100,000 Londoners (20% of the capital) died, buried at night in mass lime pits like East Smithfield, until winter frosts killed the fleas and the Great Fire of 1666 burned the slums.',
          desc: 'Over 100,000 Londoners (20% of the capital) died, buried at night in mass lime pits like East Smithfield, until winter frosts killed the fleas and the Great Fire of 1666 burned the slums.',
          connective:
            'Proved that environmental weather and physical clearance, rather than medical intervention, brought the catastrophic epidemic to a close.',
          question: 'How devastating was the demographic impact of the 1665 epidemic?',
        },
      ],
    },
  },
};

for (let i = 6; i <= 9; i++) {
  const lesson = unitData.lessons[i];
  const updateData = RENAISSANCE_5_ACT_DATA[lesson.id];
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

const newFileContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log(
  '\n✅ Successfully migrated Key Topic 2 (Renaissance) to 5-Act Gold Standard in data.js!',
);
