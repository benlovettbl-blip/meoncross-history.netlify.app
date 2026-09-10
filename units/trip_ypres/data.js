import { poetryDossiers } from './poetry_data.js';

export const unitData = {
  id: 'trip_ypres',
  type: 'trip',
  yearGroup: 'Years 10–11',
  category: 'GCSE Field Study',
  title: 'GCSE Battlefield Tour: Ypres & The Salient',
  poetry_dossiers: poetryDossiers,
  enquiry_question: 'Ypres & The Salient',
  enquiry: 'Thursday 1st October – Saturday 3rd October 2026',
  cover_image: '/images/stubbington_memorial.jpg',
  cover_caption: 'Meoncross School – Battlefield Tour',
  key_info: {
    emergency_contact:
      '+44 (0)1329 662182 (Meoncross School Office) / 07825 297749 (+44 7825 297749) (Trip Mobile 24/7)',
    hotel: 'Peace Village Hostel, Nieuwkerkestraat 9aB, 8957 Mesen, Belgium',
    hotel_phone: '+32 57 226 040',
    hotel_email: 'info@peacevillage.be',
    hotel_faq_url: 'https://peacevillage.be/en/practical/faq',
    coach: 'Jet Connect Executive Travel',
    live_album_url: 'https://photos.app.goo.gl/placeholder',
  },
  extended: {
    question:
      '1 (a). How useful are Sources A and B for an enquiry into the devastated landscape of the Ypres Salient? Explain your answer, using Sources A and B and your knowledge of the historical context. (8 marks)',
    scaffolding: [
      '**Provenance Clues:** Analyze the Nature, Origin, and Purpose of the source. Ask yourself: Who wrote it? When? Why? How does their motive or the intended audience affect what they have written and its usefulness for the enquiry?',
    ],
    source_a: {
      provenance:
        'The Menin Road, a painting by official British War Artist Paul Nash, commissioned in 1919.',
      content:
        '<div style="padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;"><img src="/images/menin_road_nash.jpg" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"></div>',
    },
    source_b: {
      provenance:
        'An official Royal Flying Corps aerial photograph showing the intricate trench network on the Western Front, 1916.',
      content:
        '<div style="padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;"><img src="/images/aerial_trench_ypres.jpg" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"></div>',
    },
    model: '<strong>Source A is highly useful...</strong>',
    provenance_clue:
      'Source A is a painting by an official War Artist; does its stylistic and emotional nature make it more or less useful than a photograph? Source B is a military aerial photograph; what makes its objective recording of the geography useful?',
  },
  local_heroes: [
    {
      name: 'Private Thomas John Franklin',
      age: 23,
      rank: 'Private',
      regiment: '1st Battalion, The Hampshire Regiment',
      service_number: '8560',
      date_of_death: '29th April 1915',
      connection:
        'Son of George & Mary Ann Jane Franklin; lived at Meadow Cottage, Chark, Lee-on-the-Solent.',
      memorial: 'Ypres (Menin Gate) Memorial, Belgium',
      panel: 'Panel 35 (Hampshire Regiment)',
      tablet_inscription: 'T. J. FRANKLIN',
      story:
        'Killed in action on 29th April 1915 during the Second Battle of Ypres while defending Frezenberg Ridge under heavy bombardment and poison gas. He has no known grave.',
      visiting_location: 'Menin Gate',
      cwgc_verified: true,
    },
    {
      name: 'Private William (Walter) Ayling',
      age: 20,
      rank: 'Private (Commemorated as Lance Corporal on Crofton Tablet)',
      regiment: '1st Battalion, The Hampshire Regiment',
      service_number: '9330',
      date_of_death: '9th July 1915',
      connection:
        'Son of Horace & Annie Ayling; lived in Stubbington Lane. Worked as a village Baker Boy.',
      memorial: 'Ypres (Menin Gate) Memorial, Belgium',
      panel: 'Panel 35 (Hampshire Regiment)',
      tablet_inscription: 'W. AYLING, LCE. CPL.',
      story:
        'Killed by shellfire and trench mortars north of Ypres on 9th July 1915. He has no known grave and is commemorated on Panel 35 alongside his battalion comrade Private Franklin.',
      visiting_location: 'Menin Gate',
      cwgc_verified: true,
    },
    {
      name: 'Private Sydney Muckett',
      age: 21,
      rank: 'Private (Commemorated as Corporal on Crofton Tablet)',
      regiment: "15th Battalion, The Hampshire Regiment ('Pompey Pals')",
      service_number: '12977 / 204369',
      date_of_death: '20th September 1917',
      connection:
        "Son of William & Elizabeth Muckett; lived at Brown's Farm, Stubbington. Worked as a Grocer's Errand Boy.",
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: 'Panel 88 to 90 and 162 (Hampshire Regiment)',
      tablet_inscription: 'S. MUCKETT, CORPL.',
      story:
        'Killed in action on 20th September 1917 during the Battle of Menin Road Ridge (Third Battle of Ypres / Passchendaele). He has no known grave.',
      visiting_location: 'Tyne Cot',
      cwgc_verified: true,
    },
    {
      name: 'Private Arthur Rye',
      age: 21,
      rank: 'Private',
      regiment: "14th Battalion, The Hampshire Regiment ('Pompey Pals')",
      service_number: '22926',
      date_of_death: '26th September 1917',
      connection:
        "Son of Charles & Jane Rye; lived at Lower Crabthorne, Hill Head. Worked as a local Nurseryman. Sister Alice married Sydney Muckett's brother Frank.",
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: 'Panel 88 to 90 and 162 (Hampshire Regiment)',
      tablet_inscription: 'A. RYE',
      story:
        "Killed in action on 26th September 1917 in the assault through Polygon Wood, just six days after his brother-in-law's brother Sydney Muckett. He has no known grave.",
      visiting_location: 'Tyne Cot',
      cwgc_verified: true,
    },
    {
      name: 'Lance Corporal Archibald Hugh Ward',
      age: 23,
      rank: 'Lance Corporal',
      regiment: '15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment',
      service_number: '17568',
      date_of_death: '14th October 1918',
      connection:
        'Son of Hugh (yacht steward & RN Coastguard) & Bertha Kathleen Ward; lived at 6 Coastguard Cottages, Hill Head, and Balmoral, Seymour Road, Lee-on-the-Solent.',
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: 'Panel 88 to 90 and 162 (Hampshire Regiment)',
      tablet_inscription: 'A. WARD',
      story:
        'Killed in action advancing through thick mist near Gheluwe on 14th October 1918—less than four weeks before the Armistice. He has no known grave.',
      visiting_location: 'Tyne Cot',
      cwgc_verified: true,
    },
    {
      name: 'Private Charles Alfred Henry Warland',
      age: 20,
      rank: 'Private',
      regiment: "3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)",
      service_number: 'T/202335',
      date_of_death: '4th October 1917',
      connection:
        'Son of John Alfred Henry Warland (sporting journalist, author & Secretary of Lee-on-the-Solent Golf Club) and Louisa Clara Warland; lived at Canford, Lee-on-the-Solent.',
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: "Panel 14 to 17 and 162 to 162A (The Queen's)",
      tablet_inscription: 'C. WARLAND',
      story:
        'Killed in action on 4th October 1917 during the Battle of Broodseinde, advancing across marshland to take Juniper Trench. He has no known grave.',
      visiting_location: 'Tyne Cot',
      cwgc_verified: true,
    },
    {
      name: "Second Lieutenant William Augustine 'Harper' Lowry",
      age: 25,
      rank: 'Second Lieutenant',
      regiment: "Indian Army Reserve of Officers attd. 14th King George's Own Ferozepore Sikhs",
      connection: 'Lived at Manor Way Grange, Lee-on-the-Solent. Eldest brother.',
      memorial: 'Helles Memorial, Gallipoli, Turkey (Panel 230 to 239)',
      tablet_inscription: 'W. A. H. LOWRY, LIEUT.',
      story:
        'Killed on 4th June 1915 leading a desperate charge up Gully Ravine at Gallipoli. He has no known grave.',
      image: '/images/lowry_william.png',
      visiting_location: 'Commemorated on Stubbington War Memorial',
    },
    {
      name: "Lieutenant Colonel Auriol Ernest 'Eric' Lowry, DSO, MC & Bar",
      age: 25,
      rank: 'Lieutenant Colonel (DSO, MC & Bar, Croix de Guerre)',
      regiment: "2nd Battalion, West Yorkshire Regiment (Prince of Wales's Own)",
      connection:
        'Lived at Manor Way Grange, Lee-on-the-Solent. Middle brother. Commanded 2nd Bn West Yorkshires.',
      memorial: 'La Targette British Cemetery, Neuville-St. Vaast, France (Plot I. Row C. Grave 2)',
      tablet_inscription: 'A. E. E. LOWRY, LT. COL. M.C. D.S.O.',
      story:
        'Decorated with DSO and Military Cross with Bar. Wounded at Westhoek Ridge (Ypres) in August 1917. Killed in action on 23rd September 1918 in the Acheville Sector near Arleux, France.',
      image: '/images/lowry_auriol.png',
      visiting_location: 'Commemorated on Stubbington War Memorial',
    },
    {
      name: "Captain Cyril John 'Patrick' Lowry",
      age: 20,
      rank: 'Captain',
      regiment: "2nd Battalion, West Yorkshire Regiment (Prince of Wales's Own)",
      connection: 'Lived at Manor Way Grange, Lee-on-the-Solent. Youngest brother.',
      memorial: 'Pozières Memorial, Somme, France (Panel 26 and 27)',
      tablet_inscription: 'C. J. P. LOWRY, CAPT.',
      story:
        'Killed on 25th March 1918 on the Somme while leading a counter-attack under the command of his brother Eric, falling in full view of him. He has no known grave.',
      image: '/images/lowry_cyril.png',
      visiting_location: 'Commemorated on Stubbington War Memorial',
    },
    {
      name: '2nd Lieutenant Ernest Edward Crummack MC, DCM',
      age: 'Survived (1888–1968, aged 80)',
      rank: '2nd Lieutenant (formerly Sergeant)',
      regiment: 'York and Lancaster Regiment (1/5th & 2/4th Battalions)',
      service_number: '2404 / Commissioned Officer',
      date_of_death: 'Survived the Great War (Died 1968)',
      connection:
        'Great-great-grandfather of Aby (Year 10, Meoncross School). Middle name Ernest given in his honour. Family archive researched by grandfather Edward Pearson and shared by mother Harriet Uwalaka (née Pearson).',
      memorial: 'Dinnington Cemetery, Yorkshire · Dinnington Royal British Legion Memorial',
      panel:
        'DCM (Somme 1916), Russian Medal of St George (1916), Military Cross (Canal du Nord 1918)',
      tablet_inscription: 'E. E. CRUMMACK, 2ND LIEUT. M.C., D.C.M.',
      story:
        'Yorkshire coal miner who enlisted in 1914, fought at Festubert (1915), held the Yser Canal at Boesinghe facing the first phosgene gas attacks (1915), awarded the DCM and Russian Medal of St George on the Somme (1916) for rescuing 2nd Lt Marcus Goodall (friend of Siegfried Sassoon), commissioned from the ranks and awarded the Military Cross breaching the Hindenburg Line at the Canal du Nord (1918). Survived to become a revered community leader in Dinnington.',
      image: '/images/crummack/portrait_sgt_ernest_crummack_1916.jpg',
      visiting_location: 'Pupil Family Archive · Boesinghe & Somme Link',
      cwgc_verified: true,
      is_pupil_family: true,
      pupil_name: 'Aby (Year 10)',
    },
  ],
  workbooks: [],
  lessons: [
    {
      id: 'day_0',
      title: 'Pre-Trip Information & Parental Briefing',
      enquiry: 'Expedition Logistics, Kit List & Local Heritage Mission',
      banner: '/images/stubbington_names_3.jpg',
      teacher_notes: {
        primer:
          'The Pre-Trip Parental Briefing equips parents and pupils with essential practical, logistical, and historical framing ahead of the October expedition. It details our joint leadership with Mr James Garrett (The History Boys) alongside two accompanying Meoncross staff, clarifies all kit, catering, and currency requirements (€30–€40 cash), establishes our rooming and supervision timeline, and introduces the profound local heritage mission connecting Stubbington to Flanders.',
        objectives: [
          {
            objective:
              "Understand how frontline battlefield cemeteries formed, why hundreds of thousands became 'the missing', and how Sir Fabian Ware, Sir Edwin Lutyens, and the IWGC established the radical egalitarian design of the Commonwealth War Graves headstone.",
            primer:
              "Before pupils enter Essex Farm (the tour's first cemetery), gather them by the perimeter wall. Have them compare the pristine Portland headstones with archival evidence of frontline wooden crosses and churning artillery mud. Unpack the revolutionary democratic decision by Fabian Ware and Edwin Lutyens: that whether an aristocrat officer or a working-class teenager like Valentine Strudwick, every soldier receives an identical Portland stone with no repatriations allowed, and Kipling's universal words 'Known unto God'.",
            question:
              "Why did the Imperial War Graves Commission insist on completely identical headstones and ban wealthy families from repatriating their sons' bodies, and what does this reveal about post-war Britain's attitude towards equality in death?",
          },
          {
            objective:
              'Understand the essential weather preparation, dietary arrangements, and currency requirements for the 3-day Flanders expedition.',
            primer:
              'Walk parents and pupils through the kit checklist, explaining why broken-in boots, raincoats, and warm hats/gloves are mandatory for cold evening ceremonies at the Menin Gate, and why €30–€40 in cash is required for Friday and Saturday supermarket lunches.',
            question:
              'Why is thorough physical preparation—such as windproof layers and sturdy boots—essential to maintaining high academic and emotional engagement on battlefield sites?',
          },
          {
            objective:
              'Frame the personal historical mission connecting Stubbington and Lee-on-the-Solent to the memorial walls of Ypres.',
            primer:
              'Direct parents to the Crofton Parish Memorial Tablet and Lowry brothers story, demonstrating that pupils will be active historians carrying the names of our village fallen to Tyne Cot and the Menin Gate.',
            question:
              'How does tracing named soldiers from our own local community transform a battlefield visit from passive tourism into an act of active historical research and remembrance?',
          },
        ],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'Pre-Trip Briefing Timeline',
        events: [
          {
            year: '10th Sep',
            title: 'Parent Briefing Meeting',
            detail:
              '16:15 in the School Hall. Passports & GHIC cards collected; Medication forms distributed; WhatsApp group QR code shared; 24/7 Trip Mobile (07825 297749) established.',
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Joint Leadership & Official Briefing Resources',
          text: `
            <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #1e3a8a; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 5px rgba(0,0,0,0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                  <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #eff6ff; color: #1e3a8a; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 6px;">Joint Educational Venture</span>
                  <h3 style="margin: 0 0 6px 0; color: #0f172a; font-size: 1.3rem; font-family: 'Playfair Display', serif;">Meoncross School History Department &amp; The History Boys</h3>
                  <p style="margin: 0; color: #475569; font-size: 0.95rem; line-height: 1.5;">
                    Led jointly by <strong>Mr Ben Lovett</strong> (Head of History, Meoncross School) and <strong>Mr James Garrett</strong> (The History Boys Tour Company — expert battlefield historian and fellow history teacher), accompanied by <strong>two accompanying Meoncross staff</strong>. Together, they provide exceptional historical scholarship, pastoral care, and engaging on-site guidance.
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <a href="/pdfs/ypres_1914_1918_pupil_field_guide.pdf" target="_blank" class="btn" style="background: #eff6ff; color: #1e3a8a; border: 1.5px solid #93c5fd; padding: 8px 16px; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                  <i class="fa-solid fa-book-bookmark" style="color: #2563eb; font-size: 1.1rem;"></i> Download Pupil Field Guide (PDF)
                </a>
                <a href="/pdfs/ypres_1914_1918_teacher_companion.pdf" target="_blank" class="btn" style="background: #f5f3ff; color: #5b21b6; border: 1.5px solid #c4b5fd; padding: 8px 16px; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                  <i class="fa-solid fa-compass" style="color: #7c3aed; font-size: 1.1rem;"></i> Download Tour Leader Companion (PDF)
                </a>
                <a href="/pdfs/ypres_2026_parent_information_pack_v2.pdf" target="_blank" class="btn" style="background: #fefce8; color: #b45309; border: 1.5px solid #fde047; padding: 8px 16px; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                  <i class="fa-solid fa-file-pdf" style="color: #dc2626; font-size: 1.1rem;"></i> Download Parent Pack (PDF)
                </a>
                <a href="/briefings/ypres_2026_parent_briefing.pptx" download="ypres_2026_parent_briefing.pptx" target="_blank" class="btn" style="background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; padding: 8px 16px; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                  <i class="fa-solid fa-file-powerpoint" style="color: #ea580c; font-size: 1.1rem;"></i> Download Briefing Slides (.pptx)
                </a>
              </div>
            </div>
          `,
        },
        {
          type: 'narrative',
          theme_heading: 'Local Heritage: The Lowry Family & The Stubbington Fallen',
          text: `
            <div style="background: #fefce8; border: 1px solid #fef08a; border-left: 5px solid #d97706; border-radius: 8px; padding: 22px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 10px 0; color: #78350f; font-family: 'Playfair Display', serif; font-size: 1.35rem;">
                Connecting Our Village to the Memorial Walls of Flanders
              </h3>
              <p style="color: #451a03; font-size: 0.98rem; line-height: 1.6; margin: 0 0 14px 0;">
                Inside <strong>Holy Rood Church in Stubbington</strong>, carved into the marble Great War Memorial Tablet, are the names of three brothers from Manor Way Grange, Lee-on-the-Solent: <strong>William, Cyril, and Auriol (Eric) Lowry</strong>. All three gave their lives across different theaters of war.
              </p>
              <blockquote style="background: #ffffff; border-left: 4px solid #f59e0b; padding: 12px 18px; margin: 0 0 16px 0; border-radius: 4px; font-style: italic; color: #92400e; font-size: 1.05rem; line-height: 1.5;">
                "How did three sons from one coastal Hampshire family answer the call across Gallipoli, Arras, and the Somme—and how did six young men from our quiet village come to rest upon the ramparts and mud of Flanders?"
              </blockquote>
              <p style="color: #451a03; font-size: 0.95rem; line-height: 1.6; margin: 0;">
                On this tour, pupils will not be tourists. Each pupil will undertake a local historical study: locating and touching the carved names of our village fallen—including <strong>Private Franklin</strong> and <strong>Private Ayling</strong> on Menin Gate Panel 35, and <strong>Private Muckett</strong>, <strong>Private Rye</strong>, <strong>Lance Corporal Ward</strong>, and <strong>Private Warland</strong> on the rear curved panels of Tyne Cot.
              </p>
              
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px;">
                <div style="flex: 1; min-width: 140px; text-align: center; background: white; padding: 8px; border-radius: 6px; border: 1px solid #fde047;">
                  <img src="/images/stubbington_memorial_2.jpg" alt="Crofton Parish Memorial Tablet" style="max-width: 100%; height: 110px; object-fit: cover; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="/images/stubbington_memorial_2.jpg">
                  <small style="display: block; margin-top: 4px; font-weight: 700; color: #78350f;">Holy Rood Tablet</small>
                </div>
                <div style="flex: 1; min-width: 140px; text-align: center; background: white; padding: 8px; border-radius: 6px; border: 1px solid #fde047;">
                  <img src="/images/lowry_william.png" alt="2nd Lt William Lowry" style="max-width: 100%; height: 110px; object-fit: cover; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="/images/lowry_william.png">
                  <small style="display: block; margin-top: 4px; font-weight: 700; color: #78350f;">2nd Lt William Lowry (25)</small>
                </div>
                <div style="flex: 1; min-width: 140px; text-align: center; background: white; padding: 8px; border-radius: 6px; border: 1px solid #fde047;">
                  <img src="/images/lowry_cyril.png" alt="Capt Cyril Lowry" style="max-width: 100%; height: 110px; object-fit: cover; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="/images/lowry_cyril.png">
                  <small style="display: block; margin-top: 4px; font-weight: 700; color: #78350f;">Capt Cyril Lowry (20)</small>
                </div>
                <div style="flex: 1; min-width: 140px; text-align: center; background: white; padding: 8px; border-radius: 6px; border: 1px solid #fde047;">
                  <img src="/images/lowry_auriol.png" alt="Lt Col Eric Lowry" style="max-width: 100%; height: 110px; object-fit: cover; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="/images/lowry_auriol.png">
                  <small style="display: block; margin-top: 4px; font-weight: 700; color: #78350f;">Lt Col Eric Lowry, DSO, MC (25)</small>
                </div>
              </div>
            </div>
          `,
        },
        {
          type: 'narrative',
          theme_heading: 'Essential Kit Checklist & Weather Protection',
          text: `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
              <div style="background: white; border: 1.5px solid #cbd5e1; border-top: 4px solid #1e3a8a; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                <h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 1.05rem;"><i class="fa-solid fa-boot"></i> Footwear &amp; Sanctuary Wood Preparation</h4>
                <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 0.92rem; line-height: 1.55;">
                  <li><strong>Sanctuary Wood Trenches (Crucial):</strong> At Sanctuary Wood (Hill 62), pupils will walk through real, preserved, deep frontline trenches. These trenches are notoriously muddy and wet.</li>
                  <li><strong>Separate Pair of Shoes / Wellington Boots:</strong> Pupils <strong>MUST bring a separate pair of wellington boots or sturdy walking boots</strong> specifically for walking in the muddy trenches, plus a clean, separate pair of shoes/trainers to change into afterwards.</li>
                  <li><strong>Sturdy Plastic Bag (Essential):</strong> Every pupil must pack a strong plastic carrier bag (or bin bag) in their daypack to seal away their muddy, wet boots before re-boarding the coach and entering the hostel!</li>
                  <li><strong>Waterproof &amp; Windproof Raincoat:</strong> Hooded jacket. We tour regardless of light rain.</li>
                  <li><strong>Warm Fleece / Layers:</strong> Temperatures drop quickly on exposed ridges like Passchendaele.</li>
                  <li><strong>Warm Winter Hat &amp; Gloves:</strong> Mandatory! Standing still on stone ramparts during the 8:00 PM Menin Gate ceremony gets extremely cold in October.</li>
                  <li><strong>Socks:</strong> At least 4–5 pairs of thick walking socks.</li>
                </ul>
              </div>

              <div style="background: white; border: 1.5px solid #cbd5e1; border-top: 4px solid #b45309; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                <h4 style="margin: 0 0 8px 0; color: #b45309; font-size: 1.05rem;"><i class="fa-solid fa-suitcase-rolling"></i> Luggage, Towels &amp; Washbag</h4>
                <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 0.92rem; line-height: 1.55;">
                  <li><strong>TOWELS (Mandatory):</strong> Pupils <strong>MUST bring their own bath/shower towels</strong>! The hostel does not provide towels for school groups.</li>
                  <li><strong>Washbag &amp; Toiletries:</strong> Shower gel, shampoo, soap, toothbrush, toothpaste, and roll-on deodorant only (strictly NO aerosol sprays permitted on coach or in hostel rooms).</li>
                  <li><strong>1 Main Holdall / Medium Suitcase:</strong> Stored under coach during travel (max 15kg).</li>
                  <li><strong>1 Small Daypack (Rucksack):</strong> Kept on coach seats with student. Contains rain jacket, plastic bag for muddy boots, water bottle, Day 1 packed lunch, and notebook/pen.</li>
                  <li><strong>Comfortable Casual Clothing:</strong> Practical, comfortable clothing for hostel downtime (jeans, joggers, hoodies, t-shirts; no formal clothes needed).</li>
                  <li><strong>Mobile Phones:</strong> Permitted during the day; collected each evening in a dedicated staff phone bag at curfew for a restful night.</li>
                </ul>
              </div>
            </div>
          `,
        },
        {
          type: 'narrative',
          theme_heading: 'Catering, Food & Spending Money (Euros)',
          text: `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px;">
                <div>
                  <h4 style="margin: 0 0 8px 0; color: #0f172a; font-size: 1.05rem;"><i class="fa-solid fa-utensils" style="color: #0284c7;"></i> Meal Arrangements</h4>
                  <ul style="margin: 0; padding-left: 18px; color: #334155; font-size: 0.92rem; line-height: 1.5;">
                    <li><strong>Day 1 (Thursday):</strong> Pupils <strong>must bring a packed lunch and snacks from home</strong> for the coach journey. No fast food purchases at Eurotunnel/service stations.</li>
                    <li><strong>Buffet Breakfasts:</strong> Continental/buffet breakfast provided at Peace Village Hostel on Friday and Saturday mornings.</li>
                    <li><strong>Evening Dinners:</strong> Substantial 2-course hot group dinners served on-site at Peace Village Hostel accommodation on Thursday and Friday evenings.</li>
                    <li><strong>Days 2 &amp; 3 Lunches:</strong> Supermarket packed lunch stops in Belgium.</li>
                  </ul>
                </div>

                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 16px;">
                  <h4 style="margin: 0 0 6px 0; color: #92400e; font-size: 1.05rem;"><i class="fa-solid fa-euro-sign" style="color: #d97706;"></i> Spending Money (€30–€40 Euros Cash)</h4>
                  <p style="margin: 0; color: #78350f; font-size: 0.92rem; line-height: 1.5;">
                    Pupils require <strong>€30 to €40 in cash (Euros)</strong>. On Friday and Saturday, we make supervised stops at Belgian supermarkets where pupils purchase fresh sandwiches, drinks, and fruit for lunch. Remaining change can be used for small postcards, Belgian chocolates, or souvenirs.
                  </p>
                </div>
              </div>
            </div>
          `,
        },
        {
          type: 'narrative',
          theme_heading: 'Accommodation, Safety & Rooming Allocation Timeline',
          text: `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
                <h4 style="margin: 0; color: #1e3a8a; font-size: 1.05rem;"><i class="fa-solid fa-hotel"></i> Peace Village Hostel &amp; Supervision</h4>
                <a href="https://peacevillage.be/en/practical/faq" target="_blank" class="btn" style="background: #eff6ff; color: #1e3a8a; border: 1.5px solid #bfdbfe; padding: 5px 12px; border-radius: 6px; font-weight: 700; font-size: 0.8rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                  <i class="fa-solid fa-circle-question" style="color: #2563eb;"></i> View Hostel FAQs &amp; Facilities
                </a>
              </div>
              <p style="margin: 0 0 12px 0; color: #334155; font-size: 0.94rem; line-height: 1.6;">
                Located at <strong>Nieuwkerkestraat 9aB, 8957 Mesen, Belgium</strong> (Tel: +32 57 226 040 · Email: info@peacevillage.be). Peace Village is a purpose-built, secure educational centre set in the rural Flemish countryside at Messines with keycard access, modern en-suite studios (typically 4 to 7 pupils per room with bunk beds), and private recreational grounds.
              </p>
              
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 14px; margin-bottom: 14px;">
                <strong style="color: #166534; font-size: 0.95rem; display: block; margin-bottom: 4px;">📅 Rooming &amp; Dietary Process (Approx. Two Weeks):</strong>
                <p style="margin: 0; color: #1e293b; font-size: 0.9rem; line-height: 1.5;">
                  Pupils will complete rooming friend preference requests and confirm dietary options (e.g. vegetarian evening meals) in school in approximately two weeks' time (all medical allergies are already logged on school records). Mr Lovett and staff will review all choices to ensure every pupil is happily placed with close friends in a comfortable, supportive room. Staff sleep on the same corridors with active evening checks and a strict lights-out policy.
                </p>
              </div>

              <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 14px;">
                <strong style="color: #991b1b; font-size: 0.95rem; display: block; margin-bottom: 4px;">📋 Code of Conduct &amp; Passport Collection:</strong>
                <p style="margin: 0; color: #7f1d1d; font-size: 0.9rem; line-height: 1.5;">
                  All pupils and parents must sign and return the <strong>Code of Conduct Agreement Form</strong> by <strong>Friday 25th September</strong>. Passports (with >3 months validity) and valid GHIC/EHIC cards will be collected in advance tonight at the Parental Briefing meeting (or to the School Office this week).
                </p>
              </div>
            </div>
          `,
        },
        {
          type: 'narrative',
          theme_heading: '24/7 Trip Mobile, Medical Protocols & Trip WhatsApp Group',
          text: `
            <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #dc2626; border-radius: 8px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 5px rgba(0,0,0,0.04);">
              <h3 style="margin: 0 0 14px 0; color: #0f172a; font-family: 'Playfair Display', serif; font-size: 1.3rem;">
                Emergency Communications, Medical Safety &amp; Live Tour Updates
              </h3>

              <div style="background: #fef2f2; border: 1.5px solid #f87171; border-radius: 8px; padding: 16px 20px; margin-bottom: 18px;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
                  <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 6px;">
                    <i class="fa-solid fa-phone-volume"></i> 24/7 Emergency Line
                  </span>
                  <strong style="color: #991b1b; font-size: 1.25rem; font-family: monospace;">07825 297749 <span style="font-size: 0.9rem; font-weight: 500; color: #b91c1c;">(+44 7825 297749)</span></strong>
                </div>
                <p style="margin: 0 0 8px 0; color: #7f1d1d; font-size: 0.95rem; line-height: 1.55;">
                  <strong>Dedicated On-Tour Trip Mobile:</strong> This dedicated phone is held directly by tour leadership at all times during the expedition. It is the number parents can call in a genuine emergency, <em>and crucially, it is also the exact number that staff will call you from</em> if we need to get in touch.
                </p>
                <div style="background: #ffffff; border-left: 3px solid #dc2626; padding: 8px 12px; border-radius: 4px; color: #991b1b; font-size: 0.88rem; font-weight: 600;">
                  ⚠️ Mandatory Requirement: A parent or nominated emergency contact MUST remain contactable 24/7 on your provided mobile numbers throughout the duration of the trip.
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-top: 4px solid #16a34a; border-radius: 8px; padding: 16px;">
                  <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 1.05rem;">
                    <i class="fa-solid fa-pills"></i> Medication Forms &amp; Packaging Rules
                  </h4>
                  <p style="margin: 0 0 10px 0; color: #1e293b; font-size: 0.9rem; line-height: 1.55;">
                    Formal <strong>Medication Administration Forms</strong> are being provided tonight at the briefing (Thursday 10th September).
                  </p>
                  <ul style="margin: 0; padding-left: 18px; color: #1e293b; font-size: 0.88rem; line-height: 1.55;">
                    <li><strong>Original Packaging Mandatory:</strong> Any medication brought on the trip (prescribed or over-the-counter) must be in its original packaging with original leaflet.</li>
                    <li><strong>Prescription Label:</strong> Prescribed items must clearly show the pharmacy dispensary label with the <strong>child's name, exact dosage, and administration instructions</strong>.</li>
                    <li><strong>Handover:</strong> Hand in medication with completed forms to staff at coach departure.</li>
                  </ul>
                </div>

                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-top: 4px solid #2563eb; border-radius: 8px; padding: 16px;">
                  <h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 1.05rem;">
                    <i class="fa-brands fa-whatsapp" style="color: #25d366;"></i> Trip WhatsApp Broadcast Group
                  </h4>
                  <p style="margin: 0 0 10px 0; color: #1e293b; font-size: 0.9rem; line-height: 1.55;">
                    We are setting up a private, closed <strong>Trip WhatsApp Group</strong> (joining link and QR code provided on the phone) so tour leaders can share regular updates and photos.
                  </p>
                  <ul style="margin: 0; padding-left: 18px; color: #1e293b; font-size: 0.88rem; line-height: 1.55;">
                    <li><strong>Updates &amp; Photos:</strong> Follow daily visits, travel timings, and cemetery visits as they happen.</li>
                    <li><strong>Broadcast Only:</strong> Not for general chatter, but parents are warmly encouraged to react to posts and photos (like, love, etc.).</li>
                    <li><strong>Photo Consent:</strong> If any child does not have general school photo consent, staff will speak with parents to confirm whether you are happy for photos to be shared within this private closed group.</li>
                  </ul>
                </div>
              </div>
            </div>
          `,
        },
      ],
    },
    {
      id: 'day_1',
      title: 'Day 1: Thursday 1st October 2026',
      enquiry: 'Travel and Initial Explorations',
      poetry_dossiers: poetryDossiers.day_1,
      teacher_notes: {
        primer:
          'Day 1 transitions students from home into the contested landscape of the Ypres Salient, focusing on frontline medical triage at Essex Farm, the solemnity and political manipulation of memory at Langemarck German Cemetery, and the raw physical conditions of trench warfare at Hooge Crater.',
        objectives: [
          {
            objective:
              "Examine the role of Advanced Dressing Stations and analyze how John McCrae's 'In Flanders Fields' captured the immediate human cost of Second Ypres.",
            primer:
              "Guide pupils into the concrete dugouts at Essex Farm, highlighting triage and the writing of the poem after Alexis Helmer's funeral. Contrast McCrae's poetic grief with the physical claustrophobia of the bunker.",
            question:
              "Why did McCrae's poem, written beside an Advanced Dressing Station dugout, become the global symbol of remembrance rather than an anti-war protest?",
          },
          {
            objective:
              "Evaluate the contrast between Allied and German memorial architecture and unpack the weaponization of the 'Langemarck Myth'.",
            primer:
              'Direct pupils to the Kameradengrab and bronze panels at Langemarck. Have them examine how the German High Command and later the Nazi regime twisted a tactical failure into a myth of heroic student sacrifice.',
            question:
              'How does the somber, dark basalt architecture of Langemarck tell a fundamentally different political story from British Commonwealth cemeteries?',
          },
          {
            objective:
              'Understand the extreme physical reality and trauma of living in frontline craters and waterlogged trenches at Hooge.',
            primer:
              'Walk the preserved trench lines at Hooge Crater, discussing how underground mine detonations transformed warfare and how the high water table caused rampant trench foot.',
            question:
              'What does the proximity of opposing trenches at Hooge Crater reveal about the psychological toll of static warfare?',
          },
        ],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'Day 1 Itinerary',
        events: [
          {
            year: '06:15',
            title: 'Departure from School',
            detail: 'Travel via Jet Connect executive coach to Folkestone.',
            lat: 50.8268,
            lng: -1.2185,
          },
          {
            year: '09:00',
            title: 'Folkestone Eurotunnel Terminal',
            detail: 'Check-in and security boarding.',
            lat: 51.0964,
            lng: 1.127,
          },
          {
            year: '11:20',
            title: 'Eurotunnel Crossing',
            detail: 'Transit to Calais (clocks go forward 1 hour).',
          },
          {
            year: '13:00',
            title: 'Depart Calais',
            detail: 'Coach journey to the Ypres Salient.',
          },
          {
            year: '14:30',
            title: 'Essex Farm Cemetery & Dressing Station',
            detail: 'Historical introduction to wartime medical care and Commonwealth war graves.',
            lat: 50.871,
            lng: 2.872,
          },
          {
            year: '15:15',
            title: 'Langemarck German Military Cemetery',
            detail: 'Guided visit exploring the contrasting design of German burial sites.',
            lat: 50.916,
            lng: 2.918,
          },
          {
            year: '16:00',
            title: 'Hooge Crater Museum & Trenches',
            detail:
              "Museum visit focusing on First World War artefacts, preserved trenches, and field medicine. <a href='https://www.hoogecrater.com/en/' target='_blank' style='color:#3b82f6;text-decoration:underline;'>Visit official website</a>.",
            lat: 50.846,
            lng: 2.944,
          },
          {
            year: '17:45',
            title: 'Arrival at Peace Village',
            detail:
              "Accommodation check-in and safety briefing. <a href='https://www.peacevillage.be/en' target='_blank' style='color:#3b82f6;text-decoration:underline;'>View hostel details</a>.",
            lat: 50.763,
            lng: 2.887,
          },
          {
            year: '18:15',
            title: 'Evening Meal',
            detail: 'Dinner followed by room allocation and settling in.',
          },
          {
            year: '19:15',
            title: 'Study & Reflection Session',
            detail: 'Guided review and workbook completion.',
          },
          {
            year: '20:15',
            title: 'Supervised Free Time',
            detail: 'Downtime in communal areas.',
          },
          {
            year: '22:00',
            title: 'Curfew & Room Checks',
            detail: 'All students in rooms for the night.',
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Historical Context: The Ypres Salient',
          text: "The Ypres Salient was a bulge in the Allied frontline that surrounded the Belgian town of Ypres. Because it was a salient, British and Commonwealth troops were surrounded by German artillery on three sides, making it one of the most dangerous places on earth. Ypres was the last major Belgian town not to fall to the Germans, making it a powerful symbol of resistance.<br><br><strong>Key Facts:</strong><ul><li>Over half a million soldiers died defending a strip of land barely ten miles wide.</li><li>The Salient consisted of thick, heavy clay that, when bombarded by artillery, turned into a deadly, bottomless mud.</li><li>Five major battles were fought here between 1914 and 1918.</li></ul><br><blockquote><strong>Written Source:</strong><br><em>\"I am no longer an artist interested and curious, I am a messenger who will bring back word from the men who are fighting to those who want the war to go on for ever. It is unspeakable, godless, hopeless.\"</em><br>— <strong>Paul Nash</strong>, British War Artist (1917)</blockquote><div style='text-align: center; margin-top: 15px;'><img src='/images/menin_road_nash.jpg' style='max-width: 100%; border-radius: 6px; border: 1px solid #ccc;' alt='The Menin Road by Paul Nash'></div>",
        },
        {
          type: 'narrative',
          theme_heading:
            'Before the First Cemetery: How War Graves Formed & The Anatomy of a CWGC Headstone',
          text: `<div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #0284c7; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">Essential Field Context · Stop 1 Preparation</span>
  <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1.35rem; font-family: 'Playfair Display', serif;">The Evolution of War Graves: From Battlefield Chaos to Radical Equality</h3>
  <p style="margin: 0; color: #334155; font-size: 0.95rem; line-height: 1.65;">
    As your coach arrives at Essex Farm—the very first Commonwealth cemetery on our pilgrimage—you will look out upon silent, immaculate rows of brilliant white Portland stone. But during the Great War, this peaceful sanctuary did not exist. To truly understand what you are seeing, you must first understand how cemeteries formed amidst the mud, why over half of our soldiers have no known grave, and why the shape of every single British headstone was designed as an instrument of total social equality.
  </p>
</div>

<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <div style="flex: 1; min-width: 280px;">
      <h4 style="margin: 0 0 12px 0; color: #7f1d1d; font-size: 1.2rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-cross" style="color: #991b1b;"></i> 1. The Chaos of Frontline Burials &amp; The Tragedy of "The Missing"
      </h4>
      <p style="color: #334155; font-size: 0.93rem; line-height: 1.65; margin-bottom: 12px;">
        During active combat, dignified burial was nearly impossible. When soldiers fell in the trenches or out in No Man's Land, comrades or pioneer burial parties worked by night in suffocating darkness under sniper fire and mortar flares. Shallow graves were scooped out of trench parapets, shell craters, or roadside verges.
      </p>
      <ul style="color: #334155; font-size: 0.92rem; line-height: 1.65; margin: 0 0 14px 0; padding-left: 20px;">
        <li><strong>Identity Discs:</strong> Every British Tommy wore two vulcanised fibre tags around his neck: a red octagonal disc and a green circular disc. When a soldier died, the red disc was snapped off and sent back to the War Office to confirm the death; the green disc was left on the body for future identification.</li>
        <li><strong>Makeshift Wooden Crosses:</strong> Graves were marked with crude crosses fashioned from ammunition boxes, ration crates, or barbed wire pickets. Names and battalion numbers were scrawled in indelible pencil or stamped onto thin zinc strips.</li>
        <li><strong>The Churn of Artillery:</strong> Over <strong>one billion artillery shells</strong> were fired across the Western Front. High-explosive barrages continuously pounded and churned the same ground for four years. Shellfire repeatedly blasted temporary cemeteries to splinters, obliterated wooden crosses, and swallowed remains into bottomless liquid clay. This explains why <strong>over 54,000 men on the Menin Gate and 34,000 at Tyne Cot have no known grave</strong>.</li>
        <li><strong>The Post-War Search:</strong> Between 1919 and 1921, special military "Exhumation &amp; Concentration Companies" systematically swept the Salient on foot, using wire probes to locate isolated graves and re-inter the fallen into permanent concentration cemeteries.</li>
      </ul>
    </div>
    <div style="flex: 0 0 320px; max-width: 100%; text-align: center;">
      <img src="/images/ww1_wooden_crosses.jpg" alt="Temporary WW1 wooden crosses in mud" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" />
      <small style="display: block; margin-top: 8px; color: #64748b; font-size: 0.8rem; line-height: 1.35; text-align: left;">
        <strong>Archival Primary Source:</strong> Temporary wooden crosses marking graves of the 8th South Staffordshire Regiment beside a waterlogged shell crater in France (National Library of Scotland archival collection). Notice the crude cross for Pte F.W. Dicken, standing precariously in the mud.
      </small>
    </div>
  </div>
</div>

<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <div style="flex: 0 0 320px; max-width: 100%; text-align: center;">
      <img src="/images/fabian_ware.jpg" alt="Sir Fabian Ware with King George V at Tyne Cot 1922" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" />
      <small style="display: block; margin-top: 8px; color: #64748b; font-size: 0.8rem; line-height: 1.35; text-align: left;">
        <strong>Archival Primary Source:</strong> Sir Fabian Ware (left, holding papers and walking stick) showing King George V around battlefield wooden crosses during the historic 1922 Royal Pilgrimage to Tyne Cot Cemetery.
      </small>
    </div>
    <div style="flex: 1; min-width: 280px;">
      <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 1.2rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-scale-balanced" style="color: #0284c7;"></i> 2. Sir Fabian Ware &amp; The Radical Philosophy of "Equality in Death"
      </h4>
      <p style="color: #334155; font-size: 0.93rem; line-height: 1.65; margin-bottom: 12px;">
        In 1914, 45-year-old <strong>Fabian Ware</strong> was too old to enlist as a combat soldier. Instead, he took command of a mobile British Red Cross ambulance unit. Appalled that thousands of men were dying and being buried without any official record, Ware began cataloguing every grave he could find. In 1917, King George V granted a Royal Charter founding the <strong>Imperial War Graves Commission (IWGC)</strong>, with Ware as Vice-Chairman.
      </p>
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px; border-radius: 4px; margin-bottom: 12px;">
        <strong style="color: #166534; font-size: 0.95rem;">The Three Revolutionary Principles:</strong>
        <ol style="margin: 6px 0 0 0; padding-left: 20px; color: #1e293b; font-size: 0.9rem; line-height: 1.6;">
          <li><strong>Absolute Equality in Death:</strong> Regardless of rank, title, social class, wealth, or religion, every fallen soldier would receive the exact same headstone, of identical size, stone, and dignity. A Brigadier-General stands shoulder-to-shoulder with a 15-year-old Private.</li>
          <li><strong>Strict Ban on Repatriation:</strong> Wealthy aristocrats fiercely demanded the right to exhume their sons and transport them back to family crypts in England. Ware and Parliament refused. Repatriation was banned so that the wealthy could not purchase a privilege impossible for the poor. All men who fought together would lie together forever.</li>
          <li><strong>Universal Commemoration:</strong> Every missing soldier whose body was lost or unidentifiable must have their name carved forever upon a permanent stone memorial.</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <div style="flex: 1; min-width: 280px;">
      <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 1.2rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-compass-drafting" style="color: #d97706;"></i> 3. The Master Architects &amp; Literary Giants
      </h4>
      <p style="color: #334155; font-size: 0.93rem; line-height: 1.65; margin-bottom: 12px;">
        To turn Ware's vision into permanent stone, the Commission recruited Britain's greatest artistic and architectural minds:
      </p>
      <ul style="color: #334155; font-size: 0.92rem; line-height: 1.65; margin: 0; padding-left: 20px;">
        <li><strong>Sir Edwin Lutyens (Lead Architect):</strong> Designed the elegant curved silhouette of the standard war headstone, carefully proportioned to create rhythmic, unified vistas across rolling cemetery turf. Lutyens also designed the secular, universal <strong>Stone of Remembrance</strong> ("The Great War Stone") placed in larger cemeteries—a massive Portland monolith designed with subtle optical curves (entasis) to appear perfectly straight to the human eye, honouring men of all faiths or none.</li>
        <li><strong>Sir Reginald Blomfield:</strong> Designed the soaring <strong>Cross of Sacrifice</strong>—a gleaming Portland stone Latin cross bearing a downward-pointing bronze crusader sword, present in every cemetery with more than 40 graves. Blomfield was also the master architect of the <strong>Menin Gate Memorial</strong>.</li>
        <li><strong>Rudyard Kipling (Literary Advisor):</strong> The world-famous author lost his only son, 18-year-old Lieutenant John Kipling, at the Battle of Loos in 1915 (his body was never found during Kipling's lifetime). Channelling a nation's heartbreak, Kipling personally chose the defining words carved into the stone:
          <div style="margin: 8px 0; font-family: 'Georgia', serif; font-style: italic; color: #1e293b; background: #f8fafc; padding: 10px 14px; border-radius: 4px; border-left: 3px solid #64748b;">
            • "KNOWN UNTO GOD" (for every unidentified headstone)<br>
            • "THEIR NAME LIVETH FOR EVERMORE" (carved into every Stone of Remembrance)<br>
            • "A SOLDIER OF THE GREAT WAR" (at the top of unknown graves)
          </div>
        </li>
      </ul>
    </div>
    <div style="flex: 0 0 240px; max-width: 100%; text-align: center;">
      <img src="/images/edwin_lutyens.jpg" alt="Sir Edwin Lutyens" style="width: 100%; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" />
      <small style="display: block; margin-top: 8px; color: #64748b; font-size: 0.8rem; line-height: 1.35; text-align: left;">
        <strong>Sir Edwin Lutyens (1869–1944):</strong> Principal Architect to the IWGC. He insisted on the curved Portland stone headstone and designed the non-denominational Stone of Remembrance.
      </small>
    </div>
  </div>
</div>

<div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <h4 style="margin: 0 0 16px 0; color: #0f172a; font-size: 1.25rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 8px;">
    <i class="fa-solid fa-monument" style="color: #475569;"></i> 4. Interactive Field Guide: Anatomy of a British Commonwealth Headstone
  </h4>
  <p style="color: #334155; font-size: 0.95rem; line-height: 1.65; margin-bottom: 18px;">
    Every standard Commonwealth War Graves headstone is carved from white <strong>Portland limestone</strong>, measuring precisely <strong>2 feet 6 inches (76 cm) tall</strong>, <strong>1 foot 3 inches (38 cm) wide</strong>, and <strong>3 inches (7.5 cm) thick</strong>. When you stand in front of any headstone today, observe how it is structured into four distinct vertical zones:
  </p>

  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; margin-bottom: 20px;">
    <div style="flex: 0 0 260px; max-width: 100%; text-align: center; background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
      <img src="/images/cwgc_stonecarver.jpg" alt="Stonemason carving headstone in 1920s" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 8px;" />
      <small style="color: #64748b; font-size: 0.78rem; line-height: 1.3; display: block; text-align: left;">
        <strong>Hand-Crafted Honour (1920s):</strong> A Graves Registration Unit stonemason hand-carving a regimental crest into Portland limestone. In the early years, each crest required up to a week of meticulous chisel work.
      </small>
    </div>

    <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 12px;">
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #d97706; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #b45309; font-size: 0.95rem;">Zone 1: Regimental Crest / National Badge</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          Carved into the curved arch at the very top. Represents the soldier's regiment, naval division, flying corps, or Dominion nation (e.g., the Hampshire Regiment rose, Royal Artillery gun, or Canadian Maple Leaf).
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #1d4ed8; font-size: 0.95rem;">Zone 2: Service Particulars &amp; Identity</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          Service number, rank, initials, full surname, and any gallantry decorations (e.g., VC, MM, MC). Beneath this appears the soldier's unit, followed by the exact date of death and age (e.g., <em>"5414 Private V. J. Strudwick · 8th Bn. Rifle Brigade · 14th January 1916 · Age 15"</em>).
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #16a34a; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #15803d; font-size: 0.95rem;">Zone 3: Religious or Personal Emblem</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          Carved in the center of the stone. A Christian Latin cross, Star of David, Islamic crescent, or Hindu/Sikh text. Families could request this space be left blank if the soldier was non-religious.
        </p>
      </div>

      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #7c3aed; padding: 12px 16px; border-radius: 4px;">
        <strong style="color: #6d28d9; font-size: 0.95rem;">Zone 4: Personal Family Inscription (Base)</strong>
        <p style="margin: 4px 0 0 0; color: #334155; font-size: 0.88rem; line-height: 1.5;">
          A personal epitaph of up to 66 characters chosen by grieving parents or widows. Although the Commission initially asked for 3.5 pence per letter to offset costs, Ware ensured all fees were waived for impoverished working-class families.
        </p>
      </div>
    </div>

    <div style="flex: 0 0 240px; max-width: 100%; text-align: center; background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
      <img src="/images/cwgc_headstone_essex_farm.jpg" alt="A Soldier of the Great War headstone at Essex Farm" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 8px;" />
      <small style="color: #64748b; font-size: 0.78rem; line-height: 1.3; display: block; text-align: left;">
        <strong>The Unknown Warrior:</strong> Photographed directly at Essex Farm Cemetery. Where a body could not be identified, Kipling's words stand forever: <em>"A Soldier of the Great War · Known unto God"</em>.
      </small>
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 6px; padding: 14px 18px; border: 1px dashed #94a3b8;">
    <strong style="color: #0f172a; font-size: 0.92rem;"><i class="fa-solid fa-magnifying-glass" style="color: #2563eb; margin-right: 6px;"></i> Field Challenge for Pupils:</strong>
    <span style="color: #334155; font-size: 0.88rem; line-height: 1.5;">
      As you walk into Essex Farm, choose three adjacent headstones. Check if you can find an officer and a private. Notice that despite differences in military rank in life, their stone monuments in death are millimeter-identical.
    </span>
  </div>
</div>`,
        },
        {
          type: 'narrative',
          theme_heading: 'Essex Farm & The Advanced Dressing Station',
          text: '<div class="source-box" style="text-align: center; margin-bottom: 20px;"><img src="/images/ypres_essex_farm.jpg" style="max-width: 100%; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" alt="Essex Farm Advanced Dressing Station dugouts"/><br><small style="color: #64748b;">The concrete Advanced Dressing Station bunkers at Essex Farm along the Yser Canal</small></div>Essex Farm served as an Advanced Dressing Station (ADS). Medical officers worked in cramped, concrete dugouts just hundreds of yards from the fighting to stabilize the wounded before they could be evacuated to casualty clearing stations further back.<br><br><strong>Key Medical Facts:</strong><ul><li><strong>Triage in the Mud:</strong> Doctors sorted bleeding casualties into three distinct categories: those who could return to duty, those needing urgent surgical intervention, and those mortally wounded beyond help.</li><li><strong>Cramped Survival:</strong> The damp concrete bunkers had ceilings barely six feet high and were lit only by flickering lanterns, with shellfire constantly shaking dust into open wounds.</li><li><strong>The Youngest Fallen:</strong> Valentine Joe Strudwick, one of the youngest Commonwealth soldiers killed on the Western Front at just 15 years of age (having enlisted at 14), lies buried in Plot I, Row G, Grave 12.</li></ul><br><div class="poet-eyewitness-card" style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #b91c1c; border-radius: 8px; padding: 22px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><div class="poet-grid" style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;"><div class="poet-portrait" style="flex: 0 0 150px; text-align: center;"><img src="/images/john_mccrae.jpg" alt="Lieutenant Colonel John McCrae" style="width: 150px; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" /><small style="display: block; margin-top: 6px; color: #64748b; font-size: 0.8rem; line-height: 1.3;">Lt Col John McCrae<br>(1872–1918)</small></div><div class="poet-bio" style="flex: 1; min-width: 250px;"><span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">Poet Profile &amp; Eyewitness</span><h3 style="margin: 0 0 8px 0; color: #7f1d1d; font-size: 1.25rem; font-family: \'Playfair Display\', serif;">Lieutenant Colonel John McCrae</h3><p style="margin: 0 0 10px 0; color: #334155; font-size: 0.93rem; line-height: 1.6;">Born in Guelph, Ontario, John McCrae was an accomplished Canadian physician, consulting pathologist, and veteran of the South African War. In 1914, he volunteered at age 41 and was appointed brigade surgeon to the 1st Brigade Canadian Field Artillery. Stationed here at Essex Farm during the Second Battle of Ypres (April–May 1915), McCrae endured 17 consecutive days treating hundreds of grievously wounded men under relentless German bombardment and chlorine gas attacks.<br><br>On 2nd May 1915, his former student and close friend, 22-year-old Lieutenant Alexis Helmer, was killed instantly by an 8-inch high-explosive shell. With no chaplain present, McCrae recited the burial service from memory by lantern light. The following morning, sitting on the step of an ambulance overlooking wild scarlet poppies growing amidst the wooden crosses, he composed <em>In Flanders Fields</em>. McCrae died of pneumonia and meningitis on active duty in January 1918 and is buried at Wimereux.</p></div></div><div class="poem-section" style="margin-top: 18px; padding-top: 18px; border-top: 1px solid #e2e8f0;"><h4 class="poem-title" style="margin: 0 0 12px 0; color: #1e293b; font-size: 1.15rem; font-family: \'Playfair Display\', serif;"><span><i class="fa-solid fa-feather-pointed" style="color: #b91c1c; margin-right: 6px;"></i><em>In Flanders Fields</em></span> <span class="poem-subtitle">(Complete Poem · May 1915)</span></h4><blockquote class="poem-blockquote" style="background: #ffffff; border-left: 4px solid #b91c1c; padding: 18px 22px; border-radius: 4px; font-family: \'Georgia\', serif; font-size: 1.02rem; line-height: 1.8; color: #1e293b; margin: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">In Flanders fields the poppies blow<br>Between the crosses, row on row,<br><span style="display: inline-block; width: 1.2rem;"></span>That mark our place; and in the sky<br><span style="display: inline-block; width: 1.2rem;"></span>The larks, still bravely singing, fly<br>Scarce heard amid the guns below.<br><br>We are the Dead. Short days ago<br>We lived, felt dawn, saw sunset glow,<br><span style="display: inline-block; width: 1.2rem;"></span>Loved and were loved, and now we lie,<br><span style="display: inline-block; width: 2.2rem;"></span>In Flanders fields.<br><br>Take up our quarrel with the foe:<br>To you from failing hands we throw<br><span style="display: inline-block; width: 1.2rem;"></span>The torch; be yours to hold it high.<br><span style="display: inline-block; width: 1.2rem;"></span>If ye break faith with us who die<br>We shall not sleep, though poppies grow<br><span style="display: inline-block; width: 2.2rem;"></span>In Flanders fields.<br><div class="poem-attribution" style="text-align: right; margin-top: 10px; font-family: sans-serif; font-size: 0.85rem; color: #64748b; font-weight: 600;">— <strong>Lieutenant Colonel John McCrae</strong>, Canadian Army Medical Corps (composed at Essex Farm)</div></blockquote></div></div><div style="background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 8px; padding: 18px 22px; margin-top: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);"><div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;"><span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #fbbf24; color: #78350f; padding: 2px 8px; border-radius: 10px;">Meoncross Pupil Family Record · Boesinghe Canal Line</span><span style="font-size: 0.78rem; font-weight: 700; color: #b45309;">Aby (Year 10) Family History</span></div><p style="margin: 0 0 10px 0; color: #451a03; font-size: 0.92rem; line-height: 1.5;"><strong>Look North Along the Canal Bank:</strong> Standing by the concrete bunkers of Essex Farm, gaze north along the Yser Canal towards Boesinghe. Here in 1915, <strong>2nd Lieutenant Ernest Edward Crummack MC, DCM</strong>—the great-great-grandfather of Year 10 classmate <strong>Aby</strong>—held the frontline in "The Northern Nip" with the 1/5th York &amp; Lancaster Regiment. On 19 December 1915, his unit stood firm against the German army\'s first mass Phosgene gas attack, earning him promotion to Sergeant before he went on to win the DCM on the Somme and the Military Cross at Canal du Nord.</p><div style="text-align: right;"><button class="btn" onclick="window.renderLessonByIndex(13)" style="padding: 6px 14px; font-size: 0.8rem; font-weight: 700; background: #d97706; color: #ffffff; border: 1.5px solid #b45309; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(217, 119, 6, 0.2);">Read 2nd Lt Crummack\'s Complete Dossier &rarr;</button></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Langemarck German War Cemetery',
          text: 'Unlike the bright, white Portland stone of British cemeteries, German cemeteries like Langemarck are intentionally somber, shaded by large oak trees and featuring dark stone blocks, reflecting Germanic mourning traditions.<br><br><strong>The Langemarck Student Myth:</strong><br><em>The Heroic Propaganda:</em> The German High Command claimed that thousands of young, patriotic student volunteers advanced fearlessly on enemy lines singing \'Deutschland über alles\'. They were portrayed as the ultimate heroes who joyfully gave their lives for the Fatherland.<br><br><em>The Tragic Reality:</em> These volunteers were woefully untrained and poorly equipped. Instead of a glorious charge, they were marched blindly into devastating British machine-gun fire. Thousands were slaughtered needlessly in what became known as the \'Massacre of the Innocents of Ypres\'.<br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: The Individuals</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-magnifying-glass"></i> Look at the names on the bronze oak panels. Remember that every German soldier in the mass grave had a story and family back home.</p></div></div>',
        },
        {
          type: 'flip_card_gallery',
          cards: [
            {
              name: 'Leutnant Werner Voss',
              background: 'WWI Fighter Ace & Pour le Mérite winner.',
              story:
                'Killed in an epic dogfight against seven British SE5s. Because his grave was lost, he is commemorated on the bronze panels and lies somewhere among the unknowns.',
            },
            {
              name: 'Oberst (Colonel) Julius von List',
              background: "Adolf Hitler's First Regimental Commander.",
              story:
                'List commanded the Bavarian 16th Reserve Infantry Regiment, in which a young Adolf Hitler served as a dispatch runner. Killed at Gheluvelt in October 1914, his remains were later moved to the Langemarck Kameradengrab (mass grave).',
            },
            {
              name: "The 7,977 'Unknowns'",
              background: 'Unidentified German Soldiers.',
              story:
                'Of the nearly 25,000 men buried in the Kameradengrab (mass grave) at the cemetery entrance, 7,977 remain completely unidentified. Their presence stands as a haunting testament to the mechanized scale of slaughter on the Western Front.',
            },
            {
              name: "The 3,000 'Student Volunteers'",
              background: 'The Kriegsfreiwilliger of 1914.',
              story:
                "Poorly trained German schoolboys and university students killed during the First Battle of Ypres. Their slaughter was romanticized by German propaganda, earning Langemark the nickname 'Studentenfriedhof' (Student Cemetery).",
            },
            {
              name: 'Private Albert Carlill',
              background: '1st/4th Bn. Loyal North Lancashire Reg.',
              story:
                'One of only two British soldiers buried in this German military cemetery. He died on November 4, 1918, aged 19, serving as a rare reminder of shared tragedy across enemy lines.',
            },
            {
              name: 'Private Leonard H. Lockley',
              background: '4th Bn. Seaforth Highlanders.',
              story:
                "The second British Tommy buried at Langemark, killed on October 30, 1918. His name, alongside Carlill's, is recorded on a plaque near the entrance, resting permanently among former foes.",
            },
            {
              name: "The 17,342 'Knowns'",
              background: 'The Kameradengrab (Mass Grave).',
              story:
                'While your existing card covers the unknowns, this single mass grave holds 24,917 bodies in total. The names of the 17,342 identified soldiers are cast on bronze steles surrounding the perimeter.',
            },
            {
              name: 'The April 1915 Casualties',
              background: 'The Second Battle of Ypres.',
              story:
                'Langemark was the site of the first major poison gas attack on the Western Front. Many German soldiers buried here died in the chaotic offensives that immediately followed the release of the gas.',
            },
            {
              name: "Harry Patch's 'Unknown'",
              background: 'A symbol of reconciliation.',
              story:
                "In 2008, Harry Patch, the last surviving British trench veteran, visited the cemetery. He laid a wreath on the grave of a German soldier killed on August 16, 1917—the exact day Patch's unit fought at Langemark.",
            },
          ],
        },
        {
          type: 'narrative',
          theme_heading: 'The Weaponization of Memory: The Langemarck Myth',
          text: '<div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 5px solid #059669; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-top: 10px;"><p style="font-size: 1.1rem; color: #1e293b;">The Nazi regime weaponized the \'Langemarck Myth\' to bridge the humiliation of 1918 with the militarism of the Third Reich, transforming a World War I military failure into a cult of youth sacrifice. Hitler exploited the site to legitimize his own regime, presenting himself as the fulfillment of the students\' uncompleted mission.</p><ul style="list-style-type: none; padding-left: 0; margin-top: 20px;"><li style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;"><strong style="color: #0f172a; font-size: 1.1rem;"><i class="fa-solid fa-scroll" style="color: #059669; margin-right: 10px;"></i> Primary Source: The Official 1914 Fabrication</strong><br><span style="color: #334155;">The entire Langemarck myth originates from a single, highly manipulated press release. On November 11, 1914, the German Supreme Army Command (<i>Oberste Heeresleitung</i> or OHL) needed to distract the German public from a devastating tactical failure and a massive loss of life. They issued an official communiqué that intentionally fabricated a romanticized narrative of youthful, willing sacrifice:</span><br><br><blockquote style="margin-top: 10px; margin-bottom: 10px;">"We made good progress yesterday in the Yser section. West of Langemarck young regiments broke forward with the song <i>\'Deutschland, Deutschland über alles\'</i> against the front line of enemy positions and took them."<br>— <strong>Official Communiqué of the German Supreme Army Command (OHL), 11 November 1914</strong></blockquote></li><li style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e2e8f0;"><strong style="color: #0f172a; font-size: 1.1rem;"><i class="fa-solid fa-book-skull" style="color: #059669; margin-right: 10px;"></i> Primary Source: Adolf Hitler’s Weaponization</strong><br><span style="color: #334155;">A decade later, Adolf Hitler hijacked this fabricated story to lay the psychological groundwork for the next war. In his 1925 manifesto, Hitler inserted himself directly into the Langemarck narrative, twisting a military disaster into a mystical, almost religious awakening of the German soul. He used this specific battle to groom the Hitler Youth, demanding they view the slaughtered students as the ultimate role models for blind obedience to the Fatherland:</span><br><br><blockquote style="margin-top: 10px; margin-bottom: 10px;">"And then the night came down, and we advanced in silence, and as daylight broke, the first greeting of the morning whistled over our heads... Then from afar the strains of a song reached our ears, coming closer and closer... And as Death plunged his hand into our ranks, the song reached us too, and we passed it on: <i>Deutschland, Deutschland über alles!</i>"<br>— <strong>Adolf Hitler, <i>Mein Kampf</i>, Volume 1, Chapter 5: The World War, 1925</strong></blockquote></li><li style="margin-bottom: 15px;"><strong style="color: #0f172a; font-size: 1.1rem;"><i class="fa-solid fa-building-columns" style="color: #059669; margin-right: 10px;"></i> Historical Interpretation: Dismantling the Myth</strong><br><span style="color: #334155;">Modern historians have thoroughly dismantled the <i>Kindermord</i> (Massacre of the Innocents) narrative. In his landmark study on how nations process the trauma of war, historian George Mosse details how the disaster at Langemarck was deliberately repackaged by right-wing extremists. Mosse argues that the Nazi Party actively weaponized the grief surrounding the Langemarck cemetery to create a "cult of fallen soldiers," replacing the horrific reality of industrialized slaughter with a sanitized, glorious myth of youth and manliness to justify future aggression.<br>— <strong>Professor George L. Mosse, <i>Fallen Soldiers: Reshaping the Memory of the World Wars</i>, Oxford University Press, 1990</strong></span></li></ul><div style="background: #e2e8f0; padding: 15px; border-radius: 6px; margin-top: 20px;"><p style="font-style: italic; color: #1e293b; font-weight: bold; margin: 0; text-align: center;"><i class="fa-solid fa-lightbulb" style="color: #d97706; margin-right: 8px;"></i> By understanding the myth, students can look at the bronze oak panels and recognize how the memories of those individuals were stolen and repurposed for a second, even more devastating war.</p></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Hooge Crater & Trench Warfare',
          text: "Hooge was the site of intense, close-quarters fighting. The opposing trenches were so close that soldiers could hear each other speaking. In July 1915, the British detonated a massive underground mine beneath the German lines, creating a massive crater.<br><br><strong>Key Facts:</strong><ul><li>The mine blast created a crater 120 feet wide and 20 feet deep.</li><li>Soldiers in these trenches suffered terribly from 'trench foot' due to standing in freezing mud and water for days on end.</li></ul><br><blockquote><strong>Written Source:</strong><br><em>\"The trench was a ribbon of earth, filled with freezing water, the stench of unburied bodies, and the constant, nerve-shredding crack of sniper fire.\"</em><br>— <strong>Private Frank Richards</strong>, Royal Welch Fusiliers</blockquote><div style='text-align: center; margin-top: 15px;'><img src='/images/cheshire_regiment_trench.png' style='max-width: 100%; border-radius: 6px; border: 1px solid #ccc;' alt='Hooge Crater'></div>",
        },
      ],
      tour_guide_script: [
        {
          type: 'narrative',
          theme_heading: '1:00 PM – Departing Calais: Entering the Salient',
          text: '"Right everyone, look out your windows. In an hour, this flat farmland will transform into the most heavily contested patch of earth in British military history: the Ypres Salient. A \'salient\' is a bulge in the frontline, surrounded by enemy guns on three sides. If Ypres fell, the German army could march straight to the French ports supplying our war effort. Over half a million men died defending a strip of mud barely ten miles wide. As we cross into Belgium, imagine looking out at these quiet fields in 1917: no trees, no grass, just a landscape chewed into toxic mud and shell craters. We are retracing the exact steps taken by ordinary teenagers and men a century ago."<br><br><strong>Teacher Points:</strong><ul><li>The Salient was deadly because German artillery fired from elevated ridges on three sides, meaning there was no true "safe rear area."</li><li>Artillery fire caused roughly 60% of all combat wounds, leading to severe shrapnel injuries and terrifying psychological conditions like shell shock.</li><li>The mud in the Salient was famously lethal; men, horses, and equipment frequently drowned in waterlogged shell craters during the Passchendaele offensive.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"I am no longer an artist interested and curious, I am a messenger who will bring back word from the men who are fighting to those who want the war to go on for ever. Feeble, inarticulate, will be my message, but it will have a bitter truth... It is unspeakable, godless, hopeless."</em><br>— <strong>Paul Nash</strong>, British War Artist, in a letter to his wife describing the shattered landscape of the Ypres Salient (1917).</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '2:15 PM – Coach Approach: How War Graves Formed & The Portland Headstone',
          text: '"Before we step off the coach at Essex Farm, our very first cemetery, take a look out at the landscape. Over the next three days, you are going to see thousands of gleaming white Portland stone headstones standing in perfect military rows. But this is not how they looked during the war. During the fighting, bodies were buried in haste under darkness, marked only by crude wooden crosses with paper or zinc tags. Shellfire repeatedly blasted these graves into mud—which is why half of the boys who died here have no known grave.\n\nNotice the headstones when we walk in. Every single one is exactly the same shape and size: 76 centimeters tall, curved at the top, carved from Portland limestone. A famous architect named Sir Edwin Lutyens designed that curved shape. And the man who founded the War Graves Commission, Sir Fabian Ware, fought a fierce battle in Parliament to ensure that a millionaire aristocrat and a fifteen-year-old schoolboy like Valentine Strudwick were buried under the exact same stone. No private monuments were allowed, and families were banned from bringing bodies home. In death, all soldiers were declared equal. Keep your eyes open for the four parts of every stone: the regimental badge at the top, the soldier\'s details, the cross in the middle, and the heartbreaking message chosen by the parents at the bottom."<br><br><strong>Teacher Points:</strong><ul><li>Remind pupils that the red vulcanised fibre identity disc was removed for casualty reporting, while the green disc was left on the body.</li><li>Point out the difference between the bright Portland stone of British cemeteries and the dark basalt architecture of German cemeteries like Langemarck.</li><li>Highlight Kipling\'s role: having lost his own son John at Loos with no known grave, he chose the words "Known unto God" and "Their Name Liveth For Evermore".</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"The impression made by the commission\'s cemeteries is one of extraordinary dignity and peace... There is no distinction between the grave of the officer and that of the private soldier; they lie side by side in the soil they defended."</em><br>— <strong>Sir Fabian Ware</strong>, Founder of the Imperial War Graves Commission.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '2:30 PM – Essex Farm Dressing Station',
          text: '"As we pull up to our first stop, I want you to ask yourselves: what is the youngest age you can imagine going to war? Here lies Valentine Joe Strudwick, a Commonwealth soldier who died at just 15 years old. Essex Farm was an Advanced Dressing Station. Stretchers were carried through the mud to this exact spot. It was right here, surrounded by the dying, that a Canadian surgeon named John McCrae wrote the famous poem, In Flanders Fields. You are standing on the frontline of First World War medicine."<br><br><strong>Teacher Points:</strong><ul><li>Advanced Dressing Stations (ADS) like this were just a few hundred yards behind the frontline, often housed in concrete bunkers or dugouts to survive shelling.</li><li>Medical officers here practiced triage, sorting the wounded into three groups: those who would return to duty, those needing immediate surgery, and those beyond help.</li><li>John McCrae wrote his poem in May 1915 after burying a close friend, Alexis Helmer, whose grave was later destroyed by artillery fire.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"In Flanders fields the poppies blow / Between the crosses, row on row, / That mark our place; and in the sky / The larks, still bravely singing, fly / Scarce heard amid the guns below."</em><br>— <strong>Lieutenant-Colonel John McCrae</strong>, Canadian Army Medical Corps, composed at Essex Farm (May 1915).</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '3:15 PM – Langemarck German Military Cemetery',
          text: '"Leaving the British medical lines, we are now crossing into former German territory to visit Langemarck. I want you to think about how different nations mourn their dead. You\'ll notice immediately that this cemetery feels completely different from British ones. It is dark, shaded by oak trees, and heavily features mass graves. It’s a stark, unforgettable visual reminder of the heavy, somber weight of defeat."<br><br><strong>Teacher Points:</strong><ul><li>Unlike the white Portland stone of British cemeteries, Germany used dark natural stones and heavy oak trees, rooted in Germanic mythology and mourning traditions.</li><li>The Kameradengrab (Comrades\' Grave) at the entrance contains the remains of 24,917 unidentified German soldiers in a single mass burial.</li><li>Over 3,000 of the soldiers buried here were teenage student volunteers who were killed in 1914, leading to the site being known as the "Student Cemetery."</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"To no man does the earth mean so much as to the soldier. When he presses himself down upon her long and powerfully, when he buries his face and his limbs deep in her from the fear of death by shell-fire, then she is his only friend, his brother, his mother."</em><br>— <strong>Erich Maria Remarque</strong>, German soldier and author of All Quiet on the Western Front.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '4:00 PM – Hooge Crater Museum & Trenches',
          text: '"To finish our first day, we are heading to a site that shows just how explosive this war really was. Imagine living in a crater made by a mine blast so massive the shockwave shattered windows miles away. Here at Hooge, you will walk through recreated German and British trenches. This wasn\'t just fighting; it was survival. Notice how close the frontlines were—you could hear the enemy coughing. As we go through the museum and its medicine section, think about the claustrophobia these men endured."<br><br><strong>Teacher Points:</strong><ul><li>The crater at Hooge was created in July 1915 when the British detonated a massive underground mine, blowing a hole 120 feet wide and 20 feet deep.</li><li>Trench foot was a massive problem here; soldiers stood in freezing mud for days, causing their feet to swell, blister, and turn gangrenous, often requiring amputation.</li><li>The museum houses an excellent collection of medical artifacts, which ties directly into the medicine questions you\'ll tackle in your workbooks tonight.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"The trench was a ribbon of earth, filled with freezing water, the stench of unburied bodies, and the constant, nerve-shredding crack of sniper fire. We were not just fighting the Germans; we were fighting the mud, the rats, and our own exhausted minds."</em><br>— <strong>Private Frank Richards</strong>, Royal Welch Fusiliers, from his memoir Old Soldiers Never Die.</blockquote>',
        },
      ],
      banner: '/images/stubbington_names_4.jpg',
      extended: {
        question:
          '1 (a). How useful are Sources A and B for an enquiry into the difficult conditions faced by the medical services at Passchendaele and Ypres? Explain your answer, using Sources A and B and your knowledge of the historical context. (8 marks)',
        scaffolding: [
          '**Provenance Clues:** Analyze the Nature, Origin, and Purpose of the source. Ask yourself: Who wrote it? When? Why? How does their motive or the intended audience affect what they have written and its usefulness for the enquiry?',
        ],
        source_a: {
          provenance:
            'A photograph taken by official war photographer Frank Hurley showing Australian soldiers walking along a duckboard track through the shattered landscape of Chateau Wood during the Battle of Passchendaele, 1917.',
          content:
            '<div style="padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;"><img src="/images/stretcher_bearers_passchendaele.jpg" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"></div>',
        },
        source_b: {
          provenance:
            'An aerial photograph showing clouds of poison gas rolling across the battlefield during a chemical attack on the Western Front.',
          content:
            '<div style="padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;"><img src="/images/brooding_soldier_gas.jpg" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"></div>',
        },
        model: '<strong>Source A is highly useful...</strong>',
        provenance_clue:
          'Source A was taken by an official photographer known for dramatic compositions; does this limit its usefulness or perfectly capture the reality of the mud? Source B is an aerial photograph of a gas attack; what makes this detached, wide-angle view of the battlefield useful for understanding the scale of chemical warfare?',
      },
      tasks: [
        "Headstone Deciphering at Essex Farm: Choose any Portland stone headstone in the cemetery. Identify and document its four distinct zones: (1) Regimental badge/crest, (2) Service particulars (rank, name, number, regiment, date of death and age), (3) Religious emblem, and (4) Personal family inscription at the base (if present). Notice the curved top designed by Sir Edwin Lutyens—compare an officer's stone with a private's stone to observe 'Equality in Death'.",
        "Field Observation at Essex Farm: Step inside the damp concrete Advanced Dressing Station dugout where Canadian surgeon John McCrae treated hundreds of bleeding casualties and penned 'In Flanders Fields'. Notice how narrow the doorways and bunk recesses are.",
        'Youngest Fallen: Walk to Plot I, Row G, Grave 12 to find the headstone of Valentine Joe Strudwick, killed in January 1916 aged just 15. Record what tributes and poppy crosses have been placed at his grave.',
        'Langemarck Contrast: Walk beneath the dark oak trees to the Kameradengrab (mass grave) holding 24,917 German soldiers. Contrast this somber, dark basalt stone setting with the gleaming Portland stone of British cemeteries. How does architecture shape mourning?',
        'Hooge Crater Trenches: Walk the preserved frontline trenches. Measure the distance between opposing lines and observe how the high water table turned the trenches into lethal mud swamps.',
      ],
    },
    {
      id: 'day_2',
      title: 'Day 2: Friday 2nd October 2026',
      enquiry: 'Immersive Battlefield Study',
      poetry_dossiers: poetryDossiers.day_2,
      teacher_notes: {
        primer:
          'Day 2 immerses pupils in the contested battleground of the Ypres Salient, examining the traumatic debut of poison gas at St Julien, surviving original trenches at Sanctuary Wood (Hill 62), the vast scale of commonwealth loss at Tyne Cot, medical evacuation and female sacrifice at Lijssenthoek CCS, the claustrophobic reality of subterranean warfare at Passchendaele Museum (Zonnebeke), and concluding with our solemn school wreath laying at the Menin Gate Last Post Ceremony.',
        objectives: [
          {
            objective:
              'Examine the tactical introduction of chlorine gas at Second Ypres and evaluate the Canadian defensive stand at St Julien.',
            primer:
              'Gather pupils at the base of The Brooding Soldier. Have them check their phone compass facing North-East (towards Langemarck/Gravenstafel) where the chlorine cloud rolled on 22 April 1915. Emphasize the reversed-arms mourning posture and contrast the raw horror of asphyxiation with early improvised urine-soaked pad defenses.',
            question:
              'Why did the first mass use of poison gas at St Julien fail to achieve a decisive German breakthrough despite tearing open a four-mile gap in the Allied line?',
          },
          {
            objective:
              'Investigate frontline survival, waterlogged topography, and artillery devastation in preserved British trenches at Sanctuary Wood.',
            primer:
              "Lead pupils through the muddy trench revetments and corrugated 'elephant iron' tunnels at Hill 62. Direct their attention to the splintered tree stumps and deep mud, discussing how the natural drainage systems were obliterated by shellfire.",
            question:
              'How did the high water table and relentless artillery bombardments transform basic trench construction into a desperate daily struggle against mud and trench foot?',
          },
          {
            objective:
              'Evaluate the human scale of Third Ypres (Passchendaele) and analyze the egalitarian commemoration of the missing on the CWGC Memorial Wall.',
            primer:
              'Assemble pupils before the Cross of Sacrifice, highlighting its placement directly atop a captured German concrete pillbox. Then lead pupils to the rear curved flint Memorial Wall to locate our local heroes (Muckett, Rye, Ward, Warland, Newman) among the 34,984 missing names.',
            question:
              'What does the deliberate architectural placement of the Cross of Sacrifice directly atop a captured German pillbox communicate about peace, sacrifice, and victory?',
          },
          {
            objective:
              'Trace the casualty evacuation chain from frontline dressing stations to Casualty Clearing Stations (CCS) at Lijssenthoek.',
            primer:
              'Walk the cemetery rows at Lijssenthoek, highlighting that this hospital cemetery maps surgical mortality rather than frontline battlefield burials. Guide pupils to Plot XV. A. 4 to observe the headstone of Staff Nurse Nellie Spindler.',
            question:
              'Why were medical staff operating at Casualty Clearing Stations miles behind the frontline trenches still at imminent risk of artillery bombardment and death?',
          },
          {
            objective:
              'Analyze how deep underground dugout networks and trench systems enabled troops to survive relentless artillery barrages during the Battle of Passchendaele.',
            primer:
              'Guide pupils down into the 20-foot deep reconstructed British dugout at Zonnebeke Chateau. Experience the cramped bunk tiers, communication post, first-aid station, and electric drainage pumps, discussing how subterranean life protected soldiers from blast concussion while creating severe sensory deprivation.',
            question:
              'How did deep subterranean dugouts fundamentally alter the psychology and physical survival of soldiers holding the line during the Third Battle of Ypres?',
          },
          {
            objective:
              'Reflect on civic memory, Empire participation, and the enduring nightly ritual of the Menin Gate Last Post Ceremony.',
            primer:
              'Escort pupils under the Menin Gate archway before 19:30. Guide them to Panel 35 to locate Private Thomas Franklin and Private William Ayling, view the Indian Forces Memorial on the ramparts, and support our two nominated school wreath bearers during the 20:00 ceremony.',
            question:
              'Why has the nightly sounding of the Last Post by volunteer firemen endured since 1928 as the defining global ritual of Great War remembrance?',
          },
        ],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'Day 2 Itinerary',
        events: [
          {
            year: '08:00',
            title: 'Breakfast',
            lat: 50.763,
            lng: 2.893,
            detail: 'Provided at accommodation.',
          },
          {
            year: '09:00',
            title: 'Depart for Battlefield Sites',
            lat: 50.763,
            lng: 2.893,
            detail: 'Board coach for full day of guided study.',
          },
          {
            year: '09:15',
            title: 'The Brooding Soldier',
            detail: 'Visit to the Canadian memorial at St Julien (First Gas Attack, 1915).',
            lat: 50.899,
            lng: 2.94,
          },
          {
            year: '09:45',
            title: 'Sanctuary Wood & Preserved Trenches',
            detail: 'Exploration of original trench systems (sturdy footwear advised).',
            lat: 50.837,
            lng: 2.947,
          },
          {
            year: '11:30',
            title: 'Supervised Lunch Stop',
            detail: 'Stop in Ypres to purchase packed lunch and snacks.',
            lat: 50.851,
            lng: 2.885,
          },
          {
            year: '13:00',
            title: 'Tyne Cot British Cemetery',
            detail: "Guided visit to the world's largest Commonwealth war cemetery.",
            lat: 50.887,
            lng: 2.998,
            youtube_id: '4iX4F1U2mGE',
          },
          {
            year: '14:15',
            title: 'Lijssenthoek Visitors Centre & Cemetery',
            detail:
              "Study of casualty clearing stations and battlefield medicine. <a href='https://www.lijssenthoek.be/en' target='_blank' style='color:#3b82f6;text-decoration:underline;'>Visit official website</a>.",
            lat: 50.829,
            lng: 2.7,
          },
          {
            year: '15:45',
            title: 'Passchendaele Museum (Zonnebeke)',
            detail:
              "Immersive museum tour and dugout experience. <a href='https://passchendaele.be/en/' target='_blank' style='color:#3b82f6;text-decoration:underline;'>Visit official website</a>.",
            lat: 50.871,
            lng: 2.987,
          },
          {
            year: '17:30',
            title: 'Return to Peace Village',
            detail: 'Downtime and preparation for evening event.',
            lat: 50.763,
            lng: 2.887,
          },
          {
            year: '18:00',
            title: 'Evening Meal',
            detail: 'Dinner at accommodation.',
          },
          {
            year: '19:00',
            title: 'Menin Gate, Ypres',
            detail:
              "Attend the historic 20:00 Last Post Ceremony, including official wreath laying by nominated students. <a href='https://lastpost.be/' target='_blank' style='color:#3b82f6;text-decoration:underline;'>Last Post Association</a>.",
            lat: 50.852,
            lng: 2.891,
            youtube_id: '9t0-tZIfYFw',
          },
          {
            year: '20:30',
            title: 'Return to Accommodation',
            detail: 'Supervised free time.',
          },
          {
            year: '22:00',
            title: 'Curfew & Room Checks',
            detail: 'All students in rooms for the night.',
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'The Brooding Soldier & Poison Gas',
          text: 'In April 1915, the Germans launched the first major poison gas attack of the war on the Western Front at St Julien. A heavy cloud of chlorine gas was released, devastating the French colonial troops and forcing the Canadian 1st Division to step in and hold the line.<br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 10px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: The Direction of the Gas</h4><p style="font-size: 1.05rem; color: #334155;"><strong>Action:</strong> Open your phone\'s compass app. Stand at the base of the Canadian memorial and turn until you are facing the exact direction the German gas attack came from (North-East).</p><div style="background: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; border-radius: 0 4px 4px 0;"><em style="color: #065f46;">\\"Gas! GAS! Quick, boys!—An ecstasy of fumbling...\\"</em><br><small style="color: #047857;">- Wilfred Owen</small></div><p style="color: #b91c1c; font-weight: bold; margin-bottom: 5px;"><i class="fa-solid fa-brain"></i> Learn these 3 facts by heart before getting back on the coach:</p><ul style="margin: 0; padding-left: 20px; color: #475569; line-height: 1.5;"><li>Chlorine gas severely damaged the respiratory system, causing victims to suffocate.</li><li>The earliest defense was holding cotton pads soaked in urine over the mouth (ammonia neutralized chlorine).</li><li>The memorial shows a soldier in a \'reverse arms\' position, signifying mourning, not victory.</li></ul></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Sanctuary Wood',
          text: 'Sanctuary Wood was initially a quiet area behind the lines where soldiers could rest (a sanctuary), but it eventually became part of the frontline. Today, it offers a rare look at an original, preserved trench system.<br><br><strong>Key Facts:</strong><ul><li>Trenches here were reinforced with corrugated metal (\'elephant iron\') to prevent collapse in the waterlogged soil.</li><li>The shattered, dead trees preserved in the wood are a direct result of relentless artillery fire tearing the landscape apart.</li><li><strong>Local Connection:</strong> Just a short distance from here is Westhoek Ridge, where Stubbington local Auriol \'Eric\' Lowry fought in 1917.</li></ul><br><blockquote><strong>Written Source:</strong><br><em>"I died in hell—(They called it Passchendaele). My wound was slight, / And I was hobbling back; and then a shell / Burst slick upon the duck-boards: so I fell / Into the bottomless mud, and lost the light."</em><br>— <strong>Siegfried Sassoon</strong>, Memorial Tablet</blockquote><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: The Senses of the Salient</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-eye"></i> As you walk through the preserved trench system, close your eyes for 30 seconds. Imagine the sound of artillery, the smell of mud and cordite, and the fear of a night raid. Think of three adjectives that describe how it feels to stand here.</p><ul style="margin-top: 15px; color: #475569; font-size: 0.95rem;"> <li>The Ypres Salient was a massive bulge in the Allied front line, leaving British and Commonwealth troops dangerously exposed to German artillery fire from three sides.</li> <li>It was the site of three major, apocalyptic battles (1914, 1915, 1917), resulting in over 300,000 British and Commonwealth casualties.</li> <li>During the Second Battle of Ypres in 1915, the Salient witnessed the first mass use of poison gas on the Western Front.</li> <li>The high water table and relentless artillery bombardment destroyed natural drainage, turning the Salient into a notoriously lethal landscape of liquid mud.</li> <li>Sanctuary Wood earned its name in 1914 as a quiet rear area where troops rested, but by 1916, the front line had violently collapsed back into the woods.</li> </ul><div style=\'text-align: center; margin-top: 15px;\'><img src=\'/images/ypres_salient_map_new.png\' style=\'max-width: 100%; border-radius: 6px; border: 1px solid #ccc;\' alt=\'Ypres Salient Map\'></div></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Tyne Cot Cemetery',
          text: '<div class="source-box" style="text-align: center; margin-bottom: 20px;"><img src="/images/ypres_tyne_cot.jpg" style="max-width: 100%; border-radius: 8px;" alt="Tyne Cot Cemetery"/><br><small>Tyne Cot Cemetery</small></div>Tyne Cot is the largest Commonwealth war cemetery in the world, reflecting the incomprehensible scale of the casualties during the Battle of Passchendaele (1917).<br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: Tell Their Story</h4><div style="background: #fff1f2; padding: 15px; border-radius: 6px; border: 1px solid #fecdd3;"><p style="margin: 0; color: #be123c; font-weight: bold; font-size: 1.05rem;"><i class="fa-solid fa-person-chalkboard"></i> Find the grave or panel of one of our Local Heroes (e.g., Lance Corporal A. Ward). At the end of the visit, you will be asked to orally tell the rest of your group about this soldier.</p></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Lijssenthoek Casualty Clearing Station',
          text: 'Lijssenthoek was the largest evacuation hospital in the Ypres Salient. Located just out of artillery range, it received casualties directly from the frontline dressing stations.<br><br><strong>Key Facts:</strong><ul><li>It handled over 200,000 casualties during the war.</li><li>The cemetery graves provide a timeline of hospital mortality, showing spikes during major offensives.</li><li>Advances in treating infection happened here, including the Carrel-Dakin method of flushing wounds with antiseptics.</li><li>Nurses also lost their lives here, such as Staff Nurse Nellie Spindler who was killed by a shell.</li></ul><br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: The Medical Frontline</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-magnifying-glass"></i> Walk along the rows of headstones and find the grave of Staff Nurse Nellie Spindler (the only female casualty buried here). Consider: Why were medical staff, located miles behind the front line, still at risk of death?</p><div style="margin-top: 15px; color: #475569; font-size: 0.95rem;"> <p>Staff Nurse Nellie Spindler was a 26-year-old nurse serving with the Queen Alexandra’s Imperial Military Nursing Service. In August 1917, at the height of the Battle of Passchendaele, the casualty clearing station where she worked was struck by German artillery. Shrapnel tore through her tent, killing her instantly. Today, she is the only woman buried alongside more than 10,000 men at Lijssenthoek Military Cemetery, serving as a powerful physical reminder that women operating in medical roles lived and died in the direct line of fire.</p> <ul> <li>The First Aid Nursing Yeomanry (FANY) was created in 1907 as an all-female voluntary organization.</li> <li>FANYs drove motor ambulances through heavily shelled, muddy roads to evacuate bleeding soldiers from the front.</li> <li>They operated soup kitchens, mobile canteens, and advanced dressing stations, consistently working under direct enemy bombardment.</li> </ul></div></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Passchendaele Museum: Underground Dugouts',
          text: '<div class="source-box" style="text-align: center; margin-bottom: 20px;"><img src="/images/passchendaele_museum_dugout.jpg" style="max-width: 100%; max-height: 480px; object-fit: cover; border-radius: 8px;" alt="Reconstructed 20ft Subterranean Dugout System at the Memorial Museum Passchendaele 1917, Zonnebeke"/><br><small>Reconstructed 20ft Subterranean Dugout System at the Memorial Museum Passchendaele 1917, Zonnebeke</small></div>Located inside the historic Zonnebeke Chateau grounds, the <strong>Memorial Museum Passchendaele 1917</strong> brings the grueling reality of the Third Battle of Ypres to life through an authentic, immersive underground dugout experience and reconstructed frontline trenches.<br><br>As artillery shells leveled every building and tree above ground, the British Army dug deep into the Flemish soil. Specialized Royal Engineers tunneling companies excavated extensive subterranean headquarters, dressing stations, and dormitories up to 20 feet below the surface. In the damp underground tunnels, thousands of soldiers lived like moles beneath relentless bombardments that would have obliterated them on the surface.<br><br><strong>Key Historical Facts:</strong><ul><li><strong>20 Feet Subterranean:</strong> The museum\'s dugout plunges visitors into the cold, damp subterranean corridors where officers planned attacks, telephone operators maintained telegraph lines, and surgeons performed emergency amputations under candlelight.</li><li><strong>Drainage &amp; Survival:</strong> Constant pumping was required to keep subterranean rooms from flooding with groundwater; carbon monoxide from candles and stale air made ventilation a matter of life and death.</li><li><strong>Reconstructed Trench Network:</strong> The museum park features reconstructed British, German, and Australian frontline trenches, contrasting German concrete pillbox construction with British timber and corrugated iron revetments.</li></ul><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: The Subterranean World</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-person-digging"></i> Walk along the narrow wooden corridor of the dugout. Notice the ceiling height, the damp smell of timber, and the cramped officer bunks. Imagine 500 soldiers sheltering here during a 10-day drumfire artillery barrage. Write down two major advantages of underground dugouts and two severe psychological dangers of staying underground.</p></div></div>',
          historical_facts: [
            'By late 1917, British tunneling companies had excavated over 180 deep dugouts across the Ypres Salient to shield entire battalions from heavy howitzer bombardments.',
            'The Zonnebeke dugout system features authentic reconstructions of a battalion command post, signal office, medical aid post, and bunk rooms.',
            "Soldiers sheltered in dugouts for days before major assaults, emerging directly into the muddy quagmire of no man's land through narrow shaft exits.",
            "The museum's outdoor trench park displays both British corrugated 'elephant iron' revetments and German reinforced concrete bunkers.",
          ],
          interactive_task: {
            title: 'Underground Sensory Analysis',
            action:
              'Descend the steps into the dugout. In complete silence for 60 seconds, listen to the ambient dampness and ventilation hum. Consider how living underground protected soldiers from high-explosive shrapnel, but trapped them if poison gas sank down the stairwells or the entrance shafts were buried by artillery blast waves.',
          },
        },
        {
          type: 'narrative',
          theme_heading: 'The Menin Gate',
          text: '<div class="source-box" style="text-align: center; margin-bottom: 20px;"><img src="/images/ypres_menin_gate.jpg" style="max-width: 100%; border-radius: 8px;" alt="Menin Gate"/><br><small>The Menin Gate, Ypres</small></div>The Menin Gate is a colossal memorial to the missing in Ypres. Millions of Allied soldiers marched through this spot on their way to the frontlines, and many never returned.<br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: Local Hero & The Empire</h4><div style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;"><h4 style="margin: 0 0 10px 0; color: #1e293b;"><i class="fa-solid fa-magnifying-glass-location" style="color: #3b82f6;"></i> Find the Local Hero</h4><div style="background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #3b82f6;"><h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 1.3rem;">Private T. J. Franklin</h3><p style="margin: 0; font-size: 0.95rem; line-height: 1.6; color: #334155;"><strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br><strong>Local Connection:</strong> Stubbington<br><strong>Fate:</strong> Killed 29th April 1915 holding an exposed line on the Frezenberg Ridge.</p></div><p style="margin: 0; color: #b91c1c; font-weight: bold;"><i class="fa-solid fa-person-chalkboard"></i> Action: The Menin Gate has 54,000 names. Locate the specific panel for Private T. J. Franklin.</p></div><div><h4 style="margin: 0 0 5px 0; color: #1e293b;"><i class="fa-solid fa-monument" style="color: #f59e0b;"></i> The Indian Forces Memorial</h4><p style="margin: 0; color: #475569;">Once you have found his name, walk out of the gate and up onto the grassy ramparts. Locate the <strong>Indian Forces Memorial</strong>. 130,000 troops from the Indian subcontinent served in Flanders. Take a moment to read the inscription before the Last Post begins at 8:00 PM.</p><div style=\'background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 15px;\'><p style=\'margin: 0 0 10px 0; color: #334155; font-weight: bold;\'><i class=\'fa-solid fa-video\' style=\'color: #e11d48;\'></i> The Empire\'s War: Global Voices in Flanders</p><p style=\'margin: 0 0 10px 0; color: #475569;\'>David Olusoga’s WW1 Uncut series brilliantly dismantles the traditional, whitewashed image of the trenches, making it the perfect digital companion for this stop.</p><p style=\'margin: 0 0 10px 0; color: #475569;\'><strong>Action:</strong> Watch the embedded David Olusoga video on your device, then stand before the Indian Forces Memorial and complete these three steps:</p><ol style=\'margin: 0; padding-left: 20px; color: #475569;\'><li style=\'margin-bottom: 8px;\'><strong>Observe the Symbolism:</strong> Look closely at the monument\'s base and the four Asian lions facing outward (the State Emblem of India). This memorial was unveiled in 2011. Why do you think it took nearly a century for a dedicated national monument to be placed here, and what does this delay tell us about how history is remembered?</li><li style=\'margin-bottom: 8px;\'><strong>Challenge the Image:</strong> Olusoga explains that the Western Front was one of the most diverse spaces on earth. Look down at the Menin Gate, where 413 Indian soldiers with no known grave are carved into the stone alongside British troops. How does standing here change the traditional textbook image of the "British Tommy" in the mud?</li><li style=\'margin-bottom: 8px;\'><strong>Discuss the Impact:</strong> Indian Expeditionary Force A arrived in freezing conditions in late 1914, plugging critical gaps in the British line just in time to prevent a German breakthrough. Discuss with your partner: How might the First Battle of Ypres have ended if those 45,000 Empire troops had not been deployed?</li></ol></div><div style=\'text-align: center; margin-bottom: 15px;\'><iframe width=\'100%\' height=\'315\' src=\'https://www.youtube.com/embed/WRTm7mw25WU?start=182\' frameborder=\'0\' allowfullscreen></iframe><p style=\'font-size: 0.9rem; color: #64748b; margin-top: 5px; text-align: left;\'><strong>Watch (6 mins 31 secs):</strong> Historian David Olusoga reveals the true diversity of the World War One trenches. Pay attention to the sheer number of nations that fought and died in the exact mud you are standing on today. <em>Contrast this with the Chattri Memorial on the South Downs in Sussex, where wounded Indian soldiers were cremated after being treated at the Royal Pavilion in Brighton.</em></p></div></div></div>',
          historical_facts: [
            'Indian Expeditionary Force A (45,000 men) arrived in late 1914, plugging critical gaps to prevent a German breakthrough during the First Battle of Ypres.',
            'By the end of 1914, Indian troops made up one-third of all British forces on the Western Front.',
            'Of the 130,000 Indian soldiers who served in Flanders, roughly 9,000 died from combat and severe exposure to the brutal European winter.',
            'The Menin Gate lists 413 Indian soldiers with no known grave.',
            'Unveiled in 2011, the memorial features the State Emblem of India: four Asian lions facing outward over a bull, elephant, horse, and lion.',
          ],
          interactive_task: {
            title: 'The Empire’s War: Global Voices in Flanders',
            action:
              "Watch the David Olusoga video, then stand before the Indian Forces Memorial and complete three steps: 1) Observe: Why did it take nearly a century to build this 2011 monument, and what does this delay tell us about historical memory? 2) Challenge: Look down at the Menin Gate where 413 Indian soldiers are carved alongside British troops. How does this change the traditional textbook image of the 'British Tommy'? 3) Discuss: How might the First Battle of Ypres have ended if those 45,000 Empire troops had not been deployed?",
          },
          media: {
            type: 'youtube',
            youtube_id: 'Fwv4qL8yE-s',
            url: 'https://www.youtube.com/watch?v=Fwv4qL8yE-s',
            caption:
              'Watch: Historian David Olusoga reveals the true diversity of the World War One trenches. Pay attention to the sheer number of nations that fought and died in the exact mud you are standing on today.',
          },
        },
      ],
      tour_guide_script: [
        {
          type: 'narrative',
          theme_heading: '9:15 AM – The Brooding Soldier',
          text: '"Morning everyone. Yesterday we looked at trenches and medical stations. Today, we begin with a new kind of terror. Imagine a yellow-green cloud rolling toward you on the wind. In April 1915, this very spot saw the first major poison gas attack of the war. This Canadian memorial is called \'The Brooding Soldier.\' Look at his posture. He is resting on a reversed rifle. He doesn\'t celebrate a victory. He is mourning. He is brooding over the comrades who suffocated defending this line."<br><br><strong>Teacher Points:</strong><ul><li>Chlorine gas destroyed respiratory organs, causing victims to effectively drown in the fluid of their own lungs.</li><li>The first defense against gas was simply breathing through cotton pads soaked in urine, as the ammonia neutralized the chlorine.</li><li>The Canadian 1st Division stood their ground here despite the gas, filling the gap in the line and preventing a complete German breakthrough.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"Gas! GAS! Quick, boys!—An ecstasy of fumbling / Fitting the clumsy helmets just in time, / But someone still was yelling out and stumbling / And flound\'ring like a man in fire or lime..."</em><br>— <strong>Wilfred Owen</strong>, British poet and soldier, from Dulce et Decorum Est.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '9:45 AM – Sanctuary Wood Museum and Trenches',
          text: '"We\'re now heading to Sanctuary Wood. If Hooge showed us recreated trenches, this site gives us the real thing. Get your boots ready, because you are about to walk through original trench lines and tunnels. Look at the rusted metal, the shattered trees, and the sheer depth of the mud. This is as close as you will get to seeing the true environment of the Western Front."<br><br><strong>Teacher Points:</strong><ul><li>The wood got its name in 1914 when it was used as a relatively safe resting area ("sanctuary") for stragglers, but it was obliterated during later battles.</li><li>The trenches here are supported by corrugated iron ("elephant iron") which helped prevent the soft, waterlogged earth from collapsing in on the soldiers.</li><li>Look out for the remains of shattered tree stumps; they show just how severely artillery fire literally chewed the landscape to splinters.</li><li><strong>Local Connection:</strong> Point out that Westhoek Ridge is nearby, where Auriol \'Eric\' Lowry fought in 1917. It\'s a great physical connection to the boys named on the Stubbington memorial back home.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"I died in hell—(They called it Passchendaele). My wound was slight, / And I was hobbling back; and then a shell / Burst slick upon the duck-boards: so I fell / Into the bottomless mud, and lost the light."</em><br>— <strong>Siegfried Sassoon</strong>, British poet and soldier, from Memorial Tablet.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '1:00 PM – Tyne Cot British War Cemetery',
          text: '"After our lunch in Ypres, we arrive at Tyne Cot. Prepare yourselves, because the scale of this place is hard to process. This is the largest British War cemetery in the world. It is vast, blindingly white, and represents an unfathomable scale of fighting. Walk down the rows. Read the ages on the headstones. Look for the names of men who won the Victoria Cross, and realize that thousands of these graves simply say \'A Soldier of the Great War - Known Unto God\'."<br><br><strong>Teacher Points:</strong><ul><li>Tyne Cot contains 11,961 Commonwealth burials, but tragically, 8,369 of these headstones belong to unidentified soldiers.</li><li>The Cross of Sacrifice in the center of the cemetery is built directly on top of a captured German concrete pillbox that was taken by Australian forces in 1917.</li><li>The memorial wall at the back contains the names of nearly 35,000 men who died in the Salient after August 1917 and have no known grave.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"I have many times asked myself whether there can be more potent advocates of peace upon earth through the years to come, than this massed multitude of silent witnesses to the desolation of war."</em><br>— <strong>King George V</strong>, spoken during his pilgrimage to Tyne Cot in 1922.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '2:15 PM – Lijssenthoek Visitors Centre',
          text: '"From the frontlines of Tyne Cot, we fall back to the next step in the chain of evacuation. Lijssenthoek was a Casualty Clearing Station, positioned just out of artillery range but close enough to save lives. This is an excellent example of WW1 medicine. If a soldier survived the stretcher bearers and the dressing stations to make it here, they had a fighting chance. Look at the headstones—they map out the brutal timeline of when major offensives began and the surgical tents were overwhelmed."<br><br><strong>Teacher Points:</strong><ul><li>Lijssenthoek was the largest evacuation hospital in the Ypres Salient, handling over 200,000 casualties during the war.</li><li>Unlike frontline cemeteries, this cemetery reflects hospital mortality: you will find graves of nurses here, including Staff Nurse Nellie Spindler, who was killed by artillery fire.</li><li>Advances in treating infection happened here, specifically the use of the Carrel-Dakin method, which involved continuously flushing wounds with an antiseptic solution.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"The convoys of wounded never stopped. It was a race against time, sorting the living from the dying. We were covered in blood and mud for days on end, trying to put shattered boys back together in tents that shook with the bombardment."</em><br>— <strong>Diary entry of a VAD (Voluntary Aid Detachment) Nurse</strong>, serving at a Casualty Clearing Station near Ypres.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '3:45 PM – Passchendaele Museum (Zonnebeke)',
          text: '"We are now entering the Memorial Museum Passchendaele 1917 at Zonnebeke Chateau. You have stood above ground at Tyne Cot and Sanctuary Wood looking out over the mud. Now, you are going underground. When the surface of the Salient became an uninhabitable wasteland of shell holes and liquid mud, soldiers literally dug for their lives. We will descend 20 feet into an authentic reconstructed British dugout. Walk through the command posts, the medical station, and the wooden bunk tiers. Feel the dampness and imagine living here for a week under relentless artillery drumfire before climbing up a ladder straight into no man\'s land."<br><br><strong>Teacher Points:</strong><ul><li>Point out the communication wire conduits and drainage sumps; without constant mechanical pumping, groundwater would flood these tunnels within hours.</li><li>Discuss the psychological contrast: underground provided safety from shrapnel, but men suffered from extreme claustrophobia and the constant dread of gas sinking into the low entrances or a heavy shell collapsing the timber shoring.</li><li>After exploring the dugout, take students through the outdoor trench park to compare British trench revetments with German concrete pillboxes.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"We lived twenty feet down in the cold Flanders clay. Above us, the earth shook with endless explosions like continuous thunder. Down below, we huddled under flickering candles, breathing damp chalk dust, waiting for the whistle to send us back up into the light and the slaughter."</em><br>— <strong>Private Arthur Thomas</strong>, 2nd Battalion, Royal Welch Fusiliers, Third Battle of Ypres.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '7:00 PM – The Menin Gate (Traveling to Last Post)',
          text: '"Tonight is about remembrance. We are heading into Ypres to the Menin Gate. Every single one of the 54,000 names carved into this gate belongs to a soldier who died defending the Salient and has no known grave. Every night since 1928, the Last Post has been played here to honor them. Tonight, our school will lay a wreath on their behalf. Listen to the bugles echoing under the arch, and remember the teenagers who walked out through this gate to the frontlines and never came back."<br><br><strong>Teacher Points:</strong><ul><li>The Menin Gate was the main road out of the town of Ypres leading directly toward the frontline; millions of soldiers marched through this very spot.</li><li>The Last Post is played by volunteers from the local Ypres fire brigade. They even hid their bugles and played it secretly during the German occupation in WWII.</li><li>There are so many missing soldiers in the Salient that the Menin Gate ran out of space; the remaining 35,000 names are on the wall at Tyne Cot, which we saw earlier.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"He is not missing; he is here."</em><br>— <strong>Field Marshal Lord Plumer</strong>, speaking to the families of the missing at the inauguration of the Menin Gate in 1927.</blockquote>',
        },
      ],
      banner: '/images/stubbington_names_1.jpg',
      extended: {
        question:
          '1 (a). How useful are Sources A and B for an enquiry into the physical conditions of the landscape and trench warfare on the Western Front? Explain your answer, using Sources A and B and your knowledge of the historical context. (8 marks)',
        scaffolding: [
          '**Provenance Clues:** Analyze the Nature, Origin, and Purpose of the source. Ask yourself: Who wrote it? When? Why? How does their motive or the intended audience affect what they have written and its usefulness for the enquiry?',
        ],
        source_a: {
          provenance:
            'A photograph showing the devastating impact of artillery fire and mud on the landscape during the Battle of Passchendaele, 1917.',
          content:
            '<div style="padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;"><img src="/images/gw_flooded_trench.jpg" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"></div>',
        },
        source_b: {
          provenance:
            'A photograph of soldiers from the Cheshire Regiment occupying a captured German trench, 1916.',
          content:
            '<div style="padding: 15px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;"><img src="/images/hooge_crater_trench.png" style="max-width: 100%; height: auto; margin-bottom: 10px; border-radius: 4px;"></div>',
        },
        model: '<strong>Source A is highly useful...</strong>',
        provenance_clue:
          'Source A is an official photograph documenting the severe mud and destroyed landscape; what can it tell us about the conditions soldiers had to fight in? Source B shows men resting in a captured trench; what does this reveal about the realities of trench occupation?',
      },
      tasks: [
        'The Brooding Soldier: Use your phone compass to face North-East at St Julien, the exact direction from which the greenish-yellow cloud of chlorine gas rolled on 22nd April 1915. Note the reversed-arms mourning posture of the Canadian soldier.',
        "Sanctuary Wood Original Trenches: Walk through the original frontline trench system at Hill 62. Look out for the splintered century-old tree trunks and corrugated 'elephant iron' revetments.",
        'Tyne Cot Pilgrimage: Locate the massive Cross of Sacrifice, built directly on top of a captured German concrete pillbox. Then walk up to the Memorial Wall to locate our local heroes: Sydney Muckett, Arthur Rye, Archibald Ward (Panels 88–90), and Charles Warland (Panels 14–17).',
        'Lijssenthoek Medical Line: Find the grave of Staff Nurse Nellie Spindler, killed by artillery fire at a casualty clearing station in 1917. Reflect on the role of women operating directly within shell range.',
        'Passchendaele Dugout Immersion: Descend 20 feet into the reconstructed subterranean British dugout at Zonnebeke Chateau. Analyze the cramped tiers of wooden bunks, the battalion signal room, and medical dressing post. Reflect on how underground tunneling protected troops from surface artillery while creating extreme sensory and psychological strain.',
        'Menin Gate Last Post: Stand beneath the colossal triumphal arch at 8:00 PM for the sounding of the Last Post. Locate Private Franklin and Private Ayling on Panel 35 under the Hampshire Regiment, and support our Meoncross wreath bearers.',
      ],
    },
    {
      id: 'day_3',
      title: 'Day 3: Saturday 3rd October 2026',
      enquiry: 'Poperinge and the Journey Home',
      poetry_dossiers: poetryDossiers.day_3,
      teacher_notes: {
        primer:
          'Day 3 concludes the expedition by moving from the ramparts of Ypres to the rear-echelon sanctuaries and execution sites of Poperinge, culminating in a reflection on British military justice, shell shock, and modern national remembrance at the National Memorial Arboretum in Staffordshire.',
        objectives: [
          {
            objective:
              "Analyze Siegfried Sassoon's bitter anti-monument sentiment in 'On Passing the New Menin Gate'.",
            primer:
              "Read Sassoon's poem atop the Ramparts. Contrast the grand neoclassical triumphalism of Sir Reginald Blomfield's Menin Gate with Sassoon's anger that the unheroic, conscripted dead were being sanitized in stone.",
            question:
              "Why did decorated war veteran Siegfried Sassoon condemn the Menin Gate as a 'sepulchre of crime'?",
          },
          {
            objective:
              'Examine the post-war reconstruction of Ypres and the resilience of civilian Flemish life through artisan trade and currency management.',
            primer:
              'Gather pupils on the Grote Markt in front of the Cloth Hall before entering De Groote’s Chocolatier. Contrast wartime devastation photographs with the meticulously rebuilt medieval square, guiding pupils to manage their €30–€40 cash envelopes as they engage with local shopkeepers.',
            question:
              'Why did the citizens of Ypres reject Winston Churchill’s proposal to preserve their destroyed town as a permanent ruin, choosing instead to rebuild it brick-by-brick?',
          },
          {
            objective:
              'Contrast the psychological refuge of Talbot House with the disciplinary brutality of Poperinge Town Hall death cells.',
            primer:
              "Contrast the unconditional humanity of Tubby Clayton's 'Abandon Rank All Ye Who Enter Here' with the cold wooden cells and execution post where 306 men were condemned for desertion and cowardice.",
            question:
              "How did the British military hierarchy's misunderstanding of shell shock lead to the execution of traumatized soldiers at dawn?",
          },
          {
            objective:
              'Trace the path of national reconciliation from the Poperinge execution post to the Shot at Dawn Memorial at the National Memorial Arboretum (UK).',
            primer:
              'Focus on the Andy DeComyn statue of Herbert Burden and the 306 stakes at the National Memorial Arboretum, examining the 2006 statutory pardon and how society reframes past injustices.',
            question:
              "Why is the National Memorial Arboretum's Shot at Dawn Memorial considered a vital moment of national reckoning and healing for British society?",
          },
        ],
      },
      banner: '/images/stubbington_names_2.jpg',
      do_now: {
        type: 'timeline',
        prediction_question: 'Day 3 Itinerary',
        events: [
          {
            year: '08:00',
            title: 'Breakfast & Packing',
            lat: 50.763,
            lng: 2.893,
            detail: 'Breakfast, room handover, and loading coach.',
          },
          {
            year: '09:15',
            title: 'Menin Gate & Ramparts Walk',
            detail: 'Daytime study of memorial panels and walk to Ypres Ramparts Cemetery.',
            lat: 50.852,
            lng: 2.891,
          },
          {
            year: '10:30',
            title: 'Ypres Town Square',
            detail: 'Supervised visit to a traditional Belgian chocolatier.',
            lat: 50.851,
            lng: 2.885,
          },
          {
            year: '11:20',
            title: 'Talbot House, Poperinge',
            detail:
              "Tour of the famous British soldiers' rest house and club. <a href='https://www.talbothouse.be/en/' target='_blank' style='color:#3b82f6;text-decoration:underline;'>Visit official website</a>.",
            lat: 50.828,
            lng: 2.735,
          },
          {
            year: '12:45',
            title: 'Lunch in Poperinge',
            detail: 'Supervised lunch stop in the town centre.',
            lat: 50.829,
            lng: 2.737,
          },
          {
            year: '13:30',
            title: 'Poperinge Town Hall',
            detail: 'Visit to preserved death cells and military justice sites.',
            lat: 50.83,
            lng: 2.736,
          },
          {
            year: '14:30',
            title: 'Depart for Calais',
            detail: 'Return journey to Eurotunnel terminal.',
          },
          {
            year: '17:50',
            title: 'Eurotunnel Crossing',
            detail: 'Calais to Folkestone (arrives 17:30 UK time).',
          },
          {
            year: '20:00 approx.',
            title: 'Return to School',
            detail: 'Arrival back at Meoncross School for collection.',
            lat: 50.8268,
            lng: -1.2185,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Ypres Ramparts',
          text: '<div style="text-align: center; margin-bottom: 20px;"><img src="/images/St Martin\'s Church and Cloth Hall in Ypres, Belgium—after World War I.png" style="max-width: 100%; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" alt="St Martin\'s Church and Cloth Hall in Ypres, Belgium—after World War I" /><br><small style="color: #64748b;">St Martin\'s Church and Cloth Hall in Ypres, Belgium—after World War I</small></div>The medieval ramparts of Ypres provided some of the only cover in the destroyed city. Soldiers dug deep into the ancient moated defenses to hide from the shelling. The Ramparts Cemetery is one of the most picturesque on the Western Front, built directly into the town\'s defenses.<br><br><div class="poet-eyewitness-card sassoon" style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #4338ca; border-radius: 8px; padding: 22px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><div class="poet-grid" style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;"><div class="poet-portrait" style="flex: 0 0 150px; text-align: center;"><img src="/images/siegfried_sassoon.jpg" alt="Captain Siegfried Sassoon" style="width: 150px; height: auto; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 3px 8px rgba(0,0,0,0.15);" /><small style="display: block; margin-top: 6px; color: #64748b; font-size: 0.8rem; line-height: 1.3;">Captain Siegfried Sassoon<br>(1886–1967)</small></div><div class="poet-bio" style="flex: 1; min-width: 250px;"><span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">Poet Profile &amp; Eyewitness</span><h3 style="margin: 0 0 8px 0; color: #312e81; font-size: 1.25rem; font-family: \'Playfair Display\', serif;">Captain Siegfried Sassoon, MC</h3><p style="margin: 0 0 10px 0; color: #334155; font-size: 0.93rem; line-height: 1.6;">Commissioned into the Royal Welch Fusiliers, Siegfried Sassoon was one of the Great War\'s most decorated frontline officers and fiercest dissenting voices. Known across his battalion as "Mad Jack" for his fearless bravery in no man\'s land, he won the Military Cross in 1916 for rescuing wounded comrades under heavy fire.<br><br>However, as the slaughter continued, Sassoon grew fiercely disillusioned with military leadership. In July 1917, he issued his famous public declaration, <em>"Finished with the War: A Soldier’s Declaration"</em>, refusing to fight further in a war he believed was being deliberately prolonged. Rather than court-martialing a decorated hero, the War Office sent him to Craiglockhart War Hospital for "shell shock," where he met and mentored Wilfred Owen. When the Menin Gate was unveiled with imperial pomp in July 1927, Sassoon reacted with bitter outrage, scorning the triumphal arch as a hollow "sepulchre of crime" that sanitized the agony of the men whose broken bones still lay in the mud.</p></div></div><div class="poem-section" style="margin-top: 18px; padding-top: 18px; border-top: 1px solid #e2e8f0;"><h4 class="poem-title" style="margin: 0 0 12px 0; color: #1e293b; font-size: 1.15rem; font-family: \'Playfair Display\', serif;"><span><i class="fa-solid fa-feather-pointed" style="color: #4338ca; margin-right: 6px;"></i><em>On Passing the New Menin Gate</em></span> <span class="poem-subtitle">(1927)</span></h4><blockquote class="poem-blockquote" style="background: #ffffff; border-left: 4px solid #4338ca; padding: 18px 22px; border-radius: 4px; font-family: \'Georgia\', serif; font-size: 1.02rem; line-height: 1.8; color: #1e293b; margin: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">Who will remember, passing through this Gate,<br>The unheroic Dead who fed the guns?<br>Who shall absolve the foulness of their fate,—<br>Those doomed, conscripted, unvictorious ones?<br>Crudely renewed, the Salient holds its own.<br>Paid are its dues, and waged its warfare; nay,<br>What need to make a triumph out of bone,<br>Or keep a pile of names from passing away?<br><br>Here was the world’s worst wound. And here with pride<br>\'Their name liveth for ever\', the Gateway claims.<br>Was ever an immolation so belied<br>As these intolerably nameless names?<br>Well might the Dead who struggled in the slime<br>Rise and deride this sepulchre of crime.<br><div class="poem-attribution" style="text-align: right; margin-top: 10px; font-family: sans-serif; font-size: 0.85rem; color: #64748b; font-weight: 600;">— <strong>Siegfried Sassoon</strong> (composed July 1927 upon the opening of the Menin Gate)</div></blockquote></div></div><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: Ancient Defenses</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-shield-halved"></i> Look at the thick brick walls of the Ramparts. Why do you think soldiers chose to dig their dugouts into medieval defenses rather than staying in the open town? How does the Ramparts Cemetery differ in atmosphere from Tyne Cot?</p><ul style="margin-top: 15px; color: #475569; font-size: 0.95rem;"> <li>The Ramparts were originally medieval fortifications, massively expanded and reinforced in the 17th century by the famous French military engineer Vauban.</li> <li>Because the brick and earth walls were incredibly thick, they survived the relentless German artillery barrages that completely leveled the rest of the town.</li> <li>British troops honeycombed these ancient walls, digging extensive subterranean dugouts to house battalion headquarters, dormitories, and advanced dressing stations safely out of the blast zones.</li> </ul></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'De Groote’s Chocolatier & Civilian Rebirth',
          text: '<div style="text-align: center; margin-bottom: 20px;"><img src="/images/ypres_cloth_hall.jpg" style="max-width: 100%; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" alt="Reconstructed Cloth Hall and Grote Markt in Ypres" /><br><small style="color: #64748b;">The meticulously reconstructed Cloth Hall and Grote Markt in Ypres today—restored brick-by-brick after total wartime destruction.</small></div>By the Armistice of November 1918, Ypres had been reduced to an apocalyptic wasteland of shattered brick and rubble. Winston Churchill suggested purchasing the entire city as a British national monument, leaving the ruins untouched forever. But the Belgian townspeople fiercely refused. Driven by deep cultural pride, returning families painstakingly cleared the debris and rebuilt their homes, medieval guildhalls, and the majestic 13th-century Cloth Hall exactly as they stood before 1914.<br><br><strong>De Groote’s Chocolatier &amp; Flemish Craft:</strong><ul><li><strong>Artisan Tradition:</strong> Located on the Grote Markt facing the Cloth Hall, De Groote’s is a family-run Belgian chocolatier showcasing Flanders’ world-renowned confectionery craft, from handmade pralines to chocolate Flanders poppies.</li><li><strong>Civilian Resilience:</strong> Our visit celebrates the rebirth of civilian life. The vibrant modern market square proves that war and devastation do not hold the final word over European communities.</li><li><strong>Budget &amp; Currency Management:</strong> Pupils are allocated a <strong>€30–€40 cash envelope</strong> for souvenirs and gifts. Pupils should practice real-world budgeting, mental arithmetic in euros, and courteous transactions with local Belgian retailers.</li></ul><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-euro-sign"></i> Task: Cash Management &amp; Cultural Rebirth</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-basket-shopping"></i> Step inside De Groote’s Chocolatier. Calculate your purchases against your €30–€40 envelope budget. Why is supporting local artisans in the rebuilt Grote Markt a meaningful act of remembrance?</p><ul style="margin-top: 15px; color: #475569; font-size: 0.95rem;"> <li>Budgeting: Check price per 100g or box before ordering, calculate total cost in euros, and check your change accurately.</li> <li>Courteous Language: Use polite greetings with shop staff (e.g., \'Bonjour / Goedendag\', \'Alstublieft\', and \'Merci / Dank u\').</li> <li>Historical Contrast: Compare the bustling, chocolate-scented square today with photos from 1918 when not a single roof remained standing in Ypres.</li> </ul></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: "Talbot House (Every Man's Club)",
          text: 'Located in the town of Poperinge, safely behind the lines, Talbot House was set up by Army Chaplain Tubby Clayton as an \'Every Man\'s Club\'. It was an oasis of sanity where soldiers could escape the psychological horror of the trenches.<br><br><strong>Key Facts:</strong><ul><li>Rank was completely ignored here; signs read \'Abandon Rank All Ye Who Enter Here\'.</li><li>Soldiers could drink tea, write letters, use the library, and attend services in the attic chapel.</li><li>Over half a million men passed through its doors.</li></ul><br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: Abandon Rank</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-mug-hot"></i> Find the famous sign that reads \'Abandon Rank All Ye Who Enter Here\'. Why was it so important for soldiers suffering from the psychological toll of the trenches to have a place where officers and privates were treated as equals?</p><div style="margin-top: 15px; color: #475569; font-size: 0.95rem;"> <p>For soldiers rotating out of the slaughter of the Salient, Talbot House was an essential psychological sanctuary. The mental toll of industrialized warfare—then poorly understood and heavily stigmatized as "shell shock"—destroyed thousands of men. By enforcing the rule "Abandon Rank All Ye Who Enter Here," Tubby Clayton removed the strict, oppressive military hierarchy that dominated soldiers\' lives. This allowed them to decompress, play piano, and speak freely as human beings rather than cogs in a military machine. Today, this deeply resonates with modern understandings of PTSD, recognizing that mental survival in the armed forces requires psychological decompression, peer support, and the destigmatization of trauma.</p> </div></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'Poperinge Death Cells & Discipline',
          text: 'A stark contrast to Talbot House, the nearby Poperinge Town Hall contains the death cells and an execution post used by the British Army. Discipline was incredibly harsh, and shell shock was poorly understood by the high command.<br><br><strong>Key Facts:</strong><ul><li>Over 300 British and Commonwealth soldiers were executed by firing squad during the war, often for \'cowardice\' or \'desertion\'.</li><li>Many of these men were actually suffering from severe psychological trauma (shell shock) caused by the relentless artillery bombardment.</li><li>In 2006, the British Government issued a mass statutory pardon for all soldiers executed for military offenses during the First World War.</li></ul><br><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-clipboard-list"></i> Task: Justice or Tragedy?</h4><div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0; color: #334155; font-weight: bold;"><i class="fa-solid fa-scale-unbalanced"></i> Stand near the cramped death cells. Many of the men executed here were suffering from severe shell shock. Discuss with the person next to you: Why did the British High Command believe executions were necessary, and why was this practice eventually condemned?</p><ul style="margin-top: 15px; color: #475569; font-size: 0.95rem;"> <li>During the First World War, 306 British and Commonwealth soldiers were executed by firing squad.</li> <li>The most common charges were desertion, cowardice, and casting away arms.</li> <li>Medical science at the time failed to recognize that many of these condemned men were suffering from severe, undiagnosed shell shock.</li> <li>Men were held in tiny, damp cells at the Poperinge Town Hall overnight before being shot at dawn against a post in the courtyard.</li> <li>In 2006, the UK government officially granted a posthumous statutory pardon to all 306 soldiers, recognizing the tragic miscarriage of military justice.</li> </ul></div></div>',
        },
        {
          type: 'narrative',
          theme_heading: 'The Shot at Dawn Memorial: National Memorial Arboretum (UK)',
          text: '<div class="source-box" style="text-align: center; margin-bottom: 20px;"><img src="/images/shot_at_dawn_arboretum.jpg" style="max-width: 100%; max-height: 480px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" alt="Shot at Dawn Memorial statue by Andy DeComyn at the National Memorial Arboretum"/><br><small style="color: #64748b;">The Shot at Dawn Memorial at the National Memorial Arboretum, Staffordshire (Sculpted by Andy DeComyn, modeled on 17-year-old Private Herbert Burden)</small></div><div style="margin-bottom: 20px;"><div class="source-box" style="text-align: center;"><img src="/images/gw_arboretum.jpg" style="max-width: 100%; max-height: 320px; border-radius: 8px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" alt="National Memorial Arboretum aerial view, Staffordshire"/><br><small style="color: #64748b;">Aerial view of the 150-acre National Memorial Arboretum at Alrewas, Staffordshire—the UK\'s year-round centre of Remembrance</small></div></div>As our journey through the Ypres Salient draws to a close, the story of the Poperinge execution cells does not end in Belgian soil. It leads directly back to our own nation, to the <strong>National Memorial Arboretum</strong> at Alrewas, Staffordshire—the UK’s 150-acre living woodland centre of Remembrance for all who have served, suffered, and sacrificed in conflict.<br><br><strong>Private Herbert Burden &amp; The Memorial:</strong><ul><li><strong>The Boy Soldier:</strong> The striking central statue was created in 2001 by sculptor Andy DeComyn. It is modeled on Private Herbert Burden of the 1st Battalion, East Surrey Regiment. Burden lied about his age to enlist at just 16 and was sent directly into the slaughter of the Ypres Salient. After watching his close friends butchered at Bellewaarde Ridge, traumatized and disoriented, he wandered away from his post. Condemned without legal defense, he was shot at dawn on 21st July 1915—aged just 17.</li><li><strong>Bound at the Stake:</strong> The statue portrays Burden blindfolded, hands tied behind his back to a wooden post, with a paper firing mark pinned over his heart.</li><li><strong>306 Silent Witnesses:</strong> Behind the statue fan out 306 semi-circular wooden stakes planted in the earth—one for each British and Commonwealth soldier executed for military offences such as desertion, cowardice, and sleeping on post. Each post bears the soldier’s name, age, and regiment.</li><li><strong>Facing the Dawn:</strong> The memorial is deliberately placed at the easternmost point of the Arboretum, where the first rays of the morning sun illuminate the blindfolded face of the boy soldier at dawn.</li><li><strong>Statutory Pardon (2006):</strong> Following decades of campaigning by grieving families, historians, and veterans\' groups, the British Parliament passed the <strong>Armed Forces Act 2006</strong>, officially granting a posthumous statutory pardon to all 306 executed men, formally acknowledging that they were victims of war trauma rather than criminals.</li></ul><br><div style="text-align: left; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);"><h4 style="color: #059669; margin: 0 0 15px 0; font-family: \'Playfair Display\', serif; font-size: 1.4rem;"><i class="fa-solid fa-scale-balanced"></i> Synthesis: Coming Home to Remembrance</h4><div style="background: #f1f5f9; padding: 18px; border-radius: 6px; border: 1px solid #e2e8f0;"><p style="margin: 0 0 10px 0; color: #1e293b; font-weight: bold; font-size: 1.05rem;"><i class="fa-solid fa-monument" style="color: #2563eb;"></i> Reflection: What Place Does the National Arboretum Have in Our Society?</p><p style="margin: 0 0 12px 0; color: #475569; font-size: 0.95rem; line-height: 1.6;">Why is the National Memorial Arboretum such an important ending to our battlefield study? In Flanders, we stood before graves and triumphal arches built in the 1920s in the immediate shadow of victory. But at the National Arboretum in Staffordshire, our nation created a living, evolving landscape that remembers not just military triumph, but the totality of human suffering—including the shell-shocked teenagers shot at dawn, the nurses, the ambulance drivers, and modern peacekeepers. It proves that national memory can mature: moving from harsh imperial condemnation to compassion, historical justice, and collective empathy.</p></div></div>',
        },
      ],
      tour_guide_script: [
        {
          type: 'narrative',
          theme_heading: '9:15 AM – Menin Gate & Ramparts Walk',
          text: '"Before we leave Ypres, we\'re going back to the Menin Gate in the daylight to get a closer look at the memorial. Without the crowds from last night, you can actually walk the panels and read the names. From here, we\'ll take a walk along the old medieval ramparts of the town to the Ramparts Cemetery. It’s a peaceful spot now, but a century ago, soldiers dug into these ancient walls to hide from the constant shelling of the city."<br><br><strong>Teacher Points:</strong><ul><li>Look at the rank abbreviations on the walls; you will see hundreds of ordinary "Pte" (Privates), but also officers, showing that artillery shells did not discriminate by rank.</li><li>The Ramparts Cemetery was used by troops defending the city and is one of the most picturesque war cemeteries, built directly into the moated defenses of Ypres.</li><li>Ypres was completely leveled by artillery during the war; the beautiful medieval buildings in the town square you see today were meticulously rebuilt brick-by-brick in the 1920s.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"Who will remember, passing through this Gate, / The unheroic dead who fed the guns? / Who shall absolve the foulness of their fate,— / Those doomed, conscripted, unvictorious ones?"</em><br>— <strong>Siegfried Sassoon</strong>, highlighting the bitter reality of the missing in his poem On Passing the New Menin Gate.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '10:30 AM – De Groote’s Chocolatier (Ypres Main Square)',
          text: '"We are now stepping into the Grote Markt, entering De Groote’s Chocolatier. In November 1918, Ypres was described as \'a corpse of a city\'. Winston Churchill wanted Britain to buy the ruins and leave them as an eternal sacred graveyard. But the Belgian people refused to let their heritage die. They returned to the mud, gathered the surviving bricks, and meticulously rebuilt the Cloth Hall and town square just as it had stood in the Middle Ages.<br><br>As you buy your chocolates and gifts using your euro cash envelopes (€30–€40 budget), remember that every cobblestone and shopfront here is a living testament to human resilience. Practice your polite French or Dutch phrases, count your euro change carefully, and choose something special to take home to your families."<br><br><strong>Teacher Points:</strong><ul><li>Supervised group visit: Pupils should budget within their allocated €30–€40 cash envelope.</li><li>Remind pupils to calculate prices, keep receipts safe, and practice courteous European shopping etiquette.</li><li>Draw attention to the Cloth Hall tower outside: an exact architectural replica resurrected from total devastation.</li></ul><br><blockquote><strong>Voices of Resilience:</strong><br><em>"We will rebuild our city brick for brick, stone for stone, so that our children may walk where their ancestors walked."</em><br>— <strong>Belgian reconstruction manifesto</strong>, Ypres municipal council, 1919.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '11:20 AM – Talbot House, Poperinge',
          text: '"We are now behind the lines in Poperinge. Where do you go when the psychological pressure of the trenches breaks you? Talbot House was known as \'Every Man\'s Club\'. It was a rare oasis of sanity set up by an Army Chaplain named Tubby Clayton. Here, rank was ignored. Signs on the door said \'Abandon Rank All Ye Who Enter Here.\' Soldiers could drink tea, write letters home, play the piano, and just be human for a few hours before returning to the nightmare."<br><br><strong>Teacher Points:</strong><ul><li>Over half a million men passed through Talbot House during the war.</li><li>The upper floor features an intact attic chapel, where soldiers could attend services and find spiritual comfort away from the roar of the guns.</li><li>"Pop," as the soldiers called Poperinge, was a major logistical hub, filled with supply depots, troops on rest, and unfortunately, a thriving red-light district.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"I felt a profound sense of peace the moment I walked through the door. For the first time in months, we were treated not as numbers in a battalion, but as men."</em><br>— <strong>A British Infantryman\'s reflection</strong> on visiting Talbot House during a brief rest period.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '1:30 PM – Poperinge Town Hall & Death Cells',
          text: '"We end our tour on a very sobering note. Just a short walk from the comfort of Talbot House is Poperinge Town Hall. Here, you will see the death cells and the execution post. Men suffering from what we now know as severe PTSD—shell shock—were often tried for cowardice or desertion. Some were held in these very cells before being tied to a post and shot at dawn by a firing squad of their own comrades."<br><br><strong>Teacher Points:</strong><ul><li>Over 300 British and Commonwealth soldiers were executed during the war.</li><li>Shell shock was poorly understood; many commanders believed it was a failure of moral character rather than a genuine psychological and neurological injury caused by constant bombardment.</li><li>In 2006, the British government finally issued a mass statutory pardon for all soldiers executed for military offenses during the First World War, recognizing the severe trauma they had endured.</li></ul><br><blockquote><strong>Voices from the Front:</strong><br><em>"He was just a boy, trembling so violently he could hardly stand. The doctor said he was completely broken, but the General said an example had to be made to keep the others in line. I have never felt such shame as when we were ordered to raise our rifles."</em><br>— <strong>An anonymous soldier\'s account</strong>, detailing the agonizing reality of serving on a firing squad at dawn.</blockquote>',
        },
        {
          type: 'narrative',
          theme_heading: '2:30 PM – Coach Departure for Calais & Journey Home Reflection',
          text: '"As our coach departs Poperinge at 2:30 PM and heads towards Calais for our Eurotunnel crossing, take a moment to look back at the quiet Belgian fields. Over the last three days, we have traced our local boys from Stubbington and Lee-on-the-Solent across the battlefields of Flanders. But the memory of what happened here does not remain in Belgium—it returns home with us. Back in the UK, at the National Memorial Arboretum in Staffordshire, our country created a permanent national monument to the men shot at dawn: a statue of 17-year-old Private Herbert Burden facing the rising sun, surrounded by 306 wooden posts. On this return journey, reflect on how true remembrance is not just celebrating military glory, but having the courage and compassion to remember every person who suffered."',
        },
      ],
      tasks: [
        'Ypres Ramparts Walk: Trace the ancient 17th-century Vauban earthworks where British soldiers dug deep headquarters and hospital shelters safe from artillery fire. Visit Ramparts Cemetery looking out over the quiet moat.',
        'De Groote’s Chocolatier: Visit the traditional artisan chocolate shop on Ypres Grote Markt. Manage your €30–€40 cash envelope to purchase gifts, and reflect on how the Belgian people rebuilt their flattened medieval city brick-by-brick rather than abandoning it as ruins.',
        "Talbot House 'Every Man's Club': Walk through the doors in Poperinge and find the famous sign: 'Abandon Rank All Ye Who Enter Here'. Climb the stairs to the hop-loft Upper Room chapel where officers and privates prayed side-by-side.",
        'Poperinge Town Hall Death Cells: Step inside the cold, cramped wooden cells where soldiers condemned for desertion and cowardice spent their final night before being shot at dawn. Discuss the posthumous 2006 statutory pardon granted to all 306 men.',
        'Coming Home to Remembrance: Contrast the Poperinge execution courtyard with the Shot at Dawn Memorial at the National Memorial Arboretum in Staffordshire. How does the 2006 statutory pardon and the 306 wooden posts facing the dawn sun symbolize national reconciliation and empathy?',
      ],
    },
    {
      id: 'hero_0',
      title: 'Private T. J. Franklin (Menin Gate · Panel 35)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer:
          'The story of Private T. J. Franklin, who lived at Lived at Meadow Cottage, Chark and is resting at Menin Gate, Ypres.',
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'The Life and Fall of Private T. J. Franklin',
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Meadow Cottage, Chark',
            lat: 50.8107,
            lng: -1.1967,
          },
          {
            year: 'Memorial',
            title: 'Stubbington War Memorial',
            detail: 'Commemorated in the village center.',
            lat: 50.8255,
            lng: -1.214,
          },
          {
            year: 'Resting Place',
            title: 'Menin Gate, Ypres',
            detail: 'Killed 29th April 1915 holding an exposed line on the Frezenberg Ridge.',
            lat: 50.852,
            lng: 2.8913,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'The Menin Gate: Finding Private Thomas John Franklin',
          text: "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Ypres (Menin Gate) Memorial · <strong>Panel 35</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Walk through the main archway. Panel 35 is located on the south staircase wall displaying the Hampshire Regiment fallen.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>Back home inside <strong>Holy Rood Church in Stubbington</strong>, Private Franklin's name is carved on the official Great War Parish Memorial Tablet as:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: \"Courier New\", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>T. J. FRANKLIN</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Listed in Column 1 under the 'ARMY' section, just ten lines below Private William Ayling.</p></div><strong>Rank:</strong> Private<br><strong>Service Number:</strong> 8560<br><strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br><strong>Born:</strong> Alverstoke, Hampshire, c. 1893 (son of George and Mary Ann Jane Franklin).<br><strong>Home Address:</strong> Chark Cottage, later Meadow Cottage, Chark, Lee-on-the-Solent.<br><strong>Military Service & Fate:</strong> Enlisted at Gosport in 1911. Deployed to France in August 1914 as part of the original British Expeditionary Force (awarded 1914 Star). He was killed in action on <strong>29th April 1915</strong> during the Second Battle of Ypres. His battalion held an exposed rearguard position on the Frezenberg Ridge to cover an Allied withdrawal, enduring torrential artillery shelling and the first German poison gas attacks. He has no known grave.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>When you enter beneath the Menin Gate, locate <strong>Panel 35</strong>. Look down the list of names under <em>'HAMPSHIRE REGIMENT'</em> until you find <strong>FRANKLIN T.J.</strong> Stand in silence for 30 seconds. Remember that before he stood on Frezenberg Ridge, he walked the lanes around Chark and Lee-on-the-Solent.</p></div>",
        },
      ],
      quiz: [
        {
          question: 'Where did Private Thomas John Franklin live before the war?',
          options: [
            'Meadow Cottage, Chark',
            'Balmoral, Gosport Road',
            'Stubbington Lane',
            "Brown's Farm",
          ],
          answer: 'Meadow Cottage, Chark',
        },
        {
          question: 'Which major battle was Private Franklin killed in?',
          options: [
            'Second Battle of Ypres',
            'Battle of the Somme',
            'Battle of Passchendaele',
            'Battle of Menin Road Ridge',
          ],
          answer: 'Second Battle of Ypres',
        },
        {
          question:
            'What new weapon was used by the Germans during the battle where Private Franklin died?',
          options: ['Poison Gas', 'Tanks', 'Flamethrowers', 'Zeppelins'],
          answer: 'Poison Gas',
        },
      ],
      tasks: [
        "On-Site Field Mission: Enter beneath the Menin Gate and climb the south staircase to Panel 35 under 'HAMPSHIRE REGIMENT'. Locate the carved name 'FRANKLIN T.J.'.",
        'Field Transcription: Record the names and ranks of the comrades carved directly above and below Private Franklin on Panel 35. Observe how many soldiers of the 1st Battalion fell in the Second Battle of Ypres.',
        'Pilgrimage Reflection: Before holding the rearguard line on Frezenberg Ridge under heavy gas and shellfire, Thomas Franklin lived at Meadow Cottage in Chark. Record a short reflection connecting this quiet Hampshire cottage to the 54,000 names around you.',
      ],
      cwgc_data: {
        memorial: 'Ypres (Menin Gate) Memorial',
        panel: 'Panel 35 (Hampshire Regiment)',
        regiment: '1st Battalion, The Hampshire Regiment',
        service_number: '8560',
        date_of_death: '29 April 1915',
        age: 23,
        rank: 'Private',
        hometown: 'Meadow Cottage, Chark, Lee-on-the-Solent',
        parents: 'George and Mary Ann Jane Franklin',
        tablet_inscription: 'T. J. FRANKLIN',
        tablet_location: 'Crofton Parish Memorial Tablet, Holy Rood Church, Stubbington',
      },
    },
    {
      id: 'hero_1',
      title: 'Private W. Ayling (Menin Gate · Panel 35)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer:
          'The story of Private W. Ayling, who lived at Lived in Stubbington Lane; worked as a Baker Boy and is resting at Menin Gate, Ypres.',
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'The Life and Fall of Private W. Ayling',
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived in Stubbington Lane; worked as a Baker Boy',
            lat: 50.82,
            lng: -1.21,
          },
          {
            year: 'Memorial',
            title: 'Stubbington War Memorial',
            detail: 'Commemorated in the village center.',
            lat: 50.8255,
            lng: -1.214,
          },
          {
            year: 'Resting Place',
            title: 'Menin Gate, Ypres',
            detail: 'Killed 9th July 1915 during heavy trench mortar bombardment.',
            lat: 50.852,
            lng: 2.8913,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'The Menin Gate: Finding Private William Ayling',
          text: "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Ypres (Menin Gate) Memorial · <strong>Panel 35</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the south staircase wall on the exact same panel as his battalion comrade Private Franklin.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>On the memorial tablet inside <strong>Holy Rood Church, Stubbington</strong>, William Ayling is commemorated in Column 1:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: \"Courier New\", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>W. AYLING, LCE. CPL.</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>While CWGC rolls list him as Private, the village proudly recorded him as Lance Corporal.</p></div><strong>Rank:</strong> Private (Lance Corporal on Holy Rood memorial)<br><strong>Service Number:</strong> 9330<br><strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br><strong>Born:</strong> c. 1895, Hindhead, Surrey (son of Horace and Annie Ayling).<br><strong>Home Address:</strong> Stubbington Lane, Stubbington.<br><strong>Civilian Trade:</strong> Baker's boy delivering bread around Stubbington village.<br><strong>Military Service & Fate:</strong> Enlisted at Winchester. Crossed to France in August 1914. Fought through the Second Battle of Ypres. Killed in action by shellfire and trench mortars north of Ypres (near Boezinge/Hull Farm) on <strong>9th July 1915</strong> (aged just 20). His body was never recovered.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>On <strong>Panel 35</strong>, find <strong>AYLING W.</strong> just a few rows above Private Franklin. Reflect on the fact that at age 20, he was barely older than Year 11 pupils when he was killed in the trenches.</p></div>",
        },
      ],
      quiz: [
        {
          question: "What was William Ayling's occupation before he enlisted?",
          options: ['Baker boy', 'Nurseryman', "Grocer's errand boy", 'Yacht steward'],
          answer: 'Baker boy',
        },
        {
          question: 'How did Private Ayling die?',
          options: [
            'Killed by shell fire',
            'Shot by a sniper',
            'Died of poison gas',
            'Killed in a plane crash',
          ],
          answer: 'Killed by shell fire',
        },
        {
          question:
            'Although official records register him as a Private, what rank is William Ayling commemorated as on the Holy Rood Memorial Tablet?',
          options: ['Lance Corporal', 'Corporal', 'Sergeant', 'Second Lieutenant'],
          answer: 'Lance Corporal',
        },
      ],
      tasks: [
        "On-Site Field Mission: On Panel 35 of the Menin Gate, find 'AYLING W.' under the Hampshire Regiment. He is inscribed on the exact same panel as Thomas Franklin.",
        "Local History Detective: Look closely at the rank discrepancy. The CWGC registers him as a Private, but our village memorial tablet in Holy Rood Church records him as 'W. AYLING, LCE. CPL.'. Why did local communities sometimes remember soldiers by acting or battlefield ranks?",
        "Pilgrimage Reflection: At age 20, William Ayling was a local baker's boy who delivered daily bread across Stubbington. Pause in front of Panel 35 and reflect on how industrialized warfare extinguished the young lives of village teenagers.",
      ],
      cwgc_data: {
        memorial: 'Ypres (Menin Gate) Memorial',
        panel: 'Panel 35 (Hampshire Regiment)',
        regiment: '1st Battalion, The Hampshire Regiment',
        service_number: '9330',
        date_of_death: '9 July 1915',
        age: 20,
        rank: 'Private (Lance Corporal on Parish Tablet)',
        hometown: 'Stubbington Lane, Stubbington',
        parents: 'Horace and Annie Ayling',
        tablet_inscription: 'W. AYLING, LCE. CPL.',
        tablet_location: 'Crofton Parish Memorial Tablet, Holy Rood Church, Stubbington',
      },
    },
    {
      id: 'hero_2',
      title: 'Private S. Muckett (Tyne Cot · Panels 88–90)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer:
          "The story of Private S. Muckett, who lived at Lived at Brown's Farm; worked as a Grocer's Errand Boy and is resting at Tyne Cot British Cemetery.",
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'The Life and Fall of Private S. Muckett',
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: "Lived at Brown's Farm; worked as a Grocer's Errand Boy",
            lat: 50.83,
            lng: -1.22,
          },
          {
            year: 'Memorial',
            title: 'Stubbington War Memorial',
            detail: 'Commemorated in the village center.',
            lat: 50.8255,
            lng: -1.214,
          },
          {
            year: 'Resting Place',
            title: 'Tyne Cot British Cemetery',
            detail: 'Killed 20th September 1917 during the Battle of Menin Road Ridge.',
            lat: 50.8873,
            lng: 2.9982,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Tyne Cot: Finding Private Sydney Muckett',
          text: "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90 and 162</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Located on the grand curved memorial flint-and-stone wall at the rear of the cemetery grounds.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>Inside <strong>Holy Rood Church, Stubbington</strong>, Sydney Muckett is commemorated in Column 2:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: \"Courier New\", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>S. MUCKETT, CORPL.</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Carved on the village tablet as Corporal, reflecting his esteemed status among his fellow parishioners.</p></div><strong>Rank:</strong> Private (Corporal on Holy Rood memorial)<br><strong>Service Number:</strong> 12977 (renumbered 204369)<br><strong>Regiment:</strong> 15th Battalion, The Hampshire Regiment ('Pompey Pals')<br><strong>Born:</strong> 26th December 1895, Titchfield (son of William and Elizabeth Muckett).<br><strong>Home Address:</strong> Brown's Farm, Stubbington.<br><strong>Civilian Trade:</strong> Grocer's errand boy in Stubbington.<br><strong>Military Service & Fate:</strong> Enlisted at Fareham in 1914. Killed in action, aged 21, on <strong>20th September 1917</strong> during the Battle of Menin Road Ridge (Third Battle of Ypres / Passchendaele). His battalion attacked through deep Flanders mud under fierce machine-gun fire. He has no known grave.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>\n            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>\n            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>\n              Walk past the 11,000 headstones to the rear curved stone wall. Locate the Hampshire Regiment panels (**Panels 88–90**). Find <strong>MUCKETT S.</strong> Touch the carved letters of his name and think about his daily life at Brown's Farm before he entered the mud of Menin Road Ridge.\n            </p>\n          </div>",
        },
      ],
      quiz: [
        {
          question: 'Where did Sydney Muckett work before the war?',
          options: ["Grocer's errand boy", 'Baker boy', 'Farm labourer', 'Nurseryman'],
          answer: "Grocer's errand boy",
        },
        {
          question: "Which family did Sydney Muckett's brother and sister marry into?",
          options: ['The Rye family', 'The Ward family', 'The Ayling family', 'The Warland family'],
          answer: 'The Rye family',
        },
        {
          question: 'Private Muckett was killed in action during which battle in September 1917?',
          options: [
            'Battle of Menin Road Ridge',
            'Second Battle of Ypres',
            'Battle of the Somme',
            'Battle of Jutland',
          ],
          answer: 'Battle of Menin Road Ridge',
        },
      ],
      tasks: [
        "On-Site Field Mission: At Tyne Cot, walk to the curved Memorial Wall at the rear perimeter. Locate Panels 88 to 90 for the Hampshire Regiment and find 'MUCKETT S.'.",
        "Field Photography: Take a photograph of Sydney Muckett's name on the stone wall. Notice the surrounding names of men from Portsmouth and Hampshire who volunteered together in the 'Pompey Pals'.",
        "Family Ties: Sydney's brother Frank Muckett married Alice Rye (sister of Arthur Rye, who fell six days later and is commemorated on this exact wall). Record a reflection on how entire village networks were bound in grief.",
      ],
      cwgc_data: {
        memorial: 'Tyne Cot Memorial to the Missing',
        panel: 'Panels 88 to 90 and 162',
        regiment: "15th Battalion, The Hampshire Regiment ('Pompey Pals')",
        service_number: '12977 / 204369',
        date_of_death: '20 September 1917',
        age: 21,
        rank: 'Private (Corporal on Parish Tablet)',
        hometown: "Brown's Farm, Stubbington",
        parents: 'William and Elizabeth Muckett',
        tablet_inscription: 'S. MUCKETT, CORPL.',
        tablet_location: 'Crofton Parish Memorial Tablet, Holy Rood Church, Stubbington',
      },
    },
    {
      id: 'hero_3',
      title: 'Private A. Rye (Tyne Cot · Panels 88–90)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer:
          'The story of Private A. Rye, who lived at Lived at Lower Crabthorne; Nurseryman and is resting at Tyne Cot British Cemetery.',
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'The Life and Fall of Private A. Rye',
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Lower Crabthorne; Nurseryman',
            lat: 50.824,
            lng: -1.226,
          },
          {
            year: 'Memorial',
            title: 'Stubbington War Memorial',
            detail: 'Commemorated in the village center.',
            lat: 50.8255,
            lng: -1.214,
          },
          {
            year: 'Resting Place',
            title: 'Tyne Cot British Cemetery',
            detail: 'Killed 26th September 1917 at Polygon Wood.',
            lat: 50.8873,
            lng: 2.9982,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Tyne Cot: Finding Private Arthur Rye',
          text: "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90 and 162</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the same panels as his relative by marriage, Private Sydney Muckett.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>On the Holy Rood Church Memorial Tablet in Stubbington, Arthur Rye is carved in Column 3:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: \"Courier New\", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>A. RYE</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Listed among the 40+ village men who never returned to their homes in Crofton parish.</p></div><strong>Rank:</strong> Private<br><strong>Service Number:</strong> 22926<br><strong>Regiment:</strong> 14th Battalion, The Hampshire Regiment ('Pompey Pals')<br><strong>Born:</strong> 1897, Forest Side, Sussex (son of Charles and Jane Rye).<br><strong>Home Address:</strong> Lower Crabthorne, Hill Head.<br><strong>Civilian Trade:</strong> Local nurseryman.<br><strong>Local Family Connection:</strong> His sister Alice was married to Frank Muckett (brother of Sydney Muckett).<br><strong>Military Service & Fate:</strong> Enlisted at Fareham. Killed in action, aged 21, on <strong>26th September 1917</strong> at Polygon Wood—just six days after Sydney Muckett was killed nearby. He has no known grave.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>\n            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>\n            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>\n              On <strong>Panels 88–90</strong>, find <strong>RYE A.</strong> near Sydney Muckett. Consider the grief of the Rye and Muckett families in Stubbington receiving death notices within one week of each other.\n            </p>\n          </div>",
        },
      ],
      quiz: [
        {
          question: "What was Arthur Rye's occupation before enlisting?",
          options: ['Nurseryman', 'Farm labourer', 'Baker boy', "Grocer's errand boy"],
          answer: 'Nurseryman',
        },
        {
          question: "Which family did Arthur Rye's sister marry into?",
          options: [
            'The Muckett family',
            'The Ayling family',
            'The Ward family',
            'The Franklin family',
          ],
          answer: 'The Muckett family',
        },
        {
          question:
            'Arthur Rye is commemorated on the exact same memorial panels as which other local hero?',
          options: ['Sydney Muckett', 'William Ayling', 'Archibald Ward', 'Charles Warland'],
          answer: 'Sydney Muckett',
        },
      ],
      tasks: [
        "On-Site Field Mission: On Panels 88 to 90 at Tyne Cot, locate 'RYE A.' under the Hampshire Regiment. Notice how close his name is to Sydney Muckett.",
        'The Sorrow of Hill Head: Arthur Rye was a nurseryman at Lower Crabthorne. He was killed at Polygon Wood on 26th September 1917—just six days after Sydney Muckett fell on the Menin Road. In your notes, calculate how quickly casualty notifications reached families in Hampshire.',
        'Topography Observation: Stand at the Memorial Wall and look up toward the crest of Passchendaele ridge. Describe in two sentences why taking this ridge cost so many tens of thousands of Commonwealth lives.',
      ],
      cwgc_data: {
        memorial: 'Tyne Cot Memorial to the Missing',
        panel: 'Panels 88 to 90 and 162',
        regiment: "14th Battalion, The Hampshire Regiment ('Pompey Pals')",
        service_number: '22926',
        date_of_death: '26 September 1917',
        age: 21,
        rank: 'Private',
        hometown: 'Lower Crabthorne, Hill Head',
        parents: 'Charles and Jane Rye',
        tablet_inscription: 'A. RYE',
        tablet_location: 'Crofton Parish Memorial Tablet, Holy Rood Church, Stubbington',
      },
    },
    {
      id: 'hero_4',
      title: 'Lance Corporal A. H. Ward (Tyne Cot · Panels 88–90)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer:
          'The story of Lance Corporal A. Ward, who lived at Lived at Balmoral, Gosport Road and is resting at Tyne Cot British Cemetery.',
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'The Life and Fall of Lance Corporal A. Ward',
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Balmoral, Gosport Road',
            lat: 50.826,
            lng: -1.212,
          },
          {
            year: 'Memorial',
            title: 'Stubbington War Memorial',
            detail: 'Commemorated in the village center.',
            lat: 50.8255,
            lng: -1.214,
          },
          {
            year: 'Resting Place',
            title: 'Tyne Cot British Cemetery',
            detail: 'Killed 14th October 1918 advancing in thick mist.',
            lat: 50.8873,
            lng: 2.9982,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Tyne Cot: Finding Lance Corporal Archibald Hugh Ward',
          text: "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'>\n            <h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4>\n            <p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90 and 162</strong> (Hampshire Regiment)</p>\n            <p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the Hampshire Regiment section of the rear memorial wall.</p>\n          </div>\n\n          <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'>\n            <h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4>\n            <p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>\n              Inside <strong>Holy Rood Church, Stubbington</strong>, Archibald Ward is carved in Column 3 directly alongside his fallen brother:\n            </p>\n            <div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: \"Courier New\", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>\n              A. WARD<br>H. V. WARD\n            </div>\n            <p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Both sons of the Ward family from Hill Head Coastguard Cottages gave their lives.</p>\n          </div>\n\n          <strong>Rank:</strong> Lance Corporal<br>\n          <strong>Service Number:</strong> 17568<br>\n          <strong>Regiment:</strong> 15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment<br>\n          <strong>Born:</strong> 1896, Alverstoke (son of Hugh Ward, yacht steward & former RN Coastguard, and Bertha Kathleen Ward).<br>\n          <strong>Home Address:</strong> 6 Coastguard Cottages, Hill Head, and later Balmoral, Seymour Road, Lee-on-the-Solent.<br>\n          <strong>Military Service & Fate:</strong> Enlisted in Portsmouth. Fought on the Western Front and in Italy before returning to Flanders in spring 1918. Killed in action, aged 23, on <strong>14th October 1918</strong> near Gheluwe during the final Hundred Days Advance—less than four weeks before the Armistice. He has no known grave.<br><br>\n\n          <div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>\n            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>\n            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>\n              Find <strong>WARD A.H.</strong> on <strong>Panels 88–90</strong>. Reflect on the profound poignancy of a young man killed in October 1918 when peace was already on the immediate horizon.\n            </p>\n          </div>",
        },
      ],
      quiz: [
        {
          question: "Where did Archibald Hugh Ward's father work?",
          options: ['Royal Navy Coastguard', 'Farm labourer', 'Local baker', 'Nurseryman'],
          answer: 'Royal Navy Coastguard',
        },
        {
          question: 'In which campaigns did Lance Corporal Ward fight?',
          options: [
            'Western Front and Italy',
            'Gallipoli and Mesopotamia',
            'Western Front and Egypt',
            'Mesopotamia and Italy',
          ],
          answer: 'Western Front and Italy',
        },
        {
          question: 'When was Lance Corporal Ward killed in action?',
          options: [
            'Less than a month before the Armistice',
            'On the first day of the Somme',
            'During the Second Battle of Ypres',
            'In the spring of 1915',
          ],
          answer: 'Less than a month before the Armistice',
        },
      ],
      tasks: [
        "On-Site Field Mission: On Panels 88 to 90 at Tyne Cot, locate 'WARD A.H.' under the Hampshire Regiment.",
        'The Final Hundred Days: Archibald Ward was killed in action on 14th October 1918 near Gheluwe during the final Allied offensive in Flanders. The Armistice was signed just 28 days later on 11th November. Reflect on the heartbreak of losing a child when peace was already imminent.',
        "Brothers Commemorated: Archibald's brother Horace Ward also lost his life in August 1917. Look at Column 3 of the Crofton Tablet where 'A. WARD' and 'H. V. WARD' appear together.",
      ],
      cwgc_data: {
        memorial: 'Tyne Cot Memorial to the Missing',
        panel: 'Panels 88 to 90 and 162',
        regiment: '15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment',
        service_number: '17568',
        date_of_death: '14 October 1918',
        age: 23,
        rank: 'Lance Corporal',
        hometown: '6 Coastguard Cottages, Hill Head / Balmoral, Seymour Road, Lee-on-the-Solent',
        parents: 'Hugh (RN Coastguard) and Bertha Kathleen Ward',
        tablet_inscription: 'A. WARD',
        tablet_location: 'Crofton Parish Memorial Tablet, Holy Rood Church, Stubbington',
      },
    },
    {
      id: 'hero_5',
      title: 'Private C. A. H. Warland (Tyne Cot · Panels 14–17)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer:
          'The story of Private C. Warland, who lived at Lived at Canford and is resting at Tyne Cot British Cemetery.',
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'The Life and Fall of Private C. Warland',
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Canford',
            lat: 50.825,
            lng: -1.214,
          },
          {
            year: 'Memorial',
            title: 'Stubbington War Memorial',
            detail: 'Commemorated in the village center.',
            lat: 50.8255,
            lng: -1.214,
          },
          {
            year: 'Resting Place',
            title: 'Tyne Cot British Cemetery',
            detail: 'Killed 4th October 1917 taking Juniper Trench.',
            lat: 50.8873,
            lng: 2.9982,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Tyne Cot: Finding Private Charles Alfred Henry Warland',
          text: "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'>\n            <h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4>\n            <p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 14 to 17 and 162 to 162A</strong> (The Queen's Royal West Surrey)</p>\n            <p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Located on the western wing of the Memorial Wall under The Queen's (Royal West Surrey Regiment).</p>\n          </div>\n\n          <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'>\n            <h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4>\n            <p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>\n              On the Holy Rood Church Memorial Tablet in Stubbington, Charles Warland is carved in Column 3:\n            </p>\n            <div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: \"Courier New\", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>\n              C. WARLAND\n            </div>\n            <p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Remembered by his parish alongside Arthur Rye and Archibald Ward.</p>\n          </div>\n\n          <strong>Rank:</strong> Private<br>\n          <strong>Service Number:</strong> T/202335<br>\n          <strong>Regiment:</strong> 3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)<br>\n          <strong>Born:</strong> 1897, Richmond, Surrey (son of John Alfred Henry and Louisa Clara Warland).<br>\n          <strong>Home Address:</strong> Canford, Lee-on-the-Solent.<br>\n          <strong>Family Context:</strong> His father was a sporting journalist, author, and Secretary of Lee-on-the-Solent Golf Club.<br>\n          <strong>Military Service & Fate:</strong> Enlisted in Richmond. Killed in action, aged 20, on <strong>4th October 1917</strong> during the Battle of Broodseinde, advancing across flooded swamp ground to capture Juniper Trench. He has no known grave.<br><br>\n\n          <div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>\n            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>\n            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>\n              Head to <strong>Panels 14–17</strong> under <em>'QUEEN'S (ROYAL WEST SURREY REGIMENT)'</em>. Locate <strong>WARLAND C.</strong> Reflect on his assault across the Flanders mud at Broodseinde.\n            </p>\n          </div>",
        },
      ],
      quiz: [
        {
          question: "What was Charles Warland's father's profession?",
          options: [
            'Sporting journalist and author',
            'Royal Navy Coastguard',
            'Army Pensioner',
            'Farm labourer',
          ],
          answer: 'Sporting journalist and author',
        },
        {
          question: 'Which regiment did Private Warland serve in?',
          options: [
            "The Queen's (Royal West Surrey) Regiment",
            'The Hampshire Regiment',
            'The London Regiment',
            'The Gloucestershire Regiment',
          ],
          answer: "The Queen's (Royal West Surrey) Regiment",
        },
        {
          question:
            "What was the main obstacle Private Warland's unit had to cross during the assault where he was killed?",
          options: [
            'The Polygonebeek marsh',
            'The River Somme',
            'The Menin Road',
            'The Hindenburg Line',
          ],
          answer: 'The Polygonebeek marsh',
        },
      ],
      tasks: [
        "On-Site Field Mission: Walk to Panels 14 to 17 on the western section of the Tyne Cot Memorial Wall. Under 'THE QUEEN'S (ROYAL WEST SURREY REGIMENT)', locate 'WARLAND C.'.",
        'The Battle of Broodseinde: Private Warland was killed in action on 4th October 1917 as his battalion charged through the liquid mud of the Polygonebeek marsh to storm Juniper Trench. Observe how wet and low-lying the valley is below Tyne Cot.',
        'Community Cross-Section: Charles was the son of the Secretary of Lee-on-the-Solent Golf Club. Reflect on how sons of professionals and sons of farm labourers fought and fell shoulder to shoulder.',
      ],
      cwgc_data: {
        memorial: 'Tyne Cot Memorial to the Missing',
        panel: 'Panels 14 to 17 and 162 to 162A',
        regiment: "3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)",
        service_number: 'T/202335',
        date_of_death: '4 October 1917',
        age: 20,
        rank: 'Private',
        hometown: 'Canford, Lee-on-the-Solent',
        parents: 'John Alfred Henry (author & golf club secretary) and Louisa Clara Warland',
        tablet_inscription: 'C. WARLAND',
        tablet_location: 'Crofton Parish Memorial Tablet, Holy Rood Church, Stubbington',
      },
    },
    {
      id: 'hero_lowry_william',
      title: 'Second Lieutenant W. A. H. Lowry (Helles · Gallipoli)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer: "The story of William Augustine 'Harper' Lowry, who lived at Manor Way Grange.",
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: "The Life and Fall of William Augustine 'Harper' Lowry",
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Manor Way Grange in Lee-on-the-Solent. Eldest brother.',
            lat: 50.8107,
            lng: -1.1967,
          },
          {
            year: 'Resting Place',
            title: 'Gully Ravine (Gallipoli)',
            detail:
              'Killed on 4th June 1915 leading a desperate charge up Gully Ravine. He has no known grave.',
            lat: 40.32,
            lng: 26.26,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: "William Augustine 'Harper' Lowry",
          text: '<div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start;"><div style="flex:1; min-width:300px;"><strong>Regiment:</strong> Indian Army<br><strong>Age:</strong> 25<br><strong>Local Connection:</strong> Lived at Manor Way Grange in Lee-on-the-Solent. He was the eldest of the three Lowry brothers.<br><br><strong>Military Service & Fate:</strong> He fought in the Gallipoli campaign. On 4th June 1915, he was killed leading a desperate charge up Gully Ravine. Because of relentless Turkish machine-gun fire, those who fell too badly wounded to move could not be rescued or safely recovered, and they tragically died of exposure. His body was never recovered. He has no known grave and is commemorated on the Helles Memorial in Gallipoli, Turkey.<br><br><i>*Biographical information courtesy of the Stubbington and Hill Head History Society.*</i></div><div style="flex: 0 0 200px; text-align:center;"><img src="/images/lowry_william.png" style="width:100%; border-radius:8px; border:1px solid #ccc; box-shadow:0 4px 6px rgba(0,0,0,0.1);" /></div></div>',
        },
      ],
      tasks: [
        'Home Front Memorial Study: William Augustine Harper Lowry fell at Gallipoli on 4th June 1915 leading a charge up Gully Ravine. His name is carved into the Helles Memorial in Turkey (Panel 230 to 239).',
        "Crofton Tablet Investigation: On the Holy Rood tablet in Stubbington, locate 'W. A. H. LOWRY, LIEUT.' in Column 2. He was the eldest of the three brothers.",
        "Reflection: Why did families like the Lowrys place memorial tablets in their local parish churches when their sons' bodies were lost thousands of miles away?",
      ],
    },
    {
      id: 'hero_lowry_auriol',
      title: 'Lieutenant Colonel A. E. E. Lowry, DSO, MC (La Targette · Arras)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer: "The story of Auriol 'Eric' Lowry, who lived at Manor Way Grange.",
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: "The Service of Auriol 'Eric' Lowry",
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Manor Way Grange in Lee-on-the-Solent. Middle brother.',
            lat: 50.8107,
            lng: -1.1967,
          },
          {
            year: 'Action',
            title: 'Westhoek Ridge',
            detail:
              'Fought at Westhoek Ridge in 1917. Commanded the battalion where his younger brother Patrick served.',
            lat: 50.852,
            lng: 2.8913,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: "Auriol 'Eric' Lowry",
          text: '<div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start;"><div style="flex:1; min-width:300px;"><strong>Regiment:</strong> West Yorkshire Regiment<br><strong>Local Connection:</strong> Lived at Manor Way Grange in Lee-on-the-Solent. He was the middle brother.<br><br><strong>Military Service:</strong> He fought at Westhoek Ridge in 1917. Uniquely, he commanded the battalion in which his younger brother Patrick also served, bearing the heavy burden of leadership and family duty. He was killed instantaneously by a random machine-gun bullet on 23rd September 1918 (aged 25) while inspecting frontline outposts in the Acheville Sector near Arleux, France, dying in his runner\'s arms. He is buried at La Targette Cemetery, Neuville-St. Vaast, in Northern France. His burial was highly distinguished, attended by an Army commander, two corps commanders, and three divisional commanders as a sign of the immense respect he had earned.<br><br><i>*Biographical information courtesy of the Stubbington and Hill Head History Society.*</i></div><div style="flex: 0 0 200px; text-align:center;"><img src="/images/lowry_auriol.png" style="width:100%; border-radius:8px; border:1px solid #ccc; box-shadow:0 4px 6px rgba(0,0,0,0.1);" /></div></div>',
        },
      ],
      tasks: [
        'Home Front Memorial Study: Eric Lowry rose to Lieutenant Colonel at just 25 years old, earning the DSO, Military Cross with Bar, and French Croix de Guerre. He fought in the Ypres Salient at Westhoek Ridge in August 1917.',
        "The Heavy Burden of Leadership: Eric commanded the very battalion (2nd Bn West Yorkshires) in which his younger brother Patrick served, and witnessed Patrick's death on the Somme in March 1918 before falling himself six months later on 23rd September 1918.",
        "Crofton Tablet Investigation: Locate 'A. E. E. LOWRY, LT. COL. M.C. D.S.O.' in Column 2 of the Holy Rood tablet. Compare his marked grave at La Targette near Arras with his two brothers who have no known graves.",
      ],
    },
    {
      id: 'hero_lowry_cyril',
      title: 'Captain C. J. P. Lowry (Pozières · Somme)',
      enquiry: 'Local Hero',
      banner: '/images/stubbington_memorial_2.jpg',
      teacher_notes: {
        primer: "The story of Cyril John 'Patrick' Lowry, who lived at Manor Way Grange.",
        objectives: [],
      },
      do_now: {
        type: 'timeline',
        prediction_question: "The Life and Fall of Cyril John 'Patrick' Lowry",
        events: [
          {
            year: 'Home',
            title: 'Stubbington Connection',
            detail: 'Lived at Manor Way Grange in Lee-on-the-Solent. Youngest brother.',
            lat: 50.8107,
            lng: -1.1967,
          },
          {
            year: 'Resting Place',
            title: 'Somme',
            detail:
              'Killed on 25th March 1918 during a German offensive near the Somme, in full view of his brother Eric.',
            lat: 50.01,
            lng: 2.68,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: "Cyril John 'Patrick' Lowry",
          text: '<div style="display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start;"><div style="flex:1; min-width:300px;"><strong>Regiment:</strong> West Yorkshire Regiment<br><strong>Age:</strong> 20<br><strong>Local Connection:</strong> Lived at Manor Way Grange in Lee-on-the-Solent. He was the youngest brother.<br><br><strong>Military Service & Fate:</strong> Served under the command of his older brother, Eric. He was tragically killed on 25th March 1918 (aged 20) while leading a counter-attack with C Company to defend the River Somme bridgehead west of Eterpigny, France. In the chaos of the massive German Spring Offensive and the subsequent British withdrawal, his body was never recovered for burial. Heartbreakingly, he fell in full view of his brother Eric. He has no known grave and is commemorated on the Pozieres Memorial in France (located on the old Roman road between Albert and Bapaume).<br><br><i>*Biographical information courtesy of the Stubbington and Hill Head History Society.*</i></div><div style="flex: 0 0 200px; text-align:center;"><img src="/images/lowry_cyril.png" style="width:100%; border-radius:8px; border:1px solid #ccc; box-shadow:0 4px 6px rgba(0,0,0,0.1);" /></div></div>',
        },
      ],
      tasks: [
        'Home Front Memorial Study: Patrick Lowry was just 20 when he fell defending the Somme river crossing at Eterpigny on 25th March 1918 during the massive German Spring Offensive.',
        'Brothers in Arms: Patrick led C Company into action under the direct command of his older brother Eric. Heartbreakingly, he fell in full view of Eric.',
        "Crofton Tablet Investigation: Find 'C. J. P. LOWRY, CAPT.' on the Holy Rood tablet. Reflect on Mrs. Annie Lowry back at Manor Way Grange receiving telegraphs that all three of her sons had been killed.",
      ],
    },
    {
      id: 'hero_crummack',
      title: '2nd Lieutenant E. E. Crummack MC, DCM (Pupil Family Hero · Year 10 Aby)',
      enquiry:
        'From Coal Miner to Decorated Officer: The Epic Great War Odyssey of Ernest Edward Crummack',
      banner: '/images/crummack/portrait_sgt_ernest_crummack_1916.jpg',
      poetry_dossiers: poetryDossiers.special_studies,
      teacher_notes: {
        primer:
          "This dedicated pupil family history study connects our Ypres and Somme battlefield studies directly to Meoncross Year 10 pupil Aby and his family. Tracing the combat journey of 2nd Lieutenant Ernest Edward Crummack MC, DCM through primary sources—including original photographs, medals, trench maps, and battalion diaries researched by Aby's grandfather Edward Pearson—students explore how a South Yorkshire coal miner progressed from the waterlogged trenches of Festubert and the deadly phosgene gas attacks of Boesinghe to heroic rescues on the Somme (saving 2nd Lt Marcus Goodall, the close friend of poet Siegfried Sassoon) and breaching the Hindenburg Line at the Canal du Nord. This dossier offers an extraordinary case study of frontline courage, social mobility in the British Army, and the enduring power of family remembrance.",
        objectives: [
          {
            objective:
              'Investigate the direct personal link between Meoncross pupil Aby (Year 10), mother Harriet Uwalaka, grandfather Edward Pearson, and 2nd Lieutenant Ernest Crummack MC, DCM.',
            primer:
              "Begin by drawing pupils' attention to the opening provenance and lineage banner. Explain that Aby's mother Harriet contacted Mr Lovett following the parent briefing, providing the extensive research dossier compiled by Aby's grandfather Edward Pearson. Emphasise that Aby's middle name is Ernest in honour of his great-great-grandfather. Have pupils discuss how family oral history and personal artifacts transform our understanding of the war from distant textbook statistics into living memory.",
            question:
              "How does discovering that a classmate's direct ancestor survived the poison gas of Boesinghe and the horrors of Thiepval Wood transform our emotional connection to the battlefield landscapes we are about to visit?",
          },
          {
            objective:
              "Analyze Sergeant Crummack's heroic rescue of 2nd Lieutenant Marcus Goodall at Thiepval Wood on 3 July 1916 and its connection to war poet Siegfried Sassoon.",
            primer:
              "Direct pupils to the panoramic photograph of Mill Road and the Somme tactical maps. Unpack the harrowing circumstances of 3 July 1916 in Thiepval Wood: Sergeant Crummack crawled out under intense machine-gun and shell fire to rescue the gravely wounded 2nd Lt Marcus Goodall, earning the Distinguished Conduct Medal and Russian Medal of St George. Highlight grandfather Edward Pearson's discovery that Marcus Goodall was the beloved friend of Siegfried Sassoon, who wrote an elegy for him.",
            question:
              "Why did soldiers like Sergeant Crummack risk their lives to rescue wounded comrades under fire in No Man's Land, and what does the connection between Marcus Goodall and Siegfried Sassoon teach us about the shared humanity behind war poetry?",
          },
          {
            objective:
              "Evaluate how Crummack's battlefield commissioning and Military Cross action at the Canal du Nord (September 1918) reflect both tactical innovation and social mobility in the late-war British Army.",
            primer:
              "Examine the tactical map of the Canal du Nord and Cambrai crossing alongside Crummack's official Military Cross citation. Discuss how Crummack—originally an underground coal miner—was commissioned from the ranks as a 2nd Lieutenant, leading his men through uncut wire to storm German machine-gun positions and breach the Hindenburg Line.",
            question:
              'In what ways did the massive casualty rates of 1916–17 force the British Army to abandon class-based officer recruitment in favor of battle-tested working-class leaders like Ernest Crummack?',
          },
        ],
        source_context: {
          medals:
            'The mounted original medal group of 2nd Lieutenant Ernest Edward Crummack MC, DCM, including the Military Cross, Distinguished Conduct Medal, 1914–15 Star, British War Medal, Victory Medal, and the Russian Medal of the Order of St George (3rd Class). What does the presence of an Imperial Russian gallantry award alongside British combat decorations tell us about the global alliance network of the First World War?',
          boesinghe_trench_map:
            "Official 1915 trench map showing the British and German frontlines along the Yser Canal at Boesinghe ('The Northern Nip'), directly north of Essex Farm Cemetery where John McCrae penned 'In Flanders Fields'. Why did the steep canal banks at Boesinghe provide crucial defensive positions during the first German phosgene gas attacks in December 1915?",
          thiepval_wood_photo:
            "Contemporary panoramic photograph taken from the edge of Thiepval Wood looking across Mill Road towards the German stronghold at the Pope's Nose redoubt. How did the open, exposed topography of Mill Road make the evacuation of wounded officers like Marcus Goodall an act of near-suicidal bravery?",
          sassoon_manuscript:
            "Siegfried Sassoon's original handwritten wartime notebook (Cambridge University Library MS Add.9852/1/7, f. 38r), showing the working draft of 'Elegy: for M.G. (Marcus Goodall)', composed in July 1916 after Goodall was mortally wounded in Thiepval Wood and rescued under fire by Sergeant Crummack. Notice Sassoon's poignant textual revisions: altering 'Poor victim' to 'Sad victim', 'wet clay' to 'dead clay', and visualizing a peaceful English morning while his friend lay dying in the mud. How does comparing Sassoon's poetic grief with Sergeant Crummack's physical rescue of Marcus Goodall challenge the idea that frontline soldiers were passive victims rather than active agents of comradeship and moral courage?",
          canal_du_nord_map:
            'Tactical battle map illustrating the crossing of the unfinished Canal du Nord by the 62nd (West Riding) and Canadian Divisions between 27 September and 1 October 1918. How did British combined-arms tactics in the Hundred Days Offensive succeed in breaching the formidable Hindenburg Line where earlier mass infantry charges had failed?',
        },
      },
      do_now: {
        type: 'timeline',
        prediction_question: 'Great War Battlefield Recall: From Ypres to the Hundred Days',
        events: [
          {
            year: 'Aug 1914',
            title: 'Outbreak of War & BEF Mobilisation',
            detail:
              'Britain declares war on Germany; British Expeditionary Force deploys to France and Belgium.',
            lat: 50.45,
            lng: 3.95,
          },
          {
            year: 'Apr–May 1915',
            title: 'Second Battle of Ypres & First Gas Attack',
            detail:
              'Germans release chlorine gas at Gravenstafel; Canadian and British troops hold the Ypres Salient.',
            lat: 50.85,
            lng: 2.88,
          },
          {
            year: 'Dec 1915',
            title: 'First Phosgene Gas Attack at Boesinghe',
            detail:
              'German forces unleash deadly phosgene gas against the 49th (West Riding) Division along the Yser Canal.',
            lat: 50.88,
            lng: 2.86,
          },
          {
            year: 'Jul 1916',
            title: 'First Day on the Somme',
            detail:
              'British Army suffers 57,470 casualties on 1 July 1916 advancing towards Thiepval and Pozières.',
            lat: 50.06,
            lng: 2.68,
          },
          {
            year: 'Sep–Oct 1918',
            title: 'Breaking the Hindenburg Line at Canal du Nord',
            detail:
              'Allied Hundred Days Offensive smashes through the fortified Hindenburg Line, forcing the German armistice.',
            lat: 50.15,
            lng: 3.12,
          },
        ],
      },
      narrative_blocks: [
        {
          type: 'narrative',
          theme_heading: 'Family Provenance & Lineage: Living History at Meoncross School',
          text: '\n        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-top: 4px solid #1e3a8a; border-radius: 8px; padding: 24px 28px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">\n          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 14px; margin-bottom: 18px;">\n            <div>\n              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; display: block; margin-bottom: 3px;">Pupil Family Historical Record · Archive Reference MCP-1918-EC</span>\n              <h3 style="margin: 0; color: #0f172a; font-size: 1.45rem; font-family: \'Playfair Display\', serif; font-weight: 700;">The Ernest Crummack Dossier</h3>\n            </div>\n            <span style="font-size: 0.8rem; font-weight: 600; color: #334155; background: #f8fafc; border: 1px solid #cbd5e1; padding: 5px 12px; border-radius: 4px;">\n              Meoncross School · Year 10 GCSE Fieldwork\n            </span>\n          </div>\n\n          <p style="color: #334155; font-size: 1rem; line-height: 1.65; margin: 0 0 14px 0;">\n            Following the Meoncross School Ypres Battlefield Tour Parent Briefing evening in September 2026, <strong>Harriet Uwalaka</strong> (née Pearson) contacted <strong>Mr Ben Lovett</strong> (Head of History) to share an extraordinary family archive. Her son, <strong>Aby</strong> (Year 10), carries the middle name <strong>Ernest</strong> in proud honour of his direct ancestor: <strong>2nd Lieutenant Ernest Edward Crummack MC, DCM, Russian Medal of St George</strong>.\n          </p>\n          <p style="color: #334155; font-size: 0.95rem; line-height: 1.65; margin: 0 0 18px 0;">\n            The historical dossier was researched and meticulously compiled over years of study by Aby\'s grandfather, <strong>Edward Pearson</strong> (Harriet\'s father)—a dedicated military historian who analyzed original battalion war diaries, regimental gazettes, and trench maps to piece together Ernest\'s astonishing journey through the greatest battles of the Western Front.\n          </p>\n\n          <!-- Lineage Diagram -->\n          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 18px 20px; margin-bottom: 16px;">\n            <strong style="color: #475569; display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; text-align: center;">\n              Five Generations of Direct Lineage (1888–Present)\n            </strong>\n            <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.88rem; text-align: center;">\n              <div style="background: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">\n                <strong>2nd Lt Ernest Edward Crummack MC, DCM</strong><br><small style="color: #64748b; font-weight: 500;">Great-Great-Grandfather (1888–1968)</small>\n              </div>\n              <span style="color: #94a3b8; font-size: 1.1rem; font-weight: bold;">&rarr;</span>\n              <div style="background: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">\n                <strong>Edward Crummack</strong><br><small style="color: #64748b; font-weight: 500;">Great-Grandfather</small>\n              </div>\n              <span style="color: #94a3b8; font-size: 1.1rem; font-weight: bold;">&rarr;</span>\n              <div style="background: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">\n                <strong>Edward Pearson</strong><br><small style="color: #64748b; font-weight: 500;">Grandfather &amp; Military Historian</small>\n              </div>\n              <span style="color: #94a3b8; font-size: 1.1rem; font-weight: bold;">&rarr;</span>\n              <div style="background: #ffffff; color: #1e293b; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">\n                <strong>Harriet Uwalaka (née Pearson)</strong><br><small style="color: #64748b; font-weight: 500;">Mother</small>\n              </div>\n              <span style="color: #94a3b8; font-size: 1.1rem; font-weight: bold;">&rarr;</span>\n              <div style="background: #eff6ff; color: #1e3a8a; border: 1.5px solid #93c5fd; padding: 8px 16px; border-radius: 6px; box-shadow: 0 1px 3px rgba(37,99,235,0.08);">\n                <strong>Aby (Ernest)</strong><br><small style="color: #2563eb; font-weight: 600;">Year 10 Pupil · Meoncross School</small>\n              </div>\n            </div>\n          </div>\n\n          <div style="font-size: 0.8rem; color: #64748b; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 10px;">\n            Safeguarding Notice: In accordance with Meoncross School safeguarding protocols, pupil surname is withheld.\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading: 'Chapter 1: The Miner from the Yorkshire Coalfields (1888–1914)',
          text: '\n        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; margin-bottom: 24px;">\n          <div style="flex: 1; min-width: 290px;">\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              <strong>Ernest Edward Crummack</strong> was born on <strong>11 January 1888</strong> in Barnsley, in the industrial heart of the South Yorkshire coalfield. Like thousands of young men in the region, he descended into the pits as a young boy, working as a coal miner—specifically as a "ripper", tasked with cutting through heavy rock and blasting out tunnel headings hundreds of feet underground.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              The physical toughness, camaraderie, and instinctive reliance on fellow workers forged in the coalmines would prove foundational to his military career. On <strong>22 May 1910</strong>, Ernest married <strong>Clara Senior</strong> at Christ Church, Brampton Bierlow. The young couple made their home in the pit village of Dinnington, near Rotherham, where Ernest worked at the newly sunk Dinnington Main Colliery.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              When war was declared in August 1914, Lord Kitchener issued his appeal for volunteers. Ernest did not hesitate. On <strong>2 September 1914</strong>, at Rotherham Drill Hall, he enlisted as <strong>Private 2404</strong> in the <strong>1/5th Battalion, York and Lancaster Regiment</strong> (part of the 148th Brigade, 49th West Riding Division, Territorial Force).\n            </p>\n          </div>\n          <div style="flex: 0 0 280px; text-align: center; margin: 0 auto;">\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/portrait_sgt_ernest_crummack_1916.jpg" alt="Sergeant Ernest Edward Crummack DCM" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/portrait_sgt_ernest_crummack_1916.jpg">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">Sergeant Ernest Crummack DCM</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">Pictured in uniform wearing his DCM and Russian Medal ribbons after the Somme, 1916.</small>\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading: 'Chapter 2: The Western Front & Baptism of Fire at Festubert (May 1915)',
          text: '\n        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; margin-bottom: 24px;">\n          <div style="flex: 1; min-width: 290px;">\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              After intensive training across the muddy fields of Doncaster and the Yorkshire wolds, the 1/5th York &amp; Lancasters embarked for France, landing at <strong>Boulogne on 13 April 1915</strong>. The men were immediately thrust into the realities of modern warfare on the Western Front.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              Ernest received his baptism of fire during the <strong>Battle of Festubert (9–25 May 1915)</strong>, in the Artois sector south of Neuve Chapelle. Here, the British Army attempted to breach the German lines across flat, waterlogged reclaimed marshland. Because the water table was only eighteen inches below the surface, deep trenches could not be dug; instead, soldiers had to defend shallow ditches and sandbag breastworks under relentless German artillery fire.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              The 1/5th York &amp; Lancasters held support and communication breastworks amid deafening shrapnel barrages and sniper fire. It was during these brutal initial weeks that Private Crummack\'s calm steadiness, endurance, and natural leadership stood out, marking him out for rapid promotion.\n            </p>\n          </div>\n          <div style="flex: 0 0 280px; text-align: center; margin: 0 auto;">\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/map_festubert_1915.png" alt="Map of Festubert Battlefield 1915" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/map_festubert_1915.png">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">Festubert Sector (May 1915)</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">Location of Festubert and Aubers Ridge in Northern France where Ernest first entered frontline combat.</small>\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading:
            'Chapter 3: The Ypres Salient & Phosgene Gas at Boesinghe (July–December 1915)',
          text: '\n        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; margin-bottom: 24px;">\n          <div style="flex: 1; min-width: 290px;">\n            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #1e3a8a; border-radius: 4px; padding: 12px 16px; margin-bottom: 16px;">\n              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #1e3a8a; display: block; margin-bottom: 3px;">\n                Fieldwork Correlation · Meoncross Battlefield Tour\n              </span>\n              <span style="color: #334155; font-size: 0.88rem; line-height: 1.5; display: block;">\n                The sector held by Ernest Crummack at Boesinghe lies directly along the Yser Canal, immediately north of <strong>Essex Farm Cemetery</strong>—the opening study site on Day 1 of our school expedition.\n              </span>\n            </div>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              In July 1915, the 49th Division was transferred north to defend the immortal <strong>Ypres Salient</strong>. The 1/5th York &amp; Lancasters were assigned to hold the frontline trenches along the east bank of the <strong>Yser Canal at Boesinghe</strong>, in a notorious salient bend known to troops as <em>"The Northern Nip"</em>.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              Here, British soldiers dug canal-bank dugouts directly into the western levee of the Yser Canal. The trenches were under constant German observation from higher ground. Sniping was constant, trench mortar \'minies\' fell without warning, and the canal water was fouled with decomposing corpses.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              <strong>19 December 1915: The First Phosgene Gas Attack:</strong> At 5:15 am on a freezing winter morning, German forces discharged thousands of cylinders containing a lethal new weapon—<strong>Phosgene gas</strong>, mixed with chlorine—across the British lines between Boesinghe and Wieltje. Phosgene was eighteen times more toxic than chlorine, colourless, and smelled faintly of damp hay, suffocating victims by filling their lungs with fluid hours after inhalation.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              Ernest and his battalion mates donned their primitive flannel \'P-Helmets\' (flannel bags soaked in sodium phenolate with glass goggles) and manned the fire-steps under a deafening hurricane bombardment. Despite heavy casualties across the division, the 49th Division stood firm and beat back the ensuing German infantry assault. For his calm courage and ability to maintain order during this gas nightmare, Ernest was promoted to <strong>Sergeant</strong>.\n            </p>\n          </div>\n          <div style="flex: 0 0 300px; display: flex; flex-direction: column; gap: 14px; margin: 0 auto;">\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/map_ypres_boesinghe_1915.jpg" alt="Trench Map of Boesinghe 1915" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/map_ypres_boesinghe_1915.jpg">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">Trench Map: Boesinghe (1915)</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">"The Northern Nip" on the Yser Canal. British positions along the canal bank directly north of Essex Farm.</small>\n              </div>\n            </div>\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/map_ypres_location.png" alt="Strategic Map of Ypres Salient" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/map_ypres_location.png">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">Strategic Location: Ypres Salient</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">The salient bulge in West Flanders held by the British Empire throughout 1914–1918.</small>\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading:
            'Chapter 4: The Somme, Thiepval Wood & The Siegfried Sassoon Connection (July 1916)',
          text: '\n        <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #d97706; border-radius: 8px; padding: 18px 22px; margin-bottom: 20px;">\n          <h4 style="margin: 0 0 6px 0; color: #92400e; font-size: 1.15rem; font-family: \'Playfair Display\', serif;">\n            The Siegfried Sassoon Discovery: Researched by Grandfather Edward Pearson\n          </h4>\n          <p style="margin: 0; color: #78350f; font-size: 0.95rem; line-height: 1.5;">\n            One of the most remarkable revelations uncovered by Aby\'s grandfather, military historian <strong>Edward Pearson</strong>, was the identity of the wounded officer saved by Sergeant Crummack in Thiepval Wood: <strong>Second Lieutenant Marcus Goodall</strong>. Archival records confirmed that Goodall was the dear personal friend of famed war poet <strong>Siegfried Sassoon</strong>. When Goodall tragically succumbed to his injuries after being brought back, Sassoon penned an unforgettable poem in his memory.\n          </p>\n        </div>\n\n        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; margin-bottom: 24px;">\n          <div style="flex: 1; min-width: 290px;">\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              In June 1916, the 49th Division was ordered south to the Somme in Picardy. On the fateful morning of <strong>1 July 1916</strong>—the bloodiest day in British military history—the division was placed in reserve around Aveluy Wood, just across the River Ancre.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              As the opening assault faltered against the heavily fortified German strongpoints at <strong>Thiepval</strong> and the <strong>Schwaben Redoubt</strong>, the York &amp; Lancasters were ordered to cross the Ancre marshland under heavy shellfire and move into the forward assembly trenches of <strong>Thiepval Wood</strong>.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              <strong>The Rescue along Mill Road (3 July 1916):</strong> On 3 July, the 1/5th York &amp; Lancasters moved into frontline trenches along Mill Road, facing the dreaded German redoubt known as <em>The Pope\'s Nose</em>. The ground between the opposing lines was an open, cratered wasteland swept by interlocking Maxim machine-gun crossfire from Thiepval Chateau and the ridge above.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              During fierce fighting, <strong>Second Lieutenant Marcus Goodall</strong> was hit and fell severely wounded in the open, unable to crawl back. Hearing his cries and refusing to abandon him to certain death, Sergeant Ernest Crummack climbed out of the parapet into the hail of machine-gun bullets and exploding shells. He reached the stricken officer, bandaged his wounds under fire, and hauled him across the shell-torn dirt back into the British trench.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              For this supreme display of courage, Sergeant Crummack was awarded the <strong>Distinguished Conduct Medal (DCM)</strong>—the second-highest gallantry award for non-commissioned ranks, second only to the Victoria Cross.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              In addition, his act caught the attention of Allied high command: he was awarded the prestigious <strong>Russian Medal of the Order of St George (3rd Class)</strong>, an imperial honour personally bestowed by Tsar Nicholas II to select Allied soldiers who demonstrated legendary gallantry on the Western Front.\n            </p>\n          </div>\n          <div style="flex: 0 0 300px; display: flex; flex-direction: column; gap: 14px; margin: 0 auto;">\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/photo_thiepval_wood_mill_road.jpg" alt="Thiepval Wood and Mill Road" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/photo_thiepval_wood_mill_road.jpg">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">Thiepval Wood &amp; Mill Road</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">Looking from Thiepval Wood towards Mill Road and the German lines at the Pope\'s Nose where Ernest carried out the rescue.</small>\n              </div>\n            </div>\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/map_somme_1july_430pm.jpg" alt="Somme Tactical Map 1 July 1916" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/map_somme_1july_430pm.jpg">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">Somme Tactical Map: 1 July 1916</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">Positions of the 49th Division advancing across the Ancre into Thiepval Wood at 4:30 pm.</small>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!-- Siegfried Sassoon Archival Primary Source Showcase -->\n        <div style="background: linear-gradient(135deg, #fffdfa 0%, #fef8ee 100%); border: 2px solid #d97706; border-radius: 12px; padding: 24px 26px; margin-top: 25px; box-shadow: 0 4px 16px rgba(217, 119, 6, 0.12);">\n          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px dashed #f59e0b; padding-bottom: 12px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">\n            <div style="display: flex; align-items: center; gap: 12px;">\n              <div>\n                <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 8px; border: 1px solid #fde68a;">\n                  Archival Discovery · Cambridge University Library\n                </span>\n                <h4 style="margin: 2px 0 0 0; color: #78350f; font-size: 1.3rem; font-family: \'Playfair Display\', serif;">\n                  Siegfried Sassoon\'s Autograph Manuscript: <em>"Elegy: for M.G. (Marcus Goodall)"</em>\n                </h4>\n              </div>\n            </div>\n            <span style="font-size: 0.78rem; font-weight: 700; color: #78350f; background: #ffffff; border: 1px solid #fde68a; padding: 4px 10px; border-radius: 14px;">\n              Shelfmark: MS Add.9852/1/7, f. 38r\n            </span>\n          </div>\n\n          <p style="color: #451a03; font-size: 0.95rem; line-height: 1.6; margin: 0 0 20px 0;">\n            When grandfather <strong>Edward Pearson</strong> researched the identity of the young officer saved by Sergeant Crummack along Mill Road, he unlocked an unforgettable literary connection. <strong>Second Lieutenant Marcus Goodall</strong> was the intimate friend of fellow subaltern <strong>Siegfried Sassoon</strong> (1st Battalion Royal Welch Fusiliers). Upon receiving the tragic news that Goodall had died of his wounds, Sassoon opened his trench pocket notebook and poured his anguish into an elegy. Below is the authentic wartime manuscript preserved at Cambridge University Library alongside its transcription.\n          </p>\n\n          <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start;">\n            <!-- Manuscript & Sassoon Portraits Column -->\n            <div style="flex: 0 0 320px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px;">\n              <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">\n                <img src="/images/crummack/sassoon_manuscript_elegy_mg.jpg" alt="Siegfried Sassoon Holograph Manuscript - Elegy for M.G. Marcus Goodall" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/sassoon_manuscript_elegy_mg.jpg">\n                <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">\n                    <strong style="color: #1e3a8a; font-size: 0.85rem;">Sassoon\'s Working Notebook</strong>\n                    <span style="font-size: 0.72rem; background: #e0e7ff; color: #3730a3; padding: 1px 6px; border-radius: 6px; font-weight: 700;">Holograph</span>\n                  </div>\n                  <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.35;">\n                    July 1916. Written in ink and pencil with live corrections. Cambridge University Library, MS Add.9852/1/7, f. 38r. Click to inspect handwriting.\n                  </small>\n                </div>\n              </div>\n\n              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">\n                <img src="/images/siegfried_sassoon.jpg" alt="2nd Lt Siegfried Sassoon MC" style="width: 65px; height: 85px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-modal" data-src="/images/siegfried_sassoon.jpg">\n                <div>\n                  <strong style="color: #0f172a; font-size: 0.88rem; display: block; font-family: \'Playfair Display\', serif;">2nd Lt Siegfried Sassoon, MC</strong>\n                  <span style="color: #78350f; font-size: 0.78rem; font-weight: 600; display: block;">1st Bn, Royal Welch Fusiliers (1886–1967)</span>\n                  <p style="color: #475569; font-size: 0.76rem; margin: 4px 0 0 0; line-height: 1.3;">\n                    Stationed near Fricourt and Mametz on the Somme when Marcus Goodall was wounded at Thiepval Wood.\n                  </p>\n                </div>\n              </div>\n            </div>\n\n            <!-- Transcription & Literary Commentary Column -->\n            <div style="flex: 1; min-width: 290px;">\n              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #7f1d1d; border-radius: 8px; padding: 20px 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-bottom: 16px;">\n                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; margin-bottom: 14px;">\n                  <h5 style="margin: 0; font-size: 1.15rem; color: #7f1d1d; font-family: \'Playfair Display\', serif; font-style: italic;">\n                    Elegy: for M.G. (Marcus Goodall)\n                  </h5>\n                  <span style="font-size: 0.78rem; color: #64748b;">July 1916</span>\n                </div>\n\n                <div style="font-family: \'Georgia\', serif; font-size: 0.95rem; line-height: 1.75; color: #1e293b; white-space: pre-line; margin-bottom: 16px;">\nWas it for English morning, spilled &amp; glowing,\nAcross gray hummock\'d fields, dim cattle showing,\nWas it for this I longed? — the glittering brass\nOf rays low on brown roofs &amp; steaming grass, —\nA garden spiked with blue &amp; splashed with white,\nYellow and red and all the eye\'s delight; —\nWas it for these I longed, while you were dead,\nYour mirth destroyed and from your lolling head\nThe racing thoughts gone out like smoke on air,\nThinning &amp; whirling &amp; subsiding, — where?\n\nSad victim, could you see your body thrown\nInto a shallow pit along that wood\nThronged by the dead? O, there you lie not lone,\nUnder the splinter\'d trees; for the brotherhood\nOf discontented slain, with eyes that scowl,\nAnd bristly cheeks &amp; chins all bloody-smears,\nWill hug their rank red wounds &amp; limp &amp; prowl,\nSquatting around your grave with moans &amp; tears.\n\nBut soon, I hope a monster shell will burst,\nAnd all such filth be blotted &amp; dispersed:\nYou\'ll no more need to cling to the dead clay,\nDancing through fields of heaven to meet the day,\nSlow-rising, saintless, jocular and kind,\nDear, red-faced Father God who lit your mind.\n                </div>\n\n                <!-- Textual Revisions Insights -->\n                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; font-size: 0.82rem; line-height: 1.5; color: #334155;">\n                  <strong style="color: #78350f; display: block; margin-bottom: 6px; font-size: 0.82rem;">\n                    Primary Source Insights: Sassoon\'s Live Drafting Revisions\n                  </strong>\n                  <ul style="margin: 0; padding-left: 18px;">\n                    <li><strong>Line 6:</strong> Sassoon first wrote <em>"Orange and red"</em>, then struck through <em>Orange</em> and inserted <strong>"Yellow"</strong> above to heighten the vivid pastoral English imagery.</li>\n                    <li><strong>Line 10:</strong> Crossed out <em>"Following"</em> to substitute <strong>"Thinning &amp; whirling &amp; subsiding, — where?"</strong></li>\n                    <li><strong>Line 11:</strong> Struck out <em>"Poor victim"</em> in favor of <strong>"Sad victim"</strong>, moving from patronizing pity to profound, dignified sorrow.</li>\n                    <li><strong>Line 21:</strong> Replaced <em>"wet clay"</em> with <strong>"dead clay"</strong>, starkly personifying the Picardy mud with mortal decay.</li>\n                  </ul>\n                </div>\n              </div>\n\n              <!-- Comradeship Synthesis -->\n              <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 18px; font-size: 0.88rem; color: #1e3a8a; line-height: 1.55;">\n                <strong style="display: block; margin-bottom: 4px; color: #1e40af;">\n                  The Crucible of Comradeship: Sassoon\'s Pen &amp; Crummack\'s Heroism\n                </strong>\n                Sassoon lamented Marcus\'s body being thrown into a shallow pit along the wood thronged by the dead. Yet Marcus Goodall did not die alone or abandoned in No Man\'s Land: <strong>Sergeant Ernest Crummack</strong> defied the machine-gun bullets swept along Mill Road to reach him, bind his wounds, and carry him back to British care. Ernest\'s physical valour and Sassoon\'s literary lament represent two sides of the same extraordinary human spirit on the Western Front.\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading: 'Chapter 5: Commissioning, Canal du Nord & The Military Cross (1918)',
          text: '\n        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; margin-bottom: 24px;">\n          <div style="flex: 1; min-width: 290px;">\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              By late 1917, after three continuous years in the trenches, Ernest had proved himself one of the finest frontline non-commissioned officers in the division. In an army that had traditionally recruited its officers from public schools and the landed gentry, Ernest\'s combat brilliance shattered social barriers. He was recommended for a King\'s Commission.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              After completing rigorous officer cadet training, he was commissioned on <strong>30 January 1918</strong> as a <strong>Second Lieutenant</strong> in the <strong>2/4th Battalion, York and Lancaster Regiment</strong> (62nd West Riding Division).\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              <strong>The Hundred Days Offensive &amp; The Canal du Nord:</strong> In autumn 1918, the Allied armies launched the relentless offensives that broke Imperial Germany. The greatest obstacle was the <strong>Hindenburg Line</strong>—a colossal defensive belt of reinforced concrete pillboxes, deep subterranean tunnels, and deep barbed-wire fields anchored along the dry excavation of the <strong>Canal du Nord</strong> near Cambrai.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              On <strong>27–29 September 1918</strong>, 2nd Lieutenant Crummack led his platoon in the assault crossing of the Canal du Nord. When heavy German machine-gun nests halted the advance of his company on the eastern canal bank, Ernest took personal charge:\n            </p>\n            <div style="background: #f1f5f9; border-left: 4px solid #0f172a; padding: 14px 18px; border-radius: 4px; margin: 14px 0; font-style: italic; color: #1e293b; font-size: 0.95rem; line-height: 1.5;">\n              "For conspicuous gallantry and devotion to duty. When his company was held up by heavy machine-gun fire, 2nd Lt Crummack led a small party forward with the greatest dash and determination, captured the enemy gun, killed the crew, and enabled the company to advance. Throughout the action his courage and leadership were of the highest order."\n              <span style="display: block; margin-top: 6px; font-weight: 700; font-style: normal; font-size: 0.8rem; color: #475569;">— London Gazette (Official Military Cross Citation)</span>\n            </div>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              On <strong>1 October 1918</strong>, while continuing to lead his men through dense, uncut German barbed wire outside Rumilly, Ernest was badly wounded by bullet and shrapnel fire. He was evacuated down the casualty clearing chain just weeks before the Armistice of 11 November 1918. He was awarded the <strong>Military Cross (MC)</strong> for his heroism.\n            </p>\n          </div>\n          <div style="flex: 0 0 280px; text-align: center; margin: 0 auto;">\n            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/portrait_2nd_lt_ernest_crummack.jpg" alt="2nd Lieutenant Ernest Edward Crummack MC" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/portrait_2nd_lt_ernest_crummack.jpg">\n              <div style="padding: 10px 12px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: left;">\n                <strong style="color: #1e3a8a; font-size: 0.85rem; display: block;">2nd Lieutenant E. E. Crummack MC</strong>\n                <small style="color: #64748b; font-size: 0.78rem; display: block; line-height: 1.3;">In officer\'s tunic with Sam Browne belt and walking stick following his commissioning in 1918.</small>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!-- Full-Width Canal du Nord & Cambrai Tactical Battle Map -->\n        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); margin-top: 25px; margin-bottom: 25px;">\n          <div style="background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">\n            <div>\n              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">\n                <span style="background: #1e3a8a; color: #ffffff; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 6px;">\n                  Map 13 · Tactical Battle Map\n                </span>\n                <span style="color: #64748b; font-size: 0.8rem; font-weight: 600;">Historical Section G.S.</span>\n              </div>\n              <h4 style="margin: 0; color: #0f172a; font-size: 1.25rem; font-family: \'Playfair Display\', serif;">\n                Breaching the Hindenburg Line: The Canal du Nord &amp; Cambrai (27 Sep – 11 Oct 1918)\n              </h4>\n            </div>\n            <span style="font-size: 0.8rem; color: #475569; background: #ffffff; border: 1px solid #cbd5e1; padding: 5px 12px; border-radius: 20px; font-weight: 600;">\n              Click Map for High-Resolution Zoom\n            </span>\n          </div>\n\n          <div style="background: #f1f5f9; padding: 12px; text-align: center;">\n            <img src="/images/crummack/map_canal_du_nord_cambrai_1918.jpg" alt="Official Map 13: The Canal du Nord and Cambrai 27 Sep - 11 Oct 1918" style="width: 100%; max-width: 100%; height: auto; display: block; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.06); cursor: zoom-in; margin: 0 auto;" data-action="open-modal" data-src="/images/crummack/map_canal_du_nord_cambrai_1918.jpg">\n          </div>\n\n          <div style="padding: 16px 22px; background: #f8fafc; border-top: 1px solid #e2e8f0;">\n            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; font-size: 0.85rem; line-height: 1.5; color: #334155;">\n              <div style="background: #ffffff; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">\n                <strong style="color: #1e3a8a; display: block; margin-bottom: 3px;">1. The Canal du Nord Obstacle</strong>\n                Notice the dry canal excavation running north-south through the center-left. British and Canadian divisions concentrated their assault along the narrow firm crossing between Sains-lez-Marquion and Mœuvres.\n              </div>\n              <div style="background: #ffffff; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">\n                <strong style="color: #b91c1c; display: block; margin-bottom: 3px;">2. Ernest Crummack\'s MC Action</strong>\n                Advancing with the 62nd (West Riding) Division east of the canal, 2nd Lt Crummack led a frontal dash against entrenched German machine-gun positions, killing the crew and opening the path for the battalion.\n              </div>\n              <div style="background: #ffffff; padding: 12px 14px; border-radius: 8px; border: 1px solid #e2e8f0;">\n                <strong style="color: #047857; display: block; margin-bottom: 3px;">3. Bourlon Wood &amp; Cambrai</strong>\n                Tracing east from the canal reveals Bourlon Wood (the green circular feature) and the fortress city of Cambrai, both liberated during the relentless push that forced Imperial Germany to surrender.\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading:
            "Chapter 6: A Survivor's Legacy & The Dinnington British Legion (1919–1968)",
          text: '\n        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; margin-bottom: 24px;">\n          <div style="flex: 1; min-width: 290px;">\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              Unlike millions of his generation—including our six young village fallen commemorated on the Crofton tablet and all three Lowry brothers—Ernest Edward Crummack survived the Great War. He was demobilised in 1919 and returned to his home village of Dinnington in Yorkshire as one of the most decorated veterans in the county.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              He devoted the remainder of his life to supporting his fellow ex-servicemen and the widows and orphans of the fallen. Ernest was a founding father and lifelong champion of the <strong>Dinnington Royal British Legion</strong>, working tirelessly to ensure that those who returned broken in body or spirit received care, pensions, and dignity.\n            </p>\n            <p style="color: #334155; font-size: 1rem; line-height: 1.6; margin: 0 0 14px 0;">\n              He passed away peacefully in <strong>1968 at the age of 80</strong>, revered by his community as a "living legend" whose humility matched his extraordinary gallantry. His complete set of six mounted medals—representing four brutal years of sacrifice on the Western Front—remains preserved as a cherished heirloom by his descendants.\n            </p>\n          </div>\n          <div style="flex: 0 0 320px; text-align: center; margin: 0 auto;">\n            <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">\n              <img src="/images/crummack/crummack_medals_display.jpg" alt="Mounted Medals of 2nd Lieutenant Crummack MC DCM" style="width: 100%; height: auto; display: block; cursor: zoom-in;" data-action="open-modal" data-src="/images/crummack/crummack_medals_display.jpg">\n              <div style="padding: 12px; background: #0f172a; color: #ffffff; text-align: left;">\n                <strong style="color: #f59e0b; font-size: 0.9rem; display: block;">The Six Decorations of 2nd Lt Crummack</strong>\n                <span style="font-size: 0.78rem; color: #cbd5e1; display: block; margin-top: 4px; line-height: 1.4;">\n                  1. Military Cross (MC)<br>\n                  2. Distinguished Conduct Medal (DCM)<br>\n                  3. 1914–15 Mons Star<br>\n                  4. British War Medal<br>\n                  5. Allied Victory Medal<br>\n                  6. Imperial Russian Medal of the Order of St George (3rd Class)\n                </span>\n              </div>\n            </div>\n          </div>\n        </div>\n      ',
        },
        {
          type: 'narrative',
          theme_heading: 'Meoncross School Commemoration & Family Acknowledgment',
          text: '\n        <div style="background: #0f172a; color: #ffffff; border-radius: 8px; border: 1px solid #334155; border-top: 4px solid #d97706; padding: 26px 30px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); margin-top: 25px;">\n          <div style="border-bottom: 1px solid #334155; padding-bottom: 14px; margin-bottom: 18px;">\n            <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #f59e0b; display: block; margin-bottom: 4px;">\n              Meoncross School History Department · Official Acknowledgment\n            </span>\n            <h3 style="margin: 0; color: #ffffff; font-size: 1.4rem; font-family: \'Playfair Display\', serif; font-weight: 700;">\n              In Recognition of the Crummack &amp; Pearson Family Archive\n            </h3>\n          </div>\n\n          <p style="color: #cbd5e1; font-size: 0.98rem; line-height: 1.65; margin: 0 0 16px 0;">\n            The Meoncross School History Department, on behalf of all staff and pupils participating in the 2026 Ypres Expedition, extends its deepest gratitude to <strong>Aby (Year 10)</strong>, his mother <strong>Harriet Uwalaka</strong> (née Pearson), and his grandfather <strong>Edward Pearson</strong>.\n          </p>\n          <p style="color: #cbd5e1; font-size: 0.98rem; line-height: 1.65; margin: 0 0 18px 0;">\n            By sharing grandfather Edward Pearson\'s meticulous archival dossier and precious family photographs, the family has gifted our school a profound educational treasure. As our pupils stand along the quiet waters of the Yser Canal at Boesinghe and gaze across the scarred ridgelines of the Somme, 2nd Lieutenant Ernest Crummack\'s story will travel with them.\n          </p>\n          <div style="border-top: 1px solid #1e293b; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 0.82rem; color: #94a3b8;">\n            <span>Curated for the Meoncross School GCSE Battlefield Study Expedition</span>\n            <span style="color: #f59e0b; font-weight: 600; letter-spacing: 0.04em;">&ldquo;We Will Remember Them&rdquo;</span>\n          </div>\n        </div>\n      ',
        },
      ],
      tasks: [
        'Historical Geography & Combat Sectors: Compare the 1915 trench map of Boesinghe on the Yser Canal with the tactical maps of Thiepval Wood (1916) and the Canal du Nord (1918). How did the nature of combat and defensive engineering change between 1915 and 1918?',
        "The Human Reality Behind War Poetry: Grandfather Edward Pearson's research proved that 2nd Lt Marcus Goodall—rescued under fire by Sergeant Crummack in Thiepval Wood—was the close friend of poet Siegfried Sassoon. Read Sassoon's elegy for Goodall. Explain why personal acts of courage like Crummack's provide a vital counterweight to the bitter disillusionment often depicted in Great War poetry.",
        'Social Mobility in the Crucible of War: Ernest Crummack began his working life as a teenage coal miner in Yorkshire, enlisted as a Private, and ended the war as a commissioned officer wearing the Military Cross and DCM. What does his trajectory tell us about how the immense casualties of 1916–17 forced the British Army to reward working-class merit over aristocratic background?',
        "Family Archives as Primary Evidence: Reflect on how Aby's family preserved Ernest's memory through five generations, culminating in his grandfather's historical research dossier. Why are pupil family archives uniquely powerful in keeping the reality of the First World War alive for 21st-century students?",
      ],
      interactive_quiz: [
        {
          question:
            'What civilian occupation did Ernest Crummack pursue in Yorkshire before enlisting in 1914?',
          options: [
            'Underground Coal Miner (Ripper)',
            'Schoolmaster',
            'Blacksmith',
            'Railway Signalman',
          ],
          correct: 0,
          explanation:
            'Ernest Crummack worked underground as a coal miner (ripper) at Dinnington Main Colliery near Rotherham before volunteering in September 1914.',
        },
        {
          question:
            'Where was Ernest Crummack stationed in late 1915 when his unit faced the first German Phosgene gas attack?',
          options: [
            'Boesinghe along the Yser Canal (Ypres Salient)',
            'Gallipoli Peninsula',
            'Vimy Ridge',
            'High Wood on the Somme',
          ],
          correct: 0,
          explanation:
            "The 1/5th York & Lancasters held the canal bank trenches at Boesinghe ('The Northern Nip') just north of Essex Farm Cemetery in the Ypres Salient during the lethal phosgene gas attack of 19 December 1915.",
        },
        {
          question:
            'For what heroic action was Sergeant Crummack awarded the Distinguished Conduct Medal (DCM) on 3 July 1916?',
          options: [
            'Crawling out under machine-gun fire at Thiepval Wood to rescue wounded officer Marcus Goodall',
            'Shooting down a German observation biplane',
            'Single-handedly capturing 50 enemy soldiers at Pozières',
            'Repairing telephone communication cables across the River Somme',
          ],
          correct: 0,
          explanation:
            "Sergeant Crummack crawled out into No Man's Land under intense machine-gun and shell fire along Mill Road to rescue 2nd Lt Marcus Goodall, who was the close friend of poet Siegfried Sassoon.",
        },
        {
          question:
            'Which foreign Allied honour was personally awarded to Ernest Crummack by Tsar Nicholas II for gallantry on the Somme?',
          options: [
            'Russian Medal of the Order of St George (3rd Class)',
            'French Legion of Honour',
            'Belgian Croix de Guerre',
            'American Silver Star',
          ],
          correct: 0,
          explanation:
            'Sergeant Crummack was awarded the Russian Medal of the Order of St George (3rd Class), approved by Tsar Nicholas II to honour exceptional Allied heroism.',
        },
        {
          question:
            'In which battle during the Hundred Days Offensive was 2nd Lieutenant Crummack awarded the Military Cross?',
          options: [
            'The Crossing of the Canal du Nord (breaching the Hindenburg Line)',
            'The Battle of the Lys',
            'The Defence of Givenchy',
            'The Retreat from Mons',
          ],
          correct: 0,
          explanation:
            'Ernest was awarded the Military Cross on 29 September 1918 after charging a German machine-gun nest that was pinning down his company during the crossing of the Canal du Nord, enabling the brigade to breach the Hindenburg Line.',
        },
      ],
    },
  ],
  overview_custom_html:
    '\n    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 30px;">\n      <h3 style="margin-top: 0; color: #1e3a8a; font-family: \'Playfair Display\', serif; font-size: 1.8rem;">The Lowry Brothers: A Village\'s Sacrifice</h3>\n      <p style="color: #334155; line-height: 1.6; font-size: 1.05rem;">\n        The names of three brothers—William, Cyril, and Auriol (Eric) Lowry—are all carved into the Stubbington War Memorial and the Crofton Parish Memorial Tablet in Holy Rood Church. The story of these young men from Manor Way Grange in Lee-on-the-Solent perfectly captures the devastating toll the war took on individual families.<br><br>\n        Tragically, the three brothers fell across three different fronts:\n        <ul>\n          <li><strong>Second Lieutenant William \'Harper\' Lowry (Age 25):</strong> Fell on 4th June 1915 at Gully Ravine and is commemorated on the Helles Memorial in Turkey (Gallipoli).</li>\n          <li><strong>Captain Cyril \'Patrick\' Lowry (Age 20):</strong> Fell on 25th March 1918 defending the Somme crossings and is commemorated on the Pozières Memorial in France.</li>\n          <li><strong>Lieutenant Colonel Auriol \'Eric\' Lowry, DSO, MC (Age 25):</strong> Commanded the 2nd West Yorkshires, fought at Westhoek Ridge near Ypres, fell on 23rd September 1918, and is buried at La Targette Cemetery near Arras, France.</li>\n        </ul>\n        Before we depart for Belgium, take a moment to reflect on what it must have been like for their mother Annie Lowry at Manor Way Grange to receive the telegrams for all three boys.\n      </p>\n      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:20px;">\n        <div style="flex: 1; min-width: 150px; text-align: center;">\n          <img src="/images/stubbington_memorial_2.jpg" alt="Crofton Parish Memorial Tablet" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />\n          <small style="display:block; margin-top:5px; color:#64748b;">The Crofton Memorial Tablet in Holy Rood Church, Stubbington.</small>\n        </div>\n        <div style="flex: 1; min-width: 150px; text-align: center;">\n          <img src="/images/lowry_william.png" alt="William \'Harper\' Lowry" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />\n          <small style="display:block; margin-top:5px; color:#64748b;">2nd Lt. William \'Harper\' Lowry</small>\n        </div>\n        <div style="flex: 1; min-width: 150px; text-align: center;">\n          <img src="/images/lowry_cyril.png" alt="Cyril \'Patrick\' Lowry" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />\n          <small style="display:block; margin-top:5px; color:#64748b;">Capt. Cyril \'Patrick\' Lowry</small>\n        </div>\n        <div style="flex: 1; min-width: 150px; text-align: center;">\n          <img src="/images/lowry_auriol.png" alt="Auriol \'Eric\' Lowry" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />\n          <small style="display:block; margin-top:5px; color:#64748b;">Lt. Col. Auriol \'Eric\' Lowry, DSO, MC</small>\n        </div>\n      </div>\n    </div>\n  ',
};
