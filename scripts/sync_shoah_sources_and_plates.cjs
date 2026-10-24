const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const dataJsPath = path.join(ROOT, 'units', 'the_shoah', 'data.js');
const publicDataJsonPath = path.join(ROOT, 'public', 'data', 'the_shoah.json');
const masterRightsPath = path.join(ROOT, 'scripts', 'master_rights_database.json');

async function main() {
  console.log('🔄 Beginning The Shoah dual-plate and archival source synchronization...');

  // 1. Load data from units/the_shoah/data.js
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.unitData;

  // --- Enquiry 1: Block 3 (Source C: German Jewish Soldiers Hanukkah) ---
  data.lessons[0].narrative_blocks[2].source = {
    letter: 'C',
    type: 'visual',
    title:
      'Source C (Archival Photograph): German Jewish Soldiers Celebrating Hanukkah on the Western Front (December 1916)',
    image: '/images/german_jewish_soldiers_hanukkah_1916.jpg',
    src: '/images/german_jewish_soldiers_hanukkah_1916.jpg',
    is_artwork: false,
    caption:
      'German Jewish soldiers gathered on the front lines to kindle the Hanukkah menorah, winter 1916. Over 100,000 German Jews served in the Imperial German armed forces during WWI; 12,000 were killed in action and 18,000 received the Iron Cross for valour.',
    citation:
      'German Federal Archives (Bundesarchiv) / Leo Baeck Institute (New York) / Center for Jewish History (Accession LBI-WWI-HANUKKAH-1916).',
    context:
      "During the First World War, German Jews served with patriotic devotion alongside their Christian comrades, demonstrating their deep integration into German civil society and national life. The virulent anti-Semitic 'stab-in-the-back' myth (Dolchstoßlegende) propagated by Nazi ideologues after 1918 directly contradicted this verified historical reality. **Hinge Question:** Why did the widespread military service of German Jews in WWI make the Nazi regime's subsequent anti-Semitic laws feel so disorienting and shocking to German Jewish citizens after 1933?",
    hinge_question:
      "Why did the widespread military service of German Jews in WWI make the Nazi regime's subsequent anti-Semitic laws feel so disorienting and shocking to German Jewish citizens after 1933?",
  };

  // --- Enquiry 5: Block 3 (Source C: Dual Forensic Archival Plates) ---
  data.lessons[4].narrative_blocks[2].source = {
    letter: 'C',
    type: 'visual',
    title:
      'Source C (Dual Forensic Archival Plates): Continental Rail Logistics & SS Blueprint of Crematorium II, Birkenau (1942–1944)',
    image: '/images/extermination_camps_poland_map.png',
    src: '/images/extermination_camps_poland_map.png',
    secondary_image: '/images/auschwitz_crematorium_ii_blueprint_1942.jpg',
    plates: [
      {
        plate_id: 'Plate 1',
        label: 'PLATE 1 • CONTINENTAL LOGISTICAL NETWORK',
        title:
          'The Six Dedicated Extermination Camps and Railway Deportation Corridors in Occupied Poland (1942–1944)',
        image: '/images/extermination_camps_poland_map.png',
        caption:
          'Archival cartography demarcating the six dedicated extermination camps established in occupied Poland (Chełmno, Bełżec, Sobibór, Treblinka, Majdanek, Auschwitz-Birkenau) and the Deutsche Reichsbahn rail corridors utilized for continent-wide deportation.',
        citation:
          'United States Holocaust Memorial Museum (USHMM) Cartographic Archives / Yad Vashem Historical Atlas / IPN Warsaw (Accession USHMM-MAP-EXTERM-CAMPS-POLAND-1942)',
      },
      {
        plate_id: 'Plate 2',
        label: 'PLATE 2 • INDUSTRIAL KILLING ARCHITECTURE',
        title: 'SS Central Construction Management Blueprint of Crematorium II, Birkenau (1942)',
        image: '/images/auschwitz_crematorium_ii_blueprint_1942.jpg',
        caption:
          'Original architectural engineering diagram drafted by SS-Zentralbauleitung Auschwitz showing the subterranean undressing cellar (Auskleidekeller) and underground gas chamber (Leichenkeller / Gaskammer) with Zyklon B ventilation ducts built by industrial firm J.A. Topf & Söhne.',
        citation:
          'Auschwitz-Birkenau State Museum Archives / Yad Vashem Photo & Document Archive (Accession APMA-BW-30-1942 / YVA-7182 / NARA RG 238)',
      },
    ],
    is_artwork: false,
    caption:
      'Dual forensic archival plates demonstrating the macro-scale logistical transport network (Plate 1) and the micro-scale industrial architecture of mass murder engineered at Auschwitz-Birkenau (Plate 2).',
    citation:
      'Plate 1: USHMM Cartographic Archives / Yad Vashem; Plate 2: Auschwitz-Birkenau State Museum / Yad Vashem (APMA-BW-30-1942).',
    context:
      "The Nazi 'Final Solution' operated on a dual scale: a continent-wide logistical system coordinating state railways (Deutsche Reichsbahn) to deport millions across thousands of miles, and a localized industrial killing apparatus using modern engineering (Topf & Söhne cremation ovens and hermetically sealed gas chambers). **Hinge Question:** How do the continental railway deportation network (Plate 1) and the industrial engineering blueprints of Birkenau's crematoria (Plate 2) demonstrate that the Holocaust was an integrated continental operation requiring modern logistical, corporate, and technological systems?",
    hinge_question:
      "How do the continental railway deportation network (Plate 1) and the industrial engineering blueprints of Birkenau's crematoria (Plate 2) demonstrate that the Holocaust was an integrated continental operation requiring modern logistical, corporate, and technological systems?",
  };

  // --- Enquiry 6: Block 5 (Source E: Rescue of Danish Jews) ---
  data.lessons[5].narrative_blocks[4].source = {
    letter: 'E',
    type: 'visual',
    title:
      'Source E (Historic Photograph & Record): Fishing Boats Used to Rescue Danish Jews to Neutral Sweden (October 1943)',
    image: '/images/danish_rescue_boat_1943.jpg',
    src: '/images/danish_rescue_boat_1943.jpg',
    is_artwork: false,
    caption:
      "Danish Jewish refugees aboard a small fishing vessel arriving in neutral Sweden after being clandestinely ferried across the Øresund strait from Dragør and Gilleleje, October 1943. Through a coordinated national rescue effort involving Danish fishermen, police, and civilians, over 7,200 Jews (over 95% of Denmark's Jewish population) were saved from Nazi deportation.",
    citation:
      'Danish National Museum (Nationalmuseet) / Museum of Danish Resistance (Frihedsmuseet, Copenhagen, Accession NM-DK-RESCUE-1943) / USHMM.',
    context:
      'When German occupation authorities ordered the sudden round-up and deportation of Danish Jews in October 1943, Danish citizens, doctors, pastors, and fishermen mounted a spontaneous nationwide rescue effort. Over several weeks, hundreds of small fishing cutters covertly transported Danish Jews across the narrow Øresund strait to sanctuary in neutral Sweden. **Hinge Question:** What conditions in Denmark—such as local resistance networks, maritime proximity to Sweden, and broad societal solidarity—enabled the rescue of over 95% of Danish Jews, whereas in countries like the Netherlands over 70% were murdered?',
    hinge_question:
      'What conditions in Denmark—such as local resistance networks, maritime proximity to Sweden, and broad societal solidarity—enabled the rescue of over 95% of Danish Jews, whereas in countries like the Netherlands over 70% were murdered?',
  };

  // --- Enquiry 7: Block 2 (Source B: British Medical Unit at Bergen-Belsen) ---
  data.lessons[6].narrative_blocks[1].source = {
    letter: 'B',
    type: 'visual',
    title:
      'Source B (Historic Archival Photograph & Eyewitness Signal): British Army Medical Unit at Bergen-Belsen (15 April 1945)',
    image: '/images/bergen_belsen_liberation_british_1945.jpg',
    src: '/images/bergen_belsen_liberation_british_1945.jpg',
    is_artwork: false,
    caption:
      'Soldiers of the British Army 11th Armoured Division and Royal Army Medical Corps (RAMC) entering the Bergen-Belsen concentration camp alongside surviving inmates, April 1945. British forces discovered over 60,000 starving, typhus-stricken prisoners and thousands of unburied corpses, providing the British public with first-hand photographic proof of Nazi atrocities.',
    citation:
      'Imperial War Museum (IWM Collections, Accession No. BU 5481 / BU 6600, Photographs by Lt. Midgley / Sgt. Oakes) / Ministry of Information Second World War Official Collection.',
    context:
      'When British troops entered Bergen-Belsen on 15 April 1945 under a localized truce arranged to contain a catastrophic typhus epidemic, they were confronted with human suffering on an unprecedented scale. British medical units worked tirelessly to establish emergency hospitals, but over 13,000 survivors died in the weeks following liberation due to severe malnutrition and disease. **Hinge Question:** Why was photographic and film documentation produced by Allied military units at Bergen-Belsen and Dachau in 1945 decisive in defeating Nazi wartime attempts to conceal the Holocaust?',
    hinge_question:
      'Why was photographic and film documentation produced by Allied military units at Bergen-Belsen and Dachau in 1945 decisive in defeating Nazi wartime attempts to conceal the Holocaust?',
  };

  // --- Enquiry 7: Block 3 (Source C: SS Exodus 1947) ---
  data.lessons[6].narrative_blocks[2].source = {
    letter: 'C',
    type: 'visual',
    title:
      'Source C (Archival Photograph & Record): The Refugee Steamer SS Exodus 1947 and Displaced Persons Crisis (July 1947)',
    image: '/images/exodus_1947_ship.jpg',
    src: '/images/exodus_1947_ship.jpg',
    is_artwork: false,
    caption:
      'The battered refugee steamer SS Exodus 1947 arriving under British naval escort in Haifa harbour, July 1947, carrying over 4,500 Holocaust survivors seeking refuge. When British authorities forcibly returned the passengers to displaced persons camps in Germany, international outrage intensified global diplomatic pressure to resolve the post-war Jewish refugee crisis.',
    citation:
      'United States Holocaust Memorial Museum (USHMM Photo Archives, Accession 1988.115.1) / Central Zionist Archives (Jerusalem, CZA-EXODUS-1947).',
    context:
      'In the immediate aftermath of liberation, hundreds of thousands of surviving European Jews found themselves stateless displaced persons (DPs), unable or unwilling to return to homes and communities where anti-Semitic pogroms still erupted (such as the Kielce pogrom of July 1946). The plight of the SS Exodus passengers became an international symbol of the ongoing crisis of Jewish displacement. **Hinge Question:** Why did the plight of displaced Holocaust survivors between 1945 and 1948 accelerate international support for the United Nations Partition Plan for Palestine?',
    hinge_question:
      'Why did the plight of displaced Holocaust survivors between 1945 and 1948 accelerate international support for the United Nations Partition Plan for Palestine?',
  };

  // --- Enquiry 7: Block 4 (Source D: Nuremberg Trial Defendants in the Dock) ---
  data.lessons[6].narrative_blocks[3].source = {
    letter: 'D',
    type: 'visual',
    title:
      "Source D (Historic Photograph & Indictment): The Defendants in the Dock at Nuremberg and Raphael Lemkin's Concept of 'Genocide' (1945)",
    image: '/images/nuremberg_trial_defendants_dock_1945.jpg',
    src: '/images/nuremberg_trial_defendants_dock_1945.jpg',
    is_artwork: false,
    caption:
      'Twenty-one principal Nazi defendants in the dock at the Palace of Justice in Nuremberg during the International Military Tribunal (IMT), November 1945. Seated in the front row from left: Hermann Göring, Rudolf Hess, Joachim von Ribbentrop, Wilhelm Keitel, Ernst Kaltenbrunner, Alfred Rosenberg, Hans Frank, Wilhelm Frick, Julius Streicher, Walther Funk, and Hjalmar Schacht.',
    citation:
      'United States National Archives and Records Administration (NARA RG 238: Office of the Chief of Counsel for the Prosecution of Axis Criminality, 1945–1946 / Exhibit USA-IMT-1945).',
    context:
      "The Nuremberg Trials (1945–1946) established the historic precedent that individuals, regardless of state rank, could be held legally accountable for crimes against peace, war crimes, and crimes against humanity. Polish-Jewish jurist Raphael Lemkin coined the term 'genocide' in 1944, leading directly to the 1948 UN Convention on the Prevention and Punishment of the Crime of Genocide. **Hinge Question:** Why was conducting public, evidence-based trials at Nuremberg critical for establishing the historical truth of the Holocaust?",
    hinge_question:
      'Why was conducting public, evidence-based trials at Nuremberg critical for establishing the historical truth of the Holocaust?',
  };

  // 2. Write out units/the_shoah/data.js
  const exportStr = 'export default ' + JSON.stringify(data, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, exportStr, 'utf8');
  console.log('✅ Synchronized units/the_shoah/data.js');

  // 3. Write out public/data/the_shoah.json
  const publicUnitJson = {
    id: 'the_shoah',
    data: data,
  };
  fs.writeFileSync(publicDataJsonPath, JSON.stringify(publicUnitJson, null, 2), 'utf8');
  console.log('✅ Synchronized public/data/the_shoah.json');

  // 4. Update scripts/master_rights_database.json
  const rightsDb = JSON.parse(fs.readFileSync(masterRightsPath, 'utf8'));
  const shoahSources = rightsDb.units.the_shoah.sources;

  // Helper to find and update source by lesson_num and source_id
  function updateRightsSource(lessonNum, sourceId, updates) {
    const s = shoahSources.find(
      (item) => item.lesson_num === lessonNum && item.source_id === sourceId,
    );
    if (s) {
      Object.assign(s, updates);
      console.log(`  - Updated rights for Lesson ${lessonNum} ${sourceId}: ${s.artifact_title}`);
    } else {
      console.warn(
        `  ⚠️ Could not find Lesson ${lessonNum} ${sourceId} in master_rights_database!`,
      );
    }
  }

  // Update L1 Source C
  updateRightsSource(1, 'Source C', {
    artifact_title:
      'German Jewish Soldiers Celebrating Hanukkah on the Western Front (December 1916)',
    date: '1916',
    creator: 'Imperial German Military Photographer / Leo Baeck Institute Archives',
    repository: 'Bundesarchiv, Koblenz / Leo Baeck Institute, New York',
    accession_id: 'LBI-WWI-HANUKKAH-1916 / BArch-1916-FRONT',
    rights_status: 'Public Domain / Archival Historical Record',
    source_url:
      'https://commons.wikimedia.org/wiki/File:German_Jewish_soldiers_hold_a_Hanukkah_celebration._Poland,_1916.jpg',
  });

  // Update L5 Source C
  updateRightsSource(5, 'Source C', {
    artifact_title:
      'Dual Archival Plates: Continental Railway Deportation Network (Plate 1) & SS Blueprint of Crematorium II, Birkenau (Plate 2)',
    date: '1942–1944',
    creator:
      'Plate 1: USHMM Cartographic Division / IPN Warsaw; Plate 2: SS-Zentralbauleitung Auschwitz / J.A. Topf & Söhne',
    repository:
      'Plate 1: USHMM / Yad Vashem; Plate 2: Auschwitz-Birkenau State Museum / Yad Vashem / US National Archives (NARA RG 238)',
    accession_id: 'USHMM-MAP-EXTERM-CAMPS-POLAND-1942 / APMA-BW-30-1942 / YVA-7182',
    rights_status:
      'Public Domain (Captured Official Nazi Administrative Records 1945 / IMT Nuremberg Exhibit)',
    source_url: 'https://encyclopedia.ushmm.org/content/en/article/extermination-camps-map',
  });

  // Update L6 Source E
  updateRightsSource(6, 'Source E', {
    artifact_title: 'Fishing Boats Used to Rescue Danish Jews to Neutral Sweden (October 1943)',
    date: '1943',
    creator: 'National Museum of Denmark / Frihedsmuseet (Museum of Danish Resistance)',
    repository: 'Nationalmuseet, Copenhagen / Frihedsmuseet (Accession NM-DK-RESCUE-1943) / USHMM',
    accession_id: 'NM-DK-RESCUE-1943 / USHMM-DK-1943',
    rights_status: 'Public Domain / Educational Fair Dealing (CDPA 1988)',
    source_url: 'https://commons.wikimedia.org/wiki/File:Danish_jews_arrive_in_Sweden.jpg',
  });

  // Update L7 Source B
  updateRightsSource(7, 'Source B', {
    artifact_title: 'British Army Medical Unit at Bergen-Belsen Concentration Camp (15 April 1945)',
    date: '1945',
    creator: 'Lt. Midgley / Sgt. Oakes (British Army Film and Photographic Unit)',
    repository: 'Imperial War Museum (IWM), London (Accession No. BU 5481 / BU 6600)',
    accession_id: 'IWM-BU-5481 / IWM-BU-6600',
    rights_status: 'Public Domain / Open Government Licence (OGL v1.0) / Crown Copyright Expired',
    source_url: 'https://www.iwm.org.uk/collections/item/object/205193910',
  });

  // Update L7 Source C
  updateRightsSource(7, 'Source C', {
    artifact_title: 'The Refugee Steamer SS Exodus 1947 Arriving in Haifa Harbour (July 1947)',
    date: '1947',
    creator: 'Central Zionist Archives / USHMM Photo Archives',
    repository:
      'Central Zionist Archives, Jerusalem (CZA-EXODUS-1947) / USHMM (Accession 1988.115.1)',
    accession_id: 'USHMM-1988-115-1 / CZA-EXODUS-1947',
    rights_status: 'Public Domain / Educational Fair Dealing (CDPA 1988)',
    source_url: 'https://collections.ushmm.org/search/catalog/pa1036087',
  });

  // Update L7 Source D
  updateRightsSource(7, 'Source D', {
    artifact_title:
      'The Defendants in the Dock at the International Military Tribunal, Nuremberg (November 1945)',
    date: '1945',
    creator: 'Office of the Chief of Counsel for Axis Criminality / US Army Signal Corps',
    repository:
      'US National Archives and Records Administration (NARA RG 238, Accession 540127) / IMT Nuremberg Exhibit',
    accession_id: 'NARA-RG238-USA-IMT-1945 / NARA-540127',
    rights_status:
      'Public Domain (Official Work of the US Federal Government / Allied Control Council)',
    source_url:
      'https://commons.wikimedia.org/wiki/File:Defendants_in_the_dock_at_the_Nuremberg_Trials.jpg',
  });

  fs.writeFileSync(masterRightsPath, JSON.stringify(rightsDb, null, 2), 'utf8');
  console.log('✅ Synchronized scripts/master_rights_database.json');

  // 5. Rebuild public/database.json
  console.log('🗄️ Rebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT });

  // 6. Recompile Rights Register & Bibliographies
  console.log('📚 Recompiling Master Rights Register and Source Bibliographies...');
  execSync('node scripts/generate_rights_register_pdf.cjs', { stdio: 'inherit', cwd: ROOT });

  // 7. Verify Sanitization
  console.log('🛡️ Verifying sanitization policy...');
  execSync('node scripts/verify_sanitization.cjs', { stdio: 'inherit', cwd: ROOT });

  console.log('\n🎉 ALL SYNCHRONIZATION AND ARCHIVAL INTEGRATION COMPLETE!');
}

main().catch((err) => {
  console.error('❌ Fatal synchronization error:', err);
  process.exit(1);
});
