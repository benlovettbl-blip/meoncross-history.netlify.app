import fs from 'fs';
import path from 'path';

async function patchWaterDoNows() {
    const unitPath = path.join(process.cwd(), 'water_and_sanitation', 'data.js');
    let module;
    try {
        module = await import(`file:///${unitPath.replace(/\\/g, '/')}`);
    } catch (e) {
        console.error('Failed to load water_and_sanitation data.js', e);
        return;
    }
    
    const data = JSON.parse(JSON.stringify(module.unitData)); // Deep copy
    
    // Lesson 1: General primary school knowledge (chronology/Roman basics)
    data.lessons[0].do_now = {
        type: "questions",
        items: [
            { question: "What does AD stand for in historical dates?", answer: "Anno Domini (the year of our Lord)." },
            { question: "What century is the year 1066 in?", answer: "The 11th Century." },
            { question: "Which ancient empire conquered Britain and built Hadrian's Wall?", answer: "The Romans." },
            { question: "What does the word 'Sanitation' mean?", answer: "Conditions relating to public health, especially clean drinking water and sewage disposal." },
            { question: "What is a primary source?", answer: "Evidence that was created at the time of the event." }
        ]
    };

    // Lesson 2: Recall of Lesson 1 (Romans)
    data.lessons[1].do_now = {
        type: "questions",
        items: [
            { question: "How did the Romans transport massive amounts of fresh water?", answer: "Aqueducts." },
            { question: "What did the Romans use to flush their public toilets?", answer: "Running water from the aqueducts and bathhouses." },
            { question: "Why did the Roman army need to stay healthy?", answer: "To march and fight efficiently across the Empire." },
            { question: "What did the Romans build in their forts to treat sick soldiers?", answer: "Hospitals (Valetudinariums)." },
            { question: "Did the Romans understand bacteria?", answer: "No, they just knew bad smells or swamps were linked to illness." }
        ]
    };

    // Lesson 3: Recall of Lesson 2 (Middle Ages)
    data.lessons[2].do_now = {
        type: "questions",
        items: [
            { question: "Why were medieval towns dangerous for public health?", answer: "They were overcrowded, with cesspits leaking into drinking wells." },
            { question: "What was a Gongfermer?", answer: "A medieval worker who cleared human waste from cesspits at night." },
            { question: "Why did medieval monks build clean water systems?", answer: "They believed cleanliness brought them closer to God." },
            { question: "What is a cesspit?", answer: "A pit for the disposal of liquid waste and sewage." },
            { question: "What did King Edward III order in 1357?", answer: "The removal of filth from London's streets to prevent sickness." }
        ]
    };

    // Lesson 4: Recall of Lesson 3 (Early Modern)
    data.lessons[3].do_now = {
        type: "questions",
        items: [
            { question: "Why did rivers in early modern towns become open sewers?", answer: "Population growth outpaced the ability to dispose of waste." },
            { question: "Who invented a working flushing toilet in 1596?", answer: "John Harington." },
            { question: "Why did Harington's flushing toilet fail to catch on for 250 years?", answer: "There were no underground sewers to connect it to." },
            { question: "What does 'urbanisation' mean?", answer: "The increase in the proportion of people living in towns and cities." },
            { question: "How did early modern townspeople get their drinking water?", answer: "Buying it from water sellers or sharing local pumps." }
        ]
    };

    // Lesson 5: Recall of Lesson 4 (Industrial)
    data.lessons[4].do_now = {
        type: "questions",
        items: [
            { question: "What was the 'laissez-faire' attitude?", answer: "The government's belief that it shouldn't interfere in people's daily lives or public health." },
            { question: "What terrifying waterborne disease first struck Britain in 1831?", answer: "Cholera." },
            { question: "What scientific theory did doctors wrongly believe caused disease?", answer: "Miasma Theory (bad smells)." },
            { question: "How did Dr. John Snow prove cholera was waterborne?", answer: "By mapping the deaths around the Broad Street water pump." },
            { question: "Who published a damning report on sanitary conditions in 1842?", answer: "Edwin Chadwick." }
        ]
    };

    fs.writeFileSync(unitPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
    console.log(`✅ Fixed Do Now patches to correctly recall only from previous lessons (Year 7 Unit 1 constraint)`);
}

patchWaterDoNows();
