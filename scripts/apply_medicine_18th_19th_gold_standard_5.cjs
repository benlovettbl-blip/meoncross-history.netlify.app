/**
 * History Revision Hub — Edexcel GCSE Medicine Through Time
 * Migration: Key Topic 3 (18th & 19th Century Britain c1700–c1900) to Gold Standard 5 Acts
 *
 * Converts Key Topic 3 lessons 3.1 through 3.5 in units/edexcel_medicine/data.js:
 * 1. Retires obsolete 3-box `note_scaffold` across all remaining lessons.
 * 2. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 3. Preserves and maps all authentic primary visual sources (Sources A, B, C, D) to their respective Acts.
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

const KT3_5_ACT_DATA = {
  lesson_3_1: {
    teacher_notes: {
      primer:
        'This enquiry explores the transformation in understanding disease causation between 1861 and 1890, tracing how Louis Pasteur’s Germ Theory disproved spontaneous generation and how Robert Koch used solid agar cultures, chemical dyes, and high-resolution photomicrography to identify specific pathogenic bacteria, overcoming deep-seated British medical skepticism.',
      objectives: [
        {
          objective:
            'Explain how spontaneous generation and miasma theory dominated medical thinking before the 1860s.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that natural philosophers believed decay produced microbes rather than microbes causing decay, and that foul atmospheric damp was blamed for epidemic fevers.',
          question:
            'Why did pre-1860s doctors believe disease created germs, rather than germs creating disease?',
        },
        {
          objective:
            'Analyse how Pasteur’s swan-neck flask experiments disproved spontaneous generation in 1861.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Edelfelt portrait of Pasteur). Guide them to explain how the curved neck allowed air to circulate while trapping airborne dust and microbes in the bend.',
          question:
            'How did the design of Pasteur’s swan-neck flask provide irrefutable proof that microbes come from the atmosphere rather than spontaneous generation?',
        },
        {
          objective:
            'Evaluate why the British medical establishment initially resisted Germ Theory during the 1860s and 1870s.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Highlight Dr Henry Bastian’s argument that bacteria were harmless bystanders in healthy bodies, and explain how John Tyndall’s light-beam experiments began shifting medical opinion.',
          question:
            'Why were British physicians like Dr Bastian so reluctant to accept that microscopic organisms caused human diseases?',
        },
        {
          objective:
            'Examine how Robert Koch’s bacteriological methods isolated specific disease-causing microbes.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Koch’s microphotographs of tuberculosis). Focus on his breakthrough innovations: solid seaweed agar in Petri dishes, methyl violet aniline dyes, oil-immersion lenses, and camera attachments.',
          question:
            'How did Koch’s use of solid agar jelly and synthetic chemical dyes solve the limitations of Pasteur’s liquid culture broths?',
        },
        {
          objective:
            'Assess Koch’s Postulates, photomicrography, and the diagnostic-therapeutic lag in late Victorian Britain.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Emphasize that while Koch and Pasteur revolutionized the understanding of disease causes and inspired prevention (Listerism, water filtration), effective cures and antibiotics lagged decades behind.',
          question:
            'Why did identifying the specific bacteria for tuberculosis and cholera fail to produce immediate medical cures for Victorian patients?',
        },
      ],
      source_context: {
        'Source A':
          'Louis Pasteur in his Laboratory (1885) by Albert Edelfelt. Oil on canvas depicting Pasteur examining a phial containing the spinal cord of a rabid rabbit in his laboratory at the École Normale Supérieure, surrounded by experimental glassware. Hinge Question: How does this portrait depict the shift from abstract medical philosophy to meticulous laboratory science?',
        'Source B':
          'Robert Koch’s Microphotographs of Tuberculosis (1882). Tafel XXVI from Die Aetiologie der Tuberkulose, showing Mycobacterium tuberculosis stained with aniline methyl violet dye within infected lung tissue. Hinge Question: Why did producing clear, reproducible visual evidence of specific bacteria succeed in convincing skeptical British doctors where Pasteur’s theoretical papers had failed?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Spontaneous Generation & Miasma Orthodoxy (c1700–1850s)',
        theme_heading: 'Act 1: Spontaneous Generation & Miasma Orthodoxy (c1700–1850s)',
        text: '<span class="para-ref">[1.1]</span> At the dawn of the 1860s, European understanding of disease causation was mired in intellectual confusion. While Antonie van Leeuwenhoek had observed microscopic "animalcules" in 1676, natural philosophers assumed these organisms were harmless oddities. The dominant scientific paradigm remained <em>Spontaneous Generation</em>—the belief that rotting matter naturally generated living microbes out of decay, just as rotting meat appeared to spawn flies and maggots. Furthermore, the medical profession clung tenaciously to <em>miasma theory</em>, maintaining that poisonous, foul-smelling vapors rising from cesspools and decomposing organic matter poisoned the blood.<br><br><span class="para-ref">[1.2]</span> In 1859, the French Academy of Sciences offered the prestigious Alhumbert Prize to anyone who could solve the mystery of spontaneous generation through definitive, repeatable experimentation. The challenge was accepted by Louis Pasteur, an energetic French chemist working at the University of Lille. Hired by industrial manufacturers whose beer, wine, and milk were spoiling, Pasteur made the crucial observation that fermentation was caused by living microscopic yeasts, while souring was caused by lactic acid microbes. Pasteur hypothesized that microbes did not generate spontaneously from liquids, but were living organisms carried invisibly through the atmosphere.',
      },
      {
        act: 2,
        title: 'Act 2: Louis Pasteur & The Germ Theory Breakthrough (1861)',
        theme_heading: 'Act 2: Louis Pasteur & The Germ Theory Breakthrough (1861)',
        source: {
          id: 'source_a_pasteur_lab',
          letter: 'A',
          title: 'Source A: Louis Pasteur in his Laboratory (1885) by Albert Edelfelt',
          src: '/images/pasteur_lab.jpg',
          source: '/images/pasteur_lab.jpg',
          image: '/images/pasteur_lab.jpg',
          caption:
            "Albert Edelfelt's celebrated 1885 portrait depicting Louis Pasteur examining a phial in his laboratory at the École Normale Supérieure in Paris, surrounded by experimental glassware.",
          desc: '19th-century portrait of French chemist Louis Pasteur in his Paris laboratory.',
          provenance:
            'Oil on canvas by Albert Edelfelt, 1885. Musée d’Orsay, Paris (Accession No. RF 1982-12).',
          citation:
            'Oil on canvas by Albert Edelfelt, 1885. Musée d’Orsay, Paris (Accession No. RF 1982-12).',
          question:
            'How does this portrait depict the shift from abstract medical philosophy to meticulous laboratory science?',
          hinge_question:
            'Study Pasteur intently examining a glass phial under natural window light, surrounded by delicate glassware and observation notebooks. How does this portrait depict the shift from abstract medical philosophy to meticulous laboratory science?',
          source_context:
            'Pasteur began his career as an industrial chemist solving fermentation problems for French wine and beer producers. In his Paris laboratory, surrounded by precision glassware and swan-neck flasks, Pasteur proved that fermentation and putrefaction were caused by living microscopic organisms, not spontaneous generation.',
          context:
            'Pasteur began his career as an industrial chemist solving fermentation problems for French wine and beer producers. In his Paris laboratory, surrounded by precision glassware and swan-neck flasks, Pasteur proved that fermentation and putrefaction were caused by living microscopic organisms, not spontaneous generation.',
        },
        text: '<span class="para-ref">[2.1]</span> In 1861, Pasteur conducted his legendary series of experiments before the French Academy in Paris, publicly dueling with Félix Pouchet, director of the Rouen Natural History Museum and a fierce champion of spontaneous generation. Pasteur prepared nutrient yeast broths inside glass flasks, heating them to boiling point to destroy all pre-existing microbial life. Crucially, using a blowpipe, Pasteur drew out the long glass necks of the flasks into elegant, curving S-shapes (<span class="archival-meta-tag">Source A</span>). Air was permitted to circulate freely into the flask through the open end, but airborne dust particles, fungal spores, and bacteria were trapped by gravity and condensation in the downward dip of the curve.<br><br><span class="para-ref">[2.2]</span> The results were conclusive: the nutrient broth inside the swan-neck flasks remained sterile, fresh, and crystal clear indefinitely. However, if the neck was snapped off, or the flask was tilted so the liquid washed into the bend and drew back, microbes multiplied at astonishing speed, turning the broth turbid and rotten within hours. In 1861, Pasteur published his historic <em>Germ Theory</em>, formulating two revolutionary conclusions: first, life only arises from pre-existing life; second, microscopic airborne organisms cause fermentation and decay. Pasteur then made the daring intellectual leap: if invisible microbes could turn wine sour, they could also invade the tissues of human beings and cause contagious disease.',
      },
      {
        act: 3,
        title: 'Act 3: British Scepticism & John Tyndall (1867–1876)',
        theme_heading: 'Act 3: British Scepticism & John Tyndall (1867–1876)',
        text: '<span class="para-ref">[3.1]</span> Despite Pasteur’s brilliance, his Germ Theory encountered formidable resistance in Britain. Pasteur was an industrial chemist, not a qualified physician; while he proved microbes caused beer to turn sour, he had not proven which specific germ caused which specific human disease. Powerful British authorities—led by Dr Henry Charlton Bastian, Professor of Pathological Anatomy at University College London—violently opposed Germ Theory through the 1870s. In the <em>British Medical Journal</em>, Bastian pointed out that because transparent bacteria lived habitually inside healthy human throats and intestines, it was absurd to blame them for lethal epidemics.<br><br><span class="para-ref">[3.2]</span> British medical skepticism began to erode thanks to the Irish physicist John Tyndall. Conducting precision light-beam experiments in sealed optical chambers between 1869 and 1876, Tyndall demonstrated that dust-free air never produced bacterial growth, while ordinary atmospheric dust teemed with living bacterial spores. Tyndall gave public lectures to the Royal Society and British medical associations, bridging the gap between French chemical physics and British medical pathology and providing vital physical proof for Pasteur’s theory.',
      },
      {
        act: 4,
        title: 'Act 4: Robert Koch & Specific Bacteria (1876–1882)',
        theme_heading: 'Act 4: Robert Koch & Specific Bacteria (1876–1882)',
        source: {
          id: 'source_b_koch_bacteria',
          letter: 'B',
          title: 'Source B: Robert Koch’s Microphotographs of Tuberculosis (1882)',
          src: '/images/koch_bacteria.jpg',
          source: '/images/koch_bacteria.jpg',
          image: '/images/koch_bacteria.jpg',
          caption:
            "Tafel XXVI from Robert Koch's landmark publication Die Aetiologie der Tuberkulose, showing Mycobacterium tuberculosis stained with aniline methyl violet dye within infected lung tissue.",
          desc: '1882 medical microphotographs of tuberculosis bacteria by Robert Koch.',
          provenance:
            'Tafel XXVI, Die Aetiologie der Tuberkulose, Dr Robert Koch, Berliner Klinische Wochenschrift, No. 15, 10 April 1882. Wellcome Collection, London (Iconographic Coll. L0022359).',
          citation:
            'Tafel XXVI, Die Aetiologie der Tuberkulose, Dr Robert Koch, Berliner Klinische Wochenschrift, No. 15, 10 April 1882. Wellcome Collection, London (Iconographic Coll. L0022359).',
          question:
            'Why did producing clear, reproducible visual evidence of specific bacteria succeed in convincing skeptical British doctors where Pasteur’s theoretical papers had failed?',
          hinge_question:
            'Robert Koch stained Mycobacterium tuberculosis using methyl violet dye and captured these images under a microscope. Why did producing clear, reproducible visual evidence of specific bacteria succeed in convincing skeptical British doctors where Pasteur’s theoretical papers had failed?',
          source_context:
            'In 1882, Robert Koch announced the discovery of the tuberculosis bacillus to the Berlin Physiological Society. Koch’s microphotographs provided indisputable visual proof that a specific, physical microorganism caused consumption, permanently destroying miasma theory.',
          context:
            'In 1882, Robert Koch announced the discovery of the tuberculosis bacillus to the Berlin Physiological Society. Koch’s microphotographs provided indisputable visual proof that a specific, physical microorganism caused consumption, permanently destroying miasma theory.',
        },
        text: '<span class="para-ref">[4.1]</span> The diagnostic deadlock was broken by Robert Koch, a meticulous country doctor working in Imperial Germany. Koch transformed microbiology into an exact forensic science through four breakthrough innovations: first, using solid culture media (nutrient agar jelly derived from seaweed in flat glass Petri dishes) instead of contaminated liquid broths, allowing pure, isolated bacterial colonies to be grown; second, staining transparent microbes with synthetic industrial aniline dyes (methyl violet and methylene blue), making bacteria stand out sharply against human tissue; third, fitting Zeiss compound microscopes with precision oil-immersion lenses; and fourth, photographing bacterial specimens with camera attachments (<span class="archival-meta-tag">Source B</span>), producing permanent, irrefutable photographic evidence.<br><br><span class="para-ref">[4.2]</span> Between 1876 and 1882, Koch and his disciples isolated the specific causative bacterial pathogens for anthrax (1876), wound infections (1878), and deadly human tuberculosis (1882). Koch formulated his celebrated <em>Four Postulates</em>: rules to prove a specific microbe causes a specific disease. Koch shifted medicine from vague guesswork to targeted bacteriological identification.',
      },
      {
        act: 5,
        title: 'Act 5: Koch’s Postulates, Photomicrography & The Fall of Miasma (1883–1890)',
        theme_heading:
          'Act 5: Koch’s Postulates, Photomicrography & The Fall of Miasma (1883–1890)',
        text: '<span class="para-ref">[5.1]</span> In 1883, Koch traveled to Egypt and India to isolate the comma-shaped <em>Vibrio cholerae</em> bacterium in contaminated drinking water, providing visual proof of John Snow\'s earlier deductions. Scottish surgeon William Watson Cheyne translated Koch’s bacteriological treatises into English, while Koch\'s high-resolution photomicrographs circulated among British medical faculties. Faced with undeniable photographic evidence of microbes invading human tissue, Dr Bastian\'s anti-contagionist arguments collapsed, and the British medical establishment abandoned miasma theory forever.<br><br><span class="para-ref">[5.2]</span> Historiographically, historians emphasize the <em>Diagnostic-Therapeutic Lag</em>: while Pasteur and Koch revolutionized the scientific understanding of disease *causation*, their work produced few immediate treatments. Isolating the tuberculosis bacillus in 1882 did not cure a single patient dying of consumption, because effective antibiotics (streptomycin) lay sixty years in the future. The immediate practical fruit of Germ Theory lay in prevention: it validated Joseph Lister’s antiseptic carbolic techniques, guided municipal sewer engineering, and enabled Pasteur to engineer lab-attenuated vaccines for chicken cholera (1879), anthrax (1881), and rabies (1885). Together, Pasteur and Koch had destroyed two millennia of humoural theory and established modern scientific medicine.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1700–1850s',
        para_ref: '[1.1–1.2]',
        heading: 'Why did doctors believe disease created germs, rather than vice versa?',
        bullets: [
          'Smelling rotting meat and open cesspools',
          'Foul airborne damp blamed for illness',
          'Microscopes seeing tiny swimming creatures',
        ],
        focus_clue: 'Why did doctors believe disease created germs, rather than vice versa?',
      },
      {
        step: 2,
        date: '1861',
        para_ref: '[2.1–2.2]',
        heading: 'How did the swan-neck flask disprove spontaneous generation?',
        bullets: [
          'Heating sour beer inside glass flasks',
          'Bent swan necks trapping airborne dust',
          'Boiled broth staying clear and fresh',
        ],
        focus_clue: 'How did the swan-neck flask disprove spontaneous generation?',
      },
      {
        step: 3,
        date: '1867–1876',
        para_ref: '[3.1–3.2]',
        heading: 'Why did British doctors refuse to believe germs caused human illness?',
        bullets: [
          'London doctors defending bad air theory',
          'Shining light beams through dusty boxes',
          'Spraying smelly carbolic acid on cut flesh',
        ],
        focus_clue: 'Why did British doctors refuse to believe germs caused human illness?',
      },
      {
        step: 4,
        date: '1876–1882',
        para_ref: '[4.1–4.2]',
        heading: 'How did Koch’s staining and culture methods prove specificity?',
        bullets: [
          'Solid seaweed agar jelly in shallow dishes',
          'Staining microbes with bright purple dyes',
          'Photographing deadly tuberculosis under glass lenses',
        ],
        focus_clue: 'How did Koch’s staining and culture methods prove specificity?',
      },
      {
        step: 5,
        date: '1883–1890',
        para_ref: '[5.1–5.2]',
        heading: 'Why was photomicrography crucial in winning British doctors over?',
        bullets: [
          'Tracking curved cholera germs in river water',
          'Taking crisp black-and-white photos of germs',
          'Injecting farm animals to test poisons',
        ],
        focus_clue: 'Why was photomicrography crucial in winning British doctors over?',
      },
    ],
    causal_domino_spine: {
      title: 'Ideas on Causes: Pasteur’s Germ Theory & Koch’s Bacteriology',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1700–1850s',
          para_ref: '[1.1–1.2]',
          title: 'Spontaneous Generation & Miasma Orthodoxy',
          actor: 'Anti-Contagionist Doctors & Miasma Believers',
          tag: '🌫️ SPONTANEOUS GENERATION',
          trigger:
            'Before the 1860s, orthodox medical doctrine held that disease produced microscopic organisms spontaneously from rotting matter, believing atmospheric miasma caused epidemic fevers.',
          desc: 'Before the 1860s, orthodox medical doctrine held that disease produced microscopic organisms spontaneously from rotting matter, believing atmospheric miasma caused epidemic fevers.',
          connective:
            'Prevented physicians from searching for external microbial pathogens, delaying sanitary reform and targeted antimicrobial therapies for generations.',
          question: 'Why did doctors believe disease created germs, rather than vice versa?',
        },
        {
          step: 2,
          date: '1861',
          para_ref: '[2.1–2.2]',
          title: 'Louis Pasteur & Germ Theory Breakthrough',
          actor: 'Louis Pasteur (French Chemist)',
          tag: '🧪 SWAN-NECK FLASKS',
          trigger:
            'Louis Pasteur conducted swan-neck flask experiments on fermenting wine and beer, demonstrating that sterile liquids only rotted when exposed to airborne dust particles.',
          desc: 'Louis Pasteur conducted swan-neck flask experiments on fermenting wine and beer, demonstrating that sterile liquids only rotted when exposed to airborne dust particles.',
          connective:
            'Disproved spontaneous generation scientifically in 1861, publishing Germ Theory to prove that microscopic living organisms cause biological decay and fermentation.',
          question: 'How did the swan-neck flask disprove spontaneous generation?',
        },
        {
          step: 3,
          date: '1867–1876',
          para_ref: '[3.1–3.2]',
          title: 'British Scepticism & John Tyndall',
          actor: 'Dr Henry Bastian & John Tyndall',
          tag: '🔬 BRITISH SCEPTICISM',
          trigger:
            'Prominent London physicians led by Dr Henry Bastian vehemently rejected Pasteur’s findings, dismissing him as a mere chemist and insisting germs were harmless bystanders in human tissue.',
          desc: 'Prominent London physicians led by Dr Henry Bastian vehemently rejected Pasteur’s findings, dismissing him as a mere chemist and insisting germs were harmless bystanders in human tissue.',
          connective:
            'Delayed British acceptance until physicist John Tyndall delivered lectures demonstrating airborne bacterial dust, bridging French chemistry and British medical pathology.',
          question: 'Why did British doctors refuse to believe germs caused human illness?',
        },
        {
          step: 4,
          date: '1876–1882',
          para_ref: '[4.1–4.2]',
          title: 'Robert Koch & Specific Bacteria',
          actor: 'Robert Koch (German Doctor & Bacteriologist)',
          tag: '🧫 SOLID AGAR CULTURES',
          trigger:
            'Robert Koch pioneered revolutionary laboratory methods, cultivating pure bacterial colonies on solid seaweed agar jelly and staining transparent microbes with synthetic methyl violet aniline dyes.',
          desc: 'Robert Koch pioneered revolutionary laboratory methods, cultivating pure bacterial colonies on solid seaweed agar jelly and staining transparent microbes with synthetic methyl violet aniline dyes.',
          connective:
            'Isolated the specific bacterial pathogens for anthrax (1876) and deadly human tuberculosis (1882), establishing the scientific discipline of medical bacteriology.',
          question: 'How did Koch’s staining and culture methods prove specificity?',
        },
        {
          step: 5,
          date: '1883–1890',
          para_ref: '[5.1–5.2]',
          title: 'Koch’s Postulates & Photomicrography',
          actor: 'Robert Koch & Microbe Hunters',
          tag: '📷 HIGH-RESOLUTION PHOTOMICROGRAPHY',
          trigger:
            'Koch isolated the comma-shaped Vibrio cholerae bacterium in 1883, formulated his 4 Postulates for proving causal pathogen links, and took sharp, indisputable photomicrographs.',
          desc: 'Koch isolated the comma-shaped Vibrio cholerae bacterium in 1883, formulated his 4 Postulates for proving causal pathogen links, and took sharp, indisputable photomicrographs.',
          connective:
            'Provided visual, irrefutable empirical evidence that finally convinced the British medical establishment to abandon miasma theory forever and invest in municipal bacteriology laboratories.',
          question: 'Why was photomicrography crucial in winning British doctors over?',
        },
      ],
    },
  },

  lesson_3_2: {
    teacher_notes: {
      primer:
        'This enquiry examines Edward Jenner’s pioneering development of the smallpox vaccine in 1796, analyzing how empirical testing of rural folklore replaced dangerous variolation, evaluating why London physicians and church leaders resisted vaccination, and tracing how state funding and compulsory legislation eventually eradicated smallpox.',
      objectives: [
        {
          objective:
            'Explain the devastating threat of smallpox and the severe dangers of variolation (inoculation).',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that smallpox killed 40,000 Britons annually, and explain that variolation could trigger full-blown fatal epidemics and was an expensive commercial luxury.',
          question:
            'Why was smallpox variolation considered both dangerous and inaccessible for working-class Victorian families?',
        },
        {
          objective:
            'Analyse how Jenner used scientific experimentation to test Gloucestershire dairy folklore.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Northcote portrait of Jenner). Guide them through his empirical procedure: scraping cowpox pus from Sarah Nelmes, inoculating James Phipps, and verifying immunity with virulent smallpox.',
          question:
            'How did Jenner’s experiment on James Phipps move beyond casual folklore into rigorous scientific proof?',
        },
        {
          objective:
            'Evaluate the medical, financial, and religious reasons why vaccination faced fierce opposition.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Gillray’s satirical cartoon The Cow-Pock). Discuss commercial inoculators protecting fees, pulpits denouncing beast matter, and conservative Royal Society skepticism.',
          question:
            'Why did London inoculators and church preachers join together to oppose Jenner’s cowpox vaccine?',
        },
        {
          objective:
            'Explain why the British Parliament abandoned laissez-faire to fund and regulate vaccination.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on the parliamentary grants (£10,000 in 1802, £20,000 in 1807), the foundation of the Royal Jennerian Society, and the 1840 Vaccination Act outlawing variolation.',
          question:
            'Why did the British government decide to intervene financially and legally in smallpox vaccination despite its traditional laissez-faire principles?',
        },
        {
          objective:
            'Assess the impact of compulsory vaccination acts and explain why Jenner’s discovery remained an empirical anomaly.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast the dramatic decline in smallpox deaths with the rise of the Anti-Vaccination League, and emphasize that without Germ Theory, Jenner could not adapt vaccination to other diseases.',
          question:
            'Why was Jenner unable to use his smallpox breakthrough to create vaccines for other killer diseases like cholera or typhoid?',
        },
      ],
      source_context: {
        'Source A':
          'Portrait of Dr Edward Jenner (1802) by James Northcote RA. Oil on canvas showing Jenner resting against an English oak tree with dairy cattle and a milkmaid visible in the Gloucestershire countryside. Hinge Question: Why did Jenner’s countryside observations of dairymaids and cowpox prove more revolutionary than the book-learning of London’s elite physicians?',
        'Source B':
          'James Gillray: The Cow-Pock or the Wonderful Effects of the New Inoculation! (1802). Satirical hand-coloured etching showing Jenner vaccinating patients at the Smallpox Hospital while miniature cows sprout from their flesh. Hinge Question: What specific commercial and religious anxieties does this caricature reveal about public opposition to vaccination?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Scourge of Smallpox & Risky Variolation (1721–1795)',
        theme_heading: 'Act 1: The Scourge of Smallpox & Risky Variolation (1721–1795)',
        text: '<span class="para-ref">[1.1]</span> Throughout the eighteenth century, smallpox (*Variola major*) was the most terrifying epidemic killer in Britain. An airborne viral infection that spread effortlessly through crowded tenements, smallpox killed an estimated 40,000 people in Britain every year, claiming the lives of one in three newborn infants. Victims suffered agonizing fevers, severe vomiting, and erupted into thousands of fluid-filled pustules that fused together across the body. Those who survived were often left blind, disfigured, or permanently scarred with grotesque pitted pockmarks.<br><br><span class="para-ref">[1.2]</span> The only known protection was *inoculation* (or variolation), brought to Britain from Turkey in 1721 by aristocrat Lady Mary Wortley Montagu. Inoculation involved using a lancet to scrape live, infectious smallpox pus from a sick patient’s pustule directly into a cut on a healthy person’s arm. While patients frequently survived with a milder infection and gained lifelong immunity, the procedure was fraught with mortal peril: roughly 2% to 3% of inoculated patients died from full-blown smallpox, and inoculated individuals became highly contagious vectors who ignited fresh community epidemics. Furthermore, commercial inoculators like the Sutton and Dimsdale families charged extortionate fees (up to 20 guineas), making prevention a luxury monopoly reserved exclusively for the wealthy.',
      },
      {
        act: 2,
        title: 'Act 2: Edward Jenner & The Cowpox Vaccine (1796–1798)',
        theme_heading: 'Act 2: Edward Jenner & The Cowpox Vaccine (1796–1798)',
        source: {
          id: 'source_a_jenner_portrait',
          letter: 'A',
          title: 'Source A: Portrait of Dr Edward Jenner (1802) by James Northcote RA',
          src: '/images/edward_jenner.jpg',
          source: '/images/edward_jenner.jpg',
          image: '/images/edward_jenner.jpg',
          caption:
            'Portrait of Edward Jenner resting against an English oak tree in the Gloucestershire countryside, with dairy cattle and a milkmaid visible in the rural background.',
          desc: '1802 oil portrait of Dr Edward Jenner by James Northcote.',
          provenance:
            'Oil on canvas by James Northcote RA, 1802. National Portrait Gallery, London (NPG 62).',
          citation:
            'Oil on canvas by James Northcote RA, 1802. National Portrait Gallery, London (NPG 62).',
          question:
            'Why did Jenner’s countryside observations of dairymaids and cowpox prove more revolutionary than the book-learning of London’s elite physicians?',
          hinge_question:
            'Notice Dr Jenner resting his arm upon an oak tree while dairy cows and a milkmaid carry milk pails in the background. Why did Jenner’s countryside observations of dairymaids and cowpox prove more revolutionary than the book-learning of London’s elite physicians?',
          source_context:
            'Edward Jenner practiced as a country doctor in Berkeley, Gloucestershire. By listening carefully to local dairymaids who claimed their previous cowpox infections made them immune to smallpox, Jenner conducted empirical field observations rather than relying on London medical dogma.',
          context:
            'Edward Jenner practiced as a country doctor in Berkeley, Gloucestershire. By listening carefully to local dairymaids who claimed their previous cowpox infections made them immune to smallpox, Jenner conducted empirical field observations rather than relying on London medical dogma.',
        },
        text: '<span class="para-ref">[2.1]</span> In the rural Vale of Berkeley in Gloucestershire, country physician Dr Edward Jenner (<span class="archival-meta-tag">Source A</span>) observed a long-standing piece of local dairy folklore: milkmaids who contracted cowpox (*vaccinia*)—a mild, localized blistering disease caught from cows’ udders—never contracted lethal smallpox during regional epidemics. Unlike smallpox, cowpox was entirely harmless to humans, causing only mild blisters on the hands and fingers.<br><br><span class="para-ref">[2.2]</span> Jenner determined to subject this folk belief to rigorous scientific testing. On 14 May 1796, Jenner extracted pus from a fresh cowpox vesicle on the hand of dairymaid Sarah Nelmes and scratched it into the arm of eight-year-old James Phipps, the son of Jenner’s impoverished gardener. Phipps developed a slight fever and a mild cowpox scab, recovering within days. Six weeks later, Jenner performed the crucial, high-stakes trial: he deliberately inoculated Phipps with active, lethal smallpox matter taken from a diseased patient. Just as Jenner predicted, Phipps developed no symptoms of smallpox whatsoever; the benign animal disease had stimulated complete protective immunity. Jenner repeated the trial on twenty-three other patients, confirming that cowpox vaccination was safe, effective, and completely non-fatal.',
      },
      {
        act: 3,
        title: 'Act 3: Medical Opposition & Religious Resistance (1798–1810s)',
        theme_heading: 'Act 3: Medical Opposition & Religious Resistance (1798–1810s)',
        source: {
          id: 'source_b_cow_pock_gillray',
          letter: 'B',
          title:
            'Source B: James Gillray: The Cow-Pock or the Wonderful Effects of the New Inoculation! (1802)',
          src: '/images/cow_pock_gillray.jpg',
          source: '/images/cow_pock_gillray.jpg',
          image: '/images/cow_pock_gillray.jpg',
          caption:
            "James Gillray's satirical cartoon showing Edward Jenner administering cowpox vaccine at the Smallpox Hospital, while terrified patients sprout cows from their bodies.",
          desc: '1802 satirical caricature by James Gillray attacking smallpox vaccination.',
          provenance:
            'Hand-coloured satirical etching by James Gillray, published by Hannah Humphrey, London, 12 June 1802. British Museum (BM Satires 9924) / Wellcome Collection V0011116.',
          citation:
            'Hand-coloured satirical etching by James Gillray, published by Hannah Humphrey, London, 12 June 1802. British Museum (BM Satires 9924) / Wellcome Collection V0011116.',
          question:
            'What specific commercial and religious anxieties does this caricature reveal about public opposition to vaccination?',
          hinge_question:
            'James Gillray satirizes Edward Jenner inoculating a patient while miniature cows sprout from the patients’ limbs and faces. What specific commercial and religious anxieties does this caricature reveal about public opposition to vaccination?',
          source_context:
            'Published in London in 1802, Gillray’s satire reflected fierce public paranoia and medical opposition fueled by commercial inoculators and religious preachers who argued that injecting matter from beasts into humans violated God’s divine law.',
          context:
            'Published in London in 1802, Gillray’s satire reflected fierce public paranoia and medical opposition fueled by commercial inoculators and religious preachers who argued that injecting matter from beasts into humans violated God’s divine law.',
        },
        text: '<span class="para-ref">[3.1]</span> In 1798, Jenner privately published his findings in a landmark treatise: <em>An Inquiry into the Causes and Effects of the Variolae Vaccinae</em>, naming the procedure *vaccination* after *vacca*, the Latin word for cow. Jenner’s treatise presented detailed case histories and colour illustrations showing that cowpox could be passed safely from arm to arm without losing its potency.<br><br><span class="para-ref">[3.2]</span> Despite its obvious lifesaving potential, Jenner’s discovery provoked ferocious, sustained opposition from three entrenched factions: first, commercial inoculators and London physicians, who feared the loss of their lucrative variolation monopoly and spread rumors that cowpox was ineffective; second, religious preachers, who thundered from church pulpits that injecting disease matter from a "brute beast" into human veins was an ungodly abomination that interfered with God’s divine punishment for sin; and third, the conservative scientific establishment. The Royal Society initially refused to publish Jenner’s paper because he could not explain *why* cowpox conferred immunity. Furthermore, sensational anti-vaccination caricatures—most famously James Gillray’s 1802 print <em>The Cow-Pock</em> (<span class="archival-meta-tag">Source B</span>)—stoked visceral public panic by depicting vaccinated citizens sprouting horns, tails, and full-grown cows from their flesh.',
      },
      {
        act: 4,
        title: 'Act 4: Parliamentary Grants & The 1840 Vaccination Act (1802–1840)',
        theme_heading: 'Act 4: Parliamentary Grants & The 1840 Vaccination Act (1802–1840)',
        text: '<span class="para-ref">[4.1]</span> Despite the fury of anti-vaccine campaigners, empirical mortality statistics rapidly proved vaccination’s overwhelming superiority. In 1803, the Royal Jennerian Society was founded in London to provide free vaccinations; Napoleon had the entire French army vaccinated and struck a commemorative medal in Jenner’s honour. Recognizing that smallpox devastated the national workforce, the British Parliament abandoned its strict *laissez-faire* stance to award Jenner £10,000 in 1802 and a further £20,000 in 1807 to fund public distribution.<br><br><span class="para-ref">[4.2]</span> State involvement expanded decisively in 1840 with the passing of the landmark Vaccination Act. The Act outlawed the dangerous practice of variolation (smallpox inoculation) entirely, making it a criminal offence. Furthermore, it provided free infant cowpox vaccination funded out of local poor-law rates, ensuring that impoverished working-class families could protect their children without paying private medical fees.',
      },
      {
        act: 5,
        title: 'Act 5: Compulsory Vaccination & The Anti-Vaccination League (1852–1871)',
        theme_heading: 'Act 5: Compulsory Vaccination & The Anti-Vaccination League (1852–1871)',
        text: '<span class="para-ref">[5.1]</span> Over the following decades, the British government steadily tightened state enforcement: the 1852 Compulsory Vaccination Act made infant vaccination legally mandatory within three months of birth, and the 1867 Vaccination Act introduced strict financial fines and imprisonment for non-compliant parents. In response, working-class communities formed the Anti-Vaccination League, marching in mass demonstrations in Leicester and London against what they denounced as medical tyranny and infringement on bodily autonomy.<br><br><span class="para-ref">[5.2]</span> Despite civil liberties protests, compulsory vaccination caused national smallpox deaths to plummet from over 40,000 per decade to virtually zero by the end of the century. However, historians emphasize that Jenner’s breakthrough was an extraordinary "one-off" empirical anomaly. Because Jenner lived six decades before Louis Pasteur’s Germ Theory (1861), he had no comprehension of viruses or immune antibodies. Unable to explain the biological mechanism of immunity, Jenner could not adapt his technique to prevent any other infectious disease, leaving cholera, typhoid, and tuberculosis to rampage across Victorian Britain untouched.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1721–1795',
        para_ref: '[1.1–1.2]',
        heading: 'Why was inoculation dangerous for poor urban communities?',
        bullets: [
          'Scabbing sores blinding young children',
          'Scratching live pus into healthy arms',
          'Paying rich doctors high guinea fees',
        ],
        focus_clue: 'Why was inoculation dangerous for poor urban communities?',
      },
      {
        step: 2,
        date: '1796–1798',
        para_ref: '[2.1–2.2]',
        heading: 'How did Jenner use scientific experimentation to test folklore?',
        bullets: [
          'Milking cows with clear smooth skin',
          'Scraping blister liquid into boy James Phipps',
          'Dosing boy with deadly pox without illness',
        ],
        focus_clue: 'How did Jenner use scientific experimentation to test folklore?',
      },
      {
        step: 3,
        date: '1798–1810s',
        para_ref: '[3.1–3.2]',
        heading: 'Why did London doctors and church leaders resist vaccination?',
        bullets: [
          'Printing scary cartoons with sprouting cow horns',
          'Church pulpits warning against beast blood',
          'Dirty hospital needles passing deadly infections',
        ],
        focus_clue: 'Why did London doctors and church leaders resist vaccination?',
      },
      {
        step: 4,
        date: '1802–1840',
        para_ref: '[4.1–4.2]',
        heading: 'Why did the British government abandon laissez-faire for vaccination?',
        bullets: [
          'Voting thirty thousand pounds in gold coins',
          'Giving free scratches to village babies',
          'Banning old dangerous pus cuts by law',
        ],
        focus_clue: 'Why did the British government abandon laissez-faire for vaccination?',
      },
      {
        step: 5,
        date: '1852–1871',
        para_ref: '[5.1–5.2]',
        heading: 'Why did making vaccination compulsory spark fierce public protests?',
        bullets: [
          'Fining poor parents for refusing jabs',
          'Angry street protests marching with banners',
          'Plunging death rates as smallpox disappears',
        ],
        focus_clue: 'Why did making vaccination compulsory spark fierce public protests?',
      },
    ],
    causal_domino_spine: {
      title: 'Approaches to Prevention: Edward Jenner & The Smallpox Vaccine',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1721–1795',
          para_ref: '[1.1–1.2]',
          title: 'Smallpox & Inoculation (Variolation)',
          actor: 'Lady Mary Wortley Montagu & Commercial Inoculators',
          tag: '💉 RISKY VARIOLATION',
          trigger:
            'Smallpox killed thousands of infants and scarred survivors, while variolation (inoculating live smallpox pus into healthy veins) carried a high risk of triggering lethal full-blown epidemics.',
          desc: 'Smallpox killed thousands of infants and scarred survivors, while variolation (inoculating live smallpox pus into healthy veins) carried a high risk of triggering lethal full-blown epidemics.',
          connective:
            'Remained an expensive, hazardous commercial luxury reserved for wealthy elites while offering no safe, universal protection for poor urban populations.',
          question: 'Why was inoculation dangerous for poor urban communities?',
        },
        {
          step: 2,
          date: '1796–1798',
          para_ref: '[2.1–2.2]',
          title: 'Edward Jenner & The Cowpox Vaccine',
          actor: 'Dr Edward Jenner (Gloucestershire GP)',
          tag: '🐄 EMPIRICAL COWPOX TEST',
          trigger:
            'Edward Jenner tested Gloucestershire dairy folklore by scraping cowpox pustule matter from dairymaid Sarah Nelmes and inoculating 8-year-old James Phipps in May 1796.',
          desc: 'Edward Jenner tested Gloucestershire dairy folklore by scraping cowpox pustule matter from dairymaid Sarah Nelmes and inoculating 8-year-old James Phipps in May 1796.',
          connective:
            'Subsequent inoculation with virulent smallpox failed to produce disease, experimentally proving that cowpox conferred safe, lasting immunity against lethal smallpox.',
          question: 'How did Jenner use scientific experimentation to test folklore?',
        },
        {
          step: 3,
          date: '1798–1810s',
          para_ref: '[3.1–3.2]',
          title: 'Medical Opposition & Religious Resistance',
          actor: 'London Inoculators, Church Pulpits & Royal Society',
          tag: '📰 ANTI-VACCINE CARTOONS',
          trigger:
            'When Jenner published his Inquiry in 1798, London physicians contaminated samples with smallpox, while satirists published cartoons showing vaccinated patients sprouting cow heads.',
          desc: 'When Jenner published his Inquiry in 1798, London physicians contaminated samples with smallpox, while satirists published cartoons showing vaccinated patients sprouting cow heads.',
          connective:
            'Religious pulpits condemned injecting animal matter as an affront to God, while commercial inoculators fought to protect their lucrative £20 inoculation fees.',
          question: 'Why did London doctors and church leaders resist vaccination?',
        },
        {
          step: 4,
          date: '1802–1840',
          para_ref: '[4.1–4.2]',
          title: 'Parliamentary Funding & Adoption',
          actor: 'British Parliament & Poor Law Guardians',
          tag: '🏛️ STATE VACCINATION FUNDING',
          trigger:
            'Impressed by rapid overseas adoption and falling mortality, the British Parliament voted Jenner £10,000 in 1802 and £20,000 in 1807 to support free national vaccination.',
          desc: 'Impressed by rapid overseas adoption and falling mortality, the British Parliament voted Jenner £10,000 in 1802 and £20,000 in 1807 to support free national vaccination.',
          connective:
            'Led to the 1840 Vaccination Act, which provided free infant vaccination paid by poor-law rates and outlawed dangerous smallpox variolation entirely.',
          question: 'Why did the British government abandon laissez-faire for vaccination?',
        },
        {
          step: 5,
          date: '1852–1871',
          para_ref: '[5.1–5.2]',
          title: 'Compulsory Acts & Anti-Vaccine League',
          actor: 'Registrar General & Anti-Vaccination League',
          tag: '⚖️ COMPULSORY HEALTH MANDATE',
          trigger:
            'Parliament made infant vaccination compulsory in 1852 and introduced strict fines for non-compliance in 1867, sparking the mass Anti-Vaccination League in Leicester and London.',
          desc: 'Parliament made infant vaccination compulsory in 1852 and introduced strict fines for non-compliance in 1867, sparking the mass Anti-Vaccination League in Leicester and London.',
          connective:
            'Despite fierce civil liberties protests, enforced infant vaccination crushed national smallpox death rates from over 40,000 per decade to virtually zero, proving the power of preventive state health policy.',
          question: 'Why did making vaccination compulsory spark fierce public protests?',
        },
      ],
    },
  },

  lesson_3_3: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the revolution in Victorian hospital care and nursing, analyzing Florence Nightingale’s sanitary reforms at Scutari during the Crimean War, her statistical advocacy using the Coxcomb chart, the introduction of the cross-ventilated Pavilion Hospital Plan, the professionalization of nursing at St Thomas’ Hospital, and Mary Seacole’s frontline contribution.',
      objectives: [
        {
          objective:
            'Explain why early nineteenth-century hospital wards were notorious death traps.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (pre-Nightingale ward plaque). Focus on "hospitalism", septic post-mortem transfers, unwashed mattresses, and the disreputable caricature of drunken, untrained nurses.',
          question:
            'Why did patients in early Victorian voluntary hospitals face a higher risk of death from wound infection than those treated at home?',
        },
        {
          objective:
            'Analyse how Florence Nightingale’s sanitary reforms at Scutari slashed military hospital mortality.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source B (Simpson’s painting of Scutari). Examine the blocked sewer crisis, military-style scrubbing, boiling linen, nutritious food, and the arrival of the Sanitary Commission.',
          question:
            'How did simple sanitary measures like scrubbing floors and flushing drains reduce mortality at Scutari from 42% to 2%?',
        },
        {
          objective:
            'Examine Nightingale’s use of statistics, the Polar Area Coxcomb diagram, and sanitary science.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source C (Nightingale’s Coxcomb chart). Discuss how she used visual data to prove to Queen Victoria and Parliament that preventable filth killed far more troops than Russian weapons.',
          question:
            'Why did Nightingale’s belief in miasma theory still lead to remarkably effective hospital hygiene policies?',
        },
        {
          objective:
            'Evaluate how the architectural design of the Pavilion Hospital Plan prevented cross-infection.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on separate pavilions, high ceilings, large opposing windows for cross-ventilation, wipeable glazed tiles, and its implementation at St Thomas’ Hospital.',
          question:
            'How did the physical architecture of pavilion wards prevent the spread of lethal hospital gangrene between patients?',
        },
        {
          objective:
            'Assess the impact of professional nurse training and contrast Nightingale’s legacy with Mary Seacole.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source D (Mary Seacole portrait). Evaluate how the Nightingale School at St Thomas’ created a respected profession while examining Seacole’s frontline battlefield care.',
          question:
            'How did Mary Seacole’s practical frontline care in the Crimea contrast with Nightingale’s administrative sanitary reforms?',
        },
      ],
      source_context: {
        'Source A':
          'Museum Reconstruction & Historical Plaque: Pre-Nightingale Hospital Conditions. Depicts early 19th-century voluntary hospital wards where patients shared beds contaminated with blood, feces, and vomit. Hinge Question: What does this depiction of early Victorian hospital wards reveal about why working-class patients regarded hospitals as death houses rather than places of recovery?',
        'Source B':
          'Florence Nightingale in the Barrack Hospital at Scutari (William Simpson, 1856). Lithograph depicting Nightingale supervising the vast, orderly wards at night, carrying her iconic lamp. Hinge Question: How does this artwork contrast the orderly, clean wards achieved by Nightingale with the horrific sewer backup that originally greeted her at Scutari?',
        'Source C':
          'Florence Nightingale’s ‘Coxcomb’ Mortality Diagram (1858). Published in Nightingale’s 1858 Royal Commission report, this chart revolutionized statistical data visualization by using concentric wedges to prove that preventable zymotic diseases caused the vast majority of military deaths. Hinge Question: How did this visual data convince Parliament that bad hospital sanitation was far more deadly than Russian weapons?',
        'Source D':
          'Studio Portrait of Mary Seacole wearing Crimean Campaign Medals (c.1873). Carte-de-visite photograph showing Jamaican doctress Mary Seacole proudly wearing four military campaign medals awarded for treating wounded soldiers under fire. Hinge Question: How did Seacole’s frontline herbal and battlefield care contrast with Nightingale’s administrative hospital reforms at Scutari?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Pestilential Wards & Pre-Modern Nursing (c1700–1850)',
        theme_heading: 'Act 1: Pestilential Wards & Pre-Modern Nursing (c1700–1850)',
        source: {
          id: 'source_a_pre_nightingale_ward',
          letter: 'A',
          title:
            'Source A: Museum Reconstruction & Historical Plaque: Pre-Nightingale Hospital Conditions',
          src: '/images/pre_nightingale_ward.jpg',
          source: '/images/pre_nightingale_ward.jpg',
          image: '/images/pre_nightingale_ward.jpg',
          caption:
            'Museum reconstruction showing cramped, unventilated 19th-century voluntary hospital beds, accompanied by historical records of unhygienic conditions.',
          desc: 'Archival display depicting squalid conditions in pre-reform Victorian hospital wards.',
          provenance:
            'The Florence Nightingale Museum, London (Object Ref. FNM-2012-04). Photograph and historical plaque text.',
          citation:
            'The Florence Nightingale Museum, London (Object Ref. FNM-2012-04). Photograph and historical plaque text.',
          question:
            'What does this depiction of early Victorian hospital wards reveal about why working-class patients regarded hospitals as death houses rather than places of recovery?',
          hinge_question:
            'What does this depiction of early Victorian hospital wards reveal about why working-class patients regarded hospitals as death houses rather than places of recovery?',
          source_context:
            'In the first half of the nineteenth century, voluntary hospitals were notorious for horrific infection rates. Wards were cramped and airless, patients shared unwashed straw mattresses, and nurses were completely untrained.',
          context:
            'In the first half of the nineteenth century, voluntary hospitals were notorious for horrific infection rates. Wards were cramped and airless, patients shared unwashed straw mattresses, and nurses were completely untrained.',
        },
        text: '<span class="para-ref">[1.1]</span> In the first half of the nineteenth century, British hospitals were squalid, dangerous institutions. Rather than centers of cure, municipal voluntary hospitals and poor law infirmaries were regarded by the working classes as "death houses" of last resort. Wards were cramped, airless, and dark; beds were pushed tightly together with three or four patients sharing a single straw mattress contaminated with blood, feces, and vomit (<span class="archival-meta-tag">Source A</span>). Surgeons operated in filthy, blood-stiffened frock coats without washing hands or sterilizing equipment, moving directly from post-mortem autopsies to open surgical wounds. Consequently, patients who survived operations almost universally died from post-operative infections known collectively as "hospitalism": lethal hospital gangrene, erysipelas, septicaemia, and pyaemia.<br><br><span class="para-ref">[1.2]</span> The standard of nursing was equally disgraceful. Nurses were completely untrained, illiterate, poorly paid, and widely regarded as drunken, disreputable domestic servants who neglected vulnerable patients—immortalized in Charles Dickens’ satirical caricature of Betsy Prig. Middle-class women refused to enter the trade, leaving ward care to uneducated drudges who lacked any basic understanding of hygiene, dressing wounds, or infection control. In 1854, Britain entered the Crimean War against Russia. Sensational eyewitness dispatches published in *The Times* by William Howard Russell ignited public fury in London: British soldiers were dying in thousands not on the battlefield, but from rampant cholera, dysentery, and frostbite inside military hospitals that lacked bandages, food, soap, or clean water.',
      },
      {
        act: 2,
        title: 'Act 2: Scutari Hospital & The Crimean Sanitary Revolution (1854–1856)',
        theme_heading: 'Act 2: Scutari Hospital & The Crimean Sanitary Revolution (1854–1856)',
        source: {
          id: 'source_b_scutari_nightingale',
          letter: 'B',
          title:
            'Source B: Florence Nightingale in the Barrack Hospital at Scutari (William Simpson, 1856)',
          src: '/images/nightingale_scutari.jpg',
          source: '/images/nightingale_scutari.jpg',
          image: '/images/nightingale_scutari.jpg',
          caption:
            'Coloured lithograph by William Simpson (1856) showing Florence Nightingale attending to wounded British soldiers in the vast wards of the Barrack Hospital at Scutari.',
          desc: '1856 lithograph of Florence Nightingale supervising wards at Scutari by William Simpson.',
          provenance:
            'Coloured lithograph by William Simpson, Day & Son, London, 21 April 1856. Wellcome Collection, London (Iconographic Coll. V0015386).',
          citation:
            'Coloured lithograph by William Simpson, Day & Son, London, 21 April 1856. Wellcome Collection, London (Iconographic Coll. V0015386).',
          question:
            'How does this artwork contrast the orderly, clean wards achieved by Nightingale with the horrific sewer backup that originally greeted her at Scutari?',
          hinge_question:
            'Study the vast, orderly ward depicted by William Simpson. How does this artwork contrast the clean, disciplined environment achieved by Nightingale with the horrific sewer backups that originally greeted her at Scutari?',
          source_context:
            'In November 1854, Florence Nightingale and thirty-eight volunteer nurses arrived at Scutari. Wounded men lay on bare stone floors above overflowing cesspools. Nightingale instituted strict sanitary discipline: scrubbing wards, washing bedding, boiling clean water, and securing nourishing rations.',
          context:
            'In November 1854, Florence Nightingale and thirty-eight volunteer nurses arrived at Scutari. Wounded men lay on bare stone floors above overflowing cesspools. Nightingale instituted strict sanitary discipline: scrubbing wards, washing bedding, boiling clean water, and securing nourishing rations.',
        },
        text: '<span class="para-ref">[2.1]</span> In response to the Crimean crisis, Secretary at War Sidney Herbert commissioned Florence Nightingale—an educated, upper-class woman who had studied nursing in Germany—to lead an official mission of thirty-eight volunteer nurses to the British army base hospital at Scutari near Constantinople in November 1854. What Nightingale discovered was an administrative nightmare: the massive Barrack Hospital was constructed directly over a gigantic, blocked cesspool; raw sewage backed up onto the floor; drinking water was contaminated; and hundreds of soldiers lay in lice-infested uniforms on bare flagstones alongside rotting carcasses of dead horses.<br><br><span class="para-ref">[2.2]</span> Nightingale encountered fierce hostility from military doctors, who resented female civilian interference in army discipline. Undaunted, Nightingale used her personal fortune and Times relief funds to purchase clean shirts, bandages, and scrubbing brushes. She organized military-style sanitary discipline: cleaning wards with boiling water, operating kitchens to serve nourishing broths, washing soldiers’ clothes in separate laundry facilities, and opening windows for fresh air (<span class="archival-meta-tag">Source B</span>). In March 1855, after Nightingale lobbied Parliament, a government Sanitary Commission arrived in Scutari and flushed the underground sewers. Within months, the hospital mortality rate plummeted spectacularly from over 42% to just 2%.',
      },
      {
        act: 3,
        title: 'Act 3: Notes on Nursing, Statistics & The Coxcomb Diagram (1859)',
        theme_heading: 'Act 3: Notes on Nursing, Statistics & The Coxcomb Diagram (1859)',
        source: {
          id: 'source_c_nightingale_coxcomb',
          letter: 'C',
          title: 'Source C: Florence Nightingale’s ‘Coxcomb’ Mortality Diagram (1858)',
          src: '/images/nightingale_coxcomb.jpg',
          source: '/images/nightingale_coxcomb.jpg',
          image: '/images/nightingale_coxcomb.jpg',
          caption:
            "Florence Nightingale's revolutionary Diagram of the Causes of Mortality in the Army in the East (1858), demonstrating that preventable zymotic diseases caused far more deaths than battle injuries.",
          desc: '1858 Polar Area Coxcomb diagram of military mortality by Florence Nightingale.',
          provenance:
            'Mortality of the British Army, Florence Nightingale, London: Harrison and Sons, 1858. Wellcome Collection, London (Iconographic Coll. L0031154).',
          citation:
            'Mortality of the British Army, Florence Nightingale, London: Harrison and Sons, 1858. Wellcome Collection, London (Iconographic Coll. L0031154).',
          question:
            'How did this visual data convince Parliament that bad hospital sanitation was far more deadly than Russian weapons?',
          hinge_question:
            'Florence Nightingale invented the Polar Area Diagram to present military mortality data to Queen Victoria. The large outer blue wedges represent preventable sanitary diseases, while the small inner red wedges represent battlefield combat wounds. How did this visual data convince Parliament that bad hospital sanitation was far more deadly than Russian weapons?',
          source_context:
            'Published in Nightingale’s 1858 Royal Commission report, this chart revolutionized statistical data visualization. Nightingale used math and design as political weapons to prove that army deaths were caused by preventable filth and typhus.',
          context:
            'Published in Nightingale’s 1858 Royal Commission report, this chart revolutionized statistical data visualization. Nightingale used math and design as political weapons to prove that army deaths were caused by preventable filth and typhus.',
        },
        text: '<span class="para-ref">[3.1]</span> Upon returning to England in 1856 as a national heroine, Nightingale refused romantic celebrity and launched a ruthless political campaign to reform the British army and civilian hospitals. Realizing that dense statistical tables were ignored by politicians, Nightingale invented the <em>Polar Area Diagram</em> (the famous "Coxcomb", <span class="archival-meta-tag">Source C</span>). Published in her 1858 Royal Commission report, the chart used expanding concentric wedges to demonstrate visually that the vast majority of military deaths (large blue wedges) were caused by preventable zymotic diseases—cholera, typhus, and dysentery—resulting from bad drainage, while combat wounds (red wedges) accounted for only a fraction of casualties.<br><br><span class="para-ref">[3.2]</span> In 1859, Nightingale published <em>Notes on Nursing: What It Is, and What It Is Not</em>, which became a foundational international handbook. Although Nightingale dogmatically believed in miasma rather than Germ Theory, her core tenets—pure air, pure water, efficient drainage, cleanliness, and light—revolutionized home care and hospital wards. She insisted that nursing was an art that required practical training, meticulous observation of symptoms, and absolute cleanliness, arguing that "the very first requirement in a hospital is that it should do the sick no harm."',
      },
      {
        act: 4,
        title: 'Act 4: The Pavilion Plan & Architectural Cross-Ventilation (1860s)',
        theme_heading: 'Act 4: The Pavilion Plan & Architectural Cross-Ventilation (1860s)',
        text: '<span class="para-ref">[4.1]</span> In her 1859 treatise <em>Notes on Hospitals</em>, Nightingale turned her attention to hospital architecture, advocating the revolutionary <em>Pavilion Plan</em>. Old Victorian hospitals were monolithic, multi-story blocks where foul air from lower wards rose through stairwells to poison upper floors. In contrast, the Pavilion Plan mandated separate, detached multi-story wings connected only by covered outdoor corridors. This layout isolated infectious illnesses and prevented cross-contamination between surgical, fever, and convalescent wards.<br><br><span class="para-ref">[4.2]</span> Inside each pavilion, wards were designed with high ceilings and large opposing windows positioned directly opposite each bed, creating continuous cross-ventilation that diluted and flushed away airborne poisons. Floors were made of non-porous polished hardwood, walls were surfaced with washable glazed tiles, and plumbing was housed in separate annexes. When London’s St Thomas’ Hospital was rebuilt on the southern Embankment of the River Thames opposite Parliament (1868–1871), it was designed from the ground up according to Nightingale’s pavilion specifications, setting a global gold standard for hospital architecture.',
      },
      {
        act: 5,
        title: 'Act 5: Professional Nurse Training & Mary Seacole’s Dual Legacy (1860–1890s)',
        theme_heading:
          'Act 5: Professional Nurse Training & Mary Seacole’s Dual Legacy (1860–1890s)',
        source: {
          id: 'source_d_mary_seacole',
          letter: 'D',
          title:
            'Source D: Studio Portrait of Mary Seacole wearing Crimean Campaign Medals (c.1873)',
          src: '/images/mary_seacole.jpg',
          source: '/images/mary_seacole.jpg',
          image: '/images/mary_seacole.jpg',
          caption:
            'Carte-de-visite portrait of Jamaican doctress Mary Seacole wearing four military medals awarded for her frontline nursing during the Crimean War.',
          desc: 'c.1873 portrait photograph of Jamaican nurse Mary Seacole with military campaign medals.',
          provenance:
            'Carte-de-visite photograph by Maull & Company, London, c. 1873. National Portrait Gallery, London (NPG x45330).',
          citation:
            'Carte-de-visite photograph by Maull & Company, London, c. 1873. National Portrait Gallery, London (NPG x45330).',
          question:
            'How did Seacole’s frontline herbal and battlefield care contrast with Nightingale’s administrative hospital reforms at Scutari?',
          hinge_question:
            'Mary Seacole proudly wears four military campaign medals awarded for treating wounded soldiers under fire. How did Seacole’s frontline herbal and battlefield care contrast with Nightingale’s administrative hospital reforms at Scutari?',
          source_context:
            'Mary Seacole funded her own voyage to the Crimea after the War Office rejected her application. Operating the British Hotel at Spring Hill near Sevastopol, Seacole rode directly onto battlefields to treat wounded and dying soldiers with traditional herbal medicines, bandages, and nourishment.',
          context:
            'Mary Seacole funded her own voyage to the Crimea after the War Office rejected her application. Operating the British Hotel at Spring Hill near Sevastopol, Seacole rode directly onto battlefields to treat wounded and dying soldiers with traditional herbal medicines, bandages, and nourishment.',
        },
        text: '<span class="para-ref">[5.1]</span> In 1860, using £44,000 raised by public subscription via the Nightingale Fund, she established the <em>Nightingale Training School for Nurses</em> at St Thomas’ Hospital in London. Nightingale transformed nursing from a reviled menial chore into an elite, respected, female-led medical profession. Candidates were subjected to rigorous moral vetting, received systematic scientific training in anatomy, hygiene, and patient observation, and wore clean, professional uniforms. Nightingale matrons were soon recruited to superintend major voluntary hospitals across Britain and the British Empire, spreading uniform sanitary standards.<br><br><span class="para-ref">[5.2]</span> Alongside Nightingale\'s institutional revolution stands the frontline legacy of Mary Seacole (<span class="archival-meta-tag">Source D</span>). When rejected by the War Office due to racial prejudice, the Jamaican doctress funded her own passage to Balaclava, establishing the British Hotel to provide hot food, shelter, and medical care under fire. While Nightingale revolutionized hospital administration, sanitary architecture, and data science from behind the lines, Seacole delivered frontline battlefield trauma care and herbal remedies directly to wounded soldiers. By the late nineteenth century, the professionalization of nursing and the sanitary revolution had transformed British hospitals from pestilential death traps into disciplined institutions of cure.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1700–1850',
        para_ref: '[1.1–1.2]',
        heading: 'Why were early Victorian hospital wards notorious death traps?',
        bullets: [
          'Crowded dark rooms smelling of festering wounds',
          'Drunk ward women sleeping on dirty rags',
          'Sharing blood-soaked blankets between beds',
        ],
        focus_clue: 'Why were early Victorian hospital wards notorious death traps?',
      },
      {
        step: 2,
        date: '1854–1856',
        para_ref: '[2.1–2.2]',
        heading: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
        bullets: [
          'Sewers overflowing beneath wooden ward floors',
          'Scrubbing dirty walls with boiling water and soap',
          'Feeding wounded soldiers hot fresh stew',
        ],
        focus_clue: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
      },
      {
        step: 3,
        date: '1859',
        para_ref: '[3.1–3.2]',
        heading: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
        bullets: [
          'Opening high windows for fresh river breezes',
          'Drawing colourful polar pie charts for MPs',
          'Demanding clean white cotton bandages',
        ],
        focus_clue: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
      },
      {
        step: 4,
        date: '1860s',
        para_ref: '[4.1–4.2]',
        heading: 'How did the pavilion plan prevent cross-infection between wards?',
        bullets: [
          'Building long narrow brick ward pavilions',
          'Washing smooth glazed walls with water',
          'Cross-ventilation blowing stale room air away',
        ],
        focus_clue: 'How did the pavilion plan prevent cross-infection between wards?',
      },
      {
        step: 5,
        date: '1860–1890s',
        para_ref: '[5.1–5.2]',
        heading: 'How did nurse training permanently raise the standard of hospital care?',
        bullets: [
          "Uniformed women learning medical rules at St Thomas'",
          'Stern matrons inspecting spotless bedside tables',
          'Fusing clean hands with microbe science',
        ],
        focus_clue: 'How did nurse training permanently raise the standard of hospital care?',
      },
    ],
    causal_domino_spine: {
      title: 'Improvements in Hospital Care: Florence Nightingale & Professional Nursing',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1700–1850',
          para_ref: '[1.1–1.2]',
          title: 'Voluntary Hospitals & Pre-Modern Nursing',
          actor: 'Victorian Voluntary Hospital Governors',
          tag: '🏥 PESTILENTIAL WARDS',
          trigger:
            'Early Victorian voluntary hospitals were unventilated, cramped pesthouses staffed by untrained, illiterate domestic cleaners like Dickens’ caricature Betsy Prig.',
          desc: 'Early Victorian voluntary hospitals were unventilated, cramped pesthouses staffed by untrained, illiterate domestic cleaners like Dickens’ caricature Betsy Prig.',
          connective:
            'Allowed hospital gangrene and pyaemia to spread rapidly between unwashed beds, giving hospitals a higher mortality rate for amputations than private home surgeries.',
          question: 'Why were early Victorian hospital wards notorious death traps?',
        },
        {
          step: 2,
          date: '1854–1856',
          para_ref: '[2.1–2.2]',
          title: 'Scutari & The Crimean War',
          actor: 'Florence Nightingale & 38 Volunteer Nurses',
          tag: '🧼 SCUTARI SANITARY REFORMS',
          trigger:
            'Florence Nightingale led 38 volunteer nurses to the Barrack Hospital at Scutari in 1854, finding wounded soldiers lying in raw sewage beneath overflowing cesspools.',
          desc: 'Florence Nightingale led 38 volunteer nurses to the Barrack Hospital at Scutari in 1854, finding wounded soldiers lying in raw sewage beneath overflowing cesspools.',
          connective:
            'Scrubbed ward floors, flushed blocked drains, boiled bedsheets, and set up kitchens, dramatically slashing the hospital mortality rate from 42% down to 2% within six months.',
          question: 'How did Nightingale’s sanitary reforms drastically cut the death rate?',
        },
        {
          step: 3,
          date: '1859',
          para_ref: '[3.1–3.2]',
          title: 'Notes on Nursing & Sanitary Science',
          actor: 'Florence Nightingale (Sanitary Reformer & Statistician)',
          tag: '📊 POLAR AREA DIAGRAMS',
          trigger:
            'Nightingale published Notes on Nursing (1859) and invented the Polar Area coxcomb diagram to visually prove to Queen Victoria and Parliament that preventable filth killed more soldiers than enemy bullets.',
          desc: 'Nightingale published Notes on Nursing (1859) and invented the Polar Area coxcomb diagram to visually prove to Queen Victoria and Parliament that preventable filth killed more soldiers than enemy bullets.',
          connective:
            'Although grounded in miasma theory rather than microbes, her insistence on pure air, pure water, efficient drainage, and cleanliness revolutionized military and civil hygiene.',
          question: 'Why did Nightingale’s belief in miasma still produce effective hygiene?',
        },
        {
          step: 4,
          date: '1860s',
          para_ref: '[4.1–4.2]',
          title: 'The Pavilion Plan Hospital Design',
          actor: 'Hospital Architects & St Thomas’ Hospital',
          tag: '🏛️ PAVILION WARD ARCHITECTURE',
          trigger:
            'Nightingale’s 1859 Notes on Hospitals recommended the Pavilion Plan: separate multi-storey brick pavilions connected by covered corridors, with large opposing windows for cross-ventilation.',
          desc: 'Nightingale’s 1859 Notes on Hospitals recommended the Pavilion Plan: separate multi-storey brick pavilions connected by covered corridors, with large opposing windows for cross-ventilation.',
          connective:
            "Adopted when rebuilding St Thomas' Hospital in London (1868–1871), establishing a national architectural standard that prevented airborne cross-infection between medical specialties.",
          question: 'How did the pavilion plan prevent cross-infection between wards?',
        },
        {
          step: 5,
          date: '1860–1890s',
          para_ref: '[5.1–5.2]',
          title: 'Professional Nurse Training & Seacole’s Legacy',
          actor: 'The Nightingale School & Mary Seacole',
          tag: '👩‍⚕️ PROFESSIONAL NURSE TRAINING',
          trigger:
            'Using the £45,000 public Nightingale Fund, she established the Nightingale School of Nursing at St Thomas’ Hospital in 1860, while Mary Seacole provided heroic frontline battlefield care.',
          desc: 'Using the £45,000 public Nightingale Fund, she established the Nightingale School of Nursing at St Thomas’ Hospital in 1860, while Mary Seacole provided heroic frontline battlefield care.',
          connective:
            'Displaced the old drunken nurse stereotype with professional, respected medical practitioners, preparing hospital staff to implement aseptic surgical and antiseptic routines effortlessly by the 1890s.',
          question: 'How did nurse training permanently raise the standard of hospital care?',
        },
      ],
    },
  },

  lesson_3_4: {
    teacher_notes: {
      primer:
        'This enquiry charts the revolution in Victorian surgery between 1846 and 1890, exploring the conquest of surgical pain by James Simpson’s chloroform, evaluating why conquering pain initially worsened patient mortality during the "Black Period", analyzing Joseph Lister’s antiseptic carbolic spray, and detailing the transition to modern aseptic surgery.',
      objectives: [
        {
          objective:
            'Explain why surgical speed was the primary measure of skill before anaesthetics.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize the three barriers of pain, infection, and shock, and highlight Robert Liston amputating limbs in thirty seconds while porters pinned screaming patients.',
          question:
            'Why was rapid surgery essential for patient survival prior to the development of effective chemical anaesthetics in the 1840s?',
        },
        {
          objective:
            'Analyse the discovery of chloroform by James Simpson and the early controversies surrounding anaesthesia.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Simpson unconscious under dining table). Examine religious opposition, the fatal overdose of Hannah Greener in 1848, and Queen Victoria’s endorsement in 1853.',
          question:
            'Why did Hannah Greener’s death cause widespread panic regarding chloroform, and how was this safety issue eventually resolved?',
        },
        {
          objective:
            'Evaluate why the conquest of pain paradoxically triggered the "Black Period" of surgery (1846–1865).',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Explain that painless surgery encouraged surgeons to cut deeper into abdominal and internal cavities without understanding microbial contamination, driving post-operative sepsis to record highs.',
          question:
            'Why did the introduction of anaesthetics initially increase, rather than decrease, patient mortality rates from surgical operations?',
        },
        {
          objective:
            'Examine Joseph Lister’s application of Germ Theory and his introduction of carbolic acid antisepsis.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Lister operating with carbolic spray). Connect Pasteur’s 1861 paper to Carlisle sewage disinfection, the treatment of Jamie Greenlees, and the reduction of surgical mortality from 46% to 15%.',
          question:
            'How did Joseph Lister connect Louis Pasteur’s Germ Theory to the prevention of wound sepsis at Glasgow Infirmary?',
        },
        {
          objective:
            'Contrast antiseptic surgery with aseptic surgery and evaluate late Victorian advances.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Distinguish between killing germs inside wounds (antiseptic) and excluding germs from operating theatres entirely (aseptic: steam autoclaves, boiled gowns, rubber gloves).',
          question:
            'What is the fundamental difference between antiseptic surgical methods and aseptic operating theatre environments?',
        },
      ],
      source_context: {
        'Source A':
          'James Young Simpson and Colleagues Discovering Chloroform (1847). 19th-century engraving depicting Dr James Young Simpson, Dr George Keith, and Dr James Duncan collapsed unconscious under the dining table after inhaling chloroform vapor at 52 Queen Street, Edinburgh. Hinge Question: Study Dr Simpson and his assistants collapsed beneath the dining table after inhaling chloroform vapor. Why was self-experimentation so common among 19th-century medical pioneers, and what severe dangers did it carry?',
        'Source B':
          "Joseph Lister Operating with the Carbolic Acid Spray (1882). Wood engraving from W. Watson Cheyne's Antiseptic Surgery (1882) showing Joseph Lister performing surgery enveloped in a steam-powered cloud of carbolic acid spray. Hinge Question: Joseph Lister and his assistants operate in dark frock coats while a machine pumps a fine cloud of carbolic acid mist over the patient. Why did British surgeons initially object to operating inside this dense carbolic cloud?",
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Pre-Anaesthetic Surgery: Raw Speed & Traumatic Shock (c1700–1846)',
        theme_heading: 'Act 1: Pre-Anaesthetic Surgery: Raw Speed & Traumatic Shock (c1700–1846)',
        text: '<span class="para-ref">[1.1]</span> In the early decades of the nineteenth century, surgery was an ordeal of unimaginable agony. Surgeons faced three insurmountable physiological barriers: *Pain*, *Infection*, and *Bleeding*. Because there were no effective anaesthetics, operations were confined to emergency amputations, superficial tumor excisions, and lithotomies (bladder stone cuttings). Patients had to be dragged into operating theatres and physically pinned to wooden tables by burly hospital porters while screaming in terror. Many patients died on the table from sheer cardiovascular shock before the knife had completed its work.<br><br><span class="para-ref">[1.2]</span> Under these terrifying conditions, surgical excellence was judged solely by speed. The premier surgeon of the era, London’s Robert Liston, was celebrated for amputating an adult thigh in under thirty seconds. Liston operated in a dark frock coat stiffened with dried blood and rotting pus from past surgeries, holding his bone saw between his teeth to free his hands. Speed was the only mercy a surgeon could offer, but speed made delicate, precise operations on the abdomen, chest, or brain completely impossible.',
      },
      {
        act: 2,
        title: 'Act 2: James Simpson & The Discovery of Chloroform (1847–1853)',
        theme_heading: 'Act 2: James Simpson & The Discovery of Chloroform (1847–1853)',
        source: {
          id: 'source_a_simpson_chloroform',
          letter: 'A',
          title: 'Source A: James Young Simpson and Colleagues Discovering Chloroform (1847)',
          src: '/images/simpson_chloroform.jpg',
          source: '/images/simpson_chloroform.jpg',
          image: '/images/simpson_chloroform.jpg',
          caption:
            '19th-century engraving depicting Dr James Young Simpson, Dr George Keith, and Dr James Duncan collapsed unconscious under the dining table after inhaling chloroform vapor at 52 Queen Street, Edinburgh.',
          desc: '19th-century wood engraving of James Simpson discovering chloroform anaesthesia.',
          provenance:
            'Wood engraving depicting the experiment of 4 November 1847 at 52 Queen Street, Edinburgh. Wellcome Collection, London (Iconographic Coll. V0015502).',
          citation:
            'Wood engraving depicting the experiment of 4 November 1847 at 52 Queen Street, Edinburgh. Wellcome Collection, London (Iconographic Coll. V0015502).',
          question:
            'Why was self-experimentation so common among 19th-century medical pioneers, and what severe dangers did it carry?',
          hinge_question:
            'Study Dr Simpson and his assistants collapsed beneath the dining table after inhaling chloroform vapor. Why was self-experimentation so common among 19th-century medical pioneers, and what severe dangers did it carry?',
          source_context:
            'Prior to 1847, operations were harrowing ordeals of agony and shock. Simpson tested numerous chemical vapors on himself and his assistants at dinner parties. On 4 November 1847, the trio inhaled chloroform and woke up under the table, proving its powerful anaesthetic effect.',
          context:
            'Prior to 1847, operations were harrowing ordeals of agony and shock. Simpson tested numerous chemical vapors on himself and his assistants at dinner parties. On 4 November 1847, the trio inhaled chloroform and woke up under the table, proving its powerful anaesthetic effect.',
        },
        text: '<span class="para-ref">[2.1]</span> Early chemical experiments with pain relief produced mixed results: laughing gas (nitrous oxide) was weak, while ether (first demonstrated by American dentist William Morton in 1846) irritated patients’ lungs, induced violent vomiting, and created an explosive fire hazard near gaslights. In November 1847, Dr James Young Simpson, Professor of Midwifery at Edinburgh University, met with colleagues Dr Keith and Dr Duncan at his home at 52 Queen Street to sample vapors. After inhaling *chloroform*, the doctors felt dizzy and exhilarated before tumbling unconscious beneath the dining table (<span class="archival-meta-tag">Source A</span>). Recognizing that chloroform was fast-acting, potent, and non-flammable, Simpson immediately began administering it to relieve the agony of childbirth and surgical operations.<br><br><span class="para-ref">[2.2]</span> Chloroform triggered intense opposition from religious and medical quarters. Clergymen argued that God had cursed Eve in Genesis to bring forth children in pain, claiming anaesthesia was a sinful evasion of divine will. Doctors warned of lethal toxicity: in 1848, fifteen-year-old Hannah Greener died from ventricular fibrillation during a minor toenail operation after receiving an uncontrolled chloroform dose. Opposition finally collapsed in 1853, when Dr John Snow developed a precision chloroform inhaler mask and administered it to Queen Victoria during the birth of Prince Leopold, winning royal endorsement for the new anaesthetic.',
      },
      {
        act: 3,
        title: 'Act 3: The "Black Period" of Surgery & Deep Infections (1846–1865)',
        theme_heading: 'Act 3: The "Black Period" of Surgery & Deep Infections (1846–1865)',
        text: '<span class="para-ref">[3.1]</span> Paradoxically, the conquest of pain triggered the disastrous *"Black Period" of Surgery (1846–1865)*. Because patients were unconscious and motionless, surgeons attempted deeper, longer, and more complex internal procedures. However, because surgeons still knew nothing of germs, they operated with unwashed hands, dirty instruments, and unsterilized catgut ligatures. Pathogens were carried deep into internal body cavities, causing infection rates to skyrocket. More patients died of gangrene, septicaemia, and pyaemia during the Black Period than ever before.<br><br><span class="para-ref">[3.2]</span> Hospital wards became lethal death traps for surgical patients. Doctors wore blood-caked coats as badges of pride, sponges used to mop up pus from one patient were reused on the next without washing, and surgical dressings were rarely changed. The mortality rate for amputations in major voluntary hospitals rose above 40%, leading prominent surgeons to argue that patients had a far higher chance of surviving an operation performed in a private farmhouse bedroom than in a modern municipal hospital.',
      },
      {
        act: 4,
        title: 'Act 4: Joseph Lister & The Carbolic Acid Antiseptic Spray (1865–1870s)',
        theme_heading: 'Act 4: Joseph Lister & The Carbolic Acid Antiseptic Spray (1865–1870s)',
        source: {
          id: 'source_b_lister_carbolic_spray',
          letter: 'B',
          title: 'Source B: Joseph Lister Operating with the Carbolic Acid Spray (1882)',
          src: '/images/lister_carbolic_spray.jpg',
          source: '/images/lister_carbolic_spray.jpg',
          image: '/images/lister_carbolic_spray.jpg',
          caption:
            "Wood engraving from W. Watson Cheyne's Antiseptic Surgery (1882) showing Joseph Lister performing surgery enveloped in a steam-powered cloud of carbolic acid spray.",
          desc: '1882 wood engraving of Joseph Lister performing antiseptic surgery with a carbolic steam spray.',
          provenance:
            'Fig. 23 from Antiseptic Surgery: Its Principles, Practice, History and Results, W. Watson Cheyne, London: Smith, Elder & Co., 1882. Royal College of Surgeons of England (RCS Tracts 2305) / Wellcome Collection L0008892.',
          citation:
            'Fig. 23 from Antiseptic Surgery: Its Principles, Practice, History and Results, W. Watson Cheyne, London: Smith, Elder & Co., 1882. Royal College of Surgeons of England (RCS Tracts 2305) / Wellcome Collection L0008892.',
          question:
            'Why did British surgeons initially object to operating inside this dense carbolic cloud?',
          hinge_question:
            'Joseph Lister and his assistants operate in dark frock coats while a machine pumps a fine cloud of carbolic acid mist over the patient. Why did British surgeons initially object to operating inside this dense carbolic cloud?',
          source_context:
            'Illustrated in W. Watson Cheyne’s Antiseptic Surgery (1882), this plate shows Lister’s complete antiseptic operating technique. Lister used a steam spray to kill airborne microbes in the theatre.',
          context:
            'Illustrated in W. Watson Cheyne’s Antiseptic Surgery (1882), this plate shows Lister’s complete antiseptic operating technique. Lister used a steam spray to kill airborne microbes in the theatre.',
        },
        text: '<span class="para-ref">[4.1]</span> In 1865, Joseph Lister, Professor of Surgery at Glasgow Royal Infirmary, resolved to conquer the scourge of wound sepsis. Reading Louis Pasteur’s 1861 paper on fermentation, Lister realized that wound rot was not caused by moist air or chemical oxidation, but by living microscopic germs entering the body from the air and surgical contact. Lister noticed that the town council of Carlisle used crude *carbolic acid* (creosote) to disinfect sewage and kill cattle parasites without harming livestock. In August 1865, eleven-year-old James Greenlees was brought to Glasgow Infirmary with an open compound fracture of the leg after being run over by a cart—a condition that almost invariably ended in fatal gangrene and amputation. Lister cleaned the bone, dressed the wound with lint soaked in liquid carbolic acid, and covered it with tinfoil. To the astonishment of his colleagues, the bone healed cleanly within six weeks without a trace of infection or pus.<br><br><span class="para-ref">[4.2]</span> Between 1865 and 1869, Lister published a series of landmark clinical papers in *The Lancet*, documenting that his antiseptic method had slashed surgical mortality from 45.7% down to 15.0%. Lister developed a comprehensive antiseptic regime: surgeons washed their hands in carbolic lotion, instruments were soaked in carbolic solution, dressings were impregnated with carbolic oil, and a steam-driven apparatus pumped a fine mist of carbolic acid over the patient throughout the operation (<span class="archival-meta-tag">Source B</span>).',
      },
      {
        act: 5,
        title:
          'Act 5: From Antiseptic to Aseptic Surgery: Autoclaves & Rubber Gloves (1880s–1890s)',
        theme_heading:
          'Act 5: From Antiseptic to Aseptic Surgery: Autoclaves & Rubber Gloves (1880s–1890s)',
        text: '<span class="para-ref">[5.1]</span> British surgeons initially resisted Listerism with stubborn skepticism. Carbolic acid cracked surgeons’ hands, irritated patients’ lungs, slowed surgical speed, and added financial expense. Conservative surgeons argued that if microbes were invisible, Lister was inventing a phantom enemy to justify elaborate rituals. However, when German military surgeons adopted Lister’s antiseptic techniques during the Franco-Prussian War (1870) and achieved miraculous survival rates among wounded soldiers, British resistance collapsed, and Lister was appointed Professor of Clinical Surgery at King’s College London in 1877.<br><br><span class="para-ref">[5.2]</span> By the late 1880s and 1890s, the medical profession realized that chemical carbolic sprays were caustic and unnecessary, moving beyond *antiseptic surgery* (killing germs already present) to embrace *aseptic surgery* (excluding all germs from the operating environment entirely). High-pressure steam autoclaves (invented by Charles Chamberland in 1881 and championed by Ernst von Bergmann in 1886) sterilized all instruments; operating theatres were tiled with glazed porcelain that could be scrubbed with boiling water; and surgeons washed with carbolic soap and donned boiled cotton gowns, masks, and sterilized rubber gloves (introduced by William Halsted in 1889). Together, Simpson’s conquest of pain and Lister’s conquest of infection transformed the operating theatre from a butcher shop of terror into a precise, lifesaving science.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1700–1846',
        para_ref: '[1.1–1.2]',
        heading: 'Why was surgical speed essential before the discovery of anaesthetics?',
        bullets: [
          'Holding down screaming patients with leather straps',
          'Sawing off broken legs in thirty seconds',
          'Breathing sweet laughing gas at fairgrounds',
        ],
        focus_clue: 'Why was surgical speed essential before the discovery of anaesthetics?',
      },
      {
        step: 2,
        date: '1847–1853',
        para_ref: '[2.1–2.2]',
        heading: 'Why did the death of Hannah Greener cause panic among surgeons?',
        bullets: [
          'Sniffing heavy liquid vapour under dinner table',
          'Young Hannah Greener dying from cold overdose',
          'Queen Victoria giving birth with zero pain',
        ],
        focus_clue: 'Why did the death of Hannah Greener cause panic among surgeons?',
      },
      {
        step: 3,
        date: '1846–1865',
        para_ref: '[3.1–3.2]',
        heading: 'Why did conquering surgical pain lead to higher patient death rates?',
        bullets: [
          'Wearing stiff dried blood coats as badges',
          'Cutting deeper into belly flesh for longer',
          'Black rotting gangrene killing feverish patients',
        ],
        focus_clue: 'Why did conquering surgical pain lead to higher patient death rates?',
      },
      {
        step: 4,
        date: '1865–1870s',
        para_ref: '[4.1–4.2]',
        heading: 'How did Lister apply Germ Theory to solve hospital gangrene?',
        bullets: [
          'Treating green sewage water with smelly chemicals',
          "Wrapping boy Jamie Greenlees' fractured leg",
          'Pumping fine acid mist over open surgical wounds',
        ],
        focus_clue: 'How did Lister apply Germ Theory to solve hospital gangrene?',
      },
      {
        step: 5,
        date: '1880s–1890s',
        para_ref: '[4.1–4.2]',
        heading: 'What is the crucial difference between antiseptic and aseptic surgery?',
        bullets: [
          'Boiling metal scalpels in pressurized steam kettles',
          'Pulling on thin sterile rubber gloves',
          'Tying white cotton masks over mouths and noses',
        ],
        focus_clue: 'What is the crucial difference between antiseptic and aseptic surgery?',
      },
    ],
    causal_domino_spine: {
      title: 'The Surgical Revolution: Simpson’s Chloroform & Lister’s Antiseptics',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1700–1846',
          para_ref: '[1.1–1.2]',
          title: 'Pre-Anaesthetic Surgery: Speed & Shock',
          actor: 'Robert Liston & Pre-Anaesthetic Surgeons',
          tag: '⏱️ 30-SECOND AMPUTATIONS',
          trigger:
            'Before anaesthesia, surgical survival depended entirely on raw knife speed, with surgeons like Robert Liston amputating limbs in under 30 seconds while burly assistants pinned screaming patients.',
          desc: 'Before anaesthesia, surgical survival depended entirely on raw knife speed, with surgeons like Robert Liston amputating limbs in under 30 seconds while burly assistants pinned screaming patients.',
          connective:
            'Severe traumatic shock and haemorrhage killed over 40% of operative patients, preventing surgeons from attempting delicate internal thoracic or abdominal procedures.',
          question: 'Why was surgical speed essential before the discovery of anaesthetics?',
        },
        {
          step: 2,
          date: '1847–1853',
          para_ref: '[2.1–2.2]',
          title: 'James Simpson & Chloroform',
          actor: 'Professor James Simpson & Dr John Snow',
          tag: '😴 CHEMICAL CHLOROFORM',
          trigger:
            'Edinburgh professor James Simpson discovered the anaesthetic properties of chloroform in 1847; however, the fatal overdose of 15-year-old Hannah Greener in 1848 exposed dangerous dosage volatility.',
          desc: 'Edinburgh professor James Simpson discovered the anaesthetic properties of chloroform in 1847; however, the fatal overdose of 15-year-old Hannah Greener in 1848 exposed dangerous dosage volatility.',
          connective:
            'Dr John Snow invented a precision inhaler mask in 1853 to safely administer chloroform to Queen Victoria during Prince Leopold’s birth, securing royal endorsement and widespread medical acceptance.',
          question: 'Why did the death of Hannah Greener cause panic among surgeons?',
        },
        {
          step: 3,
          date: '1846–1865',
          para_ref: '[3.1–3.2]',
          title: 'The "Black Period" of Surgery',
          actor: 'Victorian Operating Surgeons',
          tag: '☠️ THE BLACK PERIOD',
          trigger:
            'Anaesthesia allowed surgeons to perform longer, more invasive internal operations, but surgeons still operated in blood-caked frock coats with unwashed hands and infected catgut sutures.',
          desc: 'Anaesthesia allowed surgeons to perform longer, more invasive internal operations, but surgeons still operated in blood-caked frock coats with unwashed hands and infected catgut sutures.',
          connective:
            'Triggered the catastrophic "Black Period" of surgery, where post-operative mortality surged due to virulent hospital gangrene, pyaemia, and sepsis invading open incisions.',
          question: 'Why did conquering surgical pain lead to higher patient death rates?',
        },
        {
          step: 4,
          date: '1865–1870s',
          para_ref: '[4.1–4.2]',
          title: 'Joseph Lister & Carbolic Acid Spray',
          actor: 'Joseph Lister (Professor of Surgery, Glasgow)',
          tag: '💨 CARBOLIC ACID SPRAY',
          trigger:
            "Applying Pasteur’s Germ Theory, Joseph Lister used carbolic acid (phenol) dressings to heal Jamie Greenlees' compound fractured leg in 1865 and built a steam carbolic spray to sanitize operating theatres.",
          desc: "Applying Pasteur’s Germ Theory, Joseph Lister used carbolic acid (phenol) dressings to heal Jamie Greenlees' compound fractured leg in 1865 and built a steam carbolic spray to sanitize operating theatres.",
          connective:
            'Plunged post-operative amputation mortality from 46% to 15% at Glasgow Royal Infirmary, definitively proving that microscopic airborne pathogens caused surgical wound sepsis.',
          question: 'How did Lister apply Germ Theory to solve hospital gangrene?',
        },
        {
          step: 5,
          date: '1880s–1890s',
          para_ref: '[5.1–5.2]',
          title: 'From Antiseptic to Aseptic Surgery',
          actor: 'Ernst von Bergmann & William Halsted',
          tag: '🧼 ASEPTIC AUTOCLAVES',
          trigger:
            'Surgeons realized Lister’s carbolic spray damaged human tissue and lungs, transitioning from killing germs inside wounds (antiseptic) to excluding all microbes from the theatre entirely (aseptic).',
          desc: 'Surgeons realized Lister’s carbolic spray damaged human tissue and lungs, transitioning from killing germs inside wounds (antiseptic) to excluding all microbes from the theatre entirely (aseptic).',
          connective:
            'Ernst von Bergmann introduced pressurized steam autoclave sterilizers in 1886, while William Halsted introduced thin rubber surgical gloves in 1890, creating the modern sterile operating theatre.',
          question: 'What is the crucial difference between antiseptic and aseptic surgery?',
        },
      ],
    },
  },

  lesson_3_5: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the public health revolution in Victorian Britain, examining how Edwin Chadwick’s 1842 report and the permissive 1848 Public Health Act were superseded by John Snow’s water-borne cholera discovery in Soho (1854), the political crisis of the Great Stink (1858) resulting in Bazalgette’s sewer network, and the compulsory 1875 Public Health Act that permanently ended laissez-faire.',
      objectives: [
        {
          objective:
            'Explain why the 1848 Public Health Act failed to solve the sanitary crisis in industrial cities.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Punch cartoon: A Court for King Cholera). Focus on laissez-faire ideology, the arrival of cholera in 1831, Chadwick’s report, and the purely permissive nature of the 1848 Act.',
          question:
            'Why did local ratepayer councils refuse to establish local health boards under the permissive 1848 Public Health Act?',
        },
        {
          objective:
            'Analyse Dr John Snow’s epidemiological investigation of the Broad Street pump outbreak in 1854.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source B (Snow’s spot map of Soho). Guide them to explain his door-to-door data collection, the clustering of deaths around the pump, and the anomalies of the brewery and workhouse.',
          question:
            'How did John Snow use the anomalies of the Lion Brewery and the Poland Street Workhouse to disprove miasma theory?',
        },
        {
          objective:
            'Evaluate why the medical establishment and Board of Health initially rejected Snow’s water-borne findings.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Contrast Snow’s Grand Experiment in South London with the entrenched miasma orthodoxy championed by William Farr and The Lancet.',
          question:
            'Why were leading Victorian doctors and government officials so committed to defending miasma theory against Snow’s evidence?',
        },
        {
          objective:
            'Assess how the Great Stink of 1858 forced Parliament to fund Joseph Bazalgette’s London sewer network.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source C (Bazalgette inspecting the Northern Outfall Sewer). Explain that fear of miasma among politicians in the House of Commons paradoxically saved thousands from water-borne cholera.',
          question:
            'Why did fear of foul miasma paradoxically lead to the creation of an engineering project that eliminated water-borne cholera?',
        },
        {
          objective:
            'Explain why the 1875 Public Health Act marked the definitive death blow to laissez-faire.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast the permissive 1848 Act with the compulsory 1875 duties, linking Disraeli’s reforms to the 1867 Reform Act that enfranchised urban working-class voters.',
          question:
            'Why was the 1875 Public Health Act able to succeed where the earlier 1848 Act had failed?',
        },
      ],
      source_context: {
        'Source A':
          "A Court for King Cholera (Punch, September 1852). John Leech's famous satirical wood engraving depicting the horrific squalor, overflowing cesspools, and dung heaps of an industrial London slum court. Hinge Question: What specific environmental factors in Victorian slum courts allowed water-borne diseases like cholera to spread so rapidly?",
        'Source B':
          'Dr John Snow’s Spot Map of the Broad Street Cholera Outbreak (1854). Lithograph map showing the distribution of cholera deaths in Soho clustered around the public water pump. Hinge Question: How did Snow use cartographic data to prove that cholera was water-borne rather than airborne miasma?',
        'Source C':
          'Joseph Bazalgette’s London Main Drainage Sewer Works (1860s). Albumen silver print showing Sir Joseph Bazalgette and engineering staff inspecting the massive brick tunnels of the Northern Outfall Sewer. Hinge Question: Why did it take the political crisis of the Great Stink of 1858 outside Parliament, rather than working-class cholera deaths, to compel the government to fund this civil engineering project?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Industrial Slums, Edwin Chadwick & The 1848 Public Health Act (1831–1848)',
        theme_heading:
          'Act 1: Industrial Slums, Edwin Chadwick & The 1848 Public Health Act (1831–1848)',
        source: {
          id: 'source_a_court_king_cholera',
          letter: 'A',
          title: 'Source A: A Court for King Cholera (Punch, September 1852)',
          src: '/images/court_for_king_cholera.png',
          source: '/images/court_for_king_cholera.png',
          image: '/images/court_for_king_cholera.png',
          caption:
            "John Leech's famous satirical wood engraving in Punch (1852) depicting the horrific squalor, overflowing cesspools, and dung heaps of an industrial London slum court where children play and a coffin is carried.",
          desc: '1852 Punch wood engraving criticizing sanitary neglect in industrial London slums.',
          provenance:
            'Wood engraving by John Leech, Punch, or the London Charivari, Vol. 23, 25 September 1852, p. 139. British Library / Wellcome Collection V0011166.',
          citation:
            'Wood engraving by John Leech, Punch, or the London Charivari, Vol. 23, 25 September 1852, p. 139. British Library / Wellcome Collection V0011166.',
          question:
            'What specific environmental factors in Victorian slum courts allowed water-borne diseases like cholera to spread so rapidly?',
          hinge_question:
            "Notice the barefoot children playing in filthy mud heaps, open cesspools, and dilapidated tenement houses beneath the banner 'Good Beds'. What specific environmental factors in Victorian slum courts allowed water-borne diseases like cholera to spread so rapidly?",
          source_context:
            'During the rapid industrialization of the nineteenth century, working-class families lived crammed into unpaved, undrained slum courts with shared privies over unlined cesspools. The cartoon depicts this squalor as the throne room of King Cholera, shaming Parliament for its laissez-faire inaction.',
          context:
            'During the rapid industrialization of the nineteenth century, working-class families lived crammed into unpaved, undrained slum courts with shared privies over unlined cesspools. The cartoon depicts this squalor as the throne room of King Cholera, shaming Parliament for its laissez-faire inaction.',
        },
        text: '<span class="para-ref">[1.1]</span> During the rapid industrialization of the early nineteenth century, British cities expanded at terrifying speed. Millions of rural laborers migrated into factory towns like Manchester, Leeds, and London, crammed into unpaved, back-to-back slum courts devoid of drainage or clean running water (<span class="archival-meta-tag">Source A</span>). Families shared overflowing communal privies that drained into unlined cesspools beneath floorboards, while drinking water was bought from water carts or pumped from shallow wells dug right next to sewage pits. The British government maintained a dogmatic *laissez-faire* ("leave alone") political ideology, asserting that taxpayers’ money should never be used to fund public works and that individuals were personally responsible for their own health.<br><br><span class="para-ref">[1.2]</span> In 1831, a terrifying new epidemic arrived from Asia: *Cholera*. Striking with ferocious speed, cholera caused violent vomiting, watery diarrhea, and fatal dehydration, turning victims blue within hours and killing over 50,000 Britons in 1831–32 alone. Subsequent epidemics struck in 1848, 1853, and 1866. In 1842, social reformer Edwin Chadwick published his landmark <em>Report on the Sanitary Condition of the Labouring Population</em>, arguing that filth and disease caused poverty and that local councils should build clean water and sewer networks. In response to the 1848 cholera outbreak, Parliament passed the *1848 Public Health Act*. However, the Act was purely *permissive* (optional): towns were not forced to set up health boards unless death rates were exceptionally high, and penny-pinching ratepayers fiercely resisted paying higher local taxes.',
      },
      {
        act: 2,
        title: 'Act 2: John Snow & The Broad Street Pump Detective Investigation (1854)',
        theme_heading: 'Act 2: John Snow & The Broad Street Pump Detective Investigation (1854)',
        source: {
          id: 'source_b_snow_cholera_map',
          letter: 'B',
          title: 'Source B: Dr John Snow’s Spot Map of the Broad Street Cholera Outbreak (1854)',
          src: '/images/john_snow_cholera_map.jpg',
          source: '/images/john_snow_cholera_map.jpg',
          image: '/images/john_snow_cholera_map.jpg',
          caption:
            'Map showing the distribution of cholera deaths in Soho, London, during the September 1854 epidemic, compiled by Dr John Snow.',
          desc: '1854 epidemiological spot map of the Broad Street cholera outbreak by Dr John Snow.',
          provenance:
            'Lithograph map from On the Mode of Communication of Cholera (2nd edition), Dr John Snow, London: John Churchill, 1855. Wellcome Collection, London (Iconographic Coll. L0014886).',
          citation:
            'Lithograph map from On the Mode of Communication of Cholera (2nd edition), Dr John Snow, London: John Churchill, 1855. Wellcome Collection, London (Iconographic Coll. L0014886).',
          question:
            'How did Snow use cartographic data to prove that cholera was water-borne rather than airborne miasma?',
          hinge_question:
            'Notice how the black bars indicating cholera deaths cluster densely around the Broad Street water pump, while the nearby brewery recorded zero deaths. How did Snow use cartographic data to prove that cholera was water-borne rather than airborne miasma?',
          source_context:
            'During the catastrophic September 1854 cholera outbreak in Soho, Dr John Snow marked each recorded death with a black bar on a street map. The deaths clustered overwhelmingly around the Broad Street water pump, while workers at the nearby brewery (who drank beer rather than pump water) remained unharmed.',
          context:
            'During the catastrophic September 1854 cholera outbreak in Soho, Dr John Snow marked each recorded death with a black bar on a street map. The deaths clustered overwhelmingly around the Broad Street water pump, while workers at the nearby brewery (who drank beer rather than pump water) remained unharmed.',
        },
        text: '<span class="para-ref">[2.1]</span> In August 1854, a catastrophic cholera outbreak struck the crowded Soho district of central London, killing over 500 people within ten days around Broad Street. Dr John Snow, an Edinburgh-trained physician and prominent anaesthetist, had long doubted miasma theory. Snow reasoned that because cholera attacked the digestive system rather than the lungs, the disease had to be ingested through contaminated drinking water rather than inhaled from bad air.<br><br><span class="para-ref">[2.2]</span> Snow launched a meticulous, door-to-door epidemiological investigation. On a detailed map of Soho, Snow drew a black bar at each street address representing each cholera victim (<span class="archival-meta-tag">Source B</span>). The visual pattern was startling: deaths were overwhelmingly clustered around the public water pump on the corner of Broad Street and Cambridge Street. Snow investigated two crucial anomalies that disproved miasma: first, the *Lion Brewery* on Broad Street had zero deaths among its seventy workers because they drank free beer instead of water; second, the *Poland Street Workhouse* lost only five inmates out of 535 because it had its own deep private well. Convinced by Snow’s forensic map, the parish vestry unscrewed the handle from the Broad Street pump on 8 September 1854, ending the outbreak overnight. Later excavation proved that an adjacent cracked cesspool had leaked infant cholera diarrhea into the well.',
      },
      {
        act: 3,
        title: 'Act 3: Board of Health Scepticism & The Miasma Orthodoxy (1854–1858)',
        theme_heading: 'Act 3: Board of Health Scepticism & The Miasma Orthodoxy (1854–1858)',
        text: '<span class="para-ref">[3.1]</span> Snow confirmed his water-borne hypothesis on a massive municipal scale through his celebrated "Grand Experiment" in South London during the 1854 epidemic. Comparing two competing private water companies that supplied houses along the exact same streets in Lambeth and Southwark, Snow uncovered stark statistical proof: customers of the *Southwark and Vauxhall Water Company* (which drew raw water from the sewage-polluted tidal Thames in central London) suffered **71 cholera deaths per 10,000 houses**; in contrast, customers of the *Lambeth Water Company* (which had moved its intake upriver to clean rural water at Thames Ditton) suffered only **5 deaths per 10,000 houses**.<br><br><span class="para-ref">[3.2]</span> Despite Snow’s overwhelming cartographic and statistical evidence, the medical establishment and the General Board of Health, led by figures like William Farr and Sir John Simon, obstinately rejected his findings. In 1855, the official government report concluded that there was no reason to doubt that cholera was spread by atmospheric miasma rising from filthy streets. The prestigious medical journal *The Lancet* published scathing critiques mocking Snow’s "peculiar water theory." Because Snow died of a stroke in 1858 at the age of forty-five, he did not live to see his discovery officially accepted by the scientific world.',
      },
      {
        act: 4,
        title: 'Act 4: The Great Stink of 1858 & Bazalgette’s London Sewer Network (1858–1865)',
        theme_heading:
          'Act 4: The Great Stink of 1858 & Bazalgette’s London Sewer Network (1858–1865)',
        source: {
          id: 'source_c_bazalgette_sewer',
          letter: 'C',
          title: 'Source C: Joseph Bazalgette’s London Main Drainage Sewer Works (1860s)',
          src: '/images/bazalgette_sewer.jpg',
          source: '/images/bazalgette_sewer.jpg',
          image: '/images/bazalgette_sewer.jpg',
          caption:
            'Sir Joseph Bazalgette and engineering staff inspecting the massive brick tunnels of the Northern Outfall Sewer during construction in east London, c. 1863.',
          desc: 'c.1863 photograph of Sir Joseph Bazalgette and engineers at the Northern Outfall Sewer.',
          provenance:
            'Albumen silver print of the Northern Outfall Sewer works, Metropolitan Board of Works, London, c. 1863. London Metropolitan Archives (Accession No. SC/PH/LMA/01/0572).',
          citation:
            'Albumen silver print of the Northern Outfall Sewer works, Metropolitan Board of Works, London, c. 1863. London Metropolitan Archives (Accession No. SC/PH/LMA/01/0572).',
          question:
            'Why did it take the political crisis of the Great Stink of 1858 outside Parliament, rather than working-class cholera deaths, to compel the government to fund this civil engineering project?',
          hinge_question:
            'Sir Joseph Bazalgette and engineers stand upon the massive brick-arched intercepting sewers under construction in London. Why did it take the political crisis of the Great Stink of 1858 outside Parliament, rather than working-class cholera deaths, to compel the government to fund this civil engineering project?',
          source_context:
            'Constructed between 1859 and 1865, Bazalgette’s London sewer system was one of the largest engineering projects in the Victorian world. It was authorized by Parliament after the Great Stink forced politicians to act.',
          context:
            'Constructed between 1859 and 1865, Bazalgette’s London sewer system was one of the largest engineering projects in the Victorian world. It was authorized by Parliament after the Great Stink forced politicians to act.',
        },
        text: '<span class="para-ref">[4.1]</span> The event that finally shattered government inertia was not Snow’s medical proof, but the political crisis of the *Great Stink of July 1858*. An intense summer heatwave caused the River Thames—which served as London’s open sewer for two million inhabitants—to ferment into a suffocating, putrid stench. Sittings in the House of Commons were halted, and window curtains were soaked in chloride of lime to neutralize the fumes. Terrified that the miasma would infect politicians, Parliament abandoned *laissez-faire* in just sixteen days, passing an emergency bill granting £3 million to civil engineer Sir Joseph Bazalgette to build London’s underground intercepting sewer network (<span class="archival-meta-tag">Source C</span>).<br><br><span class="para-ref">[4.2]</span> Opened in 1865, Bazalgette’s engineering marvel constructed 1,100 miles of street sewers feeding into 82 miles of massive brick-arched intercepting tunnels, diverting 420 million gallons of sewage every day eastward away from London’s drinking water intakes. When cholera struck Britain for the final time in 1866, areas connected to Bazalgette’s sewers remained completely free of the disease, providing undeniable public proof of Snow’s water-borne theory. When Robert Koch isolated the *Vibrio cholerae* bacterium under the microscope in 1883, Snow’s empirical detective work received final scientific validation.',
      },
      {
        act: 5,
        title: 'Act 5: The 1875 Public Health Act: The Death of Laissez-Faire (1875)',
        theme_heading: 'Act 5: The 1875 Public Health Act: The Death of Laissez-Faire (1875)',
        text: '<span class="para-ref">[5.1]</span> The ultimate legislative triumph of the sanitary revolution was the **1875 Public Health Act**, passed under Prime Minister Benjamin Disraeli’s Conservative government. While Edwin Chadwick’s earlier *1848 Public Health Act* had been purely *permissive* (optional) and largely ignored by tight-fisted local ratepayer councils, the 1875 Act was strictly **compulsory**: every town council was legally forced to provide clean piped water, construct modern drainage, collect street refuse, pave roadways, and appoint a full-time Medical Officer of Health and Sanitary Inspector.<br><br><span class="para-ref">[5.2]</span> Political democracy drove this legislative transformation. Under the 1867 Second Reform Act, urban working-class men had been granted the parliamentary vote; politicians could no longer ignore the appalling squalor of industrial slums if they wished to win elections. Combined with the Artisans’ Dwellings Act of 1875 (empowering councils to demolish filthy slums) and the Sale of Food and Drugs Act of 1875 (outlawing contaminated bread and milk), the 1875 Act marked the definitive death of *laissez-faire* and established the modern interventionist state, eliminating water-borne epidemics from Britain forever.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1831–1848',
        para_ref: '[1.1–1.2]',
        heading: 'Why did towns refuse to set up health boards under the 1848 Act?',
        bullets: [
          'Violent watery sickness turning human skin blue',
          'Piles of human excrement rotting near houses',
          'Parliament passing optional town health boards',
        ],
        focus_clue: 'Why did towns refuse to set up health boards under the 1848 Act?',
      },
      {
        step: 2,
        date: '1854',
        para_ref: '[2.1–2.2]',
        heading: 'How did Snow use epidemiological mapping to prove water transmission?',
        bullets: [
          'Plotting black death bars on street map',
          'Brewery men drinking ale staying completely healthy',
          'Unscrewing heavy iron pump handle with wrench',
        ],
        focus_clue: 'How did Snow use epidemiological mapping to prove water transmission?',
      },
      {
        step: 3,
        date: '1854–1858',
        para_ref: '[3.1–3.2]',
        heading: 'Why did the medical establishment refuse to accept Snow’s water theory?',
        bullets: [
          'Cracked brick cesspool leaking into drinking well',
          'Medical journals laughing at dirty water theory',
          'Doctors burning pitch barrels in foggy streets',
        ],
        focus_clue: 'Why did the medical establishment refuse to accept Snow’s water theory?',
      },
      {
        step: 4,
        date: '1858–1865',
        para_ref: '[4.1–4.2]',
        heading: 'Why did fear of miasma paradoxically save thousands from cholera?',
        bullets: [
          'Boiling brown river mud halting Parliament debates',
          'Soaking courtroom window curtains in lime juice',
          'Digging thousand miles of underground brick tunnels',
        ],
        focus_clue: 'Why did fear of miasma paradoxically save thousands from cholera?',
      },
      {
        step: 5,
        date: '1875',
        para_ref: '[5.1–5.2]',
        heading: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
        bullets: [
          'Working factory men winning parliamentary votes',
          'Forcing town councils to pipe clean fresh water',
          'Hiring official medical inspectors for bad food',
        ],
        focus_clue: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
      },
    ],
    causal_domino_spine: {
      title: 'Public Health & Cholera: John Snow & The 1875 Public Health Act',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1831–1848',
          para_ref: '[1.1–1.2]',
          title: 'Epidemic Terror & Edwin Chadwick',
          actor: 'Edwin Chadwick & General Board of Health',
          tag: "📜 CHADWICK'S 1842 REPORT",
          trigger:
            'Terrifying cholera epidemics swept British cities from 1831, prompting Edwin Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population advocating clean water pipes and sewer networks.',
          desc: 'Terrifying cholera epidemics swept British cities from 1831, prompting Edwin Chadwick’s 1842 Report on the Sanitary Condition of the Labouring Population advocating clean water pipes and sewer networks.',
          connective:
            'Parliament passed the 1848 Public Health Act; however, its permissive, optional powers were widely rejected by rate-paying ratepayers unwilling to fund expensive municipal civil engineering.',
          question: 'Why did towns refuse to set up health boards under the 1848 Act?',
        },
        {
          step: 2,
          date: '1854',
          para_ref: '[2.1–2.2]',
          title: 'John Snow & The Broad Street Pump',
          actor: 'Dr John Snow (Soho Epidemiologist)',
          tag: '🗺️ CHOLERA PIN MAP',
          trigger:
            'During the August 1854 Soho cholera outbreak, Dr John Snow mapped 500 fatal cases, demonstrating that deaths clustered tightly around the Broad Street communal public water pump.',
          desc: 'During the August 1854 Soho cholera outbreak, Dr John Snow mapped 500 fatal cases, demonstrating that deaths clustered tightly around the Broad Street communal public water pump.',
          connective:
            'Discovered brewery workers drinking malt liquor avoided infection entirely, persuading the local parish vestry to remove the pump handle and ending the local epidemic overnight.',
          question: 'How did Snow use epidemiological mapping to prove water transmission?',
        },
        {
          step: 3,
          date: '1854–1858',
          para_ref: '[3.1–3.2]',
          title: 'Board of Health & Miasma Orthodoxy',
          actor: 'William Farr & General Board of Health',
          tag: '🌫️ MIASMA ORTHODOXY',
          trigger:
            'Even after Snow proved a cracked cesspool had leaked infant cholera diarrhoea into the Broad Street well, the General Board of Health and Lancet journal rejected his waterborne theory.',
          desc: 'Even after Snow proved a cracked cesspool had leaked infant cholera diarrhoea into the Broad Street well, the General Board of Health and Lancet journal rejected his waterborne theory.',
          connective:
            'Elite physicians defended the entrenched miasma doctrine, refusing to abandon atmospheric damp and foul smells as the primary causal agents of epidemic disease.',
          question: 'Why did the medical establishment refuse to accept Snow’s water theory?',
        },
        {
          step: 4,
          date: '1858–1865',
          para_ref: '[4.1–4.2]',
          title: 'The Great Stink & Bazalgette’s Sewers',
          actor: 'Joseph Bazalgette (Metropolitan Board of Works)',
          tag: '🧱 EMBANKMENT SEWER NETWORK',
          trigger:
            'During the blistering summer heat of 1858, untreated sewage in the River Thames created the unbearable "Great Stink", forcing MPs in Parliament to soak window curtains in chloride of lime.',
          desc: 'During the blistering summer heat of 1858, untreated sewage in the River Thames created the unbearable "Great Stink", forcing MPs in Parliament to soak window curtains in chloride of lime.',
          connective:
            'Terrified MPs rapidly granted Sir Joseph Bazalgette £3 million to construct 1,100 miles of underground brick intercepting sewers, paradoxically removing waterborne cholera from London’s drinking supply.',
          question: 'Why did fear of miasma paradoxically save thousands from cholera?',
        },
        {
          step: 5,
          date: '1875',
          para_ref: '[5.1–5.2]',
          title: 'The 1875 Public Health Act: End of Laissez-Faire',
          actor: 'Benjamin Disraeli & Conservative Government',
          tag: '🏛️ COMPULSORY PUBLIC HEALTH ACT',
          trigger:
            'Following the 1867 Reform Act granting urban working men the vote, Prime Minister Benjamin Disraeli championed "Sanitas Sanitatum", passing the landmark Public Health Act of 1875.',
          desc: 'Following the 1867 Reform Act granting urban working men the vote, Prime Minister Benjamin Disraeli championed "Sanitas Sanitatum", passing the landmark Public Health Act of 1875.',
          connective:
            'Replaced optional recommendations with strict compulsory duties, mandating town councils to provide clean water, collect rubbish, inspect food, and hire Medical Officers of Health, permanently ending laissez-faire.',
          question: 'Why was the 1875 Act the definitive death blow to laissez-faire?',
        },
      ],
    },
  },
};

for (let i = 10; i <= 14; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT3_5_ACT_DATA[lesson.id];
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

  // 5. Update timeline_anchor
  lesson.timeline_anchor = updateData.causal_domino_spine.stages.map((st) => ({
    date: st.date,
    title: st.title,
    desc: st.trigger,
    para_ref: st.para_ref,
  }));
  console.log(`  - Aligned timeline_anchor (${lesson.timeline_anchor.length} anchors).`);

  // 6. Apply teacher_notes
  lesson.teacher_notes = updateData.teacher_notes;
  console.log(`  - Updated teacher_notes with 5 structured objectives & hinge questions.`);
}

const newFileContent = 'export const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log(
  '\n✅ Successfully migrated Key Topic 3 (18th & 19th Century) to 5-Act Gold Standard in data.js!',
);
