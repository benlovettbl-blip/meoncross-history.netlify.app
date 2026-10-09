/**
 * western_front_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 1 (Section A: Historic Environment)
 * The British Sector of the Western Front, 1914–1918: Injuries, Treatment and the Trenches.
 * Master Knowledge Retrieval Bank (6 Lessons x 12 Questions = 72 Questions).
 *
 * Pedagogical Standards (SEN & GCSE Exam Optimized):
 * 1. 100% Fidelity to the Pearson Revision Guide & Specification.
 * 2. Chronological Anchoring: Dates, battles, and years pre-anchored in stems to test facts/mechanisms.
 * 3. SEN-Accessible Language: Direct, plain English Tier-2 vocabulary; 100% preserved Tier-3 terms.
 * 4. Short, Focused Questions: Single-line stems (10–18 words) for maximum handwriting space.
 * 5. Two-Line Format: Line 1 = Key Fact; Line 2 = Historical Explanation (why it matters).
 * 6. Section A Exam Alignment: Direct links to Feature Questions (Q1) and Source Enquiries (Q2).
 */

const WESTERN_FRONT_QUIZ_BANK = [
  // =========================================================================
  // LESSON 1 (KT5.1): The Theatre of War: Geography, Trenches & Battles
  // =========================================================================
  {
    num: 1,
    id: 'lesson_5_1',
    title: 'The Theatre of War: Geography, Trenches & Key Battles',
    enquiry: 'How Did the Landscape and Trench System Shape Military Operations and Medical Care?',
    questions: [
      {
        q: 'What is the military definition of a "salient", such as the British position at Ypres?',
        a: 'A battlefield bulge surrounded on three sides by the enemy',
        exp: 'Left British troops exposed to German artillery fire from higher ground on surrounding ridges.',
      },
      {
        q: 'Why was holding the town of Ypres vital for the British Army throughout the war?',
        a: 'It protected the English Channel ports used for supplies and reinforcements',
        exp: 'If Ypres fell, the German army could cut off supply links between Britain and the front line.',
      },
      {
        q: 'In April 1915, what tactic did British miners use to capture Hill 60 near Ypres?',
        a: 'Dug tunnels and blew up five huge underground mines beneath German lines',
        exp: 'Blew off the hilltop, allowing British troops to take this key high-ground observation post.',
      },
      {
        q: 'On 1 July 1916, the British launched the Battle of the Somme. How many casualties did they suffer on Day 1?',
        a: '57,000 casualties (over 19,000 killed)',
        exp: 'The worst single day in British military history, completely overwhelming frontline medical stations.',
      },
      {
        q: 'In 1916–17, what underground medical facility did miners build beneath the town of Arras?',
        a: 'An underground hospital in chalk tunnels (Thompson’s Cave)',
        exp: 'Contained 700 beds, operating rooms, water, and power, completely safe from shellfire.',
      },
      {
        q: 'At the Battle of Cambrai in 1917, what modern weapon was used on a mass scale for the first time?',
        a: 'Massed deployment of over 450 British tanks',
        exp: 'Broke German lines and created the conditions for the first operational blood bank.',
      },
      {
        q: 'Name the four main parallel lines of trenches in the British trench system.',
        a: 'Frontline, Support, Reserve, and Communication trenches',
        exp: 'Allowed troops, food, ammunition, and wounded soldiers to move safely between front and rear.',
      },
      {
        q: 'Why were trenches dug in a zig-zag pattern rather than in straight lines?',
        a: 'To stop shell blast waves and prevent enemy riflemen firing straight down the line',
        exp: 'Protected men from exploding shells, but made carrying stretchers around corners very difficult.',
      },
      {
        q: 'What raised wooden planks were laid on trench floors to keep soldiers out of water?',
        a: 'Duckboards',
        exp: 'Kept soldiers’ boots out of standing water and mud to prevent trench foot.',
      },
      {
        q: 'What was the raised ledge in a frontline trench called that soldiers stood on to shoot?',
        a: 'The Firestep',
        exp: 'Allowed soldiers to shoot over the sandbag parapet, then step down for cover.',
      },
      {
        q: 'Why did artillery bombardment make carrying wounded men across Flanders so difficult?',
        a: 'It destroyed drainage ditches and roads, turning fields into deep liquid mud',
        exp: 'Motor ambulances got stuck, forcing stretcher-bearers to carry casualties for miles on foot.',
      },
      {
        q: 'Why did the British Army rely on horse-drawn ambulances throughout the First World War?',
        a: 'Motor ambulances broke down or got stuck in deep mud and shell craters',
        exp: 'Teams of six horses could pull wagons through mud where early motor engines failed.',
      },
    ],
  },

  // =========================================================================
  // LESSON 2 (KT5.2): The Trench Environment: Vermin & Non-Combat Illnesses
  // =========================================================================
  {
    num: 2,
    id: 'lesson_5_2',
    title: 'The Trench Environment: Mud, Vermin & Non-Combat Illnesses',
    enquiry:
      'How Did the Harsh Environment of the Trenches Cause Widespread Illness and How Was It Treated?',
    questions: [
      {
        q: 'What environmental conditions caused Trench Foot among soldiers on the Western Front?',
        a: 'Standing for days in cold, waterlogged mud and tight wet boots',
        exp: 'Slowed blood flow, causing feet to go numb, blister, swell, and turn gangrenous.',
      },
      {
        q: 'State two daily rules ordered by British officers to prevent Trench Foot.',
        a: 'Rubbing feet with whale oil and changing into dry socks twice daily',
        exp: 'Officers held daily foot inspections; soldiers worked in pairs to dry each other’s feet.',
      },
      {
        q: 'What surgical operation was carried out for severe, gangrenous Trench Foot?',
        a: 'Amputation of toes or the whole foot',
        exp: 'Necessary to stop spreading gangrene and fatal blood poisoning once tissue died.',
      },
      {
        q: 'What flu-like illness affected an estimated 500,000 British soldiers on the Western Front?',
        a: 'Trench Fever',
        exp: 'Caused high fever, shaking, severe headaches, and aching leg muscles, disabling men for weeks.',
      },
      {
        q: 'In 1918, what tiny parasite living in uniform seams was proven to cause Trench Fever?',
        a: 'Body lice',
        exp: 'Lice thrived in dirty woollen clothes; scratching bites rubbed infected louse droppings into the skin.',
      },
      {
        q: 'How did the British military try to wipe out body lice and Trench Fever?',
        a: 'Built division bathhouses and mobile steam delousing vans for uniforms',
        exp: 'Hot steam vans baked uniforms to kill lice eggs, while soldiers washed in hot water.',
      },
      {
        q: 'What official British Army code was written in medical notes to describe Shell Shock?',
        a: 'NYD.N ("Not Yet Diagnosed, Nervous")',
        exp: 'Used to avoid panic, prevent pension claims, and discourage men from seeking discharge.',
      },
      {
        q: 'State two common symptoms of Shell Shock suffered by front-line soldiers.',
        a: 'Uncontrollable shaking, nightmares, loss of speech, and confusion',
        exp: 'Caused by constant fear, deafening shellfire noise, and the trauma of explosive bombardments.',
      },
      {
        q: 'Roughly how many British soldiers were officially treated for Shell Shock during World War One?',
        a: 'Approximately 80,000 soldiers',
        exp: 'The massive scale of trauma shocked military leaders, forcing hospitals to set up mental wards.',
      },
      {
        q: 'Which Edinburgh hospital became famous for treating officers suffering from Shell Shock?',
        a: 'Craiglockhart Hospital',
        exp: 'Used talking therapies and rest, treating famous war poets Wilfred Owen and Siegfried Sassoon.',
      },
      {
        q: 'How did British military commanders initially treat soldiers suffering from severe combat trauma?',
        a: 'Viewed many as cowards or faking illness to avoid fighting',
        exp: 'Some soldiers suffering from severe trauma were court-martialled and shot for cowardice or desertion.',
      },
      {
        q: 'What painful stomach disease was spread in trenches by water polluted with sewage and dead bodies?',
        a: 'Dysentery',
        exp: 'Caused severe diarrhoea and dehydration; treated by adding chloride of lime to drinking water.',
      },
    ],
  },

  // =========================================================================
  // LESSON 3 (KT5.3): Battlefield Trauma: Shrapnel, Gas Attacks & Infection
  // =========================================================================
  {
    num: 3,
    id: 'lesson_5_3',
    title: 'Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection',
    enquiry:
      'Why Were Battlefield Wounds on the Western Front Uniquely Lethal and Difficult to Treat?',
    questions: [
      {
        q: 'Which weapon caused roughly 58% of all wounds and injuries on the Western Front?',
        a: 'High-explosive artillery shells and shrapnel',
        exp: 'Exploding steel shell casings threw jagged fragments that shattered bones and ripped muscle.',
      },
      {
        q: 'Why did shrapnel wounds almost always lead to rapid, life-threatening infections?',
        a: 'Shrapnel drove muddy, bacteria-soaked uniform cloth deep into the body',
        exp: 'Cloth carried lethal soil bacteria deep into wounds where normal antiseptics could not reach.',
      },
      {
        q: 'Why was the farming soil of Flanders so dangerous when soldiers were wounded?',
        a: 'The soil had been heavily manured for centuries, filling it with deadly bacteria',
        exp: 'Manured soil contained tetanus and gas gangrene bacteria that multiplied in deep wounds without oxygen.',
      },
      {
        q: 'What deadly wound infection produced gas bubbles and a foul smell in dying muscle?',
        a: 'Gas Gangrene',
        exp: 'Soil bacteria produced poisons that turned muscle black, killing tissue within hours and causing death in a day.',
      },
      {
        q: 'From late 1914, what routine injection was given to every wounded British soldier?',
        a: 'Anti-tetanus serum (ATS)',
        exp: 'Massively reduced deaths from tetanus (lockjaw) caused by soil bacteria entering open wounds.',
      },
      {
        q: 'Why were head wounds so common among British soldiers in 1914 and early 1915?',
        a: 'Soldiers wore only soft cloth caps while looking over trench parapets',
        exp: 'Cloth caps gave zero protection against flying shrapnel, bullet ricochets, and falling debris.',
      },
      {
        q: 'In autumn 1915, what steel helmet was issued to British troops, cutting fatal head wounds by 80%?',
        a: 'The Brodie Helmet',
        exp: 'Made of pressed steel with a wide rim to deflect falling shrapnel and dirt.',
      },
      {
        q: 'In April 1915, what poisonous gas was first used by the German Army at Second Ypres?',
        a: 'Chlorine Gas',
        exp: 'A greenish-yellow choking gas that damaged the lungs, causing soldiers to drown in bodily fluids.',
      },
      {
        q: 'In 1915, before gas masks existed, how did British soldiers protect themselves from chlorine gas?',
        a: 'Held cloth pads soaked in urine over their noses and mouths',
        exp: 'The ammonia in urine neutralized the acidic chlorine gas, buying precious minutes.',
      },
      {
        q: 'In late 1915, which colourless gas was introduced that was six times deadlier than chlorine?',
        a: 'Phosgene Gas',
        exp: 'Smelled like mouldy hay and acted slowly, often killing an exposed soldier within 48 hours.',
      },
      {
        q: 'In 1917, what horrific blistering gas was first used by Germany, burning skin through clothes?',
        a: 'Mustard Gas',
        exp: 'An oily liquid that stayed in the soil for weeks, causing severe skin blisters, blindness, and lung burns.',
      },
      {
        q: 'Why did poison gas cause less than 5% of British deaths despite the fear it created?',
        a: 'The British Army rapidly issued effective gas masks (box respirators)',
        exp: 'The Small Box Respirator (issued 1916) filtered out deadly gases, keeping death rates low.',
      },
    ],
  },

  // =========================================================================
  // LESSON 4 (KT5.4): The Chain of Evacuation & Medical Services
  // =========================================================================
  {
    num: 4,
    id: 'lesson_5_4',
    title: 'The Chain of Evacuation: From RAP to Base Hospitals',
    enquiry:
      'How Did the RAMC and FANY Coordinate the Evacuation and Triage of Casualties from the Front Line?',
    questions: [
      {
        q: 'What was the main purpose of the "Chain of Evacuation" on the Western Front?',
        a: 'To move, sort, and treat wounded soldiers in stages from the battlefield to safety',
        exp: 'Ensured casualties were treated quickly without clogging up frontline medical stations.',
      },
      {
        q: 'Where was the Regimental Aid Post (RAP) located on the battlefield?',
        a: 'Within 200 metres of the frontline trench, in a dugout or ruined cellar',
        exp: 'Positioned close to the fighting so wounded men could receive basic first aid within minutes.',
      },
      {
        q: 'What medical care could a doctor provide at a Regimental Aid Post (RAP)?',
        a: 'Basic first aid (bandages, pain relief, splints); no surgery could be done',
        exp: 'Patched up walking wounded to fight, or sent stretcher cases back to dressing stations.',
      },
      {
        q: 'Which medical station was located roughly one mile behind the frontline trenches?',
        a: 'The Dressing Station (Advanced or Main Dressing Station)',
        exp: 'Run by the Field Ambulance; gave fresh dressings, tetanus jabs, and hot drinks.',
      },
      {
        q: 'Where were Casualty Clearing Stations (CCS) set up on the Western Front?',
        a: '7 to 12 miles behind the front line, near railways and outside shell range',
        exp: 'Positioned near railheads so stabilized wounded could be sent by train to coastal hospitals.',
      },
      {
        q: 'What vital medical sorting system was carried out at the Casualty Clearing Station (CCS)?',
        a: 'Triage: sorting wounded into walking cases, urgent surgery, and dying',
        exp: 'Focused limited surgeons and operating tables on men with the best chance of survival.',
      },
      {
        q: 'Why did Casualty Clearing Stations (CCS) become the most important surgical units of the war?',
        a: 'Operating quickly within hours was vital to stop fatal gas gangrene',
        exp: 'Surgeons had to cut away infected flesh and amputate limbs before deadly bacteria spread.',
      },
      {
        q: 'Where were large British Base Hospitals located on the Western Front?',
        a: 'Near French and Belgian ports (Calais, Boulogne, Le Havre, Rouen)',
        exp: 'Close to the sea so long-term casualties could be loaded directly onto hospital ships for Britain.',
      },
      {
        q: 'Between 1914 and 1918, how did the Royal Army Medical Corps (RAMC) grow in size?',
        a: 'Grew from roughly 9,000 men in 1914 to over 113,000 by 1918',
        exp: 'Enlisted thousands of civilian doctors, nurses, orderlies, and stretcher-bearers.',
      },
      {
        q: 'What does the acronym FANY stand for in First World War medical history?',
        a: 'First Aid Nursing Yeomanry',
        exp: 'A volunteer women’s organization founded in 1907 that gave vital medical and transport aid.',
      },
      {
        q: 'What dangerous frontline transport job was carried out by female FANY volunteers?',
        a: 'Driving motor ambulance convoys under shellfire between medical stations',
        exp: 'FANY drivers were the first women to drive British military vehicles on the Western Front.',
      },
      {
        q: 'What smooth transport moved up to 800 wounded soldiers at a time from CCS to Base Hospitals?',
        a: 'Specially fitted ambulance trains and canal barges',
        exp: 'Reduced painful jolting over rough roads, helping prevent shock in badly injured men.',
      },
    ],
  },

  // =========================================================================
  // LESSON 5 (KT5.5): Surgical Breakthroughs: The Thomas Splint & Wound Care
  // =========================================================================
  {
    num: 5,
    id: 'lesson_5_5',
    title: 'Surgical Breakthroughs: The Thomas Splint, Wound Debridement & X-Rays',
    enquiry:
      'How Did Wartime Necessity Drive Radical Advances in Surgery, Infection Control, and Fracture Care?',
    questions: [
      {
        q: 'Why was normal sterile surgery impossible in frontline field stations on the Western Front?',
        a: 'Wounds were already filled with mud and manure bacteria the moment a bullet hit',
        exp: 'A clean operating room could not help because deadly bacteria were already deep inside muscle.',
      },
      {
        q: 'What surgical technique called "debridement" was used to stop wound infections?',
        a: 'Cutting away all dead, damaged, and infected tissue around the wound',
        exp: 'Removed the dead flesh that dangerous gas gangrene bacteria needed to grow.',
      },
      {
        q: 'In 1915, what chemical wound-washing method was developed by Alexis Carrel and Henry Dakin?',
        a: 'The Carrel-Dakin Method',
        exp: 'Flushed a mild antiseptic bleach solution through rubber tubes directly into deep wounds.',
      },
      {
        q: 'What was a major practical problem with the Carrel-Dakin solution on the front line?',
        a: 'The chemical solution spoiled quickly and had to be freshly mixed every 6 hours',
        exp: 'Hard to prepare during large battles when thousands of casualties arrived at once.',
      },
      {
        q: 'If cleaning and washing a wound failed to stop gas gangrene, what was the only life-saving choice?',
        a: 'Amputation of the wounded limb',
        exp: 'Over 240,000 British soldiers lost limbs during the war to save their lives from spreading poison.',
      },
      {
        q: 'In 1914–15, what was the survival rate for soldiers suffering a fractured femur (thigh bone)?',
        a: 'Only 20% survived (an 80% death rate)',
        exp: 'Bone ends ground together in bumpy wagons, tearing large blood vessels and causing fatal shock.',
      },
      {
        q: 'Who originally designed the metal leg splint that revolutionized battlefield fracture care?',
        a: 'Hugh Owen Thomas',
        exp: 'A Welsh bone surgeon who invented the traction splint before the war to treat bone disease.',
      },
      {
        q: 'In December 1915, who brought the Thomas Splint to the Western Front, training military doctors?',
        a: 'Robert Jones (nephew of Hugh Owen Thomas)',
        exp: 'Set up training centres for medics; survival rates for femur fractures jumped from 20% to 82%.',
      },
      {
        q: 'How did the Thomas Splint reduce deaths from compound femur fractures from 80% to under 20%?',
        a: 'Held the broken leg in rigid tension, stopping bone ends from cutting blood vessels',
        exp: 'Kept the broken leg still during rough journeys, preventing fatal internal bleeding and shock.',
      },
      {
        q: 'How did the British Army adapt X-ray machines to work closer to the front lines?',
        a: 'Built six mobile X-ray vans that drove directly to Casualty Clearing Stations',
        exp: 'Allowed surgeons to locate bullets and shrapnel inside soldiers before starting surgery.',
      },
      {
        q: 'State one significant problem with early mobile X-ray machines on the Western Front.',
        a: 'Fragile glass tubes overheated after an hour and had to cool down',
        exp: 'Could not run continuously during major battles, and image quality was often poor.',
      },
      {
        q: 'Why could early mobile X-ray machines NOT find the most dangerous cause of wound infection?',
        a: 'They showed metal bullets and bone, but could not detect dirty cloth scraps',
        exp: 'Uniform scraps carried manure bacteria deep into wounds but were invisible on X-ray plates.',
      },
    ],
  },

  // =========================================================================
  // LESSON 6 (KT5.6): Lifesaving Innovations: Blood Storage, Brain & Plastic Surgery
  // =========================================================================
  {
    num: 6,
    id: 'lesson_5_6',
    title: 'Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction',
    enquiry:
      'How Did Blood Transfusions, Neuro-Surgery, and Plastic Reconstruction Advance Under Battlefield Conditions?',
    questions: [
      {
        q: 'In 1901, what major discovery about human blood was made by Austrian doctor Karl Landsteiner?',
        a: 'Discovered different human blood groups (A, B, and O)',
        exp: 'Showed why earlier transfusions often caused blood to clump together and kill the patient.',
      },
      {
        q: 'Which blood group was found in 1907 to be the "universal donor" safe for emergency transfusions?',
        a: 'Blood Group O',
        exp: 'Essential for battle casualties because Group O blood could be given safely without testing.',
      },
      {
        q: 'Before 1915, why was it impossible to store blood in banks for wounded soldiers?',
        a: 'Blood clotted and spoiled within minutes once outside the human body',
        exp: 'Transfusions had to be given person-to-person with donor and wounded soldier lying side by side.',
      },
      {
        q: 'In 1915, what chemical did Richard Lewisohn add to blood to prevent it clotting?',
        a: 'Sodium Citrate',
        exp: 'Stopped blood clotting without poisoning the wounded patient receiving the transfusion.',
      },
      {
        q: 'In 1916, what did Francis Rous and James Turner add to blood to store it for up to 4 weeks?',
        a: 'Citrate glucose solution',
        exp: 'Kept red blood cells alive in refrigerated storage, making blood banks possible.',
      },
      {
        q: 'At the Battle of Cambrai in 1917, who set up the world’s first operational battlefield blood bank?',
        a: 'Oswald Hope Robertson (an American army doctor)',
        exp: 'Collected Group O blood before the battle, storing 22 bottles in ice to treat casualties in shock.',
      },
      {
        q: 'How did Oswald Robertson store and protect his 22 bottles of donor blood before Cambrai?',
        a: 'Packed glass bottles inside wooden ammunition boxes with ice and sawdust',
        exp: 'Allowed emergency transfusions at Casualty Clearing Stations, saving 20 soldiers from shock.',
      },
      {
        q: 'Which American surgeon pioneered new brain surgery techniques for head wounds on the Western Front?',
        a: 'Harvey Cushing',
        exp: 'Used local anaesthetic to stop brain swelling and operated close to the front at CCS units.',
      },
      {
        q: 'How did Harvey Cushing cut death rates for bullet head wounds from 55% down to 29%?',
        a: 'Used local anaesthetic, silver clips to stop bleeding, and magnets to pull out metal',
        exp: 'Careful removal of bone splinters and shrapnel prevented fatal brain infections.',
      },
      {
        q: 'Which New Zealand doctor pioneered facial reconstruction and plastic surgery during World War One?',
        a: 'Harold Gillies',
        exp: 'Shocked by horrific facial injuries from shrapnel; set up a specialist facial repair hospital.',
      },
      {
        q: 'From 1917, which Kent hospital became the world centre for facial reconstruction surgery?',
        a: 'Queen’s Hospital in Sidcup, Kent',
        exp: 'Designed by Harold Gillies for facial surgery; carried out over 11,000 plastic operations.',
      },
      {
        q: 'What skin-graft technique did Harold Gillies invent to rebuild disfigured faces without skin dying?',
        a: 'The "Tube Pedicle" (walking skin graft)',
        exp: 'Rolled skin from the chest into a tube to keep blood flowing before stitching it onto the face.',
      },
    ],
  },
];

module.exports = {
  WESTERN_FRONT_QUIZ_BANK,
};
