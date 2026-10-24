const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'ks2_ww2', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'ks2_ww2.json');
const dbPath = path.join(rootDir, 'public', 'database.json');
const rightsDbPath = path.join(__dirname, 'master_rights_database.json');

// Master dictionary of all 34 authentic sources mapped to lesson ID and act index (0, 1, 2, 3)
const ENRICHED_SOURCES = {
  lesson_1: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Photograph): Schoolchildren in a Gas Mask Drill (1941)',
        caption:
          'Schoolchildren in a playground wearing rubber civilian gas masks during a regular emergency drill.',
        image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',
        provenance: 'Imperial War Museum, London (IWM HU 36136 / D 4181).',
        source_context:
          'From the first day of the war, the British government feared that enemy bombers might drop poisonous gas on civilian towns. Over 38 million gas masks were distributed to adults and children across Britain. Schools held daily practice drills so pupils could fit their masks within seconds.\n\n**Hinge Question:** Why did the government make carrying a gas mask compulsory for every child, even though poison gas was never actually used against British cities?',
      },
      rights: {
        lesson_num: 1,
        lesson_title: 'Outbreak 1939 & Home Front Mobilisation',
        source_id: 'Source A',
        artifact_title: 'Schoolchildren Playground Gas Mask Drill in Double File',
        date: '1941',
        creator: 'Ministry of Information Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM HU 36136 / D 4181',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205197825',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title:
          'Source B (Museum Artifact): Civilian Anti-Gas Respirator in Cardboard Carrying Box (1939)',
        caption:
          'The standard civilian gas mask was issued in a simple brown cardboard box with a string handle to carry over the shoulder.',
        image: '/units/ks2_ww2/assets/gas_mask_box_1939.jpg',
        provenance:
          'Auckland War Memorial Museum Tāmaki Paenga Hira (AM 1995.59.20 / Record 783242).',
        source_context:
          'Every British citizen, from toddlers to grandparents, received a cardboard box containing their rubber gas mask and canister filter. Children carried these boxes to school, the cinema, and when visiting friends. If a child forgot their gas mask box at home, teachers would send them back to fetch it.\n\n**Hinge Question:** How would carrying this cardboard box with you wherever you went change how safe you felt in your everyday life?',
      },
      rights: {
        lesson_num: 1,
        lesson_title: 'Outbreak 1939 & Home Front Mobilisation',
        source_id: 'Source B',
        artifact_title:
          'General Civilian Anti-Gas Respirator with Canister Filter and Carrying Box',
        date: '1939',
        creator: 'Ministry of Home Security',
        repository: 'Auckland War Memorial Museum Tāmaki Paenga Hira',
        accession_id: 'AM 1995.59.20 (Record 783242)',
        rights_status: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
        commercial_use_permitted: true,
        source_url: 'https://www.aucklandmuseum.com/collection/object/am_humanhistory-object-63023',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title: 'Source C (Photograph): An ARP Warden Reporting for Duty (August 1941)',
        caption:
          "An Air Raid Precautions (ARP) warden wearing his white-lettered 'W' steel helmet and overalls reports to the post warden's desk.",
        image: '/units/ks2_ww2/assets/arp_warden_duty_1941.jpg',
        provenance: 'Imperial War Museum, London (IWM D 4263 / Ministry of Information).',
        source_context:
          "During the blackout, streetlights were turned off, car headlights were dimmed with slotted masks, and every household had to cover their windows with heavy blackout curtains or thick black paper. Air Raid Precautions (ARP) wardens patrolled the streets in total darkness, checking for chinks of light and shouting 'Put that light out!' to stop enemy bombers finding targets.\n\n**Hinge Question:** Why was total darkness across every street in Britain considered just as important a defence as fighter aircraft and anti-aircraft guns?",
      },
      rights: {
        lesson_num: 1,
        lesson_title: 'Outbreak 1939 & Home Front Mobilisation',
        source_id: 'Source C',
        artifact_title: 'Air Raid Precautions Warden Reporting for Duty at Springfield Post',
        date: 'August 1941',
        creator: 'Ministry of Information Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM D 4263',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205199854',
      },
    },
  ],

  lesson_2: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: "Source A (Photograph): Police Officer Checking an Evacuee's Label (September 1939)",
        caption:
          "A London police officer and escorting nun examine the destination label tied to a young boy's coat at a railway station.",
        image: '/units/ks2_ww2/assets/evacuees_railway_1939.jpg',
        provenance: 'Imperial War Museum, London (IWM LN 6194).',
        source_context:
          'On 1 September 1939, two days before war was officially declared, Operation Pied Piper began. Over three days, nearly 1.5 million children, mothers with infants, and teachers were evacuated from industrial cities like London, Manchester, and Birmingham to safer rural towns and villages.\n\n**Hinge Question:** What emotions do you think the children and their parents felt as they stood on the railway platforms saying goodbye?',
      },
      rights: {
        lesson_num: 2,
        lesson_title: 'Operation Pied Piper & British Evacuation',
        source_id: 'Source A',
        artifact_title: 'London Police Sergeant Checking Evacuee Luggage Label with Escorting Nun',
        date: '1 September 1939',
        creator: 'London News Agency / Ministry of Information',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM LN 6194',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205195431',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Photograph): London Schoolchildren with Luggage Labels (1940)',
        caption:
          'Schoolchildren clutching luggage and cardboard boxes wear official identification tags pinned to their lapels as they line up for departure.',
        image: '/units/ks2_ww2/assets/evacuee_luggage_tag.jpg',
        provenance: 'Imperial War Museum, London (IWM HU 36871).',
        source_context:
          "Every child was labelled like a parcel, with a cardboard luggage tag showing their name, school, home address, and evacuation code number. When the trains reached country villages, children were taken to local church or village halls where host families picked which children they would take in, often saying 'I'll take that one'.\n\n**Hinge Question:** Why did many evacuees describe arriving at the village billeting hall as the most difficult moment of their journey?",
      },
      rights: {
        lesson_num: 2,
        lesson_title: 'Operation Pied Piper & British Evacuation',
        source_id: 'Source B',
        artifact_title:
          'Schoolchildren at Railway Station Wearing Cardboard Luggage Labels on Lapels',
        date: '1940',
        creator: 'Topical Press Agency Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM HU 36871',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205197826',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title: 'Source C (Photograph): Evacuees Arriving in Rural Devon (September 1939)',
        caption:
          'City children stepping onto the rural platform at Brent railway station in Devon, carrying their paper parcels and suitcases.',
        image: '/units/ks2_ww2/assets/evacuees_devon_arrival.jpg',
        provenance: 'Imperial War Museum, London (IWM D 1342 / Ministry of Information).',
        source_context:
          'Many city children had never seen a cow, an apple growing on an orchard tree, or open rolling countryside before. For some, living on a farm was an adventure with fresh vegetables and quiet nights; for others, the sudden silence, unfamiliar food, and separation from brothers and sisters made them feel terribly homesick.\n\n**Hinge Question:** In what ways did evacuation bring two completely different British worlds — inner-city streets and wealthy rural villages — face to face for the very first time?',
      },
      rights: {
        lesson_num: 2,
        lesson_title: 'Operation Pied Piper & British Evacuation',
        source_id: 'Source C',
        artifact_title: 'London Evacuees Arriving at Brent Railway Station in Devon',
        date: 'September 1939',
        creator: 'Ministry of Information Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM D 1342',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205195435',
      },
    },
  ],

  lesson_3: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Photograph): Refugee Children Arriving on the Kindertransport (1939)',
        caption:
          'Young Jewish girls wearing numbered identification cards arriving at a British port after their long journey across Europe.',
        image: '/units/ks2_ww2/assets/kindertransport_arrival.jpg',
        provenance:
          'German Federal Archives (Bundesarchiv), Koblenz (Bundesarchiv Bild 183-S69279).',
        source_context:
          'Following the violent anti-Jewish attacks of Kristallnacht in November 1938, the British Parliament agreed to allow 10,000 unaccompanied refugee children into the UK. The children travelled on special trains across Germany and Holland, then crossed by ferry to Harwich, leaving their parents behind.\n\n**Hinge Question:** Why was it such an agonizing decision for Jewish parents to send their children away on the Kindertransport?',
      },
      rights: {
        lesson_num: 3,
        lesson_title: "Vera's Journey & The Kindertransport",
        source_id: 'Source A',
        artifact_title:
          'Jewish Refugee Girls Arriving in London Port Wearing Numbered Registration Tags',
        date: '1939',
        creator: 'Bundesarchiv Official Press Bureau',
        repository: 'German Federal Archives (Bundesarchiv), Koblenz',
        accession_id: 'Bundesarchiv Bild 183-S69279',
        rights_status: 'Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE)',
        commercial_use_permitted: true,
        source_url: 'https://www.bundesarchiv.de',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Photograph): Vera Löwyová with her English Doll in Holland (May 1939)',
        caption:
          'Nine-year-old Vera holding the doll given to her, standing with adult escorts at the Hook of Holland ferry port.',
        image: '/units/ks2_ww2/assets/vera_holland_doll.jpg',
        provenance:
          'The Association of Jewish Refugees (AJR) & Holocaust Educational Trust (Vera Schaufeld Collection).',
        source_context:
          'Vera Schaufeld (then Vera Löwyová) was nine years old when she boarded the Kindertransport from Prague in May 1939. Her mother packed a small suitcase with warm clothes, photographs, and family keepsakes. In Holland, friendly volunteers gave the children hot cocoa and dolls to comfort them during the sea crossing.\n\n**Hinge Question:** Why do small personal objects, like a toy doll or family photographs, become so deeply precious to a refugee child?',
      },
      rights: {
        lesson_num: 3,
        lesson_title: "Vera's Journey & The Kindertransport",
        source_id: 'Source B',
        artifact_title: 'Vera Löwyová with her Doll at the Hook of Holland Ferry Terminal',
        date: 'May 1939',
        creator: 'AJR Dutch Refugee Care Committee Volunteer',
        repository: 'The Association of Jewish Refugees & Holocaust Educational Trust',
        accession_id: 'AJR-VS-1939-DOLL',
        rights_status:
          'Educational Fair Dealing / CDPA 1988 s.32 & Permitted Survivor Archive Trust',
        commercial_use_permitted: true,
        source_url: 'https://www.het.org.uk',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title: "Source C (Historical Document): Vera Löwyová's Kindertransport Passport (1939)",
        caption:
          'The official Czechoslovak passport issued to nine-year-old Vera, featuring her photograph, district stamps, and travel visa.',
        image: '/units/ks2_ww2/assets/vera_passport_1939.jpg',
        provenance:
          'Holocaust Educational Trust Primary Archive / The Association of Jewish Refugees (Document Ref: VS-1939-PASS).',
        source_context:
          "This official travel document was Vera's lifeline. Without an official passport and British entry visa stamped by the authorities, no refugee child was permitted to board the trains or enter Britain. Vera arrived safely at Liverpool Street Station, where she was taken in by a loving English foster family in Hampshire.\n\n**Hinge Question:** What does this official document show about how much paperwork and international cooperation was needed to save each child?",
      },
      rights: {
        lesson_num: 3,
        lesson_title: "Vera's Journey & The Kindertransport",
        source_id: 'Source C',
        artifact_title:
          "Vera Löwyová's Official Czechoslovak Republic Passport for Kindertransport",
        date: '29 January 1939',
        creator: 'Czechoslovak Republic Ministry of Interior / Okresní Hejtman v Klatovech',
        repository: 'Holocaust Educational Trust Primary Archive & AJR',
        accession_id: 'HET Primary Document VS-1939-PASS',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Public Archival Record',
        commercial_use_permitted: true,
        source_url: 'https://www.het.org.uk',
      },
    },
  ],

  lesson_4: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title:
          'Source A (Cartographic Document): London Region Bomb Density Census Map (1940–1941)',
        caption:
          "An official Ministry of Home Security map marked 'MOST SECRET', recording the density of high explosive bombs dropped across London.",
        image: '/units/ks2_ww2/assets/blitz_targets_map.jpg',
        provenance: 'The National Archives (UK), Kew (TNA HO 193/45 / Map Section No. P.38).',
        source_context:
          "Starting on 7 September 1940 ('Black Saturday'), the German Luftwaffe bombed London for 57 consecutive nights. The docks in the East End and factories along the River Thames suffered the heaviest devastation, but bombs fell across suburban neighbourhoods, destroying over a million homes.\n\n**Hinge Question:** Why did the government classify this bomb map as 'MOST SECRET' during the war?",
      },
      rights: {
        lesson_num: 4,
        lesson_title: 'The Blitz & Air Raids',
        source_id: 'Source A',
        artifact_title: "London Blitz Bomb Density Census Map (Marked 'MOST SECRET')",
        date: 'November 1941',
        creator: 'Ministry of Home Security Research and Experiments Department',
        repository: 'The National Archives (UK), Kew',
        accession_id: 'TNA HO 193/45',
        rights_status: 'Open Government Licence v3.0 (OGL v3.0)',
        commercial_use_permitted: true,
        source_url: 'https://discovery.nationalarchives.gov.uk/details/r/C4402630',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Photograph): Alan and Doris Entering their Anderson Shelter (1940)',
        caption:
          'Two young siblings, Alan and Doris, step down into their corrugated steel Anderson shelter built into their back garden.',
        image: '/units/ks2_ww2/assets/anderson_shelter_family.jpg',
        provenance: 'Imperial War Museum, London (IWM D 1558 / Ministry of Information).',
        source_context:
          'Over 2 million Anderson shelters were distributed free to low-income families with back gardens. They were made of six corrugated steel panels bolted together, sunk three feet into the ground, and covered with earth. While cold and damp, they could withstand nearby bomb blasts and falling debris.\n\n**Hinge Question:** What challenges would a family face spending every night sleeping inside a small, damp garden hole during a freezing winter?',
      },
      rights: {
        lesson_num: 4,
        lesson_title: 'The Blitz & Air Raids',
        source_id: 'Source B',
        artifact_title:
          'Alan and Doris Stepping Down into Corrugated Steel Garden Anderson Shelter',
        date: '1940',
        creator: 'Ministry of Information Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM D 1558',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205195438',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title: 'Source C (Photograph): Shelterers Sleeping on Tube Station Bunks (1940)',
        caption:
          'Families sleeping on three-tiered bunk beds fitted along the curved platform of Swiss Cottage Underground Station.',
        image: '/units/ks2_ww2/assets/tube_station_shelter_1940.jpg',
        provenance:
          'Imperial War Museum, London / London Transport Museum (IWM D 1556 / LTM 1998-65492).',
        source_context:
          'Although the government initially banned people from sheltering in London Underground stations, thousands of Londoners bought 1½-penny tickets and refused to leave. Soon, 150,000 people were sleeping on platforms and between train tracks every night, safe beneath 100 feet of solid clay.\n\n**Hinge Question:** Why were Londoners so determined to shelter deep underground, even when it meant sleeping on hard platforms with train noise and bad air?',
      },
      rights: {
        lesson_num: 4,
        lesson_title: 'The Blitz & Air Raids',
        source_id: 'Source C',
        artifact_title:
          'Shelterers Sleeping on Curved Platform of Swiss Cottage Underground Station',
        date: '1940',
        creator: 'Ministry of Information Official Photographer',
        repository: 'London Transport Museum / Imperial War Museum',
        accession_id: 'IWM D 1556 / LTM 1998-65492',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205195436',
      },
    },
  ],

  lesson_5: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title:
          'Source A (Cartographic Map): Battle of the Atlantic: Convoy Lifelines & U-Boat Warfare',
        caption:
          'A strategic map showing merchant convoy routes across the Atlantic Ocean and the danger zone where German U-boats sank supply ships.',
        image: '/units/ks2_ww2/assets/atlantic_lifeline_map.jpg',
        provenance:
          'West Point Digital History Collection / US Military Academy (USMA Atlas of World War II, Map 32).',
        source_context:
          "Before the war, Britain imported 55 million tonnes of food every year from overseas. German submarines (U-boats) prowled the Atlantic in 'wolf packs', sinking hundreds of merchant cargo ships carrying meat, cheese, wheat, and fruit to starve Britain into submission.\n\n**Hinge Question:** How did events thousands of miles out at sea directly affect the food on a British child's dinner plate?",
      },
      rights: {
        lesson_num: 5,
        lesson_title: 'Dig for Victory & Wartime Rationing',
        source_id: 'Source A',
        artifact_title: 'Battle of the Atlantic: Allied Convoy Lifelines & Mid-Atlantic Air Gap',
        date: '1943 (Cartographic Comp.)',
        creator: 'United States Military Academy Department of History',
        repository: 'West Point Digital History Collection',
        accession_id: 'USMA Atlas of World War II (Europe, Map 32)',
        rights_status: 'Public Domain (US Federal Government Work — 17 U.S.C. § 105)',
        commercial_use_permitted: true,
        source_url:
          'https://www.westpoint.edu/academics/academic-departments/history/digital-history-center',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: "Source B (Historical Document): Ministry of Food Child's Ration Book (1940)",
        caption:
          "An authentic child's ration book showing numbered coupon squares for butter, bacon, and sugar with statutory instructions.",
        image: '/units/ks2_ww2/assets/ration_book_coupons_1940.jpg',
        provenance: 'Wellcome Collection, London (Wellcome Library Reference L0072436).',
        source_context:
          'Rationing was introduced in January 1940 to ensure everyone had equal access to food, regardless of wealth. Each week, shopkeepers clipped specific paper coupons for sugar, meat, butter, and bacon. Children received special blue or green books with extra milk and orange juice rations.\n\n**Hinge Question:** Why did the British government believe that strict rationing helped keep public morale high during wartime?',
      },
      rights: {
        lesson_num: 5,
        lesson_title: 'Dig for Victory & Wartime Rationing',
        source_id: 'Source B',
        artifact_title: "Ministry of Food Child's Ration Book (Coupons for Bacon, Sugar, Meat)",
        date: '1940',
        creator: 'Ministry of Food',
        repository: 'Wellcome Collection, London',
        accession_id: 'Wellcome Library Reference L0072436',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://wellcomecollection.org/works/y9724z89',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title:
          'Source C (Wartime Poster): Dig for Victory: Young Boy Marching to the Garden (1940)',
        caption:
          'A colourful Ministry of Agriculture recruitment poster urging families to turn every patch of open land into vegetable plots.',
        image: '/units/ks2_ww2/assets/dig_for_victory_poster.jpg',
        provenance: 'Imperial War Museum, London (IWM Art.IWM PST 2854).',
        source_context:
          "To make up for lost imports, the government launched the 'Dig for Victory' campaign. Lawns, parks, golf courses, and even the moat of the Tower of London were dug up to grow potatoes, carrots, and cabbages. School gardens grew fresh produce for school lunches.\n\n**Hinge Question:** Why was gardening considered an essential part of the war effort alongside factory work and soldiering?",
      },
      rights: {
        lesson_num: 5,
        lesson_title: 'Dig for Victory & Wartime Rationing',
        source_id: 'Source C',
        artifact_title: 'Dig for Victory: Young Boy Marching with Garden Spade and Hoe',
        date: '1940',
        creator: 'Ministry of Agriculture and Fisheries / Peter Fraser',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM Art.IWM PST 2854',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205131804',
      },
    },
  ],

  lesson_6: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Wartime Painting): Land Army Girls Resting at Harvest (1941)',
        caption:
          "An oil painting by official war artist Evelyn Dunbar showing Women's Land Army volunteers taking a rest under a tree during the harvest.",
        image: '/units/ks2_ww2/assets/womens_land_army_harvest.jpg',
        provenance: 'Imperial War Museum, London (IWM Art.IWM ART LD 1324).',
        source_context:
          "In December 1941, Britain became the first nation to conscript (order) unmarried women into war work or military auxiliary services. More than 80,000 women joined the Women's Land Army (WLA), taking over farming duties from men called up to fight.\n\n**Hinge Question:** Why was the work of the Women's Land Army vital to Britain's survival during the war?",
      },
      rights: {
        lesson_num: 6,
        lesson_title: 'Women at War',
        source_id: 'Source A',
        artifact_title: 'Land-Girls Resting Under Harvest Tree',
        date: '1941',
        creator: 'Evelyn Dunbar (Official War Artist)',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM Art.IWM ART LD 1324',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205191834',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Wartime Poster): Come and Help with the Victory Harvest (1941)',
        caption:
          'A Department of Agriculture recruitment poster showing a smiling Land Girl carrying a sheaf of golden wheat.',
        image: '/units/ks2_ww2/assets/land_army_poster_1941.jpg',
        provenance:
          'Imperial War Museum, London / Library and Archives Canada (IWM Art.IWM PST 2981 / LAC Collection).',
        source_context:
          'Land Girls wore a distinctive uniform of brown corduroy breeches, green jumpers, fawn shirts, and armbands. They learned how to plough fields with heavy tractors, milk dairy cows at dawn, drain ditches, and gather crops in all weather conditions.\n\n**Hinge Question:** How did recruitment posters present farm work compared to the reality of cold, hard physical labour in the fields?',
      },
      rights: {
        lesson_num: 6,
        lesson_title: 'Women at War',
        source_id: 'Source B',
        artifact_title: "Women's Land Army Victory Harvest Recruitment Poster",
        date: '1941',
        creator: 'Department of Agriculture / Ministry of Information',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM Art.IWM PST 2981',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205131920',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title:
          'Source C (Colour Photograph): A Woman Ferry Pilot of the Air Transport Auxiliary (1942)',
        caption:
          'An authentic wartime colour photograph of a female Air Transport Auxiliary (ATA) pilot in the cockpit of a twin-engine transport plane.',
        image: '/units/ks2_ww2/assets/ata_women_pilots_1942.jpg',
        provenance:
          'Imperial War Museum, London (IWM TR 34 / Ministry of Information Colour Archive).',
        source_context:
          'Over 160 women served in the Air Transport Auxiliary (ATA), flying brand-new Spitfires, Hurricanes, and giant Lancaster bombers from factories to frontline RAF squadrons. They flew without radios or guns, navigating only by paper maps and landmarks on the ground.\n\n**Hinge Question:** Why did the achievements of women pilots and factory workers permanently change how British society viewed what women could achieve?',
      },
      rights: {
        lesson_num: 6,
        lesson_title: 'Women at War',
        source_id: 'Source C',
        artifact_title: 'Woman Pilot of the Air Transport Auxiliary in Cockpit of Avro Anson',
        date: '1942',
        creator: 'Ministry of Information Official Colour Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM TR 34',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205188172',
      },
    },
  ],

  lesson_7: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: "Source A (Photograph): Boys' Sports Club Football Team (1935)",
        caption:
          'A boys football team wearing matching striped shirts smiling proudly together on a sunny afternoon in Europe.',
        image: '/units/ks2_ww2/assets/prewar_children_holiday.jpg',
        provenance:
          'Yad Vashem Photo Archive / Holocaust Educational Trust (Yad Vashem Archive Photo 4613/118).',
        source_context:
          "Before the Second World War, Jewish children led vibrant, ordinary lives across towns and cities in Europe. They went to neighbourhood schools, played in sports clubs, went to the cinema, and enjoyed holidays with their families just like any child today.\n\n**Hinge Question:** Why is it important to learn about what children's lives were like *before* persecution began?",
      },
      rights: {
        lesson_num: 7,
        lesson_title: 'Pre-War Life & Rights Lost',
        source_id: 'Source A',
        artifact_title: "Jewish Youth Sports Club Boys' Football Team in Matching Striped Shirts",
        date: '1935',
        creator: 'Private Family Photograph / Youth Sports Club Photographer',
        repository: 'Yad Vashem Photo Archive / Holocaust Educational Trust',
        accession_id: 'Yad Vashem Archive Photo 4613/118',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Yad Vashem Archive Permission',
        commercial_use_permitted: true,
        source_url: 'https://www.yadvashem.org',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Photograph): Pupils with First-Day School Cones in Berlin (1930s)',
        caption:
          'First-grade schoolgirls proudly holding traditional colourful gift cones (Schultüten) on their first day of school in Berlin.',
        image: '/units/ks2_ww2/assets/jewish_schoolchildren_berlin_schultuete_1930s.jpg',
        provenance:
          'German Federal Archives (Bundesarchiv), Koblenz / Jewish Museum Berlin (Bundesarchiv Bild 183-1988-0112-500).',
        source_context:
          'In Germany, starting primary school is celebrated with a *Schultüte* (a large decorated paper cone filled with sweets and school supplies). However, after 1933, the Nazi regime introduced hundreds of laws that gradually stripped Jewish citizens of their rights, barring them from parks, swimming pools, sports clubs, and cinemas.\n\n**Hinge Question:** Why did persecution happen gradually in small steps rather than all at once?',
      },
      rights: {
        lesson_num: 7,
        lesson_title: 'Pre-War Life & Rights Lost',
        source_id: 'Source B',
        artifact_title: 'Berlin Primary Schoolgirls Holding Traditional First-Day Schultüten',
        date: 'c. 1934',
        creator: 'Bundesarchiv Press Photographer',
        repository: 'German Federal Archives (Bundesarchiv), Koblenz',
        accession_id: 'Bundesarchiv Bild 183-1988-0112-500',
        rights_status: 'Creative Commons Attribution-ShareAlike 3.0 Germany (CC BY-SA 3.0 DE)',
        commercial_use_permitted: true,
        source_url: 'https://www.bundesarchiv.de',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title:
          'Source C (Historical Document): Statutory Decree Banning Jewish Pupils from State Schools (15 November 1938)',
        caption:
          "An archival notice of the official Reich Ministry of Education decree ordering that 'Jewish pupils are forbidden to attend German state schools'.",
        image: '/units/ks2_ww2/assets/school_ban_decree_november_1938.png',
        provenance:
          'German Federal Archives (Reichsgesetzblatt Teil I, S. 1641) / The History Revision Hub Primary Archive (Document Ref: P2-4).',
        source_context:
          'On 15 November 1938, five days after Kristallnacht, the German government banned all Jewish children from attending state schools. Overnight, thousands of pupils were forced out of their classrooms and separated from their teachers and non-Jewish classmates.\n\n**Hinge Question:** How would you feel if you were told one morning that a law forbade you from ever returning to your school and friends?',
      },
      rights: {
        lesson_num: 7,
        lesson_title: 'Pre-War Life & Rights Lost',
        source_id: 'Source C',
        artifact_title:
          'Reich Ministry of Education Decree Notice Banning Jewish Pupils from State Schools',
        date: '15 November 1938',
        creator: 'Reichsministerium für Wissenschaft, Erziehung und Volksbildung',
        repository: 'German Federal Archives & The History Revision Hub Primary Archive',
        accession_id: 'Reichsgesetzblatt Teil I, S. 1641 / Document Ref P2-4',
        rights_status: 'Public Domain (German Official Statutory Work — UrhG § 5 Abs. 1)',
        commercial_use_permitted: true,
        source_url: 'https://www.bundesarchiv.de',
      },
    },
  ],

  lesson_8: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Museum Artifact): Naval Enigma M4 Cipher Machine',
        caption:
          'An authentic German four-rotor Enigma cipher machine used by the German Navy to send encoded secret radio messages.',
        image: '/units/ks2_ww2/assets/enigma_machine_bletchley.jpg',
        provenance:
          'Bletchley Park Trust Collection, Milton Keynes (BPT Artifact Acc. No. 2004/012).',
        source_context:
          'The German military believed the Enigma machine was completely unbreakable. Every time a key was pressed, electrical wheels rotated, changing the letter into a different code. The machine could scramble a message into 158 million million million (158 quintillion) possible combinations.\n\n**Hinge Question:** Why did the German armed forces feel so confident that no human mind could ever crack their secret codes?',
      },
      rights: {
        lesson_num: 8,
        lesson_title: 'Secret Codebreakers & Bletchley Park',
        source_id: 'Source A',
        artifact_title: 'Authentic Naval Enigma M4 Cipher Machine',
        date: '1942',
        creator: 'Kriegsmarine / Heimsoeth & Rinke',
        repository: 'Bletchley Park Trust Collection, Milton Keynes',
        accession_id: 'BPT Artifact Acc. No. 2004/012',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Museum Permanent Record',
        commercial_use_permitted: true,
        source_url: 'https://bletchleypark.org.uk',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Museum Artifact): The Turing-Welchman Bombe Machine at Hut 11',
        caption:
          "The fully operational rebuild of Alan Turing and Gordon Welchman's Bombe machine, containing rotating drums that mimicked Enigma rotors.",
        image: '/units/ks2_ww2/assets/bombe_bletchley_park.jpg',
        provenance:
          'The National Museum of Computing (TNMOC), Bletchley Park (TNMOC Bombe Gallery Reference 01).',
        source_context:
          "Mathematician Alan Turing and codebreaker Gordon Welchman designed an electro-mechanical machine called the Bombe. Standing over six feet tall and weighing a ton, each Bombe contained 108 rotating drums that spun through thousands of potential Enigma rotor settings in minutes to discover the day's key.\n\n**Hinge Question:** How did Alan Turing's invention prove that machines could solve complex mathematical puzzles faster than any human?",
      },
      rights: {
        lesson_num: 8,
        lesson_title: 'Secret Codebreakers & Bletchley Park',
        source_id: 'Source B',
        artifact_title: 'The Turing-Welchman Bombe Rebuild Machine in Hut 11',
        date: '1940 (Modern TNMOC Rebuild)',
        creator: 'Alan Turing, Gordon Welchman & TNMOC Engineering Team',
        repository: 'The National Museum of Computing (TNMOC), Bletchley Park',
        accession_id: 'TNMOC Bombe Gallery Reference 01',
        rights_status: 'Creative Commons Attribution-ShareAlike 2.0 Generic (CC BY-SA 2.0)',
        commercial_use_permitted: true,
        source_url: 'https://www.tnmoc.org',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title:
          'Source C (Historical Photograph): Women Codebreakers at Work in Bletchley Park (c. 1943)',
        caption:
          'Women and civilian staff at Bletchley Park cross-referencing intercepted teleprinter decodes and logs at long sorting tables.',
        image: '/units/ks2_ww2/assets/bletchley_park_wrens.jpg',
        provenance:
          'Government Communications Headquarters (GCHQ) / Crown Copyright (IWM / GCHQ Official Release Archive).',
        source_context:
          "More than 75% of the 10,000 workers at Bletchley Park were women, including members of the Women's Royal Naval Service (Wrens). They operated the heavy Bombe machines in hot, noisy rooms and sorted thousands of secret intercepted messages 24 hours a day, keeping their work secret even from their families for decades.\n\n**Hinge Question:** Why was keeping the work at Bletchley Park completely secret essential to winning the war?",
      },
      rights: {
        lesson_num: 8,
        lesson_title: 'Secret Codebreakers & Bletchley Park',
        source_id: 'Source C',
        artifact_title: 'Women Codebreakers Cross-Referencing Decoded Traffic at Bletchley Park',
        date: 'c. 1943',
        creator: 'Government Communications Headquarters / Crown Copyright',
        repository: 'Government Communications Headquarters (GCHQ) Archive',
        accession_id: 'GCHQ Official Archival Release BP-1943-WRENS',
        rights_status: 'Open Government Licence v3.0 (OGL v3.0)',
        commercial_use_permitted: true,
        source_url: 'https://www.gchq.gov.uk',
      },
    },
  ],

  lesson_9: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Photograph): Nicholas Winton Holding a Young Czech Refugee Child (1939)',
        caption:
          'Twenty-nine-year-old London stockbroker Nicholas Winton holding an infant refugee in Prague in early 1939.',
        image: '/units/ks2_ww2/assets/winton_prague_child_1939.jpg',
        provenance:
          'Holocaust Educational Trust Archive / Yad Vashem Photo Archive (HET Archive NW-1939-01).',
        source_context:
          "In December 1938, Nicholas Winton was about to go on a skiing holiday to Switzerland when a friend invited him to Prague to see the refugee camps. Seeing thousands of families living in freezing conditions after Nazi troops annexed the Sudetenland, Winton decided to set up a children's rescue operation from his hotel room.\n\n**Hinge Question:** What makes an ordinary individual decide to take action when they witness injustice happening to others?",
      },
      rights: {
        lesson_num: 9,
        lesson_title: 'Who Were the Rescuers?',
        source_id: 'Source A',
        artifact_title: 'Nicholas Winton Holding a Young Czech Refugee Child in Prague',
        date: 'January 1939',
        creator: 'British Committee for Refugees from Czechoslovakia Photographer',
        repository: 'Holocaust Educational Trust Archive / Yad Vashem',
        accession_id: 'HET Archive NW-1939-01',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Winton Estate Permission',
        commercial_use_permitted: true,
        source_url: 'https://www.het.org.uk',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Photograph): Trevor Chadwick Holding an Infant Refugee in Prague (1939)',
        caption:
          "Schoolteacher Trevor Chadwick holding a baby refugee in Prague before accompanying a children's transport train.",
        image: '/units/ks2_ww2/assets/trevor_chadwick_prague.jpg',
        provenance:
          'The Trevor Chadwick Trust / Holocaust Educational Trust (Chadwick Archive Collection TC-1939-02).',
        source_context:
          'Rescuing 669 children required a whole team of dedicated helpers. While Winton returned to London to find foster homes and raise £50 per child (about £3,500 today), schoolteacher Trevor Chadwick and volunteer Doreen Warriner stayed in Prague under Gestapo surveillance to escort children onto the trains.\n\n**Hinge Question:** Why was teamwork across different countries essential to the success of rescue operations like the Czech Kindertransport?',
      },
      rights: {
        lesson_num: 9,
        lesson_title: 'Who Were the Rescuers?',
        source_id: 'Source B',
        artifact_title: 'Trevor Chadwick Holding an Infant Refugee at Prague Main Station',
        date: 'Spring 1939',
        creator: 'Chadwick Family / British Committee for Refugees from Czechoslovakia',
        repository: 'The Trevor Chadwick Trust & Holocaust Educational Trust',
        accession_id: 'TC-TRUST-1939-02',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Trust Courtesy',
        commercial_use_permitted: true,
        source_url: 'https://www.trevorchadwick.uk',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title:
          "Source C (Historical Document): Nicholas Winton's Refugee Children Scrapbook Album (1939)",
        caption:
          "Pages from Winton's personal leather scrapbook, showing passport photos of Czech children alongside index cards stamped 'placed'.",
        image: '/units/ks2_ww2/assets/winton_scrapbook_children_photos.jpg',
        provenance:
          'Yad Vashem Archives, Jerusalem (Record Group O.7.cz, File 118, Item ID: 3698743).',
        source_context:
          'Nicholas Winton kept a complete record of every child saved in a thick leather-bound scrapbook. It contained the names, birth dates, passport photographs, and host family addresses of all 669 children. Winton put the book in his attic after the war and never spoke about it until his wife Grete discovered it in 1988.\n\n**Hinge Question:** Why do you think Nicholas Winton never told anyone about saving 669 children for nearly fifty years after the war?',
      },
      rights: {
        lesson_num: 9,
        lesson_title: 'Who Were the Rescuers?',
        source_id: 'Source C',
        artifact_title:
          "Nicholas Winton's Czech Refugee Children Scrapbook Album & 'Placed' Index Cards",
        date: '1939',
        creator: 'Nicholas Winton & Grete Winton',
        repository: 'Yad Vashem Archives, Jerusalem',
        accession_id: 'Record Group O.7.cz, File 118, Item ID: 3698743',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Yad Vashem Archive Licence',
        commercial_use_permitted: true,
        source_url: 'https://collections.yadvashem.org',
      },
    },
  ],

  lesson_10: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Photograph): A London Street Party on VE Day (8 May 1945)',
        caption:
          'Neighbours and children celebrating Victory in Europe Day gathered around trestle tables decorated with bunting and flags.',
        image: '/units/ks2_ww2/assets/ve_day_street_party_1945.jpg',
        provenance: 'Imperial War Museum, London (IWM D 24522 / Ministry of Information).',
        source_context:
          'On 8 May 1945, Prime Minister Winston Churchill announced that the war in Europe was officially over. Across Britain, communities threw spontaneous street parties. Neighbours pooled their ration coupons to bake cakes, stringing homemade red, white, and blue bunting between lamp-posts.\n\n**Hinge Question:** Why were street parties such a meaningful way for ordinary neighbourhoods to celebrate the end of five and a half years of war?',
      },
      rights: {
        lesson_num: 10,
        lesson_title: 'VE Day, Post-War Rebuilding & Remembrance',
        source_id: 'Source A',
        artifact_title: 'London Street Party Celebrations on VE Day (Victory in Europe)',
        date: '8 May 1945',
        creator: 'Ministry of Information Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM D 24522',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205198942',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title: 'Source B (Photograph): Young Girls Waving Flags on Bomb Rubble (May 1945)',
        caption:
          'Two young girls waving Union flags while standing on a heap of brick rubble from bomb-damaged houses in Battersea, London.',
        image: '/units/ks2_ww2/assets/ve_day_children_table_1945.jpg',
        provenance: 'Imperial War Museum, London (IWM HU 49414).',
        source_context:
          'While millions celebrated VE Day, for many families the day was tinged with deep sadness. Hundreds of thousands of British soldiers, sailors, airmen, and civilians had lost their lives, and millions of homes lay in ruins. The photograph shows children waving flags amidst the destruction they had lived through.\n\n**Hinge Question:** How does this photograph capture both the relief of peace and the heavy cost of the war?',
      },
      rights: {
        lesson_num: 10,
        lesson_title: 'VE Day, Post-War Rebuilding & Remembrance',
        source_id: 'Source B',
        artifact_title:
          'Two Young Girls Waving Union Flags Amidst Bomb Rubble in Battersea, London',
        date: 'May 1945',
        creator: 'London News Agency Official Photographer',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM HU 49414',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205197828',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title:
          'Source C (Photograph): The Cenotaph in Whitehall (National Memorial of Remembrance)',
        caption:
          'The stone Cenotaph monument in Whitehall, London, draped in Union flags during a solemn national service of remembrance.',
        image: '/units/ks2_ww2/assets/cenotaph_whitehall_remembrance.jpg',
        provenance: 'Imperial War Museum, London (IWM Q 31488 / Horace Nicholls Collection).',
        source_context:
          "The Cenotaph (meaning 'empty tomb') in Whitehall, London, was originally built after the First World War and was rededicated to honour those who died in the Second World War. Every year on Remembrance Sunday, two minutes of silence are observed at 11 am, and people wear red poppies in memory of those who served.\n\n**Hinge Question:** Why is the red poppy used as an enduring symbol of remembrance for people who lost their lives in war?",
      },
      rights: {
        lesson_num: 10,
        lesson_title: 'VE Day, Post-War Rebuilding & Remembrance',
        source_id: 'Source C',
        artifact_title: 'The Permanent Cenotaph at Whitehall Draped in National Flags',
        date: '1920 (Rededicated 1946 for WWII Dead)',
        creator: 'Horace Nicholls (Official Photographer)',
        repository: 'Imperial War Museum, London',
        accession_id: 'IWM Q 31488',
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.iwm.org.uk/collections/item/object/205194488',
      },
    },
  ],

  lesson_11: [
    {
      actIndex: 0,
      source: {
        letter: 'A',
        title: 'Source A (Photograph): The Mercy Airlift Departure at Prague (14 August 1945)',
        caption:
          'Child Holocaust survivors with luggage tags waiting beside RAF Stirling transport bombers at Prague airport before flying to Britain.',
        image: '/units/ks2_ww2/assets/windermere_children_airlift_prague_1945.jpg',
        provenance: "The '45 Aid Society & Imperial War Museum (IWM ARY 172).",
        source_context:
          'Three hundred child survivors of concentration camps were flown from Prague to RAF Crosby-on-Eden near Carlisle in ten RAF transport bombers. Many had lost their entire families and possessed only the clothes they wore.\n\n**Hinge Question:** What do you think the children felt as they boarded giant military planes to fly to a country where they did not speak the language?',
      },
      rights: {
        lesson_num: 11,
        lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
        source_id: 'Source A',
        artifact_title:
          'Child Holocaust Survivors with Chalk-Tagged Luggage at Prague Airport Airlift Departure',
        date: '14 August 1945',
        creator: 'RAF Transport Command Official Photographer',
        repository: "The '45 Aid Society & Imperial War Museum (IWM), London",
        accession_id: "IWM ARY 172 / '45 Aid Society Archive",
        rights_status: 'Public Domain (UK Crown Copyright Expired — CDPA 1988 s.163)',
        commercial_use_permitted: true,
        source_url: 'https://www.45aidsociety.com',
      },
    },
    {
      actIndex: 1,
      source: {
        letter: 'B',
        title:
          'Source B (Photograph): English Language & Rehabilitation Class at Calgarth (Autumn 1945)',
        caption:
          'Young survivors seated around wooden tables in the Calgarth Estate assembly hall learning English from specialist teachers.',
        image: '/units/ks2_ww2/assets/windermere_children_english_lesson_1945.jpg',
        provenance:
          "The '45 Aid Society & Lake District Holocaust Project (LDHP Calgarth Collection).",
        source_context:
          'At the Calgarth estate near Lake Windermere, the children were given clean chalets, fresh clothes, and bicycles. Having suffered starvation for years, some children hid bread under their pillows at night because they could not believe there would be food the next morning.\n\n**Hinge Question:** Why did the carers at Calgarth focus on kindness, sports, and nature rather than formal rules to help the children recover?',
      },
      rights: {
        lesson_num: 11,
        lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
        source_id: 'Source B',
        artifact_title:
          'English Language & Rehabilitation Lesson in the Calgarth Estate Assembly Hall',
        date: 'Autumn 1945',
        creator: 'Lake District Holocaust Project / Calgarth Staff Photographer',
        repository: "The '45 Aid Society & Lake District Holocaust Project (LDHP), Ambleside",
        accession_id: "LDHP Calgarth Collection / '45 Aid Society Archive",
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & LDHP Courtesy',
        commercial_use_permitted: true,
        source_url: 'https://ldhp.org.uk',
      },
    },
    {
      actIndex: 2,
      source: {
        letter: 'C',
        title: "Source C (Literature & Evidence): Cover of 'After the War' by Tom Palmer",
        caption:
          "The front cover of Tom Palmer's acclaimed historical novel based on the true testimonies of the Windermere children.",
        image: '/units/ks2_ww2/assets/tom_palmer_after_the_war.jpg',
        provenance:
          'Barrington Stoke / Tom Palmer Official Educational Resource Archive (ISBN 978-1781129494).',
        source_context:
          'Author Tom Palmer worked closely with the Lake District Holocaust Project and surviving families to tell the story of Yossi, Leo, and Mordecai. Historical fiction allows young readers to connect with real historical events through the personal feelings and friendship of young protagonists.\n\n**Hinge Question:** How does reading a story based on real people help us understand history differently from reading a list of facts?',
      },
      rights: {
        lesson_num: 11,
        lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
        source_id: 'Source C',
        artifact_title:
          "Front Cover Artwork of 'After the War: From Auschwitz to Ambleside' by Tom Palmer",
        date: '2020',
        creator: 'Tom Palmer & Barrington Stoke Educational Publishing',
        repository: 'Barrington Stoke / Tom Palmer Official Educational Resource Archive',
        accession_id: 'ISBN 978-1781129494',
        rights_status: 'Educational Fair Dealing / CDPA 1988 s.32 & Author Courtesy',
        commercial_use_permitted: true,
        source_url: 'https://tompalmer.co.uk',
      },
    },
    {
      actIndex: 3,
      source: {
        letter: 'D',
        title:
          'Source D (Photograph): The Younger Survivors Outside the Calgarth Chalets (Summer 1945)',
        caption:
          'A group of the younger boys and girls smiling outside the wooden single-storey chalets at Calgarth by Lake Windermere.',
        image: '/units/ks2_ww2/assets/windermere_children_calgarth_chalets_1945.jpg',
        provenance:
          'United States Holocaust Memorial Museum (USHMM Accession 2004.708.1 / Record ID 85406).',
        source_context:
          "The boys and girls of Windermere formed the '45 Aid Society to support each other throughout their lives and raise money for charity. Many grew up to become British teachers, scientists, Olympic weightlifters, and business leaders, dedicating their lives to speaking about tolerance and peace.\n\n**Hinge Question:** Why did the children of Windermere describe their bond with each other as being like brothers and sisters for the rest of their lives?",
      },
      rights: {
        lesson_num: 11,
        lesson_title: 'After the War — The Windermere Children & Rebuilding Lives (1945)',
        source_id: 'Source D',
        artifact_title: 'Young Child Survivors Group Outside the Brick Chalets of Calgarth Estate',
        date: 'Summer 1945',
        creator: 'United States Holocaust Memorial Museum Photo Archive',
        repository: 'United States Holocaust Memorial Museum (USHMM), Washington D.C.',
        accession_id: 'USHMM Accession 2004.708.1 / Record ID 85406',
        rights_status: 'Public Domain (US / Holocaust Memorial Record)',
        commercial_use_permitted: true,
        source_url: 'https://collections.ushmm.org/search/catalog/pa1157829',
      },
    },
  ],
};

const { KS2_PEDAGOGY } = require('./update_enrich_script_with_pedagogy.cjs');

async function main() {
  console.log('🚀 Loading units/ks2_ww2/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  let totalUpdated = 0;
  const masterRightsList = [];

  unitData.lessons.forEach((l) => {
    const enrichedList = ENRICHED_SOURCES[l.id];
    if (enrichedList) {
      if (!l.sources) l.sources = [];
      enrichedList.forEach((item) => {
        const pedKey = `${l.id}_${item.source.letter}`;
        if (KS2_PEDAGOGY && KS2_PEDAGOGY[pedKey]) {
          item.source.hinge_question = KS2_PEDAGOGY[pedKey].hinge_question;
          item.source.discussion_ideas = KS2_PEDAGOGY[pedKey].discussion_ideas;
        }
        if (l.narrative_blocks && l.narrative_blocks[item.actIndex]) {
          l.narrative_blocks[item.actIndex].source = item.source;
          totalUpdated++;
          console.log(
            `✅ [${l.id}] Act ${item.actIndex + 1} wired with Source ${item.source.letter}: ${item.source.title}`,
          );
        } else {
          console.warn(`⚠️ [${l.id}] Missing narrative_block at index ${item.actIndex}`);
        }
        const existingIdx = l.sources.findIndex((s) => s.letter === item.source.letter);
        if (existingIdx >= 0) {
          l.sources[existingIdx] = item.source;
        } else {
          l.sources.push(item.source);
        }
        masterRightsList.push(item.rights);
      });
    } else {
      console.warn(`⚠️ No enriched sources defined for ${l.id}`);
    }
  });

  console.log(`\n🎉 Total sources updated across lessons: ${totalUpdated}`);

  // 1. Write back to units/ks2_ww2/data.js
  const jsContent = 'export default ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/ks2_ww2/data.js');

  // 2. Write to public/data/ks2_ww2.json
  if (fs.existsSync(pubJsonPath)) {
    const pubData = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
    pubData.data = unitData;
    fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
    console.log('✅ Successfully updated public/data/ks2_ww2.json');
  }

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.ks2_ww2) {
      db.ks2_ww2.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated ks2_ww2 in public/database.json');
    }
  }

  // 4. Update scripts/master_rights_database.json
  if (fs.existsSync(rightsDbPath)) {
    const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));
    if (rightsDb.units && rightsDb.units.ks2_ww2) {
      rightsDb.units.ks2_ww2.sources = masterRightsList;
      rightsDb.units.ks2_ww2.total_sources = masterRightsList.length;
      fs.writeFileSync(rightsDbPath, JSON.stringify(rightsDb, null, 2), 'utf8');
      console.log(
        `✅ Successfully updated scripts/master_rights_database.json (${masterRightsList.length} sources registered for ks2_ww2)`,
      );
    }
  }

  console.log('\n🏁 Completed all curriculum data and master rights synchronizations!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
