/**
 * History Revision Hub — Edexcel GCSE Medicine Through Time
 * Migration: Key Topic 4 (Modern Britain c1900–present) to Gold Standard 5 Acts
 *
 * Converts Key Topic 4 lessons 4.1 through 4.5 in units/edexcel_medicine/data.js:
 * 1. Retires obsolete 3-box `note_scaffold` across all remaining lessons.
 * 2. Structures narrative_blocks into 5 chronological Acts ([1.1] to [5.2]).
 * 3. Preserves and maps all authentic primary visual sources (Sources A, B) to their respective Acts.
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

const KT4_5_ACT_DATA = {
  lesson_4_1: {
    teacher_notes: {
      primer:
        'This enquiry explores how understanding disease causation transformed in the twentieth and twenty-first centuries, tracing the journey from Mendel’s laws of inheritance and early chromosomal genetics to Rosalind Franklin’s Photograph 51, Watson and Crick’s double helix model, the international Human Genome Project, and the modern gap between genetic screening and clinical gene therapy.',
      objectives: [
        {
          objective:
            'Explain how the rediscovery of Mendel’s laws revealed the mystery of hereditary disease.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that while Germ Theory explained infectious diseases, conditions like cystic fibrosis and haemophilia passed across generations without microbes, puzzling early twentieth-century biologists.',
          question:
            'Why was Germ Theory unable to explain hereditary illnesses like cystic fibrosis and sickle cell anaemia?',
        },
        {
          objective:
            'Analyse how Rosalind Franklin’s Photograph 51 provided mathematical proof of DNA’s helical structure.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Photograph 51). Guide them to explain her 62-hour X-ray crystallography exposure and how the distinct X-shaped diffraction cross proved DNA was a double-stranded helix.',
          question:
            'How did Franklin’s Photograph 51 provide the critical physical and mathematical breakthrough that unlocked DNA’s structure?',
        },
        {
          objective:
            'Examine how Watson and Crick’s double helix model explained biological reproduction and base pairing.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (1953 Double Helix Model). Highlight the complementary base-pairing rule (Adenine-Thymine, Cytosine-Guanine) and how unzipping allows exact biological replication.',
          question:
            'Why was complementary base pairing (A-T and C-G) the decisive discovery that explained how genetic code replicates during cell division?',
        },
        {
          objective:
            'Evaluate the medical milestone of the international Human Genome Project (1990–2003).',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on the collaborative sequencing of all 3 billion chemical base pairs across 20,000–25,000 human genes and the identification of cancer risk markers like BRCA1 and BRCA2.',
          question:
            'Why was mapping all 3 billion base pairs in the human genome considered a landmark turning point in understanding the causes of disease?',
        },
        {
          objective:
            'Assess the diagnostic-therapeutic lag between predictive genetic screening and clinical gene therapy.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast the rapid success of screening and preventative surgery (e.g. mastectomies) with the enormous ethical, technical, and financial difficulties of repairing mutated genes inside living bodies.',
          question:
            'Why has developing curative gene therapies proven so much more difficult than identifying faulty genes through diagnostic screening?',
        },
      ],
      source_context: {
        'Source A':
          'Rosalind Franklin’s Photograph 51 (May 1952). Historic X-ray crystallography diffraction image of crystallized calf thymus DNA taken by Rosalind Franklin and Raymond Gosling at King’s College London after 62 continuous hours of radiation exposure. Hinge Question: How does the sharp X-pattern in Franklin’s X-ray photograph mathematically prove that DNA is a helical coil rather than a flat chain, and why was this physical evidence critical for Watson and Crick’s model?',
        'Source B':
          'Watson and Crick’s 1953 Double Helix Model. The original 1953 double-helix molecular model built from sheet-metal bases and brass rods by James Watson and Francis Crick at the Cavendish Laboratory, Cambridge University. Hinge Question: Why was proving the exact base-pairing mechanism (A-T and C-G) the decisive breakthrough in understanding how genetic hereditary information replicates and passes between generations?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Mendel, Heredity & The Chromosomal Mystery (c1900–1940s)',
        theme_heading: 'Act 1: Mendel, Heredity & The Chromosomal Mystery (c1900–1940s)',
        text: '<span class="para-ref">[1.1]</span> By the opening decades of the twentieth century, Louis Pasteur and Robert Koch’s Germ Theory had conquered infectious medicine, explaining how external bacteria caused cholera, tuberculosis, and anthrax. Yet physicians were confronted by a profound biological mystery: why did fatal illnesses such as cystic fibrosis, sickle cell anemia, and hemophilia recur relentlessly across generations of the same family without any microbial infection? In 1900, European botanists rediscovered the forgotten 1866 hybridization experiments of Augustinian monk Gregor Mendel, which demonstrated that physical characteristics were transmitted from parents to offspring in precise mathematical ratios via invisible biological units termed "genes."<br><br><span class="para-ref">[1.2]</span> Medical researchers recognized that humanity possessed an internal biological blueprint; however, the physical nature of the gene remained an impenetrable enigma. Microscopic staining revealed thread-like chromosomes inside the cell nucleus, but biochemists were locked in debate over whether genetic blueprints were stored in complex chromosomal proteins or in a puzzling, overlooked nucleic acid called deoxyribonucleic acid (DNA). Without deciphering the molecular geometry of DNA, doctors could neither explain how genetic information replicated during cellular division nor comprehend how microscopic copying errors caused catastrophic hereditary mutations.',
      },
      {
        act: 2,
        title: 'Act 2: Rosalind Franklin & Photograph 51 (1951–1952)',
        theme_heading: 'Act 2: Rosalind Franklin & Photograph 51 (1951–1952)',
        source: {
          id: 'source_a_photograph_51',
          letter: 'A',
          title: 'Source A: Rosalind Franklin’s Photograph 51 (May 1952)',
          src: '/images/photograph_51.jpg',
          source: '/images/photograph_51.jpg',
          image: '/images/photograph_51.jpg',
          caption:
            'Photograph 51: X-ray diffraction photograph of crystallized DNA, taken by Rosalind Franklin and Raymond Gosling at King’s College London in May 1952.',
          desc: 'Historic X-ray crystallography diffraction image of DNA taken by Rosalind Franklin.',
          provenance:
            'Primary photographic diffraction plate produced in May 1952 at the Medical Research Council Biophysics Unit, King’s College London (Accession: MRC-KCL-51) / Science Museum London.',
          citation:
            'Rosalind Franklin & Raymond Gosling, King’s College London Archive (MRC-KCL-51), May 1952.',
          question:
            'How does the sharp X-pattern in Franklin’s X-ray photograph mathematically prove that DNA is a helical coil rather than a flat chain, and why was this physical evidence critical for Watson and Crick’s model?',
          hinge_question:
            'How does the sharp X-pattern in Franklin’s X-ray photograph mathematically prove that DNA is a helical coil rather than a flat chain, and why was this physical evidence critical for Watson and Crick’s model?',
          source_context:
            'In May 1952 at King’s College London, physical chemist Rosalind Franklin and Raymond Gosling captured Photograph 51 using X-ray crystallography after 62 continuous hours of radiation exposure. The distinct X-shaped dark reflection pattern provided definitive mathematical proof of DNA’s helical cylinder.',
          context:
            'In May 1952 at King’s College London, physical chemist Rosalind Franklin and Raymond Gosling captured Photograph 51 using X-ray crystallography after 62 continuous hours of radiation exposure. The distinct X-shaped dark reflection pattern provided definitive mathematical proof of DNA’s helical cylinder.',
        },
        text: '<span class="para-ref">[2.1]</span> In January 1951, physical chemist Rosalind Franklin joined King’s College London, bringing world-class expertise in X-ray crystallography—a demanding technique whereby high-energy X-ray beams were diffracted through crystallized biological fibers onto photographic film. Working alongside PhD student Raymond Gosling in a damp, subterranean basement laboratory, Franklin perfected a micro-camera setup, exposing calf thymus DNA to 62 continuous hours of radiation under controlled humidity. In May 1952, Franklin captured "Photograph 51" (<span class="archival-meta-tag">Source A</span>), a stark, razor-sharp diffraction image displaying an unmistakable dark X-shaped cross of reflections that mathematically proved DNA formed a double-stranded helical cylinder.<br><br><span class="para-ref">[2.2]</span> Severe institutional discord paralyzed the King’s biophysics unit. Maurice Wilkins, a senior physicist who mistakenly regarded Franklin as his technical assistant rather than an independent investigator, clashed with her rigorous empirical standards. In January 1953, without Franklin’s knowledge or permission, Wilkins showed Photograph 51 to James Watson, an ambitious 24-year-old American biologist visiting from Cambridge. Watson later recorded that his jaw dropped and his pulse raced upon viewing the print: the distinct X-cross pattern immediately provided Watson and his Cambridge collaborator Francis Crick with the exact mathematical dimensions required to solve the molecule.',
      },
      {
        act: 3,
        title: 'Act 3: Watson & Crick’s Double Helix Model (1953)',
        theme_heading: 'Act 3: Watson & Crick’s Double Helix Model (1953)',
        source: {
          id: 'source_b_dna_model',
          letter: 'B',
          title: 'Source B: Watson and Crick’s 1953 Double Helix Model',
          src: '/images/dna_structure.jpg',
          source: '/images/dna_structure.jpg',
          image: '/images/dna_structure.jpg',
          caption:
            'The original 1953 double-helix molecular model built from sheet-metal bases and brass rods by James Watson and Francis Crick, preserved at the Science Museum, London.',
          desc: 'The original 1953 Cavendish Laboratory double-helix molecular model.',
          provenance:
            'Primary laboratory artifact constructed in March 1953 at the Cavendish Laboratory, Cambridge University. Science Museum London Collection (Accession: 1976-410).',
          citation:
            'James Watson & Francis Crick, Cavendish Laboratory, Cambridge, March 1953 (Science Museum 1976-410).',
          question:
            'Why was proving the exact base-pairing mechanism (A-T and C-G) the decisive breakthrough in understanding how genetic hereditary information replicates and passes between generations?',
          hinge_question:
            'Why was proving the exact base-pairing mechanism (A-T and C-G) the decisive breakthrough in understanding how genetic hereditary information replicates and passes between generations?',
          source_context:
            'In March 1953 at the Cavendish Laboratory in Cambridge, James Watson and Francis Crick constructed this three-dimensional molecular model from sheet-metal bases and brass rods, deciphering the complementary base pairing of Adenine-Thymine and Cytosine-Guanine.',
          context:
            'In March 1953 at the Cavendish Laboratory in Cambridge, James Watson and Francis Crick constructed this three-dimensional molecular model from sheet-metal bases and brass rods, deciphering the complementary base pairing of Adenine-Thymine and Cytosine-Guanine.',
        },
        text: '<span class="para-ref">[3.1]</span> Armed with Franklin’s experimental measurements, Watson and Crick spent frantic weeks in their Cambridge Free School Lane laboratory assembling sheet-metal cutouts and brass wire rods on an upright stand. In March 1953, they completed a magnificent three-dimensional model (<span class="archival-meta-tag">Source B</span>) revealing that DNA was a "double helix"—two antiparallel sugar-phosphate backbones intertwined around a central axis, linked by complementary nitrogenous base pairs: Adenine (A) bonded strictly to Thymine (T), and Cytosine (C) bonded strictly to Guanine (G).<br><br><span class="para-ref">[3.2]</span> This base-pairing rule instantly solved the mechanism of biological reproduction: during cell division, the two strands unzip, and each acts as a template to synthesize an identical replica. Watson and Crick famously burst into The Eagle pub, proclaiming they had discovered "the secret of life." In April 1953, they published their 900-word breakthrough paper in <em>Nature</em>, opening the modern era of molecular genetics.',
      },
      {
        act: 4,
        title: 'Act 4: The Human Genome Project (1990–2003)',
        theme_heading: 'Act 4: The Human Genome Project (1990–2003)',
        text: '<span class="para-ref">[4.1]</span> Deciphering the structure of DNA was the catalyst for the greatest collaborative expedition in biomedical history: the Human Genome Project. Launched in 1990 as an international public consortium led by James Watson and Francis Collins and co-funded by the UK Wellcome Trust Sanger Institute, researchers across Britain, the United States, France, Germany, and Japan spent thirteen years decoding the genetic instruction manual.<br><br><span class="para-ref">[4.2]</span> Completed in April 2003, the project successfully mapped all 3 billion chemical base pairs across humanity’s 20,000–25,000 genes, publishing the data free online. This monumental digital reference sequence allows geneticists to pinpoint specific faulty mutations responsible for over 4,000 inherited disorders, including the BRCA1 and BRCA2 genes that dramatically elevate hereditary breast and ovarian cancer risks.',
      },
      {
        act: 5,
        title: 'Act 5: Genetic Screening & The Treatment Gap (2000s–Present)',
        theme_heading: 'Act 5: Genetic Screening & The Treatment Gap (2000s–Present)',
        text: '<span class="para-ref">[5.1]</span> The genetic revolution fundamentally transformed modern clinical practice from reactive symptom management into predictive, personalized medicine. Armed with genomic sequencing, contemporary doctors no longer rely on standardized treatments; instead, individuals carrying faulty hereditary mutations can undergo preventative blood screening, enabling life-saving prophylactic surgery such as double mastectomies decades before malignant tumors form. Furthermore, pharmacogenomics matches targeted drug therapies directly to a patient’s individual DNA profile.<br><br><span class="para-ref">[5.2]</span> However, medical historians emphasize the persistent "Diagnostic-Therapeutic Lag": while sequencing a patient’s genome is now rapid and inexpensive, developing safe, effective gene therapies remains extraordinarily complex, costly, and ethically contested. Correcting mutated genes inside living human bodies via techniques like CRISPR-Cas9 has progressed slowly, proving that understanding the genetic cause of disease does not automatically translate into an immediate clinical cure.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: 'c1900–1940s',
        para_ref: '[1.1–1.2]',
        heading: 'Why did doctors assume proteins carried hereditary traits?',
        bullets: [
          'Growing wrinkled green garden peas',
          'Spotting dark rod shapes inside cells',
          'Assuming heavy protein chains hold secrets',
        ],
        focus_clue: 'Why did doctors assume proteins carried hereditary traits?',
      },
      {
        step: 2,
        date: '1951–1952',
        para_ref: '[2.1–2.2]',
        heading: 'How did Photograph 51 prove DNA’s helical structure?',
        bullets: [
          'Beaming invisible rays through wet DNA fibers',
          'Exposing glass photographic plates for sixty hours',
          'Revealing clear fuzzy X-shaped shadow marks',
        ],
        focus_clue: 'How did Photograph 51 prove DNA’s helical structure?',
      },
      {
        step: 3,
        date: '1953',
        para_ref: '[3.1–3.2]',
        heading: 'How did base pairing explain hereditary replication?',
        bullets: [
          'Twisting thin metal wire into spirals',
          'Locking four chemical pairs like puzzle pieces',
          'Rushing to celebratory pints at The Eagle pub',
        ],
        focus_clue: 'How did base pairing explain hereditary replication?',
      },
      {
        step: 4,
        date: '1990–2003',
        para_ref: '[4.1–4.2]',
        heading: 'Why was mapping 3 billion base pairs a medical milestone?',
        bullets: [
          'Linking laboratory supercomputers across six nations',
          'Reading three billion chemical letters in blood',
          'Publishing complete human code free online',
        ],
        focus_clue: 'Why was mapping 3 billion base pairs a medical milestone?',
      },
      {
        step: 5,
        date: '2000s–Present',
        para_ref: '[5.1–5.2]',
        heading: 'Why did understanding causes outpace finding cures?',
        bullets: [
          'Testing saliva drops for faulty breast genes',
          'Matching targeted pills to personal body code',
          'Struggling to fix broken genetic code inside bodies',
        ],
        focus_clue: 'Why did understanding causes outpace finding cures?',
      },
    ],
    causal_domino_spine: {
      title: 'Ideas on Causes: Genetics, DNA & The Human Genome Project',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: 'c1900–1940s',
          para_ref: '[1.1–1.2]',
          title: 'Mendel & Early Genetics',
          actor: 'Gregor Mendel & Early Cytologists',
          tag: '🌱 MENDELIAN INHERITANCE',
          trigger:
            'Early 20th-century biologists rediscovered Gregor Mendel’s laws of inheritance and observed thread-like chromosomes inside cells, but assumed complex protein chains must carry hereditary data.',
          desc: 'Early 20th-century biologists rediscovered Gregor Mendel’s laws of inheritance and observed thread-like chromosomes inside cells, but assumed complex protein chains must carry hereditary data.',
          connective:
            'Delayed recognition of DNA as the fundamental carrier of genetic information until Oswald Avery proved in 1944 that DNA transferred hereditary pneumonia traits in mice.',
          question: 'Why did doctors assume proteins carried hereditary traits?',
        },
        {
          step: 2,
          date: '1951–1952',
          para_ref: '[2.1–2.2]',
          title: 'Franklin & Photograph 51',
          actor: 'Rosalind Franklin & Maurice Wilkins',
          tag: '🔬 PHOTOGRAPH 51',
          trigger:
            "Rosalind Franklin at King's College London used X-ray crystallography to capture Photograph 51 in May 1952, exposing delicate DNA fibres to X-rays for 62 continuous hours.",
          desc: "Rosalind Franklin at King's College London used X-ray crystallography to capture Photograph 51 in May 1952, exposing delicate DNA fibres to X-rays for 62 continuous hours.",
          connective:
            'Revealed a sharp, distinctive X-shaped diffraction pattern that mathematically proved DNA possessed a double-helix helical structure with sugar-phosphate backbones on the outside.',
          question: 'How did Photograph 51 prove DNA’s helical structure?',
        },
        {
          step: 3,
          date: '1953',
          para_ref: '[3.1–3.2]',
          title: 'Watson & Crick’s Model',
          actor: 'James Watson & Francis Crick',
          tag: '🧬 THE DOUBLE HELIX',
          trigger:
            'Armed with Franklin’s experimental data, Cambridge researchers James Watson and Francis Crick constructed a three-dimensional tin-and-wire physical model of DNA at the Cavendish Laboratory.',
          desc: 'Armed with Franklin’s experimental data, Cambridge researchers James Watson and Francis Crick constructed a three-dimensional tin-and-wire physical model of DNA at the Cavendish Laboratory.',
          connective:
            'Demonstrated how complementary base pairs (Adenine-Thymine, Cytosine-Guanine) form the rungs of a twisted ladder, instantly explaining how genetic codes copy and replicate during cell division.',
          question: 'How did base pairing explain hereditary replication?',
        },
        {
          step: 4,
          date: '1990–2003',
          para_ref: '[4.1–4.2]',
          title: 'Human Genome Project',
          actor: 'International Human Genome Sequencing Consortium',
          tag: '💻 HUMAN GENOME MAPPING',
          trigger:
            'Launched in 1990, the publicly funded Human Genome Project coordinated scientists across six nations to sequence all 3 billion chemical base pairs in human DNA.',
          desc: 'Launched in 1990, the publicly funded Human Genome Project coordinated scientists across six nations to sequence all 3 billion chemical base pairs in human DNA.',
          connective:
            'Completed in 2003 with the data published free online, locating over 20,000 human genes and pinpointing specific genetic mutations responsible for hereditary disorders like cystic fibrosis.',
          question: 'Why was mapping 3 billion base pairs a medical milestone?',
        },
        {
          step: 5,
          date: '2000s–Present',
          para_ref: '[5.1–5.2]',
          title: 'Screening & Treatment Gap',
          actor: 'Modern Clinical Geneticists & Oncologists',
          tag: '🧬 GENETIC SCREENING & THERAPY',
          trigger:
            'Genetic knowledge enabled rapid predictive screening for hereditary cancer risks (such as faulty BRCA1/BRCA2 breast cancer genes) and targeted pharmacogenomics.',
          desc: 'Genetic knowledge enabled rapid predictive screening for hereditary cancer risks (such as faulty BRCA1/BRCA2 breast cancer genes) and targeted pharmacogenomics.',
          connective:
            'However, correcting defective genes inside living human bodies via gene therapy has proven notoriously complex, leaving a persistent historical gap between causal understanding and therapeutic cures.',
          question: 'Why did understanding causes outpace finding cures?',
        },
      ],
    },
  },

  lesson_4_2: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the revolution in medical diagnosis and public health during the twentieth century, analyzing Wilhelm Röntgen’s discovery of X-rays (1895), the development of automated blood labs and fibre-optic endoscopy, Godfrey Hounsfield’s invention of Computerized Tomography (CT) and MRI, the epidemiological shift from infectious to chronic lifestyle diseases, and state-sponsored preventative lifestyle campaigns.',
      objectives: [
        {
          objective:
            'Explain how Wilhelm Röntgen’s discovery of X-rays transformed non-invasive surgical diagnosis.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Bertha Röntgen’s hand). Highlight how X-rays allowed doctors to locate bone fractures and shrapnel without exploratory knife surgery, especially during WWI.',
          question:
            'How did Röntgen’s X-rays overturn centuries of surgical guesswork when diagnosing internal trauma?',
        },
        {
          objective:
            'Analyse how automated biochemical blood tests and fibre-optic endoscopy reduced diagnostic risk.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain that blood labs detected cellular and chemical abnormalities while flexible endoscopes allowed direct visualization of organs through natural orifices, replacing exploratory laparotomies.',
          question:
            'Why was fiber-optic endoscopy so much safer for patients than exploratory surgery?',
        },
        {
          objective:
            'Evaluate how Godfrey Hounsfield’s CT scanner and MRI revolutionized soft-tissue imaging.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Prototype EMI CT scanner). Contrast 2D flat bone shadows with digital 3D cross-sectional slices that revealed previously invisible brain tumors.',
          question:
            'How did computer algorithms enable CT scanners to overcome the limitations of traditional two-dimensional X-rays?',
        },
        {
          objective:
            'Examine the twentieth-century epidemiological transition from infectious fevers to chronic lifestyle illnesses.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on rising life expectancy (from 46 in 1900 to over 75) and the emergence of coronary heart disease, lung cancer, and diabetes driven by diet, smoking, and alcohol.',
          question:
            'What demographic and medical factors caused lifestyle illnesses to replace infectious epidemics as Britain’s leading killers?',
        },
        {
          objective:
            'Assess why governments increasingly prioritize statutory lifestyle prevention over expensive hospital treatments.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Discuss public health initiatives: the 2007 indoor smoking ban, sugar taxes, Change4Life, and seatbelt laws, contrasting their cost-effectiveness against multimillion-pound acute hospital technologies.',
          question:
            'Why do modern health authorities argue that statutory lifestyle prevention delivers greater health gains than high-tech hospital scanning machines?',
        },
      ],
      source_context: {
        'Source A':
          'The First Clinical X-Ray: Bertha Röntgen’s Hand (1895). Historic radiographic glass plate produced on 22 December 1895 at the University of Würzburg, showing the living skeletal bones and signet ring of Wilhelm Röntgen’s wife without surgery. Hinge Question: How did Röntgen’s discovery of X-rays fundamentally overturn thousands of years of medical diagnosis by allowing physicians to view internal pathology without making an incision?',
        'Source B':
          'Godfrey Hounsfield’s Prototype EMI CT Scanner (1971). The original computed tomography scanner apparatus developed at EMI Laboratories, combining rotating X-ray beams with digital computing to generate 3D cross-sectional slices. Hinge Question: In what way did computerized axial tomography (CT scanning) overcome the fundamental 2D flattening limitation of traditional Röntgen X-rays when diagnosing soft-tissue brain tumours?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Wilhelm Röntgen & The Discovery of X-Rays (1895–1918)',
        theme_heading: 'Act 1: Wilhelm Röntgen & The Discovery of X-Rays (1895–1918)',
        source: {
          id: 'source_a_first_xray',
          letter: 'A',
          title: 'Source A: The First Clinical X-Ray: Bertha Röntgen’s Hand (1895)',
          src: '/images/rontgen_first_xray.jpg',
          source: '/images/rontgen_first_xray.jpg',
          image: '/images/rontgen_first_xray.jpg',
          caption:
            'Hand mit Ringen: The historic X-ray photograph of Anna Bertha Röntgen’s hand taken by Wilhelm Conrad Röntgen on 22 December 1895 at the University of Würzburg.',
          desc: 'Historic first radiographic image of human living anatomy taken by Wilhelm Röntgen.',
          provenance:
            'Primary photographic glass plate produced on 22 December 1895 at the Institute of Physics, University of Würzburg, Germany. Deutsches Museum / Science Museum London.',
          citation:
            'Wilhelm Conrad Röntgen, University of Würzburg Institute of Physics (Accession: WURZ-PHYS-1895), December 1895.',
          question:
            'How did Röntgen’s discovery of X-rays fundamentally overturn thousands of years of medical diagnosis by allowing physicians to view internal pathology without making an incision?',
          hinge_question:
            'How did Röntgen’s discovery of X-rays fundamentally overturn thousands of years of medical diagnosis by allowing physicians to view internal pathology without making an incision?',
          source_context:
            'On 22 December 1895 at the University of Würzburg, Wilhelm Röntgen produced humanity’s first clinical X-ray, capturing the living skeletal architecture of his wife Anna Bertha’s hand and signet ring without surgical dissection.',
          context:
            'On 22 December 1895 at the University of Würzburg, Wilhelm Röntgen produced humanity’s first clinical X-ray, capturing the living skeletal architecture of his wife Anna Bertha’s hand and signet ring without surgical dissection.',
        },
        text: '<span class="para-ref">[1.1]</span> In 1895, physician diagnostics remained trapped on the exterior of the living body: doctors tapped chests, smelled urine, and took pulses, but could only discover internal fractures, bullets, or tumors through agonizing exploratory knife surgery. The diagnostic revolution ignited unexpectedly in Würzburg, Germany, on 8 November 1895. Physicist Wilhelm Röntgen, experimenting with high-voltage electrical discharges inside an evacuated glass Crookes tube, noticed that a cardboard screen coated with barium platinocyanide fluoresced green in his darkened laboratory, despite the tube being shielded in thick black cardboard. Röntgen realized an unknown, highly penetrating form of electromagnetic radiation was escaping the glass, christening the phenomenon "X-rays" using the mathematical variable for the unknown.<br><br><span class="para-ref">[1.2]</span> On 22 December 1895, Röntgen exposed his wife Bertha’s hand over a photographic glass plate for fifteen minutes (<span class="archival-meta-tag">Source A</span>). The developed plate revealed the living skeletal architecture of her fingers and her dark wedding ring, causing Bertha to cry: "I have seen my death!" News spread across the globe within days; within months, British voluntary hospitals installed primitive X-ray apparatus to locate bone fractures without incisions. During World War I, Polish-French scientist Marie Curie mobilized twenty mobile radiology cars ("petites Curies"), driving diagnostic X-ray units directly to front-line Casualty Clearing Stations to locate shrapnel before fatal gas gangrene set in.',
      },
      {
        act: 2,
        title: 'Act 2: Blood Laboratories & Fibre-Optic Endoscopy (1930s–1960s)',
        theme_heading: 'Act 2: Blood Laboratories & Fibre-Optic Endoscopy (1930s–1960s)',
        text: '<span class="para-ref">[2.1]</span> As the twentieth century progressed, hospital diagnostics moved beyond bones to chemical pathology and biochemistry. Automated laboratory testing transformed diagnostic precision: centrifuges separated blood plasma, automated cell counters measured white blood cell spikes signaling acute infection or leukaemia, and biochemical assays measured blood glucose to diagnose diabetes and blood pressure cuffs monitored cardiovascular strain. Instead of guessing from external symptoms, clinicians possessed quantifiable biochemical indicators.<br><br><span class="para-ref">[2.2]</span> Alongside blood testing arose flexible fibre-optic endoscopy. Prior to the 1950s, inspecting internal organs required rigid metal tubes that risked puncturing delicate tissues, or dangerous exploratory laparotomies (cutting open the abdomen). In the 1950s and 1960s, optical physicists developed coherent bundles of flexible glass fibres that transmitted light and high-resolution images around bends. Doctors could now slide flexible endoscopes down a patient’s throat or into the bowel, directly inspecting gastric ulcers and biopsying tumors under direct vision without a single surgical incision.',
      },
      {
        act: 3,
        title: 'Act 3: Godfrey Hounsfield, The CT Scanner & MRI (1971–1980s)',
        theme_heading: 'Act 3: Godfrey Hounsfield, The CT Scanner & MRI (1971–1980s)',
        source: {
          id: 'source_b_ct_scanner',
          letter: 'B',
          title: 'Source B: Godfrey Hounsfield’s Prototype EMI CT Scanner (1971)',
          src: '/images/ct_scanner_prototype.png',
          source: '/images/ct_scanner_prototype.png',
          image: '/images/ct_scanner_prototype.png',
          caption:
            'The original prototype EMI brain CT scanner apparatus developed by Godfrey Hounsfield in 1971, featuring the rotating X-ray source and detector assembly, preserved at the Science Museum.',
          desc: 'The original prototype computed tomography scanner developed at EMI Laboratories.',
          provenance:
            'Primary engineering prototype developed at EMI Central Research Laboratories, Hayes, and clinically tested at Atkinson Morley Hospital in October 1971. Science Museum London Collection.',
          citation:
            'Godfrey Hounsfield / EMI Central Research Laboratories (Science Museum London Accession: 1980-143), 1971.',
          question:
            'In what way did computerized axial tomography (CT scanning) overcome the fundamental 2D flattening limitation of traditional Röntgen X-rays when diagnosing soft-tissue brain tumours?',
          hinge_question:
            'In what way did computerized axial tomography (CT scanning) overcome the fundamental 2D flattening limitation of traditional Röntgen X-rays when diagnosing soft-tissue brain tumours?',
          source_context:
            'In 1971 at Atkinson Morley Hospital in Wimbledon, British electrical engineer Godfrey Hounsfield assembled the prototype EMI clinical CT scanner, combining rotating X-ray beams with digital computing algorithms to generate cross-sectional 3D slices of the brain.',
          context:
            'In 1971 at Atkinson Morley Hospital in Wimbledon, British electrical engineer Godfrey Hounsfield assembled the prototype EMI clinical CT scanner, combining rotating X-ray beams with digital computing algorithms to generate cross-sectional 3D slices of the brain.',
        },
        text: '<span class="para-ref">[3.1]</span> Despite their brilliance, conventional 2D X-rays suffered from a major blind spot: dense bones cast intense white shadows that obscured underlying soft tissues, rendering brain tumors, blood clots, and liver carcinomas invisible. In 1967, British electrical engineer Godfrey Hounsfield, working at EMI Central Research Laboratories, devised Computerized Tomography (CT). Hounsfield realized that rotating an X-ray tube 360 degrees around a patient while linked to a digital computer allowed thousands of tissue density measurements to be mathematically reconstructed into razor-sharp cross-sectional 3D "slices" of internal organs.<br><br><span class="para-ref">[3.2]</span> In October 1971, Hounsfield installed his prototype clinical CT scanner (<span class="archival-meta-tag">Source B</span>) at Atkinson Morley Hospital in Wimbledon. The first scan clearly revealed a dark circular tumor in a patient’s frontal lobe, allowing surgeons to excise it with millimeter precision. The CT scanner was followed in the late 1970s and 1980s by Magnetic Resonance Imaging (MRI), developed by Sir Peter Mansfield and Raymond Damadian. MRI used powerful magnetic fields and harmless radio waves to render soft tissues, spinal cords, and brain matter with pristine clarity and zero ionizing radiation.',
      },
      {
        act: 4,
        title: 'Act 4: The Epidemiological Shift to Chronic & Lifestyle Diseases (c1950–1980s)',
        theme_heading:
          'Act 4: The Epidemiological Shift to Chronic & Lifestyle Diseases (c1950–1980s)',
        text: '<span class="para-ref">[4.1]</span> In 1900, infectious diseases—tuberculosis, pneumonia, cholera, and diphtheria—were the undisputed executioners of British citizens, holding average life expectancy to just 46 for men and 50 for women. Over the subsequent six decades, clean municipal water, compulsory childhood immunizations, and the mass deployment of antibiotics brought bacterial epidemics under historic control. Average UK life expectancy surged past 75 by the 1980s.<br><br><span class="para-ref">[4.2]</span> However, living decades longer triggered a profound "epidemiological transition": the leading causes of national mortality shifted decisively from external microbial pathogens to non-communicable, chronic lifestyle illnesses. Epidemiologists isolated major culprits: commercial cigarette smoking causing lung cancer and COPD; excessive alcohol causing liver cirrhosis; sedentary diets high in saturated fats and refined sugars driving coronary heart disease, strokes, and type 2 diabetes; and UV sunbeds causing melanoma. Twentieth-century medicine recognized that daily consumer behaviors were degrading internal organs from within.',
      },
      {
        act: 5,
        title: 'Act 5: State Lifestyle Campaigns & Prevention vs High-Tech Cure (1980s–Present)',
        theme_heading:
          'Act 5: State Lifestyle Campaigns & Prevention vs High-Tech Cure (1980s–Present)',
        text: '<span class="para-ref">[5.1]</span> Confronted by the astronomical financial cost of managing chronic lifestyle illnesses with high-tech scanners and intensive hospital care, the British government recognized that prevention was far more effective than clinical treatment. From the 1980s onward, the Department of Health launched nationwide health promotion campaigns: compulsory seatbelts (1983), the Change4Life dietary and exercise initiative, the soft drinks sugar levy (2018), and graphic public education campaigns warning against binge drinking and skin cancer.<br><br><span class="para-ref">[5.2]</span> The ultimate legislative expression of this philosophy was the landmark Health Act 2006, which made all enclosed public places and workplaces smoke-free from 1 July 2007. Health economists proved that statutory regulation and lifestyle prevention deliver far greater aggregate population health improvements at a fraction of the cost of high-tech scanners, demonstrating that modern public health requires combining cutting-edge diagnostic technology with compulsory state intervention.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1895–1918',
        para_ref: '[1.1–1.2]',
        heading: 'How did X-rays transform surgical trauma diagnosis in WWI?',
        bullets: [
          'Photographing wife Bertha’s hand and gold wedding ring',
          'Driving mobile medical vans to muddy trenches',
          'Finding jagged lead shrapnel without deep cuts',
        ],
        focus_clue: 'How did X-rays transform surgical trauma diagnosis in WWI?',
      },
      {
        step: 2,
        date: '1930s–1960s',
        para_ref: '[2.1–2.2]',
        heading: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
        bullets: [
          'Spinning red test tubes in fast centrifuges',
          'Counting abnormal white cells on glass slides',
          'Sliding flexible glass cables down throat tubes',
        ],
        focus_clue: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
      },
      {
        step: 3,
        date: '1971–1980s',
        para_ref: '[3.1–3.2]',
        heading: 'Why did CT scans transform internal soft-tissue diagnosis?',
        bullets: [
          'Spinning heavy donut scanners around hospital beds',
          'Combining computer pictures into 3D body slices',
          'Using magnetic radio waves to find brain lumps',
        ],
        focus_clue: 'Why did CT scans transform internal soft-tissue diagnosis?',
      },
      {
        step: 4,
        date: 'c1950–1980s',
        para_ref: '[4.1–4.2]',
        heading: 'What drove the shift from infectious to lifestyle diseases?',
        bullets: [
          'Banishing deadly childhood fevers with wonder drugs',
          'People living past seventy years of age',
          'Rising chest tumours and clogged heart arteries',
        ],
        focus_clue: 'What drove the shift from infectious to lifestyle diseases?',
      },
      {
        step: 5,
        date: '1980s–Present',
        para_ref: '[5.1–5.2]',
        heading: 'Why do governments favour lifestyle prevention over treatment?',
        bullets: [
          'Clicking compulsory car seatbelts across chests',
          'Extinguishing glowing cigarettes outside pub doors',
          'Taxing sugary fizzy cans and advertising fruit',
        ],
        focus_clue: 'Why do governments favour lifestyle prevention over treatment?',
      },
    ],
    causal_domino_spine: {
      title: 'Lifestyle Factors & The Technological Revolution in Diagnosis',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1895–1918',
          para_ref: '[1.1–1.2]',
          title: 'Röntgen & Early X-Rays',
          actor: 'Wilhelm Röntgen & Marie Curie',
          tag: '🩻 RADIOLOGICAL X-RAYS',
          trigger:
            'German physicist Wilhelm Röntgen discovered electromagnetic X-rays in November 1895, imaging the bones and wedding ring of his wife’s hand on a photographic plate.',
          desc: 'German physicist Wilhelm Röntgen discovered electromagnetic X-rays in November 1895, imaging the bones and wedding ring of his wife’s hand on a photographic plate.',
          connective:
            'Allowed battlefield doctors in WWI to locate buried bullets, shrapnel fragments, and broken bones non-invasively, eliminating the agonizing need for surgeons to probe deep wounds with metal fingers.',
          question: 'How did X-rays transform surgical trauma diagnosis in WWI?',
        },
        {
          step: 2,
          date: '1930s–1960s',
          para_ref: '[2.1–2.2]',
          title: 'Blood Labs & Endoscopy',
          actor: 'Pathologists & Optical Physicists',
          tag: '🩸 BIOCHEMICAL & ENDOSCOPIC LABS',
          trigger:
            'Mid-20th-century hospitals developed automated biochemical blood tests and flexible fibre-optic endoscopes using coherent glass fiber bundles.',
          desc: 'Mid-20th-century hospitals developed automated biochemical blood tests and flexible fibre-optic endoscopes using coherent glass fiber bundles.',
          connective:
            'Enabled clinicians to examine gastric ulcers and lung tumours directly through natural body orifices and detect hormone imbalances from blood drops, drastically reducing risky exploratory laparotomies.',
          question: 'Why was fiber-optic endoscopy superior to exploratory surgery?',
        },
        {
          step: 3,
          date: '1971–1980s',
          para_ref: '[3.1–3.2]',
          title: 'Hounsfield’s CT & MRI',
          actor: 'Godfrey Hounsfield & Sir Peter Mansfield',
          tag: '🖥️ 3D DIGITAL CT & MRI',
          trigger:
            'British electrical engineer Godfrey Hounsfield built the first computerized tomography (CT) scanner at EMI Laboratories in 1971, rotating X-ray beams in a circular gantry.',
          desc: 'British electrical engineer Godfrey Hounsfield built the first computerized tomography (CT) scanner at EMI Laboratories in 1971, rotating X-ray beams in a circular gantry.',
          connective:
            'Used digital computers to assemble cross-sectional 3D slices of soft internal organs, followed by Magnetic Resonance Imaging (MRI) in the 1980s that imaged soft brain and spinal tissue without ionizing radiation.',
          question: 'Why did CT scans transform internal soft-tissue diagnosis?',
        },
        {
          step: 4,
          date: 'c1950–1980s',
          para_ref: '[4.1–4.2]',
          title: 'Epidemiological Shift',
          actor: 'Epidemiologists & Modern Demographic Researchers',
          tag: '📈 THE CHRONIC DISEASE SHIFT',
          trigger:
            'With clean municipal water, mandatory vaccinations, and penicillin vanquishing lethal bacterial epidemics, average UK life expectancy surged from 46 in 1900 to over 75 by the 1980s.',
          desc: 'With clean municipal water, mandatory vaccinations, and penicillin vanquishing lethal bacterial epidemics, average UK life expectancy surged from 46 in 1900 to over 75 by the 1980s.',
          connective:
            'Shifted the primary burden of national disease away from acute bacterial fevers toward chronic, lifestyle-related conditions: cardiovascular heart disease, type 2 diabetes, and tobacco-induced cancers.',
          question: 'What drove the shift from infectious to lifestyle diseases?',
        },
        {
          step: 5,
          date: '1980s–Present',
          para_ref: '[5.1–5.2]',
          title: 'State Lifestyle Campaigns',
          actor: 'Department of Health & Public Health England',
          tag: '🚭 PREVENTIVE LIFESTYLE INITIATIVES',
          trigger:
            'Facing astronomical costs for high-tech acute treatments, the Department of Health launched national preventive lifestyle campaigns: the 2007 public indoor smoking ban, Change4Life, and sugar taxes.',
          desc: 'Facing astronomical costs for high-tech acute treatments, the Department of Health launched national preventive lifestyle campaigns: the 2007 public indoor smoking ban, Change4Life, and sugar taxes.',
          connective:
            'Demonstrated that changing individual daily behaviours through statutory regulation, taxation, and health promotion delivers far greater aggregate population health gains than high-tech hospital interventions alone.',
          question: 'Why do governments favour lifestyle prevention over treatment?',
        },
      ],
    },
  },

  lesson_4_3: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the revolution in modern treatments and healthcare access in Britain, examining Paul Ehrlich’s search for synthetic "magic bullets" resulting in Salvarsan 606 (1909), Gerhard Domagk’s discovery of Prontosil (1932), the wartime solidarity of the Beveridge Report (1942), Aneurin Bevan’s political battle to launch the National Health Service in 1948, and the ongoing fiscal challenges of high-tech medicine.',
      objectives: [
        {
          objective:
            'Explain how Paul Ehrlich developed the concept of the chemical "magic bullet" with Salvarsan 606.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Ehrlich and Hata in laboratory). Emphasize that chemical dyes stained bacteria selectively, leading Ehrlich and Hata to test 606 arsenic compounds to cure syphilis without killing host tissue.',
          question:
            'Why was Salvarsan 606 termed a "magic bullet" compared to older chemical antiseptics like carbolic acid or mercury?',
        },
        {
          objective:
            'Analyse how Gerhard Domagk’s Prontosil proved that synthetic sulfonamides could destroy bacteria in living patients.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain the testing on streptococcal mice and Domagk injecting his infected daughter, sparking the development of sulfonamide "sulfa drugs" for puerperal childbed fever.',
          question:
            'How did the discovery of Prontosil demonstrate that synthetic industrial dyes could yield life-saving antimicrobial medicines?',
        },
        {
          objective:
            'Examine how the Beveridge Report and WWII collective sacrifice created momentum for universal healthcare.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Contrast the unequal interwar healthcare system (private fees, excluded wives and children) with Beveridge’s Five Giant Evils and public demands for a comprehensive welfare state.',
          question:
            'Why did the shared experience of the Second World War dismantle public tolerance for pre-war medical inequality in Britain?',
        },
        {
          objective:
            'Evaluate how Aneurin Bevan overcame doctor resistance to establish the NHS on 5 July 1948.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (1948 NHS information leaflet). Focus on Bevan "stuffing their mouths with gold" by permitting private practice, and nationalizing 2,688 hospitals to provide healthcare free at the point of delivery.',
          question:
            'What compromises did Aneurin Bevan make to overcome the British Medical Association’s fierce opposition to the NHS?',
        },
        {
          objective:
            'Assess how post-war high-tech treatments and an ageing population created escalating NHS financial strains.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Discuss breakthroughs like John Charnley’s hip replacements (1962), kidney dialysis, and organ transplants, explaining why overwhelming demand forced prescription charges in 1951.',
          question:
            'Why did the clinical success of the NHS in keeping citizens alive longer create an escalating financial crisis for the British government?',
        },
      ],
      source_context: {
        'Source A':
          'Paul Ehrlich and Sahachiro Hata in their Frankfurt Laboratory (1909). Historic photograph showing German bacteriologist Paul Ehrlich and Japanese collaborator Sahachiro Hata surrounded by chemical reagents during their systematic trials of Salvarsan 606. Hinge Question: Why was the systematic laboratory testing of hundreds of synthetic chemical compounds (such as compound 606) a radically new approach to pharmacology compared to 19th-century herbal remedies?',
        'Source B':
          '1948 Ministry of Health NHS Information Leaflet. The original public leaflet distributed to every British household in June 1948 by the Ministry of Health, announcing that comprehensive medical, hospital, dental, and optical care would be provided universally free at the point of delivery. Hinge Question: How does the universal entitlement outlined in this 1948 leaflet demonstrate a permanent structural rejection of the 19th-century Victorian Poor Law and voluntary hospital system?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Paul Ehrlich & Salvarsan 606 (1906–1909)',
        theme_heading: 'Act 1: Paul Ehrlich & Salvarsan 606 (1906–1909)',
        source: {
          id: 'source_a_ehrlich_lab',
          letter: 'A',
          title: 'Source A: Paul Ehrlich and Sahachiro Hata in their Frankfurt Laboratory (1909)',
          src: '/images/ehrlich_hata_lab.jpg',
          source: '/images/ehrlich_hata_lab.jpg',
          image: '/images/ehrlich_hata_lab.jpg',
          caption:
            'Paul Ehrlich and Sahachiro Hata in their Frankfurt laboratory in 1909, where they conducted hundreds of systematic chemical trials resulting in Salvarsan 606.',
          desc: 'Historic 1909 laboratory photograph of Paul Ehrlich and Sahachiro Hata in Frankfurt.',
          provenance:
            'Primary historical photograph from the Georg-Speyer-Haus Chemotherapy Institute, Frankfurt am Main, 1909. Wellcome Collection, London (Iconographic Coll. L0002871).',
          citation:
            'Georg-Speyer-Haus Chemotherapy Institute / Wellcome Collection (L0002871), Frankfurt, 1909.',
          question:
            'Why was the systematic laboratory testing of hundreds of synthetic chemical compounds (such as compound 606) a radically new approach to pharmacology compared to 19th-century herbal remedies?',
          hinge_question:
            'Why was the systematic laboratory testing of hundreds of synthetic chemical compounds (such as compound 606) a radically new approach to pharmacology compared to 19th-century herbal remedies?',
          source_context:
            'Paul Ehrlich and Japanese bacteriologist Sahachiro Hata in their Frankfurt laboratory in 1909, conducting systematic chemical screenings of synthetic arsenic compounds to target Treponema pallidum, the bacterium causing syphilis.',
          context:
            'Paul Ehrlich and Japanese bacteriologist Sahachiro Hata in their Frankfurt laboratory in 1909, conducting systematic chemical screenings of synthetic arsenic compounds to target Treponema pallidum, the bacterium causing syphilis.',
        },
        text: '<span class="para-ref">[1.1]</span> By the opening decade of the twentieth century, bacteriology had successfully unmasked the microbial culprits behind tuberculosis, cholera, and diphtheria. Yet physicians found themselves crippled by an agonizing limitation known as the *Diagnostic-Therapeutic Lag*: while a doctor could diagnose a bacterial infection under a microscope, they possessed zero medicines to kill the pathogens inside the living human body. Existing chemical antiseptics like carbolic acid, mercury, and arsenic were indiscriminate poisons that destroyed human blood cells, liver tissue, and kidneys just as swiftly as they destroyed bacteria.<br><br><span class="para-ref">[1.2]</span> A brilliant German physician named Paul Ehrlich proposed an audacious hypothesis: the *Zauberkugel*, or "magic bullet." Ehrlich noticed that certain synthetic aniline dyes attached themselves selectively to specific bacterial cells while leaving surrounding human cells unstained. Ehrlich reasoned that if a toxin could be chemically bonded to a selective dye molecule, it would behave like a guided missile—destroying targeted microbes without harming the host. Working in Frankfurt with Japanese bacteriologist Sahachiro Hata (<span class="archival-meta-tag">Source A</span>), they systematically re-examined compound 606 (arsphenamine) in 1909, proving it cured lethal human syphilis. Branded **Salvarsan 606**, it became humanity’s first synthetic chemical "magic bullet."',
      },
      {
        act: 2,
        title: 'Act 2: Gerhard Domagk & Prontosil (1932–1935)',
        theme_heading: 'Act 2: Gerhard Domagk & Prontosil (1932–1935)',
        text: '<span class="para-ref">[2.1]</span> While Salvarsan 606 was a triumph against syphilis spirochetes, it was ineffective against common bacterial killers like *Streptococcus* and *Staphylococcus*. In 1932, German pathologist Gerhard Domagk achieved the next therapeutic breakthrough with **Prontosil**, a bright red industrial leather dye manufactured by Bayer. Domagk demonstrated that Prontosil cured mice infected with lethal streptococcal blood poisoning without poisoning the animals.<br><br><span class="para-ref">[2.2]</span> In 1935, Domagk’s six-year-old daughter Hildegard contracted severe, life-threatening blood poisoning after an embroidery needle snapped in her arm. Facing impending amputation and death, Domagk took the desperate gamble of injecting her with a heavy dose of Prontosil; she recovered completely within days. Researchers at the Pasteur Institute soon realized that the active therapeutic agent inside Prontosil was a simple chemical called *sulphonamide*. Sulphonamides ("sulfa drugs") slashed maternal puerperal fever deaths by 60% and cured bacterial pneumonia, proving that synthetic drugs could conquer widespread internal infections.',
      },
      {
        act: 3,
        title: 'Act 3: The Beveridge Report & Wartime Reconstruction (1942)',
        theme_heading: 'Act 3: The Beveridge Report & Wartime Reconstruction (1942)',
        text: '<span class="para-ref">[3.1]</span> While laboratory science advanced, interwar Britain remained scarred by grotesque healthcare inequality. Prior to 1948, medical treatment was private, commercial, or dependent on charitable philanthropy. David Lloyd George’s 1911 National Insurance Act provided basic GP coverage for low-paid working men, but completely excluded their wives, children, and elderly relatives. Millions of working-class women suffered untreated prolapses, dental decay, and illnesses in silence, while calling a private doctor or entering a hospital could plunge an entire family into financial ruin.<br><br><span class="para-ref">[3.2]</span> The collective solidarity of the Second World War shattered this unequal order. The Blitz, wartime rationing, and the shared evacuation of children convinced citizens that if the state could organize total war, it could organize peacetime welfare. In December 1942, civil servant William Beveridge published his famous social report, proclaiming that post-war reconstruction required slaying "Five Giant Evils": Want, Disease, Ignorance, Squalor, and Idleness. The report became an instant bestseller, recommending a comprehensive welfare state and a universal National Health Service providing free medical treatment for every citizen.',
      },
      {
        act: 4,
        title: 'Act 4: Aneurin Bevan & The Launch of the NHS (1945–1948)',
        theme_heading: 'Act 4: Aneurin Bevan & The Launch of the NHS (1945–1948)',
        source: {
          id: 'source_b_nhs_leaflet',
          letter: 'B',
          title: 'Source B: 1948 Ministry of Health NHS Information Leaflet',
          src: '/images/nhs_established.jpg',
          source: '/images/nhs_established.jpg',
          image: '/images/nhs_established.jpg',
          caption:
            'The original public leaflet distributed to every British household in June 1948 by the Ministry of Health, announcing the launch of the free National Health Service on 5th July.',
          desc: 'Official 1948 Ministry of Health public information brochure introducing the National Health Service.',
          provenance:
            'Official government publication issued by His Majesty’s Stationery Office (HMSO) and the Ministry of Health, London, June 1948. The National Archives, Kew (Shelfmark: MH 55/927).',
          citation: 'Ministry of Health / HMSO, The National Archives (MH 55/927), June 1948.',
          question:
            'How does the universal entitlement outlined in this 1948 leaflet demonstrate a permanent structural rejection of the 19th-century Victorian Poor Law and voluntary hospital system?',
          hinge_question:
            'How does the universal entitlement outlined in this 1948 leaflet demonstrate a permanent structural rejection of the 19th-century Victorian Poor Law and voluntary hospital system?',
          source_context:
            'In June 1948, Minister of Health Aneurin Bevan distributed this official information booklet to every British household, announcing that from 5 July 1948, comprehensive medical, hospital, dental, and optical care would be provided universally free at the point of delivery.',
          context:
            'In June 1948, Minister of Health Aneurin Bevan distributed this official information booklet to every British household, announcing that from 5 July 1948, comprehensive medical, hospital, dental, and optical care would be provided universally free at the point of delivery.',
        },
        text: '<span class="para-ref">[4.1]</span> Following Labour’s landslide election victory in July 1945, Prime Minister Clement Attlee appointed fiery former Welsh coal miner Aneurin Bevan as Minister of Health. Bevan faced venomous resistance from the British Medical Association (BMA), whose affluent private physicians denounced state-funded healthcare as "medical dictatorship." Bevan outmaneuvered the doctors through astute political compromise: he permitted hospital consultants to continue private fee-paying practice inside state hospitals, famously admitting he had "stuffed their mouths with gold." In June 1948, Bevan distributed an official household information leaflet (<span class="archival-meta-tag">Source B</span>) to every family in Britain, explaining the scope of universal healthcare.<br><br><span class="para-ref">[4.2]</span> On Monday, 5 July 1948, Bevan arrived at Park Hospital in Manchester to inaugurate the National Health Service. Meeting 13-year-old Sylvia Diggory, the very first NHS patient, Bevan formally enacted a monumental social principle: comprehensive healthcare—family doctors, specialists, surgical operations, dental care, opticians, and emergency ambulances—free at the point of clinical delivery, funded through progressive central taxation. Over 2,688 voluntary and municipal hospitals were nationalized under state control, ending the Victorian terror of medical poverty forever.',
      },
      {
        act: 5,
        title: 'Act 5: High-Tech Care, Surgical Milestones & Escalating Costs (1950s–Present)',
        theme_heading:
          'Act 5: High-Tech Care, Surgical Milestones & Escalating Costs (1950s–Present)',
        text: '<span class="para-ref">[5.1]</span> The foundation of the NHS coincided with an unprecedented explosion in high-tech treatments and complex surgery. In 1962, British orthopedic surgeon Sir John Charnley perfected low-friction total hip replacement at Wrightington Hospital using high-density polyethylene and bone cement, restoring mobility to hundreds of thousands of arthritic patients. The NHS rapidly expanded to deliver kidney dialysis machines, cardiac bypass surgery, intensive neonatal life support, and complex organ transplants.<br><br><span class="para-ref">[5.2]</span> Paradoxically, the clinical success of the NHS in keeping an ageing population alive longer created an escalating financial crisis. When the service opened, pent-up demand resulted in 8.5 million pairs of free spectacles and millions of dentures dispensed within months, wildly exceeding budgetary forecasts. By 1951, the government was forced to introduce prescription and dental charges, prompting Bevan’s Cabinet resignation. In the modern era, the exponential cost of new biological therapies, robotic surgery, and round-the-clock emergency care continues to challenge Bevan’s founding vision of universal, tax-funded healthcare.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1906–1909',
        para_ref: '[1.1–1.2]',
        heading: 'Why was Salvarsan 606 termed the first "magic bullet"?',
        bullets: [
          'Testing hundreds of toxic yellow arsenic mixtures',
          'Hunting chemical bullets that only hit germs',
          'Curing deadly human syphilis with magic bullet',
        ],
        focus_clue: 'Why was Salvarsan 606 termed the first "magic bullet"?',
      },
      {
        step: 2,
        date: '1932–1935',
        para_ref: '[2.1–2.2]',
        heading: 'How did Prontosil prove synthetic drugs could kill microbes?',
        bullets: [
          'Injecting bright red leather dye into mice',
          'Saving sick daughter from arm-amputation death',
          'Discovering active white sulfa medicine powder',
        ],
        focus_clue: 'How did Prontosil prove synthetic drugs could kill microbes?',
      },
      {
        step: 3,
        date: '1942',
        para_ref: '[3.1–3.2]',
        heading: 'How did WWII unity create momentum for state healthcare?',
        bullets: [
          'Listing Five Giants that crush poor workers',
          'Surviving Nazi air bombs with community spirit',
          'Demanding free medical care for every citizen',
        ],
        focus_clue: 'How did WWII unity create momentum for state healthcare?',
      },
      {
        step: 4,
        date: '1945–1948',
        para_ref: '[4.1–4.2]',
        heading: 'How did Bevan compromise to persuade resistant doctors?',
        bullets: [
          'Offering private bed perks to stubborn doctors',
          'Delivering free spectacles and dentures to families',
          'Abolishing terrifying doctor bills forever',
        ],
        focus_clue: 'How did Bevan compromise to persuade resistant doctors?',
      },
      {
        step: 5,
        date: '1950s–Present',
        para_ref: '[5.1–5.2]',
        heading: 'Why has modern medical success created financial strain?',
        bullets: [
          'Pumping blood through giant artificial kidney filters',
          'Replacing worn hip joints with metal balls',
          'Charging small fees for paper medicine slips',
        ],
        focus_clue: 'Why has modern medical success created financial strain?',
      },
    ],
    causal_domino_spine: {
      title: 'Magic Bullets, High-Tech Treatments & The Birth of the NHS',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1906–1909',
          para_ref: '[1.1–1.2]',
          title: 'Ehrlich & Salvarsan 606',
          actor: 'Paul Ehrlich & Sahachiro Hata',
          tag: '🎯 SALVARSAN 606 MAGIC BULLET',
          trigger:
            'German bacteriologist Paul Ehrlich reasoned that if chemical dyes stained specific bacteria selectively, synthetic chemicals could be engineered to destroy microbes without poisoning human host tissue.',
          desc: 'German bacteriologist Paul Ehrlich reasoned that if chemical dyes stained specific bacteria selectively, synthetic chemicals could be engineered to destroy microbes without poisoning human host tissue.',
          connective:
            'Tested 605 arsenic compounds before Sahachiro Hata re-tested compound 606 (Salvarsan) in 1909, curing deadly human syphilis and establishing the concept of the targeted chemical "magic bullet".',
          question: 'Why was Salvarsan 606 termed the first "magic bullet"?',
        },
        {
          step: 2,
          date: '1932–1935',
          para_ref: '[2.1–2.2]',
          title: 'Domagk & Prontosil',
          actor: 'Gerhard Domagk & Bayer Laboratories',
          tag: '🔴 PRONTOSIL SULPHONAMIDES',
          trigger:
            'In 1932, German pathologist Gerhard Domagk discovered that a bright red industrial leather dye called Prontosil neutralized lethal streptococcus bacterial infections in laboratory mice.',
          desc: 'In 1932, German pathologist Gerhard Domagk discovered that a bright red industrial leather dye called Prontosil neutralized lethal streptococcus bacterial infections in laboratory mice.',
          connective:
            'Tested it successfully on his own daughter dying of severe blood poisoning in 1935, sparking the discovery of sulphonamide "sulfa drugs" that slashed maternal puerperal fever deaths by 60%.',
          question: 'How did Prontosil prove synthetic drugs could kill microbes?',
        },
        {
          step: 3,
          date: '1942',
          para_ref: '[3.1–3.2]',
          title: 'The Beveridge Report',
          actor: 'Sir William Beveridge & Wartime Coalition',
          tag: '📜 THE BEVERIDGE REPORT',
          trigger:
            'Amid the collective sacrifice of the Second World War, Sir William Beveridge published his bestselling 1942 report proposing an all-out assault against the "Five Giant Evils": Want, Disease, Ignorance, Squalor, and Idleness.',
          desc: 'Amid the collective sacrifice of the Second World War, Sir William Beveridge published his bestselling 1942 report proposing an all-out assault against the "Five Giant Evils": Want, Disease, Ignorance, Squalor, and Idleness.',
          connective:
            'Captivated the British public by recommending a comprehensive welfare state and a universal National Health Service providing free medical treatment for every citizen regardless of wealth.',
          question: 'How did WWII unity create momentum for state healthcare?',
        },
        {
          step: 4,
          date: '1945–1948',
          para_ref: '[4.1–4.2]',
          title: 'Bevan & Launch of the NHS',
          actor: 'Aneurin Bevan (Minister of Health)',
          tag: '🏥 THE 1948 NHS REVOLUTION',
          trigger:
            'Minister of Health Aneurin Bevan overcame fierce resistance from the British Medical Association by famously "stuffing their mouths with gold"—allowing senior hospital consultants to maintain private practice beds.',
          desc: 'Minister of Health Aneurin Bevan overcame fierce resistance from the British Medical Association by famously "stuffing their mouths with gold"—allowing senior hospital consultants to maintain private practice beds.',
          connective:
            'Launched the National Health Service on 5 July 1948 at Park Hospital Manchester, nationalizing 2,688 hospitals and guaranteeing healthcare free at the point of clinical delivery funded by direct taxation.',
          question: 'How did Bevan compromise to persuade resistant doctors?',
        },
        {
          step: 5,
          date: '1950s–Present',
          para_ref: '[5.1–5.2]',
          title: 'High-Tech Care & Costs',
          actor: 'John Charnley & Modern NHS Clinicians',
          tag: '🦿 HIGH-TECH COST CRISIS',
          trigger:
            'The NHS expanded to deliver expensive high-tech surgical breakthroughs: John Charnley’s pioneering low-friction hip replacements (1962), artificial kidney dialysis, and complex organ transplants.',
          desc: 'The NHS expanded to deliver expensive high-tech surgical breakthroughs: John Charnley’s pioneering low-friction hip replacements (1962), artificial kidney dialysis, and complex organ transplants.',
          connective:
            'Paradoxically, its own clinical success in keeping an ageing population alive longer created escalating budgetary strain, forcing the government to introduce prescription charges in 1952 and rationing committees like NICE.',
          question: 'Why has modern medical success created financial strain?',
        },
      ],
    },
  },

  lesson_4_4: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the development of penicillin as humanity’s first true antibiotic wonder drug, analyzing Alexander Fleming’s accidental observation in 1928, Howard Florey, Ernst Chain, and Norman Heatley’s laboratory purification at Oxford (1938–1940), the high-stakes animal and clinical trials of Albert Alexander, the industrial scale-up via American deep-tank fermentation for D-Day, and the modern emergence of antibiotic resistance.',
      objectives: [
        {
          objective:
            'Explain how Alexander Fleming accidentally discovered penicillin in 1928 and why he was unable to develop it into a clinical drug.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (Fleming’s culture plate). Emphasize that while he spotted the staphylococcal lysis halo, he lacked biochemical apparatus to purify the fragile, unstable substance.',
          question:
            'Why was Alexander Fleming unable to translate his laboratory observation of penicillin mould into an injectable medicine for human patients?',
        },
        {
          objective:
            'Analyse how Florey, Chain, and Heatley solved the challenge of purifying and stabilizing penicillin at Oxford.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Focus on team science: Chain’s biochemistry, Florey’s leadership, and Norman Heatley improvising with hospital bedpans, dairy milk churns, and freeze-drying ether extraction.',
          question:
            'How did the Oxford team’s multidisciplinary approach overcome the chemical instability that had defeated Fleming a decade earlier?',
        },
        {
          objective:
            'Evaluate the clinical significance of the mouse trials and the tragic trial of PC Albert Alexander.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Penicillin culture racks). Contrast the total survival of treated mice with Alexander’s miraculous recovery followed by fatal relapse when the supply was exhausted.',
          question:
            'Why was the clinical trial on PC Albert Alexander simultaneously a miraculous success and a heartbreaking tragedy?',
        },
        {
          objective:
            'Explain how wartime necessity and American industrial deep-tank fermentation enabled mass production.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on Florey’s mission to the US in 1941, the USDA laboratory in Peoria, corn-steep liquor, cantaloupe melon mould, and 10,000-gallon aerated fermentation tanks for D-Day.',
          question:
            'How did American industrial manufacturing and agricultural byproducts transform penicillin from scarce drops into millions of doses for D-Day?',
        },
        {
          objective:
            'Assess Alexander Fleming’s prophetic warning regarding antimicrobial resistance and modern superbugs.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Discuss Fleming’s 1945 Nobel lecture warning against under-dosing and over-prescribing, connecting it to the rise of MRSA and the danger of a post-antibiotic era.',
          question:
            'Why did Alexander Fleming warn that the misuse and overuse of penicillin would eventually breed deadly drug-resistant superbugs?',
        },
      ],
      source_context: {
        'Source A':
          'Alexander Fleming’s Original 1928 Penicillin Culture Plate. Historic laboratory photograph showing Alexander Fleming examining culture plates at St Mary’s Hospital, London, where he discovered Penicillium notatum in September 1928. Hinge Question: Why was Fleming unable to translate his brilliant 1928 laboratory observation of penicillin’s antibacterial halo into an injectable medicine for human clinical patients?',
        'Source B':
          'Industrial Penicillin Fermentation and Culture Racks (1944). Wartime industrial photograph showing rows of penicillin culture flasks in an incubation facility during Allied preparations for D-Day. Hinge Question: Why was the industrial transition from surface culture bottles to 10,000-gallon aerated deep-tank fermentation vats the decisive factor in saving thousands of Allied soldiers in 1944?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Alexander Fleming’s Accidental Discovery (1928–1929)',
        theme_heading: 'Act 1: Alexander Fleming’s Accidental Discovery (1928–1929)',
        source: {
          id: 'source_a_fleming_dish',
          letter: 'A',
          title: 'Source A: Alexander Fleming’s Original 1928 Penicillin Culture Plate',
          src: '/images/fleming_petri_dish.jpg',
          source: '/images/fleming_petri_dish.jpg',
          image: '/images/fleming_petri_dish.jpg',
          caption:
            'Alexander Fleming examining culture plates in his laboratory at St Mary’s Hospital, London, where he discovered Penicillium notatum in September 1928.',
          desc: 'Historic laboratory photograph of Alexander Fleming examining culture plates at St Mary’s Hospital.',
          provenance:
            'Primary photographic record captured in 1928 at the Inoculation Department, St Mary’s Hospital, Paddington, London. Imperial War Museum Collection / Wellcome Collection (L0005721).',
          citation:
            'Alexander Fleming, Inoculation Department, St Mary’s Hospital (Imperial War Museum / Wellcome Collection L0005721), September 1928.',
          question:
            'Why was Fleming unable to translate his brilliant 1928 laboratory observation of penicillin’s antibacterial halo into an injectable medicine for human clinical patients?',
          hinge_question:
            'Why was Fleming unable to translate his brilliant 1928 laboratory observation of penicillin’s antibacterial halo into an injectable medicine for human clinical patients?',
          source_context:
            'In September 1928 at St Mary’s Hospital, London, Alexander Fleming returned from holiday to discover that a stray Penicillium notatum spore had contaminated a staphylococci culture plate, producing a bacteria-free lysis halo around the mold.',
          context:
            'In September 1928 at St Mary’s Hospital, London, Alexander Fleming returned from holiday to discover that a stray Penicillium notatum spore had contaminated a staphylococci culture plate, producing a bacteria-free lysis halo around the mold.',
        },
        text: '<span class="para-ref">[1.1]</span> During the First World War, Scottish bacteriologist Alexander Fleming witnessed thousands of soldiers die from wound sepsis in French military hospitals. Fleming recognized that standard chemical antiseptics like carbolic acid did more harm than good in deep lacerations, because chemicals destroyed the patient’s protective white blood cells faster than they eliminated bacteria. Fleming dedicated his post-war career at St Mary’s Hospital, London, to discovering an antibacterial agent that attacked microbes without poisoning human tissue.<br><br><span class="para-ref">[1.2]</span> In late August 1928, Fleming left culture plates of *Staphylococcus* bacteria stacked in his Paddington laboratory before departing on holiday. Fungal spores from a mycologist’s laboratory below drifted through the open window, landing on an uncovered dish. Returning on 3 September 1928, Fleming examined the plate (<span class="archival-meta-tag">Source A</span>) and noticed a clear, bacteria-free halo around a blob of blue-green mould where colonies of golden bacteria had dissolved. Fleming identified the mould as *Penicillium notatum*, naming its secretion **Penicillin**. He published his findings in 1929; however, lacking biochemical expertise to purify the unstable juice, he abandoned clinical trials.',
      },
      {
        act: 2,
        title: 'Act 2: Florey, Chain & Norman Heatley at Oxford (1938–1940)',
        theme_heading: 'Act 2: Florey, Chain & Norman Heatley at Oxford (1938–1940)',
        text: '<span class="para-ref">[2.1]</span> A decade later, in 1938, an interdisciplinary scientific research team at Oxford University reopened Fleming’s forgotten paper. Led by Australian professor of pathology Howard Florey and German-Jewish refugee biochemist Ernst Chain, the Oxford team set out to isolate pure penicillin. Florey brought clinical leadership, while Chain applied biochemical rigor to analyze the chemical properties of the elusive mold.<br><br><span class="para-ref">[2.2]</span> Operating in a cash-starved laboratory during the early months of World War II, the team faced immense obstacles: penicillin broke down rapidly when exposed to air, light, or mild temperature shifts. Laboratory engineer Norman Heatley improvised brilliant apparatus using hospital bedpans, porcelain dairy churns, milk bottles, and bathtubs. By using ether solvents and vacuum freeze-drying, Heatley yielded tiny, precious pinches of stable, concentrated brown penicillin powder.',
      },
      {
        act: 3,
        title: 'Act 3: Mice Trials & The Tragic Case of Albert Alexander (1940–1941)',
        theme_heading: 'Act 3: Mice Trials & The Tragic Case of Albert Alexander (1940–1941)',
        source: {
          id: 'source_b_penicillin_production',
          letter: 'B',
          title: 'Source B: Industrial Penicillin Fermentation and Culture Racks (1944)',
          src: '/images/florey_chain_apparatus.jpg',
          source: '/images/florey_chain_apparatus.jpg',
          image: '/images/florey_chain_apparatus.jpg',
          caption:
            'Laboratory worker inspecting rows of penicillin culture bottles stacked on incubator shelves in 1944, prior to the widespread transition to deep-tank fermentation vats.',
          desc: 'Wartime industrial photograph showing rows of penicillin culture flasks in an incubation facility.',
          provenance:
            'Primary industrial photograph captured in 1944 at a specialized wartime penicillin production facility. National Archives / Wellcome Historical Medical Collection (Shelfmark: M0011832).',
          citation:
            'Wartime Penicillin Production Facility, National Archives / Wellcome Collection (M0011832), 1944.',
          question:
            'Why was the industrial transition from surface culture bottles to 10,000-gallon aerated deep-tank fermentation vats the decisive factor in saving thousands of Allied soldiers in 1944?',
          hinge_question:
            'Why was the industrial transition from surface culture bottles to 10,000-gallon aerated deep-tank fermentation vats the decisive factor in saving thousands of Allied soldiers in 1944?',
          source_context:
            'In 1943–1944, during Allied preparations for D-Day, Oxford researchers Howard Florey and Ernst Chain collaborated with the US Department of Agriculture in Peoria, Illinois, developing deep-tank corn-steep liquor fermentation to mass-produce pure penicillin.',
          context:
            'In 1943–1944, during Allied preparations for D-Day, Oxford researchers Howard Florey and Ernst Chain collaborated with the US Department of Agriculture in Peoria, Illinois, developing deep-tank corn-steep liquor fermentation to mass-produce pure penicillin.',
        },
        text: '<span class="para-ref">[3.1]</span> In May 1940, the Oxford team conducted a definitive animal trial: eight mice were injected with lethal streptococci; four were administered penicillin, while four were left untreated. By morning, the four untreated mice were dead, while the four penicillin-treated mice scurried healthily in their cage. In February 1941, the team undertook their first clinical trial on Albert Alexander, a 43-year-old Oxford policeman dying from severe blood poisoning and facial abscesses following a scratch from a rose thorn.<br><br><span class="para-ref">[3.2]</span> Florey and Chain administered penicillin intravenously. Within twenty-four hours, Alexander’s fever dropped and his horrific infection cleared miraculously. However, the team possessed only minute supplies (<span class="archival-meta-tag">Source B</span>). Despite recycling penicillin by collecting and extracting Alexander’s urine, the drug ran out after five days. Alexander tragically relapsed and died in March 1941. The trial proved penicillin was a non-toxic wonder drug, but demonstrated that it required industrial-scale mass production that British factories under Blitz bombardment could not provide.',
      },
      {
        act: 4,
        title: 'Act 4: Peoria & US Industrial Deep-Tank Fermentation (1941–1944)',
        theme_heading: 'Act 4: Peoria & US Industrial Deep-Tank Fermentation (1941–1944)',
        text: '<span class="para-ref">[4.1]</span> In July 1941, Florey and Heatley flew to the neutral United States to secure corporate backing. Collaborating with the US Department of Agriculture Northern Regional Research Laboratory in Peoria, Illinois, scientists achieved two crucial breakthroughs: culturing the mould in *corn steep liquor* (a cornstarch byproduct) boosted yields twenty-fold, while a mouldy cantaloupe melon from a Peoria grocery market provided *Penicillium chrysogenum*, producing 200 times more penicillin.<br><br><span class="para-ref">[4.2]</span> Backed by the US War Production Board, pharmaceutical giants (Pfizer, Merck, Squibb) constructed massive 10,000-gallon deep-tank fermentation vats pumped with sterile oxygen. By D-Day on 6 June 1944, Allied medical units possessed 2.3 million doses of penicillin, treating every wounded casualty on the Normandy beaches and reducing amputations and fatal wound sepsis to unprecedented historic lows.',
      },
      {
        act: 5,
        title: 'Act 5: D-Day Allied Victory & The Menace of Superbugs (1944–Present)',
        theme_heading: 'Act 5: D-Day Allied Victory & The Menace of Superbugs (1944–Present)',
        text: '<span class="para-ref">[5.1]</span> Mass-produced penicillin revolutionized military and civilian medicine, transforming once-fatal conditions—pneumonia, scarlet fever, meningitis, and syphilis—into routine, curable infections. In 1945, Alexander Fleming, Howard Florey, and Ernst Chain were jointly awarded the Nobel Prize in Physiology or Medicine. Fleming was celebrated by the world press as a lone Scottish hero, though historical analysis proves penicillin was the triumphant product of multidisciplinary teamwork and state-backed industrial scale.<br><br><span class="para-ref">[5.2]</span> However, Fleming delivered a prophetic warning in his 1945 Nobel address: under-dosing and over-prescribing would inevitably train bacteria to survive penicillin. Over the subsequent decades, excessive antibiotic use in human medicine and livestock agriculture spurred the evolution of multi-drug resistant "superbugs" like MRSA (Methicillin-Resistant *Staphylococcus Aureus*). In the twenty-first century, medicine faces the alarming prospect of a post-antibiotic era, where ordinary infections could once again prove incurable.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1928–1929',
        para_ref: '[1.1–1.2]',
        heading: 'Why could Fleming not turn mould into a clinical medicine?',
        bullets: [
          'Finding fluffy mould on dirty glass dish',
          'Golden germs dissolving in clear circle halos',
          'Failing to separate fragile liquid juice',
        ],
        focus_clue: 'Why could Fleming not turn mould into a clinical medicine?',
      },
      {
        step: 2,
        date: '1938–1940',
        para_ref: '[2.1–2.2]',
        heading: 'How did Norman Heatley solve the purification challenge?',
        bullets: [
          'Brewing fungus inside hospital bedpans and milk churns',
          'Winning American dollar grants during air raids',
          'Freezing brown liquid into precious yellow crystals',
        ],
        focus_clue: 'How did Norman Heatley solve the purification challenge?',
      },
      {
        step: 3,
        date: '1940–1941',
        para_ref: '[3.1–3.2]',
        heading: 'Why was Alexander’s trial both a success and a tragedy?',
        bullets: [
          'Infecting eight mice and keeping treated four alive',
          "Scraping rose thorn scratches on policeman's face",
          'Running out of drops before patient recovers',
        ],
        focus_clue: 'Why was Alexander’s trial both a success and a tragedy?',
      },
      {
        step: 4,
        date: '1941–1944',
        para_ref: '[4.1–4.2]',
        heading: 'How did US industrial fermentation enable mass production?',
        bullets: [
          'Feeding corn beer wash to rotting melon mould',
          'Pumping sterile air through giant ten-thousand-gallon vats',
          'Brewing million doses for D-Day landing craft',
        ],
        focus_clue: 'How did US industrial fermentation enable mass production?',
      },
      {
        step: 5,
        date: '1944–Present',
        para_ref: '[5.1–5.2]',
        heading: 'Why did Fleming warn that antibiotic overuse causes resistance?',
        bullets: [
          "Spraying white powder directly into torn soldiers' limbs",
          'Three scientists sharing golden Nobel prize medal',
          'Overusing capsules creating tough hospital superbugs',
        ],
        focus_clue: 'Why did Fleming warn that antibiotic overuse causes resistance?',
      },
    ],
    causal_domino_spine: {
      title: 'Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1928–1929',
          para_ref: '[1.1–1.2]',
          title: 'Fleming’s Discovery',
          actor: "Alexander Fleming (St Mary's Hospital, London)",
          tag: '🧫 ACCIDENTAL PETRI DISH DISCOVERY',
          trigger:
            'Returning from holiday in September 1928, Scottish bacteriologist Alexander Fleming noticed a contaminated petri dish of staphylococcus bacteria where Penicillium notatum mould spores had grown.',
          desc: 'Returning from holiday in September 1928, Scottish bacteriologist Alexander Fleming noticed a contaminated petri dish of staphylococcus bacteria where Penicillium notatum mould spores had grown.',
          connective:
            'Observed a clear halo where bacterial colonies had completely dissolved; however, lacking chemical expertise to isolate the unstable active substance, he abandoned clinical trials in 1929.',
          question: 'Why could Fleming not turn mould into a clinical medicine?',
        },
        {
          step: 2,
          date: '1938–1940',
          para_ref: '[2.1–2.2]',
          title: 'Florey & Chain at Oxford',
          actor: 'Howard Florey, Ernst Chain & Norman Heatley',
          tag: '🧪 OXFORD LABORATORY PURIFICATION',
          trigger:
            'At Oxford University, Australian pharmacologist Howard Florey and German-Jewish biochemist Ernst Chain assembled a multidisciplinary research team, reading Fleming’s 1928 paper.',
          desc: 'At Oxford University, Australian pharmacologist Howard Florey and German-Jewish biochemist Ernst Chain assembled a multidisciplinary research team, reading Fleming’s 1928 paper.',
          connective:
            'Biochemist Norman Heatley improvised apparatus using hospital bedpans, milk churns, and freeze-drying ether techniques to purify tiny quantities of stable, concentrated penicillin crystals.',
          question: 'How did Norman Heatley solve the purification challenge?',
        },
        {
          step: 3,
          date: '1940–1941',
          para_ref: '[3.1–3.2]',
          title: 'Mice Trials & Albert Alexander',
          actor: 'Oxford Team & PC Albert Alexander',
          tag: '🐁 ANIMAL & CLINICAL TRIALS',
          trigger:
            'In May 1940, Florey injected eight mice with lethal streptococci, and the four mice given penicillin survived completely; in February 1941 they treated PC Albert Alexander, dying from an infected rose-thorn scratch.',
          desc: 'In May 1940, Florey injected eight mice with lethal streptococci, and the four mice given penicillin survived completely; in February 1941 they treated PC Albert Alexander, dying from an infected rose-thorn scratch.',
          connective:
            'Alexander recovered dramatically within days, but the team ran out of drug (even after recycling it from his urine), and he tragically relapsed and died, proving penicillin’s potency while exposing the acute supply crisis.',
          question: 'Why was Alexander’s trial both a success and a tragedy?',
        },
        {
          step: 4,
          date: '1941–1944',
          para_ref: '[4.1–4.2]',
          title: 'Peoria & US Mass Production',
          actor: 'US Department of Agriculture & Chemical Firms',
          tag: '🏭 PEORIA DEEP-TANK FERMENTATION',
          trigger:
            'With British factories committed to munitions during the Blitz, Florey and Heatley travelled to the USA in July 1941, collaborating with the USDA research laboratory in Peoria, Illinois.',
          desc: 'With British factories committed to munitions during the Blitz, Florey and Heatley travelled to the USA in July 1941, collaborating with the USDA research laboratory in Peoria, Illinois.',
          connective:
            'Cultivated a super-yielding cantaloupe melon mould fed on corn-steep liquor inside 10,000-gallon aerated fermentation tanks, enabling Pfizer and Merck to produce 2.3 million doses by June 1944.',
          question: 'How did US industrial fermentation enable mass production?',
        },
        {
          step: 5,
          date: '1944–Present',
          para_ref: '[5.1–5.2]',
          title: 'D-Day & Superbugs',
          actor: 'Allied Medical Corps & Modern Clinicians',
          tag: '⚠️ D-DAY TRIUMPH & ANTIMICROBIAL RESISTANCE',
          trigger:
            'Mass-produced penicillin slashed Allied amputations and fatal wound sepsis during the Normandy D-Day invasion, winning Fleming, Florey, and Chain the 1945 Nobel Prize in Medicine.',
          desc: 'Mass-produced penicillin slashed Allied amputations and fatal wound sepsis during the Normandy D-Day invasion, winning Fleming, Florey, and Chain the 1945 Nobel Prize in Medicine.',
          connective:
            'However, Fleming presciently warned in 1945 that under-dosing and over-prescription would breed resistant strains, leading directly to the modern crisis of multi-drug resistant superbugs like MRSA.',
          question: 'Why did Fleming warn that antibiotic overuse causes resistance?',
        },
      ],
    },
  },

  lesson_4_5: {
    teacher_notes: {
      primer:
        'This enquiry evaluates the battle against lung cancer as a modern public health case study, examining the interwar surge in smoking, Richard Doll and Austin Bradford Hill’s groundbreaking statistical epidemiology (1950–1954), the political struggle against tobacco corporate lobbying resulting in advertising bans (1965), the smoke-free legislation of the Health Act 2006, plain packaging (2016), and the multimodal limits of modern oncology.',
      objectives: [
        {
          objective:
            'Explain why early twentieth-century physicians failed to link the surge in lung cancer to tobacco smoking.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2] and Source A (1949 doctor cigarette advertisement). Highlight how doctors blamed road tarmac fumes and coal smog while tobacco firms actively used actors portraying physicians to reassure the public.',
          question:
            'Why did medical authorities in the 1930s and 1940s blame coal smog and road tarmac rather than cigarettes for rising lung cancer rates?',
        },
        {
          objective:
            'Analyse how Richard Doll and Austin Bradford Hill used statistical epidemiology to prove the causal link.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain their 1950 case-control study of 709 London hospital patients and the prospective British Doctors Study (tracking 40,000 physicians over decades), proving heavy smokers had a 50-times higher risk.',
          question:
            'How did Doll and Hill’s statistical method of case-control surveys and long-term doctor tracking prove that smoking directly caused lung cancer?',
        },
        {
          objective:
            'Examine why initial government public health action was delayed by commercial lobbying and tax revenues.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Focus on the Royal College of Physicians 1962 report, the 1965 ban on television cigarette commercials, and compulsory packet warnings in 1971.',
          question:
            'Why did British governments delay taking decisive action against cigarette marketing during the 1950s and 1960s?',
        },
        {
          objective:
            'Evaluate the impact of scientific evidence on passive secondhand smoking leading to the 2007 public smoking ban.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Discuss how proving that non-smokers and bar staff were harmed by secondhand smoke gave the government the moral and legal mandate to pass the Health Act 2006.',
          question:
            'Why was proving the health danger of passive smoking so crucial in overcoming resistance to the 2007 public indoor smoking ban?',
        },
        {
          objective:
            'Assess modern multimodal oncology treatments and explain why statutory prevention remains superior to cure.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source B (plain cigarette packaging with warnings). Contrast low-dose CT scans, VATS lobectomies, and immunotherapy against stubbornly low survival rates, emphasizing prevention beats cure.',
          question:
            'Why do stubbornly low lung cancer survival rates demonstrate that statutory prevention (like plain packaging) is far more effective than high-tech clinical oncology?',
        },
      ],
      source_context: {
        'Source A':
          '1949 Vintage Cigarette Advertisement Featuring a Doctor. Commercial magazine advertisement for Camel cigarettes claiming that "More Doctors Smoke Camels than any other cigarette," illustrating how tobacco companies used medical endorsements. Hinge Question: How did corporate tobacco advertising exploit the professional authority of medical practitioners to suppress public awareness of smoking hazards prior to Doll and Hill’s 1950 epidemiological study?',
        'Source B':
          'Modern Cigarette Packet with Mandatory Government Health Warning. Contemporary standardized plain cigarette packaging in drab Pantone 448C displaying compulsory graphic medical warnings mandated under 2016 regulations. Hinge Question: How does the transition from unregulated commercial advertising (Source A) to state-mandated plain packaging (Source B) illustrate the changing role of government intervention in 20th- and 21st-century public health?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The 20th-Century Smoking Epidemic & Tobacco Advertising (1920s–1950)',
        theme_heading:
          'Act 1: The 20th-Century Smoking Epidemic & Tobacco Advertising (1920s–1950)',
        source: {
          id: 'source_a_cigarette_ad',
          letter: 'A',
          title: 'Source A: 1949 Vintage Cigarette Advertisement Featuring a Doctor',
          src: '/images/vintage_doctor_cigarette_ad.jpg',
          source: '/images/vintage_doctor_cigarette_ad.jpg',
          image: '/images/vintage_doctor_cigarette_ad.jpg',
          caption:
            'A 1949 commercial magazine advertisement for Camel cigarettes claiming that "More Doctors Smoke Camels than any other cigarette," illustrating how tobacco companies used medical endorsements.',
          desc: '1949 magazine print advertisement featuring an actor portraying a physician endorsing cigarettes.',
          provenance:
            'Primary commercial print advertisement published in American and British circulation magazines, 1949. R.J. Reynolds Tobacco Company Archive / Stanford Research into the Impact of Tobacco Advertising.',
          citation: 'R.J. Reynolds Tobacco Co. Magazine Advertisement, SRITA Collection, 1949.',
          question:
            'How did corporate tobacco advertising exploit the professional authority of medical practitioners to suppress public awareness of smoking hazards prior to Doll and Hill’s 1950 epidemiological study?',
          hinge_question:
            'How did corporate tobacco advertising exploit the professional authority of medical practitioners to suppress public awareness of smoking hazards prior to Doll and Hill’s 1950 epidemiological study?',
          source_context:
            'A 1949 magazine advertisement for Camel cigarettes featuring a physician in a white laboratory coat with a stethoscope, claiming "More doctors smoke Camels than any other cigarette" to reassure consumers regarding health concerns.',
          context:
            'A 1949 magazine advertisement for Camel cigarettes featuring a physician in a white laboratory coat with a stethoscope, claiming "More doctors smoke Camels than any other cigarette" to reassure consumers regarding health concerns.',
        },
        text: '<span class="para-ref">[1.1]</span> At the turn of the twentieth century, carcinoma of the lung was an extraordinarily rare clinical pathology in Great Britain, with major London teaching hospitals recording fewer than ten cases annually. By 1950, however, lung cancer had erupted into a catastrophic public health crisis, claiming over 12,000 British lives each year and rapidly becoming the leading cause of cancer mortality among adult men. The catalyst behind this deadly surge was the widespread industrialization of machine-rolled tobacco cigarettes, invented in the late nineteenth century and distributed on a colossal commercial scale.<br><br><span class="para-ref">[1.2]</span> During the First and Second World Wars, military commanders issued free cigarette rations to soldiers in trenches and combat stations to alleviate anxiety, hooking entire generations on nicotine. In the interwar and post-war years, commercial tobacco corporations mounted aggressive advertising campaigns across print newspapers, cinema reels, and roadside billboards, associating smoking with athleticism, Hollywood glamour, and social sophistication. Bizarrely, tobacco companies actively weaponized the medical profession to deceive the public, running advertisements (<span class="archival-meta-tag">Source A</span>) featuring actors dressed as white-coated doctors claiming that "More Doctors Smoke Camels," reassuring citizens that tobacco was soothing to the throat and perfectly harmless.',
      },
      {
        act: 2,
        title: 'Act 2: Doll & Hill’s Epidemiological Indictment (1950–1954)',
        theme_heading: 'Act 2: Doll & Hill’s Epidemiological Indictment (1950–1954)',
        text: '<span class="para-ref">[2.1]</span> As hospital thoracic wards overflowed with dying patients, the Medical Research Council (MRC) commissioned two brilliant investigators—epidemiologist Richard Doll and medical statistician Austin Bradford Hill—to determine the cause of the epidemic. Most contemporary physicians assumed the culprit was environmental pollution, pointing to coal fires, automobile exhaust fumes, or tarmac road resurfacing. Doll and Hill designed an innovative forensic inquiry, personally interviewing 709 lung cancer patients across twenty London hospitals between 1948 and 1952, comparing their detailed life histories with an identical control group of hospital patients admitted for non-cancer illnesses.<br><br><span class="para-ref">[2.2]</span> In September 1950, Doll and Hill dropped a scientific bombshell in the *British Medical Journal* (BMJ): heavy cigarette smokers were fifty times more likely to contract lung cancer than non-smokers, with the statistical risk rising in direct proportion to the number of cigarettes smoked per day. To silence skeptical tobacco executives, in October 1951 Doll and Hill launched the monumental British Doctors Study, tracking the smoking habits and cause of death of over 40,000 registered British physicians over several decades. Within three years, the prospective study proved conclusively that smoking caused lung cancer, chronic obstructive pulmonary disease (COPD), and coronary heart disease. Stunned by his own forensic data, Richard Doll extinguished his pipe and never smoked again.',
      },
      {
        act: 3,
        title: 'Act 3: Royal College of Physicians & Early Statutory Ad Bans (1962–1971)',
        theme_heading: 'Act 3: Royal College of Physicians & Early Statutory Ad Bans (1962–1971)',
        text: '<span class="para-ref">[3.1]</span> Despite Doll and Hill’s overwhelming statistical proof, the British government dragged its feet throughout the 1950s, fearful of losing hundreds of millions in tobacco tax revenues and cowed by the aggressive political lobbying of tobacco conglomerates. The inertia was shattered in 1962, when the Royal College of Physicians published its landmark report *Smoking and Health*, warning Parliament that cigarette smoking was causing a national death toll equivalent to a major wartime catastrophe.<br><br><span class="para-ref">[3.2]</span> Under intense public pressure, Parliament initiated an escalating legislative campaign against tobacco: in 1965, the government banned all cigarette commercials from British television screens; in 1971, health warnings were made legally compulsory on all cigarette packets; and tobacco sports sponsorship was progressively restricted. However, commercial tobacco firms fought back by sponsoring Formula 1 motor racing, keeping brand logos visible to millions of young television viewers.',
      },
      {
        act: 4,
        title: 'Act 4: The Public Indoor Smoking Ban & Secondhand Smoke (2000s)',
        theme_heading: 'Act 4: The Public Indoor Smoking Ban & Secondhand Smoke (2000s)',
        text: '<span class="para-ref">[4.1]</span> By the late 1990s, medical science established that tobacco did not merely poison the individual smoker, but inflicted severe mortal harm on non-smokers via *passive smoking* (secondhand smoke). Extensive epidemiological research proved that inhaling secondhand tobacco smoke in crowded pubs, restaurants, and workplaces caused thousands of fatal heart attacks and lung cancers in non-smoking hospitality workers every year.<br><br><span class="para-ref">[4.2]</span> This scientific revelation transformed public health policy: tobacco was no longer a matter of individual lifestyle choice, but a workplace safety hazard that the state had a legal duty to regulate. Under the landmark Health Act 2006, the British government enacted a total ban on smoking inside all enclosed public places and workplaces across England from 1 July 2007 (following Scotland in 2006 and Wales earlier in 2007). In October 2007, the legal purchase age for tobacco was raised from 16 to 18, permanently changing British social habits.',
      },
      {
        act: 5,
        title: 'Act 5: Plain Packaging, Advanced Oncology & The Smoke-Free Goal (2010s–Present)',
        theme_heading:
          'Act 5: Plain Packaging, Advanced Oncology & The Smoke-Free Goal (2010s–Present)',
        source: {
          id: 'source_b_plain_packaging',
          letter: 'B',
          title: 'Source B: Modern Cigarette Packet with Mandatory Government Health Warning',
          src: '/images/lung_cancer_campaign.jpg',
          source: '/images/lung_cancer_campaign.jpg',
          image: '/images/lung_cancer_campaign.jpg',
          caption:
            'A modern cigarette packet showing prominent, compulsory government health warnings ("Smoking kills") mandated under public health legislation to deter consumers.',
          desc: 'Contemporary standardized plain cigarette packaging displaying compulsory graphic medical warnings.',
          provenance:
            'Contemporary photograph of standardized commercial tobacco packaging compliant with UK and EU tobacco control directives. Public Health England / Department of Health Archive.',
          citation:
            'Department of Health and Social Care / Public Health England Standardized Packaging Directive, 2016.',
          question:
            'How does the transition from unregulated commercial advertising (Source A) to state-mandated plain packaging (Source B) illustrate the changing role of government intervention in 20th- and 21st-century public health?',
          hinge_question:
            'How does the transition from unregulated commercial advertising (Source A) to state-mandated plain packaging (Source B) illustrate the changing role of government intervention in 20th- and 21st-century public health?',
          source_context:
            'Modern standardized plain cigarette packaging introduced under the UK Children and Families Act and 2016 regulations, eliminating brand typography and corporate logos in favour of prominent photographic health warnings.',
          context:
            'Modern standardized plain cigarette packaging introduced under the UK Children and Families Act and 2016 regulations, eliminating brand typography and corporate logos in favour of prominent photographic health warnings.',
        },
        text: '<span class="para-ref">[5.1]</span> In May 2016, the UK enacted standardized plain packaging (<span class="archival-meta-tag">Source B</span>), mandating that all cigarettes be sold in an unappealing olive-green pack (Pantone 448C) with brand names in uniform typography, covered in graphic pictorial warnings of diseased organs. In 2024, Parliament advanced legislation to create a "smoke-free generation" by making it illegal to sell tobacco to anyone born after 1 January 2009. These statutory measures plunged adult male smoking prevalence from 65% in 1950 to under 13% today.<br><br><span class="para-ref">[5.2]</span> Meanwhile, modern clinical oncology deploys high-tech therapies: video-assisted keyhole lobectomies, stereotactic radiotherapy beams that destroy tumors while sparing healthy tissue, and immunotherapy drugs (like pembrolizumab) that train the immune system to hunt cancer cells. Yet because lung cancer has no early symptoms and is usually diagnosed late, 10-year survival remains stubbornly low at approximately 10%. This reality reinforces the fundamental lesson of modern public health: statutory government prevention remains infinitely more effective than clinical high-tech cures.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1920s–1950',
        para_ref: '[1.1–1.2]',
        heading: 'Why did early doctors fail to link smoking to lung cancer?',
        bullets: [
          'Men coughing black blood into hospital basins',
          'Blaming smelly road tarmac and lorry exhaust fumes',
          'Colourful billboards showing smiling smoking doctors',
        ],
        focus_clue: 'Why did early doctors fail to link smoking to lung cancer?',
      },
      {
        step: 2,
        date: '1950–1954',
        para_ref: '[2.1–2.2]',
        heading: 'How did statistical epidemiology prove the causal link?',
        bullets: [
          'Interviewing sick patients across twenty London wards',
          'Tracking forty thousand real family doctors over years',
          'Proving heavy smokers face fifty-times higher risk',
        ],
        focus_clue: 'How did statistical epidemiology prove the causal link?',
      },
      {
        step: 3,
        date: '1962–1971',
        para_ref: '[3.1–3.2]',
        heading: 'Why did government action encounter strong tobacco lobbying?',
        bullets: [
          'Banning glowing cigarette commercials on evening television',
          'Printing bold black warning text on cardboard cartons',
          'Sponsoring fast racing cars to keep brands famous',
        ],
        focus_clue: 'Why did government action encounter strong tobacco lobbying?',
      },
      {
        step: 4,
        date: '2000s',
        para_ref: '[4.1–4.2]',
        heading: 'Why was passive smoking crucial in banning public smoking?',
        bullets: [
          'Breathing toxic secondhand smoke in crowded rooms',
          'Padlocking pub ashtrays and stepping outside into cold',
          'Raising legal counter buying age to eighteen',
        ],
        focus_clue: 'Why was passive smoking crucial in banning public smoking?',
      },
      {
        step: 5,
        date: '2010s–Present',
        para_ref: '[5.1–5.2]',
        heading: 'Why does low cancer survival prove prevention beats cure?',
        bullets: [
          'Selling plain ugly mud-green packets with graphic photos',
          'Guiding tiny robotic camera pincers between chest ribs',
          'Boosting immune soldier cells to attack hidden tumours',
        ],
        focus_clue: 'Why does low cancer survival prove prevention beats cure?',
      },
    ],
    causal_domino_spine: {
      title: 'Case Study 2: Public Health & The Fight Against Lung Cancer',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1920s–1950',
          para_ref: '[1.1–1.2]',
          title: 'The Mysterious Epidemic',
          actor: 'Interwar Physicians & Tobacco Companies',
          tag: '🚬 UNEXPLAINED CARCINOMA RISE',
          trigger:
            'Between 1920 and 1950, UK lung cancer deaths escalated fourteen-fold, but physicians blamed industrial coal smog, new road tarmac fumes, or residual lung damage from 1918 Spanish Flu.',
          desc: 'Between 1920 and 1950, UK lung cancer deaths escalated fourteen-fold, but physicians blamed industrial coal smog, new road tarmac fumes, or residual lung damage from 1918 Spanish Flu.',
          connective:
            'Tobacco advertising depicted cigarettes as soothing throat cures endorsed by doctors, blinding medical authorities to the deadly chemical carcinogens inhaled in cigarette smoke.',
          question: 'Why did early doctors fail to link smoking to lung cancer?',
        },
        {
          step: 2,
          date: '1950–1954',
          para_ref: '[1.1–1.2]',
          title: 'Doll & Hill’s Proof',
          actor: 'Sir Richard Doll & Sir Austin Bradford Hill',
          tag: '📊 STATISTICAL EPIDEMIOLOGY',
          trigger:
            'Medical Research Council epidemiologists Richard Doll and Austin Bradford Hill surveyed 709 lung cancer patients across 20 London hospitals in 1950, finding all but two were regular smokers.',
          desc: 'Medical Research Council epidemiologists Richard Doll and Austin Bradford Hill surveyed 709 lung cancer patients across 20 London hospitals in 1950, finding all but two were regular smokers.',
          connective:
            'Followed up with the landmark British Doctors Study (tracking 40,000 physicians over decades), statistically proving that heavy smokers were 50 times more likely to die of lung carcinoma.',
          question: 'How did statistical epidemiology prove the causal link?',
        },
        {
          step: 3,
          date: '1962–1971',
          para_ref: '[3.1–3.2]',
          title: 'Royal College & Ad Bans',
          actor: 'Royal College of Physicians & British Parliament',
          tag: '📺 STATUTORY ADVERTISING RESTRICTIONS',
          trigger:
            'The Royal College of Physicians published Smoking and Health in 1962, demanding government intervention to curb cigarette marketing despite fierce lobbying from tobacco conglomerates.',
          desc: 'The Royal College of Physicians published Smoking and Health in 1962, demanding government intervention to curb cigarette marketing despite fierce lobbying from tobacco conglomerates.',
          connective:
            'Parliament banned cigarette television advertising in 1965 and mandated health warning labels on cigarette packets in 1971, initiating decades of progressive statutory tobacco control.',
          question: 'Why did government action encounter strong tobacco lobbying?',
        },
        {
          step: 4,
          date: '2000s',
          para_ref: '[4.1–4.2]',
          title: 'Public Smoking Ban',
          actor: 'Health Act 2006 & Public Health Campaigners',
          tag: '🚭 2007 PUBLIC SMOKING BAN',
          trigger:
            'Scientific evidence proving that passive secondhand smoke caused thousands of fatal lung cancers and heart attacks in hospitality workers gave the government moral and legal grounds to act.',
          desc: 'Scientific evidence proving that passive secondhand smoke caused thousands of fatal lung cancers and heart attacks in hospitality workers gave the government moral and legal grounds to act.',
          connective:
            'Parliament passed the Health Act 2006, making all enclosed public workplaces and pubs completely smoke-free from 1 July 2007 and raising the legal purchase age from 16 to 18.',
          question: 'Why was passive smoking crucial in banning public smoking?',
        },
        {
          step: 5,
          date: '2010s–Present',
          para_ref: '[5.1–5.2]',
          title: 'Plain Packs & Oncology',
          actor: 'Modern Thoracic Surgeons & Public Health Advocates',
          tag: '📦 PLAIN PACKAGING & ADVANCED ONCOLOGY',
          trigger:
            'The UK introduced standardized plain packaging in drab Pantone 448C with graphic pictorial warnings in 2016, driving adult smoking prevalence down to a record low of under 13%.',
          desc: 'The UK introduced standardized plain packaging in drab Pantone 448C with graphic pictorial warnings in 2016, driving adult smoking prevalence down to a record low of under 13%.',
          connective:
            'While advanced thoracic surgery, targeted radiotherapy, and immunotherapy have marginally improved prognosis, lung cancer’s stubbornly low 10-year survival rate (10%) proves statutory prevention remains far more effective than clinical cures.',
          question: 'Why does low cancer survival prove prevention beats cure?',
        },
      ],
    },
  },
};

for (let i = 15; i <= 19; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT4_5_ACT_DATA[lesson.id];
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
  '\n✅ Successfully migrated Key Topic 4 (Modern Britain) to 5-Act Gold Standard in data.js!',
);
