const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../units/trip_ypres/data.js');

async function run() {
  const fileUrl = 'file:///' + dataFilePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.unitData;

  // 1. Update unitData.local_heroes with 100% verified CWGC and Crofton Tablet data
  unit.local_heroes = [
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
  ];

  // 2. Update Days 0, 1, 2, and 3 tasks with rich field observation activities
  const d0 = unit.lessons.find((l) => l.id === 'day_0');
  if (d0) {
    d0.tasks = [
      'Field Equipment Check: Verify your passport, GHIC/EHIC medical card, sturdy walking boots, waterproof jacket, notebook, and pen are packed.',
      'Expedition Orientation: Review the 3-day itinerary and locate the accommodation: Peace Village Hostel, Kemmelbergweg, Heuvelland.',
      'Memorial Roll Call: Familiarise yourself with the names of the six local heroes from Stubbington, Chark, and Lee-on-the-Solent whose names we will seek on the memorial walls of Flanders.',
    ];
  }

  const d1 = unit.lessons.find((l) => l.id === 'day_1');
  if (d1) {
    d1.tasks = [
      "Field Observation at Essex Farm: Step inside the damp concrete Advanced Dressing Station dugout where Canadian surgeon John McCrae treated hundreds of bleeding casualties and penned 'In Flanders Fields'. Notice how narrow the doorways and bunk recesses are.",
      'Youngest Fallen: Walk to Plot I, Row G, Grave 12 to find the headstone of Valentine Joe Strudwick, killed in January 1916 aged just 15. Record what tributes and poppy crosses have been placed at his grave.',
      'Langemarck Contrast: Walk beneath the dark oak trees to the Kameradengrab (mass grave) holding 24,917 German soldiers. Contrast this somber, dark basalt stone setting with the gleaming Portland stone of British cemeteries. How does architecture shape mourning?',
      'Hooge Crater Trenches: Walk the preserved frontline trenches. Measure the distance between opposing lines and observe how the high water table turned the trenches into lethal mud swamps.',
    ];
  }

  const d2 = unit.lessons.find((l) => l.id === 'day_2');
  if (d2) {
    d2.tasks = [
      'The Brooding Soldier: Use your phone compass to face North-East at St Julien, the exact direction from which the greenish-yellow cloud of chlorine gas rolled on 22nd April 1915. Note the reversed-arms mourning posture of the Canadian soldier.',
      "Sanctuary Wood Original Trenches: Walk through the original frontline trench system at Hill 62. Look out for the splintered century-old tree trunks and corrugated 'elephant iron' revetments.",
      'Tyne Cot Pilgrimage: Locate the massive Cross of Sacrifice, built directly on top of a captured German concrete pillbox. Then walk up to the Memorial Wall to locate our local heroes: Sydney Muckett, Arthur Rye, Archibald Ward (Panels 88–90), and Charles Warland (Panels 14–17).',
      'Lijssenthoek Medical Line: Find the grave of Staff Nurse Nellie Spindler, killed by artillery fire at a casualty clearing station in 1917. Reflect on the role of women operating directly within shell range.',
      'Menin Gate Last Post: Stand beneath the colossal triumphal arch at 8:00 PM for the sounding of the Last Post. Locate Thomas Franklin and William Ayling on Panel 35.',
    ];
  }

  const d3 = unit.lessons.find((l) => l.id === 'day_3');
  if (d3) {
    d3.tasks = [
      'Ypres Ramparts Walk: Trace the ancient 17th-century Vauban earthworks where British soldiers dug deep headquarters and hospital shelters safe from artillery fire. Visit Ramparts Cemetery looking out over the quiet moat.',
      "Talbot House 'Every Man's Club': Walk through the doors in Poperinge and find the famous sign: 'Abandon Rank All Ye Who Enter Here'. Climb the stairs to the hop-loft Upper Room chapel where officers and privates prayed side-by-side.",
      'Poperinge Town Hall Death Cells: Step inside the cold, cramped wooden cells where soldiers condemned for desertion and cowardice spent their final night before being shot at dawn. Discuss the posthumous 2006 statutory pardon granted to all 306 men.',
    ];
  }

  // 3. Update Hero 0: Thomas John Franklin
  const h0 = unit.lessons.find((l) => l.id === 'hero_0');
  if (h0) {
    h0.banner = '/images/stubbington_memorial_2.jpg';
    h0.cwgc_data = {
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
    };
    h0.tasks = [
      "On-Site Field Mission: Enter beneath the Menin Gate and climb the south staircase to Panel 35 under 'HAMPSHIRE REGIMENT'. Locate the carved name 'FRANKLIN T.J.'.",
      'Field Transcription: Record the names and ranks of the comrades carved directly above and below Private Franklin on Panel 35. Observe how many soldiers of the 1st Battalion fell in the Second Battle of Ypres.',
      'Pilgrimage Reflection: Before holding the rearguard line on Frezenberg Ridge under heavy gas and shellfire, Thomas Franklin lived at Meadow Cottage in Chark. Record a short reflection connecting this quiet Hampshire cottage to the 54,000 names around you.',
    ];
    h0.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'The Menin Gate: Finding Private Thomas John Franklin',
        text: `<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Ypres (Menin Gate) Memorial · <strong>Panel 35</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Walk through the main archway. Panel 35 is located on the south staircase wall displaying the Hampshire Regiment fallen.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>Back home inside <strong>Holy Rood Church in Stubbington</strong>, Private Franklin's name is carved on the official Great War Parish Memorial Tablet as:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: "Courier New", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>T. J. FRANKLIN</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Listed in Column 1 under the 'ARMY' section, just ten lines below Private William Ayling.</p></div><strong>Rank:</strong> Private<br><strong>Service Number:</strong> 8560<br><strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br><strong>Born:</strong> Alverstoke, Hampshire, c. 1893 (son of George and Mary Ann Jane Franklin).<br><strong>Home Address:</strong> Chark Cottage, later Meadow Cottage, Chark, Lee-on-the-Solent.<br><strong>Military Service & Fate:</strong> Enlisted at Gosport in 1911. Deployed to France in August 1914 as part of the original British Expeditionary Force (awarded 1914 Star). He was killed in action on <strong>29th April 1915</strong> during the Second Battle of Ypres. His battalion held an exposed rearguard position on the Frezenberg Ridge to cover an Allied withdrawal, enduring torrential artillery shelling and the first German poison gas attacks. He has no known grave.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>When you enter beneath the Menin Gate, locate <strong>Panel 35</strong>. Look down the list of names under <em>'HAMPSHIRE REGIMENT'</em> until you find <strong>FRANKLIN T.J.</strong> Stand in silence for 30 seconds. Remember that before he stood on Frezenberg Ridge, he walked the lanes around Chark and Lee-on-the-Solent.</p></div>`,
      },
    ];
  }

  // 4. Update Hero 1: William Ayling
  const h1 = unit.lessons.find((l) => l.id === 'hero_1');
  if (h1) {
    h1.banner = '/images/stubbington_memorial_2.jpg';
    h1.cwgc_data = {
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
    };
    h1.tasks = [
      "On-Site Field Mission: On Panel 35 of the Menin Gate, find 'AYLING W.' under the Hampshire Regiment. He is inscribed on the exact same panel as Thomas Franklin.",
      "Local History Detective: Look closely at the rank discrepancy. The CWGC registers him as a Private, but our village memorial tablet in Holy Rood Church records him as 'W. AYLING, LCE. CPL.'. Why did local communities sometimes remember soldiers by acting or battlefield ranks?",
      "Pilgrimage Reflection: At age 20, William Ayling was a local baker's boy who delivered daily bread across Stubbington. Pause in front of Panel 35 and reflect on how industrialized warfare extinguished the young lives of village teenagers.",
    ];
    h1.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'The Menin Gate: Finding Private William Ayling',
        text: `<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Ypres (Menin Gate) Memorial · <strong>Panel 35</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the south staircase wall on the exact same panel as his battalion comrade Private Franklin.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>On the memorial tablet inside <strong>Holy Rood Church, Stubbington</strong>, William Ayling is commemorated in Column 1:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: "Courier New", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>W. AYLING, LCE. CPL.</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>While CWGC rolls list him as Private, the village proudly recorded him as Lance Corporal.</p></div><strong>Rank:</strong> Private (Lance Corporal on Holy Rood memorial)<br><strong>Service Number:</strong> 9330<br><strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br><strong>Born:</strong> c. 1895, Hindhead, Surrey (son of Horace and Annie Ayling).<br><strong>Home Address:</strong> Stubbington Lane, Stubbington.<br><strong>Civilian Trade:</strong> Baker's boy delivering bread around Stubbington village.<br><strong>Military Service & Fate:</strong> Enlisted at Winchester. Crossed to France in August 1914. Fought through the Second Battle of Ypres. Killed in action by shellfire and trench mortars north of Ypres (near Boezinge/Hull Farm) on <strong>9th July 1915</strong> (aged just 20). His body was never recovered.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>On <strong>Panel 35</strong>, find <strong>AYLING W.</strong> just a few rows above Private Franklin. Reflect on the fact that at age 20, he was barely older than Year 11 pupils when he was killed in the trenches.</p></div>`,
      },
    ];
  }

  // 5. Update Hero 2: Sydney Muckett
  const h2 = unit.lessons.find((l) => l.id === 'hero_2');
  if (h2) {
    h2.banner = '/images/stubbington_memorial_2.jpg';
    h2.cwgc_data = {
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
    };
    h2.tasks = [
      "On-Site Field Mission: At Tyne Cot, walk to the curved Memorial Wall at the rear perimeter. Locate Panels 88 to 90 for the Hampshire Regiment and find 'MUCKETT S.'.",
      "Field Photography: Take a photograph of Sydney Muckett's name on the stone wall. Notice the surrounding names of men from Portsmouth and Hampshire who volunteered together in the 'Pompey Pals'.",
      "Family Ties: Sydney's brother Frank Muckett married Alice Rye (sister of Arthur Rye, who fell six days later and is commemorated on this exact wall). Record a reflection on how entire village networks were bound in grief.",
    ];
    h2.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Private Sydney Muckett',
        text: `<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90 and 162</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Located on the grand curved memorial flint-and-stone wall at the rear of the cemetery grounds.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>Inside <strong>Holy Rood Church, Stubbington</strong>, Sydney Muckett is commemorated in Column 2:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: "Courier New", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>S. MUCKETT, CORPL.</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Carved on the village tablet as Corporal, reflecting his esteemed status among his fellow parishioners.</p></div><strong>Rank:</strong> Private (Corporal on Holy Rood memorial)<br><strong>Service Number:</strong> 12977 (renumbered 204369)<br><strong>Regiment:</strong> 15th Battalion, The Hampshire Regiment ('Pompey Pals')<br><strong>Born:</strong> 26th December 1895, Titchfield (son of William and Elizabeth Muckett).<br><strong>Home Address:</strong> Brown's Farm, Stubbington.<br><strong>Civilian Trade:</strong> Grocer's errand boy in Stubbington.<br><strong>Military Service & Fate:</strong> Enlisted at Fareham in 1914. Killed in action, aged 21, on <strong>20th September 1917</strong> during the Battle of Menin Road Ridge (Third Battle of Ypres / Passchendaele). His battalion attacked through deep Flanders mud under fierce machine-gun fire. He has no known grave.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>
            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>
            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>
              Walk past the 11,000 headstones to the rear curved stone wall. Locate the Hampshire Regiment panels (**Panels 88–90**). Find <strong>MUCKETT S.</strong> Touch the carved letters of his name and think about his daily life at Brown's Farm before he entered the mud of Menin Road Ridge.
            </p>
          </div>`,
      },
    ];
  }

  // 6. Update Hero 3: Arthur Rye
  const h3 = unit.lessons.find((l) => l.id === 'hero_3');
  if (h3) {
    h3.banner = '/images/stubbington_memorial_2.jpg';
    h3.cwgc_data = {
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
    };
    h3.tasks = [
      "On-Site Field Mission: On Panels 88 to 90 at Tyne Cot, locate 'RYE A.' under the Hampshire Regiment. Notice how close his name is to Sydney Muckett.",
      'The Sorrow of Hill Head: Arthur Rye was a nurseryman at Lower Crabthorne. He was killed at Polygon Wood on 26th September 1917—just six days after Sydney Muckett fell on the Menin Road. In your notes, calculate how quickly casualty notifications reached families in Hampshire.',
      'Topography Observation: Stand at the Memorial Wall and look up toward the crest of Passchendaele ridge. Describe in two sentences why taking this ridge cost so many tens of thousands of Commonwealth lives.',
    ];
    h3.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Private Arthur Rye',
        text: `<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90 and 162</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the same panels as his relative by marriage, Private Sydney Muckett.</p></div><div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'><h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4><p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>On the Holy Rood Church Memorial Tablet in Stubbington, Arthur Rye is carved in Column 3:</p><div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: "Courier New", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>A. RYE</div><p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Listed among the 40+ village men who never returned to their homes in Crofton parish.</p></div><strong>Rank:</strong> Private<br><strong>Service Number:</strong> 22926<br><strong>Regiment:</strong> 14th Battalion, The Hampshire Regiment ('Pompey Pals')<br><strong>Born:</strong> 1897, Forest Side, Sussex (son of Charles and Jane Rye).<br><strong>Home Address:</strong> Lower Crabthorne, Hill Head.<br><strong>Civilian Trade:</strong> Local nurseryman.<br><strong>Local Family Connection:</strong> His sister Alice was married to Frank Muckett (brother of Sydney Muckett).<br><strong>Military Service & Fate:</strong> Enlisted at Fareham. Killed in action, aged 21, on <strong>26th September 1917</strong> at Polygon Wood—just six days after Sydney Muckett was killed nearby. He has no known grave.<br><br><div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>
            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>
            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>
              On <strong>Panels 88–90</strong>, find <strong>RYE A.</strong> near Sydney Muckett. Consider the grief of the Rye and Muckett families in Stubbington receiving death notices within one week of each other.
            </p>
          </div>`,
      },
    ];
  }

  // 7. Update Hero 4: Archibald Hugh Ward
  const h4 = unit.lessons.find((l) => l.id === 'hero_4');
  if (h4) {
    h4.banner = '/images/stubbington_memorial_2.jpg';
    h4.cwgc_data = {
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
    };
    h4.tasks = [
      "On-Site Field Mission: On Panels 88 to 90 at Tyne Cot, locate 'WARD A.H.' under the Hampshire Regiment.",
      'The Final Hundred Days: Archibald Ward was killed in action on 14th October 1918 near Gheluwe during the final Allied offensive in Flanders. The Armistice was signed just 28 days later on 11th November. Reflect on the heartbreak of losing a child when peace was already imminent.',
      "Brothers Commemorated: Archibald's brother Horace Ward also lost his life in August 1917. Look at Column 3 of the Crofton Tablet where 'A. WARD' and 'H. V. WARD' appear together.",
    ];
    h4.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Lance Corporal Archibald Hugh Ward',
        text: `<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'>
            <h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4>
            <p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90 and 162</strong> (Hampshire Regiment)</p>
            <p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the Hampshire Regiment section of the rear memorial wall.</p>
          </div>

          <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'>
            <h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4>
            <p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>
              Inside <strong>Holy Rood Church, Stubbington</strong>, Archibald Ward is carved in Column 3 directly alongside his fallen brother:
            </p>
            <div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: "Courier New", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>
              A. WARD<br>H. V. WARD
            </div>
            <p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Both sons of the Ward family from Hill Head Coastguard Cottages gave their lives.</p>
          </div>

          <strong>Rank:</strong> Lance Corporal<br>
          <strong>Service Number:</strong> 17568<br>
          <strong>Regiment:</strong> 15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment<br>
          <strong>Born:</strong> 1896, Alverstoke (son of Hugh Ward, yacht steward & former RN Coastguard, and Bertha Kathleen Ward).<br>
          <strong>Home Address:</strong> 6 Coastguard Cottages, Hill Head, and later Balmoral, Seymour Road, Lee-on-the-Solent.<br>
          <strong>Military Service & Fate:</strong> Enlisted in Portsmouth. Fought on the Western Front and in Italy before returning to Flanders in spring 1918. Killed in action, aged 23, on <strong>14th October 1918</strong> near Gheluwe during the final Hundred Days Advance—less than four weeks before the Armistice. He has no known grave.<br><br>

          <div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>
            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>
            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>
              Find <strong>WARD A.H.</strong> on <strong>Panels 88–90</strong>. Reflect on the profound poignancy of a young man killed in October 1918 when peace was already on the immediate horizon.
            </p>
          </div>`,
      },
    ];
  }

  // 8. Update Hero 5: Charles Warland
  const h5 = unit.lessons.find((l) => l.id === 'hero_5');
  if (h5) {
    h5.banner = '/images/stubbington_memorial_2.jpg';
    h5.cwgc_data = {
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
    };
    h5.tasks = [
      "On-Site Field Mission: Walk to Panels 14 to 17 on the western section of the Tyne Cot Memorial Wall. Under 'THE QUEEN'S (ROYAL WEST SURREY REGIMENT)', locate 'WARLAND C.'.",
      'The Battle of Broodseinde: Private Warland was killed in action on 4th October 1917 as his battalion charged through the liquid mud of the Polygonebeek marsh to storm Juniper Trench. Observe how wet and low-lying the valley is below Tyne Cot.',
      'Community Cross-Section: Charles was the son of the Secretary of Lee-on-the-Solent Golf Club. Reflect on how sons of professionals and sons of farm labourers fought and fell shoulder to shoulder.',
    ];
    h5.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Private Charles Alfred Henry Warland',
        text: `<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'>
            <h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4>
            <p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 14 to 17 and 162 to 162A</strong> (The Queen's Royal West Surrey)</p>
            <p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Located on the western wing of the Memorial Wall under The Queen's (Royal West Surrey Regiment).</p>
          </div>

          <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 20px;'>
            <h4 style='margin: 0 0 10px 0; color: #1e3a8a; font-size: 1.1rem;'><i class='fa-solid fa-monument' style='color: #2563eb;'></i> Inscribed on the Crofton Parish Memorial Tablet</h4>
            <p style='margin: 0 0 10px 0; color: #334155; font-size: 0.95rem; line-height: 1.5;'>
              On the Holy Rood Church Memorial Tablet in Stubbington, Charles Warland is carved in Column 3:
            </p>
            <div style='background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 10px 15px; font-family: "Courier New", monospace; font-size: 1.1rem; font-weight: bold; color: #0f172a;'>
              C. WARLAND
            </div>
            <p style='margin: 8px 0 0 0; font-size: 0.85rem; color: #64748b;'>Remembered by his parish alongside Arthur Rye and Archibald Ward.</p>
          </div>

          <strong>Rank:</strong> Private<br>
          <strong>Service Number:</strong> T/202335<br>
          <strong>Regiment:</strong> 3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)<br>
          <strong>Born:</strong> 1897, Richmond, Surrey (son of John Alfred Henry and Louisa Clara Warland).<br>
          <strong>Home Address:</strong> Canford, Lee-on-the-Solent.<br>
          <strong>Family Context:</strong> His father was a sporting journalist, author, and Secretary of Lee-on-the-Solent Golf Club.<br>
          <strong>Military Service & Fate:</strong> Enlisted in Richmond. Killed in action, aged 20, on <strong>4th October 1917</strong> during the Battle of Broodseinde, advancing across flooded swamp ground to capture Juniper Trench. He has no known grave.<br><br>

          <div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'>
            <h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5>
            <p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>
              Head to <strong>Panels 14–17</strong> under <em>'QUEEN'S (ROYAL WEST SURREY REGIMENT)'</em>. Locate <strong>WARLAND C.</strong> Reflect on his assault across the Flanders mud at Broodseinde.
            </p>
          </div>`,
      },
    ];
  }

  // 9. Update Lowry Brothers lessons with verified details
  const lw = unit.lessons.find((l) => l.id === 'hero_lowry_william');
  if (lw) {
    lw.banner = '/images/stubbington_memorial_2.jpg';
    lw.title = 'Second Lieutenant W. A. H. Lowry (Helles · Gallipoli)';
    lw.tasks = [
      'Home Front Memorial Study: William Augustine Harper Lowry fell at Gallipoli on 4th June 1915 leading a charge up Gully Ravine. His name is carved into the Helles Memorial in Turkey (Panel 230 to 239).',
      "Crofton Tablet Investigation: On the Holy Rood tablet in Stubbington, locate 'W. A. H. LOWRY, LIEUT.' in Column 2. He was the eldest of the three brothers.",
      "Reflection: Why did families like the Lowrys place memorial tablets in their local parish churches when their sons' bodies were lost thousands of miles away?",
    ];
  }

  const le = unit.lessons.find((l) => l.id === 'hero_lowry_auriol');
  if (le) {
    le.banner = '/images/stubbington_memorial_2.jpg';
    le.title = 'Lieutenant Colonel A. E. E. Lowry, DSO, MC (La Targette · Arras)';
    le.tasks = [
      'Home Front Memorial Study: Eric Lowry rose to Lieutenant Colonel at just 25 years old, earning the DSO, Military Cross with Bar, and French Croix de Guerre. He fought in the Ypres Salient at Westhoek Ridge in August 1917.',
      "The Heavy Burden of Leadership: Eric commanded the very battalion (2nd Bn West Yorkshires) in which his younger brother Patrick served, and witnessed Patrick's death on the Somme in March 1918 before falling himself six months later on 23rd September 1918.",
      "Crofton Tablet Investigation: Locate 'A. E. E. LOWRY, LT. COL. M.C. D.S.O.' in Column 2 of the Holy Rood tablet. Compare his marked grave at La Targette near Arras with his two brothers who have no known graves.",
    ];
  }

  const lc = unit.lessons.find((l) => l.id === 'hero_lowry_cyril');
  if (lc) {
    lc.banner = '/images/stubbington_memorial_2.jpg';
    lc.title = 'Captain C. J. P. Lowry (Pozières · Somme)';
    lc.tasks = [
      'Home Front Memorial Study: Patrick Lowry was just 20 when he fell defending the Somme river crossing at Eterpigny on 25th March 1918 during the massive German Spring Offensive.',
      'Brothers in Arms: Patrick led C Company into action under the direct command of his older brother Eric. Heartbreakingly, he fell in full view of Eric.',
      "Crofton Tablet Investigation: Find 'C. J. P. LOWRY, CAPT.' on the Holy Rood tablet. Reflect on Mrs. Annie Lowry back at Manor Way Grange receiving telegraphs that all three of her sons had been killed.",
    ];
  }

  // 10. Update overview_custom_html with verified dates and Crofton tablet context
  unit.overview_custom_html = `
    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-top: 30px;">
      <h3 style="margin-top: 0; color: #1e3a8a; font-family: 'Playfair Display', serif; font-size: 1.8rem;">The Lowry Brothers: A Village's Sacrifice</h3>
      <p style="color: #334155; line-height: 1.6; font-size: 1.05rem;">
        The names of three brothers—William, Cyril, and Auriol (Eric) Lowry—are all carved into the Stubbington War Memorial and the Crofton Parish Memorial Tablet in Holy Rood Church. The story of these young men from Manor Way Grange in Lee-on-the-Solent perfectly captures the devastating toll the war took on individual families.<br><br>
        Tragically, the three brothers fell across three different fronts:
        <ul>
          <li><strong>Second Lieutenant William 'Harper' Lowry (Age 25):</strong> Fell on 4th June 1915 at Gully Ravine and is commemorated on the Helles Memorial in Turkey (Gallipoli).</li>
          <li><strong>Captain Cyril 'Patrick' Lowry (Age 20):</strong> Fell on 25th March 1918 defending the Somme crossings and is commemorated on the Pozières Memorial in France.</li>
          <li><strong>Lieutenant Colonel Auriol 'Eric' Lowry, DSO, MC (Age 25):</strong> Commanded the 2nd West Yorkshires, fought at Westhoek Ridge near Ypres, fell on 23rd September 1918, and is buried at La Targette Cemetery near Arras, France.</li>
        </ul>
        Before we depart for Belgium, take a moment to reflect on what it must have been like for their mother Annie Lowry at Manor Way Grange to receive the telegrams for all three boys.
      </p>
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:20px;">
        <div style="flex: 1; min-width: 150px; text-align: center;">
          <img src="/images/stubbington_memorial_2.jpg" alt="Crofton Parish Memorial Tablet" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />
          <small style="display:block; margin-top:5px; color:#64748b;">The Crofton Memorial Tablet in Holy Rood Church, Stubbington.</small>
        </div>
        <div style="flex: 1; min-width: 150px; text-align: center;">
          <img src="/images/lowry_william.png" alt="William 'Harper' Lowry" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />
          <small style="display:block; margin-top:5px; color:#64748b;">2nd Lt. William 'Harper' Lowry</small>
        </div>
        <div style="flex: 1; min-width: 150px; text-align: center;">
          <img src="/images/lowry_cyril.png" alt="Cyril 'Patrick' Lowry" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />
          <small style="display:block; margin-top:5px; color:#64748b;">Capt. Cyril 'Patrick' Lowry</small>
        </div>
        <div style="flex: 1; min-width: 150px; text-align: center;">
          <img src="/images/lowry_auriol.png" alt="Auriol 'Eric' Lowry" style="max-width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;" />
          <small style="display:block; margin-top:5px; color:#64748b;">Lt. Col. Auriol 'Eric' Lowry, DSO, MC</small>
        </div>
      </div>
    </div>
  `;

  // Write out updated data.js
  const newContent = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';
  fs.writeFileSync(dataFilePath, newContent, 'utf8');
  console.log(
    'Successfully updated units/trip_ypres/data.js with verified CWGC and Crofton Tablet data!',
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
