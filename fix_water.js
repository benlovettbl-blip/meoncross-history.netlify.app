const fs = require('fs');

const wsPath = './public/data/water_and_sanitation.json';
let ws = JSON.parse(fs.readFileSync(wsPath, 'utf8'));

// 1. Fix Do Now Anachronisms
const l4_donow = ws.data.lessons.find(l => l.id === 'lesson_4').do_now.items;
l4_donow.forEach(item => {
    if (item.question === "Recall from last lesson: Identify one major problem with Miasma theory.") {
        item.question = "Recall from last lesson: Identify one major problem with the New River project for poorer citizens.";
    }
});

const l5_donow = ws.data.lessons.find(l => l.id === 'lesson_5').do_now.items;
l5_donow.forEach(item => {
    if (item.question === "Recall from previous lessons: What did John Snow prove in 1854?") {
        item.question = "Recall from previous lessons: What did Edwin Chadwick advocate for in his 1842 report?";
    }
    if (item.question === "Recall from previous lessons: What was the Broad Street pump?") {
        item.question = "Recall from previous lessons: Why did 'back-to-back' housing increase disease?";
    }
    if (item.question === "Recall from previous lessons: Why did the government ignore Snow?") {
        item.question = "Recall from previous lessons: What happened to Britain's population between 1750 and 1850?";
    }
});

// 2. Fix Primary Source Tasks & Model Answers
const ps1 = ws.data.lessons.find(l => l.id === 'lesson_1').primary_source;
ps1.model_answer = "Students should observe the deep, continuous channel beneath the seating designed for running water to flush away waste, demonstrating advanced Roman hydraulic engineering, while noting the lack of privacy as a limitation by modern standards.";

const ps2 = ws.data.lessons.find(l => l.id === 'lesson_2').primary_source;
ps2.model_answer = "Students should point out the complex network of coloured pipes (green for fresh water, red for wastewater), showing that monasteries possessed incredible wealth, organization, and a theological commitment to cleanliness that ordinary towns lacked.";

const ps3 = ws.data.lessons.find(l => l.id === 'lesson_3').primary_source;
ps3.model_answer = "Students should note the sophisticated valve system and cistern. It failed to catch on because it was completely impractical for Early Modern London, which lacked the pressurized running water and municipal sewers required to make the device function safely.";

const ps4 = ws.data.lessons.find(l => l.id === 'lesson_4').primary_source;
ps4.tasks[0].text = "Circle the dense cluster of black bars representing cholera deaths centered around the Broad Street pump.";
ps4.model_answer = "By mapping the deaths visually, Snow provided undeniable statistical proof that the cholera outbreak was geographically concentrated around a single contaminated water source, fundamentally disproving the idea that it was caused by a random cloud of 'bad air' (miasma).";

const ps5 = ws.data.lessons.find(l => l.id === 'lesson_5').primary_source;
ps5.tasks[0].text = "Draw an arrow pointing to the massive diameter of the brick tunnels, built to intercept all of London's waste.";
ps5.model_answer = "The sheer scale, incredible depth, and massive brickwork of Bazalgette's sewers demonstrate that the Victorian government was finally forced to abandon 'laissez-faire' and invest millions of pounds into state-funded public health infrastructure due to the terror of the Great Stink.";

fs.writeFileSync(wsPath, JSON.stringify(ws, null, 2));
console.log('Water and Sanitation fixes applied successfully.');
