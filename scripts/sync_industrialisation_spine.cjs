const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'industrialisation_and_empire', 'data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

const spineData = {
  lesson_1: {
    workbook_stages: [
      {
        step: 1,
        date: '1750–1770',
        para_ref: '[1.1]',
        heading: 'Why was Britain’s early iron industry crippled by charcoal and timber shortages?',
        bullets: [
          'Deforestation of English Oaks',
          'Brittle Impure Pig Iron',
          'Dependence on Swedish Imports',
        ],
        focus_clue:
          'Why was Britain forced to import expensive wrought iron from Sweden and Russia for Royal Navy warships?',
      },
      {
        step: 2,
        date: '1769–1781',
        para_ref: '[1.2]',
        heading:
          'How did James Watt’s rotary steam engine revolutionise heavy industrial manufacturing?',
        bullets: [
          'Separate Condenser Efficiency',
          'Rotary Shaft Motion',
          'Liberation from River Valleys',
        ],
        focus_clue:
          'How did Watt’s steam engine enable continuous, heavy mechanical manufacturing far from seasonal river valleys?',
      },
      {
        step: 3,
        date: '1775–1784',
        para_ref: '[1.3]',
        heading: 'How did Henry Cort’s puddling furnace at Funtley chemically refine molten iron?',
        bullets: [
          'Reverberatory Furnace Chamber',
          'Stirring Molten Decarburisation',
          'Eliminating Harmful Sulphur',
        ],
        focus_clue:
          'How did keeping pig iron separate from burning coal prevent sulfur contamination and burn away brittle impurities?',
      },
      {
        step: 4,
        date: '1783–1784',
        para_ref: '[1.4]',
        heading:
          'Why were Cort’s patented grooved rollers fifteen times faster than traditional trip hammers?',
        bullets: [
          'Mechanical Grooved Cylinders',
          'Squeezing Out Slag Impurities',
          'Uniform Naval Bar Production',
        ],
        focus_clue:
          'Why did squeezing spongy iron blooms between heavy grooved rollers produce tougher, standardized naval iron?',
      },
      {
        step: 5,
        date: '1787',
        para_ref: '[1.5]',
        heading:
          'How did the Portsmouth Dockyard naval trials confirm Cort’s triumph for the Royal Navy?',
        bullets: [
          'Admiralty Smith Forge Tests',
          'Shatter-Resistant Anchors',
          'Complete Naval Independence',
        ],
        focus_clue:
          'Why did Admiralty master smiths declare Funtley iron superior to the finest Swedish imports for His Majesty’s Fleet?',
      },
    ],
    causal_domino_spine: {
      title: 'The Iron & Steam Revolution: Henry Cort & Funtley Works',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1750–1770',
          para_ref: '[1.1]',
          title: 'Charcoal Deficits & Pig Iron Crisis',
          actor: 'British Ironmasters & Smelters',
          tag: '🪵 CHARCOAL CRISIS',
          trigger:
            'Centuries of oak deforestation starved English blast furnaces of charcoal, while high-sulphur pit coal produced brittle, impure pig iron that shattered like glass.',
          connective:
            'Forced Britain into complete strategic dependence on importing 50,000 tons of expensive wrought iron annually from Sweden and Russia across the Baltic.',
          question:
            'Why was Britain’s early iron industry crippled by charcoal and timber shortages?',
        },
        {
          step: 2,
          date: '1769–1781',
          para_ref: '[1.2]',
          title: 'Watt’s Rotary Steam Engine',
          actor: 'James Watt & Matthew Boulton',
          tag: '⚙️ STEAM POWER',
          trigger:
            'James Watt patented the separate condenser and adapted his engine to produce continuous rotary motion at the Soho Manufactory.',
          connective:
            'Liberated heavy manufacturing and textile mills from seasonal river valleys, enabling 24-hour mechanized production anywhere coal could be delivered.',
          question:
            'How did James Watt’s rotary steam engine revolutionise heavy industrial manufacturing?',
        },
        {
          step: 3,
          date: '1775–1784',
          para_ref: '[1.3]',
          title: 'Cort’s Reverberatory Puddling Furnace',
          actor: 'Henry Cort & Funtley Puddlers',
          tag: '🔥 FUNTLEY PUDDLING',
          trigger:
            'At Funtley Ironworks near Fareham, Henry Cort patented the reverberatory puddling furnace, deflecting 1,200°C radiant heat from an arched roof without coal contacting the molten iron.',
          connective:
            'Burned away brittle carbon and sulphur impurities, transforming cheap domestic pig iron into high-grade malleable wrought iron.',
          question:
            'How did Henry Cort’s puddling furnace at Funtley chemically refine molten iron?',
        },
        {
          step: 4,
          date: '1783–1784',
          para_ref: '[1.4]',
          title: 'Mechanised Grooved Rollers',
          actor: 'Henry Cort & River Meon Millwrights',
          tag: '🔄 GROOVED ROLLERS',
          trigger:
            'Cort replaced slow manual blacksmith forge hammers with water-powered grooved rollers driven by the surging River Meon waterwheel.',
          connective:
            'Squeezed out trapped slag impurities and compressed iron blooms into uniform naval bars at fifteen times the speed of traditional forge hammers.',
          question:
            'Why were Cort’s patented grooved rollers fifteen times faster than traditional trip hammers?',
        },
        {
          step: 5,
          date: '1787',
          para_ref: '[1.5]',
          title: 'Portsmouth Royal Dockyard Trials',
          actor: 'Admiralty Navy Board & Master Smiths',
          tag: '⚓ NAVAL TRIALS',
          trigger:
            'Admiralty master smiths at Portsmouth Dockyard conducted grueling stress trials, bending Funtley iron double and cold-twisting anchor rings without a single crack.',
          connective:
            'Confirmed Funtley wrought iron equaled premium Swedish Orgrounds ore, establishing total British naval self-sufficiency on the eve of the French Revolutionary Wars.',
          question:
            'How did the Portsmouth Dockyard naval trials confirm Cort’s triumph for the Royal Navy?',
        },
      ],
    },
  },
  lesson_2: {
    workbook_stages: [
      {
        step: 1,
        date: '1780–1820',
        para_ref: '[2.1]',
        heading: 'How did the factory system displace traditional domestic craft production?',
        bullets: [
          'Domestic Home Handlooms',
          'Centralised Steam Factories',
          'Relentless Machine Speed',
        ],
        focus_clue:
          'Why did steam-powered textile mills force artisan weavers to abandon home cottages for centralized urban factories?',
      },
      {
        step: 2,
        date: '1800–1830',
        para_ref: '[2.2]',
        heading:
          'How did the factory clock and draconian fines enforce strict industrial discipline?',
        bullets: [
          'Rigid Fourteen-Hour Shifts',
          'Pence-Deduction Lateness Fines',
          'Choking Dust & Locked Doors',
        ],
        focus_clue:
          'Why did mill owners impose strict fines for opening windows, whistling, or being two minutes late to work?',
      },
      {
        step: 3,
        date: '1810–1832',
        para_ref: '[2.3]',
        heading:
          'Why were pauper apprentice children systematically exploited in northern textile mills?',
        bullets: [
          'Workhouse Apprentice Trafficking',
          'Crawling Under Spinning Mules',
          'Crushed Fingers & Hair Scalpings',
        ],
        focus_clue:
          'Why did factory masters employ tiny children as piecers and scavengers beneath fast-moving, unguarded spinning mules?',
      },
      {
        step: 4,
        date: '1832',
        para_ref: '[2.4]',
        heading:
          'What shocking physical abuses did Matthew Crabtree reveal to the Sadler Committee?',
        bullets: [
          'Sixteen-Hour Daily Fatigue',
          'Overlooker Leather Strap Beatings',
          'Permanent Spinal Stunting',
        ],
        focus_clue:
          'How did 22-year-old former child worker Matthew Crabtree prove that mill labour caused permanent bodily deformity?',
      },
      {
        step: 5,
        date: '1833',
        para_ref: '[2.5]',
        heading:
          'How did the 1833 Factory Act introduce the first legal regulation of child labour?',
        bullets: [
          'Ban on Children Under Nine',
          'Eight-Hour Workday Limits',
          'Four Statutory Factory Inspectors',
        ],
        focus_clue:
          'Why did the appointment of four government inspectors establish the precedent of state intervention in private factories?',
      },
    ],
    causal_domino_spine: {
      title: 'Factory Work & Child Labour: Progress or Punishment?',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1780–1820',
          para_ref: '[2.1]',
          title: 'Collapse of the Domestic Craft System',
          actor: 'Textile Artisans & Mill Masters',
          tag: '🏭 FACTORY SYSTEM',
          trigger:
            'Mechanised spinning mules and steam powerlooms produced vast quantities of cheap cloth, obliterating independent cottage handloom weaving.',
          connective:
            'Drove impoverished rural artisan families into booming northern industrial towns to seek wage labour in multi-storey steam mills.',
          question: 'How did the factory system displace traditional domestic craft production?',
        },
        {
          step: 2,
          date: '1800–1830',
          para_ref: '[2.2]',
          title: 'Clockwork Discipline & Mill Fines',
          actor: 'Factory Masters & Overlookers',
          tag: '⏰ FACTORY CLOCK',
          trigger:
            'Mill owners enforced relentless 14- to 16-hour shifts through locked doors, unceasing machine pace, and heavy wage fines for opening windows or two-minute lateness.',
          connective:
            'Subordinated human autonomy to machine rhythms, creating an exhausted and intimidated industrial working class.',
          question:
            'How did the factory clock and draconian fines enforce strict industrial discipline?',
        },
        {
          step: 3,
          date: '1810–1832',
          para_ref: '[2.3]',
          title: 'Exploitation of Pauper Apprentices',
          actor: 'Workhouses & Mill Masters',
          tag: '🧒 PAUPER APPRENTICES',
          trigger:
            'Thousands of destitute children were legally bound from southern workhouses to remote northern textile mills to work as scavengers and piecers under moving machinery.',
          connective:
            'Subjected defenceless children to horrific injuries, crushed limbs, scalping in whirling gears, and stunting fatigue.',
          question:
            'Why were pauper apprentice children systematically exploited in northern textile mills?',
        },
        {
          step: 4,
          date: '1832',
          para_ref: '[2.4]',
          title: 'Matthew Crabtree & The Sadler Committee',
          actor: 'Parliamentary Sadler Commission',
          tag: '📋 SADLER COMMITTEE',
          trigger:
            'Twenty-two-year-old former child worker Matthew Crabtree gave harrowing evidence to Parliament, describing 16-hour shifts, overlooker strap beatings, and permanent spinal deformity.',
          connective:
            'Exposed the horrific human cost of unbridled industrial capitalism to the British public and shattered parliamentary complacency.',
          question:
            'What shocking physical abuses did Matthew Crabtree reveal to the Sadler Committee?',
        },
        {
          step: 5,
          date: '1833',
          para_ref: '[2.5]',
          title: 'The 1833 Factory Act',
          actor: 'Lord Shaftesbury & Parliament',
          tag: '📜 1833 FACTORY ACT',
          trigger:
            'Parliament passed the 1833 Factory Act, banning mill work for children under nine, limiting hours for ages 9–13 to eight hours daily, and appointing four statutory factory inspectors.',
          connective:
            'Established the crucial constitutional precedent that the state had the legal authority to regulate private industry and protect vulnerable workers.',
          question:
            'How did the 1833 Factory Act introduce the first legal regulation of child labour?',
        },
      ],
    },
  },
  lesson_3: {
    workbook_stages: [
      {
        step: 1,
        date: '1800–1830',
        para_ref: '[3.1]',
        heading: 'How did explosive urban population growth create deadly back-to-back slums?',
        bullets: [
          'Unregulated Speculative Building',
          'Windowless Shared Party Walls',
          'Flooded Earthen Cellars',
        ],
        focus_clue:
          'Why did cities grow tenfold without building regulations, trapping working families in airless, lightless brick courts?',
      },
      {
        step: 2,
        date: '1830–1840',
        para_ref: '[3.2]',
        heading: 'Why did primitive sanitation turn working-class courts into festering cesspools?',
        bullets: [
          'Shared Privy Overflow',
          'Towering Nightsoil Dunghills',
          'Seeping Groundwater Wells',
        ],
        focus_clue:
          'How did hundreds of residents sharing a single open privy contaminate the shallow pump wells used for daily drinking water?',
      },
      {
        step: 3,
        date: '1831–1848',
        para_ref: '[3.3]',
        heading:
          'Why did terrifying cholera epidemics shatter complacent beliefs in laissez-faire?',
        bullets: [
          'Waterborne Bacterial Agony',
          'Blue-Skinned Twelve-Hour Collapse',
          'Terrified Wealthy Elites',
        ],
        focus_clue:
          'Why did sudden cholera outbreaks killing thousands in days force Victorian authorities to confront public squalor?',
      },
      {
        step: 4,
        date: '1842',
        para_ref: '[3.4]',
        heading:
          'How did Edwin Chadwick’s 1842 Report prove that filth caused disease and premature death?',
        bullets: [
          'Statistical Lifespan Comparison',
          'Nineteen-Year Manchester Average',
          'Economic Cost of Epidemics',
        ],
        focus_clue:
          'How did Chadwick use mortality statistics to prove that dirty water and rotting sewage cost taxpayers more than building sewers?',
      },
      {
        step: 5,
        date: '1858–1865',
        para_ref: '[3.5]',
        heading:
          'How did the 1858 Great Stink compel Parliament to fund Joseph Bazalgette’s sewers?',
        bullets: [
          'Midsummer Thames Fermentation',
          'Commons Chloride Curtains',
          'Bazalgette Interceptor Tunnels',
        ],
        focus_clue:
          'Why did Parliament pass sewer legislation in eighteen days only after toxic river stench invaded the House of Commons?',
      },
    ],
    causal_domino_spine: {
      title: 'Urbanisation, Cholera & The Great Stink: Filth to Public Health',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1800–1830',
          para_ref: '[3.1]',
          title: 'Back-to-Back Slum Courts',
          actor: 'Speculative Landlords & Mill Hands',
          tag: '🏘️ BACK-TO-BACK SLUMS',
          trigger:
            'Urban populations quadrupled without building codes, forcing speculative builders to erect windowless back-to-back terraces sharing rear party walls and damp earthen cellars.',
          connective:
            'Created airless, lightless, and densely overcrowded courts where typhus and tuberculosis spread uncontrollably.',
          question: 'How did explosive urban population growth create deadly back-to-back slums?',
        },
        {
          step: 2,
          date: '1830–1840',
          para_ref: '[3.2]',
          title: 'Cesspool Overflows & Contaminated Wells',
          actor: 'Municipal Authorities & Water Companies',
          tag: '🕳️ SEEPING CESSPOOLS',
          trigger:
            'Dozens of families shared single open privies, allowing untreated human waste and rotting nightsoil heaps to seep through porous soil into shallow drinking pump wells.',
          connective:
            'Inadvertently poisoned the groundwater supply of entire working-class neighbourhoods with deadly bacterial pathogens.',
          question:
            'Why did primitive sanitation turn working-class courts into festering cesspools?',
        },
        {
          step: 3,
          date: '1831–1848',
          para_ref: '[3.3]',
          title: 'The Terror of Asiatic Cholera',
          actor: 'British Population & Medical Doctors',
          tag: '💧 CHOLERA PANDEMIC',
          trigger:
            'Waterborne cholera struck British ports and towns, killing victims within twelve hours through sudden dehydration while terrified authorities burned street pitch against miasma.',
          connective:
            'Shattered wealthy elites’ dogmatic faith in laissez-faire by proving that epidemic filth in slums threatened rich and poor alike.',
          question:
            'Why did terrifying cholera epidemics shatter complacent beliefs in laissez-faire?',
        },
        {
          step: 4,
          date: '1842',
          para_ref: '[3.4]',
          title: 'Chadwick’s Sanitary Report',
          actor: 'Edwin Chadwick & Poor Law Board',
          tag: '📊 1842 SANITARY REPORT',
          trigger:
            'Edwin Chadwick published statistical data demonstrating that life expectancy for Manchester labourers was just 17–19 years, directly caused by filthy water and unsewered streets.',
          connective:
            'Proved that preventing disease through clean water and glazed pipe drainage cost taxpayers far less than supporting widows and orphans under the Poor Law.',
          question:
            'How did Edwin Chadwick’s 1842 Report prove that filth caused disease and premature death?',
        },
        {
          step: 5,
          date: '1858–1865',
          para_ref: '[3.5]',
          title: 'The Great Stink & Bazalgette’s Sewers',
          actor: 'Sir Joseph Bazalgette & Parliament',
          tag: '🏛️ THE GREAT STINK',
          trigger:
            'A suffocating heatwave fermented 3 million people’s sewage in the River Thames, forcing Parliament to flee and approve £3 million for Joseph Bazalgette’s interceptor sewers in 18 days.',
          connective:
            'Constructed 82 miles of subterranean brick interceptor tunnels, diverting 420 million gallons of waste daily and permanently eradicating waterborne cholera from London.',
          question:
            'How did the 1858 Great Stink compel Parliament to fund Joseph Bazalgette’s sewers?',
        },
      ],
    },
  },
  lesson_4: {
    workbook_stages: [
      {
        step: 1,
        date: '1811–1816',
        para_ref: '[4.1]',
        heading:
          'Why did textile croppers and knitters turn to nocturnal machine-breaking under "General Ludd"?',
        bullets: [
          'Powerloom Wage Collapses',
          'Sledgehammer Midnight Raids',
          'Capital Frame-Breaking Act',
        ],
        focus_clue:
          'Why did skilled handloom weavers destroy automated spinning frames that slashed their wages and made craft skills worthless?',
      },
      {
        step: 2,
        date: 'Aug 1819',
        para_ref: '[4.2]',
        heading:
          'Why did the Peterloo Massacre ignite widespread working-class fury against the state?',
        bullets: [
          'Peaceful St Peter’s Field Crowd',
          'Manchester Yeomanry Sabre Charge',
          'Repressive Tory Six Acts',
        ],
        focus_clue:
          'Why did magistrates order cavalry to charge 60,000 peaceful cotton workers listening to orator Henry Hunt in Manchester?',
      },
      {
        step: 3,
        date: 'Nov 1830',
        para_ref: '[4.3]',
        heading: 'How did the "Captain Swing" riots sweep through Hampshire and the Meon Valley?',
        bullets: [
          'Starvation Winter Destitution',
          'Sledgehammer Threshing Destruction',
          'Nocturnal Hayrick Arson',
        ],
        focus_clue:
          'Why did starving farm labourers in Selborne and the Meon Valley smash threshing machines that stole their winter wages?',
      },
      {
        step: 4,
        date: 'Dec 1830',
        para_ref: '[4.4]',
        heading:
          'How brutally did the Winchester Special Assizes punish Hampshire machine-breakers?',
        bullets: [
          'Winchester Great Hall Trials',
          'Micheldever Youth Execution',
          'Australian Penal Transportation',
        ],
        focus_clue:
          'Why did the British state impose draconian death and transportation sentences on 101 Hampshire agricultural workers?',
      },
      {
        step: 5,
        date: '1834',
        para_ref: '[4.5]',
        heading: 'Why did the harsh punishment of the Tolpuddle Martyrs provoke a national outcry?',
        bullets: [
          'Friendly Society Mutual Aid',
          'Obscure Secret Oaths Law',
          'Massive London Protest Marches',
        ],
        focus_clue:
          'Why did sentencing six peaceful Dorset farm labourers to Australian exile spark the first national trade union solidarity movement?',
      },
    ],
    causal_domino_spine: {
      title: 'Blood, Machines & Ballots: Radical Protest & The Swing Riots',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1811–1816',
          para_ref: '[4.1]',
          title: 'Luddite Machine-Breaking Raids',
          actor: 'Artisan Hand-Croppers & "General Ludd"',
          tag: '🔨 LUDDITE RESISTANCE',
          trigger:
            'Textile artisans smashed automated shearing frames with sledgehammers under "General Ludd" to protect their wages and independence from industrial deskilling.',
          connective:
            'Panicked Parliament into passing the 1812 Frame Breaking Act (capital hanging) and deploying 12,000 regular troops to the industrial North.',
          question:
            'Why did textile croppers and knitters turn to nocturnal machine-breaking under "General Ludd"?',
        },
        {
          step: 2,
          date: 'Aug 1819',
          para_ref: '[4.2]',
          title: 'The Peterloo Massacre',
          actor: 'Manchester Magistrates & Yeomanry Cavalry',
          tag: '🏇 PETERLOO MASSACRE',
          trigger:
            'Magistrates ordered mounted cavalry with drawn sabres to charge 60,000 peaceful reformers listening to Orator Hunt at St Peter’s Field, killing 18 and wounding over 650.',
          connective:
            'Ignited national working-class outrage and prompted the Tory government to pass the repressive Six Acts banning unauthorized political assemblies.',
          question:
            'Why did the Peterloo Massacre ignite widespread working-class fury against the state?',
        },
        {
          step: 3,
          date: 'Nov 1830',
          para_ref: '[4.3]',
          title: 'The Hampshire Swing Riots',
          actor: 'Starving Farm Labourers & "Captain Swing"',
          tag: '🌾 SWING REBELLION',
          trigger:
            'Hampshire and Meon Valley agricultural labourers smashed cast-iron threshing machines, burned hayricks, and sacked workhouses to demand a living wage of 2s a day.',
          connective:
            'Spread agrarian insurrection across the southern counties, terrifying wealthy landowners and prompting massive state retaliation.',
          question:
            'How did the "Captain Swing" riots sweep through Hampshire and the Meon Valley?',
        },
        {
          step: 4,
          date: 'Dec 1830',
          para_ref: '[4.4]',
          title: 'Winchester Special Assizes',
          actor: 'Lord Melbourne & Special Commission Judges',
          tag: '⚖️ WINCHESTER ASSIZES',
          trigger:
            'Special Commission judges in Winchester Castle Great Hall tried 300 Hampshire labourers, hanging 19-year-old Henry Cook and sentencing 101 men to penal transportation to Australia.',
          connective:
            'Ruthlessly crushed rural collective action while cementing deep working-class resentment against aristocratic injustice.',
          question:
            'How brutally did the Winchester Special Assizes punish Hampshire machine-breakers?',
        },
        {
          step: 5,
          date: '1834',
          para_ref: '[4.5]',
          title: 'The Tolpuddle Martyrs',
          actor: 'George Loveless & Dorset Farm Labourers',
          tag: '✊ TOLPUDDLE MARTYRS',
          trigger:
            'Six peaceful Dorset farm labourers formed a friendly society to resist wage cuts and were sentenced to seven years’ penal transportation under an obscure 1797 secret oaths law.',
          connective:
            'Mobilised over 100,000 marching workers in London, founding the modern British trade union movement and forcing full royal pardons within two years.',
          question:
            'Why did the harsh punishment of the Tolpuddle Martyrs provoke a national outcry?',
        },
      ],
    },
  },
  lesson_5: {
    workbook_stages: [
      {
        step: 1,
        date: '1800–1830',
        para_ref: '[5.1]',
        heading:
          'Why was Britain’s unreformed parliamentary system condemned as a corrupt oligarchy?',
        bullets: [
          'Under-Five-Percent Electorate',
          'Old Sarum & Newtown Rotten Boroughs',
          'Unrepresented Industrial Cities',
        ],
        focus_clue:
          'Why did uninhabited grassy mounds send two MPs to Westminster while industrial powerhouses like Manchester had zero?',
      },
      {
        step: 2,
        date: '1831–1832',
        para_ref: '[5.2]',
        heading:
          'How did public rebellion and economic panic force the passage of the 1832 Great Reform Act?',
        bullets: [
          'Bristol Reform Riots & Fires',
          '"Days of May" Bank Run Gold Panic',
          'Tory House of Lords Surrender',
        ],
        focus_clue:
          'Why was the middle-class run on the Bank of England ("Stop the Duke, Go for Gold!") more terrifying than street riots?',
      },
      {
        step: 3,
        date: '1832',
        para_ref: '[5.3]',
        heading:
          'Which industrial cities were granted MPs, and why did workers call the Act the "Great Betrayal"?',
        bullets: [
          'Manchester, Birmingham & Leeds MPs',
          'Ten-Pound Property Qualification',
          'Deliberate Working-Class Exclusion',
        ],
        focus_clue:
          'How did Earl Grey "reform in order to preserve", enfranchising the wealthy middle class while locking out working men?',
      },
      {
        step: 4,
        date: '1838–1848',
        para_ref: '[5.4]',
        heading: 'How did the Chartist movement unite millions of workers behind the Six Points?',
        bullets: [
          'Universal Male Suffrage & Secret Ballot',
          'Abolition of Property Requirements',
          'Three Mammoth Rejected Petitions',
        ],
        focus_clue:
          'How did William Lovett and Feargus O’Connor mobilize millions of signatures demanding salaries for working MPs?',
      },
      {
        step: 5,
        date: '1872',
        para_ref: '[5.5]',
        heading:
          'How did the 1872 Secret Ballot Act at Pontefract destroy landlord political coercion?',
        bullets: [
          'Abolition of Public Hustings',
          'Private Booths & Liquorice Wax Seals',
          'Freedom from Landlord Eviction',
        ],
        focus_clue:
          'Why did casting votes in private booths prevent factory bosses and landowners from intimidating working voters?',
      },
    ],
    causal_domino_spine: {
      title: 'The Road to Democracy: Rotten Boroughs to the Secret Ballot',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1800–1830',
          para_ref: '[5.1]',
          title: 'Rotten Boroughs & Disenfranchised Cities',
          actor: 'Aristocratic Landowners & Unreformed Commons',
          tag: '🏛️ ROTTEN BOROUGHS',
          trigger:
            'Fewer than 5% of adult males could vote, with uninhabited grassy mounds like Old Sarum electing two MPs while booming cities like Manchester had zero representation.',
          connective:
            'Exposed the unreformed Westminster parliament as a corrupt aristocratic oligarchy completely out of touch with the industrial nation.',
          question:
            'Why was Britain’s unreformed parliamentary system condemned as a corrupt oligarchy?',
        },
        {
          step: 2,
          date: '1831–1832',
          para_ref: '[5.2]',
          title: 'The Days of May & Financial Panic',
          actor: 'Francis Place & Radical Reformers',
          tag: '🔥 REFORM CRISIS',
          trigger:
            'Following the House of Lords’ rejection of the Reform Bill, nationwide riots erupted and reformers coordinated a £1.6m gold run on the Bank of England ("Go for Gold!").',
          connective:
            'Faced with imminent revolution and national economic collapse, King William IV and the Tories surrendered and passed the Reform Bill.',
          question:
            'How did public rebellion and economic panic force the passage of the 1832 Great Reform Act?',
        },
        {
          step: 3,
          date: '1832',
          para_ref: '[5.3]',
          title: 'The 1832 Reform Act & The Great Betrayal',
          actor: 'Earl Grey & Whig Government',
          tag: '📜 1832 REFORM ACT',
          trigger:
            'The Act abolished 56 rotten boroughs and enfranchised industrial cities, but restricted voting to men with £10 property, excluding the working-class masses.',
          connective:
            'Bitterly alienated working-class protesters who realized power had merely shifted from aristocratic landlords to wealthy factory masters.',
          question:
            'Which industrial cities were granted MPs, and why did workers call the Act the "Great Betrayal"?',
        },
        {
          step: 4,
          date: '1838–1848',
          para_ref: '[5.4]',
          title: 'The Chartist Movement & The People’s Charter',
          actor: 'William Lovett, Feargus O’Connor & Chartists',
          tag: '📜 CHARTIST SIX POINTS',
          trigger:
            'William Lovett and radical reformers published the People’s Charter demanding universal male suffrage, secret ballots, and salaries for MPs through three massive monster petitions.',
          connective:
            'Although rejected by Parliament, Chartism created Britain’s first unified national working-class political consciousness and established the future democratic agenda.',
          question:
            'How did the Chartist movement unite millions of workers behind the Six Points?',
        },
        {
          step: 5,
          date: '1872',
          para_ref: '[5.5]',
          title: 'The 1872 Secret Ballot Act',
          actor: 'William Gladstone & Liberal Government',
          tag: '🗳️ SECRET BALLOT',
          trigger:
            'Parliament passed the Ballot Act 1872, abolishing open-air public hustings and testing confidential paper voting in private booths at the Pontefract by-election.',
          connective:
            'Destroyed the ability of factory masters and landlords to intimidate, evict, or bribe voters, laying the true cornerstone of modern democratic voting in Britain.',
          question:
            'How did the 1872 Secret Ballot Act at Pontefract destroy landlord political coercion?',
        },
      ],
    },
  },
};

for (const [lessonId, data] of Object.entries(spineData)) {
  const lessonRegex = new RegExp(`(id:\\s*'${lessonId}',[\\s\\S]*?)(learning_objectives:)`);
  if (!lessonRegex.test(dataContent)) {
    console.error(`Could not locate insertion point for ${lessonId}`);
    continue;
  }

  const replacement = `$1workbook_stages: ${JSON.stringify(data.workbook_stages, null, 6)},\n      causal_domino_spine: ${JSON.stringify(data.causal_domino_spine, null, 6)},\n      $2`;
  dataContent = dataContent.replace(lessonRegex, replacement);
  console.log(`✅ Injected workbook_stages & causal_domino_spine into ${lessonId}`);
}

fs.writeFileSync(dataFilePath, dataContent, 'utf8');
console.log('Successfully updated units/industrialisation_and_empire/data.js');
