const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const models = {
    'lesson_5_1': {
        detail: "We are living in a frozen swamp, or rather a sea of thick, sucking mud.",
        question: "How deep was the mud typically in the front line trenches during the winter months at Ypres?",
        source: "Official British Army trench maps and engineering reports from the Ypres Salient in 1917.",
        reason: "These reports would contain precise measurements of water levels, drainage issues, and the depth of the mud, helping me understand exactly how flooded the trench system was."
    },
    'lesson_5_2': {
        detail: "his feet are swollen to twice their size, completely numb and turning black at the toes.",
        question: "How many soldiers had to be evacuated from the front line due to Trench Foot during the winter of 1916?",
        source: "The official medical admission registers of a Casualty Clearing Station near the Somme.",
        reason: "The admission registers would record exactly how many men were admitted for Trench Foot, allowing me to see how widespread the condition was during that winter."
    },
    'lesson_5_3': {
        detail: "the jagged metal fragments had driven muddy pieces of his woollen trousers deep into the muscle.",
        question: "How frequently did shrapnel wounds become infected with gas gangrene compared to standard bullet wounds?",
        source: "Medical diaries or official reports written by surgeons serving in the RAMC on the Western Front.",
        reason: "The surgeons' reports would contain detailed statistics and observations on the types of infections that developed in shrapnel wounds versus bullet wounds."
    },
    'lesson_5_4': {
        detail: "The mud was so thick that the horse-drawn ambulances were completely bogged down.",
        question: "How long did it typically take for a wounded soldier to be transported from the Regimental Aid Post to a Casualty Clearing Station?",
        source: "The official war diary of an RAMC Field Ambulance unit operating at the Battle of Passchendaele.",
        reason: "The war diary would log the exact times of stretcher bearers departing and returning, providing accurate data on the length of transport times in the muddy conditions."
    },
    'lesson_5_5': {
        detail: "we immediately flushed the wound with a continuous flow of the Carrel-Dakin antiseptic solution.",
        question: "How effective was the Carrel-Dakin method at preventing amputations caused by gas gangrene?",
        source: "Hospital survival statistics and amputation records from a Base Hospital on the French coast in 1917.",
        reason: "These hospital records would show exactly what percentage of patients treated with the solution recovered versus how many required amputations, proving its effectiveness."
    }
};

unitData.lessons.forEach(l => {
    if (models[l.id] && l.gcse_task && l.gcse_task.follow_up) {
        l.gcse_task.follow_up.model_detail = models[l.id].detail;
        l.gcse_task.follow_up.model_question = models[l.id].question;
        l.gcse_task.follow_up.model_source = models[l.id].source;
        l.gcse_task.follow_up.model_reason = models[l.id].reason;
    }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("Injected 4-mark models.");
