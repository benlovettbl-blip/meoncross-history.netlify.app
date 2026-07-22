const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

const hingeUpdates = {
    // lesson_2_3
    "What was the main reason why Harvey's discovery of blood circulation did not immediately change medical treatments?": {
        text: "What was the main reason why Harvey's discovery of blood circulation did not immediately change medical treatments?",
        options: [
            "Because blood transfusions and complex internal surgery were not yet possible without anesthetics or antiseptics.",
            "Because the Church banned doctors from reading his book 'On the Motion of the Heart'.",
            "Because he was unable to prove his theory through dissection and experiment.",
            "Because the printing press had not been invented yet, so his ideas could not spread."
        ],
        correct_index: 0,
        explanation: "While Harvey proved blood circulated, seventeenth-century doctors could not utilize this knowledge for transfusions or surgery because they lacked blood typing, anesthetics, and infection control."
    },
    "What was a major difference in how the government responded to the Great Plague of 1665 compared to the Black Death of 1348?": {
        text: "What was a major difference in how the government responded to the Great Plague of 1665 compared to the Black Death of 1348?",
        options: [
            "In 1665, the government successfully killed all the rats that spread the plague.",
            "In 1665, local mayors and the King enforced organized quarantines, locked infected houses, and banned public meetings.",
            "In 1665, the government built national sewer systems to wash away the miasma.",
            "In 1665, the King ordered everyone to receive a vaccination against the plague."
        ],
        correct_index: 1,
        explanation: "The response in 1665 was far more organized, with local governments employing searchers, enforcing 28-day quarantines in locked houses, and regulating public gatherings."
    },
    // lesson_3_2
    "How did Florence Nightingale's 'Notes on Nursing' (1859) help to improve the survival rates of patients in British hospitals?": {
        text: "How did Florence Nightingale's 'Notes on Nursing' (1859) help to improve the survival rates of patients in British hospitals?",
        options: [
            "It taught nurses how to use carbolic acid to kill bacteria before surgery.",
            "It emphasized strict cleanliness, scrubbing wards, and ensuring fresh air to prevent miasma.",
            "It trained nurses to safely administer chloroform to patients during operations.",
            "It proved that bacteria caused disease, leading to aseptic hospital environments."
        ],
        correct_index: 1,
        explanation: "Nightingale believed in miasma, so her focus was on extreme hygiene, ventilation, and cleanliness, which dramatically reduced death rates from infections in hospitals."
    },
    "Why did Joseph Lister's use of carbolic acid spray represent a direct practical application of Louis Pasteur's Germ Theory?": {
        text: "Why did Joseph Lister's use of carbolic acid spray represent a direct practical application of Louis Pasteur's Germ Theory?",
        options: [
            "Because Lister used the acid to kill the microbes in the air that Pasteur proved were causing decay and infection.",
            "Because Pasteur explicitly invented carbolic acid and sent it to Lister to use in surgery.",
            "Because Lister proved that spontaneous generation created the germs inside surgical wounds.",
            "Because the carbolic acid acted as an anesthetic, putting the patient to sleep as Pasteur recommended."
        ],
        correct_index: 0,
        explanation: "Lister read Pasteur's work and realized that if microbes in the air caused decay, they also caused wound sepsis. He used carbolic acid specifically to kill these airborne microbes."
    },
    "What made the 1875 Public Health Act more effective at preventing disease than the 1848 Public Health Act?": {
        text: "What made the 1875 Public Health Act more effective at preventing disease than the 1848 Public Health Act?",
        options: [
            "The 1875 Act finally provided free medical treatment for all working-class citizens.",
            "The 1875 Act was compulsory, forcing all local town councils to build sewers and provide clean water.",
            "The 1875 Act made Edward Jenner's smallpox vaccination mandatory for all children.",
            "The 1875 Act ordered the creation of the Ministry of Health to oversee all hospitals."
        ],
        correct_index: 1,
        explanation: "Unlike the 1848 Act which was purely optional ('permissive'), the 1875 Act was compulsory, legally forcing all towns to take responsibility for public sanitation."
    },
    // lesson_3_3
    "Why was Edward Jenner unable to use his vaccination method to prevent other infectious diseases like cholera or typhoid?": {
        text: "Why was Edward Jenner unable to use his vaccination method to prevent other infectious diseases like cholera or typhoid?",
        options: [
            "Because the government refused to fund any further research after his smallpox discovery.",
            "Because he did not know that bacteria caused disease, so he couldn't isolate the germs for other illnesses.",
            "Because the Church banned him from experimenting on any more patients.",
            "Because he died shortly after publishing his findings on smallpox in 1798."
        ],
        correct_index: 1,
        explanation: "Jenner's discovery was purely observational. Because Germ Theory had not yet been published, he did not know what caused disease and could not scientifically replicate his success for other illnesses."
    },
    "What did the low death rate among Soho workhouse residents and brewery workers prove to John Snow during his investigation?": {
        text: "What did the low death rate among Soho workhouse residents and brewery workers prove to John Snow during his investigation?",
        options: [
            "That cholera only affected the poor and malnourished, not those who were employed or in the workhouse.",
            "That the strong smell of beer and workhouse bleach repelled the miasma causing the disease.",
            "That cholera was spread through contaminated water from the Broad Street pump, because these groups drank from their own private wells or drank beer instead.",
            "That boiling water to make beer killed the cholera bacteria, which Snow had recently discovered under a microscope."
        ],
        correct_index: 2,
        explanation: "The brewery workers drank free beer, and the workhouse had its own private well. Because they did not drink from the Broad Street pump, they didn't catch cholera, proving the pump was the source of the outbreak."
    }
};

['lesson_2_3', 'lesson_3_2', 'lesson_3_3'].forEach(id => {
    let l = unitData.lessons.find(l => l.id === id);
    if(l.teacher_notes && l.teacher_notes.objectives) {
        l.teacher_notes.objectives.forEach(obj => {
            if (typeof obj.question === 'string' && hingeUpdates[obj.question]) {
                obj.question = hingeUpdates[obj.question];
            }
        });
    }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("Injected interactive hinge questions.");
