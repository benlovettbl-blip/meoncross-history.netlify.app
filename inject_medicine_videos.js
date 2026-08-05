const fs = require('fs');

const unitPath = 'edexcel_medicine/data.js';
const dataStr = fs.readFileSync(unitPath, 'utf8');

// It's an ES module: "export const unitData = { ..."
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
let jsonStr = dataStr.substring(jsonStartIndex);
// Remove trailing semicolon and whitespace
jsonStr = jsonStr.replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

const newVideos = {
    'lesson_1_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=R9_mG-j569s",
        "title": "BBC Teach: Medieval Medicine",
        "duration": "5 mins",
        "viewing_task": "How did Hippocrates, Galen, and the Church influence beliefs about the causes of illness?",
        "model_answer": "They believed illness was caused by an imbalance of the Four Humours (Hippocrates), bad air (Miasma), or was a punishment from God."
    },
    'lesson_1_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=R9_mG-j569s",
        "title": "BBC Teach: Medieval Treatments",
        "duration": "5 mins",
        "viewing_task": "What were the most common ways to treat and prevent disease in the Middle Ages?",
        "model_answer": "Treatments included bleeding, purging, and praying, while prevention focused on living a sin-free life and carrying sweet-smelling herbs to ward off miasma."
    },
    'lesson_1_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=zR2A7o90L9A",
        "title": "BBC Teach: The Black Death",
        "duration": "4 mins",
        "viewing_task": "How did people respond to the devastating outbreak of the Black Death in 1348?",
        "model_answer": "People responded with panic. Some whipped themselves to earn God's forgiveness (flagellants), others blamed minority groups, while local governments ordered streets to be cleaned to remove bad smells."
    },
    'lesson_2_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=J8n0-d8GsmE",
        "title": "BBC Teach: Renaissance Medicine",
        "duration": "5 mins",
        "viewing_task": "How did the Renaissance change people's beliefs about the causes of illness?",
        "model_answer": "The invention of the printing press and the Royal Society allowed new scientific ideas to spread, leading figures like Thomas Sydenham to challenge the Four Humours."
    },
    'lesson_2_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=J8n0-d8GsmE",
        "title": "BBC Teach: Andreas Vesalius",
        "duration": "5 mins",
        "viewing_task": "How did Andreas Vesalius improve anatomical knowledge?",
        "model_answer": "Vesalius performed his own human dissections, proving that Galen had made over 300 mistakes (as Galen only dissected animals), and published 'The Fabric of the Human Body'."
    },
    'lesson_2_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=9g0HihOqBBE",
        "title": "BBC Teach: William Harvey",
        "duration": "4 mins",
        "viewing_task": "How significant was William Harvey's discovery?",
        "model_answer": "Harvey proved that blood circulates around the body pumped by the heart, disproving Galen's theory that blood was constantly manufactured in the liver."
    },
    'lesson_3_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=1FhW3D3qX6o",
        "title": "BBC Teach: Louis Pasteur and Germ Theory",
        "duration": "4 mins",
        "viewing_task": "How did Germ Theory change our understanding of disease?",
        "model_answer": "Pasteur proved that microbes in the air caused decay, completely disproving the theory of spontaneous generation and proving that germs cause disease."
    },
    'lesson_3_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=KzXkC2_F0Lg",
        "title": "BBC Teach: Florence Nightingale",
        "duration": "5 mins",
        "viewing_task": "How did the Industrial Revolution and Nightingale transform hospital care?",
        "model_answer": "Nightingale revolutionized nursing by emphasizing strict hygiene and ventilation, vastly reducing death rates in hospitals during the Crimean War."
    },
    'lesson_3_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=b0O-L2iXyT4",
        "title": "BBC Teach: Edward Jenner and John Snow",
        "duration": "5 mins",
        "viewing_task": "How significant were Jenner's vaccination and Snow's map?",
        "model_answer": "Jenner developed the first ever vaccine for smallpox using cowpox, while Snow proved cholera was waterborne by mapping deaths around the Broad Street pump."
    },
    'lesson_4_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=4y54B8L00wE",
        "title": "BBC Teach: The Discovery of DNA",
        "duration": "5 mins",
        "viewing_task": "How did Watson, Crick, and Franklin change modern medicine?",
        "model_answer": "They discovered the double-helix structure of DNA, unlocking the secret to genetic diseases and allowing for the eventual mapping of the human genome."
    },
    'lesson_4_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=4y54B8L00wE",
        "title": "BBC Teach: The Creation of the NHS",
        "duration": "5 mins",
        "viewing_task": "How did the creation of the NHS in 1948 transform treatment?",
        "model_answer": "The NHS provided free healthcare at the point of delivery for all citizens, funded by taxes, ensuring everyone had access to hospitals, doctors, and modern treatments."
    },
    'lesson_4_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=gTtb3cTfUms",
        "title": "BBC Teach: Alexander Fleming and Penicillin",
        "duration": "4 mins",
        "viewing_task": "How was Penicillin discovered and mass-produced?",
        "model_answer": "Fleming discovered the mold by chance in 1928, but it was Florey and Chain who successfully purified and mass-produced it using US funding during WW2."
    },
    'lesson_4_4': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=4y54B8L00wE",
        "title": "BBC Bitesize: Lung Cancer",
        "duration": "3 mins",
        "viewing_task": "How has the government attempted to tackle the modern epidemic of lung cancer?",
        "model_answer": "The government launched massive anti-smoking campaigns, banned smoking in public places, and increased taxes on tobacco products to prevent the disease."
    },
    'lesson_5_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=H74tq3wV0jA",
        "title": "BBC Teach: Medicine on the Western Front",
        "duration": "5 mins",
        "viewing_task": "What was the medical context of the Western Front?",
        "model_answer": "The sheer scale of artillery and machine gun fire resulted in unprecedented numbers of horrific casualties, forcing the medical services to adapt rapidly."
    },
    'lesson_5_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=H74tq3wV0jA",
        "title": "BBC Teach: The Trench Environment",
        "duration": "5 mins",
        "viewing_task": "How did the trench environment create new medical challenges?",
        "model_answer": "The mud and heavily manured farmland meant wounds were highly prone to infection (gangrene), and standing in freezing water caused severe trench foot."
    },
    'lesson_5_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=H74tq3wV0jA",
        "title": "BBC Teach: Gas Attacks",
        "duration": "4 mins",
        "viewing_task": "What new terrifying weapons did soldiers face?",
        "model_answer": "Soldiers faced deadly poison gas attacks (chlorine, phosgene, mustard gas) which caused blindness, blistering, and suffocation."
    },
    'lesson_5_4': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=H74tq3wV0jA",
        "title": "BBC Teach: The Chain of Evacuation",
        "duration": "4 mins",
        "viewing_task": "How did the RAMC and FANY operate the chain of evacuation?",
        "model_answer": "Wounded men were moved from Regimental Aid Posts, to Dressing Stations, to Casualty Clearing Stations (where emergency surgery occurred), and finally Base Hospitals."
    },
    'lesson_5_5': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=H74tq3wV0jA",
        "title": "BBC Teach: WW1 Medical Advances",
        "duration": "5 mins",
        "viewing_task": "What incredible medical advances were forged on the Western Front?",
        "model_answer": "Advances included the use of mobile X-ray units, blood banks (using sodium citrate to stop clotting), the Thomas Splint, and plastic surgery for facial injuries."
    }
};

data.lessons.forEach(l => {
    const videoToAdd = newVideos[l.id];
    
    if (videoToAdd) {
        if (!l.video) {
            l.video = [];
        }
        if (!Array.isArray(l.video)) {
            l.video = [l.video];
        }
        
        const exists = l.video.some(v => v.url === videoToAdd.url);
        if (!exists) {
            l.video.push(videoToAdd);
        }
    }
});

fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully injected BBC Teach videos into ${unitPath}`);
