const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const dataFilePath = path.join(__dirname, '../units/trip_ypres/data.js');
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Fix broken banner reference
fileContent = fileContent.replace('"/images/menin_gate.jpg"', '"/images/ypres_menin_gate.jpg"');

// Load module dynamically to inspect and enrich lessons
async function run() {
  const fileUrl = 'file:///' + dataFilePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.unitData;

  const lessons = unit.lessons;

  // Day 0
  const day0 = lessons.find((l) => l.id === 'day_0');
  if (day0) {
    day0.learning_objectives = [
      'Review logistics, essential clothing, and personal equipment required for the 3-day battlefield tour.',
      'Understand the solemnity, respectful conduct, and codes of commemoration observed across Commonwealth and German war cemeteries.',
      'Examine the geographic and historical significance of the Ypres Salient to prepare for on-site field enquiries.',
    ];
    day0.teacher_notes = {
      primer:
        'Vital pre-departure preparation ensuring high standards of student readiness, respectful commemoration, and structured historical fieldwork in the Ypres Salient.',
      objectives: [
        {
          objective:
            'Review logistics, essential clothing, and personal equipment required for the 3-day battlefield tour.',
          primer:
            'Direct students to verify each item on the packing checklist with parents before the briefing meeting.',
          question:
            'Why does the heavy clay soil of Flanders make sturdy waterproof footwear a safety necessity on battlefield sites?',
        },
        {
          objective:
            'Understand the solemnity, respectful conduct, and codes of commemoration observed across Commonwealth and German war cemeteries.',
          primer:
            'Emphasize respectful behavior and reverence at memorials, particularly during the evening Menin Gate ceremony.',
          question:
            'Why do international war cemeteries enforce strict codes of respectful conduct rather than operating like conventional tourist attractions?',
        },
        {
          objective:
            'Examine the geographic and historical significance of the Ypres Salient to prepare for on-site field enquiries.',
          primer:
            'Prime students on the topographic vulnerability of the Salient and the local Hampshire casualties they will encounter.',
          question:
            'What military disadvantage did British forces face by defending a salient surrounded on three sides by German high ground?',
        },
      ],
    };
    day0.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Essential Kit, Footwear & Logistics Guide',
        text: 'Preparing thoroughly for our three-day expedition to the Ypres Salient is essential for your comfort, safety, and historical enquiry. The battlefield terrain in Flanders consists of heavy, moisture-retentive clay that quickly turns slick and treacherous in wet weather. Proper footwear and layered clothing are non-negotiable requirements.<br><br><strong>Essential Equipment Checklist:</strong><ul><li><strong>Footwear:</strong> Sturdy walking boots or strong, treaded walking shoes. Fashion trainers with smooth soles are unsafe in wet trench clay.</li><li><strong>Waterproofs:</strong> A durable waterproof and windproof coat (with hood) and lightweight waterproof trousers.</li><li><strong>Layering:</strong> Warm fleece or sweater, several pairs of thick walking socks, and thermal base layers for cold mornings.</li><li><strong>Fieldwork Gear:</strong> History Hub field notebook, two reliable black/blue pens, and a mobile phone/tablet with this digital guide bookmarked.</li><li><strong>Documentation:</strong> Valid passport and GHIC/EHIC medical card handed in to school travel leads.</li><li><strong>Personal Bag:</strong> A lightweight day rucksack for carrying water, lunch, and camera on battlefield stops.</li></ul>',
      },
      {
        type: 'narrative',
        theme_heading: 'Code of Respect, Remembrance & Memorial Etiquette',
        text: 'During this tour, you are visiting active international cemeteries, mass graves, and sacred memorials where over 200,000 men lie buried or commemorated. These are solemn resting places, not recreation parks. Every Meoncross student represents our school, our local community, and the descendants of the fallen.<br><br><strong>Key Expectations on Memorial Ground:</strong><ul><li><strong>Dignity & Silence:</strong> Maintain quiet, respectful voices. Mobile phones must be switched to silent mode.</li><li><strong>Preservation:</strong> Never run across grave plots, lean against headstones, climb on memorial walls, or scramble up trench revetments.</li><li><strong>The Menin Gate Ceremony:</strong> At 8:00 PM each evening, the town of Ypres silences all traffic for the sounding of the Last Post. We will assemble in complete silence at 7:30 PM. No talking, chewing gum, or laughing is permitted during the ceremony.</li><li><strong>Reflection:</strong> Look closely at the personal inscriptions chosen by grieving mothers, wives, and fathers at the base of CWGC headstones.</li></ul>',
      },
      {
        type: 'narrative',
        theme_heading: 'Historical Fieldwork: The Salient & The Hampshire Regiment',
        text: "The town of Ypres (pronounced <em>'Wipers'</em> by British Tommies) occupied a vital strategic position blocking the German advance towards the French Channel ports of Dunkirk and Calais. Throughout 1914–1918, Allied soldiers defended a protruding bulge in the frontline known as the 'Salient'.<br><br><strong>Why Fieldwork Matters:</strong><br>By walking the ground at Essex Farm, Langemarck, Hooge Crater, Sanctuary Wood, and Tyne Cot, you will see first-hand how elevation and drainage dictated life and death. You will also search out specific soldiers from Stubbington, Lee-on-the-Solent, Chark, and Fareham—such as Private Thomas Franklin, Private Walter Ayling, and the three Lowry brothers—connecting the names on our village war memorials directly to the fields of Flanders.",
      },
    ];
  }

  // Day 1
  const day1 = lessons.find((l) => l.id === 'day_1');
  if (day1) {
    day1.learning_objectives = [
      'Trace the medical evacuation pathway from frontlines to the Advanced Dressing Station at Essex Farm.',
      'Contrast the somber, dark architectural design and collective mourning at Langemarck German Cemetery with British CWGC sites.',
      'Examine the preserved trench systems, mine craters, and material culture at Hooge Crater Museum.',
    ];
    day1.teacher_notes.objectives = [
      {
        objective:
          'Trace the medical evacuation pathway from frontlines to the Advanced Dressing Station at Essex Farm.',
        primer:
          "Highlight John McCrae's dual role as surgeon and poet, examining triage in the concrete bunkers.",
        question:
          'How did the immediate proximity of Advanced Dressing Stations to the front line affect the survival rate of wounded soldiers?',
      },
      {
        objective:
          'Contrast the somber, dark architectural design and collective mourning at Langemarck German Cemetery with British CWGC sites.',
        primer:
          "Guide students past the Kameradengrab (mass grave) and bronze panels, deconstructing the heroic 'Student Myth'.",
        question:
          'How does the architecture and oak shading of Langemarck communicate a fundamentally different message about loss compared to British cemeteries?',
      },
      {
        objective:
          'Examine the preserved trench systems, mine craters, and material culture at Hooge Crater Museum.',
        primer:
          'Focus student attention on deep mine craters and physical trench construction along the Menin Road.',
        question:
          'What does the cratered landscape at Hooge reveal about the changing technology of underground and artillery warfare in 1915?',
      },
    ];
  }

  // Day 2
  const day2 = lessons.find((l) => l.id === 'day_2');
  if (day2) {
    day2.learning_objectives = [
      'Analyze the introduction and horrific tactical impact of poison gas at the Brooding Soldier memorial (St Julien).',
      'Evaluate preserved trench networks and battlefield topography at Sanctuary Wood (Hill 62).',
      'Investigate Tyne Cot, the largest Commonwealth war cemetery in the world, and reflect on the scale of loss during the Third Battle of Ypres (Passchendaele).',
      'Examine medical care, triage, and multi-faith burial diversity at Lijssenthoek Casualty Clearing Station.',
      'Participate in the Last Post Ceremony at the Menin Gate and locate local Hampshire Regiment fallen.',
    ];
    day2.teacher_notes.objectives = [
      {
        objective:
          'Analyze the introduction and horrific tactical impact of poison gas at the Brooding Soldier memorial (St Julien).',
        primer: 'Examine the Canadian defense against the first chlorine gas attack in April 1915.',
        question:
          'Why did the German introduction of chlorine gas at Second Ypres shatter existing conventions of warfare?',
      },
      {
        objective:
          'Evaluate preserved trench networks and battlefield topography at Sanctuary Wood (Hill 62).',
        primer:
          'Have students navigate the mud and wooden revetments to experience trench claustrophobia.',
        question:
          'How does the physical terrain of Sanctuary Wood explain why maintaining trench defenses in wet clay was so exhausting?',
      },
      {
        objective:
          'Investigate Tyne Cot, the largest Commonwealth war cemetery in the world, and reflect on the scale of loss during the Third Battle of Ypres (Passchendaele).',
        primer:
          'Guide students around the German pillboxes captured by Australian troops and the Memorial to the Missing.',
        question:
          'Why did Sir Herbert Baker incorporate captured German concrete pillboxes directly into the design of Tyne Cot Cemetery?',
      },
      {
        objective:
          'Examine medical care, triage, and multi-faith burial diversity at Lijssenthoek Casualty Clearing Station.',
        primer:
          'Explore the railway evacuation link and the graves of British, French, German, and Chinese Labour Corps personnel.',
        question:
          'What does the presence of international graves at Lijssenthoek reveal about the global workforce required to sustain the Western Front?',
      },
      {
        objective:
          'Participate in the Last Post Ceremony at the Menin Gate and locate local Hampshire Regiment fallen.',
        primer:
          'Stand with pupils for the 8 PM bugle call, locating Private Franklin and Private Ayling on the stone panels.',
        question:
          'Why has the daily sounding of the Last Post by the Ypres fire brigade continued unbroken since 1928?',
      },
    ];
  }

  // Day 3
  const day3 = lessons.find((l) => l.id === 'day_3');
  if (day3) {
    day3.learning_objectives = [
      'Explore the medieval and 17th-century fortifications of Ypres Ramparts and their use as British headquarters and field shelters.',
      "Investigate Talbot House ('Every Man's Club') in Poperinge as an egalitarian haven from front-line trauma.",
      'Analyze military discipline, shell shock, and executions in the Poperinge Death Cells.',
    ];
    day3.teacher_notes.objectives = [
      {
        objective:
          'Explore the medieval and 17th-century fortifications of Ypres Ramparts and their use as British headquarters and field shelters.',
        primer:
          'Direct students to inspect the casemates where The Wipers Times was printed and staff officers worked.',
        question:
          'How did the thick brick ramparts designed by Vauban provide unexpected protection against 20th-century high-explosive artillery?',
      },
      {
        objective:
          "Investigate Talbot House ('Every Man's Club') in Poperinge as an egalitarian haven from front-line trauma.",
        primer:
          "Focus on Tubby Clayton's rule: 'All rank abandon, ye who enter here' and the upper-room chapel.",
        question:
          'Why was an officer-free communal space like Talbot House psychologically vital for men returning from the trenches?',
      },
      {
        objective:
          'Analyze military discipline, shell shock, and executions in the Poperinge Death Cells.',
        primer:
          'Examine the courtyard execution post and discuss contemporary vs. modern understandings of post-traumatic stress and cowardice.',
        question:
          "How does the history of the Poperinge executions illustrate the British Army's rigid enforcement of military discipline under extreme trauma?",
      },
    ];
  }

  // Hero 0: Private T. J. Franklin
  const hero0 = lessons.find((l) => l.id === 'hero_0');
  if (hero0) {
    hero0.learning_objectives = [
      'Investigate the civilian background and local connection of Private T. J. Franklin in Chark and Stubbington.',
      'Examine his deployment with the 1st Hampshire Regiment and sacrifice at Frezenberg Ridge during Second Ypres.',
      'Evaluate the commemoration of soldiers with no known grave on the Menin Gate memorial.',
    ];
    hero0.teacher_notes.objectives = [
      {
        objective:
          'Investigate the civilian background and local connection of Private T. J. Franklin in Chark and Stubbington.',
        primer: 'Connect his pre-war life at Meadow Cottage, Chark to his military service.',
        question:
          "How does tracing a soldier's home village change our emotional connection to battlefield casualties?",
      },
      {
        objective:
          'Examine his deployment with the 1st Hampshire Regiment and sacrifice at Frezenberg Ridge during Second Ypres.',
        primer:
          'Discuss the defensive rearguard action during the German gas assault of April 1915.',
        question:
          'What tactical role did the 1st Hampshire Regiment play in covering the Allied withdrawal to Frezenberg Ridge?',
      },
      {
        objective:
          'Evaluate the commemoration of soldiers with no known grave on the Menin Gate memorial.',
        primer: 'Guide students to locate his name on the Hampshire Regiment panel.',
        question:
          'Why was the Menin Gate chosen to bear the names of 54,000 Commonwealth soldiers who have no known resting place?',
      },
    ];
  }

  // Hero 1: Private W. Ayling
  const hero1 = lessons.find((l) => l.id === 'hero_1');
  if (hero1) {
    hero1.learning_objectives = [
      'Trace the life of Walter Ayling, a 20-year-old baker boy from Stubbington Lane.',
      'Analyze the conditions of trench mortar bombardment faced by the 1st Hampshires in July 1915.',
      'Reflect on how communities like Stubbington bore the loss of their working-class youth.',
    ];
    hero1.teacher_notes.objectives = [
      {
        objective:
          'Trace the life of Walter Ayling, a 20-year-old baker boy from Stubbington Lane.',
        primer: 'Relate his youthful trade in Stubbington to the sudden reality of trench warfare.',
        question:
          "What does Walter Ayling's civilian trade tell us about the demographic makeup of early volunteer and regular recruits?",
      },
      {
        objective:
          'Analyze the conditions of trench mortar bombardment faced by the 1st Hampshires in July 1915.',
        primer:
          'Explain the destructive power and psychological terror of German Minenwerfer mortar fire.',
        question:
          'Why were trench mortars particularly terrifying for infantry holding static trench positions?',
      },
      {
        objective:
          'Reflect on how communities like Stubbington bore the loss of their working-class youth.',
        primer: 'Discuss the collective grief experienced by small rural Hampshire villages.',
        question:
          'How did the loss of young tradesmen like Ayling affect the post-war fabric of local villages?',
      },
    ];
  }

  // Hero 2: Private S. Muckett
  const hero2 = lessons.find((l) => l.id === 'hero_2');
  if (hero2) {
    hero2.learning_objectives = [
      "Examine the civilian life of Sidney Muckett from Brown's Farm and his service in the 15th Hampshire Regiment.",
      'Analyze the tactics and mud conditions of the Battle of Menin Road Ridge (September 1917).',
      'Locate his grave at Tyne Cot Cemetery and consider the significance of individual CWGC headstones.',
    ];
    hero2.teacher_notes.objectives = [
      {
        objective:
          "Examine the civilian life of Sidney Muckett from Brown's Farm and his service in the 15th Hampshire Regiment.",
        primer: "Highlight his work as a grocer's errand boy before deploying to Flanders.",
        question:
          'How did young men from rural agricultural backgrounds adapt to the mechanised conditions of the Western Front?',
      },
      {
        objective:
          'Analyze the tactics and mud conditions of the Battle of Menin Road Ridge (September 1917).',
        primer: "Explain General Plumer's 'bite and hold' tactics used in September 1917.",
        question:
          "Why did the 'bite and hold' strategy succeed at Menin Road Ridge where earlier massive offensives failed?",
      },
      {
        objective:
          'Locate his grave at Tyne Cot Cemetery and consider the significance of individual CWGC headstones.',
        primer: 'Guide students to his headstone and personal family inscription.',
        question:
          "What does the personal inscription chosen by Sidney Muckett's family convey about their mourning process?",
      },
    ];
  }

  // Hero 3: Private A. Rye
  const hero3 = lessons.find((l) => l.id === 'hero_3');
  if (hero3) {
    hero3.learning_objectives = [
      'Trace the life of Arthur Rye, a nurseryman from Lower Crabthorne, and his service with the 14th Hampshire Regiment.',
      'Analyze the fierce fighting in Polygon Wood during the Third Battle of Ypres.',
      'Assess the emotional impact of visiting a locally connected headstone at Tyne Cot.',
    ];
    hero3.teacher_notes.objectives = [
      {
        objective:
          'Trace the life of Arthur Rye, a nurseryman from Lower Crabthorne, and his service with the 14th Hampshire Regiment.',
        primer:
          'Connect his peacetime work with plants and earth to the devastated lunar wasteland of Polygon Wood.',
        question:
          "How does Arthur Rye's nursery work contrast with the obliterated landscape of Flanders in late 1917?",
      },
      {
        objective: 'Analyze the fierce fighting in Polygon Wood during the Third Battle of Ypres.',
        primer: 'Discuss the struggle for pillboxes and shattered tree stumps across Polygon Wood.',
        question:
          'Why was capturing the high ground of Polygon Wood considered critical for the Allied advance toward Passchendaele?',
      },
      {
        objective:
          'Assess the emotional impact of visiting a locally connected headstone at Tyne Cot.',
        primer: 'Encourage quiet reflection at his grave site.',
        question:
          'Why is visiting an identifiable local casualty more impactful than viewing broad casualty statistics?',
      },
    ];
  }

  // Hero 4: Lance Corporal A. Ward
  const hero4 = lessons.find((l) => l.id === 'hero_4');
  if (hero4) {
    hero4.learning_objectives = [
      'Examine the military career of Lance Corporal Arthur Ward from Balmoral, Gosport Road.',
      'Analyze the final Hundred Days Offensive in October 1918 and the liberation of Flanders.',
      'Consider the tragedy of soldiers killed just weeks before the 11th November 1918 Armistice.',
    ];
    hero4.teacher_notes.objectives = [
      {
        objective:
          'Examine the military career of Lance Corporal Arthur Ward from Balmoral, Gosport Road.',
        primer: "Discuss Ward's leadership role as an NCO in the 15th Hampshires.",
        question:
          'What responsibilities and risks were placed on junior NCOs like Lance Corporal Ward during mobile attacks?',
      },
      {
        objective:
          'Analyze the final Hundred Days Offensive in October 1918 and the liberation of Flanders.',
        primer: 'Contrast the mobile warfare of autumn 1918 with earlier static trench stalemates.',
        question:
          'How did Allied tactics change in the autumn of 1918 compared to the stalemate of 1917?',
      },
      {
        objective:
          'Consider the tragedy of soldiers killed just weeks before the 11th November 1918 Armistice.',
        primer: 'Reflect on how families coped with loss occurring on the very eve of peace.',
        question:
          'Why do casualties suffered in the final weeks of the war evoke such intense poignancy?',
      },
    ];
  }

  // Hero 5: Private C. Warland
  const hero5 = lessons.find((l) => l.id === 'hero_5');
  if (hero5) {
    hero5.learning_objectives = [
      "Investigate the story of Private Charles Warland from Canford and the 3/4th Queen's (Royal West Surrey) Regiment.",
      'Analyze the assault on Juniper Trench during the Battle of Broodseinde (October 1917).',
      'Reflect on the collective memory of the Southern England regiments in the Ypres Salient.',
    ];
    hero5.teacher_notes.objectives = [
      {
        objective:
          "Investigate the story of Private Charles Warland from Canford and the 3/4th Queen's (Royal West Surrey) Regiment.",
        primer: "Trace his regiment's attack across the mud on 4th October 1917.",
        question:
          "What obstacles did the Queen's Regiment face when advancing toward Juniper Trench in driving rain?",
      },
      {
        objective:
          'Analyze the assault on Juniper Trench during the Battle of Broodseinde (October 1917).',
        primer:
          'Explain the Broodseinde battle and its brief moment of tactical success before the autumn rains set in.',
        question:
          'Why did initial British optimism at Broodseinde quickly dissolve into the disaster of Passchendaele?',
      },
      {
        objective:
          'Reflect on the collective memory of the Southern England regiments in the Ypres Salient.',
        primer:
          'Examine the shared history of young men from Hampshire, Dorset, and Surrey fighting side by side.',
        question:
          'How did recruitment and regimental traditions shape the morale of Southern English battalions?',
      },
    ];
  }

  // Final Challenge
  const finalChallenge = lessons.find((l) => l.id === 'final_challenge');
  if (finalChallenge) {
    finalChallenge.learning_objectives = [
      'Synthesize fieldwork observations from cemeteries, trenches, and memorials into an overarching historical enquiry.',
      'Evaluate how modern European societies commemorate catastrophic industrial warfare.',
      'Articulate a considered, personal reflection on the enduring human cost of the Great War.',
    ];
    finalChallenge.teacher_notes.objectives = [
      {
        objective:
          'Synthesize learning from various historical sites into a cohesive understanding of the Great War.',
        primer: 'Guide students through a structured reflection of the sites visited.',
        question: 'Which location we visited left the most profound impact on you, and why?',
      },
      {
        objective:
          'Evaluate how modern European societies commemorate catastrophic industrial warfare.',
        primer:
          'Compare CWGC individual headstones, German mass graves, and local village war memorials.',
        question:
          'How does the architecture of commemoration reflect different national approaches to grief and memory?',
      },
      {
        objective:
          'Articulate a considered, personal reflection on the enduring human cost of the Great War.',
        primer:
          'Support pupils in completing their final synthesis reflection before departing for the UK.',
        question:
          'How will your experience walking the ground in Flanders alter how you observe Remembrance Day each November?',
      },
    ];
  }

  // Lowry Brother 1: Harper
  const lowryWilliam = lessons.find((l) => l.id === 'hero_lowry_william');
  if (lowryWilliam) {
    lowryWilliam.learning_objectives = [
      'Examine the life and military career of Captain Harper Lowry of Manor Way Grange, Lee-on-the-Solent.',
      "Analyze his service with the 14th King George's Own Ferozepore Sikhs and the charge at Gully Ravine (Gallipoli, 1915).",
      'Evaluate how one family experienced catastrophic bereavement across multiple theatres of war.',
    ];
    lowryWilliam.teacher_notes.objectives = [
      {
        objective:
          'Examine the life and military career of Captain Harper Lowry of Manor Way Grange, Lee-on-the-Solent.',
        primer:
          'Explore his career as an officer in the Indian Army and eldest brother of the family.',
        question:
          'How did British officers serving in Indian Army regiments bridge cultural and language divides with their men?',
      },
      {
        objective:
          "Analyze his service with the 14th King George's Own Ferozepore Sikhs and the charge at Gully Ravine (Gallipoli, 1915).",
        primer:
          'Examine the devastating casualties suffered by the 14th Sikhs at Gully Ravine on 4th June 1915.',
        question:
          "What tactical errors at Gallipoli resulted in the near-total destruction of Harper Lowry's battalion at Gully Ravine?",
      },
      {
        objective:
          'Evaluate how one family experienced catastrophic bereavement across multiple theatres of war.',
        primer: "Connect Harper's death in Turkey to his brothers' fates in France and Belgium.",
        question:
          'How does the story of the Lowry brothers illustrate the global reach and multi-front toll of the Great War?',
      },
    ];
  }

  // Lowry Brother 2: Eric
  const lowryEric = lessons.find((l) => l.id === 'hero_lowry_auriol');
  if (lowryEric) {
    lowryEric.learning_objectives = [
      "Investigate the wartime command of Major Auriol 'Eric' Lowry of the West Yorkshire Regiment.",
      'Analyze the desperate combat at Westhoek Ridge during the Third Battle of Ypres (1917).',
      'Reflect on the psychological burden of commanding a battalion while watching family members fight and fall.',
    ];
    lowryEric.teacher_notes.objectives = [
      {
        objective:
          "Investigate the wartime command of Major Auriol 'Eric' Lowry of the West Yorkshire Regiment.",
        primer: "Discuss Eric's rapid promotion and decorated leadership under fire.",
        question:
          'What qualities enabled officers like Eric Lowry to maintain battalion discipline under catastrophic artillery fire?',
      },
      {
        objective:
          'Analyze the desperate combat at Westhoek Ridge during the Third Battle of Ypres (1917).',
        primer: 'Trace the attack on the pillboxes of Westhoek Ridge in August 1917.',
        question:
          'Why did Westhoek Ridge present such a formidable defensive barrier for advancing British troops?',
      },
      {
        objective:
          'Reflect on the psychological burden of commanding a battalion while watching family members fight and fall.',
        primer: 'Examine the trauma of surviving when two brothers did not.',
        question:
          'What psychological challenges did surviving officers face after witnessing the loss of their men and siblings?',
      },
    ];
  }

  // Lowry Brother 3: Patrick
  const lowryPatrick = lessons.find((l) => l.id === 'hero_lowry_cyril');
  if (lowryPatrick) {
    lowryPatrick.learning_objectives = [
      'Examine the short life and frontline combat of 20-year-old Lieutenant Patrick Lowry of Lee-on-the-Solent.',
      'Analyze the chaotic German Spring Offensive of March 1918 (Operation Michael) on the Somme.',
      'Evaluate how the Lowry family memorializes the sacrifice of their young sons in Hampshire and France.',
    ];
    lowryPatrick.teacher_notes.objectives = [
      {
        objective:
          'Examine the short life and frontline combat of 20-year-old Lieutenant Patrick Lowry of Lee-on-the-Solent.',
        primer: "Relate Patrick's service under his brother Eric's battalion command in 1918.",
        question:
          'How did brotherly relationships operate within the formal hierarchy of a British infantry battalion?',
      },
      {
        objective:
          'Analyze the chaotic German Spring Offensive of March 1918 (Operation Michael) on the Somme.',
        primer:
          'Detail the German stormtrooper breakthrough and the desperate British defensive retreat.',
        question:
          'Why did the German Spring Offensive of 1918 create such panic and fluid movement after years of static trench lines?',
      },
      {
        objective:
          'Evaluate how the Lowry family memorializes the sacrifice of their young sons in Hampshire and France.',
        primer:
          "Discuss the memorial plaque at St Faith's Church and the memory preserved in Lee-on-the-Solent.",
        question:
          'How do memorial plaques in local parish churches preserve the memory of families who sacrificed multiple sons?',
      },
    ];
  }

  const outputCode = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';

  // Acorn validation
  try {
    acorn.parse(outputCode, { ecmaVersion: 'latest', sourceType: 'module' });
    console.log('✅ Acorn validation passed for trip_ypres/data.js');
  } catch (err) {
    console.error('❌ Acorn validation failed:', err.message);
    process.exit(1);
  }

  fs.writeFileSync(dataFilePath, outputCode, 'utf8');
  console.log(
    '🎉 Successfully enriched trip_ypres/data.js with all 14 learning objectives and teacher notes!',
  );
}

run().catch(console.error);
