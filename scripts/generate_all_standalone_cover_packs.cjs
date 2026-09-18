/**
 * generate_all_standalone_cover_packs.cjs
 *
 * Master Compilation Pipeline for the Antigravity Standalone Emergency Cover Pack Suite.
 * Generates 8 rigorous, double-period (100–110m) 2-page A4 double-sided printable packs.
 *
 * Suite Architecture:
 *   1. yr7_tollund_man      - Year 7: The Mystery of the Tollund Man (Evidence & Forensics)
 *   2. yr7_eyam_plague      - Year 7: The Black Death in Eyam (1665) (Causation & Sacrifice)
 *   3. yr8_great_fire       - Year 8: The Great Fire of London (1666) (Eyewitnesses vs Scapegoats)
 *   4. yr8_equiano_passage  - Year 8: The Middle Passage & Olaudah Equiano (Testimony & Abolition)
 *   5. yr9_christmas_truce  - Year 9: The Christmas Truce of 1914 (Myth vs Archival Reality)
 *   6. yr9_bletchley_park   - Year 9: Codebreakers of Bletchley Park (Alan Turing & Strategic Impact)
 *   7. gcse_jack_ripper     - GCSE:   Jack the Ripper & Whitechapel (1888) (Source Utility Masterclass)
 *   8. gcse_dresden_bombing - GCSE:   The Bombing of Dresden (1945) (Historical Interpretations Clash)
 *
 * Usage:
 *   node scripts/generate_all_standalone_cover_packs.cjs        (compiles all 8 packs)
 *   node scripts/generate_all_standalone_cover_packs.cjs yr7_tollund_man (compiles single pack)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_ROOT = 'G:\\My Drive\\AAMX\\Dep File';

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// SUITE METADATA & CONTENT DEFINITIONS
// --------------------------------------------------------------------------
const COVER_PACKS = [
  // 1. Year 7 - Tollund Man
  {
    id: 'yr7_tollund_man',
    title: 'The Mystery of the Tollund Man',
    subtitle: 'Period 1 Forensic Investigation • Murder Victim or Sacred Sacrifice?',
    yearLabel: 'Year 7 (Key Stage 3)',
    specLabel: 'KS3 History Evidence & Forensic Enquiry',
    headerColor: '#1e3a8a',
    accentColor: '#0284c7',
    tagColor: '#0369a1',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons',
    pdfFileName: 'standalone_cover_yr7_tollund_man.pdf',
    driveFolders: ['Year 7', 'Year 7\\Medieval England'],
    driveTitle: 'Year 7 Emergency Cover - The Mystery of the Tollund Man (Double Period).pdf',

    p1Context:
      '<strong>Historical Setting (c. 400 BC — Iron Age Jutland):</strong> In May 1950, brothers Viggo and Emil Højgaard were cutting peat for fuel in Bjældskovdal bog, Denmark. Two metres deep in the acidic peat moss, they discovered a human body so lifelike and unblemished they alerted the police, believing they had found a recent murder victim. The body was unclothed except for a pointed skin cap fastened with a chin strap and a smooth hide belt around his waist. Around his neck was a braided oxhide rope noose, pulled tight. The peat water had tanned his skin and preserved his organs for 2,400 years.',

    sources: [
      {
        tag: 'Source A • Lead Forensic Archaeologist',
        quote:
          '"The man lay on his right side as if asleep, his knees drawn up in a peaceful posture. His eyes were gently closed and his mouth wore a faint, calm smile. Around his neck was an arrangement of braided oxhide cord, knotted into a running noose with the free end trailing down his back. The neck vertebrae were not broken, indicating he died of suffocation rather than a hanging drop. His burial was executed with deliberate gentleness."',
        prov: 'Dr P. V. Glob, The Bog People: Iron Age Man Preserved (1950).',
      },
      {
        tag: 'Source B • Roman Historian on Germanic Tribes',
        quote:
          '"Cowards, shirkers, and those guilty of unnatural vices are plunged into the mire of the bog, with a wicker hurdle pressed down over them to hide their shame. But to their great deities, especially Nerthus (Mother Earth), the tribes sacrifice human victims at the turn of winter into spring to ensure the fertility of the crops and a plentiful autumn harvest."',
        prov: 'Tacitus, Roman historian, Germania, Section 12 & 40 (c. 98 AD).',
      },
      {
        tag: 'Source C • Forensic Pathology Autopsy',
        quote:
          '"Microscopic analysis of the stomach and intestines revealed no meat, fresh green vegetables, or fruit. His final meal, consumed 12 to 24 hours before death, consisted entirely of a porridge or gruel made from cultivated barley, seeds of pale persicaria, and wild weeds (gold-of-pleasure and knotweed). Such winter weed seeds indicate he was executed in late winter or early spring before the spring thaw."',
        prov: 'Dr H. Christiansen, Copenhagen Forensic Institute Official Autopsy (1951).',
      },
    ],

    p1Questions: [
      '1. [Recall] What clothing and items was the Tollund Man wearing when uncovered in the Danish peat bog?',
      "2. [Inference] What does Dr Glob's description in Source A of his facial expression and posture suggest about his death?",
      '3. [Cross-Examination] According to Tacitus in Source B, what were the two distinct reasons why Germanic tribes put people into bogs?',
      '4. [Pathological Evidence] How does the analysis of his last meal in Source C support the theory that he was sacrificed at a specific time of year?',
      '5. [Forensic Verdict] Based on all three sources, do you conclude he was an executed criminal or a sacred religious offering? Explain.',
    ],

    p2Title: "The Coroner's Inquest: Murder vs Sacred Offering",
    p2Sub: 'Enquiry: Evaluating contradictory forensic clues to deliver a historical verdict.',

    matrixTitle: 'Part 1: Forensic Evidence Matrix (Evaluating the Clues)',
    matrixCols: [
      'The Accusation: Criminal Execution',
      'The Sacred Theory: Divine Sacrifice to Mother Earth',
      "Coroner's Evaluation",
    ],
    matrixRows: [
      [
        '<strong>The Braided Noose:</strong> Found around his neck with a tight slip-knot. Roman accounts describe hanging and strangulation as capital punishment for cowards and deserters.',
        '<strong>Gentle Arrangement:</strong> His eyes and mouth were reverently closed post-mortem. A brutal execution would leave a body dumped carelessly, not peacefully tucked in bed-like repose.',
        'Suggests execution was ritualistic and solemn rather than punitive revenge.',
      ],
      [
        '<strong>Stripped of Clothing:</strong> He had no tunic or trousers, which criminals were stripped of before execution in ancient customary law.',
        '<strong>Expensive Pointed Cap & Belt:</strong> He was allowed to keep high-status sheepskin headgear. Slaves and disgraced criminals were denied status symbols.',
        'Indicates special ceremonial status during his final hours.',
      ],
      [
        '<strong>Winter Weed Diet:</strong> Gruel contained noxious, bitter wild seeds that tasted terrible, suggesting punishment or starvation rations.',
        '<strong>Ritual Winter Gruel:</strong> Special ceremonial meal consumed at the Spring Equinox festival to plead with Mother Earth for summer crops.',
        "Strongly aligns with Tacitus's description of spring sacrifices to Nerthus.",
      ],
    ],

    essayPrompt: "Part 2: Extended Writing — The Official Coroner's Historical Verdict (15 Mins)",
    essayQuestion:
      'Deliver a formal historical verdict: <em>"Was the Tollund Man executed as a criminal or sacrificed as a sacred gift to the gods?"</em>',
    connectives: [
      'Consequently',
      'The forensic evidence demonstrates',
      'In stark contrast',
      'Furthermore',
      'Crucially',
    ],
    starter:
      '"Having examined the archaeological evidence from Bjældskovdal bog, I conclude that the Tollund Man was most likely..."',

    plenaryItems: [
      '1. In which country was the Tollund Man discovered in 1950?',
      '2. What natural substance preserved his body for 2,400 years?',
      '3. What was found tied tightly around his neck?',
      '4. Which Roman historian wrote about ancient Germanic tribes?',
      '5. Name the Germanic earth goddess associated with spring sacrifices.',
      '6. Did the autopsy show any meat in his stomach? (Yes/No)',
      '7. What season does his last meal of weed seeds point towards?',
      '8. Were his neck vertebrae broken by a violent drop? (Yes/No)',
      '9. What headwear was he wearing when found?',
      '10. Is it proven beyond all doubt whether he was murdered or sacrificed?',
    ],
    invertedKey:
      '[CORONER KEY] 1. Denmark | 2. Sphagnum peat moss / acid bog water | 3. Braided oxhide rope noose | 4. Tacitus | 5. Nerthus (Mother Earth) | 6. No (gruel only) | 7. Late winter / early spring | 8. No (died of suffocation) | 9. Pointed sheepskin cap | 10. No (historical balance of probability favors ritual sacrifice)',
  },

  // 2. Year 7 - Black Death in Eyam
  {
    id: 'yr7_eyam_plague',
    title: 'The Black Death in Eyam: The Plague Village',
    subtitle: 'Period 1 Forensic Investigation • Moral Courage or Futile Sacrifice?',
    yearLabel: 'Year 7 (Key Stage 3)',
    specLabel: 'KS3 Thematic Enquiry: Public Health & Society',
    headerColor: '#881337',
    accentColor: '#e11d48',
    tagColor: '#be123c',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons',
    pdfFileName: 'standalone_cover_yr7_eyam_plague.pdf',
    driveFolders: ['Year 7', 'Year 7\\Medieval England'],
    driveTitle: 'Year 7 Emergency Cover - The Black Death in Eyam (Double Period).pdf',

    p1Context:
      '<strong>Historical Setting (September 1665 — Derbyshire Dales):</strong> While the Great Plague was devastating London, a merchant package containing damp cloth was delivered to the remote Derbyshire lead-mining village of Eyam. The cloth was ordered by journeyman tailor George Viccars. Within days of hanging the damp fabric near his hearth to dry, flea bites broke out across his neck and he died in agony. As pestilence spread through the stone cottages, the newly appointed Anglican rector, William Mompesson, and the ejected Puritan minister, Thomas Stanley, united to make an extraordinary moral plea: to save neighboring towns like Sheffield, Bakewell, and Chatsworth, Eyam would seal itself off completely from the outside world.',

    sources: [
      {
        tag: 'Source A • Rector William Mompesson',
        quote:
          '"We are now surrounded by pestilence. My dear flock and I have resolved that none shall pass our boundary stones. The Earl of Devonshire has graciously promised to supply food and medicine, which will be left at appointed rocks on the perimeter. We leave our coins submerged in running water and vinegar to disinfect them. If we die, we die alone, that thousands in the county may be spared."',
        prov: 'Rev. William Mompesson, Letter to Sir George Savile (November 1665).',
      },
      {
        tag: 'Source B • Parish Mortality Register',
        quote:
          '"September 1665 to October 1666: Total village population at outbreak: approximately 350 souls. Total recorded burials: 260. Mortality rate: 74%. In one horrific week in August 1666, Elizabeth Hancock buried her husband and all six of her children with her own hands in a nearby field, dragging their corpses with bedsheets as neighbours fled."',
        prov: 'Eyam Parish Burial Ledger & Field Monument Records (1666).',
      },
      {
        tag: 'Source C • Modern Epidemiological Assessment',
        quote:
          '"The self-imposed quarantine (cordon sanitaire) was an act of extraordinary civic heroism that worked. Not a single outbreak of bubonic plague was recorded in Bakewell, Sheffield, or Chesterfield during 1666. However, by trapping the healthy indoors alongside flea-infested family members, the quarantine drastically increased the mortality rate inside Eyam itself."',
        prov: 'Professor John Kelly, The Great Mortality: Environmental Epidemiology (2006).',
      },
    ],

    p1Questions: [
      '1. [Recall] How did the bubonic plague physically arrive in the village of Eyam in September 1665?',
      '2. [Inference] What clever scientific technique did villagers use at boundary stones to prevent money from transmitting infection?',
      "3. [Statistical Analysis] According to Source B, what percentage of Eyam's population perished during the 14-month quarantine?",
      '4. [Epidemiological Impact] What dual effect did the quarantine have according to the modern assessment in Source C?',
      '5. [Historical Empathy] Why did ordinary villagers agree to stay inside Eyam when they knew it almost guaranteed their death?',
    ],

    p2Title: 'The Historical Verdict: Heroism vs Tragedy in Eyam',
    p2Sub:
      'Enquiry: Was the self-imposed quarantine a triumphant medical victory or an agonizing catastrophe?',

    matrixTitle: 'Part 1: The Quarantine Analytical Matrix',
    matrixCols: [
      'The Case for Civic Heroism',
      'The Case for Agonizing Tragedy',
      'Historical Significance',
    ],
    matrixRows: [
      [
        '<strong>Saved the Region:</strong> Stopped plague reaching Sheffield (a major industrial market town) and Chatsworth estate.',
        '<strong>Internal Death Trap:</strong> Forced uninfected children to sleep in the same stone rooms as dying, flea-covered relatives.',
        'Shows moral courage overriding the primal instinct of individual survival.',
      ],
      [
        '<strong>Religious Unity:</strong> Anglican Mompesson and Puritan Stanley set aside fierce civil war religious hatred to lead together.',
        '<strong>Family Extinction:</strong> Entire family lineages (e.g. the Sydalls: 7 dead, 1 survivor) were wiped out in weeks.',
        'Demonstrates community cohesion in the face of medieval biological terror.',
      ],
      [
        '<strong>Outdoor Church Services:</strong> Mompesson held church services in Cucklett Delf ravine, spacing families apart to limit airborne miasma.',
        '<strong>Traumatic Isolation:</strong> Villagers watched their own children die without medical care or comfort from the outside world.',
        'Early intuitive understanding of social distancing and respiratory transmission.',
      ],
    ],

    essayPrompt: 'Part 2: Extended Writing — Evaluating the Sacrifice of Eyam (15 Mins)',
    essayQuestion:
      'Write a balanced historical assessment answering: <em>"Was the self-imposed quarantine of Eyam a triumph of human selflessness or an avoidable tragedy?"</em>',
    connectives: [
      'Consequently',
      'As a direct result',
      'In stark contrast',
      'Crucially',
      'On the other hand',
    ],
    starter:
      '"The sacrifice made by the people of Eyam in 1665 can be viewed both as an extraordinary act of heroism and an agonizing human tragedy..."',

    plenaryItems: [
      '1. In what year did the plague arrive in Eyam?',
      '2. What item of trade carried the plague fleas to Eyam?',
      '3. Who was the rector who organized the village quarantine?',
      '4. What liquid did villagers soak their coins in to disinfect them?',
      "5. Name the nearby industrial city saved by Eyam's quarantine.",
      "6. Approximately what percentage of Eyam's villagers died?",
      '7. Where did rector Mompesson hold outdoor church services to space villagers apart?',
      '8. Did the plague spread from Eyam into Bakewell or Sheffield? (Yes/No)',
      '9. Name the mother who buried her husband and six children in eight days.',
      '10. What scientific term is used for a protective quarantine perimeter?',
    ],
    invertedKey:
      '[TEACHER KEY] 1. 1665 | 2. Damp cloth package from London | 3. Rev. William Mompesson | 4. Vinegar | 5. Sheffield | 6. 74% (approx. 260 of 350) | 7. Cucklett Delf (a natural limestone ravine) | 8. No (quarantine succeeded) | 9. Elizabeth Hancock | 10. Cordon sanitaire',
  },

  // 3. Year 8 - Great Fire of London
  {
    id: 'yr8_great_fire',
    title: 'The Great Fire of London (1666)',
    subtitle: 'Period 1 Forensic Investigation • Eyewitness Accounts vs Scapegoats',
    yearLabel: 'Year 8 (Key Stage 3)',
    specLabel: 'KS3 History: Early Modern Britain & Society',
    headerColor: '#c2410c',
    accentColor: '#f97316',
    tagColor: '#ea580c',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons',
    pdfFileName: 'standalone_cover_yr8_great_fire.pdf',
    driveFolders: ['Year 8', 'Year 8\\Early Modern World'],
    driveTitle: 'Year 8 Emergency Cover - The Great Fire of London (Double Period).pdf',

    p1Context:
      "<strong>Historical Setting (2–6 September 1666):</strong> After an exceptionally dry summer, a spark from an oven in Thomas Farriner's bakery in Pudding Lane ignited dry brushwood shortly after midnight. London within the medieval Roman walls was a tinderbox: houses were built of timber, coated in waterproof tar, and leaned so close across narrow streets that opposite top floors almost touched. Stored along the Thames wharves were barrels of oil, pitch, brandy, and hemp. Driven by a violent east wind, flames engulfed the city for four days, destroying 13,200 houses, 87 churches, and the great Gothic cathedral of St Paul's.",

    sources: [
      {
        tag: "Source A • Samuel Pepys' Eyewitness Diary",
        quote:
          '"I went down to the waterside and there saw a lamentable fire. Poor people staying in their houses as long as the very fire touched them, then flinging their goods into the river. I met the Lord Mayor, Sir Thomas Bloodworth, crying like a fainting woman: \'Lord, what can I do? I am spent! People will not obey me. I have been pulling down houses, but the fire overtakes us faster than we can do it.\' He left to refresh himself."',
        prov: 'Samuel Pepys, Naval Administrator, Diary Entry (2 September 1666).',
      },
      {
        tag: 'Source B • Official London Gazette Dispatch',
        quote:
          '"The fire raged with such violent fury that nothing could stop it but the blowing up of houses with gunpowder by order of His Majesty the King and the Duke of York. The ancient city of London is laid in ashes, but through the infinite mercy of God, scarcely ten persons have perished in this tremendous calamity, though hundreds of thousands are homeless in Moorfields."',
        prov: 'The London Gazette, Official Government Notice, Issue 85 (September 1666).',
      },
      {
        tag: 'Source C • Parliamentary Committee Inquest',
        quote:
          '"The populace, crazed by panic, immediately suspected a foreign Papist (Catholic) plot. Frenchmen and Dutchmen were dragged into the street and beaten. One Robert Hubert, a crippled French watchmaker, was arrested. Though completely insane and unable to walk into London until two days after the fire began, he confessed to being an agent of the Pope and was hanged at Tyburn."',
        prov: 'Report of the Parliamentary Committee of Inquiry into the Causes of the Fire (1667).',
      },
    ],

    p1Questions: [
      '1. [Recall] In whose shop and street did the Great Fire of London officially break out?',
      "2. [Inference] What does Samuel Pepys' account in Source A reveal about the leadership of Lord Mayor Bloodworth?",
      '3. [Military Mechanics] What drastic military tactic was used in Source B to create firebreaks and finally stop the inferno?',
      '4. [Historical Evaluation] Why did ordinary Londoners immediately blame French Catholics (Source C) rather than their own city architecture?',
      "5. [Source Utility] How reliable is Robert Hubert's confession in Source C, and why did the government execute him anyway?",
    ],

    p2Title: 'Architecture vs Paranoia: Explaining the Catastrophe',
    p2Sub:
      'Enquiry: Why did the Great Fire spread so catastrophically, and why was a scapegoat needed?',

    matrixTitle: 'Part 1: Fact vs Scapegoating Matrix',
    matrixCols: [
      'Structural / Environmental Reality',
      'The Paranoid Scapegoat Myth',
      'Historical Assessment',
    ],
    matrixRows: [
      [
        '<strong>Drought & Gale Wind:</strong> Unbroken drought since July dried timber; violent easterly gale fanned flames westward.',
        '<strong>"French Catholic Plot":</strong> Rumours spread that Catholic conspirators threw fireballs into windows to destroy Protestant England.',
        'Shows how extreme trauma causes societies to blame foreign enemies rather than natural flaws.',
      ],
      [
        '<strong>Flammable Wharf Warehouses:</strong> Thames warehouses stored pitch, hemp, tar, gunpowder, and spirits.',
        '<strong>"Dutch Sabotage":</strong> England was fighting the Second Anglo-Dutch War; citizens assumed Dutch agents invaded.',
        'Reflects wartime paranoia amplifying domestic civilian terror.',
      ],
      [
        '<strong>Hesitant Leadership:</strong> Lord Mayor Bloodworth refused to order gunpowder demolitions early fearing lawsuits from landlords.',
        '<strong>"Hubert\'s Confession":</strong> Insane French watchmaker Robert Hubert confessed under pressure despite having no alibi.',
        'Hubert was executed as a political scapegoat to calm public anger.',
      ],
    ],

    essayPrompt: 'Part 2: Extended Writing — Causes and Consequences of the Fire (15 Mins)',
    essayQuestion:
      'Write a structured explanation: <em>"Explain why the Great Fire of London caused such catastrophic physical destruction, and why foreign scapegoats were blamed."</em>',
    connectives: [
      'Consequently',
      'As a direct consequence',
      'In stark contrast',
      'Crucially',
      'Furthermore',
    ],
    starter:
      '"The catastrophic destruction of London in September 1666 was primarily caused by flammable architecture, drought, and indecisive leadership..."',

    plenaryItems: [
      '1. On what date did the Great Fire of London begin?',
      '2. In which street was the bakery where the fire started?',
      '3. Name the baker who owned the oven.',
      '4. Which famous diarist buried his cheese and wine in his garden during the fire?',
      '5. Who was the indecisive Lord Mayor criticized by Pepys?',
      '6. What weapon was used to blow up houses to create firebreaks?',
      '7. Which famous Gothic cathedral was completely destroyed?',
      '8. What religious group was blamed by the public for deliberately starting the fire?',
      '9. Name the French watchmaker who was falsely executed for the fire.',
      "10. Which famous architect was appointed to design the new St Paul's Cathedral?",
    ],
    invertedKey:
      "[TEACHER KEY] 1. 2 September 1666 | 2. Pudding Lane | 3. Thomas Farriner | 4. Samuel Pepys | 5. Sir Thomas Bloodworth | 6. Gunpowder | 7. Old St Paul's Cathedral | 8. Roman Catholics (Papists) | 9. Robert Hubert | 10. Sir Christopher Wren",
  },

  // 4. Year 8 - Matthew Hopkins: The Witchfinder General (1645)
  {
    id: 'yr8_witchfinder_general',
    title: 'Matthew Hopkins: The Witchfinder General',
    subtitle: 'Period 1 Forensic Investigation • Religious Zealot or Ruthless Conman?',
    yearLabel: 'Year 8 (Key Stage 3)',
    specLabel: 'KS3 History: Superstition, Civil War Chaos & Society (1645)',
    headerColor: '#4c1d95',
    accentColor: '#7c3aed',
    tagColor: '#5b21b6',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons',
    pdfFileName: 'standalone_cover_yr8_witchfinder_general.pdf',
    driveFolders: ['Year 8', 'Year 8\\Early Modern World', 'Year 8\\Emergency Cover'],
    driveTitle: 'Year 8 Emergency Cover - Matthew Hopkins Witchfinder General (Double Period).pdf',

    p1Context:
      "<strong>Historical Setting (The English Civil War & East Anglia, 1645–1647):</strong> In the summer of 1645, England was torn apart by the Civil War between King Charles I and Parliament. Normal royal courts of law broke down, travel was perilous, and puritan religious anxiety reached fever pitch. Into this power vacuum stepped Matthew Hopkins, the twenty-five-year-old son of a Suffolk clergyman. Calling himself the 'Witchfinder General' (a completely invented title with zero legal authority), Hopkins and his associate John Stearne offered their services to fearful East Anglian town councils. For substantial fees—often £20 or more per town (more than a labourer earned in a year)—Hopkins pledged to root out witches using sleep deprivation, 'witch pricking' with spring-loaded needles, and discovering 'Devil's marks'. In just fourteen months, Hopkins condemned more than 300 innocent women and men to the gallows—more than all English witch trials combined over the previous century.",

    sources: [
      {
        tag: "Source A • Matthew Hopkins' Defense Pamphlet",
        quote:
          '"I have been charged with extorting vast sums of money from poor parishes, and that I gain twenty pounds a town. I answer: I never went to any town unless called and invited by the local magistrates. Furthermore, I take but twenty shillings for my travel, horse-meat, and upkeep, with my associate. As for torture, we strictly forbid it. We only cause the suspected witch to sit upon a stool and watch her for twenty-four hours to see if her imps or familiars (in the likeness of cats, dogs, or toads) come to suckle at her secret teats."',
        prov: 'Matthew Hopkins, The Discovery of Witches: In Answer to Several Queries (London, May 1647).',
      },
      {
        tag: 'Source B • Puritan Minister Denouncing Hopkins',
        quote:
          '"Every old woman with a wrinkled face, a furred brow, a hairy lip, a gobber tooth, a squint eye, or a squeaking voice is pronounced a witch by this wretched impostor. He terrifies simple folk with talk of Satan while draining the parish treasury of gold. He keeps poor starving wretches awake for four days and nights without food or rest, walking them back and forth upon bare feet until their minds wander, and then he writes down their delirious babbling as willing confessions made to Lucifer."',
        prov: 'Reverend John Gaule, Puritan Minister of Great Staughton, Select Cases of Conscience Touching Witches (1646).',
      },
      {
        tag: 'Source C • Official Court Deposition of Elizabeth Clarke',
        quote:
          '"The said Elizabeth Clarke, an eighty-year-old one-legged widow of Manningtree, was watched for three nights by Hopkins and four searchers. Upon the third night of continuous watching without sleep, she confessed that Satan visited her in the shape of a white dog named Jarmara, followed by an imp like a black cat named Vinegar Tom. She admitted giving suck to these familiars from a fleshy mark upon her shoulder. Two days later, at Chelmsford Assizes, she was hanged alongside eighteen other women."',
        prov: 'The Examination of Elizabeth Clarke before Sir Harbottle Grimston, Justice of the Peace (Essex, March 1645).',
      },
    ],

    p1Questions: [
      '1. [Recall] In Source A, what reasons does Matthew Hopkins give to defend himself against claims of greed and torture?',
      '2. [Inference] In Source B, what physical characteristics does Reverend Gaule say Hopkins used to accuse innocent elderly women?',
      '3. [Cross-Examination] Contrast Source A and Source B: How do Hopkins and Gaule completely disagree over the practice of "watching"?',
      "4. [Psychological Forensic] In Source C, what condition was Elizabeth Clarke in when she confessed to seeing 'Vinegar Tom', and why is this unreliable?",
      '5. [Historical Judgement] Why did the chaos of the English Civil War (1642–1649) allow a self-appointed fraud like Hopkins to operate unchecked?',
    ],

    p2Title: "The Witchfinder's Inquest: Religious Zealot vs Ruthless Conman",
    p2Sub:
      'Enquiry: Evaluating contradictory forensic evidence to deliver a verdict on Matthew Hopkins.',

    matrixTitle: 'Part 1: The Witchfinder Analytical Matrix (Evaluating the Motives)',
    matrixCols: [
      'The "Puritan Zealot" Argument (Sincere Belief)',
      'The "Ruthless Extortionist" Argument (Greed & Fraud)',
      "Historian's Evaluation",
    ],
    matrixRows: [
      [
        '<strong>Scriptural Obligation:</strong> Hopkins quoted Exodus 22:18 ("Thou shalt not suffer a witch to live") and King James I’s <em>Daemonologie</em>, genuinely fearing the Devil was subverting England.',
        '<strong>Vast Financial Profit:</strong> Charged impoverished towns extortionate fees (£23 from Aldeburgh, equivalent to 10% of their annual tax revenue) during a national crisis.',
        'Hopkins accumulated huge wealth in 14 months, far exceeding any religious stipend.',
      ],
      [
        '<strong>No Physical Bloodshed (in Theory):</strong> English law banned the rack; Hopkins avoided physical cutting, using "watching" (sleep deprivation) and "swimming" (ducking in water).',
        '<strong>Torture by Exhaustion:</strong> Continuous sleep deprivation for 72+ hours induces severe hallucinations, forcing exhausted victims to confess to anything to stop the ordeal.',
        'The "non-violent" methods were psychologically brutal and scientifically guaranteed false confessions.',
      ],
      [
        '<strong>Local Community Paranoia:</strong> Villagers repeatedly invited Hopkins because neighbours genuinely accused eccentric, lonely, or impoverished women of cursing livestock.',
        '<strong>Predatory Manipulation:</strong> Targeted vulnerable, friendless widows without family or legal counsel who could not defend themselves in court.',
        'Preyed on preexisting rural feuds, weaponizing neighbourly suspicion for personal fame and profit.',
      ],
    ],

    essayPrompt: 'Part 2: Extended Writing — The Historical Verdict on Matthew Hopkins (15 Mins)',
    essayQuestion:
      'Explain: <em>"Was Matthew Hopkins a sincere religious crusader combating evil, or a ruthless conman profiting from the terror of the English Civil War?"</em>',
    connectives: [
      'Consequently',
      'As a direct result',
      'In stark contrast',
      'Crucially',
      'Furthermore',
    ],
    starter:
      '"While Matthew Hopkins justified his campaign through puritan religious zeal, the historical evidence overwhelmingly proves he was a predatory opportunist who profited from wartime chaos..."',

    plenaryItems: [
      '1. What official-sounding title did Matthew Hopkins invent for himself in 1645?',
      '2. Which English national conflict (1642–1649) broke down normal royal law courts, allowing Hopkins to operate?',
      '3. In which region of eastern England (Suffolk, Essex, Norfolk) did Hopkins conduct his trials?',
      "4. What brutal, non-physical interrogation technique did Hopkins call 'watching'?",
      '5. What name was given to demonic animal spirits (like black cats or toads) believed to serve witches?',
      '6. What was the name of the blunt, spring-loaded needle tool used to test for numb spots on the skin?',
      '7. Name the brave Puritan minister from Great Staughton who publicly denounced Hopkins in 1646.',
      '8. Approximately how much money did Hopkins charge towns for his services?',
      "9. Approximately how many people were executed as a result of Hopkins' investigations in 14 months?",
      "10. In what year did Matthew Hopkins publish his defense pamphlet 'The Discovery of Witches' before his death?",
    ],
    invertedKey:
      '[TEACHER KEY] 1. The Witchfinder General | 2. The English Civil War | 3. East Anglia | 4. Sleep deprivation (walking on stools) | 5. Familiars (or imps) | 6. Witch pricker (retractable needle) | 7. Reverend John Gaule | 8. Up to £20–£23 per town | 9. Over 300 people | 10. 1647',
  },

  // 5. Year 9 - The Christmas Truce of 1914
  {
    id: 'yr9_christmas_truce',
    title: 'The Christmas Truce of 1914',
    subtitle: 'Period 1 Forensic Investigation • Archival Reality vs Popular Romantic Myth',
    yearLabel: 'Year 9 (Key Stage 3)',
    specLabel: 'KS3 History: The First World War (Trench Warfare)',
    headerColor: '#881337',
    accentColor: '#d97706',
    tagColor: '#92400e',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?unit=great_war&view=lessons',
    pdfFileName: 'standalone_cover_yr9_christmas_truce.pdf',
    driveFolders: ['Year 9', 'Year 9\\The Great War'],
    driveTitle: 'Year 9 Emergency Cover - The Christmas Truce of 1914 (Double Period).pdf',

    p1Context:
      '<strong>Historical Setting (Winter 1914):</strong> By mid-December 1914, the initial war of movement had ground to an exhausted halt. A 450-mile continuous line of crude, waterlogged trenches stretched across Flanders and northern France. In many sectors—particularly around the Ypres Salient, Armentières, and Ploegsteert Wood—opposing trenches were situated less than 80 yards apart. On Christmas Eve, German soldiers placed small, lit fir trees (<em>Weihnachtsbäume</em>) on their parapets and began singing carols. What followed was a spontaneous cessation of combat across roughly two-thirds of the British line.',

    sources: [
      {
        tag: 'Source A • British Infantryman',
        quote:
          "\"A German shouted: 'A merry Christmas to you, English!' We shouted back: 'Same to you, Fritz, but don't bring your sausage over here!' On Christmas morning, we met in No Man's Land, shook hands, exchanged bully beef and plum pudding for German cigars, and helped each other bury our dead comrades who had lain between the trenches.\"",
        prov: 'Private Frank Richards, 2nd Royal Welch Fusiliers, near Frelinghien (1914).',
      },
      {
        tag: 'Source B • British High Command',
        quote:
          '"The Commander of the Army Corps directs that such friendly communication with the enemy is strictly forbidden. It destroys the offensive spirit in all ranks and breeds dangerous apathy. Friendly relations with the enemy, unofficial armistices, and visits to their trenches are absolutely prohibited and must be dealt with by immediate court-martial."',
        prov: 'General Sir Horace Smith-Dorrien, Confidential Memo to British II Corps (Dec 1914).',
      },
      {
        tag: 'Source C • German Officer',
        quote:
          '"A Scotsman appeared with a football, kicked it out of their trench, and soon a brisk game developed. We marked the goals with our caps in the frozen mud. We Saxon troops played against the Seaforth Highlanders. The game ended 3–2 in our favor, until an officer arrived and ordered us back into our trenches before the artillery fired."',
        prov: 'Leutnant Johannes Niemann, 133rd Royal Saxon Regiment, near Saint-Yvon (1914).',
      },
    ],

    p1Questions: [
      "1. [Recall] According to Source A, what food and supplies did British and German soldiers exchange in No Man's Land?",
      '2. [Inference] What solemn humanitarian duty did opposing troops cooperate on before Christmas afternoon?',
      "3. [Contrast] How does General Smith-Dorrien's directive in Source B directly contradict the frontline behavior in Sources A and C?",
      '4. [Historical Explanation] Why were army high commands terrified that unofficial holiday truces would ruin the war effort?',
      "5. [Utility Assessment] Why are personal soldiers' letters like Source A valuable to historians, yet limited in representing the entire Western Front?",
    ],

    p2Title: 'The Christmas Truce: Myth vs Historical Reality',
    p2Sub: 'Enquiry: Why did the truce happen in 1914, but never repeat in 1915, 1916, or 1917?',

    matrixTitle: 'Part 1: Fact vs Myth Matrix (Cross-Examining the Romantic Legend)',
    matrixCols: [
      'Popular Modern Myth',
      'Archival Reality (What Actually Happened)',
      'Historical Significance',
    ],
    matrixRows: [
      [
        '<strong>Myth 1: The Whole Front Stopped</strong><br>"Every soldier from the sea to Switzerland laid down arms."',
        '<strong>Strictly Localized:</strong> Occurred in roughly two-thirds of the British sector. French and Belgian troops largely refused to fraternise because German armies occupied their soil.',
        'Proves the truce depended on local proximity and regional Saxon/British temperament.',
      ],
      [
        '<strong>Myth 2: Organised 90-Minute Football Match</strong><br>"Full tournaments took place with referees and goals."',
        '<strong>Makeshift Kickabouts:</strong> No formal matches or regulation pitches existed. Men kicked tin cans or bundles of straw on shell-pocked mud until punctured by barbed wire.',
        'Demonstrates a spontaneous human desire for recreation across enemy lines.',
      ],
      [
        '<strong>Myth 3: Soldiers Refused to Fight Again</strong><br>"The armies made peace and mutinied against generals."',
        '<strong>Routine Resumption of Combat:</strong> By 26–27 December, rotational reliefs took over and artillery opened fire. Both sides returned to duty; zero permanent mutinies occurred in 1914.',
        'Shows the truce was an informal holiday pause, not a revolutionary rebellion.',
      ],
    ],

    essayPrompt: 'Part 2: Extended Writing Challenge (15 Mins)',
    essayQuestion:
      'Explain: <em>"Why was the Christmas Truce possible in December 1914, but never occurred again in subsequent years of the war?"</em>',
    connectives: [
      'Consequently',
      'As a direct result',
      'In stark contrast',
      'Crucially',
      'Furthermore',
    ],
    starter:
      '"In 1914, the truce was possible because the war of attrition had not yet hardened into total hatred and the \'live and let live\' mindset still existed. However, by December 1915..."',

    plenaryItems: [
      '1. In which month and year did the Christmas Truce occur?',
      '2. What small festive objects did German soldiers place on their parapets?',
      "3. Name the German carol sung on Christmas Eve (meaning 'Silent Night').",
      '4. Which British corps commander issued strict orders banning fraternisation?',
      '5. Did French and Belgian soldiers join the truce widely? (Yes/No)',
      '6. What makeshift object did soldiers kick when footballs were missing?',
      '7. What weapon was introduced at 2nd Ypres in April 1915 that hardened hatred?',
      '8. What military punishment was threatened for men visiting enemy trenches?',
      '9. By what dates had combat generally resumed along the line?',
      '10. Did the Christmas Truce end the war early? (Yes/No)',
    ],
    invertedKey:
      '[TEACHER KEY] 1. December 1914 | 2. Small fir trees (Weihnachtsbäume) | 3. Stille Nacht | 4. General Sir Horace Smith-Dorrien | 5. No (their territory was occupied) | 6. Tin cans or straw bundles | 7. Poison gas (chlorine) | 8. Court-martial (death penalty risk) | 9. 26–27 December 1914 | 10. No',
  },

  // 6. Year 9 - Bletchley Park
  {
    id: 'yr9_bletchley_park',
    title: 'Codebreakers of Bletchley Park',
    subtitle: 'Period 1 Forensic Investigation • Alan Turing, the Enigma & Ultra Intelligence',
    yearLabel: 'Year 9 (Key Stage 3)',
    specLabel: 'KS3 History: The Second World War & Allied Victory',
    headerColor: '#1e293b',
    accentColor: '#3b82f6',
    tagColor: '#2563eb',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons',
    pdfFileName: 'standalone_cover_yr9_bletchley_park.pdf',
    driveFolders: ['Year 9', 'Year 9\\Post-War Britain'],
    driveTitle: 'Year 9 Emergency Cover - Codebreakers of Bletchley Park (Double Period).pdf',

    p1Context:
      "<strong>Historical Setting (Station X, Buckinghamshire, 1939–1945):</strong> Throughout World War II, the German Wehrmacht, Luftwaffe, and U-boat fleets encrypted secret radio dispatches using the electro-mechanical Enigma cipher machine. With three or four interchangeable rotors and a front plugboard, the machine produced 158 quintillion (158,962,555,217,826,360,000) possible daily settings. The German High Command considered it mathematically unbreakable. At Bletchley Park, a Victorian country estate 50 miles north of London, the British government gathered 10,000 mathematicians, chess champions, linguists, and Wrens (Women's Royal Naval Service). Led by Alan Turing and Gordon Welchman, they built the world's first electronic data-processing machines to break Enigma.",

    sources: [
      {
        tag: "Source A • Alan Turing's Top Secret Memorandum",
        quote:
          "\"The Enigma cipher cannot be broken by human handwriting because the rotor settings change with every keystroke and are reset every midnight. We must fight mechanical encryption with mechanical decryption. Our 'Bombe' machine mimics thirty Enigma machines simultaneously. By testing German operational habits—such as their routine inclusion of weather words ('Wettervorhersage') and 'Heil Hitler' at the end of messages—the machine eliminates millions of impossible rotor combinations in minutes.\"",
        prov: 'Alan Turing, Confidential Memorandum to Hut 8, Bletchley Park (1940).',
      },
      {
        tag: 'Source B • Recollection of a Woman Codebreaker',
        quote:
          '"People think Bletchley was all Cambridge professors, but over 75% of the staff were young women. We worked eight-hour shifts in freezing wooden huts with blackout curtains nailed shut. We operated the noisy, clattering Bombe machines and sorted millions of intercepted morse-code cards. When Hut 6 decoded the German naval orders locating the battleship Bismarck in May 1941, we weren\'t allowed to cheer. Total secrecy was absolute; my parents died never knowing what I did in the war."',
        prov: 'Jane Fawcett, Wren Bombe Operator at Bletchley Park (Imperial War Museum Interview, 1985).',
      },
      {
        tag: 'Source C • Prime Minister Winston Churchill',
        quote:
          '"To the Director of Bletchley Park: Make sure these codebreakers have everything they require on extreme priority! They are the geese that laid the golden eggs and never cackled. Without the Ultra intelligence that revealed Rommel\'s supply lines in North Africa and warned our Atlantic convoys of U-boat wolfpacks, the Allied victory would have been delayed by at least two to three years at the cost of countless British lives."',
        prov: 'Winston Churchill, Secret Directive to General Staff (November 1941).',
      },
    ],

    p1Questions: [
      '1. [Recall] How many possible daily setting combinations did the German Enigma machine produce?',
      '2. [Technological Innovation] In Source A, what machine did Alan Turing design, and how did it work faster than human brains?',
      '3. [Social History] What percentage of the workforce at Bletchley Park were women according to Source B, and what roles did they perform?',
      "4. [Strategic Impact] According to Winston Churchill in Source C, by how many years did 'Ultra' intelligence shorten World War II?",
      '5. [Secrecy Dilemma] Why were the codebreakers forbidden from acting on every single decoded message (e.g. the Coventry air raid)?',
    ],

    p2Title: 'The Ultra Secret: Mathematics, Deception & Victory',
    p2Sub: 'Enquiry: How did intelligence and deception win the Battle of the Atlantic and D-Day?',

    matrixTitle: 'Part 1: The Strategic Impact Matrix of Bletchley Park',
    matrixCols: [
      'Operational Theater',
      'How Bletchley Park Intelligence Changed the Outcome',
      'Historical Significance',
    ],
    matrixRows: [
      [
        '<strong>Battle of the Atlantic (1941–43):</strong> German U-boat wolfpacks threatened to starve Britain by sinking merchant food and munitions ships.',
        'Hut 8 decoded German naval Enigma keys (Hydra and Shark), allowing Allied convoys to be routed away from submarine patrol lines.',
        'Prevented Britain from being starved into surrendering before America entered the war.',
      ],
      [
        "<strong>North Africa & El Alamein (1942):</strong> General Erwin Rommel's Afrika Korps advanced toward the Suez Canal and Middle Eastern oilfields.",
        "Ultra intercepts pinpointed the exact routes of Axis fuel tankers sailing from Italy, allowing the RAF and Royal Navy to sink Rommel's fuel supply.",
        "Ground Rommel's tanks to a halt, enabling Montgomery's victory at El Alamein.",
      ],
      [
        '<strong>Normandy Landings / D-Day (1944):</strong> Allies needed Hitler to believe the invasion would hit Pas-de-Calais, not Normandy.',
        'Bletchley intercepted internal German dispatches confirming Hitler had fallen for the Operation Fortitude deception and kept panzer divisions in Calais.',
        'Guaranteed the Normandy beachheads were not overwhelmed in the crucial first 48 hours.',
      ],
    ],

    essayPrompt: 'Part 2: Extended Writing — Alan Turing and Strategic Significance (15 Mins)',
    essayQuestion:
      'Write a structured explanation: <em>"Explain the strategic significance of Bletchley Park and Alan Turing to the Allied victory in the Second World War."</em>',
    connectives: [
      'Consequently',
      'As a direct result',
      'In stark contrast',
      'Crucially',
      'Furthermore',
    ],
    starter:
      '"The intelligence produced at Bletchley Park, code-named Ultra, was of decisive importance to the Allied victory because..."',

    plenaryItems: [
      '1. What was the secret name given to Bletchley Park during World War II?',
      '2. Name the German electro-mechanical cipher machine broken by Bletchley Park.',
      '3. Name the British mathematician who designed the Bombe decryption machine.',
      '4. What code-name was given to the top-secret intelligence derived from Enigma?',
      '5. What percentage of the Bletchley Park workforce were women (Wrens)?',
      "6. Which crucial naval battle for Britain's survival was won with the help of Hut 8?",
      '7. What predictable German phrase did codebreakers use as a "crib" to crack daily keys?',
      '8. By how many years did historians estimate Bletchley Park shortened World War II?',
      '9. Did the German military ever realize during the war that Enigma had been cracked? (Yes/No)',
      '10. In which British county is Bletchley Park located?',
    ],
    invertedKey:
      '[TEACHER KEY] 1. Station X | 2. The Enigma machine | 3. Alan Turing | 4. Ultra | 5. Over 75% | 6. The Battle of the Atlantic | 7. "Heil Hitler" or weather reports (Wettervorhersage) | 8. 2 to 3 years | 9. No (they blamed spies and radar) | 10. Buckinghamshire',
  },

  // 7. GCSE - Jack the Ripper & Whitechapel
  {
    id: 'gcse_jack_ripper',
    title: 'Jack the Ripper & Whitechapel (1888)',
    subtitle:
      'Period 1 Forensic Investigation • Edexcel GCSE Paper 1 / Paper 3 Source Utility Masterclass',
    yearLabel: 'GCSE History (Years 10–11)',
    specLabel: 'Edexcel GCSE Paper 1 (Historic Environment: Whitechapel 1870–1900)',
    headerColor: '#881337',
    accentColor: '#991b1b',
    tagColor: '#7f1d1d',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons&unit=edexcel_medicine',
    pdfFileName: 'standalone_cover_gcse_jack_the_ripper.pdf',
    driveFolders: ['Year 11 (GCSE)\\Paper 1 - Medicine Through Time', 'Year 10 (GCSE)'],
    driveTitle:
      'GCSE Emergency Cover - Jack the Ripper Source Utility Masterclass (Double Period).pdf',

    p1Context:
      "<strong>GCSE Specification Context (Whitechapel Historic Environment, Autumn 1888):</strong> Between August and November 1888, an unidentified killer murdered and mutilated five women in Whitechapel (the 'canonical five'). The Metropolitan Police (H Division) faced an impossible policing environment: extreme poverty, dark unlit alleys ('rookeries'), 62 brothels, 200 common lodging houses housing 8,500 transient people a night, and deep immigrant tensions. Forensic science was in its infancy: there was no fingerprinting, blood-typing, or crime-scene photography. The investigation generated hundreds of hoax letters, intense sensationalist press criticism, and the formation of civilian vigilante patrols.",

    sources: [
      {
        tag: 'Source A • The Infamous "Dear Boss" Letter',
        quote:
          '"Dear Boss, I keep on hearing the police have caught me but they wont fix me yet. I am down on whores and I shant quit clipping them till I do get buckled. Grand work the last job was. I gave the lady no time to squeal. How can they catch me now? I love my work and want to start again. Keep this letter back till I do a bit more work, then give it out straight. My knife\'s so nice and sharp I want to get to work right away. Good luck. Yours truly, Jack the Ripper."',
        prov: 'Letter sent to the Central News Agency, London (Received 27 September 1888).',
      },
      {
        tag: 'Source B • Confidential Police Report to the Home Office',
        quote:
          '"The difficulty of tracking the murderer is almost insurmountable. Whitechapel contains hundreds of narrow courts and passages where no light enters. The inhabitants are transient and refuse to give information to police officers, whom they regard with suspicion and hatred. Every night, our men stop and search thousands of individuals in lodging houses, but without the power to detain suspects without evidence, our efforts are thwarted. The sensational articles in the press do immense harm by stirring public panic."',
        prov: 'Sir Charles Warren, Metropolitan Police Commissioner, Memorandum to Home Secretary Matthews (October 1888).',
      },
      {
        tag: 'Source C • Letter from the Whitechapel Vigilance Committee',
        quote:
          '"To the Editor: The police have shown themselves utterly incompetent to protect the women of this district. Sir Charles Warren spends his time drilling constables like soldiers while blood runs in our streets. We have therefore formed our own nightly vigilance patrols of tradesmen and shopkeepers to walk the alleys with whistles and lanterns, and we offer our own reward of £500, which the government cowardly refuses to do."',
        prov: 'George Lusk, Chairman of the Whitechapel Vigilance Committee, Daily Telegraph (October 1888).',
      },
    ],

    p1Questions: [
      '1. [Content] What threats and intentions did the author of Source A communicate to the press?',
      '2. [Environmental Context] According to Commissioner Warren in Source B, what specific environmental conditions in Whitechapel made detective work almost impossible?',
      '3. [Provenance & Motive] Why would Commissioner Warren have a clear motive in Source B to emphasize the difficulty of policing Whitechapel?',
      '4. [Public Confidence] How does Source C reveal a catastrophic breakdown in public trust between local citizens and the Metropolitan Police?',
      '5. [Utility Assessment] Which source is more useful for understanding why H Division failed to catch the killer: Source B or Source C?',
    ],

    p2Title: 'Edexcel GCSE 8-Mark Source Utility Masterclass',
    p2Sub:
      'Exam Technique: How useful are Sources B and C for an enquiry into the challenges faced by police in Whitechapel?',

    matrixTitle: 'Part 1: The COP Criteria Master Framework (Content, Own Knowledge, Provenance)',
    matrixCols: [
      'Component Criteria',
      'Application to Source B (Commissioner Warren)',
      'Application to Source C (George Lusk Vigilance)',
    ],
    matrixRows: [
      [
        '<strong>C - Content & Detail</strong><br>(What accurate clues does it give?)',
        'Details dark rookeries, narrow alleys, lack of legal detention powers, uncooperative populace, press sensationalism.',
        'Details public fury, police military drills, lack of government rewards, formation of amateur citizen patrols.',
      ],
      [
        '<strong>O - Own Knowledge Context</strong><br>(What specific historical facts prove/support it?)',
        "H Division had only 1 constable per 300 residents. No forensic blood-grouping or DNA. Overcrowded dosshouses (Cooney's, 4d a night).",
        'Warren clashed with Home Secretary Matthews. Warren banned bloodhounds after they bit him. Press ridiculed police in Punch cartoons.',
      ],
      [
        '<strong>P - Provenance & Purpose</strong><br>(Who, Why, Audience, and Limitations?)',
        'Written by head of police to government minister. Highly informed official perspective, but defensive: Warren is trying to deflect blame from his leadership.',
        'Written by local builder/tradesman for public newspaper. Highly useful for gauging public terror and vigilantism, but biased against police.',
      ],
    ],

    essayPrompt: 'Part 2: Edexcel GCSE Exam Practice Question (8 Marks — 15 Mins)',
    essayQuestion:
      '<strong>Q3(a) [8 Marks]:</strong> <em>How useful are Sources B and C for an enquiry into the challenges faced by the Metropolitan Police in Whitechapel in 1888?</em>',
    connectives: [
      'Source B is valuable because',
      'From my own knowledge of H Division',
      'However, the utility is limited because',
      'In comparison, Source C provides',
      'Ultimately, both sources are useful because',
    ],
    starter:
      '"Source B is useful for an enquiry into police challenges because it provides an insider perspective on environmental obstacles in Whitechapel..."',

    plenaryItems: [
      '1. Which Metropolitan Police division was responsible for policing Whitechapel?',
      '2. Name the Metropolitan Police Commissioner during the 1888 Autumn of Terror.',
      '3. What was the name given to dark, crime-ridden Victorian slum courtyards?',
      '4. How much did an ordinary "doss-house" bed cost per night in Whitechapel?',
      '5. Name the citizen group formed by George Lusk to patrol the streets.',
      '6. Did police in 1888 have forensic fingerprinting technology? (Yes/No)',
      '7. What was the term for the five agreed victims of Jack the Ripper?',
      '8. In what year did the murders occur?',
      '9. Name the Home Secretary with whom Commissioner Warren constantly argued.',
      '10. How many marks is the Source Utility question worth in Edexcel Paper 1?',
    ],
    invertedKey:
      '[GCSE KEY] 1. H Division | 2. Sir Charles Warren | 3. Rookeries | 4. 4 pence (a "fourpenny dosshouse") | 5. The Whitechapel Vigilance Committee | 6. No (fingerprinting introduced 1901) | 7. The Canonical Five | 8. 1888 | 9. Henry Matthews | 10. 8 marks',
  },

  // 8. GCSE - Bombing of Dresden
  {
    id: 'gcse_dresden_bombing',
    title: 'The Bombing of Dresden (February 1945)',
    subtitle:
      'Period 1 Forensic Investigation • Edexcel GCSE Paper 3 Historical Interpretations Clash',
    yearLabel: 'GCSE History (Years 10–11)',
    specLabel: 'Edexcel GCSE Paper 3 (Historiography & Conflicting Historical Interpretations)',
    headerColor: '#1e3a8a',
    accentColor: '#3b82f6',
    tagColor: '#1e40af',
    qrUrl: 'https://the-history-revision-hub.netlify.app/?view=lessons',
    pdfFileName: 'standalone_cover_gcse_bombing_of_dresden.pdf',
    driveFolders: ['Year 10 (GCSE)\\Paper 3 - Weimar and Nazi Germany', 'Year 11 (GCSE)'],
    driveTitle:
      'GCSE Emergency Cover - The Bombing of Dresden Interpretations Clash (Double Period).pdf',

    p1Context:
      '<strong>GCSE Specification Context (Total War & Historiographical Debate):</strong> On the nights of 13–15 February 1945, 772 RAF Lancaster bombers and 527 USAAF Flying Fortresses dropped 3,900 tons of high-explosive and incendiary bombs on the historic Saxon city of Dresden. The resulting firestorm reached temperatures of 1,000°C, creating hurricane-force winds that sucked victims into the flames and killed an estimated 25,000 people. Dresden had previously escaped major bombing. Historians remain fiercely divided: was Dresden a legitimate military target struck to destroy Nazi communications and aid the advancing Soviet army, or an unnecessary, disproportionate act of terror on civilian refugees?',

    sources: [
      {
        tag: 'Interpretation 1 • The Military Necessity View',
        quote:
          '"Dresden was not simply a cultural treasure house; it was a heavily fortified military and transport hub. It was the major rail junction connecting Berlin, Prague, and the Eastern Front, through which thousands of German troops and panzer reinforcements passed daily to fight the Soviet Red Army. Furthermore, Dresden contained 110 factories employing 50,000 war workers manufacturing poison gas, radar components, and anti-aircraft shells. Destroying Dresden\'s infrastructure directly shortened the war and prevented Germany from counter-attacking."',
        prov: 'Professor Richard Overy, The Bombing War: Europe 1939–1945 (2013).',
      },
      {
        tag: 'Interpretation 2 • The Moral Catastrophe View',
        quote:
          '"The bombing of Dresden was a catastrophe of disproportionate violence that bordered on a war crime. By February 1945, Nazi Germany was already utterly defeated; the war had only twelve weeks to run. Dresden was crowded with hundreds of thousands of terrified civilian refugees fleeing the Red Army. The RAF targeted the historic residential city center with incendiary bombs specifically designed to create a firestorm, rather than precision-bombing the marshalling yards outside the city. It was an exercise in terror, not military necessity."',
        prov: 'Dr A. C. Grayling, Among the Dead Cities: Is the Targeting of Civilians Ever Justified? (2006).',
      },
      {
        tag: "Primary Source • Winston Churchill's Secret Minute",
        quote:
          '"It seems to me that the moment has come when the question of bombing of German cities simply for the sake of increasing the terror, though under other pretexts, should be reviewed. Otherwise we shall come into control of an utterly ruined land. The destruction of Dresden remains a serious query against the conduct of Allied bombing."',
        prov: 'Prime Minister Winston Churchill, Confidential Minute to the Chiefs of Staff (28 March 1945).',
      },
    ],

    p1Questions: [
      '1. [Military Fact] According to Interpretation 1, what two vital military assets made Dresden an important target?',
      '2. [Humanitarian Criticism] According to Interpretation 2, why was the timing and weapon choice (incendiary bombs) morally indefensible?',
      "3. [Eyewitness Leadership] How does Winston Churchill's secret minute in the Primary Source reveal high-level British political anxiety after Dresden?",
      '4. [Historiographical Disagreement] What is the fundamental difference between Overy (Interpretation 1) and Grayling (Interpretation 2)?',
      '5. [Evaluation] Why do two distinguished historians studying the exact same event produce completely opposing historical conclusions?',
    ],

    p2Title: 'Edexcel GCSE Paper 3: Deconstructing Interpretations',
    p2Sub:
      'Exam Technique: Why do historians differ, and how do we evaluate historiographical claims?',

    matrixTitle: 'Part 1: The Interpretations Forensic Clash Matrix',
    matrixCols: [
      'Core Argument',
      'Interpretation 1 (Richard Overy - Military Necessity)',
      'Interpretation 2 (A. C. Grayling - Disproportionate Terror)',
    ],
    matrixRows: [
      [
        '<strong>Main Historical Judgement</strong>',
        'Legitimate military operation to disrupt rail junctions, factories, and support Soviet Red Army advance.',
        'Senseless destruction of a cultural city and civilian refugees when the war was already won.',
      ],
      [
        '<strong>Evidence Selected by Historian</strong>',
        'Focuses on 110 munitions factories, rail timetables, Krupp optical facilities, and Soviet requests for air support at Yalta.',
        'Focuses on residential center targeting, incendiary firestorm mechanics, 25,000 civilian deaths, and refugee crowds.',
      ],
      [
        '<strong>Why the Historians Differ</strong>',
        'Approaches the event through <strong>strategic military operational realism</strong>: war aims, logistics, and total war doctrine.',
        'Approaches the event through <strong>moral philosophy and legal ethics</strong>: proportionality, non-combatant immunity, and humanitarian law.',
      ],
    ],

    essayPrompt: 'Part 2: Edexcel GCSE Paper 3 Exam Practice Question (15 Mins)',
    essayQuestion:
      '<strong>Paper 3 Section B:</strong> <em>Suggest one reason why Interpretations 1 and 2 give different views about the Allied bombing of Dresden in February 1945. (4 Marks)</em>',
    connectives: [
      'The interpretations differ because',
      'Interpretation 1 emphasizes military evidence such as',
      'In contrast, Interpretation 2 focuses upon',
      'The historians give different views because they have consulted different sources, namely',
    ],
    starter:
      '"Interpretations 1 and 2 differ because the historians have chosen to emphasize different aspects of the bombing of Dresden..."',

    plenaryItems: [
      '1. In which month and year did the bombing of Dresden take place?',
      '2. Which two Allied air forces carried out the bombing raids?',
      '3. What catastrophic weather-like phenomenon did the incendiary bombs create?',
      '4. Approximately how many people died in the bombing of Dresden?',
      '5. Name the head of RAF Bomber Command known as "Bomber Harris".',
      '6. What conference of Allied leaders took place just before Dresden where Soviets requested rail disruption?',
      '7. According to Interpretation 1, how many war factories operated in Dresden?',
      '8. According to Interpretation 2, what group of vulnerable people packed the city streets in February 1945?',
      '9. Did Winston Churchill write a secret minute questioning the bombing after Dresden? (Yes/No)',
      '10. How many marks is the "Suggest reasons why interpretations differ" question in Edexcel GCSE Paper 3?',
    ],
    invertedKey:
      '[GCSE KEY] 1. February 1945 | 2. RAF (Royal Air Force) & USAAF (United States Army Air Forces) | 3. A firestorm | 4. Approximately 25,000 | 5. Sir Arthur Harris | 6. The Yalta Conference | 7. 110 factories | 8. Fleeing civilian refugees | 9. Yes | 10. 4 marks',
  },
];

// --------------------------------------------------------------------------
// HTML TEMPLATE GENERATOR
// --------------------------------------------------------------------------
function renderCoverPackHtml(pack, qrDataUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${pack.title} - Standalone Cover Pack</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 11mm 8mm 11mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 8.3pt;
      line-height: 1.30;
    }
    .page {
      width: 100%;
      height: 279mm;
      max-height: 279mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
    }
    .page-last {
      page-break-after: avoid;
      break-after: avoid;
    }

    /* Header Bar */
    .header-bar {
      border-bottom: 2px solid ${pack.headerColor};
      padding-bottom: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-pill {
      display: inline-block;
      background: ${pack.headerColor};
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 2px 7px;
      border-radius: 3px;
      margin-bottom: 2px;
    }
    .header-title {
      font-size: 12.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 1px 0;
      line-height: 1.15;
    }
    .header-sub {
      font-size: 8.2pt;
      font-weight: 700;
      color: #475569;
    }
    .header-qr-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 3px 6px;
      margin-left: 10px;
    }
    .header-qr-box img {
      width: 44px;
      height: 44px;
      display: block;
    }
    .header-qr-label {
      font-size: 5.6pt;
      font-weight: 800;
      color: ${pack.headerColor};
      margin-top: 1px;
    }

    /* Supervisor & Student Strip */
    .supervisor-strip {
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-left: 4px solid #ea580c;
      padding: 4px 8px;
      border-radius: 4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-size: 7.8pt;
    }
    .student-fields {
      display: flex;
      gap: 12px;
      font-weight: 700;
      color: #1e293b;
    }
    .student-line {
      border-bottom: 1px solid #475569;
      display: inline-block;
      width: 110px;
      height: 11px;
      vertical-align: bottom;
    }
    .student-line-sm {
      border-bottom: 1px solid #475569;
      display: inline-block;
      width: 45px;
      height: 11px;
      vertical-align: bottom;
    }
    .supervisor-note {
      color: #9a3412;
      font-weight: 700;
    }

    /* Context Box */
    .context-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid ${pack.accentColor};
      border-radius: 4px;
      padding: 5px 8px;
      margin-bottom: 6px;
      font-size: 7.9pt;
      line-height: 1.34;
    }
    .context-box strong {
      color: ${pack.headerColor};
    }

    /* Sources Grid */
    .sources-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-bottom: 6px;
    }
    .source-card {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-top: 2.5px solid #d97706;
      border-radius: 4px;
      padding: 5px 7px;
      font-size: 7.3pt;
      line-height: 1.28;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .source-tag {
      font-size: 6.3pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #92400e;
      margin-bottom: 2px;
    }
    .source-quote {
      font-family: Georgia, serif;
      color: #1e293b;
      font-style: italic;
      margin-bottom: 3px;
    }
    .source-provenance {
      font-size: 6.1pt;
      color: #78350f;
      border-top: 1px dashed #fde68a;
      padding-top: 2px;
      font-weight: 600;
    }

    /* Questions Container */
    .questions-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 6px 9px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .q-row {
      margin-bottom: 4px;
    }
    .q-text {
      font-weight: 700;
      font-size: 7.8pt;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .q-lines {
      width: 100%;
      height: 13px;
      border-bottom: 1px solid #94a3b8;
      margin-bottom: 2px;
    }

    /* Matrix Table Period 2 */
    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
      font-size: 7.5pt;
      line-height: 1.24;
    }
    .matrix-table th, .matrix-table td {
      border: 1px solid #cbd5e1;
      padding: 3px 6px;
      text-align: left;
      vertical-align: top;
    }
    .matrix-table th {
      background: #f1f5f9;
      font-weight: 800;
      color: #1e293b;
      font-size: 7.7pt;
    }
    .matrix-table td strong {
      color: ${pack.headerColor};
    }

    /* Essay Container */
    .essay-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 4px solid ${pack.headerColor};
      border-radius: 4px;
      padding: 6px 8px;
      margin-bottom: 6px;
    }
    .scaffold-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin: 3px 0 4px 0;
      font-size: 6.8pt;
    }
    .pill {
      background: #fee2e2;
      color: #991b1b;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .essay-ruled-area {
      width: 100%;
      height: 115px;
      background-image: repeating-linear-gradient(transparent, transparent 15px, #cbd5e1 15px, #cbd5e1 16px);
      border-bottom: 1px solid #cbd5e1;
      margin-top: 4px;
    }

    /* Plenary Grid */
    .plenary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 4px;
      padding: 5px 8px;
      font-size: 7.1pt;
      margin-bottom: 4px;
    }
    .plenary-item {
      display: flex;
      gap: 4px;
    }
    .plenary-num {
      font-weight: 800;
      color: #166534;
      min-width: 14px;
    }

    .inverted-key {
      transform: rotate(180deg);
      font-size: 5.5pt;
      color: #64748b;
      text-align: center;
      line-height: 1.2;
      padding-top: 1px;
    }

    /* Page Footers */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      font-size: 6.8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: PERIOD 1 (50 MINS) ==================== -->
  <div class="page">
    <div>
      <div class="header-bar">
        <div>
          <span class="brand-pill">${pack.specLabel} • ${pack.yearLabel}</span>
          <h1 class="header-title">${pack.title}</h1>
          <div class="header-sub">${pack.subtitle}</div>
        </div>
        <div class="header-qr-box">
          <img src="${qrDataUrl}" alt="QR">
          <span class="header-qr-label">DIGITAL APP</span>
        </div>
      </div>

      <div class="supervisor-strip">
        <div class="student-fields">
          <span>Pupil Name: <span class="student-line"></span></span>
          <span>Class: <span class="student-line-sm"></span></span>
          <span>Date: <span class="student-line-sm"></span></span>
        </div>
        <div class="supervisor-note">
          📥 <strong>Cover Notice:</strong> Complete in neat pen. All sheets collected at the bell.
        </div>
      </div>

      <div class="context-box">
        ${pack.p1Context}
      </div>

      <div class="sources-grid">
        ${pack.sources
          .map(
            (s) => `
          <div class="source-card">
            <div>
              <div class="source-tag">${s.tag}</div>
              <div class="source-quote">${s.quote}</div>
            </div>
            <div class="source-provenance">${s.prov}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    <div class="questions-box">
      <div style="font-weight: 800; font-size: 8.1pt; color: ${pack.headerColor}; margin-bottom: 2px;">
        Forensic Comprehension Check (Answer in complete academic sentences):
      </div>
      ${pack.p1Questions
        .map(
          (q, i) => `
        <div class="q-row">
          <div class="q-text">${q}</div>
          <div class="q-lines"></div>
          ${i >= 2 ? '<div class="q-lines"></div>' : ''}
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="page-footer">
      <span>The History Revision Hub • Standalone Emergency Cover Pack (Side 1 of 2)</span>
      <span>Turn over for Period 2: Historiographical Analysis &amp; Extended Writing →</span>
    </div>
  </div>

  <!-- ==================== PAGE 2: PERIOD 2 (50 MINS) ==================== -->
  <div class="page page-last">
    <div>
      <div class="header-bar">
        <div>
          <span class="brand-pill" style="background: ${pack.headerColor};">Period 2 • Historical Verdict &amp; Extended Writing</span>
          <h1 class="header-title">${pack.p2Title}</h1>
          <div class="header-sub">${pack.p2Sub}</div>
        </div>
        <div style="text-align: right; font-size: 7.2pt; color: #64748b; font-weight: 700;">
          ${pack.yearLabel}<br>Department Assessment
        </div>
      </div>

      <div style="font-weight: 800; color: ${pack.headerColor}; font-size: 8.1pt; margin-bottom: 2px;">
        ${pack.matrixTitle}
      </div>
      <table class="matrix-table">
        <thead>
          <tr>
            ${pack.matrixCols.map((c) => `<th>${c}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${pack.matrixRows
            .map(
              (r) => `
            <tr>
              ${r.map((cell) => `<td>${cell}</td>`).join('')}
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>

      <div class="essay-box">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: ${pack.headerColor}; font-size: 8.3pt;">
            ${pack.essayPrompt}
          </strong>
          <span style="font-size: 6.8pt; font-weight: 800; background: #fee2e2; color: #991b1b; padding: 1.5px 5px; border-radius: 3px;">
            Academic Writing
          </span>
        </div>
        <div style="font-size: 7.5pt; color: #334155; margin-top: 1px;">
          ${pack.essayQuestion}
        </div>
        <div class="scaffold-pills">
          <span style="font-weight: 700; color: #475569;">Causal Connectives Bank:</span>
          ${pack.connectives.map((c) => `<span class="pill">${c}</span>`).join('')}
        </div>
        <div style="font-size: 7pt; color: #64748b; font-style: italic;">
          ${pack.starter}
        </div>
        <div class="essay-ruled-area"></div>
      </div>

      <div style="font-weight: 800; color: #166534; font-size: 8.1pt; margin-bottom: 2px;">
        Part 3: 10-Question Knowledge Mastery Check (Self-Assessment)
      </div>
      <div class="plenary-grid">
        <div>
          ${pack.plenaryItems
            .slice(0, 5)
            .map(
              (item) => `
            <div class="plenary-item">${item}</div>
          `,
            )
            .join('')}
        </div>
        <div>
          ${pack.plenaryItems
            .slice(5, 10)
            .map(
              (item) => `
            <div class="plenary-item">${item}</div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="inverted-key">
        ${pack.invertedKey}
      </div>
    </div>

    <div class="page-footer">
      <span>The History Revision Hub • Department Lead • Educational Neutral Edition</span>
      <span>Double Period Complete • Hand sheet directly to Cover Supervisor.</span>
    </div>
  </div>

</body>
</html>
`;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION RUNNER
// --------------------------------------------------------------------------
async function run() {
  const targetPackId = process.argv[2] || 'all';

  console.log('\n=============================================================');
  console.log('📚 Master Standalone Emergency Cover Pack Compilation Pipeline');
  console.log('=============================================================');
  console.log(`Target: ${targetPackId}\n`);

  const packsToBuild =
    targetPackId === 'all'
      ? COVER_PACKS
      : COVER_PACKS.filter((p) => p.id === targetPackId || p.id.includes(targetPackId));

  if (packsToBuild.length === 0) {
    console.error(`❌ No cover packs matched filter: ${targetPackId}`);
    console.log('Available pack IDs:');
    COVER_PACKS.forEach((p) => console.log(`  - ${p.id} (${p.title})`));
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  const compiledPdfs = [];

  for (const pack of packsToBuild) {
    process.stdout.write(`Compiling [${pack.id}] ${pack.title}... `);

    const qrDataUrl = await QRCode.toDataURL(pack.qrUrl, {
      margin: 1,
      width: 90,
      color: { dark: '#1e293b', light: '#ffffff' },
    });

    const html = renderCoverPackHtml(pack, qrDataUrl);
    const pdfPath = path.join(PDFS_DIR, pack.pdfFileName);

    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const spaceReport = await auditPageBudget(page);
    printSpaceAuditReport(spaceReport, '  ');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });

    // Page count audit
    let numPages = 2;
    try {
      const pdf = require('pdf-parse');
      const data = fs.readFileSync(pdfPath);
      const parsed = await pdf(data);
      numPages = parsed.numpages;
    } catch (e) {}

    if (numPages === 2) {
      console.log(`✅ OK (2 pages exact)`);
      compiledPdfs.push({ pack, pdfPath });
    } else {
      console.log(`⚠️ OVERFLOW (${numPages} pages!)`);
    }
  }

  await browser.close();

  // Sync to Google Drive
  console.log('\n-------------------------------------------------------------');
  console.log('☁️  Synchronizing Compiled Standalone Cover Packs to Google Drive');
  console.log('-------------------------------------------------------------');

  let driveSyncCount = 0;
  if (fs.existsSync(DRIVE_ROOT)) {
    // Also create a dedicated All Years emergency folder
    const allYearsEmergencyFolder = path.join(DRIVE_ROOT, 'Emergency Cover Lessons (All Years)');
    if (!fs.existsSync(allYearsEmergencyFolder)) {
      fs.mkdirSync(allYearsEmergencyFolder, { recursive: true });
    }

    for (const { pack, pdfPath } of compiledPdfs) {
      // 1. Copy to specific Year folders
      for (const relFolder of pack.driveFolders) {
        const destDir = path.join(DRIVE_ROOT, relFolder);
        if (fs.existsSync(destDir)) {
          const destFile = path.join(destDir, pack.driveTitle);
          fs.copyFileSync(pdfPath, destFile);
          console.log(`  ✅ Synced to: ${relFolder}\\${pack.driveTitle}`);
          driveSyncCount++;
        }
      }

      // 2. Copy to unified Emergency Cover Lessons (All Years) folder
      const allYearsDest = path.join(allYearsEmergencyFolder, pack.driveTitle);
      fs.copyFileSync(pdfPath, allYearsDest);
      console.log(`  📁 Synced to: Emergency Cover Lessons (All Years)\\${pack.driveTitle}`);
      driveSyncCount++;
    }
    console.log(`\n🎉 Successfully synced ${driveSyncCount} cover pack files to Google Drive!`);
  } else {
    console.log(
      '⚠️ Google Drive not mounted at G:\\My Drive\\AAMX\\Dep File. Skipping drive sync.',
    );
  }

  console.log('\n=============================================================');
  console.log(`🏆 ALL ${compiledPdfs.length} STANDALONE COVER PACKS COMPILED CLEANLY!`);
  console.log('=============================================================\n');
}

run().catch((err) => {
  console.error('Fatal error running cover pack compilation:', err);
  process.exit(1);
});
