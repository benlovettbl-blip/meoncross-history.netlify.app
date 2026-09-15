// Section A: The British Sector of the Western Front, 1914–1918 — Spreads 14, 15, 16
module.exports = [
  // ==========================================
  // SPREAD 14: TRENCH ENVIRONMENT & INJURIES
  // ==========================================
  {
    topic: 'Section A &bull; The Western Front (1914–1918)',
    title:
      'Spread 14: The Western Front Environment: Terrain, Trench Warfare &amp; Battle Injuries',
    left: {
      headline: 'The Industrial Battlefield: Mud, Shrapnel, Poison Gas &amp; Gangrene',
      summary:
        'The British sector of the Western Front stretched from the North Sea coast of Belgium down through the chalk plains of Northern France. The collision of modern industrial firepower (high-explosive artillery, machine guns, poison gas) with manured farmland created catastrophic trauma and unprecedented wound infection.',
      pillars: [
        {
          title: '1. The Trench Environment',
          subtitle: 'Ypres, Somme & Arras',
          bullets: [
            '**Ypres Salient:** low-lying Belgian bowl vulnerable to German artillery on surrounding ridges; notorious for Passchendaele liquid mud.',
            '**The Somme (1916):** chalky terrain and steep river valleys; witnessed 57,000 British casualties on the first day alone (1 July 1916).',
            '**Arras (1917):** vast underground chalk quarries excavated by New Zealand tunneling companies into a subterranean city housing 25,000 troops.',
            'Trench network: front line (fire trench), support trench (80m back), reserve trench (100m back), and communication trenches.',
          ],
        },
        {
          title: '2. Ill Health: Foot, Fever & Shell Shock',
          subtitle: 'Environmental Ailments',
          bullets: [
            '**Trench Foot:** caused by standing for days in waterlogged mud; feet swelled, turned gangrenous, and required amputation; treated with whale oil.',
            '**Trench Fever:** debilitating flu-like pyrexia causing severe joint and leg pain; proved in 1918 to be spread by body lice living in uniforms.',
            '**Shell Shock (NYDN):** psychological breakdown caused by continuous artillery bombardment; symptoms included mutism, tremors, and nightmares.',
            'Over 80,000 British soldiers suffered shell shock; early military courts treated it as cowardice, but specialized clinics (Craiglockhart) opened.',
          ],
        },
        {
          title: '3. Battle Wounds & Poison Gas',
          subtitle: 'Shrapnel & Chemical Warfare',
          bullets: [
            'Artillery caused 58% of all wounds: jagged steel **shrapnel** balls and shell splinters tore flesh, shattering bones and smashing skulls.',
            'Belgian farmland was heavily manured with fertilizer containing anaerobic bacteria (*Clostridium perfringens*), causing fatal **gas gangrene**.',
            '**Poison Gas:** German army introduced **Chlorine gas** at 2nd Ypres (1915); followed by lethal **Phosgene** and blistering **Mustard gas** (1917).',
            'Gas masks evolved rapidly from urine-soaked cotton pads to the flannel Hypo Helmet, culminating in the 1916 **Small Box Respirator**.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Dr W. H. R. Rivers',
          role: 'Psychiatrist at Craiglockhart Hospital; pioneered humane talking therapy for shell-shocked officers (e.g. Sassoon).',
        },
        {
          name: 'Field Marshal Haig',
          role: 'Commander-in-Chief of British Expeditionary Force; directed offensives at the Somme (1916) and Passchendaele (1917).',
        },
        {
          name: 'Regimental Stretcher Bearer',
          role: 'Frontline soldier; recovered wounded under heavy artillery fire; 16 bearers per battalion of 1,000 men.',
        },
        {
          name: 'RAMC Sanitary Officer',
          role: 'Medical officer responsible for monitoring trench drainage, chemical latrines, and delousing baths.',
        },
      ],
      archivalSource: {
        title: 'Captain M. S. Esler on Shrapnel Trauma and Trench Mud',
        citation:
          'Imperial War Museum · Private Papers of Captain M. S. Esler, RAMC Medical Officer, Passchendaele, 1917',
        quote:
          'The mud here is beyond human comprehension. Stretcher-bearers take six hours to carry a single fractured femur a thousand yards, sinking to their hips in liquid slime. The shell wounds are frightful: torn limbs embedded with sodden khaki cloth and manure. If we cannot cleanse the wound within twelve hours, gas gangrene sets in, the flesh turns black and crackles under the fingers, and the man is dead by dawn.',
        significance:
          'Authentic frontline medical evidence highlighting how Passchendaele mud delayed evacuation, turning simple wounds into fatal anaerobic gas gangrene.',
      },
    },
    right: {
      deepCases: [
        {
          title: 'Case 1: The Gas Warfare Escalation (1915–1917)',
          points: [
            '**Chlorine (April 1915, 2nd Ypres):** greenish-yellow cloud; stripped respiratory linings; soldiers suffocated on their own fluids.',
            '**Phosgene (December 1915):** colorless, smelled of mouldy hay; six times more toxic than chlorine; symptoms delayed for 24 hours.',
            '**Mustard gas (July 1917, 3rd Ypres):** blistering agent; burned through uniforms; caused agonizing external blisters, blindness, and internal burns.',
            'While terrifying, gas caused fewer than 3% of British battle deaths because British gas masks (Small Box Respirator) were exceptionally effective.',
          ],
        },
        {
          title: 'Case 2: The Brodie Helmet & Skull Trauma (1915)',
          points: [
            'In 1914, British soldiers entered combat wearing soft cloth caps, suffering catastrophic cranial fractures from low-velocity shell splinters.',
            'In late 1915, the British Army introduced the **Brodie steel helmet**, stamped from a single sheet of hardened manganese steel.',
            'The helmet reduced fatal head wounds by over 80% and transformed cranial trauma from instantaneous death to treatable scalp lacerations.',
            'Paradoxically, hospitals saw an apparent increase in head wound admissions because soldiers who previously died instantly now survived to reach hospital.',
          ],
        },
        {
          title: "Case 3: Underground Hospital at Thompson's Cave (Arras, 1917)",
          points: [
            'Ahead of the April 1917 Battle of Arras, New Zealand and British engineers linked medieval chalk quarries beneath the city.',
            'Created an enormous bomb-proof underground hospital ("Thompson\'s Cave") just 800 yards behind the frontline trenches.',
            'Fitted with 700 hospital beds, fully equipped operating theatres, piped water, electric lighting, and a mortuary.',
            'Allowed surgeons to operate on severely wounded troops under continuous German bombardment in total safety and hygiene.',
          ],
        },
        {
          title: 'Case 4: Gas Gangrene & The Debridement Protocol',
          points: [
            'High-velocity shrapnel drove dirty, manure-soaked uniform fabric deep into torn muscles and fractured bone cavities.',
            'In the absence of oxygen, anaerobic bacteria produced foul gas bubbles that caused muscle tissue to rot and gangrene rapidly.',
            'Antiseptics failed because chemical washes could not reach deep wound recesses without damaging living human tissue.',
            'Surgeons developed **wound excision (debridement)**: cutting away all dead, damaged, and infected tissue before flushing with saline.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Industrial Artillery',
          text: 'Shrapnel shells shatter bone; drive manured soil and uniform cloth deep into muscle.',
        },
        {
          stage: '2. Gas Gangrene Risk',
          text: 'Anaerobic bacteria (*Clostridium*) rot living flesh; requires surgery within hours.',
        },
        {
          stage: '3. Evacuation Delays',
          text: 'Deep liquid mud at Ypres and Somme traps stretcher bearers, delaying life-saving triage.',
        },
        {
          stage: '4. Surgical Debridement',
          text: 'Surgeons cut away dead tissue and flush wounds, creating new standards of trauma care.',
        },
      ],
      masterWordBank: [
        {
          term: 'Ypres Salient',
          def: 'Vulnerable bulge in British line in Belgium surrounded by German-held ridges.',
        },
        {
          term: 'Shrapnel',
          def: 'Lead or steel balls packed inside artillery shells designed to spray upon explosion.',
        },
        {
          term: 'Gas Gangrene',
          def: 'Lethal rotting of flesh caused by soil bacteria in deep, oxygen-deprived wounds.',
        },
        {
          term: 'Trench Foot',
          def: 'Painful swelling and rotting of feet caused by prolonged immersion in cold water.',
        },
        {
          term: 'Trench Fever',
          def: 'Painful flu-like illness spread among frontline troops by body lice.',
        },
        {
          term: 'Shell Shock',
          def: 'Psychological and nervous trauma caused by continuous artillery bombardment.',
        },
        {
          term: 'Mustard Gas',
          def: 'Blistering chemical agent causing severe skin burns, blindness, and internal injury.',
        },
        {
          term: 'Brodie Helmet',
          def: 'Steel combat helmet introduced in 1915 that reduced fatal head wounds by 80%.',
        },
        {
          term: 'Debridement',
          def: 'Surgical excision of dead, contaminated, or infected tissue from a wound.',
        },
        {
          term: 'Small Box Respirator',
          def: 'Highly effective British gas mask introduced in 1916 with carbon filter box.',
        },
        {
          term: 'Passchendaele',
          def: 'Third Battle of Ypres (1917) infamous for catastrophic liquid mud and rain.',
        },
        {
          term: 'Arras',
          def: 'French city where engineers excavated a 700-bed underground hospital in chalk caves.',
        },
      ],
    },
  },

  // ==========================================
  // SPREAD 15: THE EVACUATION CHAIN & PERSONNEL
  // ==========================================
  {
    topic: 'Section A &bull; The Western Front (1914–1918)',
    title:
      'Spread 15: The Evacuation Chain &amp; Medical Personnel: RAMC, FANY &amp; Frontline Triage',
    left: {
      headline: "The Lifeline: From No Man's Land to Blighty via the Chain of Evacuation",
      summary:
        'To save wounded soldiers from shock and gas gangrene, the **Royal Army Medical Corps (RAMC)** established the **Chain of Evacuation**. Wounded men were moved swiftly backwards through progressive stages of care: from stretcher bearers to Regimental Aid Posts, Dressing Stations, Casualty Clearing Stations, and coastal Base Hospitals.',
      pillars: [
        {
          title: '1. The Frontline Stages (RAP & ADS)',
          subtitle: 'Immediate First Aid',
          bullets: [
            '**Stretcher Bearers:** 16 per battalion (4 per company); recovered wounded under machine-gun fire; carried basic field dressings and morphia.',
            '**Regimental Aid Post (RAP):** located 200m behind front line in dugouts or ruined basements; Medical Officer administered immediate first aid.',
            'Could not hold wounded men: walking wounded returned to trenches; serious casualties moved back to Dressing Stations.',
            '**Advanced & Main Dressing Stations (ADS/MDS):** located 1,000–2,000m back; run by Field Ambulance units; redressed wounds and treated shock.',
          ],
        },
        {
          title: '2. The Surgical Pivot: The CCS',
          subtitle: 'Casualty Clearing Stations',
          bullets: [
            'Located 10–20 miles behind lines, out of artillery range, near railway sidings and canals for swift transportation.',
            'Contained surgical teams operating around the clock; performed critical, life-saving emergency amputations and laparotomies.',
            '**Triage System:** sorted casualties into three groups: (1) Walking Wounded, (2) In Need of Immediate Surgery, (3) Moribund (beyond hope).',
            'Became the most important medical centers on the Western Front, dealing with thousands of casualties during major offensives.',
          ],
        },
        {
          title: '3. Coastal Base Hospitals',
          subtitle: 'Specialist Recovery & Blighty',
          bullets: [
            'Located near French Channel ports (Boulogne, Le Touquet, Étaples); housed in converted luxury hotels, casinos, and tent complexes.',
            'Contained specialist wards for amputees, burns, plastic surgery, and head wounds; operated on stable patients before repatriation.',
            'Repatriation: hospital ships transported convalescing soldiers across the English Channel to military hospitals in "Blighty" (Britain).',
            'If the German army launched an offensive, Base Hospitals converted beds back into acute trauma wards to receive direct trainloads.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Sir Arthur Sloggett',
          role: 'Director General of RAMC medical services on the Western Front; organized massive expansion from 1914.',
        },
        {
          name: 'Field Ambulance Unit',
          role: 'Mobile RAMC medical unit (approx. 250 men) operating the Advanced and Main Dressing Stations.',
        },
        {
          name: 'FANY Ambulance Driver',
          role: 'First Aid Nursing Yeomanry volunteer; drove motor ambulances through shellfire to transport wounded.',
        },
        {
          name: 'QAIMNS Nursing Sister',
          role: "Queen Alexandra's Imperial Military Nursing Service professional military nurse staffing CCS units.",
        },
      ],
      archivalSource: {
        title: 'Sister Katherine Luard on Triage at a Casualty Clearing Station',
        citation:
          'Wellcome Collection · Diary of a Nursing Sister on the Western Front, Katherine Luard, CCS No. 32, 1916',
        quote:
          'The convoys have been pouring in without intermission since midnight. The stretchers cover the entire grass plateau outside the operating huts. The triage officer walks swiftly between them, chalking numbers on their coats: those who must be operated on this instant if life is to be saved, and those whose moribund breathing means no human hand can help them. The surgeons operate until they drop from sheer exhaustion.',
        significance:
          'Firsthand nursing diary demonstrating the relentless pace, emotional weight, and clinical sorting (triage) operating at Western Front Casualty Clearing Stations.',
      },
    },
    right: {
      deepCases: [
        {
          title: 'Case 1: The Evolution of Medical Transport (Mud vs Motors)',
          points: [
            'In 1914, British medical evacuation relied on horse-drawn ambulances; horses got stuck in mud and jolted fractured bones agonizingly.',
            'The British Red Cross raised funds for 250 motor ambulances by October 1914, proving faster and gentler over paved roads.',
            'In deep mud (Ypres), motor vehicles broke down; the RAMC introduced horse-drawn sledges and canal barges.',
            'Canal barges traveling along French waterways provided exceptionally smooth transport for severe chest, abdominal, and brain injuries.',
          ],
        },
        {
          title: 'Case 2: The Heroic Role of the FANY (Founded 1907)',
          points: [
            "First Aid Nursing Yeomanry (FANY) was founded in 1907 by Captain Edward Baker as a mounted women's paramedical corps.",
            'Initially rejected by the sexist British War Office, the FANY drove ambulances and set up hospitals for the Belgian and French armies in 1914.',
            'Their bravery forced the British Army to officially recognize them in January 1916; FANYs became frontline ambulance drivers for the RAMC.',
            'They ran mobile field soup kitchens, portable bath vehicles, and drove thousands of wounded soldiers from CCSs to ambulance trains under shellfire.',
          ],
        },
        {
          title: 'Case 3: Women Volunteers: VADs & Professional Nurses',
          points: [
            "Queen Alexandra's Imperial Military Nursing Service (QAIMNS) expanded from 300 professional military nurses to over 10,000 by 1918.",
            'Voluntary Aid Detachments (VADs): middle-class civilian women who volunteered for unpaid hospital nursing and scrub duties.',
            'Professional nurses initially distrusted VADs, relegating them to cleaning floors, washing bandages, and serving meals.',
            'As battle casualties exploded during the Somme, VADs took on advanced clinical tasks: administering injections and redressing wounds.',
          ],
        },
        {
          title: 'Case 4: Ambulance Trains & Channel Hospital Ships',
          points: [
            'British railway companies constructed specialized ambulance trains fitted with bunks, pharmacies, and small operating theatres.',
            'Trains carried up to 800 wounded men directly from railhead CCSs to Channel coastal Base Hospitals in complete comfort.',
            'Hospital ships (painted white with large green stripes and red crosses) carried wounded across the English Channel to Southampton.',
            'Despite Red Cross markings protected by the Geneva Convention, German U-boats torpedoed hospital ships (e.g. *HMHS Llandovery Castle* in 1918).',
          ],
        },
      ],
      causalPathway: [
        {
          stage: "1. No Man's Land Recovery",
          text: 'Stretcher bearers recover wounded under fire; administer field dressings and morphia.',
        },
        {
          stage: '2. RAP & Dressing Station',
          text: 'Medical officers stabilize fractures and treat shock in underground communication dugouts.',
        },
        {
          stage: '3. CCS Emergency Surgery',
          text: 'Surgical teams at railheads perform life-saving operations and amputations within hours.',
        },
        {
          stage: '4. Base Hospital & Blighty',
          text: 'Hospital trains transport stable patients to Channel ports for specialist surgery in UK.',
        },
      ],
      masterWordBank: [
        {
          term: 'RAMC',
          def: 'Royal Army Medical Corps; official branch of British Army responsible for medical care.',
        },
        {
          term: 'FANY',
          def: 'First Aid Nursing Yeomanry; women volunteers who drove frontline motor ambulances.',
        },
        {
          term: 'Evacuation Chain',
          def: 'Staged system transporting wounded soldiers from frontline to British base hospitals.',
        },
        {
          term: 'Regimental Aid Post',
          def: 'Immediate first-aid station located 200m behind frontline trenches (RAP).',
        },
        {
          term: 'Dressing Station',
          def: 'Medical facility located 1–2km behind lines for redressing wounds and shock.',
        },
        {
          term: 'CCS',
          def: 'Casualty Clearing Station; frontline surgical hospital located 10–20 miles behind lines.',
        },
        {
          term: 'Base Hospital',
          def: 'Large specialist hospital located near French Channel ports (e.g. Boulogne).',
        },
        {
          term: 'Triage',
          def: 'Clinical system of categorizing casualties based on medical urgency and survival likelihood.',
        },
        {
          term: 'VAD',
          def: 'Voluntary Aid Detachment; civilian volunteer nurses providing hospital auxiliary care.',
        },
        {
          term: 'Blighty',
          def: "British soldiers' slang term for Britain or a non-fatal wound requiring home return.",
        },
        {
          term: 'Field Ambulance',
          def: 'Mobile RAMC military unit responsible for operating the dressing stations.',
        },
        {
          term: 'Canal Barge',
          def: 'Waterway vessel used to provide smooth, jolt-free transport for head and stomach wounds.',
        },
      ],
    },
  },

  // ==========================================
  // SPREAD 16: FRONTLINE INNOVATION & BREAKTHROUGHS
  // ==========================================
  {
    topic: 'Section A &bull; The Western Front (1914–1918)',
    title:
      'Spread 16: Frontline Medical Innovation: The Thomas Splint, Mobile X-Rays, Blood Banks &amp; Surgery',
    left: {
      headline: 'The Crucible of Innovation: How Trench Warfare Transformed Modern Medicine',
      summary:
        'Faced with catastrophic trauma, military doctors accelerated medical science by decades. Innovations like the **Thomas Splint**, mobile **X-ray vans**, blood clotting chemicals allowing **blood storage and banks**, and pioneering **plastic and brain surgery** saved tens of thousands of lives.',
      pillars: [
        {
          title: '1. The Thomas Splint (1915)',
          subtitle: 'Robert Jones & Femur Trauma',
          bullets: [
            'In 1914, compound fractures of the femur (thigh bone) had an 80% mortality rate due to severed arteries, shock, and muscle spasms.',
            'Designed by Hugh Owen Thomas; introduced to the Western Front in December 1915 by his nephew, orthopaedic surgeon **Robert Jones**.',
            'A rigid metal frame that pulled the leg in continuous tension, preventing broken bone ends grating and piercing femoral arteries.',
            'Slashed femur fracture mortality from **80% down to 20%**; became standard issue for every British frontline stretcher team.',
          ],
        },
        {
          title: '2. Mobile X-Rays & Radiology',
          subtitle: 'Locating Shrapnel and Bullets',
          bullets: [
            'X-rays (discovered in 1895) were vital to locate deeply buried jagged shrapnel fragments and bullets before infection set in.',
            'British RAMC deployed truck-mounted **mobile X-ray vans** directly to Casualty Clearing Stations along the Western Front.',
            'Allowed surgical teams to pinpoint metal fragments in two planes without painfully probing and tearing open living muscle tissue.',
            'Limitations: fragile glass vacuum tubes broke on shell-pitted roads, and equipment could not detect clothing fibers or gas gangrene.',
          ],
        },
        {
          title: '3. Blood Storage & Blood Banks',
          subtitle: 'Robertson & The Battle of Cambrai',
          bullets: [
            'Blood transfusions were difficult because blood coagulated (clotted) within minutes outside the human body.',
            '1915: Richard Lewisohn discovered adding **sodium citrate** stopped blood clotting without poisoning the recipient.',
            '1916: Francis Rous and James Turner added **glucose (dextrose)**, allowing refrigerated blood to be stored on ice for up to 28 days.',
            "1917 (Battle of Cambrai): Canadian-American doctor **Oswald Hope Robertson** established the world's first frontline **blood bank**.",
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Robert Jones',
          role: 'British orthopaedic surgeon; introduced the Thomas Splint to the Western Front in December 1915.',
        },
        {
          name: 'Oswald Hope Robertson',
          role: 'Army doctor who established the first frontline blood depot at the Battle of Cambrai (1917).',
        },
        {
          name: 'Harold Gillies',
          role: "New Zealand-born surgeon; father of modern plastic surgery; founded Queen's Hospital in Sidcup (1917).",
        },
        {
          name: 'Harvey Cushing',
          role: 'American neurosurgeon on the Western Front; pioneered brain surgery using magnets and local anaesthetics.',
        },
      ],
      archivalSource: {
        title: 'Captain Oswald Hope Robertson on Storing Blood at the Battle of Cambrai',
        citation:
          'British Medical Journal · A Method on Citrated Blood Transfusions on the Western Front, O. H. Robertson, 1918',
        quote:
          'Twenty-two patients in severe shock from hemorrhage were transfused with preserved blood stored on ice in our mobile blood depot before the assault on Cambrai. Eleven of these men were in a condition so desperate that recovery without transfusion was deemed impossible. Of these twenty-two, nineteen recovered completely. The blood was kept in glass bottles in an ice chest for up to twenty-six days without deterioration.',
        significance:
          "Robertson's groundbreaking report proving that pre-collected, chemically preserved, and refrigerated blood banks could be deployed on a battlefield to save soldiers in hemorrhagic shock.",
      },
    },
    right: {
      deepCases: [
        {
          title: 'Case 1: The Thomas Splint Mechanics & Impact',
          points: [
            'The splint consisted of a padded leather ring fitting firmly against the groin, attached to two steel rods joined at the foot.',
            'By securing the boot with a cord and tightening it with a windlass stick, surgeons applied continuous mechanical traction.',
            'Traction stabilized fractured bone ends, preventing severed arteries and reducing the agonizing agony that caused fatal shock.',
            "Because stretcher bearers applied the splint in No Man's Land, soldiers arrived at Casualty Clearing Stations in stable surgical condition.",
          ],
        },
        {
          title: 'Case 2: Harold Gillies & Plastic Reconstruction Surgery',
          points: [
            'Shrapnel and machine-gun fire caused horrifying facial injuries, blowing away noses, jaws, and cheekbones.',
            'New Zealand surgeon **Harold Gillies** realized men with severe facial disfigurements faced social ostracism and depression.',
            "Established **Queen's Hospital in Sidcup**, Kent, in August 1917 as the world's premier facial reconstruction hospital.",
            'Invented the **pedicle tube flap**: skin from the chest or forehead was rolled into a living tube, keeping blood supply alive until grafted onto the face.',
          ],
        },
        {
          title: 'Case 3: Harvey Cushing & Modern Neurosurgery',
          points: [
            'In 1914, head wounds were viewed as fatal; surgeons rarely operated because probing brain tissue caused massive hemorrhages.',
            'American neurosurgeon **Harvey Cushing** operated on the Western Front, pioneering refined microsurgical techniques.',
            'Used electromagnets to gently extract shrapnel fragments and applied local anaesthetic rather than general chloroform to reduce brain swelling.',
            'Cushing operated on 45 patients at 3rd Ypres with an astonishing **71% survival rate**, reducing brain surgery mortality from 55% down to 29%.',
          ],
        },
        {
          title: 'Case 4: The Carrel-Dakin Antiseptic Irrigation Method',
          points: [
            'Ordinary antiseptic washes failed to treat gas gangrene because bacteria colonized deep beneath necrotic muscle tissue.',
            'In 1915, French surgeon Alexis Carrel and chemist Henry Dakin developed a sterilized sodium hypochlorite antiseptic solution.',
            'Surgeons inserted small, perforated rubber tubes directly into deep wound cavities, flushing the chemical continuously every two hours.',
            'The Carrel-Dakin method prevented wound gangrene and saved thousands of limbs that would otherwise have been amputated.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Femur Fatalities (1914)',
          text: 'Spasming bone fragments sever femoral arteries; 80% of femur casualties die of shock.',
        },
        {
          stage: '2. The Thomas Splint',
          text: 'Robert Jones introduces traction splint; stabilizes bone and slashes mortality to 20%.',
        },
        {
          stage: '3. Blood Storage (1915–17)',
          text: 'Sodium citrate and glucose allow blood to be stored on ice for up to 28 days.',
        },
        {
          stage: '4. Cambrai Blood Bank',
          text: 'Robertson deploys pre-collected blood depots (1917); transforms trauma shock survival.',
        },
      ],
      masterWordBank: [
        {
          term: 'Thomas Splint',
          def: 'Metal traction splint invented by Hugh Owen Thomas that reduced femur mortality from 80% to 20%.',
        },
        {
          term: 'Robert Jones',
          def: 'Leading British orthopaedic surgeon who introduced the Thomas Splint to Western Front in 1915.',
        },
        {
          term: 'Sodium Citrate',
          def: 'Chemical discovered by Richard Lewisohn in 1915 that prevented blood clotting in storage.',
        },
        {
          term: 'Citrate-Glucose',
          def: 'Solution allowing blood to be stored on ice for 28 days, developed by Rous and Turner.',
        },
        {
          term: 'Oswald Robertson',
          def: "Army doctor who established the world's first frontline blood depot at Battle of Cambrai (1917).",
        },
        {
          term: 'Harold Gillies',
          def: "Surgeon who pioneered plastic surgery and pedicle tube skin flaps at Queen's Hospital, Sidcup.",
        },
        {
          term: "Queen's Hospital",
          def: 'Specialist facial reconstruction hospital opened in Sidcup in 1917, treating over 5,000 men.',
        },
        {
          term: 'Pedicle Tube',
          def: 'Surgical tube of rolled skin maintaining blood flow while skin is grafted onto face.',
        },
        {
          term: 'Harvey Cushing',
          def: 'Pioneering neurosurgeon who used magnets and local anaesthetic to perform brain surgery.',
        },
        {
          term: 'Carrel-Dakin',
          def: 'System flushing deep wounds continuously with sodium hypochlorite antiseptic solution.',
        },
        {
          term: 'Mobile X-Ray',
          def: 'Truck-mounted radiology unit locating buried shrapnel fragments directly at CCS units.',
        },
        {
          term: 'Blood Depot',
          def: 'Frontline facility storing pre-collected bottles of Universal Donor (Type O) blood on ice.',
        },
      ],
    },
  },
];
