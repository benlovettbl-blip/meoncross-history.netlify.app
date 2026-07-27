const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let dataCode = fs.readFileSync(dataPath, 'utf8');

let unitData;
try {
    const jsonStr = dataCode.replace('export const unitData = ', '').replace(/;\s*$/, '');
    unitData = JSON.parse(jsonStr);
} catch (e) {
    console.error("Failed to parse data.js", e);
    process.exit(1);
}

// Map each title to a local, successfully downloaded image.
const imageMap = {
    "UN Partition Plan for Palestine (1947)": "cme_un_palestine_partition_versions_1947.jpg",
    "The SS Exodus (1947)": "cme_exodus.jpeg",
    "David Ben-Gurion declaring Independence (1948)": "cme_david_ben_gurion__d597_087_.jpg",
    
    "The 1948 Arab–Israeli War": "cme_tel_aviv_yafo__997008136796005171_.jpg",
    "Palestinian Refugees (The Nakba)": "map_lesson1.png", // fallback map
    "UNRWA Refugee Camps": "map_lesson2.png", // fallback map
    
    "Gamal Abdel Nasser": "cme_stevan_kragujevic__gamal_abdel_naser_u_beogradu__1962.jpg",
    "The Suez Crisis (1956)": "nasser_suez.png",
    "Anthony Eden": "eden_cover.png",
    
    "The Six-Day War Map": "palestine_1967_map.png",
    "Israeli Paratroopers at the Western Wall": "map_lesson3.png",
    "Operation Focus": "card_dayan.png", // Dayan was minister of defense
    
    "The Khartoum Resolution": "map_lesson4.png",
    "UN Resolution 242": "un242.svg",
    "Yasser Arafat and the PLO": "yasser_arafat.jpg",
    
    "The Yom Kippur War (1973)": "yom_kippur_crossing.png",
    "Israeli Counter-Offensive": "ariel_sharon.webp", // Sharon led the crossing
    "Golda Meir": "card_golda.png",
    
    "Sadat visits Jerusalem": "anwar_sadat.jpg",
    "The Camp David Accords (1978)": "camp_david_accords.png",
    "The Egypt-Israel Peace Treaty (1979)": "menachem_begin.jpeg",
    
    "The First Intifada (1987)": "first_intifada.png",
    "Israeli Response to the Intifada": "card_shamir.png",
    "PLO Exile in Lebanon": "arafat_1988.svg",
    
    "The Oslo Handshake (1993)": "yitzhak_rabin.jpg",
    "Israel-Jordan Peace Treaty (1994)": "card_hussein.png",
    "Assassination of Yitzhak Rabin": "rabinovich_cover.png"
};

for (let l of unitData.lessons) {
    if (l.sources) {
        for (let s of l.sources) {
            const localFile = imageMap[s.title];
            if (localFile) {
                s.src = `/units/cme_new/assets/${localFile}`;
            }
        }
    }
}

const newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
fs.writeFileSync(dataPath, newCode);
console.log("Successfully remapped all sources to existing local assets!");
