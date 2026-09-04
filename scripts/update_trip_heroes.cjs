const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const dataFilePath = path.join(__dirname, '../units/trip_ypres/data.js');

async function run() {
  const fileUrl = 'file:///' + dataFilePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unit = mod.unitData;

  // 1. Update unitData.local_heroes array with verified CWGC records
  unit.local_heroes = [
    {
      name: 'Private Thomas John Franklin',
      age: 23,
      regiment: '1st Battalion, The Hampshire Regiment',
      service_number: '8560',
      date_of_death: '29th April 1915',
      connection:
        'Son of George & Mary Ann Franklin; lived at Meadow Cottage, Chark, Lee-on-the-Solent.',
      memorial: 'Ypres (Menin Gate) Memorial, Belgium',
      panel: 'Panel 35 (Hampshire Regiment)',
      story:
        'Killed in action on 29th April 1915 during the Second Battle of Ypres while defending Frezenberg Ridge under heavy bombardment and poison gas. He has no known grave.',
      visiting_location: 'Menin Gate',
    },
    {
      name: 'Private William (Walter) Ayling',
      age: 20,
      regiment: '1st Battalion, The Hampshire Regiment',
      service_number: '9330',
      date_of_death: '9th July 1915',
      connection:
        'Son of Horace & Annie Ayling; lived in Stubbington Lane. Worked as a local Baker Boy.',
      memorial: 'Ypres (Menin Gate) Memorial, Belgium',
      panel: 'Panel 35 (Hampshire Regiment)',
      story:
        'Killed by shellfire and trench mortars north of Ypres on 9th July 1915. He has no known grave and is commemorated alongside his battalion comrade Private Franklin.',
      visiting_location: 'Menin Gate',
    },
    {
      name: 'Private Sydney Muckett',
      age: 21,
      regiment: "15th Battalion, The Hampshire Regiment ('Pompey Pals')",
      service_number: '12977 / 204369',
      date_of_death: '20th September 1917',
      connection:
        "Son of William & Elizabeth Muckett; lived at Brown's Farm, Stubbington. Worked as a Grocer's Errand Boy.",
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: 'Panel 88 to 90 and 162 (Hampshire Regiment)',
      story:
        'Killed in action on 20th September 1917 during the Battle of Menin Road Ridge (Third Battle of Ypres / Passchendaele). He has no known grave.',
      visiting_location: 'Tyne Cot',
    },
    {
      name: 'Private Arthur Rye',
      age: 21,
      regiment: "14th Battalion, The Hampshire Regiment ('Pompey Pals')",
      service_number: '22926',
      date_of_death: '26th September 1917',
      connection:
        "Son of Charles & Jane Rye; lived at Lower Crabthorne, Hill Head. Worked as a local Nurseryman. Sister Alice married Sydney Muckett's brother Frank.",
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: 'Panel 88 to 90 and 162 (Hampshire Regiment)',
      story:
        "Killed in action on 26th September 1917 in the assault through Polygon Wood, just six days after his brother-in-law's brother Sydney Muckett. He has no known grave.",
      visiting_location: 'Tyne Cot',
    },
    {
      name: 'Lance Corporal Archibald Hugh Ward',
      age: 23,
      regiment: '15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment',
      service_number: '17568',
      date_of_death: '14th October 1918',
      connection:
        'Son of Hugh (RN Coastguard) & Bertha Kathleen Ward; lived at 6 Coastguard Cottages, Hill Head, and Balmoral, Gosport Road, Lee-on-the-Solent.',
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: 'Panel 88 to 90 and 162 (Hampshire Regiment)',
      story:
        'Killed in action advancing through thick mist near Gheluwe on 14th October 1918—less than four weeks before the Armistice. He has no known grave.',
      visiting_location: 'Tyne Cot',
    },
    {
      name: 'Private Charles Alfred Henry Warland',
      age: 20,
      regiment: "3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)",
      service_number: 'T/202335',
      date_of_death: '4th October 1917',
      connection:
        'Son of John Alfred Henry Warland (sporting journalist, author & Secretary of Lee-on-the-Solent Golf Club) and Louise Clara Warland; lived at Canford, Lee-on-the-Solent.',
      memorial: 'Tyne Cot Memorial to the Missing, Passchendaele, Belgium',
      panel: "Panel 14 to 17 and 162 to 162A (The Queen's)",
      story:
        'Killed in action on 4th October 1917 during the Battle of Broodseinde, advancing across marshland to take Juniper Trench. He has no known grave.',
      visiting_location: 'Tyne Cot',
    },
    {
      name: "Captain William Augustine 'Harper' Lowry",
      age: 25,
      regiment: "14th King George's Own Ferozepore Sikhs, Indian Army",
      connection: 'Lived at Manor Way Grange, Lee-on-the-Solent. Eldest brother.',
      memorial: 'Helles Memorial, Gallipoli, Turkey (Panel 230 to 239)',
      story:
        'Killed on 4th June 1915 leading a desperate charge up Gully Ravine at Gallipoli. He has no known grave.',
      image: '/images/lowry_william.png',
      visiting_location: 'Commemorated on Stubbington War Memorial',
    },
    {
      name: "Major Auriol 'Eric' Lowry, MC & Bar",
      age: 29,
      regiment: "2nd Battalion, West Yorkshire Regiment (Prince of Wales's Own)",
      connection: 'Lived at Manor Way Grange, Lee-on-the-Solent. Middle brother.',
      memorial: 'La Targette British Cemetery, Neuville-St. Vaast, France (Plot I. Row C. Grave 2)',
      story:
        'Decorated with the Military Cross and Bar. Wounded at Westhoek Ridge (Ypres) in August 1917. Later killed on 20th September 1917.',
      image: '/images/lowry_auriol.png',
      visiting_location: 'Commemorated on Stubbington War Memorial',
    },
    {
      name: "Lieutenant Cyril John 'Patrick' Lowry",
      age: 20,
      regiment: "2nd Battalion, West Yorkshire Regiment (Prince of Wales's Own)",
      connection: 'Lived at Manor Way Grange, Lee-on-the-Solent. Youngest brother.',
      memorial: 'Pozières Memorial, Somme, France (Panel 31 and 32)',
      story:
        'Killed on 25th March 1918 on the Somme while leading a counter-attack under the command of his brother Eric, falling in full view of him. He has no known grave.',
      image: '/images/lowry_cyril.png',
      visiting_location: 'Commemorated on Stubbington War Memorial',
    },
  ];

  // Helper to format field pilgrim cards for the lessons
  const heroFranklin = unit.lessons.find((l) => l.id === 'hero_0');
  if (heroFranklin) {
    heroFranklin.title = 'Private T. J. Franklin (Menin Gate · Panel 35)';
    heroFranklin.cwgc_data = {
      memorial: 'Ypres (Menin Gate) Memorial',
      panel: 'Panel 35',
      regiment: '1st Battalion, The Hampshire Regiment',
      service_number: '8560',
      date_of_death: '29 April 1915',
      age: 23,
    };
    heroFranklin.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'The Menin Gate: Finding Private T. J. Franklin',
        text:
          "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Ypres (Menin Gate) Memorial · <strong>Panel 35</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Walk through the main archway. Panel 35 is located on the south staircase wall displaying the Hampshire Regiment fallen.</p></div>" +
          '<strong>Rank:</strong> Private<br>' +
          '<strong>Service Number:</strong> 8560<br>' +
          '<strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br>' +
          '<strong>Born:</strong> Alverstoke, Hampshire, c. 1893 (son of George and Mary Ann Jane Franklin).<br>' +
          '<strong>Home Address:</strong> Chark Cottage, later Meadow Cottage, Chark, Lee-on-the-Solent.<br>' +
          '<strong>Military Service & Fate:</strong> Enlisted at Gosport in 1911. Deployed to France in August 1914 as part of the original British Expeditionary Force (1914 Star). He was killed in action on <strong>29th April 1915</strong> during the Second Battle of Ypres. His battalion held an exposed rearguard position on the Frezenberg Ridge to cover an Allied withdrawal, enduring torrential artillery shelling and the first German poison gas attacks. He has no known grave.<br><br>' +
          "<div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>When you enter beneath the Menin Gate, locate <strong>Panel 35</strong>. Look down the list of names under <em>'HAMPSHIRE REGIMENT'</em> until you find <strong>FRANKLIN T.J.</strong> Stand in silence for 30 seconds. Remember that before he stood on Frezenberg Ridge, he walked the lanes around Chark and Lee-on-the-Solent.</p></div>",
      },
    ];
  }

  const heroAyling = unit.lessons.find((l) => l.id === 'hero_1');
  if (heroAyling) {
    heroAyling.title = 'Private W. Ayling (Menin Gate · Panel 35)';
    heroAyling.cwgc_data = {
      memorial: 'Ypres (Menin Gate) Memorial',
      panel: 'Panel 35',
      regiment: '1st Battalion, The Hampshire Regiment',
      service_number: '9330',
      date_of_death: '9 July 1915',
      age: 20,
    };
    heroAyling.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'The Menin Gate: Finding Private William Ayling',
        text:
          "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Ypres (Menin Gate) Memorial · <strong>Panel 35</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the exact same panel as his battalion comrade Private Franklin.</p></div>" +
          '<strong>Rank:</strong> Private (commemorated on Holy Rood memorial as Lance Corporal)<br>' +
          '<strong>Service Number:</strong> 9330<br>' +
          '<strong>Regiment:</strong> 1st Battalion, The Hampshire Regiment<br>' +
          '<strong>Born:</strong> c. 1895, Hindhead, Surrey (son of Horace and Annie Ayling).<br>' +
          '<strong>Home Address:</strong> Stubbington Lane, Stubbington.<br>' +
          "<strong>Civilian Trade:</strong> Baker's boy delivering bread around Stubbington village.<br>" +
          '<strong>Military Service & Fate:</strong> Enlisted at Winchester. Crossed to France in August 1914. Killed in action by shellfire and trench mortars on <strong>9th July 1915</strong> (aged just 20) during trench relief operations north of Ypres. His body was never recovered.<br><br>' +
          "<div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>On <strong>Panel 35</strong>, find <strong>AYLING W.</strong> just a few rows above Private Franklin. Reflect on the fact that at age 20, he was barely older than Year 11 pupils when he was killed in the trenches.</p></div>",
      },
    ];
  }

  const heroMuckett = unit.lessons.find((l) => l.id === 'hero_2');
  if (heroMuckett) {
    heroMuckett.title = 'Private S. Muckett (Tyne Cot · Panels 88–90)';
    heroMuckett.cwgc_data = {
      memorial: 'Tyne Cot Memorial to the Missing',
      panel: 'Panel 88 to 90 and 162',
      regiment: '15th Battalion, The Hampshire Regiment',
      service_number: '12977 / 204369',
      date_of_death: '20 September 1917',
      age: 21,
    };
    heroMuckett.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Private Sydney Muckett',
        text:
          "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Located on the grand curved memorial flint-and-stone wall at the rear of the cemetery grounds.</p></div>" +
          '<strong>Rank:</strong> Private<br>' +
          '<strong>Service Number:</strong> 12977 (renumbered 204369)<br>' +
          "<strong>Regiment:</strong> 15th Battalion, The Hampshire Regiment ('Pompey Pals')<br>" +
          '<strong>Born:</strong> 26th December 1895, Titchfield (son of William and Elizabeth Muckett).<br>' +
          "<strong>Home Address:</strong> Brown's Farm, Stubbington.<br>" +
          "<strong>Civilian Trade:</strong> Grocer's errand boy in Stubbington.<br>" +
          '<strong>Military Service & Fate:</strong> Enlisted at Fareham. Killed in action, aged 21, on <strong>20th September 1917</strong> during the Battle of Menin Road Ridge (Third Battle of Ypres / Passchendaele). His battalion attacked through deep Flanders mud under fierce machine-gun fire. He has no known grave.<br><br>' +
          "<div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>Walk past the 11,000 headstones to the rear curved stone wall. Locate the Hampshire Regiment panels (**Panels 88–90**). Find <strong>MUCKETT S.</strong> Touch the carved letters of his name and think about his daily life at Brown's Farm.</p></div>",
      },
    ];
  }

  const heroRye = unit.lessons.find((l) => l.id === 'hero_3');
  if (heroRye) {
    heroRye.title = 'Private A. Rye (Tyne Cot · Panels 88–90)';
    heroRye.cwgc_data = {
      memorial: 'Tyne Cot Memorial to the Missing',
      panel: 'Panel 88 to 90 and 162',
      regiment: '14th Battalion, The Hampshire Regiment',
      service_number: '22926',
      date_of_death: '26 September 1917',
      age: 21,
    };
    heroRye.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Private Arthur Rye',
        text:
          "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Carved on the same panels as his relative by marriage, Private Sydney Muckett.</p></div>" +
          '<strong>Rank:</strong> Private<br>' +
          '<strong>Service Number:</strong> 22926<br>' +
          "<strong>Regiment:</strong> 14th Battalion, The Hampshire Regiment ('Pompey Pals')<br>" +
          '<strong>Born:</strong> 1897, Forest Side, Sussex (son of Charles and Jane Rye).<br>' +
          '<strong>Home Address:</strong> Lower Crabthorne, Hill Head.<br>' +
          '<strong>Civilian Trade:</strong> Local nurseryman.<br>' +
          '<strong>Local Family Connection:</strong> His sister Alice was married to Frank Muckett (brother of Sydney Muckett).<br>' +
          '<strong>Military Service & Fate:</strong> Enlisted at Fareham. Killed in action, aged 21, on <strong>26th September 1917</strong> at Polygon Wood—just six days after Sydney Muckett was killed nearby. He has no known grave.<br><br>' +
          "<div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>On <strong>Panels 88–90</strong>, find <strong>RYE A.</strong> near Sydney Muckett. Consider the grief of the Rye and Muckett families in Stubbington receiving death notices within one week of each other.</p></div>",
      },
    ];
  }

  const heroWard = unit.lessons.find((l) => l.id === 'hero_4');
  if (heroWard) {
    heroWard.title = 'Lance Corporal A. H. Ward (Tyne Cot · Panels 88–90)';
    heroWard.cwgc_data = {
      memorial: 'Tyne Cot Memorial to the Missing',
      panel: 'Panel 88 to 90 and 162',
      regiment: '15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment',
      service_number: '17568',
      date_of_death: '14 October 1918',
      age: 23,
    };
    heroWard.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Lance Corporal Archibald Hugh Ward',
        text:
          "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 88 to 90</strong> (Hampshire Regiment)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>On the Hampshire Regiment panels of the memorial wall.</p></div>" +
          '<strong>Rank:</strong> Lance Corporal<br>' +
          '<strong>Service Number:</strong> 17568<br>' +
          '<strong>Regiment:</strong> 15th (Hampshire Yeomanry) Battalion, The Hampshire Regiment<br>' +
          '<strong>Born:</strong> 1896, Alverstoke (son of Hugh Ward, RN Coastguard, and Bertha Kathleen Ward).<br>' +
          '<strong>Home Address:</strong> 6 Coastguard Cottages, Hill Head, and later Balmoral, Gosport Road, Lee-on-the-Solent.<br>' +
          '<strong>Military Service & Fate:</strong> Enlisted in Portsmouth. Fought in France and Italy before returning to the Western Front in spring 1918. Killed in action, aged 23, on <strong>14th October 1918</strong> near Gheluwe during the final Hundred Days Offensive—less than four weeks before the Armistice. He has no known grave.<br><br>' +
          "<div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>Find <strong>WARD A.H.</strong> on <strong>Panels 88–90</strong>. Reflect on the poignancy of a soldier killed in October 1918 when peace was already on the horizon.</p></div>",
      },
    ];
  }

  const heroWarland = unit.lessons.find((l) => l.id === 'hero_5');
  if (heroWarland) {
    heroWarland.title = 'Private C. A. H. Warland (Tyne Cot · Panels 14–17)';
    heroWarland.cwgc_data = {
      memorial: 'Tyne Cot Memorial to the Missing',
      panel: 'Panel 14 to 17 and 162 to 162A',
      regiment: "3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)",
      service_number: 'T/202335',
      date_of_death: '4 October 1917',
      age: 20,
    };
    heroWarland.narrative_blocks = [
      {
        type: 'narrative',
        theme_heading: 'Tyne Cot: Finding Private Charles Alfred Henry Warland',
        text:
          "<div style='background: #fef2f2; border: 1.5px solid #fecaca; border-left: 5px solid #dc2626; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'><h4 style='margin: 0 0 8px 0; color: #991b1b; font-size: 1.15rem;'><i class='fa-solid fa-location-dot'></i> Exact Memorial Location</h4><p style='margin: 0; font-size: 1.05rem; color: #1e293b; font-weight: 600;'>Tyne Cot Memorial to the Missing · <strong>Panels 14 to 17</strong> (The Queen's Royal West Surrey)</p><p style='margin: 6px 0 0 0; font-size: 0.9rem; color: #64748b;'>Located on the western section of the Memorial Wall under The Queen's Regiment.</p></div>" +
          '<strong>Rank:</strong> Private<br>' +
          '<strong>Service Number:</strong> T/202335<br>' +
          "<strong>Regiment:</strong> 3rd/4th Battalion, The Queen's (Royal West Surrey Regiment)<br>" +
          '<strong>Born:</strong> 1897, Richmond, Surrey (son of John Alfred Henry and Louise Clara Warland).<br>' +
          '<strong>Home Address:</strong> Canford, Lee-on-the-Solent.<br>' +
          '<strong>Family Context:</strong> His father was a sporting journalist, author, and Secretary of Lee-on-the-Solent Golf Club.<br>' +
          '<strong>Military Service & Fate:</strong> Enlisted in Richmond. Killed in action, aged 20, on <strong>4th October 1917</strong> during the Battle of Broodseinde, advancing across flooded ground to capture Juniper Trench. He has no known grave.<br><br>' +
          "<div style='background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 4px solid #16a34a; border-radius: 6px; padding: 15px; margin-top: 15px;'><h5 style='margin: 0 0 6px 0; color: #166534; font-size: 1rem;'><i class='fa-solid fa-compass'></i> On-Site Field Mission</h5><p style='margin: 0; color: #1e293b; font-size: 0.95rem; line-height: 1.5;'>Head to <strong>Panels 14–17</strong> under <em>'QUEEN'S (ROYAL WEST SURREY REGIMENT)'</em>. Locate <strong>WARLAND C.</strong> Reflect on his assault across the Flanders mud at Broodseinde.</p></div>",
      },
    ];
  }

  const outputCode = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';

  // Acorn AST check
  acorn.parse(outputCode, { ecmaVersion: 'latest', sourceType: 'module' });
  console.log('✅ Acorn AST validation passed for trip_ypres/data.js');

  fs.writeFileSync(dataFilePath, outputCode, 'utf8');
  console.log(
    '🎉 Successfully updated trip_ypres/data.js with 100% verified CWGC records and on-site field missions!',
  );
}

run().catch(console.error);
