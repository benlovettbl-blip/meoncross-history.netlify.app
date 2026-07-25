const fs = require('fs');
const https = require('https');

async function getThumbnail(title) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=500&format=json`;
    https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/4.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            if (pages.length > 0 && pages[0].thumbnail && pages[0].thumbnail.source) {
              resolve(pages[0].thumbnail.source);
              return;
            } else {
              // Maybe it's missing or no thumb
              if (pages.length > 0 && pages[0].pageid) {
                // If the file exists but no thumb returned, return a placeholder or something
                resolve("EXISTS_BUT_NO_THUMB:" + title);
                return;
              }
            }
          }
        } catch(e) {}
        resolve(null);
      });
    }).on('error', () => resolve(null));
  });
}

const fixList = [
  "File:Chart_for_diagnosis_by_examination_of_urine._Wellcome_L0005642.jpg", // 1.1 S1
  "File:Hospital_ward_in_the_Hotel_Dieu,_Paris._Woodcut,_c._1500_Wellcome_L0006764.jpg", // 1.2 S1
  "File:Michael_Wolgemut_and_Wilhelm_Pleydenwurff._Dance_of_Death_from_the_Nuremberg_Chronicle.jpg", // 1.3 S0
  "File:Flagellants.jpg", // 1.3 S1
  "File:Vesalius_-_De_Humani_Corporis_Fabrica_-_1543_-_Muscle_man_back.jpg", // 2.1 S0
  "File:Bill_of_Mortality.jpg", // 2.3 S1
  "File:Robert_Koch_in_his_laboratory.jpg", // 3.1 S1
  "File:Nightingale-mortality.jpg", // 3.2 S0
  "File:The_cow_pock.jpg", // 3.3 S0
  "File:Snow-cholera-map-1.jpg", // 3.3 S1
  "File:Nhs_first_day.jpg", // 4.2 S0
  "File:X-ray_therapy,_c.1910_-_National_Museum_of_American_History_-_DSC06227.JPG", // 4.2 S1
  "File:Penicillium_mold_on_agar_Wellcome_L0061205.jpg", // 4.3 S0
  "File:Thanks_to_Penicillin_-_He_Will_Come_Home,_1944.jpg", // 4.3 S1
  "File:Camel_Cigarettes_Ad_-_More_Doctors_Smoke_Camels.jpg", // 4.4 S0
  "File:Cigarette_warning_label_Canada.jpg", // 4.4 S1
  "File:British_soldiers_with_gas_masks,_First_World_War.jpg", // 5.2 S1
  "File:X-ray_of_shrapnel_in_the_arm_of_a_soldier,_WWI_Wellcome_L0014768.jpg", // 5.3 S0
  "File:Stretcher_bearers_in_the_mud,_Passchendaele,_August_1917.jpg", // 5.4 S0
  "File:A_horse-drawn_ambulance_wagon_on_the_Western_Front._Q32228.jpg", // 5.4 S1
  "File:A_Thomas_splint_in_use_on_a_wounded_soldier,_France._Wellcome_L0014769.jpg", // 5.5 S0
  "File:Walter_Yeo_before_and_after_surgery.jpg" // 5.5 S1
];

async function main() {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let results = {};
  for (let title of fixList) {
    console.log(`Fetching ${title}...`);
    const url = await getThumbnail(title);
    results[title] = url;
    await delay(500);
  }
  console.log(JSON.stringify(results, null, 2));
}

main();
