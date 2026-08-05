const fs = require('fs');

function injectVideos(unitPath, newVideos) {
    if (!fs.existsSync(unitPath)) {
        console.error("File not found: " + unitPath);
        return;
    }

    const dataStr = fs.readFileSync(unitPath, 'utf8');
    const jsonStartIndex = dataStr.indexOf('{');
    const preText = dataStr.substring(0, jsonStartIndex);
    const data = JSON.parse(dataStr.substring(jsonStartIndex));

    data.lessons.forEach((l, i) => {
        const lessonIndex = i + 1;
        const videoToAdd = newVideos['lesson_' + lessonIndex];
        
        if (videoToAdd) {
            if (!l.video) {
                l.video = [];
            }
            // If it's an object (single video), wrap in array
            if (!Array.isArray(l.video)) {
                l.video = [l.video];
            }
            
            // Check if URL already exists to avoid duplicates
            const exists = l.video.some(v => v.url === videoToAdd.url);
            if (!exists) {
                l.video.push(videoToAdd);
            }
        }
    });

    fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully injected video bank into ${unitPath}`);
}

const greatWarVideos = {
    'lesson_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=1F2lF6bE6Qo",
        "title": "Simple History: Otto von Bismarck",
        "duration": "4 mins",
        "viewing_task": "How did Bismarck use the military and industry to unite Germany?",
        "model_answer": "Bismarck believed in 'Blood and Iron', using military victories and industrial strength to unite the German states under Prussian rule, rather than relying on speeches or voting."
    },
    'lesson_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=kYJ0a_YkKRE",
        "title": "History Matters: The Franco-Prussian War",
        "duration": "3 mins",
        "viewing_task": "Why did the French loss of Alsace-Lorraine create a lasting legacy of hatred?",
        "model_answer": "The loss of Alsace-Lorraine was a humiliating defeat for France, fueling a deep desire for revenge against the newly formed German Empire that lasted until the outbreak of WWI."
    },
    'lesson_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=Pis5f085P3M",
        "title": "History Crunch: The Scramble for Africa",
        "duration": "4 mins",
        "viewing_task": "How did imperialism and the 'Scramble for Africa' increase tension in Europe?",
        "model_answer": "European nations fiercely competed for territory and resources in Africa. This imperial rivalry bred jealousy and mistrust, especially as Germany felt it was missing out compared to Britain and France."
    },
    'lesson_4': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=1O9pQ2-R-yE",
        "title": "History Matters: The Anglo-German Naval Arms Race",
        "duration": "3 mins",
        "viewing_task": "Why did the building of HMS Dreadnought destroy Anglo-German relations?",
        "model_answer": "HMS Dreadnought was so advanced it made all older ships obsolete, sparking a massively expensive arms race where both Britain and Germany tried to outbuild each other out of national pride and fear."
    },
    'lesson_5': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=n5A502J7Hk0",
        "title": "Simple History: What Caused the First World War?",
        "duration": "5 mins",
        "viewing_task": "Did the Alliance System protect Europe or guarantee a global war?",
        "model_answer": "While intended to protect countries by deterring attacks, the Alliance System guaranteed a global war because a local conflict (like the one in Serbia) dragged all the major powers into the fight."
    },
    'lesson_6': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=A-ZofWW1AzQ",
        "title": "BBC Teach: A is for Archduke Franz Ferdinand",
        "duration": "3 mins",
        "viewing_task": "Why did a single assassination in Sarajevo ignite a World War?",
        "model_answer": "The assassination of the Austrian Archduke by Gavrilo Princip gave Austria an excuse to invade Serbia, which activated the complex web of alliances across Europe."
    }
};

const sanitationVideos = {
    'lesson_1': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=5V920hYyL8s",
        "title": "Roman Public Health System",
        "duration": "5 mins",
        "viewing_task": "How much progress did the Romans make in public health?",
        "model_answer": "The Romans made massive progress through incredible engineering, building aqueducts for fresh water, public bathhouses for hygiene, and complex sewer systems to remove waste."
    },
    'lesson_2': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=zR2A7o90L9A",
        "title": "BBC Teach: The Black Death",
        "duration": "4 mins",
        "viewing_task": "Why did public health decline so severely during the Middle Ages?",
        "model_answer": "Roman infrastructure collapsed, streets became open sewers filled with waste, and a lack of clean water and hygiene allowed catastrophic diseases like the Black Death to spread rapidly."
    },
    'lesson_3': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=ySb1f0p-Ebw",
        "title": "BBC Teach: The Great Plague",
        "duration": "4 mins",
        "viewing_task": "To what extent did towns become filthier during the Early Modern period?",
        "model_answer": "Towns became overcrowded and extremely filthy due to rapid urbanization without proper sanitation, leading to devastating outbreaks like the Great Plague of London in 1665."
    },
    'lesson_4': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=slkOPze2L30",
        "title": "Simple History: Cholera and the Broad Street Pump",
        "duration": "4 mins",
        "viewing_task": "How did the Industrial Revolution lead to a public health crisis?",
        "model_answer": "The Industrial Revolution led to overcrowded, poor-quality 'back-to-back' housing without running water or sewers, allowing waterborne diseases like Cholera to kill thousands."
    },
    'lesson_5': {
        "type": "youtube",
        "url": "https://www.youtube.com/watch?v=P_i5iYvW2m8",
        "title": "Simple History: The Great Stink of London",
        "duration": "4 mins",
        "viewing_task": "Why did it take the 'Great Stink' to finally clean up Britain's streets?",
        "model_answer": "The Great Stink of 1858 made the River Thames smell so horrendous that it forced politicians in Parliament to finally fund Joseph Bazalgette's massive new sewer system."
    }
};

injectVideos('great_war/data.js', greatWarVideos);
injectVideos('water_and_sanitation/data.js', sanitationVideos);

