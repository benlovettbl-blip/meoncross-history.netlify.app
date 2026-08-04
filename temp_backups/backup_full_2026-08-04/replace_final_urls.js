const fs = require('fs');

const dataPath = 'edexcel_medicine/data.js';
let dataCode = fs.readFileSync(dataPath, 'utf8');
let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
const lastBrace = dataObjStr.lastIndexOf('}');
const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

for (let lesson of dataObj.lessons) {
    if (lesson.id === 'lesson_2_1' && lesson.starters && lesson.starters[0]) {
        lesson.starters[0].source = "https://commons.wikimedia.org/wiki/Special:FilePath/De_Humani_Corporis_Fabrica_(1543)_-_Secunda_musculorum_tabula.jpg?width=500";
    }
    if (lesson.id === 'lesson_4_3' && lesson.starters) {
        if (lesson.starters[0]) lesson.starters[0].source = "https://commons.wikimedia.org/wiki/Special:FilePath/Alexander_Fleming_in_his_laboratory_at_St_Mary's_Hospital,_London._Wellcome_L0006041.jpg?width=500";
        if (lesson.starters[1]) lesson.starters[1].source = "https://commons.wikimedia.org/wiki/Special:FilePath/Penicillin_advertisement_-_Thanks_to_Penicillin_he_will_come_home_Wellcome_L0044569.jpg?width=500";
    }
    if (lesson.id === 'lesson_4_4' && lesson.starters && lesson.starters[1]) {
        lesson.starters[1].source = "https://commons.wikimedia.org/wiki/Special:FilePath/Health_warning_on_Canadian_cigarette_package.jpg?width=500";
    }
}

const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
fs.writeFileSync(dataPath, newDataCode, 'utf8');
console.log('Successfully hardcoded the remaining 4 Special:FilePath URLs.');
