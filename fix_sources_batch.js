const fs = require('fs');
const https = require('https');

const fixes = {
  'lesson_1_1': { 1: "File:Chart_for_diagnosis_by_examination_of_urine._Wellcome_L0005642.jpg" },
  'lesson_1_2': { 
     0: "File:Calendar,_January,_Two_bloodlettings,_inbetween_Aquarius%27%27_-_Psalter_of_Eleanor_of_Aquitaine_(ca._1185)_-_KB_76_F_13,_folium_002r.jpg", 
     1: "File:Hospital_ward_in_the_Hotel_Dieu,_Paris._Woodcut,_c._1500_Wellcome_L0006764.jpg" 
  },
  'lesson_1_3': {
    0: "File:Michael_Wolgemut_and_Wilhelm_Pleydenwurff._Dance_of_Death_from_the_Nuremberg_Chronicle.jpg",
    1: "File:Flagellants.jpg" 
  },
  'lesson_2_1': { 0: "File:Vesalius_-_De_Humani_Corporis_Fabrica_-_1543_-_Muscle_man_back.jpg" },
  'lesson_2_3': { 1: "File:Bill_of_Mortality.jpg" },
  'lesson_3_1': { 1: "File:Robert_Koch_in_his_laboratory.jpg" },
  'lesson_3_2': { 0: "File:Nightingale-mortality.jpg" },
  'lesson_3_3': { 0: "File:The_cow_pock.jpg", 1: "File:Snow-cholera-map-1.jpg" },
  'lesson_4_2': { 0: "File:Nhs_first_day.jpg", 1: "File:X-ray_therapy,_c.1910_-_National_Museum_of_American_History_-_DSC06227.JPG" },
  'lesson_4_3': { 0: "File:Penicillium_mold_on_agar_Wellcome_L0061205.jpg", 1: "File:Thanks_to_Penicillin_-_He_Will_Come_Home,_1944.jpg" },
  'lesson_4_4': { 0: "File:Camel_Cigarettes_Ad_-_More_Doctors_Smoke_Camels.jpg", 1: "File:Cigarette_warning_label_Canada.jpg" },
  'lesson_5_2': { 1: "File:British_soldiers_with_gas_masks,_First_World_War.jpg" },
  'lesson_5_3': { 0: "File:X-ray_of_shrapnel_in_the_arm_of_a_soldier,_WWI_Wellcome_L0014768.jpg" },
  'lesson_5_4': { 0: "File:Stretcher_bearers_in_the_mud,_Passchendaele,_August_1917.jpg", 1: "File:A_horse-drawn_ambulance_wagon_on_the_Western_Front._Q32228.jpg" },
  'lesson_5_5': { 0: "File:A_Thomas_splint_in_use_on_a_wounded_soldier,_France._Wellcome_L0014769.jpg", 1: "File:Walter_Yeo_before_and_after_surgery.jpg" }
};

const fileNamesToKeys = {};
for (let lessonId in fixes) {
    for (let index in fixes[lessonId]) {
        fileNamesToKeys[fixes[lessonId][index]] = { lessonId, index };
    }
}

const titlesQuery = Object.keys(fileNamesToKeys).map(decodeURIComponent).join('|');

const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(titlesQuery) + '&prop=pageimages&pithumbsize=500&format=json';

https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/4.0' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const results = {};
    if (json.query && json.query.pages) {
        Object.values(json.query.pages).forEach(page => {
            const originalTitle = page.title;
            let thumbUrl = null;
            if (page.thumbnail && page.thumbnail.source) {
                thumbUrl = page.thumbnail.source;
            } else {
                // If it exists but has no thumbnail (e.g. large images sometimes), fallback to its raw url if we really have to, 
                // but let's try to just construct the Special:FilePath as a fallback
                thumbUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(originalTitle.replace('File:', '')) + '?width=500';
            }
            results[originalTitle] = thumbUrl;
        });
    }

    // Now patch data.js
    const dataPath = 'edexcel_medicine/data.js';
    let dataCode = fs.readFileSync(dataPath, 'utf8');
    let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
    const lastBrace = dataObjStr.lastIndexOf('}');
    const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

    for (let lesson of dataObj.lessons) {
        if (fixes[lesson.id]) {
            for (let i of Object.keys(fixes[lesson.id])) {
                const queryTitle = fixes[lesson.id][i];
                // Wikipedia normalizes titles (e.g. underscores to spaces, URL decoding)
                const decodedQueryTitle = decodeURIComponent(queryTitle).replace(/_/g, ' ');
                const thumbUrl = results[decodedQueryTitle];
                if (thumbUrl) {
                    if (lesson.starters && lesson.starters[i]) {
                        lesson.starters[i].source = thumbUrl;
                        console.log(`Updated ${lesson.id} Source ${i} to ${thumbUrl}`);
                    }
                } else {
                    console.log(`Failed to find in results: ${decodedQueryTitle}`);
                }
            }
        }
    }

    const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
    fs.writeFileSync(dataPath, newDataCode, 'utf8');
    console.log('Successfully patched edexcel_medicine/data.js with exact authentic thumbnails via Batch API.');
  });
}).on('error', (e) => console.error(e));
