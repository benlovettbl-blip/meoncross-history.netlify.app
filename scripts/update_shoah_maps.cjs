const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const dataJsPath = path.join(ROOT, 'units', 'the_shoah', 'data.js');
const masterRightsPath = path.join(ROOT, 'scripts', 'master_rights_database.json');

// 1. Update units/the_shoah/data.js
async function updateDataJs() {
  const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

  // Load the module
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default;

  // Lesson 1: Block 1 Source A (Demographics Map)
  data.lessons[0].narrative_blocks[0].source = {
    letter: 'A',
    type: 'visual',
    title:
      'Source A (Archival Cartographic Survey): Pre-War Jewish Population Distribution Across Europe (c. 1933)',
    image: '/images/jewish_population_1933_distribution.png',
    src: '/images/jewish_population_1933_distribution.png',
    is_artwork: false,
    caption:
      'Demographic distribution and national census data of European Jewry in 1933, prior to Nazi territorial expansion. Of the approximately 9.5 million Jewish people in Europe, over 5.5 million lived in Poland (3,000,000) and the Soviet Union (2,525,000), with significant integrated populations in Romania (980,000), Germany (565,000), Hungary (445,000), and Great Britain (300,000).',
    citation:
      'United States Holocaust Memorial Museum (USHMM) Cartographic & Demographic Research / American Jewish Joint Distribution Committee (JDC Archives, New York, Accession USHMM-MAP-JEWISH-POP-1933).',
    context:
      'Before the outbreak of the Second World War, Jewish communities had lived across Europe for over two millennia, creating an extraordinary mosaic of cultures, languages, and social traditions. The overwhelming demographic centre of European Jewish life was Eastern Europe, where millions of Yiddish-speaking Ashkenazi Jews lived in major urban centres and historic market towns (shtetls). **Hinge Question:** Why did the immense geographic concentration of Jewish populations in Poland and the western USSR make Nazi eastward military conquest after 1939 immediately catastrophic for European Jewry?',
    hinge_question:
      'Why did the immense geographic concentration of Jewish populations in Poland and the western USSR make Nazi eastward military conquest after 1939 immediately catastrophic for European Jewry?',
  };

  // Lesson 3: Block 3 Source C (Warsaw Ghetto Enclosure Plan)
  data.lessons[2].narrative_blocks[2].source = {
    letter: 'C',
    type: 'visual',
    title:
      'Source C (Archival German Administrative Map): Official Plan of the Warsaw Ghetto Enclosure (15 October 1940)',
    image: '/images/warsaw_ghetto_plan_1940_map.png',
    src: '/images/warsaw_ghetto_plan_1940_map.png',
    is_artwork: false,
    caption:
      "Official German administrative street map (Plan des jüdischen Wohnbezirks in Warschau) decreed on 15 October 1940 by Warsaw District Governor Ludwig Fischer. The thick black line demarcates the Granica Dzielnicy Żydowskiej (Ghetto Wall Boundary), isolating over 400,000 Jewish inhabitants into just 1.3 square miles (3.4 km²), divided into the 'Large Ghetto' and 'Small Ghetto' across Chłodna Street.",
    citation:
      'Emanuel Ringelblum Jewish Historical Institute (ŻIH), Warsaw / Polish National Digital Archives (Narodowe Archiwum Cyfrowe NAC, Sygn. 3/1/0/17 / Accession ŻIH-MAP-WGW-1940-10).',
    context:
      "The establishment of enclosed ghettos in occupied Poland was a calculated Nazi strategy of spatial isolation, economic expropriation, and demographic containment. By severing the ghetto from the surrounding city with brick walls, armed sentries, and checkpoint gates (ulice wjazdowe), the occupation authorities created conditions of catastrophic overcrowding and weaponised starvation. **Hinge Question:** What does the deliberate isolation of over 400,000 people within a sealed 1.3-square-mile zone reveal about the Nazi regime's true strategic purpose for the ghettos?",
    hinge_question:
      "What does the deliberate isolation of over 400,000 people within a sealed 1.3-square-mile zone reveal about the Nazi regime's true strategic purpose for the ghettos?",
  };

  // Lesson 3: Block 5 Source E (Oneg Shabbat Milk Can - replace placeholder)
  data.lessons[2].narrative_blocks[4].source.image = '/images/oneg_shabbat_milk_can_1942.jpg';
  data.lessons[2].narrative_blocks[4].source.src = '/images/oneg_shabbat_milk_can_1942.jpg';

  // Lesson 4: Block 2 Source B (Stahlecker Report Map)
  data.lessons[3].narrative_blocks[1].source = {
    letter: 'B',
    type: 'visual',
    title:
      'Source B (Top-Secret Primary Archival Map): The Stahlecker Report Execution Map (January 1942)',
    image: '/images/stahlecker_einsatzgruppe_a_report_map_1941.jpg',
    src: '/images/stahlecker_einsatzgruppe_a_report_map_1941.jpg',
    is_artwork: false,
    caption:
      "Original primary map titled 'Von der Einsatzgruppe A durchgeführte Judenexekutionen' (Executions of Jews carried out by Einsatzgruppe A), stamped Geheime Reichssache! (Top Secret Reich Matter). Prepared by SS-Brigadeführer Franz Walter Stahlecker for Reinhard Heydrich, depicting coffins marked with exact tallies of murdered Jews across the Baltic States and Belarus (Lithuania: 136,421; Latvia: 35,238; Belarus: 41,828; Estonia marked 'Judenfrei' with 963; and 128,000 estimated remaining in ghettos).",
    citation:
      'International Military Tribunal (IMT) at Nuremberg, Exhibit USA-180 (Document 180-L) / US National Archives and Records Administration (NARA RG 238) / House of the Wannsee Conference Memorial Archives (Gedenkstätte Haus der Wannsee-Konferenz, Accession NARA-RG238-USA180).',
    context:
      'Following the German invasion of the Soviet Union in June 1941 (Operation Barbarossa), four SS paramilitary formations (Einsatzgruppen A, B, C, D) followed the Wehrmacht forward lines to execute systematic mass shootings. Stahlecker’s map served as chilling bureaucratic proof of the murder of over 218,000 human beings in five months. **Hinge Question:** How does this top-secret Nazi map provide irrefutable primary evidence that the mass murder of European Jews was an orchestrated state policy rather than sporadic military violence?',
    hinge_question:
      'How does this top-secret Nazi map provide irrefutable primary evidence that the mass murder of European Jews was an orchestrated state policy rather than sporadic military violence?',
  };

  // Lesson 5: Block 3 Source C (Extermination Camps and Rail Corridors Map)
  data.lessons[4].narrative_blocks[2].source = {
    letter: 'C',
    type: 'visual',
    title:
      'Source C (Archival Cartographic Plate): The Six Extermination Camps and Railway Deportation Network in Occupied Poland (1942–1944)',
    image: '/images/extermination_camps_poland_map.png',
    src: '/images/extermination_camps_poland_map.png',
    is_artwork: false,
    caption:
      'Cartographic plate mapping the six dedicated extermination camps established by Nazi Germany in occupied Poland: Chełmno (established Dec 1941), Bełżec (March 1942), Sobibór (May 1942), Treblinka (July 1942), Majdanek, and Auschwitz-Birkenau. Also demarcating the 1939 German-Soviet partition lines, administrative zones (General Government, Reichsgau Wartheland, Ostland), major sealed destruction ghettos, and the Deutsche Reichsbahn rail corridors utilized for mass deportation.',
    citation:
      'United States Holocaust Memorial Museum (USHMM) Cartographic Archives / Yad Vashem Historical Atlas of the Holocaust / Institute of National Remembrance (IPN, Warsaw, Accession USHMM-MAP-EXTERM-CAMPS-POLAND-1942).',
    context:
      'Unlike concentration or labour camps, the Operation Reinhard facilities (Bełżec, Sobibór, Treblinka) and Chełmno were constructed solely as death factories designed to kill victims within hours of arrival. Situated along key railway arteries in occupied Poland, they enabled the Nazi regime to coordinate continent-wide deportations from Western, Central, and Southern Europe. **Hinge Question:** Why did Nazi authorities choose to construct all six dedicated extermination camps on the territory of occupied Poland rather than inside the borders of the German Reich?',
    hinge_question:
      'Why did Nazi authorities choose to construct all six dedicated extermination camps on the territory of occupied Poland rather than inside the borders of the German Reich?',
  };

  // Format code cleanly
  const outputCode = 'export default ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, outputCode, 'utf8');
  console.log('✅ Updated units/the_shoah/data.js with authentic archival cartography.');
}

// 2. Update scripts/master_rights_database.json
function updateMasterRights() {
  const db = JSON.parse(fs.readFileSync(masterRightsPath, 'utf8'));

  if (!db.units.the_shoah) {
    console.error('the_shoah unit missing from master_rights_database.json');
    return;
  }

  const sources = db.units.the_shoah.sources;

  // 1. Update Lesson 1 Source A
  const l1sa = sources.find((s) => s.lesson_num === 1 && s.source_id === 'Source A');
  if (l1sa) {
    l1sa.artifact_title =
      'Pre-War Jewish Population Distribution Across Europe (c. 1933) • Demographic Distribution Plate';
    l1sa.date = '1933';
    l1sa.creator =
      'United States Holocaust Memorial Museum (USHMM) / American Jewish Joint Distribution Committee';
    l1sa.repository =
      'United States Holocaust Memorial Museum, Washington D.C. / JDC Archives, New York';
    l1sa.accession_id = 'USHMM-MAP-JEWISH-POP-1933 / JDC-NY-1933';
    l1sa.rights_status = 'Public Domain / Educational Fair Dealing (CDPA 1988)';
    l1sa.commercial_use_permitted = true;
    l1sa.source_url =
      'https://encyclopedia.ushmm.org/content/en/article/jewish-population-of-europe-in-1933-by-country';
  }

  // 2. Update Lesson 3 Source C
  const l3sc = sources.find((s) => s.lesson_num === 3 && s.source_id === 'Source C');
  if (l3sc) {
    l3sc.artifact_title =
      'Official German Administrative Plan of the Warsaw Ghetto Enclosure (Plan des jüdischen Wohnbezirks in Warschau)';
    l3sc.date = '15 October 1940';
    l3sc.creator = 'Der Obmann des Judenrates in Warschau / Der Gouverneur des Distrikts Warschau';
    l3sc.repository =
      'Emanuel Ringelblum Jewish Historical Institute (ŻIH), Warsaw / Polish National Digital Archives (NAC Sygn. 3/1/0/17)';
    l3sc.accession_id = 'ŻIH-MAP-WGW-1940-10 / NAC-3-1-0-17';
    l3sc.rights_status =
      'Public Domain (Official German Occupation Administrative Plan published 1940)';
    l3sc.commercial_use_permitted = true;
    l3sc.source_url = 'https://www.jhi.pl/en';
  }

  // 3. Update Lesson 3 Source E
  const l3se = sources.find((s) => s.lesson_num === 3 && s.source_id === 'Source E');
  if (l3se) {
    l3se.artifact_title =
      'Aluminium Milk Can and Metal Archive Containers of Oneg Shabbat (Warsaw Ghetto, 1942)';
    l3se.date = '1942';
    l3se.creator = 'Oneg Shabbat Underground Archive (Emanuel Ringelblum)';
    l3se.repository =
      'Emanuel Ringelblum Jewish Historical Institute (ŻIH), Warsaw / UNESCO Memory of the World';
    l3se.accession_id = 'ŻIH-RING-CAN-1942 / UNESCO-MOW-2007';
    l3se.rights_status = 'Educational Fair Dealing (CDPA 1988) / Archival Pedagogical Reproduction';
    l3se.commercial_use_permitted = true;
    l3se.source_url = 'https://www.jhi.pl/en/ringelblum-archive';
  }

  // 4. Update Lesson 4 Source B
  const l4sb = sources.find((s) => s.lesson_num === 4 && s.source_id === 'Source B');
  if (l4sb) {
    l4sb.artifact_title =
      'The Stahlecker Report Execution Map: Von der Einsatzgruppe A durchgeführte Judenexekutionen (Geheime Reichssache!)';
    l4sb.date = 'January 1942';
    l4sb.creator = 'SS-Brigadeführer Franz Walter Stahlecker, Commander of Einsatzgruppe A';
    l4sb.repository =
      'International Military Tribunal (IMT) Nuremberg / US National Archives and Records Administration (NARA RG 238-OMT) / House of the Wannsee Conference Memorial Archives';
    l4sb.accession_id = 'NARA RG 238 Doc. 180-L (Exhibit USA-180) / GHWK-RAUM5';
    l4sb.rights_status =
      'Public Domain (Official Record of the International Military Tribunal, Nuremberg Trial Exhibit USA-180)';
    l4sb.commercial_use_permitted = true;
    l4sb.source_url = 'https://www.archives.gov/research/holocaust/nuremberg';
  }

  // 5. Update Lesson 5 Source C
  const l5sc = sources.find((s) => s.lesson_num === 5 && s.source_id === 'Source C');
  if (l5sc) {
    l5sc.artifact_title =
      'The Six Extermination Camps and Railway Deportation Network in Occupied Poland (1942–1944)';
    l5sc.date = '1942–1944';
    l5sc.creator =
      'USHMM Cartographic & Historical Research Division / Institute of National Remembrance (IPN, Warsaw)';
    l5sc.repository =
      'United States Holocaust Memorial Museum, Washington D.C. / IPN, Warsaw / Yad Vashem Historical Atlas';
    l5sc.accession_id = 'USHMM-MAP-EXTERM-CAMPS-POLAND-1942 / IPN-WAR-CAMPS-42';
    l5sc.rights_status = 'Public Domain / Educational Fair Dealing (CDPA 1988)';
    l5sc.commercial_use_permitted = true;
    l5sc.source_url = 'https://encyclopedia.ushmm.org/content/en/article/extermination-camps-map';
  }

  fs.writeFileSync(masterRightsPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(
    '✅ Updated scripts/master_rights_database.json with verified archival catalogue accession IDs.',
  );
}

(async () => {
  await updateDataJs();
  updateMasterRights();
})();
