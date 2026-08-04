import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eeePath = path.join(__dirname, 'eee', 'data.js');
let dataContent = fs.readFileSync(eeePath, 'utf8');

// The tricky part is data.js is a JS file exporting a variable.
// I'll dynamically import it to get the object, but we need to modify the JS source code.
// Instead of writing a complex AST parser, I'll use regex or string replacements for the specific lessons.

// KT1.1
const kt11Video = `
            "video": {
                "type": "youtube",
                "url": "https://www.youtube.com/watch?v=OOeal_k4bmE",
                "title": "Elizabeth I: From Prison to Palace (Episode 1)",
                "duration": "49 mins 36 secs",
                "viewing_task": "Watch this overview and note down the key dangers Elizabeth faced before and immediately after becoming queen.",
                "model_answer": "1. She survived imprisonment in the Tower of London under her sister Mary's reign.\\n2. She faced extreme financial debt upon taking the throne.\\n3. She was surrounded by Catholic enemies at home and abroad who questioned her legitimacy."
            },`;

// KT2.1 - Multiple videos!
const kt21Videos = `
            "video": [
                {
                    "type": "youtube",
                    "url": "https://www.youtube.com/watch?v=vZRq1fuD4pE",
                    "title": "Rebellion of the Northern Earls, 1569",
                    "duration": "13 mins 12 secs",
                    "viewing_task": "Note down the main causes of the Rebellion of the Northern Earls and why it ultimately failed.",
                    "model_answer": "Causes: Catholic Earls (Northumberland and Westmorland) wanted to restore Catholicism and felt sidelined by Elizabeth's Protestant advisors like Cecil.\\nFailure: Lack of widespread support, Elizabeth moved Mary Queen of Scots, and the Earl of Sussex raised a massive royal army."
                },
                {
                    "type": "youtube",
                    "url": "https://www.youtube.com/watch?v=PbXbn1ppTm0",
                    "title": "The Babington Plot",
                    "duration": "4 mins 37 secs",
                    "viewing_task": "How did Francis Walsingham use the Babington Plot to finally trap Mary, Queen of Scots?",
                    "model_answer": "Walsingham intercepted Mary's letters hidden in beer barrels. He deciphered them and waited until Mary explicitly approved the plot to assassinate Elizabeth, giving him the undeniable treasonous evidence needed to execute her."
                },
                {
                    "type": "era",
                    "url": "https://era.org.uk/streaming-service-resource/elizabeth-is-secret-agents/",
                    "title": "Elizabeth I's Secret Agents",
                    "duration": "45 mins 0 secs",
                    "viewing_task": "Describe the methods used by Francis Walsingham's spy network to protect the Queen.",
                    "model_answer": "Walsingham used a vast network of informers, double agents, and codebreakers (like Thomas Phelippes). He intercepted letters, used torture to extract confessions, and employed agents provocateurs to draw out conspirators."
                }
            ],`;

// KT2.4
const kt24Video = `
            "video": {
                "type": "youtube",
                "url": "https://www.youtube.com/watch?v=RR-XqmhV1Oc",
                "title": "The Spanish Defeat Scene (The Golden Age)",
                "duration": "3 mins 8 secs",
                "viewing_task": "Watch this cinematic depiction of the Armada's defeat. What tactics and environmental factors are shown destroying the Spanish fleet?",
                "model_answer": "The English used devastating fireships to scatter the Spanish crescent formation. Following this, the chaotic 'Protestant Wind' and violent storms smashed the fleeing Spanish galleons against the rocky coasts of Scotland and Ireland."
            },`;

// Inject KT1.1
// Need to find "title": "KT1.1: The situation on Elizabeth’s accession, 1558"
// Let's use generic matchers in case the title varies slightly.
let kt11Match = dataContent.match(/"title": "KT1\.1:[^"]+",\s*"enquiry": "[^"]+",/);
if (kt11Match) {
    dataContent = dataContent.replace(kt11Match[0], kt11Match[0] + kt11Video);
    console.log("Injected KT1.1");
} else {
    console.log("Could not find KT1.1");
}

let kt21Match = dataContent.match(/"title": "KT2\.1:[^"]+",\s*"enquiry": "[^"]+",/);
if (kt21Match) {
    dataContent = dataContent.replace(kt21Match[0], kt21Match[0] + kt21Videos);
    console.log("Injected KT2.1");
} else {
    console.log("Could not find KT2.1");
}

let kt24Match = dataContent.match(/"title": "KT2\.4:[^"]+",\s*"enquiry": "[^"]+",/);
if (kt24Match) {
    dataContent = dataContent.replace(kt24Match[0], kt24Match[0] + kt24Video);
    console.log("Injected KT2.4");
} else {
    console.log("Could not find KT2.4");
}

fs.writeFileSync(eeePath, dataContent, 'utf8');
console.log("Done updating data.js");
