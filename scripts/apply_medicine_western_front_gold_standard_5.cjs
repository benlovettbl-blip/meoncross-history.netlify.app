/**
 * History Revision Hub — Edexcel GCSE Medicine Through Time
 * Migration: Key Topic 5 (The British Sector of the Western Front, 1914–1918) to Gold Standard 5 Acts
 *
 * Converts Key Topic 5 lessons 5.1 through 5.6 (lessons 20–25) in units/edexcel_medicine/data.js:
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

const KT5_5_ACT_DATA = {
  lesson_5_1: {
    teacher_notes: {
      primer:
        'This enquiry explores the environmental, geological, and architectural realities of the British sector of the Western Front in Flanders and northern France between 1914 and 1918, examining how low-lying clay, shallow water tables, zig-zag trench engineering, subterranean chalk caverns at Arras, and mass-casualty offensives at the Somme and Cambrai dictated medical evacuation and care.',
      objectives: [
        {
          objective:
            'Explain how the low-lying topography and clay geology of the Ypres Salient created an acute medical and logistical crisis.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that the Ypres Salient was a vulnerable bulge overlooked by German artillery on Messines Ridge, where dense clay and high water tables prevented deep trench construction and caused liquid mud that threatened wounded men with drowning.',
          question:
            'Why was the low-lying topography of Ypres a tactical and medical nightmare for the British Expeditionary Force?',
        },
        {
          objective:
            'Analyse how the architectural design of zig-zag traverses limited shrapnel injuries and localized shell explosions.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Aerial Reconnaissance Photograph). Guide them to identify the saw-tooth geometry designed to contain high-explosive blasts and prevent enfilade rifle fire along the firebays.',
          question:
            'How did the saw-tooth zig-zag design of trenches prevent artillery blasts and enfilade machine-gun fire from clearing entire sections of trench?',
        },
        {
          objective:
            'Examine why communication trenches created severe bottlenecks for stretcher bearers and casualty evacuation.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source B (Flooded Communication Trench). Highlight the four-tier trench system and how narrow, waterlogged ditches jammed with incoming troops made stretcher transport agonizingly slow.',
          question:
            'Why did narrow, flooded communication trenches make the rapid evacuation of wounded casualties so difficult and dangerous?',
        },
        {
          objective:
            'Evaluate the strategic and medical significance of the subterranean chalk caverns and Thompson’s Cave hospital at Arras.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Contrast the dry, permeable chalk geology of Arras with the waterlogged clay of Flanders, detailing how miners constructed a 700-bed underground hospital with electricity and running water.',
          question:
            'How did the dry chalk geology at Arras allow the RAMC to construct safe, sterile surgical operating conditions underground?',
        },
        {
          objective:
            'Assess how mass-casualty battles at the Somme and Cambrai forced the RAMC to revolutionize trauma evacuation logistics.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast the catastrophic collapse of evacuation on 1 July 1916 (57,470 casualties on day one) with the mechanized innovations, advance surgical units, and forward blood depots deployed at Cambrai in 1917.',
          question:
            'Why did the overwhelming volume of casualties at the Somme force the British military to transform its medical evacuation system?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Aerial Reconnaissance Photograph of British Trench System near Ypres (1917). Official military aerial photograph taken by the Royal Flying Corps over the British sector near Ypres in 1917, showing the intricate saw-tooth zig-zag traverses of frontline, support, and communication trenches criss-crossed with artillery shell craters. Hinge Question: How does the saw-tooth zig-zag design of the trenches shown in Source A explain why artillery shrapnel and enfilade fire were prevented from wiping out an entire platoon in a single blast?',
        'Source B':
          'Source B: Photograph of a Flooded Communication Trench in the Ypres Salient (1917). Official British Army photograph taken by Lieutenant Ernest Brooks in Flanders during the Third Battle of Ypres (Passchendaele) in 1917, showing British infantrymen wading through waist-deep liquid mud over submerged duckboards. Hinge Question: Why did the deep mud and flooded conditions shown in Source B make stretcher evacuation through communication trenches a life-threatening obstacle for wounded soldiers?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Flanders Terrain & The Ypres Salient (1914–1915)',
        theme_heading: 'Act 1: Flanders Terrain & The Ypres Salient (1914–1915)',
        text: '<span class="para-ref">[1.1]</span> In August 1914, the British Expeditionary Force (BEF) deployed to France expecting a war of rapid movement, sweeping cavalry maneuvers, and decisive open-field engagements. However, the lethal reality of modern industrialized firepower immediately shattered these nineteenth-century tactical assumptions. Heavy breech-loading artillery firing high-explosive shells, combined with rapid-firing Vickers machine guns capable of discharging 500 rounds per minute, rendered open infantry advances suicidal. Following the Battle of the Marne and the "Race to the Sea," both armies attempted to outflank each other northwards until they collided with the Belgian coast, establishing a static front line defending the vital Channel ports of Boulogne, Calais, and Dunkirk—the logistical lifeline through which fresh troops, ammunition, food, and medical supplies flowed from Britain.<br><br><span class="para-ref">[1.2]</span> The most contested and deadly sector held by British forces was the <strong>Ypres Salient</strong> in West Flanders. A "salient" is an outward military bulge into enemy territory, surrounded on three sides. At Ypres, the German army held the higher surrounding crescent of ridges (including Messines and Passchendaele), giving them commanding artillery observation over every British movement in the low-lying basin below. Geologically, Flanders consisted of dense, impermeable clay with a water table just two to three feet beneath the surface. When relentless artillery bombardments pulverized the ancient agricultural drainage dykes, the ground liquefied into an ocean of putrid mud. British frontline trenches could rarely be dug more than two feet deep; instead, soldiers were forced to pile sandbags into raised breastworks above ground level, exposed to constant artillery fire and the threat of drowning in liquid mud.',
      },
      {
        act: 2,
        title: 'Act 2: Trench Architecture & Zig-Zag Traverses (1914–1918)',
        theme_heading: 'Act 2: Trench Architecture & Zig-Zag Traverses (1914–1918)',
        source: {
          id: 'source_a_aerial_trench_ypres',
          letter: 'A',
          title:
            'Source A: Aerial Reconnaissance Photograph of British Trench System near Ypres (1917)',
          src: '/images/aerial_trench_ypres.jpg',
          source: '/images/aerial_trench_ypres.jpg',
          image: '/images/aerial_trench_ypres.jpg',
          caption:
            'Royal Flying Corps aerial photograph showing the intricate zig-zag traverses of frontline, support, and communication trenches near Ypres, criss-crossed with artillery shell craters.',
          desc: 'Official military aerial reconnaissance photograph of British trench network near Ypres.',
          provenance:
            'Official military aerial photograph taken by the Royal Flying Corps, British Sector near Ypres, 1917. Imperial War Museum Collection.',
          citation:
            'Royal Flying Corps Photographic Section, Western Front near Ypres, 1917 (IWM Collection).',
          question:
            'How does the saw-tooth zig-zag design of the trenches shown in Source A explain why artillery shrapnel and enfilade fire were prevented from wiping out an entire platoon in a single blast?',
          hinge_question:
            'How does the saw-tooth zig-zag design of the trenches shown in Source A explain why artillery shrapnel and enfilade fire were prevented from wiping out an entire platoon in a single blast?',
          source_context:
            'Official military aerial photograph taken by the Royal Flying Corps over the British sector near Ypres in 1917, showing the intricate saw-tooth zig-zag traverses of frontline, support, and communication trenches criss-crossed with artillery shell craters. Hinge Question: How does the saw-tooth zig-zag design of the trenches shown in Source A explain why artillery shrapnel and enfilade fire were prevented from wiping out an entire platoon in a single blast?',
          context:
            'Official military aerial photograph taken by the Royal Flying Corps over the British sector near Ypres in 1917, showing the intricate saw-tooth zig-zag traverses of frontline, support, and communication trenches criss-crossed with artillery shell craters.',
        },
        text: '<span class="para-ref">[2.1]</span> By late 1914, soldiers dug into the earth to escape the devastating hail of high-explosive artillery shrapnel and machine-gun fire. What began as shallow rifle pits evolved into an elaborate defensive earthwork system extending over 400 miles from the English Channel to the Swiss border. Frontline trenches were engineered with precise structural features: a raised <em>firestep</em> allowed sentries to look over the parapet into No Man’s Land; thick revetments of wood, corrugated iron, and wire netting prevented trench walls from collapsing; and wooden <em>duckboards</em> were laid along trench floors to keep soldiers’ boots out of stagnant, contaminated water.<br><br><span class="para-ref">[2.2]</span> Crucially, British trenches were never dug in long, straight lines. To prevent an enemy attacker or enfilade machine gun from sweeping down the entire length of a trench, engineers designed frontline trenches with sharp, alternating right-angled bends called <strong>traverses</strong>. Aerial reconnaissance photographs (<span class="archival-meta-tag">Source A</span>) clearly reveal this distinctive saw-tooth geometry. Traverses divided the trench into short, isolated ten-yard compartments known as firebays. When an incoming high-explosive artillery shell detonated, the sharp earthen blast walls absorbed the supersonic concussion and contained hot flying metal fragments within that single bay, preventing shrapnel from slaughtering men in adjoining bays.',
      },
      {
        act: 3,
        title: 'Act 3: Trench System & Evacuation Bottlenecks (1915–1918)',
        theme_heading: 'Act 3: Trench System & Evacuation Bottlenecks (1915–1918)',
        source: {
          id: 'source_b_flooded_trench',
          letter: 'B',
          title:
            'Source B: Photograph of a Flooded Communication Trench in the Ypres Salient (1917)',
          src: '/images/gw_flooded_trench.jpg',
          source: '/images/gw_flooded_trench.jpg',
          image: '/images/gw_flooded_trench.jpg',
          caption:
            'British soldiers navigating a communication trench submerged in muddy water during the Third Battle of Ypres (Passchendaele), showing duckboards floating and collapsed trench revetments.',
          desc: 'Official British Army photograph of soldiers wading through a flooded communication trench in Flanders.',
          provenance:
            'Official British Army photograph taken by Lieutenant Ernest Brooks, Western Front, Flanders, 1917. Imperial War Museum Collection (Shelfmark: Q 5935).',
          citation:
            'Lt. Ernest Brooks, Official British War Office Photograph, Flanders, 1917 (IWM Q 5935).',
          question:
            'Why did the deep mud and flooded conditions shown in Source B make stretcher evacuation through communication trenches a life-threatening obstacle for wounded soldiers?',
          hinge_question:
            'Why did the deep mud and flooded conditions shown in Source B make stretcher evacuation through communication trenches a life-threatening obstacle for wounded soldiers?',
          source_context:
            'Official British Army photograph taken by Lieutenant Ernest Brooks in Flanders during the Third Battle of Ypres (Passchendaele) in 1917, showing British infantrymen wading through waist-deep liquid mud over submerged duckboards. Hinge Question: Why did the deep mud and flooded conditions shown in Source B make stretcher evacuation through communication trenches a life-threatening obstacle for wounded soldiers?',
          context:
            'Official British Army photograph taken by Lieutenant Ernest Brooks in Flanders during the Third Battle of Ypres (Passchendaele) in 1917, showing British infantrymen wading through waist-deep liquid mud over submerged duckboards.',
        },
        text: '<span class="para-ref">[3.1]</span> The British defensive line was arranged in four parallel tiers of depth. Nearest the enemy lay the <em>frontline trench</em> (50 to 200 yards from German lines), backed approximately 80 yards behind by the <em>support trench</em>, which housed reserve troops ready to reinforce the firestep during an assault. Several hundred yards further back lay the <em>reserve trench</em>, containing counter-attack battalions, supply depots, and battalion headquarters. Connecting these parallel tiers from front to rear were deep, winding <strong>communication trenches</strong>, through which relief troops, ammunition, hot rations, and medical supplies were transported under cover.<br><br><span class="para-ref">[3.2]</span> While communication trenches provided protection from direct rifle fire, they created acute logistical and medical bottlenecks. Communication trenches were exceedingly narrow—often barely wide enough for a single soldier carrying full kit. In rainy weather, drainage failed, submerging trenches in waist-deep liquid mud and turning duckboards into floating rafts (<span class="archival-meta-tag">Source B</span>). For Royal Army Medical Corps (RAMC) stretcher bearers, maneuvering rigid six-foot wooden stretchers around dozens of sharp right-angled traverses while squeezing past oncoming reinforcements was agonizingly slow. Evacuating a single haemorrhaging casualty often took six to eight exhausting hours, turning treatable flesh wounds into lethal cases of hypothermic shock and sepsis before the patient could reach a doctor.',
      },
      {
        act: 4,
        title: 'Act 4: Thompson’s Cave & The Arras Underground Hospital (Nov 1916–1917)',
        theme_heading: 'Act 4: Thompson’s Cave & The Arras Underground Hospital (Nov 1916–1917)',
        text: '<span class="para-ref">[4.1]</span> In striking contrast to the waterlogged clay of Flanders, the terrain around the historic city of <strong>Arras</strong> in northern France was underlain by dry, permeable chalk. Centred on ancient Roman and medieval chalk quarries (known locally as <em>boves</em>), the British military discovered an extraordinary geological opportunity. In late 1916, ahead of the planned spring 1917 offensive, the British and New Zealand Tunnelling Corps were deployed to link these cavernous chalk quarries with miles of newly excavated subterranean tunnels, creating a hidden underground city capable of sheltering 25,000 soldiers within striking distance of the German lines.<br><br><span class="para-ref">[4.2]</span> Within this subterranean labyrinth, the RAMC constructed an immense, fully equipped underground medical complex known as <strong>Thompson’s Cave</strong>. Connected directly to the front line by covered chalk saps, this underground dressing station and hospital housed 700 hospital beds, operating theatres, rest stations, a mortuary, and a kitchen. Fitted with electric lighting, piped running water, and ventilation shafts, Thompson’s Cave operated entirely immune to surface artillery bombardment. Surgeons performed emergency debridement and stabilized severe casualties in dry, warm, and sterile conditions—an unprecedented achievement that demonstrated how the British Army exploited local geology to protect medical care.',
      },
      {
        act: 5,
        title: 'Act 5: Mass Trauma: The Somme & Cambrai (1916–1917)',
        theme_heading: 'Act 5: Mass Trauma: The Somme & Cambrai (1916–1917)',
        text: '<span class="para-ref">[5.1]</span> The scale of medical trauma on the Western Front was defined by massive, set-piece battles. On 1 July 1916—the catastrophic opening day of the <strong>Battle of the Somme</strong>—the British Army suffered 57,470 casualties, including 19,240 killed, as infantry advanced across rolling chalk downland against uncut barbed wire and fortified German machine-gun nests. The sheer tidal wave of wounded men completely overwhelmed the existing evacuation chain: frontline aid posts ran out of morphine and bandages, motor ambulances broke down on rutted roads, and thousands of casualties lay on open stretchers in clearing station fields for days awaiting emergency surgery.<br><br><span class="para-ref">[5.2]</span> The crisis of the Somme forced the British High Command and the RAMC to revolutionize their operational methods. By November 1917 at the <strong>Battle of Cambrai</strong>, where 450 British tanks broke through the Hindenburg Line on unbroken chalk ground, the medical service had evolved into a sophisticated, mechanized trauma pipeline. The RAMC deployed advance surgical teams closer to the front line, expanded fleets of motorized field ambulances, coordinated dedicated hospital trains, and established forward blood depot banks. From the flooded quagmires of Ypres to the chalk fortresses of Arras and the carnage of the Somme, the geography of the Western Front was the relentless crucible that forged modern emergency trauma medicine.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1914–1915',
        para_ref: '[1.1–1.2]',
        heading: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
        bullets: [
          'Digging into sticky wet clay',
          'Heavy artillery breaking water canals',
          'Wounded men sinking into knee-deep mud',
        ],
        focus_clue: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
      },
      {
        step: 2,
        date: '1914–1918',
        para_ref: '[2.1–2.2]',
        heading: 'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
        bullets: [
          'Digging sharp zig-zag corners into earth',
          'Laying wooden duckboards over smelly puddles',
          'Stacking sandbags high on front firing steps',
        ],
        focus_clue:
          'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
      },
      {
        step: 3,
        date: '1915–1918',
        para_ref: '[3.1–3.2]',
        heading: 'Why did narrow communication trenches create acute bottlenecks for stretchers?',
        bullets: [
          "Guarding firing steps facing No Man's Land",
          'Squeezing wooden stretchers along narrow passages',
          'Crawling through listening saps near enemy barbed wire',
        ],
        focus_clue:
          'Why did narrow communication trenches create acute bottlenecks for stretchers?',
      },
      {
        step: 4,
        date: 'Nov 1916–1917',
        para_ref: '[4.1–4.2]',
        heading: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
        bullets: [
          'Carving hospital wards deep into dry white chalk',
          'Wiring electric light bulbs and water pipes',
          'Treating seven hundred beds safely underground',
        ],
        focus_clue: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
      },
      {
        step: 5,
        date: '1916–1917',
        para_ref: '[5.1–5.2]',
        heading: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
        bullets: [
          'Fifty-seven thousand men falling on first morning',
          'Driving heavy metal tanks over chalk slopes',
          'Overworked medical orderly lines facing endless stretchers',
        ],
        focus_clue: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
      },
    ],
    causal_domino_spine: {
      title: 'The Theatre of War: The British Sector, Trench Geography & Battles',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1915',
          para_ref: '[1.1–1.2]',
          title: 'Flanders Terrain & Ypres Salient',
          actor: 'British Expeditionary Force & Royal Engineers',
          tag: '🌧️ FLANDERS WATER TABLE',
          trigger:
            'The Ypres Salient was surrounded on three sides by German artillery occupying higher ground on Messines Ridge, with low-lying clay soil and a water table just inches below the surface.',
          desc: 'The Ypres Salient was surrounded on three sides by German artillery occupying higher ground on Messines Ridge, with low-lying clay soil and a water table just inches below the surface.',
          connective:
            'Constant artillery bombardment smashed ancient drainage dykes, turning trenches into treacherous liquid quagmires where wounded soldiers risked drowning in mud.',
          question: 'Why was the low-lying topography of Ypres a tactical and medical nightmare?',
        },
        {
          step: 2,
          date: '1914–1918',
          para_ref: '[2.1–2.2]',
          title: 'Trench Architecture & Traverses',
          actor: 'Frontline Infantrymen & Sappers',
          tag: '📐 ZIG-ZAG TRAVERSES',
          trigger:
            'Engineers designed frontline trenches with sharp, alternating 90-degree zig-zag traverses rather than straight continuous firebays.',
          desc: 'Engineers designed frontline trenches with sharp, alternating 90-degree zig-zag traverses rather than straight continuous firebays.',
          connective:
            'Prevented enfilade rifle fire along the trench and localized blast concussions and hot shrapnel balls within a single isolated section, saving dozens of lives.',
          question:
            'How did zig-zag traverses limit shrapnel injuries and contain shell explosions?',
        },
        {
          step: 3,
          date: '1915–1918',
          para_ref: '[3.1–3.2]',
          title: 'Trench System: Front to Rear',
          actor: 'RAMC Stretcher Bearers & Battalion Runners',
          tag: '🚧 COMMUNICATION BOTTLENECKS',
          trigger:
            'The Western Front system comprised frontline firing trenches, support lines 80 yards back, reserve lines, and narrow zig-zag communication trenches connecting to the rear.',
          desc: 'The Western Front system comprised frontline firing trenches, support lines 80 yards back, reserve lines, and narrow zig-zag communication trenches connecting to the rear.',
          connective:
            'Severe congestion from incoming troop columns, ammunition crates, and muddy right-angle corners created acute bottlenecks for stretcher bearers evacuating haemorrhaging casualties.',
          question:
            'Why did narrow communication trenches create acute bottlenecks for stretchers?',
        },
        {
          step: 4,
          date: 'Nov 1916–1917',
          para_ref: '[4.1–4.2]',
          title: 'Thompson’s Cave & Arras Tunnels',
          actor: 'New Zealand Tunnelling Corps & RAMC',
          tag: '⛏️ ARRAS UNDERGROUND HOSPITAL',
          trigger:
            'In late 1916, New Zealand and British miners connected ancient Roman chalk quarries beneath Arras, constructing Thompson’s Cave—a massive underground medical complex.',
          desc: 'In late 1916, New Zealand and British miners connected ancient Roman chalk quarries beneath Arras, constructing Thompson’s Cave—a massive underground medical complex.',
          connective:
            'Fitted with electric lighting, piped running water, and 700 hospital beds directly beneath enemy artillery range, providing dry, clean surgical operating conditions before the 1917 battle.',
          question: 'How did the chalk geology at Arras allow safe, sterile surgical conditions?',
        },
        {
          step: 5,
          date: '1916–1917',
          para_ref: '[5.1–5.2]',
          title: 'Mass Trauma: Somme & Cambrai',
          actor: 'RAMC Directors & Field Ambulances',
          tag: '💥 MASS CASUALTY ATTRITION',
          trigger:
            'Massive set-piece offensives like the Somme (57,000 British casualties on 1 July 1916) and Cambrai (November 1917) overwhelmed existing medical clearing lines.',
          desc: 'Massive set-piece offensives like the Somme (57,000 British casualties on 1 July 1916) and Cambrai (November 1917) overwhelmed existing medical clearing lines.',
          connective:
            'Forced the RAMC to expand motor ambulance convoys, deploy advance surgical teams closer to the line, and integrate railway hospital trains into the evacuation timetable.',
          question: 'Why did mass-casualty offensives force the RAMC to reorganize evacuation?',
        },
      ],
    },
  },

  lesson_5_2: {
    teacher_notes: {
      primer:
        'This enquiry investigates non-combat environmental health hazards on the Western Front, exploring the physiological pathology and command discipline of trench foot, the entomology and transmission of trench fever by body lice, water purification methods against dysentery, and the clinical recognition and psychological treatment of shell shock.',
      objectives: [
        {
          objective:
            'Explain how prolonged immersion in freezing mud destroyed tissue and produced gangrene.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that trench foot was caused by vasoconstriction from tight puttees and continuous cold water immersion (even above freezing), leading to hypoxia, necrosis, and moist gangrene.',
          question:
            'How did prolonged cold water immersion and tight puttees combine to destroy living tissue and cause trench foot?',
        },
        {
          objective:
            'Analyse why mandatory officer inspections and whale oil discipline succeeded in conquering trench foot.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Cheshire Regiment resting in trench). Guide them to discuss the "buddy system," three pairs of clean socks, raised duckboards, and the disciplinary consequences for neglect.',
          question:
            'Why did mandatory officer inspections and military discipline succeed in reducing trench foot where voluntary medical advice had failed?',
        },
        {
          objective:
            'Examine the transmission of trench fever by body lice and the deployment of steam delousing plants.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Clarify that lice faeces rubbed into scratched skin transmitted Bartonella quintana, causing debilitating shin-bone pains that incapacitated thousands until steam "Serbian barrels" were introduced.',
          question:
            'Why did trench fever incapacitate so many soldiers until the body louse insect vector was scientifically proven in 1918?',
        },
        {
          objective:
            'Evaluate how RAMC sanitary sections and water chlorination prevented catastrophic dysentery epidemics.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Ramparts Medical Station at Ypres). Emphasize how latrines treated with chloride of lime and chemically chlorinated water carts kept infectious deaths under 10% of total fatalities.',
          question:
            'How did strict sanitary policing and chemical water chlorination prevent lethal dysentery epidemics on the Western Front?',
        },
        {
          objective:
            'Assess how psychiatric trauma (shell shock) evolved from being stigmatized as cowardice to clinical medical treatment.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Detail Dr Charles Myers coining "shell shock," the official classification as "Not Yet Diagnosed, Nervous" (NYDN), and forward rest centres and hospitals like Craiglockhart.',
          question:
            'Why was shell shock initially punished as military cowardice before being recognized and treated as a medical psychiatric injury?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Soldiers of the Cheshire Regiment Resting in a Frontline Trench at Ovillers (1916). Official British War Office photograph taken by Lieutenant John Warwick Brooke during the Battle of the Somme in July 1916, showing infantrymen of ‘A’ Company, 11th Battalion, Cheshire Regiment, resting wrapped in waterproof groundsheets on duckboards in a captured trench. Hinge Question: How does Source A illustrate both the harsh environmental conditions of trench life and the practical measures, such as groundsheets and raised duckboards, adopted to protect soldier health?',
        'Source B':
          'Source B: Photograph of the Ramparts Underground Medical Dressing Station, Ypres (c.1916). Official British military photograph taken in the Ypres sector, c.1916, showing RAMC medical orderlies and stretcher bearers outside the subterranean vaulted brick entrance of the Ramparts Dressing Station built into 17th-century fortifications. Hinge Question: Why did fortified subterranean medical stations like the Ramparts at Ypres shown in Source B provide essential protection against both shellfire and the unsanitary environmental filth of surface trenches?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: The Flanders Water Table & Trench Foot Pathology (1914–1915)',
        theme_heading: 'Act 1: The Flanders Water Table & Trench Foot Pathology (1914–1915)',
        text: '<span class="para-ref">[1.1]</span> The physical geography of northern France and Flanders exerted a relentless, hostile pressure on the health of the British Army. The coastal plains of Belgium and northern France were naturally low-lying, reclaimed marshland underlain by impermeable, dense clay. Beneath the soil, the water table sat mere feet below the surface. Before 1914, this rich agricultural land was maintained by an intricate, fragile system of underground ceramic drainage pipes, roadside ditches, and drainage dykes. Millions of high-explosive artillery shells systematically pulverized this drainage infrastructure, turning the topsoil into a liquid soup of putrid mud.<br><br><span class="para-ref">[1.2]</span> For British soldiers stationed in the trenches, standing in cold, stagnant water was an inescapable reality of daily life. In winter, temperatures regularly plunged below freezing, chilling the mud to ice. Furthermore, soldiers wore tight woollen puttees—long fabric strips wrapped tightly around the calves and ankles from the boot to the knee. When drenched in freezing mud, the wool shrank, acting as an unintended tourniquet that severely restricted peripheral blood flow to the lower extremities. By November 1914, medical officers noted an alarming epidemic: thousands of men were reporting to medical dugouts unable to walk, their feet swollen, numb, and drained of color.',
      },
      {
        act: 2,
        title: 'Act 2: Preventive Discipline: Whale Oil & The Buddy System (1915–1918)',
        theme_heading: 'Act 2: Preventive Discipline: Whale Oil & The Buddy System (1915–1918)',
        source: {
          id: 'source_a_cheshire_regiment_trench',
          letter: 'A',
          title:
            'Source A: Soldiers of the Cheshire Regiment Resting in a Frontline Trench at Ovillers (1916)',
          src: '/images/cheshire_regiment_trench.png',
          source: '/images/cheshire_regiment_trench.png',
          image: '/images/cheshire_regiment_trench.png',
          caption:
            'British infantrymen of ‘A’ Company, 11th Battalion, Cheshire Regiment, resting wrapped in waterproof groundsheets on the duckboards and dugouts of a captured trench at Ovillers-la-Boisselle, while a sentry remains on duty on the parapet.',
          desc: 'Official British War Office photograph taken during the Battle of the Somme, July 1916.',
          provenance:
            'Official British War Office photograph taken by Lieutenant John Warwick Brooke during the Battle of the Somme, July 1916. Imperial War Museum Collection.',
          citation:
            'Lt. John Warwick Brooke, Official British War Office Photograph, Somme, July 1916 (IWM Collection).',
          question:
            'How does Source A illustrate both the harsh environmental conditions of trench life and the practical measures, such as groundsheets and raised duckboards, adopted to protect soldier health?',
          hinge_question:
            'How does Source A illustrate both the harsh environmental conditions of trench life and the practical measures, such as groundsheets and raised duckboards, adopted to protect soldier health?',
          source_context:
            'Official British War Office photograph taken by Lieutenant John Warwick Brooke during the Battle of the Somme in July 1916, showing infantrymen of ‘A’ Company, 11th Battalion, Cheshire Regiment, resting wrapped in waterproof groundsheets on duckboards in a captured trench. Hinge Question: How does Source A illustrate both the harsh environmental conditions of trench life and the practical measures, such as groundsheets and raised duckboards, adopted to protect soldier health?',
          context:
            'Official British War Office photograph taken by Lieutenant John Warwick Brooke during the Battle of the Somme in July 1916, showing infantrymen of ‘A’ Company, 11th Battalion, Cheshire Regiment, resting wrapped in waterproof groundsheets on duckboards in a captured trench.',
        },
        text: '<span class="para-ref">[2.1]</span> <strong>Trench Foot</strong> was a clinical condition caused by prolonged exposure to cold, damp, and unsanitary conditions, aggravated by poor circulation. Unlike frostbite, which occurs at sub-zero temperatures, trench foot developed in temperatures up to 15°C (60°F) if feet remained continuously immersed for over twelve hours. The cold caused peripheral vasoconstriction, starving skin and muscle tissue of oxygen. Feet became pale, cold, and numb; as circulation failed, the skin turned mottled blue, then necrotic black. If left untreated, secondary bacterial infections set in, leading to moist gangrene. To save the soldier’s life from fatal blood poisoning (septicemia), military surgeons had no choice but to amputate the necrotic toes or the entire foot.<br><br><span class="para-ref">[2.2]</span> During the harsh winter of 1914–1915, over 20,000 British soldiers were medically evacuated from the Western Front suffering from trench foot. Recognizing this colossal drain on fighting manpower, British High Command implemented ruthless preventive protocols. Combat units were issued barrels of <em>whale oil</em>—a thick, water-repellent animal grease. Soldiers were organized into mandatory "buddy pairs," inspecting each other’s feet daily, washing them in clean water, and vigorously rubbing them with whale oil to form a waterproof barrier (<span class="archival-meta-tag">Source A</span>). Every infantryman was required to carry three pairs of dry woollen socks, exchanging wet socks for dry ones twice daily. Units constructed raised wooden <em>duckboards</em> along trench floors to keep boots above stagnant water. Officers who permitted trench foot cases in their platoon faced severe disciplinary charges, transforming trench foot from an unavoidable medical malady into a punishable failure of military discipline.',
      },
      {
        act: 3,
        title: 'Act 3: Trench Fever, Body Lice & Delousing (1914–1918)',
        theme_heading: 'Act 3: Trench Fever, Body Lice & Delousing (1914–1918)',
        text: '<span class="para-ref">[3.1]</span> While trench foot assaulted the feet, a microscopic parasite besieged the body. <strong>Body lice</strong> (<em>Pediculus humanus corporis</em>) infested virtually every soldier on the Western Front. Living in the warm inner seams of woollen tunics and trousers, lice multiplied at an astonishing rate, laying pale eggs ("nits") in clothing fabric. Soldiers spent off-duty hours "chatting"—running candle flames along uniform seams to pop the lice. The constant itching caused severe sleep deprivation, but the primary medical danger was <strong>Trench Fever</strong> (Pyrexia of Unknown Origin). In 1918, medical researchers proved that trench fever was caused by the bacterium <em>Bartonella quintana</em>, transmitted through louse faeces. When soldiers scratched inflamed bite wounds, louse excrement was rubbed directly into the broken skin.<br><br><span class="para-ref">[3.2]</span> Trench fever caused sudden shivering, splitting headaches, severe aching in the shins, and recurring high fevers lasting up to a month, incapacitating up to 15% of an army’s strength at any one time. Because sick soldiers required weeks of hospitalization in base facilities, the disease created an intolerable logistical burden. To eliminate lice, the RAMC established extensive divisional <em>delousing stations</em> behind the lines. Uniforms were baked inside pressurized steam autoclaves known as "Serbian barrels" while soldiers bathed in hot carbolic baths. While these measures temporarily eradicated vermin, soldiers were frequently re-infested within days of returning to the muddy dugouts of the frontline.',
      },
      {
        act: 4,
        title: 'Act 4: Dysentery, Water Chlorination & Sanitary Sections (1914–1918)',
        theme_heading: 'Act 4: Dysentery, Water Chlorination & Sanitary Sections (1914–1918)',
        source: {
          id: 'source_b_ramparts_ww1',
          letter: 'B',
          title:
            'Source B: Photograph of the Ramparts Underground Medical Dressing Station, Ypres (c.1916)',
          src: '/images/ramparts_ww1.jpg',
          source: '/images/ramparts_ww1.jpg',
          image: '/images/ramparts_ww1.jpg',
          caption:
            'RAMC medical orderlies and stretcher bearers outside the subterranean vaulted brick entrance of the Ramparts Dressing Station, built deep into the 17th-century fortifications of Ypres.',
          desc: 'Official British military photograph of the Ramparts Dressing Station at Ypres, c.1916.',
          provenance:
            'Official British military photograph taken in the Ypres sector, c.1916. Imperial War Museum Collection (Shelfmark: Q 10762).',
          citation: 'Official British War Office Photograph, Ypres Sector, c.1916 (IWM Q 10762).',
          question:
            'Why did fortified subterranean medical stations like the Ramparts at Ypres shown in Source B provide essential protection against both shellfire and the unsanitary environmental filth of surface trenches?',
          hinge_question:
            'Why did fortified subterranean medical stations like the Ramparts at Ypres shown in Source B provide essential protection against both shellfire and the unsanitary environmental filth of surface trenches?',
          source_context:
            'Official British military photograph taken in the Ypres sector, c.1916, showing RAMC medical orderlies and stretcher bearers outside the subterranean vaulted brick entrance of the Ramparts Dressing Station built into 17th-century fortifications. Hinge Question: Why did fortified subterranean medical stations like the Ramparts at Ypres shown in Source B provide essential protection against both shellfire and the unsanitary environmental filth of surface trenches?',
          context:
            'Official British military photograph taken in the Ypres sector, c.1916, showing RAMC medical orderlies and stretcher bearers outside the subterranean vaulted brick entrance of the Ramparts Dressing Station built into 17th-century fortifications.',
        },
        text: '<span class="para-ref">[4.1]</span> In flooded, static trench networks, basic human sanitation was a continuous life-or-death battle. Contaminated mud, unburied corpses, and open latrines spawned dangerous outbreaks of <strong>dysentery</strong>—a virulent bacterial infection causing agonizing stomach cramps, fever, and severe bloody diarrhea. In the frontline, men were forced to defecate into open chloride of lime buckets or shallow latrine trenches. In summer, dense swarms of bluebottle flies fed on human excrement and unburied bodies before landing directly on soldiers’ rations of corned beef and hard biscuits, spreading bacillary dysentery across entire battalions.<br><br><span class="para-ref">[4.2]</span> To prevent catastrophic epidemics, the RAMC created specialized <em>Sanitary Sections</em>. These pioneer orderlies inspected latrines, enforced deep burial of refuse, and treated waste pits with quicklime (calcium oxide). Crucially, the RAMC enforced rigorous water purification: drinking water collected from shell craters or local rivers was chemically treated with <em>chloride of lime</em> (calcium hypochlorite) in mobile water carts, killing deadly cholera and typhoid bacilli. Furthermore, subterranean shelters like the <strong>Ramparts Medical Station</strong> at Ypres (<span class="archival-meta-tag">Source B</span>), carved deep inside seventeenth-century brick fortifications, provided clean, dry, protected underground wards, keeping infectious disease deaths below 10% of total casualties—a historic military record.',
      },
      {
        act: 5,
        title: 'Act 5: Shell Shock & Psychological Trauma (1914–1918)',
        theme_heading: 'Act 5: Shell Shock & Psychological Trauma (1914–1918)',
        text: '<span class="para-ref">[5.1]</span> In addition to physical diseases, the unrelenting violence of industrial high-explosive artillery bombardments triggered an unprecedented psychological catastrophe: <strong>Shell Shock</strong>. Soldiers subjected to days of continuous concussive shelling suffered catastrophic neurological and psychiatric collapses. Symptoms varied dramatically: severe uncontrollable physical tremors, hysterical blindness, sudden mutism, complete amnesia, sleep paralysis, and catatonic stupor. Coined by British psychologist Dr Charles Myers in 1915, the condition affected an estimated 80,000 British soldiers during the war, demonstrating that the human nervous system had broken down under mechanized industrial warfare.<br><br><span class="para-ref">[5.2]</span> Initially, British military authorities severely stigmatized shell shock as cowardice, malingering, or a lack of moral fiber; tragically, over 300 British soldiers suffering from acute trauma were executed by firing squad for "desertion." However, as thousands of frontline officers and decorated veterans succumbed to identical breakdowns, the Army shifted toward a medical model. Cases were officially designated as <strong>Not Yet Diagnosed, Nervous (NYDN)</strong> to prevent court-martials. Forward rest stations were established behind the lines to provide immediate warm food, clean dry clothes, and rest; approximately 70% of traumatized soldiers returned to duty within weeks. For severe cases, specialized recovery facilities like <em>Craiglockhart War Hospital</em> in Edinburgh pioneered psychotherapy, dream analysis, and humane compassionate care, laying the groundwork for modern clinical understanding of Post-Traumatic Stress Disorder (PTSD).',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1914–1915',
        para_ref: '[1.1–1.2]',
        heading: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
        bullets: [
          'Standing for days in freezing dirty water',
          'Toes turning numb, swollen, and bluish-black',
          'Surgeons sawing off rotting gangrene feet',
        ],
        focus_clue: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
      },
      {
        step: 2,
        date: '1915–1918',
        para_ref: '[2.1–2.2]',
        heading: 'Why did mandatory officer inspections succeed where voluntary advice had failed?',
        bullets: [
          'Pairs of soldiers rubbing fishy grease into toes',
          'Packing three dry woollen pairs in kits',
          'Officers holding daily morning foot inspections',
        ],
        focus_clue:
          'Why did mandatory officer inspections succeed where voluntary advice had failed?',
      },
      {
        step: 3,
        date: '1914–1918',
        para_ref: '[3.1–3.2]',
        heading:
          'Why did trench fever persist until the body louse insect vector was proven in 1918?',
        bullets: [
          'Scratching itchy insect bites along uniform seams',
          'High shaking chills and burning shin bone aches',
          'Steaming dirty woollen jackets in giant barrels',
        ],
        focus_clue:
          'Why did trench fever persist until the body louse insect vector was proven in 1918?',
      },
      {
        step: 4,
        date: '1914–1918',
        para_ref: '[4.1–4.2]',
        heading: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
        bullets: [
          'Violent stomach cramps from dirty swamp water',
          'Digging deep toilet pits far behind sleeping lines',
          'Throwing smelly white lime powder into waste trenches',
        ],
        focus_clue: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
      },
      {
        step: 5,
        date: '1914–1918',
        para_ref: '[5.1–5.2]',
        heading:
          'Why was shell shock initially stigmatised as cowardice before being treated medically?',
        bullets: [
          "Endless artillery thunder breaking soldiers' minds",
          'Men shaking uncontrollably and losing their speech',
          'Resting traumatised patients in quiet country hospitals',
        ],
        focus_clue:
          'Why was shell shock initially stigmatised as cowardice before being treated medically?',
      },
    ],
    causal_domino_spine: {
      title: 'The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1915',
          para_ref: '[1.1–1.2]',
          title: 'Trench Foot Pathology',
          actor: 'Frontline Infantry Soldiers',
          tag: '🦶 TRENCH FOOT PATHOLOGY',
          trigger:
            'Soldiers stood for consecutive days in sub-zero waterlogged trenches wearing tight puttees and wet boots, severely constricting capillary blood circulation.',
          desc: 'Soldiers stood for consecutive days in sub-zero waterlogged trenches wearing tight puttees and wet boots, severely constricting capillary blood circulation.',
          connective:
            'Caused severe numbness, tissue necrosis, and fungal rotting that frequently progressed to secondary gas gangrene, forcing surgeons to amputate thousands of feet in winter 1914–15.',
          question: 'How did prolonged cold water immersion destroy tissue and produce gangrene?',
        },
        {
          step: 2,
          date: '1915–1918',
          para_ref: '[2.1–2.2]',
          title: 'Prevention: Whale Oil & Socks',
          actor: 'Battalion Officers & The Buddy System',
          tag: '🧴 WHALE OIL DISCIPLINE',
          trigger:
            'The British Army issued waterproof duckboards, provided three pairs of clean dry socks per soldier, and mandated the pairing of soldiers in a daily "buddy system" to rub feet with water-repellent whale oil.',
          desc: 'The British Army issued waterproof duckboards, provided three pairs of clean dry socks per soldier, and mandated the pairing of soldiers in a daily "buddy system" to rub feet with water-repellent whale oil.',
          connective:
            'Backed by strict daily morning officer parades and threats of court martial for neglect, these preventive measures virtually eliminated trench foot casualties by 1917.',
          question:
            'Why did mandatory officer inspections succeed where voluntary advice had failed?',
        },
        {
          step: 3,
          date: '1914–1918',
          para_ref: '[3.1–3.2]',
          title: 'Trench Fever, Lice & Delousing',
          actor: 'Body Lice (Pediculus humanus) & RAMC Researchers',
          tag: '🪲 TRENCH FEVER DELOUSING',
          trigger:
            'Over 95% of British soldiers harboured body lice thriving in uniform seams, suffering debilitating bouts of shaking chills, headaches, and acute shin-bone pain (trench fever).',
          desc: 'Over 95% of British soldiers harboured body lice thriving in uniform seams, suffering debilitating bouts of shaking chills, headaches, and acute shin-bone pain (trench fever).',
          connective:
            'Incapacitated up to 15% of men at any one time until researchers proved lice excrement transmitted the disease in 1918, prompting the deployment of steam delousing "Serbian barrels".',
          question:
            'Why did trench fever persist until the body louse insect vector was proven in 1918?',
        },
        {
          step: 4,
          date: '1914–1918',
          para_ref: '[4.1–4.2]',
          title: 'Dysentery & Water Chlorination',
          actor: 'RAMC Sanitary Sections & Regimental Pioneers',
          tag: '💧 CHLORIDE OF LIME PURIFICATION',
          trigger:
            'Flooded trenches contaminated with human faeces and unburied corpses sparked widespread outbreaks of bacillary dysentery, causing severe dehydration and fever.',
          desc: 'Flooded trenches contaminated with human faeces and unburied corpses sparked widespread outbreaks of bacillary dysentery, causing severe dehydration and fever.',
          connective:
            'Specialized RAMC Sanitary Sections dug deep covered latrines treated with chloride of lime and chemically chlorinated all drinking water in cart tanks, preventing catastrophic epidemics.',
          question: 'How did strict sanitation and chemical water chlorination prevent epidemics?',
        },
        {
          step: 5,
          date: '1914–1918',
          para_ref: '[5.1–5.2]',
          title: 'Shell Shock & Psychological Trauma',
          actor: 'Dr Charles Myers & Craiglockhart War Hospital',
          tag: '🧠 NYDN & SHELL SHOCK',
          trigger:
            'Unrelenting high-explosive artillery bombardments caused severe psychiatric trauma: uncontrollable tremors, amnesia, mutism, and catatonic paralysis, termed "shell shock" by Charles Myers in 1915.',
          desc: 'Unrelenting high-explosive artillery bombardments caused severe psychiatric trauma: uncontrollable tremors, amnesia, mutism, and catatonic paralysis, termed "shell shock" by Charles Myers in 1915.',
          connective:
            'Initially punished as cowardice or malingering, the Army eventually classified cases as "Not Yet Diagnosed, Nervous" (NYDN), establishing forward rest centres and specialized psychiatric recovery hospitals.',
          question:
            'Why was shell shock initially stigmatised as cowardice before being treated medically?',
        },
      ],
    },
  },

  lesson_5_3: {
    teacher_notes: {
      primer:
        'This enquiry examines the lethal combat trauma generated by industrialized artillery shrapnel and chemical gas warfare on the Western Front, exploring compound fractures, cloth contamination, anaerobic gas gangrene caused by manured Flanders soil, the invention of the Brodie helmet, and the rapid British countermeasures developed to neutralize chlorine, phosgene, and mustard gas.',
      objectives: [
        {
          objective:
            'Explain why high-explosive artillery shrapnel caused far more destructive and contaminated wounds than rifle bullets.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that jagged metal shrapnel accounted for 58% of wounds, tearing irregular tissue cavities and sucking dirty woollen uniform cloth and soil deep into broken bone marrow.',
          question:
            'Why did high-explosive shrapnel fragments produce far more lethal and infection-prone wounds than high-velocity rifle bullets?',
        },
        {
          objective:
            'Analyse why manured Flanders soil made anaerobic gas gangrene and tetanus such deadly complications in shrapnel wounds.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Clinical Record of Gangrene). Highlight Clostridium welchii thriving in oxygen-deprived tissue, gas bubbles under the skin, and the contrast between preventable tetanus and untreatable gas gangrene.',
          question:
            'Why did heavily fertilized farmland make anaerobic soil bacteria like Clostridium welchii so rapidly fatal in deep shrapnel wounds?',
        },
        {
          objective:
            'Assess how the introduction of the Brodie steel helmet in late 1915 transformed battlefield head trauma survival.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Explain that replacing soft peaked cloth caps with pressed steel helmets deflected shrapnel, cutting fatal penetrating head wounds by 75–80% and paradoxically increasing hospital admissions for surviving head cases.',
          question:
            'Why did the introduction of the Brodie steel helmet cause a dramatic drop in battlefield deaths but an apparent rise in hospital head wound admissions?',
        },
        {
          objective:
            'Evaluate the chemical mechanisms and early British respiratory countermeasures to chlorine and phosgene gas attacks.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2] and Source B (Machine Gun Crew in PH Helmets). Detail the Second Ypres attack (April 1915), chlorine producing hydrochloric acid in the lungs, and the progression to phosgene and the Phenate-Hexamine hood.',
          question:
            'How did the rapid deployment of chemical respirators like the PH hood counter the lethal suffocating effects of chlorine and phosgene gas?',
        },
        {
          objective:
            'Compare the blister-agent properties of mustard gas with respiratory gases and explain the success of the Small Box Respirator.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Contrast blistering mustard gas penetrating damp uniforms with inhaled gases, explaining that while gas mortality was only 2.6% due to the Small Box Respirator, mustard gas caused massive medical exhaustion.',
          question:
            'Why was oily mustard gas far harder to counter and treat than earlier respiratory gases like chlorine and phosgene?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Clinical Medical Record Photograph of Severe Gangrene in Lower Limb (c.1916). Official clinical photograph produced for the British Medical Research Committee / RAMC Case Records, c.1916, documenting severe necrotic tissue damage and secondary gangrenous infection in the foot and leg of a British soldier admitted to a base hospital from the frontline trenches. Hinge Question: How does the blackened, necrotic tissue in Source A reveal the deadly danger of anaerobic bacterial infections like gas gangrene when soil spores contaminated deep shrapnel wounds?',
        'Source B':
          'Source B: British Machine Gun Crew in Combat Wearing PH Gas Helmets (1916). Official British War Office photograph taken by Lieutenant John Warwick Brooke near Ovillers during the Battle of the Somme, July 1916, showing a British Machine Gun Corps crew operating a Vickers machine gun while wearing issue Phenate-Hexamine (PH) anti-gas hoods with exhale valves. Hinge Question: How does Source B demonstrate how the British Army adapted technological protection to enable machine gun crews to fight continuously through deadly chemical gas attacks?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Artillery Firepower & Jagged Shrapnel Trauma (1914–1918)',
        theme_heading: 'Act 1: Artillery Firepower & Jagged Shrapnel Trauma (1914–1918)',
        text: '<span class="para-ref">[1.1]</span> The nature of battlefield wounds on the Western Front was dictated by the catastrophic supremacy of modern industrial artillery. Unlike previous nineteenth-century conflicts where rifle musket balls inflicted the majority of injuries, over 58% of British casualties in the First World War were caused by high-explosive artillery shells and fragmentation shrapnel. Artillery batteries discharged massive ordnance: high-explosive shells packed with trinitrotoluene (TNT) detonated on contact, creating a colossal supersonic blast wave and tearing thick steel casings into thousands of razor-sharp, jagged, red-hot metal fragments of irregular shapes and sizes.<br><br><span class="para-ref">[1.2]</span> When these jagged fragments struck human tissue at high velocity, they did not produce clean puncture wounds. Instead, they shredded flesh, severed major blood vessels, splintered bone structures into jagged fragments, and gouged out enormous craters of living tissue. Furthermore, the explosive vacuum and velocity of the metal fragment sucked foreign matter deep into the cavity: pieces of dirty woollen tunic, sodden khaki trousers, soil, and boot leather were buried into the wounded muscle. These contaminated foreign materials carried millions of deadly bacteria straight into crushed, devitalized tissue, setting the stage for virulent, life-threatening wound infections.',
      },
      {
        act: 2,
        title: 'Act 2: Soil Bacteria & The Gas Gangrene Crisis (1914–1918)',
        theme_heading: 'Act 2: Soil Bacteria & The Gas Gangrene Crisis (1914–1918)',
        source: {
          id: 'source_a_trench_foot_clinical',
          letter: 'A',
          title:
            'Source A: Clinical Medical Record Photograph of Severe Gangrene in Lower Limb (c.1916)',
          src: '/images/trench_foot_clinical.jpg',
          source: '/images/trench_foot_clinical.jpg',
          image: '/images/trench_foot_clinical.jpg',
          caption:
            'RAMC clinical photograph documenting severe necrotic tissue damage and secondary gangrenous infection in the foot of a British soldier admitted to a base hospital from the frontline trenches.',
          desc: 'Official clinical photograph documenting necrotic gangrene produced for the Medical Research Committee, c.1916.',
          provenance:
            'Official clinical photograph produced for the British Medical Research Committee / RAMC Case Records, c.1916. Wellcome Collection, London (Shelfmark: RAMC 442/1).',
          citation:
            'RAMC Medical Research Committee Case Records, London, c.1916 (Wellcome Collection RAMC 442/1).',
          question:
            'How does the blackened, necrotic tissue in Source A reveal the deadly danger of anaerobic bacterial infections like gas gangrene when soil spores contaminated deep shrapnel wounds?',
          hinge_question:
            'How does the blackened, necrotic tissue in Source A reveal the deadly danger of anaerobic bacterial infections like gas gangrene when soil spores contaminated deep shrapnel wounds?',
          source_context:
            'Official clinical photograph produced for the British Medical Research Committee / RAMC Case Records, c.1916, documenting severe necrotic tissue damage and secondary gangrenous infection in the foot and leg of a British soldier admitted to a base hospital from the frontline trenches. Hinge Question: How does the blackened, necrotic tissue in Source A reveal the deadly danger of anaerobic bacterial infections like gas gangrene when soil spores contaminated deep shrapnel wounds?',
          context:
            'Official clinical photograph produced for the British Medical Research Committee / RAMC Case Records, c.1916, documenting severe necrotic tissue damage and secondary gangrenous infection in the foot and leg of a British soldier admitted to a base hospital from the frontline trenches.',
        },
        text: '<span class="para-ref">[2.1]</span> While artillery shattered bones, the soil itself delivered a lethal biological assault. Northern France and Flanders had been intensively cultivated agricultural farmland for centuries, heavily fertilized with massive deposits of cow, horse, and pig manure. Consequently, the soil was saturated with virulent, spore-forming bacteria, most notably <em>Clostridium welchii</em> (the cause of <strong>Gas Gangrene</strong>) and <em>Clostridium tetani</em> (the cause of <strong>Tetanus</strong>). Both microbes were strict anaerobes—organisms that thrive exclusively in environments completely devoid of oxygen. Deep, jagged shrapnel wounds containing dead muscle tissue, deprived of blood flow, provided the perfect incubator for these deadly bacteria.<br><br><span class="para-ref">[2.2]</span> Within hours of injury, anaerobic bacteria multiplied inside the devitalized tissue. Gas gangrene microbes produced foul-smelling gas that bubbled under the skin, destroying surrounding healthy muscle and releasing deadly toxins into the bloodstream (<span class="archival-meta-tag">Source A</span>). If untreated, gas gangrene killed a casualty within 24 to 48 hours. Tetanus caused violent, excruciating muscle spasms, lockjaw, and respiratory paralysis. Fortunately, British medical services introduced routine <strong>tetanus antitoxin</strong> injections at Regimental Aid Posts early in the war; by administering serum to every wounded man on the day of injury, tetanus was virtually eradicated by 1915. However, gas gangrene possessed no antitoxin, forcing surgeons to invent radical surgical techniques to save lives.',
      },
      {
        act: 3,
        title: 'Act 3: Head Trauma & The Brodie Steel Helmet (Late 1915–1918)',
        theme_heading: 'Act 3: Head Trauma & The Brodie Steel Helmet (Late 1915–1918)',
        text: '<span class="para-ref">[3.1]</span> In the opening year of the war, head injuries represented the most lethal form of trauma on the battlefield. British soldiers entered the conflict wearing soft cloth peaked caps that offered zero ballistic protection. Because soldiers spent their days standing in trenches with their heads positioned just below the parapet, descending airburst artillery shells rained jagged iron balls and razor-sharp shell fragments directly onto their exposed skulls. In 1914 and early 1915, penetrating head trauma and fractured skulls accounted for a massive proportion of instant fatalities in the trenches.<br><br><span class="para-ref">[3.2]</span> To counter this carnage, British inventor John Leopold Brodie patented the pressed-steel <strong>Brodie Helmet</strong> in autumn 1915. Stamped from a single sheet of hardened manganese steel and lined with felt and canvas, the helmet featured a distinctive wide, shallow brim designed to deflect descending artillery shrapnel away from the wearer’s face, neck, and shoulders. Distributed to British frontline troops from early 1916, the Brodie helmet slashed fatal penetrating head wounds by an estimated 75% to 80%. Interestingly, hospital admissions for head injuries actually increased after the helmet’s introduction—a famous statistical anomaly caused by the fact that thousands of soldiers who previously would have died instantly in the trenches were now surviving to reach clearing stations for medical care.',
      },
      {
        act: 4,
        title: 'Act 4: Chemical Warfare: Chlorine & Phosgene Attacks (Apr 1915–1916)',
        theme_heading: 'Act 4: Chemical Warfare: Chlorine & Phosgene Attacks (Apr 1915–1916)',
        source: {
          id: 'source_b_british_ph_gas_helmet',
          letter: 'B',
          title: 'Source B: British Machine Gun Crew in Combat Wearing PH Gas Helmets (1916)',
          src: '/images/british_ph_gas_helmet.jpg',
          source: '/images/british_ph_gas_helmet.jpg',
          image: '/images/british_ph_gas_helmet.jpg',
          caption:
            'A British Machine Gun Corps crew operating a Vickers machine gun from an improvised trench position near Ovillers on the Somme while wearing issue Phenate-Hexamine (PH) anti-gas helmets with exhale valves.',
          desc: 'Official British War Office photograph of Vickers machine gun crew in PH gas helmets, Somme 1916.',
          provenance:
            'Official British War Office photograph taken by Lieutenant John Warwick Brooke near Ovillers during the Battle of the Somme, July 1916. Imperial War Museum Collection.',
          citation:
            'Lt. John Warwick Brooke, Official War Office Photograph, Ovillers, Somme, July 1916 (IWM Collection).',
          question:
            'How does Source B demonstrate how the British Army adapted technological protection to enable machine gun crews to fight continuously through deadly chemical gas attacks?',
          hinge_question:
            'How does Source B demonstrate how the British Army adapted technological protection to enable machine gun crews to fight continuously through deadly chemical gas attacks?',
          source_context:
            'Official British War Office photograph taken by Lieutenant John Warwick Brooke near Ovillers during the Battle of the Somme, July 1916, showing a British Machine Gun Corps crew operating a Vickers machine gun while wearing issue Phenate-Hexamine (PH) anti-gas hoods with exhale valves. Hinge Question: How does Source B demonstrate how the British Army adapted technological protection to enable machine gun crews to fight continuously through deadly chemical gas attacks?',
          context:
            'Official British War Office photograph taken by Lieutenant John Warwick Brooke near Ovillers during the Battle of the Somme, July 1916, showing a British Machine Gun Corps crew operating a Vickers machine gun while wearing issue Phenate-Hexamine (PH) anti-gas hoods with exhale valves.',
        },
        text: '<span class="para-ref">[4.1]</span> On the afternoon of 22 April 1915, during the Second Battle of Ypres, German forces introduced a terrifying new weapon: <strong>chemical gas warfare</strong>. Over 5,700 cylinders released 160 tons of suffocating greenish-yellow chlorine gas across No Man’s Land toward French and Algerian positions. Chlorine reacted with moisture in the respiratory tract to produce hydrochloric acid, destroying lung tissue and causing victims to drown in their own secreted bodily fluids. Unprepared Allied troops initially soaked socks and cotton bandoliers in urine (ammonia neutralized chlorine) before the British issued the flannel <strong>Hypo Helmet</strong> and the chemical-impregnated <strong>Phenate-Hexamine (PH) Helmet</strong> (<span class="archival-meta-tag">Source B</span>) fitted with glass goggles and a rubber exhale valve.<br><br><span class="para-ref">[4.2]</span> Chemical warfare escalated rapidly. In December 1915, the Germans introduced <strong>Phosgene</strong>, a colorless gas smelling of moldy hay that was six times more toxic than chlorine. Phosgene was particularly insidious because it caused little initial coughing or irritation; instead, its lethal effects were delayed, with casualties collapsing from acute pulmonary edema and heart failure 24 to 48 hours after exposure. The British upgraded the PH hood by chemically treating the flannel with hexamine to neutralize phosgene, ensuring British infantry could endure gas bombardments while maintaining frontline defensive firepower.',
      },
      {
        act: 5,
        title: 'Act 5: Mustard Gas & The Small Box Respirator (1916–1918)',
        theme_heading: 'Act 5: Mustard Gas & The Small Box Respirator (1916–1918)',
        text: '<span class="para-ref">[5.1]</span> The technological race between chemical delivery and protection culminated in the British invention of the <strong>Small Box Respirator (SBR)</strong>, introduced from late 1916. The SBR comprised a snug rubberized face mask with glass eyepieces, connected by a flexible corrugated hose to a metal chest canister containing chemical neutralizers and granules of activated vegetable charcoal. The charcoal trapped toxic gas molecules through physical adsorption, providing almost complete respiratory protection against all known suffocating gases and establishing the standard design for modern military gas masks.<br><br><span class="para-ref">[5.2]</span> However, in July 1917 at the Third Battle of Ypres (Passchendaele), the German army unleashed their most insidious weapon: <strong>Mustard Gas</strong> (Yellow Cross). Unlike chlorine or phosgene, mustard gas was an oily, persistent vesicant (blistering agent) that did not need to be inhaled to inflict horrific casualties. Fired in artillery shells, the oily liquid penetrated damp woollen uniforms, causing severe chemical burns, immense fluid-filled weeping blisters, temporary blindness, and respiratory tract destruction. Mustard gas contaminated muddy shell craters for days or weeks, forcing medical units to establish specialized decontamination showers and stripping stations. While chemical gas caused only 2.6% of British battlefield deaths due to effective respirators, its psychological terror and blistering injuries severely strained RAMC evacuation lines.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1914–1918',
        para_ref: '[1.1–1.2]',
        heading: 'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
        bullets: [
          'Blasting hot jagged metal balls through flesh',
          'Blowing dirty uniform cloth deep into broken bones',
          'Causing over half of all battlefield wounds',
        ],
        focus_clue:
          'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
      },
      {
        step: 2,
        date: '1914–1918',
        para_ref: '[2.1–2.2]',
        heading: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
        bullets: [
          'Fertilising farmland with rotten animal manure',
          'Deadly microbes multiplying inside airless wounds',
          'Hissing bubbles swelling under blackened skin',
        ],
        focus_clue: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
      },
      {
        step: 3,
        date: 'Late 1915',
        para_ref: '[3.1–3.2]',
        heading:
          'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
        bullets: [
          'Soft cloth caps offering zero protection from blasts',
          'Pressing hard steel bowls with wide gutters',
          'Slashing deadly skull splinter wounds by eighty percent',
        ],
        focus_clue:
          'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
      },
      {
        step: 4,
        date: 'Apr 1915–1916',
        para_ref: '[4.1–4.2]',
        heading: 'How did the rapid evolution of chemical respirators counter suffocating gases?',
        bullets: [
          'Releasing green-yellow choking cloud over fields',
          'Holding urine-soaked handkerchiefs over noses',
          'Breathing through grey flannel hoods with glass eyepieces',
        ],
        focus_clue:
          'How did the rapid evolution of chemical respirators counter suffocating gases?',
      },
      {
        step: 5,
        date: '1916–1918',
        para_ref: '[5.1–5.2]',
        heading: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
        bullets: [
          'Sucking air through rubber tubes and charcoal canisters',
          'Oily yellow liquid burning huge skin blisters through clothes',
          'Soaking into muddy earth for weeks without evaporating',
        ],
        focus_clue: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
      },
    ],
    causal_domino_spine: {
      title: 'Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1918',
          para_ref: '[1.1–1.2]',
          title: 'Artillery & Shrapnel Trauma',
          actor: 'Heavy Artillery & Shrapnel Shells',
          tag: '💣 HIGH-EXPLOSIVE ARTILLERY',
          trigger:
            'Artillery was responsible for 58% of all battlefield wounds, showering trenches with jagged high-velocity steel shell casings and hot lead shrapnel balls.',
          desc: 'Artillery was responsible for 58% of all battlefield wounds, showering trenches with jagged high-velocity steel shell casings and hot lead shrapnel balls.',
          connective:
            'Blasted dirty, bacteria-laden woollen uniform fabric and muddy soil deep into fragmented bone tissue, creating complex compound wounds prone to virulent sepsis.',
          question:
            'Why did jagged shrapnel fragments cause far worse infections than rifle bullets?',
        },
        {
          step: 2,
          date: '1914–1918',
          para_ref: '[2.1–2.2]',
          title: 'Soil Bacteria & Gas Gangrene',
          actor: 'Clostridium welchii & Anaerobic Bacteria',
          tag: '☣️ GAS GANGRENE CRISIS',
          trigger:
            'Flanders farmland had been intensively manured for centuries, heavily saturating the damp soil with tetanus spores and anaerobic Clostridium welchii bacteria.',
          desc: 'Flanders farmland had been intensively manured for centuries, heavily saturating the damp soil with tetanus spores and anaerobic Clostridium welchii bacteria.',
          connective:
            'Multiplied rapidly in deep, oxygen-deprived shrapnel wound tracts, producing foul-smelling gas bubbles under blackened dying flesh that killed victims within 48 hours without surgery.',
          question: 'Why was Clostridium welchii so lethal in deep, airless shrapnel wounds?',
        },
        {
          step: 3,
          date: 'Late 1915',
          para_ref: '[3.1–3.2]',
          title: 'Head Trauma & Brodie Helmet',
          actor: 'John Leopold Brodie & War Office',
          tag: '🪖 BRODIE STEEL HELMET',
          trigger:
            'British soldiers entered the war wearing soft cloth peaked caps that offered zero protection against raining shrapnel and falling trench timber splinters.',
          desc: 'British soldiers entered the war wearing soft cloth peaked caps that offered zero protection against raining shrapnel and falling trench timber splinters.',
          connective:
            'John Brodie patented the pressed steel helmet in 1915; its wide brim deflected descending shell fragments, reducing fatal penetrating head wounds by 75% across the front.',
          question:
            'Why did the introduction of the Brodie helmet cause an apparent rise in hospital head cases?',
        },
        {
          step: 4,
          date: 'Apr 1915–1916',
          para_ref: '[4.1–4.2]',
          title: 'Chlorine & Phosgene Attacks',
          actor: 'German Gas Regiments & RAMC Chemical Advisors',
          tag: '☁️ CHEMICAL RESPIRED DEFENCE',
          trigger:
            'The German Army launched the first mass chemical gas attack at Second Ypres in April 1915, discharging cylinders of suffocation-inducing greenish-yellow chlorine gas.',
          desc: 'The German Army launched the first mass chemical gas attack at Second Ypres in April 1915, discharging cylinders of suffocation-inducing greenish-yellow chlorine gas.',
          connective:
            'British troops improvised with urine-soaked rags before the War Office manufactured the Phenate-Hexamine (PH) anti-gas hood, neutralizing lethal chlorine and phosgene vapors.',
          question:
            'How did the rapid evolution of chemical respirators counter suffocating gases?',
        },
        {
          step: 5,
          date: '1916–1918',
          para_ref: '[5.1–5.2]',
          title: 'Mustard Gas & Box Respirators',
          actor: 'British War Office & Small Box Respirators',
          tag: '😷 SMALL BOX RESPIRATOR & MUSTARD GAS',
          trigger:
            'The British introduced the Small Box Respirator in 1916 with activated charcoal canisters; however, in July 1917 Germans deployed oily, odorless blistering mustard gas.',
          desc: 'The British introduced the Small Box Respirator in 1916 with activated charcoal canisters; however, in July 1917 Germans deployed oily, odorless blistering mustard gas.',
          connective:
            'Unlike respiratory gases, mustard liquid burned through damp woollen uniforms to cause agonizing internal and external chemical burns, remaining toxic in trench soil for weeks.',
          question: 'Why was mustard gas far harder to counter than chlorine or phosgene?',
        },
      ],
    },
  },

  lesson_5_4: {
    teacher_notes: {
      primer:
        'This enquiry examines the operational structure and humanitarian logistics of the Royal Army Medical Corps (RAMC) Chain of Evacuation on the Western Front, exploring stretcher bearer retrieval, first aid at Regimental Aid Posts, intermediate triage at Dressing Stations, surgical intervention and the 3-tier triage system at Casualty Clearing Stations, coastal Base Hospitals, and transport innovations including motor ambulances and converted canal barges.',
      objectives: [
        {
          objective:
            'Explain the vital role of frontline Stretcher Bearers and Regimental Aid Posts in stemming catastrophic haemorrhage and shock.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that sixteen stretcher bearers per battalion crawled through mud under fire to bring casualties to the RAP 200 yards back, where medical officers administered tourniquets, morphine, and tetanus antitoxins.',
          question:
            'Why was rapid frontline retrieval by stretcher bearers to the Regimental Aid Post essential to prevent fatal haemorrhagic shock?',
        },
        {
          objective:
            'Analyse the tactical medical function of Advanced and Main Dressing Stations operated by RAMC Field Ambulances.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source A (Stretcher bearers at Passchendaele). Highlight how six men were needed per stretcher in mud and how dressing stations sorted casualties to prevent CCS congestion.',
          question:
            'What was the tactical medical purpose of Dressing Stations in sorting casualties and preventing bottlenecks at Casualty Clearing Stations?',
        },
        {
          objective:
            'Evaluate the surgical supremacy and 3-tier triage system of Casualty Clearing Stations (CCS).',
          primer:
            'Direct students to paragraphs [3.1]–[3.2]. Detail the location of CCSs (7–12 miles back near railheads), female QAIMNS nursing staff, sterile theatres, and the strict division into walking wounded, urgent surgical cases, and moribund.',
          question:
            'How did the rigorous 3-tier triage system at Casualty Clearing Stations maximize casualty survival during mass offensives?',
        },
        {
          objective:
            'Examine the specialized treatment and convalescent role of coastal Base Hospitals and hospital ships returning to "Blighty".',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on massive hospital complexes at Boulogne and Étaples, specialized wards for chest and brain trauma, and patient transit to Britain on dedicated white hospital ships.',
          question:
            'Why were vast Base Hospitals situated adjacent to major coastal railheads and Channel passenger ports in northern France?',
        },
        {
          objective:
            'Compare the medical effectiveness of motorized ambulances and converted canal barges in casualty transport.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source B (Converted RAMC Ambulance Canal Barge). Contrast the jarring motion of road ambulances driven by FANY volunteers with the smooth, vibration-free transport of barge waterways for head and abdominal injuries.',
          question:
            'Why were converted canal barges preferred over road motor ambulances for transporting casualties with severe head, chest, or abdominal wounds?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: RAMC Stretcher Bearers Carrying a Casualty at Boesinghe, Ypres (1917). Official British Army photograph taken by Lieutenant John Warwick Brooke near Boesinghe during the Third Battle of Ypres, 1 August 1917, showing a team of six British stretcher bearers struggling through deep, liquid Flanders mud to carry a wounded soldier on a wooden stretcher. Hinge Question: Why did the exhausting physical conditions shown in Source A require six stretcher bearers instead of the usual four to transport a single casualty through Flanders mud?',
        'Source B':
          'Source B: Converted RAMC Ambulance Canal Barge on French Waterways (c.1916). Official British military photograph taken in northern France, c.1916, showing a French canal barge converted by the Royal Army Medical Corps into an ambulance barge fitted with canvas awnings, clean hospital cots, and heating for post-operative transit. Hinge Question: Why did converted canal barges like the one shown in Source B provide a superior method of transport for post-operative head and abdominal casualties compared to road motor ambulances?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Frontline Retrieval & The Regimental Aid Post (1914–1918)',
        theme_heading: 'Act 1: Frontline Retrieval & The Regimental Aid Post (1914–1918)',
        text: '<span class="para-ref">[1.1]</span> In the brutal arithmetic of the Western Front, casualty survival was a desperate race against time. Because the manured soil of Flanders and northern France was teeming with virulent anaerobic bacteria that caused fatal gas gangrene within twenty-four hours, the Royal Army Medical Corps (RAMC) constructed an organized, continuous evacuation pipeline from the firestep back to specialized base hospitals: the <strong>Chain of Evacuation</strong>. The initial retrieval of wounded men fell upon battalion <strong>Stretcher Bearers</strong>. Each British infantry battalion of 1,000 men had just sixteen dedicated stretcher bearers (four per company), armed only with brassards, field dressings, and wooden stretchers.<br><br><span class="para-ref">[1.2]</span> Under direct artillery fire and sniper observation, bearers crawled into shell holes to retrieve casualties and haul them back to the <strong>Regimental Aid Post (RAP)</strong>. Located 200 to 300 yards behind the frontline in a communication trench dugout, ruined farmhouse cellar, or sandbagged breastwork, the RAP was staffed by the Regimental Medical Officer (RMO) and orderlies. The RAP was an emergency first-aid station, not a surgical hospital: its mission was immediate life-preservation—applying tourniquets to stem arterial haemorrhage, bandaging wounds, administering pain-relieving morphine, and giving mandatory tetanus antitoxin injections before moving men back to avoid congestion.',
      },
      {
        act: 2,
        title: 'Act 2: Field Ambulances & Advanced Dressing Stations (1914–1918)',
        theme_heading: 'Act 2: Field Ambulances & Advanced Dressing Stations (1914–1918)',
        source: {
          id: 'source_a_stretcher_bearers_passchendaele',
          letter: 'A',
          title: 'Source A: RAMC Stretcher Bearers Carrying a Casualty at Boesinghe, Ypres (1917)',
          src: '/images/stretcher_bearers_passchendaele.jpg',
          source: '/images/stretcher_bearers_passchendaele.jpg',
          image: '/images/stretcher_bearers_passchendaele.jpg',
          caption:
            'A team of six British stretcher bearers struggling through deep, liquid Flanders mud to carry a wounded soldier on a wooden stretcher near Boesinghe during the Third Battle of Ypres.',
          desc: 'Official British Army photograph taken near Boesinghe during the Third Battle of Ypres, August 1917.',
          provenance:
            'Official British Army photograph taken by Lieutenant John Warwick Brooke near Boesinghe during the Third Battle of Ypres, 1 August 1917. Imperial War Museum Collection.',
          citation:
            'Lt. John Warwick Brooke, Official War Office Photograph, Boesinghe, Ypres, 1 August 1917 (IWM Collection).',
          question:
            'Why did the exhausting physical conditions shown in Source A require six stretcher bearers instead of the usual four to transport a single casualty through Flanders mud?',
          hinge_question:
            'Why did the exhausting physical conditions shown in Source A require six stretcher bearers instead of the usual four to transport a single casualty through Flanders mud?',
          source_context:
            'Official British Army photograph taken by Lieutenant John Warwick Brooke near Boesinghe during the Third Battle of Ypres, 1 August 1917, showing a team of six British stretcher bearers struggling through deep, liquid Flanders mud to carry a wounded soldier on a wooden stretcher. Hinge Question: Why did the exhausting physical conditions shown in Source A require six stretcher bearers instead of the usual four to transport a single casualty through Flanders mud?',
          context:
            'Official British Army photograph taken by Lieutenant John Warwick Brooke near Boesinghe during the Third Battle of Ypres, 1 August 1917, showing a team of six British stretcher bearers struggling through deep, liquid Flanders mud to carry a wounded soldier on a wooden stretcher.',
        },
        text: '<span class="para-ref">[2.1]</span> Transporting wounded soldiers from the RAP back to intermediate dressing stations was one of the most physically punishing ordeals of the war. In the cratered quagmires of Passchendaele (<span class="archival-meta-tag">Source A</span>), carrying a wounded soldier weighing twelve stone across broken ground required teams of six stretcher bearers rather than four, as men repeatedly sank waist-deep into liquid mud. A relay journey of two miles across pulverized terrain could take six to eight exhausting hours. Stretcher bearers suffered immense casualties from flying shrapnel and sniper bullets while struggling to keep their patients elevated above water-filled shell holes.<br><br><span class="para-ref">[2.2]</span> From the RAP, casualties arrived at <strong>Advanced Dressing Stations (ADS)</strong> and <strong>Main Dressing Stations (MDS)</strong>, operated by RAMC Field Ambulance units. Located one to two miles behind the front in tents, bunkers, or ruined barns, dressing stations acted as an intermediate clearing filter. Staffed by ten medical officers and orderlies, dressing stations could not perform major surgery, but they examined bandages, treated hypothermic shock with warm blankets and hot sweet tea, administered additional anti-tetanus injections, and sorted casualties into motorized transport to prevent catastrophic crowding at surgical hospitals.',
      },
      {
        act: 3,
        title: 'Act 3: Casualty Clearing Stations & The 3-Tier Triage System (1914–1918)',
        theme_heading: 'Act 3: Casualty Clearing Stations & The 3-Tier Triage System (1914–1918)',
        text: '<span class="para-ref">[3.1]</span> The pivotal medical hub of the entire evacuation chain was the <strong>Casualty Clearing Station (CCS)</strong>. Located 7 to 12 miles behind the front line—safely beyond standard German field artillery range, but positioned strategically beside railway lines and canal networks—the CCS was the first facility equipped with sterile operating theatres, autoclaves, mobile X-ray vans, and professional military nurses of the Queen Alexandra’s Imperial Military Nursing Service (QAIMNS). The CCS was where contaminated, life-threatening trauma surgery actually took place.<br><br><span class="para-ref">[3.2]</span> To handle thousands of casualties arriving simultaneously during major offensives, medical officers operated a rigorous system of <strong>Triage</strong>, dividing incoming men into three strict clinical categories: (1) <em>The Walking Wounded</em> (men with minor flesh wounds who were dressed and returned to duty); (2) <em>Those Requiring Immediate Surgery</em> (patients with compound fractures, ruptured femurs, or penetrating abdominal and chest wounds who had a viable chance of survival if operated on immediately); and (3) <em>The Moribund</em> (hopelessly wounded soldiers whose injuries were fatal, who were placed in quiet tents and made comfortable with morphine until they passed away). By prioritizing surgical resources for viable life-threatening cases, CCS surgeons saved hundreds of thousands of lives.',
      },
      {
        act: 4,
        title: 'Act 4: Base Hospitals on the French Coast (1914–1918)',
        theme_heading: 'Act 4: Base Hospitals on the French Coast (1914–1918)',
        text: '<span class="para-ref">[4.1]</span> Once patients were operated on and stabilized at the CCS, they were evacuated to vast <strong>Base Hospitals</strong> situated along the French coast, concentrated at major ports such as Boulogne, Le Havre, Rouen, and the massive hospital camp at Étaples. Taking advantage of maritime and railway infrastructure, coastal base hospitals were vast complexes of brick buildings, tents, and wooden huts capable of housing 2,000 to 20,000 beds. Base hospitals were staffed by senior civilian surgeons, specialist consultants, and Voluntary Aid Detachment (VAD) nurses, providing advanced post-operative care and specialized rehabilitation.<br><br><span class="para-ref">[4.2]</span> Base hospitals were organized into dedicated specialist wings: orthopedic wards for compound fractures, specialized units for severe facial and head injuries, and isolation wards for infectious gas gangrene and dysentery. When casualties stabilized sufficiently to travel and required extended convalescence, they were loaded onto dedicated white-painted <strong>hospital ships</strong> (marked with red crosses and green hull bands) for the voyage across the English Channel back to specialized military and civilian hospitals in Britain ("Blighty").',
      },
      {
        act: 5,
        title: 'Act 5: Transport Logistics: Motor Ambulances & Canal Barges (1914–1918)',
        theme_heading: 'Act 5: Transport Logistics: Motor Ambulances & Canal Barges (1914–1918)',
        source: {
          id: 'source_b_ramc_canal_barge',
          letter: 'B',
          title: 'Source B: Converted RAMC Ambulance Canal Barge on French Waterways (c.1916)',
          src: '/images/ramc_canal_barge.jpg',
          source: '/images/ramc_canal_barge.jpg',
          image: '/images/ramc_canal_barge.jpg',
          caption:
            'A French canal barge converted by the Royal Army Medical Corps into an ambulance barge, fitted with canvas awnings, clean hospital cots, and heating, transporting fragile post-operative casualties to Base Hospitals.',
          desc: 'Official British military photograph of converted RAMC ambulance canal barge in northern France, c.1916.',
          provenance:
            'Official British military photograph taken in northern France, c.1916. Imperial War Museum Collection (Shelfmark: Q 11048).',
          citation:
            'Official British Military Photograph, Northern France Waterways, c.1916 (IWM Q 11048).',
          question:
            'Why did converted canal barges like the one shown in Source B provide a superior method of transport for post-operative head and abdominal casualties compared to road motor ambulances?',
          hinge_question:
            'Why did converted canal barges like the one shown in Source B provide a superior method of transport for post-operative head and abdominal casualties compared to road motor ambulances?',
          source_context:
            'Official British military photograph taken in northern France, c.1916, showing a French canal barge converted by the Royal Army Medical Corps into an ambulance barge fitted with canvas awnings, clean hospital cots, and heating for post-operative transit. Hinge Question: Why did converted canal barges like the one shown in Source B provide a superior method of transport for post-operative head and abdominal casualties compared to road motor ambulances?',
          context:
            'Official British military photograph taken in northern France, c.1916, showing a French canal barge converted by the Royal Army Medical Corps into an ambulance barge fitted with canvas awnings, clean hospital cots, and heating for post-operative transit.',
        },
        text: '<span class="para-ref">[5.1]</span> The physical survival of wounded soldiers was deeply dependent upon transport technology between medical stations. In August 1914, the British Army deployed almost exclusively with horse-drawn ambulances. Over cratered, shell-ploughed roads, horse wagons jolted agonizingly, causing jagged bone splinters to sever arteries and throwing stabilized casualties into fatal secondary shock. In response, public appeals coordinated by the British Red Cross raised funds to purchase motorized ambulance vans. Female volunteer drivers of the <strong>First Aid Nursing Yeomanry (FANY)</strong> and Red Cross drove fleets of motorized ambulances under shellfire, dramatically shrinking transit times between dressing stations and railheads.<br><br><span class="para-ref">[5.2]</span> For the most delicate surgical casualties—men with trepanned skulls, fragile chest wounds, or newly stitched abdominal incisions—even motorized ambulances over cobbled French roads were dangerously jarring. The RAMC solved this by converting French commercial canal barges into floating ambulance wards (<span class="archival-meta-tag">Source B</span>). Fitted with warm stoves, electric lamps, clean hospital cots, and nursing staff, these <strong>ambulance barges</strong> glided smoothly and silently along northern France’s extensive canal network, carrying post-operative patients directly to coastal base hospitals without a single jolt, preserving delicate surgical sutures and saving countless lives.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1914–1918',
        para_ref: '[1.1–1.2]',
        heading:
          'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
        bullets: [
          'Teams of four hauling wounded through bullet fire',
          'Crowding into dark sandbagged frontline dugouts',
          'Slapping brown iodine and white bandages on cuts',
        ],
        focus_clue:
          'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
      },
      {
        step: 2,
        date: '1914–1918',
        para_ref: '[2.1–2.2]',
        heading: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
        bullets: [
          'Setting up treatment cots inside ruined farm barns',
          'Checking clean bandages one mile behind frontline',
          'Loading urgent bleeding cases into transport carts',
        ],
        focus_clue: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
      },
      {
        step: 3,
        date: '1914–1918',
        para_ref: '[3.1–3.2]',
        heading: 'How did the 3-tier triage system maximize survival during mass offensives?',
        bullets: [
          'Setting up big operating tents near railway tracks',
          'Sorting bleeding soldiers into three survival groups',
          "Rushing torn stomach wounds straight to surgeons' tables",
        ],
        focus_clue: 'How did the 3-tier triage system maximize survival during mass offensives?',
      },
      {
        step: 4,
        date: '1914–1918',
        para_ref: '[4.1–4.2]',
        heading: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
        bullets: [
          'Converting coastal resort hotels into recovery wards',
          'Treating specialized amputations and poison burns',
          'Carrying healed patients onto white hospital ships',
        ],
        focus_clue: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
      },
      {
        step: 5,
        date: '1914–1918',
        para_ref: '[5.1–5.2]',
        heading: 'Why were canal barges preferred over trains for head and chest trauma?',
        bullets: [
          'Bouncing painfully in old wooden horse wagons',
          'Donating hundreds of fast petrol motor vans',
          'Gliding gently down quiet canals for head injuries',
        ],
        focus_clue: 'Why were canal barges preferred over trains for head and chest trauma?',
      },
    ],
    causal_domino_spine: {
      title: 'The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations & CCS',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1918',
          para_ref: '[1.1–1.2]',
          title: 'Stretcher Bearers & RAP',
          actor: 'Regimental Stretcher Bearers & Medical Officers',
          tag: '🩹 REGIMENTAL AID POST (RAP)',
          trigger:
            'Battalion stretcher bearers crawled across shell holes to carry wounded men to the Regimental Aid Post, situated 200 yards behind the frontline in sandbagged dugouts or ruined basements.',
          desc: 'Battalion stretcher bearers crawled across shell holes to carry wounded men to the Regimental Aid Post, situated 200 yards behind the frontline in sandbagged dugouts or ruined basements.',
          connective:
            'Administered emergency first aid, tied tourniquets, smeared antiseptic iodine, and applied field dressings to stabilize casualties before secondary haemorrhage set in.',
          question:
            'Why was rapid evacuation by stretcher bearers vital to prevent irreversible shock?',
        },
        {
          step: 2,
          date: '1914–1918',
          para_ref: '[2.1–2.2]',
          title: 'Field Ambulances & ADS/MDS',
          actor: 'RAMC Field Ambulances',
          tag: '🏥 ADVANCED DRESSING STATIONS (ADS)',
          trigger:
            'Field Ambulances operated Advanced Dressing Stations (ADS) and Main Dressing Stations (MDS) located one to two miles behind the frontline in farmhouses, tents, or bunkers.',
          desc: 'Field Ambulances operated Advanced Dressing Stations (ADS) and Main Dressing Stations (MDS) located one to two miles behind the frontline in farmhouses, tents, or bunkers.',
          connective:
            'Sorted incoming casualties, replaced contaminated field dressings, administered tetanus antitoxins, and dispatched urgent surgical cases to the rear in motorized transport.',
          question: 'What was the tactical role of Dressing Stations in preventing CCS congestion?',
        },
        {
          step: 3,
          date: '1914–1918',
          para_ref: '[3.1–3.2]',
          title: 'CCS & The Triage System',
          actor: 'Casualty Clearing Station Surgeons & Triage Officers',
          tag: '⚖️ 3-TIER CCS TRIAGE',
          trigger:
            'Located 10 miles behind the front near railway sidings, Casualty Clearing Stations (CCS) served as the vital surgical hub where incoming wounded were divided into three triage categories.',
          desc: 'Located 10 miles behind the front near railway sidings, Casualty Clearing Stations (CCS) served as the vital surgical hub where incoming wounded were divided into three triage categories.',
          connective:
            'Separated the moribund, the walking wounded, and those requiring immediate life-saving surgery (abdominal wounds and torn femurs), performing operations before infection overwhelmed damaged organs.',
          question: 'How did the 3-tier triage system maximize survival during mass offensives?',
        },
        {
          step: 4,
          date: '1914–1918',
          para_ref: '[3.1–3.2]',
          title: 'Base Hospitals on French Coast',
          actor: 'Coastal Base Hospitals & Hospital Ships',
          tag: '🚢 BASE HOSPITALS & BLIGHTY',
          trigger:
            'Vast Base Hospitals operated at Boulogne, Le Havre, and Rouen, taking advantage of major coastal railheads and passenger ship docks.',
          desc: 'Vast Base Hospitals operated at Boulogne, Le Havre, and Rouen, taking advantage of major coastal railheads and passenger ship docks.',
          connective:
            'Housed specialized surgical and recovery units for severe head trauma and chest surgery, evacuating stabilized soldiers on hospital ships across the English Channel to Britain ("Blighty").',
          question: 'Why were Base Hospitals situated near major coastal rail terminals and ports?',
        },
        {
          step: 5,
          date: '1914–1918',
          para_ref: '[5.1–5.2]',
          title: 'Motor Ambulances & Barges',
          actor: 'Red Cross, FANY & Ambulance Drivers',
          tag: '🚑 MOTOR AMBULANCES & CANAL BARGES',
          trigger:
            'Early horse-drawn ambulances jolted severely on shell-cratered roads, prompting public appeals that raised funds for 250 motorized ambulances operated by the Red Cross and FANY.',
          desc: 'Early horse-drawn ambulances jolted severely on shell-cratered roads, prompting public appeals that raised funds for 250 motorized ambulances operated by the Red Cross and FANY.',
          connective:
            'In northern France, converted canal barges provided smooth, vibration-free water transport along inland waterways, preserving delicate surgical sutures for severe head and chest cases.',
          question: 'Why were canal barges preferred over trains for head and chest trauma?',
        },
      ],
    },
  },

  lesson_5_5: {
    teacher_notes: {
      primer:
        'This enquiry investigates the transformative surgical and radiological innovations developed on the Western Front, exploring radical wound debridement to prevent gas gangrene, Alexis Carrel and Henry Dakin’s continuous chemical antiseptic irrigation system, Sir Robert Jones’s introduction of the Thomas Splint to slash fractured femur mortality, and the clinical deployment and practical limitations of mobile X-ray units.',
      objectives: [
        {
          objective:
            'Explain why radical surgical wound debridement proved far more effective than chemical antiseptics in preventing gas gangrene.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that carbolic acid failed in deep shrapnel wounds, while cutting away dead, contaminated muscle deprived anaerobic bacteria of food, complemented by delayed primary closure.',
          question:
            'Why did surgical excision of dead tissue (debridement) succeed in arresting gas gangrene where Listerian chemical antiseptics had failed?',
        },
        {
          objective:
            'Analyse how the Carrel-Dakin continuous irrigation method solved the problem of deep wound sepsis.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2] and Source B (Operating theatre at CCS). Explain the buffered sodium hypochlorite bleach solution, perforated rubber tubes, continuous day/night flushing, and the need for fresh preparation within six hours.',
          question:
            'How did the Carrel-Dakin irrigation system continuously sterilize deep, irregular wound cavities without destroying living human tissue?',
        },
        {
          objective:
            'Evaluate how Sir Robert Jones’s deployment of the Thomas Splint reduced compound femur fracture mortality from 80% to 20%.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Thomas Splint artifact). Detail the padded groin ring, rigid side bars, continuous mechanical traction, bone immobilization, and the prevention of femoral artery laceration during transit.',
          question:
            'Why was the mechanical traction of the Thomas Splint so effective in preventing fatal haemorrhage and shock from compound thigh fractures?',
        },
        {
          objective:
            'Examine the deployment and diagnostic power of mobile X-ray units in forward casualty clearing stations.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on automobile engine generators, mobile vans, and cross-angled stereoscopic X-ray plates allowing surgeons to pinpoint the exact 3D depth of metal fragments before making incisions.',
          question:
            'How did mobile X-ray units powered by motor engines enable military surgeons to locate buried shrapnel before operating?',
        },
        {
          objective:
            'Assess the critical combat limitations of wartime radiography, specifically radiolucent uniform fragments and equipment fragility.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2]. Explain that glass vacuum tubes overheated and shattered on rutted roads, and X-rays could not detect radiolucent mud, wood, or khaki cloth that still bred fatal gas gangrene.',
          question:
            'Why did undetected cloth and soil fragments remain a deadly cause of post-operative gangrene despite the use of mobile X-rays?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: First World War Thomas Splint for Fractured Femurs (c.1916). An authentic surviving British Army Thomas Splint preserved in the Wellcome Historical Medical Collection, London, showing the padded oval ring fitted against the groin, rigid metal side bars, and canvas support straps used to maintain traction and immobilize broken thigh bones. Hinge Question: Why was the simple mechanical traction provided by the Thomas Splint shown in Source A so revolutionary in reducing compound femur fracture mortality from 80% to 20%?',
        'Source B':
          'Source B: Photograph of an Operating Theatre at an RAMC Casualty Clearing Station (1917). Official British War Office photograph taken on the Western Front in 1917, showing surgeons and QAIMNS nurses performing emergency operations inside a large canvas tented operating theatre at No. 47 Casualty Clearing Station, complete with sterile operating tables, autoclaves, and electric lighting. Hinge Question: How does the advanced operating theatre shown in Source B demonstrate how sterile surgical care was pushed right up to the edge of the battlefield to combat wound infection?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Wound Debridement & Surgical Excision (1914–1918)',
        theme_heading: 'Act 1: Wound Debridement & Surgical Excision (1914–1918)',
        text: '<span class="para-ref">[1.1]</span> In autumn 1914, British military surgeons confronted an acute sepsis crisis that peacetime civilian training could not resolve. In nineteenth-century hospitals, Joseph Lister’s antiseptic techniques had controlled surface contamination; on the Western Front, however, swabbing deep shrapnel wounds with carbolic acid was completely useless. High-explosive shrapnel drove dirty khaki cloth, mud, and anaerobic soil bacteria deep into torn muscle pockets. Concentrated chemical antiseptics could not reach the deep recesses of irregular wound tracts and damaged the patient’s exposed living tissues and white blood cells faster than they destroyed anaerobic spores, allowing gas gangrene and septicaemia to flourish.<br><br><span class="para-ref">[1.2]</span> Confronted with thousands of rotting limbs, military surgeons adopted radical <strong>Wound Debridement</strong> (surgical excision). Operating under general or local anaesthesia in forward stations, surgeons used scalpels to systematically cut away all dead, bruised, and contaminated muscle tissue around the margins of the wound, depriving anaerobic bacteria of the devitalized biological material they required to multiply. Furthermore, surgeons rejected immediate stitching, practicing <strong>delayed primary closure</strong>: wounds were left wide open and packed with sterile gauze for 24 to 48 hours to expose tissue to oxygen, halting anaerobic bacterial reproduction before the wound was surgically closed.',
      },
      {
        act: 2,
        title: 'Act 2: The Carrel-Dakin Antiseptic Irrigation Method (1915–1918)',
        theme_heading: 'Act 2: The Carrel-Dakin Antiseptic Irrigation Method (1915–1918)',
        source: {
          id: 'source_b_casualty_clearing_station_ww1',
          letter: 'B',
          title:
            'Source B: Photograph of an Operating Theatre at an RAMC Casualty Clearing Station (1917)',
          src: '/images/casualty_clearing_station_ww1.jpg',
          source: '/images/casualty_clearing_station_ww1.jpg',
          image: '/images/casualty_clearing_station_ww1.jpg',
          caption:
            'Surgeons and QAIMNS nurses performing emergency operations inside a large canvas tented operating theatre at No. 47 Casualty Clearing Station, showing sterile operating tables, autoclaves, and electric lighting.',
          desc: 'Official British War Office photograph of operating theatre at No. 47 CCS, 1917.',
          provenance:
            'Official British War Office photograph taken on the Western Front, 1917. Imperial War Museum Collection (Shelfmark: Q 6185).',
          citation: 'Official British War Office Photograph, Western Front, 1917 (IWM Q 6185).',
          question:
            'How does the advanced operating theatre shown in Source B demonstrate how sterile surgical care was pushed right up to the edge of the battlefield to combat wound infection?',
          hinge_question:
            'How does the advanced operating theatre shown in Source B demonstrate how sterile surgical care was pushed right up to the edge of the battlefield to combat wound infection?',
          source_context:
            'Official British War Office photograph taken on the Western Front in 1917, showing surgeons and QAIMNS nurses performing emergency operations inside a large canvas tented operating theatre at No. 47 Casualty Clearing Station, complete with sterile operating tables, autoclaves, and electric lighting. Hinge Question: How does the advanced operating theatre shown in Source B demonstrate how sterile surgical care was pushed right up to the edge of the battlefield to combat wound infection?',
          context:
            'Official British War Office photograph taken on the Western Front in 1917, showing surgeons and QAIMNS nurses performing emergency operations inside a large canvas tented operating theatre at No. 47 Casualty Clearing Station, complete with sterile operating tables, autoclaves, and electric lighting.',
        },
        text: '<span class="para-ref">[2.1]</span> To combat infection in deep, complex wounds that could not be completely excised, French surgeon Alexis Carrel and English chemist Henry Dakin invented the <strong>Carrel-Dakin Method</strong> in 1915–16. Dakin developed a mild, buffered antiseptic solution of <em>sodium hypochlorite</em> (dilute chemical bleach). Previous antiseptics were either too weak to kill bacteria or so caustic that they caused severe tissue necrosis; Dakin’s solution achieved the perfect chemical balance, killing anaerobic bacteria and liquefying dead tissue without burning living human flesh.<br><br><span class="para-ref">[2.2]</span> Carrel designed an ingenious mechanical apparatus to deliver the antiseptic: a network of narrow, flexible rubber tubes pierced with tiny holes was laid deep inside the recesses of the wound. Antiseptic solution was dripped continuously from an elevated glass reservoir, flushing the wound cavity day and night in forward operating theatres (<span class="archival-meta-tag">Source B</span>). The antiseptic had to be freshly prepared in hospital laboratories every six hours because the solution rapidly degraded and lost its chemical potency. By combining meticulous surgical debridement with continuous Carrel-Dakin irrigation, surgeons arrested bacterial sepsis within days, dramatically lowering post-operative amputation rates.',
      },
      {
        act: 3,
        title: 'Act 3: Mechanical Traction: The Thomas Splint Revolution (Dec 1915–1916)',
        theme_heading: 'Act 3: Mechanical Traction: The Thomas Splint Revolution (Dec 1915–1916)',
        source: {
          id: 'source_a_thomas_splint_authentic',
          letter: 'A',
          title: 'Source A: First World War Thomas Splint for Fractured Femurs (c.1916)',
          src: '/images/thomas_splint_authentic.jpg',
          source: '/images/thomas_splint_authentic.jpg',
          image: '/images/thomas_splint_authentic.jpg',
          caption:
            'An authentic surviving British Army Thomas Splint, showing the padded oval ring fitted against the groin, rigid metal side bars, and canvas support straps used to maintain traction and immobilize broken thigh bones.',
          desc: 'Original First World War Thomas Splint preserved in the Wellcome Historical Medical Collection, London.',
          provenance:
            'Original First World War Thomas Splint preserved in the Wellcome Historical Medical Collection, London. Designed by Hugh Owen Thomas and introduced to the Western Front in 1915–1916 by Robert Jones.',
          citation:
            'Wellcome Historical Medical Collection, London (Object No. A654128), First World War Thomas Splint.',
          question:
            'Why was the simple mechanical traction provided by the Thomas Splint shown in Source A so revolutionary in reducing compound femur fracture mortality from 80% to 20%?',
          hinge_question:
            'Why was the simple mechanical traction provided by the Thomas Splint shown in Source A so revolutionary in reducing compound femur fracture mortality from 80% to 20%?',
          source_context:
            'An authentic surviving British Army Thomas Splint preserved in the Wellcome Historical Medical Collection, London, showing the padded oval ring fitted against the groin, rigid metal side bars, and canvas support straps used to maintain traction and immobilize broken thigh bones. Hinge Question: Why was the simple mechanical traction provided by the Thomas Splint shown in Source A so revolutionary in reducing compound femur fracture mortality from 80% to 20%?',
          context:
            'An authentic surviving British Army Thomas Splint preserved in the Wellcome Historical Medical Collection, London, showing the padded oval ring fitted against the groin, rigid metal side bars, and canvas support straps used to maintain traction and immobilize broken thigh bones.',
        },
        text: '<span class="para-ref">[3.1]</span> In the opening year of the war, compound fractures of the femur (thigh bone) were among the most lethal injuries on the Western Front, carrying an appalling mortality rate of approximately 80%. When high-explosive shrapnel shattered the femur, the large thigh muscles went into violent involuntary spasms. The jagged, razor-sharp bone ends were pulled over each other like an internal saw, shredding muscle, severing the large femoral artery, and forcing anaerobic soil bacteria deep into the marrow. As soldiers were transported on stretchers and jolting horse ambulances, continuous bone movement caused catastrophic internal blood loss, sending men into irreversible haemorrhagic shock before they could reach a surgeon.<br><br><span class="para-ref">[3.2]</span> In December 1915, Welsh orthopedic surgeon <strong>Sir Robert Jones</strong> was appointed Inspector of Military Orthopedics and revolutionized treatment by introducing the <strong>Thomas Splint</strong> (<span class="archival-meta-tag">Source A</span>), designed decades earlier by his uncle Hugh Owen Thomas. The splint applied continuous mechanical <em>traction</em>: a padded oval metal ring fitted firmly against the groin and pelvis, connected to two rigid parallel metal rods extending past the foot. By strapping the soldier’s boot to the bottom crossbar and twisting cords taut with a windlass, the leg was pulled straight. This continuous tension overcame muscle spasm, aligned fractured bone fragments, and completely immobilized the thigh during transit. When trained orderlies applied the Thomas Splint at the frontline RAP before moving a casualty, compound femur fracture mortality plummeted from 80% in 1915 to just 20% by 1917—saving tens of thousands of lives.',
      },
      {
        act: 4,
        title: 'Act 4: Mobile X-Ray Units & Radiology (1914–1918)',
        theme_heading: 'Act 4: Mobile X-Ray Units & Radiology (1914–1918)',
        text: '<span class="para-ref">[4.1]</span> Discovering the exact three-dimensional location of buried shrapnel fragments was critical to successful debridement. If a surgeon had to probe blindly with metal forceps through crushed flesh to locate a bullet, they caused massive additional tissue trauma, haemorrhage, and shock. To solve this, the British Army deployed diagnostic <strong>Mobile X-Ray Units</strong>. Inspired by pioneering scientist Marie Curie—who equipped French hospital vans known as "petites Curies"—the British War Office fitted motorized vans with portable radiography equipment, darkroom developing facilities, and petrol-driven electrical dynamo generators connected directly to the automobile engine.<br><br><span class="para-ref">[4.2]</span> Traveling between Casualty Clearing Stations and forward dressing stations, mobile X-ray vans allowed radiologists to take two cross-angled diagnostic images (stereoscopic plates) of wounded casualties. These cross-referenced views enabled surgeons to pinpoint the precise location and depth of buried metal shrapnel and shattered bone fragments before picking up a scalpel. Radiologists also used fluorescent screens for real-time fluoroscopy, allowing surgeons to extract buried metal balls quickly with minimal incisions, dramatically reducing operating times and surgical shock during heavy offensives.',
      },
      {
        act: 5,
        title: 'Act 5: Tactical Limits of Battlefield X-Rays (1914–1918)',
        theme_heading: 'Act 5: Tactical Limits of Battlefield X-Rays (1914–1918)',
        text: '<span class="para-ref">[5.1]</span> Despite their revolutionary diagnostic power, battlefield X-rays faced severe physical and technical limitations in active combat zones. First World War radiography machines were delicate, temperamental instruments. The glass vacuum tubes (Crookes tubes) overheated rapidly after a few minutes of continuous operation and had to be rested to cool down, causing dangerous bottlenecks when hundreds of casualties flooded a CCS. Furthermore, transporting heavy X-ray vans and delicate glass photographic plates over rutted, shell-cratered roads frequently shattered electrical vacuum bulbs and fractured fragile glass developer plates.<br><br><span class="para-ref">[5.2]</span> Most significantly, medical historians emphasize the crucial clinical blind spot of wartime X-rays: radiography could easily detect dense, radiopaque materials like lead bullets and steel shrapnel, but was completely blind to <strong>radiolucent</strong> materials. X-rays could not reveal muddy soil, trench timber splinters, or fragments of sodden woollen khaki uniform buried deep in muscle tissue. These invisible, bacteria-saturated cloth fragments remained deadly reservoirs of <em>Clostridium welchii</em>, meaning that an apparently successful shrapnel extraction could still result in fatal post-operative gas gangrene unless complemented by thorough manual surgical debridement.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1914–1918',
        para_ref: '[1.1–1.2]',
        heading:
          'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
        bullets: [
          'Cutting away bruised, black, and dead muscle tissue',
          'Depriving hungry bacteria of rotting food',
          'Leaving surgical cuts open to wash before stitching',
        ],
        focus_clue:
          'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
      },
      {
        step: 2,
        date: '1915–1918',
        para_ref: '[2.1–2.2]',
        heading:
          'How did continuous chemical irrigation solve the problem of deep wound infection?',
        bullets: [
          'Pushing narrow rubber tubes deep into torn flesh',
          'Dripping fresh salty bleach solution day and night',
          'Killing hidden microbes before gangrene takes hold',
        ],
        focus_clue:
          'How did continuous chemical irrigation solve the problem of deep wound infection?',
      },
      {
        step: 3,
        date: 'Dec 1915–1916',
        para_ref: '[3.1–3.2]',
        heading: 'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
        bullets: [
          'Fitting padded metal oval ring around upper groin',
          'Pulling leather cords to stretch broken leg bones taut',
          'Dropping thigh fracture deaths from eighty to twenty percent',
        ],
        focus_clue:
          'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
      },
      {
        step: 4,
        date: '1914–1918',
        para_ref: '[4.1–4.2]',
        heading: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
        bullets: [
          'Running small dynamo generators off motor engines',
          'Scanning wounded soldiers right behind battle lines',
          'Locating buried steel balls before surgeon cuts',
        ],
        focus_clue: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
      },
      {
        step: 5,
        date: '1914–1918',
        para_ref: '[5.1–5.2]',
        heading: 'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
        bullets: [
          'Shattering delicate glass vacuum bulbs on bumpy tracks',
          'Overheating metal tubes after five minutes of use',
          'Failing to spot buried uniform cloth and muddy splinters',
        ],
        focus_clue:
          'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
      },
    ],
    causal_domino_spine: {
      title: 'Surgical Breakthroughs: The Thomas Splint, Wound Debridement & Mobile X-Rays',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1918',
          para_ref: '[1.1–1.2]',
          title: 'Wound Debridement & Excision',
          actor: 'Frontline Surgeons & CCS Medical Officers',
          tag: '🔪 WOUND DEBRIDEMENT',
          trigger:
            'Surgeons realized chemical antiseptics could not penetrate deep shrapnel pockets, adopting radical surgical debridement to slice away all bruised, contaminated, and dead tissue.',
          desc: 'Surgeons realized chemical antiseptics could not penetrate deep shrapnel pockets, adopting radical surgical debridement to slice away all bruised, contaminated, and dead tissue.',
          connective:
            'Deprived anaerobic gas gangrene microbes of dead biological tissue to feed upon, allowing wounds to be washed thoroughly before delayed primary closure.',
          question:
            'Why was surgical excision of dead tissue more effective than chemical antiseptics?',
        },
        {
          step: 2,
          date: '1915–1918',
          para_ref: '[2.1–2.2]',
          title: 'Carrel-Dakin Antiseptic Flush',
          actor: 'Alexis Carrel & Henry Dakin',
          tag: '🧪 CARREL-DAKIN IRRIGATION',
          trigger:
            'French surgeon Alexis Carrel and British chemist Henry Dakin designed a sterilized chemical irrigation system using a dilute, neutral sodium hypochlorite bleach solution.',
          desc: 'French surgeon Alexis Carrel and British chemist Henry Dakin designed a sterilized chemical irrigation system using a dilute, neutral sodium hypochlorite bleach solution.',
          connective:
            'Flushed deep wound recesses continuously through perforated rubber tubes, neutralizing necrotic microbes within six hours without destroying living human flesh.',
          question:
            'How did continuous chemical irrigation solve the problem of deep wound infection?',
        },
        {
          step: 3,
          date: 'Dec 1915–1916',
          para_ref: '[3.1–3.2]',
          title: 'The Thomas Splint Breakthrough',
          actor: 'Hugh Owen Thomas & Sir Robert Jones',
          tag: '🦿 THE THOMAS SPLINT',
          trigger:
            'In 1914–15, compound femur fractures carried an 80% mortality rate because broken bone fragments grated violently during transit, tearing the femoral artery and causing fatal haemorrhagic shock.',
          desc: 'In 1914–15, compound femur fractures carried an 80% mortality rate because broken bone fragments grated violently during transit, tearing the femoral artery and causing fatal haemorrhagic shock.',
          connective:
            'Sir Robert Jones introduced his uncle’s rigid traction splint to the Western Front in December 1915, pulling the leg taut and dramatically cutting compound fracture mortality from 80% down to 20%.',
          question:
            'How did rigid traction prevent fatal haemorrhage and shock from broken femurs?',
        },
        {
          step: 4,
          date: '1914–1918',
          para_ref: '[4.1–4.2]',
          title: 'Mobile X-Rays & Marie Curie',
          actor: 'Marie Curie & British Mobile X-Ray Units',
          tag: '⚡ MOBILE RADIOLOGY VANS',
          trigger:
            'British Base Hospitals and field units deployed mobile X-ray vans powered by dynamo generators directly connected to automobile petrol engines.',
          desc: 'British Base Hospitals and field units deployed mobile X-ray vans powered by dynamo generators directly connected to automobile petrol engines.',
          connective:
            'Allowed radiologists to take two cross-angled diagnostic images, pinpointing the exact depth of buried metal shrapnel and bullet fragments before surgeons made incisions.',
          question: 'Why was locating shrapnel on an X-ray vital before operating on gas gangrene?',
        },
        {
          step: 5,
          date: '1914–1918',
          para_ref: '[3.2, 4.1]',
          title: 'X-Ray Limits in Combat',
          actor: 'Field Radiologists & Hospital Mechanics',
          tag: '⚠️ RADIOLOGY COMBAT LIMITS',
          trigger:
            'Combat X-ray equipment was fragile: glass vacuum tubes overheated rapidly during heavy offensives, delicate bulbs shattered on potholed roads, and machines could not detect radiolucent materials.',
          desc: 'Combat X-ray equipment was fragile: glass vacuum tubes overheated rapidly during heavy offensives, delicate bulbs shattered on potholed roads, and machines could not detect radiolucent materials.',
          connective:
            'Failed to reveal buried mud, khaki uniform fabric, or trench timber splinters, which remained deadly bacterial breeding grounds that still caused fatal post-operative gas gangrene.',
          question:
            'Why did undetected cloth fragments remain the primary cause of post-op gangrene?',
        },
      ],
    },
  },

  lesson_5_6: {
    teacher_notes: {
      primer:
        'This enquiry explores the lifesaving medical breakthroughs achieved on the Western Front in blood storage, neurosurgery, and plastic reconstruction, examining Albert Hustin’s sodium citrate anticoagulation, Francis Rous and James Turner’s refrigerated citrate-glucose preservation, Captain Oswald Robertson’s pioneering blood bank depot at Cambrai in 1917, Harvey Cushing’s brain surgery breakthroughs under local anaesthetic, and Harold Gillies’s tubed pedicle plastic reconstruction at Queen’s Hospital, Sidcup.',
      objectives: [
        {
          objective:
            'Explain how sodium citrate anticoagulation eliminated the need for direct donor-to-patient blood transfusion tubing.',
          primer:
            'Direct students to paragraphs [1.1]–[1.2]. Emphasize that rapid clotting made transfusions nearly impossible in chaotic clearing stations until Albert Hustin and Richard Lewisohn proved sodium citrate safely neutralized calcium to prevent coagulation.',
          question:
            'How did the discovery of sodium citrate liberate blood transfusion from dangerous person-to-person tubing on the battlefield?',
        },
        {
          objective:
            'Analyse why adding dextrose-glucose was essential to maintain red blood cell viability during refrigerated storage.',
          primer:
            'Direct students to paragraphs [2.1]–[2.2]. Explain that Rous and Turner’s citrate-glucose solution nourished red blood cells, preventing hemolysis and allowing blood stored in iceboxes to remain fresh for four weeks (28 days).',
          question:
            'Why was the addition of glucose the decisive chemical breakthrough that allowed blood to be stockpiled in advance of military battles?',
        },
        {
          objective:
            'Evaluate Captain Oswald Robertson’s establishment of the world’s first military blood bank depot at Cambrai in November 1917.',
          primer:
            'Direct students to paragraphs [3.1]–[3.2] and Source A (Robertson’s Blood Storage Outfit). Detail Robertson stockpiling 22 bottles of universal Type O blood in insulated iceboxes, treating shocked casualties who would have died waiting for live donors.',
          question:
            'Why was Captain Oswald Robertson’s forward blood depot at Cambrai a transformative milestone in battlefield resuscitation medicine?',
        },
        {
          objective:
            'Examine Harvey Cushing’s surgical breakthroughs in brain trauma, including local anaesthetics, suction, and silver clips.',
          primer:
            'Direct students to paragraphs [4.1]–[4.2]. Focus on Cushing at No. 46 CCS operating under novocaine to prevent fatal brain swelling, using electromagnets for shrapnel and silver clips for bleeding, cutting brain mortality from 50% down to 29%.',
          question:
            'Why was local anaesthesia superior to general anaesthetic (ether or chloroform) when operating on severe brain trauma on the Western Front?',
        },
        {
          objective:
            'Assess how Harold Gillies’s tubed pedicle technique revolutionized facial reconstructive surgery at Queen’s Hospital, Sidcup.',
          primer:
            'Direct students to paragraphs [5.1]–[5.2] and Source B (Gillies Tubed Pedicle Technique). Explain how rolling chest skin into a living tube maintained vascular blood supply to the facial graft, restoring dignity to disfigured veterans.',
          question:
            'How did Harold Gillies’s tubed pedicle technique solve the biological problem of graft death and establish modern plastic surgery?',
        },
      ],
      source_context: {
        'Source A':
          'Source A: Captain Oswald Robertson’s Blood Storage and Transfusion Apparatus at Cambrai (1917). The authentic wooden ice chest, glass collection flasks, rubber delivery tubing, and sodium citrate solutions utilized by Captain Oswald Robertson to establish the world’s first blood bank during the Battle of Cambrai in November 1917. Hinge Question: Why was Captain Robertson’s portable ice-chest apparatus shown in Source A the critical technological breakthrough that enabled blood transfusions to be performed under battlefield conditions during surprise assaults?',
        'Source B':
          'Source B: Harold Gillies’s Tubed Pedicle Plastic Reconstruction Technique at Queen’s Hospital, Sidcup (c.1917). Clinical diagram and photographic archive documenting Harold Gillies’s revolutionary tubed pedicle technique at Queen’s Hospital, Sidcup, showing a flap of chest skin rolled into a living vascular tube to reconstruct shattered facial features. Hinge Question: How did Harold Gillies’s tubed pedicle technique shown in Source B solve the biological challenge of maintaining blood supply to newly grafted skin, and why was this essential for facial reconstruction?',
      },
    },
    narrative_blocks: [
      {
        act: 1,
        title: 'Act 1: Haemorrhagic Shock & Sodium Citrate Anticoagulation (1914–1915)',
        theme_heading: 'Act 1: Haemorrhagic Shock & Sodium Citrate Anticoagulation (1914–1915)',
        text: '<span class="para-ref">[1.1]</span> As artillery firepower intensified across the Western Front between 1914 and 1916, military surgeons confronted forms of trauma that pushed human physiology to its breaking point. The most immediate killer of wounded soldiers was <strong>haemorrhagic shock</strong>—a catastrophic collapse of systemic blood pressure caused by acute blood loss from severed arteries. A casualty who lost more than two pints of blood became hypothermic, turned ashen grey, and suffered irreversible multi-organ failure within hours, long before surgeons could perform debridement or surgical excision in an operating theatre.<br><br><span class="para-ref">[1.2]</span> Before 1914, blood transfusions were extraordinarily rare, hazardous, and impractical. Although Austrian biologist Karl Landsteiner had discovered the ABO blood group system in 1901, transfusions on the battlefield were virtually impossible because human blood naturally coagulated into solid clots within five minutes of leaving the body. Transfusions required a direct donor lying immediately beside the patient, connected arm-to-arm by a rubber tube; in a chaotic, unsanitary Casualty Clearing Station dealing with hundreds of dying men under artillery fire, finding matching live donors under bombardment was an insurmountable logistical hurdle. In 1914, Belgian doctor Albert Hustin and Argentine physician Luis Agote discovered that adding non-toxic <strong>sodium citrate</strong> to freshly drawn blood neutralized calcium ions, preventing coagulation and allowing blood to be administered indirectly via sterile glass funnels.',
      },
      {
        act: 2,
        title: 'Act 2: Glucose Refrigeration & Extended Blood Storage (1916–1917)',
        theme_heading: 'Act 2: Glucose Refrigeration & Extended Blood Storage (1916–1917)',
        text: '<span class="para-ref">[2.1]</span> While sodium citrate kept blood liquid, medical researchers encountered a critical biological barrier: citrated blood deteriorated rapidly. In 1915, American doctor Richard Weil proved that citrated blood could be kept in glass bottles in a refrigerator for a few days, but after 72 hours the fragile red blood cells broke down and lysed, releasing toxic potassium and causing severe kidney failure in recipients. Without a method to preserve living red blood cells over extended periods, medical officers could not stockpile blood in advance of major military offensives.<br><br><span class="para-ref">[2.2]</span> The decisive scientific breakthrough occurred in 1916 at the Rockefeller Institute in New York, where researchers Francis Rous and James Turner discovered that adding a <strong>citrate-glucose</strong> (dextrose) solution provided vital nutrients for the cellular metabolism of red blood cells. By mixing freshly collected blood with sodium citrate and glucose and storing it in glass medicine bottles packed inside insulated ice chests, blood could be preserved fresh, intact, and fully viable for up to four weeks (28 days). For the first time in medical history, human blood had been transformed from a perishable fluid into a storable, transportable medical commodity.',
      },
      {
        act: 3,
        title: 'Act 3: Captain Oswald Robertson & The Cambrai Blood Depot (Nov 1917)',
        theme_heading: 'Act 3: Captain Oswald Robertson & The Cambrai Blood Depot (Nov 1917)',
        source: {
          id: 'source_a_robertson_blood_depot_1917',
          letter: 'A',
          title:
            'Source A: Captain Oswald Robertson’s Blood Storage and Transfusion Apparatus at Cambrai (1917)',
          src: '/images/robertson_blood_depot_1917.jpg',
          source: '/images/robertson_blood_depot_1917.jpg',
          image: '/images/robertson_blood_depot_1917.jpg',
          caption:
            'The authentic wooden ice chest, glass collection flasks, rubber delivery tubing, and sodium citrate solutions utilized by Captain Oswald Robertson to establish the world’s first blood bank during the Battle of Cambrai in November 1917.',
          desc: 'Original portable blood transfusion apparatus preserved in the RAMC Historical Collection, London.',
          provenance:
            'Original portable blood transfusion outfit preserved in the Royal Army Medical Corps Historical Collection, London. Utilized during the Battle of Cambrai, November 1917.',
          citation:
            'RAMC Historical Collection, London (Object No. RAMC-1917-BLD), Captain Oswald Robertson Cambrai Outfit.',
          question:
            'Why was Captain Robertson’s portable ice-chest apparatus shown in Source A the critical technological breakthrough that enabled blood transfusions to be performed under battlefield conditions during surprise assaults?',
          hinge_question:
            'Why was Captain Robertson’s portable ice-chest apparatus shown in Source A the critical technological breakthrough that enabled blood transfusions to be performed under battlefield conditions during surprise assaults?',
          source_context:
            'The authentic wooden ice chest, glass collection flasks, rubber delivery tubing, and sodium citrate solutions utilized by Captain Oswald Robertson to establish the world’s first blood bank during the Battle of Cambrai in November 1917. Hinge Question: Why was Captain Robertson’s portable ice-chest apparatus shown in Source A the critical technological breakthrough that enabled blood transfusions to be performed under battlefield conditions during surprise assaults?',
          context:
            'The authentic wooden ice chest, glass collection flasks, rubber delivery tubing, and sodium citrate solutions utilized by Captain Oswald Robertson to establish the world’s first blood bank during the Battle of Cambrai in November 1917.',
        },
        text: '<span class="para-ref">[3.1]</span> In autumn 1917, Canadian-American medical officer <strong>Captain Oswald Robertson</strong>, serving with the British RAMC, recognized that Rous and Turner’s glucose discovery could revolutionize battlefield resuscitation. Preparing for the mass tank assault at the <strong>Battle of Cambrai</strong> in November 1917, Robertson established the world’s first mobile military <strong>Blood Depot</strong> (blood bank). Robertson collected blood from healthy soldiers in advance, mixed it with sodium citrate and glucose, and packed twenty-two glass bottles into customized wooden transit chests insulated with sawdust and packed with ice (<span class="archival-meta-tag">Source A</span>).<br><br><span class="para-ref">[3.2]</span> Setting up his forward blood depot at Casualty Clearing Station No. 48 near the Cambrai front, Robertson treated twenty-two soldiers suffering from lethal haemorrhagic shock who were expected to die from severe blood loss. Remarkably, twenty of the twenty-two men revived and made a full recovery. Robertson demonstrated that universal donor blood (Group O) could be harvested in advance, stockpiled in forward depots, and transfused to casualties at the point of greatest need, transforming resuscitation medicine and laying the direct organizational blueprint for modern civilian and military blood banking.',
      },
      {
        act: 4,
        title: 'Act 4: Specialized Brain Surgery: Harvey Cushing at Passchendaele (1917–1918)',
        theme_heading:
          'Act 4: Specialized Brain Surgery: Harvey Cushing at Passchendaele (1917–1918)',
        text: '<span class="para-ref">[4.1]</span> Parallel breakthroughs occurred in specialized trauma surgery. Penetrating skull and brain wounds inflicted by descending artillery shrapnel carried a catastrophic 50% mortality rate on the Western Front. American neurosurgeon <strong>Harvey Cushing</strong>, stationed at No. 46 Casualty Clearing Station near Mendinghem during the grueling Third Battle of Ypres (Passchendaele) in 1917, revolutionized brain surgery through meticulous clinical innovation. Cushing recognized that standard general anaesthesia (ether or chloroform) caused massive cerebral swelling and elevated intracranial pressure, which pushed delicate brain tissue through fractured skull defects, causing instant fatal herniation.<br><br><span class="para-ref">[4.2]</span> Cushing pioneered operating on conscious brain casualties under <strong>local anaesthetic</strong> (novocaine injected into the scalp), which kept the brain calm and unswollen. He designed an electrical suction apparatus to gently aspirate pulped, dead brain tissue, deployed powerful <em>surgical electromagnets</em> to extract deeply embedded steel shrapnel shards without lacerating healthy cerebral cortex, and used tiny silver clips to clamp delicate bleeding vessels. Cushing stitched the scalp closed using galeal sutures to protect against meningitis, reducing brain surgery mortality from over 50% down to 29% and operating on 45 severe casualties in a single 48-hour offensive, establishing modern neurosurgery.',
      },
      {
        act: 5,
        title: 'Act 5: Harold Gillies & The Tubed Pedicle Plastic Reconstruction (1917–1918)',
        theme_heading:
          'Act 5: Harold Gillies & The Tubed Pedicle Plastic Reconstruction (1917–1918)',
        source: {
          id: 'source_b_gillies_tubed_pedicle',
          letter: 'B',
          title:
            'Source B: Harold Gillies’s Tubed Pedicle Plastic Reconstruction Technique at Queen’s Hospital, Sidcup (c.1917)',
          src: '/images/gillies_tubed_pedicle.jpg',
          source: '/images/gillies_tubed_pedicle.jpg',
          image: '/images/gillies_tubed_pedicle.jpg',
          caption:
            'Clinical diagram and photograph documenting Harold Gillies’s revolutionary tubed pedicle technique at Queen’s Hospital, Sidcup, showing a flap of chest skin rolled into a living vascular tube to reconstruct shattered facial features.',
          desc: 'Primary clinical diagram and photograph of Harold Gillies’s tubed pedicle technique from Queen’s Hospital, Sidcup, c.1917.',
          provenance:
            'Primary clinical case archive of Queen’s Hospital, Sidcup, 1917–1918. Harold Gillies Plastic Surgery Archives, Royal College of Surgeons of England, London.',
          citation:
            'Queen’s Hospital Sidcup Archive, Royal College of Surgeons of England, London (Gillies Plastic Surgery Collection, c.1917).',
          question:
            'How did Harold Gillies’s tubed pedicle technique shown in Source B solve the biological challenge of maintaining blood supply to newly grafted skin, and why was this essential for facial reconstruction?',
          hinge_question:
            'How did Harold Gillies’s tubed pedicle technique shown in Source B solve the biological challenge of maintaining blood supply to newly grafted skin, and why was this essential for facial reconstruction?',
          source_context:
            'Clinical diagram and photographic archive documenting Harold Gillies’s revolutionary tubed pedicle technique at Queen’s Hospital, Sidcup, showing a flap of chest skin rolled into a living vascular tube to reconstruct shattered facial features. Hinge Question: How did Harold Gillies’s tubed pedicle technique shown in Source B solve the biological challenge of maintaining blood supply to newly grafted skin, and why was this essential for facial reconstruction?',
          context:
            'Clinical diagram and photographic archive documenting Harold Gillies’s revolutionary tubed pedicle technique at Queen’s Hospital, Sidcup, showing a flap of chest skin rolled into a living vascular tube to reconstruct shattered facial features.',
        },
        text: '<span class="para-ref">[5.1]</span> Simultaneously, New Zealand-born surgeon <strong>Harold Gillies</strong> pioneered modern reconstructive plastic and maxillofacial surgery. Because trench sentries looked directly over parapets, thousands of soldiers sustained horrific facial wounds from machine-gun bullets and shrapnel, having jaws, noses, and cheeks completely blown away. Surviving soldiers were severely disfigured and suffered profound social ostracization. Recognizing their plight, Gillies persuaded the War Office to establish a dedicated hospital at <strong>Queen’s Hospital in Sidcup</strong>, Kent, in 1917, designed specifically for facial reconstruction.<br><br><span class="para-ref">[5.2]</span> Gillies confronted a major biological hurdle: large, flat skin grafts transplanted onto open facial wounds invariably rotted and died from microbial infection and lack of blood supply. To overcome this, Gillies invented the revolutionary <strong>Tubed Pedicle</strong> technique (<span class="archival-meta-tag">Source B</span>). A flap of healthy skin was cut from the patient’s chest, neck, or forehead and rolled into an enclosed, living tube of flesh with its internal blood vessels intact, while remaining attached at one end to maintain active arterial circulation. The free end was stitched to the facial defect; once new blood vessels grew into the graft over several weeks, the stalk was severed. Gillies and his multidisciplinary team performed over 11,000 operations at Sidcup, reconstructing jaws with rib bone grafts and restoring both physical anatomy and human dignity to shattered veterans.',
      },
    ],
    workbook_stages: [
      {
        step: 1,
        date: '1914–1915',
        para_ref: '[1.1–1.2]',
        heading: 'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
        bullets: [
          'Adding chemical salts to stop blood turning into jelly',
          "Uncoupling donor arm from dying patient's vein",
          'Pouring red liquid freely through sterile glass funnels',
        ],
        focus_clue:
          'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
      },
      {
        step: 2,
        date: '1916–1917',
        para_ref: '[2.1–2.2]',
        heading: 'Why was glucose addition essential to prevent red blood cell breakdown?',
        bullets: [
          'Mixing sweet sugar syrup to feed fragile red cells',
          'Packing glass medicine bottles into insulated ice chests',
          'Keeping precious donations fresh for four weeks',
        ],
        focus_clue: 'Why was glucose addition essential to prevent red blood cell breakdown?',
      },
      {
        step: 3,
        date: 'Nov 1917',
        para_ref: '[3.1–3.2]',
        heading: 'Why did pre-stored blood transform surgical survival during surprise assaults?',
        bullets: [
          'Collecting universal Type O bottles before big attack',
          'Carrying twenty-two vacuum metal flasks to frontline',
          'Reviving dying soldiers suffering cold shock',
        ],
        focus_clue:
          'Why did pre-stored blood transform surgical survival during surprise assaults?',
      },
      {
        step: 4,
        date: '1917–1918',
        para_ref: '[4.1–4.2]',
        heading: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
        bullets: [
          'Numbing scalp with local needle jabs to stop brain swelling',
          'Clamping bleeding blood vessels with tiny silver clips',
          'Pulling out buried iron shards with magnetic rods',
        ],
        focus_clue: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
      },
      {
        step: 5,
        date: '1917–1918',
        para_ref: '[5.1–5.2]',
        heading: 'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
        bullets: [
          'Rolling chest skin into living round meat tubes',
          'Keeping blood pumping into graft while it stitches to face',
          'Sculpting new noses, chins, and jaws for shattered soldiers',
        ],
        focus_clue:
          'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
      },
    ],
    causal_domino_spine: {
      title: 'Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
      subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
      stages: [
        {
          step: 1,
          date: '1914–1915',
          para_ref: '[1.1–1.2]',
          title: 'Sodium Citrate & Clotting',
          actor: 'Albert Hustin & Richard Lewisohn',
          tag: '🩸 SODIUM CITRATE ANTICOAGULANT',
          trigger:
            'Before 1914, blood transfusions required connecting donor and patient arm-to-arm with rubber tubes because blood coagulated into solid clots within minutes of leaving the human body.',
          desc: 'Before 1914, blood transfusions required connecting donor and patient arm-to-arm with rubber tubes because blood coagulated into solid clots within minutes of leaving the human body.',
          connective:
            'Belgian doctor Albert Hustin discovered that adding non-toxic sodium citrate prevented clotting, allowing blood to be collected in advance and administered indirectly via glass funnels.',
          question:
            'How did sodium citrate liberate blood transfusion from donor-to-patient tubing?',
        },
        {
          step: 2,
          date: '1916–1917',
          para_ref: '[2.1–2.2]',
          title: 'Citrate-Glucose Blood Storage',
          actor: 'Francis Rous & James Turner',
          tag: '❄️ REFRIGERATED GLUCOSE STORAGE',
          trigger:
            'In 1916, Francis Rous and James Turner discovered that adding a dextrose-glucose sugar solution nourished red blood cells and prevented cellular breakdown during storage.',
          desc: 'In 1916, Francis Rous and James Turner discovered that adding a dextrose-glucose sugar solution nourished red blood cells and prevented cellular breakdown during storage.',
          connective:
            'Allowed citrated blood bottled in glass medicine containers and packed in insulated iceboxes to remain fresh, viable, and transfusable for up to four weeks.',
          question: 'Why was glucose addition essential to prevent red blood cell breakdown?',
        },
        {
          step: 3,
          date: 'Nov 1917',
          para_ref: '[3.1–3.2]',
          title: 'Cambrai Blood Bank Depot',
          actor: 'Captain Oswald Robertson (US Army / British RAMC)',
          tag: '🧊 CAMBRAI BLOOD DEPOT',
          trigger:
            'Ahead of the British tank offensive at Cambrai in November 1917, Captain Oswald Robertson established the world’s first forward military blood bank depot, stocking 22 units of universal Type O blood in ice chests.',
          desc: 'Ahead of the British tank offensive at Cambrai in November 1917, Captain Oswald Robertson established the world’s first forward military blood bank depot, stocking 22 units of universal Type O blood in ice chests.',
          connective:
            'Treated 20 severely shocked casualties who would have died waiting for live donors, reviving 11 and proving that stored blood banks were practical on active battlefields.',
          question:
            'Why did pre-stored blood transform surgical survival during surprise assaults?',
        },
        {
          step: 4,
          date: '1917–1918',
          para_ref: '[4.1–4.2]',
          title: 'Harvey Cushing’s Brain Surgery',
          actor: 'Harvey Cushing (Pioneering Neurosurgeon)',
          tag: '🧠 NEUROSURGERY & SILVER CLIPS',
          trigger:
            'American neurosurgeon Harvey Cushing operated at CCS No. 46, abandoning traditional scalpels and ether to introduce local anaesthetic injections (preventing brain swelling and fatal intracranial pressure).',
          desc: 'American neurosurgeon Harvey Cushing operated at CCS No. 46, abandoning traditional scalpels and ether to introduce local anaesthetic injections (preventing brain swelling and fatal intracranial pressure).',
          connective:
            'Used surgical magnets to extract shrapnel and tiny silver clips to stop delicate cerebral haemorrhages, raising surgical brain wound survival from 50% to over 71%.',
          question: 'Why was local anaesthesia superior to general anaesthetic in head trauma?',
        },
        {
          step: 5,
          date: '1917–1918',
          para_ref: '[5.1–5.2]',
          title: 'Harold Gillies at Sidcup',
          actor: "Harold Gillies & Queen's Hospital Sidcup",
          tag: '🎭 TUBED PEDICLE PLASTIC SURGERY',
          trigger:
            'New Zealand surgeon Harold Gillies established a specialized facial reconstruction hospital at Queen’s Hospital, Sidcup, in 1917 to rebuild jaws and faces destroyed by bullet fire and shrapnel.',
          desc: 'New Zealand surgeon Harold Gillies established a specialized facial reconstruction hospital at Queen’s Hospital, Sidcup, in 1917 to rebuild jaws and faces destroyed by bullet fire and shrapnel.',
          connective:
            'Invented the "tubed pedicle" graft, rolling skin into living tubes connected to the chest to preserve blood supply until the new facial graft established its own circulation, completing over 11,000 pioneering plastic operations.',
          question:
            'How did the tubed pedicle technique prevent skin grafts from rotting and dying?',
        },
      ],
    },
  },
};

for (let i = 20; i <= 25; i++) {
  const lesson = unitData.lessons[i];
  const updateData = KT5_5_ACT_DATA[lesson.id];
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
  '\n✅ Successfully migrated Key Topic 5 (Western Front) to 5-Act Gold Standard in data.js!',
);
