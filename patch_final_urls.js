const fs = require('fs');

const dataPath = 'edexcel_medicine/data.js';
let dataCode = fs.readFileSync(dataPath, 'utf8');
let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
const lastBrace = dataObjStr.lastIndexOf('}');
const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

for (let lesson of dataObj.lessons) {
    if (lesson.id === 'lesson_2_1' && lesson.starters && lesson.starters[0]) {
        lesson.starters[0].source = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Tertia_musculorum_tabula_%2837053621276%29.jpg/500px-Tertia_musculorum_tabula_%2837053621276%29.jpg";
    }
    if (lesson.id === 'lesson_3_1' && lesson.starters && lesson.starters[0]) {
        lesson.starters[0].source = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Swan-necked_flask_used_by_Pasteur._Wellcome_M0012521.jpg/500px-Swan-necked_flask_used_by_Pasteur._Wellcome_M0012521.jpg";
        lesson.starters[0].caption = "A photograph of an original swan-necked flask used by Louis Pasteur in his experiments to disprove spontaneous generation.";
    }
    if (lesson.id === 'lesson_4_3' && lesson.starters) {
        if (lesson.starters[0]) {
            lesson.starters[0].source = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Professor_Alexander_Fleming_at_work_in_his_laboratory_at_St_Mary%27s_Hospital%2C_London%2C_during_the_Second_World_War._D17801.jpg/500px-Professor_Alexander_Fleming_at_work_in_his_laboratory_at_St_Mary%27s_Hospital%2C_London%2C_during_the_Second_World_War._D17801.jpg";
            lesson.starters[0].caption = "Professor Alexander Fleming at work in his laboratory at St Mary's Hospital, London.";
        }
        if (lesson.starters[1]) {
            lesson.starters[1].source = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/PENICILLIN..._SAVES_SOLDIERS_LIVES%5E_EVERY_MINUTE_SAVED_IN_BUILDING_THIS_PLANT_MEANS_A_LIFE_SAVED_ON_THE_FIGHTING..._-_NARA_-_515170.jpg/500px-PENICILLIN..._SAVES_SOLDIERS_LIVES%5E_EVERY_MINUTE_SAVED_IN_BUILDING_THIS_PLANT_MEANS_A_LIFE_SAVED_ON_THE_FIGHTING..._-_NARA_-_515170.jpg";
            lesson.starters[1].caption = "A World War II propaganda poster urging the mass production of Penicillin.";
        }
    }
    if (lesson.id === 'lesson_4_4' && lesson.starters && lesson.starters[1]) {
        lesson.starters[1].source = "https://upload.wikimedia.org/wikipedia/commons/4/49/Cigarette_packet_warning_signs.jpg";
        lesson.starters[1].caption = "A graphic anti-smoking warning label on a cigarette pack.";
    }
}

const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
fs.writeFileSync(dataPath, newDataCode, 'utf8');
console.log('Successfully patched the 5 URLs.');
