// scripts/build_western_front_lessons.cjs
// Complete academic authoring of the 6 Christine Counsell 4-Act lessons for KT5 (Western Front).
// Fully compliant with Pearson Edexcel GCSE History Paper 1 Section A specification.

const lesson_5_1 = {
  id: 'lesson_5_1',
  title: 'KT5.1: The Theatre of War: The British Sector, Trench Geography & Battles (1914–1918)',
  enquiry_question:
    'How did the geography of the British sector and trench design shape medical challenges on the Western Front?',
  key_topic: 'KT5: The British Sector of the Western Front, 1914–18',
  period: 'western_front',
  banner: '/images/aerial_trench_ypres.jpg',
  banner_position: 'center',
  hook_text:
    'In autumn 1914, the mobile war of movement ground to a shuddering halt in the mud of northern France and Flanders. Confronted by lethal rapid-firing artillery and Vickers machine guns, British and German armies dug thousands of miles of opposing earthworks stretching from the Swiss border to the North Sea. The British sector—defending key Channel ports and the precarious Ypres Salient—forced military doctors to operate inside waterlogged, shell-smashed ditches where every geological feature dictated life, death, and casualty evacuation.',
  teacher_notes: {
    primer:
      'Establish the physical, tactical, and geological environment of the British sector on the Western Front. Students must understand why static trench warfare developed in autumn 1914, how the four-tier trench system functioned (frontline, support, reserve, communication), and how the specific terrain of the Ypres Salient, the Somme, Arras, and Cambrai created distinct medical and tactical crises.',
    objectives: [
      {
        objective:
          'Explain why armies constructed trench systems and describe the structural layout of the British sector.',
        primer:
          'Direct students to paragraphs [1.1] and [2.1]. Emphasize the defensive power of machine guns and high-explosive artillery that forced soldiers underground. Highlight the zig-zag traverse pattern of trenches designed to localize shell blasts and prevent enfilade machine-gun fire.',
      },
      {
        objective:
          'Analyze the strategic vulnerability of the Ypres Salient and the medical challenges of fighting in Flanders clay.',
        primer:
          'Guide students through paragraph [2.2] and Source A and Source B. Contrast the low-lying, clay-rich water table of the Ypres Salient—surrounded on three sides by German artillery on higher ridges—with the chalk tunnels of Arras. Focus on why duckboards and drainage pumps repeatedly failed under bombardment.',
      },
      {
        objective:
          'Assess the medical impact of major British offensives at the Somme (1916), Arras (1917), and Cambrai (1917).',
        primer:
          'Direct students to paragraphs [3.1]–[3.2] and [4.1]. Examine the catastrophic casualty crisis of 1 July 1916 (57,000 casualties) which exposed severe transport bottlenecks, contrasted with the subterranean medical fortress built inside the chalk quarries at Arras (Thompson’s Cave).',
      },
    ],
  },
  learning_objectives: [
    'Explain the defensive layout of the trench system and why static warfare developed in autumn 1914.',
    'Describe the strategic vulnerability and medical difficulties of fighting in the Ypres Salient.',
    'Evaluate the medical and logistical challenges posed by the major battles of the Somme, Arras, and Cambrai.',
  ],
  do_now: [
    {
      q: 'Describe one feature of aseptic surgical techniques developed before 1914. [2 marks]',
      feature:
        'The sterilisation of all surgical instruments, gowns, and rubber gloves using high-pressure steam autoclaves before operations began.',
      detail:
        'This created an entirely germ-free operating theatre environment, preventing bacteria from entering open incisions and dramatically reducing post-operative sepsis.',
      a: 'Feature: The sterilisation of all surgical instruments, gowns, and rubber gloves using high-pressure steam autoclaves before operations began.\nDetail: This created an entirely germ-free operating theatre environment, preventing bacteria from entering open incisions and dramatically reducing post-operative sepsis.',
    },
    {
      q: 'Describe one feature of Wilhelm Röntgen’s discovery of X-rays in 1895. [2 marks]',
      feature:
        'The ability of high-frequency electromagnetic radiation to penetrate human soft tissue and expose photographic plates behind bones.',
      detail:
        'This allowed doctors for the first time to diagnose internal skeletal fractures and locate foreign bodies inside living patients without invasive exploratory surgery.',
      a: 'Feature: The ability of high-frequency electromagnetic radiation to penetrate human soft tissue and expose photographic plates behind bones.\nDetail: This allowed doctors for the first time to diagnose internal skeletal fractures and locate foreign bodies inside living patients without invasive exploratory surgery.',
    },
    {
      q: 'Describe one feature of Karl Landsteiner’s discovery of human blood groups in 1901. [2 marks]',
      feature:
        'The identification of distinct ABO blood types based on specific antigens present on the surface of red blood cells.',
      detail:
        'This proved that transfusions between incompatible blood groups caused fatal agglutination (clumping) of red cells, establishing the necessity of donor-recipient matching.',
      a: 'Feature: The identification of distinct ABO blood types based on specific antigens present on the surface of red blood cells.\nDetail: This proved that transfusions between incompatible blood groups caused fatal agglutination (clumping) of red cells, establishing the necessity of donor-recipient matching.',
    },
    {
      q: 'Describe one feature of Florence Nightingale’s pavilion hospital design in the late 19th century. [2 marks]',
      feature:
        'Separate, well-ventilated hospital pavilions with cross-ventilation windows and easily scrubbed, non-porous tiled surfaces.',
      detail:
        'This dispersed airborne foul air and reduced cross-infection between different wards, establishing modern nursing hygiene standards before the war.',
      a: 'Feature: Separate, well-ventilated hospital pavilions with cross-ventilation windows and easily scrubbed, non-porous tiled surfaces.\nDetail: This dispersed airborne foul air and reduced cross-infection between different wards, establishing modern nursing hygiene standards before the war.',
    },
    {
      q: 'Describe one feature of the pre-war limitation of blood transfusions in 1914. [2 marks]',
      feature:
        'The inability to store blood outside the human body for more than a few minutes because blood naturally coagulated (clotted).',
      detail:
        'Consequently, transfusions required direct person-to-person connection via tubes, making transfusions impossible to carry out on a chaotic, mass-casualty battlefield.',
      a: 'Feature: The inability to store blood outside the human body for more than a few minutes because blood naturally coagulated (clotted).\nDetail: Consequently, transfusions required direct person-to-person connection via tubes, making transfusions impossible to carry out on a chaotic, mass-casualty battlefield.',
    },
  ],
  narrative_blocks: [
    {
      act: 1,
      title: 'Act 1: Context & Catalyst (The Race to the Sea & Static Warfare)',
      text: '<span class="para-ref">[1.1]</span> In August 1914, the British Expeditionary Force (BEF) deployed to France expecting a war of rapid movement, sweeping cavalry maneuvers, and decisive open-field engagements. However, the lethal reality of industrialized firepower immediately shattered these nineteenth-century tactical assumptions. Modern breech-loading artillery firing high-explosive shells, combined with rapid-firing Vickers machine guns capable of discharging 500 rounds per minute, rendered open infantry advances suicidal. Following the Battle of the Marne and the subsequent "Race to the Sea," both armies attempted to outflank each other northwards until they collided with the Belgian coast.<br><br><span class="para-ref">[1.2]</span> By November 1914, with neither side able to break through, soldiers dug into the earth to escape the devastating hail of artillery shrapnel and rifle fire. What began as shallow, temporary scrape ditches evolved into an intricate, continuous defensive earthwork extending over 400 miles from the English Channel to the Swiss frontier. For the British Army, the Western Front was concentrated in northern France and Belgium, tasked with defending the critical Channel ports of Boulogne, Calais, and Dunkirk—the vital logistical lifeline through which food, ammunition, fresh reinforcements, and medical supplies flowed from Britain.',
    },
    {
      act: 2,
      title: 'Act 2: Escalation & Conflict (Trench Architecture & The Flanders Salient)',
      text: '<span class="para-ref">[2.1]</span> The British trench system was not a single ditch, but an elaborate four-tier network arranged in depth. The <em>frontline trench</em>, situated within 50 to 200 yards of the German lines, was where troops mounted guard on the raised firestep. Behind it lay the <em>support trench</em> (roughly 80 yards back) and the <em>reserve trench</em> (several hundred yards further behind), housing counter-attack battalions. Connecting these parallel tiers were deep, zig-zagging <em>communication trenches</em> through which stretcher bearers, food carriers, and relief troops moved under cover. To prevent enemy machine gunners from firing along the entire trench if they breached the parapet, trenches were deliberately dug with sharp right-angled bends called <em>traverses</em>. Aerial reconnaissance photographs (<span class="archival-meta-tag">Source A</span>) reveal this unmistakable saw-tooth geometry, designed to localize high-explosive shell bursts to a single firebay.<br><br><span class="para-ref">[2.2]</span> The most contested and deadly sector held by British forces was the <strong>Ypres Salient</strong> in West Flanders. A "salient" is an outward military bulge into enemy territory, surrounded on three sides. At Ypres, the German army held the higher, surrounding crescent of ridges (such as Passchendaele and Messines), giving them commanding artillery observation over every British movement in the low-lying basin below. Geologically, Flanders consisted of thick clay with a water table just two to three feet below the surface. When prolonged shelling pulverized the natural land drainage ditches, the ground liquefied into an ocean of putrid mud. British frontline trenches could rarely be dug more than two feet deep; instead, soldiers constructed sandbagged breastworks above ground level.',
    },
    {
      act: 3,
      title: 'Act 3: Forensic Evidence (Battleground Sectors: Somme, Arras & Cambrai)',
      text: '<span class="para-ref">[3.1]</span> Between 1915 and 1917, British commanders launched major offensives across distinct geographical sectors, each confronting the Royal Army Medical Corps (RAMC) with unprecedented trauma. In the Ypres Salient, incessant rain and artillery bombardment transformed communication trenches into impassable, waist-deep canals (<span class="archival-meta-tag">Source B</span>). Stretcher bearers took six to ten hours to haul a single wounded soldier through a few miles of liquefied mud, with many drowning in liquid-filled shell craters before reaching an aid post. At Hill 60, a man-made hillock near Ypres, British tunnelling companies burrowed deep into the sand and clay to detonate massive underground mines in April 1915, blasting craters that became immediate focal points of intense hand-to-hand combat and shattered limb wounds.<br><br><span class="para-ref">[3.2]</span> South in the Somme sector, chalky downland provided drier ground but no relief from industrial slaughter. On 1 July 1916—the catastrophic first day of the Battle of the Somme—the British Army suffered 57,470 casualties, including 19,240 dead. The sheer volume of wounded men completely swamped the chain of evacuation: motor ambulances broke down, dressing stations ran out of morphine and bandages, and casualties lay unattended on open stretchers for days. Conversely, at <strong>Arras</strong> in northern France, the British exploited ancient subterranean Roman and medieval chalk quarries. In 1916–17, New Zealand and British tunnelling companies linked these caverns into a vast underground city capable of sheltering 25,000 men. This subterranean fortress included electric lighting, running water, and an immense 700-bed underground hospital known as <em>Thompson’s Cave</em>, allowing surgeons to operate free from the terror of surface artillery bombardment.',
    },
    {
      act: 4,
      title: 'Act 4: The Historical Verdict & Historiographical Debate',
      text: '<span class="para-ref">[4.1]</span> At the Battle of Cambrai in November 1917, the British deployed massed tank assaults across rolling, unbroken agricultural chalkland, demonstrating how terrain dictated tactical breakthroughs. Historiographers debate whether the horrific casualties of the Western Front were the inevitable consequence of industrial technology outstripping communications, or the result of rigid command doctrine. Early revisionist historians termed British generals "donkeys leading lions," emphasizing callous incompetence in ordering infantry against intact barbed wire in waterlogged terrain. Conversely, modern military and medical historians, such as Gary Sheffield and Mark Harrison, demonstrate that the British Army underwent a colossal, rapid learning curve. Operating on the Western Front required solving logistical, sanitary, and surgical challenges never before witnessed in human history.<br><br><span class="para-ref">[4.2]</span> Ultimately, the British sector was defined by its geological constraints. In the flooded clay of the Ypres Salient, medical evacuation was an excruciating battle against physical exhaustion and drowning; in the chalk caverns of Arras, medical teams created sophisticated subterranean operating wards; and at the Somme, the staggering volume of battlefield casualties forced the RAMC to transform from a rudimentary transport corps into a mechanized, triage-driven medical machine. The physical terrain of northern France and Flanders was not merely the background to the war—it was the active crucible that forged modern trauma medicine.',
    },
  ],
  sources: [
    {
      id: 'source_a_aerial_trench_ypres',
      letter: 'A',
      title:
        'Source A: Aerial Reconnaissance Photograph of British Trench System near Ypres (1917)',
      src: '/images/aerial_trench_ypres.jpg',
      source: '/images/aerial_trench_ypres.jpg',
      image: '/images/aerial_trench_ypres.jpg',
      caption:
        'Royal Flying Corps aerial photograph showing the intricate zig-zag traverses of frontline, support, and communication trenches near Ypres, criss-crossed with artillery shell craters.',
      desc: 'Aerial reconnaissance photograph capturing the geometric layout of British trenches and cratered terrain.',
      provenance:
        'Official military aerial photograph taken by the Royal Flying Corps, British Sector near Ypres, 1917. Imperial War Museum Collection (Shelfmark: Q 42231).',
      citation:
        'Royal Flying Corps Aerial Reconnaissance, British Sector near Ypres, 1917 (Imperial War Museum Q 42231).',
      source_context:
        'An authentic aerial reconnaissance photograph taken by the Royal Flying Corps in 1917 showing the complex defensive network of British frontline, support, and communication trenches in the Ypres sector, displaying the characteristic zig-zag traverse design and dense shell cratering.',
      context:
        'An authentic aerial reconnaissance photograph taken by the Royal Flying Corps in 1917 showing the complex defensive network of British frontline, support, and communication trenches in the Ypres sector, displaying the characteristic zig-zag traverse design and dense shell cratering.',
      hinge_question:
        'Study Source A. How does the zig-zag design of the trenches shown in the photograph explain how British defensive engineers sought to protect soldiers from artillery shrapnel and machine-gun fire?',
    },
    {
      id: 'source_b_flooded_trench',
      letter: 'B',
      title: 'Source B: Photograph of a Flooded Communication Trench in the Ypres Salient (1917)',
      src: '/images/gw_flooded_trench.jpg',
      source: '/images/gw_flooded_trench.jpg',
      image: '/images/gw_flooded_trench.jpg',
      caption:
        'British soldiers navigating a communication trench submerged in muddy water during the Third Battle of Ypres (Passchendaele), showing duckboards floating and collapsed trench revetments.',
      desc: 'Primary wartime photograph of British infantry navigating waist-deep water in a communication trench.',
      provenance:
        'Official British Army photograph taken by Lieutenant Ernest Brooks, Western Front, Flanders, 1917. Imperial War Museum Collection (Shelfmark: Q 5935).',
      citation:
        'Lieut. Ernest Brooks, Official British War Office Photograph, Flanders, 1917 (Imperial War Museum Q 5935).',
      source_context:
        'Official photograph taken by British war photographer Ernest Brooks in 1917 during the Third Battle of Ypres, documenting the extreme waterlogging of communication trenches caused by heavy autumn rainfall and the destruction of Flanders clay drainage systems by artillery fire.',
      context:
        'Official photograph taken by British war photographer Ernest Brooks in 1917 during the Third Battle of Ypres, documenting the extreme waterlogging of communication trenches caused by heavy autumn rainfall and the destruction of Flanders clay drainage systems by artillery fire.',
      hinge_question:
        'How does the physical state of the trench in Source B illustrate why carrying wounded soldiers by stretcher to dressing stations frequently took up to ten hours?',
    },
  ],
  vocab: [
    {
      term: 'Frontline Trench',
      definition:
        'The foremost defensive trench situated closest to enemy lines, featuring a firestep, sandbag parapet, and barbed wire entanglements, where infantry mounted guard.',
    },
    {
      term: 'Communication Trench',
      definition:
        'Deep, connecting trenches dug at right angles to parallel lines, allowing fresh troops, ammunition, food, and stretcher-borne casualties to move under cover.',
    },
    {
      term: 'Traverse',
      definition:
        'A sharp 90-degree bend or earthwork buttress constructed into trench lines to prevent enemy riflemen firing down the ditch and contain artillery shell bursts.',
    },
    {
      term: 'Ypres Salient',
      definition:
        'A highly vulnerable, low-lying British military bulge around the medieval town of Ypres, surrounded on three sides by German forces holding higher commanding ridges.',
    },
    {
      term: 'Thompson’s Cave',
      definition:
        'A vast subterranean 700-bed British military hospital constructed inside ancient chalk quarries beneath Arras, featuring electric lighting and operating theatres.',
    },
  ],
  gcse_task: {
    title: 'Exam Practice: Section A (The Western Front)',
    tasks: [
      {
        tariff: 'Question 2(a) [4 marks]',
        stem: 'Study Source A. How useful is Source A for an enquiry into the defensive layout and design of the trench system on the Western Front? Explain your answer, using Source A and your knowledge of the historical context. [4 marks]',
        provenance_clue:
          'Consider the nature of an official military aerial reconnaissance photograph taken by the Royal Flying Corps in 1917. What objective details does it capture from above, and what limitations does an aerial perspective have regarding internal trench conditions?',
        model_answer:
          'Source A is highly useful for investigating the defensive layout of trenches because it provides an objective, photographic overhead view of the actual British earthworks in the Ypres sector. It clearly shows the characteristic zig-zag traverse pattern of frontline and communication trenches, which was specifically engineered so that artillery shell fragments and shrapnel were confined to a single bay, preventing an exploding shell from killing men down the entire line. It also reveals the dense carpet of artillery craters, corroborating historical knowledge that over 70% of battlefield casualties were caused by heavy shell fire. However, Source A is limited because, as a high-altitude military aerial photograph, it cannot show the ground-level conditions inside the trenches—such as waterlogging, mud depth, the presence of duckboards, or the difficulty stretcher bearers faced navigating those tight, right-angled corners with heavily wounded soldiers.',
      },
      {
        tariff: 'Question 2(b) [4 marks]',
        stem: 'Study Source B. How could you follow up Source B to find out more about the difficulties stretcher bearers faced when evacuating casualties in the Ypres Salient? In your answer, you must give the question you would ask and the type of source you would use. [4 marks]',
        table: [
          {
            row: 'Detail in Source B that I would follow up:',
            model:
              'The waist-deep water and collapsed mud walls of the communication trench where the duckboards are submerged.',
          },
          {
            row: 'Question I would ask:',
            model:
              'How many hours did it take stretcher bearers to transport a single wounded soldier through flooded communication trenches to the Regimental Aid Post?',
          },
          {
            row: 'Type of source I would look for:',
            model:
              'The personal war diary or official unit logbook of an RAMC Field Ambulance or Regimental Medical Officer serving in the Ypres Salient in 1917.',
          },
          {
            row: 'How this might help answer my question:',
            model:
              'It would provide firsthand, contemporary records of the exact evacuation times, physical exhaustion, and number of stretcher bearers required per casualty during wet weather in Flanders.',
          },
        ],
      },
    ],
  },
};

// ============================================================================
// LESSON 5.2: The Trench Environment: Mud, Vermin & Non-Combat Illnesses
// ============================================================================
const lesson_5_2 = {
  id: 'lesson_5_2',
  title: 'KT5.2: The Trench Environment: Mud, Vermin & Non-Combat Illnesses (1914–1918)',
  enquiry_question:
    'How did the horrific physical environment of the trenches create widespread non-combat medical crises?',
  key_topic: 'KT5: The British Sector of the Western Front, 1914–18',
  period: 'western_front',
  banner: '/images/cheshire_regiment_trench.png',
  banner_position: 'center',
  hook_text:
    'Long before an infantryman faced enemy machine guns or artillery barrages, he fought an agonizing daily battle against the environment itself. Submerged in freezing, stagnant water saturated with human excrement and decomposing corpses, soldiers fell prey to devastating non-combat ailments. From the black, rotting necrosis of trench foot to the debilitating bone-pain of trench fever spread by swarms of body lice, maintaining the physical health of an army in the trenches demanded ruthless preventive medical discipline.',
  teacher_notes: {
    primer:
      'Examine the non-combat environmental illnesses that incapacitated hundreds of thousands of British soldiers: Trench Foot, Trench Fever, and Dysentery. Emphasize that disease and infection threatened military manpower just as severely as enemy artillery. Focus on the preventive regimens enforced by the RAMC and combat officers—whale oil, buddy inspections, delousing stations, and chloride of lime water purification.',
    objectives: [
      {
        objective: 'Explain the cause, symptoms, and medical treatment of Trench Foot.',
        primer:
          'Direct students to paragraphs [1.2] and [2.1]. Clarify that trench foot was caused by prolonged immersion in cold, damp conditions combined with tight puttees constricting blood circulation. Contrast the 20,000 casualties in winter 1914 with the dramatic reduction achieved through whale oil greasing, dry socks, and duckboards.',
      },
      {
        objective: 'Analyze the transmission and impact of Trench Fever and Body Lice.',
        primer:
          'Examine paragraph [3.1]. Explain that body lice nested in the warm seams of woollen service uniforms and transmitted the bacterium Bartonella quintana through their faeces when soldiers scratched bites. Point out that trench fever was not fatal, but it put soldiers out of action for up to a month.',
      },
      {
        objective: 'Evaluate the role of underground dressing stations and sanitation measures.',
        primer:
          'Guide students through paragraph [3.2], Source A, and Source B. Contrast surface trench squalor with secure underground facilities like the Ramparts Dressing Station at Ypres. Explain how chlorination of water carts with chloride of lime suppressed lethal waterborne dysentery.',
      },
    ],
  },
  learning_objectives: [
    'Explain the causes, symptoms, and preventive measures enforced against trench foot.',
    'Describe the symptoms and transmission of trench fever by body lice.',
    'Evaluate the importance of latrine sanitation, water chlorination, and underground dressing stations.',
  ],
  do_now: [
    {
      q: 'Describe one feature of the communications trenches in the Western Front trench system. [2 marks]',
      feature:
        'Deep zig-zagging trenches that connected the frontline and support trenches back to reserve lines and medical aid posts.',
      detail:
        'They allowed fresh troops, munitions, and stretcher-borne casualties to move between zones under continuous cover from enemy fire.',
      a: 'Feature: Deep zig-zagging trenches that connected the frontline and support trenches back to reserve lines and medical aid posts.\nDetail: They allowed fresh troops, munitions, and stretcher-borne casualties to move between zones under continuous cover from enemy fire.',
    },
    {
      q: 'Describe one feature of the Ypres Salient as a military battleground. [2 marks]',
      feature:
        'A vulnerable British bulge into German lines surrounded on three sides by German artillery on commanding ridges.',
      detail:
        'This allowed German gunners to fire onto British positions from multiple angles, creating exceptionally high casualty numbers in the low-lying basin.',
      a: 'Feature: A vulnerable British bulge into German lines surrounded on three sides by German artillery on commanding ridges.\nDetail: This allowed German gunners to fire onto British positions from multiple angles, creating exceptionally high casualty numbers in the low-lying basin.',
    },
    {
      q: 'Describe one feature of the underground tunnel system constructed at Arras in 1916–17. [2 marks]',
      feature:
        'The expansion of ancient chalk quarries by miners into an interconnected subterranean city sheltering 25,000 men.',
      detail:
        'The complex included electric lighting, running water, and an underground 700-bed dressing station (Thompson’s Cave) safe from surface artillery.',
      a: 'Feature: The expansion of ancient chalk quarries by miners into an interconnected subterranean city sheltering 25,000 men.\nDetail: The complex included electric lighting, running water, and an underground 700-bed dressing station (Thompson’s Cave) safe from surface artillery.',
    },
    {
      q: 'Describe one feature of the zig-zag traverse design used in frontline trenches. [2 marks]',
      feature:
        'Trenches were constructed with sharp right-angled bends (traverses) rather than long, straight ditches.',
      detail:
        'This prevented enemy soldiers from firing down the entire ditch and confined high-explosive shell bursts to a single bay.',
      a: 'Feature: Trenches were constructed with sharp right-angled bends (traverses) rather than long, straight ditches.\nDetail: This prevented enemy soldiers from firing down the entire ditch and confined high-explosive shell bursts to a single bay.',
    },
    {
      q: 'Describe one feature of the Battle of the Somme (1916) for British medical services. [2 marks]',
      feature:
        'An overwhelming deluge of casualties on 1 July 1916, with 57,470 British soldiers wounded or killed on the first day.',
      detail:
        'This immense volume completely swamped dressing stations and ambulance logistics, leaving thousands of casualties lying unattended for days.',
      a: 'Feature: An overwhelming deluge of casualties on 1 July 1916, with 57,470 British soldiers wounded or killed on the first day.\nDetail: This immense volume completely swamped dressing stations and ambulance logistics, leaving thousands of casualties lying unattended for days.',
    },
  ],
  narrative_blocks: [
    {
      act: 1,
      title: 'Act 1: Context & Catalyst (The Flanders Sludge & The Water Table)',
      text: '<span class="para-ref">[1.1]</span> The physical geography of northern France and Flanders exerted a relentless, hostile pressure on the health of the British Army. The coastal plains of Belgium and northern France were naturally low-lying, reclaimed marshland underlain by impermeable, dense clay. Beneath the soil, the water table sat mere feet below the surface. Before 1914, this rich agricultural land was maintained by an intricate, fragile system of underground ceramic drainage pipes, roadside ditches, and drainage dykes. Millions of high-explosive artillery shells systematically pulverized this drainage infrastructure, turning the topsoil into a liquid soup of putrid mud.<br><br><span class="para-ref">[1.2]</span> For British soldiers stationed in the trenches, standing in cold, stagnant water was an inescapable reality of daily life. In winter, temperatures regularly plunged below freezing, chilling the mud to ice. Furthermore, soldiers wore tight woollen puttees—long fabric strips wrapped tightly around the calves and ankles from the boot to the knee. When drenched in freezing mud, the wool shrank, acting as an unintended tourniquet that severely restricted peripheral blood flow to the lower extremities. By November 1914, medical officers noted an alarming epidemic: thousands of men were reporting to medical dugouts unable to walk, their feet swollen, numb, and drained of color.',
    },
    {
      act: 2,
      title: 'Act 2: Escalation & Conflict (Trench Foot Pathology & Whale Oil Discipline)',
      text: '<span class="para-ref">[2.1]</span> <strong>Trench Foot</strong> was a clinical condition caused by prolonged exposure to cold, damp, and unsanitary conditions, aggravated by poor circulation. Unlike frostbite, which occurs at sub-zero temperatures, trench foot developed in temperatures up to 15°C (60°F) if feet remained continuously immersed for over twelve hours. The cold caused peripheral vasoconstriction, starving skin and muscle tissue of oxygen. Feet became pale, cold, and numb; as circulation failed, the skin turned mottled blue, then necrotic black. If left untreated, secondary bacterial infections set in, leading to moist gangrene. To save the soldier’s life from fatal blood poisoning (septicemia), military surgeons had no choice but to amputate the necrotic toes or the entire foot.<br><br><span class="para-ref">[2.2]</span> During the harsh winter of 1914–1915, over 20,000 British soldiers were medically evacuated from the Western Front suffering from trench foot. Recognizing this colossal drain on fighting manpower, British High Command implemented ruthless preventive protocols. Combat units were issued barrels of <em>whale oil</em>—a thick, water-repellent animal grease. Soldiers were organized into mandatory "buddy pairs," inspecting each other’s feet daily, washing them in clean water, and vigorously rubbing them with whale oil to form a waterproof barrier (<span class="archival-meta-tag">Source A</span>). Every infantryman was required to carry three pairs of dry woollen socks, exchanging wet socks for dry ones twice daily. Units constructed raised wooden <em>duckboards</em> along trench floors to keep boots above stagnant water. Officers who permitted trench foot cases in their platoon faced severe disciplinary charges, transforming trench foot from an unavoidable medical malady into a punishable failure of military discipline.',
    },
    {
      act: 3,
      title: 'Act 3: Forensic Evidence (Vermin, Trench Fever & Dysentery)',
      text: '<span class="para-ref">[3.1]</span> While trench foot assaulted the feet, a microscopic parasite besieged the body. <strong>Body lice</strong> (<em>Pediculus humanus corporis</em>) infested virtually every soldier on the Western Front. Living in the warm inner seams of woollen tunics and trousers, lice multiplied at an astonishing rate, laying pale eggs ("nits") in clothing fabric. Soldiers spent off-duty hours "chatting"—running candle flames along uniform seams to pop the lice. The constant itching caused severe sleep deprivation, but the primary medical danger was <strong>Trench Fever</strong> (Pyrexia of Unknown Origin). In 1918, medical researchers proved that trench fever was caused by the bacterium <em>Bartonella quintana</em>, transmitted through louse faeces. When soldiers scratched inflamed bite wounds, louse excrement was rubbed directly into the broken skin. Trench fever caused sudden shivering, splitting headaches, severe aching in the shins, and recurring high fevers lasting up to a month, incapacitating up to 15% of an army’s strength at any one time.<br><br><span class="para-ref">[3.2]</span> To combat lice, the RAMC established extensive divisional <em>delousing stations</em> behind the lines, where uniforms were baked inside pressurized steam autoclaves while soldiers bathed. Equally dangerous was <strong>dysentery</strong>—a severe intestinal infection causing violent abdominal cramps and bloody diarrhea. In the frontline, men were forced to defecate into open chloride of lime buckets or shallow latrine pits. Swarms of flies transferred pathogenic bacteria from human faeces directly onto soldiers’ rations. To prevent devastating cholera and typhoid outbreaks, the RAMC enforced strict sanitary policing: drinking water was rigorously purified by adding <em>chloride of lime</em> (chlorine) to mobile water carts, while subterranean shelters like the <strong>Ramparts Medical Station</strong> at Ypres (<span class="archival-meta-tag">Source B</span>) provided clean, dry, protected underground wards carved into medieval stone walls.',
    },
    {
      act: 4,
      title: 'Act 4: The Historical Verdict & Historiographical Debate',
      text: '<span class="para-ref">[4.1]</span> Historiographers debate whether the non-combat medical crises on the Western Front represented an inevitable consequence of prolonged ditch warfare or a triumph of British preventive medicine. Early popular accounts portrayed soldiers as helpless victims abandoned to filthy, rat-infested squalor. However, modern medical historians, such as Mark Harrison in <em>The Medical War</em> (2010), highlight that the British Army achieved an extraordinary sanitary record compared to previous conflicts. In the Crimean War (1853–56) and the Boer War (1899–1902), disease killed four to five times more British soldiers than enemy bullets. On the Western Front, through relentless preventive discipline, deaths from infectious disease were kept below 10% of total fatalities—the first time in modern military history that combat trauma caused more deaths than disease.<br><br><span class="para-ref">[4.2]</span> Ultimately, the battle against the trench environment revealed that organizational discipline was just as vital as surgical skill. By enforcing whale oil foot routines, mandating clean socks, introducing mechanized steam delousing plants, and strictly chlorinating every drop of drinking water, the Royal Army Medical Corps preserved hundreds of thousands of combat soldiers who would otherwise have been crippled by environmental disease. While artillery pulverized the landscape, sanitary science prevented the Western Front from collapsing into a medieval pestilence.',
    },
  ],
  sources: [
    {
      id: 'source_a_cheshire_regiment_trench',
      letter: 'A',
      title: 'Source A: Soldiers of the Cheshire Regiment Greasing Feet in a Reserve Trench (1916)',
      src: '/images/cheshire_regiment_trench.png',
      source: '/images/cheshire_regiment_trench.png',
      image: '/images/cheshire_regiment_trench.png',
      caption:
        'British infantrymen of the 8th Battalion, Cheshire Regiment, seated on the firestep of a trench, removing their boots and rubbing whale oil onto their feet under the supervision of a non-commissioned officer.',
      desc: 'Primary photograph of British infantrymen performing compulsory foot inspections and greasing boots with whale oil.',
      provenance:
        'Official British War Office photograph taken on the Western Front, 1916. Imperial War Museum Collection (Shelfmark: Q 5156).',
      citation:
        'Official British War Office Photograph, Western Front, 1916 (Imperial War Museum Q 5156).',
      source_context:
        'An authentic wartime photograph taken in 1916 showing British infantrymen of the Cheshire Regiment carrying out the mandatory daily foot inspection and greasing routine using whale oil to prevent the onset of trench foot in cold, damp conditions.',
      context:
        'An authentic wartime photograph taken in 1916 showing British infantrymen of the Cheshire Regiment carrying out the mandatory daily foot inspection and greasing routine using whale oil to prevent the onset of trench foot in cold, damp conditions.',
      hinge_question:
        'Study Source A. How does this photograph demonstrate the organized preventive measures enforced by the British Army to stop soldiers from developing trench foot?',
    },
    {
      id: 'source_b_ramparts_ww1',
      letter: 'B',
      title:
        'Source B: Photograph of the Ramparts Underground Medical Dressing Station, Ypres (c.1916)',
      src: '/images/ramparts_ww1.jpg',
      source: '/images/ramparts_ww1.jpg',
      image: '/images/ramparts_ww1.jpg',
      caption:
        'RAMC medical orderlies and stretcher bearers outside the subterranean vaulted brick entrance of the Ramparts Dressing Station, built deep into the 17th-century fortifications of Ypres.',
      desc: 'Primary photograph of the entrance to the fortified underground Ramparts medical dressing station in Ypres.',
      provenance:
        'Official British military photograph taken in the Ypres sector, c.1916. Imperial War Museum Collection (Shelfmark: Q 10762).',
      citation:
        'Official British Military Photograph, Ypres, c.1916 (Imperial War Museum Q 10762).',
      source_context:
        'Photograph taken c.1916 showing the entrance to the Ramparts Advanced Dressing Station in Ypres. Carved deep into the massive 17th-century Vauban brick earthworks near the Lille Gate, it provided a bomb-proof, dry, subterranean refuge where medical staff could treat wounded men and sick soldiers free from direct artillery shell fire.',
      context:
        'Photograph taken c.1916 showing the entrance to the Ramparts Advanced Dressing Station in Ypres. Carved deep into the massive 17th-century Vauban brick earthworks near the Lille Gate, it provided a bomb-proof, dry, subterranean refuge where medical staff could treat wounded men and sick soldiers free from direct artillery shell fire.',
      hinge_question:
        'How does the underground construction of the Ramparts Dressing Station in Source B explain how the RAMC adapted existing architecture to protect casualties from artillery fire and wet weather?',
    },
  ],
  vocab: [
    {
      term: 'Trench Foot',
      definition:
        'A painful, necrotic condition of the lower feet caused by prolonged exposure to cold, wet mud and poor circulation, which could degenerate into gangrene requiring amputation.',
    },
    {
      term: 'Whale Oil',
      definition:
        'A thick, pungent animal grease supplied in large barrels to frontline British troops, rubbed into bare feet daily to create a water-resistant protective barrier.',
    },
    {
      term: 'Trench Fever',
      definition:
        'A debilitating bacterial infection (Pyrexia of Unknown Origin) caused by Bartonella quintana and transmitted by body lice faeces, producing severe shin pains and high fevers.',
    },
    {
      term: 'Body Lice',
      definition:
        'Small wingless parasitic insects that nested in the warm seams of woollen service uniforms, biting human skin and spreading trench fever across the Western Front.',
    },
    {
      term: 'Chloride of Lime',
      definition:
        'A chemical bleaching powder (calcium hypochlorite) added systematically to water-cart tanks and latrine pits to disinfect drinking water and suppress waterborne dysentery.',
    },
  ],
  gcse_task: {
    title: 'Exam Practice: Section A (The Western Front)',
    tasks: [
      {
        tariff: 'Question 2(a) [4 marks]',
        stem: 'Study Source A. How useful is Source A for an enquiry into the methods used by the British Army to prevent trench foot on the Western Front? Explain your answer, using Source A and your knowledge of the historical context. [4 marks]',
        provenance_clue:
          'Consider the nature of an official British War Office photograph taken in 1916 showing the Cheshire Regiment. What does it reveal about supervised preventive routines, and why might an official propaganda photograph show orderly, cooperative soldiers?',
        model_answer:
          'Source A is exceptionally useful for an enquiry into the prevention of trench foot because it provides clear visual evidence of the compulsory preventive routines enforced across the British sector. It shows soldiers seated together in a trench removing their boots and socks to vigorously rub whale oil into their bare skin, with a non-commissioned officer actively supervising the process. This corroborates historical knowledge that the RAMC instituted a mandatory "buddy system" requiring men to grease each other’s feet and change into clean, dry socks daily, reducing trench foot cases from over 20,000 in 1914 to negligible numbers by 1917. However, the source is an official British War Office photograph, taken partly to demonstrate military efficiency and high morale to the home front. It presents a clean, orderly scene in a dry reserve trench, and therefore does not show the extreme, chaotic frontline conditions in the Ypres Salient where water was waist-deep, supplies of whale oil ran out, and soldiers had no dry ground on which to take off their boots.',
      },
      {
        tariff: 'Question 2(b) [4 marks]',
        stem: 'Study Source B. How could you follow up Source B to find out more about the conditions inside underground medical dressing stations in the Ypres Salient? In your answer, you must give the question you would ask and the type of source you would use. [4 marks]',
        table: [
          {
            row: 'Detail in Source B that I would follow up:',
            model:
              'The subterranean vaulted entrance to the Ramparts Dressing Station built beneath the fortified brick earthworks of Ypres.',
          },
          {
            row: 'Question I would ask:',
            model:
              'What medical equipment, lighting, and surgical facilities were available inside the Ramparts Dressing Station to treat wounded men?',
          },
          {
            row: 'Type of source I would look for:',
            model:
              'The official medical logbook or personal diary of an RAMC medical officer stationed at the Ramparts Dressing Station in Ypres in 1916–1917.',
          },
          {
            row: 'How this might help answer my question:',
            model:
              'It would provide contemporary, detailed descriptions of internal sanitation, air quality, bed capacity, and whether surgeons could perform emergency procedures underground during heavy shell bombardments.',
          },
        ],
      },
    ],
  },
};

const { lesson_5_3, lesson_5_4 } = require('./lessons_5_3_and_5_4.cjs');
const { lesson_5_5, lesson_5_6 } = require('./lessons_5_5_and_5_6.cjs');

const allWesternFrontLessons = [
  lesson_5_1,
  lesson_5_2,
  lesson_5_3,
  lesson_5_4,
  lesson_5_5,
  lesson_5_6,
];

allWesternFrontLessons.forEach((l) => {
  if (l.sources && l.sources.length >= 2) {
    l.narrative_blocks[1].source = l.sources[0];
    l.narrative_blocks[2].source = l.sources[1];
  }
});

module.exports = {
  lesson_5_1,
  lesson_5_2,
  lesson_5_3,
  lesson_5_4,
  lesson_5_5,
  lesson_5_6,
  allWesternFrontLessons,
};
