const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Stokely Carmichael in lesson 2.3
  content = content.replace(
    /id:\s*'usa_lesson_2_3_e'[\s\S]*?image:\s*'\/units\/usa\/assets\/sources\/portraits\/stokely_carmichael\.jpg'[\s\S]*?image_url:\s*'\/units\/usa\/assets\/sources\/portraits\/stokely_carmichael\.jpg'/g,
    (match) => {
      return match
        .replace(
          /title:\s*['"]Source C: Stokely Carmichael Addressing the March Against Fear Crowd in Greenwood, Mississippi, Introducing 'Black Power' \(16 June 1966\)['"]/,
          "title: 'Source C: SNCC Chairman Stokely Carmichael Speaking in Mississippi During the March Against Fear (June 1966)'",
        )
        .replace(
          /\/units\/usa\/assets\/sources\/portraits\/stokely_carmichael\.jpg/g,
          '/units/usa/assets/sources/stokely_carmichael_mississippi_1966.jpg',
        );
    },
  );

  // 2. Thich Quang Duc in lesson 3.1
  content = content.replace(
    /id:\s*'usa_lesson_3_1_b'[\s\S]*?image:\s*'\/units\/usa\/assets\/sources\/portraits\/thich_quang_duc\.jpg'[\s\S]*?image_url:\s*'\/units\/usa\/assets\/sources\/portraits\/thich_quang_duc\.jpg'/g,
    (match) => {
      return match.replace(
        /\/units\/usa\/assets\/sources\/portraits\/thich_quang_duc\.jpg/g,
        '/units/usa/assets/sources/thich_quang_duc_self_immolation_1963.jpg',
      );
    },
  );

  // 3. Hugh Thompson in lesson 4.1 (Source A)
  content = content.replace(
    /id:\s*'usa_lesson_4_1_d'[\s\S]*?image:\s*'\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg'[\s\S]*?image_url:\s*'\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg'/g,
    (match) => {
      return match
        .replace(
          /title:\s*['"]Source A: Eyewitness Testimony of Helicopter Pilot Major Hugh Thompson Jr\. on Intervening to Halt the My Lai Killings \(16 March 1968\)['"]/,
          "title: 'Source A: Helicopter Pilot Warrant Officer Hugh Thompson Jr., Who Intervened to Halt the My Lai Killings (March 1968)'",
        )
        .replace(
          /\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg/g,
          '/units/usa/assets/sources/hugh_thompson_jr_1968.jpg',
        );
    },
  );

  // 4. Ronald Haeberle / Ridenhour in lesson 4.1 (Source B)
  content = content.replace(
    /id:\s*'usa_lesson_4_1_c'[\s\S]*?image:\s*'\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg'[\s\S]*?image_url:\s*'\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg'/g,
    (match) => {
      return match
        .replace(
          /title:\s*['"]Source B: Former Soldier Ron Ridenhour's Letter to Congress and the Pentagon Exposing the My Lai Massacre \(29 March 1969\)['"]/,
          "title: 'Source B: US Army Combat Photographer Ronald L. Haeberle\\'s Photograph of Soldiers Burning Dwellings in My Lai (16 March 1968)'",
        )
        .replace(
          /\/units\/usa\/assets\/sources\/portraits\/william_calley\.jpg/g,
          '/units/usa/assets/sources/my_lai_soldier_hut_fire_1968.jpg',
        );
    },
  );

  // 5. Hard Hat Riots in lesson 4.2 (Source C)
  content = content.replace(
    /id:\s*'usa_lesson_4_2_e'[\s\S]*?image:\s*'\/units\/usa\/assets\/sources\/portraits\/nixon\.jpg'[\s\S]*?image_url:\s*'\/units\/usa\/assets\/sources\/portraits\/nixon\.jpg'/g,
    (match) => {
      return match
        .replace(
          /title:\s*['"]Source C: From an Editorial in the New York Daily News Defending Patriotic Blue-Collar Demonstration \(11 May 1970\)['"]/,
          "title: 'Source C: Construction Union Hard Hats on the White House Cabinet Table Following the Hard Hat Riots (26 May 1970)'",
        )
        .replace(
          /\/units\/usa\/assets\/sources\/portraits\/nixon\.jpg/g,
          '/units/usa/assets/sources/hard_hat_riot_cabinet_table_1970.jpg',
        );
    },
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated:', filePath);
}

updateFile('units/usa/data.js');
updateFile('public/units/usa/data.js');
