const fs = require('fs');

async function updateTimeline() {
    const medPath = 'c:/Projects/meoncross-history.netlify.app/edexcel_medicine/data.js';
    const medMod = await import('file://' + medPath);
    const data = medMod.unitData;

    data.timeline = [
        // MEDIEVAL
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
        // RENAISSANCE
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
            "date": "1676",
            "title": "Thomas Sydenham publishes 'Observationes Medicae'",
            "description": "The 'English Hippocrates' encourages doctors to observe patient symptoms closely rather than relying on ancient books.",
            "category": "Ideas about cause of disease"
        },
        // INDUSTRIAL
        {
            "id": "t7",
            "date": "1796",
            "title": "Edward Jenner discovers the smallpox vaccine",
            "description": "Jenner proves that infecting a person with cowpox protects them from the deadly smallpox virus, leading to the world's first vaccine.",
            "category": "Prevention"
        },
        {
            "id": "t8",
            "date": "1847",
            "title": "James Simpson discovers chloroform",
            "description": "An effective anesthetic is discovered, finally allowing surgeons to perform longer and more complex operations without the patient feeling pain.",
            "category": "Surgery"
        },
        {
            "id": "t9",
            "date": "1854",
            "title": "John Snow's Broad Street Pump mapping",
            "description": "Snow proves that cholera is spread by contaminated water rather than miasma, though the government is slow to listen.",
            "category": "Public Health"
        },
        {
            "id": "t10",
            "date": "1861",
            "title": "Louis Pasteur publishes Germ Theory",
            "description": "Pasteur proves that microbes in the air cause decay, fundamentally changing the understanding of what causes disease.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t11",
            "date": "1865",
            "title": "Joseph Lister pioneers antiseptic surgery",
            "description": "Lister begins using carbolic acid to kill bacteria during surgery, dramatically reducing death rates from infection.",
            "category": "Surgery"
        },
        {
            "id": "t12",
            "date": "1875",
            "title": "Second Public Health Act",
            "description": "The government is forced to take responsibility for public health, forcing cities to provide clean water and proper sewers.",
            "category": "Public Health"
        },
        {
            "id": "t13",
            "date": "1882",
            "title": "Robert Koch identifies the Tuberculosis bacteria",
            "description": "Koch builds on Pasteur's work by identifying the specific microbes that cause deadly diseases.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t14",
            "date": "1895",
            "title": "Wilhelm Roentgen discovers X-rays",
            "description": "Roentgen accidentally discovers X-rays, allowing doctors to look inside the human body without cutting it open.",
            "category": "Technology"
        },
        // MODERN
        {
            "id": "t15",
            "date": "1901",
            "title": "Karl Landsteiner discovers blood groups",
            "description": "Landsteiner discovers blood groups (A, B, O), solving the mystery of why previous blood transfusions often killed the patient.",
            "category": "Surgery"
        },
        {
            "id": "t16",
            "date": "1909",
            "title": "Paul Ehrlich discovers Salvarsan 606",
            "description": "The first 'magic bullet' is discovered—a chemical compound that targets and kills syphilis bacteria without harming the patient.",
            "category": "Treatment"
        },
        // WESTERN FRONT (1914-1918)
        {
            "id": "t17",
            "date": "1914",
            "title": "Outbreak of WWI: RAMC and FANY",
            "description": "World War I begins. The Royal Army Medical Corps and First Aid Nursing Yeomanry deploy to the Western Front to treat massive casualties.",
            "category": "Western Front"
        },
        {
            "id": "t18",
            "date": "1915",
            "title": "The Thomas Splint",
            "description": "Introduced by Hugh Owen Thomas and championed by his nephew Robert Jones, this splint dramatically increased survival rates for soldiers with shattered femurs.",
            "category": "Western Front"
        },
        {
            "id": "t19",
            "date": "1915",
            "title": "First use of Poison Gas",
            "description": "Chlorine gas is used for the first time at the Second Battle of Ypres, leading to the rapid development of gas masks.",
            "category": "Western Front"
        },
        {
            "id": "t20",
            "date": "1917",
            "title": "First Blood Bank at Cambrai",
            "description": "Oswald Hope Robertson sets up the first blood bank using sodium citrate to stop blood clotting, saving countless lives at the Battle of Cambrai.",
            "category": "Western Front"
        },
        {
            "id": "t21",
            "date": "1917",
            "title": "Harold Gillies and Plastic Surgery",
            "description": "Gillies sets up a specialized hospital at Queen's Hospital, Sidcup, to pioneer plastic surgery techniques for soldiers with severe facial wounds.",
            "category": "Western Front"
        },
        // MODERN CONTINUED
        {
            "id": "t22",
            "date": "1928",
            "title": "Alexander Fleming discovers Penicillin",
            "description": "Fleming accidentally discovers that a specific mold kills staphylococcus bacteria.",
            "category": "Treatment"
        },
        {
            "id": "t23",
            "date": "1932",
            "title": "Gerhard Domagk discovers Prontosil",
            "description": "The second 'magic bullet' is discovered, a red dye that cures blood poisoning (bacteriostatic antibiotic).",
            "category": "Treatment"
        },
        {
            "id": "t24",
            "date": "1940",
            "title": "Florey and Chain purify Penicillin",
            "description": "The Oxford team successfully purifies penicillin, leading to mass production during WWII.",
            "category": "Treatment"
        },
        {
            "id": "t25",
            "date": "1948",
            "title": "The NHS is established",
            "description": "Aneurin Bevan launches the National Health Service, providing free medical care at the point of need for everyone in Britain.",
            "category": "Public Health"
        },
        {
            "id": "t26",
            "date": "1953",
            "title": "The structure of DNA is discovered",
            "description": "Watson, Crick, Franklin, and Wilkins discover the double-helix structure of DNA, opening the door to genetics.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t27",
            "date": "2003",
            "title": "Human Genome Project Completed",
            "description": "Scientists successfully map every single gene in the human body, allowing doctors to better predict and treat genetic diseases.",
            "category": "Ideas about cause of disease"
        },
        {
            "id": "t28",
            "date": "2007",
            "title": "UK Smoking Ban",
            "description": "The government makes it illegal to smoke in all enclosed public spaces and workplaces to combat lung cancer caused by second-hand smoke.",
            "category": "Public Health"
        },
        {
            "id": "t29",
            "date": "2016",
            "title": "Plain Packaging Laws",
            "description": "All cigarettes in the UK must be sold in standardized, unappealing green packaging with graphic health warnings to deter young people from smoking.",
            "category": "Prevention"
        },
        {
            "id": "t30",
            "date": "2020",
            "title": "COVID-19 Pandemic & mRNA Vaccines",
            "description": "The world faces a deadly pandemic. Thanks to massive government funding and modern technology, highly effective mRNA vaccines are developed and rolled out in under a year.",
            "category": "Treatment"
        },
        {
            "id": "t31",
            "date": "2024",
            "title": "Smoking & Vaping Restrictions",
            "description": "The UK government pushes legislation to create a 'smoke-free generation' by banning the sale of tobacco to anyone born after 2009, alongside strict new regulations on disposable vapes.",
            "category": "Public Health"
        }
    ];

    const newDataStr = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
    fs.writeFileSync(medPath, newDataStr, 'utf8');
    console.log('Successfully replaced Medicine timeline with all 31 comprehensive events');
}

updateTimeline().catch(console.error);
