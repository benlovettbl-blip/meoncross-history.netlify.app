import fs from 'fs';

const bespokeQuestions = {
    'great_war_part2': {
        '0-2': {
            q: 'Study Source C (the "Women of Britain Say GO!" poster). How does this piece of propaganda attempt to emotionally manipulate young men into volunteering?',
            a: 'The poster attempts to manipulate men by implying that their mothers, sisters, and wives expected them to fight. It leverages traditional concepts of masculinity and intense peer pressure, suggesting that staying at home while women watch them leave would be deeply shameful.'
        },
        '0-3': {
            q: 'Study Source D (the photograph of Jessie Pope). Why might frontline soldiers, such as Wilfred Owen, have fiercely criticized the patriotic poetry produced by writers like Pope?',
            a: 'Frontline soldiers criticized writers like Jessie Pope because her aggressive, jingoistic poetry promoted romantic illusions of war. To soldiers suffering the horrific, gritty realities of trench warfare, her simplistic verses felt deeply insulting and disconnected from the true trauma they were enduring.'
        },
        '1-1': {
            q: 'Study Source B. Look closely at the zig-zag pattern of the trench system. What was the practical military purpose of digging trenches in this complex shape?',
            a: 'Trenches were deliberately dug in a zig-zag pattern rather than a straight line to prevent an enemy soldier who jumped into the trench from firing their weapon straight down the entire line. It also helped contain the blast radius of artillery shells landing inside the trench.'
        },
        '1-3': {
            q: 'Study Source D (the portrait of Wilfred Owen). How did the poetry of soldiers like Owen fundamentally differ from the propaganda that was common at the start of the war?',
            a: 'Unlike early propaganda which glorified the conflict, Owen\'s poetry was brutally realistic. It focused on the trauma, suffering, and shell shock experienced on the Western Front, effectively shattering the romantic illusions of war.'
        },
        '2-1': {
            q: 'Study Source B (Soldiers of the British West Indies Regiment). What does this photograph reveal about the racial policies of the British Army during the First World War?',
            a: 'The photograph reveals systemic racism within the British Army. Despite 15,000 men from the Caribbean eagerly volunteering to fight, they were frequently barred from combat roles and instead forced into grueling manual labor behind the lines.'
        },
        '2-2': {
            q: 'Study Source C (Members of the Chinese Labour Corps). Why was the recruitment of the CLC critical to the British war effort, and how were they treated in return?',
            a: 'The CLC was critical because Britain faced severe manpower shortages and needed workers for highly dangerous manual labor on the battlefield. In return for their vital work, they were paid only a fraction of white soldiers\' wages and were deliberately excluded from post-war victory parades.'
        },
        '3-2': {
            q: 'Study Source C (The \'Shot at Dawn\' Memorial). Based on modern historical understanding, why is the execution of these 306 soldiers considered a tragic injustice?',
            a: 'Modern historians recognize that many of the soldiers executed for "cowardice" or "desertion" were not cowards, but were actually suffering from severe, undiagnosed shell shock (PTSD) caused by the horrors of trench warfare.'
        },
        '4-1': {
            q: 'Study Source B (the 1919 political cartoon). What is the cartoonist suggesting about the long-term consequences of the Treaty of Versailles?',
            a: 'By depicting a weeping child labeled "1940 Class", the cartoonist is suggesting that the extremely harsh terms of the treaty would fail to secure lasting peace, and would instead inevitably spark another devastating world war when that child reached fighting age.'
        },
        '5-0': {
            q: 'Study Source A (the Stubbington War Memorial). Why are local memorials like this crucial for a historian studying the human cost of the First World War?',
            a: 'Local memorials are crucial because they ground the massive, abstract casualty statistics into tangible local reality. Seeing 67 names from a single, tight-knit rural village demonstrates how deeply the "Lost Generation" devastated everyday communities.'
        },
        '5-1': {
            q: 'Study Source B (the "Dead Man\'s Penny"). What does this source tell us about how the British government attempted to console grieving families, and why might it have felt inadequate?',
            a: 'The government sent these bronze plaques and a simple scroll to the families of fallen soldiers to formally acknowledge their sacrifice. However, for many grieving parents, this small piece of metal felt tragically inadequate compared to the loss of their child\'s life.'
        }
    },
    'early_modern_world': {
        '0-4': {
            q: 'Study Source A (Fresco of the Siege of Constantinople). What military technologies or tactics are visible in this depiction of the 1537 siege?',
            a: 'This visual source is significant as it provides contemporary evidence of 16th-century siege warfare, likely illustrating the use of heavy artillery, fortified walls, and the massive logistical scale of Ottoman military campaigns during this period.'
        },
        '0-6': {
            q: 'Study Source B (the 16th-Century Benin Bronze Plaque). How does this artifact challenge traditional European assumptions about pre-colonial African societies?',
            a: 'The intricate craftsmanship of the Benin Bronze Plaque proves the existence of a highly sophisticated, technologically advanced, and wealthy civilization in West Africa long before European colonization, directly challenging racist assumptions of African "backwardness".'
        },
        '1-2': {
            q: 'Study Source A (Portrait of Gerardus Mercator). Why was Mercator\'s 1569 map projection a revolutionary development for early modern sailors?',
            a: 'Mercator\'s projection was revolutionary because it represented sailing courses of constant bearing as straight lines. This made oceanic navigation significantly easier and more accurate, directly enabling the global expansion of European empires.'
        },
        '1-10': {
            q: 'Study Source D (The Armada Portrait of Queen Elizabeth I). How does the artist use symbolism in this painting to project Elizabeth\'s power following the defeat of the Spanish Armada?',
            a: 'The portrait is filled with imperial symbolism. Elizabeth\'s hand rests on a globe, symbolizing England\'s growing global ambitions, while the background scenes explicitly contrast the destruction of the Spanish fleet with the calm strength of the English navy.'
        },
        '2-2': {
            q: 'Study Source A (Sir Thomas Roe at the Mughal Court). What does this image suggest about the balance of power between English ambassadors and the Mughal Empire in 1615?',
            a: 'The image suggests that the Mughal Empire was vastly wealthier and more powerful than England at this time. Sir Thomas Roe is depicted as a minor supplicant seeking trading privileges from a dominant and magnificent imperial court.'
        },
        '4-3': {
            q: 'Study Source B (The Great Seal of the Commonwealth of England). How does the imagery on this 1651 seal reflect the political upheaval following the execution of Charles I?',
            a: 'The Great Seal reflects the radical shift from a monarchy to a republic. By replacing the image of a king with symbols representing the authority of Parliament and the "Commonwealth", it visually declares that political power now rests with the representatives of the people rather than a divinely appointed monarch.'
        },
        '6-7': {
            q: 'Study Source C (Portrait of a British politician and abolitionist). Why were portraits like this important for the abolitionist movement in the late 18th century?',
            a: 'Portraits and visual propaganda were crucial tools for abolitionists to humanize their cause, raise public awareness, and project an image of moral authority in their long political campaign to end the transatlantic slave trade.'
        }
    }
};

['great_war_part2', 'early_modern_world'].forEach(unit => {
    const dataPath = `../${unit}/data.js`;
    let data = JSON.parse(fs.readFileSync(dataPath, 'utf8').replace('export const unitData =', '').trim().replace(/;$/, ''));
    let patchedCount = 0;
    
    data.lessons.forEach((l, lIdx) => {
        l.narrative_blocks.forEach((b, bIdx) => {
            if (b.tasks) {
                b.tasks.forEach(t => {
                    const qText = t.question || t.text || '';
                    if (qText.includes('Based on the visual evidence, why is this source significant')) {
                        const key = `${lIdx}-${bIdx}`;
                        if (bespokeQuestions[unit] && bespokeQuestions[unit][key]) {
                            // Replace the generic question with the bespoke one
                            if (t.question) t.question = bespokeQuestions[unit][key].q;
                            if (t.text) t.text = bespokeQuestions[unit][key].q;
                            t.model_answer = bespokeQuestions[unit][key].a;
                            patchedCount++;
                        }
                    }
                });
            }
        });
    });
    
    fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
    console.log(`Injected ${patchedCount} bespoke questions into ${unit}.`);
});
