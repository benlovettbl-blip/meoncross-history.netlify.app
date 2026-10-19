/**
 * ks2_chronology_slider.js
 *
 * Interactive Key Stage 2 Milestones Chronology Slider (1938–1948)
 * Designed specifically for Key Stage 2 pupils (Years 3–6) and front-of-class interactive whiteboards.
 *
 * Features:
 * - 12 Curated Landmark Home Front Milestones with child-centered narrative storytelling
 * - Interactive horizontal highway track with synchronized range slider & clickable stepper nodes
 * - Automatic "Classroom Tour" presentation mode with smooth auto-advancing timer
 * - Filter pills (All, Evacuation & Children, Air Raids & Defence, Daily Life & Rationing, Secret War & Victory)
 * - Archival imagery with provenance tags and lightbox inspect
 * - "Life for Children" spotlights and "Think Like a Historian" hinge prompts
 * - Direct deep-links to the 24-Page Master Classroom Textbook and Pupil Worksheets
 * - Full keyboard accessibility (ArrowLeft / ArrowRight / Space)
 */

export const KS2_WW2_MILESTONES = [
  {
    id: 'm1',
    year: '1938–1939',
    month: 'November 1938 – August 1939',
    title: 'The Kindertransport: Saving 10,000 Child Refugees',
    category: 'children',
    categoryLabel: 'Evacuation & Children',
    image: '/units/ks2_ww2/assets/kindertransport_arrival.jpg',
    imageCaption:
      'Young refugees arriving at London Liverpool Street Station, carrying small suitcases and cardboard travel tags (1939).',
    provenance: 'Imperial War Museum / National Archives',
    refTextbook: 'pp. 8–9 & pp. 20–21 • Enquiries 3 & 9',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_03_kindertransport_worksheet.html',
    badgeColor: '#b45309',
    story:
      'Following the terrifying violence of the November Pogrom in Germany and Austria, British Parliament agreed to let unaccompanied Jewish child refugees under 17 find safety in Britain. British families and charities raised £50 per child (worth over £3,500 today) to sponsor their stay.',
    significance:
      'Over 10,000 children were saved from Nazi persecution before borders slammed shut in September 1939. Volunteers like Nicholas Winton and Trevor Chadwick organized emergency trains from Prague.',
    childrenLife:
      'Children had to say goodbye to their parents on dark train platforms, clutching just one small suitcase with a change of clothes, a favourite toy, and a numbered tag hung around their necks.',
    quote:
      '“I remember my mother holding my hand at the station. She told me to be brave and learn English quickly.” — Vera Schaufeld, age 9',
    detectiveQuestion:
      'Why did the British government insist that child refugees must travel unaccompanied without their parents?',
    detectiveAnswer:
      'The government feared adults would take scarce British jobs, so sanctuary was strictly limited to children whose living costs were guaranteed by British sponsors.',
  },
  {
    id: 'm2',
    year: '1939',
    month: '1–3 September 1939',
    title: 'Outbreak of War & Operation Pied Piper Begins',
    category: 'evacuation',
    categoryLabel: 'Evacuation & Children',
    image: '/units/ks2_ww2/assets/evacuees_railway_1939.jpg',
    imageCaption:
      'School children in London boarding steam trains with cardboard suitcases and luggage labels pinned to their coats (September 1939).',
    provenance: 'The National Archives (AN 2/1047)',
    refTextbook: 'pp. 4–7 • Enquiries 1 & 2',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_02_evacuation_worksheet.html',
    badgeColor: '#1e3a8a',
    story:
      'On Friday 1 September 1939, German forces invaded Poland. Fearing immediate bomber attacks on London and big cities, the British government launched Operation Pied Piper. Two days later, Prime Minister Neville Chamberlain broadcast the solemn news that Britain was at war.',
    significance:
      'In just three days, British railways safely moved nearly 1.5 million school pupils, mothers with toddlers, and teachers into the quiet countryside without a single fatal accident.',
    childrenLife:
      'Pupils gathered at school before dawn, clutching brown paper luggage tags pinned to their coats, cardboard gas mask boxes, and pillowcases stuffed with spare clothes before boarding steam trains for unknown rural villages.',
    quote:
      '“I have to tell you now that this country is at war with Germany.” — Prime Minister Neville Chamberlain, 11:15am, 3 September 1939',
    detectiveQuestion:
      'How many children and mothers were evacuated across Britain during the first three days of September 1939?',
    detectiveAnswer:
      'Nearly 1.5 million people (1,473,000) were safely dispersed into rural reception zones like Devon, Wales, and Yorkshire.',
  },
  {
    id: 'm3',
    year: '1939',
    month: 'September – October 1939',
    title: 'Fitting 38 Million Gas Masks & The Total Blackout',
    category: 'defence',
    categoryLabel: 'Air Raids & Defence',
    image: '/units/ks2_ww2/assets/gas_masks_children_1939.jpg',
    imageCaption:
      'British schoolchildren practising an emergency gas mask drill in their classroom with rubber respirators (Autumn 1939).',
    provenance: 'Imperial War Museum (D 1511)',
    refTextbook: 'pp. 4–5 • Enquiry 1',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_01_outbreak_gasmasks_worksheet.html',
    badgeColor: '#0f172a',
    story:
      'Remembering the horrors of poison gas in the First World War, the government issued 38 million rubber gas mask respirators in cardboard boxes to every man, woman, and child. At the same time, every streetlamp was extinguished and windows were covered with thick black paper.',
    significance:
      'The strict Blackout prevented enemy pilots from using city lights to navigate. Air Raid Precautions (ARP) wardens patrolled pitch-black streets shouting "Put that light out!" if even a chink of candlelight escaped.',
    childrenLife:
      'Babies had special sealed helmets with hand pumps operated by their mothers. Young children received red-and-blue "Mickey Mouse" respirators with friendly round ears to make them less frightening to wear during school drills.',
    quote:
      '“The mask smelled of cold rubber and chalk dust. When you breathed out, the little rubber valve made a funny farting noise that made everyone laugh.” — Wartime Schoolboy',
    detectiveQuestion:
      'Why did the government paint kerbs, lampposts, and tree trunks white during the blackout?',
    detectiveAnswer:
      'Because all streetlights and car headlamps were blacked out, pedestrians and drivers needed white reflective paint so they did not crash in the dark!',
  },
  {
    id: 'm4',
    year: '1940',
    month: 'May – June 1940',
    title: 'Winston Churchill & The Miracle of Dunkirk',
    category: 'victory',
    categoryLabel: 'Secret War & Victory',
    image: '/units/ks2_ww2/assets/atlantic_lifeline_map.jpg',
    imageCaption:
      'Allied shipping and maritime operations defending British waters and rescuing the army from French shores (1940).',
    provenance: 'Imperial War Museum / Admiralty Records',
    refTextbook: 'pp. 10–11 • Enquiry 4',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_04_the_blitz_shelters_worksheet.html',
    badgeColor: '#2563eb',
    story:
      'In May 1940, Winston Churchill became Britain’s Prime Minister. When the German army trapped the British Expeditionary Force on the beaches of Dunkirk in northern France, an emergency armada of naval destroyers and hundreds of civilian "Little Ships"—fishing boats, pleasure cruisers, and lifeboats—set sail across the Channel.',
    significance:
      'Over 338,000 British and French soldiers were rescued from the beaches, preserving Britain’s army to fight on. Churchill warned that wars are not won by evacuations, but promised Britain would never surrender.',
    childrenLife:
      'Families gathered eagerly around battery-powered radio sets to hear Churchill’s roaring voice, while school pupils helped collect aluminium pots, pans, and railings to melt down for Spitfires.',
    quote:
      '“We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets... we shall never surrender!” — Winston Churchill, 4 June 1940',
    detectiveQuestion:
      'Why were ordinary private pleasure boats and fishing smacks able to rescue soldiers when big naval warships could not?',
    detectiveAnswer:
      'Large warships could not get close to the shallow Dunkirk beaches without running aground; the shallow-draught "Little Ships" ferried men directly from the surf.',
  },
  {
    id: 'm5',
    year: '1940',
    month: 'July – October 1940',
    title: 'The Battle of Britain: The Few Defend the Skies',
    category: 'defence',
    categoryLabel: 'Air Raids & Defence',
    image: '/units/ks2_ww2/assets/womens_land_army_harvest.jpg',
    imageCaption:
      'Wartime countryside beneath southern skies where RAF Spitfires and Hurricanes intercepted Luftwaffe bomber waves (Summer 1940).',
    provenance: 'Imperial War Museum Art Collection',
    refTextbook: 'pp. 10–11 & pp. 14–15 • Enquiries 4 & 6',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_04_the_blitz_shelters_worksheet.html',
    badgeColor: '#1d4ed8',
    story:
      'Hitler planned to invade Britain under Operation Sea Lion, but first the German Luftwaffe had to destroy the Royal Air Force. All summer, fighter pilots in Spitfires and Hurricanes scrambled from airfields across southern England to battle enemy Messerschmitts in the blue skies.',
    significance:
      'Aided by secret radar towers along the coastline and volunteer Observer Corps spotters, Fighter Command shot down over 1,700 enemy aircraft, forcing Hitler to indefinitely postpone the invasion of Britain.',
    childrenLife:
      'Children in fields and back gardens watched dogfights high above their heads, marvelling at swirling white vapour trails and rushing to collect shiny metal shrapnel and spent bullet casings as playground souvenirs.',
    quote:
      '“Never in the field of human conflict was so much owed by so many to so few.” — Winston Churchill, 20 August 1940',
    detectiveQuestion:
      'Which secret British invention gave Fighter Command advance warning of incoming German bomber formations?',
    detectiveAnswer:
      'Radar (Radio Detection and Ranging), an invisible network of tall steel coastal towers that bounced radio pulses off approaching aircraft.',
  },
  {
    id: 'm6',
    year: '1940–1941',
    month: 'September 1940 – May 1941',
    title: 'The Blitz: 57 Consecutive Nights of Bombing',
    category: 'defence',
    categoryLabel: 'Air Raids & Defence',
    image: '/units/ks2_ww2/assets/tube_station_shelter_1940.jpg',
    imageCaption:
      'Families camping overnight on Underground tube station platforms to stay safe from nighttime air raids (November 1940).',
    provenance: 'Imperial War Museum Photographic Archive',
    refTextbook: 'pp. 10–11 • Enquiry 4',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_04_the_blitz_shelters_worksheet.html',
    badgeColor: '#991b1b',
    story:
      'Beginning on Saturday 7 September 1940 ("Black Saturday"), the German air force bombed London for 57 consecutive nights, targeting the docks, factories, and railway terminals. The bombardment soon spread to industrial hubs like Coventry, Liverpool, Birmingham, and Belfast.',
    significance:
      'Over 43,000 British civilians were killed and more than a million homes were damaged. Yet British morale did not break: volunteer firefighters, ambulance drivers, and ordinary citizens pulled neighbours from the rubble each morning.',
    childrenLife:
      'Families slept in cold, damp corrugated steel Anderson shelters dug into back gardens, under heavy steel indoor Morrison table shelters, or packed together along curved Underground tube station platforms.',
    quote:
      '“The sirens waked us with their rising and falling howl. We ran for the garden shelter just as the searchlights began criss-crossing the black sky.” — London Resident',
    detectiveQuestion:
      'Why were corrugated steel Anderson shelters covered with 15 inches of soil and turf on top?',
    detectiveAnswer:
      'The earth absorbed the blast wave and shielded the family inside from flying bomb fragments and falling debris.',
  },
  {
    id: 'm7',
    year: '1940–1941',
    month: 'January 1940 – Throughout War',
    title: 'Dig for Victory & Fair Shares Through Rationing',
    category: 'rationing',
    categoryLabel: 'Daily Life & Rationing',
    image: '/units/ks2_ww2/assets/ration_book_coupons_1940.jpg',
    imageCaption:
      'Official Ministry of Food general ration books and coupons for butter, sugar, and meat (1940).',
    provenance: 'The National Archives / Ministry of Food',
    refTextbook: 'pp. 12–13 • Enquiry 5',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_05_dig_for_victory_rationing_worksheet.html',
    badgeColor: '#15803d',
    story:
      'Because German U-boats sank merchant ships carrying food across the Atlantic, Britain had to ration scarce supplies so everyone received a fair share. Bacon, butter, and sugar were rationed first, followed by meat, tea, eggs, and sweets.',
    significance:
      'The Ministry of Agriculture launched the famous "Dig for Victory" campaign. Parks, front gardens, golf courses, and the moat of the Tower of London were dug up to grow potatoes, carrots, and cabbages.',
    childrenLife:
      'Each person had a coloured paper Ration Book. Children helped tend vegetable plots, cared for backyard chickens and rabbits, and collected rosehips to make vitamin-rich syrup when oranges could not be imported.',
    quote:
      '“Potato Pete and Doctor Carrot became national heroes! We had carrot jam, carrot lollies, and Lord Woolton vegetable pie.” — Wartime Cook',
    detectiveQuestion:
      'How many eggs per week was a British adult typically allowed under wartime rationing?',
    detectiveAnswer:
      'Only ONE fresh egg per week! People relied on tins of yellow powdered egg from America to make omelettes and cakes.',
  },
  {
    id: 'm8',
    year: '1941',
    month: 'December 1941 – 1945',
    title: 'Conscription of Women & The Women’s Land Army',
    category: 'rationing',
    categoryLabel: 'Daily Life & Rationing',
    image: '/units/ks2_ww2/assets/land_army_poster_1941.jpg',
    imageCaption:
      'Ministry of Information recruitment poster: "For a healthy, happy job join the Women’s Land Army" (1941).',
    provenance: 'Imperial War Museum Art Collection',
    refTextbook: 'pp. 14–15 • Enquiry 6',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_06_women_at_war_land_army_worksheet.html',
    badgeColor: '#047857',
    story:
      'In December 1941, Britain became the first country in the world to conscript women for national service. Unmarried women aged 20 to 30 were called up to work in aircraft factories, join auxiliary armed services, or enlist in the Women’s Land Army.',
    significance:
      'Over 80,000 "Land Girls" replaced male farm workers called to the frontline. Hundreds of thousands of factory women—nicknamed "Canary Girls" because sulfur powders turned their skin and hair yellow—assembled bombs and tanks.',
    childrenLife:
      'Land Girls wore corduroy breeches, knitted green jerseys, and rubber Wellington boots, driving heavy tractors and harvesting wheat. Female ATA pilots ferried fighter planes directly from factories to airfields.',
    quote:
      '“We milked cows before dawn in freezing weather and ploughed fields until our hands were blistered, but we kept Britain fed.” — Land Girl Volunteer',
    detectiveQuestion:
      'Why were female munitions factory workers affectionately nicknamed "Canary Girls"?',
    detectiveAnswer:
      'Handling sulfur and TNT chemicals stained their hands, faces, and hair bright yellow, like a canary bird!',
  },
  {
    id: 'm9',
    year: '1941–1943',
    month: '1941 – 1943',
    title: 'Bletchley Park, Alan Turing & The Bombe Machines',
    category: 'victory',
    categoryLabel: 'Secret War & Victory',
    image: '/units/ks2_ww2/assets/bombe_bletchley_park.jpg',
    imageCaption:
      'The Turing-Welchman electromechanical Bombe machine used to test thousands of Enigma combinations (1941).',
    provenance: 'Bletchley Park Trust Archive',
    refTextbook: 'pp. 18–19 • Enquiry 8',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_08_bletchley_codebreakers_worksheet.html',
    badgeColor: '#4f46e5',
    story:
      'At a secluded country estate in Buckinghamshire named Bletchley Park ("Station X"), top mathematicians, crossword champions, and thousands of young women worked in total secrecy to break the German military’s "unbreakable" Enigma cipher.',
    significance:
      'Mathematician Alan Turing and Gordon Welchman built the "Bombe"—a giant electromechanical machine with 36 spinning drums that tested thousands of rotor combinations every second, decrypting secret radio orders codenamed "Ultra".',
    childrenLife:
      'Nearly 75% of the 10,000 codebreakers at Bletchley Park were young women, many in the Women’s Royal Naval Service (Wrens). They signed the Official Secrets Act and never told their parents or children what they did.',
    quote:
      '“They were the secret weapon that shortened the war in Europe by at least two years and saved millions of lives.” — Sir Harry Hinsley, Historian',
    detectiveQuestion:
      'What proportion of the 10,000 secret codebreaking workers at Bletchley Park were women?',
    detectiveAnswer:
      'Nearly 75% (three out of every four workers) were women, operating the noisy Bombe machines and filing thousands of intercepted radio messages.',
  },
  {
    id: 'm10',
    year: '1944',
    month: '6 June 1944',
    title: 'D-Day: Operation Overlord & The Liberation of Europe',
    category: 'victory',
    categoryLabel: 'Secret War & Victory',
    image: '/units/ks2_ww2/assets/blitz_targets_map.jpg',
    imageCaption:
      'Map and plotting networks for Allied logistics and cross-channel military operations (June 1944).',
    provenance: 'Imperial War Museum / Allied Command',
    refTextbook: 'pp. 22–23 • Enquiry 10',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_10_ve_day_remembrance_worksheet.html',
    badgeColor: '#0369a1',
    story:
      'On the morning of 6 June 1944, the largest amphibious invasion in human history crossed the English Channel. Over 156,000 British, American, and Canadian troops landed on five beaches in Normandy, France, supported by 7,000 vessels and 11,000 aircraft.',
    significance:
      'Allied forces breached Hitler’s formidable "Atlantic Wall" of concrete bunkers and minefields, liberating Paris in August 1944 and beginning the final push to defeat Nazi tyranny across Western Europe.',
    childrenLife:
      'Towns and villages in southern England had been crowded with Allied soldiers and tanks for months. Children traded sweets for American chewing gum, while coastal skies roared day and night with transport planes.',
    quote:
      '“The eyes of the world are upon you. The hopes and prayers of liberty-loving people everywhere march with you.” — General Dwight D. Eisenhower, D-Day Order',
    detectiveQuestion:
      'What was the secret codename for the two artificial floating harbours towed across the Channel on D-Day?',
    detectiveAnswer:
      'The Mulberry Harbours, giant prefabricated concrete breakwaters that allowed hundreds of thousands of supply trucks to land without capturing a French port!',
  },
  {
    id: 'm11',
    year: '1945',
    month: '8 May 1945',
    title: 'VE Day: Victory in Europe & Street Celebrations',
    category: 'victory',
    categoryLabel: 'Secret War & Victory',
    image: '/units/ks2_ww2/assets/ve_day_children_table_1945.jpg',
    imageCaption:
      'Children enjoying a celebratory street party table lined with Union Jack bunting in London on VE Day (8 May 1945).',
    provenance: 'Imperial War Museum (HU 49481)',
    refTextbook: 'pp. 22–23 • Enquiry 10',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_10_ve_day_remembrance_worksheet.html',
    badgeColor: '#b91c1c',
    story:
      'Following the surrender of German armed forces, Tuesday 8 May 1945 was declared Victory in Europe Day (VE Day). At 3:00pm, Prime Minister Winston Churchill broadcast to the nation, announcing that the war in Europe was finally won.',
    significance:
      'Across Great Britain, millions poured into the streets. Church bells rang freely for the first time in six years, blackout curtains were pulled down to let light flood into the night, and huge bonfires lit up village greens.',
    childrenLife:
      'Neighbours pooled their precious sugar and butter rations to bake party cakes for children. Long trestle tables were laid out down the middle of roads, decorated with handmade paper bunting and Union Jack flags.',
    quote:
      '“My dear friends, this is your hour. This is not victory of a party or of any class. It is a victory of the great British nation as a whole.” — Winston Churchill, 8 May 1945',
    detectiveQuestion:
      'Why were the street party celebrations on VE Day a time of quiet sadness as well as great joy for many families?',
    detectiveAnswer:
      'Because amid the dancing and singing, many families quietly mourned fathers, brothers, and sons who had died in battle and would never return home.',
  },
  {
    id: 'm12',
    year: '1945',
    month: '14 August 1945',
    title: 'The Windermere Children: 300 Child Survivors Arrive in Cumbria',
    category: 'children',
    categoryLabel: 'Evacuation & Children',
    image: '/units/ks2_ww2/assets/windermere_children_calgarth_1945.jpg',
    imageCaption:
      'Child Holocaust survivors standing on the shore of Lake Windermere at the Calgarth Estate in August 1945, wearing donated coats and looking across the calm lake.',
    provenance: 'Lake District Holocaust Project (LDHP) Archive',
    refTextbook: 'Enquiry 11 (Extension) • The Windermere Children',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_11_windermere_children_worksheet.html',
    badgeColor: '#059669',
    story:
      'In August 1945, three months after the war in Europe ended, 10 giant RAF Stirling bombers flew 300 orphaned child survivors from Prague to Cumbria. They were housed at the Calgarth Estate by Lake Windermere to heal, recuperate, and rebuild their lives.',
    significance:
      "Having survived years of terror and starvation in Nazi concentration camps where over 1.5 million children died, the children were cared for by Dr Oscar Friedman and given 300 red bicycles, fresh food, and freedom, inspiring Tom Palmer's award-winning novel After the War.",
    childrenLife:
      'At first, the children hid bread under their pillows because they feared food would disappear. Gradually, by swimming in Lake Windermere, cycling country lanes, and learning English, they learned to smile and live again.',
    quote:
      '“Arriving at Windermere was like coming from hell to heaven. For the first time in years, we were treated as human beings.” — Arek Hersh MBE, Survivor',
    detectiveQuestion:
      'How many child survivors were brought by RAF bombers to Lake Windermere in August 1945?',
    detectiveAnswer:
      "300 child survivors (known as the Windermere Children), who formed the '45 Aid Society and built thriving new lives in Britain.",
  },
  {
    id: 'm13',
    year: '1945–1948',
    month: 'Post-War Rebuilding & 1948 NHS',
    title: 'Rebuilding Britain, The NHS & The Poppy of Remembrance',
    category: 'victory',
    categoryLabel: 'Secret War & Victory',
    image: '/units/ks2_ww2/assets/vera_keepsakes.jpg',
    imageCaption:
      'Personal keepsakes and childhood memories preserved by survivors as a lasting testament of courage and remembrance.',
    provenance: 'Holocaust Educational Trust Archive',
    refTextbook: 'pp. 22–23 • Enquiry 10',
    worksheetUrl: '/units/ks2_ww2/worksheets/lesson_10_ve_day_remembrance_worksheet.html',
    badgeColor: '#6b21a8',
    story:
      'Britain emerged from the war victorious but physically damaged and deeply in debt. In 1948, the government founded the National Health Service (NHS), providing free doctors, dentists, and hospitals for every child and family regardless of wealth.',
    significance:
      'Every November on Remembrance Sunday, the nation pauses for a two-minute silence. Millions wear red poppies to remember the bravery and sacrifice of soldiers, nurses, and ordinary Home Front civilians.',
    childrenLife:
      'Post-war children lived through years of continued rationing (bread was even rationed until 1948!), played in bomb craters converted into playgrounds, and grew up in a country determined to build a fairer society for all.',
    quote:
      '“When you go home, tell them of us and say, For your tomorrow, we gave our today.” — The Kohima Epitaph',
    detectiveQuestion:
      'Which famous British institution was created in 1948 to ensure every child had access to free medical care?',
    detectiveAnswer:
      'The National Health Service (NHS), established by Health Minister Aneurin Bevan so healthcare was a right for all citizens.',
  },
];

export function renderKs2TimelineSlider(container) {
  if (!container) return;

  let activeIndex = 0;
  let activeFilter = 'all';
  let isPlaying = false;
  let playInterval = null;

  function getFilteredMilestones() {
    if (activeFilter === 'all') return KS2_WW2_MILESTONES;
    return KS2_WW2_MILESTONES.filter((m) => m.category === activeFilter);
  }

  function render() {
    const list = getFilteredMilestones();
    if (activeIndex >= list.length) activeIndex = 0;
    const current = list[activeIndex] || KS2_WW2_MILESTONES[0];

    container.innerHTML = `
      <style>
        .ks2-slider-view {
          max-width: 1260px;
          margin: 0 auto;
          padding: 16px 20px 60px 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0f172a;
        }

        /* Top Hero Banner */
        .ks2-slider-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%);
          border-radius: 14px;
          padding: 24px 28px;
          color: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.35);
          margin-bottom: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .ks2-hero-title-wrap h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.85rem;
          font-weight: 800;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ks2-hero-subtitle {
          font-size: 0.95rem;
          color: #e2e8f0;
          margin: 0;
          line-height: 1.4;
          max-width: 680px;
        }

        .ks2-hero-badge {
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #93c5fd;
          display: inline-block;
          margin-bottom: 6px;
        }

        /* Filter Chips Strip */
        .ks2-filter-strip {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 18px;
          align-items: center;
        }

        .ks2-filter-chip {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ks2-filter-chip:hover {
          border-color: #2563eb;
          color: #1e3a8a;
          transform: translateY(-1px);
        }

        .ks2-filter-chip.active {
          background: #1e3a8a;
          border-color: #1e3a8a;
          color: #ffffff;
          box-shadow: 0 3px 8px rgba(30, 58, 138, 0.25);
        }

        /* Chronology Highway Slider Component */
        .ks2-highway-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px 24px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
          margin-bottom: 22px;
        }

        .ks2-highway-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ks2-highway-label {
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #1e3a8a;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ks2-highway-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ks2-ctrl-btn {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #1e293b;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .ks2-ctrl-btn:hover:not(:disabled) {
          background: #e2e8f0;
          border-color: #94a3b8;
        }

        .ks2-ctrl-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ks2-ctrl-btn.play-btn {
          background: #2563eb;
          color: #ffffff;
          border-color: #1d4ed8;
        }

        .ks2-ctrl-btn.play-btn:hover {
          background: #1d4ed8;
        }

        /* Range Slider Track */
        .ks2-slider-container {
          position: relative;
          padding: 24px 8px 10px 8px;
        }

        .ks2-range-input {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #e2e8f0;
          outline: none;
          cursor: pointer;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .ks2-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #2563eb;
          border: 3.5px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
          cursor: grab;
          transition: transform 0.1s, background-color 0.2s;
        }

        .ks2-range-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          background: #1d4ed8;
        }

        /* Stepper Node Points along Highway */
        .ks2-nodes-track {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-top: 14px;
        }

        .ks2-node-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
          flex: 1;
        }

        .ks2-node-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #cbd5e1;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          margin-bottom: 6px;
          transition: all 0.2s;
        }

        .ks2-node-item:hover .ks2-node-dot {
          background: #60a5fa;
          transform: scale(1.3);
        }

        .ks2-node-item.active .ks2-node-dot {
          background: #2563eb;
          transform: scale(1.45);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
        }

        .ks2-node-year {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          text-align: center;
          white-space: nowrap;
        }

        .ks2-node-item.active .ks2-node-year {
          color: #1e3a8a;
          font-weight: 800;
        }

        /* Milestone Showcase Card */
        .ks2-milestone-card {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
          display: grid;
          grid-template-columns: 440px 1fr;
          transition: all 0.25s ease;
        }

        @media (max-width: 960px) {
          .ks2-milestone-card {
            grid-template-columns: 1fr;
          }
        }

        .ks2-card-visual {
          background: #0f172a;
          display: flex;
          flex-direction: column;
          border-right: 1.5px solid #cbd5e1;
          position: relative;
        }

        .ks2-visual-img-wrap {
          height: 340px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          position: relative;
        }

        .ks2-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .ks2-visual-img:hover {
          transform: scale(1.03);
        }

        .ks2-visual-caption-box {
          padding: 12px 16px;
          background: #1e293b;
          color: #f1f5f9;
          font-size: 0.78rem;
          line-height: 1.35;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ks2-provenance-tag {
          font-size: 0.68rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Detail Column */
        .ks2-card-detail {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #fdfbf7;
        }

        .ks2-detail-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .ks2-date-pill {
          background: ${current.badgeColor || '#1e3a8a'};
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .ks2-step-counter {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .ks2-milestone-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.55rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px 0;
          line-height: 1.25;
        }

        .ks2-story-box {
          font-size: 0.94rem;
          line-height: 1.55;
          color: #334155;
          margin-bottom: 14px;
        }

        .ks2-callouts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        @media (max-width: 600px) {
          .ks2-callouts-grid {
            grid-template-columns: 1fr;
          }
        }

        .ks2-callout-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-left: 3.5px solid #2563eb;
          border-radius: 6px;
          padding: 9px 12px;
        }

        .ks2-callout-title {
          font-size: 0.72rem;
          font-weight: 800;
          color: #1e3a8a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ks2-callout-text {
          font-size: 0.82rem;
          line-height: 1.38;
          color: #1e293b;
        }

        .ks2-quote-strip {
          background: #eff6ff;
          border: 1px dashed #bfdbfe;
          border-radius: 6px;
          padding: 9px 14px;
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 0.88rem;
          color: #1e3a8a;
          line-height: 1.4;
          margin-bottom: 14px;
        }

        /* Detective Challenge Box */
        .ks2-detective-box {
          background: #fefce8;
          border: 1.5px solid #fef08a;
          border-left: 4px solid #ca8a04;
          border-radius: 6px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }

        .ks2-detective-header {
          font-size: 0.74rem;
          font-weight: 800;
          color: #92400e;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .ks2-detective-q {
          font-size: 0.84rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }

        .ks2-reveal-btn {
          background: #ca8a04;
          color: #ffffff;
          border: none;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .ks2-detective-a {
          font-size: 0.8rem;
          color: #713f12;
          background: #fffbeb;
          padding: 6px 10px;
          border-radius: 4px;
          margin-top: 6px;
          display: none;
          border: 1px solid #fef08a;
        }

        /* Bottom Action Navigation */
        .ks2-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #cbd5e1;
          padding-top: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ks2-action-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ks2-link-btn {
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s;
        }

        .ks2-link-btn.primary {
          background: #1e3a8a;
          color: #ffffff;
        }

        .ks2-link-btn.primary:hover {
          background: #1e40af;
        }

        .ks2-link-btn.secondary {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
        }

        .ks2-link-btn.secondary:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }
      </style>

      <div class="ks2-slider-view">
        <!-- Top Hero Banner -->
        <div class="ks2-slider-hero">
          <div class="ks2-hero-title-wrap">
            <span class="ks2-hero-badge"><i class="fa-solid fa-flag"></i> Key Stage 2 Historical Enquiry</span>
            <h1><i class="fa-solid fa-clock-rotate-left"></i> WWII Milestones Chronology Slider</h1>
            <p class="ks2-hero-subtitle">
              Step through the defining turning points of World War II &amp; the Home Front (1938–1948). Drag the slider or click any milestone to explore how children, families, and civilians lived through the conflict.
            </p>
          </div>
          <div style="display: flex; gap: 8px; flex-shrink: 0;">
            <a href="/units/ks2_ww2/textbook.html" target="_blank" class="btn" style="background: rgba(255,255,255,0.15); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-book-open"></i> Read 24-Page Textbook
            </a>
          </div>
        </div>

        <!-- Filter Chips Strip -->
        <div class="ks2-filter-strip">
          <span style="font-size: 0.76rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-right: 4px;">Filter Highway:</span>
          <button class="ks2-filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
            <i class="fa-solid fa-layer-group"></i> All 12 Milestones
          </button>
          <button class="ks2-filter-chip ${activeFilter === 'children' || activeFilter === 'evacuation' ? 'active' : ''}" data-filter="children">
            <i class="fa-solid fa-child"></i> Evacuation &amp; Children
          </button>
          <button class="ks2-filter-chip ${activeFilter === 'defence' ? 'active' : ''}" data-filter="defence">
            <i class="fa-solid fa-shield-halved"></i> Air Raids &amp; Defence
          </button>
          <button class="ks2-filter-chip ${activeFilter === 'rationing' ? 'active' : ''}" data-filter="rationing">
            <i class="fa-solid fa-seedling"></i> Daily Life &amp; Rationing
          </button>
          <button class="ks2-filter-chip ${activeFilter === 'victory' ? 'active' : ''}" data-filter="victory">
            <i class="fa-solid fa-trophy"></i> Secret War &amp; Victory
          </button>
        </div>

        <!-- The Chronology Highway Interactive Card -->
        <div class="ks2-highway-card">
          <div class="ks2-highway-header">
            <div class="ks2-highway-label">
              <i class="fa-solid fa-route" style="color: #2563eb;"></i> Chronological Highway (1938–1948)
            </div>
            <div class="ks2-highway-controls">
              <button class="ks2-ctrl-btn" id="ks2-btn-prev" ${activeIndex === 0 ? 'disabled' : ''}>
                <i class="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button class="ks2-ctrl-btn play-btn" id="ks2-btn-play">
                <i class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i> ${isPlaying ? 'Pause Tour' : 'Classroom Tour'}
              </button>
              <button class="ks2-ctrl-btn" id="ks2-btn-next" ${activeIndex === list.length - 1 ? 'disabled' : ''}>
                Next <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- Slider Range -->
          <div class="ks2-slider-container">
            <input type="range" class="ks2-range-input" id="ks2-range-slider" min="0" max="${list.length - 1}" value="${activeIndex}" step="1" />
            
            <div class="ks2-nodes-track">
              ${list
                .map(
                  (m, idx) => `
                <div class="ks2-node-item ${idx === activeIndex ? 'active' : ''}" data-index="${idx}">
                  <div class="ks2-node-dot"></div>
                  <span class="ks2-node-year">${m.year.split('–')[0]}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Active Milestone Showcase Card -->
        <div class="ks2-milestone-card">
          <!-- Left Column: Archival Plate -->
          <div class="ks2-card-visual">
            <div class="ks2-visual-img-wrap">
              <img class="ks2-visual-img" src="${current.image}" alt="${current.title}" />
            </div>
            <div class="ks2-visual-caption-box">
              ${current.imageCaption}
              <div class="ks2-provenance-tag">
                <i class="fa-solid fa-building-columns"></i> ${current.provenance}
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Historical Investigation -->
          <div class="ks2-card-detail">
            <div>
              <div class="ks2-detail-top-row">
                <span class="ks2-date-pill">${current.month}</span>
                <span class="ks2-step-counter">Milestone ${activeIndex + 1} of ${list.length}</span>
              </div>

              <h2 class="ks2-milestone-title">${current.title}</h2>

              <p class="ks2-story-box">${current.story}</p>

              <div class="ks2-callouts-grid">
                <div class="ks2-callout-card">
                  <div class="ks2-callout-title"><i class="fa-solid fa-lightbulb"></i> Why It Matters</div>
                  <div class="ks2-callout-text">${current.significance}</div>
                </div>
                <div class="ks2-callout-card" style="border-left-color: #059669;">
                  <div class="ks2-callout-title" style="color: #059669;"><i class="fa-solid fa-children"></i> Life for Children</div>
                  <div class="ks2-callout-text">${current.childrenLife}</div>
                </div>
              </div>

              <div class="ks2-quote-strip">
                <i class="fa-solid fa-quote-left" style="margin-right: 6px; opacity: 0.6;"></i>
                ${current.quote}
              </div>

              <div class="ks2-detective-box">
                <div class="ks2-detective-header">
                  <span><i class="fa-solid fa-magnifying-glass"></i> Historical Detective Challenge</span>
                  <button class="ks2-reveal-btn" id="ks2-btn-reveal">Reveal Clue</button>
                </div>
                <div class="ks2-detective-q">${current.detectiveQuestion}</div>
                <div class="ks2-detective-a" id="ks2-detective-answer">
                  <strong>Answer:</strong> ${current.detectiveAnswer}
                </div>
              </div>
            </div>

            <!-- Bottom Action Navigation -->
            <div class="ks2-actions-row">
              <div class="ks2-action-links">
                <a href="/units/ks2_ww2/textbook.html" target="_blank" class="ks2-link-btn primary">
                  <i class="fa-solid fa-book-open"></i> Read in Master Textbook (${current.refTextbook.split('•')[0].trim()})
                </a>
                <a href="${current.worksheetUrl}" target="_blank" class="ks2-link-btn secondary">
                  <i class="fa-solid fa-file-pen"></i> Open Worksheet
                </a>
              </div>
              <span style="font-size: 0.74rem; color: #64748b; font-weight: 600;">
                <i class="fa-solid fa-keyboard" style="margin-right: 4px;"></i> Use &larr; &rarr; arrow keys to navigate
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach Event Listeners
    setupEvents(list);
  }

  function setupEvents(list) {
    // Range Slider Input
    const rangeSlider = container.querySelector('#ks2-range-slider');
    if (rangeSlider) {
      rangeSlider.addEventListener('input', (e) => {
        activeIndex = parseInt(e.target.value, 10);
        render();
      });
    }

    // Node items click
    container.querySelectorAll('.ks2-node-item').forEach((node) => {
      node.addEventListener('click', () => {
        activeIndex = parseInt(node.getAttribute('data-index'), 10);
        render();
      });
    });

    // Prev / Next Buttons
    const btnPrev = container.querySelector('#ks2-btn-prev');
    const btnNext = container.querySelector('#ks2-btn-next');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (activeIndex > 0) {
          activeIndex--;
          render();
        }
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (activeIndex < list.length - 1) {
          activeIndex++;
          render();
        }
      });
    }

    // Play / Pause Presentation Tour
    const btnPlay = container.querySelector('#ks2-btn-play');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          playInterval = setInterval(() => {
            const currentList = getFilteredMilestones();
            if (activeIndex < currentList.length - 1) {
              activeIndex++;
            } else {
              activeIndex = 0;
            }
            render();
          }, 6000);
        } else {
          clearInterval(playInterval);
        }
        render();
      });
    }

    // Filter Chips
    container.querySelectorAll('.ks2-filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        activeFilter = chip.getAttribute('data-filter');
        activeIndex = 0;
        render();
      });
    });

    // Reveal Detective Answer
    const btnReveal = container.querySelector('#ks2-btn-reveal');
    const ansBox = container.querySelector('#ks2-detective-answer');
    if (btnReveal && ansBox) {
      btnReveal.addEventListener('click', () => {
        const isShown = ansBox.style.display === 'block';
        ansBox.style.display = isShown ? 'none' : 'block';
        btnReveal.textContent = isShown ? 'Reveal Clue' : 'Hide Clue';
      });
    }
  }

  // Keyboard Navigation Listeners
  const keyHandler = (e) => {
    if (!document.getElementById('ks2-range-slider')) {
      window.removeEventListener('keydown', keyHandler);
      return;
    }
    const list = getFilteredMilestones();
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (activeIndex < list.length - 1) {
        activeIndex++;
        render();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (activeIndex > 0) {
        activeIndex--;
        render();
      }
    }
  };
  window.addEventListener('keydown', keyHandler);

  render();
}
