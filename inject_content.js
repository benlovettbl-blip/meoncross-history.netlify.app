const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
const data = JSON.parse(dataStr.substring(jsonStartIndex));

// Lesson 1: Jessie Pope poetry and Video
const l1 = data.lessons.find(l => l.id === 'lesson_1');
if (l1) {
    l1.narrative_blocks.splice(3, 0, {
        "title": "Poetry as Propaganda: Jessie Pope",
        "text": "Propaganda wasn't just found on posters; it was printed in popular newspapers in the form of jingoistic poetry. <strong>Jessie Pope</strong> was one of the most famous pro-war poets of 1914. Her poem <em>'Who's for the Game?'</em> was specifically written to pressure young men into enlisting by comparing the war to a friendly game of rugby.<br><br><blockquote><em>Who's for the game, the biggest that's played,<br>The red crashing game of a fight?<br>Who'll grip and tackle the job unafraid?<br>And who thinks he'd rather sit tight?...<br>Come along, lads—But you'll come on all right—<br>For there's only one course to pursue,<br>Your country is up to her neck in a fight,<br>And she's looking and calling for you.</em></blockquote><br>Pope's poetry weaponized masculinity, essentially calling anyone who didn't enlist a coward who 'thought he'd rather sit tight'.",
        "image": "/images/gw_jessie_pope.jpg",
        "image_alt": "Jessie Pope",
        "tasks": [
            {
                "text": "<strong>Part X: Analyzing Propaganda Poetry</strong><br>How does Jessie Pope use the metaphor of a 'game' to manipulate young men into joining the army? What reality is she deliberately hiding?",
                "model": "Pope compares war to a 'red crashing game' (like rugby) to make it sound exciting, physical, and like a team sport. She manipulates young men by implying that joining the army is just playing a fun game with their 'lads'. She deliberately hides the horrific reality of industrialized slaughter, machine guns, and death, because if she told the truth, nobody would volunteer."
            }
        ]
    });
    l1.video = [{
        "type": "youtube",
        "url": "https://www.youtube.com/embed/jZz7hT2oRbc",
        "title": "I Was There: The Great War Interviews (Outbreak)",
        "duration": "4 mins",
        "viewing_task": "Watch the veterans describe the mood in August 1914. List two reasons they give for being excited to go to war.",
        "model_answer": "1. They thought it would be a grand adventure. 2. They were told it would be 'over by Christmas' and didn't want to miss out."
    }];
}

// Lesson 2: Wilfred Owen poetry and Video
const l2 = data.lessons.find(l => l.id === 'lesson_2');
if (l2) {
    l2.narrative_blocks.splice(3, 0, {
        "title": "The Brutal Reality: Wilfred Owen",
        "text": "The horrific reality of the trenches stood in stark contrast to the jingoistic poetry of 1914. <strong>Wilfred Owen</strong>, an officer who suffered from shell shock, wrote poetry to expose the \"Pity of War\" and attack the lie that dying for your country was glorious. His most famous poem, <em>'Dulce et Decorum Est'</em>, describes a terrifying mustard gas attack.<br><br><blockquote><em>Gas! GAS! Quick, boys!—An ecstasy of fumbling<br>Fitting the clumsy helmets just in time,<br>But someone still was yelling out and stumbling<br>And flound'ring like a man in fire or lime.<br>Dim through the misty panes and thick green light,<br>As under a green sea, I saw him drowning.<br><br>...My friend, you would not tell with such high zest<br>To children ardent for some desperate glory,<br>The old Lie: Dulce et decorum est<br>Pro patria mori. (It is sweet and fitting to die for one's country)</em></blockquote>",
        "image": "/images/gw_wilfred_owen.jpg",
        "image_alt": "Wilfred Owen",
        "tasks": [
            {
                "text": "<strong>Part X: The Pity of War</strong><br>How does Wilfred Owen's description of a gas attack completely destroy the message of Jessie Pope's 'Who's for the Game?'",
                "model": "Owen's visceral description of a man 'drowning' and 'floundering' in mustard gas exposes the horrific reality of modern warfare. It destroys Pope's argument by showing that war is not a fun rugby game, and that telling children it is 'sweet and fitting to die for one's country' is an 'old Lie'."
            }
        ]
    });
    l2.video = [{
        "type": "youtube",
        "url": "https://www.youtube.com/embed/IrTExcbXyCc",
        "title": "They Shall Not Grow Old (Peter Jackson)",
        "duration": "3 mins",
        "viewing_task": "Watch the colorized footage of the trenches. How does colorizing the footage change the way we view the soldiers compared to black and white?",
        "model_answer": "Colorizing the footage makes the soldiers look like real, modern people rather than distant historical figures. It highlights the horrific conditions, the redness of the mud, and the exhaustion on their faces."
    }];
}

// Lesson 3: Chinese Labour Corps and Video
const l3 = data.lessons.find(l => l.id === 'lesson_3');
if (l3) {
    l3.narrative_blocks.splice(2, 0, {
        "title": "Fringes of History: The Chinese Labour Corps",
        "text": "While millions of imperial soldiers fought on the front lines, the war effort relied equally on a massive, forgotten workforce. In 1916, facing critical manpower shortages, Britain recruited the <strong>Chinese Labour Corps (CLC)</strong>. Over 140,000 Chinese men were brought to the Western Front to do the grueling, dangerous manual labor required to keep the war machine running.<br><br>The CLC dug trenches, repaired roads under artillery fire, unloaded millions of tons of supplies at the docks, and were given the horrific task of clearing the battlefields and burying the rotting dead. Despite their essential contribution (without which the British Army could not have functioned), they were treated abysmally. They were kept in segregated camps behind barbed wire and paid a fraction of white soldiers' wages. Most tragically, when the war was won, the Chinese Labour Corps were deliberately <em>erased</em> from history. They were not invited to the Allied Victory Parade in London, and their massive contribution was ignored by historians for decades.",
        "image": "/images/gw_clc.jpg",
        "image_alt": "Men of the Chinese Labour Corps",
        "tasks": [
            {
                "text": "<strong>Part X: The Forgotten Workforce</strong><br>Why do you think the 140,000 men of the Chinese Labour Corps were deliberately left out of the victory parades and historical memory?",
                "model": "They were likely erased due to racism and the desire to portray the victory as a heroic triumph of white British and European soldiers. Admitting that the British army heavily relied on 140,000 Chinese laborers to survive would undermine the imperial racial hierarchy of the time."
            }
        ]
    });
    l3.video = [{
        "type": "youtube",
        "url": "https://www.youtube.com/embed/Z80O5n0sRj8",
        "title": "The World's War (David Olusoga) - The Chinese Labour Corps",
        "duration": "5 mins",
        "viewing_task": "Watch historian David Olusoga explain the role of the CLC. What specific, dangerous jobs were they forced to do on the Western Front?",
        "model_answer": "They were forced to dig trenches under fire, unload heavy munitions at the docks, and perform the horrific task of burying thousands of rotting corpses on the battlefields."
    }];
}

// Lesson 4: Conscientious Objectors and Video
const l4 = data.lessons.find(l => l.id === 'lesson_4');
if (l4) {
    l4.narrative_blocks.splice(2, 0, {
        "title": "Fringes of History: Conscientious Objectors",
        "text": "When conscription (forced military service) was introduced in 1916, not everyone agreed to fight. Around 16,000 men refused to join the army on moral or religious grounds. They were known as <strong>Conscientious Objectors (or 'Conchies')</strong>.<br><br>Their treatment on the Home Front was brutal. They were widely viewed as cowards and traitors by the public and government. While some were allowed to do non-combat roles like driving ambulances under fire (which took immense bravery), absolutists who refused to contribute to the war effort in any way were thrown into harsh civilian prisons, where they faced solitary confinement, starvation diets, and forced labor. Some were even shipped to the front lines in France, court-martialed for refusing orders, and sentenced to be \"Shot at Dawn\" (though these death sentences were later commuted to 10 years in prison). Today, they are remembered for their bravery in standing up for their beliefs, commemorated by a special memorial at the National Memorial Arboretum.",
        "image": "/images/gw_arboretum.jpg",
        "image_alt": "The Shot at Dawn Memorial at the National Memorial Arboretum",
        "tasks": [
            {
                "text": "<strong>Part X: A Question of Bravery</strong><br>Many people in 1916 believed Conscientious Objectors were cowards. How could you argue that it actually took immense bravery to be a 'Conchie'?",
                "model": "It took immense bravery because they knew they would face total social isolation, public hatred, and harsh imprisonment. Standing up to the entire British government and society for your deeply held moral beliefs, even when threatened with execution, requires a different kind of courage than fighting in a trench."
            }
        ]
    });
    l4.video = [{
        "type": "youtube",
        "url": "https://www.youtube.com/embed/0CkV0_hX7xM",
        "title": "BBC Bitesize - Conscientious Objectors",
        "duration": "4 mins",
        "viewing_task": "Note down the difference between an 'Absolutist' and an 'Alternativist' conscientious objector.",
        "model_answer": "An Alternativist was willing to help the war effort in non-combat roles (like driving ambulances or stretcher-bearing), whereas an Absolutist refused to do anything that supported the military machine, resulting in prison sentences."
    }];
}

// Lesson 5: Treaty of Versailles Video
const l5 = data.lessons.find(l => l.id === 'lesson_5');
if (l5) {
    l5.video = [{
        "type": "youtube",
        "url": "https://www.youtube.com/embed/vrYhLNQMRro",
        "title": "The Treaty of Versailles Explained",
        "duration": "6 mins",
        "viewing_task": "Watch the clip and list the three main goals of Georges Clemenceau compared to the goals of Woodrow Wilson.",
        "model_answer": "Clemenceau wanted revenge, severe reparations, and to cripple Germany's military so they could never attack France again. Wilson wanted a fair peace based on his 14 Points and the creation of the League of Nations to prevent future wars."
    }];
}

// Lesson 6: Stubbington Video
const l6 = data.lessons.find(l => l.id === 'lesson_6');
if (l6) {
    l6.video = [{
        "type": "youtube",
        "url": "https://www.youtube.com/embed/K_V_rZcO5fI",
        "title": "CWGC - Building the Memorials",
        "duration": "4 mins",
        "viewing_task": "How did the Commonwealth War Graves Commission ensure that every soldier, regardless of rank or class, was remembered equally?",
        "model_answer": "They decided that every soldier would receive the exact same headstone design, regardless of whether they were a wealthy general or a poor private. They also banned families from repatriating bodies, ensuring all men were buried together."
    }];
}

fs.writeFileSync('great_war_part2/data.js', preText + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully injected CLC, Poetry, Conchies, and Videos!');
