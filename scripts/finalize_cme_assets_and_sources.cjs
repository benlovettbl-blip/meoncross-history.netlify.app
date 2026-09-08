const fs = require('fs');
const path = require('path');

async function finalizeCme() {
  console.log('🚀 Finalizing CME assets, source lettering, and removing Source Detective...');

  const dataJsPath = path.resolve(__dirname, '../units/cme_new/data.js');
  const publicDataJsPath = path.resolve(__dirname, '../public/units/cme_new/data.js');
  const dataJsonPath = path.resolve(__dirname, '../data/cme_new.json');
  const publicDataJsonPath = path.resolve(__dirname, '../public/data/cme_new.json');

  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.unitData || module.default;

  // Correct image paths mapped directly to verified physical files in public/
  const imageMap = {
    // Lesson 1
    L1_primary: '/images/cme_sykes_picot_1916_map.jpg',
    L1_B0: '/images/cme_sykes_picot_1916_map.jpg',
    L1_B1: '/images/cme_balfour_declaration_1917.jpg',

    // Lesson 2
    L2_primary: '/units/cme_new/assets/king_david_ruins.png',
    L2_B0: '/units/cme_new/assets/king_david_ruins.png',
    L2_B4: '/images/cme_sergeants_affair_1947.jpg',
    L2_B5: '/units/cme_new/assets/cme_exodus.jpeg',
    L2_B6: '/units/cme_new/assets/cme_un_palestine_partition_versions_1947.jpg',
    L2_B9: '/images/cme_bengurion_declaration_1948.jpg',

    // Lesson 3
    L3_primary: '/units/cme_new/assets/cme_tel_aviv_yafo__997008136796005171_.jpg',
    L3_B0: '/units/cme_new/assets/cme_tel_aviv_yafo__997008136796005171_.jpg',
    L3_B2: '/images/cme_palestinian_refugees_1948.jpg',
    L3_B4: '/units/cme_new/assets/palestine_1949_map.png',
    L3_B8: '/units/cme_new/assets/palestine_1949_map.png',

    // Lesson 4
    L4_primary: '/images/cme_nasser_1956.jpg',
    L4_B0: '/images/cme_nasser_1956.jpg',
    L4_B6: '/images/cme_alahram_suez_1956.jpg',
    L4_B9: '/images/cme_suez_1956_campaign_map.jpg',
    L4_B10: '/images/cme_port_said_british_troops_1956.jpg',
    L4_B12:
      '/units/cme_new/assets/cme_georges_bidault__anthony_eden_and_john_foster_dulles__cropped_.jpg',

    // Lesson 5
    L5_primary: '/units/cme_new/assets/palestine_1967_six_day_war_map.png',
    L5_B0: '/units/cme_new/assets/palestine_1967_six_day_war_map.png',
    L5_B6: '/images/israeli_troops_wall.jpg',
    L5_B14: '/images/operation_focus_mirage_formation.jpg',

    // Lesson 6
    L6_B0: '/images/cme_munich_1972_balcony.jpg',
    L6_B8: '/images/cme_arafat_un_1974.png',
    L6_B11: '/images/cme_jordan_fedayeen_1970_map.png',
    L6_B15: '/images/cme_munich_1972_balcony.jpg',

    // Lesson 7
    L7_primary: '/units/cme_new/assets/yom_kippur_crossing.png',
    L7_B0: '/units/cme_new/assets/yom_kippur_crossing.png',
    L7_B7: '/images/cme_egyptians_crossing_suez_1973.jpg',
    L7_B11: '/images/cme_yom_kippur_1973_map.png',
    L7_B14: '/images/golda_meir.jpg',

    // Lesson 8
    L8_primary: '/units/cme_new/assets/anwar_sadat.jpg',
    L8_B0: '/units/cme_new/assets/anwar_sadat.jpg',
    L8_B5: '/units/cme_new/assets/camp_david_accords.png',
    L8_B9: '/images/cme_sinai_peninsula_map.jpg',
    L8_B10: '/images/cme_treaty_triple_handshake_1979.jpg',

    // Lesson 9
    L9_primary: '/units/cme_new/assets/ariel_sharon.webp',
    L9_B0: '/units/cme_new/assets/ariel_sharon.webp',
    L9_B6: '/images/cme_lebanon_1982_campaign_map.png',
    L9_B8: '/units/cme_new/assets/arafat_1999.jpg',
    L9_B15: '/units/cme_new/assets/first_intifada.png',

    // Lesson 10
    L10_primary: '/images/oslo_handshake.jpg',
    L10_B0: '/images/oslo_handshake.jpg',
    L10_B7: '/images/king_hussein.jpg',
    L10_B12: '/images/cme_oslo_areas_map.png',
    L10_B13: '/units/cme_new/assets/rabinovich_cover.png',
  };

  // 1. LESSON 1
  const l1 = unitData.lessons[0];
  l1.primary_source.src = imageMap.L1_primary;
  if (l1.narrative_blocks[0]) l1.narrative_blocks[0].image = imageMap.L1_B0;
  if (l1.narrative_blocks[1] && l1.narrative_blocks[1].source) {
    l1.narrative_blocks[1].source.src = imageMap.L1_B1;
  }

  // 2. LESSON 2
  const l2 = unitData.lessons[1];
  l2.primary_source.src = imageMap.L2_primary;
  if (l2.narrative_blocks[0]) l2.narrative_blocks[0].image = imageMap.L2_B0;
  if (l2.narrative_blocks[4] && l2.narrative_blocks[4].source) {
    l2.narrative_blocks[4].source.src = imageMap.L2_B4;
  }
  if (l2.narrative_blocks[5] && l2.narrative_blocks[5].source) {
    l2.narrative_blocks[5].source.src = imageMap.L2_B5;
  }
  if (l2.narrative_blocks[6]) l2.narrative_blocks[6].image = imageMap.L2_B6;
  if (l2.narrative_blocks[9] && l2.narrative_blocks[9].source) {
    l2.narrative_blocks[9].source.src = imageMap.L2_B9;
  }

  // 3. LESSON 3
  const l3 = unitData.lessons[2];
  l3.primary_source.src = imageMap.L3_primary;
  if (l3.narrative_blocks[0]) l3.narrative_blocks[0].image = imageMap.L3_B0;
  if (l3.narrative_blocks[2] && l3.narrative_blocks[2].source) {
    l3.narrative_blocks[2].source.src = imageMap.L3_B2;
  }
  if (l3.narrative_blocks[4] && l3.narrative_blocks[4].source) {
    l3.narrative_blocks[4].source.src = imageMap.L3_B4;
  }
  if (l3.narrative_blocks[8] && l3.narrative_blocks[8].source) {
    l3.narrative_blocks[8].source.src = imageMap.L3_B8;
  }

  // 4. LESSON 4
  const l4 = unitData.lessons[3];
  l4.primary_source.src = imageMap.L4_primary;
  if (l4.narrative_blocks[0]) l4.narrative_blocks[0].image = imageMap.L4_B0;
  if (l4.narrative_blocks[6] && l4.narrative_blocks[6].source) {
    l4.narrative_blocks[6].source.src = imageMap.L4_B6;
  }
  if (l4.narrative_blocks[9] && l4.narrative_blocks[9].source) {
    l4.narrative_blocks[9].source.src = imageMap.L4_B9;
  }
  if (l4.narrative_blocks[10] && l4.narrative_blocks[10].source) {
    l4.narrative_blocks[10].source.src = imageMap.L4_B10;
  }
  if (l4.narrative_blocks[12] && l4.narrative_blocks[12].source) {
    l4.narrative_blocks[12].source.src = imageMap.L4_B12;
  }

  // 5. LESSON 5
  const l5 = unitData.lessons[4];
  l5.primary_source.src = imageMap.L5_primary;
  if (l5.narrative_blocks[0]) l5.narrative_blocks[0].image = imageMap.L5_B0;
  if (l5.narrative_blocks[6] && l5.narrative_blocks[6].source) {
    l5.narrative_blocks[6].source.src = imageMap.L5_B6;
  }
  if (l5.narrative_blocks[14] && l5.narrative_blocks[14].source) {
    l5.narrative_blocks[14].source.src = imageMap.L5_B14;
  }

  // 6. LESSON 6
  const l6 = unitData.lessons[5];
  if (l6.narrative_blocks[0]) l6.narrative_blocks[0].image = imageMap.L6_B0;
  if (l6.narrative_blocks[8] && l6.narrative_blocks[8].source) {
    l6.narrative_blocks[8].source.src = imageMap.L6_B8;
  }
  if (l6.narrative_blocks[11] && l6.narrative_blocks[11].source) {
    l6.narrative_blocks[11].source.src = imageMap.L6_B11;
  }
  if (l6.narrative_blocks[15] && l6.narrative_blocks[15].source) {
    l6.narrative_blocks[15].source.src = imageMap.L6_B15;
  }

  // 7. LESSON 7
  const l7 = unitData.lessons[6];
  l7.primary_source.src = imageMap.L7_primary;
  if (l7.narrative_blocks[0]) l7.narrative_blocks[0].image = imageMap.L7_B0;
  if (l7.narrative_blocks[7] && l7.narrative_blocks[7].source) {
    l7.narrative_blocks[7].source.src = imageMap.L7_B7;
  }
  if (l7.narrative_blocks[11] && l7.narrative_blocks[11].source) {
    l7.narrative_blocks[11].source.src = imageMap.L7_B11;
  }
  if (l7.narrative_blocks[14] && l7.narrative_blocks[14].source) {
    l7.narrative_blocks[14].source.src = imageMap.L7_B14;
  }

  // 8. LESSON 8
  const l8 = unitData.lessons[7];
  l8.primary_source.src = imageMap.L8_primary;
  if (l8.narrative_blocks[0]) l8.narrative_blocks[0].image = imageMap.L8_B0;
  if (l8.narrative_blocks[5] && l8.narrative_blocks[5].source) {
    l8.narrative_blocks[5].source.src = imageMap.L8_B5;
  }
  if (l8.narrative_blocks[9] && l8.narrative_blocks[9].source) {
    l8.narrative_blocks[9].source.src = imageMap.L8_B9;
  }
  if (l8.narrative_blocks[10] && l8.narrative_blocks[10].source) {
    l8.narrative_blocks[10].source.src = imageMap.L8_B10;
  }

  // 9. LESSON 9
  const l9 = unitData.lessons[8];
  l9.primary_source.src = imageMap.L9_primary;
  if (l9.narrative_blocks[0]) l9.narrative_blocks[0].image = imageMap.L9_B0;
  if (l9.narrative_blocks[6] && l9.narrative_blocks[6].source) {
    l9.narrative_blocks[6].source.src = imageMap.L9_B6;
  }
  if (l9.narrative_blocks[8] && l9.narrative_blocks[8].source) {
    l9.narrative_blocks[8].source.src = imageMap.L9_B8;
  }
  if (l9.narrative_blocks[15] && l9.narrative_blocks[15].source) {
    l9.narrative_blocks[15].source.src = imageMap.L9_B15;
  }

  // 10. LESSON 10
  const l10 = unitData.lessons[9];
  l10.primary_source.src = imageMap.L10_primary;
  if (l10.narrative_blocks[0]) l10.narrative_blocks[0].image = imageMap.L10_B0;
  if (l10.narrative_blocks[7] && l10.narrative_blocks[7].source) {
    l10.narrative_blocks[7].source.src = imageMap.L10_B7;
  }
  if (l10.narrative_blocks[12] && l10.narrative_blocks[12].source) {
    l10.narrative_blocks[12].source.src = imageMap.L10_B12;
  }
  if (l10.narrative_blocks[13] && l10.narrative_blocks[13].source) {
    l10.narrative_blocks[13].source.src = imageMap.L10_B13;
  }

  // Strip any lingering Source Detective in any field (deep sweep)
  function deepClean(obj) {
    if (!obj) return;
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        if (obj[key].includes('Source Detective')) {
          obj[key] = obj[key].replace(/Source\s*Detective[:.]?\s*/gi, '').trim();
        }
      } else if (typeof obj[key] === 'object') {
        deepClean(obj[key]);
      }
    }
  }
  deepClean(unitData);

  // Write all mirrors
  const code =
    'export const unitData = ' +
    JSON.stringify(unitData, null, 2) +
    ';\nexport default unitData;\n';
  fs.writeFileSync(dataJsPath, code, 'utf8');
  fs.writeFileSync(publicDataJsPath, code, 'utf8');
  console.log('✅ Updated units/cme_new/data.js and public/units/cme_new/data.js');

  const jsonCode = JSON.stringify(unitData, null, 2);
  fs.writeFileSync(dataJsonPath, jsonCode, 'utf8');
  fs.writeFileSync(publicDataJsonPath, jsonCode, 'utf8');
  console.log('✅ Updated data/cme_new.json and public/data/cme_new.json');
}

finalizeCme().catch((err) => {
  console.error('Fatal error in finalizeCme:', err);
  process.exit(1);
});
