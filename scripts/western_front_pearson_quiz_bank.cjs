/**
 * western_front_pearson_quiz_bank.cjs
 *
 * Official Pearson Edexcel GCSE History Paper 1 (Section A: Historic Environment)
 * The British Sector of the Western Front, 1914–1918: Injuries, Treatment and the Trenches.
 * Master Knowledge Retrieval Bank (6 Lessons x 12 Questions = 72 Questions).
 *
 * Pedagogical Standards:
 * 1. 100% Fidelity to the Pearson Revision Guide: Every question and answer is verifiable directly in the guide.
 * 2. High-Yield Specification Recall: Zero obscure trivia, zero university-level historiography.
 * 3. Two-Line Format: Line 1 = Key Fact (concise anchor); Line 2 = Historical Explanation (why it matters).
 * 4. Section A Exam Alignment: Direct links to Feature Questions (Q1) and Source Enquiry (Q2).
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
        a: 'An area of battlefield that juts forward into enemy territory, surrounded on three sides',
        exp: 'Left British troops highly vulnerable to artillery shelling and observation from surrounding German-held ridges.',
      },
      {
        q: 'Why was holding the town of Ypres strategically vital for the British Army throughout the war?',
        a: 'It guarded the English Channel ports (Calais, Boulogne) used for British supplies and troops',
        exp: 'If the German army captured Ypres, they could sever the vital supply link between Britain and the front line.',
      },
      {
        q: 'What dramatic offensive tactic did British miners use at Hill 60 near Ypres in April 1915?',
        a: 'Dug deep underground tunnels and detonated five massive mines under German positions',
        exp: 'Blew the top off the hill, allowing British troops to temporarily capture this vital high-ground observation post.',
      },
      {
        q: 'On what date did the British launch the Battle of the Somme, suffering catastrophic casualties?',
        a: '1 July 1916',
        exp: 'The British suffered 57,000 casualties on the first day alone, completely overwhelming medical evacuation facilities.',
      },
      {
        q: 'What unique underground facility did British and Commonwealth miners construct beneath Arras in 1916–17?',
        a: "A fully equipped underground hospital in the chalk tunnels (Thompson's Cave)",
        exp: 'Contained 700 stretcher beds, operating theatres, electricity, and water, completely sheltered from artillery fire.',
      },
      {
        q: 'What modern military technology was deployed on a mass scale for the first time at the Battle of Cambrai in 1917?',
        a: 'Massed deployment of over 450 British tanks',
        exp: 'Broke through the German Hindenburg Line, leading to the first operational use of a stored blood bank.',
      },
      {
        q: 'Name the four main parallel lines of trenches in the British trench system.',
        a: 'Frontline trench, Support trench, Reserve trench, and Communication trenches',
        exp: 'Allowed troops, food, ammunition, and wounded casualties to move safely between rear depots and the firing line.',
      },
      {
        q: 'Why were trenches dug in a deliberate zig-zag pattern rather than in straight lines?',
        a: 'To contain artillery blast waves and prevent enemy riflemen firing straight down the trench',
        exp: 'Protected soldiers if an artillery shell landed inside a trench, but made carrying stretchers around corners difficult.',
      },
      {
        q: 'What raised wooden planks were placed at the bottom of trenches to keep soldiers out of standing water?',
        a: 'Duckboards',
        exp: "Designed to elevate soldiers' boots above mud and stagnant water to prevent debilitating trench foot.",
      },
      {
        q: 'What was the raised step inside the frontline trench that soldiers stood on to shoot over the parapet?',
        a: 'The Firestep',
        exp: "Allowed soldiers to fire into No Man's Land while remaining protected behind sandbags when stepping down.",
      },
      {
        q: 'Why did constant artillery bombardment make transport and medical evacuation so difficult across Flanders?',
        a: 'It destroyed natural drainage systems and roads, creating a waterlogged quagmire of liquid mud',
        exp: 'Ambulance wagons and motor vehicles got bogged down, forcing stretcher-bearers to carry casualties for miles.',
      },
      {
        q: 'Why did the British Army still have to rely heavily on horse-drawn ambulance wagons throughout the war?',
        a: 'Heavy motor ambulances frequently broke down or got stuck in the deep cratered mud',
        exp: 'Teams of six horses were often required to pull ambulances through mud where motor engines failed.',
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
        q: 'What was the environmental cause of Trench Foot among soldiers on the Western Front?',
        a: 'Standing for days in cold, waterlogged mud and tight boots without dry socks',
        exp: 'Constricted blood circulation, causing feet to go numb, swell, blister, and turn gangrenous.',
      },
      {
        q: 'State two preventative measures ordered by the British Army to combat Trench Foot.',
        a: 'Rubbing feet daily with whale oil and changing into clean, dry socks twice a day',
        exp: "Officers carried out compulsory pair inspections; soldiers had to dry each other's feet to ensure compliance.",
      },
      {
        q: 'What surgical procedure was frequently required as a last resort for severe, gangrenous Trench Foot?',
        a: 'Amputation of toes or the entire foot',
        exp: 'Necessary to stop spreading gangrene and fatal blood poisoning when tissue death had occurred.',
      },
      {
        q: 'What flu-like illness affected an estimated 500,000 British soldiers on the Western Front?',
        a: 'Trench Fever (Pyrexia of Unknown Origin)',
        exp: 'Caused high fever, severe headaches, shivering, and aching leg muscles, disabling men for weeks.',
      },
      {
        q: 'What parasite was eventually identified in 1918 as the transmitter of Trench Fever?',
        a: "Body lice living in the seams of soldiers' woollen uniforms",
        exp: 'Lice thrived in dirty clothing; soldiers scratched the bites, rubbing infected louse faeces into the skin.',
      },
      {
        q: 'How did the British military systematically attempt to eradicate body lice and Trench Fever?',
        a: 'By establishing division bathhouses and mobile steam delousing units for uniforms',
        exp: 'Uniforms were baked in mobile steam vans to kill lice eggs, while soldiers were bathed in hot water.',
      },
      {
        q: 'What was the official British Army medical code used to describe Shell Shock in medical records?',
        a: 'NYD.N ("Not Yet Diagnosed, Nervous")',
        exp: 'Medical officers were ordered not to label men "shell shock" to prevent mass panic and avoid compensation claims.',
      },
      {
        q: 'State two common physical or mental symptoms of Shell Shock observed in front-line soldiers.',
        a: 'Severe uncontrollable tremors, nightmares, loss of speech, and mental confusion',
        exp: 'Caused by the relentless psychological trauma, deafening noise, and fear of high-explosive artillery bombardments.',
      },
      {
        q: 'Approximately how many British soldiers were officially treated for Shell Shock during the First World War?',
        a: 'Approximately 80,000 soldiers',
        exp: 'The scale of psychological trauma shocked military authorities, forcing the creation of specialist mental wards.',
      },
      {
        q: 'Which specialist military hospital in Edinburgh became renowned for treating officers suffering from Shell Shock?',
        a: 'Craiglockhart Hospital',
        exp: 'Pioneered talking therapies and psychological rehabilitation, treating famous war poets like Wilfred Owen and Siegfried Sassoon.',
      },
      {
        q: 'How did the British military command initially view soldiers suffering from severe Shell Shock?',
        a: 'Viewed many as cowards or malingerers attempting to shirk front-line duty',
        exp: 'Some men suffering from severe combat trauma were court-martialled and executed for desertion or cowardice.',
      },
      {
        q: 'What severe intestinal infection was spread in the trenches by drinking water contaminated by sewage and corpses?',
        a: 'Dysentery',
        exp: 'Caused severe diarrhoea and dehydration; treated by purifying water supplies using chloride of lime.',
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
        q: 'Which weapon was responsible for the highest percentage (approximately 58%) of all wounds on the Western Front?',
        a: 'High-explosive artillery shells and shrapnel',
        exp: 'Exploding shell casings produced jagged, irregular steel fragments that shattered bones and ripped flesh.',
      },
      {
        q: 'Why did shrapnel wounds almost always lead to rapid, life-threatening bacterial infections?',
        a: 'Shrapnel tore through dirty uniforms, driving mud and bacteria-soaked cloth deep into muscle tissue',
        exp: 'The fabric carried lethal spores into deep, anaerobic bullet tracks where peacetime antiseptics could not reach.',
      },
      {
        q: 'What agricultural factor made the soil of Flanders and Northern France so biologically dangerous when wounded?',
        a: 'The soil had been heavily fertilised with manure, filling it with tetanus and gas gangrene bacteria',
        exp: 'Farmland contained anaerobic Clostridium bacteria that multiplied rapidly in deep wounds without oxygen.',
      },
      {
        q: 'What deadly wound infection produced gas bubbles and foul-smelling liquid inside dying muscle tissue?',
        a: 'Gas Gangrene',
        exp: 'Bacteria produced toxins that destroyed muscle tissue within hours, turning flesh black and killing within a day.',
      },
      {
        q: 'What medical preventative injection was routinely given to all wounded British soldiers from late 1914?',
        a: 'Anti-tetanus serum (ATS)',
        exp: 'Massively reduced deaths from fatal lockjaw muscle spasms caused by soil bacteria entering wounds.',
      },
      {
        q: 'Why were head wounds disproportionately common among British soldiers in 1914 and early 1915?',
        a: 'Soldiers had only soft cloth service caps while peeking over parapets in the trenches',
        exp: 'Exposed heads to flying shrapnel, bullet ricochets, and falling debris until steel helmets were introduced.',
      },
      {
        q: 'What steel protective equipment was introduced in autumn 1915 that reduced fatal head wounds by 80%?',
        a: 'The Brodie Helmet',
        exp: 'A steel helmet with a wide brim designed to deflect downward-falling artillery shrapnel and debris.',
      },
      {
        q: 'What poisonous gas was first used by the German Army at the Second Battle of Ypres in April 1915?',
        a: 'Chlorine Gas',
        exp: 'A greenish-yellow choking agent that destroyed the lungs, causing victims to suffocate on bodily fluids.',
      },
      {
        q: 'Before gas masks were issued, how did soldiers desperately protect themselves during chlorine gas attacks in 1915?',
        a: 'Held cotton pads soaked in urine over their noses and mouths',
        exp: 'The ammonia in urine chemically reacted with and neutralised the acidic chlorine gas.',
      },
      {
        q: 'Which poisonous gas, introduced in late 1915, was six times more toxic and faster-acting than chlorine?',
        a: 'Phosgene Gas',
        exp: 'An invisible, fast-acting gas with a mouldy-hay smell that could kill an exposed soldier within 48 hours.',
      },
      {
        q: 'What was the distinctive, horrific effect of Mustard Gas when first deployed by the Germans in 1917?',
        a: 'It was an odourless blistering agent that burned skin through uniforms and caused internal blisters',
        exp: 'Remained in the soil for weeks, causing temporary blindness, severe skin burns, and lung damage.',
      },
      {
        q: 'Despite the terror they caused, why did poison gas attacks account for less than 5% of British military deaths?',
        a: 'Rapid development and universal distribution of effective protective box respirators',
        exp: 'The British Small Box Respirator (issued 1916) successfully filtered out lethal gases, preventing mass deaths.',
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
        q: 'What was the primary purpose of the "Chain of Evacuation" on the Western Front?',
        a: 'To transport, triage, and treat wounded soldiers in staged medical posts without overwhelming frontline units',
        exp: 'Ensured casualties moved efficiently from the battlefield back to specialist base hospitals.',
      },
      {
        q: 'Where was the Regimental Aid Post (RAP) physically located on the battlefield?',
        a: 'Within 200 metres of the front line, usually inside a communication trench or dugout',
        exp: 'Positioned close to the fighting so wounded men could receive immediate first aid within minutes.',
      },
      {
        q: 'What level of medical care could the Regimental Medical Officer provide at the RAP?',
        a: 'Basic first aid (bandages, tourniquets, pain relief); no surgery could be performed',
        exp: 'Aimed to patch up the walking wounded to return to duty or stabilise serious cases for stretcher transport.',
      },
      {
        q: 'Which medical post was located roughly half a mile to a mile behind the frontline trenches?',
        a: 'The Advanced Dressing Station (ADS) or Main Dressing Station (MDS)',
        exp: 'Staffed by the Field Ambulance, providing wound dressings, hot drinks, and tetanus antitoxin.',
      },
      {
        q: 'Where were Casualty Clearing Stations (CCS) strategically positioned on the Western Front?',
        a: '7 to 12 miles behind the front line, safely outside artillery range near railway lines',
        exp: 'Near railheads to allow rapid transport of stabilised patients to coastal Base Hospitals.',
      },
      {
        q: 'What crucial medical decision-making process took place at the Casualty Clearing Station (CCS)?',
        a: 'Triage: sorting casualties into walking wounded, those needing urgent surgery, and the moribund (dying)',
        exp: 'Prioritised limited surgical resources for soldiers who had the greatest chance of survival with quick surgery.',
      },
      {
        q: 'Why did Casualty Clearing Stations (CCS) become the most important surgical units on the Western Front?',
        a: 'Because rapid forward surgery within hours was essential to stop gas gangrene and save lives',
        exp: 'Performing emergency amputations and wound debridement at the CCS prevented fatal sepsis before transport.',
      },
      {
        q: 'Where were British Base Hospitals located on the Western Front?',
        a: 'Near French and Belgian coastal ports (Calais, Boulogne, Le Havre, Rouen)',
        exp: 'Positioned near the sea so long-term casualties could be loaded directly onto hospital ships bound for Britain.',
      },
      {
        q: 'How did the Royal Army Medical Corps (RAMC) expand in personnel between 1914 and 1918?',
        a: 'Expanded from approximately 9,000 men in 1914 to over 113,000 by 1918',
        exp: 'Massive mobilization of civilian doctors, nurses, orderlies, and stretcher-bearers to meet casualty demands.',
      },
      {
        q: 'What does the acronym FANY stand for in the context of First World War medical services?',
        a: 'First Aid Nursing Yeomanry',
        exp: "A voluntary women's organisation founded in 1907 that provided vital frontline medical support.",
      },
      {
        q: 'What dangerous and vital frontline transport role was undertaken by women volunteers of the FANY?',
        a: 'Driving motorized ambulance convoys between Dressing Stations, CCS, and railheads under fire',
        exp: 'FANY drivers were the first women to drive British military vehicles on the Western Front, navigating mud and shelling.',
      },
      {
        q: 'What transportation was used to move up to 800 stabilized casualties at a time from the CCS to Base Hospitals?',
        a: 'Specially fitted ambulance trains and canal barges',
        exp: 'Provided smooth, comfortable transport that reduced the physical shock of movement on injured soldiers.',
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
        q: 'Why was traditional aseptic surgery (sterile operating theatres) impossible in forward field dressing stations?',
        a: 'Wounds were already contaminated with muddy manure bacteria the instant the bullet or shrapnel struck',
        exp: 'Sterile operating rooms could not prevent infection when the bacteria were already embedded deep inside muscle.',
      },
      {
        q: 'What surgical procedure called "wound debridement" (excision) was introduced to combat wound infection?',
        a: 'Surgically cutting away all dead, damaged, and infected tissue from around the wound before closing it',
        exp: 'Removed the oxygen-deprived dead flesh that anaerobic gas gangrene bacteria needed to survive and multiply.',
      },
      {
        q: 'What chemical wound-irrigation system was developed by Alexis Carrel and Henry Dakin in 1915?',
        a: 'The Carrel-Dakin Method',
        exp: 'Rubber tubes flushed sterilized sodium hypochlorite solution continuously into deep wounds to kill bacteria.',
      },
      {
        q: 'What was a major practical limitation of the Carrel-Dakin antiseptic solution on the front line?',
        a: 'The solution was unstable and degraded quickly, having to be freshly made every six hours',
        exp: 'Demanded constant chemical preparation, making it difficult to maintain during massive casualty offensives.',
      },
      {
        q: 'If debridement and chemical irrigation failed to halt spreading gas gangrene, what was the only life-saving option?',
        a: 'Immediate surgical amputation of the limb',
        exp: 'By 1918, over 240,000 British soldiers had lost limbs to save their lives from lethal spreading gangrene.',
      },
      {
        q: 'What was the catastrophic survival rate for soldiers suffering a fractured femur (thigh bone) in 1914–15?',
        a: 'Only 20% survived (an 80% death rate)',
        exp: 'Broken bone ends ground together during rough transport, tearing femoral arteries and causing fatal shock.',
      },
      {
        q: 'Who originally designed the traction splint used to immobilize broken leg fractures?',
        a: 'Hugh Owen Thomas',
        exp: 'A Welsh orthopedic surgeon who invented the splint before the war to treat joint and bone tuberculosis.',
      },
      {
        q: 'Who introduced the Thomas Splint to the Western Front in December 1915, transforming survival rates?',
        a: 'Robert Jones (nephew of Hugh Owen Thomas)',
        exp: 'Trained medical staff and distributed the splint, dramatically increasing femur survival from 20% to 82%.',
      },
      {
        q: 'How did the Thomas Splint miraculously reduce the mortality rate for compound femur fractures from 80% to under 20%?',
        a: 'It held the broken leg in rigid traction, preventing broken bone ends from severing blood vessels and causing shock',
        exp: 'Stabilized the fracture completely during ambulance journeys over rough terrain, preventing fatal internal bleeding.',
      },
      {
        q: 'How were diagnostic X-ray units adapted to operate closer to the front line on the Western Front?',
        a: 'Six mobile X-ray vans were built to travel directly to Casualty Clearing Stations',
        exp: 'Allowed surgeons to pinpoint the exact location of embedded shrapnel and bullets before operating.',
      },
      {
        q: 'State one significant technical limitation of early mobile X-ray machines used on the Western Front.',
        a: 'Fragile glass tubes overheated after an hour of use and required cool-down periods',
        exp: 'Machines could not run continuously during large battles, and radiation doses were high and image quality poor.',
      },
      {
        q: 'Why could early mobile X-ray machines NOT detect the most dangerous cause of wound infection?',
        a: 'They could detect metal shrapnel and bone, but could not detect embedded pieces of dirty uniform cloth',
        exp: 'Pieces of uniform carried anaerobic manure bacteria into wounds, remaining invisible on early X-ray plates.',
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
        q: 'In 1901, what monumental medical discovery did Austrian doctor Karl Landsteiner make regarding human blood?',
        a: 'Discovered the existence of different human blood groups (A, B, and O)',
        exp: 'Explained why earlier transfusions often caused fatal blood agglutination (clotting) when types were mismatched.',
      },
      {
        q: 'Which blood group was identified in 1907 as the "universal donor" group safe for all emergency transfusions?',
        a: 'Blood Group O',
        exp: 'Crucial for military transfusions because group O blood could be administered immediately without cross-matching.',
      },
      {
        q: 'Before 1915, why could human blood not be stored in banks for emergency transfusions?',
        a: 'Blood coagulated (clotted) and spoiled within minutes as soon as it left the human body',
        exp: 'Transfusions had to be performed "arm-to-arm" with the live donor lying directly beside the wounded soldier.',
      },
      {
        q: 'What chemical anticoagulant did American doctor Richard Lewisohn discover in 1915 that prevented blood clotting?',
        a: 'Sodium Citrate',
        exp: 'Adding small amounts of sodium citrate stopped blood clotting without poisoning the recipient patient.',
      },
      {
        q: 'What breakthrough did Francis Rous and James Turner make in 1916 that extended blood storage up to four weeks?',
        a: 'Added citrate glucose solution to the blood',
        exp: 'Kept red blood cells alive and stable in refrigerated storage, making pre-donated blood depots possible.',
      },
      {
        q: "Who established the world's first operational battlefield blood bank at the Battle of Cambrai in 1917?",
        a: 'Oswald Hope Robertson (an American army medical officer)',
        exp: 'Collected universal Group O blood in advance, storing 22 units in ice boxes to treat casualties suffering from shock.',
      },
      {
        q: 'How did Oswald Robertson store and preserve his 22 units of donor blood before the Battle of Cambrai?',
        a: 'Stored in glass bottles packed inside wooden ammunition boxes with ice and sawdust',
        exp: 'Allowed emergency transfusions right at the Casualty Clearing Station, successfully treating 20 soldiers.',
      },
      {
        q: 'Which American surgeon pioneered revolutionary neurosurgical techniques for brain wounds on the Western Front?',
        a: 'Harvey Cushing',
        exp: 'Used local anaesthetic instead of general anaesthetic to reduce brain swelling and operated at forward CCS units.',
      },
      {
        q: 'How did Harvey Cushing reduce mortality for penetrating head wounds from 55% down to 29%?',
        a: 'Used local anaesthetic, silver surgical clips to stop bleeding, and electromagnets to extract shrapnel',
        exp: 'Careful surgical removal of bone fragments and metal reduced brain trauma and prevented fatal cerebral infection.',
      },
      {
        q: 'Which New Zealand-born surgeon pioneered modern plastic and facial reconstruction surgery during the First World War?',
        a: 'Harold Gillies',
        exp: 'Horrified by severe facial disfigurements from shrapnel, he convinced the army to create a specialist facial hospital.',
      },
      {
        q: 'Which specialist military hospital in Kent became the world centre for pioneering facial reconstruction from 1917?',
        a: "Queen's Hospital in Sidcup, Kent",
        exp: 'Designed by Harold Gillies specifically for facial reconstruction, performing over 11,000 complex operations.',
      },
      {
        q: 'What innovative surgical technique did Harold Gillies develop to safely graft living skin onto disfigured faces?',
        a: 'The "Tube Pedicle" (walking skin graft)',
        exp: 'Rolled skin from the chest or forehead into a tube to maintain blood supply before grafting it onto facial wounds.',
      },
    ],
  },
];

module.exports = {
  WESTERN_FRONT_QUIZ_BANK,
};
