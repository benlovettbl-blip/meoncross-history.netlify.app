import fs from 'fs';
import path from 'path';

async function patchWaterAndSanitation() {
    const unitPath = path.join(process.cwd(), 'water_and_sanitation', 'data.js');
    let module;
    try {
        module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
    } catch (e) {
        console.error('Failed to load water_and_sanitation data.js', e);
        return;
    }
    
    const data = JSON.parse(JSON.stringify(module.unitData)); // Deep copy
    
    // Lesson 1
    data.lessons[0].do_now = {
        type: "questions",
        items: [
            { question: "What does the 'M' in MAIN stand for regarding the causes of WWI?", answer: "Militarism (the build-up of armies and weapons)." },
            { question: "Which countries made up the Triple Entente?", answer: "Britain, France, and Russia." },
            { question: "Who was assassinated in Sarajevo in 1914?", answer: "Archduke Franz Ferdinand." },
            { question: "Which plan did Germany use to try and quickly defeat France?", answer: "The Schlieffen Plan." },
            { question: "Why did Britain declare war on Germany?", answer: "Because Germany invaded neutral Belgium." }
        ]
    };
    data.lessons[0].teacher_notes = {
        primer: "This lesson contrasts the highly advanced public health engineering of the Roman Empire with the primitive living conditions of native Britons. The goal is to show students that historical progress is not a straight line upwards.",
        objectives: [
            { objective: "Understand the scale of Roman public health engineering.", primer: "Use the narrative on aqueducts and bathhouses to emphasize the sheer volume of water the Romans moved using only gravity.", question: "How did the Romans manage to keep the water flowing constantly into their forts?" },
            { objective: "Explain why the Romans prioritized public health.", primer: "Link their infrastructure back to military efficiency; sick soldiers cannot fight.", question: "Why was it crucial for the Roman army to keep its forts clean and hygienic?" }
        ]
    };

    // Lesson 2
    data.lessons[1].do_now = {
        type: "questions",
        items: [
            { question: "What was 'Trench Foot'?", answer: "A painful condition caused by standing in cold water and mud for long periods." },
            { question: "What pest infested the trenches in their millions?", answer: "Brown rats." },
            { question: "What was 'No Man's Land'?", answer: "The deadly strip of land between the opposing frontline trenches." },
            { question: "Which weapon caused the majority of casualties in WWI?", answer: "Artillery (heavy explosive shells)." },
            { question: "When did the Battle of the Somme begin?", answer: "July 1st, 1916." }
        ]
    };
    data.lessons[1].teacher_notes = {
        primer: "This lesson explores the dramatic regression in public health following the collapse of the Roman Empire. However, ensure students understand the nuance: while towns were filthy, monasteries retained some Roman hygiene practices because cleanliness was linked to godliness.",
        objectives: [
            { objective: "Describe the hazards of a medieval town.", primer: "Focus on the lack of zoning (butchers next to houses) and the leaking of cesspits into water supplies.", question: "Why were medieval drinking wells so dangerous?" },
            { objective: "Explain why monasteries were healthier than towns.", primer: "Direct students to the section on monks building their own advanced water pipes.", question: "Why did monks believe it was their religious duty to stay clean?" }
        ]
    };

    // Lesson 3
    data.lessons[2].do_now = {
        type: "questions",
        items: [
            { question: "What was the East India Company?", answer: "A powerful British trading company that controlled half the world's trade and ruled much of India." },
            { question: "Which luxury goods were imported from India?", answer: "Cotton, tea, and spices." },
            { question: "What is colonialism?", answer: "When one country takes political control over another country to exploit it economically." },
            { question: "What was the 'Middle Passage'?", answer: "The brutal journey of enslaved Africans across the Atlantic Ocean." },
            { question: "Where did Britain establish a penal colony in 1788?", answer: "Australia (Botany Bay)." }
        ]
    };
    data.lessons[2].teacher_notes = {
        primer: "This lesson covers the Early Modern period, highlighting how rapid population growth in towns exacerbated the filth. It introduces the concept of technological failure due to lacking infrastructure (the flushing toilet).",
        objectives: [
            { objective: "Understand the impact of early modern urbanization.", primer: "Highlight how the growing population outpaced the ability to dispose of waste, leading to 'gongfermers' dumping waste in rivers.", question: "Why did the rivers in early modern towns become open sewers?" },
            { objective: "Analyze the failure of Harington's flushing toilet.", primer: "Use this to teach students that an invention is useless without the supporting infrastructure (sewers).", question: "Why did Harington's flushing toilet fail to catch on for 250 years?" }
        ]
    };

    // Lesson 4
    data.lessons[3].do_now = {
        type: "questions",
        items: [
            { question: "Who invented the Water Frame?", answer: "Richard Arkwright." },
            { question: "What powered the first factories?", answer: "Water wheels (rivers), and later steam engines." },
            { question: "Why did factory owners prefer employing children?", answer: "They were cheap, easily controlled, and small enough to crawl under machines." },
            { question: "What were 'back-to-back' houses?", answer: "Cheaply built, cramped terraced houses for factory workers that shared walls and had no ventilation." },
            { question: "What did the 1833 Factory Act do?", answer: "It banned the employment of children under 9 in textile factories." }
        ]
    };
    data.lessons[3].teacher_notes = {
        primer: "This lesson tackles the public health catastrophe caused by the Industrial Revolution. It challenges the 'Miasma' theory by studying Dr. John Snow's brilliant use of data mapping to prove cholera was waterborne.",
        objectives: [
            { objective: "Describe the squalor of industrial towns.", primer: "Use the narrative on back-to-back housing to show how extreme overcrowding created perfect conditions for disease.", question: "Why did the rapid building of factories lead to a housing crisis?" },
            { objective: "Explain how Dr. Snow disproved the Miasma theory.", primer: "Walk students through the Broad Street pump map, showing how the clustering of deaths around a single well proved the water was the source.", question: "How did Dr. Snow's map prove cholera was waterborne rather than airborne?" }
        ]
    };

    // Lesson 5
    data.lessons[4].do_now = {
        type: "questions",
        items: [
            { question: "What was D.O.R.A.?", answer: "The Defence of the Realm Act, which gave the government sweeping powers over daily life." },
            { question: "Why was rationing introduced in 1918?", answer: "Because German U-boats were sinking British supply ships." },
            { question: "What dangerous job did many women do during WWI?", answer: "Working in munitions factories making artillery shells." },
            { question: "What were the 'Canaries'?", answer: "Women whose skin turned yellow from TNT poisoning in the factories." },
            { question: "When did the First World War end?", answer: "November 11th, 1918." }
        ]
    };
    data.lessons[4].teacher_notes = {
        primer: "This lesson serves as the climax of the unit. The 'Great Stink' forced the government to abandon its 'laissez-faire' attitude, leading to Bazalgette's monumental sewer system which permanently solved the crisis.",
        objectives: [
            { objective: "Understand the catalyst of the Great Stink.", primer: "Explain that the government only acted when the smell of the Thames directly halted Parliament.", question: "Why did Parliament suddenly care about public health in 1858?" },
            { objective: "Evaluate the significance of Bazalgette's sewers.", primer: "Emphasize that this was one of the largest engineering projects in history and the end of 'laissez-faire'.", question: "What does the sheer scale of Bazalgette's brick sewers tell us about the change in government attitude?" }
        ]
    };

    fs.writeFileSync(unitPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
    console.log(`✅ Applied Do Now and Teacher Notes patches to water_and_sanitation/data.js`);
}

patchWaterAndSanitation();
