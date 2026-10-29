const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Stokely Carmichael: replace all occurrences of the portrait in lesson 2.3
  content = content.replace(
    /\/units\/usa\/assets\/sources\/portraits\/stokely_carmichael\.jpg/g,
    '/units/usa/assets/sources/stokely_carmichael_mississippi_1966.jpg',
  );

  // Thich Quang Duc: replace all occurrences of the portrait in lesson 3.1
  content = content.replace(
    /\/units\/usa\/assets\/sources\/portraits\/thich_quang_duc\.jpg/g,
    '/units/usa/assets/sources/thich_quang_duc_self_immolation_1963.jpg',
  );

  // In lesson 4.1:
  // For usa_lesson_4_1_d (Source A): replace calley portrait with hugh_thompson_jr_1968.jpg
  // For usa_lesson_4_1_c (Source B): replace calley portrait with my_lai_soldier_hut_fire_1968.jpg
  // In lesson 4.2:
  // For usa_lesson_4_2_e (Source C): replace nixon portrait with hard_hat_riot_cabinet_table_1970.jpg

  // We can do this cleanly by splitting into source object blocks or using regex on the IDs
  ['usa_lesson_4_1_d', 'usa_lesson_4_1_c', 'usa_lesson_4_2_e'].forEach((id) => {
    let searchFrom = 0;
    while (true) {
      const idx = content.indexOf(`id: '${id}'`, searchFrom);
      if (idx === -1) break;
      // find the end of this source object: next 'id: ' or '},\n        {' or '},\n      ],'
      let endIdx = content.indexOf("id: '", idx + 10);
      if (endIdx === -1 || endIdx - idx > 3000) {
        endIdx = content.indexOf('},\n      ]', idx);
      }
      if (endIdx === -1) endIdx = idx + 2500;

      let sub = content.slice(idx, endIdx);
      if (id === 'usa_lesson_4_1_d') {
        sub = sub.replace(
          /\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg/g,
          '/units/usa/assets/sources/hugh_thompson_jr_1968.jpg',
        );
      } else if (id === 'usa_lesson_4_1_c') {
        sub = sub.replace(
          /\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg/g,
          '/units/usa/assets/sources/my_lai_soldier_hut_fire_1968.jpg',
        );
      } else if (id === 'usa_lesson_4_2_e') {
        sub = sub.replace(
          /\/units\/usa\/assets\/sources\/portraits\/nixon\.jpg/g,
          '/units/usa/assets/sources/hard_hat_riot_cabinet_table_1970.jpg',
        );
      }

      content = content.slice(0, idx) + sub + content.slice(endIdx);
      searchFrom = idx + sub.length;
    }
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed all source references in:', filePath);
}

fixFile('units/usa/data.js');
fixFile('public/units/usa/data.js');
