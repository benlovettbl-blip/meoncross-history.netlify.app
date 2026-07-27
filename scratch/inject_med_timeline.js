const fs = require('fs');

async function injectTimeline() {
    const medPath = 'c:/Projects/meoncross-history.netlify.app/edexcel_medicine/data.js';
    const medMod = await import('file://' + medPath);
    const data = medMod.unitData;

    data.timeline = [
        {
            "id": "t1",
            "date": "c1250",
            "title": "Medieval Medicine",
            "description": "Medicine is dominated by the Catholic Church and the ancient theories of Galen (Four Humours). Astrology and religion are the main explanations for disease.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t2",
            "date": "1348",
            "title": "The Black Death arrives in England",
            "description": "A devastating outbreak of bubonic plague kills roughly one-third of England's population. People blame God, miasma, and the planets.",
            "category": "Epidemics"
        },
        {
            "id": "t3",
            "date": "1543",
            "title": "Vesalius publishes 'On the Fabric of the Human Body'",
            "description": "Andreas Vesalius proves Galen made over 300 anatomical mistakes, encouraging other doctors to dissect and observe for themselves.",
            "category": "Anatomy"
        },
        {
            "id": "t4",
            "date": "1628",
            "title": "William Harvey proves the circulation of blood",
            "description": "Harvey publishes his findings showing that blood is pumped around the body by the heart, disproving Galen's theory that blood was constantly made in the liver.",
            "category": "Anatomy"
        },
        {
            "id": "t5",
            "date": "1665",
            "title": "The Great Plague",
            "description": "London is hit by another massive plague outbreak. Local governments try to impose quarantines, but 100,000 people still die.",
            "category": "Epidemics"
        },
        {
            "id": "t6",
            "date": "1796",
            "title": "Edward Jenner discovers the smallpox vaccine",
            "description": "Jenner proves that infecting a person with cowpox protects them from the deadly smallpox virus.",
            "category": "Prevention"
        },
        {
            "id": "t7",
            "date": "1847",
            "title": "James Simpson discovers chloroform",
            "description": "An effective anesthetic is discovered, finally allowing surgeons to perform longer and more complex operations without the patient feeling pain.",
            "category": "Surgery"
        },
        {
            "id": "t8",
            "date": "1854",
            "title": "John Snow's Broad Street Pump mapping",
            "description": "Snow proves that cholera is spread by contaminated water rather than miasma, though the government is slow to listen.",
            "category": "Public Health"
        },
        {
            "id": "t9",
            "date": "1861",
            "title": "Louis Pasteur publishes Germ Theory",
            "description": "Pasteur proves that microbes in the air cause decay, fundamentally changing the understanding of what causes disease.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t10",
            "date": "1865",
            "title": "Joseph Lister pioneers antiseptic surgery",
            "description": "Lister begins using carbolic acid to kill bacteria during surgery, dramatically reducing death rates from infection.",
            "category": "Surgery"
        },
        {
            "id": "t11",
            "date": "1875",
            "title": "Second Public Health Act",
            "description": "The government is forced to take responsibility for public health, forcing cities to provide clean water and proper sewers.",
            "category": "Public Health"
        },
        {
            "id": "t12",
            "date": "1882",
            "title": "Robert Koch identifies the Tuberculosis bacteria",
            "description": "Koch builds on Pasteur's work by identifying the specific microbes that cause deadly diseases.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t13",
            "date": "1909",
            "title": "Paul Ehrlich discovers Salvarsan 606",
            "description": "The first 'magic bullet' is discovered—a chemical compound that targets and kills syphilis bacteria without harming the patient.",
            "category": "Treatment"
        },
        {
            "id": "t14",
            "date": "1928",
            "title": "Alexander Fleming discovers Penicillin",
            "description": "Fleming accidentally discovers that a specific mold kills staphylococcus bacteria.",
            "category": "Treatment"
        },
        {
            "id": "t15",
            "date": "1940",
            "title": "Florey and Chain purify Penicillin",
            "description": "The Oxford team successfully purifies penicillin, leading to mass production during WWII.",
            "category": "Treatment"
        },
        {
            "id": "t16",
            "date": "1948",
            "title": "The NHS is established",
            "description": "Aneurin Bevan launches the National Health Service, providing free medical care at the point of need for everyone in Britain.",
            "category": "Public Health"
        },
        {
            "id": "t17",
            "date": "1953",
            "title": "The structure of DNA is discovered",
            "description": "Watson, Crick, Franklin, and Wilkins discover the double-helix structure of DNA, opening the door to genetics.",
            "category": "Ideas about cause of disease"
        }
    ];

    const newDataStr = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
    fs.writeFileSync(medPath, newDataStr, 'utf8');
    console.log('Successfully injected timeline into Medicine data.js');
}

injectTimeline().catch(console.error);
