/**
 * Disciplinary Skills Progression Data
 *
 * Maps the four fundamental historical thinking strands across Years 7 through 11:
 * 1. Causation & Consequence
 * 2. Change & Continuity
 * 3. Source Comprehension, Utility & Provenance
 * 4. Historical Interpretations
 *
 * Provides concrete progression steps, cognitive scaffolds, and exam/assessment outcomes.
 */

export const DISCIPLINARY_STRANDS = [
  {
    id: 'causation',
    title: 'Causation & Consequence',
    icon: 'fa-solid fa-arrows-split-up-and-left',
    color: '#b45309',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    summary:
      'Progresses from single-sentence assertions in Year 7 to multi-causal categorization in Year 8, 16-mark causal hierarchies in Year 9, and Edexcel Paper 2 4-mark consequence & Paper 1 16-mark synoptic factor essays in GCSE.',
    years: {
      'Year 7': {
        stage: 'KS3 Foundations',
        skillHeadline:
          'Single-cause assertions & distinguishing triggers from background conditions',
        progression:
          'Pupils learn to distinguish between what happened and why it happened. They move beyond mere narrative storytelling by employing explicit causal connectives ("because", "as a result of", "this led to") to explain medieval events like William of Normandy\'s victory at Hastings or the rapid spread of the Black Death.',
        scaffold:
          'Sentence Starter: "William won the Battle of Hastings primarily because... This gave him a tactical advantage because..."',
        assessmentFormat:
          'Single PEEL paragraph focusing on one primary cause with supporting factual evidence.',
        modelQuestion: 'Explain why William, Duke of Normandy, won the Battle of Hastings in 1066.',
      },
      'Year 8': {
        stage: 'KS3 Analytical Extension',
        skillHeadline: 'Multi-causal categorization (Social, Economic, Political, Religious)',
        progression:
          'Pupils categorize causes into thematic dimensions and evaluate relative significance. They assess competing drivers behind major historical shifts, such as determining whether economic greed or religious zeal was the primary catalyst for European maritime exploration (1450–1750).',
        scaffold:
          'Categorization Matrix: "While economic desire for luxury trade routes was a crucial long-term factor, religious competition between Catholic and Protestant states acted as an immediate catalyst because..."',
        assessmentFormat:
          'Comparative multi-paragraph essay evaluating and ranking two competing causes.',
        modelQuestion:
          'To what extent was economic greed the primary cause of European global exploration (1450–1750)?',
      },
      'Year 9': {
        stage: 'KS3 Synthesis & Pre-GCSE Rigour',
        skillHeadline: 'Causal hierarchies & the "Powder Keg" structural model',
        progression:
          'Pupils construct sophisticated causal hierarchies, evaluating how underlying structural tensions (Militarism, Alliances, Imperialism, Nationalism) interacted with the trigger event at Sarajevo. Pupils weigh whether the assassination caused the war or merely detonated an existing powder keg.',
        scaffold:
          'Hierarchy Anchor: "Although the assassination of Archduke Franz Ferdinand triggered the July Crisis, it was only explosive because the alliance system had already divided the Great Powers into rigid opposing camps."',
        assessmentFormat:
          '16-mark structured causation essay with explicit criteria-based judgment.',
        modelQuestion:
          'Was the assassination of Franz Ferdinand the main cause of the First World War? (16 marks)',
      },
      'Year 10': {
        stage: 'GCSE Specialisation (Paper 2 Conflict in Middle East)',
        skillHeadline: 'Edexcel 4-mark Consequence isolation & 8-mark Analytical Narratives',
        progression:
          'Pupils master the updated Edexcel Paper 2 format: isolating one distinct consequence and detailing both its immediate and secondary historical ramifications. They construct 8-mark analytical narratives demonstrating cause-and-effect links across complex geopolitical events.',
        scaffold:
          'Edexcel 4-Mark Consequence Frame: "One consequence of [Event] was [Specific Consequence]. This occurred because [Contextual Evidence]. As a result, this changed [Subsequent Impact]."',
        assessmentFormat:
          'Edexcel Paper 2 Question 1 (4 marks: Explain one consequence...) and Question 2 (8 marks: Narrative account).',
        modelQuestion:
          'Explain one consequence of the 1947 UN Partition Plan for Jewish-Arab relations in Palestine. (4 marks)',
      },
      'Year 11': {
        stage: 'GCSE Synoptic Mastery (Paper 1 Medicine & Paper 2 Elizabeth)',
        skillHeadline: 'Synoptic factor weighing across 750 years (16 marks + 4 SPaG)',
        progression:
          'Pupils evaluate overarching historical factors across centuries: Government, Science & Technology, Individuals, War, Religion, and Chance. They judge which factor was most decisive across medieval, renaissance, industrial, and modern eras, sustaining a coherent thesis throughout.',
        scaffold:
          'Factor Matrix: "Although individual genius (Fleming, Florey, Chain) was essential to isolating penicillin, government funding and wartime urgency were the decisive factors, as state mobilization was required for mass production."',
        assessmentFormat:
          '16-mark (+4 SPaG) thematic judgment essay spanning 1250 to the present day.',
        modelQuestion:
          '"The most important factor in the development of medicine was science and technology." How far do you agree? (16 marks + 4 SPaG)',
      },
    },
  },
  {
    id: 'change_continuity',
    title: 'Change & Continuity',
    icon: 'fa-solid fa-clock-rotate-left',
    color: '#15803d',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    summary:
      'Progresses from challenging linear progress narratives in Year 7 to evaluating the pace and extent of industrial change in Year 8, turning points in Year 9, and Edexcel 8-mark similarity/difference across eras in GCSE.',
    years: {
      'Year 7': {
        stage: 'KS3 Foundations',
        skillHeadline: 'Challenging linear progress: regression, collapse & stagnation',
        progression:
          'Pupils challenge the popular misconception that history is an uninterrupted march of improvement. By contrasting sophisticated Roman public health systems (aqueducts, public baths, sewers) with medieval cesspits, pupils identify periods of regression, collapse, and stagnation.',
        scaffold:
          'Continuum Starter: "Public health did not improve steadily after antiquity; in fact, the collapse of Roman administration led to dramatic regression in urban sanitation because..."',
        assessmentFormat:
          'Comparative timeline and analytical paragraph identifying turning points versus periods of stagnation.',
        modelQuestion:
          'Why did public health and sanitation regress in Britain following the collapse of Roman rule?',
      },
      'Year 8': {
        stage: 'KS3 Analytical Extension',
        skillHeadline: 'Pace, nature & extent of change (Revolution vs Social Continuity)',
        progression:
          'Pupils evaluate whether technological transformation matched human reality. In studying Industrialisation and Empire, pupils contrast revolutionary changes in steam manufacturing with the continuity of working-class exploitation, disease, and political disenfranchisement.',
        scaffold:
          'Extent Spectrum: "While the mechanization of textiles represented revolutionary technological change, the everyday living conditions and health of factory workers remained fundamentally unchanged until the Public Health Act of 1848."',
        assessmentFormat:
          'Thematic extended response weighing industrial progress against working-class hardship.',
        modelQuestion:
          'Did the Industrial Revolution represent genuine progress for the British population between 1750 and 1900?',
      },
      'Year 9': {
        stage: 'KS3 Synthesis & Pre-GCSE Rigour',
        skillHeadline: 'Decisive turning points versus entrenched continuities',
        progression:
          'Pupils assess whether watershed events (1914, 1918, 1945) created a genuinely new social and geopolitical order or masked persistent continuities. In Post-War Britain, pupils evaluate whether the Welfare State fundamentally changed British society or whether inequalities persisted.',
        scaffold:
          'Turning Point Criteria: "For an event to be a true turning point, it must alter both institutional structures and lived experiences. While the Treaty of Versailles redrew European borders, the underlying imperial power struggles continued..."',
        assessmentFormat:
          '16-mark evaluative essay assessing the extent of social or political transformation.',
        modelQuestion:
          'How far did the founding of the NHS and Welfare State transform British society between 1945 and 1970?',
      },
      'Year 10': {
        stage: 'GCSE Specialisation (Paper 3 Weimar & Nazi Germany)',
        skillHeadline: 'Institutional dismantle versus administrative continuity',
        progression:
          'Pupils analyse how the Nazi regime dismantled the democratic institutions of the Weimar Republic while preserving traditional bureaucratic, judicial, and industrial hierarchies to maintain state efficiency and rearmament.',
        scaffold:
          'Institutional Comparison: "Although the political constitution was completely overturned through Gleichschaltung, the judiciary, big business cartels, and civil service exhibited deep institutional continuity with the Weimar past."',
        assessmentFormat:
          'Edexcel Paper 3 analytical explanation questions on the impact of totalitarian rule.',
        modelQuestion:
          'Explain why the lives of German women changed in the years 1933–1939. (12 marks)',
      },
      'Year 11': {
        stage: 'GCSE Synoptic Mastery (Paper 1 Medicine)',
        skillHeadline: 'Edexcel 8-mark Similarity & Difference across 750 years',
        progression:
          'Pupils master the Edexcel 8-mark comparative format: identifying one similarity or difference between two historical eras (e.g. treatment of the Black Death in 1348 vs Great Plague in 1665) and explaining the underlying reasons for continuity or change.',
        scaffold:
          'Edexcel 8-Mark Comparative Framework: "One similarity in the treatments used in the 14th and 17th centuries was the reliance on bleeding and purging. In 1348... Similarly, in 1665... This similarity existed because both periods still lacked an accurate understanding of germ theory."',
        assessmentFormat:
          'Edexcel Paper 1 Question 3 (8 marks: Explain one similarity/difference between...)',
        modelQuestion:
          'Explain one similarity in the attempts to treat or prevent the spread of disease during the Black Death (1348) and the Great Plague (1665). (8 marks)',
      },
    },
  },
  {
    id: 'source_utility',
    title: 'Source Utility & Provenance',
    icon: 'fa-solid fa-magnifying-glass-chart',
    color: '#1d4ed8',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    summary:
      'Progresses from extracting literal information and inferences in Year 7 to interrogating Nature, Origin, and Purpose (NOP) in Year 8, testing propaganda against context in Year 9, and Edexcel 12-mark utility & Western Front 8-mark evaluations in GCSE.',
    years: {
      'Year 7': {
        stage: 'KS3 Foundations',
        skillHeadline: 'Primary source comprehension & supported inferences',
        progression:
          'Pupils distinguish between literal information and historical inferences. Using medieval sources (monastic chronicles, illuminations, taxation rolls), pupils learn to quote evidence and infer what life was like for ordinary people.',
        scaffold:
          'Inference Stem: "From Source A, I can infer that medieval peasants lived in constant insecurity. The source details that... This suggests that..."',
        assessmentFormat:
          'Supported inference task with direct source citations and caption cross-referencing.',
        modelQuestion:
          'What can you infer from Source A about the impact of the Black Death on everyday village life?',
      },
      'Year 8': {
        stage: 'KS3 Analytical Extension',
        skillHeadline: 'Interrogating Provenance: Nature, Origin & Purpose (NOP)',
        progression:
          'Pupils evaluate how the author, date, medium, and intended audience shape a source\'s testimony. Rather than dismissing sources as "biased", pupils explore how perspective reveals the motives and beliefs of colonial governors, enslaved diarists, or factory owners.',
        scaffold:
          'NOP Interrogation Frame: "Because Source B is a parliamentary petition written by mill owners seeking to avoid regulation, its purpose is to exaggerate the economic danger of limiting child labour. However, it is highly useful because it demonstrates contemporary commercial priorities."',
        assessmentFormat:
          'Comparative utility evaluation balancing source content against author provenance.',
        modelQuestion:
          'How useful are Sources B and C for an enquiry into the working conditions of children in Victorian textile mills?',
      },
      'Year 9': {
        stage: 'KS3 Synthesis & Pre-GCSE Rigour',
        skillHeadline: 'Contextual testing & utility of propaganda',
        progression:
          'Pupils move beyond the trap of "it is biased, therefore it is useless". Pupils analyse British and German Great War recruitment posters, trench newspapers, and censorship reports, using their own historical knowledge to explain what the source reveals about morale and state control.',
        scaffold:
          'Utility Formula: "Source A is useful for understanding British home front morale because, although it presents an idealized depiction of trench life, this deliberate distortion reveals the government\'s anxiety over maintaining voluntary enlistment in late 1914."',
        assessmentFormat:
          'Structured 10–12 mark utility response testing content and provenance against own knowledge.',
        modelQuestion:
          'How useful is Source A for an enquiry into government attitudes toward recruitment in 1914?',
      },
      'Year 10': {
        stage: 'GCSE Specialisation (Paper 3 Weimar & Nazi Germany)',
        skillHeadline: 'Edexcel Paper 3 4-mark Inference & 12-mark Utility',
        progression:
          'Pupils master Edexcel Question 1 (giving two inferences with supporting details) and Question 3a (evaluating two contemporary sources for a specific enquiry, evaluating content, context, and provenance: author, motive, audience).',
        scaffold:
          'Edexcel 12-Mark Utility Architecture: For Source A: 1) Content analysis with own knowledge; 2) Provenance evaluation (NOP); 3) Judged utility for enquiry. Repeat for Source B.',
        assessmentFormat:
          'Edexcel Paper 3 Q1 (4 marks: Inferences) and Q3a (12 marks: Source Utility).',
        modelQuestion:
          'How useful are Sources A and B for an enquiry into the methods used by the Nazi regime to control youth in Germany? (12 marks)',
      },
      'Year 11': {
        stage: 'GCSE Synoptic Mastery (Paper 1 Western Front)',
        skillHeadline: 'Paper 1 8-mark Utility with Provenance Clues & 4-mark Follow-Up',
        progression:
          'Pupils evaluate two sources for an enquiry into the British sector of the Western Front (injuries, treatments, evacuation chains), providing provenance scaffolding (author, motive, audience). Pupils then design a historical follow-up enquiry selecting a specific primary source (e.g. RAMC war diary).',
        scaffold:
          'Follow-Up 4-Step Protocol: 1) Detail in source to follow up; 2) Question I would ask; 3) Type of source I would use; 4) How this source would answer my question.',
        assessmentFormat:
          'Edexcel Paper 1 Question 2a (8 marks: Utility) & Question 2b (4 marks: How would you follow up Source X).',
        modelQuestion:
          'How useful are Sources A and B for an enquiry into the treatment of gas casualties in casualty clearing stations on the Western Front? (8 marks)',
      },
    },
  },
  {
    id: 'interpretations',
    title: 'Historical Interpretations',
    icon: 'fa-solid fa-comments',
    color: '#7c3aed',
    bgColor: '#faf5ff',
    borderColor: '#e9d5ff',
    summary:
      'Progresses from recognizing that history is constructed from evidence in Year 7 to deconstructing historiographical shifts in Year 8, evaluating academic debates in Year 9, and mastering Edexcel Paper 3 Section B 24-mark suite.',
    years: {
      'Year 7': {
        stage: 'KS3 Foundations',
        skillHeadline: 'Recognising that history is constructed & contested',
        progression:
          'Pupils understand that history is not simply "the past", but rather accounts constructed by historians based on surviving evidence. Pupils contrast conflicting viewpoints on medieval monarchs (e.g. King John as a tyrannical monster vs. an unfortunate administrator facing impossible inflation).',
        scaffold:
          'Interpretation Lens: "Historian A and Historian B reach contrasting conclusions about King John because Historian A focuses on monastic chronicles, whereas Historian B examines royal financial accounts."',
        assessmentFormat:
          'Short comparison explaining why two historians might view the same king differently.',
        modelQuestion:
          'Why do modern historians have different views about the reign of King John?',
      },
      'Year 8': {
        stage: 'KS3 Analytical Extension',
        skillHeadline: 'Deconstructing historiographical shifts over time',
        progression:
          'Pupils investigate why interpretations change over generations. Studying the British Empire and the colonisation of Australia, pupils examine how Victorian imperial histories celebrated "civilising missions", whereas post-colonial and modern historians foreground dispossession, violence, and indigenous resistance.',
        scaffold:
          'Historiographical Shift Frame: "Writing in 1890, Historian X celebrated the expansion of British rule because Victorian culture prioritised imperial prestige. In contrast, modern historians writing after the 1970s emphasise the voices of First Nations peoples because..."',
        assessmentFormat:
          "Analytical paragraph deconstructing how a historian's contemporary context influences their scholarship.",
        modelQuestion:
          'How and why have historical interpretations of the British Empire changed over the last 100 years?',
      },
      'Year 9': {
        stage: 'KS3 Synthesis & Pre-GCSE Rigour',
        skillHeadline: 'Evaluating academic debates ("Lions led by Donkeys")',
        progression:
          'Pupils engage with authentic historiographical arguments. In studying the Somme, pupils contrast the orthodox critique of British generalship (Alan Clark) with modern revisionist scholarship (Gary Sheffield, Richard Holmes), evaluating which interpretation is more persuasive using statistical and tactical evidence.',
        scaffold:
          'Evaluative Balance: "While Interpretation 1 persuasively highlights the catastrophic casualties on 1 July 1916, Interpretation 2 is ultimately more convincing because it recognizes the tactical and technological learning curve that the British Army underwent by late 1916."',
        assessmentFormat:
          '16-mark structured interpretations essay weighing competing historical arguments.',
        modelQuestion:
          'How far do you agree with Interpretation 1 that British generals on the Western Front were "donkeys" leading "lions"? (16 marks)',
      },
      'Year 10': {
        stage: 'GCSE Specialisation (Paper 3 Weimar & Nazi Germany)',
        skillHeadline: 'Edexcel Paper 3 Section B 24-mark Interpretation Suite',
        progression:
          'Pupils master the full Edexcel Paper 3 interpretation sequence: 1) Question 3b (4 marks: How do Interpretations 1 and 2 differ?); 2) Question 3c (4 marks: Why do they differ? E.g. differing evidence/focus); 3) Question 3d (16 marks + 4 SPaG: How far do you agree with Interpretation 2 using both interpretations and own knowledge?).',
        scaffold:
          'Edexcel Paper 3 Architecture: Q3b: Extract contrasting views with direct quotes. Q3c: Explain how they use different sources/focus. Q3d: Balanced essay evaluating Interpretation 1 and Interpretation 2 with precise historical knowledge, concluding with a sustained judgment.',
        assessmentFormat: 'Full Edexcel Paper 3 Section B examination suite (total 24 marks).',
        modelQuestion:
          'How far do you agree with Interpretation 2 that the police state was the main reason the Nazi regime maintained control over the German people? (16 marks + 4 SPaG)',
      },
      'Year 11': {
        stage: 'GCSE Synoptic Mastery (Paper 2 & 3)',
        skillHeadline: 'Nuanced historiographical critique & Grade 8/9 synthesis',
        progression:
          'Pupils achieve mastery by identifying nuanced assumptions and historiographical traditions. In Early Elizabethan England and Weimar Germany, pupils synthesize conflicting viewpoints under strict time constraints, reaching balanced, criteria-driven conclusions.',
        scaffold:
          'Synthesis Frame: "Although Interpretation 1 rightly identifies the coercive impact of the Gestapo, it overlooks the degree of voluntary denunciation and widespread social consent demonstrated by Interpretation 2. Therefore, a nuanced judgment must recognize that control operated through a combination of fear and popular consensus."',
        assessmentFormat:
          'Timed mock evaluations demonstrating high-level academic synthesis and evaluative flair.',
        modelQuestion:
          'Assess the convincingness of competing interpretations regarding the degree of popular support for the Nazi regime between 1933 and 1939.',
      },
    },
  },
];

export const YEAR_GROUPS_PROGRESSION = [
  {
    year: 'Year 7',
    ks: 'Key Stage 3',
    subtitle: 'Foundational Knowledge & Single-Concept Reasoning',
    focus:
      'Establishing secure historical vocabulary, literal vs inferential reading, single-cause PEEL structures, and non-linear progress.',
    color: '#1b365d',
    badge: '#dbeafe',
    badgeText: '#1e40af',
  },
  {
    year: 'Year 8',
    ks: 'Key Stage 3',
    subtitle: 'Analytical Categorization & Provenance Interrogation',
    focus:
      'Multi-causal ranking (SPECTRUM: Social, Political, Economic, Cultural), NOP (Nature, Origin, Purpose) interrogation, and historiographical shifts.',
    color: '#1b4332',
    badge: '#dcfce7',
    badgeText: '#166534',
  },
  {
    year: 'Year 9',
    ks: 'Key Stage 3',
    subtitle: 'Historiographical Debate & Pre-GCSE Essay Rigour',
    focus:
      '16-mark causal hierarchies, evaluating propaganda utility with context, and academic debate ("Lions led by Donkeys").',
    color: '#4c1d95',
    badge: '#ede9fe',
    badgeText: '#5b21b6',
  },
  {
    year: 'Year 10',
    ks: 'Key Stage 4 (GCSE)',
    subtitle: 'Edexcel Exam Specialisation (Papers 2 & 3)',
    focus:
      'Direct 4-mark consequence isolation, 8-mark narratives, 12-mark utility, and the full 24-mark Paper 3 interpretation suite.',
    color: '#7c2d12',
    badge: '#fff7ed',
    badgeText: '#9a3412',
  },
  {
    year: 'Year 11',
    ks: 'Key Stage 4 (GCSE)',
    subtitle: 'Synoptic Mastery & Long-Arc Analysis (Papers 1, 2 & 3)',
    focus:
      '16-mark synoptic factor essays across 750 years (Medicine), 8-mark similarity/difference, Western Front 8-mark utility & follow-up enquiries.',
    color: '#1e1b4b',
    badge: '#ecfeff',
    badgeText: '#0e7490',
  },
];
