const fs = require('fs');
const https = require('https');

const filesToDownload = [
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Tertia_musculorum_tabula_%2837053621276%29.jpg/500px-Tertia_musculorum_tabula_%2837053621276%29.jpg',
        filename: 'vesalius_muscle_men.jpg'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Professor_Alexander_Fleming_at_work_in_his_laboratory_at_St_Mary%27s_Hospital%2C_London%2C_during_the_Second_World_War._D17801.jpg/500px-Professor_Alexander_Fleming_at_work_in_his_laboratory_at_St_Mary%27s_Hospital%2C_London%2C_during_the_Second_World_War._D17801.jpg',
        filename: 'fleming_petri_dish.jpg'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/PENICILLIN..._SAVES_SOLDIERS_LIVES%5E_EVERY_MINUTE_SAVED_IN_BUILDING_THIS_PLANT_MEANS_A_LIFE_SAVED_ON_THE_FIGHTING..._-_NARA_-_515170.jpg/500px-PENICILLIN..._SAVES_SOLDIERS_LIVES%5E_EVERY_MINUTE_SAVED_IN_BUILDING_THIS_PLANT_MEANS_A_LIFE_SAVED_ON_THE_FIGHTING..._-_NARA_-_515170.jpg',
        filename: 'penicillin_propaganda.jpg'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Smoking_kills_%2827821266902%29.jpg/500px-Smoking_kills_%2827821266902%29.jpg',
        filename: 'cigarette_warning.jpg'
    }
];

async function download() {
    for (const file of filesToDownload) {
        await new Promise((resolve) => {
            const fileStream = fs.createWriteStream(`public/images/${file.filename}`);
            https.get(file.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Downloaded ${file.filename}`);
                    resolve();
                });
            });
        });
    }

    // Now update data.js
    const dataPath = 'edexcel_medicine/data.js';
    let dataCode = fs.readFileSync(dataPath, 'utf8');
    let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
    const lastBrace = dataObjStr.lastIndexOf('}');
    const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

    for (let lesson of dataObj.lessons) {
        if (lesson.id === 'lesson_2_1' && lesson.starters && lesson.starters[0]) {
            lesson.starters[0].source = "/images/vesalius_muscle_men.jpg";
        }
        if (lesson.id === 'lesson_4_3' && lesson.starters) {
            if (lesson.starters[0]) lesson.starters[0].source = "/images/fleming_petri_dish.jpg";
            if (lesson.starters[1]) lesson.starters[1].source = "/images/penicillin_propaganda.jpg";
        }
        if (lesson.id === 'lesson_4_4' && lesson.starters && lesson.starters[1]) {
            lesson.starters[1].source = "/images/cigarette_warning.jpg";
            lesson.starters[1].caption = "A modern English anti-smoking warning label on a cigarette pack.";
        }
    }

    const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
    fs.writeFileSync(dataPath, newDataCode, 'utf8');
    console.log('Successfully updated data.js to use local images.');
}

download();
