const fs = require('fs');

const fixes = {
  'lesson_1_1': {
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Chart_for_diagnosis_by_examination_of_urine._Wellcome_L0005642.jpg/500px-Chart_for_diagnosis_by_examination_of_urine._Wellcome_L0005642.jpg'
  },
  'lesson_1_2': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Calendar%2C_January%2C_Two_bloodlettings%2C_inbetween_Aquarius%27%27_-_Psalter_of_Eleanor_of_Aquitaine_%28ca._1185%29_-_KB_76_F_13%2C_folium_002r.jpg/500px-Calendar%2C_January%2C_Two_bloodlettings%2C_inbetween_Aquarius%27%27_-_Psalter_of_Eleanor_of_Aquitaine_%28ca._1185%29_-_KB_76_F_13%2C_folium_002r.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Hospital_ward_in_the_Hotel_Dieu%2C_Paris._Woodcut%2C_c._1500_Wellcome_L0006764.jpg/500px-Hospital_ward_in_the_Hotel_Dieu%2C_Paris._Woodcut%2C_c._1500_Wellcome_L0006764.jpg'
  },
  'lesson_1_3': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Michael_Wolgemut_and_Wilhelm_Pleydenwurff._Dance_of_Death_from_the_Nuremberg_Chronicle.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flagellants.jpg/500px-Flagellants.jpg'
  },
  'lesson_2_1': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Vesalius_-_De_Humani_Corporis_Fabrica_-_1543_-_Muscle_man_back.jpg/500px-Vesalius_-_De_Humani_Corporis_Fabrica_-_1543_-_Muscle_man_back.jpg'
  },
  'lesson_2_3': {
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bill_of_Mortality.jpg/500px-Bill_of_Mortality.jpg'
  },
  'lesson_3_1': {
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Robert_Koch_in_his_laboratory.jpg/500px-Robert_Koch_in_his_laboratory.jpg'
  },
  'lesson_3_2': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Nightingale-mortality.jpg/500px-Nightingale-mortality.jpg'
  },
  'lesson_3_3': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/The_cow_pock.jpg/500px-The_cow_pock.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Snow-cholera-map-1.jpg/500px-Snow-cholera-map-1.jpg'
  },
  'lesson_4_2': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nhs_first_day.jpg/500px-Nhs_first_day.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/X-ray_therapy%2C_c.1910_-_National_Museum_of_American_History_-_DSC06227.JPG/500px-X-ray_therapy%2C_c.1910_-_National_Museum_of_American_History_-_DSC06227.JPG'
  },
  'lesson_4_3': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Penicillium_mold_on_agar_Wellcome_L0061205.jpg/500px-Penicillium_mold_on_agar_Wellcome_L0061205.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Thanks_to_Penicillin_-_He_Will_Come_Home%2C_1944.jpg/500px-Thanks_to_Penicillin_-_He_Will_Come_Home%2C_1944.jpg'
  },
  'lesson_4_4': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Camel_Cigarettes_Ad_-_More_Doctors_Smoke_Camels.jpg/500px-Camel_Cigarettes_Ad_-_More_Doctors_Smoke_Camels.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cigarette_warning_label_Canada.jpg/500px-Cigarette_warning_label_Canada.jpg'
  },
  'lesson_5_2': {
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/British_soldiers_with_gas_masks%2C_First_World_War.jpg/500px-British_soldiers_with_gas_masks%2C_First_World_War.jpg'
  },
  'lesson_5_3': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/X-ray_of_shrapnel_in_the_arm_of_a_soldier%2C_WWI_Wellcome_L0014768.jpg/500px-X-ray_of_shrapnel_in_the_arm_of_a_soldier%2C_WWI_Wellcome_L0014768.jpg'
  },
  'lesson_5_4': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stretcher_bearers_in_the_mud%2C_Passchendaele%2C_August_1917.jpg/500px-Stretcher_bearers_in_the_mud%2C_Passchendaele%2C_August_1917.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/A_horse-drawn_ambulance_wagon_on_the_Western_Front._Q32228.jpg/500px-A_horse-drawn_ambulance_wagon_on_the_Western_Front._Q32228.jpg'
  },
  'lesson_5_5': {
    0: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/A_Thomas_splint_in_use_on_a_wounded_soldier%2C_France._Wellcome_L0014769.jpg/500px-A_Thomas_splint_in_use_on_a_wounded_soldier%2C_France._Wellcome_L0014769.jpg',
    1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Walter_Yeo_before_and_after_surgery.jpg/500px-Walter_Yeo_before_and_after_surgery.jpg'
  }
};

const dataPath = 'edexcel_medicine/data.js';
let dataCode = fs.readFileSync(dataPath, 'utf8');
let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
const lastBrace = dataObjStr.lastIndexOf('}');
const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

for (let lesson of dataObj.lessons) {
  if (fixes[lesson.id]) {
    for (let i of Object.keys(fixes[lesson.id])) {
      if (lesson.starters && lesson.starters[i]) {
        lesson.starters[i].source = fixes[lesson.id][i];
      }
    }
  }
}

const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
fs.writeFileSync(dataPath, newDataCode, 'utf8');
console.log('Successfully patched edexcel_medicine/data.js with exact authentic thumbnails.');
