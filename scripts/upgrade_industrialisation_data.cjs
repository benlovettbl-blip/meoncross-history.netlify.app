const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data.js');
const originalData = require(path.join(ROOT_DIR, 'temp_backups', 'inspect_backup.cjs'));

async function upgrade() {
  console.log(
    '🚀 Upgrading units/industrialisation_and_empire/data.js to 7-Pillar Gold Standard...',
  );

  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.default || mod.unitData || mod.industrialisation_and_empire;

  const orig_l1 = originalData.lessons[0];
  const orig_l2 = originalData.lessons[1];
  const orig_l3 = originalData.lessons[2];
  const orig_l4 = originalData.lessons[3];
  const orig_l5 = originalData.lessons[4];

  // =========================================================================
  // LESSON 1: What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?
  // =========================================================================
  const l1 = unit.lessons[0];
  l1.hook_text =
    "In the autumn of 1775, Henry Cort stood on the banks of the rushing River Meon at Funtley, gazing toward Portsmouth Harbour just fifteen miles away. Britain’s Royal Navy was locked in a perilous crisis: its colossal warships required thousands of tons of tough wrought iron for anchors and hull bolts, but British blast furnaces produced only brittle 'pig iron' that shattered like glass. With English oak forests cut down and Baltic shipping vulnerable to enemy blockade, Cort risked his entire fortune to lease an old Hampshire corn mill and master the chemistry of fire and iron.";

  l1.causal_domino_spine = {
    title: 'The Metallurgy & Steam Power Revolution (1750–1787)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1750–1770',
        title: 'The Charcoal Bottleneck & Pig Iron Crisis',
        actor: 'British Ironmasters & Royal Navy',
        tag: '🪵 RESOURCE CRISIS',
        para_ref: '[1.1]',
        question:
          'Why was Britain’s early iron industry crippled by charcoal and timber shortages?',
        trigger:
          'Deforestation exhausted England’s oak forests, forcing ironmasters to use sulphur-rich pit coal that produced brittle, useless pig iron.',
        desc: '[1.1] Deforestation exhausted England’s oak forests, forcing ironmasters to use sulphur-rich pit coal that produced brittle, useless pig iron.',
        connective:
          'Forced Britain to import 50,000 tons of Swedish Orgrounds iron annually, leaving the Royal Navy dangerously dependent on foreign Baltic shipping.',
        because:
          'Centuries of timber felling for shipbuilding and glassworks stripped woodlands, while British coal contained chemical impurities that poisoned molten iron.',
        therefore:
          'British blast furnaces could only produce brittle pig iron that shattered under hammer blows, holding imperial defence hostage to foreign trade.',
      },
      {
        step: 2,
        date: '1769–1781',
        title: 'James Watt & The Rotary Steam Engine',
        actor: 'James Watt & Matthew Boulton',
        tag: '⚙️ ROTARY POWER',
        para_ref: '[1.2]',
        question:
          'How did James Watt’s rotary steam engine revolutionise heavy industrial manufacturing?',
        trigger:
          'James Watt patented the separate condenser and adapted his engine for rotary motion, transforming coal combustion into continuous mechanical power.',
        desc: '[1.2] James Watt patented the separate condenser and adapted his engine for rotary motion, transforming coal combustion into continuous mechanical power.',
        connective:
          'Liberated heavy manufacturing from remote rushing river valleys, enabling massive textile mills and ironworks to operate anywhere coal could be carted.',
        because:
          'Traditional waterwheels froze during winter frosts and stopped in summer droughts, restricting production to rural river valleys.',
        therefore:
          'Factories relocated into rapidly growing industrial cities, creating an insatiable national demand for tough machinery iron.',
      },
      {
        step: 3,
        date: '1775–1784',
        title: 'Cort’s Reverberatory Puddling Furnace',
        actor: 'Henry Cort & Funtley Ironworkers',
        tag: '🔥 PUDDLING BREAKTHROUGH',
        para_ref: '[1.3]',
        question: 'How did Henry Cort’s puddling furnace at Funtley chemically refine molten iron?',
        trigger:
          'Cort perfected the reverberatory puddling furnace at Funtley, using an arched masonry roof to bounce pure radiant heat onto the molten metal without fuel contact.',
        desc: '[1.3] Cort perfected the reverberatory puddling furnace at Funtley, using an arched masonry roof to bounce pure radiant heat onto the molten metal without fuel contact.',
        connective:
          'Burned away sulphur and excess carbon as puddlers stirred the bubbling metal, converting crude British pig iron into high-grade naval wrought iron.',
        because:
          'Keeping burning coal physically separated from the iron bath prevented poisonous sulphur smoke from contaminating the refining metal.',
        therefore:
          'Britain finally unlocked the chemical secret to producing tough, malleable wrought iron using cheap, abundant domestic pit coal.',
      },
      {
        step: 4,
        date: '1783–1784',
        title: 'Patented Grooved Rollers & Slag Squeezing',
        actor: 'River Meon Hydraulics & Henry Cort',
        tag: '⚙️ GROOVED ROLLERS',
        para_ref: '[1.4]',
        question:
          'Why were Cort’s patented grooved rollers fifteen times faster than traditional trip hammers?',
        trigger:
          'Cort replaced exhausting manual forge hammering with water-powered grooved iron rollers that squeezed out glassy slag and shaped bars in seconds.',
        desc: '[1.4] Cort replaced exhausting manual forge hammering with water-powered grooved iron rollers that squeezed out glassy slag and shaped bars in seconds.',
        connective:
          'Accelerated bar production fifteen-fold while leaving tons of dark puddling slag along the Meon, forming Hampshire’s only iron slag wall.',
        because:
          'Traditional blacksmiths took hours of manual hammering to draw out a single bar, creating an immense industrial production bottleneck.',
        therefore:
          'Funtley Ironworks could mass-produce uniform naval hull bolts and railway rails at unprecedented speed and commercial scale.',
      },
      {
        step: 5,
        date: '1787',
        title: 'Portsmouth Dockyard Admiralty Trials',
        actor: 'Admiralty Navy Board & Master Smiths',
        tag: '⚓ NAVAL TRIALS',
        para_ref: '[1.5]',
        question:
          'How did the Portsmouth Dockyard naval trials confirm Cort’s triumph for the Royal Navy?',
        trigger:
          'Admiralty hammer trials at Portsmouth Dockyard proved Funtley iron surpassed Swedish Orgrounds in tensile strength and shatter-resistance.',
        desc: '[1.5] Admiralty hammer trials at Portsmouth Dockyard proved Funtley iron surpassed Swedish Orgrounds in tensile strength and shatter-resistance.',
        connective:
          'Secured total British naval self-sufficiency, armoring the Royal Navy with Hampshire-refined iron on the eve of the French Revolutionary Wars.',
        because:
          'Naval smiths twisted Funtley bars into corkscrews and forged heavy anchors that endured brutal sledgehammer stress tests without cracking.',
        therefore:
          'British iron production surged 400%, powering the Industrial Revolution and forging the anchors of Nelson’s fleet at Trafalgar.',
      },
    ],
  };

  l1.timeline_anchor = l1.causal_domino_spine.stages.map((s) => ({
    date: s.date,
    title: s.title,
    desc: s.trigger,
  }));

  l1.workbook_stages = [
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
        'How did the exhaustion of timber and sulphur in pit coal leave early British iron brittle and dependent on Baltic imports?',
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
        'Why did Watt’s separate condenser and rotary motion allow factories to move from remote rural rivers into crowded industrial cities?',
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
        'How did Cort’s arched brick roof bounce radiant heat onto the molten iron to burn away carbon without coal sulphur touching it?',
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
        'Why did mechanised grooved rollers compress hot puddled iron fifteen times faster than traditional blacksmith forge hammers?',
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
        'How did the 1787 Portsmouth hammer trials prove Funtley iron equaled Swedish imports and secured Royal Navy self-sufficiency?',
    },
  ];

  // Preserve existing tasks & photo slider for Lesson 1
  const l1_slider = orig_l1.narrative_blocks.find((b) => b.type === 'photo_slider') || {
    type: 'photo_slider',
    title: 'Cartographic Forensic Slider: 1890s Ordnance Survey vs. Modern Funtley',
    description:
      'Slide back and forth to compare the late Victorian Ordnance Survey 25-inch map against modern Funtley.',
    before_image: '/images/funtley/funtley_historic_os_map_1890s.jpg',
    before_label: '1890s OS 25-Inch Map (Forge Mill & Sluices)',
    after_image: '/images/funtley/funtley_modern_map.jpg',
    after_label: 'Modern Street Map (Iron Mill Lane & Meon)',
    satellite_image: '/images/funtley/funtley_modern_satellite.jpg',
    satellite_label: 'Modern Satellite Aerial View',
  };

  l1.narrative_blocks = [
    {
      act: 1,
      title: 'Act 1: The Charcoal Bottleneck & Pig Iron Crisis (1750–1770)',
      theme_heading: 'Act 1: The Charcoal Bottleneck & Pig Iron Crisis (1750–1770)',
      text: '<span class="para-ref">[1.1]</span> Before the mid-eighteenth century, British industry was held hostage by an acute energy crisis. For generations, ironmasters used timber to smelt iron ore in blast furnaces. However, centuries of deforestation had exhausted England\'s ancient oak forests. When ironmasters turned to abundant pit coal, they struck a chemical disaster: British coal was choked with yellow sulphur, which contaminated the molten metal. The resulting <strong class="vocab-highlight">pig iron</strong> <small class="vocab-gloss">(crude, brittle iron poured into sand moulds)</small> was as brittle as glass. Strike a bar of British pig iron with a hammer, and it shattered into lethal shards. To build tough anchors and ship bolts for the Royal Navy, Britain was forced to import over 50,000 tons of premium wrought iron every year from Sweden and Russia across the vulnerable Baltic Sea.',
      source: orig_l1.narrative_blocks[0].source,
    },
    {
      act: 2,
      title: 'Act 2: James Watt & The Rotary Steam Revolution (1769–1781)',
      theme_heading: 'Act 2: James Watt & The Rotary Steam Revolution (1769–1781)',
      text: '<span class="para-ref">[1.2]</span> While iron production floundered, a revolutionary power source erupted. In cramped cottages under the <strong class="vocab-highlight">domestic system</strong> <small class="vocab-gloss">(craft goods produced by hand in workers\' homes)</small>, spinning and weaving were limited by human muscle and waterwheels that froze in winter or dried up in summer. In 1769, Scottish instrument maker <strong class="vocab-highlight">James Watt</strong> patented his separate condenser, vastly improving early steam engines. Partnering with industrialist Matthew Boulton in Birmingham, Watt adapted his engine to produce continuous rotary motion. By converting the thermal energy of coal into mechanical power, Watt liberated factories from remote river valleys. Massive textile mills, deep mine pumps, and heavy iron hammers could now operate relentlessly anywhere coal was shipped.',
      tasks: orig_l1.narrative_blocks[1].tasks,
      source: orig_l1.narrative_blocks[1].source,
    },
    {
      act: 3,
      title: 'Act 3: Henry Cort’s Puddling Breakthrough at Funtley (1775–1784)',
      theme_heading: 'Act 3: Henry Cort’s Puddling Breakthrough at Funtley (1775–1784)',
      text: '<span class="para-ref">[1.3]</span> Yet steam engines required durable metal. In 1775, former naval agent <strong class="vocab-highlight">Henry Cort</strong> leased an old corn mill at Funtley on the River Meon near Fareham, just fifteen miles from Portsmouth Dockyard. In 1783, Cort patented the <strong class="vocab-highlight">reverberatory puddling furnace</strong> <small class="vocab-gloss">(a furnace deflecting heat from an arched roof without fuel touching the metal)</small>. Cort separated the coal firebox from the molten metal hearth with a brick bridge wall. The curved masonry roof deflected clean, blistering 1,200°C radiant heat down onto the iron, burning away impurities while keeping destructive coal sulphur away. Skilled "puddlers" stirred the boiling metal through a porthole with long iron paddles, burning off carbon until pure wrought iron thickened into glowing spongy balls.',
      source: orig_l1.narrative_blocks[3].source,
    },
    l1_slider,
    {
      act: 4,
      title: 'Act 4: Grooved Rollers & The Hampshire Archaeology (1783–1784)',
      theme_heading: 'Act 4: Grooved Rollers & The Hampshire Archaeology (1783–1784)',
      text: '<span class="para-ref">[1.4]</span> Instead of having teams of exhausted blacksmiths slowly hammer hot iron blooms by hand, Cort patented water-powered <strong class="vocab-highlight">grooved rollers</strong> in 1784. Driven by the surging River Meon waterwheel, these grooved cylinders squeezed out trapped slag impurities and compressed the metal into uniform naval bars at fifteen times the speed of traditional forge hammers. The physical archaeology of this triumph remains etched in the Hampshire landscape today. At Funtley, the original stone weir and circular waterwheel housing survive beside the river. Nearby stands Fontley House, with its Georgian red-brick Fareham "Tallboy" chimneys, and an intact dry-stone wall constructed entirely from tons of dark, glassy puddling slag excavated from Cort\'s ironworks.',
    },
    {
      act: 5,
      title: 'Act 5: The Portsmouth Dockyard Trials & Naval Supremacy (1787–1800)',
      theme_heading: 'Act 5: The Portsmouth Dockyard Trials & Naval Supremacy (1787–1800)',
      text: '<span class="para-ref">[1.5]</span> In March 1787, Cort invited the Navy Board to Portsmouth Royal Dockyard for decisive stress tests. In front of skeptical Admiralty commissioners, master smiths bent Funtley iron double, twisted bars into cold corkscrews, and pounded anchor rings with twenty-pound sledgehammers. The iron did not crack. The official Admiralty minutes declared Funtley iron superior to any British metal and fully equal to top-grade Swedish Orgrounds iron. Domestic iron production surged 400%, armoring the Royal Navy on the eve of the Napoleonic Wars and forging the anchors of <em>HMS Victory</em>. Cort was hailed as the "father of the iron trade," though the embezzlement of naval funds by his financial partner Adam Jellicoe tragically stripped Cort of his patents, plunging him into bankruptcy before his death in 1800.',
      tasks: orig_l1.narrative_blocks[4].tasks,
      source: orig_l1.narrative_blocks[4].source,
    },
  ];

  // =========================================================================
  // LESSON 2: Was industrial work progress or punishment?
  // =========================================================================
  const l2 = unit.lessons[1];
  l2.hook_text =
    "Dawn breaks over Leeds in 1830 as a piercing factory horn shatters the icy darkness. In freezing garrets, eight-year-old children stagger awake, terrified of arriving a minute past six o'clock, which brings the overseer's heavy leather strap or a docked wage. In the domestic workshops of the previous century, families spun wool at their own pace, pausing to tend crops or celebrate 'Saint Monday.' Now, towering brick textile mills dominate the horizon, filled with the deafening thunder of steam-driven powerlooms. For Britain's new working class, the machine has become a harsh, unyielding master.";

  l2.causal_domino_spine = {
    title: 'The Factory System & Child Labour Reform (1780–1833)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1780–1820',
        title: 'The Rise of the Factory System',
        actor: 'Textile Capitalists & Displaced Weavers',
        tag: '🏭 FACTORY SYSTEM',
        para_ref: '[2.1]',
        question: 'How did the factory system displace traditional domestic craft production?',
        trigger:
          'Steam powerlooms and mechanized spinning mules concentrated textile manufacturing into massive multi-storey urban factories.',
        desc: '[2.1] Steam powerlooms and mechanized spinning mules concentrated textile manufacturing into massive multi-storey urban factories.',
        connective:
          'Destroyed the independence of domestic handloom weavers, forcing impoverished artisan families into rigid factory wage labour.',
        because:
          'Handloom weavers working in rural cottages could not compete with the speed and cheap prices of steam-powered machinery.',
        therefore:
          'Craft autonomy collapsed as thousands of cottage workers migrated into northern textile towns to survive.',
      },
      {
        step: 2,
        date: '1800–1830',
        title: 'The Tyranny of the Factory Clock',
        actor: 'Mill Overlookers & Factory Operatives',
        tag: '⏰ CLOCK DISCIPLINE',
        para_ref: '[2.2]',
        question:
          'How did the factory clock and draconian fines enforce strict industrial discipline?',
        trigger:
          'Mill masters enforced fourteen-hour shifts governed by factory clocks, using punitive fines and locked doors to punish any loss of production.',
        desc: '[2.2] Mill masters enforced fourteen-hour shifts governed by factory clocks, using punitive fines and locked doors to punish any loss of production.',
        connective:
          'Replaced seasonal daylight rhythms with mechanized discipline, docking precious wages for lateness, conversation, or opening a window.',
        because:
          'Expensive steam engines consumed coal continuously, driving capitalists to squeeze maximum output from every working minute.',
        therefore:
          'Operatives were reduced to machine tenders, enduring suffocating lint and constant fear of dismissal or wage deductions.',
      },
      {
        step: 3,
        date: '1810–1832',
        title: 'Pauper Apprentice Exploitation',
        actor: 'Workhouse Guardians & Mill Owners',
        tag: '🧒 CHILD LABOUR',
        para_ref: '[2.3]',
        question:
          'Why were pauper apprentice children systematically exploited in northern textile mills?',
        trigger:
          'Thousands of destitute workhouse orphans were legally bound as apprentice scavengers and piecers, crawling beneath active spinning mules.',
        desc: '[2.3] Thousands of destitute workhouse orphans were legally bound as apprentice scavengers and piecers, crawling beneath active spinning mules.',
        connective:
          'Subjected helpless children to horrific injuries, including crushed fingers, loss of limbs, and fatal scalpings in whirling drive shafts.',
        because:
          'Mill masters needed nimble, obedient workers small enough to crawl under machinery, whom they paid almost nothing beyond thin porridge.',
        therefore:
          'Children endured sixteen-hour days in deafening noise, sleeping in crowded apprentice dormitories with zero education or safety.',
      },
      {
        step: 4,
        date: '1832',
        title: 'Matthew Crabtree & The Sadler Committee',
        actor: 'Matthew Crabtree & Michael Sadler',
        tag: '📜 SADLER REPORT',
        para_ref: '[2.4]',
        question:
          'What shocking physical abuses did Matthew Crabtree reveal to the Sadler Committee?',
        trigger:
          'Former factory child Matthew Crabtree testified to Parliament, exposing brutal overlooker beatings with leather straps and extreme daily fatigue.',
        desc: '[2.4] Former factory child Matthew Crabtree testified to Parliament, exposing brutal overlooker beatings with leather straps and extreme daily fatigue.',
        connective:
          'Shocked Victorian public conscience and shattered complacency by proving factory work caused permanent spinal stunting and physical deformity.',
        because:
          'Michael Sadler’s parliamentary committee investigated working-class children who had been permanently crippled by unregulated factory toil.',
        therefore:
          'Eyewitness testimonies exposed the brutal human reality behind Britain’s economic wealth to the national press.',
      },
      {
        step: 5,
        date: '1833',
        title: 'Lord Shaftesbury & The 1833 Factory Act',
        actor: 'Lord Shaftesbury & Factory Inspectors',
        tag: '⚖️ STATUTORY REFORM',
        para_ref: '[2.5]',
        question:
          'How did the 1833 Factory Act introduce the first legal regulation of child labour?',
        trigger:
          'Parliament passed the landmark 1833 Factory Act, banning children under nine from textile mills and capping workday hours for older children.',
        desc: '[2.5] Parliament passed the landmark 1833 Factory Act, banning children under nine from textile mills and capping workday hours for older children.',
        connective:
          'Appointed the first four statutory factory inspectors to enforce the law, establishing state regulation over private industrial capitalism.',
        because:
          'Humanitarian reformers led by Lord Shaftesbury warned that unbridled exploitation was destroying the health of an entire generation.',
        therefore:
          'The British state established the crucial constitutional precedent that private profits must yield to child protection and basic schooling.',
      },
    ],
  };

  l2.timeline_anchor = l2.causal_domino_spine.stages.map((s) => ({
    date: s.date,
    title: s.title,
    desc: s.trigger,
  }));

  l2.workbook_stages = [
    {
      step: 1,
      date: '1780–1820',
      para_ref: '[2.1]',
      heading: 'How did the factory system displace traditional domestic craft production?',
      bullets: [
        'Shift from Domestic Workshops',
        'Powered Textile Machinery',
        'Relentless Factory Discipline',
      ],
      focus_clue:
        'How did steam powerlooms and multi-storey mills destroy the independence of traditional domestic handloom weavers?',
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
        'How did mill owners use locked gates, timed shifts, and wage-docking fines to impose strict industrial obedience?',
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
        'Why did factory masters exploit workhouse orphan children as scavengers and piecers in dangerous textile machinery?',
    },
    {
      step: 4,
      date: '1832',
      para_ref: '[2.4]',
      heading: 'What shocking physical abuses did Matthew Crabtree reveal to the Sadler Committee?',
      bullets: [
        'Sixteen-Hour Daily Fatigue',
        'Overlooker Leather Strap Beatings',
        'Permanent Spinal Stunting',
      ],
      focus_clue:
        'What evidence did Matthew Crabtree give to Parliament regarding strap beatings, sixteen-hour days, and physical deformities?',
    },
    {
      step: 5,
      date: '1833',
      para_ref: '[2.5]',
      heading: 'How did the 1833 Factory Act introduce the first legal regulation of child labour?',
      bullets: [
        'Ban on Children Under Nine',
        'Eight-Hour Workday Limits',
        'Four Statutory Factory Inspectors',
      ],
      focus_clue:
        'How did the 1833 Factory Act restrict child working hours and appoint the first four government inspectors?',
    },
  ];

  l2.narrative_blocks = [
    {
      act: 1,
      title: 'Act 1: The Death of Domestic Crafts & Rise of the Mill (1780–1820)',
      theme_heading: 'Act 1: The Death of Domestic Crafts & Rise of the Mill (1780–1820)',
      text: '<span class="para-ref">[2.1]</span> Before industrialisation, most British goods were crafted under the <strong class="vocab-highlight">domestic system</strong> in family cottages. Weavers worked on handlooms, pacing their labour to seasonal daylight and resting on "Saint Monday." The invention of mechanized spinning mules and steam powerlooms obliterated this ancient autonomy. Capitalist mill owners built colossal multi-storey brick factories housing hundreds of machines. Handloom weavers could not compete against the torrent of cheap, uniform cloth pouring from steam mills. Driven by destitution, thousands of rural families abandoned their cottages to seek wage labour in booming northern textile hubs like Manchester and Leeds.',
      tasks: orig_l2.narrative_blocks[0].tasks,
      source: orig_l2.narrative_blocks[0].source,
    },
    {
      act: 2,
      title: 'Act 2: The Tyranny of the Factory Clock & Draconian Fines (1800–1830)',
      theme_heading: 'Act 2: The Tyranny of the Factory Clock & Draconian Fines (1800–1830)',
      text: '<span class="para-ref">[2.2]</span> Inside the mills, natural rhythms were replaced by the tyranny of the <strong class="vocab-highlight">factory clock</strong>. Operatives worked grueling fourteen- to sixteen-hour shifts, six days a week, surrounded by whirling unguarded iron belts and deafening machinery. Mill masters enforced military-style obedience through draconian rulebooks. Workers were fined two pence—a large fraction of daily wages—for arriving minutes late, opening a window to breathe amidst choking cotton lint, or speaking to a workmate. Mill gates were locked from the outside; anyone pausing from exhaustion faced immediate dismissal or corporal punishment.',
      tasks: orig_l2.narrative_blocks[1].tasks,
      source: orig_l2.narrative_blocks[1].source,
    },
    {
      act: 3,
      title: 'Act 3: Pauper Apprentices & Northern Textile Exploitation (1810–1832)',
      theme_heading: 'Act 3: Pauper Apprentices & Northern Textile Exploitation (1810–1832)',
      text: '<span class="para-ref">[2.3]</span> Mill owners discovered that children made the cheapest, most compliant workforce. Thousands of orphan <strong class="vocab-highlight">pauper apprentices</strong> <small class="vocab-gloss">(destitute children legally bound by workhouses to factory owners)</small> were carted from London workhouses to remote northern mills. Employed as "scavengers" and "piecers," children crawled underneath moving spinning mules to sweep flyaway cotton while machinery roared inches above their heads. Horrific accidents were routine: fingers were crushed in gears, and girls were scalped when long hair caught in whirling drive shafts. Children slept in shifts in crowded apprentice dormitories, surviving on thin oatmeal porridge.',
      tasks: orig_l2.narrative_blocks[2].tasks,
      source: orig_l2.narrative_blocks[2].source,
    },
    {
      act: 4,
      title: 'Act 4: The Sadler Committee & Matthew Crabtree’s Testimony (1832)',
      theme_heading: 'Act 4: The Sadler Committee & Matthew Crabtree’s Testimony (1832)',
      text: '<span class="para-ref">[2.4]</span> Outrage over factory conditions culminated in the landmark 1832 Parliamentary <strong class="vocab-highlight">Sadler Committee</strong> investigation. Twenty-two-year-old former child worker Matthew Crabtree gave harrowing evidence. He recounted starting in a blanket factory at age eight, working from 6:00 AM to 9:00 PM with only forty minutes for dinner. Overlookers patrolled the aisles with heavy leather straps, brutally beating exhausted children who lagged behind. Crabtree testified that extreme fatigue caused him to drop asleep on the floor without eating, leaving his legs permanently bowed and his spine stunted by unceasing toil.',
    },
    {
      act: 5,
      title: 'Act 5: Lord Shaftesbury & The 1833 Factory Act (1833)',
      theme_heading: 'Act 5: Lord Shaftesbury & The 1833 Factory Act (1833)',
      text: '<span class="para-ref">[2.5]</span> Shocked by Sadler’s revelations, humanitarian reformers led by <strong class="vocab-highlight">Lord Shaftesbury</strong> pressured Parliament into passing the historic <strong>1833 Factory Act</strong>. Defying capitalist owners who warned that state interference would ruin Britain’s economy, the Act banned textile work for children under nine, capped working hours at eight hours daily for children aged 9–13, and required two hours of compulsory schooling. Crucially, Parliament appointed the first four statutory factory inspectors to enforce the law. While mill masters often forged birth certificates, the Act set a vital constitutional precedent: the state possessed the legal right to protect vulnerable workers from unbridled industrial exploitation.',
      tasks: orig_l2.narrative_blocks[3].tasks,
      source: orig_l2.narrative_blocks[3].source,
    },
  ];

  // =========================================================================
  // LESSON 3: Did industrialisation make British towns unlivable?
  // =========================================================================
  const l3 = unit.lessons[2];
  l3.hook_text =
    "In July 1858, a suffocating heatwave settles over London. The River Thames, which receives the daily untreated sewage of three million citizens, transforms into a vast, bubbling open sewer. Inside the Palace of Westminster, the nauseating stench is so overpowering that MPs soak window curtains in chloride of lime and flee committee rooms with handkerchiefs pressed to their faces. For decades, politicians clung to the doctrine of laissez-faire, insisting that filthy industrial slums and cholera epidemics were none of the government's business. Now, the reek of their own neglect threatens Parliament itself, forcing the greatest engineering revolution in urban history.";

  l3.causal_domino_spine = {
    title: 'Urban Squalor, Cholera & The Sanitary Revolution (1800–1865)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1800–1830',
        title: 'The Urban Population Explosion & Slums',
        actor: 'Speculative Builders & Migrant Workers',
        tag: '🏘️ SLUM HOUSING',
        para_ref: '[3.1]',
        question: 'How did explosive urban population growth create deadly back-to-back slums?',
        trigger:
          'Rapid urbanisation forced millions into cramped, unregulated back-to-back terraced houses and flooded earthen cellars.',
        desc: '[3.1] Rapid urbanisation forced millions into cramped, unregulated back-to-back terraced houses and flooded earthen cellars.',
        connective:
          'Created dark, unventilated warrens where entire families slept crowded in damp basements beside stagnant waste.',
        because:
          'Factory cities expanded without planning laws or building standards as builders maximized rent per square yard.',
        therefore:
          'Industrial workers lived in dense breeding grounds for infectious disease with zero indoor plumbing or fresh air.',
      },
      {
        step: 2,
        date: '1830–1840',
        title: 'Cesspools & Contaminated Water Pumps',
        actor: 'Private Water Companies & Landlords',
        tag: '🚾 SQUALOR & PRIVIES',
        para_ref: '[3.2]',
        question:
          'Why did primitive sanitation turn working-class courts into festering cesspools?',
        trigger:
          'Dozens of families shared single overflowing outdoor privies that drained into porous, unlined underground cesspools.',
        desc: '[3.2] Dozens of families shared single overflowing outdoor privies that drained into porous, unlined underground cesspools.',
        connective:
          'Toxic liquid seeped directly through urban soil into shallow groundwater wells feeding public drinking pumps.',
        because:
          'Municipal authorities lacked public drainage networks, and private water companies supplied water only hours a week.',
        therefore:
          'Working-class families unwittingly consumed drinking water heavily contaminated with lethal human sewage.',
      },
      {
        step: 3,
        date: '1831–1848',
        title: 'The Blue Terror: Cholera Pandemics',
        actor: 'King Cholera & Victorian Doctors',
        tag: '🦠 CHOLERA EPIDEMIC',
        para_ref: '[3.3]',
        question:
          'Why did terrifying cholera epidemics shatter complacent beliefs in laissez-faire?',
        trigger:
          'Waterborne cholera struck British cities in terrifying waves, killing healthy adults within twelve hours through sudden dehydration.',
        desc: '[3.3] Waterborne cholera struck British cities in terrifying waves, killing healthy adults within twelve hours through sudden dehydration.',
        connective:
          'Shattered complacent elite belief in laissez-faire as terrified wealthy citizens realized pestilence respected no class boundaries.',
        because:
          'Cholera bacteria spread invisibly through contaminated communal water pumps while doctors mistakenly blamed atmospheric miasma.',
        therefore:
          'Widespread panic forced Parliament to reconsider its refusal to fund public health and municipal sanitary inspection.',
      },
      {
        step: 4,
        date: '1842',
        title: 'Edwin Chadwick’s 1842 Sanitary Report',
        actor: 'Edwin Chadwick & Poor Law Commission',
        tag: '📊 SANITARY REPORT',
        para_ref: '[3.4]',
        question:
          'How did Edwin Chadwick’s 1842 Report prove that filth caused disease and premature death?',
        trigger:
          'Chadwick published statistical evidence proving that industrial slum filth caused disease and cut Manchester life expectancy to 17–19 years.',
        desc: '[3.4] Chadwick published statistical evidence proving that industrial slum filth caused disease and cut Manchester life expectancy to 17–19 years.',
        connective:
          'Proved that preventative public health and glazed sewers would cost taxpayers less than funding widows and orphans under the Poor Law.',
        because:
          'Detailed mortality surveys revealed rural labourers lived twice as long as factory workers breathing slum air and drinking pump water.',
        therefore:
          'Parliament passed the landmark Public Health Act 1848, establishing the first General Board of Health.',
      },
      {
        step: 5,
        date: '1858–1865',
        title: 'The Great Stink & Bazalgette’s Sewers',
        actor: 'Joseph Bazalgette & Parliament',
        tag: '🏛️ BAZALGETTE SEWERS',
        para_ref: '[3.5]',
        question:
          'How did the 1858 Great Stink compel Parliament to fund Joseph Bazalgette’s sewers?',
        trigger:
          'The blistering heat of 1858 fermented Thames sewage, forcing terrified MPs to grant Joseph Bazalgette £3 million for civil sewers.',
        desc: '[3.5] The blistering heat of 1858 fermented Thames sewage, forcing terrified MPs to grant Joseph Bazalgette £3 million for civil sewers.',
        connective:
          'Built 1,100 miles of street sewers and 82 miles of brick interceptors, permanently banishing epidemic cholera from London.',
        because:
          'The nauseating stench invaded the Commons debating chamber, driving politicians to abandon financial delay in eighteen days.',
        therefore:
          'Victorian civil engineering proved that urban environments could be transformed into clean, livable modern cities.',
      },
    ],
  };

  l3.timeline_anchor = l3.causal_domino_spine.stages.map((s) => ({
    date: s.date,
    title: s.title,
    desc: s.trigger,
  }));

  l3.workbook_stages = [
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
        'How did rapid population growth and lack of building rules lead to dark, damp back-to-back houses and cellar dwellings?',
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
        'Why did shared privies, unlined cesspools, and leaking nightsoil contaminate urban groundwater and drinking wells?',
    },
    {
      step: 3,
      date: '1831–1848',
      para_ref: '[3.3]',
      heading: 'Why did terrifying cholera epidemics shatter complacent beliefs in laissez-faire?',
      bullets: [
        'Waterborne Bacterial Agony',
        'Blue-Skinned Twelve-Hour Collapse',
        'Terrified Wealthy Elites',
      ],
      focus_clue:
        'How did the terrifying arrival and rapid mortality of Asiatic cholera compel politicians to abandon laissez-faire?',
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
        'How did Edwin Chadwick use mortality statistics to prove that squalor shortened life expectancy and cost taxpayers money?',
    },
    {
      step: 5,
      date: '1858–1865',
      para_ref: '[3.5]',
      heading: 'How did the 1858 Great Stink compel Parliament to fund Joseph Bazalgette’s sewers?',
      bullets: [
        'Midsummer Thames Fermentation',
        'Commons Chloride Curtains',
        'Bazalgette Interceptor Tunnels',
      ],
      focus_clue:
        'How did the 1858 Great Stink force Parliament to fund Bazalgette’s underground interceptor sewers and eradicate cholera?',
    },
  ];

  l3.narrative_blocks = [
    {
      act: 1,
      title: 'Act 1: The Slum Explosion: Back-to-Back Courts & Cellars (1800–1830)',
      theme_heading: 'Act 1: The Slum Explosion: Back-to-Back Courts & Cellars (1800–1830)',
      text: '<span class="para-ref">[3.1]</span> Between 1801 and 1851, the population of industrial cities like Manchester, Birmingham, and Leeds quadrupled. Speculative builders threw up thousands of cramped <strong class="vocab-highlight">back-to-back houses</strong> <small class="vocab-gloss">(terraced brick slums sharing rear and side party walls)</small> with zero municipal building regulations. These houses had no through-ventilation, no indoor plumbing, and shared thin walls that seeped dampness. In damp, unpaved courts, entire families crowded into single windowless earthen cellars beneath street level. In cities like Liverpool, up to 20,000 destitute Irish immigrants and mill hands lived packed twelve to a cellar, where stagnant sewage pooled on earthen floors.',
      tasks: orig_l3.narrative_blocks[0].tasks,
      source: orig_l3.narrative_blocks[0].source,
    },
    {
      act: 2,
      title: 'Act 2: Cesspools, Privies & Contaminated Pumps (1830–1840)',
      theme_heading: 'Act 2: Cesspools, Privies & Contaminated Pumps (1830–1840)',
      text: '<span class="para-ref">[3.2]</span> Urban sanitation was almost medieval. A single wooden outdoor privy often served forty or more families in a crowded courtyard. Without municipal sewer pipes, human waste drained into porous underground cesspools that overflowed into gutters and streets. Towering mounds of decaying nightsoil accumulated in alleyways for months until sold to rural farmers as manure. Worse still, private water companies supplied water only two or three times a week for a few hours through shared public standpipes. Cesspool liquids seeped directly through the porous soil into shallow groundwater wells, contaminating the drinking water of entire neighbourhoods.',
      tasks: orig_l3.narrative_blocks[1].tasks,
      source: orig_l3.narrative_blocks[1].source,
    },
    {
      act: 3,
      title: 'Act 3: The Blue Terror: Cholera & The Collapse of Laissez-Faire (1831–1848)',
      theme_heading: 'Act 3: The Blue Terror: Cholera & The Collapse of Laissez-Faire (1831–1848)',
      text: '<span class="para-ref">[3.3]</span> In 1831, a terrifying new global pandemic landed on British shores: Asiatic <strong class="vocab-highlight">cholera</strong>. Spread through water contaminated with fecal bacteria, cholera struck victims with violent vomiting and diarrhea, causing extreme dehydration that turned skin a ghostly blue and killed healthy adults within twelve hours. Victorians, mistakenly believing in the <strong class="vocab-highlight">miasma theory</strong> <small class="vocab-gloss">(the false belief that epidemic disease was caused by breathing foul smells and toxic air)</small>, burned barrels of pitch in the streets. When cholera killed over 50,000 people in 1848, the terror of wealthy elites shattered their devotion to <strong class="vocab-highlight">laissez-faire</strong> <small class="vocab-gloss">(the political philosophy that government should never interfere in economic or civic life)</small>.',
      tasks: orig_l3.narrative_blocks[2].tasks,
      source: orig_l3.narrative_blocks[2].source,
    },
    {
      act: 4,
      title: 'Act 4: Edwin Chadwick & The 1842 Sanitary Report (1842)',
      theme_heading: 'Act 4: Edwin Chadwick & The 1842 Sanitary Report (1842)',
      text: '<span class="para-ref">[3.4]</span> In 1842, reformer <strong class="vocab-highlight">Edwin Chadwick</strong> published his revolutionary <em>Report on the Sanitary Condition of the Labouring Population</em>. Using groundbreaking statistical data, Chadwick proved that epidemic typhus and cholera were directly bred by environmental filth and lack of clean water. His findings were horrifying: in industrial Manchester, average working-class life expectancy had plummeted to just 17–19 years, compared to 38 years in rural Rutlandshire. Chadwick argued that building clean arterial water mains and self-flushing glazed sewers would save taxpayers money by reducing orphanhood and Poor Law relief, inspiring the landmark Public Health Act of 1848.',
    },
    {
      act: 5,
      title: 'Act 5: The Great Stink & Bazalgette’s Sewer Triumph (1858–1865)',
      theme_heading: 'Act 5: The Great Stink & Bazalgette’s Sewer Triumph (1858–1865)',
      text: '<span class="para-ref">[3.5]</span> The turning point arrived in the stifling midsummer of 1858 with the <strong>"Great Stink"</strong>. The untreated sewage of three million Londoners fermenting in the Thames produced a reek so toxic that Parliament could barely function. Terrified MPs passed emergency legislation in eighteen days, granting civil engineer <strong class="vocab-highlight">Joseph Bazalgette</strong> £3 million to rebuild the capital’s sanitation. Between 1859 and 1865, Bazalgette constructed 1,100 miles of street sewers and 82 miles of colossal underground brick interceptor tunnels, using 318 million bricks and waterproof Portland cement. Bazalgette’s subterranean cathedrals permanently diverted 420 million gallons of sewage away from London, ending epidemic cholera forever and establishing the blueprint for the modern livable city.',
      tasks: orig_l3.narrative_blocks[3].tasks,
      source: orig_l3.narrative_blocks[3].source,
    },
  ];

  // =========================================================================
  // LESSON 4: Why did British workers turn to machine-breaking and secret oaths to resist starvation and oppression?
  // =========================================================================
  const l4 = unit.lessons[3];
  l4.hook_text =
    "In November 1830, a mysterious threatening letter arrives at a Hampshire manor house, written in rough handwriting and signed by the mythical leader 'Captain Swing.' Across the Meon Valley and the fields of Hampshire, starving farm labourers have watched mechanical threshing machines take away their winter earnings. Deprived of work and facing parish starvation, bands of desperate men assemble under cover of night, armed with sledgehammers, pitchforks, and firebrands. As midnight flames consume hayricks on the horizon and the sound of iron smashing machinery echoes through farmyards, the ruling class panics, fearing England stands on the brink of bloody French-style revolution.";

  l4.causal_domino_spine = {
    title: 'Popular Protest, Industrial Sabotage & Trade Unionism (1811–1834)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1811–1816',
        title: 'The Luddite Rebellion & Machine-Breaking',
        actor: 'General Ned Ludd & Cloth Croppers',
        tag: '🔨 LUDDITE REVOLT',
        para_ref: '[4.1]',
        question:
          'Why did textile croppers and knitters turn to nocturnal machine-breaking under "General Ludd"?',
        trigger:
          'Skilled textile croppers formed nocturnal bands under "General Ludd," using sledgehammers to destroy wage-cutting powerlooms.',
        desc: '[4.1] Skilled textile croppers formed nocturnal bands under "General Ludd," using sledgehammers to destroy wage-cutting powerlooms.',
        connective:
          'Prompted Parliament to station 12,000 troops in the industrial north and pass the 1812 Frame Breaking Act making machine destruction a capital crime.',
        because:
          'Steam-powered machines flooded workshops with cheap goods, cutting artisan cloth workers’ wages to starvation levels.',
        therefore:
          'Workers turned to direct industrial sabotage as their only weapon to defend their trade and families from destitution.',
      },
      {
        step: 2,
        date: 'Aug 1819',
        title: 'The Peterloo Massacre',
        actor: 'Manchester Yeomanry & Peaceful Reformers',
        tag: '⚔️ PETERLOO ATROCITY',
        para_ref: '[4.2]',
        question:
          'Why did the Peterloo Massacre ignite widespread working-class fury against the state?',
        trigger:
          'Mounted yeomanry cavalry charged 60,000 peaceful reformers at St Peter’s Field, Manchester, killing eighteen and wounding over 650.',
        desc: '[4.2] Mounted yeomanry cavalry charged 60,000 peaceful reformers at St Peter’s Field, Manchester, killing eighteen and wounding over 650.',
        connective:
          'Galvanized national working-class solidarity while provoking the Tory government into passing the repressive Six Acts banning protest.',
        because:
          'Magistrates panicked at the sight of disciplined working-class crowds demanding the vote and lower bread prices.',
        therefore:
          'The massacre permanently stained the British government and convinced radicals that parliamentary reform was urgently required.',
      },
      {
        step: 3,
        date: 'Nov 1830',
        title: 'Captain Swing & The Hampshire Harvest Riots',
        actor: 'Captain Swing & Hampshire Labourers',
        tag: '🌾 SWING RIOTS',
        para_ref: '[4.3]',
        question: 'How did the "Captain Swing" riots sweep through Hampshire and the Meon Valley?',
        trigger:
          'Starving farm hands swept across Hampshire and the Meon Valley, smashing threshing machines and burning landlords’ hayricks.',
        desc: '[4.3] Starving farm hands swept across Hampshire and the Meon Valley, smashing threshing machines and burning landlords’ hayricks.',
        connective:
          'Spread terror among rural gentry and compelled parish vestries to temporarily promise living wages of two shillings a day.',
        because:
          'Newly introduced mechanical threshing machines eliminated winter wages, leaving agricultural families facing workhouse starvation.',
        therefore:
          'Agrarian revolt engulfed southern England as labourers united under the threatening banner of "Captain Swing."',
      },
      {
        step: 4,
        date: 'Dec 1830',
        title: 'The Winchester Special Assizes',
        actor: 'Special Judges & Convicted Labourers',
        tag: '⚖️ STATE VENGEANCE',
        para_ref: '[4.4]',
        question:
          'How brutally did the Winchester Special Assizes punish Hampshire machine-breakers?',
        trigger:
          'Judges at Winchester Castle tried over 300 Hampshire rioters, hanging teenager Henry Cook and transporting over 100 men to Australia.',
        desc: '[4.4] Judges at Winchester Castle tried over 300 Hampshire rioters, hanging teenager Henry Cook and transporting over 100 men to Australia.',
        connective:
          'Crushed rural revolt through judicial terror, tearing fathers from families to deter further challenges to landed property.',
        because:
          'The Whig government sought to demonstrate unbending resolve and reassure panicked aristocrats that private property remained sacred.',
        therefore:
          'Agricultural workers were silenced by fear of exile and the gallows, ending open machine-breaking across the county.',
      },
      {
        step: 5,
        date: '1834',
        title: 'The Tolpuddle Martyrs & Trade Unionism',
        actor: 'George Loveless & Trade Unionists',
        tag: '🤝 TOLPUDDLE VICTORY',
        para_ref: '[4.5]',
        question:
          'Why did the harsh punishment of the Tolpuddle Martyrs provoke a national outcry?',
        trigger:
          'Six Dorset farm workers led by George Loveless were sentenced to seven years’ penal transportation for taking a friendly society oath.',
        desc: '[4.5] Six Dorset farm workers led by George Loveless were sentenced to seven years’ penal transportation for taking a friendly society oath.',
        connective:
          'Provoked a massive 100,000-strong London demonstration and national petition, forcing the Crown to grant full pardons in 1836.',
        because:
          'Landowners weaponized an obscure 1797 mutiny law to criminalize peaceful trade union collective bargaining.',
        therefore:
          'Public outrage established the foundational legal right of British workers to organise trade unions without facing criminal exile.',
      },
    ],
  };

  l4.timeline_anchor = l4.causal_domino_spine.stages.map((s) => ({
    date: s.date,
    title: s.title,
    desc: s.trigger,
  }));

  l4.workbook_stages = [
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
        'Why did Yorkshire cloth workers use sledgehammers to destroy wide frames and powerlooms that threatened their wages?',
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
        'How did the cavalry charge into 60,000 peaceful reformers at St Peter’s Field spark national outrage and repressive laws?',
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
        'Why did starving Hampshire farm labourers smash threshing machines and burn hayricks under the name Captain Swing?',
    },
    {
      step: 4,
      date: 'Dec 1830',
      para_ref: '[4.4]',
      heading: 'How brutally did the Winchester Special Assizes punish Hampshire machine-breakers?',
      bullets: [
        'Winchester Great Hall Trials',
        'Micheldever Youth Execution',
        'Australian Penal Transportation',
      ],
      focus_clue:
        'What harsh penalties were handed down at Winchester Castle, including the execution of Henry Cook and transportation to Australia?',
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
        'How did the transportation of six Dorset labourers for taking secret oaths trigger mass national protests and trade union rights?',
    },
  ];

  l4.narrative_blocks = [
    {
      act: 1,
      title: 'Act 1: The Sledgehammer of General Ludd (1811–1816)',
      theme_heading: 'Act 1: The Sledgehammer of General Ludd (1811–1816)',
      text: '<span class="para-ref">[4.1]</span> In the early 1810s, skilled artisan textile workers faced catastrophic wage cuts as wide weaving frames and steam powerlooms flooded northern workshops. Led by the mythical figurehead <strong class="vocab-highlight">General Ned Ludd</strong>, groups of masked cloth croppers launched coordinated nocturnal raids across Yorkshire and Nottinghamshire. Armed with colossal blacksmith sledgehammers nicknamed "Great Enoch," Luddites smashed the machines they believed were ruining their trade and starving their families. Terrified by the insurrection, Parliament deployed 12,000 soldiers to northern England—more than Wellington commanded in Spain—and passed the 1812 Frame Breaking Act, making machine wrecking a capital crime punishable by hanging.',
      tasks: orig_l4.narrative_blocks[0].tasks,
      source: orig_l4.narrative_blocks[0].source,
    },
    {
      act: 2,
      title: 'Act 2: The Peterloo Massacre: Sabres at St Peter’s Field (August 1819)',
      theme_heading: 'Act 2: The Peterloo Massacre: Sabres at St Peter’s Field (August 1819)',
      text: '<span class="para-ref">[4.2]</span> Following the Napoleonic Wars, economic depression and high bread prices under the Corn Laws brought working-class fury to boiling point. On 16 August 1819, 60,000 peaceful men, women, and children gathered in best Sunday clothes at St Peter’s Field, Manchester, to hear orator Henry Hunt demand parliamentary reform. Panicked local magistrates ordered the mounted Manchester Yeomanry—wealthy cotton merchants on horseback—to charge the unarmed crowd with drawn sabres. Eighteen demonstrators were killed and over 650 savagely maimed. Dubbed the <strong class="vocab-highlight">Peterloo Massacre</strong> in bitter mockery of Waterloo, the atrocity united national working-class fury, but the Tory government responded with the repressive "Six Acts," criminalizing protest meetings.',
      tasks: orig_l4.narrative_blocks[1].tasks,
      source: orig_l4.narrative_blocks[1].source,
    },
    {
      act: 3,
      title: 'Act 3: Captain Swing & The Hampshire Harvest Riots (November 1830)',
      theme_heading: 'Act 3: Captain Swing & The Hampshire Harvest Riots (November 1830)',
      text: '<span class="para-ref">[4.3]</span> In the winter of 1830, agrarian rebellion exploded across southern England under the mysterious signature of <strong class="vocab-highlight">Captain Swing</strong>. In Hampshire and the Meon Valley, rural farm labourers faced winter starvation as newly invented horse-powered threshing machines stole their only winter wage. Desperate farm workers marched from farm to farm, smashing threshing machines with hammers, burning wheat ricks at night, and demanding a living wage of two shillings a day. In Fordingbridge and Selborne, crowds ransacked parish workhouses and forced magistrates to sign promises of wage increases. Landowners slept with pistols beneath their pillows, terrified that agricultural rebellion would engulf the kingdom.',
      tasks: orig_l4.narrative_blocks[2].tasks,
      source: orig_l4.narrative_blocks[2].source,
    },
    {
      act: 4,
      title: 'Act 4: The Winchester Special Assizes & State Vengeance (December 1830)',
      theme_heading: 'Act 4: The Winchester Special Assizes & State Vengeance (December 1830)',
      text: '<span class="para-ref">[4.4]</span> The British state struck back with merciless judicial brutality. In December 1830, the government dispatched a Special Commission of judges to the Great Hall of Winchester Castle to try over 300 Hampshire Swing rioters. Nearly a hundred men were sentenced to death; nineteen-year-old labourer Henry Cook of Micheldever was publicly hanged at Winchester Gaol simply for knocking off a magistrate\'s hat during a scuffle. Over 100 Hampshire farm hands were torn from their weeping families and sentenced to <strong class="vocab-highlight">penal transportation</strong> <small class="vocab-gloss">(banishment to brutal forced labour colonies in Australia)</small>. State terror crushed the rural revolt, demonstrating the lengths to which the landowning ruling class would go to defend private property.',
    },
    {
      act: 5,
      title: 'Act 5: The Tolpuddle Martyrs & The Right to Combine (1834)',
      theme_heading: 'Act 5: The Tolpuddle Martyrs & The Right to Combine (1834)',
      text: '<span class="para-ref">[4.5]</span> Driven underground by repression, six Dorset farm labourers led by Methodist lay preacher <strong class="vocab-highlight">George Loveless</strong> formed the Friendly Society of Agricultural Labourers in Tolpuddle in 1834 to peacefully resist wage cuts. Landowners panicked, arresting the men under an obscure 1797 naval mutiny statute for administering an unlawful "secret oath." Sentenced to seven years\' penal transportation to Australia, the <strong class="vocab-highlight">Tolpuddle Martyrs</strong> triggered an explosion of public outrage. Over 100,000 trade unionists marched peacefully through London with an 800,000-signature petition, forcing the Crown to grant full pardons in 1836 and establishing the foundational right to peaceful trade union organisation in Britain.',
      tasks: orig_l4.narrative_blocks[3].tasks,
      source: orig_l4.narrative_blocks[3].source,
    },
  ];

  // =========================================================================
  // LESSON 5: How did the road to democracy expand?
  // =========================================================================
  const l5 = unit.lessons[4];
  l5.hook_text =
    "In May 1832, London awakens to giant placards plastered on every street corner: 'To stop the Duke, go for gold!' The Duke of Wellington, the hero of Waterloo, has attempted to form a hardline anti-reform government. In response, middle-class radicals and working-class leaders join forces to trigger a nationwide run on the banks, draining over £1.6 million in gold sovereigns from the Bank of England in ten days. In Bristol, Nottingham, and Derby, furious crowds burn down bishops' palaces and gaols. King William IV and aristocratic peers, staring into the abyss of national economic collapse and revolution, realize that the corrupt electoral system of medieval Britain must finally fall.";

  l5.causal_domino_spine = {
    title: 'The Struggle for Parliamentary Democracy (1800–1872)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1800–1830',
        title: 'The Unreformed Parliament & Rotten Boroughs',
        actor: 'Aristocratic Landowners & Disenfranchised Cities',
        tag: '🏛️ ROTTEN BOROUGHS',
        para_ref: '[5.1]',
        question:
          'Why was Britain’s unreformed parliamentary system condemned as a corrupt oligarchy?',
        trigger:
          'Less than 5% of adult men could vote, while depopulated rural "rotten boroughs" like Old Sarum sent two MPs to Westminster.',
        desc: '[5.1] Less than 5% of adult men could vote, while depopulated rural "rotten boroughs" like Old Sarum sent two MPs to Westminster.',
        connective:
          'Denied growing industrial cities like Manchester, Birmingham, and Leeds any parliamentary representation whatsoever.',
        because:
          'Constituency boundaries had remained virtually unchanged since the Middle Ages, preserving aristocratic landowner dominance.',
        therefore:
          'The electoral system was widely condemned as an unrepresentative, corrupt oligarchy that ignored industrial reality.',
      },
      {
        step: 2,
        date: '1831–1832',
        title: 'The Reform Crisis & The Days of May',
        actor: 'Earl Grey, Francis Place & Bristol Rioters',
        tag: '🔥 POPULAR REVOLT',
        para_ref: '[5.2]',
        question:
          'How did public rebellion and economic panic force the passage of the 1832 Great Reform Act?',
        trigger:
          'Lords rejection of reform sparked violent riots in Bristol and a national bank run withdrawing £1.6 million in gold sovereigns.',
        desc: '[5.2] Lords rejection of reform sparked violent riots in Bristol and a national bank run withdrawing £1.6 million in gold sovereigns.',
        connective:
          'Brought Britain to the edge of financial collapse and revolution, forcing King William IV and Tory lords to surrender.',
        because:
          'Middle-class organizers threatened economic strikes while working-class crowds burned down bishops’ palaces and prisons.',
        therefore:
          'The monarch promised to create hundreds of new peers, compelling the House of Lords to pass the Reform Bill.',
      },
      {
        step: 3,
        date: '1832',
        title: 'The 1832 Reform Act & The "Great Betrayal"',
        actor: 'Middle-Class Electorate & Excluded Workers',
        tag: '📜 1832 REFORM ACT',
        para_ref: '[5.3]',
        question:
          'Which industrial cities were granted MPs, and why did workers call the Act the "Great Betrayal"?',
        trigger:
          'The 1832 Act abolished 56 rotten boroughs and enfranchised industrial cities, but restricted the vote to wealthy £10 householders.',
        desc: '[5.3] The 1832 Act abolished 56 rotten boroughs and enfranchised industrial cities, but restricted the vote to wealthy £10 householders.',
        connective:
          'Enfranchised middle-class factory owners while deliberately shutting out the working-class labourers who fought for the reform.',
        because:
          'Whig politicians sought to cement middle-class support for the constitution while keeping poor workers disenfranchised.',
        therefore:
          'Disillusioned working-class reformers denounced the settlement as a "Great Betrayal," turning to militant political campaigning.',
      },
      {
        step: 4,
        date: '1838–1848',
        title: 'Chartism & The Six Points for Democracy',
        actor: 'William Lovett, Feargus O’Connor & Chartists',
        tag: '✊ THE PEOPLE’S CHARTER',
        para_ref: '[5.4]',
        question: 'How did the Chartist movement unite millions of workers behind the Six Points?',
        trigger:
          'Working-class leaders drafted the People’s Charter, demanding universal male suffrage, the secret ballot, and salaries for MPs.',
        desc: '[5.4] Working-class leaders drafted the People’s Charter, demanding universal male suffrage, the secret ballot, and salaries for MPs.',
        connective:
          'Mobilized millions behind monster petitions of over three million signatures, creating Britain’s first mass working-class party.',
        because:
          'Workers realized that factory acts, wage protections, and social justice could only be achieved through parliamentary power.',
        therefore:
          'Although Parliament repeatedly rejected the petitions, Chartism permanently trained generations of working-class democratic leaders.',
      },
      {
        step: 5,
        date: '1872',
        title: 'The 1872 Secret Ballot Act',
        actor: 'William Gladstone & Pontefract Electors',
        tag: '🗳️ SECRET BALLOT',
        para_ref: '[5.5]',
        question:
          'How did the 1872 Secret Ballot Act at Pontefract destroy landlord political coercion?',
        trigger:
          'Parliament abolished open hustings and introduced confidential paper voting in private booths, sealed with wax at Pontefract.',
        desc: '[5.5] Parliament abolished open hustings and introduced confidential paper voting in private booths, sealed with wax at Pontefract.',
        connective:
          'Destroyed landlord and employer electoral intimidation, allowing working men to vote freely without fear of eviction or dismissal.',
        because:
          'Open voting allowed wealthy elites to bribe voters with alcohol or punish tenants who refused to back the landlord’s choice.',
        therefore:
          'The Secret Ballot Act completed a vital democratic pillar, establishing the private voting rights enjoyed in Britain today.',
      },
    ],
  };

  l5.timeline_anchor = l5.causal_domino_spine.stages.map((s) => ({
    date: s.date,
    title: s.title,
    desc: s.trigger,
  }));

  l5.workbook_stages = [
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
        'Why did critics condemn rotten boroughs like Old Sarum while industrial cities like Manchester had no MPs?',
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
        'How did the Bristol riots and the "Days of May" run on gold force the House of Lords to pass the 1832 Reform Act?',
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
        'Why did the £10 property qualification enfranchise middle-class factory masters but lead workers to call it the Great Betrayal?',
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
        'How did the People’s Charter unite millions behind demands for universal male suffrage, equal constituencies, and paid MPs?',
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
        'How did the secret ballot at Pontefract end public voting intimidation and landlord bribery?',
    },
  ];

  l5.narrative_blocks = [
    {
      act: 1,
      title: 'Act 1: The Rotten Oligarchy: Old Sarum & The Unrepresented Cities (1800–1830)',
      theme_heading:
        'Act 1: The Rotten Oligarchy: Old Sarum & The Unrepresented Cities (1800–1830)',
      text: '<span class="para-ref">[5.1]</span> In 1830, Britain claimed to be the cradle of parliamentary liberty, but less than 5% of adult males could vote. Parliamentary seats were frozen in a medieval time warp. Dozens of <strong class="vocab-highlight">rotten boroughs</strong> <small class="vocab-gloss">(depopulated boroughs controlled by wealthy aristocratic patrons)</small> sent two MPs to Westminster: Old Sarum in Wiltshire was a deserted grass mound with three houses and seven voters, while Dunwich had eroded into the North Sea. In contrast, colossal industrial powerhouses like Manchester, Birmingham, and Leeds, home to over a million combined factory workers and merchants, did not have a single Member of Parliament.',
      tasks: orig_l5.narrative_blocks[0].tasks,
      source: orig_l5.narrative_blocks[0].source,
    },
    {
      act: 2,
      title: 'Act 2: Bristol in Flames & The Days of May (1831–1832)',
      theme_heading: 'Act 2: Bristol in Flames & The Days of May (1831–1832)',
      text: '<span class="para-ref">[5.2]</span> When the unelected House of Lords rejected the Whig government\'s Reform Bill in October 1831, revolutionary rioting engulfed the country. In Bristol, a furious crowd burned the Bishop\'s Palace, the Mansion House, and three gaols to ashes. During the tense <strong>"Days of May"</strong> in 1832, radical reformer Francis Place coordinated a financial strike, distributing posters reading <em>"To stop the Duke, go for gold!"</em> Panic-stricken citizens withdrew £1.6 million in gold sovereigns from the Bank of England in days. Faced with imminent economic paralysis and armed uprising, King William IV agreed to flood the House of Lords with pro-reform peers, forcing the Tories to surrender and pass the Bill.',
      tasks: orig_l5.narrative_blocks[1].tasks,
      source: orig_l5.narrative_blocks[1].source,
    },
    {
      act: 3,
      title: 'Act 3: The 1832 Great Reform Act: Triumph or "Great Betrayal"? (1832)',
      theme_heading: 'Act 3: The 1832 Great Reform Act: Triumph or "Great Betrayal"? (1832)',
      text: '<span class="para-ref">[5.3]</span> The landmark <strong>1832 Great Reform Act</strong> disenfranchised 56 rotten boroughs and redistributed 143 parliamentary seats to booming industrial cities like Manchester, Sheffield, and Newcastle. It expanded the electorate by 50% to roughly 800,000 men. However, the vote was strictly restricted to men occupying property worth £10 or more in rent annually. This deliberately enfranchised the prosperous middle-class factory owners while completely excluding the working class whose street protests had secured the victory. Bitterly betrayed, mill workers and handloom weavers denounced the Act as the "Great Betrayal," realizing that power had merely shifted from feudal landowners to capitalist mill owners.',
      tasks: orig_l5.narrative_blocks[2].tasks,
      source: orig_l5.narrative_blocks[2].source,
    },
    {
      act: 4,
      title: 'Act 4: The People’s Charter: Six Points for Working-Class Power (1838–1848)',
      theme_heading: 'Act 4: The People’s Charter: Six Points for Working-Class Power (1838–1848)',
      text: '<span class="para-ref">[5.4]</span> Outraged by exclusion, cabinetmaker William Lovett and radical reformers drafted the <strong>People’s Charter of 1838</strong>, igniting the massive <strong class="vocab-highlight">Chartist movement</strong>. Chartists demanded the famous <strong>Six Points</strong>: universal male suffrage, the secret ballot, no property qualifications for MPs, salaries for MPs, equal constituencies, and annual parliaments. In 1839, 1842, and 1848, Chartists presented colossal monster petitions to Parliament—the 1842 petition bearing 3.3 million signatures, stretched for six miles through London. Although Parliament contemptuously rejected every petition and arrested leaders, Chartism created Britain\'s first unified mass working-class political identity.',
    },
    {
      act: 5,
      title: 'Act 5: The Secret Ballot Act: The Death of Landlord Coercion (1872)',
      theme_heading: 'Act 5: The Secret Ballot Act: The Death of Landlord Coercion (1872)',
      text: '<span class="para-ref">[5.5]</span> Under the unreformed system, voting took place on open wooden platforms called "hustings." Voters stood before shouting crowds, publicly declaring their choice to election clerks. Landlords and factory bosses routinely evicted tenants or fired workers who voted against the master\'s favoured candidate, while drunken mobs were paid in gin to intimidate rivals. In 1872, Gladstone\'s Liberal government passed the historic <strong>Secret Ballot Act</strong>. Tested at the Pontefract by-election in August 1872, voters cast confidential paper ballots stamped in private wooden booths and sealed with liquorice wax (<span class="archival-meta-tag">Source D</span>). By liberating electors from employer intimidation, the secret ballot laid the true foundation of modern British democracy.',
      tasks: orig_l5.narrative_blocks[3].tasks,
      source: orig_l5.narrative_blocks[3].source,
    },
  ];

  // Output formatting:
  const newContent = `const industrialisation_and_empire = ${JSON.stringify(unit, null, 2)};\n\nexport default industrialisation_and_empire;\n`;
  fs.writeFileSync(dataJsPath, newContent, 'utf8');
  console.log('✅ Successfully wrote upgraded data.js for industrialisation_and_empire!');
}

upgrade().catch((err) => {
  console.error('❌ Error during upgrade:', err);
  process.exit(1);
});
