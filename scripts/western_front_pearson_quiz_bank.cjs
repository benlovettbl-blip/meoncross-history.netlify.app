/**
 * western_front_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 1 (Section A: Historic Environment)
 * The British Sector of the Western Front, 1914–1918: Injuries, Treatment and the Trenches.
 * Master Knowledge Retrieval Bank (6 Lessons x 8 Questions = 48 Questions).
 *
 * Pedagogical Standards (SEN & GCSE Exam Optimized):
 * 1. 100% Fidelity to the Pearson Revision Guide & Specification.
 * 2. Chronological Anchoring: Dates, battles, and years pre-anchored in stems to test facts/mechanisms.
 * 3. SEN-Accessible Language: Direct, plain English Tier-2 vocabulary; 100% preserved Tier-3 terms.
 * 4. Streamlined 8-Question Format: 8 high-yield questions per lesson for optimal cognitive load & handwriting space.
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
        q: 'On 1 July 1916, the British launched the Battle of the Somme. How many casualties did they suffer on Day 1?',
        a: '57,000 casualties (over 19,000 killed)',
        exp: 'The worst single day in British military history, completely overwhelming frontline medical stations.',
      },
      {
        q: 'In April 1917, what underground medical facility did British miners build beneath Arras?',
        a: 'An underground hospital in chalk tunnels (Thompson’s Cave)',
        exp: 'Contained 700 beds, operating rooms, water, and power, completely safe from shellfire.',
      },
      {
        q: 'At the Battle of Cambrai in November 1917, what modern weapon was mass deployed for the first time?',
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
        q: 'Why did deep mud and artillery craters make carrying wounded men across Flanders so difficult?',
        a: 'Destroyed roads caused motor ambulances to get stuck, forcing stretcher-bearers to walk for miles',
        exp: 'Teams of four stretcher-bearers had to carry heavy stretchers by hand through knee-deep mud.',
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
        q: 'In late 1915, which colourless gas was introduced that was six times deadlier than chlorine?',
        a: 'Phosgene Gas',
        exp: 'Smelled like mouldy hay and acted slowly, often killing an exposed soldier within 48 hours.',
      },
      {
        q: 'In 1917, what horrific blistering gas was first used by Germany, burning skin through clothes?',
        a: 'Mustard Gas',
        exp: 'An oily liquid that stayed in the soil for weeks, causing severe skin blisters, blindness, and lung burns.',
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
        q: 'Where were large British Base Hospitals located on the Western Front?',
        a: 'Near French and Belgian ports (Calais, Boulogne, Le Havre, Rouen)',
        exp: 'Close to the sea so long-term casualties could be loaded directly onto hospital ships for Britain.',
      },
      {
        q: 'What dangerous frontline transport job was carried out by female FANY volunteers?',
        a: 'Driving motor ambulance convoys under shellfire between medical stations',
        exp: 'FANY drivers were the first women to drive British military vehicles on the Western Front.',
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
        q: 'In 1914–15, what was the survival rate for soldiers suffering a fractured femur (thigh bone)?',
        a: 'Only 20% survived (an 80% death rate)',
        exp: 'Bone ends ground together in bumpy wagons, tearing large blood vessels and causing fatal shock.',
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
        q: 'Which American surgeon pioneered new brain surgery techniques for head wounds on the Western Front?',
        a: 'Harvey Cushing',
        exp: 'Used local anaesthetic to stop brain swelling and operated close to the front at CCS units.',
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
