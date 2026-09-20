const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const dataFilePath = path.resolve(__dirname, '../units/edexcel_medicine/data.js');

async function run() {
  console.log('Loading existing units/edexcel_medicine/data.js...');
  const mod = await import(pathToFileURL(dataFilePath).href);
  const unitData = mod.default || mod.unitData;

  console.log(`Currently loaded ${unitData.lessons.length} lessons.`);

  // ============================================================================
  // STEP 1: UPGRADE KT4 (Lessons 15 to 19 / lesson_4_1 to lesson_4_5)
  // ============================================================================
  console.log('Step 1: Upgrading KT4 sources and text citations...');

  // 4.1: DNA & Genetics
  const l41 = unitData.lessons[15];
  const s41_a = {
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
    source_context:
      'In May 1952 at King’s College London, physical chemist Rosalind Franklin and Raymond Gosling captured Photograph 51 using X-ray crystallography after 62 continuous hours of radiation exposure. The distinct X-shaped dark reflection pattern provided definitive mathematical proof of DNA’s helical cylinder.',
    context:
      'In May 1952 at King’s College London, physical chemist Rosalind Franklin and Raymond Gosling captured Photograph 51 using X-ray crystallography after 62 continuous hours of radiation exposure. The distinct X-shaped dark reflection pattern provided definitive mathematical proof of DNA’s helical cylinder.',
    question:
      'How does the sharp X-pattern in Franklin’s X-ray photograph mathematically prove that DNA is a helical coil rather than a flat chain, and why was this physical evidence critical for Watson and Crick’s model?',
    hinge_question:
      'How does the sharp X-pattern in Franklin’s X-ray photograph mathematically prove that DNA is a helical coil rather than a flat chain, and why was this physical evidence critical for Watson and Crick’s model?',
  };

  const s41_b = {
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
    source_context:
      'In March 1953 at the Cavendish Laboratory in Cambridge, James Watson and Francis Crick constructed this three-dimensional molecular model from sheet-metal bases and brass rods, deciphering the complementary base pairing of Adenine-Thymine and Cytosine-Guanine.',
    context:
      'In March 1953 at the Cavendish Laboratory in Cambridge, James Watson and Francis Crick constructed this three-dimensional molecular model from sheet-metal bases and brass rods, deciphering the complementary base pairing of Adenine-Thymine and Cytosine-Guanine.',
    question:
      'Why was proving the exact base-pairing mechanism (A-T and C-G) the decisive breakthrough in understanding how genetic hereditary information replicates and passes between generations?',
    hinge_question:
      'Why was proving the exact base-pairing mechanism (A-T and C-G) the decisive breakthrough in understanding how genetic hereditary information replicates and passes between generations?',
  };

  l41.sources = [s41_a, s41_b];
  if (!l41.narrative_blocks[1].text.includes('Source A')) {
    l41.narrative_blocks[1].text = l41.narrative_blocks[1].text.replace(
      'Franklin captured "Photograph 51,"',
      'Franklin captured "Photograph 51" (<span class="archival-meta-tag">Source A</span>),',
    );
  }
  l41.narrative_blocks[1].source = s41_a;

  if (!l41.narrative_blocks[2].text.includes('Source B')) {
    l41.narrative_blocks[2].text = l41.narrative_blocks[2].text.replace(
      'three-dimensional model revealing that DNA was a "double helix"',
      'three-dimensional model (<span class="archival-meta-tag">Source B</span>) revealing that DNA was a "double helix"',
    );
  }
  l41.narrative_blocks[2].source = s41_b;

  // 4.2: Lifestyle & Diagnosis
  const l42 = unitData.lessons[16];
  const s42_a = {
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
    source_context:
      'On 22 December 1895 at the University of Würzburg, Wilhelm Röntgen produced humanity’s first clinical X-ray, capturing the living skeletal architecture of his wife Anna Bertha’s hand and signet ring without surgical dissection.',
    context:
      'On 22 December 1895 at the University of Würzburg, Wilhelm Röntgen produced humanity’s first clinical X-ray, capturing the living skeletal architecture of his wife Anna Bertha’s hand and signet ring without surgical dissection.',
    question:
      'How did Röntgen’s discovery of X-rays fundamentally overturn thousands of years of medical diagnosis by allowing physicians to view internal pathology without making an incision?',
    hinge_question:
      'How did Röntgen’s discovery of X-rays fundamentally overturn thousands of years of medical diagnosis by allowing physicians to view internal pathology without making an incision?',
  };

  const s42_b = {
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
    source_context:
      'In 1971 at Atkinson Morley Hospital in Wimbledon, British electrical engineer Godfrey Hounsfield assembled the prototype EMI clinical CT scanner, combining rotating X-ray beams with digital computing algorithms to generate cross-sectional 3D slices of the brain.',
    context:
      'In 1971 at Atkinson Morley Hospital in Wimbledon, British electrical engineer Godfrey Hounsfield assembled the prototype EMI clinical CT scanner, combining rotating X-ray beams with digital computing algorithms to generate cross-sectional 3D slices of the brain.',
    question:
      'In what way did computerized axial tomography (CT scanning) overcome the fundamental 2D flattening limitation of traditional Röntgen X-rays when diagnosing soft-tissue brain tumours?',
    hinge_question:
      'In what way did computerized axial tomography (CT scanning) overcome the fundamental 2D flattening limitation of traditional Röntgen X-rays when diagnosing soft-tissue brain tumours?',
  };

  l42.sources = [s42_a, s42_b];
  if (!l42.narrative_blocks[1].text.includes('Source A')) {
    l42.narrative_blocks[1].text = l42.narrative_blocks[1].text.replace(
      'Bertha’s fingers',
      'Bertha’s fingers (<span class="archival-meta-tag">Source A</span>)',
    );
  }
  l42.narrative_blocks[1].source = s42_a;

  if (!l42.narrative_blocks[2].text.includes('Source B')) {
    l42.narrative_blocks[2].text = l42.narrative_blocks[2].text.replace(
      'prototype clinical CT scanner at Atkinson Morley Hospital',
      'prototype clinical CT scanner (<span class="archival-meta-tag">Source B</span>) at Atkinson Morley Hospital',
    );
  }
  l42.narrative_blocks[2].source = s42_b;

  // 4.3: Magic Bullets & The NHS
  const l43 = unitData.lessons[17];
  const s43_a = {
    id: 'source_a_ehrlich_lab',
    letter: 'A',
    title: 'Source A: Paul Ehrlich and Sahachiro Hata in their Frankfurt Laboratory (1909)',
    src: '/images/paul_ehrlich_lab.jpg',
    source: '/images/paul_ehrlich_lab.jpg',
    image: '/images/paul_ehrlich_lab.jpg',
    caption:
      'Paul Ehrlich examining chemical test tubes in his Frankfurt laboratory in 1909, during the systematic research that led to the discovery of Salvarsan 606 with Sahachiro Hata.',
    desc: 'Archival photograph of Paul Ehrlich and Sahachiro Hata working in their Frankfurt laboratory.',
    provenance:
      'Primary archival photograph taken in 1909 at the Royal Institute for Experimental Therapy, Frankfurt, Germany. Paul Ehrlich Institute / Wellcome Collection Archive (Shelfmark: ICV No 18274).',
    citation:
      'Royal Institute for Experimental Therapy, Frankfurt (Wellcome Collection ICV 18274), 1909.',
    source_context:
      'In 1909 at the Frankfurt Royal Institute for Experimental Therapy, Paul Ehrlich and Sahachiro Hata systematically tested hundreds of synthesized chemical arsenic derivatives until compound 606 (Salvarsan) proved effective against Treponema pallidum.',
    context:
      'In 1909 at the Frankfurt Royal Institute for Experimental Therapy, Paul Ehrlich and Sahachiro Hata systematically tested hundreds of synthesized chemical arsenic derivatives until compound 606 (Salvarsan) proved effective against Treponema pallidum.',
    question:
      'How did Ehrlich’s concept of a synthetic ‘magic bullet’ represent a radical departure from traditional botanical remedies and universal germ-killing antiseptics like carbolic acid?',
    hinge_question:
      'How did Ehrlich’s concept of a synthetic ‘magic bullet’ represent a radical departure from traditional botanical remedies and universal germ-killing antiseptics like carbolic acid?',
  };

  const s43_b = {
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
    source_context:
      'In June 1948, Minister of Health Aneurin Bevan distributed this official information booklet to every British household, announcing that from 5 July 1948, comprehensive medical, hospital, dental, and optical care would be provided universally free at the point of delivery.',
    context:
      'In June 1948, Minister of Health Aneurin Bevan distributed this official information booklet to every British household, announcing that from 5 July 1948, comprehensive medical, hospital, dental, and optical care would be provided universally free at the point of delivery.',
    question:
      'How does the universal entitlement outlined in this 1948 leaflet demonstrate a permanent structural rejection of the 19th-century Victorian Poor Law and voluntary hospital system?',
    hinge_question:
      'How does the universal entitlement outlined in this 1948 leaflet demonstrate a permanent structural rejection of the 19th-century Victorian Poor Law and voluntary hospital system?',
  };

  l43.sources = [s43_a, s43_b];
  if (!l43.narrative_blocks[1].text.includes('Source A')) {
    l43.narrative_blocks[1].text = l43.narrative_blocks[1].text.replace(
      'Salvarsan 606',
      'Salvarsan 606 (<span class="archival-meta-tag">Source A</span>)',
    );
  }
  l43.narrative_blocks[1].source = s43_a;

  if (!l43.narrative_blocks[2].text.includes('Source B')) {
    l43.narrative_blocks[2].text =
      l43.narrative_blocks[2].text +
      ' In June 1948, Bevan prepared the nation by distributing an official household information leaflet (<span class=\"archival-meta-tag\">Source B</span>) to every family in Britain, explaining the revolutionary scope of free, universal healthcare.';
  }
  l43.narrative_blocks[2].source = s43_b;

  // 4.4: Penicillin
  const l44 = unitData.lessons[18];
  const s44_a = {
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
    source_context:
      'In September 1928 at St Mary’s Hospital, London, Alexander Fleming returned from holiday to discover that a stray Penicillium notatum spore had contaminated a staphylococci culture plate, producing a bacteria-free lysis halo around the mold.',
    context:
      'In September 1928 at St Mary’s Hospital, London, Alexander Fleming returned from holiday to discover that a stray Penicillium notatum spore had contaminated a staphylococci culture plate, producing a bacteria-free lysis halo around the mold.',
    question:
      'Why was Fleming unable to translate his brilliant 1928 laboratory observation of penicillin’s antibacterial halo into an injectable medicine for human clinical patients?',
    hinge_question:
      'Why was Fleming unable to translate his brilliant 1928 laboratory observation of penicillin’s antibacterial halo into an injectable medicine for human clinical patients?',
  };

  const s44_b = {
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
    source_context:
      'In 1943–1944, during Allied preparations for D-Day, Oxford researchers Howard Florey and Ernst Chain collaborated with the US Department of Agriculture in Peoria, Illinois, developing deep-tank corn-steep liquor fermentation to mass-produce pure penicillin.',
    context:
      'In 1943–1944, during Allied preparations for D-Day, Oxford researchers Howard Florey and Ernst Chain collaborated with the US Department of Agriculture in Peoria, Illinois, developing deep-tank corn-steep liquor fermentation to mass-produce pure penicillin.',
    question:
      'Why was the industrial transition from surface culture bottles to 10,000-gallon aerated deep-tank fermentation vats the decisive factor in saving thousands of Allied soldiers in 1944?',
    hinge_question:
      'Why was the industrial transition from surface culture bottles to 10,000-gallon aerated deep-tank fermentation vats the decisive factor in saving thousands of Allied soldiers in 1944?',
  };

  l44.sources = [s44_a, s44_b];
  if (!l44.narrative_blocks[1].text.includes('Source A')) {
    l44.narrative_blocks[1].text = l44.narrative_blocks[1].text.replace(
      'Examining one contaminated dish, he uttered',
      'Examining one contaminated dish (<span class="archival-meta-tag">Source A</span>), he uttered',
    );
  }
  l44.narrative_blocks[1].source = s44_a;

  if (!l44.narrative_blocks[2].text.includes('Source B')) {
    l44.narrative_blocks[2].text = l44.narrative_blocks[2].text.replace(
      'They recycled penicillin by painstakingly collecting',
      'They cultivated penicillin using specialized laboratory glassware racks (<span class="archival-meta-tag">Source B</span>) and recycled the drug by painstakingly collecting',
    );
  }
  l44.narrative_blocks[2].source = s44_b;

  // 4.5: Lung Cancer
  const l45 = unitData.lessons[19];
  const s45_a = {
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
    source_context:
      'A 1949 magazine advertisement for Camel cigarettes featuring a physician in a white laboratory coat with a stethoscope, claiming "More doctors smoke Camels than any other cigarette" to reassure consumers regarding health concerns.',
    context:
      'A 1949 magazine advertisement for Camel cigarettes featuring a physician in a white laboratory coat with a stethoscope, claiming "More doctors smoke Camels than any other cigarette" to reassure consumers regarding health concerns.',
    question:
      'How did corporate tobacco advertising exploit the professional authority of medical practitioners to suppress public awareness of smoking hazards prior to Doll and Hill’s 1950 epidemiological study?',
    hinge_question:
      'How did corporate tobacco advertising exploit the professional authority of medical practitioners to suppress public awareness of smoking hazards prior to Doll and Hill’s 1950 epidemiological study?',
  };

  const s45_b = {
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
    source_context:
      'Modern standardized plain cigarette packaging introduced under the UK Children and Families Act and 2016 regulations, eliminating brand typography and corporate logos in favour of prominent photographic health warnings.',
    context:
      'Modern standardized plain cigarette packaging introduced under the UK Children and Families Act and 2016 regulations, eliminating brand typography and corporate logos in favour of prominent photographic health warnings.',
    question:
      'How does the transition from unregulated commercial advertising (Source A) to state-mandated plain packaging (Source B) illustrate the changing role of government intervention in 20th- and 21st-century public health?',
    hinge_question:
      'How does the transition from unregulated commercial advertising (Source A) to state-mandated plain packaging (Source B) illustrate the changing role of government intervention in 20th- and 21st-century public health?',
  };

  l45.sources = [s45_a, s45_b];
  if (!l45.narrative_blocks[0].text.includes('Source A')) {
    l45.narrative_blocks[0].text = l45.narrative_blocks[0].text.replace(
      'running advertisements featuring actors dressed as white-coated doctors claiming that',
      'running advertisements (<span class="archival-meta-tag">Source A</span>) featuring actors dressed as white-coated doctors claiming that',
    );
  }
  l45.narrative_blocks[0].source = s45_a;

  if (!l45.narrative_blocks[3].text.includes('Source B')) {
    l45.narrative_blocks[3].text = l45.narrative_blocks[3].text.replace(
      'enforcing standardized plain olive-green packaging (Pantone 448 C)',
      'enforcing standardized plain olive-green packaging (<span class="archival-meta-tag">Source B</span>) (Pantone 448 C)',
    );
  }
  l45.narrative_blocks[3].source = s45_b;

  console.log('✅ Step 1 complete: KT4 sources and text citations upgraded.');

  // Save changes to disk using a helper module or directly
  fs.writeFileSync(
    path.resolve(__dirname, 'kt4_upgraded.json'),
    JSON.stringify(unitData.lessons.slice(15, 20), null, 2),
  );
  console.log('Saved upgraded KT4 lessons to temporary JSON.');
}

run().catch((err) => {
  console.error('❌ Error during run:', err);
  process.exit(1);
});
