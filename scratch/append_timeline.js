const fs = require('fs');

async function appendTimeline() {
    const medPath = 'c:/Projects/meoncross-history.netlify.app/edexcel_medicine/data.js';
    const medMod = await import('file://' + medPath);
    const data = medMod.unitData;

    const modernEvents = [
        {
            "id": "t18",
            "date": "2003",
            "title": "Human Genome Project Completed",
            "description": "Scientists successfully map every single gene in the human body, opening up new possibilities for predicting and treating genetic diseases.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t19",
            "date": "2007",
            "title": "UK Smoking Ban",
            "description": "The government makes it illegal to smoke in all enclosed public spaces and workplaces to combat lung cancer caused by second-hand smoke.",
            "category": "Public Health"
        },
        {
            "id": "t20",
            "date": "2016",
            "title": "Plain Packaging Laws",
            "description": "All cigarettes in the UK must be sold in standardized, unappealing green packaging with graphic health warnings to deter young people from smoking.",
            "category": "Prevention"
        },
        {
            "id": "t21",
            "date": "2020",
            "title": "COVID-19 Pandemic & mRNA Vaccines",
            "description": "The world faces a deadly pandemic. Thanks to massive government funding and modern technology, highly effective mRNA vaccines are developed and rolled out in under a year.",
            "category": "Treatment"
        },
        {
            "id": "t22",
            "date": "2024",
            "title": "Smoking & Vaping Restrictions",
            "description": "The UK government pushes legislation to create a 'smoke-free generation' by banning the sale of tobacco to anyone born after 2009, alongside strict new regulations on disposable vapes.",
            "category": "Public Health"
        }
    ];

    // Filter out these IDs in case the script is run multiple times
    data.timeline = data.timeline.filter(t => !modernEvents.find(m => m.id === t.id));
    
    // Append the modern events
    data.timeline.push(...modernEvents);

    const newDataStr = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
    fs.writeFileSync(medPath, newDataStr, 'utf8');
    console.log('Successfully appended modern events to Medicine timeline in data.js');
}

appendTimeline().catch(console.error);
